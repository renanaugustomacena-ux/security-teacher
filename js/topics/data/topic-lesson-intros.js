export const CONTEXT_INTROS = {
  cybersecurity: {
    authentication:
      'Authentication is the gatekeeper of digital security. These terms cover how systems verify your identity.',
    malware:
      'Malware is malicious software designed to damage or exploit systems. Learn the vocabulary of digital threats.',
    'threat-actors':
      'From hackers to nation-states, threat actors are the people and groups behind cyberattacks.',
    'network-security':
      'Network security protects data in transit. Master these terms to talk about firewalls, protocols, and defenses.',
    defense:
      'Defense-in-depth is a core cybersecurity philosophy. These terms describe the tools and strategies that keep systems safe.',
    cryptography:
      'Cryptography is the science of secret communication. Learn about encryption, hashing, and digital signatures.',
    general:
      'These foundational cybersecurity concepts form the bedrock of every security discussion.',
    'social-engineering':
      'Social engineering exploits human psychology rather than technical flaws. Phishing, pretexting, and more.',
    vulnerability:
      'Vulnerabilities are weaknesses that attackers exploit. Understanding them is the first step to patching them.',
    compliance:
      'Compliance ensures organizations follow security regulations and standards like GDPR, ISO 27001, and PCI DSS.',
  },
  linux: {
    cli: 'The command-line interface is where Linux power users live. Master these essential terminal terms.',
    'file-system':
      'Everything in Linux is a file. These terms cover the directory hierarchy and file operations.',
    permissions:
      'Linux file permissions control who can read, write, and execute. A critical concept for security.',
    processes:
      'Processes are running programs. Learn how Linux manages, monitors, and controls them.',
    networking:
      'Linux networking commands let you configure interfaces, troubleshoot connections, and manage services.',
    'package-management':
      'Package managers install, update, and remove software. Different distros use different tools.',
    system: 'System-level terms cover boot processes, kernel operations, and hardware interaction.',
    scripting:
      'Shell scripting automates repetitive tasks. These terms cover Bash scripting fundamentals.',
    'text-processing':
      'Linux excels at text processing with tools like grep, sed, and awk. Master the vocabulary.',
    administration:
      'System administration involves managing users, services, logs, and system configuration.',
  },
  python: {
    foundations: 'These core Python terms are the building blocks of every program you will write.',
    'data-types':
      'Python has dynamic typing with rich built-in data types. Strings, numbers, booleans, and more.',
    operations:
      'Operators and expressions are how Python processes data. Arithmetic, comparison, and logical operations.',
    'control-flow':
      'Control flow determines which code runs and when. Conditions, loops, and branching logic.',
    'data-structures':
      "Lists, dictionaries, sets, and tuples are Python's powerful built-in data structures.",
    functions:
      'Functions organize code into reusable blocks. Parameters, return values, and scope.',
    classes:
      "Classes define blueprints for objects. Python's object system is elegant and flexible.",
    oop: 'Object-oriented programming in Python: inheritance, polymorphism, encapsulation, and abstraction.',
    modules: 'Modules and packages organize Python code. Import, create, and distribute your own.',
    environment:
      'Virtual environments, pip, and project configuration. Essential for professional Python development.',
  },
  'software-dev': {
    basics:
      'These fundamental software development terms form the vocabulary every developer needs.',
    foundations:
      'These fundamental software development terms form the vocabulary every developer needs.',
    'version-control':
      'Version control tracks changes to code over time. Git is the modern standard.',
    testing:
      'Software testing ensures code works correctly. Unit tests, integration tests, and beyond.',
    patterns:
      'Design patterns are proven solutions to common problems. They make code more maintainable.',
    architecture:
      'Software architecture defines the high-level structure of systems. Microservices, monoliths, and more.',
    collaboration:
      'Software development is a team sport. Code reviews, pair programming, and agile practices.',
    devops:
      'DevOps bridges development and operations. CI/CD, containers, and infrastructure as code.',
    security:
      'Application security protects software from attacks. OWASP, authentication, and secure coding.',
    databases: 'Databases store and manage data. SQL, NoSQL, indexing, and query optimization.',
    apis: 'APIs define how software components communicate. REST, GraphQL, and API design principles.',
  },
  'ai-engineering': {
    foundations:
      'The building blocks of artificial intelligence. Understand AI, ML, and DL distinctions.',
    'machine-learning':
      'Machine learning lets systems learn from data. Supervised, unsupervised, and more.',
    'deep-learning':
      'Deep learning uses neural networks with many layers for complex pattern recognition.',
    nlp: 'Natural language processing bridges human language and machines. Tokenization, embeddings, and beyond.',
    'computer-vision':
      'Computer vision teaches machines to see. Image classification, detection, and segmentation.',
    'data-engineering':
      'Data engineering builds the pipelines that feed ML models. Feature stores and data lakes.',
    'model-training':
      'Model training is where theory meets practice. Hyperparameters, loss functions, and optimization.',
    evaluation:
      'Model evaluation tells you how well your AI actually performs. Metrics that matter.',
    deployment:
      'Deploying AI models to production. Serving, optimization, and real-world constraints.',
    ethics: 'Responsible AI development. Bias, fairness, transparency, and societal impact.',
    tools:
      'The frameworks and libraries that power modern AI. TensorFlow, PyTorch, and the ecosystem.',
    research: 'AI research pushes the boundaries. Benchmarks, SOTA, and the scientific method.',
    architectures:
      'Advanced neural network architectures. Transformers, attention mechanisms, and beyond.',
    optimization:
      'Making models faster and smaller. Quantization, pruning, and efficient inference.',
    mlops:
      'MLOps brings DevOps practices to machine learning. Pipelines, registries, and reproducibility.',
  },
  'ethical-hacking': {
    methodology:
      'Ethical hacking follows structured methodologies. Kill chains, frameworks, and standards.',
    reconnaissance:
      'Reconnaissance is the first phase. Gathering information about targets before testing.',
    scanning:
      'Scanning reveals the attack surface. Port scanning, enumeration, and vulnerability assessment.',
    exploitation:
      'Exploitation turns vulnerabilities into access. Payloads, shells, and controlled attacks.',
    'post-exploitation':
      'Post-exploitation happens after initial access. Escalation, persistence, and lateral movement.',
    'web-hacking':
      'Web application hacking targets websites. Injection, XSS, and the OWASP Top 10.',
    'network-hacking':
      'Network hacking targets infrastructure. Sniffing, spoofing, and man-in-the-middle attacks.',
    wireless:
      'Wireless hacking targets Wi-Fi and radio. WPA cracking, rogue access points, and more.',
    'social-engineering':
      'Social engineering exploits human psychology. Phishing, pretexting, and manipulation.',
    tools: 'The essential toolkit for ethical hackers. Metasploit, Burp Suite, Nmap, and more.',
    reporting:
      'Reporting communicates findings to stakeholders. Severity ratings, PoCs, and recommendations.',
    legal:
      'Legal and ethical boundaries of penetration testing. Authorization, disclosure, and compliance.',
    'mobile-hacking': 'Mobile security testing targets iOS and Android applications.',
    'cloud-hacking':
      'Cloud penetration testing targets cloud infrastructure and misconfigurations.',
    hardware:
      'Hardware hacking involves physical devices. Embedded systems, IoT, and hardware implants.',
  },
  'docker-k8s': {
    containers:
      'Containers package applications with their dependencies. Lightweight, portable, and consistent.',
    images: 'Container images are blueprints. Layers, registries, and efficient builds.',
    'docker-cli':
      'The Docker command line is your primary interface. Run, build, and manage containers.',
    dockerfile:
      'Dockerfiles define how images are built. Instructions, layers, and best practices.',
    compose:
      'Docker Compose orchestrates multi-container applications. Services, networks, and volumes.',
    networking: 'Container networking connects services. Bridge, overlay, and host network modes.',
    volumes: 'Volumes persist data beyond container lifecycles. Storage drivers and mount types.',
    registry:
      'Container registries store and distribute images. Docker Hub, private registries, and CI/CD.',
    kubernetes:
      'Kubernetes orchestrates containers at scale. Clusters, nodes, and the control plane.',
    pods: 'Pods are the smallest deployable units in Kubernetes. Containers, sidecars, and init containers.',
    services:
      'Kubernetes services expose applications. ClusterIP, NodePort, LoadBalancer, and Ingress.',
    deployments:
      'Deployments manage application lifecycle. Rolling updates, rollbacks, and scaling.',
    helm: 'Helm is the package manager for Kubernetes. Charts, values, and templating.',
    orchestration: 'Container orchestration automates deployment, scaling, and operations.',
    security:
      'Container security protects the entire stack. Image scanning, RBAC, and pod security.',
    monitoring: 'Monitoring containers and clusters. Prometheus, health checks, and observability.',
  },
  'system-monitoring': {
    observability:
      'Observability lets you understand system behavior. Metrics, logs, and traces together.',
    metrics: 'Metrics are numerical measurements over time. CPU, memory, latency, and throughput.',
    logs: 'Logs record discrete events. Structured logging, aggregation, and analysis.',
    traces:
      'Distributed tracing follows requests across services. Spans, context propagation, and visualization.',
    alerting:
      'Alerting notifies you when things go wrong. Thresholds, notifications, and escalation.',
    dashboards: 'Dashboards visualize system health. Panels, queries, and real-time updates.',
    prometheus:
      'Prometheus is the standard for metrics collection. Scraping, exporters, and PromQL.',
    grafana: 'Grafana turns data into beautiful dashboards. Panels, data sources, and alerting.',
    infrastructure: 'Infrastructure monitoring covers servers, networks, and cloud resources.',
    apm: 'Application Performance Monitoring tracks user-facing performance. Transactions and error rates.',
    sre: 'Site Reliability Engineering balances reliability with velocity. SLOs, error budgets, and toil.',
    incidents: 'Incident management is the response to outages. Severity, roles, and postmortems.',
    tools: 'The monitoring toolkit. Open-source and commercial solutions for every layer.',
    capacity: 'Capacity planning ensures systems can handle future load. Forecasting and modeling.',
    automation:
      'Automation reduces manual toil. Auto-remediation, runbooks, and self-healing systems.',
  },
  devsecops: {
    'shift-left': 'Shift-left moves security earlier in development. Prevention over detection.',
    'ci-cd': 'CI/CD pipelines automate build, test, and deploy. Security gates at every stage.',
    sast: 'Static analysis examines code without running it. Finding vulnerabilities before deployment.',
    dast: 'Dynamic analysis tests running applications. Fuzzing, scanning, and runtime checks.',
    sca: 'Software Composition Analysis scans dependencies. CVEs, licenses, and supply chain risks.',
    'container-security':
      'Container security hardens images and runtimes. Scanning, signing, and least privilege.',
    'iac-security': 'Infrastructure as Code security scans Terraform, CloudFormation, and more.',
    secrets: 'Secrets management protects credentials. Vaults, rotation, and detection of leaks.',
    'compliance-as-code':
      'Compliance as code automates regulatory checks. Audit trails and policy enforcement.',
    'supply-chain':
      'Supply chain security protects the software delivery pipeline. SBOM, provenance, and signing.',
    policy:
      'Policy as code enforces security rules automatically. OPA, Rego, and admission control.',
    automation: 'Security automation reduces manual effort. SOAR, playbooks, and auto-remediation.',
    'cloud-security':
      'Cloud security posture management. Misconfigurations, compliance, and runtime protection.',
    culture:
      "DevSecOps culture makes security everyone's responsibility. Champions, training, and collaboration.",
    tools: 'The DevSecOps toolchain. Scanners, vaults, and policy engines integrated into CI/CD.',
  },
  'c-programming': {
    foundations:
      'C is the foundation of systems programming. Variables, functions, and the main entry point.',
    syntax: 'C syntax is concise and powerful. Operators, control flow, and expressions.',
    types:
      'C data types define how memory is interpreted. Integers, floats, chars, and type qualifiers.',
    pointers:
      'Pointers are the heart of C. Memory addresses, dereferencing, and pointer arithmetic.',
    memory: 'Manual memory management in C. Allocation, deallocation, and avoiding leaks.',
    strings: 'C strings are null-terminated character arrays. String functions and safe handling.',
    structs: 'Structs group related data. Unions, enums, and user-defined types.',
    io: 'C input/output operates through streams. File handling, formatted I/O, and buffering.',
    preprocessor:
      'The C preprocessor runs before compilation. Macros, includes, and conditional compilation.',
    stdlib: 'The C standard library provides essential utilities. Memory, strings, math, and I/O.',
    algorithms:
      'Implementing algorithms in C. Sorting, searching, and data structures from scratch.',
    debugging: 'Debugging C programs. GDB, Valgrind, sanitizers, and understanding crashes.',
    build: 'Building C programs. Compilers, makefiles, linking, and libraries.',
    systems: 'Systems programming in C. System calls, processes, signals, and IPC.',
    embedded:
      'Embedded C targets microcontrollers. Registers, interrupts, and hardware interaction.',
  },
  cpp: {
    foundations:
      'C++ builds on C with object-oriented features. Classes, namespaces, and modern syntax.',
    oop: 'Object-oriented programming in C++. Classes, inheritance, and polymorphism.',
    stl: 'The Standard Template Library provides containers and algorithms. Vectors, maps, and iterators.',
    templates:
      'Templates enable generic programming. Type parameters, specialization, and metaprogramming.',
    memory: 'C++ memory management. Smart pointers, RAII, and move semantics.',
    'modern-cpp':
      'Modern C++ (11/14/17/20) brings powerful new features. Auto, lambdas, and concepts.',
    concurrency: 'C++ concurrency. Threads, mutexes, atomics, and futures.',
    patterns: 'Design patterns in C++. Singleton, factory, observer, and CRTP.',
    io: 'C++ I/O streams. File handling, serialization, and formatting.',
    exceptions: 'C++ exception handling. Try, catch, throw, and noexcept specifications.',
    lambdas: 'Lambda expressions in C++. Captures, closures, and functional programming.',
    metaprogramming:
      'Template metaprogramming computes at compile time. Type traits and constexpr.',
    build: 'Building C++ projects. CMake, package managers, and the compilation model.',
    testing: 'Testing C++ code. Google Test, Catch2, mocking, and benchmarking.',
    performance: 'C++ performance optimization. Cache-friendly code, profiling, and SIMD.',
  },
  nodejs: {
    foundations: 'Node.js runs JavaScript server-side. The V8 engine, event loop, and runtime.',
    runtime:
      'The Node.js runtime environment. Event-driven, non-blocking I/O, and single-threaded.',
    modules: 'Node.js modules organize code. CommonJS, ES modules, and the module system.',
    npm: 'npm is the Node.js package manager. Installing, publishing, and managing dependencies.',
    async: 'Asynchronous programming in Node.js. Callbacks, promises, and async/await.',
    express:
      'Express is the most popular Node.js web framework. Routes, middleware, and request handling.',
    api: 'Building APIs with Node.js. REST, controllers, and response formatting.',
    middleware:
      'Middleware processes requests in sequence. Authentication, logging, and error handling.',
    database: 'Database integration in Node.js. MongoDB, SQL, ORMs, and connection pooling.',
    testing: 'Testing Node.js applications. Jest, Mocha, supertest, and mocking.',
    security: 'Node.js security best practices. Input validation, helmet, and dependency auditing.',
    streams: 'Node.js streams handle data flow. Readable, writable, transform, and piping.',
    events:
      'The event system is core to Node.js. EventEmitter, listeners, and event-driven architecture.',
    deployment:
      'Deploying Node.js applications. PM2, Docker, environment variables, and health checks.',
    performance: 'Node.js performance. Profiling, memory leaks, clustering, and caching.',
    typescript:
      'TypeScript adds static typing to Node.js. Types, interfaces, and compiler configuration.',
  },
  rust: {
    foundations: 'Rust combines performance with safety. Variables, functions, and Cargo.',
    ownership: "Ownership is Rust's core innovation. Move semantics, borrowing, and lifetimes.",
    types: "Rust's type system is powerful and expressive. Scalars, compounds, and type inference.",
    structs:
      'Rust structs define custom data types. Methods, associated functions, and derive macros.',
    enums: 'Rust enums are algebraic data types. Option, Result, and pattern matching.',
    traits:
      'Traits define shared behavior. Trait bounds, default implementations, and polymorphism.',
    'error-handling':
      "Rust's error handling is explicit. Result, Option, the ? operator, and panic.",
    generics: 'Generics enable code reuse. Type parameters, bounds, and monomorphization.',
    lifetimes:
      'Lifetimes ensure references are valid. Annotations, elision, and the borrow checker.',
    concurrency: 'Fearless concurrency in Rust. Threads, channels, Mutex, and Send/Sync.',
    collections: 'Rust collections. Vec, HashMap, iterators, and functional-style processing.',
    io: 'Rust I/O and networking. File handling, TCP/UDP, and serialization with serde.',
    macros: 'Rust macros generate code at compile time. Declarative and procedural macros.',
    unsafe: 'Unsafe Rust bypasses the borrow checker. Raw pointers, FFI, and when to use it.',
    ecosystem: 'The Rust ecosystem. Popular crates, Cargo, and the community.',
    async: 'Async Rust. Futures, async/await, tokio, and the async runtime.',
    testing: 'Testing in Rust. Unit tests, integration tests, and cargo test.',
  },
  'cloud-computing': {
    foundations:
      'Cloud computing delivers IT resources on demand. IaaS, PaaS, SaaS, and deployment models.',
    compute: 'Cloud compute services. Virtual machines, auto-scaling, and managed instances.',
    storage: 'Cloud storage. Object storage, block storage, and managed file systems.',
    networking: 'Cloud networking. VPCs, subnets, security groups, and load balancers.',
    iam: 'Identity and Access Management. Roles, policies, and the principle of least privilege.',
    serverless:
      'Serverless computing. Functions, triggers, cold starts, and event-driven architecture.',
    database: 'Cloud database services. Managed SQL, NoSQL, and caching solutions.',
    containers: 'Containers in the cloud. ECS, EKS, Fargate, and managed Kubernetes.',
    iac: 'Infrastructure as Code. Terraform, CloudFormation, and declarative provisioning.',
    cost: 'Cloud cost optimization. Pay-as-you-go, reserved instances, and FinOps.',
    monitoring: 'Cloud monitoring services. CloudWatch, Azure Monitor, and native observability.',
    security: 'Cloud security. Encryption, key management, WAF, and shared responsibility.',
    architecture:
      'Cloud architecture patterns. Well-Architected Framework, HA, and disaster recovery.',
    migration: 'Cloud migration strategies. Lift-and-shift, re-platform, and re-architect.',
    services: 'Cloud services ecosystem. Messaging, CDN, AI/ML, and managed middleware.',
  },
  networking: {
    foundations: 'Networking connects computers. LANs, WANs, topologies, and fundamental concepts.',
    'osi-model':
      'The OSI model has 7 layers. Understanding encapsulation and protocol interactions.',
    'tcp-ip':
      'TCP/IP is the backbone of the internet. Connection-oriented and connectionless protocols.',
    protocols:
      'Network protocols define communication rules. HTTP, DNS, SMTP, and application-layer services.',
    addressing: 'IP addressing and subnetting. IPv4, IPv6, CIDR notation, and DHCP.',
    routing:
      'Routing directs traffic between networks. Routers, routing tables, and dynamic protocols.',
    switching: 'Switching connects devices on LANs. VLANs, STP, and MAC address tables.',
    wireless: 'Wireless networking. Wi-Fi standards, SSIDs, channels, and security protocols.',
    dns: 'DNS translates domain names to IP addresses. Records, resolvers, and zone files.',
    firewalls: 'Firewalls filter network traffic. Rules, ACLs, stateful inspection, and zones.',
    vpn: 'VPNs create secure tunnels. IPsec, SSL VPN, and remote access.',
    troubleshooting:
      'Network troubleshooting. Ping, traceroute, packet capture, and systematic diagnosis.',
    tools: 'Network tools and utilities. Diagnostic commands and protocol analyzers.',
    design:
      'Network design. Three-tier architecture, spine-leaf, redundancy, and high availability.',
    services: 'Network services. NAT, proxy, DHCP, NTP, and directory services.',
  },
  databases: {
    foundations: 'Database fundamentals. Tables, rows, columns, schemas, and the role of the DBMS.',
    sql: 'SQL is the language of relational databases. Queries, joins, and data manipulation.',
    nosql:
      'NoSQL databases handle unstructured data. Document, key-value, graph, and column-family.',
    design: 'Database design. Entities, relationships, ERDs, and schema planning.',
    normalization: 'Normalization reduces data redundancy. Normal forms and when to denormalize.',
    indexing: 'Indexes speed up queries. B-trees, hash indexes, and composite indexes.',
    transactions:
      'Transactions ensure data integrity. ACID properties, isolation levels, and locking.',
    optimization: 'Query optimization. Execution plans, EXPLAIN, and performance tuning.',
    replication:
      'Database replication for high availability. Primary-replica, failover, and consistency.',
    administration:
      'Database administration. Backups, user management, monitoring, and maintenance.',
    security:
      'Database security. SQL injection prevention, encryption, auditing, and access control.',
    modeling: 'Data modeling for analytics. Star schema, snowflake, fact and dimension tables.',
    tools: 'Database tools and clients. CLI tools, GUI managers, and monitoring dashboards.',
    'cloud-db': 'Cloud-managed databases. RDS, Aurora, Cosmos DB, and serverless databases.',
    analytics:
      'Database analytics. Time series, graph queries, ETL pipelines, and data warehousing.',
  },
  'git-vcs': {
    foundations: 'Git fundamentals. Repositories, commits, staging, and the working tree.',
    branching:
      'Git branching enables parallel development. Creating, switching, and managing branches.',
    merging: 'Merging integrates branches. Fast-forward, merge commits, and conflict resolution.',
    collaboration: 'Collaborative workflows with Git. Pull requests, code review, and forks.',
    remote: 'Remote repositories. Pushing, pulling, fetching, and managing origins.',
    history: 'Git history management. Amend, revert, cherry-pick, and the reflog.',
    workflow:
      'Git workflows. Git Flow, GitHub Flow, trunk-based development, and branching strategies.',
    advanced: 'Advanced Git operations. Worktrees, submodules, and filter-repo.',
    internals:
      'Git internals. Objects, blobs, trees, commits, and the SHA-1 content-addressable store.',
    tools: 'Git tools and integrations. GUI clients, diff tools, and merge tools.',
    'ci-cd': 'Git in CI/CD. GitHub Actions, GitLab CI, webhooks, and automated workflows.',
    config: 'Git configuration. Aliases, global config, hooks, and conditional includes.',
    troubleshooting:
      'Git troubleshooting. Recovering lost commits, fixing mistakes, and force push recovery.',
    monorepo: 'Monorepo strategies. Workspaces, sparse checkout, and build optimization.',
    strategy:
      'Git strategy and governance. Repository organization, conventions, and team onboarding.',
  },
};

