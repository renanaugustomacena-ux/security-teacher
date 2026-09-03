# 22 — Il terminale come spazio di gioco

> Da leggere prima di qualsiasi livello della banda 4. Senza questo capitolo il
> rischio è produrre un finto terminale con dei quiz dentro — l'errore dei giochi
> vecchi in versione monospaziata.

---

## 22.1 Il problema della banda 4

Dalla banda 1 alla 3 il gioco può inventare un mondo. In banda 4 no: il mondo è
il terminale vero, con la sintassi vera, perché il ragazzo a quel punto deve
imparare gli strumenti reali (risposta al questionario: emulatore vero, sintassi
reale).

La domanda è: **cosa rende un terminale un gioco?**

La risposta sbagliata, e la più comune nei prodotti che esistono: mettere punti,
badge e barre di progresso intorno a un terminale. Questo è il caso più puro di
broccoli ricoperti di cioccolato (`01` §1.1) e il ragazzo lo riconosce
immediatamente. Un terminale con delle stelline è un compito con delle stelline.

La risposta giusta viene dall'osservazione che **il terminale è già un gioco** — è
solo un gioco con un design terribile. Ha tutto: un input libero, uno stato
persistente, un feedback immediato, e la possibilità di rompere le cose. Quello
che gli manca è ciò che manca a tutti i sistemi reali: obiettivi leggibili,
vincoli interessanti, e un feedback che si capisca.

> **Non si gamifica il terminale. Si progettano vincoli e obiettivi intorno a un
> terminale vero.**

---

## 22.2 Perché il terminale è già un gioco

Le proprietà che ha nativamente, e che vanno solo messe in luce:

**A. L'input è libero e generativo.** A differenza di ogni interfaccia grafica,
non offre un insieme finito di azioni. Questo è esattamente ciò che un gioco
profondo ha e un quiz non ha: uno spazio di mosse più grande di quello che il
giocatore può enumerare.

**B. Il feedback è immediato e letterale.** Il comando produce un output. Non c'è
un giudice: c'è una conseguenza. È la forma di feedback che tutta la ricerca
inseguiva nelle bande 1-3 con le analogie fisiche — qui è gratis.

**C. Lo stato persiste.** I file creati restano, la cartella modificata resta.
Come nello stacking (`15` §15.2 A), la conseguenza di una decisione rimane
visibile. La differenza è che qui è **reale**.

**D. Si può rompere.** E questo è il punto più importante: in un ambiente sandbox
il ragazzo può fare danni e ripartire. La possibilità di rompere è ciò che
trasforma l'obbedienza in esplorazione.

**E. La maestria è misurabile in tempo.** Chi sa fare una cosa la fa in dieci
secondi; chi non sa ci mette due minuti di tentativi. Il tempo, in un terminale, è
una misura onesta della competenza — cosa che un punteggio non è mai.

---

## 22.3 Le quattro leve di design

Le sole quattro cose su cui si lavora in banda 4.

### Leva 1 — L'obiettivo verificato dal comportamento

Non "digita il comando giusto". L'obiettivo è **uno stato del sistema**, e il
gioco lo verifica ispezionando quello stato, non la stringa digitata.

| No | Sì |
|---|---|
| "scrivi `npm init -y`" | "fai in modo che questa cartella sia un pacchetto npm valido" |
| "usa `grep -r 'error' logs/`" | "trovami in quale file è comparso il primo errore" |
| "scrivi il Dockerfile giusto" | "fai partire questa app in un container con meno di 200 MB" |

La differenza è tutto. Nel primo caso esiste una risposta e il gioco la controlla:
è un quiz. Nel secondo esistono molte strade, la verifica è sullo stato finale, e
il ragazzo può inventare la propria — che è la definizione di gioco.

Implementazione: ogni obiettivo è una **funzione di verifica** che gira sullo
stato del filesystem virtuale e del processo, non un confronto di stringhe.

### Leva 2 — Il vincolo

L'obiettivo da solo produce un esercizio. Il vincolo produce un gioco. Vincoli
utili, in ordine di quanto sono interessanti:

