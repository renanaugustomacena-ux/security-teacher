/* eslint-disable prefer-template, no-use-before-define -- WIP checkpoint 2026-09-14: new games moved to the Godot app, this web port is frozen as-is */
/**
 * tsc — the glass of the band-4 terminal (ricerca/22, ricerca/42 §42.5 row
 * «L19 tsc · terminale (resta)»). Pure HTML building: nothing here knows a
 * command or a term, it only paints the state it is handed.
 *
 * Register: black, monospaced, amber for the diagnostics, one gold accent.
 * The only level allowed to keep the terminal look — in band 4 the text is
 * the register. None of the six colours is the app's gold (#e67e22/#FFB300).
 */

export const PALETTE = {
  nero: '#0b0c0f', // the glass
  oro: '#d9b448', // the one accent: prompt, ticks, cursor, typed commands
  ambra: '#e0a06a', // diagnostics: indented, a mark in the margin, never red
  cenere: '#8b939c', // dim lines, labels
  avorio: '#e8eef3', // what the learner types, nano's title bar
  grigio: '#c8cfd6', // command output
};

export const FONT = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";

const RULE = 'rgba(217,180,72,.14)';

export function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function tick(on) {
  if (on) {
    return `<span data-tick="1" style="width:15px;height:15px;border-radius:3px;background:${PALETTE.oro};color:${PALETTE.nero};font-size:12px;line-height:15px;text-align:center;flex:0 0 auto">✓</span>`;
  }
  return `<span data-tick="0" style="width:15px;height:15px;border-radius:3px;border:1px solid #5b636c;flex:0 0 auto"></span>`;
}

function styleTag(reduced) {
  const blink = reduced ? '' : `.tsc-cur{animation:tsc-cur .943s step-end infinite}`;
  return (
    '<style>@keyframes tsc-cur{0%,49%{opacity:1}50%,100%{opacity:0}}' +
    `${blink}` +
    `.tsc-root input{font:inherit;color:${PALETTE.avorio};background:none;border:0;outline:0;padding:0;margin:0;width:100%;caret-color:${PALETTE.oro}}` +
    `.tsc-root ::selection{background:${PALETTE.oro};color:${PALETTE.nero}}` +
    '.tsc-chip:hover{background:rgba(217,180,72,.22)}' +
    '.tsc-row:hover{background:rgba(214,219,224,.07)}</style>'
  );
}

export function headHtml(view) {
  return (
    `<div style="flex:0 0 auto;padding:12px 16px 10px;border-bottom:1px solid ${RULE};display:flex;align-items:baseline;gap:10px">` +
    `<span style="font-size:14px;color:${PALETTE.oro}">~/api</span>` +
    `<span style="font-size:13px;color:${PALETTE.cenere};flex:1">${esc(view.env)}</span>` +
    '</div>'
  );
}

/**
 * The objective: three facts about the project, verified on its state, never
 * on the string typed (ricerca/22 §22.3 lever 1). The third one carries the
 * beat's concept in Italian — the world speaks Italian, the commit subject
 * will have to speak English.
 */
export function goalHtml(view) {
  const row = (on, label, extra) =>
    `<div style="display:flex;align-items:center;gap:7px">${tick(on)}<span style="font-size:14px;color:${PALETTE.grigio}">${esc(label)}</span>${extra || ''}</div>`;
  const concept = `<span data-role="concept" style="font-size:14px;color:${PALETTE.avorio}">«${esc(view.concept)}»</span>`;
  return (
    `<div style="flex:0 0 auto;padding:11px 16px;border-bottom:1px solid ${RULE};background:rgba(217,180,72,.045)">` +
    `<div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:${PALETTE.cenere}">${esc(view.goal)}</div>` +
    '<div style="display:flex;flex-direction:column;gap:6px;margin-top:7px">' +
    row(view.okSrc, view.srcLabel) +
    row(view.okProbe, view.probeLabel) +
    row(view.okTerm, view.commitLabel, concept) +
    '</div></div>'
  );
}

const LINE_STYLE = {
  cmd: `color:${PALETTE.oro};white-space:pre-wrap;word-break:break-word`,
  err: `color:${PALETTE.ambra};padding-left:13px;border-left:2px solid rgba(224,160,106,.5);white-space:pre-wrap;word-break:break-word`,
  dim: `color:${PALETTE.cenere};white-space:pre-wrap;word-break:break-word`,
  out: `color:${PALETTE.grigio};white-space:pre-wrap;word-break:break-word`,
};

