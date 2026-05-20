/**
 * AuthService — Google sign-in (client-only)
 *
 * Two adapters, same JWT validation pipeline (Doctrine §8.1 / §22.6):
 *   - Web (PWA): Google Identity Services loaded from accounts.google.com.
 *   - Android (APK): Capawesome Google Sign-In plugin via Credential Manager.
 *     Selected at runtime by checking `window.Capacitor`.
 *
 * Both adapters return a Google ID token whose `aud` claim is the WEB Client
 * ID (Capawesome explicitly requires the Web Client ID on all platforms,
 * Doctrine §22.7). The Android Client ID is a Cloud Console binding only —
 * never read by app code, never appears in the JWT.
 *
 * Decodes the ID token client-side for display purposes (sub, email, name,
 * picture). Signature is NOT verified — the `sub` value is used as a local
 * namespace key only. Do NOT treat the decoded claims as a security
 * boundary; any backend calls must forward the raw ID token and verify it
 * server-side per RFC 7519.
 */
import { storageService } from './StorageService.js';
import { stripBidi, sanitizeUrl } from '../utils/SanitizeHtml.js';

const AUTH_SETTINGS_KEY = 'auth_user';

// Google publishes both forms of the iss claim over time.
const VALID_ISS = new Set(['https://accounts.google.com', 'accounts.google.com']);

// Session TTL — forces re-auth after 24h so a stale cached ID token
// cannot outlive a compromise of the GIS origin.
const MAX_SESSION_AGE_MS = 24 * 60 * 60 * 1000;

// Clock-skew grace window for iat / nbf / exp (seconds).
const CLOCK_SKEW_S = 300;

// Rate-limit: max credential callbacks per window before temporary lockout.
const AUTH_RATE_LIMIT = 5;
const AUTH_RATE_WINDOW_MS = 60_000;

export class AuthService {
  constructor() {
    this.user = null;
    this.clientId = null;
    this._ready = false;
    this._listeners = new Set();
    this._authAttempts = [];
    this._gisInitialized = false;
    this._capacitorInitialized = false;
  }

  // §22.4 / §22.6 — true iff running inside Capacitor (Android APK).
  _isCapacitor() {
    return typeof window !== 'undefined' && Boolean(window.Capacitor);
  }

  // The Capawesome plugin is registered by Capacitor's runtime BEFORE app
  // scripts execute (no bundler import needed; we read it off the global).
  _getCapacitorPlugin() {
    return this._isCapacitor() ? window.Capacitor?.Plugins?.GoogleSignIn || null : null;
  }

  /**
   * Load any cached user from IDB, then initialize GIS SDK once it is present.
   * @param {{ clientId?: string }} [opts]
   */
  async init(opts = {}) {
    if (this._ready) return this.user;

    try {
      const cached = await storageService.load('settings', AUTH_SETTINGS_KEY);
      const cachedUser = cached?.user;
      if (cachedUser?.sub) {
        const ageMs = Date.now() - Number(cachedUser.iat || 0) * 1000;
        if (ageMs > 0 && ageMs < MAX_SESSION_AGE_MS) {
          this.user = cachedUser;
        } else {
          console.warn('[auth] cached session expired, dropping');
          try {
            await storageService.delete('settings', AUTH_SETTINGS_KEY);
          } catch (err) {
            console.warn('[auth] expired-session cleanup failed:', err);
          }
        }
      }
    } catch (err) {
      console.warn('[auth] cache load failed:', err);
    }

    this.clientId =
      opts.clientId ||
      document.querySelector('meta[name="google-client-id"]')?.content?.trim() ||
      null;

    this._ready = true;
    this._emit();

    if (!this.clientId) return this.user;

    if (this._isCapacitor()) {
      // Native: Capawesome plugin via Credential Manager (Doctrine §22.6).
      // §22.7: the plugin requires the Web Client ID even on Android; the
      // Android Client ID is a Cloud Console binding (package + SHA-1) and
      // is NEVER passed at runtime.
      this._initializeCapacitor();
    } else if (this._gisAvailable()) {
      this._initializeGis();
    } else {
      this._waitForGis().then(() => this._initializeGis());
    }

    return this.user;
  }

  async _initializeCapacitor() {
    if (this._capacitorInitialized) return;
    const plugin = this._getCapacitorPlugin();
    if (!plugin || !this.clientId) return;
    try {
      await plugin.initialize({ clientId: this.clientId });
      this._capacitorInitialized = true;
    } catch (err) {
      console.warn('[auth] Capacitor plugin initialize failed:', err);
    }
  }

  // Trigger native sign-in (Android). The returned ID token feeds the same
  // §8.2 validation pipeline as the web GIS credential.
  async _capacitorSignIn() {
    const plugin = this._getCapacitorPlugin();
    if (!plugin) return;
    if (!this._capacitorInitialized) await this._initializeCapacitor();
    try {
      const result = await plugin.signIn();
      if (result?.idToken) {
        await this._onCredential({ credential: result.idToken });
      }
    } catch (err) {
      console.warn('[auth] Capacitor signIn failed:', err);
    }
  }

  _gisAvailable() {
    return Boolean(window.google?.accounts?.id);
  }

  async _waitForGis(timeoutMs = 8000) {
    const start = Date.now();
    while (!this._gisAvailable()) {
      if (Date.now() - start > timeoutMs) {
        console.warn('[auth] GIS SDK did not load within', timeoutMs, 'ms');
        return;
      }
      await new Promise((r) => {
        setTimeout(r, 150);
      });
    }
  }

