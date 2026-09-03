# 00 — Come si usa questa ricerca

> Questo capitolo è il **processo**. Non parla di pedagogia né di game design:
> parla di in che ordine si prendono le decisioni, cosa si scrive prima di
> toccare il codice, e come si riconosce una specifica pronta da una specifica
> che produrrà un altro gioco mediocre.

---

## 0.1 Perché serve un processo e non solo delle buone idee

I sette giochi della prima banda sono stati costruiti senza processo. Il
risultato è documentato nel capitolo `30`: uno passa i tre test (Semaforo), due
li passano a metà (Chiosco, Fattorino), quattro sono quiz travestiti.

Il difetto non era la mancanza di idee. Le idee c'erano — un magazzino, delle
etichette, una cassetta degli attrezzi. Il difetto era l'**ordine**: ho scelto
prima l'ambientazione, poi ho cercato una meccanica che ci stesse dentro, e
infine ho appiccicato il concetto Node.js alla meccanica. Con quell'ordine il
concetto arriva sempre per ultimo, e quando arriva per ultimo l'unico posto
libero dove metterlo è **il testo**. Da lì i box da leggere.

L'ordine giusto è esattamente rovesciato: prima il concetto, poi la struttura
del concetto, poi il verbo che riproduce quella struttura, e l'ambientazione
per ultima — perché l'ambientazione è l'unica cosa che si può cambiare senza
rompere niente.

Questo capitolo fissa quell'ordine e lo rende obbligatorio.

---

## 0.2 L'ordine delle decisioni

Nove passi. Non sono negoziabili nell'ordine, solo nel contenuto. Ogni passo
produce una riga della scheda di progetto (§0.3).

### Passo 1 — Il concetto, in una frase, senza gergo

Si scrive cosa deve capire il ragazzo, in italiano corrente, come se lo
spiegassi a tua sorella. Vietate le parole del dominio.

| No | Sì |
|---|---|
| "L'event loop processa la microtask queue prima della macrotask queue" | "Alcune cose in attesa hanno il diritto di passare avanti a tutte le altre" |
| "`require` è sincrono e cachato" | "La prima volta lo vai a prendere, dalla seconda te lo ricordi" |
| "Le Promise si risolvono o si rigettano una volta sola" | "Una volta che hai detto sì o no, non puoi più cambiare idea" |

Se non riesci a scrivere questa frase senza gergo, **non hai capito il concetto
abbastanza bene per farne un gioco**. Torna a studiarlo. Questo è il filtro che
ha bloccato meno cose e che ne avrebbe bloccate di più: metà dei box di testo
dei giochi vecchi esistono perché il concetto non era chiaro nella mia testa, e
il testo era il modo di scaricare quella confusione sul giocatore.

### Passo 2 — La struttura del concetto

Ogni concetto informatico ha una **forma**. La forma è ciò che si può giocare;
la definizione no. Le forme ricorrenti:

| Forma | Riconoscibile da | Concetti Node che la hanno |
|---|---|---|
| **Ordinamento** | c'è un prima e un dopo, e sbagliare l'ordine rompe | event loop, fasi, `await`, stream |
| **Precedenza** | due cose in attesa, una passa avanti | microtask/macrotask, `process.nextTick` |
| **Contenim** | qualcosa sta dentro qualcos'altro, con confini | scope, moduli, closure, `package.json` |
| **Instradamento** | una cosa in arrivo, più destinazioni possibili | router, event emitter, `try/catch` |
| **Trasformazione** | entra A, esce B, la forma cambia | middleware, stream, JSON, hashing |
| **Accumulo** | si riempie, e se si riempie troppo si rompe | buffer, memoria, backpressure, call stack |
| **Dipendenza** | A non può partire se B non è pronto | `npm`, import, connessioni DB |
| **Identità** | due cose sembrano uguali ma non lo sono | reference vs copia, `==` vs `===`, cache |
| **Simultaneità** | due cose succedono insieme e si intralciano | race condition, concorrenza, cluster |
| **Irreversibilità** | fatto è fatto, non si torna | Promise settled, side effect, commit |

Si scrive **una** forma. Se sembrano due, il livello sta cercando di insegnare
due cose e va spezzato in due partite.

### Passo 3 — Il verbo

