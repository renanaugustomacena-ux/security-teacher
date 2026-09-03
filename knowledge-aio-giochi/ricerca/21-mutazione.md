# 21 — Rompere per verificare (mutazione)

> Nessun riferimento commerciale: nasce dal mutation testing. Parenti concettuali:
> i giochi in cui si gioca dalla parte dell'avversario. L'archetipo che rovescia il
> ruolo del giocatore.

---

## 21.1 Come funziona

Il giocatore non deve fare funzionare qualcosa: deve **romperlo**. Gli si dà del
codice funzionante e una suite di test che passa, e il suo compito è modificare il
codice in modo che continui a passare i test **ma faccia una cosa sbagliata**.

Ogni modifica riuscita è un punto contro i test. Il gioco, che sembra distruttivo,
insegna la cosa più difficile del testing: **quali test servono**.

La struttura:

1. **il codice** — funzionante, sotto gli occhi;
2. **i test** — passano tutti, visibili;
3. **le mutazioni disponibili** — un insieme di modifiche ammesse (cambiare un
   operatore, invertire una condizione, togliere una riga, cambiare una costante);
4. **la verifica** — si eseguono i test dopo la mutazione: se passano ancora, il
   giocatore ha vinto e i test hanno perso.

Nella seconda metà del capitolo il ruolo si rovescia di nuovo: il giocatore deve
**scrivere il test** che uccide la mutazione. È lì che si chiude il cerchio.

---

## 21.2 Perché funziona

**A. Il rovesciamento di ruolo è didatticamente potentissimo.** Chiedere "scrivi
un buon test" produce test che confermano il codice. Chiedere "rompi questo codice
senza farti scoprire" costringe a pensare a **cosa i test non guardano** — che è
la stessa competenza, dal lato che la rende visibile.

**B. Il successo è misurabile e onesto.** Una mutazione sopravvissuta è una prova
oggettiva che la suite è debole. Non c'è opinione.

**C. È divertente in modo cattivo.** Rompere le cose di nascosto è un piacere
naturale, e qui è **produttivo**. Uno dei rari casi in cui un istinto poco nobile
serve esattamente allo scopo didattico.

**D. La conseguenza è immediata e binaria.** I test passano o no. Nessuna
ambiguità, nessun giudizio.

---

## 21.3 Il core loop

> **Cambio il codice per farlo sbagliare senza che i test si accorgano.**

E nella seconda metà:

> **Scrivo il test che si accorge della mutazione, senza toccare il codice.**

---

## 21.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| applicare una mutazione | tocco su un punto mutabile, scelta dalla lista | clic, o modifica diretta | subito |
| eseguire i test | tocco sul comando | Invio | subito |
| annullare la mutazione | tocco prolungato | idem | subito |
| scrivere un test | tastiera | tastiera | capitolo 5, seconda metà del livello |

Nella prima metà, i punti mutabili sono **evidenziati** e le mutazioni si scelgono
da un insieme: così il gioco è giocabile col dito e la difficoltà resta cognitiva.
Nella seconda metà si scrive, e allora vale `22` (terminale).

---

## 21.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Righe di codice sotto attacco | 15-40 | leggibili in una schermata |
| Numero di test nella suite | 3 → 8 | |
| Punti mutabili | 6 → 20 | |
| Mutazioni per beat | 1 obiettivo, più tentativi | |
| Tentativi | illimitati | non c'è ragione di limitarli: eseguire i test è gratis |
| Tempo di esecuzione dei test | 400-900 ms simulati | deve sembrare che stia facendo qualcosa |
| Copertura mostrata | sì, ed è il punto | serve per farla vedere inutile |
| Durata di un beat | 2-4 min | |

### Il dettaglio della copertura

Il gioco **mostra la percentuale di copertura**, in grande, e la mantiene al 100%
anche quando le mutazioni sopravvivono. È deliberato: è la dimostrazione più
efficace possibile che la copertura non misura la qualità dei test.

Il ragazzo vede "copertura 100%" e tre mutazioni sopravvissute nella stessa
schermata. Nessuna spiegazione può competere con quella coppia di numeri.

---

## 21.6 Manopole della difficoltà

