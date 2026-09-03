# 12 — Corsa infinita (endless runner)

> Riferimento: Temple Run (Imangi, 2011), Subway Surfers (2012), Canabalt
> (2009). Il personaggio corre da solo; il giocatore decide solo *dove*. Ottimo
> per l'ordinamento e per tutto ciò che ha un flusso che non si può fermare.

---

## 12.1 Come funziona l'originale

Il movimento in avanti è **automatico e non negoziabile**. Il giocatore ha tre o
quattro gesti (sinistra, destra, salta, scivola) e li usa reagendo a ciò che
arriva. La velocità cresce lentamente e senza limite; la partita finisce con la
morte, sempre.

Struttura tecnica: il livello non esiste in anticipo, è **cucito a pezzi**
(chunk) presi da un mazzo, secondo regole di compatibilità. Ogni pezzo ha un
ingresso e un'uscita che devono combaciare, e una difficoltà dichiarata.

Numeri di riferimento:
- Temple Run: velocità iniziale ~9 unità/s, +1 ogni ~20 s, cap morbido a ~19;
- distanza di visibilità: ~2,5 s di corsa. È la costante che governa tutto: il
  giocatore vede sempre 2,5 secondi di futuro;
- finestra di input per una svolta: ~350 ms prima e ~120 ms dopo la linea di
  svolta (perdona in anticipo molto più che in ritardo);
- coyote time sul salto: 90-120 ms dopo aver lasciato il bordo.

## 12.2 Perché funziona

**A. La pressione non viene dal gioco, viene dal movimento.** Non c'è timer:
c'è il fatto che stai andando avanti. È la forma di urgenza meno fastidiosa che
esista, perché è coerente col mondo.

**B. Il giocatore non ha mai colpa dell'inizio.** Non deve decidere quando
partire, come muoversi, che ritmo tenere. Ha una sola classe di decisione — dove
mettersi — e la ha molte volte al minuto. Questo rende l'apprendimento veloce:
tante ripetizioni della stessa scelta.

**C. La visibilità costante è tolleranza costante.** Vedi sempre 2,5 s avanti,
sempre; quindi la difficoltà non è "reagire più in fretta" ma "decidere cose più
difficili nello stesso tempo". Questa proprietà è preziosa per noi: significa che
la difficoltà **didattica** può crescere senza che la difficoltà **motoria**
cresca.

**D. La morte è istantanea e il retry è immediato.** La corsa media dura 40-90 s.
Il costo di morire è basso, quindi si prova.

## 12.3 Il core loop

> **Scelgo la corsia giusta prima di arrivarci, mentre la corsa accelera.**

La scelta è ripetuta, di una sola classe, e ha una conseguenza fisica e
immediata. La corsa non si ferma per nessun motivo, mai — nemmeno per il
coaching (vedi §12.8, errore 4).

## 12.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| cambia corsia | swipe ← / → | ← / → o A/D | subito |
| salta | swipe ↑ | ↑ / spazio / W | beat 2, al primo ostacolo basso |
| scivola | swipe ↓ | ↓ / S | beat 3, al primo ostacolo alto |
| raccogli | automatico al contatto | idem | mai un comando |

Massimo tre gesti, e il quarto non esiste: raccogliere è passivo. Regola dal
capitolo `04`: ogni gesto si sblocca al primo ostacolo che lo richiede, non
prima. Nel beat 1 esistono **solo** le corsie.

Dettagli di input, non negoziabili perché sono la differenza fra "difficile" e
"rotto":
- **buffer di input**: un gesto dato fino a 350 ms prima della linea di svolta si
  memorizza e si applica alla linea;
- **perdono in anticipo, non in ritardo**: 350 ms prima, 120 ms dopo;
- **coyote time** sul salto: 110 ms;
- swipe: soglia 28 px, direzione dominante, e **si accetta anche uno swipe
  rapido e corto** (la gente su mobile fa gesti piccoli);
- niente doppio tocco per niente.

