# 19 — Piattaforme 2D (platformer)

> Riferimento: Super Mario Bros. (1985), Celeste (2018), Hollow Knight. Lo
> spazio come problema fisico. L'archetipo con il game feel più difficile e la
> resa più alta se lo si azzecca.

---

## 19.1 Come funziona

Un personaggio con gravità, un salto, e uno spazio da attraversare. Le sfide sono
geometriche: distanze, altezze, tempi. Il livello è un discorso costruito con
elementi che si presentano, si combinano, si complicano.

Perché è il più difficile: il valore non sta nelle regole (sono tre righe) ma nella
**taratura**. La differenza fra un platformer bello e uno brutto è nei
millisecondi.

Numeri di Celeste, che è lo stato dell'arte del controllo:
- coyote time 5 frame (~83 ms);
- input buffer del salto 6 frame (~100 ms);
- gravità in salita minore che in discesa (asimmetria ~×0,55): l'arco è più
  leggibile;
- salto variabile: rilasciare il tasto taglia la velocità verticale;
- correzione automatica sugli angoli (**corner correction**): se il salto manca il
  bordo di pochi pixel, il gioco sposta il personaggio dentro;
- accelerazione orizzontale rapida (~6 frame per la velocità massima) e frenata
  ancora più rapida.

## 19.2 Perché funziona

**A. Il corpo capisce prima della testa.** Dopo trenta secondi le dita sanno
quanto è alto il salto. Quella conoscenza è **precisa** e non verbale, ed è la
stessa via con cui si impara un mestiere.

**B. Lo spazio è un discorso.** Un platformer ben fatto introduce un elemento,
lo fa provare in sicurezza, lo complica, lo combina con un altro, e infine chiede
la sintesi. È la struttura di una lezione, in forma di geometria (è il metodo
World 1-1, `04` §4.2).

**C. Il progresso è visibile e spaziale.** "Sono arrivato fin lì" è una misura
concreta.

**D. La morte insegna una distanza.** Ogni fallimento comunica un'informazione
metrica: il salto non arrivava. Nessun'altra forma di errore è così specifica.

## 19.3 Il core loop

> **Attraverso lo spazio usando il salto, e lo spazio mi insegna cosa il salto
> può fare.**

## 19.4 Comandi

| Comando | Touch | Desktop | Sblocco |
|---|---|---|---|
| muovi | metà sinistra dello schermo, pollice | ← → / AD | subito |
| salta | metà destra, tocco | spazio / ↑ / W | subito (è il verbo) |
| salto variabile | durata del tocco | durata del tasto | implicito, non si insegna |
| afferra / interagisci | tocco su un oggetto vicino | E / ↓ | beat 3, al primo oggetto da usare |

Vincolo grosso: **su touch il platformer è scomodo.** Con due pollici e nessun
feedback tattile, la precisione crolla. Regole per renderlo accettabile:

- zone di controllo **grandi e senza bordi visibili** (mezza schermata ciascuna);
- niente pulsanti disegnati (occupano lo schermo e comunicano imprecisione);
- movimento orizzontale **senza analogico**: si tocca a sinistra e si va a
  sinistra, alla velocità piena (niente gradazione, che su vetro non funziona);
- corner correction più generosa che su desktop (6 px invece di 4);
- coyote time più lungo (110 ms invece di 83);
- **nessuna sequenza che richieda i due pollici sincronizzati entro 100 ms.**

Se il livello richiede precisione sotto queste tolleranze, il platformer non è
l'archetipo giusto per quel contenuto.

## 19.5 Costanti di taratura

| Parametro | Valore | Note |
|---|---|---|
| Altezza del salto | 3,2 celle | la cella è l'unità: tutto si misura in celle |
| Larghezza del salto | 4,5 celle alla velocità piena | |
| Gravità in salita | 1400 px/s² | |
| Gravità in discesa | 2400 px/s² | l'asimmetria è ciò che rende l'arco leggibile |
| Velocità massima orizzontale | 5,2 celle/s | |
| Accelerazione | 0 → max in 100 ms | quasi istantanea |
| Frenata | max → 0 in 70 ms | più rapida dell'accelerazione |
| Coyote time | 110 ms (touch) / 85 ms (desktop) | |
| Input buffer del salto | 120 ms | |
| Corner correction | 6 px (touch) / 4 px (desktop) | |
| Taglio del salto al rilascio | ×0,45 sulla velocità verticale | |
| Distanza di respawn | dall'inizio della stanza corrente | mai più indietro |
| Tempo di respawn | 400 ms | il più corto di tutti gli archetipi |

### La cella come unità

