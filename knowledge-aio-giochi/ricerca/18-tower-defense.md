# 18 — Difesa a torri (tower defense)

> Riferimento: Plants vs. Zombies (2009), Bloons TD, Kingdom Rush. Si costruisce
> una configurazione, poi si guarda funzionare. L'archetipo della causa e
> dell'effetto differiti.

---

## 18.1 Come funziona

Nemici percorrono un tracciato. Il giocatore piazza difese lungo il tracciato,
spendendo una risorsa che si accumula. Le difese agiscono da sole. Le ondate
arrivano a intervalli, con composizioni diverse, e ogni composizione richiede una
configurazione diversa.

Struttura in due tempi, ed è la cosa che definisce l'archetipo:

1. **fase di costruzione** — tempo per pensare, nessuna pressione;
2. **fase di esecuzione** — la configurazione si dimostra da sé, e il giocatore
   guarda (con interventi minimi).

Numeri:
- costo/beneficio: ogni difesa costa 2-4 ondate di risorsa accumulata;
- durata di un'ondata: 20-40 s;
- pausa fra ondate: 8-15 s (la fase di costruzione);
- numero di tipi di difesa: 5-8 in tutto il gioco, sbloccati uno per ondata.

## 18.2 Perché funziona

**A. La decisione e la conseguenza sono separate nel tempo.** Piazzi una difesa e
scopri se era giusta trenta secondi dopo. Questo è raro nei giochi e prezioso per
noi: è il modello di come funziona **progettare** invece di reagire.

**B. Guardare è una ricompensa.** La fase di esecuzione è passiva e piacevole: la
tua configurazione lavora per te. È la soddisfazione dell'ingegnere, e non
assomiglia a nessun'altra.

**C. Il fallimento è diagnosticabile.** Quando un'ondata passa, si vede
esattamente **dove** ha passato e **cosa** non l'ha fermata. La conseguenza è
localizzata, quindi il correttivo è ovvio.

**D. La composizione dell'ondata è un indovinello.** Se l'ondata che arriva
contiene tre tipi di nemico, la configurazione giusta è una risposta a un
problema specifico. Ogni ondata è un piccolo enigma di progetto.

La proprietà A e la C insieme fanno di questo archetipo l'unico adatto a insegnare
concetti **architetturali**: quelli in cui una decisione presa adesso ha
conseguenze visibili solo sotto carico. È la sicurezza informatica, sono le
prestazioni, è la gestione degli errori.

## 18.3 Il core loop

> **Configuro le difese perché l'ondata che sta arrivando venga fermata dalla
> struttura, non da me.**

## 18.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| piazza | trascina dalla riserva alla posizione | trascina o clic-clic | subito |
| rimuovi | tocco prolungato | tasto destro | beat 2 |
| potenzia | tocco su una difesa piazzata | clic | beat 3 |
| accelera l'ondata | tocco sul pulsante di avanzamento | spazio | beat 1 (impazienza) |

L'acceleratore va sbloccato **subito**, non come premio: un giocatore che ha già
capito non deve aspettare. Regola generale: mai far attendere chi ha capito.

## 18.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Fase di costruzione | 10 s → 6 s | mai a zero: la riflessione è l'archetipo |
| Durata di un'ondata | 22 s → 40 s | |
| Posizioni di piazzamento | 6 → 14 | limitate: la scarsità è il gioco |
| Tipi di difesa disponibili | 1 → 5 | uno per beat, mai due insieme |
| Risorsa per ondata | costante | il ritmo di accumulo non va reso casuale |
| Costo di una difesa | 1,5 ondate di risorsa | così ogni ondata è una scelta |
| Vite | 3 fughe | la terza fuga chiude il turno |
| Velocità dei nemici | 1 posizione / 1,6 s | va letta camminando |

### La regola dello slot scarso

Le posizioni di piazzamento sono **meno** delle difese che vorresti mettere. Se
ce ne sono a sufficienza, il gioco diventa "metti tutto ovunque" e non c'è
progetto. Il rapporto giusto: posizioni ≈ 60% di ciò che servirebbe per coprire
tutto.

## 18.6 Manopole della difficoltà

1. **Composizione dell'ondata** (la principale e la più interessante: non più
   nemici, nemici *diversi*).
2. **Numero di posizioni disponibili** (scarsità).
3. **Nemici che ignorano un tipo di difesa** (la manopola didattica: obbliga a
   capire il *perché* di ogni difesa).
4. **Percorsi multipli**.
5. **Ondate composite** (due tipi insieme che si proteggono a vicenda).
6. Più nemici dello stesso tipo (**la manopola noiosa**: da evitare, produce
   difficoltà senza pensiero).

