/**
 * Simple Pub/Sub Store for State Management
 */
class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(update) {
    const newState = typeof update === 'function' ? update(this.state) : update;

    // Shallow merge for top-level keys if update is an object
    // But deeper merge might be safer. For now, we assume simple slice updates.
    // Actually, let's do a shallow merge of the new state into old state?
    // Or just replace? The app.js usage suggests:
    // store.setState({ ui: { currentView: view } }); -> likely meant to merge?
    // But usually simple stores replace or merge. Let's do a shallow merge of partials.

    // However, the example usage: `store.setState((state) => ({ ui: { ...state.ui, theme: next } }))`
    // suggests the return value is the *new* state slice to merge?
    // Let's implement a simple merger.

    // Deep merge one level: nested objects get merged, not replaced
    const merged = { ...this.state };
    for (const key of Object.keys(newState)) {
      if (
        typeof newState[key] === 'object' &&
        newState[key] !== null &&
        !Array.isArray(newState[key]) &&
        typeof merged[key] === 'object' &&
        merged[key] !== null
      ) {
        merged[key] = { ...merged[key], ...newState[key] };
      } else {
        merged[key] = newState[key];
      }
    }
    this.state = merged;

    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

// Initial State
const initialState = {
  ui: {
    theme: 'light',
    currentView: 'home', // 'home', 'karaoke', 'settings'
    isLoading: false,
  },
  playback: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentSongId: null,
  },
  user: {
    progress: {}, // To be loaded from StorageService
  },
};

export const store = new Store(initialState);
