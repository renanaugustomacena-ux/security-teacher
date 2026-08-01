/**
 * AI ENGINEERING LABS - Knowledge AIO
 * ===================================
 *
 * Declarative terminal-lab scripts for the `ai-engineering` topic, keyed by
 * lesson.id. Consumed by LabEngine as the applied beat inside a LessonV2 lesson.
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabEngine compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is matched
 * by goal (setState), not by exact string, and a wrong command never aborts.
 *
 * Terminal flavour: a python ML/LLM workstation — a project pipeline runner,
 * csvkit + Great Expectations for data quality, the `llm` CLI for embeddings and
 * retrieval, and plain training/evaluation scripts. Real tool output is the
 * teaching payload: the learner reads epoch logs, column profiles, token counts.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints? }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 */

export default {
  ai_foundations_3: {
    title: 'Take a model through the whole workflow',
    intro:
      'Primo giorno sul progetto churn / Day one on the churn project. The repo has a pipeline runner but not one stage has ever been executed. Walk it from problem definition to a monitored deployment, in order.',
    cwd0: '/home/dev/churn-pipeline',
    vocab: [
      'Problem Definition',
      'Data Collection',
      'Exploratory Data Analysis',
      'Training Set',
      'Validation Set',
      'Test Set',
      'Model Selection',
      'Deployment',
      'Monitoring',
    ],
    requires: { collected: true, explored: true, split: 'done', model: 'selected', deployed: true },
    steps: [
      {
        id: 's1',
        promptEn:
          'Before running anything, ask the pipeline for its plan: what the project predicts and which stages exist.',
        hintTerm: 'Problem Definition',
        accept: ['python -m pipeline plan', 'python3 -m pipeline plan', 'pipeline plan'],
        acceptRe: ['^(python3?\\s+-m\\s+)?pipeline\\s+plan\\b'],
        stdout:
          'problem definition: predict monthly subscriber churn (target column: churned)\n' +
          'success metric: roc_auc >= 0.80 on the held-out test set\n\n' +
          'stage     status    last run\n' +
          '--------  --------  --------\n' +
          'collect   pending   -\n' +
          'eda       pending   -\n' +
          'split     pending   -\n' +
          'select    pending   -\n' +
          'deploy    pending   -',
        setState: { planned: true },
        hints: [
          'Never touch the data before you can state, in one sentence, what the model is supposed to predict.',
          'The project runner is `python -m pipeline …` — ask it to print its plan.',
          'python -m pipeline plan',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Run the data collection stage to pull the raw subscription records into the project.',
        hintTerm: 'Data Collection',
        accept: [
          'python -m pipeline collect',
          'python -m pipeline collect --source raw/subscriptions.csv',
          'pipeline collect',
        ],
        acceptRe: ['^(python3?\\s+-m\\s+)?pipeline\\s+collect\\b'],
        stdout:
          '[collect] source raw/subscriptions.csv\n' +
          '[collect] 24,318 rows x 19 columns\n' +
          '[collect] date range 2022-01-01 .. 2024-12-31\n' +
          '[collect] wrote data/interim/subscriptions.parquet (4.1 MB)',
        setState: { collected: true },
        hints: [
          'The first stage of the workflow gathers the raw records — nothing can be analysed before that.',
          'Same runner, the stage named after gathering data: `python -m pipeline …`',
          'python -m pipeline collect',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Explore the collected data before modelling: run the exploratory data analysis stage.',
        hintTerm: 'Exploratory Data Analysis',
        accept: ['python -m pipeline eda', 'python3 -m pipeline eda', 'pipeline eda'],
        acceptRe: ['^(python3?\\s+-m\\s+)?pipeline\\s+eda\\b'],
        stdout:
          '[eda] target balance: churned 18.4%  |  retained 81.6%\n' +
          '[eda] columns with missing values: last_login 7.2%, plan_tier 0.4%, region 0.1%\n' +
          '[eda] strongest signals: support_tickets 0.41, days_since_login 0.37, price_change 0.22\n' +
          '[eda] warning: signup_channel has 61 distinct values, 44 of them seen fewer than 5 times\n' +
          '[eda] report -> reports/eda.html',
        setState: { explored: true },
        hints: [
          'Look at the data first: balance of the target, missing values, which columns carry signal.',
          'The stage is abbreviated to three letters in every ML repo: `python -m pipeline e…`',
          'python -m pipeline eda',
        ],
      },
      {
        id: 's4',
        promptEn: 'Split the data 70/15/15 into a training set, a validation set and a test set.',
        hintTerm: 'Validation Set',
        accept: [
          'python -m pipeline split --train 0.7 --val 0.15 --test 0.15',
          'python -m pipeline split',
          'pipeline split',
        ],
        acceptRe: ['^(python3?\\s+-m\\s+)?pipeline\\s+split\\b'],
        stdout:
          '[split] stratified on churned\n' +
          '[split] training set     17,022 rows  (70%)\n' +
          '[split] validation set    3,648 rows  (15%)\n' +
          '[split] test set          3,648 rows  (15%)\n' +
          '[split] test set sealed — it is not read again until the final evaluation',
        setState: { split: 'done' },
        hints: [
          'You need three disjoint parts: one to learn from, one to compare models on, one you do not touch until the end.',
          'The stage is `python -m pipeline split` and it takes the three fractions as flags.',
          'python -m pipeline split --train 0.7 --val 0.15 --test 0.15',
        ],
      },
      {
        id: 's5',
        promptEn: 'Score the candidate models on the validation set and select the best one.',
        hintTerm: 'Model Selection',
        accept: [
          'python -m pipeline select',
          'python -m pipeline select --candidates logreg,random_forest,gradient_boosting',
          'pipeline select',
        ],
        acceptRe: ['^(python3?\\s+-m\\s+)?pipeline\\s+select\\b'],
        stdout:
          '[select] scoring 3 candidates on the validation set (roc_auc)\n' +
          '  logreg              0.781\n' +
          '  random_forest       0.834\n' +
          '  gradient_boosting   0.851   <- best\n' +
          '[select] test set untouched (still sealed)\n' +
          '[select] selected gradient_boosting -> models/churn-gb.pkl',
        setState: { model: 'selected' },
        hints: [
          'Comparing candidates is its own stage — and it compares them on the validation set, never on the test set.',
          'The stage name is a verb meaning "choose": `python -m pipeline s…`',
          'python -m pipeline select',
        ],
      },
      {
        id: 's6',
        promptEn: 'Deploy the selected model and switch monitoring on.',
        hintTerm: 'Deployment',
        accept: [
          'python -m pipeline deploy --monitor',
          'python -m pipeline deploy',
          'pipeline deploy',
        ],
        acceptRe: ['^(python3?\\s+-m\\s+)?pipeline\\s+deploy\\b'],
        stdout:
          '[deploy] models/churn-gb.pkl -> serving v1, 10% shadow traffic\n' +
          '[deploy] test set opened once: roc_auc 0.847 (target 0.80) — released\n' +
          '[monitor] drift and latency checks scheduled hourly\n' +
          '[monitor] a new iteration opens automatically if weekly roc_auc drops below 0.80',
        setState: { deployed: true },
        hints: [
          'A model that stays on your laptop has no value — put it in production, and keep watching it afterwards.',
          'Last stage of the workflow, plus the flag that turns on the watching: `python -m pipeline d… --m…`',
          'python -m pipeline deploy --monitor',
        ],
      },
    ],
  },

  ai_data_2: {
    title: 'Rescue a dataset that failed validation',
    intro:
      'Il job notturno si e fermato: customers.csv non passa la validazione / The nightly job stopped, because customers.csv no longer passes data validation. Find what is wrong with the file, repair it, and prove the repair.',
    cwd0: '/home/dev/data-audit',
    vocab: [
      'Data Profiling',
      'Duplicate',
      'Missing Data',
      'Outlier',
      'Imputation',
      'Inconsistent Data',
      'Data Validation',
    ],
    requires: {
      profiled: true,
      deduped: true,
      inspected: true,
      imputed: true,
      validated: 'passed',
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Profile every column of customers.csv: types, null values, ranges.',
        hintTerm: 'Data Profiling',
        accept: ['csvstat customers.csv', 'csvstat -c 1-5 customers.csv'],
        acceptRe: ['^csvstat\\b.*customers\\.csv'],
        stdout:
          '  1. "customer_id"\n' +
          '      Type of data:         Number\n' +
          '      Contains null values: False\n' +
          '      Unique values:        8198\n' +
          '  2. "signup_date"\n' +
          '      Type of data:         Date\n' +
          '      Contains null values: False\n' +
          '      Smallest value:       2019-01-04\n' +
          '      Largest value:        2024-11-30\n' +
          '  3. "monthly_spend"\n' +
          '      Type of data:         Number\n' +
          '      Contains null values: True (excluded from calculations)\n' +
          '      Smallest value:       0\n' +
          '      Largest value:        999999\n' +
          '      Mean:                 231.87\n' +
          '      Median:               58.4\n' +
          '  4. "country"\n' +
          '      Type of data:         Text\n' +
          '      Contains null values: False\n' +
          '      Unique values:        37\n' +
          '      Most common values:   IT (3011x), it (742x), ITA (96x)\n' +
          '\n' +
          'Row count: 8412',
        setState: { profiled: true },
        hints: [
          'Do not guess what is broken — measure it first, column by column.',
          'csvkit ships a tool whose name is "csv" plus "statistics".',
          'csvstat customers.csv',
        ],
      },
      {
        id: 's2',
        promptEn:
          'The row count is higher than the number of unique customer_id values. Report the duplicate rows.',
        hintTerm: 'Duplicate',
        accept: ['python scripts/dupes.py', 'python scripts/dupes.py customers.csv'],
        acceptRe: ['^(python3?\\s+)?(scripts/)?dupes(\\.py)?\\b'],
        stdout:
          'scanning customers.csv (8,412 rows)\n' +
          'exact duplicate rows:                      214\n' +
          'same customer_id, different email casing:   38\n' +
          'sample:\n' +
          '  4471,2023-02-11,58.40,IT,mario.rossi@example.com\n' +
          '  4471,2023-02-11,58.40,it,Mario.Rossi@example.com\n' +
          'report -> reports/duplicates.csv',
        setState: { duplicates: 252 },
        hints: [
          'A record that appears twice counts twice in every statistic — find those repeated rows before anything else.',
          'The repo has a script for it under scripts/ — run it with python first in report mode.',
          'python scripts/dupes.py',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Drop the duplicates (case-insensitive, so the inconsistent country and email spellings collapse too).',
        hintTerm: 'Inconsistent Data',
        accept: [
          'python scripts/dupes.py --drop',
          'python scripts/dupes.py --drop --ignore-case',
          'python scripts/dupes.py --drop customers.csv',
        ],
        acceptRe: ['^(python3?\\s+)?(scripts/)?dupes(\\.py)?\\s+--drop\\b'],
        stdout:
          'normalising text columns: country (it, It, ITA -> IT), email (lowercased)\n' +
          'dropped 214 exact duplicates + 38 case-insensitive duplicates\n' +
          '8,412 -> 8,160 rows\n' +
          'country now has 34 distinct values (was 37)\n' +
          'wrote data/customers_deduped.csv',
        setState: { deduped: true },
        hints: [
          'Same script, now in write mode: you want the duplicated rows removed, not just counted.',
          'Add the flag that means "remove them": `python scripts/dupes.py --…`',
          'python scripts/dupes.py --drop',
        ],
      },
      {
        id: 's4',
        promptEn:
          'The maximum monthly_spend is 999999. Inspect that column for outliers before you fix anything.',
        hintTerm: 'Outlier',
        accept: [
          'python scripts/outliers.py --column monthly_spend',
          'python scripts/outliers.py monthly_spend',
          'python scripts/outliers.py',
        ],
        acceptRe: ['^(python3?\\s+)?(scripts/)?outliers(\\.py)?\\b'],
        stdout:
          'column: monthly_spend   n=8,160   missing=1,043 (12.8%)\n' +
          'quartiles: q1=22.10  median=58.40  q3=162.30\n' +
          'IQR fence: [-188.20, 372.60]\n' +
          'values above the upper fence: 57\n' +
          '  999999.00  x12   <- sentinel meaning "unknown", not a real amount\n' +
          '   4820.00   x3    <- genuine enterprise contracts, keep\n' +
          '   1290.00   x42   <- genuine, keep\n' +
          'recommendation: turn the 12 sentinel rows into missing data, keep the rest',
        setState: { inspected: true },
        hints: [
          'An extreme value is not automatically an error — look at the distribution before deciding which extremes are real.',
          'Run the outliers script on the suspicious column: `python scripts/outliers.py --column …`',
          'python scripts/outliers.py --column monthly_spend',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Turn the 999999 sentinel into missing data and fill every missing monthly_spend with the median.',
        hintTerm: 'Imputation',
        accept: [
          'python scripts/impute.py --column monthly_spend --strategy median',
          'python scripts/impute.py --strategy median',
          'python scripts/impute.py --column monthly_spend --strategy median --sentinel 999999',
        ],
        acceptRe: ['^(python3?\\s+)?(scripts/)?impute(\\.py)?\\b.*\\bmedian\\b'],
        stdout:
          'monthly_spend: 12 sentinel values (999999) -> NaN\n' +
          'monthly_spend: 1,055 missing values filled with the median = 58.40\n' +
          'monthly_spend: mean 231.87 -> 148.62, max 999999.00 -> 4820.00\n' +
          'added flag column monthly_spend_was_missing (1,055 rows = 1)\n' +
          'wrote data/customers_clean.csv',
        setState: { imputed: true },
        hints: [
          'Filling a gap with a plausible value has a name — and the median resists the extreme values you just found.',
          'Run the impute script and tell it which strategy: `python scripts/impute.py --column … --strategy …`',
          'python scripts/impute.py --column monthly_spend --strategy median',
        ],
      },
      {
        id: 's6',
        promptEn: 'Re-run the validation suite against the cleaned file to prove the fix.',
        hintTerm: 'Data Validation',
        accept: [
          'great_expectations checkpoint run customers',
          'gx checkpoint run customers',
          'great_expectations checkpoint run customers_clean',
        ],
        acceptRe: ['^(great_expectations|gx)\\s+checkpoint\\s+run\\b'],
        stdout:
          'Validation succeeded!\n\n' +
          'Suite Name          Status    Expectations met\n' +
          'customers.critical  Passed     9 of 9\n' +
          'customers.warning   Passed    14 of 14\n' +
          '\n' +
          'expect_column_values_to_not_be_null(monthly_spend)  ok\n' +
          'expect_column_values_to_be_between(monthly_spend, 0, 5000)  ok\n' +
          'expect_compound_columns_to_be_unique(customer_id, signup_date)  ok\n' +
          'data/customers_clean.csv accepted — the nightly pipeline can resume',
        setState: { validated: 'passed' },
        hints: [
          'The pipeline rejected the file because a suite of expectations failed. Run that same suite again.',
          'The tool is Great Expectations, and a saved suite plus its data is called a checkpoint.',
          'great_expectations checkpoint run customers',
        ],
      },
    ],
  },

  ai_foundations_4: {
    title: 'Give a support chatbot something to read',
    intro:
      'Il team support vuole un assistente che risponda dagli articoli della guida / Support wants an assistant that answers from the help-centre articles instead of guessing. Build the embedding index, query it, and check what one answer really costs.',
    cwd0: '/home/dev/support-assistant',
    vocab: ['Chatbot', 'Personal Assistant', 'Sentiment Analysis', 'Anomaly Detection'],
    requires: { indexed: true, queried: true, answered: true, sentiment: 'done' },
    steps: [
      {
        id: 's1',
        promptEn:
          'Embed every markdown article under docs/ into a stored collection called helpdesk.',
        hintTerm: 'Chatbot',
        accept: [
          'llm embed-multi helpdesk --files docs/ "**/*.md" -m 3-small --store',
          'llm embed-multi helpdesk --files docs/ "**/*.md" --store',
        ],
        acceptRe: ['^llm\\s+embed-multi\\s+helpdesk\\b'],
        stdout:
          'Embedding: 100%|##########################| 128/128 [00:11<00:00, 11.4 docs/s]\n' +
          "collection 'helpdesk': 128 documents, 1536 dimensions, model 3-small\n" +
          'stored in ~/.config/io.datasette.llm/embeddings.db',
        setState: { indexed: true },
        hints: [
          'The assistant cannot search plain text usefully — every article has to become a vector first.',
          'The `llm` CLI embeds a whole folder in one go: `llm embed-multi <collection> --files …`',
          'llm embed-multi helpdesk --files docs/ "**/*.md" -m 3-small --store',
        ],
      },
      {
        id: 's2',
        promptEn: 'List the stored collections to confirm the index exists and how big it is.',
        accept: ['llm collections list', 'llm collections'],
        acceptRe: ['^llm\\s+collections\\b'],
        stdout:
          'helpdesk: 3-small\n' +
          '  128 embeddings\n' +
          'release-notes: 3-small\n' +
          '  17 embeddings',
        setState: { listed: true },
        hints: [
          'Before trusting an index, check that it was really written and holds the number of documents you expect.',
          'Ask the `llm` CLI about its collections.',
          'llm collections list',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Ask the index which articles sit closest to the customer question "how do I reset my password".',
        accept: [
          'llm similar helpdesk -c "how do I reset my password"',
          "llm similar helpdesk -c 'how do I reset my password'",
        ],
        acceptRe: ['^llm\\s+similar\\s+helpdesk\\b'],
        stdout:
          '{"id": "docs/account/reset-password.md", "score": 0.847, "content": "## Reset your password - from the sign-in screen choose Forgot password."}\n' +
          '{"id": "docs/account/change-email.md", "score": 0.611, "content": "## Change the email on your account - you must confirm the new address."}\n' +
          '{"id": "docs/billing/failed-payment.md", "score": 0.402, "content": "## When a payment fails - we retry the card after 24 hours."}',
        setState: { queried: true },
        hints: [
          'Retrieval comes before generation: first find the passages that are nearest to the question.',
          'The `llm` CLI searches a collection with `llm similar <collection> -c "<question>"`.',
          'llm similar helpdesk -c "how do I reset my password"',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Answer the customer, forcing the assistant to use only the retrieved article as its source.',
        hintTerm: 'Personal Assistant',
        accept: [
          'llm -f docs/account/reset-password.md -s "answer only from this article" "how do I reset my password"',
          'llm -s "answer only from this article" "how do I reset my password"',
        ],
        acceptRe: ['^llm\\s+-(f|s|m|t)\\b'],
        stdout:
          'To reset your password, open the sign-in screen and choose "Forgot password".\n' +
          'We email a one-time link that stays valid for 30 minutes; opening it lets\n' +
          'you choose a new password. If the email does not arrive, check the spam\n' +
          'folder and confirm the address stored on the account.\n' +
          '\n' +
          '[source: docs/account/reset-password.md]',
        setState: { answered: true },
        hints: [
          'The retrieved article has to be handed to the model, together with an instruction not to invent anything else.',
          'Use `llm` with a file as context (-f) and a system prompt (-s), then the question.',
          'llm -f docs/account/reset-password.md -s "answer only from this article" "how do I reset my password"',
        ],
      },
      {
        id: 's5',
        promptEn: 'Check what that single answer consumed in tokens.',
        accept: ['llm logs -n 1 --json', 'llm logs -n 1', 'llm logs --json -n 1'],
        acceptRe: ['^llm\\s+logs\\b'],
        stdout:
          '[\n' +
          '  {\n' +
          '    "model": "gpt-4o-mini",\n' +
          '    "prompt": "how do I reset my password",\n' +
          '    "input_tokens": 1834,\n' +
          '    "output_tokens": 96,\n' +
          '    "token_details": {"cached_input_tokens": 1024},\n' +
          '    "duration_ms": 1420\n' +
          '  }\n' +
          ']\n' +
          '1 conversation, 1930 tokens total',
        setState: { tokens: 'checked' },
        hints: [
          'Every call is billed by the size of what goes in and what comes out — the CLI already recorded it.',
          'The `llm` CLI keeps a log; ask it for the last entry as JSON.',
          'llm logs -n 1 --json',
        ],
      },
      {
        id: 's6',
        promptEn:
          "Run sentiment analysis over yesterday's tickets to see whether the assistant is actually helping.",
        hintTerm: 'Sentiment Analysis',
        accept: ['cat tickets.csv | llm -t sentiment', 'llm -t sentiment < tickets.csv'],
        acceptRe: ['\\bllm\\b.*\\bsentiment\\b'],
        stdout:
          'label      tickets   share\n' +
          'positive       412   61.2%\n' +
          'neutral        188   27.9%\n' +
          'negative        73   10.9%\n' +
          '\n' +
          'top negative theme: "the assistant quoted an outdated billing article" (19 tickets)\n' +
          'anomaly: negative share on billing topics is 4.1x the 30-day baseline',
        setState: { sentiment: 'done' },
        hints: [
          'You do not know if the assistant helps until you measure how the customers felt about the replies.',
          'Pipe the tickets into `llm` with the saved template: `cat tickets.csv | llm -t …`',
          'cat tickets.csv | llm -t sentiment',
        ],
      },
    ],
  },

  ai_supervised_3: {
    title: 'Diagnose a model that memorised its data',
    intro:
      'Il modello segna 0.99 in training e delude in produzione / The model scores almost perfectly on the training data and disappoints in production. Read the learning curve, name the disease, and treat it.',
    cwd0: '/home/dev/price-model',
    vocab: [
      'Overfitting',
      'Learning Curve',
      'Variance',
      'Bias',
      'Regularization',
      'Early Stopping',
      'Generalization',
    ],
    requires: { curve: true, regularized: true, early_stopping: true, generalization: 'checked' },
    steps: [
      {
        id: 's1',
        promptEn: 'Re-run the training job and watch the training and validation loss per epoch.',
        hintTerm: 'Overfitting',
        accept: ['python train.py', 'python3 train.py', 'python train.py --epochs 40'],
        acceptRe: ['^python3?\\s+train\\.py\\b'],
        stdout:
          'epoch  1/40   train_loss 0.681   val_loss 0.674   val_auc 0.612\n' +
          'epoch  5/40   train_loss 0.402   val_loss 0.418   val_auc 0.803\n' +
          'epoch 12/40   train_loss 0.188   val_loss 0.358   val_auc 0.855\n' +
          'epoch 20/40   train_loss 0.071   val_loss 0.412   val_auc 0.838\n' +
          'epoch 30/40   train_loss 0.021   val_loss 0.503   val_auc 0.811\n' +
          'epoch 40/40   train_loss 0.009   val_loss 0.585   val_auc 0.796\n' +
          'best val_loss 0.358 at epoch 12 — training continued for 28 epochs after it',
        setState: { trained: true },
        hints: [
          'You need the two losses side by side, epoch after epoch: one on the data the model learns from, one on data it never sees.',
          'The training entry point is a plain script in this folder — run it with python.',
          'python train.py',
        ],
      },
      {
        id: 's2',
        promptEn: 'Plot the learning curve so the gap between the two losses is visible.',
        hintTerm: 'Learning Curve',
        accept: [
          'python plot_curve.py',
          'python plot_curve.py --run latest',
          'python3 plot_curve.py',
        ],
        acceptRe: ['^(python3?\\s+)?plot_curve(\\.py)?\\b'],
        stdout:
          'run: latest (40 epochs)\n' +
          'train_loss  0.681 -> 0.009   still falling, no floor reached\n' +
          'val_loss    0.674 -> 0.585   minimum 0.358 at epoch 12, rising ever since\n' +
          'gap at the last epoch: 0.576   (train 0.009 / val 0.585)\n' +
          'signature: low bias, high variance — the model is memorising the training set\n' +
          'figure -> reports/learning_curve.png',
        setState: { curve: true },
        hints: [
          'Two curves that separate instead of converging tell you the whole story — draw them.',
          'There is a plotting script next to train.py.',
          'python plot_curve.py',
        ],
      },
      {
        id: 's3',
        promptEn: 'Retrain with L2 regularization to hold the variance down.',
        hintTerm: 'Regularization',
        accept: [
          'python train.py --l2 0.01',
          'python train.py --regularization l2 --l2 0.01',
          'python train.py --weight-decay 0.01',
        ],
        acceptRe: ['^python3?\\s+train\\.py\\b.*(--l2|--weight-decay|--regulari[sz]ation)\\b'],
        stdout:
          'regularization: l2 (lambda = 0.01)\n' +
          'epoch 10/40   train_loss 0.318   val_loss 0.342   val_auc 0.858\n' +
          'epoch 20/40   train_loss 0.259   val_loss 0.318   val_auc 0.871\n' +
          'epoch 30/40   train_loss 0.232   val_loss 0.321   val_auc 0.869\n' +
          'epoch 40/40   train_loss 0.221   val_loss 0.329   val_auc 0.866\n' +
          'gap at the last epoch: 0.108   (was 0.576)',
        setState: { regularized: true },
        hints: [
          'Punish the model for growing large weights: it must pay a price for fitting every quirk of the training data.',
          'Same script, plus the penalty flag: `python train.py --l2 …`',
          'python train.py --l2 0.01',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Train once more with early stopping so the run halts when the validation loss stops improving.',
        hintTerm: 'Early Stopping',
        accept: [
          'python train.py --l2 0.01 --early-stopping --patience 5',
          'python train.py --early-stopping --patience 5',
          'python train.py --early-stopping',
        ],
        acceptRe: ['^python3?\\s+train\\.py\\b.*--early[-_]?stop'],
        stdout:
          'regularization: l2 (lambda = 0.01)\n' +
          'early stopping: monitor=val_loss, patience=5, restore_best_weights=True\n' +
          'epoch 18/40   train_loss 0.266   val_loss 0.311   val_auc 0.874   <- best\n' +
          'epoch 23/40   val_loss has not improved for 5 epochs — stopping\n' +
          'restored the weights from epoch 18\n' +
          'saved models/price-es.pkl',
        setState: { early_stopping: true },
        hints: [
          'The first run kept training 28 epochs past its best moment. Make the job stop by itself at that moment.',
          'Add the flag that stops the run, plus how many patient epochs to wait: `--early-stopping --patience …`',
          'python train.py --l2 0.01 --early-stopping --patience 5',
        ],
      },
      {
        id: 's5',
        promptEn: 'Evaluate the saved model on the sealed test set to check that it generalizes.',
        hintTerm: 'Generalization',
        accept: [
          'python evaluate.py --split test',
          'python evaluate.py --test',
          'python evaluate.py',
        ],
        acceptRe: ['^python3?\\s+evaluate\\.py\\b'],
        stdout:
          'model: models/price-es.pkl\n' +
          'split        loss     auc     accuracy\n' +
          'train       0.266   0.901       0.842\n' +
          'validation  0.311   0.874       0.821\n' +
          'test        0.318   0.869       0.818\n' +
          'generalization gap (train -> test): 0.052   (0.221 before the fix)\n' +
          'verdict: the model now performs on unseen data almost as well as on its own',
        setState: { generalization: 'checked' },
        hints: [
          'The only honest score comes from the data the model has never met.',
          'There is an evaluation script; point it at the held-out split.',
          'python evaluate.py --split test',
        ],
      },
    ],
  },
};
