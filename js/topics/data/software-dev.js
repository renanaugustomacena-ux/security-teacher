/**
 * SOFTWARE DEVELOPMENT TOPIC DATA - FlowLearn
 * ============================================
 *
 * 12 levels of English software development terminology.
 * Progression: Foundations → Career & Communication
 *
 * STATUS: Placeholder structure - levels will be populated progressively.
 */

export default {
  id: 'software-dev',
  levels: {
    0: {
      name: 'Fondamenti / Foundations',
      description: 'Le prime parole dello sviluppo software',
      lessons: [
        {
          id: 'dev_basics_1',
          title: 'Concetti Base / Basic Concepts',
          description: 'Code, program, software, algorithm...',
          items: [
            {
              english: 'Code',
              italian: 'Codice',
              pronunciation: '/ko\u028Ad/',
              phonetic: 'KOUD',
              example:
                'Refactoring helps you write clean code that is easier to maintain. = Il refactoring ti aiuta a scrivere codice pulito e più facile da mantenere.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Istruzioni scritte in un linguaggio di programmazione.',
            },
            {
              english: 'Program',
              italian: 'Programma',
              pronunciation: '/\u02C8pro\u028A\u0261r\u00E6m/',
              phonetic: 'PRO-gram',
              example:
                'A well-written program executes thousands of tasks per second without consuming excessive memory. = Un programma ben scritto esegue migliaia di compiti al secondo senza consumare memoria eccessiva.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Una sequenza di istruzioni che il computer pu\u00F2 eseguire.',
              code: `function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
}
greet('world');`,
              task: `Scrivi un programma che definisca una funzione di saluto e la invochi passando 'world'.`,
            },
            {
              english: 'Software',
              italian: 'programma applicativo (software)',
              pronunciation: '/\u02C8s\u0252ftwe\u0259r/',
              phonetic: 'SOFT-uer',
              example:
                "Every piece of software starts as an idea that a team turns into working code. = Ogni software nasce come un'idea che un team trasforma in codice funzionante.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Insieme di programmi, dati e documentazione.',
            },
            {
              english: 'Algorithm',
              italian: 'Algoritmo',
              pronunciation: '/\u02C8\u00E6l\u0261\u0259r\u026A\u00F0\u0259m/',
              phonetic: 'AL-go-ri-them',
              example:
                "Choosing the right algorithm can reduce execution time from hours to seconds. = Scegliere l'algoritmo giusto pu\u00F2 ridurre il tempo di esecuzione da ore a secondi.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Una procedura passo-passo per risolvere un problema.',
              code: `function binarySearch(arr: number[], target: number): number {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    arr[mid] < target ? lo = mid + 1 : hi = mid - 1;
  }
  return -1;
}`,
              task: `Implementa l'algoritmo di ricerca binaria su un array ordinato, ritornando l'indice trovato oppure -1.`,
            },
            {
              english: 'Data',
              italian: 'Dati',
              pronunciation: '/\u02C8de\u026At\u0259/',
              phonetic: 'DEI-ta',
              example:
                'Modern applications collect huge amounts of data that must be processed into useful information for users. = Le applicazioni moderne raccolgono enormi quantità di dati che devono essere elaborati in informazioni utili per gli utenti.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `const user: { id: number; email: string; active: boolean } = {
  id: 42,
  email: 'alice@example.com',
  active: true,
};`,
              task: 'Modella i dati di un utente con id numerico, email e stato attivo usando un oggetto tipizzato.',
            },
            {
              english: 'Logic',
              italian: 'Logica',
              pronunciation: '/\u02C8l\u0252d\u0292\u026Ak/',
              phonetic: 'LO-gic',
              example:
                'Keep the business logic separate from the UI so the same rules can be reused across mobile, web, and desktop clients. = Tieni la logica di business separata dalla UI così le stesse regole possono essere riusate su client mobile, web e desktop.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Problem Solving',
              italian: 'Risoluzione di problemi',
              pronunciation: '/\u02C8pr\u0252bl\u0259m \u02C8s\u0252lv\u026A\u014B/',
              phonetic: 'PRO-blem SOL-ving',
              example:
                'Strong problem solving skills matter more than memorising syntax. = Le capacit\u00E0 di risoluzione di problemi contano pi\u00F9 della memorizzazione della sintassi.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Feature',
              italian: 'Funzionalit\u00E0 / Feature',
              pronunciation: '/\u02C8fi\u02D0t\u0283\u0259r/',
              phonetic: 'FII-cer',
              example:
                'Before shipping a new feature, the team writes acceptance tests and updates the documentation for the support staff. = Prima di rilasciare una nuova funzionalità, il team scrive test di accettazione e aggiorna la documentazione per il personale di supporto.',
              context: 'development',
              difficulty: 'beginner',
              note: 'Una caratteristica specifica del software.',
            },
            {
              english: 'Requirement',
              italian: 'Requisito',
              pronunciation: '/r\u026A\u02C8kwa\u026A\u0259rm\u0259nt/',
              phonetic: 're-KUAIER-ment',
              example: `Each requirement must be testable, otherwise nobody can prove whether the implementation actually satisfies it. = Ogni requisito deve essere testabile, altrimenti nessuno può dimostrare se l'implementazione lo soddisfa davvero.`,
              context: 'management',
              difficulty: 'beginner',
              note: 'Cosa il software deve essere in grado di fare.',
            },
            {
              english: 'Release',
              italian: 'Rilascio / Release',
              pronunciation: '/r\u026A\u02C8li\u02D0s/',
              phonetic: 're-LIIS',
              example:
                'We schedule a new release every two weeks with bug fixes and features. = Pianifichiamo un nuovo rilascio ogni due settimane con correzioni e funzionalit\u00E0.',
              context: 'management',
              difficulty: 'beginner',
              note: "Una versione specifica del software pronta per l'uso.",
            },
          ],
        },
        {
          id: 'dev_basics_2',
          title: 'Strumenti / Tools',
          description: 'IDE, editor, compiler, debugger...',
          items: [
            {
              english: 'IDE (Integrated Development Environment)',
              italian: 'Ambiente di Sviluppo Integrato',
              pronunciation: '/\u02CCa\u026A di\u02D0 \u02C8i\u02D0/',
              phonetic: 'ai-dii-II',
              example:
                'A good IDE highlights errors as you type and offers autocompletion. = Un buon IDE evidenzia gli errori mentre scrivi e offre il completamento automatico.',
              context: 'tools',
              difficulty: 'beginner',
              note: 'Include tutto quello che serve: editor, debugger, terminale.',
            },
            {
              english: 'Text Editor',
              italian: 'Editor di Testo',
              pronunciation: '/tekst \u02C8ed\u026At\u0259r/',
              phonetic: 'TEKST E-di-ter',
              example:
                'A lightweight text editor like VS Code starts faster than a full IDE and is ideal for quick scripts. = Un editor di testo leggero come VS Code si avvia più velocemente di un IDE completo ed è ideale per script veloci.',
              context: 'tools',
              difficulty: 'beginner',
            },
            {
              english: 'Compiler',
              italian: 'Compilatore',
              pronunciation: '/k\u0259m\u02C8pa\u026Al\u0259r/',
              phonetic: 'kom-PAI-ler',
              example:
                'The compiler translates code to machine language. = Il compilatore traduce il codice in linguaggio macchina.',
              context: 'tools',
              difficulty: 'intermediate',
              note: "Traduce tutto il codice in un colpo solo prima dell'esecuzione (es. C, C++, Java).",
              command: 'tsc --strict --target ES2022 src/index.ts',
              task: 'Compila il sorgente TypeScript con modalita strict e target ES2022 usando il compilatore.',
            },
            {
              english: 'Interpreter',
              italian: 'Interprete',
              pronunciation: '/\u026An\u02C8t\u025C\u02D0rpr\u0259t\u0259r/',
              phonetic: 'in-TER-pri-ter',
              example:
                'An interpreter executes Python code line by line, which makes debugging fast but slows down production performance. = Un interprete esegue il codice Python riga per riga, rendendo veloce il debugging ma rallentando le prestazioni in produzione.',
              context: 'tools',
              difficulty: 'intermediate',
              note: 'Esegue il codice riga per riga (es. Python, JavaScript).',
              command: 'node --experimental-vm-modules scripts/run.js',
              task: `Avvia l'interprete Node con i moduli VM sperimentali per eseguire lo script di avvio.`,
            },
            {
              english: 'Debugger',
              italian: 'strumento di analisi del codice (debugger)',
              pronunciation: '/\u02CCdi\u02D0\u02C8b\u028C\u0261\u0259r/',
              phonetic: 'dii-BA-gher',
              example:
                'Attach the debugger to the running process to inspect variables, set breakpoints, and step through the failing function. = Collega il debugger al processo in esecuzione per ispezionare le variabili, mettere breakpoint e scorrere passo passo la funzione che fallisce.',
              context: 'tools',
              difficulty: 'intermediate',
              command: 'node --inspect-brk=9229 dist/server.js',
              code: `function processOrder(id: number) {
  debugger;
  return fetchOrder(id);
}`,
              task: 'Lancia il debugger sulla porta 9229 fermandoti alla prima riga, e usa la parola chiave debugger nel codice come breakpoint.',
            },
            {
              english: 'Terminal (CLI)',
              italian: 'Terminale / Riga di Comando',
              pronunciation: '/\u02C8t\u025C\u02D0rm\u026Anl/',
              phonetic: 'TER-mi-nal',
              example: `Power users prefer the terminal because chaining commands with pipes is faster than clicking through a graphical interface. = Gli utenti esperti preferiscono il terminale perché concatenare comandi con le pipe è più veloce che cliccare in un'interfaccia grafica.`,
              context: 'tools',
              difficulty: 'beginner',
              command: `ls -la | grep '.env' | wc -l`,
              task: 'Concatena tre comandi nel terminale per contare quanti file .env sono presenti nella directory corrente.',
            },
            {
              english: 'Build',
              italian: 'Costruzione / Build',
              pronunciation: '/b\u026Ald/',
              phonetic: 'BILD',
              example:
                "If the build fails, check the compiler output for missing dependencies. = Se la build fallisce, controlla l'output del compilatore per dipendenze mancanti.",
              context: 'tools',
              difficulty: 'intermediate',
              note: 'Processo di trasformazione del codice sorgente in un prodotto finito.',
              command: 'npm run build -- --mode production',
              task: 'Esegui la build di produzione del progetto invocando lo script npm con il flag mode.',
            },
            {
              english: 'Version Control',
              italian: 'Controllo Versione',
              pronunciation: '/\u02C8v\u025C\u02D0r\u0292\u0259n k\u0259n\u02C8tro\u028Al/',
              phonetic: 'VER-scen kon-TROUL',
              example:
                "Without version control, teams overwrite each other's changes. = Senza il controllo versione, i team sovrascrivono le modifiche degli altri.",
              context: 'tools',
              difficulty: 'intermediate',
              command: `git init && git add . && git commit -m 'chore: initial commit'`,
              task: 'Inizializza il controllo versione nel progetto creando il primo commit con tutti i file correnti.',
            },
            {
              english: 'Plugin / Extension',
              italian: 'Estensione / Plugin',
              pronunciation: '/\u02C8pl\u028C\u0261\u026An/',
              phonetic: 'PLAG-in',
              example:
                'Install a plugin to add features to your IDE. = Installa un plugin per aggiungere funzioni al tuo IDE.',
              context: 'tools',
              difficulty: 'beginner',
              command: 'code --install-extension dbaeumer.vscode-eslint',
              task: `Installa l'estensione ESLint per VS Code via riga di comando per abilitare il linting nel tuo editor.`,
            },
            {
              english: 'Framework',
              italian: 'Cornice di Lavoro / Framework',
              pronunciation: '/\u02C8fre\u026Amw\u025C\u02D0rk/',
              phonetic: 'FREIM-uerk',
              example:
                'Choosing the right framework saves months of development time. = Scegliere il framework giusto fa risparmiare mesi di sviluppo.',
              context: 'tools',
              difficulty: 'intermediate',
              note: 'Una struttura predefinita su cui costruire il software.',
            },
          ],
        },
        {
          id: 'dev_basics_3',
          title: 'Errori e Debug / Errors & Debug',
          description: 'Bug, debug, error, crash, fix...',
          items: [
            {
              english: 'Bug',
              italian: 'Difetto (bug)',
              pronunciation: '/b\u028C\u0261/',
              phonetic: 'BAG',
              example:
                'The tester found a critical bug that caused data loss during save operations. = Il tester ha trovato un bug critico che causava perdita di dati durante il salvataggio.',
              context: 'errors',
              difficulty: 'beginner',
              note: 'Un errore o un difetto nel software che causa risultati errati.',
            },
            {
              english: 'Debugging',
              italian: 'Correzione errori (debugging)',
              pronunciation: '/\u02CCdi\u02D0\u02C8b\u028C\u0261\u026A\u014B/',
              phonetic: 'dii-BA-ghing',
              example:
                'Most developers spend more time debugging than writing new code. = La maggior parte degli sviluppatori passa pi\u00F9 tempo a fare debugging che a scrivere codice nuovo.',
              context: 'errors',
              difficulty: 'beginner',
              note: 'Il processo di ricerca e risoluzione dei bug.',
              command: 'node --inspect-brk -r ts-node/register src/index.ts',
              task: 'Avvia una sessione di debugging su un file TypeScript usando ts-node con breakpoint iniziale.',
            },
            {
              english: 'Crash',
              italian: 'Chiusura inaspettata (crash)',
              pronunciation: '/kr\u00E6\u0283/',
              phonetic: 'CRASH',
              example:
                "The app crashes when I click the button. = L'app crasha quando clicco sul pulsante.",
              context: 'errors',
              difficulty: 'beginner',
              note: 'Chiusura improvvisa e non prevista del programma.',
            },
            {
              english: 'Freeze',
              italian: 'Blocco / Bloccarsi',
              pronunciation: '/fri\u02D0z/',
              phonetic: 'FRIIS',
              example:
                'The browser tab tends to freeze when an infinite loop blocks the main JavaScript thread for several seconds. = La scheda del browser tende a bloccarsi quando un loop infinito blocca il thread principale di JavaScript per diversi secondi.',
              context: 'errors',
              difficulty: 'beginner',
            },
            {
              english: 'Patch / Fix',
              italian: 'Correzione / Pezza',
              pronunciation: '/p\u00E6t\u0283/',
              phonetic: 'PAC',
              example:
                'Vendors release a patch within hours when a critical security fix needs to reach customers before attackers exploit the flaw. = I vendor rilasciano una patch entro poche ore quando una correzione di sicurezza critica deve raggiungere i clienti prima che gli aggressori sfruttino la falla.',
              context: 'errors',
              difficulty: 'beginner',
            },
            {
              english: 'Runtime Error',
              italian: 'Errore a tempo di esecuzione',
              pronunciation: '/\u02C8r\u028Cnta\u026Am \u02C8er\u0259r/',
              phonetic: 'RAN-taim E-rror',
              example:
                'A runtime error occurred during calculations. = Un errore runtime \u00E8 avvenuto durante i calcoli.',
              context: 'errors',
              difficulty: 'intermediate',
              code: `function divide(a: number, b: number): number {
  if (b === 0) throw new RangeError('Division by zero');
  return a / b;
}`,
              task: 'Scrivi una funzione che sollevi un errore runtime di tipo RangeError quando il divisore e zero.',
            },
            {
              english: 'Compile-time Error',
              italian: 'Errore di compilazione',
              pronunciation: '/k\u0259m\u02C8pa\u026Al ta\u026Am \u02C8er\u0259r/',
              phonetic: 'kom-PAIL taim E-rror',
              example:
                'A missing semicolon causes a compile-time error in C, so the program never reaches the testing stage. = Un punto e virgola mancante causa un errore di compilazione in C, quindi il programma non raggiunge mai la fase di test.',
              context: 'errors',
              difficulty: 'intermediate',
            },
            {
              english: 'Logic Error',
              italian: 'Errore logico',
              pronunciation: '/\u02C8l\u0252d\u0292\u026Ak \u02C8er\u0259r/',
              phonetic: 'LO-gic E-rror',
              example:
                'A logic error can be subtle: the code compiles and runs but produces wrong results. = Un errore logico pu\u00F2 essere subdolo: il codice compila e gira ma produce risultati sbagliati.',
              context: 'errors',
              difficulty: 'intermediate',
            },
            {
              english: 'Log',
              italian: 'Registro (log)',
              pronunciation: '/l\u0252\u0261/',
              phonetic: 'LOG',
              example:
                'We added structured log entries with timestamps so production issues are easier to trace. = Abbiamo aggiunto voci di log strutturate con timestamp così i problemi in produzione sono più facili da tracciare.',
              context: 'errors',
              difficulty: 'beginner',
              code: `const logger = {
  info: (msg: string, meta?: object) =>
    console.log(JSON.stringify({ level: 'info', msg, ...meta, ts: Date.now() })),
};
logger.info('user.login', { userId: 42 });`,
              task: 'Crea un logger strutturato in JSON che includa livello, messaggio, metadati e timestamp.',
            },
            {
              english: 'Breakpoint',
              italian: 'Punto di interruzione',
              pronunciation: '/\u02C8bre\u026Akp\u0254\u026Ant/',
              phonetic: 'BREIK-point',
              example: `Place a conditional breakpoint that triggers only when the user ID equals 42 to avoid stopping on every iteration. = Metti un breakpoint condizionale che si attiva solo quando l'ID utente è uguale a 42 per evitare di fermarsi a ogni iterazione.`,
              context: 'tools',
              difficulty: 'intermediate',
              code: `function checkout(cart: Cart) {
  debugger;
  return processPayment(cart.total);
}`,
              task: `Inserisci un breakpoint inline tramite la parola chiave debugger prima dell'elaborazione del pagamento.`,
            },
          ],
        },
        {
          id: 'dev_basics_4',
          title: 'Documentazione / Documentation',
          description: 'Documentation, README, comment, version...',
          items: [
            {
              english: 'Documentation',
              italian: 'Documentazione',
              pronunciation: '/\u02CCd\u0252kj\u028Amen\u02C8te\u026A\u0283\u0259n/',
              phonetic: 'do-kiu-men-TEI-scen',
              example:
                'Keeping documentation up to date prevents new team members from guessing how the system works. = Tenere la documentazione aggiornata evita che i nuovi membri del team debbano indovinare come funziona il sistema.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'README',
              italian: 'Leggi-me / README',
              pronunciation: '/\u02C8ri\u02D0dmi\u02D0/',
              phonetic: 'RIID-mii',
              example:
                'Read the README file for installation instructions. = Leggi il file README per le istruzioni di installazione.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Il file principale che spiega il progetto.',
            },
            {
              english: 'Comment',
              italian: 'Commento',
              pronunciation: '/\u02C8k\u0252ment/',
              phonetic: 'KOM-ment',
              example:
                'Write a comment to explain the why behind a tricky algorithm, not to repeat what the code already says clearly. = Scrivi un commento per spiegare il perché dietro un algoritmo complicato, non per ripetere ciò che il codice già dice chiaramente.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `// FIXME: race condition when two requests arrive within 5ms
// see RFC-0042 for the proposed fix using a mutex
await acquireLock(resourceId);`,
              task: 'Aggiungi un commento che spieghi una race condition e referenzi il documento RFC con la soluzione proposta.',
            },
            {
              english: 'Variable Name',
              italian: 'Nome di Variabile',
              pronunciation: '/\u02C8v\u00E6ri\u0259bl ne\u026Am/',
              phonetic: 'VE-ri-ebol neim',
              example:
                'A descriptive variable name like userEmail beats a cryptic single letter when someone else needs to read the code months later. = Un nome di variabile descrittivo come userEmail batte una singola lettera criptica quando qualcun altro deve leggere il codice mesi dopo.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `const isAuthenticated: boolean = checkSession();
const maxRetryAttempts: number = 3;
let currentUserId: string | null = null;`,
              task: 'Dichiara tre variabili con nomi descrittivi per stato di autenticazione, numero massimo di tentativi e ID utente corrente.',
            },
            {
              english: 'Naming Convention',
              italian: 'Convenzione sui Nomi',
              pronunciation: '/\u02C8ne\u026Am\u026A\u014B k\u0259n\u02C8ven\u0283\u0259n/',
              phonetic: 'NEIM-ing kon-VEN-scen',
              example:
                'Following a consistent naming convention like camelCase or snake_case prevents subtle bugs when modules from different teams interact. = Seguire una convenzione di nomi coerente come camelCase o snake_case previene bug sottili quando moduli di team diversi interagiscono.',
              context: 'foundations',
              difficulty: 'intermediate',
              code: `// camelCase for variables/functions
const userEmail = 'a@b.com';
// PascalCase for classes/types
class UserAccount {}
// SCREAMING_SNAKE_CASE for constants
const MAX_LOGIN_ATTEMPTS = 5;`,
              task: 'Mostra le convenzioni sui nomi in JavaScript usando camelCase per variabili, PascalCase per classi e SCREAMING_SNAKE_CASE per costanti.',
            },
            {
              english: 'Versioning',
              italian: 'Versionamento',
              pronunciation: '/\u02C8v\u025C\u02D0r\u0292\u0259n\u026A\u014B/',
              phonetic: 'VER-scen-ing',
              example:
                'Semantic versioning communicates breaking changes through the major number so consumers know when an upgrade requires code changes. = Il versionamento semantico comunica i cambiamenti incompatibili attraverso il numero major così i consumatori sanno quando un aggiornamento richiede modifiche al codice.',
              context: 'management',
              difficulty: 'intermediate',
              command: `npm version minor -m 'release: bump to %s with new auth feature'`,
              task: 'Incrementa la versione minor del pacchetto npm aggiungendo un messaggio di commit personalizzato per il versionamento.',
            },
            {
              english: 'Manual',
              italian: 'Manuale',
              pronunciation: '/\u02C8m\u00E6nju\u0259l/',
              phonetic: 'MAN-iu-al',
              example:
                'Reading the manual before configuring a complex tool saves hours of trial-and-error troubleshooting later. = Leggere il manuale prima di configurare uno strumento complesso fa risparmiare ore di problem solving a tentativi più tardi.',
              context: 'foundations',
              difficulty: 'beginner',
              command: 'git help commit | less',
              task: 'Apri il manuale ufficiale del comando git commit usando il sistema di help integrato.',
            },
            {
              english: 'Specification',
              italian: 'Specifica',
              pronunciation: '/\u02CCspes\u026Af\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'spe-si-fi-KEI-scen',
              example:
                'The HTTP specification defines status codes, headers, and methods so different vendors can interoperate without ambiguity. = La specifica HTTP definisce codici di stato, header e metodi così vendor diversi possono interoperare senza ambiguità.',
              context: 'foundations',
              difficulty: 'intermediate',
            },
            {
              english: 'Diagram (UML)',
              italian: 'Diagramma',
              pronunciation: '/\u02C8da\u026A\u0259\u0261r\u00E6m/',
              phonetic: 'DAIE-gram',
              example: `A UML class diagram makes inheritance and associations visible at a glance, which helps onboard new developers faster. = Un diagramma UML delle classi rende visibili a colpo d'occhio l'ereditarietà e le associazioni, il che aiuta a far entrare i nuovi sviluppatori più velocemente.`,
              context: 'design',
              difficulty: 'intermediate',
            },
            {
              english: 'API Reference',
              italian: 'Riferimento API',
              pronunciation: '/\u02CCe\u026A pi\u02D0 \u02C8a\u026A \u02C8refr\u0259ns/',
              phonetic: 'ei-pi-ai RE-frens',
              example:
                'Check the API reference for method details. = Controlla il riferimento API per i dettagli sui metodi.',
              context: 'foundations',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },
    1: {
      name: 'Version Control',
      description: 'Git e controllo versione',
      lessons: [
        {
          id: 'dev_git_basics',
          title: 'Git Base / Basic Git',
          description: 'Repository, commit, push, pull...',
          items: [
            {
              english: 'Repository',
              italian: 'Archivio / Repository',
              pronunciation: '/r\u026A\u02C8p\u0252z\u026At\u0259ri/',
              phonetic: 're-PO-si-to-ri',
              example:
                'Clone the repository over SSH so that pushes are authenticated with your key instead of asking for a password every time. = Clona la repository tramite SSH così i push vengono autenticati con la tua chiave invece di chiedere una password ogni volta.',
              context: 'git',
              difficulty: 'beginner',
              note: 'Spesso abbreviato in "repo". Il contenitore del progetto e della sua storia.',
              command: 'git clone --depth 1 git@github.com:acme/payments-api.git',
              task: 'Clona la repository remota tramite SSH con profondita di un solo commit per risparmiare banda.',
            },
            {
              english: 'Commit',
              italian: 'Registrazione (commit)',
              pronunciation: '/k\u0259\u02C8m\u026At/',
              phonetic: 'kom-MIT',
              example:
                'A clear commit message explains why the change was made, not just what changed, since the diff already shows what. = Un messaggio di commit chiaro spiega perché è stato fatto il cambiamento, non solo cosa è cambiato, dato che la diff già mostra cosa.',
              context: 'git',
              difficulty: 'beginner',
              note: 'Un salvataggio dello stato del progetto (uno "snapshot").',
              command: 'git commit -m "feat(auth): add SSO login flow"',
              task: `Registra le modifiche staged con un commit convenzionale che descrive l'aggiunta del flusso SSO.`,
            },
            {
              english: 'Push',
              italian: 'Spingere / Inviare',
              pronunciation: '/p\u028A\u0283/',
              phonetic: 'PUSC',
              example:
                'Always pull before you push to avoid rejected updates. = Fai sempre pull prima di push per evitare aggiornamenti rifiutati.',
              context: 'git',
              difficulty: 'beginner',
              command: 'git push -u origin feature/user-profile',
              task: 'Esegui il push del branch locale sul remoto origin impostando il tracking upstream.',
            },
            {
              english: 'Pull',
              italian: 'Tirare / Scaricare',
              pronunciation: '/p\u028Al/',
              phonetic: 'PUL',
              example:
                'Every morning the team runs git pull to start with the latest code. = Ogni mattina il team esegue git pull per partire con il codice più recente.',
              context: 'git',
              difficulty: 'beginner',
              note: 'Scarica le modifiche dal server e le unisce al tuo codice.',
              command: 'git pull --rebase origin main',
              task: 'Scarica le ultime modifiche da main e applica i tuoi commit in cima tramite rebase invece del merge.',
            },
            {
              english: 'Clone',
              italian: 'Clonare / Copiare',
              pronunciation: '/klo\u028An/',
              phonetic: 'CLOUN',
              example:
                'New developers clone the repo on their first day to get the full project history. = I nuovi sviluppatori clonano la repo il primo giorno per ottenere tutta la storia del progetto.',
              context: 'git',
              difficulty: 'beginner',
              command: 'git clone --recurse-submodules git@github.com:acme/monorepo.git',
              task: 'Clona la repository remota includendo automaticamente tutti i sottomoduli.',
            },
            {
              english: 'Add / Stage',
              italian: 'Aggiungere / Mettere in stage',
              pronunciation: '/\u00E6d/ /ste\u026Ad\u0292/',
              phonetic: 'AD STEIG',
              example:
                'Use git add -p to stage only some hunks of a modified file when you want to split a noisy change into two separate commits. = Usa git add -p per mettere in stage solo alcune porzioni di un file modificato quando vuoi dividere una modifica disordinata in due commit separati.',
              context: 'git',
              difficulty: 'beginner',
              note: 'Lo "staging" \u00E8 la fase intermedia prima del commit.',
              command: 'git add -p src/auth.ts',
              task: 'Metti in stage solo alcune porzioni del file di autenticazione in modo interattivo per dividere il commit.',
            },
            {
              english: 'Status',
              italian: 'Stato',
              pronunciation: '/\u02C8ste\u026At\u0259s/',
              phonetic: 'STEI-tas',
              example:
                'Before committing, always run git status to see which files have been changed. = Prima di fare commit, esegui sempre git status per vedere quali file sono stati modificati.',
              context: 'git',
              difficulty: 'beginner',
              command: 'git status --short --branch',
              task: 'Mostra lo stato del repository in formato compatto con il nome del branch corrente.',
            },
            {
              english: 'Diff',
              italian: 'Differenza / Diff',
              pronunciation: '/d\u026Af/',
              phonetic: 'DIF',
              example:
                'Reading the diff before pushing helps you catch debug print statements or commented-out code that should never reach production. = Leggere la diff prima di fare push ti aiuta a individuare print di debug o codice commentato che non dovrebbero mai arrivare in produzione.',
              context: 'git',
              difficulty: 'intermediate',
              command: 'git diff --staged --stat',
              task: 'Mostra la diff delle sole modifiche staged con riassunto statistico per file.',
            },
            {
              english: 'Remote',
              italian: 'Remoto',
              pronunciation: '/r\u026A\u02C8mo\u028At/',
              phonetic: 're-MOUT',
              example:
                'You can add multiple remote repositories to push your code to different servers. = Puoi aggiungere pi\u00F9 repository remoti per inviare il codice a server diversi.',
              context: 'git',
              difficulty: 'intermediate',
              command: 'git remote add upstream git@github.com:acme/main-repo.git',
              task: 'Aggiungi il repository originale come remoto upstream per poter sincronizzare il tuo fork.',
            },
            {
              english: 'Head',
              italian: 'Punta / Head',
              pronunciation: '/hed/',
              phonetic: 'HED',
              example: `Detaching HEAD lets you inspect an old commit without affecting any branch, but commits made there can be lost easily. = Il detach dell'HEAD ti permette di ispezionare un vecchio commit senza influenzare alcun branch, ma i commit fatti lì possono andare persi facilmente.`,
              context: 'git',
              difficulty: 'advanced',
              note: "Puntatore all'ultimo commit effettuato nel branch attuale.",
              command: 'git log HEAD~5..HEAD --oneline',
              task: `Visualizza gli ultimi cinque commit raggiungibili dall'HEAD in formato compatto.`,
            },
          ],
        },
        {
          id: 'dev_git_branch',
          title: 'Branching',
          description: 'Branch, merge, conflict, rebase...',
          items: [
            {
              english: 'Branch',
              italian: 'Ramo / Branch',
              pronunciation: '/br\u00E6nt\u0283/',
              phonetic: 'BRANCH',
              example:
                'Creating a short-lived feature branch isolates your work-in-progress from main, so the trunk always stays releasable. = Creare un branch di funzionalità breve isola il tuo lavoro in corso da main, così il tronco rimane sempre rilasciabile.',
              context: 'git',
              difficulty: 'beginner',
              note: 'Una linea di sviluppo separata dal "main".',
              command: 'git checkout -b feature/user-profile',
              task: 'Crea un nuovo branch per la funzionalita del profilo utente e spostati subito su di esso.',
            },
            {
              english: 'Checkout / Switch',
              italian: 'Spostarsi / Cambiare',
              pronunciation: '/\u02C8t\u0283eka\u028At/ /sw\u026At\u0283/',
              phonetic: 'CEK-aut SUICC',
              example:
                'Run git switch to move between branches more safely than checkout, which can also be used for restoring files. = Esegui git switch per spostarti tra branch in modo più sicuro di checkout, che può anche essere usato per ripristinare file.',
              context: 'git',
              difficulty: 'beginner',
              note: 'Usato per cambiare il branch corrente.',
              command: 'git switch feature/user-profile',
              task: 'Spostati sul branch feature/user-profile usando il comando moderno e piu sicuro di checkout.',
            },
            {
              english: 'Merge',
              italian: 'Fondere / Unire',
              pronunciation: '/m\u025C\u02D0rd\u0292/',
              phonetic: 'MERG',
              example:
                'After the code review passes, merge your feature branch into main. = Dopo che la code review passa, unisci il tuo branch di funzionalità nel main.',
              context: 'git',
              difficulty: 'intermediate',
              note: 'Combina le modifiche di due branch diversi.',
              command: 'git merge --no-ff feature/user-profile',
              task: 'Unisci il branch feature/user-profile nel corrente forzando il commit di merge per preservare la storia del branch.',
            },
            {
              english: 'Conflict',
              italian: 'Conflitto',
              pronunciation: '/\u02C8k\u0252nfl\u026Akt/',
              phonetic: 'CON-flikt',
              example:
                'Resolving a merge conflict requires opening the affected file, choosing which version to keep, and staging the result. = Risolvere un conflitto di merge richiede di aprire il file interessato, scegliere quale versione tenere e mettere in stage il risultato.',
              context: 'git',
              difficulty: 'intermediate',
              note: 'Succede quando due persone modificano la stessa riga dello stesso file.',
              command: 'git diff --name-only --diff-filter=U',
              task: 'Elenca solo i file in conflitto durante il merge per sapere quali aprire e risolvere.',
            },
            {
              english: 'Rebase',
              italian: 'Rifondare / Rebase',
              pronunciation: '/\u02CCri\u02D0\u02C8be\u026As/',
              phonetic: 'rii-BEIS',
              example:
                'Interactive rebase lets you reorder, squash, or reword commits before sharing the branch, producing a cleaner history. = Il rebase interattivo ti permette di riordinare, schiacciare o riformulare i commit prima di condividere il branch, producendo una storia più pulita.',
              context: 'git',
              difficulty: 'advanced',
              note: "Alternativa al merge: sposta il punto d'inizio del tuo branch.",
              command: 'git rebase -i HEAD~3',
              task: 'Avvia un rebase interattivo degli ultimi tre commit per riordinarli, schiacciarli o riformularli.',
            },
            {
              english: 'Fetch',
              italian: 'Recuperare / Fetch',
              pronunciation: '/fet\u0283/',
              phonetic: 'FECC',
              example:
                'Run git fetch to download remote changes without altering your working directory. = Esegui git fetch per scaricare le modifiche remote senza alterare la tua directory di lavoro.',
              context: 'git',
              difficulty: 'intermediate',
              note: 'Scarica info ma non le unisce al tuo codice (a differenza del pull).',
              command: 'git fetch --all --prune',
              task: 'Recupera gli aggiornamenti da tutti i remoti rimuovendo i riferimenti ai branch eliminati upstream.',
            },
            {
              english: 'git log --oneline',
              italian: 'git log --oneline',
              pronunciation: '/l\u0252\u0261/',
              phonetic: 'LOG',
              example:
                'Running git log --oneline produces one commit per line, which is ideal when scanning recent history during a code review. = Eseguire git log --oneline produce un commit per riga, il che è ideale quando si scansiona la storia recente durante una code review.',
              context: 'git',
              difficulty: 'beginner',
              note: 'Variante compatta del comando git log, utile per overview rapide della cronologia.',
              command: 'git log --oneline --graph --decorate -n 20',
              task: 'Mostra gli ultimi venti commit in formato compatto con grafo dei branch e decorazioni.',
            },
            {
              english: 'Tag',
              italian: 'Etichetta / Tag',
              pronunciation: '/t\u00E6\u0261/',
              phonetic: 'TAG',
              example:
                'Annotated tags carry an author, date, and message, which makes them the recommended choice for marking release versions. = I tag annotati portano un autore, una data e un messaggio, il che li rende la scelta consigliata per marcare le versioni di rilascio.',
              context: 'git',
              difficulty: 'intermediate',
              note: 'Un nome fisso dato a un commit specifico (es. per i rilasci).',
              command: 'git tag -a v1.2.0 -m "release: v1.2.0 with new SSO support"',
              task: 'Crea un tag annotato v1.2.0 con un messaggio descrittivo del rilascio.',
            },
            {
              english: 'Stash',
              italian: 'Nascondere / Mettere da parte',
              pronunciation: '/st\u00E6\u0283/',
              phonetic: 'STASC',
              example:
                "Before switching branches, stash your uncommitted changes so you don't lose them. = Prima di cambiare branch, metti da parte le modifiche non committate per non perderle.",
              context: 'git',
              difficulty: 'intermediate',
              note: 'Salva temporaneamente le modifiche senza fare un commit.',
              command: 'git stash push -m "WIP: refactoring auth middleware" -u',
              task: 'Metti da parte temporaneamente le modifiche in corso, inclusi i file non tracciati, con un messaggio descrittivo.',
            },
            {
              english: 'Blame',
              italian: 'Incolpare / Blame',
              pronunciation: '/ble\u026Am/',
              phonetic: 'BLEIM',
              example:
                'Use git blame to see who changed the line. = Usa git blame per vedere chi ha cambiato la riga.',
              context: 'git',
              difficulty: 'advanced',
              note: "Mostra l'autore e il commit per ogni riga di un file.",
              command: 'git blame -L 42,80 src/auth/login.ts',
              task: `Identifica l'autore e il commit di ogni riga tra la 42 e la 80 del file di login.`,
            },
          ],
        },
        {
          id: 'dev_git_collab',
          title: 'Collaborazione / Collaboration',
          description: 'Fork, pull request, code review...',
          items: [
            {
              english: 'Fork',
              italian: 'Bivio / Fork',
              pronunciation: '/f\u0254\u02D0rk/',
              phonetic: 'FORK',
              example:
                'To contribute to an open-source project, first fork it to your own account. = Per contribuire a un progetto open-source, prima fai il fork sul tuo account.',
              context: 'collaboration',
              difficulty: 'beginner',
              note: 'Copia completa di un progetto pubblico sul proprio profilo.',
              command: 'gh repo fork acme/payments-api --clone --remote',
              task: 'Crea un fork della repository remota, clonalo localmente e configura il remoto upstream automaticamente.',
            },
            {
              english: 'Pull Request (PR)',
              italian: 'Richiesta di unione / Pull Request',
              pronunciation: '/p\u028Al r\u026A\u02C8kwest/',
              phonetic: 'PUL re-KUEST',
              example:
                'A small pull request with focused changes is easier to review and merges faster than a giant one touching dozens of files. = Una pull request piccola con modifiche mirate è più facile da revisionare e viene mergeata più velocemente di una gigante che tocca decine di file.',
              context: 'collaboration',
              difficulty: 'beginner',
              note: 'Proposta formale di unire il tuo codice a un progetto.',
              command:
                'gh pr create --title "feat(auth): add SSO login" --body "Closes #42" --reviewer @team/backend',
              task: 'Apri una pull request con titolo convenzionale, riferimento alla issue chiusa e revisore assegnato.',
            },
            {
              english: 'Code Review',
              italian: 'Revisione del codice',
              pronunciation: '/ko\u028Ad r\u026A\u02C8vju\u02D0/',
              phonetic: 'KOUD re-VIU',
              example:
                'Effective code review checks both correctness and readability so the codebase stays maintainable as the team grows. = Una code review efficace controlla sia la correttezza che la leggibilità così la codebase rimane manutenibile mentre il team cresce.',
              context: 'collaboration',
              difficulty: 'intermediate',
            },
            {
              english: 'Contributor',
              italian: 'Collaboratore / Contributor',
              pronunciation: '/k\u0259n\u02C8tr\u026Abj\u028At\u0259r/',
              phonetic: 'con-TRI-biu-ter',
              example:
                'The project has over 200 active contributors from around the world. = Il progetto ha oltre 200 collaboratori attivi da tutto il mondo.',
              context: 'collaboration',
              difficulty: 'beginner',
            },
            {
              english: 'Upstream',
              italian: 'Sorgente / Upstream',
              pronunciation: '/\u02CC\u028Cp\u02C8stri\u02D0m/',
              phonetic: 'ap-STRIIM',
              example:
                'Add the original project as the upstream remote so you can pull new commits and keep your fork in sync. = Aggiungi il progetto originale come remoto upstream così puoi tirare i nuovi commit e mantenere il tuo fork sincronizzato.',
              context: 'collaboration',
              difficulty: 'advanced',
              note: 'Indica il repository originale da cui si \u00E8 fatto il fork.',
              command:
                'git remote add upstream git@github.com:acme/main-repo.git && git fetch upstream',
              task: 'Aggiungi il repository originale come remoto upstream e scarica subito i suoi riferimenti.',
            },
            {
              english: 'Issue',
              italian: 'Problema / Segnalazione / Issue',
              pronunciation: '/\u02C8\u026A\u0283u\u02D0/',
              phonetic: 'I-sciu',
              example:
                'Before writing code, check if someone already opened an issue for the same bug. = Prima di scrivere codice, controlla se qualcuno ha già aperto una issue per lo stesso bug.',
              context: 'collaboration',
              difficulty: 'beginner',
              note: 'Segnalazione di un bug o richiesta di una funzionalit\u00E0.',
              command:
                'gh issue create --title "bug: login fails with empty password" --label bug,priority:high',
              task: 'Apri una nuova issue su GitHub con titolo descrittivo ed etichette di bug e priorita alta.',
            },
            {
              english: 'Milestone',
              italian: 'Pietra miliare / Milestone',
              pronunciation: '/\u02C8ma\u026Alsto\u028An/',
              phonetic: 'MAIL-stoun',
              example: `Group related issues under a milestone like 'v2.0' so contributors can see exactly which tasks block the next release. = Raggruppa le issue collegate sotto una milestone come 'v2.0' così i contributori possono vedere esattamente quali task bloccano il prossimo rilascio.`,
              context: 'management',
              difficulty: 'intermediate',
              command: 'gh issue list --milestone "v2.0" --state open',
              task: 'Elenca tutte le issue aperte associate alla milestone v2.0 per vedere cosa blocca il rilascio.',
            },
            {
              english: 'Wiki',
              italian: 'Documentazione Wiki',
              pronunciation: '/\u02C8w\u026Aki/',
              phonetic: 'UI-ki',
              example:
                'Keep architectural decisions on the project wiki rather than scattered chat messages, so newcomers can find context easily. = Tieni le decisioni architetturali sulla wiki del progetto invece che in messaggi chat sparsi, così i nuovi arrivati possono trovare il contesto facilmente.',
              context: 'documentation',
              difficulty: 'beginner',
            },
            {
              english: 'Webhook',
              italian: 'Aggancio Web / Webhook',
              pronunciation: '/\u02C8webh\u028Ak/',
              phonetic: 'UEB-huk',
              example:
                'Use a webhook to trigger external actions. = Usa un webhook per innescare azioni esterne.',
              context: 'advanced',
              difficulty: 'advanced',
              note: 'Sistema per inviare notifiche automatiche tra applicazioni.',
            },
            {
              english: 'GitFlow',
              italian: 'Flusso Git / GitFlow',
              pronunciation: '/\u02C8\u0261\u026At flo\u028A/',
              phonetic: 'GIT flou',
              example:
                'Teams shipping versioned products often adopt GitFlow because its release and hotfix branches map cleanly onto formal release cycles. = I team che rilasciano prodotti versionati spesso adottano GitFlow perché i suoi branch di release e hotfix si mappano bene su cicli di rilascio formali.',
              context: 'workflow',
              difficulty: 'advanced',
              note: 'Modello organizzato per gestire rami e rilasci in team.',
            },
          ],
        },
        {
          id: 'dev_git_workflow',
          title: 'Workflow Git',
          description: 'Stash, tag, remote, upstream...',
          items: [
            {
              english: 'Cherry-pick',
              italian: 'Scelta selettiva / Cherry-pick',
              pronunciation: '/\u02C8t\u0283eri p\u026Ak/',
              phonetic: 'CER-ri pik',
              example:
                'We needed to cherry-pick only the security fix from develop into the release branch. = Dovevamo prendere selettivamente solo la correzione di sicurezza da develop nel branch di rilascio.',
              context: 'git',
              difficulty: 'advanced',
              note: 'Permette di prendere un singolo commit da un branch e applicarlo a un altro.',
              command: 'git cherry-pick -x a1b2c3d4',
              task: 'Applica selettivamente il commit a1b2c3d4 sul branch corrente aggiungendo una nota di provenienza.',
            },
            {
              english: 'Squash',
              italian: 'Schiacciare / Squash',
              pronunciation: '/skw\u0252\u0283/',
              phonetic: 'SKUOSC',
              example:
                'Before merging, squash your ten small commits into a single clean one. = Prima di fare il merge, fondi i tuoi dieci piccoli commit in uno singolo e pulito.',
              context: 'git',
              difficulty: 'advanced',
              note: 'Pulisce la storia del branch unendo tanti piccoli commit in uno unico.',
              command:
                'git merge --squash feature/user-profile && git commit -m "feat(profile): add user profile page"',
              task: 'Unisci tutti i commit del branch feature/user-profile in un singolo commit con messaggio convenzionale.',
            },
            {
              english: 'Revert',
              italian: 'Annullare / Revert',
              pronunciation: '/r\u026A\u02C8v\u025C\u02D0rt/',
              phonetic: 're-VERT',
              example:
                "After the deploy broke production, we had to revert the last commit immediately. = Dopo che il deploy ha rotto la produzione, abbiamo dovuto annullare l'ultimo commit immediatamente.",
              context: 'git',
              difficulty: 'intermediate',
              note: 'Crea un nuovo commit che annulla le modifiche di uno precedente (sicuro per la storia condivisa).',
              command: 'git revert --no-edit HEAD',
              task: `Annulla l'ultimo commit creando un nuovo commit di revert senza aprire l'editor del messaggio.`,
            },
            {
              english: 'Reset (Soft/Hard)',
              italian: 'Resettare',
              pronunciation: '/\u02CCri\u02D0\u02C8set/',
              phonetic: 'rii-SET',
              example:
                'Use git reset --soft to undo a commit while keeping your changes staged, ready to be reorganised into different commits. = Usa git reset --soft per annullare un commit mantenendo le modifiche in stage, pronte per essere riorganizzate in commit diversi.',
              context: 'git',
              difficulty: 'advanced',
              note: 'Sposta il branch a un commit precedente. "Hard" cancella tutto, "Soft" mantiene i file modificati.',
              command: 'git reset --soft HEAD~1',
              task: `Sposta l'HEAD indietro di un commit mantenendo le modifiche nell'area di stage pronte per essere ricommittate.`,
            },
            {
              english: 'Reflog',
              italian: 'Registro di Riferimento / Reflog',
              pronunciation: '/\u02C8refl\u0252\u0261/',
              phonetic: 'REF-log',
              example: `After an accidental hard reset, the reflog lets you find the lost commit hash and bring the work back from oblivion. = Dopo un reset hard accidentale, il reflog ti permette di trovare l'hash del commit perso e riportare il lavoro dall'oblio.`,
              context: 'git',
              difficulty: 'expert',
              note: 'Il "salvagente" di Git: registra ogni spostamento dell\'HEAD.',
              command: 'git reflog --date=iso | head -20',
              task: 'Consulta il reflog con date in formato ISO per ritrovare commit persi dopo un reset accidentale.',
            },
            {
              english: 'Patch',
              italian: 'Pezzaconto / Patch',
              pronunciation: '/p\u00E6t\u0283/',
              phonetic: 'PAC',
              example:
                'The Linux kernel community still reviews contributions submitted as patch files via email. = La comunità del kernel Linux rivede ancora i contributi inviati come file di patch via email.',
              context: 'git',
              difficulty: 'intermediate',
              command: 'git format-patch -1 HEAD --output-directory ./patches',
              task: `Genera un file di patch per l'ultimo commit salvandolo nella cartella ./patches per la condivisione via email.`,
            },
            {
              english: 'Bisect',
              italian: 'Bisecare / Bisect',
              pronunciation: '/ba\u026A\u02C8sekt/',
              phonetic: 'bai-SEKT',
              example:
                'Git bisect halves the search space at each step, so even a thousand-commit history can be searched in roughly ten iterations. = Git bisect dimezza lo spazio di ricerca a ogni passo, così anche una storia di mille commit può essere cercata in circa dieci iterazioni.',
              context: 'git',
              difficulty: 'expert',
              note: 'Trova il commit che ha introdotto un bug tramite ricerca binaria.',
              command: 'git bisect start HEAD v1.0.0',
              task: 'Avvia una sessione di bisect dichiarando HEAD come commit difettoso e v1.0.0 come commit sicuramente funzionante.',
            },
            {
              english: 'Submodule',
              italian: 'Sottomodulo',
              pronunciation: '/\u02CCs\u028Cbm\u0252dju\u02D0l/',
              phonetic: 'SAB-mo-diul',
              example:
                'We use a Git submodule to embed the shared library without duplicating its code. = Usiamo un sottomodulo Git per includere la libreria condivisa senza duplicarne il codice.',
              context: 'git',
              difficulty: 'advanced',
              command: 'git submodule add git@github.com:acme/shared-utils.git libs/shared',
              task: 'Aggiungi la libreria condivisa come sottomodulo Git nella cartella libs/shared.',
            },
            {
              english: 'Gitignore',
              italian: 'File Gitignore',
              pronunciation: '/\u02C8\u0261\u026At \u026A\u0261\u02C8n\u0254\u02D0r/',
              phonetic: 'GIT ig-NOR',
              example:
                'List build artifacts, secrets, and local config files in .gitignore so they never end up in a shared repository by accident. = Elenca artefatti di build, segreti e file di configurazione locali nel .gitignore così non finiscono mai in una repository condivisa per sbaglio.',
              context: 'git',
              difficulty: 'beginner',
              note: 'Specifica quali file e cartelle Git deve ignorare.',
            },
            {
              english: 'Origin',
              italian: 'Origine / Origin',
              pronunciation: '/\u02C8\u0252r\u026Ad\u0292\u026An/',
              phonetic: 'O-ri-gin',
              example:
                'When you clone a repo, Git automatically names the source remote "origin". = Quando cloni una repo, Git nomina automaticamente il remoto sorgente "origin".',
              context: 'git',
              difficulty: 'beginner',
              command: 'git remote set-url origin git@github.com:acme/payments-api.git',
              task: `Aggiorna l'URL del remoto origin per puntare al nuovo repository SSH dell'organizzazione.`,
            },
          ],
        },
      ],
    },
    2: {
      name: 'Sviluppo Web / Web Development',
      description: 'Fondamenti dello sviluppo web',
      lessons: [
        {
          id: 'dev_web_front',
          title: 'Frontend',
          description: 'HTML, CSS, JavaScript, DOM...',
          items: [
            {
              english: 'HTML (HyperText Markup Language)',
              italian: 'Linguaggio a marcatori (HTML)',
              pronunciation: '/\u02CCe\u026At\u0283 ti\u02D0 em \u02C8el/',
              phonetic: 'eic-tii-em-EL',
              example:
                'Semantic HTML tags like header, nav, and article help screen readers and search engines understand page structure. = I tag HTML semantici come header, nav e article aiutano gli screen reader e i motori di ricerca a capire la struttura della pagina.',
              context: 'frontend',
              difficulty: 'beginner',
              code: `<article>
  <header>
    <h1>Articolo</h1>
  </header>
  <p>Contenuto principale dell'articolo.</p>
</article>`,
              task: 'Scrivi un frammento HTML semantico che usa article, header e h1 per descrivere un articolo con titolo e corpo.',
            },
            {
              english: 'CSS (Cascading Style Sheets)',
              italian: 'Fogli di stile (CSS)',
              pronunciation: '/\u02CCsi\u02D0 es \u02C8es/',
              phonetic: 'sii-es-ES',
              example:
                'Modern CSS supports flexbox and grid layouts, eliminating the float-based hacks that web developers used a decade ago. = Il CSS moderno supporta i layout flexbox e grid, eliminando gli hack basati su float che gli sviluppatori web usavano un decennio fa.',
              context: 'frontend',
              difficulty: 'beginner',
              code: `.card {
  display: flex;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}`,
              task: 'Definisci una regola CSS per la classe card che usa flexbox, padding e un bordo arrotondato.',
            },
            {
              english: 'JavaScript',
              italian: 'Linguaggio di programmazione web (JavaScript)',
              pronunciation: '/\u02C8d\u0292\u0251\u02D0v\u0259skr\u026Apt/',
              phonetic: 'GIA-va-skript',
              example:
                'Modern web apps rely on JavaScript for dynamic content, form validation, and real-time updates. = Le web app moderne si affidano a JavaScript per contenuti dinamici, validazione form e aggiornamenti in tempo reale.',
              context: 'frontend',
              difficulty: 'beginner',
              code: `const items = [1, 2, 3, 4];
const total = items.reduce((sum, n) => sum + n, 0);
console.log(total);`,
              task: 'Scrivi uno snippet JavaScript che usa reduce per sommare i numeri di un array e ne stampa il totale.',
            },
            {
              english: 'DOM (Document Object Model)',
              italian: 'Modello a oggetti del documento (DOM)',
              pronunciation: '/\u02CCdi\u02D0 o\u028A \u02CCem/',
              phonetic: 'dii-ou-EM',
              example:
                'Direct DOM manipulation is slow at scale, which is why modern frameworks like React use a virtual DOM to batch updates. = La manipolazione diretta del DOM è lenta su larga scala, ed è per questo che i framework moderni come React usano un DOM virtuale per raggruppare gli aggiornamenti.',
              context: 'frontend',
              difficulty: 'intermediate',
              note: 'La rappresentazione strutturata della pagina web accessibile dal codice.',
              code: `const btn = document.querySelector('#save');
btn.textContent = 'Salvato';
btn.classList.add('disabled');`,
              task: 'Seleziona il pulsante con id save dal DOM, cambia il suo testo e aggiungi la classe disabled.',
            },
            {
              english: 'Selector',
              italian: 'Selettore',
              pronunciation: '/s\u026A\u02C8lekt\u0259r/',
              phonetic: 'si-LEK-ter',
              example:
                'A CSS selector targets specific elements. = Un selettore CSS punta a elementi specifici.',
              context: 'frontend',
              difficulty: 'beginner',
              code: `const rows = document.querySelectorAll('table.users tr[data-active="true"]');
rows.forEach((row) => row.classList.add('highlight'));`,
              task: 'Usa un selettore CSS composto per recuperare tutte le righe attive della tabella users ed evidenziale via DOM.',
            },
            {
              english: 'HTML tag',
              italian: 'tag HTML',
              pronunciation: '/t\u00E6\u0261/',
              phonetic: 'TAG',
              example:
                'Always close every HTML tag explicitly, since unclosed elements can cause the browser to render the layout in surprising ways. = Chiudi sempre ogni tag HTML esplicitamente, dato che gli elementi non chiusi possono far renderizzare il layout al browser in modi sorprendenti.',
              context: 'frontend',
              difficulty: 'beginner',
              note: 'Distinto dai tag Git, che etichettano commit specifici per i rilasci.',
              code: `<nav>
  <a href="/home">Home</a>
  <a href="/about">Chi siamo</a>
</nav>`,
              task: 'Usa il tag HTML nav per racchiudere la navigazione principale del sito con due link verso home e about.',
            },
            {
              english: 'Attribute',
              italian: 'Attributo',
              pronunciation: '/\u02C8\u00E6tr\u026Abju\u02D0t/',
              phonetic: 'A-tri-biut',
              example:
                'Use the data-* attribute prefix to attach custom values to HTML elements without breaking the standard validators. = Usa il prefisso data-* per gli attributi per allegare valori personalizzati agli elementi HTML senza rompere i validatori standard.',
              context: 'frontend',
              difficulty: 'beginner',
              code: `<button type="submit" data-action="save" aria-label="Salva modulo">
  Salva
</button>`,
              task: `Aggiungi al pulsante l'attributo type, un attributo data-action personalizzato e un aria-label per l'accessibilita.`,
            },
            {
              english: 'Event Listener',
              italian: 'Ascoltatore di Eventi',
              pronunciation: '/\u026A\u02C8vent \u02C8l\u026As\u0259n\u0259r/',
              phonetic: 'i-VENT LI-se-ner',
              example:
                'Remember to remove every event listener you add inside a React component, otherwise memory leaks accumulate on each remount. = Ricorda di rimuovere ogni event listener che aggiungi dentro un componente React, altrimenti i memory leak si accumulano a ogni remount.',
              context: 'frontend',
              difficulty: 'intermediate',
              code: `const form = document.querySelector('#login');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('invio bloccato');
});`,
              task: 'Registra un event listener sul submit del form login che blocca il comportamento di default e logga un messaggio.',
            },
            {
              english: 'Responsive Design',
              italian: 'Design Reattivo / Responsive',
              pronunciation: '/r\u026A\u02C8sp\u0252ns\u026Av d\u026A\u02C8za\u026An/',
              phonetic: 're-SPON-siv di-ZAIN',
              example:
                'With responsive design, a single layout adapts to phones, tablets, and desktops using media queries. = Con il design responsive, un singolo layout si adatta a telefoni, tablet e desktop usando le media query.',
              context: 'design',
              difficulty: 'intermediate',
              code: `@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
  .content {
    width: 100%;
  }
}`,
              task: 'Scrivi una media query CSS che nasconde la sidebar e fa occupare al contenuto tutta la larghezza sotto i 768px.',
            },
            {
              english: 'Single Page Application (SPA)',
              italian: 'Applicazione a Pagina Singola',
              pronunciation:
                '/\u02C8s\u026A\u014B\u0259l pe\u026Ad\u0292 \u02CC\u00E6pl\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'SIN-gol peig ap-pli-KEI-scen',
              example: `Building a single page application gives users a fluid experience but requires careful handling of routing, SEO, and initial load time. = Costruire una single page application dà agli utenti un'esperienza fluida ma richiede una gestione attenta di routing, SEO e tempo di caricamento iniziale.`,
              context: 'frontend',
              difficulty: 'advanced',
              note: 'App web che caricano una sola pagina HTML e aggiornano il contenuto dinamicamente.',
            },
          ],
        },
        {
          id: 'dev_web_back',
          title: 'Backend',
          description: 'Server, API, database, endpoint...',
          items: [
            {
              english: 'Server',
              italian: 'Servente / Server',
              pronunciation: '/\u02C8s\u025C\u02D0rv\u0259r/',
              phonetic: 'SER-ver',
              example:
                'A production web server typically runs behind a reverse proxy that handles TLS termination and request rate limiting. = Un web server di produzione tipicamente gira dietro un reverse proxy che gestisce la terminazione TLS e il rate limiting delle richieste.',
              context: 'backend',
              difficulty: 'beginner',
              code: `import express from 'express';
const app = express();
app.get('/health', (req, res) => res.send('ok'));
app.listen(3000, () => console.log('server in ascolto su 3000'));`,
              task: 'Avvia un server Express che espone una rotta /health e resta in ascolto sulla porta 3000.',
            },
            {
              english: 'Client',
              italian: 'Cliente / Client',
              pronunciation: '/\u02C8kla\u026A\u0259nt/',
              phonetic: 'CLAI-ent',
              example:
                "In web architecture, the client sends requests to the server and displays the response to the user. = Nell'architettura web, il client invia richieste al server e mostra la risposta all'utente.",
              context: 'foundations',
              difficulty: 'beginner',
              code: `const res = await fetch('https://api.example.com/users');
const users = await res.json();
console.log(users);`,
              task: `Scrivi un client JavaScript che invoca via fetch l'endpoint /users e stampa la risposta JSON.`,
            },
            {
              english: 'Database',
              italian: 'Base di Dati / Database',
              pronunciation: '/\u02C8de\u026At\u0259be\u026As/',
              phonetic: 'DEI-ta-beis',
              example:
                'Choose a relational database when transactions and complex joins matter, and a NoSQL one for flexible schemas and horizontal scale. = Scegli un database relazionale quando contano transazioni e join complessi, e uno NoSQL per schemi flessibili e scalabilità orizzontale.',
              context: 'backend',
              difficulty: 'beginner',
            },
            {
              english: 'Middleware',
              italian: 'Intermediario / Middleware',
              pronunciation: '/\u02C8m\u026Adlwe\u0259r/',
              phonetic: 'MID-del-uer',
              example:
                'In Express.js, middleware functions can log requests, check tokens, and parse JSON bodies. = In Express.js, le funzioni middleware possono registrare le richieste, controllare i token e parsare i body JSON.',
              context: 'backend',
              difficulty: 'intermediate',
              note: 'Codice che gira tra la richiesta e la risposta finale.',
              code: `function logger(req, res, next) {
  console.log(\`\${req.method} \${req.url}\`);
  next();
}
app.use(logger);`,
              task: 'Definisci un middleware Express che logga metodo e URL di ogni richiesta prima di passare al prossimo handler.',
            },
            {
              english: 'Authentication',
              italian: 'Autenticazione',
              pronunciation: '/\u0254\u02D0\u02CC\u03B8ent\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'o-then-ti-KEI-scen',
              example:
                "Multi-factor authentication requires both a password and a one-time code from your phone. = L'autenticazione a più fattori richiede sia una password che un codice monouso dal telefono.",
              context: 'security',
              difficulty: 'beginner',
              code: `app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.hash))) {
    return res.status(401).json({ error: 'credenziali non valide' });
  }
  res.json({ token: jwt.sign({ id: user.id }, process.env.JWT_SECRET) });
});`,
              task: `Implementa l'endpoint /login che verifica email e password con bcrypt e restituisce un JWT in caso di successo.`,
            },
            {
              english: 'Authorization',
              italian: 'Autorizzazione',
              pronunciation: '/\u02CC\u0254\u02D0\u03B8\u0259ra\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'o-tho-rai-ZEI-scen',
              example: `After login, the backend reads the user's role and grants authorization to access only the endpoints allowed by that role. = Dopo il login, il backend legge il ruolo dell'utente e concede l'autorizzazione ad accedere solo agli endpoint permessi da quel ruolo.`,
              context: 'security',
              difficulty: 'intermediate',
              note: "Decidere cosa l'utente pu\u00F2 fare (una volta autenticato).",
              code: `function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'accesso negato' });
    }
    next();
  };
}
app.delete('/users/:id', requireRole('admin'), deleteUser);`,
              task: 'Scrivi un middleware di autorizzazione requireRole che blocca con 403 le richieste fatte da utenti senza il ruolo richiesto.',
            },
            {
              english: 'Routing',
              italian: 'Instradamento / Routing',
              pronunciation: '/\u02C8ru\u02D0t\u026A\u014B/ or /\u02C8ra\u028At\u026A\u014B/',
              phonetic: 'RUU-ting',
              example:
                'Define routing rules that map each HTTP path to a specific controller function, keeping URL design separate from business logic. = Definisci regole di routing che mappano ogni path HTTP a una specifica funzione del controller, tenendo il design degli URL separato dalla logica di business.',
              context: 'backend',
              difficulty: 'intermediate',
              code: `import { Router } from 'express';
const router = Router();
router.get('/orders', listOrders);
router.post('/orders', createOrder);
router.get('/orders/:id', getOrder);
app.use('/api', router);`,
              task: 'Configura un Router Express che mappa GET, POST e GET con parametro :id sotto il prefisso /api/orders.',
            },
            {
              english: 'Environment Variable',
              italian: "Variabile d'Ambiente",
              pronunciation: '/\u026An\u02C8va\u026Ar\u0259nm\u0259nt \u02C8veri\u0259bl/',
              phonetic: 'in-VAI-ron-ment VE-ri-ebol',
              example:
                "Store the DB password in an env variable. = Salva la password del DB in una variabile d'ambiente.",
              context: 'backend',
              difficulty: 'intermediate',
              code: `import 'dotenv/config';
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error('DATABASE_URL mancante');`,
              task: `Carica le variabili d'ambiente da .env e leggi DATABASE_URL da process.env, fallendo subito se manca.`,
            },
            {
              english: 'Server-side Rendering (SSR)',
              italian: 'Rendering Lato Server',
              pronunciation:
                '/\u02C8s\u025C\u02D0rv\u0259rsa\u026Ad \u02C8rend\u0259r\u026A\u014B/',
              phonetic: 'SER-ver-said REN-der-ing',
              example:
                "With server-side rendering, the HTML is generated on the server so search engines can index it immediately. = Con il rendering lato server, l'HTML viene generato sul server cos\u00EC i motori di ricerca possono indicizzarlo subito.",
              context: 'backend',
              difficulty: 'advanced',
              note: "Il server genera l'HTML finale invece di farlo fare al browser.",
              code: `export async function getServerSideProps(context) {
  const res = await fetch(\`https://api.example.com/posts/\${context.params.id}\`);
  const post = await res.json();
  return { props: { post } };
}`,
              task: 'Definisci getServerSideProps di Next.js per caricare un post via API a ogni richiesta e renderizzarlo lato server.',
            },
            {
              english: 'Microservices',
              italian: 'Microservizi',
              pronunciation: '/\u02CCma\u026Akro\u028A\u02C8s\u025C\u02D0rv\u026As\u026Az/',
              phonetic: 'MAI-cro-ser-vi-siz',
              example:
                "A microservices architecture scales well. = Un'architettura a microservizi scala bene.",
              context: 'architecture',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dev_web_api',
          title: 'API',
          description: 'REST, request, response, JSON...',
          items: [
            {
              english: 'API (Application Programming Interface)',
              italian: 'Interfaccia Programmazione App (API)',
              pronunciation: '/\u02CCe\u026A pi\u02D0 \u02C8a\u026A/',
              phonetic: 'ei-pi-AI',
              example:
                'Public APIs let third-party developers build integrations without needing access to the underlying source code or database. = Le API pubbliche permettono agli sviluppatori di terze parti di costruire integrazioni senza dover accedere al codice sorgente o al database sottostante.',
              context: 'backend',
              difficulty: 'beginner',
            },
            {
              english: 'REST (Representational State Transfer)',
              italian: 'Architettura web standard (REST)',
              pronunciation: '/rest/',
              phonetic: 'REST',
              example: `A REST API exposes resources through standard HTTP verbs, which makes it easy to cache, test, and consume from any language. = Un'API REST espone le risorse attraverso i verbi HTTP standard, il che la rende facile da cachare, testare e consumare da qualsiasi linguaggio.`,
              context: 'backend',
              difficulty: 'intermediate',
              note: 'REST è un loanword: si lascia in inglese.',
            },
            {
              english: 'HTTP Method (GET, POST, ...)',
              italian: 'Metodo HTTP',
              pronunciation: '/\u02CCe\u026At\u0283ti\u02D0ti\u02D0pi\u02D0 \u02C8me\u03B8\u0259d/',
              phonetic: 'eic-tii-tii-pii ME-thod',
              example:
                'Choose the right HTTP method for each operation: GET for reads, POST for creates, PUT for replacements, and DELETE to remove. = Scegli il metodo HTTP giusto per ogni operazione: GET per le letture, POST per le creazioni, PUT per le sostituzioni e DELETE per rimuovere.',
              context: 'backend',
              difficulty: 'intermediate',
              note: 'Esempi: GET (leggere), POST (creare), PUT/PATCH (modificare), DELETE (cancellare).',
              command: `curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d '{"name":"Anna"}'`,
              code: `app.post('/users', async (req, res) => {
  const created = await db.users.insert(req.body);
  res.status(201).json(created);
});`,
              task: `Invia una richiesta POST con body JSON all'endpoint /users via curl e definisci la rotta Express che la gestisce.`,
            },
            {
              english: 'Endpoint',
              italian: 'Punto Finale / Endpoint',
              pronunciation: '/\u02C8endp\u0254\u026Ant/',
              phonetic: 'END-point',
              example:
                'Document every endpoint with its URL, expected payload, and possible status codes so consumers can integrate without guessing. = Documenta ogni endpoint con il suo URL, payload atteso e possibili codici di stato così i consumatori possono integrare senza tirare a indovinare.',
              context: 'backend',
              difficulty: 'beginner',
              note: "L'indirizzo specifico (URL) di una funzione API.",
              code: `app.get('/users/:id', async (req, res) => {
  const user = await db.users.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'utente non trovato' });
  res.json(user);
});`,
              task: `Definisci l'endpoint GET /users/:id che cerca l'utente per id e restituisce 404 se non esiste.`,
            },
            {
              english: 'Request',
              italian: 'Richiesta',
              pronunciation: '/r\u026A\u02C8kwest/',
              phonetic: 're-KUEST',
              example:
                'Inspect a failing HTTP request in the network tab to verify the headers, body, and target URL match what the backend expects. = Ispeziona una richiesta HTTP fallita nella scheda network per verificare che header, body e URL di destinazione corrispondano a ciò che il backend si aspetta.',
              context: 'foundations',
              difficulty: 'beginner',
              command:
                'curl -X GET https://api.example.com/orders -H "Authorization: Bearer $TOKEN"',
              code: `const response = await fetch('/api/orders', {
  method: 'GET',
  headers: { Authorization: \`Bearer \${token}\` },
});`,
              task: 'Costruisci una richiesta HTTP autenticata verso /api/orders sia da terminale con curl sia da JavaScript con fetch.',
            },
            {
              english: 'Response',
              italian: 'Risposta',
              pronunciation: '/r\u026A\u02C8sp\u0252ns/',
              phonetic: 're-SPONS',
              example:
                'A well-designed API response includes a status code, a body in JSON, and headers that describe caching policy and content type. = Una risposta API ben progettata include un codice di stato, un body in JSON e header che descrivono la politica di caching e il tipo di contenuto.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `res.status(200)
  .set('Cache-Control', 'public, max-age=60')
  .json({ data: orders });`,
              task: 'Costruisci una risposta HTTP che ritorna status 200, imposta un header Cache-Control e serializza il body in JSON.',
            },
            {
              english: 'Status Code (200, 404, ...)',
              italian: 'Codice di Stato',
              pronunciation: '/\u02C8ste\u026At\u0259s ko\u028Ad/',
              phonetic: 'STEI-tas koud',
              example:
                'Returning the correct HTTP status code lets clients tell apart a missing resource (404) from a server failure (500) without parsing the body. = Restituire il codice di stato HTTP corretto permette ai client di distinguere una risorsa mancante (404) da un fallimento del server (500) senza parsare il body.',
              context: 'backend',
              difficulty: 'intermediate',
              code: `if (!user) return res.status(404).json({ error: 'not found' });
if (!user.canAccess(resource)) return res.status(403).json({ error: 'forbidden' });
return res.status(200).json(resource);`,
              task: `Restituisci il codice di stato HTTP corretto in tre rami: 404 quando manca la risorsa, 403 se l'utente non ha accesso, 200 in caso di successo.`,
            },
            {
              english: 'JSON (JavaScript Object Notation)',
              italian: 'Formato dati (JSON)',
              pronunciation: '/\u02C8d\u0292e\u026As\u0259n/',
              phonetic: 'GEI-son',
              example: `Most modern APIs exchange data in JSON because it is human-readable, language-agnostic, and natively supported by browsers. = La maggior parte delle API moderne scambia dati in JSON perché è leggibile dall'uomo, indipendente dal linguaggio e supportato nativamente dai browser.`,
              context: 'data',
              difficulty: 'beginner',
              note: 'Il formato pi\u00F9 usato oggi per lo scambio di dati sul web.',
              code: `const payload = { id: 42, name: 'Anna', roles: ['admin', 'editor'] };
const body = JSON.stringify(payload);
const parsed = JSON.parse(body);`,
              task: 'Serializza un oggetto JavaScript in stringa JSON e poi riparsalo, verificando il round-trip dei dati.',
            },
            {
              english: 'Payload',
              italian: 'Carico Utile / Payload',
              pronunciation: '/\u02C8pe\u026Alo\u028Ad/',
              phonetic: 'PEI-loud',
              example:
                'Validate the request payload against a schema before processing it, otherwise malformed input can crash downstream services. = Valida il payload della richiesta contro uno schema prima di elaborarlo, altrimenti input malformati possono far crashare i servizi a valle.',
              context: 'backend',
              difficulty: 'intermediate',
              note: 'Il contenuto informativo (dati) inviato in una richiesta o risposta.',
              command: `curl -X PUT https://api.example.com/users/42 -H "Content-Type: application/json" -d '{"name":"Anna","email":"anna@example.com"}'`,
              code: `app.put('/users/:id', async (req, res) => {
  const payload = req.body;
  const updated = await db.users.update(req.params.id, payload);
  res.json(updated);
});`,
              task: `Invia un payload JSON via PUT a /users/:id con curl e leggi il body nella rotta Express per aggiornare l'utente.`,
            },
            {
              english: 'GraphQL',
              italian: 'Linguaggio query API (GraphQL)',
              pronunciation: '/\u02CC\u0261r\u00E6fkju\u02D0\u02C8el/',
              phonetic: 'GRAF-kiu-el',
              example:
                'Unlike REST, GraphQL lets the client specify exactly which fields it needs in a single query. = A differenza del REST, GraphQL permette al client di specificare esattamente quali campi servono in una singola query.',
              context: 'backend',
              difficulty: 'advanced',
              note: 'Alternativa moderna al REST, creata da Facebook.',
              code: `query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    posts {
      title
    }
  }
}`,
              task: 'Scrivi una query GraphQL che richiede un utente per id e restituisce solo i campi id, name e i titoli dei suoi post.',
            },
          ],
        },
        {
          id: 'dev_web_tools',
          title: 'Strumenti Web / Web Tools',
          description: 'Browser, DevTools, npm, webpack...',
          items: [
            {
              english: 'Browser',
              italian: 'Navigatore / Browser',
              pronunciation: '/\u02C8bra\u028Az\u0259r/',
              phonetic: 'BRAU-ser',
              example:
                'Test your site in multiple browsers because rendering engines like Blink, Gecko, and WebKit handle some CSS features differently. = Testa il tuo sito su più browser perché i motori di rendering come Blink, Gecko e WebKit gestiscono alcune funzionalità CSS in modo diverso.',
              context: 'frontend',
              difficulty: 'beginner',
            },
            {
              english: 'DevTools (Inspector)',
              italian: 'Strumenti Sviluppatore / Ispettore',
              pronunciation: '/\u02C8dev tu\u02D0lz/',
              phonetic: 'DEV tuulz',
              example:
                'Open DevTools and use the network tab to find slow API calls or the performance tab to spot long JavaScript tasks. = Apri i DevTools e usa la scheda network per trovare chiamate API lente o la scheda performance per individuare task JavaScript lunghi.',
              context: 'tools',
              difficulty: 'beginner',
            },
            {
              english: 'NPM (Node Package Manager)',
              italian: 'Gestore Pacchetti Node',
              pronunciation: '/\u02CCen pi\u02D0 \u02CCem/',
              phonetic: 'en-pi-EM',
              example:
                'Run npm audit periodically because npm packages can introduce vulnerabilities long after they were first installed in the project. = Esegui npm audit periodicamente perché i pacchetti npm possono introdurre vulnerabilità molto dopo essere stati installati per la prima volta nel progetto.',
              context: 'tools',
              difficulty: 'intermediate',
              command: 'npm install --save-dev jest @types/jest',
              task: 'Installa jest e i suoi tipi TypeScript come dipendenze di sviluppo del progetto.',
            },
            {
              english: 'Bundler (Vite / Webpack)',
              italian: 'Impacchettatore / Bundler',
              pronunciation: '/\u02C8b\u028Cndl\u0259r/',
              phonetic: 'BAN-dler',
              example:
                'A modern bundler like Vite uses native ES modules in development for near-instant reloads, then produces an optimised build for production. = Un bundler moderno come Vite usa moduli ES nativi in sviluppo per reload quasi istantanei, poi produce una build ottimizzata per la produzione.',
              context: 'tools',
              difficulty: 'intermediate',
              command: 'npx vite build --mode production',
              task: 'Esegui il bundler Vite in modalita production per generare gli asset ottimizzati da pubblicare in deploy.',
            },
            {
              english: 'Postman',
              italian: 'Client API (Postman)',
              pronunciation: '/\u02C8po\u028Astm\u0259n/',
              phonetic: 'POST-man',
              example:
                'Save common requests in a Postman collection so teammates can reproduce the same scenarios without writing curl commands by hand. = Salva le richieste comuni in una collezione Postman così i colleghi possono riprodurre gli stessi scenari senza scrivere comandi curl a mano.',
              context: 'tools',
              difficulty: 'beginner',
            },
            {
              english: 'Cookies',
              italian: 'Cookie / Biscotti Digitali',
              pronunciation: '/\u02C8k\u028Akiz/',
              phonetic: 'KU-kiz',
              example:
                'Mark authentication cookies as HttpOnly and Secure so they are not exposed to JavaScript and travel only over HTTPS. = Marca i cookie di autenticazione come HttpOnly e Secure così non vengono esposti a JavaScript e viaggiano solo su HTTPS.',
              context: 'frontend',
              difficulty: 'intermediate',
              note: "Piccoli file salvati dal browser per ricordare info dell'utente.",
              code: `res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24,
});`,
              task: 'Imposta un cookie di sessione lato server con i flag HttpOnly, Secure e SameSite strict e una durata di 24 ore.',
            },
            {
              english: 'Local Storage',
              italian: 'Memoria Locale / Local Storage',
              pronunciation: '/\u02C8lo\u028Akl \u02C8st\u0254\u02D0r\u026Ad\u0292/',
              phonetic: 'LOU-kal STO-rig',
              example: `Use local storage to remember user UI preferences across visits, but never store tokens or sensitive data there. = Usa il local storage per ricordare le preferenze UI dell'utente tra le visite, ma non salvare mai token o dati sensibili lì.`,
              context: 'frontend',
              difficulty: 'intermediate',
              note: 'Permette di salvare dati nel browser in modo persistente (pi\u00F9 capiente dei cookie).',
              code: `localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme') ?? 'light';
document.documentElement.dataset.theme = theme;`,
              task: `Salva la preferenza del tema nel local storage e rileggila al caricamento per applicarla all'elemento root del documento.`,
            },
            {
              english: 'CORS (Cross-Origin Resource Sharing)',
              italian: 'Condivisione Risorse tra Origini',
              pronunciation: '/k\u0254\u02D0rz/',
              phonetic: 'KORZ',
              example: `Configure CORS headers on the API to allow only trusted front-end origins, blocking unauthorised sites from calling protected endpoints. = Configura gli header CORS sull'API per permettere solo le origin del front-end fidate, bloccando i siti non autorizzati dal chiamare endpoint protetti.`,
              context: 'security',
              difficulty: 'advanced',
              note: 'Meccanismo di sicurezza che limita quali siti possono chiamare la tua API.',
              code: `import cors from 'cors';
app.use(cors({
  origin: ['https://app.example.com'],
  credentials: true,
}));`,
              task: 'Configura il middleware cors su Express per consentire le richieste solo da app.example.com e con credenziali.',
            },
            {
              english: 'HTTPS (Secure)',
              italian: 'Connessione sicura (HTTPS)',
              pronunciation: '/\u02CCe\u026At\u0283ti\u02D0ti\u02D0pi\u02D0 \u02CCes/',
              phonetic: 'eic-tii-tii-pii-ES',
              example:
                'Modern browsers warn users when a site does not use HTTPS, which makes TLS effectively mandatory for any public web service. = I browser moderni avvertono gli utenti quando un sito non usa HTTPS, il che rende il TLS di fatto obbligatorio per qualsiasi servizio web pubblico.',
              context: 'security',
              difficulty: 'beginner',
              command:
                'curl -v https://api.example.com/health --resolve api.example.com:443:127.0.0.1',
              task: 'Esegui una chiamata HTTPS verbosa verso /health forzando la risoluzione DNS per validare il certificato TLS in staging.',
            },
            {
              english: 'Lighthouse',
              italian: 'Audit web (Lighthouse)',
              pronunciation: '/\u02C8la\u026At ha\u028As/',
              phonetic: 'LAIT-haus',
              example:
                'Run Lighthouse against your production URL to get a scored report covering performance, accessibility, SEO, and best practices. = Esegui Lighthouse sul tuo URL di produzione per ottenere un report con punteggi che copre performance, accessibilità, SEO e best practice.',
              context: 'tools',
              difficulty: 'intermediate',
              command:
                'npx lighthouse https://www.example.com --output=html --output-path=./report.html',
              task: 'Esegui Lighthouse contro la home di produzione e salva il report HTML con i punteggi di performance, SEO e accessibilita.',
            },
          ],
        },
      ],
    },
    3: {
      name: 'Database',
      description: 'Basi di dati relazionali e non',
      lessons: [
        {
          id: 'dev_db_sql',
          title: 'SQL',
          description: 'Table, query, SELECT, JOIN...',
          items: [
            {
              english: 'SQL (Structured Query Language)',
              italian: 'Linguaggio Query Strutturato (SQL)',
              pronunciation: '/\u02CCes kju\u02D0 \u02C8el/ or /\u02C8si\u02D0kw\u0259l/',
              phonetic: 'ES-KIU-EL',
              example:
                "Learn SQL to communicate with databases. = Impara l'SQL per comunicare con i database.",
              context: 'database',
              difficulty: 'beginner',
            },
            {
              english: 'Table',
              italian: 'Tabella',
              pronunciation: '/\u02C8te\u026Abl/',
              phonetic: 'TEI-bol',
              example:
                'Design each table around a single entity such as users or orders, and use foreign keys to model the relationships between them. = Progetta ogni tabella attorno a una singola entità come users o orders, e usa le chiavi esterne per modellare le relazioni tra di esse.',
              context: 'database',
              difficulty: 'beginner',
              code: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`,
              task: `Crea la tabella users con una chiave primaria seriale, un'email unica obbligatoria e un timestamp di creazione di default.`,
            },
            {
              english: 'Query',
              italian: 'Interrogazione / Query',
              pronunciation: '/\u02C8kw\u026A\u0259ri/',
              phonetic: 'KUI-ri',
              example: `Prefer parameterised queries over string concatenation, otherwise user input can be interpreted as SQL and open the door to injection. = Preferisci query parametrizzate alla concatenazione di stringhe, altrimenti l'input dell'utente può essere interpretato come SQL e aprire la porta all'injection.`,
              context: 'database',
              difficulty: 'beginner',
              command:
                'psql -h localhost -U admin -d shop -c "SELECT id, name FROM products WHERE price > 100;"',
              code: `SELECT id, name
FROM products
WHERE price > 100
ORDER BY name;`,
              task: 'Scrivi una query parametrizzabile che recupera id e nome dei prodotti con prezzo superiore a 100 ed eseguila via psql.',
            },
            {
              english: 'Row (Record)',
              italian: 'Riga / Record',
              pronunciation: '/ro\u028A/ /\u02C8rek\u0254\u02D0rd/',
              phonetic: 'ROU RE-cord',
              example: `Each row in the users table stores one person's data, with the primary key guaranteeing that no two rows describe the same user. = Ogni riga nella tabella users memorizza i dati di una persona, con la chiave primaria che garantisce che due righe non descrivano lo stesso utente.`,
              context: 'database',
              difficulty: 'beginner',
              code: `INSERT INTO users (email, name)
VALUES ('anna@example.com', 'Anna')
RETURNING id, created_at;`,
              task: 'Inserisci una nuova riga nella tabella users e usa RETURNING per recuperare id e timestamp generati dal database.',
            },
            {
              english: 'Column (Field)',
              italian: 'Colonna / Campo',
              pronunciation: '/\u02C8k\u0252l\u0259m/ /fi\u02D0ld/',
              phonetic: 'CO-lom FIILD',
              example:
                'The "email" column stores email addresses. = La colonna "email" salva gli indirizzi email.',
              context: 'database',
              difficulty: 'beginner',
              code: `ALTER TABLE users
ADD COLUMN last_login_at TIMESTAMP;`,
              task: 'Aggiungi una nuova colonna last_login_at di tipo TIMESTAMP alla tabella users senza valore di default.',
            },
            {
              english: 'SELECT Statement',
              italian: 'Istruzione SELECT',
              pronunciation: '/s\u026A\u02C8lekt \u02C8ste\u026Atm\u0259nt/',
              phonetic: 'si-LEKT STEIT-ment',
              example:
                'Avoid SELECT * in production code: list the columns explicitly so adding new fields to the table does not break clients. = Evita SELECT * nel codice di produzione: elenca le colonne esplicitamente così aggiungere nuovi campi alla tabella non rompe i client.',
              context: 'sql',
              difficulty: 'beginner',
              code: `SELECT id, email, created_at
FROM users
WHERE active = true
ORDER BY created_at DESC
LIMIT 20;`,
              task: `Scrivi un'istruzione SELECT che elenca le 20 email piu recenti degli utenti attivi, ordinate per data di creazione.`,
            },
            {
              english: 'WHERE Clause',
              italian: 'Clausola WHERE',
              pronunciation: '/we\u0259r kl\u0254\u02D0z/',
              phonetic: 'UER CLOS',
              example:
                'A WHERE clause on an indexed column lets the database skip most rows, turning a sequential scan into a fast lookup. = Una clausola WHERE su una colonna indicizzata permette al database di saltare la maggior parte delle righe, trasformando una scansione sequenziale in una ricerca veloce.',
              context: 'sql',
              difficulty: 'beginner',
              code: `SELECT id, total
FROM orders
WHERE status = 'paid'
  AND created_at >= NOW() - INTERVAL '7 days';`,
              task: 'Filtra con una clausola WHERE gli ordini pagati negli ultimi sette giorni, combinando piu condizioni con AND.',
            },
            {
              english: 'JOIN',
              italian: 'Unione / JOIN',
              pronunciation: '/d\u0292\u0254\u026An/',
              phonetic: 'GIOIN',
              example:
                'Use an INNER JOIN to fetch only rows that match in both tables, and a LEFT JOIN to keep all rows from the first one. = Usa un INNER JOIN per recuperare solo le righe che corrispondono in entrambe le tabelle, e un LEFT JOIN per mantenere tutte le righe della prima.',
              context: 'sql',
              difficulty: 'intermediate',
              note: 'Esempi: INNER JOIN, LEFT JOIN, RIGHT JOIN.',
              code: `SELECT u.name, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5;`,
              task: 'Componi un LEFT JOIN tra users e orders, raggruppa per utente e tieni solo quelli con piu di cinque ordini.',
            },
            {
              english: 'Data Manipulation Language (DML)',
              italian: 'Linguaggio Manipolazione Dati',
              pronunciation: '/\u02CCdi\u02D0 em \u02C8el/',
              phonetic: 'dii-em-EL',
              example:
                'INSERT, UPDATE, and DELETE are DML commands. = INSERT, UPDATE e DELETE sono comandi DML.',
              context: 'sql',
              difficulty: 'intermediate',
              code: `INSERT INTO products (sku, price) VALUES ('SKU-1', 19.90);
UPDATE products SET price = price * 1.1 WHERE sku = 'SKU-1';
DELETE FROM products WHERE sku = 'SKU-1';`,
              task: 'Esegui in sequenza le tre operazioni DML principali (INSERT, UPDATE, DELETE) sulla tabella products.',
            },
            {
              english: 'DBMS (Database Management System)',
              italian: 'Sistema Gestione DB (DBMS)',
              pronunciation: '/\u02CCdi\u02D0 bi\u02D0 em \u02C8es/',
              phonetic: 'dii-bii-em-ES',
              example:
                'A DBMS handles concurrent access, permissions, and backups so developers can focus on queries. = Un DBMS gestisce accessi concorrenti, permessi e backup cos\u00EC gli sviluppatori possono concentrarsi sulle query.',
              context: 'database',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'dev_db_design',
          title: 'Design Database / DB Design',
          description: 'Schema, normalization, index, key...',
          items: [
            {
              english: 'Schema',
              italian: 'Struttura dei dati (schema)',
              pronunciation: '/\u02C8ski\u02D0m\u0259/',
              phonetic: 'SKII-ma',
              example:
                'The database schema defines the structure. = Lo schema del database definisce la struttura.',
              context: 'database',
              difficulty: 'intermediate',
              command:
                'psql -h localhost -U admin -d production -c "CREATE SCHEMA reporting AUTHORIZATION analytics;"',
              code: `CREATE SCHEMA reporting AUTHORIZATION analytics;
CREATE TABLE reporting.daily_sales (
  day DATE PRIMARY KEY,
  total NUMERIC(12,2) NOT NULL
);`,
              task: 'Crea uno schema reporting separato di proprieta del ruolo analytics e definiscici dentro la tabella daily_sales.',
            },
            {
              english: 'Normalization',
              italian: 'Normalizzazione',
              pronunciation: '/\u02CCn\u0254\u02D0rm\u0259la\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'nor-ma-lai-ZEI-scen',
              example:
                'Database normalization reduces redundancy. = La normalizzazione del database riduce la ridondanza.',
              context: 'design',
              difficulty: 'advanced',
              note: 'Processo di organizzazione dei dati in tabelle (es. 1NF, 2NF, 3NF).',
            },
            {
              english: 'Index',
              italian: 'Indice',
              pronunciation: '/\u02C8\u026Andeks/',
              phonetic: 'IN-deks',
              example:
                'Add an index on columns used in WHERE or JOIN clauses, but remember each extra index slows down writes and consumes disk space. = Aggiungi un indice sulle colonne usate in WHERE o JOIN, ma ricorda che ogni indice extra rallenta le scritture e consuma spazio su disco.',
              context: 'performance',
              difficulty: 'intermediate',
              code: `CREATE INDEX idx_orders_user_created
ON orders (user_id, created_at DESC);`,
              task: 'Crea un indice composito su orders per accelerare le query che filtrano per user_id e ordinano per created_at.',
            },
            {
              english: 'Primary Key',
              italian: 'Chiave Primaria',
              pronunciation: '/\u02C8pra\u026Am\u0259ri ki\u02D0/',
              phonetic: 'PRAI-ma-ri kii',
              example:
                'Every table should have a primary key to uniquely identify each row and prevent duplicates. = Ogni tabella dovrebbe avere una chiave primaria per identificare univocamente ogni riga e prevenire duplicati.',
              context: 'database',
              difficulty: 'beginner',
              note: 'Identificatore unico per ogni riga di una tabella.',
              code: `CREATE TABLE invoices (
  id BIGSERIAL PRIMARY KEY,
  number VARCHAR(20) NOT NULL
);`,
              task: 'Definisci la tabella invoices con una chiave primaria BIGSERIAL auto-incrementante e una colonna number obbligatoria.',
            },
            {
              english: 'Foreign Key',
              italian: 'Chiave Esterna',
              pronunciation: '/\u02C8f\u0252r\u026An ki\u02D0/',
              phonetic: 'FO-rin kii',
              example:
                'A foreign key links two tables together. = Una chiave esterna collega due tabelle tra loro.',
              context: 'database',
              difficulty: 'intermediate',
              code: `CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
);`,
              task: 'Aggiungi una chiave esterna user_id sulla tabella orders che referenzia users.id con cancellazione a cascata.',
            },
            {
              english: 'Relationship',
              italian: 'Relazione',
              pronunciation: '/r\u026A\u02C8le\u026A\u0283\u0259n\u0283\u026Ap/',
              phonetic: 're-LEI-scion-scip',
              example:
                'A one-to-many relationship between authors and books is modelled by adding an author_id column to the books table. = Una relazione uno-a-molti tra autori e libri viene modellata aggiungendo una colonna author_id nella tabella books.',
              context: 'design',
              difficulty: 'intermediate',
              code: `CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL
);
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author_id INT REFERENCES authors (id)
);`,
              task: 'Modella una relazione uno-a-molti tra authors e books aggiungendo author_id come chiave esterna sulla tabella books.',
            },
            {
              english: 'Entity-Relationship Diagram (ERD)',
              italian: 'Diagramma Entit\u00E0-Relazione',
              pronunciation:
                '/\u02C8ent\u0259ti r\u026A\u02C8le\u026A\u0283\u0259n\u0283\u026Ap \u02C8da\u026A\u0259\u0261r\u00E6m/',
              phonetic: 'EN-ti-ti re-LEI-scion-scip DAIE-gram',
              example:
                'Sketch an entity-relationship diagram before writing CREATE TABLE statements, so the team agrees on cardinalities and ownership upfront. = Disegna un diagramma entità-relazione prima di scrivere le istruzioni CREATE TABLE, così il team concorda sulle cardinalità e sulla proprietà in anticipo.',
              context: 'design',
              difficulty: 'intermediate',
            },
            {
              english: 'Data Integrity',
              italian: 'Integrit\u00E0 dei Dati',
              pronunciation: '/\u02C8de\u026At\u0259 \u026An\u02C8te\u0261r\u0259ti/',
              phonetic: 'DEI-ta in-TE-gri-ti',
              example: `Constraints, foreign keys, and transactions together preserve data integrity, even when multiple processes write concurrently. = Vincoli, chiavi esterne e transazioni insieme preservano l'integrità dei dati, anche quando processi multipli scrivono contemporaneamente.`,
              context: 'database',
              difficulty: 'intermediate',
            },
            {
              english: 'Constraint',
              italian: 'Vincolo',
              pronunciation: '/k\u0259n\u02C8stre\u026Ant/',
              phonetic: 'con-STREINT',
              example:
                'Adding a UNIQUE constraint on the email column prevents duplicate accounts in the database. = Aggiungere un vincolo UNIQUE sulla colonna email previene account duplicati nel database.',
              context: 'sql',
              difficulty: 'intermediate',
              code: `ALTER TABLE users
ADD CONSTRAINT users_email_unique UNIQUE (email);
ALTER TABLE users
ADD CONSTRAINT users_age_check CHECK (age >= 18);`,
              task: `Aggiungi alla tabella users un vincolo UNIQUE sull'email e un CHECK che impone almeno 18 anni di eta.`,
            },
            {
              english: 'Stored Procedure',
              italian: 'Procedura Memorizzata',
              pronunciation: '/st\u0254\u02D0rd pr\u0259\u02C8si\u02D0d\u0292\u0259r/',
              phonetic: 'STORD pro-SII-giur',
              example:
                'Business logic can be put in a stored procedure. = La logica di business pu\u00F2 essere messa in una stored procedure.',
              context: 'advanced',
              difficulty: 'advanced',
              code: `CREATE OR REPLACE PROCEDURE archive_old_orders(cutoff DATE)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO orders_archive SELECT * FROM orders WHERE created_at < cutoff;
  DELETE FROM orders WHERE created_at < cutoff;
END;
$$;`,
              task: 'Definisci una stored procedure PL/pgSQL che archivia gli ordini piu vecchi della data passata come parametro.',
            },
          ],
        },
        {
          id: 'dev_db_nosql',
          title: 'NoSQL',
          description: 'Document, collection, MongoDB...',
          items: [
            {
              english: 'NoSQL (Not Only SQL)',
              italian: 'DB non relazionale (NoSQL)',
              pronunciation: '/\u02CCno\u028A \u02CCes kju\u02D0 \u02C8el/',
              phonetic: 'NOU-ES-KIU-EL',
              example:
                'NoSQL databases are flexible and scalable. = I database NoSQL sono flessibili e scalabili.',
              context: 'database',
              difficulty: 'beginner',
            },
            {
              english: 'Document Store',
              italian: 'Archivio Documentale',
              pronunciation: '/\u02C8d\u0252kj\u028Am\u0259nt st\u0254\u02D0r/',
              phonetic: 'DO-kiu-ment stor',
              example:
                'In a document store, each record is a self-contained JSON-like object with flexible fields. = In un archivio documentale, ogni record \u00E8 un oggetto simile a JSON con campi flessibili.',
              context: 'nosql',
              difficulty: 'intermediate',
              code: `db.users.insertOne({
  email: 'anna@example.com',
  profile: { name: 'Anna', city: 'Milano' },
  roles: ['admin', 'editor'],
  created_at: new Date()
});`,
              task: 'Inserisci in un archivio documentale un singolo documento utente con campi annidati e un array di ruoli.',
            },
            {
              english: 'Key-Value Store',
              italian: 'Archivio Chiave-Valore',
              pronunciation: '/ki\u02D0 \u02C8v\u00E6lju\u02D0 st\u0254\u02D0r/',
              phonetic: 'KII-VE-liu stor',
              example:
                'A key-value store maps simple keys to values, making lookups extremely fast for caching and sessions. = Un archivio chiave-valore mappa chiavi semplici a valori, rendendo le ricerche estremamente veloci per cache e sessioni.',
              context: 'nosql',
              difficulty: 'intermediate',
              command: `redis-cli SET session:abc123 '{"user_id":42}' EX 3600`,
              code: `await redis.set('session:abc123', JSON.stringify({ userId: 42 }), 'EX', 3600);
const raw = await redis.get('session:abc123');`,
              task: `Salva nella key-value store Redis una sessione con TTL di un'ora e poi rileggila per ricostruire l'utente.`,
            },
            {
              english: 'Graph Database',
              italian: 'Database a Grafi',
              pronunciation: '/\u0261r\u00E6f \u02C8de\u026At\u0259be\u026As/',
              phonetic: 'GRAF DEI-ta-beis',
              example:
                'Social networks use a graph database to model connections between users efficiently. = I social network usano un database a grafi per modellare le connessioni tra utenti in modo efficiente.',
              context: 'nosql',
              difficulty: 'advanced',
            },
            {
              english: 'Collection',
              italian: 'Collezione',
              pronunciation: '/k\u0259\u02C8lek\u0283\u0259n/',
              phonetic: 'col-LEK-scion',
              example:
                'In MongoDB, you insert documents into a collection the way you insert rows into a SQL table. = In MongoDB, inserisci documenti in una collezione come inseriresti righe in una tabella SQL.',
              context: 'nosql',
              difficulty: 'beginner',
              command: `mongosh "mongodb://localhost:27017/myapp" --eval "db.createCollection('orders')"`,
              code: `db.orders.insertOne({ user_id: 42, total: 99.9, status: 'paid' });`,
              task: 'Crea la collezione orders su MongoDB da shell e inserisci al suo interno un primo documento di ordine pagato.',
            },
            {
              english: 'Document',
              italian: 'Documento',
              pronunciation: '/\u02C8d\u0252kj\u028Am\u0259nt/',
              phonetic: 'DO-kiu-ment',
              example:
                'Each document in a NoSQL database can have a different structure, unlike rows in a relational table. = Ogni documento in un database NoSQL può avere una struttura diversa, a differenza delle righe in una tabella relazionale.',
              context: 'nosql',
              difficulty: 'beginner',
              code: `db.users.find({ active: true, role: 'admin' })
  .sort({ created_at: -1 })
  .limit(10);`,
              task: 'Recupera dalla collezione users i 10 documenti piu recenti dove active e true e role e admin.',
            },
            {
              english: 'Scalability (Horizontal)',
              italian: 'Scalabilit\u00E0 Orizzontale',
              pronunciation: '/\u02CCske\u026Al\u0259\u02C8b\u026Al\u0259ti/',
              phonetic: 'skei-la-BI-li-ti',
              example:
                'NoSQL stores were designed for horizontal scalability, letting you add commodity nodes instead of paying for ever-bigger servers. = I database NoSQL sono stati progettati per la scalabilità orizzontale, permettendoti di aggiungere nodi commodity invece di pagare per server sempre più grandi.',
              context: 'architecture',
              difficulty: 'advanced',
              note: 'Aggiungere pi\u00F9 server invece di potenziare quello esistente.',
            },
            {
              english: 'Schema-less',
              italian: 'Senza Schema / Flessibile',
              pronunciation: '/\u02C8ski\u02D0m\u0259les/',
              phonetic: 'SKII-ma-les',
              example:
                'A schema-less database lets you add new fields to documents without altering any table definition. = Un database senza schema ti permette di aggiungere nuovi campi ai documenti senza alterare la definizione della tabella.',
              context: 'nosql',
              difficulty: 'intermediate',
              code: `db.products.insertMany([
  { name: 'Sedia', price: 49 },
  { name: 'Tavolo', price: 199, dimensions: { w: 80, h: 75, d: 80 } },
  { name: 'Lampada', price: 25, tags: ['design', 'led'] }
]);`,
              task: 'Inserisci nella collezione products tre documenti con strutture diverse per dimostrare la natura schema-less del database.',
            },
            {
              english: 'Eventually Consistent',
              italian: 'Consistenza Finale',
              pronunciation: '/\u026A\u02C8vent\u0283u\u0259li k\u0259n\u02C8s\u026Ast\u0259nt/',
              phonetic: 'i-VEN-ciu-li con-SIS-tent',
              example:
                'Many distributed databases are eventually consistent. = Molti database distribuiti hanno una consistenza finale.',
              context: 'nosql',
              difficulty: 'advanced',
              note: "I dati diventano uguali su tutti i nodi dopo un po' di tempo, non istantaneamente.",
            },
            {
              english: 'BASE (vs ACID)',
              italian: 'Modello NoSQL (BASE)',
              pronunciation: '/be\u026As/',
              phonetic: 'BEIS',
              example:
                'NoSQL follows the BASE consistency model. = Il NoSQL segue il modello di consistenza BASE.',
              context: 'nosql',
              difficulty: 'expert',
              note: 'Basically Available, Soft state, Eventual consistency.',
            },
          ],
        },
        {
          id: 'dev_db_ops',
          title: 'Operazioni DB / DB Operations',
          description: 'Transaction, migration, ORM, backup...',
          items: [
            {
              english: 'Transaction',
              italian: 'Transazione',
              pronunciation: '/tr\u00E6n\u02C8z\u00E6k\u0283\u0259n/',
              phonetic: 'tran-SAK-scion',
              example:
                "A bank transfer uses a transaction so the debit and credit either both succeed or both roll back. = Un bonifico usa una transazione cos\u00EC l'addebito e l'accredito o riescono entrambi o vengono entrambi annullati.",
              context: 'database',
              difficulty: 'intermediate',
              code: `BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
              task: 'Avvolgi un trasferimento di 100 tra due conti in una transazione SQL con BEGIN, le due UPDATE e COMMIT finale.',
            },
            {
              english: 'ACID',
              italian: 'Propriet\u00E0 transazioni (ACID)',
              pronunciation: '/\u02C8\u00E6s\u026Ad/',
              phonetic: 'A-sid',
              example:
                'The four ACID properties -- Atomicity, Consistency, Isolation, Durability -- guarantee reliable transactions. = Le quattro propriet\u00E0 ACID -- Atomicit\u00E0, Consistenza, Isolamento, Durabilit\u00E0 -- garantiscono transazioni affidabili.',
              context: 'database',
              difficulty: 'advanced',
              note: 'Atomicity, Consistency, Isolation, Durability.',
            },
            {
              english: 'Migration',
              italian: 'Migrazione',
              pronunciation: '/ma\u026A\u02C8\u0261re\u026A\u0283\u0259n/',
              phonetic: 'mai-GREI-scion',
              example:
                'Every database migration should be reversible, so a deployment gone wrong can be rolled back without manual SQL surgery. = Ogni migrazione del database dovrebbe essere reversibile, così un deploy andato male può essere annullato senza chirurgia SQL manuale.',
              context: 'backend',
              difficulty: 'intermediate',
              note: 'Codice che applica cambiamenti strutturali al database in modo controllato.',
              command: 'npx knex migrate:latest --env production',
              code: `export async function up(knex) {
  await knex.schema.createTable('posts', (t) => {
    t.increments('id');
    t.string('title').notNullable();
    t.timestamps(true, true);
  });
}
export async function down(knex) {
  await knex.schema.dropTable('posts');
}`,
              task: 'Scrivi una migration Knex reversibile che crea la tabella posts ed eseguila in produzione con migrate:latest.',
            },
            {
              english: 'ORM (Object-Relational Mapping)',
              italian: 'Mappatura oggetti-relazionale (ORM)',
              pronunciation: '/\u02CCo\u028A \u02CC\u0251\u02D0r \u02CCem/',
              phonetic: 'ou-ar-EM',
              example:
                'An ORM lets you use objects to interact with the DB. = Un ORM ti permette di usare oggetti per interagire con il DB.',
              context: 'backend',
              difficulty: 'intermediate',
              note: 'Esempi: Hibernate (Java), Entity Framework (C#), SQLAlchemy (Python).',
              code: `const user = await prisma.user.findUnique({
  where: { email: 'anna@example.com' },
  include: { orders: true },
});`,
              task: 'Usa Prisma come ORM per recuperare un utente per email caricando in eager loading anche i suoi ordini.',
            },
            {
              english: 'Backup',
              italian: 'Copia di sicurezza (backup)',
              pronunciation: '/\u02C8b\u00E6k\u028Cp/',
              phonetic: 'BAK-ap',
              example:
                'Always perform regular database backups. = Esegui sempre backup regolari del database.',
              context: 'management',
              difficulty: 'beginner',
              command:
                'pg_dump -h localhost -U admin -F c -f /backups/prod-$(date +%Y%m%d).dump production',
              task: 'Esegui un backup compresso del database production con pg_dump nominandolo con la data corrente.',
            },
            {
              english: 'Replication',
              italian: 'Replicazione',
              pronunciation: '/\u02CCrepl\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 're-pli-KEI-scion',
              example:
                'Database replication improves availability. = La replicazione del database migliora la disponibilit\u00E0.',
              context: 'architecture',
              difficulty: 'advanced',
              note: 'Copiare i dati su pi\u00F9 server sincronizzati.',
              command:
                'pg_basebackup -h primary.example.com -U replicator -D /var/lib/postgresql/replica -X stream -P',
              task: 'Inizializza una replica streaming PostgreSQL clonando i dati dal nodo primario con pg_basebackup.',
            },
            {
              english: 'Sharding',
              italian: 'Frammentazione (sharding)',
              pronunciation: '/\u02C8\u0283\u0251\u02D0rd\u026A\u014B/',
              phonetic: 'SCAR-ding',
              example:
                'When a single database server can no longer handle the load, sharding distributes data across several machines. = Quando un singolo server di database non riesce pi\u00F9 a gestire il carico, lo sharding distribuisce i dati su pi\u00F9 macchine.',
              context: 'architecture',
              difficulty: 'expert',
              note: 'Partizionamento orizzontale dei dati per gestire carichi enormi.',
            },
            {
              english: 'Deadlock',
              italian: 'Stallo / Deadlock',
              pronunciation: '/\u02C8dedl\u0252k/',
              phonetic: 'DED-lok',
              example:
                'A deadlock occurs when two processes wait for each other. = Un deadlock avviene quando due processi si aspettano a vicenda.',
              context: 'errors',
              difficulty: 'advanced',
            },
            {
              english: 'Execution Plan',
              italian: 'Piano di Esecuzione',
              pronunciation: '/\u02CCeks\u026A\u02C8kju\u02D0\u0283\u0259n pl\u00E6n/',
              phonetic: 'ek-se-KIU-scion plan',
              example:
                'Analyze the execution plan to optimize the query. = Analizza il piano di esecuzione per ottimizzare la query.',
              context: 'performance',
              difficulty: 'expert',
              command:
                'psql -d shop -c "EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42 ORDER BY created_at DESC LIMIT 10;"',
              code: `EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE user_id = 42
ORDER BY created_at DESC
LIMIT 10;`,
              task: 'Stampa il piano di esecuzione reale di una query sugli ordini di un utente per individuare scansioni sequenziali da ottimizzare.',
            },
            {
              english: 'Connection Pool',
              italian: 'Pool di Connessioni',
              pronunciation: '/k\u0259\u02C8nek\u0283\u0259n pu\u02D0l/',
              phonetic: 'co-NEK-scion puul',
              example:
                'A connection pool reuses existing DB connections. = Un connection pool riutilizza le connessioni al DB esistenti.',
              context: 'performance',
              difficulty: 'advanced',
              code: `import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
});
const { rows } = await pool.query('SELECT NOW()');`,
              task: 'Configura un connection pool PostgreSQL con un massimo di 20 connessioni e un idle timeout di 30 secondi.',
            },
          ],
        },
      ],
    },
    4: {
      name: 'Architettura / Architecture',
      description: 'Pattern architetturali e design del software',
      lessons: [
        {
          id: 'dev_arch_basics',
          title: 'Architettura Base / Basic Architecture',
          description: 'Monolith, microservices, layer...',
          items: [
            {
              english: 'Software Architecture',
              italian: 'Architettura del Software',
              pronunciation:
                '/\u02C8s\u0252ftwe\u0259r \u02C8\u0251\u02D0rk\u026Atekt\u0283\u0259r/',
              phonetic: 'SOFT-uer AR-ki-tek-ciur',
              example:
                'Good architecture makes the system maintainable. = Una buona architettura rende il sistema manutenibile.',
              context: 'architecture',
              difficulty: 'beginner',
            },
            {
              english: 'Monolith',
              italian: 'Monolito / Architettura Monolitica',
              pronunciation: '/\u02C8m\u0252n\u0259l\u026A\u03B8/',
              phonetic: 'MO-no-lith',
              example:
                "A monolith is an application built as a single unit. = Un monolito \u00E8 un'applicazione costruita come un'unit\u00E0 singola.",
              context: 'architecture',
              difficulty: 'intermediate',
            },
            {
              english: 'microservices architecture',
              italian: 'architettura a microservizi',
              pronunciation: '/\u02CCma\u026Akro\u028A\u02C8s\u025C\u02D0rv\u026As\u026Az/',
              phonetic: 'MAI-cro-ser-vi-siz',
              example: `Adopting a microservices architecture lets each team deploy independently, at the cost of distributed-system complexity. = Adottare un'architettura a microservizi permette a ogni team di fare il deploy in modo indipendente, al costo della complessità da sistema distribuito.`,
              context: 'architecture',
              difficulty: 'intermediate',
              note: `Distinto dal termine 'Microservices' usato come concetto generale nel backend (level 2).`,
            },
            {
              english: '3-Tier Architecture',
              italian: 'Architettura a 3 Livelli',
              pronunciation:
                '/\u03B8ri\u02D0 t\u026A\u0259r \u02C8\u0251\u02D0rk\u026Atekt\u0283\u0259r/',
              phonetic: 'THRI tier AR-ki-tek-ciur',
              example:
                "A 3-tier architecture has presentation, logic, and data layers. = Un'architettura a 3 livelli ha i layer di presentazione, logica e dati.",
              context: 'architecture',
              difficulty: 'intermediate',
            },
            {
              english: 'Layered Architecture',
              italian: 'Architettura a Strati',
              pronunciation: '/\u02C8le\u026A\u0259rd \u02C8\u0251\u02D0rk\u026Atekt\u0283\u0259r/',
              phonetic: 'LEI-erd AR-ki-tek-ciur',
              example:
                "In a layered architecture, each layer has a specific role. = In un'architettura a strati, ogni livello ha un ruolo specifico.",
              context: 'architecture',
              difficulty: 'intermediate',
            },
            {
              english: 'Client-Server',
              italian: 'Architettura richiedente-fornitore (client-server)',
              pronunciation: '/\u02C8kla\u026A\u0259nt \u02C8s\u025C\u02D0rv\u0259r/',
              phonetic: 'CLAI-ent SER-ver',
              example:
                "In a client-server architecture, the browser sends HTTP requests and the server returns HTML, JSON, or other data. = In un'architettura client-server, il browser invia richieste HTTP e il server restituisce HTML, JSON o altri dati.",
              context: 'architecture',
              difficulty: 'beginner',
            },
            {
              english: 'Peer-to-Peer (P2P)',
              italian: 'Paritetica (peer-to-peer)',
              pronunciation: '/\u02CCp\u026A\u0259r t\u0259 \u02C8p\u026A\u0259r/',
              phonetic: 'PIER tu PIER',
              example:
                'Peer-to-peer file sharing networks distribute load across users, so the system gets faster as more participants join. = Le reti peer-to-peer di condivisione file distribuiscono il carico tra gli utenti, così il sistema diventa più veloce man mano che più partecipanti si uniscono.',
              context: 'architecture',
              difficulty: 'intermediate',
            },
            {
              english: 'Component',
              italian: 'Componente',
              pronunciation: '/k\u0259m\u02C8po\u028An\u0259nt/',
              phonetic: 'com-POU-nent',
              example:
                'Each component in the system has a single responsibility and communicates through well-defined interfaces. = Ogni componente nel sistema ha una singola responsabilit\u00E0 e comunica attraverso interfacce ben definite.',
              context: 'architecture',
              difficulty: 'beginner',
              code: `interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}`,
              task: `Definisci un componente Button con una responsabilita' chiara, props tipizzate e un handler onClick passato dall'esterno.`,
            },
            {
              english: 'Module',
              italian: 'Modulo',
              pronunciation: '/\u02C8m\u0252dju\u02D0l/',
              phonetic: 'MO-diul',
              example: `Split the application into modules with clear public interfaces, so each one can be developed and tested in isolation. = Dividi l'applicazione in moduli con interfacce pubbliche chiare, così ciascuno può essere sviluppato e testato in isolamento.`,
              context: 'architecture',
              difficulty: 'beginner',
              code: `// src/payments/index.ts
export { processPayment } from './processPayment';
export { refund } from './refund';
export type { PaymentResult } from './types';
// dettagli interni come 'validateCard' restano privati al modulo`,
              task: 'Esponi solo le funzioni pubbliche del modulo payments tramite il file index e mantieni privati i dettagli implementativi.',
            },
            {
              english: 'Interface (Architectural)',
              italian: 'Interfaccia',
              pronunciation: '/\u02C8\u026Ant\u0259rfe\u026As/',
              phonetic: 'IN-ter-feis',
              example:
                "The interface defines how components interact. = L'interfaccia definisce come i componenti interagiscono.",
              context: 'architecture',
              difficulty: 'intermediate',
              code: `interface UserService {
  findById(id: string): Promise<User | null>;
  create(data: NewUser): Promise<User>;
  delete(id: string): Promise<void>;
}`,
              task: `Definisci un'interfaccia UserService che dichiari il contratto pubblico, lasciando libere le implementazioni concrete (in-memory, SQL, HTTP).`,
            },
          ],
        },
        {
          id: 'dev_arch_patterns',
          title: 'Pattern Architetturali / Arch Patterns',
          description: 'MVC, CQRS, event-driven...',
          items: [
            {
              english: 'MVC (Model-View-Controller)',
              italian: 'Modello-Vista-Controllore (MVC)',
              pronunciation: '/\u02CCem vi\u02D0 \u02C8si\u02D0/',
              phonetic: 'em-vii-SII',
              example:
                "MVC separates data from the user interface. = L'MVC separa i dati dall'interfaccia utente.",
              context: 'architecture-patterns',
              difficulty: 'intermediate',
              code: `// Model
class UserModel {
  async getAll() { return db.query('SELECT * FROM users'); }
}

// Controller
class UserController {
  constructor(private model: UserModel, private view: UserView) {}
  async index() {
    const users = await this.model.getAll();
    return this.view.render(users);
  }
}`,
              task: 'Implementa il pattern MVC separando il model che parla col database, il controller che orchestra e la view che si occupa solo del rendering.',
            },
            {
              english: 'MVVM (Model-View-ViewModel)',
              italian: 'Modello-Vista-ModelloVista (MVVM)',
              pronunciation: '/\u02CCem vi\u02D0 vi\u02D0 \u02C8em/',
              phonetic: 'em-vii-vii-EM',
              example:
                'The MVVM pattern uses data binding to keep the view and the model in sync automatically. = Il pattern MVVM usa il data binding per mantenere la vista e il modello sincronizzati automaticamente.',
              context: 'architecture-patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Event-Driven Architecture',
              italian: 'Architettura Orientata agli Eventi',
              pronunciation:
                '/\u026A\u02C8vent \u02C8dr\u026Avn \u02C8\u0251\u02D0rk\u026Atekt\u0283\u0259r/',
              phonetic: 'i-VENT dri-ven AR-ki-tek-ciur',
              example:
                'Event-driven systems respond to state changes. = I sistemi event-driven rispondono ai cambi di stato.',
              context: 'architecture-patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Message Queue',
              italian: 'Coda di Messaggi',
              pronunciation: '/\u02C8mes\u026Ad\u0292 kju\u02D0/',
              phonetic: 'ME-sig KIU',
              example:
                "Use a message queue for asynchronous processing. = Usa una coda di messaggi per l'elaborazione asincrona.",
              context: 'architecture',
              difficulty: 'intermediate',
              note: 'Esempi: RabbitMQ, Apache Kafka.',
              code: `import { Queue } from 'bullmq';

const emailQueue = new Queue('emails', { connection: { host: 'redis', port: 6379 } });

await emailQueue.add('welcome', {
  to: 'alice@example.com',
  template: 'welcome',
});`,
              task: `Pubblica un job di invio email su una coda BullMQ in modo che il processo HTTP non debba aspettare l'invio sincrono.`,
            },
            {
              english: 'Pub/Sub (Publisher-Subscriber)',
              italian: 'Pubblica-sottoscrivi (pub/sub)',
              pronunciation: '/p\u028Cb s\u028Cb/',
              phonetic: 'PAB SAB',
              example:
                'The pub/sub pattern decouples components. = Il pattern pub/sub disaccoppia i componenti.',
              context: 'architecture-patterns',
              difficulty: 'advanced',
              code: `import { EventEmitter } from 'node:events';

const bus = new EventEmitter();

bus.on('user.registered', (user) => sendWelcomeEmail(user));
bus.on('user.registered', (user) => trackAnalytics(user));

bus.emit('user.registered', { id: '42', email: 'bob@example.com' });`,
              task: `Implementa il pattern pub/sub con un EventEmitter che pubblica l'evento user.registered e disaccoppia invio email e analytics.`,
            },
            {
              english: 'Service-Oriented Architecture (SOA)',
              italian: 'Architettura Orientata ai Servizi',
              pronunciation: '/\u02C8s\u025C\u02D0rv\u026As \u02CC\u0254\u02D0rien\u02C8te\u026Ad/',
              phonetic: 'SER-vis o-rien-ted AR-ki-tek-ciur',
              example:
                'SOA uses web services to integrate systems. = La SOA usa i web service per integrare i sistemi.',
              context: 'architecture-patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Serverless',
              italian: 'Senza server (serverless)',
              pronunciation: '/\u02C8s\u025C\u02D0rv\u0259rl\u0259s/',
              phonetic: 'SER-ver-les',
              example:
                "In serverless, the cloud provider manages the infrastructure. = Nel serverless, il cloud provider gestisce l'infrastruttura.",
              context: 'architecture-patterns',
              difficulty: 'intermediate',
              note: 'Esempi: AWS Lambda, Google Cloud Functions.',
            },
            {
              english: 'CQRS (Command Query Responsibility Segregation)',
              italian: 'Segregazione responsabilit\u00E0 (CQRS)',
              pronunciation: '/\u02CCsi\u02D0 kju\u02D0 \u02CC\u0251\u02D0r \u02C8es/',
              phonetic: 'sii-kiu-ar-ES',
              example:
                'CQRS separates read and write operations. = Il CQRS separa le operazioni di lettura e scrittura.',
              context: 'architecture-patterns',
              difficulty: 'expert',
            },
            {
              english: 'Event Sourcing',
              italian: 'Origine dagli eventi (event sourcing)',
              pronunciation: '/\u026A\u02C8vent \u02C8s\u0254\u02D0rs\u026A\u014B/',
              phonetic: 'i-VENT SOR-sing',
              example:
                "Instead of storing just the current state, event sourcing records every change as an immutable event. = Invece di salvare solo lo stato attuale, l'event sourcing registra ogni cambiamento come un evento immutabile.",
              context: 'architecture-patterns',
              difficulty: 'expert',
            },
            {
              english: 'Micro-Frontend',
              italian: 'Frontend modulare (micro-frontend)',
              pronunciation: '/\u02CCma\u026Akro\u028A \u02C8fr\u028Cntend/',
              phonetic: 'MAI-cro FRONT-end',
              example:
                'Adopting a micro-frontend approach lets each team ship its own UI piece independently, at the cost of a heavier integration layer. = Adottare un approccio micro-frontend permette a ogni team di rilasciare il proprio pezzo di UI indipendentemente, al costo di un layer di integrazione più pesante.',
              context: 'architecture-patterns',
              difficulty: 'expert',
            },
          ],
        },
        {
          id: 'dev_arch_api',
          title: 'API Architecture',
          description: 'API gateway, service mesh, GraphQL...',
          items: [
            {
              english: 'API Gateway',
              italian: 'API Gateway',
              pronunciation: '/\u02CCe\u026A pi\u02D0 \u02C8a\u026A \u02C8\u0261e\u026Atwe\u026A/',
              phonetic: 'ei-pi-ai GEIT-uei',
              example:
                "The API gateway routes requests to internal services. = L'API gateway instrada le richieste ai servizi interni.",
              context: 'architecture',
              difficulty: 'advanced',
              note: 'Il termine API Gateway si lascia in inglese; gestisce routing, auth e rate limiting davanti ai microservizi.',
            },
            {
              english: 'Service Mesh',
              italian: 'Maglia di servizi (service mesh)',
              pronunciation: '/\u02C8s\u025C\u02D0rv\u026As me\u0283/',
              phonetic: 'SER-vis MESC',
              example:
                'A service mesh handles traffic routing, retries, and mutual TLS between microservices transparently. = Una service mesh gestisce routing del traffico, retry e TLS reciproco tra microservizi in modo trasparente.',
              context: 'architecture',
              difficulty: 'expert',
              note: 'Gestisce la comunicazione tra microservizi (service-to-service).',
            },
            {
              english: 'Load Balancer',
              italian: 'Bilanciatore di Carico',
              pronunciation: '/lo\u028Ad \u02C8b\u00E6l\u0259ns\u0259r/',
              phonetic: 'LOUD BA-lan-ser',
              example:
                'A load balancer distributes traffic across servers. = Un bilanciatore di carico distribuisce il traffico su pi\u00F9 server.',
              context: 'architecture',
              difficulty: 'intermediate',
            },
            {
              english: 'Reverse Proxy',
              italian: 'Proxy Inverso',
              pronunciation: '/r\u026A\u02C8v\u025C\u02D0rs \u02C8pr\u0252ksi/',
              phonetic: 're-VERS PROK-si',
              example:
                'Putting a reverse proxy like Nginx in front of the app server lets you centralise TLS, compression, and request logging. = Mettere un reverse proxy come Nginx davanti al server applicativo ti permette di centralizzare TLS, compressione e logging delle richieste.',
              context: 'architecture',
              difficulty: 'intermediate',
            },
            {
              english: 'Stateless',
              italian: 'Senza Stato / Stateless',
              pronunciation: '/\u02C8ste\u026Atles/',
              phonetic: 'STEIT-les',
              example:
                'Designing endpoints to be stateless means any node can serve any request, which is the foundation of easy horizontal scaling. = Progettare endpoint stateless significa che qualsiasi nodo può servire qualsiasi richiesta, il che è la base di una facile scalabilità orizzontale.',
              context: 'architecture',
              difficulty: 'advanced',
              note: "Il server non salva nessuna informazione sull'utente tra una richiesta e l'altra.",
              code: `// Handler stateless: tutta l'identita' arriva nel JWT, niente sessione in memoria
function getProfile(req: Request, res: Response) {
  const userId = verifyJwt(req.headers.authorization).sub;
  return res.json(userRepo.findById(userId));
}`,
              task: `Scrivi un handler stateless che ricostruisce l'identita' utente da un JWT a ogni richiesta, senza appoggiarsi a sessioni server-side.`,
            },
            {
              english: 'Stateful',
              italian: 'Con Stato / Stateful',
              pronunciation: '/\u02C8ste\u026Atf\u028Al/',
              phonetic: 'STEIT-ful',
              example:
                'A stateful service remembers previous requests, which makes horizontal scaling harder. = Un servizio stateful ricorda le richieste precedenti, il che rende la scalabilit\u00E0 orizzontale pi\u00F9 difficile.',
              context: 'architecture',
              difficulty: 'advanced',
            },
            {
              english: 'HATEOAS',
              italian: 'REST evoluto (HATEOAS)',
              pronunciation: '/\u02C8he\u026Ati\u0259s/',
              phonetic: 'HEI-ti-os',
              example:
                "With HATEOAS, the API response includes links that tell the client what actions are available next. = Con HATEOAS, la risposta dell'API include link che dicono al client quali azioni sono disponibili dopo.",
              context: 'architecture',
              difficulty: 'expert',
              note: 'Hypermedia as the Engine of Application State.',
            },
            {
              english: 'GraphQL Federation',
              italian: 'Federazione GraphQL',
              pronunciation:
                '/\u02CC\u0261r\u00E6fkju\u02D0\u02C8el \u02CCfed\u0259\u02C8re\u026A\u0283\u0259n/',
              phonetic: 'GRAF-kiu-el fe-de-REI-scion',
              example:
                'Federation combines multiple GraphQL APIs into one. = La federazione combina pi\u00F9 API GraphQL in una sola.',
              context: 'architecture',
              difficulty: 'expert',
            },
            {
              english: 'gRPC',
              italian: 'RPC ad alte prestazioni (gRPC)',
              pronunciation: '/\u02CCd\u0292i\u02D0 \u02CC\u0251\u02D0r pi\u02D0 \u02C8si\u02D0/',
              phonetic: 'gii-ar-pii-SII',
              example:
                'Many internal microservices use gRPC instead of REST because its binary protocol is faster for high-throughput communication. = Molti microservizi interni usano gRPC al posto di REST perché il suo protocollo binario è più veloce per comunicazioni ad alto throughput.',
              context: 'architecture',
              difficulty: 'advanced',
              note: 'Framework RPC creato da Google, molto veloce.',
              code: `// user.proto
syntax = "proto3";

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
}

message GetUserRequest { string id = 1; }
message User { string id = 1; string email = 2; }`,
              task: `Definisci il contratto gRPC per il servizio UserService dichiarando l'RPC GetUser con il suo request e response in protobuf.`,
            },
            {
              english: 'Versioning Strategy',
              italian: 'Strategia di Versionamento',
              pronunciation:
                '/\u02C8v\u025C\u02D0r\u0292\u0259n\u026A\u014B \u02C8str\u00E6t\u0259d\u0292i/',
              phonetic: 'VER-scion-ing STRA-te-gi',
              example:
                'Define your API versioning strategy early. = Definisci presto la tua strategia di versionamento API.',
              context: 'management',
              difficulty: 'intermediate',
              note: 'Es: /v1/users o tramite header HTTP.',
            },
          ],
        },
        {
          id: 'dev_arch_ddd',
          title: 'Domain-Driven Design',
          description: 'Bounded context, aggregate, entity...',
          items: [
            {
              english: 'Domain-Driven Design (DDD)',
              italian: 'Progettazione Guidata dal Dominio (DDD)',
              pronunciation: '/do\u028A\u02C8me\u026An \u02C8dr\u026Avn d\u026A\u02C8za\u026An/',
              phonetic: 'do-MEIN dri-ven di-ZAIN',
              example:
                'Teams adopting domain-driven design model the software around business concepts like Order or Invoice, not around database tables. = I team che adottano il domain-driven design modellano il software attorno a concetti di business come Order o Invoice, non attorno alle tabelle del database.',
              context: 'architecture',
              difficulty: 'advanced',
            },
            {
              english: 'Bounded Context',
              italian: 'Contesto Delimitato',
              pronunciation: '/\u02C8ba\u028And\u026Ad \u02C8k\u0252ntekst/',
              phonetic: 'BAUN-ded CON-tekst',
              example:
                'A bounded context defines where a specific model applies. = Un bounded context definisce dove si applica un modello specifico.',
              context: 'ddd',
              difficulty: 'expert',
            },
            {
              english: 'Ubiquitous Language',
              italian: 'Linguaggio Ubiquo',
              pronunciation:
                '/ju\u02D0\u02C8b\u026Akw\u026At\u0259s \u02C8l\u00E6\u014B\u0261w\u026Ad\u0292/',
              phonetic: 'iu-BI-kui-tos LANG-guig',
              example:
                'Developers and experts should share a ubiquitous language. = Sviluppatori ed esperti dovrebbero condividere un linguaggio ubiquo.',
              context: 'ddd',
              difficulty: 'advanced',
              note: 'Usare gli stessi termini tecnici e di business in tutto il progetto.',
            },
            {
              english: 'Entity',
              italian: 'Entit\u00E0',
              pronunciation: '/\u02C8ent\u0259ti/',
              phonetic: 'EN-ti-ti',
              example:
                "An entity has a unique identity that persists over time. = Un'entit\u00E0 ha un'identit\u00E0 unica che persiste nel tempo.",
              context: 'ddd',
              difficulty: 'intermediate',
              code: `class User {
  constructor(
    public readonly id: string,
    private email: string,
  ) {}

  equals(other: User): boolean {
    return this.id === other.id;
  }

  changeEmail(newEmail: string): void {
    this.email = newEmail;
  }
}`,
              task: `Modella l'entita' User con un'identita' immutabile basata su id e un metodo equals che confronta per identita', non per attributi.`,
            },
            {
              english: 'Value Object',
              italian: 'Oggetto Valore',
              pronunciation: '/\u02C8v\u00E6lju\u02D0 \u02C8\u0252bd\u0292\u026Akt/',
              phonetic: 'VE-liu OB-gect',
              example:
                "A value object is defined by its attributes, not identity. = Un value object \u00E8 definito dai suoi attributi, non dall'identit\u00E0.",
              context: 'ddd',
              difficulty: 'advanced',
              note: 'Es: Un indirizzo o un importo in denaro.',
              code: `class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string,
  ) {
    if (amount < 0) throw new Error('Money non puo essere negativo');
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}`,
              task: `Definisci il value object Money come immutabile, identificato solo dai suoi attributi e con un'invariante che impedisca importi negativi.`,
            },
            {
              english: 'Aggregate',
              italian: 'Aggregato',
              pronunciation: '/\u02C8\u00E6\u0261r\u026A\u0261\u0259t/',
              phonetic: 'AG-gre-gat',
              example:
                "In an e-commerce system, an Order aggregate groups together the order itself, its line items, and the shipping address. = In un sistema e-commerce, un aggregato Order raggruppa l'ordine stesso, le sue righe e l'indirizzo di spedizione.",
              context: 'ddd',
              difficulty: 'expert',
              code: `class Order {
  private items: OrderLine[] = [];

  constructor(public readonly id: string, public readonly customerId: string) {}

  addLine(line: OrderLine): void {
    if (this.items.length >= 50) throw new Error('Troppe righe');
    this.items.push(line);
  }

  total(): Money {
    return this.items.reduce((acc, l) => acc.add(l.subtotal()), Money.zero('EUR'));
  }
}`,
              task: `Costruisci l'aggregato Order che incapsula le sue OrderLine e protegge l'invariante 'massimo 50 righe' tramite il metodo addLine.`,
            },
            {
              english: 'Aggregate Root',
              italian: "Radice dell'Aggregato",
              pronunciation: '/\u02C8\u00E6\u0261r\u026A\u0261\u0259t ru\u02D0t/',
              phonetic: 'AG-gre-gat RUUT',
              example:
                "The aggregate root is the only entry point to the aggregate. = La radice \u00E8 l'unico punto di ingresso all'aggregato.",
              context: 'ddd',
              difficulty: 'expert',
              code: `class Cart {
  private items: CartItem[] = [];

  // Unico punto di ingresso: nessuno modifica CartItem direttamente.
  addProduct(product: Product, qty: number): void {
    const existing = this.items.find((i) => i.productId === product.id);
    if (existing) existing.increase(qty);
    else this.items.push(new CartItem(product.id, qty));
  }

  snapshot(): readonly CartItem[] {
    return Object.freeze([...this.items]);
  }
}`,
              task: `Implementa Cart come radice dell'aggregato: i CartItem interni non sono modificabili dall'esterno e ogni cambiamento passa per addProduct.`,
            },
            {
              english: 'Repository Pattern',
              italian: 'Pattern Repository',
              pronunciation: '/r\u026A\u02C8p\u0252z\u026At\u0259ri \u02C8p\u00E6t\u0259rn/',
              phonetic: 're-PO-si-to-ri PAT-tern',
              example:
                'A repository mediates between domain and data mapping layers. = Un repository media tra il dominio e il layer di mappatura dati.',
              context: 'architecture-patterns',
              difficulty: 'intermediate',
              code: `interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

class PostgresUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const row = await db.users.findOne({ id });
    return row ? new User(row.id, row.email) : null;
  }

  async save(user: User): Promise<void> {
    await db.users.upsert(user);
  }
}`,
              task: `Definisci l'interfaccia UserRepository nel dominio e l'implementazione Postgres separata, in modo che il dominio non conosca SQL.`,
            },
            {
              english: 'Domain Service',
              italian: 'Servizio di Dominio',
              pronunciation: '/do\u028A\u02C8me\u026An \u02C8s\u025C\u02D0rv\u026As/',
              phonetic: 'do-MEIN SER-vis',
              example:
                "Use a domain service for logic that doesn't fit in an entity. = Usa un servizio di dominio per logiche che non stanno bene in un'entit\u00E0.",
              context: 'ddd',
              difficulty: 'advanced',
              code: `class TransferService {
  // Logica che non appartiene ne' a un singolo Account, ne' a un Transaction.
  transfer(from: Account, to: Account, amount: Money): void {
    if (from.id === to.id) throw new Error('Stesso conto');
    from.debit(amount);
    to.credit(amount);
  }
}`,
              task: `Modella il TransferService come servizio di dominio che coordina due Account, dato che il bonifico non e' responsabilita' di una singola entita'.`,
            },
            {
              english: 'Anti-Corruption Layer (ACL)',
              italian: 'Layer Anti-Corruzione',
              pronunciation:
                '/\u02C8\u00E6nti k\u0259\u02C8r\u028Cp\u0283\u0259n \u02C8le\u026A\u0259r/',
              phonetic: 'AN-ti co-RAP-scen LEI-er',
              example:
                "An ACL protects your domain from external system changes. = Un'ACL protegge il tuo dominio dai cambiamenti dei sistemi esterni.",
              context: 'ddd',
              difficulty: 'expert',
              code: `// Il nostro dominio parla di Customer; l'ERP legacy espone 'CUST_RECORD'.
class LegacyCustomerAdapter {
  constructor(private legacyApi: LegacyErpClient) {}

  async getCustomer(id: string): Promise<Customer> {
    const raw = await this.legacyApi.fetchCustRecord(id);
    return new Customer(raw.CUST_ID, raw.CUST_NAME, raw.CUST_EMAIL);
  }
}`,
              task: `Scrivi un adattatore che traduce il modello CUST_RECORD dell'ERP legacy nell'entita' Customer del tuo dominio, evitando contaminazioni.`,
            },
          ],
        },
      ],
    },
    5: {
      name: 'Testing',
      description: 'Strategie e tecniche di testing',
      lessons: [
        {
          id: 'dev_test_unit',
          title: 'Unit Testing',
          description: 'Unit test, assertion, fixture...',
          items: [
            {
              english: 'Unit Test',
              italian: 'Test Unitario',
              pronunciation: '/\u02C8ju\u02D0n\u026At test/',
              phonetic: 'IUU-nit test',
              example:
                'A good unit test runs in milliseconds, exercises a single function, and fails for exactly one reason when the logic breaks. = Un buon unit test gira in millisecondi, esercita una singola funzione e fallisce per esattamente un motivo quando la logica si rompe.',
              context: 'testing',
              difficulty: 'beginner',
              code: `import { describe, it, expect } from 'vitest';
import { add } from './math';

describe('add', () => {
  it('somma due numeri positivi', () => {
    expect(add(2, 3)).toBe(5);
  });
});`,
              task: 'Scrivi un unit test isolato per la funzione add che gira in millisecondi e fallisce solo se la logica di somma si rompe.',
            },
            {
              english: 'Test Case',
              italian: 'Caso di Test',
              pronunciation: '/test ke\u026As/',
              phonetic: 'TEST keis',
              example:
                'Define multiple test cases for each feature. = Definisci diversi casi di test per ogni feature.',
              context: 'testing',
              difficulty: 'beginner',
              code: `test('restituisce l\\'utente quando esiste', async () => {
  const user = await repo.findById('abc');
  expect(user?.name).toBe('Alice');
});

test('restituisce null se l\\'utente non esiste', async () => {
  const user = await repo.findById('zzz');
  expect(user).toBeNull();
});`,
              task: `Definisci due casi di test per findById: uno per l'utente esistente che torna l'oggetto, l'altro per l'id sconosciuto che torna null.`,
            },
            {
              english: 'Assertion',
              italian: 'Asserzione / Assertion',
              pronunciation: '/\u0259\u02C8s\u025C\u02D0r\u0283\u0259n/',
              phonetic: 'as-SER-scion',
              example:
                "Each test ends with an assertion that compares the actual output against the expected result. = Ogni test finisce con un'asserzione che confronta l'output effettivo con il risultato atteso.",
              context: 'testing',
              difficulty: 'intermediate',
              note: "Se l'asserzione fallisce, il test fallisce.",
              code: `const result = calculateTax(100, 0.22);

expect(result).toBe(22);
expect(result).toBeGreaterThan(0);
expect(typeof result).toBe('number');`,
              task: 'Scrivi tre asserzioni che verifichino il valore esatto, un vincolo numerico e il tipo del risultato di calculateTax.',
            },
            {
              english: 'Test Suite',
              italian: 'Suite di Test',
              pronunciation: '/test swi\u02D0t/',
              phonetic: 'TEST suiit',
              example:
                'Split the test suite into fast unit tests run on every commit and slow end-to-end tests scheduled nightly to keep feedback quick. = Dividi la suite di test in unit test veloci eseguiti a ogni commit e test end-to-end lenti schedulati di notte per mantenere il feedback rapido.',
              context: 'testing',
              difficulty: 'intermediate',
              note: 'Una collezione di test correlati.',
              code: `describe('UserService', () => {
  describe('register', () => {
    it('crea un nuovo utente', () => { /* ... */ });
    it('rifiuta email duplicate', () => { /* ... */ });
  });
  describe('delete', () => {
    it('rimuove l\\'utente esistente', () => { /* ... */ });
  });
});`,
              task: 'Organizza la suite di test di UserService raggruppando register e delete in describe annidati per leggere il report come una specifica.',
            },
            {
              english: 'Fixture',
              italian: 'Predisposizione (fixture)',
              pronunciation: '/\u02C8f\u026Akst\u0283\u0259r/',
              phonetic: 'FIKS-ciur',
              example:
                'Centralise data setup in a shared fixture so every test starts from the same known state without duplicating boilerplate. = Centralizza il setup dei dati in una fixture condivisa così ogni test parte dallo stesso stato noto senza duplicare boilerplate.',
              context: 'testing',
              difficulty: 'advanced',
              note: `Loanword: in italiano tecnico si lascia spesso 'fixture'.`,
              code: `// fixtures/users.ts
export const aliceFixture = {
  id: 'user-1',
  email: 'alice@example.com',
  role: 'admin',
} as const;

// nel test
import { aliceFixture } from './fixtures/users';

it('admin puo eliminare utenti', () => {
  expect(canDelete(aliceFixture)).toBe(true);
});`,
              task: 'Centralizza una fixture aliceFixture riutilizzabile e usala nei test al posto di duplicare i dati di setup in ogni it.',
            },
            {
              english: 'Setup / Teardown',
              italian: 'Preparazione / Pulizia',
              pronunciation: '/\u02C8set\u028Cp/ /\u02C8te\u0259rda\u028An/',
              phonetic: 'SET-ap TER-daun',
              example:
                'Use setup to initialize data before each test. = Usa il setup per inizializzare i dati prima di ogni test.',
              context: 'testing',
              difficulty: 'intermediate',
              code: `let db: Database;

beforeEach(async () => {
  db = await Database.connect(':memory:');
  await db.migrate();
});

afterEach(async () => {
  await db.close();
});`,
              task: 'Configura beforeEach e afterEach per aprire un database in-memory pulito prima di ogni test e chiuderlo correttamente dopo.',
            },
            {
              english: 'Test-Driven Development (TDD)',
              italian: 'Sviluppo Guidato dai Test',
              pronunciation: '/test \u02C8dr\u026Avn d\u026A\u02C8vel\u0259pm\u0259nt/',
              phonetic: 'TEST dri-ven di-VE-lop-ment',
              example:
                'In TDD, you write the test before the code. = Nel TDD, scrivi il test prima del codice.',
              context: 'methodology',
              difficulty: 'advanced',
              note: 'Ciclo: Red (test fallisce) -> Green (test passa) -> Refactor.',
            },
            {
              english: 'Code Coverage',
              italian: 'Copertura del Codice',
              pronunciation: '/ko\u028Ad \u02C8k\u028Cv\u0259r\u026Ad\u0292/',
              phonetic: 'KOUD CO-ve-rig',
              example:
                'High code coverage gives confidence that tests exercise most paths, but it does not guarantee that the assertions are meaningful. = Una alta code coverage dà fiducia che i test esercitino la maggior parte dei percorsi, ma non garantisce che le asserzioni siano significative.',
              context: 'testing',
              difficulty: 'intermediate',
              note: 'Percentuale di codice sorgente eseguita durante i test.',
              command:
                'npx jest --coverage --coverageReporters=text-summary --coverageReporters=html',
              task: 'Esegui la suite Jest generando un report di coverage sia testuale che HTML per individuare i rami di codice non testati.',
            },
            {
              english: 'False Positive',
              italian: 'Falso Positivo',
              pronunciation: '/f\u0254\u02D0ls \u02C8p\u0252z\u0259t\u026Av/',
              phonetic: 'FOLS PO-si-tiv',
              example:
                'A false positive is a test that fails incorrectly. = Un falso positivo \u00E8 un test che fallisce erroneamente.',
              context: 'testing',
              difficulty: 'advanced',
            },
            {
              english: 'Refactoring',
              italian: 'Rifattorizzazione / Refactoring',
              pronunciation: '/\u02CCri\u02D0\u02C8f\u00E6kt\u0259r\u026A\u014B/',
              phonetic: 'rii-FAC-to-ring',
              example: `Continuous refactoring keeps the codebase healthy: small structural improvements after each feature prevent technical debt from snowballing. = Il refactoring continuo mantiene la codebase sana: piccoli miglioramenti strutturali dopo ogni funzionalità prevengono l'accumulo di debito tecnico.`,
              context: 'development',
              difficulty: 'intermediate',
              note: 'Loanword: refactoring si lascia in inglese anche in italiano tecnico.',
            },
          ],
        },
        {
          id: 'dev_test_integration',
          title: 'Integration Testing',
          description: 'Integration, E2E, smoke test...',
          items: [
            {
              english: 'Integration Testing',
              italian: "Test d'Integrazione",
              pronunciation:
                '/\u02CC\u026Ant\u026A\u02C8\u0261re\u026A\u0283\u0259n \u02C8test\u026A\u014B/',
              phonetic: 'in-te-GREI-scion TES-ting',
              example:
                "After unit tests pass, integration testing verifies that modules interact correctly with the database and external APIs. = Dopo che i test unitari passano, i test d'integrazione verificano che i moduli interagiscano correttamente con il database e le API esterne.",
              context: 'testing',
              difficulty: 'intermediate',
            },
            {
              english: 'End-to-End (E2E) Testing',
              italian: 'Test End-to-End',
              pronunciation: '/end tu end \u02C8test\u026A\u014B/',
              phonetic: 'END tu END TES-ting',
              example:
                'E2E testing simulates real user scenarios. = I test E2E simulano scenari utente reali.',
              context: 'testing',
              difficulty: 'advanced',
              note: "Verifica l'intero flusso dell'applicazione, dall'inizio alla fine.",
              command: 'npx playwright test --project=chromium --reporter=html',
              task: 'Esegui la suite end-to-end con Playwright su Chromium e genera un report HTML navigabile con screenshot dei fallimenti.',
            },
            {
              english: 'Smoke Test',
              italian: 'Test di Verifica Rapida / Smoke Test',
              pronunciation: '/smo\u028Ak test/',
              phonetic: 'SMOUK test',
              example:
                'After every deployment, a quick smoke test checks that the homepage loads, login works, and the database is reachable. = Dopo ogni deployment, un rapido smoke test controlla che la homepage si carichi, il login funzioni e il database sia raggiungibile.',
              context: 'testing',
              difficulty: 'intermediate',
              note: 'Test veloci per vedere se le funzioni base girano senza "fare fumo" (crashare).',
              command:
                'curl -fsS https://app.example.com/healthz && curl -fsS https://app.example.com/api/version',
              task: `Esegui uno smoke test post-deploy che fallisce subito se l'endpoint di health o quello di version non rispondono 2xx.`,
            },
            {
              english: 'Regression Testing',
              italian: 'Test di Regressione',
              pronunciation: '/r\u026A\u02C8\u0261re\u0283\u0259n \u02C8test\u026A\u014B/',
              phonetic: 're-GRE-scion TES-ting',
              example:
                'We run regression testing after every release to ensure new features did not break existing functionality. = Eseguiamo test di regressione dopo ogni rilascio per assicurarci che le nuove funzionalità non abbiano rotto quelle esistenti.',
              context: 'testing',
              difficulty: 'intermediate',
            },
            {
              english: 'Sanity Test',
              italian: 'Test di Sanit\u00E0',
              pronunciation: '/\u02C8s\u00E6n\u0259ti test/',
              phonetic: 'SE-ni-ti test',
              example:
                'A sanity test verifies specific bug fixes. = Un test di sanit\u00E0 verifica specifiche correzioni di bug.',
              context: 'testing',
              difficulty: 'intermediate',
            },
            {
              english: 'System Testing',
              italian: 'Test di Sistema',
              pronunciation: '/\u02C8s\u026Ast\u0259m \u02C8test\u026A\u014B/',
              phonetic: 'SIS-tem TES-ting',
              example:
                "Before releasing to users, system testing evaluates the entire application in an environment that mirrors production. = Prima di rilasciare agli utenti, il test di sistema valuta l'intera applicazione in un ambiente che rispecchia la produzione.",
              context: 'testing',
              difficulty: 'intermediate',
            },
            {
              english: 'User Acceptance Testing (UAT)',
              italian: 'Test di Accettazione Utente',
              pronunciation:
                '/\u02C8ju\u02D0z\u0259r \u0259k\u02C8sept\u0259ns \u02C8test\u026A\u014B/',
              phonetic: 'IUU-ser ac-CEP-tans TES-ting',
              example:
                'During user acceptance testing, real stakeholders verify the software meets their business requirements. = Durante il test di accettazione utente, gli stakeholder reali verificano che il software soddisfi i requisiti di business.',
              context: 'testing',
              difficulty: 'advanced',
            },
            {
              english: 'Black-box Testing',
              italian: 'Test a Scatola Nera',
              pronunciation: '/bl\u00E6k b\u0252ks \u02C8test\u026A\u014B/',
              phonetic: 'BLAK boks TES-ting',
              example:
                'In black-box testing, the tester does not see the source code and validates behavior only through inputs and outputs. = Nel test black-box, il tester non vede il codice sorgente e valida il comportamento solo tramite input e output.',
              context: 'testing',
              difficulty: 'intermediate',
              note: 'Il tester non conosce il codice interno.',
            },
            {
              english: 'White-box Testing',
              italian: 'Test a Scatola Bianca',
              pronunciation: '/wa\u026At b\u0252ks \u02C8test\u026A\u014B/',
              phonetic: 'UAIT boks TES-ting',
              example:
                'Unlike black-box, white-box testing requires the tester to read the code and design cases that cover every branch. = A differenza del black-box, il test white-box richiede al tester di leggere il codice e progettare casi che coprano ogni ramo.',
              context: 'testing',
              difficulty: 'intermediate',
              note: 'Il tester ha accesso al codice sorgente.',
            },
            {
              english: 'Boundary Value Analysis',
              italian: 'Analisi dei Valori Limite',
              pronunciation:
                '/\u02C8ba\u028Andri \u02C8v\u00E6lju\u02D0 \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'BAUN-dri VE-liu a-NA-li-sis',
              example:
                "Test the edges of input ranges using boundary value analysis. = Testa i limiti dei range di input usando l'analisi dei valori limite.",
              context: 'testing-techniques',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dev_test_techniques',
          title: 'Tecniche / Techniques',
          description: 'Mock, stub, spy, TDD, BDD...',
          items: [
            {
              english: 'Mock',
              italian: 'Simulacro / Mock',
              pronunciation: '/m\u0252k/',
              phonetic: 'MOCK',
              example:
                'Use a mock object to simulate a database. = Usa un oggetto mock per simulare un database.',
              context: 'testing',
              difficulty: 'intermediate',
              note: 'Un oggetto finto che simula il comportamento di uno reale per isolare il test.',
              code: `import { vi } from 'vitest';

const mockDb = {
  findOne: vi.fn().mockResolvedValue({ id: 'abc', name: 'Alice' }),
};

const service = new UserService(mockDb);
await service.getName('abc');

expect(mockDb.findOne).toHaveBeenCalledWith({ id: 'abc' });`,
              task: `Crea un mock di db.findOne con vi.fn(), iniettalo in UserService e verifica che il servizio chiami il metodo con l'id giusto.`,
            },
            {
              english: 'Stub',
              italian: 'Sostituto (stub)',
              pronunciation: '/st\u028Cb/',
              phonetic: 'STAB',
              example: `Replace the external payment API with a stub that returns predefined responses, so tests run offline and remain deterministic. = Sostituisci l'API esterna di pagamento con uno stub che restituisce risposte predefinite, così i test girano offline e rimangono deterministici.`,
              context: 'testing',
              difficulty: 'advanced',
              note: 'Loanword: stub si lascia in inglese in italiano tecnico.',
              code: `// Stub: ritorna sempre la stessa risposta predefinita, senza logica.
const paymentGatewayStub = {
  charge: async (_amount: number) => ({ status: 'approved', txId: 'stub-1' }),
};

const checkout = new CheckoutService(paymentGatewayStub);
await checkout.pay(100);`,
              task: `Sostituisci il gateway di pagamento con uno stub che restituisce sempre 'approved' cosi' il test del checkout resta deterministico.`,
            },
            {
              english: 'Spy',
              italian: 'Spia / Spy',
              pronunciation: '/spa\u026A/',
              phonetic: 'SPAI',
              example:
                'Use a spy to verify if a function was called. = Usa una spia per verificare se una funzione \u00E8 stata chiamata.',
              context: 'testing',
              difficulty: 'advanced',
              code: `import { vi } from 'vitest';

const logger = { warn: () => {} };
const warnSpy = vi.spyOn(logger, 'warn');

validate({ email: '' }, logger);

expect(warnSpy).toHaveBeenCalledWith('email mancante');`,
              task: `Aggancia uno spy a logger.warn e verifica che validate produca esattamente il messaggio 'email mancante' quando l'email e' vuota.`,
            },
            {
              english: 'Behavior-Driven Development (BDD)',
              italian: 'Sviluppo Guidato dal Comportamento',
              pronunciation:
                '/b\u026A\u02C8he\u026Avj\u0259r \u02C8dr\u026Avn d\u026A\u02C8vel\u0259pm\u0259nt/',
              phonetic: 'bi-HEI-vior dri-ven di-VE-lop-ment',
              example:
                'BDD uses human-readable language for tests. = Il BDD usa un linguaggio leggibile per gli umani nei test.',
              context: 'methodology',
              difficulty: 'advanced',
              note: 'Usa la sintassi Given/When/Then (es. Cucumber, Gherkin).',
            },
            {
              english: 'Mutation Testing',
              italian: 'Test di Mutazione',
              pronunciation: '/mju\u02D0\u02C8te\u026A\u0283\u0259n \u02C8test\u026A\u014B/',
              phonetic: 'miu-TEI-scion TES-ting',
              example:
                'If mutation testing introduces a bug and no test catches it, your test suite has a gap. = Se il test di mutazione introduce un bug e nessun test lo rileva, la tua suite di test ha una lacuna.',
              context: 'testing',
              difficulty: 'expert',
              note: 'Modifica casualmente il codice per vedere se i test falliscono (se non falliscono, i test sono deboli).',
              command: 'npx stryker run --concurrency 4 --reporters html,clear-text',
              task: 'Esegui Stryker per generare mutanti del codice e scopri quali mutazioni la tua suite non riesce a uccidere.',
            },
            {
              english: 'Static Analysis',
              italian: 'Analisi Statica',
              pronunciation: '/\u02C8st\u00E6t\u026Ak \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'STA-tik a-NA-li-sis',
              example:
                "Running static analysis in your CI pipeline catches common mistakes like unused variables and type mismatches. = Eseguire l'analisi statica nella pipeline CI rileva errori comuni come variabili inutilizzate e mismatch di tipo.",
              context: 'tools',
              difficulty: 'intermediate',
              note: 'Es: ESLint, Pylint, SonarQube.',
              command: `npx eslint 'src/**/*.{ts,tsx}' --max-warnings 0 --report-unused-disable-directives`,
              task: 'Esegui ESLint sul sorgente TypeScript trattando ogni warning come errore e segnalando le direttive di disable inutilizzate.',
            },
            {
              english: 'Fuzz Testing (Fuzzing)',
              italian: 'Test con dati casuali (fuzzing)',
              pronunciation: '/f\u028Cz \u02C8test\u026A\u014B/',
              phonetic: 'FAZ tes-ting',
              example:
                'By sending thousands of random or malformed inputs, fuzz testing uncovers crashes that manual tests would miss. = Inviando migliaia di input casuali o malformati, il fuzz testing scopre crash che i test manuali non troverebbero.',
              context: 'security-testing',
              difficulty: 'advanced',
              note: 'Inviare grandi quantit\u00E0 di dati casuali o malformati per far crashare il sistema.',
              command: 'npx jazzer parser.test.js -- -max_total_time=60',
              task: `Lancia Jazzer.js sul parser per 60 secondi cosi' che generi input casuali e malformati alla ricerca di crash.`,
            },
            {
              english: 'Fake (Object)',
              italian: 'Oggetto Finto / Fake',
              pronunciation: '/fe\u026Ak/',
              phonetic: 'FEIK',
              example:
                "For integration tests, we replaced the real payment gateway with a fake that always returns success. = Per i test d'integrazione, abbiamo sostituito il gateway di pagamento reale con un fake che restituisce sempre successo.",
              context: 'testing',
              difficulty: 'advanced',
              note: "Ha un'implementazione reale ma semplificata (non adatta alla produzione).",
              code: `// Fake: implementazione reale ma semplificata, non production-ready.
class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();
  async findById(id: string) { return this.users.get(id) ?? null; }
  async save(user: User) { this.users.set(user.id, user); }
}`,
              task: 'Implementa un fake InMemoryUserRepository con Map per i test, evitando di toccare il database vero pur mantenendo la semantica.',
            },
            {
              english: 'Property-based Testing',
              italian: 'Test Basato sulle Propriet\u00E0',
              pronunciation: '/\u02C8pr\u0252p\u0259rti be\u026Ast \u02C8test\u026A\u014B/',
              phonetic: 'PRO-per-ti beist TES-ting',
              example:
                'Use property-based testing to check invariants. = Usa il test basato sulle propriet\u00E0 per controllare gli invarianti.',
              context: 'testing',
              difficulty: 'expert',
              code: `import fc from 'fast-check';

test('reverse di reverse e\\' identita\\'', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) => {
      expect(reverse(reverse(arr))).toEqual(arr);
    }),
  );
});`,
              task: `Scrivi un test property-based con fast-check che verifichi su array casuali di interi l'invariante reverse(reverse(arr)) === arr.`,
            },
            {
              english: 'Cyclomatic Complexity',
              italian: 'Complessit\u00E0 Ciclomatica',
              pronunciation:
                '/\u02CCsa\u026Akl\u0259\u02C8m\u00E6t\u026Ak k\u0259m\u02C8pleks\u0259ti/',
              phonetic: 'sai-clo-MA-tik com-PLES-si-ti',
              example:
                "High cyclomatic complexity means the code needs more tests. = Un'alta complessit\u00E0 ciclomatica significa che il codice serve pi\u00F9 test.",
              context: 'metrics',
              difficulty: 'expert',
              note: 'Misura il numero di percorsi indipendenti attraverso il codice.',
            },
          ],
        },
        {
          id: 'dev_test_quality',
          title: 'Qualit\u00E0 / Quality',
          description: 'Coverage, regression, load test...',
          items: [
            {
              english: 'Test Plan',
              italian: 'Piano di Test',
              pronunciation: '/test pl\u00E6n/',
              phonetic: 'TEST plan',
              example:
                'A test plan describes the testing strategy. = Un piano di test descrive la strategia di testing.',
              context: 'management',
              difficulty: 'intermediate',
            },
            {
              english: 'Test Automation',
              italian: 'Automazione dei Test',
              pronunciation: '/test \u02CC\u0254\u02D0t\u0259\u02C8me\u026A\u0283\u0259n/',
              phonetic: 'TEST o-to-MEI-scion',
              example:
                "Investing in test automation now prevents hours of manual checking with every future release. = Investire nell'automazione dei test ora previene ore di verifica manuale a ogni futuro rilascio.",
              context: 'testing',
              difficulty: 'intermediate',
            },
            {
              english: 'Continuous Testing',
              italian: 'Testing Continuo',
              pronunciation: '/k\u0259n\u02C8t\u026Anju\u0259s \u02C8test\u026A\u014B/',
              phonetic: 'con-TI-niuos TES-ting',
              example:
                'With continuous testing, every commit triggers automated tests so bugs are caught minutes after they are introduced. = Con il testing continuo, ogni commit avvia test automatici cos\u00EC i bug vengono trovati pochi minuti dopo essere stati introdotti.',
              context: 'devops',
              difficulty: 'advanced',
            },
            {
              english: 'Load Testing',
              italian: 'Test di Carico',
              pronunciation: '/lo\u028Ad \u02C8test\u026A\u014B/',
              phonetic: 'LOUD TES-ting',
              example:
                'Before Black Friday, the team ran load testing to simulate 10,000 concurrent users and find bottlenecks. = Prima del Black Friday, il team ha eseguito test di carico per simulare 10.000 utenti concorrenti e trovare colli di bottiglia.',
              context: 'performance',
              difficulty: 'intermediate',
              command: 'k6 run --vus 500 --duration 5m loadtest.js',
              task: 'Esegui un test di carico con k6 simulando 500 utenti virtuali per 5 minuti e misura latenza e tasso di errore.',
            },
            {
              english: 'Stress Testing',
              italian: 'Test di Sforzo / Stress Test',
              pronunciation: '/stres \u02C8test\u026A\u014B/',
              phonetic: 'STRES TES-ting',
              example:
                'During stress testing, we pushed traffic far beyond normal levels until the server ran out of memory. = Durante lo stress test, abbiamo spinto il traffico ben oltre i livelli normali finché il server non ha esaurito la memoria.',
              context: 'performance',
              difficulty: 'advanced',
              command: 'k6 run --stage 2m:200,5m:2000,2m:0 stress.js',
              task: 'Lancia uno stress test che rampa fino a 2000 utenti concorrenti per individuare il punto di rottura del sistema.',
            },
            {
              english: 'Usability Testing',
              italian: 'Test di Usabilit\u00E0',
              pronunciation: '/\u02CCju\u02D0z\u0259\u02C8b\u026Al\u0259ti \u02C8test\u026A\u014B/',
              phonetic: 'iu-sa-BI-li-ti TES-ting',
              example:
                'During usability testing, five participants tried to complete the checkout flow while researchers observed where they got stuck. = Durante il test di usabilit\u00E0, cinque partecipanti hanno provato a completare il flusso di checkout mentre i ricercatori osservavano dove si bloccavano.',
              context: 'ux',
              difficulty: 'intermediate',
            },
            {
              english: 'Accessibility Testing (a11y)',
              italian: 'Test di Accessibilit\u00E0',
              pronunciation:
                '/\u02CC\u00E6kses\u0259\u02C8b\u026Al\u0259ti \u02C8test\u026A\u014B/',
              phonetic: 'ak-ses-si-BI-li-ti TES-ting',
              example:
                'Accessibility testing ensures everyone can use the site. = Il test di accessibilit\u00E0 garantisce che tutti possano usare il sito.',
              context: 'ux',
              difficulty: 'advanced',
              command: 'npx pa11y-ci --sitemap https://app.example.com/sitemap.xml --reporter json',
              task: 'Scansiona tutte le pagine elencate nella sitemap con pa11y-ci ed emetti un report JSON delle violazioni WCAG.',
            },
            {
              english: 'Bug Report',
              italian: 'Segnalazione di Bug',
              pronunciation: '/b\u028C\u0261 r\u026A\u02C8p\u0254\u02D0rt/',
              phonetic: 'BAG re-PORT',
              example:
                'Include steps to reproduce in your bug report. = Includi i passi per riprodurre nella tua segnalazione bug.',
              context: 'management',
              difficulty: 'beginner',
            },
            {
              english: 'Defect Density',
              italian: 'Densit\u00E0 dei Difetti',
              pronunciation: '/\u02C8di\u02D0fekt \u02C8dens\u0259ti/',
              phonetic: 'DII-fekt DEN-si-ti',
              example:
                'A low defect density -- say 0.5 bugs per 1,000 lines -- indicates high code quality. = Una bassa densit\u00E0 dei difetti -- diciamo 0,5 bug ogni 1.000 righe -- indica alta qualit\u00E0 del codice.',
              context: 'metrics',
              difficulty: 'expert',
            },
            {
              english: 'Quality Assurance (QA)',
              italian: 'Garanzia della Qualit\u00E0 (QA)',
              pronunciation: '/\u02C8kw\u0252l\u0259ti \u0259\u02C8\u0283\u028A\u0259r\u0259ns/',
              phonetic: 'KUA-li-ti a-SCIUR-ans',
              example:
                'The QA team prevents defects in the final product. = Il team QA previene i difetti nel prodotto finale.',
              context: 'management',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },
    6: {
      name: 'DevOps e CI/CD',
      description: 'Continuous Integration, Delivery e Operations',
      lessons: [
        {
          id: 'dev_devops_basics',
          title: 'DevOps Base / Basic DevOps',
          description: 'DevOps, CI, CD, pipeline...',
          items: [
            {
              english: 'DevOps',
              italian: 'Cultura sviluppo e operazioni (DevOps)',
              pronunciation: '/\u02C8dev\u0252ps/',
              phonetic: 'DEV-ops',
              example:
                'Adopting DevOps practices reduced our deployment cycle from weeks to hours. = Adottare le pratiche DevOps ha ridotto il nostro ciclo di deploy da settimane a ore.',
              context: 'devops',
              difficulty: 'beginner',
              note: 'Insieme di pratiche che combinano sviluppo software (Dev) e operazioni IT (Ops).',
            },
            {
              english: 'CI (Continuous Integration)',
              italian: 'Integrazione Continua (CI)',
              pronunciation:
                '/k\u0259n\u02C8t\u026Anju\u0259s \u02CC\u026Ant\u026A\u02C8\u0261re\u026A\u0283\u0259n/',
              phonetic: 'con-TI-niuos in-te-GREI-scion',
              example:
                "CI automates the merging of code changes. = La CI automatizza l'unione delle modifiche al codice.",
              context: 'devops',
              difficulty: 'intermediate',
              note: 'Esegue build e test automatici ad ogni commit.',
              code: `# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm test`,
              task: 'Definisci una pipeline di CI su GitHub Actions che a ogni push su main installi le dipendenze, lanci il lint ed esegua i test.',
            },
            {
              english: 'CD (Continuous Delivery)',
              italian: 'Consegna Continua (CD)',
              pronunciation: '/k\u0259n\u02C8t\u026Anju\u0259s d\u026A\u02C8l\u026Av\u0259ri/',
              phonetic: 'con-TI-niuos di-LI-ve-ri',
              example:
                'Continuous delivery ensures the code is always ready for release. = La consegna continua garantisce che il codice sia sempre pronto al rilascio.',
              context: 'devops',
              difficulty: 'intermediate',
              code: `# .github/workflows/cd.yml
name: CD
on:
  push:
    tags: ['v*']
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-bundle
          path: dist/
      - name: Notify release manager
        run: echo 'Build pronta per approvazione manuale'`,
              task: `Configura una pipeline di Continuous Delivery che a ogni tag costruisca l'artefatto e lo renda disponibile per l'approvazione manuale prima del rilascio in produzione.`,
            },
            {
              english: 'Continuous Deployment',
              italian: 'Distribuzione Continua',
              pronunciation:
                '/k\u0259n\u02C8t\u026Anju\u0259s d\u026A\u02C8pl\u0254\u026Am\u0259nt/',
              phonetic: 'con-TI-niuos di-PLOI-ment',
              example:
                'With continuous deployment, every passing commit goes live without manual approval. = Con il continuous deployment, ogni commit che supera i test va in produzione senza approvazione manuale.',
              context: 'devops',
              difficulty: 'advanced',
              note: 'A differenza del Delivery, qui il rilascio in produzione non richiede intervento umano.',
              code: `# .github/workflows/deploy.yml
name: Continuous Deployment
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test
      - name: Deploy to production
        run: |
          kubectl set image deployment/api api=ghcr.io/acme/api:\${{ github.sha }} -n production
          kubectl rollout status deployment/api -n production`,
              task: 'Imposta un deploy continuo in cui ogni commit su main che passa i test va automaticamente in produzione, senza approvazioni manuali.',
            },
            {
              english: 'Pipeline',
              italian: 'Condotto (pipeline)',
              pronunciation: '/\u02C8pa\u026Apla\u026An/',
              phonetic: 'PAIP-lain',
              example:
                'The CI/CD pipeline failed during the test stage. = La pipeline CI/CD \u00E8 fallita durante la fase di test.',
              context: 'devops',
              difficulty: 'beginner',
              note: 'Serie di processi automatizzati per costruire, testare e distribuire il software.',
              code: `# .gitlab-ci.yml
stages: [build, test, deploy]
build:
  stage: build
  script: npm run build
  artifacts:
    paths: [dist/]
test:
  stage: test
  script: npm test
deploy:
  stage: deploy
  script: kubectl apply -f k8s/
  only: [main]`,
              task: 'Crea una pipeline CI/CD a tre stadi (build, test, deploy) su GitLab che produca un artefatto e lo distribuisca su Kubernetes solo dal branch main.',
            },
            {
              english: 'SCM (Source Code Management)',
              italian: 'Gestione del Codice Sorgente',
              pronunciation: '/\u02CCes si\u02D0 \u02CCem/',
              phonetic: 'es-sii-EM',
              example:
                "A reliable SCM tracks every change, supports branching, and lets teams collaborate without overwriting each other's work. = Un SCM affidabile traccia ogni modifica, supporta il branching e permette ai team di collaborare senza sovrascrivere il lavoro altrui.",
              context: 'tools',
              difficulty: 'beginner',
              command: 'git clone --branch develop --depth 1 git@github.com:acme/api.git',
              task: `Clona il branch develop del repository dell'API facendo uno shallow clone (solo l'ultimo commit) per velocizzare il setup della CI.`,
            },
            {
              english: 'Build Automation',
              italian: 'Automazione della Build',
              pronunciation: '/b\u026Ald \u02CC\u0254\u02D0t\u0259\u02C8me\u026A\u0283\u0259n/',
              phonetic: 'BILD o-to-MEI-scion',
              example:
                "With build automation, a single command compiles the code, runs tests, and packages the artifact. = Con l'automazione della build, un singolo comando compila il codice, esegue i test e impacchetta l'artefatto.",
              context: 'devops',
              difficulty: 'intermediate',
              command: 'npm run build && npm test && docker build -t myapp:v1.2.0 .',
              task: `Automatizza l'intera build del progetto: compila il codice, lancia i test e impacchetta il risultato in un'immagine Docker taggata con la versione 1.2.0.`,
            },
            {
              english: 'Artifact',
              italian: 'Artefatto / Artifact',
              pronunciation: '/\u02C8\u0251\u02D0rt\u026Af\u00E6kt/',
              phonetic: 'AR-ti-fakt',
              example:
                "Download the build artifact from the pipeline. = Scarica l'artefatto della build dalla pipeline.",
              context: 'devops',
              difficulty: 'intermediate',
              note: "Il risultato finale del processo di build (es. un file .jar, .exe o un'immagine Docker).",
              command: 'docker push registry.acme.io/api:1.2.0',
              task: `Pubblica l'artefatto della build (un'immagine Docker taggata 1.2.0) nel registry aziendale così che gli ambienti di staging e produzione possano scaricarla.`,
            },
            {
              english: 'Artifact Repository',
              italian: 'Repository degli Artefatti',
              pronunciation:
                '/\u02C8\u0251\u02D0rt\u026Af\u00E6kt r\u026A\u02C8p\u0252z\u026At\u0259ri/',
              phonetic: 'AR-ti-fakt re-PO-si-to-ri',
              example:
                'The pipeline stores every versioned build in the artifact repository so any release can be reproduced. = La pipeline salva ogni build versionata nel repository degli artefatti cos\u00EC ogni rilascio pu\u00F2 essere riprodotto.',
              context: 'tools',
              difficulty: 'advanced',
              command:
                'mvn deploy -DaltDeploymentRepository=nexus::default::https://nexus.acme.io/repository/releases',
              task: `Deposita il JAR appena costruito nel repository degli artefatti Nexus aziendale, sull'instanza releases, per renderlo disponibile come dipendenza versionata.`,
            },
            {
              english: 'Feedback Loop',
              italian: 'Ciclo di Feedback',
              pronunciation: '/\u02C8fi\u02D0db\u00E6k lu\u02D0p/',
              phonetic: 'FIID-bak LUUP',
              example:
                'A short feedback loop helps find bugs early. = Un ciclo di feedback breve aiuta a trovare i bug presto.',
              context: 'devops',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'dev_devops_deploy',
          title: 'Deployment',
          description: 'Deploy, release, staging, production...',
          items: [
            {
              english: 'Deployment',
              italian: 'Distribuzione / Deploy',
              pronunciation: '/d\u026A\u02C8pl\u0254\u026Am\u0259nt/',
              phonetic: 'di-PLOI-ment',
              example: `Automating the deployment pipeline reduces human error and lets the team ship updates several times a day without ceremony. = Automatizzare la pipeline di deployment riduce l'errore umano e permette al team di rilasciare aggiornamenti più volte al giorno senza cerimonie.`,
              context: 'devops',
              difficulty: 'beginner',
              note: 'Il processo di installazione e attivazione del software in un ambiente specifico.',
              command: 'kubectl apply -f deployment.yaml -n production',
              task: `Esegui il deploy dell'applicazione nel namespace production di Kubernetes applicando il manifest deployment.yaml.`,
            },
            {
              english: 'Staging Environment',
              italian: 'Ambiente di Staging',
              pronunciation:
                '/\u02C8ste\u026Ad\u0292\u026A\u014B \u026An\u02C8va\u026Ar\u0259nm\u0259nt/',
              phonetic: 'STEI-ging in-VAI-ron-ment',
              example:
                "Test the changes in the staging environment first. = Testa i cambiamenti nell'ambiente di staging prima.",
              context: 'devops',
              difficulty: 'intermediate',
              note: 'Un ambiente quasi identico alla produzione per il test finale.',
              command:
                'kubectl apply -f k8s/ -n staging && kubectl rollout status deployment/api -n staging',
              task: `Distribuisci la nuova versione nell'ambiente di staging e attendi che il rollout sia completato prima di promuoverla in produzione.`,
            },
            {
              english: 'Production (Prod)',
              italian: 'Produzione',
              pronunciation: '/pr\u0259\u02C8d\u028Ck\u0283\u0259n/',
              phonetic: 'pro-DAK-scion',
              example:
                'Never test directly in production -- always use staging first to catch issues before users are affected. = Mai testare direttamente in produzione -- usa sempre lo staging prima per individuare problemi prima che gli utenti ne risentano.',
              context: 'devops',
              difficulty: 'beginner',
              note: "L'ambiente reale dove gli utenti finali usano l'applicazione.",
              command: 'kubectl apply -f k8s/ -n production --record',
              task: 'Esegui il deploy in produzione registrando il comando nella history del rollout, così da poter risalire a chi ha rilasciato cosa.',
            },
            {
              english: 'Blue-Green Deployment',
              italian: 'Distribuzione Blue-Green',
              pronunciation: '/blu\u02D0 \u0261ri\u02D0n d\u026A\u02C8pl\u0254\u026Am\u0259nt/',
              phonetic: 'BLUU GRIIN di-PLOI-ment',
              example:
                'With blue-green deployment, traffic switches to the new environment instantly and can roll back just as fast. = Con il deploy blue-green, il traffico passa al nuovo ambiente istantaneamente e pu\u00F2 fare rollback altrettanto velocemente.',
              context: 'deployment-strategies',
              difficulty: 'advanced',
              note: 'Due ambienti identici: uno live (Blue) e uno per il nuovo codice (Green). Si scambia il traffico.',
              code: `# k8s/service.yaml — switch traffic by changing the selector
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
    version: green  # was 'blue', now points to the new release
  ports:
    - port: 80
      targetPort: 8080`,
              task: `Configura un deploy blue-green su Kubernetes in cui il Service indirizza il traffico al pool 'green' modificando il selector senza interrompere il servizio.`,
            },
            {
              english: 'Canary Release',
              italian: 'Rilascio Canary',
              pronunciation: '/k\u0259\u02C8ne\u0259ri r\u026A\u02C8li\u02D0s/',
              phonetic: 'ca-NE-ri re-LIIS',
              example:
                'We are doing a canary release to 5% of users. = Stiamo facendo un rilascio canary al 5% degli utenti.',
              context: 'deployment-strategies',
              difficulty: 'advanced',
              note: 'Rilasciare il nuovo codice solo a una piccola parte di utenti per testarne la stabilit\u00E0.',
              code: `# Argo Rollouts canary strategy
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: api
spec:
  strategy:
    canary:
      steps:
        - setWeight: 5
        - pause: { duration: 10m }
        - setWeight: 25
        - pause: { duration: 10m }
        - setWeight: 100`,
              task: 'Definisci una strategia di rilascio canary che mandi prima il 5% del traffico alla nuova versione, poi il 25%, e infine il 100% se non emergono errori.',
            },
            {
              english: 'Rolling Update',
              italian: 'Aggiornamento Progressivo',
              pronunciation: '/\u02C8ro\u028Al\u026A\u014B \u028Cp\u02C8de\u026At/',
              phonetic: 'ROUL-ing ap-DEIT',
              example:
                'Kubernetes uses rolling updates by default. = Kubernetes usa aggiornamenti progressivi di default.',
              context: 'deployment-strategies',
              difficulty: 'intermediate',
              note: 'Aggiornare i server uno alla volta per non interrompere il servizio.',
              command:
                'kubectl set image deployment/api api=acme/api:v2.0.0 -n production && kubectl rollout status deployment/api -n production',
              task: 'Esegui un aggiornamento progressivo del deployment api alla versione v2.0.0 e segui lo stato del rollout fino al completamento di tutti i pod.',
            },
            {
              english: 'Zero-downtime Deployment',
              italian: 'Deploy a Tempo Zero',
              pronunciation:
                '/\u02C8z\u026A\u0259ro\u028A \u02C8da\u028Anta\u026Am d\u026A\u02C8pl\u0254\u026Am\u0259nt/',
              phonetic: 'SI-rou DAUN-taim di-PLOI-ment',
              example:
                'Achieve zero-downtime deployment with load balancers. = Ottieni deploy a tempo zero con i bilanciatori di carico.',
              context: 'devops',
              difficulty: 'advanced',
              code: `# Deployment strategy for zero downtime
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
        - name: api
          image: acme/api:v2.0.0
          readinessProbe:
            httpGet: { path: /health, port: 8080 }`,
              task: 'Configura il deployment perché aggiorni i pod uno alla volta senza mai scendere sotto la capacità minima, garantendo zero downtime durante il rilascio.',
            },
            {
              english: 'Rollback',
              italian: 'Ripristino / Rollback',
              pronunciation: '/\u02C8ro\u028Alb\u00E6k/',
              phonetic: 'ROUL-bak',
              example:
                'Trigger a rollback if the release fails. = Avvia un rollback se il rilascio fallisce.',
              context: 'devops',
              difficulty: 'intermediate',
              note: 'Tornare velocemente alla versione precedente del software in caso di errori.',
              command: 'kubectl rollout undo deployment/api -n production --to-revision=3',
              task: 'Effettua un rollback del deployment api in produzione alla revisione 3, ripristinando la versione precedente dopo aver rilevato un errore critico.',
            },
            {
              english: 'Feature Flag / Toggle',
              italian: 'Interruttore Feature',
              pronunciation: '/\u02C8fi\u02D0t\u0283\u0259r fl\u00E6\u0261/',
              phonetic: 'FII-cer FLAG',
              example:
                'Use a feature flag to enable the new UI. = Usa un feature flag per abilitare la nuova UI.',
              context: 'development',
              difficulty: 'advanced',
              note: 'Permette di attivare o disattivare funzioni senza fare un nuovo deploy.',
              code: `import { LDClient } from 'launchdarkly-node-server-sdk';
const client = LDClient.init(process.env.LD_SDK_KEY);
async function handler(req, res) {
  const showNewUI = await client.variation('new-checkout-ui', { key: req.user.id }, false);
  return showNewUI ? renderNewCheckout(res) : renderLegacyCheckout(res);
}`,
              task: 'Implementa un feature flag che attivi la nuova UI di checkout solo per gli utenti selezionati dalla console di LaunchDarkly, senza bisogno di un nuovo deploy.',
            },
            {
              english: 'Environment Drift',
              italian: "Deriva dell'Ambiente",
              pronunciation: '/\u026An\u02C8va\u026Ar\u0259nm\u0259nt dr\u026Aft/',
              phonetic: 'in-VAI-ron-ment DRIFT',
              example: `Teams fight environment drift between staging and production because bugs that pass on every laptop still fail once the cloud config diverges. = I team combattono la deriva dell'ambiente tra staging e produzione perché i bug che passano su ogni laptop falliscono comunque quando la config cloud diverge.`,
              context: 'devops',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dev_devops_infra',
          title: 'Infrastruttura / Infrastructure',
          description: 'IaC, container, orchestration...',
          items: [
            {
              english: 'Infrastructure as Code (IaC)',
              italian: 'Infrastruttura come Codice',
              pronunciation:
                '/\u02C8\u026Anfr\u0259\u02CCstr\u028Ckt\u0283\u0259r \u00E6z ko\u028Ad/',
              phonetic: 'IN-fra-strac-ciur az KOUD',
              example:
                "With infrastructure as code, the entire server setup is defined in version-controlled config files. = Con l'infrastruttura come codice, tutta la configurazione del server \u00E8 definita in file di configurazione sotto controllo versione.",
              context: 'devops',
              difficulty: 'intermediate',
              note: 'Gestire server e reti tramite file di configurazione invece di processi manuali.',
              code: `# main.tf — provision an EC2 instance
provider "aws" {
  region = "eu-west-1"
}
resource "aws_instance" "web" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t3.micro"
  tags = {
    Name = "web-prod"
    Env  = "production"
  }
}`,
              command:
                'terraform init && terraform apply -var-file=production.tfvars -auto-approve',
              task: 'Definisci in Terraform una istanza EC2 di produzione nella regione eu-west-1 e applicala usando il file di variabili production.tfvars senza chiedere conferma.',
            },
            {
              english: 'Container',
              italian: 'Contenitore / Container',
              pronunciation: '/k\u0259n\u02C8te\u026An\u0259r/',
              phonetic: 'con-TEI-ner',
              example:
                'Packaging the service into a container guarantees the same Linux distribution, Python version, and dependencies run everywhere. = Impacchettare il servizio in un container garantisce che la stessa distribuzione Linux, versione Python e dipendenze girino ovunque.',
              context: 'infrastructure',
              difficulty: 'beginner',
              note: 'Pacchetto leggero che include il codice e tutte le dipendenze per girare ovunque.',
              command: 'docker run -d --name api -p 8080:8080 --env-file .env.prod acme/api:v1.2.0',
              task: `Avvia un container dell'applicazione api in modalità detached esponendo la porta 8080 e caricando le variabili d'ambiente dal file .env.prod.`,
            },
            {
              english: 'Docker',
              italian: 'Piattaforma container (Docker)',
              pronunciation: '/\u02C8d\u0252k\u0259r/',
              phonetic: 'DO-ker',
              example:
                'Thanks to Docker, developers can package their app with all dependencies and ship it to any server reliably. = Grazie a Docker, gli sviluppatori possono impacchettare la loro app con tutte le dipendenze e distribuirla su qualsiasi server in modo affidabile.',
              context: 'infrastructure',
              difficulty: 'beginner',
              command: 'docker build -t myapp:v1.2.0 --build-arg NODE_ENV=production .',
              task: `Costruisci un'immagine Docker del progetto taggandola con la versione 1.2.0 e passando NODE_ENV=production come build argument.`,
            },
            {
              english: 'Orchestration',
              italian: 'Orchestrazione',
              pronunciation: '/\u02CC\u0254\u02D0rk\u026A\u02C8stre\u026A\u0283\u0259n/',
              phonetic: 'or-ke-STREI-scion',
              example:
                "Container orchestration manages thousands of containers. = L'orchestrazione gestisce migliaia di container.",
              context: 'infrastructure',
              difficulty: 'advanced',
              command: 'kubectl get pods -A -o wide --sort-by=.spec.nodeName',
              task: 'Mostra tutti i pod orchestrati dal cluster Kubernetes, raggruppati per nodo, per verificare come è distribuito il carico tra le macchine.',
            },
            {
              english: 'Kubernetes (K8s)',
              italian: 'Orchestratore di container (Kubernetes)',
              pronunciation: '/\u02CCkju\u02D0b\u0259r\u02C8neti\u02D0z/',
              phonetic: 'ku-ber-NE-tiz',
              example:
                'Most cloud providers offer managed Kubernetes clusters so teams can orchestrate containers without managing the control plane. = La maggior parte dei cloud provider offre cluster Kubernetes gestiti cos\u00EC i team possono orchestrare i container senza gestire il control plane.',
              context: 'infrastructure',
              difficulty: 'advanced',
              command:
                'kubectl apply -f deployment.yaml -n production && kubectl get pods -n production -w',
              task: 'Applica il manifest del deployment al cluster Kubernetes nel namespace production e osserva in tempo reale come vengono creati i pod.',
            },
            {
              english: 'Virtual Machine (VM)',
              italian: 'Macchina Virtuale',
              pronunciation: '/\u02C8v\u025C\u02D0rt\u0283u\u0259l m\u0259\u02C8\u0283i\u02D0n/',
              phonetic: 'VER-ciu-al me-SCIIN',
              example:
                'A virtual machine emulates an entire operating system, which gives strong isolation but uses much more RAM than a container. = Una virtual machine emula un intero sistema operativo, il che dà un forte isolamento ma usa molta più RAM di un container.',
              context: 'infrastructure',
              difficulty: 'beginner',
              command: 'virsh list --all && virsh start web-vm',
              task: `Elenca tutte le macchine virtuali gestite da libvirt sull'host, poi avvia quella chiamata web-vm.`,
            },
            {
              english: 'Service Discovery',
              italian: 'Scoperta dei Servizi',
              pronunciation: '/\u02C8s\u025C\u02D0rv\u026As d\u026A\u02C8sk\u028Cv\u0259ri/',
              phonetic: 'SER-vis di-SCA-ve-ri',
              example:
                'When a new instance spins up, service discovery registers it so other services can route traffic to it automatically. = Quando una nuova istanza viene avviata, la service discovery la registra così gli altri servizi possono instradare il traffico verso di essa automaticamente.',
              context: 'architecture',
              difficulty: 'advanced',
              code: `# k8s/service.yaml — DNS-based service discovery
apiVersion: v1
kind: Service
metadata:
  name: payments
  namespace: prod
spec:
  selector:
    app: payments
  ports:
    - port: 80
      targetPort: 8080
# Other services reach it at: payments.prod.svc.cluster.local`,
              task: 'Esponi il microservizio payments come Service Kubernetes così che gli altri servizi possano trovarlo automaticamente tramite il nome DNS payments.prod.svc.cluster.local.',
            },
            {
              english: 'Provisioning',
              italian: 'Approvvigionamento / Provisioning',
              pronunciation: '/pr\u0259\u02C8v\u026A\u0292\u0259n\u026A\u014B/',
              phonetic: 'pro-VI-scio-ning',
              example:
                'Automated provisioning spins up new servers in minutes, while manual setup used to take days. = Il provisioning automatico avvia nuovi server in minuti, mentre la configurazione manuale richiedeva giorni.',
              context: 'infrastructure',
              difficulty: 'intermediate',
              note: "Il processo di preparazione e configurazione dell'infrastruttura IT.",
              command: 'terraform apply -var-file=production.tfvars -auto-approve',
              task: `Esegui il provisioning dell'infrastruttura di produzione applicando il piano Terraform con le variabili dell'ambiente di produzione.`,
            },
            {
              english: 'Immutable Infrastructure',
              italian: 'Infrastruttura Immutabile',
              pronunciation:
                '/\u026A\u02C8mju\u02D0t\u0259bl \u02C8\u026Anfr\u0259\u02CCstr\u028Ckt\u0283\u0259r/',
              phonetic: 'im-MIU-ta-bol IN-fra-strac-ciur',
              example:
                "In immutable infrastructure, we replace servers instead of updating them. = Nell'infrastruttura immutabile, sostituiamo i server invece di aggiornarli.",
              context: 'devops',
              difficulty: 'expert',
              command: `packer build -var 'version=1.2.0' webapp.pkr.hcl`,
              task: 'Costruisci con Packer una nuova immagine macchina immutabile versione 1.2.0 da usare per sostituire interamente le istanze invece di aggiornarle in-place.',
            },
            {
              english: 'Config Management',
              italian: 'Gestione della Configurazione',
              pronunciation:
                '/k\u0259n\u02CCf\u0261j\u028A\u02C8re\u026A\u0283\u0259n \u02C8m\u00E6n\u026Ad\u0292m\u0259nt/',
              phonetic: 'con-fi-gui-REI-scion MAN-ig-ment',
              example:
                'With config management tools like Ansible, you define the desired state and the tool enforces it across all servers. = Con strumenti di gestione della configurazione come Ansible, definisci lo stato desiderato e lo strumento lo applica su tutti i server.',
              context: 'tools',
              difficulty: 'intermediate',
              command: 'ansible-playbook -i inventory/production webservers.yml --limit web-prod',
              task: `Lancia il playbook Ansible che configura i server web in produzione, limitando l'esecuzione al gruppo di host web-prod.`,
            },
          ],
        },
        {
          id: 'dev_devops_monitor',
          title: 'Monitoraggio / Monitoring',
          description: 'Monitoring, alerting, logging, SRE...',
          items: [
            {
              english: 'Monitoring',
              italian: 'Monitoraggio',
              pronunciation: '/\u02C8m\u0252n\u026At\u0259r\u026A\u014B/',
              phonetic: 'MO-ni-to-ring',
              example:
                'Setup monitoring to track server health. = Configura il monitoraggio per tracciare la salute del server.',
              context: 'operations',
              difficulty: 'beginner',
              code: `# prometheus.yml — scrape app metrics every 15s
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'api'
    static_configs:
      - targets: ['api.prod.svc.cluster.local:9090']
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node1:9100', 'node2:9100']`,
              task: `Configura Prometheus per raccogliere le metriche dell'API e dei node exporter ogni 15 secondi, così da poter monitorare in tempo reale lo stato dei server.`,
            },
            {
              english: 'Alerting',
              italian: 'Allarmistica / Alerting',
              pronunciation: '/\u0259\u02C8l\u025C\u02D0rt\u026A\u014B/',
              phonetic: 'a-LER-ting',
              example:
                "Proper alerting wakes up the on-call engineer within minutes when a critical service goes down. = Un alerting adeguato sveglia l'ingegnere reperibile in pochi minuti quando un servizio critico va gi\u00F9.",
              context: 'operations',
              difficulty: 'intermediate',
              code: `# alertmanager rules
groups:
  - name: api-alerts
    rules:
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
        for: 10m
        labels: { severity: critical }
        annotations:
          summary: 'API error rate sopra il 5% per 10 minuti'`,
              task: `Definisci una regola di alerting che notifichi il team di reperibilità quando il tasso di errori 5xx dell'API supera il 5% per più di 10 minuti.`,
            },
            {
              english: 'Logging',
              italian: 'Registrazione Eventi / Logging',
              pronunciation: '/\u02C8l\u0252\u0261\u026A\u014B/',
              phonetic: 'LOG-ghing',
              example:
                'Structured logging with correlation IDs lets you trace a single request across dozens of microservices. = Il logging strutturato con ID di correlazione permette di tracciare una singola richiesta attraverso decine di microservizi.',
              context: 'operations',
              difficulty: 'beginner',
              code: `import pino from 'pino';
const logger = pino({ level: 'info' });
app.use((req, res, next) => {
  req.log = logger.child({ requestId: req.headers['x-request-id'] });
  req.log.info({ method: req.method, url: req.url }, 'incoming request');
  next();
});`,
              task: 'Aggiungi un middleware Express che produca log strutturati in JSON associando a ogni richiesta un request-id, così da poter tracciare ogni chiamata nei microservizi.',
            },
            {
              english: 'SRE (Site Reliability Engineering)',
              italian: 'Ingegneria Affidabilit\u00E0 Sito',
              pronunciation: '/\u02CCes \u02CC\u0251\u02D0r \u02C8i\u02D0/',
              phonetic: 'es-ar-II',
              example:
                "SRE uses software engineering to solve operations problems. = L'SRE usa l'ingegneria del software per risolvere problemi operativi.",
              context: 'career',
              difficulty: 'advanced',
              note: 'Disciplina creata da Google per gestire sistemi su larga scala.',
            },
            {
              english: 'Metrics (KPI)',
              italian: 'Metriche / Indicatori',
              pronunciation: '/\u02C8metr\u026Aks/',
              phonetic: 'ME-triks',
              example:
                "Collect metrics like CPU usage and response time. = Raccogli metriche come l'uso della CPU e il tempo di risposta.",
              context: 'operations',
              difficulty: 'intermediate',
              code: `import client from 'prom-client';
const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durata delle richieste HTTP in secondi',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});
app.use((req, res, next) => {
  const end = httpDuration.startTimer();
  res.on('finish', () => end({ method: req.method, route: req.route?.path, status: res.statusCode }));
  next();
});`,
              task: 'Esponi una metrica Prometheus che misuri la durata delle richieste HTTP per metodo, rotta e status code, così da poter calcolare le percentili di latenza.',
            },
            {
              english: 'Observability',
              italian: 'Osservabilit\u00E0',
              pronunciation: '/\u0259b\u02CCz\u025C\u02D0rv\u0259\u02C8b\u026Al\u0259ti/',
              phonetic: 'ob-ser-va-BI-li-ti',
              example:
                'True observability combines logs, metrics, and traces so you can diagnose problems you never anticipated. = La vera osservabilit\u00E0 combina log, metriche e tracce cos\u00EC puoi diagnosticare problemi che non avevi mai previsto.',
              context: 'operations',
              difficulty: 'advanced',
              note: 'Capacit\u00E0 di capire lo stato interno di un sistema basandosi solo sui dati esterni (log, metriche, tracce).',
              code: `import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: 'http://collector:4318/v1/traces' }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();`,
              task: `Strumenta l'applicazione Node con OpenTelemetry per inviare automaticamente trace, log e metriche al collector centrale e diagnosticare anche problemi non previsti.`,
            },
            {
              english: 'Distributed Tracing',
              italian: 'Tracciamento Distribuito',
              pronunciation:
                '/d\u026A\u02C8str\u026Abju\u02D0t\u026Ad \u02C8tre\u026As\u026A\u014B/',
              phonetic: 'di-STRI-biu-ted TREI-sing',
              example:
                'Use distributed tracing to follow a request through microservices. = Usa il tracciamento distribuito per seguire una richiesta tra i microservizi.',
              context: 'architecture',
              difficulty: 'expert',
              code: `import { trace, context } from '@opentelemetry/api';
const tracer = trace.getTracer('payments-service');
async function processPayment(order) {
  return tracer.startActiveSpan('processPayment', async (span) => {
    span.setAttribute('order.id', order.id);
    try {
      const result = await chargeCard(order);
      span.setStatus({ code: 1 });
      return result;
    } finally {
      span.end();
    }
  });
}`,
              task: `Avvolgi la funzione processPayment in uno span OpenTelemetry così che la richiesta venga tracciata da un microservizio all'altro e si possa ricostruire l'intero percorso.`,
            },
            {
              english: 'Health Check',
              italian: 'Controllo dello Stato / Salute',
              pronunciation: '/hel\u03B8 t\u0283ek/',
              phonetic: 'HELTH ceck',
              example:
                'The load balancer uses a health check to skip dead nodes. = Il bilanciatore usa un health check per saltare i nodi morti.',
              context: 'infrastructure',
              difficulty: 'intermediate',
              code: `app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    await redis.ping();
    res.status(200).json({ status: 'healthy', uptime: process.uptime() });
  } catch (err) {
    res.status(503).json({ status: 'unhealthy', error: err.message });
  }
});`,
              task: 'Esponi un endpoint /health che verifichi la connettività al database e a Redis, rispondendo 503 se una delle dipendenze critiche è giù così che il load balancer possa escludere il nodo.',
            },
            {
              english: 'SLO (Service Level Objective)',
              italian: 'Obiettivo Livello Servizio',
              pronunciation: '/\u02CCes \u02CCel \u02C8o\u028A/',
              phonetic: 'es-el-OU',
              example:
                'Set an SLO of 99.9 percent availability and let the error budget tell you when to slow down feature work to invest in reliability. = Imposta un SLO del 99,9 percento di disponibilità e lascia che il budget degli errori ti dica quando rallentare il lavoro sulle feature per investire in affidabilità.',
              context: 'management',
              difficulty: 'advanced',
              code: `# Sloth SLO definition
version: prometheus/v1
service: api
slos:
  - name: availability
    objective: 99.9
    description: 'Il 99.9% delle richieste deve avere successo nei 30 giorni'
    sli:
      events:
        error_query: sum(rate(http_requests_total{status=~"5.."}[{{.window}}]))
        total_query: sum(rate(http_requests_total[{{.window}}]))`,
              task: `Definisci un SLO di disponibilità al 99.9% per l'API misurato sul rapporto tra errori 5xx e richieste totali, su una finestra mobile di 30 giorni.`,
            },
            {
              english: 'Error Budget',
              italian: 'Budget degli Errori',
              pronunciation: '/\u02C8er\u0259r \u02C8b\u028Ad\u0292\u026At/',
              phonetic: 'E-rror BA-get',
              example:
                'The error budget allows for a certain amount of downtime. = Il budget degli errori permette una certa quantit\u00E0 di inattivit\u00E0.',
              context: 'operations',
              difficulty: 'expert',
              note: 'Concetto SRE: se hai ancora budget, puoi fare nuovi deploy; se \u00E8 finito, devi fermarti e stabilizzare.',
              code: `# Prometheus alert when error budget is burning too fast
groups:
  - name: slo-burn
    rules:
      - alert: ErrorBudgetBurnFast
        expr: |
          (
            sum(rate(http_requests_total{status=~"5.."}[1h]))
            / sum(rate(http_requests_total[1h]))
          ) > (14.4 * 0.001)
        for: 5m
        annotations:
          summary: 'Il budget di errori del mese verrà bruciato in 2 giorni'`,
              task: `Configura un alert di burn-rate che avvisi quando l'errore istantaneo brucerebbe l'intero budget mensile dell'SLO 99.9% in meno di due giorni.`,
            },
          ],
        },
      ],
    },
    7: {
      name: 'Sicurezza Software / Software Security',
      description: 'Sicurezza nello sviluppo software',
      lessons: [
        {
          id: 'dev_sec_vulns',
          title: 'Vulnerabilit\u00E0 / Vulnerabilities',
          description: 'CVE, OWASP, injection...',
          items: [
            {
              english: 'Vulnerability',
              italian: 'Vulnerabilit\u00E0',
              pronunciation: '/\u02CCv\u028Cln\u0259r\u0259\u02C8b\u026Al\u0259ti/',
              phonetic: 'val-ne-re-BI-li-ti',
              example:
                'Triage every newly reported vulnerability by CVSS score and exposure, so the security team patches what attackers are most likely to exploit. = Fai triage di ogni vulnerabilità appena segnalata per punteggio CVSS ed esposizione, così il team di sicurezza patcha ciò che gli aggressori hanno più probabilità di sfruttare.',
              context: 'security',
              difficulty: 'beginner',
              note: 'Una falla nel software che pu\u00F2 essere sfruttata da un attaccante.',
            },
            {
              english: 'Exploit',
              italian: 'Sfruttamento (exploit)',
              pronunciation: '/\u026Ak\u02C8spl\u0254\u026At/',
              phonetic: 'ik-SPLOIT',
              example:
                'An attacker used a known exploit against the unpatched server and gained full access in minutes. = Un attaccante ha usato un exploit noto contro il server non aggiornato e ha ottenuto accesso completo in pochi minuti.',
              context: 'security',
              difficulty: 'intermediate',
              note: 'Codice o tecnica usata per sfruttare una specifica vulnerabilit\u00E0.',
            },
            {
              english: 'Threat Actor',
              italian: 'Attore di Minaccia',
              pronunciation: '/\u03B8ret \u02C8\u00E6kt\u0259r/',
              phonetic: 'THRET AC-ter',
              example:
                "Identify the threat actor behind the attack. = Identifica l'attore di minaccia dietro l'attacco.",
              context: 'security',
              difficulty: 'intermediate',
            },
            {
              english: 'CVE (Common Vulnerabilities and Exposures)',
              italian: 'Catalogo vulnerabilit\u00E0 (CVE)',
              pronunciation: '/\u02CCsi\u02D0 vi\u02D0 \u02C8i\u02D0/',
              phonetic: 'sii-vii-II',
              example:
                'Check the CVE database for known issues. = Controlla il database CVE per problemi noti.',
              context: 'standards',
              difficulty: 'intermediate',
              note: 'Un identificatore unico per ogni vulnerabilit\u00E0 nota (es. CVE-2023-1234).',
              command: 'grype dir:. --fail-on high',
              task: 'Scansiona la directory corrente alla ricerca di CVE note nelle dipendenze e fai fallire il comando se viene trovata almeno una vulnerabilità di severità alta.',
            },
            {
              english: 'CVSS (Common Vulnerability Scoring System)',
              italian: 'Punteggio vulnerabilit\u00E0 (CVSS)',
              pronunciation: '/\u02CCsi\u02D0 vi\u02D0 es \u02C8es/',
              phonetic: 'sii-vii-es-ES',
              example:
                'A CVSS score above 9.0 typically triggers an emergency response, while lower scores can wait for the next regular patch cycle. = Un punteggio CVSS sopra 9.0 tipicamente attiva una risposta di emergenza, mentre punteggi più bassi possono aspettare il prossimo ciclo di patch regolare.',
              context: 'standards',
              difficulty: 'advanced',
              note: 'Sistema standard per misurare la gravit\u00E0 di una vulnerabilit\u00E0.',
            },
            {
              english: 'Buffer Overflow',
              italian: 'Traboccamento (buffer overflow)',
              pronunciation: '/\u02C8b\u028Cf\u0259r \u02CCo\u028Av\u0259r\u02C8flo\u028A/',
              phonetic: 'BA-fer OU-ver-flou',
              example:
                'Languages like C are susceptible to buffer overflow because they do not check array bounds at runtime. = Linguaggi come il C sono suscettibili al buffer overflow perch\u00E9 non controllano i limiti degli array a runtime.',
              context: 'security',
              difficulty: 'advanced',
              note: 'Succede quando si scrivono pi\u00F9 dati di quanti un buffer possa contenere.',
              code: `// VULNERABILE: strcpy non controlla i limiti
void bad(const char *input) {
  char buf[16];
  strcpy(buf, input); // overflow se input > 15 byte
}
// SICURO: usa strncpy e termina sempre la stringa
void good(const char *input) {
  char buf[16];
  strncpy(buf, input, sizeof(buf) - 1);
  buf[sizeof(buf) - 1] = '\\0';
}`,
              task: 'Sostituisci la chiamata vulnerabile a strcpy con strncpy limitando la copia alla dimensione del buffer di destinazione e garantendo la terminazione della stringa, per prevenire il buffer overflow.',
            },
            {
              english: 'Race Condition',
              italian: 'Concorrenza errata (race condition)',
              pronunciation: '/re\u026As k\u0259n\u02C8d\u026A\u0283\u0259n/',
              phonetic: 'REIS con-DI-scion',
              example:
                'A race condition can lead to unpredictable behavior. = Una race condition pu\u00F2 portare a comportamenti imprevedibili.',
              context: 'development',
              difficulty: 'advanced',
              note: "Vulnerabilit\u00E0 che avviene quando l'esito dipende dall'ordine non sincronizzato di esecuzione.",
              code: `import { Mutex } from 'async-mutex';
const mutex = new Mutex();
async function withdraw(accountId, amount) {
  return mutex.runExclusive(async () => {
    const balance = await db.getBalance(accountId);
    if (balance < amount) throw new Error('Saldo insufficiente');
    await db.setBalance(accountId, balance - amount);
  });
}`,
              task: 'Proteggi la funzione di prelievo con un mutex così che due richieste concorrenti non possano leggere lo stesso saldo e prelevare due volte (race condition TOCTOU).',
            },
            {
              english: 'Logical Vulnerability',
              italian: 'Vulnerabilit\u00E0 Logica',
              pronunciation:
                '/\u02C8l\u0252d\u0292\u026Akl \u02CCv\u028Cln\u0259r\u0259\u02C8b\u026Al\u0259ti/',
              phonetic: 'LO-gi-cal val-ne-re-BI-li-ti',
              example:
                'Logical vulnerabilities are hard to find with scanners. = Le vulnerabilit\u00E0 logiche sono difficili da trovare con gli scanner.',
              context: 'security',
              difficulty: 'advanced',
              note: "Errori nel flusso logico dell'app (es. saltare un passaggio di pagamento).",
            },
            {
              english: 'Zero-day Exploit',
              italian: 'Exploit Zero-day',
              pronunciation: '/\u02C8z\u026A\u0259ro\u028A de\u026A \u026Ak\u02C8spl\u0254\u026At/',
              phonetic: 'SI-rou dei ik-SPLOIT',
              example:
                "The attacker used a zero-day exploit to breach the system. = L'attaccante ha usato un exploit zero-day per violare il sistema.",
              context: 'security',
              difficulty: 'intermediate',
            },
            {
              english: 'Injection',
              italian: 'Iniezione / Injection',
              pronunciation: '/\u026An\u02C8d\u0292ek\u0283\u0259n/',
              phonetic: 'in-GEK-scion',
              example:
                "Using parameterized queries prevents injection attacks where malicious SQL is embedded in user input. = L'uso di query parametrizzate previene attacchi di injection in cui SQL malevolo \u00E8 incorporato nell'input utente.",
              context: 'security',
              difficulty: 'beginner',
              code: `// VULNERABILE: concatenazione di stringhe nella query
const q = \`SELECT * FROM users WHERE email = '\${email}'\`;
// SICURO: query parametrizzata
const { rows } = await db.query(
  'SELECT id, email FROM users WHERE email = $1',
  [email],
);`,
              task: `Sostituisci la concatenazione di stringhe nella query SQL con una query parametrizzata che passi l'email come parametro $1, eliminando il rischio di SQL injection.`,
            },
          ],
        },
        {
          id: 'dev_sec_auth',
          title: 'Auth & Crypto',
          description: 'Authentication, encryption, hashing...',
          items: [
            {
              english: 'RBAC (Role-Based Access Control)',
              italian: 'Controllo Accessi Basato su Ruoli',
              pronunciation: '/\u02CC\u0251\u02D0r bi\u02D0 e\u026A \u02C8si\u02D0/',
              phonetic: 'ar-bii-ei-SII',
              example:
                "Implement RBAC to manage user permissions efficiently. = Implementa l'RBAC per gestire i permessi utente in modo efficiente.",
              context: 'security',
              difficulty: 'intermediate',
              code: `function requireRole(...allowed) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).end();
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permessi insufficienti' });
    }
    next();
  };
}
app.delete('/users/:id', requireRole('admin'), deleteUser);`,
              task: 'Crea un middleware RBAC che blocchi con 403 chi non possiede uno dei ruoli abilitati e applicalo alla rotta di cancellazione utenti consentendola solo agli admin.',
            },
            {
              english: 'ABAC (Attribute-Based Access Control)',
              italian: 'Controllo Accessi Basato su Attributi',
              pronunciation: '/\u02CCe\u026A bi\u02D0 e\u026A \u02C8si\u02D0/',
              phonetic: 'ei-bii-ei-SII',
              example: `ABAC evaluates rules over user attributes, resource tags, and request context, so policies can express conditions like 'only during work hours from the corporate network'. = ABAC valuta regole su attributi utente, tag della risorsa e contesto della richiesta, così le policy possono esprimere condizioni come 'solo durante l'orario di lavoro dalla rete aziendale'.`,
              context: 'security',
              difficulty: 'advanced',
              code: `# policy.rego — OPA Rego ABAC policy
package authz
default allow = false
allow {
  input.user.department == input.resource.department
  time.weekday(time.now_ns()) >= 1
  time.weekday(time.now_ns()) <= 5
  net.cidr_contains("10.0.0.0/8", input.request.source_ip)
}`,
              task: `Scrivi una policy Rego ABAC che permetta l'accesso solo se l'utente appartiene allo stesso dipartimento della risorsa, dal lunedì al venerdì, e solo da IP della rete aziendale.`,
            },
            {
              english: 'Stateless Authentication',
              italian: 'Autenticazione Senza Stato',
              pronunciation:
                '/\u02C8ste\u026Atles \u0254\u02D0\u02CC\u03B8ent\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'STEIT-les o-then-ti-KEI-scion',
              example:
                "With stateless authentication, the server validates a signed JWT token instead of storing session data. = Con l'autenticazione stateless, il server valida un token JWT firmato invece di salvare dati di sessione.",
              context: 'backend',
              difficulty: 'advanced',
              note: 'Il server non salva sessioni; tutte le info sono nel token inviato dal client.',
              code: `import jwt from 'jsonwebtoken';
function issueToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m', issuer: 'api.acme.io' },
  );
}
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET, { issuer: 'api.acme.io' });
    next();
  } catch {
    res.status(401).end();
  }
}`,
              task: 'Implementa autenticazione stateless emettendo un JWT firmato con scadenza 15 minuti e validandolo a ogni richiesta senza salvare alcuna sessione lato server.',
            },
            {
              english: 'Bcrypt / Argon2',
              italian: 'Funzioni di Hashing per Password',
              pronunciation: '/\u02C8bi\u02D0kr\u026Apt/',
              phonetic: 'BII-cript',
              example:
                "Use Bcrypt or Argon2 for hashing passwords. = Usa Bcrypt o Argon2 per l'hashing delle password.",
              context: 'security',
              difficulty: 'advanced',
              note: 'Algoritmi progettati per essere lenti e resistere ad attacchi di forza bruta.',
              code: `import argon2 from 'argon2';
async function hashPassword(plain) {
  return argon2.hash(plain, {
    type: argon2.argon2id,
    memoryCost: 19456, // 19 MiB
    timeCost: 2,
    parallelism: 1,
  });
}
async function verifyPassword(plain, hash) {
  return argon2.verify(hash, plain);
}`,
              task: `Calcola l'hash della password dell'utente con Argon2id usando 19 MiB di memoria e 2 iterazioni, e fornisci la funzione di verifica corrispondente al login.`,
            },
            {
              english: 'Salt (Password Salting)',
              italian: 'Salatura delle Password',
              pronunciation: '/s\u0254\u02D0lt/',
              phonetic: 'SOLT',
              example:
                'A unique salt prevents rainbow table attacks. = Un salt unico previene gli attacchi con rainbow table.',
              context: 'security',
              difficulty: 'intermediate',
              code: `import bcrypt from 'bcrypt';
const SALT_ROUNDS = 12;
async function register(email, plainPassword) {
  // bcrypt genera automaticamente un salt unico e lo include nell'hash
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  await db.users.insert({ email, password_hash: hash });
}`,
              task: `Esegui l'hash della password al momento della registrazione con bcrypt a 12 round, sfruttando il salt unico generato automaticamente per neutralizzare attacchi con rainbow table.`,
            },
            {
              english: 'Secret Management',
              italian: 'Gestione dei Segreti',
              pronunciation: '/\u02C8si\u02D0kr\u0259t \u02C8m\u00E6n\u026Ad\u0292m\u0259nt/',
              phonetic: 'SII-cret MAN-ig-ment',
              example:
                'Proper secret management keeps API keys and passwords out of source code and rotates them automatically. = Una corretta gestione dei segreti tiene le chiavi API e le password fuori dal codice sorgente e le ruota automaticamente.',
              context: 'devops',
              difficulty: 'advanced',
              note: 'Gestire chiavi API, password e certificati in modo sicuro e centralizzato.',
              command: 'vault kv get -field=password secret/prod/db',
              task: `Recupera in modo sicuro la password del database di produzione da HashiCorp Vault, evitando di salvarla nel codice o nelle variabili d'ambiente del repository.`,
            },
            {
              english: 'CSRF (Cross-Site Request Forgery)',
              italian: 'Falsificazione Richiesta tra Siti',
              pronunciation: '/\u02CCsi\u02D0 es \u02CC\u0251\u02D0r \u02CCef/',
              phonetic: 'sii-es-ar-EF',
              example:
                'CSRF tricks a user into performing unwanted actions. = La CSRF inganna un utente facendogli compiere azioni non volute.',
              context: 'security',
              difficulty: 'intermediate',
              code: `import csurf from 'csurf';
const csrfProtection = csurf({ cookie: { httpOnly: true, sameSite: 'strict' } });
app.use(csrfProtection);
app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});
app.post('/transfer', csrfProtection, transferMoney);`,
              task: 'Aggiungi protezione CSRF a Express usando un cookie httpOnly con SameSite strict, e includi il token nei form della pagina così che le richieste cross-site vengano rifiutate.',
            },
            {
              english: 'Defence in Depth',
              italian: 'Difesa in Profondit\u00E0',
              pronunciation: '/d\u026A\u02C8fens \u026An dep\u03B8/',
              phonetic: 'di-FENS in DEPTH',
              example:
                'The principle of defence in depth means that if the firewall is bypassed, encryption and access controls still protect the data. = Il principio della difesa in profondit\u00E0 significa che se il firewall viene bypassato, la crittografia e i controlli di accesso proteggono ancora i dati.',
              context: 'security',
              difficulty: 'intermediate',
            },
            {
              english: 'Secure Defaults',
              italian: 'Impostazioni Sicure Predefinite',
              pronunciation: '/s\u026A\u02C8kj\u028A\u0259r d\u026A\u02C8f\u0254\u02D0lts/',
              phonetic: 'si-KIUR di-FOLTS',
              example:
                'Build systems with secure defaults to protect users. = Costruisci sistemi con impostazioni sicure di base per proteggere gli utenti.',
              context: 'security',
              difficulty: 'beginner',
            },
            {
              english: 'Fail-Safe Defaults',
              italian: 'Fallimento Sicuro',
              pronunciation: '/fe\u026Al se\u026Af d\u026A\u02C8f\u0254\u02D0lts/',
              phonetic: 'FEIL-seif di-FOLTS',
              example:
                'A system built with fail-safe defaults blocks all access when the authentication service is unreachable, rather than allowing everyone in. = Un sistema costruito con fallimento sicuro blocca tutti gli accessi quando il servizio di autenticazione non è raggiungibile, anziché far entrare tutti.',
              context: 'security',
              difficulty: 'advanced',
              code: `async function isAuthorized(user, action) {
  try {
    const decision = await authService.check(user, action);
    return decision.allow === true;
  } catch (err) {
    logger.error({ err }, 'auth service unreachable');
    return false; // fail-safe: in caso di errore, NEGA l'accesso
  }
}`,
              task: `Implementa la funzione di autorizzazione con un default fail-safe: se il servizio di auth non risponde, nega l'accesso invece di concederlo, applicando il principio del fallimento sicuro.`,
            },
          ],
        },
        {
          id: 'dev_sec_tools',
          title: 'Strumenti Sicurezza / Security Tools',
          description: 'SAST, DAST, dependency scanning...',
          items: [
            {
              english: 'SAST (Static Application Security Testing)',
              italian: 'Test di Sicurezza Statico',
              pronunciation: '/\u02CCes e\u026A es \u02C8ti\u02D0/',
              phonetic: 'es-ei-es-TII',
              example:
                'SAST tools scan source code for vulnerabilities. = Gli strumenti SAST scansionano il codice sorgente per vulnerabilit\u00E0.',
              context: 'security-tools',
              difficulty: 'intermediate',
              note: 'Analizza il codice senza eseguirlo (white-box).',
              command: 'semgrep --config=p/owasp-top-ten --error --severity=ERROR src/',
              task: 'Esegui una scansione SAST con Semgrep sulla directory src/ usando il ruleset OWASP Top Ten e fai fallire il comando se viene trovata una vulnerabilità di severità ERROR.',
            },
            {
              english: 'DAST (Dynamic Application Security Testing)',
              italian: 'Test di Sicurezza Dinamico',
              pronunciation: '/\u02CCdi\u02D0 e\u026A es \u02C8ti\u02D0/',
              phonetic: 'dii-ei-es-TII',
              example:
                "DAST tests the running application for security holes. = Il DAST testa l'app in esecuzione per falle di sicurezza.",
              context: 'security-tools',
              difficulty: 'intermediate',
              note: "Analizza l'app dall'esterno mentre gira (black-box).",
              command:
                'docker run -t owasp/zap2docker-stable zap-baseline.py -t https://staging.acme.io -r zap-report.html',
              task: `Lancia una scansione DAST con OWASP ZAP in modalità baseline contro l'ambiente di staging e salva il report HTML con le vulnerabilità trovate sull'applicazione in esecuzione.`,
            },
            {
              english: 'SCA (Software Composition Analysis)',
              italian: 'Analisi Composizione Software',
              pronunciation: '/\u02CCes si\u02D0 \u02C8e\u026A/',
              phonetic: 'es-sii-EI',
              example:
                'SCA tools identify vulnerable open-source libraries. = Gli strumenti SCA identificano librerie open-source vulnerabili.',
              context: 'security-tools',
              difficulty: 'intermediate',
              command: 'snyk test --severity-threshold=high --all-projects',
              task: `Esegui un'analisi SCA con Snyk su tutti i progetti della repository segnalando solo le vulnerabilità di severità alta o critica nelle librerie open-source usate.`,
            },
            {
              english: 'Dependency Scanning',
              italian: 'Scansione delle Dipendenze',
              pronunciation: '/d\u026A\u02C8pend\u0259nsi \u02C8sk\u00E6n\u026A\u014B/',
              phonetic: 'de-PEN-den-si SKA-ning',
              example:
                'Github provides automatic dependency scanning. = Github fornisce la scansione automatica delle dipendenze.',
              context: 'security-tools',
              difficulty: 'beginner',
              command: 'npm audit --audit-level=high --production',
              task: `Lancia npm audit limitando l'output alle vulnerabilità di severità alta nelle sole dipendenze di produzione, da integrare nella pipeline CI.`,
            },
            {
              english: 'Secret Scanning',
              italian: 'Scansione dei Segreti',
              pronunciation: '/\u02C8si\u02D0kr\u0259t \u02C8sk\u00E6n\u026A\u014B/',
              phonetic: 'SII-cret SKA-ning',
              example:
                'Automated secret scanning caught a developer who accidentally committed an AWS access key to a public repo. = La scansione automatica dei segreti ha intercettato uno sviluppatore che aveva accidentalmente committato una chiave di accesso AWS in una repo pubblica.',
              context: 'security-tools',
              difficulty: 'beginner',
              command:
                'gitleaks detect --source . --report-format sarif --report-path gitleaks.sarif',
              task: 'Scansiona la repository alla ricerca di segreti committati per errore (chiavi API, token, password) generando un report SARIF da caricare nella dashboard di sicurezza.',
            },
            {
              english: 'Penetration Testing (Pen Test)',
              italian: 'Test di Penetrazione',
              pronunciation: '/\u02CCpen\u026A\u02C8tre\u026A\u0283\u0259n \u02C8test\u026A\u014B/',
              phonetic: 'pe-ne-TREI-scion TES-ting',
              example:
                'Hire a professional for periodic penetration testing. = Assumi un professionista per test di penetrazione periodici.',
              context: 'security-services',
              difficulty: 'intermediate',
              note: 'Un attacco simulato autorizzato per trovare debolezze.',
              command: 'nmap -sV -sC -p- --open -oN pentest-recon.txt target.acme.io',
              task: 'Avvia la fase di ricognizione di un penetration test eseguendo una scansione Nmap di tutte le porte aperte del target con identificazione di versione dei servizi e script di default.',
            },
            {
              english: 'Bug Bounty',
              italian: 'Premio per Bug / Bug Bounty',
              pronunciation: '/b\u028C\u0261 \u02C8ba\u028Anti/',
              phonetic: 'BAG BAUN-ti',
              example:
                "The company launched a bug bounty program. = L'azienda ha lanciato un programma di bug bounty.",
              context: 'security-services',
              difficulty: 'beginner',
              note: 'Ricompensa economica per chi trova e segnala bug di sicurezza.',
            },
            {
              english: 'Vulnerability Management',
              italian: 'Gestione delle Vulnerabilit\u00E0',
              pronunciation:
                '/\u02CCv\u028Cln\u0259r\u0259\u02C8b\u026Al\u0259ti \u02C8m\u00E6n\u026Ad\u0292m\u0259nt/',
              phonetic: 'val-ne-re-BI-li-ti MAN-ig-ment',
              example:
                'An effective vulnerability management program identifies, prioritises, and patches security flaws before attackers can exploit them. = Un efficace programma di gestione delle vulnerabilit\u00E0 identifica, d\u00E0 priorit\u00E0 e corregge le falle di sicurezza prima che gli attaccanti possano sfruttarle.',
              context: 'management',
              difficulty: 'intermediate',
            },
            {
              english: 'IAST (Interactive AST)',
              italian: 'AST interattivo (IAST)',
              pronunciation: '/\u02CCa\u026A e\u026A es \u02C8ti\u02D0/',
              phonetic: 'ai-ei-es-TII',
              example:
                'IAST combines elements of SAST and DAST. = Lo IAST combina elementi di SAST e DAST.',
              context: 'security-tools',
              difficulty: 'expert',
            },
            {
              english: 'Fuzzing Tool',
              italian: 'Strumento di Fuzzing',
              pronunciation: '/\u02C8f\u028Cz\u026A\u014B tu\u02D0l/',
              phonetic: 'FA-zing tuul',
              example:
                'Use a fuzzing tool to find crashes in your API. = Usa uno strumento di fuzzing per trovare crash nelle tue API.',
              context: 'security-tools',
              difficulty: 'advanced',
              command: 'afl-fuzz -i tests/seeds -o tests/findings -- ./parser @@',
              task: 'Lancia AFL++ contro il binario parser usando i file di seed come input iniziali e salva crash e hang trovati nella directory tests/findings.',
            },
          ],
        },
        {
          id: 'dev_sec_practices',
          title: 'Pratiche Sicure / Secure Practices',
          description: 'Secret management, input validation...',
          items: [
            {
              english: 'Secure Coding',
              italian: 'Programmazione Sicura',
              pronunciation: '/s\u026A\u02C8kj\u028A\u0259r \u02C8ko\u028Ad\u026A\u014B/',
              phonetic: 'si-KIUR KOU-ding',
              example:
                "Following secure coding guidelines like input validation and parameterized queries prevents most common vulnerabilities. = Seguire le linee guida di programmazione sicura come validazione dell'input e query parametrizzate previene la maggior parte delle vulnerabilit\u00E0 comuni.",
              context: 'development',
              difficulty: 'beginner',
            },
            {
              english: 'Input Validation',
              italian: "Validazione dell'Input",
              pronunciation:
                '/\u02C8\u026Anp\u028At \u02CCv\u00E6l\u026A\u02C8de\u026A\u0283\u0259n/',
              phonetic: 'IN-put va-li-DEI-scion',
              example:
                "Always perform input validation on the server side. = Esegui sempre la validazione dell'input lato server.",
              context: 'security',
              difficulty: 'beginner',
              code: `import { z } from 'zod';
const userSchema = z.object({
  email: z.string().email(),
  age: z.number().int().min(18).max(120),
  role: z.enum(['user', 'admin']),
});
app.post('/users', (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error.flatten());
  createUser(result.data);
  res.status(201).end();
});`,
              task: 'Valida ogni richiesta POST /users contro uno schema Zod che imponga email valida, età tra 18 e 120 e ruolo tra valori consentiti, restituendo 400 se i dati non rispettano il contratto.',
            },
            {
              english: 'Output Encoding',
              italian: "Codifica dell'Output",
              pronunciation: '/\u02C8a\u028Atp\u028At \u026An\u02C8ko\u028Ad\u026A\u014B/',
              phonetic: 'AUT-put in-KOU-ding',
              example:
                "Applying output encoding before rendering user content in HTML prevents cross-site scripting attacks. = Applicare la codifica dell'output prima di mostrare contenuto utente nell'HTML previene attacchi di cross-site scripting.",
              context: 'security',
              difficulty: 'intermediate',
              code: `import escapeHtml from 'escape-html';
function renderComment(comment) {
  // PERICOLOSO: \`<div>\${comment.text}</div>\` permette XSS
  // SICURO: codifica l'output prima di iniettarlo nell'HTML
  return \`<div class="comment">\${escapeHtml(comment.text)}</div>\`;
}`,
              task: 'Codifica il testo del commento utente con escape-html prima di iniettarlo nella pagina, neutralizzando i caratteri speciali e prevenendo attacchi XSS riflessi e persistenti.',
            },
            {
              english: 'Secure SDLC',
              italian: 'SDLC Sicuro',
              pronunciation: '/s\u026A\u02C8kj\u028A\u0259r \u02CCes di\u02D0 el \u02C8si\u02D0/',
              phonetic: 'si-KIUR es-dii-el-SII',
              example:
                'Integrate security into every phase of the secure SDLC. = Integra la sicurezza in ogni fase del SDLC sicuro.',
              context: 'methodology',
              difficulty: 'advanced',
              note: "Software Development Life Cycle con la sicurezza integrata fin dall'inizio.",
            },
            {
              english: 'Threat Modeling',
              italian: 'Modellazione delle Minacce',
              pronunciation: '/\u03B8ret \u02C8m\u0252d\u0259l\u026A\u014B/',
              phonetic: 'THRET MO-de-ling',
              example:
                'During the design phase, threat modeling reveals which components are most exposed to attack. = Durante la fase di progettazione, la modellazione delle minacce rivela quali componenti sono più esposti agli attacchi.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'STRIDE',
              italian: 'Modello STRIDE',
              pronunciation: '/stra\u026Ad/',
              phonetic: 'STRAID',
              example:
                'Using the STRIDE framework, the team categorised threats as Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, or Elevation of Privilege. = Usando il framework STRIDE, il team ha categorizzato le minacce come Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service o Elevation of Privilege.',
              context: 'standards',
              difficulty: 'expert',
              note: 'Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege.',
            },
            {
              english: 'Code Signing',
              italian: 'Firma del Codice',
              pronunciation: '/ko\u028Ad \u02C8sa\u026An\u026A\u014B/',
              phonetic: 'KOUD SAIN-ing',
              example:
                "Before installing the update, the OS verifies the code signing certificate to ensure the binary was not tampered with. = Prima di installare l'aggiornamento, il sistema operativo verifica il certificato di firma del codice per assicurarsi che il binario non sia stato manomesso.",
              context: 'security',
              difficulty: 'intermediate',
              command: 'cosign sign --key cosign.key registry.acme.io/api:1.2.0',
              task: `Firma digitalmente l'immagine Docker 1.2.0 del servizio api con cosign usando la chiave privata aziendale, così che il cluster possa verificarne l'origine prima del deploy.`,
            },
            {
              english: 'Least Privilege (Dev)',
              italian: 'Minimo Privilegio (Dev)',
              pronunciation: '/li\u02D0st \u02C8pr\u026Av\u026Al\u026Ad\u0292/',
              phonetic: 'LIIST PRI-vi-lig',
              example:
                "The app should run with the least privilege necessary. = L'app dovrebbe girare con il minimo privilegio necessario.",
              context: 'security',
              difficulty: 'beginner',
              code: `# Dockerfile — run as a non-root user
FROM node:20-alpine
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --chown=app:app package*.json ./
RUN npm ci --omit=dev
COPY --chown=app:app . .
USER app
CMD ["node", "server.js"]`,
              task: `Modifica il Dockerfile per creare un utente non privilegiato 'app' e farlo girare il container con quell'utente, applicando il principio del minimo privilegio anche dentro il container.`,
            },
            {
              english: 'Secret Masking',
              italian: 'Mascheramento dei Segreti',
              pronunciation: '/\u02C8si\u02D0kr\u0259t \u02C8m\u0251\u02D0sk\u026A\u014B/',
              phonetic: 'SII-cret MAS-king',
              example:
                'Enable secret masking in your CI pipeline so that passwords and tokens are replaced with asterisks in build logs. = Abilita il mascheramento dei segreti nella pipeline CI così che password e token vengano sostituiti con asterischi nei log di build.',
              context: 'security',
              difficulty: 'intermediate',
              code: `# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Mask custom token
        run: echo "::add-mask::\${{ secrets.DEPLOY_TOKEN }}"
      - name: Deploy
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}
        run: ./deploy.sh`,
              task: 'Aggiungi nel workflow di deploy un comando add-mask che istruisca GitHub Actions a sostituire con asterischi qualsiasi occorrenza del token nei log della build.',
            },
            {
              english: 'Hardened Pipeline',
              italian: 'Pipeline Rafforzata / Hardened',
              pronunciation: '/\u02C8h\u0251\u02D0rdnd \u02C8pa\u026Apla\u026An/',
              phonetic: 'HAR-dend PAIP-lain',
              example:
                'A hardened pipeline protects the software supply chain. = Una pipeline hardened protegge la catena di approvvigionamento del software.',
              context: 'devops',
              difficulty: 'advanced',
              code: `# .github/workflows/release.yml — hardened CI/CD
permissions:
  contents: read
  id-token: write  # per OIDC verso il cloud
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: false
      - uses: step-security/harden-runner@v2
        with:
          egress-policy: block
          allowed-endpoints: registry.npmjs.org github.com
      - run: npm ci --ignore-scripts
      - run: npm test
      - uses: sigstore/cosign-installer@v3
      - run: cosign sign --yes ghcr.io/acme/api:\${{ github.sha }}`,
              task: `Rendi una pipeline GitHub Actions hardened riducendo i permessi al minimo, bloccando il traffico in uscita non autorizzato, disattivando gli script delle dipendenze e firmando l'artefatto con cosign.`,
            },
          ],
        },
      ],
    },
    8: {
      name: 'Design Patterns',
      description: 'I pattern di progettazione del software',
      lessons: [
        {
          id: 'dev_pattern_creational',
          title: 'Creazionali / Creational',
          description: 'Singleton, factory, builder...',
          items: [
            {
              english: 'Creational Pattern',
              italian: 'Pattern Creazionale',
              pronunciation: '/kri\u02C8e\u026A\u0283\u0259nl \u02C8p\u00E6t\u0259rn/',
              phonetic: 'cri-EI-scion-al PAT-tern',
              example:
                'Choosing a creational pattern like Factory or Builder isolates the rest of the code from the details of how objects come to life. = Scegliere un pattern creazionale come Factory o Builder isola il resto del codice dai dettagli di come gli oggetti vengono creati.',
              context: 'design-patterns',
              difficulty: 'intermediate',
            },
            {
              english: 'Singleton',
              italian: 'Istanza unica (singleton)',
              pronunciation: '/\u02C8s\u026A\u014B\u026Alt\u0259n/',
              phonetic: 'SIN-gel-ton',
              example:
                'The Singleton pattern restricts a class to a single instance. = Il pattern Singleton limita una classe a una sola istanza.',
              context: 'design-patterns',
              difficulty: 'intermediate',
              code: `class Logger {
  private static instance: Logger;
  private constructor() {}
  static getInstance(): Logger {
    return Logger.instance ??= new Logger();
  }
  log(message: string): void {
    console.log(\`[\${new Date().toISOString()}] \${message}\`);
  }
}`,
              task: 'Implementa il pattern Singleton per il Logger usando un metodo statico getInstance che restituisce sempre la stessa istanza condivisa.',
            },
            {
              english: 'Factory Method',
              italian: 'Metodo Fabbrica / Factory Method',
              pronunciation: '/\u02C8f\u00E6kt\u0259ri \u02C8me\u03B8\u0259d/',
              phonetic: 'FAC-to-ri ME-thod',
              example:
                'Instead of calling constructors directly, use a factory method to let subclasses decide which class to instantiate. = Invece di chiamare i costruttori direttamente, usa un metodo factory per lasciare alle sottoclassi la scelta della classe da istanziare.',
              context: 'design-patterns',
              difficulty: 'advanced',
              code: `abstract class Document {
  abstract export(): Buffer;
}
class PdfDocument extends Document { export() { return Buffer.from('pdf'); } }
class DocxDocument extends Document { export() { return Buffer.from('docx'); } }

class DocumentFactory {
  static create(type: 'pdf' | 'docx'): Document {
    return type === 'pdf' ? new PdfDocument() : new DocxDocument();
  }
}`,
              task: 'Implementa un Factory Method che decide quale sottoclasse di Document istanziare in base al tipo richiesto, senza esporre i costruttori concreti al client.',
            },
            {
              english: 'Abstract Factory',
              italian: 'Fabbrica Astratta',
              pronunciation: '/\u00E6b\u02C8str\u00E6kt \u02C8f\u00E6kt\u0259ri/',
              phonetic: 'AB-strakt FAC-to-ri',
              example:
                'An abstract factory lets you create platform-specific UI elements without coupling the client code to concrete classes. = Una abstract factory ti permette di creare elementi UI specifici per piattaforma senza accoppiare il codice client a classi concrete.',
              context: 'design-patterns',
              difficulty: 'expert',
              code: `interface Button { render(): string }
interface Checkbox { render(): string }

interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class MacFactory implements UIFactory {
  createButton() { return { render: () => '<MacButton/>' }; }
  createCheckbox() { return { render: () => '<MacCheckbox/>' }; }
}
class WinFactory implements UIFactory {
  createButton() { return { render: () => '<WinButton/>' }; }
  createCheckbox() { return { render: () => '<WinCheckbox/>' }; }
}`,
              task: 'Costruisci una Abstract Factory che produca famiglie di componenti UI coerenti (Button e Checkbox) per piattaforme diverse senza che il client conosca le classi concrete.',
            },
            {
              english: 'Builder',
              italian: 'Costruttore / Builder',
              pronunciation: '/\u02C8b\u026Ald\u0259r/',
              phonetic: 'BIL-der',
              example:
                'The Builder pattern allows step-by-step object construction. = Il pattern Builder permette la costruzione di oggetti passo dopo passo.',
              context: 'design-patterns',
              difficulty: 'advanced',
              note: 'Ideale per creare oggetti complessi con molti parametri opzionali.',
              code: `class HttpRequestBuilder {
  private url = '';
  private method = 'GET';
  private headers: Record<string, string> = {};
  private body?: string;

  setUrl(url: string) { this.url = url; return this; }
  setMethod(m: string) { this.method = m; return this; }
  addHeader(k: string, v: string) { this.headers[k] = v; return this; }
  setBody(b: string) { this.body = b; return this; }
  build() { return { url: this.url, method: this.method, headers: this.headers, body: this.body }; }
}

const req = new HttpRequestBuilder()
  .setUrl('/api/users')
  .setMethod('POST')
  .addHeader('Authorization', 'Bearer abc')
  .setBody('{"name":"Marco"}')
  .build();`,
              task: 'Implementa il pattern Builder per costruire una richiesta HTTP passo dopo passo con metodi a catena, separando la costruzione dalla rappresentazione finale.',
            },
            {
              english: 'Prototype',
              italian: 'Prototipo / Prototype',
              pronunciation: '/\u02C8pro\u028At\u0259ta\u026Ap/',
              phonetic: 'PROU-to-taip',
              example:
                "When creating an object is expensive, the prototype pattern clones an existing instance instead. = Quando creare un oggetto è costoso, il pattern prototype clona un'istanza esistente invece.",
              context: 'design-patterns',
              difficulty: 'advanced',
              code: `interface Cloneable<T> {
  clone(): T;
}

class Shape implements Cloneable<Shape> {
  constructor(public x: number, public y: number, public color: string) {}
  clone(): Shape {
    return new Shape(this.x, this.y, this.color);
  }
}

const original = new Shape(10, 20, 'red');
const copy = original.clone();
copy.color = 'blue';`,
              task: `Implementa il pattern Prototype tramite un metodo clone che produca una copia indipendente dell'oggetto senza ricorrere al costruttore originale.`,
            },
            {
              english: 'Object Pool',
              italian: 'Pool di Oggetti',
              pronunciation: '/\u02C8\u0252bd\u0292\u026Akt pu\u02D0l/',
              phonetic: 'OB-gect PUUL',
              example:
                "An object pool manages a set of initialized objects ready for use. = Un object pool gestisce un set di oggetti pronti all'uso.",
              context: 'design-patterns',
              difficulty: 'expert',
              note: 'Usato per migliorare le prestazioni quando creare un oggetto \u00E8 costoso (es. thread, connessioni DB).',
              code: `class ConnectionPool {
  private available: DbConnection[] = [];
  private inUse = new Set<DbConnection>();

  constructor(private size: number) {
    for (let i = 0; i < size; i++) this.available.push(new DbConnection());
  }

  acquire(): DbConnection {
    const conn = this.available.pop() ?? new DbConnection();
    this.inUse.add(conn);
    return conn;
  }

  release(conn: DbConnection): void {
    this.inUse.delete(conn);
    this.available.push(conn);
  }
}`,
              task: 'Crea un Object Pool di connessioni al database con metodi acquire e release, in modo che le connessioni vengano riutilizzate invece di essere ricreate ogni volta.',
            },
            {
              english: 'Dependency Injection',
              italian: 'Iniezione delle Dipendenze',
              pronunciation:
                '/d\u026A\u02C8p\u025Bnd\u0259nsi \u026An\u02C8d\u0292\u025Bk\u0283\u0259n/',
              phonetic: 'de-PEN-den-si in-GEK-scion',
              example:
                "With dependency injection, the class receives its collaborators from the outside instead of creating them internally. = Con la dependency injection, la classe riceve i suoi collaboratori dall'esterno invece di crearli internamente.",
              context: 'design-patterns',
              difficulty: 'advanced',
              code: `interface EmailSender {
  send(to: string, body: string): Promise<void>;
}

class NotificationService {
  constructor(private readonly sender: EmailSender) {}

  async notify(user: User, message: string) {
    await this.sender.send(user.email, message);
  }
}

// Iniezione tramite costruttore
const service = new NotificationService(new SmtpEmailSender());`,
              task: `Applica la dependency injection passando l'EmailSender al costruttore del NotificationService invece di istanziarlo internamente, cosi' la dipendenza puo' essere sostituita nei test.`,
            },
            {
              english: 'Lazy Initialization',
              italian: 'Inizializzazione Pigra / Lazy',
              pronunciation:
                '/\u02C8le\u026Azi \u026A\u02CCn\u026A\u0283\u0259la\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'LEI-si i-ni-scia-lai-ZEI-scion',
              example:
                "With lazy initialization, the database connection is created only when the first query is executed. = Con l'inizializzazione lazy, la connessione al database viene creata solo quando viene eseguita la prima query.",
              context: 'design-patterns',
              difficulty: 'advanced',
              code: `class ReportGenerator {
  private _heavyClient?: AnalyticsClient;

  private get client(): AnalyticsClient {
    if (!this._heavyClient) {
      this._heavyClient = new AnalyticsClient();
    }
    return this._heavyClient;
  }

  async build(): Promise<Report> {
    return this.client.fetchAndRender();
  }
}`,
              task: `Implementa l'inizializzazione lazy del client di analytics tramite un getter che lo crea solo alla prima chiamata, evitando di pagare il costo se il report non viene mai generato.`,
            },
            {
              english: 'Static Factory',
              italian: 'Fabbrica Statica',
              pronunciation: '/\u02C8st\u00E6t\u026Ak \u02C8f\u00E6kt\u0259ri/',
              phonetic: 'STA-tik FAC-to-ri',
              example:
                "A static factory method is a static method that returns a class instance. = Un metodo factory statico restituisce un'istanza della classe.",
              context: 'design-patterns',
              difficulty: 'intermediate',
              code: `class Color {
  private constructor(public r: number, public g: number, public b: number) {}

  static fromHex(hex: string): Color {
    const n = parseInt(hex.replace('#', ''), 16);
    return new Color((n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff);
  }

  static rgb(r: number, g: number, b: number): Color {
    return new Color(r, g, b);
  }
}

const red = Color.fromHex('#ff0000');`,
              task: 'Sostituisci i costruttori pubblici della classe Color con metodi factory statici come fromHex e rgb, in modo che il nome del metodo chiarisca quale formato di input viene usato.',
            },
          ],
        },
        {
          id: 'dev_pattern_structural',
          title: 'Strutturali / Structural',
          description: 'Adapter, facade, proxy, decorator...',
          items: [
            {
              english: 'Structural Pattern',
              italian: 'Pattern Strutturale',
              pronunciation: '/\u02C8str\u028Ckt\u0283\u0259r\u0259l \u02C8p\u00E6t\u0259rn/',
              phonetic: 'STRAC-ciur-al PAT-tern',
              example:
                'Adapter, Facade, and Decorator are classic examples of a structural pattern: each one composes existing objects into a new shape without modifying them. = Adapter, Facade e Decorator sono esempi classici di pattern strutturale: ciascuno compone oggetti esistenti in una nuova forma senza modificarli.',
              context: 'design-patterns',
              difficulty: 'intermediate',
            },
            {
              english: 'Adapter',
              italian: 'Adattatore / Adapter',
              pronunciation: '/\u0259\u02C8d\u00E6pt\u0259r/',
              phonetic: 'a-DAP-ter',
              example:
                'The Adapter pattern allows incompatible interfaces to work together. = Il pattern Adapter permette a interfacce incompatibili di lavorare insieme.',
              context: 'design-patterns',
              difficulty: 'intermediate',
              code: `// Interfaccia attesa dal client
interface PaymentGateway {
  charge(amountCents: number): Promise<string>;
}

// Libreria legacy incompatibile
class LegacyStripeClient {
  pay(amountInEuro: number, currency: string) { return Promise.resolve('txn_123'); }
}

// Adapter
class StripeAdapter implements PaymentGateway {
  constructor(private legacy: LegacyStripeClient) {}
  charge(amountCents: number) {
    return this.legacy.pay(amountCents / 100, 'EUR');
  }
}`,
              task: `Implementa un Adapter che esponga l'interfaccia PaymentGateway attesa dal client e traduca le chiamate verso un client legacy con firma incompatibile.`,
            },
            {
              english: 'Bridge',
              italian: 'Ponte / Bridge',
              pronunciation: '/br\u026Ad\u0292/',
              phonetic: 'BRIG',
              example:
                'Using the bridge pattern, you can change the rendering engine without modifying the shape hierarchy. = Usando il pattern bridge, puoi cambiare il motore di rendering senza modificare la gerarchia delle forme.',
              context: 'design-patterns',
              difficulty: 'expert',
              code: `// Implementazione (motore di rendering)
interface Renderer {
  drawCircle(x: number, y: number, r: number): void;
}
class SvgRenderer implements Renderer { drawCircle() {/* ... */} }
class CanvasRenderer implements Renderer { drawCircle() {/* ... */} }

// Astrazione (forma)
abstract class Shape {
  constructor(protected renderer: Renderer) {}
  abstract draw(): void;
}
class Circle extends Shape {
  constructor(renderer: Renderer, private radius: number) { super(renderer); }
  draw() { this.renderer.drawCircle(0, 0, this.radius); }
}`,
              task: `Separa la gerarchia delle forme dal motore di rendering con il pattern Bridge, cosi' che entrambi possano evolvere indipendentemente.`,
            },
            {
              english: 'Composite',
              italian: 'Composito / Composite',
              pronunciation: '/\u02C8k\u0252mp\u0259z\u026At/',
              phonetic: 'com-PO-sit',
              example:
                'A file system uses the composite pattern: both files and directories implement the same interface. = Un file system usa il pattern composite: sia i file che le directory implementano la stessa interfaccia.',
              context: 'design-patterns',
              difficulty: 'advanced',
              note: 'Permette di creare strutture ad albero.',
              code: `interface FileNode {
  size(): number;
}

class File implements FileNode {
  constructor(private bytes: number) {}
  size() { return this.bytes; }
}

class Directory implements FileNode {
  private children: FileNode[] = [];
  add(node: FileNode) { this.children.push(node); }
  size() { return this.children.reduce((sum, c) => sum + c.size(), 0); }
}`,
              task: `Modella un file system con il pattern Composite dove File e Directory implementano la stessa interfaccia FileNode, cosi' che size() funzioni allo stesso modo su una foglia o su un intero ramo.`,
            },
            {
              english: 'Decorator',
              italian: 'Decoratore / Decorator',
              pronunciation: '/\u02C8dek\u0259re\u026At\u0259r/',
              phonetic: 'DE-co-reiter',
              example:
                'You can stack multiple decorators -- like compression, encryption, and logging -- on a data stream without changing the original class. = Puoi impilare più decorator -- come compressione, crittografia e logging -- su uno stream di dati senza cambiare la classe originale.',
              context: 'design-patterns',
              difficulty: 'intermediate',
              code: `interface DataStream {
  write(data: Buffer): void;
}

class FileStream implements DataStream {
  write(data: Buffer) { /* scrive su file */ }
}

class CompressingStream implements DataStream {
  constructor(private inner: DataStream) {}
  write(data: Buffer) { this.inner.write(compress(data)); }
}

class EncryptingStream implements DataStream {
  constructor(private inner: DataStream) {}
  write(data: Buffer) { this.inner.write(encrypt(data)); }
}

const stream = new EncryptingStream(new CompressingStream(new FileStream()));`,
              task: `Impila piu' decoratori sullo stesso DataStream per aggiungere compressione e crittografia senza modificare la classe FileStream originale.`,
            },
            {
              english: 'Facade',
              italian: 'Facciata / Facade',
              pronunciation: '/f\u0259\u02C8s\u0251\u02D0d/',
              phonetic: 'fa-SAAD',
              example:
                "A facade hides the complexity of multiple subsystems behind a single, easy-to-use interface. = Una facade nasconde la complessità di più sottosistemi dietro un'interfaccia singola e facile da usare.",
              context: 'design-patterns',
              difficulty: 'intermediate',
              code: `// Sottosistemi complessi
class VideoDecoder { decode(file: string) { /* ... */ } }
class AudioMixer { mix(track: any) { /* ... */ } }
class SubtitleLoader { load(lang: string) { /* ... */ } }

// Facade: una singola interfaccia semplice
class MediaPlayer {
  private decoder = new VideoDecoder();
  private mixer = new AudioMixer();
  private subs = new SubtitleLoader();

  play(file: string, lang: string): void {
    this.decoder.decode(file);
    this.mixer.mix(file);
    this.subs.load(lang);
  }
}`,
              task: `Crea una Facade MediaPlayer che esponga un singolo metodo play e nasconda al client la complessita' della coordinazione tra decoder, mixer e caricatore di sottotitoli.`,
            },
            {
              english: 'Flyweight',
              italian: 'Peso Leggero / Flyweight',
              pronunciation: '/\u02C8fla\u026Awe\u026At/',
              phonetic: 'FLAI-ueit',
              example:
                'In a text editor, the flyweight pattern shares font and style data among thousands of characters to save memory. = In un editor di testo, il pattern flyweight condivide dati di font e stile tra migliaia di caratteri per risparmiare memoria.',
              context: 'design-patterns',
              difficulty: 'expert',
              note: 'Utile per gestire migliaia di piccoli oggetti simili.',
              code: `// Stato intrinseco condiviso
class CharStyle {
  constructor(public font: string, public size: number, public color: string) {}
}

class StyleFactory {
  private cache = new Map<string, CharStyle>();
  get(font: string, size: number, color: string): CharStyle {
    const key = \`\${font}|\${size}|\${color}\`;
    let style = this.cache.get(key);
    if (!style) {
      style = new CharStyle(font, size, color);
      this.cache.set(key, style);
    }
    return style;
  }
}`,
              task: 'Implementa il pattern Flyweight con una StyleFactory che condivide gli oggetti CharStyle identici tra migliaia di caratteri di un editor di testo per risparmiare memoria.',
            },
            {
              english: 'Proxy',
              italian: 'Intermediario / Proxy',
              pronunciation: '/\u02C8pr\u0252ksi/',
              phonetic: 'PROC-si',
              example:
                'A proxy provides a placeholder for another object. = Un proxy fornisce un sostituto per un altro oggetto.',
              context: 'design-patterns',
              difficulty: 'intermediate',
              note: 'Pu\u00F2 essere usato per il controllo accessi, caching o lazy loading.',
              code: `interface ImageLoader {
  load(): Buffer;
}

class RealImage implements ImageLoader {
  constructor(private path: string) { /* carica subito dal disco */ }
  load() { return readFileSync(this.path); }
}

class ImageProxy implements ImageLoader {
  private real?: RealImage;
  constructor(private path: string) {}
  load(): Buffer {
    this.real ??= new RealImage(this.path);
    return this.real.load();
  }
}`,
              task: `Implementa un Proxy per ImageLoader che ritarda il caricamento del file da disco finche' load() non viene effettivamente chiamato, gestendo il lazy loading.`,
            },
            {
              english: 'Private Class Data',
              italian: 'Dati di Classe Privati',
              pronunciation: '/\u02C8pra\u026Av\u0259t kl\u0251\u02D0s \u02C8de\u026At\u0259/',
              phonetic: 'PRAI-vet CLAS DEITA',
              example:
                'The private class data pattern wraps fields in a read-only object so they cannot be changed after construction. = Il pattern private class data racchiude i campi in un oggetto di sola lettura così non possono essere modificati dopo la costruzione.',
              context: 'design-patterns',
              difficulty: 'advanced',
              code: `class CircleData {
  constructor(
    public readonly radius: number,
    public readonly x: number,
    public readonly y: number,
  ) {}
}

class Circle {
  private readonly data: CircleData;
  constructor(radius: number, x: number, y: number) {
    this.data = new CircleData(radius, x, y);
  }
  area(): number {
    return Math.PI * this.data.radius ** 2;
  }
}`,
              task: `Applica il pattern Private Class Data: incapsula i campi del Cerchio in un oggetto CircleData di sola lettura cosi' che non possano essere modificati dopo la costruzione.`,
            },
            {
              english: 'Wrapper',
              italian: 'Involucro / Wrapper',
              pronunciation: '/\u02C8r\u00E6p\u0259r/',
              phonetic: 'RAP-per',
              example:
                'A wrapper class encapsulates a third-party library so that replacing it later requires changing only one file. = Una classe wrapper incapsula una libreria di terze parti cos\u00EC sostituirla in futuro richiede di modificare un solo file.',
              context: 'design-patterns',
              difficulty: 'intermediate',
              code: `// Wrapper sopra la libreria di terze parti axios
import axios from 'axios';

export class HttpClient {
  async get<T>(url: string): Promise<T> {
    const res = await axios.get<T>(url);
    return res.data;
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    const res = await axios.post<T>(url, body);
    return res.data;
  }
}`,
              task: `Incapsula la libreria axios in una classe wrapper HttpClient, cosi' che un'eventuale sostituzione con fetch o un altro client richieda di modificare un solo file.`,
            },
          ],
        },
        {
          id: 'dev_pattern_behavioral',
          title: 'Comportamentali / Behavioral',
          description: 'Observer, strategy, command, state...',
          items: [
            {
              english: 'Behavioral Pattern',
              italian: 'Pattern Comportamentale',
              pronunciation: '/bi\u02C8he\u026Avj\u0259r\u0259l \u02C8p\u00E6t\u0259rn/',
              phonetic: 'bi-HEI-vior-al PAT-tern',
              example:
                'Observer, Strategy, and Command are textbook examples of a behavioral pattern, since each one defines how objects collaborate at runtime. = Observer, Strategy e Command sono esempi da manuale di pattern comportamentale, dato che ciascuno definisce come gli oggetti collaborano a runtime.',
              context: 'design-patterns',
              difficulty: 'intermediate',
            },
            {
              english: 'Chain of Responsibility',
              italian: 'Catena di Responsabilit\u00E0',
              pronunciation:
                '/t\u0283e\u026An \u0259v r\u026A\u02CCsp\u0252ns\u0259\u02C8b\u026Al\u0259ti/',
              phonetic: 'CEIN ov re-spon-si-BI-li-ti',
              example:
                'In a chain of responsibility, an authentication handler checks the token, then a logging handler records the request, and finally a validation handler checks the payload. = In una catena di responsabilit\u00E0, un gestore di autenticazione verifica il token, poi un gestore di logging registra la richiesta, e infine un gestore di validazione controlla il payload.',
              context: 'design-patterns',
              difficulty: 'advanced',
              code: `abstract class Handler {
  protected next?: Handler;
  setNext(h: Handler): Handler { this.next = h; return h; }
  handle(req: Request): Response | undefined {
    return this.next?.handle(req);
  }
}

class AuthHandler extends Handler {
  handle(req: Request) {
    if (!req.token) return { status: 401 };
    return super.handle(req);
  }
}
class LoggingHandler extends Handler {
  handle(req: Request) {
    console.log(req.path);
    return super.handle(req);
  }
}

const chain = new AuthHandler();
chain.setNext(new LoggingHandler());`,
              task: 'Costruisci una Chain of Responsibility in cui ogni handler (autenticazione, logging, validazione) decide se gestire la richiesta o passarla al successivo nella catena.',
            },
            {
              english: 'Command',
              italian: 'Comando / Command',
              pronunciation: '/k\u0259\u02C8m\u00E6nd/',
              phonetic: 'com-MAND',
              example:
                "The command pattern encapsulates each user action as an object, making it trivial to implement undo and redo. = Il pattern command incapsula ogni azione dell'utente come un oggetto, rendendo banale implementare undo e redo.",
              context: 'design-patterns',
              difficulty: 'intermediate',
              note: 'Permette di implementare funzioni come Undo/Redo.',
              code: `interface Command {
  execute(): void;
  undo(): void;
}

class AddTextCommand implements Command {
  constructor(private editor: Editor, private text: string) {}
  execute() { this.editor.append(this.text); }
  undo() { this.editor.removeLast(this.text.length); }
}

class CommandHistory {
  private stack: Command[] = [];
  run(cmd: Command) { cmd.execute(); this.stack.push(cmd); }
  undo() { this.stack.pop()?.undo(); }
}`,
              task: `Applica il pattern Command incapsulando ogni azione dell'editor in un oggetto con execute e undo, cosi' che lo stack della cronologia possa annullare le operazioni in ordine inverso.`,
            },
            {
              english: 'Iterator',
              italian: 'Iteratore / Iterator',
              pronunciation: '/\u026A\u02C8t\u0259re\u026At\u0259r/',
              phonetic: 'i-te-REI-ter',
              example:
                'An iterator lets you loop through a tree, a list, or a graph using the same for-each syntax. = Un iteratore ti permette di scorrere un albero, una lista o un grafo usando la stessa sintassi for-each.',
              context: 'design-patterns',
              difficulty: 'intermediate',
              code: `class TreeNode<T> {
  constructor(public value: T, public children: TreeNode<T>[] = []) {}

  *[Symbol.iterator](): IterableIterator<T> {
    yield this.value;
    for (const child of this.children) {
      yield* child;
    }
  }
}

const root = new TreeNode(1, [new TreeNode(2), new TreeNode(3)]);
for (const value of root) {
  console.log(value);
}`,
              task: `Implementa il pattern Iterator su un TreeNode tramite Symbol.iterator, cosi' che il client possa attraversare l'albero con un normale for-of senza conoscere la struttura interna.`,
            },
            {
              english: 'Mediator',
              italian: 'Mediatore / Mediator',
              pronunciation: '/\u02C8mi\u02D0di\u0259rt\u0259r/',
              phonetic: 'MII-diei-ter',
              example:
                'The Mediator pattern reduces chaotic dependencies between objects. = Il pattern Mediator riduce le dipendenze caotiche tra gli oggetti.',
              context: 'design-patterns',
              difficulty: 'advanced',
              code: `class ChatRoom {
  private users = new Map<string, User>();

  register(user: User) {
    this.users.set(user.name, user);
    user.mediator = this;
  }

  send(from: string, to: string, message: string) {
    this.users.get(to)?.receive(from, message);
  }
}

class User {
  mediator?: ChatRoom;
  constructor(public name: string) {}
  send(to: string, message: string) { this.mediator?.send(this.name, to, message); }
  receive(from: string, message: string) { console.log(\`\${from} -> \${this.name}: \${message}\`); }
}`,
              task: 'Implementa una ChatRoom come Mediator: gli utenti comunicano solo attraverso di essa, riducendo le dipendenze dirette a stella tra ogni coppia di partecipanti.',
            },
            {
              english: 'Memento',
              italian: 'Ricordo (memento)',
              pronunciation: '/m\u0259\u02C8mento\u028A/',
              phonetic: 'me-MEN-tou',
              example:
                'A text editor uses the memento pattern to take snapshots of the document so users can undo changes. = Un editor di testo usa il pattern memento per salvare istantanee del documento così gli utenti possono annullare le modifiche.',
              context: 'design-patterns',
              difficulty: 'advanced',
              code: `class EditorMemento {
  constructor(public readonly content: string) {}
}

class TextEditor {
  private content = '';
  type(text: string) { this.content += text; }
  save(): EditorMemento { return new EditorMemento(this.content); }
  restore(m: EditorMemento) { this.content = m.content; }
}

const editor = new TextEditor();
editor.type('Ciao');
const snapshot = editor.save();
editor.type(' mondo');
editor.restore(snapshot); // torna a 'Ciao'`,
              task: `Implementa il pattern Memento per un TextEditor: salva istantanee del contenuto in oggetti EditorMemento e ripristinale per supportare l'undo.`,
            },
            {
              english: 'Observer',
              italian: 'Osservatore / Observer',
              pronunciation: '/\u0259b\u02C8z\u025C\u02D0rv\u0259r/',
              phonetic: 'ob-SER-ver',
              example:
                'When data changes, the observer pattern automatically notifies every subscriber -- like a newsletter for objects. = Quando i dati cambiano, il pattern observer notifica automaticamente ogni abbonato -- come una newsletter per oggetti.',
              context: 'design-patterns',
              difficulty: 'intermediate',
              code: `type Listener<T> = (data: T) => void;

class EventBus<T> {
  private listeners = new Map<string, Listener<T>[]>();

  subscribe(event: string, fn: Listener<T>): () => void {
    const arr = this.listeners.get(event) ?? [];
    arr.push(fn);
    this.listeners.set(event, arr);
    return () => this.listeners.set(event, arr.filter(l => l !== fn));
  }

  emit(event: string, data: T): void {
    this.listeners.get(event)?.forEach(fn => fn(data));
  }
}`,
              task: 'Implementa il pattern Observer con un EventBus tipizzato: i subscriber si registrano a un evento e ricevono una notifica ogni volta che emit viene chiamato.',
            },
            {
              english: 'State',
              italian: 'Stato / State',
              pronunciation: '/ste\u026At/',
              phonetic: 'STEIT',
              example:
                'Using the state pattern, a document object behaves differently in Draft, Review, and Published states without giant if-else chains. = Usando il pattern state, un oggetto documento si comporta diversamente negli stati Draft, Review e Published senza enormi catene if-else.',
              context: 'design-patterns',
              difficulty: 'advanced',
              code: `interface DocumentState {
  publish(doc: Document): void;
}

class DraftState implements DocumentState {
  publish(doc: Document) { doc.setState(new ReviewState()); }
}
class ReviewState implements DocumentState {
  publish(doc: Document) { doc.setState(new PublishedState()); }
}
class PublishedState implements DocumentState {
  publish() { /* gia' pubblicato, no-op */ }
}

class Document {
  private state: DocumentState = new DraftState();
  setState(s: DocumentState) { this.state = s; }
  publish() { this.state.publish(this); }
}`,
              task: 'Applica il pattern State a un Document che passa da Draft a Review a Published, sostituendo lunghe catene di if-else con classi di stato dedicate.',
            },
            {
              english: 'Strategy',
              italian: 'Strategia / Strategy',
              pronunciation: '/\u02C8str\u00E6t\u0259d\u0292i/',
              phonetic: 'STRA-te-gi',
              example:
                'The strategy pattern lets the payment module switch between credit card, PayPal, or crypto at runtime. = Il pattern strategy permette al modulo di pagamento di passare tra carta di credito, PayPal o crypto a runtime.',
              context: 'design-patterns',
              difficulty: 'intermediate',
              code: `interface PaymentStrategy {
  pay(amount: number): Promise<string>;
}

class CreditCardStrategy implements PaymentStrategy {
  pay(amount: number) { /* chiama gateway carta */ return Promise.resolve('cc_ok'); }
}
class PaypalStrategy implements PaymentStrategy {
  pay(amount: number) { /* chiama API PayPal */ return Promise.resolve('pp_ok'); }
}
class CryptoStrategy implements PaymentStrategy {
  pay(amount: number) { /* invia transazione on-chain */ return Promise.resolve('btc_ok'); }
}

class Checkout {
  constructor(private strategy: PaymentStrategy) {}
  process(amount: number) { return this.strategy.pay(amount); }
}`,
              task: 'Implementa il pattern Strategy in modo che il Checkout possa scambiare a runtime tra CreditCardStrategy, PaypalStrategy e CryptoStrategy senza if/else interni.',
            },
            {
              english: 'Template Method',
              italian: 'Metodo Modello / Template',
              pronunciation: '/\u02C8temple\u026At \u02C8me\u03B8\u0259d/',
              phonetic: 'TEM-pleit ME-thod',
              example:
                'The template method defines the overall recipe -- subclasses only override the specific steps they need to customise. = Il template method definisce la ricetta complessiva -- le sottoclassi sovrascrivono solo i passi specifici che devono personalizzare.',
              context: 'design-patterns',
              difficulty: 'advanced',
              code: `abstract class ReportGenerator {
  // Template method: definisce la ricetta
  generate(): string {
    const data = this.fetchData();
    const formatted = this.format(data);
    return this.wrap(formatted);
  }

  protected abstract fetchData(): unknown;
  protected abstract format(data: unknown): string;

  // Step comune con default
  protected wrap(content: string): string {
    return \`<html><body>\${content}</body></html>\`;
  }
}

class SalesReport extends ReportGenerator {
  protected fetchData() { return [/* righe vendite */]; }
  protected format(rows: unknown) { return '<table>...</table>'; }
}`,
              task: `Implementa il pattern Template Method: la classe base ReportGenerator definisce l'ordine dei passi in generate() mentre le sottoclassi sovrascrivono solo fetchData e format.`,
            },
          ],
        },
        {
          id: 'dev_pattern_other',
          title: 'Altri Pattern / Other Patterns',
          description: 'Repository, middleware, pub/sub...',
          items: [
            {
              english: 'Unit of Work',
              italian: 'Unit\u00E0 di Lavoro',
              pronunciation: '/\u02C8ju\u02D0n\u026At \u0259v w\u025C\u02D0rk/',
              phonetic: 'IUU-nit ov WERK',
              example:
                "The unit of work tracks all modifications in a single transaction and commits them together. = L'unit of work traccia tutte le modifiche in una singola transazione e le salva insieme.",
              context: 'data-patterns',
              difficulty: 'advanced',
              note: 'Garantisce che tutte le operazioni in una transazione siano completate con successo o nessuna.',
              code: `class UnitOfWork {
  private newEntities: Entity[] = [];
  private dirtyEntities: Entity[] = [];
  private removedEntities: Entity[] = [];

  registerNew(e: Entity) { this.newEntities.push(e); }
  registerDirty(e: Entity) { this.dirtyEntities.push(e); }
  registerRemoved(e: Entity) { this.removedEntities.push(e); }

  async commit(db: Db): Promise<void> {
    await db.transaction(async (tx) => {
      for (const e of this.newEntities) await tx.insert(e);
      for (const e of this.dirtyEntities) await tx.update(e);
      for (const e of this.removedEntities) await tx.delete(e);
    });
  }
}`,
              task: `Implementa il pattern Unit of Work che tiene traccia di entita' nuove, modificate ed eliminate e le persiste tutte insieme in un'unica transazione atomica.`,
            },
            {
              english: 'generic repository pattern',
              italian: 'generic repository pattern',
              pronunciation: '/r\u026A\u02C8p\u0252z\u026At\u0259ri \u02C8p\u00E6t\u0259rn/',
              phonetic: 're-PO-si-to-ri PAT-tern',
              example:
                'A generic repository pattern provides CRUD methods for every entity type, which reduces boilerplate but can hide important query differences. = Un generic repository pattern fornisce metodi CRUD per ogni tipo di entità, il che riduce il boilerplate ma può nascondere importanti differenze tra le query.',
              context: 'data-patterns',
              difficulty: 'intermediate',
              note: 'Variante semplificata del Repository Pattern del DDD (level 4), riusabile su qualsiasi entità.',
              code: `interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}

class InMemoryRepository<T extends { id: string }> implements Repository<T> {
  private store = new Map<string, T>();
  async findById(id: string) { return this.store.get(id) ?? null; }
  async findAll() { return [...this.store.values()]; }
  async save(entity: T) { this.store.set(entity.id, entity); }
  async delete(id: string) { this.store.delete(id); }
}`,
              task: `Implementa un generic repository pattern tipizzato che esponga findById, findAll, save e delete riusabili su qualsiasi entita' con un campo id.`,
            },
            {
              english: 'Data Transfer Object (DTO)',
              italian: 'Oggetto Trasferimento Dati',
              pronunciation: '/\u02CCdi\u02D0 ti\u02D0 \u02C8o\u028A/',
              phonetic: 'dii-tii-OU',
              example:
                'Use a DTO to send data over the network. = Usa un DTO per inviare dati sulla rete.',
              context: 'data-patterns',
              difficulty: 'intermediate',
              note: 'Un oggetto semplice che serve solo a trasportare dati, senza logica di business.',
              code: `// Entita' di dominio ricca di logica
class User {
  constructor(
    public id: string,
    public email: string,
    public passwordHash: string,
    public role: 'admin' | 'user',
  ) {}
  isAdmin() { return this.role === 'admin'; }
}

// DTO: solo dati esposti via API
interface UserDto {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

function toDto(u: User): UserDto {
  return { id: u.id, email: u.email, role: u.role };
}`,
              task: `Definisci un DTO UserDto privo di logica di business e una funzione toDto che converta l'entita' User omettendo i campi sensibili come passwordHash.`,
            },
            {
              english: 'Data Access Object (DAO)',
              italian: 'Oggetto Accesso Dati',
              pronunciation: '/\u02CCdi\u02D0 e\u026A \u02C8o\u028A/',
              phonetic: 'dii-ei-OU',
              example:
                "DAO provides an abstract interface to some type of database. = Il DAO fornisce un'interfaccia astratta a un tipo di database.",
              context: 'data-patterns',
              difficulty: 'intermediate',
              code: `interface UserDao {
  findById(id: string): Promise<User | null>;
  insert(user: User): Promise<void>;
  update(user: User): Promise<void>;
}

class PostgresUserDao implements UserDao {
  constructor(private db: PgClient) {}
  async findById(id: string) {
    const r = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    return r.rows[0] ?? null;
  }
  async insert(u: User) { await this.db.query('INSERT INTO users ...', [u.id, u.email]); }
  async update(u: User) { await this.db.query('UPDATE users SET ... WHERE id = $1', [u.id]); }
}`,
              task: `Definisci un'interfaccia UserDao e un'implementazione PostgresUserDao che fornisca al resto dell'applicazione un'astrazione del database, isolando l'SQL in un solo livello.`,
            },
            {
              english: 'Active Record',
              italian: 'Record Attivo / Active Record',
              pronunciation: '/\u02C8\u00E6kt\u026Av \u02C8rek\u0254\u02D0rd/',
              phonetic: 'AC-tiv RE-cord',
              example:
                "In Rails, the active record pattern lets you write user.save() and the object handles its own database persistence. = In Rails, il pattern active record ti permette di scrivere user.save() e l'oggetto gestisce la propria persistenza nel database.",
              context: 'data-patterns',
              difficulty: 'advanced',
              note: "L'oggetto contiene sia i dati che i metodi per salvarli (es. user.save()).",
              code: `abstract class ActiveRecord {
  static async find<T extends ActiveRecord>(this: new () => T, id: string): Promise<T> {
    const row = await db.query('SELECT * FROM ' + (this as any).table + ' WHERE id = ?', [id]);
    return Object.assign(new this(), row);
  }

  async save(): Promise<void> {
    const table = (this.constructor as any).table;
    await db.query(\`INSERT INTO \${table} ... ON CONFLICT (id) DO UPDATE ...\`, this);
  }
}

class User extends ActiveRecord {
  static table = 'users';
  id!: string;
  email!: string;
}

const user = await User.find('u_1');
user.email = 'new@example.com';
await user.save();`,
              task: 'Implementa il pattern Active Record in cui ogni istanza di User espone direttamente save() e i metodi statici di lookup, mescolando dati e persistenza nello stesso oggetto.',
            },
            {
              english: 'Visitor',
              italian: 'Visitatore / Visitor',
              pronunciation: '/\u02C8v\u026Az\u026At\u0259r/',
              phonetic: 'VI-si-ter',
              example:
                "Using the visitor pattern, you can add an export-to-PDF operation to every document type without touching their classes. = Usando il pattern visitor, puoi aggiungere un'operazione di esportazione in PDF a ogni tipo di documento senza toccare le loro classi.",
              context: 'design-patterns',
              difficulty: 'expert',
              code: `interface DocumentVisitor {
  visitText(node: TextNode): void;
  visitImage(node: ImageNode): void;
}

interface DocumentNode {
  accept(v: DocumentVisitor): void;
}

class TextNode implements DocumentNode {
  constructor(public content: string) {}
  accept(v: DocumentVisitor) { v.visitText(this); }
}
class ImageNode implements DocumentNode {
  constructor(public src: string) {}
  accept(v: DocumentVisitor) { v.visitImage(this); }
}

class PdfExportVisitor implements DocumentVisitor {
  visitText(n: TextNode) { /* scrivi testo nel PDF */ }
  visitImage(n: ImageNode) { /* embed immagine nel PDF */ }
}`,
              task: `Applica il pattern Visitor per aggiungere un'operazione di esportazione in PDF ai nodi del documento senza modificare le classi TextNode e ImageNode esistenti.`,
            },
            {
              english: 'Event Aggregator',
              italian: 'Aggregatore di Eventi',
              pronunciation:
                '/\u026A\u02C8vent \u02C8\u00E6\u0261r\u026A\u02CC\u0261e\u026At\u0259r/',
              phonetic: 'i-VENT AG-gre-geiter',
              example:
                'An event aggregator acts as a central hub where publishers and subscribers meet without knowing about each other. = Un aggregatore di eventi funge da hub centrale dove publisher e subscriber si incontrano senza conoscersi.',
              context: 'architecture-patterns',
              difficulty: 'advanced',
              code: `type Handler<T = unknown> = (payload: T) => void;

class EventAggregator {
  private subs = new Map<string, Handler[]>();

  publish<T>(topic: string, payload: T): void {
    this.subs.get(topic)?.forEach(h => h(payload));
  }

  subscribe<T>(topic: string, handler: Handler<T>): () => void {
    const arr = this.subs.get(topic) ?? [];
    arr.push(handler as Handler);
    this.subs.set(topic, arr);
    return () => this.subs.set(topic, arr.filter(h => h !== handler));
  }
}`,
              task: `Implementa un Event Aggregator centrale con publish e subscribe, cosi' che publisher e subscriber comunichino tramite topic senza riferimenti diretti tra loro.`,
            },
            {
              english: 'Service Locator',
              italian: 'Localizzatore di Servizi',
              pronunciation: '/\u02C8s\u025C\u02D0rv\u026As lo\u028A\u02C8ke\u026At\u0259r/',
              phonetic: 'SER-vis lou-KEI-ter',
              example:
                'A service locator provides a global registry of services, but many developers prefer dependency injection because it makes dependencies explicit. = Un service locator fornisce un registro globale dei servizi, ma molti sviluppatori preferiscono la dependency injection perch\u00E9 rende le dipendenze esplicite.',
              context: 'patterns',
              difficulty: 'expert',
              code: `class ServiceLocator {
  private static services = new Map<string, unknown>();

  static register<T>(key: string, instance: T): void {
    this.services.set(key, instance);
  }

  static resolve<T>(key: string): T {
    const svc = this.services.get(key);
    if (!svc) throw new Error(\`Service \${key} not registered\`);
    return svc as T;
  }
}

// Registrazione all'avvio
ServiceLocator.register('logger', new ConsoleLogger());
// Recupero on demand
const logger = ServiceLocator.resolve<Logger>('logger');`,
              task: 'Implementa un Service Locator come registro globale con register e resolve tipizzati, ricordando che rende le dipendenze meno esplicite rispetto alla dependency injection.',
            },
            {
              english: 'Pub/Sub',
              italian: 'Pubblica/Sottoscrivi',
              pronunciation: '/p\u028Cb s\u028Cb/',
              phonetic: 'PAB SAB',
              example:
                'In a pub/sub system, the order service publishes an event and the email service subscribes to it without them knowing about each other. = In un sistema pub/sub, il servizio ordini pubblica un evento e il servizio email si iscrive senza che si conoscano.',
              context: 'architecture-patterns',
              difficulty: 'intermediate',
              code: `// Publisher: il servizio ordini
class OrderService {
  constructor(private bus: MessageBus) {}
  async place(order: Order) {
    await this.save(order);
    this.bus.publish('order.placed', { orderId: order.id, email: order.email });
  }
  private save(o: Order) { /* ... */ }
}

// Subscriber: il servizio email, completamente disaccoppiato
class EmailService {
  constructor(bus: MessageBus) {
    bus.subscribe('order.placed', (evt) => this.sendConfirmation(evt.email));
  }
  sendConfirmation(email: string) { /* invia email */ }
}`,
              task: 'Modella un flusso pub/sub in cui OrderService pubblica un evento order.placed sul bus e EmailService si iscrive per inviare la conferma, senza che i due servizi si conoscano direttamente.',
            },
            {
              english: 'Interceptors',
              italian: 'Intercettatori / Middleware',
              pronunciation: '/\u02CC\u026Ant\u0259r\u02C8sept\u0259rz/',
              phonetic: 'in-ter-CEP-terz',
              example:
                'HTTP interceptors can add an authorization header to every outgoing request automatically. = Gli intercettatori HTTP possono aggiungere un header di autorizzazione a ogni richiesta in uscita automaticamente.',
              context: 'architecture-patterns',
              difficulty: 'advanced',
              code: `type Interceptor = (req: Request, next: () => Promise<Response>) => Promise<Response>;

class HttpPipeline {
  private interceptors: Interceptor[] = [];

  use(i: Interceptor): void { this.interceptors.push(i); }

  async send(req: Request): Promise<Response> {
    const chain = this.interceptors.reduceRight<() => Promise<Response>>(
      (next, i) => () => i(req, next),
      () => fetch(req),
    );
    return chain();
  }
}

// Intercettatore che aggiunge l'header Authorization a ogni richiesta
const authInterceptor: Interceptor = (req, next) => {
  req.headers.set('Authorization', \`Bearer \${getToken()}\`);
  return next();
};`,
              task: `Costruisci una pipeline di intercettatori HTTP che permetta di iniettare automaticamente l'header Authorization in ogni richiesta in uscita componendo middleware in catena.`,
            },
          ],
        },
      ],
    },
    9: {
      name: 'Metodologie / Methodologies',
      description: 'Agile, Scrum e metodologie di sviluppo',
      lessons: [
        {
          id: 'dev_agile',
          title: 'Agile',
          description: 'Agile, iterative, incremental...',
          items: [
            {
              english: 'Agile Manifesto',
              italian: 'Manifesto Agile',
              pronunciation: '/\u02C8\u00E6d\u0292a\u026Al \u02CCm\u00E6n\u026A\u02C8festo\u028A/',
              phonetic: 'A-giail ma-ni-FES-tou',
              example:
                'The Agile Manifesto values individuals and interactions over processes. = Il Manifesto Agile d\u00E0 valore agli individui e alle interazioni pi\u00F9 che ai processi.',
              context: 'methodology',
              difficulty: 'beginner',
              note: 'Il documento fondamentale scritto nel 2001 che definisce i valori Agile.',
            },
            {
              english: 'Iterative Development',
              italian: 'Sviluppo Iterativo',
              pronunciation: '/\u026A\u02C8ter\u0259t\u026Av d\u026A\u02C8vel\u0259pm\u0259nt/',
              phonetic: 'i-TE-ra-tiv di-VE-lop-ment',
              example:
                'With iterative development, the team builds a basic version first and refines it through repeated cycles of feedback. = Con lo sviluppo iterativo, il team costruisce una versione base prima e la raffina attraverso cicli ripetuti di feedback.',
              context: 'methodology',
              difficulty: 'intermediate',
            },
            {
              english: 'Incremental Development',
              italian: 'Sviluppo Incrementale',
              pronunciation: '/\u02CC\u026Ankr\u0259\u02C8mentl d\u026A\u02C8vel\u0259pm\u0259nt/',
              phonetic: 'in-cre-MEN-tal di-VE-lop-ment',
              example:
                'In incremental development, each release delivers a usable subset of the final product to gather early user feedback. = Nello sviluppo incrementale, ogni rilascio consegna un sottoinsieme utilizzabile del prodotto finale per raccogliere feedback anticipato dagli utenti.',
              context: 'methodology',
              difficulty: 'intermediate',
            },
            {
              english: 'Velocity (Agile)',
              italian: 'Velocit\u00E0',
              pronunciation: '/v\u0259\u02C8l\u0252s\u0259ti/',
              phonetic: 've-LO-si-ti',
              example:
                'Track the team velocity to predict future releases. = Traccia la velocit\u00E0 del team per prevedere i rilasci futuri.',
              context: 'metrics',
              difficulty: 'intermediate',
              note: 'La quantit\u00E0 di lavoro (story points) che un team completa in uno sprint.',
              code: `-- Velocita' media del team negli ultimi 5 sprint
SELECT
  sprint_id,
  SUM(story_points) AS completed_points
FROM issues
WHERE status = 'done'
  AND sprint_id IN (
    SELECT id FROM sprints
    ORDER BY end_date DESC
    LIMIT 5
  )
GROUP BY sprint_id
ORDER BY sprint_id;`,
              task: `Scrivi una query SQL che calcoli la velocita' (story points completati) per ogni sprint negli ultimi cinque sprint chiusi, partendo dalla tabella issues di un tracker.`,
            },
            {
              english: 'Burn-down Chart',
              italian: 'Grafico Burn-down',
              pronunciation: '/b\u025C\u02D0rn da\u028An t\u0283\u0251\u02D0rt/',
              phonetic: 'BERN-daun CIART',
              example:
                'A burn-down chart shows how much work is left. = Un grafico burn-down mostra quanto lavoro rimane.',
              context: 'metrics',
              difficulty: 'intermediate',
              code: `// Calcolo dei punti rimanenti giorno per giorno per un burn-down chart
function burndown(sprint: Sprint, issues: Issue[]): { day: string; remaining: number }[] {
  const start = sprint.startDate;
  const days = Math.ceil((+sprint.endDate - +start) / 86_400_000);
  const total = issues.reduce((s, i) => s + i.points, 0);

  return Array.from({ length: days + 1 }, (_, d) => {
    const date = new Date(+start + d * 86_400_000);
    const done = issues
      .filter(i => i.completedAt && i.completedAt <= date)
      .reduce((s, i) => s + i.points, 0);
    return { day: date.toISOString().slice(0, 10), remaining: total - done };
  });
}`,
              task: `Calcola i dati per un burn-down chart: per ogni giorno dello sprint somma i punti delle issue ancora aperte cosi' da visualizzare il lavoro residuo nel tempo.`,
            },
            {
              english: 'Definition of Done (DoD)',
              italian: 'Definizione di "Fatto"',
              pronunciation: '/\u02CCdef\u026A\u02C8n\u026A\u0283\u0259n \u0259v d\u028Cn/',
              phonetic: 'de-fi-NI-scion ov DAN',
              example:
                'Check the Definition of Done before closing the task. = Controlla la Definition of Done prima di chiudere il task.',
              context: 'methodology',
              difficulty: 'intermediate',
              note: "L'insieme di criteri che una feature deve soddisfare per essere considerata finita.",
            },
            {
              english: 'User Story',
              italian: 'Storia Utente / User Story',
              pronunciation: '/\u02C8ju\u02D0z\u0259r \u02C8st\u0254\u02D0ri/',
              phonetic: 'IUU-ser STO-ri',
              example:
                "Write user stories from the perspective of the user. = Scrivi le user story dalla prospettiva dell'utente.",
              context: 'requirements',
              difficulty: 'beginner',
              note: 'Breve descrizione di una funzione (As a [role], I want [goal], so that [benefit]).',
            },
            {
              english: 'Acceptance Criteria',
              italian: 'Criteri di Accettazione',
              pronunciation: '/\u0259k\u02C8sept\u0259ns kra\u026A\u02C8t\u026Ari\u0259/',
              phonetic: 'ac-CEP-tans crai-TII-ria',
              example:
                'Clear acceptance criteria tell the developer exactly what to build and the tester exactly what to verify. = Criteri di accettazione chiari dicono allo sviluppatore esattamente cosa costruire e al tester esattamente cosa verificare.',
              context: 'requirements',
              difficulty: 'intermediate',
            },
            {
              english: 'Backlog Refinement',
              italian: 'Raffinamento del Backlog',
              pronunciation: '/\u02C8b\u00E6kl\u0252\u0261 r\u026A\u02C8fa\u026Anm\u0259nt/',
              phonetic: 'BAK-log re-FAIN-ment',
              example:
                'Grooming or refinement sessions keep the backlog healthy. = Le sessioni di refinement mantengono sano il backlog.',
              context: 'scrum',
              difficulty: 'intermediate',
            },
            {
              english: 'Agile Principles',
              italian: 'Principi Agile',
              pronunciation: '/\u02C8\u00E6d\u0292a\u026Al \u02C8pr\u026Ans\u0259plz/',
              phonetic: 'A-giail PRIN-si-polz',
              example:
                "The twelve Agile principles emphasise delivering working software frequently and welcoming changing requirements. = I dodici principi Agile enfatizzano il rilascio frequente di software funzionante e l'accoglienza dei cambiamenti nei requisiti.",
              context: 'methodology',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'dev_scrum',
          title: 'Scrum',
          description: 'Sprint, backlog, standup, retro...',
          items: [
            {
              english: 'Scrum',
              italian: 'Framework agile (Scrum)',
              pronunciation: '/skr\u028Cm/',
              phonetic: 'SCRAM',
              example:
                'Many teams adopt Scrum because its fixed-length sprints, clear roles, and regular ceremonies create a predictable development rhythm. = Molti team adottano Scrum perch\u00E9 i suoi sprint a durata fissa, ruoli chiari e cerimonie regolari creano un ritmo di sviluppo prevedibile.',
              context: 'scrum',
              difficulty: 'beginner',
            },
            {
              english: 'Sprint',
              italian: 'Ciclo (sprint)',
              pronunciation: '/spr\u026Ant/',
              phonetic: 'SPRINT',
              example:
                'At the end of each two-week sprint, the team delivers a potentially shippable product increment. = Alla fine di ogni sprint di due settimane, il team consegna un incremento di prodotto potenzialmente rilasciabile.',
              context: 'scrum',
              difficulty: 'beginner',
              note: 'Periodo di tempo fisso in cui il team completa un set di lavori.',
            },
            {
              english: 'Product Owner',
              italian: 'Proprietario del Prodotto',
              pronunciation: '/\u02C8pr\u0252d\u028Ckt \u02C8o\u028An\u0259r/',
              phonetic: 'PRO-dact OU-ner',
              example:
                'The Product Owner prioritizes the backlog. = Il Product Owner d\u00E0 le priorit\u00E0 al backlog.',
              context: 'roles',
              difficulty: 'intermediate',
              note: 'Rappresenta la voce del cliente.',
            },
            {
              english: 'Scrum Master',
              italian: 'Facilitatore Scrum (Scrum Master)',
              pronunciation: '/skr\u028Cm \u02C8m\u0251\u02D0st\u0259r/',
              phonetic: 'SCRAM MAS-ter',
              example:
                'The Scrum Master removes blockers for the team. = Lo Scrum Master rimuove i blocchi per il team.',
              context: 'roles',
              difficulty: 'intermediate',
              note: 'Facilitatore che aiuta il team a seguire i principi Scrum.',
            },
            {
              english: 'Daily Stand-up',
              italian: 'Riunione Giornaliera',
              pronunciation: '/\u02C8de\u026Ali \u02C8st\u00E6nd\u028Cp/',
              phonetic: 'DEI-li STEND-ap',
              example:
                'During the daily stand-up, each team member shares what they did yesterday, what they plan today, and any blockers. = Durante il daily stand-up, ogni membro del team condivide cosa ha fatto ieri, cosa prevede di fare oggi e qualsiasi blocco.',
              context: 'scrum',
              difficulty: 'beginner',
            },
            {
              english: 'Sprint Planning',
              italian: 'Pianificazione dello Sprint',
              pronunciation: '/spr\u026Ant \u02C8pl\u00E6n\u026A\u014B/',
              phonetic: 'SPRINT PLE-ning',
              example:
                "Define the sprint goal during sprint planning. = Definisci l'obiettivo dello sprint durante lo sprint planning.",
              context: 'scrum',
              difficulty: 'intermediate',
            },
            {
              english: 'Sprint Review',
              italian: 'Revisione dello Sprint',
              pronunciation: '/spr\u026Ant r\u026A\u02C8vju\u02D0/',
              phonetic: 'SPRINT re-VIU',
              example:
                'The sprint review is for demoing finished work to stakeholders. = Lo sprint review serve a mostrare il lavoro finito agli stakeholder.',
              context: 'scrum',
              difficulty: 'intermediate',
            },
            {
              english: 'Sprint Retrospective',
              italian: 'Retrospettiva dello Sprint',
              pronunciation: '/spr\u026Ant \u02CCretr\u0259\u02C8spekt\u026Av/',
              phonetic: 'SPRINT re-tro-SPEC-tiv',
              example:
                'Improve team processes in the sprint retrospective. = Migliora i processi del team nella retrospettiva.',
              context: 'scrum',
              difficulty: 'intermediate',
            },
            {
              english: 'Product Backlog',
              italian: 'Backlog di Prodotto',
              pronunciation: '/\u02C8pr\u0252d\u028Ckt \u02C8b\u00E6kl\u0252\u0261/',
              phonetic: 'PRO-dact BAK-log',
              example:
                'The backlog contains all features to be built. = Il backlog contiene tutte le feature da costruire.',
              context: 'scrum',
              difficulty: 'beginner',
            },
            {
              english: 'Increment',
              italian: 'Incremento',
              pronunciation: '/\u02C8\u026Ankr\u0259m\u0259nt/',
              phonetic: 'IN-cre-ment',
              example:
                "The increment is the sum of all backlog items finished during a sprint. = L'incremento \u00E8 la somma di tutti gli elementi completati in uno sprint.",
              context: 'scrum',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'dev_kanban',
          title: 'Kanban e Lean',
          description: 'Kanban, WIP, flow, lean...',
          items: [
            {
              english: 'Kanban',
              italian: 'Metodologia visiva a flussi (Kanban)',
              pronunciation: '/\u02C8k\u00E6nb\u00E6n/',
              phonetic: 'KAN-ban',
              example:
                'Unlike Scrum, Kanban does not use fixed sprints -- work flows continuously across the board. = A differenza di Scrum, il Kanban non usa sprint fissi -- il lavoro fluisce continuamente sulla lavagna.',
              context: 'kanban',
              difficulty: 'beginner',
              note: 'Dal giapponese: "segnaletica" o "cartellino". Focus sulla visualizzazione del flusso.',
            },
            {
              english: 'WIP Limit (Work In Progress)',
              italian: 'Limite WIP / Lavori in Corso',
              pronunciation: '/w\u026Ap \u02C8l\u026Am\u026At/',
              phonetic: 'UIP LI-mit',
              example:
                'Lowering the WIP limit from six tasks to three forced the team to finish work before starting new items, which cut cycle time in half. = Abbassare il limite WIP da sei task a tre ha forzato il team a finire il lavoro prima di iniziare nuovi elementi, il che ha dimezzato il cycle time.',
              context: 'kanban',
              difficulty: 'intermediate',
              note: 'Numero massimo di compiti che possono essere in una certa fase contemporaneamente.',
              code: `// Hook che blocca il passaggio in 'In Progress' se il WIP limit e' raggiunto
async function moveToInProgress(issueId: string, column: Column): Promise<void> {
  const wip = await db.count('issues', { column_id: column.id, status: 'in_progress' });
  if (wip >= column.wipLimit) {
    throw new Error(
      \`WIP limit raggiunto: \${wip}/\${column.wipLimit}. Completa un task prima di iniziarne uno nuovo.\`,
    );
  }
  await db.update('issues', issueId, { status: 'in_progress' });
}`,
              task: `Applica il limite WIP della colonna Kanban: prima di spostare una issue in 'In Progress' verifica quanti task sono gia' in corso e blocca l'operazione se si supera la soglia.`,
            },
            {
              english: 'Kanban Board',
              italian: 'Lavagna Kanban',
              pronunciation: '/\u02C8k\u00E6nb\u00E6n b\u0254\u02D0rd/',
              phonetic: 'KAN-ban BORD',
              example:
                'A physical or digital Kanban board with columns like To Do, Doing, and Done makes work visible and exposes where tasks pile up. = Una Kanban board fisica o digitale con colonne come To Do, Doing e Done rende il lavoro visibile ed espone dove i task si accumulano.',
              context: 'kanban',
              difficulty: 'beginner',
            },
            {
              english: 'Lead Time',
              italian: 'Tempo di Consegna / Lead Time',
              pronunciation: '/li\u02D0d ta\u026Am/',
              phonetic: 'LIID taim',
              example:
                'Reducing lead time from 30 days to 5 means users get features six times faster. = Ridurre il lead time da 30 giorni a 5 significa che gli utenti ricevono le funzionalità sei volte più velocemente.',
              context: 'metrics',
              difficulty: 'advanced',
              code: `-- Lead time medio: dal momento in cui l'issue viene creata a quando viene chiusa
SELECT
  AVG(EXTRACT(EPOCH FROM (closed_at - created_at)) / 86400) AS avg_lead_time_days,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY closed_at - created_at) AS p95_lead_time
FROM issues
WHERE closed_at IS NOT NULL
  AND closed_at >= NOW() - INTERVAL '90 days';`,
              task: 'Scrivi una query che calcoli il lead time medio e il 95esimo percentile dalla creazione alla chiusura delle issue negli ultimi 90 giorni.',
            },
            {
              english: 'Cycle Time',
              italian: 'Tempo di Ciclo / Cycle Time',
              pronunciation: '/\u02C8sa\u026Akl ta\u026Am/',
              phonetic: 'SAI-kel taim',
              example:
                'Tracking cycle time reveals that our tasks spend three days in code review but only one day in development. = Monitorare il cycle time rivela che i nostri task trascorrono tre giorni in code review ma solo un giorno in sviluppo.',
              context: 'metrics',
              difficulty: 'advanced',
              code: `-- Cycle time: dal momento in cui il lavoro inizia (in_progress) a quando viene chiuso
SELECT
  i.id,
  i.title,
  EXTRACT(EPOCH FROM (i.closed_at - t.started_at)) / 3600 AS cycle_time_hours
FROM issues i
JOIN (
  SELECT issue_id, MIN(changed_at) AS started_at
  FROM issue_status_changes
  WHERE new_status = 'in_progress'
  GROUP BY issue_id
) t ON t.issue_id = i.id
WHERE i.closed_at IS NOT NULL;`,
              task: `Calcola il cycle time di ogni issue prendendo come inizio il primo passaggio in 'in_progress' e come fine la data di chiusura, esprimendolo in ore.`,
            },
            {
              english: 'Lean Software Development',
              italian: 'Sviluppo Software Lean',
              pronunciation:
                '/li\u02D0n \u02C8s\u0252ftwe\u0259r d\u026A\u02C8vel\u0259pm\u0259nt/',
              phonetic: 'LIIN SOFT-uer di-VE-lop-ment',
              example:
                "Lean development focuses on eliminating waste. = Lo sviluppo lean si concentra sull'eliminazione degli sprechi.",
              context: 'methodology',
              difficulty: 'intermediate',
            },
            {
              english: 'Waste (Muda)',
              italian: 'Spreco / Waste',
              pronunciation: '/we\u026Ast/',
              phonetic: 'UEIST',
              example:
                'Bugs and unnecessary features are forms of waste. = Bug e funzioni inutili sono forme di spreco.',
              context: 'lean',
              difficulty: 'intermediate',
            },
            {
              english: 'Kaizen (Continuous Improvement)',
              italian: 'Miglioramento Continuo / Kaizen',
              pronunciation: '/\u02C8ka\u026Azen/',
              phonetic: 'KAI-zen',
              example:
                'Apply Kaizen to slowly improve every process. = Applica il Kaizen per migliorare lentamente ogni processo.',
              context: 'lean',
              difficulty: 'beginner',
            },
            {
              english: 'Pull System',
              italian: 'Sistema Pull / a Trazione',
              pronunciation: '/p\u028Al \u02C8s\u026Ast\u0259m/',
              phonetic: 'PUL SIS-tem',
              example:
                "In a pull system, work is started only when there is demand. = In un sistema pull, il lavoro inizia solo quando c'\u00E8 richiesta.",
              context: 'kanban',
              difficulty: 'advanced',
            },
            {
              english: 'Bottleneck',
              italian: 'Collo di Bottiglia',
              pronunciation: '/\u02C8b\u0252tlnek/',
              phonetic: 'BO-tel-nek',
              example:
                'Visualising the Kanban board made it obvious that manual QA was the bottleneck slowing every feature. = Visualizzare la lavagna Kanban ha reso evidente che il QA manuale era il collo di bottiglia che rallentava ogni funzionalit\u00E0.',
              context: 'lean',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dev_pm',
          title: 'Project Management',
          description: 'User story, epic, estimation...',
          items: [
            {
              english: 'project milestone',
              italian: 'milestone di progetto',
              pronunciation: '/\u02C8ma\u026Alsto\u028An/',
              phonetic: 'MAIL-stoun',
              example:
                'Each project milestone bundles related deliverables and a target date, so executives can track progress against the overall plan. = Ogni milestone di progetto raggruppa deliverable correlati e una data obiettivo, così i dirigenti possono tracciare i progressi rispetto al piano complessivo.',
              context: 'management',
              difficulty: 'intermediate',
              note: 'Distinta dalla milestone di GitHub, che raggruppa issue e pull request.',
            },
            {
              english: 'Epic',
              italian: 'Epica / Epic',
              pronunciation: '/\u02C8ep\u026Ak/',
              phonetic: 'E-pik',
              example:
                "An epic is a large body of work that can be broken down into stories. = Un'epica \u00E8 un grande blocco di lavoro divisibile in storie.",
              context: 'scrum',
              difficulty: 'intermediate',
            },
            {
              english: 'Estimation (Story Points)',
              italian: 'Stima / Story Points',
              pronunciation: '/\u02CCest\u026A\u02C8me\u026A\u0283\u0259n/',
              phonetic: 'es-ti-MEI-scion',
              example:
                'Estimation helps in planning future sprints. = La stima aiuta nella pianificazione degli sprint futuri.',
              context: 'management',
              difficulty: 'intermediate',
              note: 'Usare punti invece di ore per misurare la complessit\u00E0.',
              code: `-- Punti stimati vs completati per sprint, utile per calibrare le stime future
SELECT
  s.name AS sprint,
  SUM(i.story_points) FILTER (WHERE i.status = 'done')      AS completed_points,
  SUM(i.story_points)                                        AS planned_points,
  ROUND(
    100.0 * SUM(i.story_points) FILTER (WHERE i.status = 'done')
          / NULLIF(SUM(i.story_points), 0),
    1
  ) AS completion_pct
FROM sprints s
JOIN issues i ON i.sprint_id = s.id
GROUP BY s.name
ORDER BY s.start_date DESC;`,
              task: `Confronta story points pianificati e completati per ogni sprint con una query SQL, cosi' da capire quanto le stime del team si discostano dalla realta'.`,
            },
            {
              english: 'Planning Poker',
              italian: 'Stima a carte del team (planning poker)',
              pronunciation: '/\u02C8pl\u00E6n\u026A\u014B \u02C8po\u028Ak\u0259r/',
              phonetic: 'PLE-ning POU-ker',
              example:
                'Use planning poker for unbiased estimation. = Usa il planning poker per stime imparziali.',
              context: 'scrum',
              difficulty: 'beginner',
            },
            {
              english: 'Roadmap',
              italian: "Piano d'Azione / Roadmap",
              pronunciation: '/\u02C8ro\u028Adm\u00E6p/',
              phonetic: 'ROUD-map',
              example:
                'The product roadmap shows the long-term vision. = La roadmap del prodotto mostra la visione a lungo termine.',
              context: 'management',
              difficulty: 'beginner',
            },
            {
              english: 'Stakeholder',
              italian: "Portatore d'Interesse / Stakeholder",
              pronunciation: '/\u02C8ste\u026Ak\u02CCho\u028Ald\u0259r/',
              phonetic: 'STEIK-hol-der',
              example:
                'Communicate the project status to all stakeholders. = Comunica lo stato del progetto a tutti gli stakeholder.',
              context: 'roles',
              difficulty: 'beginner',
              note: 'Chiunque abbia un interesse nel progetto (clienti, manager, utenti).',
            },
            {
              english: 'Gantt Chart',
              italian: 'Diagramma di Gantt',
              pronunciation: '/\u0261\u00E6nt t\u0283\u0251\u02D0rt/',
              phonetic: 'GANT CIART',
              example:
                'A Gantt chart visualizes the project schedule. = Un diagramma di Gantt visualizza la pianificazione del progetto.',
              context: 'management',
              difficulty: 'intermediate',
            },
            {
              english: 'Critical Path',
              italian: 'Percorso Critico',
              pronunciation: '/\u02C8kr\u026At\u026Akl p\u0251\u02D0\u03B8/',
              phonetic: 'CRI-ti-cal PATH',
              example:
                'Delaying a task on the critical path affects the whole project. = Ritardare un compito sul percorso critico influisce su tutto il progetto.',
              context: 'management',
              difficulty: 'advanced',
            },
            {
              english: 'Resource Allocation',
              italian: 'Allocazione delle Risorse',
              pronunciation:
                '/r\u026A\u02C8z\u0254\u02D0rs \u02CC\u00E6l\u0259\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 're-SORS al-lo-KEI-scion',
              example:
                'Poor resource allocation left one team idle while another was overloaded with three parallel deadlines. = Una cattiva allocazione delle risorse ha lasciato un team inattivo mentre un altro era sovraccaricato con tre scadenze parallele.',
              context: 'management',
              difficulty: 'intermediate',
            },
            {
              english: 'Scope Creep',
              italian: "Deriva dell'Ambito / Scope Creep",
              pronunciation: '/sko\u028Ap kri\u02D0p/',
              phonetic: 'SKOUP CRIIP',
              example:
                'Prevent scope creep to keep the project on track. = Previeni lo scope creep per mantenere il progetto in linea.',
              context: 'management',
              difficulty: 'advanced',
              note: "Quando l'ambito del progetto si espande in modo incontrollato.",
            },
          ],
        },
      ],
    },
    10: {
      name: 'Performance e Scalabilit\u00E0 / Performance & Scalability',
      description: 'Ottimizzazione e scaling dei sistemi',
      lessons: [
        {
          id: 'dev_perf_basics',
          title: 'Performance Base / Basic Performance',
          description: 'Latency, throughput, bandwidth...',
          items: [
            {
              english: 'Latency',
              italian: 'Latenza',
              pronunciation: '/\u02C8le\u026At\u0259nsi/',
              phonetic: 'LEI-ten-si',
              example:
                "Network latency affects application speed. = La latenza di rete influisce sulla velocit\u00E0 dell'applicazione.",
              context: 'performance',
              difficulty: 'beginner',
              note: "Il tempo che intercorre tra una richiesta e l'inizio della risposta.",
              command: 'ab -n 1000 -c 10 https://api.example.com/health',
              task: `Misura la latenza dell'endpoint di health inviando 1000 richieste con 10 client concorrenti per vedere il tempo medio di risposta.`,
            },
            {
              english: 'Throughput',
              italian: 'Capacit\u00E0 di Elaborazione / Throughput',
              pronunciation: '/\u02C8\u03B8ru\u02D0p\u028At/',
              phonetic: 'THRU-put',
              example:
                'Increase the throughput to handle more users. = Aumenta il throughput per gestire pi\u00F9 utenti.',
              context: 'performance',
              difficulty: 'intermediate',
              note: 'La quantit\u00E0 di lavoro completata in un dato tempo.',
              command: 'k6 run --vus 100 --duration 30s loadtest.js',
              task: `Esegui un load test con 100 utenti virtuali per 30 secondi per misurare il throughput in richieste al secondo dell'API.`,
            },
            {
              english: 'Response Time',
              italian: 'Tempo di Risposta',
              pronunciation: '/r\u026A\u02C8sp\u0252ns ta\u026Am/',
              phonetic: 're-SPONS taim',
              example:
                'A low response time is essential for a good user experience. = Un basso tempo di risposta \u00E8 essenziale per una buona UX.',
              context: 'performance',
              difficulty: 'beginner',
              command: `curl -o /dev/null -s -w 'time_total: %{time_total}s\\n' https://api.example.com/users`,
              task: `Misura il tempo di risposta totale dell'endpoint /users senza scaricare il body, mostrando solo la metrica time_total.`,
            },
            {
              english: 'Efficiency',
              italian: 'Efficienza',
              pronunciation: '/\u026A\u02C8f\u026A\u0283\u0259nsi/',
              phonetic: 'e-FI-scen-si',
              example:
                "Improve the algorithm for better efficiency. = Migliora l'algoritmo per una migliore efficienza.",
              context: 'performance',
              difficulty: 'beginner',
            },
            {
              english: 'Optimization',
              italian: 'Ottimizzazione',
              pronunciation: '/\u02CC\u0252pt\u026Ama\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'op-ti-mi-ZEI-scion',
              example:
                "Perform code optimization to reduce CPU usage. = Esegui l'ottimizzazione del codice per ridurre l'uso della CPU.",
              context: 'performance',
              difficulty: 'intermediate',
            },
            {
              english: 'Overhead',
              italian: 'Sovraccarico / Overhead',
              pronunciation: '/\u02CCo\u028Av\u0259r\u02C8hed/',
              phonetic: 'OU-ver-hed',
              example:
                'Too many features can add unnecessary overhead. = Troppe funzioni possono aggiungere un sovraccarico non necessario.',
              context: 'performance',
              difficulty: 'intermediate',
              note: 'Risorse extra spese per gestire un processo invece di eseguire il lavoro vero e proprio.',
            },
            {
              english: 'Profiling',
              italian: 'Profilazione / Profiling',
              pronunciation: '/\u02C8pro\u028Afa\u026Al\u026A\u014B/',
              phonetic: 'PROU-fai-ling',
              example:
                'Use profiling to find the slow parts of your code. = Usa il profiling per trovare le parti lente del codice.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'node --prof app.js && node --prof-process isolate-*.log > profile.txt',
              task: `Avvia l'app Node.js con il profiler V8 attivo e poi processa il log generato per ottenere un report leggibile delle funzioni piu' costose.`,
            },
            {
              english: 'Benchmark',
              italian: 'Test Comparativo / Benchmark',
              pronunciation: '/\u02C8bent\u0283m\u0251\u02D0rk/',
              phonetic: 'BENC-mark',
              example:
                'Run a benchmark to compare different servers. = Esegui un benchmark per confrontare server diversi.',
              context: 'performance',
              difficulty: 'intermediate',
              command: 'ab -n 5000 -c 50 -k https://api.example.com/products',
              task: `Esegui un benchmark con 5000 richieste totali e 50 connessioni keep-alive concorrenti sull'endpoint /products per confrontare due versioni del backend.`,
            },
            {
              english: 'Vertical Scaling',
              italian: 'Scalabilit\u00E0 Verticale',
              pronunciation:
                '/\u02C8v\u025C\u02D0rt\u026Akl \u02CCske\u026Al\u0259\u02C8b\u026Al\u0259ti/',
              phonetic: 'VER-ti-cal SKEI-la-bi-liti',
              example:
                "When vertical scaling hits the hardware limit, the only option left is horizontal scaling across multiple machines. = Quando la scalabilit\u00E0 verticale raggiunge il limite hardware, l'unica opzione rimanente \u00E8 la scalabilit\u00E0 orizzontale su pi\u00F9 macchine.",
              context: 'architecture',
              difficulty: 'intermediate',
            },
            {
              english: 'Horizontal Scaling',
              italian: 'Scalabilit\u00E0 Orizzontale',
              pronunciation:
                '/\u02CCh\u0252r\u026A\u02C8z\u0252ntl \u02CCske\u026Al\u0259\u02C8b\u026Al\u0259ti/',
              phonetic: 'o-ri-ZON-tal SKEI-la-bi-liti',
              example:
                'Cloud-native apps prefer horizontal scaling because adding more nodes is cheaper than buying a bigger server. = Le app cloud-native preferiscono la scalabilit\u00E0 orizzontale perch\u00E9 aggiungere pi\u00F9 nodi \u00E8 pi\u00F9 economico che comprare un server pi\u00F9 potente.',
              context: 'architecture',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dev_perf_caching',
          title: 'Caching',
          description: 'Cache, CDN, Redis, invalidation...',
          items: [
            {
              english: 'Cache',
              italian: 'Memoria Cache',
              pronunciation: '/k\u00E6\u0283/',
              phonetic: 'CASC',
              example:
                'A cache stores temporary data for quick access. = Una cache salva dati temporanei per un accesso rapido.',
              context: 'performance',
              difficulty: 'beginner',
              code: `async function getUser(id) {
  let user = await cache.get(\`user:\${id}\`);
  if (!user) {
    user = await db.users.findById(id);
    await cache.set(\`user:\${id}\`, user, { ttl: 3600 });
  }
  return user;
}`,
              task: `Implementa il pattern cache-aside che prima cerca l'utente in cache, e in caso di miss lo carica dal DB salvandolo con TTL di un'ora.`,
            },
            {
              english: 'CDN (Content Delivery Network)',
              italian: 'Rete di Distribuzione Contenuti',
              pronunciation: '/\u02CCsi\u02D0 di\u02D0 \u02CCen/',
              phonetic: 'sii-dii-EN',
              example:
                'CDNs improve speed by serving content from nearby locations. = Le CDN migliorano la velocit\u00E0 servendo contenuti da posizioni vicine.',
              context: 'infrastructure',
              difficulty: 'intermediate',
            },
            {
              english: 'Redis',
              italian: 'Cache in memoria (Redis)',
              pronunciation: '/\u02C8red\u026As/',
              phonetic: 'RE-dis',
              example:
                'Storing user sessions in Redis reduced our database load by 70 percent. = Salvare le sessioni utente in Redis ha ridotto il carico del nostro database del 70 percento.',
              context: 'tools',
              difficulty: 'intermediate',
              command: 'redis-cli -h cache.internal -p 6379 GET user:1234',
              task: `Connettiti al Redis interno sulla porta 6379 e leggi il valore associato alla chiave user:1234 per verificare se la sessione e' ancora in cache.`,
            },
            {
              english: 'Cache Invalidation',
              italian: 'Invalidazione della Cache',
              pronunciation:
                '/k\u00E6\u0283 \u026An\u02CCv\u00E6l\u026A\u02C8de\u026A\u0283\u0259n/',
              phonetic: 'CASC in-va-li-DEI-scion',
              example:
                "Getting cache invalidation wrong means users see stale data -- that is why it is considered one of the hardest problems in CS. = Sbagliare l'invalidazione della cache significa che gli utenti vedono dati vecchi -- per questo \u00E8 considerato uno dei problemi pi\u00F9 difficili in informatica.",
              context: 'performance',
              difficulty: 'advanced',
              note: 'Rimuovere dati vecchi o errati dalla cache quando i dati originali cambiano.',
              command: 'redis-cli -h cache.internal DEL user:1234 product:42',
              task: `Invalida manualmente la cache dell'utente 1234 e del prodotto 42 dopo un aggiornamento del DB, per evitare che i client leggano dati stantii.`,
            },
            {
              english: 'Cache Hit',
              italian: 'Trovato in cache (cache hit)',
              pronunciation: '/k\u00E6\u0283 h\u026At/',
              phonetic: 'CASC HIT',
              example:
                'A cache hit means the data was found in the cache. = Un cache hit significa che il dato \u00E8 stato trovato nella cache.',
              context: 'performance',
              difficulty: 'beginner',
              command: `redis-cli INFO stats | grep -E 'keyspace_hits|keyspace_misses'`,
              task: 'Estrai dalle statistiche di Redis i contatori di cache hit e cache miss per calcolare il tasso di hit ratio del cluster.',
            },
            {
              english: 'Cache Miss',
              italian: 'Non trovato in cache (cache miss)',
              pronunciation: '/k\u00E6\u0283 m\u026As/',
              phonetic: 'CASC MISS',
              example:
                'A cache miss requires fetching data from the slower source. = Un cache miss richiede il recupero dati dalla fonte pi\u00F9 lenta.',
              context: 'performance',
              difficulty: 'beginner',
              command: 'redis-cli INFO stats | grep keyspace_misses',
              task: `Monitora il numero totale di cache miss su Redis per capire se la TTL impostata e' troppo aggressiva e va alzata.`,
            },
            {
              english: 'Time To Live (TTL)',
              italian: 'Tempo di Vita (TTL)',
              pronunciation: '/ta\u026Am tu l\u026Av/',
              phonetic: 'TAIM tu LIV',
              example:
                'Set a low TTL for data that changes frequently. = Imposta un TTL basso per i dati che cambiano spesso.',
              context: 'performance',
              difficulty: 'intermediate',
              note: 'Il tempo dopo il quale il dato in cache viene considerato scaduto.',
              command: `redis-cli SET session:abc123 '{"userId":42}' EX 1800`,
              task: 'Salva una sessione utente in Redis impostando un TTL di 1800 secondi (30 minuti) dopo i quali la chiave scade automaticamente.',
            },
            {
              english: 'Least Recently Used (LRU)',
              italian: 'LRU / Usato meno di recente',
              pronunciation: '/li\u02D0st \u02C8ri\u02D0sntli ju\u02D0zd/',
              phonetic: 'LIIST RII-sent-li IUUSD',
              example:
                "When the cache is full, the LRU policy discards the item that has not been accessed for the longest time. = Quando la cache \u00E8 piena, la politica LRU scarta l'elemento che non \u00E8 stato acceduto per il periodo pi\u00F9 lungo.",
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Write-through Cache',
              italian: 'Scrittura Diretta / Write-through',
              pronunciation: '/ra\u026At \u03B8ru\u02D0 k\u00E6\u0283/',
              phonetic: 'RAIT THRU CASC',
              example:
                'A write-through cache updates the DB and cache simultaneously. = Una cache write-through aggiorna DB e cache contemporaneamente.',
              context: 'performance',
              difficulty: 'advanced',
              code: `async function updateUser(id, data) {
  await db.users.update(id, data);
  await cache.set(\`user:\${id}\`, data, { ttl: 3600 });
  return data;
}`,
              task: 'Implementa una scrittura write-through che aggiorna prima il database e poi sincronizza la cache con gli stessi dati, garantendo coerenza tra i due.',
            },
            {
              english: 'Browser Caching',
              italian: 'Caching del Browser',
              pronunciation: '/\u02C8bra\u028Az\u0259r \u02C8k\u00E6\u0283\u026A\u014B/',
              phonetic: 'BRAU-ser CA-scing',
              example:
                'Setting proper browser caching headers means returning visitors download only the files that actually changed. = Impostare correttamente gli header di caching del browser significa che i visitatori di ritorno scaricano solo i file effettivamente modificati.',
              context: 'frontend',
              difficulty: 'beginner',
              code: `app.use('/static', express.static('public', {
  maxAge: '1y',
  immutable: true,
  etag: true
}));`,
              task: `Configura Express per servire gli asset statici con un header Cache-Control di un anno e flag immutable, cosi' il browser non li riscarica fino al deploy successivo.`,
            },
          ],
        },
        {
          id: 'dev_perf_scaling',
          title: 'Scaling',
          description: 'Horizontal, vertical, sharding...',
          items: [
            {
              english: 'Read Replica',
              italian: 'Replica di Lettura',
              pronunciation: '/ri\u02D0d \u02C8repl\u026Ak\u0259/',
              phonetic: 'RIID RE-pli-ca',
              example:
                'Use read replicas to scale your database read traffic. = Usa le repliche di lettura per scalare il traffico di lettura del DB.',
              context: 'architecture',
              difficulty: 'advanced',
              code: `const writeDb = new Pool({ host: 'db-primary.internal' });
const readDb = new Pool({ host: 'db-replica.internal' });

async function listProducts() {
  return readDb.query('SELECT * FROM products LIMIT 100');
}`,
              task: 'Separa le connessioni in due pool distinti per primario e replica e instrada le query di lettura sulla read replica per alleggerire il master.',
            },
            {
              english: 'Statelessness',
              italian: 'Assenza di Stato / Statelessness',
              pronunciation: '/\u02C8ste\u026Atlesn\u0259s/',
              phonetic: 'STEIT-les-nes',
              example:
                "Designing for statelessness means any server in the cluster can handle any request, simplifying load balancing. = Progettare per l'assenza di stato significa che qualsiasi server nel cluster pu\u00F2 gestire qualsiasi richiesta, semplificando il bilanciamento del carico.",
              context: 'architecture',
              difficulty: 'advanced',
            },
            {
              english: 'Auto-scaling',
              italian: 'Scalabilit\u00E0 Automatica',
              pronunciation: '/\u02CC\u0254\u02D0to\u028A \u02C8ske\u026Al\u026A\u014B/',
              phonetic: 'O-tou SKEI-ling',
              example:
                "During a flash sale, auto-scaling spun up ten extra servers within minutes and scaled back down when traffic dropped. = Durante una flash sale, l'auto-scaling ha avviato dieci server extra in pochi minuti e li ha ridimensionati quando il traffico è calato.",
              context: 'infrastructure',
              difficulty: 'intermediate',
              command: 'kubectl autoscale deployment api --cpu-percent=70 --min=3 --max=20',
              task: 'Configura un Horizontal Pod Autoscaler sul deployment api che mantiene da 3 a 20 repliche puntando a un utilizzo CPU medio del 70 percento.',
            },
            {
              english: 'Elasticity',
              italian: 'Elasticit\u00E0',
              pronunciation: '/\u02CCi\u02D0l\u00E6\u02C8st\u026As\u0259ti/',
              phonetic: 'ii-las-TI-si-ti',
              example: `Cloud elasticity lets the platform add servers during a Black Friday spike and release them once traffic returns to normal levels. = L'elasticità del cloud permette alla piattaforma di aggiungere server durante un picco di Black Friday e di rilasciarli una volta che il traffico torna ai livelli normali.`,
              context: 'infrastructure',
              difficulty: 'beginner',
              note: 'La capacit\u00E0 di aumentare o diminuire le risorse in base alla domanda reale.',
            },
            {
              english: 'CAP Theorem',
              italian: 'Teorema CAP',
              pronunciation: '/k\u00E6p \u02C8\u03B8\u026A\u0259r\u0259m/',
              phonetic: 'KAP THII-o-rem',
              example:
                'The CAP theorem states you can only have two out of three: Consistency, Availability, and Partition Tolerance. = Il teorema CAP dice che puoi avere solo due cose su tre: Consistenza, Disponibilit\u00E0 e Tolleranza alle Partizioni.',
              context: 'architecture',
              difficulty: 'expert',
            },
            {
              english: 'Load Balancing (GSLB)',
              italian: 'Bilanciamento Globale (GSLB)',
              pronunciation:
                '/\u02C8\u0261lo\u028Abl \u02C8s\u025C\u02D0rv\u0259r lo\u028Ad \u02C8b\u00E6l\u0259ns\u026A\u014B/',
              phonetic: 'GLOU-bal SER-ver LOUD BA-lan-sing',
              example:
                'GSLB routes users to the nearest data center. = Il GSLB instrada gli utenti al data center pi\u00F9 vicino.',
              context: 'infrastructure',
              difficulty: 'expert',
            },
            {
              english: 'Partitioning',
              italian: 'Partizionamento',
              pronunciation: '/p\u0251\u02D0r\u02C8t\u026A\u0283\u0259n\u026A\u014B/',
              phonetic: 'par-TI-scio-ning',
              example:
                'Database partitioning improves performance for large tables. = Il partizionamento del DB migliora le prestazioni per tabelle grandi.',
              context: 'database',
              difficulty: 'advanced',
              code: `CREATE TABLE orders (
  id BIGSERIAL,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2026_q1 PARTITION OF orders
  FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');`,
              task: 'Crea una tabella orders partizionata per range di data, e definisci la partizione del primo trimestre 2026 per accelerare le query temporali.',
            },
            {
              english: 'Vertical Scaling (Scaling Up)',
              italian: 'Scalabilit\u00E0 Verticale',
              pronunciation: '/\u02C8v\u025C\u02D0rt\u026Akl \u02CCske\u026Al\u026A\u014B/',
              phonetic: 'VER-ti-cal SKEI-ling',
              example:
                'Scaling up means moving to a more powerful server. = Fare scaling up significa passare a un server pi\u00F9 potente.',
              context: 'architecture',
              difficulty: 'intermediate',
            },
            {
              english: 'Horizontal Scaling (Scaling Out)',
              italian: 'Scalabilit\u00E0 Orizzontale',
              pronunciation: '/\u02CCh\u0252r\u026A\u02C8z\u0252ntl \u02CCske\u026Al\u026A\u014B/',
              phonetic: 'o-ri-ZON-tal SKEI-ling',
              example:
                'Scaling out is the preferred way for cloud-native apps. = Fare scaling out \u00E8 il modo preferito per le app cloud-native.',
              context: 'architecture',
              difficulty: 'intermediate',
            },
            {
              english: 'Caching Strategy',
              italian: 'Strategia di Caching',
              pronunciation: '/\u02C8k\u00E6\u0283\u026A\u014B \u02C8str\u00E6t\u0259d\u0292i/',
              phonetic: 'CA-scing STRA-te-gi',
              example:
                'Choose your caching strategy carefully to avoid stale data. = Scegli con cura la tua strategia di cache per evitare dati vecchi.',
              context: 'performance',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'dev_perf_optimize',
          title: 'Ottimizzazione / Optimization',
          description: 'Profiling, bottleneck, indexing...',
          items: [
            {
              english: 'performance bottleneck',
              italian: 'collo di bottiglia delle prestazioni',
              pronunciation: '/\u02C8b\u0252tlnek/',
              phonetic: 'BO-tel-nek',
              example:
                'Profile the system under realistic load to find the performance bottleneck before optimising, otherwise you may speed up code that was never slow. = Profila il sistema sotto carico realistico per trovare il collo di bottiglia delle prestazioni prima di ottimizzare, altrimenti rischi di accelerare codice che non era mai lento.',
              context: 'performance',
              difficulty: 'intermediate',
              note: 'Distinto dal bottleneck Kanban (level 9), che riguarda il flusso di lavoro del team.',
              command: 'py-spy record -o profile.svg --duration 60 --pid $(pgrep -f myapp)',
              task: `Registra un flame graph del processo Python in produzione per 60 secondi cosi' da individuare la funzione che sta creando il collo di bottiglia.`,
            },
            {
              english: 'Big O Notation',
              italian: 'Notazione O-grande',
              pronunciation: '/b\u026A\u0261 o\u028A no\u028A\u02C8te\u026A\u0283\u0259n/',
              phonetic: 'BIG OU nou-TEI-scion',
              example:
                'Understanding Big O notation helps you predict whether your algorithm will still be fast with a million records. = Capire la notazione O-grande ti aiuta a prevedere se il tuo algoritmo sar\u00E0 ancora veloce con un milione di record.',
              context: 'computer-science',
              difficulty: 'advanced',
              note: 'Es: O(1) costante, O(n) lineare, O(n^2) quadratica.',
            },
            {
              english: 'Memoization',
              italian: 'Memoizzazione',
              pronunciation: '/\u02CCmem\u0259\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'me-moi-ZEI-scion',
              example:
                'Applying memoization to the Fibonacci function reduces its time complexity from exponential to linear. = Applicare la memoizzazione alla funzione di Fibonacci riduce la complessità temporale da esponenziale a lineare.',
              context: 'performance',
              difficulty: 'advanced',
              code: 'const memoizedFn = useMemo(() => computeExpensive(data), [data]);',
              task: 'Applica useMemo per memoizzare il risultato di computeExpensive in un componente React, evitando di ricalcolarlo a ogni render se data non cambia.',
            },
            {
              english: 'Memory Leak',
              italian: 'Perdita di Memoria / Memory Leak',
              pronunciation: '/\u02C8mem\u0259ri li\u02D0k/',
              phonetic: 'ME-mori LIIC',
              example:
                'A memory leak eventually crashes the server. = Un memory leak alla fine fa crashare il server.',
              context: 'errors',
              difficulty: 'intermediate',
              note: 'Quando il programma occupa RAM e non la rilascia pi\u00F9.',
              command: 'node --inspect=0.0.0.0:9229 app.js',
              task: `Avvia l'app Node.js con l'inspector remoto in ascolto sulla porta 9229 cosi' da collegare Chrome DevTools e catturare due heap snapshot da confrontare per individuare il memory leak.`,
            },
            {
              english: 'Garbage Collection (GC)',
              italian: 'Raccolta Rifiuti / Garbage Collection',
              pronunciation:
                '/\u02C8\u0261\u0251\u02D0rb\u026Ad\u0292 k\u0259\u02C8lek\u0283\u0259n/',
              phonetic: 'GAR-beg co-LEK-scion',
              example:
                'Garbage collection automatically frees unused memory. = La garbage collection libera automaticamente la memoria inutilizzata.',
              context: 'internals',
              difficulty: 'intermediate',
            },
            {
              english: 'Lazy Loading',
              italian: 'Caricamento Ritardato / Lazy',
              pronunciation: '/\u02C8le\u026Azi \u02C8lo\u028Ad\u026A\u014B/',
              phonetic: 'LEI-si LOU-ding',
              example:
                'Use lazy loading for images to speed up initial page load. = Usa il lazy loading per le immagini per velocizzare il caricamento iniziale.',
              context: 'performance',
              difficulty: 'beginner',
              code: `const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  );
}`,
              task: `Importa HeavyChart con React.lazy e avvolgilo in un Suspense con spinner, cosi' il bundle del grafico viene scaricato solo quando serve.`,
            },
            {
              english: 'Prefetching',
              italian: 'Precaricamento / Prefetching',
              pronunciation: '/\u02CCpri\u02D0\u02C8fet\u0283\u026A\u014B/',
              phonetic: 'pri-FECC-ing',
              example:
                "By prefetching the next page while the user reads the current one, navigation feels instantaneous. = Con il prefetching della pagina successiva mentre l'utente legge quella corrente, la navigazione sembra istantanea.",
              context: 'performance',
              difficulty: 'advanced',
              code: `<link rel="prefetch" href="./checkout.js" as="script">
<link rel="preconnect" href="https://api.payments.example.com">`,
              task: `Aggiungi nell'head della pagina un hint di prefetch per lo script del checkout e un preconnect verso il gateway di pagamento, cosi' la navigazione successiva risulta istantanea.`,
            },
            {
              english: 'Algorithmic Complexity',
              italian: 'Complessit\u00E0 Algoritmica',
              pronunciation:
                '/\u02CC\u00E6l\u0261\u0259\u02C8r\u026A\u00F0m\u026Ak k\u0259m\u02C8pleks\u0259ti/',
              phonetic: 'al-go-RID-mic com-PLES-si-ti',
              example:
                'Optimize algorithmic complexity to handle larger datasets. = Ottimizza la complessit\u00E0 algoritmica per gestire set di dati pi\u00F9 grandi.',
              context: 'computer-science',
              difficulty: 'advanced',
            },
            {
              english: 'Premature Optimization',
              italian: 'Ottimizzazione Prematura',
              pronunciation:
                '/\u02CCpri\u02D0m\u0259\u02C8tj\u028A\u0259r \u02CC\u0252pt\u026Ama\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'pri-ma-TIUR op-ti-mi-ZEI-scion',
              example:
                "As Knuth famously said, premature optimization is the root of all evil -- profile first, then optimise the hot paths. = Come Knuth disse notoriamente, l'ottimizzazione prematura \u00E8 la radice di tutti i mali -- prima profila, poi ottimizza i percorsi caldi.",
              context: 'philosophy',
              difficulty: 'intermediate',
              note: 'Citazione di Donald Knuth: non ottimizzare codice che non \u00E8 ancora un problema.',
            },
            {
              english: 'Indexing',
              italian: 'Indicizzazione',
              pronunciation: '/\u02C8\u026Andeks\u026A\u014B/',
              phonetic: 'IN-deks-ing',
              example:
                'Adding proper indexing to the users table reduced the query time from 3 seconds to 10 milliseconds. = Aggiungere una corretta indicizzazione alla tabella utenti ha ridotto il tempo della query da 3 secondi a 10 millisecondi.',
              context: 'database',
              difficulty: 'intermediate',
              code: `CREATE INDEX CONCURRENTLY idx_orders_user_status ON orders(user_id, status) WHERE status IN ('pending', 'paid');`,
              task: 'Crea un indice parziale composto su user_id e status filtrato sugli ordini pending e paid, senza bloccare le scritture grazie a CONCURRENTLY.',
            },
          ],
        },
      ],
    },
    11: {
      name: 'Carriera e Comunicazione / Career & Communication',
      description: 'Competenze professionali e comunicazione tecnica',
      lessons: [
        {
          id: 'dev_career_interview',
          title: 'Colloqui / Interviews',
          description: 'Technical interview, whiteboard...',
          items: [
            {
              english: 'Technical Interview',
              italian: 'Colloquio Tecnico',
              pronunciation: '/\u02C8tekn\u026Akl \u02C8\u026Ant\u0259rvju\u02D0/',
              phonetic: 'TEK-ni-cal IN-ter-viu',
              example:
                'Prepare for your technical interview by reviewing algorithms. = Preparati al colloquio tecnico ripassando gli algoritmi.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Whiteboard Challenge',
              italian: 'Sfida alla Lavagna',
              pronunciation: '/\u02C8wa\u026Atb\u0254\u02D0rd \u02C8t\u0283\u00E6l\u026And\u0292/',
              phonetic: 'UAIT-bord CAL-leng',
              example:
                'A whiteboard challenge tests your problem-solving skills on the fly. = Una sfida alla lavagna testa le tue capacit\u00E0 di problem-solving sul momento.',
              context: 'career',
              difficulty: 'intermediate',
            },
            {
              english: 'Live Coding',
              italian: 'Codifica dal vivo (live coding)',
              pronunciation: '/la\u026Av \u02C8ko\u028Ad\u026A\u014B/',
              phonetic: 'LAIV KOU-ding',
              example:
                "During the live coding session, the interviewer asked me to refactor a recursive function into an iterative one. = Durante la sessione di live coding, l'intervistatore mi ha chiesto di trasformare una funzione ricorsiva in una iterativa.",
              context: 'career',
              difficulty: 'intermediate',
            },
            {
              english: 'System Design Interview',
              italian: 'Colloquio di Design di Sistema',
              pronunciation:
                '/\u02C8s\u026Ast\u0259m d\u026A\u02C8za\u026An \u02C8\u026Ant\u0259rvju\u02D0/',
              phonetic: 'SIS-tem di-ZAIN IN-ter-viu',
              example:
                'Senior developers often undergo system design interviews. = Gli sviluppatori senior spesso affrontano colloqui di design di sistema.',
              context: 'career',
              difficulty: 'advanced',
            },
            {
              english: 'Behavioral Interview',
              italian: 'Colloquio Comportamentale',
              pronunciation:
                '/b\u026A\u02C8he\u026Avj\u0259r\u0259l \u02C8\u026Ant\u0259rvju\u02D0/',
              phonetic: 'bi-HEI-vior-al IN-ter-viu',
              example:
                'A behavioral interview focuses on your past experiences and soft skills. = Un colloquio comportamentale si concentra sulle tue esperienze passate e soft skill.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Cultural Fit',
              italian: 'Affinit\u00E0 Culturale',
              pronunciation: '/\u02C8k\u028Clt\u0283\u0259r\u0259l f\u026At/',
              phonetic: 'CAL-ciural FIT',
              example:
                "Companies assess cultural fit to see if a candidate shares the team's values around collaboration, feedback, and ownership. = Le aziende valutano l'affinit\u00E0 culturale per vedere se un candidato condivide i valori del team su collaborazione, feedback e ownership.",
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Portfolio',
              italian: 'Raccolta lavori (portfolio)',
              pronunciation: '/p\u0254\u02D0rt\u02C8fo\u028Alio\u028A/',
              phonetic: 'port-FOU-li-ou',
              example:
                'Show your best projects in your developer portfolio. = Mostra i tuoi progetti migliori nel tuo portfolio.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Resume / CV',
              italian: 'Curriculum Vitae',
              pronunciation: '/\u02C8rezju\u02D0me\u026A/',
              phonetic: 'RE-siu-mei',
              example:
                'Keep your resume updated with your latest skills. = Tieni il tuo CV aggiornato con le tue ultime competenze.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Mock Interview',
              italian: 'Simulazione di Colloquio',
              pronunciation: '/m\u0252k \u02C8\u026Ant\u0259rvju\u02D0/',
              phonetic: 'MOCK IN-ter-viu',
              example:
                "Practice with a mock interview to reduce anxiety. = Esercitati con un colloquio simulato per ridurre l'ansia.",
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Soft Skills',
              italian: 'Competenze Trasversali',
              pronunciation: '/s\u0252ft sk\u026Alz/',
              phonetic: 'SOFT SKILS',
              example:
                'Communication and teamwork are essential soft skills. = Comunicazione e lavoro di squadra sono soft skill essenziali.',
              context: 'career',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'dev_career_collab',
          title: 'Collaborazione / Collaboration',
          description: 'Code review, pair programming...',
          items: [
            {
              english: 'Pair Programming',
              italian: 'Programmazione in Coppia',
              pronunciation: '/per \u02C8pro\u028A\u0261r\u00E6m\u026A\u014B/',
              phonetic: 'PER PRO-gram-ming',
              example:
                "In pair programming, one developer writes code while the other reviews every line and thinks about the overall design. = Nella programmazione in coppia, uno sviluppatore scrive il codice mentre l'altro revisiona ogni riga e pensa al design complessivo.",
              context: 'collaboration',
              difficulty: 'beginner',
              note: "Uno scrive il codice (Driver), l'altro revisiona e pensa alla strategia (Navigator).",
            },
            {
              english: 'Mob Programming',
              italian: 'Programmazione di Gruppo / Mob',
              pronunciation: '/m\u0252b \u02C8pro\u028A\u0261r\u00E6m\u026A\u014B/',
              phonetic: 'MOB PRO-gram-ming',
              example:
                'During mob programming, five developers share one screen and rotate the driver role every fifteen minutes. = Durante il mob programming, cinque sviluppatori condividono uno schermo e si alternano nel ruolo di driver ogni quindici minuti.',
              context: 'collaboration',
              difficulty: 'intermediate',
            },
            {
              english: 'Peer Review',
              italian: 'Revisione tra Pari',
              pronunciation: '/p\u026A\u0259r r\u026A\u02C8vju\u02D0/',
              phonetic: 'PIER re-VIU',
              example:
                "A thorough peer review catches bugs, shares knowledge, and enforces coding standards before code reaches production. = Un'accurata peer review trova bug, condivide conoscenza e impone standard di codifica prima che il codice arrivi in produzione.",
              context: 'collaboration',
              difficulty: 'beginner',
            },
            {
              english: 'Knowledge Sharing',
              italian: 'Condivisione della Conoscenza',
              pronunciation: '/\u02C8n\u0252l\u026Ad\u0292 \u02C8\u0283e\u0259r\u026A\u014B/',
              phonetic: 'NO-leg SCER-ing',
              example:
                "Weekly knowledge sharing sessions ensure no single developer is the only person who understands a critical system. = Le sessioni settimanali di condivisione della conoscenza assicurano che nessuno sviluppatore sia l'unico a capire un sistema critico.",
              context: 'culture',
              difficulty: 'beginner',
            },
            {
              english: 'Mentoring',
              italian: 'Affiancamento (mentoring)',
              pronunciation: '/\u02C8ment\u0254\u02D0r\u026A\u014B/',
              phonetic: 'MEN-to-ring',
              example:
                'Good mentoring pairs a senior engineer with a junior developer for weekly one-on-ones to discuss growth and challenges. = Un buon mentoring abbina un ingegnere senior a uno sviluppatore junior per incontri settimanali per discutere crescita e sfide.',
              context: 'career',
              difficulty: 'intermediate',
            },
            {
              english: 'Cross-functional Team',
              italian: 'Team Interfunzionale',
              pronunciation: '/kr\u0252s \u02C8f\u028C\u014Bk\u0283\u0259nl ti\u02D0m/',
              phonetic: 'CROS FANK-scio-nal TIIM',
              example:
                'A cross-functional team includes devs, designers, and testers. = Un team interfunzionale include dev, designer e tester.',
              context: 'organization',
              difficulty: 'intermediate',
            },
            {
              english: 'Silo (Organizational)',
              italian: 'Compartimento stagno (silo)',
              pronunciation: '/\u02C8sa\u026Alo\u028A/',
              phonetic: 'SAI-lou',
              example:
                'Break down silos to improve collaboration. = Abbatti i compartimenti stagni per migliorare la collaborazione.',
              context: 'culture',
              difficulty: 'intermediate',
            },
            {
              english: 'Conflict Resolution',
              italian: 'Risoluzione dei Conflitti',
              pronunciation:
                '/\u02C8k\u0252nfl\u026Akt \u02CCrez\u0259\u02C8lu\u02D0\u0283\u0259n/',
              phonetic: 'CON-flikt re-so-LIU-scion',
              example:
                "Effective conflict resolution turns a heated debate about architecture into a constructive decision the whole team supports. = Un'efficace risoluzione dei conflitti trasforma un acceso dibattito sull'architettura in una decisione costruttiva supportata da tutto il team.",
              context: 'career',
              difficulty: 'advanced',
            },
            {
              english: 'Technical Leadership',
              italian: 'Leadership Tecnica',
              pronunciation: '/\u02C8tekn\u026Akl \u02C8li\u02D0d\u0259r\u0283\u026Ap/',
              phonetic: 'TEK-ni-cal LII-der-scip',
              example:
                'Strong technical leadership means making sound architectural decisions while empowering the team to own their code. = Una forte leadership tecnica significa prendere decisioni architetturali solide dando al team la responsabilità del proprio codice.',
              context: 'career',
              difficulty: 'advanced',
            },
            {
              english: 'Onboarding',
              italian: 'Inserimento / Onboarding',
              pronunciation: '/\u02C8\u0252nb\u0254\u02D0rd\u026A\u014B/',
              phonetic: 'ON-bor-ding',
              example:
                'The onboarding process helps new hires get up to speed. = Il processo di onboarding aiuta i nuovi assunti a diventare operativi.',
              context: 'organization',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'dev_career_docs',
          title: 'Documentazione Tecnica / Tech Docs',
          description: 'RFC, ADR, technical writing...',
          items: [
            {
              english: 'RFC (Request for Comments)',
              italian: 'Richiesta di Commenti (RFC)',
              pronunciation: '/\u02CC\u0251\u02D0r ef \u02C8si\u02D0/',
              phonetic: 'ar-ef-SII',
              example:
                'Submit an RFC to propose a major change. = Invia una RFC per proporre un cambiamento importante.',
              context: 'documentation',
              difficulty: 'advanced',
              note: 'Documento usato per discutere nuove feature o standard con la community o il team.',
            },
            {
              english: 'ADR (Architecture Decision Record)',
              italian: 'Registro Decisioni Architetturali',
              pronunciation: '/\u02CCe\u026A di\u02D0 \u02CC\u0251\u02D0r/',
              phonetic: 'ei-dii-AR',
              example:
                'ADRs document the "why" behind architectural choices. = Le ADR documentano il "perch\u00E9" dietro le scelte architetturali.',
              context: 'documentation',
              difficulty: 'advanced',
            },
            {
              english: 'Technical Writing',
              italian: 'Scrittura Tecnica',
              pronunciation: '/\u02C8tekn\u026Akl \u02C8ra\u026At\u026A\u014B/',
              phonetic: 'TEK-ni-cal RAI-ting',
              example:
                "Good technical writing explains a complex API in simple language that both developers and product managers can understand. = Una buona scrittura tecnica spiega un'API complessa in un linguaggio semplice che sia sviluppatori che product manager possono capire.",
              context: 'career',
              difficulty: 'intermediate',
            },
            {
              english: 'Documentation-as-Code',
              italian: 'Documentazione come Codice',
              pronunciation:
                '/\u02CCd\u0252kj\u028Amen\u02C8te\u026A\u0283\u0259n \u00E6z ko\u028Ad/',
              phonetic: 'do-kiu-men-TEI-scion az KOUD',
              example:
                'Treating documentation-as-code means it lives in the same repo as the source, is reviewed in pull requests, and stays in sync. = Trattare la documentazione come codice significa che vive nella stessa repo del sorgente, viene revisionata nelle pull request e resta sincronizzata.',
              context: 'documentation',
              difficulty: 'intermediate',
            },
            {
              english: 'Diagramming',
              italian: 'Diagrammazione',
              pronunciation: '/\u02C8da\u026A\u0259\u0261r\u00E6m\u026A\u014B/',
              phonetic: 'DAIE-gram-ming',
              example:
                'Use Mermaid or PlantUML for automated diagramming. = Usa Mermaid o PlantUML per la diagrammazione automatica.',
              context: 'documentation',
              difficulty: 'intermediate',
              code: `\`\`\`mermaid
sequenceDiagram
  Client->>API: POST /login
  API->>DB: SELECT user
  DB-->>API: row
  API-->>Client: 200 + JWT
\`\`\``,
              task: 'Scrivi un sequence diagram Mermaid che documenta il flusso di login fra client, API e database, da incollare direttamente nella RFC.',
            },
            {
              english: 'API Documentation',
              italian: 'Documentazione API',
              pronunciation:
                '/\u02CCe\u026A pi\u02D0 \u02C8a\u026A \u02CCd\u0252kj\u028Amen\u02C8te\u026A\u0283\u0259n/',
              phonetic: 'ei-pi-ai do-kiu-men-TEI-scion',
              example:
                'Swagger provides interactive API documentation. = Swagger fornisce una documentazione API interattiva.',
              context: 'documentation',
              difficulty: 'beginner',
              code: `/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: User found
 */`,
              task: `Annota l'endpoint GET /users/{id} con un blocco OpenAPI in formato JSDoc cosi' che Swagger generi automaticamente la documentazione interattiva.`,
            },
            {
              english: 'Changelog',
              italian: 'Registro Modifiche / Changelog',
              pronunciation: '/\u02C8t\u0283e\u026And\u0292l\u0252\u0261/',
              phonetic: 'CEING-log',
              example:
                'Keep a changelog to track version updates. = Tieni un changelog per tracciare gli aggiornamenti di versione.',
              context: 'documentation',
              difficulty: 'beginner',
              code: `## [1.4.0] - 2026-05-17
### Added
- Endpoint /users/{id}/avatar per upload immagine profilo.
### Fixed
- Race condition nel rinnovo del JWT (#482).
### Deprecated
- Header X-Api-Token, usare Authorization: Bearer.`,
              task: 'Aggiungi al CHANGELOG.md una nuova entry per la versione 1.4.0 seguendo il formato Keep a Changelog con sezioni Added, Fixed e Deprecated.',
            },
            {
              english: 'Developer Guide',
              italian: 'Guida per lo Sviluppatore',
              pronunciation: '/d\u026A\u02C8vel\u0259p\u0259r \u0261a\u026Ad/',
              phonetic: 'di-VE-lo-per GAID',
              example:
                'The developer guide helps new contributors get started. = La guida per lo sviluppatore aiuta i nuovi collaboratori ad iniziare.',
              context: 'documentation',
              difficulty: 'beginner',
            },
            {
              english: 'Self-documenting Code',
              italian: 'Codice Auto-documentato',
              pronunciation: '/self \u02C8d\u0252kj\u028Ament\u026A\u014B ko\u028Ad/',
              phonetic: 'SELF do-kiu-men-ting KOUD',
              example:
                'Write self-documenting code with clear naming. = Scrivi codice auto-documentato con nomi chiari.',
              context: 'development',
              difficulty: 'intermediate',
              note: 'Codice cos\u00EC pulito e chiaro che non ha bisogno di molti commenti.',
              code: `// Prima: cosa fa questo numero?
if (user.failedAttempts > 5) lock(user);

// Dopo: il codice si spiega da solo.
const MAX_LOGIN_ATTEMPTS = 5;
if (user.failedAttempts > MAX_LOGIN_ATTEMPTS) lockAccount(user);`,
              task: `Refattorizza il controllo dei tentativi di login estraendo il magic number in una costante MAX_LOGIN_ATTEMPTS e rinominando lock in lockAccount, cosi' il codice si auto-documenta.`,
            },
            {
              english: 'README.md',
              italian: 'File README',
              pronunciation: '/\u02C8ri\u02D0d mi\u02D0 dot em di\u02D0/',
              phonetic: 'RIID mii dot em dii',
              example:
                "The README.md is the entry point of your documentation. = Il README.md \u00E8 il punto d'ingresso della documentazione.",
              context: 'documentation',
              difficulty: 'beginner',
              code: `# my-app

Backend Node.js per la gestione ordini.

## Quick start

\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

## Test

\`\`\`bash
npm test
\`\`\``,
              task: `Scrivi un README.md minimale con titolo, una riga di descrizione, una sezione Quick start con i comandi per installare e avviare l'app in dev, e una sezione Test.`,
            },
          ],
        },
        {
          id: 'dev_career_growth',
          title: 'Crescita / Growth',
          description: 'Technical debt, mentoring, estimation...',
          items: [
            {
              english: 'Seniority Level',
              italian: 'Livello di Anzianit\u00E0',
              pronunciation: '/\u02CCsi\u02D0ni\u02C8\u0252r\u0259ti \u02C8levl/',
              phonetic: 'si-NI-o-riti LE-vel',
              example:
                'Moving to the next seniority level requires more responsibility. = Passare al livello di anzianit\u00E0 successivo richiede più responsabilit\u00E0.',
              context: 'career',
              difficulty: 'beginner',
              note: 'Junior, Mid-level, Senior, Principal.',
            },
            {
              english: 'Individual Contributor (IC)',
              italian: 'Contributore Individuale',
              pronunciation:
                '/\u02CC\u026And\u026A\u02C8v\u026Ad\u0292u\u0259l k\u0259n\u02C8tr\u026Abj\u028At\u0259r/',
              phonetic: 'in-di-VI-giu-al con-TRI-biu-ter',
              example:
                'A Senior IC focuses on code and architecture without managing people. = Un IC senior si concentra su codice e architettura senza gestire persone.',
              context: 'career',
              difficulty: 'intermediate',
            },
            {
              english: 'Tech Lead',
              italian: 'Responsabile Tecnico',
              pronunciation: '/tek li\u02D0d/',
              phonetic: 'TEK LIID',
              example:
                'The tech lead guides the technical direction of the team. = Il tech lead guida la direzione tecnica del team.',
              context: 'roles',
              difficulty: 'intermediate',
            },
            {
              english: 'Engineering Manager',
              italian: "Manager dell'Ingegneria",
              pronunciation:
                '/\u02CCend\u0292\u026A\u02C8n\u026A\u0259r\u026A\u014B \u02C8m\u00E6n\u026Ad\u0292\u0259r/',
              phonetic: 'en-gi-NIR-ing MAN-ig-ger',
              example:
                'An engineering manager focuses on people and processes. = Un engineering manager si concentra su persone e processi.',
              context: 'roles',
              difficulty: 'intermediate',
            },
            {
              english: 'Continuous Learning',
              italian: 'Apprendimento Continuo',
              pronunciation: '/k\u0259n\u02C8t\u026Anju\u0259s \u02C8l\u025C\u02D0rn\u026A\u014B/',
              phonetic: 'con-TI-niuos LER-ning',
              example:
                "Dedicating one hour each day to continuous learning -- reading docs, watching talks, or contributing to side projects -- compounds over time. = Dedicare un'ora al giorno all'apprendimento continuo -- leggere documentazione, guardare talk o contribuire a side project -- si accumula nel tempo.",
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Personal Branding',
              italian: 'Marchio Personale / Branding',
              pronunciation: '/\u02C8p\u025C\u02D0rs\u0259nl \u02C8br\u00E6nd\u026A\u014B/',
              phonetic: 'PER-so-nal BREND-ing',
              example:
                'Build your personal branding through blog posts and talks. = Costruisci il tuo branding personale tramite blog e talk.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Networking',
              italian: 'Relazioni professionali (networking)',
              pronunciation: '/\u02C8netw\u025Crk\u026A\u014B/',
              phonetic: 'NET-uer-king',
              example:
                'Professional networking helps find new opportunities. = Il networking professionale aiuta a trovare nuove opportunit\u00E0.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Open Source Contribution',
              italian: 'Contributo Open Source',
              pronunciation:
                '/\u02C8o\u028Ap\u0259n s\u0254\u02D0rs \u02CCk\u0252ntr\u026A\u02C8bju\u02D0\u0283\u0259n/',
              phonetic: 'OUPEN SORS con-tri-BIU-scion',
              example:
                'Making your first open source contribution -- even fixing a typo in the docs -- teaches you how large projects manage collaboration. = Fare il tuo primo contributo open source -- anche correggere un errore nei docs -- ti insegna come i grandi progetti gestiscono la collaborazione.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Work-Life Balance',
              italian: 'Equilibrio Lavoro-Vita',
              pronunciation: '/w\u025C\u02D0rk la\u026Af \u02C8b\u00E6l\u0259ns/',
              phonetic: 'WERK LAIF BA-lans',
              example:
                'Maintaining a good work-life balance prevents burnout. = Mantenere un buon equilibrio lavoro-vita previene il burnout.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'T-Shaped Skills',
              italian: 'Competenze a T',
              pronunciation: '/ti\u02D0 \u0283e\u026Apt sk\u026Alz/',
              phonetic: 'TII-scieipt SKILS',
              example:
                'A T-shaped professional has broad knowledge and deep expertise in one area. = Un professionista "a T" ha conoscenze ampie e un\'esperienza profonda in un\'area.',
              context: 'career',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
  },
};
