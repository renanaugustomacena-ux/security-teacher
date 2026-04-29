import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storageService } from '../js/services/StorageService.js';

function makeFakeDb() {
  const tables = new Map();
  const ensure = (name) => {
    if (!tables.has(name)) tables.set(name, new Map());
    return tables.get(name);
  };
  return {
    __tables: tables,
    transaction(stores) {
      const name = Array.isArray(stores) ? stores[0] : stores;
      const table = ensure(name);
      return {
        objectStore: () => ({
          put(value) {
            const key = value.key ?? value.userId ?? value.id;
            table.set(key, value);
            const req = {};
            queueMicrotask(() => req.onsuccess && req.onsuccess({ target: req }));
            return req;
          },
          get(key) {
            const req = {};
            queueMicrotask(
              () => req.onsuccess && req.onsuccess({ target: { result: table.get(key) } })
            );
            return req;
          },
          getAll() {
            const req = {};
            const all = Array.from(table.values());
            queueMicrotask(() => req.onsuccess && req.onsuccess({ target: { result: all } }));
            return req;
          },
          delete(key) {
            const req = {};
            table.delete(key);
            queueMicrotask(() => req.onsuccess && req.onsuccess({ target: req }));
            return req;
          },
        }),
      };
    },
  };
}

describe('StorageService — userId namespacing', () => {
  beforeEach(() => {
    storageService.userId = 'user_default';
    storageService._userChangeListeners.clear();
  });

  it('defaults the userId to "user_default" on a fresh instance', () => {
    expect(storageService.getUserId()).toBe('user_default');
  });

  it('setUserId switches the namespace', () => {
    storageService.setUserId('google-sub-12345');
    expect(storageService.getUserId()).toBe('google-sub-12345');
  });

  it('setUserId with falsy value falls back to "user_default"', () => {
    storageService.setUserId('alice');
    storageService.setUserId(null);
    expect(storageService.getUserId()).toBe('user_default');
    storageService.setUserId('');
    expect(storageService.getUserId()).toBe('user_default');
    storageService.setUserId(undefined);
    expect(storageService.getUserId()).toBe('user_default');
  });

  it('coerces non-string userId via String()', () => {
    storageService.setUserId(42);
    expect(storageService.getUserId()).toBe('42');
  });
});

describe('StorageService — onUserChange listener', () => {
  beforeEach(() => {
    storageService.userId = 'user_default';
    storageService._userChangeListeners.clear();
  });

  it('notifies listeners when the userId changes', () => {
    const listener = vi.fn();
    storageService.onUserChange(listener);
    storageService.setUserId('alice');
    expect(listener).toHaveBeenCalledWith('alice');
  });

  it('does NOT notify listeners when setUserId is a no-op', () => {
    const listener = vi.fn();
    storageService.onUserChange(listener);
    storageService.setUserId('user_default');
    expect(listener).not.toHaveBeenCalled();
  });

  it('returns an unsubscribe function', () => {
    const listener = vi.fn();
    const off = storageService.onUserChange(listener);
    storageService.setUserId('alice');
    off();
    storageService.setUserId('bob');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('rejects non-function listeners (returns no-op unsubscribe)', () => {
    const off = storageService.onUserChange('not a function');
    expect(typeof off).toBe('function');
    expect(() => off()).not.toThrow();
  });

  it('a throwing listener does not stop the notification chain', () => {
    const a = vi.fn(() => {
      throw new Error('boom');
    });
    const b = vi.fn();
    storageService.onUserChange(a);
    storageService.onUserChange(b);
    storageService.setUserId('alice');
    expect(a).toHaveBeenCalled();
    expect(b).toHaveBeenCalledWith('alice');
  });
});

describe('StorageService — CRUD shape over a faked IndexedDB', () => {
  beforeEach(() => {
    storageService.userId = 'user_default';
    storageService._userChangeListeners.clear();
    storageService.db = makeFakeDb();
  });

  it('save/load round-trip on the settings store', async () => {
    await storageService.save('settings', { key: 'theme', value: 'dark' });
    const out = await storageService.load('settings', 'theme');
    expect(out).toEqual({ key: 'theme', value: 'dark' });
  });

  it('load returns undefined for an unknown key', async () => {
    const out = await storageService.load('settings', 'missing');
    expect(out).toBeUndefined();
  });

  it('delete removes a stored entry', async () => {
    await storageService.save('settings', { key: 'theme', value: 'dark' });
    await storageService.delete('settings', 'theme');
    const out = await storageService.load('settings', 'theme');
    expect(out).toBeUndefined();
  });

  it('loadAll returns every entry in the store', async () => {
    await storageService.save('settings', { key: 'a', value: 1 });
    await storageService.save('settings', { key: 'b', value: 2 });
    const all = await storageService.loadAll('settings');
    expect(all).toHaveLength(2);
    expect(all.map((x) => x.key).sort()).toEqual(['a', 'b']);
  });
});
