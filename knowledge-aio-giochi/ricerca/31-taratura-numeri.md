# 31 — Taratura: tutti i numeri in un posto

> Le costanti si copiano da qui. Non si inventano. Lo scostamento massimo senza
> giustificazione scritta è ±20%.

---

## 31.1 Regole che governano tutti i numeri

**R1 — La soglia dei 1,8 s.** Nessuna finestra di reazione scende sotto 1,8 s
quando il giocatore deve **leggere** qualcosa per decidere. Sotto quella soglia
smette di leggere e comincia a indovinare dalla forma, e in quel momento il gioco
ha perso la funzione. Per stimoli puramente visivi (già memorizzati, nessuna
lettura) il minimo è 0,6 s.

**R2 — Si aumenta la densità, non la velocità.** Per rendere un gioco più
difficile si aggiungono elementi contemporanei, non si accorcia il tempo per
ciascuno. Vale in tutti gli archetipi.

**R3 — Il riavvio dopo la sconfitta sta sotto il secondo,** e non contiene
schermate. Ogni schermata riduce il numero di tentativi, e i tentativi sono
l'apprendimento.

**R4 — Il feedback graduato.** Azione leggera → feedback leggero. La scala sta in
§31.6.

**R5 — Ogni movimento ha easing.** Nessuna transizione lineare, mai, tranne il
movimento a velocità costante del labirinto (`17` §17.7).

---

## 31.2 Finestre di reazione e ritmo, per beat

Da `03` §3.9, ripetuto qui perché è la tabella che si consulta più spesso.

| Parametro | Beat 1 | Beat 2 | Beat 3 | Beat 4 | Beat 5 |
|---|---|---|---|---|---|
| Finestra con lettura | 2,6 s | 2,2 s | 2,2 s | 1,8 s | 2,1 s |
| Finestra solo visiva | 1,2 s | 1,0 s | 1,0 s | 0,7 s | 0,9 s |
| Elementi contemporanei | 1 | 2 | 2 | 3-4 | 3 |
| Intervallo di comparsa | 2,4 s | 2,0 s | 2,0 s | 1,3 s | 1,7 s |
| Vite | ∞ | 3 | 3 | 3 | 3 |
| Durata mano bersaglio | 25 s | 30 s | 35 s | 40 s | 35 s |

Difficoltà relativa per beat: 0,2 / 0,45 / 0,7 / 1,0 / 0,6.

Difficoltà media per capitolo del livello (da `03` §3.4):
0,3 / 0,45 / 0,6 / **0,45** / 0,7 / 0,85 / 0,8 / 0,9→0,5.

---

## 31.3 Durate strutturali

| Unità | Bersaglio | Massimo |
|---|---|---|
| Una mano | 25-40 s | 75 s |
| Un beat (una lezione) | 60-90 s | 2 min |
| Un capitolo (5 lezioni) | 6-9 min | 12 min |
| Un livello (8 capitoli) | 50-70 min | — |

| Transizione | Durata |
|---|---|
| Riavvio dopo sconfitta | 400-800 ms secondo l'archetipo |
| Fra una mano e la successiva | 600 ms |
| Fra un beat e il successivo | 1,2 s, con un respiro visivo |
| Schermata di lezione completata | 1,8 s, salta al tocco |
| Schermata di capitolo completato | 3 s, salta al tocco |

---

## 31.4 Input — tutte le tolleranze

| Parametro | Touch | Desktop | Dove |
|---|---|---|---|
| Area minima di tocco | 44 px | — | tutti |
| Aggancio all'oggetto più vicino | 24 px | 8 px | trascinamento |
| Soglia dello swipe | 28 px | — | runner, maze, slash |
| Velocità minima del gesto di taglio | 220 px/s | 220 px/s | `11` |
| Memoria della direzione | 400 ms | 400 ms | `17` |
| Taglio dell'angolo | 120 ms | 120 ms | `17` |
| Buffer di input (runner) | 350 ms prima / 120 ms dopo | idem | `12` |
| Buffer del salto | 120 ms | 120 ms | `19` |
| Coyote time | 110 ms | 85 ms | `19` |
| Corner correction | 6 px | 4 px | `19` |
| Buffer one-button | 120 ms | 120 ms | `13` |
| Lock delay (stacking) | 500 ms | 500 ms | `15` |
| Ripetizione automatica laterale | 170 ms poi 40 ms/cella | idem | `15` |