  _initializeGis() {
    if (this._gisInitialized || !this._gisAvailable() || !this.clientId) return;
    try {
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: (response) => this._onCredential(response),
        auto_select: true,
      });
      this._gisInitialized = true;
    } catch (err) {
      console.warn('[auth] GIS initialize failed:', err);
    }
  }

  /** Render the Google Sign-In button into a container element. */
  renderButton(container) {
    if (!container) return;
    if (this._isCapacitor()) {
      this._renderCapacitorButton(container);
      return;
    }
    if (!this._gisAvailable() || !this._gisInitialized) {
      this._initializeGis();
    }
    if (!this._gisAvailable()) {
      container.innerHTML =
        '<p class="auth-hint">Google Sign-In non disponibile. Verifica la tua connessione e il Client ID.</p>';
      return;
    }
    try {
      container.innerHTML = '';
      window.google.accounts.id.renderButton(container, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: 'signin_with',
        locale: 'it',
      });
    } catch (err) {
      console.warn('[auth] renderButton failed:', err);
    }
  }

  // Native button — Capacitor (Android). Click invokes Credential Manager.
  // Styled minimally; the consumer's stylesheet can target `.auth-google-button-native`.
  _renderCapacitorButton(container) {
    container.innerHTML = '';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'auth-google-button-native';
    btn.textContent = 'Accedi con Google';
    btn.addEventListener('click', () => this._capacitorSignIn());
    container.appendChild(btn);
  }

  /** Trigger the One Tap prompt (web only — silent no-op on Capacitor). */
  prompt() {
    if (this._isCapacitor()) return; // Credential Manager has no silent equivalent
    if (!this._gisAvailable() || !this._gisInitialized) return;
    try {
      window.google.accounts.id.prompt();
    } catch (err) {
      console.warn('[auth] prompt failed:', err);
    }
  }

  async signOut() {
    try {
      if (this._isCapacitor()) {
        const plugin = this._getCapacitorPlugin();
        if (plugin) await plugin.signOut();
      } else if (this._gisAvailable()) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch (err) {
      console.warn('[auth] sign-out adapter failed:', err);
    }
    this.user = null;
    try {
      await storageService.delete('settings', AUTH_SETTINGS_KEY);
    } catch (err) {
      console.warn('[auth] clear cache failed:', err);
    }
    this._emit();
  }

  getCurrentUser() {
    return this.user;
  }

  isSignedIn() {
    return Boolean(this.user?.sub);
  }

  /** Subscribe to user state changes. Returns unsubscribe fn. */
  onChange(listener) {
    if (typeof listener !== 'function') return () => {};
    this._listeners.add(listener);
    try {
      listener(this.user);
    } catch (err) {
      console.warn('[auth] listener errored on subscribe:', err);
    }
    return () => this._listeners.delete(listener);
  }

  _emit() {
    for (const l of this._listeners) {
      try {
        l(this.user);
      } catch (err) {
        console.warn('[auth] listener errored:', err);
      }
    }
  }

  async _onCredential(response) {
    if (!response?.credential) return;
    const now = Date.now();
    this._authAttempts = this._authAttempts.filter((t) => now - t < AUTH_RATE_WINDOW_MS);
    if (this._authAttempts.length >= AUTH_RATE_LIMIT) {
      console.warn('[auth] rate-limited — too many credential attempts');
      return;
    }
    this._authAttempts.push(now);
    const decoded = this._decodeJwtPayload(response.credential);
    const reject = (reason) => {
      console.warn('[auth] ID token rejected:', reason);
    };
    if (!decoded?.sub) {
      reject('missing sub');
      return;
    }
    if (!VALID_ISS.has(String(decoded.iss))) {
      reject('bad iss');
      return;
    }
    if (!this.clientId || decoded.aud !== this.clientId) {
      reject('bad aud');
      return;
    }
    const nowS = Math.floor(Date.now() / 1000);
    if (typeof decoded.exp !== 'number' || decoded.exp < nowS) {
      reject('expired');
      return;
    }
    if (typeof decoded.iat !== 'number' || decoded.iat > nowS + CLOCK_SKEW_S) {
      reject('future iat');
      return;
    }
    if (typeof decoded.nbf === 'number' && decoded.nbf > nowS + CLOCK_SKEW_S) {
      reject('future nbf');
      return;
    }
    const safePicture = sanitizeUrl(decoded.picture || '', {
      requireHost: 'googleusercontent.com',
    });
    this.user = {
      sub: String(decoded.sub),
      email: stripBidi(decoded.email || '').slice(0, 254),
      name: stripBidi(decoded.name || '').slice(0, 128),
      picture: safePicture,
      iat: decoded.iat,
      exp: decoded.exp,
    };
    try {
      await storageService.save('settings', { key: AUTH_SETTINGS_KEY, user: this.user });
    } catch (err) {
      console.warn('[auth] cache save failed:', err);
    }
    this._emit();
  }

  _decodeJwtPayload(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
      const binary = atob(padded);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const json = new TextDecoder('utf-8').decode(bytes);
      return JSON.parse(json);
    } catch (err) {
      console.warn('[auth] JWT decode failed:', err);
      return null;
    }
  }
}

export const authService = new AuthService();