## 18.7 Juice specifico

- **La fase di costruzione ha un suo stato visivo**: il mondo è in pausa, la luce
  è diversa, il tempo è dichiaratamente sospeso. Il passaggio all'esecuzione è un
  evento: un suono, la luce che torna, il primo nemico che entra.
- **Ogni difesa ha un raggio visibile** quando la si tiene in mano, e le
  sovrapposizioni si vedono. Progettare richiede vedere la copertura.
- **L'ondata in arrivo va mostrata prima**: la composizione della prossima ondata
  è visibile durante la costruzione. Senza, il gioco è indovinare.
- **Il colpo che ferma un nemico è netto**: hit-stop 40 ms sul nemico, non sulla
  scena (con dieci nemici in campo, fermare tutto sarebbe caos).
- **Il nemico che passa è la cosa più visibile del gioco**: rallenta, la camera
  lo segue mezzo secondo, il varco che ha usato resta segnato. Il fallimento
  deve essere diagnosticabile (proprietà C).
- **La fine di un'ondata è un respiro**: 1,5 s di silenzio, poi la costruzione.
- **Nessuna barra della vita sui nemici**: il danno si legge dall'aspetto.

## 18.8 Come si rovina

**1. Ondate che crescono solo in quantità.** La manopola 6. Produce partite più
lunghe, non più interessanti.

**2. Posizioni illimitate.** Vedi §18.5.

**3. Ondata successiva non annunciata.** Se non si sa cosa arriva, la
configurazione è una scommessa e la proprietà D svanisce.

**4. Difese generiche.** Se tutte le difese fanno la stessa cosa con numeri
diversi, non c'è progetto: c'è aritmetica. **Ogni difesa deve rispondere a una
minaccia specifica**, e nel nostro caso quella corrispondenza è il contenuto
didattico.

**5. Il giocatore che deve intervenire durante l'ondata.** Se l'esecuzione
richiede micro-gestione, la proprietà B (guardare è una ricompensa) svanisce e il
gioco diventa un time-management peggiore.

**6. Nessun modo di correggere.** Se una configurazione sbagliata non si può
smontare, l'ondata è persa in anticipo e le fasi successive sono tempo perso.

**7. Fase di costruzione a tempo zero.** Se non c'è tempo di pensare, l'archetipo
è sbagliato: usane un altro.

## 18.9 Quali concetti Node.js può portare

Porta bene **dipendenza**, **instradamento**, **accumulo**, **trasformazione**.
Male **ordinamento**, **identità**.

Il criterio: la difesa a torri riguarda le **decisioni architetturali sotto
carico**. Porta tutto ciò che si progetta prima e si paga dopo.

| Livello / concetto | Va? | Come |
|---|---|---|
| L11 Sicurezza | ✅ perfetto | le ondate sono classi di attacco (injection, XSS, brute force, path traversal); ogni difesa è un controllo specifico (validazione, escaping, rate limit, allowlist). Mettere il controllo sbagliato contro l'attacco sbagliato non ferma niente |
| L12 HTTP: middleware | ✅ ottimo | le difese **sono** i middleware, e l'ordine lungo il percorso conta: l'autenticazione prima del parsing, il rate limit prima di tutto |
| L19 Prestazioni: cache e limiti | ✅ | le difese sono cache, pool di connessioni, limiti; il carico è l'ondata |
| L8 Errori: dove si mettono i try/catch | ✅ | il percorso è il flusso di esecuzione, le difese sono i gestori d'errore, e un errore che passa tutto spegne il processo |
| L20 Deploy: monitoraggio e resilienza | ✅ | |
| L5 npm | ⚠️ | funziona come "quali dipendenze introduci e cosa ti portano dentro" — buono per il capitolo sicurezza delle dipendenze |
| L7 Promise | ❌ | ordinamento: `16-lane-sorting` |
| L15 Coercizione | ❌ | identità: `14-match-3` |

**Il caso L11 è la ragione per cui questo capitolo esiste.** La sicurezza è
esattamente un problema di tower defense: non sai quando arriverà l'attacco, sai
che le tue difese devono già essere in posizione, e una difesa messa al posto
sbagliato non serve a niente. La corrispondenza fra classe di attacco e controllo
appropriato — che nella teoria è una tabella da memorizzare — qui diventa una
verifica sperimentale: metti il rate limit contro una SQL injection e la vedi
passare.

