# 13 — Un tasto solo (one-button)

> Riferimento: Flappy Bird (2013), Jetpack Joyride, Doodle Jump. Un solo input,
> nessuna scelta di *cosa* fare, solo di *quando*. L'archetipo del ritmo e della
> precisione temporale.

---

## 13.1 Come funziona l'originale

Un tocco = un impulso verso l'alto. La gravità è sempre attiva. Non c'è nessun
altro comando: né sinistra, né destra, né fermarsi. Gli ostacoli sono coppie di
tubi con un varco, distanziati regolarmente, e la posizione del varco è casuale.
La collisione uccide istantaneamente.

Numeri di Flappy Bird, misurati:
- gravità ~1100 px/s²;
- impulso del salto ~−330 px/s (istantaneo, sostituisce la velocità, non la
  somma);
- distanza fra le coppie di tubi: ~1,4 s di volo;
- ampiezza del varco: ~3,5 volte l'altezza dell'uccello;
- rotazione dell'uccello legata alla velocità verticale (in su = muso in alto, in
  giù = picchiata progressiva).

Il dettaglio importante: **l'impulso sostituisce la velocità**. Non si accumula.
Questo rende il controllo prevedibile — lo stesso tocco produce sempre lo stesso
arco, indipendentemente da come stavi cadendo. Se l'impulso si sommasse, il gioco
sarebbe ingiocabile.

## 13.2 Perché funziona

**A. Non c'è niente da imparare.** Un input. Il tempo di apprendimento è zero, e
tutto il tempo del giocatore va nella maestria del *timing*.

**B. La colpa è sempre e solo del giocatore.** Con un input non esiste "ho
premuto il tasto sbagliato". Ogni morte è chiaramente attribuibile, e questo è ciò
che produce il "ancora una volta" compulsivo.

**C. La partita è brevissima.** 15-40 secondi. Il costo di morire è quasi zero,
quindi il numero di tentativi al minuto è altissimo — e più tentativi significa
più occasioni di imparare.

**D. La difficoltà è nel corpo, non nella testa.** Questa è la proprietà da
tenere presente per noi: è un archetipo **motorio**, non cognitivo. Ed è un
problema, perché noi dobbiamo insegnare cose cognitive. §13.9 spiega come si
risolve.

## 13.3 Il core loop

> **Premo al momento giusto perché la cosa che scende incontri il varco giusto.**

Un input, un vincolo continuo (la gravità), una conseguenza istantanea.

## 13.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| impulso | tocco (qualsiasi punto) | spazio o clic | subito |

Uno. Non due. Se serve un secondo comando, l'archetipo è sbagliato.

Dettagli:
- il tocco vale in **qualsiasi punto** dello schermo, senza eccezioni e senza
  zone morte;
- l'impulso **sostituisce** la velocità verticale, non la somma;
- il tocco tenuto non fa niente di più di un tocco singolo (nessun volo
  continuo);
- input buffer 120 ms: un tocco appena prima di una collisione evitabile viene
  ancora considerato. Qui il buffer è corto — con un input solo, un buffer lungo
  fa perdere il senso di controllo.

## 13.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Gravità | 1150 px/s² (su schermo 720 px di alt.) | scalare con l'altezza dello schermo |
| Impulso | −340 px/s | rapporto impulso/gravità ≈ 0,30 s di risalita |
| Velocità di caduta massima | 620 px/s | il cap rende la caduta prevedibile |
| Distanza fra ostacoli | 1,6 s → 1,1 s | più generoso dell'originale: noi abbiamo contenuto da leggere |
| Ampiezza del varco | 4,2× l'altezza del personaggio → 3,2× | |
| Delta verticale max fra varchi consecutivi | 42% dell'altezza utile | oltre, la sequenza diventa impossibile |
| Hit-stop sull'impatto | 110 ms | |
| Riavvio | 600 ms, nessuna schermata | |
| Rotazione del personaggio | −22° in salita → +75° in picchiata, easing | fa metà del game feel |

### La regola dei varchi consecutivi

Il vincolo sul delta verticale (42%) è quello che rende il gioco *giusto*: due
varchi consecutivi non possono essere così distanti che nessuna traiettoria li
colleghi. Si verifica in modo semplice: dopo aver generato un varco, si controlla
che esista almeno una sequenza di 0, 1 o 2 tocchi che porta dal varco precedente
al nuovo. Se non esiste, si rigenera.

