/**
 * CYBERSECURITY TOPIC DATA - FlowLearn
 * =====================================
 *
 * 12 levels of English cybersecurity terminology.
 * Each level has 4 lessons with 10+ items each (40+ per level).
 * Progression: Foundations → GRC & Professional
 */

export default {
  id: 'cybersecurity',
  levels: {
    // ════════════════════════════════════════════════
    // LEVEL 0 - FONDAMENTI / FOUNDATIONS
    // ════════════════════════════════════════════════
    0: {
      name: 'Fondamenti / Foundations',
      description: 'Le parole fondamentali della sicurezza informatica',
      lessons: [
        {
          id: 'cyber_basics_1',
          title: 'Termini Essenziali / Essential Terms',
          description: 'Le prime parole da conoscere in cybersecurity',
          items: [
            {
              english: 'Password',
              italian: "Password / Parola d'ordine",
              pronunciation: '/\u02C8p\u00E6sw\u025Crd/',
              phonetic: 'PAS-uerd',
              example:
                'Never share your password with anyone. = Non condividere mai la tua password con nessuno.',
              context: 'authentication',
              difficulty: 'beginner',
              note: 'In italiano si usa spesso "password" direttamente, ma la pronuncia inglese \u00E8 diversa!',
            },
            {
              english: 'Hacker',
              italian: 'Hacker / Pirata informatico',
              pronunciation: '/\u02C8h\u00E6k\u0259r/',
              phonetic: 'HAK-er',
              example:
                "The hacker gained access to the system. = L'hacker ha ottenuto accesso al sistema.",
              context: 'threat-actors',
              difficulty: 'beginner',
              note: 'Non tutti gli hacker sono criminali: esistono "white hat" (etici) e "black hat" (malevoli).',
            },
            {
              english: 'Virus',
              italian: 'Virus informatico',
              pronunciation: '/\u02C8va\u026Ar\u0259s/',
              phonetic: 'VAI-res',
              example:
                'The virus infected thousands of computers. = Il virus ha infettato migliaia di computer.',
              context: 'malware',
              difficulty: 'beginner',
              note: 'La pronuncia inglese \u00E8 "VAI-res", non "VI-rus" come in italiano.',
            },
            {
              english: 'Malware',
              italian: 'Software malevolo / Malware',
              pronunciation: '/\u02C8m\u00E6lwe\u0259r/',
              phonetic: 'MAL-uer',
              example:
                'Malware can steal your personal data. = Il malware pu\u00F2 rubare i tuoi dati personali.',
              context: 'malware',
              difficulty: 'beginner',
              note: 'Combinazione di "malicious" + "software". Include virus, trojan, worm, ecc.',
            },
            {
              english: 'Firewall',
              italian: 'Firewall / Muro di fuoco',
              pronunciation: '/\u02C8fa\u026A\u0259rw\u0254\u02D0l/',
              phonetic: 'FAIER-uol',
              example:
                'The firewall blocks unauthorized access. = Il firewall blocca gli accessi non autorizzati.',
              context: 'defense',
              difficulty: 'beginner',
              tool: 'Windows Firewall, pfSense',
              note: 'Letteralmente "muro di fuoco". Filtra il traffico di rete.',
            },
            {
              english: 'Security',
              italian: 'Sicurezza',
              pronunciation: '/s\u026A\u02C8kj\u028A\u0259r\u0259ti/',
              phonetic: 'si-KIUR-i-ti',
              example:
                'Cybersecurity is essential for every business. = La sicurezza informatica \u00E8 essenziale per ogni azienda.',
              context: 'general',
              difficulty: 'beginner',
            },
            {
              english: 'Threat',
              italian: 'Minaccia',
              pronunciation: '/\u03B8ret/',
              phonetic: 'THRET',
              example: 'New threats emerge every day. = Nuove minacce emergono ogni giorno.',
              context: 'general',
              difficulty: 'beginner',
              note: 'Il suono "th" \u00E8 tipico dell\'inglese: metti la lingua tra i denti.',
            },
            {
              english: 'Attack',
              italian: 'Attacco',
              pronunciation: '/\u0259\u02C8t\u00E6k/',
              phonetic: 'e-TAK',
              example:
                "The company suffered a cyber attack. = L'azienda ha subito un attacco informatico.",
              context: 'general',
              difficulty: 'beginner',
            },
            {
              english: 'Data',
              italian: 'Dati',
              pronunciation: '/\u02C8de\u026At\u0259/',
              phonetic: 'DEI-ta',
              example: 'Protect your data at all costs. = Proteggi i tuoi dati a tutti i costi.',
              context: 'general',
              difficulty: 'beginner',
              note: 'In inglese si pronuncia "DEI-ta", non "DA-ta" come in italiano.',
            },
            {
              english: 'Encryption',
              italian: 'Crittografia / Cifratura',
              pronunciation: '/\u026An\u02C8kr\u026Ap\u0283\u0259n/',
              phonetic: 'in-KRIP-scen',
              example:
                'Encryption protects your messages from being read. = La crittografia protegge i tuoi messaggi dalla lettura.',
              context: 'cryptography',
              difficulty: 'beginner',
            },
            {
              english: 'Backup',
              italian: 'Backup / Copia di sicurezza',
              pronunciation: '/\u02C8b\u00E6k\u028Cp/',
              phonetic: 'BAK-ap',
              example:
                'Always make a backup of your important files. = Fai sempre un backup dei tuoi file importanti.',
              context: 'defense',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'cyber_basics_2',
          title: 'Accesso e Identit\u00E0 / Access & Identity',
          description: "Termini relativi all'accesso ai sistemi e all'identit\u00E0 digitale",
          items: [
            {
              english: 'Username',
              italian: 'Nome utente',
              pronunciation: '/\u02C8ju\u02D0z\u0259rne\u026Am/',
              phonetic: 'IU-zer-neim',
              example:
                'Enter your username and password. = Inserisci il tuo nome utente e password.',
              context: 'authentication',
              difficulty: 'beginner',
            },
            {
              english: 'Login',
              italian: 'Accesso / Accedere',
              pronunciation: '/\u02C8l\u0252\u0261\u026An/',
              phonetic: 'LOG-in',
              example: 'Please login to your account. = Per favore accedi al tuo account.',
              context: 'authentication',
              difficulty: 'beginner',
            },
            {
              english: 'Logout',
              italian: 'Disconnessione / Disconnettersi',
              pronunciation: '/\u02C8l\u0252\u0261a\u028At/',
              phonetic: 'LOG-aut',
              example:
                'Remember to logout when you are done. = Ricorda di disconnetterti quando hai finito.',
              context: 'authentication',
              difficulty: 'beginner',
            },
            {
              english: 'Account',
              italian: 'Account / Profilo',
              pronunciation: '/\u0259\u02C8ka\u028Ant/',
              phonetic: 'e-KAUNT',
              example:
                'Your account has been compromised. = Il tuo account \u00E8 stato compromesso.',
              context: 'authentication',
              difficulty: 'beginner',
            },
            {
              english: 'Authentication',
              italian: 'Autenticazione',
              pronunciation: '/\u0254\u02D0\u02CC\u03B8ent\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'o-then-ti-KEI-scen',
              example:
                "Two-factor authentication adds an extra layer of security. = L'autenticazione a due fattori aggiunge un livello extra di sicurezza.",
              context: 'authentication',
              difficulty: 'beginner',
            },
            {
              english: 'Authorization',
              italian: 'Autorizzazione',
              pronunciation: '/\u02CC\u0254\u02D0\u03B8\u0259ra\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'o-tho-rai-ZEI-scen',
              example:
                'You need authorization to access this folder. = Hai bisogno di autorizzazione per accedere a questa cartella.',
              context: 'access-control',
              difficulty: 'beginner',
              note: 'Authentication = chi sei. Authorization = cosa puoi fare.',
            },
            {
              english: 'Credential',
              italian: 'Credenziale',
              pronunciation: '/kr\u026A\u02C8den\u0283\u0259l/',
              phonetic: 'kri-DEN-scial',
              example:
                'Never store credentials in plain text. = Non salvare mai le credenziali in testo semplice.',
              context: 'authentication',
              difficulty: 'beginner',
            },
            {
              english: 'Access',
              italian: 'Accesso',
              pronunciation: '/\u02C8\u00E6kses/',
              phonetic: 'AK-ses',
              example:
                "Unauthorized access is a criminal offense. = L'accesso non autorizzato \u00E8 un reato.",
              context: 'access-control',
              difficulty: 'beginner',
            },
            {
              english: 'Permission',
              italian: 'Permesso / Autorizzazione',
              pronunciation: '/p\u0259r\u02C8m\u026A\u0283\u0259n/',
              phonetic: 'per-MI-scen',
              example:
                'Check your file permissions carefully. = Controlla attentamente i permessi dei tuoi file.',
              context: 'access-control',
              difficulty: 'beginner',
            },
            {
              english: 'Privacy',
              italian: 'Privacy / Riservatezza',
              pronunciation: '/\u02C8pra\u026Av\u0259si/',
              phonetic: 'PRAI-ve-si',
              example:
                'Privacy is a fundamental right. = La privacy \u00E8 un diritto fondamentale.',
              context: 'general',
              difficulty: 'beginner',
              note: 'In inglese si dice "PRAI-ve-si", non "PRI-va-si".',
            },
          ],
        },
        {
          id: 'cyber_basics_3',
          title: 'Rischi e Pericoli / Risks & Dangers',
          description: 'Termini base sui rischi informatici',
          items: [
            {
              english: 'Risk',
              italian: 'Rischio',
              pronunciation: '/r\u026Ask/',
              phonetic: 'RISK',
              example:
                'Every system has some level of risk. = Ogni sistema ha un certo livello di rischio.',
              context: 'risk-management',
              difficulty: 'beginner',
            },
            {
              english: 'Vulnerability',
              italian: 'Vulnerabilit\u00E0',
              pronunciation: '/\u02CCv\u028Cln\u0259r\u0259\u02C8b\u026Al\u0259ti/',
              phonetic: 'val-ne-re-BI-li-ti',
              example:
                'The vulnerability was discovered by a researcher. = La vulnerabilit\u00E0 \u00E8 stata scoperta da un ricercatore.',
              context: 'vulnerabilities',
              difficulty: 'beginner',
            },
            {
              english: 'Exploit',
              italian: 'Exploit / Sfruttamento',
              pronunciation: '/\u026Ak\u02C8spl\u0254\u026At/',
              phonetic: 'ik-SPLOIT',
              example:
                "The attacker used an exploit to break in. = L'attaccante ha usato un exploit per entrare.",
              context: 'attack-techniques',
              difficulty: 'beginner',
              note: 'Come verbo si pronuncia "ik-SPLOIT", come nome spesso "EK-sploit".',
            },
            {
              english: 'Breach',
              italian: 'Violazione / Breccia',
              pronunciation: '/bri\u02D0t\u0283/',
              phonetic: 'BRIICH',
              example:
                'A data breach exposed millions of records. = Una violazione dei dati ha esposto milioni di record.',
              context: 'incidents',
              difficulty: 'beginner',
            },
            {
              english: 'Patch',
              italian: 'Patch / Aggiornamento correttivo',
              pronunciation: '/p\u00E6t\u0283/',
              phonetic: 'PACH',
              example:
                'Install the security patch immediately. = Installa la patch di sicurezza immediatamente.',
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Update',
              italian: 'Aggiornamento',
              pronunciation: '/\u028Cp\u02C8de\u026At/',
              phonetic: 'ap-DEIT',
              example:
                'Always keep your software up to date. = Tieni sempre aggiornato il tuo software.',
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Bug',
              italian: 'Bug / Errore nel codice',
              pronunciation: '/b\u028C\u0261/',
              phonetic: 'BAG',
              example:
                'The bug allowed attackers to bypass security. = Il bug ha permesso agli attaccanti di aggirare la sicurezza.',
              context: 'vulnerabilities',
              difficulty: 'beginner',
              note: 'Letteralmente "insetto". Il termine nasce da un vero insetto trovato in un computer nel 1947!',
            },
            {
              english: 'Spam',
              italian: 'Spam / Posta indesiderata',
              pronunciation: '/sp\u00E6m/',
              phonetic: 'SPAM',
              example:
                'Check your spam folder regularly. = Controlla regolarmente la cartella spam.',
              context: 'threats',
              difficulty: 'beginner',
            },
            {
              english: 'Scam',
              italian: 'Truffa / Raggiro',
              pronunciation: '/sk\u00E6m/',
              phonetic: 'SKAM',
              example:
                'Online scams are becoming more sophisticated. = Le truffe online stanno diventando pi\u00F9 sofisticate.',
              context: 'threats',
              difficulty: 'beginner',
              note: 'Non confondere "scam" (truffa) con "spam" (posta indesiderata).',
            },
            {
              english: 'Antivirus',
              italian: 'Antivirus',
              pronunciation: '/\u02CC\u00E6nti\u02C8va\u026Ar\u0259s/',
              phonetic: 'anti-VAI-res',
              example:
                'Install a good antivirus on your computer. = Installa un buon antivirus sul tuo computer.',
              context: 'defense',
              difficulty: 'beginner',
              tool: 'Windows Defender, Malwarebytes',
            },
          ],
        },
        {
          id: 'cyber_basics_4',
          title: 'Sicurezza Quotidiana / Everyday Security',
          description: 'Termini che incontri ogni giorno nella sicurezza digitale',
          items: [
            {
              english: 'Download',
              italian: 'Scaricare / Download',
              pronunciation: '/\u02C8da\u028Anlo\u028Ad/',
              phonetic: 'DAUN-loud',
              example:
                'Only download files from trusted sources. = Scarica file solo da fonti attendibili.',
              context: 'general',
              difficulty: 'beginner',
            },
            {
              english: 'Upload',
              italian: 'Caricare / Upload',
              pronunciation: '/\u02C8\u028Cplo\u028Ad/',
              phonetic: 'AP-loud',
              example:
                'Be careful what you upload to the cloud. = Stai attento a cosa carichi nel cloud.',
              context: 'general',
              difficulty: 'beginner',
            },
            {
              english: 'Link',
              italian: 'Collegamento / Link',
              pronunciation: '/l\u026A\u014Bk/',
              phonetic: 'LINK',
              example: 'Do not click on suspicious links. = Non cliccare su link sospetti.',
              context: 'threats',
              difficulty: 'beginner',
            },
            {
              english: 'Browser',
              italian: 'Browser / Navigatore',
              pronunciation: '/\u02C8bra\u028Az\u0259r/',
              phonetic: 'BRAU-zer',
              example:
                'Keep your browser updated for security. = Tieni aggiornato il tuo browser per la sicurezza.',
              context: 'general',
              difficulty: 'beginner',
              tool: 'Chrome, Firefox, Edge',
            },
            {
              english: 'Phishing',
              italian: 'Phishing / Truffa via email',
              pronunciation: '/\u02C8f\u026A\u0283\u026A\u014B/',
              phonetic: 'FI-scing',
              example:
                'Phishing emails try to steal your credentials. = Le email di phishing cercano di rubare le tue credenziali.',
              context: 'social-engineering',
              difficulty: 'beginner',
              note: 'Suona come "fishing" (pescare). I truffatori "pescano" le tue informazioni!',
            },
            {
              english: 'Safe',
              italian: 'Sicuro',
              pronunciation: '/se\u026Af/',
              phonetic: 'SEIF',
              example: 'Is this website safe to use? = Questo sito web \u00E8 sicuro da usare?',
              context: 'general',
              difficulty: 'beginner',
            },
            {
              english: 'Dangerous',
              italian: 'Pericoloso',
              pronunciation: '/\u02C8de\u026And\u0292\u0259r\u0259s/',
              phonetic: 'DEIN-ge-res',
              example:
                'Clicking unknown links is dangerous. = Cliccare link sconosciuti \u00E8 pericoloso.',
              context: 'general',
              difficulty: 'beginner',
            },
            {
              english: 'Warning',
              italian: 'Avviso / Avvertimento',
              pronunciation: '/\u02C8w\u0254\u02D0rn\u026A\u014B/',
              phonetic: 'UOR-ning',
              example:
                'The system showed a security warning. = Il sistema ha mostrato un avviso di sicurezza.',
              context: 'general',
              difficulty: 'beginner',
            },
            {
              english: 'Suspicious',
              italian: 'Sospetto',
              pronunciation: '/s\u0259\u02C8sp\u026A\u0283\u0259s/',
              phonetic: 'se-SPI-sces',
              example:
                "Report any suspicious activity to IT. = Segnala qualsiasi attivit\u00E0 sospetta all'IT.",
              context: 'general',
              difficulty: 'beginner',
            },
            {
              english: 'Network',
              italian: 'Rete',
              pronunciation: '/\u02C8netw\u025Crk/',
              phonetic: 'NET-uerk',
              example:
                'Secure your home network with a strong password. = Proteggi la tua rete domestica con una password forte.',
              context: 'networking',
              difficulty: 'beginner',
            },
            {
              english: 'Cyber',
              italian: 'Cibernetico / Informatico',
              pronunciation: '/\u02C8sa\u026Ab\u0259r/',
              phonetic: 'SAI-ber',
              example:
                'Cyber crime is increasing worldwide. = La criminalit\u00E0 informatica \u00E8 in aumento nel mondo.',
              context: 'general',
              difficulty: 'beginner',
              note: 'Prefisso usatissimo: cyber-attack, cyber-security, cyber-crime...',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 1 - MINACCE COMUNI / COMMON THREATS
    // ════════════════════════════════════════════════
    1: {
      name: 'Minacce Comuni / Common Threats',
      description: 'I tipi di attacco e malware pi\u00F9 comuni',
      lessons: [
        {
          id: 'threats_malware',
          title: 'Tipi di Malware / Malware Types',
          description: 'I diversi tipi di software malevolo',
          items: [
            {
              english: 'Ransomware',
              italian: 'Ransomware / Virus del riscatto',
              pronunciation: '/\u02C8r\u00E6ns\u0259mwe\u0259r/',
              phonetic: 'RAN-sem-uer',
              example:
                'Ransomware encrypts your files and demands payment. = Il ransomware cripta i tuoi file e chiede un pagamento.',
              context: 'malware',
              difficulty: 'beginner',
              note: 'Da "ransom" (riscatto) + "ware" (software). Uno degli attacchi pi\u00F9 costosi.',
            },
            {
              english: 'Trojan',
              italian: 'Trojan / Cavallo di Troia',
              pronunciation: '/\u02C8tro\u028Ad\u0292\u0259n/',
              phonetic: 'TROI-gen',
              example:
                'The trojan disguised itself as a legitimate program. = Il trojan si \u00E8 mascherato da programma legittimo.',
              context: 'malware',
              difficulty: 'beginner',
              note: 'Come il cavallo di Troia della mitologia: sembra innocuo ma nasconde una minaccia.',
            },
            {
              english: 'Worm',
              italian: 'Worm / Verme informatico',
              pronunciation: '/w\u025C\u02D0rm/',
              phonetic: 'UERM',
              example:
                'A worm spreads automatically across networks. = Un worm si diffonde automaticamente attraverso le reti.',
              context: 'malware',
              difficulty: 'beginner',
              note: 'A differenza dei virus, i worm si propagano da soli senza bisogno di un file ospite.',
            },
            {
              english: 'Spyware',
              italian: 'Spyware / Software spia',
              pronunciation: '/\u02C8spa\u026Awe\u0259r/',
              phonetic: 'SPAI-uer',
              example:
                'Spyware monitors your online activities secretly. = Lo spyware monitora segretamente le tue attivit\u00E0 online.',
              context: 'malware',
              difficulty: 'beginner',
            },
            {
              english: 'Adware',
              italian: 'Adware / Software pubblicitario',
              pronunciation: '/\u02C8\u00E6dwe\u0259r/',
              phonetic: 'AD-uer',
              example:
                "Adware displays unwanted advertisements. = L'adware mostra pubblicit\u00E0 indesiderate.",
              context: 'malware',
              difficulty: 'beginner',
            },
            {
              english: 'Keylogger',
              italian: 'Keylogger / Registratore di tasti',
              pronunciation: '/\u02C8ki\u02D0l\u0252\u0261\u0259r/',
              phonetic: 'KII-log-er',
              example:
                'A keylogger records everything you type. = Un keylogger registra tutto ci\u00F2 che digiti.',
              context: 'malware',
              difficulty: 'beginner',
              note: 'Da "key" (tasto) + "logger" (registratore). Pericolosissimo per le password.',
            },
            {
              english: 'Rootkit',
              italian: 'Rootkit',
              pronunciation: '/\u02C8ru\u02D0tk\u026At/',
              phonetic: 'RUUT-kit',
              example:
                'Rootkits hide deep in the operating system. = I rootkit si nascondono in profondit\u00E0 nel sistema operativo.',
              context: 'malware',
              difficulty: 'beginner',
              note: 'Da "root" (amministratore) + "kit" (set di strumenti). Difficili da rilevare.',
            },
            {
              english: 'Botnet',
              italian: 'Botnet / Rete di bot',
              pronunciation: '/\u02C8b\u0252tnet/',
              phonetic: 'BOT-net',
              example:
                'The botnet controlled thousands of infected computers. = La botnet controllava migliaia di computer infetti.',
              context: 'malware',
              difficulty: 'beginner',
              note: 'Una rete di computer "zombie" controllati da un attaccante.',
            },
            {
              english: 'Payload',
              italian: 'Payload / Carico utile',
              pronunciation: '/\u02C8pe\u026Alo\u028Ad/',
              phonetic: 'PEI-loud',
              example:
                "The malware delivered its payload after installation. = Il malware ha eseguito il suo payload dopo l'installazione.",
              context: 'malware',
              difficulty: 'beginner',
              note: "La parte del malware che esegue l'azione dannosa vera e propria.",
            },
            {
              english: 'Infection',
              italian: 'Infezione',
              pronunciation: '/\u026An\u02C8fek\u0283\u0259n/',
              phonetic: 'in-FEK-scen',
              example:
                "The infection spread through email attachments. = L'infezione si \u00E8 diffusa tramite allegati email.",
              context: 'malware',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'threats_attacks',
          title: 'Tipi di Attacco / Attack Types',
          description: 'Le tecniche di attacco pi\u00F9 diffuse',
          items: [
            {
              english: 'DDoS',
              italian: 'DDoS / Attacco di negazione del servizio distribuito',
              pronunciation: '/\u02CCdi\u02D0di\u02D0o\u028A\u02C8es/',
              phonetic: 'dii-dii-ou-ES',
              example:
                'A DDoS attack overwhelmed the website with traffic. = Un attacco DDoS ha sovraccaricato il sito web con traffico.',
              context: 'attack-techniques',
              difficulty: 'beginner',
              note: 'Distributed Denial of Service. Migliaia di computer attaccano insieme.',
            },
            {
              english: 'Brute Force',
              italian: 'Forza bruta',
              pronunciation: '/bru\u02D0t f\u0254\u02D0rs/',
              phonetic: 'BRUUT FORS',
              example:
                'Brute force attacks try every possible password. = Gli attacchi di forza bruta provano ogni password possibile.',
              context: 'attack-techniques',
              difficulty: 'beginner',
            },
            {
              english: 'Social Engineering',
              italian: 'Ingegneria sociale',
              pronunciation:
                '/\u02C8so\u028A\u0283\u0259l end\u0292\u026A\u02C8n\u026A\u0259r\u026A\u014B/',
              phonetic: 'SOU-scial en-gi-NIR-ing',
              example:
                "Social engineering tricks people into revealing secrets. = L'ingegneria sociale inganna le persone a rivelare segreti.",
              context: 'social-engineering',
              difficulty: 'beginner',
              note: "L'attacco pi\u00F9 pericoloso: sfrutta la psicologia umana, non la tecnologia.",
            },
            {
              english: 'Man-in-the-Middle',
              italian: 'Uomo nel mezzo / Attacco MitM',
              pronunciation: '/m\u00E6n \u026An \u00F0\u0259 \u02C8m\u026Adl/',
              phonetic: 'man in de MIDL',
              example:
                'A man-in-the-middle attack intercepts communication. = Un attacco man-in-the-middle intercetta la comunicazione.',
              context: 'attack-techniques',
              difficulty: 'beginner',
              note: 'L\'attaccante si mette "in mezzo" tra due persone che comunicano.',
            },
            {
              english: 'Denial of Service',
              italian: 'Negazione del servizio',
              pronunciation: '/d\u026A\u02C8na\u026A\u0259l \u0259v \u02C8s\u025C\u02D0rv\u026As/',
              phonetic: 'di-NAIAL ov SER-vis',
              example:
                'A denial of service makes websites unavailable. = Una negazione del servizio rende i siti web non disponibili.',
              context: 'attack-techniques',
              difficulty: 'beginner',
            },
            {
              english: 'Identity Theft',
              italian: "Furto d'identit\u00E0",
              pronunciation: '/a\u026A\u02C8dent\u0259ti \u03B8eft/',
              phonetic: 'ai-DEN-ti-ti THEFT',
              example:
                "Identity theft can ruin your financial life. = Il furto d'identit\u00E0 pu\u00F2 rovinare la tua vita finanziaria.",
              context: 'threats',
              difficulty: 'beginner',
            },
            {
              english: 'Data Breach',
              italian: 'Violazione dei dati',
              pronunciation: '/\u02C8de\u026At\u0259 bri\u02D0t\u0283/',
              phonetic: 'DEI-ta BRIICH',
              example:
                'The data breach affected millions of users. = La violazione dei dati ha colpito milioni di utenti.',
              context: 'incidents',
              difficulty: 'beginner',
            },
            {
              english: 'Zero-Day',
              italian: 'Zero-day / Vulnerabilit\u00E0 del giorno zero',
              pronunciation: '/\u02C8z\u026A\u0259ro\u028A de\u026A/',
              phonetic: 'ZI-rou DEI',
              example:
                'A zero-day vulnerability has no available patch. = Una vulnerabilit\u00E0 zero-day non ha patch disponibile.',
              context: 'vulnerabilities',
              difficulty: 'beginner',
              note: 'Il difensore ha "zero giorni" per prepararsi: la vulnerabilit\u00E0 viene sfruttata prima di essere nota.',
            },
            {
              english: 'Insider Threat',
              italian: 'Minaccia interna',
              pronunciation: '/\u026An\u02C8sa\u026Ad\u0259r \u03B8ret/',
              phonetic: 'in-SAI-der THRET',
              example:
                "Insider threats come from within the organization. = Le minacce interne provengono dall'interno dell'organizzazione.",
              context: 'threat-actors',
              difficulty: 'beginner',
            },
            {
              english: 'Spoofing',
              italian: 'Spoofing / Falsificazione',
              pronunciation: '/\u02C8spu\u02D0f\u026A\u014B/',
              phonetic: 'SPUU-fing',
              example:
                'Email spoofing makes messages appear from a trusted sender. = Lo spoofing email fa apparire i messaggi da un mittente attendibile.',
              context: 'attack-techniques',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'threats_web',
          title: 'Minacce Web / Web Threats',
          description: 'Pericoli che incontri navigando su internet',
          items: [
            {
              english: 'Cookie',
              italian: 'Cookie / Biscotto digitale',
              pronunciation: '/\u02C8k\u028Aki/',
              phonetic: 'KU-ki',
              example:
                'Some cookies track your browsing habits. = Alcuni cookie tracciano le tue abitudini di navigazione.',
              context: 'web-security',
              difficulty: 'beginner',
              note: 'Piccoli file che i siti salvano sul tuo computer per ricordarti.',
            },
            {
              english: 'Pop-up',
              italian: 'Pop-up / Finestra a comparsa',
              pronunciation: '/\u02C8p\u0252p\u028Cp/',
              phonetic: 'POP-ap',
              example:
                'Block pop-ups to avoid malicious ads. = Blocca i pop-up per evitare pubblicit\u00E0 malevole.',
              context: 'web-security',
              difficulty: 'beginner',
            },
            {
              english: 'HTTPS',
              italian: 'HTTPS / Protocollo sicuro',
              pronunciation: '/e\u026At\u0283ti\u02D0ti\u02D0pi\u02D0\u02C8es/',
              phonetic: 'eitch-tii-tii-pii-ES',
              example:
                'Always check for HTTPS before entering personal data. = Controlla sempre HTTPS prima di inserire dati personali.',
              context: 'web-security',
              difficulty: 'beginner',
              note: 'La "S" sta per "Secure". Il lucchetto nel browser indica HTTPS.',
            },
            {
              english: 'URL',
              italian: 'URL / Indirizzo web',
              pronunciation: '/ju\u02D0\u0251\u02D0r\u02C8el/',
              phonetic: 'iu-ar-EL',
              example:
                "Check the URL carefully before clicking. = Controlla attentamente l'URL prima di cliccare.",
              context: 'web-security',
              difficulty: 'beginner',
            },
            {
              english: 'Domain',
              italian: 'Dominio',
              pronunciation: '/d\u0259\u02C8me\u026An/',
              phonetic: 'de-MEIN',
              example:
                'Fake domains look similar to real ones. = I domini falsi assomigliano a quelli veri.',
              context: 'web-security',
              difficulty: 'beginner',
            },
            {
              english: 'Certificate',
              italian: 'Certificato',
              pronunciation: '/s\u0259r\u02C8t\u026Af\u026Ak\u0259t/',
              phonetic: 'ser-TI-fi-ket',
              example:
                'An expired certificate means the site may not be secure. = Un certificato scaduto significa che il sito potrebbe non essere sicuro.',
              context: 'web-security',
              difficulty: 'beginner',
            },
            {
              english: 'Redirect',
              italian: 'Reindirizzamento',
              pronunciation: '/ri\u02D0d\u0259\u02C8rekt/',
              phonetic: 'rii-dai-REKT',
              example:
                'Malicious redirects send you to fake websites. = I reindirizzamenti malevoli ti mandano su siti falsi.',
              context: 'web-security',
              difficulty: 'beginner',
            },
            {
              english: 'Attachment',
              italian: 'Allegato',
              pronunciation: '/\u0259\u02C8t\u00E6t\u0283m\u0259nt/',
              phonetic: 'e-TACH-ment',
              example:
                'Never open suspicious email attachments. = Non aprire mai allegati email sospetti.',
              context: 'threats',
              difficulty: 'beginner',
            },
            {
              english: 'Clickjacking',
              italian: 'Clickjacking / Dirottamento del click',
              pronunciation: '/\u02C8kl\u026Akd\u0292\u00E6k\u026A\u014B/',
              phonetic: 'KLIK-jak-ing',
              example:
                'Clickjacking tricks you into clicking hidden elements. = Il clickjacking ti inganna facendoti cliccare elementi nascosti.',
              context: 'web-security',
              difficulty: 'beginner',
            },
            {
              english: 'Malicious',
              italian: 'Malevolo / Dannoso',
              pronunciation: '/m\u0259\u02C8l\u026A\u0283\u0259s/',
              phonetic: 'me-LI-sces',
              example:
                'Do not run malicious software on your computer. = Non eseguire software malevolo sul tuo computer.',
              context: 'general',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'threats_defense_intro',
          title: 'Difesa Base / Basic Defense',
          description: 'I primi strumenti e concetti di difesa',
          items: [
            {
              english: 'Scan',
              italian: 'Scansione / Scansionare',
              pronunciation: '/sk\u00E6n/',
              phonetic: 'SKAN',
              example:
                'Run a full scan with your antivirus. = Esegui una scansione completa con il tuo antivirus.',
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Quarantine',
              italian: 'Quarantena',
              pronunciation: '/\u02C8kw\u0252r\u0259nti\u02D0n/',
              phonetic: 'KUOR-en-tiin',
              example:
                "The antivirus moved the file to quarantine. = L'antivirus ha spostato il file in quarantena.",
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Block',
              italian: 'Bloccare / Blocco',
              pronunciation: '/bl\u0252k/',
              phonetic: 'BLOK',
              example:
                'The firewall will block the suspicious connection. = Il firewall bloccher\u00E0 la connessione sospetta.',
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Filter',
              italian: 'Filtro / Filtrare',
              pronunciation: '/\u02C8f\u026Alt\u0259r/',
              phonetic: 'FIL-ter',
              example:
                'Email filters can catch phishing attempts. = I filtri email possono catturare tentativi di phishing.',
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Protect',
              italian: 'Proteggere',
              pronunciation: '/pr\u0259\u02C8tekt/',
              phonetic: 'pro-TEKT',
              example:
                'Protect your devices with strong passwords. = Proteggi i tuoi dispositivi con password forti.',
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Detect',
              italian: 'Rilevare / Individuare',
              pronunciation: '/d\u026A\u02C8tekt/',
              phonetic: 'di-TEKT',
              example:
                'The system can detect unusual behavior. = Il sistema pu\u00F2 rilevare comportamenti insoliti.',
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Alert',
              italian: 'Allarme / Avviso',
              pronunciation: '/\u0259\u02C8l\u025C\u02D0rt/',
              phonetic: 'e-LERT',
              example:
                "The security alert was triggered at midnight. = L'allarme di sicurezza \u00E8 scattato a mezzanotte.",
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Log',
              italian: 'Log / Registro',
              pronunciation: '/l\u0252\u0261/',
              phonetic: 'LOG',
              example:
                'Check the security logs for suspicious activity. = Controlla i log di sicurezza per attivit\u00E0 sospette.',
              context: 'defense',
              difficulty: 'beginner',
              note: 'I log sono come un diario del sistema: registrano tutto quello che succede.',
            },
            {
              english: 'Monitor',
              italian: 'Monitorare / Monitoraggio',
              pronunciation: '/\u02C8m\u0252n\u026At\u0259r/',
              phonetic: 'MO-ni-ter',
              example:
                'Monitor your network traffic for anomalies. = Monitora il traffico di rete per anomalie.',
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Recovery',
              italian: 'Ripristino / Recupero',
              pronunciation: '/r\u026A\u02C8k\u028Cv\u0259ri/',
              phonetic: 'ri-KA-ve-ri',
              example:
                'Have a disaster recovery plan ready. = Tieni pronto un piano di recupero dai disastri.',
              context: 'defense',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVEL 2 - DIFESA / DEFENSE
    // ════════════════════════════════════════════════
    2: {
      name: 'Difesa / Defense',
      description: 'Strumenti e strategie di difesa informatica',
      lessons: [
        {
          id: 'defense_tools',
          title: 'Strumenti di Difesa / Defense Tools',
          description: 'IDS, IPS, WAF e altri strumenti',
          items: [
            {
              english: 'IDS (Intrusion Detection System)',
              italian: 'IDS / Sistema di rilevamento intrusioni',
              pronunciation: '/\u02CCa\u026A di\u02D0 \u02C8\u025Bs/',
              phonetic: 'ai-dii-ES',
              example:
                "The IDS detected suspicious network traffic. = L'IDS ha rilevato traffico di rete sospetto.",
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: 'Sistema passivo: rileva e segnala, ma non blocca. Funziona come un allarme antifurto.',
            },
            {
              english: 'IPS (Intrusion Prevention System)',
              italian: 'IPS / Sistema di prevenzione intrusioni',
              pronunciation: '/\u02CCa\u026A pi\u02D0 \u02C8\u025Bs/',
              phonetic: 'ai-pii-ES',
              example:
                "The IPS blocked the attack automatically. = L'IPS ha bloccato l'attacco automaticamente.",
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: "A differenza dell'IDS, l'IPS \u00E8 attivo: pu\u00F2 bloccare il traffico malevolo in tempo reale.",
            },
            {
              english: 'WAF (Web Application Firewall)',
              italian: 'WAF / Firewall per applicazioni web',
              pronunciation: '/w\u0252f/',
              phonetic: 'UAF',
              example:
                'The WAF protected the website from SQL injection. = Il WAF ha protetto il sito da SQL injection.',
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: 'Opera al livello 7 (applicazione) del modello OSI, filtrando il traffico HTTP/HTTPS.',
            },
            {
              english: 'SIEM (Security Information and Event Management)',
              italian: 'SIEM / Gestione eventi e informazioni di sicurezza',
              pronunciation: '/si\u02D0m/',
              phonetic: 'SIIM',
              example:
                'The SIEM correlated logs from multiple sources. = Il SIEM ha correlato i log da pi\u00F9 fonti.',
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: 'Pronunciato come "seem". Aggrega log da tutta la rete per trovare pattern sospetti.',
            },
            {
              english: 'Honeypot',
              italian: 'Honeypot / Trappola informatica',
              pronunciation: '/\u02C8h\u028Cnipo\u028At/',
              phonetic: 'HA-ni-pot',
              example:
                "The honeypot attracted hackers away from the real server. = L'honeypot ha attirato gli hacker lontano dal server reale.",
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: 'Letteralmente "barattolo di miele": un sistema esca che attira gli attaccanti per studiarli.',
            },
            {
              english: 'Sandbox',
              italian: 'Sandbox / Ambiente isolato',
              pronunciation: '/\u02C8s\u00E6ndb\u0252ks/',
              phonetic: 'SAND-boks',
              example:
                'We tested the suspicious file in a sandbox. = Abbiamo testato il file sospetto in una sandbox.',
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: 'Come una sabbiera per bambini: un ambiente sicuro dove testare cose potenzialmente pericolose.',
            },
            {
              english: 'Proxy',
              italian: 'Proxy / Intermediario di rete',
              pronunciation: '/\u02C8pr\u0252ksi/',
              phonetic: 'PROK-si',
              example:
                'The proxy server filtered all outgoing web requests. = Il proxy ha filtrato tutte le richieste web in uscita.',
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: 'Dal latino "procuratio" (agire per conto di). Fa da intermediario tra utente e internet.',
            },
            {
              english: 'VPN (Virtual Private Network)',
              italian: 'VPN / Rete privata virtuale',
              pronunciation: '/\u02CCvi\u02D0 pi\u02D0 \u02C8\u025Bn/',
              phonetic: 'vii-pii-EN',
              example:
                'Use a VPN to encrypt your internet connection. = Usa una VPN per crittografare la tua connessione internet.',
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: 'Crea un "tunnel" crittografato tra il tuo dispositivo e un server remoto.',
            },
            {
              english: 'EDR (Endpoint Detection and Response)',
              italian: 'EDR / Rilevamento e risposta endpoint',
              pronunciation: '/\u02CCi\u02D0 di\u02D0 \u02C8\u0251\u02D0r/',
              phonetic: 'ii-dii-AR',
              example:
                "EDR detected malicious behavior on the workstation. = L'EDR ha rilevato comportamenti malevoli sulla postazione.",
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: "Evoluzione dell'antivirus: monitora in tempo reale i comportamenti sospetti sugli endpoint.",
            },
            {
              english: 'DLP (Data Loss Prevention)',
              italian: 'DLP / Prevenzione perdita dati',
              pronunciation: '/\u02CCdi\u02D0 \u025Bl \u02C8pi\u02D0/',
              phonetic: 'dii-el-PII',
              example:
                "DLP policies prevented sensitive data from being emailed. = Le policy DLP hanno impedito l'invio di dati sensibili via email.",
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: "Monitora e blocca la fuoriuscita non autorizzata di dati sensibili dall'organizzazione.",
            },
          ],
        },
        {
          id: 'defense_auth',
          title: 'Autenticazione Avanzata / Advanced Auth',
          description: '2FA, biometria, token',
          items: [
            {
              english: 'Two-Factor Authentication (2FA)',
              italian: 'Autenticazione a due fattori (2FA)',
              pronunciation:
                '/tu\u02D0 \u02C8f\u00E6kt\u0259r \u0254\u02D0\u03B8\u025Bnt\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'tuu-FAK-ter o-fen-ti-KEI-scen',
              example:
                'Enable 2FA to add an extra layer of security. = Abilita la 2FA per aggiungere un livello extra di sicurezza.',
              context: 'authentication',
              difficulty: 'intermediate',
              note: 'Due fattori diversi: qualcosa che sai (password) + qualcosa che hai (telefono) o che sei (impronta).',
            },
            {
              english: 'Multi-Factor Authentication (MFA)',
              italian: 'Autenticazione multifattore (MFA)',
              pronunciation:
                '/\u02C8m\u028Clti \u02C8f\u00E6kt\u0259r \u0254\u02D0\u03B8\u025Bnt\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'MAL-ti-FAK-ter o-fen-ti-KEI-scen',
              example:
                "MFA requires multiple forms of verification. = L'MFA richiede pi\u00F9 forme di verifica.",
              context: 'authentication',
              difficulty: 'intermediate',
              note: 'Termine pi\u00F9 generico di 2FA: pu\u00F2 includere 2 o pi\u00F9 fattori di autenticazione.',
            },
            {
              english: 'Biometrics',
              italian: 'Biometria',
              pronunciation: '/\u02CCba\u026Ao\u028A\u02C8metr\u026Aks/',
              phonetic: 'bai-ou-ME-triks',
              example:
                'Biometrics uses fingerprints or face recognition. = La biometria usa impronte digitali o riconoscimento facciale.',
              context: 'authentication',
              difficulty: 'intermediate',
              note: 'Dal greco "bios" (vita) + "metron" (misura). Misura caratteristiche fisiche uniche.',
            },
            {
              english: 'Token',
              italian: 'Token / Gettone di sicurezza',
              pronunciation: '/\u02C8to\u028Ak\u0259n/',
              phonetic: 'TOU-ken',
              example:
                'The security token generates a new code every 30 seconds. = Il token di sicurezza genera un nuovo codice ogni 30 secondi.',
              context: 'authentication',
              difficulty: 'intermediate',
              note: 'Pu\u00F2 essere fisico (chiavetta) o software (app come Google Authenticator).',
            },
            {
              english: 'Single Sign-On (SSO)',
              italian: 'SSO / Accesso singolo',
              pronunciation: '/\u02C8s\u026A\u014Bg\u0259l sa\u026An \u0252n/',
              phonetic: 'SIN-gol sain ON',
              example:
                "SSO lets you access multiple apps with one login. = L'SSO ti permette di accedere a pi\u00F9 app con un solo login.",
              context: 'authentication',
              difficulty: 'intermediate',
              note: 'Un solo login per tanti servizi: comodo ma se compromesso, tutti gli account sono a rischio.',
            },
            {
              english: 'Certificate',
              italian: 'Certificato digitale',
              pronunciation: '/s\u0259r\u02C8t\u026Af\u026Ak\u0259t/',
              phonetic: 'ser-TI-fi-ket',
              example:
                'The server presented its certificate to prove its identity. = Il server ha presentato il suo certificato per provare la sua identit\u00E0.',
              context: 'authentication',
              difficulty: 'intermediate',
              note: "Come una carta d'identit\u00E0 digitale: emesso da un'autorit\u00E0 fidata (CA) per verificare l'identit\u00E0.",
            },
            {
              english: 'One-Time Password (OTP)',
              italian: 'OTP / Password monouso',
              pronunciation: '/w\u028Cn ta\u026Am \u02C8p\u00E6sw\u025Crd/',
              phonetic: 'uan taim PAS-uerd',
              example:
                "Enter the OTP sent to your phone. = Inserisci l'OTP inviato al tuo telefono.",
              context: 'authentication',
              difficulty: 'intermediate',
              note: 'Valida per un solo utilizzo: anche se intercettata, non pu\u00F2 essere riusata.',
            },
            {
              english: 'CAPTCHA',
              italian: 'CAPTCHA / Verifica anti-robot',
              pronunciation: '/\u02C8k\u00E6pt\u0283\u0259/',
              phonetic: 'KAP-cia',
              example:
                'Complete the CAPTCHA to prove you are human. = Completa il CAPTCHA per dimostrare che sei umano.',
              context: 'authentication',
              difficulty: 'intermediate',
              note: 'Acronimo: "Completely Automated Public Turing test to tell Computers and Humans Apart".',
            },
            {
              english: 'Identity Provider (IdP)',
              italian: 'Provider di identit\u00E0 (IdP)',
              pronunciation: '/a\u026A\u02C8d\u025Bnt\u0259ti pr\u0259\u02C8va\u026Ad\u0259r/',
              phonetic: 'ai-DEN-ti-ti pro-VAI-der',
              example:
                "The identity provider manages user authentication centrally. = Il provider di identit\u00E0 gestisce l'autenticazione degli utenti centralmente.",
              context: 'authentication',
              difficulty: 'intermediate',
              note: 'Servizio centralizzato che verifica chi sei: Google, Microsoft, Okta sono esempi comuni.',
            },
            {
              english: 'Session',
              italian: 'Sessione',
              pronunciation: '/\u02C8s\u025B\u0283\u0259n/',
              phonetic: 'SE-scen',
              example:
                'Your session will expire after 30 minutes of inactivity. = La tua sessione scadr\u00E0 dopo 30 minuti di inattivit\u00E0.',
              context: 'authentication',
              difficulty: 'intermediate',
              note: 'Periodo di connessione autenticata. Scade per sicurezza: se qualcuno ruba il cookie, ha tempo limitato.',
            },
          ],
        },
        {
          id: 'defense_endpoint',
          title: 'Sicurezza Endpoint / Endpoint Security',
          description: 'Protezione dei dispositivi',
          items: [
            {
              english: 'Antivirus',
              italian: 'Antivirus',
              pronunciation: '/\u02CC\u00E6nti\u02C8va\u026Ar\u0259s/',
              phonetic: 'an-ti-VAI-res',
              example:
                'Keep your antivirus software up to date. = Mantieni il tuo antivirus aggiornato.',
              context: 'endpoint-security',
              difficulty: 'intermediate',
              note: 'Attenzione alla pronuncia inglese: "anti-VAI-res", non "anti-virus" come in italiano.',
            },
            {
              english: 'Endpoint',
              italian: 'Endpoint / Dispositivo finale',
              pronunciation: '/\u02C8\u025Bndpo\u026Ant/',
              phonetic: 'END-point',
              example:
                'Every endpoint in the network must be secured. = Ogni endpoint nella rete deve essere protetto.',
              context: 'endpoint-security',
              difficulty: 'intermediate',
              note: 'Qualsiasi dispositivo connesso alla rete: PC, laptop, smartphone, tablet, server.',
            },
            {
              english: 'Disk Encryption',
              italian: 'Crittografia del disco',
              pronunciation: '/d\u026Ask \u026An\u02C8kr\u026Ap\u0283\u0259n/',
              phonetic: 'disk in-KRIP-scen',
              example:
                'Disk encryption protects data if a laptop is stolen. = La crittografia del disco protegge i dati se un laptop viene rubato.',
              context: 'endpoint-security',
              difficulty: 'intermediate',
              note: 'BitLocker (Windows) e FileVault (Mac) sono gli strumenti pi\u00F9 comuni.',
            },
            {
              english: 'Patch Management',
              italian: 'Gestione delle patch',
              pronunciation: '/p\u00E6t\u0283 \u02C8m\u00E6n\u026Ad\u0292m\u0259nt/',
              phonetic: 'PATC man-ig-ment',
              example:
                'Good patch management reduces vulnerabilities. = Una buona gestione delle patch riduce le vulnerabilit\u00E0.',
              context: 'endpoint-security',
              difficulty: 'intermediate',
              note: '"Patch" significa "toppa": aggiornamenti che riparano falle di sicurezza nel software.',
            },
            {
              english: 'Whitelist',
              italian: 'Lista bianca / Whitelist',
              pronunciation: '/\u02C8wa\u026Atl\u026Ast/',
              phonetic: 'UAIT-list',
              example:
                'Only whitelisted applications can run on this system. = Solo le applicazioni nella whitelist possono girare su questo sistema.',
              context: 'endpoint-security',
              difficulty: 'intermediate',
              note: 'Approccio "permetti solo ci\u00F2 che \u00E8 autorizzato". Pi\u00F9 restrittivo ma pi\u00F9 sicuro della blacklist.',
            },
            {
              english: 'Blacklist',
              italian: 'Lista nera / Blacklist',
              pronunciation: '/\u02C8bl\u00E6kl\u026Ast/',
              phonetic: 'BLAK-list',
              example:
                "The malicious IP address was added to the blacklist. = L'indirizzo IP malevolo \u00E8 stato aggiunto alla blacklist.",
              context: 'endpoint-security',
              difficulty: 'intermediate',
              note: 'Approccio "blocca solo ci\u00F2 che \u00E8 noto come pericoloso". Pi\u00F9 permissivo della whitelist.',
            },
            {
              english: 'Mobile Device Management (MDM)',
              italian: 'MDM / Gestione dispositivi mobili',
              pronunciation:
                '/\u02C8mo\u028Aba\u026Al d\u026A\u02C8va\u026As \u02C8m\u00E6n\u026Ad\u0292m\u0259nt/',
              phonetic: 'MOU-bail di-VAIS MAN-ig-ment',
              example:
                "MDM allows IT to remotely wipe lost company phones. = L'MDM permette all'IT di cancellare da remoto i telefoni aziendali persi.",
              context: 'endpoint-security',
              difficulty: 'intermediate',
              note: 'Fondamentale per le politiche BYOD (Bring Your Own Device).',
            },
            {
              english: 'Host Firewall',
              italian: 'Firewall locale',
              pronunciation: '/ho\u028Ast \u02C8fa\u026A\u0259rw\u0254\u02D0l/',
              phonetic: 'houst FAIER-uol',
              example:
                'The host firewall blocked unauthorized inbound connections. = Il firewall locale ha bloccato connessioni in entrata non autorizzate.',
              context: 'endpoint-security',
              difficulty: 'intermediate',
              note: 'A differenza del firewall di rete, opera direttamente sul singolo dispositivo.',
            },
            {
              english: 'Hardening',
              italian: 'Hardening / Rafforzamento',
              pronunciation: '/\u02C8h\u0251\u02D0rd\u0259n\u026A\u014B/',
              phonetic: 'HAR-de-ning',
              example:
                "System hardening reduces the attack surface. = L'hardening del sistema riduce la superficie di attacco.",
              context: 'endpoint-security',
              difficulty: 'intermediate',
              note: 'Processo di "indurimento": rimuovere software inutile, chiudere porte, disabilitare servizi non necessari.',
            },
            {
              english: 'Compliance',
              italian: 'Conformit\u00E0 / Compliance',
              pronunciation: '/k\u0259m\u02C8pla\u026A\u0259ns/',
              phonetic: 'com-PLAI-ens',
              example:
                'All endpoints must meet compliance requirements. = Tutti gli endpoint devono soddisfare i requisiti di compliance.',
              context: 'endpoint-security',
              difficulty: 'intermediate',
              note: "L'aderenza a standard e regolamenti di sicurezza (es. GDPR, PCI DSS, ISO 27001).",
            },
          ],
        },
        {
          id: 'defense_crypto_basics',
          title: 'Crittografia Base / Basic Crypto',
          description: 'SSL, TLS, certificati',
          items: [
            {
              english: 'SSL (Secure Sockets Layer)',
              italian: 'SSL / Livello di socket sicuri',
              pronunciation: '/\u02CC\u025Bs \u025Bs \u02C8\u025Bl/',
              phonetic: 'es-es-EL',
              example:
                "SSL was replaced by the more secure TLS protocol. = L'SSL \u00E8 stato sostituito dal protocollo TLS pi\u00F9 sicuro.",
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Tecnicamente obsoleto (dal 2015), ma il termine "SSL" \u00E8 ancora usato colloquialmente per indicare TLS.',
            },
            {
              english: 'TLS (Transport Layer Security)',
              italian: 'TLS / Sicurezza del livello di trasporto',
              pronunciation: '/\u02CCti\u02D0 \u025Bl \u02C8\u025Bs/',
              phonetic: 'tii-el-ES',
              example:
                'TLS encrypts the communication between browser and server. = Il TLS crittografa la comunicazione tra browser e server.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Successore di SSL. La versione attuale \u00E8 TLS 1.3 (2018), molto pi\u00F9 veloce e sicura.',
            },
            {
              english: 'HTTPS',
              italian: 'HTTPS / Protocollo sicuro',
              pronunciation: '/\u02CCe\u026At\u0283 ti\u02D0 ti\u02D0 pi\u02D0 \u02C8\u025Bs/',
              phonetic: 'eic-tii-tii-pii-ES',
              example:
                'Always check for HTTPS before entering passwords. = Controlla sempre che ci sia HTTPS prima di inserire password.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'HTTP + TLS = HTTPS. Il lucchetto nel browser indica una connessione crittografata.',
            },
            {
              english: 'Digital Certificate',
              italian: 'Certificato digitale',
              pronunciation:
                '/\u02C8d\u026Ad\u0292\u026At\u0259l s\u0259r\u02C8t\u026Af\u026Ak\u0259t/',
              phonetic: 'DI-gi-tel ser-TI-fi-ket',
              example:
                "The website's digital certificate was issued by a trusted CA. = Il certificato digitale del sito \u00E8 stato emesso da una CA fidata.",
              context: 'cryptography',
              difficulty: 'intermediate',
              note: "Contiene la chiave pubblica del proprietario, firmata da un'autorit\u00E0 di certificazione (CA).",
            },
            {
              english: 'Public Key',
              italian: 'Chiave pubblica',
              pronunciation: '/\u02C8p\u028Cbl\u026Ak ki\u02D0/',
              phonetic: 'PA-blik KII',
              example:
                'Share your public key so others can encrypt messages for you. = Condividi la tua chiave pubblica cos\u00EC altri possono crittografare messaggi per te.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Come un lucchetto aperto: chiunque pu\u00F2 chiudere (crittografare), ma solo tu hai la chiave per aprire.',
            },
            {
              english: 'Private Key',
              italian: 'Chiave privata',
              pronunciation: '/\u02C8pra\u026Av\u0259t ki\u02D0/',
              phonetic: 'PRAI-vet KII',
              example:
                'Never share your private key with anyone. = Non condividere mai la tua chiave privata con nessuno.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Deve rimanere assolutamente segreta. Se compromessa, tutta la sicurezza crolla.',
            },
            {
              english: 'Encryption',
              italian: 'Crittografia / Cifratura',
              pronunciation: '/\u026An\u02C8kr\u026Ap\u0283\u0259n/',
              phonetic: 'in-KRIP-scen',
              example:
                'Encryption converts readable data into unreadable code. = La crittografia converte dati leggibili in codice illeggibile.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Dal greco "kryptos" (nascosto). Processo di rendere i dati incomprensibili senza la chiave.',
            },
            {
              english: 'Decryption',
              italian: 'Decrittazione / Decifratura',
              pronunciation: '/di\u02D0\u02C8kr\u026Ap\u0283\u0259n/',
              phonetic: 'dii-KRIP-scen',
              example:
                'Decryption restores encrypted data to its original form. = La decrittazione ripristina i dati crittografati alla loro forma originale.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Il processo inverso della crittografia: dalla forma cifrata a quella leggibile.',
            },
            {
              english: 'Hash',
              italian: 'Hash / Impronta digitale',
              pronunciation: '/h\u00E6\u0283/',
              phonetic: 'HASC',
              example:
                'Passwords are stored as hashes, not in plain text. = Le password sono salvate come hash, non in testo chiaro.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: "Funzione unidirezionale: dal dato all'hash \u00E8 facile, dall'hash al dato \u00E8 (quasi) impossibile.",
            },
            {
              english: 'Digital Signature',
              italian: 'Firma digitale',
              pronunciation:
                '/\u02C8d\u026Ad\u0292\u026At\u0259l \u02C8s\u026A\u0261n\u0259t\u0283\u0259r/',
              phonetic: 'DI-gi-tel SIG-ne-cer',
              example:
                'The digital signature confirms the document was not tampered with. = La firma digitale conferma che il documento non \u00E8 stato manomesso.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Usa la chiave privata per firmare e la chiave pubblica per verificare. Garantisce autenticit\u00E0 e integrit\u00E0.',
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════
    // LEVELS 3-11 - PLACEHOLDER STRUCTURE
    // (Will be populated progressively)
    // ════════════════════════════════════════════════
    3: {
      name: 'Reti e Sicurezza / Network Security',
      description: 'Terminologia delle reti e della loro sicurezza',
      lessons: [
        {
          id: 'net_basics',
          title: 'Fondamenti di Rete / Network Basics',
          description: 'IP, port, protocolli',
          items: [
            {
              english: 'OSI Model',
              italian: 'Modello OSI',
              pronunciation: '/\u02CCo\u028A \u02CCes \u02C8a\u026A \u02C8m\u0252dl/',
              phonetic: 'ou-es-ai MO-del',
              example: 'The OSI model has seven layers. = Il modello OSI ha sette livelli.',
              context: 'networking',
              difficulty: 'intermediate',
              note: 'Open Systems Interconnection. Standard per la comunicazione in rete: Fisico, Data Link, Network, Transport, Session, Presentation, Application.',
            },
            {
              english: 'TCP/IP Stack',
              italian: 'Stack TCP/IP',
              pronunciation: '/\u02CCti\u02D0 si\u02D0 pi\u02D0 \u02C8a\u026A pi\u02D0 st\u00E6k/',
              phonetic: 'tii-sii-pii ai-pii STAK',
              example:
                'The Internet is built on the TCP/IP stack. = Internet \u00E8 costruito sullo stack TCP/IP.',
              context: 'networking',
              difficulty: 'intermediate',
              note: 'Insieme di protocolli che governano Internet. Ha 4 livelli principali.',
            },
            {
              english: 'MAC Address',
              italian: 'Indirizzo MAC',
              pronunciation: '/m\u00E6k \u0259\u02C8dres/',
              phonetic: 'MAK a-DRES',
              example:
                'A MAC address is a unique hardware identifier. = Un indirizzo MAC \u00E8 un identificatore hardware unico.',
              context: 'networking',
              difficulty: 'intermediate',
              note: 'Media Access Control. Indirizzo fisico "bruciato" nella scheda di rete.',
            },
            {
              english: 'Network Interface Card (NIC)',
              italian: 'Scheda di Rete (NIC)',
              pronunciation: '/\u02C8netw\u025Crk \u02C8\u026Ant\u0259rfe\u026As k\u0251\u02D0rd/',
              phonetic: 'NET-uerk IN-ter-feis KARD',
              example:
                'The NIC connects the computer to the network. = La NIC connette il computer alla rete.',
              context: 'networking',
              difficulty: 'beginner',
            },
            {
              english: 'Switch',
              italian: 'Switch / Commutatore',
              pronunciation: '/sw\u026At\u0283/',
              phonetic: 'SUICC',
              example:
                "A switch connects devices within a LAN. = Uno switch connette i dispositivi all'interno di una LAN.",
              context: 'networking',
              difficulty: 'beginner',
              note: 'Lavora al Livello 2 (Data Link) usando gli indirizzi MAC.',
            },
            {
              english: 'Router',
              italian: 'Router / Instradatore',
              pronunciation: '/\u02C8ru\u02D0t\u0259r/ or /\u02C8ra\u028At\u0259r/',
              phonetic: 'RUU-ter',
              example: 'A router connects different networks. = Un router connette reti diverse.',
              context: 'networking',
              difficulty: 'beginner',
              note: 'Lavora al Livello 3 (Network) usando gli indirizzi IP.',
            },
            {
              english: 'Broadcast Domain',
              italian: 'Dominio di Broadcast',
              pronunciation: '/\u02C8br\u0254\u02D0dk\u00E6st do\u028A\u02C8me\u026An/',
              phonetic: 'BROD-kast de-MEIN',
              example:
                'VLANs help to reduce the broadcast domain. = Le VLAN aiutano a ridurre il dominio di broadcast.',
              context: 'networking',
              difficulty: 'advanced',
              note: "L'area della rete in cui un pacchetto broadcast pu\u00F2 essere ricevuto.",
            },
            {
              english: 'VLAN (Virtual Local Area Network)',
              italian: 'VLAN / Rete Locale Virtuale',
              pronunciation: '/\u02CCvi\u02D0 \u02C8l\u00E6n/',
              phonetic: 'vii-LAN',
              example:
                'Use VLANs to segment your network. = Usa le VLAN per segmentare la tua rete.',
              context: 'networking',
              difficulty: 'intermediate',
              note: 'Permette di separare logicamente reti fisicamente unite.',
            },
            {
              english: 'Subnetting',
              italian: 'Sottorete / Subnetting',
              pronunciation: '/\u02C8s\u028Cbn\u025Bt\u026A\u014B/',
              phonetic: 'SAB-net-ting',
              example:
                "Subnetting improves network security and efficiency. = Il subnetting migliora la sicurezza e l'efficienza della rete.",
              context: 'networking',
              difficulty: 'advanced',
              note: 'Dividere una rete IP in reti pi\u00F9 piccole (sottoreti).',
            },
            {
              english: 'Default Gateway',
              italian: 'Gateway Predefinito',
              pronunciation: '/d\u026A\u02C8f\u0254\u02D0lt \u02C8\u0261e\u026Atwe\u026A/',
              phonetic: 'di-FOLT GEIT-uei',
              example:
                'The default gateway is your exit point to the internet. = Il gateway predefinito \u00E8 il tuo punto di uscita verso internet.',
              context: 'networking',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_protocols',
          title: 'Protocolli / Protocols',
          description: 'TCP, UDP, DNS, HTTP',
          items: [
            {
              english: 'TCP (Transmission Control Protocol)',
              italian: 'TCP / Protocollo di Controllo Trasmissione',
              pronunciation: '/\u02CCti\u02D0 si\u02D0 \u02C8pi\u02D0/',
              phonetic: 'tii-sii-PII',
              example:
                'TCP is a connection-oriented protocol. = Il TCP \u00E8 un protocollo orientato alla connessione.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Livello 4. Garantisce la consegna dei pacchetti con il "three-way handshake" (SYN, SYN-ACK, ACK).',
            },
            {
              english: 'UDP (User Datagram Protocol)',
              italian: 'UDP / Protocollo Datagram Utente',
              pronunciation: '/\u02CCju\u02D0 di\u02D0 \u02C8pi\u02D0/',
              phonetic: 'iu-dii-PII',
              example:
                "Streaming services often use UDP. = I servizi di streaming spesso usano l'UDP.",
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Livello 4. Protocollo veloce ma senza conferma di ricezione (connectionless).',
            },
            {
              english: 'ICMP (Internet Control Message Protocol)',
              italian: 'ICMP / Messaggi di Controllo',
              pronunciation: '/\u02CCa\u026A si\u02D0 \u02CCem \u02C8pi\u02D0/',
              phonetic: 'ai-sii-em-PII',
              example:
                "Ping uses ICMP to check connectivity. = Il ping usa l'ICMP per controllare la connettivit\u00E0.",
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Livello 3. Usato per segnalazioni di errore e diagnostica di rete.',
            },
            {
              english: 'DNS (Domain Name System)',
              italian: 'DNS / Sistema Nomi a Dominio',
              pronunciation: '/\u02CCdi\u02D0 en \u02C8es/',
              phonetic: 'dii-en-ES',
              example:
                'DNS translates names into IP addresses. = Il DNS traduce i nomi in indirizzi IP.',
              context: 'protocols',
              difficulty: 'beginner',
              note: 'Protocollo Livello 7. "L\'elenco telefonico" di Internet.',
            },
            {
              english: 'DHCP (Dynamic Host Configuration Protocol)',
              italian: 'DHCP / Protocollo di Configurazione Dinamica Host',
              pronunciation: '/\u02CCdi\u02D0 e\u026At\u0283 si\u02D0 \u02C8pi\u02D0/',
              phonetic: 'dii-eic-sii-PII',
              example:
                'DHCP assigns IP addresses automatically. = Il DHCP assegna indirizzi IP automaticamente.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'SNMP (Simple Network Management Protocol)',
              italian: 'SNMP / Protocollo Semplice di Gestione Rete',
              pronunciation: '/\u02CCes en \u02CCem \u02C8pi\u02D0/',
              phonetic: 'es-en-em-PII',
              example:
                "Use SNMP to monitor network devices. = Usa l'SNMP per monitorare i dispositivi di rete.",
              context: 'protocols',
              difficulty: 'advanced',
            },
            {
              english: 'ARP (Address Resolution Protocol)',
              italian: 'ARP / Protocollo di Risoluzione Indirizzi',
              pronunciation: '/\u02CC\u0251\u02D0rp/',
              phonetic: 'ARP',
              example:
                "ARP maps IP addresses to MAC addresses. = L'ARP mappa indirizzi IP a indirizzi MAC.",
              context: 'protocols',
              difficulty: 'advanced',
              note: 'Livello 2/3. Fondamentale per far comunicare IP e hardware in una rete locale.',
            },
            {
              english: 'SFTP (Secure File Transfer Protocol)',
              italian: 'SFTP / Trasferimento File Sicuro',
              pronunciation: '/\u02CCes ef ti\u02D0 \u02C8pi\u02D0/',
              phonetic: 'es-ef-tii-PII',
              example:
                "SFTP encrypts data transfer over SSH. = L'SFTP crittografa il trasferimento dati su SSH.",
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'SSH (Secure Shell)',
              italian: 'SSH / Shell Sicura',
              pronunciation: '/\u02CCes es \u02C8e\u026At\u0283/',
              phonetic: 'es-es-EIC',
              example:
                'Use SSH to manage remote servers securely. = Usa SSH per gestire server remoti in modo sicuro.',
              context: 'protocols',
              difficulty: 'beginner',
            },
            {
              english: 'SMTP (Simple Mail Transfer Protocol)',
              italian: 'SMTP / Protocollo Invio Mail',
              pronunciation: '/\u02CCes em ti\u02D0 \u02C8pi\u02D0/',
              phonetic: 'es-em-tii-PII',
              example: "SMTP is used for sending emails. = L'SMTP \u00E8 usato per inviare email.",
              context: 'protocols',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'net_security',
          title: 'Sicurezza di Rete / Network Security',
          description: 'VPN, proxy, firewall rules',
          items: [
            {
              english: 'Network Segmentation',
              italian: 'Segmentazione della Rete',
              pronunciation: '/\u02C8netw\u025Crk \u02CCse\u0261men\u02C8te\u026A\u0283\u0259n/',
              phonetic: 'NET-uerk seg-men-TEI-scen',
              example:
                'Segmentation contains security breaches. = La segmentazione contiene le violazioni di sicurezza.',
              context: 'defense',
              difficulty: 'intermediate',
              note: 'Dividere la rete in sezioni isolate per limitare il movimento laterale degli attaccanti.',
            },
            {
              english: 'DMZ (Demilitarized Zone)',
              italian: 'Zona Demilitarizzata (DMZ)',
              pronunciation: '/\u02CCdi\u02D0 em \u02C8zed/',
              phonetic: 'dii-em-ZED',
              example:
                'Public servers are hosted in the DMZ. = I server pubblici sono ospitati nella DMZ.',
              context: 'architecture',
              difficulty: 'intermediate',
              note: "Sotto-rete isolata rivolta all'esterno, separata dalla rete interna fidata.",
            },
            {
              english: 'Air Gap',
              italian: 'Air Gap / Isolamento Fisico',
              pronunciation: '/\u02C8er \u0261\u00E6p/',
              phonetic: 'ER GAP',
              example:
                'The most critical systems are protected by an air gap. = I sistemi pi\u00F9 critici sono protetti da un isolamento fisico.',
              context: 'defense',
              difficulty: 'advanced',
              note: 'Isolamento totale di un computer: nessuna connessione a Internet o a reti esterne.',
            },
            {
              english: 'Port Mirroring',
              italian: 'Mirroring delle Porte',
              pronunciation: '/p\u0254\u02D0rt \u02C8m\u026Ar\u0259r\u026A\u014B/',
              phonetic: 'PORT MIR-rer-ing',
              example:
                'Port mirroring is used for network monitoring. = Il port mirroring \u00E8 usato per il monitoraggio della rete.',
              context: 'monitoring',
              difficulty: 'advanced',
              note: 'Inviare una copia del traffico di rete a uno strumento di monitoraggio o analisi.',
            },
            {
              english: 'Access Control List (ACL)',
              italian: 'Lista di Controllo Accessi',
              pronunciation: '/\u02CC\u00E6kses k\u0259n\u02C8tro\u028Al l\u026Ast/',
              phonetic: 'AK-ses kon-TROUL list',
              example:
                'ACLs on routers define who can enter. = Le ACL sui router definiscono chi pu\u00F2 entrare.',
              context: 'defense',
              difficulty: 'intermediate',
              note: 'Regole che permettono o negano il traffico in base a IP, porta o protocollo.',
            },
            {
              english: 'Port Security',
              italian: 'Sicurezza delle Porte',
              pronunciation: '/p\u0254\u02D0rt s\u026A\u02C8kj\u028A\u0259r\u0259ti/',
              phonetic: 'PORT si-KIUR-i-ti',
              example:
                'Port security prevents unauthorized devices from connecting. = La sicurezza delle porte impedisce la connessione di dispositivi non autorizzati.',
              context: 'defense',
              difficulty: 'intermediate',
              note: 'Tecnica di Livello 2 che limita gli indirizzi MAC che possono connettersi a una porta fisica.',
            },
            {
              english: 'NAT (Network Address Translation)',
              italian: 'Traduzione Indirizzi di Rete (NAT)',
              pronunciation: '/\u02CCen e\u026A \u02C8ti\u02D0/',
              phonetic: 'en-ei-TII',
              example:
                'NAT allows private IPs to access the internet. = Il NAT permette agli IP privati di accedere a internet.',
              context: 'networking',
              difficulty: 'intermediate',
            },
            {
              english: 'Packet Filtering',
              italian: 'Filtraggio Pacchetti',
              pronunciation: '/\u02C8p\u00E6k\u026At \u02C8f\u026Alt\u0259r\u026A\u014B/',
              phonetic: 'PA-kit FIL-ter-ing',
              example:
                'Basic firewalls use packet filtering. = I firewall di base usano il filtraggio dei pacchetti.',
              context: 'defense',
              difficulty: 'intermediate',
            },
            {
              english: 'Stateful Inspection',
              italian: 'Ispezione con Stato',
              pronunciation: '/\u02C8ste\u026Atf\u028Al \u026An\u02C8spek\u0283\u0259n/',
              phonetic: 'STEIT-ful in-SPE-scen',
              example:
                "Stateful inspection tracks connection context. = L'ispezione stateful tiene traccia del contesto della connessione.",
              context: 'defense',
              difficulty: 'advanced',
              note: 'Pi\u00F9 avanzata del semplice filtraggio: riconosce se un pacchetto fa parte di una sessione esistente.',
            },
            {
              english: 'Proxy Server',
              italian: 'Server Proxy / Intermediario',
              pronunciation: '/\u02C8pr\u0252ksi \u02C8s\u025C\u02D0rv\u0259r/',
              phonetic: 'PROK-si SER-ver',
              example:
                'A proxy server hides internal IP addresses. = Un server proxy nasconde gli indirizzi IP interni.',
              context: 'defense',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_wireless',
          title: 'Reti Wireless / Wireless Networks',
          description: 'WiFi security, WPA, WPS',
          items: [
            {
              english: 'SSID (Service Set Identifier)',
              italian: 'SSID / Nome della Rete',
              pronunciation: '/\u02CCes es e\u026A \u02C8di\u02D0/',
              phonetic: 'es-es-ei-DII',
              example:
                "Change the default SSID for security. = Cambia l'SSID predefinito per sicurezza.",
              context: 'wireless',
              difficulty: 'beginner',
              note: 'Il nome pubblico che identifica una rete wireless.',
            },
            {
              english: 'WEP (Wired Equivalent Privacy)',
              italian: 'WEP / Protocollo Obsoleto',
              pronunciation: '/\u02CCdab\u0259lju\u02D0 i\u02D0 \u02C8pi\u02D0/',
              phonetic: 'UEP',
              example:
                'WEP is outdated and very insecure. = Il WEP \u00E8 superato e molto insicuro.',
              context: 'wireless',
              difficulty: 'beginner',
              note: 'Il primo standard di sicurezza wireless, oggi facilmente violabile in pochi minuti.',
            },
            {
              english: 'WPA3 (Wi-Fi Protected Access 3)',
              italian: 'WPA3 / Standard Sicuro WiFi',
              pronunciation: '/\u02CCdab\u0259lju\u02D0 pi\u02D0 e\u026A \u02C8\u03B8ri\u02D0/',
              phonetic: 'u-pi-ei-THRI',
              example:
                'WPA3 is the most secure wireless standard today. = Il WPA3 \u00E8 lo standard wireless pi\u00F9 sicuro oggi.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Successore del WPA2. Introduce la protezione contro gli attacchi di forza bruta offline.',
            },
            {
              english: 'WPS (Wi-Fi Protected Setup)',
              italian: 'WPS / Configurazione WiFi Protetta',
              pronunciation: '/\u02CCdab\u0259lju\u02D0 pi\u02D0 \u02C8es/',
              phonetic: 'u-pi-ES',
              example:
                'Disable WPS to prevent PIN attacks. = Disabilita il WPS per prevenire attacchi via PIN.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Metodo semplificato per connettere dispositivi. Ha gravi vulnerabilit\u00E0 nel PIN a 8 cifre.',
            },
            {
              english: 'Rogue Access Point',
              italian: 'Access Point Canaglia',
              pronunciation: '/ro\u028A\u0261 \u02C8\u00E6kses p\u0254\u026Ant/',
              phonetic: 'ROUG ak-ses-POINT',
              example:
                'An unauthorized rogue access point was detected. = \u00C8 stato rilevato un access point non autorizzato.',
              context: 'threats',
              difficulty: 'intermediate',
              note: 'Un router WiFi connesso alla rete aziendale senza autorizzazione, creando una "porta sul retro".',
            },
            {
              english: 'Evil Twin',
              italian: 'Gemello Cattivo / Evil Twin',
              pronunciation: '/\u02C8i\u02D0vl tw\u026An/',
              phonetic: 'IIVL TUIN',
              example:
                'An evil twin attack mimics a legitimate hotspot. = Un attacco evil twin imita un hotspot legittimo.',
              context: 'threats',
              difficulty: 'intermediate',
              note: 'Un access point malevolo con lo stesso SSID di una rete fidata per rubare credenziali.',
            },
            {
              english: 'Wardriving',
              italian: 'Wardriving / Ricerca Reti',
              pronunciation: '/\u02C8w\u0254\u02D0rdra\u026Av\u026A\u014B/',
              phonetic: 'UOR-drai-ving',
              example:
                'Wardriving involves finding vulnerable WiFi while driving. = Il wardriving consiste nel trovare WiFi vulnerabili mentre si guida.',
              context: 'threats',
              difficulty: 'intermediate',
            },
            {
              english: 'Deauthentication Attack',
              italian: 'Attacco di Deautenticazione',
              pronunciation:
                '/di\u02D0\u02CC\u0254\u02D0\u03B8ent\u026A\u02C8ke\u026A\u0283\u0259n \u0259\u02C8t\u00E6k/',
              phonetic: 'dii-o-then-ti-KEI-scen a-TAK',
              example:
                'A deauthentication attack forces clients to disconnect. = Un attacco di deautenticazione forza i client a disconnettersi.',
              context: 'threats',
              difficulty: 'advanced',
              note: "Spesso usato per catturare l'handshake WPA necessario per decifrare la password.",
            },
            {
              english: 'WIPS (Wireless Intrusion Prevention System)',
              italian: 'WIPS / Prevenzione Intrusioni Wireless',
              pronunciation: '/\u02CCdab\u0259lju\u02D0 a\u026A pi\u02D0 \u02C8es/',
              phonetic: 'u-ai-pi-ES',
              example:
                'A WIPS monitors for rogue devices. = Un WIPS monitora i dispositivi non autorizzati.',
              context: 'defense',
              difficulty: 'advanced',
            },
            {
              english: 'Captive Portal',
              italian: 'Portale Captive',
              pronunciation: '/\u02C8k\u00E6pt\u026Av \u02C8p\u0254\u02D0rtl/',
              phonetic: 'KAP-tiv POR-tal',
              example:
                "Public WiFi often uses a captive portal for login. = Le WiFi pubbliche usano spesso un portale captive per l'accesso.",
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'La pagina web che appare quando ti connetti a una WiFi pubblica chiedendo login o accettazione termini.',
            },
          ],
        },
      ],
    },
    4: {
      name: 'Crittografia / Cryptography',
      description: 'Il mondo della crittografia e delle chiavi',
      lessons: [
        {
          id: 'crypto_symmetric',
          title: 'Crittografia Simmetrica / Symmetric',
          description: 'AES, DES, chiavi condivise',
          items: [
            {
              english: 'Symmetric Encryption',
              italian: 'Crittografia Simmetrica',
              pronunciation: '/s\u026A\u02C8metr\u026Ak \u026An\u02C8kr\u026Ap\u0283\u0259n/',
              phonetic: 'sim-ME-trik in-KRIP-scen',
              example:
                'Symmetric encryption uses the same key for both encryption and decryption. = La crittografia simmetrica usa la stessa chiave sia per la cifratura che per la decifratura.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Veloce ed efficiente, ma richiede un modo sicuro per scambiarsi la chiave.',
            },
            {
              english: 'Plaintext',
              italian: 'Testo in Chiaro',
              pronunciation: '/\u02C8ple\u026Antekst/',
              phonetic: 'PLEIN-tekst',
              example:
                'The plaintext is encrypted into ciphertext. = Il testo in chiaro viene cifrato in testo cifrato.',
              context: 'cryptography',
              difficulty: 'beginner',
              note: 'Il messaggio originale leggibile prima della cifratura.',
            },
            {
              english: 'Ciphertext',
              italian: 'Testo Cifrato',
              pronunciation: '/\u02C8sa\u026Af\u0259rtekst/',
              phonetic: 'SAI-fer-tekst',
              example:
                'Ciphertext looks like random characters. = Il testo cifrato sembra un insieme casuale di caratteri.',
              context: 'cryptography',
              difficulty: 'beginner',
              note: 'Il risultato della cifratura, incomprensibile senza la chiave corretta.',
            },
            {
              english: 'Encryption Key',
              italian: 'Chiave di Cifratura',
              pronunciation: '/\u026An\u02C8kr\u026Ap\u0283\u0259n ki\u02D0/',
              phonetic: 'in-KRIP-scen KII',
              example:
                'Keep your encryption key safe. = Tieni al sicuro la tua chiave di cifratura.',
              context: 'cryptography',
              difficulty: 'beginner',
            },
            {
              english: 'AES (Advanced Encryption Standard)',
              italian: 'AES / Standard di Cifratura Avanzata',
              pronunciation: '/\u02CCe\u026A i\u02D0 \u02C8es/',
              phonetic: 'ei-ii-ES',
              example:
                "AES is the industry standard for symmetric encryption. = L'AES \u00E8 lo standard industriale per la crittografia simmetrica.",
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Supporta chiavi a 128, 192 e 256 bit. Considerato sicuro anche contro computer quantistici (nella versione 256-bit).',
            },
            {
              english: 'DES (Data Encryption Standard)',
              italian: 'DES / Standard di Cifratura Dati',
              pronunciation: '/\u02CCdi\u02D0 i\u02D0 \u02C8es/',
              phonetic: 'dii-ii-ES',
              example:
                'DES is now considered insecure due to its short key length. = Il DES \u00E8 oggi considerato insicuro a causa della sua chiave troppo corta.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Standard del 1977 con chiave a 56 bit. Oggi facilmente violabile.',
            },
            {
              english: 'Stream Cipher',
              italian: 'Cifrario a Flusso',
              pronunciation: '/stri\u02D0m \u02C8sa\u026Af\u0259r/',
              phonetic: 'STRIIM SAI-fer',
              example:
                'A stream cipher encrypts digits one by one. = Un cifrario a flusso cifra i dati un bit alla volta.',
              context: 'cryptography',
              difficulty: 'advanced',
              note: 'Veloce e utile per lo streaming in tempo reale.',
            },
            {
              english: 'Block Cipher',
              italian: 'Cifrario a Blocchi',
              pronunciation: '/bl\u0252k \u02C8sa\u026Af\u0259r/',
              phonetic: 'BLOK SAI-fer',
              example: "AES is a block cipher. = L'AES \u00E8 un cifrario a blocchi.",
              context: 'cryptography',
              difficulty: 'advanced',
              note: 'Divide il testo in blocchi di dimensione fissa (es. 128 bit) prima di cifrarli.',
            },
            {
              english: 'Initialization Vector (IV)',
              italian: 'Vettore di Inizializzazione (IV)',
              pronunciation:
                '/\u026A\u02CCn\u026A\u0283\u0259la\u026A\u02C8ze\u026A\u0283\u0259n \u02C8vekt\u0259r/',
              phonetic: 'i-ni-scia-lai-ZEI-scen VEK-ter',
              example:
                "The IV ensures that identical plaintexts result in different ciphertexts. = L'IV garantisce che testi in chiaro identici producano testi cifrati diversi.",
              context: 'cryptography',
              difficulty: 'advanced',
              note: 'Numero casuale usato per rendere unica ogni cifratura anche con la stessa chiave.',
            },
            {
              english: 'Key Exchange',
              italian: 'Scambio di Chiavi',
              pronunciation: '/ki\u02D0 \u026Ak\u02C8st\u0283e\u026And\u0292/',
              phonetic: 'KII iks-CEING',
              example:
                'Secure key exchange is the main problem of symmetric crypto. = Lo scambio sicuro di chiavi \u00E8 il problema principale della crittografia simmetrica.',
              context: 'cryptography',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'crypto_asymmetric',
          title: 'Crittografia Asimmetrica / Asymmetric',
          description: 'RSA, chiave pubblica/privata',
          items: [
            {
              english: 'Asymmetric Encryption',
              italian: 'Crittografia Asimmetrica',
              pronunciation:
                '/\u02CCe\u026As\u026A\u02C8metr\u026Ak \u026An\u02C8kr\u026Ap\u0283\u0259n/',
              phonetic: 'ei-sim-ME-trik in-KRIP-scen',
              example:
                'Public-key cryptography is also called asymmetric encryption. = La crittografia a chiave pubblica \u00E8 chiamata anche asimmetrica.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Usa due chiavi diverse ma matematicamente legate tra loro.',
            },
            {
              english: 'Public Key',
              italian: 'Chiave Pubblica',
              pronunciation: '/\u02C8p\u028Cbl\u026Ak ki\u02D0/',
              phonetic: 'PA-blik KII',
              example:
                'Distribute your public key so people can encrypt messages for you. = Distribuisci la tua chiave pubblica cos\u00EC gli altri possono cifrare messaggi per te.',
              context: 'cryptography',
              difficulty: 'beginner',
              note: 'Libera per tutti; serve per cifrare o verificare firme.',
            },
            {
              english: 'Private Key',
              italian: 'Chiave Privata',
              pronunciation: '/\u02C8pra\u026Av\u0259t ki\u02D0/',
              phonetic: 'PRAI-vet KII',
              example:
                'Losing your private key means losing your encrypted data. = Perdere la chiave privata significa perdere i tuoi dati cifrati.',
              context: 'cryptography',
              difficulty: 'beginner',
              note: 'Segreta; serve per decifrare o firmare messaggi.',
            },
            {
              english: 'Key Pair',
              italian: 'Coppia di Chiavi',
              pronunciation: '/ki\u02D0 per/',
              phonetic: 'KII PER',
              example:
                'A key pair consists of a public and a private key. = Una coppia di chiavi consiste in una chiave pubblica e una privata.',
              context: 'cryptography',
              difficulty: 'intermediate',
            },
            {
              english: 'RSA (Rivest-Shamir-Adleman)',
              italian: 'RSA / Algoritmo a Chiave Pubblica',
              pronunciation: '/\u02CC\u0251\u02D0r \u02CCes \u02C8e\u026A/',
              phonetic: 'ar-es-EI',
              example:
                "RSA is based on the difficulty of factoring large integers. = L'RSA si basa sulla difficolt\u00E0 di fattorizzare numeri interi molto grandi.",
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Uno degli algoritmi pi\u00F9 usati oggi al mondo. Prende il nome dai suoi inventori.',
            },
            {
              english: 'ECC (Elliptic Curve Cryptography)',
              italian: 'Crittografia a Curve Ellittiche (ECC)',
              pronunciation: '/\u02CCi\u02D0 si\u02D0 \u02C8si\u02D0/',
              phonetic: 'ii-sii-SII',
              example:
                "ECC provides more security with smaller keys than RSA. = L'ECC offre pi\u00F9 sicurezza con chiavi pi\u00F9 piccole rispetto all'RSA.",
              context: 'cryptography',
              difficulty: 'advanced',
              note: 'Ideale per dispositivi con poca potenza di calcolo come gli smartphone.',
            },
            {
              english: 'Diffie-Hellman',
              italian: 'Diffie-Hellman / Scambio Chiavi',
              pronunciation: '/\u02CCd\u026Afi \u02C8helm\u0259n/',
              phonetic: 'DI-fi HEL-man',
              example:
                'The Diffie-Hellman protocol allows two parties to share a secret key. = Il protocollo Diffie-Hellman permette a due parti di condividere una chiave segreta.',
              context: 'cryptography',
              difficulty: 'advanced',
              note: 'Permette di scambiare una chiave simmetrica in modo sicuro su un canale insicuro.',
            },
            {
              english: 'PGP (Pretty Good Privacy)',
              italian: 'PGP / Software Crittografico',
              pronunciation: '/\u02CCpi\u02D0 d\u0292i\u02D0 \u02C8pi\u02D0/',
              phonetic: 'pii-gii-PII',
              example: 'Sign and encrypt emails with PGP. = Firma e cifra le email con PGP.',
              context: 'cryptography',
              difficulty: 'intermediate',
            },
            {
              english: 'Forward Secrecy',
              italian: 'Segretezza Inoltrata',
              pronunciation: '/\u02C8f\u0254\u02D0rw\u0259rd \u02C8si\u02D0kr\u0259si/',
              phonetic: 'FOR-uard SII-cre-si',
              example:
                'PFS ensures that past communication remains secure even if keys are leaked. = Il PFS garantisce che le comunicazioni passate rimangano sicure anche se le chiavi vengono rubate.',
              context: 'cryptography',
              difficulty: 'advanced',
              note: 'Usa chiavi temporanee (effimere) per ogni sessione invece di una sola chiave fissa.',
            },
            {
              english: 'GPG (GNU Privacy Guard)',
              italian: 'GPG / Versione Open di PGP',
              pronunciation: '/\u02CCd\u0292i\u02D0 pi\u02D0 \u02C8d\u0292i\u02D0/',
              phonetic: 'gii-pii-GII',
              example:
                "GPG is the open-source alternative to PGP. = GPG \u00E8 l'alternativa open source a PGP.",
              context: 'cryptography',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'crypto_hash',
          title: 'Hash e Firme / Hashing & Signatures',
          description: 'SHA, MD5, firma digitale',
          items: [
            {
              english: 'Hashing',
              italian: 'Hashing / Impronta Digitale',
              pronunciation: '/\u02C8h\u00E6\u0283\u026A\u014B/',
              phonetic: 'HA-scing',
              example:
                "Hashing ensures data integrity. = L'hashing garantisce l'integrit\u00E0 dei dati.",
              context: 'cryptography',
              difficulty: 'beginner',
              note: 'Funzione unidirezionale (one-way). Trasforma dati di qualsiasi dimensione in una stringa fissa.',
            },
            {
              english: 'Message Digest',
              italian: 'Digest del Messaggio',
              pronunciation: '/\u02C8mes\u026Ad\u0292 \u02C8da\u026Ad\u0292est/',
              phonetic: 'ME-sig DAI-gest',
              example:
                'The hash function generates a message digest. = La funzione di hash genera un digest del messaggio.',
              context: 'cryptography',
              difficulty: 'intermediate',
            },
            {
              english: 'Collision',
              italian: 'Collisione',
              pronunciation: '/k\u0259\u02C8l\u026A\u0292\u0259n/',
              phonetic: 'col-LI-sion',
              example:
                'A hash collision occurs when two inputs result in the same output. = Una collisione avviene quando due input producono lo stesso output.',
              context: 'cryptography',
              difficulty: 'advanced',
              note: 'Rende un algoritmo di hash insicuro e vulnerabile ad attacchi.',
            },
            {
              english: 'SHA-256 (Secure Hash Algorithm)',
              italian: 'SHA-256 / Algoritmo Hash Sicuro',
              pronunciation: '/\u02CC\u025B\u0283 e\u026A t\u028Au \u02C8f\u026Afti s\u026Aks/',
              phonetic: 'scia-256',
              example:
                'SHA-256 is the standard for checking file integrity. = Lo SHA-256 \u00E8 lo standard per il controllo integrit\u00E0.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Usato in Bitcoin, nei certificati SSL e in molte app di sicurezza.',
            },
            {
              english: 'MD5 (Message Digest 5)',
              italian: 'MD5 / Algoritmo Hash Obsoleto',
              pronunciation: '/\u02CCem di\u02D0 \u02C8fa\u026Av/',
              phonetic: 'em-dii-FAIV',
              example:
                'Do not use MD5 for security as it is prone to collisions. = Non usare MD5 per la sicurezza perch\u00E9 vulnerabile alle collisioni.',
              context: 'cryptography',
              difficulty: 'beginner',
            },
            {
              english: 'Salt',
              italian: 'Sale / Salt',
              pronunciation: '/s\u0254\u02D0lt/',
              phonetic: 'SOLT',
              example:
                'Add a salt to passwords before hashing them. = Aggiungi un salt alle password prima di cifrarle.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: 'Stringa casuale aggiunta per evitare attacchi di tipo "rainbow table".',
            },
            {
              english: 'Pepper',
              italian: 'Pepe / Pepper',
              pronunciation: '/\u02C8pep\u0259r/',
              phonetic: 'PEP-per',
              example:
                'Unlike salt, a pepper is secret and not stored in the DB. = A differenza del salt, il pepper \u00E8 segreto e non salvato nel DB.',
              context: 'cryptography',
              difficulty: 'advanced',
            },
            {
              english: 'Digital Signature',
              italian: 'Firma Digitale',
              pronunciation:
                '/\u02C8d\u026Ad\u0292\u026At\u0259l \u02C8s\u026A\u0261n\u0259t\u0283\u0259r/',
              phonetic: 'DI-gi-tel SIG-ne-cer',
              example:
                'A digital signature provides authenticity. = Una firma digitale fornisce autenticit\u00E0.',
              context: 'cryptography',
              difficulty: 'intermediate',
              note: "Cifra l'hash del messaggio con la propria chiave privata.",
            },
            {
              english: 'Non-repudiation',
              italian: 'Non ripudiabilit\u00E0',
              pronunciation: '/\u02CCn\u0252n r\u026A\u02CCpju\u02D0di\u02C8e\u026A\u0283\u0259n/',
              phonetic: 'non-ri-piu-di-EI-scen',
              example:
                'Digital signatures ensure non-repudiation. = Le firme digitali garantiscono la non ripudiabilit\u00E0.',
              context: 'legal-security',
              difficulty: 'advanced',
              note: "L'autore non pu\u00F2 negare di aver inviato il messaggio.",
            },
            {
              english: 'HMAC (Hash-based Message Authentication Code)',
              italian: 'HMAC / Codice Autenticazione Hash',
              pronunciation: '/\u02CCe\u026At\u0283 \u02CCem e\u026A \u02C8si\u02D0/',
              phonetic: 'eic-em-ei-SII',
              example:
                "HMAC uses a secret key and a hash function. = L'HMAC usa una chiave segreta e una funzione di hash.",
              context: 'cryptography',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'crypto_pki',
          title: 'PKI e Certificati / PKI & Certificates',
          description: 'CA, certificati, catena di fiducia',
          items: [
            {
              english: 'PKI (Public Key Infrastructure)',
              italian: 'PKI / Infrastruttura Chiave Pubblica',
              pronunciation: '/\u02CCpi\u02D0 ke\u026A \u02C8a\u026A/',
              phonetic: 'pii-kei-AI',
              example:
                'PKI manages the distribution and life cycle of keys. = La PKI gestisce la distribuzione e il ciclo di vita delle chiavi.',
              context: 'architecture',
              difficulty: 'intermediate',
              note: 'Insieme di persone, politiche e tecnologie che gestiscono i certificati digitali.',
            },
            {
              english: 'CA (Certificate Authority)',
              italian: 'Autorit\u00E0 di Certificazione (CA)',
              pronunciation: '/\u02CCsi\u02D0 \u02C8e\u026A/',
              phonetic: 'sii-EI',
              example: 'Verisign is a well-known CA. = Verisign \u00E8 una nota CA.',
              context: 'trust-infrastructure',
              difficulty: 'intermediate',
              note: 'Entit\u00E0 fidata che emette e firma i certificati digitali.',
            },
            {
              english: 'RA (Registration Authority)',
              italian: 'Autorit\u00E0 di Registrazione (RA)',
              pronunciation: '/\u02CC\u0251\u02D0r \u02C8e\u026A/',
              phonetic: 'ar-EI',
              example:
                "The RA verifies the identity of certificate requesters. = La RA verifica l'identit\u00E0 di chi richiede il certificato.",
              context: 'trust-infrastructure',
              difficulty: 'advanced',
            },
            {
              english: 'CSR (Certificate Signing Request)',
              italian: 'Richiesta di Firma Certificato',
              pronunciation: '/\u02CCsi\u02D0 \u02CCes \u02C8\u0251\u02D0r/',
              phonetic: 'sii-es-AR',
              example:
                'Create a CSR on your server before asking the CA. = Crea una CSR sul tuo server prima di chiedere alla CA.',
              context: 'management',
              difficulty: 'advanced',
              note: 'Messaggio inviato alla CA per richiedere un certificato digitale.',
            },
            {
              english: 'X.509',
              italian: 'X.509 / Standard Certificati',
              pronunciation: '/eks fa\u026Av \u02CCo\u028A \u02C8na\u026An/',
              phonetic: 'eks-509',
              example:
                "X.509 is the standard for public key certificates. = L'X.509 \u00E8 lo standard per i certificati a chiave pubblica.",
              context: 'standards',
              difficulty: 'advanced',
              note: 'Il formato standard dei certificati digitali (usato anche per HTTPS).',
            },
            {
              english: 'CRL (Certificate Revocation List)',
              italian: 'Lista di Revoca Certificati',
              pronunciation: '/\u02CCsi\u02D0 \u02CC\u0251\u02D0r \u02C8el/',
              phonetic: 'sii-ar-EL',
              example:
                'The browser checks the CRL for revoked certificates. = Il browser controlla la CRL per i certificati revocati.',
              context: 'management',
              difficulty: 'advanced',
              note: 'Una "lista nera" di certificati che non sono pi\u00F9 validi.',
            },
            {
              english: 'OCSP (Online Certificate Status Protocol)',
              italian: 'OCSP / Controllo Stato Online',
              pronunciation: '/\u02CCo\u028A si\u02D0 \u02CCes \u02C8pi\u02D0/',
              phonetic: 'ou-sii-es-PII',
              example:
                "OCSP is faster than CRL for revocation checking. = L'OCSP \u00E8 pi\u00F9 veloce della CRL per il controllo delle revoche.",
              context: 'protocols',
              difficulty: 'advanced',
            },
            {
              english: 'Root Certificate',
              italian: 'Certificato Radice (Root)',
              pronunciation: '/ru\u02D0t s\u0259r\u02C8t\u026Af\u026Ak\u0259t/',
              phonetic: 'RUUT ser-TI-fi-ket',
              example:
                'Root certificates are stored in your operating system. = I certificati root sono salvati nel tuo sistema operativo.',
              context: 'trust-infrastructure',
              difficulty: 'intermediate',
              note: 'La base di tutta la fiducia digitale; se questo \u00E8 compromesso, tutto crolla.',
            },
            {
              english: 'Intermediate Certificate',
              italian: 'Certificato Intermedio',
              pronunciation:
                '/\u02CC\u026Ant\u0259r\u02C8mi\u02D0di\u0259t s\u0259r\u02C8t\u026Af\u026Ak\u0259t/',
              phonetic: 'in-ter-MII-di-et ser-TI-fi-ket',
              example:
                'Intermediate certificates link your certificate to the root. = I certificati intermedi collegano il tuo certificato al root.',
              context: 'trust-infrastructure',
              difficulty: 'advanced',
            },
            {
              english: 'Trust Chain',
              italian: 'Catena di Fiducia',
              pronunciation: '/tr\u028Cst t\u0283e\u026An/',
              phonetic: 'TRAST CEIN',
              example:
                "Verify the whole trust chain before proceeding. = Verifica l'intera catena di fiducia prima di procedere.",
              context: 'trust-infrastructure',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },
    5: {
      name: 'Sicurezza Web / Web Security',
      description: 'Vulnerabilit\u00E0 e protezione delle applicazioni web',
      lessons: [
        {
          id: 'web_injection',
          title: 'Injection Attacks',
          description: 'SQL injection, XSS, command injection',
          items: [
            {
              english: 'SQL Injection (SQLi)',
              italian: 'SQL Injection / Iniezione SQL',
              pronunciation: '/\u02CCes kju\u02D0 \u02C8el \u026An\u02C8d\u0292ek\u0283\u0259n/',
              phonetic: 'es-kiu-el in-GEK-scen',
              example:
                'SQLi allows attackers to steal data from a database. = La SQLi permette agli attaccanti di rubare dati da un database.',
              context: 'web-vulnerabilities',
              difficulty: 'intermediate',
              note: "Consiste nell'inserire codice SQL malevolo nei campi di input per manipolare le query del database.",
            },
            {
              english: 'Cross-Site Scripting (XSS)',
              italian: 'Cross-Site Scripting / XSS',
              pronunciation: '/kr\u0252s sa\u026At \u02C8skr\u026Apt\u026A\u014B/',
              phonetic: 'CROS sait SKRIP-ting',
              example:
                "XSS can be used to steal session cookies. = L'XSS pu\u00F2 essere usato per rubare i cookie di sessione.",
              context: 'web-vulnerabilities',
              difficulty: 'intermediate',
              note: 'Iniezione di script malevoli (solitamente JavaScript) nelle pagine web visualizzate da altri utenti.',
            },
            {
              english: 'Stored XSS',
              italian: 'XSS Persistente / Memorizzato',
              pronunciation: '/st\u0254\u02D0rd \u02CCeks es \u02C8es/',
              phonetic: 'STORD eks-es-ES',
              example:
                "Stored XSS is saved on the server, like in a comment. = L'XSS memorizzato \u00E8 salvato sul server, ad esempio in un commento.",
              context: 'web-vulnerabilities',
              difficulty: 'advanced',
              note: 'Molto pericoloso: lo script colpisce chiunque visiti la pagina infetta.',
            },
            {
              english: 'Reflected XSS',
              italian: 'XSS Riflesso',
              pronunciation: '/r\u026A\u02C8flekt\u026Ad \u02CCeks es \u02C8es/',
              phonetic: 're-FLEK-ted eks-es-ES',
              example:
                "Reflected XSS is often delivered via malicious links. = L'XSS riflesso \u00E8 spesso inviato tramite link malevoli.",
              context: 'web-vulnerabilities',
              difficulty: 'advanced',
              note: 'Lo script non \u00E8 salvato nel server, ma viene "riflesso" immediatamente tramite un parametro (es. nell\'URL).',
            },
            {
              english: 'DOM-based XSS',
              italian: 'XSS basato sul DOM',
              pronunciation: '/\u02CCdi\u02D0 o\u028A \u02CCem be\u026Ast \u02CCeks es \u02C8es/',
              phonetic: 'dii-ou-em beist eks-es-ES',
              example:
                "DOM XSS happens entirely on the client side. = L'XSS nel DOM avviene interamente sul lato client.",
              context: 'web-vulnerabilities',
              difficulty: 'advanced',
            },
            {
              english: 'Command Injection',
              italian: 'Iniezione di Comandi',
              pronunciation: '/k\u0259\u02C8m\u00E6nd \u026An\u02C8d\u0292ek\u0283\u0259n/',
              phonetic: 'com-MAND in-GEK-scen',
              example:
                "Command injection can give full server access. = L'iniezione di comandi pu\u00F2 dare pieno accesso al server.",
              context: 'web-vulnerabilities',
              difficulty: 'intermediate',
              note: "Permette di eseguire comandi del sistema operativo attraverso un'applicazione vulnerabile.",
            },
            {
              english: 'LDAP Injection',
              italian: 'Iniezione LDAP',
              pronunciation:
                '/\u02CCel di\u02D0 e\u026A pi\u02D0 \u026An\u02C8d\u0292ek\u0283\u0259n/',
              phonetic: 'el-dii-ei-pii in-GEK-scen',
              example:
                "LDAP injection targets directory services. = L'iniezione LDAP colpisce i servizi di directory.",
              context: 'web-vulnerabilities',
              difficulty: 'advanced',
            },
            {
              english: 'XML External Entity (XXE)',
              italian: 'Entit\u00E0 Esterna XML (XXE)',
              pronunciation:
                '/\u02CCeks \u02CCem \u02C8el \u026Ak\u02C8st\u025Crnl \u02C8ent\u0259ti/',
              phonetic: 'eks-em-el ek-STER-nal EN-ti-ti',
              example:
                "XXE can lead to disclosure of internal files. = L'XXE pu\u00F2 portare all'esposizione di file interni.",
              context: 'web-vulnerabilities',
              difficulty: 'advanced',
              note: 'Sfrutta i parser XML per leggere file locali o scansionare la rete interna.',
            },
            {
              english: 'Sanitization',
              italian: 'Sanitizzazione / Pulizia',
              pronunciation: '/\u02CCs\u00E6n\u026At\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'se-ni-ti-ZEI-scen',
              example:
                "Input sanitization prevents injection attacks. = La sanitizzazione dell'input previene gli attacchi injection.",
              context: 'defense',
              difficulty: 'intermediate',
              note: "Rimuovere o neutralizzare caratteri pericolosi dall'input dell'utente.",
            },
            {
              english: 'Parameterized Query',
              italian: 'Query Parametrizzata',
              pronunciation:
                '/p\u0259\u02C8r\u00E6m\u026At\u0259ra\u026Azd \u02C8kw\u026A\u0259ri/',
              phonetic: 'pe-RA-me-traizd KUI-ri',
              example:
                'Use parameterized queries to stop SQLi. = Usa le query parametrizzate per fermare la SQLi.',
              context: 'defense',
              difficulty: 'intermediate',
              note: 'La difesa principale contro SQL Injection: separa i dati dal codice della query.',
            },
          ],
        },
        {
          id: 'web_auth',
          title: 'Autenticazione Web / Web Auth',
          description: 'OAuth, JWT, sessioni',
          items: [
            {
              english: 'Session Management',
              italian: 'Gestione della Sessione',
              pronunciation: '/\u02C8se\u0283\u0259n \u02C8m\u00E6n\u026Ad\u0292m\u0259nt/',
              phonetic: 'SE-scen MAN-ig-ment',
              example:
                'Secure session management is critical. = Una gestione sicura della sessione \u00E8 critica.',
              context: 'web-security',
              difficulty: 'intermediate',
              note: "Come l'applicazione mantiene lo stato di login tra diverse richieste HTTP.",
            },
            {
              english: 'Session Hijacking',
              italian: 'Dirottamento di Sessione',
              pronunciation: '/\u02C8se\u0283\u0259n \u02C8ha\u026Ad\u0292\u00E6k\u026A\u014B/',
              phonetic: 'SE-scen HAI-giak-ing',
              example:
                'Stealing cookies leads to session hijacking. = Rubare i cookie porta al dirottamento della sessione.',
              context: 'web-vulnerabilities',
              difficulty: 'intermediate',
              note: 'Un attaccante ruba il Session ID di un utente per spacciarsi per lui.',
            },
            {
              english: 'Session Fixation',
              italian: 'Fissazione di Sessione',
              pronunciation: '/\u02C8se\u0283\u0259n f\u026Ak\u02C8se\u026A\u0283\u0259n/',
              phonetic: 'SE-scen fik-SEI-scen',
              example:
                "Session fixation involves pre-setting a user's session ID. = La fissazione di sessione consiste nel pre-impostare l'ID sessione dell'utente.",
              context: 'web-vulnerabilities',
              difficulty: 'advanced',
            },
            {
              english: 'HttpOnly Cookie',
              italian: 'Cookie HttpOnly',
              pronunciation:
                '/\u02CCe\u026At\u0283 ti\u02D0 ti\u02D0 pi\u02D0 \u02C8o\u028Anli \u02C8k\u028Aki/',
              phonetic: 'eic-tii-tii-pii-OUN-li KU-ki',
              example:
                'HttpOnly cookies cannot be accessed by JavaScript. = I cookie HttpOnly non sono accessibili via JavaScript.',
              context: 'defense',
              difficulty: 'intermediate',
              note: 'Protezione fondamentale contro il furto di cookie tramite XSS.',
            },
            {
              english: 'JWT (JSON Web Token)',
              italian: 'JWT / Token Web JSON',
              pronunciation: '/\u02CCd\u0292e\u026A \u02CCdab\u0259lju\u02D0 \u02C8ti\u02D0/',
              phonetic: 'GEI-dabliu-TII',
              example:
                "JWT is often used for stateless authentication. = Il JWT \u00E8 spesso usato per l'autenticazione stateless.",
              context: 'web-security',
              difficulty: 'intermediate',
              note: 'Un token compatto e sicuro per trasmettere informazioni tra le parti.',
            },
            {
              english: 'OAuth 2.0',
              italian: 'OAuth 2.0 / Standard Autorizzazione',
              pronunciation:
                '/\u02C8o\u028A \u02CC\u0254\u02D0\u03B8 t\u028Au \u02CCp\u0254\u026Ant \u02C8o\u028A/',
              phonetic: 'OU-oth 2.0',
              example:
                'OAuth 2.0 allows apps to access resources on your behalf. = OAuth 2.0 permette alle app di accedere alle risorse per tuo conto.',
              context: 'web-security',
              difficulty: 'advanced',
              note: 'Usato per il "Login con Google/Facebook" senza condividere la password.',
            },
            {
              english: 'OpenID Connect (OIDC)',
              italian: 'OpenID Connect / Layer Identit\u00E0',
              pronunciation:
                '/\u02C8o\u028Ap\u0259n \u02CCa\u026A \u02CCdi\u02D0 k\u0259\u02C8nekt/',
              phonetic: 'OUPEN ai-dii co-NEKT',
              example:
                "OIDC adds an identity layer on top of OAuth 2.0. = L'OIDC aggiunge un livello di identit\u00E0 sopra OAuth 2.0.",
              context: 'web-security',
              difficulty: 'advanced',
            },
            {
              english: 'SAML (Security Assertion Markup Language)',
              italian: 'SAML / Standard SSO',
              pronunciation: '/\u02C8s\u00E6m\u0259l/',
              phonetic: 'SAM-el',
              example:
                "SAML is common in enterprise environments for SSO. = Il SAML \u00E8 comune negli ambienti enterprise per l'SSO.",
              context: 'web-security',
              difficulty: 'advanced',
              note: 'Basato su XML, usato per scambiare dati di autenticazione e autorizzazione.',
            },
            {
              english: 'Credential Stuffing',
              italian: 'Credential Stuffing',
              pronunciation: '/kr\u026A\u02C8den\u0283l \u02C8st\u028Cf\u026A\u014B/',
              phonetic: 'cre-DEN-scial STAF-fing',
              example:
                'Credential stuffing uses leaked passwords from other sites. = Il credential stuffing usa password rubate da altri siti.',
              context: 'threats',
              difficulty: 'intermediate',
              note: 'Attacco automatizzato che prova coppie username/password rubate su molti siti diversi.',
            },
            {
              english: 'Secure Cookie',
              italian: 'Cookie Sicuro (Secure Flag)',
              pronunciation: '/s\u026A\u02C8kj\u028A\u0259r \u02C8k\u028Aki/',
              phonetic: 'si-KIUR KU-ki',
              example:
                'The secure flag ensures the cookie is sent only over HTTPS. = Il flag secure garantisce che il cookie sia inviato solo via HTTPS.',
              context: 'defense',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'web_owasp',
          title: 'OWASP Top 10',
          description: 'Le 10 vulnerabilit\u00E0 pi\u00F9 critiche',
          items: [
            {
              english: 'OWASP (Open Web Application Security Project)',
              italian: 'OWASP / Progetto Sicurezza Web',
              pronunciation: '/\u02C8o\u028A\u02CC\u0251\u02D0sp/',
              phonetic: 'OU-asp',
              example:
                'OWASP provides guidance on web security. = OWASP fornisce linee guida sulla sicurezza web.',
              context: 'organizations',
              difficulty: 'beginner',
              note: 'Fondazione no-profit globale che lavora per migliorare la sicurezza del software.',
            },
            {
              english: 'Broken Access Control',
              italian: 'Controllo Accessi Difettoso',
              pronunciation: '/\u02C8bro\u028Ak\u0259n \u02C8\u00E6kses k\u0259n\u02C8tro\u028Al/',
              phonetic: 'BROUKEN ak-ses kon-TROUL',
              example:
                'Broken access control is #1 on the OWASP Top 10. = Il controllo accessi difettoso \u00E8 al primo posto della OWASP Top 10.',
              context: 'owasp-top-10',
              difficulty: 'intermediate',
              note: 'Vulnerabilit\u00E0 che permette di accedere a risorse fuori dai propri permessi.',
            },
            {
              english: 'Cryptographic Failures',
              italian: 'Errori Crittografici',
              pronunciation:
                '/\u02CCkr\u026Apt\u0259\u02C8\u0261r\u00E6f\u026Ak \u02C8fe\u026Alj\u0259rz/',
              phonetic: 'crip-to-GRA-fic FEIL-iurz',
              example:
                'Using weak algorithms leads to cryptographic failures. = Usare algoritmi deboli porta a errori crittografici.',
              context: 'owasp-top-10',
              difficulty: 'intermediate',
              note: 'Esposizione di dati sensibili a causa di crittografia debole o assente.',
            },
            {
              english: 'Insecure Design',
              italian: 'Progettazione Non Sicura',
              pronunciation: '/\u02CC\u026Ans\u026A\u02C8kj\u028A\u0259r d\u026A\u02C8za\u026An/',
              phonetic: 'in-si-KIUR di-ZAIN',
              example:
                'Insecure design cannot be fixed by a patch alone. = Una progettazione non sicura non si corregge solo con una patch.',
              context: 'owasp-top-10',
              difficulty: 'advanced',
              note: "Falle che derivano da una cattiva architettura fin dall'inizio.",
            },
            {
              english: 'Security Misconfiguration',
              italian: 'Configurazione di Sicurezza Errata',
              pronunciation:
                '/s\u026A\u02C8kj\u028A\u0259r\u0259ti \u02CCm\u026Ask\u0259n\u02CCf\u026A\u0261j\u028A\u02C8re\u026A\u0283\u0259n/',
              phonetic: 'si-KIUR-i-ti mis-con-fi-gui-REI-scen',
              example:
                'Leaving default passwords is a common misconfiguration. = Lasciare le password di default \u00E8 un errore di configurazione comune.',
              context: 'owasp-top-10',
              difficulty: 'intermediate',
            },
            {
              english: 'Vulnerable and Outdated Components',
              italian: 'Componenti Vulnerabili e Obsoleti',
              pronunciation:
                '/\u02C8v\u028Cln\u0259r\u0259bl \u0259nd \u02CCa\u028At\u02C8de\u026At\u026Ad k\u0259m\u02C8po\u028An\u0259nts/',
              phonetic: 'VAL-ne-rebol and aut-DEIT-ed com-POU-nents',
              example:
                'Update your libraries to avoid vulnerable components. = Aggiorna le tue librerie per evitare componenti vulnerabili.',
              context: 'owasp-top-10',
              difficulty: 'intermediate',
            },
            {
              english: 'Identification and Authentication Failures',
              italian: 'Falle di Identificazione e Autenticazione',
              pronunciation:
                '/a\u026A\u02CCdent\u026Af\u026A\u02C8ke\u026A\u0283\u0259n \u0259nd \u0254\u02D0\u02CC\u03B8ent\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'ai-den-ti-fi-KEI-scen and o-then-ti-KEI-scen',
              example:
                'Weak passwords contribute to authentication failures. = Password deboli contribuiscono alle falle di autenticazione.',
              context: 'owasp-top-10',
              difficulty: 'intermediate',
            },
            {
              english: 'Software and Data Integrity Failures',
              italian: 'Falle di Integrit\u00E0 di Software e Dati',
              pronunciation:
                '/\u02C8s\u0252ftwe\u0259r \u0259nd \u02C8de\u026At\u0259 \u026An\u02C8te\u0261r\u0259ti/',
              phonetic: 'SOFT-uer and DEI-ta in-TE-gri-ti',
              example:
                'Software integrity failures include CI/CD pipeline attacks. = Le falle di integrit\u00E0 includono attacchi alle pipeline CI/CD.',
              context: 'owasp-top-10',
              difficulty: 'advanced',
            },
            {
              english: 'Security Logging and Monitoring Failures',
              italian: 'Falle di Logging e Monitoraggio',
              pronunciation:
                '/s\u026A\u02C8kj\u028A\u0259r\u0259ti \u02C8l\u0252\u0261\u026A\u014B \u0259nd \u02C8m\u0252n\u026At\u0259r\u026A\u014B/',
              phonetic: 'si-KIUR-i-ti LOG-ging and MO-ni-tor-ing',
              example:
                'Failures in logging prevent timely incident response. = Le falle nel logging impediscono una risposta rapida agli incidenti.',
              context: 'owasp-top-10',
              difficulty: 'intermediate',
            },
            {
              english: 'Server-Side Request Forgery (SSRF)',
              italian: 'SSRF / Falsificazione Richiesta Lato Server',
              pronunciation: '/\u02CCes es \u02CC\u0251\u02D0r \u02CCef/',
              phonetic: 'es-es-ar-EF',
              example:
                "SSRF allows an attacker to make the server send malicious requests. = L'SSRF permette a un attaccante di far inviare al server richieste malevole.",
              context: 'owasp-top-10',
              difficulty: 'advanced',
              note: 'Nuova entrata importante nella Top 10 (2021).',
            },
          ],
        },
        {
          id: 'web_defense',
          title: 'Difesa Web / Web Defense',
          description: 'WAF, CORS, CSP, rate limiting',
          items: [
            {
              english: 'WAF (Web Application Firewall)',
              italian: 'WAF / Firewall per Applicazioni Web',
              pronunciation: '/w\u0252f/',
              phonetic: 'UAF',
              example:
                'A WAF protects against common web attacks. = Un WAF protegge dai comuni attacchi web.',
              context: 'defense-tools',
              difficulty: 'intermediate',
              note: 'Filtra il traffico HTTP per bloccare SQLi, XSS e altre minacce.',
            },
            {
              english: 'Content Security Policy (CSP)',
              italian: 'CSP / Politica di Sicurezza del Contenuto',
              pronunciation:
                '/\u02C8k\u0252ntent s\u026A\u02C8kj\u028A\u0259r\u0259ti \u02C8p\u0252l\u0259si/',
              phonetic: 'CON-tent si-KIUR-i-ti PO-li-si',
              example:
                'CSP helps prevent XSS attacks. = La CSP aiuta a prevenire gli attacchi XSS.',
              context: 'defense',
              difficulty: 'advanced',
              note: 'Header HTTP che indica al browser quali script e risorse sono autorizzati a girare sulla pagina.',
            },
            {
              english: 'HSTS (HTTP Strict Transport Security)',
              italian: 'HSTS / Sicurezza Trasporto Rigida',
              pronunciation: '/\u02CCe\u026At\u0283 \u02CCes \u02CCti\u02D0 \u02CCes/',
              phonetic: 'eic-es-tii-ES',
              example:
                "HSTS forces the browser to use HTTPS only. = L'HSTS forza il browser a usare solo HTTPS.",
              context: 'defense',
              difficulty: 'intermediate',
            },
            {
              english: 'CSRF Token',
              italian: 'Token CSRF',
              pronunciation:
                '/\u02CCsi\u02D0 \u02CCes \u02CC\u0251\u02D0r \u02CCef \u02C8to\u028Ak\u0259n/',
              phonetic: 'sii-es-ar-EF TOU-ken',
              example:
                'CSRF tokens prevent Cross-Site Request Forgery. = I token CSRF prevengono la Cross-Site Request Forgery.',
              context: 'defense',
              difficulty: 'intermediate',
              note: "Un codice segreto unico per ogni richiesta che conferma l'intenzionalit\u00E0 dell'utente.",
            },
            {
              english: 'Rate Limiting',
              italian: 'Limitazione di Frequenza',
              pronunciation: '/re\u026At \u02C8l\u026Am\u026At\u026A\u014B/',
              phonetic: 'REIT LI-mi-ting',
              example:
                'Rate limiting stops brute force attacks. = Il rate limiting ferma gli attacchi di forza bruta.',
              context: 'defense',
              difficulty: 'intermediate',
              note: 'Limitare il numero di richieste che un utente pu\u00F2 fare in un certo tempo.',
            },
            {
              english: 'SameSite Cookie Attribute',
              italian: 'Attributo Cookie SameSite',
              pronunciation: '/se\u026Am sa\u026At \u02C8k\u028Aki \u02C8\u00E6tr\u026Abju\u02D0t/',
              phonetic: 'SEIM-sait KU-ki A-tri-biut',
              example:
                'Use SameSite=Strict to block CSRF. = Usa SameSite=Strict per bloccare la CSRF.',
              context: 'defense',
              difficulty: 'advanced',
            },
            {
              english: 'Input Validation',
              italian: "Validazione dell'Input",
              pronunciation:
                '/\u02C8\u026Anp\u028At \u02CCv\u00E6l\u026A\u02C8de\u026A\u0283\u0259n/',
              phonetic: 'IN-put va-li-DEI-scen',
              example:
                "Never trust user input; always perform validation. = Mai fidarsi dell'input utente; esegui sempre la validazione.",
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Output Encoding',
              italian: "Codifica dell'Output",
              pronunciation: '/\u02C8a\u028Atp\u028At \u026An\u02C8ko\u028Ad\u026A\u014B/',
              phonetic: 'AUT-put in-KOU-ding',
              example:
                "Output encoding neutralizes malicious scripts in HTML. = La codifica dell'output neutralizza script malevoli nell'HTML.",
              context: 'defense',
              difficulty: 'intermediate',
              note: 'Trasformare i caratteri speciali (es. < in &lt;) prima di visualizzarli.',
            },
            {
              english: 'CORS (Cross-Origin Resource Sharing)',
              italian: 'Condivisione Risorse tra Origini',
              pronunciation: '/k\u0254\u02D0rz/',
              phonetic: 'KORZ',
              example:
                'Misconfigured CORS can expose internal APIs. = Un CORS mal configurato pu\u00F2 esporre API interne.',
              context: 'web-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Security Headers',
              italian: 'Intestazioni di Sicurezza',
              pronunciation: '/s\u026A\u02C8kj\u028A\u0259r\u0259ti \u02C8hed\u0259rz/',
              phonetic: 'si-KIUR-i-ti HE-derz',
              example:
                'Configure security headers to harden your web server. = Configura gli header di sicurezza per rafforzare il tuo web server.',
              context: 'defense',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },
    6: {
      name: 'Sicurezza Sistemi / System Security',
      description: 'Protezione dei sistemi operativi e infrastrutture',
      lessons: [
        {
          id: 'sys_access',
          title: 'Controllo Accessi / Access Control',
          description: 'ACL, RBAC, privilege escalation',
          items: [
            {
              english: 'Access Control',
              italian: 'Controllo Accessi',
              pronunciation: '/\u02CC\u00E6kses k\u0259n\u02C8tro\u028Al/',
              phonetic: 'AK-ses kon-TROUL',
              example:
                'Access control limits who can use resources. = Il controllo accessi limita chi pu\u00F2 usare le risorse.',
              context: 'security-foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Principle of Least Privilege (PoLP)',
              italian: 'Principio del Minimo Privilegio',
              pronunciation:
                '/\u02C8pr\u026Ans\u0259pl \u0259v li\u02D0st \u02C8pr\u026Av\u026Al\u026Ad\u0292/',
              phonetic: 'PRIN-si-pol ov LIIST PRI-vi-lig',
              example:
                "Follow PoLP to reduce the impact of a breach. = Segui il PoLP per ridurre l'impatto di una violazione.",
              context: 'security-foundations',
              difficulty: 'intermediate',
              note: 'Fornire solo i permessi minimi necessari per svolgere un compito.',
            },
            {
              english: 'Separation of Duties (SoD)',
              italian: 'Separazione delle Mansioni',
              pronunciation:
                '/\u02CCsep\u0259\u02C8re\u026A\u0283\u0259n \u0259v \u02C8dju\u02D0tiz/',
              phonetic: 'se-pa-REI-scen ov DIU-tiz',
              example:
                'SoD prevents a single person from controlling a whole process. = La SoD impedisce che una sola persona controlli un intero processo.',
              context: 'security-foundations',
              difficulty: 'intermediate',
              note: 'Dividere un compito critico tra pi\u00F9 persone per prevenire frodi o errori.',
            },
            {
              english: 'Role-Based Access Control (RBAC)',
              italian: 'Controllo Accessi Basato sui Ruoli',
              pronunciation: '/ro\u028Al be\u026Ast \u02CC\u00E6kses k\u0259n\u02C8tro\u028Al/',
              phonetic: 'ROUL beist AK-ses kon-TROUL',
              example:
                "RBAC assigns permissions based on job roles. = L'RBAC assegna permessi in base ai ruoli lavorativi.",
              context: 'access-control-models',
              difficulty: 'intermediate',
            },
            {
              english: 'Discretionary Access Control (DAC)',
              italian: 'Controllo Accessi Discrezionale',
              pronunciation:
                '/d\u026A\u02C8skre\u0283\u0259neri \u02CC\u00E6kses k\u0259n\u02C8tro\u028Al/',
              phonetic: 'di-SCRE-scio-ne-ri AK-ses kon-TROUL',
              example:
                'In DAC, owners decide who can access their files. = Nel DAC, i proprietari decidono chi pu\u00F2 accedere ai loro file.',
              context: 'access-control-models',
              difficulty: 'advanced',
              note: 'Il modello standard usato nei filesystem di Windows e Linux.',
            },
            {
              english: 'Mandatory Access Control (MAC)',
              italian: 'Controllo Accessi Obbligatorio',
              pronunciation:
                '/\u02C8m\u00E6nd\u0259t\u0254\u02D0ri \u02CC\u00E6kses k\u0259n\u02C8tro\u028Al/',
              phonetic: 'MAN-da-to-ri AK-ses kon-TROUL',
              example:
                'MAC is used in high-security environments like the military. = Il MAC \u00E8 usato in ambienti ad alta sicurezza come quello militare.',
              context: 'access-control-models',
              difficulty: 'advanced',
              note: "Il sistema decide l'accesso in base a livelli di sicurezza (etichette), non l'utente.",
            },
            {
              english: 'Privilege Escalation',
              italian: 'Scalata dei Privilegi',
              pronunciation:
                '/\u02C8pr\u026Av\u026Al\u026Ad\u0292 \u02CCesk\u0259\u02C8le\u026A\u0283\u0259n/',
              phonetic: 'PRI-vi-lig es-ka-LEI-scen',
              example:
                "The attacker used an exploit for privilege escalation. = L'attaccante ha usato un exploit per la scalata dei privilegi.",
              context: 'attack-techniques',
              difficulty: 'intermediate',
              note: 'Ottenere permessi superiori a quelli inizialmente assegnati.',
            },
            {
              english: 'Vertical Escalation',
              italian: 'Scalata Verticale',
              pronunciation:
                '/\u02C8v\u025C\u02D0rt\u026Akl \u02CCesk\u0259\u02C8le\u026A\u0283\u0259n/',
              phonetic: 'VER-ti-kal es-ka-LEI-scen',
              example:
                'Vertical escalation means becoming an administrator. = Scalata verticale significa diventare amministratore.',
              context: 'attack-techniques',
              difficulty: 'intermediate',
            },
            {
              english: 'Horizontal Escalation',
              italian: 'Scalata Orizzontale',
              pronunciation:
                '/\u02CCh\u0252r\u026A\u02C8z\u0252ntl \u02CCesk\u0259\u02C8le\u026A\u0283\u0259n/',
              phonetic: 'o-ri-ZON-tal es-ka-LEI-scen',
              example:
                "Horizontal escalation involves accessing another user's data. = La scalata orizzontale consiste nell'accedere ai dati di un altro utente.",
              context: 'attack-techniques',
              difficulty: 'intermediate',
            },
            {
              english: 'Attribute-Based Access Control (ABAC)',
              italian: 'Controllo Accessi Basato su Attributi',
              pronunciation:
                '/\u02C8\u00E6tr\u026Abju\u02D0t be\u026Ast \u02CC\u00E6kses k\u0259n\u02C8tro\u028Al/',
              phonetic: 'A-tri-biut beist AK-ses kon-TROUL',
              example:
                "ABAC uses policies that combine attributes of users and resources. = L'ABAC usa policy che combinano attributi di utenti e risorse.",
              context: 'access-control-models',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'sys_hardening',
          title: 'Hardening',
          description: 'Rafforzamento dei sistemi',
          items: [
            {
              english: 'System Hardening',
              italian: 'Hardening del Sistema',
              pronunciation: '/\u02C8s\u026Ast\u0259m \u02C8h\u0251\u02D0rdn\u026A\u014B/',
              phonetic: 'SIS-tem HAR-de-ning',
              example:
                "System hardening is the process of securing a system by reducing its vulnerability surface. = L'hardening \u00E8 il processo di messa in sicurezza di un sistema riducendo la sua superficie di vulnerabilit\u00E0.",
              context: 'defense-strategies',
              difficulty: 'intermediate',
            },
            {
              english: 'Attack Surface',
              italian: 'Superficie di Attacco',
              pronunciation: '/\u0259\u02C8t\u00E6k \u02C8s\u025C\u02D0rf\u026As/',
              phonetic: 'e-TAK SER-fis',
              example:
                'Minimize the attack surface to improve security. = Minimizza la superficie di attacco per migliorare la sicurezza.',
              context: 'security-concepts',
              difficulty: 'intermediate',
              note: 'Il numero totale di punti in cui un attaccante pu\u00F2 tentare di entrare o estrarre dati.',
            },
            {
              english: 'Attack Surface Reduction',
              italian: 'Riduzione della Superficie di Attacco',
              pronunciation:
                '/\u0259\u02C8t\u00E6k \u02C8s\u025C\u02D0rf\u026As r\u026A\u02C8d\u028Ck\u0283\u0259n/',
              phonetic: 'e-TAK SER-fis re-DAK-scen',
              example:
                'Disabling unused services is an attack surface reduction technique. = Disabilitare servizi inutilizzati \u00E8 una tecnica di riduzione della superficie di attacco.',
              context: 'defense-strategies',
              difficulty: 'intermediate',
            },
            {
              english: 'Baseline Configuration',
              italian: 'Configurazione di Riferimento / Baseline',
              pronunciation:
                '/\u02C8be\u026Asla\u026An k\u0259n\u02CCf\u0261j\u028A\u02C8re\u026A\u0283\u0259n/',
              phonetic: 'BEIS-lain con-fi-gui-REI-scen',
              example:
                'All servers must match the security baseline configuration. = Tutti i server devono corrispondere alla configurazione baseline di sicurezza.',
              context: 'defense-strategies',
              difficulty: 'intermediate',
            },
            {
              english: 'Service Disabling',
              italian: 'Disabilitazione Servizi',
              pronunciation: '/\u02C8s\u025C\u02D0rv\u026As d\u026As\u02C8e\u026Abl\u026A\u014B/',
              phonetic: 'SER-vis dis-EI-bling',
              example:
                'Service disabling reduces risk. = Disabilitare i servizi riduce il rischio.',
              context: 'hardening-techniques',
              difficulty: 'beginner',
            },
            {
              english: 'Unused Port',
              italian: 'Porta Inutilizzata',
              pronunciation: '/\u02CC\u028Cn\u02C8ju\u02D0zd p\u0254\u02D0rt/',
              phonetic: 'an-IUU-sd PORT',
              example:
                'Close every unused port on the firewall. = Chiudi ogni porta inutilizzata sul firewall.',
              context: 'hardening-techniques',
              difficulty: 'beginner',
            },
            {
              english: 'Security Benchmarks (CIS)',
              italian: 'Benchmark di Sicurezza (CIS)',
              pronunciation:
                '/s\u026A\u02C8kj\u028A\u0259r\u0259ti \u02C8bent\u0283m\u0251\u02D0rks/',
              phonetic: 'si-KIUR-i-ti BENC-marks',
              example:
                "Follow CIS benchmarks for OS hardening. = Segui i benchmark CIS per l'hardening del sistema operativo.",
              context: 'standards',
              difficulty: 'advanced',
              note: 'Center for Internet Security. Fornisce guide dettagliate per configurare sistemi in modo sicuro.',
            },
            {
              english: 'Vulnerability Scanning',
              italian: 'Scansione delle Vulnerabilit\u00E0',
              pronunciation:
                '/\u02CCv\u028Cln\u0259r\u0259\u02C8b\u026Al\u0259ti \u02C8sk\u00E6n\u026A\u014B/',
              phonetic: 'val-ne-re-BI-li-ti SKA-ning',
              example:
                'Run a vulnerability scanning tool every week. = Esegui uno strumento di scansione vulnerabilit\u00E0 ogni settimana.',
              context: 'monitoring',
              difficulty: 'intermediate',
            },
            {
              english: 'Trusted Platform Module (TPM)',
              italian: 'TPM / Modulo Piattaforma Fidata',
              pronunciation:
                '/\u02CCtr\u028Cst\u026Ad \u02C8pl\u00E6tf\u0254\u02D0rm \u02C8m\u0252dju\u02D0l/',
              phonetic: 'TRAST-ed PLAT-form MO-diul',
              example:
                "TPM stores cryptographic keys in hardware. = Il TPM salva le chiavi crittografiche nell'hardware.",
              context: 'hardware-security',
              difficulty: 'advanced',
              note: "Chip fisico sulla scheda madre usato per garantire l'integrit\u00E0 del boot e cifrare i dischi.",
            },
            {
              english: 'Principle of Default Deny',
              italian: 'Principio del Deny Predefinito',
              pronunciation:
                '/\u02C8pr\u026Ans\u0259pl \u0259v d\u026A\u02C8f\u0254\u02D0lt d\u026A\u02C8na\u026A/',
              phonetic: 'PRIN-si-pol ov di-FOLT di-NAI',
              example:
                'Default deny is safer than default allow. = Il "deny" predefinito \u00E8 pi\u00F9 sicuro dell\'"allow" predefinito.',
              context: 'security-foundations',
              difficulty: 'intermediate',
              note: 'Bloccare tutto ci\u00F2 che non \u00E8 esplicitamente permesso.',
            },
          ],
        },
        {
          id: 'sys_monitoring',
          title: 'Monitoraggio / Monitoring',
          description: 'SIEM, log analysis, audit',
          items: [
            {
              english: 'Security Monitoring',
              italian: 'Monitoraggio della Sicurezza',
              pronunciation:
                '/s\u026A\u02C8kj\u028A\u0259r\u0259ti \u02C8m\u0252n\u026At\u0259r\u026A\u014B/',
              phonetic: 'si-KIUR-i-ti MO-ni-to-ring',
              example:
                'Continuous security monitoring is essential for detection. = Il monitoraggio continuo della sicurezza \u00E8 essenziale per il rilevamento.',
              context: 'defense-operations',
              difficulty: 'beginner',
            },
            {
              english: 'Audit Trail',
              italian: 'Traccia di Audit / Audit Trail',
              pronunciation: '/\u02C8\u0254\u02D0d\u026At tre\u026Al/',
              phonetic: 'O-dit TREIL',
              example:
                "The audit trail shows who accessed the file and when. = L'audit trail mostra chi ha acceduto al file e quando.",
              context: 'monitoring',
              difficulty: 'intermediate',
              note: 'Sequenza cronologica di record che fornisce prove documentali di una sequenza di attivit\u00E0.',
            },
            {
              english: 'Log Correlation',
              italian: 'Correlazione dei Log',
              pronunciation: '/l\u0252\u0261 \u02CCk\u0252r\u0259\u02C8le\u026A\u0283\u0259n/',
              phonetic: 'LOG cor-re-LEI-scen',
              example:
                'Log correlation helps identify complex attack patterns. = La correlazione dei log aiuta a identificare pattern di attacco complessi.',
              context: 'monitoring',
              difficulty: 'advanced',
              note: 'Mettere insieme eventi da diverse fonti per trovare un legame comune.',
            },
            {
              english: 'Anomaly Detection',
              italian: 'Rilevamento Anomalie',
              pronunciation: '/\u0259\u02C8n\u0252m\u0259li d\u026A\u02C8tek\u0283\u0259n/',
              phonetic: 'a-NO-ma-li di-TEK-scen',
              example:
                'Anomaly detection flags unusual network traffic. = Il rilevamento anomalie segnala traffico di rete insolito.',
              context: 'monitoring',
              difficulty: 'intermediate',
            },
            {
              english: 'Behavioral Analysis',
              italian: 'Analisi Comportamentale',
              pronunciation:
                '/b\u026A\u02C8he\u026Avj\u0259r\u0259l \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'bi-HEI-vio-ral a-NA-li-sis',
              example:
                "Behavioral analysis can detect zero-day threats. = L'analisi comportamentale pu\u00F2 rilevare minacce zero-day.",
              context: 'monitoring',
              difficulty: 'advanced',
              note: 'Invece di cercare firme note, cerca azioni sospette (es. un utente che scarica gigabyte di dati mai visti prima).',
            },
            {
              english: 'File Integrity Monitoring (FIM)',
              italian: 'Monitoraggio Integrit\u00E0 File (FIM)',
              pronunciation:
                '/fa\u026Al \u026An\u02C8te\u0261r\u0259ti \u02C8m\u0252n\u026At\u0259r\u026A\u014B/',
              phonetic: 'FAIL in-TE-gri-ti MO-ni-to-ring',
              example:
                'FIM alerts you if critical system files are modified. = Il FIM ti avvisa se file di sistema critici vengono modificati.',
              context: 'monitoring',
              difficulty: 'advanced',
            },
            {
              english: 'HIDS (Host-based IDS)',
              italian: 'HIDS / IDS basato su Host',
              pronunciation: '/\u02CCe\u026At\u0283 a\u026A di\u02D0 \u02C8es/',
              phonetic: 'eic-ai-dii-ES',
              example:
                'A HIDS monitors internal system calls and logs. = Un HIDS monitora le chiamate di sistema interne e i log.',
              context: 'defense-tools',
              difficulty: 'advanced',
            },
            {
              english: 'Log Retention',
              italian: 'Conservazione dei Log',
              pronunciation: '/l\u0252\u0261 r\u026A\u02C8ten\u0283\u0259n/',
              phonetic: 'LOG re-TEN-scen',
              example:
                'Check the law for log retention requirements. = Controlla la legge per i requisiti di conservazione dei log.',
              context: 'compliance',
              difficulty: 'intermediate',
            },
            {
              english: 'Event ID',
              italian: 'ID Evento',
              pronunciation: '/\u026A\u02C8vent a\u026A di\u02D0/',
              phonetic: 'i-VENT ai-DII',
              example:
                'Windows uses Event IDs to categorize logs. = Windows usa gli ID Evento per categorizzare i log.',
              context: 'monitoring',
              difficulty: 'intermediate',
            },
            {
              english: 'Real-time Alerting',
              italian: 'Allarmistica in Tempo Reale',
              pronunciation:
                '/r\u026A\u02C8\u0259l ta\u026Am \u0259\u02C8l\u025C\u02D0rt\u026A\u014B/',
              phonetic: 'RIIL taim a-LER-ting',
              example:
                "Real-time alerting is crucial for fast response. = L'allarmistica in tempo reale \u00E8 fondamentale per una risposta rapida.",
              context: 'monitoring',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'sys_config',
          title: 'Configurazione Sicura / Secure Config',
          description: 'Baseline, CIS benchmarks',
          items: [
            {
              english: 'Secure Configuration',
              italian: 'Configurazione Sicura',
              pronunciation:
                '/s\u026A\u02C8kj\u028A\u0259r k\u0259n\u02CCf\u0261j\u028A\u02C8re\u026A\u0283\u0259n/',
              phonetic: 'si-KIUR con-fi-gui-REI-scen',
              example:
                'A secure configuration reduces the risk of automated attacks. = Una configurazione sicura riduce il rischio di attacchi automatizzati.',
              context: 'defense-strategies',
              difficulty: 'beginner',
            },
            {
              english: 'Hardened Image',
              italian: 'Immagine Rafforzata / Hardened',
              pronunciation: '/\u02C8h\u0251\u02D0rdnd \u02C8\u026Am\u026Ad\u0292/',
              phonetic: 'HAR-dend I-mig',
              example:
                "Deploy new servers from a hardened image. = Distribuisci nuovi server partendo da un'immagine hardened.",
              context: 'hardening-techniques',
              difficulty: 'intermediate',
              note: 'Un modello pre-configurato di sistema operativo con tutte le impostazioni di sicurezza gi\u00E0 applicate.',
            },
            {
              english: 'Configuration Drift',
              italian: 'Deriva della Configurazione',
              pronunciation: '/k\u0259n\u02CCf\u0261j\u028A\u02C8re\u026A\u0283\u0259n dr\u026Aft/',
              phonetic: 'con-fi-gui-REI-scen DRIFT',
              example:
                'Configuration drift happens when systems change over time. = La deriva della configurazione avviene quando i sistemi cambiano nel tempo.',
              context: 'management',
              difficulty: 'advanced',
              note: 'Il fenomeno per cui un sistema diventa meno sicuro a causa di modifiche manuali non tracciate.',
            },
            {
              english: 'Default Settings',
              italian: 'Impostazioni Predefinite',
              pronunciation: '/d\u026A\u02C8f\u0254\u02D0lt \u02C8set\u026A\u014Bz/',
              phonetic: 'di-FOLT SET-tingz',
              example:
                'Never use default settings for production servers. = Mai usare impostazioni predefinite per i server di produzione.',
              context: 'hardening-techniques',
              difficulty: 'beginner',
            },
            {
              english: 'Automated Provisioning',
              italian: 'Provisioning Automatizzato',
              pronunciation:
                '/\u02C8\u0254\u02D0t\u0259me\u026At\u026Ad \u02CCpr\u0259\u02C8v\u026A\u0292\u0259n\u026A\u014B/',
              phonetic: 'O-to-mei-ted pro-VI-scio-ning',
              example:
                'Automated provisioning ensures consistent security. = Il provisioning automatizzato garantisce una sicurezza costante.',
              context: 'devops-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Infrastructure as Code (IaC) Security',
              italian: 'Sicurezza IaC',
              pronunciation:
                '/\u02C8\u026Anfr\u0259\u02CCstr\u028Ckt\u0283\u0259r \u00E6z ko\u028Ad/',
              phonetic: 'IN-fra-strac-ciur az KOUD',
              example:
                'Scan your IaC files for security misconfigurations. = Scansiona i tuoi file IaC per errori di configurazione.',
              context: 'devops-security',
              difficulty: 'advanced',
            },
            {
              english: 'Group Policy Object (GPO)',
              italian: 'GPO / Oggetto Criteri di Gruppo',
              pronunciation: '/\u02CCd\u0292i\u02D0 pi\u02D0 \u02C8o\u028A/',
              phonetic: 'gii-pii-OU',
              example:
                'Use GPOs to enforce security settings in Windows domains. = Usa le GPO per forzare le impostazioni di sicurezza nei domini Windows.',
              context: 'administration',
              difficulty: 'intermediate',
            },
            {
              english: 'SELinux (Security-Enhanced Linux)',
              italian: 'SELinux',
              pronunciation: '/\u02CCes i\u02D0 \u02C8l\u026An\u0259ks/',
              phonetic: 'es-ii-LI-nuks',
              example:
                'SELinux provides fine-grained access control. = SELinux fornisce un controllo accessi molto granulare.',
              context: 'hardening-tools',
              difficulty: 'expert',
              note: 'Modulo di sicurezza del kernel Linux che implementa il Mandatory Access Control (MAC).',
            },
            {
              english: 'AppArmor',
              italian: 'AppArmor',
              pronunciation: '/\u00E6p \u02C8\u0251\u02D0rm\u0259r/',
              phonetic: 'AP-ar-mer',
              example:
                "AppArmor is an alternative to SELinux. = AppArmor \u00E8 un'alternativa a SELinux.",
              context: 'hardening-tools',
              difficulty: 'expert',
              note: 'Sistema di sicurezza Linux che limita le capacit\u00E0 dei singoli programmi tramite profili.',
            },
            {
              english: 'Sandboxing',
              italian: 'Sandboxing / Isolamento',
              pronunciation: '/\u02C8s\u00E6ndb\u0252ks\u026A\u014B/',
              phonetic: 'SAND-bok-sing',
              example: 'Run untrusted apps in a sandbox. = Esegui app non fidate in una sandbox.',
              context: 'defense-strategies',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },
    7: {
      name: 'Risposta Incidenti / Incident Response',
      description: 'Come rispondere agli incidenti di sicurezza',
      lessons: [
        {
          id: 'ir_process',
          title: 'Processo IR / IR Process',
          description: 'Triage, contenimento, eradicazione',
          items: [
            {
              english: 'Incident Response (IR)',
              italian: 'Risposta agli Incidenti',
              pronunciation: '/\u02C8\u026Ans\u026Ad\u0259nt r\u026A\u02C8sp\u0252ns/',
              phonetic: 'IN-si-dent re-SPONS',
              example:
                'A fast incident response minimizes damage. = Una risposta rapida agli incidenti minimizza i danni.',
              context: 'incident-response',
              difficulty: 'beginner',
            },
            {
              english: 'CSIRT (Computer Security Incident Response Team)',
              italian: 'Team di Risposta agli Incidenti',
              pronunciation: '/\u02CCsi\u02D0 \u02CCes a\u026A \u02CC\u0251\u02D0r \u02C8ti\u02D0/',
              phonetic: 'si-SIRT',
              example:
                'The CSIRT was activated immediately after the breach. = Il CSIRT \u00E8 stato attivato subito dopo la violazione.',
              context: 'incident-response',
              difficulty: 'intermediate',
            },
            {
              english: 'Preparation',
              italian: 'Preparazione',
              pronunciation: '/\u02CCprep\u0259\u02C8re\u026A\u0283\u0259n/',
              phonetic: 'pre-pa-REI-scen',
              example:
                'Preparation is the first phase of incident response. = La preparazione \u00E8 la prima fase della risposta agli incidenti.',
              context: 'incident-response',
              difficulty: 'beginner',
              note: 'Creare policy, formare il team e preparare gli strumenti prima che avvenga un attacco.',
            },
            {
              english: 'Identification (Triage)',
              italian: 'Identificazione / Triage',
              pronunciation: '/a\u026A\u02CCdent\u026Af\u026Ak\u0259\u02CC\u0283\u0259n/',
              phonetic: 'ai-den-ti-fi-KEI-scen',
              example:
                "Identification determines if an event is a security incident. = L'identificazione determina se un evento \u00E8 un incidente di sicurezza.",
              context: 'incident-response',
              difficulty: 'intermediate',
            },
            {
              english: 'Containment',
              italian: 'Contenimento',
              pronunciation: '/k\u0259n\u02C8te\u026Anm\u0259nt/',
              phonetic: 'con-TEIN-ment',
              example:
                'Isolate the infected server for containment. = Isola il server infetto per il contenimento.',
              context: 'incident-response',
              difficulty: 'intermediate',
              note: "Limitare i danni e impedire all'attacco di diffondersi.",
            },
            {
              english: 'Eradication',
              italian: 'Eradicazione',
              pronunciation: '/\u026A\u02CCr\u00E6d\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'e-ra-di-KEI-scen',
              example:
                "Eradication involves removing the root cause of the incident. = L'eradicazione consiste nel rimuovere la causa alla base dell'incidente.",
              context: 'incident-response',
              difficulty: 'intermediate',
              note: 'Rimuovere il malware, chiudere le vulnerabilit\u00E0 e eliminare gli account compromessi.',
            },
            {
              english: 'Recovery',
              italian: 'Ripristino / Recupero',
              pronunciation: '/r\u026A\u02C8k\u028Cv\u0259ri/',
              phonetic: 're-KA-ve-ri',
              example:
                'During recovery, systems are brought back online. = Durante il ripristino, i sistemi vengono riportati online.',
              context: 'incident-response',
              difficulty: 'beginner',
            },
            {
              english: 'Lessons Learned',
              italian: 'Lezioni Apprese / Post-mortem',
              pronunciation: '/\u02C8les\u0259nz l\u025C\u02D0rnd/',
              phonetic: 'LES-sons LERND',
              example:
                'The lessons learned phase improves future response. = La fase delle lezioni apprese migliora la risposta futura.',
              context: 'incident-response',
              difficulty: 'intermediate',
            },
            {
              english: 'Incident Handler',
              italian: "Gestore dell'Incidente",
              pronunciation: '/\u02C8\u026Ans\u026Ad\u0259nt \u02C8h\u00E6ndl\u0259r/',
              phonetic: 'IN-si-dent HAND-ler',
              example:
                "The incident handler coordinates the technical response. = Il gestore dell'incidente coordina la risposta tecnica.",
              context: 'incident-response',
              difficulty: 'intermediate',
            },
            {
              english: 'Playbook',
              italian: 'Manuale Operativo / Playbook',
              pronunciation: '/\u02C8ple\u026Ab\u028Ak/',
              phonetic: 'PLEI-buk',
              example:
                'Follow the ransomware playbook for this incident. = Segui il playbook per i ransomware per questo incidente.',
              context: 'incident-response',
              difficulty: 'advanced',
              note: 'Insieme di istruzioni passo-passo per rispondere a specifici tipi di attacco.',
            },
          ],
        },
        {
          id: 'ir_forensics',
          title: 'Forensics',
          description: 'Analisi forense digitale',
          items: [
            {
              english: 'Digital Forensics',
              italian: 'Informatica Forense',
              pronunciation: '/\u02C8d\u026Ad\u0292\u026At\u0259l f\u0259\u02C8rens\u026Aks/',
              phonetic: 'DI-gi-tel fo-REN-siks',
              example:
                "Digital forensics is used to recover and investigate evidence. = L'informatica forense \u00E8 usata per recuperare e analizzare le prove.",
              context: 'forensics',
              difficulty: 'intermediate',
            },
            {
              english: 'Chain of Custody',
              italian: 'Catena di Custodia',
              pronunciation: '/t\u0283e\u026An \u0259v \u02C8k\u028Cst\u0259di/',
              phonetic: 'CEIN ov CAS-to-di',
              example:
                'Maintaining the chain of custody is essential for court evidence. = Mantenere la catena di custodia \u00E8 essenziale per le prove in tribunale.',
              context: 'legal-forensics',
              difficulty: 'advanced',
              note: "Documentazione che traccia chi ha toccato l'evidenza, quando e perch\u00E9.",
            },
            {
              english: 'Evidence Acquisition',
              italian: 'Acquisizione delle Prove',
              pronunciation:
                '/\u02C8ev\u026Ad\u0259ns \u02CC\u00E6kw\u026A\u02C8z\u026A\u0283\u0259n/',
              phonetic: 'E-vi-dens ac-kui-SI-scen',
              example:
                "Evidence acquisition must not alter the original data. = L'acquisizione delle prove non deve alterare i dati originali.",
              context: 'forensics-process',
              difficulty: 'intermediate',
            },
            {
              english: 'Write Blocker',
              italian: 'Write Blocker / Blocco Scrittura',
              pronunciation: '/ra\u026At \u02C8bl\u0252k\u0259r/',
              phonetic: 'RAIT BLOK-ker',
              example:
                'A hardware write blocker prevents data modification. = Un write blocker hardware impedisce la modifica dei dati.',
              context: 'forensics-tools',
              difficulty: 'advanced',
              note: "Strumento fondamentale per garantire l'integrit\u00E0 del disco originale durante l'analisi.",
            },
            {
              english: 'Volatile Data (RAM)',
              italian: 'Dati Volatili (RAM)',
              pronunciation: '/\u02C8v\u0252l\u0259ta\u026Al \u02C8de\u026At\u0259/',
              phonetic: 'VO-la-tail DEI-ta',
              example:
                'RAM contains volatile data that is lost after power-off. = La RAM contiene dati volatili che si perdono allo spegnimento.',
              context: 'forensics',
              difficulty: 'intermediate',
            },
            {
              english: 'Disk Image',
              italian: 'Immagine del Disco',
              pronunciation: '/d\u026Ask \u02C8\u026Am\u026Ad\u0292/',
              phonetic: 'DISK I-mig',
              example:
                "Forensic experts work on a disk image, never the original. = Gli esperti forensi lavorano su un'immagine del disco, mai sull'originale.",
              context: 'forensics-process',
              difficulty: 'intermediate',
              note: "Una copia bit per bit dell'intero supporto di memoria.",
            },
            {
              english: 'Slack Space',
              italian: 'Slack Space / Spazio Inutilizzato',
              pronunciation: '/sl\u00E6k spe\u026As/',
              phonetic: 'SLACK SPEIS',
              example:
                'Hidden data can be found in the slack space. = Dati nascosti si possono trovare nello slack space.',
              context: 'forensics',
              difficulty: 'expert',
              note: "Lo spazio vuoto alla fine di un file che non riempie l'intero cluster del disco.",
            },
            {
              english: 'Metadata Analysis',
              italian: 'Analisi dei Metadati',
              pronunciation: '/\u02C8met\u0259de\u026At\u0259 \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'ME-ta-deita a-NA-li-sis',
              example:
                "Metadata analysis reveals when a file was created or modified. = L'analisi dei metadati rivela quando un file \u00E8 stato creato o modificato.",
              context: 'forensics',
              difficulty: 'intermediate',
            },
            {
              english: 'Steganography',
              italian: 'Steganografia',
              pronunciation: '/\u02CCste\u0261\u0259\u02C8n\u0252\u0261r\u0259fi/',
              phonetic: 'ste-ga-NO-gra-fi',
              example:
                'Steganography is used to hide a message inside another file. = La steganografia \u00E8 usata per nascondere un messaggio dentro un altro file.',
              context: 'forensics',
              difficulty: 'advanced',
              note: 'Dal greco "scrittura nascosta". Ad esempio nascondere un testo dentro un\'immagine.',
            },
            {
              english: 'Anti-Forensics',
              italian: 'Anti-Forensics',
              pronunciation: '/\u02CC\u00E6nta\u026A f\u0259\u02C8rens\u026Aks/',
              phonetic: 'AN-ti fo-REN-siks',
              example:
                "Attackers use anti-forensics to cover their tracks. = Gli attaccanti usano l'anti-forensics per coprire le proprie tracce.",
              context: 'threats',
              difficulty: 'advanced',
              note: "Tecniche come la cancellazione dei log o la cifratura per impedire l'analisi forense.",
            },
          ],
        },
        {
          id: 'ir_threat_intel',
          title: 'Threat Intelligence',
          description: 'IOC, STIX, TAXII, kill chain',
          items: [
            {
              english: 'Threat Intelligence',
              italian: 'Threat Intelligence / Informazioni sulle Minacce',
              pronunciation: '/\u03B8ret \u026An\u02C8tel\u026Ad\u0292\u0259ns/',
              phonetic: 'THRET in-TE-li-gens',
              example:
                'Threat intelligence helps predict future attacks. = La threat intelligence aiuta a prevedere gli attacchi futuri.',
              context: 'incident-response',
              difficulty: 'intermediate',
              note: 'Raccolta e analisi di informazioni sui potenziali attacchi e attaccanti.',
            },
            {
              english: 'Indicator of Compromise (IOC)',
              italian: 'Indicatore di Compromissione (IOC)',
              pronunciation:
                '/\u02CC\u026And\u026Ake\u026At\u0259r \u0259v \u02C8k\u0252mpr\u0259ma\u026Az/',
              phonetic: 'IN-di-keiter ov COM-pro-mais',
              example:
                'A malicious IP address is a common IOC. = Un indirizzo IP malevolo \u00E8 un comune IOC.',
              context: 'threat-intelligence',
              difficulty: 'intermediate',
              note: 'Prove tecniche che indicano che un sistema \u00E8 stato violato (es. hash di file, IP, nomi dominio).',
            },
            {
              english: 'Indicator of Attack (IOA)',
              italian: 'Indicatore di Attacco (IOA)',
              pronunciation: '/\u02CC\u026And\u026Ake\u026At\u0259r \u0259v \u0259\u02C8t\u00E6k/',
              phonetic: 'IN-di-keiter ov a-TAK',
              example:
                "IOAs focus on the attacker's activity in real time. = Gli IOA si concentrano sull'attivit\u00E0 dell'attaccante in tempo reale.",
              context: 'threat-intelligence',
              difficulty: 'advanced',
              note: "A differenza dell'IOC (che guarda al passato), l'IOA cerca di identificare l'attacco mentre avviene.",
            },
            {
              english: 'STIX (Structured Threat Information eXpression)',
              italian: 'STIX / Linguaggio Threat Intel',
              pronunciation: '/st\u026Aks/',
              phonetic: 'STIKS',
              example:
                'STIX is a standardized language for sharing threat intelligence. = Lo STIX \u00E8 un linguaggio standardizzato per condividere threat intelligence.',
              context: 'standards',
              difficulty: 'advanced',
            },
            {
              english: 'TAXII (Trusted Automated eXchange of Indicator Information)',
              italian: 'TAXII / Protocollo Scambio Intel',
              pronunciation: '/\u02C8t\u00E6ksi/',
              phonetic: 'TAXI',
              example:
                'TAXII is the protocol used to transport STIX messages. = Il TAXII \u00E8 il protocollo usato per trasportare i messaggi STIX.',
              context: 'protocols',
              difficulty: 'advanced',
            },
            {
              english: 'Cyber Kill Chain',
              italian: 'Catena Cinetica Cyber',
              pronunciation: '/\u02C8sa\u026Ab\u0259r k\u026Al t\u0283e\u026An/',
              phonetic: 'SAI-ber KIL CEIN',
              example:
                'The Cyber Kill Chain describes the stages of a cyber attack. = La Cyber Kill Chain descrive le fasi di un attacco informatico.',
              context: 'threat-intelligence',
              difficulty: 'intermediate',
              note: 'Modello creato da Lockheed Martin (Reconnaissance, Weaponization, Delivery, Exploitation, Installation, C2, Actions on Objectives).',
            },
            {
              english: 'MITRE ATT&CK Framework',
              italian: 'Framework MITRE ATT&CK',
              pronunciation: '/\u02C8ma\u026At\u0259r \u0259\u02C8t\u00E6k/',
              phonetic: 'MAI-ter a-TAK',
              example:
                'We use the MITRE ATT&CK framework to map adversary tactics. = Usiamo il framework MITRE ATT&CK per mappare le tattiche avversarie.',
              context: 'standards',
              difficulty: 'advanced',
              note: 'Base di conoscenza globale di tattiche e tecniche degli avversari basata su osservazioni reali.',
            },
            {
              english: 'OSINT (Open Source Intelligence)',
              italian: 'OSINT / Intel da Fonti Aperte',
              pronunciation: '/\u02C8o\u028As\u026Ant/',
              phonetic: 'O-SINT',
              example:
                "OSINT involves gathering data from public records. = L'OSINT consiste nel raccogliere dati da fonti pubbliche.",
              context: 'threat-intelligence',
              difficulty: 'intermediate',
            },
            {
              english: 'TTP (Tactics, Techniques, and Procedures)',
              italian: 'TTP / Tattiche, Tecniche e Procedure',
              pronunciation: '/\u02CCti\u02D0 ti\u02D0 \u02C8pi\u02D0/',
              phonetic: 'tii-tii-PII',
              example:
                'Identify the TTPs of the Advanced Persistent Threat. = Identifica le TTP della minaccia persistente avanzata.',
              context: 'threat-intelligence',
              difficulty: 'advanced',
              note: 'Rappresentano il "comportamento" di un attaccante.',
            },
            {
              english: 'Dark Web Monitoring',
              italian: 'Monitoraggio del Dark Web',
              pronunciation: '/d\u0251\u02D0rk web \u02C8m\u0252n\u026At\u0259r\u026A\u014B/',
              phonetic: 'DARK UEB MO-ni-to-ring',
              example:
                'Dark web monitoring can alert you if company data is for sale. = Il monitoraggio del dark web ti avvisa se i dati aziendali sono in vendita.',
              context: 'threat-intelligence',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'ir_recovery',
          title: 'Recupero / Recovery',
          description: 'Post-mortem, lessons learned',
          items: [
            {
              english: 'Disaster Recovery (DR)',
              italian: 'Recupero dai Disastri',
              pronunciation: '/d\u026A\u02C8z\u0251\u02D0st\u0259r r\u026A\u02C8k\u028Cv\u0259ri/',
              phonetic: 'di-SAS-ter re-KA-ve-ri',
              example:
                'A disaster recovery plan is essential for any business. = Un piano di disaster recovery \u00E8 essenziale per ogni azienda.',
              context: 'incident-response',
              difficulty: 'intermediate',
              note: 'Focus tecnico sul ripristino di sistemi e dati dopo un evento catastrofico.',
            },
            {
              english: 'Business Continuity Planning (BCP)',
              italian: 'Pianificazione Continuit\u00E0 Operativa',
              pronunciation:
                '/\u02C8b\u026Azn\u0259s \u02CCk\u0252nt\u026A\u02C8nju\u02D0\u0259ti \u02C8pl\u00E6n\u026A\u014B/',
              phonetic: 'BIS-nes con-ti-NIU-i-ti PLA-ning',
              example:
                'BCP ensures that critical business functions continue during a disaster. = Il BCP garantisce che le funzioni aziendali critiche continuino durante un disastro.',
              context: 'incident-response',
              difficulty: 'intermediate',
              note: 'Visione pi\u00F9 ampia del DR: include persone, processi e sedi fisiche.',
            },
            {
              english: 'RTO (Recovery Time Objective)',
              italian: 'Obiettivo Tempo di Recupero',
              pronunciation: '/\u02CC\u0251\u02D0r ti\u02D0 \u02C8o\u028A/',
              phonetic: 'ar-tii-OU',
              example:
                'Our RTO for the web server is 4 hours. = Il nostro RTO per il web server \u00E8 di 4 ore.',
              context: 'incident-response',
              difficulty: 'advanced',
              note: 'Il tempo massimo consentito per riportare online un sistema.',
            },
            {
              english: 'RPO (Recovery Point Objective)',
              italian: 'Obiettivo Punto di Recupero',
              pronunciation: '/\u02CC\u0251\u02D0r pi\u02D0 \u02C8o\u028A/',
              phonetic: 'ar-pii-OU',
              example:
                "An RPO of 1 hour means we can lose up to 1 hour of data. = Un RPO di un'ora significa che possiamo perdere fino a un'ora di dati.",
              context: 'incident-response',
              difficulty: 'advanced',
              note: "La quantit\u00E0 massima di dati che l'azienda \u00E8 disposta a perdere (dipende dalla frequenza dei backup).",
            },
            {
              english: 'Hot Site',
              italian: "Sito Hot / Pronto all'uso",
              pronunciation: '/h\u0252t sa\u026At/',
              phonetic: 'HOT SAIT',
              example:
                'A hot site can take over operations immediately. = Un sito hot pu\u00F2 subentrare nelle operazioni immediatamente.',
              context: 'incident-response',
              difficulty: 'advanced',
              note: 'Sede secondaria con hardware e dati sincronizzati in tempo reale.',
            },
            {
              english: 'Cold Site',
              italian: 'Sito Cold / Non pronto',
              pronunciation: '/ko\u028Ald sa\u026At/',
              phonetic: 'COULD SAIT',
              example:
                'A cold site is cheap but takes days to set up. = Un sito cold costa poco ma richiede giorni per essere configurato.',
              context: 'incident-response',
              difficulty: 'advanced',
              note: 'Sede vuota con solo spazio e alimentazione; hardware e dati devono essere portati lì dopo il disastro.',
            },
            {
              english: 'Failover',
              italian: 'Failover / Commutazione automatica',
              pronunciation: '/\u02C8fe\u026Alo\u028Av\u0259r/',
              phonetic: 'FEIL-over',
              example:
                'Failover to the backup server was successful. = Il failover sul server di backup \u00E8 riuscito.',
              context: 'incident-response',
              difficulty: 'intermediate',
            },
            {
              english: 'Failback',
              italian: 'Failback / Ritorno al primario',
              pronunciation: '/\u02C8fe\u026Alb\u00E6k/',
              phonetic: 'FEIL-bak',
              example:
                'Perform failback once the primary site is repaired. = Esegui il failback una volta che il sito primario \u00E8 riparato.',
              context: 'incident-response',
              difficulty: 'intermediate',
            },
            {
              english: 'Resilience',
              italian: 'Resilienza',
              pronunciation: '/r\u026A\u02C8z\u026Ali\u0259ns/',
              phonetic: 're-SI-li-ens',
              example:
                'System resilience is the ability to withstand attacks. = La resilienza del sistema \u00E8 la capacit\u00E0 di resistere agli attacchi.',
              context: 'incident-response',
              difficulty: 'beginner',
            },
            {
              english: 'Tabletop Exercise',
              italian: 'Esercitazione Tabletop',
              pronunciation: '/\u02C8te\u026Ablt\u0252p \u02C8eks\u0259rsa\u026Az/',
              phonetic: 'TEIBL-top ek-ser-sais',
              example:
                'We ran a tabletop exercise to test our response plan. = Abbiamo fatto un tabletop per testare il nostro piano di risposta.',
              context: 'incident-response',
              difficulty: 'intermediate',
              note: 'Simulazione teorica di un incidente per verificare la preparazione del team senza bloccare i sistemi.',
            },
          ],
        },
      ],
    },
    8: {
      name: 'Cloud Security',
      description: 'Sicurezza nel cloud computing',
      lessons: [
        {
          id: 'cloud_models',
          title: 'Modelli Cloud / Cloud Models',
          description: 'SaaS, IaaS, PaaS, shared responsibility',
          items: [
            {
              english: 'Cloud Computing',
              italian: 'Cloud Computing / Informatica in Nuvola',
              pronunciation: '/kla\u028Ad k\u0259m\u02C8pju\u02D0t\u026A\u014B/',
              phonetic: 'CLAUD com-PIU-ting',
              example:
                'Cloud computing offers on-demand resources. = Il cloud computing offre risorse su richiesta.',
              context: 'cloud-security',
              difficulty: 'beginner',
            },
            {
              english: 'SaaS (Software as a Service)',
              italian: 'SaaS / Software come Servizio',
              pronunciation: '/\u02CCes e\u026A e\u026A \u02C8es/',
              phonetic: 'es-ei-ei-ES',
              example:
                'Gmail is a common example of SaaS. = Gmail \u00E8 un esempio comune di SaaS.',
              context: 'cloud-models',
              difficulty: 'beginner',
              note: "L'utente usa l'applicazione via web; il provider gestisce tutto il resto.",
            },
            {
              english: 'PaaS (Platform as a Service)',
              italian: 'PaaS / Piattaforma come Servizio',
              pronunciation: '/\u02CCpi\u02D0 e\u026A e\u026A \u02C8es/',
              phonetic: 'pii-ei-ei-ES',
              example:
                'PaaS is used by developers to build apps. = Il PaaS \u00E8 usato dagli sviluppatori per costruire app.',
              context: 'cloud-models',
              difficulty: 'intermediate',
              note: 'Fornisce un ambiente di sviluppo e deploy (es. Heroku, AWS Elastic Beanstalk).',
            },
            {
              english: 'IaaS (Infrastructure as a Service)',
              italian: 'IaaS / Infrastruttura come Servizio',
              pronunciation: '/\u02CCa\u026A e\u026A e\u026A \u02C8es/',
              phonetic: 'ai-ei-ei-ES',
              example:
                "IaaS provides virtualized computing resources. = L'IaaS fornisce risorse di calcolo virtualizzate.",
              context: 'cloud-models',
              difficulty: 'intermediate',
              note: 'Offre server virtuali, storage e reti (es. AWS EC2, Azure VMs).',
            },
            {
              english: 'Shared Responsibility Model',
              italian: 'Modello di Responsabilit\u00E0 Condivisa',
              pronunciation:
                '/\u0283e\u0259rd r\u026A\u02CCsp\u0252ns\u0259\u02C8b\u026Al\u0259ti \u02C8m\u0252dl/',
              phonetic: 'SCERD re-spon-si-BI-li-ti MO-del',
              example:
                'The shared responsibility model defines who secures what. = Il modello di responsabilit\u00E0 condivisa definisce chi protegge cosa.',
              context: 'cloud-security',
              difficulty: 'intermediate',
              note: 'Il provider protegge il cloud (hardware), l\'utente protegge i dati "nel" cloud.',
            },
            {
              english: 'Public Cloud',
              italian: 'Cloud Pubblico',
              pronunciation: '/\u02C8p\u028Cbl\u026Ak kla\u028Ad/',
              phonetic: 'PAB-lik CLAUD',
              example:
                'AWS and Google Cloud are public cloud providers. = AWS e Google Cloud sono provider di cloud pubblico.',
              context: 'cloud-models',
              difficulty: 'beginner',
            },
            {
              english: 'Private Cloud',
              italian: 'Cloud Privato',
              pronunciation: '/\u02C8pra\u026Av\u0259t kla\u028Ad/',
              phonetic: 'PRAI-vet CLAUD',
              example:
                'A private cloud is dedicated to a single organization. = Un cloud privato \u00E8 dedicato a una singola organizzazione.',
              context: 'cloud-models',
              difficulty: 'intermediate',
            },
            {
              english: 'Hybrid Cloud',
              italian: 'Cloud Ibrido',
              pronunciation: '/\u02C8ha\u026Abr\u026Ad kla\u028Ad/',
              phonetic: 'HAI-brid CLAUD',
              example:
                'Hybrid cloud combines on-premises and public cloud. = Il cloud ibrido combina infrastruttura locale e cloud pubblico.',
              context: 'cloud-models',
              difficulty: 'intermediate',
            },
            {
              english: 'Multi-Cloud',
              italian: 'Multi-Cloud',
              pronunciation: '/\u02C8m\u028Clti kla\u028Ad/',
              phonetic: 'MAL-ti CLAUD',
              example:
                'A multi-cloud strategy uses services from different vendors. = Una strategia multi-cloud usa servizi di diversi fornitori.',
              context: 'cloud-models',
              difficulty: 'intermediate',
            },
            {
              english: 'On-premises',
              italian: 'In Sede / On-premises',
              pronunciation: '/\u02CC\u0252n \u02C8prem\u026As\u026Az/',
              phonetic: 'on-PRE-mi-sis',
              example:
                'Moving data from on-premises to the cloud. = Spostare i dati dalla sede locale al cloud.',
              context: 'cloud-models',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'cloud_iam',
          title: 'IAM Cloud / Cloud IAM',
          description: 'Identity and Access Management',
          items: [
            {
              english: 'IAM (Identity and Access Management)',
              italian: 'Gestione Identit\u00E0 e Accessi',
              pronunciation: '/\u02CCa\u026A e\u026A \u02CCem/',
              phonetic: 'ai-ei-EM',
              example:
                "IAM is the core of cloud security. = L'IAM \u00E8 il cuore della sicurezza cloud.",
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Identity Provider (IdP)',
              italian: 'Provider di Identit\u00E0',
              pronunciation: '/a\u026A\u02C8dent\u0259ti pr\u0259\u02C8va\u026Ad\u0259r/',
              phonetic: 'ai-DEN-ti-ti pro-VAI-der',
              example:
                'Azure AD is a popular cloud Identity Provider. = Azure AD \u00E8 un noto IdP cloud.',
              context: 'iam',
              difficulty: 'intermediate',
            },
            {
              english: 'Service Account',
              italian: 'Account di Servizio',
              pronunciation: '/\u02C8s\u025C\u02D0rv\u026As \u0259\u02C8ka\u028Ant/',
              phonetic: 'SER-vis e-KAUNT',
              example:
                'Apps use service accounts to call cloud APIs. = Le app usano account di servizio per chiamare le API cloud.',
              context: 'iam',
              difficulty: 'intermediate',
              note: 'Account speciale non usato da persone ma da software o macchine.',
            },
            {
              english: 'Role-based Access (Cloud)',
              italian: 'Accesso Basato su Ruoli',
              pronunciation: '/ro\u028Al be\u026Ast \u02CC\u00E6kses/',
              phonetic: 'ROUL beist AK-ses',
              example:
                'Assign roles like "Viewer" or "Editor" in IAM. = Assegna ruoli come "Visualizzatore" o "Editor" in IAM.',
              context: 'iam',
              difficulty: 'beginner',
            },
            {
              english: 'IAM Policy',
              italian: 'Politica IAM / Policy',
              pronunciation: '/\u02CCa\u026A e\u026A \u02CCem \u02C8p\u0252l\u0259si/',
              phonetic: 'ai-ei-EM PO-li-si',
              example:
                'An IAM policy defines permissions in JSON format. = Una policy IAM definisce i permessi in formato JSON.',
              context: 'iam',
              difficulty: 'intermediate',
            },
            {
              english: 'Principal',
              italian: 'Entit\u00E0 Principale / Principal',
              pronunciation: '/\u02C8pr\u026Ans\u0259pl/',
              phonetic: 'PRIN-si-pol',
              example:
                "A principal is any entity that can request an action. = Un principal \u00E8 ogni entit\u00E0 che pu\u00F2 richiedere un'azione.",
              context: 'iam',
              difficulty: 'advanced',
              note: 'Pu\u00F2 essere un utente, un gruppo o un account di servizio.',
            },
            {
              english: 'Resource-based Policy',
              italian: 'Policy Basata sulla Risorsa',
              pronunciation: '/r\u026A\u02C8z\u0254\u02D0rs be\u026Ast \u02C8p\u0252l\u0259si/',
              phonetic: 'ri-SORS beist PO-li-si',
              example:
                'S3 bucket policies are resource-based. = Le policy dei bucket S3 sono basate sulla risorsa.',
              context: 'iam',
              difficulty: 'advanced',
              note: 'Permette di definire chi pu\u00F2 accedere direttamente sulla risorsa stessa.',
            },
            {
              english: 'Federated Identity',
              italian: 'Identit\u00E0 Federata',
              pronunciation:
                '/\u02C8fed\u0259re\u026At\u026Ad a\u026A\u02CCdent\u026Af\u026Ak\u0259\u02CC\u0283\u0259n/',
              phonetic: 'FE-de-reited ai-den-ti-fi-KEI-scen',
              example:
                "Federated identity allows single sign-on across domains. = L'identit\u00E0 federata permette il single sign-on tra domini diversi.",
              context: 'iam',
              difficulty: 'advanced',
            },
            {
              english: 'Conditional Access',
              italian: 'Accesso Condizionale',
              pronunciation: '/k\u0259n\u02C8d\u026A\u0283\u0259nl \u02C8\u00E6kses/',
              phonetic: 'con-DI-scio-nel AK-ses',
              example:
                "Conditional access checks the user location and device. = L'accesso condizionale controlla la posizione e il dispositivo dell'utente.",
              context: 'iam',
              difficulty: 'advanced',
            },
            {
              english: 'Privileged Identity Management (PIM)',
              italian: 'Gestione Identit\u00E0 Privilegiate',
              pronunciation:
                '/\u02C8pr\u026Av\u026Al\u026Ad\u0292 d a\u026A\u02CCdent\u026Af\u026Ak\u0259\u02CC\u0283\u0259n \u02C8m\u00E6n\u026Ad\u0292m\u0259nt/',
              phonetic: 'PRI-vi-ligd ai-DEN-ti-ti MAN-ig-ment',
              example:
                'PIM provides just-in-time access for admins. = Il PIM fornisce accesso just-in-time per gli amministratori.',
              context: 'iam',
              difficulty: 'expert',
            },
          ],
        },
        {
          id: 'cloud_data',
          title: 'Protezione Dati / Data Protection',
          description: 'Encryption at rest/in transit, DLP',
          items: [
            {
              english: 'Encryption at Rest',
              italian: 'Cifratura dei Dati Archiviati',
              pronunciation: '/\u026An\u02C8kr\u026Ap\u0283\u0259n \u00E6t rest/',
              phonetic: 'in-KRIP-scen at REST',
              example:
                'Encryption at rest protects data stored on disks. = La cifratura dei dati archiviati protegge i dati salvati sui dischi.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Encryption in Transit',
              italian: 'Cifratura dei Dati in Transito',
              pronunciation:
                '/\u026An\u02C8kr\u026Ap\u0283\u0259n \u026An \u02C8tr\u00E6ns\u026At/',
              phonetic: 'in-KRIP-scen in TRAN-sit',
              example:
                'TLS provides encryption in transit. = Il TLS fornisce la cifratura in transito.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Client-side Encryption',
              italian: 'Cifratura Lato Client',
              pronunciation:
                '/\u02C8kla\u026A\u0259nt sa\u026Ad \u026An\u02C8kr\u026Ap\u0283\u0259n/',
              phonetic: 'CLAI-ent said in-KRIP-scen',
              example:
                'Client-side encryption means only you have the keys. = La cifratura lato client significa che solo tu hai le chiavi.',
              context: 'cloud-security',
              difficulty: 'advanced',
              note: 'I dati vengono cifrati prima di essere inviati al cloud.',
            },
            {
              english: 'Server-side Encryption (SSE)',
              italian: 'Cifratura Lato Server',
              pronunciation:
                '/\u02C8s\u025C\u02D0rv\u0259rsa\u026Ad \u026An\u02C8kr\u026Ap\u0283\u0259n/',
              phonetic: 'SER-ver said in-KRIP-scen',
              example:
                'SSE is managed by the cloud provider. = La SSE \u00E8 gestita dal cloud provider.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Key Management Service (KMS)',
              italian: 'Servizio Gestione Chiavi',
              pronunciation:
                '/ki\u02D0 \u02C8m\u00E6n\u026Ad\u0292m\u0259nt \u02C8s\u025C\u02D0rv\u026As/',
              phonetic: 'KII MAN-ig-ment SER-vis',
              example:
                'KMS is used to create and control encryption keys. = Il KMS \u00E8 usato per creare e controllare le chiavi di cifratura.',
              context: 'cloud-security',
              difficulty: 'advanced',
            },
            {
              english: 'Data Residency',
              italian: 'Residenza dei Dati',
              pronunciation: '/\u02C8de\u026At\u0259 \u02C8rez\u026Ad\u0259nsi/',
              phonetic: 'DEI-ta RE-si-den-si',
              example:
                'Data residency requirements vary by country. = I requisiti di residenza dei dati variano da paese a paese.',
              context: 'compliance',
              difficulty: 'intermediate',
              note: 'Il luogo fisico dove i dati sono salvati.',
            },
            {
              english: 'Data Sovereignty',
              italian: 'Sovranit\u00E0 dei Dati',
              pronunciation: '/\u02C8de\u026At\u0259 \u02C8s\u0252vr\u026Anti/',
              phonetic: 'DEI-ta SO-vren-ti',
              example:
                'Data sovereignty means data is subject to local laws. = La sovranit\u00E0 dei dati significa che i dati sono soggetti alle leggi locali.',
              context: 'compliance',
              difficulty: 'advanced',
            },
            {
              english: 'Object Storage Security',
              italian: 'Sicurezza Storage a Oggetti',
              pronunciation:
                '/\u02C8\u0252bd\u0292\u026Akt \u02C8st\u0254\u02D0r\u026Ad\u0292 s\u026A\u02C8kj\u028A\u0259r\u0259ti/',
              phonetic: 'OB-gect STO-rig si-KIUR-i-ti',
              example:
                'Secure your S3 buckets to prevent data leaks. = Proteggi i tuoi bucket S3 per prevenire perdite di dati.',
              context: 'cloud-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Snapshot Backup',
              italian: 'Backup Snapshot / Istantanea',
              pronunciation: '/\u02C8sn\u00E6p\u0283\u0252t \u02C8b\u00E6k\u028Cp/',
              phonetic: 'SNAP-sciot BAK-ap',
              example:
                'Take a snapshot before making system changes. = Fai una snapshot prima di modificare il sistema.',
              context: 'cloud-operations',
              difficulty: 'beginner',
            },
            {
              english: 'Data Masking',
              italian: 'Mascheramento dei Dati',
              pronunciation: '/\u02C8de\u026At\u0259 \u02C8m\u0251\u02D0sk\u026A\u014B/',
              phonetic: 'DEI-ta MAS-king',
              example:
                'Data masking hides sensitive info in non-production environments. = Il mascheramento dei dati nasconde info sensibili in ambienti non-prod.',
              context: 'data-security',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'cloud_compliance',
          title: 'Compliance Cloud',
          description: 'GDPR, HIPAA, SOC2 nel cloud',
          items: [
            {
              english: 'Cloud Audit',
              italian: 'Audit del Cloud',
              pronunciation: '/kla\u028Ad \u02C8\u0254\u02D0d\u026At/',
              phonetic: 'CLAUD O-dit',
              example:
                'A cloud audit verifies security controls. = Un audit del cloud verifica i controlli di sicurezza.',
              context: 'compliance',
              difficulty: 'intermediate',
            },
            {
              english: 'CSA (Cloud Security Alliance)',
              italian: 'Cloud Security Alliance (CSA)',
              pronunciation: '/\u02CCsi\u02D0 es \u02C8e\u026A/',
              phonetic: 'sii-es-EI',
              example:
                'CSA provides the STAR certification. = La CSA fornisce la certificazione STAR.',
              context: 'organizations',
              difficulty: 'intermediate',
            },
            {
              english: 'CCM (Cloud Controls Matrix)',
              italian: 'Matrice dei Controlli Cloud',
              pronunciation: '/\u02CCsi\u02D0 si\u02D0 \u02CCem/',
              phonetic: 'sii-sii-EM',
              example:
                'CCM is a framework for cloud security assessment. = Il CCM \u00E8 un framework per la valutazione della sicurezza cloud.',
              context: 'frameworks',
              difficulty: 'advanced',
            },
            {
              english: 'FedRAMP',
              italian: 'FedRAMP / Standard USA Cloud',
              pronunciation: '/\u02C8fedr\u00E6mp/',
              phonetic: 'FED-ramp',
              example:
                'FedRAMP is required for cloud providers serving the US government. = Il FedRAMP \u00E8 richiesto per i provider cloud del governo USA.',
              context: 'compliance',
              difficulty: 'advanced',
            },
            {
              english: 'SOC 2 Type II',
              italian: 'SOC 2 Tipo II / Report Sicurezza',
              pronunciation: '/\u02CCes o\u028A \u02CCsi\u02D0 t\u028Au ta\u026Ap t\u028Au/',
              phonetic: 'sok-tu-taip-tu',
              example:
                'Ask for the SOC 2 Type II report from your vendor. = Chiedi il report SOC 2 Tipo II al tuo fornitore.',
              context: 'compliance',
              difficulty: 'advanced',
              note: 'Verifica la sicurezza, disponibilit\u00E0 e riservatezza dei dati gestiti dal provider.',
            },
            {
              english: 'HIPAA (in Cloud)',
              italian: 'HIPAA / Dati Sanitari',
              pronunciation: '/\u02C8h\u026Ap\u0259/',
              phonetic: 'HIP-pa',
              example:
                'HIPAA compliance is mandatory for health data in the cloud. = La compliance HIPAA \u00E8 obbligatoria per i dati sanitari nel cloud.',
              context: 'compliance',
              difficulty: 'intermediate',
            },
            {
              english: 'Service Level Agreement (SLA)',
              italian: 'Accordo sul Livello di Servizio',
              pronunciation:
                '/\u02C8s\u025C\u02D0rv\u026As \u02C8levl \u0259\u02C8\u0261ri\u02D0m\u0259nt/',
              phonetic: 'SER-vis LE-vel a-GRII-ment',
              example: "The SLA guarantees 99.9% uptime. = L'SLA garantisce il 99.9% di uptime.",
              context: 'business',
              difficulty: 'beginner',
            },
            {
              english: 'Shared Compliance',
              italian: 'Conformit\u00E0 Condivisa',
              pronunciation: '/\u0283e\u0259rd k\u0259m\u02C8pla\u026A\u0259ns/',
              phonetic: 'SCERD com-PLAI-ens',
              example:
                'Compliance in the cloud is a shared task. = La conformit\u00E0 nel cloud \u00E8 un compito condiviso.',
              context: 'compliance',
              difficulty: 'intermediate',
            },
            {
              english: 'Right to Audit',
              italian: 'Diritto di Audit',
              pronunciation: '/ra\u026At tu \u02C8\u0254\u02D0d\u026At/',
              phonetic: 'RAIT tu O-dit',
              example:
                'The contract should include a right to audit clause. = Il contratto dovrebbe includere una clausola sul diritto di audit.',
              context: 'legal',
              difficulty: 'advanced',
            },
            {
              english: 'CAIQ (Consensus Assessments Initiative Questionnaire)',
              italian: 'Questionario CAIQ',
              pronunciation: '/\u02CCsi\u02D0 e\u026A a\u026A \u02C8kju\u02D0/',
              phonetic: 'keic-kiu',
              example:
                "Review the provider's CAIQ for a detailed security overview. = Rivedi il CAIQ del provider per una panoramica di sicurezza dettagliata.",
              context: 'compliance',
              difficulty: 'expert',
            },
          ],
        },
      ],
    },
    9: {
      name: 'Sicurezza Mobile / Mobile Security',
      description: 'Protezione dei dispositivi mobili',
      lessons: [
        {
          id: 'mobile_threats',
          title: 'Minacce Mobile / Mobile Threats',
          description: 'Malware mobile, SMS phishing',
          items: [
            {
              english: 'Mobile Malware',
              italian: 'Malware Mobile',
              pronunciation: '/\u02C8mo\u028Aba\u026Al \u02C8m\u00E6lwe\u0259r/',
              phonetic: 'MOU-bail MAL-uer',
              example:
                'Mobile malware can steal your contacts and messages. = Il malware mobile pu\u00F2 rubare i tuoi contatti e messaggi.',
              context: 'threats',
              difficulty: 'beginner',
            },
            {
              english: 'SMiShing (SMS Phishing)',
              italian: 'SMiShing / Phishing via SMS',
              pronunciation: '/\u02C8sm\u026A\u0283\u026A\u014B/',
              phonetic: 'SMI-scing',
              example:
                'SMiShing attacks use text messages to trick users. = Gli attacchi di SMiShing usano messaggi di testo per ingannare gli utenti.',
              context: 'threats',
              difficulty: 'beginner',
              note: 'Combinazione di "SMS" + "Phishing".',
            },
            {
              english: 'App Sandboxing',
              italian: 'Sandboxing delle App',
              pronunciation: '/\u00E6p \u02C8s\u00E6ndb\u0252ks\u026A\u014B/',
              phonetic: 'AP SAND-bok-sing',
              example:
                "App sandboxing prevents apps from accessing other apps' data. = Il sandboxing delle app impedisce alle app di accedere ai dati di altre app.",
              context: 'defense',
              difficulty: 'intermediate',
              note: 'Ogni app gira in un suo ambiente isolato.',
            },
            {
              english: 'Jailbreaking',
              italian: 'Jailbreaking (iOS)',
              pronunciation: '/\u02C8d\u0292e\u026Albre\u026Ak\u026A\u014B/',
              phonetic: 'GEIL-brei-king',
              example:
                'Jailbreaking an iPhone removes security restrictions. = Fare il jailbreak a un iPhone rimuove le restrizioni di sicurezza.',
              context: 'threats',
              difficulty: 'intermediate',
              note: "Permette di installare app fuori dall'App Store, ma espone il sistema a rischi.",
            },
            {
              english: 'Rooting',
              italian: 'Rooting (Android)',
              pronunciation: '/\u02C8ru\u02D0t\u026A\u014B/',
              phonetic: 'RUU-ting',
              example:
                'Rooting gives you full administrative control over Android. = Il rooting ti d\u00E0 il pieno controllo amministrativo su Android.',
              context: 'threats',
              difficulty: 'intermediate',
            },
            {
              english: 'Sideloading',
              italian: 'Sideloading / Caricamento Laterale',
              pronunciation: '/\u02C8sa\u026Adlo\u028Ad\u026A\u014B/',
              phonetic: 'SAID-lou-ding',
              example:
                'Sideloading apps from unknown sources is risky. = Fare il sideloading di app da fonti sconosciute \u00E8 rischioso.',
              context: 'threats',
              difficulty: 'beginner',
              note: "Installare un'app scaricata manualmente (es. file APK) invece che dallo store ufficiale.",
            },
            {
              english: 'Man-in-the-Disk',
              italian: 'Attacco Man-in-the-Disk',
              pronunciation: '/m\u00E6n \u026An \u00F0\u0259 d\u026Ask/',
              phonetic: 'man in de DISK',
              example:
                'Man-in-the-disk exploits shared storage on Android. = Il man-in-the-disk sfrutta lo storage condiviso su Android.',
              context: 'threats',
              difficulty: 'advanced',
            },
            {
              english: 'Bluejacking',
              italian: 'Bluejacking',
              pronunciation: '/\u02C8blu\u02D0d\u0292\u00E6k\u026A\u014B/',
              phonetic: 'BLUU-giak-ing',
              example:
                'Bluejacking is used to send unsolicited messages via Bluetooth. = Il bluejacking \u00E8 usato per inviare messaggi non richiesti via Bluetooth.',
              context: 'threats',
              difficulty: 'intermediate',
            },
            {
              english: 'Bluesnarfing',
              italian: 'Bluesnarfing',
              pronunciation: '/\u02C8blu\u02D0sn\u0251\u02D0rf\u026A\u014B/',
              phonetic: 'BLUU-snarf-ing',
              example:
                'Bluesnarfing involves stealing data through Bluetooth. = Il bluesnarfing consiste nel rubare dati tramite Bluetooth.',
              context: 'threats',
              difficulty: 'advanced',
              note: 'Pi\u00F9 grave del bluejacking: ruba contatti, messaggi o file.',
            },
            {
              english: 'Reverse Engineering (Mobile)',
              italian: 'Ingegneria Inversa',
              pronunciation:
                '/r\u026A\u02C8v\u025C\u02D0rs \u02CCend\u0292\u026A\u02C8n\u026A\u0259r\u026A\u014B/',
              phonetic: 're-VERS en-gi-NIR-ing',
              example:
                "Security researchers use reverse engineering to find app bugs. = I ricercatori di sicurezza usano l'ingegneria inversa per trovare bug nelle app.",
              context: 'analysis',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'mobile_mgmt',
          title: 'Gestione Dispositivi / Device Management',
          description: 'MDM, BYOD, MAM',
          items: [
            {
              english: 'MDM (Mobile Device Management)',
              italian: 'Gestione dei Dispositivi Mobili',
              pronunciation: '/\u02CCem di\u02D0 \u02CCem/',
              phonetic: 'em-dii-EM',
              example:
                "The company uses MDM to enforce security policies. = L'azienda usa l'MDM per forzare le policy di sicurezza.",
              context: 'management-tools',
              difficulty: 'intermediate',
              note: "Software che permette all'IT di gestire e proteggere smartphone e tablet aziendali.",
            },
            {
              english: 'BYOD (Bring Your Own Device)',
              italian: 'BYOD / Porta il tuo Dispositivo',
              pronunciation: '/\u02CCbi\u02D0 wa\u026A o\u028A \u02CCdi\u02D0/',
              phonetic: 'bii-uai-ou-DII',
              example:
                'BYOD creates security challenges for the IT department. = Il BYOD crea sfide di sicurezza per il reparto IT.',
              context: 'policy',
              difficulty: 'beginner',
              note: 'Politica aziendale che permette ai dipendenti di usare i propri dispositivi personali per lavoro.',
            },
            {
              english: 'MAM (Mobile Application Management)',
              italian: 'Gestione delle Applicazioni Mobili',
              pronunciation: '/\u02CCem e\u026A \u02CCem/',
              phonetic: 'em-ei-EM',
              example:
                'MAM allows controlling only the corporate apps on a personal phone. = Il MAM permette di controllare solo le app aziendali su un telefono personale.',
              context: 'management-tools',
              difficulty: 'intermediate',
            },
            {
              english: 'Remote Wipe',
              italian: 'Cancellazione Remota',
              pronunciation: '/r\u026A\u02C8mo\u028At wa\u026Ap/',
              phonetic: 're-MOUT UAIP',
              example:
                'Perform a remote wipe if the phone is stolen. = Esegui una cancellazione remota se il telefono viene rubato.',
              context: 'incident-response',
              difficulty: 'beginner',
              note: 'Comando inviato via internet per cancellare tutti i dati sul dispositivo.',
            },
            {
              english: 'Geofencing',
              italian: 'Geofencing / Recinzione Virtuale',
              pronunciation: '/\u02C8d\u0292i\u02D0o\u028Afens\u026A\u014B/',
              phonetic: 'GIO-fen-sing',
              example:
                "Geofencing triggers an alert when the device leaves the office. = Il geofencing attiva un allarme quando il dispositivo lascia l'ufficio.",
              context: 'defense',
              difficulty: 'intermediate',
            },
            {
              english: 'Device Attestation',
              italian: 'Attestazione del Dispositivo',
              pronunciation: '/d\u026A\u02C8va\u026As \u02CC\u00E6te\u02C8ste\u026A\u0283\u0259n/',
              phonetic: 'di-VAIS at-te-STEI-scen',
              example:
                "Device attestation verifies that the hardware is untampered. = L'attestazione del dispositivo verifica che l'hardware non sia manomesso.",
              context: 'defense',
              difficulty: 'advanced',
            },
            {
              english: 'UEM (Unified Endpoint Management)',
              italian: 'Gestione Unificata degli Endpoint',
              pronunciation: '/\u02CCju\u02D0 i\u02D0 \u02CCem/',
              phonetic: 'iu-ii-EM',
              example:
                'UEM manages both mobile and desktop devices. = Lo UEM gestisce sia dispositivi mobili che desktop.',
              context: 'management-tools',
              difficulty: 'advanced',
            },
            {
              english: 'Containerization (Mobile)',
              italian: 'Containerizzazione / Isolamento App',
              pronunciation: '/k\u0259n\u02CCte\u026An\u0259ra\u026A\u02C8ze\u026A\u0283\u0259n/',
              phonetic: 'con-tei-ne-rai-ZEI-scen',
              example:
                'Containerization separates work data from personal data. = La containerizzazione separa i dati di lavoro da quelli personali.',
              context: 'defense',
              difficulty: 'intermediate',
            },
            {
              english: 'Enrollment',
              italian: 'Registrazione / Enrollment',
              pronunciation: '/\u026An\u02C8ro\u028Alm\u0259nt/',
              phonetic: 'en-ROUL-ment',
              example:
                "Device enrollment is the first step in MDM setup. = L'enrollment \u00E8 il primo passo nella configurazione MDM.",
              context: 'management-process',
              difficulty: 'intermediate',
            },
            {
              english: 'Policy Enforcement',
              italian: 'Applicazione delle Policy',
              pronunciation: '/\u02C8p\u0252l\u0259si \u026An\u02C8f\u0254\u02D0rsm\u0259nt/',
              phonetic: 'PO-li-si en-FORS-ment',
              example:
                "MDM ensures automated policy enforcement. = L'MDM garantisce l'applicazione automatica delle policy.",
              context: 'management-process',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'mobile_app',
          title: 'Sicurezza App / App Security',
          description: 'Certificate pinning, obfuscation',
          items: [
            {
              english: 'Certificate Pinning',
              italian: 'Certificate Pinning',
              pronunciation: '/s\u0259r\u02C8t\u026Af\u026Ak\u0259t \u02C8p\u026An\u026A\u014B/',
              phonetic: 'ser-TI-fi-ket PIN-ning',
              example:
                'Certificate pinning prevents MitM attacks by trusting only a specific certificate. = Il certificate pinning previene gli attacchi MitM fidandosi solo di un certificato specifico.',
              context: 'defense',
              difficulty: 'advanced',
              note: 'L\'app rifiuta qualsiasi certificato che non sia quello "inchiodato" nel codice.',
            },
            {
              english: 'Code Obfuscation',
              italian: 'Offuscamento del Codice',
              pronunciation: '/ko\u028Ad \u02CC\u0252bf\u028C\u02C8ske\u026A\u0283\u0259n/',
              phonetic: 'KOUD ob-fas-KEI-scen',
              example:
                "Obfuscation makes it harder for hackers to understand the app logic. = L'offuscamento rende pi\u00F9 difficile per gli hacker capire la logica dell'app.",
              context: 'defense',
              difficulty: 'advanced',
            },
            {
              english: 'Root Detection',
              italian: 'Rilevamento Root/Jailbreak',
              pronunciation: '/ru\u02D0t d\u026A\u02C8tek\u0283\u0259n/',
              phonetic: 'RUUT di-TEK-scen',
              example:
                'Banking apps use root detection for security. = Le app bancarie usano il rilevamento root per sicurezza.',
              context: 'defense',
              difficulty: 'intermediate',
              note: "L'app smette di funzionare se rileva che il dispositivo \u00E8 stato manomesso.",
            },
            {
              english: 'Secure Enclave (iOS)',
              italian: 'Secure Enclave / Area Sicura',
              pronunciation: '/s\u026A\u02C8kj\u028A\u0259r \u02C8enkle\u026Av/',
              phonetic: 'si-KIUR EN-cleiv',
              example:
                'The Secure Enclave stores your fingerprint data. = Il Secure Enclave salva i dati della tua impronta.',
              context: 'hardware-security',
              difficulty: 'advanced',
              note: 'Coprocessore isolato dal sistema principale per gestire dati sensibilissimi.',
            },
            {
              english: 'TrustZone (Android)',
              italian: 'TrustZone / Area Fidata',
              pronunciation: '/tr\u028Cst zo\u028An/',
              phonetic: 'TRAST ZOUN',
              example:
                'ARM TrustZone provides a secure execution environment. = ARM TrustZone fornisce un ambiente di esecuzione sicuro.',
              context: 'hardware-security',
              difficulty: 'advanced',
            },
            {
              english: 'Tapjacking',
              italian: 'Tapjacking',
              pronunciation: '/\u02C8t\u00E6pd\u0292\u00E6k\u026A\u014B/',
              phonetic: 'TAP-giak-ing',
              example:
                "Tapjacking tricks you into clicking something you didn't intend to. = Il tapjacking ti inganna facendoti cliccare qualcosa che non volevi.",
              context: 'threats',
              difficulty: 'advanced',
              note: "Versione mobile del clickjacking: un'app invisibile si sovrappone a quella reale.",
            },
            {
              english: 'Intent Injection',
              italian: 'Iniezione di Intent',
              pronunciation: '/\u026An\u02C8tent \u026An\u02C8d\u0292ek\u0283\u0259n/',
              phonetic: 'in-TENT in-GEK-scen',
              example:
                "Intent injection exploits inter-app communication on Android. = L'iniezione di intent sfrutta la comunicazione tra app su Android.",
              context: 'web-vulnerabilities',
              difficulty: 'expert',
            },
            {
              english: 'Data Leakage (App)',
              italian: 'Fuga di Dati dalle App',
              pronunciation: '/\u02C8de\u026At\u0259 \u02C8li\u02D0k\u026Ad\u0292/',
              phonetic: 'DEITA LII-keg',
              example:
                'Poorly written apps cause unintended data leakage. = App scritte male causano fughe di dati non intenzionali.',
              context: 'threats',
              difficulty: 'intermediate',
              note: 'Dati sensibili salvati in log o cache accessibili ad altre app.',
            },
            {
              english: 'App Wrapping',
              italian: 'App Wrapping / Involucro App',
              pronunciation: '/\u00E6p \u02C8r\u00E6p\u026A\u014B/',
              phonetic: 'AP RAP-ping',
              example:
                "App wrapping adds a security layer to existing apps. = L'app wrapping aggiunge un livello di sicurezza ad app esistenti.",
              context: 'defense',
              difficulty: 'advanced',
            },
            {
              english: 'Biometric Unlock',
              italian: 'Sblocco Biometrico',
              pronunciation: '/\u02CCba\u026Ao\u028A\u02C8metr\u026Ak \u02CC\u028Cn\u02C8l\u0252k/',
              phonetic: 'bai-ou-ME-trik AN-lock',
              example:
                'Enable biometric unlock for your banking app. = Abilita lo sblocco biometrico per la tua app bancaria.',
              context: 'authentication',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'mobile_network',
          title: 'Rete Mobile / Mobile Network',
          description: 'Mobile VPN, WiFi security',
          items: [
            {
              english: 'Mobile VPN',
              italian: 'VPN Mobile',
              pronunciation: '/\u02C8mo\u028Aba\u026Al \u02CCvi\u02D0 pi\u02D0 \u02C8en/',
              phonetic: 'MOU-bail vii-pii-EN',
              example:
                'A mobile VPN protects your traffic on public Wi-Fi. = Una VPN mobile protegge il tuo traffico su Wi-Fi pubbliche.',
              context: 'defense',
              difficulty: 'beginner',
            },
            {
              english: 'Rogue Wi-Fi (Mobile)',
              italian: 'Wi-Fi Canaglia',
              pronunciation: '/ro\u028A\u0261 \u02C8wa\u026A fa\u026A/',
              phonetic: 'ROUG uai-fai',
              example:
                'Avoid connecting to rogue Wi-Fi networks in airports. = Evita di connetterti a reti Wi-Fi canaglia negli aeroporti.',
              context: 'threats',
              difficulty: 'beginner',
            },
            {
              english: 'IMSI Catcher',
              italian: 'Cattura IMSI / Stingray',
              pronunciation: '/\u02C8\u026Amsi \u02C8k\u00E6t\u0283\u0259r/',
              phonetic: 'IM-si CAT-cer',
              example:
                'An IMSI catcher mimics a cell tower to intercept calls. = Un IMSI catcher imita una torre cellulare per intercettare chiamate.',
              context: 'threats',
              difficulty: 'expert',
              note: 'Dispositivo usato per lo spionaggio che forza i telefoni a connettersi ad esso.',
            },
            {
              english: 'Cell Tower Spoofing',
              italian: 'Spoofing di Torre Cellulare',
              pronunciation: '/sel \u02C8ta\u028A\u0259r \u02C8spu\u02D0f\u026A\u014B/',
              phonetic: 'SEL TAU-er SPUU-fing',
              example:
                'Cell tower spoofing can track your location. = Lo spoofing delle torri cellulari pu\u00F2 tracciare la tua posizione.',
              context: 'threats',
              difficulty: 'advanced',
            },
            {
              english: '5G Security',
              italian: 'Sicurezza 5G',
              pronunciation:
                '/\u02CCfa\u026Av \u02C8d\u0292i\u02D0 s\u026A\u02C8kj\u028A\u0259r\u0259ti/',
              phonetic: 'FAIV-GII si-KIUR-i-ti',
              example:
                '5G introduces better encryption than 4G. = Il 5G introduce una cifratura migliore del 4G.',
              context: 'networking',
              difficulty: 'intermediate',
            },
            {
              english: 'Bluetooth Low Energy (BLE) Security',
              italian: 'Sicurezza BLE',
              pronunciation: '/\u02CCblu\u02D0tu\u02D0\u03B8 lo\u028A \u02C8en\u0259rd\u0292i/',
              phonetic: 'BLUU-tuuth LOU EN-er-gi',
              example:
                'Many IoT devices use BLE with weak security. = Molti dispositivi IoT usano il BLE con sicurezza debole.',
              context: 'networking',
              difficulty: 'intermediate',
            },
            {
              english: 'NFC Security',
              italian: 'Sicurezza NFC',
              pronunciation: '/\u02CCen ef \u02CCsi\u02D0 s\u026A\u02C8kj\u028A\u0259r\u0259ti/',
              phonetic: 'en-ef-SII si-KIUR-i-ti',
              example:
                "NFC is used for mobile payments and needs protection. = L'NFC \u00E8 usato per i pagamenti mobile e necessita di protezione.",
              context: 'networking',
              difficulty: 'intermediate',
              note: 'Near Field Communication.',
            },
            {
              english: 'Wi-Fi Direct Security',
              italian: 'Sicurezza Wi-Fi Direct',
              pronunciation: '/\u02C8wa\u026A fa\u026A d\u026A\u02C8rekt/',
              phonetic: 'UAI-FAI di-REKT',
              example:
                'Wi-Fi Direct allows devices to connect without an access point. = Il Wi-Fi Direct permette ai dispositivi di connettersi senza un access point.',
              context: 'networking',
              difficulty: 'intermediate',
            },
            {
              english: 'Roaming Security',
              italian: 'Sicurezza in Roaming',
              pronunciation: '/\u02C8ro\u028Am\u026A\u014B s\u026A\u02C8kj\u028A\u0259r\u0259ti/',
              phonetic: 'ROU-ming si-KIUR-i-ti',
              example:
                "Data usage in roaming can expose you to untrusted networks. = L'uso dei dati in roaming pu\u00F2 esporti a reti non fidate.",
              context: 'networking',
              difficulty: 'intermediate',
            },
            {
              english: 'Tethering Risks',
              italian: 'Rischi del Tethering / Hotspot',
              pronunciation: '/\u02C8te\u00F0\u0259r\u026A\u014B r\u026Asks/',
              phonetic: 'TE-der-ing RISKS',
              example:
                'Use a strong password for your personal hotspot to avoid tethering risks. = Usa una password forte per il tuo hotspot personale per evitare i rischi del tethering.',
              context: 'threats',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },
    10: {
      name: 'Sicurezza Avanzata / Advanced Security',
      description: 'Tecniche avanzate di attacco e difesa',
      lessons: [
        {
          id: 'adv_teams',
          title: 'Red/Blue/Purple Team',
          description: 'Squadre di sicurezza offensiva e difensiva',
          items: [
            {
              english: 'Red Team',
              italian: 'Red Team / Squadra Offensiva',
              pronunciation: '/red ti\u02D0m/',
              phonetic: 'RED TIIM',
              example:
                'The Red Team simulates real-world attacks to test defenses. = Il Red Team simula attacchi reali per testare le difese.',
              context: 'offensive-security',
              difficulty: 'intermediate',
              note: 'Il loro obiettivo \u00E8 trovare falle e penetrare nel sistema senza farsi scoprire.',
            },
            {
              english: 'Blue Team',
              italian: 'Blue Team / Squadra Difensiva',
              pronunciation: '/blu\u02D0 ti\u02D0m/',
              phonetic: 'BLUU TIIM',
              example:
                'The Blue Team is responsible for incident detection and response. = Il Blue Team \u00E8 responsabile del rilevamento e della risposta agli incidenti.',
              context: 'defensive-security',
              difficulty: 'intermediate',
              note: 'Proteggono le risorse aziendali e monitorano i log per trovare attacchi.',
            },
            {
              english: 'Purple Team',
              italian: 'Purple Team / Squadra Collaborativa',
              pronunciation: '/\u02C8p\u025C\u02D0rpl ti\u02D0m/',
              phonetic: 'PER-pol TIIM',
              example:
                'Purple Team exercises improve communication between Red and Blue teams. = Le esercitazioni del Purple Team migliorano la comunicazione tra Red e Blue team.',
              context: 'security-operations',
              difficulty: 'advanced',
              note: 'Non \u00E8 necessariamente un team fisso, ma un approccio dove attaccanti e difensori lavorano insieme per migliorare la sicurezza.',
            },
            {
              english: 'White Team',
              italian: 'White Team / Giudici',
              pronunciation: '/wa\u026At ti\u02D0m/',
              phonetic: 'UAIT TIIM',
              example:
                "The White Team acts as judges during a security exercise. = Il White Team funge da giudice durante un'esercitazione di sicurezza.",
              context: 'security-operations',
              difficulty: 'advanced',
              note: 'Definiscono le regole del gioco e controllano che vengano rispettate.',
            },
            {
              english: 'SOC (Security Operations Center)',
              italian: 'SOC / Centro Operativo di Sicurezza',
              pronunciation: '/\u02CCes o\u028A \u02C8si\u02D0/',
              phonetic: 'es-ou-SII',
              example:
                'The SOC monitors the network 24/7. = Il SOC monitora la rete 24 ore su 24, 7 giorni su 7.',
              context: 'security-operations',
              difficulty: 'intermediate',
            },
            {
              english: 'Adversary Simulation',
              italian: "Simulazione dell'Avversario",
              pronunciation:
                '/\u02C8\u00E6dv\u0259rseri \u02CCs\u026Amju\u02C8le\u026A\u0283\u0259n/',
              phonetic: 'AD-ver-se-ri si-miu-LEI-scen',
              example:
                "Adversary simulation mimics the tactics of specific APT groups. = La simulazione dell'avversario imita le tattiche di specifici gruppi APT.",
              context: 'offensive-security',
              difficulty: 'advanced',
            },
            {
              english: 'Threat Hunting',
              italian: 'Caccia alle Minacce / Threat Hunting',
              pronunciation: '/\u03B8ret \u02C8h\u028Cnt\u026A\u014B/',
              phonetic: 'THRET HAN-ting',
              example:
                'Threat hunting is a proactive approach to finding hidden attackers. = Il threat hunting \u00E8 un approccio proattivo per trovare attaccanti nascosti.',
              context: 'defensive-security',
              difficulty: 'advanced',
              note: 'Non aspettare un allarme, ma cercare attivamente segni di intrusione nei log.',
            },
            {
              english: 'SOAR (Security Orchestration, Automation, and Response)',
              italian: 'Orchestrazione e Automazione Sicurezza',
              pronunciation: '/s\u0254\u02D0r/',
              phonetic: 'SOAR',
              example:
                'SOAR platforms help teams handle high volumes of alerts. = Le piattaforme SOAR aiutano i team a gestire alti volumi di allarmi.',
              context: 'security-operations',
              difficulty: 'expert',
            },
            {
              english: 'Tabletop Exercise',
              italian: 'Esercitazione Tabletop',
              pronunciation: '/\u02C8te\u026Ablt\u0252p \u02C8eks\u0259rsa\u026Az/',
              phonetic: 'TEIBL-top ek-ser-sais',
              example:
                "A tabletop exercise tests decision-making during a crisis. = Un'esercitazione tabletop testa la capacit\u00E0 decisionale durante una crisi.",
              context: 'incident-response',
              difficulty: 'intermediate',
            },
            {
              english: 'Cyber Range',
              italian: 'Poligono Cyber / Cyber Range',
              pronunciation: '/\u02C8sa\u026Ab\u0259r re\u026And\u0292/',
              phonetic: 'SAI-ber REING',
              example:
                'Use a cyber range to train your security team. = Usa un cyber range per addestrare il tuo team di sicurezza.',
              context: 'training',
              difficulty: 'intermediate',
              note: 'Ambiente virtuale isolato e controllato per simulazioni di attacco e difesa.',
            },
          ],
        },
        {
          id: 'adv_malware',
          title: 'Analini Malware / Malware Analysis',
          description: 'Reverse engineering, sandboxing',
          items: [
            {
              english: 'Malware Analysis',
              italian: 'Analisi del Malware',
              pronunciation: '/\u02C8m\u00E6lwe\u0259r \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'MAL-uer a-NA-li-sis',
              example:
                "Malware analysis reveals how a virus works. = L'analisi del malware rivela come funziona un virus.",
              context: 'analysis',
              difficulty: 'intermediate',
            },
            {
              english: 'Static Analysis',
              italian: 'Analisi Statica',
              pronunciation: '/\u02C8st\u00E6t\u026Ak \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'STA-tik a-NA-li-sis',
              example:
                "Static analysis examines the code without running it. = L'analisi statica esamina il codice senza eseguirlo.",
              context: 'analysis',
              difficulty: 'intermediate',
            },
            {
              english: 'Dynamic Analysis',
              italian: 'Analisi Dinamica',
              pronunciation: '/da\u026A\u02C8n\u00E6m\u026Ak \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'dai-NA-mik a-NA-li-sis',
              example:
                "Dynamic analysis involves executing the malware in a controlled environment. = L'analisi dinamica consiste nell'eseguire il malware in un ambiente controllato.",
              context: 'analysis',
              difficulty: 'intermediate',
            },
            {
              english: 'Reverse Engineering',
              italian: 'Ingegneria Inversa',
              pronunciation:
                '/r\u026A\u02C8v\u025C\u02D0rs \u02CCend\u0292\u026A\u02C8n\u026A\u0259r\u026A\u014B/',
              phonetic: 're-VERS en-gi-NIR-ing',
              example:
                "Reverse engineering is used to reconstruct the source code. = L'ingegneria inversa \u00E8 usata per ricostruire il codice sorgente.",
              context: 'analysis',
              difficulty: 'advanced',
            },
            {
              english: 'Disassembler',
              italian: 'Disassemblatore',
              pronunciation: '/\u02CCd\u026As\u0259\u02C8sembl\u0259r/',
              phonetic: 'dis-as-SEM-bler',
              example:
                'IDA Pro is a famous disassembler. = IDA Pro \u00E8 un noto disassemblatore.',
              context: 'analysis-tools',
              difficulty: 'expert',
              note: 'Traduce il linguaggio macchina (binario) in codice assembly leggibile.',
            },
            {
              english: 'Debugger',
              italian: 'Debugger',
              pronunciation: '/\u02CCdi\u02D0\u02C8b\u028C\u0261\u0259r/',
              phonetic: 'dii-BA-gher',
              example:
                "A debugger allows pausing the malware execution. = Un debugger permette di mettere in pausa l'esecuzione del malware.",
              context: 'analysis-tools',
              difficulty: 'advanced',
            },
            {
              english: 'Packer',
              italian: 'Packer / Impacchettatore',
              pronunciation: '/\u02C8p\u00E6k\u0259r/',
              phonetic: 'PAK-er',
              example:
                'A packer compresses or encrypts the malware to hide it from antivirus. = Un packer comprime o cifra il malware per nasconderlo agli antivirus.',
              context: 'threats',
              difficulty: 'advanced',
            },
            {
              english: 'Obfuscation',
              italian: 'Offuscamento',
              pronunciation: '/\u02CC\u0252bf\u028C\u02C8ske\u026A\u0283\u0259n/',
              phonetic: 'ob-fas-KEI-scen',
              example:
                "Obfuscation makes static analysis much harder. = L'offuscamento rende l'analisi statica molto pi\u00F9 difficile.",
              context: 'threats',
              difficulty: 'advanced',
            },
            {
              english: 'Behavioral Signature',
              italian: 'Firma Comportamentale',
              pronunciation:
                '/b\u026A\u02C8he\u026Avj\u0259r\u0259l \u02C8s\u026A\u0261n\u0259t\u0283\u0259r/',
              phonetic: 'bi-HEI-vior-al SIG-na-cer',
              example:
                'Antivirus can use behavioral signatures to detect unknown threats. = Gli antivirus possono usare firme comportamentali per rilevare minacce sconosciute.',
              context: 'defensive-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Sandbox Escape',
              italian: 'Evasione dalla Sandbox',
              pronunciation: '/\u02C8s\u00E6ndb\u0252ks \u026As\u02C8ke\u026Ap/',
              phonetic: 'SAND-boks es-KEIP',
              example:
                'Some advanced malware can perform a sandbox escape. = Alcuni malware avanzati possono evadere dalla sandbox.',
              context: 'threats',
              difficulty: 'expert',
              note: "Tecnica per uscire dall'ambiente isolato e infettare il sistema ospite.",
            },
          ],
        },
        {
          id: 'adv_apt',
          title: 'APT / Advanced Persistent Threats',
          description: 'Minacce persistenti avanzate',
          items: [
            {
              english: 'APT (Advanced Persistent Threat)',
              italian: 'Minaccia Persistente Avanzata',
              pronunciation: '/\u02CCe\u026A pi\u02D0 \u02C8ti\u02D0/',
              phonetic: 'ei-pi-TII',
              example:
                'APTs are often state-sponsored attack groups. = Le APT sono spesso gruppi di attacco sponsorizzati da stati.',
              context: 'threat-actors',
              difficulty: 'intermediate',
              note: 'Attacchi mirati e a lungo termine condotti da avversari esperti e ben finanziati.',
            },
            {
              english: 'Nation-State Actor',
              italian: 'Attore Statale',
              pronunciation: '/\u02C8ne\u026A\u0283\u0259n ste\u026At \u02C8\u00E6kt\u0259r/',
              phonetic: 'NEI-scion STEIT AC-ter',
              example:
                'Nation-state actors conduct cyber espionage for political gain. = Gli attori statali conducono spionaggio informatico per vantaggi politici.',
              context: 'threat-actors',
              difficulty: 'intermediate',
            },
            {
              english: 'Cyber Espionage',
              italian: 'Spionaggio Informatico',
              pronunciation: '/\u02C8sa\u026Ab\u0259r \u02C8esp\u026A\u0259n\u0251\u02D0\u0292/',
              phonetic: 'SAI-ber ES-pion-ag',
              example:
                'Cyber espionage targets government and military secrets. = Lo spionaggio informatico colpisce segreti governativi e militari.',
              context: 'threats',
              difficulty: 'beginner',
            },
            {
              english: 'Lateral Movement',
              italian: 'Movimento Laterale',
              pronunciation: '/\u02C8l\u00E6t\u0259r\u0259l \u02C8mu\u02D0vm\u0259nt/',
              phonetic: 'LA-te-ral MUUV-ment',
              example:
                "After gaining access, the attacker used lateral movement to reach the database. = Dopo l'accesso, l'attaccante ha usato il movimento laterale per raggiungere il database.",
              context: 'attack-techniques',
              difficulty: 'intermediate',
              note: "Spostarsi da un computer all'altro all'interno della stessa rete.",
            },
            {
              english: 'Persistence',
              italian: 'Persistenza',
              pronunciation: '/p\u0259r\u02C8s\u026Ast\u0259ns/',
              phonetic: 'per-SIS-tens',
              example:
                'The malware achieved persistence by modifying the registry. = Il malware ha ottenuto la persistenza modificando il registro di sistema.',
              context: 'attack-techniques',
              difficulty: 'intermediate',
              note: "Capacit\u00E0 dell'attaccante di rimanere nel sistema anche dopo un riavvio.",
            },
            {
              english: 'Command and Control (C2)',
              italian: 'Comando e Controllo (C2)',
              pronunciation: '/k\u0259\u02C8m\u00E6nd \u0259nd k\u0259n\u02C8tro\u028Al/',
              phonetic: 'com-MAND and con-TROUL',
              example:
                'The infected machine contacted the C2 server for instructions. = La macchina infetta ha contattato il server C2 per istruzioni.',
              context: 'threat-infrastructure',
              difficulty: 'intermediate',
              note: 'Il server centrale da cui gli hacker inviano comandi ai sistemi infetti.',
            },
            {
              english: 'Data Exfiltration',
              italian: 'Esfiltrazione dei Dati',
              pronunciation:
                '/\u02C8de\u026At\u0259 \u02CCeksf\u026Al\u02C8tre\u026A\u0283\u0259n/',
              phonetic: 'DEITA eks-fil-TREI-scion',
              example:
                "Data exfiltration usually happens slowly to avoid detection. = L'esfiltrazione dei dati avviene solitamente lentamente per evitare il rilevamento.",
              context: 'threats',
              difficulty: 'beginner',
            },
            {
              english: 'Living off the Land (LotL)',
              italian: 'LotL / Uso Strumenti Locali',
              pronunciation: '/\u02C8l\u026Av\u026A\u014B \u0252f \u00F0\u0259 l\u00E6nd/',
              phonetic: 'LI-ving of de LAND',
              example:
                'LotL techniques use legitimate system tools like PowerShell for attacks. = Le tecniche LotL usano strumenti di sistema legittimi come PowerShell per gli attacchi.',
              context: 'attack-techniques',
              difficulty: 'advanced',
              note: 'Rende molto difficile il rilevamento perch\u00E9 non viene installato software "strano".',
            },
            {
              english: 'Beaconing',
              italian: 'Beaconing / Segnalazione',
              pronunciation: '/\u02C8bi\u02D0k\u0259n\u026A\u014B/',
              phonetic: 'BII-con-ing',
              example:
                'Regular beaconing traffic can alert security teams to a C2 connection. = Il traffico regolare di beaconing pu\u00F2 avvisare il team di sicurezza di una connessione C2.',
              context: 'threat-infrastructure',
              difficulty: 'advanced',
              note: 'Segnali periodici inviati dal malware al server C2 per dire "sono ancora qui".',
            },
            {
              english: 'Spear Phishing',
              italian: 'Spear Phishing / Phishing Mirato',
              pronunciation: '/sp\u026A\u0259r \u02C8f\u026A\u0283\u026A\u014B/',
              phonetic: 'SPIER FI-scing',
              example:
                "The APT used spear phishing to target the CEO. = L'APT ha usato il spear phishing per colpire il CEO.",
              context: 'social-engineering',
              difficulty: 'beginner',
              note: 'A differenza del phishing normale, \u00E8 indirizzato a una persona specifica con messaggi molto personalizzati.',
            },
          ],
        },
        {
          id: 'adv_offensive',
          title: 'Sicurezza Offensiva / Offensive Security',
          description: 'CTF, penetration testing avanzato',
          items: [
            {
              english: 'Offensive Security',
              italian: 'Sicurezza Offensiva',
              pronunciation: '/\u0259\u02C8fens\u026Av s\u026A\u02C8kj\u028A\u0259r\u0259ti/',
              phonetic: 'of-FEN-siv si-KIUR-i-ti',
              example:
                'Offensive security focuses on finding and exploiting vulnerabilities proactively. = La sicurezza offensiva si concentra sul trovare e sfruttare proattivamente le vulnerabilit\u00E0.',
              context: 'offensive-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Ethical Hacking',
              italian: 'Hacking Etico',
              pronunciation: '/\u02C8e\u03B8\u026Akl \u02C8h\u00E6k\u026A\u014B/',
              phonetic: 'E-thi-cal HAK-ing',
              example:
                "Ethical hacking is legal and used to improve security. = L'hacking etico \u00E8 legale e usato per migliorare la sicurezza.",
              context: 'offensive-security',
              difficulty: 'beginner',
            },
            {
              english: 'CTF (Capture The Flag)',
              italian: 'Capture The Flag (CTF)',
              pronunciation: '/\u02CCsi\u02D0 ti\u02D0 \u02CCef/',
              phonetic: 'sii-tii-EF',
              example:
                "Participating in a CTF is a great way to learn hacking. = Partecipare a una CTF \u00E8 un ottimo modo per imparare l'hacking.",
              context: 'training',
              difficulty: 'beginner',
              note: 'Competizioni di sicurezza informatica in cui i partecipanti devono risolvere sfide tecniche per trovare una "bandiera" (stringa segreta).',
            },
            {
              english: 'Exploit Development',
              italian: 'Sviluppo di Exploit',
              pronunciation: '/\u026Ak\u02C8spl\u0254\u026At d\u026A\u02C8vel\u0259pm\u0259nt/',
              phonetic: 'ik-SPLOIT di-VE-lop-ment',
              example:
                'Exploit development requires deep knowledge of memory and CPU. = Lo sviluppo di exploit richiede una conoscenza profonda di memoria e CPU.',
              context: 'research',
              difficulty: 'expert',
            },
            {
              english: 'Zero-day Research',
              italian: 'Ricerca Zero-day',
              pronunciation:
                '/\u02C8z\u026A\u0259ro\u028A de\u026A r\u026A\u02C8s\u025C\u02D0rt\u0283/',
              phonetic: 'SI-rou dei re-SERC',
              example:
                'Security researchers earn big rewards for zero-day research. = I ricercatori di sicurezza guadagnano grandi premi per la ricerca di zero-day.',
              context: 'research',
              difficulty: 'expert',
            },
            {
              english: 'Fuzzing (Advanced)',
              italian: 'Fuzzing Avanzato',
              pronunciation: '/\u02C8f\u028Cz\u026A\u014B/',
              phonetic: 'FA-zing',
              example:
                'AFL is a popular tool for automated fuzzing. = AFL \u00E8 uno strumento popolare per il fuzzing automatizzato.',
              context: 'offensive-security',
              difficulty: 'advanced',
            },
            {
              english: 'Post-Exploitation',
              italian: 'Post-Exploitation',
              pronunciation: '/po\u028Ast \u02CCekspl\u0254\u026A\u02C8te\u026A\u0283\u0259n/',
              phonetic: 'POUST eks-ploi-TEI-scion',
              example:
                'Post-exploitation involves gathering data after a successful breach. = La post-exploitation consiste nel raccogliere dati dopo una violazione riuscita.',
              context: 'offensive-security',
              difficulty: 'advanced',
            },
            {
              english: 'Shellcode',
              italian: 'Shellcode',
              pronunciation: '/\u02C8\u0283elko\u028Ad/',
              phonetic: 'SCEL-koud',
              example:
                "The exploit injected shellcode into the memory. = L'exploit ha iniettato shellcode nella memoria.",
              context: 'offensive-security',
              difficulty: 'expert',
              note: 'Piccola parte di codice usata come payload per ottenere una shell di comando.',
            },
            {
              english: 'Privilege Escalation (Exploit)',
              italian: 'Scalata dei Privilegi',
              pronunciation:
                '/\u02C8pr\u026Av\u026Al\u026Ad\u0292 \u02CCesk\u0259\u02C8le\u026A\u0283\u0259n/',
              phonetic: 'PRI-vi-lig es-ka-LEI-scion',
              example:
                'Use a kernel exploit for privilege escalation. = Usa un exploit del kernel per la scalata dei privilegi.',
              context: 'offensive-security',
              difficulty: 'intermediate',
            },
            {
              english: 'Pivoting',
              italian: 'Pivoting / Perno',
              pronunciation: '/\u02C8p\u026Av\u0259t\u026A\u014B/',
              phonetic: 'PI-vo-ting',
              example:
                'Pivoting allows moving from a compromised host to others in the internal network. = Il pivoting permette di spostarsi da un host compromesso ad altri nella rete interna.',
              context: 'offensive-security',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    11: {
      name: 'GRC e Professionale / GRC & Professional',
      description: 'Governance, rischio, compliance e carriera in cybersecurity',
      lessons: [
        {
          id: 'grc_frameworks',
          title: 'Framework / Frameworks',
          description: 'NIST, ISO 27001, CIS',
          items: [
            {
              english: 'GRC (Governance, Risk, and Compliance)',
              italian: 'GRC / Governance, Rischio e Compliance',
              pronunciation: '/\u02CCd\u0292i\u02D0 \u02CC\u0251\u02D0r \u02C8si\u02D0/',
              phonetic: 'gii-ar-SII',
              example:
                'GRC tools help organizations manage their security posture. = Gli strumenti GRC aiutano le organizzazioni a gestire la loro postura di sicurezza.',
              context: 'governance',
              difficulty: 'intermediate',
            },
            {
              english: 'NIST Cybersecurity Framework (CSF)',
              italian: 'Framework NIST',
              pronunciation: '/n\u026Ast/',
              phonetic: 'NIST',
              example:
                'The NIST CSF provides a structured approach to cybersecurity. = Il framework NIST fornisce un approccio strutturato alla cybersecurity.',
              context: 'standards',
              difficulty: 'intermediate',
              note: 'Include 5 funzioni core: Identify, Protect, Detect, Respond, Recover (pi\u00F9 la sesta aggiunta nel 2.0: Govern).',
            },
            {
              english: 'ISO/IEC 27001',
              italian: 'ISO 27001 / Standard Gestione Sicurezza',
              pronunciation: '/\u02CCa\u026A \u02CCes \u02C8o\u028A/',
              phonetic: 'AI-es-ou',
              example:
                "ISO 27001 is an international standard for information security management. = L'ISO 27001 \u00E8 uno standard internazionale per la gestione della sicurezza delle informazioni.",
              context: 'standards',
              difficulty: 'advanced',
              note: "Lo standard pi\u00F9 importante per l'ISMS (Information Security Management System).",
            },
            {
              english: 'CIS Controls',
              italian: 'Controlli CIS',
              pronunciation: '/\u02CCsi\u02D0 a\u026A \u02C8es k\u0259n\u02C8tro\u028Alz/',
              phonetic: 'sii-ai-es CON-trouls',
              example:
                'Implementing the first 18 CIS controls significantly reduces risk. = Implementare i primi 18 controlli CIS riduce significativamente il rischio.',
              context: 'standards',
              difficulty: 'intermediate',
            },
            {
              english: 'COBIT',
              italian: 'COBIT / Governance IT',
              pronunciation: '/\u02C8ko\u028Ab\u026At/',
              phonetic: 'CO-bit',
              example:
                'COBIT bridges the gap between business goals and IT security. = Il COBIT colma il divario tra obiettivi aziendali e sicurezza IT.',
              context: 'governance',
              difficulty: 'advanced',
            },
            {
              english: 'SOC 2',
              italian: 'SOC 2 / Report di Audit',
              pronunciation: '/s\u0252k t\u028Au/',
              phonetic: 'SOK-tu',
              example:
                'Cloud service providers often undergo SOC 2 audits. = I provider cloud si sottopongono spesso ad audit SOC 2.',
              context: 'compliance',
              difficulty: 'intermediate',
            },
            {
              english: 'HIPAA',
              italian: 'HIPAA / Standard Sanitario USA',
              pronunciation: '/\u02C8h\u026Ap\u0259/',
              phonetic: 'HIP-pa',
              example:
                "HIPAA protects sensitive patient health information. = L'HIPAA protegge le informazioni sanitarie sensibili dei pazienti.",
              context: 'regulations',
              difficulty: 'beginner',
            },
            {
              english: 'GDPR (General Data Protection Regulation)',
              italian: 'GDPR / Regolamento Privacy UE',
              pronunciation: '/\u02CCd\u0292i\u02D0 di\u02D0 pi\u02D0 \u02CC\u0251\u02D0r/',
              phonetic: 'gii-dii-pii-AR',
              example:
                'GDPR compliance is mandatory for all companies handling EU citizen data. = La compliance GDPR \u00E8 obbligatoria per chiunque gestisca dati di cittadini UE.',
              context: 'regulations',
              difficulty: 'beginner',
            },
            {
              english: 'PCI DSS',
              italian: 'PCI DSS / Sicurezza Carte Pagamento',
              pronunciation: '/\u02CCpi\u02D0 si\u02D0 \u02C8a\u026A \u02CCdi\u02D0 es \u02CCes/',
              phonetic: 'pii-sii-ai-dii-es-ES',
              example:
                'Retailers must comply with PCI DSS to handle credit cards. = I commercianti devono rispettare il PCI DSS per gestire le carte di credito.',
              context: 'standards',
              difficulty: 'intermediate',
            },
            {
              english: 'Cybersecurity Maturity Model',
              italian: 'Modello di Maturit\u00E0 Cybersecurity',
              pronunciation:
                '/\u02C8sa\u026Ab\u0259rs\u026Akj\u028A\u0259r\u0259ti m\u0259\u02C8t\u0283\u028A\u0259r\u0259ti \u02C8m\u0252dl/',
              phonetic: 'sai-ber-si-KIUR-iti ma-CIU-riti MO-del',
              example:
                'A maturity model helps track security progress over time. = Un modello di maturit\u00E0 aiuta a tracciare i progressi di sicurezza nel tempo.',
              context: 'governance',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'grc_compliance',
          title: 'Compliance',
          description: 'PCI DSS, GDPR, HIPAA',
          items: [
            {
              english: 'Compliance Audit',
              italian: 'Audit di Conformit\u00E0',
              pronunciation: '/k\u0259m\u02C8pla\u026A\u0259ns \u02C8\u0254\u02D0d\u026At/',
              phonetic: 'com-PLAI-ens O-dit',
              example:
                "A compliance audit ensures the organization follows regulations. = Un audit di conformit\u00E0 garantisce che l'organizzazione segua le regole.",
              context: 'compliance',
              difficulty: 'intermediate',
            },
            {
              english: 'Regulatory Requirement',
              italian: 'Requisito Normativo',
              pronunciation:
                '/\u02C8re\u0261j\u028Al\u0259t\u0254\u02D0ri r\u026A\u02C8kwa\u026Arm\u0259nt/',
              phonetic: 'RE-ghiu-la-tori re-KUAIER-ment',
              example:
                'Data encryption is a regulatory requirement for many industries. = La cifratura dati \u00E8 un requisito normativo in molti settori.',
              context: 'compliance',
              difficulty: 'beginner',
            },
            {
              english: 'PII (Personally Identifiable Information)',
              italian: 'Informazioni di Identificazione Personale',
              pronunciation: '/\u02CCpi\u02D0 a\u026A \u02C8a\u026A/',
              phonetic: 'pii-ai-AI',
              example:
                'Protect PII such as names and social security numbers. = Proteggi le PII come nomi e codici fiscali.',
              context: 'data-privacy',
              difficulty: 'beginner',
            },
            {
              english: 'PHI (Protected Health Information)',
              italian: 'Informazioni Sanitarie Protette',
              pronunciation: '/\u02CCpi\u02D0 e\u026At\u0283 \u02C8a\u026A/',
              phonetic: 'pii-eic-AI',
              example:
                'PHI must be handled according to HIPAA standards. = Le PHI devono essere gestite secondo gli standard HIPAA.',
              context: 'data-privacy',
              difficulty: 'intermediate',
            },
            {
              english: 'Data Controller',
              italian: 'Titolare del Trattamento',
              pronunciation: '/\u02C8de\u026At\u0259 k\u0259n\u02C8tro\u028Al\u0259r/',
              phonetic: 'DEITA con-TROUL-ler',
              example:
                "The data controller determines the purpose of data processing. = Il titolare del trattamento decide lo scopo dell'elaborazione dei dati.",
              context: 'gdpr',
              difficulty: 'intermediate',
            },
            {
              english: 'Data Processor',
              italian: 'Responsabile del Trattamento',
              pronunciation: '/\u02C8de\u026At\u0259 \u02C8pro\u028Ases\u0259r/',
              phonetic: 'DEITA PRO-ces-ser',
              example:
                'A cloud provider often acts as a data processor. = Un provider cloud spesso funge da responsabile del trattamento.',
              context: 'gdpr',
              difficulty: 'intermediate',
            },
            {
              english: 'DPO (Data Protection Officer)',
              italian: 'Responsabile Protezione Dati (DPO)',
              pronunciation: '/\u02CCdi\u02D0 pi\u02D0 \u02C8o\u028A/',
              phonetic: 'dii-pii-OU',
              example:
                "The DPO ensures the company complies with privacy laws. = Il DPO garantisce che l'azienda rispetti le leggi sulla privacy.",
              context: 'gdpr',
              difficulty: 'intermediate',
            },
            {
              english: 'Breach Notification',
              italian: 'Notifica di Violazione',
              pronunciation:
                '/bri\u02D0t\u0283 \u02CCno\u028At\u026Af\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'BRIICC no-ti-fi-KEI-scion',
              example:
                'GDPR requires breach notification within 72 hours. = Il GDPR richiede la notifica della violazione entro 72 ore.',
              context: 'compliance',
              difficulty: 'intermediate',
            },
            {
              english: 'Data Sovereignty',
              italian: 'Sovranit\u00E0 dei Dati',
              pronunciation: '/\u02C8de\u026At\u0259 \u02C8s\u0252vr\u026Anti/',
              phonetic: 'DEITA SO-vren-ti',
              example:
                "Data sovereignty requires data to remain within a country's borders. = La sovranit\u00E0 dei dati richiede che rimangano entro i confini nazionali.",
              context: 'compliance',
              difficulty: 'advanced',
            },
            {
              english: 'Acceptable Use Policy (AUP)',
              italian: 'Politica di Uso Accettabile',
              pronunciation: '/\u0259k\u02C8sept\u0259bl ju\u02D0s \u02C8p\u0252l\u0259si/',
              phonetic: 'ac-CEP-tabol iuus PO-li-si',
              example:
                "Employees must sign the AUP before using company computers. = I dipendenti devono firmare l'AUP prima di usare i PC aziendali.",
              context: 'governance',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'grc_risk',
          title: 'Gestione Rischio / Risk Management',
          description: 'Risk assessment, BIA, BCP',
          items: [
            {
              english: 'Risk Assessment',
              italian: 'Valutazione del Rischio',
              pronunciation: '/r\u026Ask \u0259\u02C8sesm\u0259nt/',
              phonetic: 'RISK a-SES-ment',
              example:
                'A risk assessment identifies potential security threats. = Una valutazione del rischio identifica potenziali minacce di sicurezza.',
              context: 'risk-management',
              difficulty: 'intermediate',
            },
            {
              english: 'Risk Mitigation',
              italian: 'Mitigazione del Rischio',
              pronunciation: '/r\u026Ask \u02CCm\u026At\u026A\u02C8\u0261e\u026A\u0283\u0259n/',
              phonetic: 'RISK mi-ti-GHEI-scion',
              example:
                'Firewalls are used for risk mitigation. = I firewall sono usati per la mitigazione del rischio.',
              context: 'risk-management',
              difficulty: 'intermediate',
              note: "Implementare controlli per ridurre la probabilit\u00E0 o l'impatto di un rischio.",
            },
            {
              english: 'Risk Transfer',
              italian: 'Trasferimento del Rischio',
              pronunciation: '/r\u026Ask \u02C8tr\u00E6nsf\u025C\u02D0r/',
              phonetic: 'RISK TRANS-fer',
              example:
                "Cyber insurance is a form of risk transfer. = L'assicurazione cyber \u00E8 una forma di trasferimento del rischio.",
              context: 'risk-management',
              difficulty: 'intermediate',
            },
            {
              english: 'Risk Acceptance',
              italian: 'Accettazione del Rischio',
              pronunciation: '/r\u026Ask \u0259k\u02C8sept\u0259ns/',
              phonetic: 'RISK ac-CEP-tans',
              example:
                "Management may decide on risk acceptance for low-impact issues. = Il management pu\u00F2 decidere per l'accettazione del rischio per problemi a basso impatto.",
              context: 'risk-management',
              difficulty: 'intermediate',
            },
            {
              english: 'Risk Avoidance',
              italian: 'Evitamento del Rischio',
              pronunciation: '/r\u026Ask \u0259\u02C8v\u0254\u026Ad\u0259ns/',
              phonetic: 'RISK a-VOI-dans',
              example:
                "Risk avoidance means stopping the activity that causes the risk. = L'evitamento del rischio significa interrompere l'attivit\u00E0 che lo causa.",
              context: 'risk-management',
              difficulty: 'intermediate',
            },
            {
              english: 'Asset Valuation',
              italian: 'Valutazione degli Asset',
              pronunciation: '/\u02C8\u00E6set \u02CCv\u00E6lju\u02C8e\u026A\u0283\u0259n/',
              phonetic: 'AS-set va-liu-EI-scion',
              example:
                'Asset valuation determines how much to spend on protection. = La valutazione degli asset determina quanto spendere per la protezione.',
              context: 'risk-management',
              difficulty: 'advanced',
            },
            {
              english: 'BIA (Business Impact Analysis)',
              italian: "Analisi dell'Impatto sul Business",
              pronunciation: '/\u02CCbi\u02D0 a\u026A \u02C8e\u026A/',
              phonetic: 'bii-ai-EI',
              example:
                'The BIA identifies critical business processes. = La BIA identifica i processi aziendali critici.',
              context: 'incident-response',
              difficulty: 'advanced',
            },
            {
              english: 'Quantitative Risk Analysis',
              italian: 'Analisi Quantitativa del Rischio',
              pronunciation:
                '/\u02C8kw\u0252nt\u026At\u0259t\u026Av r\u026Ask \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'KUON-ti-tativ RISK a-NA-li-sis',
              example:
                "Quantitative risk analysis uses numerical data and money values. = L'analisi quantitativa usa dati numerici e valori monetari.",
              context: 'risk-management',
              difficulty: 'advanced',
            },
            {
              english: 'Qualitative Risk Analysis',
              italian: 'Analisi Qualitativa del Rischio',
              pronunciation:
                '/\u02C8kw\u0252l\u026At\u0259t\u026Av r\u026Ask \u0259\u02C8n\u00E6l\u0259s\u026As/',
              phonetic: 'KUA-li-tativ RISK a-NA-li-sis',
              example:
                'Qualitative risk analysis uses scales like "Low", "Medium", "High". = L\'analisi qualitativa usa scale come "Basso", "Medio", "Alto".',
              context: 'risk-management',
              difficulty: 'beginner',
            },
            {
              english: 'Threat Assessment',
              italian: 'Valutazione delle Minacce',
              pronunciation: '/\u03B8ret \u0259\u02C8sesm\u0259nt/',
              phonetic: 'THRET a-SES-ment',
              example:
                'Threat assessment identifies potential adversaries. = La valutazione delle minacce identifica i potenziali avversari.',
              context: 'risk-management',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'grc_career',
          title: 'Carriera / Career',
          description: 'Ruoli, certificazioni, comunicazione',
          items: [
            {
              english: 'CISO (Chief Information Security Officer)',
              italian: 'Responsabile Sicurezza Informazioni',
              pronunciation: '/\u02C8si\u02D0so\u028A/',
              phonetic: 'SII-sou',
              example:
                'The CISO reports directly to the CEO. = Il CISO riferisce direttamente al CEO.',
              context: 'roles',
              difficulty: 'beginner',
            },
            {
              english: 'Security Analyst',
              italian: 'Analista della Sicurezza',
              pronunciation: '/s\u026A\u02C8kj\u028A\u0259r\u0259ti \u02C8\u00E6n\u0259l\u026Ast/',
              phonetic: 'si-KIUR-iti AN-alist',
              example:
                'A security analyst monitors for suspicious activity. = Un analista della sicurezza monitora attivit\u00E0 sospette.',
              context: 'roles',
              difficulty: 'beginner',
            },
            {
              english: 'Penetration Tester',
              italian: 'Penetration Tester / Hacker Etico',
              pronunciation: '/\u02CCpen\u026A\u02C8tre\u026A\u0283\u0259n \u02C8test\u0259r/',
              phonetic: 'PE-ne-treiscion TES-ter',
              example:
                'A penetration tester finds vulnerabilities before hackers do. = Un penetration tester trova vulnerabilit\u00E0 prima degli hacker.',
              context: 'roles',
              difficulty: 'intermediate',
            },
            {
              english: 'Security Architect',
              italian: 'Architetto della Sicurezza',
              pronunciation:
                '/s\u026A\u02C8kj\u028A\u0259r\u0259ti \u02C8\u0251\u02D0rk\u026Atekt/',
              phonetic: 'si-KIUR-iti AR-ki-tekt',
              example:
                "The security architect designs secure networks. = L'architetto della sicurezza progetta reti sicure.",
              context: 'roles',
              difficulty: 'intermediate',
            },
            {
              english: 'Incident Responder',
              italian: 'Addetto Risposta Incidenti',
              pronunciation: '/\u02C8\u026Ans\u026Ad\u0259nt r\u026A\u02C8sp\u0252nd\u0259r/',
              phonetic: 'IN-si-dent re-SPON-der',
              example:
                'Incident responders handle the immediate aftermath of an attack. = Gli addetti alla risposta incidenti gestiscono le conseguenze immediate di un attacco.',
              context: 'roles',
              difficulty: 'intermediate',
            },
            {
              english: 'Certification',
              italian: 'Certificazione',
              pronunciation: '/\u02CCs\u025C\u02D0rt\u026Af\u026A\u02C8ke\u026A\u0283\u0259n/',
              phonetic: 'ser-ti-fi-KEI-scion',
              example:
                'The CISSP is a gold standard certification. = Il CISSP \u00E8 una certificazione standard di riferimento.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Soft Skills',
              italian: 'Competenze Trasversali',
              pronunciation: '/s\u0252ft sk\u026Alz/',
              phonetic: 'SOFT SKILS',
              example:
                'Communication is a vital soft skill for security professionals. = La comunicazione \u00E8 una competenza trasversale vitale per i professionisti della sicurezza.',
              context: 'career',
              difficulty: 'beginner',
            },
            {
              english: 'Security Awareness Training',
              italian: 'Formazione Consapevolezza Sicurezza',
              pronunciation:
                '/s\u026A\u02C8kj\u028A\u0259r\u0259ti \u0259\u02C8we\u0259rn\u0259s \u02C8tre\u026An\u026A\u014B/',
              phonetic: 'si-KIUR-iti a-UER-nes TREI-ning',
              example:
                'Security awareness training reduces the risk of phishing. = La formazione riduce il rischio di phishing.',
              context: 'training',
              difficulty: 'beginner',
            },
            {
              english: 'Professional Ethics',
              italian: 'Etica Professionale',
              pronunciation: '/pr\u0259\u02C8fe\u0283\u0259nl \u02C8e\u03B8\u026Aks/',
              phonetic: 'pro-FE-scional E-thiks',
              example:
                "Following professional ethics is mandatory for ethical hackers. = Seguire l'etica professionale \u00E8 obbligatorio per gli ethical hacker.",
              context: 'career',
              difficulty: 'intermediate',
            },
            {
              english: 'Continuous Learning (CPE)',
              italian: 'Apprendimento Continuo',
              pronunciation: '/k\u0259n\u02C8t\u026Anju\u0259s \u02C8l\u025C\u02D0rn\u026A\u014B/',
              phonetic: 'con-TI-niuos LER-ning',
              example:
                'CPE credits are required to maintain your certification. = I crediti CPE sono richiesti per mantenere la certificazione.',
              context: 'career',
              difficulty: 'intermediate',
              note: 'Continuing Professional Education.',
            },
          ],
        },
      ],
    },
  },
};
