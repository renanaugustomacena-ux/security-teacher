# 17 — Labirinto (maze)

> Riferimento: Pac-Man (1980). Uno spazio chiuso da svuotare, inseguitori con
> comportamenti diversi, e un rovesciamento periodico dei ruoli. L'archetipo
> dello spazio come sistema.

---

## 17.1 Come funziona l'originale

Un labirinto chiuso, pieno di puntini. Si svuota il labirinto muovendosi.
Quattro fantasmi inseguono, ognuno con un algoritmo diverso. Quattro pillole
speciali rovesciano temporaneamente i ruoli: per pochi secondi il cacciatore
diventa preda.

Cosa rende Pac-Man ancora insuperato:
- **i quattro fantasmi hanno personalità algoritmiche distinte** (uno insegue
  diretto, uno anticipa, uno è imprevedibile, uno vaga); il giocatore le impara
  senza saperle enunciare;
- **i fantasmi alternano fasi di caccia e di dispersione** a intervalli fissi:
  la pressione respira;
- **il tunnel laterale**: i fantasmi rallentano lì, il giocatore no. Una via di
  fuga strutturale, non un potere;
- **la pillola energetica rovescia i ruoli**, non aumenta la forza: la stessa
  situazione con la valenza invertita;
- lo spazio è **sempre lo stesso**, quindi la maestria è conoscenza del luogo.

Numeri:
- velocità del giocatore ~11 celle/s, fantasmi 9,5-10,5;
- durata del rovesciamento: 6 s al primo livello, che scende;
- alternanza caccia/dispersione: 20 s caccia, 7 s dispersione, che si accorcia.

## 17.2 Perché funziona

**A. Lo spazio è conoscenza.** Poiché il labirinto non cambia, imparare il gioco
significa imparare un luogo: dove sono i vicoli ciechi, dove conviene svoltare,
dove ci si salva. È una forma di apprendimento **spaziale**, che è la più
robusta che gli esseri umani hanno.

**B. Gli avversari sono regole da dedurre.** Il giocatore non riceve mai la
spiegazione degli algoritmi: la ricava. Questo è, in sé, un modello di come si
insegna un sistema — e ci interessa molto: significa che l'archetipo è nativamente
adatto a far dedurre un comportamento.

**C. Il rovesciamento periodico.** Il cambio di valenza dello stesso oggetto
(pericolo → preda) è una delle idee più forti del design di giochi. Insegna che
la relazione conta più dell'oggetto.

**D. Non c'è progresso da salvare.** Ogni livello è lo stesso spazio; ciò che
cresce è la tua abilità. Non c'è niente da sbloccare, e questo rende il gioco
puro.

## 17.3 Il core loop

> **Attraverso lo spazio per svuotarlo, evitando ciò che lo percorre con regole
> che devo capire.**

## 17.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| direzione | swipe in 4 direzioni | frecce / WASD | subito |
| — | — | — | non c'è altro |

Un solo comando, quattro valori. Come Pac-Man: nessuna azione, nessun tasto
speciale, nessun potere attivabile. Tutto ciò che accade dipende da **dove
sei**, e questa è la ragione per cui il gioco è ancora leggibile dopo
quarant'anni.

Dettagli di input (su touch, questa è la parte delicata):
- lo swipe imposta la direzione **desiderata**, che si applica alla prima
  intersezione utile. Se il giocatore fa swipe a metà corridoio, la svolta
  avviene all'incrocio;
- la direzione desiderata resta in memoria 400 ms;
- **taglio dell'angolo**: se il giocatore imposta la direzione fino a 120 ms
  prima di un incrocio, la svolta è pulita. Senza questa tolleranza il gioco su
  touch è ingiocabile;
- la direzione opposta si applica **subito** (invertire non richiede un incrocio).

## 17.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Dimensione labirinto | 15×15 → 21×21 celle | oltre, su telefono le celle sono troppo piccole |
| Velocità giocatore | 8 celle/s | |
| Velocità inseguitori | 6,8 → 7,6 celle/s | **sempre inferiore** al giocatore |
| Durata memoria direzione | 400 ms | |
| Tolleranza taglio angolo | 120 ms | |
| Alternanza caccia / dispersione | 18 s / 8 s | la dispersione è il respiro (`03` §3.1) |
| Durata rovesciamento | 7 s → 4 s | |
| Inseguitori | 1 → 4 | uno per volta, uno per beat |
| Numero di cose da raccogliere | 40-90 | |

### La regola della velocità

Gli inseguitori devono essere **sempre più lenti** del giocatore. Se sono più
veloci, l'unica strategia è la fuga perfetta e il gioco diventa ansia. Se sono
molto più lenti, non c'è pressione. Il rapporto giusto è 0,85-0,95.