Il verbo è l'azione fisica che il giocatore compie con le dita. Uno solo, e
deve **essere isomorfo alla forma** del passo 2: la struttura del gesto deve
essere la struttura del concetto.

| Forma | Verbi che la incarnano | Verbi che la tradiscono |
|---|---|---|
| Ordinamento | riordinare, impilare, incanalare in sequenza | scegliere fra opzioni |
| Precedenza | far passare avanti, deviare, dare la corsia | rispondere quale passa prima |
| Contenimento | racchiudere, tracciare confini, murare | selezionare cosa sta dentro |
| Instradamento | smistare, deviare, aprire uno scambio | abbinare A a B con una linea |
| Trasformazione | montare, tagliare, combinare | riconoscere l'output giusto |
| Accumulo | reggere, svuotare, bilanciare | leggere un contatore |
| Dipendenza | costruire dal basso, collegare prima di accendere | mettere in ordine una lista |
| Identità | distinguere due gemelli, seguire l'originale | dire se sono uguali |
| Simultaneità | gestire due mani insieme | alternare turni |
| Irreversibilità | premere e non poter tornare | confermare una scelta |

La colonna di destra è la colonna dei quiz. Ogni verbo lì dentro è
**riconoscimento**: il giocatore guarda, valuta, indica. Il verbo giusto è
sempre **produzione**: il giocatore costruisce, muove, causa.

Test rapido: se il verbo si può eseguire con un tocco su una risposta fra due o
quattro, non è un verbo, è un quiz con la grafica bella.

### Passo 4 — L'archetipo

Solo adesso si sceglie il gioco di riferimento, dal capitolo che corrisponde
(`10`–`19`). Si sceglie **in base al verbo**, mai in base all'ambientazione o a
quale gioco è più divertente in astratto.

La tabella verbo → archetipo sta in ogni capitolo di archetipo, sezione "quali
concetti può portare". Si legge quel capitolo **prima** di scrivere codice, non
dopo.

Se nessun archetipo porta il verbo, ci sono due strade: comporre due archetipi
(raro, va giustificato), o inventarne uno e scriverne il capitolo. Il Semaforo
è nato così, ed è per questo che è l'unico che funziona: è l'unico dove il
verbo è venuto prima della forma del gioco.

### Passo 5 — La condizione di vittoria e quella di perdita

Due frasi. Vincolo assoluto:

> **La condizione di perdita deve essere la conseguenza fisica del concetto
> frainteso, non un contatore di errori.**

Non "hai sbagliato 3 volte, hai perso" ma "la coda si è riempita perché hai
fatto passare avanti le cose sbagliate, e ora è ingorgata". La differenza è
tutto: nel primo caso l'errore è una nota di demerito, nel secondo è una
**dimostrazione**. Il giocatore vede il concetto avverarsi contro di lui.

### Passo 6 — Cosa succede quando sbaglia

Non "che messaggio mostro". La domanda è: **cosa vede muoversi**.

Regola dei tre livelli (dettagli in `02` §4):
1. **Errore piccolo** — conseguenza fisica visibile, nessun testo, nessuna pausa.
   Il pacco cade, il pezzo non entra, la corsia si intasa di uno.
2. **Errore ripetuto due volte sulla stessa cosa** — il gioco *rallenta* e
   mostra, non spiega: la traiettoria giusta in fantasma, l'ombra dove andava
   messo. Ancora zero testo.
3. **Errore ripetuto tre volte** — pannello di coaching. È l'unico posto della
   ricerca dove il testo è ammesso in un gioco, e il suo formato è fissato in
   `04` §7.

Il pannello di coaching non è il piano A camuffato. Se il gioco è progettato
bene, la maggior parte dei giocatori non lo vede mai.

### Passo 7 — Le 5 lezioni del capitolo

Ogni livello ha 40 lezioni, raggruppate in 8 capitoli da 5. Le 5 lezioni di un
capitolo **non sono 5 domande**: sono 5 stati progressivi dello stesso gioco.

Lo schema obbligatorio per un capitolo:

