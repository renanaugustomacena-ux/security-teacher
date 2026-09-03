# 14 — Allinea tre (match-3)

> Riferimento: Candy Crush Saga (King, 2012), Bejeweled (2001), Puzzle & Dragons.
> Griglia, scambi, catene. L'archetipo più venduto della storia dei giochi mobile
> e il più difficile da rendere didattico senza barare.

---

## 14.1 Come funziona l'originale

Griglia di 7-9 colonne. Si scambiano due pezzi adiacenti; se lo scambio produce
una fila di 3+ uguali, la fila scompare, i pezzi sopra cadono, e nuovi pezzi
entrano dall'alto. Se la caduta produce nuove file, scompaiono a loro volta:
questa è la **cascata**, ed è il motore del piacere.

Elementi strutturali:
- lo scambio che non produce nulla viene **annullato** (il pezzo torna): il
  giocatore non può fare mosse inutili, quindi non può bloccarsi per errore;
- combinazioni speciali (4 in fila, 5, forma a L/T) producono pezzi con poteri;
- gli obiettivi non sono "fai punti" ma "elimina N di questo tipo", "porta X in
  basso", "rompi le gelatine";
- mosse limitate, non tempo.

Numeri:
- durata del match e sparizione: 250-300 ms;
- caduta: gravità accelerata, ~120 ms per cella, con rimbalzo di 40 ms
  all'arrivo;
- cascata: ogni livello di cascata alza il tono dell'audio di un semitono. Questo
  dettaglio è la ragione per cui le cascate sono soddisfacenti.

## 14.2 Perché funziona

**A. Ogni mossa produce più di quanto hai chiesto.** Fai un match da 3 e la
cascata te ne regala altri due. La ricompensa è sistematicamente superiore
all'investimento, ed è **variabile** — schema di rinforzo a rapporto variabile,
il più compulsivo che si conosca.

**B. Non ci si può bloccare.** Le mosse inutili sono annullate; se non ci sono
mosse, la griglia si rimescola. Il giocatore non affronta mai un vicolo cieco.

**C. La griglia è leggibile a colpo d'occhio.** Tutto è visibile
contemporaneamente, niente memoria, niente informazione nascosta. È un archetipo
**riflessivo**: si può pensare quanto si vuole.

**D. Il fallimento è morbido.** Finiscono le mosse, non si muore. La partita
successiva riparte identica.

La proprietà C è ciò che ci interessa e ciò che ci frega: un gioco senza pressione
temporale permette di pensare — bene per concetti complessi — ma permette anche
di provare tutte le combinazioni fino a indovinare. §14.8, errore 1.

## 14.3 Il core loop

> **Scambio due pezzi per formare il gruppo che il concetto richiede, e la
> cascata mi mostra le conseguenze.**

## 14.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| scambia | trascina un pezzo su un adiacente, o tocca due adiacenti | clic e trascina, o due clic | subito |
| annulla | automatico se lo scambio non produce niente | idem | non è un comando |

Uno solo. Il doppio metodo di input (trascina *oppure* due tocchi) è obbligatorio
su mobile: metà delle persone fa una cosa, metà l'altra.

Dettagli:
- la selezione va evidenziata con un **sollevamento** (ombra + scala 1,06), non
  con un bordo colorato;
- lo scambio impossibile (non adiacente) non deseleziona: seleziona il nuovo
  pezzo. Deselezionare per un errore di mira è frustrante;
- lo scambio inutile fa il viaggio di andata e ritorno in 220 ms totali, con un
  piccolo sussulto: il giocatore deve vedere che la mossa è stata *tentata*.

## 14.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Griglia | 7×7 → 8×8 | sotto 6 non ci sono cascate, sopra 9 su mobile i pezzi sono troppo piccoli |
| Dimensione minima del pezzo | 44 px | vincolo touch, non estetico |
| Tipi di pezzo | 5 → 6 | 4 = troppo facile, 7 = cascate rare |
| Durata sparizione | 260 ms | |
| Caduta | 120 ms per cella, con rimbalzo 40 ms | |
| Ritardo fra livelli di cascata | 180 ms | serve per capire cosa è successo |
| Scambio | 180 ms andata; 220 ms totali se annullato | |
| Mosse per mano | 12 → 8 | |
| Salita di tono per livello di cascata | +1 semitono, max +7 | |

## 14.6 Manopole della difficoltà

1. **Numero di mosse** (la principale, sicura).
2. **Numero di tipi di pezzo** (5 → 6).
3. **Obiettivo composto** ("tre gruppi di tipo A *e* due di tipo B").
4. **Ostacoli sulla griglia** (celle bloccate, pezzi che non cadono).
5. **Difficoltà concettuale del criterio di raggruppamento** (la manopola
   didattica — vedi §14.9).
