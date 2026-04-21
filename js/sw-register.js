/**
 * Service worker bootstrap.
 *
 * - Scope pinned to '/'.
 * - updateViaCache:'none' forces the browser to bypass HTTP cache when
 *   checking for a new sw.js, so a security patch isn't blocked by a
 *   30-day CDN TTL.
 * - When an update is detected, a DOM toast asks the user to reload.
 *   The new SW stays in "waiting" state until the user confirms —
 *   a rogue update cannot silently replace the running SW.
 */
(function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  function showUpdateToast(onAccept) {
    // Idempotent — skip if toast already visible.
    if (document.getElementById('sw-update-toast')) return;
    const toast = document.createElement('div');
    toast.id = 'sw-update-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.cssText = [
      'position:fixed',
      'bottom:24px',
      'right:24px',
      'z-index:99999',
      'background:#111',
      'color:#fff',
      'padding:14px 18px',
      'border-radius:10px',
      'font:14px system-ui,sans-serif',
      'box-shadow:0 8px 24px rgba(0,0,0,.4)',
      'max-width:320px',
      'display:flex',
      'gap:10px',
      'align-items:center',
    ].join(';');

    const msg = document.createElement('span');
    msg.textContent = 'Nuova versione disponibile';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Ricarica';
    btn.style.cssText = [
      'background:#e67e22',
      'color:#fff',
      'border:0',
      'padding:8px 14px',
      'border-radius:6px',
      'cursor:pointer',
      'font-weight:600',
    ].join(';');
    btn.addEventListener('click', () => {
      btn.disabled = true;
      onAccept();
    });
    const dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.textContent = '✕';
    dismiss.setAttribute('aria-label', 'Chiudi');
    dismiss.style.cssText = [
      'background:transparent',
      'color:#aaa',
      'border:0',
      'cursor:pointer',
      'font-size:16px',
      'padding:4px 6px',
    ].join(';');
    dismiss.addEventListener('click', () => toast.remove());

    toast.appendChild(msg);
    toast.appendChild(btn);
    toast.appendChild(dismiss);
    document.body.appendChild(toast);
  }

  navigator.serviceWorker
    .register('/sw.js', { scope: '/', updateViaCache: 'none' })
    .then((registration) => {
      console.info('[SW] registered ok');

      registration.addEventListener('updatefound', () => {
        const incoming = registration.installing;
        if (!incoming) return;
        incoming.addEventListener('statechange', () => {
          if (incoming.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateToast(() => {
              incoming.postMessage({ type: 'SW_SKIP_WAITING' });
            });
          }
        });
      });
    })
    .catch((err) => console.warn('[SW] registration failed:', err));

  // Auto-reload once the new SW actually takes over. Guarded so it fires
  // exactly once per page load.
  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloaded) return;
    reloaded = true;
    window.location.reload();
  });
})();