## 17.6 Manopole della difficoltà

1. **Numero di inseguitori** (la principale, e uno per beat).
2. **Velocità relativa** (0,85 → 0,95).
3. **Complessità dell'algoritmo di inseguimento** (la manopola interessante: da
   "va verso di te" a "anticipa dove sarai").
4. **Topologia del labirinto** (meno vicoli ciechi = più facile; le scorciatoie
   cambiano tutto).
5. **Difficoltà concettuale di cosa raccogliere e cosa no** (la manopola
   didattica).
6. **Durata del rovesciamento** (7 s → 4 s).

## 17.7 Juice specifico

- **Il movimento non ha accelerazione**: velocità costante, cambio di direzione
  istantaneo. È l'unico archetipo dove l'assenza di inerzia è corretta: rende lo
  spazio prevedibile, che è il punto.
- **Ogni cosa raccolta ha un suono che sale di tono**: la sequenza forma una
  frase musicale. È il feedback più economico ed efficace che esista.
- **Gli inseguitori telegrafano il cambio di fase**: quando passano da caccia a
  dispersione girano su sé stessi per 300 ms. Il giocatore deve poter leggere lo
  stato del sistema dal loro comportamento.
- **La cattura è lenta e sonora**: 700 ms in cui tutto si ferma tranne il
  giocatore che si affloscia. Nessuna schermata.
- **Il rovesciamento cambia la musica, non solo i colori**: e negli ultimi 1,5 s
  la musica accelera. Il ritorno alla normalità va anticipato.
- **Lo spazio va ricordato**: le zone già svuotate restano visibilmente diverse,
  così la mappa mentale si costruisce guardando.

## 17.8 Come si rovina

**1. Inseguitori più veloci del giocatore.** Vedi §17.5.

**2. Labirinto che cambia ogni mano.** Distrugge la proprietà A: se lo spazio è
casuale, non c'è conoscenza da accumulare e il gioco diventa reazione. Il
labirinto va **fisso per capitolo** e cambia fra i capitoli.

**3. Inseguitori con lo stesso algoritmo.** Quattro copie della stessa regola
producono un branco che si muove insieme: sembrano uno solo, e non c'è niente da
dedurre.

**4. Nessun taglio dell'angolo su touch.** Il gioco diventa una prova di
tempismo con lo swipe.

**5. Un potere attivabile.** Rompe l'eleganza dell'unico comando e sposta
l'attenzione dalla posizione al bottone.

**6. Vicoli ciechi troppo profondi.** Un vicolo cieco più lungo di 4 celle è una
condanna a morte senza scelta.

**7. Le cose da raccogliere identiche fra loro.** Nel Pac-Man originale va bene
perché lo scopo è svuotare. Nel nostro caso, se tutto va raccolto, non c'è
decisione didattica: serve che **alcune cose non vadano raccolte**, e che la
distinzione sia il concetto.

## 17.9 Quali concetti Node.js può portare

Porta bene **contenimento** (scope, come spazio!), **instradamento**,
**simultaneità**, **accumulo**. Male **ordinamento**, **irreversibilità**.

Il criterio: il labirinto è **spazio con confini e percorsi**. Porta ogni
concetto che è topologico — dove qualcosa può o non può arrivare.

| Livello / concetto | Va? | Come |
|---|---|---|
| L8 Scope e closure | ✅ perfetto | il labirinto **è** la catena degli scope: stanze dentro stanze. Da dentro vedi fuori, da fuori non vedi dentro. Le pareti sono la visibilità delle variabili |
| L9 Event loop: le fasi come ciclo | ✅ ottimo | il labirinto è circolare, i settori sono le fasi, e tu giri sempre nello stesso ordine. Le cose da raccogliere si presentano nella fase in cui vanno gestite |
| L11 Sicurezza: superficie d'attacco | ✅ | il labirinto è il sistema, gli inseguitori sono gli attacchi, e le pareti sono i controlli. Chiudere un passaggio ne apre un altro |
| L13 EventEmitter | ⚠️ | funziona ma è meno naturale che con le corsie |
| L18 Cluster / worker | ✅ | più labirinti identici affiancati, e il carico si distribuisce |
| L5 npm | ❌ | dipendenza: `15-stacking` |
| L7 Promise | ❌ | ordinamento temporale: `16-lane-sorting` |
| L10 Stream | ❌ | flusso lineare: `12-runner` |

**Il caso L8 (scope) è quello che vale il capitolo.** Lo scope è, letteralmente,
un fatto spaziale: una variabile dichiarata dentro una funzione è visibile
dentro e invisibile fuori. Tutte le spiegazioni usano metafore spaziali
("dentro", "fuori", "sopra") perché il concetto **è** spaziale — e un labirinto è
la sua rappresentazione naturale.