---

## 31.5 Fisica

| Parametro | Valore | Dove |
|---|---|---|
| Gravità (one-button) | 1150 px/s² su 720 px di altezza | `13` |
| Impulso (one-button) | −340 px/s, **sostituisce** la velocità | `13` |
| Velocità di caduta massima | 620 px/s | `13` |
| Gravità in salita (platformer) | 1400 px/s² | `19` |
| Gravità in discesa (platformer) | 2400 px/s² | `19` |
| Taglio del salto al rilascio | ×0,45 | `19` |
| Altezza del salto | 3,2 celle | `19` |
| Larghezza del salto | 4,5 celle | `19` |
| Velocità orizzontale massima | 5,2 celle/s | `19` |
| Accelerazione orizzontale | 0→max in 100 ms | `19` |
| Frenata | max→0 in 70 ms | `19` |
| Tempo di volo (slash) | 2,1 s → 1,5 s | `11` |
| Hang time (slash) | ×0,72 nel 20% centrale | `11` |
| Altezza dell'apice (slash) | 62% dello schermo | `11` |
| Velocità del giocatore (maze) | 8 celle/s | `17` |
| Velocità inseguitori (maze) | 0,85 → 0,95 × giocatore | `17` |
| Velocità di caduta (stacking) | 1 cella / 1,1 s → 1 cella / 0,35 s | `15` |
| Velocità del runner | 1 corsia / 1,15 s → 0,8 s | `12` |
| Accelerazione del runner | +7% ogni 15 s, cap 2,1× | `12` |
| Distanza di visibilità (runner) | 2,6 s **costante** (camera arretra) | `12` |

---

## 31.6 Feedback — la scala graduata

Da `02` §4. Cinque livelli, e ogni evento del gioco sta su uno di questi.

| Livello | Quando | Visivo | Audio | Hit-stop | Camera |
|---|---|---|---|---|---|
| 0 — tocco | ogni contatto col dito | scala 1,04, 60 ms | click secco, −18 dB | — | — |
| 1 — azione riuscita | il verbo va a segno | scala 1,10 + 6 particelle | tono breve | 40 ms | — |
| 2 — azione importante | fine di una catena, riga cancellata | flash 60 ms + 14 particelle | tono pieno, tono che sale | 60 ms | 4 px |
| 3 — errore | conseguenza fisica | sobbalzo 4 px, oggetto che cade | tonfo sordo | 45 ms | 3 px |
| 4 — sconfitta | ingorgo, crollo, spegnimento | tutto si ferma, luce che cala | audio che si restringe, silenzio 200 ms | 110-140 ms | 8 px |

Durate del juice:

| Elemento | Durata |
|---|---|
| Squash all'atterraggio | 120 ms di rientro |
| Anticipazione prima di un'azione | 80-180 ms |
| Scia del gesto | 260 ms |
| Sparizione di un oggetto | 260 ms (scala 1,2 in 80 ms, poi 0) |
| Comparsa di un oggetto | 180 ms con overshoot |
| Corsa di una leva | 220 ms con overshoot |
| Lampo di una riga completata | 60 ms bianco, poi 280 ms |
| Cascata: ritardo fra i livelli | 180 ms, +1 semitono |
| Illuminazione di aiuto (secondo errore) | 400 ms |
| Pulsazione di aiuto (terzo errore) | 700 ms prima dell'evento |
| Traccia della buona decisione | 600 ms |

Easing di riferimento:

| Uso | Curva |
|---|---|
| Entrata di un oggetto | `cubic-bezier(.16,1,.3,1)` |
| Uscita | `cubic-bezier(.7,0,.84,0)` |
| Movimento fra due punti | `cubic-bezier(.2,.8,.2,1)` |
| Leva, con overshoot | `cubic-bezier(.34,1.56,.64,1)` |
| Camera | `cubic-bezier(.25,.46,.45,.94)`, 120 ms di ritardo |

---

## 31.7 Colore — vincoli, non palette

Le palette sono libere per banda. I vincoli sono tre e valgono sempre:

1. **Il rosso non segnala una risposta sbagliata.** È riservato ai guasti veri: il
   processo che si spegne, l'ingorgo, il crollo. Un errore didattico non è un
   guasto.
