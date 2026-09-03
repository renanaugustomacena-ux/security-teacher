# 42 — Registri visivi · perché i giochi sembrano tutti uguali, e quindici modi per non farlo più

> Il committente ha guardato tredici giochi e ha detto: brutti e tutti uguali. Ha
> ragione. Questo capitolo dice **perché** succede (con i nomi delle cose) e fissa
> quindici registri visivi, presi dalla sala giochi di `40`–`41`, con palette, forme,
> movimento e tipografia già decisi. Da qui in avanti un gioco senza registro
> assegnato non si scrive.

---

## 42.1 La diagnosi: sette cose identiche in tredici giochi

Guardando Linea (L7), Catena (L9), Bilancia (L3) e Condotto (L13) uno accanto
all'altro:

1. **Stessa cornice.** Telefono scuro a sinistra, elenco degli otto capitoli a destra.
   Il gioco occupa un terzo dello schermo e l'elenco, che è un menù, ha la stessa
   dignità visiva del gioco. In sala giochi il cabinet è tutto; il menù è il pannello
   delle istruzioni, e sta di lato in piccolo.
2. **Stessa palette.** Nero-blu (#0B0F14 → #0E1520) più **un** accento (oro, poi
   ottone, poi ciano). Tredici giochi, tre tinte in tutto. Il registro «per banda» era
   pensato per distinguere le bande, e ha invece appiattito i sei giochi *dentro* ogni
   banda.
3. **Stesso vocabolario di forme: il rettangolo con l'etichetta.** `auth`, `log`,
   `handler`, `Readable`, `16k`: ogni oggetto di gioco è una scatola da 1 px con una
   parola monospaziata dentro. È un diagramma, non un gioco. Nessun oggetto ha una
   **sagoma** riconoscibile a occhi chiusi.
4. **Nessuna figura.** Non c'è niente che si possa disegnare a memoria: nessun
   personaggio, nessun nemico, nessuna macchina con una forma sua. Pac-Man è un cerchio
   con un morso: una sagoma. La nostra «richiesta» è un rettangolo.
5. **Nessun suolo.** Gli oggetti fluttuano al centro di un vuoto scuro. Non c'è un
   pavimento, un orizzonte, una parete su cui le cose poggiano, rimbalzano o cadono.
   Senza suolo non c'è gravità e senza gravità non c'è peso.
6. **Stesso movimento.** Tutto scivola con lo stesso ease-out da 300 ms. Un gioco di
   Namco si muove a scatti sulla griglia, Marble Madness rotola con inerzia, il Game &
   Watch salta tra stati. Il nostro movimento non ha carattere: è quello di
   un'interfaccia.
7. **La tipografia porta il gioco.** Siccome le forme non dicono niente, dicono tutto
   le etichette. Quando devi leggere per capire cos'è una cosa, il TEST 3 è già perso
   (`04`).

**La causa a monte.** Il registro dell'app (`README`: HUD da terminale finanziario,
vetro scuro, oro su grafite, «mai giocoso») è stato applicato **dentro** il vetro del
gioco. È giusto per la cornice dell'app; dentro un gioco produce esattamente un
diagramma con etichette. Nessuna sala giochi ha tredici cabinet dello stesso colore.

---

## 42.2 La regola: la cornice è dell'app, il vetro è del gioco

- **La cornice** (barra del livello, titolo, capitoli, progressi, coach) resta nel
  design system dell'app: nero, vetro, oro, `--font-mono` per le cifre. I quattro
  registri di banda (oro-notte, acciaio-ottone, ciano schematico, terminale) vivono
  **qui**: sono la marquee del cabinet, la striscia luminosa in alto, non l'arte del
  gioco.
- **Il vetro** (il canvas su cui si gioca) è un cabinet a sé: palette sua, forme sue,
  suolo suo, movimento suo, carattere suo per i numeri. Come in sala giochi: Pac-Man e
  Tempest stanno a un metro l'uno dall'altro e non condividono un pixel.