1. **Robustezza della suite** (la principale: da test ingenui a test seri).
2. **Numero di punti mutabili**.
3. **Tipo di mutazioni disponibili** (da "invertire una condizione" a "cambiare
   l'ordine di due operazioni indipendenti in apparenza").
4. **Codice più sottile** (concorrenza, effetti collaterali, casi limite).
5. **Rovesciamento** (scrivere il test invece della mutazione: la seconda metà).
6. **Mutazioni equivalenti** (una modifica che *sembra* rompere ma è
   semanticamente identica: il caso più raffinato, e il più istruttivo).

La manopola 6 merita una nota: le **mutazioni equivalenti** sono modifiche che
nessun test può uccidere perché il comportamento non cambia (`i <= n-1` invece di
`i < n`). Insegnano che non tutte le mutazioni sopravvissute sono colpa dei test —
distinzione che separa chi ha capito il mutation testing da chi lo usa come
metrica.

---

## 21.7 Juice specifico

- **La mutazione applicata si vede nel codice**: la riga cambia con un'animazione
  di 180 ms, e resta segnata a margine.
- **L'esecuzione dei test è teatro**: i test si spuntano uno per uno, 90 ms
  ciascuno. La tensione sta in quell'attesa.
- **La mutazione sopravvissuta è la ricompensa grossa**: tutti i test verdi, e la
  riga mutata che pulsa. Il gioco dà ragione al giocatore contro i test — un
  momento inconsueto e memorabile.
- **La mutazione uccisa non è una punizione**: il test che l'ha beccata si
  evidenzia. Il messaggio è "questo test è buono", non "hai sbagliato".
- **Il contatore della copertura resta al 100%** e non si commenta. Il silenzio
  fa il lavoro.
- **Nessun rosso** sul test che fallisce durante la caccia: il fallimento è
  l'esito atteso, non un guasto.

---

## 21.8 Come si rovina

**1. Punire la mutazione uccisa.** Se il gioco tratta il fallimento come errore,
il ragazzo smette di provare le cose interessanti.

**2. Insieme di mutazioni troppo grande.** Se i punti mutabili sono cinquanta, il
gioco diventa forza bruta. 6-20, evidenziati.

**3. Codice troppo lungo.** Oltre 40 righe non si tiene in testa e il gioco
diventa ricerca visiva.

**4. Nascondere i test.** I test devono essere sotto gli occhi: il gioco è
ragionare su di essi.

**5. Nessuna seconda metà.** Se il livello è solo "rompi", il ragazzo esce sapendo
riconoscere test deboli ma non scriverne di buoni. Il rovesciamento al capitolo 5
è obbligatorio.

**6. Mutazioni casuali generate dal gioco.** Se il gioco muta e il ragazzo guarda,
non c'è agency: il valore è nel **decidere** dove attaccare.

**7. Non gestire le mutazioni equivalenti.** Se il gioco premia una mutazione
equivalente come se fosse un buco nei test, insegna una cosa falsa.

---

## 21.9 Quali concetti può portare

Porta bene **identità** (equivalenza semantica), **irreversibilità**,
**trasformazione**. È molto specializzato: serve principalmente il livello 22, ma
copre anche pezzi di altri.

| Livello / concetto | Va? | Come |
|---|---|---|
| L22 Testing | ✅ perfetto | è il livello per cui l'archetipo esiste |
| L11 Sicurezza | ✅ ottimo | rovesciato: il giocatore attacca, e capire come si attacca è il solo modo di difendere |
| L15 Tipi e coercizione | ✅ | le mutazioni sui confronti (`==` / `===`) sopravvivono se i test non hanno casi limite |
| L8 Errori | ✅ | togliere un `try/catch` e vedere se qualche test se ne accorge |
| L23 API: gestione dei fallimenti | ✅ | mutare la risposta dell'API (lenta, malformata, assente) e vedere quali test reggono |
| L19 Prestazioni | ❌ | il tempo non è testabile così |
| L10 Stream | ❌ | flusso: `12-runner` |

**Il caso L11 vale una nota.** La sicurezza si insegna male dal lato difensivo,
perché la difesa è un elenco di regole da memorizzare. Dal lato offensivo diventa
un problema di creatività: dato questo controllo, come lo aggiro? Un ragazzo che ha
passato venti minuti a cercare di aggirare una validazione capisce perché serve la
difesa in profondità (`18` §18.10) senza che nessuno gliela nomini.

---

## 21.10 Esempio lavorato — Node L22, capitolo 3, "Il sabotatore"

```
GIOCO ........... Il sabotatore
LIVELLO ......... Node.js, L22 Testing, banda 4
CAPITOLO ........ 3 di 8 — un test che passa sempre non dice niente

CONCETTO ........ Un test serve solo se sarebbe fallito con il codice rotto.
                  Se puoi rompere il codice e i test passano ancora,
                  quei test non stanno controllando niente.
FORMA ........... identità
VERBO ........... rompere (applicare mutazioni)
ARCHETIPO ....... 21 mutazione + 22 terminale

OBIETTIVO ....... far sopravvivere una mutazione: il codice si comporta male
                  e la suite passa comunque
VINCOLO ......... solo le mutazioni dell'insieme ammesso; il codice deve
                  restare sintatticamente valido ed eseguibile
PERDI SE ........ non si perde: i tentativi sono illimitati. Ciò che conta
                  è quante mutazioni sopravvivono e in quanto tempo
SBAGLI → ........ la mutazione uccisa evidenzia il test che l'ha beccata,
                  con un tono positivo: quel test è buono
                  dopo 3 mutazioni uccise di fila, si evidenziano i rami
                  del codice che nessun test attraversa

BEAT 1 .......... suite ingenua (un solo test sul caso felice): quasi
                  qualsiasi mutazione sopravvive. Si impara il gesto
BEAT 2 .......... la suite copre due casi: serve mirare
BEAT 3 .......... FRATTURA: la copertura è al 100% e tre mutazioni
                  sopravvivono comunque. L'istinto è "copertura alta =
                  ben testato". La schermata mostra i due numeri insieme
BEAT 4 .......... suite seria, 20 punti mutabili, un solo buco
BEAT 5 .......... ROVESCIAMENTO: il gioco applica una mutazione e il
                  giocatore deve scrivere il test che la uccide

MONDO ........... nessuno. Codice a sinistra, test a destra, output dei
                  test sotto, contatore di copertura in alto
NUMERI .......... da 31 e 21.5: 15-40 righe, 3→8 test, 6→20 punti mutabili,
                  esecuzione 400-900 ms, test spuntati a 90 ms, beat 2-4 min
TEST 1 .......... non si può far sopravvivere una mutazione senza capire cosa
                  i test controllano: bisogna leggere gli assert e trovare
                  il comportamento che nessuno verifica. È letteralmente
                  l'unica strada
TEST 2 .......... "Cambio il codice perché sbagli, senza che i test se ne
                  accorgano"
TEST 3 .......... i punti mutabili pulsano appena; il primo tocco applica
                  una mutazione e i test partono da soli
```

### Perché il beat 3 è la lezione più utile del livello

Il ragazzo arriva al beat 3 con la convinzione più diffusa e più dannosa del
testing professionale: *copertura alta = codice ben testato.*

Il beat 3 gli mette davanti una suite con **copertura al 100%** — ogni riga
eseguita, ogni ramo attraversato — e tre mutazioni che sopravvivono. Il motivo è
che i test **eseguono** il codice senza **verificarne** il risultato: chiamano la
funzione e controllano che non lanci eccezioni.

Nessuna spiegazione può fare quello che fanno quei due numeri sulla stessa
schermata. E la cosa che il ragazzo porta via non è un'informazione sul mutation
testing: è **il sospetto verso una metrica**, che è un'abitudine mentale e vale per
tutta la carriera.

### Il rovesciamento del beat 5

Il beat 5 è la padronanza (`03` §3.3): più facile del 4, con tutto insieme. Qui il
rovesciamento è più facile perché il ragazzo ha appena passato quattro beat a
studiare cosa i test **non** guardano — quindi sa esattamente dove mettere l'assert.

Ed è il punto di tutto il capitolo: non gli è stato insegnato a scrivere un buon
test. Gli è stato fatto **desiderare** un buon test, dal lato di chi lo teme.
