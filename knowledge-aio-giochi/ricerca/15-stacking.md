# 15 — Impilamento (stacking)

> Riferimento: Tetris (1984), Stack, Tower Bloxx, 2048 (parente stretto).
> Costruire dal basso, con lo spazio come risorsa. L'unico archetipo dove la
> dipendenza è una struttura fisica visibile.

---

## 15.1 Come funziona l'originale

Pezzi che scendono, uno per volta, in un pozzo di larghezza fissa. Si può
traslare e ruotare. Il pezzo si posa dove trova appoggio; una riga completa
scompare e tutto sopra scende. Il gioco finisce quando il pozzo si riempie fino
in cima.

Elementi strutturali di Tetris che hanno resistito quarant'anni:
- **anteprima del pezzo successivo** (1 o 3): permette di pianificare, che è
  tutto;
- **lock delay** ~500 ms: quando il pezzo tocca, hai mezzo secondo per muoverlo
  ancora. Senza, il gioco è ingiocabile ad alta velocità;
- **7-bag randomizer**: i sette pezzi escono in ordine casuale ma tutti e sette
  prima di ripetere. Elimina le sequenze crudeli senza rendere il gioco
  prevedibile;
- **hold**: mettere via un pezzo per dopo;
- la velocità cresce, il pozzo no.

Numeri:
- caduta: da 1 cella/s a ~20 celle/s ai livelli alti;
- lock delay: 500 ms, con reset limitato (max 15 movimenti);
- sparizione di una riga: 300-400 ms, con lampo;
- ripetizione automatica del movimento laterale: 170 ms di attesa, poi 40
  ms/cella.

## 15.2 Perché funziona

**A. Lo spazio è la risorsa, e non si rigenera da sé.** Ogni pezzo posato male
resta lì come debito. Questa è la proprietà unica dell'archetipo: la conseguenza
di una decisione sbagliata **rimane visibile per tutta la partita**. Nessun altro
archetipo ha questa memoria.

**B. Il pianificatore e l'esecutore sono la stessa persona.** L'anteprima
permette di pensare due mosse avanti; la caduta obbliga a decidere adesso. La
tensione fra i due è il gioco.

**C. La ricompensa è la pulizia.** Cancellare una riga è una sensazione di
ordine, non di violenza. È l'unico archetipo il cui piacere è
**l'organizzazione**.

**D. La sconfitta è annunciata.** Il pozzo si riempie da minuti: si vede
arrivare. Il giocatore sa di stare perdendo e sa perché, il che rende la
sconfitta educativa invece che sorprendente.

La proprietà A e la D sono ciò che rende questo archetipo il migliore per
insegnare le **dipendenze**: una dipendenza sbagliata non si manifesta subito,
si manifesta come un problema che si accumula. Esattamente come nella realtà.

## 15.3 Il core loop

> **Posiziono ogni pezzo dove il suo appoggio esiste già, prima che lo spazio
> finisca.**

## 15.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| trasla | trascina orizzontalmente, o tocca la colonna | ← → | subito |
| posa subito | swipe ↓ | spazio | beat 1 (è impazienza, non strategia) |
| ruota | tocco sul pezzo | ↑ o Z | beat 2, al primo pezzo che non entra |
| metti via | swipe ↑ | C o shift | beat 4, quando arriva il pezzo che serve dopo |

Regola `04`: la rotazione si sblocca quando arriva il primo pezzo che non entra
senza ruotare. Il "metti via" quando arriva un pezzo la cui dipendenza non è
ancora posata — cioè quando il *concetto* crea il bisogno.

Su touch, il tocco sulla colonna di destinazione è più importante del
trascinamento: su schermo verticale il trascinamento preciso è scomodo. Va
implementato: tocco su una colonna → il pezzo ci va con easing in 160 ms.

## 15.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Larghezza pozzo | 6-8 colonne | Tetris ne ha 10; noi meno, perché i pezzi portano testo |
| Altezza pozzo | 12-14 righe | |
| Anteprima | 2 pezzi | 1 è troppo poco per pianificare le dipendenze, 3 è troppa informazione |
| Velocità di caduta | 1 cella / 1,1 s → 1 cella / 0,35 s | |
| Lock delay | 500 ms | non negoziabile |
| Reset del lock delay | max 8 movimenti | evita lo stallo infinito |
| Sparizione riga | 340 ms | |
| Randomizzatore | a sacchetto | mai casuale puro |
| Dimensione minima cella | 44 px | vincolo touch |

## 15.6 Manopole della difficoltà

