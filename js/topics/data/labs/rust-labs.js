/**
 * RUST LABS - Knowledge AIO
 * =========================
 *
 * Declarative terminal-lab scripts for the `rust` topic, keyed by lesson.id.
 * Consumed by LabEngine as the applied beat inside a LessonV2 lesson.
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabEngine compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is matched
 * by goal (setState), not by exact string, and a wrong command never aborts.
 *
 * The teaching payload here is the toolchain output itself: cargo status lines
 * and real rustc/clippy diagnostics with their error codes, carets and `help:`
 * suggestions. Learners read authentic English technical output.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints? }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 */

export default {
  // ─── Level 0 · Cargo & Crates — scaffold, inspect, depend ──────────────
  rust_foundations_2: {
    title: 'Scaffold a crate and pull in a dependency',
    intro:
      'Il team ti ha lasciato una cartella vuota per un nuovo tool. / Your team left you an empty folder for a temperature logger. Turn it into a real Cargo package, run it, then pull one crate down from crates.io.',
    cwd0: '/home/dev/temp_tracker',
    vocab: ['Cargo', 'Cargo New', 'Cargo.toml', 'Edition', 'Cargo Run', 'Crate', 'Cargo Build'],
    requires: {
      scaffolded: true,
      manifest_read: true,
      ran: true,
      dep_added: true,
      built: true,
      locked: true,
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'Turn this empty folder into a Cargo package, in place (the sibling of `cargo new`).',
        hintTerm: 'Cargo New',
        accept: ['cargo init', 'cargo init --bin', 'cargo init .', 'cargo new .'],
        acceptRe: ['^cargo\\s+init\\b', '^cargo\\s+new\\s+\\.\\s*$'],
        stdout:
          '    Creating binary (application) package\nnote: see more `Cargo.toml` keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html',
        setState: { scaffolded: true },
        hints: [
          'Cargo can create the package right here, without making a sub-folder for it.',
          'Start with `cargo …` — the in-place twin of the command that creates a new project.',
          'cargo init',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Print the manifest Cargo just generated: you want the package name and the edition.',
        hintTerm: 'Cargo.toml',
        accept: ['cat Cargo.toml', 'cat ./Cargo.toml', 'less Cargo.toml', 'head Cargo.toml'],
        acceptRe: ['^(cat|less|more|bat|head)\\s+\\.?/?cargo\\.toml\\s*$'],
        stdout:
          '[package]\nname = "temp_tracker"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]',
        setState: { manifest_read: true },
        hints: [
          'The manifest is the small TOML file sitting next to src/ — read it.',
          'Any file-printing command, followed by the manifest file name.',
          'cat Cargo.toml',
        ],
      },
      {
        id: 's3',
        promptEn: 'Compile and execute the generated program in a single step.',
        hintTerm: 'Cargo Run',
        accept: ['cargo run', 'cargo r'],
        acceptRe: ['^cargo\\s+(run|r)\\s*$'],
        stdout:
          '   Compiling temp_tracker v0.1.0 (/home/dev/temp_tracker)\n    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.31s\n     Running `target/debug/temp_tracker`\nHello, world!',
        setState: { ran: true },
        hints: [
          'You do not need two commands: one cargo subcommand builds and executes.',
          'Start with `cargo …` — it is three letters long.',
          'cargo run',
        ],
      },
      {
        id: 's4',
        promptEn:
          'The logger needs timestamps. Add the `chrono` crate to the dependencies without editing the manifest by hand.',
        hintTerm: 'Crate',
        accept: ['cargo add chrono', 'cargo add chrono@0.4', 'cargo add chrono --vers 0.4'],
        acceptRe: ['^cargo\\s+add\\s+chrono\\b'],
        stdout:
          '    Updating crates.io index\n      Adding chrono v0.4.38 to dependencies\n             Features:\n             + alloc\n             + clock\n             + iana-time-zone\n             + std\n             - serde\n             - unstable-locales\n    Updating crates.io index\n     Locking 8 packages to latest compatible versions',
        setState: { dep_added: true },
        hints: [
          'Cargo can write the dependency line into Cargo.toml for you.',
          'Start with `cargo add …` and name the crate.',
          'cargo add chrono',
        ],
      },
      {
        id: 's5',
        promptEn: 'Compile the project so Cargo resolves and builds the whole dependency tree.',
        hintTerm: 'Cargo Build',
        accept: ['cargo build', 'cargo b'],
        acceptRe: ['^cargo\\s+(build|b)\\s*$'],
        stdout:
          '   Compiling libc v0.2.155\n   Compiling num-traits v0.2.19\n   Compiling iana-time-zone v0.1.60\n   Compiling chrono v0.4.38\n   Compiling temp_tracker v0.1.0 (/home/dev/temp_tracker)\n    Finished `dev` profile [unoptimized + debuginfo] target(s) in 4.72s',
        setState: { built: true },
        hints: [
          'Compile only — you do not need to execute the binary this time.',
          'Start with `cargo …`, the plain compile subcommand.',
          'cargo build',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Show the lock file Cargo wrote, to see the exact chrono version that got pinned for everybody.',
        hintTerm: 'Cargo.lock',
        accept: ['cat Cargo.lock', 'head Cargo.lock', 'less Cargo.lock'],
        acceptRe: ['^(cat|less|more|bat|head|grep)\\b.*cargo\\.lock\\s*$'],
        stdout:
          '# This file is automatically @generated by Cargo.\n# It is not intended for manual editing.\nversion = 3\n\n[[package]]\nname = "chrono"\nversion = "0.4.38"\nsource = "registry+https://github.com/rust-lang/crates.io-index"\nchecksum = "a21f936df1771bf62b77f047b726c4625ff2e8aa607c01ec06e5a05bd8463401"\ndependencies = [\n "iana-time-zone",\n "num-traits",\n]',
        setState: { locked: true },
        hints: [
          'Cargo.toml states what you asked for; another generated file records what you actually got.',
          'Print the file whose name ends in `.lock`.',
          'cat Cargo.lock',
        ],
      },
    ],
  },

  // ─── Level 0 · Compilation & Execution — debug vs release ──────────────
  rust_foundations_3: {
    title: 'Prove it is the build profile, not the algorithm',
    intro:
      "Il job notturno dei numeri primi impiega venti minuti e il team accusa l'algoritmo. / The nightly prime-sieve job takes twenty minutes and everyone blames the algorithm. Measure both build profiles before touching a single line of code.",
    cwd0: '/home/dev/sieve',
    vocab: [
      'Cargo Check',
      'Warning',
      'Compilation',
      'Debug Build',
      'Release Build',
      'Target Directory',
      'Cargo Clean',
    ],
    requires: {
      checked: true,
      debug_built: true,
      debug_timed: true,
      release_built: true,
      release_timed: true,
      cleaned: true,
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'Type-check the crate without producing a binary — the fastest way to see what the compiler thinks of it.',
        hintTerm: 'Cargo Check',
        accept: ['cargo check', 'cargo c'],
        acceptRe: ['^cargo\\s+(check|c)\\s*$'],
        stdout:
          '    Checking sieve v0.1.0 (/home/dev/sieve)\nwarning: unused variable: `chunk_size`\n  --> src/main.rs:12:9\n   |\n12 |     let chunk_size = 4096;\n   |         ^^^^^^^^^^ help: if this is intentional, prefix it with an underscore: `_chunk_size`\n   |\n   = note: `#[warn(unused_variables)]` on by default\n\nwarning: `sieve` (bin "sieve") generated 1 warning\n    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.28s',
        setState: { checked: true },
        hints: [
          'There is a cargo subcommand that type-checks but never links a binary.',
          'Start with `cargo …` — five letters, and it is not `build`.',
          'cargo check',
        ],
      },
      {
        id: 's2',
        promptEn: 'Compile the crate with the default profile.',
        hintTerm: 'Debug Build',
        accept: ['cargo build', 'cargo b'],
        acceptRe: ['^cargo\\s+(build|b)\\s*$'],
        stdout:
          '   Compiling sieve v0.1.0 (/home/dev/sieve)\nwarning: unused variable: `chunk_size`\n  --> src/main.rs:12:9\n   |\n12 |     let chunk_size = 4096;\n   |         ^^^^^^^^^^ help: if this is intentional, prefix it with an underscore: `_chunk_size`\n   |\n   = note: `#[warn(unused_variables)]` on by default\n\nwarning: `sieve` (bin "sieve") generated 1 warning\n    Finished `dev` profile [unoptimized + debuginfo] target(s) in 1.84s',
        setState: { debug_built: true },
        hints: [
          'The default profile is the unoptimized one with debug symbols — no flag needed.',
          'Start with `cargo …`, no flags at all.',
          'cargo build',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Execute the binary Cargo just wrote under target/debug/ and measure how long it takes with `time`.',
        hintTerm: 'Target Directory',
        accept: ['time ./target/debug/sieve', 'time cargo run', './target/debug/sieve'],
        acceptRe: ['^(time\\s+)?\\./target/debug/sieve\\s*$', '^time\\s+cargo\\s+(run|r)\\s*$'],
        stdout: 'primes below 5000000: 348513\n\nreal\t0m21.406s\nuser\t0m21.298s\nsys\t0m0.072s',
        setState: { debug_timed: true },
        hints: [
          'The debug binary sits inside the target directory, named after the crate.',
          'Prefix the path with the shell timer: `time ./target/…`',
          'time ./target/debug/sieve',
        ],
      },
      {
        id: 's4',
        promptEn: 'Now build the optimized profile that a production job should be using.',
        hintTerm: 'Release Build',
        accept: ['cargo build --release', 'cargo b --release', 'cargo build -r'],
        acceptRe: ['^cargo\\s+(build|b)\\s+(--release|-r)\\s*$'],
        stdout:
          '   Compiling sieve v0.1.0 (/home/dev/sieve)\nwarning: unused variable: `chunk_size`\n  --> src/main.rs:12:9\n   |\n12 |     let chunk_size = 4096;\n   |         ^^^^^^^^^^ help: if this is intentional, prefix it with an underscore: `_chunk_size`\n   |\n   = note: `#[warn(unused_variables)]` on by default\n\nwarning: `sieve` (bin "sieve") generated 1 warning\n    Finished `release` profile [optimized] target(s) in 6.03s',
        setState: { release_built: true },
        hints: [
          'Same compile command, but ask for the optimized profile.',
          'Add the `--rel…` flag to the build command.',
          'cargo build --release',
        ],
      },
      {
        id: 's5',
        promptEn: 'Time the optimized binary the same way and compare the two numbers.',
        hintTerm: 'Release Build',
        accept: [
          'time ./target/release/sieve',
          'time cargo run --release',
          './target/release/sieve',
        ],
        acceptRe: [
          '^(time\\s+)?\\./target/release/sieve\\s*$',
          '^time\\s+cargo\\s+(run|r)\\s+--release\\s*$',
        ],
        stdout: 'primes below 5000000: 348513\n\nreal\t0m0.712s\nuser\t0m0.683s\nsys\t0m0.028s',
        setState: { release_timed: true },
        hints: [
          'The optimized binary landed in a different sub-folder of target/.',
          'Same shape as before: `time ./target/…/sieve`',
          'time ./target/release/sieve',
        ],
      },
      {
        id: 's6',
        promptEn:
          'The CI runner is out of disk: delete every build artefact Cargo has accumulated.',
        hintTerm: 'Cargo Clean',
        accept: ['cargo clean'],
        acceptRe: ['^cargo\\s+clean\\s*$'],
        stdout: '     Removed 1287 files, 1.2GiB total',
        setState: { cleaned: true },
        hints: [
          'Cargo can empty its own target directory for you.',
          'Start with `cargo …` — the verb you would use on a dirty workspace.',
          'cargo clean',
        ],
      },
    ],
  },

  // ─── Level 2 · Functions & Returns — read a real rustc error ───────────
  rust_foundations_8: {
    title: 'Fix the red CI job: a function that returns nothing',
    intro:
      'Un collega ha aperto una PR e la CI è rossa al primo job. / A teammate opened a PR and CI went red on the very first job. One helper function promises an f64 and hands back nothing.',
    cwd0: '/home/dev/weather-cli',
    vocab: [
      'Return Type',
      'Implicit Return',
      'Explicit Return',
      'Function Signature',
      'Function Body',
      'Function Parameter',
    ],
    requires: {
      saw_error: true,
      explained: true,
      source_read: true,
      patched: true,
      diff_shown: true,
      tests_pass: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Reproduce the CI failure locally: compile the crate and read the error.',
        hintTerm: 'Function Signature',
        accept: ['cargo build', 'cargo check', 'cargo b', 'cargo c'],
        acceptRe: ['^cargo\\s+(build|check|b|c)\\s*$'],
        stdout:
          '   Compiling weather-cli v0.1.0 (/home/dev/weather-cli)\nerror[E0308]: mismatched types\n --> src/lib.rs:7:39\n  |\n7 | pub fn to_fahrenheit(celsius: f64) -> f64 {\n  |        -------------                  ^^^ expected `f64`, found `()`\n  |        |\n  |        implicitly returns `()` as its body has no tail expression\n8 |     celsius * 9.0 / 5.0 + 32.0;\n  |                               - help: remove this semicolon to return this value\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `weather-cli` (lib) due to 1 previous error',
        setState: { saw_error: true },
        hints: [
          'Do what the CI job does first: try to compile the crate.',
          'Start with `cargo …` — either the full compile or the fast type-check.',
          'cargo build',
        ],
      },
      {
        id: 's2',
        promptEn:
          'The compiler named an error code. Ask the compiler itself for the long explanation of it.',
        hintTerm: 'Return Type',
        accept: ['rustc --explain E0308', 'rustc --explain e0308'],
        acceptRe: ['^rustc\\s+--explain\\s+e0308\\s*$'],
        stdout:
          'Expected type did not match the received type.\n\nErroneous code example:\n\n    fn plus_one(x: i32) -> i32 {\n        x + 1;\n    }\n\nThis error occurs when an expression was used in a place where the compiler\nexpected an expression of a different type. In the example above, the function\nsignature promises an `i32`, but the body ends in a statement, so the block\nevaluates to the unit type `()`.\n\nTo fix it, remove the semicolon so the last expression becomes the value of the\nblock, or write an explicit `return x + 1;`.',
        setState: { explained: true },
        hints: [
          'The last line of the error told you exactly which command prints the long form.',
          'Start with `rustc --explain …` and give it the code.',
          'rustc --explain E0308',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Print src/lib.rs with line numbers so you can see line 8 next to the tests that call it.',
        hintTerm: 'Function Body',
        accept: ['cat -n src/lib.rs', 'nl src/lib.rs', 'cat -n ./src/lib.rs', 'bat src/lib.rs'],
        acceptRe: ['^(cat\\s+-n|nl|bat)\\s+\\.?/?src/lib\\.rs\\s*$'],
        stdout:
          '     1\t//! Small conversion helpers for the weather CLI.\n     2\t\n     3\t/// Convert a Celsius reading to Fahrenheit.\n     4\t///\n     5\t/// The caller prints whatever this function hands back, so the\n     6\t/// body has to end in an expression, not in a statement.\n     7\tpub fn to_fahrenheit(celsius: f64) -> f64 {\n     8\t    celsius * 9.0 / 5.0 + 32.0;\n     9\t}\n    10\t\n    11\t/// Round a reading to one decimal place.\n    12\tpub fn round_1dp(value: f64) -> f64 {\n    13\t    (value * 10.0).round() / 10.0\n    14\t}\n    15\t\n    16\t#[cfg(test)]\n    17\tmod tests {\n    18\t    use super::*;\n    19\t\n    20\t    #[test]\n    21\t    fn freezing_point() {\n    22\t        assert_eq!(to_fahrenheit(0.0), 32.0);\n    23\t    }\n    24\t\n    25\t    #[test]\n    26\t    fn body_temperature() {\n    27\t        assert_eq!(round_1dp(to_fahrenheit(37.0)), 98.6);\n    28\t    }\n    29\t}',
        setState: { source_read: true },
        hints: [
          'Print the file, but ask for line numbers so the error location lines up.',
          'Use `cat` with the numbering flag, or `nl`.',
          'cat -n src/lib.rs',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Apply the compiler suggestion: drop the trailing semicolon on line 8 in place, then print that line back to check the edit landed.',
        hintTerm: 'Implicit Return',
        accept: [
          "sed -i '8s/;$//' src/lib.rs && sed -n '8p' src/lib.rs",
          "sed -i '8s/;$//' src/lib.rs",
          "sed -i '8s/;//' src/lib.rs",
        ],
        acceptRe: ['^sed\\s+-i\\b.*8s/;.*src/lib\\.rs'],
        stdout: '    celsius * 9.0 / 5.0 + 32.0',
        setState: { patched: true },
        hints: [
          'The compiler already wrote the fix for you: the last expression must not end in a semicolon.',
          "Edit in place with `sed -i '8s/…'` and read the line back with `sed -n '8p'`.",
          "sed -i '8s/;$//' src/lib.rs && sed -n '8p' src/lib.rs",
        ],
      },
      {
        id: 's5',
        promptEn: 'Show the change you made, so the reviewer can see it is one character.',
        hintTerm: 'Explicit Return',
        accept: ['git diff', 'git diff src/lib.rs', 'git diff --stat'],
        acceptRe: ['^git\\s+diff\\b'],
        stdout:
          'diff --git a/src/lib.rs b/src/lib.rs\nindex 3f1c2ab..9d40e17 100644\n--- a/src/lib.rs\n+++ b/src/lib.rs\n@@ -5,7 +5,7 @@\n /// The caller prints whatever this function hands back, so the\n /// body has to end in an expression, not in a statement.\n pub fn to_fahrenheit(celsius: f64) -> f64 {\n-    celsius * 9.0 / 5.0 + 32.0;\n+    celsius * 9.0 / 5.0 + 32.0\n }\n \n /// Round a reading to one decimal place.',
        setState: { diff_shown: true },
        hints: [
          'Ask version control what changed in the working tree.',
          'Start with `git …` — the command that prints changes line by line.',
          'git diff',
        ],
      },
      {
        id: 's6',
        promptEn: 'Run the crate test suite to confirm CI will go green.',
        hintTerm: 'Return Type',
        accept: ['cargo test', 'cargo t'],
        acceptRe: ['^cargo\\s+(test|t)\\s*$'],
        stdout:
          '   Compiling weather-cli v0.1.0 (/home/dev/weather-cli)\n    Finished `test` profile [unoptimized + debuginfo] target(s) in 1.02s\n     Running unittests src/lib.rs (target/debug/deps/weather_cli-8c1f0b2a9d3e4f56)\n\nrunning 2 tests\ntest tests::freezing_point ... ok\ntest tests::body_temperature ... ok\n\ntest result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s',
        setState: { tests_pass: true },
        hints: [
          'The repository already ships unit tests — run them.',
          'Start with `cargo …`, four letters.',
          'cargo test',
        ],
      },
    ],
  },

  // ─── Level 0 · Comments & Style — get past the style gate ──────────────
  rust_foundations_4: {
    title: 'Get the PR past the style gate',
    intro:
      'La pipeline blocca la tua PR sul gate di stile. / The pipeline is blocking your PR on the style gate, not on the tests. Let rustfmt and Clippy tell you exactly what they dislike, then hand them a clean crate.',
    cwd0: '/home/dev/log-parser',
    vocab: ['Rustfmt', 'Clippy', 'Indentation', 'Snake Case'],
    requires: {
      fmt_checked: true,
      formatted: true,
      linted: true,
      lint_fixed: true,
      renamed: true,
      gate_clean: true,
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'Ask the formatter what it would rewrite, without letting it touch a single file yet.',
        hintTerm: 'Rustfmt',
        accept: ['cargo fmt --check', 'cargo fmt -- --check', 'cargo fmt --all -- --check'],
        acceptRe: ['^cargo\\s+fmt\\b.*--check\\s*$'],
        stdout:
          'Diff in /home/dev/log-parser/src/main.rs at line 8:\n }\n \n fn main() {\n-    let path=std::env::args().nth(1).unwrap();\n-      let lines = read_lines(&path);\n-  println!("scanning {path}");\n+    let path = std::env::args().nth(1).unwrap();\n+    let lines = read_lines(&path);\n+    println!("scanning {path}");\n     let errors = lines.iter().filter(|l| l.contains("ERROR")).count();\n \n     if lines.len() > 0 {',
        setState: { fmt_checked: true },
        hints: [
          'The formatter has a dry-run mode: it prints a diff and changes nothing.',
          'Start with `cargo fmt` and add the flag that only checks.',
          'cargo fmt --check',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Now let the formatter rewrite the files for real, in verbose mode so you see which file it touched.',
        hintTerm: 'Indentation',
        accept: ['cargo fmt --verbose', 'cargo fmt -v', 'cargo fmt --all --verbose', 'cargo fmt'],
        acceptRe: ['^cargo\\s+fmt\\b(?!.*check)'],
        stdout:
          '["/home/dev/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/bin/rustfmt" "--edition" "2021" "/home/dev/log-parser/src/main.rs"]',
        setState: { formatted: true },
        hints: [
          'Same tool as before, but this time let it write the files.',
          'Drop the check flag and add the verbose one: `cargo fmt -…`',
          'cargo fmt --verbose',
        ],
      },
      {
        id: 's3',
        promptEn: 'Run the Rust linter over the crate to see the non-idiomatic code it finds.',
        hintTerm: 'Clippy',
        accept: ['cargo clippy', 'cargo clippy --all-targets'],
        acceptRe: ['^cargo\\s+clippy\\s*(--all-targets)?\\s*$'],
        stdout:
          '    Checking log-parser v0.1.0 (/home/dev/log-parser)\nwarning: length comparison to zero\n  --> src/main.rs:16:8\n   |\n16 |     if lines.len() > 0 {\n   |        ^^^^^^^^^^^^^^^ help: using `!is_empty` is clearer and more explicit: `!lines.is_empty()`\n   |\n   = help: for further information visit https://rust-lang.github.io/rust-clippy/master/index.html#len_zero\n   = note: `#[warn(clippy::len_zero)]` on by default\n\nwarning: variable `lineCount` should have a snake case name\n  --> src/main.rs:20:9\n   |\n20 |     let lineCount = lines.len();\n   |         ^^^^^^^^^ help: convert the identifier to snake case: `line_count`\n   |\n   = note: `#[warn(non_snake_case)]` on by default\n\nwarning: `log-parser` (bin "log-parser") generated 2 warnings (run `cargo clippy --fix --bin "log-parser"` to apply 1 suggestion)\n    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.91s',
        setState: { linted: true },
        hints: [
          'Rust ships a linter with a bird-shaped name — run it through cargo.',
          'Start with `cargo cl…`',
          'cargo clippy',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Clippy said one of the two warnings is machine-applicable. Let it apply that suggestion itself.',
        hintTerm: 'Clippy',
        accept: [
          'cargo clippy --fix --allow-dirty',
          'cargo clippy --fix',
          'cargo clippy --fix --allow-dirty --allow-staged',
        ],
        acceptRe: ['^cargo\\s+clippy\\s+--fix\\b'],
        stdout:
          '    Checking log-parser v0.1.0 (/home/dev/log-parser)\n       Fixed src/main.rs (1 fix)\n    Checking log-parser v0.1.0 (/home/dev/log-parser)\nwarning: variable `lineCount` should have a snake case name\n  --> src/main.rs:20:9\n   |\n20 |     let lineCount = lines.len();\n   |         ^^^^^^^^^ help: convert the identifier to snake case: `line_count`\n   |\n   = note: `#[warn(non_snake_case)]` on by default\n\nwarning: `log-parser` (bin "log-parser") generated 1 warning\n    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.77s',
        setState: { lint_fixed: true },
        hints: [
          'The warning summary told you which flag applies suggestions automatically.',
          'Add `--fix` to the linter command (plus `--allow-dirty`, the tree is not committed).',
          'cargo clippy --fix --allow-dirty',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Renaming a binding is never automatic. Rename `lineCount` to snake case everywhere in src/main.rs, then grep the file to confirm.',
        hintTerm: 'Snake Case',
        accept: [
          "sed -i 's/lineCount/line_count/g' src/main.rs && grep -n line_count src/main.rs",
          "sed -i 's/lineCount/line_count/g' src/main.rs",
        ],
        acceptRe: ['^sed\\s+-i\\b.*linecount.*line_count.*src/main\\.rs'],
        stdout: '20:    let line_count = lines.len();\n21:    println!("{line_count} lines");',
        setState: { renamed: true },
        hints: [
          'Rust names local bindings in snake case: lineCount becomes line_count.',
          "Substitute globally in place: `sed -i 's/old/new/g' src/main.rs`",
          "sed -i 's/lineCount/line_count/g' src/main.rs && grep -n line_count src/main.rs",
        ],
      },
      {
        id: 's6',
        promptEn:
          'Run the gate exactly as the pipeline does: every remaining warning must count as an error.',
        hintTerm: 'Clippy',
        accept: [
          'cargo clippy -- -D warnings',
          'cargo clippy --all-targets -- -D warnings',
          'cargo clippy -- -Dwarnings',
        ],
        acceptRe: ['^cargo\\s+clippy\\b.*--\\s+-d\\s*warnings\\s*$'],
        stdout:
          '    Checking log-parser v0.1.0 (/home/dev/log-parser)\n    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.19s',
        setState: { gate_clean: true },
        hints: [
          'CI does not accept warnings: it denies them, turning each one into a hard error.',
          'Pass lint flags through to the compiler: `cargo clippy -- -D …`',
          'cargo clippy -- -D warnings',
        ],
      },
    ],
  },
};