| Vincolo | Effetto |
|---|---|
| **numero di comandi** ("in 4 comandi") | obbliga a pensare prima di digitare: è il vincolo migliore |
| **comandi vietati** ("senza usare `cat`") | costringe a conoscere le alternative |
| **informazione incompleta** (non sai cosa contiene la cartella) | l'esplorazione diventa parte del gioco |
| **tempo** | da usare con parsimonia: digitare sotto pressione è stressante, non difficile |
| **stato ostile** (il sistema è già rotto in un modo che non sai) | il vincolo migliore per i livelli di debug |
| **una sola prova** (non si può rifare) | solo per il capitolo 8, la prova |

Il vincolo del numero di comandi merita una nota: è l'equivalente esatto delle
mosse contate nel match-3 (`14` §14.10) — impedisce di vincere per tentativi
senza impedire di pensare quanto si vuole. È il vincolo che rende impossibile
"provo tutto finché funziona" senza mai mettere fretta.

### Leva 3 — Il feedback leggibile

L'output di un comando reale è la cosa meno leggibile dell'informatica. Qui il
gioco può intervenire **senza falsificare**:

| Tecnica | Cosa fa | Cosa non fa |
|---|---|---|
| Evidenziazione dell'output | la riga che conta è più luminosa, le altre restano | non riscrive l'output |
| Sintesi affiancata | una colonna a lato riassume lo stato (file creati, porta aperta) | non sostituisce l'output |
| Diff dello stato | dopo ogni comando, cosa è cambiato | non commenta se è giusto |
| Rumore ridotto al primo capitolo | meno righe di warning nei primi beat, tutte dal capitolo 4 | non mente su cosa produce il comando |

La regola: **si può aiutare a leggere, non si può cambiare cosa c'è scritto.** Il
ragazzo che finisce la banda 4 deve saper leggere un output reale, warning
compresi.

### Leva 4 — La conseguenza

Come nelle altre bande, la sconfitta è una conseguenza, non un contatore. In un
terminale le conseguenze sono già lì e sono le migliori della ricerca:

| Errore | Conseguenza |
|---|---|
| comando sbagliato | l'output di errore vero, e lo stato non cambia |
| comando distruttivo | **il danno succede** (in sandbox) e va riparato |
| configurazione sbagliata | l'app non parte, e il log dice perché |
| test scritto male | passa quando non dovrebbe, e si scopre alla mutazione |

La seconda riga è quella che va difesa: se il ragazzo scrive un comando che
cancella qualcosa di importante, **il gioco deve lasciarglielo fare**. Ripristinare
è un altro obiettivo, e la lezione vale dieci spiegazioni sulla prudenza.

---

## 22.4 Cosa NON si fa in banda 4

**1. Nessun punteggio, nessuna stella, nessuna barra di esperienza attorno al
terminale.** La misura è il tempo e il numero di comandi, e stanno accanto, non
sopra.

**2. Nessun autocomplete che suggerisce la risposta.** Il completamento dei
percorsi con Tab sì (è vero, esiste, va imparato). Il completamento del comando
successivo no.

**3. Nessun menu di comandi da cui scegliere.** I chip sopra la tastiera su
Android contengono frammenti sintattici, non comandi completi (`33` §33.6).

**4. Nessuna finta emulazione.** Se il gioco accetta `npm install express` e
finge di averlo installato senza cambiare lo stato, il ragazzo lo scopre al
comando successivo e il patto è rotto. L'emulatore deve essere coerente: un
filesystem vero (virtuale), un package.json vero, un output vero.

**5. Nessuna gamification dell'errore.** Nessun "Ops! Riprova!" — l'errore vero
di un comando è già la cosa che va letta, e imparare a leggerlo è metà del
livello.

**6. Nessun tempo limite di default.** Vedi leva 2.

**7. Nessuna traduzione dell'output.** L'output dei comandi resta in inglese
sempre (`33` §33.8): è quello che il ragazzo troverà nella vita.

---

