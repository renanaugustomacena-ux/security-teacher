/**
 * DOCKER & KUBERNETES LABS - Knowledge AIO
 * ========================================
 *
 * Declarative terminal-lab scripts for the `docker-k8s` topic, keyed by
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
  dk_containers_1: {
    title: 'Prove what a container really is',
    intro:
      'Un collega dice che un container è "una piccola macchina virtuale". / A colleague insists a container is "a small virtual machine". You have a terminal and five minutes to show what it actually is.',
    cwd0: '/home/dev',
    vocab: ['Container', 'Image', 'Isolation', 'Namespace', 'Control Group', 'Lightweight'],
    requires: { images: 'listed', pids: 'seen', distro: 'seen', cgroup: 'seen', explained: true },
    steps: [
      {
        id: 's1',
        promptEn: 'List the images already stored on this machine and read the SIZE column.',
        hintTerm: 'Image',
        accept: ['docker images', 'docker image ls', 'docker images -a'],
        acceptRe: ['^(sudo\\s+)?docker\\s+(images|image\\s+ls)\\b'],
        stdout:
          'REPOSITORY   TAG         IMAGE ID       CREATED       SIZE\nnginx        1.25        a72860cb95fd   3 weeks ago   187MB\nnode         20-alpine   f9e12a7c1b03   4 weeks ago   135MB\nalpine       latest      05455a08881e   5 weeks ago   7.8MB\nubuntu       22.04       3db8720ecbf5   6 weeks ago   77.9MB',
        setState: { images: 'listed' },
        hints: [
          'Ask the engine what read-only templates it already keeps locally — the things containers are started from.',
          'Start with `docker im…`',
          'docker images',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Start a throwaway Alpine container and list the processes it can see from the inside.',
        hintTerm: 'Namespace',
        accept: [
          'docker run --rm alpine ps',
          'docker run --rm alpine ps aux',
          'docker run alpine ps',
        ],
        acceptRe: ['^(sudo\\s+)?docker\\s+(container\\s+)?run\\b.*\\balpine\\b.*\\bps\\b'],
        stdout: 'PID   USER     TIME  COMMAND\n    1 root      0:00 ps',
        setState: { pids: 'seen' },
        hints: [
          'The host is running about 200 processes right now. How many does the container see?',
          'docker run --rm alpine <the process-listing command>',
          'docker run --rm alpine ps',
        ],
      },
      {
        id: 's3',
        promptEn:
          'This host is Ubuntu. Show which Linux distribution the Alpine container believes it is running.',
        hintTerm: 'Portability',
        accept: [
          'docker run --rm alpine cat /etc/os-release',
          'docker run --rm alpine cat /etc/alpine-release',
        ],
        acceptRe: [
          '^(sudo\\s+)?docker\\s+(container\\s+)?run\\b.*alpine\\b.*(os-release|alpine-release)',
        ],
        stdout:
          'NAME="Alpine Linux"\nID=alpine\nVERSION_ID=3.19.1\nPRETTY_NAME="Alpine Linux v3.19"',
        setState: { distro: 'seen' },
        hints: [
          'Every Linux distribution writes its identity into a file under /etc. Read that file from inside the container.',
          'docker run --rm alpine cat /etc/…',
          'docker run --rm alpine cat /etc/os-release',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Start an Alpine container capped at 64 MB of memory and print the limit the kernel gives it, /sys/fs/cgroup/memory.max.',
        hintTerm: 'Control Group',
        accept: [
          'docker run --rm -m 64m alpine cat /sys/fs/cgroup/memory.max',
          'docker run --rm --memory 64m alpine cat /sys/fs/cgroup/memory.max',
        ],
        acceptRe: [
          '^(sudo\\s+)?docker\\s+(container\\s+)?run\\b(?=.*(-m|--memory)[= ]?64m\\b).*memory\\.max',
        ],
        stdout: '67108864',
        setState: { cgroup: 'seen' },
        hints: [
          'Isolation is only half the story — the other half is a limit the kernel enforces on the group of processes.',
          'docker run --rm -m 64m alpine cat …',
          'docker run --rm -m 64m alpine cat /sys/fs/cgroup/memory.max',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Print the engine summary and read the Kernel Version line: it is the host kernel, and there is no guest OS anywhere.',
        hintTerm: 'Virtualization',
        accept: ['docker info', 'docker system info'],
        acceptRe: ['^(sudo\\s+)?docker\\s+(system\\s+)?info\\b'],
        stdout:
          'Server:\n Containers: 4\n  Running: 0\n  Paused: 0\n  Stopped: 4\n Images: 4\n Server Version: 25.0.3\n Storage Driver: overlay2\n Cgroup Driver: systemd\n Cgroup Version: 2\n Kernel Version: 6.5.0-27-generic\n Operating System: Ubuntu 22.04.4 LTS\n Architecture: x86_64\n Total Memory: 15.55GiB',
        setState: { explained: true },
        hints: [
          'One command prints everything the engine knows about itself: version, storage driver, cgroup driver, kernel.',
          'Start with `docker in…`',
          'docker info',
        ],
      },
    ],
  },

  dk_cli_1: {
    title: 'Bring the demo stack up',
    intro:
      'La demo per il cliente è domani e tutto lo stack gira su questo portatile. / The client demo is tomorrow and the whole stack runs on this laptop. Start the containers, one flag at a time.',
    cwd0: '/home/dev/demo',
    vocab: [
      'docker run',
      'Detached Mode',
      'Container Name',
      'Port Mapping',
      'Environment Variable',
      'Restart Policy',
      'Auto-Remove',
    ],
    requires: { smoke: 'ok', web: 'running', verified: true, api: 'running', queue: 'running' },
    steps: [
      {
        id: 's1',
        promptEn:
          'Smoke-test the engine: run a disposable Alpine container that prints hello and deletes itself when it exits.',
        hintTerm: 'Auto-Remove',
        accept: ['docker run --rm alpine echo hello', 'docker run --rm alpine:3.19 echo hello'],
        acceptRe: ['^(sudo\\s+)?docker\\s+(container\\s+)?run\\b(?=.*--rm)(?=.*alpine).*echo'],
        stdout:
          "Unable to find image 'alpine:latest' locally\nlatest: Pulling from library/alpine\n96526aa774ef: Pull complete\nStatus: Downloaded newer image for alpine:latest\nhello",
        setState: { smoke: 'ok' },
        hints: [
          'The container must leave nothing behind — it should be removed the moment its command finishes.',
          'docker run <a flag that auto-removes> alpine echo hello',
          'docker run --rm alpine echo hello',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Start nginx:1.25 in the background, name the container web, and publish container port 80 on host port 8080.',
        hintTerm: 'Port Mapping',
        accept: [
          'docker run -d --name web -p 8080:80 nginx:1.25',
          'docker run -d -p 8080:80 --name web nginx:1.25',
          'docker run --name web -d -p 8080:80 nginx:1.25',
        ],
        acceptRe: [
          '^(sudo\\s+)?docker\\s+(container\\s+)?run\\b(?=.*(\\s-d\\b|--detach))(?=.*--name[= ]web\\b)(?=.*(-p|--publish)[= ]?8080:80).*nginx',
        ],
        stdout: '9f2c1a83b7e4d0c6a51f0b2d9e3c7481aa5b6d2f0e19c3847b6d5a0c1e2f3a4b',
        setState: { web: 'running' },
        hints: [
          'Three things at once: it must survive after you close the terminal, it must be reachable by name, and host:container traffic must be wired up.',
          'docker run -d --name … -p host:container …',
          'docker run -d --name web -p 8080:80 nginx:1.25',
        ],
      },
      {
        id: 's3',
        promptEn: 'List the running containers and confirm web is up with its port published.',
        hintTerm: 'Background Process',
        accept: ['docker ps', 'docker container ls', 'docker ps -a'],
        acceptRe: ['^(sudo\\s+)?docker\\s+(ps\\b|container\\s+(ls|ps)\\b)'],
        stdout:
          'CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS                                     NAMES\n9f2c1a83b7e4   nginx:1.25   "/docker-entrypoint.…"   4 seconds ago   Up 3 seconds   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   web',
        setState: { verified: true },
        hints: [
          'Detached does not mean invisible — ask the engine what is running right now.',
          'Start with `docker p…`',
          'docker ps',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Start shop/api:1.4 in the background as api, injecting the environment variable DB_HOST=db.internal.',
        hintTerm: 'Environment Variable',
        accept: [
          'docker run -d --name api -e DB_HOST=db.internal shop/api:1.4',
          'docker run -d -e DB_HOST=db.internal --name api shop/api:1.4',
        ],
        acceptRe: [
          '^(sudo\\s+)?docker\\s+(container\\s+)?run\\b(?=.*(-e|--env)[= ]?db_host=db\\.internal)(?=.*--name[= ]api\\b).*shop/api',
        ],
        stdout: '3c8be0a15d7f92b4e6c0d381a7f2b95c4e1d0a8b7c6f5e4d3a2b1c0d9e8f7a6b',
        setState: { api: 'running' },
        hints: [
          'Configuration does not go inside the image — it is handed to the container at start time.',
          'docker run -d --name api -e KEY=value …',
          'docker run -d --name api -e DB_HOST=db.internal shop/api:1.4',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Start redis:7 in the background as queue so the engine brings it back after a crash or a reboot, but not if you stopped it yourself.',
        hintTerm: 'Restart Policy',
        accept: [
          'docker run -d --name queue --restart unless-stopped redis:7',
          'docker run -d --restart unless-stopped --name queue redis:7',
          'docker run -d --name queue --restart=unless-stopped redis:7',
        ],
        acceptRe: [
          '^(sudo\\s+)?docker\\s+(container\\s+)?run\\b(?=.*--restart[= ]unless-stopped)(?=.*--name[= ]queue\\b).*redis',
        ],
        stdout:
          "Unable to find image 'redis:7' locally\n7: Pulling from library/redis\nStatus: Downloaded newer image for redis:7\nb71d0f4c9a2e5836f1c47a09de35b8c2610f4d7a8b93c5e2f01a6d4b8c7e9f30",
        setState: { queue: 'running' },
        hints: [
          'The demo laptop will be rebooted tonight. The container must come back on its own — except when the stop was deliberate.',
          'docker run -d --name queue --restart <policy> redis:7',
          'docker run -d --name queue --restart unless-stopped redis:7',
        ],
      },
    ],
  },

  dk_cli_4: {
    title: 'Find out why checkout keeps dying',
    intro:
      'Il container checkout riparte da solo ogni due minuti e nessuno sa perché. / The checkout container restarts by itself every couple of minutes and nobody knows why. You have the terminal — find the cause and save the evidence.',
    cwd0: '/home/dev',
    vocab: ['docker logs', 'docker inspect', 'docker stats', 'docker top', 'docker cp'],
    requires: {
      restarting: true,
      logs: 'read',
      oom: 'confirmed',
      mem: 'read',
      procs: 'read',
      evidence: 'saved',
    },
    steps: [
      {
        id: 's1',
        promptEn: 'List the containers and read the STATUS column for checkout.',
        accept: ['docker ps', 'docker ps -a', 'docker container ls'],
        acceptRe: ['^(sudo\\s+)?docker\\s+(ps\\b|container\\s+(ls|ps)\\b)'],
        stdout:
          'CONTAINER ID   IMAGE               COMMAND                  CREATED       STATUS                         PORTS      NAMES\n4d19c7b6a0f3   shop/checkout:2.1   "node server.js"         2 hours ago   Restarting (137) 8 seconds ago              checkout\n9f2c1a83b7e4   nginx:1.25          "/docker-entrypoint.…"   2 hours ago   Up 2 hours                     80/tcp     web',
        setState: { restarting: true },
        hints: [
          'Before guessing, ask the engine what state the container is in right now.',
          'Start with `docker p…`',
          'docker ps',
        ],
      },
      {
        id: 's2',
        promptEn: 'Read the last 20 lines the checkout container printed before it went down.',
        hintTerm: 'docker logs',
        accept: [
          'docker logs --tail 20 checkout',
          'docker logs --tail=20 checkout',
          'docker logs checkout',
        ],
        acceptRe: ['^(sudo\\s+)?docker\\s+(container\\s+)?logs\\b.*checkout'],
        stdout:
          '2026-07-31T09:12:44.301Z  info  listening on :3000\n2026-07-31T09:13:58.412Z  info  cart 8801 -> 6 items\n2026-07-31T09:14:02.117Z  info  cart 8802 -> 4 items\n2026-07-31T09:14:31.882Z  info  nightly export started: 412000 rows\n2026-07-31T09:15:07.550Z  info  listening on :3000\n2026-07-31T09:16:12.004Z  info  cart 8813 -> 5 items\n2026-07-31T09:16:40.219Z  info  nightly export started: 431000 rows',
        setState: { logs: 'read' },
        hints: [
          'The application writes to stdout. Docker keeps that stream for you — go and read it.',
          'docker l… --tail 20 checkout',
          'docker logs --tail 20 checkout',
        ],
      },
      {
        id: 's3',
        promptEn:
          'The log just stops — no error, no stack trace — and the exit code was 137, so the process was killed from outside. Ask docker inspect for the single field State.OOMKilled of checkout.',
        hintTerm: 'docker inspect',
        accept: [
          "docker inspect --format '{{.State.OOMKilled}}' checkout",
          'docker inspect --format "{{.State.OOMKilled}}" checkout',
          "docker inspect -f '{{.State.OOMKilled}}' checkout",
        ],
        acceptRe: ['^(sudo\\s+)?docker\\s+(container\\s+)?inspect\\b(?=.*oomkilled)(?=.*checkout)'],
        stdout: 'true',
        setState: { oom: 'confirmed' },
        hints: [
          'The full metadata blob is JSON — but you only want one boolean out of it, so ask for a Go template.',
          "docker inspect --format '…' checkout",
          "docker inspect --format '{{.State.OOMKilled}}' checkout",
        ],
      },
      {
        id: 's4',
        promptEn:
          'checkout has come back up. Take one snapshot of live resource usage and compare each container with its memory limit.',
        hintTerm: 'docker stats',
        accept: ['docker stats --no-stream', 'docker stats --no-stream checkout', 'docker stats'],
        acceptRe: ['^(sudo\\s+)?docker\\s+(container\\s+)?stats\\b'],
        stdout:
          'CONTAINER ID   NAME       CPU %     MEM USAGE / LIMIT     MEM %     NET I/O          BLOCK I/O   PIDS\n4d19c7b6a0f3   checkout   98.42%    127.4MiB / 128MiB     99.53%    18.2MB / 4.1MB   0B / 0B     23\n9f2c1a83b7e4   web        0.01%     4.32MiB / 1.944GiB    0.22%     1.1MB / 862kB    0B / 0B     3',
        setState: { mem: 'read' },
        hints: [
          'You need CPU and memory as the engine sees them — and just one snapshot, not a live stream.',
          'docker s… --no-stream',
          'docker stats --no-stream',
        ],
      },
      {
        id: 's5',
        promptEn:
          'The image is supposed to start one process. List the processes running inside checkout right now.',
        hintTerm: 'docker top',
        accept: ['docker top checkout', 'docker container top checkout'],
        acceptRe: ['^(sudo\\s+)?docker\\s+(container\\s+)?top\\s+checkout\\b'],
        stdout:
          'UID     PID     PPID    C     STIME   TTY   TIME       CMD\nroot    28471   28449   97    09:16   ?     00:00:11   node server.js\nroot    28503   28471   0     09:16   ?     00:00:00   /bin/sh -c export-worker\nroot    28504   28503   61    09:16   ?     00:00:07   node export-worker.js',
        setState: { procs: 'read' },
        hints: [
          'One container, one command — but nothing stops that command from spawning children.',
          'docker t… checkout',
          'docker top checkout',
        ],
      },
      {
        id: 's6',
        promptEn:
          'The export worker writes /tmp/export-worker.log inside the container. Copy it out into the current directory so the backend team can size the job.',
        hintTerm: 'docker cp',
        accept: [
          'docker cp checkout:/tmp/export-worker.log .',
          'docker cp checkout:/tmp/export-worker.log ./',
          'docker cp checkout:/tmp/export-worker.log ./export-worker.log',
        ],
        acceptRe: [
          '^(sudo\\s+)?docker\\s+(container\\s+)?cp\\s+checkout:/tmp/export-worker\\.log\\s+\\S+',
        ],
        stdout: 'Successfully copied 4.1kB to /home/dev/export-worker.log',
        setState: { evidence: 'saved' },
        hints: [
          'Files inside a container are not on your disk yet — move one out, container:path first, destination second.',
          'docker c… checkout:/tmp/export-worker.log .',
          'docker cp checkout:/tmp/export-worker.log .',
        ],
      },
    ],
  },

  dk_dockerfile_2: {
    title: 'Shrink a 400 MB build context',
    intro:
      'Ogni build dello shop impiega 96 secondi su un portatile che dovrebbe metterci una decina. / Every build of the shop image takes 96 seconds on a laptop that should manage it in ten. The Dockerfile looks fine — so look at what Docker is being sent.',
    cwd0: '/home/dev/shop',
    vocab: [
      'Build Context',
      '.dockerignore',
      'Layer Cache',
      'Build Argument',
      'Image Tag',
      'Build Cache',
    ],
    requires: {
      baseline: 'slow',
      gap: 'found',
      ignored: true,
      fast: true,
      arged: true,
      clean: true,
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'Build the image from the current directory, tagged shop:dev, and watch how long the context transfer takes.',
        hintTerm: 'Build Context',
        accept: ['docker build -t shop:dev .', 'docker build --tag shop:dev .'],
        acceptRe: [
          '^(sudo\\s+)?docker\\s+(buildx\\s+|image\\s+)?build\\b(?=.*(-t|--tag)[= ]?shop:dev\\b)',
        ],
        stdout:
          '[+] Building 96.4s (10/10) FINISHED\n => [internal] load build definition from Dockerfile               0.0s\n => [internal] load .dockerignore                                  0.0s\n => => transferring context: 2B                                    0.0s\n => [internal] load metadata for docker.io/library/node:20-alpine  0.6s\n => [1/5] FROM docker.io/library/node:20-alpine                    0.0s\n => [internal] load build context                                 78.9s\n => => transferring context: 412.35MB                             78.6s\n => [2/5] WORKDIR /app                                             0.1s\n => [3/5] COPY . /app                                              8.6s\n => [4/5] RUN npm ci --omit=dev                                    7.3s\n => [5/5] RUN echo dev > /app/VERSION                              0.3s\n => exporting to image                                             0.6s\n => => naming to docker.io/library/shop:dev                        0.0s',
        setState: { baseline: 'slow' },
        hints: [
          'Start from the plain build so you have a number to compare against, and give the result a name you can reuse.',
          'docker build -t <name>:<tag> <context>',
          'docker build -t shop:dev .',
        ],
      },
      {
        id: 's2',
        promptEn:
          '412 MB was shipped to the daemon. Check whether this project has a file telling Docker what to leave out.',
        hintTerm: '.dockerignore',
        accept: ['cat .dockerignore', 'cat ./.dockerignore', 'less .dockerignore'],
        acceptRe: ['^(sudo\\s+)?(cat|less|more|head|tail)\\s+\\.?/?\\.dockerignore\\b'],
        stdout: 'cat: .dockerignore: No such file or directory',
        setState: { gap: 'found' },
        hints: [
          'There is one file whose whole job is to keep paths out of the build context. Try to read it.',
          'cat .d…',
          'cat .dockerignore',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Create a .dockerignore that keeps .git, node_modules and *.log out of the build context.',
        hintTerm: '.dockerignore',
        accept: [
          "printf '.git\\nnode_modules\\n*.log\\n' | tee .dockerignore",
          "printf '.git\\nnode_modules\\n*.log\\n' > .dockerignore",
        ],
        acceptRe: [
          '\\|\\s*(sudo\\s+)?tee\\s+-?a?\\s*\\.?/?\\.dockerignore\\b',
          '>>?\\s*\\.?/?\\.dockerignore\\b',
        ],
        stdout: '.git\nnode_modules\n*.log',
        setState: { ignored: true },
        hints: [
          'One pattern per line, exactly like a .gitignore — write the three paths into the file.',
          "printf '…' | tee .dockerignore",
          "printf '.git\\nnode_modules\\n*.log\\n' | tee .dockerignore",
        ],
      },
      {
        id: 's4',
        promptEn:
          'Build shop:dev again. Compare the transferred context and the total time with the first run, and note which layers the builder could reuse.',
        hintTerm: 'Layer Cache',
        accept: ['docker build -t shop:dev .', 'docker build --tag shop:dev .'],
        acceptRe: [
          '^(sudo\\s+)?docker\\s+(buildx\\s+|image\\s+)?build\\b(?=.*(-t|--tag)[= ]?shop:dev\\b)',
        ],
        stdout:
          '[+] Building 8.9s (10/10) FINISHED\n => [internal] load build definition from Dockerfile               0.0s\n => [internal] load .dockerignore                                  0.0s\n => => transferring context: 24B                                   0.0s\n => [internal] load metadata for docker.io/library/node:20-alpine  0.4s\n => [1/5] FROM docker.io/library/node:20-alpine                    0.0s\n => [internal] load build context                                  0.2s\n => => transferring context: 1.14MB                                0.1s\n => CACHED [2/5] WORKDIR /app                                      0.0s\n => [3/5] COPY . /app                                              0.3s\n => [4/5] RUN npm ci --omit=dev                                    7.4s\n => [5/5] RUN echo dev > /app/VERSION                              0.3s\n => exporting to image                                             0.3s\n => => naming to docker.io/library/shop:dev                        0.0s',
        setState: { fast: true },
        hints: [
          'Run the very same build as before — the point is the comparison, not a new command.',
          'docker build -t shop:dev …',
          'docker build -t shop:dev .',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Build the release image tagged shop:2.0, passing the build argument VERSION=2.0 to the Dockerfile.',
        hintTerm: 'Build Argument',
        accept: [
          'docker build --build-arg VERSION=2.0 -t shop:2.0 .',
          'docker build -t shop:2.0 --build-arg VERSION=2.0 .',
        ],
        acceptRe: [
          '^(sudo\\s+)?docker\\s+(buildx\\s+|image\\s+)?build\\b(?=.*--build-arg[= ]?version=2\\.0\\b)(?=.*(-t|--tag)[= ]?shop:2\\.0\\b)',
        ],
        stdout:
          '[+] Building 1.4s (10/10) FINISHED\n => [internal] load build definition from Dockerfile               0.0s\n => [internal] load .dockerignore                                  0.0s\n => [internal] load metadata for docker.io/library/node:20-alpine  0.4s\n => [1/5] FROM docker.io/library/node:20-alpine                    0.0s\n => [internal] load build context                                  0.2s\n => => transferring context: 1.14MB                                0.1s\n => CACHED [2/5] WORKDIR /app                                      0.0s\n => CACHED [3/5] COPY . /app                                       0.0s\n => CACHED [4/5] RUN npm ci --omit=dev                             0.0s\n => [5/5] RUN echo 2.0 > /app/VERSION                              0.4s\n => exporting to image                                             0.4s\n => => naming to docker.io/library/shop:2.0                        0.0s',
        setState: { arged: true },
        hints: [
          'The version is not baked into the Dockerfile — it is handed to the builder, and only exists during the build.',
          'docker build --build-arg KEY=value -t … .',
          'docker build --build-arg VERSION=2.0 -t shop:2.0 .',
        ],
      },
      {
        id: 's6',
        promptEn:
          'CI does not trust a laptop cache. Rebuild shop:2.0 from scratch, ignoring every cached layer.',
        hintTerm: 'Build Cache',
        accept: [
          'docker build --no-cache -t shop:2.0 .',
          'docker build --no-cache --build-arg VERSION=2.0 -t shop:2.0 .',
        ],
        acceptRe: [
          '^(sudo\\s+)?docker\\s+(buildx\\s+|image\\s+)?build\\b(?=.*--no-cache)(?=.*shop:2\\.0\\b)',
        ],
        stdout:
          '[+] Building 10.6s (10/10) FINISHED\n => [internal] load build definition from Dockerfile               0.0s\n => [internal] load .dockerignore                                  0.0s\n => [internal] load metadata for docker.io/library/node:20-alpine  0.4s\n => [1/5] FROM docker.io/library/node:20-alpine                    0.1s\n => [internal] load build context                                  0.2s\n => => transferring context: 1.14MB                                0.1s\n => [2/5] WORKDIR /app                                             0.1s\n => [3/5] COPY . /app                                              0.3s\n => [4/5] RUN npm ci --omit=dev                                    7.6s\n => [5/5] RUN echo 2.0 > /app/VERSION                              0.3s\n => exporting to image                                             1.6s\n => => naming to docker.io/library/shop:2.0                        0.0s',
        setState: { clean: true },
        hints: [
          'Every layer must be recomputed, even the ones the builder is convinced it already has.',
          'docker build --no-… -t shop:2.0 .',
          'docker build --no-cache -t shop:2.0 .',
        ],
      },
    ],
  },
};
