# 04 — Onboarding senza testo

> Come si insegna a giocare senza scrivere istruzioni. Il capitolo che elimina
> il primo box di testo, quello che sta all'inizio e che nessuno legge.

---

## 4.1 Il problema del tutorial

Nei giochi vecchi, ogni livello apriva con una schermata di spiegazione. La
ragione era ragionevole: il gioco è nuovo ogni volta, quindi va spiegato.

Ma quella schermata ha tre difetti che si sommano:

1. **Nessuno la legge.** Il giocatore ha aperto un gioco. La sua attenzione è
   sul primo elemento che si muove; il testo statico è, letteralmente, la cosa
   che i suoi occhi saltano.
2. **Spende il gancio.** I primi dieci secondi sono l'unico momento di
   attenzione gratuita (`03` §3.2). Spenderli in lettura significa iniziare il
   gioco vero con l'attenzione già in calo.
3. **Insegna la cosa sbagliata.** Insegna il *comando* ("trascina la scheda nel
   cassetto"), non il **concetto**. Il comando si impara in tre secondi provando;
   il concetto no. Il testo occupa il posto del concetto e lo scaccia.

Il difetto vero non è la lunghezza del testo. È che il testo occupa il canale che
serve al contenuto: se spiego le regole a parole, poi il contenuto dove lo metto?
In un altro box di testo. Da lì l'app che il ragazzo trova noiosa.

## 4.2 Il metodo World 1-1

Il primo schermo di Super Mario Bros. (1985) insegna cinque cose senza una
parola. Vale la pena decostruirlo perché è il modello che seguiamo.

Cosa succede, in ordine, e perché:

**1. Mario è a sinistra, lo spazio è a destra.**
Il vuoto attira. Nessuno prova ad andare a sinistra: non c'è niente. La
composizione dice "vai a destra" senza dirlo.

**2. Il primo nemico arriva da solo, lento, dopo qualche secondo.**
Da solo: non ci sono elementi che competono per l'attenzione. Lento: c'è tempo
di reagire. Dopo qualche secondo: il giocatore ha già premuto qualcosa e sa che
i tasti fanno qualcosa.

**3. Il primo nemico ti uccide, e ricominci due secondi dopo.**
La conseguenza è massima (morte) ma il costo è minimo (due secondi). Questa
coppia — **conseguenza grave, costo basso** — è ciò che rende sicuro
sperimentare. Il giocatore impara che il gioco non lo punisce per aver provato.

**4. Il blocco `?` è sopra il punto dove salti per schivare il nemico.**
Il gesto che ti serve per sopravvivere è **lo stesso** che ti fa scoprire il
segreto. Non c'è un tutorial sul salto: c'è una situazione in cui salti, e
saltando scopri.

**5. Il funghetto ti rincorre.**
Il primo potenziamento non va preso: viene a prenderti. Nessun rischio di
perderlo, nessuna spiegazione su cosa fa.

I quattro principi che estraiamo:

| Principio | In pratica per noi |
|---|---|
| **Composizione come istruzione** | la disposizione dello schermo indica il verbo |
| **Un elemento alla volta** | il secondo elemento entra quando il primo è capito |
| **Conseguenza grave, costo basso** | si può perdere subito, si riparte in un secondo |
| **Il gesto della sopravvivenza è il gesto della scoperta** | non due comandi, uno |

## 4.3 I quattro strumenti

Senza testo restano quattro strumenti. Sono sufficienti.

### A. Affordance

La forma dell'oggetto dichiara cosa gli si può fare. Un manico dice "afferra".
Una leva dice "tira". Una fessura larga esattamente come la carta dice "infila
qui". Una superficie liscia e inclinata dice "scivola".

Regola: se devi scrivere "trascinabile", la forma è sbagliata. Le forme che
funzionano: manici, bordi smussati, ombra sotto (= si solleva), maniglia
zigrinata, contorno tratteggiato (= ci va qualcosa), incastro sagomato.

### B. Vincolo

Il modo più forte di insegnare un'azione è **rendere impossibili le altre**. Al
beat 1 di un capitolo, il giocatore deve avere una sola cosa che si può fare.
Non "una cosa consigliata": una sola possibile.

- una sola casella libera → l'unico posto dove mettere il pezzo;
- un solo oggetto sullo schermo → l'unica cosa da toccare;
- una sola corsia aperta → l'unica direzione.

Il vincolo si allenta dal beat 2, e in quel momento il giocatore ha già il verbo
nelle dita.

### C. Conseguenza sicura

Il giocatore prova solo se provare costa poco. Quindi al beat 1: nessuna vita
persa, riavvio istantaneo, nessun contatore che si azzera, nessuna schermata di
sconfitta. La conseguenza è **visibile e nulla**: il pezzo cade, si sente il
tonfo, si può riprovare.

Vale una precisazione: "costo basso" non significa "conseguenza invisibile". La
conseguenza va vista bene — è ciò che insegna. È il *costo* che va tenuto a
zero, non il feedback.

### D. Ripetizione con variazione

Il verbo si impara alla terza volta, non alla prima. Quindi il beat 1 propone la
stessa situazione tre volte con una variazione minima (posizione diversa,
oggetto diverso, tempo un po' più stretto). Alla terza il giocatore non pensa
più al gesto, e da lì può pensare al contenuto.

Questa è la ragione tecnica per cui il beat 1 dura 25 secondi e non 10: servono
tre ripetizioni.

## 4.4 Un verbo alla volta

La tabella di sbloccaggio dei comandi è obbligatoria nella scheda di un gioco che
ha più di un comando (i giochi migliori ne hanno uno).

Formato:

| Comando | Si sblocca | Perché lì |
|---|---|---|
| trascina | subito | è il verbo del livello |
| ruota | beat 2, primo pezzo che non entra | il gioco crea il bisogno, poi dà lo strumento |
| scarta | beat 4, quando la coda è piena | serve solo quando c'è troppa roba |

La colonna "perché lì" ha una sola risposta valida: **perché in quel momento il
giocatore ha un problema che quel comando risolve**. Se il comando arriva prima
del problema, è un tutorial. Se arriva dopo, è frustrazione.

Il numero massimo di comandi in un gioco della banda 1 è **due**. Banda 2: tre.
Banda 3-4: quanti servono, ma sempre sbloccati uno per volta e sempre dopo il
problema.

## 4.5 Le prime tre schermate — regole ferree

**Schermata 0 — non esiste.**
Nessun titolo, nessun "livello 3: i moduli", nessun pulsante Gioca. Il gioco
parte. Se serve un titolo, va **sopra il gioco già in movimento**, e sparisce da
solo.

**Primo secondo.**
Qualcosa si muove, e quel qualcosa è l'oggetto del verbo. Non una nuvola
decorativa: la cosa che il giocatore dovrà toccare.

**Primi tre secondi.**
Il giocatore ha toccato qualcosa e ha ottenuto una reazione. Se a tre secondi
non ha ancora toccato niente, l'affordance non funziona: aggiungi movimento
all'oggetto interagibile (un oggetto che oscilla piano viene toccato; uno fermo
no).

**Primi dieci secondi.**
Il giocatore ha compiuto il verbo con successo almeno una volta e ha visto la
conseguenza positiva.

**Primi venti secondi.**
Il giocatore ha compiuto il verbo tre volte e la terza non ci ha pensato. Da qui
in avanti si può introdurre il contenuto.

Questa è la scaletta contro cui si misura il TEST 3 (`00` §0.4).

## 4.6 Interfaccia diegetica

Diegetico = che esiste dentro il mondo del gioco. Un quadrante sul muro
dell'officina invece di una barra in un angolo. Un foglio di carta appuntato
invece di un pannello con bordo arrotondato.

Perché ci interessa: un pannello sovrapposto dice "questa è informazione,
leggila"; un oggetto nel mondo dice "questo è il mondo, guardalo". Il secondo
viene guardato, il primo viene saltato.

Corrispondenze utili:

| Informazione | Overlay (no) | Diegetico (sì) |
|---|---|---|
| tempo che scade | timer numerico in alto | una candela che si consuma, una clessidra, la luce che cala |
| vite | tre cuori in un angolo | tre lampadine sul quadro, e si fulminano |
| coda che si riempie | barra di progresso | i pacchi che si accatastano fisicamente |
| punteggio | numero | la pila di roba consegnata che cresce |
| il concetto in gioco | etichetta di testo | scritto sull'oggetto stesso, come un marchio |

L'ultima riga è la più preziosa: quando il nome tecnico è **stampato
sull'oggetto** (il nome dell'API sul manico dell'attrezzo, il metodo scritto sul
fianco della cassa), il giocatore lo legge senza sentire di stare leggendo. È
così che si porta la terminologia in banda 1 senza tradire il registro.

