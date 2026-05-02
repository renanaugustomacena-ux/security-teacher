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
  const handler = (e) => {
    if (!(e.target instanceof Element)) return;
    const el = e.target.closest('[data-action]');
    if (!el || !container.contains(el)) return;
    if (el.matches('[disabled]')) return;
    const action = el.dataset.action;
    const fn = dispatchMap[action];
    if (typeof fn !== 'function') return;
    e.preventDefault();
    fn(el.dataset, e, el);
  };
  container.addEventListener('click', handler);
  return () => container.removeEventListener('click', handler);
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
