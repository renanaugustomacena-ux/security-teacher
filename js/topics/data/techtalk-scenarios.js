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
};
