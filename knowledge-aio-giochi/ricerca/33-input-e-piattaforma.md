# 33 — Input, piattaforma, prestazioni

> Un solo build che gira su sito desktop e su APK Android. Cosa questo vincolo
> impone al design dei giochi, prima che al codice.

---

## 33.1 Il vincolo, detto bene

Non "il gioco deve funzionare su entrambi". Il vincolo vero è più severo:

> **La stessa partita deve essere giocabile allo stesso livello di abilità con il
> dito e col mouse.**

Non due modalità, non un port. Se un gioco è più facile con la tastiera, la
tabella dei risultati è falsa e il ragazzo su telefono viene punito per il suo
dispositivo.

Conseguenze di design, non di codice:

1. **nessun gesto che richieda più di un dito**;
2. **nessuna azione che richieda precisione sotto i 44 px**;
3. **nessuna azione che richieda due input entro 100 ms** (impossibile con due
   pollici);
4. **nessuna informazione che dipenda dal passaggio del mouse** — l'hover non
   esiste su vetro;
5. **nessun tasto obbligatorio**: la tastiera è un'alternativa, mai un requisito
   (fino alla banda 3);
6. **niente click destro, niente scroll come input di gioco.**

Il punto 5 ha un'eccezione dichiarata: la **banda 4** usa il terminale vero, e
quindi la tastiera. Su Android si usa la tastiera software, e i giochi della banda
4 vanno progettati sapendo che metà dello schermo sparirà — vedi §33.6.

---

## 33.2 Tabella delle corrispondenze

Per ogni verbo della ricerca, l'input sulle due piattaforme.

| Verbo | Touch | Desktop | Nota |
|---|---|---|---|
| toccare | tap | clic | area ≥ 44 px |
| trascinare | drag | drag o clic-clic | il **clic-clic** va sempre offerto: su desktop è più preciso |
| tagliare | swipe continuo | premuto + movimento | velocità minima 220 px/s su entrambe |
| direzione (4 vie) | swipe | frecce / WASD | swipe con soglia 28 px |
| impulso | tap ovunque | spazio | mai una zona specifica |
| corsia (3 vie) | swipe ← → | ← → / A D | anche tap sulla corsia di destinazione |
| muovere + saltare | mezza schermata ciascuno | frecce + spazio | senza pulsanti disegnati |
| piazzare | drag dalla riserva | drag o clic-clic | anteprima del raggio in entrambi |
| scrivere | tastiera software | tastiera | solo banda 4 |

Regola generale: **su touch si offre sempre un'alternativa a tocchi al
trascinamento.** Metà delle persone su telefono non trascina volentieri, e su
schermi piccoli il trascinamento copre lo schermo con la mano.

---

## 33.3 Le tolleranze sono diverse, la difficoltà no

Le tolleranze di input vanno **tarate per piattaforma** perché il dito è più
impreciso del mouse. Questo non rende il gioco più facile su touch: rende la
*stessa* difficoltà raggiungibile.

| Parametro | Touch | Desktop | Perché |
|---|---|---|---|
| Aggancio all'oggetto vicino | 24 px | 8 px | il dito copre l'oggetto |
| Coyote time | 110 ms | 85 ms | nessun feedback tattile |
| Corner correction | 6 px | 4 px | idem |
| Area di tocco minima | 44 px | 24 px | dimensione del polpastrello |
| Soglia dello swipe | 28 px | — | |
| Zona morta ai bordi | 12 px | 0 | i gesti di sistema Android |

L'ultima riga è pratica e si dimentica sempre: gli ultimi 12 px dei bordi su
Android appartengono ai gesti di navigazione. Nessun elemento interattivo lì.

---

## 33.4 Orientamento e formato

| Decisione | Scelta | Ragione |
|---|---|---|
| Orientamento | **verticale** in banda 1-3 | il telefono si tiene così; ruotare è un attrito |
| Orientamento banda 4 | verticale con terminale, orizzontale suggerito | serve larghezza per le righe di comando |
| Rapporto di progetto | 9:19,5 (telefono moderno) | |
| Area sicura | 92% dell'altezza, 96% della larghezza | notch, barra di sistema, gesti |
| Desktop | il gioco sta in una colonna centrale 9:16, il resto è ambienza | **non** si allarga il gioco: si allarga la cornice |

