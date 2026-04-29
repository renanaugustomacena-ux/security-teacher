/**
 * Tech Talk Dialogue Scenarios
 * ============================
 *
 * Handcrafted conversation scenarios for the Tech Talk practice mode.
 * 4 scenarios per topic (16 total), each with 5-8 conversational turns.
 *
 * Structure per scenario:
 *   id, title, titleIt, context, difficulty, turns[], summary
 *
 * Structure per turn:
 *   ai, aiIt, expectedKeywords[], hint, hintIt, onKeywordFound, onKeywordMissing
 */

export const techTalkScenarios = {
  // ═══════════════════════════════════════════════════════
  //  CYBERSECURITY
  // ═══════════════════════════════════════════════════════
  cybersecurity: [
    // ── 1. Security Incident Response ──
    {
      id: 'cyber-incident-response',
      title: 'Security Incident Response',
      titleIt: 'Risposta a un Incidente di Sicurezza',
      context: 'defense',
      difficulty: 2,
      turns: [
        {
          ai: "Hey, we just got an alert from our SIEM. It looks like there's been unauthorized access to our internal network. What's the first thing we should do?",
          aiIt: "Ehi, abbiamo appena ricevuto un avviso dal nostro SIEM. Sembra che ci sia stato un accesso non autorizzato alla nostra rete interna. Qual e' la prima cosa che dovremmo fare?",
          expectedKeywords: ['breach', 'incident response'],
          hint: 'Think about what you call it when someone gets into your network without permission, and what process you follow.',
          hintIt:
            'Pensa a come si chiama quando qualcuno entra nella tua rete senza permesso e a quale processo segui.',
          onKeywordFound:
            "Exactly right, we have a {found} on our hands. Let's activate the incident response plan immediately.",
          onKeywordMissing:
            "In security, we call this a {expected} -- it's critical to name it correctly so the whole team understands the severity.",
        },
        {
          ai: 'Good call. The SOC team confirmed the attacker used a compromised endpoint. How should we stop the attacker from moving further through the network?',
          aiIt: "Buona idea. Il team SOC ha confermato che l'attaccante ha usato un endpoint compromesso. Come dovremmo impedire all'attaccante di muoversi ulteriormente nella rete?",
          expectedKeywords: ['firewall', 'containment'],
          hint: 'Think about network barriers and the phase of incident response where you isolate the threat.',
          hintIt:
            'Pensa alle barriere di rete e alla fase della risposta agli incidenti in cui si isola la minaccia.',
          onKeywordFound:
            'Right, we need {found} measures in place. Updating firewall rules and isolating the compromised segment is the priority.',
          onKeywordMissing:
            'The key concepts here are {expected} -- we need to block lateral movement using firewall rules and contain the affected systems.',
        },
        {
          ai: "We've isolated the affected segment. Now the forensics team found a suspicious executable on three workstations. What do you think it is?",
          aiIt: 'Abbiamo isolato il segmento interessato. Ora il team forense ha trovato un eseguibile sospetto su tre workstation. Cosa pensi che sia?',
          expectedKeywords: ['malware'],
          hint: 'What do we call malicious software that attackers install on compromised systems?',
          hintIt:
            'Come chiamiamo il software dannoso che gli attaccanti installano sui sistemi compromessi?',
          onKeywordFound:
            "Yes, it's almost certainly {found}. We need to get samples to the malware analysis team right away.",
          onKeywordMissing:
            'That suspicious executable is most likely {expected} -- malicious software the attacker planted to maintain access or exfiltrate data.',
        },
        {
          ai: "The malware has been identified and signatures are being updated. What's the next phase after we've stopped the immediate threat?",
          aiIt: "Il malware e' stato identificato e le firme vengono aggiornate. Qual e' la fase successiva dopo aver fermato la minaccia immediata?",
          expectedKeywords: ['remediation'],
          hint: 'After containment comes the phase where you clean up, patch, and restore systems.',
          hintIt:
            'Dopo il contenimento arriva la fase in cui si pulisce, si applica la patch e si ripristinano i sistemi.',
          onKeywordFound:
            '{found} is exactly the right next step. We need to clean all affected systems and patch the vulnerability that was exploited.',
          onKeywordMissing:
            "The next phase is called {expected} -- that's where we eradicate the threat, patch vulnerabilities, and restore services to normal.",
        },
        {
          ai: 'Great work so far. Before we close this out, we need to update leadership. Can you draft a quick summary of the response phases we followed?',
          aiIt: 'Ottimo lavoro finora. Prima di chiudere, dobbiamo aggiornare la dirigenza. Puoi redigere un rapido riepilogo delle fasi di risposta che abbiamo seguito?',
          expectedKeywords: ['incident response', 'containment'],
          hint: 'Summarize the key phases: detection, containment, eradication, and recovery.',
          hintIt: 'Riassumi le fasi chiave: rilevamento, contenimento, eradicazione e ripristino.',
          onKeywordFound:
            'Perfect summary mentioning {found}. A solid incident response report helps us improve for next time.',
          onKeywordMissing:
            'A good summary should include the {expected} phases -- detection, containment, eradication, recovery, and lessons learned.',
        },
        {
          ai: "One last thing -- the CISO wants to know what we're doing to prevent this from happening again. What would you recommend?",
          aiIt: "Un'ultima cosa -- il CISO vuole sapere cosa stiamo facendo per evitare che questo accada di nuovo. Cosa consiglieresti?",
          expectedKeywords: ['firewall', 'breach'],
          hint: 'Think about preventive measures: better rules, monitoring, and learning from this breach.',
          hintIt:
            'Pensa alle misure preventive: regole migliori, monitoraggio e imparare da questa violazione.',
          onKeywordFound:
            'Good thinking. Strengthening our {found} defenses and conducting regular drills will be key to prevention.',
          onKeywordMissing:
            'Key recommendations should reference {expected} -- tightening firewall rules, improving monitoring, and running breach simulation exercises.',
        },
      ],
      summary: {
        en: 'Practiced incident response vocabulary: breach, containment, firewall, malware, remediation.',
        it: 'Praticato il vocabolario della risposta agli incidenti: violazione, contenimento, firewall, malware, rimedio.',
      },
    },

    // ── 2. Password Policy Review ──
    {
      id: 'cyber-password-policy',
      title: 'Password Policy Review',
      titleIt: 'Revisione della Policy sulle Password',
      context: 'authentication',
      difficulty: 1,
      turns: [
        {
          ai: "Hi, I've been asked to review a client's security policies. Their users still use simple 6-character passwords. What's the main risk here?",
          aiIt: "Ciao, mi e' stato chiesto di rivedere le policy di sicurezza di un cliente. I loro utenti usano ancora semplici password di 6 caratteri. Qual e' il rischio principale?",
          expectedKeywords: ['password', 'brute force'],
          hint: 'Think about what type of attack exploits weak passwords by trying many combinations.',
          hintIt:
            'Pensa a quale tipo di attacco sfrutta le password deboli provando molte combinazioni.',
          onKeywordFound:
            'Exactly. Weak {found} policies make the organization vulnerable to automated attacks. We need to change this.',
          onKeywordMissing:
            'The main risk is {expected} -- attackers can crack weak passwords through automated brute force attacks very quickly.',
        },
        {
          ai: 'Right, I agree. Besides requiring stronger passwords, what additional security layer should we recommend they add to their login system?',
          aiIt: "Giusto, sono d'accordo. Oltre a richiedere password piu' forti, quale livello di sicurezza aggiuntivo dovremmo raccomandare per il loro sistema di login?",
          expectedKeywords: ['two-factor authentication'],
          hint: 'This security measure requires something you know AND something you have.',
          hintIt: 'Questa misura di sicurezza richiede qualcosa che sai E qualcosa che possiedi.',
          onKeywordFound:
            "{found} is essential nowadays. Even if a password gets compromised, the attacker still can't get in without the second factor.",
          onKeywordMissing:
            'We should recommend {expected} -- it adds a second verification step, like a code from your phone, making stolen passwords useless on their own.',
        },
        {
          ai: 'Good point. Now, the client stores passwords in a plain text file on their server. Why is that a serious problem?',
          aiIt: "Buon punto. Ora, il cliente memorizza le password in un file di testo semplice sul loro server. Perche' e' un problema serio?",
          expectedKeywords: ['encryption'],
          hint: 'What technique should be used to protect stored data so it cannot be read if stolen?',
          hintIt:
            'Quale tecnica dovrebbe essere usata per proteggere i dati memorizzati in modo che non possano essere letti se rubati?',
          onKeywordFound:
            'Absolutely. Without {found}, anyone who gains access to that file can read every single password. They need to hash and encrypt immediately.',
          onKeywordMissing:
            "Passwords must be protected with {expected} -- specifically, they should be hashed with a strong algorithm so they're unreadable even if the database is stolen.",
        },
        {
          ai: 'The client also mentioned their employees keep clicking on suspicious email links. What type of attack are they falling for?',
          aiIt: 'Il cliente ha anche menzionato che i loro dipendenti continuano a cliccare su link sospetti nelle email. Per quale tipo di attacco stanno cadendo?',
          expectedKeywords: ['phishing'],
          hint: 'This social engineering attack uses fake emails to trick users into revealing credentials.',
          hintIt:
            'Questo attacco di ingegneria sociale usa email false per indurre gli utenti a rivelare le credenziali.',
          onKeywordFound:
            '{found} is one of the most common attack vectors. We should recommend security awareness training for all employees.',
          onKeywordMissing:
            "That's called {expected} -- attackers send emails that look legitimate to trick users into entering their passwords on fake websites.",
        },
        {
          ai: 'Great analysis. Can you summarize the three main recommendations we should present to the client?',
          aiIt: 'Ottima analisi. Puoi riassumere le tre raccomandazioni principali che dovremmo presentare al cliente?',
          expectedKeywords: ['password', 'two-factor authentication', 'encryption'],
          hint: 'Summarize: stronger passwords, multi-factor auth, and proper data protection.',
          hintIt:
            "Riassumi: password piu' forti, autenticazione a piu' fattori e protezione adeguata dei dati.",
          onKeywordFound:
            'Perfect. Mentioning {found} covers the key areas. This will significantly improve their security posture.',
          onKeywordMissing:
            'A complete recommendation should cover {expected} -- stronger password policies, two-factor authentication, and encryption of stored credentials.',
        },
      ],
      summary: {
        en: 'Practiced authentication vocabulary: password, two-factor authentication, encryption, brute force, phishing.',
        it: "Praticato il vocabolario dell'autenticazione: password, autenticazione a due fattori, crittografia, forza bruta, phishing.",
      },
    },

    // ── 3. Vulnerability Assessment ──
    {
      id: 'cyber-vulnerability-assessment',
      title: 'Vulnerability Assessment',
      titleIt: 'Valutazione delle Vulnerabilita',
      context: 'vulnerability',
      difficulty: 3,
      turns: [
        {
          ai: "We've been hired to perform a security audit on a client's web application. Where should we start to identify weaknesses in their system?",
          aiIt: "Siamo stati assunti per eseguire un audit di sicurezza sull'applicazione web di un cliente. Da dove dovremmo iniziare per identificare le debolezze nel loro sistema?",
          expectedKeywords: ['vulnerability', 'penetration testing'],
          hint: 'Think about the process of systematically finding security weaknesses and the method of simulating attacks.',
          hintIt:
            'Pensa al processo di ricerca sistematica delle debolezze di sicurezza e al metodo di simulazione degli attacchi.',
          onKeywordFound:
            'Exactly. Starting with {found} will give us a clear picture of the attack surface before we go deeper.',
          onKeywordMissing:
            'We should begin with {expected} -- a vulnerability scan to identify known weaknesses, followed by penetration testing to simulate real attacks.',
        },
        {
          ai: "Good. Our initial scan found that the login form is susceptible to a common database attack. The input fields aren't properly sanitized. What attack is this?",
          aiIt: "Bene. La nostra scansione iniziale ha scoperto che il modulo di login e' suscettibile a un comune attacco al database. I campi di input non sono correttamente sanificati. Di che attacco si tratta?",
          expectedKeywords: ['SQL injection'],
          hint: 'This attack involves inserting malicious database queries through input fields.',
          hintIt:
            'Questo attacco consiste nell inserire query di database dannose attraverso i campi di input.',
          onKeywordFound:
            '{found} is a critical finding. The attacker could potentially dump the entire database or bypass authentication. We need to flag this as high severity.',
          onKeywordMissing:
            'This is a {expected} vulnerability -- attackers can insert malicious SQL commands through unsanitized input fields to access or modify the database.',
        },
        {
          ai: 'Serious finding. We also discovered an outdated library with a known security flaw that has no official fix yet. How do we classify this type of issue?',
          aiIt: 'Scoperta seria. Abbiamo anche scoperto una libreria obsoleta con una falla di sicurezza nota che non ha ancora una correzione ufficiale. Come classifichiamo questo tipo di problema?',
          expectedKeywords: ['zero-day'],
          hint: 'What do we call a vulnerability that has been discovered but has no patch available yet?',
          hintIt:
            'Come chiamiamo una vulnerabilita che e stata scoperta ma non ha ancora una patch disponibile?',
          onKeywordFound:
            "A {found} vulnerability is extremely dangerous because there's no defense against it yet. We need to implement workarounds immediately.",
          onKeywordMissing:
            "This is classified as a {expected} vulnerability -- it's known to exist but the vendor hasn't released a patch yet, making it especially dangerous.",
        },
        {
          ai: 'For the SQL injection issue, the development team needs to fix this urgently. What should they apply to the affected components?',
          aiIt: 'Per il problema della SQL injection, il team di sviluppo deve risolvere urgentemente. Cosa dovrebbero applicare ai componenti interessati?',
          expectedKeywords: ['patch', 'exploit'],
          hint: 'Think about the fix that developers release for a security flaw, and what attackers use to take advantage of it.',
          hintIt:
            'Pensa alla correzione che gli sviluppatori rilasciano per una falla di sicurezza e a cosa usano gli attaccanti per sfruttarla.',
          onKeywordFound:
            'Right. Applying a {found} quickly is essential -- every hour of delay is an hour an attacker could use this against the client.',
          onKeywordMissing:
            'They need to apply a {expected} -- a patch to fix the vulnerability before an attacker can develop an exploit to take advantage of it.',
        },
        {
          ai: 'We should also test whether an attacker could chain multiple vulnerabilities together. What would you call a test where we try to actually break in, like a real attacker?',
          aiIt: "Dovremmo anche testare se un attaccante potrebbe concatenare piu' vulnerabilita'. Come chiameresti un test in cui proviamo effettivamente a entrare, come un vero attaccante?",
          expectedKeywords: ['penetration testing'],
          hint: 'This type of testing simulates a real-world attack to find exploitable paths.',
          hintIt: 'Questo tipo di test simula un attacco reale per trovare percorsi sfruttabili.',
          onKeywordFound:
            "{found} will reveal if these vulnerabilities can be chained into a full system compromise. Let's schedule it with the red team.",
          onKeywordMissing:
            "That's called {expected} -- it goes beyond scanning by actively attempting to exploit vulnerabilities, just like a real attacker would.",
        },
        {
          ai: "Excellent work. Let's finalize our report. Can you list the critical findings and their severity for the client executive summary?",
          aiIt: "Eccellente lavoro. Finalizziamo il nostro report. Puoi elencare le scoperte critiche e la loro gravita' per il sommario esecutivo del cliente?",
          expectedKeywords: ['vulnerability', 'SQL injection', 'zero-day'],
          hint: 'Summarize the key vulnerabilities we discovered during the assessment.',
          hintIt: "Riassumi le vulnerabilita' chiave che abbiamo scoperto durante la valutazione.",
          onKeywordFound:
            'Great summary highlighting {found}. This report will help the client prioritize their security investments.',
          onKeywordMissing:
            'The executive summary should clearly list {expected} -- these are the findings that pose the greatest risk to the organization.',
        },
      ],
      summary: {
        en: 'Practiced vulnerability assessment vocabulary: vulnerability, penetration testing, exploit, patch, zero-day, SQL injection.',
        it: 'Praticato il vocabolario della valutazione delle vulnerabilita: vulnerabilita, penetration testing, exploit, patch, zero-day, SQL injection.',
      },
    },

    // ── 4. Security Awareness Training ──
    {
      id: 'cyber-security-awareness',
      title: 'Security Awareness Training',
      titleIt: 'Formazione sulla Consapevolezza della Sicurezza',
      context: 'social-engineering',
      difficulty: 1,
      turns: [
        {
          ai: "Hi everyone. I'm leading today's security training session. Let's start with a question: what do we call it when an attacker manipulates people into giving up confidential information?",
          aiIt: 'Ciao a tutti. Conduco la sessione di formazione sulla sicurezza di oggi. Iniziamo con una domanda: come chiamiamo quando un attaccante manipola le persone per ottenere informazioni riservate?',
          expectedKeywords: ['social engineering'],
          hint: 'This attack targets humans rather than computer systems.',
          hintIt: 'Questo attacco prende di mira le persone piuttosto che i sistemi informatici.',
          onKeywordFound:
            "That's right, {found} is the biggest threat to any organization because it exploits human trust rather than technical flaws.",
          onKeywordMissing:
            "This technique is called {expected} -- it's the art of manipulating people into performing actions or divulging confidential information.",
        },
        {
          ai: 'Great. Now, one of the most common forms of this is through email. An employee received a message claiming to be from IT, asking them to click a link and enter their password. What is this called?',
          aiIt: "Ottimo. Ora, una delle forme piu' comuni e' tramite email. Un dipendente ha ricevuto un messaggio che finge di essere dall'IT, chiedendo di cliccare un link e inserire la password. Come si chiama?",
          expectedKeywords: ['phishing'],
          hint: 'Think of the word that sounds like "fishing" -- because attackers are fishing for your credentials.',
          hintIt:
            'Pensa alla parola che suona come "fishing" -- perche gli attaccanti stanno pescando le tue credenziali.',
          onKeywordFound:
            '{found} attacks account for over 90% of data breaches. Always verify the sender before clicking any link.',
          onKeywordMissing:
            'This is called {expected} -- the attacker sends fake emails that look legitimate to trick you into revealing your credentials.',
        },
        {
          ai: "Now here's a scary one. Imagine you come to work and all your files are locked, with a message demanding payment in cryptocurrency to unlock them. What type of attack is this?",
          aiIt: "Ora ecco uno spaventoso. Immagina di arrivare al lavoro e tutti i tuoi file sono bloccati, con un messaggio che richiede un pagamento in criptovaluta per sbloccarli. Che tipo di attacco e' questo?",
          expectedKeywords: ['ransomware'],
          hint: 'This malware holds your data hostage and demands a ransom to give it back.',
          hintIt:
            'Questo malware tiene in ostaggio i tuoi dati e chiede un riscatto per restituirli.',
          onKeywordFound:
            '{found} attacks have cost organizations billions of dollars. Prevention and preparation are absolutely critical.',
          onKeywordMissing:
            "This is {expected} -- malicious software that encrypts your files and demands payment. It's one of the most damaging types of cyberattacks today.",
        },
        {
          ai: "So what's the best defense against ransomware? If your files get encrypted, how can you recover without paying the attacker?",
          aiIt: "Quindi qual e' la migliore difesa contro il ransomware? Se i tuoi file vengono crittografati, come puoi recuperarli senza pagare l'attaccante?",
          expectedKeywords: ['backup'],
          hint: 'Think about keeping copies of your data in a separate, safe location.',
          hintIt: 'Pensa a mantenere copie dei tuoi dati in una posizione separata e sicura.',
          onKeywordFound:
            'Exactly. Regular {found} procedures are your insurance policy. If you have recent backups, you can restore everything without paying a cent.',
          onKeywordMissing:
            'The answer is {expected} -- having regular, tested backups means you can restore your data without negotiating with criminals.',
        },
        {
          ai: 'Last question for the training. If you receive an email or phone call that feels off, what should you always treat it as?',
          aiIt: "Ultima domanda per la formazione. Se ricevi un'email o una telefonata che sembra strana, come dovresti sempre trattarla?",
          expectedKeywords: ['suspicious'],
          hint: 'What word describes something that seems not quite right and should be reported?',
          hintIt:
            'Quale parola descrive qualcosa che non sembra del tutto giusto e dovrebbe essere segnalato?',
          onKeywordFound:
            "Perfect. If something seems {found}, always report it to IT security. It's better to report ten false alarms than miss one real attack.",
          onKeywordMissing:
            'You should treat it as {expected} -- always flag anything that feels off to your security team. Trust your instincts and verify before acting.',
        },
      ],
      summary: {
        en: 'Practiced security awareness vocabulary: social engineering, phishing, ransomware, backup, suspicious.',
        it: 'Praticato il vocabolario della consapevolezza della sicurezza: ingegneria sociale, phishing, ransomware, backup, sospetto.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  LINUX
  // ═══════════════════════════════════════════════════════
  linux: [
    // ── 1. Server Troubleshooting ──
    {
      id: 'linux-server-troubleshooting',
      title: 'Server Troubleshooting',
      titleIt: 'Risoluzione Problemi del Server',
      context: 'processes',
      difficulty: 2,
      turns: [
        {
          ai: 'Hey, our production server is crawling. Users are complaining about extremely slow response times. What should we check first?',
          aiIt: "Ehi, il nostro server di produzione e' lentissimo. Gli utenti si lamentano di tempi di risposta estremamente lenti. Cosa dovremmo controllare per primo?",
          expectedKeywords: ['process', 'CPU', 'memory'],
          hint: 'Think about what system resources might be overwhelmed -- computing power and RAM.',
          hintIt:
            'Pensa a quali risorse di sistema potrebbero essere sovraccaricate -- potenza di calcolo e RAM.',
          onKeywordFound:
            "Right, checking {found} usage is the first step. Let's look at what's consuming resources.",
          onKeywordMissing:
            'We should check {expected} first -- high CPU or memory usage by a specific process is the most common cause of slowdowns.',
        },
        {
          ai: 'Good thinking. What command would you run to see a real-time view of all running processes and their resource usage?',
          aiIt: 'Buon ragionamento. Quale comando eseguiresti per vedere una vista in tempo reale di tutti i processi in esecuzione e il loro utilizzo delle risorse?',
          expectedKeywords: ['top'],
          hint: 'This built-in command shows a dynamic, real-time view of system processes.',
          hintIt:
            'Questo comando integrato mostra una vista dinamica in tempo reale dei processi di sistema.',
          onKeywordFound:
            'Yes, running {found} will show us exactly which processes are hogging resources. Let me run it now.',
          onKeywordMissing:
            'The command you need is {expected} -- it gives a real-time, sorted view of CPU and memory usage per process.',
        },
        {
          ai: "I see it now. There's a runaway Java process using 98% CPU. It looks like it's stuck in an infinite loop. What should we do with it?",
          aiIt: "Lo vedo adesso. C'e' un processo Java fuori controllo che usa il 98% della CPU. Sembra bloccato in un ciclo infinito. Cosa dovremmo fare?",
          expectedKeywords: ['kill'],
          hint: 'What command terminates a running process by its PID?',
          hintIt: 'Quale comando termina un processo in esecuzione tramite il suo PID?',
          onKeywordFound:
            "We should {found} the process immediately. Use kill with the PID, and if it doesn't respond, use kill -9 for a forced termination.",
          onKeywordMissing:
            "We need to {expected} the process -- the kill command sends a termination signal. If it's truly stuck, kill -9 forces it to stop immediately.",
        },
        {
          ai: "Good, the rogue process is gone and CPU is back to normal. But now I'm getting reports that the web application isn't responding at all. What might have happened?",
          aiIt: "Bene, il processo fuori controllo e' sparito e la CPU e' tornata normale. Ma ora ricevo segnalazioni che l'applicazione web non risponde affatto. Cosa potrebbe essere successo?",
          expectedKeywords: ['service'],
          hint: 'The web app runs as a managed service. Think about what manages long-running background applications.',
          hintIt:
            "L'app web funziona come un servizio gestito. Pensa a cosa gestisce le applicazioni in background a lungo termine.",
          onKeywordFound:
            "Right, the web {found} might have been affected when we killed the Java process. Let's check its status.",
          onKeywordMissing:
            'The web application runs as a {expected} -- a managed background process. We need to check if the service is still running.',
        },
        {
          ai: "You're right, the web service is down. The kill command seems to have taken out the application server along with the rogue process. What should we do now?",
          aiIt: "Hai ragione, il servizio web e' fermo. Il comando kill sembra aver eliminato il server dell'applicazione insieme al processo fuori controllo. Cosa dovremmo fare ora?",
          expectedKeywords: ['restart'],
          hint: 'We need to bring the service back up. What action starts a stopped service again?',
          hintIt:
            'Dobbiamo ripristinare il servizio. Quale azione avvia nuovamente un servizio fermato?',
          onKeywordFound:
            "Let's {found} the service right away. Use systemctl restart to bring it back up cleanly.",
          onKeywordMissing:
            'We need to {expected} the service -- systemctl restart will bring the web application back online.',
        },
        {
          ai: 'The service is back online and response times are normal. What should we do to prevent this situation from happening again?',
          aiIt: "Il servizio e' di nuovo online e i tempi di risposta sono normali. Cosa dovremmo fare per evitare che questa situazione si ripeta?",
          expectedKeywords: ['process', 'memory'],
          hint: 'Think about monitoring and setting limits on resource consumption.',
          hintIt: 'Pensa al monitoraggio e all impostazione di limiti sul consumo di risorse.',
          onKeywordFound:
            'Great plan. Setting up {found} monitoring alerts will let us catch runaway processes before they bring down the server.',
          onKeywordMissing:
            'We should set up {expected} monitoring with alerts -- automated monitoring for process CPU and memory usage will catch issues early.',
        },
      ],
      summary: {
        en: 'Practiced server troubleshooting vocabulary: process, CPU, memory, top, kill, service, restart.',
        it: 'Praticato il vocabolario della risoluzione problemi del server: processo, CPU, memoria, top, kill, servizio, riavvio.',
      },
    },

    // ── 2. File Permissions Crisis ──
    {
      id: 'linux-file-permissions',
      title: 'File Permissions Crisis',
      titleIt: 'Crisi dei Permessi dei File',
      context: 'permissions',
      difficulty: 1,
      turns: [
        {
          ai: "A new developer just joined the team and can't access the project files on the shared server. What's likely the issue?",
          aiIt: "Un nuovo sviluppatore si e' appena unito al team e non riesce ad accedere ai file del progetto sul server condiviso. Qual e' probabilmente il problema?",
          expectedKeywords: ['permission', 'user'],
          hint: 'Think about what controls who can read, write, or execute files in Linux.',
          hintIt: 'Pensa a cosa controlla chi puo leggere, scrivere o eseguire file in Linux.',
          onKeywordFound:
            "Right, it's a {found} issue. The new developer's account likely doesn't have the right access level.",
          onKeywordMissing:
            'This is a {expected} issue -- Linux file permissions control which users can access which files and directories.',
        },
        {
          ai: "I checked and the project directory is owned by the 'devteam' group but the new user isn't in that group. What command changes file ownership?",
          aiIt: "Ho controllato e la directory del progetto e' di proprieta del gruppo 'devteam' ma il nuovo utente non e' in quel gruppo. Quale comando cambia la proprieta' dei file?",
          expectedKeywords: ['chown'],
          hint: 'This command stands for "change owner" and modifies file ownership.',
          hintIt: 'Questo comando sta per "change owner" e modifica la proprieta dei file.',
          onKeywordFound:
            'Yes, {found} is the right command. We could also add the user to the devteam group instead of changing ownership.',
          onKeywordMissing:
            "The command is {expected} -- it stands for 'change owner' and lets you change the user and group ownership of files.",
        },
        {
          ai: "Actually, instead of changing ownership, let's add proper group permissions. The directory currently has 700 permissions. What command changes file permissions?",
          aiIt: "In realta', invece di cambiare la proprieta', aggiungiamo i permessi di gruppo corretti. La directory ha attualmente i permessi 700. Quale comando cambia i permessi dei file?",
          expectedKeywords: ['chmod'],
          hint: 'This command stands for "change mode" and modifies read/write/execute permissions.',
          hintIt:
            'Questo comando sta per "change mode" e modifica i permessi di lettura/scrittura/esecuzione.',
          onKeywordFound:
            'Exactly, {found} will let us set group read and execute permissions. We should change it to 750.',
          onKeywordMissing:
            "We need {expected} -- it stands for 'change mode' and lets us modify the read, write, and execute permissions on files and directories.",
        },
        {
          ai: "We set it to 750 and the developer can now read the files. But they can't create new files inside the project directory. What type of file system entry is the project stored in?",
          aiIt: "L'abbiamo impostato a 750 e lo sviluppatore ora puo' leggere i file. Ma non puo' creare nuovi file nella directory del progetto. In che tipo di voce del file system e' memorizzato il progetto?",
          expectedKeywords: ['directory'],
          hint: 'In Linux, a folder that contains files is technically called this.',
          hintIt: 'In Linux, una cartella che contiene file e tecnicamente chiamata cosi.',
          onKeywordFound:
            "Right, write permission on the {found} itself is needed to create new files inside it. Let's adjust that.",
          onKeywordMissing:
            'To create files inside a {expected}, the user needs write permission on the directory itself, not just on the files within it.',
        },
        {
          ai: "One more thing -- some scripts in the project won't execute even though the developer has read permission. What additional permission level do they need?",
          aiIt: "Un'altra cosa -- alcuni script nel progetto non vengono eseguiti anche se lo sviluppatore ha il permesso di lettura. Di quale livello di permesso aggiuntivo hanno bisogno?",
          expectedKeywords: ['root', 'permission'],
          hint: 'Scripts need a specific permission flag to run, and sometimes you need admin privileges.',
          hintIt:
            'Gli script necessitano di un flag di permesso specifico per essere eseguiti, e a volte servono privilegi di amministratore.',
          onKeywordFound:
            'Correct. The scripts need execute {found}. Use chmod +x on the scripts, or elevate to root if they require system-level access.',
          onKeywordMissing:
            'They need execute {expected} -- you can grant it with chmod +x, or if the scripts modify system files, you may need root access.',
        },
      ],
      summary: {
        en: 'Practiced file permissions vocabulary: permission, chmod, chown, directory, root, user.',
        it: 'Praticato il vocabolario dei permessi dei file: permesso, chmod, chown, directory, root, utente.',
      },
    },

    // ── 3. Setting Up a Web Server ──
    {
      id: 'linux-web-server-setup',
      title: 'Setting Up a Web Server',
      titleIt: 'Configurazione di un Web Server',
      context: 'networking',
      difficulty: 2,
      turns: [
        {
          ai: "We need to set up a new web server on this fresh Ubuntu machine. What's the first thing we should do to get Nginx on the system?",
          aiIt: "Dobbiamo configurare un nuovo web server su questa macchina Ubuntu nuova. Qual e' la prima cosa che dovremmo fare per avere Nginx sul sistema?",
          expectedKeywords: ['install', 'package'],
          hint: 'Think about how you get new software on a Linux system -- using the package manager.',
          hintIt:
            'Pensa a come ottieni nuovo software su un sistema Linux -- usando il gestore pacchetti.',
          onKeywordFound:
            "Right, we need to {found} it. Run 'sudo apt install nginx' to get the package from the repository.",
          onKeywordMissing:
            "We need to {expected} the Nginx package -- use your distribution's package manager (apt on Ubuntu) to install it.",
        },
        {
          ai: 'Nginx is installed. But when I try to access the server from a browser, I get a connection timeout. What network component might be blocking the traffic?',
          aiIt: "Nginx e' installato. Ma quando provo ad accedere al server da un browser, ottengo un timeout della connessione. Quale componente di rete potrebbe bloccare il traffico?",
          expectedKeywords: ['firewall', 'port'],
          hint: 'Think about what security feature blocks incoming connections and what numbered entry point web traffic uses.',
          hintIt:
            'Pensa a quale funzione di sicurezza blocca le connessioni in entrata e quale punto di ingresso numerato usa il traffico web.',
          onKeywordFound:
            'Exactly, the {found} is probably blocking incoming connections. We need to allow HTTP traffic through.',
          onKeywordMissing:
            'The {expected} is likely blocking traffic -- we need to open the correct port (80 for HTTP, 443 for HTTPS) in the firewall.',
        },
        {
          ai: 'I opened port 80 and now I can see the default Nginx page. Next we need to set up our custom site. Where do we put the site settings?',
          aiIt: 'Ho aperto la porta 80 e ora posso vedere la pagina predefinita di Nginx. Poi dobbiamo configurare il nostro sito personalizzato. Dove mettiamo le impostazioni del sito?',
          expectedKeywords: ['configuration'],
          hint: 'Nginx site settings go in a specific type of file that defines how the server behaves.',
          hintIt:
            'Le impostazioni del sito Nginx vanno in un tipo specifico di file che definisce come si comporta il server.',
          onKeywordFound:
            "Right, the {found} files for Nginx are in /etc/nginx/sites-available. We'll create a new server block there.",
          onKeywordMissing:
            'We need to edit the {expected} files -- Nginx stores site configurations in /etc/nginx/sites-available/.',
        },
        {
          ai: 'The configuration file is ready. I added our domain and document root. Now I need to make sure Nginx picks up the changes. How do we check the config and apply it?',
          aiIt: "Il file di configurazione e' pronto. Ho aggiunto il nostro dominio e la document root. Ora devo assicurarmi che Nginx recepisca le modifiche. Come controlliamo la configurazione e la applichiamo?",
          expectedKeywords: ['service'],
          hint: 'After changing config files, you need to reload or restart the running background process.',
          hintIt:
            'Dopo aver modificato i file di configurazione, devi ricaricare o riavviare il processo in background.',
          onKeywordFound:
            "Yes, first test with 'nginx -t', then reload the {found}. Use 'systemctl reload nginx' to apply without downtime.",
          onKeywordMissing:
            "After changing the config, we need to reload the {expected} -- run 'nginx -t' to test, then 'systemctl reload nginx' to apply the changes.",
        },
        {
          ai: 'The site is live on HTTP. But we need HTTPS for security. What port does HTTPS use, and what do we need to install for SSL?',
          aiIt: "Il sito e' attivo su HTTP. Ma abbiamo bisogno di HTTPS per la sicurezza. Quale porta usa HTTPS e cosa dobbiamo installare per SSL?",
          expectedKeywords: ['port', 'install'],
          hint: 'HTTPS uses a different port number than HTTP, and you need to install an SSL certificate.',
          hintIt:
            'HTTPS usa un numero di porta diverso da HTTP e devi installare un certificato SSL.',
          onKeywordFound:
            "Correct. HTTPS uses {found} 443. Let's install Certbot to get a free Let's Encrypt certificate.",
          onKeywordMissing:
            "HTTPS runs on {expected} 443, and we need to install an SSL certificate -- Certbot with Let's Encrypt is the easiest free option.",
        },
        {
          ai: 'SSL is configured and our site is serving over HTTPS. What should we do to make sure the server keeps running properly after a reboot?',
          aiIt: "SSL e' configurato e il nostro sito e' servito su HTTPS. Cosa dovremmo fare per assicurarci che il server continui a funzionare correttamente dopo un riavvio?",
          expectedKeywords: ['service', 'configuration'],
          hint: 'We need to make sure the service starts automatically and our configuration is backed up.',
          hintIt:
            'Dobbiamo assicurarci che il servizio si avvii automaticamente e che la nostra configurazione sia salvata.',
          onKeywordFound:
            "Great point. We should enable the {found} to start at boot with 'systemctl enable nginx' and back up all configuration files.",
          onKeywordMissing:
            "We need to ensure the {expected} is enabled at boot -- use 'systemctl enable nginx' and keep backups of all configuration files.",
        },
      ],
      summary: {
        en: 'Practiced web server setup vocabulary: install, package, port, firewall, configuration, service.',
        it: 'Praticato il vocabolario della configurazione del web server: installare, pacchetto, porta, firewall, configurazione, servizio.',
      },
    },

    // ── 4. Bash Scripting Task ──
    {
      id: 'linux-bash-scripting',
      title: 'Bash Scripting Task',
      titleIt: 'Attivita di Scripting Bash',
      context: 'scripting',
      difficulty: 3,
      turns: [
        {
          ai: 'We need to automate our daily database backup. Instead of doing it manually every day, what should we write to automate the process?',
          aiIt: 'Dobbiamo automatizzare il backup giornaliero del database. Invece di farlo manualmente ogni giorno, cosa dovremmo scrivere per automatizzare il processo?',
          expectedKeywords: ['script', 'backup'],
          hint: 'Think about a file containing a sequence of commands that runs automatically.',
          hintIt:
            'Pensa a un file contenente una sequenza di comandi che viene eseguita automaticamente.',
          onKeywordFound:
            "Exactly, a bash {found} will handle this perfectly. Let's start writing one that dumps the database and stores it safely.",
          onKeywordMissing:
            "We should write a {expected} -- a bash script that automates the backup process so we don't have to do it by hand.",
        },
        {
          ai: 'Good. In the script, we need to store the current date so each backup file has a unique name. How do we store a value for later use in bash?',
          aiIt: 'Bene. Nello script, dobbiamo memorizzare la data corrente in modo che ogni file di backup abbia un nome unico. Come memorizziamo un valore per uso futuro in bash?',
          expectedKeywords: ['variable'],
          hint: 'In bash, you store values using named containers. You assign with = and access with $.',
          hintIt:
            'In bash, si memorizzano i valori usando contenitori denominati. Si assegna con = e si accede con $.',
          onKeywordFound:
            'Right, a {found} like DATE=$(date +%Y-%m-%d) will give us a unique timestamp for each backup file.',
          onKeywordMissing:
            'We use a {expected} -- for example: DATE=$(date +%%Y-%%m-%%d). Then we reference it as $DATE in the filename.',
        },
        {
          ai: 'We have multiple databases to back up. Instead of writing the same commands for each one, what programming construct lets us repeat commands for a list of items?',
          aiIt: "Abbiamo piu' database da salvare. Invece di scrivere gli stessi comandi per ciascuno, quale costrutto di programmazione ci permette di ripetere i comandi per una lista di elementi?",
          expectedKeywords: ['loop'],
          hint: "Think about the 'for' construct that iterates over a collection of items.",
          hintIt: "Pensa al costrutto 'for' che itera su una collezione di elementi.",
          onKeywordFound:
            "A {found} is perfect here. We can use 'for db in db1 db2 db3; do ... done' to back up each database.",
          onKeywordMissing:
            "We need a {expected} -- a 'for' loop lets us iterate over a list of database names and run the backup command for each one.",
        },
        {
          ai: 'The script is working. Now we need to compress the backup files to save disk space. What Linux command creates compressed archive files?',
          aiIt: 'Lo script funziona. Ora dobbiamo comprimere i file di backup per risparmiare spazio su disco. Quale comando Linux crea file di archivio compressi?',
          expectedKeywords: ['tar'],
          hint: 'This command creates compressed .tar.gz archive files from directories.',
          hintIt: 'Questo comando crea file di archivio compressi .tar.gz dalle directory.',
          onKeywordFound:
            "Yes, {found} with the -czf flags will compress our backups nicely. Something like 'tar -czf backup.tar.gz /backups/'.",
          onKeywordMissing:
            "The command is {expected} -- use 'tar -czf backup.tar.gz files/' to create a compressed archive of your backup files.",
        },
        {
          ai: 'Excellent. The script is complete and tested. Now we need it to run automatically every day at 2 AM without anyone having to start it. What Linux tool schedules recurring tasks?',
          aiIt: "Eccellente. Lo script e' completo e testato. Ora abbiamo bisogno che venga eseguito automaticamente ogni giorno alle 2 di mattina senza che nessuno debba avviarlo. Quale strumento Linux pianifica le attivita' ricorrenti?",
          expectedKeywords: ['cron'],
          hint: 'This Linux scheduler uses a special syntax with time fields to run tasks at specified intervals.',
          hintIt:
            'Questo schedulatore Linux usa una sintassi speciale con campi temporali per eseguire attivita a intervalli specificati.',
          onKeywordFound:
            "Perfect. We'll add a {found} job with 'crontab -e' and set it to '0 2 * * * /path/to/backup.sh'. Fully automated!",
          onKeywordMissing:
            "We need {expected} -- the cron daemon lets us schedule tasks. Add an entry like '0 2 * * * /path/to/backup.sh' to run it daily at 2 AM.",
        },
      ],
      summary: {
        en: 'Practiced bash scripting vocabulary: script, variable, loop, cron, backup, tar.',
        it: 'Praticato il vocabolario dello scripting bash: script, variabile, ciclo, cron, backup, tar.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  PYTHON
  // ═══════════════════════════════════════════════════════
  python: [
    // ── 1. Code Review ──
    {
      id: 'python-code-review',
      title: 'Code Review',
      titleIt: 'Revisione del Codice',
      context: 'functions',
      difficulty: 2,
      turns: [
        {
          ai: "I'm reviewing your pull request. I see a block of logic repeated in three different places. What should we extract it into to follow the DRY principle?",
          aiIt: 'Sto rivedendo la tua pull request. Vedo un blocco di logica ripetuto in tre posti diversi. In cosa dovremmo estrarlo per seguire il principio DRY?',
          expectedKeywords: ['function'],
          hint: 'A reusable block of code that you can call by name.',
          hintIt: 'Un blocco di codice riutilizzabile che puoi chiamare per nome.',
          onKeywordFound:
            'Exactly. Extracting that logic into a {found} will make the code much cleaner and easier to maintain.',
          onKeywordMissing:
            'We should extract it into a {expected} -- a reusable block of code that we call whenever we need that logic.',
        },
        {
          ai: "Good idea. Now, this function needs to accept some input values to work with. What do we call the values defined in a function's signature?",
          aiIt: 'Buona idea. Ora, questa funzione deve accettare alcuni valori di input per lavorare. Come chiamiamo i valori definiti nella firma di una funzione?',
          expectedKeywords: ['parameter'],
          hint: 'These are the named placeholders in a function definition that receive input values.',
          hintIt:
            'Questi sono i segnaposto denominati nella definizione di una funzione che ricevono valori di input.',
          onKeywordFound:
            'Right, we should define clear {found} names. Something like def calculate_total(price, quantity, tax_rate).',
          onKeywordMissing:
            "Those are called {expected} values -- they're defined in the function signature and receive the data passed when the function is called.",
        },
        {
          ai: "I also noticed the function doesn't give back any result to the caller. It just prints to the console. What should it do instead?",
          aiIt: 'Ho anche notato che la funzione non restituisce alcun risultato al chiamante. Stampa solo sulla console. Cosa dovrebbe fare invece?',
          expectedKeywords: ['return'],
          hint: 'What keyword sends a value back from a function to the code that called it?',
          hintIt: 'Quale parola chiave invia un valore dalla funzione al codice che la chiamata?',
          onKeywordFound:
            'Exactly. The function should {found} the result rather than printing it. This makes it testable and composable.',
          onKeywordMissing:
            'It should {expected} the value -- using the return statement lets the caller decide what to do with the result, making the code more flexible.',
        },
        {
          ai: 'Now I see some related functions that share state. They would work better grouped together. What Python construct organizes functions and data into a single unit?',
          aiIt: "Ora vedo alcune funzioni correlate che condividono stato. Funzionerebbero meglio raggruppate insieme. Quale costrutto Python organizza funzioni e dati in una singola unita'?",
          expectedKeywords: ['class'],
          hint: "Think about object-oriented programming's blueprint for creating objects.",
          hintIt:
            'Pensa al modello della programmazione orientata agli oggetti per creare oggetti.',
          onKeywordFound:
            'Yes, wrapping them in a {found} would improve the design. The shared state becomes instance attributes and functions become methods.',
          onKeywordMissing:
            'We should use a {expected} -- a class groups related functions (methods) and data (attributes) into a cohesive unit.',
        },
        {
          ai: "Inside the class, what do we call the functions that belong to it? They have access to the instance through 'self'.",
          aiIt: "All'interno della classe, come chiamiamo le funzioni che le appartengono? Hanno accesso all'istanza tramite 'self'.",
          expectedKeywords: ['method'],
          hint: 'A function that belongs to a class is called by this name.',
          hintIt: "Una funzione che appartiene a una classe e' chiamata con questo nome.",
          onKeywordFound:
            'Right, a {found} is a function bound to a class. Remember to always include self as the first parameter.',
          onKeywordMissing:
            "Functions inside a class are called {expected} values -- they're methods that operate on the instance data through the self parameter.",
        },
        {
          ai: "One last thing -- the code doesn't handle the case where invalid input is passed. What Python mechanism should we use to handle runtime errors gracefully?",
          aiIt: "Un'ultima cosa -- il codice non gestisce il caso in cui viene passato un input non valido. Quale meccanismo Python dovremmo usare per gestire gli errori di runtime in modo elegante?",
          expectedKeywords: ['exception'],
          hint: 'Python uses try/except blocks to catch and handle these runtime errors.',
          hintIt:
            'Python usa i blocchi try/except per catturare e gestire questi errori di runtime.',
          onKeywordFound:
            'Good catch. Adding {found} handling with try/except will make the code robust against bad input.',
          onKeywordMissing:
            'We need {expected} handling -- wrap risky operations in try/except blocks so the program handles errors gracefully instead of crashing.',
        },
      ],
      summary: {
        en: 'Practiced code review vocabulary: function, parameter, return, class, method, exception.',
        it: 'Praticato il vocabolario della revisione del codice: funzione, parametro, return, classe, metodo, eccezione.',
      },
    },

    // ── 2. Data Processing ──
    {
      id: 'python-data-processing',
      title: 'Data Processing',
      titleIt: 'Elaborazione Dati',
      context: 'data-structures',
      difficulty: 1,
      turns: [
        {
          ai: 'We need to process a CSV file of customer orders. First, we should read all the rows into memory. What ordered collection would you use to store multiple items in Python?',
          aiIt: "Dobbiamo elaborare un file CSV di ordini clienti. Prima, dovremmo leggere tutte le righe in memoria. Quale collezione ordinata useresti per memorizzare piu' elementi in Python?",
          expectedKeywords: ['list'],
          hint: 'The most common ordered, mutable collection in Python, created with square brackets.',
          hintIt:
            'La collezione ordinata e mutabile piu comune in Python, creata con parentesi quadre.',
          onKeywordFound:
            "A {found} is perfect for this. We'll read each row into a list and process them one by one.",
          onKeywordMissing:
            "We should use a {expected} -- Python's list is an ordered collection, ideal for storing rows of data that we'll iterate through.",
        },
        {
          ai: "Good. Now each customer order has a name, product, and price. What Python data structure lets us store key-value pairs, like 'name': 'John'?",
          aiIt: "Bene. Ora ogni ordine cliente ha un nome, prodotto e prezzo. Quale struttura dati Python ci permette di memorizzare coppie chiave-valore, come 'name': 'John'?",
          expectedKeywords: ['dictionary'],
          hint: 'This data structure uses curly braces and maps keys to values.',
          hintIt: 'Questa struttura dati usa le parentesi graffe e mappa le chiavi ai valori.',
          onKeywordFound:
            "Exactly, a {found} is ideal here. Each order becomes a dict with keys like 'name', 'product', 'price'.",
          onKeywordMissing:
            "We should use a {expected} -- Python's dictionary stores key-value pairs, making it easy to access each field by name.",
        },
        {
          ai: 'Now we need to clean up the data. Some product names have extra whitespace. What data type are the product names, and how would you clean them?',
          aiIt: 'Ora dobbiamo pulire i dati. Alcuni nomi di prodotto hanno spazi bianchi extra. Di che tipo di dato sono i nomi dei prodotti e come li puliresti?',
          expectedKeywords: ['string'],
          hint: 'Text data in Python is stored as this type, and it has a .strip() method to remove whitespace.',
          hintIt:
            'I dati testuali in Python sono memorizzati come questo tipo, e ha un metodo .strip() per rimuovere gli spazi.',
          onKeywordFound:
            "Right, they're {found} values. Use the .strip() method to remove leading and trailing whitespace from each string.",
          onKeywordMissing:
            'Product names are {expected} values -- Python strings have a .strip() method that removes extra whitespace.',
        },
        {
          ai: 'Great. Now we need to go through each order and calculate the total. What Python construct do we use to iterate over every item in our list?',
          aiIt: 'Ottimo. Ora dobbiamo scorrere ogni ordine e calcolare il totale. Quale costrutto Python usiamo per iterare su ogni elemento nella nostra lista?',
          expectedKeywords: ['loop'],
          hint: "Think about 'for item in items:' -- what type of construct is this?",
          hintIt: "Pensa a 'for item in items:' -- che tipo di costrutto e' questo?",
          onKeywordFound:
            "A for {found} is exactly what we need. 'for order in orders:' will process each row sequentially.",
          onKeywordMissing:
            "We use a for {expected} -- 'for order in orders:' iterates through each item in the list one at a time.",
        },
        {
          ai: 'Finally, we need to save the cleaned and processed data to a new CSV file. What built-in Python module handles reading and writing CSV files?',
          aiIt: 'Infine, dobbiamo salvare i dati puliti ed elaborati in un nuovo file CSV. Quale modulo integrato di Python gestisce la lettura e la scrittura di file CSV?',
          expectedKeywords: ['file', 'import'],
          hint: 'You need to import a module and use file operations to write the data.',
          hintIt: 'Devi importare un modulo e usare le operazioni sui file per scrivere i dati.',
          onKeywordFound:
            "Right, we need to {found} the csv module and write to a file. Use 'import csv' and open the output file for writing.",
          onKeywordMissing:
            "We need to {expected} the csv module -- 'import csv' gives us tools for reading and writing CSV files.",
        },
      ],
      summary: {
        en: 'Practiced data processing vocabulary: list, dictionary, string, loop, file, import.',
        it: 'Praticato il vocabolario dell elaborazione dati: lista, dizionario, stringa, ciclo, file, import.',
      },
    },

    // ── 3. Debugging Session ──
    {
      id: 'python-debugging',
      title: 'Debugging Session',
      titleIt: 'Sessione di Debugging',
      context: 'foundations',
      difficulty: 2,
      turns: [
        {
          ai: "The production app just crashed. The logs show a big red message. What's the general term for when something goes wrong during program execution?",
          aiIt: "L'app di produzione e' appena crashata. I log mostrano un grande messaggio rosso. Qual e' il termine generale per quando qualcosa va storto durante l'esecuzione del programma?",
          expectedKeywords: ['error', 'exception'],
          hint: 'What do we call a problem that occurs while the program is running?',
          hintIt: 'Come chiamiamo un problema che si verifica mentre il programma e in esecuzione?',
          onKeywordFound:
            "Right, we have a runtime {found}. Let's look at the logs to understand what happened.",
          onKeywordMissing:
            "The program hit a runtime {expected} -- an error or exception that stopped execution. Let's investigate.",
        },
        {
          ai: 'Looking at the logs, I see a long chain of function calls that led to the crash. What is this chain of calls called in Python?',
          aiIt: 'Guardando i log, vedo una lunga catena di chiamate di funzione che hanno portato al crash. Come si chiama questa catena di chiamate in Python?',
          expectedKeywords: ['traceback'],
          hint: 'Python prints this to show you the exact path the code took before crashing.',
          hintIt:
            'Python stampa questo per mostrarti il percorso esatto che il codice ha seguito prima di crashare.',
          onKeywordFound:
            'The {found} is our best friend when debugging. It shows exactly which line in which file caused the problem.',
          onKeywordMissing:
            "That's called a {expected} -- Python's traceback shows every function call from start to crash, ending with the error message.",
        },
        {
          ai: "The traceback points to line 42 where we try to access a key that doesn't exist in a dict. Let's add some investigation code. What process are we performing right now?",
          aiIt: 'Il traceback punta alla riga 42 dove proviamo ad accedere a una chiave che non esiste in un dizionario. Aggiungiamo del codice di investigazione. Quale processo stiamo eseguendo adesso?',
          expectedKeywords: ['debug'],
          hint: 'The process of finding and fixing errors in code is called...?',
          hintIt: 'Il processo di trovare e correggere errori nel codice si chiama...?',
          onKeywordFound:
            "Yes, we're {found}ging the issue. Let's add some print statements to see the state of the data at that point.",
          onKeywordMissing:
            "We're {expected}ging -- the systematic process of finding the root cause of a bug and fixing it.",
        },
        {
          ai: "I added some print statements and I can see the data coming in. The problem is that one field is coming as the wrong kind of data. It's a string when we expected a number. What concept describes the 'kind' of data a value is?",
          aiIt: "Ho aggiunto delle istruzioni print e posso vedere i dati in arrivo. Il problema e' che un campo arriva come tipo di dato sbagliato. E' una stringa quando ci aspettavamo un numero. Quale concetto descrive il 'tipo' di dato che un valore e'?",
          expectedKeywords: ['type'],
          hint: 'In Python, every value has a ... that determines what operations can be performed on it (str, int, float, etc.).',
          hintIt:
            'In Python, ogni valore ha un ... che determina quali operazioni possono essere eseguite su di esso (str, int, float, ecc.).',
          onKeywordFound:
            "A {found} mismatch! The API is sending a string '42' instead of the integer 42. We need to add type conversion.",
          onKeywordMissing:
            "It's a {expected} mismatch -- the value's type is str when we expected int. Use int() or float() to convert it.",
        },
        {
          ai: "Good find. Now let's store a reference to the problematic value so we can inspect it further. What do we call a named container that holds a value in Python?",
          aiIt: "Bella scoperta. Ora memorizziamo un riferimento al valore problematico cosi' possiamo ispezionarlo ulteriormente. Come chiamiamo un contenitore denominato che contiene un valore in Python?",
          expectedKeywords: ['variable'],
          hint: 'A named reference that stores data, like x = 42.',
          hintIt: 'Un riferimento con un nome che memorizza dati, come x = 42.',
          onKeywordFound:
            "Yes, let's assign it to a {found} so we can print it, check its type, and test different conversions.",
          onKeywordMissing:
            'We use a {expected} -- a variable is a named reference to a value. Assign the problem data to one so we can examine it.',
        },
        {
          ai: "We fixed the type conversion bug. Before we deploy the fix, what should we add to make sure the crash won't happen again even if unexpected data types come through?",
          aiIt: 'Abbiamo corretto il bug della conversione di tipo. Prima di distribuire la correzione, cosa dovremmo aggiungere per assicurarci che il crash non si verifichi di nuovo anche se arrivano tipi di dati inaspettati?',
          expectedKeywords: ['exception'],
          hint: 'Wrap the risky code in a try/except block to catch potential problems.',
          hintIt:
            'Avvolgi il codice rischioso in un blocco try/except per catturare potenziali problemi.',
          onKeywordFound:
            'Adding {found} handling with try/except will catch any future type mismatches gracefully instead of crashing.',
          onKeywordMissing:
            'We should add {expected} handling -- a try/except block will catch unexpected data types and handle them gracefully.',
        },
      ],
      summary: {
        en: 'Practiced debugging vocabulary: error, exception, traceback, debug, variable, type.',
        it: 'Praticato il vocabolario del debugging: errore, eccezione, traceback, debug, variabile, tipo.',
      },
    },

    // ── 4. API Development ──
    {
      id: 'python-api-development',
      title: 'API Development',
      titleIt: 'Sviluppo API',
      context: 'modules',
      difficulty: 3,
      turns: [
        {
          ai: "We're building a REST API for our product catalog. First, we need a web framework. Flask is a popular choice. How do we make it available in our Python code?",
          aiIt: "Stiamo costruendo una REST API per il nostro catalogo prodotti. Prima, ci serve un framework web. Flask e' una scelta popolare. Come lo rendiamo disponibile nel nostro codice Python?",
          expectedKeywords: ['import', 'module'],
          hint: 'Think about how you bring external code libraries into your Python file.',
          hintIt: 'Pensa a come porti librerie di codice esterne nel tuo file Python.',
          onKeywordFound:
            "Right, we {found} it. 'from flask import Flask' brings the framework module into our code.",
          onKeywordMissing:
            "We need to {expected} it -- 'import flask' or 'from flask import Flask' loads the module so we can use its features.",
        },
        {
          ai: 'Flask is imported. Now, we want to organize our code into separate files for routes, models, and utilities. What does Python call a collection of related modules?',
          aiIt: "Flask e' importato. Ora, vogliamo organizzare il nostro codice in file separati per route, modelli e utilita'. Come chiama Python una collezione di moduli correlati?",
          expectedKeywords: ['package'],
          hint: 'A directory with an __init__.py file that groups related modules together.',
          hintIt: 'Una directory con un file __init__.py che raggruppa moduli correlati.',
          onKeywordFound:
            "Exactly. A {found} is a directory with an __init__.py file. We'll create packages for routes, models, and utils.",
          onKeywordMissing:
            'Python calls it a {expected} -- a directory containing an __init__.py file and related modules, like a folder of organized code.',
        },
        {
          ai: "Structure looks good. Now let's define the interface that other applications will use to communicate with our service. What do we call this interface?",
          aiIt: "La struttura sembra buona. Ora definiamo l'interfaccia che altre applicazioni useranno per comunicare con il nostro servizio. Come chiamiamo questa interfaccia?",
          expectedKeywords: ['API'],
          hint: 'Application Programming Interface -- the contract between your service and its consumers.',
          hintIt:
            'Application Programming Interface -- il contratto tra il tuo servizio e i suoi consumatori.',
          onKeywordFound:
            "The {found} defines how clients interact with our service. We'll follow REST conventions for a clean, predictable interface.",
          onKeywordMissing:
            'This interface is called an {expected} -- Application Programming Interface. It defines how other software communicates with our service.',
        },
        {
          ai: 'For the product catalog, we need a URL path that returns the list of all products. In REST API terms, what do we call a specific URL path that handles requests?',
          aiIt: 'Per il catalogo prodotti, ci serve un percorso URL che restituisca la lista di tutti i prodotti. In termini di REST API, come chiamiamo un percorso URL specifico che gestisce le richieste?',
          expectedKeywords: ['endpoint'],
          hint: 'A specific URL route in an API, like /api/products or /api/users.',
          hintIt: 'Una rotta URL specifica in una API, come /api/products o /api/users.',
          onKeywordFound:
            "Right, the {found} /api/products will handle GET requests for the product list. Let's define it in Flask.",
          onKeywordMissing:
            "That's called an {expected} -- a specific URL path like /api/products that the API exposes for clients to interact with.",
        },
        {
          ai: "When a client app wants to get the product list, it sends an HTTP call to our endpoint. What do we call this HTTP call from the client's perspective?",
          aiIt: "Quando un'app client vuole ottenere la lista dei prodotti, invia una chiamata HTTP al nostro endpoint. Come chiamiamo questa chiamata HTTP dalla prospettiva del client?",
          expectedKeywords: ['request'],
          hint: 'The client sends a ... to the server, and the server sends back data.',
          hintIt: 'Il client invia una ... al server, e il server restituisce i dati.',
          onKeywordFound:
            'A GET {found} to /api/products will fetch the catalog. We need to handle different request methods: GET, POST, PUT, DELETE.',
          onKeywordMissing:
            'The client sends a {expected} -- an HTTP request. GET requests fetch data, POST creates new items, PUT updates, and DELETE removes.',
        },
        {
          ai: 'And once our server processes the request and prepares the data, what does it send back to the client?',
          aiIt: 'E una volta che il nostro server elabora la richiesta e prepara i dati, cosa invia al client?',
          expectedKeywords: ['response'],
          hint: "The server's reply to a client's request, typically containing data and a status code.",
          hintIt:
            'La risposta del server alla richiesta del client, tipicamente contenente dati e un codice di stato.',
          onKeywordFound:
            'The API sends back a {found} with JSON data and an HTTP status code like 200 for success or 404 for not found.',
          onKeywordMissing:
            'The server sends back a {expected} -- an HTTP response containing the requested data (usually JSON) and a status code indicating success or failure.',
        },
      ],
      summary: {
        en: 'Practiced API development vocabulary: module, import, package, API, endpoint, request, response.',
        it: 'Praticato il vocabolario dello sviluppo API: modulo, import, pacchetto, API, endpoint, richiesta, risposta.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  SOFTWARE-DEV
  // ═══════════════════════════════════════════════════════
  'software-dev': [
    // ── 1. Sprint Planning ──
    {
      id: 'sdev-sprint-planning',
      title: 'Sprint Planning',
      titleIt: 'Pianificazione dello Sprint',
      context: 'collaboration',
      difficulty: 1,
      turns: [
        {
          ai: "Good morning team. We're kicking off our planning session. Let's start by looking at the list of work items that the product owner has prioritized. What's this list called?",
          aiIt: 'Buongiorno team. Stiamo iniziando la nostra sessione di pianificazione. Iniziamo guardando la lista degli elementi di lavoro che il product owner ha prioritizzato. Come si chiama questa lista?',
          expectedKeywords: ['backlog'],
          hint: 'The prioritized list of all pending work items in agile development.',
          hintIt:
            'La lista prioritizzata di tutti gli elementi di lavoro in sospeso nello sviluppo agile.',
          onKeywordFound:
            "Right, the {found} has 24 items this quarter. Let's pick the most important ones for our next iteration.",
          onKeywordMissing:
            "That's called the {expected} -- it's the prioritized list of features, bugs, and tasks waiting to be worked on.",
        },
        {
          ai: "From the backlog, the first item is: 'As a user, I want to reset my password so I can regain access to my account.' What do we call this format of requirement?",
          aiIt: "Dal backlog, il primo elemento e': 'Come utente, voglio resettare la mia password per poter riottenere l'accesso al mio account.' Come chiamiamo questo formato di requisito?",
          expectedKeywords: ['user story'],
          hint: "A requirement written from the user's perspective: 'As a ..., I want ... so that ...'",
          hintIt:
            "Un requisito scritto dalla prospettiva dell'utente: 'Come ..., voglio ... in modo che ...'",
          onKeywordFound:
            "That's a well-written {found}. It clearly describes who needs the feature, what they need, and why.",
          onKeywordMissing:
            "This format is called a {expected} -- it describes a feature from the end user's perspective with clear value and purpose.",
        },
        {
          ai: "Now we need to figure out how much effort this will take. The team uses story points. What's the process of assigning effort to work items called?",
          aiIt: "Ora dobbiamo capire quanto sforzo ci vorra'. Il team usa gli story point. Come si chiama il processo di assegnazione dello sforzo agli elementi di lavoro?",
          expectedKeywords: ['estimate'],
          hint: 'The act of predicting how much time or effort a task will require.',
          hintIt: 'L atto di prevedere quanto tempo o sforzo richiedera un compito.',
          onKeywordFound:
            'Good. Our {found} for this story is 5 points. That seems reasonable given the complexity of password reset flows.',
          onKeywordMissing:
            'The process is called {expected} -- estimating helps the team understand capacity and plan how many items they can complete.',
        },
        {
          ai: 'We have limited capacity this sprint. Some items are more urgent than others. How do we decide which items to work on first?',
          aiIt: "Abbiamo capacita' limitata in questo sprint. Alcuni elementi sono piu' urgenti di altri. Come decidiamo quali elementi lavorare per primi?",
          expectedKeywords: ['priority'],
          hint: 'The relative importance or urgency assigned to each work item.',
          hintIt: "L'importanza o urgenza relativa assegnata a ciascun elemento di lavoro.",
          onKeywordFound:
            'Exactly. Items are ranked by {found} level. High-priority items with business impact go first.',
          onKeywordMissing:
            'We rank them by {expected} -- the product owner assigns priority based on business value, urgency, and dependencies.',
        },
        {
          ai: "The product owner says the password reset feature must be done before the end of the month because of a security compliance requirement. What's this fixed date called?",
          aiIt: "Il product owner dice che la funzionalita' di reset password deve essere completata entro la fine del mese per un requisito di conformita' alla sicurezza. Come si chiama questa data fissa?",
          expectedKeywords: ['deadline'],
          hint: 'A fixed date by which work must be completed.',
          hintIt: 'Una data fissa entro la quale il lavoro deve essere completato.',
          onKeywordFound:
            "Having a hard {found} means we need to make this our top priority. Let's commit to delivering it in this sprint.",
          onKeywordMissing:
            "That's called a {expected} -- a non-negotiable date by which the work must be finished. This drives our sprint commitment.",
        },
        {
          ai: "Alright, let's finalize. What is the fixed time period called during which we commit to completing a set of work items?",
          aiIt: 'Bene, finalizziamo. Come si chiama il periodo di tempo fisso durante il quale ci impegniamo a completare un insieme di elementi di lavoro?',
          expectedKeywords: ['sprint'],
          hint: 'In Scrum, this is the time-boxed iteration, usually 1-4 weeks long.',
          hintIt: "In Scrum, questa e' l'iterazione a tempo fisso, di solito lunga 1-4 settimane.",
          onKeywordFound:
            "This {found} will be two weeks. We've committed to the password reset feature plus three other stories. Let's go!",
          onKeywordMissing:
            "It's called a {expected} -- a fixed-length iteration (usually 2 weeks) where the team commits to completing a specific set of work.",
        },
      ],
      summary: {
        en: 'Practiced sprint planning vocabulary: sprint, backlog, user story, estimate, priority, deadline.',
        it: 'Praticato il vocabolario della pianificazione dello sprint: sprint, backlog, user story, stima, priorita, scadenza.',
      },
    },

    // ── 2. Code Deployment ──
    {
      id: 'sdev-code-deployment',
      title: 'Code Deployment',
      titleIt: 'Distribuzione del Codice',
      context: 'devops',
      difficulty: 2,
      turns: [
        {
          ai: "The feature branch is approved and merged. Now we need to get it to our users. What's the process of releasing code to a server called?",
          aiIt: "Il branch della feature e' approvato e unito. Ora dobbiamo farlo arrivare ai nostri utenti. Come si chiama il processo di rilascio del codice su un server?",
          expectedKeywords: ['deploy'],
          hint: 'The act of releasing and installing a new version of the software on a server.',
          hintIt: 'L atto di rilasciare e installare una nuova versione del software su un server.',
          onKeywordFound:
            "Right, we need to {found} the new version. But we don't do this manually anymore -- it's all automated.",
          onKeywordMissing:
            'We need to {expected} it -- deployment is the process of releasing new code to a server where users can access it.',
        },
        {
          ai: 'Our deployment is automated through a sequence of steps: code is compiled, tests run, and artifacts are created. What do we call this automated sequence?',
          aiIt: "La nostra distribuzione e' automatizzata attraverso una sequenza di passaggi: il codice viene compilato, i test vengono eseguiti e gli artefatti vengono creati. Come chiamiamo questa sequenza automatizzata?",
          expectedKeywords: ['pipeline', 'CI/CD'],
          hint: 'This automated workflow typically includes stages like build, test, and deploy.',
          hintIt:
            'Questo flusso di lavoro automatizzato include tipicamente fasi come build, test e deploy.',
          onKeywordFound:
            'The {found} automates everything from code commit to production deployment. It ensures consistency and catches issues early.',
          onKeywordMissing:
            "It's called a {expected} -- a CI/CD pipeline automates the entire process from code change to production deployment.",
        },
        {
          ai: 'The first stage of our pipeline compiles the code and packages it into a deployable artifact. What do we call this compilation stage?',
          aiIt: 'La prima fase della nostra pipeline compila il codice e lo impacchetta in un artefatto distribuibile. Come chiamiamo questa fase di compilazione?',
          expectedKeywords: ['build'],
          hint: 'The process of compiling source code into executable or deployable packages.',
          hintIt:
            'Il processo di compilazione del codice sorgente in pacchetti eseguibili o distribuibili.',
          onKeywordFound:
            'The {found} stage just completed successfully. All source code compiled and the Docker image was created.',
          onKeywordMissing:
            'This stage is called the {expected} -- it compiles source code and creates the deployable artifacts like Docker images or JAR files.',
        },
        {
          ai: 'Build passed. Next, the pipeline runs our automated quality checks. What stage verifies that the code works correctly?',
          aiIt: "Il build e' passato. Poi, la pipeline esegue i nostri controlli di qualita' automatizzati. Quale fase verifica che il codice funzioni correttamente?",
          expectedKeywords: ['test'],
          hint: 'Automated checks that verify the code behaves as expected.',
          hintIt: 'Controlli automatizzati che verificano che il codice si comporti come previsto.',
          onKeywordFound:
            "All {found} suites passed -- unit tests, integration tests, and end-to-end tests. We're green across the board.",
          onKeywordMissing:
            'The {expected} stage runs all automated tests -- unit, integration, and end-to-end -- to verify the code works correctly.',
        },
        {
          ai: "Tests are green. Before going to production, we should deploy to an intermediate environment that mirrors production. What's this environment called?",
          aiIt: 'I test sono verdi. Prima di andare in produzione, dovremmo distribuire in un ambiente intermedio che rispecchia la produzione. Come si chiama questo ambiente?',
          expectedKeywords: ['staging'],
          hint: "A pre-production environment that's identical to production for final verification.",
          hintIt: 'Un ambiente di pre-produzione identico alla produzione per la verifica finale.',
          onKeywordFound:
            'Deploying to {found} now. QA will do a final round of manual testing before we proceed.',
          onKeywordMissing:
            "It's called {expected} -- a staging environment mirrors production exactly and is where we do final verification before the real release.",
        },
        {
          ai: "QA approved the staging release. Everything looks perfect. What's the final target environment where real users access the application?",
          aiIt: "Il QA ha approvato il rilascio in staging. Tutto sembra perfetto. Qual e' l'ambiente finale dove gli utenti reali accedono all'applicazione?",
          expectedKeywords: ['production'],
          hint: 'The live environment where actual users interact with the application.',
          hintIt: "L'ambiente live dove gli utenti reali interagiscono con l'applicazione.",
          onKeywordFound:
            'Deploying to {found} now. The pipeline is pushing the verified artifact to our live servers. Users will see the new feature within minutes.',
          onKeywordMissing:
            'The final target is {expected} -- the production environment is where the application runs for real users. This is the live system.',
        },
      ],
      summary: {
        en: 'Practiced deployment vocabulary: deploy, pipeline, CI/CD, build, test, staging, production.',
        it: 'Praticato il vocabolario della distribuzione: deploy, pipeline, CI/CD, build, test, staging, produzione.',
      },
    },

    // ── 3. Architecture Discussion ──
    {
      id: 'sdev-architecture-discussion',
      title: 'Architecture Discussion',
      titleIt: 'Discussione sull Architettura',
      context: 'architecture',
      difficulty: 3,
      turns: [
        {
          ai: 'Our monolithic application is becoming hard to maintain as the team grows. We need to discuss the overall system design. What do we call the high-level structure of a software system?',
          aiIt: 'La nostra applicazione monolitica sta diventando difficile da mantenere con la crescita del team. Dobbiamo discutere il design complessivo del sistema. Come chiamiamo la struttura ad alto livello di un sistema software?',
          expectedKeywords: ['architecture'],
          hint: 'The high-level design decisions and structural organization of a system.',
          hintIt:
            "Le decisioni di design ad alto livello e l'organizzazione strutturale di un sistema.",
          onKeywordFound:
            "Right, we need to rethink our {found}. The current monolith won't scale with 10 teams working on it simultaneously.",
          onKeywordMissing:
            'We need to review our {expected} -- the software architecture defines how components are organized, communicate, and scale.',
        },
        {
          ai: "Instead of one big application, we could split it into smaller, independently deployable services. What's this pattern called?",
          aiIt: "Invece di un'unica grande applicazione, potremmo dividerla in servizi piu' piccoli e distribuibili indipendentemente. Come si chiama questo pattern?",
          expectedKeywords: ['microservice'],
          hint: 'Small, focused services that each do one thing well and communicate over APIs.',
          hintIt:
            'Piccoli servizi focalizzati che fanno ciascuno una cosa bene e comunicano tramite API.',
          onKeywordFound:
            "A {found} architecture would let each team own and deploy their service independently. That's a big win for velocity.",
          onKeywordMissing:
            'This pattern is called {expected} architecture -- splitting a monolith into small, independent services that each handle a specific business capability.',
        },
        {
          ai: 'Each microservice will need to store its own data. What system do we use to persistently store and query structured data?',
          aiIt: "Ogni microservizio dovra' memorizzare i propri dati. Quale sistema usiamo per memorizzare e interrogare dati strutturati in modo persistente?",
          expectedKeywords: ['database'],
          hint: 'A system like PostgreSQL or MongoDB that stores data permanently.',
          hintIt: 'Un sistema come PostgreSQL o MongoDB che memorizza i dati in modo permanente.',
          onKeywordFound:
            "Each service gets its own {found}. This 'database per service' pattern ensures services are truly independent.",
          onKeywordMissing:
            'Each service needs its own {expected} -- having a dedicated database per microservice ensures data isolation and independent scaling.',
        },
        {
          ai: 'The services need to communicate with each other. The product service needs to check inventory levels. How will they exchange data?',
          aiIt: 'I servizi devono comunicare tra loro. Il servizio prodotti deve controllare i livelli di inventario. Come scambieranno i dati?',
          expectedKeywords: ['API'],
          hint: 'Services communicate over well-defined interfaces using HTTP or messaging.',
          hintIt:
            'I servizi comunicano tramite interfacce ben definite usando HTTP o messaggistica.',
          onKeywordFound:
            "The services will communicate through {found} calls. We'll use REST APIs for synchronous requests and event queues for async.",
          onKeywordMissing:
            "They'll use {expected} calls -- each microservice exposes an API that other services can call to exchange data.",
        },
        {
          ai: 'As we grow, some services will get much more traffic than others. The product search service gets 10x the requests of the order service. What property do we need so we can handle increasing load?',
          aiIt: "Man mano che cresciamo, alcuni servizi riceveranno molto piu' traffico di altri. Il servizio di ricerca prodotti riceve 10 volte le richieste del servizio ordini. Di quale proprieta' abbiamo bisogno per gestire un carico crescente?",
          expectedKeywords: ['scalability', 'cache'],
          hint: 'The ability to handle growing amounts of work, and a fast temporary data store to reduce load.',
          hintIt:
            'La capacita di gestire quantita crescenti di lavoro e un archivio dati temporaneo veloce per ridurre il carico.',
          onKeywordFound:
            '{found} is exactly what microservices give us. We can scale the search service to 20 instances while keeping the order service at 3.',
          onKeywordMissing:
            'We need {expected} -- the ability to scale services independently, and caching frequently requested data to reduce database load.',
        },
      ],
      summary: {
        en: 'Practiced architecture vocabulary: architecture, microservice, database, API, scalability, cache.',
        it: "Praticato il vocabolario dell'architettura: architettura, microservizio, database, API, scalabilita, cache.",
      },
    },

    // ── 4. Bug Report Investigation ──
    {
      id: 'sdev-bug-investigation',
      title: 'Bug Report Investigation',
      titleIt: 'Indagine sulla Segnalazione di Bug',
      context: 'testing',
      difficulty: 2,
      turns: [
        {
          ai: 'QA just filed a report about a defect in the checkout flow. The total price shows as negative for certain discount combinations. What do we call this defect?',
          aiIt: 'Il QA ha appena segnalato un difetto nel flusso di checkout. Il prezzo totale appare come negativo per certe combinazioni di sconto. Come chiamiamo questo difetto?',
          expectedKeywords: ['bug'],
          hint: 'A defect or flaw in the software that causes incorrect behavior.',
          hintIt: 'Un difetto o errore nel software che causa un comportamento non corretto.',
          onKeywordFound:
            "Yes, this is a critical {found}. Negative prices in checkout could cost us real money. Let's investigate immediately.",
          onKeywordMissing:
            'This is a {expected} -- a software defect that causes incorrect behavior. In this case, the pricing calculation has a flaw.',
        },
        {
          ai: 'Before we can fix it, we need to verify the issue ourselves. What do we call the process of making the bug happen again in a controlled environment?',
          aiIt: 'Prima di poterlo correggere, dobbiamo verificare il problema noi stessi. Come chiamiamo il processo di far riaccadere il bug in un ambiente controllato?',
          expectedKeywords: ['reproduce'],
          hint: 'To make the bug happen again by following the same steps.',
          hintIt: 'Far riaccadere il bug seguendo gli stessi passaggi.',
          onKeywordFound:
            "I can {found} it consistently. Two 50%% discount codes applied together cause the negative total. Now let's find the root cause.",
          onKeywordMissing:
            'We need to {expected} the bug -- consistently recreate the problem so we can study it and understand exactly when and how it happens.',
        },
        {
          ai: 'I can reproduce it. Now I need to trace through the code to find the exact line causing the problem. What process am I about to start?',
          aiIt: 'Riesco a riprodurlo. Ora devo tracciare il codice per trovare la riga esatta che causa il problema. Quale processo sto per iniziare?',
          expectedKeywords: ['debug'],
          hint: 'The systematic process of finding the root cause of a software defect.',
          hintIt: 'Il processo sistematico di trovare la causa radice di un difetto software.',
          onKeywordFound:
            "Time to {found}. I'll set breakpoints in the discount calculation module and step through the logic.",
          onKeywordMissing:
            "I'm about to {expected} the code -- debugging means systematically tracing through the logic to find exactly where things go wrong.",
        },
        {
          ai: "Found it! The discount logic doesn't cap the total discount at 100%. I've written the correction. What do we call the code change that resolves a bug?",
          aiIt: 'Trovato! La logica dello sconto non limita lo sconto totale al 100%%. Ho scritto la correzione. Come chiamiamo la modifica al codice che risolve un bug?',
          expectedKeywords: ['fix'],
          hint: 'A code change that corrects a defect.',
          hintIt: 'Una modifica al codice che corregge un difetto.',
          onKeywordFound:
            "Good {found}. The total discount is now capped at the item price. Let's make sure this change doesn't break anything else.",
          onKeywordMissing:
            'That code change is called a {expected} -- a targeted modification that corrects the buggy behavior.',
        },
        {
          ai: "Before we merge the fix, we need to make sure it didn't break existing functionality. What do we call a bug that was previously fixed but reappears after new changes?",
          aiIt: "Prima di unire la correzione, dobbiamo assicurarci che non abbia rotto le funzionalita' esistenti. Come chiamiamo un bug che era stato precedentemente corretto ma riappare dopo nuove modifiche?",
          expectedKeywords: ['regression'],
          hint: 'When a previously working feature breaks due to new code changes.',
          hintIt:
            'Quando una funzionalita precedentemente funzionante si rompe a causa di nuove modifiche al codice.',
          onKeywordFound:
            'Exactly, we need to check for {found} issues. Running the full test suite will catch any features we accidentally broke.',
          onKeywordMissing:
            "That's called a {expected} -- a regression is when a previously working feature breaks because of new changes. That's why we test thoroughly.",
        },
        {
          ai: 'To prevent this specific bug from ever coming back, what type of automated test should we write to verify this single piece of logic works correctly?',
          aiIt: 'Per evitare che questo specifico bug ritorni mai, quale tipo di test automatizzato dovremmo scrivere per verificare che questa singola parte di logica funzioni correttamente?',
          expectedKeywords: ['unit test'],
          hint: 'A small, focused test that verifies a single function or method in isolation.',
          hintIt:
            'Un piccolo test focalizzato che verifica una singola funzione o metodo in isolamento.',
          onKeywordFound:
            'A {found} for the discount capping logic will catch this immediately if anyone changes the code. Prevention is better than cure.',
          onKeywordMissing:
            'We should write a {expected} -- a unit test that specifically tests the discount calculation, ensuring the total never exceeds the item price.',
        },
      ],
      summary: {
        en: 'Practiced bug investigation vocabulary: bug, test, reproduce, debug, fix, regression, unit test.',
        it: "Praticato il vocabolario dell'indagine sui bug: bug, test, riprodurre, debug, fix, regressione, test unitario.",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  AI ENGINEERING
  // ═══════════════════════════════════════════════════════
  'ai-engineering': [
    {
      id: 'ai-model-eval',
      title: 'Model Evaluation Review',
      titleIt: 'Revisione della Valutazione del Modello',
      context: 'evaluation',
      difficulty: 2,
      turns: [
        {
          ai: 'Our new fraud detection classifier flagged 95% of fraudulent transactions, but it also flagged a lot of legitimate ones. Which metric should worry us here?',
          aiIt: 'Il nostro nuovo classificatore di frodi ha segnalato il 95% delle transazioni fraudolente, ma ha segnalato anche molte transazioni legittime. Quale metrica dovrebbe preoccuparci?',
          expectedKeywords: ['precision'],
          hint: 'Think about the metric measuring how many flagged items are actually positive.',
          hintIt:
            'Pensa alla metrica che misura quanti elementi segnalati sono realmente positivi.',
          onKeywordFound:
            'Exactly, low {found} means too many false positives. The team will need to tune the threshold.',
          onKeywordMissing:
            'We should focus on {expected} -- it tells us what fraction of positive predictions are correct.',
        },
        {
          ai: 'Right. And what about the metric that tells us how many actual fraud cases we caught out of the total real frauds?',
          aiIt: 'Giusto. E per quanto riguarda la metrica che ci dice quanti casi reali di frode abbiamo individuato sul totale delle frodi reali?',
          expectedKeywords: ['recall'],
          hint: 'It is the inverse perspective of precision -- coverage of true positives.',
          hintIt: "E' la prospettiva inversa della precision -- copertura dei veri positivi.",
          onKeywordFound:
            'Yes, {found} is high here at 95%. So we are good at catching fraud but bad at being precise about it.',
          onKeywordMissing:
            'That metric is called {expected} -- it measures how many real positives we successfully identified.',
        },
        {
          ai: 'Stakeholders want one number that balances both. What should I report to summarize the trade-off?',
          aiIt: 'Gli stakeholder vogliono un singolo numero che bilanci entrambi. Cosa dovrei riportare per riassumere il compromesso?',
          expectedKeywords: ['f1', 'f1 score'],
          hint: 'There is a harmonic mean of precision and recall used as a single summary metric.',
          hintIt:
            "C'e' una media armonica di precision e recall usata come singola metrica riassuntiva.",
          onKeywordFound:
            'The {found} is perfect for this -- it gives one balanced number stakeholders can compare across model versions.',
          onKeywordMissing:
            'Report the {expected} -- the harmonic mean of precision and recall, ideal for imbalanced datasets.',
        },
        {
          ai: 'Before we promote this model, what should we run on a separate dataset the model never saw during training?',
          aiIt: 'Prima di promuovere questo modello, cosa dovremmo eseguire su un dataset separato che il modello non ha mai visto durante il training?',
          expectedKeywords: ['evaluation', 'test set'],
          hint: 'You assess the model on held-out data to estimate real-world performance.',
          hintIt: 'Si valuta il modello su dati separati per stimare le prestazioni reali.',
          onKeywordFound:
            'Final {found} on the held-out test set is the gold standard before deployment.',
          onKeywordMissing:
            'We need a final {expected} on the held-out data to confirm the model generalizes.',
        },
        {
          ai: "Got it. I'll prepare the report and we'll review it tomorrow. Anything else to include?",
          aiIt: "Capito. Preparo il rapporto e lo rivediamo domani. Qualcos'altro da includere?",
          expectedKeywords: ['confusion matrix'],
          hint: 'A 2x2 table showing true/false positives and negatives gives a complete picture.',
          hintIt:
            'Una tabella 2x2 che mostra veri/falsi positivi e negativi da un quadro completo.',
          onKeywordFound: 'A {found} visualizes everything at once -- definitely include it.',
          onKeywordMissing:
            'Include a {expected} -- it visualizes true positives, false positives, true negatives and false negatives clearly.',
        },
      ],
      summary: {
        en: 'Practiced ML evaluation vocabulary: precision, recall, F1 score, evaluation, confusion matrix.',
        it: 'Praticato il vocabolario di valutazione ML: precision, recall, F1 score, valutazione, confusion matrix.',
      },
    },
    {
      id: 'ai-prompt-rag',
      title: 'Prompt Engineering for RAG',
      titleIt: 'Prompt Engineering per RAG',
      context: 'llm',
      difficulty: 2,
      turns: [
        {
          ai: 'Our RAG system is returning irrelevant docs. Before tweaking the prompt, what part of the pipeline turns text into vectors?',
          aiIt: 'Il nostro sistema RAG restituisce documenti irrilevanti. Prima di modificare il prompt, quale parte della pipeline trasforma il testo in vettori?',
          expectedKeywords: ['embedding'],
          hint: 'A dense vector representation of meaning produced by a model.',
          hintIt: 'Una rappresentazione vettoriale densa del significato prodotta da un modello.',
          onKeywordFound:
            'Right, the {found} model is the first place to inspect. A weak one will give you weak retrieval.',
          onKeywordMissing:
            "It's the {expected} model -- it converts text into dense vectors that represent semantic meaning.",
        },
        {
          ai: 'We use a strong model. Maybe the issue is how we split documents. What is each smaller piece called?',
          aiIt: "Usiamo un modello forte. Forse il problema e' come dividiamo i documenti. Come si chiama ogni pezzo piu' piccolo?",
          expectedKeywords: ['chunk'],
          hint: 'A small slice of a document, sized to fit context windows.',
          hintIt:
            'Una piccola porzione di documento, dimensionata per stare nella finestra di contesto.',
          onKeywordFound:
            'Yes, the {found} size matters a lot. Too big and you lose precision, too small and you lose context.',
          onKeywordMissing:
            'Each piece is a {expected} -- the way you split content drastically affects retrieval quality.',
        },
        {
          ai: "Let's say we fix chunking. The next step is fetching the most relevant pieces for a user query. What's that step called?",
          aiIt: "Diciamo che sistemiamo il chunking. Il passo successivo e' recuperare i pezzi piu' rilevanti per la query dell'utente. Come si chiama?",
          expectedKeywords: ['retrieval'],
          hint: 'The R in RAG stands for this.',
          hintIt: 'La R di RAG sta per questo.',
          onKeywordFound:
            'Exactly, {found} quality is the heart of any RAG. Vector similarity plus reranking usually works best.',
          onKeywordMissing:
            "That's the {expected} step -- the R in RAG, where we pull relevant chunks from the vector store.",
        },
        {
          ai: 'Now for the prompt. Should we just dump the chunks into the system message?',
          aiIt: 'Ora il prompt. Dovremmo solo mettere i chunk nel messaggio di sistema?',
          expectedKeywords: ['context', 'prompt'],
          hint: 'Think about how the LLM uses surrounding information at inference time.',
          hintIt: "Pensa a come il LLM usa le informazioni circostanti al momento dell'inferenza.",
          onKeywordFound:
            'Right, structure the {found} cleanly with delimiters and instructions to ground the answer.',
          onKeywordMissing:
            'We should structure the {expected} -- give the LLM clear instructions on how to use the retrieved chunks.',
        },
        {
          ai: "Last thing: how do we prevent hallucinations when the docs don't contain the answer?",
          aiIt: 'Ultima cosa: come preveniamo le allucinazioni quando i documenti non contengono la risposta?',
          expectedKeywords: ['grounding'],
          hint: 'Anchoring the model to the retrieved facts and instructing it to abstain otherwise.',
          hintIt: 'Ancorare il modello ai fatti recuperati e istruirlo ad astenersi altrimenti.',
          onKeywordFound:
            "Strong {found} plus an explicit 'say I don't know' instruction is the standard pattern.",
          onKeywordMissing:
            'We need {expected} -- instruct the model to only answer from retrieved context and refuse otherwise.',
        },
      ],
      summary: {
        en: 'Practiced RAG vocabulary: embedding, chunk, retrieval, context, prompt, grounding.',
        it: 'Praticato il vocabolario RAG: embedding, chunk, retrieval, contesto, prompt, grounding.',
      },
    },
    {
      id: 'ai-mlops-deployment',
      title: 'MLOps Deployment Debate',
      titleIt: 'Dibattito sul Deployment MLOps',
      context: 'mlops',
      difficulty: 3,
      turns: [
        {
          ai: 'We need to deploy v3 of the recommender. Before we ship, where should the artifact live so we can roll back?',
          aiIt: "Dobbiamo deployare la v3 del recommender. Prima di rilasciare, dove deve risiedere l'artefatto per poter fare rollback?",
          expectedKeywords: ['model registry', 'registry'],
          hint: 'A versioned store specifically for ML model artifacts.',
          hintIt: 'Uno store versionato specifico per gli artefatti dei modelli ML.',
          onKeywordFound:
            'Yes, the {found} gives us versioning, lineage, and easy rollback if v3 misbehaves.',
          onKeywordMissing:
            'Use the {expected} -- it stores versioned model artifacts with metadata for safe rollouts.',
        },
        {
          ai: "Once it's live, what should we watch for to catch the model degrading over time?",
          aiIt: 'Una volta in produzione, cosa dobbiamo controllare per accorgerci che il modello degrada nel tempo?',
          expectedKeywords: ['drift', 'data drift'],
          hint: 'When the input distribution at inference time diverges from training data.',
          hintIt:
            "Quando la distribuzione di input al momento dell'inferenza diverge dai dati di training.",
          onKeywordFound:
            'Right, {found} is the silent killer of production ML. We need automated alerts on it.',
          onKeywordMissing:
            'Watch for {expected} -- when production input distribution diverges from training data, accuracy quietly tanks.',
        },
        {
          ai: 'Sounds good. What broader practice covers tracking inputs, outputs, and predictions in production?',
          aiIt: "Va bene. Quale pratica piu' ampia copre il tracciamento di input, output e predizioni in produzione?",
          expectedKeywords: ['monitoring'],
          hint: 'The general observability practice for live models.',
          hintIt: "La pratica generale di osservabilita' per modelli in produzione.",
          onKeywordFound:
            'Exactly, {found} dashboards plus drift detectors give us a complete view.',
          onKeywordMissing:
            'We need {expected} -- continuous tracking of model inputs, outputs, latency and quality in prod.',
        },
        {
          ai: 'Should we ship to all users at once, or do something safer?',
          aiIt: "Rilasciamo a tutti gli utenti in una volta, o facciamo qualcosa di piu' sicuro?",
          expectedKeywords: ['canary', 'a/b test'],
          hint: 'Gradual rollout strategies that limit blast radius.',
          hintIt: "Strategie di rollout graduale che limitano il raggio d'impatto.",
          onKeywordFound:
            'A {found} rollout is exactly the right call -- 5% traffic first, then ramp if metrics hold.',
          onKeywordMissing:
            'Do a {expected} rollout -- send a small percentage first, compare against the baseline before full ramp.',
        },
        {
          ai: 'Last question: what tooling do we use for repeatable training runs?',
          aiIt: 'Ultima domanda: che strumenti usiamo per training run ripetibili?',
          expectedKeywords: ['pipeline'],
          hint: 'A defined sequence of training steps that can be replayed.',
          hintIt: 'Una sequenza definita di passi di training che puo essere rieseguita.',
          onKeywordFound:
            'Yes, a proper training {found} ensures reproducibility and makes drift retraining trivial.',
          onKeywordMissing:
            'We use a training {expected} -- a versioned, reproducible workflow for retraining and evaluation.',
        },
      ],
      summary: {
        en: 'Practiced MLOps vocabulary: model registry, drift, monitoring, canary, pipeline.',
        it: 'Praticato il vocabolario MLOps: model registry, drift, monitoring, canary, pipeline.',
      },
    },
    {
      id: 'ai-data-prep',
      title: 'ML Data Preparation Basics',
      titleIt: 'Basi di Preparazione Dati ML',
      context: 'training',
      difficulty: 1,
      turns: [
        {
          ai: "I'm new to ML. We have a CSV with house data and prices. What do we call the input columns we use to predict the price?",
          aiIt: 'Sono nuovo al ML. Abbiamo un CSV con dati di case e prezzi. Come chiamiamo le colonne di input che usiamo per predire il prezzo?',
          expectedKeywords: ['feature'],
          hint: 'Each input variable a model uses to make a prediction.',
          hintIt: 'Ogni variabile di input che il modello usa per fare una predizione.',
          onKeywordFound: 'Exactly, each {found} is one input -- size, bedrooms, location, etc.',
          onKeywordMissing:
            'Those are {expected} -- the input variables like square footage, number of rooms, etc.',
        },
        {
          ai: "Got it. And what's the column we want to predict, the price itself?",
          aiIt: 'Capito. E come si chiama la colonna che vogliamo predire, il prezzo stesso?',
          expectedKeywords: ['label', 'target'],
          hint: 'The output the model learns to produce -- the ground truth.',
          hintIt: "L'output che il modello impara a produrre -- la verita' di base.",
          onKeywordFound:
            'Right, the {found} is the ground truth value -- what we want the model to predict.',
          onKeywordMissing:
            "That's the {expected} -- the value the model learns to predict during training.",
        },
        {
          ai: "Before I train anything, I should divide the data into training and test groups. What's that operation called?",
          aiIt: 'Prima di trainare qualsiasi cosa, dovrei dividere i dati in gruppi di training e test. Come si chiama questa operazione?',
          expectedKeywords: ['split', 'train test split'],
          hint: 'Dividing your dataset so you can evaluate honestly.',
          hintIt: 'Dividere il dataset per poter valutare in modo onesto.',
          onKeywordFound:
            'Yes, a proper {found} -- typically 80/20 -- prevents you from fooling yourself with overfitting.',
          onKeywordMissing:
            "It's called a {expected} -- usually 80% for training and 20% for testing.",
        },
        {
          ai: "Some columns have missing values. What's the general process to fix data before training?",
          aiIt: "Alcune colonne hanno valori mancanti. Qual e' il processo generale per sistemare i dati prima del training?",
          expectedKeywords: ['preprocessing', 'cleaning'],
          hint: 'The umbrella term for cleaning, normalizing, and preparing data.',
          hintIt: 'Il termine generale per pulire, normalizzare e preparare i dati.',
          onKeywordFound:
            'Yes, {found} covers handling missing values, encoding categories, and scaling numbers.',
          onKeywordMissing:
            "It's {expected} -- handling nulls, scaling, encoding, all before the model sees the data.",
        },
        {
          ai: 'Sounds good. What kind of model would you start with for predicting a continuous number like price?',
          aiIt: 'Suona bene. Con che tipo di modello inizieresti per predire un numero continuo come il prezzo?',
          expectedKeywords: ['regression'],
          hint: 'The class of ML problems where output is a number, not a category.',
          hintIt: "La classe di problemi ML in cui l'output e' un numero, non una categoria.",
          onKeywordFound:
            'Perfect, a {found} model is exactly right for predicting continuous values.',
          onKeywordMissing:
            'Use a {expected} model -- the family of ML models that predict continuous numeric outputs.',
        },
      ],
      summary: {
        en: 'Practiced ML basics: feature, label, split, preprocessing, regression.',
        it: 'Praticato le basi ML: feature, label, split, preprocessing, regression.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  ETHICAL HACKING
  // ═══════════════════════════════════════════════════════
  'ethical-hacking': [
    {
      id: 'ethack-recon-plan',
      title: 'OSINT Reconnaissance Plan',
      titleIt: 'Piano di Ricognizione OSINT',
      context: 'recon',
      difficulty: 1,
      turns: [
        {
          ai: 'Hi, we just signed a pentest contract. Before any active scanning, what passive intelligence gathering should we start with?',
          aiIt: 'Ciao, abbiamo appena firmato un contratto di pentest. Prima di qualsiasi scansione attiva, da quale raccolta di intelligence passiva dovremmo iniziare?',
          expectedKeywords: ['osint'],
          hint: 'Open-source intelligence -- public information from web, social media, leaks.',
          hintIt: 'Open-source intelligence -- informazioni pubbliche da web, social media, leak.',
          onKeywordFound:
            'Right, {found} is the cheapest and stealthiest first step -- LinkedIn, GitHub, DNS records.',
          onKeywordMissing:
            'Start with {expected} -- gathering public info from search engines, social media, and leaked databases.',
        },
        {
          ai: "Good. The broader process of mapping the target's external surface is called what?",
          aiIt: "Bene. Il processo piu' ampio di mappare la superficie esterna del target come si chiama?",
          expectedKeywords: ['footprinting'],
          hint: 'The early phase where you build a profile of the target organization.',
          hintIt: "La fase iniziale in cui si costruisce un profilo dell'organizzazione target.",
          onKeywordFound:
            'Yes, {found} gives us a map of subdomains, IP ranges, and tech stacks before we touch anything.',
          onKeywordMissing:
            "It's called {expected} -- building a complete profile of the target's external surface.",
        },
        {
          ai: 'What do we call the system or organization we are authorized to test?',
          aiIt: "Come chiamiamo il sistema o l'organizzazione che siamo autorizzati a testare?",
          expectedKeywords: ['target', 'scope'],
          hint: 'The authorized object or boundary defined in the engagement letter.',
          hintIt: "L'oggetto o il confine autorizzato definito nella lettera d'incarico.",
          onKeywordFound:
            "Right, the {found} defines what's in bounds -- everything else is off-limits.",
          onKeywordMissing:
            "It's the {expected} -- the agreed boundary; touching anything outside is unauthorized access.",
        },
        {
          ai: "After OSINT we want to confirm which hosts are alive. What's the most basic active technique?",
          aiIt: "Dopo l'OSINT vogliamo confermare quali host sono attivi. Qual e' la tecnica attiva piu' basilare?",
          expectedKeywords: ['scan', 'port scan'],
          hint: 'Probing IP ranges and ports to enumerate exposed services.',
          hintIt: 'Sondare range IP e porte per enumerare i servizi esposti.',
          onKeywordFound:
            'Yes, a careful {found} with nmap reveals exposed services without being too noisy.',
          onKeywordMissing:
            'Run a {expected} -- nmap to enumerate hosts and exposed services, throttled to stay below detection.',
        },
        {
          ai: 'Last thing: what document defines exactly what we can and cannot do?',
          aiIt: 'Ultima cosa: quale documento definisce esattamente cosa possiamo e non possiamo fare?',
          expectedKeywords: ['rules of engagement', 'scope'],
          hint: 'The contract section that defines authorized targets, methods, and timing.',
          hintIt:
            'La sezione del contratto che definisce target autorizzati, metodi e tempistiche.',
          onKeywordFound: "Exactly, the {found} is our shield. Outside it, we're just attackers.",
          onKeywordMissing:
            'The {expected} document -- it spells out authorized targets, methods, and time windows.',
        },
      ],
      summary: {
        en: 'Practiced reconnaissance vocabulary: OSINT, footprinting, target, scan, rules of engagement.',
        it: 'Praticato il vocabolario di ricognizione: OSINT, footprinting, target, scan, rules of engagement.',
      },
    },
    {
      id: 'ethack-web-pentest',
      title: 'Web Pentest Finding',
      titleIt: 'Risultato di Pentest Web',
      context: 'webapp',
      difficulty: 2,
      turns: [
        {
          ai: "I just tested the search field on the client's app. When I sent ' OR 1=1 -- the page returned all records. What did I find?",
          aiIt: "Ho appena testato il campo di ricerca dell'app del cliente. Quando ho inviato ' OR 1=1 -- la pagina ha restituito tutti i record. Cosa ho trovato?",
          expectedKeywords: ['sql injection'],
          hint: 'A classic injection where attacker input is concatenated into a database query.',
          hintIt:
            "Un'iniezione classica dove l'input dell'attaccante viene concatenato in una query del database.",
          onKeywordFound:
            'Yes, classic {found}. We need to confirm impact and then write up the finding.',
          onKeywordMissing:
            "That's a textbook {expected} -- user input is being concatenated into the SQL query unsanitized.",
        },
        {
          ai: 'What do we call the malicious input string we used to trigger this?',
          aiIt: 'Come chiamiamo la stringa di input malevola che abbiamo usato per scatenare questo?',
          expectedKeywords: ['payload'],
          hint: 'The crafted input that triggers the vulnerability.',
          hintIt: "L'input costruito appositamente che scatena la vulnerabilita'.",
          onKeywordFound:
            'Right, our {found} was simple but effective. Document the exact string in the report.',
          onKeywordMissing:
            "It's the {expected} -- the crafted input that exploits the bug. Always include it in the PoC.",
        },
        {
          ai: 'How do we describe this finding in formal terms for the report?',
          aiIt: 'Come descriviamo questo risultato in termini formali per il report?',
          expectedKeywords: ['vulnerability'],
          hint: 'The general term for a security weakness in software.',
          hintIt: 'Il termine generale per una debolezza di sicurezza nel software.',
          onKeywordFound:
            "Right, we'll classify it as a critical {found} with full database read access.",
          onKeywordMissing:
            'Call it a {expected} -- a security weakness exploitable by an attacker, in this case allowing data disclosure.',
        },
        {
          ai: 'Could I escalate this further to access the OS?',
          aiIt: 'Potrei escalare ulteriormente per accedere al sistema operativo?',
          expectedKeywords: ['exploit', 'rce'],
          hint: 'Going from SQL injection to executing system commands on the server.',
          hintIt: 'Passare da SQL injection a eseguire comandi di sistema sul server.',
          onKeywordFound:
            'Possibly. If we can {found} stacked queries or xp_cmdshell, we get RCE -- huge severity bump.',
          onKeywordMissing:
            'Try to {expected} it further -- if the DB user is privileged we may pivot to RCE on the host.',
        },
        {
          ai: 'And what mitigation should we recommend to the developers?',
          aiIt: 'E quale mitigazione dovremmo raccomandare agli sviluppatori?',
          expectedKeywords: ['prepared statement', 'parameterized query', 'sanitize'],
          hint: 'The standard fix that separates user input from SQL code.',
          hintIt: "La correzione standard che separa l'input utente dal codice SQL.",
          onKeywordFound:
            'Exactly, {found} is the canonical fix. Plus input validation as defense in depth.',
          onKeywordMissing:
            "Recommend {expected} -- separating SQL code from data is the only real fix; sanitization alone isn't enough.",
        },
      ],
      summary: {
        en: 'Practiced web pentest vocabulary: SQL injection, payload, vulnerability, exploit, prepared statement.',
        it: 'Praticato il vocabolario di pentest web: SQL injection, payload, vulnerabilita, exploit, prepared statement.',
      },
    },
    {
      id: 'ethack-red-team',
      title: 'Red Team Engagement',
      titleIt: 'Ingaggio Red Team',
      context: 'red-team',
      difficulty: 3,
      turns: [
        {
          ai: 'We have an initial foothold via a phishing payload on a workstation. What infrastructure do we need to control the implant?',
          aiIt: "Abbiamo un punto d'appoggio iniziale tramite un payload di phishing su una workstation. Quale infrastruttura ci serve per controllare l'impianto?",
          expectedKeywords: ['c2', 'command and control'],
          hint: 'The server the implant beacons back to.',
          hintIt: "Il server a cui l'impianto invia beacon.",
          onKeywordFound:
            'Right, our {found} server with proper redirectors keeps the operation alive even if one node burns.',
          onKeywordMissing:
            'We need {expected} -- a hardened server the implant calls back to, ideally fronted by redirectors.',
        },
        {
          ai: 'Reboots will kill our shell. How do we make sure we keep access?',
          aiIt: "I reboot uccideranno la nostra shell. Come ci assicuriamo di mantenere l'accesso?",
          expectedKeywords: ['persistence'],
          hint: 'Mechanisms to survive reboots: scheduled tasks, registry run keys, services.',
          hintIt:
            'Meccanismi per sopravvivere ai reboot: scheduled task, registry run key, servizi.',
          onKeywordFound:
            'Yes, install {found} via a scheduled task or service -- nothing too noisy that EDR will catch.',
          onKeywordMissing:
            'We need {expected} -- a mechanism to re-establish our beacon after the host reboots.',
        },
        {
          ai: 'Now we want to reach the domain controller. What do we call moving from one host to another inside the network?',
          aiIt: "Ora vogliamo raggiungere il domain controller. Come chiamiamo il movimento da un host all'altro dentro la rete?",
          expectedKeywords: ['lateral movement'],
          hint: 'Hopping between systems using stolen creds, tickets, or pass-the-hash.',
          hintIt: 'Saltare tra sistemi usando credenziali rubate, ticket, o pass-the-hash.',
          onKeywordFound:
            'Exactly, {found} via PsExec or WMI is classic. We should mix techniques to avoid pattern detection.',
          onKeywordMissing:
            "It's called {expected} -- moving sideways through the network with stolen credentials or tokens.",
        },
        {
          ai: "Once we hit a higher-privilege account, what's the goal?",
          aiIt: "Una volta che arriviamo a un account con privilegi piu' alti, qual e' l'obiettivo?",
          expectedKeywords: ['privilege escalation', 'escalation'],
          hint: 'Going from a low-privilege user to admin or SYSTEM/root.',
          hintIt: 'Passare da utente a basso privilegio ad admin o SYSTEM/root.',
          onKeywordFound:
            'Right, {found} to domain admin is the typical objective in an AD environment.',
          onKeywordMissing:
            'We aim for {expected} -- raising privileges to local admin and ultimately domain admin.',
        },
        {
          ai: "Final stage: we want to demonstrate impact. What's the technical term for stealing data out of the network?",
          aiIt: "Fase finale: vogliamo dimostrare l'impatto. Qual e' il termine tecnico per rubare dati dalla rete?",
          expectedKeywords: ['exfiltration'],
          hint: 'Sending data out via DNS, HTTPS, or covert channels.',
          hintIt: 'Inviare dati fuori via DNS, HTTPS, o canali covert.',
          onKeywordFound:
            'Yes, controlled {found} of a small file proves impact without harming production data.',
          onKeywordMissing:
            "It's {expected} -- carefully demonstrate it with non-sensitive sample data over an allowed channel.",
        },
      ],
      summary: {
        en: 'Practiced red team vocabulary: C2, persistence, lateral movement, privilege escalation, exfiltration.',
        it: 'Praticato il vocabolario red team: C2, persistence, lateral movement, privilege escalation, exfiltration.',
      },
    },
    {
      id: 'ethack-reporting',
      title: 'Reporting Client Findings',
      titleIt: 'Reporting dei Risultati al Cliente',
      context: 'reporting',
      difficulty: 2,
      turns: [
        {
          ai: "I'm writing up the SQL injection finding. How do I quantify how bad it is?",
          aiIt: "Sto scrivendo il finding sulla SQL injection. Come quantifico quanto e' grave?",
          expectedKeywords: ['severity'],
          hint: 'A numeric or labeled rating like critical/high/medium/low, often using CVSS.',
          hintIt:
            'Una valutazione numerica o etichettata come critical/high/medium/low, spesso via CVSS.',
          onKeywordFound:
            'Right, assign a {found} of Critical with the CVSS score, plus business impact context.',
          onKeywordMissing:
            'Assign a {expected} -- typically Critical/High/Medium/Low, justified with a CVSS score.',
        },
        {
          ai: 'The client will ask for evidence we actually pulled this off. What do we attach?',
          aiIt: "Il cliente chiedera' la prova che ci siamo davvero riusciti. Cosa alleghiamo?",
          expectedKeywords: ['poc', 'proof of concept'],
          hint: 'A reproducible demonstration the bug exists -- requests, screenshots, code.',
          hintIt:
            'Una dimostrazione riproducibile che il bug esiste -- richieste, screenshot, codice.',
          onKeywordFound:
            'Right, a clean {found} with HTTP requests and screenshots makes denial impossible.',
          onKeywordMissing:
            'Include a {expected} -- reproducible HTTP requests, screenshots, and a redacted database row as evidence.',
        },
        {
          ai: 'What section tells the developers how to fix it?',
          aiIt: 'Quale sezione dice agli sviluppatori come sistemarlo?',
          expectedKeywords: ['remediation'],
          hint: 'The actionable fix recommendation for engineers.',
          hintIt: 'La raccomandazione di fix attuabile per gli ingegneri.',
          onKeywordFound:
            'Yes, the {found} section -- specific, actionable guidance with code examples is best.',
          onKeywordMissing:
            "It's the {expected} section -- specific actionable steps developers can take to close the gap.",
        },
        {
          ai: 'Should we just hand them the report and walk away?',
          aiIt: 'Dovremmo solo consegnare il report e andarcene?',
          expectedKeywords: ['debrief', 'walkthrough'],
          hint: 'A meeting where you walk the client through findings live.',
          hintIt: 'Una riunione in cui si guida il cliente attraverso i risultati dal vivo.',
          onKeywordFound:
            'No, schedule a {found} call -- the live walkthrough is where the real value lands.',
          onKeywordMissing:
            'Schedule a {expected} -- a live session where you walk the client through findings interactively.',
        },
        {
          ai: 'After the fix, what should we do to confirm the issue is really gone?',
          aiIt: 'Dopo il fix, cosa dobbiamo fare per confermare che il problema sia davvero sparito?',
          expectedKeywords: ['retest', 'verification'],
          hint: 'Re-testing the same bug after the developer claims it is patched.',
          hintIt: 'Ritestare lo stesso bug dopo che lo sviluppatore dichiara che e patchato.',
          onKeywordFound:
            'Exactly, perform a {found} of every finding before closing the engagement.',
          onKeywordMissing:
            "We do a {expected} -- repeat the exact PoC after the patch to confirm it's actually fixed.",
        },
      ],
      summary: {
        en: 'Practiced pentest reporting vocabulary: severity, PoC, remediation, debrief, retest.',
        it: 'Praticato il vocabolario di reporting pentest: severity, PoC, remediation, debrief, retest.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  DOCKER & KUBERNETES
  // ═══════════════════════════════════════════════════════
  'docker-k8s': [
    {
      id: 'dk-containerize-app',
      title: 'Containerizing a Legacy App',
      titleIt: 'Containerizzare una App Legacy',
      context: 'docker',
      difficulty: 1,
      turns: [
        {
          ai: 'We need to containerize this old Python service. What file describes how to build the container?',
          aiIt: 'Dobbiamo containerizzare questo vecchio servizio Python. Quale file descrive come costruire il container?',
          expectedKeywords: ['dockerfile'],
          hint: 'A text file with instructions like FROM, RUN, COPY.',
          hintIt: 'Un file di testo con istruzioni come FROM, RUN, COPY.',
          onKeywordFound:
            'Right, the {found} is the recipe. Start with FROM python:3.12-slim and go from there.',
          onKeywordMissing:
            "It's a {expected} -- a recipe file with FROM, COPY, RUN, CMD instructions.",
        },
        {
          ai: 'Once we build it, what do we call the immutable artifact we get?',
          aiIt: "Una volta costruito, come chiamiamo l'artefatto immutabile che otteniamo?",
          expectedKeywords: ['image'],
          hint: 'The packaged result -- a snapshot you can run anywhere.',
          hintIt: 'Il risultato pacchettizzato -- una snapshot che puoi eseguire ovunque.',
          onKeywordFound:
            'Yes, the {found} is what we push to the registry and pull from anywhere.',
          onKeywordMissing:
            "It's an {expected} -- the immutable build artifact that becomes a running container.",
        },
        {
          ai: "Each instruction in the Dockerfile creates one of these stacked, cacheable units. What's it called?",
          aiIt: "Ogni istruzione nel Dockerfile crea una di queste unita' impilate e cacheable. Come si chiama?",
          expectedKeywords: ['layer'],
          hint: 'A read-only filesystem diff cached between builds.',
          hintIt: 'Un diff del filesystem read-only cachato tra le build.',
          onKeywordFound:
            'Right, each {found} is cached, so order your COPY and RUN steps to maximize cache hits.',
          onKeywordMissing:
            "It's a {expected} -- order your Dockerfile to maximize cache reuse on these.",
        },
        {
          ai: 'What command actually starts the container from the image?',
          aiIt: "Quale comando avvia effettivamente il container dall'immagine?",
          expectedKeywords: ['docker run', 'run'],
          hint: 'The CLI subcommand that turns an image into a running container.',
          hintIt: "Il sottocomando CLI che trasforma un'immagine in un container in esecuzione.",
          onKeywordFound: "Yes, {found} with -p for ports and -e for env vars and you're up.",
          onKeywordMissing:
            'Use {expected} -- the basic command to start a container from an image.',
        },
        {
          ai: 'Lastly, where do we publish the image so the team can pull it?',
          aiIt: "Infine, dove pubblichiamo l'immagine cosi' il team puo' farne pull?",
          expectedKeywords: ['registry'],
          hint: 'A server that stores images, like Docker Hub, ECR, or GHCR.',
          hintIt: 'Un server che memorizza immagini, come Docker Hub, ECR o GHCR.',
          onKeywordFound: 'Right, push to our private {found} so CI/CD can pull it during deploys.',
          onKeywordMissing: 'Push to a {expected} -- Docker Hub, ECR, GHCR -- whichever you use.',
        },
      ],
      summary: {
        en: 'Practiced Docker basics: Dockerfile, image, layer, docker run, registry.',
        it: 'Praticato le basi Docker: Dockerfile, image, layer, docker run, registry.',
      },
    },
    {
      id: 'dk-pod-debug',
      title: 'Debugging a Failing Pod',
      titleIt: 'Debug di un Pod che Fallisce',
      context: 'kubernetes',
      difficulty: 2,
      turns: [
        {
          ai: 'Our payments pod is in CrashLoopBackOff. What command do you usually start with?',
          aiIt: "Il nostro pod payments e' in CrashLoopBackOff. Con quale comando inizi di solito?",
          expectedKeywords: ['kubectl'],
          hint: 'The Kubernetes CLI used for almost everything.',
          hintIt: 'Il CLI di Kubernetes usato per quasi tutto.',
          onKeywordFound: 'Right, {found} get pods and describe pod first to see events.',
          onKeywordMissing:
            'Use {expected} -- the canonical CLI; start with get pods and describe pod.',
        },
        {
          ai: 'Describe shows the container exited. How do we see why the app crashed?',
          aiIt: "Describe mostra che il container e' uscito. Come vediamo perche' l'app e' andata in crash?",
          expectedKeywords: ['logs'],
          hint: 'The stdout/stderr stream from the container.',
          hintIt: 'Lo stream stdout/stderr del container.',
          onKeywordFound:
            'Yes, kubectl {found} -p for the previous instance shows the crash reason.',
          onKeywordMissing:
            'Pull the {expected} -- kubectl logs -p to see output from the previous crashed instance.',
        },
        {
          ai: "We don't see this pod in the default workspace. Where else might it be?",
          aiIt: 'Non vediamo questo pod nel workspace di default. Dove altro potrebbe essere?',
          expectedKeywords: ['namespace'],
          hint: 'A virtual cluster scope used to isolate workloads.',
          hintIt: 'Uno scope virtuale del cluster usato per isolare i workload.',
          onKeywordFound:
            'Right, the payments pod is in the payments {found}. Add -n payments to commands.',
          onKeywordMissing: 'Check the right {expected} -- workloads can be scoped with -n flag.',
        },
        {
          ai: "Logs say it can't reach the database. How can we test connectivity from inside the pod?",
          aiIt: "I log dicono che non riesce a raggiungere il database. Come possiamo testare la connettivita' dall'interno del pod?",
          expectedKeywords: ['exec'],
          hint: 'A kubectl subcommand that runs a command inside a container.',
          hintIt: 'Un sottocomando kubectl che esegue un comando dentro un container.",',
          onKeywordFound:
            'Yes, kubectl {found} -it pod -- sh and try curl or nslookup against the DB service.',
          onKeywordMissing:
            'Use kubectl {expected} -- it lets you run commands or open a shell inside the running container.',
        },
        {
          ai: 'Turns out a config value was wrong. How should we feed configuration into the pod cleanly?',
          aiIt: 'Si scopre che un valore di config era sbagliato. Come dovremmo passare la configurazione al pod in modo pulito?',
          expectedKeywords: ['configmap', 'secret'],
          hint: 'Kubernetes objects for configuration and credentials, mounted as env or files.',
          hintIt: 'Oggetti Kubernetes per configurazione e credenziali, montati come env o file.',
          onKeywordFound:
            'Right, mount a {found} -- non-sensitive data in ConfigMap, secrets in Secret.',
          onKeywordMissing:
            'Use a {expected} -- ConfigMap for plain config, Secret for credentials, mounted as env or volume.',
        },
      ],
      summary: {
        en: 'Practiced K8s debugging: kubectl, logs, namespace, exec, ConfigMap.',
        it: 'Praticato debug K8s: kubectl, logs, namespace, exec, ConfigMap.',
      },
    },
    {
      id: 'dk-helm-rollout',
      title: 'Helm Release Rollout',
      titleIt: 'Rollout di una Release Helm',
      context: 'helm',
      difficulty: 2,
      turns: [
        {
          ai: "Marketing wants the new landing-page service in staging today. We use Helm. What's the packaged unit we deploy called?",
          aiIt: "Il marketing vuole il nuovo servizio landing-page in staging oggi. Usiamo Helm. Come si chiama l'unita' pacchettizzata che deployamo?",
          expectedKeywords: ['chart'],
          hint: 'A Helm package containing templated YAML and metadata.',
          hintIt: 'Un pacchetto Helm contenente YAML templati e metadata.',
          onKeywordFound:
            'Right, the {found} bundles all manifests with templating. Versioned and reusable.',
          onKeywordMissing:
            "It's a {expected} -- a versioned Helm package with templated manifests.",
        },
        {
          ai: 'Where do we override settings like image tag and replica count per environment?',
          aiIt: 'Dove sovrascriviamo impostazioni come image tag e numero di repliche per ambiente?',
          expectedKeywords: ['values'],
          hint: 'A YAML file feeding variables into chart templates.',
          hintIt: 'Un file YAML che alimenta variabili nei template del chart.',
          onKeywordFound:
            'Yes, {found}.yaml per environment is the standard pattern. Keep them in git.',
          onKeywordMissing:
            'In a {expected} file -- typically values-staging.yaml and values-prod.yaml.',
        },
        {
          ai: "When we deploy, what's the named running instance of the chart called?",
          aiIt: "Quando deployamo, come si chiama l'istanza nominata del chart in esecuzione?",
          expectedKeywords: ['release'],
          hint: 'A specific install of a chart with a name and history.',
          hintIt: "Un'installazione specifica di un chart con un nome e una storia.",
          onKeywordFound:
            'Right, each {found} has a name and history -- helm rollback by revision is gold.',
          onKeywordMissing:
            "It's a {expected} -- a named install with full revision history for rollback.",
        },
        {
          ai: 'Something looks broken in the new revision. How do we go back?',
          aiIt: 'Qualcosa sembra rotto nella nuova revision. Come torniamo indietro?',
          expectedKeywords: ['rollback'],
          hint: 'The Helm command to revert to a previous revision.',
          hintIt: 'Il comando Helm per tornare a una revision precedente.',
          onKeywordFound:
            "Right, helm {found} <release> <revision> and we're back to the last good state.",
          onKeywordMissing:
            'Run a {expected} -- helm rollback brings us back to a previous revision instantly.',
        },
        {
          ai: 'Before deploying we want to see what manifests Helm will actually produce. What flag helps?',
          aiIt: "Prima di deployare vogliamo vedere quali manifest Helm produrra' davvero. Quale flag aiuta?",
          expectedKeywords: ['template', 'dry-run'],
          hint: 'A way to render the chart locally without applying.',
          hintIt: 'Un modo per renderizzare il chart localmente senza applicare.',
          onKeywordFound:
            'Yes, helm {found} renders manifests locally so we can review before applying.',
          onKeywordMissing:
            'Use helm {expected} or --dry-run -- both render the manifests for review without applying.',
        },
      ],
      summary: {
        en: 'Practiced Helm vocabulary: chart, values, release, rollback, template.',
        it: 'Praticato il vocabolario Helm: chart, values, release, rollback, template.',
      },
    },
    {
      id: 'dk-cluster-issue',
      title: 'Production Cluster Issue',
      titleIt: 'Problema sul Cluster in Produzione',
      context: 'incident',
      difficulty: 3,
      turns: [
        {
          ai: "We're getting paged -- pods are being killed across the cluster during peak load. What could be evicting them?",
          aiIt: 'Siamo in pager -- i pod vengono killati nel cluster durante il picco di carico. Cosa potrebbe sfrattarli?',
          expectedKeywords: ['eviction', 'node pressure'],
          hint: 'Kubernetes proactively kills pods when nodes run low on resources.',
          hintIt: 'Kubernetes uccide proattivamente pod quando i nodi esauriscono risorse.',
          onKeywordFound:
            'Right, {found} due to memory pressure. Check kubectl top node and event logs.',
          onKeywordMissing:
            "It's pod {expected} caused by node pressure -- the kubelet kills pods when memory or disk is low.",
        },
        {
          ai: "We had auto-scaling configured. What's the controller that scales pods based on CPU/memory?",
          aiIt: "Avevamo l'auto-scaling configurato. Qual e' il controller che scala i pod in base a CPU/memoria?",
          expectedKeywords: ['hpa', 'horizontal pod autoscaler'],
          hint: 'Horizontal Pod Autoscaler -- adjusts replica count based on metrics.',
          hintIt:
            'Horizontal Pod Autoscaler -- regola il numero di repliche in base alle metriche.',
          onKeywordFound:
            'Right, the {found} should scale before pressure hits, but it needs metrics-server working.',
          onKeywordMissing:
            "It's the {expected} -- adjusts replica count based on CPU/memory targets.",
        },
        {
          ai: 'If pods scale but nodes are saturated, who scales the underlying nodes?',
          aiIt: 'Se i pod scalano ma i nodi sono saturi, chi scala i nodi sottostanti?',
          expectedKeywords: ['cluster autoscaler', 'autoscaler'],
          hint: 'A controller that adds or removes nodes based on unschedulable pods.',
          hintIt: 'Un controller che aggiunge o rimuove nodi in base a pod non schedulabili.',
          onKeywordFound:
            "Right, {found} adds nodes when pods can't be scheduled. Verify it's healthy.",
          onKeywordMissing:
            "The {expected} adds nodes when pods can't fit anywhere -- check it's running and authorized.",
        },
        {
          ai: "We need to ensure critical pods aren't evicted first. What field controls priority?",
          aiIt: "Dobbiamo assicurarci che i pod critici non siano sfrattati per primi. Quale campo controlla la priorita'?",
          expectedKeywords: ['priorityclass', 'priority'],
          hint: 'A Kubernetes object that ranks pods for eviction order.',
          hintIt: 'Un oggetto Kubernetes che classifica i pod per ordine di sfratto.',
          onKeywordFound:
            'Yes, set a high-priority {found} on payments and auth pods so they survive pressure.',
          onKeywordMissing:
            "Use a {expected} -- assign higher priority to critical pods so they're evicted last.",
        },
        {
          ai: 'Last question: how do we make sure pods always request enough resources to schedule reliably?',
          aiIt: 'Ultima domanda: come ci assicuriamo che i pod richiedano sempre abbastanza risorse per essere schedulati in modo affidabile?',
          expectedKeywords: ['resource requests', 'requests', 'limits'],
          hint: 'Pod-level CPU and memory requests/limits.',
          hintIt: 'Requests/limits di CPU e memoria a livello di pod.',
          onKeywordFound:
            'Right, accurate {found} are non-negotiable in prod -- they drive scheduling and OOM behavior.',
          onKeywordMissing:
            'Set proper {expected} -- requests for scheduling, limits for OOM ceilings.',
        },
      ],
      summary: {
        en: 'Practiced cluster ops vocabulary: eviction, HPA, cluster autoscaler, PriorityClass, requests.',
        it: 'Praticato il vocabolario cluster ops: eviction, HPA, cluster autoscaler, PriorityClass, requests.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  SYSTEM MONITORING
  // ═══════════════════════════════════════════════════════
  'system-monitoring': [
    {
      id: 'mon-grafana-setup',
      title: 'Setting Up a Grafana Dashboard',
      titleIt: 'Configurare una Dashboard Grafana',
      context: 'observability',
      difficulty: 1,
      turns: [
        {
          ai: 'Hi, the team asked me to build a dashboard for our API service. What tool do most teams use to visualize metrics?',
          aiIt: 'Ciao, il team mi ha chiesto di costruire una dashboard per il nostro servizio API. Quale strumento usano la maggior parte dei team per visualizzare metriche?',
          expectedKeywords: ['grafana'],
          hint: 'The de-facto open-source visualization tool for metrics.',
          hintIt: 'Lo strumento di visualizzazione open-source de-facto per le metriche.',
          onKeywordFound:
            'Right, {found} is the standard. It pairs perfectly with Prometheus or Loki.',
          onKeywordMissing:
            "Use {expected} -- it's the de-facto dashboard tool, hooks into Prometheus, Loki, and dozens more.",
        },
        {
          ai: 'Inside a dashboard, what do we call each individual chart or graph?',
          aiIt: 'Dentro una dashboard, come chiamiamo ogni singolo grafico?',
          expectedKeywords: ['panel'],
          hint: 'A single visual block within a dashboard.',
          hintIt: 'Un singolo blocco visuale dentro una dashboard.',
          onKeywordFound:
            'Yes, each {found} shows one query. Group related ones with rows for clarity.',
          onKeywordMissing:
            'Each chart is a {expected} -- one query per panel, organized in rows by topic.',
        },
        {
          ai: 'Each panel is driven by what?',
          aiIt: "Ogni panel e' guidato da cosa?",
          expectedKeywords: ['query'],
          hint: 'A request that fetches data from the time-series database.',
          hintIt: 'Una richiesta che recupera dati dal time-series database.',
          onKeywordFound:
            'Right, the {found} pulls the data from Prometheus or whichever data source we set.',
          onKeywordMissing:
            'A {expected} -- a PromQL or LogQL expression fetching data from the data source.',
        },
        {
          ai: 'Where do those metrics actually come from?',
          aiIt: 'Da dove vengono effettivamente quelle metriche?',
          expectedKeywords: ['prometheus', 'data source'],
          hint: 'The time-series database that scrapes and stores metrics.',
          hintIt: 'Il time-series database che scrape e memorizza le metriche.',
          onKeywordFound:
            'Yes, {found} scrapes /metrics endpoints and stores the time series we query.',
          onKeywordMissing:
            "From {expected} -- it scrapes our services' /metrics endpoint and stores the time series.",
        },
        {
          ai: 'Last thing: I want users to filter by region or service. What feature do we add to the dashboard?',
          aiIt: "Ultima cosa: voglio che gli utenti filtrino per regione o servizio. Quale funzionalita' aggiungiamo alla dashboard?",
          expectedKeywords: ['variable', 'template variable'],
          hint: 'A dropdown that parameterizes panel queries.',
          hintIt: 'Un dropdown che parametrizza le query dei panel.',
          onKeywordFound:
            'Right, a {found} makes the dashboard reusable across regions and environments.',
          onKeywordMissing:
            'Add a {expected} -- a dropdown that filters panels dynamically by label.',
        },
      ],
      summary: {
        en: 'Practiced dashboard vocabulary: Grafana, panel, query, Prometheus, variable.',
        it: 'Praticato vocabolario dashboard: Grafana, panel, query, Prometheus, variable.',
      },
    },
    {
      id: 'mon-promql-alert',
      title: 'PromQL Alert Design',
      titleIt: 'Design di un Alert PromQL',
      context: 'alerting',
      difficulty: 2,
      turns: [
        {
          ai: 'Need an alert when our API errors spike. What PromQL function gives per-second error growth?',
          aiIt: "Mi serve un alert quando gli errori dell'API impennano. Quale funzione PromQL da' la crescita per secondo degli errori?",
          expectedKeywords: ['rate'],
          hint: 'A function that calculates per-second average over a counter.',
          hintIt: 'Una funzione che calcola la media per secondo su un counter.',
          onKeywordFound:
            'Right, {found}(http_errors_total[5m]) gives errors per second over the last 5 minutes.',
          onKeywordMissing:
            'Use {expected} -- rate(metric[5m]) gives the per-second average increase of a counter.',
        },
        {
          ai: "We need to fire only when the rate is high enough. What's the boundary value called?",
          aiIt: "Dobbiamo scattare solo quando il rate e' abbastanza alto. Come si chiama il valore di confine?",
          expectedKeywords: ['threshold'],
          hint: 'The numeric cutoff that triggers an alert.',
          hintIt: 'Il limite numerico che fa scattare un alert.',
          onKeywordFound:
            'Yes, set a {found} above normal traffic noise -- 1% of total requests is a starting point.',
          onKeywordMissing:
            "It's the {expected} -- the cutoff above normal noise where the rule starts firing.",
        },
        {
          ai: "What's the YAML object Prometheus needs to actually evaluate this condition periodically?",
          aiIt: "Qual e' l'oggetto YAML che Prometheus serve per valutare effettivamente questa condizione periodicamente?",
          expectedKeywords: ['alert', 'alerting rule'],
          hint: 'A Prometheus rule with expr, for, labels, annotations.',
          hintIt: 'Una rule Prometheus con expr, for, labels, annotations.',
          onKeywordFound:
            'Right, an {found} rule with expr, for: 5m, severity label, and an annotation for the runbook.',
          onKeywordMissing:
            "It's an {expected} rule -- expr, for, labels, annotations all in a YAML rule file.",
        },
        {
          ai: "We don't want a 1-second blip to wake people. What field controls minimum duration?",
          aiIt: 'Non vogliamo che un blip di 1 secondo svegli le persone. Quale campo controlla la durata minima?',
          expectedKeywords: ['for'],
          hint: 'The duration the condition must hold before firing.',
          hintIt: 'La durata per cui la condizione deve persistere prima di scattare.',
          onKeywordFound:
            'Yes, {found}: 5m means it must stay above threshold for 5 minutes before paging anyone.',
          onKeywordMissing:
            'Use the {expected} field -- it sets how long the condition must persist before firing.',
        },
        {
          ai: 'Last bit: what component routes alerts to Slack and PagerDuty?',
          aiIt: 'Ultima cosa: quale componente instrada gli alert verso Slack e PagerDuty?',
          expectedKeywords: ['alertmanager'],
          hint: 'The Prometheus companion service that handles routing and silencing.',
          hintIt: 'Il servizio companion di Prometheus che gestisce routing e silenziamento.',
          onKeywordFound:
            'Right, {found} routes by labels and supports grouping, silences, and inhibitions.',
          onKeywordMissing:
            "It's {expected} -- routes alerts by labels to Slack, email, PagerDuty, and supports silences.",
        },
      ],
      summary: {
        en: 'Practiced alerting vocabulary: rate, threshold, alert rule, for, Alertmanager.',
        it: 'Praticato il vocabolario di alerting: rate, threshold, alert rule, for, Alertmanager.',
      },
    },
    {
      id: 'mon-postmortem',
      title: 'Incident Postmortem',
      titleIt: 'Postmortem di un Incidente',
      context: 'postmortem',
      difficulty: 3,
      turns: [
        {
          ai: "The checkout outage is over. To run a good postmortem, what's the metric describing how long until service was restored?",
          aiIt: "L'outage del checkout e' finito. Per fare un buon postmortem, qual e' la metrica che descrive quanto tempo ci e' voluto a ripristinare il servizio?",
          expectedKeywords: ['mttr', 'mean time to recovery'],
          hint: 'Mean Time To Recovery -- a key SRE indicator.',
          hintIt: 'Mean Time To Recovery -- un indicatore SRE chiave.',
          onKeywordFound:
            'Right, our {found} this time was 47 minutes -- a baseline for the action items.',
          onKeywordMissing:
            "It's the {expected} -- mean time to recovery, the SRE staple for tracking how fast we restore.",
        },
        {
          ai: 'What document should we have had ready that walks the on-call through what to do?',
          aiIt: "Quale documento avremmo dovuto avere pronto che guida l'on-call su cosa fare?",
          expectedKeywords: ['runbook', 'playbook'],
          hint: 'A pre-written guide for handling specific alerts.',
          hintIt: 'Una guida prescritta per gestire alert specifici.',
          onKeywordFound:
            'Yes, a {found} for the database failover would have shaved 20 minutes off MTTR.',
          onKeywordMissing:
            'We needed a {expected} -- a step-by-step procedure linked from the alert.',
        },
        {
          ai: "We need to find the deepest underlying cause. What's that called in postmortem language?",
          aiIt: "Dobbiamo trovare la causa sottostante piu' profonda. Come si chiama nel linguaggio del postmortem?",
          expectedKeywords: ['root cause'],
          hint: 'The fundamental reason the failure occurred, not just the trigger.',
          hintIt: 'La ragione fondamentale per cui il fallimento e accaduto, non solo il trigger.',
          onKeywordFound:
            'Right, the {found} was a missing connection-pool limit, not the deploy itself.',
          onKeywordMissing:
            "It's the {expected} -- the deepest underlying issue, found by repeated 'why?'.",
        },
        {
          ai: 'How do we make sure this never happens again, formally?',
          aiIt: "Come ci assicuriamo che non riaccada mai piu', formalmente?",
          expectedKeywords: ['action items', 'remediation'],
          hint: 'Concrete tasks with owners and deadlines tracked from the postmortem.',
          hintIt: 'Task concreti con owner e scadenze tracciati dal postmortem.',
          onKeywordFound:
            'Right, {found} with owners and due dates -- and we track them to completion.',
          onKeywordMissing:
            'Track {expected} -- specific tasks with owners and dates that close out the postmortem.',
        },
        {
          ai: 'How do we make sure the postmortem culture stays healthy and people speak up?',
          aiIt: 'Come ci assicuriamo che la cultura del postmortem rimanga sana e le persone parlino?',
          expectedKeywords: ['blameless'],
          hint: 'A postmortem culture focused on systems, not individuals.',
          hintIt: 'Una cultura del postmortem focalizzata sui sistemi, non sugli individui.',
          onKeywordFound:
            'Yes, a strict {found} approach -- focus on systems, not people. Trust enables learning.',
          onKeywordMissing:
            'Be strictly {expected} -- focus on systems and processes, never on the person who pushed the button.',
        },
      ],
      summary: {
        en: 'Practiced postmortem vocabulary: MTTR, runbook, root cause, action items, blameless.',
        it: 'Praticato il vocabolario del postmortem: MTTR, runbook, root cause, action items, blameless.',
      },
    },
    {
      id: 'mon-slo-discussion',
      title: 'SLO Discussion',
      titleIt: 'Discussione sugli SLO',
      context: 'reliability',
      difficulty: 2,
      turns: [
        {
          ai: "We need to define reliability targets for the search API. What's the metric we measure -- like latency or success rate?",
          aiIt: "Dobbiamo definire target di affidabilita' per l'API di ricerca. Qual e' la metrica che misuriamo -- come latenza o tasso di successo?",
          expectedKeywords: ['sli', 'service level indicator'],
          hint: 'Service Level Indicator -- the actual measured metric.',
          hintIt: 'Service Level Indicator -- la metrica realmente misurata.',
          onKeywordFound: "Right, our {found} is 'p99 latency under 300ms'. Measurable and clear.",
          onKeywordMissing:
            "It's an {expected} -- the measurable metric like p99 latency or success ratio.",
        },
        {
          ai: 'And the target value we commit to internally for that metric is called what?',
          aiIt: 'E il valore target che ci impegniamo a rispettare internamente per quella metrica come si chiama?',
          expectedKeywords: ['slo', 'service level objective'],
          hint: 'The internal target -- a Service Level Objective.',
          hintIt: 'Il target interno -- un Service Level Objective.',
          onKeywordFound:
            'Yes, our {found} is 99.9% over a 28-day window. That guides our engineering choices.',
          onKeywordMissing:
            "It's the {expected} -- our internal commitment, e.g., 99.9% over 28 days.",
        },
        {
          ai: 'If our SLO is 99.9%, how much downtime can we burn through and still meet it?',
          aiIt: "Se il nostro SLO e' 99.9%, quanto downtime possiamo bruciare e ancora rispettarlo?",
          expectedKeywords: ['error budget'],
          hint: 'The allowable amount of unreliability before breaking the SLO.",',
          hintIt: "L'ammontare di inaffidabilita' ammissibile prima di rompere lo SLO.",
          onKeywordFound:
            "Right, the {found} is the 0.1% we can spend. When it's gone, we freeze risky changes.",
          onKeywordMissing:
            "It's our {expected} -- the 0.1% of allowable unreliability before we must freeze risky deploys.",
        },
        {
          ai: 'What broader concept describes the percentage of time the service is up?',
          aiIt: "Quale concetto piu' ampio descrive la percentuale di tempo in cui il servizio e' up?",
          expectedKeywords: ['availability'],
          hint: 'The classic uptime measure expressed as a percentage.',
          hintIt: 'La classica misura di uptime espressa come percentuale.',
          onKeywordFound:
            'Right, {found} is the headline metric stakeholders see. SLO formalizes it.',
          onKeywordMissing: "It's {expected} -- the percentage of successful service over time.",
        },
        {
          ai: 'If we sign a contract with a customer promising reliability, what document is that?',
          aiIt: "Se firmiamo un contratto con un cliente promettendo affidabilita', che documento e'?",
          expectedKeywords: ['sla', 'service level agreement'],
          hint: 'The contractual external commitment with penalties.',
          hintIt: "L'impegno contrattuale esterno con penali.",
          onKeywordFound:
            'Right, the {found} sets penalties if breached -- always looser than internal SLOs.',
          onKeywordMissing:
            "It's an {expected} -- the external contract, with credits or penalties when missed.",
        },
      ],
      summary: {
        en: 'Practiced SRE vocabulary: SLI, SLO, error budget, availability, SLA.',
        it: 'Praticato il vocabolario SRE: SLI, SLO, error budget, availability, SLA.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  DEVSECOPS
  // ═══════════════════════════════════════════════════════
  devsecops: [
    {
      id: 'dso-pipeline-gate',
      title: 'Pipeline Security Gate',
      titleIt: 'Gate di Sicurezza nella Pipeline',
      context: 'pipeline',
      difficulty: 2,
      turns: [
        {
          ai: 'We want to block insecure code from merging. What kind of scan analyzes source code statically for vulnerabilities?',
          aiIt: "Vogliamo bloccare il codice insicuro dal merge. Quale tipo di scansione analizza il codice sorgente staticamente per vulnerabilita'?",
          expectedKeywords: ['sast', 'static analysis'],
          hint: 'Static Application Security Testing -- runs on source code without executing it.',
          hintIt:
            'Static Application Security Testing -- gira sul codice sorgente senza eseguirlo.',
          onKeywordFound:
            'Right, {found} catches issues like SQL injection patterns and unsafe deserialization at build time.',
          onKeywordMissing:
            'We need {expected} -- it scans source code at build time before anything runs.',
        },
        {
          ai: 'What about checking the dependencies we pull in? What scans those?',
          aiIt: 'E per controllare le dipendenze che importiamo? Cosa le scansiona?',
          expectedKeywords: ['sca', 'dependency scan'],
          hint: 'Software Composition Analysis -- looks at third-party libraries for known CVEs.',
          hintIt:
            'Software Composition Analysis -- guarda alle librerie di terze parti per CVE note.',
          onKeywordFound: 'Right, {found} flags vulnerable libraries against the CVE database.',
          onKeywordMissing:
            'Use {expected} -- Software Composition Analysis flags vulnerable third-party packages.',
        },
        {
          ai: 'When a scan finds something serious, the pipeline should refuse to deploy. What do we call that block?',
          aiIt: 'Quando una scansione trova qualcosa di grave, la pipeline dovrebbe rifiutarsi di deployare. Come chiamiamo quel blocco?',
          expectedKeywords: ['gate', 'security gate'],
          hint: 'A pipeline checkpoint that fails the build on policy violations.',
          hintIt: 'Un checkpoint di pipeline che fa fallire la build su violazioni di policy.',
          onKeywordFound: 'Right, the {found} fails the build if any High/Critical findings exist.',
          onKeywordMissing:
            "It's a {expected} -- a checkpoint that fails the pipeline on critical findings.",
        },
        {
          ai: 'How should we communicate a policy violation back to the developer?',
          aiIt: 'Come dovremmo comunicare una violazione di policy allo sviluppatore?',
          expectedKeywords: ['feedback'],
          hint: 'Fast, in-context messaging on the PR itself.',
          hintIt: 'Messaggi rapidi e contestuali direttamente sulla PR.',
          onKeywordFound:
            'Yes, fast {found} as a PR comment with the exact line and fix advice is the gold standard.',
          onKeywordMissing:
            'Provide {expected} -- inline PR comments with exact lines and remediation hints.',
        },
        {
          ai: 'Sometimes we accept risk temporarily. How do we formally allow a finding through?',
          aiIt: 'A volte accettiamo il rischio temporaneamente. Come permettiamo formalmente che un finding passi?',
          expectedKeywords: ['exception', 'risk acceptance'],
          hint: 'A documented, time-bound waiver signed off by security.',
          hintIt: 'Una deroga documentata e a tempo, approvata dalla sicurezza.',
          onKeywordFound:
            'Right, a time-boxed {found} with security signoff and a tracked Jira for the real fix.',
          onKeywordMissing:
            'File a formal {expected} -- documented, time-limited, and approved by security.',
        },
      ],
      summary: {
        en: 'Practiced pipeline security vocabulary: SAST, SCA, gate, feedback, exception.',
        it: 'Praticato il vocabolario di sicurezza pipeline: SAST, SCA, gate, feedback, exception.',
      },
    },
    {
      id: 'dso-secret-leak',
      title: 'Secret Scanning Incident',
      titleIt: 'Incidente di Secret Scanning',
      context: 'secrets',
      difficulty: 2,
      turns: [
        {
          ai: "Our scanner found an AWS access key committed to a public repo last night. What's the first thing to do?",
          aiIt: "Il nostro scanner ha trovato una access key AWS committata in un repo pubblico ieri notte. Qual e' la prima cosa da fare?",
          expectedKeywords: ['rotate', 'rotation', 'revoke'],
          hint: 'Invalidating the leaked credential and issuing a new one.',
          hintIt: 'Invalidare la credenziale leakata ed emetterne una nuova.',
          onKeywordFound:
            "Yes, immediate {found} -- assume it's already scraped. Disable the old key first, then issue a new one.",
          onKeywordMissing:
            "First step is to {expected} -- disable the old key now. Public exposure means it's already harvested.",
        },
        {
          ai: 'What term do we use for any sensitive credential like an API key, password, or token?',
          aiIt: 'Quale termine usiamo per qualsiasi credenziale sensibile come API key, password o token?',
          expectedKeywords: ['secret'],
          hint: 'The general DevSecOps term for sensitive credentials.',
          hintIt: 'Il termine generale DevSecOps per credenziali sensibili.',
          onKeywordFound:
            'Right, any {found} should never live in source code or unencrypted env files.',
          onKeywordMissing:
            "It's a {expected} -- any sensitive credential, key, or token; never belongs in source code.",
        },
        {
          ai: "Where should secrets actually live so they're never in git?",
          aiIt: "Dove dovrebbero risiedere realmente i secret cosi' non finiscono mai in git?",
          expectedKeywords: ['vault'],
          hint: 'A purpose-built secret manager like HashiCorp Vault or cloud-native KMS.',
          hintIt: 'Un secret manager dedicato come HashiCorp Vault o KMS cloud-native.',
          onKeywordFound:
            'Right, store everything in {found} and inject at runtime. No more .env in repos.',
          onKeywordMissing:
            'In a {expected} -- HashiCorp Vault, AWS Secrets Manager, or similar; injected at runtime.',
        },
        {
          ai: 'How do we prevent this from happening again at commit time?',
          aiIt: 'Come preveniamo che questo riaccada al momento del commit?',
          expectedKeywords: ['pre-commit', 'hook'],
          hint: 'A local check that runs before the commit lands.',
          hintIt: 'Un check locale che gira prima che il commit arrivi.',
          onKeywordFound: 'Yes, a {found} with gitleaks blocks commits containing secrets locally.',
          onKeywordMissing:
            'Install a {expected} hook -- gitleaks or similar runs locally before commits land.',
        },
        {
          ai: "And how do we clean the secret out of git history once it's been pushed?",
          aiIt: "E come puliamo il secret dalla storia di git una volta che e' stato pushato?",
          expectedKeywords: ['rewrite', 'bfg'],
          hint: 'Tools like git filter-repo or BFG can purge a secret from history.',
          hintIt: 'Tool come git filter-repo o BFG possono purgare un secret dalla storia.',
          onKeywordFound:
            "Right, but git {found} doesn't help if it's already public -- the rotation is what matters.",
          onKeywordMissing:
            'Use git {expected} with filter-repo or BFG -- but assume the secret is already harvested.',
        },
      ],
      summary: {
        en: 'Practiced secrets vocabulary: rotate, secret, vault, pre-commit hook, history rewrite.',
        it: 'Praticato il vocabolario sui secret: rotate, secret, vault, pre-commit hook, history rewrite.',
      },
    },
    {
      id: 'dso-supply-chain',
      title: 'Supply Chain Audit',
      titleIt: 'Audit della Supply Chain',
      context: 'supply-chain',
      difficulty: 3,
      turns: [
        {
          ai: 'Compliance is asking for a complete inventory of every component in our build. What artifact do we generate?',
          aiIt: 'La compliance ci chiede un inventario completo di ogni componente nella nostra build. Quale artefatto generiamo?',
          expectedKeywords: ['sbom'],
          hint: 'Software Bill of Materials -- a manifest of every component.',
          hintIt: 'Software Bill of Materials -- un manifest di ogni componente.',
          onKeywordFound:
            'Right, an {found} in CycloneDX or SPDX format. Generate it in CI for every build.',
          onKeywordMissing:
            'Generate an {expected} -- a Software Bill of Materials listing every dependency and version.',
        },
        {
          ai: 'How do we prove our binary was built by us and not tampered with?',
          aiIt: "Come dimostriamo che il nostro binario e' stato costruito da noi e non e' stato manomesso?",
          expectedKeywords: ['signing', 'sign'],
          hint: 'Cryptographic signing of artifacts with cosign or similar.',
          hintIt: 'Firma crittografica degli artefatti con cosign o simili.',
          onKeywordFound:
            'Yes, {found} the artifact with cosign and verify in admission control. Keyless signing is the norm now.',
          onKeywordMissing:
            'We use {expected} -- cosign or similar to cryptographically sign release artifacts.',
        },
        {
          ai: 'We also want to record exactly how the build happened. What do we call that signed metadata?',
          aiIt: "Vogliamo anche registrare esattamente come e' avvenuta la build. Come chiamiamo quei metadata firmati?",
          expectedKeywords: ['attestation'],
          hint: 'Signed evidence about the build process, often SLSA-formatted.',
          hintIt: 'Evidenza firmata sul processo di build, spesso in formato SLSA.',
          onKeywordFound:
            'Right, a SLSA {found} captures provenance -- builder, source, parameters -- all signed.',
          onKeywordMissing:
            "It's a build {expected} -- signed provenance metadata, ideally SLSA-compliant.",
        },
        {
          ai: 'What framework defines maturity levels for supply chain security?',
          aiIt: "Quale framework definisce livelli di maturita' per la sicurezza della supply chain?",
          expectedKeywords: ['slsa'],
          hint: 'Supply-chain Levels for Software Artifacts.',
          hintIt: 'Supply-chain Levels for Software Artifacts.',
          onKeywordFound:
            'Right, {found} levels 1-4 give us a roadmap from basic provenance to hermetic builds.',
          onKeywordMissing:
            "It's {expected} -- Supply-chain Levels for Software Artifacts, with progressive maturity tiers.",
        },
        {
          ai: "Last question: how do we verify SBOMs and signatures at deploy time so a tampered image can't run?",
          aiIt: "Ultima domanda: come verifichiamo SBOM e firme al momento del deploy cosi' un'immagine manomessa non puo' girare?",
          expectedKeywords: ['admission control', 'policy'],
          hint: 'A Kubernetes admission controller or OPA policy that blocks unsigned images.',
          hintIt:
            'Un admission controller Kubernetes o policy OPA che blocca immagini non firmate.',
          onKeywordFound:
            'Right, {found} with Kyverno or Gatekeeper rejects images lacking valid signatures.',
          onKeywordMissing:
            'Use {expected} -- a Kubernetes admission policy that rejects unsigned or unscanned images.',
        },
      ],
      summary: {
        en: 'Practiced supply chain vocabulary: SBOM, signing, attestation, SLSA, admission control.',
        it: 'Praticato il vocabolario della supply chain: SBOM, signing, attestation, SLSA, admission control.',
      },
    },
    {
      id: 'dso-shift-left',
      title: 'Shift-Left Introduction',
      titleIt: 'Introduzione allo Shift-Left',
      context: 'culture',
      difficulty: 1,
      turns: [
        {
          ai: "Hi! I'm new and confused about 'shift-left security'. Can you explain what shifting means here?",
          aiIt: "Ciao! Sono nuovo e confuso su 'shift-left security'. Puoi spiegare cosa significa shifting qui?",
          expectedKeywords: ['shift-left', 'shift left'],
          hint: 'Moving security activities earlier in the SDLC.',
          hintIt: 'Spostare le attivita di sicurezza prima nel SDLC.',
          onKeywordFound:
            'Right, {found} means moving security checks earlier -- ideally at coding and PR time, not pre-release.',
          onKeywordMissing:
            "It's the {expected} idea -- pull security reviews and tests forward into design and coding stages.",
        },
        {
          ai: 'Why bother shifting things earlier instead of doing it just before release?',
          aiIt: "Perche' spostare le cose prima invece di farlo poco prima del release?",
          expectedKeywords: ['cost', 'cheaper'],
          hint: 'Defects found late are exponentially more expensive to fix.',
          hintIt: 'I difetti trovati tardi sono esponenzialmente piu costosi da fixare.',
          onKeywordFound:
            'Right, {found} of fixing rises 10x at each stage. Earlier = cheaper and safer.',
          onKeywordMissing:
            'Because {expected} of fixing grows exponentially -- a bug at design is 100x cheaper than one in prod.',
        },
        {
          ai: "Each team should have someone who's the local advocate for security. What do we call that role?",
          aiIt: "Ogni team dovrebbe avere qualcuno che e' l'advocate locale per la sicurezza. Come si chiama quel ruolo?",
          expectedKeywords: ['security champion'],
          hint: 'An embedded developer trained to handle security concerns within their team.',
          hintIt:
            'Uno sviluppatore embedded addestrato per gestire le preoccupazioni di sicurezza nel suo team.',
          onKeywordFound:
            'Right, the {found} is a developer who carries security context inside the team.',
          onKeywordMissing:
            "It's a {expected} -- a developer in each team trained to handle local security questions.",
        },
        {
          ai: 'What kind of training do these champions usually get to spot common bugs?',
          aiIt: 'Che tipo di training ricevono di solito questi champion per individuare bug comuni?',
          expectedKeywords: ['threat modeling'],
          hint: 'A structured exercise to identify and prioritize threats early.',
          hintIt:
            'Un esercizio strutturato per identificare e prioritizzare le minacce in anticipo.',
          onKeywordFound:
            'Right, {found} workshops with STRIDE help champions analyze designs systematically.',
          onKeywordMissing:
            'They learn {expected} -- structured analysis of design for threats, often using STRIDE.',
        },
        {
          ai: "Last thing: what's the goal of all this for our organization?",
          aiIt: "Ultima cosa: qual e' l'obiettivo di tutto questo per la nostra organizzazione?",
          expectedKeywords: ['security culture', 'culture'],
          hint: 'A shared mindset where security is everyones responsibility.',
          hintIt: "Una mentalita condivisa dove la sicurezza e' responsabilita' di tutti.",
          onKeywordFound:
            'Exactly, building a strong security {found} where everyone owns it, not just the security team.',
          onKeywordMissing:
            'Build a strong security {expected} -- where every engineer feels ownership over secure outcomes.',
        },
      ],
      summary: {
        en: 'Practiced shift-left vocabulary: shift-left, cost, security champion, threat modeling, culture.',
        it: 'Praticato il vocabolario shift-left: shift-left, cost, security champion, threat modeling, culture.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  C PROGRAMMING
  // ═══════════════════════════════════════════════════════
  'c-programming': [
    {
      id: 'c-memory-leak',
      title: 'Memory Leak Debugging',
      titleIt: 'Debug di un Memory Leak',
      context: 'memory',
      difficulty: 2,
      turns: [
        {
          ai: "Our daemon's memory grows over time. We allocate buffers with which function?",
          aiIt: 'La memoria del nostro daemon cresce nel tempo. Allochiamo buffer con quale funzione?',
          expectedKeywords: ['malloc'],
          hint: 'The standard heap allocation function in C.',
          hintIt: 'La funzione standard di allocazione heap in C.',
          onKeywordFound:
            'Right, every {found} call must be paired with a free, otherwise memory leaks.',
          onKeywordMissing:
            "It's {expected} -- the standard heap allocator. Every call must be paired with free.",
        },
        {
          ai: 'And the function to release that memory back to the heap?',
          aiIt: "E la funzione per restituire quella memoria all'heap?",
          expectedKeywords: ['free'],
          hint: 'The deallocation function that returns memory to the heap.',
          hintIt: "La funzione di deallocazione che restituisce memoria all'heap.",
          onKeywordFound:
            'Yes, {found}() must be called exactly once per malloc. Double-free crashes; no-free leaks.',
          onKeywordMissing:
            'Call {expected}() exactly once per malloc -- never twice, never zero times.',
        },
        {
          ai: 'What tool can we run to find leaks automatically?',
          aiIt: 'Quale tool possiamo eseguire per trovare leak automaticamente?',
          expectedKeywords: ['valgrind'],
          hint: 'A dynamic analysis tool famous for memcheck.',
          hintIt: 'Un tool di analisi dinamica famoso per memcheck.',
          onKeywordFound:
            'Right, {found} memcheck shows allocation site of every leaked byte. Run it under CI.',
          onKeywordMissing:
            'Use {expected} memcheck -- it tracks every allocation and points to the leak source.',
        },
        {
          ai: 'What kind of bug happens if we use a pointer after we already freed its memory?',
          aiIt: "Che tipo di bug succede se usiamo un puntatore dopo aver gia' liberato la sua memoria?",
          expectedKeywords: ['use-after-free', 'dangling'],
          hint: 'A classic memory safety issue with serious security implications.',
          hintIt: 'Un classico problema di memory safety con serie implicazioni di sicurezza.',
          onKeywordFound:
            'Yes, {found} -- often exploitable. Set the pointer to NULL right after freeing.',
          onKeywordMissing:
            "It's a {expected} pointer -- accessing memory after free; often exploitable for RCE.",
        },
        {
          ai: 'What modern compiler tool helps catch leaks and use-after-free at runtime?',
          aiIt: 'Quale moderno tool del compilatore aiuta a beccare leak e use-after-free a runtime?',
          expectedKeywords: ['asan', 'sanitizer'],
          hint: 'A Clang/GCC sanitizer flag for memory bugs.',
          hintIt: 'Un flag sanitizer di Clang/GCC per bug di memoria.',
          onKeywordFound:
            'Right, compile with {found} (-fsanitize=address). Faster than valgrind, great for tests.',
          onKeywordMissing:
            'Compile with the AddressSanitizer ({expected}) -- -fsanitize=address catches leaks and UAFs at runtime.',
        },
      ],
      summary: {
        en: 'Practiced C memory vocabulary: malloc, free, valgrind, use-after-free, sanitizer.',
        it: 'Praticato il vocabolario di memoria C: malloc, free, valgrind, use-after-free, sanitizer.',
      },
    },
    {
      id: 'c-pointer-intro',
      title: 'Pointer Arithmetic Intro',
      titleIt: "Introduzione all'Aritmetica dei Puntatori",
      context: 'pointers',
      difficulty: 1,
      turns: [
        {
          ai: "Hi, I'm just learning C. What do we call a variable that stores the location of another variable in memory?",
          aiIt: "Ciao, sto imparando C. Come chiamiamo una variabile che memorizza la posizione di un'altra variabile in memoria?",
          expectedKeywords: ['pointer'],
          hint: 'A variable that holds a memory address.',
          hintIt: 'Una variabile che contiene un indirizzo di memoria.',
          onKeywordFound:
            'Right, a {found} is just a variable holding a memory address. Declared with *.',
          onKeywordMissing:
            "It's a {expected} -- a variable that holds a memory address. Declared with int *p.",
        },
        {
          ai: 'Once I have a pointer p, how do I access the value it points to?',
          aiIt: 'Una volta che ho un puntatore p, come accedo al valore a cui punta?',
          expectedKeywords: ['dereference'],
          hint: 'The operation written as *p that reads the pointed-to value.',
          hintIt: "L'operazione scritta come *p che legge il valore puntato.",
          onKeywordFound: 'Yes, {found} with *p -- but be careful when p is NULL or freed.',
          onKeywordMissing: 'You {expected} it -- write *p to read the value at that address.',
        },
        {
          ai: 'And how do I get the address of an existing variable into a pointer?',
          aiIt: "E come metto l'indirizzo di una variabile esistente in un puntatore?",
          expectedKeywords: ['address'],
          hint: 'The unary & operator returns the variables address.',
          hintIt: "L'operatore unario & restituisce l'indirizzo della variabile.",
          onKeywordFound: 'Right, the {found}-of operator & gives you that. Like int *p = &x;',
          onKeywordMissing: 'Use the {expected}-of operator -- &x gives the address of variable x.',
        },
        {
          ai: "What's a special pointer value meaning 'points to nothing'?",
          aiIt: "Qual e' un valore speciale di puntatore che significa 'non punta a nulla'?",
          expectedKeywords: ['null'],
          hint: 'A standard zero/sentinel value indicating no valid address.',
          hintIt: 'Un valore zero/sentinel standard che indica nessun indirizzo valido.',
          onKeywordFound:
            'Right, {found} -- always check for it before dereferencing to avoid segfaults.',
          onKeywordMissing:
            "It's {expected} -- the canonical no-address sentinel; always check before dereferencing.",
        },
        {
          ai: 'If I do p+1 on an int pointer, how many bytes forward does it move?',
          aiIt: 'Se faccio p+1 su un puntatore int, di quanti byte avanza?',
          expectedKeywords: ['sizeof'],
          hint: 'The compiler scales pointer arithmetic by the type size.',
          hintIt: "Il compilatore scala l'aritmetica dei puntatori per la dimensione del tipo.",
          onKeywordFound:
            'Right, {found}(int) bytes -- usually 4. Pointer arithmetic is type-aware.',
          onKeywordMissing:
            'It moves {expected}(int) bytes -- usually 4 -- because pointer arithmetic scales by type size.',
        },
      ],
      summary: {
        en: 'Practiced C pointer vocabulary: pointer, dereference, address-of, NULL, sizeof.',
        it: 'Praticato il vocabolario dei puntatori C: pointer, dereference, address-of, NULL, sizeof.',
      },
    },
    {
      id: 'c-buffer-overflow',
      title: 'Buffer Overflow Concern',
      titleIt: 'Preoccupazione per Buffer Overflow',
      context: 'security',
      difficulty: 3,
      turns: [
        {
          ai: "I see strcpy() called on user input in this code. What's the worst-case bug here?",
          aiIt: "Vedo strcpy() chiamato su input utente in questo codice. Qual e' il bug nel caso peggiore?",
          expectedKeywords: ['buffer overflow', 'overflow'],
          hint: 'When a write goes past the end of the allocated buffer.',
          hintIt: 'Quando una scrittura va oltre la fine del buffer allocato.',
          onKeywordFound:
            "Right, classic {found}. With user input that's a remote code execution risk.",
          onKeywordMissing:
            "It's a {expected} -- writes past the buffer end can corrupt the stack and lead to RCE.",
        },
        {
          ai: "What's the field where we check we don't write beyond the buffer's allocated size?",
          aiIt: "Qual e' il termine per controllare che non scriviamo oltre la dimensione allocata del buffer?",
          expectedKeywords: ['bounds'],
          hint: 'Checking input length stays within the buffer size.',
          hintIt:
            "Controllare che la lunghezza dell'input rimanga dentro la dimensione del buffer.",
          onKeywordFound:
            "Yes, strict {found} checking on every write -- C doesn't do it for you, unlike Java or Rust.",
          onKeywordMissing:
            'Do strict {expected} checking -- always validate length explicitly before writing into a buffer.',
        },
        {
          ai: "What's the safer replacement for strcpy that limits write length?",
          aiIt: "Qual e' la sostituzione piu' sicura di strcpy che limita la lunghezza di scrittura?",
          expectedKeywords: ['strncpy', 'strlcpy'],
          hint: 'A bounded version of strcpy.',
          hintIt: 'Una versione delimitata di strcpy.',
          onKeywordFound:
            'Right, {found} with explicit n -- and even better, ensure NUL-termination yourself.',
          onKeywordMissing:
            'Use {expected} -- it takes a max length, but you must still ensure NUL-termination manually.',
        },
        {
          ai: 'What OS-level mitigations make buffer overflows harder to exploit?',
          aiIt: "Quali mitigazioni a livello OS rendono i buffer overflow piu' difficili da sfruttare?",
          expectedKeywords: ['aslr', 'canary'],
          hint: 'Address space randomization or stack canaries.',
          hintIt: 'Randomizzazione dello spazio degli indirizzi o stack canary.',
          onKeywordFound:
            'Right, {found} plus DEP make exploitation a real challenge -- but not impossible.',
          onKeywordMissing:
            'Modern OSes use {expected} plus DEP -- they raise the bar but never replace good C code.',
        },
        {
          ai: 'What broader category of bugs is buffer overflow part of?',
          aiIt: "A quale categoria piu' ampia di bug appartiene il buffer overflow?",
          expectedKeywords: ['memory safety'],
          hint: 'The umbrella term covering UAF, double-free, and overflows.',
          hintIt: 'Il termine ombrello che copre UAF, double-free e overflow.',
          onKeywordFound:
            'Right, {found} bugs are why Rust and modern C++ exist. Most CVEs are still in this family.',
          onKeywordMissing:
            "It's a {expected} bug -- still the cause of the majority of security CVEs in C/C++ code.",
        },
      ],
      summary: {
        en: 'Practiced C security vocabulary: buffer overflow, bounds, strncpy, ASLR, memory safety.',
        it: 'Praticato il vocabolario di sicurezza C: buffer overflow, bounds, strncpy, ASLR, memory safety.',
      },
    },
    {
      id: 'c-code-review',
      title: 'C Code Review',
      titleIt: 'Code Review C',
      context: 'review',
      difficulty: 2,
      turns: [
        {
          ai: "Reviewing a PR. They define a custom data type with multiple fields. What's that called in C?",
          aiIt: "Sto revisionando una PR. Definiscono un tipo di dato custom con piu' campi. Come si chiama in C?",
          expectedKeywords: ['struct'],
          hint: 'The C aggregate type that bundles multiple fields together.',
          hintIt: 'Il tipo aggregato C che raggruppa piu campi insieme.',
          onKeywordFound:
            'Right, the {found} bundles related fields. Usually paired with a typedef for ergonomics.',
          onKeywordMissing:
            "It's a {expected} -- typically paired with typedef so you don't repeat 'struct foo'.",
        },
        {
          ai: 'They put the struct definition in a .h file. What do we call that kind of file?',
          aiIt: 'Hanno messo la definizione della struct in un file .h. Come chiamiamo quel tipo di file?',
          expectedKeywords: ['header'],
          hint: 'A file containing declarations included with #include.',
          hintIt: 'Un file contenente dichiarazioni incluso con #include.',
          onKeywordFound:
            'Right, the {found} file holds declarations. Always wrap with include guards.',
          onKeywordMissing: "It's a {expected} file -- always with include guards or #pragma once.",
        },
        {
          ai: "Each entry point in the .c file is a unit of code that can be called. What's that?",
          aiIt: "Ogni entry point nel file .c e' un'unita' di codice che puo' essere chiamata. Cos'e'?",
          expectedKeywords: ['function'],
          hint: 'A named callable block of code.',
          hintIt: 'Un blocco di codice chiamabile con un nome.',
          onKeywordFound:
            'Right, every {found} should have a clear single responsibility and a static qualifier if internal.',
          onKeywordMissing:
            "It's a {expected} -- mark internal ones static to limit linker visibility.",
        },
        {
          ai: 'I see a global state variable. What problem could that cause in a multi-threaded server?',
          aiIt: 'Vedo una variabile di stato globale. Quale problema potrebbe causare in un server multi-thread?',
          expectedKeywords: ['race condition', 'thread safety'],
          hint: 'When multiple threads access shared data without synchronization.',
          hintIt: 'Quando piu thread accedono a dati condivisi senza sincronizzazione.',
          onKeywordFound:
            'Right, a {found} -- shared mutable state across threads without a mutex is a bug waiting.',
          onKeywordMissing:
            "It's a {expected} risk -- shared mutable state across threads without locking.",
        },
        {
          ai: "Last note: they didn't check the return value of fopen. Why does that matter?",
          aiIt: "Ultima nota: non hanno controllato il valore di ritorno di fopen. Perche' e' importante?",
          expectedKeywords: ['error handling', 'error check'],
          hint: 'C functions return error indicators that must be checked manually.',
          hintIt:
            'Le funzioni C restituiscono indicatori di errore che devono essere controllati manualmente.',
          onKeywordFound:
            "Yes, missing {found} -- fopen returning NULL means we'll segfault on the next fread.",
          onKeywordMissing:
            "It's missing {expected} -- C has no exceptions, so every return value must be checked manually.",
        },
      ],
      summary: {
        en: 'Practiced C review vocabulary: struct, header, function, race condition, error handling.',
        it: 'Praticato il vocabolario di review C: struct, header, function, race condition, error handling.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  C++
  // ═══════════════════════════════════════════════════════
  cpp: [
    {
      id: 'cpp-raii-review',
      title: 'RAII Review',
      titleIt: 'Revisione RAII',
      context: 'memory',
      difficulty: 2,
      turns: [
        {
          ai: 'Reviewing this class -- it owns a raw pointer with new and matching delete in the destructor. What modern pattern should they use instead?',
          aiIt: 'Sto revisionando questa classe -- possiede un puntatore raw con new e delete corrispondente nel distruttore. Quale pattern moderno dovrebbero usare invece?',
          expectedKeywords: ['raii'],
          hint: 'Resource Acquisition Is Initialization -- the cornerstone of modern C++ resource management.',
          hintIt:
            'Resource Acquisition Is Initialization -- il pilastro della gestione moderna delle risorse C++.',
          onKeywordFound:
            'Right, {found} ties resource lifetime to object scope -- the destructor handles cleanup automatically.',
          onKeywordMissing:
            'Apply {expected} -- Resource Acquisition Is Initialization. Wrap the pointer so destruction handles cleanup.',
        },
        {
          ai: "Specifically, what type should replace the raw pointer if there's a single owner?",
          aiIt: "Specificamente, quale tipo dovrebbe sostituire il puntatore raw se c'e' un solo proprietario?",
          expectedKeywords: ['unique_ptr', 'smart pointer'],
          hint: 'A unique-ownership smart pointer from <memory>.',
          hintIt: 'Uno smart pointer a proprieta unica da <memory>.',
          onKeywordFound:
            'Right, std::{found} expresses unique ownership cleanly. No need for explicit delete.',
          onKeywordMissing:
            'Use std::{expected} -- a smart pointer that owns and auto-deletes when going out of scope.',
        },
        {
          ai: 'What if multiple owners need to share the lifetime?',
          aiIt: "E se piu' owner devono condividere il lifetime?",
          expectedKeywords: ['shared_ptr'],
          hint: 'A reference-counted smart pointer.',
          hintIt: 'Uno smart pointer con conteggio di riferimenti.',
          onKeywordFound:
            'Right, std::{found} for shared ownership. But beware of reference cycles -- weak_ptr breaks them.',
          onKeywordMissing:
            'Use std::{expected} -- reference-counted shared ownership; pair with weak_ptr to avoid cycles.',
        },
        {
          ai: 'And what code in the class actually runs when the object goes out of scope?',
          aiIt: "E quale codice nella classe gira effettivamente quando l'oggetto esce dallo scope?",
          expectedKeywords: ['destructor'],
          hint: 'The special member function called at end-of-life.',
          hintIt: 'La funzione membro speciale chiamata a fine vita.',
          onKeywordFound:
            'Right, the {found} ~Foo() handles cleanup. With smart pointers it can often be defaulted.',
          onKeywordMissing:
            "It's the {expected} -- ~Foo(). With RAII members, you can usually default it.",
        },
        {
          ai: 'Should the destructor of a base class be virtual?',
          aiIt: 'Il distruttore di una classe base dovrebbe essere virtual?',
          expectedKeywords: ['virtual'],
          hint: 'A keyword that enables polymorphic deletion via base pointer.',
          hintIt: 'Una keyword che abilita la cancellazione polimorfica via puntatore base.',
          onKeywordFound:
            'Right, {found} destructor in any polymorphic base class -- otherwise deletion via base pointer is UB.',
          onKeywordMissing:
            'Make it {expected} if the class is meant for polymorphic use -- otherwise delete via base pointer is UB.',
        },
      ],
      summary: {
        en: 'Practiced C++ RAII vocabulary: RAII, unique_ptr, shared_ptr, destructor, virtual.',
        it: 'Praticato il vocabolario RAII C++: RAII, unique_ptr, shared_ptr, destructor, virtual.',
      },
    },
    {
      id: 'cpp-stl-choice',
      title: 'STL Container Choice',
      titleIt: 'Scelta del Container STL',
      context: 'stl',
      difficulty: 1,
      turns: [
        {
          ai: 'I need a dynamic array that grows. Which STL container should I use?',
          aiIt: 'Mi serve un array dinamico che cresce. Quale container STL dovrei usare?',
          expectedKeywords: ['vector'],
          hint: 'The default contiguous-storage container in C++.',
          hintIt: 'Il container di default a storage contiguo in C++.',
          onKeywordFound:
            'Right, std::{found} is the default choice -- contiguous storage, fast iteration, amortized O(1) push_back.',
          onKeywordMissing:
            'Use std::{expected} -- the default growable, contiguous, cache-friendly container.',
        },
        {
          ai: 'I also need to look up users by their username. Which container fits?',
          aiIt: 'Devo anche cercare utenti per username. Quale container va bene?',
          expectedKeywords: ['map', 'unordered_map'],
          hint: 'A hash table or balanced tree mapping keys to values.',
          hintIt: 'Una hash table o albero bilanciato che mappa chiavi a valori.',
          onKeywordFound:
            'Right, std::{found} -- O(1) average with unordered, O(log n) ordered with std::map.',
          onKeywordMissing:
            'Use std::{expected} -- hashed key/value lookup, O(1) average. Use std::map for ordered keys.',
        },
        {
          ai: 'How do I traverse all elements safely without indices?',
          aiIt: 'Come itero su tutti gli elementi in modo sicuro senza indici?',
          expectedKeywords: ['iterator'],
          hint: 'A pointer-like object or a range-based for loop.',
          hintIt: 'Un oggetto simile a puntatore o un range-based for loop.',
          onKeywordFound:
            'Right, an {found} or just for (const auto& x : container) which is the most idiomatic.',
          onKeywordMissing:
            'Use an {expected} or the range-for loop for(const auto& x : c) -- the modern idiom.',
        },
        {
          ai: 'What if I need to keep elements unique without duplicates?',
          aiIt: 'E se devo tenere elementi unici senza duplicati?',
          expectedKeywords: ['set'],
          hint: 'A container of unique elements.',
          hintIt: 'Un container di elementi unici.',
          onKeywordFound:
            'Right, std::{found} -- pick unordered_set for hash-based, set for sorted order.',
          onKeywordMissing:
            'Use a std::{expected} -- unordered_set for hashed uniqueness, set for sorted uniqueness.',
        },
        {
          ai: 'Where can I find generic functions like sorting and searching?',
          aiIt: 'Dove trovo funzioni generiche come sort e search?',
          expectedKeywords: ['algorithm'],
          hint: 'The header providing std::sort, std::find, std::transform, etc.',
          hintIt: "L'header che fornisce std::sort, std::find, std::transform, ecc.",
          onKeywordFound:
            'Right, the <{found}> header has std::sort, std::find, std::transform -- prefer these over hand-written loops.',
          onKeywordMissing:
            'In <{expected}> -- std::sort, std::find, std::transform; always prefer them to manual loops.',
        },
      ],
      summary: {
        en: 'Practiced STL vocabulary: vector, map, iterator, set, algorithm.',
        it: 'Praticato il vocabolario STL: vector, map, iterator, set, algorithm.',
      },
    },
    {
      id: 'cpp-move-semantics',
      title: 'Move Semantics Explained',
      titleIt: 'Move Semantics Spiegato',
      context: 'modern-cpp',
      difficulty: 3,
      turns: [
        {
          ai: 'We have unnecessary copies in this hot path. What modern C++ feature lets us transfer ownership instead?',
          aiIt: "Abbiamo copie inutili in questo hot path. Quale feature C++ moderno ci permette di trasferire la proprieta' invece?",
          expectedKeywords: ['move'],
          hint: 'A C++11 feature transferring resources instead of copying.',
          hintIt: 'Una feature C++11 che trasferisce risorse invece di copiare.',
          onKeywordFound:
            "Right, {found} semantics let us steal the source's resources instead of allocating fresh ones.",
          onKeywordMissing:
            'Use {expected} semantics -- transfer ownership instead of deep-copying buffers.',
        },
        {
          ai: 'What category of expression can be moved from?',
          aiIt: "Quale categoria di espressione puo' essere mossa?",
          expectedKeywords: ['rvalue'],
          hint: 'A temporary or expiring value, denoted with &&.',
          hintIt: 'Un valore temporaneo o in scadenza, indicato con &&.',
          onKeywordFound: 'Right, an {found} -- temporaries and expiring values bound by T&&.',
          onKeywordMissing:
            "It's an {expected} -- a temporary or expiring expression you can bind to T&&.",
        },
        {
          ai: 'How do I explicitly turn a named lvalue into something movable?',
          aiIt: 'Come trasformo esplicitamente un lvalue nominato in qualcosa di movibile?',
          expectedKeywords: ['std::move'],
          hint: 'A standard cast to rvalue reference.',
          hintIt: 'Un cast standard a rvalue reference.',
          onKeywordFound:
            "Right, {found} -- it's just a cast, doesn't actually move anything by itself.",
          onKeywordMissing:
            "Use {expected} -- it's a cast to T&& that enables move overload selection.",
        },
        {
          ai: 'What special member function should our class implement to support efficient moves?',
          aiIt: 'Quale funzione membro speciale dovrebbe implementare la nostra classe per supportare move efficienti?',
          expectedKeywords: ['move constructor'],
          hint: 'The constructor that takes an rvalue reference.',
          hintIt: "Il costruttore che prende un'rvalue reference.",
          onKeywordFound:
            'Right, the {found} -- and matching move assignment, both ideally noexcept for STL compatibility.',
          onKeywordMissing:
            'Implement a {expected} -- Foo(Foo&&) and matching move assignment, both ideally noexcept.',
        },
        {
          ai: 'What happens to the original object after we move from it?',
          aiIt: "Cosa succede all'oggetto originale dopo averlo mosso?",
          expectedKeywords: ['valid', 'unspecified'],
          hint: 'It must be left in a valid but unspecified state.',
          hintIt: 'Deve essere lasciato in uno stato valido ma non specificato.',
          onKeywordFound:
            "Right, the moved-from object must be {found} but unspecified -- destructible and assignable, that's it.",
          onKeywordMissing:
            "It's left in a {expected} but unspecified state -- safe to destroy or reassign, but don't assume any value.",
        },
      ],
      summary: {
        en: 'Practiced move semantics: move, rvalue, std::move, move constructor, moved-from state.',
        it: 'Praticato il vocabolario move semantics: move, rvalue, std::move, move constructor, moved-from state.',
      },
    },
    {
      id: 'cpp-modern-refactor',
      title: 'Modern C++ Refactor',
      titleIt: 'Refactor C++ Moderno',
      context: 'modernization',
      difficulty: 2,
      turns: [
        {
          ai: "Refactoring this 2010-era code. What keyword lets the compiler deduce types so we don't write std::vector<...>::iterator everywhere?",
          aiIt: "Sto refattorizzando questo codice del 2010. Quale keyword fa dedurre i tipi al compilatore cosi' non scriviamo std::vector<...>::iterator ovunque?",
          expectedKeywords: ['auto'],
          hint: 'C++11 type deduction keyword.',
          hintIt: 'Keyword di type deduction C++11.',
          onKeywordFound:
            'Right, {found} cleans up declarations massively without losing type safety.',
          onKeywordMissing:
            'Use {expected} -- C++11 type deduction; cuts noise without sacrificing static typing.',
        },
        {
          ai: 'Inline anonymous functions, like for std::sort comparators, are called what in modern C++?',
          aiIt: 'Le funzioni anonime inline, come quelle per i comparator di std::sort, come si chiamano in C++ moderno?',
          expectedKeywords: ['lambda'],
          hint: 'A C++11 inline anonymous function expression.',
          hintIt: "Un'espressione di funzione anonima inline C++11.",
          onKeywordFound:
            'Right, a {found} -- [](auto& a, auto& b) { return a.id < b.id; }, way cleaner than functor classes.',
          onKeywordMissing:
            "It's a {expected} -- the [](){} expression replaces functor classes for one-off callbacks.",
        },
        {
          ai: 'What feature lets us write a single function or class that works for many types?',
          aiIt: 'Quale feature ci permette di scrivere una singola funzione o classe che funziona per molti tipi?',
          expectedKeywords: ['template'],
          hint: 'C++ generic programming via type parameters.',
          hintIt: 'Programmazione generica C++ tramite parametri di tipo.',
          onKeywordFound:
            'Right, {found}<typename T> -- type-safe generic code, all resolved at compile time.',
          onKeywordMissing:
            "It's a {expected} -- the C++ way to write generic, type-safe code instantiated at compile time.",
        },
        {
          ai: "C++20 added a way to constrain template parameters with named requirements. What's it called?",
          aiIt: 'C++20 ha aggiunto un modo per vincolare i parametri template con requirement nominati. Come si chiama?',
          expectedKeywords: ['concept'],
          hint: 'A C++20 mechanism that gives templates readable constraints.',
          hintIt: 'Un meccanismo C++20 che da ai template vincoli leggibili.',
          onKeywordFound:
            'Right, a {found} -- like requires Sortable<T> instead of cryptic SFINAE tricks.',
          onKeywordMissing:
            "It's a {expected} -- replaces SFINAE with readable, named constraints on template params.",
        },
        {
          ai: 'Last cleanup: instead of legacy iterator pairs, what C++20 abstraction can we use to compose operations?',
          aiIt: 'Ultima pulizia: invece delle vecchie coppie di iterator, quale astrazione C++20 possiamo usare per comporre operazioni?',
          expectedKeywords: ['ranges'],
          hint: 'C++20 view abstractions you pipe together.',
          hintIt: 'Astrazioni di view C++20 che si concatenano in pipeline.',
          onKeywordFound:
            'Right, std::{found} -- vec | views::filter(...) | views::transform(...) feels almost functional.',
          onKeywordMissing:
            'Use std::{expected} -- pipe-style views like filter and transform composed lazily.',
        },
      ],
      summary: {
        en: 'Practiced modern C++ vocabulary: auto, lambda, template, concept, ranges.',
        it: 'Praticato il vocabolario C++ moderno: auto, lambda, template, concept, ranges.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  NODE.JS
  // ═══════════════════════════════════════════════════════
  nodejs: [
    {
      id: 'node-express-mw',
      title: 'Express Middleware Design',
      titleIt: 'Design dei Middleware Express',
      context: 'express',
      difficulty: 2,
      turns: [
        {
          ai: "We're building an Express API. Where do we add cross-cutting logic like logging or auth checks?",
          aiIt: "Stiamo costruendo un'API Express. Dove aggiungiamo logica cross-cutting come logging o auth check?",
          expectedKeywords: ['middleware'],
          hint: 'Functions with the (req, res, next) signature that intercept requests.',
          hintIt: 'Funzioni con signature (req, res, next) che intercettano le richieste.',
          onKeywordFound:
            'Right, {found} runs in order before the route handler -- perfect for logging, auth, and parsing.',
          onKeywordMissing:
            'In {expected} -- Express functions taking (req, res, next), composed in order.',
        },
        {
          ai: "Each endpoint URL+method maps to a handler. What's that mapping called?",
          aiIt: 'Ogni URL+metodo di endpoint mappa a un handler. Come si chiama quel mapping?',
          expectedKeywords: ['route'],
          hint: 'The URL pattern combined with the HTTP method.',
          hintIt: 'Il pattern URL combinato con il metodo HTTP.',
          onKeywordFound:
            "Right, a {found} like app.get('/users/:id', handler) -- group related ones with Router.",
          onKeywordMissing:
            "It's a {expected} -- app.METHOD(path, handler), group them with express.Router().",
        },
        {
          ai: 'Inside a handler, where do we read query params and body?',
          aiIt: 'Dentro un handler, dove leggiamo i query param e il body?',
          expectedKeywords: ['request', 'req'],
          hint: 'The first argument of the handler representing the incoming HTTP message.',
          hintIt: "Il primo argomento dell'handler che rappresenta il messaggio HTTP in ingresso.",
          onKeywordFound:
            'Right, on the {found} object -- req.query, req.params, req.body all live there.',
          onKeywordMissing:
            'On the {expected} object -- req.query for query string, req.body after body parser, req.params for route params.',
        },
        {
          ai: 'How do we send a response back to the client?',
          aiIt: 'Come inviamo una risposta al client?',
          expectedKeywords: ['response', 'res'],
          hint: 'The second argument used to write status, headers, and body.',
          hintIt: 'Il secondo argomento usato per scrivere status, headers e body.',
          onKeywordFound:
            'Right, the {found} object -- res.status(200).json(data) is the typical pattern.',
          onKeywordMissing:
            'Use the {expected} object -- res.status(...).json(...) sets status and sends JSON.',
        },
        {
          ai: 'How should we handle errors thrown inside async handlers?',
          aiIt: 'Come dobbiamo gestire gli errori lanciati dentro handler async?',
          expectedKeywords: ['error handler', 'next'],
          hint: 'A four-arg middleware (err, req, res, next) for centralized handling.',
          hintIt:
            'Un middleware a quattro argomenti (err, req, res, next) per gestione centralizzata.',
          onKeywordFound:
            'Right, a centralized {found} catches everything passed to next(err) and returns a clean JSON error.',
          onKeywordMissing:
            'Pass to {expected}(err) and have a 4-arg error middleware (err, req, res, next) at the end.',
        },
      ],
      summary: {
        en: 'Practiced Express vocabulary: middleware, route, request, response, error handler.',
        it: 'Praticato il vocabolario Express: middleware, route, request, response, error handler.',
      },
    },
    {
      id: 'node-async-bug',
      title: 'Async Bug Investigation',
      titleIt: 'Investigazione Bug Asincrono',
      context: 'async',
      difficulty: 2,
      turns: [
        {
          ai: "This handler returns undefined sometimes. They're calling getUser() but not awaiting it. What does getUser actually return?",
          aiIt: 'Questo handler restituisce undefined a volte. Stanno chiamando getUser() senza fare await. Cosa restituisce davvero getUser?',
          expectedKeywords: ['promise'],
          hint: 'An object representing the eventual result of an async operation.',
          hintIt: "Un oggetto che rappresenta il risultato eventuale di un'operazione asincrona.",
          onKeywordFound:
            'Right, a {found} -- without await we send the unresolved object as JSON, hence the weird response.',
          onKeywordMissing:
            "It returns a {expected} -- without await it's the unresolved object, not the actual value.",
        },
        {
          ai: 'What keyword should they use to wait for the result inline?',
          aiIt: 'Quale keyword dovrebbero usare per aspettare il risultato inline?',
          expectedKeywords: ['await'],
          hint: 'The keyword that pauses execution until a Promise settles.',
          hintIt: "La keyword che mette in pausa l'esecuzione finche' una Promise non si risolve.",
          onKeywordFound:
            'Right, just {found} getUser() -- but the function must be marked async too.',
          onKeywordMissing:
            'Use {expected} -- it pauses execution until the Promise resolves; the function must be async.',
        },
        {
          ai: "Older code uses the legacy pattern with (err, data) functions. What's that called?",
          aiIt: "Codice piu' vecchio usa il pattern legacy con funzioni (err, data). Come si chiama?",
          expectedKeywords: ['callback'],
          hint: "Node's original error-first function pattern.",
          hintIt: 'Il pattern originale di Node con error-first function.',
          onKeywordFound:
            'Right, the {found} pattern -- still seen in older libs. Use util.promisify to modernize.',
          onKeywordMissing:
            "It's the {expected} pattern -- (err, data) => { ... }; use util.promisify to convert to Promise.",
        },
        {
          ai: 'How do we run multiple independent async calls in parallel?',
          aiIt: "Come eseguiamo piu' chiamate async indipendenti in parallelo?",
          expectedKeywords: ['promise.all', 'all'],
          hint: 'A static method that waits for all Promises to resolve.',
          hintIt: 'Un metodo statico che aspetta che tutte le Promise si risolvano.',
          onKeywordFound:
            'Right, await Promise.{found}([p1, p2, p3]) -- single failure rejects everything though.',
          onKeywordMissing:
            'Use Promise.{expected}([...]) -- runs them concurrently and resolves when every one is done.',
        },
        {
          ai: 'What should we wrap an await in to handle errors gracefully?',
          aiIt: 'In cosa dobbiamo avvolgere un await per gestire gli errori in modo elegante?',
          expectedKeywords: ['try/catch', 'try catch', 'try'],
          hint: 'A standard JS construct around the awaited expression.',
          hintIt: "Un costrutto JS standard attorno all'espressione awaited.",
          onKeywordFound:
            'Right, a {found} block around the await -- or chain .catch() on the Promise itself.',
          onKeywordMissing:
            'Wrap with {expected}/catch -- standard exception handling works with await.',
        },
      ],
      summary: {
        en: 'Practiced async vocabulary: Promise, await, callback, Promise.all, try/catch.',
        it: 'Praticato il vocabolario async: Promise, await, callback, Promise.all, try/catch.',
      },
    },
    {
      id: 'node-jwt-auth',
      title: 'JWT Authentication Setup',
      titleIt: 'Setup Autenticazione JWT',
      context: 'auth',
      difficulty: 2,
      turns: [
        {
          ai: 'We need stateless auth for our API. What kind of self-contained credential should we issue on login?',
          aiIt: 'Ci serve auth stateless per la nostra API. Che tipo di credenziale autocontenuta dovremmo emettere al login?',
          expectedKeywords: ['jwt', 'token'],
          hint: 'JSON Web Token -- a signed, base64-encoded string.',
          hintIt: 'JSON Web Token -- una stringa firmata e codificata base64.',
          onKeywordFound: 'Right, a {found} -- signed JSON we can verify without a session store.',
          onKeywordMissing:
            'Issue a {expected} -- JSON Web Token, signed JSON we verify on each request.',
        },
        {
          ai: "How does the server prove the token wasn't tampered with?",
          aiIt: "Come fa il server a provare che il token non e' stato manomesso?",
          expectedKeywords: ['signature', 'sign'],
          hint: 'A cryptographic signature over the header and payload.',
          hintIt: 'Una firma crittografica su header e payload.',
          onKeywordFound:
            'Right, the HMAC {found} over the header and payload -- if tampered, verification fails.',
          onKeywordMissing:
            'Via the JWT {expected} -- the server-side secret signs header.payload, and any tampering breaks verification.',
        },
        {
          ai: 'Where do we store the signing secret?',
          aiIt: 'Dove salviamo il secret di firma?',
          expectedKeywords: ['env', 'environment variable', 'secret'],
          hint: 'In an environment variable, never in source.',
          hintIt: "In una variabile d'ambiente, mai nel sorgente.",
          onKeywordFound: 'Right, in an {found} like JWT_SECRET. Never commit it to git.',
          onKeywordMissing:
            'Load it from an {expected} like JWT_SECRET -- never check in real secrets.',
        },
        {
          ai: 'What Express component should verify the JWT on every protected route?',
          aiIt: 'Quale componente Express dovrebbe verificare il JWT su ogni route protetta?',
          expectedKeywords: ['middleware'],
          hint: 'Reusable Express function that intercepts requests.',
          hintIt: 'Funzione Express riutilizzabile che intercetta le richieste.',
          onKeywordFound:
            'Right, an auth {found} that calls jwt.verify and attaches req.user, or returns 401.',
          onKeywordMissing:
            'An auth {expected} -- runs jwt.verify, attaches req.user on success, returns 401 otherwise.',
        },
        {
          ai: "Tokens shouldn't live forever. What field handles automatic expiry?",
          aiIt: 'I token non devono vivere per sempre. Quale campo gestisce la scadenza automatica?',
          expectedKeywords: ['expiration', 'exp', 'expiry'],
          hint: 'A standard claim with a Unix timestamp.',
          hintIt: 'Una claim standard con un timestamp Unix.',
          onKeywordFound:
            'Right, the exp claim handles {found}. Pair short-lived JWTs with refresh tokens.',
          onKeywordMissing:
            'The exp claim handles {expected} -- short-lived access tokens with refresh tokens is the safe pattern.',
        },
      ],
      summary: {
        en: 'Practiced JWT vocabulary: token, signature, env secret, middleware, expiration.',
        it: 'Praticato il vocabolario JWT: token, signature, env secret, middleware, expiration.',
      },
    },
    {
      id: 'node-junior-q',
      title: 'Junior Question Time',
      titleIt: 'Domande del Junior',
      context: 'basics',
      difficulty: 1,
      turns: [
        {
          ai: "Hi! I'm new to Node. What command do we use to install a package from the registry?",
          aiIt: 'Ciao! Sono nuovo a Node. Quale comando usiamo per installare un pacchetto dal registry?',
          expectedKeywords: ['npm', 'install'],
          hint: 'The default Node.js package manager.',
          hintIt: 'Il package manager di default di Node.js.',
          onKeywordFound:
            'Right, {found} install -- pnpm and yarn are alternatives but npm is bundled with Node.',
          onKeywordMissing:
            'Use {expected} install <pkg> -- npm is bundled; pnpm and yarn are popular alternatives.',
        },
        {
          ai: 'How does my code import a function from another file?',
          aiIt: 'Come fa il mio codice a importare una funzione da un altro file?',
          expectedKeywords: ['require', 'import'],
          hint: 'CommonJS uses one keyword, ES modules another.',
          hintIt: "CommonJS usa una keyword, gli ES module un'altra.",
          onKeywordFound:
            "Right, {found}('./utils') in CommonJS, or import in ES modules. Match your package.json type.",
          onKeywordMissing:
            'Use {expected} -- require() in CommonJS or import in ESM, set by package.json type field.',
        },
        {
          ai: "What's a self-contained unit of code we export from one file and use in another?",
          aiIt: "Cos'e' un'unita' di codice autocontenuta che esportiamo da un file e usiamo in un altro?",
          expectedKeywords: ['module'],
          hint: 'The fundamental unit of code organization in Node.',
          hintIt: "L'unita fondamentale di organizzazione del codice in Node.",
          onKeywordFound:
            'Right, a {found} -- file = module. Use module.exports in CommonJS or export in ESM.',
          onKeywordMissing:
            "It's a {expected} -- one file equals one module; export with module.exports or export.",
        },
        {
          ai: "What file lists my project's dependencies and scripts?",
          aiIt: 'Quale file elenca le dipendenze e gli script del mio progetto?',
          expectedKeywords: ['package.json'],
          hint: 'The manifest at the root of every Node project.',
          hintIt: 'Il manifest alla radice di ogni progetto Node.',
          onKeywordFound:
            'Right, {found} -- dependencies, scripts, name, version all live there. npm init creates it.',
          onKeywordMissing:
            "It's {expected} -- the project manifest with deps, scripts, version. npm init scaffolds it.",
        },
        {
          ai: 'Where do all the installed packages actually go?',
          aiIt: 'Dove vanno effettivamente tutti i pacchetti installati?',
          expectedKeywords: ['node_modules'],
          hint: 'A folder created by npm; should be gitignored.',
          hintIt: 'Una cartella creata da npm; va messa in gitignore.',
          onKeywordFound:
            'Right, {found}/. Always gitignored -- the lockfile alone is enough to reinstall.',
          onKeywordMissing:
            'In {expected}/ -- always gitignored, regenerated from package-lock.json on install.',
        },
      ],
      summary: {
        en: 'Practiced Node basics: npm, require, module, package.json, node_modules.',
        it: 'Praticato le basi Node: npm, require, module, package.json, node_modules.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  RUST
  // ═══════════════════════════════════════════════════════
  rust: [
    {
      id: 'rust-borrow-error',
      title: 'Borrow Checker Error',
      titleIt: 'Errore del Borrow Checker',
      context: 'ownership',
      difficulty: 2,
      turns: [
        {
          ai: "I'm getting 'cannot borrow as mutable more than once'. What concept is the borrow checker enforcing?",
          aiIt: "Ricevo 'cannot borrow as mutable more than once'. Quale concetto sta facendo rispettare il borrow checker?",
          expectedKeywords: ['ownership'],
          hint: "Rust's core memory safety system.",
          hintIt: 'Il sistema fondamentale di memory safety di Rust.',
          onKeywordFound:
            'Right, {found} ensures only one mutable reference exists at a time -- prevents data races at compile time.',
          onKeywordMissing:
            "It's {expected} -- Rust's compile-time guarantee against aliasing mutations and data races.",
        },
        {
          ai: 'When I write &mut x, what is that called?',
          aiIt: 'Quando scrivo &mut x, come si chiama?',
          expectedKeywords: ['borrow', 'mutable borrow'],
          hint: 'Taking a temporary reference to a value.',
          hintIt: 'Prendere un riferimento temporaneo a un valore.',
          onKeywordFound:
            'Right, a mutable {found} -- you can have one mutable XOR many shared, never both.',
          onKeywordMissing:
            "It's a mutable {expected} -- only one allowed at a time, exclusive of any shared borrows.",
        },
        {
          ai: 'How long is a reference valid? What concept tracks that?',
          aiIt: "Per quanto tempo un riferimento e' valido? Quale concetto lo traccia?",
          expectedKeywords: ['lifetime'],
          hint: "A scope-based annotation often written as 'a.",
          hintIt: "Un'annotazione basata su scope spesso scritta come 'a.",
          onKeywordFound:
            "Right, {found}s -- the compiler infers most, but you annotate with 'a when references cross function boundaries.",
          onKeywordMissing:
            "It's a {expected} -- written 'a, ensures references never outlive the data they point to.",
        },
        {
          ai: "If I want to give the value to another function and not keep it, what's that called?",
          aiIt: "Se voglio dare il valore a un'altra funzione e non tenerlo, come si chiama?",
          expectedKeywords: ['move'],
          hint: 'Transferring ownership permanently.',
          hintIt: 'Trasferire la proprieta in modo permanente.',
          onKeywordFound:
            'Right, a {found} -- the original variable becomes invalid. Use Clone if you need a copy.',
          onKeywordMissing:
            "It's a {expected} -- ownership transfer; the source is invalidated unless the type implements Copy.",
        },
        {
          ai: 'Last thing -- what trait lets a type be implicitly duplicated like an integer?',
          aiIt: 'Ultima cosa -- quale trait permette a un tipo di essere duplicato implicitamente come un intero?',
          expectedKeywords: ['copy'],
          hint: 'A marker trait for types where bitwise copy is safe.',
          hintIt: 'Un marker trait per tipi dove la copia bitwise e sicura.',
          onKeywordFound:
            'Right, {found} trait -- only for trivial types; structs with heap data should impl Clone instead.',
          onKeywordMissing:
            'The {expected} marker trait -- safe for primitives; types owning heap memory should impl Clone instead.',
        },
      ],
      summary: {
        en: 'Practiced Rust ownership vocabulary: ownership, borrow, lifetime, move, Copy.',
        it: 'Praticato il vocabolario ownership Rust: ownership, borrow, lifetime, move, Copy.',
      },
    },
    {
      id: 'rust-data-type',
      title: 'Choosing a Data Type',
      titleIt: 'Scegliere un Tipo di Dato',
      context: 'types',
      difficulty: 1,
      turns: [
        {
          ai: "Beginner question -- I need a growable list of numbers. What's the standard collection?",
          aiIt: "Domanda da principiante -- mi serve una lista di numeri che cresce. Qual e' la collection standard?",
          expectedKeywords: ['vec'],
          hint: 'The owned, growable, contiguous collection in std.',
          hintIt: 'La collection growable contigua e owned in std.',
          onKeywordFound: 'Right, {found}<T> -- the workhorse like std::vector in C++.',
          onKeywordMissing: 'Use {expected}<T> -- the standard owned dynamic array.',
        },
        {
          ai: 'And for an owned heap-allocated text?',
          aiIt: "E per un testo allocato sull'heap?",
          expectedKeywords: ['string'],
          hint: 'The owned UTF-8 string type.',
          hintIt: 'Il tipo string owned UTF-8.',
          onKeywordFound: 'Right, {found} owns its bytes. Use &str for borrowed references.',
          onKeywordMissing: 'Use {expected} for owned text -- &str for borrowed string slices.',
        },
        {
          ai: 'If I just want to look at part of a Vec without owning it, what type do I take?',
          aiIt: 'Se voglio solo guardare parte di un Vec senza possederlo, che tipo prendo?',
          expectedKeywords: ['slice'],
          hint: 'A view into contiguous data, written &[T].',
          hintIt: 'Una view su dati contigui, scritta &[T].',
          onKeywordFound:
            'Right, a {found} &[T] -- generic over Vec, array, etc. Functions should take slices, not Vecs.',
          onKeywordMissing:
            'Take a {expected} &[T] -- it borrows a contiguous range, works for any owner.',
        },
        {
          ai: 'What about a value that may or may not exist?',
          aiIt: "E per un valore che puo' esistere o no?",
          expectedKeywords: ['option'],
          hint: 'A type with Some and None variants.',
          hintIt: 'Un tipo con varianti Some e None.',
          onKeywordFound: 'Right, {found}<T> -- Some(x) or None. Way safer than null.',
          onKeywordMissing:
            'Use {expected}<T> -- Some(x) or None; eliminates the null pointer disaster.',
        },
        {
          ai: 'And for a fixed-size collection known at compile time?',
          aiIt: 'E per una collection a dimensione fissa nota a compile time?',
          expectedKeywords: ['array'],
          hint: 'A stack-allocated [T; N] type.',
          hintIt: 'Un tipo [T; N] allocato sullo stack.',
          onKeywordFound:
            'Right, an {found} [T; N] -- stack-allocated, fixed size; perfect when N is a constant.',
          onKeywordMissing:
            'Use an {expected} [T; N] -- fixed-size, stack-allocated; size must be known at compile time.',
        },
      ],
      summary: {
        en: 'Practiced Rust types: Vec, String, slice, Option, array.',
        it: 'Praticato i tipi Rust: Vec, String, slice, Option, array.',
      },
    },
    {
      id: 'rust-async-runtime',
      title: 'Async Runtime Decision',
      titleIt: 'Decisione sul Runtime Async',
      context: 'async',
      difficulty: 3,
      turns: [
        {
          ai: "We're writing a high-throughput server in Rust. The std lib doesn't include an async executor -- which crate is the de facto choice?",
          aiIt: "Stiamo scrivendo un server ad alta throughput in Rust. La std lib non include un async executor -- quale crate e' la scelta de facto?",
          expectedKeywords: ['tokio'],
          hint: 'The most popular async runtime in the Rust ecosystem.',
          hintIt: "Il runtime async piu popolare nell'ecosistema Rust.",
          onKeywordFound: 'Right, {found} -- multi-threaded executor with great ecosystem support.',
          onKeywordMissing:
            'Pick {expected} -- the de facto async runtime, multi-threaded by default.',
        },
        {
          ai: 'What do we mark a function with to make it async?',
          aiIt: 'Con cosa marchiamo una funzione per renderla async?',
          expectedKeywords: ['async'],
          hint: 'A function modifier keyword.',
          hintIt: 'Una keyword modificatore di funzione.',
          onKeywordFound:
            'Right, {found} fn -- it returns impl Future<Output = T> behind the scenes.',
          onKeywordMissing:
            'Use {expected} fn -- the function then returns impl Future implicitly.',
        },
        {
          ai: 'What does an async function actually return at the type level?',
          aiIt: 'Cosa restituisce realmente una funzione async a livello di tipo?',
          expectedKeywords: ['future'],
          hint: 'A trait representing a value that may not be ready yet.',
          hintIt: 'Un trait che rappresenta un valore che potrebbe non essere ancora pronto.',
          onKeywordFound:
            'Right, a {found} -- lazy by default, polled by the executor until ready.',
          onKeywordMissing:
            'It returns a {expected} -- lazy, polled by the executor until it produces a value.',
        },
        {
          ai: 'And how do we drive a Future to completion at a call site?',
          aiIt: 'E come portiamo a completamento un Future al call site?',
          expectedKeywords: ['await'],
          hint: 'A postfix keyword on a Future expression.',
          hintIt: "Una keyword postfix su un'espressione Future.",
          onKeywordFound:
            'Right, .{found} -- yields back to the executor until the Future resolves.',
          onKeywordMissing:
            'Use .{expected} -- postfix on the Future; yields the task while waiting.',
        },
        {
          ai: 'What if the executor must run blocking I/O without stalling all tasks?',
          aiIt: "E se l'executor deve eseguire I/O bloccante senza far stallare tutti i task?",
          expectedKeywords: ['spawn_blocking', 'spawn'],
          hint: 'A Tokio API to push blocking work to a dedicated pool.',
          hintIt: "Un'API di Tokio per spostare lavoro bloccante su un pool dedicato.",
          onKeywordFound:
            'Right, tokio::task::{found} pushes the blocking call to a dedicated thread pool.',
          onKeywordMissing:
            'Use tokio::task::{expected}_blocking -- runs sync code on a separate thread pool.',
        },
      ],
      summary: {
        en: 'Practiced Rust async vocabulary: tokio, async, Future, await, spawn_blocking.',
        it: 'Praticato il vocabolario async Rust: tokio, async, Future, await, spawn_blocking.',
      },
    },
    {
      id: 'rust-error-refactor',
      title: 'Error Handling Refactor',
      titleIt: 'Refactor della Gestione Errori',
      context: 'errors',
      difficulty: 2,
      turns: [
        {
          ai: 'This codebase has unwrap() everywhere. What enum should fallible functions return instead?',
          aiIt: 'Questa codebase ha unwrap() ovunque. Quale enum dovrebbero restituire invece le funzioni fallibili?',
          expectedKeywords: ['result'],
          hint: 'An enum with Ok and Err variants.',
          hintIt: 'Un enum con varianti Ok ed Err.',
          onKeywordFound:
            'Right, {found}<T, E> -- Ok(value) on success, Err(e) on failure. Forces the caller to handle errors.',
          onKeywordMissing:
            'Return a {expected}<T, E> -- Ok(value) or Err(error); makes failure visible in the type signature.',
        },
        {
          ai: "What's wrong with sprinkling unwrap() everywhere?",
          aiIt: "Cosa c'e' che non va a mettere unwrap() ovunque?",
          expectedKeywords: ['panic'],
          hint: 'unwrap on Err triggers an unrecoverable abort.',
          hintIt: 'unwrap su Err causa un abort irrecuperabile.',
          onKeywordFound:
            'Right, it {found}s on Err -- unrecoverable in libraries. Reserve unwrap for tests or proven invariants.',
          onKeywordMissing:
            'It {expected}s on Err -- a hard abort; never appropriate in library code.',
        },
        {
          ai: 'What operator can propagate errors up to the caller cleanly?',
          aiIt: 'Quale operatore propaga gli errori al chiamante in modo pulito?',
          expectedKeywords: ['?', 'question mark'],
          hint: 'A postfix operator on a Result expression.',
          hintIt: "Un operatore postfix su un'espressione Result.",
          onKeywordFound:
            'Right, the {found} operator -- short-circuits on Err with optional From conversion.',
          onKeywordMissing:
            'Use the {expected} operator -- expr? returns the error early or unwraps Ok.',
        },
        {
          ai: 'What crate makes defining custom error types ergonomic for library code?',
          aiIt: 'Quale crate rende ergonomica la definizione di tipi di errore custom per il codice di libreria?',
          expectedKeywords: ['thiserror'],
          hint: 'A derive-based error definition crate for libraries.',
          hintIt: 'Un crate basato su derive per definire errori in libreria.',
          onKeywordFound:
            'Right, {found} -- derive-based, idiomatic for libraries. Pair with anyhow in apps.',
          onKeywordMissing:
            'Use {expected} -- derive-based custom errors for libraries; pair with anyhow at app level.',
        },
        {
          ai: 'What if we just want a simple, dynamic error type for an application?',
          aiIt: "E se vogliamo solo un tipo di errore semplice e dinamico per un'applicazione?",
          expectedKeywords: ['anyhow'],
          hint: 'A boxed dynamic error crate ideal for apps.',
          hintIt: 'Un crate per errori dinamici boxed ideale per le app.',
          onKeywordFound:
            'Right, {found}::Result<T> for application code -- bubble anything with ? without ceremony.',
          onKeywordMissing:
            'Use {expected} -- boxed dyn errors with great ergonomics, perfect for application code.',
        },
      ],
      summary: {
        en: 'Practiced Rust error vocabulary: Result, panic, ?, thiserror, anyhow.',
        it: 'Praticato il vocabolario di errori Rust: Result, panic, ?, thiserror, anyhow.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  CLOUD COMPUTING
  // ═══════════════════════════════════════════════════════
  'cloud-computing': [
    {
      id: 'cloud-s3-design',
      title: 'S3 Bucket Design',
      titleIt: 'Design di un Bucket S3',
      context: 'storage',
      difficulty: 2,
      turns: [
        {
          ai: "We're putting customer documents in S3. What's the top-level container we create?",
          aiIt: "Stiamo mettendo documenti dei clienti in S3. Qual e' il container di top-level che creiamo?",
          expectedKeywords: ['bucket'],
          hint: 'The S3 namespace for objects.',
          hintIt: 'Il namespace S3 per gli oggetti.',
          onKeywordFound: 'Right, an S3 {found} -- globally unique name, region-scoped storage.',
          onKeywordMissing:
            "It's a {expected} -- the top-level container in S3, with a globally unique name.",
        },
        {
          ai: 'How do we make sure no public reads are allowed accidentally?',
          aiIt: 'Come ci assicuriamo che nessuna lettura pubblica sia permessa per sbaglio?',
          expectedKeywords: ['policy', 'bucket policy'],
          hint: 'A JSON document attached to the bucket controlling access.',
          hintIt: "Un documento JSON allegato al bucket che controlla l'accesso.",
          onKeywordFound:
            'Right, a strict bucket {found} plus Block Public Access on the account level.',
          onKeywordMissing:
            'Use a strict bucket {expected} -- JSON document denying public; turn on Block Public Access.',
        },
        {
          ai: 'What setting ensures the data is protected at rest?',
          aiIt: 'Quale impostazione assicura che i dati siano protetti a riposo?',
          expectedKeywords: ['encryption', 'sse'],
          hint: 'AES-256 or KMS-managed keys server-side.',
          hintIt: 'Chiavi AES-256 o gestite da KMS server-side.',
          onKeywordFound:
            'Right, server-side {found} with KMS keys -- enforce it as a default at the bucket level.',
          onKeywordMissing:
            'Enable server-side {expected} -- SSE-S3 or SSE-KMS, enforced at bucket level.',
        },
        {
          ai: 'How do we keep old versions of documents in case someone deletes one?',
          aiIt: 'Come teniamo le vecchie versioni dei documenti nel caso qualcuno ne cancelli una?',
          expectedKeywords: ['versioning'],
          hint: 'A bucket-level feature that preserves all object writes.',
          hintIt: 'Una feature a livello di bucket che preserva tutte le scritture degli oggetti.',
          onKeywordFound:
            'Right, enable {found} on the bucket -- protects against accidental delete and overwrite.',
          onKeywordMissing:
            'Enable {expected} on the bucket -- it preserves every prior version of every object.',
        },
        {
          ai: 'Last thing: how do we move old documents to cheaper storage automatically?',
          aiIt: "Ultima cosa: come spostiamo automaticamente i documenti vecchi su storage piu' economico?",
          expectedKeywords: ['lifecycle'],
          hint: 'Rules that transition objects between storage classes by age.',
          hintIt: "Regole che fanno transizionare oggetti tra classi di storage per eta'.",
          onKeywordFound:
            'Right, a {found} rule transitions objects to Glacier after 90 days. Saves a lot of money.',
          onKeywordMissing:
            'Use {expected} rules -- automatically move objects to cheaper tiers like Glacier after N days.',
        },
      ],
      summary: {
        en: 'Practiced S3 vocabulary: bucket, bucket policy, encryption, versioning, lifecycle.',
        it: 'Praticato il vocabolario S3: bucket, bucket policy, encryption, versioning, lifecycle.',
      },
    },
    {
      id: 'cloud-iam-priv',
      title: 'IAM Least Privilege',
      titleIt: 'IAM Least Privilege',
      context: 'iam',
      difficulty: 2,
      turns: [
        {
          ai: 'Our deploy script uses a key with full admin. What identity should we attach to EC2 instead?',
          aiIt: "Il nostro deploy script usa una chiave con full admin. Quale identita' dovremmo attaccare invece a EC2?",
          expectedKeywords: ['role', 'iam role'],
          hint: 'An identity assumed by services with no long-lived credentials.',
          hintIt: "Un'identita assunta dai servizi senza credenziali long-lived.",
          onKeywordFound:
            'Right, an IAM {found} -- no static keys, AWS rotates credentials automatically.',
          onKeywordMissing:
            'Use an IAM {expected} -- no static credentials; AWS rotates short-lived ones automatically.',
        },
        {
          ai: 'How do we declare the exact actions and resources allowed?',
          aiIt: 'Come dichiariamo le azioni e le risorse esatte permesse?',
          expectedKeywords: ['policy'],
          hint: 'A JSON document with Effect, Action, Resource fields.',
          hintIt: 'Un documento JSON con campi Effect, Action, Resource.',
          onKeywordFound:
            'Right, an IAM {found} -- JSON listing exact Action/Resource pairs. Avoid wildcards.',
          onKeywordMissing:
            'Define an IAM {expected} -- JSON specifying Action and Resource explicitly, no wildcards.',
        },
        {
          ai: 'Who or what is granted permissions in IAM speak?',
          aiIt: 'Chi o cosa riceve i permessi in linguaggio IAM?',
          expectedKeywords: ['principal'],
          hint: 'The entity (user, role, service) that the policy applies to.',
          hintIt: "L'entita (user, role, service) a cui si applica la policy.",
          onKeywordFound: 'Right, the {found} -- could be a user, role, or AWS service identity.',
          onKeywordMissing:
            "It's a {expected} -- a user, role, or service to which the policy is attached.",
        },
        {
          ai: 'Our team is large -- how do we manage permissions for many users at once?',
          aiIt: "Il nostro team e' grande -- come gestiamo i permessi per molti utenti contemporaneamente?",
          expectedKeywords: ['group', 'iam group'],
          hint: 'A collection of IAM users sharing a policy set.',
          hintIt: 'Una collezione di utenti IAM che condividono un insieme di policy.',
          onKeywordFound:
            'Right, IAM {found}s -- attach policies to the group, add users to it. Cleaner than per-user.',
          onKeywordMissing:
            'Use IAM {expected}s -- attach policies once, add users in. Avoid attaching policies to individual users.',
        },
        {
          ai: "What's the guiding principle we should always follow?",
          aiIt: "Qual e' il principio guida che dovremmo sempre seguire?",
          expectedKeywords: ['least privilege'],
          hint: 'Granting only the permissions needed, nothing more.',
          hintIt: 'Concedere solo i permessi necessari, nulla di piu.',
          onKeywordFound:
            "Right, {found} -- start from zero permissions and add only what's needed.",
          onKeywordMissing:
            "It's {expected} -- minimal necessary permissions only; start at zero and add deliberately.",
        },
      ],
      summary: {
        en: 'Practiced IAM vocabulary: role, policy, principal, group, least privilege.',
        it: 'Praticato il vocabolario IAM: role, policy, principal, group, least privilege.',
      },
    },
    {
      id: 'cloud-cost-opt',
      title: 'Cost Optimization Review',
      titleIt: 'Revisione Ottimizzazione dei Costi',
      context: 'finops',
      difficulty: 3,
      turns: [
        {
          ai: 'Cloud bill is up 40%. For workloads we know will run 24/7, what commitment-based discount should we use?',
          aiIt: "La cloud bill e' su del 40%. Per workload che sappiamo gireranno 24/7, quale sconto basato su commitment dovremmo usare?",
          expectedKeywords: ['reserved instance', 'reserved'],
          hint: 'A 1- or 3-year capacity commitment in exchange for a deep discount.',
          hintIt: 'Un commitment di capacita di 1 o 3 anni in cambio di un grande sconto.',
          onKeywordFound:
            'Right, {found}s -- up to 72% off. Lock in only steady baseline workloads.',
          onKeywordMissing:
            'Use {expected} instances -- 1- or 3-year commitment, up to 72% discount.',
        },
        {
          ai: 'Newer flexible alternative for compute that works across instance families?',
          aiIt: "Alternativa piu' flessibile per il compute che funziona su diverse famiglie di istanze?",
          expectedKeywords: ['savings plan', 'savings'],
          hint: 'A more flexible commitment based on $/hour usage.',
          hintIt: 'Un commitment piu flessibile basato su uso $/ora.',
          onKeywordFound:
            'Right, a {found} -- discount applies across families and regions for compute. More flexible than RIs.',
          onKeywordMissing:
            'Use a {expected} -- commit to $/hr; applies flexibly across instance families and even Lambda.',
        },
        {
          ai: 'For batch and fault-tolerant work, what spare-capacity option gives huge discounts?',
          aiIt: 'Per lavoro batch e fault-tolerant, quale opzione di capacita spare da grandi sconti?',
          expectedKeywords: ['spot instance', 'spot'],
          hint: 'Bidding on spare capacity that can be reclaimed.',
          hintIt: 'Fare offerte su capacita spare che puo essere richiamata.',
          onKeywordFound:
            'Right, {found} instances -- up to 90% off, but cloud may reclaim with 2-min notice. Great for batch.',
          onKeywordMissing:
            'Use {expected} instances -- spare capacity at up to 90% off; can be interrupted with 2-min warning.',
        },
        {
          ai: "What's the broader cultural practice covering cost visibility and ownership?",
          aiIt: "Qual e' la pratica culturale piu ampia che copre visibilita e ownership dei costi?",
          expectedKeywords: ['finops'],
          hint: 'The cross-functional cloud financial management discipline.',
          hintIt: 'La disciplina cross-funzionale di financial management per il cloud.',
          onKeywordFound:
            'Right, {found} -- engineers and finance collaborating on cloud spend ownership.',
          onKeywordMissing:
            "It's {expected} -- the practice of bringing engineering and finance together to manage cloud spend.",
        },
        {
          ai: 'How do we attribute spend so each team owns their bill?',
          aiIt: "Come attribuiamo la spesa cosi' che ogni team possieda la sua bill?",
          expectedKeywords: ['tag', 'tagging'],
          hint: 'Key-value labels on every resource.',
          hintIt: 'Etichette chiave-valore su ogni risorsa.',
          onKeywordFound:
            'Right, mandatory {found}s on every resource -- team, env, cost-center -- enforced via SCPs.',
          onKeywordMissing:
            'Enforce {expected}s -- key/value labels (team, env, cost-center) mandatory on every resource.',
        },
      ],
      summary: {
        en: 'Practiced cloud FinOps vocabulary: reserved instance, savings plan, spot, FinOps, tagging.',
        it: 'Praticato il vocabolario FinOps cloud: reserved instance, savings plan, spot, FinOps, tagging.',
      },
    },
    {
      id: 'cloud-intro',
      title: 'New to Cloud',
      titleIt: 'Nuovo al Cloud',
      context: 'basics',
      difficulty: 1,
      turns: [
        {
          ai: "Hi, I'm just starting on AWS. What do we call the virtual machine equivalent in cloud?",
          aiIt: "Ciao, sto iniziando con AWS. Come si chiama l'equivalente di macchina virtuale nel cloud?",
          expectedKeywords: ['vm', 'virtual machine', 'instance'],
          hint: 'A virtualized server you provision and manage.',
          hintIt: 'Un server virtualizzato che si provisiona e gestisce.',
          onKeywordFound:
            "Right, a {found} -- in AWS it's called EC2, in Azure it's a VM, in GCP it's Compute Engine.",
          onKeywordMissing:
            "It's a {expected} -- EC2 in AWS, VM in Azure, Compute Engine in GCP. Same idea everywhere.",
        },
        {
          ai: 'Resources live in geographic locations. What do we call those?',
          aiIt: 'Le risorse vivono in location geografiche. Come le chiamiamo?',
          expectedKeywords: ['region'],
          hint: 'A geographic area like eu-west-1 or us-east-1.',
          hintIt: "Un'area geografica come eu-west-1 o us-east-1.",
          onKeywordFound:
            'Right, {found}s -- pick one close to your users for latency, and avoid lock-in to just one.',
          onKeywordMissing:
            "It's a {expected} -- geographic area like eu-west-1; pick close to users to reduce latency.",
        },
        {
          ai: 'Within a region there are isolated datacenters. What are those called?',
          aiIt: 'Dentro una regione ci sono datacenter isolati. Come si chiamano?',
          expectedKeywords: ['availability zone', 'az'],
          hint: 'A failure-isolated datacenter cluster within a region.',
          hintIt: 'Un cluster di datacenter isolato dai guasti dentro una regione.',
          onKeywordFound:
            'Right, an {found} -- spread workloads across two or three for HA inside a region.',
          onKeywordMissing:
            "It's an {expected} -- spread workloads across multiple AZs for high availability.",
        },
        {
          ai: 'When we rent VMs and storage but manage the OS ourselves, what model is that?',
          aiIt: "Quando affittiamo VM e storage ma gestiamo l'OS noi, che modello e'?",
          expectedKeywords: ['iaas'],
          hint: 'Infrastructure as a Service.',
          hintIt: 'Infrastructure as a Service.',
          onKeywordFound: 'Right, {found} -- you manage the OS and up; the cloud handles hardware.',
          onKeywordMissing:
            "It's {expected} -- Infrastructure as a Service; you manage OS and apps, cloud handles hardware.",
        },
        {
          ai: 'And when we just upload code and the cloud runs it on demand?',
          aiIt: 'E quando carichiamo solo il codice e il cloud lo esegue on-demand?',
          expectedKeywords: ['serverless', 'faas'],
          hint: 'Functions-as-a-Service or fully managed compute.',
          hintIt: 'Functions-as-a-Service o compute completamente gestito.',
          onKeywordFound:
            'Right, {found} -- AWS Lambda, GCP Cloud Run; you pay per invocation, not for idle.',
          onKeywordMissing:
            "It's {expected} -- pay per invocation, no servers to manage; AWS Lambda, GCP Cloud Run.",
        },
      ],
      summary: {
        en: 'Practiced cloud basics: VM, region, availability zone, IaaS, serverless.',
        it: 'Praticato le basi cloud: VM, region, availability zone, IaaS, serverless.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  NETWORKING
  // ═══════════════════════════════════════════════════════
  networking: [
    {
      id: 'net-dns-debug',
      title: 'DNS Issue Debugging',
      titleIt: 'Debug di un Problema DNS',
      context: 'dns',
      difficulty: 1,
      turns: [
        {
          ai: "Users report they can't reach api.example.com. What system translates names to IPs?",
          aiIt: 'Gli utenti dicono di non poter raggiungere api.example.com. Quale sistema traduce nomi in IP?',
          expectedKeywords: ['dns'],
          hint: 'The Domain Name System.',
          hintIt: 'Il Domain Name System.',
          onKeywordFound:
            'Right, {found} -- start with dig or nslookup against the authoritative server.',
          onKeywordMissing:
            "It's {expected} -- the Domain Name System. Start with dig or nslookup.",
        },
        {
          ai: 'What kind of DNS record maps a hostname to an IPv4 address?',
          aiIt: 'Che tipo di record DNS mappa un hostname a un indirizzo IPv4?',
          expectedKeywords: ['a record', 'a'],
          hint: 'The basic IPv4 hostname-to-address record type.',
          hintIt: 'Il tipo base di record hostname-IPv4.',
          onKeywordFound: 'Right, the {found} record. AAAA is the IPv6 equivalent.',
          onKeywordMissing: "It's an {expected} record -- maps name to IPv4; AAAA does IPv6.",
        },
        {
          ai: "What server actually answers a client's DNS query?",
          aiIt: 'Quale server risponde realmente alla query DNS di un client?',
          expectedKeywords: ['resolver'],
          hint: 'The recursive DNS server clients query first.',
          hintIt: 'Il server DNS ricorsivo che i client interrogano per primo.',
          onKeywordFound: 'Right, the {found} -- it walks the hierarchy and caches results.',
          onKeywordMissing:
            "It's the recursive {expected} -- queries root, TLD, authoritative servers and caches.",
        },
        {
          ai: 'Why might a record change not show up immediately for everyone?',
          aiIt: "Perche' un cambio di record potrebbe non comparire subito per tutti?",
          expectedKeywords: ['ttl', 'cache'],
          hint: 'A field telling resolvers how long to cache.',
          hintIt: 'Un campo che dice ai resolver per quanto cachare.',
          onKeywordFound:
            'Right, the {found} -- old values stay cached until it expires across resolvers.',
          onKeywordMissing:
            'Because of the {expected} -- resolvers cache the old value until it expires.',
        },
        {
          ai: 'What command should we run to check what authoritative servers say right now?',
          aiIt: 'Quale comando dovremmo eseguire per controllare cosa dicono i server autoritativi adesso?',
          expectedKeywords: ['dig'],
          hint: 'The standard command-line DNS query tool.',
          hintIt: 'Il tool standard CLI per query DNS.',
          onKeywordFound:
            'Right, {found} @8.8.8.8 api.example.com bypasses local cache for a fresh look.',
          onKeywordMissing:
            'Use {expected} -- dig @8.8.8.8 host bypasses local cache and queries directly.',
        },
      ],
      summary: {
        en: 'Practiced DNS vocabulary: DNS, A record, resolver, TTL, dig.',
        it: 'Praticato il vocabolario DNS: DNS, A record, resolver, TTL, dig.',
      },
    },
    {
      id: 'net-subnet-design',
      title: 'Subnet Design Discussion',
      titleIt: 'Discussione sul Design delle Subnet',
      context: 'design',
      difficulty: 2,
      turns: [
        {
          ai: "We're designing the VPC. What notation expresses an IP range like 10.0.0.0/16?",
          aiIt: 'Stiamo progettando il VPC. Quale notazione esprime un range IP come 10.0.0.0/16?',
          expectedKeywords: ['cidr'],
          hint: 'Classless Inter-Domain Routing notation.',
          hintIt: 'Notazione Classless Inter-Domain Routing.',
          onKeywordFound: 'Right, {found} -- the suffix tells you how many bits are network.',
          onKeywordMissing:
            "It's {expected} -- network/prefix-length, where prefix says how many bits are network.",
        },
        {
          ai: 'Within /16, we want smaller groups for different tiers. What are those called?',
          aiIt: "Dentro al /16, vogliamo gruppi piu' piccoli per diversi tier. Come si chiamano?",
          expectedKeywords: ['subnet'],
          hint: 'A smaller IP range carved out of a larger one.',
          hintIt: 'Un range IP piu piccolo ricavato da uno piu grande.',
          onKeywordFound:
            'Right, {found}s -- typically /24 each. One per AZ per tier is the common layout.',
          onKeywordMissing: 'Carve out {expected}s -- typically /24 each, one per AZ per tier.',
        },
        {
          ai: 'How do we segment broadcast domains at layer 2 within an old datacenter switch?',
          aiIt: 'Come segmentiamo i domini broadcast a layer 2 dentro un vecchio switch di datacenter?',
          expectedKeywords: ['vlan'],
          hint: 'A virtual layer-2 segmentation tagged with 802.1Q.',
          hintIt: 'Una segmentazione virtuale layer-2 taggata con 802.1Q.',
          onKeywordFound:
            'Right, {found}s -- 802.1Q tags split one physical switch into many broadcast domains.',
          onKeywordMissing:
            'Use {expected}s -- 802.1Q tags isolate broadcast domains on the same physical switch.',
        },
        {
          ai: 'What device routes between subnets at layer 3?',
          aiIt: 'Quale device instrada tra subnet a layer 3?',
          expectedKeywords: ['router', 'gateway'],
          hint: 'A layer-3 device forwarding packets between networks.',
          hintIt: 'Un device layer-3 che inoltra pacchetti tra reti.',
          onKeywordFound: "Right, a {found} -- in cloud it's a virtual router or transit gateway.",
          onKeywordMissing:
            "It's a {expected} -- virtual router or transit gateway in cloud-speak.",
        },
        {
          ai: 'We need to control which traffic flows between subnets. What primitive enforces it?',
          aiIt: 'Dobbiamo controllare quale traffico fluisce tra subnet. Quale primitiva lo impone?',
          expectedKeywords: ['acl', 'security group'],
          hint: 'Network ACLs at subnet level or Security Groups at instance level.',
          hintIt: 'Network ACL a livello subnet o Security Group a livello istanza.',
          onKeywordFound:
            'Right, an {found} -- stateless at subnet level (NACL) or stateful at instance level (SG).',
          onKeywordMissing:
            'Use a network {expected} -- NACL is stateless at subnet level; security group is stateful at instance.',
        },
      ],
      summary: {
        en: 'Practiced networking design vocabulary: CIDR, subnet, VLAN, router, ACL.',
        it: 'Praticato il vocabolario di design di rete: CIDR, subnet, VLAN, router, ACL.',
      },
    },
    {
      id: 'net-bgp',
      title: 'BGP Route Propagation',
      titleIt: 'Propagazione di Route BGP',
      context: 'routing',
      difficulty: 3,
      turns: [
        {
          ai: "We're peering with a new ISP. What protocol exchanges routes between autonomous systems?",
          aiIt: 'Stiamo facendo peering con un nuovo ISP. Quale protocollo scambia route tra sistemi autonomi?',
          expectedKeywords: ['bgp'],
          hint: 'Border Gateway Protocol.',
          hintIt: 'Border Gateway Protocol.',
          onKeywordFound:
            'Right, {found} -- the path-vector protocol that holds the internet together.',
          onKeywordMissing:
            "It's {expected} -- the Border Gateway Protocol, the inter-domain routing backbone.",
        },
        {
          ai: 'What do we call our routing domain identified by ASN 65001?',
          aiIt: "Come chiamiamo il nostro dominio di routing identificato dall'ASN 65001?",
          expectedKeywords: ['as', 'autonomous system'],
          hint: 'A unique routing domain in the BGP world.',
          hintIt: 'Un dominio di routing unico nel mondo BGP.',
          onKeywordFound:
            'Right, our {found} -- a single administrative routing domain identified by its ASN.',
          onKeywordMissing:
            "It's our {expected} -- an Autonomous System; identified by an ASN, advertised in BGP.",
        },
        {
          ai: "What's the BGP relationship we establish with the new ISP?",
          aiIt: "Qual e' la relazione BGP che stabiliamo con il nuovo ISP?",
          expectedKeywords: ['peer', 'peering'],
          hint: 'A neighbor relationship over a TCP session.',
          hintIt: 'Una relazione di vicinato su una sessione TCP.',
          onKeywordFound: 'Right, a BGP {found}ing -- TCP/179 session exchanging UPDATE messages.',
          onKeywordMissing:
            "It's a BGP {expected} -- a TCP session for exchanging route advertisements.",
        },
        {
          ai: 'Which attribute helps prevent routing loops in BGP?',
          aiIt: 'Quale attributo aiuta a prevenire loop di routing in BGP?',
          expectedKeywords: ['as_path', 'as path'],
          hint: 'A list of ASNs the route has traversed.',
          hintIt: 'Una lista di ASN che la route ha attraversato.',
          onKeywordFound:
            'Right, the {found} -- if you see your own ASN in it, drop the route to prevent loops.',
          onKeywordMissing:
            "It's the {expected} -- list of ASNs traversed; if your ASN appears, the route is dropped.",
        },
        {
          ai: 'We want to prefer one ISP over another for outbound traffic. What attribute tunes that?',
          aiIt: "Vogliamo preferire un ISP rispetto all'altro per il traffico outbound. Quale attributo lo regola?",
          expectedKeywords: ['local preference', 'local pref'],
          hint: 'A BGP attribute setting outbound preference.',
          hintIt: 'Un attributo BGP che imposta la preferenza outbound.',
          onKeywordFound:
            'Right, {found} -- higher value wins; only meaningful inside your own AS.',
          onKeywordMissing:
            'Use {expected} -- higher = preferred; influences outbound path selection within your AS.',
        },
      ],
      summary: {
        en: 'Practiced BGP vocabulary: BGP, AS, peer, AS_PATH, local preference.',
        it: 'Praticato il vocabolario BGP: BGP, AS, peer, AS_PATH, local preference.',
      },
    },
    {
      id: 'net-wireshark',
      title: 'Wireshark Capture Review',
      titleIt: 'Revisione di una Cattura Wireshark',
      context: 'analysis',
      difficulty: 2,
      turns: [
        {
          ai: 'API calls are timing out. What tool do we use to record traffic on the wire?',
          aiIt: 'Le chiamate API vanno in timeout. Quale strumento usiamo per registrare il traffico sulla rete?',
          expectedKeywords: ['wireshark', 'tcpdump'],
          hint: 'Either a GUI or CLI capture tool.',
          hintIt: 'Uno strumento GUI o CLI per la cattura.',
          onKeywordFound: 'Right, {found} or tcpdump on the server -- save to pcap and analyze.',
          onKeywordMissing: 'Use {expected} or tcpdump -- save a pcap file and dig in.',
        },
        {
          ai: 'What do we call each unit of network data we record?',
          aiIt: "Come chiamiamo ogni unita' di dati di rete che registriamo?",
          expectedKeywords: ['packet'],
          hint: 'A single discrete unit on the network.',
          hintIt: 'Una singola unita discreta sulla rete.',
          onKeywordFound: 'Right, a {found} -- each one has headers per layer plus payload.',
          onKeywordMissing:
            "It's a {expected} -- the discrete network unit, with stacked headers per layer.",
        },
        {
          ai: 'We see lots of TCP retransmissions. What does each row in Wireshark represent at OSI layer 4?',
          aiIt: 'Vediamo molte ritrasmissioni TCP. Cosa rappresenta ogni riga in Wireshark al layer OSI 4?',
          expectedKeywords: ['protocol'],
          hint: 'The TCP/UDP layer rules a packet follows.',
          hintIt: 'Le regole TCP/UDP che un pacchetto segue.',
          onKeywordFound:
            'Right, the {found} -- TCP shows retransmissions and ACK behavior; UDP is fire-and-forget.',
          onKeywordMissing:
            "It's the transport {expected} -- TCP gives you ACKs and retransmits, UDP doesn't.",
        },
        {
          ai: 'What feature lets us narrow Wireshark to only HTTP traffic from one IP?',
          aiIt: 'Quale feature ci permette di restringere Wireshark al solo traffico HTTP da un IP?',
          expectedKeywords: ['filter'],
          hint: 'An expression like ip.addr == 10.0.0.5 && http.',
          hintIt: "Un'espressione come ip.addr == 10.0.0.5 && http.",
          onKeywordFound: 'Right, a display {found} -- crucial for huge captures.',
          onKeywordMissing:
            'Use a display {expected} -- ip.addr == X && http narrows to relevant rows.',
        },
        {
          ai: "Last thing: TCP shows a SYN with no SYN-ACK back. What's broken?",
          aiIt: "Ultima cosa: TCP mostra una SYN senza SYN-ACK di ritorno. Cosa e' rotto?",
          expectedKeywords: ['handshake', 'three-way'],
          hint: 'The three-way TCP setup.',
          hintIt: 'Il setup TCP a tre vie.',
          onKeywordFound:
            'Right, the TCP three-way {found} is failing -- check firewalls and security groups.',
          onKeywordMissing:
            'The TCP three-way {expected} is failing -- SYN, SYN-ACK, ACK; SYN-ACK missing means firewall or routing issue.',
        },
      ],
      summary: {
        en: 'Practiced packet analysis: Wireshark, packet, protocol, filter, three-way handshake.',
        it: "Praticato l'analisi dei pacchetti: Wireshark, packet, protocol, filter, three-way handshake.",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  DATABASES
  // ═══════════════════════════════════════════════════════
  databases: [
    {
      id: 'db-slow-query',
      title: 'Slow Query Investigation',
      titleIt: 'Investigazione Query Lenta',
      context: 'performance',
      difficulty: 2,
      turns: [
        {
          ai: 'This SELECT now takes 8 seconds. What database object speeds up lookups by avoiding full table scans?',
          aiIt: 'Questa SELECT ora impiega 8 secondi. Quale oggetto del database velocizza le lookup evitando full table scan?',
          expectedKeywords: ['index'],
          hint: 'A B-tree or hash structure on one or more columns.',
          hintIt: 'Una struttura B-tree o hash su una o piu colonne.',
          onKeywordFound:
            'Right, an {found} -- typically B-tree on the WHERE columns. Costs writes but transforms reads.',
          onKeywordMissing:
            'Add an {expected} -- B-tree on the WHERE columns; trades write speed for fast lookups.',
        },
        {
          ai: 'Before adding one, what command shows how the planner currently executes the query?',
          aiIt: 'Prima di aggiungerne uno, quale comando mostra come il planner attualmente esegue la query?',
          expectedKeywords: ['explain'],
          hint: 'A SQL command that displays the execution plan.',
          hintIt: 'Un comando SQL che mostra il piano di esecuzione.',
          onKeywordFound:
            'Right, {found} ANALYZE shows actual times -- look for Seq Scans on big tables.',
          onKeywordMissing:
            'Run {expected} ANALYZE -- shows actual execution time and looks for Seq Scans.',
        },
        {
          ai: "What's the strategy the database chose internally to run this query called?",
          aiIt: 'Come si chiama la strategia che il database ha scelto internamente per eseguire questa query?',
          expectedKeywords: ['query plan', 'execution plan'],
          hint: 'The tree of operations EXPLAIN reveals.',
          hintIt: "L'albero di operazioni che EXPLAIN rivela.",
          onKeywordFound:
            'Right, the {found} -- a tree of joins, scans, sorts. Optimize the most expensive node first.',
          onKeywordMissing:
            "It's the {expected} -- the tree EXPLAIN shows; optimize the most expensive node first.",
        },
        {
          ai: "We're seeing nested loop joins on huge tables. What other join algorithm might be faster?",
          aiIt: "Vediamo nested loop join su tabelle enormi. Quale altro algoritmo di join potrebbe essere piu' veloce?",
          expectedKeywords: ['hash join', 'merge join'],
          hint: 'A hash-table-based join or a sort-merge join.',
          hintIt: 'Un join basato su hash table o un sort-merge join.',
          onKeywordFound:
            "Right, a {found} is usually better for big tables -- check work_mem if the planner won't pick it.",
          onKeywordMissing:
            'Try a {expected} -- often better than nested loops for large tables; tune work_mem to enable it.',
        },
        {
          ai: 'What happens if we ANALYZE without enough stats?',
          aiIt: 'Cosa succede se ANALYZE non ha abbastanza statistiche?',
          expectedKeywords: ['statistics', 'stats'],
          hint: 'Cardinality estimates the planner uses.',
          hintIt: 'Stime di cardinalita che il planner usa.',
          onKeywordFound:
            'Right, stale {found} -- the planner picks the wrong plan. Run ANALYZE regularly.',
          onKeywordMissing:
            'Outdated {expected} cause bad plans -- run ANALYZE periodically or via auto-analyze.',
        },
      ],
      summary: {
        en: 'Practiced query tuning vocabulary: index, EXPLAIN, query plan, hash join, statistics.',
        it: 'Praticato il vocabolario di tuning query: index, EXPLAIN, query plan, hash join, statistics.',
      },
    },
    {
      id: 'db-choose-db',
      title: 'Choosing the Right DB',
      titleIt: 'Scegliere il DB Giusto',
      context: 'design',
      difficulty: 1,
      turns: [
        {
          ai: "We need to pick a database for our new service. What's the family known for fixed schemas and relational tables?",
          aiIt: "Dobbiamo scegliere un database per il nostro nuovo servizio. Qual e' la famiglia nota per schemi fissi e tabelle relazionali?",
          expectedKeywords: ['sql', 'relational'],
          hint: 'SQL databases like PostgreSQL or MySQL.',
          hintIt: 'Database SQL come PostgreSQL o MySQL.',
          onKeywordFound:
            'Right, {found} databases like PostgreSQL -- best when relations and transactions matter.',
          onKeywordMissing:
            "It's {expected} -- relational databases like PostgreSQL or MySQL; great for relations and transactions.",
        },
        {
          ai: 'And the alternative family with flexible schemas?',
          aiIt: 'E la famiglia alternativa con schemi flessibili?',
          expectedKeywords: ['nosql'],
          hint: 'Document, key-value, or wide-column stores.',
          hintIt: 'Document store, key-value, o wide-column.',
          onKeywordFound:
            'Right, {found} -- MongoDB, DynamoDB, Cassandra each fit different shapes of data.',
          onKeywordMissing:
            "It's {expected} -- MongoDB, DynamoDB, Cassandra; flexible schemas, often horizontally scalable.",
        },
        {
          ai: 'What property guarantees our financial transactions are reliable?',
          aiIt: "Quale proprieta' garantisce che le nostre transazioni finanziarie siano affidabili?",
          expectedKeywords: ['acid'],
          hint: 'Atomicity, Consistency, Isolation, Durability.',
          hintIt: 'Atomicity, Consistency, Isolation, Durability.',
          onKeywordFound:
            'Right, {found} -- Atomicity, Consistency, Isolation, Durability. Non-negotiable for money.',
          onKeywordMissing:
            "It's {expected} -- Atomicity, Consistency, Isolation, Durability; mandatory for financial data.",
        },
        {
          ai: "What's the looser model some distributed NoSQL systems offer instead?",
          aiIt: "Qual e' il modello piu' permissivo che alcuni sistemi NoSQL distribuiti offrono invece?",
          expectedKeywords: ['eventual consistency', 'eventual'],
          hint: 'Replicas converge over time, not instantly.',
          hintIt: 'Le repliche convergono nel tempo, non istantaneamente.',
          onKeywordFound:
            'Right, {found} -- replicas converge over time; trade strict for higher availability.',
          onKeywordMissing:
            "It's {expected} consistency -- replicas converge over time; trades strict reads for availability.",
        },
        {
          ai: "What's the SQL operation joining two tables on a related key?",
          aiIt: "Qual e' l'operazione SQL che unisce due tabelle su una chiave correlata?",
          expectedKeywords: ['join'],
          hint: 'Combining rows from multiple tables.',
          hintIt: 'Combinare righe da piu tabelle.',
          onKeywordFound:
            'Right, a {found} -- relational power but expensive at scale; denormalize in NoSQL.',
          onKeywordMissing:
            "It's a {expected} -- combine rows on a key; powerful in SQL, expensive at scale.",
        },
      ],
      summary: {
        en: 'Practiced DB selection vocabulary: SQL, NoSQL, ACID, eventual consistency, JOIN.',
        it: 'Praticato il vocabolario di selezione DB: SQL, NoSQL, ACID, eventual consistency, JOIN.',
      },
    },
    {
      id: 'db-sharding',
      title: 'Sharding Strategy',
      titleIt: 'Strategia di Sharding',
      context: 'scaling',
      difficulty: 3,
      turns: [
        {
          ai: "Our 10TB Postgres can't keep up. What scaling technique splits data horizontally across many DBs?",
          aiIt: 'Il nostro Postgres da 10TB non ce la fa. Quale tecnica di scaling divide i dati orizzontalmente su tanti DB?',
          expectedKeywords: ['sharding', 'shard'],
          hint: 'Splitting one logical DB into N physical ones.',
          hintIt: 'Dividere un DB logico in N fisici.',
          onKeywordFound:
            "Right, {found} -- but it's a one-way trip; design carefully and reversibility is hard.",
          onKeywordMissing:
            "It's {expected} -- splitting data across N physical DBs; massive scale, but architecturally heavy.",
        },
        {
          ai: 'Each individual chunk of split data is called what?',
          aiIt: 'Ogni singolo chunk di dati divisi come si chiama?',
          expectedKeywords: ['partition'],
          hint: 'A subset of the rows, often by hash or range.',
          hintIt: 'Un sottoinsieme delle righe, spesso per hash o range.',
          onKeywordFound:
            'Right, a {found} -- can be hash-based, range-based, or list-based depending on access patterns.',
          onKeywordMissing:
            "It's a {expected} -- a slice of the rows; choose hash, range, or list strategy.",
        },
        {
          ai: 'What column do we use to decide which shard a row lives on?',
          aiIt: 'Quale colonna usiamo per decidere su quale shard vive una riga?',
          expectedKeywords: ['shard key', 'partition key'],
          hint: 'A column hashed or ranged to map rows to shards.',
          hintIt: 'Una colonna hashata o range per mappare righe agli shard.',
          onKeywordFound:
            'Right, the {found} -- pick one with high cardinality and even distribution. tenant_id is a classic.',
          onKeywordMissing:
            'Pick a {expected} -- high cardinality, even distribution; tenant_id is the classic choice.',
        },
        {
          ai: 'What problem do we get if one shard ends up much busier than the others?',
          aiIt: "Quale problema otteniamo se uno shard finisce molto piu' impegnato degli altri?",
          expectedKeywords: ['hotspot', 'hot shard'],
          hint: 'When traffic concentrates on one partition.',
          hintIt: 'Quando il traffico si concentra su una partizione.',
          onKeywordFound:
            'Right, a {found} -- the killer of shard designs. Re-key or salt the load.',
          onKeywordMissing:
            "It's a {expected} -- one shard takes all the traffic; redesign your key or salt the load.",
        },
        {
          ai: 'If we need to add more shards later, what painful operation do we run?',
          aiIt: "Se dobbiamo aggiungere altri shard piu' tardi, quale operazione dolorosa eseguiamo?",
          expectedKeywords: ['resharding', 'rebalance'],
          hint: 'Redistributing rows when shard count changes.',
          hintIt: 'Ridistribuire righe quando il numero di shard cambia.',
          onKeywordFound:
            "Right, {found} -- it's the worst part of operating a sharded system. Plan for it from day one.",
          onKeywordMissing:
            'Painful {expected} -- redistribute data online; plan for it from day one with consistent hashing.',
        },
      ],
      summary: {
        en: 'Practiced sharding vocabulary: sharding, partition, shard key, hotspot, resharding.',
        it: 'Praticato il vocabolario sharding: sharding, partition, shard key, hotspot, resharding.',
      },
    },
    {
      id: 'db-backup-plan',
      title: 'Backup Planning',
      titleIt: 'Pianificazione del Backup',
      context: 'reliability',
      difficulty: 2,
      turns: [
        {
          ai: "Auditors are asking about our DR plan. What's the most basic protection we need to have for the database?",
          aiIt: "Gli auditor chiedono del nostro DR plan. Qual e' la protezione piu basilare che dobbiamo avere per il database?",
          expectedKeywords: ['backup'],
          hint: 'A copy of the data we can restore from.',
          hintIt: 'Una copia dei dati da cui possiamo fare il restore.',
          onKeywordFound:
            "Right, regular {found}s -- but a backup that hasn't been tested isn't really a backup.",
          onKeywordMissing: 'We need {expected}s -- regular, automated, and verified periodically.',
        },
        {
          ai: "And what's the operation that brings the data back from those?",
          aiIt: "E qual e' l'operazione che riporta indietro i dati da quelli?",
          expectedKeywords: ['restore'],
          hint: 'Loading the backup back into a running database.',
          hintIt: 'Caricare il backup di nuovo dentro un database in esecuzione.',
          onKeywordFound:
            "Right, {found} -- and we must run drills regularly. Untested backups don't count.",
          onKeywordMissing:
            "It's a {expected} -- and we must drill it regularly; an untested backup might as well not exist.",
        },
        {
          ai: 'How can we recover to any moment, not just the last nightly snapshot?',
          aiIt: "Come possiamo recuperare a qualsiasi momento, non solo all'ultimo snapshot notturno?",
          expectedKeywords: ['pitr', 'point-in-time'],
          hint: 'Point-in-time recovery using WAL/binlog replay.',
          hintIt: 'Point-in-time recovery usando replay di WAL/binlog.',
          onKeywordFound:
            'Right, {found} -- snapshot plus WAL replay to any second within retention.',
          onKeywordMissing:
            "It's {expected} -- snapshot plus WAL/binlog replay to recover to any moment within retention.",
        },
        {
          ai: "What's our acceptable maximum data loss called in DR jargon?",
          aiIt: 'Come si chiama la massima perdita di dati accettabile nel gergo DR?',
          expectedKeywords: ['rpo', 'recovery point'],
          hint: 'Recovery Point Objective.',
          hintIt: 'Recovery Point Objective.',
          onKeywordFound:
            'Right, the {found} -- with PITR plus 1-min WAL shipping, we can target 5 minutes.',
          onKeywordMissing:
            "It's the {expected} -- Recovery Point Objective; max acceptable data loss in time terms.",
        },
        {
          ai: 'And the maximum time we can be down before we restore?',
          aiIt: 'E il tempo massimo che possiamo essere down prima di fare restore?',
          expectedKeywords: ['rto', 'recovery time'],
          hint: 'Recovery Time Objective.',
          hintIt: 'Recovery Time Objective.',
          onKeywordFound:
            'Right, the {found} -- drives whether you need warm replicas, hot standby, or just nightly backups.',
          onKeywordMissing:
            "It's the {expected} -- Recovery Time Objective; max acceptable downtime drives architecture choice.",
        },
      ],
      summary: {
        en: 'Practiced backup vocabulary: backup, restore, PITR, RPO, RTO.',
        it: 'Praticato il vocabolario di backup: backup, restore, PITR, RPO, RTO.',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════
  //  GIT / VERSION CONTROL
  // ═══════════════════════════════════════════════════════
  'git-vcs': [
    {
      id: 'git-merge-conflict',
      title: 'Merge Conflict Resolution',
      titleIt: 'Risoluzione di un Merge Conflict',
      context: 'merge',
      difficulty: 1,
      turns: [
        {
          ai: "I'm merging main into my feature and git says there are conflicts. What's the operation I'm running?",
          aiIt: "Sto facendo il merge di main nel mio feature e git dice che ci sono conflitti. Qual e' l'operazione che sto eseguendo?",
          expectedKeywords: ['merge'],
          hint: 'Combining histories of two branches.',
          hintIt: 'Combinare le storie di due branch.',
          onKeywordFound: 'Right, a {found} -- creates a merge commit combining both lineages.',
          onKeywordMissing:
            "It's a {expected} -- combines two branch histories with a merge commit.",
        },
        {
          ai: "What do we call the lines git couldn't auto-resolve, marked with <<<<<<< and >>>>>>>?",
          aiIt: 'Come chiamiamo le righe che git non ha potuto auto-risolvere, marcate con <<<<<<< e >>>>>>>?',
          expectedKeywords: ['conflict'],
          hint: 'Overlapping changes git asks you to resolve manually.',
          hintIt: 'Modifiche sovrapposte che git ti chiede di risolvere a mano.',
          onKeywordFound:
            'Right, a {found} -- both branches changed the same lines and git needs you to choose.',
          onKeywordMissing:
            "It's a {expected} -- both sides edited the same region; you pick the right code.",
        },
        {
          ai: "Where is the work-in-progress code I'm conflicting with -- in what kind of branch?",
          aiIt: 'Dove sta il codice work-in-progress con cui sono in conflitto -- in che tipo di branch?',
          expectedKeywords: ['branch'],
          hint: 'A movable pointer to a series of commits.',
          hintIt: 'Un puntatore movibile a una serie di commit.',
          onKeywordFound: 'Right, a feature {found} -- isolated work that gets merged back later.',
          onKeywordMissing: 'On a {expected} -- a movable pointer; isolate work, then merge back.',
        },
        {
          ai: 'After fixing conflicts, what command marks the file as resolved?',
          aiIt: 'Dopo aver fixato i conflitti, quale comando marca il file come risolto?',
          expectedKeywords: ['add'],
          hint: 'The git command that stages a file.',
          hintIt: 'Il comando git che fa lo stage di un file.',
          onKeywordFound: 'Right, git {found} the file -- then git commit to finalize the merge.',
          onKeywordMissing:
            'Run git {expected} <file> -- it stages the resolution; then git commit finishes the merge.',
        },
        {
          ai: 'If I want to bail and start over without the merge, what command undoes it?',
          aiIt: 'Se voglio annullare e ricominciare senza il merge, quale comando lo annulla?',
          expectedKeywords: ['abort', 'merge --abort'],
          hint: 'A git merge flag that returns to pre-merge state.',
          hintIt: 'Un flag di git merge che torna allo stato pre-merge.',
          onKeywordFound:
            'Right, git merge --{found} -- back to where you were before the conflicts.',
          onKeywordMissing: 'Use git merge --{expected} -- safely returns to the pre-merge state.',
        },
      ],
      summary: {
        en: 'Practiced merge vocabulary: merge, conflict, branch, add, abort.',
        it: 'Praticato il vocabolario merge: merge, conflict, branch, add, abort.',
      },
    },
    {
      id: 'git-rebase-vs-merge',
      title: 'Rebase vs Merge Debate',
      titleIt: 'Dibattito Rebase vs Merge',
      context: 'workflow',
      difficulty: 2,
      turns: [
        {
          ai: 'Team is debating workflows. What operation replays my commits on top of the latest main?',
          aiIt: "Il team dibatte sui workflow. Quale operazione riapplica i miei commit sopra l'ultimo main?",
          expectedKeywords: ['rebase'],
          hint: 'A way to keep history linear by re-applying commits.',
          hintIt: 'Un modo per tenere la storia lineare riapplicando i commit.',
          onKeywordFound:
            'Right, {found} -- linear history, but you rewrite your commit hashes in the process.',
          onKeywordMissing:
            "It's {expected} -- replays your commits on top of the target branch's tip.",
        },
        {
          ai: 'And the alternative that creates a merge commit instead?',
          aiIt: "E l'alternativa che crea un merge commit invece?",
          expectedKeywords: ['merge'],
          hint: 'The classic operation joining histories.',
          hintIt: "L'operazione classica che unisce le storie.",
          onKeywordFound:
            'Right, plain {found} -- preserves true history, including the branch shape.',
          onKeywordMissing:
            'Use a regular {expected} -- preserves the true branch topology with a merge commit.',
        },
        {
          ai: "What's the main reason teams prefer rebase before integrating?",
          aiIt: "Qual e' la ragione principale per cui i team preferiscono il rebase prima di integrare?",
          expectedKeywords: ['linear', 'history'],
          hint: 'A clean, linear timeline.',
          hintIt: 'Una timeline pulita e lineare.',
          onKeywordFound:
            'Right, {found} history -- easier git log, easier bisect, simpler reasoning.',
          onKeywordMissing:
            'For {expected} history -- easier to read, easier to bisect, simpler mental model.',
        },
        {
          ai: "What's the danger of rebasing a branch other people are working on?",
          aiIt: "Qual e' il pericolo di rebasare un branch su cui altre persone stanno lavorando?",
          expectedKeywords: ['rewrite', 'force push'],
          hint: 'You change commit hashes that others may already have.',
          hintIt: 'Cambi gli hash dei commit che altri potrebbero gia avere.',
          onKeywordFound:
            'Right, history {found} -- never rebase a shared branch without coordination.',
          onKeywordMissing:
            "It's a history {expected} -- changes commit hashes; never rebase a shared branch unilaterally.",
        },
        {
          ai: 'Last question: what command shows what the integration result will look like before we apply it?',
          aiIt: "Ultima domanda: quale comando mostra come sara' il risultato dell'integrazione prima di applicarlo?",
          expectedKeywords: ['log', 'diff'],
          hint: 'Inspecting commits or differences before merging.',
          hintIt: 'Ispezionare commit o differenze prima del merge.',
          onKeywordFound:
            "Right, git {found} feature..main shows the divergence so we know exactly what's coming.",
          onKeywordMissing:
            'Use git {expected} feature..main -- shows what diverges before you integrate.',
        },
      ],
      summary: {
        en: 'Practiced workflow vocabulary: rebase, merge, linear history, rewrite, log.',
        it: 'Praticato il vocabolario di workflow: rebase, merge, linear history, rewrite, log.',
      },
    },
    {
      id: 'git-recover',
      title: 'Recovering Lost Work',
      titleIt: 'Recuperare Lavoro Perso',
      context: 'recovery',
      difficulty: 3,
      turns: [
        {
          ai: 'Help -- I just ran git reset --hard and lost my changes. Is the work gone forever?',
          aiIt: "Aiuto -- ho appena lanciato git reset --hard e ho perso le modifiche. Il lavoro e' perso per sempre?",
          expectedKeywords: ['reflog'],
          hint: 'A local log of every HEAD movement.',
          hintIt: 'Un log locale di ogni movimento di HEAD.',
          onKeywordFound:
            'No, breathe -- git {found} keeps every HEAD position for ~90 days. We can recover.',
          onKeywordMissing:
            'Use git {expected} -- it logs every HEAD movement locally for ~90 days; your commits are still there.',
        },
        {
          ai: "Once I find the right entry, what's the unit I want to recover -- identified by a hash?",
          aiIt: "Una volta trovata la voce giusta, qual e' l'unita' che voglio recuperare -- identificata da un hash?",
          expectedKeywords: ['commit'],
          hint: 'A snapshot of the repo with a parent and SHA.',
          hintIt: 'Uno snapshot del repo con un parent e una SHA.',
          onKeywordFound: 'Right, the {found} -- find its SHA in reflog and recover from there.',
          onKeywordMissing:
            "It's the {expected} -- find its SHA in reflog; that's your recovery anchor.",
        },
        {
          ai: 'What command actually restores my branch back to that point?',
          aiIt: 'Quale comando ripristina effettivamente il mio branch a quel punto?',
          expectedKeywords: ['reset', 'checkout'],
          hint: 'A git command that moves the branch pointer or restores files.',
          hintIt: 'Un comando git che muove il puntatore del branch o ripristina file.',
          onKeywordFound:
            'Right, git {found} --hard <sha> brings us back. Or use git switch -c rescue <sha> for safety.',
          onKeywordMissing:
            'Use git {expected} --hard <sha> -- but better, branch from the sha first as a safety net.',
        },
        {
          ai: 'If I deleted a branch entirely, can I get it back?',
          aiIt: 'Se ho cancellato un branch interamente, posso recuperarlo?',
          expectedKeywords: ['recover', 'recreate'],
          hint: 'Recreate the branch from the reflog SHA.',
          hintIt: 'Ricreare il branch dalla SHA del reflog.',
          onKeywordFound:
            'Yes, you can {found} it -- find the branch tip SHA in reflog and git branch <name> <sha>.',
          onKeywordMissing:
            'You can {expected} it -- look up the branch tip SHA in reflog and recreate the branch from it.',
        },
        {
          ai: 'Last thing -- what command finds dangling commits not referenced anywhere?',
          aiIt: 'Ultima cosa -- quale comando trova commit dangling non referenziati da nessuna parte?',
          expectedKeywords: ['fsck'],
          hint: 'A git plumbing command for repository integrity checks.',
          hintIt: 'Un comando plumbing di git per check di integrita del repo.',
          onKeywordFound:
            "Right, git {found} --lost-found surfaces dangling commits the GC hasn't pruned yet.",
          onKeywordMissing:
            'Use git {expected} --lost-found -- lists dangling commits before garbage collection sweeps them.',
        },
      ],
      summary: {
        en: 'Practiced recovery vocabulary: reflog, commit, reset, recover, fsck.',
        it: 'Praticato il vocabolario di recupero: reflog, commit, reset, recover, fsck.',
      },
    },
    {
      id: 'git-precommit-hook',
      title: 'Pre-commit Hook Setup',
      titleIt: 'Setup di Pre-commit Hook',
      context: 'hooks',
      difficulty: 2,
      turns: [
        {
          ai: 'We want to enforce code quality on every commit locally. What git mechanism runs before the commit lands?',
          aiIt: "Vogliamo imporre qualita' del codice su ogni commit localmente. Quale meccanismo git gira prima che il commit arrivi?",
          expectedKeywords: ['hook', 'pre-commit'],
          hint: 'A git script that runs at specific lifecycle moments.',
          hintIt: 'Uno script git che gira in momenti specifici del lifecycle.',
          onKeywordFound:
            'Right, a git {found} -- pre-commit lives in .git/hooks but tools manage them better.',
          onKeywordMissing:
            "It's a git {expected} -- a script run at lifecycle events; pre-commit is the one we want.",
        },
        {
          ai: "What's the popular Node-based tool that manages git hooks per-project?",
          aiIt: "Qual e' il tool popolare basato su Node che gestisce gli hook git per progetto?",
          expectedKeywords: ['husky'],
          hint: 'A package that puts hooks under version control.',
          hintIt: 'Un pacchetto che mette gli hook sotto version control.',
          onKeywordFound:
            'Right, {found} -- installs hooks during npm install, hooks are versioned with the repo.',
          onKeywordMissing:
            'Use {expected} -- npm package that versions hooks with the repo and auto-installs on npm install.',
        },
        {
          ai: 'What kind of tool do we run inside the hook to catch style and obvious bugs?',
          aiIt: "Che tipo di tool eseguiamo dentro l'hook per beccare style e bug ovvi?",
          expectedKeywords: ['lint', 'linter'],
          hint: 'Static analysis catching style and bug patterns.',
          hintIt: 'Analisi statica che becca pattern di stile e bug.',
          onKeywordFound:
            'Right, a {found} like ESLint -- catches obvious bugs and style violations before push.',
          onKeywordMissing:
            'Run a {expected} -- ESLint, ruff, gofmt; static checks before code is committed.',
        },
        {
          ai: 'What helper restricts checks to only the files staged for commit?',
          aiIt: 'Quale helper restringe i check ai soli file in stage per il commit?',
          expectedKeywords: ['lint-staged'],
          hint: 'A tool that runs commands on staged files only.',
          hintIt: 'Un tool che esegue comandi solo sui file in stage.',
          onKeywordFound:
            'Right, {found} -- runs ESLint and Prettier only on changed files. Fast even on big repos.',
          onKeywordMissing:
            'Use {expected} -- runs linters only on staged files; keeps hooks fast on big repos.',
        },
        {
          ai: 'Last thing -- if a hook is misbehaving in CI, what flag bypasses it for a single commit?',
          aiIt: 'Ultima cosa -- se un hook si comporta male in CI, quale flag lo bypassa per un singolo commit?',
          expectedKeywords: ['--no-verify'],
          hint: 'A git commit flag to skip pre-commit and commit-msg hooks.',
          hintIt: 'Un flag di git commit per saltare hook pre-commit e commit-msg.',
          onKeywordFound:
            'Right, git commit {found} -- emergency-only escape hatch. Document each use.',
          onKeywordMissing:
            'Use {expected} -- emergency bypass; should be rare and reviewed in PR.',
        },
      ],
      summary: {
        en: 'Practiced hook vocabulary: hook, husky, linter, lint-staged, --no-verify.',
        it: 'Praticato il vocabolario hook: hook, husky, linter, lint-staged, --no-verify.',
      },
    },
  ],
};
