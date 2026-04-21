/**
 * AuthService — Google Identity Services (client-only)
 *
 * Decodes the ID token client-side for display purposes (sub, email, name, picture).
 * Signature is NOT verified — the `sub` value is used as a local namespace key only.
 * Do NOT treat the decoded claims as a security boundary; any backend calls must
 * forward the raw ID token and verify it server-side per RFC 7519.
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

class AuthService {
  constructor() {
    this.user = null;
    this.clientId = null;
    this._ready = false;
    this._listeners = new Set();
    this._gisInitialized = false;
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

    if (this.clientId && this._gisAvailable()) {
      this._initializeGis();
    } else if (this.clientId) {
      this._waitForGis().then(() => this._initializeGis());
    }

    return this.user;
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

  /** Trigger the One Tap prompt (optional — safe no-op if unavailable). */
  prompt() {
    if (!this._gisAvailable() || !this._gisInitialized) return;
    try {
      window.google.accounts.id.prompt();
    } catch (err) {
      console.warn('[auth] prompt failed:', err);
    }
  }

  async signOut() {
    try {
      if (this._gisAvailable()) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch (err) {
      console.warn('[auth] disableAutoSelect failed:', err);
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
