# 34 — La mappa dei 12 livelli di Cybersecurity

> L'abbinamento livello → concetto → forma → verbo → archetipo per i **livelli
> veri** del topic `cybersecurity` (fonte: `js/topics/data/cybersecurity.js`).
> Secondo topic del programma. Si legge prima di ogni gioco, dopo `00` e il
> capitolo dell'archetipo.

---

## 34.1 Cosa cambia rispetto a Node.js

- **12 livelli, non 24**: le bande durano **3 livelli**. I registri sono gli
  stessi quattro, già provati su Node: banda 1 legno/lanterne (L1-3), banda 2
  acciaio/ottone (L4-6), banda 3 schematica (L7-9), banda 4 terminale (L10-12).
- Struttura dati: **4 lezioni × 10 termini = 40 slot** → 8 capitoli × 5 beat.
  Una lezione dell'app copre **due capitoli** di gioco.
- Il topic insegna **terminologia inglese** (termine, pronuncia, esempio,
  comando). Il mondo resta italiano; i termini veri stanno **stampigliati in
  inglese sugli oggetti**: la targa PASSWORD sulla serratura, FIREWALL sulla
  grata, BACKUP sulla copia nel capanno. Vale la regola del registro: nessuna
  altra terminologia a schermo.
- Il coach (tre righe + demo) chiude sempre con la regola che contiene il
  termine inglese.
- In banda 4 i `command` degli item (`ufw`, `openssl`, `adb`, `yara`) sono i
  comandi **veri** del terminale di gioco.

---

## 34.2 Banda 1 — livelli 1-3 · legno e lanterne

### L1 — Fondamenti

| | |
|---|---|
| **Concetto** | Qualcosa di tuo vale anche quando non lo guardi, e chi lo vuole non passa dal centro: passa dal varco lasciato scoperto. Ogni protezione ferma **un** tipo di fatto, non tutti |
| **Forma** | contenimento + simultaneità |
| **Verbo** | proteggere (la protezione giusta davanti al fatto in corso) |
| **Archetipo** | `10` time management |
| **Frattura** | «il pericolo si annuncia» → la pioggia non bussa: metà del danno non ha una faccia |
| **Gioco** | **La casa di notte** ✅ costruito |

### L2 — Minacce Comuni

