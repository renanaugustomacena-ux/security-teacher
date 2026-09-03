# 30 — Audit dei sette giochi esistenti

> I sette giochi della banda 1 costruiti prima della ricerca, passati ai tre test
> di `00` §0.4. Cosa si salva, cosa si butta, e cosa insegna ogni fallimento.
> Questo capitolo esiste perché gli errori sono più istruttivi degli esempi.

---

## 30.1 Il verdetto in una tabella

| Gioco | Livello | TEST 1 integrazione | TEST 2 loop | TEST 3 20 s | Verdetto |
|---|---|---|---|---|---|
| Semaforo | L7 Promise | ✅ | ✅ | ✅ | **si tiene**, si rifinisce |
| Chiosco | L1 Server | ⚠️ parziale | ✅ | ⚠️ | si rifà la struttura, si tiene l'idea |
| Fattorino | L6 Callback | ⚠️ parziale | ⚠️ | ✅ | si rifà |
| Lama | L2 Runtime | ❌ | ✅ | ✅ | si rifà: era un quiz col colore |
| Cassetta | L2 Runtime | ❌ | ❌ | ❌ | si butta |
| Etichette | L4 Moduli | ❌ | ❌ | ❌ | si butta |
| Magazzino | L5 npm | ❌ | ❌ | ⚠️ | si butta |
| Motore | L3 CommonJS | ❌ | ⚠️ | ❌ | si butta |
| Fabbrica | L1 | ⚠️ | ⚠️ | ⚠️ | si butta, l'idea passa al Chiosco |

Uno su nove passa tutti e tre. Due su nove passano parzialmente. Sei si buttano.

Il dato utile non è il rapporto: è che **i sei da buttare sbagliano tutti lo
stesso test nello stesso modo**.

---

## 30.2 Semaforo — l'unico che funziona

**Cos'era.** Richieste che arrivano su nastri, tre corsie, leve per smistarle. La
frattura: una richiesta che parte dopo torna prima, e va smistata all'arrivo, non
alla partenza.

**Perché passa il TEST 1.** Le richieste erano indistinguibili come aspetto;
l'unico segnale utile era il tempo di ritorno, che è il concetto. Nessuna
scorciatoia cromatica, nessuna posizione fissa.

**Perché passa il TEST 2.** "Smisto ogni risposta nella corsia giusta prima che
la coda si intasi." Una frase, nessun "e poi".

**Perché passa il TEST 3.** Un nastro già in movimento, una leva che oscilla. La
mano ci va da sola.

**E soprattutto: la conseguenza era un ingorgo.** Non un punteggio, non una vita
persa: una coda fisica che cresceva e a un certo punto bloccava tutto. Il
giocatore vedeva il proprio errore accumularsi.

**Cosa manca ancora.**

| Problema | Rimedio |
|---|---|
| Nessun juice: le leve non avevano corsa né peso | `31` §31.6, leva 220 ms con overshoot |
| La coda non sembrava un problema | gli oggetti in attesa devono spingersi e accatastarsi storti |
| Nessuna anticipazione degli arrivi | 400 ms di preavviso sonoro dalla sorgente |
| Cinque beat non differenziati | struttura di `03` §3.3 |
| Grafica povera | il registro di banda 2 (`03` §3.7) |

È diventato il capitolo `16` della ricerca. L'archetipo più versatile della
raccolta è nato da qui.

---

## 30.3 Lama — il caso da studiare: bello e inutile

**Cos'era.** Oggetti che volavano su, da tagliare o lasciar cadere, con una
targhetta che diceva se erano roba di Node o roba di browser.

