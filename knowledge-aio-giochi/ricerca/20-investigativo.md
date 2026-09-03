# 20 — Ricostruzione da tracce (investigativo)

> Nessun riferimento commerciale diretto. Parenti: Return of the Obra Dinn (2018),
> Her Story (2015), Papers Please (2013), i giochi di deduzione. L'archetipo di
> chi arriva **dopo** che è successo qualcosa.

---

## 20.1 Come funziona

Il giocatore non partecipa all'evento: lo ricostruisce. Ha a disposizione tracce
parziali, sparse, in disordine, alcune irrilevanti e alcune fuorvianti. Deve
arrivare a una ricostruzione **verificabile**: chi, cosa, in che ordine, perché.

La struttura in tre parti:

1. **il corpus** — l'insieme delle tracce, più grande di quanto serva;
2. **gli strumenti di interrogazione** — filtri, ricerche, incroci: il modo in cui
   si guarda il corpus;
3. **la tesi** — la ricostruzione che il giocatore dichiara, e che il gioco
   verifica.

La chiave di Obra Dinn: **non si verifica una risposta per volta.** Le tesi si
confermano in gruppi di tre, quindi indovinarne una non dà informazione. Questo
singolo dettaglio è ciò che impedisce di risolvere il gioco per forza bruta.

---

## 20.2 Perché funziona

**A. Il piacere è la comprensione, non l'abilità.** Non c'è niente da eseguire: il
momento di soddisfazione è quando due tracce che sembravano scollegate si
allineano. È il piacere più adulto che un gioco può dare, e il più adatto a
un contenuto tecnico.

**B. Il giocatore costruisce un modello, non una risposta.** Per rispondere a una
domanda deve tenere in testa una struttura — chi era dove, cosa è successo prima.
Quel modello è esattamente ciò che vogliamo insegnare.

**C. La verifica in gruppi elimina il tentativo.** Vedi §20.1. È la difesa
strutturale contro il brute force, e va replicata.

**D. Il corpus è più grande del necessario.** Quindi bisogna **scegliere dove
guardare**, che è l'abilità vera nel debug e nell'analisi dei log.

---

## 20.3 Il core loop

> **Interrogo le tracce per ricostruire cosa è successo, e dichiaro la tesi solo
> quando tre pezzi si tengono insieme.**

---

## 20.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| interrogare | campo di ricerca / filtri | idem, o sintassi reale | subito |
| collegare due tracce | trascina una sull'altra | idem | beat 2 |
| dichiarare una tesi | compilare una riga della ricostruzione | idem | beat 1 |
| confermare un gruppo | automatico a tre tesi complete | idem | — |

In banda 4 gli strumenti di interrogazione sono **comandi reali** (`grep`, `jq`,
filtri temporali), non un'interfaccia di ricerca. Il capitolo `22` governa la
resa.

---

## 20.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Dimensione del corpus | 4-8× l'informazione necessaria | il rumore è il gioco |
| Tracce fuorvianti | 15-20% del corpus | oltre, diventa sleale |
| Tesi da dichiarare | 9-12 per beat | multipli di 3 |
| Dimensione del gruppo di verifica | 3 | mai 1 |
| Tesi parzialmente corrette | non si segnalano | altrimenti si deduce per esclusione |
| Strumenti di interrogazione | 2 → 5 | uno per beat |
| Durata di un beat | 3-6 min | il più lungo di tutti gli archetipi |
| Suggerimento passivo | dopo 120 s senza interrogazioni utili | indica dove guardare, non cosa concludere |

### La regola del gruppo di tre

Quando il giocatore ha dichiarato tre tesi, il gioco dice **quante** sono
corrette, non **quali**. Se sono tre su tre, si bloccano e si passa. Se sono due su
tre, il giocatore sa che una è sbagliata ma non quale, e deve rimettersi a
ragionare.

Questo è ciò che rende il gioco impossibile per tentativi: con 12 tesi e verifica
individuale, la forza bruta funziona sempre; con la verifica a gruppi, no.

---

## 20.6 Manopole della difficoltà