export function linesHtml(view) {
  const rows = view.lines
    .map(
      (l) =>
        `<div data-line="${esc(l.k)}" style="${LINE_STYLE[l.k] || LINE_STYLE.out}">${esc(l.t === '' ? ' ' : l.t)}</div>`
    )
    .join('');
  return `<div data-role="lines" style="height:100%;overflow-y:auto;padding:14px 16px;line-height:1.62">${rows}</div>`;
}

export function nanoHtml(view) {
  const n = view.nano;
  const rows = n.lines
    .map((t, i) => {
      const num = `<span style="color:${PALETTE.cenere};width:20px;text-align:right;flex:0 0 auto">${i + 1}</span>`;
      if (i === n.editing) {
        return (
          `<div data-nano-line="${i}" data-editing="1" style="display:flex;gap:12px;padding:0 16px;background:rgba(217,180,72,.13)">${num}` +
          '<input data-role="edit" spellcheck="false" autocapitalize="off" autocomplete="off" style="flex:1" />' +
          '</div>'
        );
      }
      const cur = i === n.cur ? 'background:rgba(214,219,224,.05);' : '';
      return (
        `<div class="tsc-row" data-act="line" data-i="${i}" data-nano-line="${i}" style="display:flex;gap:12px;padding:0 16px;cursor:text;${cur}">${num}` +
        `<span style="color:${PALETTE.grigio};white-space:pre-wrap;flex:1">${esc(t === '' ? ' ' : t)}</span></div>`
      );
    })
    .join('');
  return (
    `<div data-role="nano" style="height:100%;display:flex;flex-direction:column">` +
    `<div style="flex:0 0 auto;padding:7px 16px;background:${PALETTE.avorio};color:${PALETTE.nero};font-size:13px;display:flex;gap:10px">` +
    '<span style="font-weight:600">GNU nano 8.1</span>' +
    `<span style="flex:1;text-align:center">${esc(n.file)}</span>` +
    `${n.dirty ? '<span data-role="modified">Modified</span>' : ''}</div>` +
    `<div style="flex:1 1 auto;min-height:0;overflow-y:auto;padding:12px 0;line-height:1.75">${rows}</div>` +
    '</div>'
  );
}

export function footHtml(view) {
  return (
    `<div style="flex:0 0 auto;padding:9px 16px;border-top:1px solid ${RULE};display:flex;flex-wrap:wrap;gap:4px 14px;font-size:13px;color:${PALETTE.cenere}">` +
    `<span>errors src/ <span data-role="nerr" style="color:${PALETTE.grigio}">${esc(view.nErr)}</span></span>` +
    `<span>cmd <span data-role="ncmd" style="color:${PALETTE.grigio}">${esc(view.nCmd)}</span></span>` +
    '<span style="flex:1"></span>' +
    `<span data-role="clock">${esc(view.clock)}</span></div>`
  );
}

/** The prompt row in the shell, nano's two keys in the editor. */
export function barHtml(view) {
  if (view.nano) {
    const key = (act, k, label) =>
      `<div data-act="${act}" style="padding:11px 14px;background:${PALETTE.nero};color:${PALETTE.grigio};cursor:pointer"><span style="background:${PALETTE.avorio};color:${PALETTE.nero};padding:0 3px">${k}</span> ${label}</div>`;
    return (
      '<div style="flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(214,219,224,.16);font-size:13px">' +
      key('write', '^O', 'Write Out') +
      key('exit', '^X', 'Exit') +
      '</div>'
    );
  }
  const cursor = view.reduced
    ? `<span data-role="cursor" style="width:9px;height:17px;background:${PALETTE.oro};flex:0 0 auto;margin-left:1px"></span>`
    : `<span data-role="cursor" class="tsc-cur" style="width:9px;height:17px;background:${PALETTE.oro};flex:0 0 auto;margin-left:1px"></span>`;
  return (
    `<div data-act="focus" style="flex:0 0 auto;padding:12px 16px;display:flex;gap:9px;align-items:baseline;font-size:15px;background:rgba(217,180,72,.04);cursor:text">` +
    `<span style="color:${PALETTE.oro}">$</span>` +
    '<span style="position:relative;flex:1;min-width:0;display:flex;align-items:baseline">' +
    '<input data-role="cmd" spellcheck="false" autocapitalize="off" autocomplete="off" />' +
    `${cursor}</span></div>`
  );
}