6. Tempo limite (**da evitare**: distrugge la proprietà C, che è la ragione per
   usare questo archetipo).

## 14.7 Juice specifico

- **La cascata è tutto.** Ritardo di 180 ms fra i livelli, tono che sale di un
  semitono per livello, e ogni livello successivo con particelle un po' più
  grosse. Senza la scala di toni, la cascata è solo roba che cade.
- **Il sollevamento alla selezione**: ombra che si allarga, scala 1,06, in 90 ms.
  Il pezzo deve sembrare *in mano*.
- **La sparizione non è un dissolvenza**: scala 1,2 in 80 ms, poi 0 in 180 ms,
  con particelle che partono verso il contatore dell'obiettivo (destinazione
  chiara = collegamento causa/effetto).
- **La caduta ha rimbalzo.** 40 ms di rimbalzo su 6 px. Senza, la griglia sembra
  di plastica.
- **La griglia respira**: quando non si fa niente per 4 s, uno dei pezzi che
  formerebbero un match si muove appena. Suggerimento diegetico, mai una freccia.
- **Nessun numero che vola.** L'obiettivo è un contatore diegetico che si
  riempie.

## 14.8 Come si rovina

**1. La griglia risolvibile per tentativi.** È il pericolo strutturale
dell'archetipo: senza pressione, il giocatore prova tutti gli scambi fino a
trovare quello che funziona. Rimedi possibili, in ordine di efficacia:
   - **le mosse costano** e l'obiettivo richiede efficienza, non solo successo;
   - lo scambio errato **ha una conseguenza** (non solo annullato: consuma una
     mossa se era plausibile ma concettualmente sbagliato);
   - il criterio corretto **cambia** durante la mano, così le combinazioni
     memorizzate non servono.

**2. Il colore come criterio.** Se i pezzi si raggruppano per colore, il gioco
non insegna niente: è Candy Crush con la grafica a tema. **I pezzi devono essere
raggruppabili per una proprietà concettuale**, e devono avere colori identici o
irrilevanti. Questo è l'unico modo di rendere questo archetipo didattico, ed è
anche la cosa che lo rende molto più difficile da leggere: serve tipografia o
iconografia chiarissima sui pezzi.

**3. Tempo limite.** Toglie la riflessione, che è la sola ragione per scegliere
questo archetipo.

**4. Cascate senza pausa.** Se i livelli di cascata si sovrappongono, il
giocatore non capisce cosa è successo, e la ricompensa perde il legame con la
mossa.

**5. Pezzi sotto 44 px.** Su telefono diventa un gioco di precisione.

**6. Obiettivi opachi.** Se non si vede cosa serve, il giocatore fa mosse a caso
finché non vince.

## 14.9 Quali concetti Node.js può portare

Porta bene **identità**, **dipendenza** (con varianti), **trasformazione**. Male
**ordinamento**, **irreversibilità**, **simultaneità**.

Il criterio: il match-3 raggruppa **per proprietà**. Quindi porta ogni concetto
che è "queste cose appartengono alla stessa categoria per una ragione non
ovvia". Non porta niente che abbia a che fare con il tempo o l'ordine, perché la
griglia non ha tempo.

| Livello / concetto | Va? | Come |
|---|---|---|
| L5 npm: versioni semver | ✅ ottimo | i pezzi sono versioni (`^1.2.3`, `~1.2.3`, `1.x`); si raggruppano quelle **compatibili fra loro**, non quelle uguali. Il criterio è una regola, non un aspetto |
| L14 Encoding: rappresentazioni | ✅ | stessa cosa scritta in utf8 / hex / base64: si raggruppano le rappresentazioni **dello stesso dato**. Identità pura |
| L15 Tipi: coercizione | ✅ ottimo | si raggruppano i valori che sono `==` fra loro ma non `===`. Il criterio è vero solo se hai capito la coercizione |
| L11 Sicurezza: famiglie di vulnerabilità | ✅ | si raggruppano tre input che sfruttano la stessa classe di vulnerabilità |
| L12 HTTP: codici di stato | ⚠️ | funziona, ma è memorizzazione più che comprensione |
| L7 Promise: ordine | ❌ | ordinamento: `16-lane-sorting` |
| L9 Event loop | ❌ | tempo: `12-runner` o `17-maze` |
| L10 Stream | ❌ | flusso: `12-runner` |

**Il caso L15 è il migliore.** Raggruppare i valori che sono uguali "in senso
debole" (`0`, `''`, `false`, `[]`) richiede la tabella di coercizione in testa, e
non c'è nessun modo di indovinarla dall'aspetto dei pezzi: `'0'` e `0` sembrano
quasi identici e sono `==` ma non `===`; `null` e `undefined` sono `==` fra loro
ma `null == 0` è falso. Ogni gruppo formato è una dimostrazione di comprensione,
e il gioco è **impossibile da vincere per tentativi** entro il budget di mosse.

