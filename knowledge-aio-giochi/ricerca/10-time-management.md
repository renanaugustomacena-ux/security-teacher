# 10 — Gestione del tempo (time management)

> Riferimento: Diner Dash (2004), Overcooked (2016), Papa's Pizzeria, Cooking
> Mama. Più cose da fare che tempo per farle. L'archetipo della simultaneità e
> delle risorse condivise.

---

## 10.1 Come funziona l'originale

Diner Dash: i clienti arrivano, si siedono, ordinano, mangiano, pagano. Ogni
passo richiede un'azione della cameriera, che può fare una cosa per volta e deve
camminare. La pazienza di ogni cliente scende; se arriva a zero, se ne va.

La struttura profonda:
1. **Più catene di compiti parallele**, ognuna con le sue fasi;
2. **un solo attore**, che è il collo di bottiglia;
3. **timer indipendenti** per ogni catena, che scorrono anche mentre non guardi;
4. **premio all'efficienza di percorso**: servire due tavoli vicini in un viaggio
   vale più che due viaggi.

Il punto 4 è la profondità: il gioco non chiede di essere veloci, chiede di
**ordinare bene le azioni**.

Numeri:
- pazienza del cliente: 25-45 s, con tre soglie visibili;
- durata di un'azione: 0,8-2 s;
- tempo di spostamento: 0,3 s per postazione — abbastanza da rendere il percorso
  una decisione;
- clienti simultanei: 2 → 8.

## 10.2 Perché funziona

**A. Il collo di bottiglia crea strategia.** Se potessi fare tutto insieme non
ci sarebbe gioco. Il vincolo "una cosa per volta" trasforma un elenco di compiti
in un problema di scheduling — che è esattamente il tipo di problema che sta al
centro di metà dell'informatica.

**B. I timer paralleli producono tensione senza velocità.** Non serve che le
azioni siano rapide: serve che siano tante e scadenzate. La tensione viene dalla
**contabilità mentale**, non dai riflessi. Questo lo rende adatto a contenuti
cognitivi.

**C. L'errore è graduale.** Un cliente impaziente non fa perdere subito: peggiora
la situazione. Il giocatore vede la sua situazione degradare e può recuperare.
Questa gradualità è ciò che rende il gioco leggibile come sistema.

**D. Ogni partita racconta una storia.** "Ce l'ho fatta per un pelo perché ho
lasciato il tavolo 3 in attesa" — le partite diventano aneddoti, e gli aneddoti
sono ciò di cui si parla.

## 10.3 Il core loop

> **Scelgo cosa fare adesso, sapendo che tutto il resto continua a scorrere.**

L'unica decisione è la **priorità**. Ed è il loop che più assomiglia al lavoro
vero di un programmatore.

## 10.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| agisci su una postazione | tocco sulla postazione | clic, o 1-6 | subito |
| trasporta | tocco su origine, poi destinazione | idem | beat 2 |
| annulla il trasporto | tocco a vuoto | esc | insieme al trasporto |
| accodare azioni | tocco su più postazioni in sequenza | idem | beat 4, quando i compiti sono troppi per gestirli a vista |

L'accodamento merita una nota: è un comando che **riduce** la difficoltà motoria
e **aumenta** quella strategica, che è la direzione giusta per noi. Va sbloccato
appena il gioco diventa denso, non tenuto come premio.

## 10.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Durata di un'azione | 0,8 - 2,0 s | sotto 0,8 s non si percepisce il lavoro |
| Tempo di spostamento | 0,3 s per postazione | serve perché il percorso sia una decisione |
| Pazienza di una catena | 30 s → 18 s | con **tre soglie visibili** (66%, 33%, 10%) |
| Catene simultanee | 2 → 6 | 7+ diventa caos |
| Postazioni | 3 → 6 | |
| Intervallo di arrivo | 8 s → 4 s | |
| Tolleranza sull'ordine | nessuna | se il concetto ha un ordine, l'ordine è vincolante |
| Durata di una mano | 45 - 70 s | più lunga degli altri archetipi: serve per far scorrere le catene |

### Le tre soglie della pazienza

Non un timer continuo: tre stati visibili e distinti. Un timer continuo obbliga a
misurare, tre stati permettono di *decidere a colpo d'occhio*. Le soglie vanno
rese con la postura e il comportamento dell'oggetto (`04` §4.6), non con una
barra: la cosa che aspetta prima è calma, poi si agita, poi comincia ad
andarsene.

## 10.6 Manopole della difficoltà

1. **Numero di catene simultanee** (la principale, sicura).
2. **Densità degli arrivi**.
3. **Lunghezza delle catene** (3 fasi → 5).
4. **Risorse condivise** (due catene hanno bisogno della stessa postazione: la
   manopola che introduce il conflitto — la più interessante per noi).
