# 11 — Taglio a gesto (slash / swipe)

> Riferimento: Fruit Ninja (Halfbrick, 2010). Un dito, una traiettoria, oggetti
> che volano. L'archetipo più semplice da far *sentire* bene e il più facile da
> ridurre a un quiz.

---

## 11.1 Come funziona l'originale

Gli oggetti entrano dal basso con una parabola. Il dito traccia una linea sullo
schermo. Se la linea attraversa un oggetto, l'oggetto si divide in due lungo
**l'angolo del taglio** e le due metà proseguono con la fisica. Le bombe
esplodono se tagliate. Combo se un solo tratto attraversa più oggetti.

Numeri dell'originale, per riferimento:
- gli oggetti stanno in aria circa 1,6-2,2 s;
- salgono per ~40% del tempo e cadono per il 60% (gravità asimmetrica percepita:
  in realtà è simmetrica, ma la parte alta della parabola è più lenta e sembra
  più lunga — è il *hang time*, e fa tutto il lavoro);
- il tratto di taglio resta visibile ~250 ms come scia luminosa;
- la divisione dell'oggetto avviene **esattamente sull'angolo del gesto**, non
  su un asse prefissato.

## 11.2 Perché funziona

**A. Il gesto è espressivo.** Non c'è un modo corretto di tagliare: puoi
tagliare in verticale, in diagonale, con un tratto lungo che ne prende quattro.
Il gioco misura una traiettoria continua, non un tocco. Quindi due giocatori che
fanno la stessa cosa la fanno *diversamente*, e questo produce identità.

**B. La conseguenza è geometrica.** L'oggetto si apre lungo la linea che hai
fatto tu. È la forma più pura di feedback: il mondo conserva la traccia del tuo
gesto. Nessun punteggio comunica quanto quello.

**C. L'errore è tuo, mai del gioco.** Se hai mancato, hai visto dove passava il
dito e dove stava l'oggetto. Non c'è ambiguità, non c'è "non ha registrato".

**D. Il tempo in aria è tolleranza.** Due secondi di volo significa che il
giocatore ha due secondi per decidere; e la parte lenta in cima alla parabola
significa che il momento più facile per colpire coincide col momento in cui
l'oggetto è più visibile. È tolleranza progettata per assomigliare ad abilità.

## 11.3 Il core loop

> **Taglio ciò che deve essere separato, lascio cadere il resto, prima che tocchi
> terra.**

Il vincolo temporale è la caduta. La decisione è **cosa** tagliare. La
conseguenza è geometrica e immediata.

Perché regga come loop didattico, la decisione "cosa tagliare" deve richiedere
il concetto e nient'altro. Questo è tutto il capitolo, e §11.9 spiega come si
sbaglia.

## 11.4 Comandi

| Comando | Input touch | Input desktop | Sblocco |
|---|---|---|---|
| taglia | trascina il dito | tieni premuto e muovi | subito |
| non tagliare | non fare niente | non fare niente | subito (è la scelta, non un comando) |
| taglio doppio | due tratti rapidi in sequenza | idem | beat 3, quando serve separare due cose insieme |

Massimo due comandi. La grandezza dell'archetipo è che **la non-azione è
un'azione**: lasciar cadere è una decisione, e ha una conseguenza visibile.
Questo va sfruttato — è la parte che porta il contenuto.

Dettagli di riconoscimento del gesto:
- si campiona la posizione ogni frame e si tiene una coda di 12 punti;
- l'intersezione si calcola come segmento fra il punto corrente e il precedente
  contro il rettangolo dell'oggetto, **non** come distanza dal centro (un tocco
  fermo sull'oggetto non deve tagliare: serve movimento);
- velocità minima del gesto: 220 px/s. Sotto, non taglia. Serve perché il gesto
  deve *essere* un taglio, non uno sfioramento;
- tolleranza: si allarga il rettangolo dell'oggetto di 12 px su ogni lato per il
  touch, 4 px per il mouse.