## 12.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Distanza di visibilità | 2,6 s di corsa | **la costante madre**: la si tiene fissa e si cambia tutto il resto |
| Velocità iniziale | 1 corsia / 1,15 s | |
| Accelerazione | +7% ogni 15 s | |
| Cap di velocità | 2,1× l'iniziale | oltre, la lettura muore |
| Numero di corsie | 3 | 4 solo se il concetto ha 4 categorie; 5 mai |
| Intervallo fra decisioni | 1,6 s → 1,0 s | |
| Coyote time | 110 ms | |
| Buffer di input | 350 ms | |
| Hit-stop sull'impatto | 90 ms | più lungo dello slash: l'impatto è grosso |
| Tempo di riavvio dopo morte | 700 ms, nessuna schermata | |
| Lunghezza chunk | 3-5 decisioni | |

### La regola della visibilità costante

Se la velocità cresce del 7% e la distanza di visibilità deve restare 2,6 s,
allora **la telecamera deve arretrare** o la nebbia deve allontanarsi della
stessa percentuale. Questo è il pezzo che quasi tutti sbagliano: se la camera
resta fissa, accelerare riduce il tempo di lettura e il gioco diventa un test di
riflessi. Noi non vogliamo un test di riflessi, vogliamo tempo costante per
decisioni sempre più difficili.

## 12.6 Manopole della difficoltà

Sicure, in ordine:

1. **Difficoltà concettuale della scelta** (la manopola didattica: le corsie
   diventano più difficili da distinguere *concettualmente*).
2. **Densità delle decisioni** (da 1,6 s a 1,0 s fra una scelta e la successiva).
3. **Decisioni composte** (la corsia giusta dipende da due cose insieme).
4. **Memoria** (la corsia giusta dipende da qualcosa visto 4 s prima — potente e
   pericolosa: usare solo per concetti che *sono* memoria, come la cache).
5. **Velocità** (solo con camera che arretra, vedi sopra).

Da evitare:
- ostacoli che appaiono dentro la distanza di visibilità (è barare);
- svolte cieche senza telegrafo;
- combinazioni di gesti (swipe ↑ poi ← in 200 ms).

## 12.7 Juice specifico

- **Telegrafo di ogni decisione**: 600 ms prima che la scelta sia obbligata, il
  bivio è già leggibile. Se il giocatore deve sapere una cosa, la vede prima.
- **Il cambio corsia ha inerzia**: 140 ms di transizione con easing
  `cubic-bezier(.2,.8,.2,1)`, più un'inclinazione del busto di 8-12° che rientra.
  Senza inclinazione il cambio corsia sembra teletrasporto.
- **Camera che respira**: FOV/scala +3% quando la velocità sale, ritorno lento.
- **Velocità = campo visivo, non solo movimento**: motion blur laterale leggero
  (2-4 px) e linee di velocità che appaiono solo sopra il 60% della velocità.
- **L'impatto**: hit-stop 90 ms, camera che scatta di 8 px nella direzione
  opposta, tutto l'audio che si abbassa di colpo per 200 ms tranne un rumore
  sordo. Poi il riavvio.
- **La ripartenza non è dall'inizio del mondo**: si riparte 3 s prima del punto di
  morte. Il ricordo dell'errore è ancora caldo.
- **Nessun HUD in alto**: distanza e stato vanno letti dal mondo (`04` §4.6).

## 12.8 Come si rovina

**1. Corsie colorate.** Corsia verde/giallo/rossa, o le tre categorie con tre
colori. Il giocatore impara "vado sempre nella verde". Le tre corsie devono
essere **identiche** e ciò che le distingue è quello che c'è sopra o davanti.

**2. Velocità come unica difficoltà.** Il gioco diventa un test di riflessi e
smette di misurare la comprensione. La difficoltà cresce sulla manopola 1, non
sulla 5.

**3. Ostacoli fuori dalla visibilità.** Morire per qualcosa che non si poteva
vedere è l'unico modo sicuro di far chiudere l'app.

