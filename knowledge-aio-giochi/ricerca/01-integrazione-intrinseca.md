# 01 — Integrazione intrinseca

> Il capitolo più importante di tutta la ricerca. Se questo non è chiaro, il resto
> serve solo a rendere carino un gioco che non insegna niente.

---

## 1.1 Il problema: i broccoli ricoperti di cioccolato

L'espressione è di Amy Bruckman (1999) e descrive il difetto strutturale di
quasi tutto il software educativo: il gioco viene usato come **motivazione
estrinseca**, cioè come glassa zuccherina sopra il contenuto, o come premio
separato da guadagnarsi dopo aver fatto l'esercizio.

Lo schema tipico:

```
esercizio → risposta giusta → 10 secondi di gioco come premio → esercizio
```

Oppure, più sottile e molto più comune:

```
gioco carino → dentro il gioco c'è un quiz → rispondi → il gioco continua
```

Il secondo è quello in cui cadono il 90% dei prodotti, e ci sono caduto anch'io
con Cassetta, Etichette e Magazzino. Il gioco e il contenuto sono **adiacenti**,
non fusi. Puoi togliere il contenuto e il gioco funziona ancora; puoi togliere il
gioco e il contenuto funziona ancora. Sono due cose incollate.

## 1.2 La definizione formale

Habgood, Ainsworth & Benford (2005), poi Habgood & Ainsworth (2011) nel *Journal
of the Learning Sciences*. Un gioco è **intrinsecamente integrato** quando
soddisfa due condizioni:

**Condizione A — consegna nel flusso.**
Il materiale da imparare viene consegnato **attraverso le parti del gioco che
sono più divertenti da giocare**, cavalcando l'esperienza di flusso prodotta dal
gioco, e senza interromperla.

**Condizione B — incarnazione nella meccanica.**
Il materiale da imparare è **incarnato nella struttura del mondo di gioco e nelle
meccaniche di base** — non solo attaccato ad esse.

La distinzione fra A e B è quella che mi mancava. Un gioco può soddisfare A e
fallire B: è il caso di "Trash Zapper" analizzato nello stesso paper — consegna il
materiale nella parte divertente e cavalca il flusso, e il carico aritmetico
aggiunge perfino sfida a un esercizio di gioco altrimenti banale. Ma la relazione
con le meccaniche di base non è **incarnata**: il contenuto matematico è
*attaccato* alla meccanica, e le due cose non sono affatto integrate. Ed è
esattamente per questo che l'apprendimento non arriva.

**Tradotto per noi:** non basta che il concetto stia nel momento divertente.
Il concetto deve *essere* la meccanica.

## 1.3 La scoperta del 2022: è attenzione, non motivazione

Questo è il pezzo che cambia il modo di progettare.

Cutting & Iacovides (2022), *Learning by Doing: Intrinsic Integration Directs
Attention to Increase Learning in Games*, PACM HCI / CHI PLAY, articolo 240.
Studio pre-registrato, n=210, su un gioco tipo Pac-Man.

Hanno costruito due versioni **quasi identiche**, diverse solo nel compito di
gioco, in modo che il compito dirigesse l'attenzione del giocatore su
caratteristiche visive diverse.

Risultato:

- l'apprendimento nella versione integrata era **considerevolmente superiore**;
- **motivazione e carico cognitivo erano costanti** fra le due versioni.

La spiegazione classica dell'integrazione intrinseca era motivazionale: il gioco
integrato piace più, quindi ci passi più tempo, quindi impari più. Questo studio la
smonta — già Habgood & Ainsworth avevano notato che l'apprendimento aumentava
**nonostante** il tempo sul compito fosse lo stesso.

Il meccanismo reale è **attentivo**: il compito di gioco decide dove guardi, e
impari quello che sei costretto a guardare.

### Perché questo cambia il progetto

Se il meccanismo fosse motivazionale, basterebbe fare un gioco bello e infilarci
dentro il contenuto: la motivazione farebbe il resto. È quello che ho fatto per
sette livelli.

Se il meccanismo è attentivo, allora **quello che conta è dove il compito
costringe l'occhio**. Un gioco bellissimo dove vinci guardando il colore insegna i
colori. Un gioco brutto dove vinci solo leggendo l'operazione insegna le
operazioni.

