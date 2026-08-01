/**
 * SYSTEM MONITORING LABS - Knowledge AIO
 * =====================================
 *
 * Declarative terminal-lab scripts for the `system-monitoring` topic, keyed by
 * lesson.id. Consumed by LabEngine as the applied beat inside a LessonV2 lesson.
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
 * The four labs are deliberately different in shape:
 *   mon_observability_3 — pre-flight probe of a fresh deploy (liveness/readiness)
 *   mon_metrics_2       — 03:10 disk incident, diagnose why writes fail
 *   mon_metrics_4       — build-and-verify the Golden Signals with promtool
 *   mon_logs_3          — retention audit: read the policy, then exercise it
 */

export default {
  mon_observability_3: {
    title: 'Probe a fresh deploy before it takes traffic',
    intro:
      'Hai appena rilasciato checkout-api 2.3.0 in staging. / You just deployed checkout-api 2.3.0 to staging. Before the load balancer sends real traffic, probe the service yourself and decide if it is ready.',
    cwd0: '/home/dev',
    vocab: [
      'Health Check',
      'Liveness Probe',
      'Readiness Probe',
      'Probe',
      'Endpoint',
      'Heartbeat',
      'Degraded Service',
    ],
    requires: { liveness: 'ok', cause: 'cache-warmup', heartbeat: 'seen', readiness: 'ready' },
    steps: [
      {
        id: 's1',
        promptEn:
          'Call the health endpoint of checkout-api on port 8080 to see if the process is alive.',
        hintTerm: 'Health Check',
        accept: [
          'curl http://localhost:8080/health',
          'curl -s http://localhost:8080/health',
          'curl localhost:8080/health',
          'curl -i http://localhost:8080/health',
        ],
        acceptRe: [
          '^curl\\s+(-\\S+\\s+)*(http:\\/\\/)?(localhost|127\\.0\\.0\\.1):8080\\/health(z)?\\b',
        ],
        stdout: '{"status":"ok","version":"2.3.0","commit":"9f4c1ab","uptime_s":37}',
        setState: { liveness: 'ok' },
        hints: [
          'The service answers a small HTTP endpoint that says whether the process is alive. Ask it over HTTP.',
          'Use `curl` against port 8080, path /health.',
          'curl http://localhost:8080/health',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Now call the /ready endpoint and include the response headers, so you can read the HTTP status code.',
        hintTerm: 'Readiness Probe',
        accept: [
          'curl -i http://localhost:8080/ready',
          'curl -i localhost:8080/ready',
          'curl http://localhost:8080/ready',
          'curl -s -i http://localhost:8080/ready',
        ],
        acceptRe: [
          '^curl\\s+(-\\S+\\s+)*(http:\\/\\/)?(localhost|127\\.0\\.0\\.1):8080\\/ready(z)?\\b',
        ],
        stdout:
          'HTTP/1.1 503 Service Unavailable\ncontent-type: application/json\ndate: Sat, 01 Aug 2026 09:12:41 GMT\n\n{"ready":false,"checks":{"db":"ok","cache":"warming","migrations":"ok"}}',
        setState: { readiness: 'not-ready' },
        hints: [
          'Alive is not the same as ready to serve. There is a second endpoint for that, and you need to see its status code.',
          'Same `curl`, path /ready, plus the flag that prints the response headers.',
          'curl -i http://localhost:8080/ready',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Read the last 20 journal lines of the checkout-api unit to find out why the readiness gate is closed.',
        hintTerm: 'Degraded Service',
        accept: [
          'journalctl -u checkout-api -n 20',
          'journalctl -u checkout-api',
          'journalctl -n 20 -u checkout-api',
          'sudo journalctl -u checkout-api -n 20',
        ],
        acceptRe: ['^(sudo\\s+)?journalctl\\b.*checkout-api'],
        stdout:
          'Aug 01 09:12:04 stg-node-1 checkout-api[2481]: level=info msg="http server listening" addr=":8080"\nAug 01 09:12:04 stg-node-1 checkout-api[2481]: level=info msg="liveness gate open"\nAug 01 09:12:05 stg-node-1 checkout-api[2481]: level=info msg="cache warm-up started" keys=180000\nAug 01 09:12:41 stg-node-1 checkout-api[2481]: level=warn msg="readiness gate closed" reason="cache warming" progress="62%"',
        setState: { cause: 'cache-warmup' },
        hints: [
          'The service writes to the systemd journal. Read the logs of that one unit, not the whole system.',
          'Use `journalctl -u <unit>` and limit the output to the last lines with -n.',
          'journalctl -u checkout-api -n 20',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Watch the health endpoint every 5 seconds so you can see the heartbeat while the cache finishes warming.',
        hintTerm: 'Heartbeat',
        accept: [
          'watch -n 5 curl -s http://localhost:8080/health',
          'watch -n5 curl -s http://localhost:8080/health',
          'watch -n 5 curl http://localhost:8080/health',
        ],
        acceptRe: ['^watch\\b.*localhost:8080\\/health'],
        stdout:
          'Every 5.0s: curl -s http://localhost:8080/health          stg-node-1: Sat Aug  1 09:13:36 2026\n\n{"status":"ok","version":"2.3.0","commit":"9f4c1ab","uptime_s":92}',
        setState: { heartbeat: 'seen' },
        hints: [
          'You want the same request repeated on a fixed interval, not one single answer.',
          'There is a command that re-runs another command every N seconds: `watch -n <seconds> …`',
          'watch -n 5 curl -s http://localhost:8080/health',
        ],
      },
      {
        id: 's5',
        promptEn:
          'The cache finished warming. Probe readiness one last time to confirm the service can take traffic.',
        hintTerm: 'Readiness Probe',
        accept: [
          'curl -i http://localhost:8080/ready',
          'curl http://localhost:8080/ready',
          'curl -s http://localhost:8080/ready',
        ],
        acceptRe: [
          '^curl\\s+(-\\S+\\s+)*(http:\\/\\/)?(localhost|127\\.0\\.0\\.1):8080\\/ready(z)?\\b',
        ],
        stdout:
          'HTTP/1.1 200 OK\ncontent-type: application/json\ndate: Sat, 01 Aug 2026 09:14:02 GMT\n\n{"ready":true,"checks":{"db":"ok","cache":"ok","migrations":"ok"}}',
        setState: { readiness: 'ready' },
        hints: [
          'Repeat the probe that failed earlier and compare the status code.',
          'Same command as step 2 — the readiness endpoint with headers.',
          'curl -i http://localhost:8080/ready',
        ],
      },
    ],
  },

  mon_metrics_2: {
    title: 'The /var volume is full and writes are failing',
    intro:
      'Sono le 03:10 e il pager suona: su db-01 il volume /var è pieno. / It is 03:10 and the pager is going off: the /var volume on db-01 is full and the database can no longer write. Find what filled it, and how bad the disk really is.',
    cwd0: '/home/sre',
    vocab: [
      'Disk Usage',
      'Disk Free',
      'Filesystem',
      'Inode',
      'Disk I/O',
      'Disk Saturation',
      'Write Latency',
    ],
    requires: {
      disk: 'full',
      fs: 'readonly',
      hog: 'var-lib',
      wal: 'stalled',
      inodes: 'ok',
      io: 'saturated',
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Show used and free space for every mounted filesystem, in human-readable units.',
        hintTerm: 'Disk Usage',
        accept: ['df -h', 'df -h /var', 'df -Th'],
        acceptRe: ['^(sudo\\s+)?df\\s+(-[a-z]*h[a-z]*\\b|--human-readable\\b)'],
        stdout:
          'Filesystem      Size  Used Avail Use% Mounted on\n/dev/nvme0n1p1   40G   14G   24G  37% /\n/dev/nvme0n1p3  100G  100G     0 100% /var\ntmpfs           7.8G  1.4M  7.8G   1% /run\ntmpfs            32G     0   32G   0% /dev/shm',
        setState: { disk: 'full' },
        hints: [
          'Start with the wide view: how much space is free on each mounted filesystem?',
          'The disk-free command, with the flag that prints G and M instead of blocks.',
          'df -h',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Even a one-byte write fails. Check the mount table for a filesystem that was remounted read-only.',
        hintTerm: 'Filesystem',
        accept: ['mount | grep ro', 'mount | grep -w ro', 'findmnt /var'],
        acceptRe: [
          '^mount\\b.*grep\\b',
          '^(sudo\\s+)?findmnt\\b',
          '^(cat|grep)\\b.*\\/proc\\/mounts',
        ],
        stdout:
          'proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)\n/dev/nvme0n1p1 on / type ext4 (rw,relatime,errors=remount-ro)\n/dev/nvme0n1p3 on /var type ext4 (ro,relatime,errors=remount-ro)\ncgroup2 on /sys/fs/cgroup type cgroup2 (rw,nosuid,nodev,noexec,relatime)',
        setState: { fs: 'readonly' },
        hints: [
          'When ext4 hits a write error it protects itself by remounting the filesystem read-only. The mount options will say so.',
          'List the mounts and filter the output for the `ro` flag.',
          'mount | grep ro',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Find which directory under /var holds the space: summarise each child directory and put the biggest last.',
        hintTerm: 'Disk Usage',
        accept: [
          'du -sh /var/* | sort -h | tail -5',
          'du -sh /var/*',
          'sudo du -sh /var/* | sort -h',
        ],
        acceptRe: ['^(sudo\\s+)?du\\b.*\\/var'],
        stdout: '116M\t/var/cache\n344M\t/var/spool\n1.3G\t/var/tmp\n4.2G\t/var/log\n94G\t/var/lib',
        setState: { hog: 'var-lib' },
        hints: [
          'df tells you the filesystem is full; a different tool tells you which directory is responsible.',
          'Use `du` with a summary per directory, then sort by size.',
          'du -sh /var/* | sort -h | tail -5',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Nearly all of /var/lib is the PostgreSQL data directory. Measure its subdirectories the same way, including the write-ahead log.',
        hintTerm: 'Disk Usage',
        accept: [
          'du -sh /var/lib/postgresql/16/main/* | sort -h | tail -5',
          'du -sh /var/lib/postgresql/16/main/*',
          'sudo du -sh /var/lib/postgresql/16/main/* | sort -h',
          'du -sh /var/lib/postgresql/16/main/pg_wal',
        ],
        acceptRe: ['^(sudo\\s+)?du\\b.*postgresql'],
        stdout:
          '4.0K\t/var/lib/postgresql/16/main/pg_notify\n4.0K\t/var/lib/postgresql/16/main/pg_serial\n16M\t/var/lib/postgresql/16/main/global\n2.1G\t/var/lib/postgresql/16/main/base\n92G\t/var/lib/postgresql/16/main/pg_wal',
        setState: { wal: 'stalled' },
        hints: [
          'Repeat the same measurement one level deeper, inside the database data directory.',
          'Same `du -sh … | sort -h` idiom as the previous step, aimed at /var/lib/postgresql/16/main.',
          'du -sh /var/lib/postgresql/16/main/* | sort -h | tail -5',
        ],
      },
      {
        id: 's5',
        promptEn: 'Rule out the other way a filesystem fills up: show inode usage per filesystem.',
        hintTerm: 'Inode',
        accept: ['df -i', 'df -ih'],
        acceptRe: ['^(sudo\\s+)?df\\s+(-[a-z]*i[a-z]*\\b|--inodes\\b)'],
        stdout:
          'Filesystem       Inodes   IUsed    IFree IUse% Mounted on\n/dev/nvme0n1p1  2621440  201884  2419556    8% /\n/dev/nvme0n1p3  6553600  118442  6435158    2% /var\ntmpfs           8177664      41  8177623    1% /run',
        setState: { inodes: 'ok' },
        hints: [
          'A filesystem can also run out of index nodes while bytes are still free. Millions of tiny files do that.',
          'Same command as step 1, but the flag for inodes instead of human-readable sizes.',
          'df -i',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Sample extended disk I/O statistics once per second and read the %util and w_await columns.',
        hintTerm: 'Disk Saturation',
        accept: ['iostat -x 1', 'iostat -xz 1', 'sudo iostat -x 1'],
        acceptRe: ['^(sudo\\s+)?iostat\\b.*-[a-z]*x'],
        stdout:
          'Linux 6.1.0-18-amd64 (db-01) \t08/01/2026 \t_x86_64_\t(8 CPU)\n\navg-cpu:  %user   %nice %system %iowait  %steal   %idle\n           4.11    0.00    3.02   61.47    0.00   31.40\n\nDevice            r/s     rkB/s   rrqm/s  %rrqm r_await rareq-sz     w/s     wkB/s   wrqm/s  %wrqm w_await wareq-sz     d/s     dkB/s   drqm/s  %drqm d_await dareq-sz     f/s f_await  aqu-sz  %util\nnvme0n1        182.00  11648.00     0.00   0.00   41.20    64.00    9.00     36.00     0.00   0.00  984.50     4.00    0.00      0.00     0.00   0.00    0.00     0.00    3.00  912.33   14.62  99.60',
        setState: { io: 'saturated' },
        hints: [
          'Space is one dimension; the other is how busy the device is. You want per-device statistics sampled every second.',
          'Use `iostat` with the extended-statistics flag and an interval of 1.',
          'iostat -x 1',
        ],
      },
    ],
  },

  mon_metrics_4: {
    title: 'Verify the Golden Signals before the release review',
    intro:
      'Hai strumentato checkout-api con i quattro Golden Signals e una regola di allerta. / You instrumented checkout-api with the four Golden Signals and one alert-rule file. Prove the metrics are really exported, the rules are valid, and every query returns a number.',
    cwd0: '/etc/prometheus',
    vocab: [
      'Golden Signals',
      'Request Rate',
      'Error Rate',
      'Response Time',
      'Percentile',
      'Queue Length',
      'Saturation',
    ],
    requires: {
      exported: true,
      rules: 'valid',
      traffic: 'measured',
      errors: 'measured',
      latency: 'measured',
      saturation: 'measured',
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'Scrape the application metrics endpoint on port 8080 and keep only the http_requests_total lines.',
        hintTerm: 'Request Rate',
        accept: [
          'curl -s http://localhost:8080/metrics | grep http_requests_total',
          'curl http://localhost:8080/metrics | grep http_requests_total',
        ],
        acceptRe: ['^curl\\b.*localhost:8080\\/metrics\\b.*http_requests_total'],
        stdout:
          '# HELP http_requests_total Total number of HTTP requests.\n# TYPE http_requests_total counter\nhttp_requests_total{method="GET",route="/checkout",status="200"} 148213\nhttp_requests_total{method="POST",route="/checkout",status="200"} 30117\nhttp_requests_total{method="POST",route="/checkout",status="500"} 412',
        setState: { exported: true },
        hints: [
          'Prometheus does not push: the application publishes a plain-text page that the scraper reads. Fetch that page yourself and filter it.',
          'curl the /metrics path on port 8080 and pipe the result into grep.',
          'curl -s http://localhost:8080/metrics | grep http_requests_total',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Validate the alert-rule file /etc/prometheus/rules/golden-signals.yml before Prometheus loads it.',
        hintTerm: 'Golden Signals',
        accept: [
          'promtool check rules /etc/prometheus/rules/golden-signals.yml',
          'promtool check rules rules/golden-signals.yml',
        ],
        acceptRe: ['^promtool\\s+check\\s+rules\\b'],
        stdout: 'Checking /etc/prometheus/rules/golden-signals.yml\n  SUCCESS: 4 rules found\n',
        setState: { rules: 'valid' },
        hints: [
          'Prometheus ships a linter for its own YAML. Check the rule file before restarting anything.',
          'The binary is `promtool`; the subcommand family is `check`.',
          'promtool check rules /etc/prometheus/rules/golden-signals.yml',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Query the request rate: per-second traffic over the last 5 minutes, summed across all routes.',
        hintTerm: 'Request Rate',
        accept: [
          "promtool query instant http://localhost:9090 'sum(rate(http_requests_total[5m]))'",
          "promtool query instant http://localhost:9090 'job:request_rate:rate5m'",
        ],
        acceptRe: [
          '^(promtool|curl)\\b.*sum\\s*\\(\\s*rate\\s*\\(\\s*http_requests_total\\s*\\[5m\\]',
          '^(promtool|curl)\\b.*job:request_rate:rate5m',
        ],
        stdout: '{} => 178.42 @[1785575412.117]',
        setState: { traffic: 'measured' },
        hints: [
          'A counter only goes up, so its raw value is useless. You want how fast it grows per second over a window.',
          "Use `promtool query instant http://localhost:9090 '<expression>'` with rate() over [5m], wrapped in sum().",
          "promtool query instant http://localhost:9090 'sum(rate(http_requests_total[5m]))'",
        ],
      },
      {
        id: 's4',
        promptEn:
          'Query the error ratio — failed requests over all requests. The recording rule job:request_errors:ratio_rate5m already computes it.',
        hintTerm: 'Error Rate',
        accept: [
          "promtool query instant http://localhost:9090 'job:request_errors:ratio_rate5m'",
          'promtool query instant http://localhost:9090 "sum(rate(http_requests_total{status=~\'5..\'}[5m])) / sum(rate(http_requests_total[5m]))"',
        ],
        acceptRe: [
          '^(promtool|curl)\\b.*job:request_errors:ratio_rate5m',
          '^(promtool|curl)\\b.*rate\\s*\\(\\s*http_requests_total\\s*\\{\\s*status',
        ],
        stdout: 'job:request_errors:ratio_rate5m{job="checkout-api"} => 0.0231 @[1785575418.902]',
        setState: { errors: 'measured' },
        hints: [
          'The error signal is a ratio, not a count: 2 failures out of 10 requests is very different from 2 out of a million.',
          'Query the recorded series the rule file defines, with the same `promtool query instant` form as before.',
          "promtool query instant http://localhost:9090 'job:request_errors:ratio_rate5m'",
        ],
      },
      {
        id: 's5',
        promptEn:
          'Query the 99th percentile of response time from the request-duration histogram over the last 5 minutes.',
        hintTerm: 'Percentile',
        accept: [
          'promtool query instant http://localhost:9090 "histogram_quantile(0.99, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))"',
          'promtool query instant http://localhost:9090 "histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))"',
        ],
        acceptRe: ['^(promtool|curl)\\b.*histogram_quantile\\s*\\(\\s*0\\.99'],
        stdout: '{} => 1.874 @[1785575425.406]',
        setState: { latency: 'measured' },
        hints: [
          'An average response time hides the slow tail. You want the value that 99% of requests stay below.',
          'The function is histogram_quantile(0.99, …) applied to the rate of the _bucket series, summed by le.',
          'promtool query instant http://localhost:9090 "histogram_quantile(0.99, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))"',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Last Golden Signal: query the worst queue length seen in the last 5 minutes to judge saturation.',
        hintTerm: 'Saturation',
        accept: [
          'promtool query instant http://localhost:9090 "max_over_time(app_queue_length[5m])"',
          'promtool query instant http://localhost:9090 "max(app_queue_length)"',
        ],
        acceptRe: ['^(promtool|curl)\\b.*max(_over_time)?\\s*\\(\\s*app_queue_length'],
        stdout: '{instance="10.0.4.11:8080", job="checkout-api"} => 42 @[1785575431.088]',
        setState: { saturation: 'measured' },
        hints: [
          'Saturation is how full the service is. A gauge of pending work — the queue — is the usual proxy, and you care about its peak, not its current value.',
          'Use max_over_time(<gauge>[5m]) on the app_queue_length series.',
          'promtool query instant http://localhost:9090 "max_over_time(app_queue_length[5m])"',
        ],
      },
    ],
  },

  mon_logs_3: {
    title: 'Audit the log retention policy',
    intro:
      'Il runbook promette sette giorni di log applicativi compressi, ma nessuno lo ha mai verificato. / The runbook promises seven days of compressed application logs, and nobody has ever checked. Audit what is actually on disk, then exercise the rotation policy yourself.',
    cwd0: '/var/log',
    vocab: [
      'Journald',
      'Archive',
      'Retention Policy',
      'Log Rotation',
      'Logrotate',
      'Compression',
      'Log File',
    ],
    requires: {
      journal: 'measured',
      archive: 'inspected',
      policy: 'checked',
      rotated: true,
      compressed: true,
      flowing: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'Measure how much disk the systemd journal is holding, active plus archived.',
        hintTerm: 'Journald',
        accept: ['journalctl --disk-usage', 'sudo journalctl --disk-usage'],
        acceptRe: ['^(sudo\\s+)?journalctl\\s+--disk-usage\\b'],
        stdout: 'Archived and active journals take up 3.9G in the file system.',
        setState: { journal: 'measured' },
        hints: [
          'systemd keeps its own binary journal, separate from the text files in /var/log. Ask its own tool how big it is.',
          'The tool is `journalctl`; the flag reports disk usage.',
          'journalctl --disk-usage',
        ],
      },
      {
        id: 's2',
        promptEn:
          'List the application log and all of its rotated archives with human-readable sizes.',
        hintTerm: 'Archive',
        accept: ['ls -lh /var/log/app.log*', 'ls -l /var/log/app.log*', 'ls -lh app.log*'],
        acceptRe: ['^ls\\b.*app\\.log'],
        stdout:
          '-rw-r----- 1 app adm 430M Aug  1 09:20 /var/log/app.log\n-rw-r----- 1 app adm 1.1G Aug  1 00:00 /var/log/app.log.1\n-rw-r----- 1 app adm  36M Jul 31 00:00 /var/log/app.log.2.gz\n-rw-r----- 1 app adm  34M Jul 30 00:00 /var/log/app.log.3.gz\n-rw-r----- 1 app adm  35M Jul 29 00:00 /var/log/app.log.4.gz',
        setState: { archive: 'inspected' },
        hints: [
          'Rotated files keep the same base name with a number appended, and the older ones are compressed. List them all at once.',
          'Use `ls` with the long and human-readable flags on the /var/log/app.log* glob.',
          'ls -lh /var/log/app.log*',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Read the retention policy without changing anything: run logrotate in debug mode against /etc/logrotate.d/app.',
        hintTerm: 'Retention Policy',
        accept: [
          'logrotate -d /etc/logrotate.d/app',
          'sudo logrotate -d /etc/logrotate.d/app',
          'logrotate --debug /etc/logrotate.d/app',
        ],
        acceptRe: ['^(sudo\\s+)?logrotate\\s+(-d\\b|--debug\\b)'],
        stdout:
          'WARNING: logrotate in debug mode does nothing except printing debug messages!  Consider using verbose mode (-v) instead.\n\nreading config file /etc/logrotate.d/app\nReading state from file: /var/lib/logrotate/status\nAllocating hash table for state file, size 64 entries\n\nHandling 1 logs\n\nrotating pattern: /var/log/app.log  after 1 days (7 rotations)\nempty log files are not rotated, old logs are removed\nconsidering log /var/log/app.log\n  Now: 2026-08-01 09:22\n  Last rotated at 2026-08-01 00:00\n  log does not need rotating (log has already been rotated)',
        setState: { policy: 'checked' },
        hints: [
          'Before you touch production logs, ask the tool what it would do. It has a mode that only prints its plan.',
          'logrotate has a debug flag that performs no writes.',
          'logrotate -d /etc/logrotate.d/app',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Now force a rotation with the main configuration /etc/logrotate.conf, verbosely, so you can read what it does.',
        hintTerm: 'Log Rotation',
        accept: [
          'sudo logrotate -vf /etc/logrotate.conf',
          'logrotate -vf /etc/logrotate.conf',
          'sudo logrotate -f /etc/logrotate.conf',
          'logrotate -f /etc/logrotate.conf',
          'sudo logrotate -f -v /etc/logrotate.conf',
        ],
        acceptRe: ['^(sudo\\s+)?logrotate\\s+-[a-z]*f\\b', '^(sudo\\s+)?logrotate\\s+.*--force\\b'],
        stdout:
          'reading config file /etc/logrotate.conf\nincluding /etc/logrotate.d\nreading config file app\nReading state from file: /var/lib/logrotate/status\n\nrotating pattern: /var/log/app.log forced from command line (7 rotations)\nempty log files are not rotated, old logs are removed\nconsidering log /var/log/app.log\n  Now: 2026-08-01 09:23\n  Last rotated at 2026-08-01 00:00\n  log needs rotating\nrotating log /var/log/app.log, log->rotateCount is 7\nrenaming /var/log/app.log.4.gz to /var/log/app.log.5.gz (rotatecount 7, logstart 1, i 4),\nrenaming /var/log/app.log.3.gz to /var/log/app.log.4.gz (rotatecount 7, logstart 1, i 3),\nrenaming /var/log/app.log.2.gz to /var/log/app.log.3.gz (rotatecount 7, logstart 1, i 2),\nrenaming /var/log/app.log.1 to /var/log/app.log.2 (rotatecount 7, logstart 1, i 1),\nrenaming /var/log/app.log to /var/log/app.log.1 (rotatecount 7, logstart 1, i 0),\ncreating new /var/log/app.log mode = 0640 uid = 106 gid = 4\nrunning postrotate script',
        setState: { rotated: true },
        hints: [
          'Debug mode printed the plan; now you want the plan executed even though the daily timer has not fired yet.',
          'Same binary, this time with the force flag (and -v to see the steps) on /etc/logrotate.conf.',
          'sudo logrotate -vf /etc/logrotate.conf',
        ],
      },
      {
        id: 's5',
        promptEn:
          'The policy has no compress directive, so the freshly rotated /var/log/app.log.1 is still plain text. Compress it and print the ratio it saved.',
        hintTerm: 'Compression',
        accept: [
          'gzip -v /var/log/app.log.1',
          'sudo gzip -v /var/log/app.log.1',
          'gzip --verbose /var/log/app.log.1',
          'gzip /var/log/app.log.1',
        ],
        acceptRe: ['^(sudo\\s+)?gzip\\b.*app\\.log\\.1\\b'],
        stdout: '/var/log/app.log.1:\t 96.7% -- replaced with /var/log/app.log.1.gz',
        setState: { compressed: true },
        hints: [
          'Text logs compress by a factor of roughly thirty. The other archives already end in .gz — make this one match.',
          'Use `gzip` on the file, with the flag that reports the ratio.',
          'gzip -v /var/log/app.log.1',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Prove the application is already appending to the new, empty log file: follow its last lines live.',
        hintTerm: 'Log File',
        accept: ['tail -f /var/log/app.log', 'tail -n 5 /var/log/app.log', 'tail /var/log/app.log'],
        acceptRe: ['^tail\\b.*app\\.log\\b'],
        stdout:
          '{"ts":"2026-08-01T09:24:03Z","level":"info","msg":"checkout completed","order_id":"A-91442","duration_ms":184}\n{"ts":"2026-08-01T09:24:04Z","level":"warn","msg":"retrying payment webhook","attempt":2}\n{"ts":"2026-08-01T09:24:06Z","level":"info","msg":"checkout completed","order_id":"A-91443","duration_ms":204}',
        setState: { flowing: true },
        hints: [
          'A rotation is only safe if the writer keeps writing afterwards. Watch the end of the new file as new lines arrive.',
          'Use `tail` with the follow flag on /var/log/app.log.',
          'tail -f /var/log/app.log',
        ],
      },
    ],
  },
};
