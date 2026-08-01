/**
 * PYTHON LABS - Knowledge AIO
 * ===========================
 *
 * Declarative terminal-lab scripts for the `python` topic, keyed by lesson.id.
 * Consumed by LabEngine as the applied beat inside a LessonV2 lesson.
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabEngine compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is matched
 * by goal (setState), not by exact string, and a wrong command never aborts.
 *
 * Terminal flavour: python3 one-liners, venv, pip, pytest — real interpreter
 * output and real tracebacks, because reading tool output IS the lesson.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints? }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 */

export default {
  py_basics_1: {
    title: 'Print your first values',
    intro:
      'Primo giorno sul terminale / First day on the terminal. You have a shell with python3 installed and nothing else — no editor, no project. Prove the interpreter answers you, one line at a time.',
    cwd0: '/home/dev',
    vocab: ['Print', 'Variable', 'String', 'Expression', 'Comment'],
    requires: {
      printed: true,
      variable: true,
      sliced: true,
      computed: true,
      commented: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Show the message "Hello, Python!" on the console, without creating a file.',
        hintTerm: 'Print',
        accept: ['python3 -c "print(\'Hello, Python!\')"', 'python -c "print(\'Hello, Python!\')"'],
        acceptRe: ['^python3?\\s+-c\\s+.*print\\s*\\(.*hello,?\\s*python.*\\)'],
        stdout: 'Hello, Python!',
        setState: { printed: true },
        hints: [
          'You need the function that writes text to the console — the one every Python course starts with.',
          'The interpreter runs a single line for you with the -c flag: `python3 -c "…"`',
          'python3 -c "print(\'Hello, Python!\')"',
        ],
      },
      {
        id: 's2',
        promptEn: 'Store the number 42 in a variable called x, then print x.',
        hintTerm: 'Variable',
        accept: [
          'python3 -c "x = 42; print(x)"',
          'python3 -c "x=42; print(x)"',
          'python -c "x = 42; print(x)"',
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*x\\s*=\\s*42\\s*;\\s*print\\s*\\(\\s*x\\s*\\)'],
        stdout: '42',
        setState: { variable: true },
        hints: [
          'A variable is a name bound to a value. Bind the name first, then print the name — not the number.',
          'Two statements on one line, separated by a semicolon: `python3 -c "x = … ; print(…)"`',
          'python3 -c "x = 42; print(x)"',
        ],
      },
      {
        id: 's3',
        promptEn:
          "Put the string 'Hello, world' in a variable s and print only its first five characters.",
        hintTerm: 'String',
        accept: [
          'python3 -c "s = \'Hello, world\'; print(s[:5])"',
          'python3 -c "s = \'Hello, world\'; print(s[0:5])"',
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*print\\s*\\(\\s*\\w+\\[\\s*0?\\s*:\\s*5\\s*\\]\\s*\\)'],
        stdout: 'Hello',
        setState: { sliced: true },
        hints: [
          'A string is a sequence, so you can cut a piece out of it — that cut is called a slice.',
          'Square brackets with a colon inside: `s[start:end]`, and an empty start means "from the beginning".',
          'python3 -c "s = \'Hello, world\'; print(s[:5])"',
        ],
      },
      {
        id: 's4',
        promptEn:
          'A product costs 100 with a discount of 0.2. Print the final price as one expression.',
        hintTerm: 'Expression',
        accept: [
          'python3 -c "price = 100; discount = 0.2; print(price * (1 - discount))"',
          'python3 -c "price = 100; discount = 0.2; print(price - price * discount)"',
          'python3 -c "price = 100; print(price * 0.8)"',
          'python3 -c "print(100 * (1 - 0.2))"',
          'python3 -c "print(100 * 0.8)"',
        ],
        acceptRe: [
          '^python3?\\s+-c\\s+.*price\\s*\\*\\s*\\(\\s*1\\s*-\\s*discount\\s*\\)',
          '^python3?\\s+-c\\s+.*price\\s*-\\s*price\\s*\\*\\s*discount',
          '^python3?\\s+-c\\s+.*price\\s*\\*\\s*0?\\.8\\b',
          '^python3?\\s+-c\\s+.*print\\s*\\(\\s*100\\s*\\*\\s*(0\\.8|\\(\\s*1\\s*-\\s*0\\.2\\s*\\))\\s*\\)',
        ],
        stdout: '80.0',
        setState: { computed: true },
        hints: [
          'An expression is anything that produces a value. Build the value first, then print it.',
          'Subtract the discount from 1 and multiply: `price * (1 - discount)`.',
          'python3 -c "price = 100; discount = 0.2; print(price * (1 - discount))"',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Print "Hi" and add a comment on the same line explaining that it greets the user.',
        hintTerm: 'Comment',
        accept: [
          'python3 -c "print(\'Hi\')  # greet the user"',
          'python3 -c "print(\'Hi\') # greet the user"',
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*print\\s*\\(.*hi.*\\).*#'],
        stdout: 'Hi',
        setState: { commented: true },
        hints: [
          'A comment is text the interpreter ignores — it is written for the next human, not for the machine.',
          'One character starts a comment in Python, and everything after it on that line is skipped: `#`.',
          'python3 -c "print(\'Hi\')  # greet the user"',
        ],
      },
    ],
  },

  py_basics_4: {
    title: 'Diagnose a crashing script',
    intro:
      'Il report notturno e fallito / The nightly report failed. Cron mailed you a traceback and nothing else. Reproduce the crash, find out which interpreter really ran the script, and get it green again.',
    cwd0: '/srv/reports',
    vocab: ['Script', 'Traceback', 'Exception', 'Interpreter', 'Library', 'Execution'],
    requires: {
      reproduced: true,
      interpreter_checked: true,
      inspected: true,
      venv_active: true,
      installed: true,
      fixed: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Reproduce the failure: run the script nightly_report.py yourself.',
        hintTerm: 'Script',
        accept: [
          'python3 nightly_report.py',
          'python nightly_report.py',
          'python3 ./nightly_report.py',
        ],
        acceptRe: ['^python3?\\s+\\.?/?nightly_report\\.py\\s*$'],
        stdout:
          'Traceback (most recent call last):\n  File "/srv/reports/nightly_report.py", line 3, in <module>\n    import requests\nModuleNotFoundError: No module named \'requests\'',
        setState: { reproduced: true },
        hints: [
          'Never trust a bug report you have not seen with your own eyes. Execute the file the same way cron did.',
          'Hand the file name to the interpreter: `python3 <file>`',
          'python3 nightly_report.py',
        ],
      },
      {
        id: 's2',
        promptEn:
          'The traceback says the library is missing. Print the full path of the interpreter that is actually running.',
        hintTerm: 'Interpreter',
        accept: [
          'python3 -c "import sys; print(sys.executable)"',
          'which python3',
          'command -v python3',
          'python3 -c "import sys; print(sys.version, sys.executable)"',
        ],
        acceptRe: [
          '^python3?\\s+-c\\s+.*sys\\.executable',
          '^(which|type|command\\s+-v)\\s+python3?\\s*$',
        ],
        stdout: '/usr/bin/python3',
        setState: { interpreter_checked: true },
        hints: [
          'A missing library usually means the wrong interpreter, not a missing package. Ask Python where it lives.',
          'The sys module knows its own binary: `python3 -c "import sys; print(sys.…)"`',
          'python3 -c "import sys; print(sys.executable)"',
        ],
      },
      {
        id: 's3',
        promptEn:
          'That is the system interpreter, not a project one. List the directory contents, hidden entries included.',
        accept: ['ls -la', 'ls -al', 'ls -a'],
        // Must contain an "all" flag: plain `ls` would NOT reveal .venv, so it
        // must not clear a step whose whole point is showing hidden entries.
        acceptRe: ['^ls\\s+(-[a-z]*a[a-z]*|--all)\\b'],
        stdout:
          'total 24\ndrwxr-xr-x 4 dev  dev  4096 Aug  1 02:14 .\ndrwxr-xr-x 6 root root 4096 Jul 30 11:02 ..\ndrwxr-xr-x 5 dev  dev  4096 Jul 30 11:05 .venv\n-rw-r--r-- 1 dev  dev  1642 Aug  1 02:14 nightly_report.py\ndrwxr-xr-x 2 dev  dev  4096 Aug  1 02:14 out\n-rw-r--r-- 1 dev  dev   118 Jul 30 11:04 requirements.txt',
        setState: { inspected: true },
        hints: [
          'The project may already carry its own isolated environment — but its directory name starts with a dot, so a plain listing hides it.',
          'List everything, long format: `ls -…`',
          'ls -la',
        ],
      },
      {
        id: 's4',
        promptEn:
          'There is a .venv directory. Activate that virtual environment so python3 and pip come from it.',
        hintTerm: 'Interpreter',
        accept: [
          'source .venv/bin/activate',
          '. .venv/bin/activate',
          'source ./.venv/bin/activate',
        ],
        acceptRe: ['^(source|\\.)\\s+\\.?/?\\.venv/bin/activate\\s*$'],
        stdout: '(.venv) /srv/reports $',
        setState: { venv_active: true },
        hints: [
          'A virtual environment is only a set of paths — it does nothing until the current shell loads it.',
          'Read the activate script into the shell you are in: `source <path>/bin/activate`',
          'source .venv/bin/activate',
        ],
      },
      {
        id: 's5',
        promptEn: 'Install the libraries the project declares in requirements.txt.',
        hintTerm: 'Library',
        accept: [
          'pip install -r requirements.txt',
          'pip3 install -r requirements.txt',
          'python3 -m pip install -r requirements.txt',
        ],
        acceptRe: ['^(python3?\\s+-m\\s+)?pip3?\\s+install\\s+-r\\s+requirements\\.txt\\b'],
        stdout:
          'Collecting requests==2.31.0 (from -r requirements.txt (line 1))\n  Using cached requests-2.31.0-py3-none-any.whl (62 kB)\nCollecting charset-normalizer<4,>=2 (from requests==2.31.0->-r requirements.txt (line 1))\n  Using cached charset_normalizer-3.3.2-py3-none-any.whl (48 kB)\nCollecting idna<4,>=2.5 (from requests==2.31.0->-r requirements.txt (line 1))\n  Using cached idna-3.6-py3-none-any.whl (61 kB)\nCollecting urllib3<3,>=1.21.1 (from requests==2.31.0->-r requirements.txt (line 1))\n  Using cached urllib3-2.2.1-py3-none-any.whl (121 kB)\nCollecting certifi>=2017.4.17 (from requests==2.31.0->-r requirements.txt (line 1))\n  Using cached certifi-2024.2.2-py3-none-any.whl (163 kB)\nInstalling collected packages: urllib3, idna, charset-normalizer, certifi, requests\nSuccessfully installed certifi-2024.2.2 charset-normalizer-3.3.2 idna-3.6 requests-2.31.0 urllib3-2.2.1',
        setState: { installed: true },
        hints: [
          'The project already lists everything it depends on in a file — install from that list instead of guessing package names.',
          'The package installer reads a requirements file with one flag: `pip install -… requirements.txt`',
          'pip install -r requirements.txt',
        ],
      },
      {
        id: 's6',
        promptEn: 'Run the script again and confirm the execution now succeeds.',
        hintTerm: 'Execution',
        accept: [
          'python3 nightly_report.py',
          'python nightly_report.py',
          'python3 ./nightly_report.py',
        ],
        acceptRe: ['^python3?\\s+\\.?/?nightly_report\\.py\\s*$'],
        stdout:
          'fetching 4 dashboards ...\nwrote /srv/reports/out/2026-08-01.csv (128 rows)\ndone in 3.4s',
        setState: { fixed: true },
        hints: [
          'A fix you have not re-run is still a guess. Repeat the command that failed at the start.',
          'Same command as step 1: `python3 <file>`',
          'python3 nightly_report.py',
        ],
      },
    ],
  },

  py_list: {
    title: 'Build the retry queue',
    intro:
      'Tre job notturni sono falliti / Three overnight jobs failed. Shape the retry queue in the interpreter first — list, count, order, filter — then let the existing test suite confirm the rules.',
    cwd0: '/home/dev/pipeline',
    vocab: ['List', 'Append', 'Length (len)', 'Sort', 'List Comprehension'],
    requires: {
      built: true,
      appended: true,
      counted: true,
      ordered: true,
      filtered: true,
      verified: true,
    },
    steps: [
      {
        id: 's1',
        promptEn:
          "Create a list called jobs holding the three failed job names 'api', 'web', 'cron', and print it.",
        hintTerm: 'List',
        accept: [
          "python3 -c \"jobs = ['api', 'web', 'cron']; print(jobs)\"",
          "python3 -c \"jobs = ['api','web','cron']; print(jobs)\"",
        ],
        acceptRe: [
          '^python3?\\s+-c\\s+.*jobs\\s*=\\s*\\[.*api.*web.*cron.*\\]\\s*;\\s*print\\s*\\(\\s*jobs\\s*\\)',
        ],
        stdout: "['api', 'web', 'cron']",
        setState: { built: true },
        hints: [
          'A list keeps several values in order inside one name. Build it, then print the name.',
          "Square brackets, comma-separated strings: `jobs = ['…', '…', '…']`",
          "python3 -c \"jobs = ['api', 'web', 'cron']; print(jobs)\"",
        ],
      },
      {
        id: 's2',
        promptEn:
          "A fourth job just failed. Add 'billing' to the end of the same list and print the result.",
        hintTerm: 'Append',
        accept: [
          "python3 -c \"jobs = ['api', 'web', 'cron']; jobs.append('billing'); print(jobs)\"",
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*\\.append\\s*\\(.*billing.*\\)'],
        stdout: "['api', 'web', 'cron', 'billing']",
        setState: { appended: true },
        hints: [
          'Adding one element to the end of a list has its own method — you do not rebuild the list.',
          "Call it on the list itself: `jobs.…('billing')`",
          "python3 -c \"jobs = ['api', 'web', 'cron']; jobs.append('billing'); print(jobs)\"",
        ],
      },
      {
        id: 's3',
        promptEn: 'Print how many jobs are now in the queue.',
        hintTerm: 'Length (len)',
        accept: [
          "python3 -c \"jobs = ['api', 'web', 'cron', 'billing']; print(len(jobs))\"",
          "python3 -c \"print(len(['api', 'web', 'cron', 'billing']))\"",
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*print\\s*\\(\\s*len\\s*\\('],
        stdout: '4',
        setState: { counted: true },
        hints: [
          'You never count a list by hand — a built-in function returns its size.',
          'Three letters, wrapped around the list: `len(…)`',
          "python3 -c \"jobs = ['api', 'web', 'cron', 'billing']; print(len(jobs))\"",
        ],
      },
      {
        id: 's4',
        promptEn: 'The retry runner expects alphabetical order. Sort the list and print it.',
        hintTerm: 'Sort',
        accept: [
          "python3 -c \"jobs = ['api', 'web', 'cron', 'billing']; jobs.sort(); print(jobs)\"",
          "python3 -c \"jobs = ['api', 'web', 'cron', 'billing']; print(sorted(jobs))\"",
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*(\\.sort\\s*\\(\\s*\\)|sorted\\s*\\()'],
        stdout: "['api', 'billing', 'cron', 'web']",
        setState: { ordered: true },
        hints: [
          'Ordering a list in place is a method on the list; there is also a function that returns a new ordered list.',
          'Either `jobs.…()` then print, or `print(…(jobs))`',
          "python3 -c \"jobs = ['api', 'web', 'cron', 'billing']; jobs.sort(); print(jobs)\"",
        ],
      },
      {
        id: 's5',
        promptEn:
          'Short names are smoke tests, not real jobs. Print only the jobs whose name is longer than three characters, using a list comprehension.',
        hintTerm: 'List Comprehension',
        accept: [
          "python3 -c \"jobs = ['api', 'billing', 'cron', 'web']; print([j for j in jobs if len(j) > 3])\"",
        ],
        acceptRe: [
          '^python3?\\s+-c\\s+.*\\[\\s*\\w+\\s+for\\s+\\w+\\s+in\\s+jobs\\s+if\\s+len\\s*\\(',
        ],
        stdout: "['billing', 'cron']",
        setState: { filtered: true },
        hints: [
          'You can build a new list from an old one in a single expression, keeping only the elements that pass a condition.',
          'Inside square brackets: `[x for x in jobs if …]`',
          "python3 -c \"jobs = ['api', 'billing', 'cron', 'web']; print([j for j in jobs if len(j) > 3])\"",
        ],
      },
      {
        id: 's6',
        promptEn:
          'tests/test_queue.py already encodes those rules. Run the test suite in quiet mode to verify them.',
        accept: ['pytest -q', 'python3 -m pytest -q', 'pytest -q tests/test_queue.py', 'pytest'],
        // Any pytest invocation that actually RUNS the suite; the lookahead keeps
        // `pytest --version` / `--help` / `--collect-only` from printing "4 passed".
        acceptRe: [
          '^(python3?\\s+-m\\s+)?pytest\\b(?!\\s*(--help|--version|--collect-only|--co|-h)\\b)',
        ],
        stdout:
          '....                                                                     [100%]\n4 passed in 0.11s',
        setState: { verified: true },
        hints: [
          'The rules you just checked by hand are already asserted by an automated test suite — let it check them for you.',
          'The standard Python test runner, with the quiet flag: `pytest -…`',
          'pytest -q',
        ],
      },
    ],
  },

  py_dict: {
    title: 'Audit a config before the deploy',
    intro:
      'Ops ti ha passato config.json per lo staging / Ops handed you config.json for the staging deploy. Nobody can tell you what is inside it. Read the dictionary key by key before anything ships.',
    cwd0: '/home/dev/deploy',
    vocab: ['Dictionary', 'Key', 'Keys', 'Get', 'Items', 'Update'],
    requires: {
      loaded: true,
      keys_listed: true,
      value_read: true,
      default_used: true,
      items_listed: true,
      patched: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Load config.json into a variable cfg and print the whole dictionary.',
        hintTerm: 'Dictionary',
        accept: [
          'python3 -c "import json; cfg = json.load(open(\'config.json\')); print(cfg)"',
          'python3 -c "import json; cfg=json.load(open(\'config.json\')); print(cfg)"',
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*json\\.load\\s*\\(.*config\\.json.*print\\s*\\('],
        stdout: "{'service': 'billing-api', 'port': 8080, 'debug': True, 'retries': 3}",
        setState: { loaded: true },
        hints: [
          'JSON maps onto the Python type that stores key-value pairs. The standard library reads the file for you.',
          "Import the json module, then `json.load(open('config.json'))`",
          'python3 -c "import json; cfg = json.load(open(\'config.json\')); print(cfg)"',
        ],
      },
      {
        id: 's2',
        promptEn: 'Print the names of the settings only, as a list.',
        hintTerm: 'Keys',
        accept: [
          'python3 -c "import json; cfg = json.load(open(\'config.json\')); print(list(cfg.keys()))"',
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*\\.keys\\s*\\(\\s*\\)'],
        stdout: "['service', 'port', 'debug', 'retries']",
        setState: { keys_listed: true },
        hints: [
          'Each entry of a dictionary has a name and a value. You want the names, not the values.',
          'A view of the names comes from a method: `cfg.…()`, wrap it in list() to print it clearly.',
          'python3 -c "import json; cfg = json.load(open(\'config.json\')); print(list(cfg.keys()))"',
        ],
      },
      {
        id: 's3',
        promptEn: "Print the value stored under the key 'port'.",
        hintTerm: 'Key',
        accept: [
          "python3 -c \"import json; cfg = json.load(open('config.json')); print(cfg['port'])\"",
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*\\[[^\\]]{0,3}port[^\\]]{0,3}\\]'],
        stdout: '8080',
        setState: { value_read: true },
        hints: [
          'A dictionary is not read by position — you address it by the name of the entry.',
          "Square brackets around the quoted key: `cfg['…']`",
          "python3 -c \"import json; cfg = json.load(open('config.json')); print(cfg['port'])\"",
        ],
      },
      {
        id: 's4',
        promptEn:
          "The deploy also needs a 'timeout', which may be absent from this file. Read it without crashing, falling back to 30.",
        hintTerm: 'Get',
        accept: [
          "python3 -c \"import json; cfg = json.load(open('config.json')); print(cfg.get('timeout', 30))\"",
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*\\.get\\s*\\(.*timeout.*,\\s*30\\s*\\)'],
        stdout: '30',
        setState: { default_used: true },
        hints: [
          'Reading a missing key with square brackets raises KeyError. There is a safer accessor that accepts a fallback value.',
          "A three-letter method with two arguments: `cfg.…('timeout', 30)`",
          "python3 -c \"import json; cfg = json.load(open('config.json')); print(cfg.get('timeout', 30))\"",
        ],
      },
      {
        id: 's5',
        promptEn: 'Print every key-value pair of the config, one pair per line.',
        hintTerm: 'Items',
        accept: [
          'python3 -c "import json; cfg = json.load(open(\'config.json\')); [print(k, v) for k, v in cfg.items()]"',
        ],
        acceptRe: ['^python3?\\s+-c\\s+.*\\.items\\s*\\(\\s*\\)'],
        stdout: 'service billing-api\nport 8080\ndebug True\nretries 3',
        setState: { items_listed: true },
        hints: [
          'To see names and values together you need the pairs, and you have to walk over them.',
          'Iterate over `cfg.…()` unpacking two names: `for k, v in …`',
          'python3 -c "import json; cfg = json.load(open(\'config.json\')); [print(k, v) for k, v in cfg.items()]"',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Staging must never run with debug on. Set debug to False in cfg and print the corrected dictionary.',
        hintTerm: 'Update',
        accept: [
          "python3 -c \"import json; cfg = json.load(open('config.json')); cfg.update({'debug': False}); print(cfg)\"",
          "python3 -c \"import json; cfg = json.load(open('config.json')); cfg['debug'] = False; print(cfg)\"",
          'python3 -c "import json; cfg = json.load(open(\'config.json\')); cfg.update(debug=False); print(cfg)"',
        ],
        acceptRe: [
          '^python3?\\s+-c\\s+.*\\.update\\s*\\(.*debug.*false',
          '^python3?\\s+-c\\s+.*\\[[^\\]]{0,3}debug[^\\]]{0,3}\\]\\s*=\\s*false',
        ],
        stdout: "{'service': 'billing-api', 'port': 8080, 'debug': False, 'retries': 3}",
        setState: { patched: true },
        hints: [
          'You can merge a second dictionary into this one, or assign straight to the key.',
          "Either `cfg.update({'debug': False})` or `cfg['debug'] = False`",
          "python3 -c \"import json; cfg = json.load(open('config.json')); cfg.update({'debug': False}); print(cfg)\"",
        ],
      },
    ],
  },
};
