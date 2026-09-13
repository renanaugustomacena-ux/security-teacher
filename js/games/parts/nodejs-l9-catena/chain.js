/**
 * La catena di controllo — the stations of the duct and what each one does
 * when a pod reaches it. Pure data and pure functions, shared by the level
 * module and its suite so the bot can read the same rule the game applies.
 *
 * pass  → the pod must be given the go (a term valve)
 * add   → the station adds to the parcel, then the go
 * gate  → the go if the pod carries what the check needs, else the station
 *         answers itself: the seal
 * cache → the seal if the pod is already cached, else the go (the template
 *         declared the `cached` flag on every pod but never read it — see the
 *         level header, deviation 1)
 * seal  → the station answers: the seal, never the go
 */

export const MW = {
  log: { n: 'log', kind: 'pass' },
  json: { n: 'json()', kind: 'add', adds: 'body' },
  auth: { n: 'auth', kind: 'gate', needs: 'token' },
  user: { n: 'loadUser', kind: 'add', adds: 'user' },
  limit: { n: 'rateLimit', kind: 'gate', needs: 'quota' },
  cache: { n: 'cache', kind: 'cache' },
  error: { n: 'errorHandler', kind: 'seal' },
  route: { n: 'handler', kind: 'seal' },
};

const TAGS = {
  pass: ['passa', 'passes'],
  gate: ['controlla', 'checks'],
  seal: ['risponde', 'answers'],
  cache: ['risponde se ha', 'answers if held'],
};

/** The station a pod is at, or null once it has left the chain. */
export function stationOf(cfg, cap) {
  return MW[cfg.chain[cap.at]] || null;
}

/** What the station wants from the player for this pod: 'next' or 'seal'. */
export function wantOf(cfg, cap) {
  const mw = stationOf(cfg, cap);
  if (!mw || mw.kind === 'seal') return 'seal';
  if (mw.kind === 'gate') return cap[mw.needs] ? 'next' : 'seal';
  if (mw.kind === 'cache') return cap.cached ? 'seal' : 'next';
  return 'next';
}

/** The template's coach kind for the wrong action at a station. */
export function failKind(mw, want) {
  if (want === 'next') return 'hang';
  return mw && mw.kind === 'gate' ? 'gate' : 'seal';
}

/** The Italian (or English) word under the station name: the world's voice. */
export function tagOf(mw, lang) {
  if (mw.kind === 'add') return `+${mw.adds}`;
  const pair = TAGS[mw.kind] || TAGS.pass;
  return lang === 'en' ? pair[1] : pair[0];
}

/** What the pod carries, as the template's marks: T Q C {} U. */
export function marksOf(cap) {
  const m = [];
  if (cap.token) m.push('T');
  if (cap.quota) m.push('Q');
  if (cap.cached) m.push('C');
  if (cap.body) m.push('{}');
  if (cap.user) m.push('U');
  return m.join(' ');
}
