# 32 — La mappa dei 24 livelli di Node.js

> L'abbinamento livello → concetto → forma → verbo → archetipo per i **livelli
> veri** del topic `nodejs` (fonte: `js/topics/data/nodejs.js` del repo).
> Questo capitolo è il piano di costruzione: si legge prima di ogni gioco.

---

## 32.1 Correzione del 14 agosto

La prima versione di questo capitolo usava un elenco di livelli **inventato**
(«L2 Runtime», «L3 CommonJS», «L9 Event loop»…). Il programma vero ha altri 24
livelli, con altri nomi e un altro ordine. Costruire altri giochi su un indice
sbagliato sarebbe stato il difetto più costoso di tutto il progetto, quindi il
capitolo è riscritto sui livelli reali.

I sette giochi già costruiti restano validi come **giochi**: cambiano di
etichetta, non di meccanica. La riassegnazione è in §32.7.

Struttura del topic: **24 livelli, 40 lezioni ciascuno**, 8 capitoli da 5 beat
(`03` §3.4). Un livello = un gioco; gli 8 capitoli sono 8 configurazioni di beat
dentro quel gioco, non 8 giochi diversi.

---

## 32.2 Banda 1 — livelli 1-6

Registro: fisico, analogico. Nessuna terminologia a schermo tranne i nomi veri
stampigliati sugli oggetti. Notte, lanterne, legno, ottone assente.

### L1 — Fondamenti

| | |
|---|---|
| **Concetto** | C'è un posto che aspetta che qualcuno chieda qualcosa. Quando glielo chiedono lo prepara e lo dà. Se nessuno chiede, non fa niente |
| **Forma** | simultaneità |
| **Verbo** | servire (toccare: chi adesso) |
| **Archetipo** | `10` time management |
| **Frattura** | «il programma agisce quando vuole» → reagisce, non agisce |
| **Gioco** | **Il chiosco di notte** ✅ costruito |

### L2 — Moduli e NPM

| | |
|---|---|
| **Concetto** | Quando chiedi una cosa per nome, chi te la porta la cerca sempre negli stessi posti, in ordine. E un ricambio non deve essere identico: deve essere uno che ci va |
| **Forma** | ordinamento (risoluzione) + identità (versioni) |
| **Verbo** | deviare (cap. 1-3) · scambiare (cap. 4-6) · posare (cap. 7-8) |
| **Archetipo** | `12` runner, poi `14` match-3, poi `15` stacking |
| **Frattura** | «il nome dice dove sta» → un nome nudo si cerca risalendo |
| **Gioco** | **La discesa dei moduli** ✅ · **Il magazzino delle versioni** ✅ · **La soglia** ✅ (tre meccaniche per gli 8 capitoli di questo livello) |

### L3 — JavaScript Essenziale

| | |
|---|---|
| **Concetto** | Due cose possono essere considerate uguali senza essere la stessa cosa, e la regola di quando succede non è ovvia |
| **Forma** | identità |
| **Verbo** | raggruppare |
| **Archetipo** | `14` match-3 |
| **Frattura** | «se sembrano uguali sono uguali» → `==` e `===` non sono la stessa domanda |
| **Gioco** | da costruire |

### L4 — Asincrono Base

| | |
|---|---|
| **Concetto** | Alcune cose devi starci davanti dall'inizio alla fine. Altre le avvii e vai a fare altro: ti chiamano loro. E l'ordine in cui ti richiamano non è quello in cui hai chiesto |
| **Forma** | simultaneità + precedenza |
| **Verbo** | tenere premuto (cap. 1-4) · dare la corsia (cap. 5-8) |
| **Archetipo** | `10` press-and-hold, poi `16` lane sorting |
| **Frattura** | «prima chi è arrivato prima» |
| **Gioco** | **La cucina di notte** ✅ · **La sala di smistamento** ✅ |

### L5 — File System e Path