- **Durante il gioco il vetro riempie lo schermo.** L'elenco dei capitoli è la
  schermata di attesa (l'*attract mode*), non un pannello fisso accanto al gioco. Sul
  telefono questo è già vero; il modello `.dc.html` va portato allo stesso
  comportamento (il pannello a destra diventa una schermata prima e dopo).
- **La regola «mai giocoso» del `README` vale per la cornice.** Dentro il vetro sono
  ammessi figure, sagome, facce (se il committente le vuole: vedi la scheda), colori
  chiari, fondi non neri. Resta vietato dovunque ciò che il `README` vieta per
  ragioni pedagogiche, non estetiche: confetti a ogni risposta giusta, «Bravo!»,
  rosso per l'errore (`00` regola 7).

---

## 42.3 La scheda visiva: cinque cose che ogni gioco deve avere prima del codice

Si compila dopo la scheda di progetto di `00` e prima di scrivere una riga.

| | Domanda | Prova |
|---|---|---|
| **Figura** | Qual è la sagoma che un ragazzo disegnerebbe a memoria dopo una partita? | Disegnala in 30 s con un pennarello. Se è un rettangolo, non è una figura. |
| **Suolo** | Dove poggiano le cose? Cosa succede a ciò che cade? | Deve esserci un pavimento, una parete, un orizzonte o un pozzo. |
| **Palette** | 4–6 colori di gioco, con nome, presi dal registro. Il fondo è nero puro **solo** se il registro lo chiede. | Nessuno dei 4–6 è l'oro dell'app. |
| **Movimento** | Una frase: «le cose si muovono come…» | Scatti su griglia · inerzia · rimbalzo · salto ad arco · stati discreti · verso la camera. Una sola per gioco. |
| **Carattere** | Il font dei numeri **dentro** il vetro. | Uno per registro (sotto). Mai quello della cornice. |

E una sesta, non visiva ma inseparabile: il **suono del registro** (`02`): il beep
piezo del Game & Watch, il «waka» su griglia, il pop della bolla, la campanella della
fiera.

---

## 42.4 I quindici registri

Per ciascuno: fonti in `40`–`41` · fondo · palette · forme · suolo · movimento ·
carattere · a cosa serve · cosa non fare. I codici colore sono il punto di partenza:
si variano di tono, non di famiglia.

### R1 · Fosforo vettoriale
*Asteroids, Tempest, Battlezone, Star Wars, Lunar Lander, Z-Type (`40.4`).*
Fondo `#000000` assoluto. Palette: bianco `#F4F7FF`, ciano `#34E5FF`, verde
`#4CFF7A`, giallo `#FFE94D`, rosso `#FF4D4D` (riservato ai guasti veri). Forme:
poligoni **aperti**, tratto 1,5–2 px, glow additivo (ombra 8–12 px dello stesso
colore), nessun riempimento mai. Suolo: una linea (profilo lunare, bordo del tubo).
Movimento: inerzia e rotazione, frammentazione in pezzi più piccoli, comparsa
istantanea. Carattere: monospaziato geometrico a tratti (segmenti), cifre grandi.
Serve a: fisica, reti, grafi, dosaggio (`L13` stream, `L14` eventi, qualunque cosa
con nodi e archi). Non fare: scatole con etichette. In questo registro un nodo è un
poligono che gira, non un rettangolo.

### R2 · Primari su nero (Namco 1980–82)
*Pac-Man, Galaga, Dig Dug, Rally-X, Mappy (`40.7`).*
Fondo `#000000`. Palette: blu labirinto `#2121DE`, giallo `#FFFF00`, rosso
`#FF0000`, rosa `#FFB8FF`, ciano `#00FFFF`, arancio `#FFB852`. Forme: griglia da 8
px, contorni netti senza antialias, sprite con **faccia** (due pixel bianchi con
pupilla bastano) o senza, ma sempre con sagoma. Suolo: il labirinto stesso, con bordi
a doppia linea. Movimento: a **celle**, con ease-out breve tra una cella e l'altra e
curve a 90°; l'animazione a due fotogrammi (il morso, le zampe). Carattere: bitmap 8×8
tutto maiuscolo. Serve a: corsie, smistamento, copertura, percorsi (`16`, `17`). Non
fare: gradienti, ombre, trasparenze. Qui il colore è piatto o non è.

### R3 · Gel su nero (1978–80)
*Space Invaders, Galaxian, Phoenix, Carnival (`40.3`).*
Fondo `#000000` con **bande orizzontali di colore** che tingono tutto ciò che le
attraversa: verde `#3DFF6E` in basso (il suolo e i ripari), bianco `#F2F2F2` al
centro, rosso `#FF5A5A` in alto (la nave madre, il punteggio), un'eventuale banda
magenta `#FF61C6`. Forme: sprite bianchi 11×8, due fotogrammi, file ordinate. Suolo:
la linea verde con i bunker che si sbriciolano pixel per pixel. Movimento: **a passo
di marcia**, un salto ogni tot ms, che accelera man mano che gli oggetti diminuiscono;
niente interpolazione tra i passi. Carattere: bitmap a segmenti, cifre bianche. Serve
a: formazioni, file ordinate, pressione che cresce col successo. Non fare: colorare gli
sprite singolarmente — il colore lo dà la banda, e questo è il punto.

### R4 · Terra a strati
*Dig Dug, Mr. Do!, Boulder Dash, Mr. Driller (`40.7`, `41.6`).*
Fondo: cielo notturno `#0B1026` sopra la linea di terra; sotto, strati ocra `#E0A23A`
→ arancio `#D2691E` → bruno `#8B3A1E` → viola `#4B1E4B`. Palette oggetti: pietra
`#9AA0A6`, nemico rosso `#FF3B30` con occhialini, verde `#3CB371`. Forme: blocchi di
terra con texture a puntini fitti, tunnel neri col bordo chiaro, massi tondi. Suolo:
tutto è suolo; scavare *rivela*. Movimento: la rivelazione (mask che si apre dietro al
giocatore), il masso che trema prima di cadere, il gonfiaggio a tre stadi. Carattere:
bitmap arrotondato, cifre sul cielo. Serve a: profondità come livello (stack, cartelle,
strati di rete, schemi di database), «togli questo e cade quello». Non fare: terra
uniforme — gli strati devono leggersi come quattro cose diverse.

### R5 · Travi e scale
*Donkey Kong, Burger Time, Mario Bros., Elevator Action, Popeye (`40.9`).*
Fondo `#000000` o blu notte `#0A0F2E` (Burger Time). Palette: trave rossa `#F03C3C`
con rivetti, scala ciano `#22D3EE`, barile bruno `#8B5A2B`, blu `#1E40AF`, rosa
`#F9A8D4`, giallo `#FACC15`. Forme: travi con pattern di rivetti, scale a pioli,
piattaforme inclinate, oggetti che **rotolano**. Suolo: piani sovrapposti, la gravità
è vera. Movimento: rotolamento, rimbalzo, salto corto ad arco, la scala salita a
fotogrammi. Carattere: bitmap con ombra portata a 1 px. Serve a: ordine verticale
(«solo dall'alto in basso», Burger Time), pipeline a piani, cose che scendono per
gradi. Non fare: piani vuoti — ogni piano deve avere il suo ostacolo.

### R6 · Isometrico pastello
*Q\*bert, Marble Madness, Crystal Castles, Zaxxon, Paperboy (`40.8`).*
Fondo `#000000` (Q\*bert) o grafite `#1A1A2E`. Cubi a tre facce: alto `#FFD98E`,
sinistra `#E07B39`, destra `#7A3E9D`; colore-obiettivo `#3FE0C5`; ombra `#101018`
netta. Forme: rombi e prismi, spigoli vivi, niente prospettiva — isometria pura a
30°. Suolo: la piramide, la pista, la griglia di cubi. Movimento: salto ad arco sulle
diagonali, rotolamento con inerzia, caduta fuori dal bordo. Carattere: sans
geometrico, cifre in un riquadro isometrico. Serve a: uno stato per cella (copertura,
Q\*bert), percorsi con bivi (Marble Madness), alberi e cartelle (`L5`), consegna a
bersagli sì/no (Paperboy). Non fare: illuminazione realistica; le tre facce hanno tre
toni e basta.

### R7 · Orizzonte al tramonto
*Out Run, Space Harrier, Pole Position, Hang-On (`40.11`, `41.3`).*
Fondo: cielo a bande orizzontali da arancio `#FFB347` a rosa `#FF6B9D` a viola
`#6A3DA6` a blu notte `#1B1464`; sole a strisce `#FFE066`. Suolo: strada grigia
`#4A4A4A` con cordoli bianco `#F2F2F2` / rosso `#E63946` che convergono, oppure
scacchiera verde `#2F8F5B` / `#3FB57A` che scorre (Harrier). Palme e cartelli come
sagome nere `#0D0D1A`. Forme: tutto **scala** verso la camera; le curve piegano la
strada a bande. Movimento: verso lo spettatore, con le bande del suolo che scorrono;
gli oggetti crescono, non si muovono. Carattere: sans corsivo inclinato, cifre grandi
con contorno. Serve a: scelta di rotta ai bivi, corsie, «cosa arriva e cosa scelgo»
(`12` endless runner, `L2` Discesa). Non fare: la vista dall'alto. Qui si guarda
l'orizzonte.

### R8 · Caramella e bolle
*Bubble Bobble, Puyo Puyo, Puzzle Bobble, TwinBee, Pop'n Music (`40.9`, `41.5`).*
Fondo: indaco pastello `#2B2D5C` oppure crema `#FDF3E7` (giocare **una** volta per
banda su fondo chiaro). Palette: rosa `#FF6B8A`, giallo `#FFD166`, verde `#06D6A0`,
azzurro `#4CC9F0`, viola `#9B5DE5`; riflesso bianco al 30 % in alto a sinistra;
contorno `#2B2D5C` 2 px. Forme: cerchi e blob con riflesso, tutto tondo, occhi
ammessi (se il committente non vuole facce: solo sagome, il riflesso resta). Suolo:
pavimento a mattoncini pastello, oppure il soffitto che scende. Movimento: squash e
stretch, rimbalzo, **pop** con 6–8 particelle, la catena che cade. Carattere: sans
tondo e grasso, cifre bianche con contorno. Serve a: raggruppare uguali, morfologia
(blob che si fondono: prefisso + radice), catene, mira con rimbalzo (`14`, `15`). Non
fare: colori spenti; qui la saturazione è alta e il contorno la tiene insieme.

### R9 · Neon su griglia
*Tron, Discs of Tron, Super Hexagon, Groove Coaster (`40.8`, `41.4`).*
Fondo `#05060F` con griglia `#12203A` in prospettiva o piatta. Palette: ciano
`#00E5FF`, magenta `#FF3EA5`, arancio `#FF9F1C`, blu `#2D5BFF`, bianco `#FFFFFF`.
Forme: linee con scia persistente, esagoni, bloom. Movimento: scia che resta,
pulsazione a tempo, rotazione del campo. Carattere: sans esteso con glow.
**Quota: al massimo un gioco per banda.** È il registro più vicino a quello che
abbiamo fatto finora (scuro + glow), e va razionato per questo. Serve a: tracciati
(Blockade), tempo musicale, vincoli geometrici.

### R10 · Fiera e baraccone
*Whac-A-Mole, Carnival, Point Blank, Skee-Ball, Circus (`40.3`, `41.3`, `41.8`).*
Fondo: tendone a strisce rosso `#C8102E` / crema `#FFF4D6`, oppure legno `#A0623A`.
Palette: giallo `#FFC72C`, blu `#1D4E89`, verde `#2E8B57`, lampadine `#FFE9A8` con
alone caldo. Forme: cornici arrotondate bordate di lampadine, bersagli concentrici,
cartelli dipinti con ombra portata, oggetti di legno e latta. Suolo: il bancone. Movimento:
**spuntare e rientrare** (ease-out-back), oscillazioni meccaniche a pendolo, cartelli
che si girano. Carattere: display da insegna con grazie (tipo *Alfa Slab One* o
*Rye*), cifre su tabellone a lampadine. Serve a: colpire ciò che spunta (solo se le
talpe si distinguono per il concetto, `30` §30.3), «solo i…», sfide da dieci secondi
alla Point Blank (il modello per otto capitoli). Non fare: renderlo elegante; deve
sembrare dipinto a mano.

### R11 · Flipper
*Black Knight, The Addams Family, Video Pinball (`41.8`).*
Fondo: playfield illustrato verde `#1F5E3D` o blu `#163B6B`; guide cromate `#C9D1D9`
con riflesso; lampade ambra `#FFB300` e rosse `#FF3B30`; plastiche traslucide a
colori. Display a matrice di punti ambra `#FF9F1C` su `#1A0E00`. Forme: bumper tondi,
bersagli a lamella, rollover, rampe. Suolo: il piano inclinato, con fisica vera della
palla. Movimento: la palla con attrito e rimbalzo, le lampade che si accendono in
**sequenza** (chase), il flipper con overshoot. Carattere: matrice di punti 5×7.
Serve a: obiettivi da accendere in ordine (le lettere di una parola: Addams Family lo
faceva nel 1992), percorsi con rampe, richieste che «entrano» in un bersaglio (`L6`
Centralino). Non fare: una palla lenta. Il flipper è veloce o non è.

### R12 · LCD Game & Watch
*Ball, Fire, Manhole, Octopus (`41.7`).*
Fondo: schermo grigio-verde `#C5CBB0`, cassa oro `#B8975A` o bordeaux `#6B1E2E`,
scena di sfondo stampata in due colori pallidi. Segmenti neri `#1E1E1E`; i segmenti
**spenti restano visibili al 6–8 %** (il fantasma LCD: è la firma). Forme: solo
stati discreti disegnati in anticipo; nessun oggetto in posizione intermedia.
Suolo: implicito nella scena stampata. Movimento: **nessuno tra gli stati** — le
cose saltano da una posizione all'altra; il ritmo iniziale non scende sotto i 600 ms
per passo (`31`), e tutto ciò che si muove va annunciato dal beep piezo. È l'unico
registro che rompe la regola «niente a velocità costante» di proposito. Carattere:
cifre a 7 segmenti. Serve a: allocazione (una risorsa, quattro posti: Manhole),
posizioni discrete, giochi a due tasti (`13`, `L2` Soglia). Non fare: un solo pixel di
easing.

### R13 · Carta e tessere
*Scrabble, Wordle, Ruzzle, Bookworm, Text Twist, Threes (`41.9`).*
Fondo: carta `#F6F1E7` o lavagna `#1F2A24` con gesso `#E8E4D8`. Tessere crema
`#FFF8E7` con bordo `#D9C9A3` e ombra 0 2px; legno chiaro `#E4C590` (Ruzzle);
inchiostro `#1C1B1A`; stati verde `#6AAA64`, giallo `#C9B458`, grigio `#787C7E`
(Wordle — il feedback a tre stati senza rosso). Forme: tessere quadrate con angoli
4 px, lettere grandi, righe di trattini per ciò che manca. Suolo: la griglia, il
tavolo, la mensola. Movimento: **flip** della tessera, slide sulla griglia, il pop di
2 px sulla lettera digitata, la tessera che «brucia» scendendo (Bookworm). Carattere:
una grazia leggibile (tipo *Libre Baskerville*) per le lettere, sans per le cifre.
Serve a: **tutto ciò che è parola** — ortografia, morfologia, ordine della frase. È
il registro principale per l'inglese. Non fare: fondo scuro per abitudine; qui la
carta è chiara.

### R14 · Quaderno a penna
*Doodle Jump, i giochi «disegnati» (`41.10`).*
Fondo: carta a quadretti `#FBFBF3` con righe `#D7E3F4`; tratto a penna `#1B2A49`;
evidenziatore giallo `#FFF176`; matita `#8A8A8A`. Forme: contorno tremolante (1 px di
jitter su due fotogrammi: il *boil*), riempimenti a tratteggio, scarabocchi. Suolo:
le righe del quaderno. Movimento: le cose si **disegnano** (sketch-in), il boil
continuo, la cancellatura a gomma. Carattere: scrittura a mano regolare (tipo
*Patrick Hand*), cifre come appunti a margine. Serve a: grammatica e correzione (la
penna blu che riscrive, mai rossa), piani e mappe (`Cyber L1` la casa vista dall'alto
è una planimetria a penna), qualunque famiglia in tono leggero. Non fare: tratto
perfetto; se non trema, non è a penna.

### R15 · Voxel e low-poly
*Crossy Road, Virtua Fighter, Hard Drivin', Overcooked (`41.10`, `41.2`).*
Fondo: cielo piatto `#9BD3F5` o `#F3E9D2`. Palette: erba `#6BC26B`, strada
`#55585C`, legno `#B87B4B`, acqua `#3FA7D6`, accento `#FF7043`; ombra netta al 40 %
senza sfumatura. Forme: cubi e prismi senza contorno, luce dura da un lato, camera
fissa a tre quarti. Suolo: la griglia di terreno a piastrelle. Movimento: **salti
discreti con squash**, la camera che segue con ritardo, tutto ciò che cade fa un
piccolo rimbalzo. Carattere: sans grasso con contorno. Serve a: attraversare
(Frogger, `L?`), scene con molti oggetti, cucine e catene di montaggio (`L4` Cucina,
`L7` Linea). Non fare: texture; il colore è per faccia.

---

## 42.5 Rotazione e riassegnazione

**Regole di rotazione**
1. Due giochi consecutivi nella mappa di un topic non condividono il registro.
2. In una banda da sei livelli un registro compare al massimo due volte; R9 (neon)
   una volta sola.
3. In ogni banda almeno **un** gioco ha il fondo chiaro (R8 crema, R12, R13, R14, R15).
4. Il registro si sceglie **dopo** archetipo e verbo (`00` §0.2) ma **prima** del
   codice, e si scrive nella scheda di progetto.

**Riassegnazione proposta per i tredici giochi fatti** (da decidere col committente:
è un rifacimento del vetro, non della meccanica, che ha passato i tre test).

| Gioco | Archetipo | Registro proposto | Perché |
|---|---|---|---|
| L1 Chiosco | servire (Tapper) | R10 Fiera | il bancone di legno e le lampadine sono il chiosco |
| L2 Discesa | endless runner | R7 Orizzonte | la discesa si guarda dall'orizzonte |
| L2 Magazzino | impilare | R5 Travi e scale | scaffali come travi, pacchi che rotolano |
| L2 Soglia | un tasto | R12 LCD | due stati, un tasto: è un Game & Watch |
| L3 Bilancia | pesare | R13 Carta e tessere | pesi come tessere su un tavolo chiaro |
| L4 Cucina | servire a passi | R8 Caramella | ingredienti tondi, pop a piatto completo |
| L4 Smistamento | corsie | R2 Primari Namco | corsie su griglia, scatti a celle |
| L5 Officina | percorsi/cartelle | R6 Isometrico | l'albero delle cartelle è una piramide di cubi |
| L6 Centralino | instradare | R11 Flipper | le richieste entrano nei bersagli, le lampade si accendono |
| L7 Linea | difesa a torri | R15 Voxel | catena di montaggio low-poly, camera a tre quarti |
| L8 Indirizzario | comporre l'indirizzo | R13 Carta e tessere | l'indirizzo si compone con tessere |
| L9 Catena | dare il via | R9 Neon (la quota di banda 2) | la catena come scia luminosa |
| L10 Archivio | interrogare strati | R4 Terra a strati | i record stanno negli strati |
| L11 Lasciapassare | afferrare col guanto | R3 Gel su nero | file ordinate di lasciapassare, bande di colore |
| L12 Scarico | deviare gli errori | R5 Travi e scale | gli errori cadono di piano in piano |
| L13 Condotto | deviare il flusso | R1 Fosforo vettoriale | tubi e vasche come poligoni che pulsano |
| L19 tsc | terminale | terminale (resta) | in banda 4 il testo è il registro; gli altri cinque alternano R13 e R12 |
| Cyber L1 Casa | proteggere la casa | R14 Quaderno | la casa vista dall'alto è una planimetria a penna |

---

## 42.6 Checklist visiva di consegna

Si passa prima di `00` §0.8. Una risposta sbagliata rimanda il gioco indietro.

1. Screenshot al 50 %: si capisce **quale** gioco è senza leggere una parola?
2. Coperto il testo con la mano: c'è una figura? c'è un suolo?
3. Contati i colori del vetro: tra 4 e 6? nessuno è l'oro della cornice?
4. Il fondo è nero puro? Solo se il registro lo chiede (R1, R2, R3, R5, R6).
5. L'oggetto principale è un rettangolo con un'etichetta? → si ridisegna.
6. Durante il gioco il vetro riempie lo schermo e il menù dei capitoli non c'è?
7. Le cifre dentro il vetro usano il carattere del registro, non quello dell'app?
8. La frase del movimento è diversa da quella del gioco precedente nella mappa?
9. Il registro è diverso da quello dei tre giochi costruiti prima?
10. Con `prefers-reduced-motion` il gioco resta leggibile (il registro R12 lo è già)?