Progetto: stanze annidate con pareti a senso unico dal punto di vista della
*vista*, non del movimento. Dentro una stanza vedi la stanza e tutto quello che
la contiene; da fuori la stanza è opaca. Le cose da raccogliere sono le
variabili, e raccogliere una variabile che da lì non sarebbe visibile produce un
`ReferenceError`: la cosa svanisce in mano e la stanza si spegne per un istante.

## 17.10 Esempio lavorato — Node L8, capitolo 4, "Le stanze dentro le stanze"

Il capitolo 4 di un livello è il **respiro** (`03` §3.4): difficoltà media 0,45 e
la variante più giocosa. Il labirinto ci sta bene, perché è l'archetipo più
familiare e meno faticoso della raccolta.

```
GIOCO ........... Le stanze dentro le stanze
LIVELLO ......... Node.js, L8 Scope e closure, banda 2
CAPITOLO ........ 4 di 8 — cosa si vede da dove

CONCETTO ........ Stando dentro una stanza vedi quello che c'è nella stanza e
                  in tutte quelle che la contengono. Non vedi mai dentro le
                  stanze che stanno accanto o più in dentro.
FORMA ........... contenimento
VERBO ........... attraversare (muoversi nello spazio)
ARCHETIPO ....... 17 maze — Pac-Man

VINCI SE ........ raccogli tutte le cose che da dove passi sono visibili
PERDI SE ........ tre volte allunghi la mano su una cosa che da lì non è
                  visibile: la stanza si spegne e resti al buio. Non è un
                  punto perso, è un ReferenceError
SBAGLI → ........ 1: la cosa svanisce in mano con un tonfo vuoto
                  2: le pareti della stanza che la contiene si illuminano
                     per 400 ms: si vede *dove* stava davvero
                  3: coaching con la pianta delle stanze annidate

BEAT 1 .......... una stanza sola, tutto visibile: si impara a muoversi
BEAT 2 .......... una stanza dentro un'altra; da fuori la interna è opaca
BEAT 3 .......... FRATTURA: due stanze sorelle. Sei stato nella prima, hai
                  visto cosa c'era; ora sei nella seconda e quella cosa
                  sembra ancora "tua". Non lo è: le sorelle non si vedono
BEAT 4 .......... tre livelli di annidamento, due inseguitori
BEAT 5 .......... tutti i casi, un inseguitore, più lento

MONDO ........... pianta di un edificio vista dall'alto, banda 2: linee
                  tecniche, targhette con i nomi veri delle variabili sulle
                  porte, luce che cambia a seconda di dove sei
NUMERI .......... da 31: labirinto 17×17, giocatore 8 celle/s, inseguitori
                  6,8 (0,85), memoria direzione 400 ms, taglio angolo 120 ms,
                  caccia/dispersione 18 s / 8 s
TEST 1 .......... le cose da raccogliere sono identiche fra loro; l'unico
                  segnale è **dove stai tu rispetto a dove stanno loro**,
                  cioè lo scope. Nessun colore, nessuna forma che distingua
                  le raccoglibili dalle non raccoglibili
TEST 2 .......... "Raccolgo solo ciò che da dove sono si vede, muovendomi
                  senza farmi prendere"
TEST 3 .......... si è già dentro una stanza, una cosa luccica a due passi,
                  il primo swipe nasce da sé
```

### Il dettaglio che porta il concetto: la vista, non il movimento

La regola centrale, ed è quella che va implementata con precisione:

> **Il movimento è libero. La vista è annidata.**

Il giocatore può camminare dove vuole. Ciò che cambia è **cosa è raccoglibile**
da dove si trova, e la regola è quella dello scope:

| Sei in | Vedi | Non vedi |
|---|---|---|
| stanza radice | radice | tutte le interne |
| stanza A (dentro radice) | A + radice | B, e le interne di A |
| stanza A.1 (dentro A) | A.1 + A + radice | B, B.1 |

Le cose non visibili **si vedono comunque sullo schermo** — questo è
fondamentale, ed è il rovescio del solito nascondere: sono lì, luccicano, sono
tentanti. Ma allungare la mano su una di quelle produce il buio. È così che il
gioco insegna che la variabile *esiste* ma non è *accessibile*, che è la
distinzione precisa che i principianti non fanno.

La frattura del beat 3 è la parte migliore: dopo essere stato dentro la stanza A e
aver raccolto `contatore`, il giocatore passa in B, vede un altro `contatore`
luccicare, e allunga la mano con la sicurezza di chi conosce quel nome. Buio. Due
stanze sorelle possono avere variabili con lo stesso nome e non sono la stessa
cosa — che è, sostanzialmente, la ragione per cui lo scope esiste.
