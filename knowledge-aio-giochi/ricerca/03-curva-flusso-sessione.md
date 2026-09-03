# 03 — Curva, flusso, sessione

> Come si dispone la difficoltà nel tempo: dentro una mano, dentro un capitolo,
> dentro un livello, dentro una banda di sei livelli. Il capitolo che spiega
> perché "sempre più difficile" è la curva sbagliata.

---

## 3.1 Il canale di flusso

Csikszentmihalyi (1990): l'esperienza ottimale sta nella fascia stretta fra
ansia e noia. Se la sfida supera l'abilità → ansia, abbandono. Se l'abilità
supera la sfida → noia, abbandono. La fascia si chiama **canale di flusso**.

Jenova Chen (2007) aggiunge la parte che serve a noi: l'abilità del giocatore
non cresce in modo liscio, cresce **a scatti**. Dopo ogni scatto c'è un
plateau in cui il giocatore consolida. Quindi la difficoltà non deve crescere in
modo lineare, deve crescere **a scalini**, e ogni scalino deve avere un
pianerottolo.

```
abilità   ─────╱▔▔╲╱▔▔▔╲╱▔▔▔▔    (a scatti, con plateau)
difficoltà ──╱▔▔╲__╱▔▔╲__╱▔▔╲    (a scalini, con pianerottoli)
                ↑        ↑
             rilascio  rilascio
```

Il rilascio non è tempo perso. È il momento in cui il giocatore **si accorge**
di essere migliorato — e quella percezione è il motore di tutto il resto. Un
gioco che sale sempre non dà mai al giocatore l'occasione di sentirsi bravo, e
un giocatore che non si sente mai bravo smette.

Implicazione operativa per noi: la difficoltà media di un capitolo deve
**scendere** nel suo ultimo beat. Vedi §3.3.

## 3.2 Perché la curva lineare sbaglia — tensione e rilascio

Jesse Schell chiama **interest curve** l'andamento del coinvolgimento nel tempo.
La forma efficace è nota e viene dalla drammaturgia, non dai videogiochi: un
gancio iniziale, una salita a zigzag, un picco, una discesa breve.

Tre proprietà da rispettare:

**A. Il gancio va prima della salita.** I primi secondi sono più coinvolgenti
del secondo minuto. Se il gioco inizia con una schermata di istruzioni, il
gancio è sprecato — l'unico momento di attenzione gratuita che avrai lo hai
speso a farti leggere.

**B. Ogni picco supera il precedente, ma ogni valle è più alta della precedente.**
Non serve che tutto salga: serve che il *pavimento* salga.

**C. La fine è un rilascio, non un picco.** Il momento migliore per chiudere una
sessione è subito dopo un successo facile. È il momento in cui il giocatore
pensa "ancora una", ed è esattamente il momento in cui la sessione deve
finire — così quel pensiero se lo porta a domani.

## 3.3 I cinque beat di un capitolo

Cinque lezioni = cinque beat = una sessione. Struttura fissa, contenuto libero.

| Beat | Nome | Difficoltà | Ruolo pedagogico | Regola |
|---|---|---|---|---|
| 1 | Innesco | 0,2 | acquisizione del verbo | perdere deve essere **impossibile** |
| 2 | Complicazione | 0,45 | il verbo sotto un vincolo | si aggiunge **una** variabile sola |
| 3 | Frattura | 0,7 | smontare una convinzione falsa | qui va il carico didattico |
| 4 | Picco | 1,0 | tutto insieme, tempo stretto | densità massima, niente di nuovo |
| 5 | Padronanza | 0,6 | consolidamento e autostima | **più facile del 4** |

I numeri di difficoltà sono relativi, non assoluti: 1,0 è il massimo del
capitolo, non il massimo del gioco.

### Il beat 3 è il capitolo

Il beat 3 è l'unico che insegna qualcosa di nuovo *concettualmente*; gli altri
quattro insegnano a **fare**. Il suo contenuto si costruisce così:

1. Scrivi la convinzione sbagliata che un principiante ha con certezza.
2. Costruisci una situazione in cui quella convinzione produce una perdita.
3. Fai sì che la perdita sia **immediata e fisica**, non spiegata.

Esempi per Node.js:

| Livello | Convinzione falsa | Situazione che la rompe |
|---|---|---|
| L2 Runtime | "roba di rete = solo browser" | `fetch` esiste in Node: chi lo scarta perde il lavoro |
| L3 CommonJS | "`require` rilegge il file ogni volta" | la seconda `require` restituisce lo stesso oggetto già modificato |
| L6 Callback | "il codice va giù in ordine" | la riga sotto viene eseguita prima di quella che aspetta |
| L7 Promise | "prima chiamata, prima risposta" | la seconda torna prima, e chi ha ordinato per arrivo sbaglia tutto |
| L9 Event loop | "la coda è una coda" | `nextTick` passa avanti a tutti quelli già in fila |

