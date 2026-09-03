# 35 — Mappa del topic Inglese · «Sotto la Rocca»

> Il terzo topic. Quattro livelli veri dell'app (`js/data/lessons-level-0..3.js`),
> 13 lezioni, 130 frasi con traduzione. Qui il concetto **è la lingua**: la frase
> inglese, la sua forma, il suo ordine, il suo suono. Nessuna analogia serve, il
> mondo è solo una cornice — e la cornice, per volere del committente, è una sola:
> una campagna alla *Shadow over Mystara*, un sottosuolo con una galleria per gioco.

## 35.1 I livelli dell'app

| Livello | Nome | Lezioni | Frasi |
|---|---|---|---|
| L0 | Sopravvivenza / Survival | greetings · essential_phrases · everyday_verbs | 30 |
| L1 | Vita quotidiana / Daily Life | describing_people · daily_routines · opinions_preferences · food_social | 40 |
| L2 | Grammatica intermedia | conditionals · passive_voice · connectors_linking | 30 |
| L3 | Verso il C1 | phrasal_verbs · idioms_expressions · abstract_vocabulary | 30 |

Ogni frase ha `english`, `italian`, `pronunciation`, `phonetic`, `example`. I giochi
usano `en`/`it` (estratti in `frasi.json` per cartella); `phonetic` servirà al
Tamburo (accento).

## 35.2 Le gallerie

Regola di `42` §42.5: registri tutti diversi tra giochi consecutivi, almeno un fondo
chiaro, R9 una volta sola.

| # | Galleria | Livello · frasi | Loop (`40`/`41`) | Registro (`42`) | Verbo | Capitoli | Stato |
|---|---|---|---|---|---|---|---|
| 1 | **Il guado dei carrelli** | L1 · 40 | Frogger ★★★ | R4 Terra a strati | saltare sul carrello giusto | 8 × 5 | ✅ `templates/inglese-sotto-la-rocca` |
| 2 | **La taverna** | L0 · 30 | Tapper ★★★ | R10 Fiera e baraccone | servire la frase giusta al cliente giusto | 6 × 5 | ✅ `templates/inglese-taverna` |
| 3 | La conduttura | L2 · 30 | Pipe Dream ★★★ | R1 Fosforo vettoriale | collegare i tratti prima che arrivi il flusso | 6 × 5 | da costruire |
| 4 | Le bolle | L3 phrasal verbs · 10 | Puzzle Bobble ★★★ | R8 Caramella e bolle | mirare la particella giusta | 2 × 5 | da costruire |
| 5 | La torretta | L3 idioms · 10 | Word Zapper / Typing ★★★ | R3 Gel su nero | sparare alle lettere nell'ordine | 2 × 5 | da costruire |
| 6 | Il tamburo | L3 abstract · 10 | Taiko ★★★ | R12 LCD Game & Watch | colpire al centro sulla sillaba accentata | 2 × 5 | da costruire |
| 7 | Il forziere | ripasso L0–L3 | Simon ★★★ | R11 Flipper | ripetere la sequenza ascoltata | 4 × 5 | da costruire |
| 8 | La torre | ripasso L0–L3 | Stacker ★★★ | R9 Neon su griglia | fermare la traduzione allineata | 4 × 5 | da costruire |

## 35.3 Le regole comuni del topic

1. **La frase si vede intera, si ascolta intera.** Ogni frase completata viene letta
   dalla sintesi vocale inglese (`speechSynthesis`, en-GB): il gioco insegna anche
   l'orecchio, senza aggiungere un verbo.
2. **Il cartello parla italiano, gli oggetti parlano inglese.** Come nel Cyber: il
   mondo è italiano, ciò che si prende in mano è inglese.
3. **I distrattori sono sempre della stessa lezione** (mai parole inventate), così
   ogni errore è un confronto tra due cose vere.
4. **Mai rosso.** L'errore costa tempo e spiega; la regola del coach contiene sempre
   la frase intera.
5. **La campagna è una.** Otto gallerie sotto la stessa Rocca; la mappa (la sezione
   del sottosuolo) è la schermata di attesa di ogni galleria.
