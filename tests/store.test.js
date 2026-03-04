import { describe, it, expect, beforeEach } from 'vitest';

// Since store is a singleton with side effects, we test its core logic
describe('Store (Pub/Sub)', () => {
  let store;

  beforeEach(async () => {
    // Re-import fresh module for each test
    const module = await import('../js/store/index.js');
    store = module.store;
    // Reset to initial state
    store.setState({
      ui: { theme: 'light', currentView: 'home', isLoading: false },
      playback: { isPlaying: false, currentTime: 0, duration: 0, currentSongId: null },
      user: { progress: {} },
    });
  });

  it('getState returns current state', () => {
    const state = store.getState();
    expect(state.ui).toBeDefined();
    expect(state.ui.currentView).toBe('home');
  });

  it('setState merges partial updates', () => {
    store.setState({ ui: { theme: 'dark' } });
    const state = store.getState();
    expect(state.ui.theme).toBe('dark');
  });

  it('subscribe calls listener on state change', () => {
    let callCount = 0;
    let lastState = null;
    const unsub = store.subscribe((state) => {
      callCount++;
      lastState = state;
    });

    store.setState({ ui: { theme: 'dark' } });
    expect(callCount).toBe(1);
    expect(lastState.ui.theme).toBe('dark');

    unsub();
  });

  it('unsubscribe stops notifications', () => {
    let callCount = 0;
    const unsub = store.subscribe(() => {
      callCount++;
    });

    store.setState({ ui: { theme: 'dark' } });
    expect(callCount).toBe(1);

    unsub();
    store.setState({ ui: { theme: 'light' } });
    expect(callCount).toBe(1); // Should not increment
  });
});
