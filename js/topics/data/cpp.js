/**
 * C++ PROGRAMMING TOPIC DATA - FlowLearn
 * ======================================
 *
 * 24 levels of English C++ programming terminology.
 * Each level has 4 lessons with 10 items each (40 per level).
 * Progression: C++ Foundations → Professional C++
 */

export default {
  id: 'cpp',
  levels: {
    // ════════════════════════════════════════════════
    // LEVEL 0 - FONDAMENTI C++ / C++ FOUNDATIONS
    // ════════════════════════════════════════════════
    0: {
      name: 'Fondamenti C++ / C++ Foundations',
      description: 'Le basi della programmazione C++',
      lessons: [
        {
          id: 'cpp_foundations_1',
          title: 'Hello World & Streams / Hello World e Stream',
          description: 'Primo programma e stream di I/O standard',
          items: [
            {
              english: 'Class',
              italian: 'Classe',
              pronunciation: '/klɑːs/',
              phonetic: 'KLAAS',
              example:
                'Every widget in the GUI is backed by a class that bundles state and behavior. = Ogni widget nella GUI si basa su una classe che unisce stato e comportamento.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `class Dog {
public:
    std::string name;
    void bark() { std::cout << "Woof!\\n"; }
};`,
              note: 'In C++ una classe combina dati e funzioni in un unico tipo.',
              task: 'Definisci una classe Dog che racchiuda stato e comportamento di un cane in un unico tipo.',
            },
            {
              english: 'Object',
              italian: 'Oggetto',
              pronunciation: '/ˈɒbdʒɪkt/',
              phonetic: 'OB-gekt',
              example:
                'When you write Dog rex;, you create an object on the stack. = Quando scrivi Dog rex;, crei un oggetto sullo stack.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `Dog rex;
rex.name = "Rex";
rex.bark();`,
              task: 'Istanzia sullo stack un oggetto rex di tipo Dog usando il costruttore di default.',
            },
            {
              english: 'Namespace',
              italian: 'Spazio dei nomi',
              pronunciation: '/ˈneɪmspeɪs/',
              phonetic: 'NEIM-speis',
              example:
                'Wrapping your code in a namespace prevents name collisions with third-party libraries. = Racchiudere il codice in un namespace previene conflitti di nomi con librerie di terze parti.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `namespace app {
    int version = 1;
    void run() { std::cout << version; }
}`,
              note: 'std è il namespace della libreria standard.',
              task: 'Racchiudi una variabile globale x in un namespace app per evitare collisioni di nomi con altre librerie.',
            },
            {
              english: 'std::cout',
              italian: 'Output standard C++',
              pronunciation: '/stændərd siː aʊt/',
              phonetic: 'STD-KAUT',
              example:
                'Debugging often starts by printing values with std::cout. = Il debug spesso inizia stampando valori con std::cout.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `int age = 25;
std::cout << "Age: " << age << "\\n";`,
              note: 'cout sta per "character output". Sostituisce printf in C++.',
              task: 'Stampa la stringa Hello seguita da un newline sullo standard output usando std::cout.',
            },
            {
              english: 'std::cin',
              italian: 'Input standard C++',
              pronunciation: '/stændərd siː ɪn/',
              phonetic: 'STD-SIN',
              example:
                "The program pauses at std::cin until the user types a value and presses Enter. = Il programma si ferma a std::cin finché l'utente digita un valore e preme Invio.",
              context: 'foundations',
              difficulty: 'beginner',
              code: `int n;
std::cout << "Enter a number: ";
std::cin >> n;`,
              task: `Leggi un intero dalla console nella variabile n usando std::cin e l'operatore di estrazione.`,
            },
            {
              english: 'Stream Insertion',
              italian: 'Inserimento nello stream',
              pronunciation: '/striːm ɪnˈsɜːrʃən/',
              phonetic: 'STRIIM in-SER-scion',
              example:
                'You can chain multiple values in a single stream insertion with <<. = Puoi concatenare più valori in un singolo inserimento nello stream con <<.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `int x = 10;
std::string label = "value";
std::cout << label << " = " << x << "\\n";`,
              task: `Concatena in una singola istruzione il valore di x e un newline sullo stream di output con l'operatore <<.`,
            },
            {
              english: 'Stream Extraction',
              italian: 'Estrazione dallo stream',
              pronunciation: '/striːm ɪkˈstrækʃən/',
              phonetic: 'STRIIM eks-TRAK-scion',
              example:
                "Each >> in a chain performs one stream extraction, parsing the next whitespace-delimited token. = Ogni >> in una catena esegue un'estrazione dallo stream, analizzando il prossimo token delimitato da spazi.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'std::cin >> x;',
              task: `Estrai un valore dallo standard input nella variabile x utilizzando l'operatore >>.`,
            },
            {
              english: 'Header',
              italian: 'Intestazione',
              pronunciation: '/ˈhedər/',
              phonetic: 'HED-er',
              example:
                'Without the correct header included, the compiler cannot find std::cout or std::vector. = Senza il corretto header incluso, il compilatore non trova std::cout o std::vector.',
              context: 'foundations',
              difficulty: 'beginner',
              code: '#include <iostream>',
              note: 'Gli header standard C++ non hanno estensione .h.',
              task: `Includi l'header standard iostream per poter usare gli stream di input e output.`,
            },
            {
              english: 'Main Function',
              italian: 'Funzione principale',
              pronunciation: '/meɪn ˈfʌŋkʃən/',
              phonetic: 'MEIN FANK-scen',
              example:
                'The OS calls the main function when the program launches, and its return value becomes the exit code. = Il sistema operativo chiama la funzione principale al lancio del programma, e il suo valore di ritorno diventa il codice di uscita.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `int main() {
    std::cout << "Hello, World!\\n";
    return 0;
}`,
              task: 'Scrivi la funzione main che restituisce 0 al sistema operativo come codice di uscita di successo.',
            },
            {
              english: 'Endline',
              italian: 'Fine riga',
              pronunciation: '/ˈendlaɪn/',
              phonetic: 'END-lain',
              example:
                'std::endl flushes the buffer and adds a newline. = std::endl svuota il buffer e aggiunge una nuova riga.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'std::cout << "hi" << std::endl;',
              note: 'Spesso "\\n" è preferibile per evitare flush non necessari.',
              task: 'Stampa la stringa hi seguita da std::endl per andare a capo e svuotare il buffer di output.',
            },
          ],
        },
        {
          id: 'cpp_foundations_2',
          title: 'Memory & Allocation / Memoria e Allocazione',
          description: 'Allocazione dinamica con new e delete',
          items: [
            {
              english: 'New Operator',
              italian: 'Operatore new',
              pronunciation: '/njuː ˈɒpəreɪtər/',
              phonetic: 'NIU OP-e-rei-tor',
              example:
                "When the size is unknown at compile time, the new operator lets you allocate memory at runtime. = Quando la dimensione non è nota a tempo di compilazione, l'operatore new permette di allocare memoria a runtime.",
              context: 'foundations',
              difficulty: 'beginner',
              code: `int* p = new int(5);
std::cout << *p << "\\n";
delete p;`,
              note: 'In C++ moderno è preferibile usare smart pointer.',
              task: `Alloca dinamicamente un singolo intero inizializzato a 5 sull'heap con l'operatore new.`,
            },
            {
              english: 'Delete Operator',
              italian: 'Operatore delete',
              pronunciation: '/dɪˈliːt ˈɒpəreɪtər/',
              phonetic: 'di-LIIT OP-e-rei-tor',
              example:
                "Forgetting the delete operator causes a memory leak that grows every iteration. = Dimenticare l'operatore delete causa un memory leak che cresce ad ogni iterazione.",
              context: 'foundations',
              difficulty: 'beginner',
              code: `int* p = new int(42);
std::cout << *p;
delete p;
p = nullptr;`,
              note: 'Per ogni new ci deve essere un delete corrispondente.',
              task: 'Libera la memoria puntata da p chiamando delete per evitare un memory leak.',
            },
            {
              english: 'Heap',
              italian: 'Memoria dinamica (heap)',
              pronunciation: '/hiːp/',
              phonetic: 'HIIP',
              example:
                "Objects whose lifetime must outlive the creating function are allocated on the heap. = Gli oggetti la cui vita deve superare la funzione creatrice vengono allocati sull'heap.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Detto anche "free store" in C++.',
            },
            {
              english: 'Stack',
              italian: 'Pila di chiamate (stack)',
              pronunciation: '/stæk/',
              phonetic: 'STAK',
              example:
                'When a function returns, all its local variables on the stack are automatically destroyed. = Quando una funzione ritorna, tutte le sue variabili locali sullo stack vengono distrutte automaticamente.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'int x = 5; // sullo stack',
              task: 'Dichiara una variabile locale x con valore 5 allocata automaticamente sullo stack.',
            },
            {
              english: 'Pointer',
              italian: 'Puntatore',
              pronunciation: '/ˈpɔɪntər/',
              phonetic: 'POIN-ter',
              example:
                'Passing a large struct by pointer avoids copying all its data. = Passare una struct grande per puntatore evita di copiarne tutti i dati.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `int x = 42;
int* p = &x;
std::cout << "Value: " << *p;`,
              task: `Crea un puntatore p a intero e fallo puntare all'indirizzo della variabile x.`,
            },
            {
              english: 'Dereference',
              italian: 'Dereferenziazione',
              pronunciation: '/diːˈrefərəns/',
              phonetic: 'di-REF-er-ens',
              example:
                "To read the value a pointer points to, you must dereference it with the * operator. = Per leggere il valore a cui punta un puntatore, devi dereferenziarlo con l'operatore *.",
              context: 'foundations',
              difficulty: 'beginner',
              code: `int x = 10;
int* p = &x;
int v = *p;
std::cout << v;`,
              task: `Leggi il valore puntato dal puntatore p applicando l'operatore di dereferenziazione * e copialo in v.`,
            },
            {
              english: 'Address-of',
              italian: 'Indirizzo di',
              pronunciation: '/əˈdres ɒv/',
              phonetic: 'a-DRES OV',
              example:
                "With the address-of operator &, you obtain the memory location where a variable is stored. = Con l'operatore address-of &, ottieni la posizione in memoria dove una variabile è memorizzata.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'int* p = &x;',
              task: `Ottieni l'indirizzo di memoria della variabile x con l'operatore & e salvalo in un puntatore p.`,
            },
            {
              english: 'Null Pointer',
              italian: 'Puntatore nullo',
              pronunciation: '/nʌl ˈpɔɪntər/',
              phonetic: 'NAL POIN-ter',
              example:
                'Dereferencing a null pointer causes undefined behavior, so always check before use. = Dereferenziare un puntatore nullo causa comportamento indefinito, quindi controlla sempre prima di usarlo.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `int* p = nullptr;
if (p == nullptr) {
    std::cout << "Pointer is null\\n";
}`,
              note: 'In C++ moderno usa nullptr al posto di NULL o 0.',
              task: 'Inizializza un puntatore p a nullptr per indicare esplicitamente che non punta a nulla.',
            },
            {
              english: 'Array New',
              italian: 'New per array',
              pronunciation: '/əˈreɪ njuː/',
              phonetic: 'a-REI NIU',
              example:
                'When reading N values from a file, array new allocates exactly N slots at runtime. = Quando si leggono N valori da un file, array new alloca esattamente N slot a runtime.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `int* arr = new int[5];
arr[0] = 10;
std::cout << arr[0];
delete[] arr;`,
              task: `Alloca dinamicamente sull'heap un array di 10 interi con la sintassi new int[10].`,
            },
            {
              english: 'Array Delete',
              italian: 'Delete per array',
              pronunciation: '/əˈreɪ dɪˈliːt/',
              phonetic: 'a-REI di-LIIT',
              example:
                'Calling array delete with delete[] ensures every element destructor runs before freeing the block. = Chiamare array delete con delete[] assicura che ogni distruttore di elemento venga eseguito prima di liberare il blocco.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'delete[] arr;',
              note: 'Mismatch tra new/new[] e delete/delete[] è undefined behavior.',
              task: 'Dealloca un array dinamico arr con delete[] per invocare il distruttore di ogni elemento.',
            },
          ],
        },
        {
          id: 'cpp_foundations_3',
          title: 'Compiling C++ / Compilazione C++',
          description: 'Compilatori, standard e flag base',
          items: [
            {
              english: 'Compiler',
              italian: 'Compilatore',
              pronunciation: '/kəmˈpaɪlər/',
              phonetic: 'com-PAI-ler',
              example:
                'Choosing the right compiler matters: g++ and clang++ support different warning sets. = La scelta del compilatore conta: g++ e clang++ supportano insiemi diversi di warning.',
              context: 'foundations',
              difficulty: 'beginner',
              command: 'g++ main.cpp -o main',
              tool: 'g++, clang++, MSVC',
              task: 'Compila main.cpp con g++ producendo un eseguibile chiamato main.',
            },
            {
              english: 'Standard Version',
              italian: 'Versione standard',
              pronunciation: '/ˈstændərd ˈvɜːrʒən/',
              phonetic: 'STAN-dard VER-scion',
              example:
                'Locking the standard version to C++20 ensures all developers compile with the same feature set. = Bloccare la versione standard a C++20 assicura che tutti gli sviluppatori compilino con lo stesso set di funzionalità.',
              context: 'foundations',
              difficulty: 'beginner',
              command: 'g++ -std=c++20 main.cpp',
              note: 'Comuni: c++11, c++14, c++17, c++20, c++23.',
              task: 'Compila main.cpp imponendo lo standard C++20 con il flag -std=c++20.',
            },
            {
              english: 'Source File',
              italian: 'File sorgente',
              pronunciation: '/sɔːrs faɪl/',
              phonetic: 'SORS FAIL',
              example:
                'Each translation unit typically corresponds to one source file compiled independently. = Ogni unità di traduzione corrisponde tipicamente a un file sorgente compilato indipendentemente.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Anche .cc, .cxx, .C sono usati.',
            },
            {
              english: 'Header File',
              italian: 'File di intestazione',
              pronunciation: '/ˈhedər faɪl/',
              phonetic: 'HED-er FAIL',
              example:
                'Splitting declarations into header files lets multiple source files share the same interface. = Separare le dichiarazioni in file di intestazione permette a più file sorgente di condividere la stessa interfaccia.',
              context: 'foundations',
              difficulty: 'beginner',
              code: '#include "myclass.h"',
              task: 'Includi il file di intestazione locale myclass.h con virgolette doppie per cercare prima nella directory corrente.',
            },
            {
              english: 'Object File',
              italian: 'File oggetto',
              pronunciation: '/ˈɒbdʒɪkt faɪl/',
              phonetic: 'OB-gekt FAIL',
              example:
                'Compiling each source into a separate object file speeds up rebuilds by recompiling only changed units. = Compilare ogni sorgente in un file oggetto separato velocizza le ricompilazioni ricompilando solo le unità modificate.',
              context: 'foundations',
              difficulty: 'beginner',
              command: 'g++ -c main.cpp',
              task: 'Genera il file oggetto di main.cpp con il flag -c senza linkare per accelerare le ricompilazioni successive.',
            },
            {
              english: 'Linker',
              italian: 'Collegatore (linker)',
              pronunciation: '/ˈlɪŋkər/',
              phonetic: 'LIN-ker',
              example:
                'After compilation, the linker resolves all cross-file references and produces the final binary. = Dopo la compilazione, il linker risolve tutti i riferimenti tra file e produce il binario finale.',
              context: 'foundations',
              difficulty: 'beginner',
              tool: 'ld, lld, gold',
            },
            {
              english: 'Warning Flag',
              italian: 'Flag di avviso',
              pronunciation: '/ˈwɔːrnɪŋ flæɡ/',
              phonetic: 'UOR-ning FLAG',
              example:
                'Enabling every warning flag during development catches bugs the compiler already knows about. = Abilitare ogni flag di avviso durante lo sviluppo cattura bug che il compilatore già conosce.',
              context: 'foundations',
              difficulty: 'beginner',
              command: 'g++ -Wall -Wextra -Wpedantic',
              note: 'I warning sono spesso bug nascosti.',
              task: 'Abilita i flag di avviso -Wall -Wextra -Wpedantic per intercettare il maggior numero di bug a tempo di compilazione.',
            },
            {
              english: 'Optimization Level',
              italian: 'Livello di ottimizzazione',
              pronunciation: '/ˌɒptɪmaɪˈzeɪʃən/',
              phonetic: 'op-ti-mai-ZEI-scion',
              example:
                'Raising the optimization level from -O0 to -O2 can reduce execution time by an order of magnitude. = Alzare il livello di ottimizzazione da -O0 a -O2 può ridurre il tempo di esecuzione di un ordine di grandezza.',
              context: 'foundations',
              difficulty: 'beginner',
              command: 'g++ -O2 main.cpp',
              note: '-O0 (debug), -O2 (release tipico), -O3 (aggressivo).',
              task: 'Compila main.cpp con livello di ottimizzazione -O2 per generare una build release performante.',
            },
            {
              english: 'Debug Symbols',
              italian: 'Simboli di debug',
              pronunciation: '/dɪˈbʌɡ ˈsɪmbəlz/',
              phonetic: 'di-BAG SIM-bols',
              example:
                'Without debug symbols, a crash in GDB shows only memory addresses instead of variable names. = Senza simboli di debug, un crash in GDB mostra solo indirizzi di memoria anziché nomi di variabili.',
              context: 'foundations',
              difficulty: 'beginner',
              command: 'g++ -g main.cpp',
              task: 'Aggiungi i simboli di debug a main.cpp con il flag -g per poter ispezionare variabili in GDB.',
            },
            {
              english: 'Executable',
              italian: 'Eseguibile',
              pronunciation: '/ɪɡˈzekjətəbl/',
              phonetic: 'eg-ZEK-iu-ta-bol',
              example:
                "Once the linker finishes, the resulting executable can run directly on the target OS. = Una volta che il linker termina, l'eseguibile risultante può girare direttamente sul sistema operativo target.",
              context: 'foundations',
              difficulty: 'beginner',
              command: 'g++ -o app main.cpp',
              task: `Compila main.cpp specificando con -o app il nome dell'eseguibile finale prodotto dal linker.`,
            },
          ],
        },
        {
          id: 'cpp_foundations_4',
          title: 'Basic Types / Tipi di Base',
          description: 'Tipi fondamentali in C++',
          items: [
            {
              english: 'Integer',
              italian: 'Intero',
              pronunciation: '/ˈɪntɪdʒər/',
              phonetic: 'IN-ti-ger',
              example:
                'Loop counters are typically declared as an integer since they count discrete steps. = I contatori di ciclo vengono tipicamente dichiarati come intero perché contano passi discreti.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'int x = 42;',
              task: 'Dichiara una variabile intera x inizializzata al valore 42 da usare come contatore.',
            },
            {
              english: 'Floating Point',
              italian: 'Virgola mobile',
              pronunciation: '/ˈfloʊtɪŋ pɔɪnt/',
              phonetic: 'FLOU-ting POINT',
              example:
                'Scientific simulations use floating point types because they need to represent fractional values. = Le simulazioni scientifiche usano tipi a virgola mobile perché devono rappresentare valori frazionari.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `double pi = 3.14159;
double r = 5.0;
std::cout << "Area: " << pi * r * r;`,
              task: 'Dichiara una variabile a virgola mobile di tipo double chiamata pi e inizializzala con il valore 3.14159.',
            },
            {
              english: 'Character',
              italian: 'Carattere',
              pronunciation: '/ˈkærɪktər/',
              phonetic: 'KA-rik-ter',
              example:
                'In C++ a character occupies exactly one byte, making it useful for raw byte buffers too. = In C++ un carattere occupa esattamente un byte, rendendolo utile anche per buffer di byte grezzi.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `char c = 'A';
char next = c + 1;
std::cout << c << " " << next;`,
              task: `Dichiara una variabile di tipo char chiamata c e inizializzala con il letterale 'A'.`,
            },
            {
              english: 'Boolean',
              italian: 'Booleano',
              pronunciation: '/ˈbuːliən/',
              phonetic: 'BUL-ian',
              example:
                'Guard conditions rely on a boolean to decide whether a function should proceed. = Le condizioni di guardia si basano su un booleano per decidere se una funzione debba procedere.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `bool ready = true;
bool done = false;
std::cout << std::boolalpha << ready << " " << done;`,
              note: 'In C++ esiste nativamente, in C serve <stdbool.h>.',
              task: 'Dichiara un flag booleano ready inizializzato a true per indicare uno stato attivo.',
            },
            {
              english: 'Void',
              italian: 'Tipo vuoto (void)',
              pronunciation: '/vɔɪd/',
              phonetic: 'VOID',
              example:
                'Logging helpers are often marked void because callers do not need a return value. = Le funzioni di logging sono spesso marcate void perché i chiamanti non necessitano di un valore di ritorno.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `void greet() {
    std::cout << "Hello!\\n";
}
// greet(); // call it`,
              task: 'Dichiara una funzione log che restituisce void perché non ha bisogno di restituire alcun valore.',
            },
            {
              english: 'Auto Type',
              italian: 'Tipo auto',
              pronunciation: '/ˈɔːtoʊ taɪp/',
              phonetic: 'OO-to TAIP',
              example:
                'Using auto type deduction keeps iterator declarations short and readable. = Usare la deduzione con tipo auto mantiene le dichiarazioni degli iteratori brevi e leggibili.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'auto x = 42; // int',
              note: 'Disponibile da C++11.',
              task: 'Sfrutta auto per dichiarare una variabile x inizializzata a 42 lasciando dedurre il tipo al compilatore.',
            },
            {
              english: 'Const Qualifier',
              italian: 'Qualificatore const',
              pronunciation: '/kɒnst ˈkwɒlɪfaɪər/',
              phonetic: 'KONST KUO-li-fai-er',
              example:
                'Marking a configuration limit with a const qualifier prevents accidental reassignment later. = Marcare un limite di configurazione con un qualificatore const previene riassegnamenti accidentali in seguito.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'const int MAX = 100;',
              task: 'Definisci una costante intera MAX con valore 100 usando il qualificatore const per impedirne la modifica.',
            },
            {
              english: 'Size Type',
              italian: 'Tipo size_t',
              pronunciation: '/saɪz taɪp/',
              phonetic: 'SAIZ TAIP',
              example:
                'Container methods return size type values, so comparing with a signed int triggers a warning. = I metodi dei container restituiscono valori di tipo size_t, quindi il confronto con un int con segno genera un warning.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'std::size_t n = v.size();',
              task: 'Memorizza la dimensione del container v in una variabile di tipo std::size_t per evitare warning di confronto.',
            },
            {
              english: 'Type Cast',
              italian: 'Cast di tipo',
              pronunciation: '/taɪp kɑːst/',
              phonetic: 'TAIP KAAST',
              example:
                'A type cast from double to int truncates the fractional part, so use it deliberately. = Un cast di tipo da double a int tronca la parte frazionaria, quindi usalo deliberatamente.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `double d = 3.99;
int x = static_cast<int>(d);
std::cout << x; // prints 3`,
              note: 'In C++ moderno evita i C-style cast.',
              task: 'Converti il letterale 3.14 in int usando static_cast e troncando esplicitamente la parte frazionaria.',
            },
            {
              english: 'Initialization',
              italian: 'Inizializzazione',
              pronunciation: '/ɪˌnɪʃəlaɪˈzeɪʃən/',
              phonetic: 'i-ni-scia-lai-ZEI-scion',
              example:
                "Brace initialization catches narrowing errors at compile time, making it safer than assignment. = L'inizializzazione con graffe cattura errori di narrowing a tempo di compilazione, rendendola più sicura dell'assegnamento.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'int x{5};',
              note: 'Detta uniform initialization, vieta narrowing conversions.',
              task: 'Inizializza un intero x al valore 5 con la sintassi a graffe per attivare il controllo contro le narrowing conversion.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 1 - DA C A C++ / C TO C++
    // ════════════════════════════════════════════════
    1: {
      name: 'Da C a C++ / C to C++',
      description: 'Le novità di C++ rispetto al C',
      lessons: [
        {
          id: 'cpp_foundations_5',
          title: 'References / Riferimenti',
          description: 'Riferimenti e differenze con i puntatori',
          items: [
            {
              english: 'Reference',
              italian: 'Riferimento',
              pronunciation: '/ˈrefərəns/',
              phonetic: 'REF-er-ens',
              example:
                "Using a reference to the large Config struct lets the printer access all fields without copying the entire object. = Usare un riferimento alla grande struct Config permette al printer di accedere a tutti i campi senza copiare l'intero oggetto.",
              context: 'foundations',
              difficulty: 'beginner',
              code: `int x = 10;
int& r = x;
r = 20;
std::cout << x; // prints 20`,
              note: 'A differenza dei puntatori, un riferimento non può essere null o riassegnato.',
              task: 'Crea un riferimento r legato alla variabile esistente x in modo che entrambi i nomi identifichino la stessa cella di memoria.',
            },
            {
              english: 'Lvalue Reference',
              italian: 'Riferimento lvalue',
              pronunciation: '/ˈelˌvæljuː ˈrefərəns/',
              phonetic: 'EL-val-iu REF-er-ens',
              example:
                'An lvalue reference binds to named variables. = Un riferimento lvalue si lega a variabili con nome.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'int& ref = x;',
              task: 'Dichiara un riferimento lvalue ref alla variabile con nome x per poterla manipolare senza copie.',
            },
            {
              english: 'Const Reference',
              italian: 'Riferimento const',
              pronunciation: '/kɒnst ˈrefərəns/',
              phonetic: 'KONST REF-er-ens',
              example:
                'A const reference cannot modify the target. = Un riferimento const non può modificare il target.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'void f(const std::string& s);',
              note: 'Il modo standard per passare oggetti grandi senza copiarli.',
              task: 'Dichiara una funzione f che accetta una std::string per riferimento const per evitare copie e proibire modifiche.',
            },
            {
              english: 'Pass by Reference',
              italian: 'Passaggio per riferimento',
              pronunciation: '/pæs baɪ ˈrefərəns/',
              phonetic: 'PAS BAI REF-er-ens',
              example:
                "The sort function takes the vector by reference so it can reorder elements in place without duplicating the entire container. = La funzione sort prende il vettore per riferimento così può riordinare gli elementi sul posto senza duplicare l'intero container.",
              context: 'foundations',
              difficulty: 'beginner',
              code: `void inc(int& n) { ++n; }
int x = 5;
inc(x);
std::cout << x; // 6`,
              task: 'Definisci la funzione inc che riceve un intero per riferimento e ne incrementa il valore originale di uno.',
            },
            {
              english: 'Pass by Value',
              italian: 'Passaggio per valore',
              pronunciation: '/pæs baɪ ˈvæljuː/',
              phonetic: 'PAS BAI VAL-iu',
              example:
                'Passing the small Point struct by value is safe and efficient since the copy fits in a register pair. = Passare la piccola struct Point per valore è sicuro ed efficiente poiché la copia sta in una coppia di registri.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `void f(int n) { n = 99; }
int x = 5;
f(x);
std::cout << x; // still 5`,
              task: 'Dichiara una funzione f che riceve un intero n per valore producendo una copia locale del parametro.',
            },
            {
              english: 'Return by Reference',
              italian: 'Ritorno per riferimento',
              pronunciation: '/rɪˈtɜːrn baɪ ˈrefərəns/',
              phonetic: 'ri-TERN BAI REF-er-ens',
              example:
                'Returning the internal buffer by reference from getBuffer() lets callers modify it in place without paying the cost of a deep copy. = Restituire il buffer interno per riferimento da getBuffer() permette ai chiamanti di modificarlo in-place senza pagare il costo di una copia profonda.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'int& at(std::vector<int>& v, int i);',
              note: 'Mai restituire un riferimento a una variabile locale.',
              task: `Dichiara la funzione at che restituisce per riferimento l'elemento i-esimo di un std::vector<int> per permettere modifiche in-place.`,
            },
            {
              english: 'Dangling Reference',
              italian: 'Riferimento pendente',
              pronunciation: '/ˈdæŋɡlɪŋ ˈrefərəns/',
              phonetic: 'DAN-gling REF-er-ens',
              example:
                'A dangling reference points to freed memory. = Un riferimento pendente punta a memoria liberata.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Causa undefined behavior se dereferenziato.',
            },
            {
              english: 'Reference vs Pointer',
              italian: 'Riferimento vs puntatore',
              pronunciation: '/ˈrefərəns vɜːrsəs ˈpɔɪntər/',
              phonetic: 'REF-er-ens VER-ses POIN-ter',
              example:
                'References are pointers without nullability. = I riferimenti sono puntatori senza nullabilità.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Preferisci riferimenti quando non serve nullable.',
            },
            {
              english: 'Range For Loop',
              italian: 'Ciclo for su range',
              pronunciation: '/reɪndʒ fɔːr luːp/',
              phonetic: 'REINGE FOR LUUP',
              example:
                'The logger uses a range-based for loop to print every entry in the message queue without managing index variables. = Il logger usa un ciclo range-based for per stampare ogni voce nella coda messaggi senza gestire variabili indice.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `std::vector<int> vec = {1, 2, 3};
for (auto& x : vec) {
    std::cout << x << " ";
}`,
              note: 'Disponibile da C++11.',
              task: 'Itera tutti gli elementi del container vec con un ciclo range-based for usando auto& per evitare copie.',
            },
            {
              english: 'Auto Reference',
              italian: 'Auto riferimento',
              pronunciation: '/ˈɔːtoʊ ˈrefərəns/',
              phonetic: 'OO-to REF-er-ens',
              example:
                'Declaring loop variables with auto& avoids copying each element while letting the compiler deduce the exact type. = Dichiarare le variabili del loop con auto& evita di copiare ogni elemento lasciando al compilatore di dedurre il tipo esatto.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'for (auto& item : vec) { /* ... */ }',
              task: 'Scorri vec catturando ogni elemento come auto& item per modificarlo in-place senza specificare il tipo esplicito.',
            },
          ],
        },
        {
          id: 'cpp_foundations_6',
          title: 'Function Overloading / Sovraccarico Funzioni',
          description: 'Sovraccarico e argomenti di default',
          items: [
            {
              english: 'Function Overloading',
              italian: 'Sovraccarico di funzioni',
              pronunciation: '/ˈfʌŋkʃən ˌoʊvərˈloʊdɪŋ/',
              phonetic: 'FANK-scen O-ver-LOU-ding',
              example:
                'Defining two overloads of print, one for int and one for std::string, demonstrates function overloading and lets the compiler pick the right one. = Definire due overload di print, uno per int e uno per std::string, dimostra il sovraccarico di funzioni e lascia che il compilatore scelga quello giusto.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
std::cout << add(1, 2) << " " << add(1.5, 2.5);`,
              note: 'Non disponibile in C standard.',
              task: 'Dichiara due overload della funzione add: uno per coppie di int e uno per coppie di double.',
            },
            {
              english: 'Function Signature',
              italian: 'Firma della funzione',
              pronunciation: '/ˈfʌŋkʃən ˈsɪɡnətʃər/',
              phonetic: 'FANK-scen SIG-na-cer',
              example:
                'The signature includes name and parameter types. = La firma include nome e tipi dei parametri.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Il tipo di ritorno NON fa parte della firma per overload.',
            },
            {
              english: 'Default Argument',
              italian: 'Argomento di default',
              pronunciation: '/dɪˈfɔːlt ˈɑːrɡjumənt/',
              phonetic: 'di-FOLT AR-giu-ment',
              example:
                'The logger function declares a level parameter with a default argument of INFO so callers can omit it when they want the standard verbosity. = La funzione di logging dichiara un parametro livello con un argomento di default INFO così i chiamanti possono ometterlo quando vogliono la verbosità standard.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `void greet(std::string name = "World") {
    std::cout << "Hello, " << name << "!\\n";
}
// greet(); greet("Alice");`,
              note: 'I default si specificano solo nella dichiarazione.',
              task: 'Dichiara la funzione f con un argomento di default x pari a 0 per permettere chiamate senza argomenti.',
            },
            {
              english: 'Inline Function',
              italian: 'Funzione inline',
              pronunciation: '/ˌɪnˈlaɪn ˈfʌŋkʃən/',
              phonetic: 'in-LAIN FANK-scen',
              example:
                'inline suggests the compiler expand the call. = inline suggerisce al compilatore di espandere la chiamata.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `inline int sq(int x) { return x * x; }
int result = sq(5);
std::cout << result; // 25`,
              note: 'Oggi serve più per linkage che per ottimizzazione.',
              task: 'Definisci una funzione inline sq che restituisce il quadrato di un intero suggerendo al compilatore di espanderla.',
            },
            {
              english: 'Const Method',
              italian: 'Metodo const',
              pronunciation: '/kɒnst ˈmeθəd/',
              phonetic: 'KONST ME-tod',
              example:
                "A const method does not modify the object. = Un metodo const non modifica l'oggetto.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'int size() const;',
              task: `Dichiara un metodo size marcato const che restituisce un intero senza modificare lo stato dell'oggetto.`,
            },
            {
              english: 'String Object',
              italian: 'Oggetto stringa',
              pronunciation: '/strɪŋ ˈɒbdʒɪkt/',
              phonetic: 'STRING OB-gekt',
              example:
                "The chat application stores each incoming message in a std::string that automatically manages its own memory as text grows. = L'applicazione di chat memorizza ogni messaggio in arrivo in una std::string che gestisce automaticamente la propria memoria man mano che il testo cresce.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'std::string s = "hello";',
              note: 'Sostituisce char* con gestione automatica della memoria.',
              task: 'Crea un oggetto std::string chiamato s inizializzato con il letterale hello e dotato di gestione automatica della memoria.',
            },
            {
              english: 'String Concatenation',
              italian: 'Concatenazione di stringhe',
              pronunciation: '/strɪŋ kənˌkætɪˈneɪʃən/',
              phonetic: 'STRING kon-kat-ti-NEI-scion',
              example:
                "The greeting builder joins the user name and a welcome message with the + operator to concatenate strings. = Il costruttore di saluti unisce il nome utente e un messaggio di benvenuto con l'operatore + per concatenare stringhe.",
              context: 'foundations',
              difficulty: 'beginner',
              code: `std::string a = "Hello";
std::string b = " World";
std::string s = a + b;
std::cout << s;`,
              task: `Concatena due std::string a e b con l'operatore + e salva il risultato in una nuova stringa s.`,
            },
            {
              english: 'String Length',
              italian: 'Lunghezza stringa',
              pronunciation: '/strɪŋ leŋθ/',
              phonetic: 'STRING LENGT',
              example:
                "Before truncating user input, the validator checks the string length with .size() to decide whether trimming is needed. = Prima di troncare l'input utente, il validatore controlla la lunghezza della stringa con .size() per decidere se serve il taglio.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'auto n = s.size();',
              task: 'Ricava la lunghezza della stringa s invocando il metodo size() e salvala in una variabile auto.',
            },
            {
              english: 'String Literal',
              italian: 'Letterale stringa',
              pronunciation: '/strɪŋ ˈlɪtərəl/',
              phonetic: 'STRING LI-te-ral',
              example:
                'Passing a string literal like "config.json" to the file-open function implicitly converts it to std::string. = Passare un letterale stringa come "config.json" alla funzione di apertura file lo converte implicitamente in std::string.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'auto s = "hello"s; // C++14',
              task: 'Crea una std::string s dal letterale hello usando il suffisso s introdotto in C++14.',
            },
            {
              english: 'C-Style String',
              italian: 'Stringa stile C',
              pronunciation: '/siː staɪl strɪŋ/',
              phonetic: 'SI STAIL STRING',
              example:
                'A C-style string is a null-terminated char array. = Una stringa stile C è un array di char terminato da null.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'const char* s = "hi";',
              task: 'Dichiara una stringa stile C come puntatore const char* inizializzato con il letterale hi terminato da null.',
            },
          ],
        },
        {
          id: 'cpp_foundations_7',
          title: 'Bool & Enum Class / Bool e Enum Class',
          description: 'Tipi enumerati e bool nativo',
          items: [
            {
              english: 'Boolean Literal',
              italian: 'Letterale booleano',
              pronunciation: '/ˈbuːliən ˈlɪtərəl/',
              phonetic: 'BUL-ian LI-te-ral',
              example:
                "The initialization flag is set to the boolean literal false at program start and flipped to true after loading completes. = Il flag di inizializzazione viene impostato al letterale booleano false all'avvio del programma e cambiato a true dopo il completamento del caricamento.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'bool ok = true;',
              task: `Assegna il letterale booleano true al flag ok per indicare che un'operazione è andata a buon fine.`,
            },
            {
              english: 'Logical Operator',
              italian: 'Operatore logico',
              pronunciation: '/ˈlɒdʒɪkl ˈɒpəreɪtər/',
              phonetic: 'LO-gi-kol OP-e-rei-tor',
              example: `The validator uses the && logical operator to require that both username and password fields are non-empty before submitting the form. = Il validatore usa l'operatore logico && per richiedere che sia il campo username che password siano non vuoti prima di inviare il form.`,
              context: 'foundations',
              difficulty: 'beginner',
              code: 'if (a && b) { /* ... */ }',
              task: `Combina due condizioni a e b con l'operatore logico && in un if per eseguire un blocco solo se entrambe sono vere.`,
            },
            {
              english: 'Short Circuit',
              italian: 'Corto circuito',
              pronunciation: '/ʃɔːrt ˈsɜːrkɪt/',
              phonetic: 'SCIORT SER-kit',
              example:
                "Writing ptr && ptr->valid() is safe because the logical AND operator uses short-circuit evaluation, skipping the dereference when ptr is null. = Scrivere ptr && ptr->valid() è sicuro perché l'operatore AND logico usa la valutazione in corto circuito, saltando la dereferenziazione quando ptr è null.",
              context: 'foundations',
              difficulty: 'beginner',
              note: '&& non valuta b se a è false; || non valuta b se a è true.',
            },
            {
              english: 'Enum',
              italian: 'Enumerazione',
              pronunciation: '/ɪˈnʌm/',
              phonetic: 'i-NAM',
              example:
                'The network protocol handler uses an enum to map each message type to a named constant like CONNECT or DISCONNECT. = Il gestore del protocollo di rete usa un enum per mappare ogni tipo di messaggio a una costante con nome come CONNECT o DISCONNECT.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `enum Color { RED, GREEN, BLUE };
Color c = GREEN;
std::cout << c; // prints 1`,
              task: `Definisci un'enumerazione Color con i tre valori RED, GREEN e BLUE per rappresentare i canali base.`,
            },
            {
              english: 'Enum Class',
              italian: 'enum class',
              pronunciation: '/ɪˈnʌm klɑːs/',
              phonetic: 'i-NAM KLAAS',
              example:
                'Declaring HttpStatus as an enum class keeps its OK constant scoped, so it does not collide with a macro named OK from a legacy C header. = Dichiarare HttpStatus come enum class mantiene la sua costante OK con scope, così non entra in conflitto con una macro OK di un vecchio header C.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `enum class Color { Red, Green, Blue };
Color c = Color::Green;
if (c == Color::Green) std::cout << "Green";`,
              note: 'Termine C++: enum class (parola chiave del linguaggio, non si traduce).',
              task: 'Dichiara un enum class Color con i valori Red e Green per ottenere costanti con scope forte e tipizzate.',
            },
            {
              english: 'Scoped Enum',
              italian: 'Enum con scope',
              pronunciation: '/skoʊpt ɪˈnʌm/',
              phonetic: 'SKOUPT i-NAM',
              example:
                'Using a scoped enum for the HTTP status codes prevents the name OK from clashing with a macro defined in a third-party header. = Usare un enum con scope per i codici di stato HTTP impedisce che il nome OK entri in conflitto con una macro definita in un header di terze parti.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'Color c = Color::Red;',
              task: 'Assegna il valore Color::Red alla variabile c sfruttando uno scoped enum per evitare collisioni di nomi.',
            },
            {
              english: 'Underlying Type',
              italian: 'Tipo sottostante',
              pronunciation: '/ˌʌndərˈlaɪɪŋ taɪp/',
              phonetic: 'an-der-LAI-ing TAIP',
              example:
                "Setting the underlying type of the StatusCode enum to uint8_t keeps the packet header small when serialized to the wire. = Impostare il tipo sottostante dell'enum StatusCode a uint8_t mantiene l'header del pacchetto piccolo quando serializzato sulla rete.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'enum class Code : uint8_t { A, B };',
              task: `Definisci un enum class Code con tipo sottostante uint8_t per limitarne l'occupazione di memoria a un byte.`,
            },
            {
              english: 'Switch Statement',
              italian: 'Istruzione switch',
              pronunciation: '/swɪtʃ ˈsteɪtmənt/',
              phonetic: 'SUICI STEIT-ment',
              example:
                "The command dispatcher uses a switch statement on the Action enum to route each user request to the correct handler. = Il dispatcher dei comandi usa un'istruzione switch sull'enum Action per instradare ogni richiesta utente al gestore corretto.",
              context: 'foundations',
              difficulty: 'beginner',
              code: `int x = 2;
switch (x) {
    case 1: std::cout << "one"; break;
    case 2: std::cout << "two"; break;
    default: std::cout << "other";
}`,
              task: `Scrivi un'istruzione switch su una variabile c di tipo Color con un case dedicato a Color::Red.`,
            },
            {
              english: 'Case Label',
              italian: 'Etichetta case',
              pronunciation: '/keɪs ˈleɪbl/',
              phonetic: 'KEIS LEI-bol',
              example:
                'Each case label inside the parser switch maps a token type like IDENTIFIER or NUMBER to its dedicated parsing routine. = Ogni etichetta case dentro lo switch del parser mappa un tipo di token come IDENTIFIER o NUMBER alla sua routine di parsing dedicata.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'case 1: doSomething(); break;',
              task: `Aggiungi un'etichetta case 1 in uno switch che chiama doSomething() e termina con break per evitare il fall-through.`,
            },
            {
              english: 'Constexpr',
              italian: 'constexpr',
              pronunciation: '/kɒnstˈekspər/',
              phonetic: 'kons-TEK-sper',
              example:
                'Marking the sq function as constexpr lets the compiler evaluate sq(7) at compile time and embed the constant 49 directly into the generated code. = Marcare la funzione sq come constexpr permette al compilatore di valutare sq(7) a tempo di compilazione e incorporare la costante 49 direttamente nel codice generato.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `constexpr int sq(int x) { return x * x; }
constexpr int val = sq(5);
std::cout << val; // 25`,
              note: 'Termine C++: constexpr (parola chiave del linguaggio, non si traduce).',
              task: 'Marca la funzione sq come constexpr in modo che il compilatore possa valutarla a tempo di compilazione.',
            },
          ],
        },
        {
          id: 'cpp_foundations_8',
          title: 'Stream I/O / I/O con Stream',
          description: 'I/O standard, manipolatori e file',
          items: [
            {
              english: 'iostream',
              italian: 'Libreria di I/O standard (iostream)',
              pronunciation: '/ˈaɪoʊstriːm/',
              phonetic: 'AI-o-striim',
              example:
                'Including iostream at the top of your file gives access to console input and output streams. = Includere iostream in cima al file dà accesso agli stream di input e output della console.',
              context: 'foundations',
              difficulty: 'beginner',
              code: '#include <iostream>',
              task: `Includi l'header iostream per abilitare gli stream standard di input e output nel tuo file.`,
            },
            {
              english: 'std::cerr',
              italian: 'Errore standard',
              pronunciation: '/stændərd siː ɛr/',
              phonetic: 'STD-SER',
              example:
                'The crash handler writes the stack trace to std::cerr because standard error is unbuffered and survives abrupt termination. = Il gestore di crash scrive lo stack trace su std::cerr perché lo standard error non è bufferizzato e sopravvive a terminazioni improvvise.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'std::cerr << "Error\\n";',
              task: 'Scrivi il messaggio Error sullo standard error con std::cerr per garantire la stampa anche dopo un crash.',
            },
            {
              english: 'std::clog',
              italian: 'Log standard',
              pronunciation: '/stændərd siː lɒɡ/',
              phonetic: 'STD-KLOG',
              example:
                'Diagnostic messages go to std::clog because its buffered output avoids the per-line flush overhead of cerr during heavy logging. = I messaggi diagnostici vanno su std::clog perché il suo output bufferizzato evita il costo del flush per riga di cerr durante il logging intenso.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'std::clog << "info\\n";',
              task: 'Scrivi un messaggio info sul log standard std::clog sfruttandone il buffering per ridurre il costo di I/O.',
            },
            {
              english: 'Stream Manipulator',
              italian: 'Manipolatore di stream',
              pronunciation: '/striːm məˈnɪpjəleɪtər/',
              phonetic: 'STRIIM ma-NI-piu-lei-tor',
              example:
                'The report formatter aligns columns by applying the stream manipulator std::setw(12) before printing each price. = Il formattatore di report allinea le colonne applicando il manipolatore di stream std::setw(12) prima di stampare ogni prezzo.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'std::cout << std::setw(5) << x;',
              note: 'Richiede <iomanip>.',
              task: `Applica il manipolatore di stream std::setw(5) prima di stampare x per allineare l'output su 5 colonne.`,
            },
            {
              english: 'File Stream',
              italian: 'Stream di file',
              pronunciation: '/faɪl striːm/',
              phonetic: 'FAIL STRIIM',
              example:
                'The config loader opens settings.json through a file stream and feeds each line into the parser. = Il caricatore di configurazione apre settings.json attraverso un file stream e passa ogni riga al parser.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `std::ifstream f("data.txt");
std::string line;
while (std::getline(f, line)) {
    std::cout << line << "\\n";
}`,
              task: 'Apri il file data.txt in lettura tramite uno stream std::ifstream chiamato f.',
            },
            {
              english: 'Output File Stream',
              italian: 'Stream di output su file',
              pronunciation: '/ˈaʊtpʊt faɪl striːm/',
              phonetic: 'AUT-put FAIL STRIIM',
              example:
                'At the end of the benchmark, the profiler opens an output file stream to save timing data in CSV format. = Alla fine del benchmark, il profiler apre un output file stream per salvare i dati di timing in formato CSV.',
              context: 'foundations',
              difficulty: 'beginner',
              code: `std::ofstream out("log.txt");
out << "Hello file!" << std::endl;
out.close();`,
              task: 'Apri il file log.txt in scrittura attraverso uno stream di output std::ofstream chiamato out.',
            },
            {
              english: 'GetLine',
              italian: 'Lettura riga',
              pronunciation: '/ɡɛtˈlaɪn/',
              phonetic: 'get-LAIN',
              example:
                "The command-line shell uses std::getline to capture the full user input including spaces, which cin >> alone would split. = La shell a riga di comando usa std::getline per catturare l'intero input utente inclusi gli spazi, che cin >> da solo dividerebbe.",
              context: 'foundations',
              difficulty: 'beginner',
              code: `std::string line;
std::cout << "Enter text: ";
std::getline(std::cin, line);
std::cout << "You said: " << line;`,
              note: 'Necessario perché >> si ferma agli spazi bianchi.',
              task: `Leggi un'intera riga di testo dallo standard input nella variabile line con std::getline preservando gli spazi.`,
            },
            {
              english: 'Buffer Flush',
              italian: 'Svuotamento del buffer',
              pronunciation: '/ˈbʌfər flʌʃ/',
              phonetic: 'BAF-fer FLAS',
              example:
                "The progress indicator inserts std::flush after each percentage update so the user sees the change immediately instead of waiting for a full buffer. = L'indicatore di progresso inserisce std::flush dopo ogni aggiornamento percentuale così l'utente vede il cambiamento immediatamente invece di attendere un buffer pieno.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'std::cout << "x" << std::flush;',
              task: 'Forza lo svuotamento del buffer di std::cout dopo aver stampato la lettera x usando std::flush.',
            },
            {
              english: 'Stream State',
              italian: 'Stato dello stream',
              pronunciation: '/striːm steɪt/',
              phonetic: 'STRIIM STEIT',
              example:
                'After opening the database file, the loader checks the stream state with good() before attempting to read records. = Dopo aver aperto il file del database, il loader controlla lo stato dello stream con good() prima di tentare di leggere i record.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'if (in.good()) { /* ... */ }',
              task: 'Verifica con il metodo good() che lo stream in sia in stato valido prima di leggere ulteriori dati.',
            },
            {
              english: 'EOF',
              italian: 'Fine del file',
              pronunciation: '/iː oʊ ɛf/',
              phonetic: 'I-O-EF',
              example:
                'The line reader keeps extracting records until eof() signals that the input file has been fully consumed. = Il lettore di righe continua a estrarre record finché eof() segnala che il file di input è stato completamente consumato.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'while (!in.eof()) { /* ... */ }',
              note: 'Spesso meglio controllare il risultato della lettura.',
              task: 'Itera lo stream di input in finché eof() non segnala il raggiungimento della fine del file.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 2 - CLASSI E OGGETTI / CLASSES & OBJECTS
    // ════════════════════════════════════════════════
    2: {
      name: 'Classi e Oggetti / Classes & Objects',
      description: 'Costruzione delle classi e dei loro membri',
      lessons: [
        {
          id: 'cpp_oop_1',
          title: 'Class Anatomy / Anatomia di una Classe',
          description: 'Struttura di una classe e suoi componenti',
          items: [
            {
              english: 'Member Variable',
              italian: 'Variabile membro',
              pronunciation: '/ˈmembər ˈveəriəbl/',
              phonetic: 'MEM-ber VE-ri-a-bol',
              example:
                'The Player class stores health and position as member variables so every method can access and modify them. = La classe Player memorizza vita e posizione come variabili membro così ogni metodo può accedervi e modificarle.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Circle {
public:
    double radius = 1.0;
    double area() { return 3.14 * radius * radius; }
};`,
              note: 'Detta anche field o data member.',
              task: 'Definisci una classe A con una variabile membro intera x che ne rappresenta lo stato interno.',
            },
            {
              english: 'Member Function',
              italian: 'Funzione membro',
              pronunciation: '/ˈmembər ˈfʌŋkʃən/',
              phonetic: 'MEM-ber FANK-scen',
              example:
                'A member function operates on member data. = Una funzione membro opera sui dati membro.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Greeter {
public:
    void hello() { std::cout << "Hello!\\n"; }
};
Greeter g; g.hello();`,
              note: 'Detta anche metodo.',
              task: `Aggiungi alla classe A una funzione membro run che agisce sui dati membro dell'oggetto.`,
            },
            {
              english: 'Constructor',
              italian: 'Costruttore',
              pronunciation: '/kənˈstrʌktər/',
              phonetic: 'kon-STRAK-tor',
              example:
                "The DatabaseConnection constructor opens the socket and authenticates, so the object is fully ready to use as soon as it is created. = Il costruttore di DatabaseConnection apre il socket e autentica, così l'oggetto è completamente pronto all'uso appena creato.",
              context: 'oop',
              difficulty: 'beginner',
              code: `class Box {
    int size;
public:
    Box(int s) : size(s) {}
    int getSize() { return size; }
};`,
              task: `Aggiungi un costruttore di default alla classe A che inizializza l'oggetto al momento della creazione.`,
            },
            {
              english: 'Destructor',
              italian: 'Distruttore',
              pronunciation: '/dɪˈstrʌktər/',
              phonetic: 'di-STRAK-tor',
              example:
                "When the FileHandle goes out of scope, its destructor automatically closes the underlying OS handle. = Quando il FileHandle esce dallo scope, il suo distruttore chiude automaticamente l'handle OS sottostante.",
              context: 'oop',
              difficulty: 'beginner',
              code: `class Logger {
public:
    Logger() { std::cout << "Created\\n"; }
    ~Logger() { std::cout << "Destroyed\\n"; }
};`,
              note: 'La tilde ~ identifica il distruttore.',
              task: 'Dichiara un distruttore ~A() vuoto sulla classe A per rilasciare automaticamente le risorse a fine vita.',
            },
            {
              english: 'This Pointer',
              italian: 'Puntatore this',
              pronunciation: '/ðɪs ˈpɔɪntər/',
              phonetic: 'DIS POIN-ter',
              example:
                'The fluent builder returns *this from each setter, so the caller can chain calls like b.setWidth(10).setHeight(20). = Il builder fluente restituisce *this da ogni setter, così il chiamante può concatenare chiamate come b.setWidth(10).setHeight(20).',
              context: 'oop',
              difficulty: 'beginner',
              code: 'this->x = 5;',
              task: `Assegna il valore 5 alla variabile membro x tramite il puntatore this all'interno di un metodo.`,
            },
            {
              english: 'Object Instance',
              italian: 'Istanza di oggetto',
              pronunciation: '/ˈɒbdʒɪkt ˈɪnstəns/',
              phonetic: 'OB-gekt IN-stans',
              example:
                'Creating two separate Logger instances lets each object instance write to a different file without interference. = Creare due istanze Logger separate permette a ogni istanza di oggetto di scrivere su un file diverso senza interferenze.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'A a1, a2;',
              task: 'Crea due istanze indipendenti a1 e a2 della classe A sullo stack con una sola dichiarazione.',
            },
            {
              english: 'Class Definition',
              italian: 'Definizione di classe',
              pronunciation: '/klɑːs ˌdefɪˈnɪʃən/',
              phonetic: 'KLAAS de-fi-NI-scion',
              example:
                'A class definition declares its interface. = Una definizione di classe dichiara la sua interfaccia.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Box {
    int width, height;
public:
    Box(int w, int h) : width(w), height(h) {}
    int area() { return width * height; }
};`,
              note: 'Termina sempre con un punto e virgola.',
              task: 'Scrivi la definizione di una classe Box terminandola correttamente con il punto e virgola finale.',
            },
            {
              english: 'Struct',
              italian: 'Aggregato di campi (struct)',
              pronunciation: '/strʌkt/',
              phonetic: 'STRAKT',
              example:
                'A struct is a class with public default. = Una struct è una classe con default public.',
              context: 'oop',
              difficulty: 'beginner',
              code: `struct Point {
    int x, y;
};
Point p{3, 4};
std::cout << p.x << ", " << p.y;`,
              note: 'Convenzionalmente usata per dati puri.',
              task: 'Definisci una struct Point con due campi interi pubblici x e y per rappresentare una coordinata 2D.',
            },
            {
              english: 'Class Member',
              italian: 'Membro di classe',
              pronunciation: '/klɑːs ˈmembər/',
              phonetic: 'KLAAS MEM-ber',
              example:
                'Every field declared inside the class body becomes a class member that shares access rules with the surrounding type. = Ogni campo dichiarato dentro il corpo della classe diventa un membro di classe che condivide le regole di accesso con il tipo circostante.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Member Initializer List',
              italian: 'Lista di inizializzazione',
              pronunciation: '/ˈmembər ɪˈnɪʃəlaɪzər/',
              phonetic: 'MEM-ber i-NI-scia-lai-zer',
              example:
                'Use member initializer lists for efficiency. = Usa la lista di inizializzazione per efficienza.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'A() : x(0), y(0) {}',
              note: 'Più efficiente che assegnare nel corpo del costruttore.',
              task: 'Scrivi un costruttore A che inizializza i membri x e y a zero tramite la lista di inizializzazione.',
            },
          ],
        },
        {
          id: 'cpp_oop_2',
          title: 'Access Specifiers / Specificatori di Accesso',
          description: 'public, private e protected',
          items: [
            {
              english: 'Access Specifier',
              italian: 'Specificatore di accesso',
              pronunciation: '/ˈækses ˈspesɪfaɪər/',
              phonetic: 'AK-ses SPE-si-fai-er',
              example:
                'Switching from public to private at the top of the class body is an access specifier that hides implementation details from outside code. = Passare da public a private in cima al corpo della classe è uno specificatore di accesso che nasconde i dettagli di implementazione dal codice esterno.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Public',
              italian: 'public',
              pronunciation: '/ˈpʌblɪk/',
              phonetic: 'PAB-lik',
              example: `Marking the start() method as public exposes it as part of the official API that other modules can call directly. = Marcare il metodo start() come public lo espone come parte dell'API ufficiale che altri moduli possono chiamare direttamente.`,
              context: 'oop',
              difficulty: 'beginner',
              code: 'public: int getValue();',
              note: 'Termine C++: public (parola chiave del linguaggio, non si traduce).',
              task: `Marca il metodo getValue come public esponendolo come parte ufficiale dell'API della classe.`,
            },
            {
              english: 'Private',
              italian: 'private',
              pronunciation: '/ˈpraɪvət/',
              phonetic: 'PRAI-vet',
              example:
                'Keeping the cached_hash field private prevents external code from corrupting an internal optimization detail. = Mantenere il campo cached_hash come private impedisce al codice esterno di corrompere un dettaglio di ottimizzazione interno.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'private: int balance;',
              note: 'Termine C++: private (parola chiave del linguaggio, non si traduce).',
              task: `Dichiara come private il campo balance per impedire l'accesso diretto dall'esterno della classe.`,
            },
            {
              english: 'Protected',
              italian: 'protected',
              pronunciation: '/prəˈtektɪd/',
              phonetic: 'pro-TEK-ted',
              example:
                'Declaring the helper method validateState() as protected lets derived classes reuse it while still hiding it from unrelated client code. = Dichiarare il metodo helper validateState() come protected permette alle classi derivate di riusarlo mantenendolo nascosto al codice client non correlato.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'protected: int counter;',
              note: 'Termine C++: protected (parola chiave del linguaggio, non si traduce).',
              task: 'Marca il contatore counter come protected per renderlo visibile solo alle classi derivate.',
            },
            {
              english: 'Encapsulation',
              italian: 'Incapsulamento',
              pronunciation: '/ɪnˌkæpsjəˈleɪʃən/',
              phonetic: 'in-kap-siu-LEI-scion',
              example:
                "A bank-account class uses encapsulation to keep the balance private and expose only deposit and withdraw methods. = Una classe conto-bancario usa l'incapsulamento per mantenere privato il saldo ed esporre solo i metodi deposita e preleva.",
              context: 'oop',
              difficulty: 'beginner',
              note: 'Uno dei pilastri della programmazione orientata agli oggetti.',
            },
            {
              english: 'Getter',
              italian: 'Metodo di lettura (getter)',
              pronunciation: '/ˈɡetər/',
              phonetic: 'GHE-ter',
              example:
                'The Sensor class exposes a getter for the temperature field so that client code can read the value without modifying it. = La classe Sensor espone un getter per il campo temperatura così il codice client può leggere il valore senza modificarlo.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Account {
    int balance = 0;
public:
    int getBalance() const { return balance; }
};`,
              task: 'Definisci un getter getX const che restituisce il valore della variabile membro x senza modificarla.',
            },
            {
              english: 'Setter',
              italian: 'Metodo di scrittura (setter)',
              pronunciation: '/ˈsetər/',
              phonetic: 'SE-ter',
              example:
                'The Volume class validates the input range inside the setter before storing the new level in the private field. = La classe Volume valida il range di input dentro il setter prima di memorizzare il nuovo livello nel campo privato.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'void setX(int v) { x = v; }',
              task: 'Scrivi un setter setX che riceve un intero v e lo assegna al campo membro x.',
            },
            {
              english: 'Friend',
              italian: 'Amico',
              pronunciation: '/frend/',
              phonetic: 'FREND',
              example:
                "The operator<< overload is declared as a friend of the Matrix class so it can iterate over the private data array. = L'overload di operator<< è dichiarato come friend della classe Matrix così può iterare sull'array di dati privato.",
              context: 'oop',
              difficulty: 'beginner',
              code: 'friend class Bar;',
              note: "Da usare con parsimonia, rompe l'incapsulamento.",
              task: `Dichiara la classe Bar come friend per concederle accesso ai membri privati dell'attuale classe.`,
            },
            {
              english: 'Class Invariant',
              italian: 'Invariante di classe',
              pronunciation: '/klɑːs ɪnˈveəriənt/',
              phonetic: 'KLAAS in-VE-ri-ant',
              example: `The BoundedQueue establishes the class invariant that size never exceeds capacity, and every public method must restore it before returning. = La BoundedQueue stabilisce l'invariante di classe che size non superi mai capacity, e ogni metodo pubblico deve ripristinarlo prima di ritornare.`,
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Interface',
              italian: 'Interfaccia',
              pronunciation: '/ˈɪntərfeɪs/',
              phonetic: 'IN-ter-feis',
              example:
                "The public interface is what clients see. = L'interfaccia pubblica è ciò che vedono i client.",
              context: 'oop',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'cpp_oop_3',
          title: 'Constructors Detail / Costruttori in Dettaglio',
          description: 'Tipi di costruttori e regole speciali',
          items: [
            {
              english: 'Default Constructor',
              italian: 'Costruttore di default',
              pronunciation: '/dɪˈfɔːlt kənˈstrʌktər/',
              phonetic: 'di-FOLT kon-STRAK-tor',
              example:
                'A default constructor takes no arguments. = Un costruttore di default non prende argomenti.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'A() = default;',
              task: 'Forza la generazione del costruttore di default sulla classe A con la sintassi = default.',
            },
            {
              english: 'Copy Constructor',
              italian: 'Costruttore di copia',
              pronunciation: '/ˈkɒpi kənˈstrʌktər/',
              phonetic: 'KO-pi kon-STRAK-tor',
              example:
                'The copy constructor copies another object. = Il costruttore di copia copia un altro oggetto.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Buf {
    int* data;
public:
    Buf(const Buf& o) : data(new int(*o.data)) {}
};`,
              task: 'Dichiara il costruttore di copia di A che accetta un riferimento const al sorgente other.',
            },
            {
              english: 'Copy Assignment',
              italian: 'Assegnazione di copia',
              pronunciation: '/ˈkɒpi əˈsaɪnmənt/',
              phonetic: 'KO-pi a-SAIN-ment',
              example:
                'operator= copies onto an existing object. = operator= copia su un oggetto esistente.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'A& operator=(const A& other);',
              task: `Dichiara l'operatore di assegnazione di copia di A che restituisce un riferimento al destinatario.`,
            },
            {
              english: 'Move Constructor',
              italian: 'Costruttore di spostamento',
              pronunciation: '/muːv kənˈstrʌktər/',
              phonetic: 'MUUV kon-STRAK-tor',
              example:
                'Returning a large vector from a factory function triggers the move constructor, which transfers the internal buffer instead of copying every element. = Restituire un grande vettore da una funzione factory attiva il costruttore di spostamento, che trasferisce il buffer interno invece di copiare ogni elemento.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Buf {
    int* data;
public:
    Buf(Buf&& o) noexcept : data(o.data) { o.data = nullptr; }
};`,
              note: 'Disponibile da C++11.',
              task: 'Dichiara un costruttore di spostamento noexcept per la classe A che trasferisce le risorse da un rvalue.',
            },
            {
              english: 'Move Assignment',
              italian: 'Assegnazione di spostamento',
              pronunciation: '/muːv əˈsaɪnmənt/',
              phonetic: 'MUUV a-SAIN-ment',
              example: `Assigning a temporary string built from a file read triggers move assignment, which swaps internal buffers and skips an allocation. = Assegnare una stringa temporanea costruita dalla lettura di un file attiva l'assegnazione di spostamento, che scambia i buffer interni e salta un'allocazione.`,
              context: 'oop',
              difficulty: 'beginner',
              code: 'A& operator=(A&& other) noexcept;',
              task: 'Dichiara per A un operator= di move noexcept che restituisce un riferimento e accetta un rvalue.',
            },
            {
              english: 'Explicit Constructor',
              italian: 'Costruttore esplicito',
              pronunciation: '/ɪkˈsplɪsɪt kənˈstrʌktər/',
              phonetic: 'eks-PLI-sit kon-STRAK-tor',
              example:
                'Marking the String(int size) constructor as explicit prevents an int from silently converting to a String in function calls. = Marcare il costruttore String(int size) come explicit impedisce che un int si converta silenziosamente a String nelle chiamate di funzione.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'explicit A(int x);',
              note: 'Buona pratica per costruttori a un argomento.',
              task: 'Marca con explicit il costruttore A(int) per impedire conversioni implicite da int a A.',
            },
            {
              english: 'Delegating Constructor',
              italian: 'Costruttore delegante',
              pronunciation: '/ˈdelɪɡeɪtɪŋ/',
              phonetic: 'DE-le-ghei-ting',
              example:
                'A delegating constructor calls another constructor. = Un costruttore delegante chiama un altro costruttore.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Box {
    int w, h;
public:
    Box(int w, int h) : w(w), h(h) {}
    Box() : Box(1, 1) {}
};`,
              task: 'Implementa il costruttore di default di A in modo che deleghi al costruttore A(int) passando 0.',
            },
            {
              english: 'Defaulted Function',
              italian: 'Funzione di default',
              pronunciation: '/dɪˈfɔːltɪd ˈfʌŋkʃən/',
              phonetic: 'di-FOL-ted FANK-scen',
              example: `Marking a defaulted function with \`= default\` keeps the compiler-generated implementation while letting you adjust constexpr or noexcept specifiers. = Marcare una defaulted function con \`= default\` mantiene l'implementazione generata dal compilatore lasciandoti regolare gli specificatori constexpr o noexcept.`,
              context: 'oop',
              difficulty: 'beginner',
              code: 'A() = default;',
              task: `Genera automaticamente il costruttore di default di A con la sintassi = default lasciando l'implementazione al compilatore.`,
            },
            {
              english: 'Deleted Function',
              italian: 'Funzione eliminata',
              pronunciation: '/dɪˈliːtɪd ˈfʌŋkʃən/',
              phonetic: 'di-LII-ted FANK-scen',
              example:
                'The unique-handle class marks the copy constructor as a deleted function so that the compiler rejects any attempt to duplicate it. = La classe unique-handle marca il costruttore di copia come funzione eliminata così il compilatore rifiuta qualsiasi tentativo di duplicarla.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Singleton {
public:
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
};`,
              note: 'Tipico per disabilitare la copia.',
              task: `Disabilita esplicitamente il costruttore di copia di A marcandolo come = delete per impedirne l'uso.`,
            },
            {
              english: 'Rule of Three',
              italian: 'Regola del tre',
              pronunciation: '/ruːl ɒv θriː/',
              phonetic: 'RUUL OV TRII',
              example:
                'If your class manages a raw resource, the rule of three says you must define the destructor, copy constructor, and copy assignment together. = Se la tua classe gestisce una risorsa grezza, la regola del tre dice che devi definire insieme distruttore, costruttore di copia e assegnazione di copia.',
              context: 'oop',
              difficulty: 'beginner',
              note: 'In C++ moderno è la regola del cinque (anche move).',
            },
          ],
        },
        {
          id: 'cpp_oop_4',
          title: 'Static & Static Members / Membri Statici',
          description: 'Membri condivisi tra le istanze',
          items: [
            {
              english: 'Static Member',
              italian: 'Membro statico',
              pronunciation: '/ˈstætɪk ˈmembər/',
              phonetic: 'STA-tik MEM-ber',
              example:
                'A static member is shared by all instances. = Un membro statico è condiviso da tutte le istanze.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Counter {
public:
    static int count;
    Counter() { ++count; }
};
int Counter::count = 0;`,
              task: 'Aggiungi alla classe A un membro statico count condiviso da tutte le istanze della classe.',
            },
            {
              english: 'Static Function',
              italian: 'Funzione statica',
              pronunciation: '/ˈstætɪk ˈfʌŋkʃən/',
              phonetic: 'STA-tik FANK-scen',
              example:
                'The factory method Logger::create() is declared as a static function because it constructs a new instance rather than operating on an existing one. = Il metodo factory Logger::create() è dichiarato come funzione statica perché costruisce una nuova istanza piuttosto che operare su una esistente.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'static int total();',
              task: `Dichiara una funzione statica total che opera a livello di classe senza richiedere un'istanza.`,
            },
            {
              english: 'Class Method',
              italian: 'Metodo di classe',
              pronunciation: '/klɑːs ˈmeθəd/',
              phonetic: 'KLAAS ME-tod',
              example:
                'A class method belongs to the class itself. = Un metodo di classe appartiene alla classe stessa.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Static Initialization',
              italian: 'Inizializzazione statica',
              pronunciation: '/ˈstætɪk ɪˌnɪʃəlaɪˈzeɪʃən/',
              phonetic: 'STA-tik i-ni-scia-lai-ZEI-scion',
              example:
                'Static members must be defined outside the class. = I membri statici vanno definiti fuori dalla classe.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'int A::count = 0;',
              note: 'In C++17 puoi inizializzare inline.',
              task: 'Definisci fuori dalla classe il membro statico A::count inizializzandolo a zero per fornirne lo storage.',
            },
            {
              english: 'Inline Variable',
              italian: 'Variabile inline',
              pronunciation: '/ˌɪnˈlaɪn ˈveəriəbl/',
              phonetic: 'in-LAIN VE-ri-a-bol',
              example:
                'inline static variables can live in headers. = Le variabili static inline possono stare negli header.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'inline static int count = 0;',
              note: 'Disponibile da C++17.',
              task: 'Dichiara una variabile inline static count inizializzata a zero per poterla definire direttamente in un header.',
            },
            {
              english: 'Singleton',
              italian: 'Pattern unica istanza (singleton)',
              pronunciation: '/ˈsɪŋɡltən/',
              phonetic: 'SIN-gol-ton',
              example:
                "The application settings are exposed through a singleton so that every module reads and writes the same configuration instance. = Le impostazioni dell'applicazione sono esposte tramite un singleton così ogni modulo legge e scrive la stessa istanza di configurazione.",
              context: 'oop',
              difficulty: 'beginner',
              code: `class DB {
public:
    static DB& instance() {
        static DB db;
        return db;
    }
};`,
              task: `Dichiara il metodo statico instance che restituisce un riferimento all'unica istanza A del singleton.`,
            },
            {
              english: 'Class Constant',
              italian: 'Costante di classe',
              pronunciation: '/klɑːs ˈkɒnstənt/',
              phonetic: 'KLAAS KONS-tant',
              example:
                'A class constant is shared and immutable. = Una costante di classe è condivisa e immutabile.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'static constexpr int MAX = 100;',
              task: 'Definisci una costante di classe MAX come static constexpr int con valore 100 condivisa e immutabile.',
            },
            {
              english: 'Counter Pattern',
              italian: 'Pattern contatore',
              pronunciation: '/ˈkaʊntər ˈpætərn/',
              phonetic: 'KAUN-ter PAT-tern',
              example:
                'Use a static counter to track instances. = Usa un contatore statico per tracciare istanze.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Member Pointer',
              italian: 'Puntatore a membro',
              pronunciation: '/ˈmembər ˈpɔɪntər/',
              phonetic: 'MEM-ber POIN-ter',
              example:
                'A member pointer points to a class member. = Un puntatore a membro punta a un membro della classe.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'int A::*ptr = &A::x;',
              task: 'Dichiara un puntatore a membro ptr che riferisce il campo x della classe A.',
            },
            {
              english: 'Nested Class',
              italian: 'Classe annidata',
              pronunciation: '/ˈnestɪd klɑːs/',
              phonetic: 'NES-ted KLAAS',
              example:
                "A nested class lives inside another class. = Una classe annidata vive dentro un'altra classe.",
              context: 'oop',
              difficulty: 'beginner',
              code: 'class A { class B {}; };',
              task: 'Inserisci dentro la classe A una classe annidata B che ne ridefinisce lo scope di visibilità.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 3 - EREDITARIETÀ / INHERITANCE
    // ════════════════════════════════════════════════
    3: {
      name: 'Ereditarietà / Inheritance',
      description: 'Classi base, derivate e gerarchie',
      lessons: [
        {
          id: 'cpp_oop_5',
          title: 'Base & Derived / Base e Derivata',
          description: 'Classe base e derivata',
          items: [
            {
              english: 'Base Class',
              italian: 'Classe base',
              pronunciation: '/beɪs klɑːs/',
              phonetic: 'BEIS KLAAS',
              example:
                "A base class is the parent in inheritance. = Una classe base è il genitore nell'ereditarietà.",
              context: 'oop',
              difficulty: 'beginner',
              code: `class Animal {
public:
    std::string name;
    void eat() { std::cout << name << " eats\\n"; }
};`,
              task: 'Definisci una classe base Animal che farà da genitore in una gerarchia di ereditarietà.',
            },
            {
              english: 'Derived Class',
              italian: 'Classe derivata',
              pronunciation: '/dɪˈraɪvd klɑːs/',
              phonetic: 'di-RAIVD KLAAS',
              example:
                'The Dog derived class adds a bark() method while inheriting all the movement logic defined in Animal. = La classe derivata Dog aggiunge un metodo bark() ereditando tutta la logica di movimento definita in Animal.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Dog : public Animal {
public:
    void bark() { std::cout << "Woof!\\n"; }
};`,
              task: 'Crea la classe derivata Dog che eredita pubblicamente dalla classe Animal.',
            },
            {
              english: 'Public Inheritance',
              italian: 'Ereditarietà pubblica',
              pronunciation: '/ˈpʌblɪk ɪnˈherɪtəns/',
              phonetic: 'PAB-lik in-HE-ri-tans',
              example:
                'Modeling Dog as a class derived from Animal with public inheritance signals an is-a relationship so a Dog can substitute for an Animal anywhere. = Modellare Dog come classe derivata da Animal con ereditarietà pubblica segnala una relazione is-a così un Dog può sostituire un Animal ovunque.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'class Cat : public Animal {};',
              note: 'Default per struct ma non per class.',
              task: 'Dichiara la classe Cat come derivata di Animal tramite ereditarietà pubblica per modellare una relazione is-a.',
            },
            {
              english: 'Private Inheritance',
              italian: 'Ereditarietà privata',
              pronunciation: '/ˈpraɪvət ɪnˈherɪtəns/',
              phonetic: 'PRAI-vet in-HE-ri-tans',
              example:
                "The Timer class uses private inheritance from Clock to reuse its internal tick logic without exposing Clock's public API to Timer's users. = La classe Timer usa ereditarietà privata da Clock per riusare la sua logica di tick interna senza esporre l'API pubblica di Clock agli utenti di Timer.",
              context: 'oop',
              difficulty: 'beginner',
              code: 'class A : private B {};',
              task: `Fai ereditare la classe A da B tramite ereditarietà privata per riusarne l'implementazione senza esporne l'interfaccia.`,
            },
            {
              english: 'Inheritance',
              italian: 'Ereditarietà',
              pronunciation: '/ɪnˈherɪtəns/',
              phonetic: 'in-HE-ri-tans',
              example:
                'The Button and Slider classes share layout logic through inheritance from a common Widget base. = Le classi Button e Slider condividono la logica di layout tramite ereditarietà da una base Widget comune.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Subclass',
              italian: 'Sottoclasse',
              pronunciation: '/ˈsʌbklɑːs/',
              phonetic: 'SAB-klas',
              example:
                'The ElectricCar subclass inherits fuel-tracking from Vehicle and overrides the refuel method to handle battery charging instead. = La sottoclasse ElectricCar eredita il tracciamento carburante da Vehicle e sovrascrive il metodo refuel per gestire la ricarica della batteria.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Superclass',
              italian: 'Superclasse',
              pronunciation: '/ˈsuːpərklɑːs/',
              phonetic: 'SU-per-klas',
              example:
                'When debugging the hierarchy, start from the Shape superclass at the top and trace how each child specializes the draw method. = Quando si esegue il debug della gerarchia, parti dalla superclasse Shape in cima e traccia come ogni figlio specializza il metodo draw.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Is-A Relationship',
              italian: 'Relazione is-a',
              pronunciation: '/ɪz eɪ rɪˈleɪʃənʃɪp/',
              phonetic: 'IZ-EI ri-LEI-scion-scip',
              example:
                "Saying Dog is-a Animal justifies public inheritance, because every Dog can be used wherever an Animal is expected. = Dire Dog è-un Animal giustifica l'ereditarietà pubblica, perché ogni Dog può essere usato ovunque sia atteso un Animal.",
              context: 'oop',
              difficulty: 'beginner',
              note: "Tipica giustificazione dell'ereditarietà pubblica.",
            },
            {
              english: 'Constructor Chaining',
              italian: 'Concatenazione costruttori',
              pronunciation: '/kənˈstrʌktər ˈtʃeɪnɪŋ/',
              phonetic: 'kon-STRAK-tor CEI-ning',
              example:
                'Derived class constructor chains to base. = Il costruttore derivato concatena a quello base.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Animal {
public:
    Animal(std::string n) : name(n) {}
    std::string name;
};
class Dog : public Animal {
public:
    Dog() : Animal("dog") {}
};`,
              task: 'Implementa il costruttore di Dog in modo che concateni al costruttore di Animal passando la stringa dog.',
            },
            {
              english: 'Slicing',
              italian: 'Affettamento',
              pronunciation: '/ˈslaɪsɪŋ/',
              phonetic: 'SLAI-sing',
              example:
                'Passing a Dog to a function expecting Animal by value triggers slicing, losing all Dog-specific data. = Passare un Dog a una funzione che si aspetta Animal per valore causa slicing, perdendo tutti i dati specifici di Dog.',
              context: 'oop',
              difficulty: 'beginner',
              note: 'Per evitarlo, usa puntatori o riferimenti.',
            },
          ],
        },
        {
          id: 'cpp_oop_6',
          title: 'Virtual & Override / Virtuali e Override',
          description: 'Funzioni virtuali e parole chiave moderne',
          items: [
            {
              english: 'Virtual Function',
              italian: 'Funzione virtuale',
              pronunciation: '/ˈvɜːrtʃuəl ˈfʌŋkʃən/',
              phonetic: 'VER-ciu-al FANK-scen',
              example:
                'The Shape base class declares draw() as a virtual function so each subclass like Circle and Rectangle provides its own rendering logic. = La classe base Shape dichiara draw() come funzione virtuale così ogni sottoclasse come Circle e Rectangle fornisce la propria logica di rendering.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Shape {
public:
    virtual double area() { return 0; }
};
class Circle : public Shape {
    double r;
public:
    double area() override { return 3.14 * r * r; }
};`,
              task: 'Dichiara nella classe base una funzione virtuale speak per abilitare il dispatch dinamico nelle classi derivate.',
            },
            {
              english: 'Override Keyword',
              italian: 'Parola chiave override',
              pronunciation: '/ˌoʊvərˈraɪd ˈkiːwɜːrd/',
              phonetic: 'O-ver-RAID KII-uord',
              example:
                'override marks a function as overriding. = override marca una funzione come ridefinizione.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Base {
public:
    virtual void speak() { std::cout << "...\\n"; }
};
class Dog : public Base {
public:
    void speak() override { std::cout << "Woof!\\n"; }
};`,
              note: 'Aiuta a catturare errori a tempo di compilazione (C++11).',
              task: 'Sovrascrivi nella classe derivata la funzione speak marcando esplicitamente la dichiarazione con override.',
            },
            {
              english: 'Final Keyword',
              italian: 'Parola chiave final',
              pronunciation: '/ˈfaɪnl ˈkiːwɜːrd/',
              phonetic: 'FAI-nol KII-uord',
              example:
                'The optimized FastRenderer marks its draw() method as final so the compiler can devirtualize calls to it. = Il FastRenderer ottimizzato marca il suo metodo draw() come final così il compilatore può devirtualizzare le chiamate ad esso.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'void speak() final;',
              task: 'Marca la funzione speak come final per impedire a ulteriori classi derivate di sovrascriverla.',
            },
            {
              english: 'Virtual Destructor',
              italian: 'Distruttore virtuale',
              pronunciation: '/ˈvɜːrtʃuəl dɪˈstrʌktər/',
              phonetic: 'VER-ciu-al di-STRAK-tor',
              example:
                'A polymorphic base needs a virtual destructor. = Una base polimorfica richiede un distruttore virtuale.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'virtual ~Base() = default;',
              note: 'Senza, delete su pointer base perde memoria.',
              task: 'Aggiungi alla classe Base un distruttore virtuale di default per consentire delete sicuri attraverso puntatore alla base.',
            },
            {
              english: 'Override',
              italian: 'Ridefinizione',
              pronunciation: '/ˌoʊvərˈraɪd/',
              phonetic: 'O-ver-RAID',
              example:
                'The Circle class marks its draw() method with override to replace the generic Shape rendering. = La classe Circle marca il suo metodo draw() con override per sostituire il rendering generico di Shape.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Multiple Inheritance',
              italian: 'Ereditarietà multipla',
              pronunciation: '/ˈmʌltɪpl ɪnˈherɪtəns/',
              phonetic: 'MAL-ti-pol in-HE-ri-tans',
              example:
                "The AudioWidget class uses multiple inheritance to combine both Widget and AudioSource functionality in a single object. = La classe AudioWidget usa l'ereditarietà multipla per combinare le funzionalità di Widget e AudioSource in un singolo oggetto.",
              context: 'oop',
              difficulty: 'beginner',
              code: 'class C : public A, public B {};',
              note: 'Da usare con attenzione, può creare ambiguità.',
              task: `Definisci la classe C che eredita pubblicamente sia da A che da B sfruttando l'ereditarietà multipla.`,
            },
            {
              english: 'Diamond Problem',
              italian: 'Problema del diamante',
              pronunciation: '/ˈdaɪəmənd ˈprɒbləm/',
              phonetic: 'DAI-mond PROB-lem',
              example:
                'The diamond problem arises with multiple inheritance. = Il problema del diamante nasce con ereditarietà multipla.',
              context: 'oop',
              difficulty: 'beginner',
              note: 'Si risolve con virtual inheritance.',
            },
            {
              english: 'Virtual Inheritance',
              italian: 'Ereditarietà virtuale',
              pronunciation: '/ˈvɜːrtʃuəl ɪnˈherɪtəns/',
              phonetic: 'VER-ciu-al in-HE-ri-tans',
              example:
                'Declaring the shared Printable base as virtual ensures only one copy of its members exists in the derived Printable + Serializable combination. = Dichiarare la base condivisa Printable come virtual assicura che esista una sola copia dei suoi membri nella combinazione derivata Printable + Serializable.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'class B : virtual public A {};',
              task: 'Fai ereditare la classe B da A in modo virtuale per evitare duplicazioni del sottooggetto in gerarchie a diamante.',
            },
            {
              english: 'Method Hiding',
              italian: 'Nascondimento metodi',
              pronunciation: '/ˈmeθəd ˈhaɪdɪŋ/',
              phonetic: 'ME-tod HAI-ding',
              example:
                'Defining a non-virtual print() in the derived class hides the base-class version, causing confusing behavior when called through a base pointer. = Definire un print() non virtuale nella classe derivata nasconde la versione della classe base, causando comportamento confuso quando chiamato tramite un puntatore base.',
              context: 'oop',
              difficulty: 'beginner',
              note: 'Differenza chiave da override.',
            },
            {
              english: 'Using Declaration',
              italian: 'Dichiarazione using',
              pronunciation: '/ˈjuːzɪŋ ˌdekləˈreɪʃən/',
              phonetic: 'IU-zing de-kla-REI-scion',
              example:
                'using brings names from base into derived. = using porta nomi dalla base nella derivata.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'using Base::method;',
              task: 'Inserisci nella classe derivata una dichiarazione using Base::method per rendere visibili gli overload nascosti dalla base.',
            },
          ],
        },
        {
          id: 'cpp_oop_7',
          title: 'Abstract Classes / Classi Astratte',
          description: 'Classi pure virtuali e interfacce',
          items: [
            {
              english: 'Abstract Class',
              italian: 'Classe astratta',
              pronunciation: '/ˈæbstrækt klɑːs/',
              phonetic: 'AB-strakt KLAAS',
              example:
                'An abstract class cannot be instantiated. = Una classe astratta non può essere istanziata.',
              context: 'oop',
              difficulty: 'beginner',
              code: `class Shape {
public:
    virtual double area() = 0;
    virtual ~Shape() = default;
};`,
              task: 'Trasforma Shape in classe astratta dichiarando draw come funzione virtuale pura uguagliata a zero.',
            },
            {
              english: 'Pure Virtual',
              italian: 'Puramente virtuale',
              pronunciation: '/pjʊər ˈvɜːrtʃuəl/',
              phonetic: 'PIUR VER-ciu-al',
              example:
                'The Serializer base class declares serialize() as a pure virtual function, forcing each format subclass to provide its own encoding logic. = La classe base Serializer dichiara serialize() come funzione pura virtuale, forzando ogni sottoclasse di formato a fornire la propria logica di codifica.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'virtual void f() = 0;',
              note: 'Il = 0 la rende pura virtuale.',
              task: 'Dichiara la funzione f come puramente virtuale aggiungendo = 0 per obbligare le sottoclassi a implementarla.',
            },
            {
              english: 'Interface Class',
              italian: 'Classe interfaccia',
              pronunciation: '/ˈɪntərfeɪs klɑːs/',
              phonetic: 'IN-ter-feis KLAAS',
              example:
                'An interface class has only pure virtuals. = Una classe interfaccia ha solo metodi puri.',
              context: 'oop',
              difficulty: 'beginner',
              note: 'C++ non ha la parola chiave interface come Java.',
            },
            {
              english: 'Concrete Class',
              italian: 'Classe concreta',
              pronunciation: '/ˈkɒŋkriːt klɑːs/',
              phonetic: 'KON-kriit KLAAS',
              example:
                'After implementing all pure virtual methods, the PngEncoder becomes a concrete class that the image pipeline can instantiate and use. = Dopo aver implementato tutti i metodi puri virtuali, PngEncoder diventa una classe concreta che la pipeline di immagini può istanziare e usare.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Implementation',
              italian: 'Implementazione',
              pronunciation: '/ˌɪmplɪmenˈteɪʃən/',
              phonetic: 'im-ple-men-TEI-scion',
              example:
                'Each database driver provides its own implementation of the connect() and query() methods declared in the abstract DbBackend class. = Ogni driver di database fornisce la propria implementazione dei metodi connect() e query() dichiarati nella classe astratta DbBackend.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Liskov Substitution',
              italian: 'Sostituzione di Liskov',
              pronunciation: '/ˈlɪskɒf ˌsʌbstɪˈtjuːʃən/',
              phonetic: 'LIS-kof sab-sti-TIU-scion',
              example:
                'LSP says derived must be substitutable for base. = Il LSP dice che la derivata deve essere sostituibile alla base.',
              context: 'oop',
              difficulty: 'beginner',
              note: 'La L di SOLID.',
            },
            {
              english: 'Open Closed Principle',
              italian: 'Principio aperto chiuso',
              pronunciation: '/ˈoʊpən kloʊzd ˈprɪnsəpl/',
              phonetic: 'O-pen KLOUZD PRIN-si-pol',
              example:
                "Open for extension, closed for modification. = Aperto all'estensione, chiuso alla modifica.",
              context: 'oop',
              difficulty: 'beginner',
              note: 'La O di SOLID.',
            },
            {
              english: 'Pure Interface',
              italian: 'Interfaccia pura',
              pronunciation: '/pjʊər ˈɪntərfeɪs/',
              phonetic: 'PIUR IN-ter-feis',
              example:
                "The ILogger pure interface defines only log() and flush() methods, so any backend from console to cloud can plug in seamlessly. = L'interfaccia pura ILogger definisce solo i metodi log() e flush(), così qualsiasi backend dalla console al cloud può integrarsi senza problemi.",
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Abstract Method',
              italian: 'Metodo astratto',
              pronunciation: '/ˈæbstrækt ˈmeθəd/',
              phonetic: 'AB-strakt ME-tod',
              example:
                "The compiler rejects instantiation of Codec until the derived class overrides every abstract method like encode() and decode(). = Il compilatore rifiuta l'istanziazione di Codec finché la classe derivata non sovrascrive ogni metodo astratto come encode() e decode().",
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Hierarchy',
              italian: 'Gerarchia',
              pronunciation: '/ˈhaɪərɑːrki/',
              phonetic: 'HAI-rar-ki',
              example:
                'A class hierarchy organizes related types. = Una gerarchia di classi organizza tipi correlati.',
              context: 'oop',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'cpp_oop_8',
          title: 'Inheritance Patterns / Pattern di Ereditarietà',
          description: 'Modelli comuni di uso ereditarietà',
          items: [
            {
              english: 'Composition',
              italian: 'Composizione',
              pronunciation: '/ˌkɒmpəˈzɪʃən/',
              phonetic: 'kom-po-ZI-scion',
              example:
                "The game Engine holds a PhysicsWorld and a Renderer as member objects, preferring composition over inheritance to keep each subsystem replaceable. = Il motore di gioco tiene PhysicsWorld e Renderer come oggetti membro, preferendo la composizione all'ereditarietà per mantenere ogni sottosistema sostituibile.",
              context: 'oop',
              difficulty: 'beginner',
              note: 'Una linea guida classica del design OO.',
            },
            {
              english: 'Aggregation',
              italian: 'Aggregazione',
              pronunciation: '/ˌæɡrɪˈɡeɪʃən/',
              phonetic: 'a-gre-GHEI-scion',
              example:
                "A University holds a list of Professors via aggregation, since each Professor can exist independently. = Un'Università tiene una lista di Professori tramite aggregazione, poiché ogni Professore può esistere indipendentemente.",
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Has-A Relationship',
              italian: 'Relazione has-a',
              pronunciation: '/hæz eɪ rɪˈleɪʃənʃɪp/',
              phonetic: 'HAZ-EI ri-LEI-scion-scip',
              example:
                "Modeling a Car that has-a Engine as a member variable makes it easy to swap different engine implementations without changing the Car API. = Modellare un'Auto che ha-un Motore come variabile membro rende facile scambiare diverse implementazioni del motore senza cambiare l'API dell'Auto.",
              context: 'oop',
              difficulty: 'beginner',
              note: 'Tipica giustificazione della composizione.',
            },
            {
              english: 'Mixin',
              italian: 'Classe di funzionalità riusabile (mixin)',
              pronunciation: '/ˈmɪksɪn/',
              phonetic: 'MIK-sin',
              example:
                'A mixin adds capabilities via inheritance. = Un mixin aggiunge capacità tramite ereditarietà.',
              context: 'oop',
              difficulty: 'beginner',
            },
            {
              english: 'Template Method',
              italian: 'Metodo template',
              pronunciation: '/ˈtemplət ˈmeθəd/',
              phonetic: 'TEM-plet ME-tod',
              example: `The Report base class implements processData as a template method that fixes the algorithm skeleton and delegates the formatting step to derived classes. = La classe base Report implementa processData come metodo template che fissa lo scheletro dell'algoritmo e delega lo step di formattazione alle classi derivate.`,
              context: 'oop',
              difficulty: 'beginner',
              note: 'Pattern del libro Gang of Four.',
            },
            {
              english: 'Polymorphic Container',
              italian: 'Container polimorfico',
              pronunciation: '/ˌpɒlɪˈmɔːrfɪk kənˈteɪnər/',
              phonetic: 'po-li-MOR-fik kon-TEI-ner',
              example:
                'The zoo simulator stores unique_ptr<Animal> in a polymorphic container so it can hold dogs, cats, and birds in one vector. = Il simulatore dello zoo memorizza unique_ptr<Animal> in un container polimorfico così può contenere cani, gatti e uccelli in un unico vettore.',
              context: 'oop',
              difficulty: 'beginner',
              code: `std::vector<std::unique_ptr<Animal>> zoo;
zoo.push_back(std::make_unique<Dog>());
zoo.push_back(std::make_unique<Cat>());`,
              task: 'Costruisci un vettore zoo di std::unique_ptr<Animal> in grado di contenere sottotipi diversi gestiti polimorficamente.',
            },
            {
              english: 'Up-Cast',
              italian: 'Cast verso classe base (up-cast)',
              pronunciation: '/ʌp kɑːst/',
              phonetic: 'AP-KAAST',
              example:
                'Storing a Dog pointer in an Animal pointer is an implicit up-cast that the compiler allows without any special syntax. = Memorizzare un puntatore Dog in un puntatore Animal è un up-cast implicito che il compilatore permette senza alcuna sintassi speciale.',
              context: 'oop',
              difficulty: 'beginner',
              code: 'Animal* a = new Dog();',
              task: 'Esegui un up-cast implicito assegnando un puntatore Dog appena creato a un puntatore Animal.',
            },
            {
              english: 'Down-Cast',
              italian: 'Cast verso classe derivata (down-cast)',
              pronunciation: '/daʊn kɑːst/',
              phonetic: 'DAUN-KAAST',
              example:
                'The event handler performs a down-cast with dynamic_cast to access Dog-specific methods when the generic Animal pointer actually holds a Dog. = Il gestore di eventi esegue un down-cast con dynamic_cast per accedere ai metodi specifici di Dog quando il puntatore generico Animal contiene effettivamente un Dog.',
              context: 'oop',
              difficulty: 'beginner',
              code: `Animal* a = new Dog();
Dog* d = dynamic_cast<Dog*>(a);
if (d) d->bark();`,
              note: 'Sintomo di design da rivedere.',
              task: `Effettua un down-cast sicuro da Animal* a Dog* utilizzando dynamic_cast e controllando l'eventuale nullptr.`,
            },
            {
              english: 'Empty Base Optimization',
              italian: 'Ottimizzazione base vuota',
              pronunciation: '/ˈempti beɪs/',
              phonetic: 'EMP-ti BEIS',
              example:
                "The allocator-aware container inherits from the empty Allocator type; EBO ensures this adds zero bytes to the object size. = Il container allocator-aware eredita dal tipo vuoto Allocator; EBO assicura che questo aggiunga zero byte alla dimensione dell'oggetto.",
              context: 'oop',
              difficulty: 'beginner',
              note: 'Sigla EBO: permette a una classe di ereditare da una base senza dati aggiungendo zero byte alla dimensione.',
            },
            {
              english: 'Composition over Inheritance',
              italian: 'Composizione vs ereditarietà',
              pronunciation: '/ˌkɒmpəˈzɪʃən ˈoʊvər/',
              phonetic: 'kom-po-ZI-scion O-ver',
              example:
                "Composition is more flexible than inheritance. = La composizione è più flessibile dell'ereditarietà.",
              context: 'oop',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 4 - POLIMORFISMO / POLYMORPHISM
    // ════════════════════════════════════════════════
    4: {
      name: 'Polimorfismo / Polymorphism',
      description: 'Polimorfismo dinamico e tabelle virtuali',
      lessons: [
        {
          id: 'cpp_oop_9',
          title: 'Dynamic Dispatch / Dispatch Dinamico',
          description: 'Funzioni virtuali e vtable',
          items: [
            {
              english: 'Polymorphism',
              italian: 'Polimorfismo',
              pronunciation: '/ˌpɒlɪˈmɔːrfɪzəm/',
              phonetic: 'po-li-MOR-fi-zem',
              example:
                "The render engine iterates a vector of Shape pointers and calls draw() on each, relying on polymorphism to pick the correct implementation. = Il motore di rendering itera un vettore di puntatori Shape e chiama draw() su ciascuno, affidandosi al polimorfismo per scegliere l'implementazione corretta.",
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Dynamic Dispatch',
              italian: 'Dispatch dinamico',
              pronunciation: '/daɪˈnæmɪk ˈdɪspætʃ/',
              phonetic: 'dai-NA-mik DIS-paci',
              example:
                'When the render loop calls shape->draw() on a base pointer, dynamic dispatch consults the vtable to invoke Circle::draw or Square::draw at runtime. = Quando il loop di rendering chiama shape->draw() su un puntatore base, il dispatch dinamico consulta la vtable per invocare Circle::draw o Square::draw a runtime.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Static Dispatch',
              italian: 'Dispatch statico',
              pronunciation: '/ˈstætɪk ˈdɪspætʃ/',
              phonetic: 'STA-tik DIS-paci',
              example:
                'Calling a non-virtual sort() through a concrete Vector reference uses static dispatch, letting the compiler inline the function body directly. = Chiamare un sort() non virtuale tramite un riferimento Vector concreto usa il dispatch statico, permettendo al compilatore di fare inline del corpo della funzione direttamente.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'V-Table',
              italian: 'Tabella virtuale',
              pronunciation: '/viː ˈteɪbl/',
              phonetic: 'VI-TEI-bol',
              example:
                'A vtable holds pointers to virtual functions. = Una vtable contiene puntatori alle funzioni virtuali.',
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Dettaglio implementativo, non standard, ma usato da tutti i compilatori.',
            },
            {
              english: 'V-Pointer',
              italian: 'Puntatore virtuale',
              pronunciation: '/viː ˈpɔɪntər/',
              phonetic: 'VI-POIN-ter',
              example:
                'The debugger reveals that each polymorphic Widget object carries a hidden v-pointer that the runtime follows to dispatch virtual calls. = Il debugger rivela che ogni oggetto Widget polimorfico porta un v-pointer nascosto che il runtime segue per eseguire il dispatch delle chiamate virtuali.',
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Aggiunge una parola di overhead per oggetto.',
            },
            {
              english: 'Late Binding',
              italian: 'Binding tardivo',
              pronunciation: '/leɪt ˈbaɪndɪŋ/',
              phonetic: 'LEIT BAIN-ding',
              example:
                'When the event loop calls handler->process(), the runtime uses late binding through the vtable to invoke the correct derived-class method. = Quando il loop eventi chiama handler->process(), il runtime usa il binding tardivo attraverso la vtable per invocare il metodo corretto della classe derivata.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Early Binding',
              italian: 'Binding anticipato',
              pronunciation: '/ˈɜːrli ˈbaɪndɪŋ/',
              phonetic: 'ER-li BAIN-ding',
              example:
                'When a non-virtual method is called on a concrete object, early binding resolves the call at compile time and skips the vtable lookup entirely. = Quando un metodo non virtuale viene chiamato su un oggetto concreto, il binding anticipato risolve la chiamata a tempo di compilazione e salta del tutto il lookup nella vtable.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Run Time Type Information',
              italian: 'Informazioni di tipo a runtime',
              pronunciation: '/rʌn taɪm/',
              phonetic: 'RAN-TAIM',
              example:
                "The plugin loader uses RTTI to verify that a dynamically loaded object actually implements the expected interface before calling its methods. = Il caricatore di plugin usa RTTI per verificare che un oggetto caricato dinamicamente implementi effettivamente l'interfaccia attesa prima di chiamarne i metodi.",
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Sigla RTTI. Si attiva con typeid e dynamic_cast.',
            },
            {
              english: 'typeid',
              italian: 'Operatore di identificazione tipo (typeid)',
              pronunciation: '/taɪp ˈaɪdiː/',
              phonetic: 'TAIP-AI-DI',
              example:
                "The logging subsystem calls typeid on the caught exception to print its actual type name. = Il sottosistema di logging chiama typeid sull'eccezione catturata per stamparne il nome di tipo effettivo.",
              context: 'oop',
              difficulty: 'intermediate',
              code: `Animal* a = new Dog();
std::cout << typeid(*a).name();
delete a;`,
              task: `Ricava informazioni sul tipo dinamico puntato da p invocando typeid sull'oggetto dereferenziato e salvando la reference.`,
            },
            {
              english: 'Dynamic Cast',
              italian: 'Cast dinamico',
              pronunciation: '/daɪˈnæmɪk kɑːst/',
              phonetic: 'dai-NA-mik KAAST',
              example:
                'Before calling bark(), the handler uses dynamic_cast to safely verify that the Animal pointer really holds a Dog. = Prima di chiamare bark(), il gestore usa dynamic_cast per verificare in modo sicuro che il puntatore Animal contenga realmente un Dog.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `Animal* a = getAnimal();
if (auto* d = dynamic_cast<Dog*>(a)) {
    d->bark();
}`,
              note: 'Restituisce nullptr se il cast fallisce.',
              task: 'Converti il puntatore polimorfico a in un Dog* con dynamic_cast e gestisci esplicitamente il caso di fallimento.',
            },
          ],
        },
        {
          id: 'cpp_oop_10',
          title: 'Abstract Polymorphism / Polimorfismo Astratto',
          description: 'Pattern e polimorfismo astratto',
          items: [
            {
              english: 'Pure Virtual Function',
              italian: 'Funzione pura virtuale',
              pronunciation: '/pjʊər ˈvɜːrtʃuəl ˈfʌŋkʃən/',
              phonetic: 'PIUR VER-ciu-al FANK-scen',
              example:
                'A pure virtual makes the class abstract. = Una pura virtuale rende la classe astratta.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'virtual void draw() = 0;',
              task: 'Dichiara la funzione virtuale draw come pura assegnandole = 0 per rendere astratta la classe contenitore.',
            },
            {
              english: 'Strategy Pattern',
              italian: 'Pattern strategy',
              pronunciation: '/ˈstrætədʒi ˈpætərn/',
              phonetic: 'STRA-te-gi PAT-tern',
              example:
                'Strategy lets you swap algorithms at runtime. = Strategy permette di cambiare algoritmi a runtime.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Visitor Pattern',
              italian: 'Pattern visitor',
              pronunciation: '/ˈvɪzɪtər ˈpætərn/',
              phonetic: 'VI-zi-tor PAT-tern',
              example:
                "The code formatter applies the visitor pattern so new formatting rules can be added without touching the AST node classes. = Il formattatore di codice applica il pattern visitor così nuove regole di formattazione possono essere aggiunte senza toccare le classi nodo dell'AST.",
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Open Recursion',
              italian: 'Ricorsione aperta',
              pronunciation: '/ˈoʊpən rɪˈkɜːrʒən/',
              phonetic: 'O-pen ri-KER-sion',
              example:
                'Virtual calls in base allow open recursion. = Chiamate virtuali nella base permettono ricorsione aperta.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Type Erasure',
              italian: 'Cancellazione di tipo',
              pronunciation: '/taɪp ɪˈreɪʒər/',
              phonetic: 'TAIP i-REI-zer',
              example:
                'The callback registry stores handlers as std::function objects, relying on type erasure to accept lambdas, function pointers, and bound methods alike. = Il registro di callback memorizza i gestori come oggetti std::function, affidandosi alla cancellazione di tipo per accettare lambda, puntatori a funzione e metodi legati allo stesso modo.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Sealed Class',
              italian: 'Classe sigillata',
              pronunciation: '/siːld klɑːs/',
              phonetic: 'SIILD KLAAS',
              example:
                'The framework marks its internal SecurityPolicy class as final to prevent third-party code from overriding its safety checks. = Il framework marca la sua classe interna SecurityPolicy come final per impedire al codice di terze parti di sovrascrivere i suoi controlli di sicurezza.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `class Leaf final {
public:
    int value;
    Leaf(int v) : value(v) {}
};
// class Sub : public Leaf {}; // ERROR`,
              task: 'Marca la classe Foo come final per sigillarla e impedire qualsiasi ulteriore ereditarietà.',
            },
            {
              english: 'Covariant Return Type',
              italian: 'Tipo di ritorno covariante',
              pronunciation: '/koʊˈveəriənt rɪˈtɜːrn/',
              phonetic: 'ko-VE-ri-ant ri-TERN',
              example:
                'Covariant returns refine base return types. = I ritorni covarianti raffinano il tipo della base.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Devirtualization',
              italian: 'Devirtualizzazione',
              pronunciation: '/diːˌvɜːrtʃuəlaɪˈzeɪʃən/',
              phonetic: 'di-ver-ciu-a-lai-ZEI-scion',
              example:
                'When the compiler proves that the pointer always holds a Circle, it applies devirtualization to replace the virtual draw() call with a direct one. = Quando il compilatore dimostra che il puntatore contiene sempre un Circle, applica la devirtualizzazione per sostituire la chiamata virtuale a draw() con una diretta.',
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Riduce overhead se il compilatore conosce il tipo concreto.',
            },
            {
              english: 'Vtable Lookup',
              italian: 'Lookup in vtable',
              pronunciation: '/ˈluːkʊp/',
              phonetic: 'LUUK-up',
              example:
                'A virtual call requires a vtable lookup. = Una chiamata virtuale richiede un lookup in vtable.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Indirect Call',
              italian: 'Chiamata indiretta',
              pronunciation: '/ˌɪndəˈrekt kɔːl/',
              phonetic: 'in-di-REKT KOOL',
              example:
                'Each virtual method invocation is an indirect call through the vtable, which the CPU branch predictor finds harder to optimize. = Ogni invocazione di metodo virtuale è una chiamata indiretta attraverso la vtable, che il predittore di branch della CPU trova più difficile da ottimizzare.',
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Possono essere meno predicibili dalla CPU.',
            },
          ],
        },
        {
          id: 'cpp_oop_11',
          title: 'Interfaces & Contracts / Interfacce e Contratti',
          description: 'Contratti e interfacce in C++',
          items: [
            {
              english: 'Contract Programming',
              italian: 'Programmazione a contratto',
              pronunciation: '/ˈkɒntrækt/',
              phonetic: 'KON-trakt',
              example: `Applying contract programming to the sqrt routine documents a precondition that the input is non-negative and a postcondition that the squared result equals it. = Applicare la programmazione a contratto alla routine sqrt documenta una precondizione che l'input sia non negativo e una postcondizione che il risultato al quadrato sia uguale.`,
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Precondition',
              italian: 'Precondizione',
              pronunciation: '/priːkənˈdɪʃən/',
              phonetic: 'pri-kon-DI-scion',
              example:
                'A precondition must hold before the call. = Una precondizione deve valere prima della chiamata.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'assert(p != nullptr);',
              task: 'Verifica con assert che il puntatore p non sia nullptr come precondizione prima di procedere con la sua dereferenziazione.',
            },
            {
              english: 'Postcondition',
              italian: 'Postcondizione',
              pronunciation: '/poʊstkənˈdɪʃən/',
              phonetic: 'post-kon-DI-scion',
              example:
                'The sort function guarantees as a postcondition that the output range is in non-decreasing order when it returns. = La funzione sort garantisce come postcondizione che il range di output sia in ordine non decrescente quando ritorna.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Invariant',
              italian: 'Invariante',
              pronunciation: '/ɪnˈveəriənt/',
              phonetic: 'in-VE-ri-ant',
              example:
                "The BoundedQueue class maintains the invariant that size never exceeds capacity, checking it in every public method. = La classe BoundedQueue mantiene l'invariante che size non superi mai capacity, verificandolo in ogni metodo pubblico.",
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Behavioral Subtype',
              italian: 'Sottotipo comportamentale',
              pronunciation: '/bɪˈheɪvjərəl ˈsʌbtaɪp/',
              phonetic: 'bi-HEI-vio-ral SAB-taip',
              example:
                'A behavioral subtype must obey the base contract. = Un sottotipo comportamentale deve rispettare il contratto della base.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Pure Function',
              italian: 'Funzione pura',
              pronunciation: '/pjʊər ˈfʌŋkʃən/',
              phonetic: 'PIUR FANK-scen',
              example:
                'The distance calculator is written as a pure function that only reads its Point arguments and returns a double, making it trivially thread-safe. = Il calcolatore di distanza è scritto come funzione pura che legge solo i suoi argomenti Point e restituisce un double, rendendolo banalmente thread-safe.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Side Effect',
              italian: 'Effetto collaterale',
              pronunciation: '/saɪd ɪˈfekt/',
              phonetic: 'SAID i-FEKT',
              example:
                'Calling the logger inside the calculation function introduces a side effect that writes to the log file every time the formula runs. = Chiamare il logger dentro la funzione di calcolo introduce un effetto collaterale che scrive sul file di log ogni volta che la formula viene eseguita.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'API Stability',
              italian: 'Stabilità API',
              pronunciation: '/eɪ piː aɪ stəˈbɪləti/',
              phonetic: 'EI-PI-AI sta-BI-li-ti',
              example:
                'The library guarantees API stability by never removing public methods in minor releases, so downstream projects can upgrade safely. = La libreria garantisce stabilità API non rimuovendo mai metodi pubblici nelle release minori, così i progetti downstream possono aggiornare in sicurezza.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'ABI Stability',
              italian: 'Stabilità ABI',
              pronunciation: '/eɪ biː aɪ stəˈbɪləti/',
              phonetic: 'EI-BI-AI sta-BI-li-ti',
              example:
                'Standard library implementers obsess over ABI stability because changing the layout of std::string would break every binary linked against the old version. = Gli implementatori della libreria standard sono ossessionati dalla stabilità ABI perché cambiare il layout di std::string romperebbe ogni binario collegato alla vecchia versione.',
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Diversa da API: riguarda la rappresentazione binaria.',
            },
            {
              english: 'Liskov Compliance',
              italian: 'Conformità Liskov',
              pronunciation: '/ˈlɪskɒf kəmˈplaɪəns/',
              phonetic: 'LIS-kof kom-PLAI-ans',
              example:
                'A subclass should respect Liskov compliance. = Una sottoclasse deve rispettare la conformità Liskov.',
              context: 'oop',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'cpp_oop_12',
          title: 'Polymorphism Costs / Costi del Polimorfismo',
          description: 'Costi e alternative al polimorfismo',
          items: [
            {
              english: 'Indirection Cost',
              italian: 'Costo di indirezione',
              pronunciation: '/ˌɪndəˈrekʃən kɒst/',
              phonetic: 'in-di-REK-scion KOST',
              example:
                "Profiling showed that the tight rendering loop spent 8 percent of its time on the indirection cost of virtual draw() calls. = Il profiling ha mostrato che il loop di rendering stretto spendeva l'8 percento del suo tempo sul costo di indirezione delle chiamate virtuali draw().",
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Cache Miss',
              italian: 'Dato assente in cache (cache miss)',
              pronunciation: '/kæʃ mɪs/',
              phonetic: 'KAS MIS',
              example:
                "Iterating a vector of polymorphic pointers scattered across the heap triggers a cache miss on almost every vtable lookup. = Iterare un vettore di puntatori polimorfici sparsi nell'heap causa un cache miss su quasi ogni lookup della vtable.",
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Branch Prediction',
              italian: 'Predizione del salto',
              pronunciation: '/brɑːntʃ prɪˈdɪkʃən/',
              phonetic: 'BRANC pri-DIK-scion',
              example:
                'Mixing many derived types in one container hurts branch prediction because the CPU cannot guess which virtual implementation will run next. = Mescolare molti tipi derivati in un container danneggia la predizione del salto perché la CPU non riesce a indovinare quale implementazione virtuale verrà eseguita dopo.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Inlining',
              italian: 'Espansione inline (inlining)',
              pronunciation: '/ˌɪnˈlaɪnɪŋ/',
              phonetic: 'in-LAI-ning',
              example:
                'Virtual calls usually cannot be inlined. = Le chiamate virtuali spesso non possono essere inlined.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Variant Polymorphism',
              italian: 'Polimorfismo con variant',
              pronunciation: '/ˈveəriənt/',
              phonetic: 'VE-ri-ant',
              example:
                'std::variant offers static polymorphism. = std::variant offre polimorfismo statico.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `std::variant<Cat, Dog> pet = Dog{};
std::visit([](auto& a) { a.speak(); }, pet);`,
              task: 'Dichiara una variabile animal di tipo std::variant<Cat, Dog> per modellare polimorficamente uno tra Cat e Dog.',
            },
            {
              english: 'CRTP',
              italian: 'Pattern template ricorsivo curioso (CRTP)',
              pronunciation: '/siː ɑːr tiː piː/',
              phonetic: 'SI-AR-TI-PI',
              example:
                'The counter mixin uses CRTP so each derived class gets its own static instance count without virtual dispatch. = Il mixin contatore usa CRTP così ogni classe derivata ottiene il proprio conteggio statico di istanze senza dispatch virtuale.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `template<class Derived>
struct Base {
    void call() { static_cast<Derived*>(this)->impl(); }
};
struct MyClass : Base<MyClass> {
    void impl() { std::cout << "Hello\\n"; }
};`,
              note: 'Curiously Recurring Template Pattern.',
              task: 'Dichiara un template Base parametrizzato su T come scheletro del pattern CRTP per condividere funzionalità senza virtual.',
            },
            {
              english: 'Concept Polymorphism',
              italian: 'Polimorfismo con concept',
              pronunciation: '/ˈkɒnsept/',
              phonetic: 'KON-sept',
              example:
                "The numeric library uses C++20 concepts to constrain template parameters, giving concept polymorphism without the overhead of virtual dispatch. = La libreria numerica usa i concepts C++20 per vincolare i parametri template, offrendo polimorfismo con concept senza l'overhead del dispatch virtuale.",
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Disponibile da C++20.',
            },
            {
              english: 'Tag Dispatch',
              italian: 'Dispatch per tipo-etichetta (tag dispatch)',
              pronunciation: '/tæɡ ˈdɪspætʃ/',
              phonetic: 'TAG DIS-paci',
              example: `The advance algorithm uses tag dispatch on iterator_category to pick a constant-time implementation for random-access iterators and a linear one otherwise. = L'algoritmo advance usa tag dispatch su iterator_category per scegliere un'implementazione a tempo costante per iteratori ad accesso casuale e una lineare altrimenti.`,
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Static Polymorphism',
              italian: 'Polimorfismo statico',
              pronunciation: '/ˈstætɪk/',
              phonetic: 'STA-tik',
              example:
                'Replacing the virtual base hierarchy with a CRTP template gave the matrix library static polymorphism and let the compiler inline every call site. = Sostituire la gerarchia base virtuale con un template CRTP ha dato alla libreria matrici polimorfismo statico e ha permesso al compilatore di fare inline di ogni call site.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Polymorphic Cost',
              italian: 'Costo polimorfico',
              pronunciation: '/ˌpɒlɪˈmɔːrfɪk/',
              phonetic: 'po-li-MOR-fik',
              example:
                'Measure polymorphic cost before optimizing. = Misura il costo polimorfico prima di ottimizzare.',
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Spesso trascurabile, ma su hot path conta.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 5 - OPERATOR OVERLOADING / SOVRACCARICO OPERATORI
    // ════════════════════════════════════════════════
    5: {
      name: 'Sovraccarico Operatori / Operator Overloading',
      description: 'Sovraccaricare gli operatori del linguaggio',
      lessons: [
        {
          id: 'cpp_oop_13',
          title: 'Arithmetic Operators / Operatori Aritmetici',
          description: 'Sovraccaricare +, -, *, /',
          items: [
            {
              english: 'Operator Overloading',
              italian: 'Sovraccarico operatori',
              pronunciation: '/ˈɒpəreɪtər ˌoʊvərˈloʊdɪŋ/',
              phonetic: 'OP-e-rei-tor O-ver-LOU-ding',
              example:
                'Implementing operator+ for the Money class is a classic use of operator overloading: callers write usd1 + usd2 instead of usd1.add(usd2). = Implementare operator+ per la classe Money è un uso classico del sovraccarico operatori: i chiamanti scrivono usd1 + usd2 invece di usd1.add(usd2).',
              context: 'oop',
              difficulty: 'intermediate',
              code: `struct Vec {
    double x, y;
    Vec operator+(const Vec& o) const {
        return {x + o.x, y + o.y};
    }
};`,
              task: `Sovraccarica l'operatore + per la classe Vec come funzione libera che riceve due Vec per riferimento const.`,
            },
            {
              english: 'Operator Plus',
              italian: 'Operatore più',
              pronunciation: '/ˈɒpəreɪtər plʌs/',
              phonetic: 'OP-e-rei-tor PLAS',
              example:
                'The Vec3 class defines operator+ so that physics code can write velocity + acceleration naturally. = La classe Vec3 definisce operator+ così il codice di fisica può scrivere velocity + acceleration in modo naturale.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'Vec operator+(const Vec& o);',
              task: `Dichiara dentro Vec l'operator+ membro che riceve un altro Vec per riferimento const e restituisce la somma.`,
            },
            {
              english: 'Operator Minus',
              italian: 'Operatore meno',
              pronunciation: '/ˈɒpəreɪtər ˈmaɪnəs/',
              phonetic: 'OP-e-rei-tor MAI-nus',
              example:
                'Using operator- on two Date objects returns a Duration representing the number of days between them. = Usare operator- su due oggetti Date restituisce un Duration che rappresenta il numero di giorni tra di essi.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'Vec operator-(const Vec& o);',
              task: `Definisci l'operator- per Vec che sottrae componente a componente un altro Vec passato per riferimento const.`,
            },
            {
              english: 'Compound Assignment',
              italian: 'Assegnazione composta',
              pronunciation: '/ˈkɒmpaʊnd əˈsaɪnmənt/',
              phonetic: 'KOM-paund a-SAIN-ment',
              example:
                "The Matrix class implements compound assignment operator+= to accumulate transformation matrices in the render pipeline. = La classe Matrix implementa l'operatore di assegnazione composta operator+= per accumulare matrici di trasformazione nella pipeline di rendering.",
              context: 'oop',
              difficulty: 'intermediate',
              code: 'Vec& operator+=(const Vec& o);',
              task: `Implementa l'operatore di assegnazione composta += per Vec che accumula in-place e restituisce un riferimento all'oggetto.`,
            },
            {
              english: 'Member Operator',
              italian: 'Operatore membro',
              pronunciation: '/ˈmembər ˈɒpəreɪtər/',
              phonetic: 'MEM-ber OP-e-rei-tor',
              example:
                'A member operator has access to private state. = Un operatore membro accede allo stato privato.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Free Operator',
              italian: 'Operatore libero',
              pronunciation: '/friː ˈɒpəreɪtər/',
              phonetic: 'FRII OP-e-rei-tor',
              example:
                'A free operator is a non-member function. = Un operatore libero è una funzione non membro.',
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Spesso preferito per simmetria nei tipi binari.',
            },
            {
              english: 'Unary Operator',
              italian: 'Operatore unario',
              pronunciation: '/ˈjuːnəri/',
              phonetic: 'IU-na-ri',
              example:
                'Defining a unary operator- for the Vector class lets the physics engine negate velocity with a simple minus sign. = Definire un operatore unario operator- per la classe Vector permette al motore di fisica di negare la velocità con un semplice segno meno.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'Vec operator-() const;',
              task: 'Definisci un operatore unario - su Vec marcato const che restituisce un nuovo Vec con segno opposto.',
            },
            {
              english: 'Binary Operator',
              italian: 'Operatore binario',
              pronunciation: '/ˈbaɪnəri/',
              phonetic: 'BAI-na-ri',
              example:
                'The cross product is modeled as a binary operator that takes two Vec3 operands and returns a new perpendicular vector. = Il prodotto vettoriale è modellato come operatore binario che prende due operandi Vec3 e restituisce un nuovo vettore perpendicolare.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Increment Operator',
              italian: 'Operatore di incremento',
              pronunciation: '/ˈɪnkrəmənt/',
              phonetic: 'IN-kre-ment',
              example:
                "The custom iterator defines increment operator++ to advance to the next filtered element in the collection. = L'iteratore personalizzato definisce l'operatore di incremento operator++ per avanzare al prossimo elemento filtrato nella collezione.",
              context: 'oop',
              difficulty: 'intermediate',
              code: `struct Counter {
    int n = 0;
    Counter& operator++() { ++n; return *this; }
};
Counter c; ++c;`,
              note: 'Pre-increment restituisce reference, post-increment restituisce per valore.',
              task: `Sovraccarica il pre-incremento ++ sulla classe A restituendo un riferimento all'oggetto dopo l'aggiornamento.`,
            },
            {
              english: 'Decrement Operator',
              italian: 'Operatore di decremento',
              pronunciation: '/ˈdiːkrəmənt/',
              phonetic: 'DI-kre-ment',
              example:
                "The reverse iterator implements decrement operator-- to walk backwards through the linked list from tail to head. = L'iteratore inverso implementa l'operatore di decremento operator-- per camminare all'indietro nella lista concatenata dalla coda alla testa.",
              context: 'oop',
              difficulty: 'intermediate',
              code: 'A& operator--();',
              task: `Sovraccarica il pre-decremento -- sulla classe A restituendo un riferimento all'oggetto dopo la diminuzione.`,
            },
          ],
        },
        {
          id: 'cpp_oop_14',
          title: 'Comparison & Logical / Confronto e Logici',
          description: 'Operatori di confronto e logici',
          items: [
            {
              english: 'Equality Operator',
              italian: 'Operatore di uguaglianza',
              pronunciation: '/iːˈkwɒləti/',
              phonetic: 'i-KUO-li-ti',
              example:
                "The Point class defines equality operator== to compare both x and y coordinates so unit tests can assert exact positions. = La classe Point definisce l'operatore di uguaglianza operator== per confrontare sia la coordinata x che y così i test unitari possono asserire posizioni esatte.",
              context: 'oop',
              difficulty: 'intermediate',
              code: `struct Point {
    int x, y;
    bool operator==(const Point& o) const {
        return x == o.x && y == o.y;
    }
};`,
              task: `Definisci l'operatore di uguaglianza operator== const su A che confronta i membri di due oggetti.`,
            },
            {
              english: 'Inequality Operator',
              italian: 'Operatore di disuguaglianza',
              pronunciation: '/ˌɪnɪˈkwɒləti/',
              phonetic: 'i-ne-KUO-li-ti',
              example:
                "In C++20 the compiler auto-generates the inequality operator!= from operator==, but in older standards you must write both manually. = In C++20 il compilatore auto-genera l'operatore di disuguaglianza operator!= da operator==, ma negli standard più vecchi devi scriverli entrambi manualmente.",
              context: 'oop',
              difficulty: 'intermediate',
              code: 'bool operator!=(const A& o) const;',
              task: `Implementa l'operatore di disuguaglianza operator!= const su A coerentemente con la definizione di operator==.`,
            },
            {
              english: 'Less Than',
              italian: 'Minore di',
              pronunciation: '/les ðæn/',
              phonetic: 'LES-DAN',
              example:
                'Defining operator< for the Student class lets std::sort rank them by GPA without a separate comparator. = Definire operator< per la classe Student permette a std::sort di ordinarli per GPA senza un comparatore separato.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'bool operator<(const A& o) const;',
              task: `Dichiara su A l'operatore minore-di operator< const per renderla ordinabile da std::sort.`,
            },
            {
              english: 'Spaceship Operator',
              italian: 'Operatore spaceship',
              pronunciation: '/ˈspeɪsʃɪp/',
              phonetic: 'SPEIS-scip',
              example:
                "Defaulting the spaceship operator<=> on the Record class auto-generates all six comparison operators in one line. = Mettere a default l'operatore spaceship operator<=> sulla classe Record auto-genera tutti e sei gli operatori di confronto in una riga.",
              context: 'oop',
              difficulty: 'intermediate',
              code: `struct Point {
    int x, y;
    auto operator<=>(const Point&) const = default;
};
Point a{1,2}, b{1,3};
bool lt = (a < b); // true`,
              note: 'Disponibile da C++20.',
              task: 'Aggiungi su A un operatore spaceship <=> messo a default per generare automaticamente tutti gli operatori di confronto.',
            },
            {
              english: 'Strong Ordering',
              italian: 'Ordinamento forte',
              pronunciation: '/strɒŋ ˈɔːrdərɪŋ/',
              phonetic: 'STRONG OR-de-ring',
              example:
                'std::strong_ordering allows full comparison. = std::strong_ordering permette confronto completo.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Partial Ordering',
              italian: 'Ordinamento parziale',
              pronunciation: '/ˈpɑːrʃəl ˈɔːrdərɪŋ/',
              phonetic: 'PAR-scial OR-de-ring',
              example:
                "Because NaN is not comparable, floating-point arithmetic follows partial ordering rules rather than a strict total order. = Poiché NaN non è confrontabile, l'aritmetica in virgola mobile segue regole di ordinamento parziale piuttosto che un ordine totale stretto.",
              context: 'oop',
              difficulty: 'intermediate',
              note: 'NaN crea valori non confrontabili.',
            },
            {
              english: 'Default Comparison',
              italian: 'Confronto di default',
              pronunciation: '/dɪˈfɔːlt kəmˈpærɪsən/',
              phonetic: 'di-FOLT kom-PA-ri-son',
              example:
                'In C++20, writing bool operator==(const Config&) const = default generates a member-wise default comparison automatically. = In C++20, scrivere bool operator==(const Config&) const = default genera automaticamente un confronto di default membro per membro.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'bool operator==(const A&) const = default;',
              task: 'Lascia che il compilatore generi il confronto di uguaglianza membro per membro dichiarando operator== const = default.',
            },
            {
              english: 'Logical Not',
              italian: 'Negazione logica',
              pronunciation: '/ˈlɒdʒɪkl nɒt/',
              phonetic: 'LO-gi-kol NOT',
              example:
                "The Optional wrapper defines logical not operator! so callers can write if (!result) to detect an empty state. = Il wrapper Optional definisce l'operatore di negazione logica operator! così i chiamanti possono scrivere if (!result) per rilevare uno stato vuoto.",
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Implicit Bool',
              italian: 'Bool implicito',
              pronunciation: '/ɪmˈplɪsɪt buːl/',
              phonetic: 'im-PLI-sit BUL',
              example:
                'The Connection class provides an explicit implicit bool conversion so users can write if (conn) to check whether the link is alive. = La classe Connection fornisce una conversione bool esplicita così gli utenti possono scrivere if (conn) per verificare se il collegamento è attivo.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `struct Valid {
    bool ok;
    explicit operator bool() const { return ok; }
};
Valid v{true};
if (v) std::cout << "valid";`,
              note: 'Marcalo explicit per evitare conversioni implicite.',
              task: `Definisci un operatore di conversione a bool marcato explicit per consentire l'uso dell'oggetto in condizioni if.`,
            },
            {
              english: 'Comparison Chain',
              italian: 'Catena di confronto',
              pronunciation: '/kəmˈpærɪsən tʃeɪn/',
              phonetic: 'kom-PA-ri-son CEIN',
              example:
                'Implementing operator< as a comparison chain over surname then first name then birth date gives consistent ordering for the contact list. = Implementare operator< come una catena di confronto su cognome poi nome poi data di nascita dà un ordinamento coerente per la lista contatti.',
              context: 'oop',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'cpp_oop_15',
          title: 'Special Operators / Operatori Speciali',
          description: 'Stream, indicizzazione, conversioni',
          items: [
            {
              english: 'Stream Operator',
              italian: 'Operatore di stream',
              pronunciation: '/striːm ˈɒpəreɪtər/',
              phonetic: 'STRIIM OP-e-rei-tor',
              example:
                "The overloaded stream operator<< for the Color class lets you write std::cout << color and get a human-readable name. = L'operatore di stream operator<< sovraccaricato per la classe Color ti permette di scrivere std::cout << color e ottenere un nome leggibile.",
              context: 'oop',
              difficulty: 'intermediate',
              code: `struct Point { int x, y; };
std::ostream& operator<<(std::ostream& os, const Point& p) {
    return os << "(" << p.x << "," << p.y << ")";
}`,
              task: `Dichiara come funzione libera l'operator<< che inserisce un oggetto A in un std::ostream e ne restituisce il riferimento.`,
            },
            {
              english: 'Subscript Operator',
              italian: 'Operatore di indicizzazione',
              pronunciation: '/ˈsʌbskrɪpt/',
              phonetic: 'SAB-skript',
              example:
                "The Matrix class defines subscript operator[] to let callers access rows with natural matrix[i][j] syntax. = La classe Matrix definisce l'operatore di indicizzazione operator[] per permettere ai chiamanti di accedere alle righe con la sintassi naturale matrix[i][j].",
              context: 'oop',
              difficulty: 'intermediate',
              code: `class Array {
    int data[10];
public:
    int& operator[](size_t i) { return data[i]; }
};`,
              task: `Sovraccarica l'operatore di indicizzazione [] su una classe restituendo per riferimento l'elemento all'indice i.`,
            },
            {
              english: 'Function Call Operator',
              italian: 'Operatore di chiamata',
              pronunciation: '/ˈfʌŋkʃən kɔːl/',
              phonetic: 'FANK-scen KOOL',
              example:
                "The Multiplier functor stores a factor and uses function call operator() so it can be passed directly to std::transform. = Il functor Multiplier memorizza un fattore e usa l'operatore di chiamata operator() così può essere passato direttamente a std::transform.",
              context: 'oop',
              difficulty: 'intermediate',
              code: `struct Square {
    int operator()(int x) const { return x * x; }
};
Square sq;
std::cout << sq(5); // 25`,
              note: 'Crea functor / oggetti funzione.',
              task: `Implementa l'operator() const sulla classe per trasformarla in un functor invocabile come una funzione su un intero.`,
            },
            {
              english: 'Conversion Operator',
              italian: 'Operatore di conversione',
              pronunciation: '/kənˈvɜːrʒən/',
              phonetic: 'kon-VER-scion',
              example:
                'A conversion operator converts to another type. = Un operatore di conversione converte in altro tipo.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'operator double() const;',
              task: `Definisci un operatore di conversione const verso double che restituisce una rappresentazione numerica dell'oggetto.`,
            },
            {
              english: 'Friend Function',
              italian: 'Funzione amica',
              pronunciation: '/frend ˈfʌŋkʃən/',
              phonetic: 'FREND FANK-scen',
              example:
                'A friend function accesses private state. = Una funzione amica accede allo stato privato.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'friend std::ostream& operator<<(std::ostream&, const A&);',
              task: `Dichiara come funzione amica l'operator<< per std::ostream e A in modo che possa accedere ai membri privati.`,
            },
            {
              english: 'Arrow Operator',
              italian: 'Operatore freccia',
              pronunciation: '/ˈæroʊ/',
              phonetic: 'A-ro',
              example:
                "The smart pointer wrapper overloads the arrow operator-> so callers access the underlying object with the same ptr->method() syntax as raw pointers. = Il wrapper smart pointer sovraccarica l'operatore freccia operator-> così i chiamanti accedono all'oggetto sottostante con la stessa sintassi ptr->method() dei puntatori grezzi.",
              context: 'oop',
              difficulty: 'intermediate',
              code: 'T* operator->();',
              task: `Sovraccarica l'operatore freccia -> in modo che restituisca un puntatore al tipo T da rivelare al chiamante.`,
            },
            {
              english: 'Address-of Operator',
              italian: 'Operatore indirizzo-di',
              pronunciation: '/əˈdres ɒv/',
              phonetic: 'a-DRES OV',
              example:
                "Overloading address-of operator& is almost never needed, and doing so breaks std::addressof and confuses template libraries. = Sovraccaricare l'operatore indirizzo-di operator& non è quasi mai necessario, e farlo rompe std::addressof e confonde le librerie template.",
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Raramente sovraccaricato in pratica.',
            },
            {
              english: 'Comma Operator',
              italian: 'Operatore virgola',
              pronunciation: '/ˈkɒmə/',
              phonetic: 'KOM-ma',
              example:
                'operator, can be overloaded but rarely should. = operator, può essere sovraccaricato ma raramente conviene.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'New/Delete Overload',
              italian: 'Sovraccarico di new/delete',
              pronunciation: '/njuː dɪˈliːt/',
              phonetic: 'NIU di-LIIT',
              example:
                'The game engine overloads new and delete at class level to route all Entity allocations through a fast pool allocator. = Il motore di gioco sovraccarica new e delete a livello di classe per instradare tutte le allocazioni di Entity attraverso un pool allocator veloce.',
              context: 'oop',
              difficulty: 'intermediate',
              code: 'void* operator new(size_t);',
              note: 'Utile per pool allocator personalizzati.',
              task: 'Sovraccarica operator new accettando un size_t per instradare le allocazioni della classe verso un allocatore custom.',
            },
            {
              english: 'Operator Symmetry',
              italian: 'Simmetria operatori',
              pronunciation: '/ˈɒpəreɪtər ˈsɪmətri/',
              phonetic: 'OP-e-rei-tor SI-me-tri',
              example:
                'Use free functions for symmetric operators. = Usa funzioni libere per operatori simmetrici.',
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Per supportare conversioni implicite su entrambi i lati.',
            },
          ],
        },
        {
          id: 'cpp_oop_16',
          title: 'Operator Best Practices / Buone Pratiche',
          description: 'Linee guida per operatori personalizzati',
          items: [
            {
              english: 'Operator Semantics',
              italian: 'Semantica operatori',
              pronunciation: '/sɪˈmæntɪks/',
              phonetic: 'si-MAN-tiks',
              example:
                'Keep operator semantics consistent with built-ins. = Mantieni la semantica coerente con quella nativa.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'No Surprise Principle',
              italian: 'Principio di non sorpresa',
              pronunciation: '/səˈpraɪz/',
              phonetic: 'sa-PRAIZ',
              example:
                'Following the no surprise principle means operator+ on a Currency class should add amounts, not concatenate strings. = Seguire il principio di non sorpresa significa che operator+ su una classe Currency deve sommare importi, non concatenare stringhe.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'User-Defined Literal',
              italian: 'Letterale definito da utente',
              pronunciation: '/ˈjuːzər dɪˈfaɪnd ˈlɪtərəl/',
              phonetic: 'IU-zer di-FAIND LI-te-ral',
              example:
                'Defining a user-defined literal _km lets the physics module express distances as auto d = 42.5_km, which the compiler converts to kilometers. = Definire un letterale definito da utente _km permette al modulo di fisica di esprimere distanze come auto d = 42.5_km, che il compilatore converte in chilometri.',
              context: 'oop',
              difficulty: 'intermediate',
              code: `constexpr long double operator"" _km(long double d) {
    return d * 1000.0;
}
auto dist = 5.0_km; // 5000.0`,
              note: 'Disponibile da C++11.',
              task: `Crea un letterale definito dall'utente _km e usalo per esprimere 10 chilometri come 10_km.`,
            },
            {
              english: 'Operator Function',
              italian: 'Funzione operatore',
              pronunciation: '/ˈɒpəreɪtər/',
              phonetic: 'OP-e-rei-tor',
              example:
                'When you write a + b for your Vec class, the compiler looks up the operator function named operator+ that matches the argument types. = Quando scrivi a + b per la tua classe Vec, il compilatore cerca la funzione operatore chiamata operator+ che corrisponde ai tipi degli argomenti.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Return by Value',
              italian: 'Ritorno per valore',
              pronunciation: '/rɪˈtɜːrn baɪ ˈvæljuː/',
              phonetic: 'ri-TERN BAI VAL-iu',
              example:
                'Arithmetic operators usually return by value. = Gli operatori aritmetici ritornano per valore.',
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Self-Assignment',
              italian: 'Auto-assegnazione',
              pronunciation: '/self əˈsaɪnmənt/',
              phonetic: 'SELF a-SAIN-ment',
              example: `Before freeing the old buffer, the assignment operator checks for self-assignment with if (this == &other) so that v = v does not corrupt internal state. = Prima di liberare il vecchio buffer, l'operatore di assegnazione controlla l'auto-assegnazione con if (this == &other) così v = v non corrompe lo stato interno.`,
              context: 'oop',
              difficulty: 'intermediate',
              code: 'if (this == &other) return *this;',
              task: `Proteggi l'operator= controllando l'auto-assegnazione con un confronto tra this e l'indirizzo di other prima della logica di copia.`,
            },
            {
              english: 'Copy and Swap',
              italian: 'Idioma di assegnazione sicura (copy-and-swap)',
              pronunciation: '/ˈkɒpi ænd swɒp/',
              phonetic: 'KO-pi END SUOP',
              example: `The String class implements assignment with the copy and swap idiom, building a temporary and swapping it in to get a strong exception guarantee for free. = La classe String implementa l'assegnazione con l'idioma copy and swap, costruendo un temporaneo e scambiandolo per ottenere gratis la garanzia forte sulle eccezioni.`,
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Noexcept Operator',
              italian: 'Operatore noexcept',
              pronunciation: '/ˌnoʊɪkˈsept/',
              phonetic: 'no-ek-SEPT',
              example:
                'Marking move and swap as noexcept operator guarantees allows std::vector to use moves during reallocation instead of slower copies. = Marcare move e swap come operatore noexcept garantisce che std::vector possa usare i move durante la riallocazione invece di copie più lente.',
              context: 'oop',
              difficulty: 'intermediate',
              note: 'Necessario per usare il move dentro container.',
            },
            {
              english: 'Const Correctness',
              italian: 'Correttezza const',
              pronunciation: '/kɒnst kəˈrektnəs/',
              phonetic: 'KONST kor-REKT-nes',
              example:
                "Declaring operator== as const ensures const correctness, allowing comparisons even when you hold a const reference to the object. = Dichiarare operator== come const assicura correttezza const, permettendo confronti anche quando si detiene un riferimento const all'oggetto.",
              context: 'oop',
              difficulty: 'intermediate',
            },
            {
              english: 'Operator Avoidance',
              italian: 'Evitare operatori',
              pronunciation: '/əˈvɔɪdəns/',
              phonetic: 'a-VOI-dans',
              example:
                'Avoid overloading operators when functions are clearer. = Evita di sovraccaricare quando funzioni sono più chiare.',
              context: 'oop',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 6 - STL CONTAINER / STL CONTAINERS
    // ════════════════════════════════════════════════
    6: {
      name: 'Container STL / STL Containers',
      description: 'Container della Standard Template Library',
      lessons: [
        {
          id: 'cpp_stl_1',
          title: 'Sequence Containers / Container Sequenziali',
          description: 'Vector, list, deque, array',
          items: [
            {
              english: 'Vector',
              italian: 'Array dinamico (std::vector)',
              pronunciation: '/ˈvektər/',
              phonetic: 'VEK-tor',
              example:
                'The particle system stores all active particles in a std::vector because its contiguous memory layout is cache-friendly. = Il sistema di particelle memorizza tutte le particelle attive in un std::vector perché il suo layout di memoria contiguo è cache-friendly.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3};
v.push_back(4);
for (int x : v) std::cout << x << " ";`,
              note: 'Il container più usato. Memoria contigua.',
              task: 'Costruisci un std::vector<int> chiamato v inizializzato con i tre valori 1, 2 e 3 tramite brace initialization.',
            },
            {
              english: 'List',
              italian: 'Lista doppiamente concatenata (std::list)',
              pronunciation: '/lɪst/',
              phonetic: 'LIST',
              example:
                'The LRU cache uses a std::list so that moving an accessed element to the front takes constant time without invalidating other iterators. = La cache LRU usa una std::list così spostare un elemento acceduto in testa richiede tempo costante senza invalidare altri iteratori.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::list<int> l = {3, 1, 2};
l.push_front(0);
l.sort();
for (int x : l) std::cout << x << " ";`,
              task: 'Dichiara una std::list<int> vuota chiamata l da popolare in seguito sfruttando il doppio collegamento dei nodi.',
            },
            {
              english: 'Forward List',
              italian: 'Lista singolarmente concatenata (std::forward_list)',
              pronunciation: '/ˈfɔːrwərd lɪst/',
              phonetic: 'FOR-uord LIST',
              example:
                'std::forward_list is a singly-linked list. = std::forward_list è una lista a collegamento singolo.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::forward_list<int> fl;',
              task: 'Dichiara una std::forward_list<int> fl che usa una lista a collegamento singolo per ridurre overhead di memoria.',
            },
            {
              english: 'Deque',
              italian: 'Coda doppiamente accessibile (std::deque)',
              pronunciation: '/dek/',
              phonetic: 'DEK',
              example:
                "The sliding-window algorithm uses a std::deque because it needs to push new readings at the back and pop expired ones from the front in constant time. = L'algoritmo a finestra scorrevole usa una std::deque perché deve inserire nuove letture in coda e rimuovere quelle scadute dalla testa in tempo costante.",
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::deque<int> dq;
dq.push_back(1);
dq.push_front(0);
std::cout << dq.front() << " " << dq.back();`,
              note: 'Double-ended queue.',
              task: 'Crea una std::deque<int> dq per gestire inserimenti e rimozioni in O(1) sia in testa sia in coda.',
            },
            {
              english: 'Array',
              italian: 'Array a dimensione fissa (std::array)',
              pronunciation: '/əˈreɪ/',
              phonetic: 'a-REI',
              example:
                'The RGB color class stores its three channels in a std::array<uint8_t, 3> to get bounds checking and STL algorithm support. = La classe colore RGB memorizza i suoi tre canali in un std::array<uint8_t, 3> per ottenere controllo dei limiti e supporto agli algoritmi STL.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::array<int, 3> a = {10, 20, 30};
for (int x : a) std::cout << x << " ";
std::cout << "size: " << a.size();`,
              task: 'Dichiara un std::array di 5 interi chiamato a per ottenere un array a dimensione fissa con interfaccia STL.',
            },
            {
              english: 'Span',
              italian: 'Vista non-proprietaria su sequenza (std::span)',
              pronunciation: '/spæn/',
              phonetic: 'SPAN',
              example:
                'The audio filter accepts a std::span<float> parameter so it works with vectors, arrays, and raw buffers without copying data. = Il filtro audio accetta un parametro std::span<float> così funziona con vettori, array e buffer grezzi senza copiare dati.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::span<int> view = vec;',
              note: 'Disponibile da C++20.',
              task: 'Costruisci una std::span<int> view che riferisce gli elementi di vec senza copiarne i dati.',
            },
            {
              english: 'Capacity',
              italian: 'Capacità',
              pronunciation: '/kəˈpæsəti/',
              phonetic: 'ka-PA-si-ti',
              example:
                'After calling reserve(1000), checking capacity() confirms the vector has pre-allocated room for at least 1000 elements. = Dopo aver chiamato reserve(1000), controllare capacity() conferma che il vettore ha pre-allocato spazio per almeno 1000 elementi.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'v.capacity();',
              task: 'Recupera la capacità allocata del vettore v richiamando il metodo capacity() per controllare lo spazio riservato.',
            },
            {
              english: 'Reserve',
              italian: 'Riserva',
              pronunciation: '/rɪˈzɜːrv/',
              phonetic: 'ri-ZERV',
              example:
                'Calling reserve() before the parsing loop avoids repeated reallocations as the vector grows with each new token. = Chiamare reserve() prima del loop di parsing evita riallocazioni ripetute man mano che il vettore cresce con ogni nuovo token.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'v.reserve(1000);',
              note: 'Evita riallocazioni in cicli.',
              task: `Riserva preventivamente spazio per 1000 elementi nel vettore v con reserve(1000) per evitare riallocazioni durante l'inserimento.`,
            },
            {
              english: 'Push Back',
              italian: 'Inserimento in coda',
              pronunciation: '/pʊʃ bæk/',
              phonetic: 'PUS-BAK',
              example:
                "The event queue calls push_back each time a mouse click is detected, appending the event for later processing. = La coda eventi chiama push_back ogni volta che viene rilevato un click del mouse, aggiungendo l'evento per l'elaborazione successiva.",
              context: 'stl',
              difficulty: 'intermediate',
              code: 'v.push_back(42);',
              task: 'Aggiungi il valore 42 in coda al vettore v invocando il metodo push_back.',
            },
            {
              english: 'Emplace Back',
              italian: 'Costruzione in coda',
              pronunciation: '/ɪmˈpleɪs bæk/',
              phonetic: 'em-PLEIS BAK',
              example:
                'Using emplace_back with the x and y coordinates constructs the Point directly inside the vector, avoiding a temporary copy. = Usare emplace_back con le coordinate x e y costruisce il Point direttamente dentro il vettore, evitando una copia temporanea.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `struct Point { int x, y; };
std::vector<Point> pts;
pts.emplace_back(3, 4);
std::cout << pts[0].x; // 3`,
              note: 'Più efficiente di push_back per oggetti complessi.',
              task: 'Costruisci in coda al vettore v un nuovo elemento passando direttamente gli argomenti 1 e 2 a emplace_back.',
            },
          ],
        },
        {
          id: 'cpp_stl_2',
          title: 'Associative Containers / Container Associativi',
          description: 'Map, set e varianti',
          items: [
            {
              english: 'Map',
              italian: 'Mappa ordinata (std::map)',
              pronunciation: '/mæp/',
              phonetic: 'MAP',
              example:
                'The configuration manager stores settings in a std::map so they print in alphabetical key order when dumped to the log. = Il gestore di configurazione memorizza le impostazioni in una std::map così vengono stampate in ordine alfabetico di chiave quando scaricate nel log.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::map<std::string, int> ages;
ages["Alice"] = 30;
ages["Bob"] = 25;
for (auto& [k, v] : ages) std::cout << k << ": " << v << "\\n";`,
              note: 'Implementato come red-black tree.',
              task: 'Dichiara una std::map che associa chiavi std::string a valori int mantenendole ordinate alfabeticamente.',
            },
            {
              english: 'Set',
              italian: 'Insieme ordinato (std::set)',
              pronunciation: '/set/',
              phonetic: 'SET',
              example:
                'The spell checker loads its dictionary into a std::set to guarantee uniqueness and enable fast logarithmic lookups. = Il correttore ortografico carica il suo dizionario in un std::set per garantire unicità e abilitare ricerche logaritmiche veloci.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::set<int> s = {3, 1, 2, 1};
for (int x : s) std::cout << x << " ";
// prints 1 2 3 (sorted, unique)`,
              task: 'Crea un std::set<int> chiamato s per memorizzare interi unici e mantenerli automaticamente ordinati.',
            },
            {
              english: 'Multimap',
              italian: 'Mappa con chiavi duplicate (std::multimap)',
              pronunciation: '/ˌmʌltiˈmæp/',
              phonetic: 'mal-ti-MAP',
              example:
                'The event log uses a std::multimap keyed by timestamp so that multiple events occurring at the same millisecond are all preserved. = Il log eventi usa una std::multimap con chiave timestamp così più eventi che si verificano nello stesso millisecondo vengono tutti preservati.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::multimap<int, std::string> mm;',
              task: 'Dichiara una std::multimap<int, std::string> mm capace di contenere più valori associati alla stessa chiave numerica.',
            },
            {
              english: 'Multiset',
              italian: 'std::multiset',
              pronunciation: '/ˌmʌltiˈset/',
              phonetic: 'mal-ti-SET',
              example:
                'The vote-counting routine stores ballots in a std::multiset so it can keep repeated identical preferences while still iterating them in sorted order. = La routine di conteggio voti memorizza le schede in un std::multiset così può tenere preferenze identiche ripetute pur iterandole in ordine ordinato.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::multiset<int> ms;',
              note: 'Termine C++: std::multiset (contenitore standard, non si traduce).',
              task: 'Dichiara un std::multiset<int> chiamato ms per mantenere ordinati anche valori duplicati.',
            },
            {
              english: 'Unordered Map',
              italian: 'std::unordered_map',
              pronunciation: '/ˌʌnˈɔːrdərd mæp/',
              phonetic: 'an-OR-derd MAP',
              example: `The session cache stores user-id to token lookups in a std::unordered_map so average lookup runs in O(1) instead of the O(log n) of std::map. = La cache delle sessioni memorizza le mappature user-id verso token in un std::unordered_map così la ricerca media gira in O(1) invece dell'O(log n) di std::map.`,
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::unordered_map<std::string, int> m;
m["key"] = 42;
if (m.count("key")) {
    std::cout << m["key"];
}`,
              note: 'Termine C++: std::unordered_map (contenitore standard, non si traduce).',
              task: 'Crea un std::unordered_map che mappa std::string a int sfruttando una tabella hash per lookup medi in O(1).',
            },
            {
              english: 'Unordered Set',
              italian: 'Insieme hash (std::unordered_set)',
              pronunciation: '/ˌʌnˈɔːrdərd set/',
              phonetic: 'an-OR-derd SET',
              example:
                'The visited-nodes tracker uses an std::unordered_set to check in constant time whether the BFS has already explored a given state. = Il tracciatore di nodi visitati usa un std::unordered_set per verificare in tempo costante se il BFS ha già esplorato un dato stato.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::unordered_set<int> us;',
              task: 'Crea un std::unordered_set<int> chiamato us basato su hash per garantire test di appartenenza in tempo costante medio.',
            },
            {
              english: 'Hash Function',
              italian: 'Funzione hash',
              pronunciation: '/hæʃ ˈfʌŋkʃən/',
              phonetic: 'HAS FANK-scen',
              example:
                'The custom Point type specializes std::hash with a hash function that combines x and y so it can be used as an unordered_map key. = Il tipo custom Point specializza std::hash con una funzione hash che combina x e y così può essere usato come chiave di unordered_map.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::hash<std::string>{}(s);',
              task: 'Invoca std::hash<std::string> sulla stringa s ricavandone il valore hash da usare come identificatore.',
            },
            {
              english: 'Bucket',
              italian: 'Secchio della tabella hash (bucket)',
              pronunciation: '/ˈbʌkɪt/',
              phonetic: 'BAK-it',
              example:
                'Hash containers store entries in buckets. = I container hash memorizzano voci in bucket.',
              context: 'stl',
              difficulty: 'intermediate',
            },
            {
              english: 'Insert',
              italian: 'Inserimento',
              pronunciation: '/ɪnˈsɜːrt/',
              phonetic: 'in-SERT',
              example:
                "After calling insert on the map, the returned pair tells you both where the element lives and whether it was actually added. = Dopo aver chiamato insert sulla mappa, la coppia restituita ti dice sia dove si trova l'elemento sia se è stato effettivamente aggiunto.",
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::map<std::string, int> m;
auto [it, ok] = m.insert({"key", 42});
if (ok) std::cout << "Inserted: " << it->second;`,
              task: `Inserisci nella mappa m la coppia chiave-valore (k, v) catturando con destructuring l'iteratore e il flag di successo.`,
            },
            {
              english: 'Find',
              italian: 'Ricerca',
              pronunciation: '/faɪnd/',
              phonetic: 'FAIND',
              example:
                'The cache checks whether a key exists by calling find on the map and comparing the result to end() before accessing the value. = La cache verifica se una chiave esiste chiamando find sulla mappa e confrontando il risultato con end() prima di accedere al valore.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::map<std::string, int> m = {{"a", 1}};
auto it = m.find("a");
if (it != m.end()) std::cout << it->second;`,
              task: `Cerca la chiave key nella mappa m con il metodo find e conserva l'iteratore restituito in it.`,
            },
          ],
        },
        {
          id: 'cpp_stl_3',
          title: 'Container Adapters / Adattatori',
          description: 'Stack, queue e priority queue',
          items: [
            {
              english: 'Stack Adapter',
              italian: 'Adattatore stack',
              pronunciation: '/stæk əˈdæptər/',
              phonetic: 'STAK a-DAP-tor',
              example:
                "The undo history is modeled as a stack adapter so the most recent action is always on top and gets popped first. = La cronologia di undo è modellata come adattatore stack così l'azione più recente è sempre in cima e viene rimossa per prima.",
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::stack<int> st;
st.push(1);
st.push(2);
std::cout << st.top(); // 2
st.pop();`,
              task: 'Dichiara un std::stack<int> chiamato st come adattatore LIFO sopra un container sottostante predefinito.',
            },
            {
              english: 'Queue Adapter',
              italian: 'Adattatore queue',
              pronunciation: '/kjuː/',
              phonetic: 'KIU',
              example:
                "The print spooler pushes new jobs to the back of a queue adapter and processes them in the order they arrived. = Lo spooler di stampa inserisce nuovi lavori in fondo a un adattatore queue e li elabora nell'ordine in cui sono arrivati.",
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::queue<int> q;
q.push(10);
q.push(20);
std::cout << q.front(); // 10
q.pop();`,
              task: 'Dichiara una std::queue<int> q come adattatore FIFO per gestire elementi in ordine di arrivo.',
            },
            {
              english: 'Priority Queue',
              italian: 'Coda con priorità',
              pronunciation: '/praɪˈɔːrəti kjuː/',
              phonetic: 'prai-O-ri-ti KIU',
              example:
                'The task scheduler stores pending jobs in a std::priority_queue so that the highest-priority entry is always returned from top() in logarithmic time. = Lo scheduler dei task memorizza i lavori in attesa in una std::priority_queue così che la voce con priorità più alta sia sempre restituita da top() in tempo logaritmico.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::priority_queue<int> pq;
pq.push(3); pq.push(1); pq.push(5);
std::cout << pq.top(); // 5`,
              note: 'Implementato come heap.',
              task: `Crea una std::priority_queue<int> pq che restituisce sempre da top() l'elemento con priorità più alta.`,
            },
            {
              english: 'Top',
              italian: 'Elemento in cima (top)',
              pronunciation: '/tɒp/',
              phonetic: 'TOP',
              example:
                "Before popping the undo stack, the editor calls top() to display a preview of the action about to be reverted. = Prima di fare pop dallo stack di undo, l'editor chiama top() per mostrare un'anteprima dell'azione che sta per essere annullata.",
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto v = st.top();',
              task: `Recupera in v l'elemento attualmente in cima allo stack st chiamando il metodo top() senza rimuoverlo.`,
            },
            {
              english: 'Pop',
              italian: 'Rimozione elemento in cima (pop)',
              pronunciation: '/pɒp/',
              phonetic: 'POP',
              example:
                'After reading and processing the top task, the scheduler calls pop() to remove it from the priority queue. = Dopo aver letto ed elaborato il task in cima, lo scheduler chiama pop() per rimuoverlo dalla coda con priorità.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'st.pop();',
              note: 'Non restituisce valore, devi chiamare top() prima.',
              task: `Rimuovi l'elemento in cima allo stack st invocando pop() dopo averne letto il valore con top().`,
            },
            {
              english: 'Front',
              italian: 'Inizio',
              pronunciation: '/frʌnt/',
              phonetic: 'FRANT',
              example:
                'After enqueuing several requests into a std::queue, calling front() returns the oldest one without removing it so you can inspect before popping. = Dopo aver accodato diverse richieste in una std::queue, chiamare front() restituisce la più vecchia senza rimuoverla così puoi ispezionarla prima di fare pop.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto v = q.front();',
              task: `Ottieni l'elemento in testa alla queue q tramite il metodo front() e salvalo nella variabile v.`,
            },
            {
              english: 'Back',
              italian: 'Fine',
              pronunciation: '/bæk/',
              phonetic: 'BAK',
              example:
                'The logger calls back() on the message buffer to retrieve the most recently enqueued entry for real-time display. = Il logger chiama back() sul buffer dei messaggi per recuperare la voce più recente accodata per la visualizzazione in tempo reale.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto v = q.back();',
              task: `Recupera con back() l'ultimo elemento inserito nella queue q senza rimuoverlo dalla coda.`,
            },
            {
              english: 'Underlying Container',
              italian: 'Container sottostante',
              pronunciation: '/ˌʌndərˈlaɪɪŋ/',
              phonetic: 'an-der-LAI-ing',
              example:
                'You can switch the underlying container of std::stack from the default deque to a vector by specifying it as a template argument. = Puoi cambiare il container sottostante di std::stack dalla deque predefinita a un vector specificandolo come argomento template.',
              context: 'stl',
              difficulty: 'intermediate',
            },
            {
              english: 'Container Concept',
              italian: 'Concetto di container',
              pronunciation: '/kənˈteɪnər ˈkɒnsept/',
              phonetic: 'kon-TEI-ner KON-sept',
              example:
                'Standard containers satisfy a shared container concept that requires begin(), end(), size(), and value_type so generic algorithms can operate on any of them. = I container standard soddisfano un concetto di container condiviso che richiede begin(), end(), size() e value_type così gli algoritmi generici possono operare su uno qualsiasi di essi.',
              context: 'stl',
              difficulty: 'intermediate',
            },
            {
              english: 'Empty Check',
              italian: 'Verifica vuoto',
              pronunciation: '/ˈempti tʃek/',
              phonetic: 'EMP-ti CEK',
              example:
                'Before calling top() on the priority queue, the worker performs an empty check with empty() to avoid undefined behavior on an exhausted queue. = Prima di chiamare top() sulla coda con priorità, il worker esegue una verifica vuoto con empty() per evitare comportamento indefinito su una coda esaurita.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'if (v.empty()) { /* ... */ }',
              task: 'Verifica con il metodo empty() che il container v non sia vuoto prima di accedere ai suoi elementi.',
            },
          ],
        },
        {
          id: 'cpp_stl_4',
          title: 'Iterators / Iteratori',
          description: 'Iteratori e categorie',
          items: [
            {
              english: 'Iterator',
              italian: 'Iteratore',
              pronunciation: '/ˈɪtəreɪtər/',
              phonetic: 'I-te-rei-tor',
              example:
                'Holding an iterator returned by find() lets you both check whether the key exists and read its value with a single map lookup. = Tenere un iteratore restituito da find() ti permette sia di verificare se la chiave esiste sia di leggere il suo valore con una sola ricerca nella mappa.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {10, 20, 30};
for (auto it = v.begin(); it != v.end(); ++it) {
    std::cout << *it << " ";
}`,
              task: `Ottieni l'iteratore al primo elemento del vettore v invocando il metodo begin() e salvalo in it.`,
            },
            {
              english: 'Begin',
              italian: 'Inizio',
              pronunciation: '/bɪˈɡɪn/',
              phonetic: 'bi-GHIN',
              example:
                'The range-based for loop internally calls begin() and end() on the container to obtain the iterator pair that bounds the traversal. = Il ciclo range-based for chiama internamente begin() e end() sul container per ottenere la coppia di iteratori che delimita la traversata.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto it = v.begin();',
              task: 'Recupera con begin() un iteratore al primo elemento del container v come punto di partenza della traversata.',
            },
            {
              english: 'End',
              italian: 'Fine',
              pronunciation: '/end/',
              phonetic: 'END',
              example: `Comparing the iterator from find() against end() is the standard way to detect that the requested key was not present in the container. = Confrontare l'iteratore restituito da find() con end() è il modo standard per rilevare che la chiave richiesta non era presente nel container.`,
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto it = v.end();',
              note: 'Non dereferenziare end()!',
              task: `Ottieni con end() l'iteratore sentinella appena oltre l'ultimo elemento del container v senza dereferenziarlo.`,
            },
            {
              english: 'Const Iterator',
              italian: 'Iteratore const',
              pronunciation: '/kɒnst ˈɪtəreɪtər/',
              phonetic: 'KONST I-te-rei-tor',
              example:
                'Iterating a const std::vector& produces a const iterator so the read-only loop body cannot accidentally mutate the original data. = Iterare un const std::vector& produce un iteratore const così il corpo del loop di sola lettura non può accidentalmente modificare i dati originali.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto it = v.cbegin();',
              task: `Richiedi un iteratore const al container v invocando cbegin() per garantire l'immutabilità degli elementi visitati.`,
            },
            {
              english: 'Reverse Iterator',
              italian: 'Iteratore inverso',
              pronunciation: '/rɪˈvɜːrs/',
              phonetic: 'ri-VERS',
              example:
                'The undo system walks the action log from newest to oldest using a reverse iterator obtained from rbegin(). = Il sistema di undo percorre il log delle azioni dal più recente al più vecchio usando un iteratore inverso ottenuto da rbegin().',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'for (auto it = v.rbegin(); it != v.rend(); ++it);',
              task: `Scorri il container v dall'ultimo al primo elemento usando un iteratore inverso ottenuto con rbegin() e rend().`,
            },
            {
              english: 'Random Access Iterator',
              italian: 'Iteratore ad accesso casuale',
              pronunciation: '/ˈrændəm ˈækses/',
              phonetic: 'RAN-dom AK-ses',
              example: `Because std::vector provides a random access iterator, the binary search algorithm can jump to the midpoint with it + n in constant time. = Poiche' std::vector fornisce un iteratore ad accesso casuale, l'algoritmo di ricerca binaria puo' saltare al punto medio con it + n in tempo costante.`,
              context: 'stl',
              difficulty: 'intermediate',
              note: 'Permettono it + n in tempo costante.',
            },
            {
              english: 'Bidirectional Iterator',
              italian: 'Iteratore bidirezionale',
              pronunciation: '/ˌbaɪdəˈrekʃənl/',
              phonetic: 'bai-di-REK-scio-nal',
              example:
                'std::list exposes a bidirectional iterator so you can move forward with ++it and backward with --it, but jumping by n positions still costs O(n). = std::list espone un iteratore bidirezionale così puoi muoverti avanti con ++it e indietro con --it, ma saltare di n posizioni costa comunque O(n).',
              context: 'stl',
              difficulty: 'intermediate',
            },
            {
              english: 'Forward Iterator',
              italian: 'Iteratore forward',
              pronunciation: '/ˈfɔːrwərd/',
              phonetic: 'FOR-uord',
              example: `std::forward_list only exposes a forward iterator, so algorithms that need to walk backwards must build a reversed copy first. = std::forward_list espone solo un iteratore forward, così gli algoritmi che devono camminare all'indietro devono prima costruire una copia rovesciata.`,
              context: 'stl',
              difficulty: 'intermediate',
            },
            {
              english: 'Iterator Invalidation',
              italian: 'Invalidazione iteratore',
              pronunciation: '/ˌɪnˌvælɪˈdeɪʃən/',
              phonetic: 'in-va-li-DEI-scion',
              example: `Calling push_back on a std::vector during a range-for loop can trigger reallocation and cause iterator invalidation, leading to a crash on the next ++it. = Chiamare push_back su un std::vector durante un range-for può scatenare una riallocazione e causare invalidazione dell'iteratore, portando a un crash sul successivo ++it.`,
              context: 'stl',
              difficulty: 'intermediate',
              note: 'Causa frequente di bug subdoli.',
            },
            {
              english: 'Iterator Adapter',
              italian: 'Adattatore di iteratori',
              pronunciation: '/əˈdæptər/',
              phonetic: 'a-DAP-ter',
              example:
                'Passing std::back_inserter(dest) to std::copy uses an iterator adapter that turns each assignment into a push_back on the destination container. = Passare std::back_inserter(dest) a std::copy usa un adattatore di iteratori che trasforma ogni assegnamento in una push_back sul container di destinazione.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::copy(a.begin(), a.end(), std::back_inserter(b));',
              task: `Copia tutti gli elementi di a nel container b passando a std::copy l'adattatore di iteratori std::back_inserter.`,
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 7 - STL ALGORITHMS / ALGORITMI STL
    // ════════════════════════════════════════════════
    7: {
      name: 'Algoritmi STL / STL Algorithms',
      description: 'Algoritmi della libreria standard',
      lessons: [
        {
          id: 'cpp_stl_5',
          title: 'Searching & Sorting / Ricerca e Ordinamento',
          description: 'Ordinamento e ricerca con STL',
          items: [
            {
              english: 'Sort',
              italian: 'Ordinamento',
              pronunciation: '/sɔːrt/',
              phonetic: 'SORT',
              example:
                'After loading sensor readings into a vector, the analysis pipeline calls std::sort to rank them by timestamp. = Dopo aver caricato le letture dei sensori in un vettore, la pipeline di analisi chiama std::sort per ordinarle per timestamp.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {3, 1, 4, 1, 5};
std::sort(v.begin(), v.end());
for (int x : v) std::cout << x << " ";`,
              note: 'Tipicamente introsort, complessità O(n log n).',
              task: `Ordina in-place il vettore v in ordine crescente chiamando std::sort sull'intervallo begin/end.`,
            },
            {
              english: 'Stable Sort',
              italian: 'Ordinamento stabile',
              pronunciation: '/ˈsteɪbl sɔːrt/',
              phonetic: 'STEI-bol SORT',
              example:
                "stable_sort preserves equal element order. = stable_sort preserva l'ordine di elementi uguali.",
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::stable_sort(v.begin(), v.end());',
              task: `Ordina il vettore v con std::stable_sort per preservare l'ordine relativo degli elementi considerati uguali.`,
            },
            {
              english: 'Std Find Algorithm',
              italian: 'Algoritmo std::find',
              pronunciation: '/faɪnd/',
              phonetic: 'FAIND',
              example: `The command parser uses the std::find algorithm to locate the first occurrence of the delimiter character in the input buffer. = Il parser dei comandi usa l'algoritmo std::find per localizzare la prima occorrenza del carattere delimitatore nel buffer di input.`,
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {10, 20, 30};
auto it = std::find(v.begin(), v.end(), 20);
if (it != v.end()) std::cout << "Found at index " << (it - v.begin());`,
              note: `Rinominato per distinguerlo dall'item 'Find' come membro di mappe/set di cpp_stl_2.`,
              task: `Cerca il valore x nel vettore v con l'algoritmo std::find sull'intervallo begin/end e conserva l'iteratore risultante.`,
            },
            {
              english: 'Find If',
              italian: 'Trova se',
              pronunciation: '/faɪnd ɪf/',
              phonetic: 'FAIND-IF',
              example:
                'The task scheduler calls find_if with a lambda that matches the first pending job whose priority exceeds the threshold. = Lo scheduler dei task chiama find_if con una lambda che individua il primo lavoro in attesa la cui priorità supera la soglia.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3, 4};
auto it = std::find_if(v.begin(), v.end(),
    [](int x) { return x > 2; });
if (it != v.end()) std::cout << *it; // 3`,
              task: 'Individua nel vettore v il primo elemento che soddisfa il predicato pred utilizzando std::find_if.',
            },
            {
              english: 'Binary Search',
              italian: 'Ricerca binaria',
              pronunciation: '/ˈbaɪnəri sɜːrtʃ/',
              phonetic: 'BAI-na-ri SERC',
              example:
                'Once the word list is sorted, the spell checker calls binary_search to verify each input word in O(log n) time. = Una volta che la lista di parole è ordinata, il correttore ortografico chiama binary_search per verificare ogni parola in input in tempo O(log n).',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 3, 5, 7, 9};
bool found = std::binary_search(v.begin(), v.end(), 5);
std::cout << std::boolalpha << found; // true`,
              task: 'Verifica con std::binary_search se il valore x è presente nel vettore ordinato v in tempo logaritmico.',
            },
            {
              english: 'Lower Bound',
              italian: 'Limite inferiore',
              pronunciation: '/ˈloʊər baʊnd/',
              phonetic: 'LO-er BAUND',
              example:
                'lower_bound returns first not-less iterator. = lower_bound restituisce il primo iteratore non minore.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 3, 5, 7};
auto it = std::lower_bound(v.begin(), v.end(), 4);
std::cout << *it; // 5 (first not less than 4)`,
              task: 'Trova con std::lower_bound il primo iteratore in v il cui valore non sia minore di x.',
            },
            {
              english: 'Upper Bound',
              italian: 'Limite superiore',
              pronunciation: '/ˈʌpər baʊnd/',
              phonetic: 'AP-per BAUND',
              example:
                'upper_bound returns first greater iterator. = upper_bound restituisce il primo iteratore maggiore.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto it = std::upper_bound(v.begin(), v.end(), x);',
              task: 'Trova con std::upper_bound il primo iteratore in v il cui valore sia strettamente maggiore di x.',
            },
            {
              english: 'Min Element',
              italian: 'Elemento minimo',
              pronunciation: '/mɪn ˈelɪmənt/',
              phonetic: 'MIN E-le-ment',
              example:
                'The weather dashboard calls min_element on the hourly temperatures vector to highlight the coldest reading of the day. = La dashboard meteo chiama min_element sul vettore delle temperature orarie per evidenziare la lettura più fredda della giornata.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {5, 2, 8, 1, 9};
auto it = std::min_element(v.begin(), v.end());
std::cout << "Min: " << *it; // 1`,
              task: `Individua l'elemento minimo nel vettore v invocando std::min_element sull'intervallo begin/end.`,
            },
            {
              english: 'Max Element',
              italian: 'Elemento massimo',
              pronunciation: '/mæks ˈelɪmənt/',
              phonetic: 'MAKS E-le-ment',
              example:
                'The benchmark suite calls max_element on the timing results to report the worst-case latency across all iterations. = La suite di benchmark chiama max_element sui risultati di timing per riportare la latenza nel caso peggiore tra tutte le iterazioni.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto it = std::max_element(v.begin(), v.end());',
              task: `Recupera con std::max_element l'iteratore al valore massimo presente nel vettore v.`,
            },
            {
              english: 'Comparator',
              italian: 'Comparatore',
              pronunciation: '/kəmˈpærətər/',
              phonetic: 'kom-PA-re-tor',
              example:
                'Passing std::greater<>{} as a comparator to std::sort arranges the scores in descending order for the leaderboard display. = Passare std::greater<>{} come comparatore a std::sort dispone i punteggi in ordine decrescente per la visualizzazione della classifica.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {3, 1, 4, 1, 5};
std::sort(v.begin(), v.end(), std::greater<>{});
for (int x : v) std::cout << x << " "; // 5 4 3 1 1`,
              task: 'Ordina il vettore v in modo decrescente passando std::greater<>{} come comparatore a std::sort.',
            },
          ],
        },
        {
          id: 'cpp_stl_6',
          title: 'Modifying Algorithms / Algoritmi Modificanti',
          description: 'Trasformazioni e copie',
          items: [
            {
              english: 'Transform',
              italian: 'Trasformazione',
              pronunciation: '/trænsˈfɔːrm/',
              phonetic: 'trans-FORM',
              example:
                'The image processor uses std::transform to apply a brightness adjustment function to every pixel in the buffer. = Il processore di immagini usa std::transform per applicare una funzione di regolazione della luminosità a ogni pixel nel buffer.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> a = {1, 2, 3}, b(3);
std::transform(a.begin(), a.end(), b.begin(),
    [](int x) { return x * x; });
// b = {1, 4, 9}`,
              task: `Applica la funzione f a ogni elemento di a scrivendo il risultato in b tramite l'algoritmo std::transform.`,
            },
            {
              english: 'Copy',
              italian: 'Copia',
              pronunciation: '/ˈkɒpi/',
              phonetic: 'KO-pi',
              example:
                'The backup routine uses std::copy to duplicate the active configuration buffer into a snapshot vector before applying changes. = La routine di backup usa std::copy per duplicare il buffer di configurazione attivo in un vettore snapshot prima di applicare le modifiche.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::copy(a.begin(), a.end(), b.begin());',
              task: 'Copia con std::copy gli elementi di a nel container b a partire dal suo iteratore di inizio.',
            },
            {
              english: 'Move',
              italian: 'Sposta',
              pronunciation: '/muːv/',
              phonetic: 'MUUV',
              example:
                "When migrating objects between containers, the resource manager calls the std::move algorithm to transfer ownership without deep copies. = Quando si migrano oggetti tra contenitori, il gestore risorse chiama l'algoritmo std::move per trasferire la proprietà senza copie profonde.",
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::move(a.begin(), a.end(), b.begin());',
              task: 'Sposta tutti gli elementi da a verso b con std::move trasferendone la proprietà senza copie profonde.',
            },
            {
              english: 'Fill',
              italian: 'Riempimento',
              pronunciation: '/fɪl/',
              phonetic: 'FIL',
              example:
                'Before reusing the pixel buffer, the renderer calls std::fill to set every element to the default background color value. = Prima di riutilizzare il buffer pixel, il renderer chiama std::fill per impostare ogni elemento al valore del colore di sfondo predefinito.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::fill(v.begin(), v.end(), 0);',
              task: `Riempi il vettore v con il valore 0 attraverso std::fill applicato all'intervallo begin/end.`,
            },
            {
              english: 'Generate',
              italian: 'Genera',
              pronunciation: '/ˈdʒenəreɪt/',
              phonetic: 'GE-ne-reit',
              example:
                'The test harness populates the data vector by calling std::generate with a random number engine to produce realistic input samples. = Il test harness popola il vettore dati chiamando std::generate con un motore di numeri casuali per produrre campioni di input realistici.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::generate(v.begin(), v.end(), rng);',
              task: 'Popola il vettore v invocando std::generate con un generatore rng che produce ogni nuovo valore.',
            },
            {
              english: 'Replace',
              italian: 'Sostituisci',
              pronunciation: '/rɪˈpleɪs/',
              phonetic: 'ri-PLEIS',
              example:
                'After detecting corrupted sensor readings, the calibration module calls std::replace to swap every sentinel value with the corrected default. = Dopo aver rilevato letture del sensore corrotte, il modulo di calibrazione chiama std::replace per sostituire ogni valore sentinella con il valore corretto predefinito.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::replace(v.begin(), v.end(), 0, 1);',
              task: `Sostituisci nel vettore v ogni occorrenza di 0 con 1 utilizzando l'algoritmo std::replace.`,
            },
            {
              english: 'Remove',
              italian: 'Rimuovi',
              pronunciation: '/rɪˈmuːv/',
              phonetic: 'ri-MUUV',
              example:
                "The event filter uses std::remove to logically discard expired entries from the queue before erasing the trailing range. = Il filtro eventi usa std::remove per scartare logicamente le voci scadute dalla coda prima di cancellare l'intervallo finale.",
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 0, 2, 0, 3};
auto it = std::remove(v.begin(), v.end(), 0);
v.erase(it, v.end());
// v = {1, 2, 3}`,
              note: 'Va seguito da v.erase(it, v.end()) (erase-remove idiom).',
              task: `Sposta in fondo a v tutte le occorrenze di 0 con std::remove e conserva l'iteratore al nuovo end logico.`,
            },
            {
              english: 'Erase Remove Idiom',
              italian: 'Idioma erase-remove',
              pronunciation: '/ɪˈreɪs rɪˈmuːv/',
              phonetic: 'i-REIS ri-MUUV',
              example:
                "To clean up disconnected sessions, the server applies the erase-remove idiom to permanently shrink the client list in a single pass. = Per ripulire le sessioni disconnesse, il server applica l'idioma erase-remove per ridurre permanentemente la lista client in un singolo passaggio.",
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3, 2, 4};
v.erase(std::remove(v.begin(), v.end(), 2), v.end());
for (int x : v) std::cout << x << " "; // 1 3 4`,
              note: 'In C++20 puoi usare std::erase direttamente.',
              task: `Elimina fisicamente tutte le occorrenze di 0 da v applicando l'idioma erase-remove con std::remove ed erase.`,
            },
            {
              english: 'Unique',
              italian: 'Unico',
              pronunciation: '/juːˈniːk/',
              phonetic: 'iu-NIIK',
              example:
                'After sorting the log timestamps, the deduplication step calls std::unique to collapse consecutive duplicate entries into a single representative. = Dopo aver ordinato i timestamp dei log, il passaggio di deduplicazione chiama std::unique per comprimere le voci duplicate consecutive in un singolo rappresentante.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 1, 2, 3, 3};
auto it = std::unique(v.begin(), v.end());
v.erase(it, v.end());
// v = {1, 2, 3}`,
              task: `Comprimi i duplicati consecutivi nel vettore v invocando std::unique e conservando l'iteratore al nuovo end logico.`,
            },
            {
              english: 'Reverse',
              italian: 'Inverti',
              pronunciation: '/rɪˈvɜːrs/',
              phonetic: 'ri-VERS',
              example:
                "The string utility calls std::reverse on the character vector to flip a palindrome candidate before comparing it to the original. = L'utility per stringhe chiama std::reverse sul vettore di caratteri per invertire un candidato palindromo prima di confrontarlo con l'originale.",
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::reverse(v.begin(), v.end());',
              task: `Inverti in-place l'ordine degli elementi nel vettore v applicando std::reverse sull'intervallo begin/end.`,
            },
          ],
        },
        {
          id: 'cpp_stl_7',
          title: 'Numeric Algorithms / Algoritmi Numerici',
          description: 'Algoritmi numerici e di riduzione',
          items: [
            {
              english: 'Accumulate',
              italian: 'Somma',
              pronunciation: '/əˈkjuːmjəleɪt/',
              phonetic: 'a-KIU-miu-leit',
              example:
                'The invoice module calls std::accumulate to compute the grand total by summing every line-item price in the order vector. = Il modulo fatture chiama std::accumulate per calcolare il totale sommando ogni prezzo delle voci nel vettore ordini.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3, 4, 5};
int sum = std::accumulate(v.begin(), v.end(), 0);
std::cout << "Sum: " << sum; // 15`,
              note: 'Richiede <numeric>.',
              task: `Calcola la somma di tutti gli elementi di v partendo da 0 invocando std::accumulate dall'header numeric.`,
            },
            {
              english: 'Reduce',
              italian: 'Riduzione',
              pronunciation: '/rɪˈdjuːs/',
              phonetic: 'ri-DIUS',
              example:
                'The analytics engine uses std::reduce with a parallel execution policy to aggregate millions of telemetry samples across CPU cores. = Il motore di analisi usa std::reduce con una policy di esecuzione parallela per aggregare milioni di campioni di telemetria tra i core della CPU.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto sum = std::reduce(v.begin(), v.end());',
              note: 'Disponibile da C++17.',
              task: 'Aggrega gli elementi di v con std::reduce sfruttando la potenziale esecuzione parallela introdotta in C++17.',
            },
            {
              english: 'Inner Product',
              italian: 'Prodotto interno',
              pronunciation: '/ˈɪnər ˈprɒdʌkt/',
              phonetic: 'IN-er PROD-akt',
              example:
                'The physics engine calls inner_product on the force and displacement vectors to compute the work done on each rigid body per frame. = Il motore fisico chiama inner_product sui vettori forza e spostamento per calcolare il lavoro svolto su ogni corpo rigido per frame.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto dp = std::inner_product(a.begin(), a.end(), b.begin(), 0);',
              task: `Calcola con std::inner_product il prodotto scalare tra i vettori a e b partendo dall'accumulatore 0.`,
            },
            {
              english: 'Partial Sum',
              italian: 'Somma parziale',
              pronunciation: '/ˈpɑːrʃəl sʌm/',
              phonetic: 'PAR-scial SAM',
              example:
                "The range-query optimizer precomputes a prefix array by calling partial_sum so that any sub-range total can be answered in constant time. = L'ottimizzatore di query a intervallo precalcola un array di prefissi chiamando partial_sum così che qualsiasi totale di sotto-intervallo possa essere risposto in tempo costante.",
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::partial_sum(a.begin(), a.end(), b.begin());',
              task: 'Genera nel vettore b le somme parziali progressive dei valori di a invocando std::partial_sum.',
            },
            {
              english: 'Adjacent Difference',
              italian: 'Differenza adiacente',
              pronunciation: '/əˈdʒeɪsənt/',
              phonetic: 'a-GEI-sent',
              example:
                "The signal processing pipeline applies adjacent_difference to the sampled waveform to obtain the rate of change between consecutive readings. = La pipeline di elaborazione del segnale applica adjacent_difference alla forma d'onda campionata per ottenere la velocità di variazione tra letture consecutive.",
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::adjacent_difference(a.begin(), a.end(), b.begin());',
              task: 'Scrivi in b le differenze tra elementi consecutivi di a applicando std::adjacent_difference.',
            },
            {
              english: 'Iota',
              italian: 'Riempimento incrementale (std::iota)',
              pronunciation: '/aɪˈoʊtə/',
              phonetic: 'AI-O-ta',
              example:
                "Before shuffling the deck, the card game initializes the index array by calling std::iota to assign each slot its sequential position number. = Prima di mescolare il mazzo, il gioco di carte inizializza l'array di indici chiamando std::iota per assegnare a ogni posizione il suo numero sequenziale.",
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v(5);
std::iota(v.begin(), v.end(), 1);
for (int x : v) std::cout << x << " "; // 1 2 3 4 5`,
              note: 'Genera 0, 1, 2, 3, ...',
              task: 'Riempi il vettore v con la sequenza 0, 1, 2, ... usando std::iota a partire dal valore iniziale 0.',
            },
            {
              english: 'Count',
              italian: 'Conta',
              pronunciation: '/kaʊnt/',
              phonetic: 'KAUNT',
              example:
                "The voting system uses std::count to tally how many ballots in the vector match the selected candidate identifier. = Il sistema di voto usa std::count per contare quante schede nel vettore corrispondono all'identificatore del candidato selezionato.",
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 1, 3, 1};
auto n = std::count(v.begin(), v.end(), 1);
std::cout << "Count of 1: " << n; // 3`,
              task: `Conta con std::count quante volte il valore 1 compare nel vettore v lungo l'intervallo begin/end.`,
            },
            {
              english: 'Count If',
              italian: 'Conta se',
              pronunciation: '/kaʊnt ɪf/',
              phonetic: 'KAUNT-IF',
              example:
                'The monitoring dashboard calls count_if with a lambda predicate to determine how many servers currently exceed the CPU usage threshold. = La dashboard di monitoraggio chiama count_if con un predicato lambda per determinare quanti server superano attualmente la soglia di utilizzo della CPU.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3, 4, 5};
auto n = std::count_if(v.begin(), v.end(),
    [](int x) { return x % 2 == 0; });
std::cout << "Evens: " << n; // 2`,
              task: 'Conta con std::count_if quanti elementi di v soddisfano il predicato pred passato come terzo argomento.',
            },
            {
              english: 'All Of',
              italian: 'Tutti',
              pronunciation: '/ɔːl ɒv/',
              phonetic: 'OOL-OV',
              example:
                'Before launching the spacecraft simulation, the pre-flight check uses all_of to verify that every subsystem reports a ready status. = Prima di lanciare la simulazione del veicolo spaziale, il controllo pre-volo usa all_of per verificare che ogni sottosistema riporti uno stato pronto.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {2, 4, 6};
bool allEven = std::all_of(v.begin(), v.end(),
    [](int x) { return x % 2 == 0; });
std::cout << std::boolalpha << allEven; // true`,
              task: 'Verifica con std::all_of che tutti gli elementi di v rispettino la condizione descritta dal predicato pred.',
            },
            {
              english: 'Any Of',
              italian: 'Almeno uno',
              pronunciation: '/ˈeni ɒv/',
              phonetic: 'E-ni-OV',
              example:
                'The firewall rule engine calls any_of to check whether at least one access-control entry permits the incoming connection request. = Il motore di regole del firewall chiama any_of per verificare se almeno una voce di controllo accessi permette la richiesta di connessione in arrivo.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 3, 4, 7};
bool hasEven = std::any_of(v.begin(), v.end(),
    [](int x) { return x % 2 == 0; });
std::cout << std::boolalpha << hasEven; // true`,
              task: `Verifica con std::any_of se almeno un elemento di v soddisfa il predicato pred passato all'algoritmo.`,
            },
          ],
        },
        {
          id: 'cpp_stl_8',
          title: 'Ranges & Views / Range e Viste',
          description: 'Ranges di C++20',
          items: [
            {
              english: 'Ranges Library',
              italian: 'Libreria ranges',
              pronunciation: '/ˈreɪndʒɪz/',
              phonetic: 'REIN-gez',
              example:
                'By switching from iterator pairs to the ranges library, the team made the data pipeline far more readable and composable without sacrificing performance. = Passando dalle coppie di iteratori alla libreria ranges, il team ha reso la pipeline dati molto più leggibile e componibile senza sacrificare le prestazioni.',
              context: 'stl',
              difficulty: 'intermediate',
              code: '#include <ranges>',
              note: 'Disponibile da C++20.',
              task: `Includi l'header <ranges> per abilitare la libreria ranges di C++20 con i suoi algoritmi e adattatori.`,
            },
            {
              english: 'Range',
              italian: 'Intervallo (range)',
              pronunciation: '/reɪndʒ/',
              phonetic: 'REINGE',
              example:
                'In C++20 any container that exposes begin and end iterators qualifies as a range, allowing algorithms to accept it directly without manual iterator extraction. = In C++20 qualsiasi contenitore che espone iteratori begin e end si qualifica come range, permettendo agli algoritmi di accettarlo direttamente senza estrazione manuale degli iteratori.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'std::ranges::sort(v);',
              task: 'Ordina il container v in-place passandolo direttamente come range a std::ranges::sort senza iteratori espliciti.',
            },
            {
              english: 'View',
              italian: 'Vista',
              pronunciation: '/vjuː/',
              phonetic: 'VIU',
              example:
                'Because a view is a lightweight, non-owning lazy range, the logging framework can chain multiple filters without allocating temporary containers. = Poiché una view è un range lazy leggero e non proprietario, il framework di logging può concatenare più filtri senza allocare contenitori temporanei.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto v = std::views::iota(0, 10);',
              task: 'Costruisci una view lazy degli interi da 0 a 9 utilizzando std::views::iota e salvala in v.',
            },
            {
              english: 'Filter View',
              italian: 'Vista filtro',
              pronunciation: '/ˈfɪltər vjuː/',
              phonetic: 'FIL-ter VIU',
              example:
                'The report generator pipes the transaction list through std::views::filter to retain only entries whose amount exceeds the audit threshold. = Il generatore di report convoglia la lista transazioni attraverso std::views::filter per mantenere solo le voci il cui importo supera la soglia di audit.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3, 4, 5};
auto evens = v | std::views::filter(
    [](int x) { return x % 2 == 0; });
for (int x : evens) std::cout << x << " "; // 2 4`,
              task: 'Crea una vista filtro evens che lascia passare solo gli elementi pari del vettore v tramite std::views::filter.',
            },
            {
              english: 'Transform View',
              italian: 'Vista trasformazione',
              pronunciation: '/trænsˈfɔːrm vjuː/',
              phonetic: 'trans-FORM VIU',
              example:
                'The serialization layer pipes each record through std::views::transform to convert raw structs into their JSON string representations lazily. = Il livello di serializzazione convoglia ogni record attraverso std::views::transform per convertire le struct grezze nelle loro rappresentazioni stringa JSON in modo lazy.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3};
auto sq = v | std::views::transform(
    [](int x) { return x * x; });
for (int x : sq) std::cout << x << " "; // 1 4 9`,
              task: 'Crea una vista sq che eleva al quadrato ogni elemento di v tramite std::views::transform con una lambda.',
            },
            {
              english: 'Take View',
              italian: 'Vista take',
              pronunciation: '/teɪk vjuː/',
              phonetic: 'TEIK VIU',
              example:
                'The preview panel uses std::views::take to display only the first five search results from the potentially enormous match list. = Il pannello di anteprima usa std::views::take per visualizzare solo i primi cinque risultati di ricerca dalla lista di corrispondenze potenzialmente enorme.',
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {10, 20, 30, 40, 50};
auto first3 = v | std::views::take(3);
for (int x : first3) std::cout << x << " "; // 10 20 30`,
              task: 'Costruisci una vista first3 con std::views::take che restituisce solo i primi tre elementi del range v.',
            },
            {
              english: 'Drop View',
              italian: 'Vista drop',
              pronunciation: '/drɒp vjuː/',
              phonetic: 'DROP VIU',
              example:
                'After reading the CSV header row, the parser applies std::views::drop to skip the first line and process only the data rows. = Dopo aver letto la riga di intestazione CSV, il parser applica std::views::drop per saltare la prima riga e processare solo le righe dati.',
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto rest = v | std::views::drop(3);',
              task: 'Costruisci una vista rest con std::views::drop che salta i primi tre elementi del range v.',
            },
            {
              english: 'Pipe Operator',
              italian: 'Operatore pipe',
              pronunciation: '/paɪp/',
              phonetic: 'PAIP',
              example:
                "The data pipeline reads sensor values and uses the pipe operator to chain a filter, a transform, and a take view into a single readable expression. = La pipeline dati legge i valori dei sensori e usa l'operatore pipe per concatenare un filtro, una trasformazione e una vista take in un'unica espressione leggibile.",
              context: 'stl',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3, 4, 5};
auto result = v
    | std::views::filter([](int x) { return x > 2; })
    | std::views::transform([](int x) { return x * 10; });
for (int x : result) std::cout << x << " "; // 30 40 50`,
              task: `Concatena con l'operatore pipe la view filter(p) e transform(f) sul range v per comporre una pipeline lazy.`,
            },
            {
              english: 'Lazy Evaluation',
              italian: 'Valutazione pigra',
              pronunciation: '/ˈleɪzi/',
              phonetic: 'LEI-zi',
              example:
                'Thanks to lazy evaluation, chaining multiple views processes each element on demand without creating intermediate containers or copying data. = Grazie alla valutazione pigra, concatenare più viste processa ogni elemento su richiesta senza creare contenitori intermedi o copiare dati.',
              context: 'stl',
              difficulty: 'intermediate',
              note: 'Niente copie intermedie.',
            },
            {
              english: 'Range Algorithm',
              italian: 'Algoritmo su range',
              pronunciation: '/reɪndʒ ˈælɡərɪðəm/',
              phonetic: 'REINGE AL-go-ri-tem',
              example:
                "Instead of passing begin and end iterators manually, the modernized codebase calls the range algorithm std::ranges::find and passes the container directly. = Invece di passare iteratori begin e end manualmente, il codice modernizzato chiama l'algoritmo su range std::ranges::find e passa il contenitore direttamente.",
              context: 'stl',
              difficulty: 'intermediate',
              code: 'auto it = std::ranges::find(v, x);',
              task: `Cerca il valore x nel container v con l'algoritmo su range std::ranges::find passando direttamente v come argomento.`,
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 8 - TEMPLATE BASE / BASIC TEMPLATES
    // ════════════════════════════════════════════════
    8: {
      name: 'Template di Base / Basic Templates',
      description: 'Funzioni e classi template',
      lessons: [
        {
          id: 'cpp_templates_1',
          title: 'Function Templates / Template di Funzione',
          description: 'Funzioni generiche con template',
          items: [
            {
              english: 'Template',
              italian: 'Modello generico (template)',
              pronunciation: '/ˈtemplət/',
              phonetic: 'TEM-plet',
              example:
                'Rather than writing separate functions for int and double, the math library defines a single template that generates type-safe code for any numeric type. = Invece di scrivere funzioni separate per int e double, la libreria matematica definisce un singolo template che genera codice type-safe per qualsiasi tipo numerico.',
              context: 'templates',
              difficulty: 'intermediate',
              code: `template <typename T>
T add(T a, T b) { return a + b; }
auto r = add(3, 4); // 7`,
              task: 'Dichiara un template di funzione add che somma due valori dello stesso tipo T deducendolo dagli argomenti.',
            },
            {
              english: 'Function Template',
              italian: 'Template di funzione',
              pronunciation: '/ˈfʌŋkʃən ˈtemplət/',
              phonetic: 'FANK-scen TEM-plet',
              example:
                "The serialization library uses function templates so the same encode routine can handle integers, strings, and user-defined types transparently. = La libreria di serializzazione usa template di funzione così che la stessa routine encode possa gestire interi, stringhe e tipi definiti dall'utente in modo trasparente.",
              context: 'templates',
              difficulty: 'intermediate',
              code: `template<class T>
T maxVal(T a, T b) { return (a > b) ? a : b; }
std::cout << maxVal(3, 7); // 7`,
              task: 'Scrivi un function template max<T> che restituisce il maggiore fra due valori dello stesso tipo T.',
            },
            {
              english: 'Type Parameter',
              italian: 'Parametro di tipo',
              pronunciation: '/taɪp pəˈræmɪtər/',
              phonetic: 'TAIP pa-RA-mi-ter',
              example:
                'When declaring the container class, the developer introduces a type parameter T so the compiler can substitute the actual element type at each instantiation site. = Quando si dichiara la classe contenitore, lo sviluppatore introduce un parametro di tipo T così che il compilatore possa sostituire il tipo di elemento effettivo in ogni punto di istanziazione.',
              context: 'templates',
              difficulty: 'intermediate',
              code: 'template <typename T>',
              task: 'Introduci un type parameter T usando template<typename T> per parametrizzare la funzione sul tipo degli argomenti.',
            },
            {
              english: 'Typename Keyword',
              italian: 'Parola chiave typename',
              pronunciation: '/ˈtaɪpneɪm/',
              phonetic: 'TAIP-neim',
              example:
                "Inside the template declaration, the typename keyword tells the compiler that the following identifier represents a type rather than a value. = All'interno della dichiarazione template, la parola chiave typename dice al compilatore che l'identificatore seguente rappresenta un tipo piuttosto che un valore.",
              context: 'templates',
              difficulty: 'intermediate',
              note: 'Sinonimo di class nei template.',
            },
            {
              english: 'Class Keyword Template',
              italian: 'Parola chiave class nei template',
              pronunciation: '/klɑːs/',
              phonetic: 'KLAAS',
              example:
                'In older codebases you may see the class keyword used instead of typename to declare type parameters, as both are interchangeable in template parameter lists. = Nei codici più vecchi potresti vedere la parola chiave class usata al posto di typename per dichiarare parametri di tipo, dato che entrambe sono intercambiabili nelle liste di parametri template.',
              context: 'templates',
              difficulty: 'intermediate',
              code: 'template <class T>',
              task: 'Usa la parola chiave class al posto di typename per dichiarare il parametro di tipo T del template.',
            },
            {
              english: 'Template Argument',
              italian: 'Argomento di template',
              pronunciation: '/ˈtemplət ˈɑːrɡjumənt/',
              phonetic: 'TEM-plet AR-giu-ment',
              example:
                "When calling the generic function explicitly, the developer specifies the template argument in angle brackets to force a particular specialization. = Quando si chiama esplicitamente la funzione generica, lo sviluppatore specifica l'argomento di template in parentesi angolari per forzare una specializzazione particolare.",
              context: 'templates',
              difficulty: 'intermediate',
              code: `template<class T>
T identity(T x) { return x; }
auto a = identity<int>(42);
auto b = identity<double>(3.14);`,
              task: `Chiama add specificando esplicitamente l'argomento di template int con la sintassi add<int>(1, 2).`,
            },
            {
              english: 'Template Instantiation',
              italian: 'Istanziazione di template',
              pronunciation: '/ɪnˌstænʃiˈeɪʃən/',
              phonetic: 'in-stan-scia-EI-scion',
              example:
                'Every distinct type used with the generic sort function triggers a new template instantiation, producing a dedicated machine-code version for that type. = Ogni tipo distinto usato con la funzione generica sort attiva una nuova istanziazione del template, producendo una versione di codice macchina dedicata per quel tipo.',
              context: 'templates',
              difficulty: 'intermediate',
            },
            {
              english: 'Type Deduction',
              italian: 'Deduzione di tipo',
              pronunciation: '/taɪp dɪˈdʌkʃən/',
              phonetic: 'TAIP di-DAK-scion',
              example:
                'When the caller passes two integers, the compiler automatically performs type deduction and resolves T to int without requiring explicit angle-bracket syntax. = Quando il chiamante passa due interi, il compilatore esegue automaticamente la deduzione di tipo e risolve T a int senza richiedere la sintassi esplicita con parentesi angolari.',
              context: 'templates',
              difficulty: 'intermediate',
              code: `template<class T>
T square(T x) { return x * x; }
auto a = square(5);    // T = int
auto b = square(2.5);  // T = double`,
              task: 'Invoca add(1, 2) lasciando che il compilatore deduca T come int senza parentesi angolari esplicite.',
            },
            {
              english: 'Generic Function',
              italian: 'Funzione generica',
              pronunciation: '/dʒəˈnerɪk/',
              phonetic: 'gie-NE-rik',
              example:
                "The math toolkit exposes a single generic function for linear interpolation that works with floats, doubles, and custom fixed-point types equally well. = Il toolkit matematico espone una singola funzione generica per l'interpolazione lineare che funziona ugualmente bene con float, double e tipi a virgola fissa personalizzati.",
              context: 'templates',
              difficulty: 'intermediate',
            },
            {
              english: 'Compile Time Code',
              italian: 'Codice a tempo di compilazione',
              pronunciation: '/kəmˈpaɪl taɪm/',
              phonetic: 'kom-PAIL TAIM',
              example:
                'Because templates are resolved entirely at compile time, the generated binary contains fully optimized machine code with no runtime dispatch overhead. = Poiché i template vengono risolti interamente a tempo di compilazione, il binario generato contiene codice macchina completamente ottimizzato senza overhead di dispatch a runtime.',
              context: 'templates',
              difficulty: 'intermediate',
              note: 'Nessun overhead a runtime.',
            },
          ],
        },
        {
          id: 'cpp_templates_2',
          title: 'Class Templates / Template di Classe',
          description: 'Classi generiche e contenitori',
          items: [
            {
              english: 'Class Template',
              italian: 'Template di classe',
              pronunciation: '/klɑːs ˈtemplət/',
              phonetic: 'KLAAS TEM-plet',
              example:
                "The standard library's std::vector is a class template that generates a distinct, type-safe dynamic array for each element type you specify. = Lo std::vector della libreria standard è un template di classe che genera un array dinamico distinto e type-safe per ogni tipo di elemento che si specifica.",
              context: 'templates',
              difficulty: 'intermediate',
              code: `template<class T>
class Box {
    T value;
public:
    Box(T v) : value(v) {}
    T get() const { return value; }
};
Box<int> b(42);`,
              task: 'Definisci una class template Box<T> con un singolo membro value di tipo T per incapsulare un valore generico.',
            },
            {
              english: 'Generic Container',
              italian: 'Container generico',
              pronunciation: '/dʒəˈnerɪk kənˈteɪnər/',
              phonetic: 'gie-NE-rik kon-TEI-ner',
              example:
                "The engine's resource cache is implemented as a generic container so it can store textures, meshes, and audio clips with the same interface. = La cache delle risorse del motore è implementata come container generico così può memorizzare texture, mesh e clip audio con la stessa interfaccia.",
              context: 'templates',
              difficulty: 'intermediate',
            },
            {
              english: 'Template Member Function',
              italian: 'Funzione membro template',
              pronunciation: '/ˈtemplət ˈmembər/',
              phonetic: 'TEM-plet MEM-ber',
              example:
                'The allocator-aware container defines a template member function for converting from any compatible allocator type during construction. = Il contenitore allocator-aware definisce una funzione membro template per la conversione da qualsiasi tipo di allocatore compatibile durante la costruzione.',
              context: 'templates',
              difficulty: 'intermediate',
            },
            {
              english: 'Template Header',
              italian: 'Header di template',
              pronunciation: '/ˈtemplət ˈhedər/',
              phonetic: 'TEM-plet HED-er',
              example:
                'Because the compiler needs the full definition to instantiate a template, the project places all template code in the header file rather than splitting it into a separate source file. = Poiché il compilatore necessita della definizione completa per istanziare un template, il progetto inserisce tutto il codice template nel file header piuttosto che separarlo in un file sorgente distinto.',
              context: 'templates',
              difficulty: 'intermediate',
              note: 'Causa: il compilatore deve vedere la definizione per istanziare.',
            },
            {
              english: 'Class Template Argument Deduction',
              italian: 'Deduzione argomenti di classe template',
              pronunciation: '/dɪˈdʌkʃən/',
              phonetic: 'di-DAK-scion',
              example:
                'With C++17 class template argument deduction, you can write std::pair p{1, 2.0} and the compiler infers pair<int,double> automatically through CTAD. = Con la deduzione degli argomenti del template di classe di C++17, puoi scrivere std::pair p{1, 2.0} e il compilatore inferisce pair<int,double> automaticamente tramite CTAD.',
              context: 'templates',
              difficulty: 'intermediate',
              code: 'std::pair p{1, 2.0}; // pair<int,double>',
              note: 'Disponibile da C++17.',
              task: 'Costruisci std::pair p{1, 2.0} sfruttando CTAD perché il compilatore deduca pair<int,double> automaticamente.',
            },
            {
              english: 'Deduction Guide',
              italian: 'Guida di deduzione',
              pronunciation: '/dɪˈdʌkʃən ɡaɪd/',
              phonetic: 'di-DAK-scion GAID',
              example:
                'The custom container provides an explicit deduction guide so that the compiler can infer the element type from iterator pairs passed to the constructor. = Il contenitore personalizzato fornisce una guida di deduzione esplicita così che il compilatore possa inferire il tipo di elemento dalle coppie di iteratori passate al costruttore.',
              context: 'templates',
              difficulty: 'intermediate',
              code: 'template<class T> Box(T) -> Box<T>;',
              task: 'Aggiungi una deduction guide template<class T> Box(T) -> Box<T> per consentire la deduzione del tipo dal costruttore.',
            },
            {
              english: 'Specialization',
              italian: 'Specializzazione',
              pronunciation: '/ˌspeʃəlaɪˈzeɪʃən/',
              phonetic: 'spe-scia-lai-ZEI-scion',
              example:
                'The hash template has a specialization for std::string that uses an optimized algorithm instead of the generic byte-level fallback. = Il template hash ha una specializzazione per std::string che usa un algoritmo ottimizzato invece del fallback generico a livello di byte.',
              context: 'templates',
              difficulty: 'intermediate',
              code: `template<class T>
class Printer {
public:
    void print(T v) { std::cout << v; }
};
template<>
class Printer<bool> {
public:
    void print(bool v) { std::cout << (v ? "true" : "false"); }
};`,
              task: 'Fornisci una specializzazione completa di Box per il tipo bool con template<> class Box<bool>.',
            },
            {
              english: 'Partial Specialization',
              italian: 'Specializzazione parziale',
              pronunciation: '/ˈpɑːrʃəl/',
              phonetic: 'PAR-scial',
              example:
                'The smart-pointer traits use partial specialization to provide a different deleter strategy whenever the element type is an array rather than a single object. = I traits dello smart pointer usano la specializzazione parziale per fornire una strategia di deleter diversa ogni volta che il tipo di elemento è un array anziché un singolo oggetto.',
              context: 'templates',
              difficulty: 'intermediate',
              code: 'template<class T> class Box<T*> {};',
              note: 'Disponibile solo per template di classe.',
              task: 'Crea una specializzazione parziale di Box per puntatori usando template<class T> class Box<T*>.',
            },
            {
              english: 'Full Specialization',
              italian: 'Specializzazione completa',
              pronunciation: '/fʊl/',
              phonetic: 'FUL',
              example:
                "The serializer's full specialization for bool encodes values as single bits instead of full bytes to minimize the binary payload size. = La specializzazione completa del serializzatore per bool codifica i valori come singoli bit invece di byte completi per minimizzare la dimensione del payload binario.",
              context: 'templates',
              difficulty: 'intermediate',
              code: 'template<> class Box<int> {};',
              task: 'Specializza completamente Box per int scrivendo template<> class Box<int> con una sintassi diversa dal template generico.',
            },
            {
              english: 'Generic Programming',
              italian: 'Programmazione generica',
              pronunciation: '/dʒəˈnerɪk ˈproʊɡræmɪŋ/',
              phonetic: 'gie-NE-rik PRO-gram-ming',
              example:
                "The STL demonstrates how C++ embraces generic programming by providing algorithms and containers that operate on any type satisfying the required interface. = La STL dimostra come C++ abbracci la programmazione generica fornendo algoritmi e contenitori che operano su qualsiasi tipo che soddisfi l'interfaccia richiesta.",
              context: 'templates',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'cpp_templates_3',
          title: 'Non-Type Parameters / Parametri Non Tipo',
          description: 'Parametri di template non tipo',
          items: [
            {
              english: 'Non-Type Parameter',
              italian: 'Parametro non di tipo',
              pronunciation: '/nɒn taɪp pəˈræmɪtər/',
              phonetic: 'NON-TAIP pa-RA-mi-ter',
              example:
                'The fixed-size buffer class accepts a non-type parameter N that specifies the capacity at compile time, avoiding heap allocations entirely. = La classe buffer a dimensione fissa accetta un parametro non di tipo N che specifica la capacità a tempo di compilazione, evitando completamente le allocazioni heap.',
              context: 'templates',
              difficulty: 'intermediate',
              code: `template<int N>
class Buffer {
    int data[N];
public:
    int size() const { return N; }
};
Buffer<64> buf;`,
              task: 'Parametrizza la classe Buffer su un valore int N invece che su un tipo con template<int N>.',
            },
            {
              english: 'Integer Parameter',
              italian: 'Parametro intero',
              pronunciation: '/ˈɪntɪdʒər/',
              phonetic: 'IN-ti-ger',
              example:
                "std::array uses an integer parameter to fix the size of the array at compile time, enabling stack allocation and bounds-check optimizations. = std::array usa un parametro intero per fissare la dimensione dell'array a tempo di compilazione, abilitando l'allocazione sullo stack e le ottimizzazioni del controllo dei limiti.",
              context: 'templates',
              difficulty: 'intermediate',
              code: 'std::array<int, 10> a;',
              task: 'Istanzia std::array<int, 10> passando 10 come parametro intero non di tipo che fissa la dimensione.',
            },
            {
              english: 'Pointer Parameter',
              italian: 'Parametro puntatore',
              pronunciation: '/ˈpɔɪntər/',
              phonetic: 'POIN-ter',
              example:
                'A compile-time callback can be injected via a pointer parameter, letting the template select the comparison function without virtual dispatch overhead. = Un callback a tempo di compilazione può essere iniettato tramite un parametro puntatore, permettendo al template di selezionare la funzione di confronto senza overhead di dispatch virtuale.',
              context: 'templates',
              difficulty: 'intermediate',
            },
            {
              english: 'Auto Template',
              italian: 'Auto in template',
              pronunciation: '/ˈɔːtoʊ/',
              phonetic: 'OO-to',
              example:
                'Since C++17, using auto in a template parameter list lets the compiler deduce the non-type parameter type from the value passed at each instantiation point. = Da C++17, usare auto nella lista dei parametri template permette al compilatore di dedurre il tipo del parametro non tipo dal valore passato in ogni punto di istanziazione.',
              context: 'templates',
              difficulty: 'intermediate',
              code: 'template<auto N> /* ... */',
              note: 'Disponibile da C++17.',
              task: 'Usa template<auto N> per accettare un valore costante non di tipo lasciando dedurre il tipo al compilatore.',
            },
            {
              english: 'Template Default Argument',
              italian: 'Argomento template di default',
              pronunciation: '/dɪˈfɔːlt/',
              phonetic: 'di-FOLT',
              example:
                'A template default argument for the allocator parameter spares callers from spelling it out every time they instantiate the container. = Un argomento template di default per il parametro allocatore evita ai chiamanti di scriverlo ogni volta che istanziano il contenitore.',
              context: 'templates',
              difficulty: 'intermediate',
              code: `template<class T = int>
class Stack {
    std::vector<T> data;
public:
    void push(T v) { data.push_back(v); }
};
Stack<> s; // uses int`,
              note: `Rinominato per distinguerlo dall'item 'Default Argument' delle funzioni di cpp_foundations_6.`,
              task: 'Imposta un argomento template di default scrivendo template<class T = int> class A perché T sia int se omesso.',
            },
            {
              english: 'Template Template',
              italian: 'Template di template',
              pronunciation: '/ˈtemplət ˈtemplət/',
              phonetic: 'TEM-plet TEM-plet',
              example:
                'The generic graph class uses a template template parameter so the caller can choose whether edges are stored in a vector, a list, or another container. = La classe grafo generica usa un parametro template di template così che il chiamante possa scegliere se i lati sono memorizzati in un vector, una list o un altro contenitore.',
              context: 'templates',
              difficulty: 'intermediate',
              code: 'template<template<class> class C>',
              task: 'Dichiara un parametro template di template con template<template<class> class C> per accettare un container generico.',
            },
            {
              english: 'Type Alias Template',
              italian: 'Alias di tipo template',
              pronunciation: '/ˈeɪliəs/',
              phonetic: 'EI-li-as',
              example:
                'The project defines a type alias template Vec<T> as a shorthand for std::vector<T, custom_allocator<T>> to keep declarations concise across the codebase. = Il progetto definisce un alias di tipo template Vec<T> come abbreviazione di std::vector<T, custom_allocator<T>> per mantenere le dichiarazioni concise in tutto il codice.',
              context: 'templates',
              difficulty: 'intermediate',
              code: `template<class T>
using Vec = std::vector<T>;
Vec<int> numbers = {1, 2, 3};
Vec<std::string> words = {"hi"};`,
              note: 'Disponibile da C++11.',
              task: 'Definisci un alias template Vec<T> equivalente a std::vector<T> usando template<class T> using.',
            },
            {
              english: 'Variable Template',
              italian: 'Variabile template',
              pronunciation: '/ˈveəriəbl/',
              phonetic: 'VE-ri-a-bol',
              example:
                "The math header defines a variable template for pi so the constant is automatically provided in the correct precision for float, double, and long double. = L'header matematico definisce una variabile template per pi così che la costante venga fornita automaticamente nella precisione corretta per float, double e long double.",
              context: 'templates',
              difficulty: 'intermediate',
              code: `template<class T>
constexpr T pi = T(3.14159265358979);
auto f = pi<float>;
auto d = pi<double>;`,
              note: 'Disponibile da C++14.',
              task: 'Crea una variabile template pi<T> di valore T(3.14) parametrizzata sul tipo numerico con constexpr.',
            },
            {
              english: 'Compile Time Constant',
              italian: 'Costante a compile time',
              pronunciation: '/kəmˈpaɪl taɪm/',
              phonetic: 'kom-PAIL TAIM',
              example:
                'Passing a runtime variable as a non-type template argument will not compile because the value must be a compile-time constant known before code generation begins. = Passare una variabile runtime come argomento template non di tipo non compilerà perché il valore deve essere una costante a compile-time nota prima che inizi la generazione del codice.',
              context: 'templates',
              difficulty: 'intermediate',
            },
            {
              english: 'Constexpr Parameter',
              italian: 'Parametro constexpr',
              pronunciation: '/kɒnstˈekspər/',
              phonetic: 'kons-TEK-sper',
              example:
                'In C++20 you can pass a constexpr struct as a template parameter, provided the type meets the structural requirements of having all public members and no mutable fields. = In C++20 puoi passare una struct constexpr come parametro template, a condizione che il tipo soddisfi i requisiti strutturali di avere tutti i membri pubblici e nessun campo mutable.',
              context: 'templates',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'cpp_templates_4',
          title: 'Template Errors / Errori dei Template',
          description: 'Diagnostica e debug dei template',
          items: [
            {
              english: 'Template Error',
              italian: 'Errore di template',
              pronunciation: '/ˈerər/',
              phonetic: 'ER-ror',
              example:
                "When a type lacks the required operator, the compiler may emit a deeply nested template error that is difficult to read without concept constraints. = Quando un tipo manca dell'operatore richiesto, il compilatore può emettere un errore di template profondamente annidato difficile da leggere senza vincoli di concept.",
              context: 'templates',
              difficulty: 'intermediate',
              note: 'I concept di C++20 aiutano a renderli più chiari.',
            },
            {
              english: 'Substitution Failure',
              italian: 'Fallimento di sostituzione',
              pronunciation: '/ˌsʌbstɪˈtjuːʃən/',
              phonetic: 'sab-sti-TIU-scion',
              example:
                "If a template argument makes the function signature invalid, substitution failure is not an error; the compiler simply removes that overload from the candidate set. = Se un argomento template rende la firma della funzione invalida, il fallimento di sostituzione non è un errore; il compilatore semplicemente rimuove quell'overload dall'insieme dei candidati.",
              context: 'templates',
              difficulty: 'intermediate',
              note: 'Acronimo SFINAE.',
            },
            {
              english: 'Two-Phase Lookup',
              italian: 'Lookup a due fasi',
              pronunciation: '/tuː feɪz ˈlʊkʊp/',
              phonetic: 'TUU-FEIZ LUUK-up',
              example:
                'During the first phase the compiler checks non-dependent names, and during the second phase two-phase lookup resolves dependent names once the template type is known. = Durante la prima fase il compilatore controlla i nomi non dipendenti, e durante la seconda fase il lookup a due fasi risolve i nomi dipendenti una volta che il tipo del template è noto.',
              context: 'templates',
              difficulty: 'intermediate',
            },
            {
              english: 'Dependent Name',
              italian: 'Nome dipendente',
              pronunciation: '/dɪˈpendənt neɪm/',
              phonetic: 'di-PEN-dent NEIM',
              example:
                'When accessing a nested type inside a templated class, you must prefix the dependent name with typename to tell the compiler it refers to a type and not a static member. = Quando si accede a un tipo annidato dentro una classe template, devi prefissare il nome dipendente con typename per dire al compilatore che si riferisce a un tipo e non a un membro statico.',
              context: 'templates',
              difficulty: 'intermediate',
              code: 'typename T::value_type x;',
              task: 'Disambigua T::value_type come tipo dipendente anteponendo typename nella dichiarazione typename T::value_type x.',
            },
            {
              english: 'Template Disambiguation',
              italian: 'Disambiguazione di template',
              pronunciation: '/ˌdɪsæmbɪɡjuˈeɪʃən/',
              phonetic: 'dis-am-bi-ghu-EI-scion',
              example:
                'When calling a templated method through a dependent base pointer, you need the template keyword for disambiguation so the parser does not confuse the angle bracket with a less-than comparison. = Quando si chiama un metodo template tramite un puntatore base dipendente, serve la parola chiave template per la disambiguazione così che il parser non confonda la parentesi angolare con un confronto minore-di.',
              context: 'templates',
              difficulty: 'intermediate',
              code: 'p.template foo<int>();',
              task: 'Inserisci la parola chiave template in p.template foo<int>() per disambiguare la chiamata a un membro template.',
            },
            {
              english: 'Concept Error',
              italian: 'Errore di concept',
              pronunciation: '/ˈkɒnsept/',
              phonetic: 'KON-sept',
              example:
                "When the developer passes an unsuitable type, the concept error clearly states which requirement was not met instead of flooding the terminal with nested instantiation traces. = Quando lo sviluppatore passa un tipo non adatto, l'errore del concept indica chiaramente quale requisito non è stato soddisfatto invece di inondare il terminale con tracce di istanziazione annidate.",
              context: 'templates',
              difficulty: 'intermediate',
              note: 'Disponibile da C++20.',
            },
            {
              english: 'Compile Error',
              italian: 'Errore di compilazione',
              pronunciation: '/ˈerər/',
              phonetic: 'ER-ror',
              example:
                "If the type passed to the generic container does not support the expected comparison operator, the template instantiation fails with a compile error at the call site. = Se il tipo passato al contenitore generico non supporta l'operatore di confronto atteso, l'istanziazione del template fallisce con un errore di compilazione nel punto di chiamata.",
              context: 'templates',
              difficulty: 'intermediate',
            },
            {
              english: 'Static Assert',
              italian: 'Asserzione a tempo di compilazione (static_assert)',
              pronunciation: '/ˈstætɪk əˈsɜːrt/',
              phonetic: 'STA-tik a-SERT',
              example:
                "The network buffer class uses static_assert to verify at compile time that the platform's int is at least four bytes, preventing subtle data corruption on exotic architectures. = La classe buffer di rete usa static_assert per verificare a tempo di compilazione che l'int della piattaforma sia almeno quattro byte, prevenendo corruzione dati sottile su architetture esotiche.",
              context: 'templates',
              difficulty: 'intermediate',
              code: `template<class T>
void process(T val) {
    static_assert(sizeof(T) >= 4, "Type too small");
}`,
              task: 'Aggiungi static_assert(sizeof(int) >= 4, "min") per verificare a tempo di compilazione il vincolo sulla dimensione di int.',
            },
            {
              english: 'Template Bloat',
              italian: 'Bloat dei template',
              pronunciation: '/bloʊt/',
              phonetic: 'BLOUT',
              example:
                'Instantiating the same complex container template with dozens of different types leads to significant template bloat, increasing the final binary size. = Istanziare lo stesso template di contenitore complesso con decine di tipi diversi porta a un significativo bloat dei template, aumentando la dimensione del binario finale.',
              context: 'templates',
              difficulty: 'intermediate',
              note: 'Ogni istanziazione genera codice separato.',
            },
            {
              english: 'Explicit Instantiation',
              italian: 'Istanziazione esplicita',
              pronunciation: '/ɪkˈsplɪsɪt ɪnˌstænʃiˈeɪʃən/',
              phonetic: 'eks-PLI-sit in-stan-scia-EI-scion',
              example:
                "By placing an explicit instantiation for the most common types in a single translation unit, the build system avoids redundant codegen across dozens of source files. = Inserendo un'istanziazione esplicita per i tipi più comuni in una singola unità di traduzione, il sistema di build evita codegen ridondante in decine di file sorgente.",
              context: 'templates',
              difficulty: 'intermediate',
              code: 'template class Box<int>;',
              task: `Forza l'istanziazione esplicita del template di classe per int scrivendo template class Box<int> in un .cpp.`,
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 9 - SMART POINTERS / PUNTATORI INTELLIGENTI
    // ════════════════════════════════════════════════
    9: {
      name: 'Smart Pointers / Puntatori Intelligenti',
      description: 'Gestione automatica della memoria',
      lessons: [
        {
          id: 'cpp_memory_1',
          title: 'Unique Pointer / Puntatore Unico',
          description: 'std::unique_ptr e ownership esclusiva',
          items: [
            {
              english: 'Smart Pointer',
              italian: 'Puntatore intelligente',
              pronunciation: '/smɑːrt ˈpɔɪntər/',
              phonetic: 'SMART POIN-ter',
              example:
                'Replacing raw pointers with smart pointers eliminated every manual delete call and fixed three memory leaks in the rendering subsystem. = Sostituire i puntatori grezzi con puntatori intelligenti ha eliminato ogni chiamata delete manuale e corretto tre memory leak nel sottosistema di rendering.',
              context: 'memory',
              difficulty: 'intermediate',
              note: 'Sostituiscono new/delete manuali.',
            },
            {
              english: 'Unique Ptr',
              italian: 'Smart pointer a proprietà unica (std::unique_ptr)',
              pronunciation: '/juːˈniːk ˈpɔɪntər/',
              phonetic: 'iu-NIIK POIN-ter',
              example:
                'The scene node holds a std::unique_ptr to its mesh data, guaranteeing that exactly one owner exists and the memory is freed when the node is destroyed. = Il nodo della scena contiene un std::unique_ptr ai dati mesh, garantendo che esista esattamente un proprietario e la memoria venga liberata quando il nodo viene distrutto.',
              context: 'memory',
              difficulty: 'intermediate',
              code: `auto p = std::make_unique<int>(42);
std::cout << *p;
// automatically deleted when p goes out of scope`,
              note: 'Non è copiabile, solo movibile.',
              task: 'Dichiara uno std::unique_ptr<T> p che gestisca in proprietà esclusiva una risorsa allocata dinamicamente.',
            },
            {
              english: 'Make Unique',
              italian: 'Fabbrica per unique_ptr (std::make_unique)',
              pronunciation: '/meɪk juːˈniːk/',
              phonetic: 'MEIK iu-NIIK',
              example:
                "The factory function returns std::make_unique<Widget>(config) to construct the widget and wrap it in a unique_ptr in a single exception-safe expression. = La funzione factory restituisce std::make_unique<Widget>(config) per costruire il widget e avvolgerlo in un unique_ptr in un'unica espressione exception-safe.",
              context: 'memory',
              difficulty: 'intermediate',
              code: `struct Point { int x, y; };
auto p = std::make_unique<Point>(Point{3, 4});
std::cout << p->x << ", " << p->y;`,
              note: 'Preferisci make_unique a new.',
              task: 'Crea un unique_ptr a Foo passando 1 e 2 al costruttore tramite std::make_unique<Foo>(1, 2).',
            },
            {
              english: 'Ownership',
              italian: 'Possesso',
              pronunciation: '/ˈoʊnərʃɪp/',
              phonetic: 'O-ner-scip',
              example:
                "The resource manager transfers ownership of the loaded texture to the renderer through a unique_ptr, making the single-owner contract explicit in the API. = Il gestore risorse trasferisce la proprietà della texture caricata al renderer attraverso un unique_ptr, rendendo il contratto di proprietario unico esplicito nell'API.",
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Move Only',
              italian: 'Solo movibile',
              pronunciation: '/muːv ˈoʊnli/',
              phonetic: 'MUUV ON-li',
              example:
                'Because unique_ptr is move-only, the compiler prevents accidental copies and forces you to explicitly transfer ownership with std::move when handing it off. = Poiché unique_ptr è solo movibile, il compilatore previene copie accidentali e ti obbliga a trasferire esplicitamente la proprietà con std::move quando lo cedi.',
              context: 'memory',
              difficulty: 'intermediate',
              code: `auto p = std::make_unique<int>(42);
auto q = std::move(p);
// p is now nullptr
std::cout << *q; // 42`,
              task: 'Trasferisci la proprietà del unique_ptr p al nuovo puntatore q con auto q = std::move(p).',
            },
            {
              english: 'Reset',
              italian: 'Azzeramento del puntatore (reset)',
              pronunciation: '/rɪˈset/',
              phonetic: 'ri-SET',
              example:
                "When the cache entry expires, the manager calls reset() on the unique_ptr to immediately release the managed object and free the underlying memory. = Quando la voce della cache scade, il manager chiama reset() sull'unique_ptr per rilasciare immediatamente l'oggetto gestito e liberare la memoria sottostante.",
              context: 'memory',
              difficulty: 'intermediate',
              code: 'p.reset();',
              task: `Azzera il unique_ptr p chiamando p.reset() per distruggere l'oggetto posseduto e lasciare il puntatore vuoto.`,
            },
            {
              english: 'Release',
              italian: 'Cessione della proprietà (release)',
              pronunciation: '/rɪˈliːs/',
              phonetic: 'ri-LIIS',
              example:
                "When passing the buffer to a C API that takes ownership, the wrapper calls release() to obtain the raw pointer and relinquish smart-pointer management. = Quando si passa il buffer a un'API C che assume la proprietà, il wrapper chiama release() per ottenere il puntatore raw e cedere la gestione del puntatore intelligente.",
              context: 'memory',
              difficulty: 'intermediate',
              code: 'auto raw = p.release();',
              note: 'Dopo release, devi liberare manualmente.',
              task: 'Cedi la proprietà del unique_ptr p con p.release(), salvando il puntatore raw da liberare manualmente.',
            },
            {
              english: 'Get Method',
              italian: 'Metodo get',
              pronunciation: '/ɡet/',
              phonetic: 'GHET',
              example:
                "The interop layer calls get() on the unique_ptr to pass the raw pointer to the legacy C function while retaining ownership in the caller. = Il livello di interoperabilità chiama get() sull'unique_ptr per passare il puntatore raw alla funzione C legacy mantenendo la proprietà nel chiamante.",
              context: 'memory',
              difficulty: 'intermediate',
              code: 'T* raw = p.get();',
              task: 'Ottieni il puntatore grezzo posseduto dal unique_ptr p chiamando p.get() senza trasferire la proprietà.',
            },
            {
              english: 'Custom Deleter',
              italian: 'Deleter personalizzato',
              pronunciation: '/ˈkʌstəm dɪˈliːtər/',
              phonetic: 'KAS-tom di-LII-ter',
              example:
                "The file wrapper creates a unique_ptr with a custom deleter that calls fclose, ensuring the handle is closed even if an exception interrupts the processing pipeline. = Il wrapper del file crea un unique_ptr con un deleter personalizzato che chiama fclose, assicurando che l'handle venga chiuso anche se un'eccezione interrompe la pipeline di elaborazione.",
              context: 'memory',
              difficulty: 'intermediate',
              code: `auto deleter = [](FILE* f) { fclose(f); };
std::unique_ptr<FILE, decltype(deleter)> file(
    fopen("data.txt", "r"), deleter);`,
              task: 'Costruisci uno unique_ptr<FILE> con deleter personalizzato &fclose per chiudere automaticamente il file.',
            },
            {
              english: 'Array Unique Ptr',
              italian: 'Unique ptr per array',
              pronunciation: '/əˈreɪ/',
              phonetic: 'a-REI',
              example:
                "The image decoder allocates a pixel buffer using unique_ptr<uint8_t[]> to manage the dynamically sized array and guarantee its deallocation on scope exit. = Il decoder di immagini alloca un buffer pixel usando unique_ptr<uint8_t[]> per gestire l'array a dimensione dinamica e garantire la sua deallocazione all'uscita dallo scope.",
              context: 'memory',
              difficulty: 'intermediate',
              code: 'auto arr = std::make_unique<int[]>(10);',
              task: 'Alloca un array di 10 int gestito da unique_ptr con std::make_unique<int[]>(10).',
            },
          ],
        },
        {
          id: 'cpp_memory_2',
          title: 'Shared Pointer / Puntatore Condiviso',
          description: 'std::shared_ptr e reference counting',
          items: [
            {
              english: 'Shared Ptr',
              italian: 'Smart pointer a proprietà condivisa (std::shared_ptr)',
              pronunciation: '/ʃeərd ˈpɔɪntər/',
              phonetic: 'SCERD POIN-ter',
              example:
                "Multiple UI widgets hold a std::shared_ptr to the same configuration object so that changes propagate automatically and the resource is freed when the last widget closes. = Più widget UI contengono un std::shared_ptr allo stesso oggetto di configurazione così che le modifiche si propaghino automaticamente e la risorsa venga liberata quando l'ultimo widget si chiude.",
              context: 'memory',
              difficulty: 'intermediate',
              code: `auto p = std::make_shared<int>(42);
auto q = p; // shared ownership
std::cout << p.use_count(); // 2`,
              task: 'Dichiara uno std::shared_ptr<T> p per gestire la condivisione di proprietà tramite reference counting.',
            },
            {
              english: 'Make Shared',
              italian: 'Fabbrica per shared_ptr (std::make_shared)',
              pronunciation: '/meɪk ʃeərd/',
              phonetic: 'MEIK SCERD',
              example:
                "Using std::make_shared is faster than calling new separately because it performs a single heap allocation for both the object and the internal control block. = Usare std::make_shared è più veloce che chiamare new separatamente perché esegue una singola allocazione heap sia per l'oggetto che per il blocco di controllo interno.",
              context: 'memory',
              difficulty: 'intermediate',
              code: `auto p = std::make_shared<std::string>("hello");
std::cout << *p << "\\n";
std::cout << "refs: " << p.use_count();`,
              note: 'Singola allocazione per oggetto e control block.',
              task: 'Costruisci uno shared_ptr<Foo> con std::make_shared<Foo>(1, 2) usando una sola allocazione per oggetto e control block.',
            },
            {
              english: 'Reference Count',
              italian: 'Conteggio riferimenti',
              pronunciation: '/ˈrefərəns kaʊnt/',
              phonetic: 'REF-er-ens KAUNT',
              example:
                'Each time a shared_ptr is copied or destroyed, the internal reference count is updated atomically to reflect the current number of active owners. = Ogni volta che un shared_ptr viene copiato o distrutto, il conteggio dei riferimenti interno viene aggiornato atomicamente per riflettere il numero attuale di proprietari attivi.',
              context: 'memory',
              difficulty: 'intermediate',
              code: `auto a = std::make_shared<int>(10);
auto b = a;
std::cout << a.use_count(); // 2
b.reset();
std::cout << a.use_count(); // 1`,
              task: 'Interroga il numero di owner condivisi del shared_ptr p chiamando p.use_count().',
            },
            {
              english: 'Control Block',
              italian: 'Blocco di controllo',
              pronunciation: '/kənˈtroʊl blɒk/',
              phonetic: 'kon-TROL BLOK',
              example:
                "Alongside the managed object, the allocator creates a control block that stores both the strong reference count and the weak reference count for lifetime tracking. = Accanto all'oggetto gestito, l'allocatore crea un blocco di controllo che memorizza sia il conteggio dei riferimenti forti che quello dei riferimenti deboli per il tracciamento della vita.",
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Atomic Increment',
              italian: 'Incremento atomico',
              pronunciation: '/əˈtɒmɪk/',
              phonetic: 'a-TO-mik',
              example:
                "Copying a shared_ptr across threads is safe because the underlying atomic increment on the reference count prevents data races in the control block. = Copiare un shared_ptr tra thread è sicuro perché l'incremento atomico sottostante sul conteggio dei riferimenti previene data race nel blocco di controllo.",
              context: 'memory',
              difficulty: 'intermediate',
              note: "Fornisce thread safety sul control block, non sull'oggetto.",
            },
            {
              english: 'Shared Ownership',
              italian: 'Possesso condiviso',
              pronunciation: '/ʃeərd ˈoʊnərʃɪp/',
              phonetic: 'SCERD O-ner-scip',
              example:
                "The plugin system uses shared_ptr to model shared ownership of the configuration object, letting each loaded plugin read settings without worrying about deallocation order. = Il sistema di plugin usa shared_ptr per modellare la proprietà condivisa dell'oggetto di configurazione, permettendo a ogni plugin caricato di leggere le impostazioni senza preoccuparsi dell'ordine di deallocazione.",
              context: 'memory',
              difficulty: 'intermediate',
              note: 'Da usare solo se serve davvero, preferisci unique_ptr.',
            },
            {
              english: 'Aliasing Constructor',
              italian: 'Costruttore di aliasing',
              pronunciation: '/ˈeɪliəsɪŋ/',
              phonetic: 'EI-li-a-sing',
              example:
                "The aliasing constructor lets you create a shared_ptr that points to a member of the managed object while sharing the parent's lifetime and control block. = Il costruttore di aliasing permette di creare un shared_ptr che punta a un membro dell'oggetto gestito condividendo la vita e il blocco di controllo del padre.",
              context: 'memory',
              difficulty: 'intermediate',
              code: 'std::shared_ptr<int> q(p, &p->member);',
              task: 'Usa il costruttore di aliasing per ottenere uno shared_ptr a p->member che condivide il control block di p.',
            },
            {
              english: 'Cyclic Reference',
              italian: 'Riferimento ciclico',
              pronunciation: '/ˈsaɪklɪk/',
              phonetic: 'SAI-klik',
              example:
                "When two objects hold shared_ptr instances to each other, a cyclic reference forms and neither is ever freed because both reference counts remain at one indefinitely. = Quando due oggetti contengono istanze shared_ptr l'uno verso l'altro, si forma un riferimento ciclico e nessuno dei due viene mai liberato perché entrambi i conteggi dei riferimenti rimangono a uno indefinitamente.",
              context: 'memory',
              difficulty: 'intermediate',
              note: 'Risolvi con weak_ptr.',
            },
            {
              english: 'Use Count',
              italian: 'Conteggio uso',
              pronunciation: '/juːs kaʊnt/',
              phonetic: 'IUS KAUNT',
              example:
                'During debugging, the developer calls use_count() on the shared_ptr to verify that no unexpected copies are keeping the network connection alive after shutdown. = Durante il debug, lo sviluppatore chiama use_count() sullo shared_ptr per verificare che nessuna copia inattesa stia mantenendo viva la connessione di rete dopo lo shutdown.',
              context: 'memory',
              difficulty: 'intermediate',
              code: 'auto n = p.use_count();',
              task: 'Salva in n il conteggio dei riferimenti attivi sullo shared_ptr p con auto n = p.use_count().',
            },
            {
              english: 'Enable Shared From This',
              italian: 'Abilitazione condivisione da this (enable_shared_from_this)',
              pronunciation: '/ɪˈneɪbl/',
              phonetic: 'i-NEI-bol',
              example:
                "The asynchronous task handler inherits from enable_shared_from_this so that callbacks can safely obtain a shared_ptr from within the object's own member functions. = Il gestore di task asincroni eredita da enable_shared_from_this così che i callback possano ottenere in sicurezza un shared_ptr dall'interno delle funzioni membro dell'oggetto stesso.",
              context: 'memory',
              difficulty: 'intermediate',
              code: `class Node : public std::enable_shared_from_this<Node> {
public:
    std::shared_ptr<Node> getPtr() {
        return shared_from_this();
    }
};`,
              task: 'Fai ereditare la classe A da std::enable_shared_from_this<A> per ottenere uno shared_ptr a se stessa con shared_from_this.',
            },
          ],
        },
        {
          id: 'cpp_memory_3',
          title: 'Weak Pointer / Puntatore Debole',
          description: 'std::weak_ptr e cicli',
          items: [
            {
              english: 'Weak Ptr',
              italian: 'std::weak_ptr',
              pronunciation: '/wiːk ˈpɔɪntər/',
              phonetic: 'UIIK POIN-ter',
              example:
                'Storing an observer as a std::weak_ptr lets the subject notify it without preventing its deletion, breaking the cycle that two shared_ptrs would create. = Memorizzare un observer come std::weak_ptr permette al subject di notificarlo senza impedirne la cancellazione, rompendo il ciclo che due shared_ptr creerebbero.',
              context: 'memory',
              difficulty: 'intermediate',
              code: 'std::weak_ptr<T> w = sp;',
              note: 'Termine C++: std::weak_ptr (smart pointer standard, non si traduce).',
              task: 'Costruisci uno std::weak_ptr<T> w a partire da uno shared_ptr sp per osservare senza trattenere la risorsa.',
            },
            {
              english: 'Lock',
              italian: 'Blocco esclusivo (lock)',
              pronunciation: '/lɒk/',
              phonetic: 'LOK',
              example: `Calling lock() on a std::weak_ptr atomically promotes it to a std::shared_ptr if the managed object still exists, or returns nullptr otherwise. = Chiamare lock() su un std::weak_ptr lo promuove atomicamente a std::shared_ptr se l'oggetto gestito esiste ancora, o restituisce nullptr altrimenti.`,
              context: 'memory',
              difficulty: 'intermediate',
              code: `auto sp = std::make_shared<int>(42);
std::weak_ptr<int> w = sp;
if (auto locked = w.lock()) {
    std::cout << *locked; // 42
}`,
              task: 'Promuovi il weak_ptr w a shared_ptr con w.lock() e usalo solo se la risorsa è ancora viva.',
            },
            {
              english: 'Expired',
              italian: 'Scaduto',
              pronunciation: '/ɪkˈspaɪərd/',
              phonetic: 'eks-PAI-erd',
              example:
                'Before attempting a lock, the cache calls expired() on the weak_ptr to skip cleanup work for entries whose managed object is already gone. = Prima di tentare un lock, la cache chiama expired() sul weak_ptr per saltare il lavoro di pulizia per voci il cui oggetto gestito è già sparito.',
              context: 'memory',
              difficulty: 'intermediate',
              code: 'if (w.expired()) { /* ... */ }',
              task: 'Verifica se la risorsa puntata dal weak_ptr w è stata distrutta con w.expired() prima di usarla.',
            },
            {
              english: 'Observer Pattern',
              italian: 'Pattern observer',
              pronunciation: '/əbˈzɜːrvər/',
              phonetic: 'ob-ZER-ver',
              example:
                'Implementing the observer pattern with std::weak_ptr handles to listeners lets the subject prune dead observers automatically when their owners go away. = Implementare il pattern observer con handle std::weak_ptr ai listener permette al subject di rimuovere automaticamente gli observer morti quando i loro proprietari spariscono.',
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Break Cycle',
              italian: 'Rompere ciclo',
              pronunciation: '/breɪk ˈsaɪkl/',
              phonetic: 'BREIK SAI-kol',
              example: `Switching the child-to-parent link in the tree from shared_ptr to weak_ptr breaks the cycle that would otherwise leak the entire subtree on shutdown. = Cambiare il collegamento figlio-padre nell'albero da shared_ptr a weak_ptr rompe il ciclo che altrimenti farebbe trapelare l'intero sottoalbero alla chiusura.`,
              context: 'memory',
              difficulty: 'intermediate',
              note: 'Tipico nei nodi parent/child.',
            },
            {
              english: 'Pointer Lifetime',
              italian: 'Durata del puntatore',
              pronunciation: '/ˈlaɪftaɪm/',
              phonetic: 'LAIF-taim',
              example:
                'Mixing raw pointers with smart pointers makes pointer lifetime hard to reason about because two owners disagree on who calls delete and when. = Mescolare puntatori grezzi con smart pointer rende difficile ragionare sulla durata del puntatore perché due proprietari sono in disaccordo su chi chiama delete e quando.',
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Non-Owning Reference',
              italian: 'Riferimento non possessivo',
              pronunciation: '/nɒn ˈoʊnɪŋ/',
              phonetic: 'NON-O-ning',
              example:
                'Passing a Widget* parameter that the function only reads from is best documented as a non-owning reference, signalling the caller keeps ownership. = Passare un parametro Widget* che la funzione si limita a leggere è meglio documentato come riferimento non possessivo, segnalando che il chiamante mantiene la proprietà.',
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Cache With Weak',
              italian: 'Cache con weak',
              pronunciation: '/kæʃ wɪð wiːk/',
              phonetic: 'KAS-UID-UIIK',
              example:
                'A weak_ptr cache lets unused entries die. = Una cache weak_ptr lascia morire le voci inutilizzate.',
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Pointer Validity',
              italian: 'Validità del puntatore',
              pronunciation: '/vəˈlɪdəti/',
              phonetic: 'va-LI-di-ti',
              example:
                'Always lock before dereferencing weak_ptr. = Fai sempre lock prima di dereferenziare weak_ptr.',
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Weak Count',
              italian: 'Conteggio debole',
              pronunciation: '/wiːk kaʊnt/',
              phonetic: 'UIIK KAUNT',
              example:
                'The weak count is separate from the strong count. = Il conteggio debole è separato dal conteggio forte.',
              context: 'memory',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'cpp_memory_4',
          title: 'RAII / RAII',
          description: 'Resource Acquisition Is Initialization',
          items: [
            {
              english: 'RAII',
              italian: 'Acquisizione risorse tramite inizializzazione (RAII)',
              pronunciation: '/ɑːr eɪ aɪ aɪ/',
              phonetic: 'AR-EI-AI-AI',
              example:
                'The database connection wrapper follows RAII, opening the connection in the constructor and closing it in the destructor. = Il wrapper per la connessione al database segue RAII, aprendo la connessione nel costruttore e chiudendola nel distruttore.',
              context: 'memory',
              difficulty: 'intermediate',
              note: 'Resource Acquisition Is Initialization.',
            },
            {
              english: 'Resource',
              italian: 'Risorsa',
              pronunciation: '/ˈriːsɔːrs/',
              phonetic: 'RI-sors',
              example:
                'Treating a file handle, a mutex, or a socket as a resource lets RAII wrappers release each one deterministically when the scope ends. = Trattare un handle di file, un mutex o un socket come una risorsa permette ai wrapper RAII di rilasciare ciascuno deterministicamente alla fine dello scope.',
              context: 'memory',
              difficulty: 'intermediate',
              note: 'Memoria, file, mutex, socket, ...',
            },
            {
              english: 'Acquisition',
              italian: 'Acquisizione',
              pronunciation: '/ˌækwɪˈzɪʃən/',
              phonetic: 'a-kuiz-ZI-scion',
              example:
                'Acquire the resource in the constructor. = Acquisisci la risorsa nel costruttore.',
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Release On Destruction',
              italian: 'Rilascio nel distruttore',
              pronunciation: '/dɪˈstrʌkʃən/',
              phonetic: 'di-STRAK-scion',
              example: `Designing the SocketGuard so that release on destruction closes the file descriptor guarantees the socket is freed even when an exception propagates. = Progettare SocketGuard così che il rilascio nel distruttore chiuda il file descriptor garantisce che il socket sia liberato anche quando un'eccezione si propaga.`,
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Scope Guard',
              italian: 'Guardia di ambito (scope guard)',
              pronunciation: '/skoʊp ɡɑːrd/',
              phonetic: 'SKOUP GARD',
              example:
                "A scope guard runs cleanup at scope exit. = Uno scope guard esegue cleanup all'uscita dallo scope.",
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Stack Allocation',
              italian: 'Allocazione su stack',
              pronunciation: '/stæk/',
              phonetic: 'STAK',
              example: `Preferring stack allocation for small short-lived objects avoids heap fragmentation and gives the compiler more opportunities to keep values in registers. = Preferire l'allocazione su stack per oggetti piccoli e di breve durata evita la frammentazione dell'heap e dà al compilatore più occasioni per tenere i valori nei registri.`,
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Lock Guard',
              italian: 'std::lock_guard',
              pronunciation: '/lɒk ɡɑːrd/',
              phonetic: 'LOK GARD',
              example: `Wrapping the critical section in a std::lock_guard guarantees the mutex is unlocked even if the protected code throws an exception. = Avvolgere la sezione critica in un std::lock_guard garantisce che il mutex sia sbloccato anche se il codice protetto lancia un'eccezione.`,
              context: 'memory',
              difficulty: 'intermediate',
              code: `std::mutex m;
void safe_print(const std::string& msg) {
    std::lock_guard lk(m);
    std::cout << msg << "\\n";
}`,
              note: 'Termine C++: std::lock_guard (classe RAII standard, non si traduce).',
              task: 'Proteggi la sezione critica acquisendo il mutex m tramite uno std::lock_guard lk con stile RAII.',
            },
            {
              english: 'File Guard',
              italian: 'Chiusura RAII di file (file guard)',
              pronunciation: '/faɪl ɡɑːrd/',
              phonetic: 'FAIL GARD',
              example: `Wrapping the FILE* in a small file guard class that calls fclose in its destructor turns the legacy C handle into an RAII-friendly resource. = Avvolgere il FILE* in una piccola classe file guard che chiama fclose nel suo distruttore trasforma l'handle C legacy in una risorsa RAII-friendly.`,
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Exception Safety',
              italian: 'Sicurezza alle eccezioni',
              pronunciation: '/ɪkˈsepʃən ˈseɪfti/',
              phonetic: 'ek-SEP-scion SEIF-ti',
              example:
                'Holding every resource behind an RAII wrapper turns exception safety from a hand-written checklist into a property the type system enforces automatically. = Tenere ogni risorsa dietro un wrapper RAII trasforma la sicurezza alle eccezioni da una checklist scritta a mano in una proprietà che il sistema di tipi impone automaticamente.',
              context: 'memory',
              difficulty: 'intermediate',
            },
            {
              english: 'Deterministic Destruction',
              italian: 'Distruzione deterministica',
              pronunciation: '/dɪˌtɜːmɪˈnɪstɪk/',
              phonetic: 'di-ter-mi-NIS-tik',
              example:
                'Unlike languages with garbage collection, C++ offers deterministic destruction so the file is closed exactly at the point the local scope exits. = A differenza dei linguaggi con garbage collector, C++ offre distruzione deterministica così il file viene chiuso esattamente nel punto in cui lo scope locale termina.',
              context: 'memory',
              difficulty: 'intermediate',
              note: 'A differenza di linguaggi con garbage collector.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 10 - ECCEZIONI / EXCEPTIONS
    // ════════════════════════════════════════════════
    10: {
      name: 'Eccezioni / Exception Handling',
      description: 'Gestione delle eccezioni in C++',
      lessons: [
        {
          id: 'cpp_exceptions_1',
          title: 'Try Catch Throw / Try Catch Throw',
          description: 'Sintassi di base delle eccezioni',
          items: [
            {
              english: 'Exception',
              italian: 'Eccezione',
              pronunciation: '/ɪkˈsepʃən/',
              phonetic: 'ek-SEP-scion',
              example: `When the JSON parser hits a malformed token, it throws an exception so the caller can react to the error in one centralized catch block. = Quando il parser JSON incontra un token malformato, lancia un'eccezione così il chiamante può reagire all'errore in un unico blocco catch centralizzato.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              code: `try {
    throw std::runtime_error("boom");
} catch (const std::exception& e) {
    std::cout << e.what();
}`,
              task: `Solleva un'eccezione di tipo std::runtime_error con il messaggio "boom" per segnalare un errore non recuperabile.`,
            },
            {
              english: 'Try Block',
              italian: 'Blocco try',
              pronunciation: '/traɪ blɒk/',
              phonetic: 'TRAI BLOK',
              example: `Wrapping the database query inside a try block lets the connection-failure handler take over instead of crashing the entire request pipeline. = Avvolgere la query al database dentro un blocco try permette al gestore di errore di connessione di subentrare invece di far crashare l'intera pipeline di richieste.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              code: `try {
    int result = riskyOperation();
    std::cout << result;
} catch (...) {
    std::cout << "Error occurred\\n";
}`,
              task: 'Racchiudi il codice potenzialmente eccezionale in un blocco try per consentirne la gestione successiva.',
            },
            {
              english: 'Catch Block',
              italian: 'Blocco catch',
              pronunciation: '/kætʃ blɒk/',
              phonetic: 'KACI BLOK',
              example:
                'Adding a catch block for std::filesystem::filesystem_error after the file copy lets the program log the path and retry instead of aborting. = Aggiungere un blocco catch per std::filesystem::filesystem_error dopo la copia del file permette al programma di loggare il percorso e riprovare invece di abortire.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'catch (const std::exception& e) {}',
              task: 'Aggiungi un blocco catch (const std::exception& e) per intercettare per riferimento qualsiasi eccezione standard.',
            },
            {
              english: 'Throw',
              italian: 'Lancia',
              pronunciation: '/θroʊ/',
              phonetic: 'TROU',
              example:
                'Inside the validator, the code reaches throw std::invalid_argument("id must be positive") as soon as it spots a negative user id. = Dentro il validatore, il codice raggiunge throw std::invalid_argument("id must be positive") appena rileva un id utente negativo.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'throw 42;',
              task: `Lancia il valore intero 42 con l'istruzione throw 42 mostrando il throw nella forma più essenziale.`,
            },
            {
              english: 'Rethrow',
              italian: 'Rilancia',
              pronunciation: '/riːθroʊ/',
              phonetic: 'RI-trou',
              example:
                "A bare throw rethrows the current exception. = Un throw nudo rilancia l'eccezione corrente.",
              context: 'exceptions',
              difficulty: 'intermediate',
              code: `try {
    riskyCall();
} catch (const std::exception& e) {
    std::cerr << "Log: " << e.what();
    throw; // rethrow to caller
}`,
              task: `Dentro un catch (...) logga l'errore e poi rilancia l'eccezione corrente con un throw senza argomenti.`,
            },
            {
              english: 'Catch All',
              italian: 'Cattura tutto',
              pronunciation: '/kætʃ ɔːl/',
              phonetic: 'KACI OOL',
              example: `Adding a final catch(...) catch all at the top of main logs an opaque message and ensures the process never terminates silently on an unknown exception. = Aggiungere un catch(...) finale di tipo cattura tutto in cima a main logga un messaggio opaco e assicura che il processo non termini mai silenziosamente su un'eccezione sconosciuta.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'catch (...) {}',
              note: 'Ultimo recurso, perdi le informazioni.',
              task: 'Aggiungi un catch (...) come ultima risorsa per intercettare qualunque eccezione, pur perdendone le informazioni.',
            },
            {
              english: 'Stack Unwinding',
              italian: 'Srotolamento dello stack',
              pronunciation: '/ʌnˈwaɪndɪŋ/',
              phonetic: 'an-UAIN-ding',
              example: `When an exception leaves the try block, stack unwinding destroys every local object in reverse construction order so RAII guards release their resources. = Quando un'eccezione lascia il blocco try, lo srotolamento dello stack distrugge ogni oggetto locale in ordine di costruzione inverso così le guardie RAII rilasciano le loro risorse.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              note: 'Cruciale per RAII.',
            },
            {
              english: 'Exception Object',
              italian: 'Oggetto eccezione',
              pronunciation: '/ɪkˈsepʃən ˈɒbdʒɪkt/',
              phonetic: 'ek-SEP-scion OB-gekt',
              example:
                "The thrown value is the exception object. = Il valore lanciato è l'oggetto eccezione.",
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'Catch By Reference',
              italian: 'Catch per riferimento',
              pronunciation: '/baɪ ˈrefərəns/',
              phonetic: 'BAI REF-er-ens',
              example: `Writing catch (const std::exception& e) uses catch by reference and avoids the object slicing that a by-value catch would cause for derived exception types. = Scrivere catch (const std::exception& e) usa catch per riferimento ed evita lo slicing dell'oggetto che un catch per valore causerebbe per i tipi di eccezione derivati.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'catch (const std::exception& e)',
              note: 'Evita lo slicing.',
              task: 'Cattura sempre per riferimento con catch (const std::exception& e) per evitare slicing e copie inutili.',
            },
            {
              english: 'Uncaught Exception',
              italian: 'Eccezione non catturata',
              pronunciation: '/ˌʌnˈkɔːt/',
              phonetic: 'an-KOOT',
              example:
                "An uncaught exception calls std::terminate. = Un'eccezione non catturata chiama std::terminate.",
              context: 'exceptions',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'cpp_exceptions_2',
          title: 'Exception Hierarchy / Gerarchia di Eccezioni',
          description: 'Tipi di eccezioni standard',
          items: [
            {
              english: 'std::exception',
              italian: 'Classe base eccezioni (std::exception)',
              pronunciation: '/ɪkˈsepʃən/',
              phonetic: 'ek-SEP-scion',
              example:
                'All custom error classes in the network module inherit from std::exception so a single catch block handles them. = Tutte le classi di errore personalizzate nel modulo di rete ereditano da std::exception così un singolo blocco catch le gestisce.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: `class AppError : public std::exception {
public:
    const char* what() const noexcept override {
        return "Application error";
    }
};`,
              task: 'Definisci MyEx come classe derivata da std::exception per integrarla nella gerarchia standard delle eccezioni.',
            },
            {
              english: 'Runtime Error',
              italian: 'Errore runtime',
              pronunciation: '/ˈrʌntaɪm ˈerər/',
              phonetic: 'RAN-taim ER-ror',
              example:
                'std::runtime_error reports runtime issues. = std::runtime_error segnala problemi a runtime.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'throw std::runtime_error("oops");',
              task: 'Solleva uno std::runtime_error("oops") per segnalare un errore rilevabile solo a runtime.',
            },
            {
              english: 'Logic Error',
              italian: 'Errore logico',
              pronunciation: '/ˈlɒdʒɪk/',
              phonetic: 'LO-gik',
              example:
                'std::logic_error reports programming errors. = std::logic_error segnala errori di programmazione.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'throw std::logic_error("bad arg");',
              task: 'Lancia uno std::logic_error("bad arg") per indicare una violazione di precondizione del codice chiamante.',
            },
            {
              english: 'Out of Range',
              italian: 'Fuori intervallo',
              pronunciation: '/aʊt ɒv reɪndʒ/',
              phonetic: 'AUT OV REINGE',
              example:
                'Calling v.at(100) on a vector of size 10 throws std::out_of_range, which the wrapper handler maps to an HTTP 400 response with a clear message. = Chiamare v.at(100) su un vector di size 10 lancia std::out_of_range, che il gestore wrapper mappa a una risposta HTTP 400 con un messaggio chiaro.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3};
try {
    v.at(10); // throws std::out_of_range
} catch (const std::out_of_range& e) {
    std::cerr << e.what();
}`,
              task: 'Accedi al vettore v con v.at(i) per ottenere il controllo dei limiti e un eventuale std::out_of_range.',
            },
            {
              english: 'Invalid Argument',
              italian: 'Argomento non valido',
              pronunciation: '/ɪnˈvælɪd ˈɑːrɡjumənt/',
              phonetic: 'in-VA-lid AR-giu-ment',
              example:
                'std::invalid_argument signals bad input. = std::invalid_argument segnala input errato.',
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'Bad Alloc',
              italian: 'Eccezione allocazione fallita (std::bad_alloc)',
              pronunciation: '/bæd əˈlɒk/',
              phonetic: 'BAD a-LOK',
              example:
                'std::bad_alloc is thrown when new fails. = std::bad_alloc viene lanciata quando new fallisce.',
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'Bad Cast',
              italian: 'Eccezione cast fallito (std::bad_cast)',
              pronunciation: '/bæd kɑːst/',
              phonetic: 'BAD KAAST',
              example:
                'std::bad_cast comes from dynamic_cast on reference. = std::bad_cast viene da dynamic_cast su riferimento.',
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'What Method',
              italian: 'Metodo what',
              pronunciation: '/wʌt/',
              phonetic: 'UOT',
              example: `Calling the what method on the caught exception returns a C string with the original message, perfect for logging the failure without losing context. = Chiamare il metodo what sull'eccezione catturata restituisce una stringa C col messaggio originale, perfetto per loggare il fallimento senza perdere il contesto.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'std::cerr << e.what();',
              task: `Stampa il messaggio descrittivo dell'eccezione e su std::cerr richiamando e.what().`,
            },
            {
              english: 'Custom Exception',
              italian: 'Eccezione personalizzata',
              pronunciation: '/ˈkʌstəm/',
              phonetic: 'KAS-tom',
              example:
                'Inherit from std::exception for custom types. = Eredita da std::exception per tipi personalizzati.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: `class NetworkErr : public std::runtime_error {
public:
    NetworkErr(const std::string& msg)
        : std::runtime_error(msg) {}
};
throw NetworkErr("timeout");`,
              task: 'Crea una classe NetworkErr che eredita da std::runtime_error per modellare errori di rete specifici.',
            },
            {
              english: 'Exception Specification',
              italian: 'Specifica di eccezione',
              pronunciation: '/ˌspesɪfɪˈkeɪʃən/',
              phonetic: 'spe-si-fi-KEI-scion',
              example: `Legacy code may carry a dynamic exception specification like throw(int), but modern C++ removed it and now uses noexcept to mark non-throwing functions. = Il codice legacy può portare una specifica dinamica come throw(int), ma il C++ moderno l'ha rimossa e ora usa noexcept per marcare funzioni che non lanciano.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              note: 'Usa noexcept invece.',
            },
          ],
        },
        {
          id: 'cpp_exceptions_3',
          title: 'Noexcept / Noexcept',
          description: 'Funzioni che non lanciano eccezioni',
          items: [
            {
              english: 'Noexcept',
              italian: 'noexcept',
              pronunciation: '/ˌnoʊɪkˈsept/',
              phonetic: 'no-ek-SEPT',
              example:
                'Marking the swap function as noexcept lets std::vector use moves during reallocation, which is dramatically faster than the copy fallback. = Marcare la funzione swap come noexcept permette a std::vector di usare i move durante la riallocazione, che è drammaticamente più veloce del fallback con copia.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: `void safeSwap(int& a, int& b) noexcept {
    int tmp = a;
    a = b;
    b = tmp;
}`,
              note: 'Termine C++: noexcept (parola chiave del linguaggio, non si traduce).',
              task: 'Marca void swap(A&, A&) noexcept per garantire al compilatore che la funzione non solleva eccezioni.',
            },
            {
              english: 'Noexcept Query Operator',
              italian: 'Operatore di query noexcept',
              pronunciation: '/ˈɒpəreɪtər/',
              phonetic: 'OP-e-rei-tor',
              example: `Calling the noexcept query operator on a candidate expression lets a template choose a faster path when it can prove the call never throws. = Chiamare l'operatore di query noexcept su un'espressione candidata permette a un template di scegliere un percorso piu' veloce quando puo' provare che la chiamata non lancia mai.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'static_assert(noexcept(swap(a, b)));',
              note: `Rinominato per distinguerlo dall'item 'Noexcept Operator' come specificatore in cpp_oop_16.`,
              task: 'Usa static_assert(noexcept(swap(a, b))) per verificare a tempo di compilazione che swap sia dichiarato noexcept.',
            },
            {
              english: 'Conditional Noexcept',
              italian: 'Noexcept condizionale',
              pronunciation: '/kənˈdɪʃənl/',
              phonetic: 'kon-DI-scio-nal',
              example: `Declaring a wrapper as noexcept(noexcept(inner())) gives conditional noexcept that propagates the inner function's exception guarantee to its caller. = Dichiarare un wrapper come noexcept(noexcept(inner())) dà un noexcept condizionale che propaga al chiamante la garanzia di eccezione della funzione interna.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'void f() noexcept(noexcept(g()));',
              task: 'Dichiara f() noexcept(noexcept(g())) per propagare condizionalmente la garanzia di non-throw da g.',
            },
            {
              english: 'Strong Guarantee',
              italian: 'Garanzia forte',
              pronunciation: '/strɒŋ ˌɡærənˈtiː/',
              phonetic: 'STRONG ga-ren-TII',
              example: `Implementing operator= with copy-and-swap delivers the strong guarantee: if the assignment throws, the target object is left exactly in its original state. = Implementare operator= con copy-and-swap fornisce la garanzia forte: se l'assegnazione lancia, l'oggetto target resta esattamente nel suo stato originale.`,
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'Basic Guarantee',
              italian: 'Garanzia base',
              pronunciation: '/ˈbeɪsɪk/',
              phonetic: 'BEI-sik',
              example:
                'Even if insert() throws halfway through, the container still meets the basic guarantee: no resources leak and the structure remains in a valid, destructible state. = Anche se insert() lancia a metà, il container soddisfa comunque la garanzia base: nessuna risorsa trapela e la struttura rimane in uno stato valido e distruggibile.',
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'No Throw Guarantee',
              italian: 'Garanzia no-throw',
              pronunciation: '/noʊ θroʊ/',
              phonetic: 'NO-TROU',
              example:
                'No-throw guarantee means it never throws. = La garanzia no-throw significa che non lancia mai.',
              context: 'exceptions',
              difficulty: 'intermediate',
              note: 'Tipica per swap, distruttori, move.',
            },
            {
              english: 'Move Noexcept',
              italian: 'Move che non lancia eccezioni (move-noexcept)',
              pronunciation: '/muːv/',
              phonetic: 'MUUV',
              example:
                'Declaring the move constructor as move noexcept tells std::vector to choose moves over copies when growing, doubling the reserve speed for heavy types. = Dichiarare il costruttore di move come move-noexcept dice a std::vector di scegliere i move invece delle copie durante la crescita, raddoppiando la velocità di reserve per i tipi pesanti.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'A(A&&) noexcept;',
              note: 'Permette ottimizzazioni nei container STL.',
              task: 'Marca il costruttore di move A(A&&) noexcept per abilitare le ottimizzazioni di crescita nei container STL.',
            },
            {
              english: 'Throw From Destructor',
              italian: 'Lancio dal distruttore',
              pronunciation: '/dɪˈstrʌktər/',
              phonetic: 'di-STRAK-tor',
              example: `Letting a destructor throw from destructor during stack unwinding causes std::terminate, so production code wraps the body in a try/catch that logs the error. = Lasciare che un distruttore lanci dal distruttore durante lo srotolamento dello stack causa std::terminate, quindi il codice di produzione avvolge il corpo in un try/catch che logga l'errore.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              note: 'I distruttori sono noexcept di default.',
            },
            {
              english: 'Terminate',
              italian: 'std::terminate',
              pronunciation: '/ˈtɜːrmɪneɪt/',
              phonetic: 'TER-mi-neit',
              example: `An uncaught exception that escapes main triggers std::terminate, which by default calls abort and produces a core dump for post-mortem debugging. = Un'eccezione non catturata che sfugge da main attiva std::terminate, che di default chiama abort e produce un core dump per il debug post-mortem.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'std::terminate();',
              note: 'Termine C++: std::terminate (funzione standard, non si traduce).',
              task: `Forza l'interruzione immediata del programma chiamando std::terminate() nella condizione di errore irrecuperabile.`,
            },
            {
              english: 'Set Terminate',
              italian: 'Handler di terminazione (std::set_terminate)',
              pronunciation: '/set ˈtɜːrmɪneɪt/',
              phonetic: 'SET TER-mi-neit',
              example:
                'std::set_terminate installs a custom handler. = std::set_terminate installa un handler personalizzato.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'std::set_terminate(my_handler);',
              task: 'Registra my_handler come handler di terminazione con std::set_terminate(my_handler).',
            },
          ],
        },
        {
          id: 'cpp_exceptions_4',
          title: 'Modern Error Handling / Gestione Errori Moderna',
          description: 'Alternative alle eccezioni',
          items: [
            {
              english: 'Optional',
              italian: 'Valore opzionale (std::optional)',
              pronunciation: '/ˈɒpʃənl/',
              phonetic: 'OP-scio-nal',
              example:
                'std::optional may or may not hold value. = std::optional può contenere o no un valore.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: `std::optional<int> findIndex(const std::vector<int>& v, int x) {
    for (int i = 0; i < v.size(); ++i)
        if (v[i] == x) return i;
    return std::nullopt;
}`,
              note: 'Disponibile da C++17.',
              task: 'Dichiara uno std::optional<int> n per rappresentare un intero che può anche essere assente.',
            },
            {
              english: 'Expected',
              italian: 'std::expected',
              pronunciation: '/ɪkˈspektɪd/',
              phonetic: 'eks-PEK-ted',
              example:
                'Returning std::expected<Config, ParseError> from loadConfig lets callers handle the error path without exceptions while still propagating rich diagnostics. = Restituire std::expected<Config, ParseError> da loadConfig permette ai chiamanti di gestire il percorso di errore senza eccezioni pur propagando diagnostiche ricche.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: `std::expected<int, std::string> divide(int a, int b) {
    if (b == 0) return std::unexpected("div by zero");
    return a / b;
}`,
              note: 'Termine C++: std::expected (tipo standard C++23, non si traduce).',
              task: 'Dichiara uno std::expected<int, Error> r per restituire un intero in caso di successo o un Error in caso di fallimento.',
            },
            {
              english: 'Error Code',
              italian: 'Codice di errore',
              pronunciation: '/ˈerər koʊd/',
              phonetic: 'ER-ror KOUD',
              example: `The filesystem API overload that takes a std::error_code reference reports failures via an error code instead of throwing, which is ideal for hot loops. = L'overload dell'API filesystem che prende un riferimento std::error_code segnala i fallimenti tramite un codice di errore invece di lanciare, ideale per loop critici.`,
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'Result Type',
              italian: 'Tipo risultato',
              pronunciation: '/rɪˈzʌlt taɪp/',
              phonetic: 'ri-ZALT TAIP',
              example:
                'A result type encodes success or failure. = Un tipo risultato codifica successo o fallimento.',
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'Outcome',
              italian: 'Boost.Outcome',
              pronunciation: '/ˈaʊtkʌm/',
              phonetic: 'AUT-kam',
              example: `The HTTP client library uses Boost.Outcome to return a success-or-error union from every request without paying for the cost of stack unwinding. = La libreria client HTTP usa Boost.Outcome per restituire un'unione successo-o-errore da ogni richiesta senza pagare il costo dello srotolamento dello stack.`,
              context: 'exceptions',
              difficulty: 'intermediate',
              tool: 'Boost.Outcome',
              note: 'Termine: Boost.Outcome (libreria Boost per gestione errori, nome proprio).',
            },
            {
              english: 'Assertion',
              italian: 'Asserzione',
              pronunciation: '/əˈsɜːrʃən/',
              phonetic: 'a-SER-scion',
              example:
                'Adding assert(p != nullptr) at the top of the function turns a silent crash later into an immediate assertion failure that points straight at the bug. = Aggiungere assert(p != nullptr) in cima alla funzione trasforma un crash silenzioso successivo in un fallimento di asserzione immediato che indica direttamente il bug.',
              context: 'exceptions',
              difficulty: 'intermediate',
              code: 'assert(p != nullptr);',
              note: 'Disabilitate con NDEBUG.',
              task: 'Inserisci assert(p != nullptr) per verificare in debug che il puntatore p non sia nullo.',
            },
            {
              english: 'Contract Check',
              italian: 'Verifica di contratto',
              pronunciation: '/ˈkɒntrækt/',
              phonetic: 'KON-trakt',
              example: `Inserting a contract check at the start of withdraw() verifies that the amount is positive before any balance mutation, catching misuse close to the call site. = Inserire una verifica di contratto all'inizio di withdraw() verifica che l'importo sia positivo prima di ogni mutazione del saldo, catturando l'uso scorretto vicino al call site.`,
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'Defensive Programming',
              italian: 'Programmazione difensiva',
              pronunciation: '/dɪˈfensɪv/',
              phonetic: 'di-FEN-siv',
              example:
                'Public APIs that accept user input rely on defensive programming, validating every argument as if the caller were actively trying to break the contract. = Le API pubbliche che accettano input utente si affidano alla programmazione difensiva, validando ogni argomento come se il chiamante stesse attivamente cercando di rompere il contratto.',
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'Error Propagation',
              italian: 'Propagazione errori',
              pronunciation: '/ˌprɒpəˈɡeɪʃən/',
              phonetic: 'pro-pa-GHEI-scion',
              example: `Returning std::expected from each layer keeps error propagation explicit, so the upper handler sees both the original cause and the call site that produced it. = Restituire std::expected da ogni livello mantiene la propagazione errori esplicita, così il gestore superiore vede sia la causa originale sia il call site che l'ha prodotta.`,
              context: 'exceptions',
              difficulty: 'intermediate',
            },
            {
              english: 'Fail Fast',
              italian: 'Fallisci in fretta',
              pronunciation: '/feɪl fɑːst/',
              phonetic: 'FEIL FAAST',
              example: `Adopting a fail fast policy at startup means a missing config key aborts the program immediately instead of crashing hours later during a key request. = Adottare una politica di fail fast all'avvio significa che una chiave di config mancante abortisce il programma immediatamente invece di crashare ore dopo durante una richiesta importante.`,
              context: 'exceptions',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 11 - LAMBDA / LAMBDAS & FUNCTIONAL
    // ════════════════════════════════════════════════
    11: {
      name: 'Lambda e Funzionale / Lambdas & Functional',
      description: 'Espressioni lambda e programmazione funzionale',
      lessons: [
        {
          id: 'cpp_lambdas_1',
          title: 'Lambda Basics / Lambda di Base',
          description: 'Sintassi delle lambda',
          items: [
            {
              english: 'Lambda Expression',
              italian: 'Espressione lambda',
              pronunciation: '/ˈlæmdə/',
              phonetic: 'LAM-da',
              example:
                "A lambda expression defines an inline function. = Un'espressione lambda definisce una funzione in linea.",
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `auto doubleIt = [](int x) { return x * 2; };
std::cout << doubleIt(5);  // 10
std::cout << doubleIt(21); // 42`,
              note: 'Disponibile da C++11.',
              task: 'Crea una lambda f che riceve un int x e restituisce x*2, salvandola in una variabile auto.',
            },
            {
              english: 'Capture List',
              italian: 'Lista di cattura',
              pronunciation: '/ˈkæptʃər/',
              phonetic: 'KAP-cer',
              example:
                'The capture list specifies what is captured. = La lista di cattura specifica cosa viene catturato.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `int x = 10;
auto show = [x]() {
    std::cout << "captured: " << x << "\\n";
};
show();`,
              task: 'Specifica nella capture list [x, &y] di catturare x per valore e y per riferimento dalla closure circostante.',
            },
            {
              english: 'Capture By Value',
              italian: 'Cattura per valore',
              pronunciation: '/baɪ ˈvæljuː/',
              phonetic: 'BAI VAL-iu',
              example:
                'Declaring [count] in the lambda performs capture by value, freezing the current count so later mutations of the outer variable do not affect the closure. = Dichiarare [count] nella lambda esegue la cattura per valore, congelando il count corrente così mutazioni successive della variabile esterna non influenzano la closure.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `int val = 5;
auto f = [val]() { return val * 2; };
val = 100;
std::cout << f(); // still 10`,
              task: 'Cattura x per valore con [x] in modo che la lambda lavori su una copia indipendente.',
            },
            {
              english: 'Capture By Reference',
              italian: 'Cattura per riferimento',
              pronunciation: '/baɪ ˈrefərəns/',
              phonetic: 'BAI REF-er-ens',
              example:
                'Writing [&total] in the accumulator lambda is capture by reference, so each invocation updates the same outer total used by the rest of the function. = Scrivere [&total] nella lambda accumulatore è cattura per riferimento, così ogni invocazione aggiorna lo stesso total esterno usato dal resto della funzione.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `int count = 0;
auto inc = [&count]() { ++count; };
inc(); inc();
std::cout << count; // 2`,
              note: 'Attenzione alla durata della variabile catturata.',
              task: 'Cattura x per riferimento con [&x] e incrementalo nel corpo della lambda con ++x.',
            },
            {
              english: 'Default Capture',
              italian: 'Cattura di default',
              pronunciation: '/dɪˈfɔːlt/',
              phonetic: 'di-FOLT',
              example:
                'Using [=] as a default capture grabs every named local by value, but the Core Guidelines warn against it because the dependency list becomes invisible. = Usare [=] come cattura di default prende ogni locale citato per valore, ma le Core Guidelines avvertono di evitarlo perché la lista di dipendenze diventa invisibile.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: '[=]() { /* ... */ }',
              note: 'Sconsigliato dalle Core Guidelines.',
              task: 'Usa la cattura di default per valore [=] per catturare implicitamente tutte le variabili utilizzate nella lambda.',
            },
            {
              english: 'Init Capture',
              italian: 'Cattura con inizializzazione',
              pronunciation: '/ɪˈnɪt/',
              phonetic: 'i-NIT',
              example: `Use an init capture to move a unique_ptr into a lambda body, transferring ownership without forcing the surrounding scope to retain the resource. = Usa un init capture per muovere un unique_ptr nel corpo di una lambda, trasferendo l'ownership senza forzare lo scope circostante a tenere la risorsa.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `auto p = std::make_unique<int>(42);
auto f = [ptr = std::move(p)]() {
    std::cout << *ptr;
};
f(); // prints 42`,
              note: 'Disponibile da C++14.',
              task: 'Sposta ptr nella closure con la init capture [p = std::move(ptr)] per dare alla lambda la proprietà della risorsa.',
            },
            {
              english: 'Mutable Lambda',
              italian: 'Lambda mutabile',
              pronunciation: '/ˈmjuːtəbl/',
              phonetic: 'MIU-ta-bol',
              example:
                'mutable lets a lambda modify captured copies. = mutable permette alla lambda di modificare le copie catturate.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `int x = 0;
auto counter = [x]() mutable {
    return ++x;
};
std::cout << counter(); // 1
std::cout << counter(); // 2`,
              task: 'Marca la lambda come mutable in modo da poter modificare la copia di x catturata per valore con ++x.',
            },
            {
              english: 'Closure',
              italian: 'Chiusura',
              pronunciation: '/ˈkloʊʒər/',
              phonetic: 'KLO-zer',
              example: `Each lambda expression generates a unique closure type whose data members store every captured variable in the order they appear in the capture list. = Ogni espressione lambda genera un tipo di chiusura unico i cui membri dati memorizzano ogni variabile catturata nell'ordine in cui appare nella lista di cattura.`,
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Lambda Body',
              italian: 'Corpo della lambda',
              pronunciation: '/ˈbɒdi/',
              phonetic: 'BO-di',
              example:
                'The lambda body holds the function code. = Il corpo della lambda contiene il codice della funzione.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Trailing Return',
              italian: 'Tipo di ritorno trailing',
              pronunciation: '/ˈtreɪlɪŋ rɪˈtɜːrn/',
              phonetic: 'TREI-ling ri-TERN',
              example:
                'Writing [](int x) -> double { return x / 2.0; } uses an explicit trailing return type to force the lambda to yield a double instead of an int. = Scrivere [](int x) -> double { return x / 2.0; } usa un tipo di ritorno trailing esplicito per forzare la lambda a produrre un double invece di un int.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `auto divide = [](int a, int b) -> double {
    return static_cast<double>(a) / b;
};
std::cout << divide(7, 2); // 3.5`,
              task: 'Specifica un trailing return type -> double sulla lambda che ritorna 1.0 per forzare il tipo di ritorno.',
            },
          ],
        },
        {
          id: 'cpp_lambdas_2',
          title: 'std::function / std::function',
          description: 'std::function e callable',
          items: [
            {
              english: 'std::function',
              italian: 'Wrapper di callable (std::function)',
              pronunciation: '/ˈfʌŋkʃən/',
              phonetic: 'FANK-scen',
              example:
                "The event bus stores callbacks as std::function objects so it can accept lambdas, free functions, and bound methods. = L'event bus memorizza le callback come oggetti std::function così può accettare lambda, funzioni libere e metodi legati.",
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `std::function<int(int)> doubler = [](int x) { return x * 2; };
std::cout << doubler(5);  // 10
std::cout << doubler(21); // 42`,
              task: 'Avvolgi una lambda che incrementa di uno in uno std::function<int(int)> per memorizzarla type-erased.',
            },
            {
              english: 'Callable',
              italian: 'Oggetto invocabile (callable)',
              pronunciation: '/ˈkɔːləbl/',
              phonetic: 'KOO-la-bol',
              example:
                'std::invoke accepts any callable, so the same notify function can dispatch to a free function, a member pointer, or a lambda with no extra glue code. = std::invoke accetta qualsiasi callable, così la stessa funzione notify può fare dispatch a una funzione libera, un puntatore a membro o una lambda senza glue code extra.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Function Pointer',
              italian: 'Puntatore a funzione',
              pronunciation: '/ˈpɔɪntər/',
              phonetic: 'POIN-ter',
              example:
                'A function pointer points to a function. = Un puntatore a funzione punta a una funzione.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: 'int (*fp)(int) = &add;',
              task: `Dichiara un puntatore a funzione int (*fp)(int) e assegnagli l'indirizzo della funzione add.`,
            },
            {
              english: 'Functor',
              italian: 'Funtore',
              pronunciation: '/ˈfʌŋktər/',
              phonetic: 'FANK-tor',
              example: `Defining a Counter struct with int operator()() turns it into a functor that std::generate can call repeatedly while preserving its internal state. = Definire una struct Counter con int operator()() la trasforma in un funtore che std::generate puo' chiamare ripetutamente preservando il suo stato interno.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `struct Adder {
    int base;
    int operator()(int x) const { return base + x; }
};
Adder add5{5};
std::cout << add5(10); // 15`,
              task: 'Definisci uno struct F con operator()(int x) per ottenere un funtore richiamabile come una funzione.',
            },
            {
              english: 'Bind',
              italian: 'std::bind',
              pronunciation: '/baɪnd/',
              phonetic: 'BAIND',
              example: `Using std::bind(send, socket, std::placeholders::_1) preconfigures the socket argument and returns a callable that expects only the payload. = Usare std::bind(send, socket, std::placeholders::_1) preconfigura l'argomento socket e restituisce un callable che attende solo il payload.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `int multiply(int a, int b) { return a * b; }
auto triple = std::bind(multiply, 3, std::placeholders::_1);
std::cout << triple(10); // 30`,
              note: 'Termine C++: std::bind (funzione standard, non si traduce). Spesso preferibile una lambda.',
              task: 'Crea g legando il primo argomento di f a 1 con std::bind(f, 1, std::placeholders::_1).',
            },
            {
              english: 'Higher Order Function',
              italian: 'Funzione di ordine superiore',
              pronunciation: '/ˈhaɪər ˈɔːrdər/',
              phonetic: 'HAI-er OR-der',
              example:
                'A higher-order function takes a function. = Una funzione di ordine superiore prende una funzione.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Type Erased Functor',
              italian: 'Funtore con tipo cancellato',
              pronunciation: '/ɪˈreɪzd/',
              phonetic: 'i-REIZD',
              example:
                'std::function<void(Event)> is the canonical type erased functor: it can hold any callable matching the signature while hiding the concrete type from the caller. = std::function<void(Event)> è il funtore con tipo cancellato canonico: può contenere qualsiasi callable che corrisponda alla firma nascondendo il tipo concreto al chiamante.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Callback',
              italian: 'Chiamata di ritorno (callback)',
              pronunciation: '/ˈkɔːlbæk/',
              phonetic: 'KOOL-bak',
              example:
                'A callback is a function passed as argument. = Un callback è una funzione passata come argomento.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Function Wrapper',
              italian: 'Wrapper di funzione',
              pronunciation: '/ˈræpər/',
              phonetic: 'RAP-per',
              example:
                'Storing every plugin entry point as a std::function turns the registry into a function wrapper that accepts lambdas, free functions, and member functions alike. = Memorizzare ogni entry point di plugin come std::function trasforma il registro in un wrapper di funzione che accetta lambda, funzioni libere e funzioni membro indistintamente.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Invoke',
              italian: 'std::invoke',
              pronunciation: '/ɪnˈvoʊk/',
              phonetic: 'in-VOUK',
              example:
                'Calling std::invoke uniformly invokes a free function, a lambda, or a pointer-to-member, which is essential when writing generic forwarding utilities. = Chiamare std::invoke invoca uniformemente una funzione libera, una lambda o un puntatore-a-membro, essenziale per scrivere utility di forwarding generiche.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: 'std::invoke(f, args);',
              note: 'Termine C++: std::invoke (funzione standard, non si traduce).',
              task: 'Invoca uniformemente il callable f con i suoi argomenti tramite std::invoke(f, args).',
            },
          ],
        },
        {
          id: 'cpp_lambdas_3',
          title: 'Generic Lambdas / Lambda Generiche',
          description: 'Lambda template e generiche',
          items: [
            {
              english: 'Generic Lambda',
              italian: 'Lambda generica',
              pronunciation: '/dʒəˈnerɪk/',
              phonetic: 'gie-NE-rik',
              example: `A generic lambda with \`auto\` parameters lets one closure work on int, double, and custom types without writing a separate template function. = Una generic lambda con parametri \`auto\` permette a una closure di funzionare su int, double e tipi custom senza scrivere una template function separata.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `auto print = [](auto x) {
    std::cout << x << "\\n";
};
print(42);
print("hello");
print(3.14);`,
              note: 'Disponibile da C++14.',
              task: 'Scrivi una lambda generica con parametro auto x che restituisce x + 1 indipendentemente dal tipo.',
            },
            {
              english: 'Template Lambda',
              italian: 'Lambda template',
              pronunciation: '/ˈtemplət/',
              phonetic: 'TEM-plet',
              example:
                'C++20 lambdas can have explicit template params. = Le lambda C++20 possono avere parametri template espliciti.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: '[]<typename T>(T x) { /* ... */ }',
              task: 'Dichiara una lambda template C++20 con []<typename T>(T x) per accedere esplicitamente al parametro T.',
            },
            {
              english: 'Variadic Lambda',
              italian: 'Lambda variadica',
              pronunciation: '/ˌveəriˈædɪk/',
              phonetic: 'va-ri-A-dik',
              example:
                'Writing [](auto&&... args) { log(std::forward<decltype(args)>(args)...); } produces a variadic lambda that forwards any number and type of arguments. = Scrivere [](auto&&... args) { log(std::forward<decltype(args)>(args)...); } produce una lambda variadica che inoltra qualsiasi numero e tipo di argomenti.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: '[](auto&&... args) { /* ... */ }',
              task: 'Crea una lambda variadica [](auto&&... args) che accetta un numero arbitrario di argomenti con forwarding.',
            },
            {
              english: 'Constexpr Lambda',
              italian: 'Lambda constexpr',
              pronunciation: '/kɒnstˈekspər/',
              phonetic: 'kons-TEK-sper',
              example:
                'A constexpr lambda runs at compile time. = Una lambda constexpr gira a compile time.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `auto sq = [](int x) constexpr { return x * x; };
constexpr int val = sq(5);
static_assert(val == 25);`,
              note: 'Disponibile da C++17.',
              task: 'Definisci una lambda constexpr sq che calcola x*x ed è invocabile a tempo di compilazione.',
            },
            {
              english: 'Stateless Lambda',
              italian: 'Lambda senza stato',
              pronunciation: '/ˈsteɪtləs/',
              phonetic: 'STEIT-les',
              example:
                'Because []() { return 42; } is a stateless lambda with no captures, it converts implicitly to a plain function pointer and can be passed to C APIs. = Poiché []() { return 42; } è una lambda senza stato senza catture, si converte implicitamente in un puntatore a funzione semplice e può essere passata a API C.',
              context: 'lambdas',
              difficulty: 'intermediate',
              note: 'Convertibile in puntatore a funzione.',
            },
            {
              english: 'Stateful Lambda',
              italian: 'Lambda con stato',
              pronunciation: '/ˈsteɪtfəl/',
              phonetic: 'STEIT-ful',
              example:
                'Wrap a counter in a stateful lambda by capturing it by reference so successive invocations mutate the same accumulated value. = Avvolgi un counter in una stateful lambda catturandolo per riferimento così invocazioni successive modificano lo stesso valore accumulato.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Recursive Lambda',
              italian: 'Lambda ricorsiva',
              pronunciation: '/rɪˈkɜːrsɪv/',
              phonetic: 'ri-KER-siv',
              example:
                'To write a recursive lambda you either capture a std::function holding the lambda itself or use C++23 deducing this so the body can call itself by name. = Per scrivere una lambda ricorsiva o catturi una std::function che contiene la lambda stessa o usi il deducing this di C++23 così il corpo può chiamarsi per nome.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `std::function<int(int)> fact = [&](int n) -> int {
    return n <= 1 ? 1 : n * fact(n - 1);
};
std::cout << fact(5); // 120`,
              task: 'Implementa il fattoriale come lambda ricorsiva salvata in std::function<int(int)> con cattura per riferimento.',
            },
            {
              english: 'Y Combinator',
              italian: 'Combinatore di ricorsione (Y combinator)',
              pronunciation: '/waɪ ˈkɒmbɪneɪtər/',
              phonetic: 'UAI KOM-bi-nei-tor',
              example:
                'A Y combinator enables anonymous recursion. = Un Y combinator abilita ricorsione anonima.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Immediately Invoked',
              italian: 'Invocata immediatamente',
              pronunciation: '/ɪˈmiːdiətli/',
              phonetic: 'i-MII-diat-li',
              example: `The config initializer uses an immediately invoked lambda const auto cfg = [] { /* build */ return c; }(); to build a complex const value in one expression. = L'inizializzatore di config usa una lambda invocata immediatamente const auto cfg = [] { /* build */ return c; }(); per costruire un valore const complesso in un'unica espressione.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `const auto config = []() {
    // complex init logic
    return 42;
}();
std::cout << config; // 42`,
              task: 'Inizializza x invocando immediatamente una lambda che ritorna 42 con la sintassi [](){...}().',
            },
            {
              english: 'Lambda Overload',
              italian: 'Overload di lambda',
              pronunciation: '/ˌoʊvərˈloʊd/',
              phonetic: 'O-ver-LOUD',
              example: `The visitor for std::variant uses the overload set trick to combine several lambdas into a single lambda overload object that dispatches on the active type. = Il visitor per std::variant usa il trucco dell'overload set per combinare diverse lambda in un singolo oggetto di overload di lambda che fa dispatch sul tipo attivo.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              note: 'Tecnica usata con std::variant + std::visit.',
            },
          ],
        },
        {
          id: 'cpp_lambdas_4',
          title: 'Functional Tools / Strumenti Funzionali',
          description: 'Strumenti per programmazione funzionale',
          items: [
            {
              english: 'Functional Header',
              italian: 'Header functional',
              pronunciation: '/ˈfʌŋkʃənl/',
              phonetic: 'FANK-scio-nal',
              example: `Pulling in the functional header is required before using std::function, std::bind, std::ref, or any of the standard function objects in your translation unit. = Includere l'header functional è necessario prima di usare std::function, std::bind, std::ref o uno qualsiasi degli oggetti funzione standard nella tua unità di traduzione.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              code: '#include <functional>',
              task: 'Includi #include <functional> per accedere a std::function, std::bind e ai funtori della libreria standard.',
            },
            {
              english: 'Greater Functor',
              italian: 'Funtore greater',
              pronunciation: '/ˈɡreɪtər/',
              phonetic: 'GREI-ter',
              example: `Passing std::greater<int>{} as the comparator turns std::sort into a descending sort because the greater functor inverts the default less-than ordering. = Passare std::greater<int>{} come comparatore trasforma std::sort in un ordinamento decrescente perché il funtore greater inverte l'ordinamento predefinito less-than.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              code: 'std::sort(v.begin(), v.end(), std::greater<>{});',
              task: 'Ordina il vettore v in modo decrescente passando std::greater<>{} a std::sort come comparatore.',
            },
            {
              english: 'Less Functor',
              italian: 'Funtore less',
              pronunciation: '/les/',
              phonetic: 'LES',
              example: `std::set defaults its comparator to std::less<T>, so providing the less functor explicitly is rarely needed unless you want the heterogeneous overload std::less<>. = std::set imposta di default il comparatore a std::less<T>, quindi fornire il funtore less esplicitamente raramente serve, a meno di voler l'overload eterogeneo std::less<>.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              code: 'std::set<int, std::less<>> s;',
              task: 'Dichiara uno std::set<int, std::less<>> per ordinare gli elementi in ordine crescente con il funtore less.',
            },
            {
              english: 'Plus Functor',
              italian: 'Funtore plus',
              pronunciation: '/plʌs/',
              phonetic: 'PLAS',
              example: `Passing std::plus<>{} to std::accumulate lets the plus functor sum heterogeneous types via deduction, avoiding the int truncation of the legacy overload. = Passare std::plus<>{} a std::accumulate permette al funtore plus di sommare tipi eterogenei via deduzione, evitando il troncamento a int dell'overload legacy.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3, 4};
int sum = std::accumulate(v.begin(), v.end(), 0, std::plus<>{});
std::cout << sum; // 10`,
              task: 'Somma gli elementi di v partendo da 0 chiamando std::accumulate con il funtore std::plus<>{}.',
            },
            {
              english: 'Reference Wrapper',
              italian: 'Wrapper di riferimento',
              pronunciation: '/ˈrefərəns ˈræpər/',
              phonetic: 'REF-er-ens RAP-per',
              example: `Wrapping a logger object with std::ref produces a reference wrapper so that std::thread stores a reference instead of silently copying the object. = Avvolgere un oggetto logger con std::ref produce un wrapper di riferimento così std::thread memorizza un riferimento invece di copiare silenziosamente l'oggetto.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `int x = 10;
auto rw = std::ref(x);
rw.get() = 20;
std::cout << x; // 20`,
              task: 'Crea un reference wrapper a x usando std::ref(x) per trasportare un riferimento dentro un container o thread.',
            },
            {
              english: 'Memoization',
              italian: 'Memoizzazione',
              pronunciation: '/ˌmemoʊaɪˈzeɪʃən/',
              phonetic: 'me-mo-ai-ZEI-scion',
              example:
                'The recursive Fibonacci solver uses memoization to store previously computed values and avoid exponential recalculation. = Il risolutore ricorsivo di Fibonacci usa la memoizzazione per memorizzare valori già calcolati ed evitare ricalcoli esponenziali.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Currying',
              italian: 'Trasformazione in funzioni a un argomento (currying)',
              pronunciation: '/ˈkʌriɪŋ/',
              phonetic: 'KAR-ring',
              example:
                'Applying currying to the add(a, b) function produces a chain where add(3) returns a lambda that adds 3 to any argument. = Applicando il currying alla funzione add(a, b) si ottiene una catena dove add(3) restituisce una lambda che aggiunge 3 a qualsiasi argomento.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Partial Application',
              italian: 'Applicazione parziale',
              pronunciation: '/ˈpɑːrʃəl/',
              phonetic: 'PAR-scial',
              example:
                'Using std::bind_front(add, 5) builds a new callable through partial application that always adds five to whatever single argument it later receives. = Usare std::bind_front(add, 5) costruisce un nuovo callable tramite applicazione parziale che aggiunge sempre cinque a qualsiasi singolo argomento riceva successivamente.',
              context: 'lambdas',
              difficulty: 'intermediate',
              code: `int add(int a, int b) { return a + b; }
auto add5 = std::bind_front(add, 5);
std::cout << add5(3);  // 8
std::cout << add5(10); // 15`,
              note: 'std::bind_front da C++20.',
              task: `Costruisci add5 applicando parzialmente l'argomento 5 a add con std::bind_front(add, 5).`,
            },
            {
              english: 'Pipeline',
              italian: 'Catena di trasformazioni (pipeline)',
              pronunciation: '/ˈpaɪplaɪn/',
              phonetic: 'PAIP-lain',
              example:
                'Chaining views with v | std::views::filter(odd) | std::views::transform(square) builds a lazy pipeline that visits each element only when consumed. = Concatenare viste con v | std::views::filter(odd) | std::views::transform(square) costruisce una pipeline pigra che visita ogni elemento solo quando consumato.',
              context: 'lambdas',
              difficulty: 'intermediate',
            },
            {
              english: 'Function Composition',
              italian: 'Composizione di funzioni',
              pronunciation: '/ˌkɒmpəˈzɪʃən/',
              phonetic: 'kom-po-ZI-scion',
              example: `Chain validate, normalize, and persist via function composition so the data pipeline reads top-to-bottom without intermediate temporaries cluttering the code. = Concatena validate, normalize e persist tramite function composition così la pipeline dati si legge dall'alto in basso senza temporanei intermedi che intasano il codice.`,
              context: 'lambdas',
              difficulty: 'intermediate',
              note: 'Rinominato da Composition per disambiguare dalla composizione OO di livello 3.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 12 - C++ MODERNO 11/14 / MODERN C++11/14
    // ════════════════════════════════════════════════
    12: {
      name: 'C++ Moderno 11/14 / Modern C++11/14',
      description: 'Funzionalità di C++11 e C++14',
      lessons: [
        {
          id: 'cpp_modern_cpp_1',
          title: 'Auto & Type Deduction / Auto e Deduzione',
          description: 'Auto, decltype, nullptr',
          items: [
            {
              english: 'Auto Keyword',
              italian: 'Parola chiave auto',
              pronunciation: '/ˈɔːtoʊ/',
              phonetic: 'OO-to',
              example:
                'Switching the loop variable to auto with auto it = m.begin() lets the auto keyword pick std::map<K,V>::iterator without you having to spell the long type. = Cambiare la variabile di loop in auto con auto it = m.begin() lascia che la parola chiave auto scelga std::map<K,V>::iterator senza dover scrivere il tipo lungo.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `auto x = 42;        // int
auto pi = 3.14;     // double
auto name = std::string("C++");`,
              note: 'Disponibile da C++11.',
              task: 'Dichiara x con auto x = 42 lasciando dedurre il tipo int al compilatore.',
            },
            {
              english: 'Decltype',
              italian: 'decltype',
              pronunciation: '/dekˈtaɪp/',
              phonetic: 'dek-TAIP',
              example:
                'Writing decltype(container.front()) gives the precise reference-or-value type that container.front() yields, which is invaluable when authoring generic wrappers. = Scrivere decltype(container.front()) dà il tipo preciso riferimento-o-valore che container.front() produce, prezioso quando si scrivono wrapper generici.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: 'decltype(x) y = x;',
              note: 'Termine C++: decltype (parola chiave del linguaggio, non si traduce).',
              task: 'Dichiara y con decltype(x) y = x per assegnargli esattamente lo stesso tipo di x.',
            },
            {
              english: 'Auto Return',
              italian: 'Ritorno auto',
              pronunciation: '/ˈɔːtoʊ rɪˈtɜːrn/',
              phonetic: 'OO-to ri-TERN',
              example:
                'C++14 allows auto return type deduction. = C++14 permette deduzione del tipo di ritorno auto.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `auto add(int a, int b) {
    return a + b;
}
// auto r = add(3, 4);  // r == 7`,
              task: 'Definisci add(int a, int b) con tipo di ritorno auto lasciando dedurre il tipo dal corpo della funzione.',
            },
            {
              english: 'Decltype Auto',
              italian: 'decltype(auto)',
              pronunciation: '/dekˈtaɪp ˈɔːtoʊ/',
              phonetic: 'dek-TAIP OO-to',
              example: `Returning decltype(auto) from a forwarding helper preserves whether the wrapped call yields a reference or a value, matching the original expression precisely. = Restituire decltype(auto) da un helper di forwarding preserva se la chiamata avvolta produce un riferimento o un valore, corrispondendo precisamente all'espressione originale.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: 'decltype(auto) f() { return x; }',
              note: 'Termine C++: decltype(auto) (sintassi del linguaggio, non si traduce).',
              task: 'Usa decltype(auto) come tipo di ritorno di f() per preservare esattamente value-category e cv di x.',
            },
            {
              english: 'Nullptr',
              italian: 'nullptr',
              pronunciation: '/ˈnʌlptər/',
              phonetic: 'NAL-pter',
              example:
                'Initializing the raw pointer with nullptr instead of 0 disambiguates overload resolution so f(int) is no longer accidentally selected over f(char*). = Inizializzare il puntatore grezzo con nullptr invece di 0 disambigua la risoluzione degli overload così f(int) non viene più selezionato accidentalmente al posto di f(char*).',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `int* p = nullptr;
if (p == nullptr) {
    p = new int(42);
}`,
              note: 'Termine C++: nullptr (parola chiave del linguaggio, non si traduce).',
              task: `Inizializza il puntatore int* p a nullptr per indicare in modo type-safe l'assenza di un indirizzo valido.`,
            },
            {
              english: 'Range For',
              italian: 'Ciclo for su sequenza (range-for)',
              pronunciation: '/reɪndʒ fɔːr/',
              phonetic: 'REINGE FOR',
              example:
                'Rewriting the index-based loop as a range for like for (auto& item : items) keeps the body focused on what to do and not how to walk the container. = Riscrivere il loop basato su indice come un range-for tipo for (auto& item : items) mantiene il corpo focalizzato sul cosa fare e non sul come percorrere il container.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `std::vector<int> v = {1, 2, 3};
for (auto& x : v) {
    x *= 2;
}`,
              task: 'Itera sul vettore v con un range-for for (auto& x : v) per accedere agli elementi per riferimento.',
            },
            {
              english: 'Brace Initialization',
              italian: 'Inizializzazione con graffe',
              pronunciation: '/breɪs/',
              phonetic: 'BREIS',
              example: `Writing int n{3.14} fails to compile because brace initialization forbids the narrowing conversion that int n = 3.14 would silently accept. = Scrivere int n{3.14} non compila perché l'inizializzazione con graffe vieta la conversione narrowing che int n = 3.14 accetterebbe silenziosamente.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: 'int x{42};',
              task: `Inizializza l'intero x con la sintassi a graffe int x{42} per attivare i controlli di narrowing.`,
            },
            {
              english: 'Initializer List',
              italian: 'Lista di inizializzazione',
              pronunciation: '/ɪˈnɪʃəlaɪzər/',
              phonetic: 'i-NI-scia-lai-zer',
              example:
                'std::initializer_list holds a brace-init list. = std::initializer_list contiene una lista con graffe.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: 'std::vector<int> v = {1, 2, 3};',
              task: 'Inizializza std::vector<int> v dalla lista di inizializzazione {1, 2, 3} con i valori esatti.',
            },
            {
              english: 'Uniform Initialization',
              italian: 'Inizializzazione uniforme',
              pronunciation: '/ˈjuːnɪfɔːrm/',
              phonetic: 'IU-ni-form',
              example: `Adopting uniform initialization with braces gives a single consistent syntax for constructing arrays, aggregates, and class objects across the entire codebase. = Adottare l'inizializzazione uniforme con graffe dà una sintassi unica e coerente per costruire array, aggregati e oggetti di classe in tutto il codice.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
            },
            {
              english: 'Auto Variable',
              italian: 'Variabile auto',
              pronunciation: '/ˈveəriəbl/',
              phonetic: 'VE-ri-a-bol',
              example:
                'Declaring iterators and lambda results as an auto variable keeps deeply templated types out of the source code and shortens the surface area for refactors. = Dichiarare iteratori e risultati di lambda come una variabile auto tiene i tipi profondamente template fuori dal codice sorgente e riduce la superficie per i refactor.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'cpp_modern_cpp_2',
          title: 'Move Semantics Intro / Introduzione al Move',
          description: 'Move e rvalue reference',
          items: [
            {
              english: 'Move Semantics',
              italian: 'Semantica del move',
              pronunciation: '/muːv sɪˈmæntɪks/',
              phonetic: 'MUUV si-MAN-tiks',
              example:
                'Adopting move semantics in the JSON parser eliminated the deep copies of large string nodes and cut overall parse time by nearly half. = Adottare la semantica del move nel parser JSON ha eliminato le copie profonde dei grandi nodi string e ha tagliato il tempo totale di parsing di quasi la metà.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
            },
            {
              english: 'Rvalue Reference',
              italian: 'Riferimento rvalue',
              pronunciation: '/ˈɑːrˌvæljuː/',
              phonetic: 'AR-val-iu',
              example:
                'An rvalue reference uses double ampersand. = Un riferimento rvalue usa doppia &.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `void process(std::string&& s) {
    std::string local = std::move(s);
}
// process(std::string("temp"));`,
              task: 'Dichiara f(T&& x) con un rvalue reference per ricevere valori temporanei e abilitare le move semantics.',
            },
            {
              english: 'Std Move',
              italian: 'std::move',
              pronunciation: '/stændərd muːv/',
              phonetic: 'STD-MUUV',
              example:
                'Wrapping the source vector in std::move(v) at the return statement casts it to an rvalue so the caller receives the buffer through the move constructor. = Avvolgere il vector sorgente in std::move(v) nello statement return lo casta a rvalue così il chiamante riceve il buffer tramite il costruttore di move.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `std::string a = "hello";
std::string b = std::move(a);
// a is now in a valid but unspecified state`,
              note: 'Termine C++: std::move (funzione standard, non si traduce).',
              task: 'Trasforma x in un xvalue con auto y = std::move(x) per consentire il furto delle risorse a y.',
            },
            {
              english: 'Lvalue',
              italian: 'lvalue',
              pronunciation: '/ˈelˌvæljuː/',
              phonetic: 'EL-val-iu',
              example: `An lvalue refers to a named storage location you can take the address of, unlike a temporary that disappears at the end of the full expression. = Un lvalue si riferisce a una locazione di memoria con nome di cui puoi prendere l'indirizzo, a differenza di un temporaneo che scompare alla fine dell'espressione.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              note: 'Termine C++: lvalue (categoria di valore del linguaggio, non si traduce).',
            },
            {
              english: 'Rvalue',
              italian: 'rvalue',
              pronunciation: '/ˈɑːrˌvæljuː/',
              phonetic: 'AR-val-iu',
              example:
                'The temporary returned by makeBuffer() is an rvalue, which is exactly why operator= can move from it instead of copying its underlying memory. = Il temporaneo restituito da makeBuffer() è un rvalue, ed è esattamente il motivo per cui operator= può fare move da esso invece di copiare la sua memoria sottostante.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              note: 'Termine C++: rvalue (categoria di valore del linguaggio, non si traduce).',
            },
            {
              english: 'Xvalue',
              italian: 'xvalue',
              pronunciation: '/ˈɛksˌvæljuː/',
              phonetic: 'EKS-val-iu',
              example: `The result of std::move(v) is an xvalue, an expiring value whose resources you may steal because the original object will not be observed again. = Il risultato di std::move(v) è un xvalue, un valore in scadenza le cui risorse puoi rubare perché l'oggetto originale non sarà più osservato.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              note: 'Termine C++: xvalue (categoria di valore del linguaggio, non si traduce).',
            },
            {
              english: 'Prvalue',
              italian: 'prvalue',
              pronunciation: '/ˈpiː ɑːrˌvæljuː/',
              phonetic: 'PI-AR-val-iu',
              example: `A literal expression like 42 or std::string("hi") is a prvalue, a pure rvalue with no identity that materializes only when bound to a reference or stored. = Un'espressione letterale come 42 o std::string("hi") è un prvalue, un rvalue puro senza identità che si materializza solo quando è legato a un riferimento o memorizzato.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              note: 'Termine C++: prvalue (categoria di valore del linguaggio, non si traduce).',
            },
            {
              english: 'Rvalue Move Constructor',
              italian: 'Costruttore di move (rvalue)',
              pronunciation: '/muːv kənˈstrʌktər/',
              phonetic: 'MUUV kon-STRAK-tor',
              example:
                'Defining Buffer(Buffer&& other) noexcept as an rvalue move constructor swaps the heap pointer with the source and leaves the source in an empty state. = Definire Buffer(Buffer&& other) noexcept come costruttore di move da rvalue scambia il puntatore heap con la sorgente e lascia la sorgente in uno stato vuoto.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `struct Buffer {
    int* data;
    Buffer(Buffer&& other) noexcept
        : data(other.data) { other.data = nullptr; }
};`,
              note: 'Rinominato per disambiguare dal Move Constructor di livello 2.',
              task: 'Definisci il costruttore di move A(A&& other) noexcept per trasferire le risorse da other senza eccezioni.',
            },
            {
              english: 'Rvalue Move Assignment',
              italian: 'Assegnazione di move (rvalue)',
              pronunciation: '/muːv əˈsaɪnmənt/',
              phonetic: 'MUUV a-SAIN-ment',
              example:
                'Implementing Buffer& operator=(Buffer&&) noexcept as an rvalue move assignment releases the current resource and steals the one bound to the rvalue source. = Implementare Buffer& operator=(Buffer&&) noexcept come assegnazione di move da rvalue rilascia la risorsa corrente e ruba quella legata alla sorgente rvalue.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `Buffer& operator=(Buffer&& other) noexcept {
    delete[] data;
    data = other.data;
    other.data = nullptr;
    return *this;
}`,
              note: 'Rinominato per disambiguare dal Move Assignment di livello 2.',
              task: `Implementa l'operatore di assegnazione di move A& operator=(A&& other) noexcept per riassegnare riusando le risorse.`,
            },
            {
              english: 'Moved-From State',
              italian: 'Stato post-move',
              pronunciation: '/muːvd frɒm/',
              phonetic: 'MUUVD-FROM',
              example:
                'A moved-from object must be valid but unspecified. = Un oggetto post-move deve essere valido ma non specificato.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              note: 'Si può distruggere o assegnare, non leggere.',
            },
          ],
        },
        {
          id: 'cpp_modern_cpp_3',
          title: 'Smart Defaults / Default Intelligenti',
          description: 'Funzioni speciali e modifiche di default',
          items: [
            {
              english: 'Default Function',
              italian: 'Funzione di default',
              pronunciation: '/dɪˈfɔːlt/',
              phonetic: 'di-FOLT',
              example: `Declaring a special member as a default function with \`= default\` makes intent explicit and preserves the trivial properties needed for memcpy-safe types. = Dichiarare un membro speciale come default function con \`= default\` rende l'intento esplicito e preserva le proprietà triviali necessarie per tipi memcpy-safe.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `struct Widget {
    Widget() = default;
    Widget(const Widget&) = default;
    Widget& operator=(const Widget&) = default;
};`,
              task: 'Richiedi al compilatore di generare il costruttore di default scrivendo A() = default.',
            },
            {
              english: 'Modern Deleted Function',
              italian: 'Funzione eliminata (modern C++)',
              pronunciation: '/dɪˈliːtɪd/',
              phonetic: 'di-LII-ted',
              example: `Forbidding copy construction via a modern deleted function with \`= delete\` produces a compile-time error instead of the legacy trick of declaring it private and undefined. = Vietare la costruzione per copia tramite una modern deleted function con \`= delete\` produce un errore di compilazione invece del vecchio trucco di dichiararla privata e non definita.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `struct Singleton {
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
};`,
              note: 'Rinominato per disambiguare dal Deleted Function di livello 2.',
              task: 'Disabilita esplicitamente la copia della classe A con A(const A&) = delete.',
            },
            {
              english: 'Override Specifier',
              italian: 'Specificatore override',
              pronunciation: '/ˌoʊvərˈraɪd/',
              phonetic: 'O-ver-RAID',
              example:
                'Adding the override specifier to draw() in Circle makes the compiler fail loudly if the base class signature drifts and the derived method no longer overrides anything. = Aggiungere lo specificatore override a draw() in Circle fa fallire il compilatore in modo evidente se la firma della base cambia e il metodo derivato non sovrascrive più nulla.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `struct Base { virtual void draw() {} };
struct Circle : Base {
    void draw() override { /* circle drawing */ }
};`,
              task: 'Marca la funzione virtuale ridefinita con il suffisso override perché il compilatore verifichi la firma della base.',
            },
            {
              english: 'Final Specifier',
              italian: 'Specificatore final',
              pronunciation: '/ˈfaɪnl/',
              phonetic: 'FAI-nol',
              example:
                'Marking SecurityPolicy with the final specifier prevents third-party code from deriving a subclass that could weaken the audited checks of the base class. = Marcare SecurityPolicy con lo specificatore final impedisce al codice di terze parti di derivare una sottoclasse che potrebbe indebolire i controlli auditati della classe base.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `struct Base { virtual void f() {} };
class Derived final : public Base {
    void f() final { /* cannot override further */ }
};`,
              task: 'Impedisci ulteriori derivazioni della classe A marcandola con il qualificatore final.',
            },
            {
              english: 'Constexpr Function Modern',
              italian: 'Funzione constexpr (modern C++)',
              pronunciation: '/kɒnstˈekspər/',
              phonetic: 'kons-TEK-sper',
              example: `Tagging the helper as constexpr lets you write constexpr auto v = compute(7); so the constexpr function is evaluated entirely at compile time. = Etichettare l'helper come constexpr permette di scrivere constexpr auto v = compute(7); così la funzione constexpr viene valutata interamente a tempo di compilazione.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `constexpr int sq(int x) {
    return x * x;
}
static_assert(sq(5) == 25);`,
              note: 'Rinominato per disambiguare dal Constexpr di livello 1.',
              task: 'Definisci constexpr int sq(int x) che restituisce x*x ed è valutabile a tempo di compilazione.',
            },
            {
              english: 'Strongly Typed Enum',
              italian: 'Enum fortemente tipizzato',
              pronunciation: '/ˈstrɒŋli taɪpt/',
              phonetic: 'STRON-gli TAIPT',
              example:
                'Replacing the C-style flag set with a strongly typed enum class Permission removes implicit integer conversions and makes invalid combinations a compile error. = Sostituire il set di flag stile C con un enum class Permission fortemente tipizzato rimuove le conversioni implicite a intero e rende combinazioni invalide un errore di compilazione.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `enum class Color { Red, Green, Blue };
Color c = Color::Red;
// int x = c;  // error: no implicit conversion`,
              task: `Sostituisci l'enum tradizionale con enum class Color { Red, Green } per ottenere uno scope dedicato e nessuna conversione implicita.`,
            },
            {
              english: 'Modern Static Assert',
              italian: 'Asserzione a tempo di compilazione moderna (static_assert)',
              pronunciation: '/əˈsɜːrt/',
              phonetic: 'a-SERT',
              example:
                'Adding a modern static_assert(sizeof(Header) == 64, "unexpected packet layout"); freezes the binary protocol layout into the build instead of catching it at runtime. = Aggiungere un static_assert(sizeof(Header) == 64, "unexpected packet layout"); moderno congela il layout del protocollo binario nella build invece di catturarlo a runtime.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: 'static_assert(sizeof(int) == 4);',
              note: 'Rinominato per disambiguare dal Static Assert di livello 8 (cpp_templates_4).',
              task: 'Aggiungi static_assert(sizeof(int) == 4) per imporre a tempo di compilazione che int sia di 4 byte.',
            },
            {
              english: 'Raw String Literal',
              italian: 'Stringa raw',
              pronunciation: '/rɔː/',
              phonetic: 'ROO',
              example:
                'Writing R"(C:\\Users\\re\\file.txt)" as a raw string literal avoids the tower of backslash escapes that the equivalent regular string would need. = Scrivere R"(C:\\Users\\re\\file.txt)" come letterale stringa raw evita la torre di escape con backslash che la stringa regolare equivalente richiederebbe.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: 'auto s = R"(C:\\path)";',
              task: 'Salva il percorso C:\\path in s come raw string literal R"(C:\\path)" per evitare di escapare i backslash.',
            },
            {
              english: 'Right Angle Brackets',
              italian: 'Parentesi angolari di chiusura',
              pronunciation: '/raɪt ˈæŋɡl/',
              phonetic: 'RAIT AN-gol',
              example: `Since C++11 you can write std::vector<std::vector<int>> with adjacent right angle brackets, and the parser no longer mistakes >> for the shift operator. = Da C++11 puoi scrivere std::vector<std::vector<int>> con parentesi angolari di chiusura adiacenti, e il parser non confonde più >> con l'operatore di shift.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: 'std::vector<std::vector<int>>',
              note: 'Prima di C++11 serviva uno spazio: > >.',
              task: 'Dichiara std::vector<std::vector<int>> con due >> consecutivi senza inserire spazi grazie al parsing post-C++11.',
            },
            {
              english: 'Modern User-Defined Literal',
              italian: 'Letterale definito utente (modern C++)',
              pronunciation: '/ˈjuːzər dɪˈfaɪnd/',
              phonetic: 'IU-zer di-FAIND',
              example:
                'Defining auto operator""_ms(unsigned long long n) introduces a modern user-defined literal so timeout(250_ms) reads naturally and is type-checked. = Definire auto operator""_ms(unsigned long long n) introduce un letterale definito utente moderno così timeout(250_ms) si legge naturalmente ed è type-checked.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `using namespace std::chrono_literals;
auto timeout = 500ms;
auto delay = 2s;`,
              note: 'Rinominato per disambiguare dal User-Defined Literal di livello 5 (cpp_oop_16).',
              task: 'Importa con using namespace std::chrono_literals per abilitare suffissi user-defined come 1s e 100ms.',
            },
          ],
        },
        {
          id: 'cpp_modern_cpp_4',
          title: 'New Standard Library / Nuova Libreria Standard',
          description: 'Aggiunte alla libreria standard',
          items: [
            {
              english: 'Tuple',
              italian: 'std::tuple',
              pronunciation: '/ˈtuːpl/',
              phonetic: 'TUU-pol',
              example:
                'Returning std::tuple<bool, int, std::string> from parse() lets the caller use structured bindings to unpack ok, code, and message in a single line. = Restituire std::tuple<bool, int, std::string> da parse() permette al chiamante di usare i binding strutturati per estrarre ok, code e message in una sola riga.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `auto t = std::make_tuple(1, "hello", 3.14);
auto val = std::get<0>(t);  // 1
auto [a, b, c] = t;  // structured binding`,
              note: 'Termine C++: std::tuple (template standard, non si traduce).',
              task: 'Crea uno std::tuple<int, std::string> t inizializzato con {1, "hi"} per raggruppare valori eterogenei.',
            },
            {
              english: 'Pair',
              italian: 'Coppia',
              pronunciation: '/peər/',
              phonetic: 'PER',
              example: `The map insert() function returns a std::pair whose first element is the iterator to the entry and whose second element is true if the insertion happened. = La funzione insert() della map restituisce un std::pair il cui primo elemento è l'iteratore alla voce e il secondo è true se l'inserimento è avvenuto.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: 'std::pair<int, std::string> p{1, "hi"};',
              task: 'Istanzia uno std::pair<int, std::string> p con {1, "hi"} per accoppiare un intero e una stringa.',
            },
            {
              english: 'Modern Array',
              italian: 'Array a dimensione fissa moderno (std::array)',
              pronunciation: '/əˈreɪ/',
              phonetic: 'a-REI',
              example:
                'Replacing the int v[5] raw block with a modern std::array<int, 5> gives bounds checking via at(), iterators, and value semantics for free. = Sostituire il blocco grezzo int v[5] con un std::array<int, 5> moderno fornisce controllo dei limiti via at(), iteratori e semantica per valore gratuitamente.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `std::array<int, 5> a = {1, 2, 3, 4, 5};
std::sort(a.begin(), a.end());
auto sz = a.size();  // 5, constexpr`,
              note: `Rinominato per disambiguare dall'Array di livello 6 (cpp_stl_1).`,
              task: 'Dichiara uno std::array<int, 5> a per ottenere un array a dimensione fissa con semantica di container STL.',
            },
            {
              english: 'Chrono',
              italian: 'Libreria di tempo (std::chrono)',
              pronunciation: '/ˈkroʊnoʊ/',
              phonetic: 'KRO-no',
              example:
                'std::chrono manages times and durations. = std::chrono gestisce tempi e durate.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `auto start = std::chrono::steady_clock::now();
// ... work ...
auto elapsed = std::chrono::steady_clock::now() - start;`,
              task: 'Sospendi il thread corrente per un secondo chiamando std::this_thread::sleep_for(1s) dalla libreria chrono.',
            },
            {
              english: 'Random',
              italian: 'std::random',
              pronunciation: '/ˈrændəm/',
              phonetic: 'RAN-dom',
              example:
                'Switching from rand() to the std::random engines and distributions lets you choose mt19937 and uniform_int_distribution for reproducible high-quality sampling. = Passare da rand() ai motori e distribuzioni di std::random permette di scegliere mt19937 e uniform_int_distribution per campionamenti di alta qualità riproducibili.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `std::mt19937 gen{42};
std::uniform_int_distribution<int> dist(1, 100);
int roll = dist(gen);`,
              note: 'Termine C++: libreria std::random (libreria standard, non si traduce).',
              task: 'Costruisci un generatore Mersenne Twister std::mt19937 gen{42} con seme deterministico 42.',
            },
            {
              english: 'Regex',
              italian: 'Libreria di espressioni regolari (std::regex)',
              pronunciation: '/ˈriːdʒeks/',
              phonetic: 'RI-geks',
              example:
                'std::regex provides regular expressions. = std::regex fornisce espressioni regolari.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `std::regex re(R"(\\d{3}-\\d{4})");
std::smatch match;
std::regex_search(phone, match, re);`,
              task: 'Compila una std::regex re che riconosce una sequenza di cifre con il pattern raw R"(\\d+)".',
            },
            {
              english: 'Thread',
              italian: 'std::thread',
              pronunciation: '/θred/',
              phonetic: 'TRED',
              example: `Spawning a background worker with std::thread t(loadAssets); kicks off the load on another OS thread while the main one continues to handle input. = Avviare un worker in background con std::thread t(loadAssets); lancia il caricamento su un altro thread OS mentre il main continua a gestire l'input.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `std::thread t([]{ std::cout << "working"; });
t.join();  // wait for completion`,
              note: 'Termine C++: std::thread (classe standard, non si traduce).',
              task: 'Avvia uno std::thread t che esegue la funzione work in parallelo al thread principale.',
            },
            {
              english: 'Atomic',
              italian: 'Operazioni atomiche (std::atomic)',
              pronunciation: '/əˈtɒmɪk/',
              phonetic: 'a-TO-mik',
              example:
                'std::atomic provides lock-free operations. = std::atomic fornisce operazioni lock-free.',
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `std::atomic<int> counter{0};
// from multiple threads:
counter.fetch_add(1, std::memory_order_relaxed);`,
              task: 'Dichiara uno std::atomic<int> n inizializzato a 0 per supportare letture e scritture concorrenti senza data race.',
            },
            {
              english: 'Type Traits',
              italian: 'Tratti di tipo',
              pronunciation: '/treɪts/',
              phonetic: 'TREITS',
              example: `Constraining a template with std::enable_if_t<std::is_integral_v<T>> uses type traits to disable the overload for floating-point arguments at compile time. = Vincolare un template con std::enable_if_t<std::is_integral_v<T>> usa i type traits per disabilitare l'overload per argomenti in virgola mobile a tempo di compilazione.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: 'std::is_integral_v<int>',
              task: 'Usa std::is_integral_v<int> per ottenere a tempo di compilazione il bool che indica se int è un tipo integrale.',
            },
            {
              english: 'Modern Make Shared',
              italian: 'Fabbrica moderna per shared_ptr (std::make_shared)',
              pronunciation: '/meɪk ʃeərd/',
              phonetic: 'MEIK SCERD',
              example: `Calling std::make_shared<Widget>(args...) as a modern make shared performs one heap allocation for both the object and the control block, saving a cache miss per pointer. = Chiamare std::make_shared<Widget>(args...) come make_shared moderno esegue una sola allocazione heap sia per l'oggetto che per il control block, risparmiando un cache miss per puntatore.`,
              context: 'modern-cpp',
              difficulty: 'intermediate',
              code: `auto p = std::make_shared<std::string>("hello");
std::cout << *p << std::endl;
std::cout << p.use_count();  // 1`,
              note: 'Rinominato per disambiguare dal Make Shared di livello 9 (cpp_memory_2).',
              task: 'Costruisci uno shared_ptr<Foo> default-inizializzato con auto p = std::make_shared<Foo>().',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 13 - C++ MODERNO 17/20 / MODERN C++17/20
    // ════════════════════════════════════════════════
    13: {
      name: 'C++ Moderno 17/20 / Modern C++17/20',
      description: 'Funzionalità di C++17 e C++20',
      lessons: [
        {
          id: 'cpp_modern_cpp_5',
          title: 'C++17 Features / Caratteristiche C++17',
          description: 'Strutture e funzionalità di C++17',
          items: [
            {
              english: 'Structured Bindings',
              italian: 'Binding strutturato',
              pronunciation: '/ˈstrʌktʃərd/',
              phonetic: 'STRAK-cerd',
              example: `When iterating a \`std::map\`, structured bindings let you write \`for (auto& [key, value] : m)\` instead of accessing \`.first\` and \`.second\` everywhere. = Quando itera una \`std::map\`, le structured bindings permettono di scrivere \`for (auto& [key, value] : m)\` invece di accedere ovunque a \`.first\` e \`.second\`.`,
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `std::map<std::string, int> m = {{"a", 1}};
for (auto& [key, val] : m) {
    std::cout << key << ": " << val;
}`,
              note: 'Disponibile da C++17.',
              task: 'Decomponi la coppia restituita da std::make_pair(1, 2) nelle variabili a e b con auto [a, b].',
            },
            {
              english: 'If Init',
              italian: 'If con init',
              pronunciation: '/ɪf ɪˈnɪt/',
              phonetic: 'IF i-NIT',
              example:
                'The if init syntax binds an iterator inline so its scope ends with the conditional, keeping the enclosing function tidy when handling map lookups. = La sintassi if init lega un iteratore inline così il suo scope termina col condizionale, mantenendo la funzione esterna pulita nei lookup su map.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `std::map<std::string, int> m = {{"x", 42}};
if (auto it = m.find("x"); it != m.end()) {
    std::cout << it->second;
}`,
              task: `Combina inizializzazione e condizione con if (auto it = m.find(k); it != m.end()) limitando it allo scope dell'if.`,
            },
            {
              english: 'Constexpr If',
              italian: 'If constexpr',
              pronunciation: '/kɒnstˈekspər/',
              phonetic: 'kons-TEK-sper',
              example:
                'Switching on the type with if constexpr (std::is_integral_v<T>) compiles only the matching branch, so the unused arm cannot trigger spurious template errors. = Fare switch sul tipo con if constexpr (std::is_integral_v<T>) compila solo il ramo corrispondente, così il braccio inutilizzato non può scatenare errori template spuri.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `template<class T>
auto to_string(T val) {
    if constexpr (std::is_integral_v<T>)
        return std::to_string(val);
    else
        return val;
}`,
              task: 'Discrimina a tempo di compilazione i tipi integrali con if constexpr (std::is_integral_v<T>).',
            },
            {
              english: 'Header Inline Variable',
              italian: `Variabile inline d'header`,
              pronunciation: '/ˌɪnˈlaɪn/',
              phonetic: 'in-LAIN',
              example: `Defining inline constexpr int kMaxClients = 256; in a header as a header inline variable gives every translation unit the same address without duplicate-symbol linker errors. = Definire inline constexpr int kMaxClients = 256; in un header come variabile inline d'header dà a ogni unità di traduzione lo stesso indirizzo senza errori del linker di simboli duplicati.`,
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: 'inline constexpr int N = 10;',
              note: `Rinominato per disambiguare dall'Inline Variable di livello 2 (cpp_oop_4).`,
              task: `Definisci nell'header inline constexpr int N = 10 per avere un'unica istanza fra le translation unit.`,
            },
            {
              english: 'Std Optional',
              italian: 'std::optional',
              pronunciation: '/ˈɒpʃənl/',
              phonetic: 'OP-scio-nal',
              example: `Returning std::optional<User> from lookup() makes the absence of a match an explicit part of the type, removing the need for sentinel ids or null pointers. = Restituire std::optional<User> da lookup() rende l'assenza di una corrispondenza una parte esplicita del tipo, eliminando la necessità di id sentinella o puntatori null.`,
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `std::optional<int> find(int id) {
    if (id > 0) return id * 10;
    return std::nullopt;
}
// auto v = find(3).value_or(-1);`,
              note: 'Termine C++: std::optional (template standard, non si traduce).',
              task: 'Dichiara std::optional<int> n = 5 per rappresentare un intero opzionale inizialmente presente con valore 5.',
            },
            {
              english: 'Std Variant',
              italian: 'std::variant',
              pronunciation: '/ˈveəriənt/',
              phonetic: 'VE-ri-ant',
              example:
                'Modeling an AST node as std::variant<Number, String, Call> turns the heterogeneous payload into a type-safe std::variant that std::visit can dispatch on. = Modellare un nodo AST come std::variant<Number, String, Call> trasforma il payload eterogeneo in una std::variant type-safe su cui std::visit può fare dispatch.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: 'std::variant<int, std::string> v;',
              note: 'Termine C++: std::variant (template standard, non si traduce).',
              task: 'Dichiara uno std::variant<int, std::string> v per una variabile type-safe che può contenere int o string.',
            },
            {
              english: 'Std Any',
              italian: 'std::any',
              pronunciation: '/ˈeni/',
              phonetic: 'E-ni',
              example:
                'The plugin registry stores opaque user data in std::any so each plugin can stash anything and recover it later with std::any_cast at the matching type. = Il registro dei plugin memorizza dati utente opachi in std::any così ogni plugin può conservare qualsiasi cosa e recuperarla in seguito con std::any_cast al tipo corrispondente.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: 'std::any a = 42;',
              note: 'Termine C++: std::any (template standard, non si traduce).',
              task: 'Salva il valore 42 dentro uno std::any a per memorizzare type-erased un singolo oggetto di qualunque tipo.',
            },
            {
              english: 'Std String View',
              italian: 'std::string_view',
              pronunciation: '/strɪŋ vjuː/',
              phonetic: 'STRING-VIU',
              example: `Changing the parser parameter from const std::string& to std::string_view as a non-owning view lets callers pass string literals without paying for a temporary allocation. = Cambiare il parametro del parser da const std::string& a std::string_view come vista non proprietaria permette ai chiamanti di passare letterali stringa senza pagare un'allocazione temporanea.`,
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `void greet(std::string_view name) {
    std::cout << "Hello, " << name;
}
greet("world");  // no allocation`,
              note: 'Termine C++: std::string_view (classe standard, non si traduce).',
              task: 'Dichiara uno std::string_view sv su "hi" per ottenere una vista non posseduta della stringa.',
            },
            {
              english: 'Std Filesystem',
              italian: 'Libreria di gestione file system (std::filesystem)',
              pronunciation: '/ˈfaɪlsɪstəm/',
              phonetic: 'FAIL-sis-tem',
              example:
                'Use std::filesystem to iterate a directory tree and compute total size without manually handling per-OS path separators. = Usa std::filesystem per iterare un albero di directory e calcolare la dimensione totale senza gestire manualmente i separatori per OS.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `namespace fs = std::filesystem;
fs::path p = "/tmp/data.txt";
if (fs::exists(p))
    auto sz = fs::file_size(p);`,
              task: 'Crea un std::filesystem::path p impostato a "/tmp" per manipolare percorsi in modo portabile.',
            },
            {
              english: 'Std Visit',
              italian: 'Visita di variante (std::visit)',
              pronunciation: '/ˈvɪzɪt/',
              phonetic: 'VI-zit',
              example:
                'Pass an overloaded lambda set to std::visit so each alternative of a variant gets dispatched to the right handler. = Passa un insieme di lambda overloadate a std::visit così ogni alternativa di una variant è instradata al gestore giusto.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `std::variant<int, std::string> v = 42;
std::visit([](auto& val) {
    std::cout << val;
}, v);`,
              task: 'Applica al variant v il visitor visitor invocando std::visit(visitor, v) per gestire tutte le alternative.',
            },
          ],
        },
        {
          id: 'cpp_modern_cpp_6',
          title: 'Concepts / Concept',
          description: 'Concept e requisiti',
          items: [
            {
              english: 'Concept',
              italian: 'Vincolo su template C++20 (concept)',
              pronunciation: '/ˈkɒnsept/',
              phonetic: 'KON-sept',
              example:
                'A concept constrains template parameters. = Un concept vincola i parametri template.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `template<class T>
concept Number = std::integral<T> || std::floating_point<T>;

void calc(Number auto x) { /* ... */ }`,
              note: 'Disponibile da C++20.',
              task: 'Definisci il concept Number<T> come std::integral<T> per accettare solo tipi interi nei template.',
            },
            {
              english: 'Requires Clause',
              italian: 'Clausola requires',
              pronunciation: '/rɪˈkwaɪərz/',
              phonetic: 'ri-KUAI-ers',
              example: `Constrain a template with a requires clause so only types exposing a size() method match the function overload. = Vincola un template con una requires clause così solo i tipi che espongono un metodo size() corrispondono all'overload.`,
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `template<class T>
    requires std::integral<T>
T double_it(T x) {
    return x * 2;
}`,
              task: 'Vincola un template con requires Number<T> dopo template<class T> per accettare solo i tipi che soddisfano il concept.',
            },
            {
              english: 'Requires Expression',
              italian: 'Espressione requires',
              pronunciation: '/ɪkˈspreʃən/',
              phonetic: 'eks-PRES-scion',
              example:
                "A requires expression checks operations. = Un'espressione requires controlla operazioni.",
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `template<class T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::same_as<T>;
};`,
              task: 'Costruisci una requires expression requires(T t) { t + t; } che verifica se t supporta la somma.',
            },
            {
              english: 'Constraint',
              italian: 'Vincolo',
              pronunciation: '/kənˈstreɪnt/',
              phonetic: 'kon-STREINT',
              example:
                'Attach a constraint to a template parameter so the compiler rejects unsupported types with a clear diagnostic instead of a deep error. = Aggiungi un constraint a un parametro di template così il compilatore rifiuta tipi non supportati con una diagnostica chiara.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
            {
              english: 'Auto Concept',
              italian: 'Concept con auto',
              pronunciation: '/ˈɔːtoʊ/',
              phonetic: 'OO-to',
              example:
                'Declare a parameter as std::integral auto so the function only accepts integer types and reads almost like English. = Dichiara un parametro come std::integral auto così la funzione accetta solo tipi interi e si legge quasi come inglese.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `void print(std::integral auto x) {
    std::cout << x;
}
print(42);  // OK
// print(3.14);  // error`,
              task: 'Dichiara f con parametro Number auto x usando la sintassi abbreviata del concept con auto.',
            },
            {
              english: 'Std Integral',
              italian: 'Concetto tipo intero (std::integral)',
              pronunciation: '/ˈɪntɪɡrəl/',
              phonetic: 'IN-te-gral',
              example:
                'Constrain an algorithm with std::integral when you want to forbid floating-point or pointer arguments at compile time. = Vincola un algoritmo con std::integral quando vuoi vietare argomenti in virgola mobile o puntatori a tempo di compilazione.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: 'template<std::integral T>',
              task: 'Vincola un template a soli tipi interi con template<std::integral T> sfruttando il concept della libreria standard.',
            },
            {
              english: 'Std Floating Point',
              italian: 'Concetto tipo virgola mobile (std::floating_point)',
              pronunciation: '/ˈfloʊtɪŋ/',
              phonetic: 'FLOU-ting',
              example:
                'Use std::floating_point to write a numeric helper that only compiles for float, double, and long double arguments. = Usa std::floating_point per scrivere un helper numerico che compila solo per argomenti float, double e long double.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
            {
              english: 'Std Convertible',
              italian: 'std::convertible_to',
              pronunciation: '/kənˈvɜːrtəbl/',
              phonetic: 'kon-VER-ta-bol',
              example:
                'std::convertible_to checks convertibility. = std::convertible_to verifica convertibilità.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
            {
              english: 'Concept Conjunction',
              italian: 'Congiunzione di concept',
              pronunciation: '/kənˈdʒʌŋkʃən/',
              phonetic: 'kon-GIUNK-scion',
              example:
                'Combine two concepts with && to form a concept conjunction that requires both interfaces from the candidate type. = Combina due concept con && per formare una concept conjunction che richiede entrambe le interfacce dal tipo candidato.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
            {
              english: 'Concept Disjunction',
              italian: 'Disgiunzione di concept',
              pronunciation: '/dɪsˈdʒʌŋkʃən/',
              phonetic: 'dis-GIUNK-scion',
              example:
                'Use a concept disjunction with || when an algorithm can work on either iterators or contiguous ranges interchangeably. = Usa una concept disjunction con || quando un algoritmo può lavorare indifferentemente su iteratori o range contigui.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_modern_cpp_7',
          title: 'Coroutines / Coroutine',
          description: 'Coroutine di C++20',
          items: [
            {
              english: 'Coroutine',
              italian: 'Funzione sospendibile C++20 (coroutine)',
              pronunciation: '/ˈkɒroʊtiːn/',
              phonetic: 'KO-ro-tiin',
              example:
                'A coroutine can be suspended and resumed. = Una coroutine può essere sospesa e ripresa.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              note: 'Disponibile da C++20.',
            },
            {
              english: 'Co Await',
              italian: 'Attesa di coroutine (co_await)',
              pronunciation: '/koʊ əˈweɪt/',
              phonetic: 'KO-a-UEIT',
              example:
                'Pause a coroutine with co_await while waiting for an async I/O result without blocking the underlying thread. = Sospendi una coroutine con co_await mentre aspetti un risultato di I/O asincrono senza bloccare il thread sottostante.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `Task<int> fetch_data() {
    auto result = co_await async_read();
    co_return result;
}`,
              task: 'Sospendi la coroutine attendendo il completamento di task con auto x = co_await task.',
            },
            {
              english: 'Co Yield',
              italian: 'Produzione di valore da coroutine (co_yield)',
              pronunciation: '/koʊ jiːld/',
              phonetic: 'KO-IIILD',
              example:
                'Stream values lazily from a generator coroutine by emitting each item with co_yield instead of building a full vector. = Trasmetti valori in modo lazy da una coroutine generatore emettendo ogni elemento con co_yield invece di costruire un vector intero.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `Generator<int> range(int n) {
    for (int i = 0; i < n; ++i)
        co_yield i;
}`,
              task: 'Produci il valore 42 dalla coroutine con co_yield 42 e sospendi finché il chiamante non riprende.',
            },
            {
              english: 'Co Return',
              italian: 'Ritorno da coroutine (co_return)',
              pronunciation: '/koʊ rɪˈtɜːrn/',
              phonetic: 'KO-ri-TERN',
              example:
                'End a task coroutine with co_return to deliver the final value back to the awaiting caller. = Termina una coroutine task con co_return per consegnare il valore finale al chiamante in attesa.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: 'co_return value;',
              task: `Termina la coroutine restituendo value al chiamante con l'istruzione co_return value.`,
            },
            {
              english: 'Promise Type',
              italian: 'Tipo promise',
              pronunciation: '/ˈprɒmɪs/',
              phonetic: 'PRO-mis',
              example:
                'Define a promise_type to customize how a coroutine is constructed, suspended, and how it produces its result. = Definisci un promise_type per personalizzare come una coroutine viene costruita, sospesa e come produce il suo risultato.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
            {
              english: 'Coroutine Handle',
              italian: 'Handle di coroutine',
              pronunciation: '/ˈhændl/',
              phonetic: 'HAN-dol',
              example:
                'A coroutine_handle controls a coroutine. = Un coroutine_handle controlla una coroutine.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: 'std::coroutine_handle<> h;',
              task: 'Dichiara uno std::coroutine_handle<> h come handle generico per controllare lo stato di una coroutine.',
            },
            {
              english: 'Generator',
              italian: 'Generatore',
              pronunciation: '/ˈdʒenəreɪtər/',
              phonetic: 'GE-ne-rei-tor',
              example:
                'Implement a lazy generator coroutine that yields each Fibonacci number on demand so the caller pulls only what it needs. = Implementa una coroutine generatore lazy che produce ogni numero di Fibonacci a richiesta così il chiamante preleva solo ciò che serve.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
            {
              english: 'Awaitable',
              italian: 'Oggetto attendibile (awaitable)',
              pronunciation: '/əˈweɪtəbl/',
              phonetic: 'a-UEI-ta-bol',
              example:
                'Wrap a network socket in an awaitable so calling code can simply co_await read() instead of registering callbacks. = Avvolgi un socket di rete in un awaitable così il codice chiamante può semplicemente co_await read() invece di registrare callback.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
            {
              english: 'Suspend Always',
              italian: 'Sospensione sempre (std::suspend_always)',
              pronunciation: '/səˈspend ˈɔːlweɪz/',
              phonetic: 'sa-SPEND OOL-ueiz',
              example:
                'Return std::suspend_always from initial_suspend to make a lazy generator that only runs work when the consumer pulls. = Ritorna std::suspend_always da initial_suspend per ottenere un generatore lazy che esegue lavoro solo quando il consumatore preleva.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
            {
              english: 'Suspend Never',
              italian: 'Sospensione mai (std::suspend_never)',
              pronunciation: '/səˈspend ˈnevər/',
              phonetic: 'sa-SPEND NE-ver',
              example:
                'Return std::suspend_never from initial_suspend when you want a coroutine that starts executing eagerly upon creation. = Ritorna std::suspend_never da initial_suspend quando vuoi una coroutine che inizia a eseguire subito alla creazione.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_modern_cpp_8',
          title: 'Modules & Format / Moduli e Format',
          description: 'Moduli e std::format',
          items: [
            {
              english: 'Module',
              italian: 'Modulo',
              pronunciation: '/ˈmɒdjuːl/',
              phonetic: 'MO-diul',
              example:
                'Migrate a heavy header full of templates to a C++20 module to slash include times and avoid macro leakage. = Migra un header pesante pieno di template a un modulo C++20 per tagliare i tempi di include ed evitare leakage di macro.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `export module math;
export int add(int a, int b) {
    return a + b;
}`,
              note: 'I moduli sostituiscono il vecchio modello a header negli stili moderni.',
              task: 'Dichiara un modulo C++20 con export module my_mod per sostituire il classico modello a header.',
            },
            {
              english: 'Export',
              italian: 'Esporta da modulo (export)',
              pronunciation: '/ˈekspɔːrt/',
              phonetic: 'EKS-port',
              example: `Mark only the public API of a module with export so internal helpers stay hidden from importers and link faster. = Marca solo l'API pubblica di un modulo con export così gli helper interni restano nascosti agli importatori e linkano più veloce.`,
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: 'export int add(int, int);',
              task: 'Esporta la dichiarazione di add dal modulo con export int add(int, int) per renderla visibile fuori.',
            },
            {
              english: 'Import',
              italian: 'Importa modulo (import)',
              pronunciation: '/ɪmˈpɔːrt/',
              phonetic: 'im-PORT',
              example:
                'Bring in a precompiled module with import std; to access the standard library without parsing thousands of header lines. = Includi un modulo precompilato con import std; per accedere alla libreria standard senza parsare migliaia di righe di header.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `import math;
int main() {
    return add(2, 3);
}`,
              task: 'Importa nel translation unit le entità esportate da my_mod scrivendo import my_mod.',
            },
            {
              english: 'Module Interface',
              italian: 'Interfaccia di modulo',
              pronunciation: '/ˈɪntərfeɪs/',
              phonetic: 'IN-ter-feis',
              example:
                'Place the module interface unit in a .ixx or .cppm file where you declare what gets exported to consumers. = Colloca la module interface unit in un file .ixx o .cppm dove dichiari cosa viene esportato ai consumatori.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
            {
              english: 'Module Implementation',
              italian: 'Implementazione di modulo',
              pronunciation: '/ˌɪmplɪmenˈteɪʃən/',
              phonetic: 'im-ple-men-TEI-scion',
              example:
                'Implementation files contain definitions. = I file di implementazione contengono le definizioni.',
              context: 'modern-cpp',
              difficulty: 'advanced',
            },
            {
              english: 'Std Format',
              italian: 'Formattazione di testo (std::format)',
              pronunciation: '/ˈfɔːrmæt/',
              phonetic: 'FOR-mat',
              example:
                'Build a log line with std::format using {} placeholders for type-safe substitution instead of printf-style risk. = Costruisci una riga di log con std::format usando placeholder {} per sostituzione type-safe invece del rischio stile printf.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `std::string name = "C++";
int ver = 23;
auto s = std::format("{} version {}", name, ver);`,
              task: 'Formatta una coppia chiave-valore con std::format("{} = {}", k, v) per produrre una stringa type-safe.',
            },
            {
              english: 'Std Print',
              italian: 'Stampa formattata (std::print)',
              pronunciation: '/prɪnt/',
              phonetic: 'PRINT',
              example:
                'Replace std::cout chains with std::print to emit formatted text in one call without manual stream manipulators. = Sostituisci catene di std::cout con std::print per emettere testo formattato in una sola chiamata senza manipolatori di stream manuali.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: 'std::print("hi {}\\n", name);',
              note: 'Disponibile da C++23.',
              task: 'Stampa su stdout il messaggio formattato "hi {}" sostituendo name tramite std::print di C++23.',
            },
            {
              english: 'Format Spec',
              italian: 'Specifica di format',
              pronunciation: '/ˈfɔːrmæt spek/',
              phonetic: 'FOR-mat SPEK',
              example:
                'Add a format spec like {:.2f} inside a std::format string to render a double with two decimal digits and fixed notation. = Aggiungi una format spec come {:.2f} dentro una stringa std::format per rendere un double con due cifre decimali e notazione fissa.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: 'std::format("{:.2f}", 3.14);',
              task: 'Formatta 3.14 con due cifre decimali usando la specifica di format {:.2f} dentro std::format.',
            },
            {
              english: 'Three Way Comparison',
              italian: 'Confronto a tre vie',
              pronunciation: '/θriː weɪ kəmˈpærɪsən/',
              phonetic: 'TRII-UEI kom-PA-ri-son',
              example:
                "The Version struct uses the three-way comparison operator<=> to let std::sort order releases from oldest to newest automatically. = La struct Version usa l'operatore di confronto a tre vie operator<=> per permettere a std::sort di ordinare le release dalla più vecchia alla più nuova automaticamente.",
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `struct Point {
    int x, y;
    auto operator<=>(const Point&) const = default;
};
// Point{1,2} < Point{1,3}  // true`,
              task: 'Genera tutti gli operatori di confronto della classe A dichiarando auto operator<=>(const A&) const = default.',
            },
            {
              english: 'Designated Initializer',
              italian: 'Inizializzatore designato',
              pronunciation: '/ˈdezɪɡneɪtɪd/',
              phonetic: 'DE-zig-nei-ted',
              example:
                'Initialize a Config struct with designated initializers like {.port=8080, .host="x"} so each field is self-documenting. = Inizializza una struct Config con designated initializer come {.port=8080, .host="x"} così ogni campo si auto-documenta.',
              context: 'modern-cpp',
              difficulty: 'advanced',
              code: `struct Config {
    int width = 800;
    int height = 600;
    bool fullscreen = false;
};
Config c{.width = 1920, .fullscreen = true};`,
              note: 'Disponibile da C++20.',
              task: 'Inizializza Point p con i designated initializer {.x = 1, .y = 2} per assegnare esplicitamente i campi.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 14 - TEMPLATE AVANZATI / ADVANCED TEMPLATES
    // ════════════════════════════════════════════════
    14: {
      name: 'Template Avanzati / Advanced Templates',
      description: 'Template variadici, SFINAE e tratti',
      lessons: [
        {
          id: 'cpp_templates_5',
          title: 'Variadic Templates / Template Variadici',
          description: 'Template a numero variabile di argomenti',
          items: [
            {
              english: 'Variadic Template',
              italian: 'Template variadico',
              pronunciation: '/ˌveəriˈædɪk/',
              phonetic: 'va-ri-A-dik',
              example:
                'A variadic template takes any number of arguments. = Un template variadico prende un numero qualsiasi di argomenti.',
              context: 'templates',
              difficulty: 'advanced',
              code: `template<class... Args>
void log(Args... args) {
    (std::cout << ... << args) << '\\n';
}`,
              task: 'Dichiara una funzione f come template variadico con template<class... Args> void f(Args...).',
            },
            {
              english: 'Parameter Pack',
              italian: 'Pack di parametri',
              pronunciation: '/pəˈræmɪtər pæk/',
              phonetic: 'pa-RA-mi-ter PAK',
              example:
                'Accept an arbitrary number of arguments in a template by declaring typename... Args as a parameter pack. = Accetta un numero arbitrario di argomenti in un template dichiarando typename... Args come parameter pack.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'template<class... Ts>',
              task: 'Introduci un parameter pack di tipi Ts con template<class... Ts> per accettare un numero arbitrario di tipi.',
            },
            {
              english: 'Pack Expansion',
              italian: 'Espansione di pack',
              pronunciation: '/ɪkˈspænʃən/',
              phonetic: 'eks-PAN-scion',
              example:
                'Forward a whole parameter pack into make_unique with std::forward<Args>(args)... to expand the pack inline. = Inoltra un intero parameter pack a make_unique con std::forward<Args>(args)... per espandere il pack inline.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'f(args...);',
              task: 'Espandi il pack args nella chiamata f(args...) inoltrando ogni elemento come argomento separato.',
            },
            {
              english: 'Sizeof Pack',
              italian: 'Sizeof su pack',
              pronunciation: '/ˈsaɪzɒv/',
              phonetic: 'SAI-zof',
              example:
                'Query the count of arguments at compile time with sizeof...(Args) to choose between optimized fast paths. = Interroga il numero di argomenti a tempo di compilazione con sizeof...(Args) per scegliere tra fast path ottimizzati.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'sizeof...(Args)',
              task: `Ottieni a tempo di compilazione il numero di elementi del pack Args con l'operatore sizeof...(Args).`,
            },
            {
              english: 'Fold Expression',
              italian: 'Espressione fold',
              pronunciation: '/foʊld/',
              phonetic: 'FOULD',
              example:
                'Sum a parameter pack in one line with the fold expression (args + ...) instead of writing a recursive helper. = Somma un parameter pack in una sola riga con la fold expression (args + ...) invece di scrivere un helper ricorsivo.',
              context: 'templates',
              difficulty: 'advanced',
              code: `template<class... Args>
auto sum(Args... args) {
    return (... + args);  // left fold
}
// sum(1, 2, 3) == 6`,
              note: 'Disponibile da C++17.',
              task: 'Somma tutti gli argomenti del pack args con la fold expression unaria (... + args).',
            },
            {
              english: 'Left Fold',
              italian: 'Fold sinistro',
              pronunciation: '/left foʊld/',
              phonetic: 'LEFT FOULD',
              example: `Use a left fold like (0 + ... + args) when accumulation order matters and you want associativity to bind from the left. = Usa un left fold come (0 + ... + args) quando l'ordine di accumulazione conta e vuoi associatività che lega da sinistra.`,
              context: 'templates',
              difficulty: 'advanced',
              code: '(... + args)',
              task: `Applica un left fold sull'operatore + scrivendo (... + args) per piegare il pack da sinistra a destra.`,
            },
            {
              english: 'Right Fold',
              italian: 'Fold destro',
              pronunciation: '/raɪt foʊld/',
              phonetic: 'RAIT FOULD',
              example: `Pick a right fold (args + ... + 0) for operations like exponentiation where right-associativity is the natural reading. = Scegli un right fold (args + ... + 0) per operazioni come l'esponenziazione dove l'associatività a destra è la lettura naturale.`,
              context: 'templates',
              difficulty: 'advanced',
              code: '(args + ...)',
              task: `Applica un right fold sull'operatore + scrivendo (args + ...) per piegare il pack da destra a sinistra.`,
            },
            {
              english: 'Recursive Variadic',
              italian: 'Variadica ricorsiva',
              pronunciation: '/rɪˈkɜːrsɪv/',
              phonetic: 'ri-KER-siv',
              example: `Before fold expressions existed, writers used recursive variadic templates with a base case to walk through each argument. = Prima dell'esistenza delle fold expression, gli sviluppatori usavano template variadici ricorsivi con un caso base per scorrere ogni argomento.`,
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'Tuple Get',
              italian: 'Accesso a elemento tuple (std::get)',
              pronunciation: '/ˈtuːpl ɡet/',
              phonetic: 'TUU-pol GHET',
              example:
                'Extract the second element of a tuple with std::get<1>(t) for compile-time indexed access without runtime overhead. = Estrai il secondo elemento di una tupla con std::get<1>(t) per accesso indicizzato a tempo di compilazione senza overhead runtime.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'std::get<0>(t);',
              task: `Accedi al primo elemento del tuple t con std::get<0>(t) usando l'indice noto a tempo di compilazione.`,
            },
            {
              english: 'Apply',
              italian: 'Chiama funzione con tupla (std::apply)',
              pronunciation: '/əˈplaɪ/',
              phonetic: 'a-PLAI',
              example:
                'std::apply unpacks a tuple to arguments. = std::apply estrae una tupla in argomenti.',
              context: 'templates',
              difficulty: 'advanced',
              code: `auto add = [](int a, int b) { return a + b; };
auto args = std::make_tuple(3, 4);
int result = std::apply(add, args);  // 7`,
              task: 'Chiama la funzione f passandole come argomenti i campi del tuple t tramite std::apply(f, t).',
            },
          ],
        },
        {
          id: 'cpp_templates_6',
          title: 'SFINAE & enable_if / SFINAE e enable_if',
          description: 'SFINAE per overload condizionale',
          items: [
            {
              english: 'SFINAE',
              italian: 'Il fallimento di sostituzione non è un errore (SFINAE)',
              pronunciation: '/ˈsfɪneɪ/',
              phonetic: 'SFI-NEI',
              example:
                'The serializer template relies on SFINAE to silently discard overloads for types that lack a to_string method. = Il template serializzatore si affida a SFINAE per scartare silenziosamente gli overload per tipi che non hanno un metodo to_string.',
              context: 'templates',
              difficulty: 'advanced',
              note: 'Substitution Failure Is Not An Error.',
            },
            {
              english: 'Enable If',
              italian: 'Abilitazione condizionale di template (enable_if)',
              pronunciation: '/ɪˈneɪbl ɪf/',
              phonetic: 'i-NEI-bol IF',
              example:
                'Restrict an overload to integer types using std::enable_if_t<std::is_integral_v<T>> as a SFINAE-style guard. = Restringi un overload ai tipi interi usando std::enable_if_t<std::is_integral_v<T>> come guardia in stile SFINAE.',
              context: 'templates',
              difficulty: 'advanced',
              code: `template<class T>
std::enable_if_t<std::is_integral_v<T>, T>
double_it(T val) {
    return val * 2;
}`,
              task: 'Vincola un template via SFINAE scrivendo std::enable_if_t<cond, T> per abilitarlo solo quando cond è vera.',
            },
            {
              english: 'Iterator Tag Dispatch',
              italian: 'Iterator tag dispatch',
              pronunciation: '/tæɡ ˈdɪspætʃ/',
              phonetic: 'TAG DIS-paci',
              example: `Picking a specialized algorithm via iterator tag dispatch passes iterator_category as an extra argument that drives overload resolution. = Scegliere un algoritmo specializzato tramite iterator tag dispatch passa iterator_category come argomento extra che guida l'overload.`,
              context: 'templates',
              difficulty: 'advanced',
              note: 'Tecnica per scegliere overload distinti a compile time tramite tipi sentinella.',
            },
            {
              english: 'Void T',
              italian: 'Tipo void condizionale (void_t)',
              pronunciation: '/vɔɪd tiː/',
              phonetic: 'VOID-TI',
              example:
                'Detect whether T has a nested type member by checking std::void_t<typename T::value_type> in a partial specialization. = Rileva se T ha un type member annidato controllando std::void_t<typename T::value_type> in una specializzazione parziale.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'std::void_t<decltype(t.foo())>',
              task: 'Rileva se T offre il metodo foo() con std::void_t<decltype(t.foo())> come trick di detection.',
            },
            {
              english: 'Detection Idiom',
              italian: 'Idioma di rilevamento',
              pronunciation: '/dɪˈtekʃən/',
              phonetic: 'di-TEK-scion',
              example: `Apply the detection idiom to query at compile time whether a class exposes a serialize() method before calling it. = Applica l'detection idiom per chiedere a tempo di compilazione se una classe espone un metodo serialize() prima di chiamarlo.`,
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'Concept Replacement',
              italian: 'Sostituzione con concept',
              pronunciation: '/rɪˈpleɪsmənt/',
              phonetic: 'ri-PLEIS-ment',
              example:
                'Rewrite an old enable_if heavy helper with a concept replacement so error messages mention the failing requirement directly. = Riscrivi un vecchio helper pieno di enable_if con un concept replacement così i messaggi di errore citano direttamente il requisito fallito.',
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'Substitution',
              italian: 'Sostituzione',
              pronunciation: '/ˌsʌbstɪˈtjuːʃən/',
              phonetic: 'sab-sti-TIU-scion',
              example:
                'Template substitution replaces parameters. = La sostituzione template rimpiazza i parametri.',
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'Template Constraint',
              italian: 'Vincolo di template',
              pronunciation: '/kənˈstreɪnt/',
              phonetic: 'kon-STREINT',
              example:
                'A template constraint limits valid types. = Un vincolo template limita i tipi validi.',
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'If Constexpr',
              italian: 'Branch a tempo di compilazione (if constexpr)',
              pronunciation: '/kɒnstˈekspər/',
              phonetic: 'kons-TEK-sper',
              example:
                'Branch at compile time with if constexpr to skip dereferencing pointers when T is not a pointer type. = Diramati a tempo di compilazione con if constexpr per saltare il dereferenziamento di puntatori quando T non è un tipo puntatore.',
              context: 'templates',
              difficulty: 'advanced',
              code: `template<class T>
std::string stringify(T val) {
    if constexpr (std::is_arithmetic_v<T>)
        return std::to_string(val);
    else
        return val;
}`,
              task: 'Seleziona un ramo a tempo di compilazione con if constexpr (cond) else evitando overhead a runtime.',
            },
            {
              english: 'Constraint Subsumption',
              italian: 'Sussunzione di vincoli',
              pronunciation: '/səbˈsʌmpʃən/',
              phonetic: 'sab-SAMP-scion',
              example:
                'Subsumption picks more specific concepts. = La sussunzione sceglie i concept più specifici.',
              context: 'templates',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_templates_7',
          title: 'Type Traits / Tratti di Tipo',
          description: 'Type traits e introspezione',
          items: [
            {
              english: 'Type Traits Library',
              italian: 'Libreria type traits',
              pronunciation: '/treɪts/',
              phonetic: 'TREITS',
              example:
                'Reaching for the type traits library like std::is_integral_v writes generic code that adapts behavior based on the deduced T at compile time. = Affidarsi alla libreria type traits come std::is_integral_v scrive codice generico che adatta il comportamento al T dedotto a tempo di compilazione.',
              context: 'templates',
              difficulty: 'advanced',
              code: '#include <type_traits>',
              note: 'Header <type_traits> raccoglie metafunzioni per introspezione di tipi.',
              task: 'Includi #include <type_traits> per accedere alle metafunzioni di introspezione di tipo della libreria standard.',
            },
            {
              english: 'Is Same',
              italian: 'Verifica uguaglianza di tipi (is_same)',
              pronunciation: '/ɪz seɪm/',
              phonetic: 'IZ-SEIM',
              example:
                'Static-assert that two deduced types match with static_assert(std::is_same_v<A, B>) to catch wiring bugs at compile time. = Static-asserisci che due tipi dedotti coincidano con static_assert(std::is_same_v<A, B>) per cogliere bug di cablaggio a compile time.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'std::is_same_v<int, T>',
              task: 'Verifica se T coincide con int usando std::is_same_v<int, T> a tempo di compilazione.',
            },
            {
              english: 'Is Pointer',
              italian: 'Verifica tipo puntatore (is_pointer)',
              pronunciation: '/ˈpɔɪntər/',
              phonetic: 'POIN-ter',
              example:
                'Branch a helper with std::is_pointer_v<T> so it dereferences pointer arguments but copies value arguments directly. = Diramati in un helper con std::is_pointer_v<T> così dereferenzia argomenti puntatore ma copia direttamente quelli a valore.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'std::is_pointer_v<T>',
              task: 'Controlla se T è un tipo puntatore con il type trait std::is_pointer_v<T>.',
            },
            {
              english: 'Remove Reference',
              italian: 'Rimozione del riferimento dal tipo (remove_reference)',
              pronunciation: '/rɪˈmuːv/',
              phonetic: 'ri-MUUV',
              example:
                'Strip & or && from a deduced type using std::remove_reference_t<T> before storing it inside a generic container. = Rimuovi & o && da un tipo dedotto usando std::remove_reference_t<T> prima di conservarlo in un container generico.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'std::remove_reference_t<T>',
              task: 'Ottieni il tipo T senza riferimento applicando il type trait std::remove_reference_t<T>.',
            },
            {
              english: 'Remove Const',
              italian: 'Rimozione della costanza dal tipo (remove_const)',
              pronunciation: '/rɪˈmuːv kɒnst/',
              phonetic: 'ri-MUUV KONST',
              example:
                'Drop const-ness with std::remove_const_t<T> when you must rebuild a mutable copy of a deduced template type. = Elimina la const-ness con std::remove_const_t<T> quando devi ricostruire una copia mutabile di un tipo template dedotto.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'std::remove_const_t<T>',
              task: 'Rimuovi il qualificatore const dal tipo T usando std::remove_const_t<T>.',
            },
            {
              english: 'Decay',
              italian: 'Decadimento dei tipi (std::decay)',
              pronunciation: '/dɪˈkeɪ/',
              phonetic: 'di-KEI',
              example:
                'std::decay applies array-to-pointer etc. = std::decay applica decadimenti vari.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'std::decay_t<T>',
              task: 'Applica std::decay_t<T> per ottenere il tipo "decayed" di T eliminando riferimenti, cv e array-to-pointer.',
            },
            {
              english: 'Conditional',
              italian: 'Scelta tipo condizionale (std::conditional)',
              pronunciation: '/kənˈdɪʃənl/',
              phonetic: 'kon-DI-scio-nal',
              example:
                'std::conditional picks one of two types. = std::conditional sceglie uno tra due tipi.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'std::conditional_t<b, T, U>',
              task: `Scegli a tempo di compilazione tra T e U in base a b usando l'alias std::conditional_t<b, T, U>.`,
            },
            {
              english: 'Common Type',
              italian: 'Tipo comune tra più tipi (common_type)',
              pronunciation: '/ˈkɒmən/',
              phonetic: 'KO-mon',
              example:
                'Use std::common_type_t<int, double> to pick the result type of arithmetic on heterogeneous numeric arguments. = Usa std::common_type_t<int, double> per scegliere il tipo risultato di aritmetica su argomenti numerici eterogenei.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'std::common_type_t<T, U>',
              task: 'Calcola il tipo comune fra T e U con std::common_type_t<T, U> per la promozione condivisa.',
            },
            {
              english: 'Integral Constant',
              italian: 'Costante integrale a tempo di compilazione (integral_constant)',
              pronunciation: '/ˈɪntɪɡrəl ˈkɒnstənt/',
              phonetic: 'IN-te-gral KONS-tant',
              example:
                'integral_constant wraps a compile-time value. = integral_constant incapsula un valore compile-time.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'std::integral_constant<int, 5>',
              task: 'Avvolgi la costante 5 in un tipo con std::integral_constant<int, 5> per trasportarla come tipo template.',
            },
            {
              english: 'True Type',
              italian: 'Tipo booleano vero a tempo di compilazione (true_type)',
              pronunciation: '/truː taɪp/',
              phonetic: 'TRUU-TAIP',
              example:
                'std::true_type is integral_constant<bool, true>. = std::true_type è integral_constant<bool, true>.',
              context: 'templates',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_templates_8',
          title: 'Constexpr & Compile Time / Constexpr',
          description: 'Programmazione a compile time',
          items: [
            {
              english: 'Constexpr Function',
              italian: 'Funzione constexpr',
              pronunciation: '/kɒnstˈekspər/',
              phonetic: 'kons-TEK-sper',
              example:
                'A constexpr function may run at compile time. = Una funzione constexpr può girare a compile time.',
              context: 'templates',
              difficulty: 'advanced',
              code: `constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}
static_assert(factorial(5) == 120);`,
              task: 'Definisci constexpr int sq(int x) che ritorna x*x e può essere valutata in contesti costanti.',
            },
            {
              english: 'Consteval',
              italian: 'Funzione obbligatoriamente costante (consteval)',
              pronunciation: '/kɒnstˈiːvəl/',
              phonetic: 'kons-TII-val',
              example:
                'Force evaluation at compile time by marking a hash helper consteval so any runtime call is a hard compiler error. = Forza la valutazione a tempo di compilazione marcando un helper di hash consteval così ogni chiamata runtime è un hard error del compilatore.',
              context: 'templates',
              difficulty: 'advanced',
              code: `consteval int compile_hash(const char* s) {
    int h = 0;
    while (*s) h = h * 31 + *s++;
    return h;
}
constexpr int h = compile_hash("key");`,
              note: 'Disponibile da C++20.',
              task: 'Marca la funzione f come consteval int f() in modo che venga sempre valutata a tempo di compilazione.',
            },
            {
              english: 'Constinit',
              italian: 'Inizializzazione costante (constinit)',
              pronunciation: '/kɒnstˈɪnɪt/',
              phonetic: 'kons-TI-nit',
              example:
                'Apply constinit to a global lookup table to guarantee it is initialized at compile time and avoid the static init fiasco. = Applica constinit a una tabella di lookup globale per garantire inizializzazione a compile time ed evitare lo static init fiasco.',
              context: 'templates',
              difficulty: 'advanced',
              code: 'constinit int x = 5;',
              task: `Forza l'inizializzazione costante della variabile globale x dichiarandola constinit int x = 5.`,
            },
            {
              english: 'Compile Time Computation',
              italian: 'Computazione a compile time',
              pronunciation: '/kəmˌpaɪˈleɪʃən/',
              phonetic: 'kom-pi-LEI-scion',
              example:
                'Compile-time computation has zero runtime cost. = La computazione compile-time ha costo zero a runtime.',
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'Constexpr Container',
              italian: 'Container constexpr',
              pronunciation: '/kənˈteɪnər/',
              phonetic: 'kon-TEI-ner',
              example:
                'Build a small std::array as a constexpr container so lookups can be folded into the binary as immediate values. = Costruisci un piccolo std::array come container constexpr così i lookup possono essere ripiegati nel binario come valori immediati.',
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'CRTP Static Polymorphism',
              italian: 'Polimorfismo statico tramite CRTP',
              pronunciation: '/ˌpɒlɪˈmɔːrfɪzəm/',
              phonetic: 'po-li-MOR-fi-zem',
              example: `Reaching for CRTP static polymorphism gives templates virtual-call performance without paying for the vtable indirection at every call site. = Affidarsi al polimorfismo statico tramite CRTP dà ai template prestazioni da virtual call senza pagare l'indirezione della vtable a ogni call site.`,
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'Compile Time Branching',
              italian: 'Ramificazione compile-time',
              pronunciation: '/ˈbræntʃɪŋ/',
              phonetic: 'BRAN-cing',
              example: `Replace runtime if/else hot paths with compile-time branching via if constexpr so the optimizer drops unused arms. = Sostituisci hot path runtime con if/else con branching a compile time tramite if constexpr così l'ottimizzatore elimina i rami inutilizzati.`,
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'Template Recursion',
              italian: 'Ricorsione di template',
              pronunciation: '/rɪˈkɜːrʒən/',
              phonetic: 'ri-KER-sion',
              example:
                'Compute factorials at compile time with template recursion that ends in a specialization for the base case 0. = Calcola fattoriali a tempo di compilazione con template recursion che termina in una specializzazione per il caso base 0.',
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'Binary Template Bloat',
              italian: 'Bloat del binario da template',
              pronunciation: '/bloʊt/',
              phonetic: 'BLOUT',
              example:
                'Big projects must watch for binary template bloat because each instantiation can balloon object files and slow down link times noticeably. = I progetti grandi devono badare al bloat del binario da template perché ogni istanziazione può gonfiare gli object file e rallentare i link time.',
              context: 'templates',
              difficulty: 'advanced',
            },
            {
              english: 'Compile Time Polymorphism',
              italian: 'Polimorfismo a compile time',
              pronunciation: '/kəmˌpaɪl taɪm/',
              phonetic: 'kom-PAIL TAIM',
              example:
                'Compile-time polymorphism uses templates. = Il polimorfismo compile-time usa i template.',
              context: 'templates',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 15 - CONCORRENZA / CONCURRENCY
    // ════════════════════════════════════════════════
    15: {
      name: 'Concorrenza / Concurrency',
      description: 'Thread, mutex e programmazione concorrente',
      lessons: [
        {
          id: 'cpp_concurrency_1',
          title: 'Threads / Thread',
          description: 'std::thread e gestione thread',
          items: [
            {
              english: 'Worker Thread',
              italian: 'Thread di lavoro',
              pronunciation: '/θred/',
              phonetic: 'TRED',
              example:
                'Spinning up a worker thread with std::thread t(do_work, payload) runs heavy computation in parallel with the UI loop without blocking it. = Avviare un thread di lavoro con std::thread t(do_work, payload) esegue calcolo pesante in parallelo con il loop UI senza bloccarlo.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `void work() { std::cout << "running"; }
std::thread t(work);
t.join();`,
              task: 'Avvia un thread di lavoro std::thread t passando la funzione work da eseguire in parallelo.',
            },
            {
              english: 'Join',
              italian: 'Attesa terminazione thread (join)',
              pronunciation: '/dʒɔɪn/',
              phonetic: 'GIOIN',
              example:
                'Call t.join() before the std::thread destructor to ensure the worker finished and avoid std::terminate from a live thread. = Chiama t.join() prima del distruttore di std::thread per assicurarti che il worker abbia finito ed evitare std::terminate per un thread vivo.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 't.join();',
              task: 'Attendi la terminazione del thread t chiamando t.join() prima che esca dallo scope.',
            },
            {
              english: 'Detach',
              italian: 'Scollega thread (detach)',
              pronunciation: '/dɪˈtætʃ/',
              phonetic: 'di-TACI',
              example:
                'Use t.detach() only for background tasks whose lifetime you do not need to synchronize, accepting they outlive main. = Usa t.detach() solo per task in background la cui durata non devi sincronizzare, accettando che sopravvivano a main.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 't.detach();',
              note: 'Sconsigliato, perdi il controllo.',
              task: 'Scollega il thread t dal proprietario chiamando t.detach() e lascialo eseguire in background.',
            },
            {
              english: 'Joinable',
              italian: 'Thread terminabile (joinable)',
              pronunciation: '/ˈdʒɔɪnəbl/',
              phonetic: 'GIOI-na-bol',
              example:
                'Check if (t.joinable()) before calling join to avoid invoking it on a thread that was already detached or moved-from. = Controlla if (t.joinable()) prima di chiamare join per evitare di invocarla su un thread già detached o spostato.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::thread t(work);
// ... do other things ...
if (t.joinable())
    t.join();`,
              task: `Verifica con t.joinable() che il thread sia ancora associato a un'esecuzione prima di chiamare t.join().`,
            },
            {
              english: 'Hardware Concurrency',
              italian: 'Concorrenza hardware',
              pronunciation: '/ˈhɑːrdweər/',
              phonetic: 'HARD-uer',
              example:
                'hardware_concurrency() returns CPU count. = hardware_concurrency() restituisce il numero di CPU.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'auto n = std::thread::hardware_concurrency();',
              task: `Ottieni il numero suggerito di thread paralleli supportati dall'hardware con std::thread::hardware_concurrency().`,
            },
            {
              english: 'Thread ID',
              italian: 'ID del thread',
              pronunciation: '/aɪ diː/',
              phonetic: 'AI-DI',
              example:
                'Print std::this_thread::get_id() inside a task to confirm two workers actually run on different OS-level threads. = Stampa std::this_thread::get_id() dentro un task per confermare che due worker eseguano davvero su thread di OS diversi.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'auto id = std::this_thread::get_id();',
              task: `Recupera l'identificatore univoco del thread corrente con std::this_thread::get_id().`,
            },
            {
              english: 'Sleep For',
              italian: 'Sleep per',
              pronunciation: '/sliːp fɔːr/',
              phonetic: 'SLIIP-FOR',
              example: `Pause a worker thread between retries with std::this_thread::sleep_for(500ms) so a flaky API gets time to recover. = Metti in pausa un thread worker tra i retry con std::this_thread::sleep_for(500ms) così un'API instabile ha tempo di recuperare.`,
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'std::this_thread::sleep_for(1s);',
              task: 'Sospendi il thread corrente per un secondo invocando std::this_thread::sleep_for(1s).',
            },
            {
              english: 'Yield',
              italian: 'Cede il time-slice (yield)',
              pronunciation: '/jiːld/',
              phonetic: 'IIILD',
              example: `Insert std::this_thread::yield() in a tight spin loop to politely hand the CPU back to the scheduler when no work is ready. = Inserisci std::this_thread::yield() in uno spin loop stretto per restituire educatamente la CPU allo scheduler quando non c'è lavoro pronto.`,
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'std::this_thread::yield();',
              task: 'Cedi volontariamente il time-slice del thread corrente allo scheduler chiamando std::this_thread::yield().',
            },
            {
              english: 'Jthread',
              italian: 'Thread auto-joinante (std::jthread)',
              pronunciation: '/ˈdʒeɪθred/',
              phonetic: 'GIEI-tred',
              example:
                'Prefer std::jthread over std::thread because it auto-joins on destruction and supports cooperative cancellation natively. = Preferisci std::jthread a std::thread perché si auto-joina in distruzione e supporta cancellazione cooperativa nativamente.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::jthread t([](std::stop_token st) {
    while (!st.stop_requested())
        do_work();
});
// auto-joins on destruction`,
              note: 'Disponibile da C++20.',
              task: 'Avvia uno std::jthread t passando work per ottenere un thread auto-joinante allo scope exit.',
            },
            {
              english: 'Stop Token',
              italian: 'Token di stop',
              pronunciation: '/stɒp ˈtoʊkən/',
              phonetic: 'STOP TO-ken',
              example:
                'Pass a std::stop_token into a jthread worker so it can poll stop_requested() and exit cleanly when asked. = Passa uno std::stop_token in un worker jthread così può interrogare stop_requested() e uscire pulitamente quando richiesto.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'std::stop_token st;',
              task: 'Dichiara uno std::stop_token st per supportare la richiesta cooperativa di stop in un jthread.',
            },
          ],
        },
        {
          id: 'cpp_concurrency_2',
          title: 'Mutex & Locks / Mutex e Lock',
          description: 'Sincronizzazione con mutex',
          items: [
            {
              english: 'Mutex',
              italian: 'Mutua esclusione (std::mutex)',
              pronunciation: '/ˈmjuːteks/',
              phonetic: 'MIU-teks',
              example:
                'Protect a shared counter with a std::mutex so two threads never witness a torn read or duplicated increment. = Proteggi un contatore condiviso con uno std::mutex così due thread non vedano mai una lettura strappata o un incremento duplicato.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::mutex mtx;
int shared_data = 0;
void inc() {
    std::lock_guard lk(mtx);
    ++shared_data;
}`,
              task: 'Dichiara uno std::mutex m da usare come primitiva di mutua esclusione fra thread.',
            },
            {
              english: 'Scoped Lock Guard',
              italian: 'std::scoped_lock',
              pronunciation: '/lɒk ɡɑːrd/',
              phonetic: 'LOK GARD',
              example: `Switching to a scoped lock guard like std::scoped_lock locks multiple mutexes atomically and releases them in reverse order at scope exit. = Passare a un scoped lock guard come std::scoped_lock blocca più mutex atomicamente e li rilascia in ordine inverso all'uscita dallo scope.`,
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'std::lock_guard lk(m);',
              note: 'RAII pattern.',
              task: 'Proteggi la sezione critica acquisendo il mutex m con std::lock_guard lk in stile RAII.',
            },
            {
              english: 'Unique Lock',
              italian: 'Lock RAII flessibile (std::unique_lock)',
              pronunciation: '/juːˈniːk lɒk/',
              phonetic: 'iu-NIIK LOK',
              example:
                'Choose std::unique_lock over lock_guard when you need to unlock and relock around an expensive non-shared computation. = Scegli std::unique_lock invece di lock_guard quando devi sbloccare e riloccare attorno a un calcolo costoso non condiviso.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'std::unique_lock lk(m);',
              task: 'Acquisisci m con std::unique_lock lk per ottenere un lock RAII flessibile, che supporta rilascio e re-lock.',
            },
            {
              english: 'Scoped Lock',
              italian: 'Lock multi-mutex deadlock-free (std::scoped_lock)',
              pronunciation: '/skoʊpt lɒk/',
              phonetic: 'SKOUPT LOK',
              example:
                'std::scoped_lock locks multiple mutexes. = std::scoped_lock blocca più mutex.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::mutex m1, m2;
{
    std::scoped_lock lk(m1, m2);  // deadlock-free
    // access both resources safely
}`,
              note: 'Disponibile da C++17.',
              task: 'Blocca contemporaneamente m1 e m2 senza deadlock con std::scoped_lock lk(m1, m2).',
            },
            {
              english: 'Recursive Mutex',
              italian: 'Mutex ricorsivo',
              pronunciation: '/rɪˈkɜːrsɪv/',
              phonetic: 'ri-KER-siv',
              example:
                'recursive_mutex allows multi-lock by same thread. = recursive_mutex permette lock multipli dello stesso thread.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'std::recursive_mutex m;',
              note: 'Spesso indica un design da rivedere.',
              task: 'Dichiara uno std::recursive_mutex m per consentire allo stesso thread di acquisirlo più volte.',
            },
            {
              english: 'Shared Mutex',
              italian: 'Mutex condiviso',
              pronunciation: '/ʃeərd/',
              phonetic: 'SCERD',
              example:
                'shared_mutex allows readers-writer locks. = shared_mutex permette lock readers-writer.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::shared_mutex sm;
void reader() {
    std::shared_lock lk(sm);  // many readers OK
}
void writer() {
    std::unique_lock lk(sm);  // exclusive
}`,
              task: 'Dichiara uno std::shared_mutex m per supportare letture multiple condivise e scritture esclusive.',
            },
            {
              english: 'Try Lock',
              italian: 'Tentativo di lock non bloccante (try_lock)',
              pronunciation: '/traɪ lɒk/',
              phonetic: 'TRAI LOK',
              example:
                'try_lock returns immediately on failure. = try_lock ritorna subito in caso di fallimento.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::mutex m;
if (m.try_lock()) {
    // got the lock, do work
    m.unlock();
} else {
    // lock busy, try later
}`,
              task: 'Tenta di acquisire m senza bloccarti con if (m.try_lock()) e procedi solo se il lock è disponibile.',
            },
            {
              english: 'Deadlock',
              italian: 'Stallo da lock circolari (deadlock)',
              pronunciation: '/ˈdedlɒk/',
              phonetic: 'DED-lok',
              example:
                'Avoid a deadlock by always acquiring mutexes in the same global order or by using std::scoped_lock to lock multiple at once. = Evita un deadlock acquisendo sempre i mutex nello stesso ordine globale o usando std::scoped_lock per loccare più mutex insieme.',
              context: 'concurrency',
              difficulty: 'advanced',
              note: 'Causato da ordine inconsistente di acquisizione lock.',
            },
            {
              english: 'Lock Free',
              italian: 'Senza blocco (lock-free)',
              pronunciation: '/lɒk friː/',
              phonetic: 'LOK-FRII',
              example: `Design a lock-free queue with std::atomic pointers when reducing contention matters more than implementation simplicity. = Progetta una coda lock-free con puntatori std::atomic quando ridurre la contesa conta più della semplicità d'implementazione.`,
              context: 'concurrency',
              difficulty: 'advanced',
            },
            {
              english: 'Critical Section',
              italian: 'Sezione critica',
              pronunciation: '/ˈkrɪtɪkl ˈsekʃən/',
              phonetic: 'KRI-ti-kol SEK-scion',
              example:
                'A critical section protects shared resources. = Una sezione critica protegge risorse condivise.',
              context: 'concurrency',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_concurrency_3',
          title: 'Atomic & Memory Order / Atomic e Ordine Memoria',
          description: 'Operazioni atomiche e memory model',
          items: [
            {
              english: 'Atomic Memory Operation',
              italian: 'Operazione atomica di memoria (std::atomic)',
              pronunciation: '/əˈtɒmɪk/',
              phonetic: 'a-TO-mik',
              example: `An atomic memory operation on a shared counter lets multiple threads increment it without a mutex while still avoiding torn reads. = Un'operazione atomica di memoria su un contatore condiviso permette a piu' thread di incrementarlo senza un mutex evitando comunque letture rotte.`,
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'std::atomic<int> n{0};',
              note: `Rinominato per distinguerlo dall'item 'Atomic' come tipo std::atomic in cpp_modern_cpp_4.`,
              task: 'Dichiara uno std::atomic<int> n inizializzato a 0 per supportare letture e scritture atomiche concorrenti.',
            },
            {
              english: 'Atomic Flag',
              italian: 'Flag atomico',
              pronunciation: '/flæɡ/',
              phonetic: 'FLAG',
              example:
                "std::atomic_flag is the simplest atomic. = std::atomic_flag è l'atomico più semplice.",
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::atomic_flag lock = ATOMIC_FLAG_INIT;
while (lock.test_and_set())  // spinlock
    ;  // busy wait
lock.clear();  // release`,
              task: 'Dichiara uno std::atomic_flag f come flag lock-free per implementare uno spinlock minimale.',
            },
            {
              english: 'Compare Exchange',
              italian: 'Scambio atomico condizionato (compare_exchange)',
              pronunciation: '/kəmˈpeər ɪksˈtʃeɪndʒ/',
              phonetic: 'kom-PER eks-CEINGE',
              example:
                'Implement a CAS retry loop with compare_exchange_weak to update a shared head pointer without taking any mutex. = Implementa un retry loop CAS con compare_exchange_weak per aggiornare un puntatore head condiviso senza prendere alcun mutex.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::atomic<int> val{5};
int expected = 5;
bool ok = val.compare_exchange_strong(expected, 10);
// if val==5, set to 10 and return true`,
              task: 'Aggiorna n da exp a val in modo atomico chiamando n.compare_exchange_strong(exp, val).',
            },
            {
              english: 'Memory Order',
              italian: 'Ordine di memoria',
              pronunciation: '/ˈmemri ˈɔːrdər/',
              phonetic: 'MEM-ri OR-der',
              example:
                'Pick the weakest memory order that still guarantees correctness so the compiler and CPU can reorder for maximum throughput. = Scegli il memory order più debole che garantisca ancora correttezza così compilatore e CPU possono riordinare per il massimo throughput.',
              context: 'concurrency',
              difficulty: 'advanced',
            },
            {
              english: 'Memory Order Relaxed',
              italian: 'Ordine relaxed',
              pronunciation: '/rɪˈlækst/',
              phonetic: 'ri-LAKST',
              example: `Use memory_order_relaxed for a simple stats counter where only atomicity matters and no other reads need to be ordered. = Usa memory_order_relaxed per un semplice contatore di statistiche dove conta solo l'atomicità e nessun'altra lettura va ordinata.`,
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'n.load(std::memory_order_relaxed);',
              task: 'Leggi n senza vincoli di sincronizzazione con n.load(std::memory_order_relaxed) per ottenere massima permissività.',
            },
            {
              english: 'Memory Order Acquire',
              italian: 'Ordine acquire',
              pronunciation: '/əˈkwaɪər/',
              phonetic: 'a-KUAI-er',
              example:
                'memory_order_acquire prevents reorder above. = memory_order_acquire impedisce riordini sopra.',
              context: 'concurrency',
              difficulty: 'advanced',
            },
            {
              english: 'Memory Order Release',
              italian: 'Ordine release',
              pronunciation: '/rɪˈliːs/',
              phonetic: 'ri-LIIS',
              example:
                'memory_order_release prevents reorder below. = memory_order_release impedisce riordini sotto.',
              context: 'concurrency',
              difficulty: 'advanced',
            },
            {
              english: 'Sequential Consistency',
              italian: 'Consistenza sequenziale',
              pronunciation: '/sɪˈkwenʃəl/',
              phonetic: 'si-KUEN-scial',
              example:
                'Default to sequential consistency on atomics until profiling proves that weaker orders deliver a measurable speedup. = Usa di default la sequential consistency sugli atomic finché un profiling non dimostra che ordini più deboli portano uno speedup misurabile.',
              context: 'concurrency',
              difficulty: 'advanced',
              note: 'Default per std::atomic. Più lento ma più sicuro.',
            },
            {
              english: 'Memory Fence',
              italian: 'Barriera di memoria',
              pronunciation: '/fens/',
              phonetic: 'FENS',
              example: `Insert std::atomic_thread_fence as a standalone memory fence between two independent atomic operations when ordering matters. = Inserisci std::atomic_thread_fence come memory fence isolata tra due operazioni atomiche indipendenti quando l'ordinamento conta.`,
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'std::atomic_thread_fence(std::memory_order_acquire);',
              task: 'Inserisci una barriera acquire con std::atomic_thread_fence(std::memory_order_acquire) per ordinare le letture successive.',
            },
            {
              english: 'Data Race',
              italian: 'Corsa critica sui dati (data race)',
              pronunciation: '/ˈdeɪtə reɪs/',
              phonetic: 'DEI-ta REIS',
              example:
                'Treat any unsynchronized concurrent access to non-atomic data as a data race; the standard says the resulting program is UB. = Tratta ogni accesso concorrente non sincronizzato a dati non atomici come un data race; lo standard dice che il programma risultante è UB.',
              context: 'concurrency',
              difficulty: 'advanced',
              note: 'Accesso non sincronizzato in cui almeno uno scrive.',
            },
          ],
        },
        {
          id: 'cpp_concurrency_4',
          title: 'Future & Async / Future e Async',
          description: 'Future, promise e task asincroni',
          items: [
            {
              english: 'Future',
              italian: 'Risultato asincrono (std::future)',
              pronunciation: '/ˈfjuːtʃər/',
              phonetic: 'FIU-cer',
              example:
                'Kick off an HTTP fetch and hold an std::future to retrieve the response body once the background worker finishes. = Lancia una fetch HTTP e mantieni uno std::future per recuperare il corpo della risposta quando il worker in background finisce.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `auto fut = std::async(std::launch::async, [] {
    return 42;
});
int result = fut.get();  // blocks until ready`,
              task: 'Ottieni uno std::future<int> f lanciando work in modo asincrono con std::async.',
            },
            {
              english: 'Promise',
              italian: 'Produttore di future (std::promise)',
              pronunciation: '/ˈprɒmɪs/',
              phonetic: 'PRO-mis',
              example:
                'Use std::promise on the producer side to push a computed value into the shared state that the future will later read. = Usa std::promise dal lato produttore per spingere un valore calcolato nello stato condiviso che la future leggerà dopo.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::promise<int> prom;
std::future<int> fut = prom.get_future();
std::thread t([&]{ prom.set_value(42); });
int val = fut.get();  // 42
t.join();`,
              task: 'Dichiara uno std::promise<int> p per produrre da un thread il valore consumato altrove da un future.',
            },
            {
              english: 'Async',
              italian: 'Lancio asincrono (std::async)',
              pronunciation: '/əˈsɪŋk/',
              phonetic: 'a-SINK',
              example:
                'std::async runs a function asynchronously. = std::async esegue una funzione asincrono.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'auto f = std::async(work);',
              task: 'Lancia work in modo asincrono ottenendo un future con auto f = std::async(work).',
            },
            {
              english: 'Get Future Value',
              italian: 'Ottenere valore future',
              pronunciation: '/ɡet/',
              phonetic: 'GHET',
              example:
                'Call f.get() to retrieve the future value and block the caller until the producer either fulfills the promise or throws. = Chiama f.get() per ottenere il valore della future e bloccare il chiamante finché il produttore non soddisfa la promise o solleva.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'int v = f.get();',
              task: 'Recupera il risultato del future f bloccandoti se necessario con int v = f.get().',
            },
            {
              english: 'Wait For',
              italian: 'Attesa con timeout (wait_for)',
              pronunciation: '/weɪt fɔːr/',
              phonetic: 'UEIT FOR',
              example:
                'Call f.wait_for(100ms) to wait at most 100 milliseconds and decide whether to retry or surface a timeout error. = Chiama f.wait_for(100ms) per aspettare al massimo 100 millisecondi e decidere se riprovare o sollevare un errore di timeout.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'auto status = f.wait_for(1s);',
              task: 'Attendi al massimo un secondo il completamento di f con auto status = f.wait_for(1s).',
            },
            {
              english: 'Packaged Task',
              italian: 'Task con future associata (std::packaged_task)',
              pronunciation: '/ˈpækɪdʒd tæsk/',
              phonetic: 'PA-kegd TASK',
              example:
                'Wrap a callable in std::packaged_task to bundle the function and its result future, ready to hand off to a thread pool. = Avvolgi un callable in std::packaged_task per impacchettare la funzione e la sua future risultato, pronto per essere passato a un thread pool.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::packaged_task<int(int)> task([](int x){ return x*x; });
auto fut = task.get_future();
std::thread t(std::move(task), 5);
int result = fut.get();  // 25
t.join();`,
              task: 'Avvolgi work in uno std::packaged_task<int(int)> task per ottenere un callable con future associata.',
            },
            {
              english: 'Shared Future',
              italian: 'Future condivisibile (std::shared_future)',
              pronunciation: '/ʃeərd/',
              phonetic: 'SCERD',
              example:
                'Convert a future to std::shared_future when multiple consumers must each call get() on the same asynchronous result. = Converti una future in std::shared_future quando più consumatori devono ciascuno chiamare get() sullo stesso risultato asincrono.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'std::shared_future<int> sf = f.share();',
              task: 'Converti il future f in std::shared_future<int> sf con f.share() per consentire più consumer.',
            },
            {
              english: 'Condition Variable',
              italian: 'Variabile di condizione',
              pronunciation: '/kənˈdɪʃən/',
              phonetic: 'kon-DI-scion',
              example:
                'std::condition_variable signals threads. = std::condition_variable segnala i thread.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::condition_variable cv;
std::mutex m;
bool ready = false;
// producer:
{ std::lock_guard lk(m); ready = true; }
cv.notify_one();`,
              task: 'Risveglia un solo thread in attesa sulla condition variable cv chiamando cv.notify_one().',
            },
            {
              english: 'Notify All',
              italian: 'Risveglia tutti gli attesi (notify_all)',
              pronunciation: '/ˈnoʊtɪfaɪ ɔːl/',
              phonetic: 'NO-ti-fai OOL',
              example:
                'Signal cv.notify_all() after publishing a stop flag so every consumer waiting on the condition variable wakes up at once. = Segnala cv.notify_all() dopo aver pubblicato un flag di stop così ogni consumer in attesa sulla condition variable si risveglia in una volta.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: 'cv.notify_all();',
              task: 'Risveglia tutti i thread in attesa sulla condition variable cv invocando cv.notify_all().',
            },
            {
              english: 'Wait Predicate',
              italian: 'Wait con predicato',
              pronunciation: '/ˈpredɪkət/',
              phonetic: 'PRE-di-ket',
              example:
                'wait with predicate avoids spurious wakes. = wait con predicato evita risvegli spuri.',
              context: 'concurrency',
              difficulty: 'advanced',
              code: `std::unique_lock lk(m);
cv.wait(lk, []{ return ready; });
// wakes only when ready == true`,
              task: 'Attendi sulla cv con cv.wait(lk, []{return ready;}) per gestire automaticamente i spurious wakeup.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 16 - SEMANTICA DEL MOVE / MOVE SEMANTICS
    // ════════════════════════════════════════════════
    16: {
      name: 'Semantica del Move / Move Semantics',
      description: 'Approfondimento di move e perfect forwarding',
      lessons: [
        {
          id: 'cpp_memory_5',
          title: 'Move Deep / Move in Profondità',
          description: 'Implementare move correttamente',
          items: [
            {
              english: 'Move Constructor Impl',
              italian: 'Implementazione di move ctor',
              pronunciation: '/muːv kənˈstrʌktər/',
              phonetic: 'MUUV kon-STRAK-tor',
              example: `Write a move constructor implementation that steals the raw buffer pointer and resets the source to a valid empty state. = Scrivi un'implementazione di move constructor che ruba il puntatore al buffer raw e ripristina la sorgente a uno stato valido vuoto.`,
              context: 'memory',
              difficulty: 'advanced',
              code: `struct Buffer {
    int* data;
    size_t sz;
    Buffer(Buffer&& o) noexcept
        : data(o.data), sz(o.sz) {
        o.data = nullptr; o.sz = 0;
    }
};`,
              task: `Scrivi il move constructor di una classe A che ruba il puntatore data dall'oggetto sorgente e lo resetta a nullptr.`,
            },
            {
              english: 'Resource Steal',
              italian: 'Rubare risorsa',
              pronunciation: '/ˈriːsɔːrs stiːl/',
              phonetic: 'RI-sors STIIL',
              example: `A move operation performs a resource steal: ownership of the heap allocation transfers to the new object instead of duplicating it. = Un'operazione di move esegue un resource steal: la ownership dell'allocazione su heap viene trasferita al nuovo oggetto invece di duplicarla.`,
              context: 'memory',
              difficulty: 'advanced',
              note: 'Non copia, trasferisce ownership.',
            },
            {
              english: 'Empty Source',
              italian: 'Sorgente svuotata',
              pronunciation: '/ˈempti sɔːrs/',
              phonetic: 'EMP-ti SORS',
              example: `After a move you leave the empty source in a destructible but unspecified state, typically with null pointers and zero size. = Dopo un move lasci l'empty source in uno stato distruttibile ma non specificato, tipicamente con puntatori null e size zero.`,
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Noexcept Move',
              italian: 'Move noexcept',
              pronunciation: '/ˌnoʊɪkˈsept/',
              phonetic: 'no-ek-SEPT',
              example:
                'Mark a move constructor noexcept so std::vector chooses to move rather than copy elements during reallocations. = Marca un move constructor noexcept così std::vector sceglie di spostare invece di copiare gli elementi durante le riallocazioni.',
              context: 'memory',
              difficulty: 'advanced',
              code: 'A(A&&) noexcept = default;',
              note: 'Permette al compilatore di scegliere move su copy.',
              task: 'Marca il move constructor di A come noexcept = default così std::vector lo preferisce alla copia durante le riallocazioni.',
            },
            {
              english: 'Move And Swap',
              italian: 'Idioma move-assignment (move-and-swap)',
              pronunciation: '/muːv ænd swɒp/',
              phonetic: 'MUUV-AND-SUOP',
              example: `Implement assignment with the move-and-swap idiom by taking the right-hand side by value and swapping internals, freeing the old data. = Implementa l'assignment con l'idioma move-and-swap prendendo il right-hand side per valore e swappando gli interni, liberando i vecchi dati.`,
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'RVO',
              italian: 'Ottimizzazione del valore di ritorno (RVO)',
              pronunciation: '/ɑːr viː oʊ/',
              phonetic: 'AR-VI-O',
              example:
                "The compiler applies RVO to the factory function, constructing the Widget directly in the caller's memory without any copy. = Il compilatore applica RVO alla funzione factory, costruendo il Widget direttamente nella memoria del chiamante senza alcuna copia.",
              context: 'memory',
              difficulty: 'advanced',
              note: 'Return Value Optimization.',
            },
            {
              english: 'NRVO',
              italian: 'Ottimizzazione del valore di ritorno con nome (NRVO)',
              pronunciation: '/en ɑːr viː oʊ/',
              phonetic: 'EN-AR-VI-O',
              example:
                'When a function declares a local Widget result and returns it by name, the compiler can apply NRVO to eliminate the copy. = Quando una funzione dichiara un Widget locale e lo restituisce per nome, il compilatore può applicare NRVO per eliminare la copia.',
              context: 'memory',
              difficulty: 'advanced',
              note: 'Named RVO.',
            },
            {
              english: 'Copy Elision',
              italian: 'Elisione di copia',
              pronunciation: '/ɪˈlɪʒən/',
              phonetic: 'i-LI-zion',
              example:
                'Rely on guaranteed copy elision when returning a local object by value so no temporary is ever constructed or destroyed. = Affidati alla copy elision garantita quando ritorni un oggetto locale per valore così nessun temporary viene mai costruito o distrutto.',
              context: 'memory',
              difficulty: 'advanced',
              note: 'Garantita in C++17 in molti casi.',
            },
            {
              english: 'Move Iterator',
              italian: 'Iteratore move',
              pronunciation: '/ˈɪtəreɪtər/',
              phonetic: 'I-te-rei-tor',
              example:
                'Wrap iterators with std::make_move_iterator to turn a copy-based algorithm like std::copy into a move-based transfer. = Avvolgi gli iteratori con std::make_move_iterator per trasformare un algoritmo basato su copia come std::copy in un trasferimento basato su move.',
              context: 'memory',
              difficulty: 'advanced',
              code: `std::vector<std::string> src = {"a", "b", "c"};
std::vector<std::string> dst(
    std::make_move_iterator(src.begin()),
    std::make_move_iterator(src.end()));`,
              task: 'Avvolgi un iteratore in std::move_iterator per trasformare un std::copy in un trasferimento basato su move.',
            },
            {
              english: 'Self Move',
              italian: 'Auto-move',
              pronunciation: '/self muːv/',
              phonetic: 'SELF MUUV',
              example:
                'Guard against a self-move in operator= by checking if (this != &other) so you do not destroy your own state. = Difenditi da un self-move in operator= controllando if (this != &other) così non distruggi il tuo stesso stato.',
              context: 'memory',
              difficulty: 'advanced',
              code: `Buffer& operator=(Buffer&& other) noexcept {
    if (this == &other) return *this;
    delete[] data;
    data = other.data;
    other.data = nullptr;
    return *this;
}`,
              task: 'Inserisci la guardia if (this == &other) return *this; in operator= per difenderti da un self-move che distruggerebbe lo stato.',
            },
          ],
        },
        {
          id: 'cpp_memory_6',
          title: 'Perfect Forwarding / Forwarding Perfetto',
          description: 'Universal references e std::forward',
          items: [
            {
              english: 'Universal Reference',
              italian: 'Riferimento universale',
              pronunciation: '/ˌjuːnɪˈvɜːrsəl/',
              phonetic: 'iu-ni-VER-sal',
              example:
                'A universal reference is T&& with deduction. = Un riferimento universale è T&& con deduzione.',
              context: 'memory',
              difficulty: 'advanced',
              code: `template<class T>
void wrapper(T&& arg) {
    process(std::forward<T>(arg));
}
// binds to both lvalues and rvalues`,
              note: 'Detto anche forwarding reference.',
              task: 'Dichiara una template<class T> void f(T&& x); per ottenere un riferimento universale che deduce lvalue o rvalue.',
            },
            {
              english: 'Forwarding Reference',
              italian: 'Riferimento di forwarding',
              pronunciation: '/ˈfɔːrwərdɪŋ/',
              phonetic: 'FOR-uor-ding',
              example:
                'A forwarding reference preserves value category. = Un forwarding reference preserva la categoria di valore.',
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Std Forward',
              italian: 'Inoltro perfetto (std::forward)',
              pronunciation: '/ˈfɔːrwərd/',
              phonetic: 'FOR-uord',
              example:
                'Forward a template parameter as the exact same value category with std::forward<T>(arg) inside a perfect-forwarding wrapper. = Inoltra un parametro template con la stessa value category usando std::forward<T>(arg) dentro un wrapper di perfect forwarding.',
              context: 'memory',
              difficulty: 'advanced',
              code: 'std::forward<T>(arg);',
              task: 'Inoltra il parametro arg con std::forward<T>(arg) dentro un wrapper per preservare la value category originale.',
            },
            {
              english: 'Reference Collapsing',
              italian: 'Collasso dei riferimenti',
              pronunciation: '/kəˈlæpsɪŋ/',
              phonetic: 'kol-LAP-sing',
              example:
                'Thanks to reference collapsing, T&& becomes a forwarding reference that binds to lvalues and rvalues depending on the deduced T. = Grazie al reference collapsing, T&& diventa un forwarding reference che si lega a lvalue e rvalue a seconda del T dedotto.',
              context: 'memory',
              difficulty: 'advanced',
              note: 'T& & = T&, T&& && = T&&.',
            },
            {
              english: 'Perfect Forwarding',
              italian: 'Forwarding perfetto',
              pronunciation: '/ˈpɜːrfɪkt/',
              phonetic: 'PER-fikt',
              example: `A factory that calls make_unique<T>(std::forward<Args>(args)...) uses perfect forwarding to preserve every argument's value category. = Una factory che chiama make_unique<T>(std::forward<Args>(args)...) usa il perfect forwarding per preservare la value category di ogni argomento.`,
              context: 'memory',
              difficulty: 'advanced',
              code: `template<class... Args>
auto make_widget(Args&&... args) {
    return Widget(std::forward<Args>(args)...);
}`,
              task: 'Implementa template<class T> void f(T&& a) { g(std::forward<T>(a)); } per ottenere perfect forwarding verso g.',
            },
            {
              english: 'Make Unique Forwarding',
              italian: 'Make unique con forwarding',
              pronunciation: '/meɪk juːˈniːk/',
              phonetic: 'MEIK iu-NIIK',
              example:
                'make_unique perfectly forwards arguments. = make_unique fa forwarding perfetto degli argomenti.',
              context: 'memory',
              difficulty: 'advanced',
              code: 'std::make_unique<Foo>(args...);',
              task: 'Costruisci uno std::unique_ptr<Foo> con std::make_unique<Foo>(args...) sfruttando il forwarding perfetto degli argomenti.',
            },
            {
              english: 'Emplace Forwarding',
              italian: 'Emplace con forwarding',
              pronunciation: '/ɪmˈpleɪs/',
              phonetic: 'em-PLEIS',
              example: `Vector::emplace_back relies on emplace forwarding to construct the element in place from the original constructor arguments. = Vector::emplace_back si basa sull'emplace forwarding per costruire l'elemento in loco a partire dagli argomenti originali del costruttore.`,
              context: 'memory',
              difficulty: 'advanced',
              code: `std::vector<std::pair<int, std::string>> v;
v.emplace_back(1, "hello");  // constructs in-place
// no temporary pair created`,
              task: 'Inserisci un elemento in un std::vector con v.emplace_back(args...) per costruirlo in loco senza copie temporanee.',
            },
            {
              english: 'Forwarding Constructor',
              italian: 'Costruttore di forwarding',
              pronunciation: '/kənˈstrʌktər/',
              phonetic: 'kon-STRAK-tor',
              example:
                'Write a forwarding constructor templated on Args&&... when a class must initialize a member from any compatible argument list. = Scrivi un forwarding constructor templato su Args&&... quando una classe deve inizializzare un membro da qualunque lista compatibile di argomenti.',
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Argument Deduction',
              italian: 'Deduzione argomenti',
              pronunciation: '/dɪˈdʌkʃən/',
              phonetic: 'di-DAK-scion',
              example: `Template argument deduction picks T as the reference type for an lvalue and as the bare type for an rvalue passed to a T&& parameter. = L'argument deduction dei template sceglie T come tipo riferimento per un lvalue e come tipo nudo per un rvalue passato a un parametro T&&.`,
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Move If Noexcept',
              italian: 'Move solo se non lancia (move_if_noexcept)',
              pronunciation: '/muːv ɪf/',
              phonetic: 'MUUV-IF',
              example:
                'std::move_if_noexcept moves only if safe. = std::move_if_noexcept sposta solo se sicuro.',
              context: 'memory',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_memory_7',
          title: 'Move Pitfalls / Insidie del Move',
          description: 'Errori comuni con il move',
          items: [
            {
              english: 'Use After Move',
              italian: 'Uso dopo move',
              pronunciation: '/juːs ˈɑːftər muːv/',
              phonetic: 'IUS AF-ter MUUV',
              example:
                'Static analyzers flag use-after-move bugs when code reads from a string that was already given away to another owner. = Gli analyzer statici segnalano bug di use-after-move quando il codice legge da una string già ceduta a un altro proprietario.',
              context: 'memory',
              difficulty: 'advanced',
              note: 'Lo stato è valido ma non specificato.',
            },
            {
              english: 'Move From Const',
              italian: 'Move da const',
              pronunciation: '/kɒnst/',
              phonetic: 'KONST',
              example:
                'Trying to move from const silently falls back to a copy because std::move on a const lvalue yields a const rvalue. = Provare a fare move da const ricade silenziosamente in una copia perché std::move su un lvalue const produce un rvalue const.',
              context: 'memory',
              difficulty: 'advanced',
              note: 'std::move(const x) si comporta come copy.',
            },
            {
              english: 'Return Std Move',
              italian: 'Return con std::move',
              pronunciation: '/rɪˈtɜːrn/',
              phonetic: 'ri-TERN',
              example:
                'Avoid writing return std::move(local) on a local variable because it actually disables copy elision and pessimizes the return. = Evita di scrivere return std::move(local) su una variabile locale perché disabilita la copy elision e pessimizza il return.',
              context: 'memory',
              difficulty: 'advanced',
              note: 'Inibisce RVO.',
            },
            {
              english: 'Move Pessimization',
              italian: 'Pessimizzazione di move',
              pronunciation: '/ˌpesɪmɪˈzeɪʃən/',
              phonetic: 'pe-si-mi-ZEI-scion',
              example:
                'A common move pessimization is forcing a move on a return value where the compiler would have already elided the copy. = Una move pessimization comune è forzare un move su un valore di ritorno dove il compilatore avrebbe già eliso la copia.',
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Move Throwing',
              italian: 'Move che lancia',
              pronunciation: '/muːv ˈθroʊɪŋ/',
              phonetic: 'MUUV TROU-ing',
              example:
                'A throwing move breaks strong guarantee. = Un move che lancia rompe la garanzia forte.',
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Implicit Move',
              italian: 'Move implicito',
              pronunciation: '/ɪmˈplɪsɪt/',
              phonetic: 'im-PLI-sit',
              example:
                'Returning a local triggers implicit move. = Il return di una locale fa scattare un move implicito.',
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Move Special',
              italian: 'Move speciale',
              pronunciation: '/ˈspeʃəl/',
              phonetic: 'SPE-scial',
              example:
                'The move special member functions include the move constructor and move assignment that the compiler generates when allowed. = Le move special member function comprendono il move constructor e il move assignment che il compilatore genera quando consentito.',
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Rule Of Five',
              italian: 'Regola del cinque',
              pronunciation: '/faɪv/',
              phonetic: 'FAIV',
              example:
                'When a class manages a raw resource, follow the rule of five and explicitly define copy, move, and destructor members together. = Quando una classe gestisce una risorsa raw, segui la rule of five e definisci esplicitamente i membri copy, move e destructor insieme.',
              context: 'memory',
              difficulty: 'advanced',
              note: 'Se ne implementi una, considera tutte le altre.',
            },
            {
              english: 'Rule Of Zero',
              italian: 'Regola dello zero',
              pronunciation: '/zɪəroʊ/',
              phonetic: 'ZIRO',
              example:
                'Apply the rule of zero by composing your class out of smart pointers and containers so the compiler-generated specials just work. = Applica la rule of zero componendo la tua classe con smart pointer e container così le special generate dal compilatore funzionano subito.',
              context: 'memory',
              difficulty: 'advanced',
              note: 'Non scrivere costruttori speciali se i membri li gestiscono.',
            },
            {
              english: 'Sink Argument',
              italian: 'Argomento sink',
              pronunciation: '/sɪŋk/',
              phonetic: 'SINK',
              example:
                'Take a sink argument by value when a function is going to store it: callers may move or copy as suits their lifetime. = Prendi un sink argument per valore quando una funzione lo memorizzerà: i chiamanti possono fare move o copia secondo la loro lifetime.',
              context: 'memory',
              difficulty: 'advanced',
              code: `class Logger {
    std::string tag_;
public:
    void set_tag(std::string tag) {
        tag_ = std::move(tag);  // sink: take by value, move in
    }
};`,
              task: 'Definisci void store(std::string s); accettando il parametro per valore così il chiamante decide se fare move o copia.',
            },
          ],
        },
        {
          id: 'cpp_memory_8',
          title: 'Lifetime & Aliasing / Vita e Aliasing',
          description: 'Gestione della durata',
          items: [
            {
              english: 'Object Lifetime',
              italian: "Durata dell'oggetto",
              pronunciation: '/ˈlaɪftaɪm/',
              phonetic: 'LAIF-taim',
              example:
                'An object lifetime begins after its constructor returns and ends right before its destructor starts running. = La lifetime di un oggetto inizia dopo che il suo costruttore ritorna e termina subito prima che il distruttore inizi a girare.',
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Static Storage',
              italian: 'Storage statico',
              pronunciation: '/ˈstætɪk ˈstɔːrɪdʒ/',
              phonetic: 'STA-tik STOR-rig',
              example: `Globals and namespace-scope variables live in static storage for the entire run of the program from initialization to exit. = Le variabili globali e a scope di namespace vivono in static storage per l'intera esecuzione del programma dall'inizializzazione all'uscita.`,
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Automatic Storage',
              italian: 'Storage automatico',
              pronunciation: '/ˌɔːtəˈmætɪk/',
              phonetic: 'oo-to-MA-tik',
              example: `Function-local variables sit in automatic storage on the stack and are destroyed when the enclosing block exits. = Le variabili locali a funzione stanno in automatic storage sullo stack e vengono distrutte all'uscita dal blocco contenente.`,
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Dynamic Storage',
              italian: 'Storage dinamico',
              pronunciation: '/daɪˈnæmɪk/',
              phonetic: 'dai-NA-mik',
              example: `Objects allocated with new or make_unique live in dynamic storage and persist until you delete them or the unique_ptr resets. = Gli oggetti allocati con new o make_unique vivono in dynamic storage e persistono finché non fai delete o l'unique_ptr non resetta.`,
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Thread Local',
              italian: 'Storage per thread (thread_local)',
              pronunciation: '/θred ˈloʊkl/',
              phonetic: 'TRED LO-kal',
              example: `Mark a per-thread cache as thread_local so each worker thread gets its own copy and no synchronization is needed on access. = Marca una cache per thread come thread_local così ogni worker thread ottiene la sua copia e non serve sincronizzazione all'accesso.`,
              context: 'memory',
              difficulty: 'advanced',
              code: `thread_local int req_count = 0;
void handle_request() {
    ++req_count;  // each thread has its own copy
}`,
              task: 'Dichiara thread_local int counter; così ogni thread mantiene la propria copia senza bisogno di sincronizzazione.',
            },
            {
              english: 'Dangling Pointer',
              italian: 'Puntatore pendente',
              pronunciation: '/ˈdæŋɡlɪŋ/',
              phonetic: 'DAN-gling',
              example: 'A dangling pointer is undefined behavior. = Un puntatore pendente è UB.',
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Lifetime Extension',
              italian: 'Estensione di durata',
              pronunciation: '/ɪkˈstenʃən/',
              phonetic: 'eks-TEN-scion',
              example: `Binding a temporary to a const reference triggers lifetime extension so the temporary outlives the full expression. = Legare un temporary a un riferimento const innesca la lifetime extension così il temporary sopravvive all'intera espressione.`,
              context: 'memory',
              difficulty: 'advanced',
              code: 'const std::string& s = makeStr();',
              task: `Lega il temporary restituito da makeStr() a const std::string& s per estenderne la lifetime oltre l'espressione.`,
            },
            {
              english: 'Aliasing',
              italian: 'Più nomi sullo stesso oggetto (aliasing)',
              pronunciation: '/ˈeɪliəsɪŋ/',
              phonetic: 'EI-li-a-sing',
              example:
                'When a function takes two int& parameters, aliasing can occur if both refer to the same variable, causing unexpected results. = Quando una funzione prende due parametri int&, può verificarsi aliasing se entrambi si riferiscono alla stessa variabile, causando risultati inattesi.',
              context: 'memory',
              difficulty: 'advanced',
            },
            {
              english: 'Strict Aliasing',
              italian: 'Aliasing stretto',
              pronunciation: '/strɪkt/',
              phonetic: 'STRIKT',
              example:
                'The strict aliasing rule says you cannot access an int through a float pointer without invoking undefined behavior. = La regola di strict aliasing dice che non puoi accedere a un int tramite un puntatore float senza incorrere in undefined behavior.',
              context: 'memory',
              difficulty: 'advanced',
              note: 'Usa std::bit_cast (C++20) per evitarlo.',
            },
            {
              english: 'Lifetime Bound',
              italian: 'Vincolo di durata',
              pronunciation: '/baʊnd/',
              phonetic: 'BAUND',
              example:
                '[[lifetimebound]] hints at lifetime issues. = [[lifetimebound]] suggerisce problemi di durata.',
              context: 'memory',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 17 - DESIGN PATTERN C++ / C++ DESIGN PATTERNS
    // ════════════════════════════════════════════════
    17: {
      name: 'Design Pattern C++ / C++ Design Patterns',
      description: 'Pattern idiomatici di C++',
      lessons: [
        {
          id: 'cpp_patterns_1',
          title: 'Creational Patterns / Pattern Creazionali',
          description: 'Singleton, factory, builder',
          items: [
            {
              english: 'Singleton Pattern',
              italian: 'Pattern singleton',
              pronunciation: '/ˈsɪŋɡltən/',
              phonetic: 'SIN-gol-ton',
              example: `The logger class applies the singleton pattern so every subsystem writes through the same instance and the same output stream. = La classe logger applica il pattern singleton cosi' ogni sottosistema scrive attraverso la stessa istanza e lo stesso stream di output.`,
              context: 'patterns',
              difficulty: 'advanced',
              code: `class Config {
public:
    static Config& instance() {
        static Config cfg;
        return cfg;
    }
    Config(const Config&) = delete;
};`,
              note: `Rinominato per distinguerlo dall'item 'Singleton' introduttivo in cpp_oop_4.`,
              task: `Esponi un'unica istanza A tramite static A& instance() { static A a; return a; } applicando il pattern singleton.`,
            },
            {
              english: 'Factory',
              italian: 'Pattern fabbrica (factory)',
              pronunciation: '/ˈfæktəri/',
              phonetic: 'FAK-to-ri',
              example:
                'Replace scattered new calls with a factory function so callers ask for a Shape and receive the right concrete subclass. = Sostituisci chiamate sparse a new con una factory così i chiamanti chiedono uno Shape e ricevono la giusta sottoclasse concreta.',
              context: 'patterns',
              difficulty: 'advanced',
              code: `std::unique_ptr<Shape> make(Type t) {
    if (t == Type::Circle) return std::make_unique<Circle>();
    return std::make_unique<Square>();
}`,
              task: 'Definisci std::unique_ptr<Animal> make(Type t); come factory che restituisce la giusta sottoclasse concreta in base al tag.',
            },
            {
              english: 'Abstract Factory',
              italian: 'Fabbrica astratta (abstract factory)',
              pronunciation: '/ˈæbstrækt/',
              phonetic: 'AB-strakt',
              example:
                'Introduce an abstract factory when the system must produce whole families of related widgets that share a theme. = Introduci una abstract factory quando il sistema deve produrre intere famiglie di widget correlati che condividono un tema.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Builder',
              italian: 'Costruttore a passi (builder)',
              pronunciation: '/ˈbɪldər/',
              phonetic: 'BIL-der',
              example:
                "The SQL query object uses a builder so the caller can chain where(), orderBy(), and limit() before calling build(). = L'oggetto query SQL usa un builder così il chiamante può concatenare where(), orderBy() e limit() prima di chiamare build().",
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Prototype',
              italian: 'Clonazione di prototipo (prototype)',
              pronunciation: '/ˈproʊtətaɪp/',
              phonetic: 'PRO-to-taip',
              example:
                "The level editor duplicates enemies by calling clone() on a prototype instead of re-reading their config from disk. = L'editor di livelli duplica i nemici chiamando clone() su un prototipo invece di rileggere la loro configurazione da disco.",
              context: 'patterns',
              difficulty: 'advanced',
              code: `struct Shape {
    virtual std::unique_ptr<Shape> clone() const = 0;
};
struct Circle : Shape {
    std::unique_ptr<Shape> clone() const override {
        return std::make_unique<Circle>(*this);
    }
};`,
              task: 'Aggiungi virtual std::unique_ptr<A> clone() const; alla base per permettere la duplicazione di un prototipo a runtime.',
            },
            {
              english: 'Object Pool',
              italian: 'Pool di oggetti riusabili (object pool)',
              pronunciation: '/ˈɒbdʒɪkt puːl/',
              phonetic: 'OB-gekt PUUL',
              example:
                'An object pool reuses expensive objects. = Un object pool riusa oggetti costosi.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Lazy Initialization',
              italian: 'Inizializzazione pigra',
              pronunciation: '/ˈleɪzi/',
              phonetic: 'LEI-zi',
              example: `Defer heavy setup with lazy initialization so a logger only opens its file on the first message, not at program start. = Posticipa il setup pesante con la lazy initialization così un logger apre il suo file solo al primo messaggio, non all'avvio.`,
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Static Factory',
              italian: 'Factory statica',
              pronunciation: '/ˈstætɪk/',
              phonetic: 'STA-tik',
              example:
                'A static factory replaces complex constructors. = Una factory statica sostituisce costruttori complessi.',
              context: 'patterns',
              difficulty: 'advanced',
              code: 'static A make(...);',
              task: 'Sostituisci un costruttore complesso con una static A make(...); per centralizzare la logica di costruzione.',
            },
            {
              english: 'Named Constructor',
              italian: 'Costruttore con nome',
              pronunciation: '/neɪmd/',
              phonetic: 'NEIMD',
              example: `Expose static named constructors like Color::fromRGB or Color::fromHex to make intent obvious at the call site. = Esponi named constructor statici come Color::fromRGB o Color::fromHex per rendere ovvia l'intenzione al call site.`,
              context: 'patterns',
              difficulty: 'advanced',
              code: `class Temperature {
    double kelvin_;
public:
    static Temperature from_celsius(double c) {
        return Temperature{c + 273.15};
    }
};`,
              task: `Esponi static A from_string(std::string); come named constructor per chiarire l'intento al call site.`,
            },
            {
              english: 'Registry',
              italian: 'Registro di oggetti (registry)',
              pronunciation: '/ˈredʒɪstri/',
              phonetic: 'RE-gi-stri',
              example:
                'Maintain a plugin registry that maps a string id to a factory so new modules can self-register at static init time. = Mantieni una registry di plugin che mappa un id stringa a una factory così nuovi moduli possono auto-registrarsi a static init.',
              context: 'patterns',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_patterns_2',
          title: 'Structural Patterns / Pattern Strutturali',
          description: 'CRTP, pimpl, adapter',
          items: [
            {
              english: 'CRTP Pattern',
              italian: 'Pattern CRTP',
              pronunciation: '/siː ɑːr tiː piː/',
              phonetic: 'SI-AR-TI-PI',
              example:
                'The physics engine uses the CRTP pattern to inject optimized collision methods into each shape class at compile time without virtual dispatch. = Il motore fisico usa il pattern CRTP per iniettare metodi di collisione ottimizzati in ogni classe forma a tempo di compilazione senza dispatch virtuale.',
              context: 'patterns',
              difficulty: 'advanced',
              code: `template<class Derived>
struct Printable {
    void print() {
        static_cast<Derived*>(this)->do_print();
    }
};
struct Log : Printable<Log> {
    void do_print() { std::cout << "log"; }
};`,
              note: `Rinominato per distinguerlo dall'item 'CRTP' introduttivo in cpp_oop_12.`,
              task: 'Definisci template<class D> struct Base{} per applicare il pattern CRTP e iniettare metodi specializzati senza dispatch virtuale.',
            },
            {
              english: 'Pimpl Idiom',
              italian: 'Idioma pimpl',
              pronunciation: '/ˈpɪmpl/',
              phonetic: 'PIM-pol',
              example:
                'Hide implementation details behind a pimpl idiom so changing private members does not recompile every translation unit. = Nascondi i dettagli implementativi dietro un pimpl idiom così cambiare membri privati non ricompila ogni translation unit.',
              context: 'patterns',
              difficulty: 'advanced',
              code: `// widget.h
class Widget {
    class Impl;
    std::unique_ptr<Impl> pImpl;
public:
    Widget();
    ~Widget();
    void draw();
};`,
              note: 'Pointer to Implementation.',
              task: `Nascondi i membri privati di A dietro class Impl; std::unique_ptr<Impl> p; applicando l'idioma pimpl.`,
            },
            {
              english: 'Adapter',
              italian: 'Adattatore',
              pronunciation: '/əˈdæptər/',
              phonetic: 'a-DAP-ter',
              example:
                "An adapter wraps an incompatible interface. = Un adattatore avvolge un'interfaccia incompatibile.",
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Bridge',
              italian: 'Disaccoppia astrazione e implementazione (bridge)',
              pronunciation: '/brɪdʒ/',
              phonetic: 'BRIGE',
              example:
                "The graphics renderer uses the bridge pattern to keep the Renderer API independent from the OpenGL and Vulkan backends. = Il renderer grafico usa il pattern bridge per mantenere l'API Renderer indipendente dai backend OpenGL e Vulkan.",
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Composite',
              italian: 'Albero di componenti uniformi (composite)',
              pronunciation: '/ˈkɒmpəzɪt/',
              phonetic: 'KOM-po-zit',
              example:
                "The UI toolkit models both single widgets and panels with children as a composite tree so the layout algorithm handles both uniformly. = Il toolkit UI modella sia i widget singoli che i pannelli con figli come un albero composite così l'algoritmo di layout li gestisce uniformemente.",
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Decorator',
              italian: 'Arricchimento dinamico di oggetto (decorator)',
              pronunciation: '/ˈdekəreɪtər/',
              phonetic: 'DEK-o-rei-tor',
              example:
                'The logging stream wraps the original output stream with a decorator that prepends a timestamp to every line. = Lo stream di logging avvolge lo stream di output originale con un decorator che prepone un timestamp a ogni riga.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Facade',
              italian: 'Facciata',
              pronunciation: '/fəˈsɑːd/',
              phonetic: 'fa-SAAD',
              example:
                'The audio engine exposes a simple facade with play() and stop() instead of revealing the complex mixer and buffer internals. = Il motore audio espone una facciata semplice con play() e stop() invece di rivelare gli interni complessi di mixer e buffer.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Proxy',
              italian: 'Surrogato di oggetto (proxy)',
              pronunciation: '/ˈprɒksi/',
              phonetic: 'PROK-si',
              example:
                'Wrap a remote service behind a proxy so client code calls methods locally while network details stay hidden. = Avvolgi un servizio remoto dietro un proxy così il codice client chiama metodi localmente mentre i dettagli di rete restano nascosti.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Flyweight',
              italian: 'Oggetto condiviso a peso ridotto (flyweight)',
              pronunciation: '/ˈflaɪweɪt/',
              phonetic: 'FLAI-ueit',
              example:
                "The text editor uses the flyweight pattern to share a single Font object among thousands of characters with the same typeface. = L'editor di testo usa il pattern flyweight per condividere un singolo oggetto Font tra migliaia di caratteri con lo stesso tipo di carattere.",
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'CRTP Mixin',
              italian: 'Mixin tramite CRTP',
              pronunciation: '/ˈmɪksɪn/',
              phonetic: 'MIK-sin',
              example:
                'Dropping a Printable CRTP mixin into a class hierarchy shares serialization without touching unrelated parts of the design. = Inserire un mixin CRTP Printable in una gerarchia di classi condivide serializzazione senza toccare parti non correlate del design.',
              context: 'patterns',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_patterns_3',
          title: 'Behavioral Patterns / Pattern Comportamentali',
          description: 'Observer, strategy, visitor',
          items: [
            {
              english: 'Observer',
              italian: 'Pattern osservatore (observer)',
              pronunciation: '/əbˈzɜːrvər/',
              phonetic: 'ob-ZER-ver',
              example:
                'The stock ticker class acts as an observer subject, pushing price updates to all registered chart widgets in real time. = La classe ticker azionario agisce come soggetto observer, inviando aggiornamenti di prezzo a tutti i widget grafici registrati in tempo reale.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Subject',
              italian: 'Soggetto osservato (subject)',
              pronunciation: '/ˈsʌbdʒekt/',
              phonetic: 'SAB-gekt',
              example:
                'In the observer pattern the subject keeps a list of listeners and notifies them whenever its state changes. = Nel pattern observer il subject mantiene una lista di listener e li notifica ogni volta che il suo stato cambia.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Strategy',
              italian: 'Scelta di algoritmo a runtime (strategy)',
              pronunciation: '/ˈstrætədʒi/',
              phonetic: 'STRA-te-gi',
              example:
                'The payment module uses the strategy pattern to switch between credit-card and PayPal processing at runtime. = Il modulo pagamenti usa il pattern strategy per passare tra elaborazione carta di credito e PayPal a runtime.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Visitor',
              italian: 'Visita di una struttura (visitor)',
              pronunciation: '/ˈvɪzɪtər/',
              phonetic: 'VI-zi-tor',
              example:
                "The compiler uses a visitor to walk the AST and emit different code for each node type without modifying the node classes. = Il compilatore usa un visitor per percorrere l'AST ed emettere codice diverso per ogni tipo di nodo senza modificare le classi dei nodi.",
              context: 'patterns',
              difficulty: 'advanced',
              code: `using Shape = std::variant<Circle, Rect>;
auto area = [](auto& s) { return s.area(); };
Shape shape = Circle{5.0};
double a = std::visit(area, shape);`,
              task: 'Percorri un std::variant chiamando std::visit(visitor, variant); per applicare logica diversa a ogni alternativa.',
            },
            {
              english: 'Command',
              italian: 'Azione come oggetto (command)',
              pronunciation: '/kəˈmɑːnd/',
              phonetic: 'kom-MAND',
              example:
                'The undo system stores every user action as a command object, so pressing Ctrl+Z replays them in reverse order. = Il sistema di undo memorizza ogni azione utente come oggetto command, così premendo Ctrl+Z le riesegue in ordine inverso.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Iterator Pattern',
              italian: 'Pattern iterator',
              pronunciation: '/ˈɪtəreɪtər/',
              phonetic: 'I-te-rei-tor',
              example:
                'The iterator pattern abstracts traversal. = Il pattern iterator astrae il traversal.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'State',
              italian: 'Cambio comportamento per stato (state)',
              pronunciation: '/steɪt/',
              phonetic: 'STEIT',
              example:
                'The TCP connection class uses the state pattern so its send() method behaves differently in Connecting, Open, and Closed states. = La classe connessione TCP usa il pattern state così il suo metodo send() si comporta diversamente negli stati Connecting, Open e Closed.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Mediator',
              italian: 'Mediatore tra oggetti (mediator)',
              pronunciation: '/ˈmiːdieɪtər/',
              phonetic: 'MII-di-ei-tor',
              example:
                'The chat room acts as a mediator so that no user object needs a direct reference to another; all messages flow through the room. = La chat room agisce come mediator così nessun oggetto utente necessita di un riferimento diretto a un altro; tutti i messaggi fluiscono attraverso la stanza.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Chain Of Responsibility',
              italian: 'Catena di responsabilità (chain of responsibility)',
              pronunciation: '/tʃeɪn ɒv/',
              phonetic: 'CEIN-OV',
              example:
                'Route a request through a chain of responsibility so each middleware decides to handle it or forward to the next link. = Instrada una richiesta attraverso una chain of responsibility così ogni middleware decide se gestirla o inoltrare al link successivo.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Template Method Pattern',
              italian: 'Pattern template method',
              pronunciation: '/ˈtemplət ˈmeθəd/',
              phonetic: 'TEM-plet ME-tod',
              example:
                'Template method defines an algorithm skeleton. = Template method definisce uno scheletro di algoritmo.',
              context: 'patterns',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_patterns_4',
          title: 'Idioms & Modern / Idiomi e Moderno',
          description: 'Idiomi C++ e pattern moderni',
          items: [
            {
              english: 'RAII Pattern',
              italian: 'Pattern RAII',
              pronunciation: '/ɑːr eɪ aɪ aɪ/',
              phonetic: 'AR-EI-AI-AI',
              example: `Apply the RAII pattern to file handles so closing happens automatically when the handle leaves scope, even on exceptions. = Applica il pattern RAII agli handle di file così la chiusura avviene automaticamente quando l'handle esce dallo scope, anche su eccezioni.`,
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Resource Handle',
              italian: 'Handle di risorsa',
              pronunciation: '/ˈhændl/',
              phonetic: 'HAN-dol',
              example:
                'Encapsulate an OS socket in a resource handle class so callers cannot forget to release it or double-close the descriptor. = Incapsula un socket di OS in una classe resource handle così i chiamanti non possono dimenticare di rilasciarlo o chiuderlo due volte.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Type Safe Enum',
              italian: 'Enum type-safe',
              pronunciation: '/seɪf/',
              phonetic: 'SEIF',
              example:
                'Use enum class Color { Red, Green } as a type-safe enum so its values cannot implicitly convert into integers or other enums. = Usa enum class Color { Red, Green } come enum type-safe così i suoi valori non si convertono implicitamente in interi o altri enum.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Strong Typedef',
              italian: 'Typedef forte',
              pronunciation: '/strɒŋ/',
              phonetic: 'STRONG',
              example:
                'Wrap a UserId int into a strong typedef struct so the compiler refuses to mix it with an unrelated OrderId integer. = Avvolgi un int UserId in uno strong typedef struct così il compilatore rifiuta di mescolarlo con un OrderId intero non correlato.',
              context: 'patterns',
              difficulty: 'advanced',
              code: `struct UserId { int v; };
struct OrderId { int v; };
void process(UserId u, OrderId o);
// process(OrderId{1}, UserId{2}); // type error!`,
              task: 'Avvolgi un int in struct UserId { int v; }; come strong typedef per impedire al compilatore di mescolarlo con altri ID.',
            },
            {
              english: 'Tag Type',
              italian: 'Tipo tag',
              pronunciation: '/tæɡ/',
              phonetic: 'TAG',
              example:
                'Define an empty struct as a tag type to disambiguate overloads or to pass compile-time information through the type system. = Definisci una struct vuota come tag type per disambiguare overload o per passare informazione compile-time attraverso il type system.',
              context: 'patterns',
              difficulty: 'advanced',
              code: 'struct InPlace_t {};',
              task: 'Dichiara struct InPlace_t {}; come tipo tag vuoto per disambiguare overload o trasportare informazione compile-time.',
            },
            {
              english: 'Phantom Type',
              italian: 'Tipo phantom',
              pronunciation: '/ˈfæntəm/',
              phonetic: 'FAN-tom',
              example:
                'Tag a Quantity<Meter> with a phantom type parameter so the compiler stops you from adding meters to seconds by accident. = Tagga una Quantity<Meter> con un phantom type parameter così il compilatore ti impedisce di sommare metri a secondi per sbaglio.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Named Parameter',
              italian: 'Parametro con nome',
              pronunciation: '/neɪmd/',
              phonetic: 'NEIMD',
              example:
                'Simulate named parameters in a builder by chaining .with_port(8080).with_host("db") so call sites stay self-documenting. = Simula named parameter in un builder concatenando .with_port(8080).with_host("db") così i call site restano auto-documentanti.',
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'Hidden Friend',
              italian: 'Friend nascosto',
              pronunciation: '/ˈhɪdn/',
              phonetic: 'HID-en',
              example: `Declare operator== inside a class as a hidden friend so it participates in ADL but does not pollute the enclosing namespace. = Dichiara operator== dentro una classe come hidden friend così partecipa all'ADL ma non inquina il namespace contenente.`,
              context: 'patterns',
              difficulty: 'advanced',
            },
            {
              english: 'NVI Idiom',
              italian: 'Idioma NVI',
              pronunciation: '/en viː aɪ/',
              phonetic: 'EN-VI-AI',
              example:
                'NVI: public non-virtual, private virtual. = NVI: public non-virtual, private virtual.',
              context: 'patterns',
              difficulty: 'advanced',
              note: 'Non-Virtual Interface.',
            },
            {
              english: 'Expression Template',
              italian: 'Template di espressione',
              pronunciation: '/ɪkˈspreʃən/',
              phonetic: 'eks-PRES-scion',
              example:
                'Build a vector math library on expression templates so a+b+c fuses into a single loop with no temporary vectors. = Costruisci una libreria di vector math su expression template così a+b+c si fonde in un singolo loop senza vector temporanei.',
              context: 'patterns',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 18 - I/O E SERIALIZZAZIONE / I/O & SERIALIZATION
    // ════════════════════════════════════════════════
    18: {
      name: 'I/O e Serializzazione / I/O & Serialization',
      description: 'Stream avanzati, file e serializzazione',
      lessons: [
        {
          id: 'cpp_io_1',
          title: 'Stream Advanced / Stream Avanzati',
          description: 'Manipolatori e formattazione',
          items: [
            {
              english: 'Stream Buffer',
              italian: 'Buffer di stream',
              pronunciation: '/striːm ˈbʌfər/',
              phonetic: 'STRIIM BAF-er',
              example:
                'std::streambuf is the buffer behind streams. = std::streambuf è il buffer dietro gli stream.',
              context: 'io',
              difficulty: 'advanced',
            },
            {
              english: 'Setw',
              italian: 'Larghezza campo I/O (std::setw)',
              pronunciation: '/set ˈdʌbljuː/',
              phonetic: 'SET-DAB-iu',
              example:
                'The table printer uses std::setw to pad each column to a fixed width so that numbers line up vertically. = Il printer della tabella usa std::setw per riempire ogni colonna a una larghezza fissa in modo che i numeri si allineino verticalmente.',
              context: 'io',
              difficulty: 'advanced',
              code: `std::cout << std::setw(10) << "Name"
           << std::setw(6) << "Age" << '\\n';
std::cout << std::setw(10) << "Alice"
           << std::setw(6) << 30 << '\\n';`,
              task: 'Allinea una colonna larga 10 caratteri inserendo std::setw(10) prima del valore x nello std::cout.',
            },
            {
              english: 'Setprecision',
              italian: 'Precisione di stampa (std::setprecision)',
              pronunciation: '/set prɪˈsɪʒən/',
              phonetic: 'SET pri-SI-zion',
              example:
                'Stream std::setprecision(4) into std::cout to render doubles with four significant digits in a report column. = Streamma std::setprecision(4) in std::cout per rendere i double con quattro cifre significative in una colonna di report.',
              context: 'io',
              difficulty: 'advanced',
              code: `double pi = 3.14159265;
std::cout << std::setprecision(2) << pi << '\\n';  // 3.1
std::cout << std::fixed << std::setprecision(4) << pi;  // 3.1416`,
              task: 'Limita la stampa di pi greco a 2 cifre significative inserendo std::setprecision(2) nello std::cout.',
            },
            {
              english: 'Hex',
              italian: 'Formato esadecimale (std::hex)',
              pronunciation: '/heks/',
              phonetic: 'HEKS',
              example:
                'Switch a stream to hexadecimal output with std::cout << std::hex when dumping memory addresses or bitmasks for debugging. = Cambia uno stream in output esadecimale con std::cout << std::hex quando dumpi indirizzi di memoria o bitmask per debug.',
              context: 'io',
              difficulty: 'advanced',
              code: `int x = 255;
std::cout << std::hex << x << '\\n';    // ff
std::cout << std::dec << x << '\\n';    // 255`,
              task: 'Stampa il valore 255 in esadecimale inserendo std::hex nel std::cout prima di scrivere il numero.',
            },
            {
              english: 'Fixed',
              italian: 'Formato a virgola fissa (std::fixed)',
              pronunciation: '/fɪkst/',
              phonetic: 'FIKST',
              example:
                'Combine std::fixed with setprecision to print monetary amounts like 12.30 always with two decimal digits and no scientific notation. = Combina std::fixed con setprecision per stampare importi monetari come 12.30 sempre con due decimali e nessuna notazione scientifica.',
              context: 'io',
              difficulty: 'advanced',
              code: 'std::cout << std::fixed << 3.14;',
              task: 'Forza il valore 3.14 in notazione a virgola fissa inserendo std::fixed nello std::cout invece della notazione scientifica.',
            },
            {
              english: 'Scientific',
              italian: 'Scientifico',
              pronunciation: '/ˌsaɪənˈtɪfɪk/',
              phonetic: 'sai-en-TI-fik',
              example:
                'Apply std::scientific to a stream when printing tiny or huge physics quantities so they show up as 1.23e-05 form. = Applica std::scientific a uno stream quando stampi quantità fisiche minuscole o enormi così appaiono nella forma 1.23e-05.',
              context: 'io',
              difficulty: 'advanced',
              code: 'std::cout << std::scientific;',
              task: `Cambia il formato di std::cout in notazione scientifica inserendo std::scientific per quantita' molto piccole o grandi.`,
            },
            {
              english: 'Fill Character',
              italian: 'Carattere di riempimento',
              pronunciation: '/fɪl/',
              phonetic: 'FIL',
              example: `Set the fill character with std::setfill('0') before std::setw(4) so dates pad as 0007 instead of three spaces and a 7. = Imposta il fill character con std::setfill('0') prima di std::setw(4) così le date si paddano come 0007 invece di tre spazi e un 7.`,
              context: 'io',
              difficulty: 'advanced',
              code: "std::cout << std::setfill('0');",
              task: `Imposta lo zero come carattere di riempimento applicando std::setfill('0') prima di un setw per padding numerico.`,
            },
            {
              english: 'Boolalpha',
              italian: 'Formato testuale dei booleani (std::boolalpha)',
              pronunciation: '/buːlˈælfə/',
              phonetic: 'BUL-AL-fa',
              example: `Toggle std::boolalpha on cout to print booleans as the words true and false instead of 1 and 0 in human-facing logs. = Attiva std::boolalpha su cout per stampare booleani come le parole true e false invece di 1 e 0 in log destinati all'utente.`,
              context: 'io',
              difficulty: 'advanced',
              code: 'std::cout << std::boolalpha << true;',
              task: `Attiva std::boolalpha su std::cout per stampare true al posto di 1 in log destinati all'utente.`,
            },
            {
              english: 'Stream Iterator',
              italian: 'Iteratore di stream',
              pronunciation: '/ˈɪtəreɪtər/',
              phonetic: 'I-te-rei-tor',
              example:
                'std::ostream_iterator writes to a stream. = std::ostream_iterator scrive su uno stream.',
              context: 'io',
              difficulty: 'advanced',
              code: `std::vector<int> v = {1, 2, 3};
std::copy(v.begin(), v.end(),
    std::ostream_iterator<int>(std::cout, " "));
// output: 1 2 3`,
              task: 'Crea uno std::ostream_iterator<int>(cout, " ") per scrivere interi separati da spazio direttamente dallo std::copy.',
            },
            {
              english: 'Stream Locale',
              italian: 'Locale dello stream',
              pronunciation: '/loʊˈkæl/',
              phonetic: 'lo-KAL',
              example:
                'Imbue a stream locale with std::locale("de_DE.UTF-8") so number formatting uses the German thousands and decimal separators. = Imbui un locale dello stream con std::locale("de_DE.UTF-8") così la formattazione numerica usa i separatori tedeschi di migliaia e decimali.',
              context: 'io',
              difficulty: 'advanced',
              code: 'cout.imbue(std::locale("it_IT"));',
              task: 'Imbui lo std::cout con std::locale("it_IT") per formattare i numeri secondo le convenzioni italiane di separatori.',
            },
          ],
        },
        {
          id: 'cpp_io_2',
          title: 'File I/O / I/O di File',
          description: 'Lettura e scrittura di file',
          items: [
            {
              english: 'Bidirectional File Stream',
              italian: 'Stream di file bidirezionale',
              pronunciation: '/faɪl striːm/',
              phonetic: 'FAIL STRIIM',
              example:
                'Opening with std::fstream creates a bidirectional file stream so the same handle reads existing tokens and writes updated ones back in place. = Aprire con std::fstream crea uno stream di file bidirezionale così lo stesso handle legge token esistenti e scrive quelli aggiornati al loro posto.',
              context: 'io',
              difficulty: 'advanced',
              code: `std::fstream f("data.txt", std::ios::in | std::ios::out);
std::string line;
std::getline(f, line);
f << "appended";`,
              task: 'Apri il file data come std::fstream f("data"); per leggere e scrivere sullo stesso handle bidirezionale.',
            },
            {
              english: 'Open Mode',
              italian: 'Modalità di apertura',
              pronunciation: '/ˈoʊpən moʊd/',
              phonetic: 'O-pen MOUD',
              example:
                'Combine open modes like std::ios::out | std::ios::app to append to a log file without truncating the existing content. = Combina open mode come std::ios::out | std::ios::app per appendere a un file di log senza troncare il contenuto esistente.',
              context: 'io',
              difficulty: 'advanced',
              code: 'std::ofstream f("log", std::ios::app);',
              task: `Apri il file log in modalita' append usando std::ofstream f("log", std::ios::app); senza troncare i contenuti esistenti.`,
            },
            {
              english: 'Binary Mode',
              italian: 'Modalità binaria',
              pronunciation: '/ˈbaɪnəri/',
              phonetic: 'BAI-na-ri',
              example:
                'Open a stream in std::ios::binary mode when reading PNG bytes so Windows does not silently translate CRLF sequences. = Apri uno stream in modalità std::ios::binary quando leggi byte PNG così Windows non traduce silenziosamente le sequenze CRLF.',
              context: 'io',
              difficulty: 'advanced',
              code: `std::ifstream f("image.bin", std::ios::binary);
char buf[1024];
f.read(buf, sizeof(buf));
auto bytes = f.gcount();`,
              task: `Leggi un'immagine PNG con std::ifstream f("img", std::ios::binary); per evitare traduzioni CRLF su Windows.`,
            },
            {
              english: 'Read',
              italian: 'Lettura',
              pronunciation: '/riːd/',
              phonetic: 'RIID',
              example:
                'Pull a fixed block of bytes from a binary stream with in.read(buf, n) and then check in.gcount() to see how many actually arrived. = Estrai un blocco fisso di byte da uno stream binario con in.read(buf, n) e controlla in.gcount() per vedere quanti sono davvero arrivati.',
              context: 'io',
              difficulty: 'advanced',
              code: 'f.read(buf, n);',
              task: 'Estrai un blocco di n byte da uno stream binario invocando f.read(buf, n); e controlla quanti sono davvero arrivati.',
            },
            {
              english: 'Write',
              italian: 'Scrittura',
              pronunciation: '/raɪt/',
              phonetic: 'RAIT',
              example:
                'Persist a packed struct to disk with out.write(reinterpret_cast<const char*>(&rec), sizeof(rec)) for raw binary records. = Persisti una struct packed su disco con out.write(reinterpret_cast<const char*>(&rec), sizeof(rec)) per record binari raw.',
              context: 'io',
              difficulty: 'advanced',
              code: 'f.write(buf, n);',
              task: 'Persisti n byte raw su disco invocando f.write(buf, n); per salvare un record binario in formato packed.',
            },
            {
              english: 'Tellg',
              italian: 'Posizione corrente di lettura (tellg)',
              pronunciation: '/tel dʒiː/',
              phonetic: 'TEL-GI',
              example: `Capture the current read offset of an input stream via auto pos = in.tellg(); so you can later seek back and reparse the same record. = Cattura l'offset corrente di lettura di uno stream di input con auto pos = in.tellg(); così puoi più tardi tornare indietro e riparsare lo stesso record.`,
              context: 'io',
              difficulty: 'advanced',
              code: 'auto pos = f.tellg();',
              task: `Memorizza l'offset di lettura corrente con auto pos = f.tellg(); per poter tornare allo stesso punto piu' tardi.`,
            },
            {
              english: 'Seekg',
              italian: 'Sposta posizione di lettura (seekg)',
              pronunciation: '/siːk dʒiː/',
              phonetic: 'SIIK-GI',
              example: `Jump to the start of the file with in.seekg(0, std::ios::beg) to restart streaming after probing the header bytes. = Salta all'inizio del file con in.seekg(0, std::ios::beg) per ricominciare lo streaming dopo aver sondato i byte di header.`,
              context: 'io',
              difficulty: 'advanced',
              code: `std::ifstream f("data.bin", std::ios::binary);
f.seekg(0, std::ios::end);
auto size = f.tellg();
f.seekg(0, std::ios::beg);  // back to start`,
              task: `Riposiziona la lettura all'inizio del file con f.seekg(0, std::ios::beg); dopo aver sondato l'header.`,
            },
            {
              english: 'Eof Bit',
              italian: 'Bit eof',
              pronunciation: '/iː oʊ ef/',
              phonetic: 'I-O-EF',
              example: `After a read loop, check in.eof() to confirm the eof bit was set because the stream really hit the end and not an error. = Dopo un loop di lettura, controlla in.eof() per confermare che l'eof bit sia stato impostato perché lo stream ha davvero raggiunto la fine e non un errore.`,
              context: 'io',
              difficulty: 'advanced',
            },
            {
              english: 'Fail Bit',
              italian: 'Bit di errore di stream (failbit)',
              pronunciation: '/feɪl/',
              phonetic: 'FEIL',
              example: `Inspect in.fail() to detect a fail bit triggered by a failed type extraction, like reading letters into an int. = Ispeziona in.fail() per rilevare un fail bit causato da un'estrazione di tipo fallita, come leggere lettere in un int.`,
              context: 'io',
              difficulty: 'advanced',
            },
            {
              english: 'Bad Bit',
              italian: 'Bit di errore grave di stream (badbit)',
              pronunciation: '/bæd/',
              phonetic: 'BAD',
              example:
                'If in.bad() returns true the bad bit indicates an unrecoverable hardware-level I/O error, like a disk read failure. = Se in.bad() ritorna true il bad bit indica un errore di I/O a livello hardware non recuperabile, come un fallimento di lettura disco.',
              context: 'io',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_io_3',
          title: 'String Streams / Stream di Stringhe',
          description: 'std::stringstream e parsing',
          items: [
            {
              english: 'String Stream',
              italian: 'Stream di stringhe',
              pronunciation: '/strɪŋ striːm/',
              phonetic: 'STRING STRIIM',
              example:
                'Reuse a string stream to build a CSV row in memory without touching the disk and then write the final string in one syscall. = Riusa uno string stream per costruire una riga CSV in memoria senza toccare il disco e poi scrivere la stringa finale in una syscall.',
              context: 'io',
              difficulty: 'advanced',
              code: `std::stringstream ss("42 hello 3.14");
int n; std::string s; double d;
ss >> n >> s >> d;
// n=42, s="hello", d=3.14`,
              task: 'Costruisci uno std::stringstream ss(s); per parsare o comporre testo in memoria senza toccare il filesystem.',
            },
            {
              english: 'OStringStream',
              italian: 'Stream di scrittura su stringa (std::ostringstream)',
              pronunciation: '/oʊ strɪŋ striːm/',
              phonetic: 'O-STRING-STRIIM',
              example:
                'Compose a log line into a std::ostringstream and then call .str() to retrieve the final formatted buffer ready for the sink. = Componi una riga di log in uno std::ostringstream e poi chiama .str() per recuperare il buffer formattato finale pronto per il sink.',
              context: 'io',
              difficulty: 'advanced',
              code: 'std::ostringstream oss;',
              task: 'Componi una riga di log in uno std::ostringstream oss; prima di recuperare il buffer finale con .str().',
            },
            {
              english: 'IStringStream',
              italian: 'Stream di lettura da stringa (std::istringstream)',
              pronunciation: '/aɪ strɪŋ striːm/',
              phonetic: 'AI-STRING-STRIIM',
              example:
                'Parse a space-separated record by wrapping the line in a std::istringstream and extracting fields with operator>>. = Parsa un record separato da spazi avvolgendo la riga in uno std::istringstream ed estraendo i campi con operator>>.',
              context: 'io',
              difficulty: 'advanced',
              code: `std::string csv = "10,20,30";
std::istringstream iss(csv);
int val; char sep;
while (iss >> val) { iss >> sep; }`,
              task: 'Parsa un record separato da spazi avvolgendo la riga s in uno std::istringstream iss(s); ed estraendo i campi.',
            },
            {
              english: 'Str Method',
              italian: 'Metodo str',
              pronunciation: '/stɪər/',
              phonetic: 'ESS-TI-AR',
              example:
                'Call .str() on a stringstream to grab the accumulated content, and use .str("") to reset it for the next reuse cycle. = Chiama .str() su uno stringstream per ottenere il contenuto accumulato, e usa .str("") per resettarlo per il prossimo riuso.',
              context: 'io',
              difficulty: 'advanced',
              code: 'auto s = oss.str();',
              task: 'Recupera il contenuto accumulato da uno std::ostringstream con auto s = oss.str(); pronto per la spedizione.',
            },
            {
              english: 'Tokenize',
              italian: 'Tokenizzare',
              pronunciation: '/ˈtoʊkənaɪz/',
              phonetic: 'TO-ke-naiz',
              example:
                'The CSV reader uses a stringstream to tokenize each line by commas and populate a vector of fields. = Il lettore CSV usa un stringstream per tokenizzare ogni riga tramite virgole e popolare un vettore di campi.',
              context: 'io',
              difficulty: 'advanced',
            },
            {
              english: 'Parse',
              italian: 'Analizzare',
              pronunciation: '/pɑːrs/',
              phonetic: 'PARS',
              example:
                'The config loader reads the YAML file and must parse each key-value pair into strongly-typed settings. = Il caricatore di configurazione legge il file YAML e deve analizzare ogni coppia chiave-valore in impostazioni fortemente tipizzate.',
              context: 'io',
              difficulty: 'advanced',
            },
            {
              english: 'StoX Functions',
              italian: 'Funzioni stoX',
              pronunciation: '/ɛs tuː ɛks/',
              phonetic: 'ESS-TU-EKS',
              example:
                'Use locale-aware stoi or stod functions to convert strings into numbers, but watch out: they throw on malformed input. = Usa le funzioni stoi o stod locale-aware per convertire stringhe in numeri, ma attento: lanciano eccezioni su input malformati.',
              context: 'io',
              difficulty: 'advanced',
              code: 'int n = std::stoi("42");',
              note: 'Anche stol, stoll, stof, stod.',
              task: `Converti la stringa "42" in intero con int n = std::stoi("42"); gestendo l'eccezione su input malformati.`,
            },
            {
              english: 'From Chars',
              italian: 'Parsing veloce (std::from_chars)',
              pronunciation: '/frɒm tʃɑːrz/',
              phonetic: 'FROM CIARS',
              example:
                'Reach for std::from_chars in a hot JSON parser because it skips locale handling and is significantly faster than stoi or stod. = Affidati a std::from_chars in un parser JSON hot perché salta la gestione del locale ed è significativamente più veloce di stoi o stod.',
              context: 'io',
              difficulty: 'advanced',
              code: `char buf[] = "12345";
int val;
auto [ptr, ec] = std::from_chars(buf, buf + 5, val);
// fast, no allocation, no locale`,
              note: 'Disponibile da C++17.',
              task: 'Parsa rapidamente un numero da un buffer con std::from_chars(p, end, n); evitando la gestione del locale.',
            },
            {
              english: 'To Chars',
              italian: 'Formattazione veloce (std::to_chars)',
              pronunciation: '/tuː tʃɑːrz/',
              phonetic: 'TUU CIARS',
              example:
                'std::to_chars converts numbers to strings. = std::to_chars converte numeri in stringhe.',
              context: 'io',
              difficulty: 'advanced',
              code: 'std::to_chars(p, end, n);',
              task: 'Formatta un intero n in un buffer raw con std::to_chars(p, end, n); per conversioni veloci locale-free.',
            },
            {
              english: 'Locale Independent',
              italian: 'Locale-indipendente',
              pronunciation: '/loʊˈkæl/',
              phonetic: 'lo-KAL',
              example:
                'Use locale-independent parsing for protocol fields like JSON numbers where a comma decimal would corrupt the wire format. = Usa parsing locale-indipendente per campi di protocollo come numeri JSON dove una virgola decimale corromperebbe il formato wire.',
              context: 'io',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_io_4',
          title: 'Serialization / Serializzazione',
          description: 'Serializzazione e formati',
          items: [
            {
              english: 'Serialization',
              italian: 'Serializzazione',
              pronunciation: '/ˌsɪəriəlaɪˈzeɪʃən/',
              phonetic: 'si-ria-lai-ZEI-scion',
              example:
                'Before sending a game state packet over the network, the engine performs serialization to convert the world snapshot into a byte stream. = Prima di inviare un pacchetto di stato del gioco sulla rete, il motore esegue la serializzazione per convertire lo snapshot del mondo in un flusso di byte.',
              context: 'io',
              difficulty: 'advanced',
            },
            {
              english: 'Deserialization',
              italian: 'Deserializzazione',
              pronunciation: '/diːˌsɪəriəlaɪˈzeɪʃən/',
              phonetic: 'di-si-ria-lai-ZEI-scion',
              example:
                "When the server receives a binary packet, deserialization reconstructs the original Player object from the raw bytes. = Quando il server riceve un pacchetto binario, la deserializzazione ricostruisce l'oggetto Player originale dai byte grezzi.",
              context: 'io',
              difficulty: 'advanced',
            },
            {
              english: 'JSON Library',
              italian: 'Libreria JSON',
              pronunciation: '/ˈdʒeɪsən/',
              phonetic: 'GEI-son',
              example:
                'Pick nlohmann::json as a header-only JSON library when you want straightforward serialization without pulling a heavy build system. = Scegli nlohmann::json come JSON library header-only quando vuoi serializzazione semplice senza tirarsi dietro un build system pesante.',
              context: 'io',
              difficulty: 'advanced',
              tool: 'nlohmann::json, RapidJSON, Boost.JSON',
            },
            {
              english: 'Boost Serialization',
              italian: 'Libreria di serializzazione (Boost.Serialization)',
              pronunciation: '/buːst/',
              phonetic: 'BUUST',
              example:
                'Boost.Serialization serializes any type. = Boost.Serialization serializza qualsiasi tipo.',
              context: 'io',
              difficulty: 'advanced',
              tool: 'Boost.Serialization',
            },
            {
              english: 'Protocol Buffers',
              italian: 'Serializzazione Google (Protocol Buffers)',
              pronunciation: '/ˈproʊtəkɒl/',
              phonetic: 'PRO-to-kol',
              example:
                'Define an RPC message in a .proto file and let protoc generate C++ classes so two services agree on a strict binary schema. = Definisci un messaggio RPC in un file .proto e lascia che protoc generi classi C++ così due servizi concordano uno schema binario stretto.',
              context: 'io',
              difficulty: 'advanced',
              tool: 'protoc, protobuf-cpp',
            },
            {
              english: 'Flatbuffers',
              italian: 'Serializzazione zero-copy (FlatBuffers)',
              pronunciation: '/ˈflætˌbʌfərz/',
              phonetic: 'FLAT-BAF-fers',
              example:
                'Reach for FlatBuffers when a game needs to read serialized data without any parsing or memory allocation step at all. = Affidati a FlatBuffers quando un gioco deve leggere dati serializzati senza alcun passo di parsing o allocazione di memoria.',
              context: 'io',
              difficulty: 'advanced',
              tool: 'FlatBuffers',
            },
            {
              english: 'Cereal',
              italian: 'Libreria header-only di serializzazione (Cereal)',
              pronunciation: '/ˈsɪəriəl/',
              phonetic: 'SI-rial',
              example:
                'Add Cereal as a header-only dependency to serialize and deserialize arbitrary C++ structs in just a few annotated lines. = Aggiungi Cereal come dipendenza header-only per serializzare e deserializzare struct C++ arbitrarie in poche righe annotate.',
              context: 'io',
              difficulty: 'advanced',
              tool: 'cereal',
            },
            {
              english: 'Schema',
              italian: 'Struttura dei dati (schema)',
              pronunciation: '/ˈskiːmə/',
              phonetic: 'SKII-ma',
              example:
                'Lock the wire format with a schema so old clients can keep decoding new payloads as long as fields are added in a backward-compatible way. = Blocca il formato wire con uno schema così i client vecchi possono continuare a decodificare i nuovi payload finché i campi sono aggiunti in modo backward-compatible.',
              context: 'io',
              difficulty: 'advanced',
            },
            {
              english: 'Backwards Compatibility',
              italian: "Compatibilità all'indietro",
              pronunciation: '/ˈbækwərdz/',
              phonetic: 'BAK-uords',
              example:
                "Schema evolution preserves backward compat. = L'evoluzione di schema preserva la compat all'indietro.",
              context: 'io',
              difficulty: 'advanced',
            },
            {
              english: 'Binary Format',
              italian: 'Formato binario',
              pronunciation: '/ˈbaɪnəri ˈfɔːrmæt/',
              phonetic: 'BAI-na-ri FOR-mat',
              example:
                'Switch from JSON to a binary format like Protocol Buffers when bandwidth dominates latency in a high-throughput RPC service. = Passa da JSON a un binary format come Protocol Buffers quando la banda domina la latenza in un servizio RPC ad alto throughput.',
              context: 'io',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 19 - BUILD E TOOLING / BUILD & TOOLING
    // ════════════════════════════════════════════════
    19: {
      name: 'Build e Tooling / Build & Tooling',
      description: 'Sistemi di build e gestione dipendenze',
      lessons: [
        {
          id: 'cpp_build_1',
          title: 'CMake / CMake',
          description: 'Sistema di build CMake',
          items: [
            {
              english: 'CMake',
              italian: 'Generatore di build cross-platform (CMake)',
              pronunciation: '/siːmeɪk/',
              phonetic: 'SI-MEIK',
              example:
                'Most open-source C++ projects ship a CMakeLists.txt so contributors only need CMake to build on any platform. = La maggior parte dei progetti C++ open-source fornisce un CMakeLists.txt così i collaboratori hanno bisogno solo di CMake per compilare su qualsiasi piattaforma.',
              context: 'build',
              difficulty: 'advanced',
              command: 'cmake -S . -B build',
              tool: 'CMake',
              task: 'Configura un progetto CMake eseguendo cmake -S . -B build per generare la cartella di build dal sorgente corrente.',
            },
            {
              english: 'CMakeLists',
              italian: 'File di configurazione CMake (CMakeLists.txt)',
              pronunciation: '/siːmeɪk lɪsts/',
              phonetic: 'SI-MEIK LISTS',
              example:
                'Add an add_executable(app main.cpp) line inside CMakeLists.txt so CMake knows which target to build for your project. = Aggiungi una riga add_executable(app main.cpp) dentro CMakeLists.txt così CMake sa quale target costruire per il tuo progetto.',
              context: 'build',
              difficulty: 'advanced',
              code: `cmake_minimum_required(VERSION 3.20)
project(myapp CXX)
set(CMAKE_CXX_STANDARD 20)`,
              task: 'Apri il file CMakeLists.txt con project(app CXX) per dichiarare un progetto C++ chiamato app.',
            },
            {
              english: 'Add Executable',
              italian: 'Aggiungi eseguibile',
              pronunciation: '/əd ɪɡˈzekjətəbl/',
              phonetic: 'AD eg-ZEK-iu-ta-bol',
              example:
                'Call add_executable(server src/main.cpp src/net.cpp) in CMakeLists to register a new executable target with two source files. = Chiama add_executable(server src/main.cpp src/net.cpp) in CMakeLists per registrare un nuovo target eseguibile con due file sorgente.',
              context: 'build',
              difficulty: 'advanced',
              code: 'add_executable(app main.cpp)',
              task: 'Registra un target eseguibile dentro CMakeLists scrivendo add_executable(app main.cpp) collegato al sorgente principale.',
            },
            {
              english: 'Add Library',
              italian: 'Aggiungi libreria',
              pronunciation: '/ˈlaɪbreri/',
              phonetic: 'LAI-bre-ri',
              example:
                'Use add_library(net STATIC src/net.cpp) inside CMakeLists to declare a static library that other targets can later link against. = Usa add_library(net STATIC src/net.cpp) dentro CMakeLists per dichiarare una libreria statica che altri target possono linkare in seguito.',
              context: 'build',
              difficulty: 'advanced',
              code: `add_library(engine STATIC
    engine.cpp
    physics.cpp)
target_include_directories(engine PUBLIC include)`,
              task: `Dichiara una libreria mylib con add_library(mylib src.cpp) cosi' altri target la possono linkare in seguito.`,
            },
            {
              english: 'Target Link Libraries',
              italian: 'Collegamento librerie',
              pronunciation: '/lɪŋk/',
              phonetic: 'LINK',
              example:
                'target_link_libraries links dependencies. = target_link_libraries collega dipendenze.',
              context: 'build',
              difficulty: 'advanced',
              code: 'target_link_libraries(app PRIVATE mylib)',
              task: 'Collega la libreria mylib al target app con target_link_libraries(app PRIVATE mylib) come dipendenza privata.',
            },
            {
              english: 'Find Package',
              italian: 'Trova pacchetto',
              pronunciation: '/faɪnd ˈpækɪdʒ/',
              phonetic: 'FAIND PA-keg',
              example:
                'Locate an installed library from CMake by calling find_package(Boost REQUIRED) and then linking via target_link_libraries. = Localizza una libreria installata da CMake chiamando find_package(Boost REQUIRED) e poi linkando tramite target_link_libraries.',
              context: 'build',
              difficulty: 'advanced',
              code: 'find_package(Boost REQUIRED)',
              task: 'Localizza Boost installato sul sistema invocando find_package(Boost REQUIRED) dentro CMakeLists per poterla linkare.',
            },
            {
              english: 'Target Include Directories',
              italian: 'Directory di include',
              pronunciation: '/dəˈrektəriz/',
              phonetic: 'di-REK-to-ris',
              example:
                'target_include_directories adds include paths. = target_include_directories aggiunge percorsi include.',
              context: 'build',
              difficulty: 'advanced',
              code: 'target_include_directories(app PUBLIC inc)',
              task: 'Estendi i percorsi di include del target app con target_include_directories(app PUBLIC inc) per esporre header pubblici.',
            },
            {
              english: 'CMake Build',
              italian: 'Build con CMake',
              pronunciation: '/bɪld/',
              phonetic: 'BILD',
              example:
                'Run cmake --build build --parallel to trigger a CMake build that compiles every target concurrently across CPU cores. = Esegui cmake --build build --parallel per innescare una build CMake che compila ogni target in parallelo su tutti i core CPU.',
              context: 'build',
              difficulty: 'advanced',
              command: 'cmake --build build',
              task: 'Compila il progetto configurato lanciando cmake --build build per costruire i target nella cartella build.',
            },
            {
              english: 'CMake Install',
              italian: 'Install con CMake',
              pronunciation: '/ɪnˈstɔːl/',
              phonetic: 'in-STOL',
              example:
                'Invoke cmake --install build --prefix /opt/myapp to copy the built binaries and headers to the install prefix layout. = Invoca cmake --install build --prefix /opt/myapp per copiare binari e header costruiti nel layout di prefix di installazione.',
              context: 'build',
              difficulty: 'advanced',
              command: 'cmake --install build',
              task: 'Installa binari e header generati nella destinazione di sistema eseguendo cmake --install build dopo la build.',
            },
            {
              english: 'CTest',
              italian: 'Esecutore di test CMake (CTest)',
              pronunciation: '/siːtɛst/',
              phonetic: 'SI-TEST',
              example:
                'The CI pipeline invokes CTest after the build step to run every registered unit test and report failures. = La pipeline CI invoca CTest dopo la fase di build per eseguire ogni test unitario registrato e segnalare i fallimenti.',
              context: 'build',
              difficulty: 'advanced',
              command: 'ctest --test-dir build',
              tool: 'CTest',
              task: 'Esegui la suite di test registrata in CMake invocando ctest --test-dir build dopo la fase di compilazione.',
            },
          ],
        },
        {
          id: 'cpp_build_2',
          title: 'Package Managers / Gestori Pacchetti',
          description: 'Conan, vcpkg e gestione dipendenze',
          items: [
            {
              english: 'Conan',
              italian: 'Gestore di pacchetti C++ (Conan)',
              pronunciation: '/ˈkoʊnən/',
              phonetic: 'KO-nan',
              example:
                'Adding Boost and fmt to conanfile.txt lets Conan fetch, build, and link both libraries automatically. = Aggiungere Boost e fmt al conanfile.txt permette a Conan di scaricare, compilare e linkare entrambe le librerie automaticamente.',
              context: 'build',
              difficulty: 'advanced',
              command: 'conan install . --build=missing',
              tool: 'Conan',
              task: 'Risolvi le dipendenze del progetto con conan install . --build=missing scaricando o compilando le librerie mancanti.',
            },
            {
              english: 'Vcpkg',
              italian: 'Gestore di pacchetti C++ Microsoft (Vcpkg)',
              pronunciation: '/viː siː ˈpækɪdʒ/',
              phonetic: 'VI-SI-PAKEG',
              example:
                'Bootstrap dependencies on Windows by running vcpkg install fmt boost-asio so CMake can find them via integrate install. = Avvia le dipendenze su Windows eseguendo vcpkg install fmt boost-asio così CMake può trovarle tramite integrate install.',
              context: 'build',
              difficulty: 'advanced',
              command: 'vcpkg install boost',
              tool: 'vcpkg',
              task: `Installa la libreria boost tramite vcpkg eseguendo vcpkg install boost cosi' CMake la trova automaticamente.`,
            },
            {
              english: 'Conanfile',
              italian: 'Ricetta Conan (conanfile)',
              pronunciation: '/ˈkoʊnənfaɪl/',
              phonetic: 'KO-nan-fail',
              example:
                'Declare your project dependencies and build options in a conanfile.txt so Conan can resolve and install matching binaries. = Dichiara le dipendenze del tuo progetto e le opzioni di build in un conanfile.txt così Conan può risolvere e installare binari corrispondenti.',
              context: 'build',
              difficulty: 'advanced',
            },
            {
              english: 'Manifest Mode',
              italian: 'Modalità manifest',
              pronunciation: '/ˈmænɪfest/',
              phonetic: 'MA-ni-fest',
              example:
                'Adopt vcpkg manifest mode by checking in a vcpkg.json so each developer pulls the exact same set of pinned dependency versions. = Adotta la modalità manifest di vcpkg committando un vcpkg.json così ogni sviluppatore ottiene esattamente lo stesso set di versioni di dipendenza pinnate.',
              context: 'build',
              difficulty: 'advanced',
            },
            {
              english: 'Recipe',
              italian: 'Ricetta',
              pronunciation: '/ˈresəpi/',
              phonetic: 'RE-se-pi',
              example:
                'A package recipe describes how to build. = Una ricetta di pacchetto descrive come buildare.',
              context: 'build',
              difficulty: 'advanced',
            },
            {
              english: 'Profile',
              italian: 'Profilo',
              pronunciation: '/ˈproʊfaɪl/',
              phonetic: 'PRO-fail',
              example:
                'Define a Conan profile that pins the compiler, std=c++20, and build type so CI and laptops compile dependencies the same way. = Definisci un Conan profile che fissi compilatore, std=c++20 e build type così CI e laptop compilino le dipendenze nello stesso modo.',
              context: 'build',
              difficulty: 'advanced',
              command: 'conan profile detect',
              task: 'Genera il profilo Conan della macchina corrente con conan profile detect per fissare compilatore e ABI.',
            },
            {
              english: 'Triplet',
              italian: 'Piattaforma target Vcpkg (triplet)',
              pronunciation: '/ˈtrɪplət/',
              phonetic: 'TRI-plet',
              example:
                'Selecting the x64-windows-static triplet tells vcpkg to build dependencies as static libraries linked against the static CRT. = Selezionare il triplet x64-windows-static dice a vcpkg di compilare le dipendenze come librerie statiche linkate contro il CRT statico.',
              context: 'build',
              difficulty: 'advanced',
            },
            {
              english: 'Dependency Graph',
              italian: 'Grafo dipendenze',
              pronunciation: '/dɪˈpendənsi ɡræf/',
              phonetic: 'di-PEN-den-si GRAF',
              example:
                'Package managers resolve dependency graphs. = I package manager risolvono grafi di dipendenze.',
              context: 'build',
              difficulty: 'advanced',
            },
            {
              english: 'Lockfile',
              italian: 'File di blocco delle versioni (lockfile)',
              pronunciation: '/ˈlɒkfaɪl/',
              phonetic: 'LOK-fail',
              example: `Committing the conan.lock lockfile pins each transitive dependency to an exact revision so two developers get identical builds. = Committare il lockfile conan.lock fissa ogni dipendenza transitiva a una revisione esatta cosi' due sviluppatori ottengono build identiche.`,
              context: 'build',
              difficulty: 'advanced',
            },
            {
              english: 'Binary Cache',
              italian: 'Cache binaria',
              pronunciation: '/ˈbaɪnəri kæʃ/',
              phonetic: 'BAI-na-ri KAS',
              example:
                'Pointing vcpkg at a shared binary cache turns a cold CI build of OpenCV from twelve minutes into a sixty-second download. = Puntare vcpkg a una cache binaria condivisa trasforma una build CI a freddo di OpenCV da dodici minuti a un download di sessanta secondi.',
              context: 'build',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_build_3',
          title: 'Compilation Model / Modello di Compilazione',
          description: 'Modello di compilazione C++',
          items: [
            {
              english: 'Translation Unit',
              italian: 'Unità di traduzione',
              pronunciation: '/trænsˈleɪʃən/',
              phonetic: 'trans-LEI-scion',
              example: `Each .cpp file with all its included headers forms one translation unit that the compiler processes independently before linking. = Ogni file .cpp con tutti i suoi header inclusi forma una unita' di traduzione che il compilatore processa indipendentemente prima del link.`,
              context: 'build',
              difficulty: 'advanced',
            },
            {
              english: 'Preprocessor',
              italian: 'Preprocessore',
              pronunciation: '/ˌpriːˈproʊsesər/',
              phonetic: 'pri-PRO-se-sor',
              example: `Running g++ -E lets you see what the preprocessor produces after include expansion and macro substitution but before the parser runs. = Eseguire g++ -E permette di vedere cosa produce il preprocessore dopo l'espansione degli include e la sostituzione delle macro ma prima del parser.`,
              context: 'build',
              difficulty: 'advanced',
              command: 'g++ -E main.cpp',
              task: `Ispeziona l'output del preprocessore lanciando g++ -E main.cpp per vedere il sorgente dopo espansione include e macro.`,
            },
            {
              english: 'ODR',
              italian: 'Regola della definizione unica (ODR)',
              pronunciation: '/oʊ diː ɑːr/',
              phonetic: 'O-DI-AR',
              example:
                'Defining the same inline function in two .cpp files with different bodies silently breaks ODR and yields whichever copy the linker picks. = Definire la stessa funzione inline in due file .cpp con corpi diversi rompe silenziosamente ODR e fornisce qualunque copia il linker scelga.',
              context: 'build',
              difficulty: 'advanced',
              note: 'Violarla è undefined behavior.',
            },
            {
              english: 'Linkage',
              italian: 'Visibilità del simbolo (linkage)',
              pronunciation: '/ˈlɪŋkɪdʒ/',
              phonetic: 'LIN-kig',
              example:
                'External linkage allows cross-TU access. = Il linkage esterno permette accesso cross-TU.',
              context: 'build',
              difficulty: 'advanced',
            },
            {
              english: 'Internal Linkage',
              italian: 'Linkage interno',
              pronunciation: '/ɪnˈtɜːrnl/',
              phonetic: 'in-TER-nal',
              example: `Marking a helper function with static gives it internal linkage so each translation unit gets its own private copy without symbol clashes. = Marcare una funzione di aiuto con static le da' linkage interno cosi' ogni unita' di traduzione ottiene la propria copia privata senza conflitti di simbolo.`,
              context: 'build',
              difficulty: 'advanced',
              code: 'static int x = 5;',
              task: 'Marca la variabile con static int x = 5; per darle linkage interno ed evitare conflitti tra translation unit.',
            },
            {
              english: 'External Linkage',
              italian: 'Linkage esterno',
              pronunciation: '/ɪkˈstɜːrnl/',
              phonetic: 'eks-TER-nal',
              example: `A free function defined in a .cpp file without static gets external linkage so other translation units can call it through the linker. = Una funzione libera definita in un file .cpp senza static ottiene linkage esterno cosi' altre unita' di traduzione possono chiamarla attraverso il linker.`,
              context: 'build',
              difficulty: 'advanced',
              code: 'extern int counter;',
              task: 'Dichiara extern int counter; in un header per esporre una variabile a linkage esterno definita altrove.',
            },
            {
              english: 'Inline Linkage',
              italian: 'Linkage inline',
              pronunciation: '/ˌɪnˈlaɪn/',
              phonetic: 'in-LAIN',
              example: `Header-only function templates rely on inline linkage so identical instantiations in different translation units coexist without ODR errors. = I template di funzione header-only si affidano al linkage inline cosi' istanziazioni identiche in unita' di traduzione diverse coesistono senza errori ODR.`,
              context: 'build',
              difficulty: 'advanced',
            },
            {
              english: 'Symbol Table',
              italian: 'Tabella dei simboli',
              pronunciation: '/ˈsɪmbəl ˈteɪbl/',
              phonetic: 'SIM-bol TEI-bol',
              example: `Running nm on a .o object lists its symbol table so you can confirm whether a function is exported, weak, or only referenced. = Eseguire nm su un oggetto .o elenca la sua tabella dei simboli cosi' puoi confermare se una funzione e' esportata, weak o solo referenziata.`,
              context: 'build',
              difficulty: 'advanced',
            },
            {
              english: 'Static Library',
              italian: 'Libreria statica',
              pronunciation: '/ˈstætɪk/',
              phonetic: 'STA-tik',
              example:
                'A static library is linked at build time. = Una libreria statica è collegata a build time.',
              context: 'build',
              difficulty: 'advanced',
              note: 'Estensioni: .a (Linux), .lib (Windows).',
            },
            {
              english: 'Dynamic Library',
              italian: 'Libreria dinamica',
              pronunciation: '/daɪˈnæmɪk/',
              phonetic: 'dai-NA-mik',
              example: `Shipping the rendering backend as a dynamic library lets the host application swap implementations at startup without recompiling. = Distribuire il backend di rendering come libreria dinamica permette all'applicazione host di scambiare implementazioni all'avvio senza ricompilare.`,
              context: 'build',
              difficulty: 'advanced',
              note: 'Estensioni: .so (Linux), .dll (Windows), .dylib (macOS).',
            },
          ],
        },
        {
          id: 'cpp_build_4',
          title: 'Build Optimization / Ottimizzazione Build',
          description: 'Velocità di compilazione',
          items: [
            {
              english: 'Precompiled Header',
              italian: 'Header precompilato',
              pronunciation: '/ˌpriːkəmˈpaɪld/',
              phonetic: 'pri-kom-PAILD',
              example:
                'Putting heavy STL includes into a precompiled header cuts the build of a large project from minutes to seconds on incremental rebuilds. = Mettere include STL pesanti in un header precompilato taglia la build di un progetto grande da minuti a secondi nei rebuild incrementali.',
              context: 'build',
              difficulty: 'advanced',
              command: 'g++ -include pch.h main.cpp',
              task: `Forza l'inclusione di un header precompilato con g++ -include pch.h main.cpp per accelerare i rebuild incrementali.`,
            },
            {
              english: 'Unity Build',
              italian: 'Compilazione unificata (unity build)',
              pronunciation: '/ˈjuːnəti/',
              phonetic: 'IU-ni-ti',
              example: `Switching CMake to a unity build merges many .cpp files into a single translation unit so the compiler parses each header only once. = Passare CMake a una unity build fonde molti file .cpp in una singola unita' di traduzione cosi' il compilatore analizza ogni header una sola volta.`,
              context: 'build',
              difficulty: 'advanced',
              note: 'Detto anche jumbo build.',
            },
            {
              english: 'Forward Declaration',
              italian: 'Dichiarazione anticipata',
              pronunciation: '/ˈfɔːrwərd/',
              phonetic: 'FOR-uord',
              example: `Replacing an include with a forward declaration of class Logger in the public header cuts compile time without breaking client code. = Sostituire un include con una dichiarazione anticipata di class Logger nell'header pubblico taglia il tempo di compilazione senza rompere il codice client.`,
              context: 'build',
              difficulty: 'advanced',
              code: 'class Foo;',
              task: 'Sostituisci un #include pesante con una forward declaration class Foo; quando ti basta solo il puntatore.',
            },
            {
              english: 'Include Guard',
              italian: 'Protezione doppia inclusione (include guard)',
              pronunciation: '/ɪnˈkluːd ɡɑːrd/',
              phonetic: 'in-KLUUD GARD',
              example:
                'Wrapping a header in an include guard pair like #ifndef FOO_H / #define FOO_H prevents the same declarations from being seen twice. = Avvolgere un header in una coppia di include guard come #ifndef FOO_H / #define FOO_H impedisce che le stesse dichiarazioni siano viste due volte.',
              context: 'build',
              difficulty: 'advanced',
              code: `#ifndef WIDGET_H
#define WIDGET_H
class Widget { /* ... */ };
#endif  // WIDGET_H`,
              task: 'Proteggi un header dalla doppia inclusione avvolgendolo in #ifndef X_H / #define X_H prima delle dichiarazioni.',
            },
            {
              english: 'Pragma Once',
              italian: 'Direttiva di inclusione singola (#pragma once)',
              pronunciation: '/ˈpræɡmə wʌns/',
              phonetic: 'PRAG-ma UONS',
              example:
                'Most modern compilers honor pragma once at the top of a header, replacing the older ifndef-define-endif idiom with a single line. = La maggior parte dei compilatori moderni onora pragma once in cima a un header, sostituendo il vecchio idioma ifndef-define-endif con una sola riga.',
              context: 'build',
              difficulty: 'advanced',
              code: '#pragma once',
              note: 'Supportato da quasi tutti i compilatori.',
              task: `Sostituisci la classica include guard mettendo #pragma once in cima all'header come direttiva singola.`,
            },
            {
              english: 'CCache',
              italian: 'ccache',
              pronunciation: '/siː kæʃ/',
              phonetic: 'SI-KAS',
              example:
                'Wiring ccache in front of g++ on a CI runner turns a rebuild of identical sources into a near-instant disk fetch instead of a fresh compile. = Mettere ccache davanti a g++ su un runner CI trasforma una ricompilazione di sorgenti identici in un recupero da disco quasi istantaneo invece di una compilazione da zero.',
              context: 'build',
              difficulty: 'advanced',
              tool: 'ccache, sccache',
              note: 'Termine italiano: ccache (nome del tool di cache di compilazione, non si traduce).',
            },
            {
              english: 'Distcc',
              italian: 'distcc',
              pronunciation: '/dɪst siː siː/',
              phonetic: 'DIST-SI-SI',
              example: `Configuring distcc across a small build farm lets the local machine offload preprocessed translation units to idle workstations for parallel work. = Configurare distcc su una piccola build farm permette alla macchina locale di scaricare unita' di traduzione preprocessate su workstation inattive in parallelo.`,
              context: 'build',
              difficulty: 'advanced',
              tool: 'distcc',
              note: 'Termine italiano: distcc (nome del tool di compilazione distribuita, non si traduce).',
            },
            {
              english: 'LTO',
              italian: 'Ottimizzazione a tempo di linking (LTO)',
              pronunciation: '/el tiː oʊ/',
              phonetic: 'EL-TI-O',
              example:
                'Enabling LTO in the release build shrank the final binary by 15 percent because the linker could inline across source files. = Abilitare LTO nella build di release ha ridotto il binario finale del 15 percento perché il linker poteva fare inline tra file sorgente.',
              context: 'build',
              difficulty: 'advanced',
              command: 'g++ -flto',
              note: 'Link-Time Optimization.',
              task: 'Abilita la link-time optimization compilando con g++ -flto per permettere al linker di inlinare tra translation unit.',
            },
            {
              english: 'Ninja',
              italian: 'Sistema di build veloce (Ninja)',
              pronunciation: '/ˈnɪndʒə/',
              phonetic: 'NIN-gia',
              example:
                'Switching the CMake generator to Ninja cut the incremental build time from twelve seconds to under three. = Passare il generatore CMake a Ninja ha ridotto il tempo di build incrementale da dodici secondi a meno di tre.',
              context: 'build',
              difficulty: 'advanced',
              command: 'cmake -G Ninja',
              tool: 'Ninja',
              task: 'Genera la build con il generatore Ninja eseguendo cmake -G Ninja per accelerare i rebuild incrementali.',
            },
            {
              english: 'Module Build',
              italian: 'Build di moduli',
              pronunciation: '/ˈmɒdjuːl/',
              phonetic: 'MO-diul',
              example: `Migrating the geometry library to a C++20 module build replaces dozens of textual includes with a single import statement and faster reparse. = Migrare la libreria di geometria a una build di moduli C++20 sostituisce decine di include testuali con una singola istruzione import e reparse piu' veloci.`,
              context: 'build',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 20 - PERFORMANCE / PERFORMANCE
    // ════════════════════════════════════════════════
    20: {
      name: 'Performance / Performance',
      description: 'Ottimizzazione e profiling',
      lessons: [
        {
          id: 'cpp_performance_1',
          title: 'Cache & Memory / Cache e Memoria',
          description: 'Ottimizzare per la cache CPU',
          items: [
            {
              english: 'Cache Friendly',
              italian: 'Amico della cache (cache friendly)',
              pronunciation: '/kæʃ ˈfrendli/',
              phonetic: 'KAS-FREN-dli',
              example:
                'Cache-friendly code accesses memory linearly. = Il codice cache-friendly accede memoria linearmente.',
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Cache Line',
              italian: 'Linea di cache',
              pronunciation: '/laɪn/',
              phonetic: 'LAIN',
              example: `Aligning two hot atomics on separate 64-byte cache lines prevents one core's write from invalidating the other core's read. = Allineare due atomic caldi su linee di cache separate da 64 byte impedisce che la scrittura di un core invalidi la lettura dell'altro core.`,
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Cache Hit',
              italian: 'Dato trovato in cache (cache hit)',
              pronunciation: '/hɪt/',
              phonetic: 'HIT',
              example: `Reusing the same small lookup table across the hot loop keeps it warm in L1 so almost every access lands as a cache hit. = Riusare la stessa piccola tabella di lookup attraverso il loop caldo la tiene calda in L1 cosi' quasi ogni accesso atterra come cache hit.`,
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'L1 Cache Miss',
              italian: 'Mancanza dati in cache L1 (L1 cache miss)',
              pronunciation: '/mɪs/',
              phonetic: 'MIS',
              example: `Sampling perf shows that the irregular pointer chase suffers an L1 cache miss on nearly every node, dwarfing the actual arithmetic cost. = Campionare con perf mostra che l'inseguimento irregolare di puntatori subisce una mancanza dati in cache L1 su quasi ogni nodo, oscurando il costo aritmetico effettivo.`,
              context: 'performance',
              difficulty: 'advanced',
              note: `Rinominato per distinguerlo dall'item 'Cache Miss' introduttivo in cpp_oop_12.`,
            },
            {
              english: 'False Sharing',
              italian: 'Condivisione falsa di linee cache (false sharing)',
              pronunciation: '/fɔːls ˈʃeərɪŋ/',
              phonetic: 'FOLS SCE-ring',
              example: `Padding per-thread counters to a full cache line each is the classic fix for false sharing in lock-free histograms. = Riempire i contatori per thread fino a una linea di cache piena ciascuno e' la soluzione classica per il false sharing in istogrammi lock-free.`,
              context: 'performance',
              difficulty: 'advanced',
              note: 'Mitigare con padding o std::hardware_destructive_interference_size.',
            },
            {
              english: 'Memory Layout',
              italian: 'Layout di memoria',
              pronunciation: '/ˈleɪaʊt/',
              phonetic: 'LEI-aut',
              example:
                'Reordering the hot fields of a Particle struct to pack frequently-touched members first improves the memory layout for the simulation loop. = Riordinare i campi caldi di una struct Particle per impacchettare prima i membri toccati spesso migliora il layout di memoria per il loop di simulazione.',
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'AoS vs SoA',
              italian: 'Array di struct vs struct di array (AoS vs SoA)',
              pronunciation: '/eɪ oʊ es viː es oʊ eɪ/',
              phonetic: 'A-O-S VS S-O-A',
              example: `Choosing AoS vs SoA for a particle system is really a question of whether each kernel touches one field or all fields per element. = Scegliere tra AoS vs SoA per un sistema di particelle e' in realta' la domanda se ogni kernel tocca un campo o tutti i campi per elemento.`,
              context: 'performance',
              difficulty: 'advanced',
              note: 'Array of Structs vs Struct of Arrays.',
            },
            {
              english: 'Data Locality',
              italian: 'Località dei dati',
              pronunciation: '/loʊˈkæləti/',
              phonetic: 'lo-KA-li-ti',
              example: `Sorting entities by archetype before iterating gives the update loop strong data locality and a measurable boost in instructions per cycle. = Ordinare le entita' per archetipo prima di iterare da' al loop di aggiornamento una forte localita' dei dati e un boost misurabile in istruzioni per ciclo.`,
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Prefetching',
              italian: 'Pre-caricamento in cache (prefetching)',
              pronunciation: '/ˈpriːfetʃɪŋ/',
              phonetic: 'PRI-fe-cing',
              example:
                'The particle system inserts a prefetching hint before the inner loop so that the next batch of position data is already in L1 cache. = Il sistema di particelle inserisce un suggerimento di prefetching prima del loop interno così il prossimo blocco di dati di posizione è già nella cache L1.',
              context: 'performance',
              difficulty: 'advanced',
              code: '__builtin_prefetch(p);',
              task: 'Inserisci __builtin_prefetch(p); prima del loop interno per pre-caricare in cache L1 il prossimo blocco di dati.',
            },
            {
              english: 'Padding',
              italian: 'Riempimento per allineamento (padding)',
              pronunciation: '/ˈpædɪŋ/',
              phonetic: 'PA-ding',
              example:
                'Reordering the struct members from largest to smallest eliminated three bytes of padding and reduced cache pressure. = Riordinare i membri della struct dal più grande al più piccolo ha eliminato tre byte di padding e ridotto la pressione sulla cache.',
              context: 'performance',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_performance_2',
          title: 'Profiling / Profiling',
          description: 'Strumenti di profiling',
          items: [
            {
              english: 'Profiling',
              italian: 'Profilazione delle prestazioni (profiling)',
              pronunciation: '/ˈproʊfaɪlɪŋ/',
              phonetic: 'PRO-fai-ling',
              example:
                'After users reported slow startup, profiling revealed that 60 percent of the time was spent loading unused plugins. = Dopo che gli utenti hanno segnalato un avvio lento, il profiling ha rivelato che il 60 percento del tempo era speso a caricare plugin inutilizzati.',
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Hotspot',
              italian: 'Punto caldo del codice (hotspot)',
              pronunciation: '/ˈhɒtspɒt/',
              phonetic: 'HOT-spot',
              example: `Profiling the codec revealed that 80 percent of CPU time concentrated in a single hotspot inside the bitstream reader. = Profilare il codec ha rivelato che l'80 percento del tempo CPU si concentrava in un singolo hotspot dentro il lettore di bitstream.`,
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Sampling Profiler',
              italian: 'Profiler a campionamento',
              pronunciation: '/ˈsæmplɪŋ/',
              phonetic: 'SAM-pling',
              example:
                'A sampling profiler interrupts periodically. = Un profiler a campionamento interrompe periodicamente.',
              context: 'performance',
              difficulty: 'advanced',
              tool: 'perf, VTune',
            },
            {
              english: 'Instrumentation',
              italian: 'Strumentazione',
              pronunciation: '/ˌɪnstrəmenˈteɪʃən/',
              phonetic: 'in-stru-men-TEI-scion',
              example:
                'Compiling with -pg enables instrumentation so gprof can record how many times each function is called and for how long. = Compilare con -pg abilita la strumentazione così gprof può registrare quante volte ogni funzione viene chiamata e per quanto tempo.',
              context: 'performance',
              difficulty: 'advanced',
              tool: 'gprof, callgrind',
            },
            {
              english: 'Flame Graph',
              italian: 'Grafico a fiamma (flame graph)',
              pronunciation: '/fleɪm ɡræf/',
              phonetic: 'FLEIM GRAF',
              example: `Reading the flame graph from left to right highlighted that JSON parsing dominated startup, not the GPU initialization we had suspected. = Leggere il flame graph da sinistra a destra ha evidenziato che il parsing JSON dominava lo startup, non l'inizializzazione GPU che sospettavamo.`,
              context: 'performance',
              difficulty: 'advanced',
              tool: 'FlameGraph',
            },
            {
              english: 'Valgrind',
              italian: 'Strumento di analisi della memoria (Valgrind)',
              pronunciation: '/ˈvælɡrɪnd/',
              phonetic: 'VAL-grind',
              example:
                'Running the test suite under Valgrind uncovered a use-after-free bug that only manifested on certain input sizes. = Eseguire la suite di test sotto Valgrind ha scoperto un bug use-after-free che si manifestava solo con certe dimensioni di input.',
              context: 'performance',
              difficulty: 'advanced',
              command: 'valgrind --tool=callgrind ./app',
              tool: 'Valgrind',
              task: `Profila il binario sotto Valgrind invocando valgrind --tool=callgrind ./app per misurare le funzioni piu' chiamate.`,
            },
            {
              english: 'Perf',
              italian: 'perf',
              pronunciation: '/pɜːrf/',
              phonetic: 'PERF',
              example:
                'Running perf record on the production binary and then perf report ranks the hot functions without rebuilding with extra instrumentation. = Eseguire perf record sul binario di produzione e poi perf report classifica le funzioni calde senza ricompilare con strumentazione extra.',
              context: 'performance',
              difficulty: 'advanced',
              command: 'perf record ./app',
              tool: 'perf',
              note: 'Termine italiano: perf (nome del profiler Linux, non si traduce).',
              task: 'Cattura il profilo di esecuzione con perf record ./app per identificare le hot function senza ricompilare.',
            },
            {
              english: 'Perf Counter',
              italian: 'Contatore perf',
              pronunciation: '/ˈkaʊntər/',
              phonetic: 'KAUN-ter',
              example:
                'Reading the LLC-load-misses perf counter pinpoints which loop saturates the last-level cache better than wall-clock timings ever could. = Leggere il perf counter LLC-load-misses individua quale loop satura la cache di ultimo livello meglio di quanto i tempi a parete potrebbero mai fare.',
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Microbenchmark',
              italian: 'Benchmark a piccola granularità (microbenchmark)',
              pronunciation: '/ˈmaɪkroʊˌbentʃmɑːrk/',
              phonetic: 'MAI-kro-BENC-mark',
              example:
                'Writing a microbenchmark with google-benchmark for the new hash function isolates its cost from the surrounding application noise. = Scrivere un microbenchmark con google-benchmark per la nuova funzione hash isola il suo costo dal rumore applicativo circostante.',
              context: 'performance',
              difficulty: 'advanced',
              tool: 'Google Benchmark',
            },
            {
              english: 'Benchmark Library',
              italian: 'Libreria benchmark',
              pronunciation: '/ˈbentʃmɑːrk/',
              phonetic: 'BENC-mark',
              example: `Adopting Google's benchmark library gives you DoNotOptimize, fixture setup, and statistical iteration counts for free. = Adottare la benchmark library di Google ti da' gratis DoNotOptimize, setup di fixture e conteggi di iterazione statistici.`,
              context: 'performance',
              difficulty: 'advanced',
              code: `static void BM_sort(benchmark::State& state) {
    for (auto _ : state) {
        std::vector<int> v = {5, 3, 1};
        std::sort(v.begin(), v.end());
    }
}
BENCHMARK(BM_sort);`,
              tool: 'Google Benchmark',
              task: 'Registra una funzione da misurare con la macro BENCHMARK(BM_func); della Google Benchmark Library.',
            },
          ],
        },
        {
          id: 'cpp_performance_3',
          title: 'SIMD & Parallelism / SIMD e Parallelismo',
          description: 'SIMD e parallelizzazione',
          items: [
            {
              english: 'SIMD',
              italian: 'Istruzione singola dati multipli (SIMD)',
              pronunciation: '/ˈsɪmd/',
              phonetic: 'SIMD',
              example:
                'The image filter processes four pixels in parallel by packing them into a SIMD register and applying the convolution kernel in a single instruction. = Il filtro immagine elabora quattro pixel in parallelo impacchettandoli in un registro SIMD e applicando il kernel di convoluzione in una singola istruzione.',
              context: 'performance',
              difficulty: 'advanced',
              note: 'Single Instruction Multiple Data.',
            },
            {
              english: 'Vectorization',
              italian: 'Vettorizzazione',
              pronunciation: '/ˌvektəraɪˈzeɪʃən/',
              phonetic: 'vek-to-rai-ZEI-scion',
              example:
                "Auto-vectorization uses SIMD instructions. = L'auto-vettorizzazione usa istruzioni SIMD.",
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'AVX',
              italian: 'Estensione SIMD per architettura x86 (AVX)',
              pronunciation: '/eɪ viː eks/',
              phonetic: 'EI-VI-EKS',
              example:
                'Compiling the math library with -mavx2 unlocks AVX instructions that double the throughput of the matrix multiplication kernel. = Compilare la libreria matematica con -mavx2 sblocca le istruzioni AVX che raddoppiano il throughput del kernel di moltiplicazione matriciale.',
              context: 'performance',
              difficulty: 'advanced',
              command: 'g++ -mavx2',
              task: 'Compila con g++ -mavx2 per sbloccare istruzioni AVX2 e vettorizzare il kernel di calcolo matriciale.',
            },
            {
              english: 'Intrinsics',
              italian: 'Intrinseci',
              pronunciation: '/ɪnˈtrɪnsɪks/',
              phonetic: 'in-TRIN-siks',
              example:
                'Instead of writing inline assembly, the audio DSP code calls _mm256_add_ps through intrinsics for portable SIMD arithmetic. = Invece di scrivere assembly inline, il codice DSP audio chiama _mm256_add_ps tramite intrinseci per aritmetica SIMD portabile.',
              context: 'performance',
              difficulty: 'advanced',
              code: '_mm256_add_ps(a, b);',
              task: `Somma due vettori SIMD chiamando l'intrinseca _mm256_add_ps(a, b); invece di scrivere assembly inline.`,
            },
            {
              english: 'Parallel STL',
              italian: 'STL parallela',
              pronunciation: '/ˈpærəlel/',
              phonetic: 'PA-ra-lel',
              example:
                'std::execution enables parallel algorithms. = std::execution abilita algoritmi paralleli.',
              context: 'performance',
              difficulty: 'advanced',
              code: 'std::sort(std::execution::par, v.begin(), v.end());',
              note: 'Disponibile da C++17.',
              task: 'Ordina un vettore in parallelo con std::sort(std::execution::par, v.begin(), v.end()); sfruttando la STL parallela.',
            },
            {
              english: 'OpenMP',
              italian: 'Libreria di parallelismo a direttive (OpenMP)',
              pronunciation: '/ˈoʊpən em piː/',
              phonetic: 'O-pen-EM-PI',
              example:
                'Adding a single #pragma omp parallel for above the image-processing loop lets OpenMP distribute the rows across all available cores. = Aggiungere un singolo #pragma omp parallel for sopra il loop di elaborazione immagini permette a OpenMP di distribuire le righe su tutti i core disponibili.',
              context: 'performance',
              difficulty: 'advanced',
              code: `#pragma omp parallel for
for (int i = 0; i < n; ++i) {
    result[i] = heavy_compute(data[i]);
}`,
              tool: 'OpenMP',
              task: `Distribuisci le iterazioni di un loop su piu' core annotandolo con #pragma omp parallel for di OpenMP.`,
            },
            {
              english: 'TBB',
              italian: 'Intel TBB (libreria parallelismo)',
              pronunciation: '/tiː biː biː/',
              phonetic: 'TI-BI-BI',
              example: `Replacing a hand-rolled thread pool with TBB's parallel_for cut the image filter latency by 4x on an 8-core laptop. = Sostituire un thread pool fatto a mano con il parallel_for di TBB ha tagliato la latenza del filtro immagini di 4 volte su un laptop a 8 core.`,
              context: 'performance',
              difficulty: 'advanced',
              tool: 'Intel TBB',
            },
            {
              english: 'Thread Pool',
              italian: 'Pool di thread',
              pronunciation: '/θred puːl/',
              phonetic: 'TRED PUUL',
              example: `Submitting short tasks to a shared thread pool avoids the per-task overhead of spawning and joining a fresh std::thread each time. = Inviare task brevi a un thread pool condiviso evita l'overhead per task di spawnare e fare join di un nuovo std::thread ogni volta.`,
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Work Stealing',
              italian: 'Furto di lavoro tra thread (work stealing)',
              pronunciation: '/wɜːrk ˈstiːlɪŋ/',
              phonetic: 'UORK STII-ling',
              example: `Idle TBB workers use work stealing to pull tasks from the back of a busy peer's deque, keeping all cores fed without central coordination. = I worker TBB inattivi usano il work stealing per prendere task dal fondo del deque di un peer occupato, tenendo tutti i core alimentati senza coordinazione centrale.`,
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Std Execution',
              italian: 'Politica di esecuzione parallela (std::execution)',
              pronunciation: '/ˌeksɪˈkjuːʃən/',
              phonetic: 'ek-si-KIU-scion',
              example:
                'std::execution policies enable parallelism. = Le policy std::execution abilitano parallelismo.',
              context: 'performance',
              difficulty: 'advanced',
              code: 'std::execution::par_unseq',
              task: 'Scegli la policy std::execution::par_unseq per autorizzare esecuzione parallela e vettorizzazione di un algoritmo STL.',
            },
          ],
        },
        {
          id: 'cpp_performance_4',
          title: 'Optimization Tricks / Trucchi di Ottimizzazione',
          description: 'Tecniche di ottimizzazione',
          items: [
            {
              english: 'Branch Prediction Hint',
              italian: 'Hint di branch prediction',
              pronunciation: '/brɑːntʃ/',
              phonetic: 'BRANC',
              example: `Annotating the error path with the [[unlikely]] branch prediction hint lets the compiler lay out the common case as straight-line code. = Annotare il percorso di errore con l'hint di branch prediction [[unlikely]] permette al compilatore di disporre il caso comune come codice lineare.`,
              context: 'performance',
              difficulty: 'advanced',
              code: `int process(int x) {
    if (x > 0) [[likely]] {
        return fast_path(x);
    } else [[unlikely]] {
        return slow_path(x);
    }
}`,
              note: 'Disponibile da C++20.',
              task: 'Annota il ramo comune con if (x) [[likely]] {} per dare al compilatore un hint di branch prediction.',
            },
            {
              english: 'Hot Path',
              italian: 'Percorso caldo del codice (hot path)',
              pronunciation: '/hɒt pæθ/',
              phonetic: 'HOT PAT',
              example: `Inlining the validation helper into the request hot path removes a function call from every packet handled at line rate. = Inlinare l'helper di validazione nell'hot path della richiesta rimuove una chiamata di funzione da ogni pacchetto gestito a piena velocita'.`,
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Inline Hint',
              italian: 'Hint inline',
              pronunciation: '/ˌɪnˈlaɪn/',
              phonetic: 'in-LAIN',
              example: `Adding the inline hint to a tiny accessor nudges the compiler to expand it at every call site instead of emitting an out-of-line function. = Aggiungere l'inline hint a un piccolo accessor spinge il compilatore a espanderlo a ogni call site invece di emettere una funzione fuori linea.`,
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Force Inline',
              italian: 'Forzare inlining (force inline)',
              pronunciation: '/fɔːrs/',
              phonetic: 'FORS',
              example:
                "__attribute__((always_inline)) forces inlining. = __attribute__((always_inline)) forza l'inlining.",
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'No Inline',
              italian: 'Vietare inlining (no inline)',
              pronunciation: '/noʊ ˌɪnˈlaɪn/',
              phonetic: 'NO in-LAIN',
              example:
                "__attribute__((noinline)) prevents inlining. = __attribute__((noinline)) impedisce l'inlining.",
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'Restrict',
              italian: 'Puntatore non aliasing (restrict)',
              pronunciation: '/rɪˈstrɪkt/',
              phonetic: 'ri-STRIKT',
              example:
                'Marking the output buffer with __restrict promises the compiler that input and output do not overlap, unlocking aggressive vectorization. = Marcare il buffer di output con __restrict promette al compilatore che input e output non si sovrappongono, sbloccando vettorizzazione aggressiva.',
              context: 'performance',
              difficulty: 'advanced',
              code: 'void f(int* __restrict a);',
              task: `Promuovi la vettorizzazione dichiarando void f(int* __restrict a); per garantire al compilatore l'assenza di aliasing.`,
            },
            {
              english: 'Profile Guided',
              italian: 'Guidato da profile',
              pronunciation: '/ˈproʊfaɪl ˈɡaɪdɪd/',
              phonetic: 'PRO-fail GAI-ded',
              example: `A profile guided optimization pass feeds real workload counters back into the second build so the compiler can rearrange hot blocks. = Una passata di ottimizzazione guidata da profile reimmette i contatori del carico reale nella seconda build cosi' il compilatore puo' riorganizzare i blocchi caldi.`,
              context: 'performance',
              difficulty: 'advanced',
              command: 'g++ -fprofile-use',
              note: 'Profile-Guided Optimization.',
              task: 'Riusa i contatori del run precedente compilando con g++ -fprofile-use per abilitare la profile-guided optimization.',
            },
            {
              english: 'Small Buffer Optimization',
              italian: 'Ottimizzazione buffer piccoli (small buffer optimization)',
              pronunciation: '/smɔːl ˈbʌfər/',
              phonetic: 'SMOOL BAF-fer',
              example: `std::string and std::function both rely on small buffer optimization to skip the heap when the contained value fits inline. = std::string e std::function si affidano entrambi alla small buffer optimization per saltare l'heap quando il valore contenuto sta inline.`,
              context: 'performance',
              difficulty: 'advanced',
              note: 'std::string usa SBO.',
            },
            {
              english: 'Empty Optimization',
              italian: 'Ottimizzazione vuoto',
              pronunciation: '/ˈempti/',
              phonetic: 'EMP-ti',
              example: `Inheriting from a stateless allocator instead of holding it as a member triggers empty base optimization and saves a pointer of footprint. = Ereditare da un allocatore senza stato invece di tenerlo come membro innesca l'empty base optimization e risparmia un puntatore di footprint.`,
              context: 'performance',
              difficulty: 'advanced',
            },
            {
              english: 'No Discard',
              italian: '[[nodiscard]] / risultato non scartabile',
              pronunciation: '/noʊ dɪˈskɑːrd/',
              phonetic: 'NO di-SKARD',
              example:
                '[[nodiscard]] warns if return is ignored. = [[nodiscard]] avvisa se il ritorno è ignorato.',
              context: 'performance',
              difficulty: 'advanced',
              code: `[[nodiscard]] int compute(int x) {
    return x * x;
}
// compute(5);      // warning: discarded
// int r = compute(5);  // OK`,
              task: 'Annota la funzione con [[nodiscard]] int compute(); per far avvisare il compilatore quando il chiamante ignora il risultato.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 21 - METAPROGRAMMAZIONE / METAPROGRAMMING
    // ════════════════════════════════════════════════
    21: {
      name: 'Metaprogrammazione / Metaprogramming',
      description: 'Programmazione a tempo di compilazione',
      lessons: [
        {
          id: 'cpp_metaprogramming_1',
          title: 'TMP / Template Metaprogramming',
          description: 'Metaprogrammazione a template',
          items: [
            {
              english: 'Template Metaprogramming',
              italian: 'Metaprogrammazione a template',
              pronunciation: '/ˈtemplət/',
              phonetic: 'TEM-plet',
              example:
                'Heavy template metaprogramming let Eigen pick the optimal matrix routine at compile time without paying runtime dispatch costs. = La pesante template metaprogramming ha permesso a Eigen di scegliere la routine matriciale ottimale a compile time senza pagare costi di dispatch runtime.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              note: 'Sigla TMP.',
            },
            {
              english: 'Metafunction',
              italian: 'Metafunzione',
              pronunciation: '/ˌmetəˈfʌŋkʃən/',
              phonetic: 'me-ta-FANK-scen',
              example:
                'Implementing remove_pointer as a recursive metafunction strips one level of indirection from a type at compile time. = Implementare remove_pointer come metafunzione ricorsiva rimuove un livello di indirezione da un tipo a compile time.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: `template<class T>
struct add_const {
    using type = const T;
};
using CI = add_const<int>::type;  // const int`,
              task: 'Dichiara una metafunzione template<class T> struct add_const; che mappa un tipo a una sua versione const a compile time.',
            },
            {
              english: 'Type List',
              italian: 'Lista di tipi',
              pronunciation: '/taɪp lɪst/',
              phonetic: 'TAIP LIST',
              example:
                'Storing the supported event handlers in a type list lets a single template generate registration code for every event without duplication. = Memorizzare gli handler di eventi supportati in una lista di tipi permette a un singolo template di generare codice di registrazione per ogni evento senza duplicazioni.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: 'template<class... Ts> struct list {};',
              task: 'Costruisci una lista di tipi vuota con template<class... Ts> struct list {}; come contenitore variadico per metaprogrammazione.',
            },
            {
              english: 'Compile Time Algorithm',
              italian: 'Algoritmo compile-time',
              pronunciation: '/ˈælɡərɪðəm/',
              phonetic: 'AL-go-ri-tem',
              example:
                'TMP can sort and search at compile time. = TMP può ordinare e cercare a compile time.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Higher Kinded',
              italian: 'Di ordine superiore (template) (higher-kinded)',
              pronunciation: '/ˈhaɪər ˈkaɪndɪd/',
              phonetic: 'HAI-er KAIN-ded',
              example:
                'Higher-kinded types parameterize templates. = I tipi higher-kinded parametrizzano template.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Recursive Template',
              italian: 'Template ricorsivo',
              pronunciation: '/rɪˈkɜːrsɪv/',
              phonetic: 'ri-KER-siv',
              example: `Computing the factorial of N with a recursive template that specializes on zero is the textbook example of compile-time recursion. = Calcolare il fattoriale di N con un template ricorsivo che si specializza su zero e' l'esempio da manuale di ricorsione a compile time.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Dispatch Tag Type',
              italian: 'Dispatch tag type',
              pronunciation: '/tæɡ/',
              phonetic: 'TAG',
              example:
                'Introducing a dispatch tag type like std::piecewise_construct_t lets std::pair pick a special constructor without ambiguous overload resolution. = Introdurre un dispatch tag type come std::piecewise_construct_t permette a std::pair di scegliere un costruttore speciale senza risoluzione di overload ambigua.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              note: `Rinominato per distinguerlo dall'item 'Tag Type' generico di cpp_patterns_4.`,
            },
            {
              english: 'Type Erasure Idiom',
              italian: 'Idioma di type erasure',
              pronunciation: '/ɪˈreɪʒər/',
              phonetic: 'i-REI-zer',
              example: `Implementing an Any class by hand showcases the type erasure idiom: a void pointer plus a small virtual table of operations on the concrete type. = Implementare a mano una classe Any mostra l'idioma di type erasure: un puntatore void piu' una piccola tabella virtuale di operazioni sul tipo concreto.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
              note: `Rinominato per distinguerlo dall'item 'Type Erasure' introduttivo in cpp_oop_10.`,
            },
            {
              english: 'Tuple Manipulation',
              italian: 'Manipolazione di tuple',
              pronunciation: '/ˈtuːpl/',
              phonetic: 'TUU-pol',
              example:
                'std::tuple supports compile-time indexing. = std::tuple supporta indicizzazione compile-time.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: 'std::get<0>(t);',
              task: `Estrai il primo elemento da una tupla t con std::get<0>(t); usando l'indicizzazione compile-time.`,
            },
            {
              english: 'Index Sequence',
              italian: 'Sequenza di indici (std::index_sequence)',
              pronunciation: '/ˈɪndeks ˈsiːkwəns/',
              phonetic: 'IN-deks SII-kuens',
              example:
                'Unpacking a tuple into a function call typically uses std::index_sequence to expand each element as a separate template argument. = Spacchettare una tupla in una chiamata di funzione usa tipicamente std::index_sequence per espandere ogni elemento come argomento template separato.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: `template<size_t... Is>
void print_tuple(const auto& t, std::index_sequence<Is...>) {
    ((std::cout << std::get<Is>(t) << ' '), ...);
}`,
              task: 'Genera una sequenza di indici 0..4 con std::make_index_sequence<5> per spacchettare una tupla in una chiamata.',
            },
          ],
        },
        {
          id: 'cpp_metaprogramming_2',
          title: 'Constexpr Programming / Programmazione Constexpr',
          description: 'Calcoli costanti a compile time',
          items: [
            {
              english: 'Constexpr Compile Time Computation',
              italian: 'Computazione a compile time con constexpr',
              pronunciation: '/ˌkɒmpjuːˈteɪʃən/',
              phonetic: 'kom-piu-TEI-scion',
              example:
                'Pushing CRC table generation into a constexpr compile time computation embeds the precomputed table directly into the binary as read-only data. = Spostare la generazione della tabella CRC in una computazione a compile time con constexpr incorpora la tabella precalcolata direttamente nel binario come dato di sola lettura.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: 'constexpr int n = factorial(5);',
              note: `Rinominato per distinguerlo dall'item 'Compile Time Computation' introduttivo in cpp_templates_8.`,
              task: 'Calcola fattoriale di 5 a compile time con constexpr int n = factorial(5); incorporando la costante direttamente nel binario.',
            },
            {
              english: 'Constexpr Variable',
              italian: 'Variabile constexpr',
              pronunciation: '/ˈveəriəbl/',
              phonetic: 'VE-ri-a-bol',
              example:
                'A constexpr variable is a compile-time constant. = Una variabile constexpr è costante a compile time.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: 'constexpr int N = 10;',
              task: 'Definisci una costante compile-time con constexpr int N = 10; utilizzabile come dimensione di array statici.',
            },
            {
              english: 'Compile Time If Branch',
              italian: 'Branch compile-time (if constexpr)',
              pronunciation: '/ɪf/',
              phonetic: 'IF',
              example:
                'A compile time if branch inside a serializer template picks the integer path or the string path with no dead-code instantiation for the rejected one. = Un branch compile-time dentro un template serializer sceglie il percorso intero o il percorso stringa senza istanziazione di codice morto per quello rifiutato.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: `template<class T>
void serialize(const T& val) {
    if constexpr (sizeof(T) <= 8)
        write_inline(val);
    else
        write_buffered(val);
}`,
              note: `Rinominato per distinguerlo dall'item 'Constexpr If' introduttivo in cpp_modern_cpp_5.`,
              task: 'Discrimina un branch a compile time con if constexpr (sizeof(T) == 4) {} per evitare istanziazione del ramo rifiutato.',
            },
            {
              english: 'Constexpr Metaprogramming Function',
              italian: 'Funzione constexpr di metaprogrammazione',
              pronunciation: '/ˈfʌŋkʃən/',
              phonetic: 'FANK-scen',
              example:
                'Replacing a recursive TMP factorial with a constexpr metaprogramming function written like ordinary C++ keeps compile times short and the code readable. = Sostituire un fattoriale TMP ricorsivo con una funzione constexpr di metaprogrammazione scritta come C++ ordinario tiene corti i tempi di compilazione e leggibile il codice.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              note: `Rinominato per distinguerlo dall'item 'Constexpr Function' introduttivo in cpp_templates_8.`,
            },
            {
              english: 'Compile Time String',
              italian: 'Stringa compile-time',
              pronunciation: '/strɪŋ/',
              phonetic: 'STRING',
              example:
                'Using a structural fixed_string as a compile time string lets a template be parameterized by a literal like "json-event" directly. = Usare una fixed_string strutturale come stringa compile-time permette a un template di essere parametrizzato da un literal come "json-event" direttamente.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Reflection',
              italian: 'Riflessione',
              pronunciation: '/rɪˈflekʃən/',
              phonetic: 'ri-FLEK-scion',
              example:
                'Library-level reflection in Boost.PFR auto-generates serialization for plain aggregates without macros or extra ceremony. = La reflection a livello di libreria in Boost.PFR genera automaticamente serializzazione per aggregati semplici senza macro o cerimonia extra.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              note: 'Pianificata per il futuro standard.',
            },
            {
              english: 'Static Reflection',
              italian: 'Riflessione statica',
              pronunciation: '/ˈstætɪk/',
              phonetic: 'STA-tik',
              example: `Once C++26 static reflection lands, iterating over the members of a struct at compile time will no longer require macros or codegen scripts. = Quando la static reflection di C++26 arrivera', iterare sui membri di una struct a compile time non richiedera' piu' macro o script di codegen.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Code Generation',
              italian: 'Generazione di codice',
              pronunciation: '/ˌdʒenəˈreɪʃən/',
              phonetic: 'gie-ne-REI-scion',
              example:
                'Templates generate code at compile time. = I template generano codice a compile time.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Compile Time Error',
              italian: 'Errore compile-time',
              pronunciation: '/ˈerər/',
              phonetic: 'ER-ror',
              example:
                'static_assert produces compile-time errors. = static_assert produce errori compile-time.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Type Computation',
              italian: 'Calcolo di tipo',
              pronunciation: '/ˌkɒmpjuːˈteɪʃən/',
              phonetic: 'kom-piu-TEI-scion',
              example:
                'A small type computation layer maps tuple<int, double, string> to tuple<vector<int>, vector<double>, vector<string>> for a columnar storage adapter. = Un piccolo strato di calcolo di tipo mappa tuple<int, double, string> a tuple<vector<int>, vector<double>, vector<string>> per un adapter di storage colonnare.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_metaprogramming_3',
          title: 'Type Traits Deep / Tratti di Tipo Approfonditi',
          description: 'Tratti di tipo avanzati',
          items: [
            {
              english: 'Is Constructible',
              italian: 'Verifica costruibilità di tipo (is_constructible)',
              pronunciation: '/kənˈstrʌktəbl/',
              phonetic: 'kon-STRAK-ta-bol',
              example:
                'is_constructible checks constructibility. = is_constructible verifica la costruibilità.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: 'std::is_constructible_v<T, int>',
              task: 'Verifica a compile time se T accetta un int come argomento con std::is_constructible_v<T, int> prima di istanziare la factory.',
            },
            {
              english: 'Is Trivial',
              italian: 'Verifica tipo triviale (is_trivial)',
              pronunciation: '/ˈtrɪviəl/',
              phonetic: 'TRI-vial',
              example: `Guarding a memcpy fast path with std::is_trivial_v<T> ensures the optimization only fires for types where bitwise copy is well-defined. = Proteggere un percorso veloce memcpy con std::is_trivial_v<T> assicura che l'ottimizzazione scatti solo per tipi dove la copia bit a bit e' ben definita.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: 'std::is_trivial_v<T>',
              task: `Proteggi un fast path memcpy con std::is_trivial_v<T> per usarlo solo quando la copia bit a bit e' lecita.`,
            },
            {
              english: 'Is Standard Layout',
              italian: 'Verifica layout standard del tipo (is_standard_layout)',
              pronunciation: '/ˈstændərd/',
              phonetic: 'STAN-dard',
              example:
                'Static asserting std::is_standard_layout_v<T> on a packet struct documents the ABI contract that C consumers can read its layout safely. = Affermare staticamente std::is_standard_layout_v<T> su una struct packet documenta il contratto ABI che i consumatori C possono leggerne il layout in sicurezza.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: 'std::is_standard_layout_v<T>',
              task: `Documenta il contratto ABI di una struct asserendo std::is_standard_layout_v<T> per garantire compatibilita' con consumatori C.`,
            },
            {
              english: 'Is Polymorphic',
              italian: 'Verifica tipo polimorfico (is_polymorphic)',
              pronunciation: '/ˌpɒlɪˈmɔːrfɪk/',
              phonetic: 'po-li-MOR-fik',
              example:
                'is_polymorphic detects virtual functions. = is_polymorphic rileva funzioni virtuali.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Is Convertible',
              italian: 'Verifica convertibilità tra tipi (is_convertible)',
              pronunciation: '/kənˈvɜːrtəbl/',
              phonetic: 'kon-VER-ta-bol',
              example:
                'Constraining a constructor with std::is_convertible_v<U, T> rejects narrowing conversions at the SFINAE layer instead of failing inside the body. = Vincolare un costruttore con std::is_convertible_v<U, T> rifiuta conversioni restringenti a livello SFINAE invece di fallire dentro il corpo.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Is Function',
              italian: 'Verifica tipo funzione (is_function)',
              pronunciation: '/ˈfʌŋkʃən/',
              phonetic: 'FANK-scen',
              example:
                'Wrapping a callable in a class requires std::is_function_v<T> to distinguish raw function types from function pointers and lambdas. = Avvolgere un callable in una classe richiede std::is_function_v<T> per distinguere tipi funzione raw da puntatori a funzione e lambda.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Conjunction',
              italian: 'AND logico tra trait (std::conjunction)',
              pronunciation: '/kənˈdʒʌŋkʃən/',
              phonetic: 'kon-GIUNK-scion',
              example:
                'std::conjunction does logical AND on traits. = std::conjunction fa AND logico su tratti.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: 'std::conjunction_v<A, B>',
              task: 'Combina due tratti in AND logico con std::conjunction_v<A, B> per costruire predicati compositi a compile time.',
            },
            {
              english: 'Disjunction',
              italian: 'OR logico tra trait (std::disjunction)',
              pronunciation: '/dɪsˈdʒʌŋkʃən/',
              phonetic: 'dis-GIUNK-scion',
              example:
                'std::disjunction does logical OR on traits. = std::disjunction fa OR logico su tratti.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Negation',
              italian: 'NOT logico di trait (std::negation)',
              pronunciation: '/nɪˈɡeɪʃən/',
              phonetic: 'ni-GHEI-scion',
              example: `Composing std::negation with std::is_same gives a readable predicate for "not exactly this type" inside an enable_if expression. = Comporre std::negation con std::is_same fornisce un predicato leggibile per "non esattamente questo tipo" dentro un'espressione enable_if.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Variable Trait',
              italian: 'Variabile di tratto',
              pronunciation: '/treɪt/',
              phonetic: 'TREIT',
              example: `Reaching for std::is_integral_v<T> instead of std::is_integral<T>::value is the variable trait spelling that C++17 added across the standard library. = Usare std::is_integral_v<T> invece di std::is_integral<T>::value e' la forma di variabile di tratto che C++17 ha aggiunto in tutta la libreria standard.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
              note: 'Disponibili da C++17.',
            },
          ],
        },
        {
          id: 'cpp_metaprogramming_4',
          title: 'Concepts Advanced / Concept Avanzati',
          description: 'Concept e librerie avanzate',
          items: [
            {
              english: 'Custom Concept',
              italian: 'Concept personalizzato',
              pronunciation: '/ˈkʌstəm/',
              phonetic: 'KAS-tom',
              example: `A custom concept Hashable<T> built around std::hash<T> spells out the exact contract that cache keys must satisfy at the API boundary. = Un concept personalizzato Hashable<T> costruito intorno a std::hash<T> esplicita il contratto esatto che le chiavi di cache devono soddisfare al bordo dell'API.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: `template<class T>
concept Sortable = requires(T t) {
    t.begin();
    t.end();
    std::sort(t.begin(), t.end());
};`,
              task: 'Definisci un concept personalizzato template<class T> concept Sortable = requires(T t) { std::sort(t.begin(), t.end()); };',
            },
            {
              english: 'Compound Requirement',
              italian: 'Requisito composto',
              pronunciation: '/ˈkɒmpaʊnd/',
              phonetic: 'KOM-paund',
              example:
                'A compound requirement checks return type. = Un requisito composto verifica il tipo di ritorno.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: `template<class T>
concept Hashable = requires(T t) {
    { std::hash<T>{}(t) } -> std::convertible_to<size_t>;
};`,
              task: 'Imponi che f() ritorni un tipo integrale con il requisito composto requires { { f() } -> std::integral; }.',
            },
            {
              english: 'Nested Requirement',
              italian: 'Requisito annidato',
              pronunciation: '/ˈnestɪd/',
              phonetic: 'NES-ted',
              example:
                'A nested requirement of the form requires sizeof(T) <= 16 inside a concept enforces a small-type invariant alongside the interface checks. = Un requisito annidato della forma requires sizeof(T) <= 16 dentro un concept impone un invariante di tipo piccolo accanto ai controlli di interfaccia.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: 'requires { requires sizeof(T) == 4; }',
              task: 'Aggiungi un requisito annidato requires { requires sizeof(T) == 4; } per esigere un tipo di esattamente 4 byte.',
            },
            {
              english: 'Type Requirement',
              italian: 'Requisito di tipo',
              pronunciation: '/taɪp/',
              phonetic: 'TAIP',
              example: `A type requirement like typename T::value_type inside requires{} forces the candidate to expose a value_type alias before the overload is considered. = Un requisito di tipo come typename T::value_type dentro requires{} forza il candidato a esporre un alias value_type prima che l'overload sia considerato.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: `template<class T>
concept Container = requires {
    typename T::value_type;
    typename T::iterator;
};`,
              task: 'Esigi che T esponga un alias value_type con il requisito di tipo requires { typename T::value_type; }.',
            },
            {
              english: 'Mp Eleven',
              italian: 'Boost.MP11',
              pronunciation: '/buːst em piː/',
              phonetic: 'BUUST-EM-PI',
              example: `Reaching for Boost.MP11 brings list, set, and map algorithms over type lists with an API that mirrors std::ranges for runtime values. = Ricorrere a Boost.MP11 porta algoritmi list, set e map su liste di tipi con un'API che rispecchia std::ranges per valori runtime.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
              tool: 'Boost.MP11',
            },
            {
              english: 'Boost Hana',
              italian: 'Libreria di metaprogrammazione (Boost.Hana)',
              pronunciation: '/buːst ˈhɑːnə/',
              phonetic: 'BUUST HA-na',
              example:
                'Boost.Hana lets you write metaprogramming code that looks like normal C++ by promoting types to first-class compile-time values. = Boost.Hana permette di scrivere codice di metaprogrammazione che assomiglia a C++ normale promuovendo i tipi a valori compile-time di prima classe.',
              context: 'metaprogramming',
              difficulty: 'advanced',
              tool: 'Boost.Hana',
            },
            {
              english: 'Metaprogramming Constexpr Lambda',
              italian: 'Lambda constexpr di metaprogrammazione',
              pronunciation: '/ˈlæmdə/',
              phonetic: 'LAM-da',
              example: `Encoding a small compile-time table generator as a metaprogramming constexpr lambda keeps the helper local to its caller without polluting any namespace. = Codificare un piccolo generatore di tabelle compile-time come lambda constexpr di metaprogrammazione tiene l'helper locale al suo chiamante senza inquinare alcun namespace.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: `constexpr auto sq = [](int x) { return x * x; };
static_assert(sq(5) == 25);
constexpr auto cube = [](int x) { return x * x * x; };`,
              note: `Rinominato per distinguerlo dall'item 'Constexpr Lambda' introduttivo in cpp_lambdas_3.`,
              task: 'Crea una lambda compile-time con auto sq = [](int x) constexpr { return x*x; }; utilizzabile in contesti constexpr.',
            },
            {
              english: 'Concepts Library',
              italian: 'Libreria di concept',
              pronunciation: '/ˈkɒnsepts/',
              phonetic: 'KON-septs',
              example: `Pulling from the standard concepts library gives you ready-made std::regular and std::invocable instead of hand-rolling each predicate. = Attingere dalla libreria di concept standard ti da' gia' pronti std::regular e std::invocable invece di scrivere a mano ogni predicato.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: '#include <concepts>',
              task: 'Importa la libreria di concept standard con #include <concepts> per riusare std::regular, std::invocable e gli altri.',
            },
            {
              english: 'Auto Deduction',
              italian: 'Deduzione auto',
              pronunciation: '/dɪˈdʌkʃən/',
              phonetic: 'di-DAK-scion',
              example:
                'Combining a concept name with auto deduction in sum(std::integral auto a, std::integral auto b) infers operand types under a constraint. = Combinare un nome di concept con la deduzione auto in sum(std::integral auto a, std::integral auto b) inferisce i tipi degli operandi sotto un vincolo.',
              context: 'metaprogramming',
              difficulty: 'advanced',
            },
            {
              english: 'Trailing Requires',
              italian: 'Requires finale',
              pronunciation: '/ˈtreɪlɪŋ/',
              phonetic: 'TREI-ling',
              example: `Placing a trailing requires after the parameter list lets you reuse the parameter names inside the constraint expression without restating them. = Mettere un trailing requires dopo la lista dei parametri permette di riutilizzare i nomi dei parametri dentro l'espressione di vincolo senza ripeterli.`,
              context: 'metaprogramming',
              difficulty: 'advanced',
              code: `template<class T>
T add(T a, T b) requires std::integral<T> {
    return a + b;
}`,
              task: 'Applica un vincolo dopo la firma con void f(T x) requires Number<T>; per riusare i nomi dei parametri.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 22 - TESTING C++ / TESTING C++
    // ════════════════════════════════════════════════
    22: {
      name: 'Testing C++ / Testing C++',
      description: 'Test e qualità del codice C++',
      lessons: [
        {
          id: 'cpp_testing_1',
          title: 'Google Test / Google Test',
          description: 'Framework di test Google Test',
          items: [
            {
              english: 'Google Test',
              italian: 'Framework di unit test (Google Test)',
              pronunciation: '/ˈɡuːɡl test/',
              phonetic: 'GUU-gol TEST',
              example:
                'The team chose Google Test for the matrix library because its rich matcher API makes assertion messages clear and readable. = Il team ha scelto Google Test per la libreria di matrici perché la sua ricca API di matcher rende i messaggi di asserzione chiari e leggibili.',
              context: 'testing',
              difficulty: 'advanced',
              tool: 'Google Test',
            },
            {
              english: 'Test Macro',
              italian: 'Macro di test',
              pronunciation: '/test ˈmækroʊ/',
              phonetic: 'TEST MA-kro',
              example:
                'Each GoogleTest test macro like TEST(Calculator, AddsPositives) generates a class and registers it with the global test runner. = Ogni macro di test GoogleTest come TEST(Calculator, AddsPositives) genera una classe e la registra con il test runner globale.',
              context: 'testing',
              difficulty: 'advanced',
              code: `TEST(MathTest, AddsTwo) {
    EXPECT_EQ(add(1, 2), 3);
    EXPECT_EQ(add(-1, 1), 0);
}`,
              task: 'Registra un test GoogleTest con TEST(MathTest, AddsTwo) { /* ... */ } generando una classe e collegandola al runner.',
            },
            {
              english: 'Expect',
              italian: 'EXPECT_* / asserzioni non fatali GTest',
              pronunciation: '/ɪkˈspekt/',
              phonetic: 'eks-PEKT',
              example: `Use EXPECT_EQ for assertions that should continue past a failure so a single test reports every broken expectation at once. = Usa EXPECT_EQ per asserzioni che dovrebbero continuare dopo un fallimento cosi' un singolo test riporta tutte le aspettative rotte in una volta.`,
              context: 'testing',
              difficulty: 'advanced',
              code: `TEST(CalcTest, Multiply) {
    EXPECT_EQ(mul(3, 4), 12);
    EXPECT_NE(mul(0, 5), 5);
    EXPECT_GT(mul(2, 3), 0);
}`,
              task: 'Verifica che add(1,2) restituisca 3 con EXPECT_EQ(add(1,2), 3); senza interrompere il test al fallimento.',
            },
            {
              english: 'Assert',
              italian: 'ASSERT_* / asserzioni fatali GTest',
              pronunciation: '/əˈsɜːrt/',
              phonetic: 'a-SERT',
              example: `Reach for ASSERT_TRUE on a precondition like a non-null pointer so subsequent lines never dereference garbage when the check fails. = Usa ASSERT_TRUE su una precondizione come un puntatore non nullo cosi' le righe successive non dereferenziano spazzatura quando il controllo fallisce.`,
              context: 'testing',
              difficulty: 'advanced',
              code: `TEST(PtrTest, NotNull) {
    auto p = create();
    ASSERT_NE(p, nullptr);  // fatal: stops if null
    EXPECT_EQ(p->value(), 42);
}`,
              task: 'Blocca subito il test su precondizione critica con ASSERT_NE(p, nullptr); per evitare dereferenze pericolose successive.',
            },
            {
              english: 'Test Fixture',
              italian: 'Fixture di test',
              pronunciation: '/ˈfɪkstʃər/',
              phonetic: 'FIK-scer',
              example:
                'Inheriting from a test fixture class lets every related case start from the same freshly seeded database without duplicating setup code. = Ereditare da una classe test fixture permette a ogni caso correlato di partire dallo stesso database appena seminato senza duplicare il codice di setup.',
              context: 'testing',
              difficulty: 'advanced',
              code: `class StackTest : public ::testing::Test {
protected:
    Stack<int> stack;
    void SetUp() override { stack.push(42); }
};
TEST_F(StackTest, Pop) { EXPECT_EQ(stack.pop(), 42); }`,
              task: 'Crea una fixture GoogleTest ereditando con class MyTest : public ::testing::Test {}; per condividere setup tra casi correlati.',
            },
            {
              english: 'Setup',
              italian: 'Preparazione del test (setup)',
              pronunciation: '/ˈsetʌp/',
              phonetic: 'SET-ap',
              example:
                'Overriding SetUp() on a GoogleTest fixture prepares per-test resources like a temp directory before the test body executes. = Overridare SetUp() su una fixture GoogleTest prepara risorse per test come una directory temporanea prima che il corpo del test esegua.',
              context: 'testing',
              difficulty: 'advanced',
            },
            {
              english: 'Teardown',
              italian: 'Pulizia post-test (teardown)',
              pronunciation: '/ˈtɪərdaʊn/',
              phonetic: 'TIR-daun',
              example: `Implementing TearDown() to delete the scratch files keeps the workspace clean between test cases regardless of which assertion failed. = Implementare TearDown() per cancellare i file di scratch tiene pulito il workspace tra i casi di test indipendentemente da quale asserzione e' fallita.`,
              context: 'testing',
              difficulty: 'advanced',
            },
            {
              english: 'Parameterized Test',
              italian: 'Test parametrizzato',
              pronunciation: '/pəˈræmɪtəraɪzd/',
              phonetic: 'pa-RA-mi-te-raizd',
              example:
                'A parameterized test that iterates over a vector of input/expected pairs cuts a dozen near-identical TEST blocks down to one. = Un test parametrizzato che itera su un vettore di coppie input/atteso riduce una dozzina di blocchi TEST quasi identici a uno solo.',
              context: 'testing',
              difficulty: 'advanced',
              code: 'INSTANTIATE_TEST_SUITE_P(...)',
              task: 'Itera su una serie di input con INSTANTIATE_TEST_SUITE_P(...) per generare un test parametrizzato da una sola dichiarazione.',
            },
            {
              english: 'Test Suite',
              italian: 'Suite di test',
              pronunciation: '/swiːt/',
              phonetic: 'SUIIT',
              example:
                'Grouping related cases under one test suite name lets you run --gtest_filter=Calculator.* to focus on a subsystem during development. = Raggruppare casi correlati sotto un nome di test suite permette di eseguire --gtest_filter=Calculator.* per focalizzarsi su un sottosistema durante lo sviluppo.',
              context: 'testing',
              difficulty: 'advanced',
            },
            {
              english: 'Death Test',
              italian: 'Test che verifica un crash atteso (death test)',
              pronunciation: '/deθ test/',
              phonetic: 'DET TEST',
              example:
                'Writing a death test with EXPECT_DEATH(launch(nullptr), "null channel") verifies that the production code aborts loudly on a contract violation. = Scrivere un death test con EXPECT_DEATH(launch(nullptr), "null channel") verifica che il codice di produzione aborti rumorosamente su una violazione di contratto.',
              context: 'testing',
              difficulty: 'advanced',
              code: 'EXPECT_DEATH(f(), "regex");',
              task: 'Verifica che f() abortisca con il messaggio atteso scrivendo EXPECT_DEATH(f(), "regex"); come death test GoogleTest.',
            },
          ],
        },
        {
          id: 'cpp_testing_2',
          title: 'Catch2 & Doctest / Catch2 e Doctest',
          description: 'Framework alternativi',
          items: [
            {
              english: 'Catch2',
              italian: 'Framework di unit test header-only (Catch2)',
              pronunciation: '/kætʃ tuː/',
              phonetic: 'KACI-TU',
              example:
                'The small utility library uses Catch2 because a single header include is enough to start writing tests without any build-system setup. = La piccola libreria di utilità usa Catch2 perché un singolo header include è sufficiente per iniziare a scrivere test senza alcuna configurazione del build system.',
              context: 'testing',
              difficulty: 'advanced',
              tool: 'Catch2',
            },
            {
              english: 'Doctest',
              italian: 'doctest',
              pronunciation: '/ˈdɒktest/',
              phonetic: 'DOK-test',
              example:
                'Dropping a single doctest header into a small library brings test cases, assertions, and a runner without pulling in CMake-level dependencies. = Mettere un singolo header doctest in una piccola libreria porta casi di test, asserzioni e un runner senza tirare dentro dipendenze a livello CMake.',
              context: 'testing',
              difficulty: 'advanced',
              tool: 'doctest',
              note: 'Termine italiano: doctest (nome del framework di test C++ leggero, non si traduce).',
            },
            {
              english: 'Test Case',
              italian: 'Caso di test (test case)',
              pronunciation: '/keɪs/',
              phonetic: 'KEIS',
              example: `Wrapping each scenario in its own TEST_CASE block keeps Catch2 reports easy to read and lets one failure not abort the whole binary. = Avvolgere ogni scenario nel proprio blocco TEST_CASE tiene i report di Catch2 facili da leggere e permette a un fallimento di non abortire l'intero binario.`,
              context: 'testing',
              difficulty: 'advanced',
              code: `TEST_CASE("vector operations") {
    std::vector<int> v;
    v.push_back(1);
    REQUIRE(v.size() == 1);
}`,
              task: 'Dichiara un caso di test Catch2 con TEST_CASE("adds two") { /* ... */ } per descriverne uno scenario isolato.',
            },
            {
              english: 'Section',
              italian: 'Sezione',
              pronunciation: '/ˈsekʃən/',
              phonetic: 'SEK-scion',
              example:
                'Splitting variations of a workflow into Catch2 SECTION blocks reuses the surrounding setup while reporting each branch as a distinct outcome. = Suddividere variazioni di un workflow in blocchi SECTION di Catch2 riusa il setup circostante riportando ogni ramo come un esito distinto.',
              context: 'testing',
              difficulty: 'advanced',
              code: `TEST_CASE("math") {
    SECTION("addition") {
        REQUIRE(add(1, 2) == 3);
    }
    SECTION("subtraction") {
        REQUIRE(sub(5, 3) == 2);
    }
}`,
              task: 'Suddividi le varianti di uno scenario Catch2 in SECTION("with zero") {} per riusare il setup circostante.',
            },
            {
              english: 'Require',
              italian: 'Asserzione critica Catch2 (REQUIRE)',
              pronunciation: '/rɪˈkwaɪər/',
              phonetic: 'ri-KUAIR',
              example:
                'Use REQUIRE for a precondition that must hold before the rest of the section runs, since a failure aborts the test case immediately. = Usa REQUIRE per una precondizione che deve valere prima che il resto della sezione esegua, dato che un fallimento aborta immediatamente il caso di test.',
              context: 'testing',
              difficulty: 'advanced',
              code: `TEST_CASE("string ops") {
    std::string s = "hello";
    REQUIRE(s.size() == 5);
    REQUIRE(s[0] == 'h');
}`,
              task: 'Affidati a REQUIRE(x == 5); come asserzione critica Catch2 che aborta immediatamente il caso al fallimento.',
            },
            {
              english: 'Check',
              italian: 'Asserzione non fatale Catch2 (CHECK)',
              pronunciation: '/tʃek/',
              phonetic: 'CEK',
              example:
                'Reach for CHECK when you want every related assertion to report a failure independently rather than stopping at the first broken expectation. = Usa CHECK quando vuoi che ogni asserzione correlata riporti un fallimento indipendentemente invece di fermarsi alla prima aspettativa rotta.',
              context: 'testing',
              difficulty: 'advanced',
              code: 'CHECK(x == 5);',
              task: `Continua dopo un fallimento usando CHECK(x == 5); come asserzione Catch2 non fatale per raccogliere piu' errori.`,
            },
            {
              english: 'Approx',
              italian: 'Confronto approssimato float (Approx)',
              pronunciation: '/əˈprɒks/',
              phonetic: 'a-PROKS',
              example:
                'The physics test wraps the expected velocity in Approx to tolerate tiny floating-point rounding differences. = Il test di fisica avvolge la velocità attesa in Approx per tollerare piccole differenze di arrotondamento in virgola mobile.',
              context: 'testing',
              difficulty: 'advanced',
              code: `TEST_CASE("floating point") {
    double result = compute_pi();
    REQUIRE(result == Approx(3.14159).epsilon(0.001));
}`,
              task: 'Tollera arrotondamenti in virgola mobile confrontando con REQUIRE(x == Approx(3.14)); nello scenario Catch2.',
            },
            {
              english: 'Tag',
              italian: 'Etichetta del test (tag)',
              pronunciation: '/tæɡ/',
              phonetic: 'TAG',
              example: `Annotating slow scenarios with the [slow] Catch2 tag lets CI run the fast subset on every commit and the full suite nightly. = Annotare scenari lenti con il tag Catch2 [slow] permette al CI di eseguire il sottoinsieme veloce a ogni commit e l'intera suite di notte.`,
              context: 'testing',
              difficulty: 'advanced',
              code: 'TEST_CASE("foo", "[fast]")',
              task: 'Etichetta uno scenario Catch2 con TEST_CASE("foo", "[fast]") per filtrarlo poi tramite tag in CI.',
            },
            {
              english: 'BDD Style',
              italian: 'Stile BDD',
              pronunciation: '/biː diː diː/',
              phonetic: 'BI-DI-DI',
              example:
                'Writing a Catch2 scenario in BDD style with GIVEN/WHEN/THEN clauses turns the test source into living documentation for non-engineers too. = Scrivere uno scenario Catch2 in stile BDD con clausole GIVEN/WHEN/THEN trasforma il sorgente del test in documentazione vivente anche per non ingegneri.',
              context: 'testing',
              difficulty: 'advanced',
              code: `SCENARIO("deposit money") {
    GIVEN("an empty account") {
        Account acc;
        WHEN("depositing 100") {
            acc.deposit(100);
            THEN("balance is 100") {
                REQUIRE(acc.balance() == 100);
            }
        }
    }
}`,
              task: 'Scrivi uno scenario Catch2 in stile BDD con GIVEN("..."); WHEN("..."); THEN("..."); leggibile anche da non ingegneri.',
            },
            {
              english: 'Header Only',
              italian: 'Libreria solo header (header-only)',
              pronunciation: '/ˈhedər ˈoʊnli/',
              phonetic: 'HED-er ON-li',
              example:
                'Shipping a small math utility as a header only library lets users drop one file into their tree without configuring any build system. = Distribuire una piccola utility matematica come libreria header-only permette agli utenti di mettere un file nel loro albero senza configurare alcun build system.',
              context: 'testing',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_testing_3',
          title: 'Mocking & Fuzzing / Mock e Fuzzing',
          description: 'Mock con gmock e fuzz testing',
          items: [
            {
              english: 'GMock',
              italian: 'Libreria mock di Google (GMock)',
              pronunciation: '/dʒiː mɒk/',
              phonetic: 'GI-MOK',
              example:
                'Building a fake payment gateway with GMock lets the checkout test simulate timeouts and refunds without touching the real network. = Costruire un finto gateway di pagamento con GMock permette al test di checkout di simulare timeout e rimborsi senza toccare la rete reale.',
              context: 'testing',
              difficulty: 'advanced',
              tool: 'gMock',
            },
            {
              english: 'Mock Class',
              italian: 'Classe mock',
              pronunciation: '/mɒk klɑːs/',
              phonetic: 'MOK KLAAS',
              example: `Generating a mock class that inherits from a pure-virtual interface lets the unit test inject scripted behavior in place of the real dependency. = Generare una classe mock che eredita da un'interfaccia puramente virtuale permette allo unit test di iniettare comportamento scriptato al posto della dipendenza reale.`,
              context: 'testing',
              difficulty: 'advanced',
              code: `class MockDb : public Database {
public:
    MOCK_METHOD(int, get, (std::string key), (override));
    MOCK_METHOD(void, put, (std::string, int), (override));
};`,
              task: 'Genera una classe mock con class MockDb : public Db { MOCK_METHOD(...); }; per iniettarla al posto della dipendenza reale.',
            },
            {
              english: 'Mock Method',
              italian: 'Metodo mock',
              pronunciation: '/ˈmeθəd/',
              phonetic: 'ME-tod',
              example:
                'Declaring each overridden function with MOCK_METHOD turns it into a configurable mock method that records calls and returns scripted values. = Dichiarare ogni funzione overridata con MOCK_METHOD la trasforma in un metodo mock configurabile che registra chiamate e restituisce valori scriptati.',
              context: 'testing',
              difficulty: 'advanced',
              code: `class MockLogger : public Logger {
public:
    MOCK_METHOD(void, log, (std::string msg), (override));
    MOCK_METHOD(int, level, (), (const, override));
};`,
              task: 'Dichiara un metodo mock overridabile con MOCK_METHOD(int, get, (), (override)); per registrare chiamate e ritornare valori scriptati.',
            },
            {
              english: 'Expectation',
              italian: 'Aspettativa',
              pronunciation: '/ˌekspekˈteɪʃən/',
              phonetic: 'ek-spek-TEI-scion',
              example: `Setting an EXPECT_CALL expectation that send_email() runs exactly once with a specific subject catches silent regressions in the notification path. = Impostare un'aspettativa EXPECT_CALL che send_email() esegua esattamente una volta con un soggetto specifico cattura regressioni silenziose nel percorso di notifica.`,
              context: 'testing',
              difficulty: 'advanced',
              code: `MockDb db;
EXPECT_CALL(db, get("key"))
    .Times(1)
    .WillOnce(Return(42));
Service svc(db);
EXPECT_EQ(svc.lookup("key"), 42);`,
              task: `Imposta un'aspettativa GoogleMock con EXPECT_CALL(db, get()).WillOnce(Return(5)); per scriptare il valore di ritorno.`,
            },
            {
              english: 'Stub',
              italian: 'Sostituto minimale (stub)',
              pronunciation: '/stʌb/',
              phonetic: 'STAB',
              example: `Swapping the production clock with a stub that always returns midnight makes timezone-related tests deterministic and easy to debug. = Sostituire l'orologio di produzione con uno stub che restituisce sempre mezzanotte rende deterministici e facili da debuggare i test legati ai fusi orari.`,
              context: 'testing',
              difficulty: 'advanced',
            },
            {
              english: 'Fake',
              italian: 'Sostituto funzionante (fake)',
              pronunciation: '/feɪk/',
              phonetic: 'FEIK',
              example:
                'A fake has working but simplified logic. = Un fake ha logica funzionante ma semplificata.',
              context: 'testing',
              difficulty: 'advanced',
            },
            {
              english: 'Fuzzing',
              italian: 'Test con input casuali (fuzzing)',
              pronunciation: '/ˈfʌzɪŋ/',
              phonetic: 'FAZ-zing',
              example:
                'The security team runs continuous fuzzing against the JSON parser to catch crashes triggered by malformed payloads. = Il team di sicurezza esegue fuzzing continuo contro il parser JSON per catturare crash causati da payload malformati.',
              context: 'testing',
              difficulty: 'advanced',
              tool: 'libFuzzer, AFL',
            },
            {
              english: 'LibFuzzer',
              italian: 'libFuzzer',
              pronunciation: '/lɪb ˈfʌzər/',
              phonetic: 'LIB FA-zer',
              example:
                'Wiring a parser entry point to libFuzzer and running for ten minutes uncovers crash inputs that hand-written tests had never imagined. = Collegare un entry point di parser a libFuzzer ed eseguirlo per dieci minuti scopre input di crash che i test scritti a mano non avevano mai immaginato.',
              context: 'testing',
              difficulty: 'advanced',
              command: 'clang++ -fsanitize=fuzzer',
              tool: 'libFuzzer',
              note: 'Termine italiano: libFuzzer (nome del fuzzer in-process di LLVM, non si traduce).',
              task: 'Compila un entry point fuzz-friendly con clang++ -fsanitize=fuzzer per integrarlo con libFuzzer di LLVM.',
            },
            {
              english: 'AFL',
              italian: 'Fuzzer guidato dalla copertura (AFL)',
              pronunciation: '/eɪ ef el/',
              phonetic: 'EI-EF-EL',
              example:
                'Running the image decoder through AFL for 48 hours uncovered two heap-overflow bugs that no unit test had caught. = Eseguire il decoder di immagini attraverso AFL per 48 ore ha scoperto due bug di heap-overflow che nessun test unitario aveva rilevato.',
              context: 'testing',
              difficulty: 'advanced',
              tool: 'AFL, AFL++',
            },
            {
              english: 'Property Test',
              italian: 'Test basato su proprietà (property test)',
              pronunciation: '/ˈprɒpərti test/',
              phonetic: 'PRO-per-ti TEST',
              example: `A rapidcheck property test asserts that serialize then deserialize round-trips any Order value, exploring far more inputs than a handful of examples. = Un property test in rapidcheck asserisce che serializzare poi deserializzare fa round-trip su qualunque valore Order, esplorando molti piu' input di una manciata di esempi.`,
              context: 'testing',
              difficulty: 'advanced',
              tool: 'rapidcheck',
            },
          ],
        },
        {
          id: 'cpp_testing_4',
          title: 'Quality & Coverage / Qualità e Copertura',
          description: 'Coverage, benchmark e qualità',
          items: [
            {
              english: 'Code Coverage',
              italian: 'Copertura del codice',
              pronunciation: '/ˈkʌvərɪdʒ/',
              phonetic: 'KA-ve-rig',
              example: `Failing the CI when code coverage drops below 80 percent on the parser module catches new branches that arrive without accompanying tests. = Far fallire il CI quando la copertura del codice scende sotto l'80 percento sul modulo parser cattura nuovi rami che arrivano senza test che li accompagnino.`,
              context: 'testing',
              difficulty: 'advanced',
              tool: 'gcov, lcov, llvm-cov',
            },
            {
              english: 'Gcov',
              italian: 'gcov',
              pronunciation: '/dʒiː kɒv/',
              phonetic: 'GI-KOV',
              example:
                'Compiling with --coverage and running gcov over the .gcda files produces a per-line execution count that highlights untested branches. = Compilare con --coverage ed eseguire gcov sui file .gcda produce un conteggio di esecuzione per riga che evidenzia rami non testati.',
              context: 'testing',
              difficulty: 'advanced',
              command: 'gcov main.cpp',
              tool: 'gcov',
              note: 'Termine italiano: gcov (nome del tool di copertura di GCC, non si traduce).',
              task: 'Genera il report di copertura per riga eseguendo gcov main.cpp sui file .gcda prodotti da una build instrumentata.',
            },
            {
              english: 'Lcov',
              italian: 'lcov',
              pronunciation: '/el kɒv/',
              phonetic: 'EL-KOV',
              example:
                'Piping gcov data through lcov and then genhtml produces a navigable HTML report that managers can browse without touching a terminal. = Passare i dati di gcov attraverso lcov e poi genhtml produce un report HTML navigabile che i manager possono sfogliare senza toccare un terminale.',
              context: 'testing',
              difficulty: 'advanced',
              tool: 'lcov',
              note: 'Termine italiano: lcov (nome del frontend di copertura, non si traduce).',
            },
            {
              english: 'Branch Coverage',
              italian: 'Copertura dei rami',
              pronunciation: '/brɑːntʃ/',
              phonetic: 'BRANC',
              example:
                'Insisting on branch coverage rather than just line coverage forces tests to exercise both sides of every if and switch statement explicitly. = Insistere sulla branch coverage piuttosto che solo sulla line coverage forza i test a esercitare esplicitamente entrambi i lati di ogni if e switch.',
              context: 'testing',
              difficulty: 'advanced',
            },
            {
              english: 'Line Coverage',
              italian: 'Copertura per riga',
              pronunciation: '/laɪn/',
              phonetic: 'LAIN',
              example: `Reaching high line coverage on the validation module gives at least basic confidence that no untested statement sneaks into a release build. = Raggiungere alta line coverage sul modulo di validazione da' almeno una fiducia di base che nessuno statement non testato si infili in una release build.`,
              context: 'testing',
              difficulty: 'advanced',
            },
            {
              english: 'Mutation Testing',
              italian: 'Test di mutazione',
              pronunciation: '/mjuːˈteɪʃən/',
              phonetic: 'miu-TEI-scion',
              example:
                'Running mutation testing with mull rewrites operators in the source and reports any mutant that the test suite still happily accepts. = Eseguire mutation testing con mull riscrive operatori nel sorgente e segnala ogni mutante che la suite di test accetta ancora felicemente.',
              context: 'testing',
              difficulty: 'advanced',
              tool: 'Mull',
            },
            {
              english: 'Benchmark',
              italian: 'Test prestazionale (benchmark)',
              pronunciation: '/ˈbentʃmɑːrk/',
              phonetic: 'BENC-mark',
              example: `Wrapping the hash insertion loop in a benchmark with google-benchmark gives a stable nanosecond figure to compare against future changes. = Avvolgere il loop di inserimento hash in un benchmark con google-benchmark da' una cifra stabile in nanosecondi da confrontare con cambiamenti futuri.`,
              context: 'testing',
              difficulty: 'advanced',
              tool: 'Google Benchmark',
            },
            {
              english: 'Regression Test',
              italian: 'Test di regressione',
              pronunciation: '/rɪˈɡreʃən/',
              phonetic: 'ri-GRES-scion',
              example: `Adding a focused regression test that replays the exact input from the bug report prevents the same crash from sneaking back in next quarter. = Aggiungere un test di regressione focalizzato che replica l'input esatto dal bug report impedisce allo stesso crash di rientrare il prossimo trimestre.`,
              context: 'testing',
              difficulty: 'advanced',
            },
            {
              english: 'CI Pipeline',
              italian: 'Pipeline CI',
              pronunciation: '/siː aɪ/',
              phonetic: 'SI-AI',
              example: `Splitting the CI pipeline into a fast build-and-unit-tests stage and a slow integration stage gives developers feedback within minutes on every push. = Suddividere la pipeline CI in uno stage build-and-unit-tests veloce e uno stage di integrazione lento da' agli sviluppatori feedback in pochi minuti su ogni push.`,
              context: 'testing',
              difficulty: 'advanced',
              tool: 'GitHub Actions, GitLab CI',
            },
            {
              english: 'Snapshot Test',
              italian: 'Test di snapshot',
              pronunciation: '/ˈsnæpʃɒt/',
              phonetic: 'SNAP-sciot',
              example: `Capturing the rendered HTML in a snapshot test and diffing future runs against the stored file catches accidental template regressions instantly. = Catturare l'HTML renderizzato in un test di snapshot e fare diff delle esecuzioni future contro il file salvato cattura istantaneamente regressioni accidentali del template.`,
              context: 'testing',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 23 - C++ PROFESSIONALE / PROFESSIONAL C++
    // ════════════════════════════════════════════════
    23: {
      name: 'C++ Professionale / Professional C++',
      description: 'Pratiche professionali e modernizzazione',
      lessons: [
        {
          id: 'cpp_foundations_9',
          title: 'Core Guidelines / Linee Guida Core',
          description: 'C++ Core Guidelines',
          items: [
            {
              english: 'Core Guidelines',
              italian: 'C++ Core Guidelines (linee guida ufficiali)',
              pronunciation: '/kɔːr ˈɡaɪdlaɪnz/',
              phonetic: 'KOR GAID-lainz',
              example:
                'C++ Core Guidelines codify best practice. = Le C++ Core Guidelines codificano le best practice.',
              context: 'foundations',
              difficulty: 'advanced',
              tool: 'C++ Core Guidelines',
              note: 'A cura di Bjarne Stroustrup e Herb Sutter.',
            },
            {
              english: 'GSL',
              italian: 'Libreria di supporto alle linee guida (GSL)',
              pronunciation: '/dʒiː es el/',
              phonetic: 'GI-ES-EL',
              example:
                'The team adopted GSL so that every owning pointer is annotated with gsl::owner and null violations are caught at compile time. = Il team ha adottato GSL così ogni puntatore proprietario è annotato con gsl::owner e le violazioni null vengono catturate a tempo di compilazione.',
              context: 'foundations',
              difficulty: 'advanced',
              code: `void process(gsl::span<int> data) {
    for (auto& x : data)
        x *= 2;
}
int arr[] = {1, 2, 3};
process(arr);`,
              tool: 'Microsoft GSL',
              task: 'Sostituisci un puntatore raw con una vista sicura gsl::span<int> s; dalla Guidelines Support Library.',
            },
            {
              english: 'Resource Pointer',
              italian: 'Puntatore risorsa',
              pronunciation: '/ˈriːsɔːrs/',
              phonetic: 'RI-sors',
              example:
                'Annotating a raw pointer parameter as gsl::owner<T*> declares it a resource pointer that the callee must eventually free or hand off. = Annotare un parametro puntatore raw come gsl::owner<T*> lo dichiara un puntatore risorsa che il chiamato deve eventualmente liberare o passare oltre.',
              context: 'foundations',
              difficulty: 'advanced',
              code: 'gsl::owner<T*> p;',
              task: `Annota un puntatore proprietario con gsl::owner<T*> p; per dichiarare chi e' responsabile della liberazione.`,
            },
            {
              english: 'Not Null',
              italian: 'Puntatore non nullo (gsl::not_null)',
              pronunciation: '/nɒt nʌl/',
              phonetic: 'NOT NAL',
              example:
                'Replacing a raw pointer parameter with gsl::not_null<Widget*> turns a runtime crash into a compile-time and construction-time contract. = Sostituire un parametro puntatore raw con gsl::not_null<Widget*> trasforma un crash a runtime in un contratto a compile time e in costruzione.',
              context: 'foundations',
              difficulty: 'advanced',
              code: `void draw(gsl::not_null<Widget*> w) {
    w->render();  // guaranteed non-null
}
// draw(nullptr);  // compile error`,
              task: 'Promuovi un puntatore a non nullo con gsl::not_null<T*> p; per spostare il controllo a costruzione.',
            },
            {
              english: 'Narrow Cast',
              italian: 'Cast restrittivo controllato (gsl::narrow_cast)',
              pronunciation: '/ˈnæroʊ/',
              phonetic: 'NA-ro',
              example:
                'Reaching for gsl::narrow_cast<int>(big_value) makes a narrowing conversion explicit and throws a runtime_error if it actually loses information. = Usare gsl::narrow_cast<int>(big_value) rende esplicita una conversione restringente e lancia un runtime_error se perde davvero informazione.',
              context: 'foundations',
              difficulty: 'advanced',
              code: `long big = 42;
auto small = gsl::narrow<int>(big);  // OK
// gsl::narrow<int>(1L << 40);  // throws: narrowing`,
              task: 'Rendi esplicita una conversione restringente con auto i = gsl::narrow<int>(big); lanciando se perde informazione.',
            },
            {
              english: 'Final Action',
              italian: 'Azione finale',
              pronunciation: '/ˈfaɪnl/',
              phonetic: 'FAI-nol',
              example: `Wrapping a temporary FILE handle in gsl::finally attaches a final action that closes it even if the next lines throw an exception. = Avvolgere un handle FILE temporaneo in gsl::finally collega un'azione finale che lo chiude anche se le righe successive lanciano un'eccezione.`,
              context: 'foundations',
              difficulty: 'advanced',
              code: `FILE* f = fopen("data.txt", "r");
auto cleanup = gsl::finally([&]{ fclose(f); });
// f is closed when cleanup goes out of scope`,
              task: `Aggancia un'azione di cleanup con auto cleanup = gsl::finally([&]{ /* ... */ }); che parte anche se eccezione.`,
            },
            {
              english: 'Compile Time Constants',
              italian: 'Costanti compile-time',
              pronunciation: '/ˈkɒnstənts/',
              phonetic: 'KONS-tants',
              example:
                'Preferring inline constexpr Pi over a macro keeps compile time constants type-safe, debuggable, and scoped to their namespace. = Preferire inline constexpr Pi a una macro tiene le costanti compile-time type-safe, debuggabili e con scope nel loro namespace.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Concrete Type',
              italian: 'Tipo concreto',
              pronunciation: '/ˈkɒŋkriːt taɪp/',
              phonetic: 'KON-kriit TAIP',
              example: `Returning a concrete type like Result<Order, Error> instead of a polymorphic base avoids virtual dispatch and clarifies ownership at the call site. = Restituire un tipo concreto come Result<Order, Error> invece di una base polimorfica evita il dispatch virtuale e chiarisce la proprieta' al call site.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Style Guide',
              italian: 'Guida di stile',
              pronunciation: '/staɪl ɡaɪd/',
              phonetic: 'STAIL GAID',
              example: `Adopting the Google C++ Style Guide as the team's style guide answers naming, header layout, and exception questions before they cause arguments. = Adottare la Google C++ Style Guide come guida di stile del team risponde a domande su naming, layout degli header ed eccezioni prima che causino discussioni.`,
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Esempi diffusi: Google C++ Style Guide, LLVM Coding Standards, C++ Core Guidelines.',
            },
            {
              english: 'Best Practice',
              italian: 'Pratica raccomandata (best practice)',
              pronunciation: '/best ˈpræktɪs/',
              phonetic: 'BEST PRAK-tis',
              example: `Treating "prefer std::string_view for non-owning string parameters" as a project best practice eliminates a whole class of allocation surprises. = Trattare "preferisci std::string_view per parametri stringa non-owning" come una best practice di progetto elimina un'intera classe di sorprese di allocazione.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_foundations_10',
          title: 'Sanitizers / Sanitizer',
          description: 'Strumenti di sanitizzazione',
          items: [
            {
              english: 'Sanitizer',
              italian: 'Strumento rilevazione errori a runtime (sanitizer)',
              pronunciation: '/ˈsænɪtaɪzər/',
              phonetic: 'SA-ni-tai-zer',
              example:
                'Rebuilding the test binary with a sanitizer enabled turns silent undefined behavior into a loud diagnostic the moment the bug executes. = Ricompilare il binario di test con un sanitizer abilitato trasforma comportamento indefinito silenzioso in una diagnostica rumorosa nel momento in cui il bug esegue.',
              context: 'foundations',
              difficulty: 'advanced',
              command: 'g++ -fsanitize=address',
              task: 'Strumenta il binario di test con g++ -fsanitize=address per intercettare bug di memoria al primo accesso illegale.',
            },
            {
              english: 'Address Sanitizer',
              italian: 'Sanitizer per memoria (AddressSanitizer)',
              pronunciation: '/əˈdres/',
              phonetic: 'a-DRES',
              example: `Compiling tests with -fsanitize=address routes every allocation through Address Sanitizer so heap overflows and use-after-frees abort immediately. = Compilare i test con -fsanitize=address instrada ogni allocazione attraverso Address Sanitizer cosi' overflow di heap e use-after-free abortiscono immediatamente.`,
              context: 'foundations',
              difficulty: 'advanced',
              command: '-fsanitize=address',
              tool: 'AddressSanitizer (ASan)',
              task: 'Attiva AddressSanitizer passando -fsanitize=address al compilatore per catturare overflow di heap e use-after-free.',
            },
            {
              english: 'Undefined Behavior Sanitizer',
              italian: 'Sanitizer per comportamento indefinito (UBSan)',
              pronunciation: '/ˌʌnˈdiːfaɪnd/',
              phonetic: 'an-di-FAIND',
              example: `Running -fsanitize=undefined turns on the Undefined Behavior Sanitizer that flags signed overflow, misaligned loads, and null this in real time. = Eseguire -fsanitize=undefined accende l'Undefined Behavior Sanitizer che segnala overflow signed, load disallineati e this nullo in tempo reale.`,
              context: 'foundations',
              difficulty: 'advanced',
              command: '-fsanitize=undefined',
              tool: 'UBSan',
              task: 'Accendi UBSan passando -fsanitize=undefined al compilatore per segnalare overflow signed e load disallineati a runtime.',
            },
            {
              english: 'Thread Sanitizer',
              italian: 'Sanitizer per data race (ThreadSanitizer)',
              pronunciation: '/θred/',
              phonetic: 'TRED',
              example:
                'Running the smoke test with -fsanitize=thread lets the Thread Sanitizer detect data races between the network reader and the cache mutator. = Eseguire lo smoke test con -fsanitize=thread permette al Thread Sanitizer di rilevare data race tra il network reader e il cache mutator.',
              context: 'foundations',
              difficulty: 'advanced',
              command: '-fsanitize=thread',
              tool: 'ThreadSanitizer (TSan)',
              task: 'Rileva data race tra thread compilando con -fsanitize=thread per attivare ThreadSanitizer durante lo smoke test.',
            },
            {
              english: 'Memory Sanitizer',
              italian: 'Sanitizer per memoria non inizializzata (MemorySanitizer)',
              pronunciation: '/ˈmemri/',
              phonetic: 'MEM-ri',
              example:
                'Building a debug binary with -fsanitize=memory turns on the Memory Sanitizer that traces reads of uninitialized bytes back to their origin. = Compilare un binario debug con -fsanitize=memory accende il Memory Sanitizer che traccia letture di byte non inizializzati fino alla loro origine.',
              context: 'foundations',
              difficulty: 'advanced',
              command: '-fsanitize=memory',
              tool: 'MemorySanitizer (MSan)',
              task: 'Traccia letture di byte non inizializzati compilando con -fsanitize=memory per accendere MemorySanitizer in debug.',
            },
            {
              english: 'Leak Sanitizer',
              italian: 'Sanitizer per perdite memoria (LeakSanitizer)',
              pronunciation: '/liːk/',
              phonetic: 'LIIK',
              example: `Enabling the Leak Sanitizer at program exit prints a stack trace for every allocation that nobody freed by the time main returned. = Abilitare il Leak Sanitizer all'uscita del programma stampa uno stack trace per ogni allocazione che nessuno ha liberato al ritorno di main.`,
              context: 'foundations',
              difficulty: 'advanced',
              command: '-fsanitize=leak',
              tool: 'LeakSanitizer (LSan)',
              task: 'Abilita LeakSanitizer aggiungendo -fsanitize=leak alla compilazione per stampare stack trace delle allocazioni mai liberate.',
            },
            {
              english: 'Static Analyzer',
              italian: 'Analizzatore statico',
              pronunciation: '/ˈænəlaɪzər/',
              phonetic: 'A-na-lai-zer',
              example:
                'Running a static analyzer like the Clang Static Analyzer in CI surfaces null dereferences and dead stores without executing a single test. = Eseguire un analizzatore statico come il Clang Static Analyzer in CI fa emergere null dereference e dead store senza eseguire un singolo test.',
              context: 'foundations',
              difficulty: 'advanced',
              tool: 'Clang Static Analyzer, Cppcheck',
            },
            {
              english: 'Clang Tidy',
              italian: 'Analizzatore statico e linter C++ (Clang-Tidy)',
              pronunciation: '/klæŋ ˈtaɪdi/',
              phonetic: 'KLANG TAI-di',
              example:
                'Enabling the modernize-* checks in Clang-Tidy on legacy code automatically suggests using auto, nullptr, and range-for in dozens of places at once. = Abilitare i check modernize-* di Clang-Tidy su codice legacy suggerisce automaticamente di usare auto, nullptr e range-for in decine di posti in una volta.',
              context: 'foundations',
              difficulty: 'advanced',
              command: 'clang-tidy main.cpp',
              tool: 'Clang-Tidy',
              task: 'Analizza main.cpp eseguendo clang-tidy main.cpp per ottenere suggerimenti di modernizzazione e check sui pattern legacy.',
            },
            {
              english: 'Cppcheck',
              italian: 'cppcheck',
              pronunciation: '/siː plʌs plʌs tʃek/',
              phonetic: 'SI-PLUS-PLUS CEK',
              example: `Running cppcheck nightly over the firmware tree catches uninitialized variables and dead code that the regular compiler warnings let through. = Eseguire cppcheck di notte sull'albero del firmware cattura variabili non inizializzate e codice morto che gli avvisi normali del compilatore lasciano passare.`,
              context: 'foundations',
              difficulty: 'advanced',
              command: 'cppcheck main.cpp',
              tool: 'Cppcheck',
              note: `Termine italiano: cppcheck (nome dell'analizzatore statico, non si traduce).`,
              task: `Sottoponi main.cpp all'analisi statica eseguendo cppcheck main.cpp per scoprire variabili non inizializzate e codice morto.`,
            },
            {
              english: 'Compiler Warning',
              italian: 'Avviso del compilatore',
              pronunciation: '/ˈwɔːrnɪŋ/',
              phonetic: 'UOR-ning',
              example:
                'Promoting every compiler warning to an error with -Werror forces the team to fix issues as soon as they appear instead of letting them accumulate. = Promuovere ogni avviso del compilatore a errore con -Werror forza il team a sistemare i problemi non appena appaiono invece di lasciarli accumulare.',
              context: 'foundations',
              difficulty: 'advanced',
              command: 'g++ -Werror',
              task: `Promuovi ogni warning a errore compilando con g++ -Werror per impedire l'accumulo di avvisi nel codice.`,
            },
          ],
        },
        {
          id: 'cpp_foundations_11',
          title: 'Modernization / Modernizzazione',
          description: 'Modernizzare codice C++ legacy',
          items: [
            {
              english: 'Legacy Code',
              italian: 'Codice legacy',
              pronunciation: '/ˈleɡəsi/',
              phonetic: 'LE-ga-si',
              example: `Approaching a legacy code module starts with adding a characterization test that pins down its current behavior before any refactoring begins. = Approcciare un modulo di codice legacy inizia con l'aggiungere un test di caratterizzazione che fissa il suo comportamento attuale prima di iniziare qualunque refactoring.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Modernize',
              italian: 'Modernizzare',
              pronunciation: '/ˈmɒdərnaɪz/',
              phonetic: 'MO-der-naiz',
              example:
                'clang-tidy modernize-* helps update code. = clang-tidy modernize-* aiuta ad aggiornare codice.',
              context: 'foundations',
              difficulty: 'advanced',
              command: 'clang-tidy --checks=modernize-*',
              task: 'Aggiorna codice legacy lanciando clang-tidy --checks=modernize-* per applicare auto, nullptr e range-for in massa.',
            },
            {
              english: 'Replace Auto Ptr',
              italian: 'Sostituire auto_ptr',
              pronunciation: '/ˈɔːtoʊ ˈpɔɪntər/',
              phonetic: 'OO-to POIN-ter',
              example: `A bulk replace auto_ptr to std::unique_ptr pass on a C++03 codebase removes the broken copy semantics and unlocks move-only ownership transfer. = Una passata di sostituzione massiva da auto_ptr a std::unique_ptr su un codebase C++03 rimuove la semantica di copia rotta e sblocca trasferimenti di proprieta' solo-move.`,
              context: 'foundations',
              difficulty: 'advanced',
              note: 'auto_ptr è stato rimosso in C++17.',
            },
            {
              english: 'Range Based',
              italian: 'Basato su intervalli (range-based)',
              pronunciation: '/reɪndʒ beɪst/',
              phonetic: 'REINGE BEIST',
              example: `Rewriting an index-counted for loop as a range based for over the container removes off-by-one bugs and reads closer to the original intent. = Riscrivere un for con indici come un for range-based sul container rimuove bug off-by-one e si legge piu' vicino all'intento originale.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'NULL to Nullptr',
              italian: 'Da NULL a nullptr',
              pronunciation: '/nʌl/',
              phonetic: 'NAL',
              example:
                'Sweeping NULL to nullptr across a C++03 codebase fixes ambiguous overload resolution when a function has both pointer and integer overloads. = Spazzare NULL a nullptr in un codebase C++03 risolve risoluzione di overload ambigua quando una funzione ha sia overload puntatore sia interi.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'C Style Cast',
              italian: 'Cast stile C',
              pronunciation: '/siː staɪl kɑːst/',
              phonetic: 'SI STAIL KAAST',
              example: `Replacing a C style cast with the appropriate static_cast or reinterpret_cast makes the intent explicit and is much easier to grep for later. = Sostituire un cast stile C con il static_cast o reinterpret_cast appropriato rende esplicito l'intento ed e' molto piu' facile da cercare con grep dopo.`,
              context: 'foundations',
              difficulty: 'advanced',
              code: 'static_cast<int>(x);',
              task: `Rimpiazza un cast stile C con static_cast<int>(x); per rendere esplicito l'intento e facilitare la ricerca.`,
            },
            {
              english: 'Use Auto',
              italian: 'Usa auto',
              pronunciation: '/ˈɔːtoʊ/',
              phonetic: 'OO-to',
              example:
                'Modernization tools recommend use auto for verbose iterator types like std::map<Key,Value>::const_iterator that add no info for the reader. = I tool di modernizzazione raccomandano usa auto per tipi di iteratore verbosi come std::map<Key,Value>::const_iterator che non aggiungono info al lettore.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Smart Pointer Migration',
              italian: 'Migrazione a smart pointer',
              pronunciation: '/maɪˈɡreɪʃən/',
              phonetic: 'mai-GREI-scion',
              example:
                'Migrate raw new/delete to smart pointers. = Migra new/delete raw a smart pointer.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Replace TypeDef',
              italian: 'Sostituire typedef',
              pronunciation: '/ˈtaɪpdef/',
              phonetic: 'TAIP-def',
              example: `Switching to replace typedef with using alias declarations enables templated aliases like template<class T> using Vec = std::vector<T> that typedef cannot express. = Passare a sostituire typedef con dichiarazioni di alias using abilita alias templatizzati come template<class T> using Vec = std::vector<T> che typedef non puo' esprimere.`,
              context: 'foundations',
              difficulty: 'advanced',
              code: `// old: typedef std::vector<int> IntList;
using IntList = std::vector<int>;
template<class T>
using Vec = std::vector<T>;  // alias template`,
              task: `Sostituisci un typedef vecchio con using IntList = std::vector<int>; per abilitare alias templatizzati piu' espressivi.`,
            },
            {
              english: 'Replace Enum',
              italian: 'Sostituire enum',
              pronunciation: '/ɪˈnʌm/',
              phonetic: 'i-NAM',
              example: `A replace enum with enum class sweep removes silent implicit conversions to int and forces qualified access to every enumerator. = Una sostituzione di enum con enum class rimuove conversioni implicite silenziose a int e forza l'accesso qualificato a ogni enumeratore.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cpp_foundations_12',
          title: 'Code Review & Quality / Code Review e Qualità',
          description: 'Code review e qualità professionale',
          items: [
            {
              english: 'Code Review',
              italian: 'Revisione del codice (code review)',
              pronunciation: '/koʊd rɪˈvjuː/',
              phonetic: 'KOUD ri-VIU',
              example: `Treating each code review as both quality control and a teaching moment quietly raises the whole team's baseline over the course of a quarter. = Trattare ogni code review come sia controllo qualita' sia momento di insegnamento alza silenziosamente la baseline dell'intero team nel corso di un trimestre.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Pull Request',
              italian: 'Richiesta di integrazione (pull request)',
              pronunciation: '/pʊl rɪˈkwest/',
              phonetic: 'PUL ri-KUEST',
              example: `Opening a small pull request scoped to one concern is much easier to review than a thousand-line dump that bundles unrelated changes together. = Aprire una pull request piccola e focalizzata su una preoccupazione e' molto piu' facile da revisionare di uno scarico di mille righe che impacchetta cambiamenti non correlati.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Merge Request',
              italian: 'Richiesta di fusione (GitLab) (merge request)',
              pronunciation: '/mɜːrdʒ rɪˈkwest/',
              phonetic: 'MERG ri-KUEST',
              example:
                'On GitLab the same workflow is called a merge request, and many teams gate them on green CI before reviewers are even allowed to approve. = Su GitLab lo stesso workflow si chiama merge request, e molti team le bloccano su CI verde prima ancora che i revisori possano approvare.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Pre-Commit Hook',
              italian: 'Hook pre-commit',
              pronunciation: '/priː kəˈmɪt/',
              phonetic: 'PRI ko-MIT',
              example:
                'Installing a pre-commit hook that runs clang-format and clang-tidy on staged files catches style and lint issues before they ever reach review. = Installare un hook pre-commit che esegue clang-format e clang-tidy sui file staged cattura problemi di stile e lint prima che raggiungano la review.',
              context: 'foundations',
              difficulty: 'advanced',
              tool: 'pre-commit',
            },
            {
              english: 'Format Check',
              italian: 'Verifica di formato',
              pronunciation: '/ˈfɔːrmæt tʃek/',
              phonetic: 'FOR-mat CEK',
              example:
                'Running a clang-format --dry-run --Werror format check in CI fails any PR whose files do not match the committed .clang-format style. = Eseguire un format check clang-format --dry-run --Werror in CI fa fallire ogni PR i cui file non corrispondono allo stile .clang-format committato.',
              context: 'foundations',
              difficulty: 'advanced',
              command: 'clang-format -i main.cpp',
              tool: 'clang-format',
              task: 'Forza la formattazione del sorgente eseguendo clang-format -i main.cpp per riallinearlo allo stile .clang-format del progetto.',
            },
            {
              english: 'Lint',
              italian: 'Analisi statica del codice (lint)',
              pronunciation: '/lɪnt/',
              phonetic: 'LINT',
              example:
                'Treating a clang-tidy lint warning the same as a compiler error keeps cruft like unused variables and risky casts out of the main branch. = Trattare un avviso di lint clang-tidy come un errore del compilatore tiene fuori dal branch principale schifezze come variabili non usate e cast rischiosi.',
              context: 'foundations',
              difficulty: 'advanced',
              tool: 'clang-tidy, cpplint',
            },
            {
              english: 'Clean Code',
              italian: 'Codice pulito',
              pronunciation: '/kliːn koʊd/',
              phonetic: 'KLIIN KOUD',
              example: `Refactoring a 400-line function into focused helpers is the kind of clean code work that pays back the team for years of future maintenance. = Rifattorizzare una funzione di 400 righe in helper focalizzati e' il tipo di lavoro di codice pulito che ripaga il team per anni di manutenzione futura.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Refactoring',
              italian: 'Ristrutturazione del codice (refactoring)',
              pronunciation: '/ˌriːˈfæktərɪŋ/',
              phonetic: 'ri-FAK-to-ring',
              example:
                'The team applied refactoring to split the 2000-line parser into smaller classes, keeping every test green throughout the process. = Il team ha applicato il refactoring per dividere il parser da 2000 righe in classi più piccole, mantenendo tutti i test verdi durante il processo.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Technical Debt',
              italian: 'Debito tecnico',
              pronunciation: '/ˈteknɪkl det/',
              phonetic: 'TEK-ni-kol DET',
              example: `Tracking technical debt as explicit tickets makes it visible at planning time instead of slowly strangling velocity in invisible ways. = Tracciare il debito tecnico come ticket espliciti lo rende visibile in fase di pianificazione invece di strangolare lentamente la velocita' in modi invisibili.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Pair Programming',
              italian: 'Programmazione in coppia (pair programming)',
              pronunciation: '/peər/',
              phonetic: 'PER',
              example: `Scheduling a few hours of pair programming on a thorny concurrency bug usually finds it faster than two engineers debugging in isolation. = Pianificare qualche ora di pair programming su un bug di concorrenza spinoso di solito lo trova piu' velocemente di due ingegneri che debuggano in isolamento.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
  },
};
