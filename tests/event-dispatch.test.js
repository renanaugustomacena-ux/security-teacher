import { describe, it, expect, vi, beforeEach } from 'vitest';
import { delegate } from '../js/utils/EventDispatch.js';

// delegate() is the single chokepoint for ALL interaction in this app: the CSP
// forbids inline handlers, so every button and card routes through here.
//
// It also carries the §15.1 keyboard guarantee. Much of the UI dispatches from
// card-shaped <div>s (topic cards, lesson cards, the 23 mode cards, practice
// cards) which fire on click but which a keyboard user could never trigger.
// Handling Enter/Space here is what makes the app operable without a mouse, so
// that behaviour is pinned below.

// jsdom is not installed; these are the smallest stubs that model the DOM
// semantics delegate() actually relies on (closest / contains / matches).
function makeEl({ tag = 'div', action, dataset = {}, disabled = false, parent = null } = {}) {
  const el = {
    tagName: tag.toUpperCase(),
    dataset: action ? { action, ...dataset } : { ...dataset },
    disabled,
    parent,
    matches(sel) {
      if (sel === '[disabled]') return this.disabled;
      // Only the native-control check is used with this form.
      return sel
        .split(',')
        .some((s) => s.trim().split(/[[:]/)[0].toLowerCase() === this.tagName.toLowerCase());
    },
    closest(sel) {
      if (sel !== '[data-action]') return null;
      let node = this;
      while (node) {
        if (node.dataset && node.dataset.action) return node;
        node = node.parent;
      }
      return null;
    },
  };
  return el;
}

function makeContainer() {
  const listeners = {};
  return {
    listeners,
    addEventListener: vi.fn((type, fn) => {
      listeners[type] = listeners[type] || [];
      listeners[type].push(fn);
    }),
    removeEventListener: vi.fn((type, fn) => {
      listeners[type] = (listeners[type] || []).filter((f) => f !== fn);
    }),
    contains: () => true,
    fire(type, event) {
      for (const fn of listeners[type] || []) fn(event);
    },
  };
}

const evt = (target, extra = {}) => ({
  target,
  preventDefault: vi.fn(),
  ...extra,
});

describe('delegate — click dispatch', () => {
  let container;
  let handler;

  beforeEach(() => {
    container = makeContainer();
    handler = vi.fn();
    globalThis.Element = function Element() {};
  });

  const withElementInstance = (el) => {
    Object.setPrototypeOf(el, globalThis.Element.prototype);
    return el;
  };

  it('invokes the mapped action and prevents default', () => {
    delegate(container, { 'topic.open': handler });
    const el = withElementInstance(makeEl({ action: 'topic.open', dataset: { topicId: 'linux' } }));
    const e = evt(el);
    container.fire('click', e);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].topicId).toBe('linux');
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('ignores unmapped actions and disabled elements', () => {
    delegate(container, { 'topic.open': handler });
    container.fire('click', evt(withElementInstance(makeEl({ action: 'topic.nope' }))));
    expect(handler).not.toHaveBeenCalled();

    container.fire(
      'click',
      evt(withElementInstance(makeEl({ action: 'topic.open', disabled: true })))
    );
    expect(handler).not.toHaveBeenCalled();
  });

  it('unbind removes both listeners', () => {
    const unbind = delegate(container, { 'topic.open': handler });
    unbind();
    container.fire('click', evt(withElementInstance(makeEl({ action: 'topic.open' }))));
    container.fire(
      'keydown',
      evt(withElementInstance(makeEl({ action: 'topic.open' })), { key: 'Enter' })
    );
    expect(handler).not.toHaveBeenCalled();
  });

  it('returns a no-op for a missing container instead of throwing', () => {
    expect(() => delegate(null, {})()).not.toThrow();
    expect(() => delegate(undefined, {})()).not.toThrow();
  });
});

describe('delegate — keyboard dispatch (§15.1)', () => {
  let container;
  let handler;

  beforeEach(() => {
    container = makeContainer();
    handler = vi.fn();
    globalThis.Element = function Element() {};
  });

  const el = (opts) => {
    const node = makeEl(opts);
    Object.setPrototypeOf(node, globalThis.Element.prototype);
    return node;
  };

  it('Enter activates a card-shaped div — the whole point of the fix', () => {
    delegate(container, { 'topic.startMode': handler });
    const e = evt(el({ tag: 'div', action: 'topic.startMode', dataset: { mode: 'lab' } }), {
      key: 'Enter',
    });
    container.fire('keydown', e);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].mode).toBe('lab');
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('Space activates too, including the legacy "Spacebar" key name', () => {
    delegate(container, { 'topic.open': handler });
    container.fire('keydown', evt(el({ action: 'topic.open' }), { key: ' ' }));
    container.fire('keydown', evt(el({ action: 'topic.open' }), { key: 'Spacebar' }));
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('other keys do nothing — typing must not fire actions', () => {
    delegate(container, { 'topic.open': handler });
    for (const key of ['a', 'Tab', 'Escape', 'ArrowDown', 'Shift']) {
      container.fire('keydown', evt(el({ action: 'topic.open' }), { key }));
    }
    expect(handler).not.toHaveBeenCalled();
  });

  it('does NOT double-fire on a real <button>', () => {
    // The browser synthesises a click for Enter/Space on native controls. If we
    // also handled the keydown, every button press would run its action twice —
    // double-scoring an answer or double-awarding XP.
    delegate(container, { 'topicPractice.checkAnswer': handler });
    container.fire(
      'keydown',
      evt(el({ tag: 'button', action: 'topicPractice.checkAnswer' }), { key: 'Enter' })
    );
    expect(handler).not.toHaveBeenCalled();
  });

  it('does not fire for a disabled element', () => {
    delegate(container, { 'topic.open': handler });
    container.fire('keydown', evt(el({ action: 'topic.open', disabled: true }), { key: 'Enter' }));
    expect(handler).not.toHaveBeenCalled();
  });
});