| | |
|---|---|
| **Concetto** | Gli attrezzi per toccare i file esistono solo dove il programma gira davvero. E un percorso non è una stringa: è una strada che può essere scritta in modi diversi |
| **Forma** | contenimento |
| **Verbo** | afferrare al volo |
| **Archetipo** | `11` slash |
| **Frattura** | «roba di rete = solo browser» → `fetch` esiste anche qui |
| **Gioco** | **L'officina di notte** ✅ |

### L6 — HTTP e Server

| | |
|---|---|
| **Concetto** | Ogni richiesta che arriva ha un metodo e un indirizzo, e la risposta che dai ha un numero che dice com'è andata |
| **Forma** | instradamento |
| **Verbo** | smistare a corsie |
| **Archetipo** | `16` lane sorting |
| **Frattura** | «basta rispondere» → il codice di stato è parte della risposta |
| **Gioco** | da costruire |

---

## 32.3 Banda 2 — livelli 7-12

Registro: meccanico e sistemico. Acciaio, quadranti a lancetta, targhette di
ottone incise coi nomi veri. Nessun legno, nessuna lanterna.

**Transizione (`03` §3.7):** il capitolo 1 del livello 7 ripresenta
l'instradamento del livello 6 nel linguaggio nuovo.

### L7 — Express Fondamenti

| | |
|---|---|
| **Concetto** | Una catena di controlli, in ordine: ognuno può fermare, cambiare o passare al successivo |
| **Forma** | instradamento |
| **Verbo** | comporre la catena (piazzare in sequenza) |
| **Archetipo** | `18` tower defense (lungo un percorso) |
| **Frattura** | «l'ordine non conta» → conta tutto |

### L8 — Progettazione API REST

| | |
|---|---|
| **Concetto** | Il nome di una risorsa dice cosa è, non cosa fare. Il verbo lo dice il metodo |
| **Forma** | contenimento (risorse annidate) |
| **Verbo** | costruire l'indirizzo pezzo per pezzo |
| **Archetipo** | `15` stacking (composizione vincolata) |
| **Frattura** | «metto il verbo nell'indirizzo» → `/getUser` non è REST |

### L9 — Middleware

| | |
|---|---|
| **Concetto** | Ogni pezzo della catena vede la richiesta a metà strada e decide se farla proseguire |
| **Forma** | trasformazione |
| **Verbo** | dare la corsia |
| **Archetipo** | `16` lane sorting |
| **Frattura** | «se non chiamo `next()` va avanti comunque» → resta appesa |

### L10 — Integrazione Database

| | |
|---|---|
| **Concetto** | Chiedere la cosa giusta costa mille volte meno che chiedere tutto e scegliere dopo |
| **Forma** | trasformazione |
| **Verbo** | comporre la richiesta |
| **Archetipo** | `15` stacking vincolato |
| **Frattura** | «prendo tutto e filtro dopo» → il costo è nel trasporto |

### L11 — Autenticazione

| | |
|---|---|
| **Concetto** | Chi dice di essere qualcuno deve portare una prova che non può essersi fabbricato da solo |
| **Forma** | identità |
| **Verbo** | confrontare due sigilli |
| **Archetipo** | `14` match-3 (identità), varianti da `18` |
| **Frattura** | «il token dice chi sei» → dice solo che qualcuno l'ha firmato |

### L12 — Gestione Errori

| | |
|---|---|
| **Concetto** | Un errore che nessuno prende in mano non si fermа lì: sale, e in cima spegne tutto |
| **Forma** | instradamento |
| **Verbo** | afferrare al volo |
| **Archetipo** | `11` slash |
| **Frattura** | «try/catch prende tutto» → non l'asincrono che non attendi |

---

## 32.4 Banda 3 — livelli 13-18

Registro: astratto e schematico. Diagrammi giocabili, grafi, nodi e archi.
Terminologia corrente, il codice compare come oggetto.

**Transizione:** il capitolo 1 del livello 13 ripresenta la gestione errori del
livello 12 come grafo.

### L13 — Stream e Buffer

