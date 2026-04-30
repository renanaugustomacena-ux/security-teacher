module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Doctrine §18.6 extends conventional-commits with three project-
    // specific prefixes: `security` (security-only changes), `harden`
    // (defensive hardening such as nginx rate limits or CSP tightening
    // that is neither a feature nor a bug fix), and `doctrine` (rule
    // amendments to DOCTRINE.md per §21.1). Without this override the
    // standard config-conventional type-enum rejects them at commit-msg.
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'perf',
        'security',
        'harden',
        'doctrine',
        'ci',
        'build',
        'revert',
      ],
    ],
  },
};