L'ultima riga è una decisione di design importante. Un gioco progettato in
verticale e stirato in orizzontale su desktop diventa un altro gioco (le distanze
cambiano, la geometria cambia, la difficoltà cambia). La soluzione è tenere l'area
di gioco in proporzione e usare lo spazio laterale del desktop per l'ambienza —
che in molti giochi è anche più bello.

Corollario: **si progetta in verticale, sempre.** Il desktop è il caso derivato.

---

## 33.5 Le tre cose comuni a tutti i giochi

Dalla risposta al questionario: pausa, schermate di completamento, pannello di
coaching. Sono l'unico "template" ammesso.

### Pausa

- **Non un pulsante nell'inquadratura** (occupa spazio e rompe la diegesi).
- Su touch: swipe dal bordo alto, oppure il tasto indietro di Android.
- Su desktop: `Esc`.
- Sospende tutto in 200 ms con un blur del gioco, non con un fondo nero.
- Contiene: continua, esci, lingua, audio. Nient'altro.
- **Non mostra il punteggio** — non è una pagella.

### Schermate di completamento

Due, e brevissime:

| | Lezione completata | Capitolo completato |
|---|---|---|
| Durata | 1,8 s, salta al tocco | 3 s, salta al tocco |
| Contenuto | avanzamento dei 5 beat, una riga | i 5 beat + avanzamento del livello |
| Cosa **non** contiene | voti, stelle, percentuali di precisione | idem |
| Passaggio | automatico al beat successivo | ritorno alla mappa del livello |

Il divieto di stelle e percentuali viene da `03` §3.8: premiare la purezza
produce prudenza, e la prudenza impedisce di provare.

### Pannello di coaching

Formato fisso in `04` §4.7: quattro righe di cui l'ultima è un'animazione. Compare
al terzo errore consecutivo sulla stessa cosa. Si chiude toccando dove si vuole.

**Vincolo di piattaforma:** deve stare nella metà alta dello schermo su touch,
perché la metà bassa è coperta dalla mano.

---

## 33.6 La banda 4 e la tastiera software

Il problema: su Android la tastiera software occupa il 45-55% dell'altezza. Un
gioco da terminale in verticale, con la tastiera aperta, ha una finestra utile di
circa 380×300 px logici.

Decisioni:

1. **L'area di gioco della banda 4 è progettata per 380 px di altezza utile.**
   Tutto ciò che serve durante la digitazione sta lì.
2. **L'output storico scorre sopra** e può essere fuori vista mentre si scrive:
   non deve contenere informazioni necessarie al comando in corso.
3. **La riga di comando è ancorata sopra la tastiera**, non in fondo alla pagina.
4. **I comandi frequenti hanno scorciatoie tattili**: una riga di chip sopra la
   tastiera con i frammenti più usati (`node`, `npm`, `--`, `|`, percorsi). Non è
   un menu di risposte: sono acceleratori di digitazione, e non sostituiscono la
   sintassi.
5. **L'orientamento orizzontale è suggerito** all'ingresso in banda 4, non
   imposto.

Il punto 4 va difeso da un fraintendimento: i chip non sono un modo di scegliere
la risposta. Contengono frammenti *sintattici* (operatori, flag comuni), non
comandi completi. Un chip che dice `npm install express` sarebbe una risposta
multipla travestita; un chip che dice `--save-dev` è una tastiera migliore.

---

## 33.7 Prestazioni

Budget da `31` §31.9, qui con le implicazioni pratiche.