**Perché passava il TEST 2 e il TEST 3.** Il loop era buono ("taglio quello che è
mio, lascio cadere il resto") e il primo verbo era ovvio in tre secondi. Come
gioco, funzionava: era il più divertente dei nove.

**Perché falliva il TEST 1, e la lezione.** La targhetta era **verde per le cose
da tagliare e rossa per quelle da lasciare**.

Con quel dettaglio, il gioco si vinceva perfettamente senza leggere niente e senza
sapere cosa fosse Node. Il concetto era *stampato accanto* alla risposta, e la
risposta era un colore. Il giocatore ottimizzava — come è giusto — sul segnale più
economico disponibile, e quello era il colore.

La lezione generale, che vale per tutti i giochi futuri:

> **Il giocatore userà sempre il segnale più economico che gli lasci. Se ne lasci
> uno che non richiede il concetto, il concetto non verrà mai guardato.**

Non è pigrizia del giocatore: è efficienza, ed è esattamente ciò che i giochi
insegnano a fare. Il rimedio non è chiedere di leggere: è **togliere l'altro
segnale**.

**Il rimedio applicato.** Tutti gli oggetti dello stesso materiale, stessa
famiglia di sagome, nessun colore differenziale, e il nome vero dell'API stampato
sul manico come etichetta diegetica (`04` §4.6). Il gioco diventa il caso lavorato
di `11` §11.10.

Nota importante: dopo il rimedio, il gioco è **più difficile e più bello**. Il
codice colore non lo stava rendendo accessibile, lo stava rendendo vuoto.

---

## 30.4 Chiosco e Fattorino — i parziali

### Chiosco (L1)

**Cos'era.** Clienti a una finestrella, ordini da preparare in più fasi.

**Cosa funzionava.** La struttura a catene parallele con un solo attore: il collo
di bottiglia c'era, e la simultaneità era reale.

**Cosa non funzionava.**
- Le catene erano **identiche fra loro** tranne il nome: la strategia si riduceva
  a "il più impaziente per primo", che è una regola sola (`10` §10.8, errore 5).
- Barre di pazienza numeriche invece di tre stati comportamentali.
- Nessuna frattura: le cinque lezioni erano cinque velocità diverse dello stesso
  compito.

**Rimedio.** Diventa il livello 1 in `32` §32.2, con le catene differenziate per
**struttura** — è la struttura della catena che porta il concetto, non l'etichetta
(`10` §10.8, errore 7).

### Fattorino (L6)

**Cos'era.** Consegne da smistare, alcune immediate, alcune che tornavano dopo.

**Cosa funzionava.** Il TEST 3: si capiva in tre secondi. E l'idea che alcune cose
tornino dopo era la cosa giusta da mettere al centro.

**Cosa non funzionava.**
- Il loop richiedeva tre fasi ("leggo, decido, confermo") → firma del quiz
  (`00` §0.4, TEST 2).
- La conseguenza dell'errore era un contatore.
- L'asincronia era **detta**, non fatta: un'etichetta diceva "asincrona" invece
  che la consegna comportarsi in modo asincrono.

**Rimedio.** Il concetto passa al livello 6 con il time management (`10` §10.10),
dove l'asincronia è una proprietà **della catena**, non un'etichetta: la catena
asincrona ti libera, quella sincrona ti inchioda. Il giocatore lo sente sulla
mano.

---

## 30.5 I quattro da buttare, e l'errore comune

Cassetta (L2), Etichette (L4), Magazzino (L5), Motore (L3), più Fabbrica (L1).

Tutti e cinque avevano la stessa forma:

```
1. un box di testo spiega una cosa
2. compare un elemento da classificare
3. il giocatore lo mette in uno di N contenitori
4. feedback: giusto (verde) / sbagliato (rosso)
5. torna al 2
```

Questo non è un gioco: è **un quiz a scelta multipla con il trascinamento invece
dei radio button**. E il trascinamento non aggiunge niente, perché il gesto non
ha nessuna relazione con il concetto — trascinare non è *contenere*, non è
*dipendere*, non è *ordinare*. È solo un modo più lento di rispondere.

Le cinque diagnosi puntuali:

| Gioco | Errore primario | Capitolo che lo copre |
|---|---|---|
| Cassetta | il verbo era "scegliere il cassetto" = riconoscimento | `00` §0.2 passo 3 |
| Etichette | il concetto (cosa si esporta) era scritto sull'etichetta | `01` §1.4 |
| Magazzino | conseguenza = contatore; nessuna frattura | `03` §3.3 |
| Motore | il testo spiegava tutto prima; il gioco verificava | `04` §4.1 |
| Fabbrica | catene identiche, nessuna decisione reale | `10` §10.8 |

**La radice comune, ed è una sola:** in tutti e cinque l'ambientazione è stata
scelta prima del verbo. Officina, magazzino, fabbrica, cassetta degli attrezzi:
tutte scene plausibili, nessuna con una meccanica dentro. E quando l'ambientazione
non ha una meccanica, il concetto deve arrivare da qualche parte — arriva dal
testo. Da lì i box da leggere che l'app ha in giro, che non sono un problema
grafico ma la **conseguenza necessaria** di un ordine di decisioni sbagliato.

È il motivo per cui il capitolo `00` esiste e per cui l'ordine dei nove passi non
è negoziabile.

---

## 30.6 I sette sintomi, per riconoscerli in fretta

Estratti dall'audit. Se un gioco nuovo mostra uno di questi, si torna alla scheda.

1. **C'è un box di testo che spiega prima di giocare.** → il concetto non è nella
   meccanica.
2. **Verde e rosso segnalano giusto e sbagliato.** → il giocatore ottimizza sul
   colore.
3. **Il verbo è "scegli", "tocca", "seleziona".** → è riconoscimento, non
   produzione.
4. **Sbagliare toglie un punto o una vita e nulla si muove.** → la conseguenza
   non è il concetto.
5. **Le cinque lezioni differiscono solo per velocità.** → manca la frattura, il
   capitolo esercita e non insegna.
6. **Le categorie hanno aspetti diversi.** → scorciatoia visiva.
7. **Il pannello di spiegazione è la parte più curata.** → è un manuale con un
   minigioco davanti.

---

## 30.7 Cosa si salva concretamente

| Elemento | Da dove | Dove va |
|---|---|---|
| Meccanica dello smistamento a corsie | Semaforo | archetipo `16`, usato in 4 livelli |
| Idea della coda che intasa | Semaforo | conseguenza standard per `16` e `12` |
| Catene parallele con un attore | Chiosco | archetipo `10`, L1/L6/L18 |
| "Alcune cose tornano dopo" | Fattorino | frattura di L6 e L7 |
| Il gesto del taglio al volo | Lama | archetipo `11`, L2 |
| I nomi veri stampati sugli oggetti | Etichette | tecnica generale: `04` §4.6 |

L'ultima riga è l'unica cosa buona uscita da Etichette, e vale il gioco intero: i
nomi tecnici scritti **sull'oggetto**, come un marchio di fabbrica, si leggono
senza che il giocatore senta di stare leggendo. È così che la terminologia entra
in banda 1 senza tradire il registro fisico.