Tutto si misura in celle, non in pixel. Un salto alto 3,2 celle significa che un
muro di 3 celle si supera e uno di 4 no — e il giocatore lo impara in tre
tentativi. Progettare in celle è ciò che rende il livello leggibile a vista.

## 19.6 Manopole della difficoltà

1. **Geometria** (distanze e altezze: la manopola nativa).
2. **Elementi in movimento** (piattaforme mobili, ostacoli ciclici).
3. **Combinazione di elementi** (due meccaniche insieme).
4. **Precisione richiesta** (attenzione su touch, vedi §19.4).
5. **Difficoltà concettuale di quale strada prendere** (la manopola didattica).
6. Nemici (**attenzione**: aggiungono un secondo sistema e diluiscono il primo).

## 19.7 Juice specifico

Il platformer è l'archetipo dove il juice **è** il gioco. Elenco minimo:

- **squash & stretch**: allungamento in salita (1,0/1,12), schiacciamento
  all'atterraggio (1,15/0,85) che rientra in 120 ms;
- **polvere**: all'inizio del salto, all'atterraggio, alla frenata brusca;
- **anticipazione del salto**: 2 frame di compressione prima di partire
  (33 ms) — impercettibile e indispensabile;
- **atterraggio**: hit-stop 30 ms, la camera scende di 3 px e rientra;
- **la camera è morbida e guarda avanti**: segue con 120 ms di ritardo e si
  sposta di 40 px nella direzione del movimento;
- **il vuoto sotto va visto**: quando si è sopra un dirupo la camera scende un
  po';
- **la morte è netta e brevissima**: 400 ms, il personaggio si dissolve in
  particelle, riparte. Nessuna schermata, mai;
- **il suono del passo cambia con la superficie**: legno, metallo, pietra. È il
  dettaglio che fa sembrare il mondo reale.

## 19.8 Come si rovina

**1. Nessun coyote time né buffer.** Il gioco sembra "che non registra". È il
difetto numero uno dei platformer amatoriali.

**2. Gravità simmetrica.** L'arco diventa illeggibile e i salti sembrano casuali.

**3. Accelerazione lenta.** Il personaggio sembra sul ghiaccio e ogni salto
diventa una scommessa.

**4. Pulsanti disegnati su touch.** Occupano lo schermo, mancano il bersaglio e
comunicano che il gioco non è nato per il telefono.

**5. Precisione al pixel su touch.** Vedi §19.4.

**6. Camera rigida.** Se la camera è incollata al personaggio, non si vede dove
si va e ogni salto in avanti è un salto nel buio.

**7. Il contenuto didattico appiccicato a piattaforme generiche.** Il rischio
principale per noi: un platformer normale con dei cartelli da leggere lungo la
strada. **La geometria dello spazio deve essere il concetto.** Se il concetto
non modifica la forma del livello, l'archetipo è sbagliato.

**8. Morte con schermata.** 400 ms e via. Ogni schermata riduce i tentativi, e i
tentativi sono l'apprendimento.

## 19.9 Quali concetti Node.js può portare

Porta bene **contenimento**, **dipendenza**, **accumulo**. Male **identità**,
**precedenza**, **trasformazione**.

Attenzione: è l'archetipo con il rischio più alto di **decorazione**. Un
platformer è così autosufficiente come divertimento che è facilissimo appiccicargli
il contenuto sopra invece di fonderlo. La regola: se il concetto non cambia la
**geometria** o la **fisica**, non usare questo archetipo.

| Livello / concetto | Va? | Come |
|---|---|---|
| L8 Scope: catena e closure | ✅ ottimo | le stanze sono gli scope; una closure è una piattaforma che **si porta dietro** il pezzo di stanza da cui viene, e che puoi usare fuori. Geometria = concetto |
| L16 Call stack | ✅ | scendi in una funzione = scendi in un pozzo; per uscire devi risalire nell'ordine inverso, e non puoi saltare due livelli |
| L4 Moduli: cosa esporti | ✅ | ogni stanza ha una sola porta e ciò che non porti alla porta resta dentro: `module.exports` diventa una scelta di cosa portarsi |
| L19 Prestazioni: memoria | ⚠️ | l'accumulo funziona (più roba porti, più sei lento) ma è arido |
| L7 Promise | ❌ | ordinamento temporale: `16-lane-sorting` |
| L9 Event loop | ❌ | precedenza: `16-lane-sorting` o `17-maze` |
| L15 Coercizione | ❌ | identità: `14-match-3` |
| L11 Sicurezza | ❌ | architettura: `18-tower-defense` |

