/**
 * GIT & VERSION CONTROL LABS - Knowledge AIO
 * ==========================================
 *
 * Declarative terminal-lab scripts for the `git-vcs` topic, keyed by lesson.id.
 * Consumed by LabEngine as the applied beat inside a LessonV2 lesson and by the
 * Lab practice mode (js/topics/TopicPracticeLabMode.js).
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabEngine compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is matched
 * by goal (setState), not by exact string, and a wrong command never aborts.
 *
 * The four labs form one continuous story around the same fictional service
 * (`invoice-api`): set the machine up, read a repo you did not write, clean up a
 * file that should never have been committed, then ship a hotfix on a branch.
 *
 * Convention for commands that really print nothing (git config, git add,
 * git mv, git restore, shell redirects): the stdout opens with a `#` note saying
 * so, then shows the file or index state the silent command produced. Nothing
 * is invented as fake tool output.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 */

export default {
  git_foundations_3: {
    title: 'Set up Git on a brand-new laptop',
    intro:
      "Primo giorno nel team: il portatile è arrivato un'ora fa e Git non ha ancora un'identità. / First day on the team: the laptop arrived an hour ago and Git has no identity yet. Configure it before your first commit lands with the wrong author.",
    cwd0: '/home/dev/invoice-api',
    vocab: ['Version', 'User Name', 'User Email', 'Default Branch', 'Initialize'],
    requires: {
      version: 'checked',
      name: 'set',
      email: 'set',
      defaultBranch: 'main',
      configVerified: true,
      repo: 'initialized',
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Find out which version of Git this machine has installed.',
        hintTerm: 'Version',
        accept: ['git --version', 'git version'],
        acceptRe: ['^git\\s+(--)?version\\b'],
        stdout: 'git version 2.43.0',
        setState: { version: 'checked' },
        hints: [
          'Before configuring anything, ask the tool to identify itself — several flags only exist in recent releases.',
          'Start with `git` and the long flag every CLI tool understands.',
          'git --version',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Set your user name globally to Mario Rossi, so every commit is attributed to you.',
        hintTerm: 'User Name',
        accept: [
          'git config --global user.name "Mario Rossi"',
          "git config --global user.name 'Mario Rossi'",
        ],
        acceptRe: ['^git\\s+config\\s+--global\\s+user\\.name\\s+.*mario.*rossi'],
        stdout:
          '# git config prints nothing when a write succeeds\n# /home/dev/.gitconfig now contains:\n[user]\n\tname = Mario Rossi',
        setState: { name: 'set' },
        hints: [
          'Git stamps a name on every commit. You are storing it once, for every repository on this machine.',
          'Use `git config --global user.name …` and quote the value, because it contains a space.',
          'git config --global user.name "Mario Rossi"',
        ],
      },
      {
        id: 's3',
        promptEn: 'Set your user email globally to mario.rossi@example.com.',
        hintTerm: 'User Email',
        accept: [
          'git config --global user.email "mario.rossi@example.com"',
          'git config --global user.email mario.rossi@example.com',
        ],
        acceptRe: ['^git\\s+config\\s+--global\\s+user\\.email\\s+.*mario\\.rossi@example\\.com'],
        stdout:
          '# silent again — /home/dev/.gitconfig now reads:\n[user]\n\tname = Mario Rossi\n\temail = mario.rossi@example.com',
        setState: { email: 'set' },
        hints: [
          'The name alone is not enough: hosting platforms match your commits to your account by email.',
          'Same command family as the previous step, but the key is `user.email`.',
          'git config --global user.email "mario.rossi@example.com"',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Make `main` the default branch name for every repository you create from now on.',
        hintTerm: 'Default Branch',
        accept: ['git config --global init.defaultBranch main'],
        acceptRe: ['^git\\s+config\\s+--global\\s+init\\.defaultbranch\\s+main\\b'],
        stdout:
          '# nothing printed — /home/dev/.gitconfig gained a new section:\n[init]\n\tdefaultBranch = main',
        setState: { defaultBranch: 'main' },
        hints: [
          'Old Git versions still start new repositories on `master`. Your team standard is a different branch name.',
          'Still `git config --global …`, but this time the key lives in the `init` section.',
          'git config --global init.defaultBranch main',
        ],
      },
      {
        id: 's5',
        promptEn: 'Print every global setting back, to verify the three values you just stored.',
        hintTerm: 'User Name',
        accept: [
          'git config --global --list',
          'git config --list --global',
          'git config --global -l',
        ],
        acceptRe: ['^git\\s+config\\s+(--global\\s+(--list|-l)|(--list|-l)\\s+--global)\\b'],
        stdout:
          'user.name=Mario Rossi\nuser.email=mario.rossi@example.com\ninit.defaultbranch=main',
        setState: { configVerified: true },
        hints: [
          'Never trust a silent write — read the configuration back before you rely on it.',
          'Add a listing flag to `git config --global …`.',
          'git config --global --list',
        ],
      },
      {
        id: 's6',
        promptEn: 'Initialize a Git repository in this project folder.',
        hintTerm: 'Initialize',
        accept: ['git init', 'git init .'],
        acceptRe: ['^git\\s+init\\b'],
        stdout: 'Initialized empty Git repository in /home/dev/invoice-api/.git/',
        setState: { repo: 'initialized' },
        hints: [
          'The folder holds source files but Git is not watching it yet. Create the hidden `.git` database inside it.',
          'One short `git` subcommand, no flags and no arguments needed.',
          'git init',
        ],
      },
    ],
  },

  git_basics_2: {
    title: 'Read the repository before you touch it',
    intro:
      'Giulia è in ferie e ha lasciato la working tree a metà lavoro. / Giulia is on holiday and left the working tree half-finished. Read what is staged, what is not, and what already shipped — before you change a single line.',
    cwd0: '/home/dev/invoice-api',
    vocab: [
      'git status',
      'git diff',
      'git diff --staged',
      'git log --oneline',
      'git show',
      'git log --graph',
    ],
    requires: {
      status: 'read',
      unstaged: 'reviewed',
      staged: 'reviewed',
      history: 'read',
      lastCommit: 'inspected',
      graph: 'read',
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'Show the state of the working tree: what is staged, what is modified, what is untracked.',
        hintTerm: 'git status',
        accept: ['git status', 'git status -s', 'git status --short'],
        acceptRe: ['^git\\s+status\\b'],
        stdout:
          'On branch main\nYour branch is up to date with \'origin/main\'.\n\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n\tmodified:   src/invoice.js\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\tmodified:   src/tax.js\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\tnotes.todo',
        setState: { status: 'read' },
        hints: [
          'Start with the command that summarises all three areas: index, working tree, untracked files.',
          'It is the single most typed Git command, and it takes no arguments.',
          'git status',
        ],
      },
      {
        id: 's2',
        promptEn: 'Show the change Giulia left in the working tree but did NOT stage.',
        hintTerm: 'git diff',
        accept: ['git diff', 'git diff src/tax.js'],
        acceptRe: ['^git\\s+diff\\s*(src\\/tax\\.js)?$'],
        stdout:
          'diff --git a/src/tax.js b/src/tax.js\nindex 3f8a1c2..9b2d4e7 100644\n--- a/src/tax.js\n+++ b/src/tax.js\n@@ -1,5 +1,5 @@\n function applyVat(amount) {\n-  return amount * 1.20;\n+  return amount * 1.22;\n }\n \n module.exports = { applyVat };',
        setState: { unstaged: 'reviewed' },
        hints: [
          'With no options, this command compares the working tree against the index — exactly the unstaged part.',
          'Four letters after `git`.',
          'git diff',
        ],
      },
      {
        id: 's3',
        promptEn: 'Now show the change that IS staged — what would go into the next commit.',
        hintTerm: 'git diff --staged',
        accept: ['git diff --staged', 'git diff --cached'],
        acceptRe: ['^git\\s+diff\\s+--(staged|cached)\\b'],
        stdout:
          'diff --git a/src/invoice.js b/src/invoice.js\nindex 7c1e0aa..a41b9d3 100644\n--- a/src/invoice.js\n+++ b/src/invoice.js\n@@ -40,4 +40,7 @@ class Invoice {\n     return this.lines.length;\n   }\n \n+  get total() {\n+    return this.net + this.vat;\n+  }\n }',
        setState: { staged: 'reviewed' },
        hints: [
          'Plain `git diff` skips the index. You need the flag that diffs the index against the last commit.',
          '`git diff --…` — the flag is the past participle of "stage" (its older alias is `--cached`).',
          'git diff --staged',
        ],
      },
      {
        id: 's4',
        promptEn: 'List the recent commits compactly, one line and one short hash per commit.',
        hintTerm: 'git log --oneline',
        accept: ['git log --oneline', 'git log --oneline -5', 'git log --oneline -n 5'],
        acceptRe: ['^git\\s+log\\b.*--oneline\\b'],
        stdout:
          '8f2c1ab (HEAD -> main, origin/main) Extract VAT helper into tax.js\nb91d40e Add invoice routes\nc47ea02 Add express server skeleton\n5e1d3f0 Initial commit',
        setState: { history: 'read' },
        hints: [
          'Full `git log` prints five lines per commit — far too much when you only want the shape of the history.',
          'Add the flag that squeezes each commit onto a single line.',
          'git log --oneline',
        ],
      },
      {
        id: 's5',
        promptEn: 'Show the full message and diff of the commit HEAD currently points at.',
        hintTerm: 'git show',
        accept: ['git show HEAD', 'git show', 'git show 8f2c1ab'],
        acceptRe: ['^git\\s+show\\s*(head|8f2c1ab)?$'],
        stdout:
          'commit 8f2c1ab3d9e4f70125a8c9b6d2f11e3c47ea0219 (HEAD -> main, origin/main)\nAuthor: Giulia Bianchi <giulia.bianchi@example.com>\nDate:   Tue Mar 4 09:12:44 2025 +0100\n\n    Extract VAT helper into tax.js\n\ndiff --git a/src/tax.js b/src/tax.js\nnew file mode 100644\nindex 0000000..3f8a1c2\n--- /dev/null\n+++ b/src/tax.js\n@@ -0,0 +1,5 @@\n+function applyVat(amount) {\n+  return amount * 1.20;\n+}\n+\n+module.exports = { applyVat };',
        setState: { lastCommit: 'inspected' },
        hints: [
          'One command prints a commit header plus its patch. Point it at the pointer to the current commit.',
          '`git show …` and the name of that pointer, written in capitals.',
          'git show HEAD',
        ],
      },
      {
        id: 's6',
        promptEn: 'Draw the topology of ALL branches as an ASCII graph, one line per commit.',
        hintTerm: 'git log --graph',
        accept: ['git log --oneline --graph --all', 'git log --graph --oneline --all'],
        acceptRe: ['^git\\s+log\\b(?=.*--graph)(?=.*--all)'],
        stdout:
          '* 4d0b7e1 (feature/pdf-export) Draft PDF renderer\n| * 8f2c1ab (HEAD -> main, origin/main) Extract VAT helper into tax.js\n|/\n* b91d40e Add invoice routes\n* c47ea02 Add express server skeleton\n* 5e1d3f0 Initial commit',
        setState: { graph: 'read' },
        hints: [
          'The compact log only followed the current branch. You want every branch, drawn as a tree.',
          'Keep `git log --oneline` and add two more flags: one draws the graph, one includes all refs.',
          'git log --oneline --graph --all',
        ],
      },
    ],
  },

  git_basics_3: {
    title: 'Untrack a file that should never have been committed',
    intro:
      'La CI ha segnalato che `config/secrets.env` è finito nel repository. / CI flagged that `config/secrets.env` was committed. Take it out of version control without deleting it from disk, then tidy up the rest of the tree.',
    cwd0: '/home/dev/invoice-api',
    vocab: ['git rm --cached', 'git mv', 'Rename', 'Restore File', 'Discard Changes', 'Pattern'],
    requires: {
      surveyed: true,
      untracked: 'secrets',
      ignored: true,
      renamed: true,
      restored: true,
      committed: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Survey the damage: show which files Git is currently reporting.',
        accept: ['git status', 'git status -s', 'git status --short'],
        acceptRe: ['^git\\s+status\\b'],
        stdout:
          'On branch main\nYour branch is up to date with \'origin/main\'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\tmodified:   config/secrets.env\n\tmodified:   src/tax.js\n\nno changes added to commit (use "git add" and/or "git commit -a")',
        setState: { surveyed: true },
        hints: [
          'The file shows up as "modified", which already tells you Git is tracking it. Confirm that first.',
          'The usual one-word inspection command after `git`.',
          'git status',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Stop tracking config/secrets.env, but keep the file on disk — the app still reads it.',
        hintTerm: 'git rm --cached',
        accept: [
          'git rm --cached config/secrets.env',
          'git rm --cached "config/secrets.env"',
          "git rm --cached 'config/secrets.env'",
          'git rm --cached -- config/secrets.env',
          'git rm --cached ./config/secrets.env',
        ],
        acceptRe: ['^git\\s+rm\\s+--cached\\s+(--\\s+)?(\\.\\/)?config\\/secrets\\.env$'],
        stdout: "rm 'config/secrets.env'",
        setState: { untracked: 'secrets' },
        hints: [
          'You must remove the file from the index only. Plain removal would also delete it from your working tree.',
          'Use `git rm` with the flag that touches the cached copy, not the file itself.',
          'git rm --cached config/secrets.env',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Append an ignore pattern for config/secrets.env to .gitignore so it never comes back.',
        hintTerm: 'Pattern',
        accept: [
          'echo "config/secrets.env" >> .gitignore',
          'echo config/secrets.env >> .gitignore',
          'echo "*.env" >> .gitignore',
        ],
        acceptRe: [
          '^echo\\s+.*secrets\\.env.*>>\\s*\\.gitignore\\s*$',
          '^echo\\s+.*\\*\\.env.*>>\\s*\\.gitignore\\s*$',
        ],
        stdout:
          '# a shell redirect prints nothing — .gitignore now reads:\nnode_modules/\ndist/\n*.log\nconfig/secrets.env',
        setState: { ignored: true },
        hints: [
          'Untracking alone is not enough: the next `git add .` would stage the file again unless a pattern excludes it.',
          'Append a line to `.gitignore` from the shell — `echo … >> .gitignore`.',
          'echo "config/secrets.env" >> .gitignore',
        ],
      },
      {
        id: 's4',
        promptEn: 'Rename readme.txt to README.md, keeping the rename recorded in Git.',
        hintTerm: 'git mv',
        accept: ['git mv readme.txt README.md'],
        acceptRe: ['^git\\s+mv\\s+readme\\.txt\\s+readme\\.md$'],
        stdout:
          '# git mv prints nothing — but the rename is already staged, as git status -s shows:\n M .gitignore\nD  config/secrets.env\nR  readme.txt -> README.md',
        setState: { renamed: true },
        hints: [
          'Renaming with the shell would look like a delete plus an untracked file. Let Git do the move so it stages both halves.',
          'It is the Git version of the `mv` command: `git mv <old> <new>`.',
          'git mv readme.txt README.md',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Throw away the experimental edit left in src/tax.js and restore the committed version.',
        hintTerm: 'Restore File',
        accept: ['git restore src/tax.js', 'git checkout -- src/tax.js'],
        acceptRe: [
          '^git\\s+restore\\s+src\\/tax\\.js$',
          '^git\\s+checkout\\s+--\\s+src\\/tax\\.js$',
        ],
        stdout:
          '# git restore prints nothing — src/tax.js matches HEAD again\n# git status now lists no unstaged change for that file',
        setState: { restored: true },
        hints: [
          "That edit is nobody's work you need. Overwrite the working-tree copy with the last committed content.",
          'The modern command is `git restore <file>` (the older spelling is `git checkout -- <file>`).',
          'git restore src/tax.js',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Commit the whole cleanup in one command, including the .gitignore edit that is still unstaged.',
        accept: [
          'git commit -am "Stop tracking secrets.env"',
          'git commit -a -m "Stop tracking secrets.env"',
          'git add .gitignore && git commit -m "Stop tracking secrets.env"',
        ],
        acceptRe: [
          '^git\\s+commit\\s+-(am|ma)\\b.+',
          '^git\\s+commit\\s+-a\\s+-m\\b.+',
          '^git\\s+commit\\s+-m\\s+.+\\s+-a\\s*$',
          '^git\\s+add\\b.+&&\\s*git\\s+commit\\b.*-m\\b.+',
        ],
        stdout:
          '[main 3ac91f4] Stop tracking secrets.env\n 3 files changed, 1 insertion(+), 12 deletions(-)\n delete mode 100644 config/secrets.env\n rename readme.txt => README.md (100%)',
        setState: { committed: true },
        hints: [
          'The deletion and the rename are already staged; the .gitignore edit is not. One flag stages tracked changes as it commits.',
          'Combine the commit message flag with the "all tracked files" flag: `git commit -a… -m …`.',
          'git commit -am "Stop tracking secrets.env"',
        ],
      },
    ],
  },

  git_branching_1: {
    title: 'Ship a hotfix on its own branch',
    intro:
      'Un cliente segnala un crash al login in produzione e tu hai già la patch pronta. / A customer hit a login crash in production and you already patched the file — but you patched it on main, which must stay releasable. Move the work onto its own branch.',
    cwd0: '/home/dev/invoice-api',
    vocab: ['Branch', 'git branch', 'git switch -c', 'git checkout -b', 'git switch', 'main'],
    requires: {
      surveyed: true,
      onHotfix: true,
      staged: true,
      committed: true,
      backOnMain: true,
      listed: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Check which branch your uncommitted patch is sitting on.',
        hintTerm: 'main',
        accept: ['git status', 'git status -s', 'git status --short'],
        acceptRe: ['^git\\s+status\\b'],
        stdout:
          'On branch main\nYour branch is up to date with \'origin/main\'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\tmodified:   src/auth/session.js\n\nno changes added to commit (use "git add" and/or "git commit -a")',
        setState: { surveyed: true },
        hints: [
          'One command reports the current branch on its very first line, plus the files you changed.',
          'The everyday inspection command: `git s…`.',
          'git status',
        ],
      },
      {
        id: 's2',
        promptEn: 'Create the branch hotfix/login-crash and switch to it in a single command.',
        hintTerm: 'git switch -c',
        accept: ['git switch -c hotfix/login-crash', 'git checkout -b hotfix/login-crash'],
        acceptRe: ['^git\\s+(switch\\s+-c|checkout\\s+-b)\\s+hotfix\\/login-crash$'],
        stdout: "M\tsrc/auth/session.js\nSwitched to a new branch 'hotfix/login-crash'",
        setState: { onHotfix: true },
        hints: [
          'Two steps — create, then move — can be done at once. Your uncommitted edit travels with you.',
          '`git switch` with the "create" flag, or the older `git checkout -b`.',
          'git switch -c hotfix/login-crash',
        ],
      },
      {
        id: 's3',
        promptEn: 'Stage the patched file src/auth/session.js.',
        accept: ['git add src/auth/session.js', 'git add .', 'git add -A'],
        acceptRe: ['^git\\s+add\\s+(src\\/auth\\/session\\.js|\\.|-a)$'],
        stdout:
          '# git add prints nothing — git status -s now shows the file in the index:\nM  src/auth/session.js',
        setState: { staged: true },
        hints: [
          'The fix is still only in the working tree. Move it into the staging area first.',
          'It is `git add <file>` — name the file you patched.',
          'git add src/auth/session.js',
        ],
      },
      {
        id: 's4',
        promptEn: 'Commit the fix with the message "Fix null session crash on login".',
        accept: ['git commit -m "Fix null session crash on login"'],
        acceptRe: ['^git\\s+commit\\s+-m\\b.+'],
        stdout:
          '[hotfix/login-crash 6b3d02c] Fix null session crash on login\n 1 file changed, 4 insertions(+), 1 deletion(-)',
        setState: { committed: true },
        hints: [
          'Record the staged change permanently on this branch, with a message that says what it fixes.',
          '`git commit` plus the flag that passes the message inline instead of opening an editor.',
          'git commit -m "Fix null session crash on login"',
        ],
      },
      {
        id: 's5',
        promptEn: 'Go back to the default branch, main.',
        hintTerm: 'git switch',
        accept: ['git switch main', 'git checkout main'],
        acceptRe: ['^git\\s+(switch|checkout)\\s+main$'],
        stdout: "Switched to branch 'main'\nYour branch is up to date with 'origin/main'.",
        setState: { backOnMain: true },
        hints: [
          'The hotfix is safely committed on its own branch, so you can leave it and return to the main line.',
          'The modern command to change branch is `git switch <name>`.',
          'git switch main',
        ],
      },
      {
        id: 's6',
        promptEn:
          'List the local branches and confirm the hotfix branch exists and main is active.',
        hintTerm: 'git branch',
        accept: ['git branch', 'git branch --list', 'git branch -l'],
        acceptRe: ['^git\\s+branch\\s*(--list|-l)?$'],
        stdout: '  feature/pdf-export\n  hotfix/login-crash\n* main',
        setState: { listed: true },
        hints: [
          'One command prints every local branch and marks the current one with an asterisk.',
          'A single `git` subcommand, no flags needed.',
          'git branch',
        ],
      },
    ],
  },
};
