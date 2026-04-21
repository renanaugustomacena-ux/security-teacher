# ==========================================
# Fase 1: Immagine Base e Sicurezza
# ==========================================
# Base pinnata per digest SHA-256 (non solo tag) — il tag mutable
# "1.25.3-alpine" potrebbe essere riassegnato a un'immagine diversa in
# futuro. Il digest e' crittograficamente immutabile: se l'immagine cambia,
# la build fallisce invece di tirare silenziosamente contenuti nuovi.
# Risolto da: docker pull nginx:1.25.3-alpine && docker inspect ... (2026-04-22)
FROM nginx@sha256:f2802c2a9d09c7aa3ace27445dfc5656ff24355da28e7b958074a0111e3fc076 AS base

# Installazione di curl per i controlli di salute (healthcheck)
RUN apk add --no-cache curl

# Creazione di un utente non-root (Nginx su Alpine ha gia' l'utente 'nginx' con UID 101, lo utilizziamo)

# ==========================================
# Fase 2: Configurazione e Contenuti
# ==========================================
FROM base AS production

# Copia della configurazione Nginx personalizzata con Header di Sicurezza Rigorosi (CSP, X-Frame-Options)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Rimozione dei file statici predefiniti di Nginx per mantenere l'immagine pulita
RUN rm -rf /usr/share/nginx/html/*

# Copia dei file del progetto (In una build reale, si userebbe 'COPY --from=builder /app/dist ...')
# Per ora, copiamo direttamente i sorgenti poiche' la migrazione a Vite e' in programma.
COPY . /usr/share/nginx/html

# ==========================================
# Fase 3: Rafforzamento del Runtime
# ==========================================

# Cambio di proprieta' dei file all'utente non-root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Passaggio all'utente non-root
USER nginx

# Esposizione della porta (deve essere > 1024 per utenti non-root)
EXPOSE 8080

# Controllo di salute per garantire l'integrita' del servizio
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8080/ || exit 1

# Avvio di Nginx
CMD ["nginx", "-g", "daemon off;"]


# ======================================================================================
# SPIEGAZIONE TECNICA ESAUSTIVA — DOCKERFILE
# ======================================================================================
#
# COS'E' UN DOCKERFILE?
# ---------------------
# Un Dockerfile e' un file di testo che contiene una serie di istruzioni che Docker
# utilizza per costruire un'immagine (image). Un'immagine e' come una "fotografia"
# di un sistema operativo configurato con tutto il software necessario per eseguire
# un'applicazione. Una volta costruita, l'immagine puo' essere avviata come
# "contenitore" (container), ovvero un ambiente isolato e leggero che esegue
# l'applicazione.
#
# STRUTTURA A FASI (MULTI-STAGE BUILD)
# -------------------------------------
# Questo Dockerfile utilizza un approccio chiamato "multi-stage build", cioe'
# una costruzione a piu' fasi. Ogni istruzione "FROM" definisce una nuova fase.
# Vantaggi:
#   - L'immagine finale e' piu' piccola e pulita
#   - Le dipendenze di compilazione non finiscono nell'immagine di produzione
#   - Migliore organizzazione logica del processo di build
#
# FASE 1 — IMMAGINE BASE E SICUREZZA
# ------------------------------------
# FROM nginx:1.25.3-alpine AS base
#   - "FROM" indica l'immagine di partenza. Qui usiamo Nginx versione 1.25.3
#     basata su Alpine Linux, una distribuzione ultra-leggera (~5 MB).
#   - "AS base" assegna un nome a questa fase, cosi' possiamo riferirci ad essa
#     nelle fasi successive.
#   - Fissare la versione (1.25.3) e' una best practice: garantisce che la build
#     sia riproducibile e non si rompa quando esce una nuova versione di Nginx.
#
# RUN apk add --no-cache curl
#   - "RUN" esegue un comando durante la costruzione dell'immagine.
#   - "apk" e' il gestore di pacchetti di Alpine Linux (simile a apt per Ubuntu).
#   - "--no-cache" evita di salvare la cache dei pacchetti, mantenendo l'immagine
#     piu' piccola.
#   - "curl" viene installato per permettere i controlli di salute (healthcheck).
#
# FASE 2 — CONFIGURAZIONE E CONTENUTI
# -------------------------------------
# FROM base AS production
#   - Questa fase parte dall'immagine "base" creata nella Fase 1.
#   - Eredita tutto cio' che e' stato configurato (Nginx + curl).
#
# COPY nginx.conf /etc/nginx/conf.d/default.conf
#   - "COPY" copia un file dal computer host (dove si esegue la build) dentro
#     l'immagine Docker.
#   - Qui sovrascriviamo la configurazione predefinita di Nginx con la nostra,
#     che include header di sicurezza personalizzati (CSP, X-Frame-Options, ecc.).
#
# RUN rm -rf /usr/share/nginx/html/*
#   - Rimuove tutti i file statici predefiniti di Nginx (la pagina "Welcome to Nginx").
#   - Questo garantisce che nell'immagine ci siano solo i file del nostro progetto.
#
# COPY . /usr/share/nginx/html
#   - Copia TUTTI i file del progetto (dalla directory corrente ".") nella cartella
#     che Nginx serve come sito web.
#   - Il file .dockerignore (se presente) esclude file non necessari come
#     node_modules, .git, ecc.
#
# FASE 3 — RAFFORZAMENTO DEL RUNTIME
# ------------------------------------
# RUN chown -R nginx:nginx ...
#   - "chown" cambia il proprietario dei file. "-R" lo fa ricorsivamente.
#   - Assegniamo tutti i file necessari all'utente "nginx" (non-root).
#   - Questo e' fondamentale per la sicurezza: se un attaccante sfrutta una
#     vulnerabilita', non avra' i permessi di root nel contenitore.
#
# USER nginx
#   - Da questo punto in poi, tutti i comandi vengono eseguiti come utente "nginx",
#     non come root. Questo e' il principio del "least privilege" (minimo privilegio):
#     ogni processo deve avere solo i permessi strettamente necessari.
#
# EXPOSE 8080
#   - Dichiara che il contenitore ascolta sulla porta 8080.
#   - Usiamo 8080 (e non 80) perche' le porte sotto 1024 richiedono privilegi di root.
#   - EXPOSE e' documentativo: non apre realmente la porta, serve a chi legge il
#     Dockerfile per capire su quale porta il servizio e' in ascolto.
#
# HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8080/ || exit 1
#   - Definisce un controllo di salute automatico.
#   - Ogni 30 secondi Docker esegue "curl" per verificare che Nginx risponda.
#   - Se il controllo fallisce (timeout 3 secondi o errore HTTP), Docker marca
#     il contenitore come "unhealthy" (non sano).
#   - Questo e' essenziale per orchestratori come Docker Compose o Kubernetes,
#     che possono riavviare automaticamente contenitori non sani.
#
# CMD ["nginx", "-g", "daemon off;"]
#   - "CMD" definisce il comando che viene eseguito quando il contenitore si avvia.
#   - "daemon off;" dice a Nginx di rimanere in primo piano (foreground).
#   - Docker richiede che il processo principale resti in primo piano: se va in
#     background, Docker pensa che il contenitore sia terminato e lo ferma.
#
# CONCETTI CHIAVE PER STUDENTI
# ------------------------------
# 1. IMMAGINE vs CONTENITORE: L'immagine e' il "progetto" (statico), il contenitore
#    e' l'istanza in esecuzione (dinamico). Come classe vs oggetto in programmazione.
#
# 2. LAYER (LIVELLI): Ogni istruzione RUN, COPY, ADD crea un nuovo "livello"
#    nell'immagine. Docker salva questi livelli in cache: se un livello non cambia,
#    non viene ricostruito, velocizzando enormemente le build successive.
#
# 3. SICUREZZA NON-ROOT: Eseguire servizi come root in un contenitore e' pericoloso.
#    Un'eventuale vulnerabilita' potrebbe permettere all'attaccante di "evadere" dal
#    contenitore con privilegi elevati sul sistema host.
#
# 4. ALPINE LINUX: Scelta per la sua leggerezza. Un'immagine Nginx su Alpine pesa
#    circa 40 MB, contro i 140+ MB di un'immagine basata su Debian/Ubuntu.
#    Meno software = meno superficie di attacco = piu' sicurezza.
#
# ======================================================================================
