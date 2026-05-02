/**
 * Login Wall — full-screen sign-in gate.
 *
 * Doctrine §8.4.1: on boot, if `authService.isSignedIn() === false`, the app
 * MUST render this wall instead of any dashboard content. The wall hides the
 * topbar, sidebar, and every section by toggling `body.login-wall-active`.
 *
 * - Bilingual prompt (IT primary, EN target).
 * - Sign-in button rendered by `authService.renderButton()` (GIS on web,
 *   Capawesome plugin on native — same call, dual adapter per §8.1).
 * - Retry control shown if the auth provider hasn't reached "ready" within
 *   the timeout — covers the "GIS failed to load" path without revealing the
 *   dashboard, per §8.4.1.
 *
 * No inline event handlers — every control uses `addEventListener` directly
 * (Doctrine §11.7).
 */
import { authService } from '../services/AuthService.js';

const READY_TIMEOUT_MS = 5000;

let activeWall = null;
let onSignInUnsub = null;
let readyTimerId = null;

function paintButton() {
  if (!activeWall) return;
  const slot = activeWall.querySelector('#login-wall-button');
  if (slot) {
    slot.innerHTML = '';
    authService.renderButton(slot);
  }
}

function buttonSlotHasContent(slot) {
  if (!slot) return false;
  return slot.children.length > 0 || (slot.textContent && slot.textContent.trim().length > 0);
}

/** Tear down the wall and restore page visibility. */
export function dismissLoginWall() {
  if (readyTimerId) {
    clearTimeout(readyTimerId);
    readyTimerId = null;
  }
  if (onSignInUnsub) {
    onSignInUnsub();
    onSignInUnsub = null;
  }
  if (activeWall && activeWall.parentNode) {
    activeWall.parentNode.removeChild(activeWall);
  }
  activeWall = null;
  document.body.classList.remove('login-wall-active');
}

/**
 * Mount the login wall into `host`. Idempotent: a second call re-uses the
 * existing wall element. Returns the wall element.
 *
 * @param {HTMLElement} host
 * @param {() => void} [onSignedIn]   called once when auth flips to signed-in
 */
export function renderLoginWall(host, onSignedIn) {
  if (!host) return null;
  document.body.classList.add('login-wall-active');

  if (activeWall && activeWall.parentNode) {
    return activeWall;
  }

  const wall = document.createElement('div');
  wall.className = 'login-wall';
  wall.setAttribute('role', 'dialog');
  wall.setAttribute('aria-labelledby', 'login-wall-title');
  wall.setAttribute('aria-modal', 'true');

  // Build the card via createElement to avoid innerHTML round-tripping —
  // this view runs before any other manager and predates the dispatch util.
  const card = document.createElement('div');
  card.className = 'login-wall-card';

  const title = document.createElement('h1');
  title.id = 'login-wall-title';
  title.className = 'login-wall-title';
  title.textContent = 'Accedi per continuare';

  const titleEn = document.createElement('p');
  titleEn.className = 'login-wall-title-en';
  titleEn.textContent = 'Sign in to continue';

  const subtitle = document.createElement('p');
  subtitle.className = 'login-wall-subtitle';
  subtitle.textContent =
    'Knowledge AIO è uno spazio di apprendimento personalizzato. Effettua il login per accedere ai tuoi progressi.';

  const subtitleEn = document.createElement('p');
  subtitleEn.className = 'login-wall-subtitle-en';
  subtitleEn.textContent =
    'Knowledge AIO is a personalised learning space. Please sign in to access your progress.';

  const buttonSlot = document.createElement('div');
  buttonSlot.id = 'login-wall-button';
  buttonSlot.className = 'login-wall-button';

  const fallback = document.createElement('div');
  fallback.id = 'login-wall-fallback';
  fallback.className = 'login-wall-fallback';
  fallback.hidden = true;

  const fallbackText = document.createElement('p');
  fallbackText.textContent =
    'Servizio di accesso non raggiungibile. / Sign-in service unavailable.';
  fallback.appendChild(fallbackText);

  const retryBtn = document.createElement('button');
  retryBtn.type = 'button';
  retryBtn.className = 'btn btn-primary login-wall-retry';
  retryBtn.textContent = 'Riprova / Retry';
  retryBtn.addEventListener('click', () => {
    fallback.hidden = true;
    paintButton();
  });
  fallback.appendChild(retryBtn);

  card.appendChild(title);
  card.appendChild(titleEn);
  card.appendChild(subtitle);
  card.appendChild(subtitleEn);
  card.appendChild(buttonSlot);
  card.appendChild(fallback);
  wall.appendChild(card);
  host.appendChild(wall);

  activeWall = wall;

  // Subscribe once. Auto-dismiss + invoke caller.
  if (onSignInUnsub) onSignInUnsub();
  onSignInUnsub = authService.onChange(() => {
    if (authService.isSignedIn()) {
      dismissLoginWall();
      onSignedIn?.();
    }
  });

  paintButton();

  // Reveal fallback if auth provider isn't ready in time.
  if (readyTimerId) clearTimeout(readyTimerId);
  readyTimerId = setTimeout(() => {
    if (!activeWall) return;
    if (!authService.isSignedIn() && !buttonSlotHasContent(buttonSlot)) {
      fallback.hidden = false;
    }
  }, READY_TIMEOUT_MS);

  return wall;
}
