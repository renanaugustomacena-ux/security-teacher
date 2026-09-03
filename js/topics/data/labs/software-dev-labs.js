/**
 * SOFTWARE DEVELOPMENT LABS - Knowledge AIO
 * =========================================
 *
 * Declarative terminal-lab scripts for the `software-dev` topic, keyed by
 * lesson.id. Consumed by LabEngine as the applied beat inside a LessonV2 lesson
 * and by the standalone lab practice mode (TopicPracticeLabMode).
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabMatch compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is matched
 * by goal (setState), not by exact string, and a wrong command never aborts.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints? }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 *
 * The four labs are deliberately four different jobs, not four command drills:
 * bootstrap a toolchain, trace a crash, review someone else's pull request, cut
 * a release. Each `vocab` list only names terms the keyed lesson actually
 * teaches, and each `stdout` is the output the real tool prints — reading that
 * output IS the lesson, so every listing, diff, stack trace and summary block
 * below was reproduced against the real tool before being written down.
 */

export default {
  // ── Level 0 · Strumenti / Tools — first-run setup ──────────────────────
  dev_basics_2: {
    title: 'Bootstrap the toolchain on a new project',
    intro:
      'Un collega ti passa una cartella di sorgenti senza repository e senza tooling. / A teammate hands you a folder of sources with no repository and no tooling. Get it tracked, linted and built before standup.',
    cwd0: '/home/dev/invoice-api',
    vocab: ['Terminal (CLI)', 'Version Control', 'Plugin / Extension', 'Build', 'Interpreter'],
    requires: {
      repo: 'initialized',
      committed: true,
      linter: 'installed',
      build: 'production',
      smoke: 'ok',
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'List everything in the folder, hidden files included, to see what you were given.',
        hintTerm: 'Terminal (CLI)',
        accept: ['ls -la', 'ls -al', 'ls -lah'],
        acceptRe: ['^ls\\s+-[lh]*a[lh]*$'],
        stdout:
          'total 48\ndrwxr-xr-x  4 dev dev 4096 Mar 11 09:12 .\ndrwxr-xr-x 12 dev dev 4096 Mar 11 09:02 ..\n-rw-r--r--  1 dev dev  268 Mar 11 09:04 .env.example\n-rw-r--r--  1 dev dev  102 Mar 11 09:04 .gitignore\n-rw-r--r--  1 dev dev 1284 Mar 11 09:04 package.json\ndrwxr-xr-x  2 dev dev 4096 Mar 11 09:04 scripts\ndrwxr-xr-x  2 dev dev 4096 Mar 11 09:04 src\n-rw-r--r--  1 dev dev  412 Mar 11 09:04 tsconfig.json',
        setState: { listed: true },
        hints: [
          'Ask the terminal what is really in this folder — the dot-files matter here.',
          'The listing command takes a long-format flag and an all-files flag: `ls -…`',
          'ls -la',
        ],
      },
      {
        id: 's2',
        promptEn:
          'There is no .git directory in that listing — put the project under version control.',
        hintTerm: 'Version Control',
        accept: ['git init', 'git init .'],
        acceptRe: ['^git\\s+init\\b'],
        stdout: 'Initialized empty Git repository in /home/dev/invoice-api/.git/',
        setState: { repo: 'initialized' },
        hints: [
          'Version control has to be created before anything can be tracked.',
          'Start with `git …` — the subcommand means "start a repository here".',
          'git init',
        ],
      },
      {
        id: 's3',
        promptEn: 'Stage every file and record the first commit, message "chore: initial commit".',
        hintTerm: 'Version Control',
        accept: [
          'git add . && git commit -m "chore: initial commit"',
          "git add . && git commit -m 'chore: initial commit'",
          'git add -A && git commit -m "chore: initial commit"',
          'git commit -am "chore: initial commit"',
        ],
        acceptRe: ['^(git\\s+add\\b.*(&&|;)\\s*)?git\\s+commit\\b.*-m\\b.*initial\\s+commit'],
        stdout:
          '[main (root-commit) 8f3c1a2] chore: initial commit\n 9 files changed, 412 insertions(+)\n create mode 100644 .env.example\n create mode 100644 .gitignore\n create mode 100644 package.json\n create mode 100644 scripts/run.js\n create mode 100644 scripts/seed.js\n create mode 100644 src/index.ts\n create mode 100644 src/routes.ts\n create mode 100644 src/server.ts\n create mode 100644 tsconfig.json',
        setState: { committed: true },
        hints: [
          'Two moves in one line: put the files in the staging area, then record them.',
          'Chain them: `git add . && git commit -m "…"`',
          'git add . && git commit -m "chore: initial commit"',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Install the ESLint extension for VS Code from the command line so linting runs as you type.',
        hintTerm: 'Plugin / Extension',
        accept: [
          'code --install-extension dbaeumer.vscode-eslint',
          'code --install-extension dbaeumer.vscode-eslint --force',
        ],
        acceptRe: ['^code\\s+--install-extension\\s+\\S*eslint\\S*'],
        stdout:
          "Installing extensions...\nInstalling extension 'dbaeumer.vscode-eslint' v3.0.10...\nExtension 'dbaeumer.vscode-eslint' v3.0.10 was successfully installed.",
        setState: { linter: 'installed' },
        hints: [
          'The editor itself has a CLI — you can add an extension without opening the UI.',
          'Start with `code --install-extension …` and pass the publisher.name id.',
          'code --install-extension dbaeumer.vscode-eslint',
        ],
      },
      {
        id: 's5',
        promptEn: 'Run the project build in production mode through its npm script.',
        hintTerm: 'Build',
        accept: [
          'npm run build -- --mode production',
          'npm run build -- --mode=production',
          'npm run build --mode production',
        ],
        acceptRe: ['^npm\\s+run\\s+build\\b.*production'],
        stdout:
          '> invoice-api@0.1.0 build\n> vite build --mode production\n\nvite v5.2.8 building for production...\ntransforming...\n✓ 42 modules transformed.\nrendering chunks...\ncomputing gzip size...\ndist/index.js      18.44 kB │ gzip: 6.12 kB\ndist/index.js.map  61.09 kB\n✓ built in 1.86s',
        setState: { build: 'production' },
        hints: [
          'The package already defines the build; you only have to run that script and tell it which mode.',
          'npm run <script>, then `--` to forward the flag to the tool underneath.',
          'npm run build -- --mode production',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Run scripts/run.js with the Node interpreter to smoke-test the bundle; it needs the experimental VM modules flag.',
        hintTerm: 'Interpreter',
        accept: [
          'node --experimental-vm-modules scripts/run.js',
          'node --experimental-vm-modules ./scripts/run.js',
        ],
        acceptRe: ['^node\\s+--experimental-vm-modules\\s+\\.?/?scripts/run\\.js$'],
        stdout:
          '(node:4821) ExperimentalWarning: VM Modules is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nsmoke: loaded dist/index.js\nsmoke: GET /health -> 200 {"status":"ok","version":"0.1.0"}\nsmoke: 1 check passed',
        setState: { smoke: 'ok' },
        hints: [
          'A build is only proven when something actually executes it — use the runtime that reads JavaScript directly.',
          'Start with `node --experimental-vm-modules …` and give it the script path.',
          'node --experimental-vm-modules scripts/run.js',
        ],
      },
    ],
  },

  // ── Level 0 · Errori e Debug — diagnose a broken build ─────────────────
  dev_basics_3: {
    title: 'Trace a crash from the CI log to the fix',
    intro:
      'Il job notturno di CI e rosso e il servizio carrello va in crash. / The nightly CI job is red and the cart service crashes. Follow the log back to the bug, then prove your patch works.',
    cwd0: '/home/dev/shop-api',
    vocab: ['Log', 'Crash', 'Runtime Error', 'Bug', 'Breakpoint', 'Debugging', 'Patch / Fix'],
    requires: {
      log: 'read',
      reproduced: true,
      located: true,
      debugger: 'attached',
      patch: 'reviewed',
      tests: 'green',
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Read the last 30 lines of the failing CI log at logs/ci-run-482.log.',
        hintTerm: 'Log',
        accept: ['tail -n 30 logs/ci-run-482.log', 'tail -30 logs/ci-run-482.log'],
        acceptRe: ['^tail\\b.*logs/ci-run-482\\.log$', '^cat\\s+logs/ci-run-482\\.log$'],
        stdout:
          "> shop-api@2.4.0 test\n> jest --runInBand\n\nPASS  tests/auth.test.js\nFAIL  tests/cart.test.js\n  ● applyDiscount › ignores a missing coupon\n\n    TypeError: Cannot read properties of undefined (reading 'code')\n\n      35 | function applyDiscount(cart, coupon) {\n      36 |   const total = cart.items.reduce((sum, i) => sum + i.price, 0);\n    > 37 |   return total * (1 - RATES[coupon.code]);\n         |                                    ^\n      38 | }\n\n      at applyDiscount (src/cart.js:37:36)\n      at Object.<anonymous> (tests/cart.test.js:31:20)\n\nTest Suites: 1 failed, 1 passed, 2 total\nTests:       1 failed, 18 passed, 19 total\nSnapshots:   0 total\nTime:        3.42 s\nRan all test suites.\nError: Process completed with exit code 1.",
        setState: { log: 'read' },
        hints: [
          'CI already wrote down exactly how the process died — read the end of what it wrote.',
          'Print the final lines of a file with `tail -n …`',
          'tail -n 30 logs/ci-run-482.log',
        ],
      },
      {
        id: 's2',
        promptEn: 'Reproduce the crash on your own machine by running only the cart test suite.',
        hintTerm: 'Crash',
        accept: ['npm test -- cart', 'npx jest cart', 'npm test -- tests/cart.test.js'],
        acceptRe: ['^(npm\\s+(run\\s+)?test|npx\\s+jest)\\b.*cart'],
        stdout:
          "> shop-api@2.4.0 test\n> jest --runInBand cart\n\nFAIL  tests/cart.test.js\n  ● applyDiscount › ignores a missing coupon\n\n    TypeError: Cannot read properties of undefined (reading 'code')\n\n      35 | function applyDiscount(cart, coupon) {\n      36 |   const total = cart.items.reduce((sum, i) => sum + i.price, 0);\n    > 37 |   return total * (1 - RATES[coupon.code]);\n         |                                    ^\n      38 | }\n\n      at applyDiscount (src/cart.js:37:36)\n      at Object.<anonymous> (tests/cart.test.js:31:20)\n\nTest Suites: 1 failed, 1 total\nTests:       1 failed, 3 passed, 4 total\nSnapshots:   0 total\nTime:        1.42 s\nRan all test suites matching /cart/i.",
        setState: { reproduced: true },
        hints: [
          'A bug you cannot reproduce locally is a bug you cannot fix — run the suite that failed, and only that one.',
          'The project runs its tests through npm; pass the suite name after `--`.',
          'npm test -- cart',
        ],
      },
      {
        id: 's3',
        promptEn:
          'The trace blames one line, but you need every caller too: search the src/ tree for the coupon, with line numbers.',
        hintTerm: 'Bug',
        accept: [
          'grep -rn coupon src/',
          'grep -rn "coupon" src/',
          "grep -rn 'coupon' src/",
          'grep -rn coupon src',
        ],
        acceptRe: ['^(grep|rg)\\b.*coupon.*src'],
        stdout:
          'src/cart.js:35:function applyDiscount(cart, coupon) {\nsrc/cart.js:37:  return total * (1 - RATES[coupon.code]);\nsrc/routes/checkout.js:18:  const discounted = applyDiscount(cart, req.body.coupon);',
        setState: { located: true },
        hints: [
          'The stack trace named one file, but you need every caller — search the whole source tree.',
          'Search recursively and show line numbers: `grep -rn <word> src/`',
          'grep -rn coupon src/',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Start a debugging session on src/index.ts through ts-node that breaks on the first line.',
        hintTerm: 'Breakpoint',
        accept: [
          'node --inspect-brk -r ts-node/register src/index.ts',
          'node --inspect-brk=9229 -r ts-node/register src/index.ts',
        ],
        acceptRe: ['^node\\s+--inspect-brk(=\\d+)?\\s+-r\\s+ts-node/register\\s+src/index\\.ts$'],
        stdout:
          'Debugger listening on ws://127.0.0.1:9229/6f1b0e4c-2a55-4f0a-9d1e-0c7c1f8a2b31\nFor help, see: https://nodejs.org/en/docs/inspector\nDebugger attached.',
        setState: { debugger: 'attached' },
        hints: [
          'You want the process to stop before the first line runs, so you can step into applyDiscount yourself.',
          'Start with `node --inspect-brk …` and require the TypeScript loader with -r.',
          'node --inspect-brk -r ts-node/register src/index.ts',
        ],
      },
      {
        id: 's5',
        promptEn:
          'You added a default rate so a missing coupon cannot crash the request. Review that patch in src/cart.js before committing it.',
        hintTerm: 'Patch / Fix',
        accept: ['git diff src/cart.js', 'git diff', 'git diff -- src/cart.js'],
        acceptRe: ['^git\\s+diff\\b'],
        stdout:
          'diff --git a/src/cart.js b/src/cart.js\nindex 4a1c8de..b7e0f52 100644\n--- a/src/cart.js\n+++ b/src/cart.js\n@@ -34,7 +34,8 @@ const RATES = { SUMMER10: 0.1, WELCOME5: 0.05 };\n \n function applyDiscount(cart, coupon) {\n   const total = cart.items.reduce((sum, i) => sum + i.price, 0);\n-  return total * (1 - RATES[coupon.code]);\n+  const rate = coupon ? RATES[coupon.code] || 0 : 0;\n+  return total * (1 - rate);\n }\n \n module.exports = { applyDiscount };',
        setState: { patch: 'reviewed' },
        hints: [
          'Never commit a fix you have not re-read — ask Git to show you the change itself.',
          'The command that prints unstaged changes is `git diff …`',
          'git diff src/cart.js',
        ],
      },
      {
        id: 's6',
        promptEn: 'Prove the fix: run the cart suite again and check it is green.',
        hintTerm: 'Debugging',
        accept: ['npm test -- cart', 'npx jest cart', 'npm test -- tests/cart.test.js'],
        acceptRe: ['^(npm\\s+(run\\s+)?test|npx\\s+jest)\\b.*cart'],
        stdout:
          '> shop-api@2.4.0 test\n> jest --runInBand cart\n\nPASS  tests/cart.test.js\n  applyDiscount\n    ✓ applies a percentage coupon (4 ms)\n    ✓ applies the welcome coupon (2 ms)\n    ✓ returns 0 for an empty cart (1 ms)\n    ✓ ignores a missing coupon (1 ms)\n\nTest Suites: 1 passed, 1 total\nTests:       4 passed, 4 total\nSnapshots:   0 total\nTime:        1.19 s\nRan all test suites matching /cart/i.',
        setState: { tests: 'green' },
        hints: [
          'A fix is only finished when the test that caught the bug passes.',
          'Run exactly the same command you used to reproduce the crash.',
          'npm test -- cart',
        ],
      },
    ],
  },

  // ── Level 1 · Collaborazione — inspect and judge someone else's work ───
  dev_git_collab: {
    title: 'Work the review queue for the v2.0 milestone',
    intro:
      'Sei il revisore di turno e la milestone v2.0 e bloccata da una pull request di un contributor esterno. / You are the reviewer on duty and the v2.0 milestone is blocked by an outside contributor pull request. Read it properly before you approve it.',
    cwd0: '/home/dev/payments-api',
    vocab: ['Milestone', 'Issue', 'Pull Request (PR)', 'Contributor', 'Code Review'],
    requires: {
      milestone: 'checked',
      prs: 'listed',
      author: 'seen',
      diff: 'read',
      checks: 'green',
      review: 'approved',
    },
    steps: [
      {
        id: 's1',
        promptEn: 'List the open issues still attached to the v2.0 milestone.',
        hintTerm: 'Milestone',
        accept: [
          'gh issue list --milestone "v2.0" --state open',
          "gh issue list --milestone 'v2.0' --state open",
          'gh issue list --milestone v2.0 --state open',
          'gh issue list --state open --milestone "v2.0"',
        ],
        acceptRe: ['^gh\\s+issue\\s+list\\b.*--milestone\\b'],
        stdout:
          'Showing 2 of 2 open issues in acme/payments-api that match your search\n\nID   TITLE                                 LABELS              UPDATED\n#42  bug: login fails with empty password  bug, priority:high  about 3 days ago\n#57  docs: document the SSO feature flag   documentation       about 2 days ago',
        setState: { milestone: 'checked' },
        hints: [
          'Start from what the release still owes: the open work filed against that version.',
          'The GitHub CLI lists issues — filter them by milestone and state.',
          'gh issue list --milestone "v2.0" --state open',
        ],
      },
      {
        id: 's2',
        promptEn: 'List the open pull requests so you can find the one that closes issue #42.',
        hintTerm: 'Pull Request (PR)',
        accept: ['gh pr list --state open', 'gh pr list'],
        acceptRe: ['^gh\\s+pr\\s+list\\b'],
        stdout:
          'Showing 3 of 3 open pull requests in acme/payments-api\n\nID    TITLE                      BRANCH          CREATEDAT\n#128  feat(auth): add SSO login  sso-login       about 5 hours ago\n#126  docs: fix README typos     docs/readme     about 1 day ago\n#119  chore: bump eslint to v9   chore/eslint-9  about 4 days ago',
        setState: { prs: 'listed' },
        hints: [
          'An issue is closed by a proposed change — go and see which changes are waiting.',
          'Same CLI as the previous step, different noun: `gh pr …`',
          'gh pr list --state open',
        ],
      },
      {
        id: 's3',
        promptEn: 'Open pull request 128 and read who wrote it and what it claims to close.',
        hintTerm: 'Contributor',
        accept: ['gh pr view 128', 'gh pr view 128 --comments'],
        acceptRe: ['^gh\\s+pr\\s+view\\b(?=.*\\b128\\b)'],
        stdout:
          'feat(auth): add SSO login #128\nOpen • m-rossi wants to merge 3 commits into main from sso-login • about 5 hours ago\nReviewers: @team/backend (Requested)\nLabels: enhancement\nMilestone: v2.0\n\n  Closes #42. Adds an SSO login flow behind the AUTH_SSO feature flag and\n  rejects an empty password with 400 instead of a 500.\n  First contribution here — happy to split the commits if you prefer.\n\nView this pull request on GitHub: https://github.com/acme/payments-api/pull/128',
        setState: { author: 'seen' },
        hints: [
          'Before judging a change, find out who is proposing it and what problem they say it solves.',
          'The CLI can print one pull request in full: `gh pr view …`',
          'gh pr view 128',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Read the actual code change of pull request 128 before you say anything about it.',
        hintTerm: 'Code Review',
        accept: ['gh pr diff 128', 'gh pr diff 128 --color never'],
        acceptRe: ['^gh\\s+pr\\s+diff\\b(?=.*\\b128\\b)'],
        stdout:
          "diff --git a/src/auth/login.ts b/src/auth/login.ts\nindex 2c9a41f..e5b7d10 100644\n--- a/src/auth/login.ts\n+++ b/src/auth/login.ts\n@@ -12,6 +12,12 @@ export async function login(req: Request, res: Response) {\n   const { email, password } = req.body;\n   const ip = req.ip;\n \n+  if (!password) {\n+    return res.status(400).json({ error: 'password_required' });\n+  }\n+  if (flags.AUTH_SSO && req.body.provider) {\n+    return ssoLogin(req, res);\n+  }\n   const user = await users.findByEmail(email);\n   if (!user) {\n     return res.status(401).json({ error: 'invalid_credentials' });\n\ndiff --git a/tests/login.test.ts b/tests/login.test.ts\nindex 7d3e0aa..1f42b96 100644\n--- a/tests/login.test.ts\n+++ b/tests/login.test.ts\n@@ -20,3 +20,8 @@ describe('login', () => {\n     expect(res.status).toBe(200);\n   });\n+\n+  it('rejects an empty password with 400', async () => {\n+    const res = await request(app).post('/login').send({ email: 'a@example.com' });\n+    expect(res.status).toBe(400);\n+  });\n });",
        setState: { diff: 'read' },
        hints: [
          'A review of a description is not a review — you need the lines that changed.',
          'The CLI prints the unified diff of a pull request: `gh pr diff …`',
          'gh pr diff 128',
        ],
      },
      {
        id: 's5',
        promptEn: 'Check that CI is actually green on pull request 128 before approving it.',
        hintTerm: 'Code Review',
        accept: ['gh pr checks 128'],
        acceptRe: ['^gh\\s+pr\\s+checks\\b(?=.*\\b128\\b)'],
        stdout:
          'All checks were successful\n0 cancelled, 0 failing, 4 successful, 0 skipped, and 0 pending\n\n   NAME        ELAPSED  URL\n✓  lint        24s      https://github.com/acme/payments-api/actions/runs/9001/job/24711\n✓  unit-tests  1m12s    https://github.com/acme/payments-api/actions/runs/9001/job/24712\n✓  build       58s      https://github.com/acme/payments-api/actions/runs/9001/job/24713\n✓  codeql      2m03s    https://github.com/acme/payments-api/actions/runs/9001/job/24714',
        setState: { checks: 'green' },
        hints: [
          'Your eyes are not the only reviewer — the pipeline has an opinion too.',
          'Ask the CLI for the status checks of that pull request: `gh pr checks …`',
          'gh pr checks 128',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Approve pull request 128 with a short review comment so the contributor can merge.',
        hintTerm: 'Code Review',
        accept: [
          'gh pr review 128 --approve --body "LGTM, thanks for adding the test"',
          "gh pr review 128 --approve --body 'LGTM, thanks for adding the test'",
          'gh pr review 128 --approve',
          'gh pr review --approve 128',
        ],
        acceptRe: ['^gh\\s+pr\\s+review\\b(?=.*\\b128\\b)(?=.*--approve\\b)'],
        stdout: '✓ Approved pull request #128',
        setState: { review: 'approved' },
        hints: [
          'The change is read and CI is green — record your verdict so it stops blocking the milestone.',
          'The verb is `gh pr review …`, and you need the flag that means "approve".',
          'gh pr review 128 --approve --body "LGTM, thanks for adding the test"',
        ],
      },
    ],
  },

  // ── Level 0 · Documentazione — cut a release and its docs ──────────────
  dev_basics_4: {
    title: 'Cut the 1.3.0 release and its documentation',
    intro:
      'La feature di autenticazione e mergiata e tocca a te fare il rilascio come descritto nel README. / The auth feature is merged and it is your turn to cut the release exactly as the README describes it.',
    cwd0: '/home/dev/payments-api',
    vocab: ['README', 'Documentation', 'Manual', 'Versioning', 'API Reference'],
    requires: {
      readme: 'read',
      manual: 'checked',
      version: '1.3.0',
      tag: 'verified',
      apidocs: 'built',
      pushed: true,
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'Print the README so you can follow the release procedure this project documents.',
        hintTerm: 'README',
        accept: ['cat README.md', 'less README.md'],
        acceptRe: ['^(cat|less|more)\\s+\\.?/?readme\\.md$'],
        stdout:
          '# payments-api\n\nPayment endpoints for the ACME storefront.\n\n## Release procedure\n1. Bump the minor version with npm; it writes package.json and creates an annotated tag.\n2. Regenerate the API reference into docs/api.\n3. Push the release commit together with its tag.\n\n## Notes\nSigning a release commit is optional on this repo; the flag is documented in the\ngit commit manual. Look it up before you have to use it.',
        setState: { readme: 'read' },
        hints: [
          'The project already documents how it is released — read the file every repository starts with.',
          'Print a file to the terminal with `cat …`',
          'cat README.md',
        ],
      },
      {
        id: 's2',
        promptEn:
          'The README sends you to the git commit manual for the signing flag. Open that manual in a pager.',
        hintTerm: 'Manual',
        accept: ['git help commit | less', 'git help commit', 'man git-commit'],
        acceptRe: ['^git\\s+help\\s+commit\\b', '^man\\s+git-commit$'],
        stdout:
          'GIT-COMMIT(1)                     Git Manual                     GIT-COMMIT(1)\n\nNAME\n       git-commit - Record changes to the repository\n\nSYNOPSIS\n       git commit [-a | --interactive | --patch] [-s] [-v] [-u[<mode>]]\n                  [--amend] [--dry-run] [(-c | -C | --squash) <commit> |\n                  --fixup [(amend|reword):]<commit>] [-F <file> | -m <msg>]\n                  [--reset-author] [--allow-empty] [--allow-empty-message]\n                  [--no-verify] [-e] [--author=<author>] [--date=<date>]\n                  [--cleanup=<mode>] [--[no-]status] [-i | -o]\n                  [--pathspec-from-file=<file> [--pathspec-file-nul]]\n                  [(--trailer <token>[(=|:)<value>])...] [-S[<keyid>]]\n                  [--] [<pathspec>...]\n\nDESCRIPTION\n       Create a new commit containing the current contents of the index and the\n       given log message describing the changes. The new commit is a direct\n       child of HEAD, usually the tip of the current branch, and the branch is\n       updated to point to it (unless no branch is associated with the working\n       tree, in which case HEAD is "detached" as described in git-checkout(1)).\n\n Manual page git-commit(1) line 1 (press h for help or q to quit)',
        setState: { manual: 'checked' },
        hints: [
          'Do not guess the flag — Git ships its own manual for every subcommand.',
          'Ask git for help on a subcommand and pipe it into a pager: `git help … | less`',
          'git help commit | less',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Bump the package to the next minor version with the release message "release: bump to %s with new auth feature".',
        hintTerm: 'Versioning',
        accept: [
          'npm version minor -m "release: bump to %s with new auth feature"',
          "npm version minor -m 'release: bump to %s with new auth feature'",
          'npm version minor',
        ],
        acceptRe: ['^npm\\s+version\\s+minor\\b'],
        stdout: 'v1.3.0',
        setState: { version: '1.3.0' },
        hints: [
          'A new feature with no breaking change moves the middle number of the semantic version.',
          'npm can do the bump, the commit and the tag in one go: `npm version <level> -m "…"`',
          'npm version minor -m "release: bump to %s with new auth feature"',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Confirm what npm created: show the v1.3.0 tag with the list of files it touched.',
        hintTerm: 'Versioning',
        accept: ['git show v1.3.0 --stat', 'git show --stat v1.3.0'],
        acceptRe: ['^git\\s+show\\b.*v1\\.3\\.0'],
        stdout:
          'tag v1.3.0\nTagger: Dev Team <dev@example.com>\nDate:   Wed Mar 11 11:04:22 2026 +0100\n\nrelease: bump to 1.3.0 with new auth feature\n\ncommit 6d21f0b9c4a7e35b0f1c8d2a9b3e4f5a7c60e1d8 (HEAD -> main, tag: v1.3.0)\nAuthor: Dev Team <dev@example.com>\nDate:   Wed Mar 11 11:04:21 2026 +0100\n\n    release: bump to 1.3.0 with new auth feature\n\n package.json      | 2 +-\n package-lock.json | 4 ++--\n 2 files changed, 3 insertions(+), 3 deletions(-)',
        setState: { tag: 'verified' },
        hints: [
          'Trust, then verify: look at the annotated tag the version bump left behind.',
          'Inspect any object with `git show …`, and ask for the per-file summary.',
          'git show v1.3.0 --stat',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Regenerate the API reference from src/index.ts into docs/api so the published docs match 1.3.0.',
        hintTerm: 'API Reference',
        accept: [
          'npx typedoc --out docs/api src/index.ts',
          'npx typedoc src/index.ts --out docs/api',
        ],
        acceptRe: ['^npx\\s+typedoc\\b.*docs/api'],
        stdout:
          '[info] Loaded plugin typedoc-plugin-markdown\n[warning] Documentation for parameter "provider" was not found.\n[info] Documentation generated at ./docs/api',
        setState: { apidocs: 'built' },
        hints: [
          'The reference is generated from the source comments, not written by hand.',
          'Run the doc generator without installing it globally: `npx typedoc --out <dir> <entry>`',
          'npx typedoc --out docs/api src/index.ts',
        ],
      },
      {
        id: 's6',
        promptEn: 'Push the release commit to origin main together with the tag it carries.',
        hintTerm: 'Versioning',
        accept: ['git push --follow-tags origin main', 'git push origin main --follow-tags'],
        acceptRe: ['^git\\s+push\\b.*--follow-tags\\b'],
        stdout:
          'Enumerating objects: 9, done.\nCounting objects: 100% (9/9), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (4/4), done.\nWriting objects: 100% (5/5), 612 bytes | 612.00 KiB/s, done.\nTotal 5 (delta 3), reused 0 (delta 0), pack-reused 0\nTo github.com:acme/payments-api.git\n   9b1c4e2..6d21f0b  main -> main\n * [new tag]         v1.3.0 -> v1.3.0',
        setState: { pushed: true },
        hints: [
          'A tag that never leaves your laptop is not a release — send it with the commit.',
          'A plain push leaves tags behind; there is a flag that takes the annotated ones along.',
          'git push --follow-tags origin main',
        ],
      },
    ],
  },
};