| Vincolo | Valore | Implicazione |
|---|---|---|
| 60 fps, mai sotto 50 | — | ogni gioco va provato su un telefono di fascia media, non sul desktop |
| ≤ 8 ms di logica per frame | — | niente ricalcoli di layout dentro il ciclo |
| ≤ 80 elementi animati in DOM | — | oltre, si passa a canvas |
| ≤ 400 in canvas | — | |
| ≤ 120 particelle | — | il conteggio si riduce automaticamente sotto i 50 fps |
| Avvio < 1,2 s | — | nessun asset bloccante oltre 200 KB |
| Gioco < 800 KB | — | |
| Livello < 4 MB | — | |
| Memoria < 180 MB | — | i giochi si smontano completamente all'uscita |

### Quando usare cosa

| Tecnica | Quando | Quando no |
|---|---|---|
| DOM + CSS | interfacce, griglie, carte, corsie, testo | movimento continuo di molti elementi |
| Canvas 2D | particelle, scie, fisica, molti oggetti | quando serve testo selezionabile o accessibile |
| three.js | **solo** se la profondità porta il concetto | decorazione 3D su un concetto piatto |

La riga three.js è una decisione di progetto, non tecnica. Il 3D si giustifica
quando occlusione, volume o profondità *sono* il concetto — per esempio la
struttura di un albero di dipendenze visto da dentro, o gli strati di
un'immagine Docker. Un labirinto in 3D quando il labirinto è la catena degli
scope non aggiunge niente e costa 500 KB.

### Degradazione

Un gioco deve girare su un telefono del 2019. Regole:

1. il conteggio delle particelle si dimezza sotto i 50 fps sostenuti per 2 s;
2. le ombre morbide diventano dure;
3. il blur di sfondo diventa un colore piatto;
4. **la logica di gioco non cambia mai**: timing, tolleranze e difficoltà restano
   identici. Si degrada l'aspetto, non la partita.

---

## 33.8 Lingua

Dalla risposta al questionario: **interruttore di lingua**, IT / EN.

| Elemento | Comportamento |
|---|---|
| Interfaccia (pausa, schermate, coaching) | tradotta |
| Nomi tecnici sugli oggetti | **mai tradotti** — `fs`, `require`, `nextTick` sono nomi propri |
| Ambientazione (nomi di luoghi, oggetti) | tradotta |
| Interruttore | nel pannello di pausa, e applicazione immediata senza riavvio |
| Testo del terminale (banda 4) | mai tradotto: l'output dei comandi è quello reale |

Vincolo di layout: le stringhe inglesi sono in media il 15-20% più corte
dell'italiano. Si progetta sull'italiano e si verifica sull'inglese, non il
contrario. Nessuna interfaccia con testo a larghezza fissa.

---

## 33.9 Accessibilità — il minimo non negoziabile

| Requisito | Valore |
|---|---|
| Contrasto testo/fondo | ≥ 4,5:1 |
| Nessuna informazione **solo** cromatica | sempre affiancata da forma, posizione o testo |
| Area di tocco | ≥ 44 px |
| Nessun lampeggio | oltre 3 Hz |
| Audio | mai l'unico canale di un'informazione necessaria |
| Movimento | rispetto di `prefers-reduced-motion`: si riducono gli effetti, non le durate di gioco |

La seconda riga coincide con la regola che salva il TEST 1 (`00` §0.4): togliere
il colore come segnale è insieme una scelta pedagogica e un requisito di
accessibilità. Le due cose puntano nella stessa direzione, cosa che capita più
spesso di quanto si crede.

---

## 33.10 Checklist di piattaforma

Prima di considerare finito un gioco:

- [ ] provato con il dito su un telefono reale, non con il mouse in una finestra
      stretta
- [ ] nessun gesto a due dita, nessun hover necessario, nessun tasto obbligatorio
- [ ] trascinamento sostituibile con due tocchi
- [ ] tutte le aree interattive ≥ 44 px
- [ ] niente di interattivo negli ultimi 12 px dei bordi
- [ ] il pannello di coaching sta nella metà alta
- [ ] area di gioco 9:19,5 anche su desktop, cornice per il resto
- [ ] 60 fps su un dispositivo di fascia media, con il conteggio particelle pieno
- [ ] la degradazione non cambia il timing di gioco
- [ ] interruttore di lingua, con i nomi tecnici non tradotti
- [ ] il gioco si smonta all'uscita (memoria che torna al livello base)