| Beat | Ruolo | Cosa cambia rispetto al beat precedente |
|---|---|---|
| 1 | Introduzione | il verbo da solo, nessuna pressione, impossibile perdere |
| 2 | Complicazione | si aggiunge **una** variabile |
| 3 | Il caso che rompe l'intuizione | la cosa che il giocatore crede e che è falsa |
| 4 | Picco | massima densità, tempo stretto |
| 5 | Padronanza | più facile del 4, ma con tutto insieme: la mano che ti fa sentire bravo |

Il beat 3 è quello che porta il carico didattico vero. Il beat 5 non è il più
difficile — vedi `03` §3.

### Passo 8 — L'ambientazione

**Ultima.** È l'unica decisione puramente estetica e l'unica gratuita: si può
cambiare a fine lavoro senza toccare una riga di logica. Vincoli:

- coerente con la banda (§`03` §7): banda 1 analogica e fisica, banda 4
  tecnica e letterale;
- niente che richieda di leggere per capire dove si è;
- deve avere una risposta plausibile alla domanda "perché in questo mondo
  succede la cosa del passo 5 quando sbaglio?".

Se l'ambientazione non riesce a giustificare la condizione di perdita, è
l'ambientazione sbagliata, non la condizione di perdita.

### Passo 9 — I numeri

Si copiano dal capitolo `31` e si adattano. Non si inventano. Le finestre di
reazione, le gravità, le durate, gli intervalli di spawn hanno valori di
partenza tarati; il gioco nuovo parte da quelli e li muove del ±20% al massimo
prima di dover giustificare lo scostamento.

---

## 0.3 La scheda di progetto

Nessun gioco si scrive senza questa scheda compilata. Sta in testa al file del
gioco come commento, così chi lo apre dopo sa cosa stava cercando di fare.

```
GIOCO ........... nome, in italiano
LIVELLO ......... topic, numero, banda
CAPITOLO ........ quale degli 8, quali 5 lezioni

CONCETTO ........ una frase, zero gergo               (passo 1)
FORMA ........... una delle dieci                     (passo 2)
VERBO ........... una parola, cosa fanno le dita      (passo 3)
ARCHETIPO ....... quale capitolo, quale gioco         (passo 4)

VINCI SE ........ una frase                           (passo 5)
PERDI SE ........ una frase, conseguenza non contatore (passo 5)
SBAGLI → ........ livello 1 / livello 2 / livello 3    (passo 6)

BEAT 1 .......... cosa c'è
BEAT 2 .......... +una variabile
BEAT 3 .......... l'intuizione che rompe
BEAT 4 .......... il picco
BEAT 5 .......... la padronanza                        (passo 7)

MONDO ........... ambientazione, in mezza riga         (passo 8)
NUMERI .......... quali costanti da `31`, quali scostamenti (passo 9)

TEST 1 .......... come faccio a essere sicuro che non si vince senza capire
TEST 2 .......... il loop in una frase
TEST 3 .......... cosa vede nei primi 20 secondi
```

Le tre righe finali non sono decorative. Sono la parte che si compila peggio e
che salva più lavoro: se la riga TEST 1 dice "perché le forme sono diverse e
devi guardare la forma", il gioco è già morto e sono ancora a costo zero.

---

## 0.4 I tre test, applicati alla scheda

I test stanno nella mappa (`RICERCA-GIOCHI.md`). Qui c'è **come si eseguono**,
perché eseguirli male è facile e comodo.

### Test 1 — Integrazione intrinseca

La procedura corretta non è chiedersi "il gioco insegna?" (risposta sempre sì,
per affetto). È questa:

1. Elenca **tutti** i segnali che il giocatore può vedere sullo schermo.
2. Per ognuno, chiediti: se guardassi solo questo, ignorando il resto, vincerei?
3. Se per almeno uno la risposta è sì, quel segnale è una **scorciatoia** e va
   rimosso o reso ambiguo.

I segnali scorciatoia più frequenti, in ordine di frequenza nei giochi vecchi:

- **colore** — verde/rosso, o due famiglie cromatiche per due categorie;
- **posizione** — la risposta giusta è sempre nella stessa zona;
- **forma dell'oggetto** — i cattivi sono spigolosi;
- **lunghezza del testo** — la risposta giusta è la più lunga;
- **numero di elementi** — se sono 3 la risposta è la seconda;
- **ritmo** — dopo due veloci arriva una lenta;
- **presenza di un simbolo tecnico** — se c'è la graffa allora è JS.