Da cui la regola operativa che governa tutto il resto:

> ## Il concetto deve essere ciò che devi guardare per vincere.

## 1.4 I tre gradi di integrazione

Griglia mia, derivata dalla letteratura, per classificare rapidamente un gioco.

### Grado 0 — Adiacente (broccoli)
Il contenuto è un ostacolo fra due pezzi di gioco. Si può rimuovere senza
rompere il gioco.
*Sintomo:* il gioco si mette in pausa per farti una domanda.
*Esempio nostro:* La Cassetta, Le Etichette, Il Magazzino.

### Grado 1 — Attaccato
Il contenuto è dentro il momento divertente, ma la meccanica non lo incarna: la
meccanica funzionerebbe identica con contenuto arbitrario.
*Sintomo:* potresti sostituire i termini tecnici con nomi di frutta e il gioco
sarebbe identico.
*Esempio nostro:* La Lama attuale. Sostituisci `FILE` con `ANGURIA` e
`lista.map` con `FRAGOLA`: il gioco non cambia di una virgola. Ecco la prova che è
grado 1.

### Grado 2 — Incarnato
La meccanica **è** il concetto. Cambiare il concetto cambia la meccanica.
*Sintomo:* non riesci a spiegare le regole del gioco senza spiegare il concetto.
*Esempio nostro:* Il Semaforo. Non puoi spiegare "smista la promessa nella corsia
del suo esito" senza aver spiegato che una promessa ha due esiti possibili. Le
regole del gioco *sono* la definizione di Promise.

**Obiettivo: grado 2 su tutti i livelli.** Grado 1 è accettabile solo come
scaffolding nei primi due beat di un livello, e va risolto entro il beat 3.

### Il test dell'anguria

Rapido, brutale, funziona sempre:

> Sostituisci ogni termine tecnico con un nome di frutta.
> Il gioco funziona ancora esattamente uguale?
> - **Sì** → grado 0 o 1. Da rifare.
> - **No, le regole non hanno più senso** → grado 2.

Applicato ai nostri:

| Gioco | Con le angurie funziona ancora? | Grado |
|---|---|---|
| Cassetta | Sì (apri il cassetto con l'anguria) | 0 |
| Etichette | Sì | 0 |
| Magazzino | Sì | 0 |
| Lama | Sì (taglia le fragole, non le angurie) | 1 |
| Chiosco | In parte — il "richiede tempo" resta necessario | 1,5 |
| Fattorino | Quasi no — il "primo argomento è l'errore" è strutturale | 2 |
| Semaforo | No — le due corsie sono i due esiti | 2 |

## 1.5 I sette modi di sbagliare l'integrazione

Catalogo dei difetti, con il rimedio. Da usare come lista di controllo.

### Difetto 1 — L'indizio di superficie
Il giocatore può vincere leggendo colore, forma, dimensione o posizione invece del
contenuto.

*Perché è grave:* è il difetto peggiore, perché il gioco *sembra* funzionare.
L'attenzione va sull'indizio, e per il meccanismo attentivo è l'indizio che viene
imparato.

*Rimedio:* tutti gli oggetti identici. Il contenuto è l'unica differenza. Il
colore arriva **dopo** l'azione, come conferma, mai prima come suggerimento.

### Difetto 2 — Il bacino troppo piccolo
Ci sono 6 frasi possibili e al terzo beat le hai memorizzate. Da lì in poi giochi
a memoria e l'attenzione non va più sul contenuto.

*Rimedio:* bacino minimo **40 elementi per livello**, meglio 60. Con 5 beat da
~10 elementi ciascuno, servono almeno 50 per non ripetere mai nella stessa
partita. E le frasi devono essere generate per composizione, non scritte a mano
una per una, se il bacino deve arrivare a centinaia.

### Difetto 3 — La coppia arbitraria
Il giocatore impara "A va a destra, B va a sinistra" come coppia mnemonica, senza
capire perché.

*Sintomo:* il gioco ha 4 categorie e 8 esempi per categoria. Impari gli 8 esempi.

*Rimedio:* gli esempi devono essere **sempre nuovi** e la categoria deve essere
**inferibile dal significato**. Se non è inferibile senza saperlo già, il gioco
non insegna: verifica.

### Difetto 4 — Il quiz mascherato
Il gioco si ferma, fa una domanda, riprende. Non importa quanto sia bello il
contorno.

*Sintomo:* c'è un momento in cui il tempo di gioco è sospeso e devi scegliere.

*Rimedio:* la decisione deve avvenire **mentre il mondo continua a muoversi**. Il
costo di pensare troppo deve essere visibile nel mondo (la fila che si allunga, la
coda che sale, l'oggetto che cade).

### Difetto 5 — La meccanica scollata
La letteratura la segnala esplicitamente: alcune meccaniche — tipicamente
l'impilamento di carte, dove si sovrappongono carte con istruzioni per ottenere un
risultato — creano uno **scollamento** fra la meccanica del gioco e il concetto.
Il gesto di impilare non ha niente a che vedere con il pensiero computazionale che
si vuole insegnare.

*Rimedio:* scegliere il gesto **dalla struttura del concetto**, non dal catalogo
dei giochi. Prima si chiede "che forma ha questo concetto?", poi si cerca
l'archetipo che ha quella forma. Mai il contrario.

### Difetto 6 — La fantasia sostituibile
Habgood, Ainsworth & Benford (2005a) fanno notare che il contesto di fantasia è
spesso arbitrario: un gioco di gestione calcistica potrebbe essere sostituito da
una pallavolo dei Puffi e resterebbe **altrettanto istruttivo**, purché i sistemi
di regole e le interazioni del giocatore con budget e statistiche restino
identici. Sono le **meccaniche di base** che incarnano il valore educativo, non
l'ambientazione.

*Conseguenza per noi, e va detta chiara:* l'estetica non insegna. Il chiosco di
legno, il terminale verde, la banda di colore — nessuno di questi insegna niente.
Servono per il piacere e per la varietà, e vanno fatti bene, ma **il lavoro
pedagogico lo fa solo la meccanica.** Le sei estetiche per banda sono
intrattenimento; i 24 gesti sono la didattica.

### Difetto 7 — Il feedback che non spiega
Risposta sbagliata → suono cattivo → riprova. Il giocatore impara *che* ha
sbagliato, non *perché*.

*Rimedio:* ogni errore mostra la conseguenza **nel linguaggio del mondo di gioco**,
non un messaggio. Nel Chiosco: la fila si allunga e la gente se ne va. Non "hai
sbagliato": *guarda cosa è successo*.

## 1.6 Come si progetta al contrario (il metodo giusto)

Il mio errore di processo è stato partire dall'archetipo ("facciamo un Fruit
Ninja") e cercarci dentro un concetto. Il metodo corretto è l'inverso, in quattro
passi.

### Passo 1 — Che forma ha il concetto?
Non "cos'è", ma **che forma ha**. Il concetto è una scelta binaria? Una sequenza
ordinata? Una coda che si svuota? Una gerarchia da percorrere? Un limite di
risorsa? Una trasformazione?

Esempi su Node:

| Concetto | Forma |
|---|---|
| Bloccante vs non bloccante | Scelta binaria sotto pressione di tempo |
| Risoluzione di `require()` | Percorso in una gerarchia, con ricerca verso l'alto |
| Promise | Biforcazione a due esiti |
| Event loop | Coda circolare a fasi con priorità |
| Deduplica npm | Collasso di duplicati in una struttura |
| Stream e backpressure | Portata limitata fra due contenitori |
| Callback hell | Annidamento che si stringe |
| Errori error-first | Ispezione della prima posizione |

### Passo 2 — Quale gesto ha quella stessa forma?
Il gesto fisico deve avere la **stessa struttura** del concetto.

| Forma | Gesto naturale |
|---|---|
| Scelta binaria sotto tempo | Smistare a due destinazioni |
| Percorso in gerarchia | Correre e svoltare ai bivi |
| Biforcazione a due esiti | Corsie |
| Coda a fasi | Giro su un tracciato circolare |
| Collasso di duplicati | Allineare tre |
| Portata limitata | Regolare un flusso, valvola |
| Annidamento che si stringe | Varco che si restringe |
| Ispezione della prima posizione | Guardare a sinistra prima di agire |

### Passo 3 — Quale archetipo commerciale usa quel gesto?
Solo adesso si apre il catalogo (`ricerca/10` – `ricerca/19`). L'archetipo porta
in dote taratura collaudata, aspettative del giocatore e una curva già risolta.

### Passo 4 — Verifica con il test dell'anguria
Se sostituendo i termini con frutta il gioco resta identico, sono tornato al
passo 1 e ho barato. Si ricomincia.

## 1.7 Il caso limite: quando l'integrazione perfetta è impossibile

Alcuni contenuti non hanno una forma giocabile. Esempi da Node: la sintassi esatta
di un comando, i nomi dei flag di `npm`, l'ordine dei parametri di una funzione.
Sono **nomenclatura**, non struttura.

Per questi la letteratura non offre scorciatoie oneste, e va accettato che una
parte del sapere è memorizzazione. La soluzione di progetto è **separare i due
registri**:

- **Il gioco insegna la struttura.** Sempre grado 2, sempre.
- **La nomenclatura arriva dopo il gioco**, nel momento di riconoscimento — quando
  hai già fatto la cosa e ti viene detto come si chiama.

È il pattern del pannello *"Quello che hai appena fatto si chiama…"* che abbiamo
già in tutti i giochi, e va tenuto: prima l'esperienza, poi il nome. Non è
integrazione intrinseca — è la cornice **intorno** all'integrazione, e va bene che
sia testo, perché arriva quando il concetto è già stato vissuto.

Quello che non va mai fatto è l'inverso: dare il nome prima e chiedere di
riconoscerlo. Quello è il quiz.

## 1.8 Verifica sul campo: come si misura

Habgood & Ainsworth hanno misurato con test di apprendimento pre/post e gruppi di
controllo. Noi non abbiamo un laboratorio, ma tre proxy sono a portata:

1. **Il test dell'anguria** (progettazione, costo zero, si fa a mente).
2. **Il test del giocatore cieco:** far giocare qualcuno che non conosce Node e
   chiedergli **dopo** di spiegare la regola. Se descrive la regola in termini
   tecnici corretti, l'integrazione ha funzionato. Se descrive colori e posizioni,
   no.
3. **Il test del transfer:** dopo il livello, mostrare tre righe di codice vero e
   chiedere quale si comporta come nel gioco. Se il gioco insegnava colori, questa
   domanda risulta impossibile.

Il terzo è anche un buon boss di fine capitolo, e ha il vantaggio di essere l'unico
momento in cui il codice vero può comparire senza rompere l'integrazione: non è un
quiz sul contenuto del gioco, è il ponte fra il gesto e il codice.

---

## Da ricordare

- L'integrazione intrinseca funziona per **attenzione**, non per motivazione:
  impari dove il compito ti costringe a guardare.
- Due condizioni: consegna nel flusso **e** incarnazione nella meccanica. La
  seconda è quella che si dimentica.
- Il test dell'anguria smaschera il grado 1 in dieci secondi.
- L'estetica non insegna niente. Serve al piacere, non alla didattica.
- Si progetta dal concetto al gesto, mai dal gioco al concetto.
- La nomenclatura viene dopo l'esperienza, mai prima.

## Fonti di questo capitolo

- Habgood, Ainsworth & Benford (2005a), *Endogenous fantasy and learning in
  digital games*
- Habgood & Ainsworth (2011), *Motivating Children to Learn Effectively: Exploring
  the Value of Intrinsic Integration in Educational Games*, Journal of the
  Learning Sciences 20(2), 169–206
- Habgood & Ainsworth, *Evaluating Intrinsic Integration in Educational Games*
  (versione pre-pubblicazione, Sheffield Hallam)
- Cutting & Iacovides (2022), *Learning by Doing: Intrinsic Integration Directs
  Attention to Increase Learning in Games*, PACM HCI, CHI PLAY, art. 240, n=210
- Bruckman (1999) — "chocolate-covered broccoli"
- Crawford (1982) — "la motivazione fondamentale di ogni gioco è imparare"
- Studio esplorativo su *Lucky Codes* (Journal of Formative Design in Learning,
  2025) — sullo scollamento delle meccaniche a impilamento di carte