## 4.7 Quando il testo è ammesso

Tre soli casi. Fuori da questi, nel flusso di gioco, il testo non c'è.

**1. Nome sull'oggetto.**
Una o due parole, stampate sull'oggetto, dentro il mondo. Il nome tecnico vero.
Non una spiegazione: un'etichetta.

**2. Verbo imperativo di due parole, in movimento.**
Ammesso solo al beat 1 e solo se accompagna qualcosa che si muove: "Taglia!"
sopra l'oggetto che arriva, e sparisce in mezzo secondo. Mai una frase.

**3. Il pannello di coaching, al terzo errore consecutivo sulla stessa cosa.**

Il formato del pannello di coaching è fisso, ed è questo:

```
[cosa hai fatto]     una riga, neutra, senza colpa
                     "Hai fatto passare la lettera prima del pacco."

[cosa succede]       una riga, la conseguenza, concreta
                     "Il pacco era già in fila da prima: adesso è in ritardo."

[la regola]          una riga, la frase del concetto (passo 1 della scheda)
                     "Alcune cose in attesa hanno il diritto di passare avanti,
                      ma non queste."

[mostra]             non testo: l'animazione della mossa giusta, in loop
```

Regole del pannello:
- **quattro righe massimo**, e la quarta non è testo;
- **nessun rosso**, nessuna X, nessun "sbagliato" (`02` §4.4);
- la parte che insegna è l'animazione, non le righe;
- si chiude toccando qualsiasi punto, e non c'è un pulsante "Ho capito";
- non si ripresenta identico: se lo stesso errore torna, cambia l'esempio
  mostrato, non le parole.