## 11.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Tempo in volo | 2,1 s → 1,5 s (beat 1 → 4) | mai sotto 1,8 s se c'è da **leggere** l'oggetto |
| Altezza dell'apice | 62% dell'altezza schermo | oltre, l'oggetto esce e si perde |
| Hang time (rallentamento in cima) | ×0,72 sulla velocità verticale nel 20% centrale | il trucco principale |
| Oggetti contemporanei | 1 → 4 | oltre 4 diventa mietitura e la scelta scompare |
| Intervallo di lancio | 2,2 s → 1,2 s | |
| Durata scia | 260 ms | più corta e il gesto non si legge, più lunga e sporca lo schermo |
| Velocità minima gesto | 220 px/s | |
| Hit-stop sul taglio | 45 ms | (`02` §2.3) |
| Frammenti per taglio | 2 metà + 6-10 particelle | |
| Rotazione delle metà | ±(90-220)°/s, casuale, opposta fra le due | |

## 11.6 Manopole della difficoltà

In ordine di quanto è sicuro girarle:

1. **Intervallo di lancio** (sicura) — più oggetti al minuto, stessa decisione.
2. **Numero di oggetti in aria insieme** (sicura fino a 4).
3. **Tempo di volo** (attenzione: sotto 1,8 s con lettura si passa a indovinare).
4. **Somiglianza fra le categorie** (la manopola *didattica*: rendere gli
   oggetti da tagliare e non tagliare più difficili da distinguere concettualmente
   — mai visivamente).
5. **Oggetti che vanno tagliati in un ordine** (nuovo asse: aggiunge
   ordinamento al contenimento; usare solo se il concetto lo richiede).
6. **Traiettorie irregolari** (evitare: rende il fallimento del gioco, non tuo).

La manopola 4 è quella che si gira nei beat 2-3. Le altre sono ritmo.

## 11.7 Juice specifico

Dal capitolo `02`, applicato a questo archetipo:

- **Anticipazione del lancio**: 180 ms prima che l'oggetto entri, un piccolo
  sbuffo/rumore dal punto di uscita. Rende il lancio prevedibile senza renderlo
  facile.
