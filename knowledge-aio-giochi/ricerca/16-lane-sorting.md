# 16 — Smistamento a corsie (lane sorting)

> Nessun riferimento commerciale diretto: è nato dal Semaforo, l'unico dei sette
> giochi vecchi che funzionava. Parenti: Mini Metro, Overcooked (le stazioni),
> i giochi di scambi ferroviari. L'archetipo dell'ordinamento e della precedenza.

---

## 16.1 Come funziona

Cose arrivano da una sorgente. Esistono due o più destinazioni. Il giocatore apre
e chiude passaggi — leve, scambi, semafori, sportelli — per instradare ogni cosa
dove va. Le cose non si fermano: se non c'è una destinazione aperta, si
accumulano davanti al passaggio chiuso, e la coda cresce.

Le tre parti costitutive:

1. **La sorgente** produce a ritmo, e il ritmo non si controlla.
2. **Il passaggio** è controllato dal giocatore ed è la sola cosa che controlla.
3. **La coda** è la memoria fisica degli errori: cresce, occupa spazio, e a un
   certo punto intasa tutto.

## 16.2 Perché funziona (e perché il Semaforo era l'unico buono)

**A. La coda rende visibile il tempo.** In tutti gli altri archetipi il passato
scompare. Qui il passato è una fila di oggetti che stanno lì. Questo è ciò che
permette di insegnare l'**ordine** e la **precedenza**: si vede chi è arrivato
prima, e si vede cosa succede quando qualcuno passa avanti.

**B. Il giocatore controlla poco, e questo è il punto.** Non controlla il ritmo
della sorgente né la velocità: solo l'instradamento. Una classe di decisione
sola, ripetuta molte volte — la struttura che produce apprendimento veloce
(`04` §4.3 D).

**C. Il fallimento è un ingorgo, non una sconfitta.** La coda che si intasa è la
conseguenza fisica di aver smistato male. Non c'è nessun contatore: c'è un
casino che hai fatto tu, e lo vedi.

**D. Scala benissimo.** Da una sorgente e due corsie (banalissimo) a tre sorgenti
con priorità e corsie che si aprono a condizione. La stessa meccanica copre tutta
la banda 1 e tutta la banda 4.

**Perché il Semaforo funzionava**, nei termini della ricerca: aveva una frattura
(`03` §3.3) — la richiesta che arriva dopo ma deve passare prima — e la
conseguenza dell'errore era l'ingorgo, non un punteggio. Erano le due cose che
mancavano agli altri sei.

## 16.3 Il core loop

> **Apro il passaggio giusto per ogni cosa che arriva, prima che la coda si
> intasi.**

## 16.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| aprire/chiudere un passaggio | tocco sulla leva | 1/2/3 o clic | subito |
| deviare una cosa singola | trascina la cosa nella corsia | trascina | alternativa al primo, mai in aggiunta |
| tenere in attesa | tocco sul binario di sosta | 4 o clic | beat 3, quando arriva la prima cosa che non può passare adesso |
| far passare avanti | trascina in testa alla coda | idem | beat 4, solo per i concetti di precedenza |

Attenzione: i primi due comandi sono **alternativi**, non complementari. Vanno
scelti in base al concetto:
- **leve** (controllo lo stato del mondo) per i concetti di stato e di
  configurazione;
