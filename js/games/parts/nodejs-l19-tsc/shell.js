/* eslint-disable no-loop-func -- WIP checkpoint 2026-09-14: new games moved to the Godot app, this web port is frozen as-is */
/**
 * tsc — the shell of the virtual project. A coherent emulator (ricerca/22
 * §22.4.4): a real virtual filesystem, real outputs in English (§22.4.7), no
 * command menu, no autocomplete of the next command — only Tab on paths.
 *
 * The level module hands `run()` its hooks so the shell never reaches into
 * the checker, the commit grading or the spine.
 */

const DIRS = ['src', 'test'];

/** A path as typed → a file of the project, or null. */
export function resolve(files, arg) {
  if (!arg) return null;
  const k = arg.replace(/^\.\//, '');
  if (files[k]) return k;
  for (const f of Object.keys(files)) if (f.split('/').pop() === k) return f;
  return null;
}

/** Tab: complete the last token against the project's paths (§22.4.2). */
export function complete(files, value) {
  const m = value.match(/(\S*)$/)[1];
  if (!m) return value;
  const names = Object.keys(files);
  const hit =
    names.find((f) => f.indexOf(m) === 0) ||
    DIRS.map((d) => `${d}/`).find((d) => d.indexOf(m) === 0) ||
    names.find((f) => f.split('/').pop().indexOf(m) === 0);
  if (!hit) return value;
  return value.slice(0, value.length - m.length) + hit;
}

function split(raw) {
  return raw.trim().split(/\s+/);
}

function changed(host) {
  return Object.keys(host.files).filter(
    (f) => JSON.stringify(host.files[f]) !== JSON.stringify(host.base[f] || null)
  );
}

function hash(seed) {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0').slice(0, 7);
}

/** Parse `git commit …`: `-a`/`-am` stage everything, `-m` carries the subject. */
export function parseCommit(rest) {
  const all = /(^|\s)-(a|am|ma)(\s|$)|--all/.test(rest);
  const m =
    rest.match(/(?:^|\s)-(?:a?m|ma)\s+([\s\S]*)$/) || rest.match(/--message[=\s]+([\s\S]*)$/);
  let msg = null;
  if (m) {
    msg = m[1].trim();
    const q = msg[0];
    if ((q === '"' || q === "'") && msg.length >= 2 && msg.endsWith(q)) msg = msg.slice(1, -1);
    else if (q === '"' || q === "'") msg = msg.slice(1);
    msg = msg.trim();
  }
  return { all, msg, hasM: Boolean(m) };
}

function git(host, a, rest, hooks) {
  const sub = a[1] || '';
  const print = hooks.print;
  if (sub === 'status') {
    const mod = changed(host);
    print('On branch main', 'out');
    if (!mod.length) print('nothing to commit, working tree clean', 'out');
    else {
      const staged = mod.filter((f) => host.staged.has(f));
      const loose = mod.filter((f) => !host.staged.has(f));
      if (staged.length) {
        print('Changes to be committed:', 'out');
        for (const f of staged) print(`        modified:   ${f}`, 'out');
      }
      if (loose.length) {
        print('Changes not staged for commit:', 'out');
        print('  (use "git add <file>..." to update what will be committed)', 'dim');
        for (const f of loose) print(`        modified:   ${f}`, 'out');
      }
    }
    print('', 'out');
    return;
  }
  if (sub === 'log') {
    for (const c of host.commits.slice().reverse()) print(`${c.hash} ${c.subject}`, 'out');
    print(`${hash('init')} init`, 'dim');
    print('', 'out');
    return;
  }
  if (sub === 'diff') {
    const mod = changed(host);
    for (const f of mod) {
      print(`--- a/${f}`, 'dim');
      print(`+++ b/${f}`, 'dim');
      const before = host.base[f] || [];
      const after = host.files[f];
      const n = Math.max(before.length, after.length);
      for (let i = 0; i < n; i++) {
        if (before[i] === after[i]) continue;
        if (before[i] != null) print(`-${before[i]}`, 'err');
        if (after[i] != null) print(`+${after[i]}`, 'out');
      }
    }
    print('', 'out');
    return;
  }
  if (sub === 'add') {
    const target = a[2] || '';
    if (!target) {
      print('Nothing specified, nothing added.', 'err');
      print('', 'out');
      return;
    }
    if (target === '.' || target === '-A' || target === '--all') {
      for (const f of changed(host)) host.staged.add(f);
    } else {
      const f = resolve(host.files, target);
      if (!f) {
        print(`fatal: pathspec '${target}' did not match any files`, 'err');
        print('', 'out');
        return;
      }
      host.staged.add(f);
    }
    return;
  }
  if (sub === 'checkout' || sub === 'restore') {
    hooks.restart();
    return;
  }
  if (sub === 'commit') {
    const { all, msg, hasM } = parseCommit(rest);
    const mod = changed(host);
    if (!mod.length) {
      print('On branch main', 'out');
      print('nothing to commit, working tree clean', 'out');
      print('', 'out');
      return;
    }
    const staged = all ? mod : mod.filter((f) => host.staged.has(f));
    if (!staged.length) {
      print('On branch main', 'out');
      print('Changes not staged for commit:', 'out');
      for (const f of mod) print(`        modified:   ${f}`, 'out');
      print('no changes added to commit (use "git add" and/or "git commit -a")', 'err');
      print('', 'out');
      return;
    }
    if (!hasM || !msg) {
      print('Aborting commit due to empty commit message.', 'err');
      print('', 'out');
      return;
    }
    const accepted = hooks.commitMsg(msg);
    if (!accepted) return;
    const h = hash(`${host.nCmd}:${msg}:${staged.join(',')}`);
    host.commits.push({ hash: h, subject: msg, files: staged.slice() });
    for (const f of staged) host.base[f] = host.files[f].slice();
    host.staged.clear();
    print(`[main ${h}] ${msg}`, 'out');
    print(
      ` ${staged.length} file${staged.length > 1 ? 's' : ''} changed, 1 insertion(+), 1 deletion(-)`,
      'out'
    );
    print('', 'out');
    hooks.committed(msg);
    return;
  }
  print(`git: '${sub}' is not a git command. See 'git --help'.`, 'err');
  print('', 'out');
}

/**
 * One line of the prompt. Returns nothing; every consequence is a line of
 * output or a change of the project's state. `clear` is free; the rest count
 * (the count is the constraint of chapters 4 and 8).
 */
export function run(host, raw, hooks) {
  const c = raw.trim();
  if (!c) return;
  const print = hooks.print;
  print(`$ ${c}`, 'cmd');
  const a = split(c);
  const cmd = a[0];
  const arg = a[1] || '';
  if (cmd === 'clear') {
    host.lines = [];
    host.q = [];
    return;
  }
  host.nCmd += 1;
  host.hist.push(c);
  host.hi = host.hist.length;
  if (cmd === 'ls') {
    const flags = a.slice(1).filter((t) => t[0] === '-');
    const all = flags.some((f) => f.includes('a'));
    const dir = (a.slice(1).find((t) => t[0] !== '-') || '').replace(/\/$/, '');
    const names = Object.keys(host.files).filter((f) => (all ? true : f[0] !== '.'));
    const set = names.filter((f) => (dir ? f.indexOf(`${dir}/`) === 0 : f.indexOf('/') < 0));
    const dirs = dir
      ? []
      : DIRS.concat(
          all
            ? names.filter((f) => f[0] === '.' && f.includes('/')).map((f) => f.split('/')[0])
            : []
        );
    const shown = [...new Set(dirs)].concat(set.map((f) => (dir ? f.slice(dir.length + 1) : f)));
    print(shown.join('  '), 'out');
    print('', 'out');
    return;
  }
  if (cmd === 'cat') {
    const f = resolve(host.files, arg);
    if (!f) {
      print(`cat: ${arg}: No such file or directory`, 'err');
      print('', 'out');
      return;
    }
    for (const l of host.files[f]) print(l, 'out');
    print('', 'out');
    hooks.useful();
    return;
  }
  if (cmd === 'grep') {
    const pat = a
      .slice(1)
      .filter((t) => t[0] !== '-')
      .join(' ')
      .replace(/['"]/g, '');
    let hit = 0;
    for (const f of Object.keys(host.files)) {
      host.files[f].forEach((l, i) => {
        if (pat && l.indexOf(pat) >= 0) {
          print(`${f}:${i + 1}:${l}`, 'out');
          hit++;
        }
      });
    }
    print('', 'out');
    if (hit) hooks.useful();
    return;
  }
  if (cmd === 'nano' || cmd === 'vi' || cmd === 'vim') {
    const f = resolve(host.files, arg);
    if (!f) {
      print(`${cmd}: ${arg}: No such file or directory`, 'err');
      print('', 'out');
      return;
    }
    hooks.useful();
    hooks.openNano(f);
    return;
  }
  if (cmd === 'tsc' || (cmd === 'npx' && a[1] === 'tsc') || (cmd === 'npm' && a[2] === 'build')) {
    hooks.useful();
    hooks.tsc();
    return;
  }
  if (cmd === 'git') {
    hooks.useful();
    git(host, a, a[1] ? c.slice(c.indexOf(a[1]) + a[1].length) : '', hooks);
    return;
  }
  if (cmd === 'pwd') {
    print('/home/api', 'out');
    print('', 'out');
    return;
  }
  print(`${cmd}: command not found`, 'err');
  print('', 'out');
}
