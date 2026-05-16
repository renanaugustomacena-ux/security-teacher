# Exercise Quality Fix — Continuation Guide

## What was done

### Phase 1: Diagnostic Script (DONE)

- `audit/exercise-quality-audit.js` — scans all 17 topic data files and flags items with quality issues
- Run with: `node audit/exercise-quality-audit.js`
- Outputs per-domain summary table + CSV at `audit/exercise-quality-flags.csv`

### Phase 2: Template Rendering Fixes (DONE)

Fixed in both `js/PracticeManager.js` and `js/topics/TopicPracticeManager.js`:

1. **Fill-in-blank**: removed Italian translation hint that gave away the answer
2. **Sentence reconstruction**: removed Italian translation shown above scrambled words
3. **Comprehension**: changed from verbatim "which sentence appears" to meaning-based "which statement is true"
4. **Scenario**: removed Italian hint from multiple-choice
5. **Listening**: hidden English text so users must actually listen to audio

### Phase 3: Data Quality Fixes (PARTIALLY DONE)

Each domain file was processed to fix:

- **Fake translations**: `italian` starting with the English term + `/` or `(` — reversed to put Italian first
- **Tautological examples**: `example` starting with the `english` term — rewritten with term mid-sentence
- **Trivial examples**: English part of example < 40 chars — expanded with real-world context
- **Near-identical translations**: `english` ≈ `italian` — replaced with actual Italian translation

## Current Status Per Domain

Run `node audit/exercise-quality-audit.js` for the latest numbers. As of last run:

| Domain               | Items | Flagged | Status                                             |
| -------------------- | ----- | ------- | -------------------------------------------------- |
| git-vcs.js           | 960   | 2%      | DONE                                               |
| ai-engineering.js    | 960   | 7%      | DONE                                               |
| devsecops.js         | 960   | 16%     | DONE (remaining flags are near-identical cognates) |
| cybersecurity.js     | 482   | 21%     | NEEDS MORE WORK                                    |
| python.js            | 480   | 22%     | NEEDS MORE WORK                                    |
| c-programming.js     | 960   | 23%     | NEEDS MORE WORK                                    |
| software-dev.js      | 480   | 26%     | NEEDS MORE WORK                                    |
| networking.js        | 960   | 38%     | NEEDS MORE WORK                                    |
| linux.js             | 480   | 55%     | NEEDS MORE WORK                                    |
| system-monitoring.js | 960   | 56%     | NEEDS MORE WORK                                    |
| docker-k8s.js        | 960   | 58%     | NEEDS MORE WORK                                    |
| cpp.js               | 960   | 59%     | NEEDS MORE WORK                                    |
| nodejs.js            | 960   | 59%     | NEEDS MORE WORK                                    |
| rust.js              | 960   | 59%     | NEEDS MORE WORK                                    |
| ethical-hacking.js   | 960   | 60%     | NEEDS MORE WORK                                    |
| cloud-computing.js   | 960   | 69%     | NEEDS MORE WORK                                    |
| databases.js         | 960   | 77%     | NEEDS MORE WORK                                    |

## How to Continue

### For each domain that NEEDS MORE WORK:

1. Open the file in `js/topics/data/{domain}.js`
2. Read it in chunks (100-150 lines at a time)
3. For each item, check and fix:

**Fake translations** — if `italian` looks like `'English / Italian description'` or `'English (Italian description)'`:

```
BAD:  italian: 'SAST / Analisi statica della sicurezza'
GOOD: italian: 'Analisi statica della sicurezza (SAST)'
```

**Tautological examples** — if `example` starts with the `english` term:

```
BAD:  example: 'Docker builds container images. = Docker costruisce immagini container.'
GOOD: example: 'Our CI pipeline uses Docker to build reproducible images for every commit. = La nostra pipeline CI usa Docker per costruire immagini riproducibili per ogni commit.'
```

**Trivial examples** — if the English part (before `=`) is < 40 characters, expand it:

```
BAD:  example: 'SQL queries data. = SQL interroga i dati.'
GOOD: example: 'Analysts write SQL queries to extract sales trends from millions of rows. = Gli analisti scrivono query SQL per estrarre trend di vendita da milioni di righe.'
```

**Near-identical translations** — if `english` and `italian` are basically the same word:

```
BAD:  english: 'Container', italian: 'Container'
GOOD: english: 'Container', italian: 'Contenitore (container)'
```

Note: some near-identical pairs are legitimate Italian cognates (e.g., `Comment` → `Commento`). Only fix if the Italian is truly just the English word unchanged.

### Rules

- Keep ALL existing fields (pronunciation, phonetic, context, difficulty, code, command, note, tool)
- Only modify `italian`, `example`, and `note` fields
- Always keep the `=` separator in examples
- The English term should still appear in the example, just not as the first word
- Do NOT change the `english` field

### Verification

After fixing a domain, re-run the audit:

```bash
node audit/exercise-quality-audit.js
```

Target: each domain should be under 10% flagged (remaining flags will mostly be legitimate cognates in the near-identical category).
