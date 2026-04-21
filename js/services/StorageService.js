/**
 * Storage Service
 * Handles IndexedDB interaction and File System Access API
 */
class StorageService {
  constructor() {
    this.dbName = 'FlowLearnDB';
    this.dbVersion = 2;
    this.db = null;
    this.directoryHandle = null;
    this.userId = 'user_default';
    this._userChangeListeners = new Set();
  }

  /**
   * Set the active user namespace. Triggers subscribers so that progress and
   * related managers can reload the user-scoped blob.
   * @param {string | null | undefined} userId
   */
  setUserId(userId) {
    const next = userId ? String(userId) : 'user_default';
    if (next === this.userId) return;
    this.userId = next;
    for (const l of this._userChangeListeners) {
      try {
        l(this.userId);
      } catch (err) {
        console.warn('[storage] userChange listener errored:', err);
      }
    }
  }

  getUserId() {
    return this.userId;
  }

  onUserChange(listener) {
    if (typeof listener !== 'function') return () => {};
    this._userChangeListeners.add(listener);
    return () => this._userChangeListeners.delete(listener);
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = (event) => {
        console.error('Database error:', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.log('IndexedDB opened successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const oldVersion = event.oldVersion;

        // Version 1 stores
        if (oldVersion < 1) {
          // Settings Store
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' });
          }

          // Progress Store
          if (!db.objectStoreNames.contains('progress')) {
            db.createObjectStore('progress', { keyPath: 'userId' });
          }

          // File Handles Store (for persistent permissions)
          if (!db.objectStoreNames.contains('handles')) {
            db.createObjectStore('handles', { keyPath: 'id' });
          }
        }

        // Version 2 stores
        if (oldVersion < 2) {
          // SRS (Spaced Repetition) Store
          if (!db.objectStoreNames.contains('srs')) {
            db.createObjectStore('srs', { keyPath: 'wordKey' });
          }

          // Chat History Store (for future Feature 8)
          if (!db.objectStoreNames.contains('chat_history')) {
            db.createObjectStore('chat_history', { keyPath: 'sessionId' });
          }
        }
      };
    });
  }

  /**
   * Request access to a local directory for music
   */
  async requestMusicDirectory() {
    try {
      // Check if we already have a handle saved
      // Note: Browsers require re-verification of permission on reload usually,
      // but we can retrieve the handle.

      this.directoryHandle = await window.showDirectoryPicker({
        id: 'flowlearn-music',
        mode: 'read',
      });

      // Save handle to DB for future use (though permission needs re-request)
      await this.saveHandle('musicDir', this.directoryHandle);

      return this.directoryHandle;
    } catch (err) {
      console.error('Error requesting directory:', err);
      throw err;
    }
  }

  async saveHandle(key, handle) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['handles'], 'readwrite');
      const store = transaction.objectStore('handles');
      const request = store.put({ id: key, handle });

      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async getHandle(key) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['handles'], 'readonly');
      const store = transaction.objectStore('handles');
      const request = store.get(key);

      request.onsuccess = (e) => resolve(e.target.result ? e.target.result.handle : null);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  // --- Generic Helpers ---

  async save(storeName, data) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async load(storeName, key) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async loadAll(storeName) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = (e) => resolve(e.target.result || []);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async delete(storeName, key) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  }
}

export const storageService = new StorageService();
