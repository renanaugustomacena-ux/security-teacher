# Ricerca — Bibbia di progettazione dei giochi Knowledge AIO

Questo file è la **mappa**. I capitoli veri stanno in `ricerca/`.
**25 capitoli.** Gli ultimi tre (`40`–`42`) sono la risposta a «i giochi sono brutti
e tutti uguali»: un catalogo di ~240 arcade da cui rubare loop e sguardo, e quindici
registri visivi con la regola che li fa ruotare.

Regola d'uso: nessun gioco si scrive prima di aver passato i tre test del
capitolo 00 e di aver letto il capitolo dell'archetipo che si sta usando.

---

## I tre test, in ordine di severità

Ogni gioco deve passarli tutti e tre **prima** che io scriva una riga di codice.
Sono in ordine: se cade sul primo, gli altri due non contano.

### TEST 1 — Integrazione intrinseca
> **Posso vincere questa partita senza aver capito il concetto?**

Se sì, il gioco non insegna. È un quiz travestito. Procedura di verifica in
`00` §0.4: si elencano **tutti** i segnali a schermo e si controlla che nessuno
permetta di vincere da solo. Teoria in `01`.

### TEST 2 — Il core loop in una frase
> **Riesco a descrivere il ciclo di gioco in una frase sola, senza "e poi"?**

Formato: verbo + oggetto + vincolo + conseguenza. Se serve un "e poi", è un quiz
in tre fasi. Vedi `03`.

### TEST 3 — Il primo verbo in venti secondi
> **Un ragazzo che apre questo gioco senza leggere niente capisce cosa fare in
> venti secondi?**

Si esegue coprendo il testo con la mano e guardando solo ciò che si muove. Vedi
`04`.

---

## Indice dei capitoli

### Fondamenti — 1.646 righe

| File | Contenuto | Righe |
|---|---|---|
| `ricerca/00-COME-SI-USA.md` | Il processo: i nove passi in ordine obbligato, la scheda di progetto, come si eseguono i tre test, i sette errori di processo | 418 |
| `ricerca/01-integrazione-intrinseca.md` | La teoria pedagogica. Perché funziona, i tre gradi di integrazione, i sette modi di sbagliarla, come si verifica | 339 |
| `ricerca/02-game-feel-e-juice.md` | Reattività, leggibilità, juice. I principi Disney applicati. Hit-stop, screen shake, particelle, audio. La scala del feedback | 348 |
| `ricerca/03-curva-flusso-sessione.md` | Canale di flusso, tensione e rilascio, i 5 beat, gli 8 capitoli, durate, difficoltà dinamica, la struttura a bande | 253 |
| `ricerca/04-onboarding-senza-testo.md` | Il metodo World 1-1. I quattro strumenti. Un verbo alla volta. Interfaccia diegetica. Quando il testo è ammesso | 288 |

### Archetipi — 3.109 righe

Ogni capitolo ha la stessa struttura: come funziona l'originale · perché funziona ·
il core loop · schema dei comandi · costanti di taratura · le manopole della
difficoltà · checklist juice specifica · i modi di rovinarlo · **quali concetti
Node.js può portare e quali no** · un esempio lavorato per intero con la scheda
compilata.

| File | Archetipo | Riferimento | Livelli Node | Righe |
|---|---|---|---|---|
| `ricerca/10-time-management.md` | Gestione del tempo | Diner Dash | L1, L6, L18 | 261 |
| `ricerca/11-slash-swipe.md` | Taglio a gesto | Fruit Ninja | L2 | 285 |
| `ricerca/12-endless-runner.md` | Corsa infinita | Temple Run, Subway Surfers | L3, L10 | 277 |
| `ricerca/13-one-button.md` | Un tasto solo | Flappy Bird | L7 | 250 |
| `ricerca/14-match-3.md` | Allinea tre | Candy Crush | L5, L14, L15 | 256 |
| `ricerca/15-stacking.md` | Impilamento | Tetris | L4, L5, L16, L17 | 249 |
| `ricerca/16-lane-sorting.md` | Smistamento a corsie | nostro, dal Semaforo | L7, L9, L12, L13 | 255 |
| `ricerca/17-maze.md` | Labirinto | Pac-Man | L8 | 263 |
| `ricerca/18-tower-defense.md` | Difesa a torri | Plants vs. Zombies | L11, L19, L23 | 252 |
| `ricerca/19-platformer.md` | Piattaforme 2D | Super Mario, Celeste | L8 | 255 |
| `ricerca/20-investigativo.md` | Ricostruzione da tracce | Obra Dinn, Her Story | L20, L18 | 242 |
| `ricerca/21-mutazione.md` | Rompere per verificare | mutation testing | L22, L11 | 259 |
| `ricerca/22-terminale.md` | Il terminale come spazio di gioco | — | tutta la banda 4 | 310 |