1. **Velocità di caduta** (sicura, la classica).
2. **Larghezza del pozzo** (7 → 6: molto più difficile di quanto sembri).
3. **Vincoli di dipendenza** (la manopola didattica: quanti pezzi richiedono che
   un altro pezzo specifico sia già sotto di loro).
4. **Anteprima ridotta** (2 → 1: da usare con parsimonia, punisce la
   pianificazione che stiamo cercando di insegnare).
5. **Pezzi che non si possono ruotare** (alcune dipendenze hanno un solo verso).
6. **Righe che non si cancellano** (se un pezzo è "installato male" resta:
   potente, e da usare solo nel beat 6+).

## 15.7 Juice specifico

- **Il pezzo che si posa ha peso**: un piccolo schiacciamento verticale (scala
  1,0/0,94) e la pila sotto vibra di 2 px. Senza, i pezzi sembrano adesivi.
- **La riga che si cancella lampeggia**: bianco pieno per 60 ms, poi si
  comprime lateralmente in 280 ms.
- **La caduta della pila ha rimbalzo**: 50 ms su 5 px.
- **L'ombra di destinazione è obbligatoria**: la sagoma del pezzo proiettata in
  basso, dove finirà. Su touch, senza ombra il gioco è indovinare.
- **Il lock delay va sentito**: negli ultimi 200 ms il contorno del pezzo pulsa.
  Comunica "puoi ancora muoverlo".
- **Il pozzo che si riempie cambia l'atmosfera**: sopra il 70% l'audio si
  restringe e la luce cala. La sconfitta va vista arrivare (proprietà D).
- **Il pezzo posato correttamente su una dipendenza fa un rumore diverso**: un
  incastro, non un tonfo. È il feedback che porta il concetto.

## 15.8 Come si rovina

**1. Nessuna ombra di destinazione.** Errore fatale su touch.

**2. Nessun lock delay.** Il gioco diventa una lotteria oltre le velocità medie.

**3. Casualità pura invece del sacchetto.** Sequenze impossibili → il giocatore
si sente derubato.

**4. Il pezzo che porta il concetto solo come etichetta.** Se il pezzo è un
tetramino con scritto sopra `express`, il testo è decorazione: la forma non ha
niente a che fare con il concetto. **La forma del pezzo deve essere il concetto**:
un pacchetto con due dipendenze ha due incastri sotto, e quegli incastri devono
combaciare con ciò che sta sotto. Così posarlo male è fisicamente visibile.

**5. Pozzo troppo largo con pezzi che portano testo.** Con 10 colonne e testo sui
pezzi, su telefono non si legge niente. 6-8 colonne.

**6. Cancellare le righe come unico obiettivo.** Se il gioco premia solo la
riga completa, il giocatore ignora le dipendenze e riempie. L'obiettivo deve
essere **la struttura**, non la pulizia: "questo pacchetto funziona quando tutte
le sue dipendenze sono sotto di lui e integre".

## 15.9 Quali concetti Node.js può portare

Porta bene **dipendenza**, **accumulo**, **contenimento** (come annidamento).
Male **instradamento**, **simultaneità**.

Il criterio: lo stacking ha **gravità e appoggio**. Porta ogni concetto in cui
qualcosa non può esistere senza qualcos'altro sotto.

| Livello / concetto | Va? | Come |
|---|---|---|
| L5 npm: albero delle dipendenze | ✅ perfetto | ogni pacchetto ha incastri sotto = le sue dipendenze. Non puoi posarlo se non c'è ciò che gli serve. `npm install` diventa fisico |
| L4 ESM: ordine di valutazione dei moduli | ✅ | un modulo si valuta solo dopo i suoi import: si posa solo se gli import sono sotto |
| L16 Call stack | ✅ ottimo | ogni chiamata si impila sopra la precedente; il ritorno la toglie. Lo stack overflow è il pozzo che si riempie — e la sconfitta annunciata (proprietà D) *è* il concetto |
| L14 Buffer: allocazione | ✅ | i byte occupano spazio contiguo; la frammentazione diventa visibile |
| L17 Docker: layer dell'immagine | ✅ ottimo | ogni layer sta sopra il precedente e non può vedere sopra di sé |
| L7 Promise: ordine di risoluzione | ❌ | tempo: `16-lane-sorting` |
| L10 Stream | ❌ | flusso: `12-runner` |
| L2 Runtime | ❌ | contenimento per ispezione: `11-slash` |

**Il caso L16 (call stack) è il più elegante di tutta la mappa.** Il call stack
*è* una pila; il gioco *è* una pila; lo stack overflow *è* il pozzo pieno; il
ritorno di una funzione *è* la riga che si toglie. Non c'è nessuna analogia, c'è
identità strutturale. Un gioco così non insegna il call stack: lo *mostra*, e il
giocatore che ci gioca dieci minuti ha il modello mentale corretto senza aver
letto una parola.