5. **Ordini vincolanti dentro la catena** (la manopola didattica quando il
   concetto è una sequenza).
6. **Pazienza ridotta** (attenzione: rende il gioco stressante prima che
   difficile).

La manopola 4 è quella da usare per i concetti di concorrenza: quando due catene
si contendono la stessa risorsa, il giocatore *vive* una race condition.

## 10.7 Juice specifico

- **Ogni azione ha un inizio, una durata e una fine visibili.** Nessuna azione
  istantanea: 0,8 s minimo con un'animazione che occupa quel tempo. È ciò che fa
  sentire il collo di bottiglia.
- **La coda delle azioni accodate va mostrata sull'attore**, non in un pannello:
  piccoli segni che seguono il personaggio.
- **Il completamento di una catena è la ricompensa grossa**: 200 ms di hit-stop
  leggero, un suono pieno, l'oggetto che esce di scena con un arco.
- **L'impazienza si sente nell'audio prima che nella grafica**: un ticchettio che
  entra alla seconda soglia, un rumore stridulo alla terza.
- **L'abbandono non è punito con un rumore brutto**: la cosa se ne va, e il posto
  resta vuoto — il vuoto è la punizione. Nessun buzzer (`02` §4.4).
- **La sala piena ha un suo suono.** L'ambienza cresce con il carico: il giocatore
  sente quando la situazione sta scappando, prima di vederlo.

## 10.8 Come si rovina

**1. Azioni istantanee.** Se toccare una postazione risolve subito, il collo di
bottiglia scompare e con esso il gioco.

**2. Nessun costo di spostamento.** Se l'attore è ovunque, non c'è
pianificazione del percorso.

**3. Timer con barre numeriche.** Sei barre che scendono = si guardano le barre,
non il mondo. Tre stati comportamentali, sempre.

**4. Troppe catene.** Sopra 6 il giocatore smette di pianificare e reagisce a
caso. Sembra difficile, in realtà è rotto.

**5. Catene identiche.** Se tutte le catene hanno le stesse fasi, la strategia si
riduce a "il più impaziente per primo" — che è una regola sola e si impara in
trenta secondi. Le catene devono differire **per struttura**, non per aspetto.

**6. Pazienza come unica pressione.** Se il solo modo di perdere è che qualcuno
se ne vada, il gioco diventa gestione dell'ansia. Serve una seconda posta in
gioco: qualcosa che si guadagna facendo le cose *bene*, non solo *in tempo*.

**7. Il concetto ridotto a etichetta sulla catena.** Se le catene sono
identiche e cambia solo il nome scritto sopra, non insegna nulla. **La struttura
della catena deve essere la struttura del concetto**: un'operazione asincrona ha
una fase in cui l'attore *non serve* (e quindi va lasciata da sola), una sincrona
tiene l'attore occupato per tutta la durata. Questa singola differenza di
struttura insegna l'asincronia meglio di qualsiasi definizione.

## 10.9 Quali concetti Node.js può portare

Porta bene **simultaneità**, **accumulo**, **ordinamento**, **dipendenza**
(come precondizione). Male **identità**, **trasformazione**.

Il criterio: il time management è **scheduling con un attore singolo**. È il
gemello del modello di esecuzione di Node — un solo thread, molte cose in corso.

| Livello / concetto | Va? | Come |
|---|---|---|
| L1 Fondamenta: cosa fa un server | ✅ | le richieste sono clienti, il server è l'attore, e la pazienza è il timeout |
| L6 Callback: sincrono blocca, asincrono no | ✅ perfetto | una catena sincrona ti tiene occupato tutto il tempo; una asincrona la avvii e ti liberi. Il giocatore *sente* la differenza sulla propria mano |
| L9 Event loop: un thread, tanti lavori | ✅ perfetto | l'attore unico *è* il thread. Se blocchi l'attore 4 secondi su una cosa, tutto il resto aspetta: è il blocking I/O, vissuto |
| L18 Concorrenza: risorse condivise | ✅ ottimo | due catene, una postazione: la race condition diventa un problema di cucina |
| L12 HTTP: timeout e carico | ✅ | |
| L10 Stream | ⚠️ | funziona come variante, ma il runner è meglio |
| L5 npm | ❌ | dipendenza strutturale: `15-stacking` |
| L15 Coercizione | ❌ | identità: `14-match-3` |