- **Il taglio va sentito nell'audio prima che nella grafica**: il suono a 0 ms,
  la separazione delle metà a 45 ms (dopo l'hit-stop).
- **Le metà non cadono uguali**: masse diverse, rotazioni opposte, velocità
  divergenti di 15-40°.
- **La scia ha una coda che assottiglia**: larghezza da 6 px alla punta a 0 px in
  fondo, opacità in caduta quadratica.
- **Il mancato taglio non è silenzioso**: quando un oggetto che andava tagliato
  tocca terra, tonfo sordo e la superficie trema di 3 px. È la conseguenza, e va
  vista.
- **Combo**: se un tratto ne prende 2+, l'hit-stop si somma (45 + 25 ms) e il
  tempo rallenta a ×0,6 per 200 ms. Il rallentamento sulla combo è il premio più
  efficace che esista in questo archetipo.
- **Niente numeri che volano via** dai tagli. Rovinano lo schermo e non
  insegnano niente.

## 11.8 Come si rovina

**1. Il codice colore.** Frutta verde da tagliare, bombe nere da schivare. Se le
due categorie hanno colori diversi, il giocatore non guarda mai il contenuto. È
esattamente l'errore che ho fatto in Lama, e uccide il gioco come strumento
didattico pur lasciandolo divertente. **Le due categorie devono essere
visivamente indistinguibili** e differire solo per ciò che c'è scritto/mostrato
sopra.

**2. Troppa roba in aria.** Sopra 4-5 oggetti il giocatore taglia tutto con un
gesto ampio e la decisione scompare. Se il gioco premia il gesto ampio, non è
più un gioco di scelta.

**3. Tempo di volo troppo corto con testo da leggere.** Sotto 1,8 s il giocatore
non legge: memorizza le sagome. Da quel momento il gioco misura la memoria
visiva, non la comprensione.

**4. Punizione per il taglio sbagliato senza conseguenza fisica.** "−1 vita" è
un contatore. La conseguenza giusta è che l'oggetto tagliato per errore fa
**quello che farebbe nel concetto**: se hai tagliato una cosa che non andava
separata, quella cosa si rompe e si vede che serviva intera.

**5. La combo come unico obiettivo.** Se la combo vale molto più della
precisione, il giocatore taglia a caso in mezzo al gruppo.

**6. Oggetti che entrano dai lati o dall'alto.** L'ingresso dal basso è la
convenzione che rende la parabola leggibile. Cambiarlo per varietà rende il gioco
imprevedibile e sembra un difetto.

## 11.9 Quali concetti Node.js può portare

L'archetipo porta bene le forme **contenimento**, **identità**,
**irreversibilità**. Male le forme **ordinamento** e **dipendenza**.

Il criterio è uno: lo slash è un gesto **binario e istantaneo** su un oggetto
singolo. Quindi porta concetti che sono "questo sì, questo no", e non porta
concetti che sono "questo prima di quello".

| Livello / concetto | Va? | Come |
|---|---|---|
| L2 Runtime: cosa esiste in Node e cosa no | ✅ ottimo | tagli gli attrezzi che il tuo ambiente possiede; gli altri li lasci cadere. Perdere = `ReferenceError` = la macchina si spegne |
| L4 ESM vs CommonJS: cosa è importabile | ✅ | separi ciò che il modulo esporta da ciò che tiene privato |
| L8 Errori: cosa si può catturare | ✅ | tagli (catturi) le eccezioni; le rejection non gestite passano e ti spengono il processo |
| L11 Sicurezza: input da sanificare | ✅ ottimo | tagli l'input pericoloso; ma tagliare quello innocuo rompe la funzionalità (conseguenza doppia) |
| L14 Buffer/encoding: byte validi | ✅ | separi sequenze valide da invalide |
| L3 CommonJS: cache di `require` | ❌ | è identità *nel tempo*, serve memoria fra due eventi: lo slash non ha memoria |
| L7 Promise: ordine di risoluzione | ❌ | è ordinamento: usa `16-lane-sorting` |
| L9 Event loop: precedenza | ❌ | è precedenza fra code: serve un archetipo con corsie |
| L5 npm: albero delle dipendenze | ❌ | è dipendenza: usa `15-stacking` |

Nota sul caso L11: è il migliore di tutti perché la conseguenza è **a doppio
taglio** (tagliare troppo rompe l'app, tagliare troppo poco la espone). Un
concetto che ha due modi di sbagliare in direzioni opposte è oro per questo
archetipo, perché il giocatore non può cavarsela con una politica prudente.

## 11.10 Esempio lavorato — Node L2, capitolo 3, "L'officina di notte"

Scheda compilata secondo `00` §0.3.

```
GIOCO ........... L'officina di notte
LIVELLO ......... Node.js, L2 Runtime, banda 1
CAPITOLO ........ 3 di 8 — fs, path, os, process, l'assenza di window/document

CONCETTO ........ Lo stesso codice, in due posti diversi, ha attrezzi diversi.
                  Se chiedi un attrezzo che lì non c'è, si ferma tutto.
FORMA ........... contenimento
VERBO ........... afferrare (taglio = presa al volo)
ARCHETIPO ....... 11 slash — Fruit Ninja

VINCI SE ........ il pezzo in lavorazione è finito e il motore è ancora acceso
PERDI SE ........ afferri un attrezzo che il tuo bancone non possiede:
                  il motore si spegne, buio, il pezzo resta a metà
SBAGLI → ........ 1: la mano passa attraverso, l'attrezzo cade e si sente
                  2: il bancone si illumina per 400 ms mostrando cosa contiene
                  3: coaching a quattro righe con l'attrezzo accanto al bancone

BEAT 1 .......... solo attrezzi presenti; uno per volta; impossibile perdere
BEAT 2 .......... entra il primo attrezzo assente (document.querySelector)
BEAT 3 .......... FRATTURA: arriva fetch — sembra roba da browser, in Node c'è.
                  Chi lo lascia cadere per prudenza non finisce il pezzo
BEAT 4 .......... tre in aria, presenti e assenti mescolati, 1,5 s di volo
BEAT 5 .......... tutto insieme a 2,1 s: la mano in cui ti senti veloce

MONDO ........... officina di notte, un bancone, luce calda dall'alto, gli
                  attrezzi volano su dal buio in basso
NUMERI .......... da 31: volo 2,1→1,5 s, hang ×0,72, hit-stop 45 ms,
                  scia 260 ms, max 3 in aria (non 4: i manici vanno letti)

TEST 1 .......... i manici sono tutti dello stesso legno, stessa silhouette
                  di famiglia; l'unico segnale è il nome stampato sul manico,
                  cioè il concetto. Nessuna scorciatoia di colore/posizione/forma
TEST 2 .......... "Afferro al volo solo gli attrezzi che il mio bancone
                  possiede, prima che il pezzo si fermi"
TEST 3 .......... un attrezzo sale dal buio verso una mano già aperta; a tre
                  secondi il giocatore ha già fatto il gesto
```

### Contenuto delle 5 lezioni

| Beat | Attrezzi presenti (da afferrare) | Attrezzi assenti (da lasciare) |
|---|---|---|
| 1 | `fs`, `path` | — |
| 2 | `fs`, `path`, `os` | `document` |
| 3 | `fetch`, `process`, `path` | `window`, `localStorage` |
| 4 | `fs`, `os`, `process`, `Buffer`, `fetch` | `document`, `alert`, `window` |
| 5 | tutti i presenti visti | tutti gli assenti visti |

### Perché passa il TEST 1, in dettaglio

Elenco di tutti i segnali sullo schermo (procedura `00` §0.4):

| Segnale | Vincerei guardando solo questo? |
|---|---|
| colore del manico | no: identico per tutti |
| silhouette | no: quattro sagome, distribuite fra presenti e assenti |
| lato d'ingresso | no: casuale |
| altezza dell'apice | no: casuale ±8% |
| ritmo di lancio | no: jitter ±15% |
| **nome stampato sul manico** | **sì — ed è il concetto** |

Un solo segnale utile, e coincide con ciò che si deve imparare. Questa tabella è
ciò che significa "integrazione intrinseca" in pratica, ed è l'unica prova
accettabile che un gioco la abbia.

### La variante del beat 3, in dettaglio

Il beat 3 merita una descrizione perché è dove sta la lezione.

Il giocatore, arrivato al beat 3, ha una politica: "roba di file e sistema = mia,
roba di pagina web = non mia". La politica funziona nei beat 1 e 2, e questo è
voluto: il gioco la rinforza per due minuti prima di romperla.

Al beat 3 sale `fetch`. Il giocatore ha 2,2 s. Cosa fa:

- se lo lascia cadere (prudenza), il pezzo non viene finito → non perde una
  vita, ma **non vince la mano**: la conseguenza è l'incompletezza, non la
  punizione;
- se lo afferra, il motore continua e sente un suono di conferma più caldo del
  solito (questo è il momento in cui il gioco premia l'aver *sbagliato* la
  politica in senso giusto).

Alla mano successiva `fetch` torna. Ora il giocatore sa. E la cosa che sa non è
un'informazione: è una **revisione della regola** che si era costruito. È
questa la differenza fra un gioco che insegna e un gioco che verifica.

### Cosa NON mettere in questo gioco

- barra del tempo (il pezzo in lavorazione è il timer, e si vede);
- punteggio numerico che vola;
- pulsante di pausa in un angolo (`33`: la pausa è un gesto, non un bottone
  nell'inquadratura);
- schermata "Livello 2 — Il runtime";
- verde/rosso in qualunque punto dello schermo, per nessun motivo.
