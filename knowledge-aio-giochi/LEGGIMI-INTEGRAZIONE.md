# Knowledge AIO — pacchetto giochi arcade (handoff)

Tutto quello che è stato progettato e costruito qui: 3 giochi nuovi (Inglese ×2,
Cybersecurity ×1), 13 giochi Node.js della prima fase, il motore comune, la
ricerca (25 capitoli, catalogo di ~240 arcade, 15 registri visivi).

## 1. Cosa c'è dentro

```
knowledge-aio-giochi/
├─ LEGGIMI-INTEGRAZIONE.md      ← questo file
├─ RICERCA-GIOCHI.md            ← la mappa della ricerca (leggi questo per primo)
├─ ricerca/                     ← 25 capitoli: metodo, archetipi, numeri, catalogo, registri
│   ├─ 00-COME-SI-USA.md        ← la scheda di progetto: si compila PRIMA di ogni gioco
│   ├─ 35-mappa-inglese.md      ← il piano delle 8 gallerie «Sotto la Rocca»
│   ├─ 40/41-catalogo-arcade    ← ~240 giochi con giudizio di portabilità ★★★/★★/★
│   └─ 42-registri-visivi.md    ← i 15 registri + la regola di rotazione + checklist
├─ templates/
│   ├─ kaio-engine.js           ← MOTORE COMUNE (canvas, ciclo, input, audio, capitoli, salvataggio)
│   ├─ inglese-sotto-la-rocca/  ← Il guado dei carrelli (Frogger · R4 Terra a strati)   ★ nuovo
│   ├─ inglese-taverna/         ← La taverna (Tapper · R10 Fiera)                        ★ nuovo
│   ├─ cyber-l1-casa/           ← La casa di notte (time management · Cyber L1)
│   ├─ nodejs-l1-chiosco/ … nodejs-l19-tsc/   ← i 13 giochi Node.js della prima fase
│   └─ nodejs-banda-1/, nodejs-banda-2/, nodejs-level-aesthetics/  ← vetrine, non giochi
├─ fonts/ _ds_bundle.css _ds_bundle.js styles.css   ← il design system dell'app (per la cornice)
├─ README-design-system.md      ← le regole del design system (già le conosci: è il tuo)
└─ github.md                    ← da quali file dell'app sono state prese le lezioni
```

## 2. Provare i giochi subito

I giochi fanno `fetch('./frasi.json')`: da `file://` Chrome lo blocca. Servi la
cartella con un server locale qualsiasi e apri il `.dc.html`:

```bash
cd knowledge-aio-giochi
python3 -m http.server 8080
# → http://localhost:8080/templates/inglese-sotto-la-rocca/IngleseSottoLaRocca.dc.html
# → http://localhost:8080/templates/inglese-taverna/IngleseTaverna.dc.html
# → http://localhost:8080/templates/cyber-l1-casa/CyberL1Casa.dc.html
```

(In VS Code: estensione *Live Server*, tasto destro sul file → Open with Live Server.
In PyCharm: tasto destro → Open in Browser, usa il suo server interno.)

Il `.dc.html` è un file autonomo: `support.js` (accanto a ogni gioco) carica React
18 da unpkg e monta il componente; `ds-base.js` carica il design system da `../..`
(per questo `fonts/`, `styles.css` e i due `_ds_bundle.*` stanno alla radice del
pacchetto). Serve la rete solo per React e per i Google Fonts dei registri
(Baloo 2, Alfa Slab One).

## 3. Com'è fatto un gioco (tre strati)

Ogni gioco nuovo è diviso apposta in tre file, così che **il gioco vero non dipenda
da React né dal design system**:

| File | Cosa contiene | Dipendenze |
|---|---|---|
| `guado.js` / `taverna.js` | **Tutto il game design**: regole, capitoli, distrattori, testi del coach (it/en), disegno su canvas, input | solo `window.KAIO` |
| `../kaio-engine.js` | Il motore: canvas retina, ciclo `update(dt)`/`draw(ctx)`, pointer + tastiera, WebAudio (8 suoni + drone), particelle, capitoli/lezioni, `localStorage` | nessuna |
| `*.dc.html` | La **cornice**: pannello del coach, schermata di fine lezione, pausa, mappa dei capitoli, Tweaks. È React (via il runtime `support.js`) | React 18, design system |
| `frasi.json` | Le frasi estratte da `js/data/lessons-level-N.js` dell'app (`{en, it}`) | — |

Il contratto tra motore e gioco è minimo. Il gioco espone un oggetto globale
(`window.GUADO`, `window.TAVERNA`) con:

```
init(self)            una volta, al montaggio
reset(self, beat)     inizio di una lezione (beat 0–4 del capitolo self.state.chapter)
update(self, dt)      logica, dt in secondi (già con hit-stop e pausa gestiti dal motore)
draw(self, ctx)       disegno; ctx già scalato: coordinate 0..W × 0..H (420 × 910)
tap / down / drag / up / key    input, in coordinate di gioco
say(self, text)       sintesi vocale en-GB della frase completata
```

e legge dal motore: `self.cfg` (il beat corrente), `self.state.chapter`,
`self.DATA` (il json), `KAIO.snd / burst / parts / drawParts / rr`.