export const TOPIC_FALLBACK_INTROS = {
  cybersecurity:
    'Explore these cybersecurity concepts to strengthen your professional English vocabulary.',
  linux: 'Learn these Linux terms to communicate confidently in technical environments.',
  python: 'Master these Python programming terms to read documentation and discuss code fluently.',
  'software-dev': 'Build your software development vocabulary with these essential industry terms.',
  'ai-engineering':
    'Master AI and machine learning terminology to navigate the world of artificial intelligence.',
  'ethical-hacking':
    'Learn ethical hacking vocabulary to discuss penetration testing and offensive security.',
  'docker-k8s':
    'Build your container and orchestration vocabulary with Docker and Kubernetes terms.',
  'system-monitoring':
    'Learn observability and monitoring terms to discuss system health and reliability.',
  devsecops: 'Master DevSecOps terminology to integrate security into your development pipeline.',
  'c-programming':
    'Learn C programming vocabulary to discuss systems programming and low-level concepts.',
  cpp: 'Master C++ terminology to discuss object-oriented and high-performance programming.',
  nodejs: 'Build your Node.js vocabulary to discuss backend JavaScript development confidently.',
  rust: 'Learn Rust programming terms to discuss memory safety and systems programming.',
  'cloud-computing':
    'Master cloud computing vocabulary to discuss infrastructure and services in the cloud.',
  networking: 'Learn networking terminology to discuss protocols, architecture, and connectivity.',
  databases: 'Build your database vocabulary to discuss data storage, queries, and administration.',
  'git-vcs': 'Master Git and version control terms to discuss collaborative development workflows.',
};

export const ENCOURAGING_CORRECT = [
  'Perfetto! / Perfect!',
  'Ottimo! / Great!',
  'Bravo/Brava!',
  'Esatto! / Exactly!',
  'Fantastico! / Fantastic!',
  'Ci sei! / You got it!',
];

export const ENCOURAGING_WRONG = [
  'Quasi! / Almost!',
  'Ci sei vicino! / So close!',
  'Non mollare! / Keep going!',
  'Stai imparando! / You are learning!',
];
