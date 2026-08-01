/**
 * C PROGRAMMING LABS - Knowledge AIO
 * ==================================
 *
 * Declarative terminal-lab scripts for the C topic, keyed by lesson.id and
 * consumed by LabEngine (js/topics/lab/LabEngine.js).
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabEngine compiles them with
 * `new RegExp`; no functions, no eval). Steps are matched by GOAL, so any
 * reasonable phrasing that reaches the step's goal clears it, and a wrong
 * command never aborts the run.
 *
 * The teaching payload is the `stdout`: every block below is real gcc / nm / ld
 * / valgrind / gdb output for the source shown, so the learner reads authentic
 * toolchain English rather than a paraphrase of it.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 */

export default {
  c_foundations_1: {
    title: 'Build and run your very first program',
    intro:
      'Hai appena clonato il repo del corso: un solo file .c, nessun eseguibile. / You just cloned the course repo: one source file, no binary. Read it, compile it, run it, and prove that main really did return 0.',
    cwd0: '/home/dev/first-steps',
    vocab: ['Source Code', 'Header File', 'Compiler', 'printf', 'Return Value'],
    requires: { built: true, ran: true, exit_checked: true },
    steps: [
      {
        id: 's1',
        promptEn: 'Print the source file greet.c to the screen so you can read it before building.',
        hintTerm: 'Source Code',
        accept: ['cat greet.c'],
        acceptRe: ['^(cat|less|more)\\s+greet\\.c\\b'],
        stdout:
          '#include <stdio.h>\n\nint main(void) {\n    int count = 3;\n    printf("Hello, Knowledge AIO!\\n");\n    return 0;\n}',
        setState: { read_source: true },
        hints: [
          'Look at what the file actually contains before you hand it to the compiler.',
          'One short command dumps a whole file to standard output.',
          'cat greet.c',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Show the line that pulls in the header file, so you can see where printf is declared.',
        hintTerm: 'Header File',
        accept: ['grep -n include greet.c', 'grep -n "#include" greet.c', 'head -1 greet.c'],
        acceptRe: ['^grep\\b.*include.*greet\\.c', '^head\\s+-n?\\s*1\\s+greet\\.c'],
        stdout: '1:#include <stdio.h>',
        setState: { header_found: true },
        hints: [
          'printf is not a keyword of the language — something has to declare it first.',
          'Search the file for the line that includes a header, and ask for line numbers.',
          'grep -n include greet.c',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Compile greet.c into an executable called greet, with the basic warnings turned on.',
        hintTerm: 'Compiler',
        accept: [
          'gcc -Wall greet.c -o greet',
          'gcc -Wall -o greet greet.c',
          'gcc greet.c -o greet',
        ],
        acceptRe: [
          '^gcc\\s+.*greet\\.c.*-o\\s+greet\\b',
          '^gcc\\s+.*-o\\s+greet\\s+.*greet\\.c\\b',
        ],
        stdout:
          "greet.c: In function 'main':\ngreet.c:4:9: warning: unused variable 'count' [-Wunused-variable]\n    4 |     int count = 3;\n      |         ^~~~~",
        setState: { built: true },
        hints: [
          'The compiler turns your source code into a binary — and it will comment on sloppy code if you ask it to.',
          'gcc takes the source file, -o names the output, -Wall switches the common warnings on.',
          'gcc -Wall greet.c -o greet',
        ],
      },
      {
        id: 's4',
        promptEn: 'Run the program you just built.',
        hintTerm: 'printf',
        accept: ['./greet'],
        acceptRe: ['^\\./greet$'],
        stdout: 'Hello, Knowledge AIO!',
        setState: { ran: true },
        hints: [
          'The binary sits in this directory, and this directory is not on your PATH.',
          'Give the program name a path that starts from where you are.',
          './greet',
        ],
      },
      {
        id: 's5',
        promptEn: 'Show the value that main returned to the shell.',
        hintTerm: 'Return Value',
        accept: ['echo $?'],
        acceptRe: ['^echo\\s+\\$\\?$'],
        stdout: '0',
        setState: { exit_checked: true },
        hints: [
          'main handed a number back when it finished, and the shell kept it.',
          'Use echo with the special variable that holds the status of the last command.',
          'echo $?',
        ],
      },
    ],
  },

  c_foundations_3: {
    title: 'Follow one file from preprocessor to binary',
    intro:
      'La build di calc.c si rompe, ma non sai in quale fase. / The build of calc.c breaks, but you do not know at which stage. Walk it through the toolchain one step at a time — preprocess, compile, link — and let the tools name the culprit.',
    cwd0: '/home/dev/build-lab',
    vocab: ['Preprocessor', 'Object File', 'Linking', 'Library', 'Executable', 'Warning'],
    requires: { object_built: true, link_failed: true, linked: true, ran: true },
    steps: [
      {
        id: 's1',
        promptEn:
          'Stop gcc after the first stage and show the first 15 lines of what it produced, without compiling.',
        hintTerm: 'Preprocessor',
        accept: ['gcc -E calc.c | head -15', 'gcc -E calc.c | head', 'cpp calc.c | head -15'],
        acceptRe: ['^gcc\\s+-e\\b.*calc\\.c\\s*\\|\\s*head', '^cpp\\s+calc\\.c\\s*\\|\\s*head'],
        stdout:
          '# 0 "calc.c"\n# 0 "<built-in>"\n# 0 "<command-line>"\n# 1 "/usr/include/stdc-predef.h" 1 3 4\n# 0 "<command-line>" 2\n# 1 "calc.c"\n# 1 "/usr/include/stdio.h" 1 3 4\n# 27 "/usr/include/stdio.h" 3 4\n# 1 "/usr/include/x86_64-linux-gnu/bits/libc-header-start.h" 1 3 4\n# 33 "/usr/include/x86_64-linux-gnu/bits/libc-header-start.h" 3 4\n# 1 "/usr/include/features.h" 1 3 4\n# 392 "/usr/include/features.h" 3 4\n# 1 "/usr/include/features-time64.h" 1 3 4\n# 20 "/usr/include/features-time64.h" 3 4\n# 1 "/usr/include/x86_64-linux-gnu/bits/wordsize.h" 1 3 4',
        setState: { preprocessed: true },
        hints: [
          'The first stage only expands #include and #define — it produces text, not machine code.',
          'gcc has a flag that stops right after that stage and writes the expanded text to standard output; pipe it into head.',
          'gcc -E calc.c | head -15',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Compile calc.c to an object file only — do not link yet — and keep the warnings on.',
        hintTerm: 'Object File',
        accept: ['gcc -Wall -c calc.c', 'gcc -c -Wall calc.c', 'gcc -c calc.c'],
        acceptRe: ['^gcc\\s+.*-c\\b.*calc\\.c'],
        stdout:
          "calc.c: In function 'main':\ncalc.c:10:20: warning: format '%d' expects argument of type 'int', but argument 2 has type 'double' [-Wformat=]\n   10 |     printf(\"area = %d\\n\", area);\n      |                    ~^     ~~~~\n      |                     |     |\n      |                     int   double\n      |                    %f",
        setState: { object_built: true },
        hints: [
          'You want the compiler to produce calc.o and stop before the linker runs.',
          'gcc has a single-letter flag for "compile only, do not link".',
          'gcc -Wall -c calc.c',
        ],
      },
      {
        id: 's3',
        promptEn:
          'List the symbols inside calc.o and find the ones still marked U — undefined, i.e. supplied by someone else.',
        hintTerm: 'Linking',
        accept: ['nm calc.o', 'nm -u calc.o', 'nm --undefined-only calc.o'],
        acceptRe: ['^nm\\b.*calc\\.o\\b'],
        stdout: '0000000000000000 T main\n                 U printf\n                 U sqrt',
        setState: { symbols_seen: true },
        hints: [
          'An object file is not self-contained: it lists the names it still expects from elsewhere.',
          'There is a small binutils tool whose whole job is printing symbol tables.',
          'nm calc.o',
        ],
      },
      {
        id: 's4',
        promptEn: 'Try to link calc.o into an executable called calc.',
        hintTerm: 'Linking',
        accept: ['gcc calc.o -o calc', 'gcc -o calc calc.o'],
        acceptRe: ['^gcc\\s+calc\\.o\\s+-o\\s+calc\\s*$', '^gcc\\s+-o\\s+calc\\s+calc\\.o\\s*$'],
        stdout:
          "/usr/bin/ld: calc.o: in function `main':\ncalc.c:(.text+0x62): undefined reference to `sqrt'\ncollect2: error: ld returned 1 exit status",
        setState: { link_failed: true },
        hints: [
          'The object file is ready; now ask the toolchain to resolve those U symbols into one binary.',
          'Call gcc with the .o file instead of the .c file, and name the output with -o.',
          'gcc calc.o -o calc',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Rebuild calc.c straight to the executable calc, this time also linking the math library that provides sqrt.',
        hintTerm: 'Library',
        accept: [
          'gcc -Wall calc.c -o calc -lm',
          'gcc calc.c -o calc -lm',
          'gcc -Wall -o calc calc.c -lm',
        ],
        acceptRe: ['^gcc\\s+.*calc\\.c.*-lm\\b', '^gcc\\s+.*-lm\\b.*calc\\.c\\b'],
        stdout:
          "calc.c: In function 'main':\ncalc.c:10:20: warning: format '%d' expects argument of type 'int', but argument 2 has type 'double' [-Wformat=]\n   10 |     printf(\"area = %d\\n\", area);\n      |                    ~^     ~~~~\n      |                     |     |\n      |                     int   double\n      |                    %f",
        setState: { linked: true },
        hints: [
          'sqrt does not live in your file, and it does not live in the C runtime the linker uses by default either.',
          'Add the two-character flag that links libm to your normal gcc build line.',
          'gcc -Wall calc.c -o calc -lm',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Run calc and compare the two printed lines — one of them is exactly what the format warning predicted.',
        hintTerm: 'Executable',
        accept: ['./calc'],
        acceptRe: ['^\\./calc$'],
        stdout: 'area = 1719614413\ndiagonal = 9.22',
        setState: { ran: true },
        hints: [
          'The binary exists now — run it and read the numbers critically.',
          'Run the freshly linked program from the current directory.',
          './calc',
        ],
      },
    ],
  },

  c_foundations_4: {
    title: 'Chase a total that changes on every run',
    intro:
      'Un collega giura che lo stesso programma stampa un totale diverso ogni volta. / A colleague swears the same program prints a different total every time. The declaration is there and the assignment is there — what is missing sits between them.',
    cwd0: '/home/dev/reports',
    vocab: ['Declaration', 'Initialization', 'Assignment', 'Data Type'],
    requires: { warned: true, valgrind_seen: true, diffed: true, verified: true },
    steps: [
      {
        id: 's1',
        promptEn: 'Run the program your colleague shipped and note the total it prints.',
        hintTerm: 'Definition',
        accept: ['./totals'],
        acceptRe: ['^\\./totals$'],
        stdout: 'total = 32759',
        setState: { ran_once: true },
        hints: [
          'Start by reproducing the bug instead of reading the code.',
          'The binary is already built in this directory.',
          './totals',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Run exactly the same program a second time. Nothing changed, so the number should not change either.',
        hintTerm: 'Definition',
        accept: ['./totals'],
        acceptRe: ['^\\./totals$'],
        stdout: 'total = 21877',
        setState: { ran_twice: true },
        hints: [
          'A deterministic program run twice on the same input must print the same thing.',
          'Repeat the previous command without touching anything.',
          './totals',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Rebuild totals.c with -Wall and -Wextra so the compiler explains where the instability comes from.',
        hintTerm: 'Initialization',
        accept: [
          'gcc -Wall -Wextra totals.c -o totals',
          'gcc -Wextra -Wall totals.c -o totals',
          'gcc -Wall totals.c -o totals',
        ],
        acceptRe: ['^gcc\\s+.*-wall\\b.*totals\\.c.*-o\\s+totals\\b'],
        stdout:
          "totals.c: In function 'main':\ntotals.c:8:15: warning: 'total' is used uninitialized [-Wuninitialized]\n    8 |         total += values[i];\n      |         ~~~~~~^~~~~~~~~~~~\ntotals.c:5:9: note: 'total' was declared here\n    5 |     int total;\n      |         ^~~~~",
        setState: { warned: true },
        hints: [
          'The compiler can often see this class of bug — but only when you ask it for the full warning set.',
          'Rebuild with gcc and add both the basic and the extra warning flags.',
          'gcc -Wall -Wextra totals.c -o totals',
        ],
      },
      {
        id: 's4',
        promptEn: 'Confirm the same bug at runtime with the memory-error detector.',
        hintTerm: 'Declaration',
        accept: ['valgrind ./totals', 'valgrind --leak-check=full ./totals'],
        acceptRe: ['^valgrind\\b.*\\./totals\\b'],
        stdout:
          "==4711== Memcheck, a memory error detector\n==4711== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.\n==4711== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info\n==4711== Command: ./totals\n==4711==\n==4711== Use of uninitialised value of size 8\n==4711==    at 0x48EF0DA: _itoa_word (_itoa.c:177)\n==4711==    by 0x48F2A3D: __vfprintf_internal (vfprintf-internal.c:1687)\n==4711==    by 0x48DDEBE: printf (printf.c:33)\n==4711==    by 0x1091B9: main (totals.c:11)\n==4711==\ntotal = 21\n==4711==\n==4711== HEAP SUMMARY:\n==4711==     in use at exit: 0 bytes in 0 blocks\n==4711==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated\n==4711==\n==4711== All heap blocks were freed -- no leaks are possible\n==4711==\n==4711== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)",
        setState: { valgrind_seen: true },
        hints: [
          'There is a tool that runs the binary under instrumentation and reports every read of memory nobody wrote.',
          'Prefix the program with the memcheck tool: valgrind ...',
          'valgrind ./totals',
        ],
      },
      {
        id: 's5',
        promptEn:
          'A reviewer left a corrected copy as totals_fixed.c. Compare the two files line by line.',
        hintTerm: 'Assignment',
        accept: ['diff totals.c totals_fixed.c', 'diff -u totals.c totals_fixed.c'],
        acceptRe: ['^diff\\b.*totals\\.c.*totals_fixed\\.c'],
        stdout: '5c5\n<     int total;\n---\n>     int total = 0;',
        setState: { diffed: true },
        hints: [
          'Do not read both files by hand — ask the shell which lines actually differ.',
          'The classic three-letter comparison tool takes the two file names.',
          'diff totals.c totals_fixed.c',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Build the corrected file over the old binary and re-run it under valgrind in a single command line, to prove the error is gone.',
        hintTerm: 'Initialization',
        accept: [
          'gcc -Wall -Wextra totals_fixed.c -o totals && valgrind ./totals',
          'gcc -Wall totals_fixed.c -o totals && valgrind ./totals',
        ],
        acceptRe: ['^gcc\\b.*totals_fixed\\.c.*(&&|;)\\s*valgrind\\b.*\\./totals\\b'],
        stdout:
          "==4823== Memcheck, a memory error detector\n==4823== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.\n==4823== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info\n==4823== Command: ./totals\n==4823==\ntotal = 21\n==4823==\n==4823== HEAP SUMMARY:\n==4823==     in use at exit: 0 bytes in 0 blocks\n==4823==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated\n==4823==\n==4823== All heap blocks were freed -- no leaks are possible\n==4823==\n==4823== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)",
        setState: { verified: true },
        hints: [
          'Two commands, one line: compile the fixed source over the same output name, then run it under the checker.',
          'Join the gcc build and the valgrind run with && so the second only runs if the first succeeds.',
          'gcc -Wall -Wextra totals_fixed.c -o totals && valgrind ./totals',
        ],
      },
    ],
  },

  c_control_3: {
    title: 'The countdown that never reaches liftoff',
    intro:
      'Il job di CI va in timeout: il countdown non arriva mai a liftoff. / The CI job times out — the countdown never reaches liftoff. The loop body is fine; the loop condition is the problem.',
    cwd0: '/home/dev/timer',
    vocab: ['For Loop', 'Loop Condition', 'Loop Counter', 'Iteration', 'Infinite Loop'],
    requires: { warned: true, wrap_proven: true, patched: true, fixed: true },
    steps: [
      {
        id: 's1',
        promptEn:
          'Peek at the first 15 lines the program prints, without letting it flood your terminal.',
        hintTerm: 'Infinite Loop',
        accept: ['./countdown | head -15', 'timeout 3 ./countdown | head -15'],
        acceptRe: ['\\./countdown\\s*\\|\\s*head', '^timeout\\s+\\d+s?\\s+\\./countdown\\s*$'],
        stdout:
          'tick 10\ntick 9\ntick 8\ntick 7\ntick 6\ntick 5\ntick 4\ntick 3\ntick 2\ntick 1\ntick 0\ntick 4294967295\ntick 4294967294\ntick 4294967293\ntick 4294967292',
        setState: { hang_seen: true },
        hints: [
          'You need to see the output without waiting for a loop that never ends.',
          'Pipe the program into the tool that prints only the first N lines.',
          './countdown | head -15',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Rebuild countdown.c with -Wall and -Wextra, and read what gcc says about the loop condition.',
        hintTerm: 'Loop Condition',
        accept: [
          'gcc -Wall -Wextra countdown.c -o countdown',
          'gcc -Wextra -Wall countdown.c -o countdown',
        ],
        acceptRe: ['^gcc\\s+.*-wextra\\b.*countdown\\.c', '^gcc\\s+.*countdown\\.c.*-wextra\\b'],
        stdout:
          "countdown.c: In function 'main':\ncountdown.c:6:20: warning: comparison of unsigned expression in '>= 0' is always true [-Wtype-limits]\n    6 |     for (i = 10; i >= 0; i--) {\n      |                    ^~",
        setState: { warned: true },
        hints: [
          'The compiler already knows this comparison can never be false — it just does not say so by default.',
          'Rebuild with gcc and add both warning flags; the interesting one lives in the extra set.',
          'gcc -Wall -Wextra countdown.c -o countdown',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Under gdb, stop on the printf line (countdown.c:7) at the first iteration and print the loop counter.',
        hintTerm: 'Loop Counter',
        accept: [
          "gdb -q --batch -ex 'break countdown.c:7' -ex run -ex 'print i' ./countdown",
          'gdb -q --batch -ex "break countdown.c:7" -ex run -ex "print i" ./countdown',
        ],
        acceptRe: ['^gdb\\b.*break\\b.*7.*run.*print\\s+i.*countdown'],
        stdout:
          'Breakpoint 1 at 0x1169: file countdown.c, line 7.\n\nBreakpoint 1, main () at countdown.c:7\n7\t        printf("tick %u\\n", i);\n$1 = 10\n[Inferior 1 (process 5123) killed]',
        setState: { first_iteration: true },
        hints: [
          'Run the program under the debugger, stop it inside the loop body, and ask for the value of the counter.',
          'Use gdb in batch mode: gdb -q --batch -ex ... -ex run -ex ... ./countdown',
          "gdb -q --batch -ex 'break countdown.c:7' -ex run -ex 'print i' ./countdown",
        ],
      },
      {
        id: 's4',
        promptEn:
          'Now set a conditional breakpoint that only fires once the counter has wrapped around (i > 4294967000), and print it again.',
        hintTerm: 'Iteration',
        accept: [
          "gdb -q --batch -ex 'break countdown.c:7 if i > 4294967000' -ex run -ex 'print i' ./countdown",
          'gdb -q --batch -ex "break countdown.c:7 if i > 4294967000" -ex run -ex "print i" ./countdown',
        ],
        acceptRe: ['^gdb\\b.*break\\b.*if\\s+i\\s*>.*run.*print\\s+i.*countdown'],
        stdout:
          'Breakpoint 1 at 0x1169: file countdown.c, line 7.\ntick 10\ntick 9\ntick 8\ntick 7\ntick 6\ntick 5\ntick 4\ntick 3\ntick 2\ntick 1\ntick 0\n\nBreakpoint 1, main () at countdown.c:7\n7\t        printf("tick %u\\n", i);\n$1 = 4294967295\n[Inferior 1 (process 5140) killed]',
        setState: { wrap_proven: true },
        hints: [
          'You do not want to stop at every iteration — only at the one where the counter went below zero and became huge.',
          'A gdb breakpoint accepts a condition: break FILE:LINE if EXPRESSION.',
          "gdb -q --batch -ex 'break countdown.c:7 if i > 4294967000' -ex run -ex 'print i' ./countdown",
        ],
      },
      {
        id: 's5',
        promptEn:
          'Apply the prepared patch fix-countdown.patch, which makes the counter a signed int and switches the format to %d.',
        hintTerm: 'For Loop',
        accept: [
          'patch countdown.c < fix-countdown.patch',
          'patch -p0 < fix-countdown.patch',
          'patch < fix-countdown.patch',
        ],
        acceptRe: ['^patch\\b.*fix-countdown\\.patch'],
        stdout: 'patching file countdown.c',
        setState: { patched: true },
        hints: [
          'The fix is already written; you only have to apply it to the source file.',
          'The classic tool reads a diff on standard input: patch ... < fix-countdown.patch',
          'patch countdown.c < fix-countdown.patch',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Rebuild and run it in one command line to confirm the loop now terminates and reaches liftoff.',
        hintTerm: 'Loop Condition',
        accept: [
          'gcc -Wall -Wextra countdown.c -o countdown && ./countdown',
          'gcc -Wall countdown.c -o countdown && ./countdown',
        ],
        acceptRe: ['^gcc\\b.*countdown\\.c.*(&&|;)\\s*\\./countdown\\s*$'],
        stdout:
          'tick 10\ntick 9\ntick 8\ntick 7\ntick 6\ntick 5\ntick 4\ntick 3\ntick 2\ntick 1\ntick 0\nliftoff',
        setState: { fixed: true },
        hints: [
          'The source changed, so the old binary is stale — build it again before you trust the output.',
          'Join the gcc build and the run with && on one line.',
          'gcc -Wall -Wextra countdown.c -o countdown && ./countdown',
        ],
      },
    ],
  },
};