Il gioco parla con la cornice **solo** con tre `setState`:

```js
self.setState({coach:{kind, pick, word, it}})   // apre il pannello del coach (3° errore)
self.setState({done:true})                       // lezione completata → schermata di fine
self.setState({step:n})                          // avanzamento (facoltativo, per la barra)
```

e la cornice richiama `onCoachClose()` quando il coach viene chiuso.

## 4. Portare i giochi nell'app (vanilla JS, niente React)

L'app è ES modules + DOM puro (`js/app.js`, i `*Manager.js`). Non serve portare
React: si sostituisce **solo il terzo strato**. Passi:

1. **Copia** `templates/kaio-engine.js` → `js/games/kaio-engine.js` e i file del gioco
   (`guado.js`, `frasi.json`) → `js/games/guado/`. Trasformali in moduli ES se vuoi
   (oggi assegnano a `window.KAIO` / `window.GUADO`; basta `export const KAIO = …`).
2. **Il motore si aspetta un oggetto "self" con l'API di un componente React**
   (`self.props`, `self.state`, `self.setState(patch|fn)`, `self.cv.current` = il
   canvas). Scrivi un piccolo host:

   ```js
   // js/games/GameHost.js — sostituisce il .dc.html
   export class GameHost {
     constructor(canvas, game, props) {
       this.cv = { current: canvas }; this.props = props;     // {capitolo, lezione, lingua}
       this.state = { beat:0, chapter:0, lang:'it', paused:false, coach:null, done:false, muted:false, step:0 };
       this.game = game;                                       // window.GUADO
     }
     setState(p) { Object.assign(this.state, typeof p === 'function' ? p(this.state) : p); this.render(); }
     reset(b) { this.game.reset(this, b) }  update(dt) { this.game.update(this, dt) }  draw(x) { this.game.draw(this, x) }
     onCoachClose() { /* come nel .dc.html: es. GUADO.rebuild(this) se this.coachKind==='dark' */ }
     start() { this.game.init(this); KAIO.init(this, { W:this.game.W, H:this.game.H, key:'kaio-guado', chapters:this.game.CH,
                onTap:p=>this.game.tap(this,p), onKey:e=>this.game.key(this,e) }); KAIO.audio(this); }
     render() { /* qui disegni con il DOM dell'app: coach (state.coach), fine lezione (state.done), pausa (state.paused) */ }
     destroy() { KAIO.destroy(this) }
   }
   ```

   I testi del coach sono già nel gioco: `GUADO.TX[lang][kind]` è una terna
   `[cosa è successo, effetto, regola]` con i segnaposto `{pick}`, `{word}`, `{it}`,
   `{en}` — vedi `renderVals()` nel `.dc.html` per la sostituzione (10 righe).
   Le voci della cornice (titoli dei capitoli, marks, lezioni) le dà `KAIO.vals(this)`.

3. **Le frasi**: al posto di `fetch('./frasi.json')` importa direttamente
   `LEVEL_1` da `js/data/lessons-level-1.js` e mappa `{english, italian}` →
   `{en, it}` (è quello che fa `frasi.json`).

4. **Progressi**: `KAIO.save` scrive in `localStorage` sotto la chiave passata a
   `init`. Per agganciare `ProgressManager`/`masteryService`, il punto giusto è
   `setState({done:true})`: lì la lezione è completata (frase attraversata /
   turno servito).

5. **Regole della casa che i giochi già rispettano** (README del design system):
   stringhe bilingui it/en, mai rosso per un errore, celebrazione solo a fine
   capitolo, `prefers-reduced-motion` (da collegare al `KAIO.init` quando lo porti).

## 5. Come si continua (i prossimi giochi)

Il piano del topic Inglese è in `ricerca/35-mappa-inglese.md`: 8 gallerie sotto la
stessa Rocca, due fatte, sei da fare (Conduttura/Pipe Dream, Bolle/Puzzle Bobble,
Torretta/Word Zapper, Tamburo/Taiko per l'accento, Forziere/Simon, Torre/Stacker).
Per ognuna il procedimento è quello di `RICERCA-GIOCHI.md` §«Come si usa»: scheda
di `00`, loop da una famiglia ★★★ di `40`–`41`, registro da `42` **diverso dai tre
precedenti**, numeri da `31`, checklist visiva `42` §42.6 prima di consegnare.

I 13 giochi Node.js hanno la meccanica giusta e il vetro sbagliato (tutti uguali):
la tabella di riassegnazione dei registri è in `ricerca/42-registri-visivi.md` §42.5.

## 6. Note tecniche

- Risoluzione di gioco 420 × 910 (telefono in verticale), scalata dal motore al DPR.
- Suoni sintetizzati in WebAudio (nessun file audio): `click tone pop thud fall whoosh crash whir chime`.
- La sintesi vocale usa `speechSynthesis` con la prima voce `en-GB`/`en-US`
  disponibile; su Android WebView va abilitata la TTS di sistema (l'app ha già
  `services/TTSService.js`: puoi passare quello al posto di `G.say`).
- I `.dc.html` contengono in testa la **scheda di progetto** del gioco (concetto,
  verbo, archetipo, capitoli, test 1-2-3, registro visivo): è la documentazione
  di design, leggila prima di toccare le regole.
