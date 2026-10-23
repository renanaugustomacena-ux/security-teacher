/**
 * Level-game registry — the coexistence mechanism.
 *
 * A sparse map from "<surface>:<level>" to a dynamic-import thunk. When a level
 * opens, its manager asks here: a hit mounts the game through GameHost, a miss
 * falls through to the existing lesson engine and practice exercises,
 * unmodified. Migration is level by level; there is no flag day.
 *
 * `surface` is `learn` for the four bilingual lesson levels, or a topic id from
 * js/topics/registry.js. `level` is the zero-based index used by the data
 * files, so "learn:1" is L1 «Vita quotidiana» and "nodejs:0" is Node.js L1.
 *
 * Registering a game is one new file plus two lines: an entry here and an entry
 * in sw.js#STATIC_ASSETS. The second is required twice over — the §17.8 CI gate
 * demands every js/**\/*.js be listed, and scripts/cap-prepare.mjs reads that
 * same list to build the APK. A file absent from STATIC_ASSETS does not exist
 * on Android.
 */

/** The four bilingual lesson levels; every other surface is a topic id. */
export const LEARN_SURFACE = 'learn';

const GAMES = {
  'learn:0': () => import('./levels/inglese-l0-taverna.js'),
  'learn:1': () => import('./levels/inglese-l1-guado.js'),
  'cybersecurity:0': () => import('./levels/cyber-l1-casa.js'),
  'nodejs:0': () => import('./levels/nodejs-l1-chiosco.js'),
  'nodejs:2': () => import('./levels/nodejs-l3-bilancia.js'),
  'nodejs:4': () => import('./levels/nodejs-l5-officina.js'),
  'nodejs:5': () => import('./levels/nodejs-l6-centralino.js'),
  'nodejs:6': () => import('./levels/nodejs-l7-linea.js'),
  'nodejs:7': () => import('./levels/nodejs-l8-indirizzario.js'),
  'nodejs:8': () => import('./levels/nodejs-l9-catena.js'),
  'nodejs:9': () => import('./levels/nodejs-l10-archivio.js'),
  'nodejs:10': () => import('./levels/nodejs-l11-lasciapassare.js'),
  'nodejs:11': () => import('./levels/nodejs-l12-scarico.js'),
  'nodejs:12': () => import('./levels/nodejs-l13-condotto.js'),
  'nodejs:18': () => import('./levels/nodejs-l19-tsc.js'),
};

export function gameKey(surface, level) {
  return `${surface}:${level}`;
}

export function hasGame(surface, level) {
  return Object.prototype.hasOwnProperty.call(GAMES, gameKey(surface, level));
}

/**
 * @returns {Promise<object|null>} the game module's default export, or null
 *   when no game is registered or the import fails — the caller falls back to
 *   the legacy path with a visible notice (§11.2).
 */
export async function loadGame(surface, level) {
  const thunk = GAMES[gameKey(surface, level)];
  if (!thunk) return null;
  try {
    const module = await thunk();
    return module.default || null;
  } catch (err) {
    console.error(`Game "${gameKey(surface, level)}" failed to load:`, err && err.message);
    return null;
  }
}

/** Registered keys, for the CI gate that pairs registry.js with STATIC_ASSETS. */
export function registeredKeys() {
  return Object.keys(GAMES);
}