## 14.10 Esempio lavorato — Node L5, capitolo 5, "Il magazzino delle versioni"

```
GIOCO ........... Il magazzino delle versioni
LIVELLO ......... Node.js, L5 npm, banda 1
CAPITOLO ........ 5 di 8 — semver, caret, tilde, versioni compatibili

CONCETTO ........ Un pezzo di ricambio non deve essere identico all'originale:
                  deve essere uno che ci va. E la regola di cosa "ci va"
                  è scritta sul pezzo stesso.
FORMA ........... identità
VERBO ........... scambiare due casse adiacenti per allineare tre compatibili
ARCHETIPO ....... 14 match-3 — Candy Crush

VINCI SE ........ l'ordine del cliente è completo entro le mosse disponibili
PERDI SE ........ finiscono le mosse: l'ordine parte incompleto e il camion
                  se ne va con i buchi. Non "hai perso": è partito così
SBAGLI → ........ 1: le casse si scambiano e tornano, con un cigolio
                  2: se lo scambio era plausibile ma le versioni non sono
                     compatibili, la mossa **si consuma** e la cassa mostra
                     per 500 ms il suo intervallo reale come un'ombra
                  3: coaching con due versioni affiancate e l'intervallo
                     disegnato come un righello

BEAT 1 .......... solo versioni identiche: si impara lo scambio
BEAT 2 .......... entra il caret ^1.2.0 — compatibile con 1.3.0, 1.9.9
BEAT 3 .......... FRATTURA: ^0.2.1. L'istinto dice "caret = tutto il primo
                  numero", quindi 0.3.0 dovrebbe andare. Non va: sotto l'1,
                  il caret blocca anche il secondo numero. Chi allinea
                  0.2.1 con 0.3.0 consuma la mossa e vede il righello
BEAT 4 .......... caret, tilde e x mescolati, 8 mosse
BEAT 5 .......... tutti i casi, 12 mosse: la mano in cui vedi i gruppi subito

MONDO ........... magazzino ricambi, casse di legno con l'etichetta stampigliata
                  a inchiostro. Tutte le casse sono dello stesso legno:
                  l'unica differenza è cosa c'è scritto sopra
NUMERI .......... da 31: griglia 7×7, 5 tipi di intervallo, sparizione 260 ms,
                  caduta 120 ms/cella, cascata 180 ms +1 semitono, mosse 12→8
TEST 1 .......... casse identiche, nessun colore, posizione casuale;
                  l'unico segnale è la stringa di versione. Non si può
                  vincere per tentativi: le mosse sono contate e lo scambio
                  concettualmente sbagliato **costa**
TEST 2 .......... "Scambio casse per allineare tre versioni che possono
                  sostituirsi, prima che finiscano le mosse"
TEST 3 .......... una cassa oscilla appena e la sua vicina compatibile
                  oscilla insieme: il primo trascinamento nasce da lì
```

### Le 5 lezioni

| Beat | Intervalli in gioco | Frattura |
|---|---|---|
| 1 | `1.2.3` esatte | — |
| 2 | `^1.2.0`, `1.3.0`, `1.9.9` | — |
| 3 | `^0.2.1` vs `0.3.0` | **"il caret libera sempre il primo numero"** |
| 4 | `^`, `~`, `1.x`, esatte | — |
| 5 | tutti | — |

### Perché non si vince per tentativi

Punto critico dell'archetipo, quindi va dimostrato e non affermato.

Griglia 7×7 = 49 celle, 84 scambi adiacenti possibili. Con 8 mosse, la
probabilità di completare l'obiettivo per tentativi casuali è trascurabile. Ma
la difesa vera è la seconda regola: **lo scambio concettualmente plausibile ma
sbagliato consuma una mossa.**

La distinzione è delicata e va implementata con cura:

| Scambio | Costa? | Perché |
|---|---|---|
| non adiacente | no | errore di mira, non di comprensione |
| allinea tre versioni **compatibili** | sì (ed è un successo) | |
| allinea tre versioni **incompatibili** | **sì** | il giocatore credeva fossero compatibili: è un errore concettuale |
| non allinea niente | no | è esplorazione, non una tesi |

La riga chiave è la terza: se allinei tre e non funziona, hai espresso
un'ipotesi sbagliata e paghi. Se non allinei niente, non hai detto niente e non
paghi. Il gioco misura le **ipotesi**, non i movimenti — ed è per questo che la
riflessione senza tempo limite resta legittima: puoi pensare quanto vuoi, ma non
puoi tirare a indovinare.
