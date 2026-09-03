/**
 * Event delegation utility — replacement for inline `onclick=` attributes.
 *
 * Doctrine §3.4 enables the CSP directive `require-trusted-types-for 'script'`,
 * which causes the platform to silently reject inline event-handler attributes
 * (`onclick`, `onload`, etc.) assigned via Trusted Types-controlled sinks like
 * `innerHTML`. The user-visible symptom is "the button does nothing." Instead,
 * elements declare `data-action="<name>"` (plus arbitrary `data-*` payload),
 * and a single delegated click listener resolves the action against a map.
 *
 * Two surfaces:
 *   - `delegate(container, map)`         — scope a dispatch table to one element.
 *   - `registerAction` / `bindGlobalDispatch` — body-level registry, useful for
 *     legacy globals from `index.html` and managers that share dispatch.
 */

/**
 * Attach a delegated click listener on `container`. Returns an unbind fn.
 *
 * @param {Element|Document|null|undefined} container
 * @param {Record<string, (dataset: DOMStringMap, event: Event, el: Element) => void>} dispatchMap
 * @returns {() => void}
 */
export function delegate(container, dispatchMap) {
  if (!container || typeof container.addEventListener !== 'function') {
    return () => {};
  }
  const resolve = (e) => {
    if (!(e.target instanceof Element)) return null;
    const el = e.target.closest('[data-action]');
    if (!el || !container.contains(el)) return null;
    if (el.matches('[disabled]')) return null;
    const fn = dispatchMap[el.dataset.action];
    return typeof fn === 'function' ? { el, fn } : null;
  };

  const handler = (e) => {
    const hit = resolve(e);
    if (!hit) return;
    e.preventDefault();
    hit.fn(hit.el.dataset, e, hit.el);
  };

  // Doctrine §15.1: every interactive element must be keyboard-reachable.
  // Much of the UI dispatches from card-shaped <div>s rather than <button>s
  // (topic cards, lesson cards, mode cards, practice cards). Those fire on
  // click but a keyboard user could never trigger them. Handling Enter/Space
  // here fixes every current and future data-action element in one place —
  // the alternative was re-tagging a dozen call sites and hoping the next one
  // remembers. Native controls are skipped because the browser already
  // synthesises a click for them, which would otherwise fire the action twice.
  const keyHandler = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    const hit = resolve(e);
    if (!hit) return;
    if (hit.el.matches('button, a[href], input, select, textarea')) return;
    e.preventDefault();
    hit.fn(hit.el.dataset, e, hit.el);
  };

  container.addEventListener('click', handler);
  container.addEventListener('keydown', keyHandler);
  return () => {
    container.removeEventListener('click', handler);
    container.removeEventListener('keydown', keyHandler);
  };
}

const globalActions = Object.create(null);
let globalBound = false;

/**
 * Register a body-level action. Idempotent on `name` — last registration wins.
 * @param {string} name
 * @param {(dataset: DOMStringMap, event: Event, el: Element) => void} handler
 */
export function registerAction(name, handler) {
  globalActions[name] = handler;
}

/** Remove a registered action. */
export function unregisterAction(name) {
  delete globalActions[name];
}

/**
 * Attach the body-level delegated listener once. Subsequent calls no-op.
 * @param {Element|Document} [target=document.body]
 */
export function bindGlobalDispatch(target) {
  if (globalBound) return;
  globalBound = true;
  delegate(target || document.body, globalActions);
}

/** Test-only: reset registry + binding flag. */
export function _resetGlobalDispatchForTests() {
  for (const key of Object.keys(globalActions)) delete globalActions[key];
  globalBound = false;
}