Nota bene: rimuovere il colore non è un dettaglio grafico. In Lama il codice
verde/rosso sulla targhetta era **l'intero gioco**: si tagliava il verde e si
schivava il rosso senza mai leggere niente. Toltolo, il gioco è diventato un
altro gioco — e per la prima volta un gioco che insegna.

### Test 2 — Il core loop in una frase

Formato obbligatorio: **verbo + oggetto + vincolo + conseguenza**, senza "e
poi", senza congiunzioni che aggiungono fasi.

| Verdetto | Frase |
|---|---|
| ✅ | "Devio ogni richiesta nella corsia giusta prima che la coda si intasi" |
| ✅ | "Impilo i pezzi in modo che ogni dipendenza stia sotto a chi la usa" |
| ❌ | "Leggo la scheda, capisco che tipo è, poi scelgo il cassetto, e poi confermo" |

La terza è la firma di un quiz: tre fasi, l'ultima è "confermo".

### Test 3 — Il primo verbo in venti secondi

Si esegue mentalmente così: copri il testo dello schermo con la mano, guarda
solo ciò che si muove, e chiediti cosa ti viene voglia di toccare. Se la
risposta è "non lo so" oppure "il pulsante", il test è fallito.

Un gioco passa se **la prima cosa che si muove suggerisce il verbo**. Vedi `04`.

---

## 0.5 Cosa non si decide sulla scheda

Sulla scheda non si decidono, e non si devono nemmeno scrivere:

- le palette, i font, gli effetti particellari;
- la struttura del codice, i nomi delle variabili, come si tengono gli stati;
- i testi esatti (tranne la frase del concetto);
- l'audio.

Sono tutte cose che si prendono meglio con le mani sul gioco che gira, e
scriverle prima produce solo specifiche da disattendere. La scheda decide **cosa
il gioco è**; il resto è mestiere.

---

## 0.6 Esempio lavorato — Node.js L2, capitolo 3

Il livello 2 di Node.js è il runtime: cosa sa fare Node che il browser non sa,
e viceversa. Il capitolo 3 sono le 5 lezioni su `fs`, `path`, `os`, `process` e
il fatto che `window` e `document` non esistono.

Applico i nove passi.

**Passo 1 — concetto senza gergo.**
"Lo stesso codice, in due posti diversi, ha attrezzi diversi a disposizione. Se
chiedi un attrezzo che lì non c'è, ti si ferma tutto."

**Passo 2 — forma.**
Contenimento. Due ambienti, due inventari, confini netti: alcune cose stanno
solo dentro l'uno, alcune solo dentro l'altro, alcune in entrambi.

**Passo 3 — verbo.**
Non "scegliere se è Node o browser" (riconoscimento → quiz). Il verbo è
**afferrare l'attrezzo giusto mentre serve**: c'è un lavoro in corso, serve una
cosa, e la cosa è nella tua cassetta o non c'è.

**Passo 4 — archetipo.**
Verbo = afferrare sotto pressione con conseguenza fisica → `11-slash-swipe`
(Fruit Ninja) per la versione veloce, o `10-time-management` (Diner Dash) per la
versione a gestione. Il capitolo 11 dice che lo slash porta bene le forme di
tipo *contenimento* solo se il gesto **separa** due insiemi. Qui separa: taglio
ciò che il mio ambiente possiede, lascio passare ciò che non possiede.

**Passo 5 — vinci/perdi.**
Vinci se il lavoro finisce con la macchina ancora accesa. Perdi se afferri un
attrezzo che il tuo ambiente non ha: la macchina si spegne — non "punto perso",
**si spegne**, come un `ReferenceError` spegne un processo. La perdita *è* il
concetto.

**Passo 6 — sbagli.**
1. La mano attraversa l'attrezzo e non lo prende: fruscio, l'attrezzo svanisce.
2. Due volte lo stesso: il gioco rallenta, e la sagoma della cassetta si
   illumina per un istante mostrando cosa c'è dentro davvero.
3. Tre volte: coaching, con l'attrezzo mostrato accanto al suo ambiente.