### Applicazione — 1.111 righe

| File | Contenuto | Righe |
|---|---|---|
| `ricerca/30-audit-giochi-esistenti.md` | I sette giochi vecchi passati ai tre test. Uno si salva, sei si buttano, e perché sbagliano tutti allo stesso modo | 218 |
| `ricerca/31-taratura-numeri.md` | Tutte le costanti in un posto: finestre, gravità, tolleranze di input, scala del feedback, easing, prestazioni | 232 |
| `ricerca/32-mappa-24-livelli.md` | I 24 livelli di Node.js: concetto, forma, verbo, archetipo, frattura. Il piano di costruzione | 403 |
| `ricerca/33-input-e-piattaforma.md` | Touch e desktop nella stessa partita, tastiera software in banda 4, prestazioni, lingua, accessibilità | 258 |
| `ricerca/34-mappa-cybersecurity-12-livelli.md` | I 12 livelli di Cybersecurity: concetto, forma, verbo, archetipo, frattura. Il secondo topic | 210 |

### Catalogo e registri — la sala giochi

| File | Contenuto |
|---|---|
| `ricerca/40-catalogo-arcade-A.md` | ~140 arcade 1971–1995 in 12 famiglie (rimbalzo, prima sala, sparo fisso, vettoriali, arena, scorrimento, labirinto, territorio, piattaforme, run-and-gun, corsa, sport). Per ciascuno: loop in una frase, verbo e controllo → tocco, firma visiva, **portabilità** ★★★/★★/★ |
| `ricerca/41-catalogo-arcade-B.md` | ~100 giochi 1909–2021 in 10 famiglie (picchiaduro, uno contro uno, pistola ottica, ritmo, incastri, rompicapi, servizio, fiera ed elettromeccanici, **digitazione e parole**, arcade da tasca). Le dieci famiglie ★★★ da cui si parte |
| `ricerca/42-registri-visivi.md` | La diagnosi dei sette difetti identici nei tredici giochi fatti; la regola «la cornice è dell'app, il vetro è del gioco»; **quindici registri** con palette, forme, suolo, movimento e carattere; rotazione; riassegnazione proposta; checklist visiva |

---

## Le sette regole non negoziabili

Estratte dai capitoli. Se una di queste è violata, il gioco torna indietro.

1. **Il concetto è ciò che devi guardare per vincere.** Nessun indizio di
   superficie (colore, forma, posizione) deve permettere di vincere senza capire.
   → `30` §30.3: il giocatore userà sempre il segnale più economico che gli lasci.
2. **Un verbo alla volta.** Il secondo comando si sblocca quando il gioco lo
   richiede, non prima.
3. **Nessuna finestra di reazione sotto 1,8 s** quando il compito richiede di
   leggere. 0,6 s solo per stimoli puramente visivi.
4. **Niente si muove a velocità costante.** Tutto ha easing, entrata e uscita.
5. **Feedback graduato.** Azione leggera, feedback leggero. Azione grave,
   feedback grave. E sempre con l'audio, mai visivo da solo.
6. **Il beat 5 non è il più difficile.** È quello dove ti senti bravo.
7. **Rosso mai per una risposta sbagliata.** Il rosso è riservato ai guasti veri.
   L'errore si spiega, non si punisce con un buzzer.
8. **Nessun gioco senza registro visivo assegnato, e mai lo stesso di quello prima.**
   La cornice è dell'app, il vetro è del gioco: dentro il vetro palette, figura,
   suolo, movimento e carattere vengono da uno dei quindici registri di `42`, mai dal
   design system della cornice. Un rettangolo con un'etichetta non è una figura.

E la regola che le contiene tutte, da `00` §0.2:

