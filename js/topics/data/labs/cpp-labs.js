/**
 * C++ LABS - Knowledge AIO
 * ========================
 *
 * Declarative terminal-lab scripts for the `cpp` topic, keyed by lesson.id.
 * Consumed by LabEngine as the applied beat inside a LessonV2 lesson.
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabEngine compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is matched
 * by goal (setState), not by exact string, and a wrong command never aborts.
 *
 * Terminal flavour for this topic: g++ / cmake / make, real GCC 13 diagnostics
 * (fix-it notes, -Wreorder, -Wmaybe-uninitialized) and AddressSanitizer reports.
 * Every `stdout` below is modelled on genuine tool output — reading it IS the
 * lesson.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 */

export default {
  cpp_foundations_1: {
    title: 'Get the greeter talking',
    intro:
      'Primo giorno: il mentore ti lascia solo greet.cpp. / First day: your mentor leaves you nothing but greet.cpp. Read it, make it build, and prove it really writes a line to the terminal.',
    cwd0: '/home/dev/onboarding',
    vocab: [
      'Header',
      'Namespace',
      'std::cout',
      'std::cin',
      'Stream Insertion',
      'Stream Extraction',
      'Main Function',
      'Endline',
    ],
    requires: {
      source_read: true,
      missing_header: 'iostream',
      built: true,
      greeted: true,
      endline_seen: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Read the whole source file before you touch the compiler.',
        hintTerm: 'Header',
        accept: ['cat greet.cpp', 'cat ./greet.cpp', 'less greet.cpp'],
        acceptRe: ['^(cat|less|more|bat)\\s+\\.?/?greet\\.cpp$'],
        stdout:
          '#include <string>\n\nstd::string shout(const std::string& word) {\n    if (!word.empty()) {\n        return word + "!";\n    }\n}\n\nint main() {\n    std::string name;\n    std::cin >> name;\n    std::cout << "Hello, " << shout(name) << std::endl;\n    return 0;\n}',
        setState: { source_read: true },
        hints: [
          'Never compile code you have not read. Print the file to the screen first.',
          'One command, one argument: the file name.',
          'cat greet.cpp',
        ],
      },
      {
        id: 's2',
        promptEn: 'Build it with g++ into an executable called greet, and read what breaks.',
        hintTerm: 'std::cout',
        accept: ['g++ greet.cpp -o greet', 'g++ -o greet greet.cpp', 'g++ greet.cpp'],
        acceptRe: ['^g\\+\\+(?=\\s)(?=.*greet\\.cpp)(?!.*-include).*$'],
        stdout:
          "greet.cpp: In function 'int main()':\ngreet.cpp:11:10: error: 'cin' is not a member of 'std'\n   11 |     std::cin >> name;\n      |          ^~~\ngreet.cpp:1:1: note: 'std::cin' is defined in header '<iostream>'; did you forget to '#include <iostream>'?\n  +++ |+#include <iostream>\n    1 | #include <string>\ngreet.cpp:12:10: error: 'cout' is not a member of 'std'\n   12 |     std::cout << \"Hello, \" << shout(name) << std::endl;\n      |          ^~~~\ngreet.cpp:1:1: note: 'std::cout' is defined in header '<iostream>'; did you forget to '#include <iostream>'?\n  +++ |+#include <iostream>\n    1 | #include <string>\ngreet.cpp:12:51: error: 'endl' is not a member of 'std'\n   12 |     std::cout << \"Hello, \" << shout(name) << std::endl;\n      |                                                   ^~~~\ngreet.cpp:1:1: note: 'std::endl' is defined in header '<ostream>'; did you forget to '#include <ostream>'?\n  +++ |+#include <ostream>\n    1 | #include <string>",
        setState: { missing_header: 'iostream' },
        hints: [
          'The compiler is called g++. Give it the source and name the output binary.',
          'g++ <source> -o <name>',
          'g++ greet.cpp -o greet',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Without editing the file, tell g++ to pull in the missing header before line 1, and build greet.',
        hintTerm: 'Header',
        accept: [
          'g++ -include iostream greet.cpp -o greet',
          'g++ -include iostream -o greet greet.cpp',
          'g++ greet.cpp -include iostream -o greet',
        ],
        acceptRe: ['^g\\+\\+(?=\\s)(?=.*-include\\s+<?iostream>?)(?=.*greet\\.cpp).*$'],
        stdout:
          "greet.cpp: In function 'std::string shout(const std::string&)':\ngreet.cpp:7:1: warning: control reaches end of non-void function [-Wreturn-type]\n    7 | }\n      | ^",
        setState: { built: true },
        hints: [
          'g++ can inject a header from the command line, as if it were the first #include. One header fixes all three errors.',
          'The flag takes the header name as its argument: `g++ -include … greet.cpp -o greet`',
          'g++ -include iostream greet.cpp -o greet',
        ],
      },
      {
        id: 's4',
        promptEn: 'Run it, feeding the name into std::cin from the shell instead of typing it.',
        hintTerm: 'std::cin',
        accept: ['echo Giulia | ./greet', 'printf Giulia | ./greet', './greet <<< Giulia'],
        acceptRe: ['^(echo|printf)\\s+\\S+\\s*\\|\\s*\\.?/?greet$', '^\\.?/?greet\\s*<<<\\s*\\S+$'],
        stdout: 'Hello, Giulia!',
        setState: { greeted: true },
        hints: [
          'The program reads one word from standard input — the shell can supply it for you.',
          'Pipe something into the binary: `echo … | ./greet`',
          'echo Giulia | ./greet',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Prove std::endl really appended a newline byte: dump the raw bytes of the output.',
        hintTerm: 'Endline',
        accept: [
          'echo Giulia | ./greet | od -c',
          'echo Giulia | ./greet | xxd',
          'echo Giulia | ./greet | hexdump -C',
        ],
        acceptRe: ['greet\\s*\\|\\s*(od|xxd|hexdump)\\b'],
        stdout: '0000000   H   e   l   l   o   ,       G   i   u   l   i   a   !  \\n\n0000017',
        setState: { endline_seen: true },
        hints: [
          'A newline is invisible on screen — you need to look at the bytes themselves.',
          'Pipe the program output into a byte dumper: `… | od -c`',
          'echo Giulia | ./greet | od -c',
        ],
      },
    ],
  },

  cpp_foundations_3: {
    title: 'Rebuild the stats tool properly',
    intro:
      'Il collega dice "da me compila". / Your colleague says "it builds on my machine" and left no build script. Reproduce the build from scratch, turn the warnings on, and ship a release binary you can still debug.',
    cwd0: '/home/dev/stats',
    vocab: [
      'Compiler',
      'Standard Version',
      'Source File',
      'Object File',
      'Warning Flag',
      'Optimization Level',
      'Debug Symbols',
      'Linker',
      'Executable',
    ],
    requires: {
      compiler: 'g++-13',
      baseline_failed: true,
      object_built: true,
      release_built: true,
      verified: 'debug_info',
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Find out which compiler and which version this machine actually has.',
        hintTerm: 'Compiler',
        accept: ['g++ --version', 'g++ -v', 'g++ -dumpversion'],
        acceptRe: ['^g\\+\\+\\s+(--version|-v|-dumpversion)$'],
        stdout:
          'g++ (Ubuntu 13.2.0-4ubuntu3) 13.2.0\nCopyright (C) 2023 Free Software Foundation, Inc.\nThis is free software; see the source for copying conditions.  There is NO\nwarranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.',
        setState: { compiler: 'g++-13' },
        hints: [
          'Before you build anything, ask the toolchain who it is.',
          'Every GNU tool answers the same long flag.',
          'g++ --version',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Build both source files into build/stats the naive way, with no extra flags, and read the failure.',
        hintTerm: 'Source File',
        accept: [
          'g++ src/main.cpp src/stats.cpp -o build/stats',
          'g++ src/stats.cpp src/main.cpp -o build/stats',
          'g++ -o build/stats src/main.cpp src/stats.cpp',
        ],
        acceptRe: [
          '^g\\+\\+(?=\\s)(?!.*-std=)(?=.*src/main\\.cpp)(?=.*src/stats\\.cpp)(?=.*-o\\s+build/stats).*$',
          '^g\\+\\+(?=\\s)(?!.*-std=)(?=.*src/\\*\\.cpp)(?=.*-o\\s+build/stats).*$',
        ],
        stdout:
          "src/stats.cpp: In function 'double stats::median(std::vector<double>&)':\nsrc/stats.cpp:12:10: error: 'ranges' is not a member of 'std'\n   12 |     std::ranges::sort(values);\n      |          ^~~~~~\nsrc/stats.cpp:12:10: note: 'std::ranges' is only available from C++20 onwards",
        setState: { baseline_failed: true },
        hints: [
          'Hand both translation units to the compiler and name the output binary.',
          'g++ <file> <file> -o <path>',
          'g++ src/main.cpp src/stats.cpp -o build/stats',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Compile only stats.cpp into build/stats.o — no linking — forcing C++20 and the full warning set.',
        hintTerm: 'Object File',
        accept: [
          'g++ -std=c++20 -Wall -Wextra -c src/stats.cpp -o build/stats.o',
          'g++ -Wall -Wextra -std=c++20 -c src/stats.cpp -o build/stats.o',
          'g++ -std=c++20 -Wall -Wextra -c src/stats.cpp',
        ],
        acceptRe: [
          '^g\\+\\+(?=\\s)(?=.*-std=c\\+\\+20)(?=.*-wall)(?=.*\\s-c\\b)(?=.*src/stats\\.cpp).*$',
        ],
        stdout:
          "src/stats.cpp: In function 'double stats::mean(const std::vector<double>&, int)':\nsrc/stats.cpp:19:23: warning: comparison of integer expressions of different signedness: 'int' and 'std::vector<double>::size_type' {aka 'long unsigned int'} [-Wsign-compare]\n   19 |     for (int i = 0; i < values.size(); ++i) {\n      |                     ~~^~~~~~~~~~~~~~~\nsrc/stats.cpp:16:59: warning: unused parameter 'window' [-Wunused-parameter]\n   16 | double stats::mean(const std::vector<double>& values, int window) {\n      |                                                       ~~~~^~~~~~",
        setState: { object_built: true },
        hints: [
          'Three things at once: pick the language standard, ask for every warning, and stop before the linker runs.',
          'g++ -std=c++20 -Wall -Wextra -c … -o …',
          'g++ -std=c++20 -Wall -Wextra -c src/stats.cpp -o build/stats.o',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Link main.cpp against build/stats.o into build/stats: C++20, optimisation level 2, warnings on, and keep the debug symbols.',
        hintTerm: 'Optimization Level',
        accept: [
          'g++ -std=c++20 -O2 -g -Wall src/main.cpp build/stats.o -o build/stats',
          'g++ -std=c++20 -Wall -O2 -g src/main.cpp build/stats.o -o build/stats',
          'g++ -O2 -g -Wall -std=c++20 src/main.cpp build/stats.o -o build/stats',
        ],
        acceptRe: [
          '^g\\+\\+(?=\\s)(?=.*-std=c\\+\\+20)(?=.*-o2\\b)(?=.*\\s-g\\b)(?=.*-wall)(?=.*-o\\s+build/stats(\\s|$)).*$',
        ],
        stdout:
          "src/main.cpp: In function 'int main(int, char**)':\nsrc/main.cpp:24:35: warning: 'window' may be used uninitialized [-Wmaybe-uninitialized]\n   24 |     const double avg = stats::mean(samples, window);\n      |                        ~~~~~~~~~~~^~~~~~~~~~~~~~~~~\nsrc/main.cpp:19:9: note: 'window' was declared here\n   19 |     int window;\n      |         ^~~~~~",
        setState: { release_built: true },
        hints: [
          'Optimisation is a flag, debug information is another flag, and they are not mutually exclusive. GCC only finds this bug once the optimiser runs.',
          'g++ -std=c++20 -O2 -g -Wall … -o build/stats',
          'g++ -std=c++20 -O2 -g -Wall src/main.cpp build/stats.o -o build/stats',
        ],
      },
      {
        id: 's5',
        promptEn: 'Verify the shipped executable really carries the debug symbols you asked for.',
        hintTerm: 'Debug Symbols',
        accept: ['file build/stats', 'file ./build/stats'],
        acceptRe: ['^file\\s+\\.?/?build/stats$'],
        stdout:
          'build/stats: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=7c1f0ad3e9b24856, for GNU/Linux 3.2.0, with debug_info, not stripped',
        setState: { verified: 'debug_info' },
        hints: [
          'One tiny tool tells you what any binary is, and whether it was stripped.',
          'Three letters, then the path to the binary.',
          'file build/stats',
        ],
      },
    ],
  },

  cpp_foundations_2: {
    title: 'Find the memory bug the sanitizer sees',
    intro:
      'Il job notturno non crasha mai, eppure la RAM cala. / The nightly cache job never crashes, yet the box it runs on loses memory every night. Rebuild it under AddressSanitizer and let the tool show you the two bugs a clean-looking run is hiding.',
    cwd0: '/home/dev/cache',
    vocab: [
      'New Operator',
      'Delete Operator',
      'Array New',
      'Array Delete',
      'Heap',
      'Pointer',
      'Dereference',
    ],
    requires: {
      baseline_seen: true,
      source_read: true,
      asan_built: true,
      root_cause: 'alloc-dealloc-mismatch',
      leak_found: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Reproduce the nightly run: execute the release binary in bin/cache.',
        hintTerm: 'Heap',
        accept: ['./bin/cache', 'bin/cache'],
        acceptRe: ['^\\.?/?bin/cache$'],
        stdout: 'warming cache with 4 slots\nhead id 1',
        setState: { baseline_seen: true },
        hints: [
          'Start by watching the job work. Undefined behaviour rarely announces itself — exit code 0 is not proof of correctness.',
          'Execute the binary by path, from the current directory.',
          './bin/cache',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Nothing looked wrong. Read the source with line numbers, so the sanitizer line references will mean something.',
        hintTerm: 'Pointer',
        accept: ['cat -n src/cache.cpp', 'nl src/cache.cpp', 'nl -ba src/cache.cpp'],
        acceptRe: ['^(cat\\s+-n|nl)\\b.*cache\\.cpp$', '^cat\\s+\\.?/?src/cache\\.cpp$'],
        stdout:
          '     1\t#include <iostream>\n     2\t\n     3\tstruct Entry {\n     4\t    int id;\n     5\t    double score;\n     6\t};\n     7\t\n     8\tvoid load(int n) {\n     9\t    int* slots = new int[n];\n    10\t    for (int i = 0; i < n; ++i) {\n    11\t        slots[i] = i * 2;\n    12\t    }\n    13\t    std::cout << "warming cache with " << n << " slots" << std::endl;\n    14\t    delete slots;\n    15\t\n    16\t    Entry* head = new Entry{1, 0.5};\n    17\t    std::cout << "head id " << head->id << std::endl;\n    18\t}\n    19\t\n    20\tint main() {\n    21\t    load(4);\n    22\t    return 0;\n    23\t}',
        setState: { source_read: true },
        hints: [
          'Print the file, but ask for numbered lines this time.',
          'cat has a flag for that — or use `nl`.',
          'cat -n src/cache.cpp',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Rebuild the program into bin/cache-asan with debug info and AddressSanitizer enabled.',
        hintTerm: 'Delete Operator',
        accept: [
          'g++ -std=c++20 -g -fsanitize=address src/cache.cpp -o bin/cache-asan',
          'g++ -g -fsanitize=address src/cache.cpp -o bin/cache-asan',
          'g++ -fsanitize=address -g src/cache.cpp -o bin/cache-asan',
        ],
        acceptRe: [
          '^g\\+\\+(?=\\s)(?=.*-fsanitize=address)(?=.*src/cache\\.cpp)(?=.*-o\\s+\\.?/?bin/cache-asan).*$',
        ],
        stdout:
          "src/cache.cpp: In function 'void load(int)':\nsrc/cache.cpp:14:5: warning: 'void operator delete(void*, long unsigned int)' called on pointer returned from a mismatched allocation function [-Wmismatched-new-delete]\n   14 |     delete slots;\n      |     ^~~~~~~~~~~~\nsrc/cache.cpp:9:18: note: returned from 'void* operator new [](long unsigned int)'\n    9 |     int* slots = new int[n];\n      |                  ^~~~~~~~~~",
        setState: { asan_built: true },
        hints: [
          'AddressSanitizer is not a separate program: it is a compiler flag that instruments every heap access.',
          'g++ -g -fsanitize=… src/cache.cpp -o bin/cache-asan',
          'g++ -std=c++20 -g -fsanitize=address src/cache.cpp -o bin/cache-asan',
        ],
      },
      {
        id: 's4',
        promptEn: 'Run the instrumented binary and read the report it prints.',
        hintTerm: 'Array Delete',
        accept: ['./bin/cache-asan', 'bin/cache-asan'],
        acceptRe: ['^\\.?/?bin/cache-asan$'],
        stdout:
          "warming cache with 4 slots\n=================================================================\n==4812==ERROR: AddressSanitizer: alloc-dealloc-mismatch (operator new [] vs operator delete) on 0x604000000010\n    #0 0x7f2b1c4b8a1d in operator delete(void*, unsigned long) asan_new_delete.cpp:172\n    #1 0x55e9f0a2b3c7 in load(int) /home/dev/cache/src/cache.cpp:14\n    #2 0x55e9f0a2b4f2 in main /home/dev/cache/src/cache.cpp:21\n\n0x604000000010 is located 0 bytes inside of 16-byte region [0x604000000010,0x604000000020)\nallocated by thread T0 here:\n    #0 0x7f2b1c4b7e8f in operator new[](unsigned long) asan_new_delete.cpp:98\n    #1 0x55e9f0a2b3a1 in load(int) /home/dev/cache/src/cache.cpp:9\n\nSUMMARY: AddressSanitizer: alloc-dealloc-mismatch in operator delete(void*, unsigned long)\n==4812==HINT: if you don't care about these errors you may set ASAN_OPTIONS=alloc_dealloc_mismatch=0\n==4812==ABORTING",
        setState: { root_cause: 'alloc-dealloc-mismatch' },
        hints: [
          'The instrumented build is a normal executable — run it the same way you ran the first one.',
          'Execute the new binary by path.',
          './bin/cache-asan',
        ],
      },
      {
        id: 's5',
        promptEn:
          'The report tells you how to silence that one check. Use it to run to the end, and see what the second bug is.',
        hintTerm: 'New Operator',
        accept: [
          'ASAN_OPTIONS=alloc_dealloc_mismatch=0 ./bin/cache-asan',
          'env ASAN_OPTIONS=alloc_dealloc_mismatch=0 ./bin/cache-asan',
        ],
        acceptRe: [
          '^(env\\s+)?asan_options=\\S*alloc_dealloc_mismatch=0\\S*\\s+\\.?/?bin/cache-asan$',
        ],
        stdout:
          'warming cache with 4 slots\nhead id 1\n\n=================================================================\n==4907==ERROR: LeakSanitizer: detected memory leaks\n\nDirect leak of 16 byte(s) in 1 object(s) allocated from:\n    #0 0x7f4a9c2b7d9f in operator new(unsigned long) asan_new_delete.cpp:95\n    #1 0x561d3f8a24e1 in load(int) /home/dev/cache/src/cache.cpp:16\n    #2 0x561d3f8a2612 in main /home/dev/cache/src/cache.cpp:21\n\nSUMMARY: AddressSanitizer: 16 byte(s) leaked in 1 allocation(s).',
        setState: { leak_found: true },
        hints: [
          'Sanitizer behaviour is configured through one environment variable, set in front of the command.',
          'ASAN_OPTIONS=<option>=0 ./bin/cache-asan',
          'ASAN_OPTIONS=alloc_dealloc_mismatch=0 ./bin/cache-asan',
        ],
      },
    ],
  },

  cpp_oop_1: {
    title: 'Explain what the compiler made of your class',
    intro:
      'Il reviewer non si fida della tua classe. / A reviewer does not believe your Session class creates and destroys exactly one object per request. Open the class up — header, symbols, live trace — and answer with evidence.',
    cwd0: '/home/dev/session',
    vocab: [
      'Class Definition',
      'Constructor',
      'Destructor',
      'Member Variable',
      'Member Function',
      'Member Initializer List',
      'This Pointer',
      'Object Instance',
    ],
    requires: {
      class_read: true,
      reorder_seen: true,
      symbols_listed: true,
      demangled: 'destructor',
      linked: true,
      traced: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Read the class definition in include/session.hpp.',
        hintTerm: 'Class Definition',
        accept: ['cat include/session.hpp', 'less include/session.hpp'],
        acceptRe: ['^(cat|less|more|bat)\\s+\\.?/?include/session\\.hpp$'],
        stdout:
          '#pragma once\n#include <string>\n\nclass Session {\npublic:\n    Session(std::string user, int retries);\n    ~Session();\n\n    void touch();\n    int hits() const;\n\nprivate:\n    std::string user_;\n    int retries_;\n    int hits_ = 0;\n};',
        setState: { class_read: true },
        hints: [
          'The declaration of a class lives in its header, not in the .cpp file.',
          'Print the header: `cat include/…`',
          'cat include/session.hpp',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Compile src/session.cpp into build/session.o with -Wall -Wextra and the include directory, and read the warning about the constructor.',
        hintTerm: 'Member Initializer List',
        accept: [
          'g++ -std=c++20 -Wall -Wextra -Iinclude -c src/session.cpp -o build/session.o',
          'g++ -Wall -Wextra -Iinclude -c src/session.cpp -o build/session.o',
          'g++ -std=c++20 -Wall -Wextra -I include -c src/session.cpp -o build/session.o',
          'g++ -std=c++20 -Wall -Wextra -Iinclude -c src/session.cpp',
        ],
        acceptRe: [
          '^g\\+\\+(?=\\s)(?=.*-wall)(?=.*\\s-c\\b)(?=.*src/session\\.cpp)(?=.*-i\\s?include\\b).*$',
        ],
        stdout:
          "src/session.cpp: In constructor 'Session::Session(std::string, int)':\ninclude/session.hpp:14:9: warning: 'Session::retries_' will be initialized after [-Wreorder]\n   14 |     int retries_;\n      |         ^~~~~~~~\ninclude/session.hpp:13:17: warning:   'std::string Session::user_' [-Wreorder]\n   13 |     std::string user_;\n      |                 ^~~~~\nsrc/session.cpp:4:10: note:   when initialized here\n    4 | Session::Session(std::string user, int retries)\n      |          ^~~~~~~",
        setState: { reorder_seen: true },
        hints: [
          'Members are always initialised in declaration order, whatever order you wrote them in — the compiler will point back at the header when the two disagree.',
          'g++ -Wall -Wextra -Iinclude -c src/session.cpp -o build/session.o',
          'g++ -std=c++20 -Wall -Wextra -Iinclude -c src/session.cpp -o build/session.o',
        ],
      },
      {
        id: 's3',
        promptEn:
          'List the symbols in build/session.o with the C++ names demangled, and see what the compiler actually emitted for the class.',
        hintTerm: 'Member Function',
        accept: [
          'nm -C build/session.o',
          'nm --demangle build/session.o',
          'nm -C build/session.o | grep Session',
        ],
        acceptRe: ['^nm\\s+(-c|--demangle)\\b.*build/session\\.o'],
        stdout:
          '0000000000000108 T Session::touch()\n0000000000000000 T Session::Session(std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int)\n000000000000004a T Session::Session(std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int)\n0000000000000094 T Session::~Session()\n00000000000000c0 T Session::~Session()\n000000000000015c T Session::hits() const\n                 U operator delete(void*, unsigned long)\n                 U std::__throw_logic_error(char const*)',
        setState: { symbols_listed: true },
        hints: [
          'There is a tool that lists the symbol table of an object file, and a flag that turns mangled C++ names back into readable ones.',
          'nm -C <object file>',
          'nm -C build/session.o',
        ],
      },
      {
        id: 's4',
        promptEn:
          'The CI linker log shows the raw symbol _ZN7SessionD1Ev. Turn that mangled name back into C++.',
        hintTerm: 'Destructor',
        accept: ['c++filt _ZN7SessionD1Ev', 'echo _ZN7SessionD1Ev | c++filt'],
        acceptRe: ['c\\+\\+filt.*_ZN7SessionD1Ev', '_ZN7SessionD1Ev.*c\\+\\+filt'],
        stdout: 'Session::~Session()',
        setState: { demangled: 'destructor' },
        hints: [
          'The same demangling that nm did with a flag is available as a standalone tool.',
          'Its name ends in `filt` and starts like the language.',
          'c++filt _ZN7SessionD1Ev',
        ],
      },
      {
        id: 's5',
        promptEn: 'Build the demo executable that links your object file (the Makefile target).',
        hintTerm: 'Object Instance',
        accept: ['make demo', 'make'],
        acceptRe: ['^make(\\s+-\\S+)*(\\s+demo)?$'],
        stdout:
          'g++ -std=c++20 -Wall -Wextra -Iinclude -c src/main.cpp -o build/main.o\ng++ -std=c++20 -Wall -Wextra build/main.o build/session.o -o build/demo',
        setState: { linked: true },
        hints: [
          'You do not have to retype the compile line — the repo already describes it.',
          'Four letters, plus the target name.',
          'make demo',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Run the demo and read the constructor / destructor trace — that is your evidence for the reviewer.',
        hintTerm: 'This Pointer',
        accept: ['./build/demo', 'build/demo'],
        acceptRe: ['^\\.?/?build/demo$'],
        stdout:
          '[ctor] Session this=0x7ffd2a4c1e30 user="giulia" retries=3\n[touch] this=0x7ffd2a4c1e30 hits=1\n[touch] this=0x7ffd2a4c1e30 hits=2\n[dtor] ~Session this=0x7ffd2a4c1e30 hits=2\nconstructed 1, destroyed 1',
        setState: { traced: true },
        hints: [
          'The proof is at runtime: the object prints its own address on the way in and on the way out.',
          'Execute the freshly linked binary by path.',
          './build/demo',
        ],
      },
    ],
  },
};