**Passo 7 — i 5 beat.**
1. Solo attrezzi che hai. Impossibile sbagliare: si impara il gesto.
2. Entra il primo attrezzo che non hai.
3. **L'intuizione che rompe**: `fetch`. Sembra roba da browser, e in Node
   moderno c'è. Il giocatore lo lascia passare per prudenza e perde il lavoro
   — impara che la regola non è "roba di rete = browser".
4. Ritmo alto, attrezzi condivisi e esclusivi mescolati.
5. Tutto insieme ma più lento: la mano dove ti senti bravo.

**Passo 8 — mondo.**
Officina di notte, due banconi. Coerente con banda 1: fisico, analogico, zero
terminologia sullo schermo — i nomi degli attrezzi *sono* i nomi delle API,
scritti sui manici, e questo è l'unico testo presente.

**Passo 9 — numeri.**
Finestra di reazione 1,9 s al beat 1 → 1,4 s al beat 4 (mai sotto 1,8 s se il
giocatore deve *leggere* il manico; qui al beat 4 le forme degli attrezzi sono
già memorizzate, quindi 1,4 s è lecito — questo è il tipo di scostamento che va
giustificato per iscritto).

**TEST 1** — non si vince guardando il colore: i manici sono tutti dello stesso
legno. Non si vince dalla posizione: gli attrezzi arrivano da lati casuali. Il
solo segnale utile è *quale attrezzo è*, cioè il concetto.
**TEST 2** — "Afferro solo gli attrezzi che il mio bancone possiede, prima che
il lavoro si fermi."
**TEST 3** — un attrezzo vola verso la mano e la mano è già aperta. Venti
secondi non servono: ne bastano tre.

---

## 0.7 Errori di processo, non di design

Li ho fatti tutti. Sono riconoscibili prima di costruire.

**1. L'ambientazione prima del verbo.**
Sintomo: la scheda ha MONDO compilato e VERBO vuoto. Esito garantito: box di
testo, perché l'ambientazione non ha una meccanica e il concetto va messo da
qualche parte.

**2. Il concetto scritto in gergo.**
Sintomo: la riga CONCETTO contiene una parola che il giocatore imparerà *in
questo livello*. Se la definizione usa il termine, il gioco insegnerà il
termine e non la cosa.

**3. Due forme in un gioco.**
Sintomo: la riga FORMA ha una barra o una "e". Esito: due meccaniche che si
contendono lo schermo, nessuna delle due leggibile.

**4. La perdita come contatore.**
Sintomo: PERDI SE contiene un numero di errori. Rimedio: chiediti cosa
succederebbe *nel mondo reale* se quel concetto fosse frainteso da un
programmatore, e mettici quello.

**5. Il beat 3 mancante.**
Sintomo: i 5 beat sono "facile, medio, medio, difficile, difficilissimo". Manca
la controintuizione, quindi il gioco esercita e non insegna: il giocatore
finisce con le stesse convinzioni sbagliate con cui è entrato.

**6. Il coaching come piano A.**
Sintomo: il pannello di spiegazione è scritto bene e lungo. Se è il pezzo più
curato del gioco, il gioco è un manuale con un minigioco davanti.

**7. Il verbo che è un tocco su una risposta.**
Sintomo: la scheda dice "tocca", "scegli", "seleziona". Tre parole vietate nella
riga VERBO.

---

## 0.8 Checklist di consegna

Prima di dire che un gioco è fatto:

- [ ] la scheda è in testa al file e tutti i campi sono pieni
- [ ] i tre test hanno una risposta scritta, non "sì"
- [ ] ho elencato tutti i segnali a schermo e nessuno è una scorciatoia (§0.4)
- [ ] la condizione di perdita è una conseguenza, non un contatore
- [ ] il beat 3 contiene una convinzione falsa smontata
- [ ] il beat 5 è più facile del beat 4
- [ ] zero testo esplicativo nel flusso di gioco (solo coaching al terzo errore)
- [ ] nessun rosso su risposta sbagliata (`02` §4.4)
- [ ] gira col dito e con la tastiera, stessa partita (`33`)
- [ ] i numeri vengono da `31`, gli scostamenti sono giustificati
- [ ] ho giocato dieci mani di fila senza annoiarmi al beat 5

L'ultima è la più severa e non è aggirabile leggendo.