- **trascinare la cosa** (controllo l'oggetto) per i concetti di ordine e
  precedenza.

Usarli insieme raddoppia il carico motorio senza aggiungere niente al concetto.

## 16.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Corsie | 2 → 4 | 5 solo se il concetto ha 5 categorie |
| Intervallo di arrivo | 2,8 s → 1,4 s | |
| Tempo di transito (sorgente → passaggio) | 2,4 s | **è la finestra di decisione**: mai sotto 1,8 s con lettura |
| Capacità della coda | 5 oggetti | a 5 si intasa; a 4 il gioco deve già essere visibilmente teso |
| Tempo di apertura di un passaggio | 220 ms con easing | il ritardo va sentito: è ciò che rende la decisione anticipata necessaria |
| Smaltimento corretto | 400 ms di animazione | |
| Hit-stop sull'ingorgo | 140 ms | |
| Riavvio | 800 ms | |

### Il tempo di transito è il cuore

Il tempo fra la comparsa di un oggetto e il momento in cui deve essere instradato
è la finestra di decisione. È la costante che governa tutto: 2,4 s dà tempo di
leggere una parola sull'oggetto, valutarla e agire. Sotto 1,8 s il giocatore
smette di leggere.

Corollario importante: per aumentare la difficoltà **non si accorcia il
transito** — si aumenta il *numero* di oggetti in transito insieme. Così il tempo
per ciascuno resta leggibile ma la gestione diventa più densa. Questa è la
differenza fra un gioco difficile e un gioco che va troppo veloce per pensare.

## 16.6 Manopole della difficoltà

1. **Densità degli arrivi** (sicura, la principale).
2. **Numero di corsie** (2 → 4).
3. **Difficoltà concettuale dello smistamento** (la manopola didattica).
4. **Precedenze** (una cosa che arriva dopo deve passare prima: la manopola che
   introduce l'ordinamento).
5. **Corsie condizionate** (una corsia si apre solo se un'altra è chiusa).
6. **Due sorgenti** (attenzione: raddoppia il carico visivo, non concettuale).
7. Accorciare il transito (**da evitare**, vedi §16.5).

## 16.7 Juice specifico

- **La leva ha corsa e peso**: 220 ms, easing con un piccolo overshoot, un
  clack. Deve sembrare meccanica; è la cosa che il giocatore tocca cento volte.
- **La coda è fisica**: gli oggetti in attesa si spingono, si accatastano un po'
  storti, il quinto sporge. La coda deve **sembrare** un problema.
- **Il transito corretto è liscio, l'errato è un inciampo**: lo smistamento
  giusto scorre; quello sbagliato produce un urto, un sobbalzo di 4 px e un
  rumore secco.
- **L'ingorgo è progressivo**: a 3 in coda la luce cambia leggermente, a 4 un
  ronzio entra nel mix, a 5 si blocca tutto. Il fallimento va visto arrivare.
- **Anticipazione all'arrivo**: 400 ms prima che un oggetto entri, si sente da
  dove arriverà (un rumore dalla sorgente giusta).
- **Il passaggio giusto lascia un solco**: la corsia usata correttamente resta
  leggermente illuminata per 600 ms. Traccia della propria buona decisione.
- **Nessun contatore, nessuna barra.** La coda è il contatore.

## 16.8 Come si rovina

**1. Corsie colorate o etichettate con colore.** Il solito errore capitale: se la
corsia giusta è riconoscibile dal colore dell'oggetto, il concetto non serve.

**2. Accorciare il transito per fare difficoltà.** Vedi §16.5. Produce un gioco
di riflessi.

**3. Coda infinita.** Se la coda non intasa mai, non c'è conseguenza e non c'è
gioco: è un esercizio di smistamento senza posta in gioco.

**4. Coda troppo corta.** Con capacità 2, un errore uccide subito e il giocatore
gioca con prudenza. 5 è il numero giusto: sbagliare una volta è recuperabile,
sbagliare tre no.

**5. Troppi comandi.** Leve *e* trascinamento *e* attesa *e* precedenza tutto
insieme = gioco di gestione motoria. Uno o due, mai quattro.

**6. La corsia giusta sempre nella stessa posizione.** L'ordine delle corsie va
rimescolato fra le mani, altrimenti il giocatore impara "quella in mezzo".

**7. Nessuna conseguenza per il transito sbagliato oltre al punteggio.** Se
mandare una cosa nella corsia sbagliata produce solo "−1", non insegna. Deve
produrre **ciò che produrrebbe nel concetto**: se hai eseguito una cosa fuori
ordine, il risultato dopo è sbagliato e si vede.

## 16.9 Quali concetti Node.js può portare

Porta bene **ordinamento**, **precedenza**, **instradamento**, **accumulo**,
**simultaneità**. Male **identità** e **trasformazione**.

È l'archetipo più versatile della raccolta: copre da solo circa un terzo del
programma di Node. Il criterio: porta tutto ciò che nella realtà è **una coda con
delle regole**.

| Livello / concetto | Va? | Come |
|---|---|---|
| L7 Promise: ordine di risoluzione | ✅ perfetto | ogni promessa parte, torna quando torna, e va smistata all'arrivo: chi ha ordinato per partenza sbaglia |
| L9 Event loop: precedenza fra code | ✅ perfetto | le corsie sono le code (microtask, timers, I/O, check); `nextTick` passa avanti a tutti e il giocatore deve lasciarlo passare |
| L12 HTTP: middleware e routing | ✅ ottimo | ogni richiesta attraversa gli scambi in ordine; l'ordine dei middleware *è* l'ordine delle leve |
| L13 EventEmitter: listener multipli | ✅ | un evento, più corsie che si aprono insieme |
| L10 Stream: backpressure | ✅ ottimo | la coda che si riempie **è** la backpressure. La corsia si restringe e va rallentata la sorgente |
| L18 Cluster: bilanciamento | ✅ | più corsie identiche, la scelta è la meno carica |
| L6 Callback: ordine di esecuzione | ✅ | il callback rientra in coda, non subito: la coda lo dimostra |
| L5 npm: albero dipendenze | ❌ | dipendenza: `15-stacking` |
| L2 Runtime | ❌ | contenimento: `11-slash` |
| L15 Coercizione | ❌ | identità: `14-match-3` |

## 16.10 Esempio lavorato — Node L9, capitolo 6, "La sala di smistamento"

Il livello 9 è l'event loop: il concetto più difficile del programma e quello che
tutti spiegano con un diagramma che nessuno capisce.

```
GIOCO ........... La sala di smistamento
LIVELLO ......... Node.js, L9 Event loop, banda 2
CAPITOLO ........ 6 di 8 — nextTick e microtask passano avanti alle altre code

CONCETTO ........ Alcune cose in attesa hanno il diritto di passare davanti a
                  tutte le altre, anche a chi era in fila da prima. E questo
                  diritto vale ogni volta che si finisce una cosa.
FORMA ........... precedenza
VERBO ........... dare la corsia (aprire lo scambio giusto al momento giusto)
ARCHETIPO ....... 16 lane sorting — dal Semaforo

VINCI SE ........ il turno finisce con tutte le code sotto la soglia
PERDI SE ........ una coda arriva a cinque: la sala si blocca, e resta bloccata
                  finché non riparti. È l'ingorgo, non un punteggio
SBAGLI → ........ 1: la cosa smistata male inciampa, urto secco, la coda
                  cresce di uno
                  2: alla successiva dello stesso tipo, lo scambio corretto
                  scatta da solo per 300 ms e torna: hai visto dove andava
                  3: dopo l'ingorgo, replay della sala con le quattro code
                     e l'ordine corretto che si svolge in slow motion

BEAT 1 .......... due code (subito / dopo), una cosa per volta
BEAT 2 .......... tre code: subito / timer / attesa-di-fuori
BEAT 3 .......... FRATTURA: arriva un nextTick mentre la coda dei timer
                  è già piena e in attesa da prima. L'istinto è "prima chi
                  aspetta da più tempo". Sbagliato: nextTick passa avanti,
                  sempre. Chi rispetta la fila intasa i timer
BEAT 4 .......... quattro code, arrivi ogni 1,4 s, due precedenze insieme
BEAT 5 .......... tutti i casi, arrivi ogni 2,0 s

MONDO ........... sala di smistamento postale di banda 2: nastri di metallo,
                  scambi a leva con targhette di ottone incise coi nomi veri
                  (nextTick, microtask, timers, poll), quadranti a lancetta
                  invece di barre
NUMERI .......... da 31: transito 2,4 s (mai sotto 1,8: si legge la targhetta),
                  arrivi 2,8 s → 1,4 s, coda max 5, leva 220 ms, ingorgo
                  hit-stop 140 ms, riavvio 800 ms
TEST 1 .......... i pacchi sono identici (stessa carta, stesso spago); l'unico
                  segnale è il timbro che dice di che tipo di attesa si tratta.
                  Le quattro corsie sono identiche e il loro ordine cambia
                  a ogni mano. Nessuna scorciatoia possibile
TEST 2 .......... "Do la corsia a chi ha la precedenza, prima che le code
                  si intasino"
TEST 3 .......... un pacco scende sul nastro verso uno scambio che oscilla
                  appena: la mano va lì da sola
```

### Le 5 lezioni

| Beat | Code attive | Cosa arriva | Frattura |
|---|---|---|---|
| 1 | subito, dopo | sincrono, timer | — |
| 2 | + attesa esterna | + I/O | — |
| 3 | + **nextTick** | nextTick con timers pieni | **"prima chi aspetta da più tempo"** |
| 4 | tutte e 4 | tutto, due precedenze | — |
| 5 | tutte e 4 | tutto, più lento | — |

### Perché questo gioco insegna l'event loop meglio di un diagramma

Il diagramma dell'event loop è statico: mostra le fasi come cerchi con delle
frecce. Il problema è che il concetto **non è la topologia, è la politica**: cosa
passa prima di cosa, e quando. Una politica è una regola nel tempo, e il tempo in
un diagramma non c'è.

Nella sala di smistamento il tempo è l'unica cosa che c'è: i pacchi arrivano, le
code crescono, e la decisione di dare la corsia a `nextTick` invece che al timer
che aspetta da otto secondi **si paga o si guadagna nei tre secondi successivi**.
Il giocatore non impara "l'ordine delle fasi": impara che c'è una gerarchia di
diritti, e la impara perché l'ha subita.

E c'è una cosa in più che il diagramma non può fare: l'errore tipico dei
programmatori con l'event loop non è sbagliare l'ordine delle fasi, è **assumere
la giustizia** — credere che la coda sia una coda, cioè FIFO. Il beat 3 attacca
esattamente quella convinzione, in un contesto (la posta) dove la giustizia della
fila è l'aspettativa più naturale del mondo. È per questo che la frattura
funziona: l'ambientazione rinforza la convinzione sbagliata, e poi il sistema la
smentisce.