/**
 * Syntax fragments for the Android keyboard (ricerca/33 §33.6, never a whole
 * command) and, after them, the glossary: the beat's term with its neighbours
 * from the same lesson. One silhouette, one palette — only the word differs;
 * the glow is the second rung of the error ladder, never a default.
 */
export function chipsHtml(view) {
  const chip = (t, term, glow) =>
    `<div class="tsc-chip" data-act="chip" data-v="${esc(t)}"${term ? ' data-term="1"' : ''}${glow ? ' data-glow="1"' : ''} style="flex:0 0 auto;padding:8px 12px;border-radius:6px;background:rgba(214,219,224,.09);color:${PALETTE.grigio};font-size:14px;cursor:pointer;white-space:nowrap${glow ? `;box-shadow:0 0 0 1px ${PALETTE.oro},0 0 12px rgba(217,180,72,.55)` : ''}">${esc(t)}</div>`;
  const syntax = view.syntax.map((t) => chip(t, false, false)).join('');
  const sep = `<div style="flex:0 0 auto;width:1px;background:${RULE};margin:4px 2px"></div>`;
  const terms = view.terms.map((t) => chip(t, true, view.glow === t)).join('');
  return `<div style="flex:0 0 auto;display:flex;gap:7px;padding:10px 12px;border-top:1px solid ${RULE};overflow-x:auto">${syntax}${sep}${terms}</div>`;
}

export function parts(view) {
  return {
    head: headHtml(view),
    goal: goalHtml(view),
    main: view.nano ? nanoHtml(view) : linesHtml(view),
    foot: footHtml(view),
    bar: barHtml(view),
    chips: chipsHtml(view),
  };
}

export function shellHtml(view, p) {
  const wrap = (name, html, extra) =>
    `<div data-part="${name}" style="${extra || 'flex:0 0 auto'}">${html}</div>`;
  return (
    styleTag(view.reduced) +
    `<div class="tsc-root" style="position:absolute;inset:0;display:flex;flex-direction:column;background:${PALETTE.nero};color:${PALETTE.avorio};font-family:${FONT};font-size:14px">` +
    wrap('head', p.head) +
    wrap('goal', p.goal) +
    wrap('main', p.main, 'flex:1 1 auto;min-height:0;position:relative') +
    wrap('foot', p.foot) +
    wrap('bar', p.bar) +
    wrap('chips', p.chips) +
    '</div>'
  );
}

/**
 * Paint the view into the root. A real element gets patched part by part so
 * the `<input>` the learner is typing into survives a re-render; a bare
 * `{ innerHTML }` stub (the conformance suite) gets the whole page each time.
 */
export function paint(root, view, cache) {
  const p = parts(view);
  const live = root && typeof root.querySelector === 'function';
  let next = cache;
  if (!live || !next || next.root !== root || next.reduced !== view.reduced) {
    root.innerHTML = shellHtml(view, p);
    next = { root, reduced: view.reduced, html: { ...p }, els: {} };
    if (live) {
      for (const name of Object.keys(p))
        next.els[name] = root.querySelector(`[data-part="${name}"]`);
    }
  } else {
    for (const name of Object.keys(p)) {
      if (next.html[name] === p[name]) continue;
      next.html[name] = p[name];
      if (next.els[name]) next.els[name].innerHTML = p[name];
    }
  }
  if (live) syncInputs(root, view);
  return next;
}

function syncInputs(root, view) {
  const cmd = root.querySelector('[data-role="cmd"]');
  if (cmd) {
    if (cmd.value !== view.cmd) cmd.value = view.cmd;
    if (view.focus && typeof cmd.focus === 'function' && root.ownerDocument) {
      if (root.ownerDocument.activeElement !== cmd) cmd.focus();
    }
  }
  const edit = root.querySelector('[data-role="edit"]');
  if (edit) {
    if (edit.value !== view.buf) edit.value = view.buf;
    if (typeof edit.focus === 'function' && root.ownerDocument) {
      if (root.ownerDocument.activeElement !== edit) edit.focus();
    }
  }
  const lines = root.querySelector('[data-role="lines"]');
  if (lines && typeof lines.scrollHeight === 'number') lines.scrollTop = lines.scrollHeight;
}
