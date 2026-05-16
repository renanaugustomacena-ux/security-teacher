/**
 * DEVSECOPS TOPIC DATA - FlowLearn
 * ================================
 *
 * 24 levels of English DevSecOps and security automation terminology.
 * Each level has 4 lessons with 10 items each (40 per level).
 * Progression: Foundations → DevSecOps Career
 */

export default {
  id: 'devsecops',
  levels: {
    // ════════════════════════════════════════════════
    // LEVEL 0 - FONDAMENTI / FOUNDATIONS
    // ════════════════════════════════════════════════
    0: {
      name: 'Fondamenti DevSecOps / DevSecOps Foundations',
      description: 'Cultura, principi e concetti base del DevSecOps',
      lessons: [
        {
          id: 'dso_shift_left_1',
          title: 'DevSecOps Culture / Cultura DevSecOps',
          description: 'Mindset e principi fondamentali',
          items: [
            {
              english: 'DevSecOps',
              italian: 'Sviluppo + sicurezza + operazioni integrati (DevSecOps)',
              pronunciation: '/dɛvˈsɛkˌɒps/',
              phonetic: 'DEV-sek-ops',
              example:
                'Our team adopted DevSecOps to catch vulnerabilities before they reach production. = Il nostro team ha adottato il DevSecOps per trovare vulnerabilità prima che arrivino in produzione.',
              context: 'shift-left',
              difficulty: 'beginner',
              note: 'Fusione di Development, Security e Operations.',
            },
            {
              english: 'Shift Left',
              italian: 'Spostare a sinistra',
              pronunciation: '/ʃɪft lɛft/',
              phonetic: 'SHIFT LEFT',
              example:
                'By applying a shift left approach, the team found SQL injection bugs during code review instead of in production. = Applicando un approccio shift left, il team ha trovato bug di SQL injection durante la code review invece che in produzione.',
              context: 'shift-left',
              difficulty: 'beginner',
              note: 'Anticipare i controlli nelle prime fasi del SDLC.',
            },
            {
              english: 'Security Champion',
              italian: 'Campione di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ˈtʃæmpiən/',
              phonetic: 'si-KIU-ri-ti CIAM-pion',
              example:
                'Each squad appoints a security champion who reviews pull requests for common vulnerabilities. = Ogni squad nomina un security champion che revisiona le pull request per vulnerabilità comuni.',
              context: 'culture',
              difficulty: 'beginner',
              note: 'Sviluppatore con focus sulla sicurezza nel proprio team.',
            },
            {
              english: 'SDLC',
              italian: 'Ciclo di vita del software',
              pronunciation: '/ɛs diː ɛl siː/',
              phonetic: 'ES-DI-EL-SI',
              example:
                'We mapped every phase of the SDLC to identify where security controls were missing. = Abbiamo mappato ogni fase del SDLC per identificare dove mancavano controlli di sicurezza.',
              context: 'shift-left',
              difficulty: 'beginner',
              note: 'Software Development Life Cycle.',
            },
            {
              english: 'Secure by Design',
              italian: 'Sicuro per progettazione',
              pronunciation: '/sɪˈkjʊər baɪ dɪˈzaɪn/',
              phonetic: 'si-KIUR BAI di-ZAIN',
              example:
                'Building the API with a secure by design philosophy eliminated entire classes of injection attacks. = Costruire la API con una filosofia sicuro per progettazione ha eliminato intere classi di attacchi di injection.',
              context: 'shift-left',
              difficulty: 'beginner',
            },
            {
              english: 'Threat Model',
              italian: 'Modello di minaccia',
              pronunciation: '/θrɛt ˈmɒdl/',
              phonetic: 'THRET MO-del',
              example:
                'During sprint planning, we built a threat model to map attack surfaces for the new payment microservice. = Durante la pianificazione dello sprint, abbiamo costruito un threat model per mappare le superfici di attacco del nuovo microservizio di pagamento.',
              context: 'shift-left',
              difficulty: 'beginner',
            },
            {
              english: 'Security Posture',
              italian: 'Postura di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ˈpɒstʃər/',
              phonetic: 'si-KIU-ri-ti POS-ciur',
              example:
                'After adopting automated scanning, our security posture improved across all production services. = Dopo aver adottato la scansione automatica, la nostra postura di sicurezza è migliorata in tutti i servizi in produzione.',
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Risk Assessment',
              italian: 'Valutazione del rischio',
              pronunciation: '/rɪsk əˈsɛsmənt/',
              phonetic: 'RISK a-SES-ment',
              example:
                "The team completed a thorough risk assessment before migrating customer data to the new cloud provider. = Il team ha completato un'approfondita valutazione del rischio prima di migrare i dati dei clienti al nuovo provider cloud.",
              context: 'shift-left',
              difficulty: 'beginner',
            },
            {
              english: 'Continuous Security',
              italian: 'Sicurezza continua',
              pronunciation: '/kənˈtɪnjʊəs sɪˈkjʊərəti/',
              phonetic: 'kon-TI-nius si-KIU-ri-ti',
              example:
                'With continuous security baked into the CI pipeline, every commit triggers SAST and dependency checks. = Con la sicurezza continua integrata nella pipeline CI, ogni commit attiva SAST e controlli sulle dipendenze.',
              context: 'shift-left',
              difficulty: 'beginner',
            },
            {
              english: 'Blameless Culture',
              italian: 'Cultura senza colpa',
              pronunciation: '/ˈbleɪmləs ˈkʌltʃər/',
              phonetic: 'BLEIM-les KAL-cer',
              example:
                'Thanks to our blameless culture, developers report misconfigurations without fear of punishment. = Grazie alla nostra cultura senza colpa, gli sviluppatori segnalano le configurazioni errate senza paura di punizioni.',
              context: 'culture',
              difficulty: 'beginner',
              note: 'Concentrarsi sul processo, non sulla colpa.',
            },
          ],
        },
        {
          id: 'dso_shift_left_2',
          title: 'Core Principles / Principi Fondamentali',
          description: 'I tre pilastri di People, Process, Technology',
          items: [
            {
              english: 'People, Process, Technology',
              italian: 'Persone, processi, tecnologia',
              pronunciation: '/ˈpiːpl ˈprəʊsɛs tɛkˈnɒlədʒi/',
              phonetic: 'PI-pol PRO-ses tek-NO-lo-gi',
              example:
                'A strong DevSecOps program aligns people, process, and technology so that no single pillar becomes a bottleneck. = Un programma DevSecOps efficace allinea persone, processi e tecnologia affinché nessun pilastro diventi un collo di bottiglia.',
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Defense in Depth',
              italian: 'Difesa in profondità',
              pronunciation: '/dɪˈfɛns ɪn dɛpθ/',
              phonetic: 'di-FENS in DEPTH',
              example:
                'Applying defense in depth means combining firewalls, WAFs, and runtime protection so one failure does not compromise everything. = Applicare la difesa in profondità significa combinare firewall, WAF e protezione runtime così che un singolo guasto non comprometta tutto.',
              context: 'shift-left',
              difficulty: 'beginner',
            },
            {
              english: 'Least Privilege',
              italian: 'Privilegio minimo',
              pronunciation: '/liːst ˈprɪvəlɪdʒ/',
              phonetic: 'LIST PRI-vi-legg',
              example:
                'Following the least privilege principle, the CI bot only has read access to the artifact registry. = Seguendo il principio del privilegio minimo, il bot CI ha solo accesso in lettura al registry degli artefatti.',
              context: 'shift-left',
              difficulty: 'beginner',
              note: 'Dare solo i permessi strettamente necessari.',
            },
            {
              english: 'Zero Trust',
              italian: 'Zero fiducia',
              pronunciation: '/ˈzɪərəʊ trʌst/',
              phonetic: 'ZI-ro TRAST',
              example:
                "Under a zero trust architecture, every microservice must authenticate even within the internal network. = In un'architettura zero trust, ogni microservizio deve autenticarsi anche all'interno della rete interna.",
              context: 'shift-left',
              difficulty: 'beginner',
            },
            {
              english: 'Fail Secure',
              italian: 'Fallire in sicurezza',
              pronunciation: '/feɪl sɪˈkjʊər/',
              phonetic: 'FEIL si-KIUR',
              example:
                'The authentication gateway is configured to fail secure, blocking all traffic if the identity provider goes down. = Il gateway di autenticazione è configurato per fallire in sicurezza, bloccando tutto il traffico se il provider di identità va giù.',
              context: 'shift-left',
              difficulty: 'beginner',
            },
            {
              english: 'Automation First',
              italian: 'Automazione prima di tutto',
              pronunciation: '/ˌɔːtəˈmeɪʃən fɜːst/',
              phonetic: 'o-to-MEI-scion FERST',
              example:
                'An automation first strategy replaced manual penetration checklists with scripted DAST scans on every deploy. = Una strategia automazione prima di tutto ha sostituito le checklist manuali di penetration test con scansioni DAST scriptate a ogni deploy.',
              context: 'automation',
              difficulty: 'beginner',
            },
            {
              english: 'Continuous Improvement',
              italian: 'Miglioramento continuo',
              pronunciation: '/kənˈtɪnjʊəs ɪmˈpruːvmənt/',
              phonetic: 'kon-TI-nius im-PRUV-ment',
              example:
                'After each incident retrospective, the team applies continuous improvement by updating runbooks and pipeline rules. = Dopo ogni retrospettiva sugli incidenti, il team applica il miglioramento continuo aggiornando runbook e regole di pipeline.',
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Feedback Loop',
              italian: 'Ciclo di feedback',
              pronunciation: '/ˈfiːdbæk luːp/',
              phonetic: 'FID-bak LUP',
              example:
                "A tight feedback loop between SAST results and the developer IDE surfaces vulnerabilities within minutes of writing code. = Un ciclo di feedback stretto tra i risultati SAST e l'IDE dello sviluppatore evidenzia le vulnerabilità entro pochi minuti dalla scrittura del codice.",
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Shared Responsibility',
              italian: 'Responsabilità condivisa',
              pronunciation: '/ʃeəd rɪˌspɒnsəˈbɪləti/',
              phonetic: 'SCERD ri-spon-si-BI-li-ti',
              example:
                'In our organization, security is a shared responsibility where developers, ops, and security teams all own part of the risk. = Nella nostra organizzazione, la sicurezza è una responsabilità condivisa dove sviluppatori, ops e team di sicurezza possiedono ciascuno parte del rischio.',
              context: 'culture',
              difficulty: 'beginner',
              note: 'Tutti contribuiscono, non solo il team di sicurezza.',
            },
            {
              english: 'Compliance',
              italian: 'Conformità',
              pronunciation: '/kəmˈplaɪəns/',
              phonetic: 'kom-PLAI-ans',
              example:
                'Automating compliance checks in the pipeline guarantees that every release meets PCI-DSS and SOC 2 requirements. = Automatizzare i controlli di conformità nella pipeline garantisce che ogni rilascio soddisfi i requisiti PCI-DSS e SOC 2.',
              context: 'compliance-as-code',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'dso_shift_left_3',
          title: 'DevSecOps Lifecycle / Ciclo di Vita DevSecOps',
          description: 'Le fasi del flusso DevSecOps',
          items: [
            {
              english: 'Plan',
              italian: 'Pianificare',
              pronunciation: '/plæn/',
              phonetic: 'PLAN',
              example:
                'During the plan phase, the team writes security user stories for every new endpoint. = Durante la fase di plan, il team scrive storie utente di sicurezza per ogni nuovo endpoint.',
              context: 'shift-left',
              difficulty: 'beginner',
            },
            {
              english: 'Code',
              italian: 'Codificare',
              pronunciation: '/kəʊd/',
              phonetic: 'KOUD',
              example:
                "When developers code new features, IDE plugins highlight insecure patterns in real time. = Quando gli sviluppatori codificano nuove feature, i plugin dell'IDE evidenziano pattern insicuri in tempo reale.",
              context: 'shift-left',
              difficulty: 'beginner',
            },
            {
              english: 'Build',
              italian: 'Compilare',
              pronunciation: '/bɪld/',
              phonetic: 'BILD',
              example:
                "The reproducible build environment guarantees that two engineers compiling the same commit get identical artifacts. = L'ambiente di build riproducibile garantisce che due ingegneri che compilano lo stesso commit ottengano artefatti identici.",
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Test',
              italian: 'Testare',
              pronunciation: '/tɛst/',
              phonetic: 'TEST',
              example:
                'The QA stage now includes a test suite that validates both functional behavior and OWASP Top 10 vulnerabilities. = La fase di QA ora include una suite di test che valida sia il comportamento funzionale che le vulnerabilità OWASP Top 10.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Release',
              italian: 'Rilasciare',
              pronunciation: '/rɪˈliːs/',
              phonetic: 'ri-LIS',
              example:
                'The pipeline blocks any release that has critical CVEs in its dependency tree. = La pipeline blocca qualsiasi release che abbia CVE critiche nel suo albero delle dipendenze.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Deploy',
              italian: 'Distribuire',
              pronunciation: '/dɪˈplɔɪ/',
              phonetic: 'di-PLOI',
              example:
                "Our Kubernetes admission controller only allows a deploy if the container image has a valid cosign signature. = Il nostro admission controller Kubernetes permette il deploy solo se l'immagine container ha una firma cosign valida.",
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Operate',
              italian: 'Operare',
              pronunciation: '/ˈɒpəreɪt/',
              phonetic: 'O-pe-reit',
              example:
                'The SRE team must operate production clusters with real-time alerting for anomalous network traffic. = Il team SRE deve operare i cluster di produzione con alerting in tempo reale per traffico di rete anomalo.',
              context: 'tools',
              difficulty: 'beginner',
            },
            {
              english: 'Monitor',
              italian: 'Monitorare',
              pronunciation: '/ˈmɒnɪtər/',
              phonetic: 'MO-ni-tor',
              example:
                'Prometheus and Grafana dashboards monitor CPU spikes and unusual API call patterns around the clock. = Le dashboard Prometheus e Grafana monitorano picchi di CPU e pattern insoliti di chiamate API ventiquattro ore su ventiquattro.',
              context: 'tools',
              difficulty: 'beginner',
            },
            {
              english: 'Respond',
              italian: 'Rispondere',
              pronunciation: '/rɪˈspɒnd/',
              phonetic: 'ri-SPOND',
              example:
                "When the SIEM flags a brute-force attempt, the on-call engineer must respond within fifteen minutes. = Quando il SIEM segnala un tentativo di brute-force, l'ingegnere di turno deve rispondere entro quindici minuti.",
              context: 'automation',
              difficulty: 'beginner',
            },
            {
              english: 'Loop',
              italian: 'Ciclo',
              pronunciation: '/luːp/',
              phonetic: 'LUP',
              example:
                'Each iteration of the DevSecOps loop feeds post-incident learnings back into the planning stage. = Ogni iterazione del ciclo DevSecOps riporta gli insegnamenti post-incidente nella fase di pianificazione.',
              context: 'culture',
              difficulty: 'beginner',
              note: "Spesso rappresentato come simbolo dell'infinito.",
            },
          ],
        },
        {
          id: 'dso_shift_left_4',
          title: 'Foundational Roles / Ruoli Fondamentali',
          description: 'Chi fa cosa nel DevSecOps',
          items: [
            {
              english: 'DevSecOps Engineer',
              italian: 'Ingegnere DevSecOps',
              pronunciation: '/dɛvˈsɛkˌɒps ˌɛndʒɪˈnɪər/',
              phonetic: 'DEV-sek-ops en-gi-NIR',
              example:
                'We hired a DevSecOps engineer to build guardrails that let developers ship securely without slowing down. = Abbiamo assunto un DevSecOps engineer per costruire guardrail che permettano agli sviluppatori di rilasciare in sicurezza senza rallentare.',
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'AppSec Engineer',
              italian: 'Ingegnere AppSec',
              pronunciation: '/ˈæpˌsɛk ˌɛndʒɪˈnɪər/',
              phonetic: 'AP-sek en-gi-NIR',
              example:
                "Before merging the OAuth module, the AppSec engineer ran a manual code review and found a token-leakage flaw. = Prima di unire il modulo OAuth, l'ingegnere AppSec ha eseguito una code review manuale e ha trovato una falla di leak del token.",
              context: 'culture',
              difficulty: 'beginner',
              note: 'Application Security: focus su sicurezza applicativa.',
            },
            {
              english: 'Platform Engineer',
              italian: 'Ingegnere di piattaforma',
              pronunciation: '/ˈplætfɔːm ˌɛndʒɪˈnɪər/',
              phonetic: 'PLAT-form en-gi-NIR',
              example:
                'Our platform engineer created a golden path Terraform module so every team deploys with encryption and logging by default. = Il nostro platform engineer ha creato un modulo Terraform golden path così ogni team deploya con crittografia e logging di default.',
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'SRE',
              italian: 'Ingegnere di affidabilità del sito',
              pronunciation: '/ɛs ɑːr iː/',
              phonetic: 'ES-AR-I',
              example:
                "The SRE on call noticed abnormal latency spikes that turned out to be a crypto-mining process on a compromised node. = L'SRE di turno ha notato picchi di latenza anomali che si sono rivelati un processo di crypto-mining su un nodo compromesso.",
              context: 'culture',
              difficulty: 'beginner',
              note: 'Site Reliability Engineer.',
            },
            {
              english: 'Red Team',
              italian: 'Squadra rossa',
              pronunciation: '/rɛd tiːm/',
              phonetic: 'RED TIM',
              example:
                'Last quarter, the red team discovered an exposed admin panel that had been publicly accessible for months. = Lo scorso trimestre, la squadra rossa ha scoperto un pannello di amministrazione esposto che era accessibile pubblicamente da mesi.',
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Blue Team',
              italian: 'Squadra blu',
              pronunciation: '/bluː tiːm/',
              phonetic: 'BLU TIM',
              example:
                'After detecting the intrusion attempt, the blue team isolated the affected subnet and rotated all service credentials. = Dopo aver rilevato il tentativo di intrusione, la squadra blu ha isolato la sottorete coinvolta e ruotato tutte le credenziali dei servizi.',
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Purple Team',
              italian: 'Squadra viola',
              pronunciation: '/ˈpɜːpl tiːm/',
              phonetic: 'PER-pol TIM',
              example:
                "During the exercise, the purple team ran attack simulations while simultaneously tuning detection rules. = Durante l'esercitazione, la squadra viola ha eseguito simulazioni di attacco mentre contemporaneamente affinava le regole di rilevamento.",
              context: 'culture',
              difficulty: 'beginner',
              note: 'Combinazione di Red e Blue Team.',
            },
            {
              english: 'Stakeholder',
              italian: 'Parte interessata',
              pronunciation: '/ˈsteɪkˌhəʊldər/',
              phonetic: 'STEIK-hol-der',
              example:
                'Before approving the budget, every stakeholder received a risk dashboard showing critical vulnerability trends. = Prima di approvare il budget, ogni stakeholder ha ricevuto una dashboard del rischio con i trend delle vulnerabilità critiche.',
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Product Owner',
              italian: 'Responsabile di prodotto',
              pronunciation: '/ˈprɒdʌkt ˈəʊnər/',
              phonetic: 'PRO-dakt OU-ner',
              example:
                'Our product owner added a security spike to the sprint backlog after a penetration test revealed two high-severity findings. = Il nostro product owner ha aggiunto uno spike di sicurezza al backlog dello sprint dopo che un penetration test ha rivelato due finding ad alta severità.',
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Compliance Officer',
              italian: 'Responsabile della conformità',
              pronunciation: '/kəmˈplaɪəns ˈɒfɪsər/',
              phonetic: 'kom-PLAI-ans O-fi-ser',
              example:
                'The compliance officer reviewed our CI pipeline to confirm that all artifacts are signed and audit logs retained for one year. = Il compliance officer ha revisionato la nostra pipeline CI per confermare che tutti gli artefatti sono firmati e i log di audit conservati per un anno.',
              context: 'compliance-as-code',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 1 - SECURE CI/CD
    // ════════════════════════════════════════════════
    1: {
      name: 'CI/CD Sicura / Secure CI/CD',
      description: 'Pipeline di integrazione e distribuzione sicure',
      lessons: [
        {
          id: 'dso_ci_cd_1',
          title: 'Pipeline Basics / Basi delle Pipeline',
          description: 'Concetti core di CI/CD',
          items: [
            {
              english: 'CI/CD',
              italian: 'Integrazione e rilascio continui (CI/CD)',
              pronunciation: '/siː aɪ siː diː/',
              phonetic: 'SI-AI SI-DI',
              example:
                'Every commit pushed to the main branch triggers the CI/CD pipeline, which builds, tests, and deploys automatically. = Ogni commit pushato sul branch main attiva la pipeline CI/CD, che compila, testa e deploya automaticamente.',
              context: 'ci-cd',
              difficulty: 'beginner',
              note: 'Continuous Integration / Continuous Delivery (o Deployment).',
            },
            {
              english: 'Pipeline',
              italian: 'Sequenza di stadi CI/CD (pipeline)',
              pronunciation: '/ˈpaɪplaɪn/',
              phonetic: 'PAIP-lain',
              example:
                'The security team added a SAST scan stage to the existing pipeline between build and deploy. = Il team di sicurezza ha aggiunto uno stadio di scansione SAST alla pipeline esistente tra build e deploy.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Stage',
              italian: 'Fase',
              pronunciation: '/steɪdʒ/',
              phonetic: 'STEIGG',
              example:
                'Our CI has four stages: build, test, security scan, and deploy to staging. = La nostra CI ha quattro fasi: build, test, scansione di sicurezza e deploy in staging.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Job',
              italian: 'Lavoro',
              pronunciation: '/dʒɒb/',
              phonetic: 'GIOB',
              example:
                "The SAST job runs on an isolated container to prevent exfiltration of source code. = Il job SAST gira su un container isolato per prevenire l'esfiltrazione del codice sorgente.",
              context: 'ci-cd',
              difficulty: 'beginner',
              code: 'jobs:\n  build:\n    runs-on: ubuntu-latest',
            },
            {
              english: 'Step',
              italian: 'Passo',
              pronunciation: '/stɛp/',
              phonetic: 'STEP',
              example:
                'Adding a single step to check dependency licenses saved the team hours of manual work every sprint. = Aggiungere un singolo step per controllare le licenze delle dipendenze ha risparmiato al team ore di lavoro manuale ogni sprint.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Runner',
              italian: 'Esecutore',
              pronunciation: '/ˈrʌnər/',
              phonetic: 'RA-ner',
              example:
                "We hardened every self-hosted runner by disabling network access to internal services during untrusted builds. = Abbiamo rafforzato ogni runner self-hosted disabilitando l'accesso di rete ai servizi interni durante le build non fidate.",
              context: 'ci-cd',
              difficulty: 'beginner',
              tool: 'GitHub Actions, GitLab Runner',
            },
            {
              english: 'Workflow',
              italian: 'Flusso di lavoro',
              pronunciation: '/ˈwɜːkfləʊ/',
              phonetic: 'UORK-flou',
              example:
                'A single reusable workflow enforces secret scanning and SAST across all twenty microservice repositories. = Un singolo workflow riutilizzabile impone scansione segreti e SAST su tutti e venti i repository di microservizi.',
              context: 'ci-cd',
              difficulty: 'beginner',
              code: 'on:\n  push:\n    branches: [main]',
            },
            {
              english: 'Trigger',
              italian: 'Innesco',
              pronunciation: '/ˈtrɪɡər/',
              phonetic: 'TRI-gher',
              example:
                'We configured a cron trigger to run full dependency scans every night at midnight. = Abbiamo configurato un trigger cron per eseguire scansioni complete delle dipendenze ogni notte a mezzanotte.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Build',
              italian: 'Compilazione',
              pronunciation: '/bɪld/',
              phonetic: 'BILD',
              example:
                "The reproducible build environment guarantees that two engineers compiling the same commit get identical artifacts. = L'ambiente di build riproducibile garantisce che due ingegneri che compilano lo stesso commit ottengano artefatti identici.",
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Artifact',
              italian: 'Artefatto',
              pronunciation: '/ˈɑːtɪfækt/',
              phonetic: 'AR-ti-fakt',
              example:
                'Before promoting an artifact to production, the pipeline verifies its SHA-256 checksum against the signed manifest. = Prima di promuovere un artefatto in produzione, la pipeline verifica il suo checksum SHA-256 contro il manifesto firmato.',
              context: 'ci-cd',
              difficulty: 'beginner',
              note: 'Output di build (binari, immagini, pacchetti).',
            },
          ],
        },
        {
          id: 'dso_ci_cd_2',
          title: 'Security Gates / Cancelli di Sicurezza',
          description: 'Controlli automatici di sicurezza in pipeline',
          items: [
            {
              english: 'Security Gate',
              italian: 'Cancello di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ɡeɪt/',
              phonetic: 'si-KIU-ri-ti GHEIT',
              example:
                'When the DAST scan finds a high-severity issue, the security gate blocks promotion to staging. = Quando la scansione DAST trova un problema ad alta severità, il cancello di sicurezza blocca la promozione in staging.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Quality Gate',
              italian: 'Cancello di qualità',
              pronunciation: '/ˈkwɒləti ɡeɪt/',
              phonetic: 'KUO-li-ti GHEIT',
              example:
                'SonarQube enforces a quality gate that rejects code with more than five percent duplicated lines or any critical bugs. = SonarQube impone un cancello di qualità che rifiuta codice con più del cinque percento di righe duplicate o qualsiasi bug critico.',
              context: 'ci-cd',
              difficulty: 'beginner',
              tool: 'SonarQube',
            },
            {
              english: 'Break the Build',
              italian: 'Rompere la build',
              pronunciation: '/breɪk ðə bɪld/',
              phonetic: 'BREIK de BILD',
              example:
                "A single critical CVE in a transitive dependency can break the build and halt the entire release process. = Una singola CVE critica in una dipendenza transitiva può rompere la build e bloccare l'intero processo di rilascio.",
              context: 'ci-cd',
              difficulty: 'beginner',
              note: 'Far fallire la pipeline per impedire codice insicuro.',
            },
            {
              english: 'Pre-Commit Hook',
              italian: 'Hook di pre-commit',
              pronunciation: '/priː kəˈmɪt hʊk/',
              phonetic: 'PRI ko-MIT HUK',
              example:
                'Installing a pre-commit hook that runs gitleaks prevents developers from accidentally committing AWS keys. = Installare un hook pre-commit che esegue gitleaks impedisce agli sviluppatori di committare accidentalmente chiavi AWS.',
              context: 'ci-cd',
              difficulty: 'beginner',
              tool: 'pre-commit, Husky',
            },
            {
              english: 'Pull Request Check',
              italian: 'Controllo della pull request',
              pronunciation: '/pʊl rɪˈkwɛst tʃɛk/',
              phonetic: 'PUL ri-KUEST CIEK',
              example:
                'GitHub requires every pull request check to pass before the merge button becomes available. = GitHub richiede che ogni controllo della pull request passi prima che il pulsante di merge diventi disponibile.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Status Check',
              italian: 'Controllo di stato',
              pronunciation: '/ˈsteɪtəs tʃɛk/',
              phonetic: 'STEI-tas CIEK',
              example:
                'We configured three required status checks: unit tests, SAST scan, and license compliance verification. = Abbiamo configurato tre controlli di stato obbligatori: unit test, scansione SAST e verifica di conformità delle licenze.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Secrets in CI',
              italian: 'Segreti nella CI',
              pronunciation: '/ˈsiːkrɪts ɪn siː aɪ/',
              phonetic: 'SI-krets in SI-AI',
              example:
                'Never hardcode secrets in CI configuration files; always inject them from a vault at runtime. = Non inserire mai segreti nei file di configurazione CI; iniettali sempre da un vault a runtime.',
              context: 'secrets',
              difficulty: 'beginner',
            },
            {
              english: 'Dependency Cache',
              italian: 'Cache delle dipendenze',
              pronunciation: '/dɪˈpɛndənsi kæʃ/',
              phonetic: 'di-PEN-den-si KASH',
              example:
                'Verifying checksums on the dependency cache prevents a poisoned cache from injecting malicious packages. = Verificare i checksum sulla cache delle dipendenze impedisce a una cache avvelenata di iniettare pacchetti malevoli.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Pipeline Failure',
              italian: 'Fallimento della pipeline',
              pronunciation: '/ˈpaɪplaɪn ˈfeɪljər/',
              phonetic: 'PAIP-lain FEI-lier',
              example:
                'After the third consecutive pipeline failure, the team investigated and found an expired signing certificate. = Dopo il terzo fallimento consecutivo della pipeline, il team ha investigato e trovato un certificato di firma scaduto.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Manual Approval',
              italian: 'Approvazione manuale',
              pronunciation: '/ˈmænjʊəl əˈpruːvl/',
              phonetic: 'MA-niu-al a-PRU-val',
              example:
                'Production deployments require manual approval from at least two senior engineers before proceeding. = I deployment in produzione richiedono approvazione manuale da almeno due ingegneri senior prima di procedere.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'dso_ci_cd_3',
          title: 'GitHub Actions Basics / Basi di GitHub Actions',
          description: 'Workflow su GitHub Actions',
          items: [
            {
              english: 'GitHub Actions',
              italian: 'GitHub Actions (automazione CI/CD GitHub)',
              pronunciation: '/ˈɡɪthʌb ˈækʃənz/',
              phonetic: 'GHIT-hab AK-scions',
              example:
                'We migrated our entire CI from Jenkins to GitHub Actions and cut pipeline setup time by seventy percent. = Abbiamo migrato tutta la nostra CI da Jenkins a GitHub Actions e ridotto il tempo di setup della pipeline del settanta percento.',
              context: 'ci-cd',
              difficulty: 'beginner',
              tool: 'GitHub Actions',
            },
            {
              english: 'Action',
              italian: 'Azione',
              pronunciation: '/ˈækʃən/',
              phonetic: 'AK-scion',
              example:
                'Pinning every third-party action to a specific commit SHA prevents supply-chain attacks through tag manipulation. = Pinnare ogni azione di terze parti a uno SHA di commit specifico previene attacchi supply-chain tramite manipolazione dei tag.',
              context: 'ci-cd',
              difficulty: 'beginner',
              code: 'uses: actions/checkout@v4',
            },
            {
              english: 'Workflow File',
              italian: 'File di workflow',
              pronunciation: '/ˈwɜːkfləʊ faɪl/',
              phonetic: 'UORK-flou FAIL',
              example:
                'Every workflow file in the .github/workflows directory is version-controlled and requires a code review to modify. = Ogni file di workflow nella directory .github/workflows è versionato e richiede una code review per essere modificato.',
              context: 'ci-cd',
              difficulty: 'beginner',
              code: '.github/workflows/ci.yml',
            },
            {
              english: 'Matrix Build',
              italian: 'Build a matrice',
              pronunciation: '/ˈmeɪtrɪks bɪld/',
              phonetic: 'MEI-triks BILD',
              example:
                "Using a matrix build, we test the application on Node 18, 20, and 22 across Ubuntu and Alpine simultaneously. = Usando una build a matrice, testiamo l'applicazione su Node 18, 20 e 22 su Ubuntu e Alpine simultaneamente.",
              context: 'ci-cd',
              difficulty: 'beginner',
              code: 'strategy:\n  matrix:\n    node: [18, 20, 22]',
            },
            {
              english: 'Self-Hosted Runner',
              italian: 'Runner self-hosted',
              pronunciation: '/sɛlf ˈhəʊstɪd ˈrʌnər/',
              phonetic: 'SELF HOS-ted RA-ner',
              example:
                'The compliance team requires a self-hosted runner for HIPAA workloads because data cannot leave the private network. = Il team di compliance richiede un runner self-hosted per i workload HIPAA perché i dati non possono lasciare la rete privata.',
              context: 'ci-cd',
              difficulty: 'beginner',
              note: 'Attenzione: superficie di attacco aggiuntiva.',
            },
            {
              english: 'Marketplace Action',
              italian: 'Azione del marketplace',
              pronunciation: '/ˈmɑːkɪtpleɪs ˈækʃən/',
              phonetic: 'MAR-ket-pleis AK-scion',
              example:
                'Before using any marketplace action, we verify its source code and pin it to a reviewed SHA hash. = Prima di usare qualsiasi azione del marketplace, ne verifichiamo il codice sorgente e la pinniamo a un hash SHA revisionato.',
              context: 'supply-chain',
              difficulty: 'beginner',
              note: 'Mai usare @master, sempre @sha256 o @v1.2.3.',
            },
            {
              english: 'Environment',
              italian: 'Ambiente',
              pronunciation: '/ɪnˈvaɪrənmənt/',
              phonetic: 'in-VAI-ron-ment',
              example:
                'Separating staging and production into distinct environments ensures that test secrets never leak into live systems. = Separare staging e produzione in ambienti distinti assicura che i segreti di test non finiscano mai nei sistemi live.',
              context: 'ci-cd',
              difficulty: 'beginner',
              code: 'environment: production',
            },
            {
              english: 'Secret Variable',
              italian: 'Variabile segreta',
              pronunciation: '/ˈsiːkrɪt ˈveəriəbl/',
              phonetic: 'SI-kret VE-ria-bol',
              example:
                'GitHub automatically masks any secret variable printed to the workflow log, showing asterisks instead. = GitHub maschera automaticamente qualsiasi variabile segreta stampata nel log del workflow, mostrando asterischi al suo posto.',
              context: 'secrets',
              difficulty: 'beginner',
              code: '${{ secrets.API_TOKEN }}',
            },
            {
              english: 'OIDC Token',
              italian: 'Token OIDC',
              pronunciation: '/əʊ aɪ diː siː ˈtəʊkən/',
              phonetic: 'O-AI-DI-SI TO-ken',
              example:
                'Replacing static AWS keys with a short-lived OIDC token eliminated the risk of long-term credential theft. = Sostituire le chiavi AWS statiche con un token OIDC a breve durata ha eliminato il rischio di furto di credenziali a lungo termine.',
              context: 'secrets',
              difficulty: 'beginner',
              note: 'Federazione di identità tra GitHub e cloud.',
            },
            {
              english: 'Workflow Permission',
              italian: 'Permesso del workflow',
              pronunciation: '/ˈwɜːkfləʊ pəˈmɪʃən/',
              phonetic: 'UORK-flou per-MI-scion',
              example:
                'Setting the default workflow permission to read-only prevents malicious steps from pushing code changes. = Impostare il permesso del workflow predefinito a sola lettura impedisce a step malevoli di pushare modifiche al codice.',
              context: 'ci-cd',
              difficulty: 'beginner',
              code: 'permissions:\n  contents: read',
            },
          ],
        },
        {
          id: 'dso_ci_cd_4',
          title: 'Real Pipeline Patterns / Pattern Reali di Pipeline',
          description: 'Esempi pratici di CI/CD sicura',
          items: [
            {
              english: 'Multi-Stage Pipeline',
              italian: 'Pipeline multi-fase',
              pronunciation: '/ˈmʌlti steɪdʒ/',
              phonetic: 'MAL-ti STEIGG',
              example:
                'Our multi-stage pipeline separates linting, unit tests, SAST, and deployment into isolated phases. = La nostra pipeline multi-fase separa linting, unit test, SAST e deployment in fasi isolate.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Fan-Out Job',
              italian: 'Job a ventaglio',
              pronunciation: '/fæn aʊt dʒɒb/',
              phonetic: 'FAN-AUT GIOB',
              example:
                'Three fan-out jobs run SAST, SCA, and secret scanning in parallel, cutting total pipeline time by sixty percent. = Tre job a ventaglio eseguono SAST, SCA e scansione segreti in parallelo, tagliando il tempo totale della pipeline del sessanta percento.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Fail Fast',
              italian: 'Fallire in fretta',
              pronunciation: '/feɪl fɑːst/',
              phonetic: 'FEIL FAST',
              example:
                'Configuring the matrix to fail fast cancels remaining builds as soon as the first one finds a critical error. = Configurare la matrice in fail fast annulla le build rimanenti appena la prima trova un errore critico.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Conditional Step',
              italian: 'Passo condizionale',
              pronunciation: '/kənˈdɪʃənl stɛp/',
              phonetic: 'kon-DI-scio-nal STEP',
              example:
                'We added a conditional step that only runs the full penetration test suite on merges to the main branch. = Abbiamo aggiunto uno step condizionale che esegue la suite completa di penetration test solo sui merge nel branch main.',
              context: 'ci-cd',
              difficulty: 'beginner',
              code: "if: github.ref == 'refs/heads/main'",
            },
            {
              english: 'Reusable Workflow',
              italian: 'Workflow riutilizzabile',
              pronunciation: '/riːˈjuːzəbl ˈwɜːkfləʊ/',
              phonetic: 'ri-IU-za-bol UORK-flou',
              example:
                'The platform team published a reusable workflow that all thirty repositories call for consistent security scanning. = Il team di piattaforma ha pubblicato un workflow riutilizzabile che tutti e trenta i repository chiamano per una scansione di sicurezza coerente.',
              context: 'ci-cd',
              difficulty: 'beginner',
              code: 'uses: org/.github/.../sec.yml@v1',
            },
            {
              english: 'Composite Action',
              italian: 'Azione composita',
              pronunciation: '/ˈkɒmpəzɪt ˈækʃən/',
              phonetic: 'KOM-po-zit AK-scion',
              example:
                'Our composite action bundles Trivy image scan and Cosign signature verification into a single callable step. = La nostra azione composita raggruppa scansione immagini Trivy e verifica firme Cosign in un singolo step richiamabile.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Build Cache',
              italian: 'Cache di build',
              pronunciation: '/bɪld kæʃ/',
              phonetic: 'BILD KASH',
              example:
                'Using a shared build cache across branches reduced average CI run time from twelve minutes to four. = Usare una cache di build condivisa tra i branch ha ridotto il tempo medio di run CI da dodici a quattro minuti.',
              context: 'ci-cd',
              difficulty: 'beginner',
              command: 'actions/cache@v4',
            },
            {
              english: 'Ephemeral Runner',
              italian: 'Runner effimero',
              pronunciation: '/ɪˈfɛmərəl ˈrʌnər/',
              phonetic: 'i-FE-me-ral RA-ner',
              example:
                "Using an ephemeral runner that destroys itself after each job prevents attackers from persisting on CI infrastructure. = Usare un runner effimero che si autodistrugge dopo ogni job impedisce agli attaccanti di persistere sull'infrastruttura CI.",
              context: 'ci-cd',
              difficulty: 'beginner',
              note: 'Si distruggono dopo ogni job.',
            },
            {
              english: 'Pipeline as Code',
              italian: 'Pipeline come codice',
              pronunciation: '/ˈpaɪplaɪn æz kəʊd/',
              phonetic: 'PAIP-lain AZ KOUD',
              example:
                "Storing the pipeline as code in the same repository as the application enables peer review of every CI change. = Memorizzare la pipeline come codice nello stesso repository dell'applicazione permette la peer review di ogni modifica CI.",
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Audit Log',
              italian: 'Registro di audit',
              pronunciation: '/ˈɔːdɪt lɒɡ/',
              phonetic: 'O-dit LOG',
              example:
                "After the incident, we traced the unauthorized pipeline change through the audit log to identify the compromised account. = Dopo l'incidente, abbiamo tracciato la modifica non autorizzata alla pipeline attraverso il registro di audit per identificare l'account compromesso.",
              context: 'ci-cd',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 2 - CODE ANALYSIS / SAST
    // ════════════════════════════════════════════════
    2: {
      name: 'Analisi del Codice / Code Analysis',
      description: 'Analisi statica e revisione del codice',
      lessons: [
        {
          id: 'dso_sast_1',
          title: 'SAST Fundamentals / Fondamenti SAST',
          description: 'Static Application Security Testing',
          items: [
            {
              english: 'SAST',
              italian: 'Test di sicurezza statico',
              pronunciation: '/sæst/',
              phonetic: 'SAST',
              example:
                'Running SAST on every pull request catches SQL injection and XSS patterns before code reaches the main branch. = Eseguire SAST su ogni pull request intercetta pattern di SQL injection e XSS prima che il codice raggiunga il branch main.',
              context: 'sast',
              difficulty: 'beginner',
              note: 'Static Application Security Testing.',
            },
            {
              english: 'Static Analysis',
              italian: 'Analisi statica',
              pronunciation: '/ˈstætɪk əˈnæləsɪs/',
              phonetic: 'STA-tik a-NA-le-sis',
              example:
                'The team configured static analysis rules to flag unsafe deserialization calls across all Java services. = Il team ha configurato regole di analisi statica per segnalare chiamate di deserializzazione non sicure in tutti i servizi Java.',
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'Linting',
              italian: 'Analisi statica del codice (linting)',
              pronunciation: '/ˈlɪntɪŋ/',
              phonetic: 'LIN-ting',
              example:
                'Adding security-focused linting rules to ESLint catches dangerous eval() calls at development time. = Aggiungere regole di linting orientate alla sicurezza a ESLint intercetta chiamate eval() pericolose in fase di sviluppo.',
              context: 'sast',
              difficulty: 'beginner',
              tool: 'ESLint, Pylint, golangci-lint',
            },
            {
              english: 'Linter',
              italian: 'Analizzatore statico (linter)',
              pronunciation: '/ˈlɪntər/',
              phonetic: 'LIN-ter',
              example:
                "The Python linter flagged twelve instances of subprocess.shell=True that could enable command injection. = Il linter Python ha segnalato dodici istanze di subprocess.shell=True che potevano abilitare l'iniezione di comandi.",
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'False Positive',
              italian: 'Falso positivo',
              pronunciation: '/fɔːls ˈpɒzətɪv/',
              phonetic: 'FOLS PO-ze-tiv',
              example:
                'After tuning the rules, we reduced false positive alerts from two hundred per scan to under twenty. = Dopo aver affinato le regole, abbiamo ridotto gli avvisi di falsi positivi da duecento per scansione a meno di venti.',
              context: 'sast',
              difficulty: 'beginner',
              note: 'Avviso che non corrisponde a un vero problema.',
            },
            {
              english: 'False Negative',
              italian: 'Falso negativo',
              pronunciation: '/fɔːls ˈnɛɡətɪv/',
              phonetic: 'FOLS NE-ga-tiv',
              example:
                'A false negative in the SAST tool allowed an XXE vulnerability to reach production undetected. = Un falso negativo nello strumento SAST ha permesso a una vulnerabilità XXE di raggiungere la produzione senza essere rilevata.',
              context: 'sast',
              difficulty: 'beginner',
              note: 'Più pericoloso del falso positivo.',
            },
            {
              english: 'Rule Set',
              italian: 'Insieme di regole',
              pronunciation: '/ruːl sɛt/',
              phonetic: 'RUL SET',
              example:
                "We customized the Semgrep rule set to include company-specific patterns for secure database access. = Abbiamo personalizzato il set di regole Semgrep per includere pattern specifici dell'azienda per l'accesso sicuro al database.",
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'Severity',
              italian: 'Gravità',
              pronunciation: '/sɪˈvɛrəti/',
              phonetic: 'si-VE-re-ti',
              example:
                'Only findings with a severity of high or critical block the pipeline; medium issues generate warnings. = Solo i finding con severità alta o critica bloccano la pipeline; i problemi medi generano avvisi.',
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'Finding',
              italian: 'Riscontro',
              pronunciation: '/ˈfaɪndɪŋ/',
              phonetic: 'FAIN-ding',
              example:
                'The CodeQL scan produced forty-three findings, of which eight were confirmed vulnerabilities needing immediate patches. = La scansione CodeQL ha prodotto quarantatré finding, di cui otto erano vulnerabilità confermate che richiedevano patch immediate.',
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'Remediation',
              italian: 'Rimedio',
              pronunciation: '/rɪˌmiːdiˈeɪʃən/',
              phonetic: 'ri-mi-di-EI-scion',
              example:
                'The security team provided a remediation guide explaining how to replace each insecure cryptographic function. = Il team di sicurezza ha fornito una guida di remediation che spiega come sostituire ogni funzione crittografica insicura.',
              context: 'sast',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'dso_sast_2',
          title: 'SAST Tools / Strumenti SAST',
          description: 'Tool popolari per analisi statica',
          items: [
            {
              english: 'SonarQube',
              italian: 'SonarQube (piattaforma analisi qualità codice)',
              pronunciation: '/ˈsəʊnɑːkjuːb/',
              phonetic: 'SO-nar-kiub',
              example:
                'Integrating SonarQube into our CI pipeline reduced unresolved code smells by sixty percent within three months. = Integrare SonarQube nella nostra pipeline CI ha ridotto i code smell irrisolti del sessanta percento in tre mesi.',
              context: 'sast',
              difficulty: 'beginner',
              tool: 'SonarQube',
              command: 'sonar-scanner -Dsonar.projectKey=app',
            },
            {
              english: 'Semgrep',
              italian: 'Semgrep (SAST a regole semantiche)',
              pronunciation: '/ˈsɛmɡrɛp/',
              phonetic: 'SEM-grep',
              example:
                'Writing custom Semgrep rules let us detect internal API misuse patterns that generic scanners miss. = Scrivere regole Semgrep personalizzate ci ha permesso di rilevare pattern di uso errato delle API interne che gli scanner generici non trovano.',
              context: 'sast',
              difficulty: 'beginner',
              tool: 'Semgrep',
              command: 'semgrep --config auto .',
            },
            {
              english: 'CodeQL',
              italian: 'CodeQL (analisi statica semantica GitHub)',
              pronunciation: '/kəʊd kjuː ɛl/',
              phonetic: 'KOUD-KIU-EL',
              example:
                "Using CodeQL data-flow analysis, we traced user input from the HTTP handler all the way to an unsafe SQL query. = Usando l'analisi del flusso dati di CodeQL, abbiamo tracciato l'input utente dal gestore HTTP fino a una query SQL non sicura.",
              context: 'sast',
              difficulty: 'beginner',
              tool: 'CodeQL',
              note: 'Semantic code analysis di GitHub.',
            },
            {
              english: 'Bandit',
              italian: 'Bandit (SAST per Python)',
              pronunciation: '/ˈbændɪt/',
              phonetic: 'BAN-dit',
              example:
                "Running Bandit on the Flask application flagged three high-severity issues related to insecure YAML loading. = Eseguire Bandit sull'applicazione Flask ha segnalato tre problemi ad alta severità legati al caricamento YAML non sicuro.",
              context: 'sast',
              difficulty: 'beginner',
              tool: 'Bandit',
              command: 'bandit -r myproject/',
            },
            {
              english: 'gosec',
              italian: 'gosec (SAST per Go)',
              pronunciation: '/ˈɡəʊsɛk/',
              phonetic: 'GO-sek',
              example:
                "After adding gosec to the pre-commit hooks, developers catch Go crypto misuse before pushing their code. = Dopo aver aggiunto gosec agli hook pre-commit, gli sviluppatori intercettano l'uso errato della crittografia Go prima di pushare il codice.",
              context: 'sast',
              difficulty: 'beginner',
              tool: 'gosec',
              command: 'gosec ./...',
            },
            {
              english: 'Brakeman',
              italian: 'Brakeman (SAST per Ruby on Rails)',
              pronunciation: '/ˈbreɪkmən/',
              phonetic: 'BREIK-man',
              example:
                'The Brakeman report highlighted a mass-assignment vulnerability in the Rails user registration controller. = Il report di Brakeman ha evidenziato una vulnerabilità di mass-assignment nel controller di registrazione utenti Rails.',
              context: 'sast',
              difficulty: 'beginner',
              tool: 'Brakeman',
              command: 'brakeman -A',
            },
            {
              english: 'Checkmarx',
              italian: 'Checkmarx (SAST commerciale)',
              pronunciation: '/ˈtʃɛkmɑːks/',
              phonetic: 'CIEK-marks',
              example:
                "Our enterprise uses Checkmarx for deep taint analysis across the entire Java monolith codebase. = La nostra azienda usa Checkmarx per l'analisi approfondita del taint attraverso l'intero codebase del monolite Java.",
              context: 'sast',
              difficulty: 'beginner',
              tool: 'Checkmarx',
            },
            {
              english: 'Fortify',
              italian: 'Fortify (SAST commerciale OpenText)',
              pronunciation: '/ˈfɔːtɪfaɪ/',
              phonetic: 'FOR-ti-fai',
              example:
                'The Fortify scan identified a deserialization flaw in the legacy SOAP service handling customer orders. = La scansione Fortify ha identificato una falla di deserializzazione nel servizio SOAP legacy che gestisce gli ordini dei clienti.',
              context: 'sast',
              difficulty: 'beginner',
              tool: 'Fortify',
            },
            {
              english: 'Veracode',
              italian: 'Veracode (SAST commerciale)',
              pronunciation: '/ˈvɛrəkəʊd/',
              phonetic: 'VE-ra-koud',
              example:
                'Before each quarterly release, the team uploads binaries to Veracode for an independent static analysis report. = Prima di ogni rilascio trimestrale, il team carica i binari su Veracode per un report indipendente di analisi statica.',
              context: 'sast',
              difficulty: 'beginner',
              tool: 'Veracode',
            },
            {
              english: 'SARIF',
              italian: 'Formato standard di report di analisi statica (SARIF)',
              pronunciation: '/ˈsærɪf/',
              phonetic: 'SA-rif',
              example:
                'Exporting scanner results in SARIF format allows GitHub to display inline annotations on pull request diffs. = Esportare i risultati dello scanner in formato SARIF permette a GitHub di mostrare annotazioni inline sui diff delle pull request.',
              context: 'sast',
              difficulty: 'beginner',
              note: 'Static Analysis Results Interchange Format.',
            },
          ],
        },
        {
          id: 'dso_sast_3',
          title: 'Common Vulnerabilities / Vulnerabilità Comuni',
          description: 'Bug rilevati dal SAST',
          items: [
            {
              english: 'Injection Flaw',
              italian: 'Difetto di iniezione',
              pronunciation: '/ɪnˈdʒɛkʃən flɔː/',
              phonetic: 'in-GEK-scion FLO',
              example:
                'Parameterized queries are the most effective defense against injection flaws in database-driven applications. = Le query parametrizzate sono la difesa più efficace contro le falle di injection nelle applicazioni basate su database.',
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'SQL Injection',
              italian: 'Iniezione SQL',
              pronunciation: '/ɛs kjuː ɛl ɪnˈdʒɛkʃən/',
              phonetic: 'ES-KIU-EL in-GEK-scion',
              example:
                "The penetration tester exploited a SQL injection in the search endpoint to dump the entire user table. = Il penetration tester ha sfruttato una SQL injection nell'endpoint di ricerca per esfiltrare l'intera tabella utenti.",
              context: 'sast',
              difficulty: 'beginner',
              code: 'query = "SELECT * FROM u WHERE id=" + input',
            },
            {
              english: 'Cross-Site Scripting',
              italian: 'Scripting tra siti',
              pronunciation: '/krɒs saɪt ˈskrɪptɪŋ/',
              phonetic: 'KROS-SAIT SKRIP-ting',
              example:
                "Sanitizing all user output prevents cross-site scripting attacks that could steal session cookies. = Sanificare tutto l'output utente previene attacchi cross-site scripting che potrebbero rubare i cookie di sessione.",
              context: 'sast',
              difficulty: 'beginner',
              note: 'Abbreviato XSS.',
            },
            {
              english: 'Hardcoded Secret',
              italian: 'Segreto codificato',
              pronunciation: '/ˈhɑːdkəʊdɪd ˈsiːkrɪt/',
              phonetic: 'HARD-ko-ded SI-kret',
              example:
                'The scanner found a hardcoded secret containing an AWS access key inside a configuration file committed two years ago. = Lo scanner ha trovato un segreto hardcoded contenente una chiave di accesso AWS in un file di configurazione committato due anni fa.',
              context: 'secrets',
              difficulty: 'beginner',
            },
            {
              english: 'Insecure Deserialization',
              italian: 'Deserializzazione insicura',
              pronunciation: '/ɪnˈsɪkjʊə diˌsɪərɪəlaɪˈzeɪʃən/',
              phonetic: 'in-si-KIUR di-si-ria-lai-ZEI-scion',
              example:
                "An insecure deserialization bug in the Java API allowed attackers to execute arbitrary code via crafted serialized objects. = Un bug di deserializzazione insicura nell'API Java ha permesso agli attaccanti di eseguire codice arbitrario tramite oggetti serializzati costruiti ad hoc.",
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'Path Traversal',
              italian: 'Attraversamento di percorso',
              pronunciation: '/pɑːθ ˈtrævəsl/',
              phonetic: 'PATH TRA-ver-sal',
              example:
                "By exploiting a path traversal flaw in the file-download endpoint, the attacker read /etc/passwd from the server. = Sfruttando una falla di path traversal nell'endpoint di download file, l'attaccante ha letto /etc/passwd dal server.",
              context: 'sast',
              difficulty: 'beginner',
              code: 'open("../../etc/passwd")',
            },
            {
              english: 'Buffer Overflow',
              italian: 'Scrittura oltre i limiti del buffer (buffer overflow)',
              pronunciation: '/ˈbʌfə ˌəʊvəˈfləʊ/',
              phonetic: 'BA-fer o-ver-FLOU',
              example:
                'The fuzzer discovered a buffer overflow in the image parsing library that could lead to remote code execution. = Il fuzzer ha scoperto un buffer overflow nella libreria di parsing delle immagini che poteva portare a esecuzione di codice remoto.',
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'Race Condition',
              italian: 'Condizione di gara',
              pronunciation: '/reɪs kənˈdɪʃən/',
              phonetic: 'REIS kon-DI-scion',
              example:
                'A race condition in the payment flow allowed users to double-spend credits by submitting concurrent requests. = Una race condition nel flusso di pagamento permetteva agli utenti di spendere due volte i crediti inviando richieste concorrenti.',
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'Insecure Random',
              italian: 'Casuale insicuro',
              pronunciation: '/ɪnˈsɪkjʊə ˈrændəm/',
              phonetic: 'in-si-KIUR RAN-dom',
              example:
                'Using Math.random() for token generation is an insecure random practice; always use crypto.getRandomValues() instead. = Usare Math.random() per la generazione di token è una pratica di random insicuro; usa sempre crypto.getRandomValues() al suo posto.',
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'Weak Cryptography',
              italian: 'Crittografia debole',
              pronunciation: '/wiːk krɪpˈtɒɡrəfi/',
              phonetic: 'UIK krip-TO-gra-fi',
              example:
                "The audit flagged MD5 hashing of passwords as weak cryptography and recommended migrating to bcrypt. = L'audit ha segnalato l'hashing MD5 delle password come crittografia debole e ha raccomandato la migrazione a bcrypt.",
              context: 'sast',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'dso_sast_4',
          title: 'Code Review Practice / Pratica di Revisione',
          description: 'Code review efficaci e con focus security',
          items: [
            {
              english: 'Code Review',
              italian: 'Revisione del codice',
              pronunciation: '/kəʊd rɪˈvjuː/',
              phonetic: 'KOUD ri-VIU',
              example:
                'Requiring a security-focused code review on every merge request caught an IDOR vulnerability before release. = Richiedere una code review orientata alla sicurezza su ogni merge request ha intercettato una vulnerabilità IDOR prima del rilascio.',
              context: 'sast',
              difficulty: 'beginner',
            },
            {
              english: 'Pull Request',
              italian: 'Richiesta di pull',
              pronunciation: '/pʊl rɪˈkwɛst/',
              phonetic: 'PUL ri-KUEST',
              example:
                'Every pull request targeting the main branch must include passing SAST results and at least two approvals. = Ogni pull request verso il branch main deve includere risultati SAST positivi e almeno due approvazioni.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Reviewer',
              italian: 'Revisore',
              pronunciation: '/rɪˈvjuːər/',
              phonetic: 'ri-VIU-er',
              example:
                "The designated security reviewer rejected the merge because the input validation logic was incomplete. = Il reviewer di sicurezza designato ha rifiutato il merge perché la logica di validazione dell'input era incompleta.",
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Diff',
              italian: 'Differenza',
              pronunciation: '/dɪf/',
              phonetic: 'DIF',
              example:
                'Examining the diff revealed that the developer had accidentally removed an authorization check from the admin route. = Esaminare il diff ha rivelato che lo sviluppatore aveva accidentalmente rimosso un controllo di autorizzazione dalla route admin.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Inline Comment',
              italian: 'Commento in linea',
              pronunciation: '/ˈɪnlaɪn ˈkɒmɛnt/',
              phonetic: 'IN-lain KO-ment',
              example:
                'The reviewer left an inline comment explaining why the raw SQL query should use parameterized bindings. = Il reviewer ha lasciato un commento inline spiegando perché la query SQL raw dovrebbe usare binding parametrizzati.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Change Request',
              italian: 'Richiesta di modifica',
              pronunciation: '/tʃeɪndʒ rɪˈkwɛst/',
              phonetic: 'CIEINGG ri-KUEST',
              example:
                'The security team filed a change request to enforce TLS 1.3 across all internal API gateways. = Il team di sicurezza ha aperto una change request per imporre TLS 1.3 su tutti i gateway API interni.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Approve',
              italian: 'Approvare',
              pronunciation: '/əˈpruːv/',
              phonetic: 'a-PRUV',
              example:
                'Two code owners must approve the pull request before the merge is allowed on protected branches. = Due code owner devono approvare la pull request prima che il merge sia permesso sui branch protetti.',
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Code Owner',
              italian: 'Proprietario del codice',
              pronunciation: '/kəʊd ˈəʊnər/',
              phonetic: 'KOUD OU-ner',
              example:
                'Defining a code owner for the authentication module ensures that every change to login logic gets expert review. = Definire un code owner per il modulo di autenticazione assicura che ogni modifica alla logica di login riceva una review esperta.',
              context: 'ci-cd',
              difficulty: 'beginner',
              code: 'CODEOWNERS file',
            },
            {
              english: 'Checklist',
              italian: 'Lista di controllo',
              pronunciation: '/ˈtʃɛklɪst/',
              phonetic: 'CIEK-list',
              example:
                "Our security checklist includes items for input validation, output encoding, and proper error handling. = La nostra checklist di sicurezza include elementi per la validazione dell'input, la codifica dell'output e la corretta gestione degli errori.",
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Pair Programming',
              italian: 'Programmazione in coppia',
              pronunciation: '/peər ˈprəʊɡræmɪŋ/',
              phonetic: 'PER PRO-gra-ming',
              example:
                'During pair programming, the navigator spotted an insecure direct object reference the driver had overlooked. = Durante il pair programming, il navigatore ha individuato un riferimento diretto a oggetti insicuro che il driver aveva trascurato.',
              context: 'culture',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 3 - DEPENDENCY MANAGEMENT / SCA
    // ════════════════════════════════════════════════
    3: {
      name: 'Gestione Dipendenze / Dependency Management',
      description: 'SCA, CVE, SBOM e scansione delle dipendenze',
      lessons: [
        {
          id: 'dso_sca_1',
          title: 'SCA Fundamentals / Fondamenti SCA',
          description: 'Software Composition Analysis',
          items: [
            {
              english: 'SCA',
              italian: 'Analisi della composizione del software',
              pronunciation: '/ɛs siː eɪ/',
              phonetic: 'ES-SI-EI',
              example:
                'Integrating SCA into the pipeline revealed that forty percent of our dependencies had known CVEs. = Integrare la SCA nella pipeline ha rivelato che il quaranta percento delle nostre dipendenze aveva CVE note.',
              context: 'sca',
              difficulty: 'beginner',
              note: 'Software Composition Analysis.',
            },
            {
              english: 'Dependency',
              italian: 'Dipendenza',
              pronunciation: '/dɪˈpɛndənsi/',
              phonetic: 'di-PEN-den-si',
              example:
                'Keeping every third-party dependency up to date reduces the window of exposure to known exploits. = Mantenere aggiornata ogni dipendenza di terze parti riduce la finestra di esposizione a exploit noti.',
              context: 'sca',
              difficulty: 'beginner',
            },
            {
              english: 'Transitive Dependency',
              italian: 'Dipendenza transitiva',
              pronunciation: '/trænˈzɪtɪv dɪˈpɛndənsi/',
              phonetic: 'tran-ZI-tiv di-PEN-den-si',
              example:
                'A critical vulnerability in a transitive dependency three levels deep forced us to override the package version. = Una vulnerabilità critica in una dipendenza transitiva profonda tre livelli ci ha costretto a sovrascrivere la versione del pacchetto.',
              context: 'sca',
              difficulty: 'beginner',
              note: 'Dipendenze delle tue dipendenze.',
            },
            {
              english: 'CVE',
              italian: 'Common Vulnerabilities and Exposures (CVE)',
              pronunciation: '/siː viː iː/',
              phonetic: 'SI-VI-I',
              example:
                "The scanner flagged CVE-2024-1234 in our logging library, so we patched it before the next release. = Lo scanner ha segnalato la CVE-2024-1234 nella nostra libreria di logging, così l'abbiamo patchata prima del prossimo rilascio.",
              context: 'sca',
              difficulty: 'beginner',
              note: 'Common Vulnerabilities and Exposures.',
              code: 'CVE-2021-44228 (Log4Shell)',
            },
            {
              english: 'CVSS Score',
              italian: 'Punteggio CVSS',
              pronunciation: '/siː viː ɛs ɛs skɔː/',
              phonetic: 'SI-VI-ES-ES SKOR',
              example:
                "Any dependency with a CVSS score above seven point zero triggers an automatic pull request for version update. = Qualsiasi dipendenza con un punteggio CVSS superiore a sette punto zero attiva una pull request automatica per l'aggiornamento della versione.",
              context: 'sca',
              difficulty: 'beginner',
              note: 'Common Vulnerability Scoring System.',
            },
            {
              english: 'Patch',
              italian: 'Correzione del codice (patch)',
              pronunciation: '/pætʃ/',
              phonetic: 'PACI',
              example:
                "The team applied the security patch within twenty-four hours of the critical advisory being published. = Il team ha applicato la patch di sicurezza entro ventiquattro ore dalla pubblicazione dell'avviso critico.",
              context: 'sca',
              difficulty: 'beginner',
            },
            {
              english: 'Lock File',
              italian: 'File di lock',
              pronunciation: '/lɒk faɪl/',
              phonetic: 'LOK FAIL',
              example:
                'Committing the lock file to the repository ensures reproducible builds and prevents silent dependency upgrades. = Committare il lock file nel repository assicura build riproducibili e previene aggiornamenti silenziosi delle dipendenze.',
              context: 'sca',
              difficulty: 'beginner',
              code: 'package-lock.json, poetry.lock, Cargo.lock',
            },
            {
              english: 'Pinning',
              italian: 'Fissaggio',
              pronunciation: '/ˈpɪnɪŋ/',
              phonetic: 'PI-ning',
              example:
                "Version pinning every CI action and base image digest prevents unexpected changes from breaking security controls. = Il pinning delle versioni di ogni azione CI e digest dell'immagine base previene che cambiamenti inattesi rompano i controlli di sicurezza.",
              context: 'sca',
              difficulty: 'beginner',
            },
            {
              english: 'Manifest',
              italian: 'File di manifesto (manifest)',
              pronunciation: '/ˈmænɪfɛst/',
              phonetic: 'MA-ni-fest',
              example:
                'The package manifest lists all direct dependencies and their exact versions for audit purposes. = Il file manifest del pacchetto elenca tutte le dipendenze dirette e le loro versioni esatte a fini di audit.',
              context: 'sca',
              difficulty: 'beginner',
              code: 'package.json, pyproject.toml',
            },
            {
              english: 'Vulnerability Database',
              italian: 'Database di vulnerabilità',
              pronunciation: '/ˌvʌlnərəˈbɪləti ˈdeɪtəbeɪs/',
              phonetic: 'val-ne-ra-BI-li-ti DEI-ta-beis',
              example:
                'Grype checks every installed package against the public vulnerability database and flags any match above medium severity. = Grype controlla ogni pacchetto installato contro il database di vulnerabilità pubblico e segnala qualsiasi corrispondenza sopra la severità media.',
              context: 'sca',
              difficulty: 'beginner',
              tool: 'NVD, OSV, GHSA',
            },
          ],
        },
        {
          id: 'dso_sca_2',
          title: 'SCA Tools / Strumenti SCA',
          description: 'Snyk, Dependabot, Renovate e altri',
          items: [
            {
              english: 'Snyk',
              italian: 'Snyk (piattaforma sicurezza dipendenze)',
              pronunciation: '/sniːk/',
              phonetic: 'SNIK',
              example:
                'After connecting Snyk to our GitHub repository, it automatically opens fix pull requests for vulnerable dependencies. = Dopo aver collegato Snyk al nostro repository GitHub, apre automaticamente pull request di fix per le dipendenze vulnerabili.',
              context: 'sca',
              difficulty: 'beginner',
              tool: 'Snyk',
              command: 'snyk test',
            },
            {
              english: 'Dependabot',
              italian: 'Dependabot (aggiornamento automatico dipendenze)',
              pronunciation: '/dɪˈpɛndəbɒt/',
              phonetic: 'di-PEN-da-bot',
              example:
                'Enabling Dependabot alerts on the organization level notifies every team when a critical CVE affects their stack. = Abilitare gli avvisi Dependabot a livello di organizzazione notifica ogni team quando una CVE critica colpisce il loro stack.',
              context: 'sca',
              difficulty: 'beginner',
              tool: 'Dependabot',
              code: 'updates:\n  - package-ecosystem: npm',
            },
            {
              english: 'Renovate',
              italian: 'Renovate (aggiornamento dipendenze configurabile)',
              pronunciation: '/ˈrɛnəveɪt/',
              phonetic: 'RE-no-veit',
              example:
                'We configured Renovate to group minor updates into a single pull request to reduce review fatigue. = Abbiamo configurato Renovate per raggruppare gli aggiornamenti minori in una singola pull request per ridurre la fatica di review.',
              context: 'sca',
              difficulty: 'beginner',
              tool: 'Renovate',
            },
            {
              english: 'OWASP Dependency-Check',
              italian: 'Scanner di vulnerabilità (OWASP Dependency-Check)',
              pronunciation: '/ˈəʊwɒsp dɪˈpɛndənsi tʃɛk/',
              phonetic: 'O-uosp di-PEN-den-si CIEK',
              example:
                'Adding OWASP Dependency-Check to the Maven build identifies CVEs in transitive Java libraries automatically. = Aggiungere OWASP Dependency-Check alla build Maven identifica automaticamente le CVE nelle librerie Java transitive.',
              context: 'sca',
              difficulty: 'beginner',
              tool: 'OWASP Dependency-Check',
              command: 'dependency-check.sh --scan ./',
            },
            {
              english: 'npm audit',
              italian: 'Scanner npm integrato (npm audit)',
              pronunciation: '/ɛn piː ɛm ˈɔːdɪt/',
              phonetic: 'EN-PI-EM O-dit',
              example:
                'Running npm audit in the CI pipeline blocks any build that introduces a high-severity vulnerability. = Eseguire npm audit nella pipeline CI blocca qualsiasi build che introduce una vulnerabilità ad alta severità.',
              context: 'sca',
              difficulty: 'beginner',
              command: 'npm audit --production',
            },
            {
              english: 'pip-audit',
              italian: 'Scanner Python (pip-audit)',
              pronunciation: '/pɪp ˈɔːdɪt/',
              phonetic: 'PIP O-dit',
              example:
                'The nightly cron job runs pip-audit to check all Python requirements against the OSV database. = Il cron job notturno esegue pip-audit per controllare tutti i requisiti Python contro il database OSV.',
              context: 'sca',
              difficulty: 'beginner',
              command: 'pip-audit -r requirements.txt',
            },
            {
              english: 'cargo-audit',
              italian: 'Scanner Rust (cargo-audit)',
              pronunciation: '/ˈkɑːɡəʊ ˈɔːdɪt/',
              phonetic: 'KAR-go O-dit',
              example:
                'Before every release, cargo-audit verifies that no Rust crate dependency contains a known advisory. = Prima di ogni rilascio, cargo-audit verifica che nessuna dipendenza crate Rust contenga un avviso noto.',
              context: 'sca',
              difficulty: 'beginner',
              command: 'cargo audit',
            },
            {
              english: 'GitHub Advisory',
              italian: 'Avviso GitHub',
              pronunciation: '/ˈɡɪthʌb ədˈvaɪzəri/',
              phonetic: 'GHIT-hab ad-VAI-zo-ri',
              example:
                'The GitHub Advisory database published a new entry for the Log4Shell vulnerability within hours of its disclosure. = Il database GitHub Advisory ha pubblicato una nuova voce per la vulnerabilità Log4Shell entro poche ore dalla sua divulgazione.',
              context: 'sca',
              difficulty: 'beginner',
              note: 'GitHub Security Advisory.',
            },
            {
              english: 'OSV',
              italian: 'Open Source Vulnerabilities database (OSV)',
              pronunciation: '/əʊ ɛs viː/',
              phonetic: 'O-ES-VI',
              example:
                'Querying the OSV database by package name returns every known vulnerability across all ecosystems. = Interrogare il database OSV per nome del pacchetto restituisce ogni vulnerabilità nota in tutti gli ecosistemi.',
              context: 'sca',
              difficulty: 'beginner',
              note: 'Open Source Vulnerabilities.',
              tool: 'osv-scanner',
            },
            {
              english: 'Whitelist Library',
              italian: 'Whitelist di librerie',
              pronunciation: '/ˈwaɪtlɪst ˈlaɪbrəri/',
              phonetic: 'UAIT-list LAI-bra-ri',
              example:
                'Maintaining a whitelist library of pre-approved packages prevents teams from introducing unvetted dependencies. = Mantenere una whitelist di librerie pre-approvate impedisce ai team di introdurre dipendenze non verificate.',
              context: 'sca',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'dso_sca_3',
          title: 'SBOM / Bill of Materials',
          description: 'Software Bill of Materials e formati',
          items: [
            {
              english: 'SBOM',
              italian: 'Distinta base del software',
              pronunciation: '/ˈɛsbɒm/',
              phonetic: 'ES-bom',
              example:
                'Generating an SBOM for every container image gives the security team full visibility into shipped components. = Generare un SBOM per ogni immagine container dà al team di sicurezza piena visibilità sui componenti distribuiti.',
              context: 'sca',
              difficulty: 'beginner',
              note: 'Software Bill of Materials.',
            },
            {
              english: 'CycloneDX',
              italian: 'Standard SBOM (CycloneDX)',
              pronunciation: '/ˈsaɪkləʊndiːɛks/',
              phonetic: 'SAI-klon-DI-EX',
              example:
                'We export our dependency data in CycloneDX format so it integrates with the vulnerability management platform. = Esportiamo i dati delle nostre dipendenze in formato CycloneDX così si integrano con la piattaforma di gestione delle vulnerabilità.',
              context: 'sca',
              difficulty: 'beginner',
              tool: 'CycloneDX',
            },
            {
              english: 'SPDX',
              italian: 'Standard SBOM e licenze (SPDX)',
              pronunciation: '/ɛs piː diː ɛks/',
              phonetic: 'ES-PI-DI-EX',
              example:
                "The legal department requires an SPDX document for every release to verify open-source license compliance. = L'ufficio legale richiede un documento SPDX per ogni rilascio per verificare la conformità delle licenze open-source.",
              context: 'sca',
              difficulty: 'beginner',
              tool: 'SPDX',
              note: 'Software Package Data Exchange.',
            },
            {
              english: 'Syft',
              italian: 'Syft (generatore SBOM)',
              pronunciation: '/sɪft/',
              phonetic: 'SIFT',
              example:
                "Running Syft against the production Docker image generates a comprehensive SBOM in under ten seconds. = Eseguire Syft sull'immagine Docker di produzione genera un SBOM completo in meno di dieci secondi.",
              context: 'sca',
              difficulty: 'beginner',
              tool: 'Syft',
              command: 'syft myimage:latest -o cyclonedx-json',
            },
            {
              english: 'Grype',
              italian: 'Grype (scanner di vulnerabilità immagini)',
              pronunciation: '/ɡraɪp/',
              phonetic: 'GRAIP',
              example:
                'Pairing Grype with Syft creates a pipeline where images are catalogued and then scanned for vulnerabilities automatically. = Abbinare Grype a Syft crea una pipeline dove le immagini vengono catalogate e poi scansionate per vulnerabilità automaticamente.',
              context: 'sca',
              difficulty: 'beginner',
              tool: 'Grype',
              command: 'grype sbom:./sbom.json',
            },
            {
              english: 'VEX',
              italian: 'Vulnerability Exploitability eXchange (VEX)',
              pronunciation: '/vɛks/',
              phonetic: 'VEX',
              example:
                'Issuing a VEX statement clarifies that the detected CVE is not exploitable in our specific deployment configuration. = Emettere un documento VEX chiarisce che la CVE rilevata non è sfruttabile nella nostra specifica configurazione di deploy.',
              context: 'sca',
              difficulty: 'beginner',
              note: 'Vulnerability Exploitability eXchange.',
            },
            {
              english: 'Component',
              italian: 'Componente',
              pronunciation: '/kəmˈpəʊnənt/',
              phonetic: 'kom-PO-nent',
              example:
                "The SBOM lists every software component, including version, supplier, and cryptographic hash. = L'SBOM elenca ogni componente software, inclusi versione, fornitore e hash crittografico.",
              context: 'sca',
              difficulty: 'beginner',
            },
            {
              english: 'PURL',
              italian: 'Package URL',
              pronunciation: '/pɜːl/',
              phonetic: 'PERL',
              example:
                'Using a PURL identifier like pkg:npm/express@4.18.2 uniquely locates the exact package across any registry. = Usare un identificatore PURL come pkg:npm/express@4.18.2 localizza univocamente il pacchetto esatto in qualsiasi registry.',
              context: 'sca',
              difficulty: 'beginner',
              code: 'pkg:npm/lodash@4.17.21',
            },
            {
              english: 'License Compliance',
              italian: 'Conformità delle licenze',
              pronunciation: '/ˈlaɪsəns kəmˈplaɪəns/',
              phonetic: 'LAI-sens kom-PLAI-ans',
              example:
                'The automated license compliance check rejected a library distributed under the AGPL because our product is proprietary. = Il controllo automatico di conformità delle licenze ha rifiutato una libreria distribuita sotto AGPL perché il nostro prodotto è proprietario.',
              context: 'compliance-as-code',
              difficulty: 'beginner',
            },
            {
              english: 'Executive Order 14028',
              italian: 'Ordine esecutivo 14028',
              pronunciation: '/ɪɡˈzɛkjʊtɪv ˈɔːdə/',
              phonetic: 'eg-ZE-kiu-tiv OR-der',
              example:
                "After Executive Order 14028, federal software vendors must provide an SBOM with every delivery. = Dopo l'Executive Order 14028, i fornitori di software federali devono fornire un SBOM con ogni consegna.",
              context: 'compliance-as-code',
              difficulty: 'beginner',
              note: "Ordine USA che ha spinto l'adozione di SBOM.",
            },
          ],
        },
        {
          id: 'dso_sca_4',
          title: 'Real World SCA / SCA nel Mondo Reale',
          description: 'Triage CVE e gestione dipendenze',
          items: [
            {
              english: 'Triage',
              italian: 'Classificazione iniziale per priorità (triage)',
              pronunciation: '/ˈtriːɑːʒ/',
              phonetic: 'TRI-asg',
              example:
                'During weekly triage meetings, the team classifies new vulnerability findings by severity and business impact. = Durante le riunioni di triage settimanali, il team classifica i nuovi finding di vulnerabilità per severità e impatto aziendale.',
              context: 'sca',
              difficulty: 'beginner',
            },
            {
              english: 'Reachability',
              italian: 'Raggiungibilità',
              pronunciation: '/ˌriːtʃəˈbɪləti/',
              phonetic: 'ri-cia-BI-li-ti',
              example:
                "The reachability analysis confirmed that no production code path actually calls the vulnerable function. = L'analisi di reachability ha confermato che nessun percorso di codice in produzione chiama effettivamente la funzione vulnerabile.",
              context: 'sca',
              difficulty: 'beginner',
              note: 'Verifica se la funzione vulnerabile è davvero usata.',
            },
            {
              english: 'Major Version Bump',
              italian: 'Salto di versione maggiore',
              pronunciation: '/ˈmeɪdʒə ˈvɜːʃən bʌmp/',
              phonetic: 'MEI-ger VER-scion BAMP',
              example:
                'A major version bump in the authentication library introduced breaking API changes that required migration. = Un major version bump nella libreria di autenticazione ha introdotto cambiamenti API incompatibili che hanno richiesto una migrazione.',
              context: 'sca',
              difficulty: 'beginner',
            },
            {
              english: 'Semver',
              italian: 'Versionamento semantico',
              pronunciation: '/ˈsɛmvɜː/',
              phonetic: 'SEM-ver',
              example:
                'Following semver conventions, a patch release should only fix bugs without adding features or breaking compatibility. = Seguendo le convenzioni semver, una release patch dovrebbe solo correggere bug senza aggiungere funzionalità o rompere la compatibilità.',
              context: 'sca',
              difficulty: 'beginner',
              code: '^1.2.3',
            },
            {
              english: 'EOL Library',
              italian: 'Libreria a fine vita',
              pronunciation: '/iː əʊ ɛl ˈlaɪbrəri/',
              phonetic: 'I-O-EL LAI-bra-ri',
              example:
                'The scanner flagged three EOL libraries that no longer receive security patches and must be replaced. = Lo scanner ha segnalato tre librerie EOL che non ricevono più patch di sicurezza e devono essere sostituite.',
              context: 'sca',
              difficulty: 'beginner',
              note: 'End of Life.',
            },
            {
              english: 'Bundle Audit',
              italian: 'Audit del bundle',
              pronunciation: '/ˈbʌndl ˈɔːdɪt/',
              phonetic: 'BAN-dol O-dit',
              example:
                'Running bundle audit on the Rails project revealed two gems with critical remote code execution advisories. = Eseguire bundle audit sul progetto Rails ha rivelato due gem con avvisi critici di esecuzione di codice remoto.',
              context: 'sca',
              difficulty: 'beginner',
              command: 'bundle audit check',
            },
            {
              english: 'Auto-Merge',
              italian: 'Merge automatico',
              pronunciation: '/ˈɔːtəʊ mɜːdʒ/',
              phonetic: 'O-to MERGG',
              example:
                "We enabled auto-merge for Dependabot PRs that only bump patch versions and pass all security checks. = Abbiamo abilitato l'auto-merge per le PR di Dependabot che incrementano solo versioni patch e passano tutti i controlli di sicurezza.",
              context: 'ci-cd',
              difficulty: 'beginner',
            },
            {
              english: 'Allowlist',
              italian: 'Lista di permessi',
              pronunciation: '/əˈlaʊlɪst/',
              phonetic: 'a-LAU-list',
              example:
                'Adding a CVE to the allowlist requires a documented justification and an expiration date for re-evaluation. = Aggiungere una CVE alla allowlist richiede una giustificazione documentata e una data di scadenza per la rivalutazione.',
              context: 'sca',
              difficulty: 'beginner',
            },
            {
              english: 'Private Registry',
              italian: 'Registry privato',
              pronunciation: '/ˈpraɪvət ˈrɛdʒɪstri/',
              phonetic: 'PRAI-vet RE-gi-stri',
              example:
                'Hosting internal packages on a private registry prevents supply-chain attacks from public package name squatting. = Ospitare i pacchetti interni su un registry privato previene attacchi supply-chain dal name squatting sui pacchetti pubblici.',
              context: 'sca',
              difficulty: 'beginner',
              tool: 'JFrog Artifactory, Nexus',
            },
            {
              english: 'Vendor Risk',
              italian: 'Rischio del fornitore',
              pronunciation: '/ˈvɛndə rɪsk/',
              phonetic: 'VEN-der RISK',
              example:
                "The procurement team evaluates vendor risk by reviewing the supplier's SOC 2 report and vulnerability history. = Il team di procurement valuta il rischio del vendor revisionando il report SOC 2 del fornitore e la storia delle vulnerabilità.",
              context: 'sca',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 4 - SECRETS MANAGEMENT
    // ════════════════════════════════════════════════
    4: {
      name: 'Gestione dei Segreti / Secrets Management',
      description: 'Vault, secret scanning e rotazione',
      lessons: [
        {
          id: 'dso_secrets_1',
          title: 'Secrets Basics / Basi dei Segreti',
          description: "Cos'è un segreto e perché va protetto",
          items: [
            {
              english: 'Secret',
              italian: 'Segreto',
              pronunciation: '/ˈsiːkrɪt/',
              phonetic: 'SI-kret',
              example:
                'Storing a database password as a plaintext secret in a YAML file violates every security best practice. = Memorizzare una password di database come segreto in testo chiaro in un file YAML viola ogni best practice di sicurezza.',
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'API Key',
              italian: 'Chiave API',
              pronunciation: '/eɪ piː aɪ kiː/',
              phonetic: 'EI-PI-AI KI',
              example:
                "The leaked API key gave the attacker full access to the payment gateway for over seventy-two hours. = La chiave API trapelata ha dato all'attaccante accesso completo al gateway di pagamento per oltre settantadue ore.",
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Token',
              italian: "Credenziale d'accesso (token)",
              pronunciation: '/ˈtəʊkən/',
              phonetic: 'TO-ken',
              example:
                'Each service authenticates to the message broker using a scoped token that expires after fifteen minutes. = Ogni servizio si autentica al message broker usando un token con scope che scade dopo quindici minuti.',
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Credential',
              italian: 'Credenziale',
              pronunciation: '/krɪˈdɛnʃəl/',
              phonetic: 'kri-DEN-scial',
              example:
                "Never store any credential in source code; always load it from an environment variable or vault at runtime. = Non memorizzare mai alcuna credenziale nel codice sorgente; caricala sempre da una variabile d'ambiente o da un vault a runtime.",
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Vault',
              italian: 'Cassaforte di segreti (vault)',
              pronunciation: '/vɔːlt/',
              phonetic: 'VOLT',
              example:
                "The application retrieves its database credentials from the vault at startup, so nothing sensitive lives on disk. = L'applicazione recupera le credenziali del database dal vault all'avvio, così nulla di sensibile rimane su disco.",
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'HashiCorp Vault',
            },
            {
              english: 'Encryption Key',
              italian: 'Chiave di cifratura',
              pronunciation: '/ɪnˈkrɪpʃən kiː/',
              phonetic: 'in-KRIP-scion KI',
              example:
                "Rotating the encryption key quarterly limits the blast radius if an older key is ever compromised. = Ruotare la chiave di crittografia trimestralmente limita il raggio d'impatto se una chiave più vecchia viene compromessa.",
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Master Key',
              italian: 'Chiave master',
              pronunciation: '/ˈmɑːstə kiː/',
              phonetic: 'MAS-ter KI',
              example:
                "Only two people in the organization know the master key, and both fragments are needed to unseal the vault. = Solo due persone nell'organizzazione conoscono la chiave master, e entrambi i frammenti sono necessari per aprire il vault.",
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Secret Sprawl',
              italian: 'Proliferazione di segreti',
              pronunciation: '/ˈsiːkrɪt sprɔːl/',
              phonetic: 'SI-kret SPROL',
              example:
                'Without centralized management, secret sprawl leads to credentials scattered across dozens of config files and wikis. = Senza gestione centralizzata, la proliferazione dei segreti porta a credenziali sparse in decine di file di configurazione e wiki.',
              context: 'secrets',
              difficulty: 'intermediate',
              note: 'Segreti sparsi in tanti posti diversi.',
            },
            {
              english: 'Service Account',
              italian: 'Account di servizio',
              pronunciation: '/ˈsɜːvɪs əˈkaʊnt/',
              phonetic: 'SER-vis a-KAUNT',
              example:
                'Each microservice runs under its own service account with permissions limited to exactly the resources it needs. = Ogni microservizio gira sotto il proprio account di servizio con permessi limitati esattamente alle risorse di cui ha bisogno.',
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Access Token',
              italian: 'Token di accesso',
              pronunciation: '/ˈæksɛs ˈtəʊkən/',
              phonetic: 'AK-ses TO-ken',
              example:
                'The CI pipeline exchanges an OIDC claim for a short-lived access token that can only read the artifact registry. = La pipeline CI scambia un claim OIDC per un access token a breve durata che può solo leggere il registry degli artefatti.',
              context: 'secrets',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_secrets_2',
          title: 'Vault Tools / Strumenti Vault',
          description: 'HashiCorp Vault, AWS Secrets Manager, GCP, Azure',
          items: [
            {
              english: 'HashiCorp Vault',
              italian: 'HashiCorp Vault (gestore segreti enterprise)',
              pronunciation: '/ˈhæʃɪkɔːp vɔːlt/',
              phonetic: 'HASH-i-korp VOLT',
              example:
                'Our microservices pull TLS certificates from HashiCorp Vault using the Kubernetes auth backend. = I nostri microservizi ottengono certificati TLS da HashiCorp Vault usando il backend di autenticazione Kubernetes.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'Vault',
              command: 'vault kv get secret/db',
            },
            {
              english: 'AWS Secrets Manager',
              italian: 'AWS Secrets Manager (gestore segreti AWS)',
              pronunciation: '/eɪ dʌbljuː ɛs ˈsiːkrɪts ˈmænɪdʒə/',
              phonetic: 'EI-DABL-IU-ES SI-krets MA-ni-ger',
              example:
                'Enabling automatic rotation in AWS Secrets Manager changes the database password every thirty days without downtime. = Abilitare la rotazione automatica in AWS Secrets Manager cambia la password del database ogni trenta giorni senza downtime.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'AWS Secrets Manager',
              command: 'aws secretsmanager get-secret-value --secret-id db',
            },
            {
              english: 'AWS Parameter Store',
              italian: 'AWS Parameter Store (gestore parametri AWS)',
              pronunciation: '/eɪ dʌbljuː ɛs pəˈræmɪtə stɔː/',
              phonetic: 'EI-DABL-IU-ES pa-RA-me-ter STOR',
              example:
                'Non-sensitive configuration values live in AWS Parameter Store while actual secrets go into Secrets Manager. = I valori di configurazione non sensibili stanno in AWS Parameter Store mentre i segreti effettivi vanno in Secrets Manager.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'AWS SSM',
              command: 'aws ssm get-parameter --name /app/db --with-decryption',
            },
            {
              english: 'Azure Key Vault',
              italian: 'Azure Key Vault (gestore segreti Azure)',
              pronunciation: '/ˈæʒə kiː vɔːlt/',
              phonetic: 'A-zer KI-VOLT',
              example:
                "The application retrieves its signing certificate from Azure Key Vault using a managed identity for passwordless access. = L'applicazione recupera il suo certificato di firma da Azure Key Vault usando un'identità gestita per l'accesso senza password.",
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'Azure Key Vault',
              command: 'az keyvault secret show --name api --vault-name kv',
            },
            {
              english: 'GCP Secret Manager',
              italian: 'GCP Secret Manager (gestore segreti Google)',
              pronunciation: '/dʒiː siː piː ˈsiːkrɪt ˈmænɪdʒə/',
              phonetic: 'GI-SI-PI SI-kret MA-ni-ger',
              example:
                "IAM policies in GCP Secret Manager ensure that only the production service account can access payment credentials. = Le policy IAM in GCP Secret Manager assicurano che solo l'account di servizio di produzione possa accedere alle credenziali di pagamento.",
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'GCP Secret Manager',
              command: 'gcloud secrets versions access latest --secret=db',
            },
            {
              english: 'Sealed Secret',
              italian: 'Segreto sigillato',
              pronunciation: '/siːld ˈsiːkrɪt/',
              phonetic: 'SILD SI-kret',
              example:
                'Converting Kubernetes secrets to SealedSecret resources lets you safely commit them to a Git repository. = Convertire i secret Kubernetes in risorse SealedSecret permette di committarli in sicurezza in un repository Git.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'Bitnami Sealed Secrets',
            },
            {
              english: 'External Secrets Operator',
              italian: 'Sincronizzatore segreti K8s (External Secrets Operator)',
              pronunciation: '/ɪkˈstɜːnl ˈsiːkrɪts ˈɒpəreɪtə/',
              phonetic: 'eks-TER-nal SI-krets O-pe-rei-ter',
              example:
                "The External Secrets Operator synchronizes entries from AWS Secrets Manager into Kubernetes secrets every sixty seconds. = L'External Secrets Operator sincronizza le voci da AWS Secrets Manager nei secret Kubernetes ogni sessanta secondi.",
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'External Secrets Operator',
            },
            {
              english: 'Doppler',
              italian: 'Doppler (piattaforma di gestione segreti)',
              pronunciation: '/ˈdɒplər/',
              phonetic: 'DO-pler',
              example:
                'Migrating from .env files to Doppler gave us audit trails, versioning, and environment-specific secret management. = Migrare dai file .env a Doppler ci ha dato tracciabilità, versionamento e gestione dei segreti specifica per ambiente.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'Doppler',
            },
            {
              english: '1Password CLI',
              italian: 'CLI 1Password',
              pronunciation: '/wʌn ˈpɑːswɜːd siː ɛl aɪ/',
              phonetic: 'UAN PAS-uord SI-EL-AI',
              example:
                'Developers use the 1Password CLI to inject credentials into local development without copying them to disk. = Gli sviluppatori usano la CLI di 1Password per iniettare credenziali nello sviluppo locale senza copiarle su disco.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: '1Password',
              command: 'op run -- ./app',
            },
            {
              english: 'KMS',
              italian: 'Servizio di gestione chiavi',
              pronunciation: '/keɪ ɛm ɛs/',
              phonetic: 'KEI-EM-ES',
              example:
                "The application encrypts sensitive fields at rest using an AWS KMS customer-managed key with automatic rotation. = L'applicazione cripta i campi sensibili a riposo usando una chiave AWS KMS gestita dal cliente con rotazione automatica.",
              context: 'secrets',
              difficulty: 'intermediate',
              note: 'Key Management Service.',
            },
          ],
        },
        {
          id: 'dso_secrets_3',
          title: 'Secret Scanning / Scansione Segreti',
          description: 'Trovare segreti committati per errore',
          items: [
            {
              english: 'Secret Scanning',
              italian: 'Scansione di segreti',
              pronunciation: '/ˈsiːkrɪt ˈskænɪŋ/',
              phonetic: 'SI-kret SKA-ning',
              example:
                'Enabling secret scanning at the organization level prevents any repository from accepting commits that contain API keys. = Abilitare la scansione dei segreti a livello di organizzazione impedisce a qualsiasi repository di accettare commit contenenti chiavi API.',
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Gitleaks',
              italian: 'gitleaks (scanner segreti git)',
              pronunciation: '/ˈɡɪtliːks/',
              phonetic: 'GHIT-liks',
              example:
                "Running Gitleaks against the entire commit history found three revoked but still-visible AWS credentials. = Eseguire Gitleaks sull'intera cronologia dei commit ha trovato tre credenziali AWS revocate ma ancora visibili.",
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'Gitleaks',
              command: 'gitleaks detect --source .',
            },
            {
              english: 'TruffleHog',
              italian: 'TruffleHog (scanner segreti git)',
              pronunciation: '/ˈtrʌflhɒɡ/',
              phonetic: 'TRA-fol-hog',
              example:
                'The TruffleHog scan detected a high-entropy string in a Terraform file that turned out to be a live database password. = La scansione TruffleHog ha rilevato una stringa ad alta entropia in un file Terraform che si è rivelata una password di database attiva.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'TruffleHog',
              command: 'trufflehog filesystem --directory=.',
            },
            {
              english: 'detect-secrets',
              italian: 'detect-secrets (scanner segreti Yelp)',
              pronunciation: '/dɪˈtɛkt ˈsiːkrɪts/',
              phonetic: 'di-TEKT SI-krets',
              example:
                'Adding detect-secrets to the pre-commit framework blocks any commit containing patterns that match known credential formats. = Aggiungere detect-secrets al framework pre-commit blocca qualsiasi commit contenente pattern che corrispondono a formati di credenziali noti.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'detect-secrets',
              command: 'detect-secrets scan',
            },
            {
              english: 'GitHub Secret Scanning',
              italian: 'Secret scanning di GitHub',
              pronunciation: '/ˈɡɪthʌb/',
              phonetic: 'GHIT-hab',
              example:
                'When GitHub Secret Scanning detects an exposed token, it notifies the token provider for automatic revocation. = Quando GitHub Secret Scanning rileva un token esposto, notifica il fornitore del token per la revoca automatica.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'GitHub',
            },
            {
              english: 'Push Protection',
              italian: 'Protezione del push',
              pronunciation: '/pʊʃ prəˈtɛkʃən/',
              phonetic: 'PUSH pro-TEK-scion',
              example:
                'With push protection enabled, Git rejects the push immediately if the commit contains any recognized secret pattern. = Con la push protection abilitata, Git rifiuta il push immediatamente se il commit contiene qualsiasi pattern di segreto riconosciuto.',
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Entropy Detection',
              italian: "Rilevamento dell'entropia",
              pronunciation: '/ˈɛntrəpi dɪˈtɛkʃən/',
              phonetic: 'EN-tro-pi di-TEK-scion',
              example:
                'High entropy detection catches randomly generated strings like API keys that rule-based scanners might miss. = Il rilevamento ad alta entropia intercetta stringhe generate casualmente come chiavi API che gli scanner basati su regole potrebbero non trovare.',
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Regex Pattern',
              italian: 'Pattern regex',
              pronunciation: '/ˈriːdʒɛks ˈpætən/',
              phonetic: 'RI-gex PA-tern',
              example:
                "We added a custom regex pattern for our internal API key format so the scanner catches company-specific secrets. = Abbiamo aggiunto un pattern regex personalizzato per il formato delle nostre chiavi API interne così lo scanner intercetta i segreti specifici dell'azienda.",
              context: 'secrets',
              difficulty: 'intermediate',
              code: '/AKIA[0-9A-Z]{16}/',
            },
            {
              english: 'BFG Repo-Cleaner',
              italian: 'Utility pulizia storia Git (BFG Repo-Cleaner)',
              pronunciation: '/biː ɛf dʒiː ˈriːpəʊ ˈkliːnə/',
              phonetic: 'BI-EF-GI RI-po KLI-ner',
              example:
                "After revoking the leaked key, we used BFG Repo-Cleaner to permanently remove it from the entire Git history. = Dopo aver revocato la chiave trapelata, abbiamo usato BFG Repo-Cleaner per rimuoverla permanentemente dall'intera cronologia Git.",
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'BFG Repo-Cleaner',
              command: 'bfg --delete-files secrets.txt',
            },
            {
              english: 'Leak Notification',
              italian: 'Notifica di leak',
              pronunciation: '/liːk ˌnəʊtɪfɪˈkeɪʃən/',
              phonetic: 'LIK no-ti-fi-KEI-scion',
              example:
                'Our leak notification system sends a Slack alert within seconds when a secret is detected in any repository. = Il nostro sistema di notifica leak invia un avviso Slack entro pochi secondi quando un segreto viene rilevato in qualsiasi repository.',
              context: 'secrets',
              difficulty: 'intermediate',
              note: 'AWS, GitHub e altri rilevano token leakati.',
            },
          ],
        },
        {
          id: 'dso_secrets_4',
          title: 'Rotation & Best Practices / Rotazione e Buone Pratiche',
          description: 'Gestione del ciclo di vita dei segreti',
          items: [
            {
              english: 'Secret Rotation',
              italian: 'Rotazione dei segreti',
              pronunciation: '/ˈsiːkrɪt rəʊˈteɪʃən/',
              phonetic: 'SI-kret ro-TEI-scion',
              example:
                "Automated secret rotation replaces database passwords every seven days without any application downtime. = La rotazione automatica dei segreti sostituisce le password del database ogni sette giorni senza alcun downtime dell'applicazione.",
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Dynamic Secret',
              italian: 'Segreto dinamico',
              pronunciation: '/daɪˈnæmɪk ˈsiːkrɪt/',
              phonetic: 'dai-NA-mik SI-kret',
              example:
                'HashiCorp Vault issues a dynamic secret for each database session that is automatically revoked after its TTL expires. = HashiCorp Vault emette un segreto dinamico per ogni sessione database che viene automaticamente revocato dopo la scadenza del suo TTL.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'Vault dynamic secrets',
            },
            {
              english: 'Short-Lived Credential',
              italian: 'Credenziale a breve durata',
              pronunciation: '/ʃɔːt lɪvd krɪˈdɛnʃəl/',
              phonetic: 'SHORT-LIVD kri-DEN-scial',
              example:
                'Issuing a short-lived credential that expires in fifteen minutes limits the damage window if it is intercepted. = Emettere una credenziale a breve durata che scade in quindici minuti limita la finestra di danno se viene intercettata.',
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Just-in-Time Access',
              italian: 'Accesso just-in-time',
              pronunciation: '/dʒʌst ɪn taɪm ˈæksɛs/',
              phonetic: 'GIAST-IN-TAIM AK-ses',
              example:
                "With just-in-time access, engineers receive production privileges only during an approved maintenance window. = Con l'accesso just-in-time, gli ingegneri ricevono privilegi di produzione solo durante una finestra di manutenzione approvata.",
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Workload Identity',
              italian: 'Identità del workload',
              pronunciation: '/ˈwɜːkləʊd aɪˈdɛntəti/',
              phonetic: 'UORK-loud ai-DEN-te-ti',
              example:
                "Using workload identity federation, the Kubernetes pod authenticates to GCP without storing any service account key file. = Usando la federazione di identità del workload, il pod Kubernetes si autentica a GCP senza memorizzare alcun file di chiave dell'account di servizio.",
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'GCP Workload Identity, IRSA',
            },
            {
              english: 'IRSA',
              italian: 'IAM Roles for Service Accounts',
              pronunciation: '/ˈɜːsə/',
              phonetic: 'IR-sa',
              example:
                "Configuring IRSA for EKS pods eliminates the need for long-lived AWS credentials inside the cluster. = Configurare IRSA per i pod EKS elimina la necessità di credenziali AWS a lunga durata all'interno del cluster.",
              context: 'secrets',
              difficulty: 'intermediate',
              note: 'IAM Roles for Service Accounts (AWS EKS).',
            },
            {
              english: 'Envelope Encryption',
              italian: 'Cifratura a busta',
              pronunciation: '/ˈɛnvələʊp ɪnˈkrɪpʃən/',
              phonetic: 'EN-ve-loup in-KRIP-scion',
              example:
                'With envelope encryption, a data encryption key encrypts the payload while a master key in KMS protects the data key itself. = Con la crittografia a busta, una chiave di crittografia dei dati cifra il payload mentre una chiave master in KMS protegge la chiave dati stessa.',
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Secret Injection',
              italian: 'Iniezione di segreti',
              pronunciation: '/ˈsiːkrɪt ɪnˈdʒɛkʃən/',
              phonetic: 'SI-kret in-GEK-scion',
              example:
                "The init container handles secret injection by fetching credentials from Vault and writing them to a shared memory volume. = Il container init gestisce l'iniezione dei segreti recuperando le credenziali da Vault e scrivendole in un volume di memoria condiviso.",
              context: 'secrets',
              difficulty: 'intermediate',
            },
            {
              english: 'Vault Agent',
              italian: 'Agente Vault',
              pronunciation: '/vɔːlt ˈeɪdʒənt/',
              phonetic: 'VOLT EI-gent',
              example:
                'A sidecar Vault Agent automatically renews leases and re-renders templates when secrets rotate. = Un sidecar Vault Agent rinnova automaticamente i lease e rigenera i template quando i segreti ruotano.',
              context: 'secrets',
              difficulty: 'intermediate',
              tool: 'Vault Agent',
            },
            {
              english: 'Break-Glass Procedure',
              italian: 'Procedura break-glass',
              pronunciation: '/breɪk ɡlɑːs prəˈsiːdʒə/',
              phonetic: 'BREIK-GLAS pro-SI-ger',
              example:
                'The break-glass procedure grants emergency admin access but logs every action and triggers an automatic audit review. = La procedura di break-glass concede accesso admin di emergenza ma registra ogni azione e attiva una revisione di audit automatica.',
              context: 'secrets',
              difficulty: 'intermediate',
              note: '"Rompere il vetro": accesso eccezionale audited.',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 5 - DAST / DYNAMIC SECURITY TESTING
    // ════════════════════════════════════════════════
    5: {
      name: 'Test Dinamico di Sicurezza / Dynamic Security Testing',
      description: 'DAST, fuzzing e penetration testing in CI',
      lessons: [
        {
          id: 'dso_dast_1',
          title: 'DAST Fundamentals / Fondamenti DAST',
          description: 'Test dinamico delle applicazioni',
          items: [
            {
              english: 'DAST',
              italian: 'Test di sicurezza dinamico',
              pronunciation: '/dæst/',
              phonetic: 'DAST',
              example:
                "Running DAST against the staging environment revealed an exposed admin panel that SAST had completely missed. = Eseguire DAST sull'ambiente di staging ha rivelato un pannello admin esposto che la SAST aveva completamente mancato.",
              context: 'dast',
              difficulty: 'intermediate',
              note: 'Dynamic Application Security Testing.',
            },
            {
              english: 'Black Box Testing',
              italian: 'Test a scatola nera',
              pronunciation: '/blæk bɒks ˈtɛstɪŋ/',
              phonetic: 'BLAK-BOX TES-ting',
              example:
                "During black box testing, the consultant discovered the API returned verbose error messages leaking internal paths. = Durante il black box testing, il consulente ha scoperto che l'API restituiva messaggi di errore verbosi che rivelavano percorsi interni.",
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Crawler',
              italian: 'Spider che scansiona il sito (crawler)',
              pronunciation: '/ˈkrɔːlər/',
              phonetic: 'KRO-ler',
              example:
                'The DAST crawler automatically discovered forty-seven hidden endpoints that were not documented in the OpenAPI spec. = Il crawler DAST ha scoperto automaticamente quarantasette endpoint nascosti non documentati nella specifica OpenAPI.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Attack Vector',
              italian: 'Vettore di attacco',
              pronunciation: '/əˈtæk ˈvɛktər/',
              phonetic: 'a-TAK VEK-ter',
              example:
                "The report identified an unauthenticated REST endpoint as the primary attack vector for privilege escalation. = Il report ha identificato un endpoint REST non autenticato come il principale vettore di attacco per l'escalation dei privilegi.",
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Payload',
              italian: "Corpo dell'attacco (payload)",
              pronunciation: '/ˈpeɪləʊd/',
              phonetic: 'PEI-loud',
              example:
                "The pentester crafted a JSON payload that bypassed input validation and triggered a server-side template injection. = Il pentester ha costruito un payload JSON che aggirava la validazione dell'input e attivava un'iniezione di template lato server.",
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Active Scan',
              italian: 'Scansione attiva',
              pronunciation: '/ˈæktɪv skæn/',
              phonetic: 'AK-tiv SKAN',
              example:
                'An active scan sends real attack requests, so it should only run against staging environments with production-like data. = Una scansione attiva invia richieste di attacco reali, quindi dovrebbe essere eseguita solo su ambienti di staging con dati simili alla produzione.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Passive Scan',
              italian: 'Scansione passiva',
              pronunciation: '/ˈpæsɪv skæn/',
              phonetic: 'PAS-siv SKAN',
              example:
                'The passive scan analyzed traffic captured by the proxy and found missing security headers on thirty endpoints. = La scansione passiva ha analizzato il traffico catturato dal proxy e ha trovato header di sicurezza mancanti su trenta endpoint.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Authenticated Scan',
              italian: 'Scansione autenticata',
              pronunciation: '/ɔːˈθɛntɪkeɪtɪd skæn/',
              phonetic: 'o-TEN-ti-kei-ted SKAN',
              example:
                'Switching from anonymous to authenticated scan mode uncovered IDOR vulnerabilities behind the login wall. = Passare dalla modalità anonima a quella di scansione autenticata ha scoperto vulnerabilità IDOR dietro la parete di login.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'API Scan',
              italian: 'Scansione API',
              pronunciation: '/eɪ piː aɪ skæn/',
              phonetic: 'EI-PI-AI SKAN',
              example:
                'Importing the OpenAPI spec into ZAP enabled a targeted API scan that found broken object level authorization in three routes. = Importare la specifica OpenAPI in ZAP ha abilitato una scansione API mirata che ha trovato autorizzazione a livello di oggetto non funzionante in tre route.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Spider',
              italian: 'Esplorazione automatica delle pagine (spider)',
              pronunciation: '/ˈspaɪdər/',
              phonetic: 'SPAI-der',
              example:
                'Before launching the active scan, the spider maps every reachable page and form to build a complete site tree. = Prima di lanciare la scansione attiva, lo spider mappa ogni pagina e form raggiungibile per costruire un albero completo del sito.',
              context: 'dast',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_dast_2',
          title: 'DAST Tools / Strumenti DAST',
          description: 'OWASP ZAP, Burp Suite e altri',
          items: [
            {
              english: 'OWASP ZAP',
              italian: 'OWASP ZAP (proxy DAST open source)',
              pronunciation: '/ˈəʊwɒsp zæp/',
              phonetic: 'O-uosp ZAP',
              example:
                'Integrating OWASP ZAP into the nightly CI pipeline automatically tests every new endpoint for common vulnerabilities. = Integrare OWASP ZAP nella pipeline CI notturna testa automaticamente ogni nuovo endpoint per vulnerabilità comuni.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'OWASP ZAP',
              command: 'zap-baseline.py -t https://target',
            },
            {
              english: 'Burp Suite',
              italian: 'Burp Suite (proxy di test sicurezza web)',
              pronunciation: '/bɜːp swiːt/',
              phonetic: 'BERP SUIT',
              example:
                'The security consultant used Burp Suite to intercept API traffic and modify JWT claims to test authorization logic. = Il consulente di sicurezza ha usato Burp Suite per intercettare il traffico API e modificare i claim JWT per testare la logica di autorizzazione.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'Burp Suite',
            },
            {
              english: 'Nuclei',
              italian: 'Nuclei (scanner di vulnerabilità a template)',
              pronunciation: '/ˈnjuːkliaɪ/',
              phonetic: 'NIU-klei',
              example:
                "Writing custom Nuclei templates lets the team scan for organization-specific misconfigurations across all subdomains. = Scrivere template Nuclei personalizzati permette al team di scansionare misconfigurazioni specifiche dell'organizzazione su tutti i sottodomini.",
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'Nuclei',
              command: 'nuclei -u https://target -t cves/',
            },
            {
              english: 'Nikto',
              italian: 'Nikto (scanner web legacy)',
              pronunciation: '/ˈnɪktəʊ/',
              phonetic: 'NIK-to',
              example:
                'A quick Nikto scan of the web server detected outdated Apache modules with known remote code execution flaws. = Una scansione rapida Nikto del server web ha rilevato moduli Apache obsoleti con falle note di esecuzione di codice remoto.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'Nikto',
              command: 'nikto -h target',
            },
            {
              english: 'Acunetix',
              italian: 'Acunetix (DAST commerciale)',
              pronunciation: '/ækjuːˈnɛtɪks/',
              phonetic: 'a-kiu-NE-tiks',
              example:
                'The enterprise license for Acunetix lets us schedule weekly scans across all customer-facing web applications. = La licenza enterprise di Acunetix ci permette di programmare scansioni settimanali su tutte le applicazioni web rivolte ai clienti.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'Acunetix',
            },
            {
              english: 'Netsparker',
              italian: 'Netsparker (DAST commerciale, ora Invicti)',
              pronunciation: '/ˈnɛtˌspɑːkə/',
              phonetic: 'NET-spar-ker',
              example:
                'After configuring login macros, Netsparker reached authenticated areas and found stored XSS in the user profile page. = Dopo aver configurato le macro di login, Netsparker ha raggiunto le aree autenticate e ha trovato XSS persistente nella pagina del profilo utente.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'Netsparker (Invicti)',
            },
            {
              english: 'Wapiti',
              italian: 'Wapiti (DAST open source)',
              pronunciation: '/wəˈpiːti/',
              phonetic: 'ua-PI-ti',
              example:
                "The open-source scanner Wapiti detected a blind SQL injection on the search endpoint that commercial tools had overlooked. = Lo scanner open-source Wapiti ha rilevato una SQL injection cieca sull'endpoint di ricerca che gli strumenti commerciali avevano trascurato.",
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'Wapiti',
              command: 'wapiti -u https://target',
            },
            {
              english: 'sqlmap',
              italian: 'Strumento automatico di SQL injection (sqlmap)',
              pronunciation: '/ˈɛs kjuː ɛl mæp/',
              phonetic: 'ES-KIU-EL MAP',
              example:
                "Using sqlmap with the tamper scripts enabled, the pentester extracted the admin password hash through a time-based blind injection. = Usando sqlmap con gli script tamper abilitati, il pentester ha estratto l'hash della password admin tramite un'iniezione cieca basata sul tempo.",
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'sqlmap',
              command: 'sqlmap -u "https://target?id=1"',
            },
            {
              english: 'Arachni',
              italian: 'Arachni (DAST modulare in Ruby)',
              pronunciation: '/əˈræknɪ/',
              phonetic: 'a-RAK-ni',
              example:
                'The Arachni report grouped all findings by severity and provided fix suggestions for each detected vulnerability. = Il report di Arachni ha raggruppato tutti i finding per severità e ha fornito suggerimenti di fix per ogni vulnerabilità rilevata.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'Arachni',
            },
            {
              english: 'Stackhawk',
              italian: 'StackHawk (DAST integrato in CI)',
              pronunciation: '/ˈstækhɔːk/',
              phonetic: 'STAK-hok',
              example:
                'Adding StackHawk to the GitHub Actions workflow gives developers DAST feedback directly in their pull request comments. = Aggiungere StackHawk al workflow GitHub Actions dà agli sviluppatori feedback DAST direttamente nei commenti delle pull request.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'StackHawk',
            },
          ],
        },
        {
          id: 'dso_dast_3',
          title: 'Fuzzing / Fuzzing',
          description: 'Test con input casuali',
          items: [
            {
              english: 'Fuzzing',
              italian: 'Test con input casuali (fuzzing)',
              pronunciation: '/ˈfʌzɪŋ/',
              phonetic: 'FA-zing',
              example:
                "Continuous fuzzing with randomized inputs discovered a heap corruption bug that manual testing had never triggered. = Il fuzzing continuo con input casuali ha scoperto un bug di corruzione dell'heap che il testing manuale non aveva mai attivato.",
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Fuzzer',
              italian: 'Strumento di fuzzing (fuzzer)',
              pronunciation: '/ˈfʌzər/',
              phonetic: 'FA-zer',
              example:
                "The coverage-guided fuzzer generated over one million test cases in an hour and found three unique crash paths. = Il fuzzer guidato dalla copertura ha generato oltre un milione di test case in un'ora e ha trovato tre percorsi di crash unici.",
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'AFL++',
              italian: 'AFL++ (fuzzer evolutivo)',
              pronunciation: '/eɪ ɛf ɛl plʌs plʌs/',
              phonetic: 'EI-EF-EL PLAS PLAS',
              example:
                'Instrumenting the parser with AFL++ revealed a memory corruption vulnerability that existed since the first release. = Instrumentare il parser con AFL++ ha rivelato una vulnerabilità di corruzione della memoria presente sin dalla prima release.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'AFL++',
            },
            {
              english: 'libFuzzer',
              italian: 'libFuzzer (fuzzer in-process LLVM)',
              pronunciation: '/lɪb ˈfʌzər/',
              phonetic: 'LIB-FA-zer',
              example:
                'We wrote a libFuzzer harness for the JSON parsing function to test edge cases that unit tests could not cover. = Abbiamo scritto un harness libFuzzer per la funzione di parsing JSON per testare casi limite che gli unit test non potevano coprire.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'libFuzzer',
            },
            {
              english: 'go-fuzz',
              italian: 'go-fuzz (fuzzer per Go)',
              pronunciation: '/ɡəʊ fʌz/',
              phonetic: 'GO-FAZ',
              example:
                "Running go-fuzz on the TLS handshake code uncovered a panic triggered by a malformed certificate chain. = Eseguire go-fuzz sul codice dell'handshake TLS ha scoperto un panic causato da una catena di certificati malformata.",
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'go-fuzz',
              command: 'go test -fuzz=Fuzz',
            },
            {
              english: 'OSS-Fuzz',
              italian: 'OSS-Fuzz (fuzzing continuo Google open source)',
              pronunciation: '/ɒs ɛs fʌz/',
              phonetic: 'OS-ES FAZ',
              example:
                "Submitting the library to OSS-Fuzz provides continuous fuzzing backed by Google's infrastructure at no cost. = Sottoporre la libreria a OSS-Fuzz fornisce fuzzing continuo supportato dall'infrastruttura di Google senza alcun costo.",
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'OSS-Fuzz',
            },
            {
              english: 'Coverage-Guided Fuzzing',
              italian: 'Fuzzing guidato dalla copertura',
              pronunciation: '/ˈkʌvərɪdʒ ɡaɪdɪd ˈfʌzɪŋ/',
              phonetic: 'KA-ve-rigg GAI-ded FA-zing',
              example:
                'With coverage-guided fuzzing, the tool mutates inputs to reach new code branches, maximizing vulnerability discovery. = Con il fuzzing guidato dalla copertura, lo strumento muta gli input per raggiungere nuovi rami di codice, massimizzando la scoperta di vulnerabilità.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Crash',
              italian: 'Arresto del programma (crash)',
              pronunciation: '/kræʃ/',
              phonetic: 'KRASH',
              example:
                'Every crash discovered by the fuzzer is automatically deduplicated, triaged, and filed as a security bug. = Ogni crash scoperto dal fuzzer viene automaticamente deduplicato, classificato e archiviato come bug di sicurezza.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Corpus',
              italian: 'Insieme di input di partenza (corpus)',
              pronunciation: '/ˈkɔːpəs/',
              phonetic: 'KOR-pus',
              example:
                'Seeding the fuzzer with a high-quality corpus of real protocol messages dramatically accelerates code coverage growth. = Popolare il fuzzer con un corpus di alta qualità di messaggi di protocollo reali accelera drasticamente la crescita della copertura del codice.',
              context: 'dast',
              difficulty: 'intermediate',
              note: 'Insieme di input seed iniziali.',
            },
            {
              english: 'Sanitizer',
              italian: 'Strumento rilevazione errori a runtime (sanitizer)',
              pronunciation: '/ˈsænɪtaɪzər/',
              phonetic: 'SA-ni-tai-zer',
              example:
                'Compiling with AddressSanitizer enabled, the sanitizer caught an out-of-bounds read that the fuzzer triggered. = Compilando con AddressSanitizer abilitato, il sanitizer ha intercettato una lettura fuori dai limiti attivata dal fuzzer.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'ASan, MSan, UBSan',
            },
          ],
        },
        {
          id: 'dso_dast_4',
          title: 'Pen Testing in CI / Pen Test in CI',
          description: 'Penetration testing automatizzato',
          items: [
            {
              english: 'Penetration Testing',
              italian: 'Test di penetrazione',
              pronunciation: '/ˌpɛnɪˈtreɪʃən ˈtɛstɪŋ/',
              phonetic: 'pe-ni-TREI-scion TES-ting',
              example:
                'Annual penetration testing revealed that the VPN concentrator still accepted deprecated TLS 1.0 connections. = Il penetration testing annuale ha rivelato che il concentratore VPN accettava ancora connessioni TLS 1.0 deprecate.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Pen Test',
              italian: 'Penetration test (pen test)',
              pronunciation: '/pɛn tɛst/',
              phonetic: 'PEN TEST',
              example:
                'The external pen test confirmed that the rate-limiting controls effectively blocked brute-force login attempts. = Il pen test esterno ha confermato che i controlli di rate-limiting bloccavano efficacemente i tentativi di login brute-force.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Reconnaissance',
              italian: 'Ricognizione',
              pronunciation: '/rɪˈkɒnɪsəns/',
              phonetic: 'ri-KO-ni-sans',
              example:
                'During the reconnaissance phase, the tester used Shodan to discover forgotten development servers exposed to the internet. = Durante la fase di ricognizione, il tester ha usato Shodan per scoprire server di sviluppo dimenticati esposti su internet.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Exploitation',
              italian: 'Sfruttamento',
              pronunciation: '/ˌɛksplɔɪˈteɪʃən/',
              phonetic: 'eks-ploi-TEI-scion',
              example:
                'After finding the SQL injection, the exploitation phase demonstrated full database access and data exfiltration. = Dopo aver trovato la SQL injection, la fase di exploitation ha dimostrato accesso completo al database ed esfiltrazione dei dati.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Post-Exploitation',
              italian: 'Post-sfruttamento',
              pronunciation: '/pəʊst ˌɛksplɔɪˈteɪʃən/',
              phonetic: 'POUST eks-ploi-TEI-scion',
              example:
                'In the post-exploitation phase, the red team achieved lateral movement to three additional internal servers. = Nella fase di post-exploitation, il red team ha ottenuto movimento laterale verso tre server interni aggiuntivi.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Continuous Pen Testing',
              italian: 'Pen testing continuo',
              pronunciation: '/kənˈtɪnjʊəs pɛn ˈtɛstɪŋ/',
              phonetic: 'kon-TI-nius PEN TES-ting',
              example:
                'Switching to continuous pen testing lets the team validate security fixes within days instead of waiting for annual engagements. = Passare al pen testing continuo permette al team di validare i fix di sicurezza in pochi giorni invece di aspettare gli impegni annuali.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Bug Bounty',
              italian: 'Ricompensa per segnalazione bug (bug bounty)',
              pronunciation: '/bʌɡ ˈbaʊnti/',
              phonetic: 'BAG BAUN-ti',
              example:
                'Launching a public bug bounty program attracted researchers who found three critical flaws the internal team had missed. = Lanciare un programma di bug bounty pubblico ha attratto ricercatori che hanno trovato tre falle critiche che il team interno aveva mancato.',
              context: 'dast',
              difficulty: 'intermediate',
              tool: 'HackerOne, Bugcrowd',
            },
            {
              english: 'Scope',
              italian: 'Ambito',
              pronunciation: '/skəʊp/',
              phonetic: 'SKOUP',
              example:
                "Defining a clear scope for the engagement prevents testers from accidentally disrupting production services. = Definire uno scope chiaro per l'impegno impedisce ai tester di interrompere accidentalmente i servizi in produzione.",
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Out of Scope',
              italian: 'Fuori ambito',
              pronunciation: '/aʊt əv skəʊp/',
              phonetic: 'AUT-ov-SKOUP',
              example:
                'The client marked third-party payment integrations as out of scope because they are managed by an external vendor. = Il cliente ha segnato le integrazioni di pagamento di terze parti come fuori scope perché sono gestite da un fornitore esterno.',
              context: 'dast',
              difficulty: 'intermediate',
            },
            {
              english: 'Pentest Report',
              italian: 'Report di pentest',
              pronunciation: '/ˈpɛntɛst rɪˈpɔːt/',
              phonetic: 'PEN-test ri-PORT',
              example:
                'The pentest report included a severity-ranked list of findings with reproduction steps and remediation recommendations. = Il report del pentest includeva un elenco di finding ordinato per severità con passi di riproduzione e raccomandazioni di remediation.',
              context: 'dast',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 6 - CONTAINER SECURITY
    // ════════════════════════════════════════════════
    6: {
      name: 'Sicurezza dei Container / Container Security',
      description: 'Image scanning, hardening e runtime',
      lessons: [
        {
          id: 'dso_container_security_1',
          title: 'Image Scanning / Scansione Immagini',
          description: 'Trovare vulnerabilità nelle immagini',
          items: [
            {
              english: 'Container Image',
              italian: 'Immagine container',
              pronunciation: '/kənˈteɪnər ˈɪmɪdʒ/',
              phonetic: 'kon-TEI-ner I-migg',
              example:
                'Scanning every container image before deployment prevents known-vulnerable packages from reaching production. = Scansionare ogni immagine container prima del deployment impedisce ai pacchetti con vulnerabilità note di raggiungere la produzione.',
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Image Scanning',
              italian: 'Scansione immagini',
              pronunciation: '/ˈɪmɪdʒ ˈskænɪŋ/',
              phonetic: 'I-migg SKA-ning',
              example:
                'Automated image scanning runs on every push to the container registry, flagging any CVE above medium severity. = La scansione automatica delle immagini gira a ogni push nel container registry, segnalando qualsiasi CVE sopra la severità media.',
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Trivy',
              italian: 'Trivy (scanner di vulnerabilità Aqua)',
              pronunciation: '/ˈtrɪvi/',
              phonetic: 'TRI-vi',
              example:
                'Adding Trivy to the CI pipeline catches OS package and language library vulnerabilities in under thirty seconds. = Aggiungere Trivy alla pipeline CI intercetta vulnerabilità dei pacchetti OS e delle librerie in meno di trenta secondi.',
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Trivy',
              command: 'trivy image nginx:latest',
            },
            {
              english: 'Grype',
              italian: 'Grype (scanner di vulnerabilità immagini)',
              pronunciation: '/ɡraɪp/',
              phonetic: 'GRAIP',
              example:
                'Pairing Grype with Syft creates a pipeline where images are catalogued and then scanned for vulnerabilities automatically. = Abbinare Grype a Syft crea una pipeline dove le immagini vengono catalogate e poi scansionate per vulnerabilità automaticamente.',
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Grype',
              command: 'grype docker.io/myapp:1.0',
            },
            {
              english: 'Clair',
              italian: 'Clair (scanner immagini Quay/Red Hat)',
              pronunciation: '/kleər/',
              phonetic: 'KLER',
              example:
                'The on-premises Quay registry uses Clair to scan every layer of each uploaded container image for known CVEs. = Il registry Quay on-premises usa Clair per scansionare ogni layer di ogni immagine container caricata alla ricerca di CVE note.',
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Clair',
            },
            {
              english: 'Anchore',
              italian: 'Anchore (piattaforma sicurezza container)',
              pronunciation: '/ˈæŋkɔːr/',
              phonetic: 'AN-kor',
              example:
                'Setting up Anchore policy bundles ensures that only images meeting compliance requirements enter the approved registry. = Configurare i bundle di policy Anchore assicura che solo le immagini che soddisfano i requisiti di compliance entrino nel registry approvato.',
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Anchore',
            },
            {
              english: 'Layer',
              italian: 'Strato di immagine container (layer)',
              pronunciation: '/ˈleɪər/',
              phonetic: 'LE-ier',
              example:
                "Each layer in a Docker image inherits the previous one, so a vulnerable base image affects every layer above it. = Ogni layer in un'immagine Docker eredita quello precedente, quindi un'immagine base vulnerabile colpisce ogni layer sopra di essa.",
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Vulnerability Database',
              italian: 'Database di vulnerabilità',
              pronunciation: '/ˌvʌlnərəˈbɪləti ˈdeɪtəbeɪs/',
              phonetic: 'val-ne-ra-BI-li-ti DEI-ta-beis',
              example:
                'Grype checks every installed package against the public vulnerability database and flags any match above medium severity. = Grype controlla ogni pacchetto installato contro il database di vulnerabilità pubblico e segnala qualsiasi corrispondenza sopra la severità media.',
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Severity Threshold',
              italian: 'Soglia di gravità',
              pronunciation: '/sɪˈvɛrəti ˈθrɛʃhəʊld/',
              phonetic: 'si-VE-re-ti TRESH-old',
              example:
                "We configured the admission controller to block any image with findings above the severity threshold of high. = Abbiamo configurato l'admission controller per bloccare qualsiasi immagine con finding sopra la soglia di severità alta.",
              context: 'container-security',
              difficulty: 'intermediate',
              command: 'trivy image --severity HIGH,CRITICAL --exit-code 1 app',
            },
            {
              english: 'Image Digest',
              italian: "Digest dell'immagine",
              pronunciation: '/ˈɪmɪdʒ ˈdaɪdʒɛst/',
              phonetic: 'I-migg DAI-gest',
              example:
                'Referencing containers by image digest instead of mutable tags guarantees the exact same binary runs every time. = Referenziare i container per image digest invece che per tag mutabili garantisce che lo stesso identico binario giri ogni volta.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              code: 'nginx@sha256:abc123...',
            },
          ],
        },
        {
          id: 'dso_container_security_2',
          title: 'Image Hardening / Hardening Immagini',
          description: 'Costruire immagini minime e sicure',
          items: [
            {
              english: 'Base Image',
              italian: 'Immagine base',
              pronunciation: '/beɪs ˈɪmɪdʒ/',
              phonetic: 'BEIS I-migg',
              example:
                "Switching to an official hardened base image reduced the total vulnerability count from eighty-seven to four. = Passare a un'immagine base ufficiale rinforzata ha ridotto il conteggio totale delle vulnerabilità da ottantasette a quattro.",
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Distroless',
              italian: 'Immagini senza shell e package manager (Distroless)',
              pronunciation: '/dɪstrəˈlɛs/',
              phonetic: 'di-STRO-les',
              example:
                "Using a Distroless image eliminates the shell and package manager, drastically reducing the container attack surface. = Usare un'immagine Distroless elimina la shell e il package manager, riducendo drasticamente la superficie di attacco del container.",
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Google distroless',
              code: 'FROM gcr.io/distroless/static',
            },
            {
              english: 'Alpine',
              italian: 'Distro Linux minimale (Alpine)',
              pronunciation: '/ˈælpaɪn/',
              phonetic: 'AL-pain',
              example:
                "Building on Alpine Linux keeps the final image under ten megabytes while still providing a minimal package manager. = Costruire su Alpine Linux mantiene l'immagine finale sotto i dieci megabyte fornendo comunque un package manager minimale.",
              context: 'container-security',
              difficulty: 'intermediate',
              code: 'FROM alpine:3.20',
            },
            {
              english: 'Multi-Stage Build',
              italian: 'Build multi-stage',
              pronunciation: '/ˈmʌlti steɪdʒ bɪld/',
              phonetic: 'MAL-ti STEIGG BILD',
              example:
                "A multi-stage build compiles the Go binary in a full SDK image and copies only the binary into a scratch container. = Una build multi-stage compila il binario Go in un'immagine SDK completa e copia solo il binario in un container scratch.",
              context: 'container-security',
              difficulty: 'intermediate',
              code: 'FROM golang AS builder\nFROM alpine AS runtime',
            },
            {
              english: 'Non-Root User',
              italian: 'Utente non root',
              pronunciation: '/nɒn ruːt ˈjuːzər/',
              phonetic: 'NON-RUT IU-zer',
              example:
                "Running the application as a non-root user inside the container limits the damage from a container escape exploit. = Eseguire l'applicazione come utente non-root dentro il container limita i danni da un exploit di escape dal container.",
              context: 'container-security',
              difficulty: 'intermediate',
              code: 'USER 1001',
            },
            {
              english: 'Read-Only Root FS',
              italian: 'Filesystem root in sola lettura',
              pronunciation: '/riːd ˈəʊnli ruːt/',
              phonetic: 'RID-ON-li RUT',
              example:
                'Setting a read-only root filesystem prevents malware from writing executable payloads to the container disk. = Impostare un filesystem root in sola lettura impedisce al malware di scrivere payload eseguibili sul disco del container.',
              context: 'container-security',
              difficulty: 'intermediate',
              code: 'readOnlyRootFilesystem: true',
            },
            {
              english: 'Drop Capabilities',
              italian: 'Rimuovi capabilities',
              pronunciation: '/drɒp ˌkeɪpəˈbɪlətiz/',
              phonetic: 'DROP kei-pa-BI-li-tis',
              example:
                'The Dockerfile drops all Linux capabilities and then adds back only NET_BIND_SERVICE for port eighty. = Il Dockerfile rimuove tutte le capability Linux e poi aggiunge solo NET_BIND_SERVICE per la porta ottanta.',
              context: 'container-security',
              difficulty: 'intermediate',
              code: 'capabilities:\n  drop: [ALL]',
            },
            {
              english: 'No New Privileges',
              italian: 'Nessun nuovo privilegio',
              pronunciation: '/nəʊ njuː ˈprɪvəlɪdʒɪz/',
              phonetic: 'NOU-NIU PRI-vi-leggs',
              example:
                'Setting the no new privileges flag prevents any process inside the container from gaining additional permissions via setuid. = Impostare il flag no new privileges impedisce a qualsiasi processo dentro il container di ottenere permessi aggiuntivi tramite setuid.',
              context: 'container-security',
              difficulty: 'intermediate',
              code: 'allowPrivilegeEscalation: false',
            },
            {
              english: 'Minimal Image',
              italian: 'Immagine minimale',
              pronunciation: '/ˈmɪnɪml ˈɪmɪdʒ/',
              phonetic: 'MI-ni-mal I-migg',
              example:
                "Trimming unused packages from the minimal image reduced the CVE count from thirty-two to zero critical findings. = Rimuovere i pacchetti inutilizzati dall'immagine minimale ha ridotto il conteggio CVE da trentadue a zero finding critici.",
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Wolfi',
              italian: 'Distro Linux per container sicuri (Wolfi)',
              pronunciation: '/ˈwɒlfi/',
              phonetic: 'UOL-fi',
              example:
                "Migrating to Wolfi as the base image provided glibc compatibility while maintaining a near-zero CVE footprint. = Migrare a Wolfi come immagine base ha fornito compatibilità glibc mantenendo un'impronta CVE quasi zero.",
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Chainguard Wolfi',
            },
          ],
        },
        {
          id: 'dso_container_security_3',
          title: 'Runtime & Registry / Runtime e Registry',
          description: 'Sicurezza in esecuzione e nei registry',
          items: [
            {
              english: 'Container Registry',
              italian: 'Registry di container',
              pronunciation: '/kənˈteɪnə ˈrɛdʒɪstri/',
              phonetic: 'kon-TEI-ner RE-gi-stri',
              example:
                'Our private container registry requires image signing and vulnerability scanning before accepting any push. = Il nostro container registry privato richiede la firma delle immagini e la scansione delle vulnerabilità prima di accettare qualsiasi push.',
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Harbor, ECR, Artifactory',
            },
            {
              english: 'Image Signing',
              italian: "Firma dell'immagine",
              pronunciation: '/ˈɪmɪdʒ ˈsaɪnɪŋ/',
              phonetic: 'I-migg SAI-ning',
              example:
                'Enforcing image signing with cosign ensures that only images built by our CI pipeline run in production. = Imporre la firma delle immagini con cosign assicura che solo le immagini costruite dalla nostra pipeline CI girino in produzione.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'cosign',
              command: 'cosign sign myregistry/app:1.0',
            },
            {
              english: 'Cosign',
              italian: 'Cosign (firma di immagini container)',
              pronunciation: '/ˈkəʊsaɪn/',
              phonetic: 'KO-sain',
              example:
                'We use Cosign to sign every container image after the security scan passes in the CI pipeline. = Usiamo Cosign per firmare ogni immagine container dopo che la scansione di sicurezza passa nella pipeline CI.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'Cosign (Sigstore)',
              command: 'cosign verify --key cosign.pub myimage',
            },
            {
              english: 'Notary',
              italian: 'Firma artefatti Docker (Notary)',
              pronunciation: '/ˈnəʊtəri/',
              phonetic: 'NO-ta-ri',
              example:
                "Docker Content Trust uses Notary to verify that the image you pull was actually signed by the trusted publisher. = Docker Content Trust usa Notary per verificare che l'immagine scaricata sia stata effettivamente firmata dall'editore fidato.",
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'Notary',
            },
            {
              english: 'Admission Controller',
              italian: 'Controllore di ammissione',
              pronunciation: '/ədˈmɪʃən kənˈtrəʊlər/',
              phonetic: 'ad-MI-scion kon-TRO-ler',
              example:
                "The Kubernetes admission controller rejects any pod spec that references an unsigned or unscanned container image. = L'admission controller Kubernetes rifiuta qualsiasi specifica pod che referenzi un'immagine container non firmata o non scansionata.",
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Runtime Security',
              italian: 'Sicurezza a runtime',
              pronunciation: '/ˈrʌntaɪm sɪˈkjʊərəti/',
              phonetic: 'RAN-taim si-KIU-ri-ti',
              example:
                "Deploying a runtime security agent detects anomalous syscalls like unexpected shell spawning inside production containers. = Distribuire un agente di runtime security rileva syscall anomale come l'avvio inaspettato di shell dentro i container in produzione.",
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Falco, Tetragon',
            },
            {
              english: 'Falco',
              italian: 'Falco (rilevatore eventi runtime cloud-native)',
              pronunciation: '/ˈfælkəʊ/',
              phonetic: 'FAL-ko',
              example:
                'When a container spawns an unexpected shell process, Falco generates a high-priority alert within milliseconds. = Quando un container avvia un processo shell inaspettato, Falco genera un avviso ad alta priorità in pochi millisecondi.',
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Falco',
            },
            {
              english: 'Container Escape',
              italian: 'Fuga dal container',
              pronunciation: '/kənˈteɪnə ɪˈskeɪp/',
              phonetic: 'kon-TEI-ner i-SKEIP',
              example:
                'Running containers with minimal privileges and no new privileges flags significantly reduces container escape risk. = Eseguire container con privilegi minimi e flag no new privileges riduce significativamente il rischio di escape dal container.',
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Privileged Container',
              italian: 'Container privilegiato',
              pronunciation: '/ˈprɪvəlɪdʒd kənˈteɪnə/',
              phonetic: 'PRI-vi-leggd kon-TEI-ner',
              example:
                "Never deploy a privileged container in production because it has full access to the host kernel and devices. = Non deployare mai un container privilegiato in produzione perché ha accesso completo al kernel e ai dispositivi dell'host.",
              context: 'container-security',
              difficulty: 'intermediate',
              note: "privileged: true equivale a root sull'host.",
            },
            {
              english: 'Image Pull Policy',
              italian: 'Policy di pull immagine',
              pronunciation: '/ˈɪmɪdʒ pʊl ˈpɒləsi/',
              phonetic: 'I-migg PUL PO-li-si',
              example:
                "Setting the image pull policy to Always ensures Kubernetes fetches the latest scanned version on every pod restart. = Impostare la policy di pull dell'immagine su Always assicura che Kubernetes scarichi l'ultima versione scansionata a ogni riavvio del pod.",
              context: 'container-security',
              difficulty: 'intermediate',
              code: 'imagePullPolicy: Always',
            },
          ],
        },
        {
          id: 'dso_container_security_4',
          title: 'Container CI Integration / Integrazione CI Container',
          description: 'Integrare scansioni in pipeline',
          items: [
            {
              english: 'Build-Time Scan',
              italian: 'Scansione in fase di build',
              pronunciation: '/bɪld taɪm skæn/',
              phonetic: 'BILD-TAIM SKAN',
              example:
                "Running a build-time scan inside the Dockerfile RUN step catches vulnerabilities before the image even leaves CI. = Eseguire una scansione a tempo di build dentro lo step RUN del Dockerfile intercetta vulnerabilità prima che l'immagine lasci la CI.",
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Registry Scan',
              italian: 'Scansione del registry',
              pronunciation: '/ˈrɛdʒɪstri skæn/',
              phonetic: 'RE-gi-stri SKAN',
              example:
                'A scheduled registry scan re-evaluates stored images every night against newly published vulnerability databases. = Una scansione del registry pianificata rivaluta le immagini memorizzate ogni notte contro i database di vulnerabilità appena pubblicati.',
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Continuous Image Scanning',
              italian: 'Scansione continua delle immagini',
              pronunciation: '/kənˈtɪnjʊəs ˈɪmɪdʒ ˈskænɪŋ/',
              phonetic: 'kon-TI-nius I-migg SKA-ning',
              example:
                "With continuous image scanning enabled, any new CVE published against a running image triggers an immediate alert. = Con la scansione continua delle immagini abilitata, qualsiasi nuova CVE pubblicata contro un'immagine in esecuzione attiva un avviso immediato.",
              context: 'container-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Hadolint',
              italian: 'Hadolint (linter Dockerfile)',
              pronunciation: '/ˈhædəlɪnt/',
              phonetic: 'HA-do-lint',
              example:
                'Adding Hadolint to the pre-commit hooks flags Dockerfile anti-patterns like running apt-get without version pinning. = Aggiungere Hadolint agli hook pre-commit segnala anti-pattern nel Dockerfile come eseguire apt-get senza pinning delle versioni.',
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Hadolint',
              command: 'hadolint Dockerfile',
            },
            {
              english: 'Dockle',
              italian: 'Dockle (linter sicurezza container)',
              pronunciation: '/ˈdɒkl/',
              phonetic: 'DO-kol',
              example:
                "The Dockle report highlighted that our image was running as root and lacked a HEALTHCHECK instruction. = Il report di Dockle ha evidenziato che la nostra immagine girava come root e mancava l'istruzione HEALTHCHECK.",
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Dockle',
              command: 'dockle myimage:latest',
            },
            {
              english: 'CIS Docker Benchmark',
              italian: 'Benchmark CIS Docker',
              pronunciation: '/siː aɪ ɛs ˈdɒkə ˈbɛntʃmɑːk/',
              phonetic: 'SI-AI-ES DO-ker BENCH-mark',
              example:
                'Scoring our Docker host against the CIS Docker Benchmark revealed that TLS was not enabled on the daemon socket. = Valutare il nostro host Docker contro il CIS Docker Benchmark ha rivelato che TLS non era abilitato sul socket del daemon.',
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'docker-bench-security',
            },
            {
              english: 'kube-bench',
              italian: 'kube-bench (benchmark CIS Kubernetes)',
              pronunciation: '/kjuːb bɛntʃ/',
              phonetic: 'KIUB-BENCH',
              example:
                'Running kube-bench on every cluster node verifies compliance with the CIS Kubernetes security recommendations. = Eseguire kube-bench su ogni nodo del cluster verifica la conformità con le raccomandazioni di sicurezza CIS Kubernetes.',
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'kube-bench',
              command: 'kube-bench run --targets node',
            },
            {
              english: 'Quay Security Scanner',
              italian: 'Scanner di sicurezza Quay',
              pronunciation: '/kweɪ sɪˈkjʊərəti ˈskænər/',
              phonetic: 'KUEI si-KIU-ri-ti SKA-ner',
              example:
                'The Quay Security Scanner uses Clair as its backend to surface CVEs for every image pushed to the enterprise registry. = Il Quay Security Scanner usa Clair come backend per evidenziare CVE per ogni immagine pushata nel registry aziendale.',
              context: 'container-security',
              difficulty: 'intermediate',
              tool: 'Red Hat Quay',
            },
            {
              english: 'OCI',
              italian: 'Open Container Initiative (OCI)',
              pronunciation: '/əʊ siː aɪ/',
              phonetic: 'O-SI-AI',
              example:
                'Publishing our images in OCI format ensures compatibility across Docker, Podman, and any compliant container runtime. = Pubblicare le nostre immagini in formato OCI assicura compatibilità tra Docker, Podman e qualsiasi runtime container conforme.',
              context: 'container-security',
              difficulty: 'intermediate',
              note: 'Open Container Initiative.',
            },
            {
              english: 'Image Promotion',
              italian: "Promozione dell'immagine",
              pronunciation: '/ˈɪmɪdʒ prəˈməʊʃən/',
              phonetic: 'I-migg pro-MO-scion',
              example:
                'Our image promotion workflow moves scanned and signed images from the dev registry to the production registry automatically. = Il nostro workflow di promozione delle immagini sposta automaticamente le immagini scansionate e firmate dal registry dev a quello di produzione.',
              context: 'container-security',
              difficulty: 'intermediate',
              note: 'Sposta da staging a prod registry.',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 7 - IAC SECURITY
    // ════════════════════════════════════════════════
    7: {
      name: 'Sicurezza IaC / IaC Security',
      description: 'Scansione di Terraform, CloudFormation e altro',
      lessons: [
        {
          id: 'dso_iac_security_1',
          title: 'IaC Foundations / Fondamenti IaC',
          description: 'Infrastructure as Code e perché va analizzata',
          items: [
            {
              english: 'Infrastructure as Code',
              italian: 'Infrastruttura come codice',
              pronunciation: '/ˈɪnfrəˌstrʌktʃər æz kəʊd/',
              phonetic: 'IN-fra-strak-cer AZ-KOUD',
              example:
                'Defining all cloud resources as infrastructure as code makes every configuration change auditable and reproducible. = Definire tutte le risorse cloud come infrastruttura come codice rende ogni modifica di configurazione verificabile e riproducibile.',
              context: 'iac-security',
              difficulty: 'intermediate',
              note: 'Spesso abbreviato IaC.',
            },
            {
              english: 'Terraform',
              italian: 'Terraform (IaC HashiCorp)',
              pronunciation: '/ˈtɛrəfɔːm/',
              phonetic: 'TE-ra-form',
              example:
                'The team uses Terraform to provision AWS VPCs, security groups, and IAM roles through peer-reviewed pull requests. = Il team usa Terraform per provisioning di VPC AWS, security group e ruoli IAM tramite pull request con peer review.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Terraform',
              command: 'terraform plan',
            },
            {
              english: 'CloudFormation',
              italian: 'CloudFormation (IaC AWS)',
              pronunciation: '/klaʊdfɔːˈmeɪʃən/',
              phonetic: 'KLAUD-for-MEI-scion',
              example:
                'Every CloudFormation stack update is validated by cfn-nag before it reaches the deployment stage. = Ogni aggiornamento dello stack CloudFormation è validato da cfn-nag prima di raggiungere la fase di deployment.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'AWS CloudFormation',
            },
            {
              english: 'Pulumi',
              italian: 'Pulumi (IaC con linguaggi general-purpose)',
              pronunciation: '/pʊˈluːmi/',
              phonetic: 'pu-LU-mi',
              example:
                "Using Pulumi lets the team define infrastructure in TypeScript and run unit tests on the cloud configuration. = Usare Pulumi permette al team di definire l'infrastruttura in TypeScript e di eseguire unit test sulla configurazione cloud.",
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Pulumi',
            },
            {
              english: 'ARM Template',
              italian: 'Template ARM',
              pronunciation: '/ɑːr ɛm ˈtɛmpleɪt/',
              phonetic: 'AR-EM TEM-pleit',
              example:
                'The security scanner detected an ARM template that created a storage account without encryption enabled. = Lo scanner di sicurezza ha rilevato un ARM template che creava un account di storage senza crittografia abilitata.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Azure ARM',
            },
            {
              english: 'Bicep',
              italian: 'Bicep (DSL IaC per Azure)',
              pronunciation: '/ˈbaɪsɛp/',
              phonetic: 'BAI-sep',
              example:
                'Writing Azure resources in Bicep instead of raw JSON simplifies reviews and catches misconfigurations at compile time. = Scrivere risorse Azure in Bicep invece che in JSON grezzo semplifica le review e intercetta misconfigurazioni a tempo di compilazione.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Azure Bicep',
            },
            {
              english: 'Misconfiguration',
              italian: 'Errata configurazione',
              pronunciation: '/ˌmɪskənˌfɪɡjʊˈreɪʃən/',
              phonetic: 'mis-kon-fi-ghiu-REI-scion',
              example:
                'A single misconfiguration in the S3 bucket policy exposed customer invoices to the public internet for six hours. = Una singola misconfigurzione nella policy del bucket S3 ha esposto le fatture dei clienti su internet pubblico per sei ore.',
              context: 'iac-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Drift',
              italian: 'Deriva',
              pronunciation: '/drɪft/',
              phonetic: 'DRIFT',
              example:
                'Detecting configuration drift between the Terraform state and the actual cloud resources prevents shadow infrastructure. = Rilevare il drift di configurazione tra lo stato Terraform e le risorse cloud effettive previene infrastruttura ombra.',
              context: 'iac-security',
              difficulty: 'intermediate',
              note: "Quando l'infra reale differisce dal codice.",
            },
            {
              english: 'State File',
              italian: 'File di stato',
              pronunciation: '/steɪt faɪl/',
              phonetic: 'STEIT FAIL',
              example:
                'Encrypting the Terraform state file at rest in the S3 backend protects sensitive outputs like database connection strings. = Criptare il file di stato Terraform a riposo nel backend S3 protegge output sensibili come le stringhe di connessione al database.',
              context: 'iac-security',
              difficulty: 'intermediate',
              note: 'Può contenere segreti in chiaro.',
            },
            {
              english: 'Plan',
              italian: 'Piano',
              pronunciation: '/plæn/',
              phonetic: 'PLAN',
              example:
                "Reviewing the Terraform plan output in a pull request comment lets the security team catch misconfigurations before apply. = Revisionare l'output del piano Terraform in un commento della pull request permette al team di sicurezza di intercettare misconfigurazioni prima dell'apply.",
              context: 'iac-security',
              difficulty: 'intermediate',
              command: 'terraform plan -out=plan.tfplan',
            },
          ],
        },
        {
          id: 'dso_iac_security_2',
          title: 'IaC Scanners / Scanner IaC',
          description: 'Checkov, tfsec, Terrascan e altri',
          items: [
            {
              english: 'Checkov',
              italian: 'Checkov (scanner sicurezza IaC)',
              pronunciation: '/ˈtʃɛkɒv/',
              phonetic: 'CIE-kov',
              example:
                "Integrating Checkov into the CI pipeline blocked a Terraform module that would have created a publicly accessible RDS instance. = Integrare Checkov nella pipeline CI ha bloccato un modulo Terraform che avrebbe creato un'istanza RDS accessibile pubblicamente.",
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Checkov',
              command: 'checkov -d .',
            },
            {
              english: 'tfsec',
              italian: 'tfsec (scanner sicurezza Terraform)',
              pronunciation: '/tiː ɛf sɛk/',
              phonetic: 'TI-EF-SEK',
              example:
                'The tfsec scan flagged three security group rules that allowed inbound traffic from any IP address on all ports. = La scansione tfsec ha segnalato tre regole di security group che permettevano traffico in ingresso da qualsiasi indirizzo IP su tutte le porte.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'tfsec',
              command: 'tfsec .',
            },
            {
              english: 'Terrascan',
              italian: 'Terrascan (scanner sicurezza IaC)',
              pronunciation: '/ˈtɛrəskæn/',
              phonetic: 'TE-ra-skan',
              example:
                'Running Terrascan with custom Rego policies validated that all storage resources have encryption and versioning enabled. = Eseguire Terrascan con policy Rego personalizzate ha validato che tutte le risorse di storage hanno crittografia e versionamento abilitati.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Terrascan',
              command: 'terrascan scan -t aws',
            },
            {
              english: 'KICS',
              italian: 'KICS (scanner IaC Checkmarx)',
              pronunciation: '/kɪks/',
              phonetic: 'KIKS',
              example:
                'The KICS report identified hardcoded credentials in a CloudFormation template that should have used SSM parameter references. = Il report KICS ha identificato credenziali hardcoded in un template CloudFormation che avrebbe dovuto usare riferimenti a parametri SSM.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'KICS by Checkmarx',
            },
            {
              english: 'cfn-nag',
              italian: 'cfn-nag (linter sicurezza CloudFormation)',
              pronunciation: '/siː ɛf ɛn næɡ/',
              phonetic: 'SI-EF-EN NAG',
              example:
                'Adding cfn-nag as a pre-commit hook ensures that no CloudFormation template with wildcard IAM policies passes review. = Aggiungere cfn-nag come hook pre-commit assicura che nessun template CloudFormation con policy IAM wildcard passi la review.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'cfn-nag',
              command: 'cfn_nag_scan -i template.yaml',
            },
            {
              english: 'Snyk IaC',
              italian: 'Scanner IaC Snyk (Snyk IaC)',
              pronunciation: '/sniːk aɪ eɪ siː/',
              phonetic: 'SNIK AI-EI-SI',
              example:
                "Running Snyk IaC against the Terraform plan output detects security issues before any infrastructure change is applied. = Eseguire Snyk IaC contro l'output del piano Terraform rileva problemi di sicurezza prima che qualsiasi modifica all'infrastruttura venga applicata.",
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Snyk',
              command: 'snyk iac test main.tf',
            },
            {
              english: 'Trivy Config',
              italian: 'Trivy per file di configurazione (Trivy Config)',
              pronunciation: '/ˈtrɪvi ˈkɒnfɪɡ/',
              phonetic: 'TRI-vi KON-fig',
              example:
                'Using Trivy Config to scan Kubernetes manifests catches missing resource limits and absent security contexts. = Usare Trivy Config per scansionare i manifesti Kubernetes intercetta limiti di risorse mancanti e contesti di sicurezza assenti.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Trivy',
              command: 'trivy config .',
            },
            {
              english: 'Open Policy Agent',
              italian: 'Motore policy as code (Open Policy Agent)',
              pronunciation: '/ˈəʊpən ˈpɒləsi ˈeɪdʒənt/',
              phonetic: 'OU-pen PO-li-si EI-gent',
              example:
                'Writing Rego rules for Open Policy Agent lets the team enforce custom infrastructure standards across all cloud environments. = Scrivere regole Rego per Open Policy Agent permette al team di imporre standard infrastrutturali personalizzati in tutti gli ambienti cloud.',
              context: 'policy',
              difficulty: 'intermediate',
              tool: 'OPA',
            },
            {
              english: 'Plan Output',
              italian: 'Output del piano',
              pronunciation: '/plæn ˈaʊtpʊt/',
              phonetic: 'PLAN AUT-put',
              example:
                "Reviewing the plan output in a pull request comment lets security engineers approve infrastructure changes before apply. = Revisionare l'output del plan in un commento della pull request permette agli ingegneri di sicurezza di approvare le modifiche infrastrutturali prima dell'apply.",
              context: 'iac-security',
              difficulty: 'intermediate',
              command: 'terraform show -json plan.tfplan',
            },
            {
              english: 'Policy Pack',
              italian: 'Pacchetto di policy',
              pronunciation: '/ˈpɒləsi pæk/',
              phonetic: 'PO-li-si PAK',
              example:
                'The Pulumi policy pack enforces that no EC2 instance type larger than t3.medium is created without approval. = Il policy pack Pulumi impone che nessun tipo di istanza EC2 più grande di t3.medium venga creato senza approvazione.',
              context: 'policy',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_iac_security_3',
          title: 'Common IaC Issues / Problemi IaC Comuni',
          description: 'Pattern di errore frequenti',
          items: [
            {
              english: 'Public S3 Bucket',
              italian: 'Bucket S3 pubblico',
              pronunciation: '/ˈpʌblɪk ɛs θriː ˈbʌkɪt/',
              phonetic: 'PA-blik ES-TRI BA-ket',
              example:
                'The automated scan blocked the deployment because the Terraform plan would have created a public S3 bucket. = La scansione automatica ha bloccato il deployment perché il piano Terraform avrebbe creato un bucket S3 pubblico.',
              context: 'iac-security',
              difficulty: 'intermediate',
              code: 'block_public_acls = true',
            },
            {
              english: 'Open Security Group',
              italian: 'Security group aperto',
              pronunciation: '/ˈəʊpən sɪˈkjʊərəti ɡruːp/',
              phonetic: 'OU-pen si-KIU-ri-ti GRUP',
              example:
                'Checkov flagged an open security group that allowed SSH access from 0.0.0.0/0 to all production instances. = Checkov ha segnalato un security group aperto che permetteva accesso SSH da 0.0.0.0/0 a tutte le istanze di produzione.',
              context: 'iac-security',
              difficulty: 'intermediate',
              code: 'cidr_blocks = ["10.0.0.0/16"]',
            },
            {
              english: 'Unencrypted Volume',
              italian: 'Volume non cifrato',
              pronunciation: '/ʌnˈɪnkrɪptɪd ˈvɒljuːm/',
              phonetic: 'an-in-KRIP-ted VO-lium',
              example:
                'The compliance scan rejected the deployment because it contained an unencrypted volume storing customer health records. = La scansione di compliance ha rifiutato il deployment perché conteneva un volume non crittografato che memorizzava dati sanitari dei clienti.',
              context: 'iac-security',
              difficulty: 'intermediate',
              code: 'encrypted = true',
            },
            {
              english: 'Wildcard IAM',
              italian: 'IAM con wildcard',
              pronunciation: '/ˈwaɪldkɑːd aɪ eɪ ɛm/',
              phonetic: 'UAILD-kard AI-EI-EM',
              example:
                'Granting wildcard IAM permissions like s3:* gives far more access than any single service actually needs. = Concedere permessi IAM wildcard come s3:* dà molto più accesso di quello che un singolo servizio necessita effettivamente.',
              context: 'iac-security',
              difficulty: 'intermediate',
              code: 'Resource: "*"',
            },
            {
              english: 'Hardcoded Region',
              italian: 'Regione codificata',
              pronunciation: '/ˈhɑːdkəʊdɪd ˈriːdʒən/',
              phonetic: 'HARD-ko-ded RI-gen',
              example:
                "Avoiding a hardcoded region in the Terraform module makes the infrastructure portable across AWS regions. = Evitare una regione hardcoded nel modulo Terraform rende l'infrastruttura portabile tra le regioni AWS.",
              context: 'iac-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Plain-Text Password',
              italian: 'Password in chiaro',
              pronunciation: '/pleɪn tɛkst ˈpɑːswɜːd/',
              phonetic: 'PLEIN-TEKST PAS-uord',
              example:
                'The scanner found a plain-text password in a Helm values file that should have been a sealed secret reference. = Lo scanner ha trovato una password in testo chiaro in un file di valori Helm che avrebbe dovuto essere un riferimento a un sealed secret.',
              context: 'iac-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Disabled Logging',
              italian: 'Logging disattivato',
              pronunciation: '/dɪsˈeɪbld ˈlɒɡɪŋ/',
              phonetic: 'di-SEI-bold LO-ghing',
              example:
                "A policy check caught a CloudTrail configuration with disabled logging, which would leave account activity invisible. = Un controllo di policy ha intercettato una configurazione CloudTrail con logging disabilitato, che avrebbe lasciato l'attività dell'account invisibile.",
              context: 'iac-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Outdated Provider',
              italian: 'Provider obsoleto',
              pronunciation: '/aʊtˈdeɪtɪd prəˈvaɪdə/',
              phonetic: 'aut-DEI-ted pro-VAI-der',
              example:
                'Updating the outdated provider version in Terraform resolved three known security issues in the AWS API calls. = Aggiornare la versione del provider obsoleto in Terraform ha risolto tre problemi di sicurezza noti nelle chiamate API AWS.',
              context: 'iac-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Privileged Service Account',
              italian: 'Account di servizio privilegiato',
              pronunciation: '/ˈprɪvəlɪdʒd ˈsɜːvɪs əˈkaʊnt/',
              phonetic: 'PRI-vi-leggd SER-vis a-KAUNT',
              example:
                'The IaC scanner flagged a privileged service account with project-level owner permissions that violated least-privilege policy. = Lo scanner IaC ha segnalato un account di servizio privilegiato con permessi owner a livello di progetto che violava la policy del privilegio minimo.',
              context: 'iac-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Default VPC',
              italian: 'VPC di default',
              pronunciation: '/dɪˈfɔːlt viː piː siː/',
              phonetic: 'di-FOLT VI-PI-SI',
              example:
                'We delete the default VPC in every new AWS account because its permissive settings do not meet our security baseline. = Eliminiamo il VPC predefinito in ogni nuovo account AWS perché le sue impostazioni permissive non soddisfano la nostra baseline di sicurezza.',
              context: 'iac-security',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_iac_security_4',
          title: 'IaC in CI / IaC in CI',
          description: 'Pipeline e governance',
          items: [
            {
              english: 'IaC Pipeline',
              italian: 'Pipeline IaC',
              pronunciation: '/aɪ eɪ siː ˈpaɪplaɪn/',
              phonetic: 'AI-EI-SI PAIP-lain',
              example:
                "Our IaC pipeline runs Checkov, tfsec, and cost estimation before allowing any Terraform apply to execute. = La nostra pipeline IaC esegue Checkov, tfsec e stima dei costi prima di permettere l'esecuzione di qualsiasi Terraform apply.",
              context: 'iac-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Atlantis',
              italian: 'Atlantis (automazione Terraform via PR)',
              pronunciation: '/ætˈlæntɪs/',
              phonetic: 'at-LAN-tis',
              example:
                "Using Atlantis, developers trigger terraform plan from a pull request comment and see the output inline. = Usando Atlantis, gli sviluppatori attivano terraform plan da un commento della pull request e vedono l'output inline.",
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Atlantis',
            },
            {
              english: 'Terraform Cloud',
              italian: 'Terraform Cloud (servizio gestito Terraform)',
              pronunciation: '/ˈtɛrəfɔːm klaʊd/',
              phonetic: 'TE-ra-form KLAUD',
              example:
                'Migrating to Terraform Cloud gave the team remote state locking, policy enforcement, and a full audit trail. = Migrare a Terraform Cloud ha dato al team locking dello stato remoto, enforcement delle policy e una traccia di audit completa.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Terraform Cloud',
            },
            {
              english: 'Sentinel',
              italian: 'Motore policy HashiCorp (Sentinel)',
              pronunciation: '/ˈsɛntɪnl/',
              phonetic: 'SEN-ti-nel',
              example:
                'A Sentinel policy prevents any Terraform plan from creating resources without the mandatory cost-center tag. = Una policy Sentinel impedisce a qualsiasi piano Terraform di creare risorse senza il tag di centro di costo obbligatorio.',
              context: 'policy',
              difficulty: 'intermediate',
              tool: 'HashiCorp Sentinel',
            },
            {
              english: 'Drift Detection',
              italian: 'Rilevamento della deriva',
              pronunciation: '/drɪft dɪˈtɛkʃən/',
              phonetic: 'DRIFT di-TEK-scion',
              example:
                'Scheduled drift detection jobs compare the actual cloud state with the Terraform state and alert on any divergence. = I job di rilevamento del drift pianificati confrontano lo stato cloud effettivo con lo stato Terraform e allertano su qualsiasi divergenza.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'driftctl',
            },
            {
              english: 'Modules Registry',
              italian: 'Registry dei moduli',
              pronunciation: '/ˈmɒdjuːlz ˈrɛdʒɪstri/',
              phonetic: 'MO-diuls RE-gi-stri',
              example:
                'Publishing vetted Terraform modules to the private modules registry ensures that teams reuse secure, pre-approved patterns. = Pubblicare moduli Terraform verificati nel registry dei moduli privato assicura che i team riutilizzino pattern sicuri e pre-approvati.',
              context: 'iac-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Plan Diff',
              italian: 'Diff del piano',
              pronunciation: '/plæn dɪf/',
              phonetic: 'PLAN-DIF',
              example:
                'Reviewing the plan diff in the pull request comment reveals exactly which resources will be created or destroyed. = Revisionare il diff del plan nel commento della pull request rivela esattamente quali risorse saranno create o distrutte.',
              context: 'iac-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Approval Workflow',
              italian: 'Workflow di approvazione',
              pronunciation: '/əˈpruːvl ˈwɜːkfləʊ/',
              phonetic: 'a-PRU-val UORK-flou',
              example:
                "The approval workflow requires a security engineer sign-off before any infrastructure change reaches the production account. = Il workflow di approvazione richiede il via libera di un ingegnere di sicurezza prima che qualsiasi modifica infrastrutturale raggiunga l'account di produzione.",
              context: 'iac-security',
              difficulty: 'intermediate',
            },
            {
              english: 'OPA Conftest',
              italian: 'Test policy su file di config (OPA Conftest)',
              pronunciation: '/ˈəʊpə ˈkɒnftɛst/',
              phonetic: 'O-pa KON-ftest',
              example:
                'Running OPA Conftest on Kubernetes manifests blocks any deployment missing the required securityContext settings. = Eseguire OPA Conftest sui manifesti Kubernetes blocca qualsiasi deployment privo delle impostazioni securityContext richieste.',
              context: 'policy',
              difficulty: 'intermediate',
              tool: 'Conftest',
              command: 'conftest test main.tf',
            },
            {
              english: 'Cost Estimation',
              italian: 'Stima dei costi',
              pronunciation: '/kɒst ˌɛstɪˈmeɪʃən/',
              phonetic: 'KOST es-ti-MEI-scion',
              example:
                'Adding cost estimation to the IaC pipeline prevents developers from accidentally launching oversized instances. = Aggiungere la stima dei costi alla pipeline IaC impedisce agli sviluppatori di lanciare accidentalmente istanze sovradimensionate.',
              context: 'iac-security',
              difficulty: 'intermediate',
              tool: 'Infracost',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 8 - POLICY AS CODE
    // ════════════════════════════════════════════════
    8: {
      name: 'Policy as Code / Policy as Code',
      description: 'OPA, Rego, Conftest e admission controllers',
      lessons: [
        {
          id: 'dso_policy_1',
          title: 'OPA Foundations / Fondamenti OPA',
          description: 'Open Policy Agent e Rego',
          items: [
            {
              english: 'Policy as Code',
              italian: 'Policy come codice',
              pronunciation: '/ˈpɒləsi æz kəʊd/',
              phonetic: 'PO-li-si AZ KOUD',
              example:
                'Expressing every security policy as code lets the team version, test, and enforce rules automatically in CI. = Esprimere ogni policy di sicurezza come codice permette al team di versionare, testare e imporre regole automaticamente nella CI.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'OPA',
              italian: 'Open Policy Agent (OPA)',
              pronunciation: '/ˈəʊpə/',
              phonetic: 'O-pa',
              example:
                "The admission controller queries OPA for every pod creation request to check whether it meets the cluster security policy. = L'admission controller interroga OPA per ogni richiesta di creazione pod per verificare se soddisfa la policy di sicurezza del cluster.",
              context: 'policy',
              difficulty: 'intermediate',
              tool: 'OPA',
              note: 'Open Policy Agent.',
            },
            {
              english: 'Rego',
              italian: 'Linguaggio policy di OPA (Rego)',
              pronunciation: '/ˈreɪɡəʊ/',
              phonetic: 'REI-go',
              example:
                'Writing the authorization logic in Rego decouples policy decisions from application code, making audits simpler. = Scrivere la logica di autorizzazione in Rego disaccoppia le decisioni di policy dal codice applicativo, semplificando gli audit.',
              context: 'policy',
              difficulty: 'intermediate',
              code: 'package main\ndeny[msg] { input.kind == "Pod" }',
            },
            {
              english: 'Decision',
              italian: 'Decisione',
              pronunciation: '/dɪˈsɪʒən/',
              phonetic: 'di-SI-gen',
              example:
                'OPA returns an allow or deny decision within a few milliseconds, so it does not add noticeable latency. = OPA restituisce una decisione di allow o deny in pochi millisecondi, quindi non aggiunge latenza percepibile.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Bundle',
              italian: 'Pacchetto OPA (bundle)',
              pronunciation: '/ˈbʌndl/',
              phonetic: 'BAN-dol',
              example:
                "The OPA server downloads the latest policy bundle from S3 every thirty seconds to pick up rule changes. = Il server OPA scarica l'ultimo bundle di policy da S3 ogni trenta secondi per recepire i cambiamenti alle regole.",
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Allow Rule',
              italian: 'Regola allow',
              pronunciation: '/əˈlaʊ ruːl/',
              phonetic: 'a-LAU RUL',
              example:
                'The Rego allow rule grants access only when the JWT contains a valid role claim matching the resource owner. = La regola allow in Rego concede accesso solo quando il JWT contiene un claim di ruolo valido che corrisponde al proprietario della risorsa.',
              context: 'policy',
              difficulty: 'intermediate',
              code: 'allow { input.user.role == "admin" }',
            },
            {
              english: 'Deny Rule',
              italian: 'Regola deny',
              pronunciation: '/dɪˈnaɪ ruːl/',
              phonetic: 'di-NAI RUL',
              example:
                'Adding a deny rule that blocks containers running as root caught three misconfigured deployments in staging. = Aggiungere una regola deny che blocca i container eseguiti come root ha intercettato tre deployment mal configurati in staging.',
              context: 'policy',
              difficulty: 'intermediate',
              code: 'deny[msg] { not input.tls }',
            },
            {
              english: 'Input',
              italian: 'Dati in ingresso a una policy (input)',
              pronunciation: '/ˈɪnpʊt/',
              phonetic: 'IN-put',
              example:
                'OPA evaluates the Kubernetes admission request as input and checks every field against the active policy set. = OPA valuta la richiesta di ammissione Kubernetes come input e controlla ogni campo contro il set di policy attivo.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Data',
              italian: 'Dati',
              pronunciation: '/ˈdeɪtə/',
              phonetic: 'DEI-ta',
              example:
                'External data sources like team ownership lists feed into OPA so policies can reference who owns which namespace. = Fonti dati esterne come le liste di proprietà dei team alimentano OPA così le policy possono referenziare chi possiede quale namespace.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Unit Test for Policy',
              italian: 'Test unitario di policy',
              pronunciation: '/ˈjuːnɪt tɛst fɔː ˈpɒləsi/',
              phonetic: 'IU-nit TEST FOR PO-li-si',
              example:
                'Writing a unit test for every policy rule ensures that future Rego changes do not accidentally weaken security controls. = Scrivere un unit test per ogni regola di policy assicura che i futuri cambiamenti Rego non indeboliscano accidentalmente i controlli di sicurezza.',
              context: 'policy',
              difficulty: 'intermediate',
              command: 'opa test policy/ -v',
            },
          ],
        },
        {
          id: 'dso_policy_2',
          title: 'Conftest & Examples / Conftest ed Esempi',
          description: 'Test di configurazioni con OPA',
          items: [
            {
              english: 'Conftest',
              italian: 'OPA per test su config (conftest)',
              pronunciation: '/ˈkɒnftɛst/',
              phonetic: 'KON-ftest',
              example:
                'Running conftest on the Helm values file prevents deploying charts with resource limits set above the approved threshold. = Eseguire conftest sul file dei valori Helm impedisce di deployare chart con limiti di risorse impostati sopra la soglia approvata.',
              context: 'policy',
              difficulty: 'intermediate',
              tool: 'Conftest',
              command: 'conftest test deployment.yaml',
            },
            {
              english: 'YAML Manifest',
              italian: 'Manifest YAML',
              pronunciation: '/ˈjæml ˈmænɪfɛst/',
              phonetic: 'IA-mol MA-ni-fest',
              example:
                'Every YAML manifest committed to the GitOps repository is validated against OPA policies before ArgoCD syncs it. = Ogni manifesto YAML committato nel repository GitOps è validato contro le policy OPA prima che ArgoCD lo sincronizzi.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Dockerfile Policy',
              italian: 'Policy del Dockerfile',
              pronunciation: '/ˈdɒkəfaɪl ˈpɒləsi/',
              phonetic: 'DO-ker-fail PO-li-si',
              example:
                "Our Dockerfile policy requires every image to use a pinned base image digest and a non-root USER directive. = La nostra policy Dockerfile richiede che ogni immagine usi un digest dell'immagine base pinnato e una direttiva USER non-root.",
              context: 'policy',
              difficulty: 'intermediate',
              code: 'deny[msg] { input.From == "latest" }',
            },
            {
              english: 'Resource Limit',
              italian: 'Limite di risorse',
              pronunciation: '/rɪˈzɔːs ˈlɪmɪt/',
              phonetic: 'ri-ZORS LI-mit',
              example:
                'Setting a memory resource limit on every container prevents a single pod from consuming all available node memory. = Impostare un limite di risorse di memoria su ogni container impedisce a un singolo pod di consumare tutta la memoria disponibile del nodo.',
              context: 'policy',
              difficulty: 'intermediate',
              code: 'deny { not input.spec.resources.limits }',
            },
            {
              english: 'Required Label',
              italian: 'Label obbligatoria',
              pronunciation: '/rɪˈkwaɪəd ˈleɪbl/',
              phonetic: 'ri-KUAIRD LEI-bol',
              example:
                "The admission policy rejects any pod spec missing the required label for cost center and environment designation. = La policy di ammissione rifiuta qualsiasi specifica pod priva del label obbligatorio per centro di costo e designazione dell'ambiente.",
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Approved Registry',
              italian: 'Registry approvato',
              pronunciation: '/əˈpruːvd ˈrɛdʒɪstri/',
              phonetic: 'a-PRU-vd RE-gi-stri',
              example:
                "Only images pulled from the approved registry at registry.internal.io pass the admission controller check. = Solo le immagini scaricate dal registry approvato su registry.internal.io passano il controllo dell'admission controller.",
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Policy Library',
              italian: 'Libreria di policy',
              pronunciation: '/ˈpɒləsi ˈlaɪbrəri/',
              phonetic: 'PO-li-si LAI-bra-ri',
              example:
                'The central policy library contains over two hundred tested Rego rules shared across all engineering teams. = La libreria di policy centrale contiene oltre duecento regole Rego testate condivise tra tutti i team di ingegneria.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Exception',
              italian: 'Eccezione',
              pronunciation: '/ɪkˈsɛpʃən/',
              phonetic: 'ek-SEP-scion',
              example:
                "Granting a policy exception for the legacy service requires a documented risk acceptance signed by the CISO. = Concedere un'eccezione alla policy per il servizio legacy richiede un'accettazione del rischio documentata firmata dal CISO.",
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Warning Rule',
              italian: 'Regola di avviso',
              pronunciation: '/ˈwɔːnɪŋ ruːl/',
              phonetic: 'UOR-ning RUL',
              example:
                'A warning rule alerts developers about deprecated API versions without blocking the deployment pipeline. = Una regola di warning avvisa gli sviluppatori riguardo a versioni API deprecate senza bloccare la pipeline di deployment.',
              context: 'policy',
              difficulty: 'intermediate',
              code: 'warn[msg] { not input.spec.replicas }',
            },
            {
              english: 'Policy Test Coverage',
              italian: 'Copertura dei test di policy',
              pronunciation: '/ˈpɒləsi tɛst ˈkʌvərɪdʒ/',
              phonetic: 'PO-li-si TEST KA-ve-rigg',
              example:
                'Achieving ninety percent policy test coverage ensures that edge cases in Rego rules do not create security gaps. = Raggiungere il novanta percento di copertura dei test delle policy assicura che i casi limite nelle regole Rego non creino falle di sicurezza.',
              context: 'policy',
              difficulty: 'intermediate',
              command: 'opa test --coverage',
            },
          ],
        },
        {
          id: 'dso_policy_3',
          title: 'Admission Controllers / Controllori di Ammissione',
          description: 'Bloccare risorse non conformi in K8s',
          items: [
            {
              english: 'Admission Controller',
              italian: 'Controllore di ammissione',
              pronunciation: '/ədˈmɪʃən kənˈtrəʊlə/',
              phonetic: 'ad-MI-scion kon-TRO-ler',
              example:
                "The Kubernetes admission controller rejects any pod spec that references an unsigned or unscanned container image. = L'admission controller Kubernetes rifiuta qualsiasi specifica pod che referenzi un'immagine container non firmata o non scansionata.",
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Validating Webhook',
              italian: 'Webhook di validazione',
              pronunciation: '/ˈvælɪdeɪtɪŋ ˈwɛbhʊk/',
              phonetic: 'VA-li-dei-ting UEB-huk',
              example:
                'The validating webhook intercepts CREATE and UPDATE requests and rejects pods that violate the security baseline. = Il validating webhook intercetta le richieste CREATE e UPDATE e rifiuta i pod che violano la baseline di sicurezza.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Mutating Webhook',
              italian: 'Webhook mutante',
              pronunciation: '/ˈmjuːteɪtɪŋ ˈwɛbhʊk/',
              phonetic: 'MIU-tei-ting UEB-huk',
              example:
                'Our mutating webhook automatically injects a sidecar proxy and resource limits into every new pod deployment. = Il nostro mutating webhook inietta automaticamente un proxy sidecar e limiti di risorse in ogni nuovo deployment di pod.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Kyverno',
              italian: 'Kyverno (policy engine Kubernetes)',
              pronunciation: '/ˈkaɪvɜːnəʊ/',
              phonetic: 'KAI-ver-no',
              example:
                'Switching from OPA Gatekeeper to Kyverno simplified policy authoring because rules are written in plain YAML. = Passare da OPA Gatekeeper a Kyverno ha semplificato la scrittura delle policy perché le regole sono scritte in YAML semplice.',
              context: 'policy',
              difficulty: 'intermediate',
              tool: 'Kyverno',
              code: 'apiVersion: kyverno.io/v1\nkind: ClusterPolicy',
            },
            {
              english: 'OPA Gatekeeper',
              italian: 'OPA per Kubernetes (OPA Gatekeeper)',
              pronunciation: '/ˈəʊpə ˈɡeɪtkiːpə/',
              phonetic: 'O-pa GHEIT-ki-per',
              example:
                "Deploying OPA Gatekeeper on the cluster enforces constraint templates that reject non-compliant workloads at admission. = Deployare OPA Gatekeeper sul cluster impone constraint template che rifiutano i workload non conformi all'ammissione.",
              context: 'policy',
              difficulty: 'intermediate',
              tool: 'OPA Gatekeeper',
            },
            {
              english: 'Constraint',
              italian: 'Vincolo',
              pronunciation: '/kənˈstreɪnt/',
              phonetic: 'kon-STREINT',
              example:
                "The cluster administrator created a constraint that blocks any deployment without explicit CPU and memory limits. = L'amministratore del cluster ha creato un constraint che blocca qualsiasi deployment senza limiti espliciti di CPU e memoria.",
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Constraint Template',
              italian: 'Template di vincolo',
              pronunciation: '/kənˈstreɪnt ˈtɛmpleɪt/',
              phonetic: 'kon-STREINT TEM-pleit',
              example:
                'A parameterized constraint template lets teams reuse the same validation logic with different threshold values. = Un constraint template parametrizzato permette ai team di riutilizzare la stessa logica di validazione con valori di soglia diversi.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Policy Audit',
              italian: 'Audit delle policy',
              pronunciation: '/ˈpɒləsi ˈɔːdɪt/',
              phonetic: 'PO-li-si O-dit',
              example:
                'Running a quarterly policy audit checks that every active Rego rule is still relevant and correctly enforced. = Eseguire un audit delle policy trimestrale verifica che ogni regola Rego attiva sia ancora pertinente e correttamente applicata.',
              context: 'policy',
              difficulty: 'intermediate',
              note: 'Modalità solo report, senza blocco.',
            },
            {
              english: 'Enforce Mode',
              italian: 'Modalità enforce',
              pronunciation: '/ɪnˈfɔːs məʊd/',
              phonetic: 'in-FORS MOUD',
              example:
                'Switching the policy from audit mode to enforce mode started blocking non-compliant pods in real time. = Passare la policy dalla modalità audit alla modalità enforce ha iniziato a bloccare i pod non conformi in tempo reale.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Pod Security Standard',
              italian: 'Standard di sicurezza pod',
              pronunciation: '/pɒd sɪˈkjʊərəti ˈstændəd/',
              phonetic: 'POD si-KIU-ri-ti STAN-dard',
              example:
                "Applying the restricted Pod Security Standard prevents containers from running as root or mounting host paths. = Applicare il Pod Security Standard ristretto impedisce ai container di girare come root o montare percorsi dell'host.",
              context: 'policy',
              difficulty: 'intermediate',
              note: 'PSS sostituisce le PSP deprecate.',
            },
          ],
        },
        {
          id: 'dso_policy_4',
          title: 'Policy in CI / Policy in CI',
          description: 'Integrare policy nelle pipeline',
          items: [
            {
              english: 'Pre-Deploy Check',
              italian: 'Controllo pre-deploy',
              pronunciation: '/priː dɪˈplɔɪ tʃɛk/',
              phonetic: 'PRI-di-PLOI CIEK',
              example:
                'The pre-deploy check validates that all images are signed and all manifests pass OPA policy evaluation. = Il controllo pre-deploy valida che tutte le immagini siano firmate e tutti i manifesti passino la valutazione delle policy OPA.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Helm Lint',
              italian: 'Linter di Helm chart (helm lint)',
              pronunciation: '/hɛlm lɪnt/',
              phonetic: 'HELM-LINT',
              example:
                'Running helm lint before packaging the chart catches syntax errors and missing required values in the templates. = Eseguire helm lint prima di pacchettizzare il chart intercetta errori di sintassi e valori obbligatori mancanti nei template.',
              context: 'policy',
              difficulty: 'intermediate',
              command: 'helm lint ./mychart',
            },
            {
              english: 'Kubeconform',
              italian: 'Kubeconform (validatore manifest K8s)',
              pronunciation: '/ˈkjuːbˌkɒnfɔːm/',
              phonetic: 'KIUB-kon-form',
              example:
                'Validating manifests with Kubeconform ensures they conform to the target Kubernetes API version schema. = Validare i manifesti con Kubeconform assicura che siano conformi allo schema della versione API Kubernetes di destinazione.',
              context: 'policy',
              difficulty: 'intermediate',
              tool: 'Kubeconform',
              command: 'kubeconform deploy.yaml',
            },
            {
              english: 'Policy Pipeline',
              italian: 'Pipeline di policy',
              pronunciation: '/ˈpɒləsi ˈpaɪplaɪn/',
              phonetic: 'PO-li-si PAIP-lain',
              example:
                'Our policy pipeline runs unit tests, integration tests, and dry-run enforcement before merging any Rego change. = La nostra pipeline di policy esegue unit test, test di integrazione e enforcement dry-run prima di unire qualsiasi modifica Rego.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Drift Policy',
              italian: 'Policy di deriva',
              pronunciation: '/drɪft ˈpɒləsi/',
              phonetic: 'DRIFT PO-li-si',
              example:
                'The drift policy alerts when a manually changed resource no longer matches its Terraform-managed definition. = La policy di drift allerta quando una risorsa modificata manualmente non corrisponde più alla sua definizione gestita da Terraform.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Score Card',
              italian: 'Scheda di valutazione',
              pronunciation: '/skɔː kɑːd/',
              phonetic: 'SKOR KARD',
              example:
                'Each team receives a monthly score card showing the percentage of deployments that passed all security policies. = Ogni team riceve una score card mensile che mostra la percentuale di deployment che hanno passato tutte le policy di sicurezza.',
              context: 'policy',
              difficulty: 'intermediate',
              tool: 'OpenSSF Scorecard',
            },
            {
              english: 'Policy Bundle Server',
              italian: 'Server di bundle di policy',
              pronunciation: '/ˈpɒləsi ˈbʌndl ˈsɜːvə/',
              phonetic: 'PO-li-si BAN-dol SER-ver',
              example:
                'The OPA instances pull the latest rules from the central policy bundle server on every restart and every five minutes. = Le istanze OPA scaricano le regole più recenti dal server del bundle di policy centrale a ogni riavvio e ogni cinque minuti.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Decision Log',
              italian: 'Log delle decisioni',
              pronunciation: '/dɪˈsɪʒən lɒɡ/',
              phonetic: 'di-SI-gen LOG',
              example:
                'Shipping every OPA decision log to the SIEM lets the security team audit which requests were allowed or denied. = Inviare ogni decision log di OPA al SIEM permette al team di sicurezza di verificare quali richieste sono state autorizzate o negate.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Policy as Test',
              italian: 'Policy come test',
              pronunciation: '/ˈpɒləsi æz tɛst/',
              phonetic: 'PO-li-si AZ-TEST',
              example:
                'Treating every policy as a test means it runs in the CI pipeline and must pass before the merge is allowed. = Trattare ogni policy come un test significa che gira nella pipeline CI e deve passare prima che il merge sia consentito.',
              context: 'policy',
              difficulty: 'intermediate',
            },
            {
              english: 'Shift-Left Policy',
              italian: 'Policy spostata a sinistra',
              pronunciation: '/ʃɪft lɛft ˈpɒləsi/',
              phonetic: 'SHIFT-LEFT PO-li-si',
              example:
                "Evaluating shift-left policy checks in the developer IDE gives instant feedback before code is even committed. = Valutare i controlli di policy shift-left nell'IDE dello sviluppatore dà feedback istantaneo prima ancora che il codice sia committato.",
              context: 'policy',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 9 - SUPPLY CHAIN SECURITY
    // ════════════════════════════════════════════════
    9: {
      name: 'Sicurezza della Supply Chain / Supply Chain Security',
      description: 'SLSA, Sigstore, attestazioni e provenance',
      lessons: [
        {
          id: 'dso_supply_chain_1',
          title: 'Supply Chain Basics / Basi Supply Chain',
          description: 'Concetti fondamentali e attacchi noti',
          items: [
            {
              english: 'Software Supply Chain',
              italian: 'Catena di approvvigionamento software',
              pronunciation: '/ˈsɒftweə səˈplaɪ tʃeɪn/',
              phonetic: 'SOFT-uer sa-PLAI CIEIN',
              example:
                "Securing the software supply chain requires verifying every dependency, build tool, and CI plugin before use. = Proteggere la catena di fornitura software richiede la verifica di ogni dipendenza, strumento di build e plugin CI prima dell'uso.",
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Provenance',
              italian: 'Provenienza',
              pronunciation: '/ˈprɒvənəns/',
              phonetic: 'PRO-ve-nans',
              example:
                'Generating build provenance records proves exactly which source commit, builder, and parameters produced a given artifact. = Generare record di provenienza della build dimostra esattamente quale commit sorgente, builder e parametri hanno prodotto un dato artefatto.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Attestation',
              italian: 'Attestazione',
              pronunciation: '/ˌætɛˈsteɪʃən/',
              phonetic: 'a-tes-TEI-scion',
              example:
                "Attaching a signed attestation to the container image proves it passed all required security scans before release. = Allegare un'attestazione firmata all'immagine container dimostra che ha superato tutte le scansioni di sicurezza richieste prima del rilascio.",
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Signature',
              italian: 'Firma',
              pronunciation: '/ˈsɪɡnətʃər/',
              phonetic: 'SIG-na-cer',
              example:
                'Verifying the cryptographic signature on each artifact confirms that it has not been tampered with since the build. = Verificare la firma crittografica su ogni artefatto conferma che non è stato manomesso dal momento della build.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Verifier',
              italian: 'Verificatore',
              pronunciation: '/ˈvɛrɪfaɪər/',
              phonetic: 'VE-ri-fai-er',
              example:
                "The admission controller acts as a verifier, rejecting any container image that lacks a valid cosign signature. = L'admission controller agisce come verificatore, rifiutando qualsiasi immagine container priva di una firma cosign valida.",
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Typosquatting',
              italian: 'Nomi simili per ingannare utenti (typosquatting)',
              pronunciation: '/ˈtaɪpəʊˌskwɒtɪŋ/',
              phonetic: 'TAI-po-skuo-ting',
              example:
                'An attacker published a typosquatting package named lodahs to trick developers into installing malicious code. = Un attaccante ha pubblicato un pacchetto di typosquatting chiamato lodahs per ingannare gli sviluppatori facendo installare codice malevolo.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              note: 'Es. lod4sh invece di lodash.',
            },
            {
              english: 'Dependency Confusion',
              italian: 'Confusione di dipendenze',
              pronunciation: '/dɪˈpɛndənsi kənˈfjuːʒən/',
              phonetic: 'di-PEN-den-si kon-FIU-gen',
              example:
                'A dependency confusion attack exploits private package names by publishing higher-version copies on the public registry. = Un attacco di dependency confusion sfrutta i nomi dei pacchetti privati pubblicando copie con versioni più alte nel registry pubblico.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Maintainer Compromise',
              italian: 'Compromissione del manutentore',
              pronunciation: '/meɪnˈteɪnə ˈkɒmprəmaɪz/',
              phonetic: 'mein-TEI-ner KOM-pro-maiz',
              example:
                "When a maintainer compromise occurs, the attacker pushes a backdoor update that gets pulled by thousands of projects. = Quando avviene un compromesso del maintainer, l'attaccante pusha un aggiornamento con backdoor che viene scaricato da migliaia di progetti.",
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Build System Compromise',
              italian: 'Compromissione del sistema di build',
              pronunciation: '/bɪld ˈsɪstəm ˈkɒmprəmaɪz/',
              phonetic: 'BILD SIS-tem KOM-pro-maiz',
              example:
                "The SolarWinds incident demonstrated how a build system compromise can inject malware into legitimate signed software. = L'incidente SolarWinds ha dimostrato come un compromesso del sistema di build possa iniettare malware in software legittimo firmato.",
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Trust Boundary',
              italian: 'Confine di fiducia',
              pronunciation: '/trʌst ˈbaʊndəri/',
              phonetic: 'TRAST BAUN-da-ri',
              example:
                'Defining a clear trust boundary between the CI runner and the production cluster limits lateral movement in case of breach. = Definire un confine di fiducia chiaro tra il runner CI e il cluster di produzione limita il movimento laterale in caso di violazione.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_supply_chain_2',
          title: 'SLSA Framework / Framework SLSA',
          description: 'Supply-chain Levels for Software Artifacts',
          items: [
            {
              english: 'SLSA',
              italian: 'Livelli di sicurezza supply chain (SLSA)',
              pronunciation: '/ˈsɒlsə/',
              phonetic: 'SOL-sa',
              example:
                "Achieving SLSA Level 3 requires using an isolated build environment with verifiable provenance for every artifact. = Raggiungere il livello SLSA 3 richiede l'uso di un ambiente di build isolato con provenienza verificabile per ogni artefatto.",
              context: 'supply-chain',
              difficulty: 'intermediate',
              note: 'Supply-chain Levels for Software Artifacts.',
            },
            {
              english: 'SLSA Level 1',
              italian: 'SLSA Livello 1',
              pronunciation: '/ˈsɒlsə ˈlɛvl wʌn/',
              phonetic: 'SOL-sa LE-vel UAN',
              example:
                'At SLSA Level 1, the build process must be fully scripted and produce a provenance document. = Al livello SLSA 1, il processo di build deve essere completamente scriptato e produrre un documento di provenienza.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'SLSA Level 2',
              italian: 'SLSA Livello 2',
              pronunciation: '/ˈsɒlsə ˈlɛvl tuː/',
              phonetic: 'SOL-sa LE-vel TU',
              example:
                'Reaching SLSA Level 2 means the provenance is generated by a hosted build service and cannot be forged by developers. = Raggiungere il livello SLSA 2 significa che la provenienza è generata da un servizio di build ospitato e non può essere falsificata dagli sviluppatori.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'SLSA Level 3',
              italian: 'SLSA Livello 3',
              pronunciation: '/ˈsɒlsə ˈlɛvl θriː/',
              phonetic: 'SOL-sa LE-vel TRI',
              example:
                'At SLSA Level 3, the build runs in an ephemeral isolated environment, preventing any cross-build contamination. = Al livello SLSA 3, la build gira in un ambiente isolato effimero, prevenendo qualsiasi contaminazione tra build.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'SLSA Level 4',
              italian: 'SLSA Livello 4',
              pronunciation: '/ˈsɒlsə ˈlɛvl fɔː/',
              phonetic: 'SOL-sa LE-vel FOR',
              example:
                'Meeting SLSA Level 4 requires a two-person review of every source change and a hermetic, reproducible build. = Soddisfare il livello SLSA 4 richiede una revisione a due persone di ogni modifica del sorgente e una build ermetica e riproducibile.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Hermetic Build',
              italian: 'Build ermetica',
              pronunciation: '/hɜːˈmɛtɪk bɪld/',
              phonetic: 'her-ME-tik BILD',
              example:
                "A hermetic build fetches no external resources at build time, so the output depends only on the declared inputs. = Una build ermetica non scarica risorse esterne a tempo di build, quindi l'output dipende solo dagli input dichiarati.",
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Reproducible Build',
              italian: 'Build riproducibile',
              pronunciation: '/ˌriːprəˈdjuːsəbl bɪld/',
              phonetic: 'ri-pro-DIU-si-bol BILD',
              example:
                'With a reproducible build, two different machines compiling the same source produce bit-for-bit identical binaries. = Con una build riproducibile, due macchine diverse che compilano lo stesso sorgente producono binari identici bit per bit.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Isolated Build',
              italian: 'Build isolata',
              pronunciation: '/ˈaɪsəleɪtɪd bɪld/',
              phonetic: 'AI-so-lei-ted BILD',
              example:
                "Running the compilation in an isolated build container prevents environment variables or host tools from affecting the output. = Eseguire la compilazione in un container di build isolato impedisce che variabili d'ambiente o strumenti dell'host influenzino l'output.",
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Tamper-Resistant',
              italian: 'Resistente alla manomissione',
              pronunciation: '/ˈtæmpə rɪˈzɪstənt/',
              phonetic: 'TAM-per ri-ZIS-tant',
              example:
                'Storing the provenance metadata in a tamper-resistant transparency log guarantees that no one can alter the record after the fact. = Memorizzare i metadati di provenienza in un log di trasparenza resistente alle manomissioni garantisce che nessuno possa alterare il record dopo il fatto.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Verified Source',
              italian: 'Sorgente verificata',
              pronunciation: '/ˈvɛrɪfaɪd sɔːs/',
              phonetic: 'VE-ri-faid SORS',
              example:
                'The pipeline only builds from verified source commits that have a valid GPG signature from an authorized contributor. = La pipeline compila solo da commit sorgente verificati che hanno una firma GPG valida da un contributore autorizzato.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_supply_chain_3',
          title: 'Sigstore & Cosign / Sigstore e Cosign',
          description: 'Firma keyless di artefatti',
          items: [
            {
              english: 'Sigstore',
              italian: 'Firma open source di artefatti (Sigstore)',
              pronunciation: '/ˈsɪɡstɔː/',
              phonetic: 'SIG-stor',
              example:
                "The open-source Sigstore ecosystem provides keyless signing, a transparency log, and a free certificate authority. = L'ecosistema open-source Sigstore fornisce firma senza chiave, un log di trasparenza e un'autorità di certificazione gratuita.",
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'Sigstore',
            },
            {
              english: 'Cosign',
              italian: 'Cosign (firma di immagini container)',
              pronunciation: '/ˈkəʊsaɪn/',
              phonetic: 'KO-sain',
              example:
                "After building the release artifact, the CI pipeline uses Cosign to attach a keyless signature verified by Fulcio and Rekor. = Dopo aver costruito l'artefatto di rilascio, la pipeline CI usa Cosign per allegare una firma senza chiave verificata da Fulcio e Rekor.",
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'Cosign',
              command: 'cosign sign --key cosign.key myimage',
            },
            {
              english: 'Fulcio',
              italian: 'CA per certificati effimeri Sigstore (Fulcio)',
              pronunciation: '/ˈfʊltʃiəʊ/',
              phonetic: 'FUL-cio',
              example:
                "During keyless signing, Fulcio issues a short-lived certificate tied to the developer's OIDC identity. = Durante la firma senza chiave, Fulcio emette un certificato a breve durata legato all'identità OIDC dello sviluppatore.",
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'Fulcio',
            },
            {
              english: 'Rekor',
              italian: 'Log trasparente Sigstore (Rekor)',
              pronunciation: '/ˈrɛkɔː/',
              phonetic: 'RE-kor',
              example:
                'Every signature entry recorded in Rekor creates an immutable audit trail that anyone can independently verify. = Ogni voce di firma registrata in Rekor crea una traccia di audit immutabile che chiunque può verificare indipendentemente.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'Rekor',
              note: 'Transparency log immutabile.',
            },
            {
              english: 'Keyless Signing',
              italian: 'Firma senza chiavi',
              pronunciation: '/ˈkiːləs ˈsaɪnɪŋ/',
              phonetic: 'KI-les SAI-ning',
              example:
                'With keyless signing, there are no long-lived private keys to protect, because certificates expire within minutes. = Con la firma senza chiave, non ci sono chiavi private a lunga durata da proteggere, perché i certificati scadono in pochi minuti.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              command: 'cosign sign myimage  # OIDC flow',
            },
            {
              english: 'Transparency Log',
              italian: 'Log di trasparenza',
              pronunciation: '/trænˈspærənsi lɒɡ/',
              phonetic: 'tran-SPA-ren-si LOG',
              example:
                "Publishing every build attestation to a transparency log lets external auditors verify the integrity of released artifacts. = Pubblicare ogni attestazione di build in un log di trasparenza permette agli auditor esterni di verificare l'integrità degli artefatti rilasciati.",
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'in-toto',
              italian: 'Framework supply chain (in-toto)',
              pronunciation: '/ɪn ˈtəʊtəʊ/',
              phonetic: 'IN-TO-to',
              example:
                'Using the in-toto framework, each step of the build pipeline produces a signed link metadata file for verification. = Usando il framework in-toto, ogni passo della pipeline di build produce un file di metadati link firmato per la verifica.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'in-toto',
            },
            {
              english: 'Provenance Attestation',
              italian: 'Attestazione di provenienza',
              pronunciation: '/ˈprɒvənəns ˌætɛˈsteɪʃən/',
              phonetic: 'PRO-ve-nans a-tes-TEI-scion',
              example:
                "The GitHub Actions workflow generates a provenance attestation automatically for every container image pushed to the registry. = Il workflow GitHub Actions genera un'attestazione di provenienza automaticamente per ogni immagine container pushata nel registry.",
              context: 'supply-chain',
              difficulty: 'intermediate',
              command: 'cosign attest --predicate prov.json',
            },
            {
              english: 'Verify Signature',
              italian: 'Verificare la firma',
              pronunciation: '/ˈvɛrɪfaɪ ˈsɪɡnətʃər/',
              phonetic: 'VE-ri-fai SIG-na-cer',
              example:
                'Before deploying, the admission webhook runs cosign to verify the signature against the stored public key. = Prima del deploy, il webhook di ammissione esegue cosign per verificare la firma contro la chiave pubblica memorizzata.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              command: 'cosign verify --certificate-identity ...',
            },
            {
              english: 'Policy Controller',
              italian: 'Controllore di policy',
              pronunciation: '/ˈpɒləsi kənˈtrəʊlə/',
              phonetic: 'PO-li-si kon-TRO-ler',
              example:
                'The Sigstore policy controller rejects any pod whose image lacks a valid signature matching the configured trust policy. = Il policy controller di Sigstore rifiuta qualsiasi pod la cui immagine manca di una firma valida corrispondente alla policy di fiducia configurata.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'Sigstore Policy Controller',
            },
          ],
        },
        {
          id: 'dso_supply_chain_4',
          title: 'Supply Chain in CI / Supply Chain in CI',
          description: 'Pratiche reali di hardening',
          items: [
            {
              english: 'GitHub Provenance',
              italian: 'Provenance di GitHub',
              pronunciation: '/ˈɡɪthʌb ˈprɒvənəns/',
              phonetic: 'GHIT-hab PRO-ve-nans',
              example:
                'Enabling GitHub Provenance on the release workflow attaches SLSA Level 3 provenance to every published npm package. = Abilitare GitHub Provenance sul workflow di rilascio allega la provenienza SLSA Livello 3 a ogni pacchetto npm pubblicato.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'slsa-github-generator',
            },
            {
              english: 'Pinned Action',
              italian: 'Azione pinnata',
              pronunciation: '/pɪnd ˈækʃən/',
              phonetic: 'PIND AK-scion',
              example:
                'Replacing a tag reference with a pinned action SHA prevents an upstream compromise from hijacking your CI workflow. = Sostituire un riferimento a tag con uno SHA di azione pinnata impedisce a un compromesso upstream di dirottare il workflow CI.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              code: 'uses: actions/checkout@8f4b7f8...',
            },
            {
              english: 'Lockfile Maintenance',
              italian: 'Manutenzione del lockfile',
              pronunciation: '/ˈlɒkfaɪl ˈmeɪntənəns/',
              phonetic: 'LOK-fail MEIN-te-nans',
              example:
                'Automated lockfile maintenance updates dependency hashes weekly, catching any digest mismatch that could indicate tampering. = La manutenzione automatica del lockfile aggiorna gli hash delle dipendenze settimanalmente, intercettando qualsiasi mismatch di digest che potrebbe indicare manomissione.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Mirror Repository',
              italian: 'Repository mirror',
              pronunciation: '/ˈmɪrə rɪˈpɒzɪtəri/',
              phonetic: 'MI-ror ri-PO-zi-to-ri',
              example:
                'Cloning critical dependencies into a mirror repository protects the build from upstream deletion or registry outages. = Clonare le dipendenze critiche in un repository mirror protegge la build dalla cancellazione upstream o dai disservizi del registry.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Signed Commit',
              italian: 'Commit firmato',
              pronunciation: '/saɪnd kəˈmɪt/',
              phonetic: 'SAIND ko-MIT',
              example:
                'Requiring every signed commit on the main branch proves that an authorized developer authored each change. = Richiedere ogni commit firmato sul branch main dimostra che uno sviluppatore autorizzato ha creato ogni modifica.',
              context: 'supply-chain',
              difficulty: 'intermediate',
              command: 'git commit -S -m "msg"',
            },
            {
              english: 'GPG Key',
              italian: 'Chiave GPG',
              pronunciation: '/dʒiː piː dʒiː kiː/',
              phonetic: 'GI-PI-GI KI',
              example:
                'Each developer registers a GPG key with GitHub so their commits show a verified badge in the commit log. = Ogni sviluppatore registra una chiave GPG con GitHub così i loro commit mostrano un badge verificato nel log dei commit.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'OpenSSF',
              italian: 'Open Source Security Foundation (OpenSSF)',
              pronunciation: '/ˈəʊpən ɛs ɛs ɛf/',
              phonetic: 'O-pen-ES-ES-EF',
              example:
                "The OpenSSF community develops best practices and tooling to help secure the entire open-source software ecosystem. = La comunità OpenSSF sviluppa best practice e strumenti per contribuire a proteggere l'intero ecosistema software open-source.",
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'OpenSSF',
              note: 'Open Source Security Foundation.',
            },
            {
              english: 'Scorecard',
              italian: 'Valutazione progetti open source (OpenSSF Scorecard)',
              pronunciation: '/ˈskɔːkɑːd/',
              phonetic: 'SKOR-kard',
              example:
                "Running the OpenSSF Scorecard on our project revealed that branch protection and fuzzing tests were not configured. = Eseguire l'OpenSSF Scorecard sul nostro progetto ha rivelato che la protezione dei branch e i test di fuzzing non erano configurati.",
              context: 'supply-chain',
              difficulty: 'intermediate',
              tool: 'OpenSSF Scorecard',
              command: 'scorecard --repo=github.com/foo/bar',
            },
            {
              english: 'Sealed Build',
              italian: 'Build sigillata',
              pronunciation: '/siːld bɪld/',
              phonetic: 'SILD BILD',
              example:
                'Producing a sealed build ensures that no network calls or untracked files can influence the final binary. = Produrre una build sigillata assicura che nessuna chiamata di rete o file non tracciato possa influenzare il binario finale.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
            {
              english: 'Reproducibility Audit',
              italian: 'Audit di riproducibilità',
              pronunciation: '/ˌriːprəˌdjuːsəˈbɪləti ˈɔːdɪt/',
              phonetic: 'ri-pro-diu-si-BI-li-ti O-dit',
              example:
                'An independent reproducibility audit confirmed that our container images can be rebuilt from source with identical hashes. = Un audit di riproducibilità indipendente ha confermato che le nostre immagini container possono essere ricostruite dal sorgente con hash identici.',
              context: 'supply-chain',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 10 - COMPLIANCE AS CODE
    // ════════════════════════════════════════════════
    10: {
      name: 'Conformità come Codice / Compliance as Code',
      description: 'InSpec, audit automatici, raccolta evidenze',
      lessons: [
        {
          id: 'dso_compliance_as_code_1',
          title: 'Compliance Basics / Basi di Conformità',
          description: 'Concetti chiave di conformità',
          items: [
            {
              english: 'Compliance as Code',
              italian: 'Conformità come codice',
              pronunciation: '/kəmˈplaɪəns æz kəʊd/',
              phonetic: 'kom-PLAI-ans AZ-KOUD',
              example:
                'Expressing all regulatory requirements as compliance as code lets the CI pipeline enforce them on every commit. = Esprimere tutti i requisiti normativi come compliance as code permette alla pipeline CI di imporli ad ogni commit.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Control',
              italian: 'Controllo',
              pronunciation: '/kənˈtrəʊl/',
              phonetic: 'kon-TROL',
              example:
                'Each security control maps to a specific test in the InSpec profile that runs automatically during the pipeline. = Ogni controllo di sicurezza corrisponde a un test specifico nel profilo InSpec che gira automaticamente durante la pipeline.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Framework',
              italian: 'Impalcatura di sviluppo (framework)',
              pronunciation: '/ˈfreɪmwɜːk/',
              phonetic: 'FREIM-uork',
              example:
                'Choosing the right compliance framework like NIST or CIS depends on industry requirements and customer expectations. = Scegliere il framework di compliance giusto come NIST o CIS dipende dai requisiti del settore e dalle aspettative dei clienti.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Audit',
              italian: 'Verifica di conformità (audit)',
              pronunciation: '/ˈɔːdɪt/',
              phonetic: 'O-dit',
              example:
                "Preparing for the annual audit requires gathering evidence that each security control operated effectively throughout the year. = Prepararsi per l'audit annuale richiede la raccolta di evidenze che ogni controllo di sicurezza abbia operato efficacemente durante tutto l'anno.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Evidence',
              italian: 'Evidenza',
              pronunciation: '/ˈɛvɪdəns/',
              phonetic: 'E-vi-dens',
              example:
                'Automated evidence collection captures screenshots, logs, and scan results to satisfy auditor requests in minutes. = La raccolta automatica di evidenze cattura screenshot, log e risultati delle scansioni per soddisfare le richieste degli auditor in pochi minuti.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Attestation',
              italian: 'Attestazione',
              pronunciation: '/ˌætɛˈsteɪʃən/',
              phonetic: 'a-tes-TEI-scion',
              example:
                "Attaching a signed attestation to the container image proves it passed all required security scans before release. = Allegare un'attestazione firmata all'immagine container dimostra che ha superato tutte le scansioni di sicurezza richieste prima del rilascio.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Auditor',
              italian: 'Revisore (auditor)',
              pronunciation: '/ˈɔːdɪtə/',
              phonetic: 'O-di-tor',
              example:
                'External auditors review reports yearly. = Gli auditor esterni rivedono i report ogni anno.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Continuous Compliance',
              italian: 'Conformità continua',
              pronunciation: '/kənˈtɪnjʊəs kəmˈplaɪəns/',
              phonetic: 'kon-TI-nius kom-PLAI-ans',
              example:
                'With continuous compliance, every infrastructure change is validated against CIS benchmarks before it reaches production. = Con la compliance continua, ogni modifica infrastrutturale è validata contro i benchmark CIS prima di raggiungere la produzione.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Risk Register',
              italian: 'Registro dei rischi',
              pronunciation: '/rɪsk ˈrɛdʒɪstə/',
              phonetic: 'RISK RE-gi-ster',
              example:
                'The CISO reviews the risk register quarterly to reassess each entry and update mitigation strategies. = Il CISO revisiona il registro dei rischi trimestralmente per rivalutare ogni voce e aggiornare le strategie di mitigazione.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Remediation Plan',
              italian: 'Piano di rimedio',
              pronunciation: '/rɪˌmiːdiˈeɪʃən plæn/',
              phonetic: 'ri-mi-di-EI-scion PLAN',
              example:
                'Every critical audit finding must have a remediation plan with an assigned owner and a target completion date. = Ogni finding critico di audit deve avere un piano di remediation con un responsabile assegnato e una data di completamento obiettivo.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_compliance_as_code_2',
          title: 'InSpec & Tools / InSpec e Strumenti',
          description: 'Framework di test di conformità',
          items: [
            {
              english: 'InSpec',
              italian: 'InSpec (framework compliance Chef)',
              pronunciation: '/ˈɪnspɛk/',
              phonetic: 'IN-spek',
              example:
                'Writing compliance checks as InSpec profiles lets the team execute them locally and in the CI pipeline identically. = Scrivere i controlli di compliance come profili InSpec permette al team di eseguirli localmente e nella pipeline CI in modo identico.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
              tool: 'Chef InSpec',
              command: 'inspec exec my-profile',
            },
            {
              english: 'Chef Compliance',
              italian: 'Suite compliance Chef (Chef Compliance)',
              pronunciation: '/ʃɛf kəmˈplaɪəns/',
              phonetic: 'CIEF kom-PLAI-ans',
              example:
                "Integrating Chef Compliance into the deployment pipeline continuously validates server hardening across the fleet. = Integrare Chef Compliance nella pipeline di deployment valida continuamente l'hardening dei server in tutta la flotta.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
              tool: 'Chef Compliance',
            },
            {
              english: 'OpenSCAP',
              italian: 'OpenSCAP (auditing automatico standard SCAP)',
              pronunciation: '/ˈəʊpənskæp/',
              phonetic: 'O-pen-skap',
              example:
                'The nightly OpenSCAP scan evaluates every Red Hat server against the DISA STIG security baseline. = La scansione OpenSCAP notturna valuta ogni server Red Hat contro la baseline di sicurezza DISA STIG.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
              tool: 'OpenSCAP',
              command: 'oscap xccdf eval --profile cis',
            },
            {
              english: 'Compliance Operator',
              italian: 'Operator OpenShift di compliance (Compliance Operator)',
              pronunciation: '/kəmˈplaɪəns ˈɒpəreɪtə/',
              phonetic: 'kom-PLAI-ans O-pe-rei-ter',
              example:
                'The Compliance Operator on OpenShift continuously evaluates cluster nodes against CIS Kubernetes benchmarks. = Il Compliance Operator su OpenShift valuta continuamente i nodi del cluster contro i benchmark CIS Kubernetes.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
              tool: 'OpenShift Compliance Operator',
            },
            {
              english: 'Cloud Custodian',
              italian: 'Cloud Custodian (governance cloud open source)',
              pronunciation: '/klaʊd kʌˈstəʊdiən/',
              phonetic: 'KLAUD kas-TO-dian',
              example:
                "We use Cloud Custodian policies to automatically tag, stop, or delete non-compliant AWS resources after hours. = Usiamo le policy di Cloud Custodian per taggare, fermare o eliminare automaticamente le risorse AWS non conformi dopo l'orario lavorativo.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
              tool: 'Cloud Custodian',
            },
            {
              english: 'Drata',
              italian: 'Drata (piattaforma compliance automatizzata)',
              pronunciation: '/ˈdrɑːtə/',
              phonetic: 'DRA-ta',
              example:
                'Connecting all our tools to Drata automates evidence collection for SOC 2 and ISO 27001 certifications. = Collegare tutti i nostri strumenti a Drata automatizza la raccolta di evidenze per le certificazioni SOC 2 e ISO 27001.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
              tool: 'Drata',
            },
            {
              english: 'Vanta',
              italian: 'Vanta (piattaforma compliance automatizzata)',
              pronunciation: '/ˈvæntə/',
              phonetic: 'VAN-ta',
              example:
                'The compliance dashboard in Vanta shows real-time progress toward meeting every SOC 2 Trust Service Criterion. = La dashboard di compliance in Vanta mostra in tempo reale il progresso verso il soddisfacimento di ogni criterio del servizio fiduciario SOC 2.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
              tool: 'Vanta',
            },
            {
              english: 'Tugboat Logic',
              italian: 'Piattaforma compliance OneTrust (Tugboat Logic)',
              pronunciation: '/ˈtʌɡbəʊt ˈlɒdʒɪk/',
              phonetic: 'TAG-bout LO-gik',
              example:
                "After the acquisition by OneTrust, Tugboat Logic became the platform for managing our compliance program end to end. = Dopo l'acquisizione da parte di OneTrust, Tugboat Logic è diventato la piattaforma per gestire il nostro programma di compliance end to end.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
              tool: 'Tugboat Logic',
            },
            {
              english: 'Profile',
              italian: 'Profilo',
              pronunciation: '/ˈprəʊfaɪl/',
              phonetic: 'PRO-fail',
              example:
                'The CIS Level 2 profile contains stricter controls than Level 1 and is required for systems handling sensitive data. = Il profilo CIS Livello 2 contiene controlli più rigidi del Livello 1 ed è richiesto per i sistemi che gestiscono dati sensibili.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Baseline',
              italian: 'Valore di riferimento (baseline)',
              pronunciation: '/ˈbeɪslaɪn/',
              phonetic: 'BEIS-lain',
              example:
                "Establishing a security baseline for all new servers ensures consistent hardening across the entire infrastructure. = Stabilire una baseline di sicurezza per tutti i nuovi server assicura un hardening coerente in tutta l'infrastruttura.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_compliance_as_code_3',
          title: 'Evidence Collection / Raccolta Evidenze',
          description: 'Automatizzare la raccolta delle evidenze',
          items: [
            {
              english: 'Evidence Collection',
              italian: 'Raccolta evidenze',
              pronunciation: '/ˈɛvɪdəns kəˈlɛkʃən/',
              phonetic: 'E-vi-dens ko-LEK-scion',
              example:
                "Automated evidence collection pulls configuration snapshots, scan reports, and access logs for the annual audit. = La raccolta automatica di evidenze preleva snapshot di configurazione, report di scansione e log di accesso per l'audit annuale.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Audit Trail',
              italian: 'Tracciato di audit',
              pronunciation: '/ˈɔːdɪt treɪl/',
              phonetic: 'O-dit TREIL',
              example:
                'An immutable audit trail records every administrative action so investigators can reconstruct the timeline of any incident. = Una traccia di audit immutabile registra ogni azione amministrativa così gli investigatori possono ricostruire la timeline di qualsiasi incidente.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
              tool: 'AWS CloudTrail',
            },
            {
              english: 'Immutable Logs',
              italian: 'Log immutabili',
              pronunciation: '/ɪˈmjuːtəbl lɒɡz/',
              phonetic: 'i-MIU-ta-bol LOGS',
              example:
                'Shipping logs to a write-once storage bucket creates immutable logs that attackers cannot delete or modify. = Inviare i log a un bucket di storage write-once crea log immutabili che gli attaccanti non possono eliminare o modificare.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Snapshot',
              italian: 'Istantanea',
              pronunciation: '/ˈsnæpʃɒt/',
              phonetic: 'SNAP-sciot',
              example:
                'Taking a daily configuration snapshot of every cloud account provides a baseline for drift detection. = Acquisire uno snapshot di configurazione giornaliero di ogni account cloud fornisce una baseline per il rilevamento del drift.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Control Mapping',
              italian: 'Mappatura dei controlli',
              pronunciation: '/kənˈtrəʊl ˈmæpɪŋ/',
              phonetic: 'kon-TROL MA-ping',
              example:
                'The control mapping spreadsheet links each NIST 800-53 control to the specific InSpec test that validates it. = Il foglio di mappatura dei controlli collega ogni controllo NIST 800-53 al test InSpec specifico che lo valida.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'CIS Benchmark',
              italian: 'Benchmark CIS',
              pronunciation: '/siː aɪ ɛs ˈbɛntʃmɑːk/',
              phonetic: 'SI-AI-ES BENCH-mark',
              example:
                'Running the CIS Benchmark against production servers revealed that SSH root login was still permitted on twelve hosts. = Eseguire il CIS Benchmark sui server di produzione ha rivelato che il login SSH root era ancora permesso su dodici host.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'NIST 800-53',
              italian: 'Catalogo di controlli di sicurezza (NIST 800-53)',
              pronunciation: '/nɪst eɪt hʌndrəd fɪfti θriː/',
              phonetic: 'NIST EIT-HAN-dred FIF-ti-TRI',
              example:
                'Federal contractors must map their security controls to NIST 800-53 families like Access Control and Incident Response. = I contractor federali devono mappare i loro controlli di sicurezza alle famiglie NIST 800-53 come Controllo degli Accessi e Risposta agli Incidenti.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'OSCAL',
              italian: 'Open Security Controls Assessment Language (OSCAL)',
              pronunciation: '/ˈɒskəl/',
              phonetic: 'OS-kal',
              example:
                'Expressing the system security plan in OSCAL format enables automated validation against multiple compliance frameworks. = Esprimere il piano di sicurezza del sistema in formato OSCAL abilita la validazione automatica contro più framework di compliance.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
              note: 'Open Security Controls Assessment Language.',
            },
            {
              english: 'Continuous Monitoring',
              italian: 'Monitoraggio continuo',
              pronunciation: '/kənˈtɪnjʊəs ˈmɒnɪtərɪŋ/',
              phonetic: 'kon-TI-nius MO-ni-to-ring',
              example:
                'With continuous monitoring in place, any drift from the approved security baseline triggers an alert within minutes. = Con il monitoraggio continuo in atto, qualsiasi drift dalla baseline di sicurezza approvata attiva un avviso entro pochi minuti.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Self-Service Audit',
              italian: 'Audit self-service',
              pronunciation: '/sɛlf ˈsɜːvɪs ˈɔːdɪt/',
              phonetic: 'SELF SER-vis O-dit',
              example:
                "Developers can run a self-service audit report from the internal portal to check their service's compliance posture. = Gli sviluppatori possono eseguire un report di audit self-service dal portale interno per verificare la postura di compliance del loro servizio.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_compliance_as_code_4',
          title: 'Compliance Pipelines / Pipeline di Conformità',
          description: 'Compliance integrata in CI/CD',
          items: [
            {
              english: 'Compliance Pipeline',
              italian: 'Pipeline di conformità',
              pronunciation: '/kəmˈplaɪəns ˈpaɪplaɪn/',
              phonetic: 'kom-PLAI-ans PAIP-lain',
              example:
                'The compliance pipeline runs InSpec profiles, collects evidence, and uploads results to Drata after every deployment. = La pipeline di compliance esegue profili InSpec, raccoglie evidenze e carica i risultati su Drata dopo ogni deployment.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Tagging Standard',
              italian: 'Standard di tagging',
              pronunciation: '/ˈtæɡɪŋ ˈstændəd/',
              phonetic: 'TA-ghing STAN-dard',
              example:
                "Enforcing a consistent tagging standard on all cloud resources enables accurate cost allocation and security auditing. = Imporre uno standard di tagging coerente su tutte le risorse cloud abilita un'allocazione accurata dei costi e un audit di sicurezza.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Drift Report',
              italian: 'Report di deriva',
              pronunciation: '/drɪft rɪˈpɔːt/',
              phonetic: 'DRIFT ri-PORT',
              example:
                'The weekly drift report highlighted three EC2 instances whose security groups had been manually widened. = Il report di drift settimanale ha evidenziato tre istanze EC2 i cui security group erano stati ampliati manualmente.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Policy Library',
              italian: 'Libreria di policy',
              pronunciation: '/ˈpɒləsi ˈlaɪbrəri/',
              phonetic: 'PO-li-si LAI-bra-ri',
              example:
                'The central policy library contains over two hundred tested Rego rules shared across all engineering teams. = La libreria di policy centrale contiene oltre duecento regole Rego testate condivise tra tutti i team di ingegneria.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Mandatory Field',
              italian: 'Campo obbligatorio',
              pronunciation: '/ˈmændətəri fiːld/',
              phonetic: 'MAN-da-to-ri FILD',
              example:
                'The deployment form enforces a mandatory field for the risk level so that no release ships without a risk classification. = Il modulo di deployment impone un campo obbligatorio per il livello di rischio così che nessun rilascio parta senza classificazione del rischio.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Change Ticket',
              italian: 'Ticket di modifica',
              pronunciation: '/tʃeɪndʒ ˈtɪkɪt/',
              phonetic: 'CIEINGG TI-ket',
              example:
                "Every infrastructure modification requires a change ticket that links the pull request, approver, and rollback plan. = Ogni modifica infrastrutturale richiede un change ticket che collega la pull request, l'approvatore e il piano di rollback.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Approval Trail',
              italian: 'Tracciato di approvazioni',
              pronunciation: '/əˈpruːvl treɪl/',
              phonetic: 'a-PRU-val TREIL',
              example:
                'The approval trail proves that two senior engineers reviewed and approved the production database migration. = La traccia di approvazione dimostra che due ingegneri senior hanno revisionato e approvato la migrazione del database di produzione.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Soft Fail',
              italian: 'Fallimento morbido',
              pronunciation: '/sɒft feɪl/',
              phonetic: 'SOFT FEIL',
              example:
                "Configuring the new policy check as a soft fail gives teams time to fix violations before enforcement begins. = Configurare il nuovo controllo di policy come soft fail dà ai team il tempo di correggere le violazioni prima che inizi l'enforcement.",
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Hard Fail',
              italian: 'Fallimento duro',
              pronunciation: '/hɑːd feɪl/',
              phonetic: 'HARD FEIL',
              example:
                'After the grace period, switching to hard fail blocks any pipeline that violates the encryption-at-rest requirement. = Dopo il periodo di grazia, passare a hard fail blocca qualsiasi pipeline che viola il requisito di crittografia a riposo.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
            {
              english: 'Compliance Dashboard',
              italian: 'Dashboard di conformità',
              pronunciation: '/kəmˈplaɪəns ˈdæʃbɔːd/',
              phonetic: 'kom-PLAI-ans DASH-bord',
              example:
                'The executive compliance dashboard displays the percentage of controls passing across all business units. = La dashboard di compliance esecutiva mostra la percentuale di controlli superati in tutte le business unit.',
              context: 'compliance-as-code',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 11 - CLOUD SECURITY POSTURE
    // ════════════════════════════════════════════════
    11: {
      name: 'Postura di Sicurezza Cloud / Cloud Security Posture',
      description: 'CSPM, CWPP e gestione postura cloud',
      lessons: [
        {
          id: 'dso_cloud_security_1',
          title: 'CSPM Foundations / Fondamenti CSPM',
          description: 'Cloud Security Posture Management',
          items: [
            {
              english: 'CSPM',
              italian: 'Cloud Security Posture Management (CSPM)',
              pronunciation: '/siː ɛs piː ɛm/',
              phonetic: 'SI-ES-PI-EM',
              example:
                'Deploying a CSPM tool across all three cloud accounts revealed forty-seven publicly accessible storage buckets. = Deployare uno strumento CSPM su tutti e tre gli account cloud ha rivelato quarantasette bucket di storage accessibili pubblicamente.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              note: 'Cloud Security Posture Management.',
            },
            {
              english: 'CWPP',
              italian: 'Cloud Workload Protection Platform (CWPP)',
              pronunciation: '/siː dʌbljuː piː piː/',
              phonetic: 'SI-DABL-IU-PI-PI',
              example:
                "The CWPP agent monitors runtime behavior and blocks any workload that attempts to download unauthorized executables. = L'agente CWPP monitora il comportamento a runtime e blocca qualsiasi workload che tenta di scaricare eseguibili non autorizzati.",
              context: 'cloud-security',
              difficulty: 'intermediate',
              note: 'Cloud Workload Protection Platform.',
            },
            {
              english: 'CNAPP',
              italian: 'Cloud-Native Application Protection Platform (CNAPP)',
              pronunciation: '/siː ɛn eɪ piː piː/',
              phonetic: 'SI-EN-EI-PI-PI',
              example:
                'Consolidating CSPM, CWPP, and CIEM into a single CNAPP platform reduced tool sprawl and unified our cloud security view. = Consolidare CSPM, CWPP e CIEM in una singola piattaforma CNAPP ha ridotto la proliferazione di strumenti e unificato la nostra vista di sicurezza cloud.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              note: 'Cloud-Native Application Protection Platform.',
            },
            {
              english: 'Public Bucket',
              italian: 'Bucket pubblico',
              pronunciation: '/ˈpʌblɪk ˈbʌkɪt/',
              phonetic: 'PA-blik BA-ket',
              example:
                'The automated guardrail immediately reverts any S3 bucket ACL change that would create a public bucket. = Il guardrail automatico reverte immediatamente qualsiasi modifica ACL a un bucket S3 che creerebbe un bucket pubblico.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Open Port',
              italian: 'Porta aperta',
              pronunciation: '/ˈəʊpən pɔːt/',
              phonetic: 'OU-pen PORT',
              example:
                "The CSPM scan flagged an open port on the RDS instance that should only accept connections from the application VPC. = La scansione CSPM ha segnalato una porta aperta sull'istanza RDS che dovrebbe accettare connessioni solo dal VPC dell'applicazione.",
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Excessive Permission',
              italian: 'Permesso eccessivo',
              pronunciation: '/ɪkˈsɛsɪv pəˈmɪʃən/',
              phonetic: 'ek-SES-siv per-MI-scion',
              example:
                "An IAM analyzer report identified eight roles with excessive permission grants that violated least-privilege policy. = Un report dell'analizzatore IAM ha identificato otto ruoli con concessioni di permessi eccessivi che violavano la policy del privilegio minimo.",
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Stale Resource',
              italian: 'Risorsa obsoleta',
              pronunciation: '/steɪl rɪˈzɔːs/',
              phonetic: 'STEIL ri-ZORS',
              example:
                'Cloud Custodian automatically terminates any stale resource that has been idle for more than thirty days. = Cloud Custodian termina automaticamente qualsiasi risorsa inutilizzata che è stata inattiva per più di trenta giorni.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Posture Score',
              italian: 'Punteggio di postura',
              pronunciation: '/ˈpɒstʃə skɔː/',
              phonetic: 'POS-cer SKOR',
              example:
                'Our cloud posture score improved from sixty-two to ninety-one percent after remediating all critical misconfigurations. = Il nostro punteggio di postura cloud è migliorato dal sessantadue al novantuno percento dopo aver rimediato tutte le misconfigurazioni critiche.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Inventory',
              italian: 'Inventario',
              pronunciation: '/ˈɪnvəntəri/',
              phonetic: 'IN-ven-to-ri',
              example:
                'A comprehensive cloud inventory lists every compute instance, database, and storage bucket across all regions. = Un inventario cloud completo elenca ogni istanza di calcolo, database e bucket di storage in tutte le regioni.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Multi-Cloud',
              italian: 'Uso di più provider cloud (multi-cloud)',
              pronunciation: '/ˈmʌlti klaʊd/',
              phonetic: 'MAL-ti KLAUD',
              example:
                'Operating in a multi-cloud environment requires normalizing security policies across AWS, Azure, and GCP. = Operare in un ambiente multi-cloud richiede la normalizzazione delle policy di sicurezza tra AWS, Azure e GCP.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_cloud_security_2',
          title: 'CSPM Tools / Strumenti CSPM',
          description: 'Soluzioni commerciali e open source',
          items: [
            {
              english: 'Prisma Cloud',
              italian: 'Prisma Cloud (CNAPP Palo Alto)',
              pronunciation: '/ˈprɪzmə klaʊd/',
              phonetic: 'PRIZ-ma KLAUD',
              example:
                "After deploying Prisma Cloud, the security team gained a single pane of glass for vulnerability and compliance status. = Dopo aver deployato Prisma Cloud, il team di sicurezza ha ottenuto un'unica vista per lo stato di vulnerabilità e compliance.",
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'Palo Alto Prisma Cloud',
            },
            {
              english: 'Wiz',
              italian: 'Wiz (CNAPP cloud-native)',
              pronunciation: '/wɪz/',
              phonetic: 'UIZ',
              example:
                'The agentless scanning capability in Wiz maps every cloud workload and highlights toxic permission combinations. = La capacità di scansione senza agente di Wiz mappa ogni workload cloud ed evidenzia combinazioni tossiche di permessi.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'Wiz',
            },
            {
              english: 'Lacework',
              italian: 'Lacework (CNAPP)',
              pronunciation: '/ˈleɪswɜːk/',
              phonetic: 'LEIS-uork',
              example:
                "Behavioral analysis in Lacework detected an anomalous data exfiltration pattern from a production database at midnight. = L'analisi comportamentale in Lacework ha rilevato un pattern anomalo di esfiltrazione dati da un database di produzione a mezzanotte.",
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'Lacework',
            },
            {
              english: 'Orca Security',
              italian: 'Orca Security (CNAPP agentless)',
              pronunciation: '/ˈɔːkə sɪˈkjʊərəti/',
              phonetic: 'OR-ka si-KIU-ri-ti',
              example:
                "Using Orca Security, the team discovered an unpatched Log4j instance running on a forgotten development server. = Usando Orca Security, il team ha scoperto un'istanza Log4j non patchata in esecuzione su un server di sviluppo dimenticato.",
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'Orca Security',
            },
            {
              english: 'AWS Security Hub',
              italian: 'AWS Security Hub (centralizza alert sicurezza AWS)',
              pronunciation: '/eɪ dʌbljuː ɛs sɪˈkjʊərəti hʌb/',
              phonetic: 'EI-DABL-IU-ES si-KIU-ri-ti HAB',
              example:
                'Aggregating findings from GuardDuty, Inspector, and Macie into AWS Security Hub provides a consolidated security view. = Aggregare i finding da GuardDuty, Inspector e Macie in AWS Security Hub fornisce una vista di sicurezza consolidata.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'AWS Security Hub',
            },
            {
              english: 'GCP Security Command Center',
              italian: 'GCP Security Command Center (centralizza sicurezza GCP)',
              pronunciation: '/dʒiː siː piː sɪˈkjʊərəti kəˈmɑːnd ˈsɛntə/',
              phonetic: 'GI-SI-PI si-KIU-ri-ti ko-MAND SEN-ter',
              example:
                'Enabling premium tier in GCP Security Command Center adds threat detection and vulnerability scanning for all projects. = Abilitare il livello premium in GCP Security Command Center aggiunge rilevamento minacce e scansione vulnerabilità per tutti i progetti.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'GCP Security Command Center',
            },
            {
              english: 'Microsoft Defender for Cloud',
              italian: 'Microsoft Defender for Cloud (CNAPP Azure)',
              pronunciation: '/ˈmaɪkrəʊsɒft dɪˈfɛndə fɔː klaʊd/',
              phonetic: 'MAI-kro-soft di-FEN-der FOR KLAUD',
              example:
                'Turning on Microsoft Defender for Cloud provides workload protection and regulatory compliance dashboards for Azure subscriptions. = Attivare Microsoft Defender for Cloud fornisce protezione dei workload e dashboard di compliance normativa per le sottoscrizioni Azure.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'Microsoft Defender for Cloud',
            },
            {
              english: 'Steampipe',
              italian: 'Steampipe (query SQL su API cloud)',
              pronunciation: '/ˈstiːmpaɪp/',
              phonetic: 'STIM-paip',
              example:
                'Writing SQL queries in Steampipe lets you audit IAM policies, open ports, and encryption status across all cloud providers. = Scrivere query SQL in Steampipe permette di auditare policy IAM, porte aperte e stato della crittografia in tutti i provider cloud.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'Steampipe',
              command: 'steampipe query "select * from aws_s3_bucket"',
            },
            {
              english: 'Prowler',
              italian: 'Prowler (audit AWS/Azure/GCP open source)',
              pronunciation: '/ˈpraʊlər/',
              phonetic: 'PRAU-ler',
              example:
                'Scheduling nightly Prowler scans provides a daily compliance report against CIS benchmarks for every AWS account. = Programmare scansioni Prowler notturne fornisce un report di compliance giornaliero contro i benchmark CIS per ogni account AWS.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'Prowler',
              command: 'prowler aws --severity HIGH',
            },
            {
              english: 'ScoutSuite',
              italian: 'ScoutSuite (audit multi-cloud)',
              pronunciation: '/skaʊt swiːt/',
              phonetic: 'SKAUT SUIT',
              example:
                'Running ScoutSuite against our Azure subscription identified twenty-three storage accounts without private endpoints. = Eseguire ScoutSuite sulla nostra sottoscrizione Azure ha identificato ventitré account di storage senza endpoint privati.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'ScoutSuite',
              command: 'scout aws',
            },
          ],
        },
        {
          id: 'dso_cloud_security_3',
          title: 'IAM in the Cloud / IAM nel Cloud',
          description: 'Identità e privilegi nel cloud',
          items: [
            {
              english: 'IAM',
              italian: 'Identity and Access Management (IAM)',
              pronunciation: '/aɪ eɪ ɛm/',
              phonetic: 'AI-EI-EM',
              example:
                'Properly configuring IAM roles and policies is the single most important step for securing any cloud environment. = Configurare correttamente ruoli e policy IAM è il singolo passo più importante per proteggere qualsiasi ambiente cloud.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              note: 'Identity and Access Management.',
            },
            {
              english: 'Role',
              italian: 'Ruolo',
              pronunciation: '/rəʊl/',
              phonetic: 'ROUL',
              example:
                'Creating a dedicated deployment role with only the required permissions prevents developers from exceeding their access. = Creare un ruolo di deployment dedicato con solo i permessi necessari impedisce agli sviluppatori di eccedere il loro accesso.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Permission Boundary',
              italian: 'Confine di permessi',
              pronunciation: '/pəˈmɪʃən ˈbaʊndəri/',
              phonetic: 'per-MI-scion BAUN-da-ri',
              example:
                'Attaching a permission boundary to the developer IAM role caps the maximum privileges they can self-assign. = Allegare un permission boundary al ruolo IAM dello sviluppatore limita i privilegi massimi che possono auto-assegnarsi.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Service Control Policy',
              italian: 'Policy di controllo servizio',
              pronunciation: '/ˈsɜːvɪs kənˈtrəʊl ˈpɒləsi/',
              phonetic: 'SER-vis kon-TROL PO-li-si',
              example:
                "The organization root applies a service control policy that blocks all regions except eu-west-1 for data sovereignty. = La root dell'organizzazione applica una service control policy che blocca tutte le regioni tranne eu-west-1 per la sovranità dei dati.",
              context: 'cloud-security',
              difficulty: 'intermediate',
              note: 'AWS Organizations SCPs.',
            },
            {
              english: 'Just-Enough-Access',
              italian: 'Accesso strettamente necessario',
              pronunciation: '/dʒʌst ˈɪnʌf ˈæksɛs/',
              phonetic: 'GIAST I-naf AK-ses',
              example:
                'Implementing just-enough-access means each Lambda function can only read from its own DynamoDB table. = Implementare il just-enough-access significa che ogni funzione Lambda può solo leggere dalla propria tabella DynamoDB.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'IAM Access Analyzer',
              italian: 'Analizzatore accessi AWS (IAM Access Analyzer)',
              pronunciation: '/aɪ eɪ ɛm ˈæksɛs ˈænəlaɪzə/',
              phonetic: 'AI-EI-EM AK-ses A-na-lai-zer',
              example:
                'Running IAM Access Analyzer weekly reveals any resource policy that grants unintended cross-account access. = Eseguire IAM Access Analyzer settimanalmente rivela qualsiasi policy di risorsa che concede accesso cross-account non intenzionale.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'AWS IAM Access Analyzer',
            },
            {
              english: 'Privilege Escalation Path',
              italian: 'Percorso di escalation privilegi',
              pronunciation: '/ˈprɪvəlɪdʒ ˌɛskəˈleɪʃən pɑːθ/',
              phonetic: 'PRI-vi-legg es-ka-LEI-scion PATH',
              example:
                'The red team exploited a privilege escalation path through an over-permissioned Lambda role that could modify IAM policies. = Il red team ha sfruttato un percorso di escalation dei privilegi tramite un ruolo Lambda con troppi permessi che poteva modificare policy IAM.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Cross-Account Access',
              italian: 'Accesso cross-account',
              pronunciation: '/krɒs əˈkaʊnt ˈæksɛs/',
              phonetic: 'KROS a-KAUNT AK-ses',
              example:
                "We set up cross-account access with an external ID condition to prevent confused deputy attacks between AWS accounts. = Abbiamo configurato l'accesso cross-account con una condizione di external ID per prevenire attacchi confused deputy tra account AWS.",
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'MFA',
              italian: 'Autenticazione multi-fattore',
              pronunciation: '/ɛm ɛf eɪ/',
              phonetic: 'EM-EF-EI',
              example:
                "Enforcing MFA on all IAM console users reduced account takeover incidents to zero in the last twelve months. = Imporre l'MFA su tutti gli utenti IAM della console ha ridotto gli incidenti di furto account a zero negli ultimi dodici mesi.",
              context: 'cloud-security',
              difficulty: 'intermediate',
              note: 'Multi-Factor Authentication.',
            },
            {
              english: 'PIM',
              italian: 'Privileged Identity Management (PIM)',
              pronunciation: '/pɪm/',
              phonetic: 'PIM',
              example:
                'Azure Privileged Identity Management requires engineers to activate their admin role through an approval workflow. = Azure Privileged Identity Management richiede agli ingegneri di attivare il loro ruolo admin tramite un workflow di approvazione.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              note: 'Privileged Identity Management.',
            },
          ],
        },
        {
          id: 'dso_cloud_security_4',
          title: 'Cloud Hardening / Hardening Cloud',
          description: 'Pratiche di hardening multi-cloud',
          items: [
            {
              english: 'Encryption at Rest',
              italian: 'Cifratura a riposo',
              pronunciation: '/ɪnˈkrɪpʃən æt rɛst/',
              phonetic: 'in-KRIP-scion AT REST',
              example:
                'Enabling encryption at rest on every database and storage bucket is a mandatory control for PCI-DSS compliance. = Abilitare la crittografia a riposo su ogni database e bucket di storage è un controllo obbligatorio per la compliance PCI-DSS.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Encryption in Transit',
              italian: 'Cifratura in transito',
              pronunciation: '/ɪnˈkrɪpʃən ɪn ˈtrænzɪt/',
              phonetic: 'in-KRIP-scion IN TRAN-zit',
              example:
                'Enforcing TLS 1.3 for all internal service-to-service calls guarantees encryption in transit across the mesh. = Imporre TLS 1.3 per tutte le chiamate interne servizio-a-servizio garantisce la crittografia in transito attraverso la mesh.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Customer-Managed Key',
              italian: 'Chiave gestita dal cliente',
              pronunciation: '/ˈkʌstəmə ˈmænɪdʒd kiː/',
              phonetic: 'KAS-to-mer MA-ni-ged KI',
              example:
                'Switching to a customer-managed key for S3 encryption gives the security team full control over key rotation and access. = Passare a una chiave gestita dal cliente per la crittografia S3 dà al team di sicurezza pieno controllo su rotazione e accesso alla chiave.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              note: 'Customer-Managed Key (CMK).',
            },
            {
              english: 'VPC Endpoint',
              italian: 'Endpoint VPC',
              pronunciation: '/viː piː siː ˈɛndpɔɪnt/',
              phonetic: 'VI-PI-SI END-point',
              example:
                "Routing S3 traffic through a VPC endpoint keeps data within the AWS backbone and avoids public internet exposure. = Instradare il traffico S3 attraverso un VPC endpoint mantiene i dati nel backbone AWS ed evita l'esposizione su internet pubblico.",
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Private Subnet',
              italian: 'Subnet privata',
              pronunciation: '/ˈpraɪvət ˈsʌbnɛt/',
              phonetic: 'PRAI-vet SAB-net',
              example:
                'All application servers reside in a private subnet with no internet gateway, accessible only through the load balancer. = Tutti i server applicativi risiedono in una sottorete privata senza internet gateway, accessibili solo attraverso il load balancer.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Bastion Host',
              italian: 'Host bastione',
              pronunciation: '/ˈbæstiən həʊst/',
              phonetic: 'BAS-tion HOST',
              example:
                'Replacing the persistent bastion host with Session Manager eliminated the need to manage SSH keys entirely. = Sostituire il bastion host persistente con Session Manager ha eliminato completamente la necessità di gestire le chiavi SSH.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Session Manager',
              italian: 'Accesso shell sicuro AWS (Session Manager)',
              pronunciation: '/ˈsɛʃən ˈmænɪdʒər/',
              phonetic: 'SE-scion MA-ni-ger',
              example:
                'Using AWS Session Manager provides encrypted shell access to instances without opening any inbound SSH port. = Usare AWS Session Manager fornisce accesso shell crittografato alle istanze senza aprire alcuna porta SSH in ingresso.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'AWS Systems Manager',
            },
            {
              english: 'GuardDuty',
              italian: 'Rilevatore minacce AWS (AWS GuardDuty)',
              pronunciation: '/ɡɑːd ˈdjuːti/',
              phonetic: 'GARD DIU-ti',
              example:
                'When AWS GuardDuty detected unusual API calls from a new IP range, it triggered an automated isolation workflow. = Quando AWS GuardDuty ha rilevato chiamate API insolite da un nuovo range IP, ha attivato un workflow di isolamento automatico.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'AWS GuardDuty',
            },
            {
              english: 'Logging Centralization',
              italian: 'Centralizzazione dei log',
              pronunciation: '/ˈlɒɡɪŋ ˌsɛntrəlaɪˈzeɪʃən/',
              phonetic: 'LO-ghing sen-tra-lai-ZEI-scion',
              example:
                'Shipping all VPC flow logs, CloudTrail events, and application logs to a central SIEM enables cross-service correlation. = Inviare tutti i log dei flussi VPC, gli eventi CloudTrail e i log applicativi a un SIEM centrale abilita la correlazione cross-servizio.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Account Baselining',
              italian: 'Baseline degli account',
              pronunciation: '/əˈkaʊnt ˈbeɪslaɪnɪŋ/',
              phonetic: 'a-KAUNT BEIS-lai-ning',
              example:
                "After account baselining, any new IAM role creation or region activation triggers an automatic security review. = Dopo il baselining dell'account, qualsiasi nuova creazione di ruolo IAM o attivazione di regione attiva una revisione di sicurezza automatica.",
              context: 'cloud-security',
              difficulty: 'intermediate',
              tool: 'AWS Control Tower',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 12 - THREAT MODELING
    // ════════════════════════════════════════════════
    12: {
      name: 'Modellazione delle Minacce / Threat Modeling',
      description: 'STRIDE, PASTA, MITRE ATT&CK e analisi minacce',
      lessons: [
        {
          id: 'dso_threat_modeling_1',
          title: 'Threat Modeling Basics / Basi del Threat Modeling',
          description: 'Concetti e processo',
          items: [
            {
              english: 'Threat Modeling',
              italian: 'Modellazione delle minacce',
              pronunciation: '/θrɛt ˈmɒdlɪŋ/',
              phonetic: 'THRET MOD-ling',
              example:
                'Starting every feature with a threat modeling session ensures the team identifies risks before writing any code. = Iniziare ogni feature con una sessione di threat modeling assicura che il team identifichi i rischi prima di scrivere qualsiasi codice.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Asset',
              italian: 'Risorsa da proteggere (asset)',
              pronunciation: '/ˈæsɛt/',
              phonetic: 'AS-set',
              example:
                'The threat model begins by listing every asset worth protecting, from customer PII to internal API keys. = Il threat model inizia elencando ogni asset che vale la pena proteggere, dai dati personali dei clienti alle chiavi API interne.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Threat Actor',
              italian: 'Attore di minaccia',
              pronunciation: '/θrɛt ˈæktə/',
              phonetic: 'THRET AK-ter',
              example:
                'Understanding the motivations of each threat actor helps prioritize defenses against the most likely attack scenarios. = Comprendere le motivazioni di ogni threat actor aiuta a dare priorità alle difese contro gli scenari di attacco più probabili.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Attack Surface',
              italian: 'Superficie di attacco',
              pronunciation: '/əˈtæk ˈsɜːfəs/',
              phonetic: 'a-TAK SER-fis',
              example:
                'Reducing the attack surface by closing unused ports and removing debug endpoints is the first hardening step. = Ridurre la superficie di attacco chiudendo porte inutilizzate e rimuovendo endpoint di debug è il primo passo di hardening.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Attack Tree',
              italian: 'Albero di attacco',
              pronunciation: '/əˈtæk triː/',
              phonetic: 'a-TAK TRI',
              example:
                "The security architect drew an attack tree showing every possible path from the public API to the database. = L'architetto di sicurezza ha disegnato un albero di attacco mostrando ogni possibile percorso dall'API pubblica al database.",
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Trust Boundary',
              italian: 'Confine di fiducia',
              pronunciation: '/trʌst ˈbaʊndəri/',
              phonetic: 'TRAST BAUN-da-ri',
              example:
                'Defining a clear trust boundary between the CI runner and the production cluster limits lateral movement in case of breach. = Definire un confine di fiducia chiaro tra il runner CI e il cluster di produzione limita il movimento laterale in caso di violazione.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Risk',
              italian: 'Rischio',
              pronunciation: '/rɪsk/',
              phonetic: 'RISK',
              example:
                'The team rated each risk by likelihood and impact, then focused resources on the top five entries. = Il team ha valutato ogni rischio per probabilità e impatto, poi ha concentrato le risorse sulle prime cinque voci.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Mitigation',
              italian: 'Mitigazione',
              pronunciation: '/ˌmɪtɪˈɡeɪʃən/',
              phonetic: 'mi-ti-GHEI-scion',
              example:
                'The recommended mitigation for the SSRF threat was adding an allowlist of permitted internal IP ranges. = La mitigazione raccomandata per la minaccia SSRF era aggiungere una allowlist di range IP interni consentiti.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Whiteboarding Session',
              italian: 'Sessione di lavagna',
              pronunciation: '/ˈwaɪtbɔːdɪŋ ˈsɛʃən/',
              phonetic: 'UAIT-bor-ding SE-scion',
              example:
                'During the whiteboarding session, engineers sketched data flows and identified three unprotected trust boundaries. = Durante la sessione alla lavagna, gli ingegneri hanno schematizzato i flussi dati e identificato tre confini di fiducia non protetti.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Threat Catalog',
              italian: 'Catalogo di minacce',
              pronunciation: '/θrɛt ˈkætəlɒɡ/',
              phonetic: 'THRET KA-ta-log',
              example:
                'Maintaining an internal threat catalog lets new teams reuse known threat patterns without starting from scratch. = Mantenere un catalogo di minacce interno permette ai nuovi team di riutilizzare pattern di minaccia noti senza partire da zero.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dso_threat_modeling_2',
          title: 'STRIDE & PASTA / STRIDE e PASTA',
          description: 'Metodologie classiche',
          items: [
            {
              english: 'STRIDE',
              italian: 'Framework di threat modeling Microsoft (STRIDE)',
              pronunciation: '/straɪd/',
              phonetic: 'STRAID',
              example:
                'Applying the STRIDE framework to the payment microservice revealed spoofing and tampering risks in the API gateway. = Applicare il framework STRIDE al microservizio di pagamento ha rivelato rischi di spoofing e manomissione nel gateway API.',
              context: 'shift-left',
              difficulty: 'intermediate',
              note: 'Spoofing, Tampering, Repudiation, Info disclosure, DoS, Elevation.',
            },
            {
              english: 'Spoofing',
              italian: 'Impersonificazione (spoofing)',
              pronunciation: '/ˈspuːfɪŋ/',
              phonetic: 'SPU-fing',
              example:
                "Without mutual TLS, a malicious service could perform spoofing by impersonating the identity of a trusted upstream. = Senza TLS reciproco, un servizio malevolo potrebbe effettuare spoofing impersonando l'identità di un upstream fidato.",
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Tampering',
              italian: 'Manomissione',
              pronunciation: '/ˈtæmpərɪŋ/',
              phonetic: 'TAM-pe-ring',
              example:
                'Signing every message with HMAC prevents tampering attacks that modify data in transit between microservices. = Firmare ogni messaggio con HMAC previene attacchi di tampering che modificano i dati in transito tra microservizi.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Repudiation',
              italian: 'Ripudio',
              pronunciation: '/rɪˌpjuːdiˈeɪʃən/',
              phonetic: 'ri-piu-di-EI-scion',
              example:
                'Immutable audit logs counter repudiation by proving exactly who performed each action and when. = I log di audit immutabili contrastano la ripudiabilità dimostrando esattamente chi ha eseguito ogni azione e quando.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Information Disclosure',
              italian: 'Divulgazione di informazioni',
              pronunciation: '/ˌɪnfəˈmeɪʃən dɪsˈkləʊʒə/',
              phonetic: 'in-for-MEI-scion dis-KLO-ger',
              example:
                'Returning full stack traces in API error responses creates an information disclosure risk that attackers exploit for reconnaissance. = Restituire tracce di stack complete nelle risposte di errore API crea un rischio di divulgazione di informazioni che gli attaccanti sfruttano per la ricognizione.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Denial of Service',
              italian: 'Negazione del servizio',
              pronunciation: '/dɪˈnaɪəl əv ˈsɜːvɪs/',
              phonetic: 'di-NAI-al OV SER-vis',
              example:
                "Rate limiting and request-size caps protect the API from a denial of service attack that overwhelms backend resources. = Il rate limiting e i limiti sulla dimensione delle richieste proteggono l'API da un attacco di denial of service che sovraccarica le risorse backend.",
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Elevation of Privilege',
              italian: 'Elevazione di privilegio',
              pronunciation: '/ˌɛlɪˈveɪʃən əv ˈprɪvəlɪdʒ/',
              phonetic: 'e-li-VEI-scion OV PRI-vi-legg',
              example:
                "The pentester achieved elevation of privilege by exploiting a missing authorization check on the admin settings endpoint. = Il pentester ha ottenuto l'elevazione dei privilegi sfruttando un controllo di autorizzazione mancante sull'endpoint delle impostazioni admin.",
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'PASTA',
              italian: 'Process for Attack Simulation (PASTA)',
              pronunciation: '/ˈpæstə/',
              phonetic: 'PAS-ta',
              example:
                "Following the PASTA methodology, the team simulated real attack scenarios against the e-commerce checkout flow. = Seguendo la metodologia PASTA, il team ha simulato scenari di attacco reali contro il flusso di checkout dell'e-commerce.",
              context: 'shift-left',
              difficulty: 'intermediate',
              note: 'Process for Attack Simulation and Threat Analysis.',
            },
            {
              english: 'LINDDUN',
              italian: 'Threat modeling per privacy (LINDDUN)',
              pronunciation: '/ˈlɪndʌn/',
              phonetic: 'LIN-dan',
              example:
                'Applying the LINDDUN framework to the health data platform identified privacy risks related to linkability and identifiability. = Applicare il framework LINDDUN alla piattaforma di dati sanitari ha identificato rischi di privacy legati alla collegabilità e identificabilità.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'DREAD',
              italian: 'Framework di rating delle minacce (DREAD)',
              pronunciation: '/drɛd/',
              phonetic: 'DRED',
              example:
                'Scoring each threat with the DREAD model helped the team focus on the vulnerability with the highest damage potential. = Valutare ogni minaccia con il modello DREAD ha aiutato il team a concentrarsi sulla vulnerabilità con il più alto potenziale di danno.',
              context: 'shift-left',
              difficulty: 'intermediate',
              note: 'Damage, Reproducibility, Exploitability, Affected, Discoverability.',
            },
          ],
        },
        {
          id: 'dso_threat_modeling_3',
          title: 'MITRE & Frameworks / MITRE e Framework',
          description: 'ATT&CK, D3FEND e tassonomie',
          items: [
            {
              english: 'MITRE ATT&CK',
              italian: 'Framework tattiche di attacco (MITRE ATT&CK)',
              pronunciation: '/ˈmaɪtə əˈtæk/',
              phonetic: 'MAI-ter a-TAK',
              example:
                'Mapping detected alerts to MITRE ATT&CK techniques revealed gaps in our coverage of the lateral movement tactic. = Mappare gli avvisi rilevati alle tecniche MITRE ATT&CK ha rivelato lacune nella nostra copertura della tattica di movimento laterale.',
              context: 'shift-left',
              difficulty: 'intermediate',
              tool: 'MITRE ATT&CK',
            },
            {
              english: 'Tactic',
              italian: 'Tattica',
              pronunciation: '/ˈtæktɪk/',
              phonetic: 'TAK-tik',
              example:
                'Each column in the ATT&CK matrix represents a tactic like initial access, persistence, or data exfiltration. = Ogni colonna nella matrice ATT&CK rappresenta una tattica come accesso iniziale, persistenza o esfiltrazione dei dati.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Technique',
              italian: 'Tecnica',
              pronunciation: '/tɛkˈniːk/',
              phonetic: 'tek-NIK',
              example:
                "The attacker used the phishing technique to deliver a malicious document that installed a reverse shell. = L'attaccante ha usato la tecnica di phishing per consegnare un documento malevolo che installava una reverse shell.",
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Sub-Technique',
              italian: 'Sotto-tecnica',
              pronunciation: '/sʌb tɛkˈniːk/',
              phonetic: 'SAB tek-NIK',
              example:
                'Spearphishing via service is a sub-technique under phishing that targets victims through business platforms like LinkedIn. = Lo spearphishing via servizio è una sotto-tecnica del phishing che prende di mira le vittime tramite piattaforme business come LinkedIn.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Procedure',
              italian: 'Procedura',
              pronunciation: '/prəˈsiːdʒə/',
              phonetic: 'pro-SI-ger',
              example:
                "The threat intelligence report detailed the exact procedure used by the APT group, from initial access to data exfiltration. = Il report di threat intelligence ha dettagliato l'esatta procedura usata dal gruppo APT, dall'accesso iniziale all'esfiltrazione dei dati.",
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Kill Chain',
              italian: "Catena dell'attacco (kill chain)",
              pronunciation: '/kɪl tʃeɪn/',
              phonetic: 'KIL CIEIN',
              example:
                "Breaking any link in the kill chain stops the attacker from progressing to the next stage of the intrusion. = Rompere qualsiasi anello della kill chain impedisce all'attaccante di progredire alla fase successiva dell'intrusione.",
              context: 'shift-left',
              difficulty: 'intermediate',
              note: 'Lockheed Martin Cyber Kill Chain.',
            },
            {
              english: 'D3FEND',
              italian: 'Framework di contromisure (MITRE D3FEND)',
              pronunciation: '/dɪˈfɛnd/',
              phonetic: 'di-FEND',
              example:
                'Cross-referencing ATT&CK techniques with MITRE D3FEND identifies specific countermeasures for each known attack pattern. = Incrociare le tecniche ATT&CK con MITRE D3FEND identifica contromisure specifiche per ogni pattern di attacco noto.',
              context: 'shift-left',
              difficulty: 'intermediate',
              tool: 'MITRE D3FEND',
            },
            {
              english: 'Adversary Emulation',
              italian: "Emulazione dell'avversario",
              pronunciation: '/ˈædvəsəri ˌɛmjʊˈleɪʃən/',
              phonetic: 'AD-ver-sa-ri e-miu-LEI-scion',
              example:
                "The purple team ran an adversary emulation exercise based on the FIN7 group's documented TTPs. = Il purple team ha eseguito un esercizio di emulazione dell'avversario basato sulle TTP documentate del gruppo FIN7.",
              context: 'shift-left',
              difficulty: 'intermediate',
              tool: 'Atomic Red Team, Caldera',
            },
            {
              english: 'TTPs',
              italian: 'TTP',
              pronunciation: '/tiː tiː piːz/',
              phonetic: 'TI-TI-PIS',
              example:
                "Understanding the TTPs of a threat group helps defenders build detections tailored to that specific adversary. = Comprendere le TTP di un gruppo di minaccia aiuta i difensori a costruire rilevamenti su misura per quell'avversario specifico.",
              context: 'shift-left',
              difficulty: 'intermediate',
              note: 'Tactics, Techniques, Procedures.',
            },
            {
              english: 'CWE',
              italian: 'Common Weakness Enumeration (CWE)',
              pronunciation: '/siː dʌbljuː iː/',
              phonetic: 'SI-DABL-IU-I',
              example:
                'Linking each SAST finding to its CWE identifier helps developers understand the root cause and apply the correct fix. = Collegare ogni finding SAST al suo identificatore CWE aiuta gli sviluppatori a capire la causa principale e applicare la correzione corretta.',
              context: 'shift-left',
              difficulty: 'intermediate',
              note: 'Common Weakness Enumeration.',
            },
          ],
        },
        {
          id: 'dso_threat_modeling_4',
          title: 'Threat Modeling Tools / Strumenti di TM',
          description: 'Strumenti software per threat modeling',
          items: [
            {
              english: 'Microsoft Threat Modeling Tool',
              italian: 'Strumento threat modeling (Microsoft Threat Modeling Tool)',
              pronunciation: '/ˈmaɪkrəʊsɒft θrɛt ˈmɒdlɪŋ tuːl/',
              phonetic: 'MAI-kro-soft THRET MOD-ling TUL',
              example:
                'Drawing data flow diagrams in the Microsoft Threat Modeling Tool automatically generates a list of STRIDE-based threats. = Disegnare diagrammi di flusso dati nel Microsoft Threat Modeling Tool genera automaticamente un elenco di minacce basate su STRIDE.',
              context: 'shift-left',
              difficulty: 'intermediate',
              tool: 'Microsoft TMT',
            },
            {
              english: 'OWASP Threat Dragon',
              italian: 'Strumento threat modeling open (OWASP Threat Dragon)',
              pronunciation: '/ˈəʊwɒsp θrɛt ˈdræɡən/',
              phonetic: 'O-uosp THRET DRA-gon',
              example:
                'The team uses OWASP Threat Dragon to collaboratively build threat models as part of every design review. = Il team usa OWASP Threat Dragon per costruire collaborativamente modelli di minaccia come parte di ogni revisione del design.',
              context: 'shift-left',
              difficulty: 'intermediate',
              tool: 'OWASP Threat Dragon',
            },
            {
              english: 'IriusRisk',
              italian: 'IriusRisk (piattaforma threat modeling)',
              pronunciation: '/ˈaɪriəsrɪsk/',
              phonetic: 'AI-rius-risk',
              example:
                "Importing the architecture diagram into IriusRisk automatically suggested forty-three threats and twenty-one countermeasures. = Importare il diagramma dell'architettura in IriusRisk ha suggerito automaticamente quarantatré minacce e ventuno contromisure.",
              context: 'shift-left',
              difficulty: 'intermediate',
              tool: 'IriusRisk',
            },
            {
              english: 'pytm',
              italian: 'Threat modeling come codice in Python (pytm)',
              pronunciation: '/paɪ tiː ɛm/',
              phonetic: 'PAI-TI-EM',
              example:
                "Writing the system architecture in pytm generates a data flow diagram and a threat report directly from Python code. = Scrivere l'architettura di sistema in pytm genera un diagramma di flusso dati e un report sulle minacce direttamente dal codice Python.",
              context: 'shift-left',
              difficulty: 'intermediate',
              tool: 'pytm',
              code: 'tm = TM("MyApp")',
            },
            {
              english: 'Data Flow Diagram',
              italian: 'Diagramma di flusso dati',
              pronunciation: '/ˈdeɪtə fləʊ ˈdaɪəɡræm/',
              phonetic: 'DEI-ta FLOU DAI-a-gram',
              example:
                "The data flow diagram clearly shows where encrypted data crosses trust boundaries between the API and the database. = Il diagramma di flusso dati mostra chiaramente dove i dati crittografati attraversano i confini di fiducia tra l'API e il database.",
              context: 'shift-left',
              difficulty: 'intermediate',
              note: 'DFD: Data Flow Diagram.',
            },
            {
              english: 'Architecture Diagram',
              italian: 'Diagramma di architettura',
              pronunciation: '/ˈɑːkɪtɛktʃə ˈdaɪəɡræm/',
              phonetic: 'AR-ki-tek-cer DAI-a-gram',
              example:
                "Reviewing the architecture diagram revealed that the internal queue was accessible from the public subnet. = Revisionare il diagramma dell'architettura ha rivelato che la coda interna era accessibile dalla sottorete pubblica.",
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Abuse Case',
              italian: "Caso d'abuso",
              pronunciation: '/əˈbjuːs keɪs/',
              phonetic: 'a-BIUS KEIS',
              example:
                "Writing an abuse case for the file upload feature revealed that an attacker could upload a web shell disguised as a JPEG. = Scrivere un caso d'abuso per la funzionalità di upload file ha rivelato che un attaccante poteva caricare una web shell mascherata da JPEG.",
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Evil User Story',
              italian: 'User story malvagia',
              pronunciation: '/ˈiːvl ˈjuːzə ˈstɔːri/',
              phonetic: 'I-vol IU-zer STO-ri',
              example:
                "The evil user story read: as an attacker, I want to enumerate valid usernames through the password reset endpoint. = La evil user story recitava: come attaccante, voglio enumerare gli username validi attraverso l'endpoint di reset password.",
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Threat Library',
              italian: 'Libreria di minacce',
              pronunciation: '/θrɛt ˈlaɪbrəri/',
              phonetic: 'THRET LAI-bra-ri',
              example:
                'The centralized threat library contains reusable threat patterns tagged by component type and technology stack. = La libreria di minacce centralizzata contiene pattern di minaccia riutilizzabili taggati per tipo di componente e stack tecnologico.',
              context: 'shift-left',
              difficulty: 'intermediate',
            },
            {
              english: 'Living Threat Model',
              italian: 'Threat model vivo',
              pronunciation: '/ˈlɪvɪŋ θrɛt ˈmɒdl/',
              phonetic: 'LI-ving THRET MOD-el',
              example:
                'Updating the living threat model after every major feature change keeps security assessments current and relevant. = Aggiornare il living threat model dopo ogni cambio importante di feature mantiene le valutazioni di sicurezza attuali e pertinenti.',
              context: 'shift-left',
              difficulty: 'intermediate',
              note: 'Aggiornato a ogni cambio di architettura.',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 13 - SECURITY AUTOMATION / SOAR
    // ════════════════════════════════════════════════
    13: {
      name: 'Automazione della Sicurezza / Security Automation',
      description: 'SOAR, playbook e auto-rimedio',
      lessons: [
        {
          id: 'dso_automation_1',
          title: 'SOAR Foundations / Fondamenti SOAR',
          description: 'Security Orchestration, Automation, Response',
          items: [
            {
              english: 'SOAR',
              italian: 'Security Orchestration, Automation and Response (SOAR)',
              pronunciation: '/sɔː/',
              phonetic: 'SOR',
              example:
                'Integrating our SIEM with a SOAR platform reduced the average incident response time from four hours to under twenty minutes. = Integrare il nostro SIEM con una piattaforma SOAR ha ridotto il tempo medio di risposta agli incidenti da quattro ore a meno di venti minuti.',
              context: 'automation',
              difficulty: 'advanced',
              note: 'Security Orchestration, Automation and Response.',
            },
            {
              english: 'Security Orchestration',
              italian: 'Orchestrazione della sicurezza',
              pronunciation: '/sɪˈkjʊərəti ˌɔːkɪˈstreɪʃən/',
              phonetic: 'si-KIU-ri-ti or-kes-TREI-scion',
              example:
                "Effective security orchestration connects the firewall, SIEM, ticketing system, and Slack into a single automated workflow. = Un'efficace orchestrazione di sicurezza collega il firewall, il SIEM, il sistema di ticketing e Slack in un unico workflow automatizzato.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Playbook',
              italian: 'Piano di risposta (playbook)',
              pronunciation: '/ˈpleɪbʊk/',
              phonetic: 'PLEI-buk',
              example:
                'The phishing response playbook automatically isolates the affected mailbox and queries the SIEM for similar indicators. = Il playbook di risposta al phishing isola automaticamente la casella email coinvolta e interroga il SIEM per indicatori simili.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Runbook',
              italian: 'Procedura operativa (runbook)',
              pronunciation: '/ˈrʌnbʊk/',
              phonetic: 'RAN-buk',
              example:
                'Following the documented runbook for certificate rotation ensures every step is executed consistently across all environments. = Seguire il runbook documentato per la rotazione dei certificati assicura che ogni passo sia eseguito in modo coerente in tutti gli ambienti.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Auto-Remediation',
              italian: 'Rimedio automatico',
              pronunciation: '/ˈɔːtəʊ rɪˌmiːdiˈeɪʃən/',
              phonetic: 'O-to ri-mi-di-EI-scion',
              example:
                "Configuring auto-remediation for public S3 buckets ensures that misconfigured ACLs are reverted within seconds. = Configurare l'auto-remediation per i bucket S3 pubblici assicura che le ACL mal configurate vengano revertite in pochi secondi.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Trigger',
              italian: 'Innesco',
              pronunciation: '/ˈtrɪɡər/',
              phonetic: 'TRI-gher',
              example:
                'We configured a cron trigger to run full dependency scans every night at midnight. = Abbiamo configurato un trigger cron per eseguire scansioni complete delle dipendenze ogni notte a mezzanotte.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Webhook',
              italian: 'Chiamata HTTP automatica (webhook)',
              pronunciation: '/ˈwɛbhʊk/',
              phonetic: 'UEB-huk',
              example:
                'The alerting system sends a webhook to the SOAR platform every time GuardDuty detects an anomalous API call. = Il sistema di alerting invia un webhook alla piattaforma SOAR ogni volta che GuardDuty rileva una chiamata API anomala.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Enrichment',
              italian: 'Arricchimento',
              pronunciation: '/ɪnˈrɪtʃmənt/',
              phonetic: 'in-RI-cement',
              example:
                "The playbook performs enrichment by querying VirusTotal and Shodan to add context to each suspicious IP address. = Il playbook esegue l'arricchimento interrogando VirusTotal e Shodan per aggiungere contesto a ogni indirizzo IP sospetto.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Decision Branch',
              italian: 'Ramo decisionale',
              pronunciation: '/dɪˈsɪʒən brɑːntʃ/',
              phonetic: 'di-SI-gen BRANCH',
              example:
                "A decision branch in the playbook routes high-severity alerts to the incident commander and low ones to the backlog. = Un ramo decisionale nel playbook instrada gli avvisi ad alta severità al comandante dell'incidente e quelli bassi al backlog.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Human-in-the-Loop',
              italian: 'Umano nel ciclo',
              pronunciation: '/ˈhjuːmən ɪn ðə luːp/',
              phonetic: 'HIU-man IN-de-LUP',
              example:
                "Adding a human-in-the-loop step before account suspension prevents false positives from locking out legitimate users. = Aggiungere uno step human-in-the-loop prima della sospensione dell'account impedisce che i falsi positivi blocchino utenti legittimi.",
              context: 'automation',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_automation_2',
          title: 'SOAR Tools / Strumenti SOAR',
          description: 'Splunk SOAR, XSOAR, Tines, Tracecat',
          items: [
            {
              english: 'Splunk SOAR',
              italian: 'Splunk SOAR (piattaforma SOAR)',
              pronunciation: '/splʌŋk sɔː/',
              phonetic: 'SPLANK SOR',
              example:
                'The security team built over fifty custom playbooks in Splunk SOAR to handle alerts from ten different data sources. = Il team di sicurezza ha costruito oltre cinquanta playbook personalizzati in Splunk SOAR per gestire gli avvisi da dieci fonti dati diverse.',
              context: 'automation',
              difficulty: 'advanced',
              tool: 'Splunk SOAR',
            },
            {
              english: 'Cortex XSOAR',
              italian: 'Cortex XSOAR (SOAR Palo Alto)',
              pronunciation: '/ˈkɔːtɛks ɛks sɔː/',
              phonetic: 'KOR-teks EX-SOR',
              example:
                "Migrating to Cortex XSOAR unified our incident management, playbook execution, and case management in one platform. = Migrare a Cortex XSOAR ha unificato la gestione degli incidenti, l'esecuzione dei playbook e la gestione dei casi in una piattaforma.",
              context: 'automation',
              difficulty: 'advanced',
              tool: 'Palo Alto XSOAR',
            },
            {
              english: 'Tines',
              italian: 'Tines (piattaforma SOAR no-code)',
              pronunciation: '/taɪnz/',
              phonetic: 'TAINS',
              example:
                'Building automation workflows in Tines requires no coding, so security analysts can create playbooks independently. = Costruire workflow di automazione in Tines non richiede programmazione, così gli analisti di sicurezza possono creare playbook indipendentemente.',
              context: 'automation',
              difficulty: 'advanced',
              tool: 'Tines',
            },
            {
              english: 'Tracecat',
              italian: 'Tracecat (SOAR open source)',
              pronunciation: '/ˈtreɪskæt/',
              phonetic: 'TREIS-kat',
              example:
                "The open-source Tracecat project provides a lightweight alternative to commercial SOAR platforms for smaller teams. = Il progetto open-source Tracecat fornisce un'alternativa leggera alle piattaforme SOAR commerciali per team più piccoli.",
              context: 'automation',
              difficulty: 'advanced',
              tool: 'Tracecat',
            },
            {
              english: 'Shuffle',
              italian: 'Shuffle (SOAR open source)',
              pronunciation: '/ˈʃʌfl/',
              phonetic: 'SCIA-fol',
              example:
                "Installing Shuffle on-premises allowed the government team to automate incident workflows without sending data externally. = Installare Shuffle on-premises ha permesso al team governativo di automatizzare i workflow degli incidenti senza inviare dati all'esterno.",
              context: 'automation',
              difficulty: 'advanced',
              tool: 'Shuffle',
            },
            {
              english: 'TheHive',
              italian: 'TheHive (piattaforma case management sicurezza)',
              pronunciation: '/ðə haɪv/',
              phonetic: 'DE HAIV',
              example:
                'Every security alert from the SIEM creates a case in TheHive where analysts collaborate on investigation and response. = Ogni avviso di sicurezza dal SIEM crea un caso in TheHive dove gli analisti collaborano su indagine e risposta.',
              context: 'automation',
              difficulty: 'advanced',
              tool: 'TheHive',
            },
            {
              english: 'n8n',
              italian: 'n8n (automazione workflow open source)',
              pronunciation: '/ɛn eɪt ɛn/',
              phonetic: 'EN-EIT-EN',
              example:
                'Using n8n as a workflow engine, we connected Jira, Slack, and PagerDuty to automate the incident notification chain. = Usando n8n come motore di workflow, abbiamo collegato Jira, Slack e PagerDuty per automatizzare la catena di notifica degli incidenti.',
              context: 'automation',
              difficulty: 'advanced',
              tool: 'n8n',
            },
            {
              english: 'Workflow Engine',
              italian: 'Motore di workflow',
              pronunciation: '/ˈwɜːkfləʊ ˈɛndʒɪn/',
              phonetic: 'UORK-flou EN-gin',
              example:
                "The SOAR workflow engine executes each playbook step sequentially and logs the result of every action for audit. = Il motore di workflow SOAR esegue ogni passo del playbook in sequenza e registra il risultato di ogni azione per l'audit.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Connector',
              italian: 'Connettore',
              pronunciation: '/kəˈnɛktə/',
              phonetic: 'ko-NEK-ter',
              example:
                'Installing the AWS connector in the SOAR platform enables playbooks to quarantine EC2 instances automatically. = Installare il connettore AWS nella piattaforma SOAR abilita i playbook a mettere in quarantena le istanze EC2 automaticamente.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Custom Action',
              italian: 'Azione personalizzata',
              pronunciation: '/ˈkʌstəm ˈækʃən/',
              phonetic: 'KAS-tom AK-scion',
              example:
                "The team wrote a custom action that queries the internal CMDB to identify the owner of any compromised asset. = Il team ha scritto un'azione personalizzata che interroga il CMDB interno per identificare il proprietario di qualsiasi asset compromesso.",
              context: 'automation',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_automation_3',
          title: 'Auto-Remediation Patterns / Pattern di Rimedio Automatico',
          description: 'Esempi reali di automazione',
          items: [
            {
              english: 'Quarantine VM',
              italian: 'Mettere in quarantena la VM',
              pronunciation: '/ˈkwɒrəntiːn viː ɛm/',
              phonetic: 'KUO-ran-tin VI-EM',
              example:
                'The automated playbook will quarantine a VM by removing its network interfaces and notifying the security team. = Il playbook automatico metterà in quarantena una VM rimuovendo le sue interfacce di rete e notificando il team di sicurezza.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Revoke Token',
              italian: 'Revocare il token',
              pronunciation: '/rɪˈvəʊk ˈtəʊkən/',
              phonetic: 'ri-VOUK TO-ken',
              example:
                "When the SOAR detects a compromised credential, it triggers a revoke token action across all identity providers. = Quando il SOAR rileva una credenziale compromessa, attiva un'azione di revoca del token su tutti i provider di identità.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Disable User',
              italian: "Disabilitare l'utente",
              pronunciation: '/dɪsˈeɪbl ˈjuːzə/',
              phonetic: 'di-SEI-bol IU-zer',
              example:
                "The compromise playbook can disable a user account in Active Directory within thirty seconds of alert confirmation. = Il playbook di compromissione può disabilitare un account utente in Active Directory entro trenta secondi dalla conferma dell'avviso.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Block IP',
              italian: "Bloccare l'IP",
              pronunciation: '/blɒk aɪ piː/',
              phonetic: 'BLOK AI-PI',
              example:
                "After enrichment confirms the source is malicious, the playbook calls the firewall API to block the IP immediately. = Dopo che l'arricchimento conferma che la sorgente è malevola, il playbook chiama l'API del firewall per bloccare l'IP immediatamente.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Force Password Reset',
              italian: 'Forzare il reset password',
              pronunciation: '/fɔːs ˈpɑːswɜːd ˈriːsɛt/',
              phonetic: 'FORS PAS-uord RI-set',
              example:
                "Detecting credential stuffing against an account triggers a force password reset and sends the user a notification email. = Rilevare il credential stuffing contro un account attiva un reset forzato della password e invia all'utente un'email di notifica.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Snapshot for Forensics',
              italian: 'Snapshot per forense',
              pronunciation: '/ˈsnæpʃɒt fɔː fəˈrɛnsɪks/',
              phonetic: 'SNAP-sciot FOR fo-REN-siks',
              example:
                "Before terminating the compromised instance, the playbook takes a snapshot for forensics so analysts can investigate later. = Prima di terminare l'istanza compromessa, il playbook scatta uno snapshot per la forensica così gli analisti possono investigare dopo.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Notify Channel',
              italian: 'Notificare il canale',
              pronunciation: '/ˈnəʊtɪfaɪ ˈtʃænl/',
              phonetic: 'NO-ti-fai CIAN-nel',
              example:
                "The incident playbook sends a formatted message to notify the channel with alert severity, affected service, and triage steps. = Il playbook dell'incidente invia un messaggio formattato per notificare il canale con severità dell'avviso, servizio coinvolto e passi di triage.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Open Ticket',
              italian: 'Aprire un ticket',
              pronunciation: '/ˈəʊpən ˈtɪkɪt/',
              phonetic: 'OU-pen TI-ket',
              example:
                'For every medium-severity finding, the SOAR creates and assigns a Jira ticket to open a ticket with the responsible team. = Per ogni finding a severità media, il SOAR crea e assegna un ticket Jira per aprire un ticket con il team responsabile.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Rollback Deployment',
              italian: 'Ripristinare il deploy',
              pronunciation: '/ˈrəʊlbæk dɪˈplɔɪmənt/',
              phonetic: 'ROL-bak di-PLOI-ment',
              example:
                'If the canary metrics exceed the error threshold, the automated pipeline will rollback the deployment to the previous version. = Se le metriche canary superano la soglia di errore, la pipeline automatizzata eseguirà il rollback del deployment alla versione precedente.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Quiet Period',
              italian: 'Periodo di quiete',
              pronunciation: '/ˈkwaɪət ˈpɪəriəd/',
              phonetic: 'KUAIET PI-rio-d',
              example:
                'Setting a quiet period of fifteen minutes suppresses duplicate alerts while the team investigates the initial trigger. = Impostare un periodo di quiete di quindici minuti sopprime gli avvisi duplicati mentre il team indaga il trigger iniziale.',
              context: 'automation',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_automation_4',
          title: 'Real Automation / Automazione Reale',
          description: 'ChatOps e infrastrutture self-healing',
          items: [
            {
              english: 'ChatOps',
              italian: 'Operazioni dal canale chat (ChatOps)',
              pronunciation: '/ˈtʃætɒps/',
              phonetic: 'CIAT-ops',
              example:
                "With ChatOps integration, engineers can approve deployments, run scans, and query alerts directly from the Slack channel. = Con l'integrazione ChatOps, gli ingegneri possono approvare deployment, eseguire scansioni e interrogare gli avvisi direttamente dal canale Slack.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Slack Bot',
              italian: 'Bot Slack',
              pronunciation: '/slæk bɒt/',
              phonetic: 'SLAK BOT',
              example:
                'Our custom Slack bot posts a summary of overnight security alerts so the morning shift can triage them immediately. = Il nostro bot Slack personalizzato posta un riepilogo degli avvisi di sicurezza notturni così il turno mattutino può classificarli immediatamente.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Self-Healing System',
              italian: 'Sistema auto-riparante',
              pronunciation: '/sɛlf ˈhiːlɪŋ ˈsɪstəm/',
              phonetic: 'SELF HI-ling SIS-tem',
              example:
                'A self-healing system automatically restarts crashed security agents and notifies the team only if recovery fails. = Un sistema self-healing riavvia automaticamente gli agenti di sicurezza crashati e notifica il team solo se il recovery fallisce.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'GitOps Remediation',
              italian: 'Rimedio GitOps',
              pronunciation: '/ɡɪtɒps rɪˌmiːdiˈeɪʃən/',
              phonetic: 'GHIT-ops ri-mi-di-EI-scion',
              example:
                'When the scanner detects a misconfigured deployment, GitOps remediation opens a pull request with the corrected manifest. = Quando lo scanner rileva un deployment mal configurato, la remediation GitOps apre una pull request con il manifesto corretto.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Canary Deployment',
              italian: 'Deploy canarino',
              pronunciation: '/kəˈnɛəri dɪˈplɔɪmənt/',
              phonetic: 'ka-NE-ri di-PLOI-ment',
              example:
                'Routing five percent of traffic to the canary deployment catches regressions before the change affects all users. = Instradare il cinque percento del traffico al deployment canary intercetta le regressioni prima che la modifica colpisca tutti gli utenti.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Feature Flag',
              italian: 'Interruttore funzionalità (feature flag)',
              pronunciation: '/ˈfiːtʃə flæɡ/',
              phonetic: 'FI-cer FLAG',
              example:
                'Wrapping the new auth module behind a feature flag lets the team disable it instantly if a vulnerability is found. = Avvolgere il nuovo modulo di autenticazione dietro un feature flag permette al team di disabilitarlo istantaneamente se viene trovata una vulnerabilità.',
              context: 'automation',
              difficulty: 'advanced',
              tool: 'LaunchDarkly, Unleash',
            },
            {
              english: 'Backpressure',
              italian: 'Contropressione',
              pronunciation: '/ˈbækˌprɛʃə/',
              phonetic: 'BAK-pre-scer',
              example:
                'Implementing backpressure in the log pipeline prevents the SIEM from being overwhelmed during traffic spikes. = Implementare la backpressure nella pipeline di log impedisce che il SIEM venga sopraffatto durante i picchi di traffico.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Idempotent Action',
              italian: 'Azione idempotente',
              pronunciation: '/aɪˈdɛmpəʊtənt ˈækʃən/',
              phonetic: 'AI-dem-po-tent AK-scion',
              example:
                "Making every remediation step an idempotent action ensures that retrying a failed playbook does not cause side effects. = Rendere ogni passo di remediation un'azione idempotente assicura che riprovare un playbook fallito non causi effetti collaterali.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Retry Logic',
              italian: 'Logica di retry',
              pronunciation: '/rɪˈtraɪ ˈlɒdʒɪk/',
              phonetic: 'ri-TRAI LO-gik',
              example:
                'The connector uses exponential backoff retry logic to handle transient API failures from the ticketing system. = Il connettore usa una logica di retry con backoff esponenziale per gestire i fallimenti API transitori dal sistema di ticketing.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Audit Hook',
              italian: 'Hook di audit',
              pronunciation: '/ˈɔːdɪt hʊk/',
              phonetic: 'O-dit HUK',
              example:
                'Every automated action passes through an audit hook that writes the who, what, and when to an immutable log. = Ogni azione automatizzata passa attraverso un hook di audit che scrive chi, cosa e quando in un log immutabile.',
              context: 'automation',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 14 - API SECURITY
    // ════════════════════════════════════════════════
    14: {
      name: 'Sicurezza delle API / API Security',
      description: 'Gateway, OAuth, JWT, OWASP API Top 10',
      lessons: [
        {
          id: 'dso_tools_api_1',
          title: 'API Gateway / API Gateway',
          description: 'Gateway, rate limit e quote',
          items: [
            {
              english: 'API Gateway',
              italian: 'Gateway delle API (API Gateway)',
              pronunciation: '/eɪ piː aɪ ˈɡeɪtweɪ/',
              phonetic: 'EI-PI-AI GHEIT-uei',
              example:
                'Placing an API gateway in front of all microservices centralizes authentication, rate limiting, and request logging. = Posizionare un API gateway davanti a tutti i microservizi centralizza autenticazione, rate limiting e logging delle richieste.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Kong, AWS API Gateway, Apigee',
            },
            {
              english: 'Rate Limiting',
              italian: 'Limitazione del tasso',
              pronunciation: '/reɪt ˈlɪmɪtɪŋ/',
              phonetic: 'REIT LI-mi-ting',
              example:
                'Configuring rate limiting at one hundred requests per minute per client prevents brute-force and scraping attacks. = Configurare il rate limiting a cento richieste al minuto per client previene attacchi di brute-force e scraping.',
              context: 'tools',
              difficulty: 'advanced',
              code: 'limit_req zone=api burst=10;',
            },
            {
              english: 'Quota',
              italian: 'Limite di utilizzo (quota)',
              pronunciation: '/ˈkwəʊtə/',
              phonetic: 'KUO-ta',
              example:
                'Each API consumer receives a monthly quota of one million calls, enforced by the gateway with real-time counters. = Ogni consumatore API riceve una quota mensile di un milione di chiamate, imposta dal gateway con contatori in tempo reale.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Throttling',
              italian: 'Strozzamento',
              pronunciation: '/ˈθrɒtlɪŋ/',
              phonetic: 'THROT-ling',
              example:
                'When a client exceeds the rate limit, the gateway applies throttling and returns HTTP 429 with a retry-after header. = Quando un client supera il rate limit, il gateway applica il throttling e restituisce HTTP 429 con un header retry-after.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Schema Validation',
              italian: 'Validazione di schema',
              pronunciation: '/ˈskiːmə ˌvælɪˈdeɪʃən/',
              phonetic: 'SKI-ma va-li-DEI-scion',
              example:
                'Enabling strict schema validation on the gateway rejects any request with unexpected fields or incorrect data types. = Abilitare la validazione schema rigorosa sul gateway rifiuta qualsiasi richiesta con campi inattesi o tipi di dati errati.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'OpenAPI Spec',
              italian: 'Specifica OpenAPI',
              pronunciation: '/ˈəʊpənˌeɪpiː spɛk/',
              phonetic: 'O-pen-EI-PI SPEK',
              example:
                'Generating security tests from the OpenAPI spec ensures that every documented endpoint is covered by DAST scans. = Generare test di sicurezza dalla specifica OpenAPI assicura che ogni endpoint documentato sia coperto da scansioni DAST.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'OpenAPI, Swagger',
            },
            {
              english: 'Mutual TLS',
              italian: 'TLS mutuo',
              pronunciation: '/ˈmjuːtʃʊəl tiː ɛl ɛs/',
              phonetic: 'MIU-ciual TI-EL-ES',
              example:
                "Enforcing mutual TLS between the API gateway and backend services prevents unauthorized internal callers. = Imporre il TLS reciproco tra l'API gateway e i servizi backend previene chiamanti interni non autorizzati.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'WAF Rule',
              italian: 'Regola WAF',
              pronunciation: '/wɒf ruːl/',
              phonetic: 'UOF RUL',
              example:
                'A custom WAF rule blocks requests containing SQL injection patterns in the query string and request body. = Una regola WAF personalizzata blocca le richieste contenenti pattern di SQL injection nella query string e nel corpo della richiesta.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Request Inspection',
              italian: 'Ispezione delle richieste',
              pronunciation: '/rɪˈkwɛst ɪnˈspɛkʃən/',
              phonetic: 'ri-KUEST in-SPEK-scion',
              example:
                "Deep request inspection at the gateway layer catches malicious payloads that simple header checks would miss. = L'ispezione profonda delle richieste al livello del gateway intercetta payload malevoli che semplici controlli sugli header non troverebbero.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'API Catalog',
              italian: 'Catalogo API',
              pronunciation: '/eɪ piː aɪ ˈkætəlɒɡ/',
              phonetic: 'EI-PI-AI KA-ta-log',
              example:
                'Maintaining a complete API catalog helps the security team audit every endpoint and identify shadow or orphan APIs. = Mantenere un catalogo API completo aiuta il team di sicurezza a verificare ogni endpoint e identificare API ombra o orfane.',
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_tools_api_2',
          title: 'OAuth & JWT / OAuth e JWT',
          description: 'Standard di autenticazione e autorizzazione',
          items: [
            {
              english: 'OAuth 2.0',
              italian: 'Protocollo di autorizzazione (OAuth 2.0)',
              pronunciation: '/əʊɒθ tuː pɔɪnt əʊ/',
              phonetic: 'O-OTH TU-POINT-O',
              example:
                "All third-party integrations authenticate through OAuth 2.0 authorization code flow with PKCE to prevent token interception. = Tutte le integrazioni di terze parti si autenticano tramite il flusso di codice di autorizzazione OAuth 2.0 con PKCE per prevenire l'intercettazione dei token.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'OIDC',
              italian: 'OpenID Connect (OIDC)',
              pronunciation: '/əʊ aɪ diː siː/',
              phonetic: 'O-AI-DI-SI',
              example:
                "Using OIDC for single sign-on lets the application verify the user identity without managing passwords directly. = Usare OIDC per il single sign-on permette all'applicazione di verificare l'identità dell'utente senza gestire le password direttamente.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'OpenID Connect.',
            },
            {
              english: 'JWT',
              italian: 'JSON Web Token (JWT)',
              pronunciation: '/dʒɒt/',
              phonetic: 'GIOT',
              example:
                'Validating the JWT signature and expiration on every request prevents token forgery and replay attacks. = Validare la firma e la scadenza del JWT a ogni richiesta previene la contraffazione dei token e gli attacchi di replay.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'JSON Web Token.',
            },
            {
              english: 'Access Token',
              italian: 'Token di accesso',
              pronunciation: '/ˈæksɛs ˈtəʊkən/',
              phonetic: 'AK-ses TO-ken',
              example:
                'The CI pipeline exchanges an OIDC claim for a short-lived access token that can only read the artifact registry. = La pipeline CI scambia un claim OIDC per un access token a breve durata che può solo leggere il registry degli artefatti.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Refresh Token',
              italian: 'Token di refresh',
              pronunciation: '/rɪˈfrɛʃ ˈtəʊkən/',
              phonetic: 'ri-FRESH TO-ken',
              example:
                'Storing the refresh token in an HttpOnly cookie prevents client-side JavaScript from accessing it. = Memorizzare il refresh token in un cookie HttpOnly impedisce al JavaScript lato client di accedervi.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Scope',
              italian: 'Ambito',
              pronunciation: '/skəʊp/',
              phonetic: 'SKOUP',
              example:
                "Defining a clear scope for the engagement prevents testers from accidentally disrupting production services. = Definire uno scope chiaro per l'impegno impedisce ai tester di interrompere accidentalmente i servizi in produzione.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'PKCE',
              italian: 'Proof Key for Code Exchange (PKCE)',
              pronunciation: '/ˈpɪksi/',
              phonetic: 'PIK-si',
              example:
                'Adding PKCE to the OAuth flow prevents authorization code interception attacks on mobile and SPA clients. = Aggiungere PKCE al flusso OAuth previene attacchi di intercettazione del codice di autorizzazione su client mobile e SPA.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Proof Key for Code Exchange.',
            },
            {
              english: 'Token Introspection',
              italian: 'Introspezione del token',
              pronunciation: '/ˈtəʊkən ˌɪntrəˈspɛkʃən/',
              phonetic: 'TO-ken in-tro-SPEK-scion',
              example:
                "Calling the token introspection endpoint on every request ensures revoked tokens are rejected in real time. = Chiamare l'endpoint di token introspection a ogni richiesta assicura che i token revocati vengano rifiutati in tempo reale.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'JWKS',
              italian: 'JSON Web Key Set (JWKS)',
              pronunciation: '/dʒɒt ˈkiːz/',
              phonetic: 'GIOT-KIS',
              example:
                "The API gateway fetches the latest signing keys from the JWKS endpoint to validate tokens without a shared secret. = L'API gateway scarica le ultime chiavi di firma dall'endpoint JWKS per validare i token senza un segreto condiviso.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'JSON Web Key Set.',
            },
            {
              english: 'mTLS Auth',
              italian: 'Autenticazione mTLS',
              pronunciation: '/ɛm tiː ɛl ɛs ɔːθ/',
              phonetic: 'EM-TI-EL-ES OTH',
              example:
                "Configuring mTLS authentication ensures that only clients with a valid certificate issued by our CA can call the API. = Configurare l'autenticazione mTLS assicura che solo i client con un certificato valido emesso dalla nostra CA possano chiamare l'API.",
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_tools_api_3',
          title: 'OWASP API Top 10 / OWASP API Top 10',
          description: 'Vulnerabilità tipiche delle API',
          items: [
            {
              english: 'BOLA',
              italian: 'Broken Object Level Authorization (BOLA)',
              pronunciation: '/ˈbəʊlə/',
              phonetic: 'BO-la',
              example:
                "The pentester exploited a BOLA vulnerability by changing the order ID in the URL to access another customer's data. = Il pentester ha sfruttato una vulnerabilità BOLA cambiando l'ID dell'ordine nell'URL per accedere ai dati di un altro cliente.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'Broken Object Level Authorization.',
            },
            {
              english: 'Broken Authentication',
              italian: 'Autenticazione rotta',
              pronunciation: '/ˈbrəʊkən ɔːˌθɛntɪˈkeɪʃən/',
              phonetic: 'BROU-ken o-ten-ti-KEI-scion',
              example:
                'Weak session management led to a broken authentication flaw where session tokens never expired after logout. = Una gestione debole delle sessioni ha portato a una falla di autenticazione non funzionante dove i token di sessione non scadevano mai dopo il logout.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'BOPLA',
              italian: 'Broken Object Property Level Authorization (BOPLA)',
              pronunciation: '/ˈbɒplə/',
              phonetic: 'BO-pla',
              example:
                'The BOPLA vulnerability allowed a regular user to modify the is_admin property by including it in the update request body. = La vulnerabilità BOPLA permetteva a un utente normale di modificare la proprietà is_admin includendola nel corpo della richiesta di aggiornamento.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Broken Object Property Level Authorization.',
            },
            {
              english: 'Unrestricted Resource',
              italian: 'Risorsa senza limiti',
              pronunciation: '/ˌʌnrɪˈstrɪktɪd rɪˈzɔːs/',
              phonetic: 'an-ri-STRIK-ted ri-ZORS',
              example:
                'An unrestricted resource endpoint let attackers request millions of records in a single query, causing a denial of service. = Un endpoint con risorsa senza restrizioni permetteva agli attaccanti di richiedere milioni di record in una singola query, causando un denial of service.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Mass Assignment',
              italian: 'Assegnazione di massa',
              pronunciation: '/mæs əˈsaɪnmənt/',
              phonetic: 'MAS a-SAIN-ment',
              example:
                'Without explicit field filtering, a mass assignment attack set the user role to admin through a crafted JSON payload. = Senza filtraggio esplicito dei campi, un attacco di mass assignment ha impostato il ruolo utente ad admin tramite un payload JSON costruito ad hoc.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Server-Side Request Forgery',
              italian: 'Server-Side Request Forgery (SSRF)',
              pronunciation: '/ˈsɜːvə saɪd rɪˈkwɛst ˈfɔːdʒəri/',
              phonetic: 'SER-ver-SAID ri-KUEST FOR-ge-ri',
              example:
                "The SSRF vulnerability in the PDF generator allowed attackers to reach the AWS metadata endpoint and steal IAM credentials. = La vulnerabilità SSRF nel generatore PDF permetteva agli attaccanti di raggiungere l'endpoint dei metadati AWS e rubare credenziali IAM.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'Abbreviato SSRF.',
            },
            {
              english: 'Improper Inventory',
              italian: 'Inventario improprio',
              pronunciation: '/ɪmˈprɒpə ˈɪnvəntəri/',
              phonetic: 'im-PRO-per IN-ven-to-ri',
              example:
                'An improper inventory of APIs left three deprecated endpoints online that still accepted unauthenticated requests. = Un inventario improprio delle API ha lasciato tre endpoint deprecati online che ancora accettavano richieste non autenticate.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Unsafe Consumption',
              italian: 'Consumo non sicuro',
              pronunciation: '/ʌnˈseɪf kənˈsʌmpʃən/',
              phonetic: 'an-SEIF kon-SAMP-scion',
              example:
                'The microservice performed unsafe consumption of the third-party webhook payload without validating the HMAC signature. = Il microservizio eseguiva un consumo non sicuro del payload webhook di terze parti senza validare la firma HMAC.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Security Misconfiguration',
              italian: 'Errata configurazione di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ˌmɪskənˌfɪɡjʊˈreɪʃən/',
              phonetic: 'si-KIU-ri-ti mis-kon-fi-ghiu-REI-scion',
              example:
                'A security misconfiguration in the CORS policy allowed any origin to make authenticated API requests on behalf of users. = Una misconfigurzione di sicurezza nella policy CORS permetteva a qualsiasi origine di effettuare richieste API autenticate per conto degli utenti.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Lack of Auth on Function',
              italian: 'Mancanza di autenticazione sulla funzione',
              pronunciation: '/læk əv ɔːθ ɒn ˈfʌŋkʃən/',
              phonetic: 'LAK-ov-OTH ON FANK-scion',
              example:
                'The scan discovered a lack of auth on the admin function that allowed anonymous users to delete any record. = La scansione ha scoperto una mancanza di autenticazione sulla funzione admin che permetteva a utenti anonimi di eliminare qualsiasi record.',
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_tools_api_4',
          title: 'API Testing & Tools / Test e Strumenti API',
          description: 'Strumenti di test API',
          items: [
            {
              english: 'Salt Security',
              italian: 'Salt Security (piattaforma API security)',
              pronunciation: '/sɔːlt sɪˈkjʊərəti/',
              phonetic: 'SOLT si-KIU-ri-ti',
              example:
                'Deploying Salt Security on our API traffic revealed anomalous data access patterns from three compromised partner accounts. = Deployare Salt Security sul nostro traffico API ha rivelato pattern anomali di accesso ai dati da tre account partner compromessi.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Salt Security',
            },
            {
              english: 'Noname Security',
              italian: 'Noname Security (piattaforma API security)',
              pronunciation: '/ˈnəʊneɪm sɪˈkjʊərəti/',
              phonetic: 'NOU-neim si-KIU-ri-ti',
              example:
                "Connecting Noname Security to the API gateway identified thirty-seven shadow APIs that were not in the official catalog. = Collegare Noname Security all'API gateway ha identificato trentasette API ombra che non erano nel catalogo ufficiale.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Noname Security',
            },
            {
              english: 'Postman',
              italian: 'Postman (client API)',
              pronunciation: '/ˈpəʊstmən/',
              phonetic: 'POST-man',
              example:
                'The QA team uses Postman collections to run automated security test suites against every API version before release. = Il team QA usa le collezioni Postman per eseguire suite di test di sicurezza automatizzati contro ogni versione API prima del rilascio.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Postman',
            },
            {
              english: 'Newman',
              italian: 'Runner Postman da CLI (Newman)',
              pronunciation: '/ˈnjuːmən/',
              phonetic: 'NIU-man',
              example:
                'Running Postman collections through Newman in the CI pipeline automates API contract and security validation on every build. = Eseguire le collezioni Postman tramite Newman nella pipeline CI automatizza la validazione dei contratti API e di sicurezza a ogni build.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Newman',
              command: 'newman run collection.json',
            },
            {
              english: 'Schemathesis',
              italian: 'Schemathesis (fuzzer di OpenAPI/GraphQL)',
              pronunciation: '/ˌskiːməˈθiːsɪs/',
              phonetic: 'ski-ma-TI-sis',
              example:
                'Pointing Schemathesis at the OpenAPI spec generates thousands of fuzzing inputs to find edge-case API vulnerabilities. = Puntare Schemathesis alla specifica OpenAPI genera migliaia di input di fuzzing per trovare vulnerabilità API in casi limite.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Schemathesis',
              command: 'schemathesis run openapi.yaml',
            },
            {
              english: 'API Fuzzing',
              italian: 'Fuzzing di API',
              pronunciation: '/eɪ piː aɪ ˈfʌzɪŋ/',
              phonetic: 'EI-PI-AI FA-zing',
              example:
                "Adding API fuzzing to the nightly CI job discovered a crash in the payment endpoint triggered by empty string fields. = Aggiungere il fuzzing API al job CI notturno ha scoperto un crash nell'endpoint di pagamento attivato da campi stringa vuoti.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Contract Test',
              italian: 'Test di contratto',
              pronunciation: '/ˈkɒntrækt tɛst/',
              phonetic: 'KON-trakt TEST',
              example:
                'A failing contract test caught a breaking change where the response schema dropped a required field after refactoring. = Un test di contratto fallito ha intercettato un breaking change dove lo schema di risposta ha perso un campo obbligatorio dopo il refactoring.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Pact',
            },
            {
              english: 'GraphQL Security',
              italian: 'Sicurezza GraphQL',
              pronunciation: '/ɡræfˈkjuːɛl sɪˈkjʊərəti/',
              phonetic: 'GRAF-KIU-EL si-KIU-ri-ti',
              example:
                "Enforcing query depth limits and disabling introspection in production are essential GraphQL security hardening steps. = Imporre limiti di profondità delle query e disabilitare l'introspezione in produzione sono passi essenziali di hardening della sicurezza GraphQL.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'GraphQL Armor',
            },
            {
              english: 'gRPC Security',
              italian: 'Sicurezza gRPC',
              pronunciation: '/dʒiː ɑːr piː siː sɪˈkjʊərəti/',
              phonetic: 'GI-AR-PI-SI si-KIU-ri-ti',
              example:
                "Configuring interceptors for authentication and input validation strengthens gRPC security across all service boundaries. = Configurare interceptor per autenticazione e validazione dell'input rafforza la sicurezza gRPC attraverso tutti i confini dei servizi.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'API Honeypot',
              italian: 'Honeypot API',
              pronunciation: '/eɪ piː aɪ ˈhʌnipɒt/',
              phonetic: 'EI-PI-AI HA-ni-pot',
              example:
                'The team deployed an API honeypot that mimics deprecated endpoints to detect and study attacker reconnaissance behavior. = Il team ha deployato un API honeypot che simula endpoint deprecati per rilevare e studiare il comportamento di ricognizione degli attaccanti.',
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 15 - RUNTIME SECURITY
    // ════════════════════════════════════════════════
    15: {
      name: 'Sicurezza a Runtime / Runtime Security',
      description: 'RASP, WAF, Falco, Tetragon e protezione runtime',
      lessons: [
        {
          id: 'dso_tools_runtime_1',
          title: 'WAF & RASP / WAF e RASP',
          description: 'Difese applicative a runtime',
          items: [
            {
              english: 'WAF',
              italian: 'Web Application Firewall',
              pronunciation: '/wɒf/',
              phonetic: 'UOF',
              example:
                "Placing a WAF in front of the public-facing application blocks common injection and cross-site scripting attacks at the edge. = Posizionare un WAF davanti all'applicazione pubblica blocca gli attacchi comuni di injection e cross-site scripting al perimetro.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'AWS WAF, Cloudflare, ModSecurity',
            },
            {
              english: 'ModSecurity',
              italian: 'WAF open source (ModSecurity)',
              pronunciation: '/mɒd sɪˈkjʊərəti/',
              phonetic: 'MOD si-KIU-ri-ti',
              example:
                "Running ModSecurity with the OWASP Core Rule Set provides a solid baseline defense against the most common web attacks. = Eseguire ModSecurity con l'OWASP Core Rule Set fornisce una solida difesa di base contro gli attacchi web più comuni.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'ModSecurity',
            },
            {
              english: 'OWASP CRS',
              italian: 'Core Rule Set per ModSecurity (OWASP CRS)',
              pronunciation: '/ˈəʊwɒsp siː ɑːr ɛs/',
              phonetic: 'O-uosp SI-AR-ES',
              example:
                "Upgrading to the latest OWASP CRS version added new rules that detect Log4Shell exploitation attempts. = Aggiornare all'ultima versione dell'OWASP CRS ha aggiunto nuove regole che rilevano tentativi di sfruttamento di Log4Shell.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'Core Rule Set.',
            },
            {
              english: 'RASP',
              italian: 'Runtime Application Self-Protection (RASP)',
              pronunciation: '/ræsp/',
              phonetic: 'RASP',
              example:
                "Embedding a RASP agent inside the application provides context-aware protection that a perimeter WAF cannot match. = Incorporare un agente RASP dentro l'applicazione fornisce protezione contestuale che un WAF perimetrale non può eguagliare.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'Runtime Application Self-Protection.',
            },
            {
              english: 'Contrast Security',
              italian: 'Contrast Security (piattaforma RASP/IAST)',
              pronunciation: '/ˈkɒntrɑːst sɪˈkjʊərəti/',
              phonetic: 'KON-trast si-KIU-ri-ti',
              example:
                "The Contrast Security agent detected a real SQL injection in staging that both SAST and DAST tools had missed. = L'agente Contrast Security ha rilevato una SQL injection reale in staging che sia gli strumenti SAST che DAST avevano mancato.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Contrast Security',
            },
            {
              english: 'IAST',
              italian: 'Interactive Application Security Testing (IAST)',
              pronunciation: '/aɪæst/',
              phonetic: 'AI-AST',
              example:
                "Running IAST during integration tests combines the accuracy of runtime analysis with the coverage of automated test suites. = Eseguire IAST durante i test di integrazione combina l'accuratezza dell'analisi runtime con la copertura delle suite di test automatizzati.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'Interactive Application Security Testing.',
            },
            {
              english: 'Bot Management',
              italian: 'Gestione dei bot',
              pronunciation: '/bɒt ˈmænɪdʒmənt/',
              phonetic: 'BOT MA-ni-gment',
              example:
                "The bot management solution distinguished legitimate search engine crawlers from credential-stuffing botnets using behavioral analysis. = La soluzione di gestione dei bot ha distinto i crawler legittimi dei motori di ricerca dai botnet di credential stuffing usando l'analisi comportamentale.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Geo Blocking',
              italian: 'Blocco geografico',
              pronunciation: '/ˈdʒiːəʊ ˈblɒkɪŋ/',
              phonetic: 'GI-o BLO-king',
              example:
                "Enabling geo blocking on the admin panel restricts access to IP ranges from approved office locations only. = Abilitare il geo blocking sul pannello admin limita l'accesso ai range IP provenienti solo dalle sedi ufficio approvate.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Edge Security',
              italian: 'Sicurezza al bordo',
              pronunciation: '/ɛdʒ sɪˈkjʊərəti/',
              phonetic: 'EGG si-KIU-ri-ti',
              example:
                "Moving DDoS mitigation and TLS termination to the edge security layer absorbs attacks before they reach the origin. = Spostare la mitigazione DDoS e la terminazione TLS al livello di sicurezza edge assorbe gli attacchi prima che raggiungano l'origine.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Cloudflare, Fastly, Akamai',
            },
            {
              english: 'CDN Shield',
              italian: 'Scudo CDN',
              pronunciation: '/siː diː ɛn ʃiːld/',
              phonetic: 'SI-DI-EN SCILD',
              example:
                'Enabling a CDN shield layer reduces the number of requests reaching the origin server and adds an extra caching tier. = Abilitare un livello CDN shield riduce il numero di richieste che raggiungono il server di origine e aggiunge un ulteriore livello di caching.',
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_tools_runtime_2',
          title: 'Falco & Tetragon / Falco e Tetragon',
          description: 'Runtime threat detection',
          items: [
            {
              english: 'Falco',
              italian: 'Falco (rilevatore eventi runtime cloud-native)',
              pronunciation: '/ˈfælkəʊ/',
              phonetic: 'FAL-ko',
              example:
                'When a container spawns an unexpected shell process, Falco generates a high-priority alert within milliseconds. = Quando un container avvia un processo shell inaspettato, Falco genera un avviso ad alta priorità in pochi millisecondi.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Falco',
              command: 'falco --rule-file rules.yaml',
            },
            {
              english: 'Tetragon',
              italian: 'Observability di sicurezza eBPF (Tetragon)',
              pronunciation: '/ˈtɛtrəɡɒn/',
              phonetic: 'TE-tra-gon',
              example:
                "Using Tetragon for eBPF-based observability lets security teams trace process executions and network connections in real time. = Usare Tetragon per l'osservabilità basata su eBPF permette ai team di sicurezza di tracciare esecuzioni di processi e connessioni di rete in tempo reale.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Cilium Tetragon',
            },
            {
              english: 'eBPF',
              italian: 'Extended Berkeley Packet Filter (eBPF)',
              pronunciation: '/iː biː piː ɛf/',
              phonetic: 'I-BI-PI-EF',
              example:
                'Attaching eBPF programs to kernel hooks enables deep visibility into syscall patterns without modifying application code. = Attaccare programmi eBPF agli hook del kernel abilita una visibilità profonda nei pattern di syscall senza modificare il codice applicativo.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'extended Berkeley Packet Filter.',
            },
            {
              english: 'Syscall',
              italian: 'Chiamata di sistema (syscall)',
              pronunciation: '/ˈsɪskɔːl/',
              phonetic: 'SIS-kol',
              example:
                'Monitoring every syscall made by a container process helps detect unexpected behavior like file reads outside /app. = Monitorare ogni syscall fatta da un processo container aiuta a rilevare comportamenti inattesi come letture di file fuori da /app.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Anomaly Detection',
              italian: 'Rilevamento anomalie',
              pronunciation: '/əˈnɒməli dɪˈtɛkʃən/',
              phonetic: 'a-NO-ma-li di-TEK-scion',
              example:
                'Machine-learning-based anomaly detection flagged a data exfiltration attempt disguised as normal HTTPS traffic. = Il rilevamento delle anomalie basato su machine learning ha segnalato un tentativo di esfiltrazione dati mascherato da traffico HTTPS normale.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Behavior Analysis',
              italian: 'Analisi comportamentale',
              pronunciation: '/bɪˈheɪvjə əˈnæləsɪs/',
              phonetic: 'bi-HEI-vier a-NA-le-sis',
              example:
                "Runtime behavior analysis detected that a compromised container was spawning reverse shells after business hours. = L'analisi comportamentale a runtime ha rilevato che un container compromesso avviava reverse shell fuori dall'orario lavorativo.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'AppArmor',
              italian: 'AppArmor (LSM Linux a profili)',
              pronunciation: '/ˈæpɑːmə/',
              phonetic: 'AP-ar-mor',
              example:
                "Loading a custom AppArmor profile on the container restricts file access to only the directories the application needs. = Caricare un profilo AppArmor personalizzato sul container limita l'accesso ai file solo alle directory di cui l'applicazione ha bisogno.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'AppArmor',
            },
            {
              english: 'SELinux',
              italian: 'Security-Enhanced Linux (SELinux)',
              pronunciation: '/ˈɛs ˈlɪnʌks/',
              phonetic: 'ES-LI-nuks',
              example:
                "Enforcing SELinux policies on the host prevents a compromised container from accessing sensitive kernel resources. = Imporre le policy SELinux sull'host impedisce a un container compromesso di accedere a risorse sensibili del kernel.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'SELinux',
            },
            {
              english: 'Seccomp',
              italian: 'Filtro syscall Linux (seccomp)',
              pronunciation: '/ˈsɛkkɒmp/',
              phonetic: 'SEK-komp',
              example:
                'Applying a strict seccomp profile that allows only sixty approved syscalls blocks most container escape techniques. = Applicare un profilo seccomp rigoroso che permette solo sessanta syscall approvate blocca la maggior parte delle tecniche di escape dai container.',
              context: 'tools',
              difficulty: 'advanced',
              code: 'seccompProfile:\n  type: RuntimeDefault',
            },
            {
              english: 'Cilium',
              italian: 'Cilium (CNI eBPF Kubernetes)',
              pronunciation: '/ˈsɪliəm/',
              phonetic: 'SI-lium',
              example:
                'Replacing kube-proxy with Cilium gave us eBPF-powered network policies with layer-seven protocol visibility. = Sostituire kube-proxy con Cilium ci ha dato policy di rete basate su eBPF con visibilità del protocollo a livello sette.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Cilium',
            },
          ],
        },
        {
          id: 'dso_tools_runtime_3',
          title: 'EDR & XDR / EDR e XDR',
          description: 'Endpoint and Extended Detection and Response',
          items: [
            {
              english: 'EDR',
              italian: 'Endpoint Detection and Response (EDR)',
              pronunciation: '/iː diː ɑːr/',
              phonetic: 'I-DI-AR',
              example:
                "The EDR agent on every developer workstation detected a trojanized npm package that attempted to exfiltrate SSH keys. = L'agente EDR su ogni workstation degli sviluppatori ha rilevato un pacchetto npm trojanizzato che tentava di esfiltrare le chiavi SSH.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'Endpoint Detection and Response.',
            },
            {
              english: 'XDR',
              italian: 'Extended Detection and Response (XDR)',
              pronunciation: '/ɛks diː ɑːr/',
              phonetic: 'EX-DI-AR',
              example:
                'Consolidating endpoint, network, and cloud telemetry into the XDR platform enables cross-domain threat correlation. = Consolidare la telemetria di endpoint, rete e cloud nella piattaforma XDR abilita la correlazione delle minacce cross-dominio.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Extended Detection and Response.',
            },
            {
              english: 'CrowdStrike',
              italian: 'CrowdStrike (EDR commerciale)',
              pronunciation: '/ˈkraʊdstraɪk/',
              phonetic: 'KRAUD-straik',
              example:
                'After deploying CrowdStrike Falcon across the fleet, the team detected a fileless malware attack within minutes. = Dopo aver deployato CrowdStrike Falcon su tutta la flotta, il team ha rilevato un attacco malware fileless in pochi minuti.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'CrowdStrike Falcon',
            },
            {
              english: 'SentinelOne',
              italian: 'SentinelOne (EDR commerciale)',
              pronunciation: '/ˈsɛntɪnlwʌn/',
              phonetic: 'SEN-ti-nel-UAN',
              example:
                "The SentinelOne agent automatically quarantined a ransomware payload and rolled back the encrypted files to their clean state. = L'agente SentinelOne ha automaticamente messo in quarantena un payload ransomware e ripristinato i file crittografati al loro stato pulito.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'SentinelOne',
            },
            {
              english: 'Microsoft Defender',
              italian: 'Microsoft Defender (EDR Microsoft)',
              pronunciation: '/ˈmaɪkrəʊsɒft dɪˈfɛndə/',
              phonetic: 'MAI-kro-soft di-FEN-der',
              example:
                "Enabling Microsoft Defender for Endpoint on all CI runners detects supply-chain attacks targeting the build environment. = Abilitare Microsoft Defender for Endpoint su tutti i runner CI rileva attacchi supply-chain che prendono di mira l'ambiente di build.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Microsoft Defender',
            },
            {
              english: 'Sysmon',
              italian: 'Monitor di sistema Microsoft Sysinternals (Sysmon)',
              pronunciation: '/ˈsɪsmɒn/',
              phonetic: 'SIS-mon',
              example:
                'Shipping Sysmon logs to the SIEM captures detailed process creation, network connection, and file modification events. = Inviare i log di Sysmon al SIEM cattura eventi dettagliati di creazione processi, connessioni di rete e modifiche ai file.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Microsoft Sysmon',
            },
            {
              english: 'Osquery',
              italian: 'osquery (telemetria endpoint via SQL)',
              pronunciation: '/əʊˈɛs ˈkwɪəri/',
              phonetic: 'OS-KUI-ri',
              example:
                'Writing osquery rules lets the security team query every endpoint like a database to find unauthorized software. = Scrivere regole osquery permette al team di sicurezza di interrogare ogni endpoint come un database per trovare software non autorizzato.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Osquery',
              command: 'osqueryi "SELECT * FROM users"',
            },
            {
              english: 'Wazuh',
              italian: 'Wazuh (SIEM/EDR open source)',
              pronunciation: '/ˈwɑːzuː/',
              phonetic: 'UA-zu',
              example:
                "Deploying the open-source Wazuh agent on all servers provides file integrity monitoring, vulnerability detection, and log analysis. = Deployare l'agente open-source Wazuh su tutti i server fornisce monitoraggio dell'integrità dei file, rilevamento delle vulnerabilità e analisi dei log.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Wazuh',
            },
            {
              english: 'Threat Hunting',
              italian: 'Caccia alle minacce',
              pronunciation: '/θrɛt ˈhʌntɪŋ/',
              phonetic: 'THRET HAN-ting',
              example:
                "During a proactive threat hunting session, the analyst discovered a dormant backdoor that had been present for six months. = Durante una sessione proattiva di threat hunting, l'analista ha scoperto una backdoor dormiente presente da sei mesi.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Detection Engineering',
              italian: 'Ingegneria del rilevamento',
              pronunciation: '/dɪˈtɛkʃən ˌɛndʒɪˈnɪərɪŋ/',
              phonetic: 'di-TEK-scion en-gi-NI-ring',
              example:
                'The detection engineering team writes and tests Sigma rules that are deployed to the SIEM within twenty-four hours of a new TTP disclosure. = Il team di detection engineering scrive e testa regole Sigma che vengono deployate nel SIEM entro ventiquattro ore dalla divulgazione di una nuova TTP.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Sigma',
            },
          ],
        },
        {
          id: 'dso_tools_runtime_4',
          title: 'Service Mesh & Zero Trust / Service Mesh e Zero Trust',
          description: 'Sicurezza a livello di servizio',
          items: [
            {
              english: 'Service Mesh',
              italian: 'Mesh di servizi',
              pronunciation: '/ˈsɜːvɪs mɛʃ/',
              phonetic: 'SER-vis MESH',
              example:
                'Deploying a service mesh enforces mutual TLS, traffic policies, and observability across all microservices automatically. = Deployare una service mesh impone TLS reciproco, policy di traffico e osservabilità su tutti i microservizi automaticamente.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Istio, Linkerd, Consul',
            },
            {
              english: 'Sidecar',
              italian: 'Contenitore affiancato (sidecar)',
              pronunciation: '/ˈsaɪdkɑː/',
              phonetic: 'SAID-kar',
              example:
                'The Envoy sidecar proxy handles TLS termination and access logging so the application code stays security-agnostic. = Il proxy sidecar Envoy gestisce la terminazione TLS e il logging degli accessi così il codice applicativo resta agnostico rispetto alla sicurezza.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Istio',
              italian: 'Istio (service mesh open source)',
              pronunciation: '/ˈɪstiəʊ/',
              phonetic: 'IS-tio',
              example:
                'After installing Istio, all inter-service traffic was automatically encrypted with mTLS without changing any application code. = Dopo aver installato Istio, tutto il traffico inter-servizio è stato automaticamente crittografato con mTLS senza modificare alcun codice applicativo.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Istio',
            },
            {
              english: 'Linkerd',
              italian: 'Linkerd (service mesh ultra-leggero)',
              pronunciation: '/ˈlɪŋkɜːd/',
              phonetic: 'LINK-erd',
              example:
                "Choosing Linkerd for our service mesh kept the memory footprint under ten megabytes per sidecar proxy. = Scegliere Linkerd per la nostra service mesh ha mantenuto l'impronta di memoria sotto i dieci megabyte per proxy sidecar.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Linkerd',
            },
            {
              english: 'Consul Connect',
              italian: 'Consul Connect (service mesh HashiCorp)',
              pronunciation: '/ˈkɒnsʊl kəˈnɛkt/',
              phonetic: 'KON-sul ko-NEKT',
              example:
                'Using Consul Connect, each service receives a short-lived TLS certificate that is automatically rotated every seventy-two hours. = Usando Consul Connect, ogni servizio riceve un certificato TLS a breve durata che viene automaticamente ruotato ogni settantadue ore.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'HashiCorp Consul',
            },
            {
              english: 'Zero Trust Network',
              italian: 'Rete zero trust',
              pronunciation: '/ˈzɪərəʊ trʌst ˈnɛtwɜːk/',
              phonetic: 'ZI-ro TRAST NET-uork',
              example:
                "In a zero trust network architecture, every service must authenticate and authorize each request regardless of network location. = In un'architettura di rete zero trust, ogni servizio deve autenticare e autorizzare ogni richiesta indipendentemente dalla posizione nella rete.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'BeyondCorp',
              italian: 'Modello zero trust di Google (BeyondCorp)',
              pronunciation: '/bɪˈjɒndkɔːp/',
              phonetic: 'bi-YOND-korp',
              example:
                "Google's BeyondCorp model eliminates the VPN by verifying device posture and user identity for every access request. = Il modello BeyondCorp di Google elimina la VPN verificando la postura del dispositivo e l'identità dell'utente per ogni richiesta di accesso.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Google BeyondCorp',
            },
            {
              english: 'SPIFFE',
              italian: 'Standard di identità workload (SPIFFE)',
              pronunciation: '/spɪf/',
              phonetic: 'SPIF',
              example:
                "Every workload in the cluster receives a SPIFFE identity that is used for mutual authentication between services. = Ogni workload nel cluster riceve un'identità SPIFFE che viene usata per l'autenticazione reciproca tra servizi.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'SPIFFE/SPIRE',
            },
            {
              english: 'SPIRE',
              italian: 'Implementazione di SPIFFE (SPIRE)',
              pronunciation: '/spaɪər/',
              phonetic: 'SPAIR',
              example:
                'The SPIRE server issues short-lived X.509 certificates and JWT tokens to workloads based on their attested identity. = Il server SPIRE emette certificati X.509 e token JWT a breve durata ai workload basandosi sulla loro identità attestata.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'SPIRE',
            },
            {
              english: 'Authorization Policy',
              italian: 'Policy di autorizzazione',
              pronunciation: '/ɔːˌθɒraɪˈzeɪʃən ˈpɒləsi/',
              phonetic: 'o-to-rai-ZEI-scion PO-li-si',
              example:
                'The Istio authorization policy restricts the payment service to accept requests only from the checkout service. = La policy di autorizzazione Istio limita il servizio di pagamento ad accettare richieste solo dal servizio di checkout.',
              context: 'tools',
              difficulty: 'advanced',
              code: 'apiVersion: security.istio.io/v1\nkind: AuthorizationPolicy',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 16 - SECURE GITOPS
    // ════════════════════════════════════════════════
    16: {
      name: 'GitOps Sicuro / Secure GitOps',
      description: 'Commit firmati, branch protection e code owners',
      lessons: [
        {
          id: 'dso_ci_cd_gitops_1',
          title: 'GitOps Foundations / Fondamenti GitOps',
          description: 'Principi base di GitOps',
          items: [
            {
              english: 'GitOps',
              italian: 'Git come fonte di verità per il deploy (GitOps)',
              pronunciation: '/ɡɪtɒps/',
              phonetic: 'GHIT-ops',
              example:
                'Adopting GitOps means that the desired cluster state is declared in Git and any manual change is automatically reverted. = Adottare GitOps significa che lo stato desiderato del cluster è dichiarato in Git e qualsiasi modifica manuale viene automaticamente revertita.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Argo CD',
              italian: 'Argo CD (motore GitOps Kubernetes)',
              pronunciation: '/ˈɑːɡəʊ siː diː/',
              phonetic: 'AR-go SI-DI',
              example:
                'After connecting Argo CD to the Git repository, every merged pull request triggers automatic deployment to the staging cluster. = Dopo aver collegato Argo CD al repository Git, ogni pull request unita attiva un deployment automatico sul cluster di staging.',
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'Argo CD',
            },
            {
              english: 'Flux',
              italian: 'Flux (motore GitOps Kubernetes)',
              pronunciation: '/flʌks/',
              phonetic: 'FLAKS',
              example:
                'The team chose Flux because its native support for Helm and Kustomize simplified the migration from manual kubectl deploys. = Il team ha scelto Flux perché il suo supporto nativo per Helm e Kustomize ha semplificato la migrazione dai deploy manuali con kubectl.',
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'Flux',
            },
            {
              english: 'Declarative State',
              italian: 'Stato dichiarativo',
              pronunciation: '/dɪˈklærətɪv steɪt/',
              phonetic: 'di-KLA-ra-tiv STEIT',
              example:
                "Storing the entire cluster configuration as declarative state in Git makes every change traceable and reversible. = Memorizzare l'intera configurazione del cluster come stato dichiarativo in Git rende ogni modifica tracciabile e reversibile.",
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Reconciliation',
              italian: 'Riconciliazione',
              pronunciation: '/ˌrɛkənˌsɪliˈeɪʃən/',
              phonetic: 'rek-on-si-li-EI-scion',
              example:
                'If someone manually edits a Kubernetes resource, the GitOps controller runs reconciliation to restore the declared state. = Se qualcuno modifica manualmente una risorsa Kubernetes, il controller GitOps esegue la riconciliazione per ripristinare lo stato dichiarato.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Pull-Based Deploy',
              italian: 'Deploy basato su pull',
              pronunciation: '/pʊl beɪst dɪˈplɔɪ/',
              phonetic: 'PUL-BEIST di-PLOI',
              example:
                "A pull-based deploy model means the cluster agent fetches changes from Git rather than receiving pushes from CI. = Un modello di deploy basato su pull significa che l'agente del cluster recupera le modifiche da Git invece di ricevere push dalla CI.",
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Application Manifest',
              italian: "Manifest dell'applicazione",
              pronunciation: '/ˌæplɪˈkeɪʃən ˈmænɪfɛst/',
              phonetic: 'ap-li-KEI-scion MA-ni-fest',
              example:
                "Every application manifest in the GitOps repo specifies the image digest, resource limits, and security context. = Ogni manifesto dell'applicazione nel repo GitOps specifica il digest dell'immagine, i limiti di risorse e il contesto di sicurezza.",
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Sync Policy',
              italian: 'Policy di sync',
              pronunciation: '/sɪŋk ˈpɒləsi/',
              phonetic: 'SINK PO-li-si',
              example:
                'Setting the sync policy to auto-prune removes any orphaned Kubernetes resource that no longer exists in the Git repository. = Impostare la sync policy su auto-prune rimuove qualsiasi risorsa Kubernetes orfana che non esiste più nel repository Git.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Environment Branch',
              italian: 'Branch di ambiente',
              pronunciation: '/ɪnˈvaɪrənmənt brɑːntʃ/',
              phonetic: 'in-VAI-ron-ment BRANCH',
              example:
                "Promoting changes from the dev environment branch to staging requires a reviewed and approved pull request. = Promuovere le modifiche dal branch dell'ambiente dev allo staging richiede una pull request revisionata e approvata.",
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Promotion Pipeline',
              italian: 'Pipeline di promozione',
              pronunciation: '/prəˈməʊʃən ˈpaɪplaɪn/',
              phonetic: 'pro-MO-scion PAIP-lain',
              example:
                'The promotion pipeline moves validated images through dev, staging, and production with gated approvals at each step. = La pipeline di promozione sposta le immagini validate attraverso dev, staging e produzione con approvazioni controllate a ogni passo.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_ci_cd_gitops_2',
          title: 'Signed Commits / Commit Firmati',
          description: 'Firmare commit e tag',
          items: [
            {
              english: 'Signed Commit',
              italian: 'Commit firmato',
              pronunciation: '/saɪnd kəˈmɪt/',
              phonetic: 'SAIND ko-MIT',
              example:
                'Requiring every signed commit on the main branch proves that an authorized developer authored each change. = Richiedere ogni commit firmato sul branch main dimostra che uno sviluppatore autorizzato ha creato ogni modifica.',
              context: 'ci-cd',
              difficulty: 'advanced',
              command: 'git commit -S -m "msg"',
            },
            {
              english: 'Signed Tag',
              italian: 'Tag firmato',
              pronunciation: '/saɪnd tæɡ/',
              phonetic: 'SAIND TAG',
              example:
                "Creating a signed tag for every release lets downstream consumers verify the authenticity of the published version. = Creare un tag firmato per ogni rilascio permette ai consumatori downstream di verificare l'autenticità della versione pubblicata.",
              context: 'ci-cd',
              difficulty: 'advanced',
              command: 'git tag -s v1.0.0',
            },
            {
              english: 'GPG Sign',
              italian: 'Firma GPG',
              pronunciation: '/dʒiː piː dʒiː saɪn/',
              phonetic: 'GI-PI-GI SAIN',
              example:
                'Setting git config to always GPG sign commits ensures that every change is cryptographically attributable. = Impostare git config per firmare sempre i commit con GPG assicura che ogni modifica sia attribuibile crittograficamente.',
              context: 'ci-cd',
              difficulty: 'advanced',
              code: 'commit.gpgsign = true',
            },
            {
              english: 'SSH Sign',
              italian: 'Firma SSH',
              pronunciation: '/ɛs ɛs eɪtʃ saɪn/',
              phonetic: 'ES-ES-EICI SAIN',
              example:
                'Developers who already have SSH keys can use SSH sign to verify commits without managing a separate GPG keyring. = Gli sviluppatori che hanno già chiavi SSH possono usare SSH sign per verificare i commit senza gestire un keyring GPG separato.',
              context: 'ci-cd',
              difficulty: 'advanced',
              code: 'gpg.format = ssh',
            },
            {
              english: 'Verified Commit Badge',
              italian: 'Badge di commit verificato',
              pronunciation: '/ˈvɛrɪfaɪd kəˈmɪt bædʒ/',
              phonetic: 'VE-ri-faid ko-MIT BAGG',
              example:
                "A green verified commit badge on GitHub confirms that the commit was signed by a key registered in the account settings. = Un badge di commit verificato verde su GitHub conferma che il commit è stato firmato da una chiave registrata nelle impostazioni dell'account.",
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Commit Hook',
              italian: 'Hook di commit',
              pronunciation: '/kəˈmɪt hʊk/',
              phonetic: 'ko-MIT HUK',
              example:
                "The commit hook runs gitleaks and eslint before allowing the commit, catching secrets and code issues locally. = L'hook di commit esegue gitleaks e eslint prima di permettere il commit, intercettando segreti e problemi di codice localmente.",
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'DCO Sign-Off',
              italian: 'Firma Developer Certificate of Origin (DCO sign-off)',
              pronunciation: '/diː siː əʊ ˈsaɪnɒf/',
              phonetic: 'DI-SI-O SAIN-of',
              example:
                "Open source projects often require a DCO sign-off on every commit to certify the developer's right to submit the code. = I progetti open source spesso richiedono un DCO sign-off su ogni commit per certificare il diritto dello sviluppatore a sottomettere il codice.",
              context: 'ci-cd',
              difficulty: 'advanced',
              note: 'Developer Certificate of Origin.',
            },
            {
              english: 'Author Email Verification',
              italian: 'Verifica email autore',
              pronunciation: '/ˈɔːθə ˈiːmeɪl/',
              phonetic: 'O-thor I-meil',
              example:
                "Enforcing author email verification on the repository ensures that commits cannot be attributed to spoofed email addresses. = Imporre la verifica dell'email dell'autore sul repository assicura che i commit non possano essere attribuiti a indirizzi email falsificati.",
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'gitsign',
              italian: 'Firma commit con Sigstore (gitsign)',
              pronunciation: '/ɡɪtsaɪn/',
              phonetic: 'GHIT-sain',
              example:
                "Using gitsign for commit signing leverages Sigstore's keyless infrastructure, eliminating the need for long-lived GPG keys. = Usare gitsign per la firma dei commit sfrutta l'infrastruttura senza chiave di Sigstore, eliminando la necessità di chiavi GPG a lunga durata.",
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'gitsign',
              command: 'git config --global gpg.x509.program gitsign',
            },
            {
              english: 'Hardware Token',
              italian: 'Token hardware',
              pronunciation: '/ˈhɑːdweə ˈtəʊkən/',
              phonetic: 'HARD-uer TO-ken',
              example:
                "Storing the GPG signing key on a hardware token like YubiKey prevents private key extraction even if the workstation is compromised. = Memorizzare la chiave di firma GPG su un hardware token come YubiKey previene l'estrazione della chiave privata anche se la workstation è compromessa.",
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'YubiKey',
            },
          ],
        },
        {
          id: 'dso_ci_cd_gitops_3',
          title: 'Branch Protection / Protezione Branch',
          description: 'Regole di protezione su branch critici',
          items: [
            {
              english: 'Branch Protection',
              italian: 'Protezione del branch',
              pronunciation: '/brɑːntʃ prəˈtɛkʃən/',
              phonetic: 'BRANCH pro-TEK-scion',
              example:
                'Enabling branch protection on main requires pull request reviews, status checks, and signed commits before merging. = Abilitare la protezione del branch su main richiede review delle pull request, status check e commit firmati prima del merge.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Required Reviewer',
              italian: 'Revisore obbligatorio',
              pronunciation: '/rɪˈkwaɪəd rɪˈvjuːə/',
              phonetic: 'ri-KUAIRD ri-VIU-er',
              example:
                'The repository settings mandate that at least one required reviewer from the security team approves every change. = Le impostazioni del repository impongono che almeno un reviewer obbligatorio dal team di sicurezza approvi ogni modifica.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Linear History',
              italian: 'Storia lineare',
              pronunciation: '/ˈlɪniə ˈhɪstəri/',
              phonetic: 'LI-nier HIS-to-ri',
              example:
                'Enforcing linear history through squash merges makes the audit trail cleaner and simplifies git bisect for debugging. = Imporre la cronologia lineare tramite squash merge rende la traccia di audit più pulita e semplifica git bisect per il debug.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Force Push',
              italian: 'Push forzato',
              pronunciation: '/fɔːs pʊʃ/',
              phonetic: 'FORS PUSH',
              example:
                'Blocking force push on protected branches prevents anyone from rewriting history and hiding malicious commits. = Bloccare il force push sui branch protetti impedisce a chiunque di riscrivere la cronologia e nascondere commit malevoli.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Code Owner',
              italian: 'Proprietario del codice',
              pronunciation: '/kəʊd ˈəʊnə/',
              phonetic: 'KOUD OU-ner',
              example:
                'Defining a code owner for the authentication module ensures that every change to login logic gets expert review. = Definire un code owner per il modulo di autenticazione assicura che ogni modifica alla logica di login riceva una review esperta.',
              context: 'ci-cd',
              difficulty: 'advanced',
              code: '* @platform-team',
            },
            {
              english: 'Stale Review Dismissal',
              italian: 'Dismissione di review obsolete',
              pronunciation: '/steɪl rɪˈvjuː dɪsˈmɪsl/',
              phonetic: 'STEIL ri-VIU dis-MIS-sal',
              example:
                'Enabling stale review dismissal invalidates previous approvals when new commits are pushed to the pull request. = Abilitare la dismissal delle review obsolete invalida le approvazioni precedenti quando nuovi commit vengono pushati nella pull request.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Required Status Check',
              italian: 'Controllo di stato obbligatorio',
              pronunciation: '/rɪˈkwaɪəd ˈsteɪtəs tʃɛk/',
              phonetic: 'ri-KUAIRD STEI-tas CIEK',
              example:
                'Adding SAST and secret scanning as a required status check ensures they must pass before any merge to main. = Aggiungere SAST e scansione segreti come status check obbligatorio assicura che debbano passare prima di qualsiasi merge su main.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Restrict Push',
              italian: 'Limita il push',
              pronunciation: '/rɪˈstrɪkt pʊʃ/',
              phonetic: 'ri-STRIKT PUSH',
              example:
                "Only the CI bot account can push to the release branch thanks to the restrict push rule on the repository. = Solo l'account bot CI può pushare sul branch di rilascio grazie alla regola di restrizione push sul repository.",
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Conversation Resolution',
              italian: 'Risoluzione delle conversazioni',
              pronunciation: '/ˌkɒnvəˈseɪʃən ˌrɛzəˈluːʃən/',
              phonetic: 'kon-ver-SEI-scion re-zo-LU-scion',
              example:
                'Requiring conversation resolution before merge ensures that every security comment is explicitly addressed. = Richiedere la risoluzione delle conversazioni prima del merge assicura che ogni commento di sicurezza sia esplicitamente affrontato.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Bypass Protection',
              italian: 'Bypass della protezione',
              pronunciation: '/ˈbaɪpɑːs prəˈtɛkʃən/',
              phonetic: 'BAI-pas pro-TEK-scion',
              example:
                "Even repository admins cannot merge without reviews thanks to the bypass protection setting being disabled. = Anche gli admin del repository non possono mergare senza review grazie all'impostazione di bypass protection disabilitata.",
              context: 'ci-cd',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_ci_cd_gitops_4',
          title: 'Real GitOps Patterns / Pattern Reali GitOps',
          description: 'Esempi reali di GitOps sicuro',
          items: [
            {
              english: 'App of Apps',
              italian: 'App di app',
              pronunciation: '/æp əv æps/',
              phonetic: 'AP-OV-APS',
              example:
                "The app of apps pattern in Argo CD manages all microservice deployments from a single root application manifest. = Il pattern app of apps in Argo CD gestisce tutti i deployment di microservizi da un singolo manifesto dell'applicazione root.",
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'Argo CD ApplicationSet',
            },
            {
              english: 'Image Updater',
              italian: 'Aggiornatore di immagini',
              pronunciation: '/ˈɪmɪdʒ ʌpˈdeɪtə/',
              phonetic: 'I-migg ap-DEI-ter',
              example:
                'Argo CD Image Updater watches the container registry and opens a commit to update image tags when new versions appear. = Argo CD Image Updater monitora il container registry e apre un commit per aggiornare i tag delle immagini quando appaiono nuove versioni.',
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'Argo CD Image Updater',
            },
            {
              english: 'Helm Chart',
              italian: 'Pacchetto Helm (Helm chart)',
              pronunciation: '/hɛlm tʃɑːt/',
              phonetic: 'HELM CIART',
              example:
                "Packaging the application as a Helm chart simplifies templating, versioning, and repeatable deployments across environments. = Pacchettizzare l'applicazione come Helm chart semplifica il templating, il versionamento e i deployment ripetibili tra ambienti.",
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'Helm',
            },
            {
              english: 'Kustomize',
              italian: 'Patching YAML Kubernetes (Kustomize)',
              pronunciation: '/kʌˈstəʊmaɪz/',
              phonetic: 'kas-TO-maiz',
              example:
                'Using Kustomize overlays lets the team maintain a single base manifest and apply environment-specific patches for staging and prod. = Usare gli overlay Kustomize permette al team di mantenere un singolo manifesto base e applicare patch specifiche per ambiente per staging e produzione.',
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'Kustomize',
            },
            {
              english: 'Sealed Secrets in Git',
              italian: 'Segreti sigillati in Git',
              pronunciation: '/siːld ˈsiːkrɪts ɪn ɡɪt/',
              phonetic: 'SILD SI-krets IN GHIT',
              example:
                'Committing sealed secrets in Git is safe because only the cluster controller holds the private key to decrypt them. = Committare sealed secret in Git è sicuro perché solo il controller del cluster possiede la chiave privata per decifrarli.',
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'Bitnami Sealed Secrets',
            },
            {
              english: 'Pull Request Review Bot',
              italian: 'Bot di review delle PR',
              pronunciation: '/pʊl rɪˈkwɛst rɪˈvjuː bɒt/',
              phonetic: 'PUL ri-KUEST ri-VIU BOT',
              example:
                'The pull request review bot comments on every PR with a security checklist and flags changes to sensitive files. = Il bot di review delle pull request commenta ogni PR con una checklist di sicurezza e segnala le modifiche ai file sensibili.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Mergify',
              italian: 'Mergify (automazione merge PR)',
              pronunciation: '/ˈmɜːdʒɪfaɪ/',
              phonetic: 'MER-gi-fai',
              example:
                'Configuring Mergify to auto-merge dependency updates that pass all checks reduces the backlog of open pull requests. = Configurare Mergify per auto-mergare gli aggiornamenti delle dipendenze che passano tutti i controlli riduce il backlog di pull request aperte.',
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'Mergify',
            },
            {
              english: 'Spectral',
              italian: 'Linter di OpenAPI/AsyncAPI (Spectral)',
              pronunciation: '/ˈspɛktrəl/',
              phonetic: 'SPEK-tral',
              example:
                'Running Spectral against the OpenAPI definition in CI enforces naming conventions and catches missing security schemes. = Eseguire Spectral contro la definizione OpenAPI nella CI impone convenzioni di naming e intercetta schemi di sicurezza mancanti.',
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'Stoplight Spectral',
            },
            {
              english: 'Repo Templates',
              italian: 'Template di repo',
              pronunciation: '/ˈriːpəʊ ˈtɛmpleɪts/',
              phonetic: 'RI-po TEM-pleits',
              example:
                'Our organization provides repo templates pre-configured with branch protection, CI workflows, and security scanning. = La nostra organizzazione fornisce template di repository pre-configurati con protezione dei branch, workflow CI e scansione di sicurezza.',
              context: 'ci-cd',
              difficulty: 'advanced',
            },
            {
              english: 'Policy Bot',
              italian: 'Bot di policy',
              pronunciation: '/ˈpɒləsi bɒt/',
              phonetic: 'PO-li-si BOT',
              example:
                "The policy bot enforces that every pull request has at least one approval from a code owner and passes all status checks. = Il policy bot impone che ogni pull request abbia almeno un'approvazione da un code owner e passi tutti gli status check.",
              context: 'ci-cd',
              difficulty: 'advanced',
              tool: 'Palantir policy-bot',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 17 - SECURITY MONITORING
    // ════════════════════════════════════════════════
    17: {
      name: 'Monitoraggio della Sicurezza / Security Monitoring',
      description: 'SIEM, dashboard e log analysis',
      lessons: [
        {
          id: 'dso_tools_monitoring_1',
          title: 'SIEM Foundations / Fondamenti SIEM',
          description: 'Security Information and Event Management',
          items: [
            {
              english: 'SIEM',
              italian: 'Security Information and Event Management (SIEM)',
              pronunciation: '/siːm/',
              phonetic: 'SIM',
              example:
                'Centralizing all security events into a SIEM lets analysts correlate alerts across firewalls, endpoints, and cloud services. = Centralizzare tutti gli eventi di sicurezza in un SIEM permette agli analisti di correlare gli avvisi tra firewall, endpoint e servizi cloud.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Security Information and Event Management.',
            },
            {
              english: 'Splunk',
              italian: 'Splunk (piattaforma SIEM e log)',
              pronunciation: '/splʌŋk/',
              phonetic: 'SPLANK',
              example:
                'The security team built custom Splunk dashboards that show real-time login anomalies and failed authentication trends. = Il team di sicurezza ha costruito dashboard Splunk personalizzate che mostrano anomalie di login in tempo reale e trend di autenticazione fallita.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Splunk',
            },
            {
              english: 'Elastic Stack',
              italian: 'Stack Elastic',
              pronunciation: '/ɪˈlæstɪk stæk/',
              phonetic: 'i-LAS-tik STAK',
              example:
                "Deploying the Elastic Stack for log aggregation gave us full-text search and visualization across ten billion events daily. = Deployare l'Elastic Stack per l'aggregazione dei log ci ha dato ricerca full-text e visualizzazione su dieci miliardi di eventi giornalieri.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Elasticsearch, Logstash, Kibana',
            },
            {
              english: 'QRadar',
              italian: 'IBM QRadar (SIEM enterprise)',
              pronunciation: '/ˈkjuːreɪdə/',
              phonetic: 'KIU-rei-dar',
              example:
                'After tuning the QRadar correlation rules, the number of false-positive alerts dropped by seventy-five percent. = Dopo aver affinato le regole di correlazione QRadar, il numero di avvisi falsi positivi è sceso del settantacinque percento.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'IBM QRadar',
            },
            {
              english: 'Sentinel',
              italian: 'Motore policy HashiCorp (Sentinel)',
              pronunciation: '/ˈsɛntɪnl/',
              phonetic: 'SEN-ti-nel',
              example:
                'A Sentinel policy prevents any Terraform plan from creating resources without the mandatory cost-center tag. = Una policy Sentinel impedisce a qualsiasi piano Terraform di creare risorse senza il tag di centro di costo obbligatorio.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Microsoft Sentinel',
            },
            {
              english: 'Chronicle',
              italian: 'Google Chronicle (SIEM cloud)',
              pronunciation: '/ˈkrɒnɪkl/',
              phonetic: 'KRO-ni-kol',
              example:
                'Migrating to Google Chronicle provided petabyte-scale log retention with sub-second search across twelve months of data. = Migrare a Google Chronicle ha fornito retention dei log su scala petabyte con ricerca in meno di un secondo su dodici mesi di dati.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Google Chronicle',
            },
            {
              english: 'Log Source',
              italian: 'Sorgente di log',
              pronunciation: '/lɒɡ sɔːs/',
              phonetic: 'LOG SORS',
              example:
                'Adding the Kubernetes audit log as a new log source to the SIEM revealed three unauthorized kubectl exec sessions. = Aggiungere il log di audit Kubernetes come nuova sorgente di log al SIEM ha rivelato tre sessioni kubectl exec non autorizzate.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Parsing',
              italian: 'Analisi sintattica',
              pronunciation: '/ˈpɑːsɪŋ/',
              phonetic: 'PAR-sing',
              example:
                'Correct log parsing is essential so that timestamps, source IPs, and event types map to the right SIEM fields. = Il parsing corretto dei log è essenziale affinché timestamp, IP sorgente e tipi di evento mappino nei campi giusti del SIEM.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Correlation Rule',
              italian: 'Regola di correlazione',
              pronunciation: '/ˌkɒrəˈleɪʃən ruːl/',
              phonetic: 'kor-re-LEI-scion RUL',
              example:
                'The new correlation rule fires an alert when five failed logins from different IPs target the same account within ten minutes. = La nuova regola di correlazione genera un avviso quando cinque login falliti da IP diversi prendono di mira lo stesso account in dieci minuti.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Alert Fatigue',
              italian: 'Stanchezza da allarmi',
              pronunciation: '/əˈlɜːt fəˈtiːɡ/',
              phonetic: 'a-LERT fa-TIG',
              example:
                "Reducing noisy low-priority alerts is critical to combat alert fatigue and keep analysts focused on real threats. = Ridurre gli avvisi rumorosi a bassa priorità è fondamentale per combattere l'alert fatigue e mantenere gli analisti concentrati sulle minacce reali.",
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_tools_monitoring_2',
          title: 'Dashboards & Metrics / Dashboard e Metriche',
          description: 'Visualizzazione e KPI di sicurezza',
          items: [
            {
              english: 'Security Dashboard',
              italian: 'Dashboard di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ˈdæʃbɔːd/',
              phonetic: 'si-KIU-ri-ti DASH-bord',
              example:
                'The CISO reviews the security dashboard every Monday to track open vulnerabilities, incidents, and remediation progress. = Il CISO revisiona la dashboard di sicurezza ogni lunedì per monitorare vulnerabilità aperte, incidenti e progresso della remediation.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Mean Time To Detect',
              italian: 'Tempo medio di rilevamento',
              pronunciation: '/miːn taɪm tuː dɪˈtɛkt/',
              phonetic: 'MIN-TAIM-TU di-TEKT',
              example:
                'Automating alert triage reduced our mean time to detect from eight hours to under forty-five minutes. = Automatizzare il triage degli avvisi ha ridotto il nostro tempo medio di rilevamento da otto ore a meno di quarantacinque minuti.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'MTTD: Mean Time To Detect.',
            },
            {
              english: 'Mean Time To Respond',
              italian: 'Tempo medio di risposta',
              pronunciation: '/miːn taɪm tuː rɪˈspɒnd/',
              phonetic: 'MIN-TAIM-TU ri-SPOND',
              example:
                'The SOAR playbook brought the mean time to respond for credential compromises down from two hours to twelve minutes. = Il playbook SOAR ha portato il tempo medio di risposta per le compromissioni di credenziali da due ore a dodici minuti.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Vulnerability Backlog',
              italian: 'Backlog di vulnerabilità',
              pronunciation: '/ˌvʌlnərəˈbɪləti ˈbæklɒɡ/',
              phonetic: 'val-ne-ra-BI-li-ti BAK-log',
              example:
                'The team prioritizes the vulnerability backlog by CVSS score and reachability analysis to fix the riskiest items first. = Il team prioritizza il backlog delle vulnerabilità per punteggio CVSS e analisi di raggiungibilità per correggere prima gli elementi più rischiosi.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Coverage Metric',
              italian: 'Metrica di copertura',
              pronunciation: '/ˈkʌvərɪdʒ ˈmɛtrɪk/',
              phonetic: 'KA-ve-rigg ME-trik',
              example:
                'Tracking the SAST coverage metric across all repositories shows which projects still lack automated security scanning. = Tracciare la metrica di copertura SAST su tutti i repository mostra quali progetti mancano ancora di scansione di sicurezza automatizzata.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Heatmap',
              italian: 'Mappa di calore',
              pronunciation: '/ˈhiːtmæp/',
              phonetic: 'HIT-map',
              example:
                'The vulnerability heatmap on the dashboard highlights which microservices carry the highest concentration of unpatched CVEs. = La mappa di calore delle vulnerabilità sulla dashboard evidenzia quali microservizi portano la concentrazione più alta di CVE non patchate.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Trend Line',
              italian: 'Linea di tendenza',
              pronunciation: '/trɛnd laɪn/',
              phonetic: 'TREND LAIN',
              example:
                'A downward trend line on the open-findings chart proves that the remediation program is consistently reducing risk. = Una linea di tendenza in discesa sul grafico dei finding aperti dimostra che il programma di remediation sta riducendo costantemente il rischio.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'SLA',
              italian: 'Accordo di livello di servizio (SLA)',
              pronunciation: '/ɛs ɛl eɪ/',
              phonetic: 'ES-EL-EI',
              example:
                'Our internal SLA requires critical vulnerabilities to be patched within seventy-two hours of discovery. = Il nostro SLA interno richiede che le vulnerabilità critiche vengano patchate entro settantadue ore dalla scoperta.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Service Level Agreement.',
            },
            {
              english: 'Burndown',
              italian: 'Grafico di completamento (burndown)',
              pronunciation: '/ˈbɜːndaʊn/',
              phonetic: 'BERN-daun',
              example:
                'The security sprint burndown chart shows that the team is on track to close all high-severity findings before the deadline. = Il grafico di burndown dello sprint di sicurezza mostra che il team è in linea per chiudere tutti i finding ad alta severità prima della scadenza.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'KPI',
              italian: 'Indicatore chiave di performance (KPI)',
              pronunciation: '/keɪ piː aɪ/',
              phonetic: 'KEI-PI-AI',
              example:
                'Tracking the KPI for mean time to remediate helps management understand whether security investments are paying off. = Tracciare il KPI per il tempo medio di remediation aiuta il management a capire se gli investimenti in sicurezza stanno dando risultati.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Key Performance Indicator.',
            },
          ],
        },
        {
          id: 'dso_tools_monitoring_3',
          title: 'Log Analysis / Analisi dei Log',
          description: 'Strumenti e tecniche di log analysis',
          items: [
            {
              english: 'Log Aggregation',
              italian: 'Aggregazione di log',
              pronunciation: '/lɒɡ ˌæɡrɪˈɡeɪʃən/',
              phonetic: 'LOG a-gri-GHEI-scion',
              example:
                "Centralized log aggregation pipes application, infrastructure, and security logs into a single searchable data lake. = L'aggregazione centralizzata dei log convoglia log applicativi, infrastrutturali e di sicurezza in un singolo data lake ricercabile.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Loki, Graylog',
            },
            {
              english: 'Loki',
              italian: 'Loki (sistema di log Grafana)',
              pronunciation: '/ˈləʊki/',
              phonetic: 'LO-ki',
              example:
                "Using Grafana Loki for log aggregation keeps costs low because it indexes only labels instead of full log content. = Usare Grafana Loki per l'aggregazione dei log mantiene bassi i costi perché indicizza solo le etichette invece del contenuto completo dei log.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Grafana Loki',
            },
            {
              english: 'Fluentd',
              italian: 'Fluentd (raccoglitore log unificato)',
              pronunciation: '/ˈfluːənt diː/',
              phonetic: 'FLU-ent-DI',
              example:
                'Deploying Fluentd as a DaemonSet on every Kubernetes node collects and forwards container logs to the central SIEM. = Deployare Fluentd come DaemonSet su ogni nodo Kubernetes raccoglie e inoltra i log dei container al SIEM centrale.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Fluentd',
            },
            {
              english: 'Vector',
              italian: 'Pipeline di osservabilità ad alte prestazioni (Vector)',
              pronunciation: '/ˈvɛktə/',
              phonetic: 'VEK-ter',
              example:
                "Replacing Logstash with Vector cut log pipeline memory usage by eighty percent while maintaining the same throughput. = Sostituire Logstash con Vector ha ridotto l'uso di memoria della pipeline di log dell'ottanta percento mantenendo lo stesso throughput.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Vector by Datadog',
            },
            {
              english: 'Audit Log',
              italian: 'Registro di audit',
              pronunciation: '/ˈɔːdɪt lɒɡ/',
              phonetic: 'O-dit LOG',
              example:
                "After the incident, we traced the unauthorized pipeline change through the audit log to identify the compromised account. = Dopo l'incidente, abbiamo tracciato la modifica non autorizzata alla pipeline attraverso il registro di audit per identificare l'account compromesso.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Log Retention',
              italian: 'Ritenzione dei log',
              pronunciation: '/lɒɡ rɪˈtɛnʃən/',
              phonetic: 'LOG ri-TEN-scion',
              example:
                'PCI-DSS requires a minimum log retention period of one year, with three months of data immediately searchable. = PCI-DSS richiede un periodo minimo di retention dei log di un anno, con tre mesi di dati immediatamente ricercabili.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Tail',
              italian: 'Mostra coda del file (tail)',
              pronunciation: '/teɪl/',
              phonetic: 'TEIL',
              example:
                "Running tail on the application log file in real time helps developers troubleshoot authentication failures during testing. = Eseguire tail sul file di log dell'applicazione in tempo reale aiuta gli sviluppatori a risolvere i fallimenti di autenticazione durante il test.",
              context: 'tools',
              difficulty: 'advanced',
              command: 'kubectl logs -f pod-name',
            },
            {
              english: 'Pattern Search',
              italian: 'Ricerca di pattern',
              pronunciation: '/ˈpætən sɜːtʃ/',
              phonetic: 'PA-tern SERCH',
              example:
                "Using a regex-based pattern search in the SIEM, the analyst found all occurrences of base64-encoded PowerShell commands. = Usando una ricerca di pattern basata su regex nel SIEM, l'analista ha trovato tutte le occorrenze di comandi PowerShell codificati in base64.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'PII Redaction',
              italian: 'Redazione di PII',
              pronunciation: '/piː aɪ aɪ rɪˈdækʃən/',
              phonetic: 'PI-AI-AI ri-DAK-scion',
              example:
                "The log pipeline applies PII redaction rules that mask email addresses and phone numbers before storage. = La pipeline di log applica regole di redazione PII che mascherano indirizzi email e numeri di telefono prima dell'archiviazione.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'Personal Identifiable Information.',
            },
            {
              english: 'Structured Logging',
              italian: 'Logging strutturato',
              pronunciation: '/ˈstrʌktʃəd ˈlɒɡɪŋ/',
              phonetic: 'STRAK-cer-d LO-ghing',
              example:
                'Switching to structured logging in JSON format makes it trivial to filter and aggregate events by severity and service name. = Passare al logging strutturato in formato JSON rende banale filtrare e aggregare eventi per severità e nome del servizio.',
              context: 'tools',
              difficulty: 'advanced',
              code: '{"level":"INFO","msg":"login","user":"x"}',
            },
          ],
        },
        {
          id: 'dso_tools_monitoring_4',
          title: 'D3FEND & Detection / D3FEND e Rilevamento',
          description: 'Mappare difese e detection',
          items: [
            {
              english: 'MITRE D3FEND',
              italian: 'Framework di contromisure (MITRE D3FEND)',
              pronunciation: '/ˈmaɪtə dɪˈfɛnd/',
              phonetic: 'MAI-ter di-FEND',
              example:
                'Mapping each detection rule to a MITRE D3FEND technique shows which defensive capabilities are active and which have gaps. = Mappare ogni regola di rilevamento a una tecnica MITRE D3FEND mostra quali capacità difensive sono attive e quali hanno lacune.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'MITRE D3FEND',
            },
            {
              english: 'Detection Rule',
              italian: 'Regola di rilevamento',
              pronunciation: '/dɪˈtɛkʃən ruːl/',
              phonetic: 'di-TEK-scion RUL',
              example:
                'The detection engineering team deploys every new detection rule to staging first and validates it against known attack replays. = Il team di detection engineering deploya ogni nuova regola di rilevamento prima in staging e la valida contro replay di attacchi noti.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Sigma Rule',
              italian: 'Regola Sigma',
              pronunciation: '/ˈsɪɡmə ruːl/',
              phonetic: 'SIG-ma RUL',
              example:
                'Writing detections as Sigma rules makes them portable across Splunk, Elastic, and any other supported SIEM backend. = Scrivere le detection come regole Sigma le rende portabili tra Splunk, Elastic e qualsiasi altro backend SIEM supportato.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Sigma',
            },
            {
              english: 'YARA Rule',
              italian: 'Regola YARA',
              pronunciation: '/ˈjɑːrə ruːl/',
              phonetic: 'IA-ra RUL',
              example:
                "The malware analyst wrote a YARA rule to detect the specific byte pattern used by the ransomware variant across disk images. = L'analista malware ha scritto una regola YARA per rilevare il pattern di byte specifico usato dalla variante ransomware nelle immagini disco.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'YARA',
            },
            {
              english: 'Indicator of Compromise',
              italian: 'Indicatore di compromissione',
              pronunciation: '/ˈɪndɪkeɪtə əv ˈkɒmprəmaɪz/',
              phonetic: 'IN-di-kei-ter OV KOM-pro-maiz',
              example:
                'Feeding the indicator of compromise list into the firewall automatically blocks known malicious domains and IP addresses. = Alimentare la lista degli indicatori di compromissione nel firewall blocca automaticamente domini e indirizzi IP malevoli noti.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Abbreviato IOC.',
            },
            {
              english: 'Indicator of Attack',
              italian: 'Indicatore di attacco',
              pronunciation: '/ˈɪndɪkeɪtə əv əˈtæk/',
              phonetic: 'IN-di-kei-ter OV a-TAK',
              example:
                'An indicator of attack focuses on behavioral patterns, like unusual lateral movement, rather than static signatures. = Un indicatore di attacco si concentra su pattern comportamentali, come movimento laterale insolito, piuttosto che su firme statiche.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Threat Intel',
              italian: 'Intelligence sulle minacce (threat intel)',
              pronunciation: '/θrɛt ˈɪntɛl/',
              phonetic: 'THRET IN-tel',
              example:
                'Subscribing to commercial threat intel feeds gives the SOC early warning about emerging campaign indicators. = Abbonarsi a feed di threat intel commerciali dà al SOC preavviso su indicatori di campagne emergenti.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'MISP, OpenCTI',
            },
            {
              english: 'TIP',
              italian: 'Threat Intelligence Platform',
              pronunciation: '/tɪp/',
              phonetic: 'TIP',
              example:
                'The threat intelligence platform aggregates IOCs from OSINT, ISACs, and commercial feeds into a single searchable database. = La piattaforma di threat intelligence aggrega IOC da OSINT, ISAC e feed commerciali in un singolo database ricercabile.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Threat Intelligence Platform.',
            },
            {
              english: 'Lateral Movement',
              italian: 'Movimento laterale',
              pronunciation: '/ˈlætərəl ˈmuːvmənt/',
              phonetic: 'LA-te-ral MUV-ment',
              example:
                'The detection rule fires when a workstation initiates SMB connections to three or more servers, indicating potential lateral movement. = La regola di rilevamento si attiva quando una workstation inizia connessioni SMB verso tre o più server, indicando potenziale movimento laterale.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Beaconing',
              italian: 'Chiamate periodiche al C2 (beaconing)',
              pronunciation: '/ˈbiːkənɪŋ/',
              phonetic: 'BI-ko-ning',
              example:
                "Statistical analysis of DNS query timing revealed a beaconing pattern where the malware contacted its C2 server every five minutes. = L'analisi statistica dei tempi delle query DNS ha rivelato un pattern di beaconing dove il malware contattava il suo server C2 ogni cinque minuti.",
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 18 - DEVOPS INCIDENT RESPONSE
    // ════════════════════════════════════════════════
    18: {
      name: 'Risposta agli Incidenti DevOps / DevOps Incident Response',
      description: 'War room, rollback e gestione incidenti',
      lessons: [
        {
          id: 'dso_automation_incident_1',
          title: 'Incident Basics / Basi degli Incidenti',
          description: 'Concetti chiave di IR',
          items: [
            {
              english: 'Incident',
              italian: 'Incidente',
              pronunciation: '/ˈɪnsɪdənt/',
              phonetic: 'IN-si-dent',
              example:
                'An unauthorized access event that affects customer data is classified as a security incident requiring formal response. = Un evento di accesso non autorizzato che colpisce i dati dei clienti è classificato come incidente di sicurezza che richiede risposta formale.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Incident Response',
              italian: 'Risposta agli incidenti',
              pronunciation: '/ˈɪnsɪdənt rɪˈspɒns/',
              phonetic: 'IN-si-dent ri-SPONS',
              example:
                'A well-rehearsed incident response plan reduced our recovery time from three days to under six hours last quarter. = Un piano di risposta agli incidenti ben collaudato ha ridotto il nostro tempo di recovery da tre giorni a meno di sei ore lo scorso trimestre.',
              context: 'automation',
              difficulty: 'advanced',
              note: 'Abbreviato IR.',
            },
            {
              english: 'Severity',
              italian: 'Gravità',
              pronunciation: '/sɪˈvɛrəti/',
              phonetic: 'si-VE-re-ti',
              example:
                'Only findings with a severity of high or critical block the pipeline; medium issues generate warnings. = Solo i finding con severità alta o critica bloccano la pipeline; i problemi medi generano avvisi.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'SEV-1',
              italian: 'Incidente critico (SEV-1)',
              pronunciation: '/sɛv wʌn/',
              phonetic: 'SEV-UAN',
              example:
                'Declaring a SEV-1 triggers the on-call chain, opens a war room, and requires executive notification within thirty minutes. = Dichiarare un SEV-1 attiva la catena di reperibilità, apre una war room e richiede la notifica ai dirigenti entro trenta minuti.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Incident Commander',
              italian: "Comandante dell'incidente",
              pronunciation: '/ˈɪnsɪdənt kəˈmɑːndə/',
              phonetic: 'IN-si-dent ko-MAN-der',
              example:
                "The incident commander coordinates all response activities and serves as the single point of communication during the crisis. = Il comandante dell'incidente coordina tutte le attività di risposta e funge da singolo punto di comunicazione durante la crisi.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Scribe',
              italian: 'Scriba',
              pronunciation: '/skraɪb/',
              phonetic: 'SKRAIB',
              example:
                'The scribe documents every decision, action, and timestamp in the war room channel for the post-mortem review. = Lo scribe documenta ogni decisione, azione e timestamp nel canale della war room per la revisione post-mortem.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'War Room',
              italian: 'Sala di crisi (war room)',
              pronunciation: '/wɔː ruːm/',
              phonetic: 'UOR RUM',
              example:
                "All responders join the dedicated war room channel where the incident commander assigns tasks and tracks progress. = Tutti i risponditori si uniscono al canale dedicato della war room dove il comandante dell'incidente assegna compiti e traccia il progresso.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'On-Call',
              italian: 'Reperibile',
              pronunciation: '/ɒn kɔːl/',
              phonetic: 'ON-KOL',
              example:
                "The on-call engineer is the first responder for any production alert and must acknowledge within fifteen minutes. = L'ingegnere di turno è il primo risponditore per qualsiasi avviso di produzione e deve rispondere entro quindici minuti.",
              context: 'automation',
              difficulty: 'advanced',
              tool: 'PagerDuty, Opsgenie',
            },
            {
              english: 'Pager',
              italian: 'Sistema di reperibilità (pager)',
              pronunciation: '/ˈpeɪdʒə/',
              phonetic: 'PEI-ger',
              example:
                "When a critical alert fires, the pager system calls the on-call engineer's phone if the initial notification is not acknowledged. = Quando scatta un avviso critico, il sistema di pager chiama il telefono dell'ingegnere di turno se la notifica iniziale non viene riconosciuta.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Escalation Policy',
              italian: 'Policy di escalation',
              pronunciation: '/ˌɛskəˈleɪʃən ˈpɒləsi/',
              phonetic: 'es-ka-LEI-scion PO-li-si',
              example:
                'The escalation policy routes unacknowledged alerts to the team lead after ten minutes and to the VP after thirty. = La policy di escalation instrada gli avvisi non riconosciuti al team lead dopo dieci minuti e al VP dopo trenta.',
              context: 'automation',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_automation_incident_2',
          title: 'IR Process / Processo IR',
          description: 'Le fasi della risposta',
          items: [
            {
              english: 'Detection',
              italian: 'Rilevamento',
              pronunciation: '/dɪˈtɛkʃən/',
              phonetic: 'di-TEK-scion',
              example:
                "The moment of initial detection triggers the incident response timer and determines how quickly containment actions begin. = Il momento del rilevamento iniziale avvia il timer di risposta all'incidente e determina quanto velocemente iniziano le azioni di contenimento.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Triage',
              italian: 'Classificazione iniziale per priorità (triage)',
              pronunciation: '/ˈtriːɑːʒ/',
              phonetic: 'TRI-asg',
              example:
                'During weekly triage meetings, the team classifies new vulnerability findings by severity and business impact. = Durante le riunioni di triage settimanali, il team classifica i nuovi finding di vulnerabilità per severità e impatto aziendale.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Containment',
              italian: 'Contenimento',
              pronunciation: '/kənˈteɪnmənt/',
              phonetic: 'kon-TEIN-ment',
              example:
                "Immediate containment isolated the compromised server from the network, preventing the attacker from moving laterally. = Il contenimento immediato ha isolato il server compromesso dalla rete, impedendo all'attaccante di muoversi lateralmente.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Eradication',
              italian: 'Eradicazione',
              pronunciation: '/ɪˌrædɪˈkeɪʃən/',
              phonetic: 'i-ra-di-KEI-scion',
              example:
                "During eradication, the team removed the backdoor, rotated all credentials, and rebuilt the affected server from a clean image. = Durante l'eradicazione, il team ha rimosso la backdoor, ruotato tutte le credenziali e ricostruito il server interessato da un'immagine pulita.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Recovery',
              italian: 'Ripristino',
              pronunciation: '/rɪˈkʌvəri/',
              phonetic: 'ri-KA-ve-ri',
              example:
                'The recovery phase restored services from verified backups and gradually brought traffic back to normal levels. = La fase di recovery ha ripristinato i servizi dai backup verificati e gradualmente riportato il traffico ai livelli normali.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Lessons Learned',
              italian: 'Lezioni apprese',
              pronunciation: '/ˈlɛsənz lɜːnd/',
              phonetic: 'LES-sons LERND',
              example:
                'The lessons learned session identified that missing MFA on the VPN was the root cause of the initial compromise. = La sessione di lessons learned ha identificato che la mancanza di MFA sulla VPN era la causa principale della compromissione iniziale.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Post-Mortem',
              italian: 'Analisi post-incidente (post-mortem)',
              pronunciation: '/pəʊst ˈmɔːtəm/',
              phonetic: 'POUST MOR-tem',
              example:
                'Publishing a blameless post-mortem after every significant incident builds organizational trust and improves future response. = Pubblicare un post-mortem senza colpa dopo ogni incidente significativo costruisce fiducia organizzativa e migliora la risposta futura.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Root Cause Analysis',
              italian: 'Analisi della causa radice',
              pronunciation: '/ruːt kɔːz əˈnæləsɪs/',
              phonetic: 'RUT-KOZ a-NA-le-sis',
              example:
                "The root cause analysis revealed that an expired certificate caused the monitoring gap that let the attacker persist. = L'analisi delle cause principali ha rivelato che un certificato scaduto ha causato la lacuna nel monitoraggio che ha permesso all'attaccante di persistere.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Action Item',
              italian: "Punto d'azione",
              pronunciation: '/ˈækʃən ˈaɪtəm/',
              phonetic: 'AK-scion AI-tem',
              example:
                'Every post-mortem produces at least three action items with assigned owners and deadlines tracked in Jira. = Ogni post-mortem produce almeno tre azioni correttive con responsabili assegnati e scadenze tracciate in Jira.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Timeline',
              italian: 'Cronologia',
              pronunciation: '/ˈtaɪmlaɪn/',
              phonetic: 'TAIM-lain',
              example:
                "The incident timeline reconstructed every event from the initial alert to full recovery in a minute-by-minute log. = La timeline dell'incidente ha ricostruito ogni evento dall'avviso iniziale al recovery completo in un log minuto per minuto.",
              context: 'automation',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_automation_incident_3',
          title: 'Rollback & Hotfix / Rollback e Hotfix',
          description: 'Recuperare in fretta da un incidente',
          items: [
            {
              english: 'Rollback',
              italian: 'Ripristino',
              pronunciation: '/ˈrəʊlbæk/',
              phonetic: 'ROL-bak',
              example:
                "After the hotfix introduced a regression, the team performed a rollback to the previous stable release within five minutes. = Dopo che l'hotfix ha introdotto una regressione, il team ha eseguito un rollback alla release stabile precedente entro cinque minuti.",
              context: 'automation',
              difficulty: 'advanced',
              command: 'kubectl rollout undo deploy/app',
            },
            {
              english: 'Hotfix Pipeline',
              italian: 'Pipeline di hotfix',
              pronunciation: '/ˈhɒtfɪks ˈpaɪplaɪn/',
              phonetic: 'HOT-fiks PAIP-lain',
              example:
                'The hotfix pipeline skips non-essential tests to deliver critical security patches to production in under thirty minutes. = La pipeline hotfix salta i test non essenziali per consegnare patch di sicurezza critiche in produzione in meno di trenta minuti.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Blue/Green Deploy',
              italian: 'Distribuzione blue/green (Blue/Green Deploy)',
              pronunciation: '/bluː ɡriːn dɪˈplɔɪ/',
              phonetic: 'BLU-GRIN di-PLOI',
              example:
                "Using a blue/green deploy strategy lets the team switch traffic to the patched environment instantly and roll back if needed. = Usare una strategia di deploy blue/green permette al team di spostare il traffico sull'ambiente patchato istantaneamente e fare rollback se necessario.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Canary Rollback',
              italian: 'Rollback canarino',
              pronunciation: '/kəˈnɛəri ˈrəʊlbæk/',
              phonetic: 'ka-NE-ri ROL-bak',
              example:
                'Automated metrics monitoring triggered a canary rollback after error rates exceeded the five-percent threshold. = Il monitoraggio automatico delle metriche ha attivato un canary rollback dopo che i tassi di errore hanno superato la soglia del cinque percento.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Feature Flag Kill Switch',
              italian: 'Kill switch via feature flag',
              pronunciation: '/ˈfiːtʃə flæɡ kɪl swɪtʃ/',
              phonetic: 'FI-cer FLAG KIL SUICI',
              example:
                'When the vulnerability was confirmed, the team toggled the feature flag kill switch to disable the affected module instantly. = Quando la vulnerabilità è stata confermata, il team ha attivato il kill switch del feature flag per disabilitare il modulo interessato istantaneamente.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Emergency Change',
              italian: "Modifica d'emergenza",
              pronunciation: '/ɪˈmɜːdʒənsi tʃeɪndʒ/',
              phonetic: 'i-MER-gen-si CIEINGG',
              example:
                'An emergency change bypasses the normal approval workflow but requires retroactive review within twenty-four hours. = Un cambio di emergenza bypassa il workflow di approvazione normale ma richiede una revisione retroattiva entro ventiquattro ore.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Backout Plan',
              italian: 'Piano di backout',
              pronunciation: '/ˈbækaʊt plæn/',
              phonetic: 'BAK-aut PLAN',
              example:
                'Every production deployment includes a documented backout plan describing how to revert if the change causes issues. = Ogni deployment in produzione include un piano di backout documentato che descrive come revertire se la modifica causa problemi.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Service Degradation',
              italian: 'Degrado del servizio',
              pronunciation: '/ˈsɜːvɪs ˌdɛɡrəˈdeɪʃən/',
              phonetic: 'SER-vis de-gra-DEI-scion',
              example:
                "During the incident, the team chose graceful service degradation over a full outage, disabling only the compromised feature. = Durante l'incidente, il team ha scelto un degrado graduale del servizio invece di un'interruzione completa, disabilitando solo la funzionalità compromessa.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Status Page',
              italian: 'Pagina di stato',
              pronunciation: '/ˈsteɪtəs peɪdʒ/',
              phonetic: 'STEI-tas PEIGG',
              example:
                'Updating the public status page within fifteen minutes of a confirmed incident maintains customer trust and transparency. = Aggiornare la pagina di stato pubblica entro quindici minuti da un incidente confermato mantiene la fiducia dei clienti e la trasparenza.',
              context: 'automation',
              difficulty: 'advanced',
              tool: 'Statuspage, Statusgator',
            },
            {
              english: 'Customer Communication',
              italian: 'Comunicazione al cliente',
              pronunciation: '/ˈkʌstəmə kəˌmjuːnɪˈkeɪʃən/',
              phonetic: 'KAS-to-mer ko-miu-ni-KEI-scion',
              example:
                'The communication playbook templates ensure consistent, timely customer communication during security incidents. = I template del playbook di comunicazione assicurano una comunicazione ai clienti coerente e tempestiva durante gli incidenti di sicurezza.',
              context: 'automation',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_automation_incident_4',
          title: 'Forensics / Forense',
          description: 'Conservare e analizzare le prove',
          items: [
            {
              english: 'Forensics',
              italian: 'Forense',
              pronunciation: '/fəˈrɛnsɪks/',
              phonetic: 'fo-REN-siks',
              example:
                "The forensics team created a bit-for-bit disk image of the compromised server before any remediation began. = Il team di forensica ha creato un'immagine disco bit per bit del server compromesso prima che iniziasse qualsiasi remediation.",
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Chain of Custody',
              italian: 'Catena di custodia',
              pronunciation: '/tʃeɪn əv ˈkʌstədi/',
              phonetic: 'CIEIN-OV KAS-to-di',
              example:
                'Maintaining a strict chain of custody for evidence ensures it remains admissible in legal proceedings. = Mantenere una rigorosa catena di custodia per le prove assicura che rimangano ammissibili nei procedimenti legali.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Disk Image',
              italian: 'Immagine del disco',
              pronunciation: '/dɪsk ˈɪmɪdʒ/',
              phonetic: 'DISK I-migg',
              example:
                "The analyst mounted the forensic disk image in a sandboxed environment to analyze malware artifacts safely. = L'analista ha montato l'immagine disco forense in un ambiente sandboxed per analizzare gli artefatti malware in sicurezza.",
              context: 'automation',
              difficulty: 'advanced',
              command: 'dd if=/dev/sda of=image.raw bs=4M',
            },
            {
              english: 'Memory Dump',
              italian: 'Dump della memoria',
              pronunciation: '/ˈmɛməri dʌmp/',
              phonetic: 'ME-mo-ri DAMP',
              example:
                'Capturing a live memory dump before shutting down the server preserved encryption keys and network connections in use. = Acquisire un dump della memoria live prima di spegnere il server ha preservato chiavi di crittografia e connessioni di rete in uso.',
              context: 'automation',
              difficulty: 'advanced',
              tool: 'Volatility',
            },
            {
              english: 'Timeline Analysis',
              italian: 'Analisi della cronologia',
              pronunciation: '/ˈtaɪmlaɪn əˈnæləsɪs/',
              phonetic: 'TAIM-lain a-NA-le-sis',
              example:
                "Forensic timeline analysis correlated file system timestamps with network logs to reconstruct the attacker's exact sequence. = L'analisi forense della timeline ha correlato i timestamp del filesystem con i log di rete per ricostruire la sequenza esatta dell'attaccante.",
              context: 'automation',
              difficulty: 'advanced',
              tool: 'Plaso, log2timeline',
            },
            {
              english: 'IOC Sweep',
              italian: 'Spazzata di IOC',
              pronunciation: '/aɪ əʊ siː swiːp/',
              phonetic: 'AI-O-SI SUIP',
              example:
                'Running an IOC sweep across all endpoints confirmed that only one server was affected by the specific malware variant. = Eseguire un IOC sweep su tutti gli endpoint ha confermato che solo un server era colpito dalla specifica variante di malware.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Evidence Locker',
              italian: 'Armadietto delle prove',
              pronunciation: '/ˈɛvɪdəns ˈlɒkə/',
              phonetic: 'E-vi-dens LO-ker',
              example:
                'All forensic artifacts are stored in a write-once evidence locker with tamper-evident seals and access logging. = Tutti gli artefatti forensi sono memorizzati in un evidence locker write-once con sigilli anti-manomissione e logging degli accessi.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Hash Verification',
              italian: "Verifica dell'hash",
              pronunciation: '/hæʃ ˌvɛrɪfɪˈkeɪʃən/',
              phonetic: 'HASH ve-ri-fi-KEI-scion',
              example:
                "Before analyzing the disk image, the examiner performed hash verification to confirm the copy matches the original. = Prima di analizzare l'immagine disco, l'esaminatore ha eseguito la verifica dell'hash per confermare che la copia corrisponde all'originale.",
              context: 'automation',
              difficulty: 'advanced',
              command: 'sha256sum image.raw',
            },
            {
              english: 'Cold Storage',
              italian: 'Storage freddo',
              pronunciation: '/kəʊld ˈstɔːrɪdʒ/',
              phonetic: 'KOULD STO-rigg',
              example:
                'Older forensic evidence moves to cold storage on encrypted tapes with a documented retrieval process. = Le prove forensi più vecchie vengono spostate in cold storage su nastri crittografati con un processo di recupero documentato.',
              context: 'automation',
              difficulty: 'advanced',
            },
            {
              english: 'Containment Network',
              italian: 'Rete di contenimento',
              pronunciation: '/kənˈteɪnmənt ˈnɛtwɜːk/',
              phonetic: 'kon-TEIN-ment NET-uork',
              example:
                "Moving the compromised host to a containment network lets analysts observe attacker behavior without risking further spread. = Spostare l'host compromesso in una rete di contenimento permette agli analisti di osservare il comportamento dell'attaccante senza rischiare ulteriore diffusione.",
              context: 'automation',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 19 - KUBERNETES SECURITY
    // ════════════════════════════════════════════════
    19: {
      name: 'Sicurezza di Kubernetes / Kubernetes Security',
      description: 'Network policies, RBAC e Gatekeeper',
      lessons: [
        {
          id: 'dso_container_security_k8s_1',
          title: 'K8s RBAC / RBAC di K8s',
          description: 'Role-Based Access Control in Kubernetes',
          items: [
            {
              english: 'RBAC',
              italian: 'Role-Based Access Control (RBAC)',
              pronunciation: '/ɑːr biː eɪ siː/',
              phonetic: 'AR-BI-EI-SI',
              example:
                "Implementing fine-grained RBAC in Kubernetes ensures that developers can only manage resources within their own namespace. = Implementare un RBAC granulare in Kubernetes assicura che gli sviluppatori possano gestire risorse solo all'interno del proprio namespace.",
              context: 'container-security',
              difficulty: 'advanced',
              note: 'Role-Based Access Control.',
            },
            {
              english: 'Role',
              italian: 'Ruolo',
              pronunciation: '/rəʊl/',
              phonetic: 'ROUL',
              example:
                'Creating a dedicated deployment role with only the required permissions prevents developers from exceeding their access. = Creare un ruolo di deployment dedicato con solo i permessi necessari impedisce agli sviluppatori di eccedere il loro accesso.',
              context: 'container-security',
              difficulty: 'advanced',
              code: 'kind: Role\nrules:\n- verbs: [get,list]',
            },
            {
              english: 'ClusterRole',
              italian: 'Ruolo a livello cluster K8s (ClusterRole)',
              pronunciation: '/ˈklʌstərəʊl/',
              phonetic: 'KLAS-ter-roul',
              example:
                'A read-only ClusterRole lets the monitoring service list pods and nodes across all namespaces without write access. = Un ClusterRole in sola lettura permette al servizio di monitoraggio di elencare pod e nodi in tutti i namespace senza accesso in scrittura.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'RoleBinding',
              italian: 'Aggancio ruolo a soggetto K8s (RoleBinding)',
              pronunciation: '/rəʊl ˈbaɪndɪŋ/',
              phonetic: 'ROUL BAIN-ding',
              example:
                'Creating a RoleBinding ties the developer group to the edit role only in the development namespace. = Creare un RoleBinding lega il gruppo degli sviluppatori al ruolo edit solo nel namespace di sviluppo.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'ServiceAccount',
              italian: 'Account di servizio K8s (ServiceAccount)',
              pronunciation: '/ˈsɜːvɪs əˈkaʊnt/',
              phonetic: 'SER-vis a-KAUNT',
              example:
                'Each pod runs under a dedicated ServiceAccount with the minimum set of API permissions it requires. = Ogni pod gira sotto un ServiceAccount dedicato con il set minimo di permessi API di cui ha bisogno.',
              context: 'container-security',
              difficulty: 'advanced',
              code: 'serviceAccountName: my-sa',
            },
            {
              english: 'Subject',
              italian: 'Soggetto',
              pronunciation: '/ˈsʌbdʒɪkt/',
              phonetic: 'SAB-gekt',
              example:
                "The RoleBinding references each subject by kind—User, Group, or ServiceAccount—to control who gets access. = Il RoleBinding referenzia ogni soggetto per tipo—User, Group o ServiceAccount—per controllare chi ottiene l'accesso.",
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Verb',
              italian: 'Verbo',
              pronunciation: '/vɜːb/',
              phonetic: 'VERB',
              example:
                'Restricting the allowed verbs to get and list on the secrets resource prevents unauthorized modifications. = Limitare i verbi permessi a get e list sulla risorsa secrets previene modifiche non autorizzate.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Resource',
              italian: 'Risorsa',
              pronunciation: '/rɪˈzɔːs/',
              phonetic: 'ri-ZORS',
              example:
                'The RBAC rule restricts which resource types each ServiceAccount can access, limiting pods to only their own configmaps. = La regola RBAC limita quali tipi di risorsa ogni ServiceAccount può accedere, limitando i pod solo alle proprie configmap.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Namespace Boundary',
              italian: 'Confine del namespace',
              pronunciation: '/ˈneɪmspeɪs ˈbaʊndəri/',
              phonetic: 'NEIM-speis BAUN-da-ri',
              example:
                "Enforcing a strict namespace boundary prevents one team's workloads from accessing another team's secrets and config maps. = Imporre un confine di namespace rigoroso impedisce ai workload di un team di accedere ai secret e alle config map di un altro team.",
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'kube-rbac-proxy',
              italian: 'Proxy di autorizzazione (kube-rbac-proxy)',
              pronunciation: '/kjuːb ɑːr biː eɪ siː ˈprɒksi/',
              phonetic: 'KIUB-AR-BI-EI-SI PROK-si',
              example:
                "Deploying kube-rbac-proxy as a sidecar adds fine-grained authorization to custom metrics endpoints exposed by the application. = Deployare kube-rbac-proxy come sidecar aggiunge autorizzazione granulare agli endpoint di metriche personalizzate esposti dall'applicazione.",
              context: 'container-security',
              difficulty: 'advanced',
              tool: 'kube-rbac-proxy',
            },
          ],
        },
        {
          id: 'dso_container_security_k8s_2',
          title: 'Network Policies / Policy di Rete',
          description: 'Microsegmentazione in Kubernetes',
          items: [
            {
              english: 'Network Policy',
              italian: 'Policy di rete',
              pronunciation: '/ˈnɛtwɜːk ˈpɒləsi/',
              phonetic: 'NET-uork PO-li-si',
              example:
                "Applying a network policy that blocks all egress except DNS and the API server limits what a compromised pod can reach. = Applicare una network policy che blocca tutto l'egress tranne DNS e l'API server limita ciò che un pod compromesso può raggiungere.",
              context: 'container-security',
              difficulty: 'advanced',
              code: 'kind: NetworkPolicy\npodSelector: {}',
            },
            {
              english: 'Default Deny',
              italian: 'Nega di default (default deny)',
              pronunciation: '/dɪˈfɔːlt dɪˈnaɪ/',
              phonetic: 'di-FOLT di-NAI',
              example:
                'Setting default deny on every namespace means all traffic is blocked unless an explicit network policy allows it. = Impostare default deny su ogni namespace significa che tutto il traffico è bloccato a meno che una network policy esplicita lo permetta.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Egress Policy',
              italian: 'Policy di egress',
              pronunciation: '/ˈiːɡrɛs ˈpɒləsi/',
              phonetic: 'I-gres PO-li-si',
              example:
                "The egress policy limits outbound traffic from the payment pod to only the bank's API endpoint on port 443. = La policy di egress limita il traffico in uscita dal pod di pagamento solo all'endpoint API della banca sulla porta 443.",
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Ingress Policy',
              italian: 'Policy di ingress',
              pronunciation: '/ˈɪnɡrɛs ˈpɒləsi/',
              phonetic: 'IN-gres PO-li-si',
              example:
                "An ingress policy ensures that only the API gateway pod can send traffic to the backend service pods. = Una policy di ingress assicura che solo il pod dell'API gateway possa inviare traffico ai pod del servizio backend.",
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Pod Selector',
              italian: 'Selettore di pod',
              pronunciation: '/pɒd sɪˈlɛktə/',
              phonetic: 'POD si-LEK-ter',
              example:
                'The network policy uses a pod selector with the label app=frontend to apply rules only to the web-facing containers. = La network policy usa un pod selector con il label app=frontend per applicare regole solo ai container web-facing.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Namespace Selector',
              italian: 'Selettore di namespace',
              pronunciation: '/ˈneɪmspeɪs sɪˈlɛktə/',
              phonetic: 'NEIM-speis si-LEK-ter',
              example:
                'Adding a namespace selector allows the monitoring namespace to scrape metrics from all application namespaces. = Aggiungere un namespace selector permette al namespace di monitoraggio di raccogliere metriche da tutti i namespace applicativi.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Calico',
              italian: 'Calico (CNI Kubernetes con NetworkPolicy)',
              pronunciation: '/ˈkælɪkəʊ/',
              phonetic: 'KA-li-ko',
              example:
                'Switching to Calico network policies gave us the ability to write rules based on DNS names instead of just IP addresses. = Passare alle network policy Calico ci ha dato la possibilità di scrivere regole basate su nomi DNS invece che solo su indirizzi IP.',
              context: 'container-security',
              difficulty: 'advanced',
              tool: 'Calico',
            },
            {
              english: 'Cilium NetworkPolicy',
              italian: 'NetworkPolicy Cilium',
              pronunciation: '/ˈsɪliəm ˈnɛtwɜːk ˈpɒləsi/',
              phonetic: 'SI-lium NET-uork PO-li-si',
              example:
                'A Cilium NetworkPolicy can enforce layer-seven rules that allow HTTP GET but block HTTP DELETE on the same endpoint. = Una Cilium NetworkPolicy può imporre regole a livello sette che permettono HTTP GET ma bloccano HTTP DELETE sullo stesso endpoint.',
              context: 'container-security',
              difficulty: 'advanced',
              tool: 'Cilium',
            },
            {
              english: 'Service Mesh Policy',
              italian: 'Policy del service mesh',
              pronunciation: '/ˈsɜːvɪs mɛʃ ˈpɒləsi/',
              phonetic: 'SER-vis MESH PO-li-si',
              example:
                'The service mesh policy requires mutual TLS for all east-west traffic between microservices in the cluster. = La policy della service mesh richiede TLS reciproco per tutto il traffico est-ovest tra microservizi nel cluster.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Microsegmentation',
              italian: 'Microsegmentazione',
              pronunciation: '/ˌmaɪkrəʊˌsɛɡmɛnˈteɪʃən/',
              phonetic: 'mai-kro-seg-men-TEI-scion',
              example:
                "Applying microsegmentation limits blast radius so that a compromised pod cannot communicate with unrelated services. = Applicare la microsegmentazione limita il raggio d'impatto così che un pod compromesso non possa comunicare con servizi non correlati.",
              context: 'container-security',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_container_security_k8s_3',
          title: 'Pod Security Standards / Standard di Sicurezza Pod',
          description: 'PSS e Gatekeeper',
          items: [
            {
              english: 'Pod Security Standard',
              italian: 'Standard di sicurezza pod K8s (Pod Security Standard)',
              pronunciation: '/pɒd sɪˈkjʊərəti ˈstændəd/',
              phonetic: 'POD si-KIU-ri-ti STAN-dard',
              example:
                "Applying the restricted Pod Security Standard prevents containers from running as root or mounting host paths. = Applicare il Pod Security Standard ristretto impedisce ai container di girare come root o montare percorsi dell'host.",
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Privileged Profile',
              italian: 'Profilo privileged',
              pronunciation: '/ˈprɪvəlɪdʒd ˈprəʊfaɪl/',
              phonetic: 'PRI-vi-leggd PRO-fail',
              example:
                'The privileged profile should only be assigned to system-level DaemonSets that genuinely need host-level access. = Il profilo privileged dovrebbe essere assegnato solo ai DaemonSet a livello di sistema che necessitano genuinamente di accesso a livello host.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Baseline Profile',
              italian: 'Profilo baseline',
              pronunciation: '/ˈbeɪslaɪn ˈprəʊfaɪl/',
              phonetic: 'BEIS-lain PRO-fail',
              example:
                "Applying the baseline profile to the staging namespace prevents privilege escalation while allowing most common workloads. = Applicare il profilo baseline al namespace di staging previene l'escalation dei privilegi pur permettendo la maggior parte dei workload comuni.",
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Restricted Profile',
              italian: 'Profilo restricted',
              pronunciation: '/rɪˈstrɪktɪd ˈprəʊfaɪl/',
              phonetic: 'ri-STRIK-ted PRO-fail',
              example:
                "Production namespaces enforce the restricted profile, which mandates non-root execution and read-only filesystems. = I namespace di produzione impongono il profilo restricted, che impone l'esecuzione non-root e filesystem in sola lettura.",
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'OPA Gatekeeper',
              italian: 'OPA per Kubernetes (OPA Gatekeeper)',
              pronunciation: '/ˈəʊpə ˈɡeɪtkiːpə/',
              phonetic: 'O-pa GHEIT-ki-per',
              example:
                "Deploying OPA Gatekeeper on the cluster enforces constraint templates that reject non-compliant workloads at admission. = Deployare OPA Gatekeeper sul cluster impone constraint template che rifiutano i workload non conformi all'ammissione.",
              context: 'container-security',
              difficulty: 'advanced',
              tool: 'OPA Gatekeeper',
            },
            {
              english: 'Constraint Template',
              italian: 'Template di vincolo',
              pronunciation: '/kənˈstreɪnt ˈtɛmpleɪt/',
              phonetic: 'kon-STREINT TEM-pleit',
              example:
                'A parameterized constraint template lets teams reuse the same validation logic with different threshold values. = Un constraint template parametrizzato permette ai team di riutilizzare la stessa logica di validazione con valori di soglia diversi.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Mutation',
              italian: 'Mutazione',
              pronunciation: '/mjuːˈteɪʃən/',
              phonetic: 'miu-TEI-scion',
              example:
                'The Kyverno mutation policy automatically adds resource limits to any pod that a developer forgets to specify. = La policy di mutazione Kyverno aggiunge automaticamente limiti di risorse a qualsiasi pod che uno sviluppatore dimentica di specificare.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Audit Mode',
              italian: 'Modalità audit',
              pronunciation: '/ˈɔːdɪt məʊd/',
              phonetic: 'O-dit MOUD',
              example:
                'Running the new policy in audit mode for two weeks revealed twenty non-compliant deployments without disrupting production. = Eseguire la nuova policy in modalità audit per due settimane ha rivelato venti deployment non conformi senza interrompere la produzione.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Pod Security Admission',
              italian: 'Controller di sicurezza pod (Pod Security Admission)',
              pronunciation: '/pɒd sɪˈkjʊərəti ədˈmɪʃən/',
              phonetic: 'POD si-KIU-ri-ti ad-MI-scion',
              example:
                'Configuring Pod Security Admission at the namespace level enforces security standards without installing any third-party controller. = Configurare Pod Security Admission a livello di namespace impone standard di sicurezza senza installare alcun controller di terze parti.',
              context: 'container-security',
              difficulty: 'advanced',
              code: 'pod-security.kubernetes.io/enforce: restricted',
            },
            {
              english: 'Validating Admission Policy',
              italian: 'Policy di ammissione (Validating Admission Policy)',
              pronunciation: '/ˈvælɪdeɪtɪŋ ədˈmɪʃən ˈpɒləsi/',
              phonetic: 'VA-li-dei-ting ad-MI-scion PO-li-si',
              example:
                'Writing a validating admission policy in CEL provides native Kubernetes enforcement without depending on OPA or Kyverno. = Scrivere una validating admission policy in CEL fornisce enforcement nativo Kubernetes senza dipendere da OPA o Kyverno.',
              context: 'container-security',
              difficulty: 'advanced',
              note: 'Built-in CEL admission control.',
            },
          ],
        },
        {
          id: 'dso_container_security_k8s_4',
          title: 'Cluster Hardening / Hardening del Cluster',
          description: "Sicurezza dell'intero cluster",
          items: [
            {
              english: 'API Server Hardening',
              italian: "Hardening dell'API server",
              pronunciation: '/eɪ piː aɪ ˈsɜːvə ˈhɑːdənɪŋ/',
              phonetic: 'EI-PI-AI SER-ver HAR-de-ning',
              example:
                "Proper API server hardening includes disabling anonymous authentication, enabling audit logging, and encrypting etcd data. = Un corretto hardening dell'API server include disabilitare l'autenticazione anonima, abilitare il logging di audit e crittografare i dati etcd.",
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'etcd Encryption',
              italian: 'Cifratura di etcd',
              pronunciation: '/ɛtsiːdiː ɪnˈkrɪpʃən/',
              phonetic: 'ET-SI-DI in-KRIP-scion',
              example:
                'Enabling etcd encryption ensures that all secrets stored in the cluster database are encrypted at rest with AES-256. = Abilitare la crittografia etcd assicura che tutti i secret memorizzati nel database del cluster siano crittografati a riposo con AES-256.',
              context: 'container-security',
              difficulty: 'advanced',
              code: 'EncryptionConfiguration with aescbc',
            },
            {
              english: 'Audit Policy',
              italian: 'Policy di audit',
              pronunciation: '/ˈɔːdɪt ˈpɒləsi/',
              phonetic: 'O-dit PO-li-si',
              example:
                'The Kubernetes audit policy captures all requests to secrets and configmaps at the metadata level for security review. = La policy di audit Kubernetes cattura tutte le richieste a secret e configmap a livello di metadati per la revisione di sicurezza.',
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Node Isolation',
              italian: 'Isolamento dei nodi',
              pronunciation: '/nəʊd ˌaɪsəˈleɪʃən/',
              phonetic: 'NOUD ai-so-LEI-scion',
              example:
                "Using taints for node isolation ensures that sensitive workloads run only on dedicated hardware with stricter controls. = Usare i taint per l'isolamento dei nodi assicura che i workload sensibili girino solo su hardware dedicato con controlli più rigorosi.",
              context: 'container-security',
              difficulty: 'advanced',
            },
            {
              english: 'Taint',
              italian: 'Etichetta che respinge pod K8s (taint)',
              pronunciation: '/teɪnt/',
              phonetic: 'TEINT',
              example:
                'Adding a taint to GPU nodes prevents non-GPU workloads from being scheduled there and wasting specialized resources. = Aggiungere un taint ai nodi GPU impedisce che workload non-GPU vengano schedulati lì e sprechino risorse specializzate.',
              context: 'container-security',
              difficulty: 'advanced',
              command: 'kubectl taint nodes node1 sec=true:NoSchedule',
            },
            {
              english: 'GVisor',
              italian: 'Sandbox container Google (gVisor)',
              pronunciation: '/ˈdʒiːˌvaɪzə/',
              phonetic: 'GI-VAI-zer',
              example:
                'Running untrusted containers with gVisor provides an additional kernel-level sandbox that intercepts all syscalls. = Eseguire container non fidati con gVisor fornisce un sandbox aggiuntivo a livello kernel che intercetta tutte le syscall.',
              context: 'container-security',
              difficulty: 'advanced',
              tool: 'Google gVisor',
            },
            {
              english: 'Kata Containers',
              italian: 'Container con isolamento VM (Kata Containers)',
              pronunciation: '/ˈkɑːtə kənˈteɪnəz/',
              phonetic: 'KA-ta kon-TEI-ners',
              example:
                'Using Kata Containers gives each pod a lightweight virtual machine boundary, providing stronger isolation than standard containers. = Usare Kata Containers dà a ogni pod un confine di macchina virtuale leggero, fornendo un isolamento più forte dei container standard.',
              context: 'container-security',
              difficulty: 'advanced',
              tool: 'Kata Containers',
            },
            {
              english: 'Trivy K8s',
              italian: 'Scansione cluster Kubernetes (Trivy K8s)',
              pronunciation: '/ˈtrɪvi keɪ eɪtɛs/',
              phonetic: 'TRI-vi KEI-EITS',
              example:
                'Running Trivy K8s against the live cluster reveals misconfigured RBAC roles, exposed secrets, and vulnerable running images. = Eseguire Trivy K8s sul cluster live rivela ruoli RBAC mal configurati, secret esposti e immagini in esecuzione vulnerabili.',
              context: 'container-security',
              difficulty: 'advanced',
              tool: 'Trivy',
              command: 'trivy k8s cluster',
            },
            {
              english: 'kubescape',
              italian: 'Kubescape (scanner di sicurezza K8s)',
              pronunciation: '/ˈkjuːbskeɪp/',
              phonetic: 'KIUB-skeip',
              example:
                'Scheduling nightly kubescape scans with CIS and NSA frameworks generates a compliance score for each Kubernetes namespace. = Programmare scansioni kubescape notturne con i framework CIS e NSA genera un punteggio di compliance per ogni namespace Kubernetes.',
              context: 'container-security',
              difficulty: 'advanced',
              tool: 'kubescape',
              command: 'kubescape scan framework nsa',
            },
            {
              english: 'CIS K8s Benchmark',
              italian: 'Benchmark CIS K8s',
              pronunciation: '/siː aɪ ɛs keɪ eɪtɛs/',
              phonetic: 'SI-AI-ES KEI-EITS',
              example:
                "Running the CIS K8s Benchmark on the master nodes flagged that the API server was not using TLS certificate rotation. = Eseguire il CIS K8s Benchmark sui nodi master ha segnalato che l'API server non usava la rotazione dei certificati TLS.",
              context: 'container-security',
              difficulty: 'advanced',
              tool: 'kube-bench',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 20 - DEVSECOPS MATURITY
    // ════════════════════════════════════════════════
    20: {
      name: 'Maturità DevSecOps / DevSecOps Maturity',
      description: 'Modelli di maturità, KPI e debt di sicurezza',
      lessons: [
        {
          id: 'dso_culture_maturity_1',
          title: 'Maturity Models / Modelli di Maturità',
          description: 'OWASP DSOMM, SAMM, BSIMM',
          items: [
            {
              english: 'Maturity Model',
              italian: 'Modello di maturità',
              pronunciation: '/məˈtʃʊərəti ˈmɒdl/',
              phonetic: 'ma-CIU-re-ti MO-del',
              example:
                "Evaluating the organization against a DevSecOps maturity model reveals which security practices need the most improvement. = Valutare l'organizzazione contro un modello di maturità DevSecOps rivela quali pratiche di sicurezza necessitano di più miglioramento.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'OWASP DSOMM',
              italian: 'DevSecOps Maturity Model (OWASP DSOMM)',
              pronunciation: '/ˈəʊwɒsp ˈdiːsɒm/',
              phonetic: 'O-uosp DI-som',
              example:
                "Scoring our program against the OWASP DSOMM highlighted that dynamic testing and secret management were at the lowest maturity. = Valutare il nostro programma contro l'OWASP DSOMM ha evidenziato che il testing dinamico e la gestione dei segreti erano al livello di maturità più basso.",
              context: 'culture',
              difficulty: 'advanced',
              note: 'DevSecOps Maturity Model.',
            },
            {
              english: 'OWASP SAMM',
              italian: 'Software Assurance Maturity Model (OWASP SAMM)',
              pronunciation: '/ˈəʊwɒsp sæm/',
              phonetic: 'O-uosp SAM',
              example:
                'The OWASP SAMM assessment showed that our governance and design practices scored well but our verification was weak. = La valutazione OWASP SAMM ha mostrato che le nostre pratiche di governance e design avevano buoni punteggi ma la verifica era debole.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Software Assurance Maturity Model.',
            },
            {
              english: 'BSIMM',
              italian: 'Building Security In Maturity Model (BSIMM)',
              pronunciation: '/ˈbɪzɪm/',
              phonetic: 'BIS-im',
              example:
                'Comparing our security activities against the BSIMM study revealed that we lag behind peers in penetration testing frequency. = Confrontare le nostre attività di sicurezza con lo studio BSIMM ha rivelato che siamo indietro rispetto ai pari nella frequenza di penetration testing.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Building Security In Maturity Model.',
            },
            {
              english: 'NIST SSDF',
              italian: 'Secure Software Development Framework (NIST SSDF)',
              pronunciation: '/nɪst ɛs ɛs diː ɛf/',
              phonetic: 'NIST ES-ES-DI-EF',
              example:
                'Aligning our SDLC practices with the NIST SSDF ensures compliance with federal secure software development requirements. = Allineare le nostre pratiche SDLC con il NIST SSDF assicura la conformità con i requisiti federali di sviluppo software sicuro.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Secure Software Development Framework.',
            },
            {
              english: 'Capability Level',
              italian: 'Livello di capacità',
              pronunciation: '/ˌkeɪpəˈbɪləti ˈlɛvl/',
              phonetic: 'kei-pa-BI-li-ti LE-vel',
              example:
                "Moving from capability level one to two requires automating at least eighty percent of the security testing activities. = Passare dal livello di capability uno al due richiede l'automazione di almeno l'ottanta percento delle attività di testing di sicurezza.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Activity',
              italian: 'Attività',
              pronunciation: '/ækˈtɪvəti/',
              phonetic: 'ak-TI-vi-ti',
              example:
                'Each security activity in the maturity model maps to a specific team, tool, and measurable outcome. = Ogni attività di sicurezza nel modello di maturità corrisponde a un team specifico, uno strumento e un risultato misurabile.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Practice',
              italian: 'Pratica',
              pronunciation: '/ˈpræktɪs/',
              phonetic: 'PRAK-tis',
              example:
                'The secure build practice ensures that all CI pipelines include image scanning, signing, and SBOM generation. = La pratica di build sicura assicura che tutte le pipeline CI includano scansione delle immagini, firma e generazione SBOM.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Domain',
              italian: 'Dominio',
              pronunciation: '/dəˈmeɪn/',
              phonetic: 'do-MEIN',
              example:
                'Each domain in the maturity model groups related security practices such as build, deploy, and operate. = Ogni dominio nel modello di maturità raggruppa pratiche di sicurezza correlate come build, deploy e operate.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Self-Assessment',
              italian: 'Auto-valutazione',
              pronunciation: '/sɛlf əˈsɛsmənt/',
              phonetic: 'SELF a-SES-ment',
              example:
                "Each team completes a quarterly self-assessment to identify gaps in their security testing and incident response readiness. = Ogni team completa un'auto-valutazione trimestrale per identificare lacune nel testing di sicurezza e nella prontezza di risposta agli incidenti.",
              context: 'culture',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_culture_maturity_2',
          title: 'Metrics & KPIs / Metriche e KPI',
          description: 'Misurare la sicurezza',
          items: [
            {
              english: 'Security Metric',
              italian: 'Metrica di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ˈmɛtrɪk/',
              phonetic: 'si-KIU-ri-ti ME-trik',
              example:
                "Tracking the right security metric like mean time to remediate gives leadership actionable insight into program effectiveness. = Tracciare la metrica di sicurezza giusta come il tempo medio di remediation dà alla leadership un insight azionabile sull'efficacia del programma.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Coverage',
              italian: 'Copertura',
              pronunciation: '/ˈkʌvərɪdʒ/',
              phonetic: 'KA-ve-rigg',
              example:
                'Measuring SAST coverage across all repositories revealed that thirty percent of codebases had no automated scanning at all. = Misurare la copertura SAST su tutti i repository ha rivelato che il trenta percento dei codebase non aveva alcuna scansione automatizzata.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Defect Density',
              italian: 'Densità dei difetti',
              pronunciation: '/ˈdiːfɛkt ˈdɛnsəti/',
              phonetic: 'DI-fekt DEN-si-ti',
              example:
                'The team reduced defect density from twelve security bugs per thousand lines of code to three after adopting secure coding training. = Il team ha ridotto la densità dei difetti da dodici bug di sicurezza per mille righe di codice a tre dopo aver adottato la formazione sulla codifica sicura.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Time to Remediate',
              italian: 'Tempo per rimediare',
              pronunciation: '/taɪm tuː rɪˈmiːdieɪt/',
              phonetic: 'TAIM-TU ri-MI-di-eit',
              example:
                'Cutting the average time to remediate critical vulnerabilities from thirty days to seven demonstrates measurable security improvement. = Ridurre il tempo medio di remediation delle vulnerabilità critiche da trenta giorni a sette dimostra un miglioramento misurabile della sicurezza.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Escape Rate',
              italian: 'Tasso di fuga',
              pronunciation: '/ɪˈskeɪp reɪt/',
              phonetic: 'i-SKEIP REIT',
              example:
                "A low escape rate means most vulnerabilities are caught before production, proving the effectiveness of shift-left testing. = Un basso tasso di escape significa che la maggior parte delle vulnerabilità viene intercettata prima della produzione, dimostrando l'efficacia del testing shift-left.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Recurrence Rate',
              italian: 'Tasso di ricorrenza',
              pronunciation: '/rɪˈkʌrəns reɪt/',
              phonetic: 'ri-KA-rens REIT',
              example:
                'Tracking the recurrence rate of fixed vulnerabilities ensures that similar bugs do not reappear in future releases. = Tracciare il tasso di ricorrenza delle vulnerabilità corrette assicura che bug simili non ricompaiano nelle release future.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Adoption Rate',
              italian: 'Tasso di adozione',
              pronunciation: '/əˈdɒpʃən reɪt/',
              phonetic: 'a-DOP-scion REIT',
              example:
                "The adoption rate of the new SAST tool reached ninety percent within three months thanks to developer-friendly IDE integration. = Il tasso di adozione del nuovo strumento SAST ha raggiunto il novanta percento in tre mesi grazie all'integrazione IDE developer-friendly.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Training Completion',
              italian: 'Completamento del training',
              pronunciation: '/ˈtreɪnɪŋ kəmˈpliːʃən/',
              phonetic: 'TREI-ning kom-PLI-scion',
              example:
                'Monitoring training completion rates ensures that every new hire finishes the security awareness course within their first month. = Monitorare i tassi di completamento della formazione assicura che ogni nuovo assunto completi il corso di consapevolezza sulla sicurezza entro il primo mese.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'DORA Metrics',
              italian: 'Metriche DORA',
              pronunciation: '/ˈdɔːrə ˈmɛtrɪks/',
              phonetic: 'DO-ra ME-triks',
              example:
                'Adding security gate time to the DORA metrics reveals how much overhead security checks add to the deployment frequency. = Aggiungere il tempo dei gate di sicurezza alle metriche DORA rivela quanto overhead i controlli di sicurezza aggiungono alla frequenza di deployment.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Lead time, deploy frequency, MTTR, change fail.',
            },
            {
              english: 'Change Failure Rate',
              italian: 'Tasso di fallimento dei cambi',
              pronunciation: '/tʃeɪndʒ ˈfeɪljə reɪt/',
              phonetic: 'CIEINGG FEI-lier REIT',
              example:
                "After introducing automated security scans, the change failure rate caused by vulnerabilities dropped from eight to two percent. = Dopo aver introdotto scansioni di sicurezza automatizzate, il tasso di fallimento delle modifiche causato da vulnerabilità è sceso dall'otto al due percento.",
              context: 'culture',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_culture_maturity_3',
          title: 'Security Debt / Debito di Sicurezza',
          description: 'Gestione del debito tecnico di sicurezza',
          items: [
            {
              english: 'Security Debt',
              italian: 'Debito di sicurezza',
              pronunciation: '/sɪˈkjʊərəti dɛt/',
              phonetic: 'si-KIU-ri-ti DET',
              example:
                'Ignoring low-severity findings for too long accumulates security debt that becomes expensive to address during audits. = Ignorare i finding a bassa severità per troppo tempo accumula debito di sicurezza che diventa costoso da affrontare durante gli audit.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Risk Acceptance',
              italian: 'Accettazione del rischio',
              pronunciation: '/rɪsk əkˈsɛptəns/',
              phonetic: 'RISK ak-SEP-tans',
              example:
                'Every risk acceptance must be documented with a justification, an expiration date, and sign-off from the CISO. = Ogni accettazione del rischio deve essere documentata con una giustificazione, una data di scadenza e la firma del CISO.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Exception Register',
              italian: 'Registro delle eccezioni',
              pronunciation: '/ɪkˈsɛpʃən ˈrɛdʒɪstə/',
              phonetic: 'ek-SEP-scion RE-gi-ster',
              example:
                'The exception register lists all approved policy exceptions along with their review dates and compensating controls. = Il registro delle eccezioni elenca tutte le eccezioni di policy approvate insieme alle date di revisione e ai controlli compensativi.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Backlog Grooming',
              italian: 'Grooming del backlog',
              pronunciation: '/ˈbæklɒɡ ˈɡruːmɪŋ/',
              phonetic: 'BAK-log GRU-ming',
              example:
                "During backlog grooming, the team reviews open vulnerability tickets and reprioritizes them based on current threat intelligence. = Durante il grooming del backlog, il team revisiona i ticket di vulnerabilità aperti e li riprioritizza in base all'intelligence sulle minacce attuale.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Spike',
              italian: 'Esplorazione tecnica veloce (spike)',
              pronunciation: '/spaɪk/',
              phonetic: 'SPAIK',
              example:
                "The security team scheduled a two-day spike to evaluate three container runtime security tools before making a purchase decision. = Il team di sicurezza ha pianificato uno spike di due giorni per valutare tre strumenti di runtime security per container prima di decidere l'acquisto.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Security Sprint',
              italian: 'Sprint di sicurezza',
              pronunciation: '/sɪˈkjʊərəti sprɪnt/',
              phonetic: 'si-KIU-ri-ti SPRINT',
              example:
                'Dedicating one security sprint per quarter ensures that accumulated vulnerability debt does not grow out of control. = Dedicare uno sprint di sicurezza per trimestre assicura che il debito di vulnerabilità accumulato non cresca fuori controllo.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Risk Owner',
              italian: 'Proprietario del rischio',
              pronunciation: '/rɪsk ˈəʊnə/',
              phonetic: 'RISK OU-ner',
              example:
                'Assigning a risk owner to every entry in the register ensures accountability for tracking mitigation progress. = Assegnare un proprietario del rischio a ogni voce nel registro assicura la responsabilità per il tracciamento del progresso di mitigazione.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Security Roadmap',
              italian: 'Roadmap di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ˈrəʊdmæp/',
              phonetic: 'si-KIU-ri-ti ROUD-map',
              example:
                'The annual security roadmap aligns tooling investments, training programs, and maturity milestones with business objectives. = La roadmap di sicurezza annuale allinea investimenti in strumenti, programmi di formazione e traguardi di maturità con gli obiettivi aziendali.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Debt Heatmap',
              italian: 'Mappa di calore del debito',
              pronunciation: '/dɛt ˈhiːtmæp/',
              phonetic: 'DET HIT-map',
              example:
                'The debt heatmap highlights which services carry the most unresolved vulnerabilities and need immediate attention. = La mappa di calore del debito evidenzia quali servizi portano le vulnerabilità irrisolte più numerose e necessitano attenzione immediata.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Definition of Done',
              italian: 'Definizione di fatto',
              pronunciation: '/ˌdɛfɪˈnɪʃən əv dʌn/',
              phonetic: 'de-fi-NI-scion OV-DAN',
              example:
                'Our definition of done for any feature requires passing SAST, SCA, and a peer security review before merge. = La nostra definizione di done per qualsiasi feature richiede il superamento di SAST, SCA e una peer review di sicurezza prima del merge.',
              context: 'culture',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_culture_maturity_4',
          title: 'Org Adoption / Adozione Organizzativa',
          description: 'Scaling DevSecOps',
          items: [
            {
              english: 'Adoption Plan',
              italian: 'Piano di adozione',
              pronunciation: '/əˈdɒpʃən plæn/',
              phonetic: 'a-DOP-scion PLAN',
              example:
                'The adoption plan for the new secret scanner includes a pilot phase, training sessions, and a gradual rollout across all teams. = Il piano di adozione per il nuovo scanner di segreti include una fase pilota, sessioni di formazione e un rollout graduale su tutti i team.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Center of Excellence',
              italian: 'Centro di eccellenza',
              pronunciation: '/ˈsɛntə əv ˈɛksələns/',
              phonetic: 'SEN-ter OV EK-se-lens',
              example:
                'The DevSecOps center of excellence publishes reusable pipeline templates and best practices for all engineering teams. = Il centro di eccellenza DevSecOps pubblica template di pipeline riutilizzabili e best practice per tutti i team di ingegneria.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Paved Road',
              italian: 'Strada pavimentata',
              pronunciation: '/peɪvd rəʊd/',
              phonetic: 'PEIVD ROUD',
              example:
                'Building a paved road with pre-approved tools and templates makes the secure path the easiest path for developers. = Costruire una strada asfaltata con strumenti e template pre-approvati rende il percorso sicuro il più facile per gli sviluppatori.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Modello "easy and secure default".',
            },
            {
              english: 'Golden Path',
              italian: "Percorso d'oro",
              pronunciation: '/ˈɡəʊldən pɑːθ/',
              phonetic: 'GOL-den PATH',
              example:
                'Following the golden path for new services guarantees that every project starts with security scanning, logging, and monitoring. = Seguire il golden path per i nuovi servizi garantisce che ogni progetto parta con scansione di sicurezza, logging e monitoraggio.',
              context: 'culture',
              difficulty: 'advanced',
              tool: 'Backstage',
            },
            {
              english: 'Internal Developer Platform',
              italian: 'Piattaforma interna sviluppatori',
              pronunciation: '/ɪnˈtɜːnl dɪˈvɛləpə ˈplætfɔːm/',
              phonetic: 'in-TER-nal di-VE-lo-per PLAT-form',
              example:
                'The internal developer platform abstracts away infrastructure complexity while embedding security controls by default. = La piattaforma interna per sviluppatori astrae la complessità infrastrutturale incorporando controlli di sicurezza di default.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Internal Developer Platform.',
            },
            {
              english: 'Developer Experience',
              italian: 'Esperienza sviluppatore',
              pronunciation: '/dɪˈvɛləpər ɪkˈspɪəriəns/',
              phonetic: 'di-VE-lo-per eks-PI-rians',
              example:
                "Improving developer experience around security tools increases voluntary adoption and reduces workaround attempts. = Migliorare l'esperienza sviluppatore intorno agli strumenti di sicurezza aumenta l'adozione volontaria e riduce i tentativi di aggiramento.",
              context: 'culture',
              difficulty: 'advanced',
              note: 'DevEx.',
            },
            {
              english: 'Friction',
              italian: 'Attrito',
              pronunciation: '/ˈfrɪkʃən/',
              phonetic: 'FRIK-scion',
              example:
                'Removing unnecessary friction from the secure pipeline encourages developers to use it instead of deploying manually. = Rimuovere la frizione non necessaria dalla pipeline sicura incoraggia gli sviluppatori a usarla invece di deployare manualmente.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Self-Service',
              italian: "A disposizione dell'utente (self-service)",
              pronunciation: '/sɛlf ˈsɜːvɪs/',
              phonetic: 'SELF SER-vis',
              example:
                'The self-service portal lets developers request new cloud environments pre-configured with all mandatory security controls. = Il portale self-service permette agli sviluppatori di richiedere nuovi ambienti cloud pre-configurati con tutti i controlli di sicurezza obbligatori.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Champion Network',
              italian: 'Rete di campioni',
              pronunciation: '/ˈtʃæmpiən ˈnɛtwɜːk/',
              phonetic: 'CIAM-pion NET-uork',
              example:
                "Building a champion network with one security advocate per team spreads best practices organically across the company. = Costruire una rete di campioni con un advocate di sicurezza per team diffonde le best practice organicamente in tutta l'azienda.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Quarterly Business Review',
              italian: 'Revisione trimestrale di business',
              pronunciation: '/ˈkwɔːtəli ˈbɪznɪs rɪˈvjuː/',
              phonetic: 'KUOR-ter-li BIZ-nis ri-VIU',
              example:
                'The quarterly business review presents security metrics, risk trends, and tooling ROI to the executive leadership team. = La quarterly business review presenta metriche di sicurezza, trend del rischio e ROI degli strumenti al team di leadership esecutiva.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'QBR.',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 21 - REGULATORY COMPLIANCE
    // ════════════════════════════════════════════════
    21: {
      name: 'Conformità Regolamentare / Regulatory Compliance',
      description: 'SOC 2, ISO 27001, PCI-DSS, FedRAMP, GDPR',
      lessons: [
        {
          id: 'dso_compliance_reg_1',
          title: 'SOC 2 / SOC 2',
          description: 'System and Organization Controls 2',
          items: [
            {
              english: 'SOC 2',
              italian: 'SOC 2 (standard di audit servizi cloud)',
              pronunciation: '/sɒk tuː/',
              phonetic: 'SOK-TU',
              example:
                'Achieving SOC 2 Type 2 certification required demonstrating that security controls operated effectively over a twelve-month period. = Ottenere la certificazione SOC 2 Type 2 ha richiesto di dimostrare che i controlli di sicurezza hanno operato efficacemente per un periodo di dodici mesi.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Type 1',
              italian: 'Tipo 1',
              pronunciation: '/taɪp wʌn/',
              phonetic: 'TAIP-UAN',
              example:
                'A SOC 2 Type 1 report evaluates the design of security controls at a single point in time. = Un report SOC 2 Type 1 valuta la progettazione dei controlli di sicurezza in un singolo momento nel tempo.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Type 2',
              italian: 'Tipo 2',
              pronunciation: '/taɪp tuː/',
              phonetic: 'TAIP-TU',
              example:
                'Unlike Type 1, a SOC 2 Type 2 audit tests whether controls operated effectively over the observation period. = A differenza del Type 1, un audit SOC 2 Type 2 testa se i controlli hanno operato efficacemente durante il periodo di osservazione.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Trust Service Criteria',
              italian: 'Criteri di SOC 2 (Trust Service Criteria)',
              pronunciation: '/trʌst ˈsɜːvɪs kraɪˈtɪəriə/',
              phonetic: 'TRAST SER-vis krai-TI-ria',
              example:
                "Each Trust Service Criteria category—security, availability, confidentiality—maps to specific controls the auditor verifies. = Ogni categoria dei criteri del servizio fiduciario—sicurezza, disponibilità, riservatezza—corrisponde a controlli specifici che l'auditor verifica.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Auditor',
              italian: 'Revisore (auditor)',
              pronunciation: '/ˈɔːdɪtə/',
              phonetic: 'O-di-tor',
              example:
                "The external CPA auditor spent two weeks reviewing control evidence before issuing the SOC 2 Type 2 opinion. = L'auditor CPA esterno ha trascorso due settimane revisionando le evidenze dei controlli prima di emettere l'opinione SOC 2 Type 2.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Audit Window',
              italian: 'Finestra di audit',
              pronunciation: '/ˈɔːdɪt ˈwɪndəʊ/',
              phonetic: 'O-dit UIN-dou',
              example:
                "The audit window spans six months, during which the auditor periodically samples evidence to verify control effectiveness. = La finestra di audit copre sei mesi, durante i quali l'auditor campiona periodicamente le evidenze per verificare l'efficacia dei controlli.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Control Owner',
              italian: 'Proprietario del controllo',
              pronunciation: '/kənˈtrəʊl ˈəʊnə/',
              phonetic: 'kon-TROL OU-ner',
              example:
                'Each control owner is responsible for gathering evidence and demonstrating that their assigned control operates as designed. = Ogni proprietario del controllo è responsabile di raccogliere evidenze e dimostrare che il controllo assegnato opera come progettato.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Evidence Sample',
              italian: 'Campione di evidenza',
              pronunciation: '/ˈɛvɪdəns ˈsɑːmpl/',
              phonetic: 'E-vi-dens SAM-pol',
              example:
                "The auditor selects a random evidence sample of twenty-five access review records to validate the control's consistent operation. = L'auditor seleziona un campione casuale di venticinque record di revisione degli accessi per validare l'operazione coerente del controllo.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Gap Analysis',
              italian: 'Analisi delle lacune',
              pronunciation: '/ɡæp əˈnæləsɪs/',
              phonetic: 'GAP a-NA-le-sis',
              example:
                "The initial gap analysis identified fifteen controls that needed implementation before the SOC 2 audit could begin. = L'analisi dei gap iniziale ha identificato quindici controlli che necessitavano implementazione prima che l'audit SOC 2 potesse iniziare.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Readiness Assessment',
              italian: 'Valutazione di prontezza',
              pronunciation: '/ˈrɛdinəs əˈsɛsmənt/',
              phonetic: 'RE-di-nes a-SES-ment',
              example:
                "Running a readiness assessment six months before the audit gives the team time to close all identified control gaps. = Eseguire una valutazione di prontezza sei mesi prima dell'audit dà al team il tempo di chiudere tutti i gap di controllo identificati.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_compliance_reg_2',
          title: 'ISO 27001 / ISO 27001',
          description: 'Standard internazionale per ISMS',
          items: [
            {
              english: 'ISO 27001',
              italian: 'ISO 27001 (standard di gestione sicurezza)',
              pronunciation: '/ˈaɪsəʊ tuː ˈsɛvənθaʊzənd ʌn/',
              phonetic: 'AI-so 27-mila-1',
              example:
                'Obtaining ISO 27001 certification proved to enterprise clients that our information security management system meets international standards. = Ottenere la certificazione ISO 27001 ha dimostrato ai clienti enterprise che il nostro sistema di gestione della sicurezza delle informazioni soddisfa gli standard internazionali.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'ISMS',
              italian: 'Sistema di gestione della sicurezza delle informazioni',
              pronunciation: '/aɪ ɛs ɛm ɛs/',
              phonetic: 'AI-ES-EM-ES',
              example:
                'The ISMS document defines the scope, policies, and risk treatment plan that govern our information security practices. = Il documento ISMS definisce lo scope, le policy e il piano di trattamento del rischio che governano le nostre pratiche di sicurezza delle informazioni.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'Information Security Management System.',
            },
            {
              english: 'Annex A',
              italian: 'Allegato A',
              pronunciation: '/ˈænɛks eɪ/',
              phonetic: 'A-neks-EI',
              example:
                "Mapping our controls to ISO 27001 Annex A ensures coverage across all fourteen security control domains. = Mappare i nostri controlli all'Annex A della ISO 27001 assicura la copertura di tutti i quattordici domini di controllo di sicurezza.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Statement of Applicability',
              italian: 'Dichiarazione di applicabilità',
              pronunciation: '/ˈsteɪtmənt əv əˌplɪkəˈbɪləti/',
              phonetic: 'STEIT-ment OV a-pli-ka-BI-li-ti',
              example:
                'The statement of applicability lists which Annex A controls apply to our organization and justifies any exclusions. = La dichiarazione di applicabilità elenca quali controlli Annex A si applicano alla nostra organizzazione e giustifica eventuali esclusioni.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'SoA.',
            },
            {
              english: 'Internal Audit',
              italian: 'Audit interno',
              pronunciation: '/ɪnˈtɜːnl ˈɔːdɪt/',
              phonetic: 'in-TER-nal O-dit',
              example:
                "The annual internal audit uncovered three nonconformities related to access review frequency and incident log retention. = L'audit interno annuale ha scoperto tre non conformità relative alla frequenza di revisione degli accessi e alla retention dei log degli incidenti.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Management Review',
              italian: 'Revisione della direzione',
              pronunciation: '/ˈmænɪdʒmənt rɪˈvjuː/',
              phonetic: 'MA-ni-gment ri-VIU',
              example:
                "During the management review, leadership evaluates ISMS performance metrics and approves the updated risk treatment plan. = Durante la revisione della direzione, la leadership valuta le metriche di performance dell'ISMS e approva il piano di trattamento del rischio aggiornato.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Nonconformity',
              italian: 'Non conformità',
              pronunciation: '/ˌnɒnkənˈfɔːməti/',
              phonetic: 'non-kon-for-MI-ti',
              example:
                'Each nonconformity must have a documented corrective action plan with a deadline and assigned owner. = Ogni non conformità deve avere un piano di azione correttiva documentato con una scadenza e un responsabile assegnato.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Surveillance Audit',
              italian: 'Audit di sorveglianza',
              pronunciation: '/sɜːˈveɪləns ˈɔːdɪt/',
              phonetic: 'ser-VEI-lans O-dit',
              example:
                "The certification body conducts a surveillance audit annually to confirm that the ISMS continues to meet ISO 27001 requirements. = L'ente di certificazione conduce un audit di sorveglianza annualmente per confermare che l'ISMS continua a soddisfare i requisiti ISO 27001.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Recertification',
              italian: 'Ricertificazione',
              pronunciation: '/ˌriːˌsɜːtɪfɪˈkeɪʃən/',
              phonetic: 'ri-ser-ti-fi-KEI-scion',
              example:
                "Full recertification every three years requires a comprehensive review of the entire information security management system. = La ricertificazione completa ogni tre anni richiede una revisione completa dell'intero sistema di gestione della sicurezza delle informazioni.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Certification Body',
              italian: 'Ente di certificazione',
              pronunciation: '/ˌsɜːtɪfɪˈkeɪʃən ˈbɒdi/',
              phonetic: 'ser-ti-fi-KEI-scion BO-di',
              example:
                "Choosing an accredited certification body ensures that the ISO 27001 audit is recognized internationally. = Scegliere un ente di certificazione accreditato assicura che l'audit ISO 27001 sia riconosciuto internazionalmente.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'BSI, TÜV, DNV.',
            },
          ],
        },
        {
          id: 'dso_compliance_reg_3',
          title: 'PCI-DSS & FedRAMP / PCI-DSS e FedRAMP',
          description: 'Pagamenti e cloud federali USA',
          items: [
            {
              english: 'PCI-DSS',
              italian: 'PCI DSS (standard sicurezza dati pagamenti)',
              pronunciation: '/piː siː aɪ diː ɛs ɛs/',
              phonetic: 'PI-SI-AI-DI-ES-ES',
              example:
                'Any system that stores, processes, or transmits cardholder data must comply with the twelve requirements of PCI-DSS. = Qualsiasi sistema che memorizza, elabora o trasmette dati dei titolari di carta deve rispettare i dodici requisiti del PCI-DSS.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'Payment Card Industry Data Security Standard.',
            },
            {
              english: 'Cardholder Data Environment',
              italian: 'Ambiente dati titolari di carta',
              pronunciation: '/ˈkɑːdhəʊldə ˈdeɪtə ɪnˈvaɪrənmənt/',
              phonetic: 'KARD-hol-der DEI-ta in-VAI-ron-ment',
              example:
                "Reducing the scope of the cardholder data environment through tokenization dramatically simplifies PCI-DSS compliance. = Ridurre lo scope dell'ambiente dei dati del titolare di carta tramite tokenizzazione semplifica drasticamente la compliance PCI-DSS.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'CDE.',
            },
            {
              english: 'Tokenization',
              italian: 'Tokenizzazione',
              pronunciation: '/ˌtəʊkənaɪˈzeɪʃən/',
              phonetic: 'to-ke-nai-ZEI-scion',
              example:
                "Replacing credit card numbers with random tokenization values means the application never handles actual cardholder data. = Sostituire i numeri di carta di credito con valori di tokenizzazione casuali significa che l'applicazione non gestisce mai i dati reali del titolare.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Segmentation',
              italian: 'Segmentazione',
              pronunciation: '/ˌsɛɡmɛnˈteɪʃən/',
              phonetic: 'seg-men-TEI-scion',
              example:
                'Proper network segmentation isolates the payment processing servers from the rest of the corporate network. = Una corretta segmentazione di rete isola i server di elaborazione dei pagamenti dal resto della rete aziendale.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'QSA',
              italian: 'Qualified Security Assessor PCI (QSA)',
              pronunciation: '/kjuː ɛs eɪ/',
              phonetic: 'KIU-ES-EI',
              example:
                "The QSA reviewed our network diagrams and firewall rules to confirm that the cardholder data environment was properly isolated. = Il QSA ha revisionato i nostri diagrammi di rete e le regole del firewall per confermare che l'ambiente dei dati del titolare fosse propriamente isolato.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'Qualified Security Assessor.',
            },
            {
              english: 'FedRAMP',
              italian: 'Programma autorizzazione cloud federale USA (FedRAMP)',
              pronunciation: '/fɛdræmp/',
              phonetic: 'FED-ramp',
              example:
                "Obtaining a FedRAMP authorization allows the cloud service to be used by any US federal agency without a separate assessment. = Ottenere un'autorizzazione FedRAMP permette al servizio cloud di essere usato da qualsiasi agenzia federale USA senza una valutazione separata.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'Federal Risk and Authorization Management Program.',
            },
            {
              english: 'Authorization to Operate',
              italian: 'Autorizzazione a operare',
              pronunciation: '/ˌɔːθərɪˈzeɪʃən tuː ˈɒpəreɪt/',
              phonetic: 'o-to-rai-ZEI-scion-TU O-pe-reit',
              example:
                "The agency granted an authorization to operate after the security assessment confirmed all controls met the moderate baseline. = L'agenzia ha concesso l'autorizzazione a operare dopo che la valutazione di sicurezza ha confermato che tutti i controlli soddisfacevano la baseline moderata.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'ATO.',
            },
            {
              english: 'Continuous Monitoring',
              italian: 'Monitoraggio continuo',
              pronunciation: '/kənˈtɪnjʊəs ˈmɒnɪtərɪŋ/',
              phonetic: 'kon-TI-nius MO-ni-to-ring',
              example:
                'With continuous monitoring in place, any drift from the approved security baseline triggers an alert within minutes. = Con il monitoraggio continuo in atto, qualsiasi drift dalla baseline di sicurezza approvata attiva un avviso entro pochi minuti.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'ConMon.',
            },
            {
              english: '3PAO',
              italian: 'Third Party Assessment Organization FedRAMP (3PAO)',
              pronunciation: '/θriː piː eɪ əʊ/',
              phonetic: 'TRI-PI-EI-O',
              example:
                "The 3PAO conducted an independent assessment of all security controls before submitting the package to the FedRAMP PMO. = L'organizzazione di valutazione di terze parti ha condotto una valutazione indipendente di tutti i controlli di sicurezza prima di sottomettere il pacchetto al PMO FedRAMP.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'Third Party Assessment Organization.',
            },
            {
              english: 'POA&M',
              italian: 'Piano di azioni e milestone',
              pronunciation: '/piː əʊ eɪ ɛm/',
              phonetic: 'PI-O-EI-EM',
              example:
                'Every open finding from the assessment is tracked in a POA&M document with a remediation timeline and assigned owner. = Ogni finding aperto dalla valutazione è tracciato in un documento POA&M con una timeline di remediation e un responsabile assegnato.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'Plan of Action and Milestones.',
            },
          ],
        },
        {
          id: 'dso_compliance_reg_4',
          title: 'GDPR & Privacy / GDPR e Privacy',
          description: 'GDPR e altre normative privacy',
          items: [
            {
              english: 'GDPR',
              italian: 'GDPR (Regolamento UE protezione dati)',
              pronunciation: '/dʒiː diː piː ɑːr/',
              phonetic: 'GI-DI-PI-AR',
              example:
                "Under the GDPR, organizations must report personal data breaches to the supervisory authority within seventy-two hours. = Secondo il GDPR, le organizzazioni devono segnalare le violazioni dei dati personali all'autorità di controllo entro settantadue ore.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'General Data Protection Regulation.',
            },
            {
              english: 'Data Subject',
              italian: 'Interessato',
              pronunciation: '/ˈdeɪtə ˈsʌbdʒɪkt/',
              phonetic: 'DEI-ta SAB-gekt',
              example:
                "Every data subject has the right to request a copy of all personal data the organization holds about them. = Ogni interessato ha il diritto di richiedere una copia di tutti i dati personali che l'organizzazione detiene su di lui.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Data Controller',
              italian: 'Titolare del trattamento',
              pronunciation: '/ˈdeɪtə kənˈtrəʊlə/',
              phonetic: 'DEI-ta kon-TRO-ler',
              example:
                'As the data controller, our company determines the purposes and means of processing customer personal information. = Come titolare del trattamento, la nostra azienda determina le finalità e i mezzi del trattamento delle informazioni personali dei clienti.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Data Processor',
              italian: 'Responsabile del trattamento',
              pronunciation: '/ˈdeɪtə ˈprəʊsɛsə/',
              phonetic: 'DEI-ta PRO-ses-ser',
              example:
                'The cloud hosting provider acts as a data processor and must follow our instructions for handling personal data. = Il provider di hosting cloud agisce come responsabile del trattamento e deve seguire le nostre istruzioni per la gestione dei dati personali.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Data Processing Agreement',
              italian: 'Accordo sul trattamento dei dati',
              pronunciation: '/ˈdeɪtə ˈprəʊsɛsɪŋ əˈɡriːmənt/',
              phonetic: 'DEI-ta PRO-ses-sing a-GRI-ment',
              example:
                'Signing a data processing agreement with every third-party vendor ensures they handle personal data according to GDPR requirements. = Firmare un accordo di trattamento dei dati con ogni fornitore di terze parti assicura che gestiscano i dati personali secondo i requisiti GDPR.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'DPA.',
            },
            {
              english: 'DPIA',
              italian: "Valutazione d'impatto sulla protezione dei dati",
              pronunciation: '/diː piː aɪ eɪ/',
              phonetic: 'DI-PI-AI-EI',
              example:
                'Conducting a DPIA before launching the facial recognition feature identified high privacy risks that required additional safeguards. = Condurre una DPIA prima di lanciare la funzionalità di riconoscimento facciale ha identificato alti rischi per la privacy che richiedevano salvaguardie aggiuntive.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'Data Protection Impact Assessment.',
            },
            {
              english: 'Right to Erasure',
              italian: "Diritto all'oblio",
              pronunciation: '/raɪt tuː ɪˈreɪʒə/',
              phonetic: 'RAIT TU i-REI-ger',
              example:
                "Implementing the right to erasure required building an automated workflow that purges user data from twelve different systems. = Implementare il diritto all'oblio ha richiesto la costruzione di un workflow automatizzato che elimina i dati utente da dodici sistemi diversi.",
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'Articolo 17 GDPR.',
            },
            {
              english: 'Data Breach Notification',
              italian: 'Notifica di violazione dei dati',
              pronunciation: '/ˈdeɪtə briːtʃ ˌnəʊtɪfɪˈkeɪʃən/',
              phonetic: 'DEI-ta BRICH no-ti-fi-KEI-scion',
              example:
                'The incident response plan includes a data breach notification template pre-approved by legal to ensure timely reporting. = Il piano di risposta agli incidenti include un template di notifica di violazione dei dati pre-approvato dal legale per assicurare una segnalazione tempestiva.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'Privacy by Design',
              italian: 'Privacy fin dalla progettazione',
              pronunciation: '/ˈprɪvəsi baɪ dɪˈzaɪn/',
              phonetic: 'PRI-va-si BAI di-ZAIN',
              example:
                'Applying privacy by design principles led the team to implement data minimization and pseudonymization from the first sprint. = Applicare i principi di privacy by design ha portato il team a implementare la minimizzazione dei dati e la pseudonimizzazione dal primo sprint.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
            },
            {
              english: 'CCPA',
              italian: 'California Consumer Privacy Act (CCPA)',
              pronunciation: '/siː siː piː eɪ/',
              phonetic: 'SI-SI-PI-EI',
              example:
                'Under the CCPA, California consumers can opt out of the sale of their personal information at any time. = Secondo il CCPA, i consumatori della California possono rifiutare la vendita delle loro informazioni personali in qualsiasi momento.',
              context: 'compliance-as-code',
              difficulty: 'advanced',
              note: 'California Consumer Privacy Act.',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 22 - CULTURE & TRAINING
    // ════════════════════════════════════════════════
    22: {
      name: 'Cultura e Formazione / Culture & Training',
      description: 'Awareness, gamification e secure coding',
      lessons: [
        {
          id: 'dso_culture_training_1',
          title: 'Security Awareness / Consapevolezza',
          description: 'Awareness e formazione di base',
          items: [
            {
              english: 'Security Awareness',
              italian: 'Consapevolezza di sicurezza',
              pronunciation: '/sɪˈkjʊərəti əˈweənəs/',
              phonetic: 'si-KIU-ri-ti a-UE-nes',
              example:
                "Investing in security awareness training reduced successful phishing attacks by sixty percent across the organization. = Investire nella formazione sulla consapevolezza della sicurezza ha ridotto gli attacchi di phishing riusciti del sessanta percento in tutta l'organizzazione.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Phishing Simulation',
              italian: 'Simulazione di phishing',
              pronunciation: '/ˈfɪʃɪŋ ˌsɪmjʊˈleɪʃən/',
              phonetic: 'FI-scing si-miu-LEI-scion',
              example:
                'Running a monthly phishing simulation campaign helps identify employees who need additional anti-phishing training. = Eseguire una campagna mensile di simulazione di phishing aiuta a identificare i dipendenti che necessitano di formazione anti-phishing aggiuntiva.',
              context: 'culture',
              difficulty: 'advanced',
              tool: 'KnowBe4, Sophos Phish Threat',
            },
            {
              english: 'Click Rate',
              italian: 'Tasso di click',
              pronunciation: '/klɪk reɪt/',
              phonetic: 'KLIK REIT',
              example:
                'After six months of training, the phishing click rate dropped from twenty-two percent to under five percent. = Dopo sei mesi di formazione, il tasso di click sul phishing è sceso dal ventidue percento a meno del cinque percento.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Report Rate',
              italian: 'Tasso di segnalazione',
              pronunciation: '/rɪˈpɔːt reɪt/',
              phonetic: 'ri-PORT REIT',
              example:
                'A high report rate on simulated phishing emails proves that employees recognize threats and know the proper escalation path. = Un alto tasso di segnalazione sulle email di phishing simulate dimostra che i dipendenti riconoscono le minacce e conoscono il percorso di escalation corretto.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Onboarding Training',
              italian: 'Formazione di onboarding',
              pronunciation: '/ˈɒnbɔːdɪŋ ˈtreɪnɪŋ/',
              phonetic: 'ON-bor-ding TREI-ning',
              example:
                'Every new hire completes a mandatory security onboarding training module within their first week at the company. = Ogni nuovo assunto completa un modulo di formazione sulla sicurezza obbligatorio entro la prima settimana in azienda.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Refresher Training',
              italian: 'Formazione di aggiornamento',
              pronunciation: '/rɪˈfrɛʃə ˈtreɪnɪŋ/',
              phonetic: 'ri-FRE-scer TREI-ning',
              example:
                'Annual refresher training keeps employees updated on the latest social engineering tactics and company security policies. = La formazione di aggiornamento annuale tiene i dipendenti informati sulle ultime tattiche di ingegneria sociale e sulle policy di sicurezza aziendali.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Security Newsletter',
              italian: 'Newsletter di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ˈnjuːzlɛtə/',
              phonetic: 'si-KIU-ri-ti NIUS-le-ter',
              example:
                'The monthly security newsletter highlights recent incidents, new policies, and practical tips for staying safe online. = La newsletter di sicurezza mensile evidenzia incidenti recenti, nuove policy e consigli pratici per restare al sicuro online.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Tabletop Exercise',
              italian: 'Esercitazione da tavolo',
              pronunciation: '/ˈteɪbltɒp ˈɛksəsaɪz/',
              phonetic: 'TEI-bol-top EK-ser-saiz',
              example:
                "During the tabletop exercise, the team walked through a ransomware scenario to identify gaps in the response playbook. = Durante l'esercitazione tabletop, il team ha simulato uno scenario ransomware per identificare lacune nel playbook di risposta.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Incident Drill',
              italian: 'Esercitazione di incidente',
              pronunciation: '/ˈɪnsɪdənt drɪl/',
              phonetic: 'IN-si-dent DRIL',
              example:
                "Quarterly incident drills test the entire response chain from detection through containment and customer communication. = Le esercitazioni trimestrali sugli incidenti testano l'intera catena di risposta dal rilevamento al contenimento e alla comunicazione con i clienti.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Security Posters',
              italian: 'Poster di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ˈpəʊstəz/',
              phonetic: 'si-KIU-ri-ti POS-ters',
              example:
                'Placing security posters near shared printers reminds employees to collect sensitive documents promptly. = Posizionare poster di sicurezza vicino alle stampanti condivise ricorda ai dipendenti di raccogliere prontamente i documenti sensibili.',
              context: 'culture',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_culture_training_2',
          title: 'Gamification / Gamification',
          description: 'Imparare giocando',
          items: [
            {
              english: 'Gamification',
              italian: 'Gamificazione (gamification)',
              pronunciation: '/ˌɡeɪmɪfɪˈkeɪʃən/',
              phonetic: 'gei-mi-fi-KEI-scion',
              example:
                'Adding gamification elements like points and badges to security training increased course completion rates by forty percent. = Aggiungere elementi di gamificazione come punti e badge alla formazione sulla sicurezza ha aumentato i tassi di completamento dei corsi del quaranta percento.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Capture the Flag',
              italian: 'Sfida CTF (Capture the Flag)',
              pronunciation: '/ˈkæptʃə ðə flæɡ/',
              phonetic: 'KAP-cer DE FLAG',
              example:
                'The annual Capture the Flag competition let developers practice exploiting and patching real-world vulnerabilities in a safe environment. = La competizione annuale Capture the Flag ha permesso agli sviluppatori di praticare lo sfruttamento e il patching di vulnerabilità reali in un ambiente sicuro.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'CTF.',
            },
            {
              english: 'Hack the Box',
              italian: 'Hack The Box (piattaforma CTF)',
              pronunciation: '/hæk ðə bɒks/',
              phonetic: 'HAK DE BOKS',
              example:
                'Our security team uses Hack the Box labs to sharpen offensive skills on realistic machines without risking production systems. = Il nostro team di sicurezza usa i lab di Hack the Box per affinare le competenze offensive su macchine realistiche senza rischiare i sistemi di produzione.',
              context: 'culture',
              difficulty: 'advanced',
              tool: 'Hack The Box',
            },
            {
              english: 'TryHackMe',
              italian: 'TryHackMe (piattaforma CTF didattica)',
              pronunciation: '/traɪ hæk miː/',
              phonetic: 'TRAI HAK MI',
              example:
                'New hires start with guided TryHackMe learning paths to build foundational knowledge in networking and web exploitation. = I nuovi assunti iniziano con percorsi di apprendimento guidati su TryHackMe per costruire conoscenze fondamentali in networking e sfruttamento web.',
              context: 'culture',
              difficulty: 'advanced',
              tool: 'TryHackMe',
            },
            {
              english: 'Secure Code Warrior',
              italian: 'Secure Code Warrior (piattaforma training secure coding)',
              pronunciation: '/sɪˈkjʊə kəʊd ˈwɒriə/',
              phonetic: 'si-KIUR KOUD UO-rior',
              example:
                "Embedding Secure Code Warrior challenges into the developer onboarding ensures that every engineer practices secure coding from day one. = Integrare le sfide di Secure Code Warrior nell'onboarding degli sviluppatori assicura che ogni ingegnere pratichi la codifica sicura dal primo giorno.",
              context: 'culture',
              difficulty: 'advanced',
              tool: 'Secure Code Warrior',
            },
            {
              english: 'Leaderboard',
              italian: 'Classifica',
              pronunciation: '/ˈliːdəbɔːd/',
              phonetic: 'LI-der-bord',
              example:
                'Posting a monthly leaderboard for completed security training modules creates friendly competition across engineering teams. = Pubblicare una classifica mensile per i moduli di formazione sulla sicurezza completati crea una competizione amichevole tra i team di ingegneria.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Badge',
              italian: 'Distintivo digitale (badge)',
              pronunciation: '/bædʒ/',
              phonetic: 'BAGG',
              example:
                'Earning a secure coding badge requires completing all six training modules and passing the final assessment with ninety percent. = Ottenere un badge di codifica sicura richiede il completamento di tutti e sei i moduli di formazione e il superamento della valutazione finale con il novanta percento.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Hackathon',
              italian: 'Maratona di sviluppo (hackathon)',
              pronunciation: '/ˈhækəθɒn/',
              phonetic: 'HA-ka-thon',
              example:
                "The security-focused hackathon produced three prototype tools that the team later integrated into the production pipeline. = L'hackathon focalizzato sulla sicurezza ha prodotto tre prototipi di strumenti che il team ha successivamente integrato nella pipeline di produzione.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'War Game',
              italian: 'Esercitazione offensiva (war game)',
              pronunciation: '/wɔː ɡeɪm/',
              phonetic: 'UOR GHEIM',
              example:
                "During the war game exercise, the red team attempted to breach the staging environment while the blue team defended in real time. = Durante l'esercitazione war game, il red team ha tentato di violare l'ambiente di staging mentre il blue team difendeva in tempo reale.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Reward Mechanism',
              italian: 'Meccanismo di premio',
              pronunciation: '/rɪˈwɔːd ˈmɛkənɪzəm/',
              phonetic: 'ri-UORD ME-ka-niz-em',
              example:
                'Implementing a reward mechanism for reporting security issues increased the number of internal vulnerability reports by threefold. = Implementare un meccanismo di ricompensa per la segnalazione di problemi di sicurezza ha triplicato il numero di report di vulnerabilità interni.',
              context: 'culture',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_culture_training_3',
          title: 'Security Guilds / Comunità di Sicurezza',
          description: 'Comunità interne di pratica',
          items: [
            {
              english: 'Security Guild',
              italian: 'Gilda di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ɡɪld/',
              phonetic: 'si-KIU-ri-ti GHILD',
              example:
                'The cross-functional security guild meets biweekly to share learnings, review new tools, and align on best practices. = La gilda di sicurezza cross-funzionale si riunisce ogni due settimane per condividere insegnamenti, revisionare nuovi strumenti e allinearsi sulle best practice.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Community of Practice',
              italian: 'Comunità di pratica',
              pronunciation: '/kəˈmjuːnəti əv ˈpræktɪs/',
              phonetic: 'ko-MIU-ni-ti OV PRAK-tis',
              example:
                'Our DevSecOps community of practice maintains a shared wiki with runbooks, tool evaluations, and solved incident patterns. = La nostra comunità di pratica DevSecOps mantiene un wiki condiviso con runbook, valutazioni di strumenti e pattern di incidenti risolti.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Community of Practice (CoP).',
            },
            {
              english: 'Brown Bag Session',
              italian: 'Sessione brown bag',
              pronunciation: '/braʊn bæɡ ˈsɛʃən/',
              phonetic: 'BRAUN-BAG SE-scion',
              example:
                'A weekly brown bag session lets team members present security topics informally during their lunch break. = Una sessione brown bag settimanale permette ai membri del team di presentare argomenti di sicurezza in modo informale durante la pausa pranzo.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Lightning Talk',
              italian: 'Intervento breve (lightning talk)',
              pronunciation: '/ˈlaɪtnɪŋ tɔːk/',
              phonetic: 'LAIT-ning TOK',
              example:
                "Each sprint retrospective includes a five-minute lightning talk on a security topic relevant to the team's current work. = Ogni retrospettiva di sprint include un lightning talk di cinque minuti su un argomento di sicurezza rilevante per il lavoro attuale del team.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Office Hours',
              italian: 'Ore di consulenza',
              pronunciation: '/ˈɒfɪs ˈaʊəz/',
              phonetic: 'O-fis AU-ers',
              example:
                'The security team holds weekly office hours where developers can ask questions and get code review guidance. = Il team di sicurezza tiene office hours settimanali dove gli sviluppatori possono fare domande e ottenere indicazioni sulla code review.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Mentorship',
              italian: 'Mentorato (mentorship)',
              pronunciation: '/ˈmɛntəʃɪp/',
              phonetic: 'MEN-tor-scip',
              example:
                "Pairing junior engineers with a senior security mentorship accelerates their growth in threat modeling and secure architecture. = Abbinare ingegneri junior con un mentorship di sicurezza senior accelera la loro crescita nel threat modeling e nell'architettura sicura.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Internal Conference',
              italian: 'Conferenza interna',
              pronunciation: '/ɪnˈtɜːnl ˈkɒnfərəns/',
              phonetic: 'in-TER-nal KON-fe-rens',
              example:
                'The annual internal conference features talks from each team on their biggest security wins and lessons learned. = La conferenza interna annuale presenta talk di ogni team sulle loro più grandi vittorie di sicurezza e lezioni apprese.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Open Source Contribution',
              italian: 'Contribuzione open source',
              pronunciation: '/ˈəʊpən sɔːs ˌkɒntrɪˈbjuːʃən/',
              phonetic: 'OU-pen SORS kon-tri-BIU-scion',
              example:
                'Encouraging open source contribution to security tools like Falco and Trivy builds expertise and strengthens the community. = Incoraggiare la contribuzione open source a strumenti di sicurezza come Falco e Trivy costruisce competenza e rafforza la comunità.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Knowledge Base',
              italian: 'Base di conoscenza',
              pronunciation: '/ˈnɒlɪdʒ beɪs/',
              phonetic: 'NO-legg BEIS',
              example:
                'The internal knowledge base documents every past incident, remediation pattern, and approved architecture decision record. = La base di conoscenza interna documenta ogni incidente passato, pattern di remediation e record di decisione architetturale approvato.',
              context: 'culture',
              difficulty: 'advanced',
              tool: 'Confluence, Notion',
            },
            {
              english: 'Slack Channel',
              italian: 'Canale Slack',
              pronunciation: '/slæk ˈtʃænl/',
              phonetic: 'SLAK CIAN-nel',
              example:
                'The dedicated security Slack channel serves as the first point of contact for developers who spot suspicious behavior. = Il canale Slack di sicurezza dedicato funge da primo punto di contatto per gli sviluppatori che notano comportamenti sospetti.',
              context: 'culture',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_culture_training_4',
          title: 'Secure Coding / Codifica Sicura',
          description: 'Pratiche di codifica sicura',
          items: [
            {
              english: 'Secure Coding',
              italian: 'Codifica sicura',
              pronunciation: '/sɪˈkjʊə ˈkəʊdɪŋ/',
              phonetic: 'si-KIUR KOU-ding',
              example:
                "Mandatory secure coding guidelines require parameterized queries, output encoding, and input validation in every service. = Le linee guida obbligatorie di codifica sicura richiedono query parametrizzate, codifica dell'output e validazione dell'input in ogni servizio.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'OWASP Top 10',
              italian: 'Top 10 rischi web (OWASP Top 10)',
              pronunciation: '/ˈəʊwɒsp tɒp tɛn/',
              phonetic: 'O-uosp TOP-TEN',
              example:
                'Every developer must demonstrate familiarity with the OWASP Top 10 risks before being granted write access to production repos. = Ogni sviluppatore deve dimostrare familiarità con i rischi OWASP Top 10 prima di ottenere accesso in scrittura ai repo di produzione.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Input Validation',
              italian: "Validazione dell'input",
              pronunciation: '/ˈɪnpʊt ˌvælɪˈdeɪʃən/',
              phonetic: 'IN-put va-li-DEI-scion',
              example:
                "Strict input validation on the registration form prevented attackers from injecting malicious HTML tags into user profiles. = Una rigorosa validazione dell'input sul modulo di registrazione ha impedito agli attaccanti di iniettare tag HTML malevoli nei profili utente.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Output Encoding',
              italian: "Codifica dell'output",
              pronunciation: '/ˈaʊtpʊt ɪnˈkəʊdɪŋ/',
              phonetic: 'AUT-put in-KOU-ding',
              example:
                "Applying context-aware output encoding to every dynamic value in the template eliminates reflected XSS vulnerabilities. = Applicare la codifica dell'output contestuale a ogni valore dinamico nel template elimina le vulnerabilità XSS riflesse.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Parameterized Query',
              italian: 'Query parametrizzata',
              pronunciation: '/pəˈræmɪtəraɪzd ˈkwɪəri/',
              phonetic: 'pa-RA-me-te-raizd KUI-ri',
              example:
                "Switching from string concatenation to a parameterized query eliminated the SQL injection risk in the search endpoint. = Passare dalla concatenazione di stringhe a una query parametrizzata ha eliminato il rischio di SQL injection nell'endpoint di ricerca.",
              context: 'culture',
              difficulty: 'advanced',
              code: 'cur.execute("SELECT * FROM u WHERE id=?", (id,))',
            },
            {
              english: 'Safe Defaults',
              italian: 'Default sicuri',
              pronunciation: '/seɪf dɪˈfɔːlts/',
              phonetic: 'SEIF di-FOLTS',
              example:
                "The framework ships with safe defaults that enable CSRF protection, secure cookies, and content security policies out of the box. = Il framework viene fornito con impostazioni sicure di default che abilitano la protezione CSRF, i cookie sicuri e le policy di sicurezza dei contenuti pronte all'uso.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Secure SDK',
              italian: 'SDK sicuro',
              pronunciation: '/sɪˈkjʊə ɛs diː keɪ/',
              phonetic: 'si-KIUR ES-DI-KEI',
              example:
                'The platform team published a secure SDK that handles authentication, logging, and error handling for all microservices. = Il team di piattaforma ha pubblicato un SDK sicuro che gestisce autenticazione, logging e gestione degli errori per tutti i microservizi.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Code Snippet Library',
              italian: 'Libreria di snippet di codice',
              pronunciation: '/kəʊd ˈsnɪpɪt ˈlaɪbrəri/',
              phonetic: 'KOUD SNI-pet LAI-bra-ri',
              example:
                "The internal code snippet library provides copy-paste examples for common tasks like JWT validation and password hashing. = La libreria interna di snippet di codice fornisce esempi copia-incolla per attività comuni come la validazione JWT e l'hashing delle password.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Secure Coding Standard',
              italian: 'Standard di codifica sicura',
              pronunciation: '/sɪˈkjʊə ˈkəʊdɪŋ ˈstændəd/',
              phonetic: 'si-KIUR KOU-ding STAN-dard',
              example:
                "Our secure coding standard mandates that all cryptographic operations use the company-approved library, never raw crypto APIs. = Il nostro standard di codifica sicura impone che tutte le operazioni crittografiche usino la libreria approvata dall'azienda, mai API crittografiche raw.",
              context: 'culture',
              difficulty: 'advanced',
              tool: 'CERT, MISRA',
            },
            {
              english: 'Code Review Checklist',
              italian: 'Checklist di code review',
              pronunciation: '/kəʊd rɪˈvjuː ˈtʃɛklɪst/',
              phonetic: 'KOUD ri-VIU CIEK-list',
              example:
                "The security code review checklist reminds reviewers to verify input validation, auth checks, and error handling in every PR. = La checklist di code review di sicurezza ricorda ai reviewer di verificare validazione dell'input, controlli di autenticazione e gestione degli errori in ogni PR.",
              context: 'culture',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 23 - DEVSECOPS CAREER
    // ════════════════════════════════════════════════
    23: {
      name: 'Carriera DevSecOps / DevSecOps Career',
      description: 'Ruoli, certificazioni e crescita',
      lessons: [
        {
          id: 'dso_culture_career_1',
          title: 'Career Roles / Ruoli di Carriera',
          description: 'Posizioni nel DevSecOps',
          items: [
            {
              english: 'DevSecOps Engineer',
              italian: 'Ingegnere DevSecOps',
              pronunciation: '/dɛvˈsɛkˌɒps ˌɛndʒɪˈnɪər/',
              phonetic: 'DEV-sek-ops en-gi-NIR',
              example:
                'A DevSecOps engineer wires security in CI. = Un ingegnere DevSecOps integra la sicurezza in CI.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'AppSec Engineer',
              italian: 'Ingegnere AppSec',
              pronunciation: '/ˈæpˌsɛk ˌɛndʒɪˈnɪər/',
              phonetic: 'AP-sek en-gi-NIR',
              example:
                'Our AppSec engineer leads threat modeling sessions and reviews pull requests for OWASP Top 10 vulnerabilities. = Il nostro AppSec engineer guida le sessioni di threat modeling e revisiona le pull request per vulnerabilità OWASP Top 10.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Toolchain Architect',
              italian: 'Architetto della toolchain',
              pronunciation: '/ˈtuːltʃeɪn ˈɑːkɪtɛkt/',
              phonetic: 'TUL-cein AR-ki-tekt',
              example:
                'The toolchain architect designs the end-to-end security pipeline integrating SAST, SCA, DAST, and signing into a single workflow. = Il toolchain architect progetta la pipeline di sicurezza end-to-end integrando SAST, SCA, DAST e firma in un singolo workflow.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Security Architect',
              italian: 'Architetto di sicurezza',
              pronunciation: '/sɪˈkjʊərəti ˈɑːkɪtɛkt/',
              phonetic: 'si-KIU-ri-ti AR-ki-tekt',
              example:
                "Our security architect reviewed the microservices design and recommended mTLS and RBAC before development began. = Il nostro security architect ha revisionato il design dei microservizi e ha raccomandato mTLS e RBAC prima dell'inizio dello sviluppo.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Cloud Security Engineer',
              italian: 'Ingegnere di sicurezza cloud',
              pronunciation: '/klaʊd sɪˈkjʊərəti ˌɛndʒɪˈnɪər/',
              phonetic: 'KLAUD si-KIU-ri-ti en-gi-NIR',
              example:
                'The cloud security engineer wrote Terraform modules that enforce encryption, logging, and least-privilege IAM by default. = Il cloud security engineer ha scritto moduli Terraform che impongono crittografia, logging e IAM a privilegio minimo di default.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Detection Engineer',
              italian: 'Ingegnere di rilevamento',
              pronunciation: '/dɪˈtɛkʃən ˌɛndʒɪˈnɪər/',
              phonetic: 'di-TEK-scion en-gi-NIR',
              example:
                'Our detection engineer writes and maintains over two hundred Sigma rules that power the SIEM alerting pipeline. = Il nostro detection engineer scrive e mantiene oltre duecento regole Sigma che alimentano la pipeline di alerting del SIEM.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Threat Modeler',
              italian: 'Modellatore di minacce (threat modeler)',
              pronunciation: '/θrɛt ˈmɒdlə/',
              phonetic: 'THRET MOD-ler',
              example:
                "Having a dedicated threat modeler on the team ensures that every new feature goes through a structured risk analysis. = Avere un threat modeler dedicato nel team assicura che ogni nuova feature passi attraverso un'analisi del rischio strutturata.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Compliance Engineer',
              italian: 'Ingegnere di conformità',
              pronunciation: '/kəmˈplaɪəns ˌɛndʒɪˈnɪər/',
              phonetic: 'kom-PLAI-ans en-gi-NIR',
              example:
                'The compliance engineer automates evidence collection so that auditors receive up-to-date control reports without manual effort. = Il compliance engineer automatizza la raccolta di evidenze così che gli auditor ricevano report sui controlli aggiornati senza sforzo manuale.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Red Teamer',
              italian: 'Membro del red team (red teamer)',
              pronunciation: '/rɛd ˈtiːmər/',
              phonetic: 'RED TI-mer',
              example:
                "The company hired an experienced red teamer to test the organization's defenses through realistic adversary simulations. = L'azienda ha assunto un red teamer esperto per testare le difese dell'organizzazione tramite simulazioni avversarie realistiche.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Blue Teamer',
              italian: 'Membro del blue team (blue teamer)',
              pronunciation: '/bluː ˈtiːmər/',
              phonetic: 'BLU TI-mer',
              example:
                'As a blue teamer, her primary focus is writing detection rules and responding to alerts generated by the SIEM. = Come blue teamer, il suo focus principale è scrivere regole di rilevamento e rispondere agli avvisi generati dal SIEM.',
              context: 'culture',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_culture_career_2',
          title: 'Certifications / Certificazioni',
          description: 'Le certificazioni più richieste',
          items: [
            {
              english: 'CISSP',
              italian: 'CISSP (certificazione senior di sicurezza)',
              pronunciation: '/siː aɪ ɛs ɛs piː/',
              phonetic: 'SI-AI-ES-ES-PI',
              example:
                'Earning the CISSP certification demonstrated broad security knowledge across eight domains from risk management to software security. = Ottenere la certificazione CISSP ha dimostrato una vasta conoscenza della sicurezza in otto domini dalla gestione del rischio alla sicurezza software.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Certified Information Systems Security Professional.',
            },
            {
              english: 'CCSP',
              italian: 'CCSP (certificazione cloud security)',
              pronunciation: '/siː siː ɛs piː/',
              phonetic: 'SI-SI-ES-PI',
              example:
                'The CCSP certification validates expertise in cloud security architecture, governance, and compliance frameworks. = La certificazione CCSP valida la competenza in architettura di sicurezza cloud, governance e framework di compliance.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Certified Cloud Security Professional.',
            },
            {
              english: 'OSCP',
              italian: 'OSCP (certificazione pentest Offensive Security)',
              pronunciation: '/əʊ ɛs siː piː/',
              phonetic: 'O-ES-SI-PI',
              example:
                "Passing the hands-on OSCP exam required exploiting multiple machines in a simulated corporate network within twenty-four hours. = Superare l'esame pratico OSCP ha richiesto lo sfruttamento di molteplici macchine in una rete aziendale simulata entro ventiquattro ore.",
              context: 'culture',
              difficulty: 'advanced',
              note: 'Offensive Security Certified Professional.',
            },
            {
              english: 'GIAC GCSA',
              italian: 'Cloud Security Automation (GIAC GCSA)',
              pronunciation: '/dʒæk dʒiː siː ɛs eɪ/',
              phonetic: 'GIAK GI-SI-ES-EI',
              example:
                "The GIAC GCSA certification focuses on automating security controls in cloud-native environments using Infrastructure as Code. = La certificazione GIAC GCSA si concentra sull'automazione dei controlli di sicurezza in ambienti cloud-native usando Infrastructure as Code.",
              context: 'culture',
              difficulty: 'advanced',
              note: 'GIAC Cloud Security Automation.',
            },
            {
              english: 'CKS',
              italian: 'Certified Kubernetes Security Specialist (CKS)',
              pronunciation: '/siː keɪ ɛs/',
              phonetic: 'SI-KEI-ES',
              example:
                "The CKS exam tests hands-on Kubernetes security skills including network policies, pod security, and audit logging. = L'esame CKS testa competenze pratiche di sicurezza Kubernetes incluse network policy, sicurezza dei pod e logging di audit.",
              context: 'culture',
              difficulty: 'advanced',
              note: 'Certified Kubernetes Security Specialist.',
            },
            {
              english: 'AWS Security Specialty',
              italian: 'AWS Security Specialty (certificazione AWS sicurezza)',
              pronunciation: '/eɪ dʌbljuː ɛs sɪˈkjʊərəti ˈspɛʃəlti/',
              phonetic: 'EI-DABL-IU-ES si-KIU-ri-ti SPE-scial-ti',
              example:
                "Passing the AWS Security Specialty exam validated deep knowledge of IAM, encryption, logging, and incident response on AWS. = Superare l'esame AWS Security Specialty ha validato una conoscenza approfondita di IAM, crittografia, logging e risposta agli incidenti su AWS.",
              context: 'culture',
              difficulty: 'advanced',
              tool: 'AWS Certification',
            },
            {
              english: 'AZ-500',
              italian: 'Azure Security Engineer Associate (AZ-500)',
              pronunciation: '/eɪ zɛd faɪv hʌndrəd/',
              phonetic: 'EI-ZED 500',
              example:
                "Studying for the AZ-500 exam deepened the engineer's understanding of Azure network security, identity, and data protection. = Studiare per l'esame AZ-500 ha approfondito la comprensione dell'ingegnere sulla sicurezza di rete Azure, l'identità e la protezione dei dati.",
              context: 'culture',
              difficulty: 'advanced',
              tool: 'Microsoft Certification',
            },
            {
              english: 'CKAD',
              italian: 'Certified Kubernetes Application Developer (CKAD)',
              pronunciation: '/siː keɪ eɪ diː/',
              phonetic: 'SI-KEI-EI-DI',
              example:
                'Although developer-focused, the CKAD certification builds container and Kubernetes fundamentals essential for DevSecOps work. = Sebbene orientata allo sviluppatore, la certificazione CKAD costruisce fondamentali su container e Kubernetes essenziali per il lavoro DevSecOps.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Certified Kubernetes Application Developer.',
            },
            {
              english: 'CRTP',
              italian: 'Certified Red Team Professional (CRTP)',
              pronunciation: '/siː ɑːr tiː piː/',
              phonetic: 'SI-AR-TI-PI',
              example:
                'The CRTP certification trains professionals to attack and secure Active Directory environments used in enterprise networks. = La certificazione CRTP forma professionisti ad attaccare e proteggere ambienti Active Directory usati nelle reti aziendali.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Certified Red Team Professional.',
            },
            {
              english: 'eJPT',
              italian: 'eLearnSecurity Junior Penetration Tester (eJPT)',
              pronunciation: '/iː dʒeɪ piː tiː/',
              phonetic: 'I-GEI-PI-TI',
              example:
                "Starting with the eJPT certification provides a beginner-friendly introduction to penetration testing methodologies and tools. = Iniziare con la certificazione eJPT fornisce un'introduzione adatta ai principianti alle metodologie e agli strumenti di penetration testing.",
              context: 'culture',
              difficulty: 'advanced',
              note: 'eLearnSecurity Junior Pen Tester.',
            },
          ],
        },
        {
          id: 'dso_culture_career_3',
          title: 'Job Search / Ricerca di Lavoro',
          description: 'Trovare e ottenere ruoli DevSecOps',
          items: [
            {
              english: 'Resume',
              italian: 'Curriculum',
              pronunciation: '/ˈrɛzjʊmeɪ/',
              phonetic: 'RE-ziu-mei',
              example:
                "Tailoring your resume to highlight pipeline security automation and compliance achievements makes it stand out to hiring managers. = Personalizzare il curriculum per evidenziare l'automazione della sicurezza delle pipeline e i risultati di compliance lo fa risaltare agli occhi dei responsabili delle assunzioni.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Portfolio',
              italian: 'Raccolta di lavori personali (portfolio)',
              pronunciation: '/pɔːtˈfəʊliəʊ/',
              phonetic: 'port-FO-lio',
              example:
                'Building a public portfolio with open-source security tools, blog posts, and CTF write-ups demonstrates practical expertise. = Costruire un portfolio pubblico con strumenti di sicurezza open-source, post sul blog e write-up CTF dimostra competenza pratica.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Whiteboard Interview',
              italian: 'Colloquio alla lavagna',
              pronunciation: '/ˈwaɪtbɔːd ˈɪntəvjuː/',
              phonetic: 'UAIT-bord IN-ter-viu',
              example:
                'During the whiteboard interview, the candidate designed a secure CI/CD pipeline with signing, scanning, and admission control. = Durante il colloquio alla lavagna, il candidato ha progettato una pipeline CI/CD sicura con firma, scansione e controllo di ammissione.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'System Design Interview',
              italian: 'Colloquio di progettazione di sistema',
              pronunciation: '/ˈsɪstəm dɪˈzaɪn ˈɪntəvjuː/',
              phonetic: 'SIS-tem di-ZAIN IN-ter-viu',
              example:
                'A strong system design interview answer addresses authentication, encryption at rest, rate limiting, and audit logging. = Una risposta forte al colloquio di system design affronta autenticazione, crittografia a riposo, rate limiting e logging di audit.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Behavioral Interview',
              italian: 'Colloquio comportamentale',
              pronunciation: '/bɪˈheɪvjərəl ˈɪntəvjuː/',
              phonetic: 'bi-HEI-vio-ral IN-ter-viu',
              example:
                'In the behavioral interview, the recruiter asked about a time when the candidate managed a production security incident. = Nel colloquio comportamentale, il recruiter ha chiesto di una volta in cui il candidato ha gestito un incidente di sicurezza in produzione.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Situation, Task, Action, Result.',
            },
            {
              english: 'Take-Home Assignment',
              italian: 'Compito a casa',
              pronunciation: '/teɪk həʊm əˈsaɪnmənt/',
              phonetic: 'TEIK-HOUM a-SAIN-ment',
              example:
                "The take-home assignment asked candidates to write a GitHub Actions workflow with SAST, secret scanning, and image signing. = L'esercizio da fare a casa chiedeva ai candidati di scrivere un workflow GitHub Actions con SAST, scansione segreti e firma delle immagini.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Salary Negotiation',
              italian: 'Negoziazione dello stipendio',
              pronunciation: '/ˈsæləri nɪˌɡəʊʃiˈeɪʃən/',
              phonetic: 'SA-la-ri ne-go-sci-EI-scion',
              example:
                "Researching market rates before salary negotiation ensures that the offer reflects the candidate's specialized security skills. = Ricercare le tariffe di mercato prima della negoziazione dello stipendio assicura che l'offerta rifletta le competenze di sicurezza specializzate del candidato.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Total Compensation',
              italian: 'Compensazione totale',
              pronunciation: '/ˈtəʊtl ˌkɒmpɛnˈseɪʃən/',
              phonetic: 'TO-tal kom-pen-SEI-scion',
              example:
                'Evaluating total compensation includes base salary, equity grants, signing bonus, and professional development budgets. = Valutare la compensazione totale include stipendio base, assegnazioni azionarie, bonus di ingresso e budget per lo sviluppo professionale.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Networking',
              italian: 'Costruzione di una rete professionale (networking)',
              pronunciation: '/ˈnɛtwɜːkɪŋ/',
              phonetic: 'NET-uor-king',
              example:
                'Attending security conferences and local meetups expands your professional networking and opens doors to job opportunities. = Partecipare a conferenze di sicurezza e meetup locali espande il tuo networking professionale e apre le porte a opportunità lavorative.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'LinkedIn',
              italian: 'Social network professionale (LinkedIn)',
              pronunciation: '/ˈlɪŋktɪn/',
              phonetic: 'LINK-d-IN',
              example:
                'Sharing security insights and project highlights on LinkedIn attracts recruiters and builds your professional reputation. = Condividere insight di sicurezza e punti salienti dei progetti su LinkedIn attrae i recruiter e costruisce la tua reputazione professionale.',
              context: 'culture',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dso_culture_career_4',
          title: 'Continuous Learning / Apprendimento Continuo',
          description: 'Mantenere le competenze aggiornate',
          items: [
            {
              english: 'Continuous Learning',
              italian: 'Apprendimento continuo',
              pronunciation: '/kənˈtɪnjʊəs ˈlɜːnɪŋ/',
              phonetic: 'kon-TI-nius LER-ning',
              example:
                "Dedicating two hours per week to continuous learning through courses, labs, and reading keeps security skills current. = Dedicare due ore a settimana all'apprendimento continuo tramite corsi, lab e lettura mantiene le competenze di sicurezza aggiornate.",
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Conference',
              italian: 'Conferenza',
              pronunciation: '/ˈkɒnfərəns/',
              phonetic: 'KON-fe-rens',
              example:
                'Presenting at a security conference like DEF CON or BSides establishes credibility and contributes knowledge to the community. = Presentare a una conferenza di sicurezza come DEF CON o BSides stabilisce credibilità e contribuisce conoscenza alla comunità.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Podcast',
              italian: 'Programma audio in serie (podcast)',
              pronunciation: '/ˈpɒdkɑːst/',
              phonetic: 'POD-kast',
              example:
                'Listening to security-focused podcasts during commutes is an efficient way to stay updated on emerging threats and tools. = Ascoltare podcast focalizzati sulla sicurezza durante il tragitto è un modo efficiente per restare aggiornati su minacce e strumenti emergenti.',
              context: 'culture',
              difficulty: 'advanced',
              note: 'Risky Business, Darknet Diaries.',
            },
            {
              english: 'Newsletter',
              italian: 'Lettera informativa periodica (newsletter)',
              pronunciation: '/ˈnjuːzlɛtə/',
              phonetic: 'NIUS-le-ter',
              example:
                'Subscribing to curated security newsletters delivers the most important vulnerability disclosures and tool updates weekly. = Abbonarsi a newsletter di sicurezza curate fornisce settimanalmente le divulgazioni di vulnerabilità più importanti e gli aggiornamenti degli strumenti.',
              context: 'culture',
              difficulty: 'advanced',
              tool: 'tl;dr sec, CloudSecList',
            },
            {
              english: 'Book',
              italian: 'Libro',
              pronunciation: '/bʊk/',
              phonetic: 'BUK',
              example:
                'Reading foundational books on application security and threat modeling builds the theoretical depth that tools alone cannot provide. = Leggere libri fondamentali sulla sicurezza delle applicazioni e il threat modeling costruisce la profondità teorica che i soli strumenti non possono fornire.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Mentor',
              italian: 'Mentore',
              pronunciation: '/ˈmɛntɔː/',
              phonetic: 'MEN-tor',
              example:
                'Finding an experienced mentor in the security field accelerates growth by providing guidance on career decisions and technical challenges. = Trovare un mentore esperto nel campo della sicurezza accelera la crescita fornendo orientamento sulle decisioni di carriera e le sfide tecniche.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Lab',
              italian: 'Laboratorio',
              pronunciation: '/læb/',
              phonetic: 'LAB',
              example:
                'Setting up a home lab with vulnerable VMs and container clusters lets you practice offensive and defensive techniques safely. = Allestire un lab domestico con VM vulnerabili e cluster di container ti permette di praticare tecniche offensive e difensive in sicurezza.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Open Source Project',
              italian: 'Progetto open source',
              pronunciation: '/ˈəʊpən sɔːs ˈprɒdʒɛkt/',
              phonetic: 'OU-pen SORS PRO-gekt',
              example:
                'Contributing to an open source project like Falco or Trivy demonstrates hands-on skills that impress interviewers. = Contribuire a un progetto open source come Falco o Trivy dimostra competenze pratiche che impressionano gli intervistatori.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Talks Submission',
              italian: 'Invio di talk',
              pronunciation: '/tɔːks səbˈmɪʃən/',
              phonetic: 'TOKS sab-MI-scion',
              example:
                'Submitting talks to local meetups and conferences is the best way to share knowledge and grow your professional network. = Sottomettere talk a meetup locali e conferenze è il modo migliore per condividere conoscenza e far crescere la tua rete professionale.',
              context: 'culture',
              difficulty: 'advanced',
            },
            {
              english: 'Personal Brand',
              italian: 'Brand personale',
              pronunciation: '/ˈpɜːsənl brænd/',
              phonetic: 'PER-so-nal BRAND',
              example:
                'Building a personal brand through blog posts, open-source contributions, and conference talks establishes you as a trusted expert. = Costruire un brand personale tramite post sul blog, contribuzioni open-source e talk a conferenze ti afferma come esperto fidato.',
              context: 'culture',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
  },
};