**Il caso L6 è quello che risolve il problema didattico più grosso di Node.**
"Sincrono vs asincrono" è la cosa che i principianti capiscono peggio, e la
ragione è che le spiegazioni sono temporali e astratte. Qui diventa fisica: la
catena sincrona ti inchioda alla postazione (non puoi fare altro, guardi gli
altri clienti innervosirsi), la catena asincrona la metti in moto e vai via.
Dopo cinque mani, un ragazzo di quattordici anni ha il modello corretto e non
l'ha letto da nessuna parte.

## 10.10 Esempio lavorato — Node L6, capitolo 3, "La cucina di notte"

```
GIOCO ........... La cucina di notte
LIVELLO ......... Node.js, L6 Callback, banda 1
CAPITOLO ........ 3 di 8 — sincrono blocca, asincrono libera

CONCETTO ........ Alcune cose devi starci davanti dall'inizio alla fine.
                  Altre le avvii e puoi andare a fare altro: ti chiamano
                  loro quando sono pronte.
FORMA ........... simultaneità
VERBO ........... scegliere cosa fare adesso (priorità)
ARCHETIPO ....... 10 time management — Diner Dash

VINCI SE ........ tutti gli ordini del turno escono
PERDI SE ........ tre ordini se ne vanno: il locale si svuota e il turno
                  finisce a metà. Non un punteggio: una sala vuota
SBAGLI → ........ 1: l'ordine si agita, ticchettio, il tempo continua
                  2: se resti inchiodato a una postazione mentre una catena
                     asincrona era già pronta, quella lampeggia una volta
                  3: dopo il turno perso, replay accelerato del turno con
                     le due linee del tempo affiancate: la tua e quella
                     in cui avevi lasciato lavorare il forno da solo

BEAT 1 .......... solo catene che si avviano e camminano da sole (il forno):
                  si impara che si può andare via. Impossibile perdere
BEAT 2 .......... entra la prima catena che ti tiene fermo (tagliare a mano)
BEAT 3 .......... FRATTURA: due ordini insieme, uno da forno e uno a mano.
                  L'istinto è fare prima quello arrivato prima. Se è quello
                  a mano, stai fermo 4 s e il forno resta spento: entrambi
                  in ritardo. Va avviato prima il forno, poi si taglia
BEAT 4 .......... cinque catene, tre postazioni, una condivisa
BEAT 5 .......... tutti i casi, arrivi ogni 6 s

MONDO ........... cucina di notte vista dall'alto, tre postazioni, un cuoco.
                  Nessuna barra: i clienti si agitano, il forno ha una luce
                  che cambia, il ticchettio cresce
NUMERI .......... da 31: azione 0,8-2,0 s, spostamento 0,3 s/postazione,
                  pazienza 30 s → 18 s a tre soglie, catene 2 → 5,
                  arrivi 8 s → 4 s, mano 45-70 s
TEST 1 .......... i piatti sono indistinguibili come aspetto; l'unico segnale
                  è **come si comporta la catena** — se la postazione ti
                  trattiene o no. Cioè il concetto. Non c'è colore, non c'è
                  etichetta che lo anticipi: si scopre avviandola, e dalla
                  seconda volta lo sai
TEST 2 .......... "Avvio quello che può lavorare da solo, e uso il mio tempo
                  su quello che non può"
TEST 3 .......... un cliente entra e si siede; la postazione più vicina
                  oscilla appena; il primo tocco è ovvio
```

### Le 5 lezioni

| Beat | Catene disponibili | Frattura |
|---|---|---|
| 1 | forno (asincrona) | — |
| 2 | forno + tagliere (sincrona) | — |
| 3 | forno + tagliere insieme | **"prima chi è arrivato prima"** |
| 4 | forno, tagliere, friggitrice condivisa | — |
| 5 | tutte | — |

### Il dettaglio strutturale che porta il concetto

Le due catene differiscono **nella struttura, non nell'aspetto**:

| | Catena asincrona (forno) | Catena sincrona (tagliere) |
|---|---|---|
| avvio | 0,8 s con il cuoco | 0,0 s |
| lavorazione | 6 s **senza** il cuoco | 4 s **con** il cuoco fermo lì |
| ritiro | 0,8 s con il cuoco | 0,0 s |
| costo totale del cuoco | 1,6 s | 4,0 s |
| durata totale | 7,6 s | 4,0 s |

Il gioco è tutto in questa tabella. La catena asincrona è **più lenta** in
assoluto (7,6 s contro 4) ma costa **meno del tuo tempo** (1,6 s contro 4). Un
principiante ottimizza la durata totale e sbaglia; chi ha capito ottimizza il
tempo dell'attore.

E questo, tradotto, è esattamente perché Node è veloce pur avendo un solo
thread — un concetto che di solito richiede tre paragrafi e un diagramma, e che
qui il giocatore ricava da sé, dalla propria mano, in due minuti.