Se un capitolo non ha una riga nella colonna centrale, quel capitolo è
esercitazione. Vale come pratica, non come lezione.

### Il beat 5 non è il boss

Errore che ho fatto in cinque giochi su sette: mettere il momento più difficile
alla fine. Effetto: la sessione si chiude sulla frustrazione, il giocatore
associa il livello all'ultima cosa provata, e non torna.

Il beat 5 ha densità del beat 3 e velocità del beat 2. Contiene tutti gli
elementi visti, nessuno nuovo, con mezzo secondo in più su ogni finestra. È il
beat che *sembra* difficile e non lo è.

## 3.4 La struttura del livello: 8 capitoli × 5

40 lezioni per livello, 8 capitoli da 5 beat. I capitoli non sono tutti uguali:
hanno un ruolo dentro il livello, e la loro curva è a onda lunga.

| Capitolo | Ruolo nel livello | Difficoltà media | Note |
|---|---|---|---|
| 1 | Il verbo del livello | 0,3 | il gioco insegna se stesso |
| 2 | Prima variazione | 0,45 | si aggiunge un elemento al mondo |
| 3 | Il concetto centrale | 0,6 | il capitolo che dà il nome al livello |
| 4 | Respiro | 0,45 | **valle voluta**: variante laterale, un po' scema |
| 5 | Composizione | 0,7 | due concetti già visti che interagiscono |
| 6 | Il caso difficile | 0,85 | la cosa che confonde anche i professionisti |
| 7 | Velocità | 0,8 | nulla di nuovo, tutto più veloce: automatizzazione |
| 8 | Checkpoint | 0,9 → 0,5 | la prova, poi il rilascio finale |

Il capitolo 4 è controintuitivo e va difeso: senza una valle a metà, i capitoli
5-8 partono da un giocatore già saturo. È anche il posto giusto per la variante
più giocosa e meno seria del livello — la cosa che il ragazzo si ricorda.

Il capitolo 8 finisce **basso**: la prova, e poi due o tre mani facili di
vittoria. Chiudere un livello su una vittoria facile è ciò che fa cominciare il
livello successivo.

## 3.5 Durate

Numeri di riferimento (dettagli in `31`):

| Unità | Durata bersaglio | Massimo tollerabile | Perché |
|---|---|---|---|
| Una mano (un tentativo) | 25-40 s | 75 s | oltre, un errore costa troppo e il giocatore diventa prudente |
| Un beat (una lezione) | 60-90 s | 2 min | include i ritentativi |
| Un capitolo (5 lezioni) | 6-9 min | 12 min | la sessione tipica su mobile |
| Un livello (8 capitoli) | 50-70 min | — | mai in una volta sola |

La mano corta è una scelta pedagogica, non di ritmo: il ciclo
prova → errore → capisco → riprovo deve chiudersi abbastanza in fretta perché il
giocatore ricordi cosa aveva pensato quando ha sbagliato. Oltre il minuto e
mezzo, quel ricordo è già sfumato e l'errore non insegna più niente.

Corollario: **niente checkpoint dentro una mano**. Se serve un checkpoint, la
mano è troppo lunga.

## 3.6 Difficoltà dinamica: cosa si adatta e cosa mai

L'adattamento è utile, ma se adatta la cosa sbagliata il gioco diventa
condiscendente e il giocatore lo sente subito.

**Si adatta:**
- il **tempo** disponibile (finestre di reazione, velocità di scorrimento);
- la **densità** (quanti elementi contemporanei);
- il numero di **ritentativi** senza conseguenze;
- l'anticipo con cui appare il telegrafo di un evento (`02` §3.2).

**Non si adatta mai:**
- la **correttezza**: nessuna risposta sbagliata diventa accettabile perché il
  giocatore è in difficoltà;
- il **contenuto del beat 3**: la frattura va attraversata, non aggirata;
- la **presenza** degli elementi che portano il concetto (si può ridurre il
  numero, non eliminare la categoria).

Regola di implementazione: l'adattamento è **asimmetrico e lento a salire**.
Dopo due fallimenti, +25% di tempo. Dopo tre successi netti, −10%. Salire in
fretta punisce chi ha appena imparato.

E l'adattamento non si annuncia mai. Nessun "modalità facile attivata": il
giocatore deve pensare di aver imparato, perché è esattamente quello che sta
succedendo.

## 3.7 La struttura a bande

Sei livelli per banda. La banda è l'unità di identità estetica e di **registro**
— non di difficoltà: la difficoltà cresce dentro ogni banda e riparte più alta
nella successiva.