Senza questo controllo il gioco genera occasionalmente sequenze impossibili, e il
giocatore le sente come tradimento.

## 13.6 Manopole della difficoltà

1. **Ampiezza del varco** (la manopola principale, sicura).
2. **Distanza fra gli ostacoli** (= tempo per decidere).
3. **Delta verticale fra varchi** (entro il 42%).
4. **Difficoltà concettuale di quale varco è quello giusto** (la manopola
   didattica: vedi §13.9).
5. **Varchi multipli** di cui uno solo corretto (aggiunge scelta a timing: è il
   modo di rendere l'archetipo cognitivo).
6. Velocità di scorrimento (sconsigliata: riduce il tempo di lettura).

## 13.7 Juice specifico

- **La rotazione del personaggio è metà del gioco.** Muso in alto quando sale,
  picchiata progressiva quando cade. Senza, il personaggio sembra un
  ascensore.
- **L'impulso ha una spinta visibile**: uno sbuffo sotto, un piccolo squash
  (scala 1,12 / 0,90) che rientra in 100 ms.
- **Il passaggio nel varco si sente**: un fruscio, e la superficie del varco
  vibra leggermente. Passare va premiato ogni volta, non solo alla decima.
- **La camera anticipa la caduta**: sposta il centro 20 px verso il basso quando
  la velocità verticale è positiva, per mostrare più futuro.
- **La morte è forte**: hit-stop 110 ms, tutto si ferma, il personaggio ruota e
  cade fuori schermo, silenzio breve. Poi riavvio.
- **Il conteggio non è un numero in alto**: sono gli ostacoli passati che
  restano visibili dietro, e si accumulano.

## 13.8 Come si rovina

**1. L'impulso che si somma.** Rende il controllo imprevedibile. Il tocco deve
sostituire la velocità.

**2. Zone morte per il tocco.** Un pulsante da centrare invece di tutto lo
schermo. Uccide il gioco su mobile.

**3. Un secondo comando.** Se aggiungi "scivola", non è più questo archetipo e
perdi la proprietà B (colpa sempre del giocatore).

**4. Varchi impossibili.** Vedi §13.5. Il controllo va implementato, non
sperato.

**5. Testo da leggere in un varco che arriva in 1,1 s.** L'errore fatale
nell'uso didattico: se il varco giusto è indicato da un'etichetta di testo e il
tempo è quello di Flappy, il giocatore non legge. Con testo da leggere, la
distanza minima fra ostacoli è **1,8 s** (regola 3 della mappa).

**6. Schermata di game over con punteggio, medaglia e pulsanti.** Ogni schermata
fra la morte e il retry riduce i tentativi. 600 ms e via.

**7. Il personaggio che occupa mezzo schermo.** Serve vedere il futuro.

## 13.9 Quali concetti Node.js può portare

Attenzione: questo è l'archetipo **meno adatto** al contenuto didattico, perché
la sua difficoltà è motoria. Preso così com'è, insegna solo il timing.

Diventa utilizzabile con una modifica strutturale precisa:

> **Il varco non è uno: sono due o tre, verticalmente, e uno solo è quello
> giusto secondo il concetto.**

Così il gioco chiede due cose insieme: *quale* varco (cognitivo) e *quando*
premere (motorio). La distanza fra ostacoli sale a 1,8 s per dare tempo di
leggere, e il varco giusto va scelto guardando ciò che porta il concetto.

Con questa modifica:

| Livello / concetto | Va? | Come |
|---|---|---|
| L6 Callback: sincrono vs asincrono | ✅ ottimo | tre varchi: "ora", "dopo", "mai". Ogni operazione che arriva va infilata nel varco del *quando* verrà eseguita |
| L9 Event loop: le fasi | ✅ | i varchi sono le fasi (timers, poll, check); ogni operazione entra nella sua fase |
| L7 Promise: stati | ✅ | tre varchi: pending, fulfilled, rejected. E una volta passato non si torna (irreversibilità = perfetta per un archetipo dove non puoi tornare indietro) |
| L13 Eventi: listener una volta o sempre | ⚠️ | funziona ma è sottile |
| L2 Runtime | ❌ | contenimento, serve ispezione: `11-slash` |
| L5 npm | ❌ | dipendenza: `15-stacking` |
| L10 Stream | ❌ | è un flusso lungo, serve `12-runner` |

**Il caso L7 merita una nota.** L'irreversibilità è la proprietà nativa di questo
archetipo: nel one-button non puoi tornare indietro, non puoi fermarti, e una
volta che sei passato da un varco quello è. Una Promise ha esattamente la stessa
proprietà: una volta risolta o rigettata, è settled per sempre. L'accoppiamento
fra la meccanica e il concetto qui non è un'analogia, è la stessa struttura — che
è la definizione di integrazione intrinseca (`01` §1.2, condizione B).

## 13.10 Esempio lavorato — Node L7, capitolo 6, "Il tunnel delle promesse"

```
GIOCO ........... Il tunnel delle promesse
LIVELLO ......... Node.js, L7 Promise, banda 2
CAPITOLO ........ 6 di 8 — una promessa si risolve una volta sola

CONCETTO ........ Una volta che una cosa in attesa ha detto sì o no, quella
                  risposta è definitiva. Non si cambia, non si ripete.
FORMA ........... irreversibilità
VERBO ........... premere al momento giusto (impulso)
ARCHETIPO ....... 13 one-button — Flappy Bird, con varchi multipli

VINCI SE ........ tutte le operazioni del capitolo trovano il loro varco
PERDI SE ........ passi dal varco sbagliato: la parete si chiude dietro di te
                  e la strada davanti non c'è più. Non muori d'urto —
                  resti chiuso, che è peggio e è il concetto
SBAGLI → ........ 1: rimbalzi, mezzo secondo perso, il tunnel continua
                  2: il varco giusto pulsa una volta 700 ms prima
                  3: dopo la chiusura, replay: si vede la parete sigillarsi
                     e il tentativo di ripassare che non funziona

BEAT 1 .......... un varco solo, largo: si impara il tocco
BEAT 2 .......... due varchi, "risolta" e "in attesa"
BEAT 3 .......... FRATTURA: un'operazione già risolta ripassa. L'istinto è
                  rimandarla nel suo varco. Ma è già passata: il suo varco
                  è murato. Va nel condotto di scarico
BEAT 4 .......... tre varchi, 1,8 s, operazioni mescolate
BEAT 5 .......... tutti i casi, 2,2 s

MONDO ........... condotto pneumatico verticale, banda 2: metallo, quadranti,
                  targhette di ottone incise con i nomi veri sopra ogni varco
NUMERI .......... da 31: gravità 1150, impulso −340, distanza 1,8 s (c'è da
                  leggere: mai sotto), varco 4,2× → 3,4×, hit-stop 110 ms
TEST 1 .......... i tre varchi sono identici (stesso ottone, ordine verticale
                  casuale a ogni ostacolo); l'unico segnale è la targhetta
                  e lo stato dell'operazione che porti. Nessuna scorciatoia
TEST 2 .......... "Infilo ogni operazione nel varco del suo stato, prima che
                  il condotto la superi"
TEST 3 .......... si cade già; un varco largo arriva; il primo tocco lo
                  scopre in due secondi
```

### Le 5 lezioni

| Beat | Varchi | Operazioni che arrivano | Frattura |
|---|---|---|---|
| 1 | 1 | qualsiasi | — |
| 2 | 2: `pending` / `fulfilled` | attesa, risolta | — |
| 3 | 2 + scarico | **una già risolta che ritorna** | "una promessa può cambiare idea" → no |
| 4 | 3: `pending`/`fulfilled`/`rejected` | tutte | — |
| 5 | 3 + scarico | tutte, più lento | — |

### Nota sulla modifica strutturale

Vale la pena essere espliciti su cosa è cambiato rispetto a Flappy Bird, perché è
il modello per usare qualsiasi archetipo motorio a scopo didattico:

| Flappy Bird | Il tunnel delle promesse |
|---|---|
| un varco, va centrato | tre varchi, uno è corretto |
| difficoltà = ampiezza del varco | difficoltà = ampiezza **+** quale scegliere |
| 1,4 s fra ostacoli | 1,8 s (serve tempo per leggere) |
| morire = urto | morire = restare chiuso dietro una parete sigillata |
| il varco non significa niente | il varco è lo stato della Promise |

La regola generale: **un archetipo motorio si rende cognitivo moltiplicando le
opzioni corrette in una dimensione ortogonale al timing**, e allungando il tempo
per compensare. Non si rende cognitivo aggiungendo domande fra le partite.
