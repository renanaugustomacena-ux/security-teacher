# 02 — Game feel e juice

> Questo capitolo è sulla differenza fra un gioco che *funziona* e un gioco che si
> *sente*. Non è decorazione: è la ragione per cui i miei primi sette giochi
> sembravano blocchi di testo animati.

---

## 2.1 Le tre cose, e sono in ordine

Un gioco si sente bene quando tre cose si allineano:

1. **I controlli rispondono nell'istante in cui premi.**
2. **Ogni azione produce un feedback che il giocatore riesce a leggere.**
3. **Uno strato di rifinitura** — squash and stretch, screen shake, particelle,
   suono — rende ogni interazione soddisfacente invece che soltanto corretta.

Le prime due si chiamano **game feel** (Steve Swink), la terza si chiama **juice**.

L'ordine conta. Il juice su controlli lenti è trucco da imbonitore: peggiora le
cose, perché aumenta l'aspettativa senza mantenerla. Prima la reattività, poi la
leggibilità, poi il juice. Non si salta.

Il vocabolario del mestiere è stato fissato da due interventi che ogni progettista
finisce per guardare:

- **"Juice It or Lose It"** (Martin Jonasson e Petri Purho, 2012): prendono un
  Breakout noioso e ci accumulano sopra effetti dal vivo sul palco — squash,
  particelle, scie, suono — finché lo stesso identico gioco sembra vivo. È il
  riferimento canonico per cosa significa "juice".
- **"The Art of Screenshake"** (Jan Willem Nijman, Vlambeer, 2013): una raffica di
  circa trenta trucchi che hanno reso Nuclear Throne immediato e violento — vampa
  della bocca da fuoco, hit-stop, contraccolpo della camera.

Le radici sono più antiche: squash and stretch, anticipazione e follow-through
arrivano diritti dai **dodici principi dell'animazione Disney** di Frank Thomas e
Ollie Johnston, *The Illusion of Life*.

E il dato che tiene insieme tutto: Vampire Survivors ha funzionato **non** per la
grafica — usa sprite semplici — ma per il juice.

## 2.2 Reattività: il livello zero

### Nessun ritardo fra input e reazione visiva
La reazione deve partire nel frame dell'input, anche se l'effetto completo dura
mezzo secondo. Se il giocatore tocca e per 80 ms non succede niente, il gioco è
rotto anche se poi succede tutto.

**Regola:** al `pointerdown` cambia già qualcosa (l'oggetto si abbassa di 2px, si
scurisce, parte il suono). L'esito può arrivare al `pointerup`.

### Le finestre di perdono: coyote time e input buffering
Sono le due meccaniche di perdono più efficaci, e nessuna delle due è visibile al
giocatore. Entrambe si sentono immediatamente. I giochi che le hanno sembrano
giusti e reattivi; quelli che non le hanno sembrano imbrogliare, anche quando
tecnicamente non imbrogliano.

Il problema che risolvono è percettivo: **l'occhio umano elabora l'informazione
visiva con circa 13 ms di ritardo rispetto alla realtà.** Quando il giocatore vede
il personaggio lasciare il bordo, è già in aria da diversi frame.

**Coyote time** = periodo di grazia *dopo* che il personaggio ha lasciato il bordo,
durante il quale il salto viene ancora accettato. Perdona chi è in ritardo.

**Input buffering** = il comando premuto *prima* che sia valido viene conservato e
eseguito appena diventa valido. Perdona chi è in anticipo.

Valori collaudati:

| Tipo di gioco | Coyote time | Buffer |
|---|---|---|
| Platform di precisione | 70–100 ms | 70–110 ms |
| Platform d'azione | 90–140 ms | 100–150 ms |
| **Platform mobile / casual** | **110–170 ms** | **120–180 ms** |

Per il salto, la finestra di buffer standard è **100–150 ms**, cioè 6–9 frame a
60 fps: copre il tipico scarto di tempo di reazione fra il vedere l'atterraggio e
il premere il tasto. Il coyote conviene tenerlo più corto, 5–8 frame; il buffer
può essere un filo più lungo, 6–9 frame.

**Non sono numeri sacri, sono manopole.** Si girano piano e si ascolta.

**Per noi (target mobile + desktop): coyote 140 ms, buffer 160 ms.** Stiamo nella
fascia casual, perché il nostro giocatore non è un giocatore di platform di
precisione — è uno che sta imparando Node.