| | |
|---|---|
| **Concetto** | Le specie cattive si riconoscono da **come entrano e cosa fanno**, non dalla faccia. Due che sembrano uguali possono essere specie diverse |
| **Forma** | identità (classificazione per comportamento) |
| **Verbo** | osservare, poi smistare |
| **Archetipo** | `16` lane sorting (con gabbia d'osservazione) |
| **Frattura** | «si riconosce dall'aspetto» → il trojan è per definizione quello bello |
| **Gioco** | Il serraglio — da costruire |

### L3 — Difesa

| | |
|---|---|
| **Concetto** | Nessuna protezione ferma tutto: si mettono una dietro l'altra, ognuna per un modo di entrare. Due chiavi **diverse** valgono più di una chiave doppia |
| **Forma** | stratificazione |
| **Verbo** | sovrapporre |
| **Archetipo** | `18` tower defense (in profondità, non in larghezza) |
| **Frattura** | «una difesa forte basta da sola» → defense in depth |
| **Gioco** | La palizzata — da costruire |

---

## 34.3 Banda 2 — livelli 4-6 · acciaio e ottone

**Transizione (`03` §3.7):** il capitolo 1 di L4 ripresenta la stratificazione
di L3 nel registro nuovo.

### L4 — Reti e Sicurezza

| | |
|---|---|
| **Concetto** | Un messaggio non vola: viaggia a tappe, di mano in mano, e ogni mano legge ciò che passa in chiaro. Ogni porta ha un numero e un mestiere |
| **Forma** | instradamento |
| **Verbo** | instradare e sigillare |
| **Archetipo** | `16` lane sorting (porte e protocolli) |
| **Frattura** | «la rete è un tubo» → è una catena di mani |
| **Gioco** | La pneumatica — **apertura banda 2** |

### L5 — Crittografia

| | |
|---|---|
| **Concetto** | Una chiave sola che chiude e apre va portata di nascosto — ed è lì che casca tutto. Due chiavi legate risolvono il viaggio: la pubblica chiude, solo la privata apre. L'impronta non nasconde niente: dimostra che nulla è cambiato |
| **Forma** | accoppiamento + trasformazione |
| **Verbo** | accoppiare (la chiave giusta al lucchetto giusto) |
| **Archetipo** | `14` match (accoppiamento vincolato) |
| **Frattura** | «cifrare = nascondere tutto» → l'hash non nasconde e la firma non cifra |
| **Gioco** | Il banco delle chiavi — da costruire |

### L6 — Sicurezza Web

| | |
|---|---|
| **Concetto** | Un modulo compilato è un foglio che qualcuno **eseguirà**: se dentro le parole c'è un ordine scritto bene, il servo lo esegue come fosse tuo |
| **Forma** | trasformazione (il dato che diventa ordine) |
| **Verbo** | vagliare (l'ingresso, campo per campo) |
| **Archetipo** | `21` mutazione + `16` (ispezione allo sportello) |
| **Frattura** | «l'utente scrive dati» → scrive ordini, se glielo permetti |
| **Gioco** | Lo sportello richieste — da costruire |

---

## 34.4 Banda 3 — livelli 7-9 · schematico

### L7 — Sicurezza Sistemi

| | |
|---|---|
| **Concetto** | Ognuno deve poter toccare solo ciò che serve al suo compito. Ogni permesso in più e ogni porta aperta in più è superficie che non sorvegli |
| **Forma** | contenimento (reticolo di permessi) |
| **Verbo** | potare (la superficie, arco per arco) |
| **Archetipo** | `15` potatura vincolata su grafo |
| **Frattura** | «più accesso = più comodo» → least privilege |
| **Gioco** | Il reticolo — **apertura banda 3** |

### L8 — Risposta Incidenti

| | |
|---|---|
| **Concetto** | Quando è già successo, l'ordine delle mosse vale più della velocità: isola, conserva, capisci, ripara. Ogni traccia toccata male sparisce per sempre |
| **Forma** | ordinamento + ricostruzione |
| **Verbo** | ricostruire dalle tracce |
| **Archetipo** | `20` investigativo (Obra Dinn sui log) |
| **Frattura** | «spegni tutto subito» → spegnere brucia la memoria volatile |
| **Gioco** | La lavagna dei fatti — da costruire |

### L9 — Cloud Security

| | |
|---|---|
| **Concetto** | La casa è d'altri, la roba è tua: una riga scritta divide i compiti, e i guai stanno quasi tutti nel leggerla male |
| **Forma** | contenimento (confine di responsabilità) |
| **Verbo** | tracciare il confine |
| **Archetipo** | `16` sorting su diagramma a strati (IaaS/PaaS/SaaS) |
| **Frattura** | «è nel cloud, ci pensa il provider» → il secchio lasciato aperto è tuo |
| **Gioco** | La linea di confine — da costruire |

---

## 34.5 Banda 4 — livelli 10-12 · terminale

### L10 — Sicurezza Mobile

| | |
|---|---|
| **Concetto** | Un'app fa quello che le hai **permesso**, non quello che mostra. I permessi stanno scritti e si leggono |
| **Verbo** | interrogare (i permessi, uno strumento vero alla volta) |
| **Archetipo** | `22` terminale + `20` investigativo |
| **Frattura** | «l'app fa quel che mostra» → il manifest dice cosa PUÒ fare |
| **Gioco** | **adb** — **apertura banda 4**: `adb shell`, `pm list permissions`, `dumpsys`; il checker verifica lo **stato** dei permessi revocati, non la stringa digitata |

### L11 — Sicurezza Avanzata

| | |
|---|---|
| **Concetto** | Un programma sospetto non si capisce eseguendolo: si legge da fermo. Le stringhe, le firme e ciò che importa dicono cosa farebbe |
| **Verbo** | sezionare senza eseguire |
| **Archetipo** | `22` terminale + `21` mutazione |
| **Frattura** | «per capirlo, eseguilo» → statico prima, gabbia poi |
| **Gioco** | **strings** — `file`, `strings`, `xxd`, `yara`; il probe: la tua regola YARA deve prendere la variante E lasciar passare il file sano |

### L12 — GRC e Professionale

| | |
|---|---|
| **Concetto** | Conforme non vuol dire sicuro: la lista è il minimo. Il rischio si misura — quanto è probabile × quanto costa — e si decide coi numeri, non con la paura |
| **Verbo** | verificare a lista (audit) |
| **Archetipo** | `22` terminale + `20` |
| **Frattura** | «conforme = sicuro» → l'audit passa con un buco vero davanti |
| **Gioco** | **audit** — script di controllo veri su config vere; l'ultimo beat è un config conforme-ma-bucato che la lista non vede |

---

## 34.6 Piano di costruzione

1. ✅ **L1 La casa di notte** (apertura banda 1) — a mano, verificata.
2. Aperture rimanenti, a mano, una per registro: **L4 La pneumatica**,
   **L7 Il reticolo**, **L10 adb**.
3. Inseguitori (L2-3, L5-6, L8-9, L11-12) — a Claude Code col pacchetto di
   regressione, mai prima che l'apertura della banda sia verificata.

Ogni gioco passa i tre test di `00` §0.4 **prima** del codice; numeri da `31`;
piattaforma da `33`.

**I dodici verbi, tutti diversi:** proteggere, smistare, sovrapporre,
instradare, accoppiare, vagliare, potare, ricostruire, tracciare, interrogare,
sezionare, verificare.