| | |
|---|---|
| **Concetto** | I dati arrivano a pezzi, e se chi riceve è più lento di chi manda, qualcuno deve rallentare |
| **Forma** | accumulo |
| **Verbo** | deviare (sei tu il dato) |
| **Archetipo** | `12` endless runner |
| **Frattura** | «se rallenta si perde qualcosa» → il flusso si ferma a monte |

### L14 — Sistema di Eventi

| | |
|---|---|
| **Concetto** | Una cosa che succede può interessare a molti, e ognuno reagisce senza sapere degli altri |
| **Forma** | instradamento |
| **Verbo** | collegare (tracciare archi) |
| **Archetipo** | `16` lane sorting in forma di grafo |
| **Frattura** | «chi emette sa chi ascolta» → non lo sa e non deve |

### L15 — Testing

| | |
|---|---|
| **Concetto** | Un test serve solo se sarebbe fallito con il codice rotto |
| **Forma** | identità |
| **Verbo** | rompere |
| **Archetipo** | `21` mutazione |
| **Frattura** | «copertura alta = ben testato» |

### L16 — Sicurezza

| | |
|---|---|
| **Concetto** | Ogni tipo di attacco passa da una porta diversa. Un controllo ferma la sua porta e nessun'altra |
| **Forma** | instradamento |
| **Verbo** | piazzare |
| **Archetipo** | `18` tower defense |
| **Frattura** | «validato = sicuro» → serve la difesa in profondità |

### L17 — WebSocket e Tempo Reale

| | |
|---|---|
| **Concetto** | Una linea che resta aperta nei due sensi: nessuno deve più chiedere per sapere |
| **Forma** | simultaneità |
| **Verbo** | tenere la linea (due mani) |
| **Archetipo** | `10` time management con risorsa condivisa |
| **Frattura** | «chiedo più spesso e vado uguale» → il polling non è tempo reale |

### L18 — Worker e Concorrenza

| | |
|---|---|
| **Concetto** | Se due cose lavorano insieme sulla stessa roba, l'ordine in cui capitano cambia il risultato — e non lo decidi tu |
| **Forma** | simultaneità |
| **Verbo** | scegliere cosa fare adesso, su più attori |
| **Archetipo** | `10` time management, risorse condivise |
| **Frattura** | «ha funzionato dieci volte, funziona» → la race condition passa i test |

---

## 32.5 Banda 4 — livelli 19-24

Registro: tecnico e letterale. Terminale vero, sintassi vera, nessuna analogia.
**Leggere `22` prima di scrivere una riga di questa banda.**

### L19 — TypeScript Base

| | |
|---|---|
| **Concetto** | Dichiarare la forma di un dato è un contratto che si controlla prima di partire |
| **Forma** | identità |
| **Verbo** | dichiarare e far compilare |
| **Archetipo** | `22` terminale + `21` mutazione (rompi il tipo, vedi se il compilatore se ne accorge) |
| **Frattura** | «`any` fa passare tutto» → sì, ed è il punto: non controlla niente |

### L20 — Architettura

| | |
|---|---|
| **Concetto** | Ogni strato vede quello sotto e non quello sopra. Cambiare in basso rifà tutto sopra |
| **Forma** | dipendenza |
| **Verbo** | impilare |
| **Archetipo** | `15` stacking, in forma di terminale |
| **Frattura** | «cambiare l'ultima riga è veloce» → dipende da quanto in basso hai toccato |

### L21 — Performance

| | |
|---|---|
| **Concetto** | Il pezzo lento non è quello che pensi. Si misura, non si indovina |
| **Forma** | accumulo |
| **Verbo** | misurare e tagliare |
| **Archetipo** | `22` terminale, struttura da `18` |
| **Frattura** | «ottimizzo il ciclo più grosso» → il collo di bottiglia è altrove |

### L22 — Deploy

