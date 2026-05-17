/**
 * PYTHON PROGRAMMING TOPIC DATA - FlowLearn
 * ==========================================
 *
 * 12 levels of English Python programming terminology.
 * Progression: Foundations → Pro Ecosystem
 *
 * STATUS: Placeholder structure - levels will be populated progressively.
 */

export default {
  id: 'python',
  levels: {
    0: {
      name: 'Fondamenti / Foundations',
      description: 'Le prime parole della programmazione Python',
      lessons: [
        {
          id: 'py_basics_1',
          title: 'Termini Essenziali / Essential Terms',
          description: 'Variable, print, input, string...',
          items: [
            {
              english: 'Variable',
              italian: 'Variabile',
              pronunciation: '/\u02C8veri\u0259bl/',
              phonetic: 'VE-ri-ebol',
              example:
                'In Python you can reassign a variable to a different type at any time without declaring it first. = In Python puoi riassegnare una variabile a un tipo diverso in qualsiasi momento senza dichiararla prima.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'In Python, le variabili sono nomi che puntano a oggetti in memoria (name binding), non "contenitori" di valori.',
              code: `user_name = 'alice'
age = 25
print(user_name, age)`,
              task: 'Definisci due variabili che rappresentano nome ed eta di un utente e stampale insieme sulla console.',
            },
            {
              english: 'Print',
              italian: 'Stampa (Print)',
              pronunciation: '/pr\u026Ant/',
              phonetic: 'PRINT',
              example:
                'Calling print() with f-strings lets you embed variables directly in the output. = Chiamare print() con le f-string permette di inserire variabili direttamente nel testo.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'print("Hello, Python!")',
              note: 'print() \u00E8 una funzione integrata (built-in) che invia dati allo standard output.',
            },
            {
              english: 'Input',
              italian: 'Ingresso (Input)',
              pronunciation: '/\u02C8\u026Anp\u028At/',
              phonetic: 'IN-put',
              example:
                "Always validate user input before processing it to prevent crashes. = Valida sempre l'input dell'utente prima di elaborarlo per evitare crash.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'name = input("Enter your name: ")',
              note: "La funzione input() restituisce sempre una stringa, indipendentemente da cosa digita l'utente.",
            },
            {
              english: 'String',
              italian: 'Stringa',
              pronunciation: '/str\u026A\u014B/',
              phonetic: 'STRING',
              example:
                'You can slice a string with my_text[0:5] to extract the first five characters. = Puoi fare lo slicing di una stringa con my_text[0:5] per estrarre i primi cinque caratteri.',
              context: 'types',
              difficulty: 'beginner',
              note: `In Python, le stringhe sono immutabili e possono essere racchiuse tra apici singoli (') o doppi (").`,
              code: `greeting = 'Hello, world'
first_word = greeting[:5]`,
              task: 'Estrai i primi cinque caratteri da una stringa di saluto usando lo slicing.',
            },
            {
              english: 'Comment',
              italian: 'Commento',
              pronunciation: '/\u02C8k\u0252ment/',
              phonetic: 'KOM-ment',
              example:
                'Adding a brief comment above complex logic helps other developers understand your intent. = Aggiungere un breve commento sopra la logica complessa aiuta gli altri sviluppatori a capire il tuo intento.',
              context: 'foundations',
              difficulty: 'beginner',
              code: '# This is a comment\nprint("Hi")',
              note: "I commenti vengono ignorati dall'interprete e servono a spiegare il codice agli esseri umani.",
            },
            {
              english: 'Indentation',
              italian: 'Indentazione / Rientro',
              pronunciation: '/\u02CC\u026Anden\u02C8te\u026A\u0283\u0259n/',
              phonetic: 'in-den-TEI-scen',
              example:
                "Python uses indentation to define code blocks. = Python usa l'indentazione per definire i blocchi di codice.",
              context: 'syntax',
              difficulty: 'beginner',
              note: "A differenza di altri linguaggi, in Python l'indentazione \u00E8 obbligatoria e definisce la struttura logica (off-side rule).",
              code: `if user.is_active:
    send_email(user)
    log('email sent')`,
              task: `Costruisci un blocco condizionale indentato che invia una mail e registra l'azione solo per utenti attivi.`,
            },
            {
              english: 'Syntax',
              italian: 'Sintassi',
              pronunciation: '/\u02C8s\u026Ant\u00E6ks/',
              phonetic: 'SIN-taks',
              example:
                'Follow the Python syntax to avoid errors. = Segui la sintassi di Python per evitare errori.',
              context: 'foundations',
              difficulty: 'beginner',
              note: "La sintassi \u00E8 l'insieme di regole che definiscono come devono essere scritti i programmi.",
              code: `for item in cart:
    total += item.price`,
              task: 'Scrivi un ciclo for sintatticamente corretto che somma i prezzi degli articoli in un carrello.',
            },
            {
              english: 'Statement',
              italian: 'Istruzione (Statement)',
              pronunciation: '/\u02C8ste\u026Atm\u0259nt/',
              phonetic: 'STEIT-ment',
              example:
                "Each line in a Python file is typically a single statement that performs one action. = Ogni riga in un file Python \u00E8 tipicamente una singola istruzione che esegue un'azione.",
              context: 'foundations',
              difficulty: 'beginner',
              note: "Uno statement \u00E8 un'unit\u00E0 di codice che esegue un'azione.",
              code: `import json
config = load_config()
return config`,
              task: 'Scrivi tre istruzioni consecutive che importano un modulo, caricano la configurazione e la restituiscono.',
            },
            {
              english: 'Expression',
              italian: 'Espressione',
              pronunciation: '/\u026Ak\u02C8spre\u0283\u0259n/',
              phonetic: 'ik-SPRE-scen',
              example:
                "2 + 3 is an expression that evaluates to 5. = 2 + 3 \u00E8 un'espressione che produce 5.",
              context: 'foundations',
              difficulty: 'beginner',
              note: "Un'espressione \u00E8 una combinazione di valori e operatori che viene valutata per produrre un risultato.",
              code: 'discounted = price * (1 - discount_rate)',
              task: `Calcola il prezzo scontato di un prodotto usando un'espressione aritmetica con due variabili.`,
            },
            {
              english: 'Keyword',
              italian: 'Parola Chiave',
              pronunciation: '/\u02C8ki\u02D0w\u025C\u02D0rd/',
              phonetic: 'KII-uerd',
              example:
                "Using a keyword like 'class' as a variable name raises a SyntaxError. = Usare una parola chiave come 'class' come nome di variabile genera un SyntaxError.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Le keyword sono parole riservate che hanno un significato speciale per Python e non possono essere usate come nomi di variabili.',
              code: `import keyword
print(keyword.kwlist)`,
              task: `Stampa l'elenco di tutte le parole chiave riservate di Python usando il modulo keyword.`,
            },
          ],
        },
        {
          id: 'py_basics_2',
          title: 'Tipi e Valori / Types & Values',
          description: 'Integer, float, boolean, type...',
          items: [
            {
              english: 'Integer',
              italian: 'Intero (Integer)',
              pronunciation: '/\u02C8\u026Ant\u026Ad\u0292\u0259r/',
              phonetic: 'IN-ti-ger',
              example:
                'Python can handle arbitrarily large integer values without overflow. = Python pu\u00F2 gestire valori interi arbitrariamente grandi senza overflow.',
              context: 'types',
              difficulty: 'beginner',
              note: 'In Python, gli interi hanno precisione arbitraria (non hanno limiti di dimensione, solo memoria RAM).',
              code: `retry_count = 3
timeout_seconds = 30`,
              task: 'Definisci due variabili intere che rappresentano il numero di tentativi e il timeout in secondi.',
            },
            {
              english: 'Float',
              italian: 'Virgola Mobile (Float)',
              pronunciation: '/flo\u028At/',
              phonetic: 'FLOUT',
              example:
                'Comparing float values with == can cause bugs due to rounding errors. = Confrontare valori in virgola mobile con == pu\u00F2 causare bug a causa di errori di arrotondamento.',
              context: 'types',
              difficulty: 'beginner',
              note: 'I float sono numeri decimali rappresentati secondo lo standard IEEE 754 con doppia precisione.',
              code: `price = 9.99
tax_rate = 0.22
total = price * (1 + tax_rate)`,
              task: `Calcola il prezzo totale con IVA partendo da due variabili float per il prezzo e l'aliquota.`,
            },
            {
              english: 'Boolean',
              italian: 'Booleano',
              pronunciation: '/\u02C8bu\u02D0li\u0259n/',
              phonetic: 'BUU-li-en',
              example:
                'An empty list evaluates to a boolean False in conditional checks. = Una lista vuota viene valutata come booleano False nei controlli condizionali.',
              context: 'types',
              difficulty: 'beginner',
              note: 'In Python, i booleani sono sottoclassi di interi (True=1, False=0).',
              code: `is_admin = True
has_access = is_admin and user.verified`,
              task: `Determina se un utente puo' accedere combinando un flag amministratore con la verifica dell'account.`,
            },
            {
              english: 'Type',
              italian: 'Tipo',
              pronunciation: '/ta\u026Ap/',
              phonetic: 'TAIP',
              example:
                'Use type() to check the type of an object. = Usa type() per controllare il tipo di un oggetto.',
              context: 'foundations',
              difficulty: 'beginner',
              code: "type(5) # returns <class 'int'>",
              note: 'Python \u00E8 a tipizzazione forte (non permette operazioni tra tipi incompatibili).',
            },
            {
              english: 'Value',
              italian: 'Valore',
              pronunciation: '/\u02C8v\u00E6lju\u02D0/',
              phonetic: 'VE-liu',
              example:
                'Functions return a value that can be stored in a variable for later use. = Le funzioni restituiscono un valore che pu\u00F2 essere memorizzato in una variabile per un uso successivo.',
              context: 'foundations',
              difficulty: 'beginner',
              note: "Ogni oggetto in Python ha un tipo, un valore e un'identit\u00E0 (indirizzo in memoria).",
              code: `def get_status():
    return 'ok'

status = get_status()`,
              task: 'Definisci una funzione che restituisce un valore di stato e assegnalo a una variabile.',
            },
            {
              english: 'Literal',
              italian: 'Letterale (Literal)',
              pronunciation: '/\u02C8l\u026At\u0259r\u0259l/',
              phonetic: 'LI-te-ral',
              example:
                'Writing 42 directly in your code creates an integer literal that Python evaluates immediately. = Scrivere 42 direttamente nel codice crea un letterale intero che Python valuta immediatamente.',
              context: 'foundations',
              difficulty: 'intermediate',
              note: 'I letterali sono dati scritti direttamente nel codice sorgente (es. 100, "abc", 1.5).',
              code: `MAX_USERS = 100
GREETING = 'Welcome'
PI = 3.14`,
              task: 'Assegna a tre costanti rispettivamente un letterale intero, uno stringa e uno float.',
            },
            {
              english: 'Constant',
              italian: 'Costante',
              pronunciation: '/\u02C8k\u0252nst\u0259nt/',
              phonetic: 'KON-stant',
              example:
                'By convention, declaring a constant in uppercase like MAX_RETRIES = 3 at module level signals it should not change. = Per convenzione, dichiarare una costante in maiuscolo come MAX_RETRIES = 3 a livello di modulo segnala che non deve cambiare.',
              context: 'foundations',
              difficulty: 'intermediate',
              note: 'Python non ha vere costanti immutabili; per convenzione si usano nomi maiuscoli (PI = 3.14).',
              code: `MAX_RETRIES = 3
TIMEOUT = 30
API_URL = 'https://api.example.com'`,
              task: `Dichiara tre costanti a livello di modulo per i tentativi massimi, il timeout e l'URL dell'API.`,
            },
            {
              english: 'None',
              italian: 'Valore Nullo',
              pronunciation: '/n\u028Cn/',
              phonetic: 'NAN',
              example:
                'A function without a return statement implicitly returns None to the caller. = Una funzione senza istruzione return restituisce implicitamente None al chiamante.',
              context: 'types',
              difficulty: 'beginner',
              note: 'None \u00E8 un oggetto unico (singleton) usato per indicare un valore non assegnato o una funzione che non restituisce nulla.',
              code: `result = cache.get('user_42')
if result is None:
    result = fetch_user(42)`,
              task: 'Verifica con il confronto is None se la cache ha restituito un valore prima di chiamare il backend.',
            },
            {
              english: 'Dynamic Typing',
              italian: 'Tipizzazione Dinamica',
              pronunciation: '/da\u026A\u02C8n\u00E6m\u026Ak \u02C8ta\u026Ap\u026A\u014B/',
              phonetic: 'dai-NA-mik TAI-ping',
              example:
                'Python uses dynamic typing for variables. = Python usa la tipizzazione dinamica per le variabili.',
              context: 'foundations',
              difficulty: 'intermediate',
              note: "Le variabili non hanno un tipo fisso; possono puntare a oggetti di tipi diversi durante l'esecuzione.",
              code: `value = 42
value = 'forty-two'
value = [1, 2, 3]`,
              task: 'Riassegna la stessa variabile a tre oggetti di tipo diverso per illustrare la tipizzazione dinamica.',
            },
            {
              english: 'Casting',
              italian: 'Conversione di Tipo (Casting)',
              pronunciation: '/\u02C8k\u00E6st\u026A\u014B/',
              phonetic: 'KA-sting',
              example:
                'int("10") converts a string to an integer. = int("10") converte una stringa in un intero.',
              context: 'foundations',
              difficulty: 'intermediate',
              code: 'int("10") # 10\nstr(5) # "5"',
              note: 'Si ottiene chiamando il costruttore del tipo desiderato (es. int(), str(), float()).',
            },
          ],
        },
        {
          id: 'py_basics_3',
          title: 'Operazioni Base / Basic Operations',
          description: 'Operator, expression, assignment...',
          items: [
            {
              english: 'Operator',
              italian: 'Operatore',
              pronunciation: '/\u02C8\u0252p\u0259re\u026At\u0259r/',
              phonetic: 'O-pe-rei-ter',
              example:
                "The // operator performs floor division, returning the largest whole number. = L'operatore // esegue la divisione intera, restituendo il numero intero più grande.",
              context: 'operations',
              difficulty: 'beginner',
              note: "Simboli che indicano all'interprete come manipolare i dati.",
              code: `total = subtotal + shipping
is_free = shipping == 0`,
              task: `Combina un operatore aritmetico e uno di confronto per calcolare il totale e verificare se la spedizione e' gratuita.`,
            },
            {
              english: 'Assignment',
              italian: 'Assegnamento',
              pronunciation: '/\u0259\u02C8sa\u026Anm\u0259nt/',
              phonetic: 'e-SAIN-ment',
              example:
                "Python supports multiple assignment like a, b = 1, 2 on a single line. = Python supporta l'assegnamento multiplo come a, b = 1, 2 su una singola riga.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'In Python, = non \u00E8 uguaglianza matematica, ma il "nome" x che punta all\'oggetto 5.',
              code: `x, y = 10, 20
x, y = y, x`,
              task: `Scambia il valore di due variabili in una singola riga sfruttando l'assegnamento multiplo.`,
            },
            {
              english: 'Addition',
              italian: 'Addizione / Somma',
              pronunciation: '/\u0259\u02C8d\u026A\u0283\u0259n/',
              phonetic: 'e-DI-scen',
              example: `The addition operator + works on numbers and concatenates strings, so 'Hello ' + name builds a greeting. = L'operatore di addizione + funziona sui numeri e concatena stringhe, quindi 'Hello ' + name costruisce un saluto.`,
              context: 'arithmetic',
              difficulty: 'beginner',
              code: 'x = 10 + 5 # 15',
              note: "L'operatore + pu\u00F2 anche concatenare stringhe.",
            },
            {
              english: 'Subtraction',
              italian: 'Sottrazione / Differenza',
              pronunciation: '/s\u0259b\u02C8tr\u00E6k\u0283\u0259n/',
              phonetic: 'seb-TRAK-scen',
              example:
                'Using subtraction to compute elapsed time: duration = end_time - start_time. = Usare la sottrazione per calcolare il tempo trascorso: duration = end_time - start_time.',
              context: 'arithmetic',
              difficulty: 'beginner',
              code: `import time
start = time.time()
run_job()
elapsed = time.time() - start`,
              task: `Calcola la durata di esecuzione di un'operazione sottraendo il timestamp iniziale da quello finale.`,
            },
            {
              english: 'Multiplication',
              italian: 'Moltiplicazione / Prodotto',
              pronunciation: '/\u02CCm\u028Clt\u026Apl\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'mal-ti-pli-KEI-scen',
              example: `In Python, the multiplication operator * also repeats sequences: 'ab' * 3 returns 'ababab', handy for building separators. = In Python, l'operatore di moltiplicazione * ripete anche le sequenze: 'ab' * 3 restituisce 'ababab', utile per costruire separatori.`,
              context: 'arithmetic',
              difficulty: 'beginner',
              note: 'In Python, puoi moltiplicare una stringa per un intero per ripeterla ("A" * 3 = "AAA").',
              code: `separator = '-' * 40
print(separator)`,
              task: `Costruisci una riga separatrice di 40 trattini ripetendo un carattere con l'operatore di moltiplicazione.`,
            },
            {
              english: 'Division',
              italian: 'Divisione',
              pronunciation: '/d\u026A\u02C8v\u026A\u0292\u0259n/',
              phonetic: 'di-VI-scen',
              example: `In Python 3, the / division operator always returns a float (10 / 4 = 2.5), while // performs integer division and returns 2. = In Python 3, l'operatore di divisione / restituisce sempre un float (10 / 4 = 2.5), mentre // esegue la divisione intera e restituisce 2.`,
              context: 'arithmetic',
              difficulty: 'beginner',
              note: 'In Python 3, la divisione / d\u00E0 sempre un float; // \u00E8 la divisione intera.',
              code: `average = total_score / num_students
pages = total_items // page_size`,
              task: 'Calcola la media dei punteggi con la divisione decimale e il numero di pagine con la divisione intera.',
            },
            {
              english: 'Modulo',
              italian: 'Resto (Modulo)',
              pronunciation: '/\u02C8m\u0252dj\u028Alo\u028A/',
              phonetic: 'MO-diu-lou',
              example: `Use the modulo operator % to check parity (n % 2 == 0) or to wrap indices around a circular buffer of fixed size. = Usa l'operatore modulo % per controllare la parita' (n % 2 == 0) o per ciclare indici in un buffer circolare di dimensione fissa.`,
              context: 'arithmetic',
              difficulty: 'intermediate',
              note: 'Utile per controllare se un numero \u00E8 pari (n % 2 == 0).',
              code: `for n in range(10):
    if n % 2 == 0:
        print(n, 'is even')`,
              task: `Itera sui numeri da zero a nove e stampa solo quelli pari sfruttando l'operatore modulo.`,
            },
            {
              english: 'Exponentiation',
              italian: 'Elevamento a potenza',
              pronunciation: '/\u02CCeksp\u0259\u02CCnen\u0283i\u02C8e\u026A\u0283\u0259n/',
              phonetic: 'eks-pou-nen-sciei-scen',
              example:
                'Calculating powers via exponentiation with ** is faster than calling math.pow() for integers. = Calcolare le potenze tramite elevamento a potenza con ** \u00E8 pi\u00F9 veloce che chiamare math.pow() per gli interi.',
              context: 'arithmetic',
              difficulty: 'intermediate',
              code: 'x = 2 ** 10 # 1024',
              note: "Si usa il doppio asterisco (**), non l'accento circonflesso (^).",
            },
            {
              english: 'Comparison',
              italian: 'Confronto / Comparazione',
              pronunciation: '/k\u0259m\u02C8p\u00E6r\u026As\u0259n/',
              phonetic: 'kom-PE-ri-son',
              example:
                'Use "is" for identity comparison and == for value comparison to avoid subtle bugs. = Usa "is" per il confronto di identit\u00E0 e == per il confronto di valore per evitare bug sottili.',
              context: 'logical',
              difficulty: 'beginner',
              note: 'Restituiscono valori booleani (True/False). Esempi: ==, !=, <, >, <=, >=.',
              code: `if user.age >= 18:
    allow_purchase()`,
              task: `Verifica con un operatore di confronto se l'utente e' maggiorenne prima di consentire l'acquisto.`,
            },
            {
              english: 'Logical Operator',
              italian: 'Operatore Logico',
              pronunciation: '/\u02C8l\u0252d\u0292\u026Akl \u02C8\u0252p\u0259re\u026At\u0259r/',
              phonetic: 'LO-gi-kel O-pe-rei-ter',
              example:
                'Combining conditions with a logical operator like "and" ensures both checks must pass. = Combinare condizioni con un operatore logico come "and" garantisce che entrambi i controlli debbano passare.',
              context: 'logical',
              difficulty: 'beginner',
              note: 'Vengono usati per combinare espressioni booleane.',
              code: `if user.is_active and not user.is_banned:
    grant_access(user)`,
              task: `Combina due condizioni con gli operatori logici and e not per concedere l'accesso solo agli utenti attivi e non bannati.`,
            },
          ],
        },
        {
          id: 'py_basics_4',
          title: 'Ambiente di Lavoro / Working Environment',
          description: 'IDE, editor, syntax, error, run...',
          items: [
            {
              english: 'IDE (Integrated Development Environment)',
              italian: 'Ambiente di Sviluppo Integrato',
              pronunciation: '/\u02CCa\u026A di\u02D0 \u02C8i\u02D0/',
              phonetic: 'ai-dii-II',
              example:
                "A good IDE provides autocompletion, debugging, and linting all in one window. = Un buon IDE fornisce autocompletamento, debugging e linting in un'unica finestra.",
              context: 'environment',
              difficulty: 'beginner',
              note: 'Include editor, debugger e strumenti in un solo programma (es. VS Code, PyCharm).',
            },
            {
              english: 'Interpreter',
              italian: 'Interprete',
              pronunciation: '/\u026An\u02C8t\u025C\u02D0rpr\u0259t\u0259r/',
              phonetic: 'in-TER-pri-ter',
              example:
                "The Python interpreter executes code line by line, which makes debugging easier but can be slower than compiled languages. = L'interprete Python esegue il codice riga per riga, il che facilita il debug ma pu\u00F2 essere pi\u00F9 lento dei linguaggi compilati.",
              context: 'execution',
              difficulty: 'beginner',
              note: 'Il programma che legge ed esegue il codice Python riga per riga.',
              code: `import sys
print(sys.version)
print(sys.executable)`,
              task: `Stampa la versione dell'interprete Python in uso e il percorso del suo eseguibile.`,
            },
            {
              english: 'Script',
              italian: 'Programma (Script)',
              pronunciation: '/skr\u026Apt/',
              phonetic: 'SKRIPT',
              example:
                'Adding if __name__ == "__main__" lets your script run standalone or be imported as a module. = Aggiungere if __name__ == "__main__" permette allo script di funzionare come programma autonomo o essere importato come modulo.',
              context: 'execution',
              difficulty: 'beginner',
              note: 'Un file di testo contenente codice Python (.py).',
              code: `def main():
    print('running')

if __name__ == '__main__':
    main()`,
              task: 'Struttura uno script Python con una funzione main eseguita solo quando il file viene lanciato direttamente.',
            },
            {
              english: 'Shell (REPL)',
              italian: 'Console Interattiva (Shell)',
              pronunciation: '/\u0283el/',
              phonetic: 'SCEL',
              example:
                'The Python shell is ideal for quickly testing small code snippets before adding them to your project. = La console interattiva di Python è ideale per testare rapidamente piccoli frammenti di codice prima di aggiungerli al progetto.',
              context: 'environment',
              difficulty: 'beginner',
              note: 'Read-Eval-Print Loop: esegue comandi immediatamente.',
              code: `>>> 2 + 3
5
>>> name = 'Alice'
>>> print(name)
Alice`,
              task: 'Sperimenta nella shell interattiva calcolando una somma e definendo una variabile da stampare subito dopo.',
            },
            {
              english: 'Execution',
              italian: 'Esecuzione',
              pronunciation: '/\u02CCeks\u026A\u02C8kju\u02D0\u0283\u0259n/',
              phonetic: 'ek-se-KIU-scen',
              example:
                "During execution, Python reads your .py file top-to-bottom and runs each statement in order. = Durante l'esecuzione, Python legge il file .py dall'alto verso il basso ed esegue ogni istruzione in ordine.",
              context: 'execution',
              difficulty: 'beginner',
            },
            {
              english: 'Debugger',
              italian: 'Analizzatore Errori (Debugger)',
              pronunciation: '/\u02CCdi\u02D0\u02C8b\u028C\u0261\u0259r/',
              phonetic: 'dii-BA-gher',
              example:
                "Setting a breakpoint in the debugger lets you inspect variable values at any point during execution. = Impostare un breakpoint nel debugger permette di ispezionare i valori delle variabili in qualsiasi punto durante l'esecuzione.",
              context: 'debugging',
              difficulty: 'intermediate',
              note: "Permette di fermare l'esecuzione ed esaminare le variabili.",
              code: `import pdb

def calculate(data):
    pdb.set_trace()
    return sum(data)`,
              task: 'Inserisci un breakpoint con pdb dentro una funzione per ispezionarne lo stato durante il debug.',
            },
            {
              english: 'Error',
              italian: 'Errore',
              pronunciation: '/\u02C8er\u0259r/',
              phonetic: 'E-rror',
              example:
                'Reading the error message carefully usually tells you the exact line and type of mistake. = Leggere attentamente il messaggio di errore di solito indica la riga esatta e il tipo di errore.',
              context: 'errors',
              difficulty: 'beginner',
              code: `try:
    value = int(user_input)
except ValueError as err:
    print('Invalid number:', err)`,
              task: `Cattura l'errore di conversione quando l'input dell'utente non e' un numero valido e mostra un messaggio chiaro.`,
            },
            {
              english: 'Exception',
              italian: 'Eccezione',
              pronunciation: '/\u026Ak\u02C8sep\u0283\u0259n/',
              phonetic: 'ik-SEP-scen',
              example:
                "Wrapping risky code in try/except lets you handle an exception gracefully instead of crashing. = Avvolgere codice rischioso in try/except permette di gestire un'eccezione in modo controllato invece di crashare.",
              context: 'errors',
              difficulty: 'intermediate',
              note: "Un errore che avviene durante l'esecuzione del programma (runtime).",
              code: `try:
    response = api.get_user(user_id)
except ConnectionError:
    response = cache.get(user_id)`,
              task: `Gestisci l'eccezione di connessione ricadendo sui dati in cache quando la chiamata API fallisce.`,
            },
            {
              english: 'Traceback',
              italian: 'Tracciamento Errori (Traceback)',
              pronunciation: '/\u02C8tre\u026Asb\u00E6k/',
              phonetic: 'TREIS-bak',
              example:
                "Reading the traceback from bottom to top reveals the root cause of the crash. = Leggere il traceback dal basso verso l'alto rivela la causa principale del crash.",
              context: 'debugging',
              difficulty: 'intermediate',
              note: 'Il report dettagliato che Python stampa quando avviene un errore.',
            },
            {
              english: 'Library',
              italian: 'Libreria',
              pronunciation: '/\u02C8la\u026Abr\u0259ri/',
              phonetic: 'LAI-bre-ri',
              example:
                'The standard library includes modules like os, sys, and json so you can use them without installing anything. = La libreria standard include moduli come os, sys e json, così puoi usarli senza installare nulla.',
              context: 'environment',
              difficulty: 'beginner',
              note: 'Un insieme di codice gi\u00E0 scritto da altri pronto per essere usato (es. math, os).',
              code: `import json

with open('config.json') as f:
    config = json.load(f)`,
              task: 'Carica un file di configurazione JSON sfruttando la libreria standard senza installare dipendenze esterne.',
            },
          ],
        },
      ],
    },
    1: {
      name: 'Tipi di Dati / Data Types',
      description: 'Strutture dati fondamentali di Python',
      lessons: [
        {
          id: 'py_list',
          title: 'Liste / Lists',
          description: 'List, index, slice, append, remove...',
          items: [
            {
              english: 'List',
              italian: 'Lista',
              pronunciation: '/l\u026Ast/',
              phonetic: 'LIST',
              example:
                "Using a list to store user inputs lets you process them all at the end. = Usare una lista per memorizzare gli input dell'utente permette di elaborarli tutti alla fine.",
              context: 'data-structures',
              difficulty: 'beginner',
              note: 'Le liste in Python sono mutabili e possono contenere oggetti di tipi diversi.',
              code: `scores = [85, 92, 78, 90]
average = sum(scores) / len(scores)`,
              task: 'Calcola la media dei punteggi memorizzati in una lista usando le funzioni sum e len.',
            },
            {
              english: 'Index',
              italian: 'Indice',
              pronunciation: '/\u02C8\u026Andeks/',
              phonetic: 'IN-deks',
              example:
                'Accessing an index beyond the list length raises an IndexError, so always check bounds or use try/except. = Accedere a un indice oltre la lunghezza della lista genera un IndexError, quindi controlla sempre i limiti o usa try/except.',
              context: 'data-structures',
              difficulty: 'beginner',
              note: "Il primo elemento ha indice 0; l'ultimo ha indice -1.",
              code: `items = ['apple', 'banana', 'cherry']
first = items[0]
last = items[-1]`,
              task: `Estrai il primo e l'ultimo elemento di una lista usando un indice positivo e uno negativo.`,
            },
            {
              english: 'Slice',
              italian: 'Fetta (Slice)',
              pronunciation: '/sla\u026As/',
              phonetic: 'SLAIS',
              example:
                'With a slice like data[::2] you can grab every other element from a list. = Con una fetta come data[::2] puoi prendere un elemento ogni due da una lista.',
              context: 'data-structures',
              difficulty: 'intermediate',
              code: 'my_list[1:3] # elements from index 1 to 2',
              note: 'Sintassi: [start:stop:step].',
            },
            {
              english: 'Append',
              italian: 'Aggiungere (Append)',
              pronunciation: '/\u0259\u02C8pend/',
              phonetic: 'a-PEND',
              example:
                'Use append inside a loop to build a result list incrementally. = Usa append dentro un ciclo per costruire una lista di risultati in modo incrementale.',
              context: 'methods',
              difficulty: 'beginner',
              code: 'list.append("new_item")',
            },
            {
              english: 'Remove',
              italian: 'Rimuovere',
              pronunciation: '/r\u026A\u02C8mu\u02D0v/',
              phonetic: 're-MUUV',
              example:
                "Calling remove on a value that doesn't exist raises a ValueError. = Chiamare remove su un valore che non esiste solleva un ValueError.",
              context: 'methods',
              difficulty: 'beginner',
              note: 'Rimuove la prima occorrenza del valore specificato.',
              code: `users = ['alice', 'bob', 'eve']
users.remove('eve')`,
              task: `Rimuovi un utente specifico dalla lista degli utenti attivi senza conoscerne l'indice.`,
            },
            {
              english: 'Pop',
              italian: 'Estrarre (Pop)',
              pronunciation: '/p\u0252p/',
              phonetic: 'POP',
              example:
                'Using pop with an index lets you remove and use a specific item in one step. = Usare pop con un indice permette di rimuovere e utilizzare un elemento specifico in un solo passaggio.',
              context: 'methods',
              difficulty: 'intermediate',
              note: 'Puoi anche specificare un indice: list.pop(0).',
              code: `queue = ['task1', 'task2', 'task3']
next_task = queue.pop(0)`,
              task: 'Estrai e rimuovi il prossimo task in testa alla coda per processarlo immediatamente.',
            },
            {
              english: 'Sort',
              italian: 'Ordinare',
              pronunciation: '/s\u0254\u02D0rt/',
              phonetic: 'SORT',
              example:
                'Passing a key function to sort lets you customize the ordering criteria. = Passare una funzione key a sort permette di personalizzare i criteri di ordinamento.',
              context: 'methods',
              difficulty: 'beginner',
              note: 'Modifica la lista originale (in-place).',
              code: 'users.sort(key=lambda u: u.created_at, reverse=True)',
              task: `Ordina una lista di utenti per data di creazione dal piu' recente al piu' vecchio.`,
            },
            {
              english: 'Reverse',
              italian: 'Invertire',
              pronunciation: '/r\u026A\u02C8v\u025C\u02D0rs/',
              phonetic: 're-VERS',
              example:
                'Calling reverse on a list modifies it in place rather than creating a new copy. = Chiamare reverse su una lista la modifica in posto anziché creare una nuova copia.',
              context: 'methods',
              difficulty: 'beginner',
              code: `history = [10, 20, 30, 40]
history.reverse()`,
              task: `Inverti l'ordine degli elementi di una lista di storico in modo che il piu' recente venga prima.`,
            },
            {
              english: 'List Comprehension',
              italian: 'Comprensione di lista',
              pronunciation: '/l\u026Ast \u02CCk\u0252mpr\u026A\u02C8hen\u0283\u0259n/',
              phonetic: 'LIST kom-pri-EN-scen',
              example:
                '[x for x in range(10)] is a list comprehension. = [x for x in range(10)] \u00E8 una list comprehension.',
              context: 'syntax',
              difficulty: 'advanced',
              note: 'Modo conciso per creare nuove liste basandosi su iterabili esistenti.',
              code: 'active_names = [u.name for u in users if u.is_active]',
              task: 'Filtra dalla lista degli utenti solo quelli attivi e raccogli i loro nomi in una nuova lista.',
            },
            {
              english: 'Length (len)',
              italian: 'Lunghezza',
              pronunciation: '/le\u014B\u03B8/',
              phonetic: 'LENGTH',
              example:
                'Checking len before accessing an index prevents IndexError on empty sequences. = Controllare la lunghezza prima di accedere a un indice previene IndexError su sequenze vuote.',
              context: 'functions',
              difficulty: 'beginner',
              code: `items = cart.get_items()
if len(items) == 0:
    print('Cart is empty')`,
              task: `Verifica con la funzione len se il carrello e' vuoto prima di mostrare il riepilogo.`,
            },
          ],
        },
        {
          id: 'py_dict',
          title: 'Dizionari / Dictionaries',
          description: 'Dictionary, key, value, items...',
          items: [
            {
              english: 'Dictionary',
              italian: 'Dizionario',
              pronunciation: '/\u02C8d\u026Ak\u0283\u0259neri/',
              phonetic: 'DIK-scio-ne-ri',
              example:
                'Using a dictionary to map user IDs to names makes lookups nearly instant. = Usare un dizionario per mappare gli ID utente ai nomi rende le ricerche quasi istantanee.',
              context: 'data-structures',
              difficulty: 'beginner',
              note: 'In Python, i dizionari sono mutabili e non ordinati (fino alla versione 3.6).',
              code: `user = {'id': 42, 'name': 'Alice', 'role': 'admin'}
print(user['role'])`,
              task: 'Costruisci un dizionario che descrive un utente con id, nome e ruolo, poi stampa il ruolo.',
            },
            {
              english: 'Key',
              italian: 'Chiave',
              pronunciation: '/ki\u02D0/',
              phonetic: 'KII',
              example:
                'Only immutable types like strings and tuples can serve as a dictionary key. = Solo tipi immutabili come stringhe e tuple possono servire come chiave di un dizionario.',
              context: 'data-structures',
              difficulty: 'beginner',
              note: 'In Python, le chiavi devono essere oggetti immutabili (hashable).',
              code: `scores = {}
scores['alice'] = 95
if 'bob' in scores:
    print(scores['bob'])`,
              task: `Aggiungi una chiave a un dizionario di punteggi e verifica se un'altra chiave esiste prima di leggerla.`,
            },
            {
              english: 'Dictionary Value',
              italian: 'Valore di Dizionario',
              pronunciation: '/\u02C8v\u00E6lju\u02D0/',
              phonetic: 'VE-liu',
              example: `Each dictionary value is reached by its key, as in scores['alice'], which lets you look up data in O(1) average time. = Ogni valore di dizionario si raggiunge tramite la sua chiave, come in scores['alice'], il che permette di cercare dati in tempo medio O(1).`,
              context: 'data-structures',
              difficulty: 'beginner',
              note: 'A differenza di una lista, un dizionario indicizza i valori per chiave invece che per posizione.',
              code: `config = {'timeout': 30, 'retries': 3}
timeout = config['timeout']`,
              task: 'Recupera il valore associato alla chiave timeout in un dizionario di configurazione.',
            },
            {
              english: 'Item',
              italian: 'Elemento (Item)',
              pronunciation: '/\u02C8a\u026At\u0259m/',
              phonetic: 'AI-tem',
              example:
                'Looping over dict.items() gives you each item as a (key, value) tuple per iteration. = Iterare su dict.items() restituisce ogni elemento come una tupla (chiave, valore) per iterazione.',
              context: 'data-structures',
              difficulty: 'beginner',
              code: `for key, value in settings.items():
    print(f'{key}: {value}')`,
              task: 'Itera su tutti gli elementi di un dizionario di impostazioni e stampa ciascuna coppia chiave-valore.',
            },
            {
              english: 'Get',
              italian: 'Ottenere (Get)',
              pronunciation: '/\u0261et/',
              phonetic: 'GHET',
              example:
                'Using get with a default value prevents your program from crashing on missing keys. = Usare get con un valore di default impedisce al programma di crashare su chiavi mancanti.',
              context: 'methods',
              difficulty: 'intermediate',
              code: 'dict.get("key", "default_value")',
              note: 'Restituisce None o un valore di default se la chiave non esiste.',
            },
            {
              english: 'Update',
              italian: 'Aggiornare',
              pronunciation: '/\u02CC\u028Cp\u02C8de\u026At/',
              phonetic: 'ap-DEIT',
              example:
                'Calling update merges new key-value pairs into an existing dictionary, overwriting duplicates. = Chiamare update unisce nuove coppie chiave-valore in un dizionario esistente, sovrascrivendo i duplicati.',
              context: 'methods',
              difficulty: 'intermediate',
              code: 'dict.update({"new_key": "new_value"})',
            },
            {
              english: 'Keys',
              italian: 'Chiavi (Metodo)',
              pronunciation: '/ki\u02D0z/',
              phonetic: 'KIIZ',
              example:
                'The keys view returned by dict.keys() automatically reflects changes to the dictionary. = La vista delle chiavi restituita da dict.keys() riflette automaticamente le modifiche al dizionario.',
              context: 'methods',
              difficulty: 'intermediate',
              code: `config = {'host': 'localhost', 'port': 8080}
for key in config.keys():
    print(key)`,
              task: 'Itera su tutte le chiavi di un dizionario di configurazione e stampale una per riga.',
            },
            {
              english: 'Values',
              italian: 'Valori (Metodo)',
              pronunciation: '/\u02C8v\u00E6lju\u02D0z/',
              phonetic: 'VE-liuz',
              example:
                'Converting dict.values() to a list lets you index into the values directly. = Convertire dict.values() in una lista permette di indicizzare i valori direttamente.',
              context: 'methods',
              difficulty: 'intermediate',
              code: `prices = {'apple': 1.0, 'bread': 2.5}
total = sum(prices.values())`,
              task: 'Calcola la somma totale di tutti i valori contenuti in un dizionario di prezzi.',
            },
            {
              english: 'Items',
              italian: 'Elementi (Metodo)',
              pronunciation: '/\u02C8a\u026At\u0259mz/',
              phonetic: 'AI-temz',
              example:
                'Iterating over items with a for loop lets you unpack both key and value at once. = Iterare sugli elementi con un ciclo for permette di spacchettare chiave e valore contemporaneamente.',
              context: 'methods',
              difficulty: 'intermediate',
              code: `inventory = {'apple': 10, 'bread': 5}
for name, qty in inventory.items():
    print(name, qty)`,
              task: `Spacchetta nome e quantita' di ogni prodotto di un inventario iterando sugli items del dizionario.`,
            },
            {
              english: 'Key-Value Pair',
              italian: 'Coppia Chiave-Valore',
              pronunciation: '/ki\u02D0 \u02C8v\u00E6lju\u02D0 per/',
              phonetic: 'kii VE-liu per',
              example:
                "Each key-value pair in a config dictionary can represent one application setting. = Ogni coppia chiave-valore in un dizionario di configurazione pu\u00F2 rappresentare un'impostazione dell'applicazione.",
              context: 'data-structures',
              difficulty: 'beginner',
              code: `settings = {'debug': True, 'log_level': 'INFO', 'port': 8080}`,
              task: `Costruisci un dizionario di impostazioni dell'applicazione con tre coppie chiave-valore eterogenee.`,
            },
          ],
        },
        {
          id: 'py_tuple_set',
          title: 'Tuple e Set / Tuples & Sets',
          description: 'Tuple, set, immutable, unique...',
          items: [
            {
              english: 'Tuple',
              italian: 'Tupla',
              pronunciation: '/\u02C8t\u028Cpl/',
              phonetic: 'TA-pol',
              example:
                'Returning a tuple from a function lets you pass multiple values back to the caller. = Restituire una tupla da una funzione permette di passare pi\u00F9 valori al chiamante.',
              context: 'data-structures',
              difficulty: 'beginner',
              note: 'Si scrive tra parentesi tonde (). Molto veloce e sicura.',
              code: `def get_point():
    return (10, 20)

x, y = get_point()`,
              task: 'Definisci una funzione che restituisce una tupla con le coordinate di un punto e spacchettala nella chiamata.',
            },
            {
              english: 'Immutable',
              italian: 'Immutabile',
              pronunciation: '/\u026A\u02C8mju\u02D0t\u0259bl/',
              phonetic: 'im-MIU-ta-bol',
              example:
                'Because strings are immutable, every operation like replace creates a new string object. = Poiché le stringhe sono immutabili, ogni operazione come replace crea un nuovo oggetto stringa.',
              context: 'data-structures',
              difficulty: 'intermediate',
              note: 'Non puoi cambiare i suoi elementi una volta creata.',
              code: `point = (10, 20)
# point[0] = 5  # TypeError: tuple is immutable
new_point = (5, point[1])`,
              task: `Crea una nuova tupla derivata da una esistente invece di modificarla, poiche' le tuple sono immutabili.`,
            },
            {
              english: 'Unpacking',
              italian: 'Spacchettamento (Unpacking)',
              pronunciation: '/\u02CC\u028Cn\u02C8p\u00E6k\u026A\u014B/',
              phonetic: 'an-PA-king',
              example:
                'Iterating with for key, value in dict.items() relies on tuple unpacking to bind each pair to two named locals per loop. = Iterare con for key, value in dict.items() si basa sullo spacchettamento di tupla per legare ogni coppia a due variabili nominate ad ogni ciclo.',
              context: 'syntax',
              difficulty: 'intermediate',
              code: 'x, y = (10, 20)',
              note: 'Assegna i singoli elementi a variabili in un colpo solo.',
            },
            {
              english: 'Set',
              italian: 'Insieme (Set)',
              pronunciation: '/set/',
              phonetic: 'SET',
              example:
                'Converting a list to a set automatically removes all duplicate entries. = Convertire una lista in un insieme rimuove automaticamente tutti gli elementi duplicati.',
              context: 'data-structures',
              difficulty: 'beginner',
              note: 'I set sono non ordinati e non permettono duplicati.',
              code: `tags = ['python', 'web', 'python', 'api']
unique_tags = set(tags)`,
              task: 'Rimuovi i tag duplicati da una lista convertendola in un set.',
            },
            {
              english: 'Unique',
              italian: 'Unico',
              pronunciation: '/ju\u02D0\u02C8ni\u02D0k/',
              phonetic: 'iu-NIIK',
              example:
                'Checking for a unique username is efficient with sets because lookups are O(1). = Verificare un nome utente unico è efficiente con i set perché le ricerche sono O(1).',
              context: 'data-structures',
              difficulty: 'beginner',
              code: `emails = [u.email for u in users]
if len(set(emails)) != len(emails):
    raise ValueError('Duplicate emails')`,
              task: 'Verifica che tutti gli indirizzi email di una lista di utenti siano unici sollevando un errore in caso contrario.',
            },
            {
              english: 'Intersection',
              italian: 'Intersezione',
              pronunciation: '/\u02CC\u026Ant\u0259r\u02C8sek\u0283\u0259n/',
              phonetic: 'in-ter-SE-scen',
              example:
                "Computing the intersection of two permission sets reveals which rights are shared. = Calcolare l'intersezione di due insiemi di permessi rivela quali diritti sono in comune.",
              context: 'methods',
              difficulty: 'intermediate',
              code: 'set1 & set2',
            },
            {
              english: 'Union',
              italian: 'Unione',
              pronunciation: '/\u02C8ju\u02D0nj\u0259n/',
              phonetic: 'IUU-nion',
              example:
                "The union of admin and editor permissions gives the full set of allowed actions. = L'unione dei permessi admin e editor fornisce l'insieme completo delle azioni consentite.",
              context: 'methods',
              difficulty: 'intermediate',
              code: 'set1 | set2',
            },
            {
              english: 'Difference',
              italian: 'Differenza',
              pronunciation: '/\u02C8d\u026Afr\u0259ns/',
              phonetic: 'DI-frens',
              example:
                'The difference between old and new config keys shows which settings were removed. = La differenza tra vecchie e nuove chiavi di configurazione mostra quali impostazioni sono state rimosse.',
              context: 'methods',
              difficulty: 'intermediate',
              code: 'set1 - set2',
            },
            {
              english: 'Symmetric Difference',
              italian: 'Differenza Simmetrica',
              pronunciation: '/s\u026A\u02C8metr\u026Ak \u02C8d\u026Afr\u0259ns/',
              phonetic: 'sim-ME-trik DI-frens',
              example:
                'The symmetric difference highlights entries that changed between two versions of a dataset. = La differenza simmetrica evidenzia le voci che sono cambiate tra due versioni di un dataset.',
              context: 'methods',
              difficulty: 'advanced',
              code: 'set1 ^ set2',
            },
            {
              english: 'Frozen Set',
              italian: 'Insieme Immutabile',
              pronunciation: '/\u02C8fro\u028Az\u0259n set/',
              phonetic: 'FROU-zen set',
              example:
                'Because a frozen set is hashable, you can use it as a dictionary key or add it to another set. = Poich\u00E9 un insieme immutabile \u00E8 hashable, puoi usarlo come chiave di dizionario o aggiungerlo a un altro set.',
              context: 'data-structures',
              difficulty: 'advanced',
              note: 'Puo essere usato come chiave in un dizionario.',
              code: `ADMIN_ROLES = frozenset({'admin', 'superuser', 'root'})
if user.role in ADMIN_ROLES:
    grant_full_access()`,
              task: 'Definisci un insieme immutabile di ruoli amministrativi e verifica se il ruolo di un utente vi appartiene.',
            },
          ],
        },
        {
          id: 'py_strings',
          title: 'Stringhe Avanzate / Advanced Strings',
          description: 'Format, join, split, strip...',
          items: [
            {
              english: 'Format',
              italian: 'Formattare',
              pronunciation: '/\u02C8f\u0254\u02D0rm\u00E6t/',
              phonetic: 'FOR-mat',
              example:
                'The format method lets you build dynamic messages like "Order #{id} shipped". = Il metodo format permette di costruire messaggi dinamici come "Ordine #{id} spedito".',
              context: 'methods',
              difficulty: 'beginner',
              code: '"Hello {}".format(name)',
              note: 'Metodo classico di formattazione stringhe.',
            },
            {
              english: 'F-String',
              italian: 'Stringa Formattata Literal',
              pronunciation: '/\u02CCef \u02C8str\u026A\u014B/',
              phonetic: 'ef-STRING',
              example:
                'Using f-strings lets you embed expressions directly inside curly braces for cleaner formatting than concatenation. = Usare le f-string permette di incorporare espressioni direttamente dentro le parentesi graffe per una formattazione pi\u00F9 pulita rispetto alla concatenazione.',
              context: 'syntax',
              difficulty: 'intermediate',
              code: 'f"Name: {name}"',
              note: 'Introdotte in Python 3.6, sono il modo pi\u00F9 moderno e veloce di formattare stringhe.',
            },
            {
              english: 'Join',
              italian: 'Unire (Join)',
              pronunciation: '/d\u0292\u0254\u026An/',
              phonetic: 'GIOIN',
              example: `Use ', '.join(items) to merge a list of strings into a single CSV-like line without writing a manual loop. = Usa ', '.join(items) per unire una lista di stringhe in una singola riga in stile CSV senza scrivere un ciclo manuale.`,
              context: 'methods',
              difficulty: 'intermediate',
              note: 'Unisce gli elementi di un iterabile con la stringa come separatore.',
              code: `tags = ['python', 'web', 'api']
label = ', '.join(tags)`,
              task: 'Unisci una lista di tag in una singola stringa separata da virgole, pronta per essere stampata.',
            },
            {
              english: 'Split',
              italian: 'Dividere / Separare',
              pronunciation: '/spl\u026At/',
              phonetic: 'SPLIT',
              example:
                'Parsing CSV data by splitting each line on commas gives you the individual fields. = Analizzare dati CSV dividendo ogni riga sulle virgole restituisce i singoli campi.',
              context: 'methods',
              difficulty: 'beginner',
              code: '"A,B,C".split(",") # ["A", "B", "C"]',
            },
            {
              english: 'Strip',
              italian: 'Pulire (Strip)',
              pronunciation: '/str\u026Ap/',
              phonetic: 'STRIP',
              example:
                "Always strip user input before validation to avoid errors caused by trailing whitespace. = Pulisci sempre l'input dell'utente prima della validazione per evitare errori causati da spazi finali.",
              context: 'methods',
              difficulty: 'intermediate',
              note: "Rimuove spazi e caratteri invisibili all'inizio e alla fine della stringa.",
              code: `raw = input('Email: ')
email = raw.strip().lower()`,
              task: `Pulisci l'input dell'utente rimuovendo spazi iniziali e finali e convertendolo in minuscolo.`,
            },
            {
              english: 'Replace',
              italian: 'Sostituire',
              pronunciation: '/r\u026A\u02C8ple\u026As/',
              phonetic: 're-PLEIS',
              example:
                'Calling replace on a template string lets you swap placeholders with real data. = Chiamare replace su una stringa template permette di sostituire i segnaposto con dati reali.',
              context: 'methods',
              difficulty: 'beginner',
              code: '"Hello".replace("H", "J") # "Jello"',
            },
            {
              english: 'Lower/Upper',
              italian: 'Minuscolo/Maiuscolo',
              pronunciation: '/\u02C8lo\u028A\u0259r/ /\u02C8\u028Cp\u0259r/',
              phonetic: 'LOU-er AP-per',
              example:
                'Converting both strings to lower before comparing ensures case-insensitive matching. = Convertire entrambe le stringhe in minuscolo prima del confronto garantisce un matching senza distinzione tra maiuscole e minuscole.',
              context: 'methods',
              difficulty: 'beginner',
              code: `username = 'Alice'
if username.lower() == stored_user.lower():
    print('match')`,
              task: 'Confronta due nomi utente in modo case-insensitive convertendo entrambi in minuscolo prima del confronto.',
            },
            {
              english: 'Find/Index',
              italian: 'Trovare',
              pronunciation: '/fa\u026And/ /\u02C8\u026Andeks/',
              phonetic: 'FAIND IN-deks',
              example:
                'Using find to locate a delimiter tells you where to split a custom protocol message. = Usare find per localizzare un delimitatore indica dove dividere un messaggio di protocollo personalizzato.',
              context: 'methods',
              difficulty: 'intermediate',
              note: 'find() restituisce -1 se non trova; index() solleva un errore.',
              code: `url = 'https://example.com/path'
pos = url.find('://')
scheme = url[:pos]`,
              task: 'Trova la posizione del delimitatore :// in un URL ed estrai lo schema che lo precede.',
            },
            {
              english: 'Escape Character',
              italian: 'Carattere di Escape',
              pronunciation: '/\u026As\u02C8ke\u026Ap \u02C8k\u00E6r\u0259kt\u0259r/',
              phonetic: 'is-KEIP KA-rak-ter',
              example:
                'Common escape characters include \\n for newline, \\t for tab, and \\\\ for a literal backslash. = I caratteri di escape comuni includono \\n per nuova riga, \\t per tabulazione e \\\\ per un backslash letterale.',
              context: 'syntax',
              difficulty: 'intermediate',
              note: 'Usa il backslash (\\) per inserire caratteri speciali.',
              code: `row = 'name\\tage\\tcity'
lines = 'line1\\nline2'`,
              task: 'Costruisci una riga in formato TSV separata da tabulazioni e una stringa multiriga separata da newline usando i caratteri di escape.',
            },
            {
              english: 'Raw String',
              italian: 'Stringa Grezza',
              pronunciation: '/r\u0254\u02D0 str\u026A\u014B/',
              phonetic: 'RO STRING',
              example: `When writing a regex or a Windows path, prefix the string with r as in r'\\d+' to avoid escaping every backslash. = Quando scrivi una regex o un percorso Windows, prefissa la stringa con r come in r'\\d+' per evitare di fare l'escape di ogni backslash.`,
              context: 'syntax',
              difficulty: 'advanced',
              note: 'Ignora gli escape character; utile per percorsi Windows e regex.',
              code: `import re
pattern = re.compile(r'\\d{3}-\\d{4}')
match = pattern.search(text)`,
              task: 'Compila una regex per un numero di telefono usando una stringa grezza per evitare il doppio escape dei backslash.',
            },
          ],
        },
      ],
    },
    2: {
      name: 'Controllo Flusso / Control Flow',
      description: 'Condizioni, cicli e flusso del programma',
      lessons: [
        {
          id: 'py_conditions',
          title: 'Condizioni / Conditions',
          description: 'if, else, elif, comparison...',
          items: [
            {
              english: 'If Statement',
              italian: 'Istruzione If',
              pronunciation: '/\u026Af \u02C8ste\u026Atm\u0259nt/',
              phonetic: 'IF STEIT-ment',
              example:
                'Chain multiple if/elif/else blocks to handle complex branching logic without deeply nested ternaries. = Concatena più blocchi if/elif/else per gestire logiche di branching complesse senza ternari profondamente annidati.',
              context: 'control-flow',
              difficulty: 'beginner',
              note: "Il blocco di codice sotto l'if viene eseguito solo se la condizione \u00E8 vera.",
              code: `if order.total > 100:
    apply_discount(order, percent=10)
else:
    order.shipping_fee = 5.99`,
              task: 'Applica uno sconto del 10% agli ordini sopra i 100 euro e altrimenti aggiungi le spese di spedizione.',
            },
            {
              english: 'Else Clause',
              italian: 'Clausola Else',
              pronunciation: '/els kl\u0254\u02D0z/',
              phonetic: 'ELS CLOS',
              example:
                'The else clause runs only when the if condition evaluates to False. = La clausola else viene eseguita solo quando la condizione if è valutata come False.',
              context: 'control-flow',
              difficulty: 'beginner',
              code: `if user.is_authenticated:
    return render_dashboard(user)
else:
    return redirect('/login')`,
              task: 'Mostra la dashboard agli utenti autenticati e, nel ramo else, reindirizza al login.',
            },
            {
              english: 'Elif (Else If)',
              italian: 'Altrimenti Se (Elif)',
              pronunciation: '/\u02C8el\u026Af/',
              phonetic: 'E-lif',
              example:
                'Chaining elif branches lets you handle multiple score ranges like A, B, C, D grades. = Concatenare rami elif permette di gestire pi\u00F9 intervalli di punteggio come voti A, B, C, D.',
              context: 'control-flow',
              difficulty: 'beginner',
              code: `if status_code < 300:
    log.info("ok")
elif status_code < 500:
    log.warning("client error")
else:
    log.error("server error")`,
              task: 'Usa una catena elif per classificare i codici di stato HTTP in ok, errore client e errore server.',
            },
            {
              english: 'Comparison Operator',
              italian: 'Operatore di Confronto',
              pronunciation:
                '/k\u0259m\u02C8p\u00E6r\u026As\u0259n \u02C8\u0252p\u0259re\u026At\u0259r/',
              phonetic: 'kom-PE-ri-son O-pe-rei-ter',
              example:
                "Using the != comparison operator in a while loop keeps it running until the expected value arrives. = Usare l'operatore di confronto != in un ciclo while lo mantiene attivo finché non arriva il valore atteso.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Esempi: ==, !=, <, >, <=, >=.',
              code: `expired = token.expires_at <= datetime.utcnow()
if expired or token.revoked:
    raise AuthError("token invalid")`,
              task: `Confronta la scadenza del token con l'orario corrente usando l'operatore <= e solleva un errore se e' scaduto.`,
            },
            {
              english: 'Boolean Expression',
              italian: 'Espressione Booleana',
              pronunciation: '/\u02C8bu\u02D0li\u0259n \u026Ak\u02C8spre\u0283\u0259n/',
              phonetic: 'BUU-li-en ik-SPRE-scen',
              example:
                "Writing a clear boolean expression like age >= 18 and has_license makes your conditions self-documenting. = Scrivere un'espressione booleana chiara come age >= 18 and has_license rende le condizioni auto-documentanti.",
              context: 'logic',
              difficulty: 'intermediate',
              code: `can_checkout = cart.items and user.has_payment_method and not cart.is_locked
if can_checkout:
    process_order(cart, user)`,
              task: `Costruisci un'espressione booleana che combini carrello non vuoto, metodo di pagamento e flag di blocco prima del checkout.`,
            },
            {
              english: 'Nested If',
              italian: 'If Annidato',
              pronunciation: '/\u02C8nest\u026Ad \u026Af/',
              phonetic: 'NES-ted IF',
              example:
                'Replacing deeply nested if blocks with guard clauses makes the code easier to read. = Sostituire blocchi if annidati in profondit\u00E0 con clausole di guardia rende il codice pi\u00F9 leggibile.',
              context: 'control-flow',
              difficulty: 'intermediate',
              code: `if user.is_active:
    if user.role == "admin":
        grant_full_access(user)
    else:
        grant_read_access(user)`,
              task: `Annida un if interno sul ruolo dentro un if esterno sullo stato attivo dell'utente per assegnare i permessi.`,
            },
            {
              english: 'Conditional Execution',
              italian: 'Esecuzione Condizionale',
              pronunciation:
                '/k\u0259n\u02C8d\u026A\u0283\u0259nl \u02CCeks\u026A\u02C8kju\u02D0\u0283\u0259n/',
              phonetic: 'con-DI-scio-nel ek-se-KIU-scen',
              example:
                'Python uses conditions to control code path. = Python usa le condizioni per controllare il percorso del codice.',
              context: 'control-flow',
              difficulty: 'intermediate',
              code: `if settings.DEBUG:
    enable_sql_echo(engine)
run_migrations(engine)`,
              task: `Esegui codice in modo condizionale: attiva il logging SQL solo se la modalita' debug e' abilitata.`,
            },
            {
              english: 'Membership Operator (in)',
              italian: 'Operatore di Appartenenza',
              pronunciation: '/\u02C8memb\u0259r\u0283\u026Ap \u02C8\u0252p\u0259re\u026At\u0259r/',
              phonetic: 'MEM-ber-scip O-pe-rei-ter',
              example:
                'The membership operator "in" works on strings, lists, tuples, dicts, and sets, making containment checks concise. = L\'operatore di appartenenza "in" funziona su stringhe, liste, tuple, dizionari e set, rendendo i controlli di contenimento concisi.',
              context: 'operators',
              difficulty: 'intermediate',
              note: 'Controlla se un valore \u00E8 presente in una sequenza (stringa, lista, set...).',
              code: `ALLOWED_ROLES = {"admin", "editor", "viewer"}
if user.role in ALLOWED_ROLES:
    grant_access(user)`,
              task: `Verifica con l'operatore in se il ruolo dell'utente appartiene al set dei ruoli consentiti.`,
            },
            {
              english: 'Identity Operator (is)',
              italian: 'Operatore di Identit\u00E0',
              pronunciation: '/a\u026A\u02C8dent\u0259ti \u02C8\u0252p\u0259re\u026At\u0259r/',
              phonetic: 'ai-DEN-ti-ti O-pe-rei-ter',
              example:
                'is checks if two variables point to the same object. = is controlla se due variabili puntano allo stesso oggetto.',
              context: 'operators',
              difficulty: 'advanced',
              note: 'is confronta gli indirizzi di memoria, == confronta i valori.',
              code: `result = cache.get(key)
if result is None:
    result = fetch_from_db(key)
    cache.set(key, result)`,
              task: `Usa l'operatore di identita' is per controllare se il valore in cache e' esattamente None prima di interrogare il database.`,
            },
            {
              english: 'Truthiness',
              italian: 'Veridicit\u00E0 (Truthiness)',
              pronunciation: '/\u02C8tru\u02D0\u03B8in\u0259s/',
              phonetic: 'TRU-thi-nes',
              example:
                'In Python, empty lists have a falsy value. = In Python, le liste vuote hanno un valore "falso".',
              context: 'logic',
              difficulty: 'advanced',
              note: 'Concetto per cui oggetti non booleani possono essere valutati in un contesto booleano.',
              code: `errors = validate(form_data)
if errors:
    return render("form.html", errors=errors)
save(form_data)`,
              task: 'Sfrutta la truthiness della lista di errori per decidere se mostrare di nuovo il form o salvare i dati.',
            },
          ],
        },
        {
          id: 'py_loops',
          title: 'Cicli / Loops',
          description: 'for, while, break, continue, range...',
          items: [
            {
              english: 'For Loop',
              italian: 'Ciclo For',
              pronunciation: '/f\u0254\u02D0r lu\u02D0p/',
              phonetic: 'FOR LUUP',
              example:
                'A for loop over a dictionary iterates through its keys by default. = Un ciclo for su un dizionario itera attraverso le sue chiavi per default.',
              context: 'control-flow',
              difficulty: 'beginner',
              note: 'Esegue un blocco di codice per ogni elemento della sequenza.',
              code: `for user in db.query(User).filter_by(active=True):
    user.send_email("Weekly newsletter")`,
              task: 'Itera con un ciclo for sugli utenti attivi del database e invia a ciascuno la newsletter settimanale.',
            },
            {
              english: 'While Loop',
              italian: 'Ciclo While',
              pronunciation: '/wa\u026Al lu\u02D0p/',
              phonetic: 'UAIL LUUP',
              example:
                'A while loop runs as long as the condition is true. = Un ciclo while gira finch\u00E9 la condizione \u00E8 vera.',
              context: 'control-flow',
              difficulty: 'beginner',
              code: `attempts = 0
while attempts < 3 and not connected:
    connected = try_connect(host)
    attempts += 1`,
              task: 'Usa un ciclo while per ritentare la connessione fino a tre volte o fino al successo.',
            },
            {
              english: 'Iteration',
              italian: 'Iterazione',
              pronunciation: '/\u02CC\u026At\u0259\u02C8re\u026A\u0283\u0259n/',
              phonetic: 'i-te-REI-scen',
              example:
                'Each iteration of the loop processes one item from the queue until it is empty. = Ogni iterazione del ciclo elabora un elemento dalla coda finch\u00E9 non \u00E8 vuota.',
              context: 'control-flow',
              difficulty: 'beginner',
              code: `for row in csv_reader:
    if row["status"] == "paid":
        total += float(row["amount"])`,
              task: `Ad ogni iterazione del CSV somma l'importo solo se la riga ha lo stato pagato.`,
            },
            {
              english: 'Break Statement',
              italian: 'Istruzione Break',
              pronunciation: '/bre\u026Ak \u02C8ste\u026Atm\u0259nt/',
              phonetic: 'BREIK STEIT-ment',
              example: `When searching a list, a break statement exits the loop as soon as you find the match, avoiding wasted iterations. = Quando cerchi in una lista, un'istruzione break esce dal ciclo appena trovi la corrispondenza, evitando iterazioni sprecate.`,
              context: 'control-flow',
              difficulty: 'intermediate',
              code: `for user in users:
    if user.email == target_email:
        found = user
        break`,
              task: `Termina il ciclo con break appena trovi l'utente con l'email cercata, evitando iterazioni inutili.`,
            },
            {
              english: 'Continue Statement',
              italian: 'Istruzione Continue',
              pronunciation: '/k\u0259n\u02C8t\u026Anju\u02D0 \u02C8ste\u026Atm\u0259nt/',
              phonetic: 'con-TI-niu STEIT-ment',
              example:
                "Continue skips the rest of the current iteration. = Continue salta il resto dell'iterazione attuale.",
              context: 'control-flow',
              difficulty: 'intermediate',
              code: `for path in files:
    if path.name.startswith("."):
        continue
    process(path)`,
              task: 'Salta con continue i file nascosti e processa solo i rimanenti dentro il ciclo.',
            },
            {
              english: 'Range (function)',
              italian: 'Intervallo (Range)',
              pronunciation: '/re\u026And\u0292/',
              phonetic: 'REING',
              example: `Use range(start, stop, step) inside a for loop to iterate over a numeric sequence without building the full list in memory. = Usa range(start, stop, step) dentro un ciclo for per iterare su una sequenza numerica senza costruire l'intera lista in memoria.`,
              context: 'functions',
              difficulty: 'beginner',
              note: "Molto usato nei cicli for per ripetere un'azione N volte.",
              code: `for page in range(1, total_pages + 1):
    items.extend(api.fetch_page(page))`,
              task: `Usa range per iterare sui numeri di pagina e accumulare i risultati di un'API paginata.`,
            },
            {
              english: 'Enumerate',
              italian: 'Enumerare (Enumerate)',
              pronunciation: '/\u026A\u02C8nju\u02D0m\u0259re\u026At/',
              phonetic: 'i-NIU-me-reit',
              example:
                "Use enumerate to get both index and value. = Usa enumerate per ottenere sia l'indice che il valore.",
              context: 'functions',
              difficulty: 'intermediate',
              code: 'for i, val in enumerate(list):',
              note: 'Restituisce un oggetto enumerazione (indice, valore).',
            },
            {
              english: 'Infinite Loop',
              italian: 'Ciclo Infinito',
              pronunciation: '/\u02C8\u026Anf\u026An\u0259t lu\u02D0p/',
              phonetic: 'IN-fi-net LUUP',
              example:
                'A server uses an intentional infinite loop to keep listening for incoming connections. = Un server usa un ciclo infinito intenzionale per continuare ad ascoltare le connessioni in arrivo.',
              context: 'errors',
              difficulty: 'intermediate',
              note: 'Succede quando la condizione del while rimante sempre vera.',
              code: `while True:
    message = queue.get()
    handler.process(message)
    queue.task_done()`,
              task: `Costruisci un ciclo infinito che consumi messaggi da una coda di lavoro finche' il servizio resta attivo.`,
            },
            {
              english: 'Nested Loop',
              italian: 'Ciclo Annidato',
              pronunciation: '/\u02C8nest\u026Ad lu\u02D0p/',
              phonetic: 'NES-ted LUUP',
              example:
                'Using a nested loop to iterate over rows and columns builds a 2D grid efficiently. = Usare un ciclo annidato per iterare su righe e colonne costruisce una griglia 2D in modo efficiente.',
              context: 'control-flow',
              difficulty: 'intermediate',
              code: `for row in matrix:
    for value in row:
        if value < 0:
            negatives += 1`,
              task: 'Usa un ciclo annidato su righe e colonne di una matrice per contare i valori negativi.',
            },
            {
              english: 'Else in Loops',
              italian: 'Else nei Cicli',
              pronunciation: '/els \u026An lu\u02D0ps/',
              phonetic: 'ELS in LUUP-s',
              example:
                'The else block runs if the loop ends normally. = Il blocco else gira se il ciclo finisce normalmente.',
              context: 'control-flow',
              difficulty: 'advanced',
              note: 'Non viene eseguito se il ciclo \u00E8 interrotto da un "break".',
              code: `for item in inventory:
    if item.sku == sku:
        break
else:
    raise ItemNotFound(sku)`,
              task: 'Aggiungi un blocco else al ciclo for che venga eseguito solo se nessuna iterazione ha invocato break.',
            },
          ],
        },
        {
          id: 'py_logic',
          title: 'Logica / Logic',
          description: 'and, or, not, boolean logic...',
          items: [
            {
              english: 'And Operator',
              italian: 'Operatore E (And)',
              pronunciation: '/\u00E6nd \u02C8\u0252p\u0259re\u026At\u0259r/',
              phonetic: 'AND O-pe-rei-ter',
              example:
                "The and operator in Python returns the first falsy operand, not just True or False. = L'operatore and in Python restituisce il primo operando falsy, non solo True o False.",
              context: 'logic',
              difficulty: 'beginner',
              note: 'Entrambe le condizioni devono essere vere.',
              code: `if user.is_authenticated and user.has_permission("edit"):
    show_edit_button()`,
              task: `Combina con l'operatore and l'autenticazione e il permesso di modifica prima di mostrare il pulsante.`,
            },
            {
              english: 'Or Operator',
              italian: 'Operatore O (Or)',
              pronunciation: '/\u0254\u02D0r \u02C8\u0252p\u0259re\u026At\u0259r/',
              phonetic: 'OR O-pe-rei-ter',
              example:
                'Using the or operator to provide a default like name = user_input or "Guest" is a common pattern. = Usare l\'operatore o per fornire un default come name = user_input or "Guest" \u00E8 un pattern comune.',
              context: 'logic',
              difficulty: 'beginner',
              note: 'Almeno una condizione deve essere vera.',
              code: 'display_name = profile.nickname or profile.email or "Anonymous"',
              task: `Usa l'operatore or in catena per scegliere il primo nome non vuoto da nickname, email o un default.`,
            },
            {
              english: 'Not Operator',
              italian: 'Operatore Non (Not)',
              pronunciation: '/n\u0252t \u02C8\u0252p\u0259re\u026At\u0259r/',
              phonetic: 'NOT O-pe-rei-ter',
              example:
                'Writing "if not found:" with the not operator reads almost like plain English. = Scrivere "if not found:" con l\'operatore non si legge quasi come linguaggio naturale.',
              context: 'logic',
              difficulty: 'beginner',
              note: 'Inverte il valore booleano.',
              code: `if not response.ok:
    raise APIError(response.status_code)`,
              task: `Inverti con l'operatore not il flag di successo della risposta HTTP per sollevare un errore.`,
            },
            {
              english: 'Short-circuit Evaluation',
              italian: 'Valutazione a Corto Circuito',
              pronunciation:
                '/\u0283\u0254\u02D0rt \u02C8s\u025C\u02D0rk\u026At \u026Av\u00E6lju\u02C8e\u026A\u0283\u0259n/',
              phonetic: 'SCORT SER-kit i-ve-liu-EI-scen',
              example:
                'In the expression "x and y", Python will not evaluate y if x is falsy, which is useful for guarding against None values. = Nell\'espressione "x and y", Python non valuterà y se x è falsy, il che è utile per proteggersi dai valori None.',
              context: 'logic',
              difficulty: 'advanced',
              note: 'In "A or B", se A \u00E8 vero, B non viene nemmeno controllato.',
              code: `if user is not None and user.is_admin:
    show_admin_panel()`,
              task: `Sfrutta la valutazione a corto circuito per proteggerti da user None prima di leggere l'attributo is_admin.`,
            },
            {
              english: 'Truth Table',
              italian: 'Tabella della Verit\u00E0',
              pronunciation: '/tru\u02D0\u03B8 \u02C8te\u026Abl/',
              phonetic: 'TRUTH TEI-bol',
              example:
                'Building a truth table for your conditions helps you verify that all edge cases are covered. = Costruire una tabella della verit\u00E0 per le tue condizioni aiuta a verificare che tutti i casi limite siano coperti.',
              context: 'logic',
              difficulty: 'intermediate',
            },
            {
              english: 'Precedence (Logical)',
              italian: 'Precedenza (Logica)',
              pronunciation: '/\u02C8pres\u026Ad\u0259ns/',
              phonetic: 'PRE-se-dens',
              example:
                "Logical NOT has more precedence than AND. = Il NOT logico ha pi\u00F9 precedenza dell'AND.",
              context: 'logic',
              difficulty: 'intermediate',
              note: 'Ordine: not, and, or.',
              code: `if (is_admin or is_owner) and not is_banned:
    allow_action()`,
              task: 'Usa le parentesi per controllare la precedenza logica tra or, and e not nella regola di autorizzazione.',
            },
            {
              english: 'Bitwise Operator',
              italian: 'Operatore Bit a Bit',
              pronunciation: '/\u02C8b\u026Atwa\u026Az \u02C8\u0252p\u0259re\u026At\u0259r/',
              phonetic: 'BIT-uais O-pe-rei-ter',
              example:
                'Using a bitwise operator like << 1 is an efficient way to multiply an integer by 2. = Usare un operatore bit a bit come << 1 è un modo efficiente per moltiplicare un intero per 2.',
              context: 'operators',
              difficulty: 'advanced',
              note: 'Lavorano sui singoli bit dei numeri.',
              code: `READ, WRITE, EXEC = 0b100, 0b010, 0b001
permissions = READ | WRITE
if permissions & WRITE:
    file.write(data)`,
              task: `Combina i flag dei permessi con l'operatore bit a bit | e verifica un singolo bit con &.`,
            },
            {
              english: 'Any (function)',
              italian: 'Qualsiasi (Funzione)',
              pronunciation: '/\u02C8eni/',
              phonetic: 'E-ni',
              example:
                'any(list) is True if at least one is True. = any(list) \u00E8 True se almeno uno \u00E8 True.',
              context: 'functions',
              difficulty: 'intermediate',
              code: `if any(order.is_overdue for order in orders):
    notify_collections_team()`,
              task: `Usa la funzione any con un'espressione generatore per rilevare se almeno un ordine e' in ritardo.`,
            },
            {
              english: 'All (function)',
              italian: 'Tutti (Funzione)',
              pronunciation: '/\u0254\u02D0l/',
              phonetic: 'OL',
              example:
                'Pass a generator to all() to verify a condition on every item, for example all(x > 0 for x in numbers). = Passa un generatore a all() per verificare una condizione su ogni elemento, ad esempio all(x > 0 for x in numbers).',
              context: 'functions',
              difficulty: 'intermediate',
              code: `if all(field.is_valid for field in form.fields):
    form.save()`,
              task: 'Usa la funzione all per salvare il form solo quando ogni campo passa la validazione.',
            },
            {
              english: 'Compound Condition',
              italian: 'Condizione Composta',
              pronunciation: '/\u02C8k\u0252mpa\u028And k\u0259n\u02C8d\u026A\u0283\u0259n/',
              phonetic: 'COM-paund con-DI-scen',
              example:
                'A compound condition like "if temp > 30 and humidity > 80" checks multiple criteria at once. = Una condizione composta come "if temp > 30 and humidity > 80" controlla più criteri contemporaneamente.',
              context: 'logic',
              difficulty: 'intermediate',
              code: `if temperature > 30 and humidity > 80 and not ventilation_on:
    alerts.send("climate risk")`,
              task: `Crea una condizione composta che attivi un allarme solo se temperatura, umidita' e ventilazione coincidono.`,
            },
          ],
        },
        {
          id: 'py_flow_patterns',
          title: 'Pattern di Flusso / Flow Patterns',
          description: 'Nested loops, early return...',
          items: [
            {
              english: 'Early Return',
              italian: 'Ritorno Anticipato',
              pronunciation: '/\u02C8\u025C\u02D0rli r\u026A\u02C8t\u025C\u02D0rn/',
              phonetic: 'ER-li re-TERN',
              example:
                "Using early return at the top of a function to handle edge cases keeps the main logic at a shallow indentation level. = Usare il ritorno anticipato all'inizio di una funzione per gestire i casi limite mantiene la logica principale a un livello di indentazione basso.",
              context: 'patterns',
              difficulty: 'intermediate',
              note: 'Uscire da una funzione il prima possibile se una condizione non \u00E8 soddisfatta.',
              code: `def charge(user, amount):
    if amount <= 0:
        return False
    if not user.payment_method:
        return False
    return gateway.charge(user, amount)`,
              task: `Applica il pattern early return per gestire i casi limite all'inizio della funzione e mantenere piatto il flusso principale.`,
            },
            {
              english: 'Guard Clause',
              italian: 'Clausola di Guardia',
              pronunciation: '/\u0261\u0251\u02D0rd kl\u0254\u02D0z/',
              phonetic: 'GARD CLOS',
              example:
                "Placing a guard clause like 'if not user: return' at the top of a function simplifies the rest of the logic. = Inserire una clausola di guardia come 'if not user: return' all'inizio di una funzione semplifica il resto della logica.",
              context: 'patterns',
              difficulty: 'advanced',
              note: "Un controllo all'inizio di una funzione che termina l'esecuzione in caso di errore.",
              code: `def delete_post(user, post):
    if not user:
        raise Unauthorized()
    if post.author_id != user.id:
        raise Forbidden()
    post.delete()`,
              task: `Inserisci clausole di guardia in testa alla funzione per validare utente e proprieta' prima di cancellare il post.`,
            },
            {
              english: 'Flag Variable',
              italian: 'Variabile Bandiera (Flag)',
              pronunciation: '/fl\u00E6\u0261 \u02C8veri\u0259bl/',
              phonetic: 'FLAG VE-ri-ebol',
              example:
                'Initializing a found flag variable to False before scanning a list lets you record whether the search ever succeeded inside the loop. = Inizializzare una variabile bandiera found a False prima di scansionare una lista ti permette di registrare se la ricerca abbia mai avuto successo dentro il ciclo.',
              context: 'patterns',
              difficulty: 'beginner',
              code: `found = False
for row in rows:
    if row.id == target_id:
        found = True
        break
if not found:
    raise NotFound(target_id)`,
              task: 'Usa una variabile flag found per ricordare se la ricerca nella lista ha avuto successo.',
            },
            {
              english: 'Sentinel Value',
              italian: 'Valore Sentinella',
              pronunciation: '/\u02C8sent\u026Anl \u02C8v\u00E6lju\u02D0/',
              phonetic: 'SEN-ti-nel VE-liu',
              example:
                'Stop reading when the sentinel value is found. = Smetti di leggere quando trovi il valore sentinella.',
              context: 'patterns',
              difficulty: 'intermediate',
              note: "Un valore speciale usato per indicare la fine di un'operazione.",
              code: `SENTINEL = object()
value = cache.get(key, SENTINEL)
if value is SENTINEL:
    value = compute_and_cache(key)`,
              task: 'Definisci un valore sentinella per distinguere una chiave mancante in cache da un None salvato esplicitamente.',
            },
            {
              english: 'Dispatch Table (Dictionary)',
              italian: 'Tabella di Dispatch',
              pronunciation: '/d\u026A\u02C8sp\u00E6t\u0283 \u02C8te\u026Abl/',
              phonetic: 'di-SPACC TEI-bol',
              example:
                'A dictionary can replace a long if-elif-else. = Un dizionario pu\u00F2 sostituire un lungo if-elif-else.',
              context: 'patterns',
              difficulty: 'advanced',
              note: 'Usa un dizionario di funzioni per gestire diversi casi in modo pulito.',
              code: `handlers = {
    "GET": handle_get,
    "POST": handle_post,
    "DELETE": handle_delete,
}
response = handlers[request.method](request)`,
              task: 'Sostituisci una catena if-elif con una tabella di dispatch che mappi il metodo HTTP alla funzione handler.',
            },
            {
              english: 'State Machine',
              italian: 'Macchina a Stati',
              pronunciation: '/ste\u026At m\u0259\u02C8\u0283i\u02D0n/',
              phonetic: 'STEIT me-SCIIN',
              example:
                "The app works as a finite state machine. = L'app lavora come una macchina a stati finiti.",
              context: 'architecture',
              difficulty: 'expert',
            },
            {
              english: 'Recursion (Base case)',
              italian: 'Ricorsione (Caso base)',
              pronunciation: '/r\u026A\u02C8k\u025C\u02D0r\u0292\u0259n/',
              phonetic: 're-KER-scen',
              example:
                'Every recursive function needs a base case (e.g. n == 0 in factorial) to stop calling itself, otherwise you hit a RecursionError. = Ogni funzione ricorsiva ha bisogno di un caso base (es. n == 0 in fattoriale) per smettere di chiamarsi, altrimenti ottieni un RecursionError.',
              context: 'patterns',
              difficulty: 'intermediate',
              code: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)`,
              task: 'Definisci il caso base n == 0 in factorial per fermare la chiamata ricorsiva ed evitare il RecursionError.',
            },
            {
              english: 'List Filtering (if in comprehension)',
              italian: 'Filtraggio Liste',
              pronunciation: '/l\u026Ast \u02C8f\u026Alt\u0259r\u026A\u014B/',
              phonetic: 'LIST FIL-ter-ing',
              example:
                '[x for x in list if x > 0] is filtering. = [x for x in list if x > 0] \u00E8 un filtraggio.',
              context: 'syntax',
              difficulty: 'intermediate',
              code: 'active_users = [u for u in users if u.is_active and not u.is_banned]',
              task: 'Filtra gli utenti dentro una list comprehension tenendo solo quelli attivi e non bannati.',
            },
            {
              english: 'Exception-based Control Flow',
              italian: 'Flusso basato su Eccezioni',
              pronunciation:
                '/\u026Ak\u02C8sep\u0283\u0259n be\u026Ast k\u0259n\u02C8tro\u028Al flo\u028A/',
              phonetic: 'ik-SEP-scen beist kon-TROUL flou',
              example:
                "It's easier to ask forgiveness than permission (EAFP). = Meglio chiedere perdono che permesso (EAFP).",
              context: 'philosophy',
              difficulty: 'advanced',
              note: "Principio Python per cui si preferisce tentare l'azione e gestire l'errore invece di controllare prima.",
              code: `try:
    value = config["timeout"]
except KeyError:
    value = DEFAULT_TIMEOUT`,
              task: `Adotta lo stile EAFP: tenta l'accesso alla chiave e gestisci l'eccezione KeyError invece di controllare prima.`,
            },
            {
              english: 'Match Case (Structural Pattern Matching)',
              italian: 'Confronto di Pattern (Match Case)',
              pronunciation: '/m\u00E6t\u0283 ke\u026As/',
              phonetic: 'MACC KEIS',
              example:
                'Match case was introduced in Python 3.10. = Il match case \u00E8 stato introdotto in Python 3.10.',
              context: 'syntax',
              difficulty: 'advanced',
              note: 'Molto simile allo "switch" di altri linguaggi, ma pi\u00F9 potente.',
              code: `match event:
    case {"type": "login", "user": user}:
        log_login(user)
    case {"type": "logout", "user": user}:
        log_logout(user)
    case _:
        log.warning("unknown event")`,
              task: 'Usa match case per distinguere tipi di evento in un dizionario e instradare ciascuno al suo handler.',
            },
          ],
        },
      ],
    },
    3: {
      name: 'Funzioni / Functions',
      description: 'Definizione e uso delle funzioni',
      lessons: [
        {
          id: 'py_func_basics',
          title: 'Funzioni Base / Basic Functions',
          description: 'def, return, parameter, argument...',
          items: [
            {
              english: 'Function',
              italian: 'Funzione',
              pronunciation: '/\u02C8f\u028C\u014Bk\u0283\u0259n/',
              phonetic: 'FANK-scen',
              example:
                'Breaking your code into small functions makes each piece easier to test and debug. = Suddividere il codice in piccole funzioni rende ogni parte pi\u00F9 facile da testare e debuggare.',
              context: 'functions',
              difficulty: 'beginner',
              code: `def calculate_discount(price, percent):
    return price * (1 - percent / 100)`,
              task: 'Definisci una funzione che calcoli il prezzo scontato a partire da prezzo e percentuale.',
            },
            {
              english: 'Definition (def)',
              italian: 'Definizione',
              pronunciation: '/\u02CCdef\u026A\u02C8n\u026A\u0283\u0259n/',
              phonetic: 'de-fi-NI-scen',
              example:
                'Every function definition with "def" creates a new object in memory that you can reference by name. = Ogni definizione di funzione con "def" crea un nuovo oggetto in memoria a cui puoi fare riferimento per nome.',
              context: 'functions',
              difficulty: 'beginner',
              code: 'def my_function():',
            },
            {
              english: 'Return Statement',
              italian: 'Istruzione di Ritorno',
              pronunciation: '/r\u026A\u02C8t\u025C\u02D0rn \u02C8ste\u026Atm\u0259nt/',
              phonetic: 're-TERN STEIT-ment',
              example:
                "A return statement immediately exits the function and sends the result back to the caller. = L'istruzione return esce immediatamente dalla funzione e invia il risultato al chiamante.",
              context: 'functions',
              difficulty: 'beginner',
              note: 'Se non specificato, una funzione restituisce "None".',
              code: `def find_user(email):
    for user in users:
        if user.email == email:
            return user
    return None`,
              task: `Usa l'istruzione return per uscire subito dalla funzione appena trovi l'utente corrispondente.`,
            },
            {
              english: 'Parameter',
              italian: 'Parametro',
              pronunciation: '/p\u0259\u02C8r\u00E6m\u026At\u0259r/',
              phonetic: 'pe-RA-mi-ter',
              example:
                'Giving each parameter a descriptive name like "user_id" instead of "x" improves readability. = Dare a ogni parametro un nome descrittivo come "user_id" invece di "x" migliora la leggibilità.',
              context: 'functions',
              difficulty: 'beginner',
              note: 'I nomi elencati nella definizione della funzione.',
              code: `def send_invoice(customer_id, amount, currency="EUR"):
    invoice = build_invoice(customer_id, amount, currency)
    mailer.send(invoice)`,
              task: 'Dichiara i parametri customer_id, amount e currency con un valore di default nella firma della funzione.',
            },
            {
              english: 'Argument',
              italian: 'Argomento',
              pronunciation: '/\u02C8\u0251\u02D0r\u0261jum\u0259nt/',
              phonetic: 'AR-ghiu-ment',
              example:
                "The actual argument you pass replaces the parameter placeholder when the function runs. = L'argomento effettivo che passi sostituisce il segnaposto del parametro quando la funzione viene eseguita.",
              context: 'functions',
              difficulty: 'beginner',
              note: 'Il valore reale inviato alla funzione quando viene chiamata.',
              code: 'send_invoice(customer_id=42, amount=199.99, currency="USD")',
              task: 'Chiama send_invoice passando gli argomenti per nome in modo da rendere esplicito il significato di ogni valore.',
            },
            {
              english: 'Call',
              italian: 'Chiamata',
              pronunciation: '/k\u0254\u02D0l/',
              phonetic: 'KOL',
              example:
                'You can call a function stored in a variable just like a regular one: action = greet; action(). = Puoi chiamare una funzione memorizzata in una variabile come una normale: action = greet; action().',
              context: 'functions',
              difficulty: 'beginner',
              code: 'my_function()',
            },
            {
              english: 'Docstring',
              italian: 'Stringa di Documentazione',
              pronunciation: '/\u02C8d\u0252kstr\u026A\u014B/',
              phonetic: 'DOK-string',
              example:
                'Write a docstring to explain the function. = Scrivi una docstring per spiegare la funzione.',
              context: 'documentation',
              difficulty: 'intermediate',
              note: "Stringa racchiusa tra tripli apici all'inizio della funzione.",
              code: `def normalize_email(email):
    """Return the email lowercased and stripped of whitespace."""
    return email.strip().lower()`,
              task: 'Aggiungi una docstring tra tripli apici subito sotto la firma della funzione per descrivere il contratto.',
            },
            {
              english: 'Built-in Function',
              italian: 'Funzione Integrata',
              pronunciation: '/\u02CCb\u026Alt \u02C8\u026An \u02C8f\u028C\u014Bk\u0283\u0259n/',
              phonetic: 'BILT-in FANK-scen',
              example:
                'Python ships with over 70 built-in functions like len(), sorted(), and isinstance(). = Python include oltre 70 funzioni integrate come len(), sorted() e isinstance().',
              context: 'functions',
              difficulty: 'beginner',
              code: `names = [user.full_name for user in users]
sorted_names = sorted(names, key=len)
longest_count = len(max(names, key=len))`,
              task: 'Combina le funzioni integrate sorted, len e max per ordinare e misurare i nomi degli utenti.',
            },
            {
              english: 'Positional Argument',
              italian: 'Argomento Posizionale',
              pronunciation:
                '/p\u0259\u02C8z\u026A\u0283\u0259nl \u02C8\u0251\u02D0r\u0261jum\u0259nt/',
              phonetic: 'po-SI-scio-nel AR-ghiu-ment',
              example: `When you call connect('localhost', 5432), each positional argument is bound to a parameter based on its order in the signature. = Quando chiami connect('localhost', 5432), ogni argomento posizionale viene legato a un parametro in base al suo ordine nella firma.`,
              context: 'functions',
              difficulty: 'intermediate',
              code: `def connect(host, port, timeout):
    ...

connect("db.internal", 5432, 30)`,
              task: `Chiama connect passando host, porta e timeout come argomenti posizionali nell'ordine della firma.`,
            },
            {
              english: 'Keyword Argument',
              italian: 'Argomento a Parola Chiave',
              pronunciation: '/\u02C8ki\u02D0w\u025C\u02D0rd \u02C8\u0251\u02D0r\u0261jum\u0259nt/',
              phonetic: 'KII-uerd AR-ghiu-ment',
              example:
                'Specify the parameter name when passing arguments. = Specifica il nome del parametro quando passi gli argomenti.',
              context: 'functions',
              difficulty: 'intermediate',
              code: 'func(name="John", age=30)',
            },
          ],
        },
        {
          id: 'py_func_adv',
          title: 'Funzioni Avanzate / Advanced Functions',
          description: '*args, **kwargs, lambda, closure...',
          items: [
            {
              english: '*args (Arbitrary Arguments)',
              italian: 'Argomenti Arbitrari',
              pronunciation: '/\u02CC\u0251\u02D0rd\u0292z/',
              phonetic: 'ARGS',
              example:
                '*args allows a variable number of positional arguments. = *args permette un numero variabile di argomenti posizionali.',
              context: 'functions',
              difficulty: 'advanced',
              note: 'I parametri vengono ricevuti come una tupla.',
              code: `def log_event(level, *messages):
    for msg in messages:
        log.write(f"[{level}] {msg}")`,
              task: 'Dichiara *messages come parametro variadico per accettare un numero arbitrario di stringhe nel logger.',
            },
            {
              english: '**kwargs (Arbitrary Keyword Arguments)',
              italian: 'Argomenti Chiave Arbitrari',
              pronunciation: '/\u02C8kw\u0251\u02D0rd\u0292z/',
              phonetic: 'KU-ARGS',
              example:
                'Passing **kwargs to a wrapper function lets you forward all keyword arguments to the wrapped function transparently. = Passare **kwargs a una funzione wrapper permette di inoltrare tutti gli argomenti a parola chiave alla funzione avvolta in modo trasparente.',
              context: 'functions',
              difficulty: 'advanced',
              note: 'I parametri vengono ricevuti come un dizionario.',
              code: `def make_request(url, **headers):
    return requests.get(url, headers=headers)

make_request("/api/users", Authorization="Bearer abc", Accept="application/json")`,
              task: 'Usa **kwargs per raccogliere gli header HTTP come dizionario e inoltrarli alla chiamata requests.get.',
            },
            {
              english: 'Lambda Function',
              italian: 'Funzione Anonima (Lambda)',
              pronunciation: '/\u02C8l\u00E6md\u0259 \u02C8f\u028C\u014Bk\u0283\u0259n/',
              phonetic: 'LAM-da FANK-scen',
              example:
                "Passing a lambda function to sorted() as the key parameter lets you customize the sort order inline. = Passare una funzione lambda a sorted() come parametro key permette di personalizzare l'ordinamento inline.",
              context: 'functions',
              difficulty: 'intermediate',
              code: 'lambda x: x * 2',
              note: 'Pu\u00F2 avere pi\u00F9 argomenti ma una sola espressione.',
            },
            {
              english: 'Closure',
              italian: 'Chiusura (Closure)',
              pronunciation: '/\u02C8klo\u028A\u0292\u0259r/',
              phonetic: 'CLOU-siur',
              example:
                'A closure remembers variables from its outer scope. = Una closure ricorda le variabili dal suo scope esterno.',
              context: 'functions',
              difficulty: 'advanced',
              note: "Una funzione interna che mantiene l'accesso allo scope della funzione esterna anche dopo che questa ha finito.",
              code: `def make_multiplier(factor):
    def multiply(x):
        return x * factor
    return multiply

double = make_multiplier(2)`,
              task: 'Crea una chiusura che catturi il parametro factor della funzione esterna e lo riusi a ogni chiamata interna.',
            },
            {
              english: 'Decorator',
              italian: 'Decoratore',
              pronunciation: '/\u02C8dek\u0259re\u026At\u0259r/',
              phonetic: 'DE-co-rei-ter',
              example:
                'Adding @cache above a function lets a decorator wrap it to memoize results without changing the original code. = Aggiungere @cache sopra una funzione permette a un decoratore di avvolgerla per memorizzare i risultati senza modificare il codice originale.',
              context: 'functions',
              difficulty: 'advanced',
              code: '@my_decorator\ndef func():',
              note: 'Si lascia spesso il termine inglese decorator nelle conversazioni tecniche.',
            },
            {
              english: 'Wrapper',
              italian: 'Involucro (Wrapper)',
              pronunciation: '/\u02C8r\u00E6p\u0259r/',
              phonetic: 'RAP-per',
              example:
                'The wrapper function wraps the original call. = La funzione wrapper avvolge la chiamata originale.',
              context: 'functions',
              difficulty: 'advanced',
              code: `def timed(fn):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = fn(*args, **kwargs)
        log.info(f"{fn.__name__} took {time.time() - start:.2f}s")
        return result
    return wrapper`,
              task: 'Definisci una funzione wrapper che misuri il tempo di esecuzione della funzione originale e poi inoltri il risultato.',
            },
            {
              english: 'Generator Function',
              italian: 'Funzione Generatore',
              pronunciation:
                '/\u02C8d\u0292en\u0259re\u026At\u0259r \u02C8f\u028C\u014Bk\u0283\u0259n/',
              phonetic: 'GEN-e-reiter FANK-scen',
              example:
                'Generators use "yield" instead of "return". = I generatori usano "yield" invece di "return".',
              context: 'functions',
              difficulty: 'advanced',
              note: 'Restituisce un iteratore che produce valori uno alla volta, risparmiando memoria.',
              code: `def read_lines(path):
    with open(path) as f:
        for line in f:
            yield line.rstrip()`,
              task: 'Trasforma la lettura del file in una funzione generatore con yield per scorrere le righe senza caricarle tutte in memoria.',
            },
            {
              english: 'Higher-Order Function',
              italian: 'Funzione di Ordine Superiore',
              pronunciation:
                '/\u02C8ha\u026A\u0259r \u02C8\u0254\u02D0rd\u0259r \u02C8f\u028C\u014Bk\u0283\u0259n/',
              phonetic: 'HAI-er OR-der FANK-scen',
              example:
                "A function that takes another function as an argument. = Una funzione che accetta un'altra funzione come argomento.",
              context: 'functions',
              difficulty: 'advanced',
              code: `def apply_to_all(fn, items):
    return [fn(item) for item in items]

uppercased = apply_to_all(str.upper, names)`,
              task: `Scrivi una funzione di ordine superiore che accetti un'altra funzione come argomento e la applichi a una lista.`,
            },
            {
              english: 'Inner Function',
              italian: 'Funzione Interna',
              pronunciation: '/\u02C8\u026An\u0259r \u02C8f\u028C\u014Bk\u0283\u0259n/',
              phonetic: 'IN-ner FANK-scen',
              example:
                "Define an inner function inside another function. = Definisci una funzione interna dentro un'altra funzione.",
              context: 'functions',
              difficulty: 'intermediate',
              code: `def parse_request(raw):
    def clean(value):
        return value.strip().lower()
    return {clean(k): clean(v) for k, v in raw.items()}`,
              task: 'Definisci una funzione interna clean dentro parse_request per riusare la pulizia delle stringhe solo localmente.',
            },
            {
              english: 'Recursion',
              italian: 'Ricorsione',
              pronunciation: '/r\u026A\u02C8k\u025C\u02D0r\u0292\u0259n/',
              phonetic: 're-KER-scen',
              example:
                'Every recursive call must get closer to the base case to avoid infinite recursion. = Ogni chiamata ricorsiva deve avvicinarsi al caso base per evitare la ricorsione infinita.',
              context: 'functions',
              difficulty: 'advanced',
              code: `def walk(node):
    yield node
    for child in node.children:
        yield from walk(child)`,
              task: 'Implementa con la ricorsione una visita ad albero che produca ciascun nodo e poi richiami se stessa sui figli.',
            },
          ],
        },
        {
          id: 'py_scope',
          title: 'Scope e Namespace',
          description: 'Local, global, nonlocal, LEGB...',
          items: [
            {
              english: 'Scope',
              italian: 'Ambito (Scope)',
              pronunciation: '/sko\u028Ap/',
              phonetic: 'SKOUP',
              example: `The lexical scope of a variable determines where it can be read or written, following Python's LEGB lookup rule. = L'ambito lessicale di una variabile determina dove puo' essere letta o scritta, seguendo la regola di lookup LEGB di Python.`,
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Spesso ci si riferisce a questo concetto come scope, lasciando il termine inglese.',
              code: `counter = 0

def increment():
    counter = 1
    return counter

increment()
print(counter)`,
              task: 'Mostra la differenza di scope creando una variabile locale che oscura quella di modulo senza modificarla.',
            },
            {
              english: 'Global',
              italian: 'Globale',
              pronunciation: '/\u02C8\u0261lo\u028Abl/',
              phonetic: 'GLOU-bal',
              example: `A variable defined at module level is global to that file and can be read from any function inside it. = Una variabile definita a livello di modulo e' globale per quel file e puo' essere letta da qualsiasi funzione al suo interno.`,
              context: 'foundations',
              difficulty: 'beginner',
              code: `CONFIG = load_config("app.yaml")

def get_database_url():
    return CONFIG["database"]["url"]`,
              task: 'Definisci la costante CONFIG a livello globale del modulo e leggila dalla funzione interna.',
            },
            {
              english: 'Local',
              italian: 'Locale',
              pronunciation: '/\u02C8lo\u028Akl/',
              phonetic: 'LOU-kal',
              example:
                'Names introduced by assignment inside a function body live in the local scope and vanish once the call frame is popped on return. = I nomi introdotti per assegnazione dentro il corpo di una funzione vivono nello scope locale e svaniscono quando il frame di chiamata viene rimosso al ritorno.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `def total(items):
    subtotal = sum(item.price for item in items)
    tax = subtotal * 0.22
    return subtotal + tax`,
              task: 'Crea le variabili locali subtotal e tax dentro la funzione: spariscono al termine della chiamata.',
            },
            {
              english: 'Nonlocal',
              italian: 'Non locale',
              pronunciation: '/\u02CCn\u0252n\u02C8lo\u028Akl/',
              phonetic: 'non-LOU-kal',
              example:
                'Use nonlocal to modify a variable in an outer function. = Usa nonlocal per modificare una variabile in una funzione esterna.',
              context: 'foundations',
              difficulty: 'advanced',
              code: `def counter():
    n = 0
    def increment():
        nonlocal n
        n += 1
        return n
    return increment`,
              task: 'Usa la parola chiave nonlocal nella funzione interna per modificare la variabile n del closure esterno.',
            },
            {
              english: 'LEGB Rule',
              italian: 'Regola LEGB',
              pronunciation: '/\u02CCel i\u02D0 d\u0292i\u02D0 \u02C8bi\u02D0 ru\u02D0l/',
              phonetic: 'el-ii-gii-bii RUUL',
              example:
                'LEGB stands for Local, Enclosing, Global, Built-in. = LEGB sta per Locale, Racchiuso, Globale, Integrato.',
              context: 'foundations',
              difficulty: 'advanced',
              note: "L'ordine in cui Python cerca i nomi delle variabili.",
            },
            {
              english: 'Namespace',
              italian: 'Spazio dei Nomi (Namespace)',
              pronunciation: '/\u02C8ne\u026Am spe\u026As/',
              phonetic: 'NEIM-speis',
              example:
                'Every module, class, and function has its own namespace, implemented as a dictionary that maps names to objects. = Ogni modulo, classe e funzione ha il proprio namespace, implementato come un dizionario che mappa nomi a oggetti.',
              context: 'foundations',
              difficulty: 'intermediate',
              note: 'Implementato internamente come un dizionario.',
              code: `import math
import statistics

result = math.sqrt(statistics.mean(values))`,
              task: 'Usa due namespace distinti, math e statistics, qualificando ogni funzione con il nome del modulo.',
            },
            {
              english: 'Shadowing',
              italian: 'Oscuramento (Shadowing)',
              pronunciation: '/\u02C8\u0283\u00E6do\u028A\u026A\u014B/',
              phonetic: 'SCIA-dou-ing',
              example:
                "Variable shadowing occurs when a local name hides a global one. = L'oscuramento avviene quando un nome locale nasconde uno globale.",
              context: 'foundations',
              difficulty: 'intermediate',
              code: `id = 42

def process(item):
    id = item.identifier
    return id`,
              task: 'Mostra lo shadowing: la variabile locale id dentro la funzione nasconde la built-in id per tutto lo scope locale.',
            },
            {
              english: 'Module-level Variable',
              italian: 'Variabile di Livello Modulo',
              pronunciation: '/\u02C8m\u0252dju\u02D0l \u02C8levl \u02C8veri\u0259bl/',
              phonetic: 'MO-diul LE-vel VE-ri-ebol',
              example:
                'Variables at the module level are global to that file. = Le variabili a livello modulo sono globali per quel file.',
              context: 'foundations',
              difficulty: 'intermediate',
              code: `MAX_RETRIES = 5
DEFAULT_TIMEOUT = 30

def fetch(url):
    return http.get(url, retries=MAX_RETRIES, timeout=DEFAULT_TIMEOUT)`,
              task: 'Dichiara le costanti MAX_RETRIES e DEFAULT_TIMEOUT a livello modulo e riusale dalle funzioni del file.',
            },
            {
              english: 'Global Keyword',
              italian: 'Parola Chiave Global',
              pronunciation: '/\u02C8\u0261lo\u028Abl \u02C8ki\u02D0w\u025C\u02D0rd/',
              phonetic: 'GLOU-bal KII-uerd',
              example:
                'Use "global" to declare you want to modify a global variable. = Usa "global" per dichiarare di voler modificare una variabile globale.',
              context: 'syntax',
              difficulty: 'intermediate',
              code: 'global x\nx = 10',
            },
            {
              english: 'Nonlocal Keyword',
              italian: 'Parola Chiave Nonlocal',
              pronunciation: '/\u02CCn\u0252n\u02C8lo\u028Akl \u02C8ki\u02D0w\u025C\u02D0rd/',
              phonetic: 'non-LOU-kal KII-uerd',
              example:
                'The "nonlocal" keyword was added in Python 3. = La parola chiave "nonlocal" \u00E8 stata aggiunta in Python 3.',
              context: 'syntax',
              difficulty: 'advanced',
              code: `def make_accumulator():
    total = 0
    def add(value):
        nonlocal total
        total += value
        return total
    return add`,
              task: 'Applica la keyword nonlocal alla variabile total per permettere alla funzione interna add di aggiornarla.',
            },
          ],
        },
        {
          id: 'py_func_patterns',
          title: 'Pattern Funzionali / Functional Patterns',
          description: 'Recursion, callback, higher-order...',
          items: [
            {
              english: 'Callback',
              italian: 'Richiamata (Callback)',
              pronunciation: '/\u02C8k\u0254\u02D0lb\u00E6k/',
              phonetic: 'COL-bak',
              example:
                'A callback is a function passed as an argument. = Una callback \u00E8 una funzione passata come argomento.',
              context: 'patterns',
              difficulty: 'intermediate',
              note: 'Verr\u00E0 "richiamata" in un secondo momento.',
              code: `def on_complete(result):
    log.info(f"job done: {result}")

worker.submit(task, callback=on_complete)`,
              task: `Passa la funzione on_complete come callback al worker, che la richiamera' al termine dell'elaborazione.`,
            },
            {
              english: 'Map (function)',
              italian: 'Mappa (Map)',
              pronunciation: '/m\u00E6p/',
              phonetic: 'MAP',
              example:
                'Use map to apply a function to all items. = Usa map per applicare una funzione a tutti gli elementi.',
              context: 'functions',
              difficulty: 'intermediate',
              code: 'map(lambda x: x*2, my_list)',
            },
            {
              english: 'Filter (function)',
              italian: 'Filtro (Filter)',
              pronunciation: '/\u02C8f\u026Alt\u0259r/',
              phonetic: 'FIL-ter',
              example:
                "Filter removes items that don't match a condition. = Filter rimuove elementi che non soddisfano una condizione.",
              context: 'functions',
              difficulty: 'intermediate',
              code: 'filter(lambda x: x > 0, my_list)',
            },
            {
              english: 'Reduce (function)',
              italian: 'Riduzione (Reduce)',
              pronunciation: '/r\u026A\u02C8dju\u02D0s/',
              phonetic: 're-DIUS',
              example:
                'Reduce combines all items into a single value. = Reduce combina tutti gli elementi in un unico valore.',
              context: 'functions',
              difficulty: 'advanced',
              note: 'In Python 3 si trova nel modulo "functools".',
              code: `from functools import reduce

total = reduce(lambda acc, order: acc + order.amount, orders, 0)`,
              task: `Usa reduce di functools per accumulare l'importo totale degli ordini partendo da zero.`,
            },
            {
              english: 'Currying',
              italian: 'trasformazione in funzioni a un argomento (Currying)',
              pronunciation: '/\u02C8k\u028Cri\u026A\u014B/',
              phonetic: 'CAR-ri-ing',
              example:
                'With currying, you can create specialized versions like add_tax = curry(add)(0.22). = Con il currying, puoi creare versioni specializzate come add_tax = curry(add)(0.22).',
              context: 'patterns',
              difficulty: 'expert',
              code: `def add(a):
    def inner(b):
        return a + b
    return inner

add_tax = add(0.22)
price_with_tax = add_tax(100)`,
              task: 'Trasforma una somma a due argomenti in funzioni curried che accettino un argomento alla volta.',
            },
            {
              english: 'Pure Function',
              italian: 'Funzione Pura',
              pronunciation: '/pj\u028A\u0259r \u02C8f\u028C\u014Bk\u0283\u0259n/',
              phonetic: 'PIUR FANK-scen',
              example: `A function like math.sqrt(x) is a pure function: same input always produces the same output, and it never mutates external state. = Una funzione come math.sqrt(x) e' una funzione pura: lo stesso input produce sempre lo stesso output e non muta mai lo stato esterno.`,
              context: 'patterns',
              difficulty: 'intermediate',
              note: 'Restituisce sempre lo stesso output per lo stesso input.',
              code: `def apply_discount(price, percent):
    return price * (1 - percent / 100)`,
              task: `Scrivi una funzione pura che restituisca sempre lo stesso output a parita' di input e non muti nulla all'esterno.`,
            },
            {
              english: 'Side Effect',
              italian: 'Effetto Collaterale',
              pronunciation: '/sa\u026Ad \u026A\u02C8fekt/',
              phonetic: 'SAID i-FEKT',
              example:
                'Modifying a global variable is a side effect. = Modificare una variabile globale \u00E8 un effetto collaterale.',
              context: 'foundations',
              difficulty: 'intermediate',
              code: `metrics_count = 0

def record_event(name):
    global metrics_count
    metrics_count += 1
    log.info(name)`,
              task: 'Evidenzia gli effetti collaterali della funzione: modifica una variabile globale e scrive su un logger esterno.',
            },
            {
              english: 'Immutable Data',
              italian: 'Dati Immutabili',
              pronunciation: '/\u026A\u02C8mju\u02D0t\u0259bl \u02C8de\u026At\u0259/',
              phonetic: 'im-MIU-ta-bol DEI-ta',
              example:
                'Using frozen dataclasses or namedtuples ensures your data stays immutable, preventing accidental state changes in concurrent code. = Usare dataclass frozen o namedtuple assicura che i dati restino immutabili, prevenendo modifiche accidentali dello stato nel codice concorrente.',
              context: 'patterns',
              difficulty: 'advanced',
              code: `from dataclasses import dataclass

@dataclass(frozen=True)
class Money:
    amount: int
    currency: str`,
              task: 'Definisci una dataclass frozen Money per rendere immutabili i dati monetari e prevenire mutazioni accidentali.',
            },
            {
              english: 'List/Dict Comprehension',
              italian: 'Comprensione Liste/Diz',
              pronunciation: '/\u02CCk\u0252mpr\u026A\u02C8hen\u0283\u0259n/',
              phonetic: 'com-pri-EN-scen',
              example:
                'Comprehensions are a functional feature in Python. = Le comprensioni sono una funzionalit\u00E0 funzionale in Python.',
              context: 'syntax',
              difficulty: 'intermediate',
              code: 'emails_by_id = {user.id: user.email for user in users if user.is_active}',
              task: 'Usa una dict comprehension per creare una mappa id->email considerando solo gli utenti attivi.',
            },
            {
              english: 'Partial Application',
              italian: 'Applicazione Parziale',
              pronunciation:
                '/\u02C8p\u0251\u02D0r\u0283l \u02CC\u00E6pl\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'PAR-scial ap-pli-KEI-scen',
              example:
                'You can use functools.partial to create a specialized version of a function with some arguments pre-filled, reducing repetition. = Puoi usare functools.partial per creare una versione specializzata di una funzione con alcuni argomenti pre-compilati, riducendo la ripetizione.',
              context: 'patterns',
              difficulty: 'advanced',
              note: 'Creare una nuova funzione pre-impostando alcuni argomenti di una funzione esistente.',
              code: `from functools import partial

log_error = partial(log.write, level="ERROR")
log_error("db connection lost")`,
              task: 'Applica functools.partial per pre-impostare il parametro level e ottenere una versione specializzata della funzione di log.',
            },
          ],
        },
      ],
    },
    4: {
      name: 'OOP - Classi / Classes',
      description: 'Programmazione orientata agli oggetti',
      lessons: [
        {
          id: 'py_class_basics',
          title: 'Classi Base / Basic Classes',
          description: 'Class, object, instance, __init__...',
          items: [
            {
              english: 'Class',
              italian: 'Classe',
              pronunciation: '/kl\u0251\u02D0s/',
              phonetic: 'CLAS',
              example:
                'A class is a blueprint for creating objects. = Una classe \u00E8 un modello per creare oggetti.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class User:
    def __init__(self, name):
        self.name = name`,
              task: 'Definisci una classe User con un costruttore che riceve il nome e lo memorizza come attributo di istanza.',
            },
            {
              english: 'Object',
              italian: 'Oggetto',
              pronunciation: '/\u02C8\u0252bd\u0292\u026Akt/',
              phonetic: 'OB-gect',
              example:
                'Even integers and functions are objects in Python, which means you can inspect their methods with dir() at runtime. = Anche gli interi e le funzioni sono oggetti in Python, il che significa che puoi ispezionarne i metodi con dir() a runtime.',
              context: 'oop',
              difficulty: 'beginner',
              code: `user = User('Marco')
print(type(user))`,
              task: `Crea un oggetto della classe User passando il nome e stampa il suo tipo per verificare che sia un'istanza.`,
            },
            {
              english: 'Instance',
              italian: 'Istanza',
              pronunciation: '/\u02C8\u026Anst\u0259ns/',
              phonetic: 'IN-stans',
              example:
                "An instance is a specific object of a class. = Un'istanza \u00E8 un oggetto specifico di una classe.",
              context: 'oop',
              difficulty: 'beginner',
              code: `alice = User('Alice')
bob = User('Bob')
print(alice is bob)`,
              task: `Crea due istanze distinte della classe User e verifica che siano oggetti separati con identita' diversa.`,
            },
            {
              english: '__init__ (Method)',
              italian: 'Metodo Inizializzatore',
              pronunciation: '/\u02CC\u028Cnd\u0259r\u02C8sk\u0254\u02D0r \u026An\u026At/',
              phonetic: 'DAN-der i-nit',
              example:
                'The __init__ method is called when an object is created. = Il metodo __init__ viene chiamato quando si crea un oggetto.',
              context: 'oop',
              difficulty: 'beginner',
              note: 'Spesso chiamato "costruttore", serve a impostare lo stato iniziale dell\'oggetto.',
              code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y`,
              task: `Implementa il metodo __init__ della classe Point per inizializzare le coordinate x e y all'atto della creazione.`,
            },
            {
              english: 'self (Parameter)',
              italian: 'Riferimento Istanza (self)',
              pronunciation: '/self/',
              phonetic: 'SELF',
              example:
                'Use "self" to access attributes of the instance. = Usa "self" per accedere agli attributi dell\'istanza.',
              context: 'oop',
              difficulty: 'beginner',
              note: "Rappresenta l'oggetto stesso all'interno dei suoi metodi.",
              code: `class Counter:
    def __init__(self):
        self.count = 0
    def increment(self):
        self.count += 1`,
              task: `Definisci una classe Counter che usa self per accedere e modificare l'attributo count nel metodo increment.`,
            },
            {
              english: 'Attribute',
              italian: 'Attributo',
              pronunciation: '/\u02C8\u00E6tr\u026Abju\u02D0t/',
              phonetic: 'A-tri-biut',
              example:
                'Defining an attribute like self.name in __init__ ensures every instance starts with its own copy. = Definire un attributo come self.name in __init__ garantisce che ogni istanza inizi con la propria copia.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Car:
    def __init__(self, brand):
        self.brand = brand
        self.speed = 0`,
              task: 'Definisci una classe Car con un attributo brand passato al costruttore e un attributo speed inizializzato a zero.',
            },
            {
              english: 'Method',
              italian: 'Metodo',
              pronunciation: '/\u02C8me\u03B8\u0259d/',
              phonetic: 'ME-thod',
              example:
                'Calling a method like account.deposit(100) bundles behavior with the data it operates on. = Chiamare un metodo come account.deposit(100) raggruppa il comportamento con i dati su cui opera.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Account:
    def __init__(self, balance=0):
        self.balance = balance
    def deposit(self, amount):
        self.balance += amount`,
              task: `Aggiungi alla classe Account un metodo deposit che incrementa il saldo dell'importo passato come argomento.`,
            },
            {
              english: 'Constructor',
              italian: 'Costruttore',
              pronunciation: '/k\u0259n\u02C8str\u028Ckt\u0259r/',
              phonetic: 'con-STRAC-ter',
              example:
                'The constructor initializes the new object. = Il costruttore inizializza il nuovo oggetto.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price`,
              task: `Scrivi il costruttore della classe Product che riceve name e price e li assegna agli attributi dell'istanza.`,
            },
            {
              english: 'Instance Variable',
              italian: 'Variabile di Istanza',
              pronunciation: '/\u02C8\u026Anst\u0259ns \u02C8veri\u0259bl/',
              phonetic: 'IN-stans VE-ri-ebol',
              example:
                'Attributes attached to self inside __init__ become instance variables, giving each object its own independent copy of that state. = Gli attributi attaccati a self dentro __init__ diventano variabili di istanza, dando a ogni oggetto la propria copia indipendente di quello stato.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `class Dog:
    def __init__(self, name):
        self.name = name  # variabile di istanza`,
              task: 'Definisci una variabile di istanza name nella classe Dog assegnandola a self dentro __init__.',
            },
            {
              english: 'Class Variable',
              italian: 'Variabile di Classe',
              pronunciation: '/kl\u0251\u02D0s \u02C8veri\u0259bl/',
              phonetic: 'CLAS VE-ri-ebol',
              example:
                'Attributes defined directly in the class body act as class variables shared by every instance unless one shadows it with self. = Gli attributi definiti direttamente nel corpo della classe agiscono come variabili di classe condivise da ogni istanza a meno che una non la mascheri con self.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `class Dog:
    species = 'Canis familiaris'  # variabile di classe
    def __init__(self, name):
        self.name = name`,
              task: 'Aggiungi alla classe Dog una variabile di classe species condivisa da tutte le istanze.',
            },
          ],
        },
        {
          id: 'py_inheritance',
          title: 'Ereditariet\u00E0 / Inheritance',
          description: 'Parent, child, override, super...',
          items: [
            {
              english: 'Inheritance',
              italian: 'Ereditariet\u00E0',
              pronunciation: '/\u026An\u02C8her\u026At\u0259ns/',
              phonetic: 'in-HE-ri-tans',
              example: `By using inheritance, a Manager class can extend Employee and add bonus logic without rewriting the shared attributes. = Usando l'ereditarieta', una classe Manager puo' estendere Employee e aggiungere logica di bonus senza riscrivere gli attributi condivisi.`,
              context: 'oop',
              difficulty: 'intermediate',
              code: `class Animal:
    def eat(self):
        print('eating')

class Dog(Animal):
    pass`,
              task: 'Definisci una classe Dog che eredita da Animal in modo da riusare automaticamente il metodo eat.',
            },
            {
              english: 'Parent Class (Base Class)',
              italian: 'Classe Genitore / Base',
              pronunciation: '/\u02C8per\u0259nt kl\u0251\u02D0s/',
              phonetic: 'PE-rent CLAS',
              example:
                'The child class inherits from the parent class. = La classe figlia eredita dalla classe genitore.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Employee:
    def __init__(self, name):
        self.name = name

class Manager(Employee):
    pass`,
              task: 'Definisci la classe genitore Employee con un attributo name e una classe figlia Manager che la estende.',
            },
            {
              english: 'Child Class (Subclass)',
              italian: 'Classe Figlia / Sottoclasse',
              pronunciation: '/t\u0283a\u026Ald kl\u0251\u02D0s/',
              phonetic: 'CAILD CLAS',
              example:
                'A subclass can add or change functionality. = Una sottoclasse pu\u00F2 aggiungere o cambiare funzionalit\u00E0.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Vehicle:
    pass

class Car(Vehicle):
    def honk(self):
        print('beep')`,
              task: 'Crea una sottoclasse Car che eredita da Vehicle e aggiunge un nuovo metodo honk specifico per le auto.',
            },
            {
              english: 'Override (Method)',
              italian: 'Sovrascrivere (Override)',
              pronunciation: '/\u02CCo\u028Av\u0259r\u02C8ra\u026Ad/',
              phonetic: 'ou-ver-RAID',
              example:
                'Override a method to change its behavior in the subclass. = Sovrascrivi un metodo per cambiarne il comportamento nella sottoclasse.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `class Animal:
    def speak(self):
        print('sound')

class Dog(Animal):
    def speak(self):
        print('woof')`,
              task: `Sovrascrivi il metodo speak nella sottoclasse Dog per stampare 'woof' invece del comportamento ereditato da Animal.`,
            },
            {
              english: 'Super (function)',
              italian: 'Funzione Super',
              pronunciation: '/\u02C8su\u02D0p\u0259r/',
              phonetic: 'SU-per',
              example:
                'Use super() to call methods from the parent class. = Usa super() per chiamare i metodi della classe genitore.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'super().__init__()',
            },
            {
              english: 'Multiple Inheritance',
              italian: 'Ereditariet\u00E0 Multipla',
              pronunciation: '/\u02C8m\u028Clt\u026Apl \u026An\u02C8her\u026At\u0259ns/',
              phonetic: 'MAL-ti-pol in-HE-ri-tans',
              example:
                "Python resolves multiple inheritance conflicts using the Method Resolution Order (MRO), which follows the C3 linearization algorithm. = Python risolve i conflitti dell'ereditariet\u00E0 multipla usando il Method Resolution Order (MRO), che segue l'algoritmo di linearizzazione C3.",
              context: 'oop',
              difficulty: 'advanced',
              note: 'Quando una classe eredita da pi\u00F9 di una classe genitore.',
              code: `class Swimmer:
    def swim(self): pass

class Flyer:
    def fly(self): pass

class Duck(Swimmer, Flyer):
    pass`,
              task: `Definisci la classe Duck che eredita contemporaneamente da Swimmer e Flyer applicando l'ereditarieta' multipla.`,
            },
            {
              english: 'Method Resolution Order (MRO)',
              italian: 'Ordine di Risoluzione dei Metodi',
              pronunciation:
                '/\u02C8me\u03B8\u0259d \u02CCrez\u0259\u02C8lu\u02D0\u0283\u0259n \u0254\u02D0rd\u0259r/',
              phonetic: 'ME-thod re-so-LIU-scen OR-der',
              example:
                "The MRO determines which method is called first. = L'MRO determina quale metodo viene chiamato per primo.",
              context: 'oop',
              difficulty: 'expert',
              note: "Usa l'algoritmo C3 linearization per decidere l'ordine nelle gerarchie complesse.",
              code: `class A: pass
class B(A): pass
class C(A): pass
class D(B, C): pass
print(D.__mro__)`,
              task: `Stampa l'attributo __mro__ della classe D per ispezionare l'ordine di risoluzione dei metodi calcolato dall'algoritmo C3.`,
            },
            {
              english: 'Mixin',
              italian: 'Classe di Funzionalità Riusabile (Mixin)',
              pronunciation: '/\u02C8m\u026Aks\u026An/',
              phonetic: 'MIX-in',
              example:
                'A mixin adds specific tools to a class without being a full parent. = Un mixin aggiunge strumenti specifici a una classe senza essere un vero genitore.',
              context: 'oop',
              difficulty: 'advanced',
              code: `class JSONMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class User(JSONMixin):
    def __init__(self, name):
        self.name = name`,
              task: `Definisci un mixin JSONMixin che aggiunge il metodo to_json e applicalo alla classe User tramite ereditarieta'.`,
            },
            {
              english: 'Is-a Relationship',
              italian: 'Relazione " \u00C8 un"',
              pronunciation: '/\u026Az \u0259 r\u026A\u02C8le\u026A\u0283\u0259n\u0283\u026Ap/',
              phonetic: 'IZ-e re-LEI-scion-scip',
              example:
                'Before using inheritance, verify the "is-a" relationship holds: a Dog is-a Animal makes sense, but a Stack is-a List does not. = Prima di usare l\'ereditariet\u00E0, verifica che la relazione "\u00E8 un" regga: un Cane \u00E8-un Animale ha senso, ma uno Stack \u00E8-una Lista no.',
              context: 'design',
              difficulty: 'intermediate',
              note: 'Es: Un Cane "\u00E8 un" Animale.',
            },
            {
              english: 'Polymorphism',
              italian: 'Polimorfismo',
              pronunciation: '/\u02CCp\u0252li\u02C8m\u0254\u02D0rf\u026Az\u0259m/',
              phonetic: 'po-li-MOR-fi-sem',
              example: `Thanks to polymorphism, a single render(shape) function can call shape.draw() whether shape is a Circle or a Square. = Grazie al polimorfismo, una sola funzione render(shape) puo' chiamare shape.draw() sia che shape sia un Circle o un Square.`,
              context: 'oop',
              difficulty: 'intermediate',
              code: `class Circle:
    def area(self): return 3.14 * self.r ** 2
class Square:
    def area(self): return self.side ** 2

for shape in shapes:
    print(shape.area())`,
              task: 'Sfrutta il polimorfismo iterando una lista di forme e chiamando area() su ciascuna senza sapere il tipo concreto.',
            },
          ],
        },
        {
          id: 'py_oop_concepts',
          title: 'Concetti OOP / OOP Concepts',
          description: 'Encapsulation, polymorphism, abstraction...',
          items: [
            {
              english: 'Encapsulation',
              italian: 'Incapsulamento',
              pronunciation: '/\u026An\u02CCk\u00E6psju\u02C8le\u026A\u0283\u0259n/',
              phonetic: 'in-kap-su-LEI-scen',
              example: `Through encapsulation, a BankAccount class hides its balance behind methods like deposit() so callers cannot corrupt the state. = Attraverso l'incapsulamento, una classe BankAccount nasconde il suo saldo dietro metodi come deposit() cosi' i chiamanti non possono corrompere lo stato.`,
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Protegge i dati da accessi non autorizzati o accidentali.',
              code: `class BankAccount:
    def __init__(self):
        self._balance = 0
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount`,
              task: `Incapsula il saldo della classe BankAccount esponendolo solo tramite un metodo deposit che valida l'importo.`,
            },
            {
              english: 'Abstraction',
              italian: 'Astrazione',
              pronunciation: '/\u00E6b\u02C8str\u00E6k\u0283\u0259n/',
              phonetic: 'ab-STRAK-scen',
              example:
                'Good abstraction lets callers use open(path) without knowing whether the file lives on disk or in cloud storage. = Una buona astrazione permette ai chiamanti di usare open(path) senza sapere se il file vive su disco o in cloud storage.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `from abc import ABC, abstractmethod

class Storage(ABC):
    @abstractmethod
    def save(self, data): ...`,
              task: 'Astrai i dettagli di salvataggio definendo una classe Storage con un metodo astratto save che le sottoclassi devono implementare.',
            },
            {
              english: 'Private Attribute',
              italian: 'Attributo Privato',
              pronunciation: '/\u02C8pra\u026Av\u0259t \u02C8\u00E6tr\u026Abju\u02D0t/',
              phonetic: 'PRAI-vet A-tri-biut',
              example:
                'Use double underscores for private attributes. = Usa il doppio underscore per gli attributi privati.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'self.__secret = 123',
              note: 'In Python non sono veramente inaccessibili, ma scatta il "name mangling".',
            },
            {
              english: 'Protected Attribute',
              italian: 'Attributo Protetto',
              pronunciation: '/pr\u0259\u02C8tekt\u026Ad \u02C8\u00E6tr\u026Abju\u02D0t/',
              phonetic: 'pro-TEK-ted A-tri-biut',
              example:
                'A single underscore indicates a protected attribute. = Un singolo underscore indica un attributo protetto.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'self._internal_value = 10',
              note: 'Segnale convenzionale per dire "non usare fuori da questa classe o sottoclassi".',
            },
            {
              english: 'Interface',
              italian: 'Interfaccia',
              pronunciation: '/\u02C8\u026Ant\u0259rfe\u026As/',
              phonetic: 'IN-ter-feis',
              example:
                "An interface defines which methods a class must implement. = Un'interfaccia definisce quali metodi una classe deve implementare.",
              context: 'design',
              difficulty: 'advanced',
              code: `from abc import ABC, abstractmethod

class Serializable(ABC):
    @abstractmethod
    def to_dict(self) -> dict: ...`,
              task: `Definisci un'interfaccia Serializable tramite ABC che obbliga le sottoclassi a fornire un metodo to_dict.`,
            },
            {
              english: 'Abstract Base Class (ABC)',
              italian: 'Classe Base Astratta',
              pronunciation: '/\u02C8\u00E6bstr\u00E6kt be\u026As kl\u0251\u02D0s/',
              phonetic: 'AB-strakt BEIS CLAS',
              example:
                'Defining a Shape ABC with an abstract draw() method forces every subclass like Circle and Square to provide its own implementation. = Definire una ABC Shape con un metodo astratto draw() obbliga ogni sottoclasse come Circle e Square a fornire la propria implementazione.',
              context: 'oop',
              difficulty: 'advanced',
              note: 'Usata per definire uno standard per le sottoclassi (modulo abc).',
              code: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def draw(self):
        pass`,
              task: 'Crea una Abstract Base Class Shape con un metodo astratto draw che obbliga ogni sottoclasse a fornire la propria implementazione.',
            },
            {
              english: 'Composition',
              italian: 'Composizione',
              pronunciation: '/\u02CCk\u0252mp\u0259\u02C8z\u026A\u0283\u0259n/',
              phonetic: 'com-po-SI-scen',
              example:
                "Favoring composition over inheritance makes your classes more flexible because you can swap out components at runtime. = Preferire la composizione all'ereditarietà rende le classi più flessibili perché puoi sostituire i componenti a runtime.",
              context: 'design',
              difficulty: 'advanced',
              note: 'Es: Un\'Auto "ha un" Motore.',
              code: `class Engine:
    def start(self): pass

class Car:
    def __init__(self):
        self.engine = Engine()`,
              task: `Usa la composizione facendo in modo che la classe Car contenga al suo interno un'istanza di Engine come attributo.`,
            },
            {
              english: 'Aggregation',
              italian: 'Aggregazione',
              pronunciation: '/\u02CC\u00E6\u0261r\u026A\u02C8\u0261e\u026A\u0283\u0259n/',
              phonetic: 'ag-gre-GEI-scen',
              example:
                'In an aggregation relationship, the contained objects can exist independently, like students in a university class. = In una relazione di aggregazione, gli oggetti contenuti possono esistere indipendentemente, come gli studenti in una classe universitaria.',
              context: 'design',
              difficulty: 'expert',
              note: "L'oggetto contenuto pu\u00F2 esistere indipendentemente dal contenitore.",
              code: `class Student:
    def __init__(self, name):
        self.name = name

class Classroom:
    def __init__(self, students):
        self.students = students  # esistono fuori da Classroom`,
              task: `Modella un'aggregazione passando una lista di Student gia' esistenti al costruttore di Classroom invece di crearli internamente.`,
            },
            {
              english: 'Method Overloading',
              italian: 'Sovraccarico dei Metodi',
              pronunciation:
                '/\u02C8me\u03B8\u0259d \u02CCo\u028Av\u0259r\u02C8lo\u028Ad\u026A\u014B/',
              phonetic: 'ME-thod ou-ver-LOU-ding',
              example:
                'Python does not support traditional method overloading. = Python non supporta il sovraccarico dei metodi tradizionale.',
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Si ottiene usando argomenti di default o *args.',
              code: `class Greeter:
    def hello(self, name=None):
        if name is None:
            return 'Hello!'
        return f'Hello, {name}!'`,
              task: 'Simula il sovraccarico dei metodi in Python usando un argomento di default che cambia il comportamento del metodo hello.',
            },
            {
              english: 'Duck Typing',
              italian: 'Tipizzazione "Duck"',
              pronunciation: '/d\u028Ck \u02C8ta\u026Ap\u026A\u014B/',
              phonetic: 'DAK TAI-ping',
              example:
                "If it walks like a duck and quacks like a duck, it's a duck. = Se cammina come una papera e fa quack come una papera, \u00E8 una papera.",
              context: 'foundations',
              difficulty: 'advanced',
              note: "Filosofia di Python: conta cosa l'oggetto pu\u00F2 fare, non di che tipo \u00E8.",
              code: `def quack_it(thing):
    thing.quack()  # non importa il tipo, basta che abbia .quack()`,
              task: 'Sfrutta il duck typing in una funzione quack_it che invoca .quack() su qualsiasi oggetto senza controllarne il tipo.',
            },
          ],
        },
        {
          id: 'py_oop_advanced',
          title: 'OOP Avanzato / Advanced OOP',
          description: 'Property, getter, setter, classmethod...',
          items: [
            {
              english: 'Property (Decorator)',
              italian: 'Propriet\u00E0',
              pronunciation: '/\u02C8pr\u0252p\u0259rti/',
              phonetic: 'PRO-per-ti',
              example:
                'Use @property to make a method look like an attribute. = Usa @property per far sembrare un metodo un attributo.',
              context: 'oop',
              difficulty: 'intermediate',
              code: '@property\ndef name(self):',
            },
            {
              english: 'Getter',
              italian: 'Metodo di Lettura (Getter)',
              pronunciation: '/\u02C8\u0261et\u0259r/',
              phonetic: 'GHE-ter',
              example:
                'A getter retrieves the value of an attribute. = Un getter recupera il valore di un attributo.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `class Account:
    def __init__(self, balance):
        self._balance = balance
    @property
    def balance(self):
        return self._balance`,
              task: `Definisci un getter per l'attributo balance della classe Account usando il decoratore @property.`,
            },
            {
              english: 'Setter',
              italian: 'Metodo di Scrittura (Setter)',
              pronunciation: '/\u02C8set\u0259r/',
              phonetic: 'SET-ter',
              example:
                "A setter validates the value before assignment. = Un setter valida il valore prima dell'assegnamento.",
              context: 'oop',
              difficulty: 'intermediate',
              code: '@name.setter\ndef name(self, value):',
            },
            {
              english: 'Classmethod (Decorator)',
              italian: 'Metodo di Classe',
              pronunciation: '/kl\u0251\u02D0s \u02C8me\u03B8\u0259d/',
              phonetic: 'CLAS ME-thod',
              example:
                'A classmethod takes the class as its first argument (cls). = Un metodo di classe riceve la classe come primo argomento (cls).',
              context: 'oop',
              difficulty: 'advanced',
              code: '@classmethod\ndef func(cls, ...):',
            },
            {
              english: 'Staticmethod (Decorator)',
              italian: 'Metodo Statico',
              pronunciation: '/\u02C8st\u00E6t\u026Ak \u02C8me\u03B8\u0259d/',
              phonetic: 'STA-tik ME-thod',
              example:
                'A staticmethod does not receive self or cls. = Un metodo statico non riceve n\u00E9 self n\u00E9 cls.',
              context: 'oop',
              difficulty: 'advanced',
              note: 'Si comporta come una funzione normale ma appartiene al namespace della classe.',
              code: `class Math:
    @staticmethod
    def square(x):
        return x * x`,
              task: `Definisci un metodo statico square nella classe Math che eleva al quadrato un numero senza ricevere ne' self ne' cls.`,
            },
            {
              english: 'Dunder Method (Magic Method)',
              italian: 'Metodo Magico (Dunder)',
              pronunciation: '/\u02C8d\u028Cnd\u0259r \u02C8me\u03B8\u0259d/',
              phonetic: 'DAN-der ME-thod',
              example:
                'Dunder methods start and end with double underscores. = I metodi dunder iniziano e finiscono con doppio underscore.',
              context: 'oop',
              difficulty: 'advanced',
              note: 'Es: __init__, __add__, __len__.',
              code: `class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)`,
              task: `Implementa il metodo dunder __add__ nella classe Vector per supportare l'operatore + tra due vettori.`,
            },
            {
              english: '__str__ vs __repr__',
              italian: 'Stringa vs Rappresentazione',
              pronunciation: '/\u02CC\u028Cnd\u0259r\u02C8sk\u0254\u02D0r str\u026A\u014B/',
              phonetic: 'DAN-der STRING',
              example:
                '__str__ is for humans, __repr__ is for developers. = __str__ \u00E8 per gli umani, __repr__ \u00E8 per gli sviluppatori.',
              context: 'oop',
              difficulty: 'advanced',
              code: `class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __str__(self):
        return f'({self.x}, {self.y})'
    def __repr__(self):
        return f'Point(x={self.x}, y={self.y})'`,
              task: `Implementa sia __str__ (per l'utente) sia __repr__ (per lo sviluppatore) nella classe Point con due rappresentazioni diverse.`,
            },
            {
              english: 'Operator Overloading',
              italian: 'Sovraccarico degli Operatori',
              pronunciation:
                '/\u02C8\u0252p\u0259re\u026At\u0259r \u02CCo\u028Av\u0259r\u02C8lo\u028Ad\u026A\u014B/',
              phonetic: 'O-pe-reiter ou-ver-LOU-ding',
              example:
                "Implementing __add__ and __radd__ in your class lets you use the + operator with instances on both sides of the expression. = Implementare __add__ e __radd__ nella tua classe ti permette di usare l'operatore + con istanze su entrambi i lati dell'espressione.",
              context: 'oop',
              difficulty: 'advanced',
              note: 'Permette di definire come gli operatori (+, -, *) si comportano con i tuoi oggetti.',
              code: `class Money:
    def __init__(self, amount):
        self.amount = amount
    def __add__(self, other):
        return Money(self.amount + other.amount)`,
              task: `Sovraccarica l'operatore + nella classe Money implementando __add__ per sommare due importi e restituire un nuovo Money.`,
            },
            {
              english: 'Slots (__slots__)',
              italian: 'Ottimizzazione Memoria (Slots)',
              pronunciation: '/sl\u0252ts/',
              phonetic: 'SLOTS',
              example:
                'Using __slots__ saves memory by preventing __dict__ creation. = Usare __slots__ risparmia memoria evitando la creazione di __dict__.',
              context: 'performance',
              difficulty: 'expert',
              code: `class Point:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y`,
              task: 'Ottimizza la memoria della classe Point dichiarando __slots__ per impedire la creazione del dizionario __dict__.',
            },
            {
              english: 'Descriptor',
              italian: 'Descrittore',
              pronunciation: '/d\u026A\u02C8skr\u026Apt\u0259r/',
              phonetic: 'di-SKRIP-ter',
              example:
                "A descriptor is an object that manages attribute access. = Un descrittore \u00E8 un oggetto che gestisce l'accesso agli attributi.",
              context: 'oop',
              difficulty: 'expert',
              note: 'La tecnologia dietro @property, @classmethod e i metodi stessi.',
              code: `class Positive:
    def __set_name__(self, owner, name):
        self.name = name
    def __set__(self, instance, value):
        if value < 0:
            raise ValueError('must be positive')
        instance.__dict__[self.name] = value`,
              task: `Definisci un descrittore Positive che intercetta __set__ per impedire l'assegnamento di valori negativi a un attributo.`,
            },
          ],
        },
      ],
    },
    5: {
      name: 'Moduli e File / Modules & Files',
      description: 'Organizzazione del codice e gestione file',
      lessons: [
        {
          id: 'py_modules',
          title: 'Moduli / Modules',
          description: 'Import, module, package, pip...',
          items: [
            {
              english: 'Module',
              italian: 'Modulo',
              pronunciation: '/\u02C8m\u0252dju\u02D0l/',
              phonetic: 'MO-diul',
              example:
                'A module is a file containing Python code. = Un modulo \u00E8 un file contenente codice Python.',
              context: 'organization',
              difficulty: 'beginner',
              code: `# in mymodule.py
def greet(name):
    return f'Hello, {name}'

# in main.py
import mymodule
print(mymodule.greet('Anna'))`,
              task: 'Crea il modulo mymodule.py con la funzione greet e importalo da un altro file per richiamarla.',
            },
            {
              english: 'Package',
              italian: 'Pacchetto (Package)',
              pronunciation: '/\u02C8p\u00E6k\u026Ad\u0292/',
              phonetic: 'PA-keg',
              example:
                'A package is a collection of modules in a directory. = Un pacchetto \u00E8 una collezione di moduli in una cartella.',
              context: 'organization',
              difficulty: 'intermediate',
              note: 'Riconoscibile dalla presenza del file __init__.py (anche se opzionale in Python 3.3+).',
              code: `# struttura: mypackage/__init__.py, mypackage/utils.py
from mypackage import utils
utils.helper()`,
              task: 'Organizza il codice in un package mypackage con __init__.py e importa la sottomodulo utils dal package.',
            },
            {
              english: 'Import Statement',
              italian: 'Istruzione Import',
              pronunciation: '/\u02C8\u026Amp\u0254\u02D0rt \u02C8ste\u026Atm\u0259nt/',
              phonetic: 'IM-port STEIT-ment',
              example:
                'Placing all import statements at the top of the file keeps dependencies visible and organized. = Posizionare tutte le istruzioni import in cima al file mantiene le dipendenze visibili e organizzate.',
              context: 'syntax',
              difficulty: 'beginner',
              code: 'import math',
            },
            {
              english: 'From ... Import',
              italian: 'Da ... Importa',
              pronunciation: '/fr\u0252m \u02C8\u026Amp\u0254\u02D0rt/',
              phonetic: 'FROM IM-port',
              example:
                'from math import pi imports only the pi value. = from math import pi importa solo il valore pi.',
              context: 'syntax',
              difficulty: 'beginner',
              code: `from math import pi, sqrt
print(sqrt(pi))`,
              task: 'Usa la sintassi from ... import per portare nel namespace corrente solo pi e sqrt dal modulo math.',
            },
            {
              english: 'As (Alias)',
              italian: 'Come (Alias)',
              pronunciation: '/\u00E6z/',
              phonetic: 'AS',
              example: `Writing import numpy as np uses the as keyword to alias the module under a shorter name preferred in scientific code. = Scrivere import numpy as np usa la parola chiave as per creare un alias del modulo con un nome piu' corto preferito nel codice scientifico.`,
              context: 'syntax',
              difficulty: 'beginner',
              code: `import numpy as np
import pandas as pd
arr = np.array([1, 2, 3])`,
              task: `Importa numpy con l'alias np usando la parola chiave as e crea un array di tre elementi.`,
            },
            {
              english: 'Standard Library',
              italian: 'Libreria Standard',
              pronunciation: '/\u02C8st\u00E6nd\u0259rd \u02C8la\u026Abr\u0259ri/',
              phonetic: 'STAN-dard LAI-bre-ri',
              example:
                'Python comes with a large standard library. = Python include una vasta libreria standard.',
              context: 'ecosystem',
              difficulty: 'beginner',
              note: 'Include moduli come math, datetime, os, sys, ecc.',
              code: `import os
import datetime
print(os.getcwd(), datetime.date.today())`,
              task: 'Sfrutta la libreria standard importando os e datetime per stampare la directory corrente e la data di oggi.',
            },
            {
              english: 'Third-party Library',
              italian: 'Libreria di Terze Parti',
              pronunciation:
                '/\u03B8\u025C\u02D0rd \u02C8p\u0251\u02D0rti \u02C8la\u026Abr\u0259ri/',
              phonetic: 'THERD par-ti LAI-bre-ri',
              example:
                'Requests is a popular third-party library. = Requests \u00E8 una popolare libreria di terze parti.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              code: `import requests
response = requests.get('https://api.example.com/users')
print(response.status_code)`,
              task: 'Usa la libreria di terze parti requests per eseguire una richiesta GET e stampare lo status code della risposta.',
            },
            {
              english: 'Pip (Package Manager)',
              italian: 'Gestore Pacchetti (Pip)',
              pronunciation: '/p\u026Ap/',
              phonetic: 'PIP',
              example:
                'Run pip install -r requirements.txt to let the package manager fetch every project dependency from PyPI in one shot. = Esegui pip install -r requirements.txt per far scaricare al package manager ogni dipendenza del progetto da PyPI in un colpo solo.',
              context: 'tools',
              difficulty: 'beginner',
              note: 'Acronimo ricorsivo: Pip Installs Packages.',
              code: `# da shell
pip install requests==2.31.0
pip install -r requirements.txt`,
              task: 'Installa requests in versione 2.31.0 con pip e poi installa tutte le dipendenze elencate in requirements.txt.',
            },
            {
              english: 'PyPI (Python Package Index)',
              italian: 'Indice dei Pacchetti Python',
              pronunciation: '/\u02CCpa\u026A pi\u02D0 \u02CCa\u026A/',
              phonetic: 'pai-pi-AI',
              example:
                'PyPI is the official repository for third-party Python software. = PyPI \u00E8 la repository ufficiale per il software Python di terze parti.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              code: `# pubblicazione su PyPI
python -m build
python -m twine upload dist/*`,
              task: 'Pubblica il pacchetto su PyPI costruendo la distribuzione con build e caricandola con twine.',
            },
            {
              english: '__name__ == "__main__"',
              italian: 'Controllo Esecuzione Principale',
              pronunciation: '/\u02CC\u028Cnd\u0259r\u02C8sk\u0254\u02D0r ne\u026Am/',
              phonetic: 'DAN-der neim',
              example:
                'This block runs only if the file is executed directly. = Questo blocco gira solo se il file viene eseguito direttamente.',
              context: 'organization',
              difficulty: 'advanced',
              note: 'Permette di avere codice che viene eseguito solo quando il file \u00E8 lo script principale, non quando viene importato.',
              code: `def main():
    print('eseguito direttamente')

if __name__ == '__main__':
    main()`,
              task: `Aggiungi il blocco if __name__ == '__main__' per eseguire la funzione main solo quando il file viene lanciato direttamente.`,
            },
          ],
        },
        {
          id: 'py_files',
          title: 'File I/O',
          description: 'Open, read, write, close, with...',
          items: [
            {
              english: 'File Object',
              italian: 'Oggetto File',
              pronunciation: '/fa\u026Al \u02C8\u0252bd\u0292\u026Akt/',
              phonetic: 'FAIL ob-gect',
              example:
                "Always use a context manager with open() so the file object is automatically closed even if an exception occurs. = Usa sempre un context manager con open() così l'oggetto file viene chiuso automaticamente anche se si verifica un'eccezione.",
              context: 'io',
              difficulty: 'beginner',
              code: `with open('data.txt', 'r') as f:
    content = f.read()
    print(type(f))`,
              task: `Apri data.txt con un context manager e stampa il tipo dell'oggetto file ottenuto per ispezionarne la natura.`,
            },
            {
              english: 'Open (function)',
              italian: 'Aprire (Open)',
              pronunciation: '/\u02C8o\u028Ap\u0259n/',
              phonetic: 'OUPEN',
              example:
                'Always open files with a "with" block so Python closes them automatically when done. = Apri sempre i file con un blocco "with" così Python li chiude automaticamente al termine.',
              context: 'io',
              difficulty: 'beginner',
              code: `with open('notes.txt', 'r', encoding='utf-8') as f:
    text = f.read()`,
              task: 'Apri il file notes.txt in lettura con codifica UTF-8 dentro un blocco with per leggerne il contenuto.',
            },
            {
              english: 'Mode',
              italian: 'Modalit\u00E0 (Mode)',
              pronunciation: '/mo\u028Ad/',
              phonetic: 'MOUD',
              example: `Pass a mode like 'r' for read, 'w' for write, or 'a' for append as the second argument to open(). = Passa una modalita' come 'r' per leggere, 'w' per scrivere o 'a' per accodare come secondo argomento a open().`,
              context: 'io',
              difficulty: 'beginner',
              note: '"a" per aggiungere (append), "x" per creazione esclusiva.',
              code: `with open('log.txt', 'a') as f:
    f.write('nuova riga\\n')`,
              task: `Apri log.txt in modalita' append ('a') e scrivi una nuova riga in coda al contenuto esistente.`,
            },
            {
              english: 'Read',
              italian: 'Leggere',
              pronunciation: '/ri\u02D0d/',
              phonetic: 'RIID',
              example:
                'For large files, use file.read(chunk_size) in a loop instead of reading everything into memory at once. = Per file grandi, usa file.read(chunk_size) in un ciclo invece di leggere tutto in memoria in una volta.',
              context: 'io',
              difficulty: 'beginner',
              code: `with open('report.txt') as f:
    content = f.read()
print(len(content))`,
              task: `Leggi l'intero contenuto di report.txt con read() e stampa la lunghezza in caratteri della stringa risultante.`,
            },
            {
              english: 'Readline',
              italian: 'Leggi riga',
              pronunciation: '/\u02C8ri\u02D0dla\u026An/',
              phonetic: 'RIID-lain',
              example:
                "Processing a large log file with readline avoids loading the entire content into memory. = Elaborare un grande file di log con readline evita di caricare l'intero contenuto in memoria.",
              context: 'io',
              difficulty: 'intermediate',
              code: `with open('app.log') as f:
    line = f.readline()
    while line:
        process(line)
        line = f.readline()`,
              task: 'Itera il file app.log una riga alla volta con readline() per processarlo senza caricarlo tutto in memoria.',
            },
            {
              english: 'Write',
              italian: 'Scrivere',
              pronunciation: '/ra\u026At/',
              phonetic: 'RAIT',
              example:
                "When writing to a file, remember that file.write() does not add a newline automatically, so append \\n when needed. = Quando scrivi su un file, ricorda che file.write() non aggiunge automaticamente un'a capo, quindi aggiungi \\n quando necessario.",
              context: 'io',
              difficulty: 'beginner',
              code: `with open('output.txt', 'w') as f:
    f.write('prima riga\\n')
    f.write('seconda riga\\n')`,
              task: 'Apri output.txt in scrittura e usa il metodo write() per inserire due righe terminate da \\n.',
            },
            {
              english: 'Close',
              italian: 'Chiudere',
              pronunciation: '/klo\u028Az/',
              phonetic: 'CLOUS',
              example: `If you do not close a file explicitly, the OS may keep its descriptor open; this is why a with block is safer. = Se non chiudi esplicitamente un file, il sistema operativo puo' tenerne aperto il descrittore; per questo un blocco with e' piu' sicuro.`,
              context: 'io',
              difficulty: 'beginner',
              note: 'Libera le risorse di sistema occupate dal file.',
              code: `f = open('data.txt')
try:
    data = f.read()
finally:
    f.close()`,
              task: `Chiudi esplicitamente l'oggetto file dentro un blocco finally per liberare il descrittore anche in caso di eccezione.`,
            },
            {
              english: 'With Statement (Context Manager)',
              italian: 'Gestore di Contesto (With)',
              pronunciation: '/w\u026A\u00F0 \u02C8ste\u026Atm\u0259nt/',
              phonetic: 'WITH STEIT-ment',
              example:
                'Using "with" ensures the file is closed automatically. = Usare "with" garantisce che il file venga chiuso automaticamente.',
              context: 'io',
              difficulty: 'intermediate',
              code: 'with open("file.txt") as f:',
            },
            {
              english: 'Binary Mode',
              italian: 'Modalit\u00E0 Binaria',
              pronunciation: '/\u02C8ba\u026An\u0259ri mo\u028Ad/',
              phonetic: 'BAI-ne-ri moud',
              example: `Open images, PDFs or compressed archives in binary mode ('rb' or 'wb') so Python does not try to decode their bytes as text. = Apri immagini, PDF o archivi compressi in modalita' binaria ('rb' o 'wb') cosi' Python non prova a decodificarne i byte come testo.`,
              context: 'io',
              difficulty: 'advanced',
              code: `with open('image.png', 'rb') as f:
    raw_bytes = f.read()`,
              task: `Apri image.png in modalita' binaria ('rb') per leggere i byte grezzi senza decodifica come testo.`,
            },
            {
              english: 'Seek (method)',
              italian: 'Spostare Cursore (Seek)',
              pronunciation: '/si\u02D0k/',
              phonetic: 'SIIK',
              example:
                "file.seek(0) moves the cursor to the beginning. = file.seek(0) sposta il cursore all'inizio.",
              context: 'io',
              difficulty: 'advanced',
              code: `with open('data.bin', 'rb') as f:
    f.seek(0)  # torna all'inizio
    header = f.read(16)`,
              task: `Sposta il cursore all'inizio di data.bin con seek(0) e leggi i primi 16 byte come header.`,
            },
          ],
        },
        {
          id: 'py_data_formats',
          title: 'Formati Dati / Data Formats',
          description: 'JSON, CSV, XML, YAML...',
          items: [
            {
              english: 'Serialization',
              italian: 'Serializzazione',
              pronunciation: '/\u02CCs\u026Ari\u0259la\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'se-ria-lai-ZEI-scen',
              example:
                'Before sending data over a network, serialization converts Python objects into a transmittable format. = Prima di inviare dati su una rete, la serializzazione converte gli oggetti Python in un formato trasmissibile.',
              context: 'data',
              difficulty: 'advanced',
              code: `import json
data = {'name': 'Alice', 'age': 30}
payload = json.dumps(data)`,
              task: 'Serializza il dizionario data in una stringa JSON usando json.dumps prima di inviarlo in rete.',
            },
            {
              english: 'Deserialization',
              italian: 'Deserializzazione',
              pronunciation: '/di\u02D0\u02CCs\u026Ari\u0259la\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'dii-se-ria-lai-ZEI-scen',
              example:
                'After receiving a JSON response, deserialization rebuilds it into native Python dictionaries and lists. = Dopo aver ricevuto una risposta JSON, la deserializzazione la ricostruisce in dizionari e liste Python nativi.',
              context: 'data',
              difficulty: 'advanced',
              code: `import json
payload = '{"name": "Alice", "age": 30}'
data = json.loads(payload)`,
              task: 'Deserializza la stringa JSON payload con json.loads ricostruendo un dizionario Python nativo.',
            },
            {
              english: 'JSON (module)',
              italian: 'Modulo JSON',
              pronunciation: '/\u02C8d\u0292e\u026As\u0259n/',
              phonetic: 'GEI-son',
              example:
                'Use the json module to parse API responses. = Usa il modulo json per leggere le risposte delle API.',
              context: 'data',
              difficulty: 'beginner',
              code: 'import json\njson.loads(string)',
            },
            {
              english: 'CSV (module)',
              italian: 'Modulo CSV',
              pronunciation: '/\u02CCsi\u02D0 es \u02C8vi\u02D0/',
              phonetic: 'sii-es-VII',
              example:
                'Use csv.DictReader from the CSV module to iterate rows of a spreadsheet as dictionaries keyed by the header line. = Usa csv.DictReader dal modulo CSV per iterare le righe di un foglio di calcolo come dizionari indicizzati dalla riga di intestazione.',
              context: 'data',
              difficulty: 'beginner',
              note: 'Comma-Separated Values: formato testuale per dati tabellari.',
              code: `import csv
with open('users.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['name'])`,
              task: 'Leggi users.csv con csv.DictReader e stampa il campo name di ogni riga indicizzandolo come chiave del dizionario.',
            },
            {
              english: 'YAML',
              italian: 'Formato Configurazione (YAML)',
              pronunciation: '/\u02C8j\u00E6m\u0259l/',
              phonetic: 'IA-mel',
              example:
                'Docker Compose and Kubernetes both use YAML files to define their service configurations. = Docker Compose e Kubernetes usano entrambi file YAML per definire le configurazioni dei servizi.',
              context: 'data',
              difficulty: 'intermediate',
              code: `import yaml
with open('config.yaml') as f:
    config = yaml.safe_load(f)
print(config['database']['host'])`,
              task: 'Carica config.yaml con yaml.safe_load e accedi al campo database.host per leggere la configurazione.',
            },
            {
              english: 'Pickle (module)',
              italian: 'Modulo Pickle',
              pronunciation: '/\u02C8p\u026Akl/',
              phonetic: 'PI-kel',
              example:
                'Pickle is used for Python-specific serialization. = Pickle \u00E8 usato per la serializzazione specifica di Python.',
              context: 'data',
              difficulty: 'advanced',
              note: 'Attenzione: non caricare mai file pickle da fonti non fidate (rischio sicurezza).',
              code: `import pickle
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)
with open('model.pkl', 'rb') as f:
    loaded = pickle.load(f)`,
              task: `Serializza l'oggetto model con pickle.dump in modalita' binaria e poi ricaricalo da disco con pickle.load.`,
            },
            {
              english: 'Parsing',
              italian: 'Analisi Sintattica (Parsing)',
              pronunciation: '/\u02C8p\u0251\u02D0rs\u026A\u014B/',
              phonetic: 'PAR-sing',
              example:
                'The json.loads() function handles parsing of JSON strings into Python objects with automatic type mapping. = La funzione json.loads() gestisce il parsing di stringhe JSON in oggetti Python con mappatura automatica dei tipi.',
              context: 'data',
              difficulty: 'intermediate',
              code: `import json
raw = '{"users": [{"id": 1}, {"id": 2}]}'
parsed = json.loads(raw)
print(parsed['users'][0]['id'])`,
              task: `Effettua il parsing della stringa JSON raw con json.loads e accedi all'id del primo utente dell'array users.`,
            },
            {
              english: 'Encoding (UTF-8)',
              italian: 'Codifica',
              pronunciation: '/\u026An\u02C8ko\u028Ad\u026A\u014B/',
              phonetic: 'in-KOU-ding',
              example: `Always pass encoding='utf-8' to open() when reading text files so emoji and accented characters survive the round trip. = Passa sempre encoding='utf-8' a open() quando leggi file di testo cosi' emoji e caratteri accentati sopravvivono al round trip.`,
              context: 'data',
              difficulty: 'intermediate',
              code: `with open('articolo.txt', 'r', encoding='utf-8') as f:
    testo = f.read()`,
              task: `Apri articolo.txt specificando encoding='utf-8' per leggere correttamente caratteri accentati ed emoji.`,
            },
            {
              english: 'Load/Dump',
              italian: 'Caricare/Scaricare',
              pronunciation: '/lo\u028Ad/ /d\u028Cmp/',
              phonetic: 'LOUD DAMP',
              example:
                'In the json module, dump/load work with file objects, while dumps/loads work with strings (the trailing s stands for string). = Nel modulo json, dump/load lavorano con oggetti file, mentre dumps/loads lavorano con stringhe (la s finale sta per string).',
              context: 'data',
              difficulty: 'intermediate',
              note: 'dump/load lavorano con file; dumps/loads lavorano con stringhe (la "s" sta per string).',
              code: `import json
with open('users.json', 'w') as f:
    json.dump(users, f)  # su file
string = json.dumps(users)  # su stringa`,
              task: 'Salva il dizionario users su file con json.dump e produci anche la versione stringa con json.dumps.',
            },
            {
              english: 'Delimiter',
              italian: 'Delimitatore',
              pronunciation: '/d\u026A\u02C8l\u026Am\u026At\u0259r/',
              phonetic: 'di-LI-mi-ter',
              example:
                'The CSV delimiter can be a comma or a semicolon. = Il delimitatore CSV pu\u00F2 essere una virgola o un punto e virgola.',
              context: 'data',
              difficulty: 'intermediate',
              code: `import csv
with open('data.csv') as f:
    reader = csv.reader(f, delimiter=';')
    for row in reader:
        print(row)`,
              task: `Leggi data.csv usando il punto e virgola come delimitatore passando delimiter=';' a csv.reader.`,
            },
          ],
        },
        {
          id: 'py_venv',
          title: 'Ambienti / Environments',
          description: 'Virtual environment, requirements, pip...',
          items: [
            {
              english: 'Virtual Environment',
              italian: 'Ambiente Virtuale',
              pronunciation:
                '/\u02C8v\u025C\u02D0rt\u0283u\u0259l \u026An\u02C8va\u026Ar\u0259nm\u0259nt/',
              phonetic: 'VER-ciu-al in-VAI-ron-ment',
              example:
                'Use a virtual environment to isolate dependencies. = Usa un ambiente virtuale per isolare le dipendenze.',
              context: 'environment',
              difficulty: 'intermediate',
              note: 'Evita conflitti tra librerie di progetti diversi.',
              code: `# da shell
python -m venv .venv
source .venv/bin/activate
pip install requests`,
              task: 'Crea un ambiente virtuale nella cartella .venv, attivalo e installa requests in isolamento dal sistema.',
            },
            {
              english: 'Venv (module)',
              italian: 'Modulo venv',
              pronunciation: '/\u02CCvi\u02D0 \u02CCen \u02CCvi\u02D0/',
              phonetic: 'V-EN-VII',
              example:
                'python -m venv myenv creates a new environment. = python -m venv myenv crea un nuovo ambiente.',
              context: 'tools',
              difficulty: 'beginner',
              code: `# da shell
python -m venv myenv
source myenv/bin/activate`,
              task: `Usa il modulo venv per creare l'ambiente myenv e attivalo prima di installare le dipendenze del progetto.`,
            },
            {
              english: 'Requirements File',
              italian: 'File dei Requisiti',
              pronunciation: '/r\u026A\u02C8kwa\u026A\u0259rm\u0259nts fa\u026Al/',
              phonetic: 're-KUAIER-ments FAIL',
              example:
                'Pin exact versions in your requirements file to ensure reproducible builds across development and production environments. = Blocca le versioni esatte nel file requirements per garantire build riproducibili tra gli ambienti di sviluppo e produzione.',
              context: 'environment',
              difficulty: 'beginner',
              note: 'Contiene la lista delle librerie e versioni necessarie al progetto.',
              code: `# requirements.txt
requests==2.31.0
flask==3.0.0

# da shell
pip install -r requirements.txt`,
              task: 'Elenca le dipendenze con versioni esatte in requirements.txt e installale tutte insieme con pip install -r.',
            },
            {
              english: 'Dependency',
              italian: 'Dipendenza',
              pronunciation: '/d\u026A\u02C8pend\u0259nsi/',
              phonetic: 'de-PEN-den-si',
              example: `Pin each dependency to an exact version in requirements.txt so production builds match what you tested locally. = Blocca ogni dipendenza a una versione esatta in requirements.txt cosi' le build di produzione corrispondono a quanto testato in locale.`,
              context: 'ecosystem',
              difficulty: 'intermediate',
              code: `# requirements.txt fissa una dipendenza
requests==2.31.0
numpy>=1.24,<2.0`,
              task: 'Blocca la dipendenza requests a una versione esatta e numpy a un intervallo di versioni in requirements.txt.',
            },
            {
              english: 'Environment Variable',
              italian: "Variabile d'Ambiente",
              pronunciation: '/\u026An\u02C8va\u026Ar\u0259nm\u0259nt \u02C8veri\u0259bl/',
              phonetic: 'in-VAI-ron-ment VE-ri-ebol',
              example:
                'Use os.environ to access system variables. = Usa os.environ per accedere alle variabili di sistema.',
              context: 'environment',
              difficulty: 'intermediate',
              code: `import os
api_key = os.environ['API_KEY']
debug = os.environ.get('DEBUG', 'false')`,
              task: `Leggi la variabile d'ambiente API_KEY con os.environ e DEBUG con un valore di default tramite get().`,
            },
            {
              english: 'Dotenv (.env)',
              italian: 'File Dotenv',
              pronunciation: '/\u02C8d\u0252t en v\u026A/',
              phonetic: 'DOT-en-vi',
              example:
                'Loading API keys from a .env file keeps secrets out of version control. = Caricare le chiavi API da un file .env tiene i segreti fuori dal controllo di versione.',
              context: 'environment',
              difficulty: 'intermediate',
              note: 'Pratica comune per non caricare chiavi API e password su GitHub.',
              code: `from dotenv import load_dotenv
import os
load_dotenv()
secret = os.environ['SECRET_KEY']`,
              task: 'Carica le variabili dal file .env con load_dotenv() e accedi a SECRET_KEY tramite os.environ.',
            },
            {
              english: 'Absolute Import',
              italian: 'Importazione Assoluta',
              pronunciation: '/\u02C8\u00E6bs\u0259lu\u02D0t \u02C8\u026Amp\u0254\u02D0rt/',
              phonetic: 'AB-so-liut IM-port',
              example: `Prefer an absolute import like from myapp.utils import helper over relative imports, since it stays valid even if you move the file. = Preferisci un import assoluto come from myapp.utils import helper agli import relativi, perche' resta valido anche se sposti il file.`,
              context: 'organization',
              difficulty: 'advanced',
              code: `from myapp.utils.helpers import format_date
from myapp.models import User`,
              task: 'Usa import assoluti come from myapp.utils.helpers import format_date per rendere le importazioni robuste agli spostamenti.',
            },
            {
              english: 'Circular Import',
              italian: 'Importazione Circolare',
              pronunciation: '/\u02C8s\u025C\u02D0rkj\u0259l\u0259r \u02C8\u026Amp\u0254\u02D0rt/',
              phonetic: 'SER-kiu-lar IM-port',
              example: `If module A imports B and B imports A at top level, you get a circular import that fails because one of them is only half-initialized. = Se il modulo A importa B e B importa A a livello top, ottieni un import circolare che fallisce perche' uno dei due e' solo inizializzato a meta'.`,
              context: 'errors',
              difficulty: 'advanced',
              note: 'Succede quando il modulo A importa B e il modulo B importa A.',
              code: `# evita il ciclo importando localmente
def use_b():
    from module_b import helper  # import dentro la funzione
    helper()`,
              task: `Risolvi un import circolare spostando l'import di module_b dentro la funzione invece di tenerlo a livello top.`,
            },
            {
              english: 'Search Path (sys.path)',
              italian: 'Percorso di Ricerca',
              pronunciation: '/s\u025C\u02D0rt\u0283 p\u00E6\u03B8/',
              phonetic: 'SERC PATH',
              example:
                "Python looks for modules in the sys.path list. = Python cerca i moduli nell'elenco sys.path.",
              context: 'organization',
              difficulty: 'advanced',
              code: `import sys
sys.path.append('/opt/mylibs')
print(sys.path)`,
              task: 'Aggiungi /opt/mylibs al percorso di ricerca di Python tramite sys.path.append e stampa la lista aggiornata.',
            },
            {
              english: 'Package Registry',
              italian: 'Registro dei Pacchetti',
              pronunciation: '/\u02C8p\u00E6k\u026Ad\u0292 \u02C8red\u0292\u026Astri/',
              phonetic: 'PA-keg RE-gis-tri',
              example:
                'PyPI is the most famous package registry for Python. = PyPI \u00E8 il registro pacchetti pi\u00F9 famoso per Python.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              code: `# da shell
pip install --index-url https://pypi.org/simple/ requests
pip config set global.index-url https://my-private-registry.com/simple/`,
              task: 'Installa requests dal registro pacchetti PyPI ufficiale e poi configura pip per usare un registro privato come default.',
            },
          ],
        },
      ],
    },
    6: {
      name: 'Strutture Avanzate / Advanced Structures',
      description: 'Comprehension, generatori e strumenti funzionali',
      lessons: [
        {
          id: 'py_comprehension',
          title: 'Comprehension',
          description: 'List/dict/set comprehension...',
          items: [
            {
              english: 'Nested List Comprehension',
              italian: 'Comprensione di Liste Annidata',
              pronunciation: '/l\u026Ast \u02CC\u0252mpr\u026A\u02C8hen\u0283\u0259n/',
              phonetic: 'LIST com-pri-EN-scen',
              example: `A nested list comprehension like [c for row in matrix for c in row] flattens a 2D grid into a single list in one expression. = Una comprensione di liste annidata come [c for row in matrix for c in row] appiattisce una griglia 2D in una sola lista in un'unica espressione.`,
              context: 'syntax',
              difficulty: 'intermediate',
              note: `Quando si supera un livello di annidamento, conviene tornare a un ciclo for esplicito per leggibilita'.`,
              code: 'flat = [c for row in matrix for c in row]',
              task: 'Appiattisci una matrice 2D in una sola lista con una comprehension annidata, senza scrivere due cicli for espliciti.',
            },
            {
              english: 'Dictionary Comprehension',
              italian: 'Comprensione di Dizionario',
              pronunciation:
                '/\u02C8d\u026Ak\u0283\u0259neri \u02CC\u0252mpr\u026A\u02C8hen\u0283\u0259n/',
              phonetic: 'DIK-scio-ne-ri com-pri-EN-scen',
              example:
                '{x: x**2 for x in range(5)} creates a dictionary. = {x: x**2 for x in range(5)} crea un dizionario.',
              context: 'syntax',
              difficulty: 'intermediate',
              code: '{k: v for k, v in list_of_tuples}',
            },
            {
              english: 'Set Comprehension',
              italian: 'Comprensione di Insieme',
              pronunciation: '/set \u02CC\u0252mpr\u026A\u02C8hen\u0283\u0259n/',
              phonetic: 'SET com-pri-EN-scen',
              example:
                '{x for x in "abracadabra"} returns unique characters. = {x for x in "abracadabra"} restituisce caratteri unici.',
              context: 'syntax',
              difficulty: 'intermediate',
              code: 'unique = {ch.lower() for ch in text if ch.isalpha()}',
              task: 'Costruisci un insieme di caratteri alfabetici unici da una stringa usando una set comprehension con filtro.',
            },
            {
              english: 'Generator Expression',
              italian: 'Espressione Generatore',
              pronunciation:
                '/\u02C8d\u0292en\u0259re\u026At\u0259r \u026Ak\u02C8spre\u0283\u0259n/',
              phonetic: 'GEN-e-reiter ik-SPRE-scen',
              example:
                '(x**2 for x in range(1000)) is memory efficient. = (x**2 for x in range(1000)) \u00E8 efficiente in termini di memoria.',
              context: 'syntax',
              difficulty: 'advanced',
              note: 'Usa le parentesi tonde (). Non crea la lista in memoria, ma produce valori uno alla volta.',
              code: 'total = sum(x * x for x in range(1_000_000))',
              task: `Calcola la somma dei quadrati del primo milione di interi con un'espressione generatore, evitando di materializzare la lista in memoria.`,
            },
            {
              english: 'Nested Comprehension',
              italian: 'Comprensione Annidata',
              pronunciation: '/\u02C8nest\u026Ad \u02CC\u0252mpr\u026A\u02C8hen\u0283\u0259n/',
              phonetic: 'NES-ted com-pri-EN-scen',
              example:
                '[val for row in matrix for val in row] flattens a list. = [val for row in matrix for val in row] appiattisce una lista.',
              context: 'syntax',
              difficulty: 'advanced',
              code: 'transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]',
              task: 'Traspone una matrice quadrata usando una comprehension annidata, scambiando righe e colonne.',
            },
            {
              english: 'Filtering (in Comprehension)',
              italian: 'Filtraggio',
              pronunciation: '/\u02C8f\u026Alt\u0259r\u026A\u014B/',
              phonetic: 'FIL-ter-ing',
              example:
                '[x for x in range(10) if x % 2 == 0] filters even numbers. = [x for x in range(10) if x % 2 == 0] filtra i numeri pari.',
              context: 'syntax',
              difficulty: 'intermediate',
              code: 'evens = [x for x in numbers if x % 2 == 0]',
              task: 'Filtra solo i numeri pari da una lista usando la clausola if di una list comprehension.',
            },
            {
              english: 'Conditional Expression',
              italian: 'Espressione Condizionale / Ternaria',
              pronunciation: '/k\u0259n\u02C8d\u026A\u0283\u0259nl \u026Ak\u02C8spre\u0283\u0259n/',
              phonetic: 'con-DI-scio-nel ik-SPRE-scen',
              example:
                "x if condition else y is a ternary expression. = x if condition else y \u00E8 un'espressione ternaria.",
              context: 'syntax',
              difficulty: 'intermediate',
              code: `labels = ['even' if x % 2 == 0 else 'odd' for x in nums]`,
              task: `Etichetta ogni numero come 'even' o 'odd' usando un'espressione condizionale ternaria dentro una comprehension.`,
            },
            {
              english: 'Inline For-Loop',
              italian: 'Ciclo For in Linea',
              pronunciation: '/\u02C8\u026Anla\u026An f\u0254\u02D0r lu\u02D0p/',
              phonetic: 'IN-lain FOR LUUP',
              example:
                'Comprehensions use an inline for-loop syntax. = Le comprensioni usano una sintassi di ciclo for in linea.',
              context: 'syntax',
              difficulty: 'beginner',
              code: 'squares = [x * x for x in range(10)]',
              task: 'Genera la lista dei quadrati da 0 a 9 con un ciclo for in linea, senza usare append in un ciclo esplicito.',
            },
            {
              english: 'Side Effect (avoidance)',
              italian: 'Effetto Collaterale (da evitare)',
              pronunciation: '/sa\u026Ad \u026A\u02C8fekt/',
              phonetic: 'SAID i-FEKT',
              example:
                'Avoid side effects in comprehensions for readability. = Evita effetti collaterali nelle comprensioni per la leggibilit\u00E0.',
              context: 'philosophy',
              difficulty: 'advanced',
              note: 'Non usare print() o modificare variabili globali dentro una comprehension.',
            },
            {
              english: 'Readability',
              italian: 'Leggibilit\u00E0',
              pronunciation: '/\u02CCri\u02D0d\u0259\u02C8b\u026Al\u0259ti/',
              phonetic: 'rii-da-BI-li-ti',
              example:
                'If a list comprehension spans more than one line, refactor it into a regular for-loop for better readability and easier debugging. = Se una comprensione di lista occupa pi\u00F9 di una riga, trasformala in un ciclo for regolare per una migliore leggibilit\u00E0 e un debug pi\u00F9 facile.',
              context: 'philosophy',
              difficulty: 'intermediate',
              note: 'Se una comprehension \u00E8 troppo lunga, \u00E8 meglio usare un normale ciclo for.',
            },
          ],
        },
        {
          id: 'py_generators',
          title: 'Generatori / Generators',
          description: 'Generator, yield, iterator...',
          items: [
            {
              english: 'Generator',
              italian: 'Generatore',
              pronunciation: '/\u02C8d\u0292en\u0259re\u026At\u0259r/',
              phonetic: 'GEN-e-reiter',
              example:
                'Replacing a list with a generator like (line.upper() for line in file) lets you process huge files without loading them into memory. = Sostituire una lista con un generatore come (line.upper() for line in file) permette di elaborare file enormi senza caricarli in memoria.',
              context: 'functions',
              difficulty: 'intermediate',
              code: `def read_lines(path):
    with open(path) as f:
        for line in f:
            yield line.rstrip()`,
              task: `Definisci un generatore che legge un file riga per riga, evitando di caricare l'intero contenuto in memoria.`,
            },
            {
              english: 'Yield (Keyword)',
              italian: 'Produci (Yield)',
              pronunciation: '/ji\u02D0ld/',
              phonetic: 'II-old',
              example:
                'Use "yield" to return a value and pause the function. = Usa "yield" per restituire un valore e mettere in pausa la funzione.',
              context: 'syntax',
              difficulty: 'intermediate',
              note: 'A differenza di "return", mantiene lo stato locale della funzione per la chiamata successiva.',
              code: `def countdown(n):
    while n > 0:
        yield n
        n -= 1`,
              task: `Definisci una funzione generatrice che usa yield per emettere un conto alla rovescia mantenendo lo stato tra una chiamata e l'altra.`,
            },
            {
              english: 'Yield from',
              italian: 'Delega Generatore (Yield From)',
              pronunciation: '/ji\u02D0ld fr\u0252m/',
              phonetic: 'II-old FROM',
              example: `Inside an outer generator, yield from inner() delegates iteration to a sub-generator and forwards send/throw transparently. = Dentro un generatore esterno, yield from inner() delega l'iterazione a un sotto-generatore e inoltra send/throw in modo trasparente.`,
              context: 'syntax',
              difficulty: 'expert',
              code: 'yield from range(10)',
            },
            {
              english: 'Iterator',
              italian: 'Iteratore',
              pronunciation: '/\u026A\u02C8t\u0259re\u026At\u0259r/',
              phonetic: 'i-te-REI-ter',
              example:
                'An iterator is an object with a __next__ method. = Un iteratore \u00E8 un oggetto con un metodo __next__.',
              context: 'data-structures',
              difficulty: 'advanced',
              code: `it = iter([10, 20, 30])
print(next(it))
print(next(it))`,
              task: `Ottieni l'iteratore di una lista con iter() e avanza manualmente con next() per consumare un elemento alla volta.`,
            },
            {
              english: 'Iterable',
              italian: 'Iterabile',
              pronunciation: '/\u02CC\u026At\u0259\u02C8re\u026Abl/',
              phonetic: 'i-te-REI-bol',
              example:
                'Any iterable can be passed to a for loop, including custom objects that implement __iter__. = Qualsiasi iterabile può essere passato a un ciclo for, inclusi oggetti personalizzati che implementano __iter__.',
              context: 'data-structures',
              difficulty: 'beginner',
              note: 'Oggetto che pu\u00F2 restituire un iteratore tramite il metodo __iter__.',
              code: `class Counter:
    def __init__(self, n): self.n = n
    def __iter__(self):
        for i in range(self.n): yield i`,
              task: 'Rendi una classe personalizzata iterabile implementando __iter__ in modo da poterla usare in un ciclo for.',
            },
            {
              english: 'Next (function)',
              italian: 'Prossimo (Next)',
              pronunciation: '/nekst/',
              phonetic: 'NEKST',
              example:
                "Calling next() with a default value like next(iterator, None) prevents a StopIteration exception when the iterator is exhausted. = Chiamare next() con un valore predefinito come next(iterator, None) previene un'eccezione StopIteration quando l'iteratore è esaurito.",
              context: 'functions',
              difficulty: 'intermediate',
              code: 'first_match = next((u for u in users if u.is_admin), None)',
              task: 'Recupera il primo elemento che soddisfa una condizione da un generatore usando next() con un valore di default per evitare StopIteration.',
            },
            {
              english: 'StopIteration',
              italian: 'Eccezione StopIteration',
              pronunciation: '/\u02CCst\u0252p \u02CC\u026At\u0259\u02C8re\u026A\u0283\u0259n/',
              phonetic: 'STOP i-te-REI-scen',
              example:
                'Catching StopIteration manually is rarely needed since for loops handle it automatically. = Intercettare StopIteration manualmente \u00E8 raramente necessario poich\u00E9 i cicli for la gestiscono automaticamente.',
              context: 'errors',
              difficulty: 'advanced',
              code: `it = iter([1, 2])
try:
    while True: print(next(it))
except StopIteration:
    pass`,
              task: `Itera manualmente con next() e cattura StopIteration per terminare il ciclo quando l'iteratore è esaurito.`,
            },
            {
              english: 'Lazy Evaluation',
              italian: 'Valutazione Pigra (Lazy)',
              pronunciation: '/\u02C8le\u026Azi \u026Av\u00E6lju\u02C8e\u026A\u0283\u0259n/',
              phonetic: 'LEI-si i-ve-liu-EI-scen',
              example:
                'Generators use lazy evaluation to save memory. = I generatori usano la lazy evaluation per risparmiare memoria.',
              context: 'performance',
              difficulty: 'advanced',
              note: 'Calcola il valore solo nel momento in cui viene effettivamente richiesto.',
              code: `squares = (x * x for x in range(10**9))
first_ten = [next(squares) for _ in range(10)]`,
              task: `Sfrutta la valutazione pigra di un'espressione generatore per estrarre solo i primi dieci quadrati da un range enorme, senza calcolare il resto.`,
            },
            {
              english: 'State Retention',
              italian: 'Mantenimento dello Stato',
              pronunciation: '/ste\u026At r\u026A\u02C8ten\u0283\u0259n/',
              phonetic: 'STEIT re-TEN-scen',
              example:
                'Between yield calls, a generator retains its local variables and execution position, which simplifies writing stateful iteration logic. = Tra le chiamate yield, un generatore mantiene le sue variabili locali e la posizione di esecuzione, semplificando la scrittura di logica di iterazione con stato.',
              context: 'functions',
              difficulty: 'advanced',
              code: `def running_total():
    total = 0
    while True:
        x = yield total
        total += x`,
              task: `Definisci un generatore che mantiene lo stato (somma corrente) tra una yield e l'altra ricevendo nuovi valori tramite send().`,
            },
            {
              english: 'Memory Efficiency',
              italian: 'Efficienza di Memoria',
              pronunciation: '/\u02C8mem\u0259ri \u026A\u02C8f\u026A\u0283\u0259nsi/',
              phonetic: 'ME-mo-ri i-FI-scen-si',
              example:
                "Using generators improves memory efficiency for large datasets. = Usare i generatori migliora l'efficienza di memoria per grandi set di dati.",
              context: 'performance',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'py_functional',
          title: 'Programmazione Funzionale / Functional',
          description: 'Map, filter, reduce, lambda...',
          items: [
            {
              english: 'Itertools (module)',
              italian: 'Modulo itertools',
              pronunciation: '/\u02CCa\u026At\u0259rtu\u02D0lz/',
              phonetic: 'ai-ter-TUULS',
              example:
                'Itertools contains functions for efficient looping. = Itertools contiene funzioni per cicli efficienti.',
              context: 'ecosystem',
              difficulty: 'advanced',
              note: 'Modulo della libreria standard ispirato a concetti di programmazione funzionale (Haskell, Lisp).',
              code: `import itertools
for i, val in enumerate(itertools.count(10, 2)):
    if i == 5: break
    print(val)`,
              task: 'Importa itertools e usa count() per generare una sequenza infinita di numeri pari a partire da 10, interrompendoti dopo cinque elementi.',
            },
            {
              english: 'Functools.partial',
              italian: 'Applicazione Parziale',
              pronunciation: '/\u02C8f\u028C\u014Bktu\u02D0lz \u02C8p\u0251\u02D0r\u0283l/',
              phonetic: 'FANK-tuuls PAR-scial',
              example:
                'Partial creates a new function with some arguments pre-filled. = Partial crea una nuova funzione con alcuni argomenti gi\u00E0 impostati.',
              context: 'functions',
              difficulty: 'advanced',
              code: 'half = partial(multiply, 0.5)',
            },
            {
              english: 'Operator (module)',
              italian: 'Modulo operator',
              pronunciation: '/\u02C8\u0252p\u0259re\u026At\u0259r/',
              phonetic: 'O-pe-reiter',
              example:
                'Use the operator module for functional-style math. = Usa il modulo operator per la matematica in stile funzionale.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              note: 'Esporta funzioni corrispondenti agli operatori (es. operator.add invece di +).',
              code: `from operator import itemgetter
sorted_users = sorted(users, key=itemgetter('age'))`,
              task: 'Ordina una lista di dizionari per una chiave usando operator.itemgetter, evitando di scrivere una lambda manuale.',
            },
            {
              english: 'Itertools.chain',
              italian: 'Concatenazione (Chain)',
              pronunciation: '/t\u0283e\u026An/',
              phonetic: 'CEIN',
              example:
                'Chain combines multiple iterables into one. = Chain combina pi\u00F9 iterabili in uno solo.',
              context: 'functions',
              difficulty: 'intermediate',
              code: `from itertools import chain
all_items = list(chain(list_a, list_b, list_c))`,
              task: `Concatena tre liste in un unico iterabile con itertools.chain, senza creare copie intermedie con l'operatore +.`,
            },
            {
              english: 'Itertools.cycle',
              italian: 'Ciclo Infinito (Cycle)',
              pronunciation: '/\u02C8sa\u026Akl/',
              phonetic: 'SAI-kel',
              example:
                'Use itertools.cycle to rotate through a fixed set of values, such as alternating colors or distributing tasks in round-robin fashion. = Usa itertools.cycle per ruotare attraverso un insieme fisso di valori, come alternare colori o distribuire compiti in modalità round-robin.',
              context: 'functions',
              difficulty: 'intermediate',
              code: `from itertools import cycle
colors = cycle(['red', 'green', 'blue'])
row_colors = [next(colors) for _ in rows]`,
              task: 'Assegna a ogni riga di una tabella un colore alternato in modo ciclico usando itertools.cycle per ruotare tra tre valori.',
            },
            {
              english: 'Itertools.groupby',
              italian: 'Raggruppamento (Groupby)',
              pronunciation: '/\u02C8\u0261ru\u02D0p ba\u026A/',
              phonetic: 'GRUP-bai',
              example:
                'Remember to sort your data before using itertools.groupby, because it only groups consecutive elements with the same key. = Ricorda di ordinare i dati prima di usare itertools.groupby, perché raggruppa solo elementi consecutivi con la stessa chiave.',
              context: 'functions',
              difficulty: 'expert',
              code: `from itertools import groupby
data.sort(key=lambda r: r['city'])
for city, rows in groupby(data, key=lambda r: r['city']):
    print(city, list(rows))`,
              task: 'Raggruppa righe per città con itertools.groupby, ricordando di ordinare prima i dati perché groupby raggruppa solo elementi consecutivi.',
            },
            {
              english: 'Zip',
              italian: 'Accoppiare (Zip)',
              pronunciation: '/z\u026Ap/',
              phonetic: 'ZIP',
              example:
                'Using zip to combine names and scores into tuples lets you iterate over both lists in parallel. = Usare zip per combinare nomi e punteggi in tuple permette di iterare su entrambe le liste in parallelo.',
              context: 'functions',
              difficulty: 'beginner',
              code: 'zip([1, 2], ["a", "b"]) # (1, "a"), (2, "b")',
            },
            {
              english: 'Functools.wraps',
              italian: 'Preservazione Metadati',
              pronunciation: '/r\u00E6ps/',
              phonetic: 'RAPS',
              example:
                'Use wraps in your decorators to keep function names. = Usa wraps nei tuoi decoratori per mantenere i nomi delle funzioni.',
              context: 'advanced',
              difficulty: 'expert',
              note: 'Copia il nome e la docstring della funzione originale nella funzione wrapper.',
              code: `from functools import wraps
def log(fn):
    @wraps(fn)
    def wrapper(*a, **kw): return fn(*a, **kw)
    return wrapper`,
              task: 'Scrivi un decoratore che usa functools.wraps per preservare nome e docstring della funzione originale, mantenendo introspezione corretta.',
            },
            {
              english: 'Itertools.product',
              italian: 'Prodotto Cartesiano',
              pronunciation: '/\u02C8pr\u0252d\u028Ckt/',
              phonetic: 'PRO-dact',
              example:
                'Product calculates the cartesian product of iterables. = Product calcola il prodotto cartesiano di iterabili.',
              context: 'functions',
              difficulty: 'advanced',
              code: `from itertools import product
grid = list(product(range(3), repeat=2))`,
              task: 'Genera tutte le coordinate di una griglia 3x3 con itertools.product, evitando due cicli for annidati.',
            },
            {
              english: 'Side-effect Free',
              italian: 'Senza Effetti Collaterali',
              pronunciation: '/sa\u026Ad \u026A\u02C8fekt fri\u02D0/',
              phonetic: 'SAID i-fekt FRII',
              example:
                'Functional code aims to be side-effect free. = Il codice funzionale punta ad essere senza effetti collaterali.',
              context: 'philosophy',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'py_collections',
          title: 'Collezioni / Collections',
          description: 'defaultdict, Counter, namedtuple...',
          items: [
            {
              english: 'Collections (module)',
              italian: 'Modulo collections',
              pronunciation: '/k\u0259\u02C8lek\u0283\u0259nz/',
              phonetic: 'col-LEK-scions',
              example:
                'The collections module provides specialized container datatypes. = Il modulo collections fornisce tipi di dati contenitore specializzati.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              code: 'from collections import Counter, defaultdict, namedtuple',
              task: 'Importa dal modulo collections i contenitori specializzati (Counter, defaultdict, namedtuple) che useremo per modellare i dati.',
            },
            {
              english: 'Namedtuple',
              italian: 'Tupla con Nome',
              pronunciation: '/\u02C8ne\u026Amt\u028Cpl/',
              phonetic: 'NEIM-tap-ol',
              example:
                'A namedtuple gives names to each position in a tuple. = Una namedtuple d\u00E0 nomi a ogni posizione di una tupla.',
              context: 'data-structures',
              difficulty: 'intermediate',
              code: 'Point = namedtuple("Point", ["x", "y"])',
            },
            {
              english: 'Defaultdict',
              italian: 'Dizionario con Default',
              pronunciation: '/d\u026A\u02C8f\u0254\u02D0ltd\u026Akt/',
              phonetic: 'di-FOLT-dict',
              example:
                'Using defaultdict(list) lets you append items without checking if the key exists first. = Usare defaultdict(list) permette di aggiungere elementi senza controllare prima se la chiave esiste.',
              context: 'data-structures',
              difficulty: 'advanced',
              note: 'Evita il sollevamento di KeyError.',
              code: `from collections import defaultdict
groups = defaultdict(list)
for name, team in pairs:
    groups[team].append(name)`,
              task: 'Raggruppa nomi per squadra con un defaultdict(list), evitando di controllare ogni volta se la chiave esiste prima di fare append.',
            },
            {
              english: 'Counter',
              italian: 'Contatore (Counter)',
              pronunciation: '/\u02C8ka\u028Ant\u0259r/',
              phonetic: 'CAUN-ter',
              example:
                'Passing a text to Counter instantly gives you the frequency of each character. = Passare un testo a Counter restituisce istantaneamente la frequenza di ogni carattere.',
              context: 'data-structures',
              difficulty: 'intermediate',
              code: 'Counter("abcab") # {"a": 2, "b": 2, "c": 1}',
            },
            {
              english: 'Deque (Double-ended queue)',
              italian: 'Coda Doppia (Deque)',
              pronunciation: '/dek/',
              phonetic: 'DEK',
              example:
                'A deque allows fast appends and pops from both ends. = Una deque permette aggiunte e rimozioni veloci da entrambi i lati.',
              context: 'data-structures',
              difficulty: 'advanced',
              note: 'Ottimizzata per velocit\u00E0 O(1) alle estremit\u00E0, a differenza delle liste O(n).',
              code: `from collections import deque
recent = deque(maxlen=5)
for event in stream:
    recent.append(event)`,
              task: `Mantieni una finestra scorrevole degli ultimi cinque eventi con una deque a lunghezza massima, sfruttando l'append O(1) a entrambi i lati.`,
            },
            {
              english: 'OrderedDict',
              italian: 'Dizionario Ordinato',
              pronunciation: '/\u02C8\u0254\u02D0rd\u0259rd d\u026Akt/',
              phonetic: 'OR-derd dict',
              example:
                "Since Python 3.7 regular dicts keep insertion order, but OrderedDict still offers move_to_end() for reordering. = Da Python 3.7 i dict normali mantengono l'ordine di inserimento, ma OrderedDict offre ancora move_to_end() per il riordinamento.",
              context: 'data-structures',
              difficulty: 'advanced',
              note: 'In Python 3.7+ i dizionari standard sono gi\u00E0 ordinati, ma OrderedDict ha funzioni extra (es. move_to_end).',
              code: `from collections import OrderedDict
cache = OrderedDict()
cache['a'] = 1
cache.move_to_end('a')`,
              task: 'Usa un OrderedDict per implementare una cache LRU sfruttando move_to_end per portare in coda la chiave appena acceduta.',
            },
            {
              english: 'ChainMap',
              italian: 'Mappa a Catena',
              pronunciation: '/t\u0283e\u026An m\u00E6p/',
              phonetic: 'CEIN MAP',
              example:
                'Using ChainMap to layer CLI args over config file over defaults gives you clean priority-based lookups. = Usare ChainMap per sovrapporre gli argomenti CLI al file di config ai default offre ricerche pulite basate su priorit\u00E0.',
              context: 'data-structures',
              difficulty: 'expert',
              note: 'Utile per gestire configurazioni con diversi livelli di priorit\u00E0.',
              code: `from collections import ChainMap
settings = ChainMap(cli_args, env_vars, defaults)
print(settings['debug'])`,
              task: `Componi una configurazione a strati (CLI, environment, default) con ChainMap, lasciando che la priorità venga risolta dall'ordine delle mappe.`,
            },
            {
              english: 'UserDict / UserList',
              italian: 'Wrapper per Diz/Liste',
              pronunciation: '/\u02C8ju\u02D0z\u0259r d\u026Akt/',
              phonetic: 'IUU-ser dict',
              example:
                'Inherit from UserDict to create custom dictionary-like classes. = Eredita da UserDict per creare classi simili a dizionari personalizzate.',
              context: 'oop',
              difficulty: 'expert',
              code: `from collections import UserDict
class LowercaseDict(UserDict):
    def __setitem__(self, key, value):
        super().__setitem__(key.lower(), value)`,
              task: 'Crea un dizionario personalizzato che normalizza le chiavi in minuscolo ereditando da UserDict invece di sottoclassare direttamente dict.',
            },
            {
              english: 'MappingProxyType',
              italian: 'Vista Read-only',
              pronunciation: '/\u02C8m\u00E6p\u026A\u014B \u02C8pr\u0252ksi ta\u026Ap/',
              phonetic: 'MAP-ping PROC-si taip',
              example:
                'Exposing config data through MappingProxyType prevents accidental modifications by other parts of the code. = Esporre i dati di configurazione tramite MappingProxyType previene modifiche accidentali da altre parti del codice.',
              context: 'data-structures',
              difficulty: 'expert',
              code: `from types import MappingProxyType
CONFIG = MappingProxyType({'debug': False, 'host': 'localhost'})`,
              task: 'Esponi un dizionario di configurazione come vista read-only con MappingProxyType, per impedire modifiche accidentali da altre parti del codice.',
            },
            {
              english: 'Container Types',
              italian: 'Tipi Contenitore',
              pronunciation: '/k\u0259n\u02C8te\u026An\u0259r ta\u026Aps/',
              phonetic: 'con-TEI-ner taips',
              example:
                'Check abstract base classes for container types. = Controlla le classi base astratte per i tipi contenitore.',
              context: 'oop',
              difficulty: 'advanced',
              code: `from collections.abc import Mapping, Sequence
def summarize(data):
    if isinstance(data, Mapping): return len(data.keys())
    if isinstance(data, Sequence): return len(data)`,
              task: 'Distingui tra mapping e sequence con isinstance() sulle ABC di collections.abc, invece di controllare tipi concreti come dict o list.',
            },
          ],
        },
      ],
    },
    7: {
      name: 'Gestione Errori / Error Handling',
      description: 'Eccezioni, logging e debugging',
      lessons: [
        {
          id: 'py_exceptions',
          title: 'Eccezioni / Exceptions',
          description: 'try, except, finally, raise...',
          items: [
            {
              english: 'Built-in Exception',
              italian: 'Eccezione Integrata',
              pronunciation: '/\u026Ak\u02C8sep\u0283\u0259n/',
              phonetic: 'ik-SEP-scen',
              example:
                'Python ships with a hierarchy of built-in exceptions like ValueError, KeyError and TypeError that you can raise or catch directly. = Python include una gerarchia di eccezioni integrate come ValueError, KeyError e TypeError che puoi sollevare o catturare direttamente.',
              context: 'errors',
              difficulty: 'beginner',
              note: `Tutte derivano da BaseException; le piu' comuni ereditano da Exception.`,
              code: `try:
    n = int(user_input)
except ValueError:
    n = 0`,
              task: `Cattura l'eccezione integrata ValueError quando converti un input utente in intero, restituendo zero come fallback sicuro.`,
            },
            {
              english: 'Try Block',
              italian: 'Blocco Try (Tenta)',
              pronunciation: '/tra\u026A bl\u0252k/',
              phonetic: 'TRAI block',
              example: `Wrap a risky call like json.loads(data) inside a try block so a malformed payload does not crash the whole program. = Avvolgi una chiamata rischiosa come json.loads(data) dentro un blocco try cosi' un payload malformato non manda in crash l'intero programma.`,
              context: 'control-flow',
              difficulty: 'beginner',
              code: `try:
    data = json.loads(payload)
except json.JSONDecodeError:
    data = {}`,
              task: `Avvolgi in un blocco try la decodifica di un payload JSON, così un input malformato non manda in crash l'intero programma.`,
            },
            {
              english: 'Except Clause',
              italian: 'Clausola Except (Gestisci)',
              pronunciation: '/\u026Ak\u02C8sept kl\u0254\u02D0z/',
              phonetic: 'ik-SEPT clos',
              example:
                "The except clause catches the exception. = La clausola except cattura l'eccezione.",
              context: 'control-flow',
              difficulty: 'beginner',
              code: `try:
    config = open('config.yml')
except FileNotFoundError:
    config = open('default.yml')`,
              task: 'Cattura specificamente FileNotFoundError con una clausola except per ricadere su un file di configurazione di default.',
            },
            {
              english: 'Finally Clause',
              italian: 'Clausola Finally (Infine)',
              pronunciation: '/\u02C8fa\u026An\u0259li kl\u0254\u02D0z/',
              phonetic: 'FAI-na-li clos',
              example:
                'The finally block always runs, even if an error occurs. = Il blocco finally gira sempre, anche se avviene un errore.',
              context: 'control-flow',
              difficulty: 'intermediate',
              note: 'Usato tipicamente per pulire risorse (es. chiudere un file).',
              code: `conn = db.connect()
try:
    conn.execute(query)
finally:
    conn.close()`,
              task: 'Garantisci la chiusura della connessione al database in un blocco finally, indipendentemente dal successo o fallimento della query.',
            },
            {
              english: 'Else Clause (try)',
              italian: 'Clausola Else (nel try)',
              pronunciation: '/els kl\u0254\u02D0z/',
              phonetic: 'ELS clos',
              example:
                'The else block runs only if no exception was raised. = Il blocco else gira solo se non sono avvenute eccezioni.',
              context: 'control-flow',
              difficulty: 'intermediate',
              code: `try:
    user = repo.get(user_id)
except NotFound:
    logger.warning('missing')
else:
    audit.log(user)`,
              task: `Esegui l'auditing del recupero utente nella clausola else del try, in modo che venga loggato solo quando non è stata sollevata alcuna eccezione.`,
            },
            {
              english: 'Raise Statement',
              italian: 'Istruzione Raise (Solleva)',
              pronunciation: '/re\u026Az \u02C8ste\u026Atm\u0259nt/',
              phonetic: 'REIS STEIT-ment',
              example:
                'Use "raise" to trigger an exception manually. = Usa "raise" per innescare un\'eccezione manualmente.',
              context: 'control-flow',
              difficulty: 'intermediate',
              code: 'raise ValueError("Invalid value")',
            },
            {
              english: 'ValueError',
              italian: 'Errore di Valore',
              pronunciation: '/\u02C8v\u00E6lju\u02D0 \u02C8er\u0259r/',
              phonetic: 'VE-liu E-rror',
              example:
                'A ValueError happens when an argument has the wrong value. = Un ValueError avviene quando un argomento ha il valore sbagliato.',
              context: 'errors',
              difficulty: 'beginner',
              code: `def set_age(value):
    if value < 0:
        raise ValueError('age must be non-negative')`,
              task: `Solleva ValueError quando un argomento ha il valore semanticamente sbagliato, come un'età negativa, segnalando chiaramente il problema al chiamante.`,
            },
            {
              english: 'TypeError',
              italian: 'Errore di Tipo',
              pronunciation: '/\u02C8ta\u026Ap \u02C8er\u0259r/',
              phonetic: 'TAIP E-rror',
              example:
                'Adding a string to an integer raises a TypeError. = Aggiungere una stringa a un intero solleva un TypeError.',
              context: 'errors',
              difficulty: 'beginner',
              code: `def add(a, b):
    if not isinstance(a, (int, float)):
        raise TypeError('a must be numeric')
    return a + b`,
              task: 'Solleva TypeError quando un argomento ha il tipo sbagliato, in modo che il chiamante capisca subito che il problema è di tipo e non di valore.',
            },
            {
              english: 'Catch-all Exception',
              italian: 'Cattura Totale (da evitare)',
              pronunciation: '/k\u00E6t\u0283 \u0254\u02D0l \u026Ak\u02C8sep\u0283\u0259n/',
              phonetic: 'CACC ol ik-SEP-scen',
              example:
                'Avoid using a naked "except:" catch-all. = Evita di usare un "except:" generico.',
              context: 'best-practices',
              difficulty: 'advanced',
              note: 'Catturare tutto nasconde i bug; cattura sempre eccezioni specifiche.',
              code: `try:
    do_work()
except (ValueError, KeyError) as e:
    logger.warning('expected error: %s', e)
except Exception:
    logger.exception('unexpected')
    raise`,
              task: 'Cattura prima le eccezioni specifiche e solo dopo Exception come ultima rete, rilanciandola per non nascondere i bug imprevisti.',
            },
            {
              english: 'Exception Instance',
              italian: "Istanza dell'Eccezione",
              pronunciation: '/\u026Ak\u02C8sep\u0283\u0259n \u02C8\u026Anst\u0259ns/',
              phonetic: 'ik-SEP-scen IN-stans',
              example:
                'except ValueError as e: where "e" is the instance. = except ValueError as e: dove "e" \u00E8 l\'istanza.',
              context: 'control-flow',
              difficulty: 'intermediate',
              code: `try:
    parse(payload)
except ValueError as e:
    logger.error('parse failed: %s', e)`,
              task: `Lega l'istanza dell'eccezione a una variabile con 'as e' per poter loggare il messaggio originale dell'errore.`,
            },
          ],
        },
        {
          id: 'py_custom_exc',
          title: 'Eccezioni Custom / Custom Exceptions',
          description: 'Custom exception, hierarchy...',
          items: [
            {
              english: 'Custom Exception',
              italian: 'Eccezione Personalizzata',
              pronunciation: '/\u02C8k\u028Cst\u0259m \u026Ak\u02C8sep\u0283\u0259n/',
              phonetic: 'CAS-tom ik-SEP-scen',
              example:
                "Create a custom exception for domain-specific errors. = Crea un'eccezione personalizzata per errori specifici del dominio.",
              context: 'oop',
              difficulty: 'intermediate',
              code: `class PaymentDeclined(Exception):
    pass`,
              task: `Definisci un'eccezione personalizzata per un errore di dominio (pagamento rifiutato) ereditando direttamente da Exception.`,
            },
            {
              english: 'Exception Class (Inheritance)',
              italian: 'Classe Eccezione',
              pronunciation: '/\u026Ak\u02C8sep\u0283\u0259n kl\u0251\u02D0s/',
              phonetic: 'ik-SEP-scen CLAS',
              example:
                'Custom exceptions must inherit from the Exception class. = Le eccezioni custom devono ereditare dalla classe Exception.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'class MyError(Exception):',
            },
            {
              english: 'Exception Hierarchy',
              italian: 'Gerarchia delle Eccezioni',
              pronunciation: '/\u026Ak\u02C8sep\u0283\u0259n \u02C8ha\u026A\u0259r\u0251\u02D0rki/',
              phonetic: 'ik-SEP-scen HAI-er-ar-ki',
              example:
                'Python has a built-in exception hierarchy. = Python ha una gerarchia di eccezioni integrata.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'BaseException \u00E8 alla radice, seguita da Exception.',
              code: `class AppError(Exception): pass
class DBError(AppError): pass
class NotFound(DBError): pass`,
              task: 'Costruisci una gerarchia di eccezioni con una classe base di applicazione e sotto-classi più specifiche, così i chiamanti possono catturare al livello che preferiscono.',
            },
            {
              english: 'Raising Custom Exceptions',
              italian: 'Sollevare Eccezioni Custom',
              pronunciation:
                '/\u02C8re\u026Az\u026A\u014B \u02C8k\u028Cst\u0259m \u026Ak\u02C8sep\u0283\u0259nz/',
              phonetic: 'REI-sing CAS-tom ik-SEP-scen-s',
              example:
                "Raising a custom exception with a descriptive message helps callers understand exactly what went wrong and how to recover. = Sollevare un'eccezione custom con un messaggio descrittivo aiuta i chiamanti a capire esattamente cosa è andato storto e come recuperare.",
              context: 'control-flow',
              difficulty: 'intermediate',
              code: `if balance < amount:
    raise InsufficientFunds(f'need {amount}, have {balance}')`,
              task: `Solleva un'eccezione custom con un messaggio descrittivo che mostra i valori reali, in modo che il chiamante capisca esattamente cosa è andato storto.`,
            },
            {
              english: '__str__ (in Exceptions)',
              italian: 'Messaggio di Errore (__str__)',
              pronunciation: '/\u02CC\u028Cnd\u0259r\u02C8sk\u0254\u02D0r str\u026A\u014B/',
              phonetic: 'DAN-der STRING',
              example:
                'Override __str__ to customize the error message. = Sovrascrivi __str__ per personalizzare il messaggio di errore.',
              context: 'oop',
              difficulty: 'advanced',
              code: `class HttpError(Exception):
    def __init__(self, status, url):
        self.status, self.url = status, url
    def __str__(self):
        return f'HTTP {self.status} on {self.url}'`,
              task: `Sovrascrivi __str__ in un'eccezione custom per produrre un messaggio di errore leggibile che combina stato HTTP e URL.`,
            },
            {
              english: 'Specificity',
              italian: 'Specificit\u00E0',
              pronunciation: '/\u02CCspes\u026A\u02C8f\u026As\u0259ti/',
              phonetic: 'spe-si-FI-si-ti',
              example:
                "Always catch the most specific exception first. = Cattura sempre prima l'eccezione pi\u00F9 specifica.",
              context: 'best-practices',
              difficulty: 'intermediate',
              note: 'Se catturi Exception prima di ValueError, il blocco ValueError non verr\u00E0 mai eseguito.',
              code: `try:
    parse(payload)
except ValueError:
    handle_bad_input()
except Exception:
    handle_unknown()`,
              task: `Cattura prima l'eccezione più specifica (ValueError) e solo dopo quella generica, altrimenti il blocco specifico non verrà mai eseguito.`,
            },
            {
              english: 'Grouping Exceptions',
              italian: 'Raggruppare Eccezioni',
              pronunciation: '/\u02C8\u0261ru\u02D0p\u026A\u014B \u026Ak\u02C8sep\u0283\u0259nz/',
              phonetic: 'GRUP-ping ik-SEP-scen-s',
              example:
                'Grouping related exceptions in a single except clause using a tuple keeps your error handling clean and avoids duplicating recovery logic. = Raggruppare eccezioni correlate in una singola clausola except usando una tupla mantiene la gestione degli errori pulita ed evita di duplicare la logica di recupero.',
              context: 'syntax',
              difficulty: 'beginner',
              code: `try:
    load_config()
except (FileNotFoundError, PermissionError, IsADirectoryError):
    config = DEFAULTS`,
              task: 'Raggruppa eccezioni correlate in una sola clausola except usando una tupla, evitando di duplicare la stessa logica di recupero.',
            },
            {
              english: 'Chaining Exceptions',
              italian: 'Concatenazione di Eccezioni',
              pronunciation: '/\u02C8t\u0283e\u026An\u026A\u014B \u026Ak\u02C8sep\u0283\u0259nz/',
              phonetic: 'CEI-ning ik-SEP-scen-s',
              example:
                'Use "raise ... from" to chain exceptions. = Usa "raise ... from" per concatenare le eccezioni.',
              context: 'control-flow',
              difficulty: 'expert',
              code: 'raise NewError from old_error',
            },
            {
              english: 'User-defined Error',
              italian: "Errore definito dall'utente",
              pronunciation: '/\u02C8ju\u02D0z\u0259r d\u026A\u02C8fa\u026And \u02C8er\u0259r/',
              phonetic: 'IUU-ser di-FAIND E-rror',
              example:
                "Creating a hierarchy of user-defined error classes lets different layers of your application catch and handle domain-specific failures precisely. = Creare una gerarchia di classi di errore definite dall'utente permette a diversi livelli dell'applicazione di catturare e gestire errori specifici del dominio con precisione.",
              context: 'development',
              difficulty: 'intermediate',
              code: `class DomainError(Exception): pass
class UserError(DomainError): pass
class OrderError(DomainError): pass`,
              task: `Crea una gerarchia di errori definiti dall'utente per il tuo dominio, così diversi livelli dell'applicazione possono gestirli con precisione.`,
            },
            {
              english: 'Assertions (vs Exceptions)',
              italian: 'Asserzioni vs Eccezioni',
              pronunciation: '/\u0259\u02C8s\u025C\u02D0r\u0283\u0259nz/',
              phonetic: 'as-SER-scions',
              example:
                'Use assertions for internal consistency, not for user errors. = Usa le asserzioni per la coerenza interna, non per errori utente.',
              context: 'best-practices',
              difficulty: 'advanced',
              note: 'Le asserzioni possono essere disabilitate in produzione (-O flag).',
              code: `def average(values):
    assert len(values) > 0, 'internal: empty list not expected here'
    return sum(values) / len(values)`,
              task: `Usa un'asserzione per un invariante interno della funzione, non per validare input utente, sapendo che con il flag -O verrà rimossa.`,
            },
          ],
        },
        {
          id: 'py_logging',
          title: 'Logging e Debug / Logging & Debug',
          description: 'Logging, debug, traceback...',
          items: [
            {
              english: 'Logging (module)',
              italian: 'Modulo logging',
              pronunciation: '/\u02C8l\u0252\u0261\u026A\u014B/',
              phonetic: 'LOG-ghing',
              example:
                'Use the logging module instead of print() for production. = Usa il modulo logging invece di print() per la produzione.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              code: `import logging
logging.basicConfig(level=logging.INFO)
logging.info('app started')`,
              task: 'Configura il modulo logging con basicConfig e registra un messaggio INFO, sostituendo print() per output adatto alla produzione.',
            },
            {
              english: 'Log Level',
              italian: 'Livello di Log',
              pronunciation: '/l\u0252\u0261 \u02C8levl/',
              phonetic: 'LOG LE-vel',
              example:
                'DEBUG, INFO, WARNING, ERROR, CRITICAL are log levels. = DEBUG, INFO, WARNING, ERROR, CRITICAL sono livelli di log.',
              context: 'logging',
              difficulty: 'beginner',
              code: `logger.setLevel(logging.WARNING)
logger.debug('ignored')
logger.warning('shown')`,
              task: `Imposta il livello di log a WARNING in modo che i messaggi DEBUG vengano filtrati e solo gli avvisi e gli errori arrivino all'output.`,
            },
            {
              english: 'Logger',
              italian: 'Registratore (Logger)',
              pronunciation: '/\u02C8l\u0252\u0261\u0259r/',
              phonetic: 'LOG-gher',
              example:
                'Creating a dedicated logger per module with getLogger(__name__) makes filtering messages straightforward. = Creare un logger dedicato per modulo con getLogger(__name__) rende il filtraggio dei messaggi diretto.',
              context: 'logging',
              difficulty: 'intermediate',
              code: 'logger = logging.getLogger(__name__)',
            },
            {
              english: 'Handler (Logging)',
              italian: 'Gestore (Handler)',
              pronunciation: '/\u02C8h\u00E6ndl\u0259r/',
              phonetic: 'HAND-ler',
              example:
                'A handler sends log messages to a destination. = Un handler invia i messaggi di log a una destinazione.',
              context: 'logging',
              difficulty: 'advanced',
              note: 'Es: StreamHandler (console), FileHandler (file).',
              code: `import logging
fh = logging.FileHandler('app.log')
fh.setLevel(logging.ERROR)
logging.getLogger().addHandler(fh)`,
              task: 'Aggiungi un FileHandler al root logger così tutti gli errori vengano scritti su file, senza dover modificare le chiamate di log esistenti.',
            },
            {
              english: 'Formatter (Logging)',
              italian: 'Formattatore (Formatter)',
              pronunciation: '/\u02C8f\u0254\u02D0rm\u00E6t\u0259r/',
              phonetic: 'FOR-mat-ter',
              example:
                'The formatter defines the layout of log messages. = Il formatter definisce il layout dei messaggi di log.',
              context: 'logging',
              difficulty: 'advanced',
              code: `import logging
fmt = logging.Formatter('%(asctime)s [%(levelname)s] %(name)s: %(message)s')
handler.setFormatter(fmt)`,
              task: 'Configura un Formatter che includa timestamp, livello e nome del logger nel messaggio, per rendere i log più leggibili in produzione.',
            },
            {
              english: 'PDB (Python Debugger)',
              italian: 'Debugger di Python (PDB)',
              pronunciation: '/\u02CCpi\u02D0 di\u02D0 \u02C8bi\u02D0/',
              phonetic: 'pii-dii-BII',
              example:
                'Use pdb to step through your code in the terminal. = Usa pdb per scorrere il codice nel terminale.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'import pdb; pdb.set_trace()',
            },
            {
              english: 'Breakpoint',
              italian: 'Punto di Interruzione',
              pronunciation: '/\u02C8bre\u026Akp\u0254\u026Ant/',
              phonetic: 'BREIK-point',
              example:
                'Setting a breakpoint right before the crash lets you inspect all local variables in context. = Impostare un breakpoint subito prima del crash permette di ispezionare tutte le variabili locali nel contesto.',
              context: 'debugging',
              difficulty: 'intermediate',
              note: 'In Python 3.7+ si usa la funzione integrata breakpoint().',
              code: `def process(order):
    total = compute(order)
    breakpoint()
    return total`,
              task: `Inserisci una chiamata a breakpoint() prima del return per fermare l'esecuzione e ispezionare le variabili locali nel debugger.`,
            },
            {
              english: 'Assert Statement',
              italian: 'Istruzione Assert',
              pronunciation: '/\u0259\u02C8s\u025C\u02D0rt/',
              phonetic: 'as-SERT',
              example:
                'Use assert statements during development to catch logic errors early, but remember they are stripped out when running Python with the -O flag. = Usa le istruzioni assert durante lo sviluppo per individuare errori logici precocemente, ma ricorda che vengono rimosse quando si esegue Python con il flag -O.',
              context: 'debugging',
              difficulty: 'intermediate',
              note: 'Solleva un AssertionError se la condizione \u00E8 falsa.',
              code: `def divide(a, b):
    assert b != 0, 'divisor must be non-zero'
    return a / b`,
              task: `Aggiungi un'istruzione assert per individuare precocemente errori logici durante lo sviluppo, ricordando che viene rimossa con il flag -O.`,
            },
            {
              english: 'Traceback (module)',
              italian: 'Modulo traceback',
              pronunciation: '/\u02C8tre\u026Asb\u00E6k/',
              phonetic: 'TREIS-bak',
              example:
                'The traceback module allows formatting and printing stack traces. = Il modulo traceback permette di formattare e stampare gli stack trace.',
              context: 'ecosystem',
              difficulty: 'advanced',
              code: `import traceback
try:
    risky()
except Exception:
    logger.error('failure:\\n%s', traceback.format_exc())`,
              task: 'Cattura il traceback completo come stringa con traceback.format_exc() e inviarlo al logger, invece di lasciarlo stampare a stderr.',
            },
            {
              english: 'Stack Trace',
              italian: 'Traccia dello Stack',
              pronunciation: '/st\u00E6k tre\u026As/',
              phonetic: 'STAK TREIS',
              example:
                "Review the stack trace to find the root cause of the error. = Rivedi lo stack trace per trovare la causa radice dell'errore.",
              context: 'debugging',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'py_context',
          title: 'Context Manager',
          description: 'with, __enter__, __exit__...',
          items: [
            {
              english: 'Context Manager',
              italian: 'Gestore di Contesto',
              pronunciation: '/\u02C8k\u0252ntekst \u02C8m\u00E6n\u026Ad\u0292\u0259r/',
              phonetic: 'CON-tekst MAN-ig-ger',
              example:
                'A context manager manages the setup and cleanup of resources. = Un context manager gestisce la preparazione e la pulizia delle risorse.',
              context: 'foundations',
              difficulty: 'intermediate',
              code: `with open('data.csv') as f:
    rows = list(csv.reader(f))`,
              task: `Apri un file dentro un context manager con 'with' così la chiusura della risorsa avviene automaticamente anche in caso di errore.`,
            },
            {
              english: 'With Statement',
              italian: 'Istruzione "with"',
              pronunciation: '/w\u026A\u00F0 \u02C8ste\u026Atm\u0259nt/',
              phonetic: 'WITH STEIT-ment',
              example:
                'The "with" statement simplifies exception handling. = L\'istruzione "with" semplifica la gestione delle eccezioni.',
              context: 'syntax',
              difficulty: 'beginner',
              code: `with open('out.txt', 'w') as f:
    f.write('hello')`,
              task: `Scrivi su un file usando un'istruzione with, lasciando che il blocco gestisca apertura, eccezioni e chiusura della risorsa.`,
            },
            {
              english: '__enter__ (Method)',
              italian: 'Metodo __enter__',
              pronunciation: '/\u02CC\u028Cnd\u0259r\u02C8sk\u0254\u02D0r \u02C8ent\u0259r/',
              phonetic: 'DAN-der EN-ter',
              example:
                "The __enter__ method is called at the start of the with block. = Il metodo __enter__ viene chiamato all'inizio del blocco with.",
              context: 'oop',
              difficulty: 'advanced',
              note: "Restituisce l'oggetto risorsa da usare (opzionale).",
              code: `class Timer:
    def __enter__(self):
        self.start = time.time()
        return self
    def __exit__(self, *exc):
        self.elapsed = time.time() - self.start`,
              task: `Implementa il metodo __enter__ di un context manager che cronometra un blocco di codice, restituendo self per essere usato dopo 'as'.`,
            },
            {
              english: '__exit__ (Method)',
              italian: 'Metodo __exit__',
              pronunciation: '/\u02CC\u028Cnd\u0259r\u02C8sk\u0254\u02D0r \u02C8eks\u026At/',
              phonetic: 'DAN-der EK-sit',
              example:
                'The __exit__ method handles cleanup and exceptions. = Il metodo __exit__ gestisce la pulizia e le eccezioni.',
              context: 'oop',
              difficulty: 'advanced',
              note: 'Viene chiamato sempre, anche se avviene un errore nel blocco.',
              code: `class Transaction:
    def __enter__(self): return self
    def __exit__(self, exc_type, exc, tb):
        if exc_type: self.rollback()
        else: self.commit()`,
              task: `Implementa __exit__ in modo che esegua commit in uscita normale e rollback se è stata sollevata un'eccezione, ricevuta tramite exc_type.`,
            },
            {
              english: 'Contextlib (module)',
              italian: 'Modulo contextlib',
              pronunciation: '/\u02C8k\u0252ntekst l\u026Ab/',
              phonetic: 'CON-tekst LIB',
              example:
                'Contextlib provides utilities for creating context managers. = Contextlib fornisce utilit\u00E0 per creare gestori di contesto.',
              context: 'ecosystem',
              difficulty: 'advanced',
              code: `from contextlib import suppress
with suppress(FileNotFoundError):
    os.remove('tmp.log')`,
              task: `Usa contextlib.suppress per ignorare un'eccezione specifica durante una cancellazione opportunistica, senza un try/except vuoto esplicito.`,
            },
            {
              english: '@contextmanager (Decorator)',
              italian: 'Decoratore contextmanager',
              pronunciation: '/\u02C8k\u0252ntekst \u02C8m\u00E6n\u026Ad\u0292\u0259r/',
              phonetic: 'CON-tekst MAN-ig-ger',
              example:
                'Use @contextmanager to create a manager from a generator function. = Usa @contextmanager per creare un gestore da una funzione generatore.',
              context: 'functions',
              difficulty: 'advanced',
              code: '@contextlib.contextmanager\ndef my_manager():',
            },
            {
              english: 'Resource Management',
              italian: 'Gestione delle Risorse',
              pronunciation: '/r\u026A\u02C8z\u0254\u02D0rs \u02C8m\u00E6n\u026Ad\u0292m\u0259nt/',
              phonetic: 're-SORS MAN-ig-ment',
              example:
                'Context managers are the best way for resource management. = I context manager sono il modo migliore per la gestione delle risorse.',
              context: 'best-practices',
              difficulty: 'intermediate',
            },
            {
              english: 'Automatic Cleanup',
              italian: 'Pulizia Automatica',
              pronunciation:
                '/\u02CC\u0254\u02D0t\u0259\u02C8m\u00E6t\u026Ak \u02C8kli\u02D0n\u028Cp/',
              phonetic: 'o-to-MA-tic CLIIN-ap',
              example:
                'The main benefit of "with" is automatic cleanup. = Il beneficio principale di "with" \u00E8 la pulizia automatica.',
              context: 'foundations',
              difficulty: 'intermediate',
            },
            {
              english: 'Nested Context Managers',
              italian: 'Gestori di Contesto Annidati',
              pronunciation:
                '/\u02C8nest\u026Ad \u02C8k\u0252ntekst \u02C8m\u00E6n\u026Ad\u0292\u0259rz/',
              phonetic: 'NES-ted CON-tekst MAN-ig-gers',
              example: `Open source and destination files with nested context managers using one with statement: with open(src) as a, open(dst, 'w') as b. = Apri file sorgente e destinazione con gestori di contesto annidati usando un solo with: with open(src) as a, open(dst, 'w') as b.`,
              context: 'syntax',
              difficulty: 'intermediate',
              code: 'with open("a.txt") as a, open("b.txt") as b:',
            },
            {
              english: 'Contextlib.closing',
              italian: 'Wrapper per Chiusura',
              pronunciation: '/\u02C8klo\u028Az\u026A\u014B/',
              phonetic: 'CLOU-sing',
              example:
                'Use closing() for objects that have a close() method but no context manager support. = Usa closing() per oggetti che hanno close() ma non supportano i context manager.',
              context: 'advanced',
              difficulty: 'expert',
              code: `from contextlib import closing
from urllib.request import urlopen
with closing(urlopen('http://example.com')) as page:
    body = page.read()`,
              task: 'Avvolgi un oggetto che ha solo close() ma non supporta nativamente il protocollo with usando contextlib.closing, per ottenere chiusura automatica.',
            },
          ],
        },
      ],
    },
    8: {
      name: 'Programmazione Avanzata / Advanced Programming',
      description: 'Decoratori, metaclassi e pattern avanzati',
      lessons: [
        {
          id: 'py_decorators',
          title: 'Decoratori / Decorators',
          description: 'Decorator, functools, wraps...',
          items: [
            {
              english: 'Decorator Factory',
              italian: 'Fabbrica di Decoratori',
              pronunciation: '/\u02C8dek\u0259re\u026At\u0259r/',
              phonetic: 'DE-co-reiter',
              example: `A decorator factory like @retry(times=3) is a function that returns the actual decorator, allowing per-use configuration. = Una fabbrica di decoratori come @retry(times=3) e' una funzione che restituisce il decoratore vero e proprio, permettendo configurazione per utilizzo.`,
              context: 'functions',
              difficulty: 'intermediate',
              note: 'Tre livelli di funzioni annidate: factory, decorator, wrapper.',
              code: `def retry(times):
    def decorator(f):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                try:
                    return f(*args, **kwargs)
                except Exception:
                    pass
        return wrapper
    return decorator`,
              task: 'Definisci una fabbrica di decoratori @retry(times=3) che riprova fino a tre volte una funzione che solleva eccezioni.',
            },
            {
              english: 'Wrapper Function',
              italian: 'Funzione Involucro (Wrapper)',
              pronunciation: '/\u02C8r\u00E6p\u0259r \u02C8f\u028C\u014Bk\u0283\u0259n/',
              phonetic: 'RAP-per FANK-scen',
              example:
                'The wrapper function is where the logic is added. = La funzione wrapper \u00E8 dove viene aggiunta la logica.',
              context: 'functions',
              difficulty: 'intermediate',
              code: `def timing(f):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = f(*args, **kwargs)
        print(time.time() - start)
        return result
    return wrapper`,
              task: 'Scrivi una funzione wrapper interna a un decoratore che misura e stampa il tempo di esecuzione della funzione originale.',
            },
            {
              english: '@wraps Usage',
              italian: 'Uso di @wraps',
              pronunciation: '/r\u00E6ps/',
              phonetic: 'RAPS',
              example: `Inside a decorator, applying @wraps(func) to the wrapper copies the original name, docstring and signature so introspection still works. = Dentro un decoratore, applicare @wraps(func) al wrapper copia il nome, la docstring e la firma originali cosi' l'introspezione continua a funzionare.`,
              context: 'advanced',
              difficulty: 'advanced',
              note: 'Senza @wraps, help(funzione_decorata) mostrerebbe i metadati del wrapper invece di quelli originali.',
              code: `from functools import wraps
def log_call(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        print(f'Calling {f.__name__}')
        return f(*args, **kwargs)
    return wrapper`,
              task: 'Applica @wraps(f) al wrapper interno del decoratore per preservare nome, docstring e firma della funzione originale.',
            },
            {
              english: 'Decorator with Arguments',
              italian: 'Decoratore con Argomenti',
              pronunciation:
                '/\u02C8dek\u0259re\u026At\u0259r w\u026A\u00F0 \u02C8\u0251\u02D0r\u0261jum\u0259nts/',
              phonetic: 'DE-co-reiter with AR-ghiu-ments',
              example:
                'A decorator can accept its own configuration parameters. = Un decoratore pu\u00F2 accettare i propri parametri di configurazione.',
              context: 'advanced',
              difficulty: 'advanced',
              code: '@repeat(3)\ndef my_func():',
            },
            {
              english: 'Class Decorator',
              italian: 'Decoratore di Classe',
              pronunciation: '/kl\u0251\u02D0s \u02C8dek\u0259re\u026At\u0259r/',
              phonetic: 'CLAS DE-co-reiter',
              example: `Adding @dataclass above a class is a class decorator that auto-generates __init__, __repr__ and __eq__ for you. = Aggiungere @dataclass sopra una classe e' un decoratore di classe che genera automaticamente __init__, __repr__ e __eq__ per te.`,
              context: 'advanced',
              difficulty: 'advanced',
              code: `from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int`,
              task: 'Applica il decoratore di classe @dataclass alla classe User per generare automaticamente __init__, __repr__ ed __eq__.',
            },
            {
              english: 'Method Decorator',
              italian: 'Decoratore di Metodo',
              pronunciation: '/\u02C8me\u03B8\u0259d \u02C8dek\u0259re\u026At\u0259r/',
              phonetic: 'ME-thod DE-co-reiter',
              example:
                '@property is a built-in method decorator. = @property \u00E8 un decoratore di metodo integrato.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `class Circle:
    def __init__(self, r):
        self._r = r
    @property
    def area(self):
        return 3.14 * self._r ** 2`,
              task: 'Usa il decoratore di metodo @property per esporre area come attributo calcolato di sola lettura della classe Circle.',
            },
            {
              english: 'Chaining Decorators',
              italian: 'Concatenazione Decoratori',
              pronunciation: '/\u02C8t\u0283e\u026An\u026A\u014B \u02C8dek\u0259re\u026At\u0259rz/',
              phonetic: 'CEI-ning DE-co-reiters',
              example:
                'You can apply multiple decorators to one function. = Puoi applicare pi\u00F9 decoratori a una singola funzione.',
              context: 'advanced',
              difficulty: 'advanced',
              code: `@log_call
@cache
def fibonacci(n):
    return n if n < 2 else fibonacci(n-1) + fibonacci(n-2)`,
              task: `Concatena due decoratori @log_call e @cache sulla funzione fibonacci, ricordando che si applicano dal basso verso l'alto.`,
            },
            {
              english: 'Stateful Decorator',
              italian: 'Decoratore con Stato',
              pronunciation: '/\u02C8ste\u026Atf\u028Al \u02C8dek\u0259re\u026At\u0259r/',
              phonetic: 'STEIT-ful DE-co-reiter',
              example:
                'A stateful decorator can track how many times a function is called. = Un decoratore con stato pu\u00F2 tracciare quante volte viene chiamata una funzione.',
              context: 'advanced',
              difficulty: 'expert',
              code: `def counter(f):
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return f(*args, **kwargs)
    wrapper.calls = 0
    return wrapper`,
              task: `Costruisci un decoratore con stato che mantiene un contatore wrapper.calls per registrare quante volte la funzione e' stata chiamata.`,
            },
            {
              english: 'Monkey Patching',
              italian: 'Modifica Dinamica (Monkey Patching)',
              pronunciation: '/\u02C8m\u028C\u014Bki \u02C8p\u00E6t\u0283\u026A\u014B/',
              phonetic: 'MAN-ki PAC-cing',
              example:
                'Tests sometimes replace requests.get with a fake using monkey patching to avoid hitting the network during the suite. = I test a volte sostituiscono requests.get con un finto usando il monkey patching per evitare chiamate di rete durante la suite.',
              context: 'advanced',
              difficulty: 'expert',
              note: 'Pratica potente ma pericolosa: modifica il codice di altri moduli "al volo".',
              code: `import requests
def fake_get(url):
    return {'status': 200}
requests.get = fake_get`,
              task: 'Esegui un monkey patching su requests.get sostituendolo con fake_get per evitare chiamate di rete reali durante i test.',
            },
            {
              english: 'Boilerplate (reduction)',
              italian: 'Riduzione Codice Ripetitivo',
              pronunciation: '/\u02C8b\u0254\u026Al\u0259rple\u026At/',
              phonetic: 'BOI-ler-pleit',
              example:
                'Decorators are great for reducing boilerplate code. = I decoratori sono ottimi per ridurre il codice ripetitivo.',
              context: 'best-practices',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'py_metaclass',
          title: 'Metaclassi / Metaclasses',
          description: 'Metaclass, __new__, ABC...',
          items: [
            {
              english: 'Metaclass',
              italian: 'Metaclasse',
              pronunciation: '/\u02C8met\u0259kl\u0251\u02D0s/',
              phonetic: 'ME-ta-clas',
              example:
                'A metaclass is a class that creates other classes. = Una metaclasse \u00E8 una classe che crea altre classi.',
              context: 'metaprogramming',
              difficulty: 'expert',
              note: 'In Python, le classi sono esse stesse oggetti, creati dalle metaclassi.',
              code: `class Meta(type):
    def __new__(mcs, name, bases, namespace):
        print(f'Creating {name}')
        return super().__new__(mcs, name, bases, namespace)

class MyClass(metaclass=Meta):
    pass`,
              task: 'Definisci una metaclasse Meta che stampa un messaggio quando viene creata una nuova classe che la usa come metaclass.',
            },
            {
              english: 'Type (as Metaclass)',
              italian: 'Tipo (Type)',
              pronunciation: '/ta\u026Ap/',
              phonetic: 'TAIP',
              example:
                'By default, all classes are instances of "type". = Di default, tutte le classi sono istanze di "type".',
              context: 'metaprogramming',
              difficulty: 'expert',
              note: '"type" \u00E8 la metaclasse predefinita di Python.',
              code: `Dog = type('Dog', (object,), {'bark': lambda self: 'Woof'})
print(type(Dog))`,
              task: 'Usa type() come metaclasse per costruire dinamicamente la classe Dog con un metodo bark, senza una definizione class esplicita.',
            },
            {
              english: '__new__ (Method)',
              italian: 'Metodo __new__',
              pronunciation: '/\u02CC\u028Cnd\u0259r\u02C8sk\u0254\u02D0r nju\u02D0/',
              phonetic: 'DAN-der NIU',
              example:
                "__new__ is called to create the object instance. = __new__ viene chiamato per creare l'istanza dell'oggetto.",
              context: 'oop',
              difficulty: 'expert',
              note: "A differenza di __init__, __new__ \u00E8 il vero costruttore che restituisce l'oggetto.",
              code: `class Point:
    def __new__(cls, x, y):
        instance = super().__new__(cls)
        instance.x, instance.y = x, y
        return instance`,
              task: `Sovrascrivi il metodo __new__ in Point per creare e configurare l'istanza prima che __init__ venga eseguito.`,
            },
            {
              english: 'Metaprogramming',
              italian: 'Metaprogrammazione',
              pronunciation: '/\u02CCmet\u0259\u02C8pro\u028A\u0261r\u00E6m\u026A\u014B/',
              phonetic: 'ME-ta-pro-gram-ming',
              example:
                'Frameworks like Django use metaprogramming to turn class definitions into database tables automatically. = Framework come Django usano la metaprogrammazione per trasformare le definizioni di classe in tabelle di database automaticamente.',
              context: 'architecture',
              difficulty: 'expert',
            },
            {
              english: 'Class Factory',
              italian: 'Fabbrica di Classi',
              pronunciation: '/kl\u0251\u02D0s \u02C8f\u00E6kt\u0259ri/',
              phonetic: 'CLAS FAC-to-ri',
              example:
                'Use a class factory function like make_enum(name, values) to build a new class dynamically at runtime instead of writing it by hand. = Usa una funzione fabbrica di classi come make_enum(name, values) per costruire una nuova classe dinamicamente a runtime invece di scriverla a mano.',
              context: 'patterns',
              difficulty: 'expert',
              code: `def make_enum(name, values):
    return type(name, (object,), {v: i for i, v in enumerate(values)})

Color = make_enum('Color', ['RED', 'GREEN', 'BLUE'])`,
              task: 'Implementa una fabbrica di classi make_enum(name, values) che costruisce a runtime una classe con un attributo numerico per ogni valore.',
            },
            {
              english: 'Introspection',
              italian: 'Introspezione',
              pronunciation: '/\u02CC\u026Antr\u0259\u02C8spek\u0283\u0259n/',
              phonetic: 'in-tro-SPEC-scion',
              example:
                "Python supports deep introspection of objects and classes. = Python supporta un'introspezione profonda di oggetti e classi.",
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Capacit\u00E0 di un programma di esaminare il proprio stato o struttura (es. getattr, hasattr).',
              code: `class User:
    name = 'Mario'

print(hasattr(User, 'name'))
print(getattr(User, 'name'))
print(dir(User))`,
              task: 'Utilizza hasattr, getattr e dir() per ispezionare gli attributi della classe User tramite introspezione a runtime.',
            },
            {
              english: 'Singleton Pattern (via Metaclass)',
              italian: 'Pattern Singleton',
              pronunciation: '/\u02C8s\u026A\u014B\u026Alt\u0259n \u02C8p\u00E6t\u0259rn/',
              phonetic: 'SIN-gel-ton PAT-tern',
              example:
                'You can implement a Singleton using a custom metaclass. = Puoi implementare un Singleton usando una metaclasse personalizzata.',
              context: 'patterns',
              difficulty: 'expert',
              note: 'Garantisce che una classe abbia una sola istanza in tutto il programma.',
              code: `class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]`,
              task: `Implementa il pattern Singleton tramite una metaclasse che cachea l'istanza nel dizionario _instances al primo __call__.`,
            },
            {
              english: 'Registration Pattern',
              italian: 'Pattern di Registrazione',
              pronunciation:
                '/\u02CCred\u0292\u026A\u02C8stre\u026A\u0283\u0259n \u02C8p\u00E6t\u0259rn/',
              phonetic: 're-gi-STREI-scion PAT-tern',
              example:
                'Metaclasses are often used for automatic plugin registration. = Le metaclassi sono spesso usate per la registrazione automatica dei plugin.',
              context: 'patterns',
              difficulty: 'expert',
              code: `class PluginRegistry(type):
    plugins = []
    def __init__(cls, name, bases, namespace):
        super().__init__(name, bases, namespace)
        PluginRegistry.plugins.append(cls)`,
              task: 'Crea una metaclasse PluginRegistry che registra automaticamente ogni classe figlia nella lista condivisa plugins.',
            },
            {
              english: 'Attribute Validation (Class level)',
              italian: 'Validazione Attributi (Livello Classe)',
              pronunciation:
                '/\u02C8\u00E6tr\u026Abju\u02D0t \u02CCv\u00E6l\u026A\u02C8de\u026A\u0283\u0259n/',
              phonetic: 'A-tri-biut va-li-DEI-scion',
              example:
                'Metaclasses can validate class attributes at creation time. = Le metaclassi possono validare gli attributi della classe al momento della creazione.',
              context: 'metaprogramming',
              difficulty: 'expert',
              code: `class Validated(type):
    def __new__(mcs, name, bases, namespace):
        if 'id' not in namespace:
            raise TypeError(f'{name} must define id')
        return super().__new__(mcs, name, bases, namespace)`,
              task: 'Scrivi una metaclasse Validated che solleva TypeError se la classe creata non definisce un attributo id.',
            },
            {
              english: 'Custom Type',
              italian: 'Tipo Personalizzato',
              pronunciation: '/\u02C8k\u028Cst\u0259m ta\u026Ap/',
              phonetic: 'CAS-tom TAIP',
              example:
                'Define a custom type by inheriting from "type". = Definisci un tipo personalizzato ereditando da "type".',
              context: 'metaprogramming',
              difficulty: 'expert',
              code: `class StrictType(type):
    def __setattr__(cls, key, value):
        raise AttributeError('Immutable class')

class Config(metaclass=StrictType):
    HOST = 'localhost'`,
              task: 'Definisci un tipo personalizzato StrictType ereditando da type per impedire la modifica degli attributi della classe Config.',
            },
          ],
        },
        {
          id: 'py_typing',
          title: 'Type Hints',
          description: 'Type hints, mypy, Protocol...',
          items: [
            {
              english: 'Type Hints',
              italian: 'Suggerimenti di Tipo',
              pronunciation: '/ta\u026Ap h\u026Ants/',
              phonetic: 'TAIP HINTS',
              example:
                'Adding type hints like def greet(name: str) -> str helps editors offer autocompletion and lets mypy catch bugs before runtime. = Aggiungere suggerimenti di tipo come def greet(name: str) -> str aiuta gli editor a offrire autocompletamento e permette a mypy di intercettare bug prima del runtime.',
              context: 'foundations',
              difficulty: 'intermediate',
              code: 'def greet(name: str) -> str:',
              note: "Python rimane a tipizzazione dinamica; i hints sono ignorati dall'interprete ma usati da editor e checker.",
            },
            {
              english: 'Typing (module)',
              italian: 'Modulo typing',
              pronunciation: '/\u02C8ta\u026Ap\u026A\u014B/',
              phonetic: 'TAI-ping',
              example:
                'The typing module provides complex type definitions. = Il modulo typing fornisce definizioni di tipi complessi.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              code: `from typing import List, Dict

def users_by_id(users: List[Dict[str, int]]) -> Dict[int, str]:
    return {u['id']: u['name'] for u in users}`,
              task: 'Importa List e Dict dal modulo typing e annota la funzione users_by_id con tipi composti complessi.',
            },
            {
              english: 'Mypy',
              italian: 'Verificatore Statico (Mypy)',
              pronunciation: '/\u02C8ma\u026Apa\u026A/',
              phonetic: 'MAI-pai',
              example:
                "Run mypy to find type errors before execution. = Esegui mypy per trovare errori di tipo prima dell'esecuzione.",
              context: 'tools',
              difficulty: 'intermediate',
              code: `def add(a: int, b: int) -> int:
    return a + b

result: str = add(1, 2)`,
              task: `Esegui mypy script.py per scoprire l'errore di tipo sull'assegnazione di un int a una variabile annotata come str.`,
            },
            {
              english: 'Optional Type',
              italian: 'Tipo Opzionale',
              pronunciation: '/\u02C8\u0252p\u0283\u0259nl ta\u026Ap/',
              phonetic: 'OP-scio-nal TAIP',
              example:
                'Optional[int] means the value can be an int or None. = Optional[int] significa che il valore pu\u00F2 essere int o None.',
              context: 'typing',
              difficulty: 'intermediate',
              code: `from typing import Optional

def find_user(uid: int) -> Optional[str]:
    return None`,
              task: `Annota il tipo di ritorno di find_user con Optional[str] per indicare che la funzione puo' restituire una stringa o None.`,
            },
            {
              english: 'Union Type',
              italian: 'Tipo Unione',
              pronunciation: '/\u02C8ju\u02D0nj\u0259n ta\u026Ap/',
              phonetic: 'IUU-nion TAIP',
              example:
                'Union[int, str] accepts either an integer or a string. = Union[int, str] accetta sia un intero che una stringa.',
              context: 'typing',
              difficulty: 'intermediate',
              note: "In Python 3.10+ si pu\u00F2 usare l'operatore pipe: int | str.",
              code: `from typing import Union

def stringify(x: Union[int, str]) -> str:
    return str(x)`,
              task: 'Usa il tipo unione Union[int, str] per dichiarare che il parametro x della funzione stringify accetta interi o stringhe.',
            },
            {
              english: 'Any Type',
              italian: 'Tipo Qualsiasi (Any)',
              pronunciation: '/\u02C8eni ta\u026Ap/',
              phonetic: 'E-ni TAIP',
              example:
                'Any disables type checking for a specific variable. = Any disabilita il controllo di tipo per una variabile specifica.',
              context: 'typing',
              difficulty: 'intermediate',
              code: `from typing import Any

def dump(value: Any) -> None:
    print(value)`,
              task: 'Annota il parametro value della funzione dump con il tipo Any per disabilitare il controllo statico su quel valore.',
            },
            {
              english: 'Generic Type',
              italian: 'Tipo Generico',
              pronunciation: '/d\u0292\u0259\u02C8ner\u026Ak ta\u026Ap/',
              phonetic: 'ge-NE-ric TAIP',
              example:
                'Generics allow classes to work with any type. = I generic permettono alle classi di lavorare con qualsiasi tipo.',
              context: 'typing',
              difficulty: 'advanced',
              code: 'List[T]',
            },
            {
              english: 'Protocol',
              italian: 'Protocollo (Protocol)',
              pronunciation: '/\u02C8pro\u028At\u0259k\u0252l/',
              phonetic: 'PROU-to-col',
              example: `Declaring a Protocol with a read() method lets any class with that method satisfy the type, without explicit inheritance (structural typing). = Dichiarare un Protocol con un metodo read() permette a qualsiasi classe con quel metodo di soddisfare il tipo, senza ereditarieta' esplicita (tipizzazione strutturale).`,
              context: 'typing',
              difficulty: 'expert',
              note: 'Introdotto in Python 3.8; permette di definire interfacce senza ereditariet\u00E0 esplicita.',
              code: `from typing import Protocol

class Readable(Protocol):
    def read(self) -> str: ...

def ingest(src: Readable) -> str:
    return src.read()`,
              task: 'Definisci un Protocol Readable con un metodo read() e usalo come annotazione per accettare qualsiasi classe con quel metodo.',
            },
            {
              english: 'Type Alias',
              italian: 'Alias di Tipo',
              pronunciation: '/ta\u026Ap \u02C8e\u026Ali\u0259s/',
              phonetic: 'TAIP EI-lias',
              example:
                'Use Type Alias to simplify complex type definitions. = Usa i Type Alias per semplificare definizioni di tipo complesse.',
              context: 'typing',
              difficulty: 'intermediate',
              code: 'UserID = int',
            },
            {
              english: 'Callable',
              italian: 'Tipo Chiamabile (Callable)',
              pronunciation: '/\u02C8k\u0254\u02D0l\u0259bl/',
              phonetic: 'COL-la-bol',
              example: `Annotate a callback parameter with Callable[[int, int], int] so type checkers verify the function takes two ints and returns one. = Annota un parametro di callback con Callable[[int, int], int] cosi' i type checker verificano che la funzione prenda due int e ne restituisca uno.`,
              context: 'typing',
              difficulty: 'advanced',
              code: `from typing import Callable

def apply(op: Callable[[int, int], int], a: int, b: int) -> int:
    return op(a, b)`,
              task: 'Annota il parametro op con Callable[[int, int], int] per richiedere una funzione che riceve due int e ne restituisce uno.',
            },
          ],
        },
        {
          id: 'py_patterns',
          title: 'Design Patterns in Python',
          description: 'Singleton, factory, dataclass...',
          items: [
            {
              english: 'Design Pattern',
              italian: 'Schema Progettuale (Pattern)',
              pronunciation: '/d\u026A\u02C8za\u026An \u02C8p\u00E6t\u0259rn/',
              phonetic: 'di-ZAIN PAT-tern',
              example: `A reusable design pattern like Strategy or Observer captures a proven solution so teams do not reinvent it for every project. = Uno schema progettuale riutilizzabile come Strategy o Observer cattura una soluzione provata cosi' i team non la reinventano ad ogni progetto.`,
              context: 'architecture',
              difficulty: 'intermediate',
            },
            {
              english: 'Singleton',
              italian: 'Istanza Unica (Singleton)',
              pronunciation: '/\u02C8s\u026A\u014B\u026Alt\u0259n/',
              phonetic: 'SIN-gel-ton',
              example:
                'The Singleton pattern ensures only one instance of a class exists. = Il pattern Singleton garantisce che esista una sola istanza di una classe.',
              context: 'patterns',
              difficulty: 'advanced',
              code: `class Logger:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance`,
              task: 'Implementa il pattern Singleton nella classe Logger sovrascrivendo __new__ per garantire una sola istanza condivisa.',
            },
            {
              english: 'Factory Pattern',
              italian: 'Pattern Fabbrica (Factory)',
              pronunciation: '/\u02C8f\u00E6kt\u0259ri \u02C8p\u00E6t\u0259rn/',
              phonetic: 'FAC-to-ri PAT-tern',
              example:
                'The factory pattern creates objects without specifying the exact class. = Il pattern factory crea oggetti senza specificare la classe esatta.',
              context: 'patterns',
              difficulty: 'advanced',
              code: `def shape_factory(kind):
    if kind == 'circle':
        return Circle()
    if kind == 'square':
        return Square()
    raise ValueError(kind)`,
              task: `Implementa una funzione shape_factory che restituisce l'istanza giusta di Circle o Square senza esporre le classi al chiamante.`,
            },
            {
              english: 'Strategy Pattern',
              italian: 'Pattern Strategia (Strategy)',
              pronunciation: '/\u02C8str\u00E6t\u0259d\u0292i \u02C8p\u00E6t\u0259rn/',
              phonetic: 'STRA-te-gi PAT-tern',
              example:
                'The strategy pattern allows switching algorithms at runtime. = Il pattern strategy permette di cambiare algoritmi a tempo di esecuzione.',
              context: 'patterns',
              difficulty: 'advanced',
              note: 'In Python, spesso si implementa semplicemente passando una funzione come argomento.',
              code: `def sort_with(strategy, data):
    return strategy(data)

sort_with(sorted, [3, 1, 2])
sort_with(lambda d: list(reversed(sorted(d))), [3, 1, 2])`,
              task: `Realizza il pattern Strategy passando la funzione di ordinamento come parametro strategy per scegliere l'algoritmo a runtime.`,
            },
            {
              english: 'Observer Pattern',
              italian: 'Pattern Osservatore (Observer)',
              pronunciation: '/\u0259b\u02C8z\u025C\u02D0rv\u0259r \u02C8p\u00E6t\u0259rn/',
              phonetic: 'ob-SER-ver PAT-tern',
              example:
                'The observer pattern is used for event handling. = Il pattern observer \u00E8 usato per la gestione degli eventi.',
              context: 'patterns',
              difficulty: 'advanced',
              code: `class Event:
    def __init__(self):
        self.subs = []
    def subscribe(self, fn):
        self.subs.append(fn)
    def fire(self, data):
        for fn in self.subs:
            fn(data)`,
              task: 'Implementa la classe Event del pattern Observer con un metodo subscribe(fn) e un fire(data) che notifica tutti gli osservatori.',
            },
            {
              english: 'Dataclass (module)',
              italian: 'Classi Dati (Dataclass)',
              pronunciation: '/\u02C8de\u026At\u0259kl\u0251\u02D0s/',
              phonetic: 'DEI-ta-clas',
              example:
                'Use @dataclass to automatically generate __init__ and __repr__. = Usa @dataclass per generare automaticamente __init__ e __repr__.',
              context: 'foundations',
              difficulty: 'intermediate',
              code: '@dataclass\nclass User:',
              note: 'Introdotte in Python 3.7 per semplificare classi che contengono principalmente dati.',
            },
            {
              english: 'Dependency Injection',
              italian: 'Iniezione delle Dipendenze',
              pronunciation: '/d\u026A\u02C8pend\u0259nsi \u026An\u02C8d\u0292ek\u0283\u0259n/',
              phonetic: 'de-PEN-den-si in-GEK-scion',
              example:
                'Passing dependencies as constructor parameters instead of hardcoding them lets you swap in mock objects during testing. = Passare le dipendenze come parametri del costruttore invece di codificarle direttamente permette di sostituirle con oggetti mock durante i test.',
              context: 'architecture',
              difficulty: 'expert',
              code: `class UserService:
    def __init__(self, repo):
        self.repo = repo
    def get(self, uid):
        return self.repo.find(uid)

service = UserService(repo=FakeRepo())`,
              task: `Applica l'iniezione delle dipendenze passando il repo al costruttore di UserService cosi' da poter usare un FakeRepo nei test.`,
            },
            {
              english: 'Adapter Pattern',
              italian: 'Pattern Adattatore (Adapter)',
              pronunciation: '/\u0259\u02C8d\u00E6pt\u0259r \u02C8p\u00E6t\u0259rn/',
              phonetic: 'a-DAP-ter PAT-tern',
              example:
                'The adapter pattern makes incompatible interfaces work together. = Il pattern adapter fa lavorare insieme interfacce incompatibili.',
              context: 'patterns',
              difficulty: 'advanced',
              code: `class XmlClient:
    def fetch_xml(self):
        return '<x/>'

class JsonAdapter:
    def __init__(self, xml_client):
        self.client = xml_client
    def fetch_json(self):
        return xml_to_json(self.client.fetch_xml())`,
              task: `Crea un adattatore JsonAdapter che incapsula XmlClient ed espone fetch_json convertendo internamente l'output XML in JSON.`,
            },
            {
              english: 'Proxy Pattern',
              italian: 'Pattern Intermediario (Proxy)',
              pronunciation: '/\u02C8pr\u0252ksi \u02C8p\u00E6t\u0259rn/',
              phonetic: 'PROC-si PAT-tern',
              example:
                "A proxy controls access to another object. = Un proxy controlla l'accesso a un altro oggetto.",
              context: 'patterns',
              difficulty: 'advanced',
              code: `class ImageProxy:
    def __init__(self, path):
        self.path = path
        self._real = None
    def display(self):
        if self._real is None:
            self._real = HeavyImage(self.path)
        self._real.display()`,
              task: 'Implementa un Proxy ImageProxy che istanzia HeavyImage in modo pigro solo alla prima chiamata di display().',
            },
            {
              english: 'Composition over Inheritance',
              italian: 'Composizione vs Ereditariet\u00E0',
              pronunciation:
                '/\u02CCk\u0252mp\u0259\u02C8z\u026A\u0283\u0259n \u02C8o\u028Av\u0259r \u026An\u02C8her\u026At\u0259ns/',
              phonetic: 'com-po-SI-scion ou-ver in-HE-ri-tans',
              example:
                "Preferring composition over inheritance makes your code more modular because you can mix and match behaviors without rigid class hierarchies. = Preferire la composizione rispetto all'ereditariet\u00E0 rende il codice pi\u00F9 modulare perch\u00E9 puoi combinare e alternare comportamenti senza gerarchie di classi rigide.",
              context: 'design',
              difficulty: 'advanced',
              code: `class Engine:
    def start(self):
        print('vroom')

class Car:
    def __init__(self):
        self.engine = Engine()
    def start(self):
        self.engine.start()`,
              task: 'Modella Car favorendo la composizione: invece di ereditare da Engine, istanzialo come attributo e delega start().',
            },
          ],
        },
      ],
    },
    9: {
      name: 'Concorrenza / Concurrency',
      description: 'Threading, async/await e multiprocessing',
      lessons: [
        {
          id: 'py_threading',
          title: 'Threading',
          description: 'Thread, lock, semaphore, GIL...',
          items: [
            {
              english: 'Thread',
              italian: 'Filo di Esecuzione (Thread)',
              pronunciation: '/\u03B8red/',
              phonetic: 'THRED',
              example:
                "A thread is the smallest unit of execution. = Un thread \u00E8 l'unit\u00E0 di esecuzione più piccola.",
              context: 'concurrency',
              difficulty: 'intermediate',
              code: `import threading

def worker():
    print('hello')

t = threading.Thread(target=worker)
t.start()
t.join()`,
              task: 'Avvia un thread tramite threading.Thread(target=worker) e attendi la sua terminazione con t.join() prima di proseguire.',
            },
            {
              english: 'Multi-threading',
              italian: 'Multithreading',
              pronunciation: '/\u02C8m\u028Clti \u03B8red\u026A\u014B/',
              phonetic: 'MAL-ti thred-ing',
              example:
                'In Python, multi-threading is effective for I/O tasks but limited by the GIL for CPU work. = In Python, il multithreading \u00E8 efficace per compiti di I/O ma limitato dal GIL per lavoro su CPU.',
              context: 'concurrency',
              difficulty: 'intermediate',
              note: 'Termine inglese mantenuto invariato in italiano; si parla quasi sempre di multithreading anche nei testi tecnici italiani.',
              code: `import threading

threads = [threading.Thread(target=download, args=(u,)) for u in urls]
for t in threads: t.start()
for t in threads: t.join()`,
              task: 'Scarica una lista di URL in multithreading creando un thread per ogni elemento e aspettando il completamento di tutti.',
            },
            {
              english: 'GIL (Global Interpreter Lock)',
              italian: "Blocco Globale dell'Interprete",
              pronunciation: '/\u02CCd\u0292i\u02D0 a\u026A \u02C8el/',
              phonetic: 'GIL',
              example:
                'The GIL prevents multiple native threads from executing Python bytecodes at once. = Il GIL impedisce a pi\u00F9 thread di eseguire bytecode Python contemporaneamente.',
              context: 'internals',
              difficulty: 'advanced',
              note: 'Rende Python meno efficiente per compiti pesanti di CPU in multithreading.',
            },
            {
              english: 'Lock (Mutex)',
              italian: 'Blocco Reciproco (Mutex)',
              pronunciation: '/l\u0252k/',
              phonetic: 'LOCK',
              example:
                'Use a lock to prevent multiple threads from accessing the same data. = Usa un lock per impedire a pi\u00F9 thread di accedere ai stessi dati.',
              context: 'concurrency',
              difficulty: 'intermediate',
              code: `import threading

lock = threading.Lock()
counter = 0
with lock:
    counter += 1`,
              task: `Proteggi l'incremento della variabile condivisa counter con un threading.Lock() usando il blocco \`with lock\` per garantire l'esclusione reciproca.`,
            },
            {
              english: 'Thread Safety',
              italian: 'Sicurezza dei Thread',
              pronunciation: '/\u03B8red \u02C8se\u026Afti/',
              phonetic: 'THRED seif-ti',
              example:
                "Using a lock around shared data ensures thread safety by preventing simultaneous access. = Usare un lock attorno ai dati condivisi garantisce la sicurezza dei thread prevenendo l'accesso simultaneo.",
              context: 'concurrency',
              difficulty: 'advanced',
              note: 'Codice che funziona correttamente quando chiamato da pi\u00F9 thread contemporaneamente.',
              code: `import threading

lock = threading.Lock()
balance = 0

def deposit(amount):
    global balance
    with lock:
        balance += amount`,
              task: `Rendi thread-safe la funzione deposit avvolgendo l'aggiornamento di balance in un blocco \`with lock\` su un Lock globale.`,
            },
            {
              english: 'Semaphore',
              italian: 'Semaforo',
              pronunciation: '/\u02C8sem\u0259f\u0254\u02D0r/',
              phonetic: 'SE-ma-for',
              example:
                'A semaphore limits the number of threads that can access a resource. = Un semaforo limita il numero di thread che possono accedere a una risorsa.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `import threading

sem = threading.Semaphore(3)

def download(url):
    with sem:
        fetch(url)`,
              task: 'Limita a tre i download paralleli usando un threading.Semaphore(3) come context manager attorno alla chiamata di rete.',
            },
            {
              english: 'Race Condition',
              italian: 'Corsa Critica (Race Condition)',
              pronunciation: '/re\u026As k\u0259n\u02C8d\u026A\u0283\u0259n/',
              phonetic: 'REIS con-DI-scion',
              example:
                'A race condition occurs when timing affects the outcome. = Una race condition avviene quando il tempismo influisce sul risultato.',
              context: 'errors',
              difficulty: 'advanced',
              code: `counter = 0

def increment():
    global counter
    for _ in range(100000):
        counter += 1

threads = [threading.Thread(target=increment) for _ in range(10)]`,
              task: 'Riproduci una race condition lanciando dieci thread che incrementano counter senza lock e osserva come il valore finale risulti errato.',
            },
            {
              english: 'ThreadPoolExecutor',
              italian: 'Esecutore Pool di Thread',
              pronunciation: '/\u03B8red pu\u02D0l \u026Ak\u02C8sekj\u028At\u0259r/',
              phonetic: 'THRED-puul ek-se-KIU-ter',
              example:
                'Submitting tasks to a ThreadPoolExecutor lets you run multiple HTTP requests in parallel without managing threads manually. = Inviare compiti a un ThreadPoolExecutor permette di eseguire più richieste HTTP in parallelo senza gestire i thread manualmente.',
              context: 'ecosystem',
              difficulty: 'advanced',
              code: `from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=10) as pool:
    results = list(pool.map(fetch, urls))`,
              task: 'Esegui in parallelo le chiamate HTTP usando un ThreadPoolExecutor con dieci worker e raccogli i risultati con pool.map(fetch, urls).',
            },
            {
              english: 'Daemon Thread',
              italian: 'Thread Demone',
              pronunciation: '/\u02C8di\u02D0m\u0259n \u03B8red/',
              phonetic: 'DII-mon THRED',
              example:
                'A daemon thread stops automatically when the main program ends. = Un thread demone si ferma automaticamente alla fine del programma.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `import threading

t = threading.Thread(target=heartbeat, daemon=True)
t.start()`,
              task: `Avvia un thread demone passando daemon=True al costruttore cosi' che si chiuda automaticamente alla fine del programma principale.`,
            },
            {
              english: 'Context Switching',
              italian: 'Cambio di Contesto',
              pronunciation: '/\u02C8k\u0252ntekst \u02C8sw\u026At\u0283\u026A\u014B/',
              phonetic: 'CON-tekst SUICC-ing',
              example: `The OS performs a context switching operation every few milliseconds, and the saved/restored state adds measurable overhead. = Il sistema operativo esegue un'operazione di cambio di contesto ogni pochi millisecondi, e lo stato salvato e ripristinato aggiunge un overhead misurabile.`,
              context: 'internals',
              difficulty: 'expert',
            },
          ],
        },
        {
          id: 'py_async',
          title: 'Async/Await',
          description: 'Async, await, coroutine, asyncio...',
          items: [
            {
              english: 'Asynchronous Programming',
              italian: 'Programmazione Asincrona',
              pronunciation:
                '/e\u026A\u02C8s\u026A\u014Bkr\u0259n\u0259s \u02C8pro\u028A\u0261r\u00E6m\u026A\u014B/',
              phonetic: 'ei-SIN-cro-nas pro-GRAM-ming',
              example:
                'Async programming is efficient for I/O tasks. = La prog. asincrona \u00E8 efficiente per compiti di I/O.',
              context: 'concurrency',
              difficulty: 'intermediate',
              code: `import asyncio

async def main():
    await asyncio.sleep(1)
    print('done')

asyncio.run(main())`,
              task: 'Scrivi un programma asincrono che definisce la coroutine main, attende asyncio.sleep(1) e la avvia con asyncio.run(main()).',
            },
            {
              english: 'Coroutine',
              italian: 'Funzione Sospendibile (Coroutine)',
              pronunciation: '/\u02CCko\u028Ar\u028A\u02C8ti\u02D0n/',
              phonetic: 'co-RUU-tiin',
              example:
                'Declare a coroutine with async def fetch(url): then await fetch(url) inside an event loop to perform non-blocking I/O. = Dichiara una coroutine con async def fetch(url): poi await fetch(url) dentro un event loop per eseguire I/O non bloccante.',
              context: 'concurrency',
              difficulty: 'intermediate',
              note: 'Una funzione che pu\u00F2 sospendere la sua esecuzione.',
              code: `import asyncio

async def fetch(url):
    await asyncio.sleep(0.1)
    return url

asyncio.run(fetch('https://example.com'))`,
              task: 'Dichiara la coroutine fetch con async def, simula un I/O non bloccante con await asyncio.sleep e poi avviala tramite asyncio.run.',
            },
            {
              english: 'Await (Keyword)',
              italian: 'Attendi (Await)',
              pronunciation: '/\u0259\u02C8we\u026At/',
              phonetic: 'e-UEIT',
              example:
                'Use "await" to wait for a coroutine result. = Usa "await" per aspettare il risultato di una coroutine.',
              context: 'syntax',
              difficulty: 'intermediate',
              code: `async def total():
    a = await fetch_a()
    b = await fetch_b()
    return a + b`,
              task: 'Usa la parola chiave await dentro la coroutine total per attendere in sequenza i risultati di fetch_a() e fetch_b().',
            },
            {
              english: 'Event Loop',
              italian: 'Ciclo degli Eventi (Event Loop)',
              pronunciation: '/\u026A\u02C8vent lu\u02D0p/',
              phonetic: 'i-VENT LUUP',
              example:
                "The event loop manages the execution of coroutines. = L'event loop gestisce l'esecuzione delle coroutine.",
              context: 'concurrency',
              difficulty: 'advanced',
              note: 'Il "motore" che decide quale task far avanzare.',
              code: `import asyncio

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)
loop.run_until_complete(main())
loop.close()`,
              task: 'Crea manualmente un event loop con asyncio.new_event_loop() ed esegui la coroutine main con loop.run_until_complete prima di chiuderlo.',
            },
            {
              english: 'Asyncio (module)',
              italian: 'Modulo asyncio',
              pronunciation: '/e\u026A\u02C8s\u026A\u014Bki o\u028A/',
              phonetic: 'ei-SIN-ki-ou',
              example:
                'Asyncio is the standard library for async code. = Asyncio \u00E8 la libreria standard per il codice asincrono.',
              context: 'ecosystem',
              difficulty: 'advanced',
              code: `import asyncio

async def fetch_all(urls):
    return await asyncio.gather(*[fetch(u) for u in urls])`,
              task: 'Usa asyncio.gather per eseguire in parallelo tutte le coroutine fetch(u) di una lista di URL e raccoglierne i risultati.',
            },
            {
              english: 'Future',
              italian: 'Promessa (Future)',
              pronunciation: '/\u02C8fju\u02D0t\u0283\u0259r/',
              phonetic: 'FIU-ciur',
              example:
                'A Future represents a result that is not yet available. = Una Future rappresenta un risultato non ancora disponibile.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `import asyncio

loop = asyncio.get_event_loop()
fut = loop.create_future()
loop.call_later(1, fut.set_result, 42)
result = loop.run_until_complete(fut)`,
              task: 'Crea una Future con loop.create_future() e programma con call_later la chiamata di fut.set_result(42) dopo un secondo.',
            },
            {
              english: 'Task',
              italian: 'Compito (Task)',
              pronunciation: '/t\u0251\u02D0sk/',
              phonetic: 'TASK',
              example: `Wrap a coroutine in an asyncio task via asyncio.create_task(coro) to schedule it concurrently with the rest of the event loop. = Avvolgi una coroutine in un task asyncio tramite asyncio.create_task(coro) per schedularla in concorrenza con il resto dell'event loop.`,
              context: 'concurrency',
              difficulty: 'intermediate',
              code: `import asyncio

async def main():
    task = asyncio.create_task(fetch('url'))
    result = await task`,
              task: 'Avvolgi la coroutine fetch in un task con asyncio.create_task() per schedularla in concorrenza e poi attendi il risultato con await.',
            },
            {
              english: 'Non-blocking I/O',
              italian: 'I/O Non Bloccante',
              pronunciation: '/\u02CCn\u0252n \u02C8bl\u0252k\u026A\u014B/',
              phonetic: 'non-BLOCK-ing i-o',
              example:
                'Async code uses non-blocking I/O to avoid waiting. = Il codice asincrono usa I/O non bloccante per evitare attese.',
              context: 'performance',
              difficulty: 'advanced',
              code: `import aiohttp, asyncio

async def fetch(url):
    async with aiohttp.ClientSession() as s:
        async with s.get(url) as resp:
            return await resp.text()`,
              task: `Implementa una fetch con I/O non bloccante usando aiohttp.ClientSession dentro un async with per non fermare l'event loop.`,
            },
            {
              english: 'Async Context Manager',
              italian: 'Gestore Contesto Asincrono',
              pronunciation:
                '/e\u026A\u02C8s\u026A\u014Bkr\u0259n\u0259s \u02C8k\u0252ntekst \u02C8m\u00E6n\u026Ad\u0292\u0259r/',
              phonetic: 'ei-SIN-cro-nas CON-tekst MAN-ig-ger',
              example:
                "An async context manager ensures that resources like HTTP sessions are properly closed even when an awaited operation raises an exception. = Un gestore di contesto asincrono assicura che risorse come le sessioni HTTP vengano chiuse correttamente anche quando un'operazione awaited solleva un'eccezione.",
              context: 'syntax',
              difficulty: 'advanced',
              code: `import aiohttp

async def get(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.text()`,
              task: `Apri una ClientSession con un async with cosi' che il gestore di contesto asincrono chiuda la sessione anche in caso di eccezione.`,
            },
            {
              english: 'Async Iterator',
              italian: 'Iteratore Asincrono',
              pronunciation:
                '/e\u026A\u02C8s\u026A\u014Bkr\u0259n\u0259s \u026A\u02C8t\u0259re\u026At\u0259r/',
              phonetic: 'ei-SIN-cro-nas i-te-REI-ter',
              example:
                'An async iterator allows you to process streaming data from a websocket or database cursor without blocking the event loop. = Un iteratore asincrono permette di elaborare dati in streaming da un websocket o cursore database senza bloccare il loop degli eventi.',
              context: 'syntax',
              difficulty: 'advanced',
              code: `async def stream_lines(url):
    async for line in fetch_lines(url):
        print(line)`,
              task: `Itera su uno stream di righe con un async for cosi' che ogni elemento venga atteso senza bloccare l'event loop.`,
            },
          ],
        },
        {
          id: 'py_multiproc',
          title: 'Multiprocessing',
          description: 'Process, pool, queue, pipe...',
          items: [
            {
              english: 'Process',
              italian: 'Processo',
              pronunciation: '/\u02C8pr\u0252ses/',
              phonetic: 'PRO-ces',
              example:
                "A process is an independent instance of execution. = Un processo \u00E8 un'istanza di esecuzione indipendente.",
              context: 'concurrency',
              difficulty: 'intermediate',
              note: 'Ha la propria memoria RAM separata dagli altri processi.',
              code: `from multiprocessing import Process

def work(n):
    print(n * n)

p = Process(target=work, args=(10,))
p.start()
p.join()`,
              task: 'Avvia un nuovo processo con multiprocessing.Process(target=work, args=(10,)) e attendi la sua conclusione con p.join().',
            },
            {
              english: 'Multiprocessing',
              italian: 'Esecuzione Multi-Processo (Multiprocessing)',
              pronunciation: '/\u02CCm\u028Clti\u02C8pr\u0252ses\u026A\u014B/',
              phonetic: 'MAL-ti-pro-ces-sing',
              example:
                "Using multiprocessing for CPU-heavy computations like image processing lets you leverage all CPU cores. = Usare il multiprocessing per calcoli pesanti come l'elaborazione di immagini permette di sfruttare tutti i core della CPU.",
              context: 'concurrency',
              difficulty: 'advanced',
              note: 'Usa pi\u00F9 core della CPU creando processi Python separati.',
              code: `from multiprocessing import Pool

with Pool(4) as pool:
    results = pool.map(heavy_compute, dataset)`,
              task: `Sfrutta il multiprocessing per distribuire heavy_compute su quattro processi paralleli tramite Pool.map sull'intero dataset.`,
            },
            {
              english: 'Process Pool',
              italian: 'Pool di Processi',
              pronunciation: '/\u02C8pr\u0252ses pu\u02D0l/',
              phonetic: 'PRO-ces PUUL',
              example:
                'A process pool manages multiple worker processes. = Un pool di processi gestisce diversi processi lavoratori.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `from concurrent.futures import ProcessPoolExecutor

with ProcessPoolExecutor(max_workers=8) as pool:
    for r in pool.map(crunch, chunks):
        print(r)`,
              task: 'Costruisci un pool di otto processi con ProcessPoolExecutor e applica la funzione crunch a tutti i chunk in parallelo.',
            },
            {
              english: 'IPC (Inter-Process Communication)',
              italian: 'Comunicazione tra Processi (IPC)',
              pronunciation: '/\u02CCa\u026A pi\u02D0 \u02C8si\u02D0/',
              phonetic: 'ai-pi-SII',
              example:
                'Processes do not share memory, so IPC mechanisms like Queue, Pipe or shared_memory are needed to pass data between them. = I processi non condividono memoria, quindi servono meccanismi IPC come Queue, Pipe o shared_memory per passare dati tra loro.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `from multiprocessing import Process, Queue

q = Queue()
Process(target=producer, args=(q,)).start()
Process(target=consumer, args=(q,)).start()`,
              task: 'Realizza la comunicazione IPC tra due processi condividendo una Queue passata come argomento al producer e al consumer.',
            },
            {
              english: 'Queue (Multiprocessing)',
              italian: 'Coda (Multiprocessing)',
              pronunciation: '/kju\u02D0/',
              phonetic: 'KIU',
              example:
                'Use a Queue to send data between processes safely. = Usa una coda per inviare dati tra processi in modo sicuro.',
              context: 'concurrency',
              difficulty: 'intermediate',
              code: `from multiprocessing import Queue, Process

q = Queue()
q.put('msg')
value = q.get()`,
              task: `Trasferisci dati tra processi in modo sicuro usando multiprocessing.Queue: chiama q.put('msg') nel produttore e q.get() nel consumatore.`,
            },
            {
              english: 'Pipe (Multiprocessing)',
              italian: 'Tubo (Pipe)',
              pronunciation: '/pa\u026Ap/',
              phonetic: 'PAIP',
              example:
                'A pipe allows two-way communication between two processes. = Una pipe permette la comunicazione bidirezionale tra due processi.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `from multiprocessing import Pipe, Process

parent, child = Pipe()
Process(target=worker, args=(child,)).start()
parent.send('ping')
print(parent.recv())`,
              task: 'Crea una pipe bidirezionale con multiprocessing.Pipe() e usa send/recv per scambiare messaggi tra il processo padre e il worker.',
            },
            {
              english: 'Shared Memory',
              italian: 'Memoria Condivisa',
              pronunciation: '/\u0283e\u0259rd \u02C8mem\u0259ri/',
              phonetic: 'SCERD ME-mori',
              example:
                'Using multiprocessing.shared_memory avoids the overhead of serializing data between processes, which is critical for large NumPy arrays. = Usare multiprocessing.shared_memory evita il costo della serializzazione dei dati tra processi, il che \u00E8 critico per grandi array NumPy.',
              context: 'concurrency',
              difficulty: 'expert',
              code: `from multiprocessing import shared_memory
import numpy as np

shm = shared_memory.SharedMemory(create=True, size=1024)
arr = np.ndarray((128,), dtype='int64', buffer=shm.buf)`,
              task: 'Alloca un blocco di shared_memory.SharedMemory di 1024 byte e mappalo su un array NumPy per evitare il costo di serializzazione tra processi.',
            },
            {
              english: 'CPU-bound',
              italian: 'Limitato dalla CPU',
              pronunciation: '/\u02CCsi\u02D0 pi\u02D0 \u02C8ju\u02D0 ba\u028And/',
              phonetic: 'sii-pii-iu BAUND',
              example:
                "Multiprocessing is best for CPU-bound tasks. = Il multiprocessing \u00E8 l'ideale per compiti limitati dalla CPU.",
              context: 'performance',
              difficulty: 'intermediate',
              note: 'Compiti che richiedono molti calcoli matematici.',
              code: `from multiprocessing import Pool

def is_prime(n):
    return all(n % i for i in range(2, int(n**0.5) + 1))

with Pool() as p:
    p.map(is_prime, range(10**6))`,
              task: 'Distribuisci il calcolo CPU-bound is_prime su tutti i core disponibili tramite multiprocessing.Pool().map per aggirare il GIL.',
            },
            {
              english: 'I/O-bound',
              italian: "Limitato dall'I/O",
              pronunciation: '/\u02C8a\u026A o\u028A ba\u028And/',
              phonetic: 'ai-ou BAUND',
              example:
                "Threading or Async is better for I/O-bound tasks. = Il threading o l'async sono meglio per compiti limitati dall'I/O.",
              context: 'performance',
              difficulty: 'intermediate',
              note: 'Compiti che passano molto tempo ad aspettare la rete o il disco.',
              code: `import asyncio, aiohttp

async def fetch_all(urls):
    async with aiohttp.ClientSession() as s:
        return await asyncio.gather(*[s.get(u) for u in urls])`,
              task: `Affronta un carico I/O-bound di download multipli con asyncio e aiohttp invece di creare processi: il GIL non e' il collo di bottiglia.`,
            },
            {
              english: 'Parallelism',
              italian: 'Parallelismo',
              pronunciation: '/\u02C8p\u00E6r\u0259lel\u026Az\u0259m/',
              phonetic: 'PA-ra-le-li-sem',
              example:
                'True parallelism requires multiprocessing in Python because the GIL limits threads to one at a time. = Il vero parallelismo richiede il multiprocessing in Python perch\u00E9 il GIL limita i thread a uno alla volta.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `from multiprocessing import Pool

with Pool(processes=4) as pool:
    pool.map(cpu_heavy, dataset)`,
              task: 'Ottieni vero parallelismo eseguendo cpu_heavy su quattro processi separati con multiprocessing.Pool, aggirando il limite del GIL.',
            },
          ],
        },
        {
          id: 'py_concurrency_patterns',
          title: 'Pattern di Concorrenza / Concurrency Patterns',
          description: 'Future, task, event loop...',
          items: [
            {
              english: 'Producer-Consumer',
              italian: 'Produttore-Consumatore',
              pronunciation: '/pr\u0259\u02C8dju\u02D0s\u0259r k\u0259n\u02C8sju\u02D0m\u0259r/',
              phonetic: 'pro-DIU-ser con-SIU-mer',
              example:
                'Use a Queue to implement the producer-consumer pattern. = Usa una coda per implementare il pattern produttore-consumatore.',
              context: 'patterns',
              difficulty: 'intermediate',
              code: `import queue, threading

q = queue.Queue()

def producer():
    q.put('item')

def consumer():
    item = q.get()
    q.task_done()`,
              task: `Implementa il pattern produttore-consumatore con queue.Queue: il producer chiama q.put('item') e il consumer q.get() seguito da task_done().`,
            },
            {
              english: 'Worker Pool',
              italian: 'Gruppo di Lavoratori (Worker Pool)',
              pronunciation: '/\u02C8w\u025C\u02D0rk\u0259r pu\u02D0l/',
              phonetic: 'UER-ker PUUL',
              example:
                'A worker pool processes a large number of tasks using few threads. = Un worker pool processa molti compiti usando pochi thread.',
              context: 'patterns',
              difficulty: 'advanced',
              code: `from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=5) as pool:
    futures = [pool.submit(handle, task) for task in tasks]`,
              task: 'Costruisci un worker pool di cinque thread con ThreadPoolExecutor e invia con pool.submit ogni task da elaborare.',
            },
            {
              english: 'Barrier',
              italian: 'Barriera',
              pronunciation: '/\u02C8b\u00E6ri\u0259r/',
              phonetic: 'BAR-rier',
              example:
                'A barrier synchronizes multiple threads at a specific point. = Una barriera sincronizza diversi thread in un punto specifico.',
              context: 'concurrency',
              difficulty: 'expert',
              note: 'Tutti i thread devono raggiungere la barriera prima che chiunque possa continuare.',
              code: `import threading

barrier = threading.Barrier(3)

def phase():
    prepare()
    barrier.wait()
    run()`,
              task: 'Sincronizza tre thread con threading.Barrier(3): ogni thread chiami barrier.wait() per attendere gli altri prima di iniziare la fase successiva.',
            },
            {
              english: 'Condition Variable',
              italian: 'Variabile di Condizione',
              pronunciation: '/k\u0259n\u02C8d\u026A\u0283\u0259n \u02C8veri\u0259bl/',
              phonetic: 'con-DI-scion VE-ri-ebol',
              example: `With a condition variable, a consumer thread can call cv.wait() until a producer calls cv.notify() to signal that data is ready. = Con una variabile di condizione, un thread consumatore puo' chiamare cv.wait() finche' un produttore chiama cv.notify() per segnalare che i dati sono pronti.`,
              context: 'concurrency',
              difficulty: 'expert',
              code: `import threading

cv = threading.Condition()
ready = False

def consumer():
    with cv:
        cv.wait_for(lambda: ready)
        process()`,
              task: `Usa una threading.Condition: il consumatore chiama cv.wait_for(lambda: ready) finche' il produttore non imposta ready=True e chiama cv.notify().`,
            },
            {
              english: 'Starvation',
              italian: 'Inedia (Starvation)',
              pronunciation: '/st\u0251\u02D0r\u02C8ve\u026A\u0283\u0259n/',
              phonetic: 'star-VEI-scion',
              example:
                "Fair scheduling algorithms prevent starvation by ensuring every thread eventually gets CPU time. = Algoritmi di scheduling equi prevengono l'inedia garantendo che ogni thread ottenga tempo di CPU.",
              context: 'errors',
              difficulty: 'expert',
            },
            {
              english: 'Livelock',
              italian: 'Blocco Attivo (Livelock)',
              pronunciation: '/\u02C8la\u026Avl\u0252k/',
              phonetic: 'LAIV-lock',
              example:
                'In a livelock, threads keep changing state but make no progress. = In un livelock, i thread cambiano stato ma non progrediscono.',
              context: 'errors',
              difficulty: 'expert',
            },
            {
              english: 'Atomic Operation',
              italian: 'Operazione Atomica',
              pronunciation:
                '/\u0259\u02C8t\u0252m\u026Ak \u02CC\u0252p\u0259\u02C8re\u026A\u0283\u0259n/',
              phonetic: 'a-TO-mic o-pe-REI-scion',
              example:
                "An atomic operation cannot be interrupted. = Un'operazione atomica non pu\u00F2 essere interrotta.",
              context: 'concurrency',
              difficulty: 'advanced',
              code: `import threading

lock = threading.Lock()
counter = 0

def inc():
    global counter
    with lock:
        counter += 1`,
              task: `Trasforma l'incremento di counter in un'operazione atomica avvolgendolo in un blocco \`with lock\` su un Lock condiviso.`,
            },
            {
              english: 'Event (Synchronization)',
              italian: 'Evento (Sincronizzazione)',
              pronunciation: '/\u026A\u02C8vent/',
              phonetic: 'i-VENT',
              example:
                'An event object allows one thread to signal others. = Un oggetto evento permette a un thread di segnalare agli altri.',
              context: 'concurrency',
              difficulty: 'intermediate',
              code: `import threading

ready = threading.Event()

def waiter():
    ready.wait()
    print('go')

def setter():
    ready.set()`,
              task: `Coordina due thread con threading.Event: il waiter blocca su ready.wait() finche' il setter non chiama ready.set().`,
            },
            {
              english: 'Coroutine Chaining',
              italian: 'Concatenazione di Coroutine',
              pronunciation:
                '/\u02CCko\u028Ar\u028A\u02C8ti\u02D0n \u02C8t\u0283e\u026An\u026A\u014B/',
              phonetic: 'co-RUU-tiin CEI-ning',
              example:
                'Chain coroutines to build complex async workflows. = Concatena le coroutine per costruire flussi asincroni complessi.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `async def pipeline(url):
    raw = await fetch(url)
    parsed = await parse(raw)
    return await store(parsed)`,
              task: 'Concatena tre coroutine fetch, parse e store dentro pipeline awaitando ciascuna in sequenza per costruire un flusso asincrono.',
            },
            {
              english: 'Task Cancellation',
              italian: 'Cancellazione del Task',
              pronunciation: '/t\u0251\u02D0sk \u02CCk\u00E6ns\u0259\u02C8le\u026A\u0283\u0259n/',
              phonetic: 'TASK can-sel-LEI-scion',
              example:
                'Handle task cancellation to avoid resource leaks. = Gestisci la cancellazione del task per evitare perdite di risorse.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `import asyncio

async def main():
    task = asyncio.create_task(long_running())
    await asyncio.sleep(1)
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        pass`,
              task: 'Gestisci la cancellazione di un task chiamando task.cancel() e intercettando asyncio.CancelledError in un blocco try/except per liberare le risorse.',
            },
          ],
        },
      ],
    },
    10: {
      name: 'Testing e Quality / Testing & Quality',
      description: 'Test, qualit\u00E0 del codice e profiling',
      lessons: [
        {
          id: 'py_unittest',
          title: 'Unit Testing',
          description: 'pytest, unittest, assert, fixture...',
          items: [
            {
              english: 'Unit Testing',
              italian: 'Test Unitari',
              pronunciation: '/\u02C8ju\u02D0n\u026At \u02C8test\u026A\u014B/',
              phonetic: 'IUU-nit TES-ting',
              example: `Practicing unit testing means writing fast, isolated tests for one function at a time so regressions surface immediately. = Praticare i test unitari significa scrivere test rapidi e isolati per una funzione alla volta cosi' le regressioni emergono subito.`,
              context: 'testing',
              difficulty: 'intermediate',
            },
            {
              english: 'Unittest (module)',
              italian: 'Modulo unittest',
              pronunciation: '/\u02C8ju\u02D0n\u026At test/',
              phonetic: 'IUU-nit test',
              example:
                'Unittest is the built-in testing framework in Python. = Unittest \u00E8 il framework di test integrato in Python.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              note: 'Ispirato a JUnit (Java); usa un approccio orientato agli oggetti.',
              code: `import unittest

class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(2 + 3, 5)`,
              task: 'Scrivi una classe di test con unittest che verifica il risultato di una semplice somma usando assertEqual.',
            },
            {
              english: 'Pytest (framework)',
              italian: 'Framework pytest',
              pronunciation: '/\u02C8pa\u026Atest/',
              phonetic: 'PAI-test',
              example:
                'Pytest is a popular alternative to unittest. = Pytest \u00E8 una popolare alternativa a unittest.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              note: 'Molto pi\u00F9 conciso e potente di unittest; usa semplici asserzioni Python.',
              code: 'pip install pytest && pytest -v tests/',
              task: 'Installa pytest e lancia tutta la suite di test in modalita verbosa per vedere il nome di ogni test eseguito.',
            },
            {
              english: 'Fixture (Pytest)',
              italian: 'Predisposizione (Fixture)',
              pronunciation: '/\u02C8f\u026Akst\u0283\u0259r/',
              phonetic: 'FIKS-ciur',
              example:
                'Use fixtures to provide a fixed baseline for tests. = Usa le fixture per fornire una base fissa per i test.',
              context: 'testing',
              difficulty: 'advanced',
              note: "Funzioni che preparano l'ambiente (es. creano un DB temporaneo) prima dei test.",
              code: `import pytest

@pytest.fixture
def sample_user():
    return {'name': 'Alice', 'email': 'alice@test.com'}`,
              task: 'Definisci una fixture pytest che crea un utente di esempio condivisibile fra piu test della stessa suite.',
            },
            {
              english: 'Parameterization',
              italian: 'Parametrizzazione',
              pronunciation: '/p\u0259\u02CCr\u00E6m\u0259tr\u0259\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'pa-ra-me-tri-ZEI-scion',
              example:
                '@pytest.mark.parametrize allows running a test with different inputs. = Permette di eseguire un test con diversi input.',
              context: 'testing',
              difficulty: 'advanced',
              code: `import pytest

@pytest.mark.parametrize('a,b,expected', [(1, 2, 3), (5, 5, 10), (0, 0, 0)])
def test_add(a, b, expected):
    assert a + b == expected`,
              task: 'Parametrizza il test della funzione somma con tre casi diversi cosi da coprire piu scenari con un solo blocco di codice.',
            },
            {
              english: 'Test Case',
              italian: 'Caso di Test',
              pronunciation: '/test ke\u026As/',
              phonetic: 'TEST keis',
              example:
                'Each test case checks a specific scenario. = Ogni caso di test controlla uno scenario specifico.',
              context: 'testing',
              difficulty: 'beginner',
              code: `def test_user_email_is_lowercase():
    user = User(email='Alice@Test.com')
    assert user.email == 'alice@test.com'`,
              task: `Scrivi un caso di test che controlla che la classe User normalizzi sempre l'email in minuscolo dopo la creazione.`,
            },
            {
              english: 'Test Discovery',
              italian: 'Scoperta dei Test',
              pronunciation: '/test d\u026A\u02C8sk\u028Cv\u0259ri/',
              phonetic: 'TEST di-SCA-ve-ri',
              example:
                'Running pytest with no arguments triggers test discovery, which collects every file matching test_*.py under the current directory. = Eseguire pytest senza argomenti innesca la scoperta dei test, che raccoglie ogni file che corrisponde a test_*.py sotto la cartella corrente.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'pytest --collect-only -q',
              task: 'Esegui la sola fase di scoperta dei test con pytest, senza eseguirli, per verificare quali file e funzioni verrebbero raccolti.',
            },
            {
              english: 'Expected Failure',
              italian: 'Fallimento Previsto',
              pronunciation: '/\u026Ak\u02C8spekt\u026Ad \u02C8fe\u026Alj\u0259r/',
              phonetic: 'ek-SPEC-ted FEIL-iur',
              example:
                "Mark a test as an expected failure if you know it's broken. = Segna un test come fallimento previsto se sai che \u00E8 rotto.",
              context: 'testing',
              difficulty: 'intermediate',
              code: '@pytest.mark.xfail',
            },
            {
              english: 'Skipping Tests',
              italian: 'Saltare i Test',
              pronunciation: '/\u02C8sk\u026Ap\u026A\u014B tests/',
              phonetic: 'SKIP-ping tests',
              example: `Use @pytest.mark.skipif(sys.platform != 'linux', reason='linux only') to make skipping tests conditional on the runtime environment. = Usa @pytest.mark.skipif(sys.platform != 'linux', reason='linux only') per rendere il saltare i test condizionato dall'ambiente runtime.`,
              context: 'testing',
              difficulty: 'intermediate',
              code: '@pytest.mark.skip',
            },
            {
              english: 'Assertion Error',
              italian: 'Errore di Asserzione',
              pronunciation: '/\u0259\u02C8s\u025C\u02D0r\u0283\u0259n \u02C8er\u0259r/',
              phonetic: 'as-SER-scion E-rror',
              example:
                'An AssertionError is raised when a test fails. = Un AssertionError viene sollevato quando un test fallisce.',
              context: 'errors',
              difficulty: 'beginner',
              code: `def test_double():
    result = 2 * 3
    assert result == 7, f'Expected 7, got {result}'`,
              task: 'Scrivi un assert che fallisce di proposito mostrando nel messaggio il valore effettivo per facilitare il debug del test.',
            },
          ],
        },
        {
          id: 'py_mocking',
          title: 'Mocking',
          description: 'Mock, patch, MagicMock...',
          items: [
            {
              english: 'Mocking',
              italian: 'Simulazione (Mocking)',
              pronunciation: '/\u02C8m\u0252k\u026A\u014B/',
              phonetic: 'MOCK-ing',
              example:
                'Using mocking to simulate a database call lets you test your logic without needing a real database. = Usare la simulazione per emulare una chiamata al database permette di testare la logica senza bisogno di un database reale.',
              context: 'testing',
              difficulty: 'intermediate',
            },
            {
              english: 'Mock (Object)',
              italian: 'Oggetto Mock',
              pronunciation: '/m\u0252k/',
              phonetic: 'MOCK',
              example:
                'A mock object records how it was called. = Un oggetto mock registra come \u00E8 stato chiamato.',
              context: 'testing',
              difficulty: 'intermediate',
              code: `from unittest.mock import Mock

mock_db = Mock()
mock_db.find.return_value = {'id': 1, 'name': 'Bob'}
assert mock_db.find(1)['name'] == 'Bob'`,
              task: 'Crea un oggetto Mock che simula un client di database e configura il valore restituito dal metodo find.',
            },
            {
              english: 'Patch (Decorator)',
              italian: 'Sostituzione (Patch)',
              pronunciation: '/p\u00E6t\u0283/',
              phonetic: 'PACC',
              example:
                'Use the patch decorator to mock a class in a specific module. = Usa il decoratore patch per simulare una classe in un modulo.',
              context: 'testing',
              difficulty: 'advanced',
              code: '@patch("module.ClassName")',
            },
            {
              english: 'MagicMock',
              italian: 'Oggetto Fittizio Configurabile (MagicMock)',
              pronunciation: '/\u02C8m\u00E6d\u0292\u026Ak m\u0252k/',
              phonetic: 'MA-gic MOCK',
              example:
                'With MagicMock you can simulate iterables, context managers, and arithmetic in a single test object. = Con MagicMock puoi simulare iterabili, context manager e aritmetica in un singolo oggetto di test.',
              context: 'testing',
              difficulty: 'advanced',
              note: 'Sottoclasse di Mock che supporta dunder methods come __getitem__, __iter__, ecc.',
              code: `from unittest.mock import MagicMock

mock_obj = MagicMock()
mock_obj.__iter__.return_value = iter([1, 2, 3])
assert list(mock_obj) == [1, 2, 3]`,
              task: 'Usa MagicMock per simulare un oggetto iterabile cosi da poterlo passare a un ciclo for nel codice sotto test.',
            },
            {
              english: 'Return Value',
              italian: 'Valore di Ritorno (Mock)',
              pronunciation: '/r\u026A\u02C8t\u025C\u02D0rn \u02C8v\u00E6lju\u02D0/',
              phonetic: 're-TERN VE-liu',
              example:
                "Set the return_value of a mock to control its output. = Imposta il return_value di un mock per controllarne l'output.",
              context: 'testing',
              difficulty: 'intermediate',
              code: `from unittest.mock import Mock

service = Mock()
service.fetch_user.return_value = {'id': 42, 'role': 'admin'}`,
              task: 'Imposta il return_value di un mock per restituire sempre un utente amministratore di esempio durante il test.',
            },
            {
              english: 'Side Effect (Mock)',
              italian: 'Effetto Collaterale (Side Effect)',
              pronunciation: '/sa\u026Ad \u026A\u02C8fekt/',
              phonetic: 'SAID i-FEKT',
              example:
                "Use side_effect to make a mock raise an exception. = Usa side_effect per far sollevare un'eccezione a un mock.",
              context: 'testing',
              difficulty: 'advanced',
              code: `from unittest.mock import Mock

mock_api = Mock()
mock_api.call.side_effect = ConnectionError('timeout')`,
              task: 'Configura il side_effect di un mock perche sollevi un ConnectionError e verifica come il codice gestisce il timeout.',
            },
            {
              english: 'Monkeypatch (Fixture)',
              italian: 'Sostituzione Runtime (Monkeypatch)',
              pronunciation: '/\u02C8m\u028C\u014Bki p\u00E6t\u0283/',
              phonetic: 'MAN-ki PACC',
              example:
                'The monkeypatch fixture allows safe modification of objects during tests. = La fixture monkeypatch permette la modifica sicura di oggetti durante i test.',
              context: 'testing',
              difficulty: 'advanced',
              note: 'Fixture integrata di pytest.',
              code: `def test_env(monkeypatch):
    monkeypatch.setenv('API_KEY', 'fake-key')
    assert os.environ['API_KEY'] == 'fake-key'`,
              task: `Usa la fixture monkeypatch per impostare una variabile d'ambiente fittizia solo per la durata del singolo test.`,
            },
            {
              english: 'Assert Called With',
              italian: 'Verifica Chiamata con Argomenti',
              pronunciation: '/\u0259\u02C8s\u025C\u02D0rt k\u0254\u02D0ld w\u026A\u00F0/',
              phonetic: 'as-SERT COLD WITH',
              example:
                'mock.assert_called_with(1, 2) verifies the call arguments. = verifica che il mock sia stato chiamato con quegli argomenti.',
              context: 'testing',
              difficulty: 'intermediate',
              code: `from unittest.mock import Mock

logger = Mock()
logger.info('user logged in', user_id=42)
logger.info.assert_called_with('user logged in', user_id=42)`,
              task: 'Verifica con assert_called_with che il logger sia stato invocato con esattamente il messaggio e gli argomenti attesi.',
            },
            {
              english: 'Spy (Testing)',
              italian: 'Spia (Spy)',
              pronunciation: '/spa\u026A/',
              phonetic: 'SPAI',
              example:
                'A spy wraps a real object but records calls. = Una spia avvolge un oggetto reale ma ne registra le chiamate.',
              context: 'testing',
              difficulty: 'advanced',
              code: `from unittest.mock import patch

with patch.object(repo, 'save', wraps=repo.save) as spy:
    service.create_user('Alice')
    spy.assert_called_once()`,
              task: 'Avvolgi il metodo save del repository con una spia che ne registra le chiamate ma lascia eseguire il codice reale.',
            },
            {
              english: 'Dependency Injection (DI)',
              italian: 'Iniezione delle Dipendenze',
              pronunciation: '/d\u026A\u02C8pend\u0259nsi \u026An\u02C8d\u0292ek\u0283\u0259n/',
              phonetic: 'de-PEN-den-si in-GEK-scion',
              example:
                'DI makes it easier to inject mocks into your code. = La DI rende pi\u00F9 facile inserire i mock nel codice.',
              context: 'architecture',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'py_quality',
          title: 'Qualit\u00E0 Codice / Code Quality',
          description: 'Linting, coverage, TDD...',
          items: [
            {
              english: 'Linting',
              italian: 'Controllo Statico (Linting)',
              pronunciation: '/\u02C8l\u026Ant\u026A\u014B/',
              phonetic: 'LIN-ting',
              example:
                'Running a linting tool before each commit catches common mistakes like unused imports automatically. = Eseguire uno strumento di linting prima di ogni commit individua errori comuni come import inutilizzati automaticamente.',
              context: 'tools',
              difficulty: 'beginner',
              code: 'ruff check src/ tests/',
              task: 'Lancia il linter ruff sulle cartelle src e tests per individuare import inutilizzati e violazioni di stile prima del commit.',
            },
            {
              english: 'PEP 8',
              italian: 'Guida di Stile Python (PEP 8)',
              pronunciation: '/pep e\u026At/',
              phonetic: 'PEP-eit',
              example:
                'Tools like flake8 and ruff check your code against PEP 8 automatically, enforcing 4-space indentation and 79-character lines. = Strumenti come flake8 e ruff controllano il codice rispetto a PEP 8 automaticamente, applicando indentazione a 4 spazi e righe da 79 caratteri.',
              context: 'standards',
              difficulty: 'beginner',
              note: 'Python Enhancement Proposal numero 8: la guida di stile ufficiale di Python.',
            },
            {
              english: 'Black (Formatter)',
              italian: 'Formattatore di Codice (Black)',
              pronunciation: '/bl\u00E6k/',
              phonetic: 'BLACK',
              example:
                'Black is an uncompromising code formatter. = Black \u00E8 un formattatore di codice senza compromessi.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'black --line-length 100 src/ tests/',
              task: 'Formatta automaticamente tutto il codice in src e tests con black usando una lunghezza massima di riga di 100 caratteri.',
            },
            {
              english: 'Code Coverage',
              italian: 'Copertura del Codice',
              pronunciation: '/ko\u028Ad \u02C8k\u028Cv\u0259r\u026Ad\u0292/',
              phonetic: 'KOUD CO-ve-rig',
              example:
                "High code coverage does not guarantee quality, but it helps. = Un'alta copertura del codice non garantisce la qualit\u00E0, ma aiuta.",
              context: 'metrics',
              difficulty: 'intermediate',
              code: 'pytest --cov=src --cov-report=term-missing',
              task: 'Esegui i test misurando la copertura del modulo src e mostrando in console le righe non coperte da nessun test.',
            },
            {
              english: 'Static Analysis',
              italian: 'Analisi Statica',
              pronunciation: '/\u02C8st\u00E6t\u026Ak \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'STA-tik a-NA-li-sis',
              example: `Running static analysis with mypy or pylint catches type errors and unused imports without ever executing the program. = Eseguire l'analisi statica con mypy o pylint individua errori di tipo e import inutilizzati senza mai eseguire il programma.`,
              context: 'tools',
              difficulty: 'intermediate',
              code: 'mypy --strict src/',
              task: `Esegui l'analisi statica con mypy in modalita strict sul pacchetto src per intercettare ogni errore di tipo prima dell'esecuzione.`,
            },
            {
              english: 'Technical Debt',
              italian: 'Debito Tecnico',
              pronunciation: '/\u02C8tekn\u026Akl det/',
              phonetic: 'TEK-ni-cal DET',
              example:
                'Tracking technical debt with TODO comments and regular refactoring sprints prevents small shortcuts from snowballing into major maintenance burdens. = Tracciare il debito tecnico con commenti TODO e sprint di refactoring regolari impedisce che piccole scorciatoie si trasformino in grossi oneri di manutenzione.',
              context: 'management',
              difficulty: 'beginner',
              note: 'Il costo del lavoro extra causato dalla scelta di una soluzione facile ora invece di una migliore a lungo termine.',
            },
            {
              english: 'Refactoring',
              italian: 'Rifattorizzazione (Refactoring)',
              pronunciation: '/\u02CCri\u02D0\u02C8f\u00E6kt\u0259r\u026A\u014B/',
              phonetic: 'rii-FAC-to-ring',
              example:
                'Safe refactoring relies on having good test coverage so you know nothing breaks after restructuring. = Un refactoring sicuro si basa su una buona copertura di test per sapere che nulla si rompe dopo la ristrutturazione.',
              context: 'development',
              difficulty: 'intermediate',
            },
            {
              english: 'Pythonic',
              italian: 'Pythonico',
              pronunciation: '/pa\u026A\u02C8\u03B8\u0252n\u026Ak/',
              phonetic: 'pai-THO-nic',
              example:
                'Writing list comprehensions is a Pythonic way to filter lists. = Scrivere list comprehension \u00E8 un modo pythonico per filtrare le liste.',
              context: 'philosophy',
              difficulty: 'beginner',
              note: 'Codice che segue la filosofia e le convenzioni proprie di Python.',
            },
            {
              english: "Dry (Don't Repeat Yourself)",
              italian: 'Principio DRY',
              pronunciation: '/dra\u026A/',
              phonetic: 'DRAI',
              example:
                'Avoid duplicate code by following the DRY principle. = Evita il codice duplicato seguendo il principio DRY.',
              context: 'philosophy',
              difficulty: 'beginner',
            },
            {
              english: 'Kiss (Keep It Simple, Stupid)',
              italian: 'Principio KISS',
              pronunciation: '/k\u026As/',
              phonetic: 'KISS',
              example:
                'The KISS principle encourages simplicity in design. = Il principio KISS incoraggia la semplicit\u00E0 nel design.',
              context: 'philosophy',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'py_performance',
          title: 'Performance',
          description: 'Profiling, benchmark, optimization...',
          items: [
            {
              english: 'Profiling',
              italian: 'Profilazione (Profiling)',
              pronunciation: '/\u02C8pro\u028Afa\u026Al\u026A\u014B/',
              phonetic: 'PROU-failing',
              example:
                'Use profiling to identify execution bottlenecks. = Usa il profiling per identificare i colli di bottiglia.',
              context: 'performance',
              difficulty: 'intermediate',
            },
            {
              english: 'cProfile (module)',
              italian: 'Modulo cProfile',
              pronunciation: '/\u02CCsi\u02D0 \u02C8pro\u028Afa\u026Al/',
              phonetic: 'sii-PROU-fail',
              example:
                'cProfile provides a detailed report of function calls. = cProfile fornisce un report dettagliato delle chiamate alle funzioni.',
              context: 'tools',
              difficulty: 'intermediate',
              note: 'Il profiler standard di Python raccomandato per la maggior parte degli usi.',
              code: 'python -m cProfile -s cumulative -o profile.out app.py',
              task: `Profila l'esecuzione di app.py con cProfile ordinando le funzioni per tempo cumulativo e salvando il report su file.`,
            },
            {
              english: 'Timeit (module)',
              italian: 'Modulo timeit',
              pronunciation: '/\u02C8ta\u026Am\u026At/',
              phonetic: 'TAIM-it',
              example:
                'Use timeit to measure the execution time of small code snippets. = Usa timeit per misurare il tempo di esecuzione di piccoli frammenti di codice.',
              context: 'tools',
              difficulty: 'beginner',
              code: `import timeit

elapsed = timeit.timeit('sum(range(1000))', number=10000)
print(f'{elapsed:.3f}s')`,
              task: 'Misura con timeit quanto impiega a eseguire diecimila volte la somma dei primi mille interi e stampa il tempo totale.',
            },
            {
              english: 'PyPy',
              italian: 'Interprete JIT (PyPy)',
              pronunciation: '/\u02CCpa\u026A \u02C8pa\u026A/',
              phonetic: 'PAI-PAI',
              example:
                'Switching to PyPy can speed up long-running CPU-bound scripts without changing any code. = Passare a PyPy pu\u00F2 velocizzare script pesanti di CPU di lunga durata senza modificare il codice.',
              context: 'ecosystem',
              difficulty: 'advanced',
              note: "Usa la compilazione Just-In-Time (JIT) per velocizzare l'esecuzione.",
              code: 'pypy3 -m pip install requests && pypy3 my_script.py',
              task: `Installa requests dentro l'ambiente PyPy ed esegui lo script con l'interprete JIT per misurare il guadagno prestazionale.`,
            },
            {
              english: 'Cython',
              italian: 'Compilatore Python-C (Cython)',
              pronunciation: '/\u02C8sa\u026A\u03B8\u0259n/',
              phonetic: 'SAI-thon',
              example:
                'Adding type annotations to Cython code can make numerical computations 100x faster than pure Python. = Aggiungere annotazioni di tipo al codice Cython può rendere i calcoli numerici 100 volte più veloci del puro Python.',
              context: 'ecosystem',
              difficulty: 'advanced',
              code: `# fib.pyx
def fib(int n):
    cdef int a = 0, b = 1, i
    for i in range(n):
        a, b = b, a + b
    return a`,
              task: 'Scrivi una funzione Fibonacci in Cython con tipi statici cdef per ottenere prestazioni vicine al C compilato.',
            },
            {
              english: 'Complexity Analysis',
              italian: 'Analisi della Complessit\u00E0',
              pronunciation: '/k\u0259m\u02C8pleks\u0259ti \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'com-PLES-siti a-NA-li-sis',
              example:
                'Algorithm complexity affects performance on large data. = La complessit\u00E0 algoritmica influisce sulle prestazioni con grandi dati.',
              context: 'computer-science',
              difficulty: 'intermediate',
            },
            {
              english: 'Memory Profiling',
              italian: 'Profilazione della Memoria',
              pronunciation: '/\u02C8mem\u0259ri \u02C8pro\u028Afa\u026Al\u026A\u014B/',
              phonetic: 'ME-mori PROU-failing',
              example:
                'Use a memory profiler to find memory leaks. = Usa un profiler di memoria per trovare i memory leak.',
              context: 'tools',
              difficulty: 'advanced',
              code: 'python -m memory_profiler script.py',
              task: 'Profila il consumo di memoria di script.py linea per linea per individuare allocazioni inattese o leak nella pipeline.',
            },
            {
              english: 'Overhead',
              italian: 'Sovraccarico (Overhead)',
              pronunciation: '/\u02CCo\u028Av\u0259r\u02C8hed/',
              phonetic: 'OU-ver-hed',
              example:
                'Abstract classes add a small performance overhead. = Le classi astratte aggiungono un piccolo sovraccarico prestazionale.',
              context: 'performance',
              difficulty: 'intermediate',
            },
            {
              english: 'Line Profiler',
              italian: 'Profilatore di Riga',
              pronunciation: '/la\u026An \u02C8pro\u028Afa\u026Al\u0259r/',
              phonetic: 'LAIN PROU-failer',
              example:
                'A line profiler shows which specific line is slow. = Un line profiler mostra quale riga specifica \u00E8 lenta.',
              context: 'tools',
              difficulty: 'advanced',
              code: 'kernprof -l -v script.py',
              task: 'Esegui kernprof per misurare il tempo speso su ogni singola riga del file script.py e individuare il punto piu lento.',
            },
            {
              english: 'Pre-allocation',
              italian: 'Pre-allocazione',
              pronunciation: '/\u02CCpri\u02D0\u00E6l\u0259\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'pri-al-lo-KEI-scion',
              example:
                'Pre-allocating a list can improve speed. = Pre-allocare una lista pu\u00F2 migliorare la velocit\u00E0.',
              context: 'performance',
              difficulty: 'advanced',
              code: `n = 10_000
result = [0] * n
for i in range(n):
    result[i] = i * i`,
              task: 'Pre-alloca una lista di diecimila elementi prima del ciclo cosi da evitare le riallocazioni interne dovute alle append.',
            },
          ],
        },
      ],
    },
    11: {
      name: 'Ecosistema Pro / Pro Ecosystem',
      description: 'Framework, librerie e deployment',
      lessons: [
        {
          id: 'py_web',
          title: 'Web Framework',
          description: 'Django, Flask, FastAPI...',
          items: [
            {
              english: 'Web Framework',
              italian: 'Infrastruttura Web (Framework)',
              pronunciation: '/web \u02C8fre\u026Amw\u025C\u02D0rk/',
              phonetic: 'UEB FREIM-uerk',
              example:
                'Choosing the right web framework depends on whether you need a full-stack solution or a lightweight microservice. = Scegliere il framework web giusto dipende dal fatto che ti serva una soluzione full-stack o un microservizio leggero.',
              context: 'web-development',
              difficulty: 'beginner',
            },
            {
              english: 'Django',
              italian: 'Framework Web Full-Stack (Django)',
              pronunciation: '/\u02C8d\u0292\u00E6\u014B\u0261o\u028A/',
              phonetic: 'GIAN-gou',
              example:
                'With Django you get an admin panel, ORM, and authentication system out of the box. = Con Django ottieni un pannello admin, ORM e sistema di autenticazione già pronti.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              note: 'Framework "full-stack" che include tutto: ORM, admin panel, auth.',
              code: `from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    published_at = models.DateTimeField(auto_now_add=True)`,
              task: 'Definisci un modello Django Article con titolo e data di pubblicazione cosi che ORM e admin lo riconoscano automaticamente.',
            },
            {
              english: 'Flask',
              italian: 'Micro-Framework Web (Flask)',
              pronunciation: '/fl\u00E6sk/',
              phonetic: 'FLASK',
              example:
                'Building a REST API with Flask requires just a few lines of code and a route decorator. = Costruire una REST API con Flask richiede solo poche righe di codice e un decoratore di rotta.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              note: 'Leggero e flessibile; lasci allo sviluppatore la scelta delle librerie extra.',
              code: `from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/health')
def health():
    return jsonify(status='ok')`,
              task: 'Costruisci una piccola app Flask che espone una rotta /health restituendo un JSON di stato per i probe di liveness.',
            },
            {
              english: 'FastAPI',
              italian: 'Framework Web Async (FastAPI)',
              pronunciation: '/\u02CCf\u0251\u02D0st e\u026A pi\u02D0 \u02C8a\u026A/',
              phonetic: 'FAST-ei-pi-ai',
              example: `Building an endpoint with FastAPI takes just a function plus a Pydantic model, and you get OpenAPI docs at /docs for free. = Costruire un endpoint con FastAPI richiede solo una funzione piu' un modello Pydantic, e ottieni la documentazione OpenAPI su /docs gratis.`,
              context: 'ecosystem',
              difficulty: 'intermediate',
              note: 'Basato su type hints e asyncio; genera automaticamente documentazione Swagger.',
              code: `from fastapi import FastAPI

app = FastAPI()

@app.get('/users/{user_id}')
def get_user(user_id: int):
    return {'id': user_id, 'name': 'Alice'}`,
              task: `Crea un endpoint FastAPI tipizzato che riceve un user_id intero dall'URL e restituisce l'utente corrispondente come JSON.`,
            },
            {
              english: 'WSGI (Web Server Gateway Interface)',
              italian: 'Interfaccia WSGI',
              pronunciation: '/\u02CCw\u026Az\u0261i/',
              phonetic: 'UIS-ghi',
              example: `Synchronous frameworks like Flask and Django talk to servers like Gunicorn through the WSGI standard interface. = I framework sincroni come Flask e Django parlano con server come Gunicorn tramite l'interfaccia standard WSGI.`,
              context: 'backend',
              difficulty: 'advanced',
              note: 'Standard per la comunicazione tra server web e app Python sincrone.',
            },
            {
              english: 'ASGI (Asynchronous Server Gateway Interface)',
              italian: 'Interfaccia ASGI',
              pronunciation: '/\u02CC\u00E6z\u0261i/',
              phonetic: 'AS-ghi',
              example:
                'FastAPI requires an ASGI server like Uvicorn. = FastAPI richiede un server ASGI come Uvicorn.',
              context: 'backend',
              difficulty: 'advanced',
              note: 'Il successore di WSGI, supporta la programmazione asincrona.',
            },
            {
              english: 'Template Engine',
              italian: 'Motore di Template',
              pronunciation: '/\u02C8temple\u026At \u02C8end\u0292\u026An/',
              phonetic: 'TEM-pleit EN-gin',
              example:
                'Jinja2 is the default template engine for Flask. = Jinja2 \u00E8 il motore di template predefinito per Flask.',
              context: 'web-development',
              difficulty: 'intermediate',
              code: `from jinja2 import Template

tpl = Template('Hello {{ name }}, you have {{ n }} messages.')
print(tpl.render(name='Alice', n=3))`,
              task: 'Usa il motore di template Jinja2 per renderizzare un saluto personalizzato passando nome e numero di messaggi come variabili.',
            },
            {
              english: 'Routing (Web)',
              italian: 'Instradamento (Routing)',
              pronunciation: '/\u02C8ru\u02D0t\u026A\u014B/',
              phonetic: 'RUU-ting',
              example:
                'The router maps URLs to Python functions. = Il router mappa gli URL alle funzioni Python.',
              context: 'web-development',
              difficulty: 'beginner',
              code: `@app.route('/products/<int:product_id>', methods=['GET', 'PUT'])
def product(product_id):
    return {'id': product_id}`,
              task: 'Definisci in Flask una rotta che gestisce GET e PUT sullo stesso URL parametrico per ottenere e aggiornare un prodotto.',
            },
            {
              english: 'Middleware (Web)',
              italian: 'Middleware Web',
              pronunciation: '/\u02C8m\u026Adlwe\u0259r/',
              phonetic: 'MID-del-uer',
              example:
                'Web middleware can process requests before they reach the view. = Il middleware web pu\u00F2 elaborare le richieste prima che arrivino alla vista.',
              context: 'web-development',
              difficulty: 'intermediate',
              note: 'In italiano si usa quasi sempre il prestito inglese middleware, anche al singolare.',
              code: `@app.middleware('http')
async def add_timing(request, call_next):
    start = time.time()
    response = await call_next(request)
    response.headers['X-Time'] = f'{time.time() - start:.3f}'
    return response`,
              task: 'Scrivi un middleware FastAPI che misura il tempo di ogni richiesta e lo aggiunge come header X-Time nella risposta.',
            },
            {
              english: 'Django ORM',
              italian: 'ORM di Django',
              pronunciation: '/\u02CCo\u028A \u02CC\u0251\u02D0r \u02CCem/',
              phonetic: 'ou-ar-EM',
              example:
                "Defining a model class with Django ORM automatically creates the corresponding database table and migrations. = Definire una classe modello con l'ORM di Django crea automaticamente la tabella del database e le migrazioni corrispondenti.",
              context: 'database',
              difficulty: 'intermediate',
              code: `recent = Article.objects.filter(published_at__year=2025).order_by('-published_at')[:10]`,
              task: `Recupera con l'ORM di Django i dieci articoli piu recenti pubblicati nel 2025 ordinati in ordine cronologico inverso.`,
            },
          ],
        },
        {
          id: 'py_data',
          title: 'Data Science',
          description: 'NumPy, pandas, matplotlib...',
          items: [
            {
              english: 'Data Science',
              italian: 'Scienza dei Dati',
              pronunciation: '/\u02C8de\u026At\u0259 \u02C8sa\u026A\u0259ns/',
              phonetic: 'DEI-ta SAI-ens',
              example:
                'Python is the leading language for data science. = Python \u00E8 il linguaggio leader per la data science.',
              context: 'data-science',
              difficulty: 'beginner',
            },
            {
              english: 'NumPy (Numerical Python)',
              italian: 'NumPy',
              pronunciation: '/\u02C8n\u028Cmpa\u026A/',
              phonetic: 'NAM-pai',
              example:
                'NumPy provides support for large multidimensional arrays. = NumPy supporta grandi array multidimensionali.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              note: 'Base fondamentale per quasi tutto il calcolo scientifico in Python.',
              code: `import numpy as np

arr = np.array([[1, 2], [3, 4]])
print(arr.mean(axis=0))`,
              task: `Crea una matrice NumPy due per due e calcola la media di ciascuna colonna con un'unica chiamata vettorializzata.`,
            },
            {
              english: 'Pandas (Data Analysis)',
              italian: 'Pandas',
              pronunciation: '/\u02C8p\u00E6nd\u0259z/',
              phonetic: 'PAN-das',
              example:
                "Pandas is used for data manipulation and analysis. = Pandas \u00E8 usato per la manipolazione e l'analisi dei dati.",
              context: 'ecosystem',
              difficulty: 'intermediate',
              code: `import pandas as pd

df = pd.read_csv('sales.csv')
top = df.groupby('region')['total'].sum().nlargest(5)`,
              task: 'Carica il file sales.csv in un dataframe pandas e calcola le cinque regioni con il fatturato totale piu alto.',
            },
            {
              english: 'Matplotlib',
              italian: 'Libreria Grafici (Matplotlib)',
              pronunciation: '/\u02C8m\u00E6tpl\u0252tl\u026Ab/',
              phonetic: 'MAT-plot-lib',
              example:
                'Use Matplotlib to create 2D graphs and plots. = Usa Matplotlib per creare grafici 2D.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              code: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3, 4], [1, 4, 9, 16])
plt.xlabel('x'); plt.ylabel('x^2')
plt.savefig('square.png')`,
              task: 'Disegna con Matplotlib la curva della funzione x al quadrato sui primi quattro interi e salva il grafico come square.png.',
            },
            {
              english: 'Scikit-learn',
              italian: 'Libreria Machine Learning (Scikit-learn)',
              pronunciation: '/\u02CCsa\u026Ak\u026At \u02C8l\u025C\u02D0rn/',
              phonetic: 'SAI-kit LERN',
              example:
                'Training a classification model with Scikit-learn requires just a few lines: fit, predict, and score. = Addestrare un modello di classificazione con Scikit-learn richiede solo poche righe: fit, predict e score.',
              context: 'ecosystem',
              difficulty: 'advanced',
              code: `from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)
accuracy = model.score(X_test, y_test)`,
              task: `Addestra un modello di regressione logistica con scikit-learn sui dati di training e misura l'accuratezza sul set di test.`,
            },
            {
              english: 'Jupyter Notebook',
              italian: 'Quaderno Interattivo (Jupyter Notebook)',
              pronunciation: '/\u02C8d\u0292u\u02D0p\u026At\u0259r \u02C8no\u028Atb\u028Ak/',
              phonetic: 'GIU-pi-ter NOUT-buk',
              example:
                'Data scientists use Jupyter Notebook to mix code, visualizations, and explanatory text in one document. = I data scientist usano Jupyter Notebook per mescolare codice, visualizzazioni e testo esplicativo in un solo documento.',
              context: 'tools',
              difficulty: 'beginner',
              code: 'pip install jupyterlab && jupyter lab --port 8888',
              task: 'Installa JupyterLab e avvia il server interattivo sulla porta 8888 per esplorare i dati in un notebook nel browser.',
            },
            {
              english: 'DataFrame',
              italian: 'Tabella Dati (DataFrame)',
              pronunciation: '/\u02C8de\u026At\u0259fre\u026Am/',
              phonetic: 'DEI-ta-freim',
              example:
                'A DataFrame is a 2D labeled data structure in Pandas. = Un DataFrame \u00E8 una struttura dati 2D in Pandas.',
              context: 'data-science',
              difficulty: 'intermediate',
              code: `import pandas as pd

df = pd.DataFrame({'name': ['Alice', 'Bob'], 'age': [30, 25]})
print(df[df.age > 26])`,
              task: 'Costruisci un DataFrame con nome ed eta di due persone e filtra le righe degli utenti con eta superiore a 26 anni.',
            },
            {
              english: 'Vectorization',
              italian: 'Vettorizzazione',
              pronunciation: '/\u02CCvekt\u0259ra\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'vec-to-ri-ZEI-scion',
              example:
                'Replacing a for loop with NumPy vectorization can speed up array operations by 100x or more. = Sostituire un ciclo for con la vettorizzazione di NumPy può velocizzare le operazioni su array di 100 volte o più.',
              context: 'performance',
              difficulty: 'advanced',
              note: 'Eseguire operazioni su interi array invece che su singoli elementi.',
              code: `import numpy as np

a = np.arange(1_000_000)
b = a * 2 + 1  # vettorializzato, niente for loop`,
              task: `Sostituisci un ciclo Python che moltiplica un milione di numeri con un'operazione vettorializzata di NumPy per ottenere uno speedup di cento volte.`,
            },
            {
              english: 'Data Cleaning',
              italian: 'Pulizia dei Dati',
              pronunciation: '/\u02C8de\u026At\u0259 \u02C8kli\u02D0n\u026A\u014B/',
              phonetic: 'DEITA CLIIN-ing',
              example:
                'Pandas methods like dropna(), fillna(), and str.strip() streamline data cleaning by handling missing values and whitespace in bulk. = I metodi Pandas come dropna(), fillna() e str.strip() semplificano la pulizia dei dati gestendo valori mancanti e spazi bianchi in blocco.',
              context: 'data-science',
              difficulty: 'beginner',
              code: `df = df.dropna(subset=['email'])
df['email'] = df['email'].str.strip().str.lower()`,
              task: 'Pulisci il dataframe rimuovendo le righe senza email e normalizzando il campo email in minuscolo senza spazi bianchi.',
            },
            {
              english: 'Tensor',
              italian: 'Tensore (Tensor)',
              pronunciation: '/\u02C8tens\u0259r/',
              phonetic: 'TEN-ser',
              example: `In PyTorch, a tensor is essentially an n-dimensional array that can live on the GPU and track gradients for backpropagation. = In PyTorch, un tensore e' essenzialmente un array n-dimensionale che puo' vivere sulla GPU e tracciare i gradienti per la backpropagation.`,
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Un array multidimensionale usato in PyTorch e TensorFlow.',
              code: `import torch

x = torch.tensor([[1.0, 2.0], [3.0, 4.0]], requires_grad=True)
y = (x ** 2).sum()
y.backward()`,
              task: 'Crea un tensore PyTorch due per due con gradienti attivi e calcola la backpropagation della somma dei quadrati.',
            },
          ],
        },
        {
          id: 'py_api',
          title: 'API Development',
          description: 'REST, serialization, middleware...',
          items: [
            {
              english: 'API Development',
              italian: 'Sviluppo di API',
              pronunciation:
                '/\u02CCe\u026A pi\u02D0 \u02C8a\u026A d\u026A\u02C8vel\u0259pm\u0259nt/',
              phonetic: 'ei-pi-ai di-VE-lop-ment',
              example:
                'Python is great for fast API development. = Python \u00E8 ottimo per lo sviluppo rapido di API.',
              context: 'backend',
              difficulty: 'beginner',
            },
            {
              english: 'Pydantic (Data validation)',
              italian: 'Validazione Dati (Pydantic)',
              pronunciation: '/pa\u026A\u02C8d\u00E6nt\u026Ak/',
              phonetic: 'pai-DAN-tik',
              example:
                'Pydantic uses Python type hints for data validation. = Pydantic usa i type hint di Python per la validazione dei dati.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              note: 'Fondamentale per FastAPI e lo sviluppo di API moderne.',
              code: `from pydantic import BaseModel, EmailStr

class User(BaseModel):
    name: str
    email: EmailStr
    age: int`,
              task: `Definisci un modello Pydantic User che valida automaticamente il formato dell'email e il tipo di ogni campo in ingresso.`,
            },
            {
              english: 'Marshmallow',
              italian: 'Serializzazione Oggetti (Marshmallow)',
              pronunciation: '/\u02C8m\u0251\u02D0r\u0283\u02CCm\u00E6lo\u028A/',
              phonetic: 'MARSC-mel-lou',
              example:
                'Defining a Marshmallow schema lets you validate and transform API input data in a single step. = Definire uno schema Marshmallow permette di validare e trasformare i dati di input API in un solo passaggio.',
              context: 'ecosystem',
              difficulty: 'intermediate',
              code: `from marshmallow import Schema, fields

class UserSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email()`,
              task: 'Definisci uno schema Marshmallow che valida nome obbligatorio ed email ben formata prima di salvare un nuovo utente.',
            },
            {
              english: 'Serializer',
              italian: 'Serializzatore',
              pronunciation: '/\u02C8s\u026Ari\u0259la\u026Az\u0259r/',
              phonetic: 'se-ria-LAI-ser',
              example:
                'A serializer converts DB models into JSON. = Un serializzatore converte i modelli del DB in JSON.',
              context: 'backend',
              difficulty: 'intermediate',
              code: `def serialize_user(user):
    return {'id': user.id, 'name': user.name, 'email': user.email}`,
              task: 'Scrivi un piccolo serializzatore che converte un modello User in un dizionario JSON-friendly omettendo i campi sensibili.',
            },
            {
              english: 'Endpoint (API)',
              italian: 'Punto di Accesso (Endpoint)',
              pronunciation: '/\u02C8endp\u0254\u026Ant/',
              phonetic: 'END-point',
              example:
                'Each API function is mapped to an endpoint. = Ogni funzione API \u00E8 mappata a un endpoint.',
              context: 'web-development',
              difficulty: 'beginner',
              code: `@app.post('/orders')
def create_order(order: OrderIn) -> OrderOut:
    saved = repo.save(order)
    return saved`,
              task: `Esponi un endpoint POST /orders che riceve un OrderIn validato da Pydantic e restituisce l'ordine salvato come OrderOut.`,
            },
            {
              english: 'Authentication (OAuth2/JWT)',
              italian: 'Autenticazione',
              pronunciation: '/\u0254\u02D0\u02CC\u03B8ent\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'o-then-ti-KEI-scen',
              example:
                "Secure your API using JWT authentication. = Proteggi la tua API usando l'autenticazione JWT.",
              context: 'security',
              difficulty: 'intermediate',
              code: `import jwt

token = jwt.encode({'sub': user_id, 'exp': expiry}, SECRET, algorithm='HS256')
payload = jwt.decode(token, SECRET, algorithms=['HS256'])`,
              task: `Firma un token JWT con l'identificatore utente e una scadenza e poi decodificalo verificando la firma con la stessa chiave.`,
            },
            {
              english: 'Swagger / OpenAPI',
              italian: 'Documentazione Automatica (Swagger)',
              pronunciation: '/\u02C8sw\u00E6\u0261\u0259r/',
              phonetic: 'SUA-gher',
              example:
                "Adding type hints and Pydantic models to your FastAPI endpoints automatically generates an interactive Swagger UI for testing and exploration. = Aggiungere type hint e modelli Pydantic ai tuoi endpoint FastAPI genera automaticamente un'interfaccia Swagger interattiva per test ed esplorazione.",
              context: 'documentation',
              difficulty: 'beginner',
            },
            {
              english: 'Reverse Proxy (Uvicorn/Gunicorn)',
              italian: 'Proxy Inverso',
              pronunciation: '/r\u026A\u02C8v\u025C\u02D0rs \u02C8pr\u0252ksi/',
              phonetic: 're-VERS PROC-si',
              example:
                'Use Nginx as a reverse proxy for Gunicorn. = Usa Nginx come reverse proxy per Gunicorn.',
              context: 'infrastructure',
              difficulty: 'advanced',
              code: 'gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app --bind 127.0.0.1:8000',
              task: 'Avvia gunicorn con quattro worker uvicorn dietro nginx, vincolandolo a localhost porta 8000 cosi che il proxy gestisca TLS.',
            },
            {
              english: 'Payload (JSON)',
              italian: 'Carico Utile (Payload)',
              pronunciation: '/\u02C8pe\u026Alo\u028Ad/',
              phonetic: 'PEI-loud',
              example:
                'The client sends the data in the request payload. = Il client invia i dati nel payload della richiesta.',
              context: 'web-development',
              difficulty: 'beginner',
              code: `import requests

resp = requests.post('https://api.example.com/users', json={'name': 'Alice', 'role': 'admin'})
print(resp.json())`,
              task: 'Invia una richiesta POST con requests passando il payload JSON come dizionario e stampa la risposta deserializzata.',
            },
            {
              english: 'Rate Limiting (API)',
              italian: 'Limitazione di Frequenza',
              pronunciation: '/re\u026At \u02C8l\u026Am\u026At\u026A\u014B/',
              phonetic: 'REIT LI-mi-ting',
              example:
                "Apply rate limiting to prevent API abuse. = Applica il rate limiting per prevenire l'abuso delle API.",
              context: 'security',
              difficulty: 'intermediate',
              code: `from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.get('/search')
@limiter.limit('10/minute')
def search(): ...`,
              task: `Applica con slowapi un limite di dieci richieste al minuto per IP all'endpoint /search per prevenire l'abuso delle API.`,
            },
          ],
        },
        {
          id: 'py_deploy',
          title: 'Deployment',
          description: 'Docker, CI/CD, packaging...',
          items: [
            {
              english: 'Deployment',
              italian: 'Distribuzione (Deploy)',
              pronunciation: '/d\u026A\u02C8pl\u0254\u026Am\u0259nt/',
              phonetic: 'di-PLOI-ment',
              example:
                "Setting up a CI/CD pipeline that runs tests, builds a Docker image, and deploys automatically reduces human error in the deployment process. = Configurare una pipeline CI/CD che esegue test, costruisce un'immagine Docker e distribuisce automaticamente riduce gli errori umani nel processo di deployment.",
              context: 'devops',
              difficulty: 'beginner',
            },
            {
              english: 'Docker (for Python)',
              italian: 'Docker',
              pronunciation: '/\u02C8d\u0252k\u0259r/',
              phonetic: 'DO-ker',
              example:
                'Containerize your app using a Dockerfile. = Crea un container per la tua app usando un Dockerfile.',
              context: 'infrastructure',
              difficulty: 'intermediate',
              code: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]`,
              task: 'Scrivi un Dockerfile minimale basato su python 3.12 slim che installa le dipendenze e avvia app.py come comando di default.',
            },
            {
              english: 'Gunicorn',
              italian: 'Server WSGI (Gunicorn)',
              pronunciation: '/\u02C8\u0261u\u02D0n\u026Ak\u0254\u02D0rn/',
              phonetic: 'GU-ni-corn',
              example:
                'Running your Flask app behind Gunicorn with multiple workers handles concurrent requests efficiently. = Eseguire la tua app Flask dietro Gunicorn con pi\u00F9 worker gestisce le richieste concorrenti in modo efficiente.',
              context: 'backend',
              difficulty: 'intermediate',
              code: 'gunicorn -w 4 --timeout 30 --access-logfile - app:app',
              task: `Avvia l'app WSGI con quattro worker gunicorn e timeout di trenta secondi, indirizzando il log degli accessi su stdout.`,
            },
            {
              english: 'Uvicorn',
              italian: 'Server ASGI (Uvicorn)',
              pronunciation: '/\u02C8ju\u02D0v\u026Ak\u0254\u02D0rn/',
              phonetic: 'IU-vi-corn',
              example:
                'Pairing FastAPI with Uvicorn gives you an async-native stack capable of handling thousands of connections. = Abbinare FastAPI con Uvicorn offre uno stack async-nativo capace di gestire migliaia di connessioni.',
              context: 'backend',
              difficulty: 'intermediate',
              code: 'uvicorn main:app --host 0.0.0.0 --port 8000 --workers 2 --reload',
              task: 'Avvia il server ASGI uvicorn esponendo main:app su tutte le interfacce con due worker e ricarica automatica per lo sviluppo.',
            },
            {
              english: 'Packaging',
              italian: 'Impacchettamento (Packaging)',
              pronunciation: '/\u02C8p\u00E6k\u026Ad\u0292\u026A\u014B/',
              phonetic: 'PA-keg-ing',
              example: `Modern Python packaging uses pyproject.toml plus tools like Poetry or Hatch to build wheels ready to upload to PyPI. = Il packaging Python moderno usa pyproject.toml piu' strumenti come Poetry o Hatch per costruire wheel pronti per il caricamento su PyPI.`,
              context: 'ecosystem',
              difficulty: 'advanced',
              code: 'python -m build && twine upload dist/*',
              task: 'Costruisci il pacchetto sorgente e il wheel a partire da pyproject.toml e poi caricali su PyPI con twine in un solo passaggio.',
            },
            {
              english: 'PyInstaller',
              italian: 'Compilatore (PyInstaller)',
              pronunciation: '/\u02CCpa\u026A \u026An\u02C8st\u0254\u02D0l\u0259r/',
              phonetic: 'PAI-in-staller',
              example: `Running pyinstaller --onefile app.py lets PyInstaller bundle the interpreter and all dependencies into a single executable. = Eseguire pyinstaller --onefile app.py permette a PyInstaller di impacchettare l'interprete e tutte le dipendenze in un singolo eseguibile.`,
              context: 'tools',
              difficulty: 'advanced',
              code: 'pyinstaller --onefile --name myapp app.py',
              task: 'Impacchetta app.py in un singolo eseguibile chiamato myapp con PyInstaller cosi da distribuirlo senza richiedere Python.',
            },
            {
              english: 'CI/CD (for Python)',
              italian: 'Integrazione/Distribuzione Continua',
              pronunciation: '/\u02CCsi\u02D0 a\u026A \u02CCsi\u02D0 di\u02D0/',
              phonetic: 'sii-ai-sii-dii',
              example: `A typical Python CI/CD pipeline runs ruff, mypy and pytest on every push, then publishes a wheel or Docker image on tag. = Una tipica pipeline CI/CD Python esegue ruff, mypy e pytest a ogni push, poi pubblica un wheel o un'immagine Docker al tag.`,
              context: 'devops',
              difficulty: 'intermediate',
            },
            {
              english: 'Sentry (Monitoring)',
              italian: 'Sentry / Monitoraggio Errori',
              pronunciation: '/\u02C8sentri/',
              phonetic: 'SEN-tri',
              example:
                'Sentry tracks real-time crashes in production. = Sentry traccia i crash in tempo reale in produzione.',
              context: 'tools',
              difficulty: 'intermediate',
              code: `import sentry_sdk

sentry_sdk.init(dsn='https://key@sentry.io/123', traces_sample_rate=0.1)`,
              task: 'Inizializza Sentry con il DSN del progetto e attiva il campionamento delle tracce al dieci percento per il monitoraggio in produzione.',
            },
            {
              english: 'Wheel (.whl)',
              italian: 'Wheel / Formato Pacchetto',
              pronunciation: '/wi\u02D0l/',
              phonetic: 'UIIL',
              example:
                'A Wheel is a built-package format for Python. = Un Wheel \u00E8 un formato di pacchetto pre-costruito per Python.',
              context: 'ecosystem',
              difficulty: 'advanced',
              note: 'Pi\u00F9 veloce da installare rispetto ai pacchetti sorgente.',
              code: 'pip wheel --no-deps -w dist/ .',
              task: 'Costruisci il file wheel del progetto corrente nella cartella dist senza includere le dipendenze, pronto per la distribuzione.',
            },
            {
              english: 'Cloud hosting',
              italian: 'Hosting in Cloud',
              pronunciation: '/kla\u028Ad \u02C8ho\u028Ast\u026A\u014B/',
              phonetic: 'CLAUD HOU-sting',
              example:
                'Deploy your Python API to AWS or Heroku. = Distribuisci la tua API Python su AWS o Heroku.',
              context: 'infrastructure',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },
  },
};