## 22.5 La struttura dei cinque beat in banda 4

I cinque beat funzionano come nelle altre bande (`03` §3.3), tradotti:

| Beat | In banda 4 |
|---|---|
| 1 — Innesco | un obiettivo che si raggiunge con **un** comando, e il comando è già visibile nell'output precedente. Impossibile bloccarsi |
| 2 — Complicazione | due comandi, e il secondo dipende dall'output del primo |
| 3 — Frattura | il comando che il ragazzo crede corretto fa una cosa diversa da quella che pensa (es. `npm install` senza `--save-dev`, `cd` in una subshell, `rm` senza `-r`) |
| 4 — Picco | obiettivo composto con vincolo di numero di comandi |
| 5 — Padronanza | lo stesso tipo di obiettivo del beat 4 senza vincolo di comandi: si vola |

Le fratture della banda 4 sono le migliori di tutto il programma, perché sono
**gli errori veri che tutti fanno** e che di solito si imparano perdendo un
pomeriggio.

---

## 22.6 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Righe visibili di output (verticale, tastiera aperta) | 12-14 | `33` §33.6 |
| Righe di storico conservate | 200 | |
| Latenza dell'esecuzione | 80-200 ms simulati | istantaneo sembra finto; oltre 300 ms è fastidioso |
| Ritardo del prompt dopo l'output | 120 ms | dà ritmo |
| Vincolo di comandi (beat 4) | 1,5× il minimo necessario | 4 comandi se il minimo è 3 |
| Obiettivi per beat | 1 | mai due obiettivi insieme |
| Durata di un beat | 90 s - 3 min | più lungo delle altre bande: digitare costa tempo |
| Durata di una sessione | 8-14 min | |
| Suggerimento passivo | dopo 90 s senza comandi validi | e non dice la risposta: dice dove guardare |

Il suggerimento passivo dopo 90 secondi è l'equivalente del secondo livello di
aiuto delle altre bande (`00` §0.2 passo 6): non "scrivi X" ma "l'informazione
che ti serve è nell'output di due comandi fa", con quella parte evidenziata.

---

## 22.7 Il game feel di un terminale

Esiste, e quasi nessuno lo cura. Le cose che fanno la differenza:

- **il cursore lampeggia a 1,06 Hz**, non a 1 Hz esatto: irregolare quel tanto che
  sembra vivo;
- **i tasti hanno un suono**, molto basso (−28 dB), con variazione di tono
  casuale del ±4%. Su mobile, anche una vibrazione di 8 ms;
- **l'output non compare tutto insieme**: 12-25 ms per riga, così si *vede*
  arrivare. Oltre le 20 righe si accelera a 4 ms;
- **il prompt ha un peso**: quando il comando parte, il prompt si sposta di 2 px e
  si scurisce; quando torna disponibile, riprende colore;
- **un errore non lampeggia in rosso**: la riga di errore ha il rientro e un
  segno a margine. Il rosso resta riservato ai guasti (`31` §31.7);
- **lo stato che cambia si vede nella colonna di sintesi**: un file creato appare
  con un'animazione di 180 ms. È la conseguenza, e va vista;
- **l'obiettivo raggiunto non fa una fanfara**: la riga dell'obiettivo si spunta,
  un tono breve, e il prompt resta pronto. Chi ha finito vuole continuare, non
  festeggiare.

L'ultima riga è la differenza di tono fra la banda 4 e le altre. In banda 1 la
vittoria è una festa; in banda 4 è un fatto. Il registro cambia perché il
giocatore è cambiato.

---

## 22.8 Quali concetti la banda 4 può portare

Tutti, ed è il punto: il terminale non ha limiti di forma. Ma alcuni concetti
**vanno** in banda 4 e non altrove:

| Concetto | Perché solo qui |
|---|---|
| Profilazione e prestazioni (L19) | serve misurare cose reali; una misura finta non insegna a misurare |
| Log e osservabilità (L20) | il materiale è testo reale, e leggere testo reale è l'abilità |
| Query (L21) | la sintassi *è* il concetto |
| Testing (L22) | serve eseguire test veri e vederli passare o fallire |
| Integrazione API (L23) | serve una risposta reale, con i suoi fallimenti reali |
| Progetto finale (L24) | è il momento in cui l'ambiente diventa quello vero |