## 15.10 Esempio lavorato — Node L5, capitolo 3, "La torre dei pacchetti"

```
GIOCO ........... La torre dei pacchetti
LIVELLO ......... Node.js, L5 npm, banda 1
CAPITOLO ........ 3 di 8 — dipendenze, dipendenze delle dipendenze, l'albero

CONCETTO ........ Una cosa che ne usa un'altra non sta in piedi se quella
                  sotto non c'è. E quella sotto, a sua volta, ne usa altre.
FORMA ........... dipendenza
VERBO ........... posare (impilare con incastro)
ARCHETIPO ....... 15 stacking — Tetris

VINCI SE ........ il pacchetto in cima si accende: tutte le sue dipendenze,
                  e le loro, sono sotto e integre
PERDI SE ........ posi un pacchetto senza il suo appoggio: sfonda la pila e
                  quello che c'era sotto si spacca. Non un punto: un crollo
SBAGLI → ........ 1: il pezzo non si aggancia e resta appeso a mezz'aria,
                  cigolando; si può ancora spostare (lock delay 500 ms)
                  2: gli incastri richiesti si illuminano sulla pila sotto
                  3: coaching con la torre disegnata e il pezzo che manca

BEAT 1 .......... pacchetti senza dipendenze (un solo incastro piatto sotto):
                  si impara a posare. Impossibile crollare
BEAT 2 .......... entra il primo pacchetto con una dipendenza (un incastro
                  sagomato): va sopra quella giusta
BEAT 3 .......... FRATTURA: un pacchetto la cui dipendenza ha *a sua volta*
                  una dipendenza. L'istinto è posare il pacchetto sopra la
                  sua dipendenza diretta e basta. Ma quella è appoggiata
                  sul vuoto, e tutto scende. Serve costruire dal fondo
BEAT 4 .......... tre livelli di profondità, pozzo a 6 colonne, caduta 0,5 s
BEAT 5 .......... tutti i casi, caduta 0,9 s, anteprima 2

MONDO ........... cantiere notturno, casse di legno con l'etichetta stampigliata
                  e incastri a coda di rondine visibili sul fondo di ogni cassa
NUMERI .......... da 31: pozzo 7×13 (→6 al beat 4), anteprima 2, caduta
                  1,1 s → 0,35 s, lock delay 500 ms, cella 48 px
TEST 1 .......... tutte le casse sono dello stesso legno, stessa dimensione;
                  gli **incastri sotto** sono l'unico segnale, e sono la
                  forma delle dipendenze. Non c'è colore, non c'è posizione,
                  e la sagoma non anticipa niente che non sia il concetto
TEST 2 .......... "Poso ogni cassa sopra le sue dipendenze, prima che
                  il cantiere si riempia"
TEST 3 .......... una cassa scende, sotto c'è un solo posto piatto libero,
                  e l'ombra di destinazione è già lì: il primo tocco è ovvio
```

### Le 5 lezioni

| Beat | Struttura richiesta | Frattura |
|---|---|---|
| 1 | pacchetti foglia (nessuna dipendenza) | — |
| 2 | 1 livello: `A → b` | — |
| 3 | 2 livelli: `A → b → c` | **"basta la dipendenza diretta"** |
| 4 | 3 livelli + dipendenze condivise | — |
| 5 | tutti i casi visti | — |

### Il dettaglio che fa funzionare tutto: gli incastri

La cosa da non sbagliare è che le dipendenze siano **geometria**, non etichette.

Ogni cassa ha, sul fondo, da zero a tre incastri a coda di rondine. Ogni incastro
ha una sagoma diversa, e la sagoma corrisponde a un pacchetto specifico. Sul
*coperchio* di ogni cassa c'è la sagoma complementare, quella che accetta chi si
appoggia a lei.

Conseguenze:
- posare una cassa dove gli incastri non combaciano è **visibilmente** sbagliato
  prima ancora di lasciarla andare (l'ombra di destinazione mostra il disallineo);
- una cassa con tre incastri richiede tre casse sotto, adiacenti: il giocatore
  deve *pianificare la larghezza*, che è esattamente il problema di un albero di
  dipendenze;
- una dipendenza condivisa da due pacchetti va posata una volta e usata da
  entrambi — e questo, in tre secondi di gioco, insegna cos'è il *deduping* di
  npm meglio di un capitolo di documentazione.

Il testo sulle casse resta (i nomi veri dei pacchetti), ma è un'etichetta
diegetica (`04` §4.6): serve a dare i nomi, non a decidere le mosse. Le mosse le
decide la geometria.
