<p align="center">
  <img src="https://img.shields.io/badge/licenza-MIT-blue.svg" alt="Licenza" />
  <img src="https://img.shields.io/badge/docker-pronto-green.svg" alt="Docker" />
  <img src="https://img.shields.io/badge/deploy-Netlify-00C7B7.svg" alt="Netlify" />
  <img src="https://img.shields.io/badge/JS-Vanilla%20ES6+-F7DF1E.svg" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/3D-Three.js-000000.svg" alt="Three.js" />
  <img src="https://img.shields.io/badge/test-Vitest-6E9F18.svg" alt="Vitest" />
</p>

<h1 align="center">Knowledge AIO</h1>

<p align="center">
  <strong>Impara l'inglese con la musica hip-hop, il karaoke e gli esercizi interattivi — tutto in locale, tutto sicuro.</strong>
</p>

<p align="center">
  <a href="https://english-app-renan.netlify.app/"><strong>Provalo subito</strong></a>
</p>

<p align="center">
  <a href="README.md">English</a> &middot;
  <a href="README.pt-br.md">Portugues Brasileiro</a>
</p>

---

## Indice

- [Panoramica](#panoramica)
- [Funzionalita](#funzionalita)
- [Guida rapida](#guida-rapida)
- [Sviluppo](#sviluppo)
- [Architettura](#architettura)
- [Stack tecnologico](#stack-tecnologico)
- [Sicurezza](#sicurezza)
- [Struttura del progetto](#struttura-del-progetto)
- [Contribuire](#contribuire)
- [Licenza](#licenza)

---

## Panoramica

**Knowledge AIO** e una single-page application local-first progettata per aiutare gli italiani a imparare l'inglese dal livello sopravvivenza fino al C1. Combina lezioni strutturate tradizionali con l'apprendimento musicale (karaoke con fonetica) e un vasto vocabolario tecnico in quattro domini: Cybersecurity, Python, Linux e Sviluppo Software.

Tutti i dati dell'utente restano sul dispositivo tramite IndexedDB — nessun account, nessuna raccolta dati lato server, nessun tracciamento. L'app gira in un container Docker con sicurezza rafforzata oppure puo essere distribuita come sito statico su Netlify.

---

## Funzionalita

### Modalita di apprendimento

| Modalita                  | Descrizione                                                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Karaoke**               | Modalita passo-passo e in tempo reale con trascrizione fonetica, analisi del vocabolario e testi sincronizzati                |
| **Lezioni strutturate**   | 4 livelli (0-3): Sopravvivenza, Vita quotidiana, Grammatica intermedia, Inglese avanzato C1                                   |
| **7 modalita di pratica** | Ascolto, Scrittura, Abbinamento, Riempi gli spazi, Ricostruzione di frasi, Comprensione, Scenari                              |
| **Argomenti tecnici**     | 4 domini (Cybersecurity, Python, Linux, Sviluppo Software), 12 livelli ciascuno, 11 tipi di esercizio incluse sfide di codice |
| **Parola del giorno**     | Rotazione deterministica giornaliera del vocabolario, attinta da tutte le fonti                                               |

### Esperienza visiva

| Effetto                   | Descrizione                                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Splash screen**         | Logo animato di lusso con rivelazione fluida all'avvio                                                                                  |
| **Pioggia Matrix 3D**     | Sfondo morphing Three.js con deformazione che segue il cursore e rifrazione                                                             |
| **Particelle al cursore** | Scia di particelle ambientali con effetto alone, disattivata automaticamente su dispositivi touch e con preferenza di movimento ridotto |

### Tracciamento dei progressi

- Parole apprese, canzoni completate, serie consecutive e XP — tutto salvato localmente via IndexedDB
- Griglia di selezione modalita dopo il completamento della lezione per un flusso di pratica guidato
- Nessuna sincronizzazione cloud, nessun account richiesto

### Accessibilita

- Rispetta `prefers-reduced-motion` — gli effetti visivi si degradano con grazia
- Indicatori di focus da tastiera per la navigazione completa
- Fallback per dispositivi touch su tutti gli elementi interattivi
- Page Visibility API mette in pausa gli effetti quando la scheda e inattiva

---

## Guida rapida

> Tutto cio che serve per avviare l'app in meno di 2 minuti.

### Prerequisiti

| Strumento          | Versione minima | Comando di verifica      |
| ------------------ | --------------- | ------------------------ |
| **Docker**         | 20.10+          | `docker --version`       |
| **Docker Compose** | v2+             | `docker compose version` |

### 1. Clona il repository

```bash
git clone https://github.com/renanaugustomacena-ux/security-teacher.git
cd security-teacher
```

### 2. Build e avvio

```bash
docker compose up --build -d
```

Questo comando:

- Costruisce l'immagine **Alpine Nginx** con header di sicurezza rafforzati (CSP, X-Frame-Options, protezione MIME)
- Esegue nginx come **utente non-root** (UID 101) con tutte le capability rimosse
- Monta il codice sorgente per **aggiornamenti in tempo reale durante lo sviluppo**

### 3. Apri l'app

```
http://localhost:8080
```

Vedrai lo splash screen di Knowledge AIO seguito dalla dashboard con lo sfondo matrix rain.

> Il primo build scarica l'immagine base e potrebbe richiedere 1-2 minuti. Gli avvii successivi sono istantanei.

### 4. Arresta l'app

```bash
# Arresto regolare (mantiene l'immagine)
docker compose down

# Arresta e rimuove tutte le immagini
docker compose down --rmi all
```

### Verifica che sia in esecuzione

```bash
# Stato del container
docker ps --filter name=Renan-english-app

# Health check HTTP rapido
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8080/

# Log in tempo reale
docker logs Renan-english-app --tail 50 -f
```

### Alternativa: deploy statico (senza Docker)

L'app e puro HTML/CSS/JS statico — puoi servirla con qualsiasi web server:

```bash
# Con Node.js
npx serve .

# Con Python
python -m http.server 8080
```

---

## Sviluppo

### Installazione dipendenze di sviluppo

```bash
npm install
```

Installa ESLint, Prettier, Vitest, Husky e commitlint — solo strumenti di sviluppo, nulla finisce in produzione.

### Esecuzione dei test

```bash
npm test              # Esecuzione singola
npm run test:watch    # Modalita watch
```

### Linter e formatter

```bash
npm run lint          # ESLint (base Airbnb)
npm run format        # Prettier
```

### Modifica del codice in tempo reale

Poiche la directory del progetto e montata tramite bind-mount nel container, ogni file salvato viene immediatamente servito da nginx — **nessun rebuild necessario**.

> **Utenti Linux con il progetto su un'unita NTFS:** i bind mount Docker da NTFS3 non funzionano in modo affidabile. Copia il progetto su un filesystem ext4 nativo:
>
> ```bash
> cp -r /path/to/project ~/security-teacher
> cd ~/security-teacher
> sudo docker compose up --build -d
> ```

---

## Architettura

```
Browser
  |
  +-- index.html (shell SPA)
  |
  +-- js/app.js (entry point, routing, ciclo di vita delle viste)
  |     |
  |     +-- MorphBackground.js -----> Three.js WebGL (pioggia matrix 3D)
  |     +-- CursorParticles.js -----> Canvas 2D (scia di particelle)
  |     |
  |     +-- LearnManager.js --------> lessons.js (database lezioni)
  |     +-- PracticeManager.js -----> 7 motori per le modalita di pratica
  |     +-- MusicManager.js --------> songs.js + AudioService + LyricsService
  |     +-- TopicManager.js --------> TopicPracticeManager + dati argomenti (lazy-loaded)
  |     +-- ProgressManager.js -----> StorageService (IndexedDB)
  |     |
  |     +-- store/index.js (gestione stato pub/sub)
  |
  +-- css/style.css (tutti gli stili, CSS custom properties)
  |
  +-- Nginx (Docker) o Netlify (deploy statico)
```

### Decisioni progettuali chiave

- **Nessun framework** — Moduli Vanilla ES6+, nessun build step, nessun bundler
- **Dati local-first** — IndexedDB tramite `StorageService`, zero dipendenza da server
- **Argomenti lazy-loaded** — I dati dei domini tecnici vengono caricati on-demand tramite `import()` dinamico
- **Degradazione graduale** — Effetti visivi racchiusi in error boundary, falliscono silenziosamente
- **Pattern service** — `AudioService`, `LyricsService`, `StorageService` isolano le operazioni di I/O

---

## Stack tecnologico

| Livello                    | Tecnologia                                    |
| -------------------------- | --------------------------------------------- |
| **Linguaggio**             | Vanilla JavaScript (moduli ES6+)              |
| **Effetti 3D**             | Three.js + shader WebGL personalizzati        |
| **Audio**                  | Web Audio API                                 |
| **Sincronizzazione testi** | API LRCLIB                                    |
| **Traduzione**             | API MyMemory Translation                      |
| **Persistenza**            | IndexedDB (tramite StorageService)            |
| **Stile**                  | CSS3 con custom properties                    |
| **Font**                   | Raleway, Inter, JetBrains Mono (Google Fonts) |
| **Container**              | Nginx 1.25 su Alpine Linux                    |
| **Deploy statico**         | Netlify                                       |
| **Testing**                | Vitest                                        |
| **Linting**                | ESLint (base Airbnb) + Prettier               |
| **Git Hooks**              | Husky + commitlint (Conventional Commits)     |

---

## Sicurezza

### Hardening del container Docker

| Controllo                  | Implementazione                                                              |
| -------------------------- | ---------------------------------------------------------------------------- |
| **Esecuzione non-root**    | nginx gira come UID 101, tutte le capability rimosse tramite `cap_drop: ALL` |
| **Header CSP**             | Allowlist rigorosa per script, stili, connessioni, font e media              |
| **X-Frame-Options**        | `DENY` — previene il clickjacking                                            |
| **X-Content-Type-Options** | `nosniff` — previene lo sniffing del tipo MIME                               |
| **X-XSS-Protection**       | Abilitato con `mode=block`                                                   |
| **Referrer-Policy**        | `strict-origin-when-cross-origin`                                            |
| **Healthcheck**            | Endpoint di healthcheck Docker integrato                                     |
| **Immagine minimale**      | Base Alpine Linux, nessun pacchetto non necessario                           |

### Deploy su Netlify

Gli stessi header di sicurezza vengono applicati tramite `netlify.toml` per i deploy statici.

---

## Struttura del progetto

```
knowledge-aio/
|-- index.html                  # Entry point SPA
|-- css/
|   +-- style.css               # Tutti gli stili
|-- js/
|   |-- app.js                  # Entry point principale, routing
|   |-- music.js                # Gestore karaoke
|   |-- lessons.js              # Database lezioni inglese (Livelli 0-3)
|   |-- songs.js                # Libreria canzoni con vocabolario
|   |-- PracticeManager.js      # 7 motori per le modalita di pratica
|   |-- LearnManager.js         # UI e flusso delle lezioni
|   |-- progress.js             # Tracciamento progressi e statistiche
|   |-- MorphBackground.js      # Pioggia matrix 3D (Three.js)
|   |-- CursorParticles.js      # Scia particelle al cursore
|   |-- services/
|   |   |-- AudioService.js     # Astrazione Web Audio API
|   |   |-- LyricsService.js    # Integrazione LRCLIB + traduzione
|   |   +-- StorageService.js   # Wrapper IndexedDB
|   |-- store/
|   |   +-- index.js            # Gestione stato pub/sub
|   +-- topics/
|       |-- TopicManager.js     # Hub argomenti tecnici
|       |-- TopicPracticeManager.js  # 11 tipi di esercizio per argomento
|       |-- registry.js         # Metadati argomenti
|       +-- data/
|           |-- cybersecurity.js
|           |-- python.js
|           |-- linux.js
|           +-- software-dev.js
|-- tests/
|   |-- lessons.test.js
|   |-- songs.test.js
|   +-- store.test.js
|-- Dockerfile                  # Build multi-stage Nginx
|-- docker-compose.yml          # Orchestrazione sviluppo
|-- nginx.conf                  # Configurazione Nginx rafforzata
|-- netlify.toml                # Deploy Netlify + header
|-- package.json                # Strumenti di sviluppo (lint, test, hooks)
+-- _redirects                  # Routing SPA per Netlify
```

---

## Contribuire

I commit seguono le **Conventional Commits** (applicate da Husky + commitlint):

| Prefisso    | Utilizzo                      |
| ----------- | ----------------------------- |
| `feat:`     | Nuova funzionalita            |
| `fix:`      | Correzione di bug             |
| `docs:`     | Solo documentazione           |
| `style:`    | Formattazione (Prettier)      |
| `refactor:` | Ristrutturazione del codice   |
| `test:`     | Aggiunta o aggiornamento test |
| `chore:`    | Strumenti, dipendenze, config |

1. Fai un fork del repository
2. Crea un branch per la funzionalita (`git checkout -b feat/mia-funzionalita`)
3. Effettua i commit seguendo la convenzione sopra
4. Fai il push sul tuo fork e apri una Pull Request

---

## Licenza

MIT — Creato da [Renan](https://github.com/renanaugustomacena-ux)