2. **Le categorie che portano il concetto non hanno colori diversi.** È la regola
   che salva il TEST 1 (`00` §0.4). Se due categorie sono cromaticamente
   distinte, il gioco si vince senza capire.
3. **Contrasto minimo 4,5:1** fra qualsiasi testo e il suo fondo, incluse le
   etichette diegetiche sugli oggetti.

   La regola da sola non basta: si viola per abitudine, scegliendo a occhio un
   grigio «discreto» per la cronaca a lato. I valori qui sotto sono misurati
   contro il fondo più scuro dove capita del testo (`#0a0e11`). **Usare solo
   questi come colore di testo**, per banda:

   | Banda | Testo pieno | Testo secondario | Cronaca / etichette |
   |---|---|---|---|
   | 1 (notte, legno) | `#f4ebdc` | `#b6a68b` | `#a3937a` 6,4:1 |
   | 2 (acciaio, ottone) | `#e8e2d0` | `#9fb0b4` | `#7e9096` 5,5:1 |
   | fredda (miniera) | `#e6eef4` | `#9fb2c0` | `#8b9aa0` 5,9:1 |

   Vietati come colore di testo su fondo scuro, tutti sotto soglia e tutti
   scelti a occhio in passato: `#5f7178` 3,87 · `#5f7180` 3,84 · `#7d705c` 4,02
   · `#6f6252` 3,27 · `#5a6b60` 3,42 · `#6b7a80` 4,1.
   Restano legittimi come **bordo, fondo o tratto** — la soglia riguarda il
   testo. E restano legittimi come testo **scuro su ottone chiaro**, dove il
   rapporto si calcola contro `#c9a227`, non contro il nero.

   **Il testo su canvas non si attenua con l'alpha.** È l'errore che il
   controllo sui valori esadecimali non può vedere: `rgba(160,190,200,.5)`
   *sembra* sicuro perché il colore di partenza è chiaro, ma il pixel composito
   sul fondo scuro sta a 3,24:1. Su canvas si usa il valore pieno della tabella,
   o alpha ≥ .78. Il controllo va fatto sulla coppia
   `fillStyle` → `fillText`, non sui letterali esadecimali.

   **Nei registri DOM il testo non si scala da solo.** I giochi a canvas
   scalano tutto col canvas: a qualsiasi altezza di finestra sembrano
   identici. Un gioco costruito in DOM — il terminale della banda 4 — tiene
   invece i px fissi in un telaio che si restringe con la viewport, e sotto i
   ~950 px di altezza una diagnostica di 85 caratteri va a capo a metà parola.
   Non si risolve rimpicciolendo il font: 13 px è il pavimento. Si disegna a
   **420×910 logici** e si scala il telaio con `transform: scale(h/910)`,
   misurato con un `ResizeObserver` — così il registro DOM si comporta come i
   suoi quindici fratelli a canvas.

   Tre eccezioni legittime, da non «sistemare»:
   - **passata in rilievo** — un `fillText` chiarissimo (alpha .14-.16) con
     offset di +1,2 px sotto il testo vero: è il rilievo inciso, non testo da
     leggere;
   - **testo scuro su ottone** — il rapporto si calcola contro l'ottone;
   - **sovrapposizione `diagnostica`** — il pannello da 11-12 px in ciano è uno
     strumento di sviluppo, spento per difetto, mai davanti al giocatore.

## 31.12 Un vincolo verificato da un'espressione regolare va provato

Difetto trovato in L19 e da tenere a mente per ogni livello della banda 4: il
controllo che decide se l'obiettivo è raggiunto passava il tipo atteso in due
passate di escape, e `|` era in entrambe. `string | number` diventava
`string \\s*\|\s*number` — un backslash letterale — quindi **dieci beat su
quaranta non si potevano vincere**. Il giocatore scriveva la risposta giusta,
`tsc` taceva, e la spunta non si accendeva: un vicolo cieco muto, che è
precisamente la cosa vietata da `22` §22.4.5.

Due regole che ne seguono:

1. **Un checker si prova su un beat per capitolo, dal comando alla vittoria.**
   Leggere l'espressione regolare non basta: quella si legge giusta anche
   quando è sbagliata. Si gioca.