**Il caso L8 è quello che giustifica l'archetipo.** Una closure è una funzione che
si porta dietro il proprio ambiente e continua a poterlo usare quando è altrove. In
un platformer questo diventa letteralmente una cosa che si prende in una stanza e
si porta fuori: un frammento di pavimento della stanza A, che fuori diventa una
piattaforma su cui stare. Nessuna spiegazione, nessun cartello: il concetto **è**
la piattaforma.

## 19.10 Esempio lavorato — Node L8, capitolo 7, "Quello che ti porti dietro"

Il capitolo 7 è quello della **velocità** (`03` §3.4): nulla di nuovo, tutto più
rapido, per automatizzare. Un platformer ci sta bene perché la maestria motoria è
esattamente ciò che si automatizza.

```
GIOCO ........... Quello che ti porti dietro
LIVELLO ......... Node.js, L8 Scope e closure, banda 2
CAPITOLO ........ 7 di 8 — la closure: portarsi dietro l'ambiente

CONCETTO ........ Quando esci da una stanza puoi portarti dietro un pezzo di
                  quella stanza, e quel pezzo continua a funzionare fuori.
                  Non è una copia: è lo stesso pezzo, e se cambia lì
                  cambia anche nelle tue mani.
FORMA ........... contenimento
VERBO ........... saltare (attraversare lo spazio)
ARCHETIPO ....... 19 platformer — Super Mario / Celeste

VINCI SE ........ raggiungi l'uscita del piano
PERDI SE ........ cadi: riparti dall'inizio della stanza, 400 ms
SBAGLI → ........ 1: cadi e riparti, senza schermate
                  2: se cadi due volte nello stesso punto, la piattaforma
                     che ti serviva pulsa una volta quando ripassi
                  3: al terzo, il frammento che va preso si illumina nella
                     stanza da cui viene, e si vede l'arco del salto in ombra

BEAT 1 .......... stanze normali, si salta: si impara l'altezza del salto
BEAT 2 .......... primo frammento da prendere: dentro la stanza A funziona
BEAT 3 .......... FRATTURA: porti il frammento fuori e lo usi. Funziona.
                  Poi la stanza A cambia (una leva) e il frammento che hai
                  in mano **cambia anche lui**. L'istinto è "l'ho preso,
                  è mio, è una copia". Non è una copia
BEAT 4 .......... due frammenti da due stanze diverse, salti in sequenza
BEAT 5 .......... tutti i casi, geometria più generosa

MONDO ........... edificio in sezione, banda 2: strutture metalliche,
                  targhette incise sui frammenti coi nomi veri delle
                  variabili, luce che filtra dalle stanze di origine
NUMERI .......... da 31: salto 3,2 celle, gravità 1400/2400 asimmetrica,
                  coyote 110 ms (touch), buffer 120 ms, corner 6 px,
                  respawn 400 ms dall'inizio della stanza
TEST 1 .......... i frammenti sono identici come materiale; l'unico segnale
                  è **da quale stanza vengono**, cioè lo scope di origine,
                  cioè il concetto. Il legame con la stanza è visibile solo
                  come un filo di luce, e quel filo è l'informazione
TEST 2 .......... "Prendo dalle stanze i pezzi che mi servono fuori, e
                  raggiungo l'uscita"
TEST 3 .......... si è su una piattaforma, il bordo è a due celle, l'uscita
                  si vede a destra: il primo salto nasce da sé
```

### Il dettaglio che porta il concetto: il filo di luce

Ogni frammento portato fuori resta collegato alla stanza di origine da un filo di
luce. Il filo non è decorazione: è **l'informazione centrale del gioco**.

Conseguenze giocabili:

- se nella stanza di origine qualcosa cambia (una leva, un'altezza), il frammento
  in mano cambia insieme, **istantaneamente**, e il filo lampeggia. Il giocatore
  vede la propria piattaforma alzarsi di una cella mentre ci sta sopra;
- due frammenti presi dalla **stessa** stanza sono collegati fra loro attraverso
  la stanza: cambiando la stanza cambiano entrambi. Due closure sullo stesso
  scope condividono l'ambiente — che è la cosa più difficile da spiegare a
  parole del livello 8, e qui è una conseguenza visibile in due secondi;
- se la stanza di origine viene chiusa, il frammento **continua a funzionare**:
  la stanza non esiste più come luogo attraversabile ma il pezzo che ti sei
  portato vive. Questo è il cuore della closure, e in un platformer diventa un
  fatto architettonico che il giocatore attraversa camminandoci sopra.

Nessuno di questi tre punti richiede una parola di spiegazione. E tutti e tre sono
cose che, chieste in un colloquio di lavoro, la maggior parte dei candidati
sbaglia.
