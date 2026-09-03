/**
 * CYBERSECURITY LABS - Knowledge AIO
 * ==================================
 *
 * Declarative terminal-lab scripts for the cybersecurity pilot, keyed by
 * lesson.id. Consumed by LabEngine as the applied beat inside a LessonV2 lesson.
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabEngine compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is
 * matched by goal (setState), not by exact string, and a wrong command never
 * aborts the run.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints? }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 *
 * Lessons without an entry here fall back to a single-step lab built from the
 * first command item in the lesson (see LessonV2Beats._fallbackLabScript).
 */

export default {
  cyber_basics_1: {
    title: 'Harden a fresh server',
    intro:
      'You just got SSH access to a brand-new box. Lock down the firewall before anything else can reach it.',
    cwd0: '/home/analyst',
    vocab: ['Firewall', 'Password'],
    requires: { ssh: 'allowed', firewall: 'enabled' },
    steps: [
      {
        id: 's1',
        promptEn: 'Check the current firewall status.',
        hintTerm: 'Firewall',
        accept: ['sudo ufw status', 'ufw status', 'sudo ufw status verbose'],
        acceptRe: ['^sudo\\s+ufw\\s+status\\b', '^ufw\\s+status\\b'],
        stdout: 'Status: inactive',
        setState: { fw_checked: true },
        hints: [
          'You need the tool that filters network traffic — the firewall.',
          'Start with `sudo ufw …`',
          'sudo ufw status',
        ],
      },
      {
        id: 's2',
        promptEn: 'Set the default policy to deny all incoming traffic.',
        hintTerm: 'Firewall',
        accept: ['sudo ufw default deny incoming', 'ufw default deny incoming'],
        acceptRe: ['^sudo\\s+ufw\\s+default\\s+deny\\s+incoming\\b'],
        stdout: "Default incoming policy changed to 'deny'",
        setState: { deny: true },
      },
      {
        id: 's3',
        promptEn: 'Allow SSH (port 22/tcp) so you do not lock yourself out.',
        hintTerm: 'Firewall',
        accept: [
          'sudo ufw allow 22/tcp',
          'sudo ufw allow ssh',
          'ufw allow 22/tcp',
          'ufw allow ssh',
        ],
        acceptRe: ['^sudo\\s+ufw\\s+allow\\s+(22\\/tcp|ssh)\\b'],
        stdout: 'Rule added\nRule added (v6)',
        setState: { ssh: 'allowed' },
        hints: [
          'Open only the port you administer the box on.',
          'sudo ufw allow …',
          'sudo ufw allow 22/tcp',
        ],
      },
      {
        id: 's4',
        promptEn: 'Enable the firewall.',
        hintTerm: 'Firewall',
        accept: ['sudo ufw enable', 'ufw enable'],
        acceptRe: ['^sudo\\s+ufw\\s+enable\\b'],
        stdout: 'Firewall is active and enabled on system startup',
        setState: { firewall: 'enabled' },
      },
    ],
  },
};