1. **Rumore nel corpus** (la principale).
2. **Numero di tesi per gruppo** (3 sempre, ma quante tesi in tutto).
3. **Tracce contraddittorie** (due fonti che dicono cose diverse: una mente, e
   capire quale è il gioco).
4. **Informazione mancante** (una tesi si deduce solo per esclusione).
5. **Strumenti limitati** (non puoi usare la ricerca libera, solo i filtri).
6. **Catena causale profonda** (la causa è a quattro passi dall'effetto — la
   manopola didattica per il debug).

---

## 20.7 Juice specifico

Il juice di un archetipo riflessivo è **la conferma**, non l'impatto.

- **La traccia già letta cambia stato**: resta visibile ma smorzata. La mappa di
  cosa si è già guardato è metà del lavoro.
- **Il collegamento fra due tracce è fisico**: una linea che si tende, e resta.
- **La conferma di un gruppo è il momento grosso**: le tre righe si bloccano con
  un suono pieno, in sequenza a 120 ms di distanza. Tre suoni che salgono.
- **Il gruppo incompleto non fa un rumore brutto**: le righe si sbloccano e
  tornano modificabili, con un suono neutro. Non è un errore: è un'ipotesi
  scartata.
- **La ricostruzione è un oggetto che si riempie**: una tabella, uno schema, una
  timeline che si popola. Guardarla riempirsi è la ricompensa.
- **Nessun timer visibile**, mai.

---

## 20.8 Come si rovina

**1. Verifica una tesi per volta.** Distrugge tutto: il giocatore prova le
combinazioni. È l'errore che rende inutile il 90% dei giochi di deduzione.

**2. Corpus troppo piccolo.** Se tutte le tracce servono, non c'è selezione e non
c'è abilità.

**3. Tracce fuorvianti non spiegabili a posteriori.** Ogni traccia fuorviante deve
avere una ragione: qualcuno si è sbagliato, un orologio era desincronizzato, un
log era di un altro processo. Se è fuorviante per capriccio, il giocatore si sente
truffato.

**4. Nessuna struttura nella ricostruzione.** Se la tesi è testo libero, non è
verificabile. Serve una forma: chi / cosa / quando / perché, come campi.

**5. Suggerimenti che dicono la risposta.** In un gioco di deduzione, il
suggerimento deve indicare **dove guardare**, mai cosa concludere.

**6. Tempo limite.** Toglie la riflessione, che è l'archetipo.

**7. Il corpus non interrogabile.** Se le tracce si possono solo scorrere, il
gioco è pazienza e non metodo. Gli strumenti di interrogazione sono la parte
didattica: imparare a cercare *è* l'abilità.

---

## 20.9 Quali concetti Node.js può portare

Porta bene **ordinamento** (ricostruire una sequenza), **identità**,
**dipendenza** (catene causali). Male tutto ciò che è motorio o continuo.

| Livello / concetto | Va? | Come |
|---|---|---|
| L20 Log e osservabilità | ✅ perfetto | i log **sono** il corpus, `grep` e i filtri **sono** gli strumenti, e la ricostruzione dell'incidente è la tesi |
| L19 Prestazioni: trovare il collo di bottiglia | ✅ | il profilo è il corpus |
| L8 Errori: risalire alla causa | ✅ ottimo | lo stack trace è una traccia parziale: la causa è più in su, e va ricostruita |
| L22 Testing: capire cosa un test non copre | ⚠️ | funziona, ma `21-mutazione` è meglio |
| L18 Race condition | ✅ ottimo | il bug non si riproduce; c'è solo il log di quando è capitato, e va ricostruito l'intreccio |
| L11 Sicurezza: analisi post-incidente | ✅ | come è entrato, cosa ha toccato, cosa ha portato via |

**Il caso L20 è la ragione del capitolo, e L18 è il regalo.** Una race condition
è, per definizione, un bug che non si vede mentre succede: si vede solo la traccia
che lascia. Nessun archetipo interattivo può insegnarla, perché appena la si
osserva scompare. Un gioco investigativo sì: si ricostruisce da log parziali con i
timestamp che si sovrappongono, e il ragazzo capisce l'intreccio esattamente come
lo capirebbe in produzione.