2. **Se esistono due scritture equivalenti, si accettano entrambe.**
   `phone?: string` e `phone: string | undefined` sono lo stesso tipo, e la
   prima è quella che un ragazzo scrive per istinto. Rifiutarla senza dire
   perché insegna che il compilatore è arbitrario — l'opposto del livello.

Numeri di leggibilità. **La soglia dipende dalla finestra di lettura**, non dal
fatto che l'oggetto si muova: 22 px e 18 px sono tarati sul tempo che il
giocatore ha per leggere prima di dover decidere.

| Finestra di lettura | Minimo | Casi |
|---|---|---|
| < 2,5 s | 22 px, peso 600 | oggetti veloci, finestre strette |
| 2,5 - 6 s | 18 px, peso 600 | volo lungo, corsie annunciate |
| > 6 s o illimitata | 13 px, peso 600, contrasto ≥ 7:1 | griglie riflessive, cadute lente, targhette ferme |
| Testo del pannello di coaching | 20 px, interlinea 1,5 | sempre |
| Chrome numerico dentro il canvas | 18 px | contatori, indici, didascalie |
| Cella minima con testo sopra | 48 px | sempre |

Sotto i 13 px non si scende mai, per nessun archetipo e per nessuna finestra.
E la soglia risale a 18 px appena compare un timer sulla griglia: un timer
riporta la lettura sotto pressione anche se gli oggetti stanno fermi.

Il minimo di 44 px per l'area di tocco (`33` §33.3) è una regola separata e non
si negozia con questa tabella: un'etichetta può essere piccola, il bersaglio no.

Come si applica nel programma:

| Livello | Finestra | Dimensione | Perché |
|---|---|---|---|
| L2 nomi sui manici | 2,6 s di volo | 18 px | sopra i 2,5 s |
| L3 cartelli sui bivi | 2,6 s, crescono avvicinandosi | 15 → 19 px | leggibili al momento della scelta |
| L4 nomi sulle casse | ~8 s di caduta + anteprima | 13 px | finestra lunghissima |
| L5 versioni sulle casse | illimitata, mosse contate | 13 px | archetipo riflessivo |
| L9 targhette delle corsie | ferme, illimitata | 18 px | portano la decisione, spazio disponibile |

---

## 31.8 Adattamento della difficoltà

Da `03` §3.6.

| Evento | Effetto |
|---|---|
| 2 fallimenti consecutivi sullo stesso beat | +25% sulla finestra di reazione |
| 3 fallimenti | +25% e −1 elemento contemporaneo |
| 4 fallimenti | si attiva l'aiuto di livello 2 in permanenza per quel beat |
| 3 successi netti consecutivi | −10% sulla finestra |
| — | l'adattamento non si annuncia mai |

Limiti: l'adattamento non scende mai sotto 1,8 s con lettura, non rimuove mai la
categoria di elementi che porta il concetto, e non si applica al beat 3.

---

## 31.9 Prestazioni (vincoli APK e web)

| Vincolo | Valore |
|---|---|
| Frame rate bersaglio | 60 fps, mai sotto 50 sostenuti |
| Budget per frame | 16,6 ms, di cui max 8 ms di logica |
| Oggetti animati contemporanei | ≤ 80 in DOM, ≤ 400 in canvas |
| Particelle contemporanee | ≤ 120 |
| Tempo di avvio di un gioco | < 1,2 s dal tocco |
| Peso di un gioco (asset inclusi) | < 800 KB |
| Peso di un livello (8 capitoli) | < 4 MB |
| Memoria a regime | < 180 MB |

Regola pratica: se un gioco ha bisogno di three.js, il costo è giustificato solo
se il 3D **porta il concetto** (profondità, volume, occlusione). Un 3D decorativo
su un concetto 2D è peso senza resa.

---

## 31.10 Scheda rapida — cosa copiare per un gioco nuovo

Ordine di consultazione quando si costruisce:

1. §31.2 per il ritmo dei cinque beat;
2. il capitolo dell'archetipo, sezione "costanti di taratura";
3. §31.4 per le tolleranze di input della piattaforma;
4. §31.6 per il feedback, che è la parte che si dimentica sempre;
5. §31.7 per verificare di non aver introdotto una scorciatoia cromatica;
6. §31.9 alla fine, come controllo.

Gli scostamenti si scrivono nella riga NUMERI della scheda di progetto (`00`
§0.3), con la ragione. Uno scostamento non scritto è un errore, anche quando è
giusto.