E c'è la lezione strutturale che nessun altro archetipo può dare: **la difesa in
profondità**. Un solo controllo, anche giusto, non basta; servono due o tre livelli
lungo il percorso. In un tower defense questo non si spiega, si scopre alla terza
ondata.

## 18.10 Esempio lavorato — Node L11, capitolo 5, "Il perimetro"

```
GIOCO ........... Il perimetro
LIVELLO ......... Node.js, L11 Sicurezza, banda 2
CAPITOLO ........ 5 di 8 — a ogni classe di attacco il suo controllo

CONCETTO ........ Ogni tipo di attacco passa da una porta diversa. Un controllo
                  fermo la sua porta e nessun'altra. Metterne uno solo, o
                  metterlo nel posto sbagliato, è come chiudere una finestra
                  e lasciare la porta aperta.
FORMA ........... instradamento
VERBO ........... piazzare (configurare il percorso)
ARCHETIPO ....... 18 tower defense — Plants vs. Zombies

VINCI SE ........ l'ondata passa attraverso il percorso e non arriva niente
                  al cuore del sistema
PERDI SE ........ tre richieste malevole arrivano al cuore: i dati escono.
                  Non un punteggio: si vede *cosa* è uscito
SBAGLI → ........ 1: la richiesta passa il controllo sbagliato senza reagire,
                  e si vede che il controllo non l'ha nemmeno guardata
                  2: alla successiva dello stesso tipo, il controllo giusto
                     nella riserva pulsa una volta
                  3: dopo la perdita, la richiesta viene rimostrata al
                     rallentatore accanto al controllo che l'avrebbe fermata

BEAT 1 .......... un tipo di attacco, un tipo di controllo: si impara a piazzare
BEAT 2 .......... due tipi; il controllo sbagliato non ferma nulla
BEAT 3 .......... FRATTURA: un attacco che passa il primo controllo perché è
                  formalmente valido, e colpisce dopo. L'istinto è "se ha
                  passato la validazione è sicuro". Serve un secondo livello
                  più a valle: la difesa in profondità
BEAT 4 .......... quattro classi di attacco, otto posizioni, ondate composite
BEAT 5 .......... tutti i casi, costruzione più lunga

MONDO ........... schema del sistema visto dall'alto, banda 2: condotti,
                  valvole, targhette incise con i nomi veri dei controlli
                  (validate, escape, rate-limit, allowlist)
NUMERI .......... da 31: costruzione 10 s → 6 s, ondata 22 s → 40 s,
                  posizioni 6 → 12 (60% del necessario), difese 1 → 4,
                  velocità nemici 1 posizione / 1,6 s, 3 fughe
TEST 1 .......... le richieste sono identiche di aspetto (stessa busta, stesso
                  formato); l'unico segnale è **il contenuto**, che è la classe
                  di attacco, cioè il concetto. Nessun colore, nessuna forma
                  che tradisca la classe
TEST 2 .......... "Piazzo il controllo giusto nel punto giusto del percorso,
                  prima che l'ondata arrivi"
TEST 3 .......... la fase di costruzione apre con una posizione che pulsa e
                  un controllo in mano: il primo trascinamento è ovvio
```

### Le 5 lezioni

| Beat | Attacchi | Controlli disponibili | Frattura |
|---|---|---|---|
| 1 | input troppo lungo | limite di lunghezza | — |
| 2 | + caratteri di controllo | + validazione formato | — |
| 3 | payload formalmente valido | + escaping in uscita | **"validato = sicuro"** |
| 4 | + tentativi ripetuti, + percorsi | + rate limit, + allowlist | — |
| 5 | tutti | tutti | — |

### Perché la frattura del beat 3 è la lezione più importante di tutto il livello

La convinzione da smontare è la più diffusa e la più costosa nella sicurezza
reale: *se un input ha passato la validazione, è sicuro.*

Il gioco la costruisce nei beat 1 e 2, dove la validazione ferma tutto. Poi, al
beat 3, arriva una richiesta il cui contenuto è formalmente perfetto — lunghezza
giusta, caratteri ammessi, struttura valida — e che diventa pericolosa solo **più
a valle**, quando viene usata. La validazione la guarda, la approva, e la lascia
passare. Il giocatore vede il proprio controllo funzionare correttamente e perdere
comunque.

L'unica difesa è un secondo controllo più a valle, in un punto diverso del
percorso. Non un controllo *migliore*: un controllo **altrove**. Questa è la
difesa in profondità, ed è un concetto che di norma si impara dopo il primo
incidente vero. Qui si impara in quaranta secondi, e si impara come una sorpresa —
che è il modo in cui le cose restano.
