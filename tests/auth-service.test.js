/* eslint-disable import/first */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('../js/services/StorageService.js', () => {
  const store = new Map();
  return {
    storageService: {
      load: vi.fn(async (table, key) => store.get(`${table}:${key}`) ?? null),
      save: vi.fn(async (table, value) => {
        store.set(`${table}:${value.key}`, value);
      }),
      delete: vi.fn(async (table, key) => {
        store.delete(`${table}:${key}`);
      }),
      __reset: () => store.clear(),
    },
  };
});

import { AuthService } from '../js/services/AuthService.js';
import { storageService } from '../js/services/StorageService.js';
/* eslint-enable import/first */

const CLIENT_ID = 'test-client-id.apps.googleusercontent.com';

function b64url(buf) {
  const bin = String.fromCharCode(...new Uint8Array(buf));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function makeJwt(payload, header = { alg: 'RS256', typ: 'JWT' }) {
  const enc = new TextEncoder();
  const h = b64url(enc.encode(JSON.stringify(header)));
  const p = b64url(enc.encode(JSON.stringify(payload)));
  return `${h}.${p}.signature-not-checked`;
}

function makeValidPayload(overrides = {}) {
  const nowS = Math.floor(Date.now() / 1000);
  return {
    iss: 'https://accounts.google.com',
    aud: CLIENT_ID,
    sub: '1234567890',
    iat: nowS - 10,
    exp: nowS + 3600,
    email: 'user@example.com',
    name: 'Mario Rossi',
    picture: 'https://lh3.googleusercontent.com/a/photo',
    ...overrides,
  };
}

describe('AuthService — JWT validation (§8.2)', () => {
  let svc;

  beforeEach(() => {
    storageService.__reset();
    vi.clearAllMocks();
    svc = new AuthService();
    svc.clientId = CLIENT_ID;
    svc._ready = true;
    globalThis.window = { google: undefined };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('accepts a fully-valid token and stores the user', async () => {
    const token = makeJwt(makeValidPayload());
    await svc._onCredential({ credential: token });
    expect(svc.isSignedIn()).toBe(true);
    expect(svc.user.sub).toBe('1234567890');
    expect(svc.user.email).toBe('user@example.com');
    expect(svc.user.name).toBe('Mario Rossi');
    expect(svc.user.picture).toBe('https://lh3.googleusercontent.com/a/photo');
    expect(storageService.save).toHaveBeenCalled();
  });

  it('also accepts the bare-host iss form ("accounts.google.com")', async () => {
    const token = makeJwt(makeValidPayload({ iss: 'accounts.google.com' }));
    await svc._onCredential({ credential: token });
    expect(svc.isSignedIn()).toBe(true);
  });

  it('rejects a token with no sub', async () => {
    const token = makeJwt(makeValidPayload({ sub: undefined }));
    await svc._onCredential({ credential: token });
    expect(svc.isSignedIn()).toBe(false);
    expect(storageService.save).not.toHaveBeenCalled();
  });

  it('rejects a token with the wrong iss', async () => {
    const token = makeJwt(makeValidPayload({ iss: 'https://accounts.evil.com' }));
    await svc._onCredential({ credential: token });
    expect(svc.isSignedIn()).toBe(false);
  });

  it('rejects a token with the wrong aud', async () => {
    const token = makeJwt(makeValidPayload({ aud: 'someone-else-client-id' }));
    await svc._onCredential({ credential: token });
    expect(svc.isSignedIn()).toBe(false);
  });

  it('rejects an expired token', async () => {
    const expired = makeValidPayload({
      iat: Math.floor(Date.now() / 1000) - 7200,
      exp: Math.floor(Date.now() / 1000) - 3600,
    });
    await svc._onCredential({ credential: makeJwt(expired) });
    expect(svc.isSignedIn()).toBe(false);
  });

  it('rejects a token whose iat is far in the future (beyond 5-minute skew)', async () => {
    const future = makeValidPayload({ iat: Math.floor(Date.now() / 1000) + 600 });
    await svc._onCredential({ credential: makeJwt(future) });
    expect(svc.isSignedIn()).toBe(false);
  });

  it('rejects a token whose nbf is far in the future', async () => {
    const future = makeValidPayload({ nbf: Math.floor(Date.now() / 1000) + 600 });
    await svc._onCredential({ credential: makeJwt(future) });
    expect(svc.isSignedIn()).toBe(false);
  });

  it('accepts iat within the 5-minute clock-skew grace window', async () => {
    const slightlyFuture = makeValidPayload({ iat: Math.floor(Date.now() / 1000) + 120 });
    await svc._onCredential({ credential: makeJwt(slightlyFuture) });
    expect(svc.isSignedIn()).toBe(true);
  });

  it('rejects a token whose exp type is not numeric', async () => {
    const bad = makeValidPayload({ exp: 'tomorrow' });
    await svc._onCredential({ credential: makeJwt(bad) });
    expect(svc.isSignedIn()).toBe(false);
  });

  it('drops a picture URL from a non-googleusercontent host (defense in depth)', async () => {
    const phishing = makeValidPayload({ picture: 'https://evil.example/spoof.png' });
    await svc._onCredential({ credential: makeJwt(phishing) });
    expect(svc.isSignedIn()).toBe(true);
    expect(svc.user.picture).toBe('');
  });

  it('strips bidi characters from email and name (§4.7 trust boundary)', async () => {
    const sneaky = makeValidPayload({
      email: 'user‮@example.com',
      name: 'Bad‮Actor',
    });
    await svc._onCredential({ credential: makeJwt(sneaky) });
    expect(svc.isSignedIn()).toBe(true);
    expect(svc.user.email).toBe('user@example.com');
    expect(svc.user.name).toBe('BadActor');
  });

  it('truncates absurdly long email and name', async () => {
    const huge = makeValidPayload({
      email: `${'a'.repeat(400)}@e.com`,
      name: 'X'.repeat(500),
    });
    await svc._onCredential({ credential: makeJwt(huge) });
    expect(svc.user.email.length).toBeLessThanOrEqual(254);
    expect(svc.user.name.length).toBeLessThanOrEqual(128);
  });

  it('does nothing on a callback with no credential', async () => {
    await svc._onCredential({});
    await svc._onCredential(null);
    expect(svc.isSignedIn()).toBe(false);
  });
});

describe('AuthService — _decodeJwtPayload', () => {
  let svc;
  beforeEach(() => {
    svc = new AuthService();
  });

  it('decodes a valid 3-part token', () => {
    const payload = { sub: '42', name: 'Test' };
    const token = makeJwt(payload);
    const decoded = svc._decodeJwtPayload(token);
    expect(decoded.sub).toBe('42');
    expect(decoded.name).toBe('Test');
  });

  it('returns null on a 2-part token', () => {
    expect(svc._decodeJwtPayload('header.payload')).toBeNull();
  });

  it('returns null on a 4-part token', () => {
    expect(svc._decodeJwtPayload('a.b.c.d')).toBeNull();
  });

  it('returns null on garbage base64', () => {
    expect(svc._decodeJwtPayload('header.~!~!~!~.signature')).toBeNull();
  });

  it('returns null when the payload is not JSON', () => {
    const enc = new TextEncoder();
    const notJson = b64url(enc.encode('hello'));
    expect(svc._decodeJwtPayload(`h.${notJson}.s`)).toBeNull();
  });
});

describe('AuthService — session cap (§8.2 — 24h regardless of exp)', () => {
  let svc;
  beforeEach(() => {
    storageService.__reset();
    vi.clearAllMocks();
    svc = new AuthService();
  });

  it('drops a cached session whose iat is older than 24h on init', async () => {
    const oldUser = {
      sub: '1',
      email: 'a@b.c',
      name: 'X',
      picture: '',
      iat: Math.floor(Date.now() / 1000) - 25 * 60 * 60, // 25h ago
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
    await storageService.save('settings', { key: 'auth_user', user: oldUser });
    globalThis.document = { querySelector: () => null };
    globalThis.window = { google: undefined };
    await svc.init();
    expect(svc.isSignedIn()).toBe(false);
    expect(storageService.delete).toHaveBeenCalled();
  });

  it('keeps a fresh cached session on init', async () => {
    const freshUser = {
      sub: '1',
      email: 'a@b.c',
      name: 'X',
      picture: '',
      iat: Math.floor(Date.now() / 1000) - 60,
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
    await storageService.save('settings', { key: 'auth_user', user: freshUser });
    globalThis.document = { querySelector: () => null };
    globalThis.window = { google: undefined };
    await svc.init();
    expect(svc.isSignedIn()).toBe(true);
  });
});