---

## 20.10 Esempio lavorato — Node L20, capitolo 3, "Le tre del mattino"

```
GIOCO ........... Le tre del mattino
LIVELLO ......... Node.js, L20 Log e osservabilità, banda 4
CAPITOLO ........ 3 di 8 — la causa è prima dell'eccezione

CONCETTO ........ Quando è in produzione non puoi guardarci dentro: puoi solo
                  leggere quello che ha lasciato scritto. E il punto dove
                  si è rotto non è il punto dove è cominciato.
FORMA ........... ordinamento
VERBO ........... interrogare (grep, filtri, incroci)
ARCHETIPO ....... 20 investigativo + 22 terminale

OBIETTIVO ....... ricostruire l'incidente: cosa è cominciato per primo,
                  cosa ne è conseguito, quale richiesta ha innescato tutto.
                  9 tesi, verificate in 3 gruppi da 3
VINCOLO ......... il corpus è 6× l'informazione necessaria: 4 servizi,
                  40 minuti di log, timestamp non allineati fra i servizi
SBAGLI → ........ un gruppo incompleto dice quante tesi sono giuste, non
                  quali. Le righe si sbloccano e si ricomincia a ragionare
SUGGERIMENTO .... dopo 120 s senza interrogazioni utili: si evidenzia
                  **quale servizio** guardare, non cosa c'è scritto

BEAT 1 .......... un servizio, 5 minuti di log, 3 tesi: si impara a filtrare
BEAT 2 .......... due servizi, i timestamp vanno allineati
BEAT 3 .......... FRATTURA: l'eccezione è nel servizio A, ma la causa è una
                  risposta lenta del servizio C arrivata 90 secondi prima.
                  L'istinto è cercare nel servizio che si è rotto
BEAT 4 .......... quattro servizi, 40 minuti, 12 tesi, un log fuorviante
                  (un orologio desincronizzato di 4 secondi)
BEAT 5 .......... stesso impianto, corpus più piccolo: si vola

MONDO ........... nessuno. Terminale, quattro flussi di log, una timeline
                  a destra che si popola con la ricostruzione
NUMERI .......... da 31 e 20.5: corpus 6×, fuorvianti 18%, tesi 9-12,
                  gruppi da 3, strumenti 2→5, beat 3-6 min,
                  suggerimento 120 s
TEST 1 .......... non c'è modo di rispondere senza ricostruire la sequenza:
                  le tesi si verificano a gruppi di tre, quindi indovinare
                  non dà informazione, e il corpus cambia fra le partite
TEST 2 .......... "Filtro i log per ricostruire l'ordine dei fatti, e dichiaro
                  la tesi quando tre pezzi si tengono"
TEST 3 .......... il prompt è già lì, con un `grep` di esempio nell'output
                  precedente e la prima riga di log che scorre
```

### La frattura, in dettaglio

La convinzione da smontare è la più costosa dell'osservabilità: *l'errore è dove
l'eccezione è comparsa.*

Il gioco la coltiva nei beat 1 e 2, dove effettivamente la causa e l'eccezione
stanno nello stesso servizio. Poi al beat 3 il ragazzo trova un `TimeoutError` nel
servizio A, lo indaga a fondo, e non trova niente che spieghi perché. Tutto nel
servizio A è normale.

La causa è nel servizio C: novanta secondi prima ha cominciato a rispondere in 8
secondi invece di 40 millisecondi. Nessun errore, nessuna eccezione — solo
latenza. Il servizio A ha fatto una coda, la coda si è riempita, e a un certo
punto ha cominciato a scadere.

Per arrivarci il ragazzo deve fare una cosa che non ha ancora fatto: **cercare
dove non c'è un errore**. Cercare la normalità anomala. È il salto che separa chi
legge i log da chi sa leggerli, e non si può insegnare a parole — perché a parole
la si capisce e poi alle tre del mattino non ci si pensa comunque.
