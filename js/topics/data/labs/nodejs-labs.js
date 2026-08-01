/**
 * NODE.JS LABS - Knowledge AIO
 * ============================
 *
 * Declarative terminal-lab scripts for the `nodejs` topic, keyed by lesson.id.
 * Consumed by LabEngine as the applied beat inside a LessonV2 lesson.
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabMatch compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is matched
 * by goal (setState), not by exact string, and a wrong command never aborts the
 * run — the engine escalates a 3-stage hint instead.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 *
 * Lessons without an entry here fall back to a single-step lab built from the
 * first command item in the lesson (see LessonV2Beats._fallbackLabScript).
 */

export default {
  // ─── L0 · Installation & Versions — first-run / setup ──────────────────
  node_foundations_4: {
    title: 'Bring up Node on a fresh machine',
    intro:
      'Primo giorno, portatile vuoto, turno di reperibilita stanotte. / First day, empty laptop, and you are on call tonight. Install the runtime, pin the LTS line your team runs, and prove the on-call script executes.',
    cwd0: '/Users/dev/oncall',
    vocab: ['Install', 'Version', 'LTS', 'NVM', 'Executable', 'Script'],
    requires: { node_installed: true, lts_active: true, path_known: true, script_ran: true },
    steps: [
      {
        id: 's1',
        promptEn: 'Install Node on this Mac using the Homebrew package manager.',
        hintTerm: 'Install',
        accept: ['brew install node', 'brew install nodejs'],
        acceptRe: ['^brew\\s+install\\s+node(js)?(@\\d+)?\\b'],
        stdout:
          '==> Fetching node\n==> Pouring node--26.2.0.arm64.bottle.tar.gz\n==> Summary\n/opt/homebrew/Cellar/node/26.2.0: 2,451 files, 87.4MB',
        setState: { node_installed: true },
        hints: [
          'On a Mac you install developer tools with the package manager, not by downloading an installer.',
          'Start with `brew install …`',
          'brew install node',
        ],
      },
      {
        id: 's2',
        promptEn: 'Check which version of Node you actually got.',
        hintTerm: 'Version',
        accept: ['node -v', 'node --version'],
        acceptRe: ['^node\\s+(-v|--version)\\b'],
        stdout: 'v26.2.0',
        setState: { version_checked: true },
        hints: [
          'Almost every CLI can report its own version — Node is no exception.',
          'Start with `node …` and add the version flag.',
          'node -v',
        ],
      },
      {
        id: 's3',
        promptEn:
          'That is the Current release. Your team pins the LTS line — install and switch to the latest LTS with the version manager.',
        hintTerm: 'NVM',
        accept: ['nvm install --lts', 'nvm install 24', 'nvm install lts/*'],
        acceptRe: ['^nvm\\s+install\\s+(--lts|lts\\/\\*|24(\\.\\d+)*)\\b'],
        stdout:
          'Downloading and installing node v24.9.0...\nComputing checksum with sha256sum\nChecksums matched!\nNow using node v24.9.0 (npm v11.4.2)',
        setState: { lts_active: true },
        hints: [
          'Homebrew gives you one version. You need the tool that lets several versions coexist and switches between them.',
          'Start with `nvm install …` and ask for the long-term-support line.',
          'nvm install --lts',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Two Node binaries now exist on this machine. Show which executable your PATH will actually run.',
        hintTerm: 'Executable',
        accept: ['which node', 'command -v node', 'type node'],
        acceptRe: ['^which\\s+node\\b', '^command\\s+-v\\s+node\\b', '^type\\s+node\\b'],
        stdout: '/Users/dev/.nvm/versions/node/v24.9.0/bin/node',
        setState: { path_known: true },
        hints: [
          'You want the full path of the binary the shell resolves — not its version.',
          'Start with `which …`',
          'which node',
        ],
      },
      {
        id: 's5',
        promptEn: 'Run the on-call script app.js with the runtime you just pinned.',
        hintTerm: 'Script',
        accept: ['node app.js', 'node ./app.js'],
        acceptRe: ['^node\\s+(\\.\\/)?app\\.js\\b'],
        stdout:
          '[oncall] runtime v24.9.0\n[oncall] loading roster from ./data/roster.json\n[oncall] digest built: 3 alerts, 0 pages\nDone in 412ms.',
        setState: { script_ran: true },
        hints: [
          'A .js file is not executable by itself — something has to interpret it.',
          'Start with `node …` followed by the file name.',
          'node app.js',
        ],
      },
    ],
  },

  // ─── L0 · Node.js Runtime — inspect & explain ──────────────────────────
  node_foundations_1: {
    title: 'Interrogate the runtime under your feet',
    intro:
      'Un bug appare solo sul server di produzione. / A bug appears only on the production box, never on your laptop. Before blaming the code, prove which runtime is really executing it.',
    cwd0: '/srv/checkout-api',
    vocab: ['Node.js', 'Runtime', 'V8 Engine', 'REPL', 'Single-Threaded', 'Cross-Platform'],
    requires: {
      repl_open: true,
      v8_known: true,
      platform_known: true,
      cores_known: true,
      report_ready: true,
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'Open an interactive Node session on this box so you can evaluate expressions live.',
        hintTerm: 'REPL',
        accept: ['node'],
        acceptRe: ['^node\\s*$'],
        stdout: 'Welcome to Node.js v24.9.0.\nType ".help" for more information.\n>',
        setState: { repl_open: true },
        hints: [
          'The read-eval-print loop needs no file and no arguments.',
          'It is a single word — the name of the runtime itself.',
          'node',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Print the version of the JavaScript engine that is compiling your code inside this process.',
        hintTerm: 'V8 Engine',
        accept: ['process.versions.v8', 'console.log(process.versions.v8)'],
        acceptRe: [
          '^process\\.versions\\.v8\\b',
          'console\\.log\\(\\s*process\\.versions\\.v8\\s*\\)',
        ],
        stdout: "'13.6.233.10-node.18'",
        setState: { v8_known: true },
        hints: [
          'The runtime exposes a global object describing the process it is running in, including every bundled component version.',
          'Start from `process.versions…` and pick the engine key.',
          'process.versions.v8',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Your laptop is macOS and this box is not. Print the operating system this process was built for.',
        hintTerm: 'Cross-Platform',
        accept: ['process.platform', 'console.log(process.platform)'],
        acceptRe: ['^process\\.platform\\b', 'console\\.log\\(\\s*process\\.platform\\s*\\)'],
        stdout: "'linux'",
        setState: { platform_known: true },
        hints: [
          'The same global object that told you the engine version also knows the operating system.',
          'Start from `process.` and look for the platform key.',
          'process.platform',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Count the CPU cores on this box — you need the number to explain why Node still runs your JavaScript on one thread.',
        hintTerm: 'Single-Threaded',
        accept: ["require('os').cpus().length", 'os.cpus().length'],
        acceptRe: [
          'require\\(\\s*[\'"]os[\'"]\\s*\\)\\.cpus\\(\\)\\.length',
          '^os\\.cpus\\(\\)\\.length\\b',
        ],
        stdout: '8',
        setState: { cores_known: true },
        hints: [
          'A built-in module reports hardware facts about the machine; the CPU list is an array.',
          'Reach for the `os` core module and its `cpus()` list.',
          "require('os').cpus().length",
        ],
      },
      {
        id: 's5',
        promptEn:
          'Ctrl-D drops you back to the shell. Now dump the whole runtime version table in one shot, without opening an interactive session — you need it for the incident ticket.',
        hintTerm: 'Runtime',
        accept: [
          'node -p "process.versions"',
          "node -p 'process.versions'",
          'node -e "console.log(process.versions)"',
        ],
        acceptRe: ['^node\\s+(-p|--print|-e|--eval)\\s+.*process\\.versions'],
        stdout:
          "{\n  node: '24.9.0',\n  acorn: '8.15.0',\n  ada: '3.2.4',\n  ares: '1.34.5',\n  brotli: '1.1.0',\n  cldr: '47.0',\n  icu: '77.1',\n  llhttp: '9.3.0',\n  modules: '137',\n  napi: '10',\n  nghttp2: '1.65.0',\n  openssl: '3.5.2',\n  simdjson: '3.13.0',\n  tz: '2025b',\n  undici: '7.14.0',\n  unicode: '16.0',\n  uv: '1.51.0',\n  v8: '13.6.233.10-node.18',\n  zlib: '1.3.1'\n}",
        setState: { report_ready: true },
        hints: [
          'Node can evaluate one expression and print the result without ever entering the REPL.',
          'Start with `node -p …` and pass the expression as a quoted string.',
          'node -p "process.versions"',
        ],
      },
    ],
  },

  // ─── L1 · NPM Basics — build & verify ──────────────────────────────────
  node_modules_3: {
    title: 'Bootstrap a service from an empty folder',
    intro:
      'Hai ereditato un microservizio senza manifest. / You inherited a microservice that is one index.js copied out of the old codebase, plus an eslint.config.js — and nothing else. Give it a manifest, pull in what it needs, drop what it does not.',
    cwd0: '/home/dev/billing-api',
    vocab: [
      'NPM',
      'Init',
      'Package',
      'Package Registry',
      'npm install',
      'Local Install',
      'Uninstall',
      'NPX',
    ],
    requires: {
      npm_ready: true,
      manifest: true,
      express: 'installed',
      lodash: 'removed',
      linted: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Confirm the Node package manager is on this machine and report its version.',
        hintTerm: 'NPM',
        accept: ['npm --version', 'npm -v'],
        acceptRe: ['^npm\\s+(-v|--version)\\b'],
        stdout: '11.4.2',
        setState: { npm_ready: true },
        hints: [
          'The package manager ships with Node, but you should still check it answers.',
          'Start with `npm …` and ask for its version.',
          'npm --version',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Create a default package.json for this folder without answering a single interactive question.',
        hintTerm: 'Init',
        accept: ['npm init -y', 'npm init --yes'],
        acceptRe: ['^npm\\s+init\\s+(-y|--yes)\\b'],
        stdout:
          'Wrote to /home/dev/billing-api/package.json:\n\n{\n  "name": "billing-api",\n  "version": "1.0.0",\n  "main": "index.js",\n  "scripts": {\n    "test": "echo \\"Error: no test specified\\" && exit 1"\n  },\n  "keywords": [],\n  "author": "",\n  "license": "ISC",\n  "description": ""\n}',
        setState: { manifest: true },
        hints: [
          'There is a command that writes the manifest for you; a flag makes it skip the questionnaire and accept every default.',
          'Start with `npm init …` and add the "yes to everything" flag.',
          'npm init -y',
        ],
      },
      {
        id: 's3',
        promptEn:
          'index.js requires express. Pull that package from the registry as a local dependency of this project.',
        hintTerm: 'npm install',
        accept: ['npm install express', 'npm i express', 'npm add express'],
        acceptRe: ['^npm\\s+(i|install|add)\\s+express\\b'],
        stdout:
          'added 69 packages, and audited 70 packages in 3s\n\n14 packages are looking for funding\n  run `npm fund` for details\n\nfound 0 vulnerabilities',
        setState: { express: 'installed' },
        hints: [
          'Downloading a package from the registry into node_modules is the single most common npm operation.',
          'Start with `npm install …` and name the package.',
          'npm install express',
        ],
      },
      {
        id: 's4',
        promptEn:
          'The date maths copied from the old service calls lodash. Install that package locally too.',
        hintTerm: 'Local Install',
        accept: ['npm install lodash', 'npm i lodash', 'npm add lodash'],
        acceptRe: ['^npm\\s+(i|install|add)\\s+lodash\\b'],
        stdout:
          'added 1 package, and audited 71 packages in 1s\n\n14 packages are looking for funding\n  run `npm fund` for details\n\nfound 0 vulnerabilities',
        setState: { lodash: 'installed' },
        hints: [
          'Same operation as the previous step — no global flag, so it stays inside this project.',
          'Start with `npm install …` and name the package.',
          'npm install lodash',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Code review: both lodash helpers you used now exist in the standard library. Remove lodash from the project dependencies.',
        hintTerm: 'Uninstall',
        accept: ['npm uninstall lodash', 'npm remove lodash', 'npm rm lodash'],
        acceptRe: ['^npm\\s+(uninstall|remove|rm|un)\\s+lodash\\b'],
        stdout:
          'removed 1 package, and audited 70 packages in 685ms\n\n14 packages are looking for funding\n  run `npm fund` for details\n\nfound 0 vulnerabilities',
        setState: { lodash: 'removed' },
        hints: [
          'Installing has an opposite: it deletes the package from node_modules and from package.json.',
          'Start with `npm uninstall …`',
          'npm uninstall lodash',
        ],
      },
      {
        id: 's6',
        promptEn:
          'The repo already ships an eslint.config.js. Run the linter over the project once, without adding it as a dependency and without installing it globally.',
        hintTerm: 'NPX',
        accept: ['npx eslint .', 'npx eslint'],
        acceptRe: ['^npx\\s+eslint\\b'],
        stdout:
          "Need to install the following packages:\n  eslint@9.34.0\nOk to proceed? (y) y\n\n/home/dev/billing-api/index.js\n  12:7  warning  'total' is assigned a value but never used  no-unused-vars\n\n1 problem (0 errors, 1 warning)",
        setState: { linted: true },
        hints: [
          'There is a runner that fetches a package binary, executes it once, and leaves your dependency list untouched.',
          'Start with `npx …` followed by the tool name.',
          'npx eslint .',
        ],
      },
    ],
  },

  // ─── L2 · Variables & Scope — diagnose a broken job ────────────────────
  node_foundations_7: {
    title: 'Read the stack trace: a scope bug killed the nightly job',
    intro:
      'Il job notturno e morto alle 03:00 con un ReferenceError. / The nightly report job died at 03:00 with a ReferenceError. Reproduce it, read the stack trace, and prove exactly which scope rule broke it before you touch the code.',
    cwd0: '/srv/reports',
    vocab: [
      'let',
      'const',
      'var',
      'Scope',
      'Block Scope',
      'Hoisting',
      'Temporal Dead Zone',
      'Immutable',
    ],
    requires: {
      repro: true,
      read_source: true,
      tdz_proved: true,
      hoisting_shown: true,
      const_proved: true,
      fixed: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Reproduce the failure: run the report script and read the crash.',
        hintTerm: 'Scope',
        accept: ['node report.js', 'node ./report.js'],
        acceptRe: ['^node\\s+(\\.\\/)?report\\.js\\b'],
        stdout:
          "/srv/reports/report.js:7\n    console.log('rows found:', total);\n                               ^\n\nReferenceError: Cannot access 'total' before initialization\n    at buildReport (/srv/reports/report.js:7:32)\n    at Object.<anonymous> (/srv/reports/report.js:14:29)\n    at Module._compile (node:internal/modules/cjs/loader:1554:14)\n    at Object..js (node:internal/modules/cjs/loader:1706:10)\n    at Module.load (node:internal/modules/cjs/loader:1289:32)\n\nNode.js v24.9.0",
        setState: { repro: true },
        hints: [
          'You cannot diagnose what you have not seen fail. Execute the file.',
          'Start with `node …` and the file name from the alert.',
          'node report.js',
        ],
      },
      {
        id: 's2',
        promptEn:
          'The trace blames line 7. Print the file with line numbers so you can see how `total` is declared.',
        hintTerm: 'Block Scope',
        accept: ['cat -n report.js', 'cat report.js'],
        acceptRe: ['^(cat|head|less|bat)\\b.*report\\.js\\b'],
        stdout:
          "     1\t'use strict';\n     2\t\n     3\tconst rows = require('./rows.json');\n     4\t\n     5\tfunction buildReport() {\n     6\t  if (rows.length) {\n     7\t    console.log('rows found:', total);\n     8\t    let total = rows.length;\n     9\t    return total;\n    10\t  }\n    11\t  return 0;\n    12\t}\n    13\t\n    14\tconsole.log('report total:', buildReport());",
        setState: { read_source: true },
        hints: [
          'You just need to read the file — with the line numbers, so they line up with the trace.',
          'Start with `cat …` and add the numbering flag.',
          'cat -n report.js',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Prove it is the dead zone and not a typo: in a one-off evaluation, log `x` and only afterwards declare it with `let`.',
        hintTerm: 'Temporal Dead Zone',
        accept: ['node -e "console.log(x); let x = 1;"', "node -e 'console.log(x); let x = 1;'"],
        acceptRe: ['^node\\s+-(e|-eval)\\s+.*let\\s+x'],
        stdout:
          "[eval]:1\nconsole.log(x); let x = 1;\n            ^\n\nReferenceError: Cannot access 'x' before initialization\n    at [eval]:1:13\n    at runScriptInThisContext (node:internal/vm:209:10)\n    at node:internal/process/execution:118:14\n\nNode.js v24.9.0",
        setState: { tdz_proved: true },
        hints: [
          'Shrink the bug to two statements and run them without a file, so nothing else can be blamed.',
          'Start with `node -e "…"` and put the read before the `let` declaration.',
          'node -e "console.log(x); let x = 1;"',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Now show the contrast: run the same two statements with `var` instead of `let` and watch the error disappear.',
        hintTerm: 'Hoisting',
        accept: ['node -e "console.log(x); var x = 1;"', "node -e 'console.log(x); var x = 1;'"],
        acceptRe: ['^node\\s+-(e|-eval)\\s+.*var\\s+x'],
        stdout: 'undefined',
        setState: { hoisting_shown: true },
        hints: [
          'The older declaration keyword is raised to the top of its function and pre-set to undefined.',
          'Same `node -e "…"` one-liner, but swap the declaration keyword.',
          'node -e "console.log(x); var x = 1;"',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Before you rewrite anything, check the third rule: in a one-off, declare `const rate = 0.2` and then try to reassign it to 0.3.',
        hintTerm: 'Immutable',
        accept: [
          'node -e "const rate = 0.2; rate = 0.3;"',
          "node -e 'const rate = 0.2; rate = 0.3;'",
        ],
        acceptRe: [
          '^node\\s+-(e|-eval)\\s+.*const\\s+rate',
          '^node\\s+-(e|-eval)\\s+.*const\\s+\\w+\\s*=[^;]*;\\s*\\w+\\s*=',
        ],
        stdout:
          '[eval]:1\nconst rate = 0.2; rate = 0.3;\n                       ^\n\nTypeError: Assignment to constant variable.\n    at [eval]:1:24\n    at runScriptInThisContext (node:internal/vm:209:10)\n    at node:internal/process/execution:118:14\n\nNode.js v24.9.0',
        setState: { const_proved: true },
        hints: [
          'A binding declared with the immutable keyword cannot be pointed at a new value — the error is a TypeError, not a ReferenceError.',
          'Same `node -e "…"` one-liner, this time with `const` and a second assignment.',
          'node -e "const rate = 0.2; rate = 0.3;"',
        ],
      },
      {
        id: 's6',
        promptEn:
          'You moved the `let total` declaration above the log on line 7. Re-run the job and confirm it completes.',
        hintTerm: 'let',
        accept: ['node report.js', 'node ./report.js'],
        acceptRe: ['^node\\s+(\\.\\/)?report\\.js\\b'],
        stdout: 'rows found: 128\nreport total: 128',
        setState: { fixed: true },
        hints: [
          'A fix you have not executed is a guess. Run the job again.',
          'Start with `node …` and the same file name as step 1.',
          'node report.js',
        ],
      },
    ],
  },
};