> **L'ambientazione si scegli per ultima.** Concetto → forma → verbo → archetipo →
> vittoria/sconfitta → errori → i 5 beat → **poi** il mondo. Ogni volta che ho
> invertito quest'ordine è uscito un box di testo.

---

## Per costruire un gioco, in pratica

1. leggi `00` e compila la scheda (nove passi, in ordine);
2. scegli il loop da una famiglia ★★★ (o ★★ verificata) di `40`–`41` e leggi il
   capitolo dell'archetipo che la scheda indica;
3. assegna il registro visivo da `42` — diverso dai tre giochi precedenti — e compila
   la scheda visiva (figura, suolo, palette, movimento, carattere);
4. prendi i numeri da `31`;
5. verifica la piattaforma su `33`;
6. scrivi il gioco;
7. passa la checklist visiva (`42` §42.6) e poi quella di consegna (`00` §0.8).

Se al passo 1 la scheda non si compila, il problema è il concetto, non il gioco.

---

## Stato

- [x] Fondamenti — capitoli 00-04 (1.646 righe)
- [x] Archetipi — capitoli 10-22, tredici archetipi (3.109 righe)
- [x] Applicazione — capitoli 30-34
- [x] Catalogo e registri — capitoli 40-42 (~240 giochi, 15 registri)
- [ ] **Rifacimento del vetro dei tredici giochi fatti** secondo `42` §42.5 — da
      decidere col committente: la meccanica resta, cambia tutto ciò che si vede

### Giochi costruiti

| Livello vero | Gioco(hi) | Capitoli | Lezioni |
|---|---|---|---|
| **Inglese L1 Vita quotidiana** | **Sotto la Rocca · Il guado** (Frogger ★★★, registro R4) | 8 di 8 | 40 ✅ |
| L1 Fondamenti | Il chiosco di notte | 8 di 8 | 40 ✅ |
| L2 Moduli e NPM | Discesa (1-3) · Magazzino (4-6) · Soglia (7-8) | 8 di 8 | 40 ✅ |
| L3 JavaScript Essenziale | La bilancia di notte | 8 di 8 | 40 ✅ |
| L4 Asincrono Base | Cucina (1-4) · Smistamento (5-8) | 8 di 8 | 40 ✅ |
| L5 File System e Path | L'officina di notte | 8 di 8 | 40 ✅ |
| L6 HTTP e Server | Il centralino di notte | 8 di 8 | 40 ✅ |
| L7 Express Fondamenti | La linea di montaggio | 8 di 8 | 40 ✅ |
| L8 Progettazione API REST | L'indirizzario | 8 di 8 | 40 ✅ |
| L9 Middleware | La catena di controllo | 8 di 8 | 40 ✅ |
| L10 Integrazione Database | L'archivio | 8 di 8 | 40 ✅ |
| L11 Autenticazione | Il lasciapassare | 8 di 8 | 40 ✅ |
| L12 Gestione Errori | Lo scarico | 8 di 8 | 40 ✅ |
| L13–L24 | — | 0 | 0 |

**Banda 2 completa: L7–L12, 240 lezioni.** Registro acciaio-ottone, sei verbi
nuovi: comporre la catena, comporre l'indirizzo, dare il via, comporre la
richiesta, calare il punzone, afferrare col guanto giusto.

**Banda 1 completa: 6 livelli, 240 lezioni, 9 giochi, 9 verbi diversi**
(toccare, afferrare al volo, deviare, posare, scambiare, tenere premuto,
dare la corsia, pesare, innestare).

**Conteggio reale:** 17 topic, 360 livelli, 14.400 lezioni.
Fatti: **13 livelli su 360 (520 lezioni)**: Node.js bande 1-2 complete, Cybersecurity L1.
Mancano 12 livelli di Node.js (bande 3 e 4), 11 di Cybersecurity, poi 15 topic interi.

Banda 2 iniziata: L7 apre il registro acciaio-ottone con la **doppia fase**
(monti la catena, poi la guardi lavorare) — primo tower defense del programma.

Il modello dei capitoli è `templates/nodejs-l1-chiosco`: otto capitoli che
introducono **una meccanica nuova ciascuno** (ripiano libero, ripensamento,
ordine doppio, biglietto coperto, raffica), non otto livelli di difficoltà.
Un livello lungo può anche dividersi fra più giochi (L2 ne usa tre, L4 due):
cambia il verbo a metà livello, resta il registro della banda.