E la frase che dice se hai tarato bene, riportata da chi le ha implementate:
*"questo salto finalmente sembra colpa mia quando lo sbaglio."* Quello è il
bersaglio: perdonare senza togliere responsabilità.

### Estensione a tutti i nostri giochi
Il buffering non serve solo nei platform. Vale ogni volta che il giocatore può
premere "un attimo troppo presto":

- **Chiosco:** se tocco un cliente mentre l'animazione di consegna precedente è in
  corso, il tocco va in buffer e si esegue appena libero. Mai perso.
- **Lama:** se il gesto attraversa l'oggetto 30 ms prima che entri nell'area
  valida, conta comunque.
- **Semaforo:** se smisto durante il micro-blocco del feedback, il comando resta
  in coda.

**Regola generale: nessun input del giocatore viene mai buttato via in silenzio.**
O si esegue, o si rifiuta con un segnale visibile.

## 2.3 Leggibilità: il giocatore deve capire senza leggere

### Il fondale deve stare zitto
Analisi di un caso da manuale (una palla di gelatina che salta): il fondale è
**immacolato** per far risaltare il personaggio; la gelatina sta al centro dello
schermo e il suo colore è **saturato** per contrastare con l'ambiente; e la
gelatina **non è ombreggiata come il resto del livello**, così sembra cartoon. È
questa la base solida su cui si costruisce il juice — e la frase che riassume:
non si ottiene un buon succo senza una buona frutta.

**Per noi:** l'oggetto con cui il giocatore interagisce ha sempre il contrasto più
alto della scena. Tutto il resto è più smorzato di quanto istintivamente mi viene
di fare. Se la scena ha tre cose che urlano, il giocatore non sa dove guardare —
e per il meccanismo attentivo del capitolo 01, questo è un difetto **pedagogico**,
non estetico.

### Gerarchia di contrasto, in tre livelli
1. **Oggetto attivo** — contrasto massimo, saturazione alta, nessuna ombra
   ambientale, spesso un'animazione di respiro.
2. **Oggetti in attesa** — stesso linguaggio ma smorzati: opacità 0,7–0,85,
   saturazione ridotta.
3. **Ambiente** — desaturato, contrasto basso, nessun movimento che catturi
   l'occhio.

### Lo stato si legge dalla forma, non dal testo
Un cliente impaziente non ha una barra che scende: **trema**. Una coda satura non
ha un numero: si **allunga fino a uscire dallo schermo**. Un forno pronto non ha
una scritta: **suona e brilla**.

Il testo nella scena di gioco è ammesso solo per il **contenuto didattico** (che è
il punto), mai per lo stato del sistema.

## 2.4 Juice: il catalogo

### Dosaggio: il feedback va graduato
La regola più importante e la più violata: **il feedback deve essere graduato —
operazioni leggere feedback leggero, operazioni pesanti feedback pesante.**

Se ogni azione ha lo stesso botto, nessuna azione ha peso. La combo da 5 e il
singolo +1 non possono avere lo stesso effetto.

Scala a quattro gradini, da usare come riferimento:

| Gradino | Quando | Effetto |
|---|---|---|
| **1 — Tocco** | ogni input accettato | 2px di affossamento, suono cortissimo (~40 ms), nessuna particella |
| **2 — Riuscita** | azione singola corretta | 6–8 particelle, "+1" che vola, suono acuto 60–90 ms, squash sull'oggetto |
| **3 — Riuscita grossa** | combo, sequenza perfetta | 12–16 particelle, testo grande, suono con salita di tono, micro-shake 3px |
| **4 — Evento** | livello completo, blocco, game over | shake pieno, hit-stop, cambio di luce sulla scena, suono lungo |

### Hit-stop
Micro-pausa all'impatto: si ferma l'aggiornamento del gioco, si congelano le
animazioni, **ma non si congela l'intero mondo**.

Durata ottimale collaudata: **0,05–0,1 secondi**. Più corto non si percepisce,
più lungo fa pensare che il gioco sia impallato. Nel canone dei picchiaduro si
parla di 3–5 frame.

**Per noi:** 80 ms sul gradino 3 e 4. Mai sul gradino 1 o 2 — renderebbe il gioco
appiccicoso.

### Screen shake
Da usare **con parsimonia ma con violenza**, riservato a eventi che spostano
l'aria o la terra.