| | |
|---|---|
| **Concetto** | In produzione non puoi guardarci dentro: puoi solo leggere quello che ha lasciato scritto |
| **Forma** | ordinamento (ricostruire una sequenza) |
| **Verbo** | interrogare |
| **Archetipo** | `20` investigativo |
| **Frattura** | «l'errore è dove è comparsa l'eccezione» → la causa è prima |

### L23 — Microservizi

| | |
|---|---|
| **Concetto** | Chi ti dà i dati può essere lento, sbagliato o assente, e il tuo lavoro deve funzionare comunque |
| **Forma** | dipendenza |
| **Verbo** | comporre una catena resiliente |
| **Archetipo** | `18` tower defense, in forma di terminale |
| **Frattura** | «l'altro servizio risponde» → prevedere il fallimento è il lavoro |

### L24 — Node.js Professionale

| | |
|---|---|
| **Concetto** | Tutto insieme, senza aiuti |
| **Forma** | tutte |
| **Verbo** | costruire |
| **Archetipo** | nessuno: è un ambiente, non un gioco |
| **Frattura** | nessuna: qui si dimostra |

---

## 32.6 Vincoli di distribuzione

- **Due livelli consecutivi non usano lo stesso archetipo.** Controllo:
  L4 (`10`/`16`) → L5 (`11`) → L6 (`16`) ✓ · L9 (`16`) → L10 (`15`) ✓ ·
  L17 (`10`) → L18 (`10`) ✗ → L18 passa a `16` lane sorting con due attori.
- **Nessun archetipo più di quattro volte** in 24 livelli.
- **Ogni banda contiene almeno quattro archetipi diversi.**

| Archetipo | Livelli | Volte |
|---|---|---|
| `16` lane sorting | L4, L6, L9, L14, L18 | 5 → spostare L14 su grafo dedicato |
| `15` stacking | L2, L8, L10, L20 | 4 |
| `14` match-3 | L2, L3, L11 | 3 |
| `18` tower defense | L7, L16, L23 | 3 |
| `10` time management | L1, L4, L17 | 3 |
| `11` slash | L5, L12 | 2 |
| `12` runner | L2, L13 | 2 |
| `22` terminale | L19, L21 | 2 |
| `20` investigativo | L22 | 1 |
| `21` mutazione | L15, L19 | 2 |

---

## 32.7 I sette giochi già costruiti, riassegnati

| Gioco | Cartella | Livello vero | Capitoli che coprirà |
|---|---|---|---|
| Il chiosco di notte | `nodejs-l1-chiosco` | **L1 Fondamenti** | 1-8 |
| L'officina di notte | `nodejs-l2-officina` | **L5 File System e Path** | 1-8 |
| La discesa dei moduli | `nodejs-l3-discesa` | **L2 Moduli e NPM** | 1-3 |
| Il magazzino delle versioni | `nodejs-l5-magazzino` | **L2 Moduli e NPM** | 4-6 |
| La soglia | `nodejs-l4-soglia` | **L2 Moduli e NPM** | 7-8 |
| La cucina di notte | `nodejs-l6-cucina` | **L4 Asincrono Base** | 1-4 |
| La sala di smistamento | `nodejs-l9-smistamento` | **L4 Asincrono Base** | 5-8 |

Le cartelle mantengono lo slug con cui sono nate (rinominarle romperebbe i link
dell'indice di banda); l'etichetta a schermo e la scheda in testa al file vanno
allineate al livello vero.

Conseguenza importante: **L2 e L4 sono già coperti da tre e due giochi**, quindi
i loro 8 capitoli si dividono fra meccaniche diverse. È il caso più ricco e va
tenuto come modello: un livello lungo può cambiare gioco a metà, purché il
registro della banda resti.

---

## 32.8 Cosa manca

| | |
|---|---|
| Livelli con almeno un gioco | 4 su 24 (L1, L2, L4, L5) |
| Livelli senza gioco | 20 |
| Capitoli coperti | ~7 su 192 |

Ordine di costruzione: chiudere i capitoli dei livelli già iniziati (L1, L2, L4,
L5), poi L6 e L3 per completare la banda 1, poi la banda 2 in ordine.