**4. Fermare la corsa per spiegare.** Se al terzo errore la corsa si ferma per
il coaching, distruggi la proprietà A (§12.2) e il gioco diventa una lezione con
un runner intorno. Il coaching in questo archetipo va **dopo la morte**, nei 700
ms di riavvio, e sotto forma di *replay* dell'ultima decisione sbagliata: si
rivede il bivio, in slow motion, con la corsia giusta illuminata. Zero testo.

**5. Monete e collezionabili che distraggono dalla scelta.** Se ci sono cose da
raccogliere in corsie diverse da quella giusta, il gioco insegna avidità, non il
concetto. I collezionabili, se ci sono, stanno **sulla corsia giusta**: sono un
rinforzo, non una tentazione.

**6. Il personaggio che ruba la scena.** Se il personaggio è grosso e animato in
modo elaborato, copre il futuro. La silhouette deve occupare meno del 12%
dell'altezza dello schermo e stare nel terzo basso.

**7. Quattro o più gesti.** Con quattro gesti la difficoltà diventa motoria.
Nostro limite: tre, e in banda 1 due.

## 12.9 Quali concetti Node.js può portare

L'archetipo porta bene **ordinamento**, **instradamento**, **irreversibilità**,
**accumulo** (con varianti). Male **contenimento** e **identità**.

Il criterio: il runner è un **flusso che non si può fermare** con decisioni di
smistamento ripetute. Porta tutto ciò che nella realtà è un flusso: dati che
arrivano, richieste, eventi, byte. Non porta ciò che è statico e va ispezionato.

| Livello / concetto | Va? | Come |
|---|---|---|
| L3 CommonJS: risoluzione dei moduli | ✅ ottimo | corri lungo l'albero delle cartelle: a ogni bivio scegli dove Node cercherebbe (`./`, `node_modules`, su di un livello). Sbagliare = `MODULE_NOT_FOUND`, muri contro un muro |
| L10 Stream: dati che scorrono | ✅ perfetto | *tu sei il dato*. Corri dentro la pipeline, ogni trasformazione è una corsia. La backpressure è la corsia che si restringe |
| L12 HTTP: routing delle richieste | ✅ | corri come richiesta dentro il server: a ogni bivio il middleware giusto |
| L6 Callback: l'ordine di esecuzione | ✅ | corri sul flusso sincrono e i callback sono deviazioni che ti riportano *dopo* |
| L14 Buffer: byte e encoding | ⚠️ | funziona ma è arido; meglio come variante del capitolo 4 (respiro) |
| L2 Runtime: cosa esiste dove | ❌ | è contenimento e ispezione: usa `11-slash` |
| L5 npm: albero dipendenze | ❌ | l'albero va costruito, non attraversato: usa `15-stacking` |
| L9 Event loop | ⚠️ | il loop *è* un ciclo, e il runner è lineare. Va solo se si accetta di correre in tondo, con le fasi come settori della pista — buono ma da progettare con cura |

Nota su L10: è l'abbinamento migliore di tutta la mappa. Uno stream *è*
letteralmente un flusso che non si può fermare, il giocatore *è* il chunk di
dati, e la backpressure — il concetto più difficile del livello — diventa
un'esperienza fisica: la strada si restringe, ti accumuli, e se non rallenti la
sorgente ti schiacci. Nessuna spiegazione può fare quello.

## 12.10 Esempio lavorato — Node L3, capitolo 2, "La discesa dei moduli"