## 4.8 Touch e desktop insieme

Entrambe le piattaforme, stessa partita (`33` per i dettagli tecnici). Per
l'onboarding conta questo:

| | Touch | Desktop |
|---|---|---|
| Affordance del gesto | l'oggetto oscilla dove il dito deve andare | l'oggetto reagisce al passaggio del mouse |
| Primo insegnamento | una mano fantasma che compie il gesto, una volta | lo stesso, più il tasto disegnato sull'oggetto |
| Zona di tocco | ≥ 44 px, sempre | irrilevante, ma la stessa area |
| Errore da imprecisione | tolleranza generosa: si aggancia l'oggetto più vicino entro 24 px | preciso |

La mano fantasma va mostrata **una sola volta**, al primo beat del primo
capitolo di un livello, e mai più. Se serve mostrarla al capitolo 3, il gesto è
troppo complicato.

Vincolo di progetto: il gesto deve funzionare con **un dito solo**. Niente
pinch, niente due dita, niente gesti che richiedono la mano intera. Su desktop:
mouse e, se sensato, una tastiera equivalente — ma il gioco non deve *richiedere*
la tastiera in banda 1-2.

## 4.9 Errori di onboarding

**1. La schermata di istruzioni.** Già coperta. Si toglie e si sostituisce con
un beat 1 vincolato.

**2. Il tutorial che blocca.** "Tocca qui per continuare" con il resto
disabilitato. Insegna che il gioco va aspettato, non giocato.

**3. Tutti i comandi subito.** Tre pulsanti al primo secondo: il giocatore ne
usa uno e ignora gli altri per tutta la partita.

**4. Il gesto spiegato a parole invece che mostrato.** "Scorri verso l'alto" →
una freccia che scorre verso l'alto, animata, sopra l'oggetto.

**5. Il beat 1 in cui si può perdere.** Se si perde al primo tentativo prima di
aver capito il verbo, l'apprendimento diventa prudenza: il giocatore comincia a
non provare.

**6. L'oggetto interagibile immobile.** La cosa da toccare deve avere un
movimento minimo — un respiro, un'oscillazione di due gradi. Le cose ferme
sembrano decorazione.

**7. Il titolo del livello prima del gioco.** "Livello 3 — I moduli CommonJS" è
la peggiore prima impressione possibile: annuncia una lezione. Se il titolo
serve, appare sopra il gioco in corso e svanisce.

## 4.10 Checklist

- [ ] il gioco parte senza schermata iniziale
- [ ] al primo secondo si muove l'oggetto del verbo
- [ ] al beat 1 c'è una sola azione possibile
- [ ] al beat 1 non si può perdere
- [ ] il riavvio dopo una perdita è sotto il secondo, senza schermate
- [ ] i comandi si sbloccano uno per volta, ognuno dopo il problema che risolve
- [ ] la mano fantasma appare una volta sola in tutto il livello
- [ ] nessun testo nel flusso, tranne nomi sugli oggetti
- [ ] le informazioni di stato sono diegetiche, non overlay
- [ ] il pannello di coaching esiste, ha quattro righe, e la quarta è
      un'animazione
- [ ] il gesto funziona con un dito e con il mouse, identico
