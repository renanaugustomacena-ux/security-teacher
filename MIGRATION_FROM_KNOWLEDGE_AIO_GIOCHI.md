# MIGRATION GUIDE: knowledge-aio-giochi -> security-teacher (main)

This document is the authoritative guide for integrating games from knowledge-aio-giochi/ into the main build. Based on reading the full codebase architecture.

## Architecture Summary

### Main App (ES modules, vanilla DOM)
- **GameHost** (js/games/GameHost.js): Mounts games, manages chrome (pause/coach/done), handles input, owns lifecycle
- **KaioEngine** (js/games/KaioEngine.js): Canvas loop, input mapping, particles, audio via GameAudioService, prefers-reduced-motion
- **Registry** (js/games/registry.js): Maps \"<surface>:<level>\" to dynamic imports
- **LevelSession/LevelItem**: Pedagogy/telemetry (attempt() grading, mastery, analytics)
- **LevelBeats**: Vocabulary spine mapping beats to session items

### Templates (knowledge-aio-giochi)
- Use old kaio-engine.js (window-based IIFE) + React frames in .dc.html
- Need to be ported to main's ES module pattern

## What Needs to Be Done

### 1) Identify Missing Games
Compare templates vs main levels:
`ash
# Templates dirs: inglese-taverna, inglese-sotto-la-rocca, cyber-l1-casa, nodejs-l1-chiosco, nodejs-l2-officina, nodejs-l3-discesa, nodejs-l3-bilancia, nodejs-l4-soglia, nodejs-l5-magazzino, nodejs-l5-officina, nodejs-l6-cucina, nodejs-l6-centralino, nodejs-l7-linea, nodejs-l8-indirizzario, nodejs-l9-catena, nodejs-l9-smistamento, nodejs-l10-archivio, nodejs-l11-lasciapassare, nodejs-l12-scarico, nodejs-l13-condotto, nodejs-l19-tsc, banda-1, banda-2, level-aesthetics
# Main levels: inglese-l0-taverna.js, inglese-l1-guado.js, cyber-l1-casa.js, nodejs-l1-chiosco.js, nodejs-l3-bilancia.js, nodejs-l5-officina.js, nodejs-l6-centralino.js, nodejs-l7-linea.js, nodejs-l8-indirizzario.js, nodejs-l9-catena.js, nodejs-l10-archivio.js, nodejs-l11-lasciapassare.js, nodejs-l12-scarico.js, nodejs-l13-condotto.js, nodejs-l19-tsc.js
`

Missing: 
odejs-l2-officina, 
odejs-l3-discesa, 
odejs-l4-soglia, 
odejs-l5-magazzino, 
odejs-l6-cucina, 
odejs-l9-smistamento (and possibly others). Also check if main naming differs.

### 2) Port Pattern (Follow Existing Levels)
Look at js/games/levels/inglese-l0-taverna.js or 
odejs-l5-officina.js as templates.

**Level module structure:**
`js
import * as engine from '../KaioEngine.js';
import { ttsService } from '../../services/TTSService.js';
import { beatItems, beatItem, distractors, labelOf, meaningOf } from '../LevelBeats.js';
// import parts if needed

const W = 420;
const H = 910;
// constants...

const CH = [ /* 8 chapters x 5 beats */ ];

export default {
  kind: 'canvas', // or 'dom' for terminal games
  W,
  H,
  CH,
  
  init(host) {
    // setup
  },
  
  reset(beat) {
    // build level for beat using beatItem/beatItems from session
  },
  
  update(dt) { /* game logic */ },
  draw(ctx) { /* rendering */ },
  
  tap(host, p) { /* input */ },
  // down/drag/up/swipe/key as needed
  
  coachText(host, coach, lang) { /* return {what, effect, rule, hint} */ },
  doneView(host, lang) { /* return {eyebrow, title, subtitle} */ },
};
`

**Key differences from templates:**
- Use host not self (React-like)
- Use engine.snd(host, voice, opts) not KAIO.snd(self, voice, opts)
- Use 	tsService.speak(text, 'en-GB')
- Get items via eatItem(host.session, chapter, beat) or eatItems(...)
- Use host.setState({ coach: {...} }) 
- GameHost handles chrome/rendering
- No React, no window globals

### 3) Extract from Templates
For each .dc.html in templates:
- Look for game logic in <script type="text/x-dc"> or inline JS
- Extract update/reset/draw/input logic
- Convert to ES modules
- Use main's engine/LevelBeats patterns

### 4) Update Registry (js/games/registry.js)
Add entries for new games:
`js
const GAMES = {
  'learn:0': () => import('./levels/inglese-l0-taverna.js'),
  // ...
  'nodejs:1': () => import('./levels/nodejs-l2-officina.js'), // if mapping matches
};
`
Check js/topics/data/nodejs.js for level order - registry uses zero-based index matching data files.

### 5) Update sw.js STATIC_ASSETS (MANDATORY)
Add every new JS file:
- ./js/games/levels/<new>.js
- ./js/games/parts/<game>/<file>.js

Doctrine A46.3 enforces: every registered game in STATIC_ASSETS, every file in js/games/levels/ registered.

### 6) Create Parts if Needed
Complex games have parts in js/games/parts/<game-name>/ (layout.js, draw.js, chapters.js etc). Follow existing pattern.

### 7) Test Locally
`ash
npm run lint
npm test
`

### 8) Deploy
`ash
git add js/games/ sw.js
git commit -m \"feat(games): integrate games from knowledge-aio-giochi\"
git push origin master
`
GitHub Actions (deploy.yml) will lint, test, doctrine check, build and deploy to Pages.

## Critical Rules
- **Never** copy 	emplates/kaio-engine.js as module import - use main's js/games/KaioEngine.js
- **Every** JS file under js/games/ must be in sw.js STATIC_ASSETS
- **Every** file in js/games/levels/ must be registered in egistry.js
- Follow existing code style exactly
- Use LevelBeats API for vocabulary
- GameHost expects specific module shape - read it carefully
- Doctrine gates will fail if you miss anything

## Files to Read First
1. js/games/GameHost.js - host contract
2. js/games/KaioEngine.js - engine API
3. js/games/registry.js - registration
4. js/games/levels/nodejs-l5-officina.js - complex example
5. js/games/levels/inglese-l0-taverna.js - simpler example
6. sw.js - STATIC_ASSETS
7. scripts/check-doctrine.mjs - understand gates
8. knowledge-aio-giochi/LEGGIMI-INTEGRAZIONE.md - template info
