/**
 * TOPIC LESSON LAYOUTS - FlowLearn
 * =================================
 *
 * Registry + selection logic for lesson layouts.
 *
 * Until now every one of the ~900 lessons rendered through the single hardcoded
 * pipeline in TopicLessonEngine.js (intro -> context cards -> 2 MCQs -> summary),
 * which is why the app "gets boring before finishing the first levels". A lesson
 * now resolves to one of several layouts that teach the SAME data differently:
 *
 *   classic   — teach, then quiz            (TopicLessonEngine, the original)
 *   discovery — guess first, then teach     (pretesting effect)
 *   compare   — contrast confusable pairs   (discrimination practice)
 *   story     — narrative cloze passage     (vocabulary in connected prose)
 *   drill     — self-rated flip cards       (fast, low-friction recall)
 *
 * Selection rules, in order:
 *   1. An explicit `layout` field on the lesson always wins (authored content
 *      can pin a layout that suits its material).
 *   2. Otherwise the layout is chosen by a stable hash of the lesson id, so a
 *      given lesson always renders the same way (no surprise reshuffle between
 *      sessions) while consecutive lessons differ.
 *   3. A candidate layout that reports `canRender(lesson) === false` is skipped
 *      — Story, for example, needs enough usable example sentences.
 *   4. Anything that fails to load or cannot render falls back to `classic`,
 *      which has no preconditions.
 *
 * The alternative layouts are dynamically imported so they cost nothing on the
 * initial bundle (doctrine §13.1); they are still listed in sw.js STATIC_ASSETS
 * (§17.8) so they are precached and work offline.
 */

import { TopicLessonEngine } from './TopicLessonEngine.js';
import { hashString } from './TopicLessonShared.js';

/**
 * Registry entry shape:
 *   id          stable key, also the value accepted in a lesson's `layout` field
 *   name/nameIt bilingual display name
 *   icon        single emoji shown on the lesson card badge
 *   rotate      whether the automatic rotation may pick this layout
 *   load()      resolves to { Cls, canRender }
 */
const REGISTRY = {
  classic: {
    id: 'classic',
    name: 'Guided',
    nameIt: 'Guidata',
    icon: '📘',
    rotate: true,
    load: async () => ({ Cls: TopicLessonEngine, canRender: () => true }),
  },
  discovery: {
    id: 'discovery',
    name: 'Discovery',
    nameIt: 'Scoperta',
    icon: '🔎',
    rotate: true,
    load: async () => {
      const m = await import('./TopicLessonDiscovery.js');
      return { Cls: m.TopicLessonDiscovery, canRender: m.canRender };
    },
  },
  compare: {
    id: 'compare',
    name: 'Compare',
    nameIt: 'Confronto',
    icon: '⚖️',
    rotate: true,
    load: async () => {
      const m = await import('./TopicLessonCompare.js');
      return { Cls: m.TopicLessonCompare, canRender: m.canRender };
    },
  },
  story: {
    id: 'story',
    name: 'Story',
    nameIt: 'Storia',
    icon: '📖',
    rotate: true,
    load: async () => {
      const m = await import('./TopicLessonStory.js');
      return { Cls: m.TopicLessonStory, canRender: m.canRender };
    },
  },
  drill: {
    id: 'drill',
    name: 'Drill',
    nameIt: 'Ripasso',
    icon: '⚡',
    rotate: true,
    load: async () => {
      const m = await import('./TopicLessonDrill.js');
      return { Cls: m.TopicLessonDrill, canRender: m.canRender };
    },
  },
};

/** Deterministic rotation order. Keep stable — changing it reshuffles every lesson. */
const ROTATION = ['classic', 'discovery', 'compare', 'story', 'drill'];

export const LAYOUT_IDS = Object.keys(REGISTRY);

/** Public metadata for a layout id (for badges on lesson cards). */
export function getLayoutMeta(layoutId) {
  const entry = REGISTRY[layoutId];
  if (!entry) return null;
  const { id, name, nameIt, icon } = entry;
  return { id, name, nameIt, icon };
}

/**
 * The layout id a lesson *would* use, without loading anything. Used for the
 * badge on lesson cards. Note this ignores `canRender`, which needs the module —
 * the resolved layout may differ if the preferred one bails out.
 */
export function predictLayoutId(lesson) {
  if (!lesson) return 'classic';
  if (typeof lesson.layout === 'string' && REGISTRY[lesson.layout]) return lesson.layout;
  const pool = ROTATION.filter((id) => REGISTRY[id]?.rotate);
  if (pool.length === 0) return 'classic';
  return pool[hashString(lesson.id || lesson.title || '') % pool.length];
}

/** Candidate ids to try, in preference order, always ending at `classic`. */
function candidateIds(lesson) {
  const preferred = predictLayoutId(lesson);
  const pool = ROTATION.filter((id) => REGISTRY[id]?.rotate);
  const start = Math.max(0, pool.indexOf(preferred));
  const ordered = [];
  for (let i = 0; i < pool.length; i += 1) {
    ordered.push(pool[(start + i) % pool.length]);
  }
  if (!ordered.includes('classic')) ordered.push('classic');
  return ordered;
}

/**
 * Resolve the layout for a lesson and return an INSTANCE ready to `start()`.
 * Never throws: any load or precondition failure degrades to the classic engine.
 *
 * @returns {Promise<{engine: object, layoutId: string, meta: object}>}
 */
export async function createLessonEngine(lesson, progressManager) {
  for (const id of candidateIds(lesson)) {
    const entry = REGISTRY[id];
    if (!entry) continue;
    try {
      const { Cls, canRender } = await entry.load();
      if (typeof Cls !== 'function') continue;
      if (typeof canRender === 'function' && !canRender(lesson)) continue;
      return { engine: new Cls(progressManager), layoutId: id, meta: getLayoutMeta(id) };
    } catch (err) {
      console.warn(`[layouts] "${id}" unavailable, trying next`, err);
    }
  }
  return {
    engine: new TopicLessonEngine(progressManager),
    layoutId: 'classic',
    meta: getLayoutMeta('classic'),
  };
}
