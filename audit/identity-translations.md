# Identity-translation audit — 2026-05-06

Items where `english.toLowerCase() === italian.toLowerCase()`. These are filtered out
of `listening` / `matching` / `writing` / `scenario` modes at runtime
(see `js/topics/TopicPracticeManager.js#generateQuestions`), so they don't leak the
answer to the user. They are still served in `codeoutput` /
`command` / `comprehension` / `context` / `fillblank` modes.

Goal: progressively replace each entry with a meaningful Italian
translation or definition (e.g. `Bash` → `shell GNU`) so the item
regains pedagogical value in translation modes.

**Grand total: 0 / 14402 items (0.0%)**

| Domain | Identity items | Total items | Share |
|--------|---------------:|------------:|------:|
| ai-engineering | 0 | 960 | 0.0% |
| c-programming | 0 | 960 | 0.0% |
| cloud-computing | 0 | 960 | 0.0% |
| cpp | 0 | 960 | 0.0% |
| cybersecurity | 0 | 482 | 0.0% |
| databases | 0 | 960 | 0.0% |
| devsecops | 0 | 960 | 0.0% |
| docker-k8s | 0 | 960 | 0.0% |
| ethical-hacking | 0 | 960 | 0.0% |
| git-vcs | 0 | 960 | 0.0% |
| linux | 0 | 480 | 0.0% |
| networking | 0 | 960 | 0.0% |
| nodejs | 0 | 960 | 0.0% |
| python | 0 | 480 | 0.0% |
| rust | 0 | 960 | 0.0% |
| software-dev | 0 | 480 | 0.0% |
| system-monitoring | 0 | 960 | 0.0% |