Nella nostra scala: gradino 3 → 3px, 200 ms. Gradino 4 → 7px, 500 ms, ripetuto
finché lo stato dura (è il caso del blocco).

**Mai** shake su un errore del giocatore-studente. Lo shake è per la conseguenza
nel mondo, non per il rimprovero.

### Particelle
Non servono sistemi particellari: 6–16 quadratini che partono dal punto
dell'azione con velocità casuale e gravità, che scompaiono in 600–700 ms.

Il colore delle particelle viene **dall'oggetto**, non dalla palette globale: è
quello che vende l'idea che l'oggetto si è disintegrato.

### Squash and stretch
Dai principi Disney. Tre applicazioni obbligatorie:

- **All'atterraggio:** schiacciamento verticale 15%, ritorno in 120 ms.
- **All'anticipazione:** prima di partire, l'oggetto si comprime nella direzione
  opposta per ~80 ms.
- **Al tocco:** l'oggetto toccato si comprime del 6% e torna.

### Tween: niente si muove a velocità costante
Un caso di studio riassume il juice di un personaggio in tre cose: **oscilla**,
**schizza**, e **lascia un segno a terra all'atterraggio** — cioè: animato con
tween, movimento arricchito da particelle, e una traccia permanente.

Quel terzo elemento — il segno che resta — è quello che mi ero dimenticato del
tutto e vale doppio: rende il mondo **conseguente**. Le cose che fai lasciano
tracce.

Curve da usare:
- Entrata in scena: `cubic-bezier(.2,.9,.25,1)` — arriva veloce e si assesta.
- Uscita: accelerazione, `ease-in`.
- Movimenti nel mondo (fila che avanza): 340 ms, curva sopra.
- Micro-reazioni (tocco): 100–140 ms.

### Traiettorie ad arco, non rettilinee
Ancora Disney: niente si muove in linea retta. Le particelle hanno gravità, gli
oggetti che volano fanno una parabola, il testo "+1" esce con una leggera deriva
laterale.

## 2.5 Audio: non è opzionale

L'errore più costoso: **il juice visivo senza audio corrispondente sembra
incompleto.** Le guide ufficiali di progettazione haptica (Meta, Android) insistono
sullo stesso punto: non si progettano vibrazione o suono separatamente, si
considera il quadro intero.

Testimonianza diretta riportata da chi ci è passato: aggiunta la vibrazione senza
il suono, i giocatori dicevano che "si sentiva strano", e si è risolto solo
mettendoli insieme.

Lo studio di Lin et al. (2022, IEEE Xplore, *What Features Influence Impact
Feel?*) ha esaminato sistematicamente 19 caratteristiche di progetto che
influenzano la sensazione d'impatto, su dimensioni visive, sonore, tattili, di
animazione e di camera. Le tre a peso maggiore:

1. **hit-stop**
2. **coerenza del suono**
3. **controllo della camera**

Due su tre riguardano cose che nei miei giochi non c'erano affatto.

### Palette sonora per i nostri giochi
Sintesi via WebAudio, zero file da scaricare — vincolo APK rispettato.

| Evento | Forma d'onda | Frequenza | Durata |
|---|---|---|---|
| Tocco accettato | square | 520 Hz | 40 ms |
| Azione riuscita | square | 620–1040 Hz (sale con la combo) | 60–90 ms |
| Pronto / disponibile | square | 880 Hz | 90 ms |
| Spostamento (in coda, nel retro) | triangle | 400 Hz | 100 ms |
| Perdita | sawtooth | 110–120 Hz | 200–220 ms |
| Blocco | sawtooth | 80 Hz | 350–400 ms |
| Fine blocco | square | 300 Hz | 100 ms |
| Livello completo | square, 3 note ascendenti | 520 / 660 / 880 Hz | 90 ms ciascuna |

Volume: 0,05 di guadagno con decadimento esponenziale. Basso: il gioco si gioca
anche in silenzio, il suono non deve essere l'unico canale.

### La regola del terzo canale
Ogni informazione importante passa da **almeno due canali su tre** (visivo,
sonoro, testuale-numerico). Chi gioca in silenzio non perde niente; chi non guarda
il contatore sente comunque il salire della combo.

## 2.6 Il juice non è una scusa