| Banda | Livelli | Registro | Terminologia | Interfaccia | Analogie |
|---|---|---|---|---|---|
| 1 | 1-6 | fisico, analogico | zero termini a schermo | oggetti nel mondo, niente pannelli | tutto è analogia |
| 2 | 7-12 | meccanico, sistemico | i primi termini, come etichette su cose | pannelli diegetici, quadranti | analogia con nome tecnico accanto |
| 3 | 13-18 | astratto, schematico | terminologia corrente | diagrammi giocabili, grafi | l'analogia resta come sfondo |
| 4 | 19-24 | tecnico, letterale | esatta, come in produzione | terminale vero, sintassi vera | nessuna: la cosa reale |

Il passaggio di banda è **visibile in mezzo secondo**: cambia palette, cambia
tipo di superficie, cambia il tipo di gesto. Serve a dare al ragazzo la prova
tangibile di essere avanzato: il gioco del livello 19 non assomiglia a quello
del livello 1, e questo dice "sei diventato un altro" meglio di qualsiasi
badge.

### La regola della transizione

Il primo capitolo di una banda nuova **non** insegna un concetto nuovo. Insegna
la banda: ripresenta l'ultimo concetto della banda precedente nel linguaggio
nuovo. Il ragazzo trova una cosa che sa già, in una forma che non ha mai visto —
così impara la forma senza costo cognitivo doppio.

Esempio: livello 7 (banda 2, prima banda meccanica) apre con le Promise
presentate come lo smistamento del Semaforo di livello 6, ma su un quadro
comandi con i nomi veri accanto alle leve. Stesso concetto, registro nuovo.

## 3.8 Morte, ritentativi, punizione

La punizione ha una sola funzione legittima: rendere la posta in gioco reale.
Tutto il resto è attrito.

| Elemento | Scelta | Motivo |
|---|---|---|
| Vite | 3 per mano, non per capitolo | la mano è corta: perdere ricomincia subito |
| Riavvio | < 1 s, nessuna schermata | ogni schermata fra la morte e il retry uccide il retry |
| Progresso perso | mai oltre la mano corrente | perdere 6 minuti insegna solo prudenza |
| Contatore di errori visibile | no | trasforma il gioco in una pagella |
| Ricompensa per zero errori | no | incoraggia la prudenza, che è il contrario dell'esplorazione |

L'ultima riga è importante: se premio le mani perfette, il giocatore gioca per
non sbagliare. Un ragazzo che gioca per non sbagliare non prova la cosa nuova, e
il beat 3 esiste proprio perché provi e sbagli. Si premia il **completamento** e
la velocità, non la purezza.

## 3.9 Numeri di taratura della curva

| Parametro | Beat 1 | Beat 2 | Beat 3 | Beat 4 | Beat 5 |
|---|---|---|---|---|---|
| Finestra di reazione (con lettura) | 2,6 s | 2,2 s | 2,2 s | 1,8 s | 2,1 s |
| Finestra di reazione (solo visiva) | 1,2 s | 1,0 s | 1,0 s | 0,7 s | 0,9 s |
| Elementi contemporanei | 1 | 2 | 2 | 3-4 | 3 |
| Intervallo di spawn | 2,4 s | 2,0 s | 2,0 s | 1,3 s | 1,7 s |
| Vite | ∞ | 3 | 3 | 3 | 3 |
| Durata mano | 25 s | 30 s | 35 s | 40 s | 35 s |

Le finestre "con lettura" non scendono sotto 1,8 s: sotto quella soglia il
giocatore smette di leggere e comincia a indovinare dalla forma, e in quel
momento il gioco ha perso la sua funzione. Se serve andare più veloci, si
rimuove la lettura — non si accorcia il tempo.

## 3.10 Come si verifica la curva su un gioco già fatto

Procedura in quattro passi, si fa in dieci minuti:

1. **Gioca cinque mani di ogni beat** e segna quante volte perdi. Bersaglio:
   beat 1 → 0, beat 2 → 0-1, beat 3 → 1-2, beat 4 → 2-3, beat 5 → 0-1.
2. **Cronometra le mani.** Se una supera 75 s, taglia.
3. **Chiedi a te stesso dopo il beat 5 se hai voglia di un'altra mano.** Se la
   risposta è no, la curva finisce troppo in alto.
4. **Scrivi cosa hai imparato al beat 3**, in una frase. Se non ce n'è una, il
   capitolo va rifatto: manca la frattura.

Il punto 4 è quello che i sette giochi vecchi fallivano tutti tranne il
Semaforo. Ed è il motivo per cui il Semaforo, con la grafica più povera di
tutti, era l'unico che sembrava un gioco: aveva una curva, e aveva una frattura
dentro.
