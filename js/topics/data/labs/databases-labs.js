/**
 * DATABASES LABS - Knowledge AIO
 * ==============================
 *
 * Declarative terminal-lab scripts for the `databases` topic, keyed by
 * lesson.id. Consumed by LabEngine as the applied beat inside a LessonV2 lesson
 * and by the standalone lab practice mode (TopicPracticeLabMode).
 *
 * Terminal flavour: a psql session. Steps produce realistic result tables,
 * EXPLAIN plans and index effects — reading real tool output is the teaching
 * payload, the typing is only the delivery mechanism.
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabMatch compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is
 * matched by goal (setState), not by exact string, and a wrong command never
 * aborts the run.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints? }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 */

export default {
  db_foundations_2: {
    title: 'Wake up the PostgreSQL server',
    intro:
      'Lunedì mattina: il database di sviluppo non risponde. / Monday morning: the dev database is down and the app cannot open a connection. Bring the server up and prove you can reach the shop database.',
    cwd0: '/home/dev',
    vocab: ['PostgreSQL', 'Server', 'Connection', 'RDBMS', 'SQL'],
    requires: { server: 'running', db: 'shop', tables: 'seen' },
    steps: [
      {
        id: 's1',
        promptEn: 'Start the local PostgreSQL server.',
        hintTerm: 'Server',
        accept: ['pg_ctl start', 'pg_ctl -D /var/lib/postgresql/data start', 'sudo pg_ctl start'],
        acceptRe: ['^(sudo\\s+)?pg_ctl\\s+.*\\bstart\\b'],
        stdout:
          'waiting for server to start....\n2026-03-02 09:12:41.882 CET [4821] LOG:  starting PostgreSQL 14.11 on x86_64-pc-linux-gnu, compiled by gcc (Debian 12.2.0-14) 12.2.0, 64-bit\n2026-03-02 09:12:41.884 CET [4821] LOG:  listening on IPv4 address "127.0.0.1", port 5432\n2026-03-02 09:12:41.951 CET [4824] LOG:  database system was shut down at 2026-02-27 19:40:12 CET\n2026-03-02 09:12:41.962 CET [4821] LOG:  database system is ready to accept connections\n done\nserver started',
        setState: { server: 'running' },
        hints: [
          'Nothing can connect while the engine itself is down — the server process has to be up first.',
          'PostgreSQL ships a control program whose name starts with `pg_`; give it the start subcommand.',
          'pg_ctl start',
        ],
      },
      {
        id: 's2',
        promptEn: 'Open an interactive session as the postgres user with the PostgreSQL client.',
        hintTerm: 'Connection',
        accept: [
          'psql -U postgres',
          'psql --username=postgres',
          'psql -U postgres -h localhost',
          'sudo -u postgres psql',
        ],
        acceptRe: [
          '^psql\\s+.*(-u\\s*postgres|--username[=\\s]\\s*postgres)',
          '^sudo\\s+-u\\s+postgres\\s+psql\\b',
        ],
        stdout: 'psql (14.11)\nType "help" for help.\n\npostgres=#',
        setState: { connected: true },
        hints: [
          'The server is listening now; you still need a client to open the connection.',
          'The PostgreSQL terminal client is `psql`, and the user goes after -U.',
          'psql -U postgres',
        ],
      },
      {
        id: 's3',
        promptEn: 'List every database this server hosts.',
        hintTerm: 'PostgreSQL',
        accept: ['\\l', '\\list', '\\l+'],
        acceptRe: ['^\\\\l(ist)?\\+?\\s*;?\\s*$'],
        stdout:
          '                                  List of databases\n   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges\n-----------+----------+----------+-------------+-------------+-----------------------\n postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 |\n shop      | dev      | UTF8     | en_US.UTF-8 | en_US.UTF-8 |\n template0 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +\n           |          |          |             |             | postgres=CTc/postgres\n template1 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +\n           |          |          |             |             | postgres=CTc/postgres\n(4 rows)',
        setState: { listed: true },
        hints: [
          'psql answers questions about the server itself with short meta-commands that start with a backslash.',
          'Backslash plus the first letter of "list" — no SQL, no semicolon needed.',
          '\\l',
        ],
      },
      {
        id: 's4',
        promptEn: 'Switch the session to the shop database.',
        hintTerm: 'Connection',
        accept: ['\\c shop', '\\connect shop'],
        acceptRe: ['^\\\\c(onnect)?\\s+shop\\b'],
        stdout: 'You are now connected to database "shop" as user "postgres".',
        setState: { db: 'shop' },
        hints: [
          'You are still connected to the maintenance database, not to the one the app uses.',
          'The meta-command that changes connection is a backslash plus the first letter of "connect".',
          '\\c shop',
        ],
      },
      {
        id: 's5',
        promptEn: 'Show which tables live inside the shop database.',
        hintTerm: 'RDBMS',
        accept: ['\\dt', '\\dt+', '\\dt public.*'],
        acceptRe: ['^\\\\dt\\b'],
        stdout:
          '         List of relations\n Schema |   Name    | Type  | Owner\n--------+-----------+-------+-------\n public | customers | table | dev\n public | orders    | table | dev\n public | products  | table | dev\n(3 rows)',
        setState: { tables: 'seen' },
        hints: [
          'A relational engine stores everything in relations — ask psql to describe the ones in this database.',
          'The describe family of meta-commands starts with \\d; add a letter to restrict it to tables.',
          '\\dt',
        ],
      },
    ],
  },

  db_sql_2: {
    title: 'Repair a half-failed product import',
    intro:
      "L'import del catalogo si è fermato a metà. / The catalogue import crashed halfway: one product never landed, one carries the wrong price, and a test row is still there. You are at the psql prompt of the shop database — repair the rows by hand.",
    cwd0: 'shop',
    vocab: [
      'INSERT',
      'INTO',
      'VALUES',
      'UPDATE',
      'SET',
      'DELETE',
      'RETURNING',
      'UPSERT',
      'ON CONFLICT',
    ],
    requires: { inserted: true, priced: true, cleaned: true, upserted: true, verified: true },
    steps: [
      {
        id: 's1',
        promptEn:
          "Add the product the import dropped — sku 'KB-2001', name 'Mechanical Keyboard', price 89.90 — and make the statement hand back the generated id.",
        hintTerm: 'RETURNING',
        accept: [
          "INSERT INTO products (sku, name, price) VALUES ('KB-2001', 'Mechanical Keyboard', 89.90) RETURNING id;",
        ],
        acceptRe: ['^insert\\s+into\\s+products\\b[\\s\\S]*\\breturning\\b'],
        stdout: ' id\n----\n 41\n(1 row)\n\nINSERT 0 1',
        setState: { inserted: true },
        hints: [
          'A brand-new row needs the write statement that names the target table and the values, plus a clause that echoes the row back.',
          'INSERT INTO products (sku, name, price) VALUES (…) and finish with RETURNING id.',
          "INSERT INTO products (sku, name, price) VALUES ('KB-2001', 'Mechanical Keyboard', 89.90) RETURNING id;",
        ],
      },
      {
        id: 's2',
        promptEn:
          "The wireless mouse 'MS-1140' was imported at 2.45 instead of 24.50. Correct that single row.",
        hintTerm: 'UPDATE',
        accept: ["UPDATE products SET price = 24.50 WHERE sku = 'MS-1140';"],
        acceptRe: [
          '^update\\s+products\\b[\\s\\S]*\\bset\\b[\\s\\S]*\\bprice\\s*=\\s*24\\.50?\\b[\\s\\S]*\\bwhere\\b',
        ],
        stdout: 'UPDATE 1',
        setState: { priced: true },
        hints: [
          'The row already exists, so nothing new goes in — one column changes value, and only for one product.',
          'UPDATE products SET price = … WHERE … — the filter is what keeps the other rows safe.',
          "UPDATE products SET price = 24.50 WHERE sku = 'MS-1140';",
        ],
      },
      {
        id: 's3',
        promptEn:
          "Remove the leftover test row, sku 'TEST-000'. Filter it precisely: an unfiltered delete would empty the whole catalogue.",
        hintTerm: 'DELETE',
        accept: ["DELETE FROM products WHERE sku = 'TEST-000';"],
        acceptRe: ['^delete\\s+from\\s+products\\s+where\\b'],
        stdout: 'DELETE 1',
        setState: { cleaned: true },
        hints: [
          'One row has to leave the table — and the clause that says which one is not optional here.',
          'DELETE FROM products WHERE … — write the WHERE before you press Enter.',
          "DELETE FROM products WHERE sku = 'TEST-000';",
        ],
      },
      {
        id: 's4',
        promptEn:
          "Re-run the import line for 'MS-1140' (Wireless Mouse, 24.50) so a repeated run updates the price instead of failing on the duplicate sku.",
        hintTerm: 'ON CONFLICT',
        accept: [
          "INSERT INTO products (sku, name, price) VALUES ('MS-1140', 'Wireless Mouse', 24.50) ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price;",
        ],
        acceptRe: [
          '^insert\\s+into\\s+products\\b[\\s\\S]*\\bon\\s+conflict\\b[\\s\\S]*\\bdo\\s+update\\b',
        ],
        stdout: 'INSERT 0 1',
        setState: { upserted: true },
        hints: [
          'An insert that quietly updates when the key is already taken has its own name in SQL slang: the upsert.',
          'INSERT … VALUES … ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price',
          "INSERT INTO products (sku, name, price) VALUES ('MS-1140', 'Wireless Mouse', 24.50) ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price;",
        ],
      },
      {
        id: 's5',
        promptEn:
          'Verify the repair: read sku, name and price of the whole catalogue, sorted by sku.',
        accept: ['SELECT sku, name, price FROM products ORDER BY sku;'],
        acceptRe: ['^select\\s+(?!count\\b)[\\s\\S]*\\bfrom\\s+products\\b'],
        stdout:
          '   sku   |        name         | price\n---------+---------------------+--------\n CB-0450 | USB-C Cable 2m      |   9.90\n KB-2001 | Mechanical Keyboard |  89.90\n MS-1140 | Wireless Mouse      |  24.50\n SD-3300 | USB-C Dock          |  74.00\n WH-7720 | Headset Pro         | 129.00\n(5 rows)',
        setState: { verified: true },
        hints: [
          'Never trust a write you have not read back — ask the table what it looks like now.',
          'SELECT sku, name, price FROM products ORDER BY …',
          'SELECT sku, name, price FROM products ORDER BY sku;',
        ],
      },
    ],
  },

  db_sql_5: {
    title: 'Hunt the orders that vanish in the join',
    intro:
      'Finance dice che tre ordini non arrivano mai al report fatture. / Finance says three orders never reach the invoice report. The report joins orders to customers — find out exactly which rows the join throws away, and why.',
    cwd0: 'shop',
    vocab: ['JOIN', 'INNER JOIN', 'LEFT JOIN', 'ON', 'CROSS JOIN', 'Cartesian Product'],
    requires: {
      baseline: true,
      gap: true,
      orphans: true,
      confirmed: true,
      cartesian: true,
      report: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Count the rows in the orders table so you have a baseline to compare against.',
        accept: ['SELECT COUNT(*) FROM orders;'],
        acceptRe: [
          '^select\\s+count\\s*\\([^)]*\\)[\\s\\S]*\\bfrom\\s+orders\\b(\\s+\\w+)?\\s*;?$',
        ],
        stdout: ' count\n-------\n    42\n(1 row)',
        setState: { baseline: true },
        hints: [
          'Before you accuse the join, find out how many orders actually exist.',
          'The aggregate that returns how many rows a table holds is COUNT(*).',
          'SELECT COUNT(*) FROM orders;',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Now run what the report runs: count the rows an inner join of orders and customers returns, matching orders.customer_id to customers.id.',
        hintTerm: 'INNER JOIN',
        accept: [
          'SELECT COUNT(*) FROM orders o JOIN customers c ON o.customer_id = c.id;',
          'SELECT COUNT(*) FROM orders o INNER JOIN customers c ON o.customer_id = c.id;',
        ],
        acceptRe: [
          '^select\\s+count\\s*\\([^)]*\\)[\\s\\S]*\\bfrom\\s+orders\\b[\\s\\S]*\\bjoin\\s+customers\\b[\\s\\S]*\\bon\\b',
        ],
        stdout: ' count\n-------\n    39\n(1 row)',
        setState: { gap: true },
        hints: [
          'The default join keeps a row only when both sides have a match — count what survives it.',
          'SELECT COUNT(*) FROM orders o JOIN customers c ON … — the ON clause carries the matching rule.',
          'SELECT COUNT(*) FROM orders o JOIN customers c ON o.customer_id = c.id;',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Three orders are missing. Keep every order and expose the unmatched ones: list order id and customer_id where the customers side comes back NULL.',
        hintTerm: 'LEFT JOIN',
        accept: [
          'SELECT o.id, o.customer_id FROM orders o LEFT JOIN customers c ON o.customer_id = c.id WHERE c.id IS NULL;',
        ],
        acceptRe: [
          '^select\\b[\\s\\S]*\\bleft\\s+(outer\\s+)?join\\s+customers\\b[\\s\\S]*\\bis\\s+null\\b',
        ],
        stdout:
          ' id | customer_id\n----+-------------\n  3 |         508\n  7 |         508\n 12 |         541\n(3 rows)',
        setState: { orphans: true },
        hints: [
          'You need the join that keeps the left table whole and fills the right side with NULL when there is no match.',
          'LEFT JOIN customers c ON … and then filter WHERE c.id IS NULL.',
          'SELECT o.id, o.customer_id FROM orders o LEFT JOIN customers c ON o.customer_id = c.id WHERE c.id IS NULL;',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Two customer ids are suspect: 508 and 541. Check whether those customers exist in the customers table at all.',
        accept: ['SELECT id, email FROM customers WHERE id IN (508, 541);'],
        acceptRe: [
          '^select\\b[\\s\\S]*\\bfrom\\s+customers\\b[\\s\\S]*\\bwhere\\b[\\s\\S]*\\b(508|541)\\b',
        ],
        stdout: ' id | email\n----+-------\n(0 rows)',
        setState: { confirmed: true },
        hints: [
          'Do not assume the rows are missing — ask the customers table directly for those two ids.',
          'SELECT id, email FROM customers WHERE id IN (…);',
          'SELECT id, email FROM customers WHERE id IN (508, 541);',
        ],
      },
      {
        id: 's5',
        promptEn:
          'See what the ON clause protects you from: count the rows you get when orders and customers are joined with no matching condition at all.',
        hintTerm: 'Cartesian Product',
        accept: [
          'SELECT COUNT(*) FROM orders CROSS JOIN customers;',
          'SELECT COUNT(*) FROM orders, customers;',
        ],
        acceptRe: [
          '^select\\s+count\\s*\\([^)]*\\)[\\s\\S]*\\bfrom\\s+orders\\b[\\s\\S]*\\bcross\\s+join\\s+customers\\b',
          '^select\\s+count\\s*\\([^)]*\\)[\\s\\S]*\\bfrom\\s+orders\\b\\s*(\\w+\\s*)?,\\s*customers\\b',
        ],
        stdout: ' count\n-------\n  5040\n(1 row)',
        setState: { cartesian: true },
        hints: [
          '42 orders and 120 customers with no condition pair every row with every row — that product has a name.',
          'The explicit join type that pairs everything with everything is CROSS JOIN.',
          'SELECT COUNT(*) FROM orders CROSS JOIN customers;',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Ship the fixed report: order id and customer email for every order, orphans included, ordered by order id, limited to the first five rows.',
        hintTerm: 'LEFT JOIN',
        accept: [
          'SELECT o.id, c.email FROM orders o LEFT JOIN customers c ON o.customer_id = c.id ORDER BY o.id LIMIT 5;',
        ],
        acceptRe: [
          '^select\\b[\\s\\S]*\\bfrom\\s+orders\\b[\\s\\S]*\\bleft\\s+(outer\\s+)?join\\s+customers\\b[\\s\\S]*\\border\\s+by\\b',
        ],
        stdout:
          ' id |         email\n----+-----------------------\n  1 | lu.rossi@example.org\n  2 | m.bianchi@example.org\n  3 |\n  4 | s.conti@example.org\n  5 | g.ferrari@example.org\n(5 rows)',
        setState: { report: true },
        hints: [
          'The report must never lose an order again, so keep the same join type that exposed the orphans.',
          'SELECT o.id, c.email FROM orders o LEFT JOIN customers c ON … ORDER BY o.id LIMIT 5;',
          'SELECT o.id, c.email FROM orders o LEFT JOIN customers c ON o.customer_id = c.id ORDER BY o.id LIMIT 5;',
        ],
      },
    ],
  },

  db_sql_1: {
    title: 'Explain the four-second customer lookup',
    intro:
      'La pagina di supporto impiega quattro secondi per trovare un utente via email. / The helpdesk lookup takes four seconds to find one user by email. You have psql on the helpdesk database — read the plan before you change anything.',
    cwd0: 'helpdesk',
    vocab: ['SELECT', 'FROM', 'Asterisk', 'WHERE', 'Equality Operator', 'AND', 'IN', 'BETWEEN'],
    requires: { found: true, explained: true, indexed: true, fast: true, filtered: true },
    steps: [
      {
        id: 's1',
        promptEn:
          "Reproduce the slow lookup: read every column of the user whose email is 'ada@example.org'.",
        hintTerm: 'Asterisk',
        accept: ["SELECT * FROM users WHERE email = 'ada@example.org';"],
        acceptRe: [
          '^select\\s+\\*\\s+from\\s+users\\s+where\\s+email\\s*=',
          '^select\\s+\\*\\s+from\\s+users\\b[\\s\\S]*ada@example\\.org',
        ],
        stdout:
          '   id   |      email      | country | signup_date | active\n--------+-----------------+---------+-------------+--------\n 741208 | ada@example.org | IT      | 2025-11-02  | t\n(1 row)\n\nTime: 4128.512 ms (00:04.129)',
        setState: { found: true },
        hints: [
          'Read the whole row, not a few columns — the shorthand for "every column" is a single symbol.',
          'SELECT * FROM users WHERE email … and compare with an equality operator.',
          "SELECT * FROM users WHERE email = 'ada@example.org';",
        ],
      },
      {
        id: 's2',
        promptEn:
          'Four seconds for one row is wrong. Ask the planner what it actually did, with real execution timings.',
        hintTerm: 'SELECT',
        accept: [
          "EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'ada@example.org';",
          "EXPLAIN (ANALYZE) SELECT * FROM users WHERE email = 'ada@example.org';",
        ],
        acceptRe: [
          '^explain\\s+(analy[sz]e\\b|\\([^)]*\\banaly[sz]e\\b[^)]*\\))[\\s\\S]*\\bselect\\b[\\s\\S]*\\bfrom\\s+users\\b',
        ],
        stdout:
          "                                                    QUERY PLAN\n-------------------------------------------------------------------------------------------------------------------\n Seq Scan on users  (cost=0.00..29518.00 rows=1 width=68) (actual time=2874.011..4127.902 rows=1 loops=1)\n   Filter: (email = 'ada@example.org'::text)\n   Rows Removed by Filter: 1199999\n Planning Time: 0.132 ms\n Execution Time: 4127.961 ms\n(5 rows)\n\nTime: 4128.663 ms (00:04.129)",
        setState: { explained: true },
        hints: [
          'PostgreSQL can show you its own strategy for a query instead of just running it.',
          'Put EXPLAIN ANALYZE in front of exactly the same SELECT.',
          "EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'ada@example.org';",
        ],
      },
      {
        id: 's3',
        promptEn:
          'The plan reads all 1.2 million rows to return one. Give the planner a shortcut on the email column of users.',
        accept: [
          'CREATE INDEX ON users (email);',
          'CREATE INDEX users_email_idx ON users (email);',
        ],
        acceptRe: ['^create\\s+(unique\\s+)?index\\b[\\s\\S]*\\bon\\s+users\\b[\\s\\S]*email'],
        stdout: 'CREATE INDEX\nTime: 2874.113 ms (00:02.874)',
        setState: { indexed: true },
        hints: [
          'A sequential scan means there is no lookup structure for that column — build one.',
          'CREATE INDEX ON <table> (<column>);',
          'CREATE INDEX ON users (email);',
        ],
      },
      {
        id: 's4',
        promptEn: 'Re-read the plan for the same lookup and confirm the sequential scan is gone.',
        accept: [
          "EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'ada@example.org';",
          "EXPLAIN (ANALYZE) SELECT * FROM users WHERE email = 'ada@example.org';",
        ],
        acceptRe: [
          '^explain\\s+(analy[sz]e\\b|\\([^)]*\\banaly[sz]e\\b[^)]*\\))[\\s\\S]*\\bselect\\b[\\s\\S]*\\bfrom\\s+users\\b',
        ],
        stdout:
          "                                                            QUERY PLAN\n------------------------------------------------------------------------------------------------------------------------\n Index Scan using users_email_idx on users  (cost=0.43..8.45 rows=1 width=68) (actual time=0.049..0.052 rows=1 loops=1)\n   Index Cond: (email = 'ada@example.org'::text)\n Planning Time: 0.204 ms\n Execution Time: 0.081 ms\n(4 rows)\n\nTime: 0.633 ms",
        setState: { fast: true },
        hints: [
          'Nothing is fixed until the planner says so — run the same inspection again.',
          'The same EXPLAIN ANALYZE line as before.',
          "EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'ada@example.org';",
        ],
      },
      {
        id: 's5',
        promptEn:
          "Now answer the ticket itself: email and country of the users from Italy or Spain ('IT', 'ES') who signed up between 2025-11-01 and 2025-11-30. The new index only covers email, so watch the timing.",
        hintTerm: 'BETWEEN',
        accept: [
          "SELECT email, country FROM users WHERE country IN ('IT', 'ES') AND signup_date BETWEEN '2025-11-01' AND '2025-11-30';",
        ],
        acceptRe: [
          '^select\\b[\\s\\S]*\\bfrom\\s+users\\b[\\s\\S]*\\bin\\s*\\([\\s\\S]*\\bbetween\\b',
          '^select\\b[\\s\\S]*\\bfrom\\s+users\\b[\\s\\S]*\\bcountry\\b[\\s\\S]*\\bsignup_date\\b[\\s\\S]*\\band\\b',
        ],
        stdout:
          '         email          | country\n------------------------+---------\n ada@example.org        | IT\n bruno.sala@example.org | IT\n c.moreno@example.org   | ES\n p.lopez@example.org    | ES\n(4 rows)\n\nTime: 918.407 ms',
        setState: { filtered: true },
        hints: [
          'Two conditions have to hold at once: a membership test on the country and a range test on the date.',
          'WHERE country IN (…) AND signup_date BETWEEN … AND …',
          "SELECT email, country FROM users WHERE country IN ('IT', 'ES') AND signup_date BETWEEN '2025-11-01' AND '2025-11-30';",
        ],
      },
    ],
  },
};
