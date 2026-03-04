/**
 * Storage Service
 * Handles IndexedDB interaction and File System Access API
 */
class StorageService {
  constructor() {
    this.dbName = 'FlowLearnDB';
    this.dbVersion = 1;
    this.db = null;
    this.directoryHandle = null;
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
}

export const storageService = new StorageService();