**Totale: 6.273 righe.** La ricerca è completa per Node.js. Quando si passa a un
altro topic serve solo un nuovo capitolo `32` (la mappa dei livelli di quel
topic): fondamenti, archetipi e applicazione valgono per tutti.

### Banda 3 — L13-18 · registro schematico

Nessun mondo: diagrammi giocabili, grafi, nodi e archi. Terminologia vera
stampata sugli oggetti. Ciano su nero, tratti da 1,5 px, griglia.

| | Gioco | Verbo | Frattura |
|---|---|---|---|
| L13 | Il condotto | deviare (lo scambio è tuo, il flusso no) | «se rallenta si perde qualcosa» → il flusso si ferma a monte |
| L14 | — | collegare | da costruire |
| L15 | — | rompere | da costruire |
| L16 | — | piazzare | da costruire |
| L17 | — | tenere la linea | da costruire |
| L18 | — | scegliere adesso | da costruire |

**L13 — Il condotto.** Endless runner in forma di diagramma. Un `Readable` in
cima, tre `Writable` in fondo, uno scambio in mezzo: quello lo muovi tu, il
flusso no. Ogni vasca ha il suo `highWaterMark` e il suo `drain` stampati
sopra. Quando `write()` torna false il chunk si ferma alla bocca e la coda
sale nel tronco — visibile, non annunciata. Se insisti, i chunk cadono; se
fermi la sorgente, non si perde niente. Tweak `freno`: `pipe()` tiene il
freno per te, `write()` lo lascia a te. Il capitolo 6 mostra la frattura da
solo: lo scambio puntato sul Writable da 3k/s che sale a 56k mentre quelli da
8 e 6 restano a zero.

### Banda 4 — L19-24 · registro tecnico

Terminale vero, sintassi vera, nessuna analogia. Nero, monospaziato, ambra per
gli errori, un accento oro. Nessun punteggio, nessuna stella: il tempo e i
comandi stanno accanto, non sopra (`ricerca/22` §22.4).

| | Gioco | Verbo | Frattura |
|---|---|---|---|
| L19 | tsc | dichiarare e far compilare | `any` fa sparire l'errore E il controllo |
| L20 | — | impilare | da costruire |
| L21 | — | misurare e tagliare | da costruire |
| L22 | — | interrogare | da costruire |
| L23 | — | comporre resiliente | da costruire |
| L24 | — | costruire | da costruire |

**L19 — tsc.** Il gioco non ha nome perché non ha mondo: il titolo è lo
strumento. Terminale DOM (non canvas: il registro è testo), `ls` `cat`
`grep` `nano` `tsc` veri, `nano` col suo footer vero `^O Write Out`
`^X Exit`, chip di frammenti sintattici sopra la tastiera per Android.
L'obiettivo non è un comando da indovinare: è uno **stato del progetto** —
`src/` compila **e** `test/probe.ts` viene rifiutato — verificato dal
checker sul file, non sulla stringa digitata. Il probe è la mutazione di
`ricerca/21`: se metti `any`, `tsc` tace e il probe sbagliato compila.
La frattura non è un messaggio, è una spunta che non si accende. Vincolo di
comandi ai capitoli 4 e 8. Suggerimento passivo a 90 s: dice dove guardare,
non cosa scrivere.

---

## Topic 2 — Cybersecurity

12 livelli, 4 lezioni × 10 termini l'uno: bande da **3 livelli**, stessi
quattro registri. La mappa è `ricerca/34`. Qui il topic insegna **terminologia
inglese**: il mondo parla italiano, i termini veri stanno stampigliati in
inglese sugli oggetti (la targa PASSWORD sulla serratura, FIREWALL sulla
grata). Il coach chiude sempre con la regola che contiene il termine.

| Livello | Gioco | Capitoli | Lezioni |
|---|---|---|---|
| L1 Fondamenti | La casa di notte | 8 di 8 | 40 ✅ |
| L2–L12 | — (mappa pronta) | 0 | 0 |

Aperture rimanenti: L4 (banda 2, La pneumatica), L7 (banda 3, Il reticolo),
L10 (banda 4, adb). Gli inseguitori partono solo ad apertura verificata.