Nota di progetto: **la banda 4 è il momento in cui l'analogia muore, e va detto
esplicitamente al ragazzo con l'estetica, non con le parole.** Al livello 19 apre
un terminale e non c'è nessun mondo. Quello, dopo diciotto livelli di officine e
cucine, è il messaggio più forte che il prodotto può mandare: adesso stai
lavorando.

---

## 22.9 Esempio lavorato — Node L19, capitolo 2, "Dove va il tempo"

```
GIOCO ........... Dove va il tempo
LIVELLO ......... Node.js, L19 Prestazioni, banda 4
CAPITOLO ........ 2 di 8 — trovare il collo di bottiglia misurando

CONCETTO ........ Il pezzo lento non è quello che pensi. Si misura, non si
                  indovina.
FORMA ........... accumulo
VERBO ........... misurare (comandi reali su un processo reale)
ARCHETIPO ....... 22 terminale, struttura da 18 tower defense
                  (decisione ora, conseguenza dopo)

OBIETTIVO ....... "Questa app risponde in 3,2 s. Portala sotto 400 ms."
                  Verificato eseguendo l'app e misurando, non leggendo il codice
VINCOLO ......... beat 4: massimo 6 comandi. Beat 2: nessun vincolo
PERDI SE ........ non c'è sconfitta: c'è il tempo che ci metti, e resta scritto
SBAGLI → ........ 1: l'output del comando dice cosa non ha funzionato
                  2: dopo 90 s senza comandi utili, la riga del profilo che
                     conta si evidenzia — non la soluzione, il punto dove
                     guardare
                  3: non esiste un livello 3 in banda 4: il ragazzo ha
                     l'output vero, e leggerlo è l'esercizio

BEAT 1 .......... un comando: eseguire il profiler e vedere l'output
BEAT 2 .......... due comandi: profilare e isolare la funzione più costosa
BEAT 3 .......... FRATTURA: la funzione che appare più volte nel profilo non
                  è quella che costa. L'istinto è ottimizzare quella con più
                  chiamate; il tempo sta in una chiamata sola che aspetta I/O
BEAT 4 .......... obiettivo composto, 6 comandi massimo
BEAT 5 .......... lo stesso senza vincolo di comandi

MONDO ........... nessuno. Terminale, monospaziato, colonna di sintesi a
                  destra con il tempo di risposta corrente
NUMERI .......... da 31 e 22.6: latenza 80-200 ms, output 12-25 ms/riga,
                  righe visibili 12-14, suggerimento a 90 s, beat 90 s-3 min
TEST 1 .......... non si può risolvere senza misurare: il codice è abbastanza
                  grande da non poter essere letto tutto nel tempo del beat,
                  e la funzione lenta cambia fra le partite. Indovinare non
                  paga: il tempo si misura e resta scritto
TEST 2 .......... "Misuro, trovo il pezzo che costa, lo cambio, rimisuro"
TEST 3 .......... il prompt è già lì con un comando suggerito nell'output
                  precedente: il primo Invio arriva in cinque secondi
```

### Perché questo non è un esercizio

Tre differenze rispetto a un esercizio di profilazione, e sono le tre leve:

1. **L'obiettivo è uno stato misurato** (< 400 ms), non un comando da indovinare.
   Il ragazzo può arrivarci come vuole: cache, query diversa, parallelizzazione.
2. **Il vincolo di sei comandi al beat 4** rende necessario pensare prima di
   digitare — che è precisamente l'abilità della profilazione.
3. **La funzione lenta cambia fra le partite**, quindi la memoria non serve e la
   procedura sì. Chi ha imparato *il metodo* vince sempre; chi ha memorizzato la
   risposta vince una volta.

Questi tre punti sono il modello per ogni livello della banda 4.