C'è un contro-argomento che vale la pena tenere presente: il settore si sta
muovendo verso una comprensione più sfumata del game feel, e chi progetta comincia
a rendersi conto che il juice non è solo effetti vistosi e suoni sopra le righe —
si tratta di creare un'esperienza coesa, spostando l'attenzione dal fattore "wow"
alla costruzione di un ciclo di gioco davvero soddisfacente. Il juice va usato
**intenzionalmente e con parsimonia**, per rafforzare l'esperienza centrale, non
per distrarre da essa.

Tradotto per noi, e va detto perché è il rischio del prossimo giro: **non posso
usare le particelle per coprire un gioco che non insegna.** Il capitolo 01 viene
prima di questo. Un gioco di grado 1 con juice perfetto resta un gioco che insegna
i colori.

E gli errori da manuale, da rileggere prima di ogni consegna:

- ignorare le prestazioni (le particelle complesse ammazzano il frame rate sui
  dispositivi deboli — e noi andiamo su APK Android);
- applicazione incoerente (juice su alcune azioni e non su altre: l'esperienza
  risulta sbilenca);
- dimenticare l'audio;
- trascurare l'accessibilità (c'è chi è sensibile a shake e lampi).

## 2.7 Accessibilità: `prefers-reduced-motion`

Vincolo già nel design system Knowledge AIO, e la letteratura sul juice lo conferma
come requisito, non come cortesia: bisogna dare modo di ridurre o disattivare gli
effetti intensi.

Sotto `prefers-reduced-motion: reduce`:

- **Restano:** cambi di colore, opacità, l'informazione, tutto l'audio.
- **Spariscono:** screen shake, particelle, rotazioni, scie.
- **Si accorciano:** i tween da 340 ms passano a 120 ms; niente si muove per più
  di 150 ms.
- **Non cambiano mai:** le finestre di reazione. Ridurre il movimento non deve
  rendere il gioco più difficile.

---

## Checklist di consegna — juice

Da spuntare su ogni gioco prima di dire che è finito.

**Reattività**
- [ ] Reazione visiva nel frame dell'input
- [ ] Input buffering 160 ms su ogni azione
- [ ] Nessun input scartato in silenzio
- [ ] Coyote time 140 ms dove c'è una finestra temporale

**Leggibilità**
- [ ] L'oggetto attivo ha il contrasto più alto della scena
- [ ] Il fondale non ha niente che catturi l'occhio
- [ ] Ogni stato si legge dalla forma o dal movimento, non da una scritta
- [ ] Tre livelli di contrasto rispettati

**Juice**
- [ ] Niente appare di colpo: tutto entra con un'animazione
- [ ] Niente si muove a velocità costante
- [ ] Squash al tocco, all'atterraggio, in anticipazione
- [ ] Particelle col colore dell'oggetto, 600–700 ms
- [ ] Qualcosa **resta** dopo l'azione (una traccia, un segno)
- [ ] Feedback graduato su quattro gradini
- [ ] Hit-stop 80 ms solo sui gradini 3 e 4
- [ ] Shake solo per conseguenze nel mondo, mai per rimprovero

**Audio**
- [ ] Tutti gli otto eventi della palette hanno un suono
- [ ] Nessuna informazione passa da un solo canale
- [ ] Il gioco si gioca in silenzio senza perdere nulla

**Accessibilità**
- [ ] `prefers-reduced-motion` gestito
- [ ] Le finestre di reazione non cambiano mai

---

## Fonti di questo capitolo

- Jonasson & Purho (2012), *Juice It or Lose It*
- Nijman / Vlambeer (2013), *The Art of Screenshake*
- Swink, *Game Feel* — modello in tre parti
- Thomas & Johnston, *The Illusion of Life* — i dodici principi
- Lin et al. (2022), *What Features Influence Impact Feel?*, IEEE Xplore — 19
  caratteristiche, hit-stop / coerenza sonora / controllo camera a peso maggiore
- GameAnalytics, *Squeezing more juice out of your game design* — il caso della
  gelatina: oscilla, schizza, lascia il segno
- GameJuice, *Coyote Time, Input Buffering, and the Art of Forgiving Controls*
- Gamine AI, *Input Buffering and Coyote Time in 2D* — le tre fasce di valori
- Blood Moon Interactive, *Juice in Game Design* — i quattro errori da manuale
- Wayline, *When Juice Becomes a Crutch* — il contro-argomento
- Guide ufficiali di progettazione haptica Meta e Android