```
GIOCO ........... La discesa dei moduli
LIVELLO ......... Node.js, L3 Moduli CommonJS, banda 1
CAPITOLO ........ 2 di 8 — come require trova un modulo

CONCETTO ........ Quando chiedi una cosa per nome, chi te la porta la cerca
                  sempre nello stesso ordine di posti. Se non è in nessuno,
                  si ferma tutto.
FORMA ........... ordinamento (l'ordine dei posti in cui si cerca)
VERBO ........... deviare (scegliere il bivio mentre corri)
ARCHETIPO ....... 12 endless runner — Temple Run

VINCI SE ........ arrivi in fondo alla discesa con il pacco che cercavi
PERDI SE ........ prendi il bivio dove il pacco non è: la galleria finisce
                  contro la roccia — non un punto perso, un muro
SBAGLI → ........ 1: sbandi, perdi mezzo secondo, la corsa continua
                  2: al bivio successivo dello stesso tipo, i tre imbocchi
                     si illuminano in sequenza nell'ordine di ricerca
                  3: dopo la morte, replay del bivio in slow motion con
                     l'imbocco giusto illuminato. Zero testo

BEAT 1 .......... due imbocchi, uno chiuso da assi: una sola scelta possibile
BEAT 2 .......... tre imbocchi. Il nome sul pacco inizia con ./ → è la cartella
                  di fianco. Sempre.
BEAT 3 .......... FRATTURA: il nome è nudo (express). L'istinto dice "cartella
                  di fianco", e lì non c'è: si sale, e si sale ancora, fino
                  al node_modules del piano sopra. Chi va di fianco muore
BEAT 4 .......... nomi misti, tre imbocchi, 1,0 s fra i bivi, ostacoli bassi
BEAT 5 .......... tutti i casi visti, 1,4 s: la discesa in cui non sbagli più

MONDO ........... miniera in discesa, gallerie di legno, lanterne. Gli imbocchi
                  hanno un cartello di legno inchiodato sopra: ./  ../
                  node_modules. Il pacco che cerchi è in mano al giocatore,
                  col nome scritto sopra a pennello
NUMERI .......... da 31: visibilità 2,6 s (camera arretra col crescere della
                  velocità), corsia 1,15 s → 0,8 s, buffer input 350 ms,
                  coyote 110 ms, hit-stop 90 ms, riavvio 700 ms a −3 s

TEST 1 .......... i tre imbocchi sono identici (stesso legno, stessa luce,
                  ordine casuale a ogni bivio); l'unico segnale è il cartello,
                  cioè la regola di risoluzione. Nessuna scorciatoia
TEST 2 .......... "Scelgo l'imbocco dove Node cercherebbe, prima di arrivarci"
TEST 3 .......... si corre già; un bivio arriva con un imbocco murato: si
                  devia dalla parte aperta senza pensarci
```

### Le 5 lezioni

| Beat | Nome sul pacco | Risposta corretta | Cosa insegna |
|---|---|---|---|
| 1 | `./attrezzi` | l'unico aperto | il gesto |
| 2 | `./attrezzi`, `./lampade` | `./` = cartella di fianco | il caso base |
| 3 | `express`, `lodash` | risalire fino a `node_modules` | **la frattura** |
| 4 | misti + `../comune` | `../` = un piano sopra | composizione |
| 5 | tutti | tutti | padronanza |

### Perché la frattura funziona

Il giocatore, dopo il beat 2, ha una regola: "il nome dice dove". La regola è
giusta ma incompleta, e il gioco l'ha rinforzata per novanta secondi.

Al beat 3 arriva `express`. Non c'è `./`. Le opzioni visibili sono le stesse tre
di prima. L'istinto è prendere la galleria di fianco, perché è quella che ha
sempre funzionato. Il giocatore ci va e trova la roccia.

Alla morte: replay in slow motion. Si vede la propria corsa entrare di fianco, e
poi si vede la telecamera **risalire** lungo il pozzo e mostrare `node_modules`
sul piano sopra. Nessuna parola. Il giocatore ripartendo sa una cosa nuova, e la
sa perché l'ha vista da dentro.

Questo è il beat 3 fatto bene: la convinzione era ragionevole, il gioco l'ha
coltivata, e il mondo l'ha smentita fisicamente.

### Cosa NON mettere

- contatore di distanza in alto (la profondità si legge dalla luce che cala);
- monete su corsie sbagliate;
- corsia giusta con un colore diverso, per nessun motivo;
- la corsa che si ferma per spiegare;
- il minatore grosso al centro dello schermo che copre i bivi.
