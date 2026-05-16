/**
 * NETWORKING FUNDAMENTALS TOPIC DATA - FlowLearn
 * ===============================================
 *
 * 24 levels of English networking terminology.
 * Each level has 4 lessons with 10 items each (40 per level).
 * Progression: Foundations → Professional Networking
 */

export default {
  id: 'networking',
  levels: {
    // ════════════════════════════════════════════════
    // LEVEL 0 - FONDAMENTI / FOUNDATIONS
    // ════════════════════════════════════════════════
    0: {
      name: 'Fondamenti / Foundations',
      description: 'Le basi delle reti informatiche',
      lessons: [
        {
          id: 'net_foundations_1',
          title: 'Network Basics / Basi delle Reti',
          description: 'Concetti fondamentali di una rete',
          items: [
            {
              english: 'Network',
              italian: 'Rete',
              pronunciation: '/ˈnetwɜːrk/',
              phonetic: 'NET-uerk',
              example:
                "The office network went down during a firmware update on the core switch. = La rete dell'ufficio è caduta durante un aggiornamento firmware sullo switch principale.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'In italiano si dice "rete" sia per Internet che per la rete locale.',
            },
            {
              english: 'Node',
              italian: 'Nodo',
              pronunciation: '/noʊd/',
              phonetic: 'NOUD',
              example:
                'Every printer, laptop, and server counts as a separate node on the corporate LAN. = Ogni stampante, portatile e server conta come un nodo separato sulla LAN aziendale.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Host',
              italian: 'macchina di rete (host)',
              pronunciation: '/hoʊst/',
              phonetic: 'HOUST',
              example:
                'When troubleshooting, ping each host on the subnet to find which machine is unreachable. = Durante il troubleshooting, esegui il ping di ogni host nella sottorete per trovare quale macchina non è raggiungibile.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'In italiano si usa il termine inglese "host" senza tradurlo.',
            },
            {
              english: 'Client',
              italian: 'programma richiedente (client)',
              pronunciation: '/ˈklaɪənt/',
              phonetic: 'KLAI-ent',
              example:
                'Your web browser acts as a client when it sends an HTTP request to fetch a page. = Il tuo browser web funge da client quando invia una richiesta HTTP per recuperare una pagina.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Server',
              italian: 'programma fornitore (server)',
              pronunciation: '/ˈsɜːrvər/',
              phonetic: 'SER-ver',
              example:
                "An Apache instance on port 80 functions as a web server for thousands of concurrent users. = Un'istanza Apache sulla porta 80 funziona come server web per migliaia di utenti simultanei.",
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Peer',
              italian: 'pari (peer)',
              pronunciation: '/pɪər/',
              phonetic: 'PIIR',
              example:
                'In a BitTorrent swarm, each peer both uploads and downloads file chunks simultaneously. = In uno sciame BitTorrent, ogni peer carica e scarica blocchi di file simultaneamente.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Spesso lasciato non tradotto: "rete peer-to-peer" o "rete P2P".',
            },
            {
              english: 'Internet',
              italian: 'rete mondiale (Internet)',
              pronunciation: '/ˈɪntərnet/',
              phonetic: 'IN-ter-net',
              example:
                "Submarine fiber cables carry the bulk of Internet traffic between continents across the ocean floor. = I cavi in fibra sottomarini trasportano la maggior parte del traffico Internet tra i continenti sul fondo dell'oceano.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Internet si scrive con la I maiuscola perché si riferisce alla rete globale unica.',
            },
            {
              english: 'Intranet',
              italian: 'rete privata aziendale (intranet)',
              pronunciation: '/ˈɪntrənet/',
              phonetic: 'IN-tra-net',
              example:
                "Employees access the HR portal through the company intranet without exposing it to the public web. = I dipendenti accedono al portale HR attraverso l'intranet aziendale senza esporlo al web pubblico.",
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Packet',
              italian: 'Pacchetto',
              pronunciation: '/ˈpækɪt/',
              phonetic: 'PAK-ket',
              example:
                'A single YouTube stream is broken into thousands of packets that are reassembled by the receiver. = Un singolo stream YouTube viene suddiviso in migliaia di pacchetti che vengono riassemblati dal ricevitore.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Il "pacchetto" è l\'unità base di dati che viaggia in rete.',
            },
            {
              english: 'Protocol',
              italian: 'Protocollo',
              pronunciation: '/ˈproʊtəkɒl/',
              phonetic: 'PRO-to-kol',
              example:
                'Without an agreed protocol like TCP, two machines would have no common rules for data exchange. = Senza un protocollo concordato come TCP, due macchine non avrebbero regole comuni per lo scambio di dati.',
              context: 'foundations',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'net_foundations_2',
          title: 'Network Types / Tipi di Reti',
          description: 'LAN, WAN, MAN e altri tipi di reti',
          items: [
            {
              english: 'LAN',
              italian: 'Rete locale (LAN)',
              pronunciation: '/læn/',
              phonetic: 'LAN',
              example:
                'All workstations on the third floor share a single LAN connected through a 48-port switch. = Tutte le postazioni al terzo piano condividono una singola LAN connessa tramite uno switch a 48 porte.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Local Area Network. Tipicamente casa, ufficio o edificio.',
            },
            {
              english: 'WAN',
              italian: 'Rete geografica (WAN)',
              pronunciation: '/wæn/',
              phonetic: 'UAN',
              example:
                "The company links its Milan and Rome offices over a dedicated WAN circuit leased from the ISP. = L'azienda collega le sedi di Milano e Roma tramite un circuito WAN dedicato affittato dall'ISP.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Wide Area Network. Internet è la WAN più grande del mondo.',
            },
            {
              english: 'MAN',
              italian: 'Rete metropolitana (MAN)',
              pronunciation: '/mæn/',
              phonetic: 'MAN',
              example:
                'The city deployed a fiber-ring MAN to connect libraries, schools, and municipal buildings. = Il comune ha realizzato una MAN ad anello in fibra per collegare biblioteche, scuole e edifici municipali.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Metropolitan Area Network.',
            },
            {
              english: 'PAN',
              italian: 'Rete personale (PAN)',
              pronunciation: '/pæn/',
              phonetic: 'PAN',
              example:
                'Your smartphone, smartwatch, and earbuds form a PAN via Bluetooth within a few meters. = Il tuo smartphone, smartwatch e auricolari formano una PAN via Bluetooth entro pochi metri.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Personal Area Network. Esempio: Bluetooth.',
            },
            {
              english: 'WLAN',
              italian: 'Rete locale wireless (WLAN)',
              pronunciation: '/ˌdʌbljuː læn/',
              phonetic: 'DABOL-iu LAN',
              example:
                "The hotel deploys a WLAN across all floors so guests can connect without Ethernet cables. = L'hotel installa una WLAN su tutti i piani cosicché gli ospiti possano connettersi senza cavi Ethernet.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Wireless Local Area Network.',
            },
            {
              english: 'VPN',
              italian: 'Rete privata virtuale (VPN)',
              pronunciation: '/ˌviː piː ˈen/',
              phonetic: 'VI-PI-EN',
              example:
                'Remote workers connect through a VPN tunnel that encrypts all traffic over the public Internet. = I lavoratori remoti si connettono attraverso un tunnel VPN che cifra tutto il traffico sulla rete Internet pubblica.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Virtual Private Network.',
            },
            {
              english: 'SAN',
              italian: 'Rete di archiviazione (SAN)',
              pronunciation: '/sæn/',
              phonetic: 'SAN',
              example:
                'The data center uses a dedicated SAN so database servers access shared storage over Fibre Channel. = Il data center usa una SAN dedicata affinché i server database accedano allo storage condiviso tramite Fibre Channel.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Storage Area Network. Usata nei data center.',
            },
            {
              english: 'Backbone',
              italian: 'Dorsale',
              pronunciation: '/ˈbækboʊn/',
              phonetic: 'BAK-boun',
              example:
                'Tier-1 ISPs maintain the Internet backbone that interconnects regional networks worldwide. = Gli ISP Tier-1 gestiscono la dorsale Internet che interconnette le reti regionali a livello mondiale.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Subnet',
              italian: 'Sottorete',
              pronunciation: '/ˈsʌbnet/',
              phonetic: 'SAB-net',
              example:
                'Splitting 10.0.0.0/16 into /24 subnets gives each department its own broadcast domain. = Suddividere 10.0.0.0/16 in sottoreti /24 dà a ogni reparto il proprio dominio di broadcast.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Segment',
              italian: 'Segmento',
              pronunciation: '/ˈseɡmənt/',
              phonetic: 'SEG-ment',
              example:
                'Large files sent over TCP are divided into segments of MSS size, each with its own sequence number. = I file grandi inviati via TCP sono divisi in segmenti di dimensione MSS, ciascuno con il proprio numero di sequenza.',
              context: 'foundations',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'net_foundations_3',
          title: 'Topology & Performance / Topologia e Prestazioni',
          description: 'Come si dispongono e misurano le reti',
          items: [
            {
              english: 'Topology',
              italian: 'Topologia',
              pronunciation: '/təˈpɒlədʒi/',
              phonetic: 'to-PO-lo-gi',
              example:
                "Before adding switches, the engineer mapped the existing network topology to avoid loops. = Prima di aggiungere switch, l'ingegnere ha mappato la topologia di rete esistente per evitare loop.",
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Star Topology',
              italian: 'Topologia a stella',
              pronunciation: '/stɑːr təˈpɒlədʒi/',
              phonetic: 'STAR to-PO-lo-gi',
              example:
                'Most offices use a star topology where every desk port connects back to a central switch. = La maggior parte degli uffici usa una topologia a stella dove ogni presa si collega a uno switch centrale.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Mesh Topology',
              italian: 'Topologia a maglia',
              pronunciation: '/meʃ təˈpɒlədʒi/',
              phonetic: 'MESH to-PO-lo-gi',
              example:
                'Data centers adopt a partial mesh topology so critical switches have redundant paths. = I data center adottano una topologia a maglia parziale affinché gli switch critici abbiano percorsi ridondanti.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Molto resiliente ma costosa: serve N(N-1)/2 link.',
            },
            {
              english: 'Bus Topology',
              italian: 'Topologia a bus',
              pronunciation: '/bʌs təˈpɒlədʒi/',
              phonetic: 'BAS to-PO-lo-gi',
              example:
                'Early 10BASE2 Ethernet used a bus topology where one coaxial cable daisy-chained every workstation. = Le prime reti 10BASE2 usavano una topologia a bus dove un cavo coassiale collegava a catena ogni postazione.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Antiquata: usata nelle vecchie reti Ethernet 10BASE2.',
            },
            {
              english: 'Ring Topology',
              italian: 'Topologia ad anello',
              pronunciation: '/rɪŋ təˈpɒlədʒi/',
              phonetic: 'RING to-PO-lo-gi',
              example:
                'IBM Token Ring passed a token around a ring topology, and only the holder could transmit. = IBM Token Ring passava un token lungo una topologia ad anello, e solo chi lo possedeva poteva trasmettere.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Bandwidth',
              italian: 'Larghezza di banda',
              pronunciation: '/ˈbændwɪdθ/',
              phonetic: 'BAND-uidth',
              example:
                "Upgrading the uplink to 10 Gbps doubled the available bandwidth for the entire floor. = Aggiornare l'uplink a 10 Gbps ha raddoppiato la larghezza di banda disponibile per l'intero piano.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Misurata in bit/s, Mbps, Gbps.',
            },
            {
              english: 'Latency',
              italian: 'Latenza',
              pronunciation: '/ˈleɪtənsi/',
              phonetic: 'LEI-ten-si',
              example:
                'A transatlantic ping shows roughly 80 ms of latency due to the distance light travels in fiber. = Un ping transatlantico mostra circa 80 ms di latenza a causa della distanza che la luce percorre nella fibra.',
              context: 'foundations',
              difficulty: 'beginner',
              command: 'ping 8.8.8.8',
              note: 'Tempo che impiega un pacchetto a viaggiare. Misurata in ms.',
            },
            {
              english: 'Throughput',
              italian: 'volume di trasmissione effettivo (throughput)',
              pronunciation: '/ˈθruːpʊt/',
              phonetic: 'TRU-put',
              example:
                'Even on a 1 Gbps link, actual throughput may drop to 600 Mbps due to overhead and congestion. = Anche su un collegamento a 1 Gbps, il throughput effettivo può scendere a 600 Mbps a causa di overhead e congestione.',
              context: 'foundations',
              difficulty: 'beginner',
              tool: 'iperf3',
              note: 'Diverso dalla bandwidth: è la quantità reale, non teorica.',
            },
            {
              english: 'Jitter',
              italian: 'variazione di latenza (jitter)',
              pronunciation: '/ˈdʒɪtər/',
              phonetic: 'GI-ter',
              example:
                'VoIP calls sound choppy when jitter exceeds 30 ms because audio packets arrive at irregular intervals. = Le chiamate VoIP risultano frammentate quando il jitter supera 30 ms perché i pacchetti audio arrivano a intervalli irregolari.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Variazione del ritardo tra pacchetti consecutivi.',
            },
            {
              english: 'Packet Loss',
              italian: 'Perdita di pacchetti',
              pronunciation: '/ˈpækɪt lɒs/',
              phonetic: 'PAK-ket LOS',
              example:
                "Even 1% packet loss forces constant TCP retransmissions, cutting effective throughput dramatically. = Anche l'1% di perdita di pacchetti forza continue ritrasmissioni TCP, riducendo drasticamente il throughput effettivo.",
              context: 'foundations',
              difficulty: 'beginner',
              command: 'ping -c 100 example.com',
            },
          ],
        },
        {
          id: 'net_foundations_4',
          title: 'Hardware Basics / Hardware di Base',
          description: 'Dispositivi fondamentali di rete',
          items: [
            {
              english: 'Router',
              italian: 'instradatore (router)',
              pronunciation: '/ˈruːtər/',
              phonetic: 'RU-ter',
              example:
                "The edge router examines each packet's destination IP to decide which next hop to forward it to. = Il router di bordo esamina l'IP di destinazione di ogni pacchetto per decidere a quale prossimo salto inoltrarlo.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'In italiano si usa il termine inglese "router". Pronunciato "RAU-ter" in UK, "RU-ter" in US.',
            },
            {
              english: 'Switch',
              italian: 'commutatore (switch)',
              pronunciation: '/swɪtʃ/',
              phonetic: 'SUITCH',
              example:
                'Unlike a hub, a switch learns which MAC sits behind each port and forwards frames only there. = A differenza di un hub, uno switch apprende quale MAC si trova dietro ogni porta e inoltra i frame solo lì.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Lavora a Layer 2. In italiano si usa quasi sempre "switch".',
            },
            {
              english: 'Hub',
              italian: 'concentratore (hub)',
              pronunciation: '/hʌb/',
              phonetic: 'HAB',
              example:
                'Because a hub copies every frame to all ports, plugging a sniffer into any port captured all traffic. = Poiché un hub copia ogni frame su tutte le porte, collegare uno sniffer a qualsiasi porta catturava tutto il traffico.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Tecnologia obsoleta: oggi si usano gli switch.',
            },
            {
              english: 'Modem',
              italian: 'modulatore-demodulatore (modem)',
              pronunciation: '/ˈmoʊdəm/',
              phonetic: 'MO-dem',
              example:
                "The DSL modem converts digital data into analog signals that travel over the telephone line to the ISP. = Il modem DSL converte i dati digitali in segnali analogici che viaggiano sulla linea telefonica verso l'ISP.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Acronimo di MOdulator-DEModulator.',
            },
            {
              english: 'Access Point',
              italian: 'Punto di accesso',
              pronunciation: '/ˈækses pɔɪnt/',
              phonetic: 'AK-ses POINT',
              example:
                'The IT team mounted a new access point in the conference room to eliminate Wi-Fi dead spots. = Il team IT ha installato un nuovo access point nella sala riunioni per eliminare le zone morte del Wi-Fi.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Spesso abbreviato AP.',
            },
            {
              english: 'Network Card',
              italian: 'Scheda di rete',
              pronunciation: '/ˈnetwɜːrk kɑːrd/',
              phonetic: 'NET-uerk KARD',
              example:
                'After replacing the faulty network card, the server reconnected at full gigabit speed. = Dopo aver sostituito la scheda di rete difettosa, il server si è riconnesso a velocità gigabit piena.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Anche detta NIC (Network Interface Card).',
            },
            {
              english: 'NIC',
              italian: 'scheda di interfaccia di rete (NIC)',
              pronunciation: '/nɪk/',
              phonetic: 'NIK',
              example:
                'Modern servers often have dual NIC ports for redundancy so a single cable failure causes no downtime. = I server moderni hanno spesso porte NIC doppie per ridondanza così un singolo guasto al cavo non causa downtime.',
              context: 'foundations',
              difficulty: 'beginner',
              command: 'ip link show',
              note: 'Network Interface Card / Controller.',
            },
            {
              english: 'Cable',
              italian: 'Cavo',
              pronunciation: '/ˈkeɪbl/',
              phonetic: 'KEI-bol',
              example:
                'Cat6 cable supports 10 Gbps over short runs, while Cat5e maxes out at 1 Gbps. = Il cavo Cat6 supporta 10 Gbps su brevi tratte, mentre il Cat5e arriva al massimo a 1 Gbps.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Fiber Optic',
              italian: 'Fibra ottica',
              pronunciation: '/ˈfaɪbər ˈɒptɪk/',
              phonetic: 'FAI-ber OP-tik',
              example:
                'The campus backbone uses single-mode fiber optic to span 2 km between buildings without signal loss. = La dorsale del campus usa fibra ottica monomodale per coprire 2 km tra gli edifici senza perdita di segnale.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'In Italia: "fibra" o "FTTH" (Fiber To The Home).',
            },
            {
              english: 'RJ45',
              italian: 'connettore Ethernet (RJ45)',
              pronunciation: '/ˌɑːr dʒeɪ ˌfɔːrti ˈfaɪv/',
              phonetic: 'AR-GEI for-ti FAIV',
              example:
                'A badly crimped RJ45 connector causes intermittent link drops that are notoriously hard to diagnose. = Un connettore RJ45 crimpato male causa cadute di collegamento intermittenti notoriamente difficili da diagnosticare.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Il connettore standard per Ethernet su rame.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 1 - MODELLO OSI / OSI MODEL
    // ════════════════════════════════════════════════
    1: {
      name: 'Modello OSI / OSI Model',
      description: 'I sette livelli del modello OSI',
      lessons: [
        {
          id: 'net_osi_1',
          title: 'Lower Layers / Livelli Bassi',
          description: 'Layer 1, 2, 3 del modello OSI',
          items: [
            {
              english: 'OSI Model',
              italian: 'Modello OSI',
              pronunciation: '/ˌoʊ es ˈaɪ/',
              phonetic: 'O-ES-AI',
              example:
                'Engineers reference the OSI model to pinpoint whether a connectivity issue lives at Layer 1, 2, or 3. = Gli ingegneri consultano il modello OSI per individuare se un problema di connettività risiede al Livello 1, 2 o 3.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Open Systems Interconnection. Modello concettuale di riferimento.',
            },
            {
              english: 'Physical Layer',
              italian: 'Livello fisico',
              pronunciation: '/ˈfɪzɪkəl ˈleɪər/',
              phonetic: 'FI-zi-kal LEI-er',
              example:
                'A broken patch cable is a physical layer problem that no amount of software configuration can fix. = Un cavo patch rotto è un problema del livello fisico che nessuna configurazione software può risolvere.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Layer 1. Cavi, segnali elettrici, fibra.',
            },
            {
              english: 'Data Link Layer',
              italian: 'Livello di collegamento dati',
              pronunciation: '/ˈdeɪtə lɪŋk/',
              phonetic: 'DEI-ta LINK',
              example:
                'Switches use data link layer MAC addresses to forward frames within a single broadcast domain. = Gli switch usano indirizzi MAC del livello di collegamento dati per inoltrare frame in un singolo dominio di broadcast.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Layer 2. Esempio: Ethernet.',
            },
            {
              english: 'Network Layer',
              italian: 'Livello di rete',
              pronunciation: '/ˈnetwɜːrk ˈleɪər/',
              phonetic: 'NET-uerk LEI-er',
              example:
                "Routers make forwarding decisions at the network layer by inspecting the destination IP in each packet. = I router prendono decisioni di inoltro al livello di rete esaminando l'IP di destinazione in ogni pacchetto.",
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Layer 3. Esempio: IP, ICMP.',
            },
            {
              english: 'Layer 1',
              italian: 'Livello 1',
              pronunciation: '/ˈleɪər wʌn/',
              phonetic: 'LEI-er UAN',
              example:
                'When a link LED stays off, the technician suspects a Layer 1 fault like a severed cable. = Quando il LED del collegamento resta spento, il tecnico sospetta un guasto di Livello 1 come un cavo tranciato.',
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Layer 2',
              italian: 'Livello 2',
              pronunciation: '/ˈleɪər tuː/',
              phonetic: 'LEI-er TU',
              example:
                "MAC flooding attacks target Layer 2 by overwhelming the switch's address table until it fails open. = Gli attacchi MAC flooding prendono di mira il Livello 2 sovraccaricando la tabella indirizzi dello switch.",
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Layer 3',
              italian: 'Livello 3',
              pronunciation: '/ˈleɪər θriː/',
              phonetic: 'LEI-er THRI',
              example:
                'Adding a VLAN requires a Layer 3 device or SVI to route traffic between segments. = Aggiungere una VLAN richiede un dispositivo di Livello 3 o una SVI per instradare il traffico tra i segmenti.',
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Frame',
              italian: 'trama (frame)',
              pronunciation: '/freɪm/',
              phonetic: 'FREIM',
              example:
                'Wireshark captures raw Ethernet frames so you can inspect MAC headers, VLAN tags, and the payload. = Wireshark cattura frame Ethernet grezzi così puoi ispezionare header MAC, tag VLAN e il payload.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'PDU (Protocol Data Unit) del Layer 2.',
            },
            {
              english: 'Bit',
              italian: 'cifra binaria (bit)',
              pronunciation: '/bɪt/',
              phonetic: 'BIT',
              example:
                'At the physical layer, each bit is encoded as a voltage change, light pulse, or radio modulation. = Al livello fisico, ogni bit è codificato come un cambio di tensione, impulso luminoso o modulazione radio.',
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Medium',
              italian: 'Mezzo',
              pronunciation: '/ˈmiːdiəm/',
              phonetic: 'MI-dium',
              example:
                'The choice of transmission medium — copper, fiber, or wireless — depends on distance, cost, and bandwidth. = La scelta del mezzo trasmissivo — rame, fibra o wireless — dipende da distanza, costo e banda.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Plurale: media.',
            },
          ],
        },
        {
          id: 'net_osi_2',
          title: 'Upper Layers / Livelli Alti',
          description: 'Layer 4, 5, 6, 7 del modello OSI',
          items: [
            {
              english: 'Transport Layer',
              italian: 'Livello di trasporto',
              pronunciation: '/ˈtrænspɔːrt ˈleɪər/',
              phonetic: 'TRAN-sport LEI-er',
              example:
                'By assigning unique port numbers, the transport layer multiplexes traffic from many apps onto one IP. = Assegnando numeri di porta univoci, il livello di trasporto multiplexa il traffico di molte app su un IP.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Layer 4. Esempi: TCP, UDP.',
            },
            {
              english: 'Session Layer',
              italian: 'Livello di sessione',
              pronunciation: '/ˈseʃən ˈleɪər/',
              phonetic: 'SES-scion LEI-er',
              example:
                'RPC and NetBIOS rely on session layer functions to maintain dialogues between distributed processes. = RPC e NetBIOS si basano sulle funzioni del livello di sessione per mantenere dialoghi tra processi distribuiti.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Layer 5.',
            },
            {
              english: 'Presentation Layer',
              italian: 'Livello di presentazione',
              pronunciation: '/ˌprezənˈteɪʃən/',
              phonetic: 'pre-zen-TEI-scion',
              example:
                'TLS encryption and JPEG compression are presentation layer functions that transform data before delivery. = La crittografia TLS e la compressione JPEG sono funzioni del livello di presentazione che trasformano i dati.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Layer 6. Cifratura, compressione, formattazione.',
            },
            {
              english: 'Application Layer',
              italian: 'Livello applicativo',
              pronunciation: '/ˌæplɪˈkeɪʃən/',
              phonetic: 'a-pli-KEI-scion',
              example:
                'When you type a URL, your browser uses application layer protocols like HTTP and DNS to fetch the page. = Quando digiti un URL, il browser usa protocolli del livello applicativo come HTTP e DNS per recuperare la pagina.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: "Layer 7. Il più vicino all'utente.",
            },
            {
              english: 'Layer 4',
              italian: 'Livello 4',
              pronunciation: '/ˈleɪər fɔːr/',
              phonetic: 'LEI-er FOR',
              example:
                'Without inspecting HTTP content, a Layer 4 load balancer distributes connections purely by IP and TCP port. = Senza ispezionare il contenuto HTTP, un bilanciatore Layer 4 distribuisce le connessioni puramente per IP e porta TCP.',
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Layer 7',
              italian: 'Livello 7',
              pronunciation: '/ˈleɪər ˈsevən/',
              phonetic: 'LEI-er SE-ven',
              example:
                "By reading the HTTP path inside the payload, a Layer 7 firewall can block specific API endpoints. = Leggendo il percorso HTTP all'interno del payload, un firewall Layer 7 può bloccare endpoint API specifici.",
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'TCP segment',
              italian: 'segmento TCP',
              pronunciation: '/ˈseɡmənt/',
              phonetic: 'SEG-ment',
              example:
                'TCP breaks the application byte stream into segments, each carrying a sequence number for in-order reassembly. = TCP suddivide il flusso di byte applicativo in segmenti TCP, ognuno con un numero di sequenza per il riassemblaggio in ordine.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: `Il segmento e' la PDU del livello 4 (transport) nel modello OSI.`,
            },
            {
              english: 'Datagram',
              italian: 'Datagramma',
              pronunciation: '/ˈdeɪtəɡræm/',
              phonetic: 'DEI-ta-gram',
              example:
                'DNS queries are typically sent as UDP datagrams because the exchange fits in a single packet. = Le query DNS vengono tipicamente inviate come datagrammi UDP perché lo scambio sta in un singolo pacchetto.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'PDU di UDP a Layer 4.',
            },
            {
              english: 'Message',
              italian: 'Messaggio',
              pronunciation: '/ˈmesɪdʒ/',
              phonetic: 'MES-sich',
              example:
                'An HTTP request message includes a method, URL, headers, and optionally a JSON body. = Un messaggio di richiesta HTTP include un metodo, URL, header e opzionalmente un corpo JSON.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'PDU tipica del Layer 7.',
            },
            {
              english: 'Stack',
              italian: 'pila protocollare (stack)',
              pronunciation: '/stæk/',
              phonetic: 'STAK',
              example:
                'The TCP/IP stack on Linux lives in the kernel, handling everything from framing to socket delivery. = Lo stack TCP/IP su Linux risiede nel kernel, gestendo tutto dal framing alla consegna ai socket.',
              context: 'osi-model',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'net_osi_3',
          title: 'Encapsulation / Incapsulamento',
          description: 'Come i dati attraversano i livelli',
          items: [
            {
              english: 'Encapsulation',
              italian: 'Incapsulamento',
              pronunciation: '/ɪnˌkæpsjʊˈleɪʃən/',
              phonetic: 'in-kap-su-LEI-scion',
              example:
                'As data moves down the stack, each layer adds its own header through encapsulation. = Mentre i dati scendono nello stack, ogni livello aggiunge il proprio header tramite incapsulamento.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Ogni livello aggiunge il proprio header.',
            },
            {
              english: 'Decapsulation',
              italian: 'Decapsulamento',
              pronunciation: '/diːˌkæpsjʊˈleɪʃən/',
              phonetic: 'di-kap-su-LEI-scion',
              example:
                'The receiver strips headers layer by layer through decapsulation until the application data is recovered. = Il ricevitore rimuove gli header livello per livello tramite decapsulamento fino a recuperare i dati applicativi.',
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Header',
              italian: 'Intestazione',
              pronunciation: '/ˈhedər/',
              phonetic: 'HED-er',
              example:
                "The IP header contains TTL, source, and destination address fields that routers use for forwarding. = L'intestazione IP contiene i campi TTL, indirizzo sorgente e destinazione che i router usano per l'inoltro.",
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Payload',
              italian: 'carico utile (payload)',
              pronunciation: '/ˈpeɪloʊd/',
              phonetic: 'PEI-loud',
              example:
                "Deep packet inspection examines the payload inside each packet to detect malware signatures. = L'ispezione approfondita esamina il payload all'interno di ogni pacchetto per rilevare firme malware.",
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'PDU',
              italian: 'Unità dati di protocollo (PDU)',
              pronunciation: '/ˌpiː diː ˈjuː/',
              phonetic: 'PI-DI-IU',
              example:
                'Each OSI layer has its own PDU name: bits, frames, packets, and segments from Layer 1 to 4. = Ogni livello OSI ha il proprio nome di PDU: bit, frame, pacchetti e segmenti dal Livello 1 al 4.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Protocol Data Unit.',
            },
            {
              english: 'Trailer',
              italian: 'coda del frame (trailer)',
              pronunciation: '/ˈtreɪlər/',
              phonetic: 'TREI-ler',
              example:
                'The Ethernet trailer contains a CRC checksum to verify the frame was not corrupted in transit. = Il trailer Ethernet contiene un checksum CRC per verificare che il frame non sia stato corrotto in transito.',
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Frame Check Sequence',
              italian: 'Sequenza di controllo frame',
              pronunciation: '/freɪm tʃek ˈsiːkwəns/',
              phonetic: 'FREIM CEK SI-kuens',
              example:
                'If the computed CRC does not match the frame check sequence, the switch silently drops the frame. = Se il CRC calcolato non corrisponde alla sequenza di controllo del frame, lo switch scarta silenziosamente il frame.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'FCS = CRC32 calcolato sul frame.',
            },
            {
              english: 'Demultiplexing',
              italian: 'Demultiplazione',
              pronunciation: '/ˌdiːˈmʌltɪpleksɪŋ/',
              phonetic: 'di-MAL-ti-plek-sing',
              example:
                "The OS performs demultiplexing by reading the destination port to route each segment to the right app. = Il sistema operativo esegue la demultiplazione leggendo la porta destinazione per instradare ogni segmento all'app giusta.",
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'MTU',
              italian: 'unità di trasmissione massima (MTU)',
              pronunciation: '/ˌem tiː ˈjuː/',
              phonetic: 'EM-TI-IU',
              example:
                'Setting an MTU of 1500 bytes means any IP packet larger than that must be fragmented or dropped. = Impostare una MTU di 1500 byte significa che qualsiasi pacchetto IP più grande deve essere frammentato o scartato.',
              context: 'osi-model',
              difficulty: 'beginner',
              command: 'ip link show eth0',
              note: 'Maximum Transmission Unit.',
            },
            {
              english: 'Fragmentation',
              italian: 'Frammentazione',
              pronunciation: '/ˌfræɡmenˈteɪʃən/',
              phonetic: 'frag-men-TEI-scion',
              example:
                'Sending a 4000-byte packet over a 1500-byte MTU link triggers IP fragmentation into three pieces. = Inviare un pacchetto di 4000 byte su un collegamento con MTU di 1500 byte attiva la frammentazione IP in tre pezzi.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'In IPv6 la frammentazione la fa solo il mittente.',
            },
          ],
        },
        {
          id: 'net_osi_4',
          title: 'OSI vs TCP/IP / OSI vs TCP/IP',
          description: 'Confronto tra modelli teorici e pratici',
          items: [
            {
              english: 'TCP/IP Model',
              italian: 'modello TCP/IP',
              pronunciation: '/ˌtiː siː piː aɪ ˈpiː/',
              phonetic: 'TI-SI-PI AI-PI',
              example:
                'Unlike the seven-layer OSI model, the TCP/IP model uses only four layers and maps directly to real protocols. = A differenza del modello OSI a sette livelli, il modello TCP/IP usa solo quattro livelli e mappa su protocolli reali.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: "Più pratico dell'OSI: è quello realmente usato in Internet.",
            },
            {
              english: 'Link Layer',
              italian: 'Livello di collegamento',
              pronunciation: '/lɪŋk ˈleɪər/',
              phonetic: 'LINK LEI-er',
              example:
                'Unlike the OSI model, the TCP/IP link layer combines Layers 1 and 2, handling both physical signals and frame addressing. = A differenza del modello OSI, il link layer TCP/IP combina i Livelli 1 e 2, gestendo sia segnali fisici che indirizzamento frame.',
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Internet Layer',
              italian: 'Livello Internet',
              pronunciation: '/ˈɪntərnet ˈleɪər/',
              phonetic: 'IN-ter-net LEI-er',
              example:
                "IP routing and ICMP error reporting are core Internet layer responsibilities in the TCP/IP stack. = L'instradamento IP e la segnalazione errori ICMP sono responsabilità centrali del livello Internet nello stack TCP/IP.",
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Mnemonic',
              italian: 'Mnemonico',
              pronunciation: '/nɪˈmɒnɪk/',
              phonetic: 'ni-MO-nik',
              example:
                'Students use the mnemonic "Please Do Not Throw Sausage Pizza Away" to memorize the seven OSI layers. = Gli studenti usano il mnemonico "Please Do Not Throw Sausage Pizza Away" per memorizzare i sette livelli OSI.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Aiuta a ricordare i 7 livelli: P D N T S P A.',
            },
            {
              english: 'Layer Independence',
              italian: 'Indipendenza tra livelli',
              pronunciation: '/ˈleɪər ˌɪndɪˈpendəns/',
              phonetic: 'LEI-er in-di-PEN-dens',
              example:
                "Thanks to layer independence, you can swap Wi-Fi for Ethernet without changing your application code. = Grazie all'indipendenza dei livelli, puoi sostituire il Wi-Fi con Ethernet senza modificare il codice applicativo.",
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Abstraction',
              italian: 'Astrazione',
              pronunciation: '/æbˈstrækʃən/',
              phonetic: 'ab-STRAK-scion',
              example:
                "Network abstraction lets developers write socket code without caring how packets physically travel. = L'astrazione di rete permette agli sviluppatori di scrivere codice socket senza preoccuparsi di come viaggiano fisicamente i pacchetti.",
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Service Primitive',
              italian: 'Primitiva di servizio',
              pronunciation: '/ˈsɜːrvɪs ˈprɪmɪtɪv/',
              phonetic: 'SER-vis PRI-mi-tiv',
              example:
                'CONNECT.request is a service primitive the transport layer exposes to open a new connection. = CONNECT.request è una primitiva di servizio che il livello di trasporto espone per aprire una nuova connessione.',
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'SAP',
              italian: 'Punto di accesso al servizio',
              pronunciation: '/sæp/',
              phonetic: 'SAP',
              example:
                'A TCP port number acts as a SAP identifying which application should receive incoming segments. = Un numero di porta TCP funge da SAP che identifica quale applicazione deve ricevere i segmenti in arrivo.',
              context: 'osi-model',
              difficulty: 'beginner',
              note: 'Service Access Point.',
            },
            {
              english: 'Peer Layer',
              italian: 'Livello peer',
              pronunciation: '/pɪər ˈleɪər/',
              phonetic: 'PIIR LEI-er',
              example:
                'Two routers exchanging OSPF hellos communicate at the same peer layer across different physical links. = Due router che scambiano hello OSPF comunicano allo stesso livello paritario attraverso diversi collegamenti fisici.',
              context: 'osi-model',
              difficulty: 'beginner',
            },
            {
              english: 'Reference Model',
              italian: 'modello di riferimento',
              pronunciation: '/ˈrefərəns ˈmɒdl/',
              phonetic: 'RE-fe-rens MO-del',
              example:
                "The OSI reference model was designed for teaching, not as a blueprint for implementation. = Il modello di riferimento OSI è stato progettato per l'insegnamento, non come schema implementativo.",
              context: 'osi-model',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 2 - TCP/IP
    // ════════════════════════════════════════════════
    2: {
      name: 'TCP/IP',
      description: 'Protocolli fondamentali Internet',
      lessons: [
        {
          id: 'net_tcpip_1',
          title: 'TCP Basics / Basi TCP',
          description: 'Il protocollo affidabile TCP',
          items: [
            {
              english: 'TCP',
              italian: 'protocollo di controllo trasmissione (TCP)',
              pronunciation: '/ˌtiː siː ˈpiː/',
              phonetic: 'TI-SI-PI',
              example:
                'Web browsers rely on TCP to guarantee every byte of an HTML page arrives intact and in order. = I browser web si affidano a TCP per garantire che ogni byte di una pagina HTML arrivi integro e in ordine.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'Transmission Control Protocol. Connection-oriented.',
            },
            {
              english: 'UDP',
              italian: 'protocollo datagrammi utente (UDP)',
              pronunciation: '/ˌjuː diː ˈpiː/',
              phonetic: 'IU-DI-PI',
              example:
                'Online games prefer UDP because dropping one position update beats waiting for a retransmission. = I giochi online preferiscono UDP perché perdere un aggiornamento di posizione è meglio che attendere una ritrasmissione.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'User Datagram Protocol. Connectionless.',
            },
            {
              english: 'IP',
              italian: 'protocollo Internet (IP)',
              pronunciation: '/ˌaɪ ˈpiː/',
              phonetic: 'AI-PI',
              example:
                'Every device on the Internet needs a unique IP address so routers know where to forward packets. = Ogni dispositivo su Internet necessita di un indirizzo IP univoco affinché i router sappiano dove inoltrare i pacchetti.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'Internet Protocol. Best-effort, non affidabile.',
            },
            {
              english: 'Port',
              italian: 'porta',
              pronunciation: '/pɔːrt/',
              phonetic: 'PORT',
              example:
                'A web server listens on port 443 for HTTPS while SSH runs on port 22, both on the same machine. = Un server web è in ascolto sulla porta 443 per HTTPS mentre SSH gira sulla porta 22, entrambi sulla stessa macchina.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'Numero da 0 a 65535 che identifica un processo.',
            },
            {
              english: 'Socket',
              italian: 'canale di comunicazione (socket)',
              pronunciation: '/ˈsɒkɪt/',
              phonetic: 'SO-ket',
              example:
                'Each endpoint of a TCP connection opens a socket identified by the IP address, protocol, and port number. = Ogni endpoint di una connessione TCP apre un socket identificato da indirizzo IP, protocollo e numero di porta.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              code: 'socket(AF_INET, SOCK_STREAM, 0);',
            },
            {
              english: 'Connection',
              italian: 'connessione',
              pronunciation: '/kəˈnekʃən/',
              phonetic: 'ko-NEK-scion',
              example:
                'Each TCP connection maintains sequence numbers, windows, and timers to track the data flow. = Ogni connessione TCP mantiene numeri di sequenza, finestre e timer per tracciare il flusso dati.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Connectionless',
              italian: 'Senza connessione',
              pronunciation: '/kəˈnekʃənləs/',
              phonetic: 'ko-NEK-scion-les',
              example:
                'Since UDP is connectionless, the sender fires datagrams without establishing a session first. = Poiché UDP è senza connessione, il mittente invia datagrammi senza prima stabilire una sessione.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Reliable Delivery',
              italian: 'Consegna affidabile',
              pronunciation: '/rɪˈlaɪəbl dɪˈlɪvəri/',
              phonetic: 'ri-LAI-a-bol di-LI-ve-ri',
              example:
                'TCP achieves reliable delivery through acknowledgements, retransmissions, and checksums on every segment. = TCP ottiene la consegna affidabile tramite riscontri, ritrasmissioni e checksum su ogni segmento.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Stream',
              italian: 'flusso di byte (stream)',
              pronunciation: '/striːm/',
              phonetic: 'STRIM',
              example:
                'Applications see a TCP connection as a continuous byte stream, unaware of segmentation on the wire. = Le applicazioni vedono una connessione TCP come un flusso di byte continuo, ignare della segmentazione sul cavo.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Stateful',
              italian: 'con stato (stateful)',
              pronunciation: '/ˈsteɪtfʊl/',
              phonetic: 'STEIT-ful',
              example:
                'Because it is stateful, the firewall tracks every TCP session and auto-allows return traffic for established flows. = Poiché è stateful, il firewall traccia ogni sessione TCP e consente automaticamente il traffico di ritorno per i flussi stabiliti.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'net_tcpip_2',
          title: 'Three-Way Handshake / Handshake a Tre Vie',
          description: 'Stabilire una connessione TCP',
          items: [
            {
              english: 'Three-Way Handshake',
              italian: 'Handshake a tre vie',
              pronunciation: '/θriː weɪ ˈhændʃeɪk/',
              phonetic: 'THRI-UEI HAND-scheik',
              example:
                'Before data flows, TCP performs a three-way handshake — SYN, SYN-ACK, ACK — to synchronize sequences. = Prima che fluiscano dati, TCP esegue un handshake a tre vie — SYN, SYN-ACK, ACK — per sincronizzare le sequenze.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'Sequenza: SYN, SYN-ACK, ACK.',
            },
            {
              english: 'SYN',
              italian: 'SYN',
              pronunciation: '/sɪn/',
              phonetic: 'SIN',
              example:
                "Opening a TCP connection starts with sending a SYN packet carrying an initial sequence number. = L'apertura di una connessione TCP inizia con l'invio di un pacchetto SYN che porta un numero di sequenza iniziale.",
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: `SYN sta per 'synchronize': è il primo flag del three-way handshake TCP.`,
            },
            {
              english: 'SYN-ACK',
              italian: 'SYN-ACK',
              pronunciation: '/sɪn æk/',
              phonetic: 'SIN-AK',
              example:
                'After receiving a SYN, the server replies with a SYN-ACK acknowledging the client and proposing its own sequence. = Dopo aver ricevuto un SYN, il server risponde con un SYN-ACK confermando il client e proponendo la propria sequenza.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'ACK',
              italian: 'ACK',
              pronunciation: '/æk/',
              phonetic: 'AK',
              example:
                'Every TCP data segment processed by the receiver triggers an ACK confirming successful delivery. = Ogni segmento dati TCP elaborato dal ricevitore attiva un ACK che conferma la consegna riuscita.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: `ACK sta per 'acknowledgement': conferma la ricezione di un segmento TCP.`,
            },
            {
              english: 'FIN',
              italian: 'FIN',
              pronunciation: '/fɪn/',
              phonetic: 'FIN',
              example:
                'When the browser finishes downloading, it sends a FIN to gracefully close the TCP connection. = Quando il browser finisce di scaricare, invia un FIN per chiudere la connessione TCP in modo ordinato.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: `FIN sta per 'finish': segnala la chiusura ordinata di una connessione TCP.`,
            },
            {
              english: 'RST',
              italian: 'RST',
              pronunciation: '/riˈset/',
              phonetic: 'RI-SET',
              example:
                "Connecting to a closed port triggers an immediate RST from the kernel, aborting the handshake. = Connettersi a una porta chiusa attiva un RST immediato dal kernel, interrompendo l'handshake.",
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: `RST sta per 'reset': interrompe bruscamente una connessione TCP.`,
            },
            {
              english: 'Sequence Number',
              italian: 'Numero di sequenza',
              pronunciation: '/ˈsiːkwəns ˈnʌmbər/',
              phonetic: 'SI-kuens NAM-ber',
              example:
                'TCP stamps each segment with a sequence number so the receiver can reorder out-of-order arrivals. = TCP marca ogni segmento con un numero di sequenza così il ricevitore può riordinare gli arrivi fuori ordine.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Acknowledgement Number',
              italian: 'Numero di riscontro',
              pronunciation: '/əkˈnɒlɪdʒmənt/',
              phonetic: 'ak-NOL-ich-ment',
              example:
                'In every ACK segment, the acknowledgement number indicates which byte the receiver expects next. = In ogni segmento ACK, il numero di riscontro indica quale byte il ricevitore si aspetta successivamente.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Window Size',
              italian: 'Dimensione finestra',
              pronunciation: '/ˈwɪndoʊ saɪz/',
              phonetic: 'UIN-dou SAIZ',
              example:
                'A small TCP window size throttles throughput because the sender must wait for ACKs more often. = Una dimensione della finestra TCP piccola limita il throughput perché il mittente deve attendere gli ACK più spesso.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'Sliding window per il controllo di flusso.',
            },
            {
              english: 'PSH',
              italian: 'PSH',
              pronunciation: '/pʊʃ/',
              phonetic: 'PUSH',
              example:
                "Setting the PSH flag tells the receiving stack to deliver data to the application immediately. = Impostare il flag PSH dice allo stack ricevente di consegnare i dati all'applicazione immediatamente.",
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: `PSH sta per 'push': dice al ricevente di passare subito i dati all'applicazione senza bufferizzarli.`,
            },
          ],
        },
        {
          id: 'net_tcpip_3',
          title: 'Common Ports / Porte Comuni',
          description: 'Numeri di porta noti e well-known',
          items: [
            {
              english: 'Well-Known Port',
              italian: 'porta nota (well-known port)',
              pronunciation: '/wel noʊn pɔːrt/',
              phonetic: 'UEL-NOUN PORT',
              example:
                'Ports 0-1023 are well-known ports reserved by IANA for standard services like HTTP and SSH. = Le porte 0-1023 sono porte note riservate da IANA per servizi standard come HTTP e SSH.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'Riservate dalla IANA per servizi standard.',
            },
            {
              english: 'Ephemeral Port',
              italian: 'porta effimera',
              pronunciation: '/ɪˈfemərəl/',
              phonetic: 'i-FE-me-ral',
              example:
                'The OS picks a random ephemeral port above 49152 for the client side of each outbound connection. = Il sistema operativo sceglie una porta effimera casuale sopra 49152 per il lato client di ogni connessione in uscita.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'Tipicamente da 49152 a 65535.',
            },
            {
              english: 'Port 80',
              italian: 'porta 80',
              pronunciation: '/pɔːrt ˈeɪti/',
              phonetic: 'PORT EI-ti',
              example:
                'Legacy sites still serve unencrypted HTTP on port 80 before redirecting to HTTPS on 443. = I siti legacy servono ancora HTTP non cifrato sulla porta 80 prima di reindirizzare a HTTPS sulla 443.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Port 443',
              italian: 'porta 443',
              pronunciation: '/pɔːrt fɔːr fɔːr θriː/',
              phonetic: 'PORT FOR-FOR-THRI',
              example:
                'All modern HTTPS traffic flows through port 443, where TLS-encrypted connections terminate. = Tutto il traffico HTTPS moderno passa attraverso la porta 443, dove terminano le connessioni cifrate con TLS.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Port 22',
              italian: 'porta 22',
              pronunciation: '/pɔːrt ˈtwenti tuː/',
              phonetic: 'PORT TUEN-ti TU',
              example:
                "Administrators use port 22 to reach servers via SSH for secure remote shell access. = Gli amministratori usano la porta 22 per raggiungere i server via SSH per l'accesso remoto sicuro alla shell.",
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Port 53',
              italian: 'porta 53',
              pronunciation: '/pɔːrt ˈfɪfti θriː/',
              phonetic: 'PORT FIF-ti THRI',
              example:
                'Every DNS query your browser makes goes to a resolver listening on port 53, usually over UDP. = Ogni query DNS del tuo browser va a un resolver in ascolto sulla porta 53, solitamente su UDP.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Port 25',
              italian: 'porta 25',
              pronunciation: '/pɔːrt ˈtwenti faɪv/',
              phonetic: 'PORT TUEN-ti FAIV',
              example:
                'Mail servers relay email on port 25 via SMTP, though ISPs often block it to reduce spam. = I server di posta inoltrano email sulla porta 25 via SMTP, anche se gli ISP spesso la bloccano per ridurre lo spam.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Listening Port',
              italian: 'porta in ascolto',
              pronunciation: '/ˈlɪsənɪŋ pɔːrt/',
              phonetic: 'LI-se-ning PORT',
              example:
                'Running "ss -tlnp" shows every listening port on the system and which process owns it. = Eseguire "ss -tlnp" mostra ogni porta in ascolto sul sistema e quale processo la possiede.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              command: 'ss -tuln',
            },
            {
              english: 'Open Port',
              italian: 'porta aperta',
              pronunciation: '/ˈoʊpən pɔːrt/',
              phonetic: 'OU-pen PORT',
              example:
                'An nmap scan finding an open port means a service is accepting connections and potentially exposed. = Una scansione nmap che trova una porta aperta significa che un servizio accetta connessioni ed è potenzialmente esposto.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              tool: 'nmap',
            },
            {
              english: 'Closed Port',
              italian: 'porta chiusa',
              pronunciation: '/kloʊzd pɔːrt/',
              phonetic: 'KLOUZD PORT',
              example:
                "Receiving RST from a closed port confirms the host is reachable but no service is listening there. = Ricevere RST da una porta chiusa conferma che l'host è raggiungibile ma nessun servizio è in ascolto.",
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'net_tcpip_4',
          title: 'TCP vs UDP / TCP contro UDP',
          description: 'Confronto tra i due protocolli di trasporto',
          items: [
            {
              english: 'Reliability',
              italian: 'affidabilità',
              pronunciation: '/rɪˌlaɪəˈbɪləti/',
              phonetic: 'ri-lai-a-BI-li-ti',
              example:
                'TCP provides end-to-end reliability by retransmitting lost segments until the receiver confirms them. = TCP fornisce affidabilità end-to-end ritrasmettendo i segmenti persi finché il ricevitore non li conferma.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Retransmission',
              italian: 'ritrasmissione',
              pronunciation: '/ˌriːtrænzˈmɪʃən/',
              phonetic: 'ri-tranz-MIS-scion',
              example:
                'If no ACK arrives within the timeout, TCP triggers automatic retransmission of the unacknowledged data. = Se non arriva alcun ACK entro il timeout, TCP attiva la ritrasmissione automatica dei dati non confermati.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Flow Control',
              italian: 'controllo di flusso',
              pronunciation: '/floʊ kənˈtroʊl/',
              phonetic: 'FLOU kon-TROUL',
              example:
                "TCP flow control uses the receiver's window to prevent a fast sender from overwhelming a slow receiver. = Il controllo di flusso TCP usa la finestra del ricevitore per impedire che un mittente veloce sovraccarichi un ricevitore lento.",
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Congestion Control',
              italian: 'Controllo di congestione',
              pronunciation: '/kənˈdʒestʃən/',
              phonetic: 'kon-GES-cion',
              example:
                "When routers drop packets, TCP's congestion control halves the sending rate to let the network recover. = Quando i router scartano pacchetti, il controllo della congestione TCP dimezza la velocità di invio per far riprendere la rete.",
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'Algoritmi: Cubic, BBR, Reno.',
            },
            {
              english: 'Best-Effort',
              italian: 'massimo sforzo (best-effort)',
              pronunciation: '/best ˈefərt/',
              phonetic: 'BEST E-fort',
              example:
                'As a best-effort protocol, IP tries to deliver every packet but guarantees neither arrival nor order. = Come protocollo best-effort, IP prova a consegnare ogni pacchetto ma non garantisce né arrivo né ordine.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Real-Time',
              italian: 'Tempo reale',
              pronunciation: '/ˈriːl taɪm/',
              phonetic: 'RIIL TAIM',
              example:
                'Video conferencing needs real-time delivery, using RTP over UDP rather than waiting for TCP retransmissions. = La videoconferenza necessita di consegna in tempo reale, usando RTP su UDP anziché attendere le ritrasmissioni TCP.',
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'Streaming',
              italian: 'trasmissione continua (streaming)',
              pronunciation: '/ˈstriːmɪŋ/',
              phonetic: 'STRI-ming',
              example:
                'Netflix uses adaptive bitrate streaming that adjusts video quality based on available bandwidth. = Netflix usa lo streaming a bitrate adattivo che regola la qualità video in base alla banda disponibile.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'Esempi: SRT, RTP, QUIC.',
            },
            {
              english: 'QUIC',
              italian: 'QUIC',
              pronunciation: '/kwɪk/',
              phonetic: 'KUIK',
              example:
                'Built by Google, QUIC combines TLS and transport in a single handshake, halving connection setup time. = Creato da Google, QUIC combina TLS e trasporto in un singolo handshake, dimezzando il tempo di setup.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              note: 'Sviluppato da Google. Standard IETF dal 2021.',
            },
            {
              english: 'Half-Open',
              italian: 'Semi-aperta',
              pronunciation: '/hæf ˈoʊpən/',
              phonetic: 'HAF OU-pen',
              example:
                "A SYN flood fills the server's backlog with thousands of half-open connections, exhausting memory. = Un SYN flood riempie il backlog del server con migliaia di connessioni semiaperte, esaurendo la memoria.",
              context: 'tcp-ip',
              difficulty: 'beginner',
            },
            {
              english: 'TIME_WAIT',
              italian: 'Stato TIME_WAIT',
              pronunciation: '/taɪm weɪt/',
              phonetic: 'TAIM-UEIT',
              example:
                'After closing a TCP session, the socket enters TIME_WAIT for 2 minutes to catch lingering packets. = Dopo aver chiuso una sessione TCP, il socket entra in TIME_WAIT per 2 minuti per catturare pacchetti residui.',
              context: 'tcp-ip',
              difficulty: 'beginner',
              command: 'ss -tan state time-wait',
              note: 'Tipicamente dura 2 MSL (~60s).',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 3 - INDIRIZZAMENTO / ADDRESSING
    // ════════════════════════════════════════════════
    3: {
      name: 'Indirizzamento / Addressing',
      description: 'Indirizzi IP, sottoreti e protocolli di assegnazione',
      lessons: [
        {
          id: 'net_addressing_1',
          title: 'IPv4 Addressing / Indirizzamento IPv4',
          description: 'Indirizzi IPv4 e classi',
          items: [
            {
              english: 'IP Address',
              italian: 'indirizzo IP',
              pronunciation: '/ˌaɪ piː əˈdres/',
              phonetic: 'AI-PI a-DRES',
              example: `We had to whitelist the office IP address on the database firewall before remote workers could query analytics. = Abbiamo dovuto inserire in whitelist l'indirizzo IP dell'ufficio sul firewall del database prima che i lavoratori da remoto potessero interrogare l'analytics.`,
              context: 'addressing',
              difficulty: 'beginner',
              command: 'ip addr show',
            },
            {
              english: 'IPv4',
              italian: 'IPv4',
              pronunciation: '/ˌaɪ piː viː fɔːr/',
              phonetic: 'AI-PI-VI-FOR',
              example:
                'In networking, IPv4 addresses are 32 bits long. = Gli indirizzi IPv4 sono lunghi 32 bit.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Esempio: 192.168.1.1. Ne esistono ~4 miliardi.',
            },
            {
              english: 'Octet',
              italian: 'Ottetto',
              pronunciation: '/ˈɒktet/',
              phonetic: 'OK-tet',
              example:
                "Each octet in the address 192.168.1.10 represents 8 bits of the 32-bit IPv4 space. = Ogni ottetto nell'indirizzo 192.168.1.10 rappresenta 8 bit dello spazio IPv4 a 32 bit.",
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Ogni ottetto è 8 bit (0-255).',
            },
            {
              english: 'Dotted Decimal',
              italian: 'Notazione decimale puntata',
              pronunciation: '/ˈdɒtɪd ˈdesɪml/',
              phonetic: 'DO-tid DE-si-mol',
              example:
                'System administrators read the dotted decimal notation 10.0.0.1 more easily than its binary equivalent. = Gli amministratori di sistema leggono la notazione decimale puntata 10.0.0.1 più facilmente del suo equivalente binario.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'Public IP',
              italian: 'IP pubblico',
              pronunciation: '/ˈpʌblɪk aɪ piː/',
              phonetic: 'PA-blik AI-PI',
              example:
                'Only addresses in the public IP range can be routed across the Internet by backbone routers. = Solo gli indirizzi nel range IP pubblico possono essere instradati attraverso Internet dai router backbone.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'Private IP',
              italian: 'IP privato',
              pronunciation: '/ˈpraɪvət aɪ piː/',
              phonetic: 'PRAI-vet AI-PI',
              example:
                'Office workstations typically receive private IPs like 10.0.1.x from the internal DHCP server. = Le postazioni in ufficio ricevono tipicamente IP privati come 10.0.1.x dal server DHCP interno.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Range: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.',
            },
            {
              english: 'Loopback',
              italian: 'indirizzo di loopback',
              pronunciation: '/ˈluːpbæk/',
              phonetic: 'LUP-bak',
              example:
                "Developers use the loopback address 127.0.0.1 to test services locally before deploying to production. = Gli sviluppatori usano l'indirizzo di loopback 127.0.0.1 per testare i servizi localmente prima del deploy in produzione.",
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Spesso chiamato "localhost".',
            },
            {
              english: 'Localhost',
              italian: 'localhost',
              pronunciation: '/ˈloʊkəlhoʊst/',
              phonetic: 'LO-kal-houst',
              example:
                'In networking, Localhost refers to your own machine. = Localhost si riferisce alla tua stessa macchina.',
              context: 'addressing',
              difficulty: 'beginner',
              command: 'ping localhost',
            },
            {
              english: 'APIPA',
              italian: 'indirizzamento automatico (APIPA)',
              pronunciation: '/əˈpiːpə/',
              phonetic: 'a-PI-pa',
              example:
                'In networking, APIPA assigns 169.254.x.x when DHCP fails. = APIPA assegna 169.254.x.x quando DHCP fallisce.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Automatic Private IP Addressing.',
            },
            {
              english: 'Default Gateway',
              italian: 'Gateway predefinito',
              pronunciation: '/dɪˈfɔːlt ˈɡeɪtweɪ/',
              phonetic: 'di-FOLT GHEIT-uei',
              example:
                'In the forwarding pipeline, the Default Gateway routes traffic out of the LAN. = Il gateway predefinito instrada il traffico fuori dalla LAN.',
              context: 'addressing',
              difficulty: 'beginner',
              command: 'ip route show default',
            },
          ],
        },
        {
          id: 'net_addressing_2',
          title: 'Subnetting / Sottoreti',
          description: 'Sottoreti e maschere',
          items: [
            {
              english: 'Subnet Mask',
              italian: 'maschera di sottorete',
              pronunciation: '/ˈsʌbnet mæsk/',
              phonetic: 'SAB-net MASK',
              example: `A /24 subnet mask (255.255.255.0) gives you 254 usable host addresses inside one broadcast domain. = Una subnet mask /24 (255.255.255.0) ti da' 254 indirizzi host utilizzabili dentro un singolo dominio di broadcast.`,
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Definisce parte rete vs parte host.',
            },
            {
              english: 'CIDR',
              italian: 'notazione CIDR',
              pronunciation: '/ˈsaɪdər/',
              phonetic: 'SAI-der',
              example:
                'When the firewall rule specifies 10.0.0.0/8 in CIDR notation, it matches over 16 million addresses in that block. = Quando la regola del firewall specifica 10.0.0.0/8 in notazione CIDR, corrisponde a oltre 16 milioni di indirizzi in quel blocco.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Classless Inter-Domain Routing. Sostituisce le classi A/B/C.',
            },
            {
              english: 'Prefix Length',
              italian: 'lunghezza del prefisso',
              pronunciation: '/ˈpriːfɪks leŋθ/',
              phonetic: 'PRI-fiks LENGTH',
              example:
                'A /24 prefix length means 24 network bits. = Un prefisso /24 significa 24 bit di rete.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'Network Address',
              italian: 'indirizzo di rete',
              pronunciation: '/ˈnetwɜːrk əˈdres/',
              phonetic: 'NET-uerk a-DRES',
              example: `The network address is the first IP of a subnet and identifies the whole segment rather than any single host. = L'indirizzo di rete e' il primo IP di una sottorete e identifica l'intero segmento invece di un singolo host.`,
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Tutti i bit host a 0.',
            },
            {
              english: 'Broadcast Address',
              italian: 'indirizzo di broadcast',
              pronunciation: '/ˈbrɔːdkæst/',
              phonetic: 'BROD-kast',
              example: `Sending a packet to the subnet broadcast address (e.g. 192.168.1.255) delivers it to every host in that LAN. = Inviare un pacchetto all'indirizzo di broadcast della sottorete (es. 192.168.1.255) lo consegna a ogni host di quella LAN.`,
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Tutti i bit host a 1.',
            },
            {
              english: 'Host Bits',
              italian: "bit dell'host",
              pronunciation: '/hoʊst bɪts/',
              phonetic: 'HOUST BITS',
              example:
                '/24 has 8 host bits, allowing 254 hosts. = /24 ha 8 bit host, permettendo 254 host.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'VLSM',
              italian: 'maschera a lunghezza variabile (VLSM)',
              pronunciation: '/ˌviː el es ˈem/',
              phonetic: 'VI-EL-ES-EM',
              example:
                'For better performance, VLSM allows efficient address allocation. = VLSM permette allocazione efficiente degli indirizzi.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Variable-Length Subnet Mask.',
            },
            {
              english: 'Supernetting',
              italian: 'supernetting',
              pronunciation: '/ˈsuːpərˌnetɪŋ/',
              phonetic: 'SU-per-net-ing',
              example:
                'In networking, Supernetting combines smaller networks. = Il supernetting combina reti più piccole.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'Subnet Calculator',
              italian: 'calcolatore di sottoreti',
              pronunciation: '/ˈsʌbnet ˈkælkjuleɪtər/',
              phonetic: 'SAB-net KAL-kiu-lei-ter',
              example:
                'During operations, Subnet Calculator helps plan IP ranges. = Un calcolatore di sottoreti aiuta a pianificare intervalli IP.',
              context: 'addressing',
              difficulty: 'beginner',
              tool: 'ipcalc, sipcalc',
            },
            {
              english: 'Address Class',
              italian: 'classe di indirizzi',
              pronunciation: '/əˈdres klæs/',
              phonetic: 'a-DRES KLAS',
              example:
                'Classful routing assigned each IPv4 address class a fixed prefix length, which CIDR later replaced with variable masks. = Il routing classful assegnava a ogni classe di indirizzi IPv4 una lunghezza di prefisso fissa, che CIDR ha poi sostituito con maschere variabili.',
              context: 'addressing',
              difficulty: 'beginner',
              note: "Sostituite da CIDR negli anni '90.",
            },
          ],
        },
        {
          id: 'net_addressing_3',
          title: 'IPv6 / IPv6',
          description: 'Il successore di IPv4',
          items: [
            {
              english: 'IPv6',
              italian: 'IPv6',
              pronunciation: '/ˌaɪ piː viː sɪks/',
              phonetic: 'AI-PI-VI-SIKS',
              example:
                'In networking, IPv6 addresses are 128 bits long. = Gli indirizzi IPv6 sono lunghi 128 bit.',
              context: 'addressing',
              difficulty: 'beginner',
              note: '~340 undecilioni di indirizzi disponibili.',
            },
            {
              english: 'Hexadecimal',
              italian: 'esadecimale',
              pronunciation: '/ˌheksəˈdesɪml/',
              phonetic: 'ek-sa-DE-si-mal',
              example:
                "The IPv6 address 2001:0db8::1 uses hexadecimal notation to represent 128 bits in a compact form. = L'indirizzo IPv6 2001:0db8::1 usa la notazione esadecimale per rappresentare 128 bit in forma compatta.",
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'Link-Local Address',
              italian: 'indirizzo link-local',
              pronunciation: '/lɪŋk ˈloʊkəl/',
              phonetic: 'LINK LO-kal',
              example:
                'IPv6 link-local addresses start with fe80::. = Gli indirizzi link-local IPv6 iniziano con fe80::.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'Global Unicast',
              italian: 'Unicast globale',
              pronunciation: '/ˈɡloʊbəl ˈjuːnɪkæst/',
              phonetic: 'GLOU-bal IU-ni-kast',
              example:
                'In networking, Global Unicast addresses are routable. = Gli indirizzi unicast globali sono instradabili.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'EUI-64',
              italian: 'EUI-64',
              pronunciation: '/ˌiː juː aɪ ˈsɪksti fɔːr/',
              phonetic: 'I-IU-AI SIKS-ti FOR',
              example:
                'In networking, EUI-64 derives the host part from MAC. = EUI-64 deriva la parte host dal MAC.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'SLAAC',
              italian: 'autoconfigurazione stateless (SLAAC)',
              pronunciation: '/slæk/',
              phonetic: 'SLAK',
              example:
                'For flexibility, SLAAC lets hosts auto-configure IPv6 addresses. = SLAAC permette agli host di auto-configurare indirizzi IPv6.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Stateless Address Auto-Configuration.',
            },
            {
              english: 'Dual Stack',
              italian: 'doppio stack (dual stack)',
              pronunciation: '/ˈduːəl stæk/',
              phonetic: 'DU-al STAK',
              example:
                'In networking, Dual Stack supports both IPv4 and IPv6. = Dual stack supporta sia IPv4 che IPv6.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'Tunneling',
              italian: 'tunneling',
              pronunciation: '/ˈtʌnəlɪŋ/',
              phonetic: 'TA-ne-ling',
              example:
                'IPv6 over IPv4 tunneling enables migration. = Il tunneling IPv6 su IPv4 abilita la migrazione.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Esempi: 6to4, Teredo.',
            },
            {
              english: 'Zero Compression',
              italian: 'Compressione zeri',
              pronunciation: '/ˈzɪəroʊ kəmˈpreʃən/',
              phonetic: 'ZI-ro kom-PRES-scion',
              example:
                'In networking, Zero Compression shortens IPv6 addresses. = La compressione zeri abbrevia gli indirizzi IPv6.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Esempio: 2001:0db8::1 invece di 2001:0db8:0000:0000:0000:0000:0000:0001.',
            },
            {
              english: 'Anycast',
              italian: 'anycast',
              pronunciation: '/ˈeniːkæst/',
              phonetic: 'E-ni-kast',
              example:
                'In the forwarding pipeline, Anycast routes to the nearest of many hosts. = Anycast instrada al più vicino tra molti host.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Usato dai DNS root server.',
            },
          ],
        },
        {
          id: 'net_addressing_4',
          title: 'DHCP & Cast Types / DHCP e Tipi di Trasmissione',
          description: 'Assegnazione dinamica e tipi di traffico',
          items: [
            {
              english: 'DHCP',
              italian: 'protocollo di configurazione host dinamica (DHCP)',
              pronunciation: '/ˌdiː eɪtʃ siː ˈpiː/',
              phonetic: 'DI-EICH-SI-PI',
              example:
                'In networking, DHCP automatically assigns IP addresses. = DHCP assegna automaticamente gli indirizzi IP.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Dynamic Host Configuration Protocol.',
            },
            {
              english: 'DHCP Lease',
              italian: 'Lease DHCP',
              pronunciation: '/ˌdiː eɪtʃ siː piː liːs/',
              phonetic: 'DI-EICH-SI-PI LIIS',
              example:
                'In networking, DHCP Lease times control IP renewal. = I tempi di lease DHCP controllano il rinnovo IP.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'DHCP Discover',
              italian: 'DHCP Discover',
              pronunciation: '/ˌdiː eɪtʃ siː piː dɪsˈkʌvər/',
              phonetic: 'DI-EICH-SI-PI di-SKA-ver',
              example:
                'When a laptop joins the network for the first time, it broadcasts a DHCP Discover message to locate an available server. = Quando un portatile si connette alla rete per la prima volta, trasmette un messaggio DHCP Discover in broadcast per trovare un server disponibile.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Sequenza DORA: Discover, Offer, Request, Ack.',
            },
            {
              english: 'DHCP Server',
              italian: 'server DHCP',
              pronunciation: '/ˌdiː eɪtʃ siː piː ˈsɜːrvər/',
              phonetic: 'DI-EICH-SI-PI SER-ver',
              example:
                'In networking, the DHCP Server assigns addresses from a pool. = Il server DHCP assegna indirizzi da un pool.',
              context: 'addressing',
              difficulty: 'beginner',
              tool: 'isc-dhcp-server, dnsmasq',
            },
            {
              english: 'Address Pool',
              italian: 'Pool di indirizzi',
              pronunciation: '/əˈdres puːl/',
              phonetic: 'a-DRES PUUL',
              example:
                "The DHCP pool defines the address range. = Il pool DHCP definisce l'intervallo di indirizzi.",
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'Reservation',
              italian: 'Riserva',
              pronunciation: '/ˌrezərˈveɪʃən/',
              phonetic: 'rez-er-VEI-scion',
              example:
                'DHCP reservations bind a MAC to a fixed IP. = Le riserve DHCP legano un MAC a un IP fisso.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'Unicast',
              italian: 'unicast',
              pronunciation: '/ˈjuːnɪkæst/',
              phonetic: 'IU-ni-kast',
              example:
                'In networking, Unicast traffic targets a single host. = Il traffico unicast ha come destinazione un singolo host.',
              context: 'addressing',
              difficulty: 'beginner',
            },
            {
              english: 'Multicast',
              italian: 'multicast',
              pronunciation: '/ˈmʌltɪkæst/',
              phonetic: 'MAL-ti-kast',
              example:
                'During communication, Multicast sends to a group of hosts. = Multicast invia a un gruppo di host.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Range IPv4: 224.0.0.0/4.',
            },
            {
              english: 'Broadcast',
              italian: 'broadcast',
              pronunciation: '/ˈbrɔːdkæst/',
              phonetic: 'BROD-kast',
              example:
                'In networking, Broadcast reaches all hosts on a LAN. = Il broadcast raggiunge tutti gli host di una LAN.',
              context: 'addressing',
              difficulty: 'beginner',
              note: 'Non esiste in IPv6: sostituito da multicast.',
            },
            {
              english: 'TTL',
              italian: 'tempo di vita (TTL)',
              pronunciation: '/ˌtiː tiː ˈel/',
              phonetic: 'TI-TI-EL',
              example:
                'As a security measure, TTL prevents packets from looping forever. = TTL impedisce ai pacchetti di girare in loop infinito.',
              context: 'addressing',
              difficulty: 'beginner',
              command: 'ping -t 64 example.com',
              note: 'Decrementato di 1 ad ogni hop.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 4 - ETHERNET E SWITCHING / ETHERNET & SWITCHING
    // ════════════════════════════════════════════════
    4: {
      name: 'Ethernet e Switching / Ethernet & Switching',
      description: 'Reti Ethernet, switch e VLAN',
      lessons: [
        {
          id: 'net_switching_1',
          title: 'MAC & Ethernet Frames / MAC e Frame Ethernet',
          description: 'Indirizzi MAC e struttura dei frame',
          items: [
            {
              english: 'MAC Address',
              italian: 'indirizzo MAC',
              pronunciation: '/mæk əˈdres/',
              phonetic: 'MAK a-DRES',
              example:
                'Each NIC has a unique 48-bit MAC address. = Ogni NIC ha un indirizzo MAC unico di 48 bit.',
              context: 'switching',
              difficulty: 'intermediate',
              command: 'ip link show',
              note: 'Media Access Control. Esempio: 00:1A:2B:3C:4D:5E.',
            },
            {
              english: 'OUI',
              italian: 'identificativo del produttore (OUI)',
              pronunciation: '/ˌoʊ juː ˈaɪ/',
              phonetic: 'O-IU-AI',
              example: `The first three bytes of a MAC address form the OUI, which lets you look up the manufacturer of a NIC. = I primi tre byte di un indirizzo MAC formano l'OUI, che ti permette di risalire al produttore di una scheda di rete.`,
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Organizationally Unique Identifier.',
            },
            {
              english: 'Ethernet Frame',
              italian: 'frame Ethernet',
              pronunciation: '/ˈiːθərnet freɪm/',
              phonetic: 'I-ther-net FREIM',
              example:
                'In networking, an Ethernet Frame contains source and destination MAC. = Un frame Ethernet contiene MAC sorgente e destinazione.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'Preamble',
              italian: 'preambolo',
              pronunciation: '/ˈpriːæmbl/',
              phonetic: 'PRI-am-bol',
              example:
                'In networking, the Preamble synchronizes receiver and sender. = Il preambolo sincronizza ricevente e mittente.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'EtherType',
              italian: 'tipo Ethernet (EtherType)',
              pronunciation: '/ˈiːθərtaɪp/',
              phonetic: 'I-ther-taip',
              example:
                'In networking, EtherType 0x0800 indicates IPv4 payload. = EtherType 0x0800 indica payload IPv4.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'CRC',
              italian: 'codice di ridondanza ciclica (CRC)',
              pronunciation: '/ˌsiː ɑːr ˈsiː/',
              phonetic: 'SI-AR-SI',
              example:
                'When scanning traffic, CRC detects frame corruption. = Il CRC rileva la corruzione del frame.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Cyclic Redundancy Check.',
            },
            {
              english: 'Jumbo Frame',
              italian: 'frame jumbo',
              pronunciation: '/ˈdʒʌmboʊ freɪm/',
              phonetic: 'GIAM-bo FREIM',
              example:
                'Storage area networks often enable jumbo frames to reduce CPU overhead when transferring large database backups. = Le reti di storage spesso abilitano i jumbo frame per ridurre il carico CPU quando si trasferiscono backup di database di grandi dimensioni.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Utili nei data center per ridurre overhead.',
            },
            {
              english: 'Collision Domain',
              italian: 'dominio di collisione',
              pronunciation: '/kəˈlɪʒən doʊˈmeɪn/',
              phonetic: 'ko-LI-gion do-MEIN',
              example:
                'Each switch port is its own collision domain. = Ogni porta switch è un proprio dominio di collisione.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'Broadcast Domain',
              italian: 'dominio di broadcast',
              pronunciation: '/ˈbrɔːdkæst doʊˈmeɪn/',
              phonetic: 'BROD-kast do-MEIN',
              example: `Splitting one big VLAN into smaller broadcast domains reduces ARP traffic and limits failure blast radius. = Dividere una grossa VLAN in domini di broadcast più piccoli riduce il traffico ARP e limita l'impatto dei guasti.`,
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'CSMA/CD',
              italian: 'accesso al mezzo Ethernet legacy (CSMA/CD)',
              pronunciation: '/ˌsiː es em eɪ siː ˈdiː/',
              phonetic: 'SI-ES-EM-EI SI-DI',
              example:
                'In networking, CSMA/CD handled collisions in shared Ethernet. = CSMA/CD gestiva le collisioni in Ethernet condiviso.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Carrier Sense Multiple Access / Collision Detection.',
            },
          ],
        },
        {
          id: 'net_switching_2',
          title: 'Switches / Switch',
          description: 'Funzionamento degli switch Ethernet',
          items: [
            {
              english: 'Layer 3 switch',
              italian: 'switch Layer 3',
              pronunciation: '/swɪtʃ/',
              phonetic: 'SUITCH',
              example:
                'A Layer 3 switch combines fast hardware switching with routing in silicon, perfect for inter-VLAN traffic at line rate. = Uno switch Layer 3 combina switching hardware veloce con il routing in silicio, perfetto per il traffico inter-VLAN a line rate.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Detto anche multilayer switch, supporta sia funzioni L2 sia L3.',
            },
            {
              english: 'MAC Table',
              italian: 'tabella MAC',
              pronunciation: '/mæk ˈteɪbl/',
              phonetic: 'MAK TEI-bol',
              example:
                'In DNS resolution, the MAC Table maps MAC to switch port. = La tabella MAC mappa MAC a porta switch.',
              context: 'switching',
              difficulty: 'intermediate',
              command: 'show mac address-table',
            },
            {
              english: 'CAM Table',
              italian: 'Tabella CAM',
              pronunciation: '/kæm ˈteɪbl/',
              phonetic: 'KAM TEI-bol',
              example:
                'By definition, CAM Table is another name for the MAC table. = Tabella CAM è un altro nome per la tabella MAC.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Content-Addressable Memory.',
            },
            {
              english: 'Forwarding',
              italian: 'Inoltro',
              pronunciation: '/ˈfɔːrwərdɪŋ/',
              phonetic: 'FOR-uar-ding',
              example:
                "Switch forwarding is hardware-accelerated. = L'inoltro switch è accelerato in hardware.",
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'Flooding',
              italian: 'inondazione (flooding)',
              pronunciation: '/ˈflʌdɪŋ/',
              phonetic: 'FLA-ding',
              example:
                'Unknown unicasts are flooded to all ports. = Gli unicast sconosciuti sono flooded a tutte le porte.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'Cut-Through Switching',
              italian: 'commutazione cut-through',
              pronunciation: '/kʌt θruː/',
              phonetic: 'KAT-THRU',
              example:
                'Cut-through forwards before reading the full frame. = Cut-through inoltra prima di leggere tutto il frame.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'Store-and-Forward',
              italian: 'store-and-forward',
              pronunciation: '/stɔːr ænd ˈfɔːrwərd/',
              phonetic: 'STOR-AND-FOR-uard',
              example:
                'In networking, Store-and-Forward checks the CRC before sending. = Store-and-forward verifica il CRC prima di inviare.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'Port Security',
              italian: 'Sicurezza porta',
              pronunciation: '/pɔːrt sɪˈkjʊərəti/',
              phonetic: 'PORT si-KIU-re-ti',
              example:
                'In networking, Port Security limits MACs per port. = La port security limita i MAC per porta.',
              context: 'switching',
              difficulty: 'intermediate',
              code: 'switchport port-security maximum 2',
            },
            {
              english: 'PoE',
              italian: 'alimentazione su Ethernet (PoE)',
              pronunciation: '/ˌpiː oʊ ˈiː/',
              phonetic: 'PI-O-I',
              example:
                'In networking, PoE delivers power through the Ethernet cable. = PoE eroga corrente attraverso il cavo Ethernet.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Utile per IP phones, AP Wi-Fi, telecamere.',
            },
            {
              english: 'Auto-Negotiation',
              italian: 'Auto-negoziazione',
              pronunciation: '/ˈɔːtoʊ nɪˌɡoʊʃiˈeɪʃən/',
              phonetic: 'OTO ne-go-si-EI-scion',
              example:
                "In networking, Auto-Negotiation selects speed and duplex. = L'auto-negoziazione seleziona velocità e duplex.",
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Comune fonte di problemi di velocità half/full duplex.',
            },
          ],
        },
        {
          id: 'net_switching_3',
          title: 'VLAN / VLAN',
          description: 'Reti locali virtuali e tagging',
          items: [
            {
              english: 'VLAN',
              italian: 'rete locale virtuale (VLAN)',
              pronunciation: '/ˈviːlæn/',
              phonetic: 'VI-LAN',
              example:
                'To isolate guest Wi-Fi from corporate traffic, the switch assigns each group to a separate VLAN on the same physical hardware. = Per isolare il Wi-Fi ospiti dal traffico aziendale, lo switch assegna ogni gruppo a una VLAN separata sullo stesso hardware fisico.',
              context: 'switching',
              difficulty: 'intermediate',
              code: 'switchport access vlan 10',
              note: 'Virtual LAN.',
            },
            {
              english: 'VLAN ID',
              italian: 'ID VLAN',
              pronunciation: '/ˈviːlæn aɪ diː/',
              phonetic: 'VI-LAN AI-DI',
              example:
                'The network team assigns VLAN IDs from the valid range of 1 to 4094, reserving VLAN 100 for management traffic. = Il team di rete assegna ID VLAN dal range valido da 1 a 4094, riservando la VLAN 100 al traffico di gestione.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: '802.1Q',
              italian: 'tag VLAN (802.1Q)',
              pronunciation: '/eɪt oʊ tuː dɒt wʌn kjuː/',
              phonetic: 'EIT-O-TU dot UAN-KIU',
              example:
                'In networking, 802.1Q adds a VLAN tag to Ethernet frames. = 802.1Q aggiunge un tag VLAN ai frame Ethernet.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Standard IEEE per VLAN tagging.',
            },
            {
              english: 'Trunk Port',
              italian: 'porta trunk',
              pronunciation: '/trʌŋk pɔːrt/',
              phonetic: 'TRANK PORT',
              example:
                'In networking, a Trunk Port carries multiple VLANs. = Una porta trunk trasporta più VLAN.',
              context: 'switching',
              difficulty: 'intermediate',
              code: 'switchport mode trunk',
            },
            {
              english: 'Access Port',
              italian: 'Porta access',
              pronunciation: '/ˈækses pɔːrt/',
              phonetic: 'AK-ses PORT',
              example:
                "Each workstation plugs into an access port that carries traffic for exactly one VLAN, preventing exposure to other segments. = Ogni postazione si collega a una porta access che trasporta traffico per esattamente una VLAN, prevenendo l'esposizione ad altri segmenti.",
              context: 'switching',
              difficulty: 'intermediate',
              code: 'switchport mode access',
            },
            {
              english: 'Native VLAN',
              italian: 'VLAN nativa',
              pronunciation: '/ˈneɪtɪv ˈviːlæn/',
              phonetic: 'NEI-tiv VI-LAN',
              example:
                'In networking, the Native VLAN carries untagged traffic on a trunk. = La VLAN nativa trasporta traffico senza tag su un trunk.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Default 1, ma è buona pratica cambiarla.',
            },
            {
              english: 'VLAN Tagging',
              italian: 'Tagging VLAN',
              pronunciation: '/ˈviːlæn ˈtæɡɪŋ/',
              phonetic: 'VI-LAN TA-ghing',
              example:
                'In networking, VLAN Tagging adds 4 bytes to the frame. = Il tagging VLAN aggiunge 4 byte al frame.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'Inter-VLAN Routing',
              italian: 'routing inter-VLAN',
              pronunciation: '/ˈɪntər ˈviːlæn/',
              phonetic: 'IN-ter VI-LAN',
              example:
                'In networking, Inter-VLAN Routing requires a Layer 3 device. = Il routing inter-VLAN richiede un dispositivo Layer 3.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Fatto da router o switch L3.',
            },
            {
              english: 'Voice VLAN',
              italian: 'VLAN voce',
              pronunciation: '/vɔɪs ˈviːlæn/',
              phonetic: 'VOIS VI-LAN',
              example:
                'In networking, a Voice VLAN isolates VoIP traffic. = Una VLAN voce isola il traffico VoIP.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'Private VLAN',
              italian: 'VLAN privata',
              pronunciation: '/ˈpraɪvət ˈviːlæn/',
              phonetic: 'PRAI-vet VI-LAN',
              example:
                'In a shared hosting environment, private VLANs prevent co-located servers from communicating directly with each other. = In un ambiente di hosting condiviso, le VLAN private impediscono ai server co-locati di comunicare direttamente tra loro.',
              context: 'switching',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_switching_4',
          title: 'STP & ARP / STP e ARP',
          description: 'Spanning Tree Protocol e ARP',
          items: [
            {
              english: 'STP',
              italian: 'protocollo spanning tree (STP)',
              pronunciation: '/ˌes tiː ˈpiː/',
              phonetic: 'ES-TI-PI',
              example:
                'As a security measure, STP prevents Layer 2 loops. = STP previene loop di Layer 2.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Spanning Tree Protocol. IEEE 802.1D.',
            },
            {
              english: 'BPDU',
              italian: 'unità dati protocollo bridge (BPDU)',
              pronunciation: '/ˌbiː piː diː ˈjuː/',
              phonetic: 'BI-PI-DI-IU',
              example:
                'Switches exchange BPDUs to elect a root. = Gli switch si scambiano BPDU per eleggere un root.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Bridge Protocol Data Unit.',
            },
            {
              english: 'Root Bridge',
              italian: 'Bridge radice',
              pronunciation: '/ruːt brɪdʒ/',
              phonetic: 'RUUT BRICH',
              example:
                'By definition, the Root Bridge is the STP reference point. = Il bridge radice è il punto di riferimento STP.',
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'RSTP',
              italian: 'Rapid Spanning Tree Protocol (RSTP)',
              pronunciation: '/ˌɑːr es tiː ˈpiː/',
              phonetic: 'AR-ES-TI-PI',
              example:
                'In networking, RSTP converges faster than STP. = RSTP converge più rapidamente di STP.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Rapid Spanning Tree Protocol. IEEE 802.1w.',
            },
            {
              english: 'BPDU Guard',
              italian: 'guardia BPDU (BPDU Guard)',
              pronunciation: '/ˌbiː piː diː juː ɡɑːrd/',
              phonetic: 'BI-PI-DI-IU GARD',
              example:
                'In networking, BPDU Guard disables ports receiving BPDUs. = BPDU Guard disabilita porte che ricevono BPDU.',
              context: 'switching',
              difficulty: 'intermediate',
              code: 'spanning-tree bpduguard enable',
            },
            {
              english: 'ARP',
              italian: 'protocollo di risoluzione indirizzi (ARP)',
              pronunciation: '/ɑːrp/',
              phonetic: 'ARP',
              example:
                'In networking, ARP resolves IP addresses to MAC addresses. = ARP risolve indirizzi IP in indirizzi MAC.',
              context: 'switching',
              difficulty: 'intermediate',
              command: 'arp -a',
            },
            {
              english: 'ARP Cache',
              italian: 'cache ARP',
              pronunciation: '/ɑːrp kæʃ/',
              phonetic: 'ARP KASH',
              example:
                'For efficiency, the ARP Cache stores recent MAC mappings. = La cache ARP memorizza i mapping MAC recenti.',
              context: 'switching',
              difficulty: 'intermediate',
              command: 'ip neigh show',
            },
            {
              english: 'Gratuitous ARP',
              italian: 'ARP gratuito',
              pronunciation: '/ɡrəˈtjuːɪtəs ɑːrp/',
              phonetic: 'gra-TIU-i-tos ARP',
              example:
                "In networking, Gratuitous ARP announces a host's MAC. = L'ARP gratuito annuncia il MAC di un host.",
              context: 'switching',
              difficulty: 'intermediate',
            },
            {
              english: 'ARP Spoofing',
              italian: 'spoofing ARP',
              pronunciation: '/ɑːrp ˈspuːfɪŋ/',
              phonetic: 'ARP SPU-fing',
              example:
                "For network flexibility, ARP Spoofing enables man-in-the-middle attacks. = L'ARP spoofing permette attacchi man-in-the-middle.",
              context: 'switching',
              difficulty: 'intermediate',
              tool: 'arpspoof, ettercap',
              note: 'Mitigato da Dynamic ARP Inspection (DAI).',
            },
            {
              english: 'EtherChannel',
              italian: 'EtherChannel',
              pronunciation: '/ˈiːθərˌtʃænl/',
              phonetic: 'I-ther-cia-nel',
              example:
                'In networking, EtherChannel bundles multiple links into one. = EtherChannel raggruppa più link in uno solo.',
              context: 'switching',
              difficulty: 'intermediate',
              note: 'Standard: LACP (IEEE 802.3ad).',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 5 - ROUTING / ROUTING
    // ════════════════════════════════════════════════
    5: {
      name: 'Routing / Routing',
      description: 'Instradamento del traffico tra reti',
      lessons: [
        {
          id: 'net_routing_1',
          title: 'Router Basics / Basi del Routing',
          description: 'Funzionamento dei router',
          items: [
            {
              english: 'core router',
              italian: 'router di core',
              pronunciation: '/ˈruːtər/',
              phonetic: 'RU-ter',
              example:
                'A core router moves traffic between major aggregation points and rarely runs access-layer features like NAT or DHCP. = Un router di core sposta traffico tra grandi punti di aggregazione e raramente esegue funzioni di accesso come NAT o DHCP.',
              context: 'routing',
              difficulty: 'intermediate',
              note: `Si contrappone all'access router o edge router, posizionato vicino agli utenti.`,
            },
            {
              english: 'Routing',
              italian: 'instradamento (routing)',
              pronunciation: '/ˈruːtɪŋ/',
              phonetic: 'RU-ting',
              example:
                'In networking, Routing decides the path packets take. = Il routing decide il percorso che fanno i pacchetti.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Routing Table',
              italian: 'tabella di instradamento',
              pronunciation: '/ˈruːtɪŋ ˈteɪbl/',
              phonetic: 'RU-ting TEI-bol',
              example:
                'For reference, the Routing Table lists known networks. = La tabella di routing elenca le reti conosciute.',
              context: 'routing',
              difficulty: 'intermediate',
              command: 'ip route show',
            },
            {
              english: 'Next Hop',
              italian: 'prossimo salto (next hop)',
              pronunciation: '/nekst hɒp/',
              phonetic: 'NEKST HOP',
              example:
                'By definition, the Next Hop is the router to forward to. = Il next hop è il router a cui inoltrare.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Hop',
              italian: 'salto (hop)',
              pronunciation: '/hɒp/',
              phonetic: 'HOP',
              example:
                'Each router a packet crosses counts as one hop, and the TTL is decremented at every hop until it reaches zero. = Ogni router che un pacchetto attraversa conta come un hop, e il TTL viene decrementato a ogni hop finché non arriva a zero.',
              context: 'routing',
              difficulty: 'intermediate',
              command: 'traceroute google.com',
            },
            {
              english: 'Route Metric',
              italian: 'metrica di instradamento',
              pronunciation: '/ruːt ˈmetrɪk/',
              phonetic: 'RUUT ME-trik',
              example:
                'When two paths reach the same destination, the router selects the route metric with the lower value to optimize throughput. = Quando due percorsi raggiungono la stessa destinazione, il router seleziona la metrica di rotta con il valore più basso per ottimizzare il throughput.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Administrative Distance',
              italian: 'distanza amministrativa',
              pronunciation: '/ədˌmɪnəˈstreɪtɪv/',
              phonetic: 'ad-mi-ni-STREI-tiv',
              example:
                "AD ranks the trustworthiness of route sources. = AD classifica l'affidabilità delle fonti di rotta.",
              context: 'routing',
              difficulty: 'intermediate',
              note: 'Esempio: directly connected=0, static=1, OSPF=110.',
            },
            {
              english: 'Convergence',
              italian: 'convergenza',
              pronunciation: '/kənˈvɜːrdʒəns/',
              phonetic: 'kon-VER-gens',
              example:
                'Network convergence is the time to stabilize. = La convergenza di rete è il tempo per stabilizzarsi.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Default Route',
              italian: 'rotta predefinita',
              pronunciation: '/dɪˈfɔːlt ruːt/',
              phonetic: 'di-FOLT RUUT',
              example:
                'By definition, the Default Route is 0.0.0.0/0. = La rotta predefinita è 0.0.0.0/0.',
              context: 'routing',
              difficulty: 'intermediate',
              command: 'ip route add default via 192.168.1.1',
            },
            {
              english: 'Longest Prefix Match',
              italian: 'Match prefisso più lungo',
              pronunciation: '/ˈlɒŋɡɪst ˈpriːfɪks/',
              phonetic: 'LON-gest PRI-fiks',
              example:
                'Given entries for 10.0.0.0/8 and 10.1.0.0/16, the router applies longest prefix match and forwards traffic to the /16 route. = Date le voci per 10.0.0.0/8 e 10.1.0.0/16, il router applica il longest prefix match e inoltra il traffico alla rotta /16.',
              context: 'routing',
              difficulty: 'intermediate',
              note: 'La rotta più specifica vince.',
            },
          ],
        },
        {
          id: 'net_routing_2',
          title: 'Static Routing / Rotte Statiche',
          description: 'Configurazione manuale delle rotte',
          items: [
            {
              english: 'Static Route',
              italian: 'rotta statica',
              pronunciation: '/ˈstætɪk ruːt/',
              phonetic: 'STA-tik RUUT',
              example:
                "For a small branch office with a single WAN link, the administrator manually configures a static route pointing all traffic to the ISP gateway. = Per una piccola filiale con un singolo link WAN, l'amministratore configura manualmente una rotta statica puntando tutto il traffico al gateway ISP.",
              context: 'routing',
              difficulty: 'intermediate',
              code: 'ip route 10.0.0.0 255.0.0.0 192.168.1.254',
            },
            {
              english: 'Floating Static Route',
              italian: 'Rotta statica galleggiante',
              pronunciation: '/ˈfloʊtɪŋ ˈstætɪk/',
              phonetic: 'FLO-ting STA-tik',
              example:
                'By definition, a Floating Static Route is a backup. = Una rotta statica galleggiante è un backup.',
              context: 'routing',
              difficulty: 'intermediate',
              note: 'Ha AD più alta della rotta primaria.',
            },
            {
              english: 'Stub Network',
              italian: 'rete stub',
              pronunciation: '/stʌb ˈnetwɜːrk/',
              phonetic: 'STAB NET-uerk',
              example:
                'By design, a Stub Network has only one connection. = Una rete stub ha una sola connessione.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Routed Protocol',
              italian: 'protocollo instradato',
              pronunciation: '/ˈruːtɪd ˈproʊtəkɒl/',
              phonetic: 'RU-tid PRO-to-kol',
              example:
                'As a routed protocol, IP packets carry source and destination addresses that routers examine at every hop. = Come protocollo instradato, i pacchetti IP portano indirizzi sorgente e destinazione che i router esaminano ad ogni hop.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Routing Protocol',
              italian: 'protocollo di instradamento',
              pronunciation: '/ˈruːtɪŋ ˈproʊtəkɒl/',
              phonetic: 'RU-ting PRO-to-kol',
              example:
                'Network engineers deploy OSPF as their primary routing protocol because it converges quickly after topology changes. = Gli ingegneri di rete implementano OSPF come protocollo di routing primario perché converge rapidamente dopo cambiamenti di topologia.',
              context: 'routing',
              difficulty: 'intermediate',
              note: 'Diverso da "routed protocol": questo distribuisce informazioni di rotta.',
            },
            {
              english: 'Directly Connected',
              italian: 'Connesso direttamente',
              pronunciation: '/dəˈrektli kəˈnektɪd/',
              phonetic: 'di-REKT-li ko-NEK-tid',
              example:
                'In the forwarding pipeline, Directly Connected routes have AD 0. = Le rotte connesse direttamente hanno AD 0.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Recursive Lookup',
              italian: 'Lookup ricorsivo',
              pronunciation: '/rɪˈkɜːrsɪv ˈlʊkʌp/',
              phonetic: 'ri-KER-siv LUK-ap',
              example:
                'In networking, Recursive Lookup resolves the next hop. = Il lookup ricorsivo risolve il next hop.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Black Hole Route',
              italian: 'Rotta black hole',
              pronunciation: '/blæk hoʊl ruːt/',
              phonetic: 'BLAK-HOUL RUUT',
              example:
                'In networking, a Black Hole Route silently drops packets. = Una rotta black hole scarta silenziosamente i pacchetti.',
              context: 'routing',
              difficulty: 'intermediate',
              code: 'ip route add blackhole 1.2.3.0/24',
            },
            {
              english: 'Policy-Based Routing',
              italian: 'Routing basato su policy',
              pronunciation: '/ˈpɒləsi beɪst/',
              phonetic: 'PO-li-si BEIST',
              example:
                'We use policy-based routing to send guest Wi-Fi traffic through the cheap consumer link and corporate traffic through MPLS. = Usiamo il policy-based routing per inviare il traffico del Wi-Fi ospiti sul link consumer economico e il traffico aziendale tramite MPLS.',
              context: 'routing',
              difficulty: 'intermediate',
              note: 'Diverso dal routing classico, decide il next-hop in base a sorgente, applicazione o marcatura del pacchetto.',
            },
            {
              english: 'ICMP Redirect',
              italian: 'Redirect ICMP',
              pronunciation: '/ˌaɪ siː em piː rɪˈdaɪrekt/',
              phonetic: 'AI-SI-EM-PI ri-DAI-rekt',
              example:
                "When a router detects that a packet should take a shorter path, it sends an ICMP redirect to inform the source host of a better next hop. = Quando un router rileva che un pacchetto dovrebbe prendere un percorso piu corto, invia un ICMP redirect per informare l'host sorgente di un next hop migliore.",
              context: 'routing',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_routing_3',
          title: 'Dynamic Routing / Routing Dinamico',
          description: 'Protocolli che apprendono le rotte automaticamente',
          items: [
            {
              english: 'Dynamic Routing',
              italian: 'Routing dinamico',
              pronunciation: '/daɪˈnæmɪk ˈruːtɪŋ/',
              phonetic: 'dai-NA-mik RU-ting',
              example:
                'In networking, Dynamic Routing adapts to network changes. = Il routing dinamico si adatta ai cambiamenti di rete.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'RIP',
              italian: 'RIP',
              pronunciation: '/rɪp/',
              phonetic: 'RIP',
              example:
                'Under the hood, RIP uses hop count as its metric. = RIP usa il conteggio di hop come metrica.',
              context: 'routing',
              difficulty: 'intermediate',
              note: 'RIP (Routing Information Protocol) è un protocollo distance-vector basato sul conteggio degli hop.',
            },
            {
              english: 'Distance Vector',
              italian: 'vettore di distanza (distance vector)',
              pronunciation: '/ˈdɪstəns ˈvektər/',
              phonetic: 'DIS-tans VEK-tor',
              example:
                'In networking, Distance Vector protocols share routing tables. = I protocolli distance vector condividono tabelle di routing.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Link State',
              italian: 'stato del collegamento (link state)',
              pronunciation: '/lɪŋk steɪt/',
              phonetic: 'LINK STEIT',
              example:
                'In networking, Link State protocols build a network map. = I protocolli link state costruiscono una mappa della rete.',
              context: 'routing',
              difficulty: 'intermediate',
              note: 'Esempi: OSPF, IS-IS.',
            },
            {
              english: 'OSPF',
              italian: 'OSPF',
              pronunciation: '/ˌoʊ es piː ˈef/',
              phonetic: 'O-ES-PI-EF',
              example:
                'Under the hood, OSPF uses Dijkstra to find best paths. = OSPF usa Dijkstra per trovare i percorsi migliori.',
              context: 'routing',
              difficulty: 'intermediate',
              note: `OSPF (Open Shortest Path First) è un protocollo link-state che usa l'algoritmo di Dijkstra.`,
            },
            {
              english: 'EIGRP',
              italian: 'EIGRP',
              pronunciation: '/ˌiː aɪ dʒiː ɑːr ˈpiː/',
              phonetic: 'I-AI-GI-AR-PI',
              example:
                "By definition, EIGRP is Cisco's hybrid routing protocol. = EIGRP è il protocollo di routing ibrido Cisco.",
              context: 'routing',
              difficulty: 'intermediate',
              note: 'Enhanced Interior Gateway Routing Protocol.',
            },
            {
              english: 'Hello Packet',
              italian: 'Pacchetto Hello',
              pronunciation: '/həˈloʊ ˈpækɪt/',
              phonetic: 'he-LOU PAK-ket',
              example:
                'OSPF sends hello packets to find neighbors. = OSPF invia pacchetti hello per trovare i vicini.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Neighbor',
              italian: 'Vicino',
              pronunciation: '/ˈneɪbər/',
              phonetic: 'NEI-ber',
              example:
                'Two OSPF routers become neighbors only after they exchange Hello packets and agree on area, hello interval and authentication. = Due router OSPF diventano vicini solo dopo aver scambiato pacchetti Hello e concordato area, hello interval e autenticazione.',
              context: 'routing',
              difficulty: 'intermediate',
              command: 'show ip ospf neighbor',
            },
            {
              english: 'Route Advertisement',
              italian: 'annuncio di rotta',
              pronunciation: '/ruːt ədˈvɜːrtaɪzmənt/',
              phonetic: 'RUUT ad-VER-taiz-ment',
              example:
                'Routers advertise their connected networks. = I router annunciano le proprie reti connesse.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Split Horizon',
              italian: 'orizzonte diviso (split horizon)',
              pronunciation: '/splɪt həˈraɪzn/',
              phonetic: 'SPLIT ho-RAI-zon',
              example:
                'As a security measure, Split Horizon prevents routing loops. = Lo split horizon previene loop di routing.',
              context: 'routing',
              difficulty: 'intermediate',
              note: "Non annunciare una rotta dall'interfaccia da cui l'hai imparata.",
            },
          ],
        },
        {
          id: 'net_routing_4',
          title: 'Layer 3 Concepts / Concetti Layer 3',
          description: 'Concetti avanzati di Layer 3',
          items: [
            {
              english: 'Routed Port',
              italian: 'porta routed',
              pronunciation: '/ˈruːtɪd pɔːrt/',
              phonetic: 'RU-tid PORT',
              example: `On an access switch, a routed port is a physical interface configured for Layer 3 instead of a VLAN, useful for point-to-point uplinks. = Su uno switch di accesso, una porta routed e' un'interfaccia fisica configurata per il Layer 3 invece che per una VLAN, utile per uplink punto-punto.`,
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'SVI',
              italian: 'interfaccia virtuale dello switch (SVI)',
              pronunciation: '/ˌes viː ˈaɪ/',
              phonetic: 'ES-VI-AI',
              example:
                "By definition, an SVI is a virtual L3 interface for a VLAN. = Una SVI è un'interfaccia L3 virtuale per una VLAN.",
              context: 'routing',
              difficulty: 'intermediate',
              code: 'interface vlan 10\\n ip address 10.0.0.1 255.255.255.0',
            },
            {
              english: 'Routing Loop',
              italian: 'loop di instradamento',
              pronunciation: '/ˈruːtɪŋ luːp/',
              phonetic: 'RU-ting LUUP',
              example:
                'Without split-horizon or route poisoning, a misconfigured network can develop a routing loop that causes packets to bounce between routers until TTL expires. = Senza split-horizon o route poisoning, una rete mal configurata puo sviluppare un loop di routing che fa rimbalzare i pacchetti tra i router fino alla scadenza del TTL.',
              context: 'routing',
              difficulty: 'intermediate',
              note: 'TTL impedisce loop infiniti.',
            },
            {
              english: 'Equal-Cost Multipath',
              italian: 'Multipath a costo uguale',
              pronunciation: '/ˈiːkwəl kɒst ˈmʌltɪpæθ/',
              phonetic: 'I-kual KOST MAL-ti-path',
              example:
                'ECMP balances traffic across equal paths. = ECMP bilancia il traffico su percorsi equivalenti.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'VRF',
              italian: 'instradamento virtuale (VRF)',
              pronunciation: '/ˌviː ɑːr ˈef/',
              phonetic: 'VI-AR-EF',
              example:
                'In practice, VRF creates separate routing tables. = VRF crea tabelle di routing separate.',
              context: 'routing',
              difficulty: 'intermediate',
              note: 'Permette overlapping IP su stesso router.',
            },
            {
              english: 'Loopback Interface',
              italian: 'Interfaccia loopback',
              pronunciation: '/ˈluːpbæk/',
              phonetic: 'LUP-bak',
              example:
                "Engineers assign the router ID on a loopback interface because it remains always up regardless of physical link failures. = Gli ingegneri assegnano il router ID su un'interfaccia loopback perché rimane sempre attiva indipendentemente dai guasti dei link fisici.",
              context: 'routing',
              difficulty: 'intermediate',
              code: 'interface loopback 0\\n ip address 1.1.1.1 255.255.255.255',
            },
            {
              english: 'Router ID',
              italian: 'ID del router',
              pronunciation: '/ˈruːtər aɪ diː/',
              phonetic: 'RU-ter AI-DI',
              example:
                "OSPF uses the router ID for identification. = OSPF usa il router ID per l'identificazione.",
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Redistribution',
              italian: 'ridistribuzione',
              pronunciation: '/ˌriːdɪstrɪˈbjuːʃən/',
              phonetic: 'ri-di-stri-BIU-scion',
              example:
                'Route redistribution shares routes between protocols. = La ridistribuzione di rotte condivide rotte tra protocolli.',
              context: 'routing',
              difficulty: 'intermediate',
              code: 'router ospf 1\\n redistribute static',
            },
            {
              english: 'Summarization',
              italian: 'riassunto delle rotte (summarization)',
              pronunciation: '/ˌsʌmərɪˈzeɪʃən/',
              phonetic: 'sa-me-rai-ZEI-scion',
              example:
                'Route summarization at area borders shrinks routing tables and hides internal topology changes from the rest of the network. = La summarization delle rotte ai confini delle aree riduce le tabelle di routing e nasconde i cambi di topologia interni al resto della rete.',
              context: 'routing',
              difficulty: 'intermediate',
            },
            {
              english: 'Bidirectional Forwarding Detection',
              italian: 'rilevamento di inoltro bidirezionale (BFD)',
              pronunciation: '/ˌbaɪdaɪˈrekʃənl/',
              phonetic: 'bai-dai-REK-scio-nal',
              example:
                'BFD detects link failures in milliseconds. = BFD rileva guasti del link in millisecondi.',
              context: 'routing',
              difficulty: 'intermediate',
              note: 'BFD rileva guasti di link in pochi millisecondi, molto più veloce dei timer hello dei protocolli di routing.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 6 - DNS / DNS
    // ════════════════════════════════════════════════
    6: {
      name: 'DNS / Domain Name System',
      description: 'Risoluzione dei nomi a dominio',
      lessons: [
        {
          id: 'net_dns_1',
          title: 'DNS Basics / Basi DNS',
          description: 'Introduzione al sistema dei nomi a dominio',
          items: [
            {
              english: 'DNS',
              italian: 'sistema dei nomi di dominio (DNS)',
              pronunciation: '/ˌdiː en ˈes/',
              phonetic: 'DI-EN-ES',
              example:
                'In networking, DNS translates names to IP addresses. = DNS traduce i nomi in indirizzi IP.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Domain Name System. La "rubrica telefonica" di Internet.',
            },
            {
              english: 'Domain',
              italian: 'dominio',
              pronunciation: '/dəˈmeɪn/',
              phonetic: 'do-MEIN',
              example:
                'Before reaching the web server, the browser must resolve the domain name example.com to its corresponding IP address. = Prima di raggiungere il web server, il browser deve risolvere il nome di dominio example.com nel suo indirizzo IP corrispondente.',
              context: 'dns',
              difficulty: 'intermediate',
            },
            {
              english: 'Subdomain',
              italian: 'sottodominio',
              pronunciation: '/ˈsʌbdoʊmeɪn/',
              phonetic: 'SAB-do-mein',
              example:
                'The mail team hosts their servers under the subdomain mail.example.com, which resolves to a different IP than the main site. = Il team mail ospita i propri server sotto il sottodominio mail.example.com, che risolve a un IP diverso dal sito principale.',
              context: 'dns',
              difficulty: 'intermediate',
            },
            {
              english: 'TLD',
              italian: 'dominio di primo livello (TLD)',
              pronunciation: '/ˌtiː el ˈdiː/',
              phonetic: 'TI-EL-DI',
              example:
                'Registrars assign domain names under TLDs like .com for commercial sites and .org for non-profit organizations. = I registrar assegnano nomi di dominio sotto TLD come .com per siti commerciali e .org per organizzazioni non-profit.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Top-Level Domain.',
            },
            {
              english: 'FQDN',
              italian: 'nome di dominio completo (FQDN)',
              pronunciation: '/ˌef kjuː diː ˈen/',
              phonetic: 'EF-KIU-DI-EN',
              example:
                "The trailing dot in the FQDN www.example.com. explicitly marks the root of the DNS hierarchy. = Il punto finale nell'FQDN www.example.com. segna esplicitamente la radice della gerarchia DNS.",
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Fully Qualified Domain Name. Termina con punto.',
            },
            {
              english: 'Root Server',
              italian: 'server radice (root server)',
              pronunciation: '/ruːt ˈsɜːrvər/',
              phonetic: 'RUUT SER-ver',
              example:
                'There are 13 logical root servers worldwide. = Ci sono 13 root server logici nel mondo.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Lettere a-m.root-servers.net.',
            },
            {
              english: 'Authoritative Server',
              italian: 'server autorevole',
              pronunciation: '/əˈθɒrɪteɪtɪv/',
              phonetic: 'a-THO-ri-tei-tiv',
              example:
                'By design, the Authoritative Server has the official records. = Il server autoritativo ha i record ufficiali.',
              context: 'dns',
              difficulty: 'intermediate',
            },
            {
              english: 'Resolver',
              italian: 'risolutore (resolver)',
              pronunciation: '/rɪˈzɒlvər/',
              phonetic: 'ri-SOL-ver',
              example:
                'A DNS resolver queries on behalf of clients. = Un resolver DNS interroga per conto dei client.',
              context: 'dns',
              difficulty: 'intermediate',
              command: 'cat /etc/resolv.conf',
            },
            {
              english: 'Recursive Query',
              italian: 'query ricorsiva',
              pronunciation: '/rɪˈkɜːrsɪv ˈkwɪəri/',
              phonetic: 'ri-KER-siv KUI-ri',
              example:
                'In networking, a Recursive Query gets the final answer. = Una query ricorsiva ottiene la risposta finale.',
              context: 'dns',
              difficulty: 'intermediate',
            },
            {
              english: 'Iterative Query',
              italian: 'query iterativa',
              pronunciation: '/ˈɪtərətɪv ˈkwɪəri/',
              phonetic: 'I-te-ra-tiv KUI-ri',
              example:
                'A root server answers an iterative query by referring the resolver to the TLD server rather than resolving the name itself. = Un root server risponde a una query iterativa rinviando il resolver al server TLD invece di risolvere il nome da solo.',
              context: 'dns',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_dns_2',
          title: 'DNS Records / Record DNS',
          description: 'I principali tipi di record DNS',
          items: [
            {
              english: 'A Record',
              italian: 'record A',
              pronunciation: '/eɪ ˈrekɔːrd/',
              phonetic: 'EI RE-kord',
              example:
                'In DNS resolution, an A Record maps a name to an IPv4 address. = Un record A mappa un nome a un indirizzo IPv4.',
              context: 'dns',
              difficulty: 'intermediate',
              command: 'dig example.com A',
            },
            {
              english: 'AAAA Record',
              italian: 'record AAAA',
              pronunciation: '/ˈkwɒdrəpl eɪ/',
              phonetic: 'KUOD-ru-pol EI',
              example:
                "When a dual-stack client queries DNS for an IPv6 address, the resolver returns the AAAA record mapping the hostname to its 128-bit address. = Quando un client dual-stack interroga il DNS per un indirizzo IPv6, il resolver restituisce il record AAAA che mappa l'hostname al suo indirizzo a 128 bit.",
              context: 'dns',
              difficulty: 'intermediate',
              command: 'dig example.com AAAA',
              note: 'Letto "quad-A".',
            },
            {
              english: 'CNAME',
              italian: 'nome canonico (CNAME)',
              pronunciation: '/ˈsiːneɪm/',
              phonetic: 'SI-NEIM',
              example:
                'In networking, a CNAME aliases one name to another. = Un CNAME aliasa un nome a un altro.',
              context: 'dns',
              difficulty: 'intermediate',
              command: 'dig www.example.com CNAME',
            },
            {
              english: 'MX Record',
              italian: 'record MX',
              pronunciation: '/em eks/',
              phonetic: 'EM-EKS',
              example:
                "When sending email to user@company.com, the MTA queries MX records to discover which mail servers accept messages for that domain. = Quando invia email a user@company.com, l'MTA interroga i record MX per scoprire quali server di posta accettano messaggi per quel dominio.",
              context: 'dns',
              difficulty: 'intermediate',
              command: 'dig example.com MX',
              note: 'Mail eXchanger. Hanno priorità.',
            },
            {
              english: 'TXT Record',
              italian: 'record TXT',
              pronunciation: '/tekst/',
              phonetic: 'TEKST',
              example:
                "Email security relies on SPF and DKIM policies stored as TXT records that receivers check to validate message authenticity. = La sicurezza email si basa su policy SPF e DKIM memorizzate come record TXT che i riceventi controllano per validare l'autenticita dei messaggi.",
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Usati per SPF, DKIM, DMARC, verifiche.',
            },
            {
              english: 'NS Record',
              italian: 'record NS',
              pronunciation: '/en es/',
              phonetic: 'EN-ES',
              example:
                'During domain delegation, the parent zone publishes NS records that point resolvers to the authoritative nameservers for the child zone. = Durante la delega del dominio, la zona padre pubblica record NS che indirizzano i resolver ai nameserver autoritativi per la zona figlia.',
              context: 'dns',
              difficulty: 'intermediate',
              command: 'dig example.com NS',
            },
            {
              english: 'PTR Record',
              italian: 'record PTR',
              pronunciation: '/piː tiː ɑːr/',
              phonetic: 'PI-TI-AR',
              example:
                'Mail servers often reject messages from senders whose IP address lacks a valid PTR record for reverse DNS verification. = I server di posta spesso rifiutano messaggi da mittenti il cui indirizzo IP manca di un record PTR valido per la verifica DNS inversa.',
              context: 'dns',
              difficulty: 'intermediate',
              command: 'dig -x 8.8.8.8',
            },
            {
              english: 'SOA Record',
              italian: 'record SOA',
              pronunciation: '/es oʊ eɪ/',
              phonetic: 'ES-O-EI',
              example:
                'To standardize communication, the SOA Record defines zone parameters. = Il record SOA definisce i parametri di zona.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Start Of Authority.',
            },
            {
              english: 'SRV Record',
              italian: 'record SRV',
              pronunciation: '/es ɑːr viː/',
              phonetic: 'ES-AR-VI',
              example:
                'Active Directory clients discover domain controllers by querying SRV records that specify the hostname and port for LDAP services. = I client Active Directory scoprono i domain controller interrogando record SRV che specificano hostname e porta per i servizi LDAP.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Usati da SIP, XMPP, LDAP.',
            },
            {
              english: 'CAA Record',
              italian: 'record CAA',
              pronunciation: '/siː eɪ eɪ/',
              phonetic: 'SI-EI-EI',
              example:
                "To prevent unauthorized certificate issuance, the domain owner publishes a CAA record specifying which Certificate Authorities may issue certificates. = Per prevenire l'emissione non autorizzata di certificati, il proprietario del dominio pubblica un record CAA specificando quali Certificate Authority possono emettere certificati.",
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Certificate Authority Authorization.',
            },
          ],
        },
        {
          id: 'net_dns_3',
          title: 'DNS Operations / Operazioni DNS',
          description: 'Caching, zone transfer e gestione',
          items: [
            {
              english: 'DNS Cache',
              italian: 'cache DNS',
              pronunciation: '/ˌdiː en es kæʃ/',
              phonetic: 'DI-EN-ES KASH',
              example:
                'Flushing the local DNS cache after changing an A record forces the OS to re-query the authoritative server. = Svuotare la cache DNS locale dopo aver cambiato un record A obbliga il sistema operativo a riconsultare il server autoritativo.',
              context: 'dns',
              difficulty: 'intermediate',
              command: 'systemd-resolve --statistics',
            },
            {
              english: 'DNS TTL',
              italian: 'TTL DNS',
              pronunciation: '/ˌtiː tiː ˈel/',
              phonetic: 'TI-TI-EL',
              example:
                'A short DNS TTL means resolvers re-query the authoritative server often, useful right before a planned cutover. = Un TTL DNS breve significa che i resolver riconsultano il server autoritativo spesso, utile poco prima di un cutover pianificato.',
              context: 'dns',
              difficulty: 'intermediate',
              note: `Non confondere con il TTL dell'header IP, che invece limita gli hop di un pacchetto.`,
            },
            {
              english: 'Zone',
              italian: 'zona DNS',
              pronunciation: '/zoʊn/',
              phonetic: 'ZOUN',
              example:
                'A DNS zone is a portion of the namespace. = Una zona DNS è una porzione del namespace.',
              context: 'dns',
              difficulty: 'intermediate',
            },
            {
              english: 'Zone File',
              italian: 'file di zona',
              pronunciation: '/zoʊn faɪl/',
              phonetic: 'ZOUN FAIL',
              example:
                'For reference, a Zone File lists records for a domain. = Un file di zona elenca i record di un dominio.',
              context: 'dns',
              difficulty: 'intermediate',
              tool: 'BIND, NSD',
            },
            {
              english: 'Zone Transfer',
              italian: 'trasferimento di zona',
              pronunciation: '/zoʊn ˈtrænsfər/',
              phonetic: 'ZOUN TRANS-fer',
              example:
                'For redundancy, the secondary DNS server performs a zone transfer every hour to replicate all resource records from the primary master. = Per ridondanza, il server DNS secondario esegue un trasferimento di zona ogni ora per replicare tutti i record di risorsa dal master primario.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'AXFR (full) e IXFR (incremental).',
            },
            {
              english: 'Glue Record',
              italian: 'record glue',
              pronunciation: '/ɡluː ˈrekɔːrd/',
              phonetic: 'GLU RE-kord',
              example:
                "When a nameserver's hostname lives inside the zone it serves, the parent zone must include a glue record to break the circular dependency. = Quando l'hostname di un nameserver si trova dentro la zona che serve, la zona padre deve includere un glue record per spezzare la dipendenza circolare.",
              context: 'dns',
              difficulty: 'intermediate',
            },
            {
              english: 'Reverse DNS',
              italian: 'DNS inverso',
              pronunciation: '/rɪˈvɜːrs/',
              phonetic: 'ri-VERS',
              example:
                'In DNS resolution, Reverse DNS maps IPs back to names. = Il DNS inverso mappa IP a nomi.',
              context: 'dns',
              difficulty: 'intermediate',
              command: 'host 8.8.8.8',
            },
            {
              english: 'Round Robin DNS',
              italian: 'DNS round robin',
              pronunciation: '/raʊnd ˈrɒbɪn/',
              phonetic: 'RAUND RO-bin',
              example:
                'In networking, Round Robin DNS rotates through IP addresses. = Round robin DNS ruota tra gli indirizzi IP.',
              context: 'dns',
              difficulty: 'intermediate',
            },
            {
              english: 'Anycast DNS',
              italian: 'DNS anycast',
              pronunciation: '/ˈeniːkæst/',
              phonetic: 'E-ni-kast',
              example:
                'In the forwarding pipeline, Anycast DNS routes to the nearest server. = Il DNS anycast instrada al server più vicino.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Usato da Cloudflare 1.1.1.1, Google 8.8.8.8.',
            },
            {
              english: 'Negative Caching',
              italian: 'cache negativa',
              pronunciation: '/ˈneɡətɪv/',
              phonetic: 'NE-ga-tiv',
              example:
                'For efficiency, Negative Caching stores NXDOMAIN responses. = Il caching negativo memorizza risposte NXDOMAIN.',
              context: 'dns',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_dns_4',
          title: 'DNS Security / Sicurezza DNS',
          description: 'DNSSEC e DNS over HTTPS',
          items: [
            {
              english: 'DNSSEC',
              italian: 'DNSSEC',
              pronunciation: '/ˌdiː en es ˈsek/',
              phonetic: 'DI-EN-ES-SEK',
              example:
                'In networking, DNSSEC adds cryptographic signatures to DNS. = DNSSEC aggiunge firme crittografiche al DNS.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'DNS Security Extensions. Previene cache poisoning.',
            },
            {
              english: 'DoT',
              italian: 'DNS over TLS (DoT)',
              pronunciation: '/ˌdiː oʊ ˈtiː/',
              phonetic: 'DI-O-TI',
              example:
                'For confidentiality, DoT encrypts DNS queries on port 853. = DoT cifra le query DNS sulla porta 853.',
              context: 'dns',
              difficulty: 'intermediate',
            },
            {
              english: 'DoH',
              italian: 'DNS over HTTPS (DoH)',
              pronunciation: '/ˌdiː oʊ ˈeɪtʃ/',
              phonetic: 'DI-O-EICH',
              example:
                'In networking, DoH tunnels DNS through HTTPS. = DoH incanala il DNS attraverso HTTPS.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Usato da Firefox, Chrome.',
            },
            {
              english: 'DNS Cache Poisoning',
              italian: 'avvelenamento della cache DNS',
              pronunciation: '/ˈpɔɪzənɪŋ/',
              phonetic: 'POI-ze-ning',
              example:
                "Cache poisoning injects false DNS records. = L'avvelenamento cache inietta record DNS falsi.",
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Attacco Kaminsky del 2008.',
            },
            {
              english: 'DNS Hijacking',
              italian: 'dirottamento DNS (DNS hijacking)',
              pronunciation: '/ˈhaɪdʒækɪŋ/',
              phonetic: 'HAI-gia-king',
              example:
                'In networking, DNS Hijacking redirects users to malicious sites. = Il DNS hijacking reindirizza utenti a siti malevoli.',
              context: 'dns',
              difficulty: 'intermediate',
            },
            {
              english: 'NXDOMAIN',
              italian: 'NXDOMAIN',
              pronunciation: '/ˌen eks doʊˈmeɪn/',
              phonetic: 'EN-EKS do-MEIN',
              example:
                'In networking, NXDOMAIN means the name does not exist. = NXDOMAIN significa che il nome non esiste.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Non-eXistent Domain.',
            },
            {
              english: 'Wildcard Record',
              italian: 'record wildcard',
              pronunciation: '/ˈwaɪldkɑːrd/',
              phonetic: 'UAILD-kard',
              example:
                'In networking, a Wildcard Record matches any subdomain. = Un record wildcard corrisponde a qualsiasi sottodominio.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Esempio: *.example.com.',
            },
            {
              english: 'Split-Horizon DNS',
              italian: 'DNS a orizzonte diviso (split-horizon)',
              pronunciation: '/splɪt həˈraɪzn/',
              phonetic: 'SPLIT ho-RAI-zon',
              example:
                'In networking, Split-Horizon DNS gives different answers per network. = Il DNS split-horizon dà risposte diverse per rete.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Anche detto split-brain DNS.',
            },
            {
              english: 'DNS Tunneling',
              italian: 'tunneling DNS',
              pronunciation: '/ˈtʌnəlɪŋ/',
              phonetic: 'TA-ne-ling',
              example:
                'When properly configured, DNS Tunneling can exfiltrate data. = Il DNS tunneling può esfiltrare dati.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Tecnica di covert channel usata in attacchi.',
            },
            {
              english: 'EDNS',
              italian: 'DNS esteso (EDNS)',
              pronunciation: '/ˌiː ˈdiː en es/',
              phonetic: 'I-DI-EN-ES',
              example:
                'For better performance, EDNS allows larger DNS messages. = EDNS permette messaggi DNS più grandi.',
              context: 'dns',
              difficulty: 'intermediate',
              note: 'Necessario per DNSSEC.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 7 - HTTP E WEB / HTTP & WEB
    // ════════════════════════════════════════════════
    7: {
      name: 'HTTP e Web / HTTP & Web',
      description: 'Protocolli web e TLS',
      lessons: [
        {
          id: 'net_protocols_1',
          title: 'HTTP Versions / Versioni HTTP',
          description: 'Evoluzione del protocollo HTTP',
          items: [
            {
              english: 'HTTP',
              italian: 'protocollo di trasferimento ipertestuale (HTTP)',
              pronunciation: '/ˌeɪtʃ tiː tiː ˈpiː/',
              phonetic: 'EICH-TI-TI-PI',
              example:
                'By definition, HTTP is the foundation of the Web. = HTTP è il fondamento del Web.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'HyperText Transfer Protocol.',
            },
            {
              english: 'HTTP/1.1',
              italian: 'HTTP/1.1',
              pronunciation: '/ˌeɪtʃ tiː tiː piː wʌn pɔɪnt wʌn/',
              phonetic: 'EICH-TI-TI-PI UAN-POINT-UAN',
              example:
                'In networking, HTTP/1.1 introduced persistent connections. = HTTP/1.1 ha introdotto connessioni persistenti.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'RFC 2616, oggi RFC 7230-7235.',
            },
            {
              english: 'HTTP/2',
              italian: 'HTTP/2',
              pronunciation: '/ˌeɪtʃ tiː tiː piː tuː/',
              phonetic: 'EICH-TI-TI-PI TU',
              example:
                'In networking, HTTP/2 multiplexes requests over one TCP connection. = HTTP/2 multiplexa richieste su una connessione TCP.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Basato su SPDY di Google.',
            },
            {
              english: 'HTTP/3',
              italian: 'HTTP/3',
              pronunciation: '/ˌeɪtʃ tiː tiː piː θriː/',
              phonetic: 'EICH-TI-TI-PI THRI',
              example:
                'In production environments, HTTP/3 runs over QUIC instead of TCP. = HTTP/3 gira su QUIC invece di TCP.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Standardizzato nel 2022.',
            },
            {
              english: 'HTTPS',
              italian: 'HTTP sicuro (HTTPS)',
              pronunciation: '/ˌeɪtʃ tiː tiː piː ˈes/',
              phonetic: 'EICH-TI-TI-PI-ES',
              example:
                'For confidentiality, HTTPS encrypts HTTP traffic with TLS. = HTTPS cifra il traffico HTTP con TLS.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'Persistent Connection',
              italian: 'connessione persistente',
              pronunciation: '/pərˈsɪstənt/',
              phonetic: 'per-SIS-tent',
              example:
                'Modern browsers keep a persistent connection open so that multiple HTTP requests share the same TCP socket, reducing latency significantly. = I browser moderni mantengono una connessione persistente aperta cosi che piu richieste HTTP condividano lo stesso socket TCP, riducendo significativamente la latenza.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Anche detto Keep-Alive.',
            },
            {
              english: 'Pipelining',
              italian: 'pipelining',
              pronunciation: '/ˈpaɪpˌlaɪnɪŋ/',
              phonetic: 'PAIP-lai-ning',
              example:
                'HTTP/1.1 pipelining lets a client send several requests on the same TCP connection without waiting for each response. = Il pipelining di HTTP/1.1 permette al client di inviare più richieste sulla stessa connessione TCP senza attendere ogni risposta.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Sostituito dal multiplexing in HTTP/2.',
            },
            {
              english: 'Multiplexing',
              italian: 'multiplazione',
              pronunciation: '/ˈmʌltɪpleksɪŋ/',
              phonetic: 'MAL-ti-plek-sing',
              example:
                'HTTP/2 multiplexing avoids head-of-line blocking. = Il multiplexing HTTP/2 evita head-of-line blocking.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'Server Push',
              italian: 'push del server (server push)',
              pronunciation: '/ˈsɜːrvər pʊʃ/',
              phonetic: 'SER-ver PUSH',
              example:
                'HTTP/2 server push proactively sends resources. = Il server push HTTP/2 invia risorse proattivamente.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Deprecato in Chrome.',
            },
            {
              english: 'Head-of-Line Blocking',
              italian: 'blocco head-of-line',
              pronunciation: '/hed ʌv laɪn/',
              phonetic: 'HED-ov-LAIN',
              example:
                'HoL blocking slowed HTTP/1.1 with multiple requests. = Il HoL blocking rallentava HTTP/1.1 con richieste multiple.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_protocols_2',
          title: 'HTTP Messages / Messaggi HTTP',
          description: 'Struttura di richieste e risposte',
          items: [
            {
              english: 'Request',
              italian: 'richiesta',
              pronunciation: '/rɪˈkwest/',
              phonetic: 'ri-KUEST',
              example:
                'Every HTTP request includes a method, a path, headers and optionally a body sent to the server. = Ogni richiesta HTTP include un metodo, un path, header e opzionalmente un body inviato al server.',
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'curl https://example.com',
            },
            {
              english: 'Response',
              italian: 'risposta',
              pronunciation: '/rɪˈspɒns/',
              phonetic: 'ri-SPONS',
              example:
                'The HTTP response includes a status code. = La risposta HTTP include un codice di stato.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'HTTP Header',
              italian: 'header HTTP',
              pronunciation: '/ˈhedər/',
              phonetic: 'HED-er',
              example: `The User-Agent HTTP header tells the server which browser or client library is making the request. = L'header HTTP User-Agent indica al server quale browser o libreria client sta facendo la richiesta.`,
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'curl -I https://example.com',
            },
            {
              english: 'Request Method',
              italian: 'metodo di richiesta',
              pronunciation: '/rɪˈkwest ˈmeθəd/',
              phonetic: 'ri-KUEST ME-thod',
              example:
                'GET, POST, PUT, DELETE are common methods. = GET, POST, PUT, DELETE sono metodi comuni.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'GET',
              italian: 'GET',
              pronunciation: '/ɡet/',
              phonetic: 'GHET',
              example:
                'In networking, GET requests should not modify state. = Le richieste GET non dovrebbero modificare stato.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'POST',
              italian: 'POST',
              pronunciation: '/poʊst/',
              phonetic: 'POUST',
              example:
                'During communication, POST sends data in the request body. = POST invia dati nel corpo della richiesta.',
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'curl -X POST -d "x=1" https://api.example.com',
            },
            {
              english: 'Status Code',
              italian: 'codice di stato',
              pronunciation: '/ˈsteɪtəs koʊd/',
              phonetic: 'STEI-tus KOUD',
              example:
                "After the API processes the POST request successfully, the server returns status code 200 OK along with the response payload. = Dopo che l'API elabora la richiesta POST con successo, il server restituisce il codice di stato 200 OK insieme al payload di risposta.",
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: '404 Not Found',
              italian: '404 Non trovato',
              pronunciation: '/fɔːr oʊ fɔːr/',
              phonetic: 'FOR-O-FOR',
              example: `Returning 404 Not Found means the URL is valid syntax but the requested resource does not exist on the server. = Restituire 404 Not Found significa che l'URL e' sintatticamente valido ma la risorsa richiesta non esiste sul server.`,
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: '500 Internal Server Error',
              italian: '500 Errore interno del server',
              pronunciation: '/faɪv hʌndrəd/',
              phonetic: 'FAIV-HAN-dred',
              example: `A 500 Internal Server Error usually points to an unhandled exception in the backend rather than a problem with the request. = Un 500 Internal Server Error di solito indica un'eccezione non gestita nel backend piuttosto che un problema con la richiesta.`,
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'User Agent',
              italian: 'agente utente (user agent)',
              pronunciation: '/ˈjuːzər ˈeɪdʒənt/',
              phonetic: 'IU-zer EI-gent',
              example:
                "The User-Agent header identifies the client. = L'header User-Agent identifica il client.",
              context: 'protocols',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_protocols_3',
          title: 'TLS / TLS',
          description: 'Cifratura del traffico web',
          items: [
            {
              english: 'TLS',
              italian: 'Transport Layer Security (TLS)',
              pronunciation: '/ˌtiː el ˈes/',
              phonetic: 'TI-EL-ES',
              example:
                'For network operations, TLS provides encryption and authentication. = TLS fornisce cifratura e autenticazione.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Successore di SSL.',
            },
            {
              english: 'SSL',
              italian: 'Secure Sockets Layer (SSL)',
              pronunciation: '/ˌes es ˈel/',
              phonetic: 'ES-ES-EL',
              example:
                'By definition, SSL is the predecessor of TLS. = SSL è il predecessore di TLS.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Tutte le versioni di SSL sono ora insicure.',
            },
            {
              english: 'TLS Handshake',
              italian: 'handshake TLS',
              pronunciation: '/ˌtiː el es ˈhændʃeɪk/',
              phonetic: 'TI-EL-ES HAND-scheik',
              example:
                "In networking, the TLS Handshake negotiates encryption. = L'handshake TLS negozia la cifratura.",
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'Certificate',
              italian: 'certificato digitale',
              pronunciation: '/sərˈtɪfɪkət/',
              phonetic: 'ser-TI-fi-ket',
              example:
                "A TLS certificate proves server identity. = Un certificato TLS prova l'identità del server.",
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'openssl s_client -connect example.com:443',
            },
            {
              english: 'Certificate Authority',
              italian: 'autorità di certificazione (CA)',
              pronunciation: '/əˈθɒrɪti/',
              phonetic: 'a-THO-ri-ti',
              example:
                'Before issuing a TLS certificate, the Certificate Authority validates domain ownership through DNS or HTTP challenge verification. = Prima di emettere un certificato TLS, la Certificate Authority valida la proprieta del dominio tramite verifica DNS o HTTP.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: "Esempi: Let's Encrypt, DigiCert.",
            },
            {
              english: 'Cipher Suite',
              italian: 'suite crittografica (cipher suite)',
              pronunciation: '/ˈsaɪfər swiːt/',
              phonetic: 'SAI-fer SUIT',
              example:
                'In networking, the Cipher Suite combines algorithms. = La suite crittografica combina algoritmi.',
              context: 'protocols',
              difficulty: 'intermediate',
              code: 'TLS_AES_256_GCM_SHA384',
            },
            {
              english: 'SNI',
              italian: 'indicazione nome server (SNI)',
              pronunciation: '/ˌes en ˈaɪ/',
              phonetic: 'ES-EN-AI',
              example:
                'For flexibility, SNI lets multiple sites share an IP. = SNI permette a più siti di condividere un IP.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'TLS 1.3',
              italian: 'TLS 1.3',
              pronunciation: '/ˌtiː el es wʌn pɔɪnt θriː/',
              phonetic: 'TI-EL-ES UAN-POINT-THRI',
              example:
                'By definition, TLS 1.3 is faster and more secure. = TLS 1.3 è più veloce e sicuro.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Standard dal 2018, RFC 8446.',
            },
            {
              english: 'Mutual TLS',
              italian: 'TLS reciproco (mTLS)',
              pronunciation: '/ˈmjuːtʃuəl/',
              phonetic: 'MIU-ciu-al',
              example:
                "In a zero-trust microservices architecture, mutual TLS (mTLS) requires both the client and server to present valid certificates. = In un'architettura microservizi zero-trust, il mutual TLS (mTLS) richiede che sia il client che il server presentino certificati validi.",
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Comune in zero trust e service mesh.',
            },
            {
              english: 'OCSP',
              italian: 'protocollo di stato dei certificati online (OCSP)',
              pronunciation: '/ˌoʊ siː es ˈpiː/',
              phonetic: 'O-SI-ES-PI',
              example:
                'In networking, OCSP checks if a certificate is revoked. = OCSP verifica se un certificato è revocato.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Online Certificate Status Protocol.',
            },
          ],
        },
        {
          id: 'net_protocols_4',
          title: 'Web Concepts / Concetti Web',
          description: 'Cookie, sessioni e altre primitive',
          items: [
            {
              english: 'Cookie',
              italian: 'cookie',
              pronunciation: '/ˈkʊki/',
              phonetic: 'KU-ki',
              example:
                'After login, the server issues a session cookie so the browser can maintain session state across subsequent HTTP requests. = Dopo il login, il server emette un cookie di sessione cosi che il browser possa mantenere lo stato di sessione nelle richieste HTTP successive.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'Session',
              italian: 'sessione',
              pronunciation: '/ˈseʃən/',
              phonetic: 'SES-scion',
              example:
                "For accountability, a Session tracks the user across requests. = Una sessione traccia l'utente tra richieste.",
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'CORS',
              italian: 'condivisione risorse tra origini (CORS)',
              pronunciation: '/kɔːrz/',
              phonetic: 'KORZ',
              example:
                'For better performance, CORS allows controlled cross-origin requests. = CORS permette richieste cross-origin controllate.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'Same-Origin Policy',
              italian: 'politica della stessa origine',
              pronunciation: '/seɪm ˈɒrɪdʒɪn/',
              phonetic: 'SEIM O-ri-gin',
              example:
                'In networking, the Same-Origin Policy isolates websites. = La policy stessa origine isola i siti web.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'WebSocket',
              italian: 'WebSocket',
              pronunciation: '/web ˈsɒkɪt/',
              phonetic: 'UEB-SO-ket',
              example:
                'Real-time chat applications rely on WebSocket connections to push messages from the server to the client without polling. = Le applicazioni di chat in tempo reale si affidano a connessioni WebSocket per inviare messaggi dal server al client senza polling.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Inizia con HTTP upgrade.',
            },
            {
              english: 'REST',
              italian: 'REST',
              pronunciation: '/rest/',
              phonetic: 'REST',
              example:
                'In networking, REST APIs follow HTTP conventions. = Le API REST seguono le convenzioni HTTP.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Representational State Transfer.',
            },
            {
              english: 'JSON',
              italian: 'JSON',
              pronunciation: '/ˈdʒeɪsən/',
              phonetic: 'GEI-son',
              example:
                'By definition, JSON is the common format for REST APIs. = JSON è il formato comune per le API REST.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'URI',
              italian: 'identificatore di risorsa uniforme (URI)',
              pronunciation: '/ˌjuː ɑːr ˈaɪ/',
              phonetic: 'IU-AR-AI',
              example:
                'During analysis, a URI identifies a resource. = Un URI identifica una risorsa.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Uniform Resource Identifier.',
            },
            {
              english: 'URL',
              italian: 'localizzatore di risorsa uniforme (URL)',
              pronunciation: '/ˌjuː ɑːr ˈel/',
              phonetic: 'IU-AR-EL',
              example:
                'By definition, a URL is a URI with a location. = Un URL è un URI con una posizione.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'Redirect',
              italian: 'reindirizzamento (redirect)',
              pronunciation: '/rɪˈdaɪrekt/',
              phonetic: 'ri-DAI-rekt',
              example:
                'When migrating from HTTP to HTTPS, administrators configure a 301 redirect so browsers and search engines update their cached URLs permanently. = Durante la migrazione da HTTP a HTTPS, gli amministratori configurano un redirect 301 cosi che browser e motori di ricerca aggiornino permanentemente gli URL in cache.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 8 - WIRELESS / WIRELESS
    // ════════════════════════════════════════════════
    8: {
      name: 'Wireless / Wireless',
      description: 'Reti Wi-Fi e radio',
      lessons: [
        {
          id: 'net_wireless_1',
          title: 'Wi-Fi Basics / Basi Wi-Fi',
          description: 'Concetti fondamentali del Wi-Fi',
          items: [
            {
              english: 'Wi-Fi',
              italian: 'Wi-Fi',
              pronunciation: '/ˈwaɪfaɪ/',
              phonetic: 'UAI-FAI',
              example:
                'In the network topology, Wi-Fi connects devices wirelessly. = Wi-Fi connette dispositivi senza fili.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Trademark della Wi-Fi Alliance per IEEE 802.11.',
            },
            {
              english: 'SSID',
              italian: 'identificatore della rete (SSID)',
              pronunciation: '/ˌes es aɪ ˈdiː/',
              phonetic: 'ES-ES-AI-DI',
              example:
                "By definition, the SSID is the name of a wireless network. = L'SSID è il nome di una rete wireless.",
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Service Set Identifier. Massimo 32 caratteri.',
            },
            {
              english: 'BSSID',
              italian: "MAC dell'access point (BSSID)",
              pronunciation: '/ˌbiː es es aɪ ˈdiː/',
              phonetic: 'BI-ES-ES-AI-DI',
              example:
                "By definition, the BSSID is the MAC of the access point. = Il BSSID è il MAC dell'access point.",
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Basic SSID.',
            },
            {
              english: 'wireless access point',
              italian: 'access point wireless',
              pronunciation: '/ˈækses pɔɪnt/',
              phonetic: 'AK-ses POINT',
              example: `A wireless access point bridges Wi-Fi clients to the wired LAN and is centrally managed by the wireless LAN controller. = Un access point wireless fa da ponte tra i client Wi-Fi e la LAN cablata ed e' gestito centralmente dal controller wireless.`,
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Abbreviato AP, è il punto di ingresso radio per i dispositivi mobili.',
            },
            {
              english: 'Channel',
              italian: 'canale',
              pronunciation: '/ˈtʃænl/',
              phonetic: 'CIA-nel',
              example:
                'Wi-Fi channels operate on specific frequencies. = I canali Wi-Fi operano su frequenze specifiche.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: '2.4 GHz: 1, 6, 11 non sovrapposti.',
            },
            {
              english: 'Frequency',
              italian: 'frequenza',
              pronunciation: '/ˈfriːkwənsi/',
              phonetic: 'FRI-kuen-si',
              example:
                'Wi-Fi operates at 2.4 GHz, 5 GHz and 6 GHz. = Wi-Fi opera a 2.4 GHz, 5 GHz e 6 GHz.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Signal Strength',
              italian: 'potenza del segnale',
              pronunciation: '/ˈsɪɡnəl streŋkθ/',
              phonetic: 'SIG-nal STRENKTH',
              example:
                'By definition, Signal Strength is measured in dBm. = La potenza del segnale è misurata in dBm.',
              context: 'wireless',
              difficulty: 'intermediate',
              command: 'iwconfig',
              note: '-50 dBm = ottimo, -90 dBm = scarso.',
            },
            {
              english: 'Beacon',
              italian: 'annuncio periodico (beacon)',
              pronunciation: '/ˈbiːkən/',
              phonetic: 'BI-kon',
              example:
                "APs broadcast beacons to advertise the SSID. = Gli AP trasmettono beacon per annunciare l'SSID.",
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Tipicamente ogni 100ms.',
            },
            {
              english: 'Probe Request',
              italian: 'richiesta probe',
              pronunciation: '/proʊb rɪˈkwest/',
              phonetic: 'PROUB ri-KUEST',
              example:
                'Clients send probe requests to discover networks. = I client inviano probe request per scoprire reti.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Association',
              italian: 'associazione',
              pronunciation: '/əˌsoʊsiˈeɪʃən/',
              phonetic: 'as-so-ci-EI-scion',
              example:
                "A client associates with the AP to join. = Un client si associa all'AP per unirsi.",
              context: 'wireless',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_wireless_2',
          title: 'Wi-Fi Standards / Standard Wi-Fi',
          description: '802.11 e le sue varianti',
          items: [
            {
              english: '802.11',
              italian: '802.11',
              pronunciation: '/eɪt oʊ tuː dɒt ɪˈlevən/',
              phonetic: 'EIT-O-TU dot i-LE-ven',
              example:
                'IEEE 802.11 is the Wi-Fi standard family. = IEEE 802.11 è la famiglia di standard Wi-Fi.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: '802.11ac',
              italian: '802.11ac',
              pronunciation: '/eɪ siː/',
              phonetic: 'EI-SI',
              example:
                'In networking, 802.11ac introduced gigabit Wi-Fi. = 802.11ac ha introdotto il Wi-Fi a gigabit.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Standard IEEE noto commercialmente come Wi-Fi 5, opera in banda 5 GHz.',
            },
            {
              english: '802.11ax',
              italian: '802.11ax',
              pronunciation: '/eɪ eks/',
              phonetic: 'EI-EKS',
              example:
                'By definition, 802.11ax is also called Wi-Fi 6. = 802.11ax è anche chiamato Wi-Fi 6.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Standard IEEE noto commercialmente come Wi-Fi 6, introduce OFDMA e MU-MIMO uplink.',
            },
            {
              english: 'Wi-Fi 6E',
              italian: 'Wi-Fi 6E',
              pronunciation: '/ˈwaɪfaɪ sɪks ˈiː/',
              phonetic: 'UAI-FAI SIKS-I',
              example:
                'In networking, Wi-Fi 6E adds the 6 GHz band. = Wi-Fi 6E aggiunge la banda a 6 GHz.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Wi-Fi 7',
              italian: 'Wi-Fi 7',
              pronunciation: '/ˈwaɪfaɪ ˈsevən/',
              phonetic: 'UAI-FAI SE-ven',
              example:
                'In networking, Wi-Fi 7 supports 320 MHz channels. = Wi-Fi 7 supporta canali da 320 MHz.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Standard 802.11be.',
            },
            {
              english: 'MIMO',
              italian: 'MIMO',
              pronunciation: '/ˈmaɪmoʊ/',
              phonetic: 'MAI-mo',
              example:
                'Under the hood, MIMO uses multiple antennas to boost throughput. = MIMO usa più antenne per aumentare il throughput.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Multiple-Input Multiple-Output.',
            },
            {
              english: 'MU-MIMO',
              italian: 'MU-MIMO',
              pronunciation: '/em juː ˈmaɪmoʊ/',
              phonetic: 'EM-IU MAI-mo',
              example:
                'In networking, MU-MIMO serves multiple clients simultaneously. = MU-MIMO serve più client simultaneamente.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Multi-User MIMO.',
            },
            {
              english: 'OFDMA',
              italian: 'OFDMA',
              pronunciation: '/ˌoʊ ef diː em ˈeɪ/',
              phonetic: 'O-EF-DI-EM-EI',
              example:
                'In networking, OFDMA splits channels among users. = OFDMA divide i canali tra utenti.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Orthogonal Frequency-Division Multiple Access.',
            },
            {
              english: 'Beamforming',
              italian: 'direzionamento del segnale (beamforming)',
              pronunciation: '/ˈbiːmfɔːrmɪŋ/',
              phonetic: 'BIM-for-ming',
              example:
                'In networking, Beamforming directs the Wi-Fi signal to clients. = Il beamforming dirige il segnale Wi-Fi ai client.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Channel Bonding',
              italian: 'unione di canali (channel bonding)',
              pronunciation: '/ˈtʃænl ˈbɒndɪŋ/',
              phonetic: 'CIA-nel BON-ding',
              example:
                'In networking, Channel Bonding combines channels for higher speed. = Il channel bonding combina canali per maggiore velocità.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_wireless_3',
          title: 'Wireless Security / Sicurezza Wireless',
          description: 'WPA, WPA2, WPA3 e cifratura',
          items: [
            {
              english: 'WEP',
              italian: 'WEP',
              pronunciation: '/wep/',
              phonetic: 'UEP',
              example:
                'By definition, WEP is broken and should never be used. = WEP è compromesso e non dovrebbe mai essere usato.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Crackabile in pochi minuti.',
            },
            {
              english: 'WPA',
              italian: 'WPA',
              pronunciation: '/ˌdʌbljuː piː ˈeɪ/',
              phonetic: 'DABOL-IU-PI-EI',
              example:
                'In networking, WPA replaced the broken WEP. = WPA ha sostituito il vulnerabile WEP.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'WPA2',
              italian: 'WPA2',
              pronunciation: '/ˌdʌbljuː piː eɪ tuː/',
              phonetic: 'DABOL-IU-PI-EI-TU',
              example: 'Under the hood, WPA2 uses AES encryption. = WPA2 usa cifratura AES.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Standard dal 2004. Vulnerabile a KRACK.',
            },
            {
              english: 'WPA3',
              italian: 'WPA3',
              pronunciation: '/ˌdʌbljuː piː eɪ θriː/',
              phonetic: 'DABOL-IU-PI-EI-THRI',
              example:
                'Under the hood, WPA3 uses SAE for stronger key exchange. = WPA3 usa SAE per uno scambio di chiavi più forte.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Resistente ad attacchi offline su password.',
            },
            {
              english: 'Pre-Shared Key',
              italian: 'chiave pre-condivisa (PSK)',
              pronunciation: '/priː ʃeərd kiː/',
              phonetic: 'PRI-SHEERD KII',
              example:
                'Home routers use a Pre-Shared Key (PSK) that every device must enter to authenticate and join the wireless network. = I router domestici usano una Pre-Shared Key (PSK) che ogni dispositivo deve inserire per autenticarsi e unirsi alla rete wireless.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Anche detto WPA-Personal.',
            },
            {
              english: 'Enterprise Mode',
              italian: 'modalità enterprise',
              pronunciation: '/ˈentərpraɪz/',
              phonetic: 'EN-ter-praiz',
              example:
                'For security, Enterprise Mode authenticates via RADIUS. = La modalità enterprise autentica via RADIUS.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'WPA-Enterprise. Usa 802.1X.',
            },
            {
              english: 'EAP',
              italian: 'protocollo di autenticazione estensibile (EAP)',
              pronunciation: '/iː eɪ piː/',
              phonetic: 'I-EI-PI',
              example:
                'In networking, EAP frames authentication exchanges. = EAP incornicia gli scambi di autenticazione.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Extensible Authentication Protocol.',
            },
            {
              english: 'SAE',
              italian: 'SAE',
              pronunciation: '/es eɪ ˈiː/',
              phonetic: 'ES-EI-I',
              example:
                'As a security measure, SAE prevents offline dictionary attacks. = SAE previene attacchi a dizionario offline.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Anche detto Dragonfly.',
            },
            {
              english: 'Captive Portal',
              italian: 'portale di accesso (captive portal)',
              pronunciation: '/ˈkæptɪv ˈpɔːrtl/',
              phonetic: 'KAP-tiv POR-tol',
              example:
                "Hotels use captive portals for Wi-Fi access. = Gli hotel usano captive portal per l'accesso Wi-Fi.",
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Rogue AP',
              italian: 'AP malevolo (rogue AP)',
              pronunciation: '/roʊɡ eɪ piː/',
              phonetic: 'ROUG EI-PI',
              example:
                'When properly configured, a Rogue AP can intercept traffic. = Un AP malevolo può intercettare il traffico.',
              context: 'wireless',
              difficulty: 'intermediate',
              tool: 'airodump-ng',
            },
          ],
        },
        {
          id: 'net_wireless_4',
          title: 'Roaming & Optimization / Roaming e Ottimizzazione',
          description: 'Mobilità e prestazioni Wi-Fi',
          items: [
            {
              english: 'Roaming',
              italian: 'roaming',
              pronunciation: '/ˈroʊmɪŋ/',
              phonetic: 'RO-ming',
              example:
                'In networking, Roaming switches between APs seamlessly. = Il roaming passa tra AP senza interruzioni.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Mesh Wi-Fi',
              italian: 'Wi-Fi mesh',
              pronunciation: '/meʃ ˈwaɪfaɪ/',
              phonetic: 'MESH UAI-FAI',
              example:
                'In networking, Mesh Wi-Fi extends coverage seamlessly. = Il Wi-Fi mesh estende la copertura senza interruzioni.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Site Survey',
              italian: 'rilievo del sito (site survey)',
              pronunciation: '/saɪt ˈsɜːrveɪ/',
              phonetic: 'SAIT SER-vei',
              example:
                'In DNS resolution, a Site Survey maps Wi-Fi coverage. = Un site survey mappa la copertura Wi-Fi.',
              context: 'wireless',
              difficulty: 'intermediate',
              tool: 'NetSpot, Ekahau',
            },
            {
              english: 'Heat Map',
              italian: 'mappa di calore (heat map)',
              pronunciation: '/hiːt mæp/',
              phonetic: 'HIT MAP',
              example:
                'In networking, a Heat Map visualizes signal strength. = Una mappa di calore visualizza la potenza del segnale.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Co-Channel Interference',
              italian: 'interferenza co-canale',
              pronunciation: '/koʊ ˈtʃænl/',
              phonetic: 'KO CIA-nel',
              example:
                "In networking, Co-Channel Interference degrades performance. = L'interferenza co-canale degrada le prestazioni.",
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Band Steering',
              italian: 'band steering',
              pronunciation: '/bænd ˈstɪərɪŋ/',
              phonetic: 'BAND STIIR-ing',
              example:
                'In networking, Band Steering pushes clients to 5 GHz. = Il band steering spinge i client verso i 5 GHz.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Wireless Controller',
              italian: 'controller wireless',
              pronunciation: '/ˈwaɪərləs/',
              phonetic: 'UAI-er-les',
              example:
                'A controller manages many APs centrally. = Un controller gestisce molti AP centralmente.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Esempi: Cisco WLC, UniFi Controller.',
            },
            {
              english: 'CAPWAP',
              italian: 'CAPWAP',
              pronunciation: '/ˈkæpwæp/',
              phonetic: 'KAP-uap',
              example:
                'In networking, CAPWAP tunnels traffic to the controller. = CAPWAP incanala il traffico al controller.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Control And Provisioning of Wireless Access Points.',
            },
            {
              english: 'Wireless Bridge',
              italian: 'bridge wireless',
              pronunciation: '/ˈwaɪərləs brɪdʒ/',
              phonetic: 'UAI-er-les BRICH',
              example:
                'In networking, a Wireless Bridge links two LANs. = Un bridge wireless collega due LAN.',
              context: 'wireless',
              difficulty: 'intermediate',
            },
            {
              english: 'Hidden SSID',
              italian: 'SSID nascosto',
              pronunciation: '/ˈhɪdn/',
              phonetic: 'HI-den',
              example:
                'In networking, a Hidden SSID does not appear in scans. = Un SSID nascosto non appare nelle scansioni.',
              context: 'wireless',
              difficulty: 'intermediate',
              note: 'Sicurezza by obscurity: scoperto facilmente.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 9 - FIREWALL E ACL / FIREWALLS & ACLs
    // ════════════════════════════════════════════════
    9: {
      name: 'Firewall e ACL / Firewalls & ACLs',
      description: 'Filtraggio del traffico di rete',
      lessons: [
        {
          id: 'net_firewalls_1',
          title: 'Firewall Basics / Basi Firewall',
          description: 'Concetti fondamentali dei firewall',
          items: [
            {
              english: 'Firewall',
              italian: 'barriera di rete (firewall)',
              pronunciation: '/ˈfaɪərwɔːl/',
              phonetic: 'FAI-er-uol',
              example:
                'For traffic control, a Firewall filters network traffic. = Un firewall filtra il traffico di rete.',
              context: 'firewalls',
              difficulty: 'intermediate',
              note: 'Lett. "muro tagliafuoco".',
            },
            {
              english: 'Firewall Rule',
              italian: 'regola firewall',
              pronunciation: '/ˈfaɪərwɔːl ruːl/',
              phonetic: 'FAI-er-uol RUUL',
              example:
                'The security team writes each firewall rule to explicitly permit or deny traffic based on source, destination, port, and protocol. = Il team di sicurezza scrive ogni regola firewall per permettere o negare esplicitamente il traffico basandosi su sorgente, destinazione, porta e protocollo.',
              context: 'firewalls',
              difficulty: 'intermediate',
              command: 'iptables -L -n',
            },
            {
              english: 'Allow',
              italian: 'permetti (allow)',
              pronunciation: '/əˈlaʊ/',
              phonetic: 'a-LAU',
              example:
                'In networking, Allow rules permit matching traffic. = Le regole allow permettono il traffico corrispondente.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Deny',
              italian: 'nega (deny)',
              pronunciation: '/dɪˈnaɪ/',
              phonetic: 'di-NAI',
              example:
                'In networking, Deny rules block traffic silently. = Le regole deny bloccano il traffico silenziosamente.',
              context: 'firewalls',
              difficulty: 'intermediate',
              note: 'In iptables: DROP.',
            },
            {
              english: 'Reject',
              italian: 'rifiuta (reject)',
              pronunciation: '/rɪˈdʒekt/',
              phonetic: 'ri-GIEKT',
              example:
                'During communication, Reject sends an ICMP unreachable message. = Reject invia un messaggio ICMP unreachable.',
              context: 'firewalls',
              difficulty: 'intermediate',
              note: 'Diverso da DROP: il client viene avvisato.',
            },
            {
              english: 'Default Policy',
              italian: 'policy predefinita',
              pronunciation: '/dɪˈfɔːlt ˈpɒləsi/',
              phonetic: 'di-FOLT PO-li-si',
              example:
                'Setting the default policy to DROP on the INPUT chain enforces a deny-by-default posture on the firewall. = Impostare la policy predefinita a DROP sulla chain INPUT impone una postura deny-by-default sul firewall.',
              context: 'firewalls',
              difficulty: 'intermediate',
              code: 'iptables -P INPUT DROP',
            },
            {
              english: 'Implicit Deny',
              italian: 'deny implicito',
              pronunciation: '/ɪmˈplɪsɪt/',
              phonetic: 'im-PLI-sit',
              example:
                'Cisco ACLs have an implicit deny at the end. = Le ACL Cisco hanno un deny implicito alla fine.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Ingress',
              italian: 'in ingresso (ingress)',
              pronunciation: '/ˈɪnɡres/',
              phonetic: 'IN-gres',
              example:
                'In networking, Ingress filtering blocks incoming malicious traffic. = Il filtraggio in ingresso blocca traffico malevolo.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Egress',
              italian: 'in uscita (egress)',
              pronunciation: '/ˈiːɡres/',
              phonetic: 'I-gres',
              example:
                'In networking, Egress filtering controls outbound traffic. = Il filtraggio in uscita controlla il traffico outbound.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Five-Tuple',
              italian: 'Cinquina',
              pronunciation: '/faɪv ˈtjuːpl/',
              phonetic: 'FAIV TIU-pol',
              example:
                'Stateful firewalls track a five-tuple of source IP, destination IP, source port, destination port and protocol per flow. = I firewall stateful tracciano una cinquina di IP sorgente, IP destinazione, porta sorgente, porta destinazione e protocollo per ogni flusso.',
              context: 'firewalls',
              difficulty: 'intermediate',
              note: 'src IP, dst IP, src port, dst port, protocol.',
            },
          ],
        },
        {
          id: 'net_firewalls_2',
          title: 'Firewall Types / Tipi di Firewall',
          description: 'Stateful, stateless e applicativi',
          items: [
            {
              english: 'Packet Filter',
              italian: 'filtro a pacchetto',
              pronunciation: '/ˈpækɪt ˈfɪltər/',
              phonetic: 'PAK-ket FIL-ter',
              example:
                'Operating at Layer 3 and 4, a packet filter inspects only IP headers and port numbers without examining the actual payload data. = Operando a Layer 3 e 4, un packet filter ispeziona solo gli header IP e i numeri di porta senza esaminare i dati payload effettivi.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Stateful Firewall',
              italian: 'firewall stateful',
              pronunciation: '/ˈsteɪtfʊl/',
              phonetic: 'STEIT-ful',
              example:
                'By maintaining a connection table, a stateful firewall automatically allows return traffic for established sessions without extra rules. = Mantenendo una tabella di connessione, un firewall stateful permette automaticamente il traffico di ritorno per sessioni stabilite senza regole aggiuntive.',
              context: 'firewalls',
              difficulty: 'intermediate',
              code: 'iptables -A INPUT -m state --state ESTABLISHED -j ACCEPT',
            },
            {
              english: 'Stateless Firewall',
              italian: 'firewall stateless',
              pronunciation: '/ˈsteɪtləs/',
              phonetic: 'STEIT-les',
              example:
                'Without a connection table, a stateless firewall evaluates every single packet against its ruleset with no memory of previous traffic. = Senza una tabella di connessione, un firewall stateless valuta ogni singolo pacchetto contro il suo set di regole senza memoria del traffico precedente.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Connection Table',
              italian: 'Tabella delle connessioni',
              pronunciation: '/kəˈnekʃən ˈteɪbl/',
              phonetic: 'ko-NEK-scion TEI-bol',
              example:
                'For accountability, the Connection Table tracks active flows. = La tabella delle connessioni traccia i flussi attivi.',
              context: 'firewalls',
              difficulty: 'intermediate',
              command: 'conntrack -L',
            },
            {
              english: 'Application Firewall',
              italian: 'Firewall applicativo',
              pronunciation: '/ˌæplɪˈkeɪʃən/',
              phonetic: 'a-pli-KEI-scion',
              example:
                'To block SQL injection attempts, the application firewall inspects HTTP request bodies at Layer 7 before forwarding them to the web server. = Per bloccare tentativi di SQL injection, il firewall applicativo ispeziona i body delle richieste HTTP a Layer 7 prima di inoltrarli al web server.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'WAF',
              italian: 'WAF',
              pronunciation: '/wæf/',
              phonetic: 'UAF',
              example:
                'In networking, a WAF protects web apps from attacks. = Un WAF protegge le app web dagli attacchi.',
              context: 'firewalls',
              difficulty: 'intermediate',
              tool: 'ModSecurity, Cloudflare WAF',
            },
            {
              english: 'NGFW',
              italian: 'firewall di nuova generazione (NGFW)',
              pronunciation: '/ˌen dʒiː ef ˈdʌbljuː/',
              phonetic: 'EN-GI-EF-DABOL-IU',
              example:
                'In networking, NGFW combines firewall with IPS and DPI. = NGFW combina firewall con IPS e DPI.',
              context: 'firewalls',
              difficulty: 'intermediate',
              note: 'Next-Generation Firewall.',
            },
            {
              english: 'Proxy Firewall',
              italian: 'Firewall proxy',
              pronunciation: '/ˈprɒksi/',
              phonetic: 'PROK-si',
              example:
                'In networking, a Proxy Firewall terminates connections. = Un firewall proxy termina le connessioni.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Host-Based Firewall',
              italian: 'Firewall basato su host',
              pronunciation: '/hoʊst beɪst/',
              phonetic: 'HOUST BEIST',
              example:
                'In production environments, Host-Based Firewall runs on the device. = Un firewall basato su host gira sul dispositivo.',
              context: 'firewalls',
              difficulty: 'intermediate',
              tool: 'ufw, firewalld, Windows Defender',
            },
            {
              english: 'Network Firewall',
              italian: 'firewall di rete',
              pronunciation: '/ˈnetwɜːrk/',
              phonetic: 'NET-uerk',
              example:
                'Deployed at the perimeter, the network firewall inspects all ingress and egress traffic to protect every device on the internal LAN. = Posizionato al perimetro, il firewall di rete ispeziona tutto il traffico in ingresso e uscita per proteggere ogni dispositivo sulla LAN interna.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_firewalls_3',
          title: 'ACL / Access Control Lists',
          description: 'Liste di controllo accessi',
          items: [
            {
              english: 'ACL',
              italian: 'lista di controllo accessi (ACL)',
              pronunciation: '/ˌeɪ siː ˈel/',
              phonetic: 'EI-SI-EL',
              example:
                'The border router applies ACLs on its external interface to filter inbound traffic and block known malicious IP ranges. = Il router di bordo applica ACL sulla sua interfaccia esterna per filtrare il traffico in ingresso e bloccare range IP malevoli noti.',
              context: 'firewalls',
              difficulty: 'intermediate',
              note: 'Access Control List.',
            },
            {
              english: 'Standard ACL',
              italian: 'ACL standard',
              pronunciation: '/ˈstændərd/',
              phonetic: 'STAN-dard',
              example:
                "Because a standard ACL can only examine the source IP address, it should be placed as close to the destination as possible. = Poiche una ACL standard puo esaminare solo l'indirizzo IP sorgente, dovrebbe essere posizionata il piu vicino possibile alla destinazione.",
              context: 'firewalls',
              difficulty: 'intermediate',
              code: 'access-list 10 permit 192.168.1.0 0.0.0.255',
            },
            {
              english: 'Extended ACL',
              italian: 'ACL estesa',
              pronunciation: '/ɪkˈstendɪd/',
              phonetic: 'iks-TEN-did',
              example:
                'Unlike their standard counterparts, extended ACLs can match on source IP, destination IP, protocol type, and port number simultaneously. = A differenza delle loro controparti standard, le ACL estese possono filtrare su IP sorgente, IP destinazione, tipo di protocollo e numero di porta simultaneamente.',
              context: 'firewalls',
              difficulty: 'intermediate',
              code: 'access-list 100 permit tcp any any eq 80',
            },
            {
              english: 'Named ACL',
              italian: 'ACL con nome',
              pronunciation: '/neɪmd/',
              phonetic: 'NEIMD',
              example:
                'Instead of referencing numbered lists, engineers use named ACLs like BLOCK_GUEST_TRAFFIC for self-documenting firewall rules. = Invece di riferirsi a liste numerate, gli ingegneri usano ACL con nome come BLOCK_GUEST_TRAFFIC per regole firewall auto-documentanti.',
              context: 'firewalls',
              difficulty: 'intermediate',
              code: 'ip access-list extended WEB_TRAFFIC',
            },
            {
              english: 'Wildcard Mask',
              italian: 'Maschera wildcard',
              pronunciation: '/ˈwaɪldkɑːrd/',
              phonetic: 'UAILD-kard',
              example: `On Cisco ACLs you write a wildcard mask like 0.0.0.255 to mean 'match the first 24 bits of the address'. = Sulle ACL Cisco scrivi una wildcard mask come 0.0.0.255 per dire 'fa match sui primi 24 bit dell'indirizzo'.`,
              context: 'firewalls',
              difficulty: 'intermediate',
              note: 'Inversa della subnet mask: 0.0.0.255.',
            },
            {
              english: 'Rule Order',
              italian: 'ordine delle regole',
              pronunciation: '/ruːl ˈɔːrdər/',
              phonetic: 'RUUL OR-der',
              example: `Firewall rule order is critical: a permissive rule placed before a deny rule will silently override the block. = L'ordine delle regole del firewall e' critico: una regola permissiva messa prima di una deny annulla silenziosamente il blocco.`,
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Inbound ACL',
              italian: 'ACL in ingresso',
              pronunciation: '/ˈɪnbaʊnd/',
              phonetic: 'IN-baund',
              example:
                'Traffic from the Internet hits the inbound ACL before the router even consults the routing table, saving processing time on denied packets. = Il traffico da Internet colpisce la ACL in ingresso prima che il router consulti la tabella di routing, risparmiando tempo di elaborazione sui pacchetti negati.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Outbound ACL',
              italian: 'ACL in uscita',
              pronunciation: '/ˈaʊtbaʊnd/',
              phonetic: 'AUT-baund',
              example:
                "Applying an outbound ACL on the WAN interface ensures that only approved traffic leaves the corporate network toward the Internet. = Applicare una ACL in uscita sull'interfaccia WAN assicura che solo traffico approvato lasci la rete aziendale verso Internet.",
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Reflexive ACL',
              italian: 'ACL riflessiva',
              pronunciation: '/rɪˈfleksɪv/',
              phonetic: 'ri-FLEK-siv',
              example:
                'When an internal host initiates a connection, a reflexive ACL automatically creates a temporary permit entry for the return traffic. = Quando un host interno avvia una connessione, una ACL riflessiva crea automaticamente una voce di permesso temporanea per il traffico di ritorno.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Time-Based ACL',
              italian: 'ACL temporale',
              pronunciation: '/taɪm beɪst/',
              phonetic: 'TAIM-BEIST',
              example:
                "The administrator configures a time-based ACL that blocks social media access during business hours but allows it after 6 PM. = L'amministratore configura una ACL temporale che blocca l'accesso ai social media durante l'orario lavorativo ma lo permette dopo le 18.",
              context: 'firewalls',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_firewalls_4',
          title: 'Linux Firewalls / Firewall Linux',
          description: 'iptables, nftables, ufw',
          items: [
            {
              english: 'iptables',
              italian: 'iptables',
              pronunciation: '/aɪ piː ˈteɪblz/',
              phonetic: 'AI-PI TEI-bols',
              example:
                'By definition, iptables is the classic Linux firewall tool. = iptables è lo storico tool firewall Linux.',
              context: 'firewalls',
              difficulty: 'intermediate',
              command: 'iptables -A INPUT -p tcp --dport 22 -j ACCEPT',
            },
            {
              english: 'nftables',
              italian: 'nftables',
              pronunciation: '/en ef ˈteɪblz/',
              phonetic: 'EN-EF TEI-bols',
              example:
                'In networking, nftables replaces iptables on modern Linux. = nftables sostituisce iptables su Linux moderno.',
              context: 'firewalls',
              difficulty: 'intermediate',
              command: 'nft list ruleset',
            },
            {
              english: 'ufw',
              italian: 'ufw',
              pronunciation: '/juː ef ˈdʌbljuː/',
              phonetic: 'IU-EF-DABOL-IU',
              example:
                'In networking, ufw simplifies firewall management. = UFW semplifica la gestione del firewall.',
              context: 'firewalls',
              difficulty: 'intermediate',
              command: 'ufw allow 22/tcp',
              note: 'Uncomplicated FireWall. Default su Ubuntu.',
            },
            {
              english: 'firewalld',
              italian: 'firewalld',
              pronunciation: '/ˈfaɪərwɔːl diː/',
              phonetic: 'FAI-er-uol-D',
              example:
                'Under the hood, firewalld uses zones for policy. = firewalld usa zone per le policy.',
              context: 'firewalls',
              difficulty: 'intermediate',
              command: 'firewall-cmd --list-all',
              note: 'Default su RHEL/Fedora.',
            },
            {
              english: 'Chain',
              italian: 'Catena',
              pronunciation: '/tʃeɪn/',
              phonetic: 'CEIN',
              example:
                'iptables uses INPUT, OUTPUT, FORWARD chains. = iptables usa catene INPUT, OUTPUT, FORWARD.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Table',
              italian: 'Tabella',
              pronunciation: '/ˈteɪbl/',
              phonetic: 'TEI-bol',
              example:
                'iptables organizes rules into tables like filter, nat and mangle, each handling a different stage of packet processing. = iptables organizza le regole in tabelle come filter, nat e mangle, ognuna gestisce una fase diversa del processing dei pacchetti.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Match',
              italian: 'condizione di corrispondenza (match)',
              pronunciation: '/mætʃ/',
              phonetic: 'MACH',
              example: `An iptables rule combines a match condition (port, protocol, state) with a target action like ACCEPT or DROP. = Una regola iptables combina una condizione di match (porta, protocollo, stato) con un'azione target come ACCEPT o DROP.`,
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Target',
              italian: 'azione da eseguire (target)',
              pronunciation: '/ˈtɑːrɡət/',
              phonetic: 'TAR-ghet',
              example:
                'Common targets are ACCEPT, DROP, REJECT. = Target comuni sono ACCEPT, DROP, REJECT.',
              context: 'firewalls',
              difficulty: 'intermediate',
            },
            {
              english: 'Connection Tracking',
              italian: 'Tracking connessioni',
              pronunciation: '/kəˈnekʃən ˈtrækɪŋ/',
              phonetic: 'ko-NEK-scion TRA-king',
              example:
                'On a stateful firewall, connection tracking lets return traffic from an established outbound flow back in without a matching inbound rule. = Su un firewall stateful, il tracking delle connessioni permette al traffico di ritorno di un flusso uscente stabilito di rientrare senza una regola in ingresso corrispondente.',
              context: 'firewalls',
              difficulty: 'intermediate',
              tool: 'conntrack-tools',
            },
            {
              english: 'Rate Limiting',
              italian: 'Limitazione di frequenza',
              pronunciation: '/reɪt ˈlɪmɪtɪŋ/',
              phonetic: 'REIT LI-mi-ting',
              example:
                'As a security measure, Rate Limiting prevents brute-force attacks. = La limitazione di frequenza previene attacchi brute-force.',
              context: 'firewalls',
              difficulty: 'intermediate',
              code: 'iptables -A INPUT -p tcp --dport 22 -m limit --limit 3/min -j ACCEPT',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 10 - VPN / VPN
    // ════════════════════════════════════════════════
    10: {
      name: 'VPN / Virtual Private Networks',
      description: 'Reti private virtuali e tunneling',
      lessons: [
        {
          id: 'net_vpn_1',
          title: 'VPN Basics / Basi VPN',
          description: 'Concetti fondamentali delle VPN',
          items: [
            {
              english: 'VPN Tunnel',
              italian: 'Tunnel VPN',
              pronunciation: '/ˌviː piː en ˈtʌnl/',
              phonetic: 'VI-PI-EN TA-nel',
              example:
                'For confidentiality, VPN Tunnel encrypts traffic end to end. = Un tunnel VPN cifra il traffico da estremo a estremo.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Tunneling Protocol',
              italian: 'protocollo di tunneling',
              pronunciation: '/ˈtʌnəlɪŋ/',
              phonetic: 'TA-ne-ling',
              example:
                'A tunneling protocol like GRE or IPsec wraps original packets inside a new IP header so they can cross an untrusted network. = Un protocollo di tunneling come GRE o IPsec incapsula i pacchetti originali dentro un nuovo header IP per attraversare una rete non fidata.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Encryption',
              italian: 'cifratura (encryption)',
              pronunciation: '/ɪnˈkrɪpʃən/',
              phonetic: 'in-KRIP-scion',
              example: `Modern VPNs use AES-GCM or ChaCha20-Poly1305 encryption to protect tunneled traffic from eavesdropping on the wire. = Le VPN moderne usano cifratura AES-GCM o ChaCha20-Poly1305 per proteggere il traffico nel tunnel dall'intercettazione sulla linea.`,
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Authentication',
              italian: 'autenticazione',
              pronunciation: '/ɔːˌθentɪˈkeɪʃən/',
              phonetic: 'o-then-ti-KEI-scion',
              example:
                "VPN authentication verifies endpoint identity. = L'autenticazione VPN verifica l'identità dell'endpoint.",
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Pre-Shared Secret',
              italian: 'Segreto pre-condiviso',
              pronunciation: '/priː ʃeərd/',
              phonetic: 'PRI-SHEERD',
              example:
                "A site-to-site VPN using a pre-shared secret works fine for two offices, but certificate-based auth scales better across dozens of branches. = Una VPN site-to-site che usa un pre-shared secret funziona bene per due uffici, ma l'autenticazione basata su certificati scala meglio su decine di sedi.",
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'VPN Concentrator',
              italian: 'Concentratore VPN',
              pronunciation: '/ˈkɒnsənˌtreɪtər/',
              phonetic: 'KON-sen-trei-ter',
              example:
                'At its layer, a VPN Concentrator handles many remote users. = Un concentratore VPN gestisce molti utenti remoti.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'VPN encapsulation',
              italian: 'incapsulamento VPN',
              pronunciation: '/ɪnˌkæpsjʊˈleɪʃən/',
              phonetic: 'in-kap-su-LEI-scion',
              example: `To traverse an untrusted path, VPN encapsulation wraps the original IP packet inside a new header that carries it across the tunnel. = Per attraversare un percorso non fidato, l'incapsulamento VPN avvolge il pacchetto IP originale dentro un nuovo header che lo trasporta lungo il tunnel.`,
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Esempi: ESP per IPsec, header GRE per i tunnel GRE, header WireGuard per WG.',
            },
            {
              english: 'Overhead',
              italian: 'sovraccarico (overhead)',
              pronunciation: '/ˈoʊvərhed/',
              phonetic: 'O-ver-hed',
              example:
                "VPN encapsulation adds overhead to packets. = L'incapsulamento VPN aggiunge overhead ai pacchetti.",
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Tipicamente 50-100 byte.',
            },
            {
              english: 'MTU Issue',
              italian: 'problema MTU',
              pronunciation: '/em tiː juː/',
              phonetic: 'EM-TI-IU',
              example:
                'An MTU issue after enabling IPsec often shows up as TCP sessions that connect but hang on large payloads. = Un problema di MTU dopo aver attivato IPsec spesso si manifesta come sessioni TCP che si connettono ma si bloccano sui payload grandi.',
              context: 'vpn',
              difficulty: 'intermediate',
              command: 'ping -M do -s 1472 8.8.8.8',
            },
            {
              english: 'Kill Switch',
              italian: 'interruttore di sicurezza (kill switch)',
              pronunciation: '/kɪl swɪtʃ/',
              phonetic: 'KIL SUITCH',
              example:
                'In networking, a Kill Switch blocks traffic if VPN drops. = Un kill switch blocca il traffico se la VPN cade.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_vpn_2',
          title: 'IPsec / IPsec',
          description: 'Il protocollo IPsec in dettaglio',
          items: [
            {
              english: 'IPsec',
              italian: 'IPsec',
              pronunciation: '/ˈaɪ piː sek/',
              phonetic: 'AI-PI-SEK',
              example:
                'In networking, IPsec secures IP traffic at Layer 3. = IPsec protegge il traffico IP a Layer 3.',
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Internet Protocol Security.',
            },
            {
              english: 'IKE',
              italian: 'IKE',
              pronunciation: '/ˈaɪk/',
              phonetic: 'AIK',
              example:
                'In networking, IKE negotiates IPsec security associations. = IKE negozia le associazioni di sicurezza IPsec.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'IKEv2',
              italian: 'IKEv2',
              pronunciation: '/aɪk viː tuː/',
              phonetic: 'AIK-VI-TU',
              example:
                'By definition, IKEv2 is faster and more reliable. = IKEv2 è più veloce e affidabile.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'ESP',
              italian: 'ESP',
              pronunciation: '/ˌiː es ˈpiː/',
              phonetic: 'I-ES-PI',
              example:
                'For network operations, ESP provides confidentiality and integrity. = ESP fornisce riservatezza e integrità.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'AH',
              italian: 'AH',
              pronunciation: '/eɪ ˈeɪtʃ/',
              phonetic: 'EI-EICH',
              example:
                'For network operations, AH provides integrity but no confidentiality. = AH fornisce integrità ma non riservatezza.',
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Raramente usato: tipicamente si preferisce ESP.',
            },
            {
              english: 'Tunnel Mode',
              italian: 'Modalità tunnel',
              pronunciation: '/ˈtʌnl moʊd/',
              phonetic: 'TA-nel MOUD',
              example:
                "In networking, Tunnel Mode encapsulates the entire packet. = La modalità tunnel incapsula l'intero pacchetto.",
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Usato in site-to-site VPN.',
            },
            {
              english: 'Transport Mode',
              italian: 'Modalità trasporto',
              pronunciation: '/ˈtrænspɔːrt/',
              phonetic: 'TRAN-sport',
              example:
                'In networking, Transport Mode protects only the payload. = La modalità trasporto protegge solo il payload.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Security Association',
              italian: 'associazione di sicurezza (SA)',
              pronunciation: '/sɪˈkjʊərəti/',
              phonetic: 'si-KIU-re-ti',
              example:
                'An SA defines IPsec parameters between peers. = Una SA definisce parametri IPsec tra peer.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Phase 1',
              italian: 'Fase 1',
              pronunciation: '/feɪz wʌn/',
              phonetic: 'FEIZ-UAN',
              example:
                'IKE Phase 1 establishes a secure channel. = IKE Fase 1 stabilisce un canale sicuro.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Phase 2',
              italian: 'Fase 2',
              pronunciation: '/feɪz tuː/',
              phonetic: 'FEIZ-TU',
              example:
                "After identity verification in Phase 1, IKE Phase 2 negotiates the IPsec security associations that protect the actual data traffic. = Dopo la verifica dell'identita nella Fase 1, IKE Fase 2 negozia le security association IPsec che proteggono il traffico dati effettivo.",
              context: 'vpn',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_vpn_3',
          title: 'Modern VPNs / VPN Moderne',
          description: 'WireGuard, OpenVPN, SSL VPN',
          items: [
            {
              english: 'WireGuard',
              italian: 'WireGuard',
              pronunciation: '/ˈwaɪərɡɑːrd/',
              phonetic: 'UAI-er-gard',
              example:
                'By definition, WireGuard is fast, modern and lean. = WireGuard è veloce, moderno e leggero.',
              context: 'vpn',
              difficulty: 'intermediate',
              command: 'wg show',
              note: 'Integrato nel kernel Linux dal 5.6.',
            },
            {
              english: 'OpenVPN',
              italian: 'OpenVPN',
              pronunciation: '/ˌoʊpən viː piː ˈen/',
              phonetic: 'OU-pen VI-PI-EN',
              example:
                'By definition, OpenVPN is widely supported and flexible. = OpenVPN è ampiamente supportato e flessibile.',
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Usa OpenSSL. Porta default UDP/1194.',
            },
            {
              english: 'SSL VPN',
              italian: 'VPN SSL',
              pronunciation: '/ˌes es el viː piː ˈen/',
              phonetic: 'ES-ES-EL VI-PI-EN',
              example:
                'Remote workers access internal applications through an SSL VPN portal directly from their browser without installing dedicated client software. = I lavoratori remoti accedono alle applicazioni interne tramite un portale SSL VPN direttamente dal browser senza installare software client dedicato.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Site-to-Site VPN',
              italian: 'VPN site-to-site',
              pronunciation: '/saɪt tuː saɪt/',
              phonetic: 'SAIT-tu-SAIT',
              example:
                'To connect the Milan headquarters with the Rome branch, the IT team establishes a site-to-site VPN between the two office firewalls. = Per connettere la sede di Milano con la filiale di Roma, il team IT stabilisce una VPN site-to-site tra i due firewall degli uffici.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Remote Access VPN',
              italian: 'VPN ad accesso remoto',
              pronunciation: '/rɪˈmoʊt ˈækses/',
              phonetic: 'ri-MOUT AK-ses',
              example:
                'Employees working from home connect through a remote access VPN to securely reach internal file shares and intranet applications. = I dipendenti che lavorano da casa si connettono tramite una VPN ad accesso remoto per raggiungere in sicurezza condivisioni file e applicazioni intranet interne.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Split Tunneling',
              italian: 'tunneling selettivo (split tunneling)',
              pronunciation: '/splɪt ˈtʌnəlɪŋ/',
              phonetic: 'SPLIT TA-ne-ling',
              example:
                'In the forwarding pipeline, Split Tunneling routes only some traffic via VPN. = Lo split tunneling instrada solo parte del traffico via VPN.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Full Tunnel',
              italian: 'tunnel completo (full tunnel)',
              pronunciation: '/fʊl ˈtʌnl/',
              phonetic: 'FUL TA-nel',
              example:
                'During communication, Full Tunnel sends all traffic through VPN. = Full tunnel invia tutto il traffico attraverso la VPN.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Peer Configuration',
              italian: 'configurazione peer',
              pronunciation: '/pɪər/',
              phonetic: 'PIIR',
              example:
                'WireGuard uses peer configuration files. = WireGuard usa file di configurazione peer.',
              context: 'vpn',
              difficulty: 'intermediate',
              code: '[Peer]\\nPublicKey = abc...\\nAllowedIPs = 10.0.0.2/32',
            },
            {
              english: 'Public Key',
              italian: 'chiave pubblica',
              pronunciation: '/ˈpʌblɪk kiː/',
              phonetic: 'PA-blik KII',
              example: `Each WireGuard peer is identified by its Curve25519 public key, which you exchange out of band before bringing the tunnel up. = Ogni peer WireGuard e' identificato dalla sua chiave pubblica Curve25519, che scambi fuori banda prima di alzare il tunnel.`,
              context: 'vpn',
              difficulty: 'intermediate',
              command: 'wg genkey | tee privkey | wg pubkey',
            },
            {
              english: 'AllowedIPs',
              italian: 'IP consentiti (AllowedIPs)',
              pronunciation: '/əˈlaʊd aɪ piːz/',
              phonetic: 'a-LAUD AI-PIZ',
              example:
                'To standardize communication, AllowedIPs defines which traffic uses the tunnel. = AllowedIPs definisce quale traffico usa il tunnel.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_vpn_4',
          title: 'VPN Operations / Operazioni VPN',
          description: 'Gestione e troubleshooting VPN',
          items: [
            {
              english: 'Dead Peer Detection',
              italian: 'Rilevamento peer morto',
              pronunciation: '/ded pɪər dɪˈtekʃən/',
              phonetic: 'DED PIIR di-TEK-scion',
              example:
                "When the remote office router goes offline, Dead Peer Detection notices the silence and tears down the stale VPN tunnel automatically. = Quando il router dell'ufficio remoto va offline, il Dead Peer Detection nota il silenzio e abbatte automaticamente il tunnel VPN obsoleto.",
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Rekey',
              italian: 'Rinegozia chiave',
              pronunciation: '/riːˈkiː/',
              phonetic: 'RI-KII',
              example:
                'IPsec automatically does a rekey before the SA expires so the tunnel never carries traffic with stale keying material. = IPsec rinegozia automaticamente le chiavi prima che scada la SA, così il tunnel non trasporta mai traffico con materiale crittografico vecchio.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'NAT Traversal',
              italian: 'attraversamento NAT (NAT traversal)',
              pronunciation: '/næt ˈtrævərsəl/',
              phonetic: 'NAT TRA-ver-sal',
              example:
                'NAT-T encapsulates IPsec in UDP for NAT. = NAT-T incapsula IPsec in UDP per NAT.',
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Usa porta UDP 4500.',
            },
            {
              english: 'IKE Lifetime',
              italian: 'Durata IKE',
              pronunciation: '/ˈaɪk ˈlaɪftaɪm/',
              phonetic: 'AIK LAIF-taim',
              example:
                'To standardize communication, IKE Lifetime defines how long the SA lasts. = La durata IKE definisce quanto dura la SA.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'Perfect Forward Secrecy',
              italian: 'segretezza futura (PFS)',
              pronunciation: '/ˈpɜːrfɪkt ˈfɔːrwərd ˈsiːkrəsi/',
              phonetic: 'PER-fikt FOR-uard SI-kre-si',
              example:
                'Enabling Perfect Forward Secrecy means compromising one session key does not let an attacker decrypt past or future sessions. = Abilitare la Perfect Forward Secrecy significa che compromettere una chiave di sessione non permette a un attaccante di decifrare sessioni passate o future.',
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Anche detto FS.',
            },
            {
              english: 'GRE Tunnel',
              italian: 'Tunnel GRE',
              pronunciation: '/dʒiː ɑːr iː ˈtʌnl/',
              phonetic: 'GI-AR-I TA-nel',
              example:
                'When the network needs to transport multicast routing updates across the Internet, engineers encapsulate them inside a GRE tunnel between the two sites. = Quando la rete deve trasportare aggiornamenti di routing multicast attraverso Internet, gli ingegneri li incapsulano dentro un tunnel GRE tra i due siti.',
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Generic Routing Encapsulation. Non cifrato di base.',
            },
            {
              english: 'L2TP',
              italian: 'L2TP',
              pronunciation: '/el tuː tiː piː/',
              phonetic: 'EL-TU-TI-PI',
              example:
                'In networking, L2TP often combines with IPsec. = L2TP è spesso combinato con IPsec.',
              context: 'vpn',
              difficulty: 'intermediate',
            },
            {
              english: 'PPTP',
              italian: 'PPTP',
              pronunciation: '/piː piː tiː piː/',
              phonetic: 'PI-PI-TI-PI',
              example:
                'By definition, PPTP is obsolete and insecure. = PPTP è obsoleto e insicuro.',
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Da non usare in produzione.',
            },
            {
              english: 'DMVPN',
              italian: 'DMVPN',
              pronunciation: '/diː em viː piː ˈen/',
              phonetic: 'DI-EM-VI-PI-EN',
              example:
                'In large deployments, DMVPN scales site-to-site VPNs dynamically. = DMVPN scala dinamicamente VPN site-to-site.',
              context: 'vpn',
              difficulty: 'intermediate',
              note: 'Dynamic Multipoint VPN. Tecnologia Cisco.',
            },
            {
              english: 'Tailscale',
              italian: 'Tailscale',
              pronunciation: '/ˈteɪlskeɪl/',
              phonetic: 'TEIL-skeil',
              example:
                'In networking, Tailscale builds zero-config WireGuard mesh. = Tailscale costruisce una mesh WireGuard zero-config.',
              context: 'vpn',
              difficulty: 'intermediate',
              tool: 'tailscale',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 11 - NAT E PROXY / NAT & PROXY
    // ════════════════════════════════════════════════
    11: {
      name: 'NAT e Proxy / NAT & Proxy',
      description: 'Traduzione di indirizzi e proxy',
      lessons: [
        {
          id: 'net_services_nat_1',
          title: 'NAT Basics / Basi NAT',
          description: 'Network Address Translation',
          items: [
            {
              english: 'NAT',
              italian: 'traduzione indirizzi di rete (NAT)',
              pronunciation: '/næt/',
              phonetic: 'NAT',
              example:
                'For flexibility, NAT lets many hosts share one public IP. = NAT permette a molti host di condividere un IP pubblico.',
              context: 'services',
              difficulty: 'intermediate',
              note: 'Network Address Translation.',
            },
            {
              english: 'PAT',
              italian: 'traduzione indirizzi con porte (PAT)',
              pronunciation: '/pæt/',
              phonetic: 'PAT',
              example:
                'In networking, PAT distinguishes flows by source port. = PAT distingue i flussi per porta sorgente.',
              context: 'services',
              difficulty: 'intermediate',
              note: 'Anche detto NAT overload.',
            },
            {
              english: 'Static NAT',
              italian: 'NAT statico',
              pronunciation: '/ˈstætɪk næt/',
              phonetic: 'STA-tik NAT',
              example:
                'In DNS resolution, Static NAT maps one private to one public IP. = Il NAT statico mappa un IP privato a uno pubblico.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Dynamic NAT',
              italian: 'NAT dinamico',
              pronunciation: '/daɪˈnæmɪk næt/',
              phonetic: 'dai-NA-mik NAT',
              example:
                'In networking, Dynamic NAT picks IPs from a pool. = Il NAT dinamico sceglie IP da un pool.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'NAT Overload',
              italian: 'NAT overload',
              pronunciation: '/ˌoʊvərˈloʊd/',
              phonetic: 'O-ver-loud',
              example:
                'By definition, NAT Overload is the most common form. = Il NAT overload è la forma più comune.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Source NAT',
              italian: 'NAT sorgente (SNAT)',
              pronunciation: '/sɔːrs næt/',
              phonetic: 'SORS NAT',
              example:
                'In networking, Source NAT rewrites source addresses. = Il NAT sorgente riscrive indirizzi sorgente.',
              context: 'services',
              difficulty: 'intermediate',
              code: 'iptables -t nat -A POSTROUTING -j MASQUERADE',
            },
            {
              english: 'Destination NAT',
              italian: 'NAT destinazione (DNAT)',
              pronunciation: '/ˌdestɪˈneɪʃən/',
              phonetic: 'des-ti-NEI-scion',
              example:
                'In networking, Destination NAT redirects incoming traffic. = Il NAT destinazione reindirizza il traffico in ingresso.',
              context: 'services',
              difficulty: 'intermediate',
              code: 'iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to 10.0.0.2',
            },
            {
              english: 'NAT Table',
              italian: 'tabella NAT',
              pronunciation: '/næt ˈteɪbl/',
              phonetic: 'NAT TEI-bol',
              example:
                'For accountability, the NAT Table tracks active translations. = La tabella NAT traccia le traduzioni attive.',
              context: 'services',
              difficulty: 'intermediate',
              command: 'conntrack -L',
            },
            {
              english: 'CGNAT',
              italian: 'CGNAT',
              pronunciation: '/siː dʒiː næt/',
              phonetic: 'SI-GI-NAT',
              example:
                'By definition, CGNAT is used by ISPs to share IPv4. = CGNAT è usato dagli ISP per condividere IPv4.',
              context: 'services',
              difficulty: 'intermediate',
              note: 'Range condiviso: 100.64.0.0/10.',
            },
            {
              english: 'Hairpin NAT',
              italian: 'NAT hairpin',
              pronunciation: '/ˈheərpɪn/',
              phonetic: 'HEER-pin',
              example:
                "For flexibility, Hairpin NAT lets internal hosts use the public IP. = Il NAT hairpin permette agli host interni di usare l'IP pubblico.",
              context: 'services',
              difficulty: 'intermediate',
              note: 'Anche detto NAT loopback.',
            },
          ],
        },
        {
          id: 'net_services_proxy_2',
          title: 'Proxies / Proxy',
          description: 'Forward e reverse proxy',
          items: [
            {
              english: 'Proxy',
              italian: 'intermediario di rete (proxy)',
              pronunciation: '/ˈprɒksi/',
              phonetic: 'PROK-si',
              example:
                'In networking, a Proxy intermediates between client and server. = Un proxy intermedia tra client e server.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Forward Proxy',
              italian: 'proxy in uscita (forward proxy)',
              pronunciation: '/ˈfɔːrwərd ˈprɒksi/',
              phonetic: 'FOR-uard PROK-si',
              example:
                'Forward proxies represent clients to servers. = I forward proxy rappresentano i client verso i server.',
              context: 'services',
              difficulty: 'intermediate',
              note: 'Esempi: Squid, corporate proxy.',
            },
            {
              english: 'Reverse Proxy',
              italian: 'proxy in ingresso (reverse proxy)',
              pronunciation: '/rɪˈvɜːrs/',
              phonetic: 'ri-VERS',
              example:
                'Reverse proxies represent servers to clients. = I reverse proxy rappresentano i server verso i client.',
              context: 'services',
              difficulty: 'intermediate',
              tool: 'Nginx, HAProxy, Traefik',
            },
            {
              english: 'Transparent Proxy',
              italian: 'proxy trasparente',
              pronunciation: '/trænsˈpærənt/',
              phonetic: 'tran-SPA-rent',
              example:
                'Transparent proxies require no client config. = I proxy trasparenti non richiedono configurazione client.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'SOCKS Proxy',
              italian: 'proxy SOCKS',
              pronunciation: '/sɒks/',
              phonetic: 'SOKS',
              example:
                'SOCKS proxies tunnel arbitrary protocols. = I proxy SOCKS incanalano protocolli arbitrari.',
              context: 'services',
              difficulty: 'intermediate',
              command: 'ssh -D 1080 user@server',
            },
            {
              english: 'HTTP Proxy',
              italian: 'proxy HTTP',
              pronunciation: '/eɪtʃ tiː tiː piː/',
              phonetic: 'EICH-TI-TI-PI',
              example:
                'Corporate networks route all employee browsing through an HTTP proxy that enforces content filtering and caches frequent downloads. = Le reti aziendali instradano tutta la navigazione dei dipendenti attraverso un proxy HTTP che applica filtri sui contenuti e memorizza in cache i download frequenti.',
              context: 'services',
              difficulty: 'intermediate',
              command: 'curl -x http://proxy:3128 https://example.com',
            },
            {
              english: 'CONNECT Method',
              italian: 'Metodo CONNECT',
              pronunciation: '/kəˈnekt ˈmeθəd/',
              phonetic: 'ko-NEKT ME-thod',
              example:
                'CONNECT tunnels HTTPS through HTTP proxy. = CONNECT incanala HTTPS attraverso un proxy HTTP.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Caching Proxy',
              italian: 'Proxy con cache',
              pronunciation: '/ˈkæʃɪŋ/',
              phonetic: 'KA-shing',
              example:
                'Caching proxies serve repeated content from cache. = I proxy con cache servono contenuto ripetuto dalla cache.',
              context: 'services',
              difficulty: 'intermediate',
              tool: 'Squid, Varnish',
            },
            {
              english: 'Web Filter',
              italian: 'filtro web',
              pronunciation: '/web ˈfɪltər/',
              phonetic: 'UEB FIL-ter',
              example:
                "The corporate proxy applies a web filter policy that blocks gambling and malware categories while allowing business-related browsing. = Il proxy aziendale applica una policy web filter che blocca le categorie gioco d'azzardo e malware permettendo la navigazione business.",
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Open Proxy',
              italian: 'Proxy aperto',
              pronunciation: '/ˈoʊpən ˈprɒksi/',
              phonetic: 'OU-pen PROK-si',
              example: `An open proxy on the public Internet quickly gets abused for spam, credential stuffing and traffic anonymization. = Un proxy aperto sull'Internet pubblico viene rapidamente abusato per spam, credential stuffing e anonimizzazione del traffico.`,
              context: 'services',
              difficulty: 'intermediate',
              note: 'Spesso abusati: da non lasciare aperti.',
            },
          ],
        },
        {
          id: 'net_services_lb_3',
          title: 'Load Balancers / Bilanciatori di Carico',
          description: 'Distribuzione del traffico',
          items: [
            {
              english: 'Load Balancer',
              italian: 'Bilanciatore di carico',
              pronunciation: '/loʊd ˈbælənsər/',
              phonetic: 'LOUD BA-lan-ser',
              example:
                'In networking, a Load Balancer distributes traffic across servers. = Un bilanciatore di carico distribuisce il traffico tra server.',
              context: 'services',
              difficulty: 'intermediate',
              tool: 'HAProxy, Nginx, AWS ELB',
            },
            {
              english: 'Round Robin',
              italian: 'distribuzione ciclica (round robin)',
              pronunciation: '/raʊnd ˈrɒbɪn/',
              phonetic: 'RAUND RO-bin',
              example:
                'During communication, Round Robin sends requests in rotation. = Round robin invia richieste a rotazione.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Least Connections',
              italian: 'Connessioni minime',
              pronunciation: '/liːst kəˈnekʃənz/',
              phonetic: 'LIST ko-NEK-scions',
              example:
                'In networking, Least Connections favors less busy servers. = Connessioni minime favorisce server meno occupati.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Weighted Round Robin',
              italian: 'Round robin pesato',
              pronunciation: '/ˈweɪtɪd/',
              phonetic: 'UEI-tid',
              example:
                'In networking, Weighted Round Robin assigns server capacity. = Il round robin pesato assegna capacità ai server.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Health Check',
              italian: 'controllo stato (health check)',
              pronunciation: '/helθ tʃek/',
              phonetic: 'HELTH CEK',
              example:
                'Every 10 seconds the load balancer sends a health check to each backend, automatically removing any server that fails to respond within the timeout. = Ogni 10 secondi il bilanciatore invia un health check a ogni backend, rimuovendo automaticamente qualsiasi server che non risponde entro il timeout.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Sticky Session',
              italian: 'Sessione sticky',
              pronunciation: '/ˈstɪki ˈseʃən/',
              phonetic: 'STI-ki SES-scion',
              example:
                'For applications that store data in local memory, the load balancer uses a sticky session cookie to route every request from the same user to the same backend server. = Per applicazioni che memorizzano dati in memoria locale, il bilanciatore usa un cookie di sessione sticky per instradare ogni richiesta dello stesso utente allo stesso server backend.',
              context: 'services',
              difficulty: 'intermediate',
              note: 'Anche dette session affinity.',
            },
            {
              english: 'Layer 4 Load Balancer',
              italian: 'bilanciatore Layer 4',
              pronunciation: '/ˈleɪər fɔːr/',
              phonetic: 'LEI-er FOR',
              example:
                'A Layer 4 load balancer distributes connections based on IP and port without inspecting the application payload. = Un bilanciatore Layer 4 distribuisce le connessioni in base a IP e porta senza ispezionare il payload applicativo.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Layer 7 Load Balancer',
              italian: 'bilanciatore Layer 7',
              pronunciation: '/ˈleɪər ˈsevən/',
              phonetic: 'LEI-er SE-ven',
              example:
                'L7 load balancers can route by URL or header. = I bilanciatori L7 possono instradare per URL o header.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Backend',
              italian: 'pool di server (backend)',
              pronunciation: '/ˈbækend/',
              phonetic: 'BAK-end',
              example:
                'The load balancer distributes incoming requests across a pool of backend servers, removing unhealthy instances from rotation automatically. = Il bilanciatore di carico distribuisce le richieste in arrivo tra un pool di server backend, rimuovendo automaticamente le istanze non sane dalla rotazione.',
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Frontend',
              italian: 'punto di ingresso (frontend)',
              pronunciation: '/ˈfrʌntend/',
              phonetic: 'FRANT-end',
              example:
                'Client requests first reach the frontend listener, which terminates TLS and forwards the decrypted traffic to backend pools. = Le richieste dei client raggiungono prima il listener frontend, che termina TLS e inoltra il traffico decrittato ai pool backend.',
              context: 'services',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'net_services_pf_4',
          title: 'Port Forwarding / Port Forwarding',
          description: 'Inoltro di porte',
          items: [
            {
              english: 'Port Forwarding',
              italian: 'Inoltro porta',
              pronunciation: '/pɔːrt ˈfɔːrwərdɪŋ/',
              phonetic: 'PORT FOR-uar-ding',
              example:
                "In networking, Port Forwarding exposes internal services. = L'inoltro porta espone servizi interni.",
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'UPnP',
              italian: 'UPnP',
              pronunciation: '/juː piː en piː/',
              phonetic: 'IU-PI-EN-PI',
              example:
                'In networking, UPnP automatically opens router ports. = UPnP apre automaticamente le porte del router.',
              context: 'services',
              difficulty: 'intermediate',
              note: 'Universal Plug and Play. Spesso disabilitato per sicurezza.',
            },
            {
              english: 'NAT-PMP',
              italian: 'NAT-PMP',
              pronunciation: '/næt piː em piː/',
              phonetic: 'NAT-PI-EM-PI',
              example:
                "By definition, NAT-PMP is the Apple alternative to UPnP. = NAT-PMP è l'alternativa Apple a UPnP.",
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'Local Forward',
              italian: 'Forward locale',
              pronunciation: '/ˈloʊkəl ˈfɔːrwərd/',
              phonetic: 'LO-kal FOR-uard',
              example:
                'SSH local forwarding tunnels remote ports locally. = Il forward locale SSH incanala porte remote localmente.',
              context: 'services',
              difficulty: 'intermediate',
              command: 'ssh -L 8080:localhost:80 user@host',
            },
            {
              english: 'Remote Forward',
              italian: 'Forward remoto',
              pronunciation: '/rɪˈmoʊt/',
              phonetic: 'ri-MOUT',
              example:
                'SSH remote forwarding exposes local ports remotely. = Il forward remoto SSH espone porte locali remotamente.',
              context: 'services',
              difficulty: 'intermediate',
              command: 'ssh -R 8080:localhost:80 user@host',
            },
            {
              english: 'DMZ',
              italian: 'zona demilitarizzata (DMZ)',
              pronunciation: '/diː em ˈzed/',
              phonetic: 'DI-EM-ZED',
              example:
                'In networking, DMZ exposes one host to all external traffic. = DMZ espone un host a tutto il traffico esterno.',
              context: 'services',
              difficulty: 'intermediate',
              note: 'Sui router consumer è una funzione comoda ma rischiosa.',
            },
            {
              english: 'Hole Punching',
              italian: 'perforazione NAT (hole punching)',
              pronunciation: '/hoʊl ˈpʌntʃɪŋ/',
              phonetic: 'HOUL PAN-cing',
              example:
                "For network flexibility, Hole Punching enables P2P through NAT. = L'hole punching abilita P2P attraverso NAT.",
              context: 'services',
              difficulty: 'intermediate',
            },
            {
              english: 'STUN',
              italian: 'STUN',
              pronunciation: '/stʌn/',
              phonetic: 'STAN',
              example:
                "In networking, STUN discovers a host's public address. = STUN scopre l'indirizzo pubblico di un host.",
              context: 'services',
              difficulty: 'intermediate',
              note: 'Session Traversal Utilities for NAT.',
            },
            {
              english: 'TURN',
              italian: 'TURN',
              pronunciation: '/tɜːrn/',
              phonetic: 'TERN',
              example:
                'In networking, TURN relays traffic when STUN fails. = TURN rilancia il traffico quando STUN fallisce.',
              context: 'services',
              difficulty: 'intermediate',
              note: 'Traversal Using Relays around NAT.',
            },
            {
              english: 'ICE',
              italian: 'ICE',
              pronunciation: '/aɪs/',
              phonetic: 'AIS',
              example:
                'In networking, ICE combines STUN and TURN for NAT traversal. = ICE combina STUN e TURN per NAT traversal.',
              context: 'services',
              difficulty: 'intermediate',
              note: 'Interactive Connectivity Establishment. Usato da WebRTC.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 12 - PROTOCOLLI APPLICATIVI / APPLICATION PROTOCOLS
    // ════════════════════════════════════════════════
    12: {
      name: 'Protocolli Applicativi / Application Protocols',
      description: 'Protocolli a livello applicativo',
      lessons: [
        {
          id: 'net_protocols_email_1',
          title: 'Email Protocols / Protocolli Email',
          description: 'SMTP, POP3, IMAP',
          items: [
            {
              english: 'SMTP',
              italian: 'protocollo invio posta (SMTP)',
              pronunciation: '/ˌes em tiː ˈpiː/',
              phonetic: 'ES-EM-TI-PI',
              example:
                'During communication, SMTP sends email between servers. = SMTP invia email tra server.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Simple Mail Transfer Protocol. Porta 25, 587, 465.',
            },
            {
              english: 'POP3',
              italian: 'POP3',
              pronunciation: '/piː oʊ piː θriː/',
              phonetic: 'PI-O-PI-THRI',
              example:
                'In networking, POP3 downloads and removes email from server. = POP3 scarica e rimuove email dal server.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Post Office Protocol. Porta 110, 995 con TLS.',
            },
            {
              english: 'IMAP',
              italian: 'IMAP',
              pronunciation: '/ˈaɪmæp/',
              phonetic: 'AI-MAP',
              example:
                'In networking, IMAP keeps email synchronized across devices. = IMAP mantiene le email sincronizzate tra dispositivi.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Internet Message Access Protocol. Porta 143, 993 con TLS.',
            },
            {
              english: 'MTA',
              italian: 'agente di trasferimento posta (MTA)',
              pronunciation: '/em tiː ˈeɪ/',
              phonetic: 'EM-TI-EI',
              example:
                "When you send an email, your Mail Transfer Agent (such as Postfix or Exim) relays it across the Internet to the recipient's mail server. = Quando invii un'email, il tuo Mail Transfer Agent (come Postfix o Exim) la inoltra attraverso Internet al server di posta del destinatario.",
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'MUA',
              italian: 'client di posta (MUA)',
              pronunciation: '/em juː ˈeɪ/',
              phonetic: 'EM-IU-EI',
              example:
                'End users compose and read messages in a Mail User Agent like Thunderbird, which connects to the server via IMAP or POP3. = Gli utenti finali compongono e leggono messaggi in un Mail User Agent come Thunderbird, che si connette al server via IMAP o POP3.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'SPF',
              italian: 'SPF',
              pronunciation: '/es piː ˈef/',
              phonetic: 'ES-PI-EF',
              example:
                'As a security measure, SPF prevents email spoofing. = SPF previene lo spoofing email.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Pubblicato come record TXT.',
            },
            {
              english: 'DKIM',
              italian: 'DKIM',
              pronunciation: '/ˈdiːkɪm/',
              phonetic: 'DI-KIM',
              example:
                'In networking, DKIM signs outgoing email cryptographically. = DKIM firma le email in uscita crittograficamente.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'DomainKeys Identified Mail.',
            },
            {
              english: 'DMARC',
              italian: 'DMARC',
              pronunciation: '/ˈdiːmɑːrk/',
              phonetic: 'DI-MARK',
              example:
                'In networking, DMARC builds on SPF and DKIM. = DMARC si basa su SPF e DKIM.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Domain-based Message Authentication.',
            },
            {
              english: 'STARTTLS',
              italian: 'STARTTLS',
              pronunciation: '/stɑːrt tiː el es/',
              phonetic: 'START-TI-EL-ES',
              example:
                'In networking, STARTTLS upgrades plaintext to TLS. = STARTTLS aggiorna il plaintext a TLS.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'MX Lookup',
              italian: 'Lookup MX',
              pronunciation: '/em eks ˈlʊkʌp/',
              phonetic: 'EM-EKS LUK-ap',
              example:
                'SMTP servers do MX lookups to deliver mail. = I server SMTP fanno lookup MX per consegnare la posta.',
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'dig +short example.com MX',
            },
          ],
        },
        {
          id: 'net_protocols_file_2',
          title: 'File Transfer / Trasferimento File',
          description: 'FTP, SFTP, SCP',
          items: [
            {
              english: 'FTP',
              italian: 'protocollo trasferimento file (FTP)',
              pronunciation: '/ˌef tiː ˈpiː/',
              phonetic: 'EF-TI-PI',
              example:
                'By definition, FTP is an old file transfer protocol. = FTP è un vecchio protocollo trasferimento file.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'File Transfer Protocol. Insicuro: usa SFTP/FTPS.',
            },
            {
              english: 'FTPS',
              italian: 'FTPS',
              pronunciation: '/ˌef tiː piː ˈes/',
              phonetic: 'EF-TI-PI-ES',
              example:
                'When legacy file servers still demand FTP, FTPS adds a TLS layer so credentials and payload never travel in plaintext. = Quando i server di file legacy richiedono ancora FTP, FTPS aggiunge un livello TLS così credenziali e payload non viaggiano mai in chiaro.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'SFTP',
              italian: 'SFTP',
              pronunciation: '/ˌes ef tiː ˈpiː/',
              phonetic: 'ES-EF-TI-PI',
              example:
                'In production environments, SFTP runs over SSH on port 22. = SFTP gira su SSH alla porta 22.',
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'sftp user@server',
            },
            {
              english: 'SCP',
              italian: 'SCP',
              pronunciation: '/ˌes siː ˈpiː/',
              phonetic: 'ES-SI-PI',
              example:
                'In networking, SCP securely copies files over SSH. = SCP copia in sicurezza file via SSH.',
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'scp file.txt user@server:/tmp/',
            },
            {
              english: 'TFTP',
              italian: 'TFTP',
              pronunciation: '/tiː ef tiː piː/',
              phonetic: 'TI-EF-TI-PI',
              example:
                'By definition, TFTP is used for booting devices. = TFTP è usato per il boot di dispositivi.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'UDP/69. Senza autenticazione.',
            },
            {
              english: 'Active Mode',
              italian: 'Modalità attiva',
              pronunciation: '/ˈæktɪv moʊd/',
              phonetic: 'AK-tiv MOUD',
              example:
                'Active FTP has the server connect back to the client. = FTP attivo fa connettere il server al client.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Spesso problematico con NAT.',
            },
            {
              english: 'Passive Mode',
              italian: 'Modalità passiva',
              pronunciation: '/ˈpæsɪv moʊd/',
              phonetic: 'PA-siv MOUD',
              example: `FTP passive mode lets the client open the data connection, which works better behind NAT and stateful firewalls. = La modalita' passiva di FTP fa aprire al client la connessione dati, e funziona meglio dietro NAT e firewall stateful.`,
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'Rsync',
              italian: 'rsync',
              pronunciation: '/ɑːrˈsɪŋk/',
              phonetic: 'AR-SINK',
              example:
                'In networking, Rsync efficiently syncs files via delta transfer. = Rsync sincronizza efficientemente con trasferimento delta.',
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'rsync -avz src/ user@host:/dst/',
            },
            {
              english: 'WebDAV',
              italian: 'WebDAV',
              pronunciation: '/web dæv/',
              phonetic: 'UEB-DAV',
              example:
                'In networking, WebDAV extends HTTP for file sharing. = WebDAV estende HTTP per la condivisione file.',
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'SMB',
              italian: 'SMB',
              pronunciation: '/ˌes em ˈbiː/',
              phonetic: 'ES-EM-BI',
              example:
                'By definition, SMB is the Windows file-sharing protocol. = SMB è il protocollo Windows di condivisione file.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Linux: usa Samba.',
            },
          ],
        },
        {
          id: 'net_protocols_remote_3',
          title: 'Remote Access / Accesso Remoto',
          description: 'SSH, Telnet, RDP',
          items: [
            {
              english: 'SSH',
              italian: 'Secure Shell (SSH)',
              pronunciation: '/ˌes es ˈeɪtʃ/',
              phonetic: 'ES-ES-EICH',
              example:
                'For network operations, SSH provides encrypted shell access. = SSH fornisce accesso shell cifrato.',
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'ssh user@server',
              note: 'Porta 22 di default.',
            },
            {
              english: 'Telnet',
              italian: 'telnet',
              pronunciation: '/ˈtelnet/',
              phonetic: 'TEL-net',
              example:
                'By definition, Telnet is unencrypted and obsolete. = Telnet non è cifrato ed è obsoleto.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Da non usare per amministrazione: tutto in chiaro.',
            },
            {
              english: 'RDP',
              italian: 'RDP',
              pronunciation: '/ɑːr diː ˈpiː/',
              phonetic: 'AR-DI-PI',
              example:
                'For network operations, RDP provides Windows remote desktop. = RDP fornisce desktop remoto Windows.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Porta 3389.',
            },
            {
              english: 'VNC',
              italian: 'VNC',
              pronunciation: '/viː en siː/',
              phonetic: 'VI-EN-SI',
              example:
                'In networking, VNC shares graphical desktops. = VNC condivide desktop grafici.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Porta 5900.',
            },
            {
              english: 'SSH Key',
              italian: 'chiave SSH',
              pronunciation: '/es es eɪtʃ kiː/',
              phonetic: 'ES-ES-EICH KII',
              example:
                "To harden server access, the security policy requires SSH key authentication and disables password-based login entirely in sshd_config. = Per rafforzare l'accesso ai server, la policy di sicurezza richiede autenticazione con chiave SSH e disabilita completamente il login con password in sshd_config.",
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'ssh-keygen -t ed25519',
            },
            {
              english: 'Public Key Authentication',
              italian: 'autenticazione a chiave pubblica',
              pronunciation: '/ˈpʌblɪk kiː/',
              phonetic: 'PA-blik KII',
              example:
                "Public key auth is more secure than passwords. = L'auth a chiave pubblica è più sicura delle password.",
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'Known Hosts',
              italian: 'host conosciuti (known hosts)',
              pronunciation: '/noʊn hoʊsts/',
              phonetic: 'NOUN HOUSTS',
              example:
                'SSH known_hosts stores server fingerprints. = SSH known_hosts memorizza le fingerprint dei server.',
              context: 'protocols',
              difficulty: 'intermediate',
              code: '~/.ssh/known_hosts',
            },
            {
              english: 'SSH Agent',
              italian: 'Agente SSH',
              pronunciation: '/es es eɪtʃ ˈeɪdʒənt/',
              phonetic: 'ES-ES-EICH EI-gent',
              example:
                'ssh-agent caches private keys in memory. = ssh-agent memorizza chiavi private in RAM.',
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'ssh-add ~/.ssh/id_ed25519',
            },
            {
              english: 'Jump Host',
              italian: 'host di salto (jump host)',
              pronunciation: '/dʒʌmp hoʊst/',
              phonetic: 'GIAMP HOUST',
              example:
                "In networking, a Jump Host gates access to internal servers. = Un jump host controlla l'accesso a server interni.",
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'ssh -J jump@bastion user@internal',
            },
            {
              english: 'Mosh',
              italian: 'Mosh',
              pronunciation: '/mɒʃ/',
              phonetic: 'MOSH',
              example:
                'At its layer, Mosh handles unstable connections better than SSH. = Mosh gestisce meglio di SSH connessioni instabili.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Mobile shell.',
            },
          ],
        },
        {
          id: 'net_protocols_other_4',
          title: 'Other Protocols / Altri Protocolli',
          description: 'SNMP, NTP, LDAP, syslog',
          items: [
            {
              english: 'SNMP',
              italian: 'SNMP',
              pronunciation: '/ˌes en em ˈpiː/',
              phonetic: 'ES-EN-EM-PI',
              example:
                'For visibility, SNMP monitors network devices. = SNMP monitora i dispositivi di rete.',
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'snmpwalk -v 2c -c public 192.168.1.1',
              note: 'Porta UDP 161/162.',
            },
            {
              english: 'MIB',
              italian: 'MIB',
              pronunciation: '/em aɪ ˈbiː/',
              phonetic: 'EM-AI-BI',
              example:
                "Network management stations consult the MIB tree to discover which interface counters and system metrics a device exposes via SNMP. = Le stazioni di gestione di rete consultano l'albero MIB per scoprire quali contatori di interfaccia e metriche di sistema un dispositivo espone via SNMP.",
              context: 'protocols',
              difficulty: 'intermediate',
            },
            {
              english: 'OID',
              italian: 'OID',
              pronunciation: '/oʊ aɪ ˈdiː/',
              phonetic: 'O-AI-DI',
              example: `Each SNMP variable is identified by an OID, a dotted-number path like 1.3.6.1.2.1.2.2.1.10 for ifInOctets. = Ogni variabile SNMP e' identificata da un OID, un percorso di numeri puntati come 1.3.6.1.2.1.2.2.1.10 per ifInOctets.`,
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Object Identifier.',
            },
            {
              english: 'NTP',
              italian: 'NTP',
              pronunciation: '/ˌen tiː ˈpiː/',
              phonetic: 'EN-TI-PI',
              example:
                'In networking, NTP synchronizes clocks over the network. = NTP sincronizza gli orologi sulla rete.',
              context: 'protocols',
              difficulty: 'intermediate',
              command: 'timedatectl status',
              note: 'Porta UDP 123.',
            },
            {
              english: 'Stratum',
              italian: 'livello NTP (stratum)',
              pronunciation: '/ˈstrætəm/',
              phonetic: 'STRA-tum',
              example:
                "NTP stratum indicates clock distance to source. = Lo stratum NTP indica la distanza dell'orologio dalla sorgente.",
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Stratum 0 = orologio atomico/GPS.',
            },
            {
              english: 'LDAP',
              italian: 'LDAP',
              pronunciation: '/ˈeldæp/',
              phonetic: 'EL-DAP',
              example:
                'In networking, LDAP queries directory services. = LDAP interroga servizi di directory.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Porta 389, 636 con TLS.',
            },
            {
              english: 'Active Directory',
              italian: 'Active Directory',
              pronunciation: '/ˈæktɪv dəˈrektri/',
              phonetic: 'AK-tiv di-REK-tri',
              example:
                'Under the hood, Active Directory uses LDAP and Kerberos. = Active Directory usa LDAP e Kerberos.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Servizio di directory di Microsoft per gestione di identità, gruppi e policy in ambienti Windows.',
            },
            {
              english: 'Syslog',
              italian: 'syslog',
              pronunciation: '/ˈsɪslɒɡ/',
              phonetic: 'SIS-log',
              example:
                'In networking, Syslog standardizes log messages. = Syslog standardizza i messaggi di log.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Porta UDP 514.',
            },
            {
              english: 'RADIUS',
              italian: 'RADIUS',
              pronunciation: '/ˈreɪdiəs/',
              phonetic: 'REI-dius',
              example:
                'For security, RADIUS authenticates network users. = RADIUS autentica utenti di rete.',
              context: 'protocols',
              difficulty: 'intermediate',
              note: 'Remote Authentication Dial-In User Service.',
            },
            {
              english: 'TACACS+',
              italian: 'TACACS+',
              pronunciation: '/ˈtækæks plʌs/',
              phonetic: 'TA-kaks PLAS',
              example:
                "By definition, TACACS+ is Cisco's AAA protocol. = TACACS+ è il protocollo AAA di Cisco.",
              context: 'protocols',
              difficulty: 'intermediate',
              note: "Cifra l'intero pacchetto, a differenza di RADIUS.",
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 13 - STRUMENTI DI RETE / NETWORK TOOLS
    // ════════════════════════════════════════════════
    13: {
      name: 'Strumenti di Rete / Network Tools',
      description: 'Tool di diagnostica e analisi',
      lessons: [
        {
          id: 'net_tools_basic_1',
          title: 'Basic Tools / Strumenti Base',
          description: 'ping, traceroute, hostname',
          items: [
            {
              english: 'ping',
              italian: 'ping',
              pronunciation: '/pɪŋ/',
              phonetic: 'PING',
              example:
                'In networking, ping tests basic reachability. = ping testa la raggiungibilità di base.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'ping -c 4 8.8.8.8',
              note: 'Usa pacchetti ICMP echo.',
            },
            {
              english: 'traceroute',
              italian: 'traceroute',
              pronunciation: '/ˈtreɪsruːt/',
              phonetic: 'TREIS-rut',
              example:
                'In networking, traceroute shows the path packets take. = traceroute mostra il percorso dei pacchetti.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'traceroute google.com',
              note: 'Su Windows: tracert.',
            },
            {
              english: 'mtr',
              italian: 'mtr',
              pronunciation: '/em tiː ɑːr/',
              phonetic: 'EM-TI-AR',
              example:
                'In networking, mtr combines ping and traceroute. = mtr combina ping e traceroute.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'mtr google.com',
              tool: 'mtr',
            },
            {
              english: 'hostname',
              italian: 'hostname',
              pronunciation: '/ˈhoʊstneɪm/',
              phonetic: 'HOUST-neim',
              example:
                'In networking, hostname shows the system name. = hostname mostra il nome del sistema.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'hostname -f',
            },
            {
              english: 'nslookup',
              italian: 'nslookup',
              pronunciation: '/en es ˈlʊkʌp/',
              phonetic: 'EN-ES LUK-ap',
              example:
                'In networking, nslookup queries DNS records. = nslookup interroga record DNS.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'nslookup example.com',
            },
            {
              english: 'dig',
              italian: 'dig',
              pronunciation: '/dɪɡ/',
              phonetic: 'DIG',
              example:
                'By definition, dig is more powerful than nslookup. = dig è più potente di nslookup.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'dig +trace example.com',
              note: 'Domain Information Groper.',
            },
            {
              english: 'host command',
              italian: 'comando host',
              pronunciation: '/hoʊst/',
              phonetic: 'HOUST',
              example: `The host command performs a quick DNS lookup, ideal in scripts where you only need the answer without dig's verbosity. = Il comando host esegue un lookup DNS veloce, ideale negli script dove ti serve solo la risposta senza la verbosità di dig.`,
              context: 'tools',
              difficulty: 'advanced',
              command: 'host example.com',
              note: 'Su Linux moderno è spesso un alias di bind-utils ed è più sintetico di dig.',
            },
            {
              english: 'whois',
              italian: 'whois',
              pronunciation: '/huː ɪz/',
              phonetic: 'HU-IZ',
              example:
                'In networking, whois queries domain registration data. = whois interroga dati di registrazione di dominio.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'whois example.com',
            },
            {
              english: 'arp command',
              italian: 'comando arp',
              pronunciation: '/ɑːrp/',
              phonetic: 'ARP',
              example:
                'Running the arp command shows the kernel ARP cache, mapping known IPv4 neighbors to their MAC addresses. = Eseguire il comando arp mostra la cache ARP del kernel, mappando i vicini IPv4 noti ai loro indirizzi MAC.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'arp -n',
              note: `Sui sistemi moderni è spesso sostituito da 'ip neigh', che fa lo stesso ed è più consistente.`,
            },
            {
              english: 'ifconfig',
              italian: 'ifconfig',
              pronunciation: '/aɪ ef ˈkɒnfɪɡ/',
              phonetic: 'AI-EF KON-fig',
              example:
                'In networking, ifconfig shows interface configuration. = ifconfig mostra la configurazione delle interfacce.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'ifconfig -a',
              note: 'Deprecato su Linux moderno: usa ip.',
            },
          ],
        },
        {
          id: 'net_tools_modern_2',
          title: 'Modern Tools / Strumenti Moderni',
          description: 'ip, ss, nmcli',
          items: [
            {
              english: 'ip command',
              italian: 'comando ip',
              pronunciation: '/aɪ piː/',
              phonetic: 'AI-PI',
              example:
                'The ip command from iproute2 replaces ifconfig and route, exposing every Linux networking knob in one tool. = Il comando ip di iproute2 sostituisce ifconfig e route, esponendo ogni leva del networking Linux in un singolo tool.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'ip addr show',
              note: `Sintassi tipica: ip <oggetto> <azione>, es. 'ip addr add', 'ip route show'.`,
            },
            {
              english: 'ss',
              italian: 'ss',
              pronunciation: '/es es/',
              phonetic: 'ES-ES',
              example:
                'In networking, ss replaces netstat with better performance. = ss sostituisce netstat con prestazioni migliori.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'ss -tulnp',
              note: 'Socket Statistics.',
            },
            {
              english: 'netstat',
              italian: 'netstat',
              pronunciation: '/ˈnetstæt/',
              phonetic: 'NET-stat',
              example:
                'In networking, netstat shows network connections. = netstat mostra le connessioni di rete.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'netstat -tulnp',
              note: 'Deprecato: preferire ss.',
            },
            {
              english: 'nmcli',
              italian: 'nmcli',
              pronunciation: '/en em siː el aɪ/',
              phonetic: 'EN-EM-SI-EL-AI',
              example:
                'In networking, nmcli controls NetworkManager. = nmcli controlla NetworkManager.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'nmcli connection show',
            },
            {
              english: 'NetworkManager',
              italian: 'NetworkManager',
              pronunciation: '/ˈnetwɜːrk ˈmænɪdʒər/',
              phonetic: 'NET-uerk MA-ni-ger',
              example:
                'At its layer, NetworkManager handles desktop networking. = NetworkManager gestisce la rete desktop.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'NetworkManager',
            },
            {
              english: 'systemd-networkd',
              italian: 'systemd-networkd',
              pronunciation: '/ˈsɪstəmdiː ˈnetwɜːrkdiː/',
              phonetic: 'SI-stem-di NET-uerk-di',
              example:
                'In networking, systemd-networkd configures networking on servers. = systemd-networkd configura la rete sui server.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'systemd-networkd',
            },
            {
              english: 'iperf3',
              italian: 'iperf3',
              pronunciation: '/aɪ pɜːrf θriː/',
              phonetic: 'AI-PERF-THRI',
              example:
                'In networking, iperf3 measures network throughput. = iperf3 misura il throughput di rete.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'iperf3 -c server.example.com',
            },
            {
              english: 'ethtool',
              italian: 'ethtool',
              pronunciation: '/ˈiːθtuːl/',
              phonetic: 'ITH-tul',
              example:
                'In networking, ethtool inspects NIC settings. = ethtool ispeziona le impostazioni della NIC.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'ethtool eth0',
            },
            {
              english: 'iw',
              italian: 'iw',
              pronunciation: '/aɪ ˈdʌbljuː/',
              phonetic: 'AI-DABOL-IU',
              example:
                'In networking, iw configures wireless devices on Linux. = iw configura dispositivi wireless su Linux.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'iw dev wlan0 link',
            },
            {
              english: 'route',
              italian: 'route',
              pronunciation: '/ruːt/',
              phonetic: 'RUUT',
              example:
                'In networking, route shows the routing table. = route mostra la tabella di routing.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'route -n',
              note: 'Su Linux moderno usa: ip route.',
            },
          ],
        },
        {
          id: 'net_tools_capture_3',
          title: 'Packet Capture / Cattura Pacchetti',
          description: 'tcpdump e Wireshark',
          items: [
            {
              english: 'tcpdump',
              italian: 'tcpdump',
              pronunciation: '/tiː siː piː dʌmp/',
              phonetic: 'TI-SI-PI DAMP',
              example:
                'In networking, tcpdump captures and displays packets. = tcpdump cattura e visualizza pacchetti.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'tcpdump -i eth0 -n port 80',
            },
            {
              english: 'Wireshark',
              italian: 'Wireshark',
              pronunciation: '/ˈwaɪərʃɑːrk/',
              phonetic: 'UAI-er-shark',
              example:
                'For network operations, Wireshark provides graphical packet analysis. = Wireshark fornisce analisi grafica dei pacchetti.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Wireshark',
              note: 'Analizzatore di protocollo grafico più diffuso, basato sulla libreria libpcap.',
            },
            {
              english: 'tshark',
              italian: 'tshark',
              pronunciation: '/tiː ʃɑːrk/',
              phonetic: 'TI-SHARK',
              example:
                'By definition, tshark is the CLI version of Wireshark. = tshark è la versione CLI di Wireshark.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'tshark -i eth0',
            },
            {
              english: 'pcap',
              italian: 'pcap',
              pronunciation: '/piː kæp/',
              phonetic: 'PI-KAP',
              example:
                'By definition, pcap is the standard packet capture format. = pcap è il formato standard di cattura pacchetti.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'tcpdump -w capture.pcap',
            },
            {
              english: 'BPF',
              italian: 'BPF',
              pronunciation: '/biː piː ef/',
              phonetic: 'BI-PI-EF',
              example:
                'For traffic control, BPF filters packets in the kernel. = BPF filtra i pacchetti nel kernel.',
              context: 'tools',
              difficulty: 'advanced',
              code: 'host 1.2.3.4 and port 443',
            },
            {
              english: 'Capture Filter',
              italian: 'filtro di cattura',
              pronunciation: '/ˈkæptʃər ˈfɪltər/',
              phonetic: 'KAP-cer FIL-ter',
              example:
                "Before starting a packet trace on a busy server, the analyst sets a capture filter for port 443 to avoid filling the disk with irrelevant traffic. = Prima di avviare un packet trace su un server trafficato, l'analista imposta un filtro di cattura per la porta 443 per evitare di riempire il disco con traffico irrilevante.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Display Filter',
              italian: 'filtro di visualizzazione',
              pronunciation: '/dɪˈspleɪ ˈfɪltər/',
              phonetic: 'di-SPLEI FIL-ter',
              example:
                'Wireshark display filters narrow visible packets. = I filtri di visualizzazione Wireshark limitano i pacchetti visibili.',
              context: 'tools',
              difficulty: 'advanced',
              code: 'tcp.port == 443',
            },
            {
              english: 'Promiscuous Mode',
              italian: 'Modalità promiscua',
              pronunciation: '/prəˈmɪskjuəs/',
              phonetic: 'pro-MIS-kius',
              example:
                'In networking, Promiscuous Mode captures all packets on the wire. = La modalità promiscua cattura tutti i pacchetti sul filo.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'SPAN Port',
              italian: 'Porta SPAN',
              pronunciation: '/spæn pɔːrt/',
              phonetic: 'SPAN PORT',
              example:
                "The switch administrator configures a SPAN port to mirror all traffic from the server VLAN to the IDS appliance for deep packet inspection. = L'amministratore dello switch configura una porta SPAN per mirrorare tutto il traffico dalla VLAN server all'appliance IDS per deep packet inspection.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'Switched Port Analyzer.',
            },
            {
              english: 'Tap',
              italian: 'tap di rete',
              pronunciation: '/tæp/',
              phonetic: 'TAP',
              example:
                'A network tap copies traffic to a monitor port. = Un tap di rete copia il traffico su una porta monitor.',
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_tools_scan_4',
          title: 'Scanning / Scansione',
          description: 'nmap, masscan, fping',
          items: [
            {
              english: 'nmap',
              italian: 'nmap',
              pronunciation: '/en mæp/',
              phonetic: 'EN-MAP',
              example:
                'In networking, nmap discovers hosts and open ports. = nmap scopre host e porte aperte.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'nmap -sV -p 1-1000 192.168.1.0/24',
              note: 'Network Mapper.',
            },
            {
              english: 'Port Scan',
              italian: 'Scansione porte',
              pronunciation: '/pɔːrt skæn/',
              phonetic: 'PORT SKAN',
              example:
                'During the reconnaissance phase, the penetration tester runs a port scan against the target range to map every listening service and its version. = Durante la fase di ricognizione, il penetration tester esegue una scansione porte contro il range target per mappare ogni servizio in ascolto e la sua versione.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'SYN Scan',
              italian: 'Scansione SYN',
              pronunciation: '/sɪn skæn/',
              phonetic: 'SIN SKAN',
              example:
                "Penetration testers prefer SYN scans because they never complete the TCP handshake, making them harder for basic firewalls to log. = I penetration tester preferiscono le scansioni SYN perche non completano mai l'handshake TCP, rendendole piu difficili da loggare per i firewall di base.",
              context: 'tools',
              difficulty: 'advanced',
              command: 'nmap -sS target',
              note: 'Half-open scan.',
            },
            {
              english: 'masscan',
              italian: 'masscan',
              pronunciation: '/mæs skæn/',
              phonetic: 'MAS-SKAN',
              example:
                'When properly configured, masscan can scan the entire Internet quickly. = masscan può scansionare tutto Internet rapidamente.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'masscan',
            },
            {
              english: 'fping',
              italian: 'fping',
              pronunciation: '/ef pɪŋ/',
              phonetic: 'EF-PING',
              example:
                'In networking, fping pings many hosts in parallel. = fping pinga molti host in parallelo.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'fping -g 192.168.1.0/24',
            },
            {
              english: 'Service Detection',
              italian: 'Rilevamento servizio',
              pronunciation: '/ˈsɜːrvɪs dɪˈtekʃən/',
              phonetic: 'SER-vis di-TEK-scion',
              example:
                'During analysis, Service Detection identifies software versions. = Il rilevamento servizio identifica versioni software.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'nmap -sV target',
            },
            {
              english: 'OS Detection',
              italian: 'rilevamento sistema operativo',
              pronunciation: '/oʊ es/',
              phonetic: 'O-ES',
              example: `nmap OS detection (-O) sends crafted probes and matches the TCP/IP stack fingerprint against its signature database. = L'OS detection di nmap (-O) invia probe costruiti ad hoc e confronta l'impronta dello stack TCP/IP con il suo database di firme.`,
              context: 'tools',
              difficulty: 'advanced',
              command: 'nmap -O target',
            },
            {
              english: 'Banner Grabbing',
              italian: 'cattura banner (banner grabbing)',
              pronunciation: '/ˈbænər ˈɡræbɪŋ/',
              phonetic: 'BA-ner GRA-bing',
              example:
                'In networking, Banner Grabbing reads service identification strings. = Il banner grabbing legge stringhe di identificazione servizio.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'NSE',
              italian: 'NSE',
              pronunciation: '/en es ˈiː/',
              phonetic: 'EN-ES-I',
              example:
                'In networking, NSE extends nmap with Lua scripts. = NSE estende nmap con script Lua.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'nmap --script vuln target',
            },
            {
              english: 'Zenmap',
              italian: 'Zenmap',
              pronunciation: '/zen mæp/',
              phonetic: 'ZEN-MAP',
              example: 'By definition, Zenmap is the GUI for nmap. = Zenmap è la GUI per nmap.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Zenmap',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 14 - TROUBLESHOOTING / TROUBLESHOOTING
    // ════════════════════════════════════════════════
    14: {
      name: 'Risoluzione Problemi / Troubleshooting',
      description: 'Diagnosi e risoluzione di problemi di rete',
      lessons: [
        {
          id: 'net_troubleshoot_1',
          title: 'Common Issues / Problemi Comuni',
          description: 'Problemi tipici di rete',
          items: [
            {
              english: 'Connectivity Issue',
              italian: 'problema di connettività',
              pronunciation: '/ˌkɒnekˈtɪvɪti/',
              phonetic: 'kon-nek-TI-vi-ti',
              example:
                'When diagnosing a connectivity issue, the technician starts at Layer 1 checking cables and works up to Layer 7 examining application logs. = Quando si diagnostica un problema di connettivita, il tecnico inizia da Layer 1 controllando i cavi e sale fino a Layer 7 esaminando i log applicativi.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'packet loss rate',
              italian: 'tasso di perdita pacchetti',
              pronunciation: '/ˈpækɪt lɒs/',
              phonetic: 'PAK-ket LOS',
              example:
                'A persistent 2% packet loss rate cripples TCP throughput long before users notice individual missing packets. = Un tasso di perdita pacchetti persistente del 2% degrada drasticamente il throughput TCP molto prima che gli utenti notino singoli pacchetti mancanti.',
              context: 'troubleshooting',
              difficulty: 'advanced',
              command: 'mtr -r -c 100 google.com',
              note: 'Su WAN/Internet anche valori bassi (>1%) collassano la finestra di congestione TCP.',
            },
            {
              english: 'High Latency',
              italian: 'Latenza alta',
              pronunciation: '/haɪ ˈleɪtənsi/',
              phonetic: 'HAI LEI-ten-si',
              example:
                'In networking, High Latency hurts interactive applications. = Una latenza alta danneggia applicazioni interattive.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'network jitter',
              italian: 'jitter di rete',
              pronunciation: '/ˈdʒɪtər/',
              phonetic: 'GI-ter',
              example:
                'High network jitter ruins VoIP calls even when bandwidth is plenty, because packets arrive out of cadence. = Un alto jitter di rete rovina le chiamate VoIP anche con banda abbondante, perché i pacchetti arrivano fuori cadenza.',
              context: 'troubleshooting',
              difficulty: 'advanced',
              note: 'Misurato come deviazione del ritardo tra pacchetti consecutivi.',
            },
            {
              english: 'Asymmetric Routing',
              italian: 'routing asimmetrico',
              pronunciation: '/ˌeɪsɪˈmetrɪk/',
              phonetic: 'ei-si-ME-trik',
              example:
                'In networking, Asymmetric Routing breaks stateful firewalls. = Il routing asimmetrico rompe firewall stateful.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Black Hole',
              italian: 'Buco nero',
              pronunciation: '/blæk hoʊl/',
              phonetic: 'BLAK-HOUL',
              example:
                'In networking, a Black Hole silently drops packets. = Un buco nero scarta silenziosamente i pacchetti.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Brownout',
              italian: 'degradazione del servizio (brownout)',
              pronunciation: '/ˈbraʊnaʊt/',
              phonetic: 'BRAUN-aut',
              example:
                'By definition, a Brownout is partial degradation. = Un brownout è una degradazione parziale.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Flapping',
              italian: 'oscillazione del link (flapping)',
              pronunciation: '/ˈflæpɪŋ/',
              phonetic: 'FLA-ping',
              example:
                'In networking, a Flapping link goes up and down repeatedly. = Un link flapping va su e giù ripetutamente.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Microburst',
              italian: 'picco di traffico (microburst)',
              pronunciation: '/ˈmaɪkroʊbɜːrst/',
              phonetic: 'MAI-kro-berst',
              example:
                'Even on a lightly loaded link, a sudden microburst of traffic can overflow the switch buffer and cause packet drops within milliseconds. = Anche su un link poco caricato, un microburst improvviso di traffico puo far traboccare il buffer dello switch e causare perdita di pacchetti in millisecondi.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Duplex Mismatch',
              italian: 'Mismatch duplex',
              pronunciation: '/ˈduːpleks ˈmɪsmætʃ/',
              phonetic: 'DU-pleks MIS-mach',
              example:
                'In networking, Duplex Mismatch causes collisions and slowness. = Un mismatch duplex causa collisioni e lentezza.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_troubleshoot_2',
          title: 'MTU & Fragmentation / MTU e Frammentazione',
          description: 'Problemi di dimensione pacchetti',
          items: [
            {
              english: 'path MTU',
              italian: 'MTU di percorso',
              pronunciation: '/em tiː juː/',
              phonetic: 'EM-TI-IU',
              example: `The path MTU is the smallest MTU along the route between two hosts and determines the largest packet that crosses without fragmentation. = L'MTU di percorso e' il minimo MTU lungo la rotta tra due host e determina il pacchetto più grande che attraversa senza frammentazione.`,
              context: 'troubleshooting',
              difficulty: 'advanced',
              command: 'ip link set dev eth0 mtu 1500',
              note: `Scoperto dinamicamente con Path MTU Discovery via ICMP 'Fragmentation Needed'.`,
            },
            {
              english: 'Path MTU Discovery',
              italian: 'scoperta MTU del percorso (PMTUD)',
              pronunciation: '/pæθ em tiː juː/',
              phonetic: 'PATH EM-TI-IU',
              example:
                'PMTUD finds the smallest MTU on the path. = PMTUD trova la MTU più piccola sul percorso.',
              context: 'troubleshooting',
              difficulty: 'advanced',
              note: 'Spesso rotto dai firewall che bloccano ICMP.',
            },
            {
              english: 'MSS',
              italian: 'dimensione massima del segmento (MSS)',
              pronunciation: '/em es es/',
              phonetic: 'EM-ES-ES',
              example:
                'By definition, MSS is MTU minus IP and TCP headers. = MSS è MTU meno header IP e TCP.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'MSS Clamping',
              italian: 'MSS clamping',
              pronunciation: '/em es es ˈklæmpɪŋ/',
              phonetic: 'EM-ES-ES KLAM-ping',
              example:
                'In networking, MSS Clamping forces a smaller TCP MSS. = Il MSS clamping forza un MSS TCP più piccolo.',
              context: 'troubleshooting',
              difficulty: 'advanced',
              code: 'iptables -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu',
            },
            {
              english: "Don't Fragment",
              italian: "flag Don't Fragment (DF)",
              pronunciation: '/doʊnt ˈfræɡmənt/',
              phonetic: 'DOUNT FRAG-ment',
              example: `Path MTU Discovery relies on the Don't Fragment flag: routers drop oversized packets and send back ICMP messages. = Il Path MTU Discovery si basa sul flag Don't Fragment: i router scartano i pacchetti troppo grandi e rimandano messaggi ICMP.`,
              context: 'troubleshooting',
              difficulty: 'advanced',
              command: 'ping -M do -s 1472 google.com',
            },
            {
              english: 'IP Fragmentation',
              italian: 'frammentazione IP',
              pronunciation: '/ˌfræɡmenˈteɪʃən/',
              phonetic: 'frag-men-TEI-scion',
              example:
                'In networking, IP Fragmentation hurts performance. = La frammentazione IP danneggia le prestazioni.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Reassembly',
              italian: 'riassemblaggio',
              pronunciation: '/ˌriːəˈsembli/',
              phonetic: 'ri-as-SEM-bli',
              example:
                'IP reassembly happens at the destination. = Il riassemblaggio IP avviene a destinazione.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Tunnel Overhead',
              italian: 'Overhead di tunnel',
              pronunciation: '/ˈtʌnl/',
              phonetic: 'TA-nel',
              example:
                "Adding GRE or IPsec encapsulation headers creates tunnel overhead that reduces the effective MTU below the standard 1500 bytes. = L'aggiunta di header di incapsulamento GRE o IPsec crea overhead del tunnel che riduce la MTU effettiva sotto i 1500 byte standard.",
              context: 'troubleshooting',
              difficulty: 'advanced',
              note: 'Esempi: GRE 24B, IPsec 50-100B.',
            },
            {
              english: 'Jumbograms',
              italian: 'Jumbogram',
              pronunciation: '/ˈdʒʌmboʊɡræm/',
              phonetic: 'GIAM-bo-gram',
              example: `On storage backends, jumbograms with an MTU near 9000 bytes cut per-packet overhead and boost throughput considerably. = Sui backend di storage, i jumbogram con MTU vicino a 9000 byte riducono l'overhead per pacchetto e aumentano notevolmente il throughput.`,
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'PMTUD Black Hole',
              italian: 'buco nero PMTUD',
              pronunciation: '/piː em tiː juː diː/',
              phonetic: 'PI-EM-TI-IU-DI',
              example:
                'In networking, a PMTUD Black Hole occurs when ICMP is blocked. = Un buco nero PMTUD avviene quando ICMP è bloccato.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_troubleshoot_3',
          title: 'Latency Analysis / Analisi Latenza',
          description: 'Misurare e analizzare la latenza',
          items: [
            {
              english: 'RTT',
              italian: 'tempo di andata e ritorno (RTT)',
              pronunciation: '/ɑːr tiː tiː/',
              phonetic: 'AR-TI-TI',
              example:
                'By definition, RTT is the round-trip time. = RTT è il tempo di andata e ritorno.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Propagation Delay',
              italian: 'ritardo di propagazione',
              pronunciation: '/ˌprɒpəˈɡeɪʃən/',
              phonetic: 'pro-pa-GHEI-scion',
              example:
                'By definition, Propagation Delay is bound by the speed of light. = Il ritardo di propagazione è limitato dalla velocità della luce.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Serialization Delay',
              italian: 'ritardo di serializzazione',
              pronunciation: '/ˌsɪərɪəlaɪˈzeɪʃən/',
              phonetic: 'si-ria-li-ZEI-scion',
              example:
                'In networking, Serialization Delay depends on link speed. = Il ritardo di serializzazione dipende dalla velocità del link.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Queuing Delay',
              italian: 'ritardo di coda',
              pronunciation: '/ˈkjuːɪŋ/',
              phonetic: 'KIU-ing',
              example:
                'In networking, Queuing Delay grows with congestion. = Il ritardo di coda cresce con la congestione.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Bufferbloat',
              italian: 'bufferbloat',
              pronunciation: '/ˈbʌfərbloʊt/',
              phonetic: 'BA-fer-blout',
              example:
                'In networking, Bufferbloat causes excessive latency under load. = Il bufferbloat causa latenza eccessiva sotto carico.',
              context: 'troubleshooting',
              difficulty: 'advanced',
              note: 'Mitigato da CoDel, fq_codel, CAKE.',
            },
            {
              english: 'Bandwidth-Delay Product',
              italian: 'prodotto banda-ritardo (BDP)',
              pronunciation: '/ˈbændwɪdθ dɪˈleɪ/',
              phonetic: 'BAND-uidth di-LEI',
              example:
                'The bandwidth-delay product tells you the in-flight bytes a TCP window must hold to keep a fat long pipe saturated. = Il prodotto banda-ritardo indica i byte in volo che una finestra TCP deve contenere per saturare un canale grosso e lungo.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'TCP Slow Start',
              italian: 'partenza lenta TCP (slow start)',
              pronunciation: '/sloʊ stɑːrt/',
              phonetic: 'SLOU-START',
              example:
                'In networking, TCP Slow Start ramps up the window. = TCP slow start aumenta gradualmente la finestra.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Congestion Window',
              italian: 'finestra di congestione (cwnd)',
              pronunciation: '/kənˈdʒestʃən/',
              phonetic: 'kon-GES-cion',
              example:
                'cwnd grows on success and shrinks on loss. = cwnd cresce in caso di successo e si riduce in perdita.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'BBR',
              italian: 'BBR',
              pronunciation: '/biː biː ɑːr/',
              phonetic: 'BI-BI-AR',
              example:
                'By definition, BBR is a modern TCP congestion algorithm. = BBR è un algoritmo TCP di congestione moderno.',
              context: 'troubleshooting',
              difficulty: 'advanced',
              note: 'Bottleneck Bandwidth and RTT. Sviluppato da Google.',
            },
            {
              english: 'Latency Spike',
              italian: 'picco di latenza',
              pronunciation: '/ˈleɪtənsi spaɪk/',
              phonetic: 'LEI-ten-si SPAIK',
              example:
                'The monitoring dashboard flagged repeated latency spikes every hour, which the team traced to a scheduled backup job saturating the WAN link. = La dashboard di monitoraggio ha segnalato ripetuti picchi di latenza ogni ora, che il team ha ricondotto a un job di backup schedulato che saturava il link WAN.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_troubleshoot_methodology_4',
          title: 'Methodology / Metodologia',
          description: 'Approccio sistematico al troubleshooting',
          items: [
            {
              english: 'Bottom-Up',
              italian: 'approccio dal basso (bottom-up)',
              pronunciation: '/ˈbɒtəm ʌp/',
              phonetic: 'BO-tom AP',
              example:
                'In networking, Bottom-Up troubleshooting starts at Layer 1. = Il troubleshooting bottom-up parte dal Layer 1.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Top-Down',
              italian: "approccio dall'alto (top-down)",
              pronunciation: '/tɒp daʊn/',
              phonetic: 'TOP-DAUN',
              example:
                "In networking, Top-Down starts from the application. = Top-down parte dall'applicazione.",
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Divide and Conquer',
              italian: 'Divide et impera',
              pronunciation: '/dɪˈvaɪd ænd ˈkɒŋkər/',
              phonetic: 'di-VAID and KON-ker',
              example:
                'In networking, Divide and Conquer narrows down the issue. = Divide et impera restringe il problema.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Baseline',
              italian: 'riferimento prestazioni (baseline)',
              pronunciation: '/ˈbeɪslaɪn/',
              phonetic: 'BEIS-lain',
              example:
                'In networking, a Baseline shows normal performance. = Una baseline mostra le prestazioni normali.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Root Cause',
              italian: 'Causa radice',
              pronunciation: '/ruːt kɔːz/',
              phonetic: 'RUUT KOZ',
              example: `Always document the root cause of a network outage so the same misconfiguration does not bite the team twice. = Documenta sempre la causa radice di un'interruzione di rete così la stessa misconfigurazione non colpisce due volte il team.`,
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'RCA',
              italian: 'analisi causa principale (RCA)',
              pronunciation: '/ɑːr siː ˈeɪ/',
              phonetic: 'AR-SI-EI',
              example:
                'In networking, RCA documents what caused the outage. = RCA documenta cosa ha causato il disservizio.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Postmortem',
              italian: 'analisi post-incidente (postmortem)',
              pronunciation: '/poʊstˈmɔːrtəm/',
              phonetic: 'POUST-mor-tem',
              example:
                'By definition, a Postmortem is a blameless review. = Un postmortem è una review senza colpe.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Hypothesis',
              italian: 'ipotesi',
              pronunciation: '/haɪˈpɒθəsɪs/',
              phonetic: 'hai-PO-the-sis',
              example:
                "Form a hypothesis before changing anything. = Formula un'ipotesi prima di cambiare qualcosa.",
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Observability',
              italian: 'osservabilità',
              pronunciation: '/əbˌzɜːrvəˈbɪlɪti/',
              phonetic: 'ob-zer-va-BI-li-ti',
              example:
                'In networking, Observability tools speed up troubleshooting. = I tool di osservabilità velocizzano il troubleshooting.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
            {
              english: 'Change Control',
              italian: 'Controllo dei cambiamenti',
              pronunciation: '/tʃeɪndʒ kənˈtroʊl/',
              phonetic: 'CEINGE kon-TROUL',
              example:
                'By optimizing traffic, Change Control reduces outages. = Il controllo dei cambiamenti riduce i disservizi.',
              context: 'troubleshooting',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 15 - QoS / QoS
    // ════════════════════════════════════════════════
    15: {
      name: 'QoS / Quality of Service',
      description: 'Qualità del servizio e gestione del traffico',
      lessons: [
        {
          id: 'net_qos_1',
          title: 'QoS Basics / Basi QoS',
          description: 'Concetti fondamentali di QoS',
          items: [
            {
              english: 'QoS',
              italian: 'qualità del servizio (QoS)',
              pronunciation: '/kjuː oʊ es/',
              phonetic: 'KIU-O-ES',
              example:
                'In networking, QoS prioritizes critical traffic. = QoS dà priorità al traffico critico.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Quality of Service.',
            },
            {
              english: 'Traffic Shaping',
              italian: 'modellamento del traffico (traffic shaping)',
              pronunciation: '/ˈtræfɪk ˈʃeɪpɪŋ/',
              phonetic: 'TRA-fik SHEI-ping',
              example:
                'In networking, Traffic Shaping smooths bursts. = Il traffic shaping spiana i burst.',
              context: 'services',
              difficulty: 'advanced',
              command: 'tc qdisc add dev eth0 root tbf rate 1mbit burst 32kbit latency 400ms',
            },
            {
              english: 'Traffic Policing',
              italian: 'controllo della banda (traffic policing)',
              pronunciation: '/pəˈliːsɪŋ/',
              phonetic: 'po-LI-sing',
              example:
                'Policing drops traffic exceeding the rate. = Il policing scarta il traffico oltre la rate.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Priority Queuing',
              italian: 'Coda prioritaria',
              pronunciation: '/praɪˈɒrɪti ˈkjuːɪŋ/',
              phonetic: 'prai-O-ri-ti KIU-ing',
              example:
                'In networking, Priority Queuing always serves high priority first. = La coda prioritaria serve sempre la priorità alta per prima.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Weighted Fair Queuing',
              italian: 'Coda weighted fair',
              pronunciation: '/ˈweɪtɪd feər/',
              phonetic: 'UEI-tid FEER',
              example:
                'In a congested link, Weighted Fair Queuing allocates proportional bandwidth to each traffic class based on its assigned weight value. = In un collegamento congestionato, il Weighted Fair Queuing alloca banda proporzionale a ogni classe di traffico basandosi sul valore di peso assegnato.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'CBWFQ',
              italian: 'CBWFQ',
              pronunciation: '/siː biː dʌbljuː ef kjuː/',
              phonetic: 'SI-BI-DABOL-IU-EF-KIU',
              example:
                'For network operations, CBWFQ provides bandwidth guarantees per class. = CBWFQ garantisce banda per classe.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Class-Based Weighted Fair Queuing.',
            },
            {
              english: 'Bandwidth Reservation',
              italian: 'Prenotazione banda',
              pronunciation: '/ˌrezərˈveɪʃən/',
              phonetic: 'rez-er-VEI-scion',
              example:
                'In networking, Bandwidth Reservation guarantees minimum speed. = La prenotazione di banda garantisce velocità minima.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'best-effort class',
              italian: 'classe best-effort',
              pronunciation: '/best ˈefərt/',
              phonetic: 'BEST E-fort',
              example:
                'In a DiffServ design the best-effort class gets whatever bandwidth is left after voice, video and business traffic are served. = In una progettazione DiffServ la classe best-effort riceve la banda residua dopo aver servito voce, video e traffico business.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Corrisponde al DSCP 0 (default) e ha la priorità più bassa.',
            },
            {
              english: 'Voice Traffic',
              italian: 'traffico voce',
              pronunciation: '/vɔɪs ˈtræfɪk/',
              phonetic: 'VOIS TRA-fik',
              example:
                'In networking, Voice Traffic needs low latency and jitter. = Il traffico voce necessita di bassa latenza e jitter.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Burst Tolerance',
              italian: 'Tolleranza ai burst',
              pronunciation: '/bɜːrst ˈtɒlərəns/',
              phonetic: 'BERST TO-le-rans',
              example:
                'For better performance, Burst Tolerance allows brief over-rate. = La tolleranza ai burst permette breve sovra-rate.',
              context: 'services',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_qos_dscp_2',
          title: 'DSCP & Marking / DSCP e Marcatura',
          description: 'Classificare e marcare il traffico',
          items: [
            {
              english: 'DSCP',
              italian: 'DSCP',
              pronunciation: '/diː es siː piː/',
              phonetic: 'DI-ES-SI-PI',
              example:
                'In networking, DSCP marks IP packets for QoS. = DSCP marca pacchetti IP per QoS.',
              context: 'services',
              difficulty: 'advanced',
              note: "6 bit nell'header IP.",
            },
            {
              english: 'ToS',
              italian: 'ToS',
              pronunciation: '/tiː oʊ es/',
              phonetic: 'TI-O-ES',
              example:
                'By definition, ToS is the older field replaced by DSCP. = ToS è il vecchio campo sostituito da DSCP.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'EF',
              italian: 'EF',
              pronunciation: '/iː ef/',
              phonetic: 'I-EF',
              example:
                'By definition, EF is used for voice traffic. = EF è usato per il traffico voce.',
              context: 'services',
              difficulty: 'advanced',
              note: 'EF (Expedited Forwarding, DSCP 46) è la classe a priorità più alta, usata per traffico voce.',
            },
            {
              english: 'AF',
              italian: 'AF',
              pronunciation: '/eɪ ef/',
              phonetic: 'EI-EF',
              example:
                'In networking, AF classes have drop precedence levels. = Le classi AF hanno livelli di drop precedence.',
              context: 'services',
              difficulty: 'advanced',
              note: 'AF (Assured Forwarding) definisce 4 classi con 3 livelli di drop precedence ciascuna.',
            },
            {
              english: 'CoS',
              italian: 'CoS',
              pronunciation: '/siː oʊ es/',
              phonetic: 'SI-O-ES',
              example: 'In networking, CoS marks Layer 2 frames. = CoS marca frame Layer 2.',
              context: 'services',
              difficulty: 'advanced',
              note: '3 bit nel tag VLAN 802.1p.',
            },
            {
              english: 'Marking',
              italian: 'marcatura (marking)',
              pronunciation: '/ˈmɑːrkɪŋ/',
              phonetic: 'MAR-king',
              example:
                'In networking, Marking sets QoS values on packets. = La marcatura imposta valori QoS sui pacchetti.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Trust Boundary',
              italian: 'Confine di fiducia',
              pronunciation: '/trʌst ˈbaʊndri/',
              phonetic: 'TRAST BAUN-dri',
              example:
                'In networking, Trust Boundary marks where QoS markings begin. = Il confine di fiducia segna dove iniziano le marcature QoS.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Re-marking',
              italian: 'Re-marcatura',
              pronunciation: '/riː ˈmɑːrkɪŋ/',
              phonetic: 'RI-MAR-king',
              example:
                'Edge devices may re-mark untrusted traffic. = I dispositivi edge possono re-marcare traffico non fidato.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Default Forwarding',
              italian: 'inoltro predefinito (DF)',
              pronunciation: '/dɪˈfɔːlt ˈfɔːrwərdɪŋ/',
              phonetic: 'di-FOLT FOR-uar-ding',
              example:
                'Packets without any QoS marking receive DSCP 0 (default forwarding), meaning they get best-effort treatment from all routers in the path. = I pacchetti senza marcatura QoS ricevono DSCP 0 (default forwarding), il che significa che ricevono trattamento best-effort da tutti i router nel percorso.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Class Selector',
              italian: 'selettore di classe',
              pronunciation: '/klæs sɪˈlektər/',
              phonetic: 'KLAS si-LEK-ter',
              example:
                'In networking, Class Selector codepoints map to legacy IP precedence. = I codepoint Class Selector mappano la legacy IP precedence.',
              context: 'services',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_qos_rsvp_3',
          title: 'RSVP & Reservation / RSVP e Prenotazione',
          description: 'Protocolli di prenotazione',
          items: [
            {
              english: 'RSVP',
              italian: 'RSVP',
              pronunciation: '/ɑːr es viː piː/',
              phonetic: 'AR-ES-VI-PI',
              example:
                'In networking, RSVP reserves resources along the path. = RSVP prenota risorse lungo il percorso.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'IntServ',
              italian: 'IntServ',
              pronunciation: '/ɪnt sɜːrv/',
              phonetic: 'INT-SERV',
              example:
                'For network operations, IntServ provides per-flow guarantees. = IntServ fornisce garanzie per-flusso.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Non scala bene.',
            },
            {
              english: 'DiffServ',
              italian: 'DiffServ',
              pronunciation: '/dɪf sɜːrv/',
              phonetic: 'DIF-SERV',
              example:
                'Under the hood, DiffServ uses class-based QoS. = DiffServ usa QoS basata su classi.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Modello attuale per QoS.',
            },
            {
              english: 'Admission Control',
              italian: 'Controllo di ammissione',
              pronunciation: '/ədˈmɪʃən/',
              phonetic: 'ad-MIS-scion',
              example:
                'In networking, Admission Control rejects requests beyond capacity. = Il controllo di ammissione rifiuta richieste oltre capacità.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Token Bucket',
              italian: 'token bucket',
              pronunciation: '/ˈtoʊkən ˈbʌkɪt/',
              phonetic: 'TOU-ken BA-ket',
              example:
                'In networking, Token Bucket regulates traffic rate. = Il token bucket regola la rate del traffico.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Leaky Bucket',
              italian: 'leaky bucket',
              pronunciation: '/ˈliːki ˈbʌkɪt/',
              phonetic: 'LI-ki BA-ket',
              example:
                'In networking, Leaky Bucket smooths bursty traffic. = Il leaky bucket spiana traffico bursty.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'CIR',
              italian: 'CIR',
              pronunciation: '/siː aɪ ɑːr/',
              phonetic: 'SI-AI-AR',
              example:
                'By definition, CIR is the guaranteed throughput. = CIR è il throughput garantito.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'PIR',
              italian: 'PIR',
              pronunciation: '/piː aɪ ɑːr/',
              phonetic: 'PI-AI-AR',
              example:
                'By definition, PIR is the maximum allowed rate. = PIR è la rate massima permessa.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Drop Precedence',
              italian: 'Precedenza di scarto',
              pronunciation: '/drɒp ˈpresɪdəns/',
              phonetic: 'DROP PRE-si-dens',
              example:
                'Higher drop precedence drops first under congestion. = La precedenza di scarto più alta viene scartata per prima.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'WRED',
              italian: 'WRED',
              pronunciation: '/dʌbljuː red/',
              phonetic: 'DABOL-IU-RED',
              example:
                'In networking, WRED drops packets early to avoid TCP global sync. = WRED scarta pacchetti in anticipo per evitare global sync TCP.',
              context: 'services',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_qos_linux_4',
          title: 'Linux QoS / QoS Linux',
          description: 'tc, qdisc e QoS Linux',
          items: [
            {
              english: 'tc',
              italian: 'tc',
              pronunciation: '/tiː siː/',
              phonetic: 'TI-SI',
              example:
                'In networking, tc configures Linux traffic control. = tc configura il traffic control Linux.',
              context: 'services',
              difficulty: 'advanced',
              command: 'tc qdisc show dev eth0',
            },
            {
              english: 'qdisc',
              italian: 'qdisc',
              pronunciation: '/kjuː dɪsk/',
              phonetic: 'KIU-DISK',
              example:
                'Linux kernel traffic control relies on qdisc modules to shape, schedule, and prioritize packets on each network interface. = Il controllo del traffico del kernel Linux si affida ai moduli qdisc per modellare, schedulare e dare priorita ai pacchetti su ogni interfaccia di rete.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'pfifo_fast',
              italian: 'pfifo_fast',
              pronunciation: '/piː ˈfaɪfoʊ fæst/',
              phonetic: 'PI-FAI-fou FAST',
              example:
                'By definition, pfifo_fast is the legacy default qdisc. = pfifo_fast è la vecchia qdisc di default.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'fq_codel',
              italian: 'fq_codel',
              pronunciation: '/ef kjuː ˈkoʊdl/',
              phonetic: 'EF-KIU KO-del',
              example:
                'By optimizing traffic, fq_codel reduces bufferbloat by default. = fq_codel riduce il bufferbloat di default.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'CAKE',
              italian: 'CAKE',
              pronunciation: '/keɪk/',
              phonetic: 'KEIK',
              example:
                'By definition, CAKE is an integrated home QoS solution. = CAKE è una soluzione QoS integrata per casa.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Common Applications Kept Enhanced.',
            },
            {
              english: 'HTB',
              italian: 'HTB',
              pronunciation: '/eɪtʃ tiː biː/',
              phonetic: 'EICH-TI-BI',
              example:
                'For network flexibility, HTB enables hierarchical bandwidth control. = HTB abilita controllo gerarchico della banda.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'iptables Mark',
              italian: 'marcatura iptables',
              pronunciation: '/aɪ piː ˈteɪblz mɑːrk/',
              phonetic: 'AI-PI TEI-bols MARK',
              example:
                'In networking, iptables Mark tags packets for tc. = iptables MARK etichetta pacchetti per tc.',
              context: 'services',
              difficulty: 'advanced',
              code: 'iptables -t mangle -A POSTROUTING -p tcp --dport 22 -j MARK --set-mark 1',
            },
            {
              english: 'Class',
              italian: 'Classe',
              pronunciation: '/klæs/',
              phonetic: 'KLAS',
              example:
                'In HTB you create a parent class to define total bandwidth and child classes to share it among traffic groups. = In HTB crei una classe padre per definire la banda totale e classi figlie per condividerla tra gruppi di traffico.',
              context: 'services',
              difficulty: 'advanced',
              command: 'tc class show dev eth0',
            },
            {
              english: 'Filter',
              italian: 'Filtro',
              pronunciation: '/ˈfɪltər/',
              phonetic: 'FIL-ter',
              example:
                'Inside the Linux tc framework, a filter matches packets by IP address or port and assigns them to the appropriate QoS class. = Dentro il framework tc di Linux, un filtro associa i pacchetti per indirizzo IP o porta e li assegna alla classe QoS appropriata.',
              context: 'services',
              difficulty: 'advanced',
              command: 'tc filter show dev eth0',
            },
            {
              english: 'eBPF QoS',
              italian: 'QoS eBPF',
              pronunciation: '/iː biː piː ef/',
              phonetic: 'I-BI-PI-EF',
              example:
                'Platform engineers attach eBPF programs to network interfaces to implement custom QoS policies without modifying the kernel source code. = I platform engineer collegano programmi eBPF alle interfacce di rete per implementare policy QoS personalizzate senza modificare il codice sorgente del kernel.',
              context: 'services',
              difficulty: 'advanced',
              tool: 'bpftool',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 16 - ROUTING AVANZATO / ADVANCED ROUTING
    // ════════════════════════════════════════════════
    16: {
      name: 'Routing Avanzato / Advanced Routing',
      description: 'BGP, OSPF e protocolli avanzati',
      lessons: [
        {
          id: 'net_routing_bgp_1',
          title: 'BGP / BGP',
          description: 'Border Gateway Protocol',
          items: [
            {
              english: 'BGP',
              italian: 'BGP',
              pronunciation: '/biː dʒiː piː/',
              phonetic: 'BI-GI-PI',
              example:
                'By definition, BGP is the Internet routing protocol. = BGP è il protocollo di routing di Internet.',
              context: 'routing',
              difficulty: 'advanced',
              note: 'Versione attuale: BGP-4.',
            },
            {
              english: 'Autonomous System',
              italian: 'Sistema autonomo',
              pronunciation: '/ɔːˈtɒnəməs/',
              phonetic: 'o-TO-no-mos',
              example:
                'An AS is a network under common administration. = Un AS è una rete sotto amministrazione comune.',
              context: 'routing',
              difficulty: 'advanced',
              note: 'Esempio: AS15169 = Google.',
            },
            {
              english: 'AS Number',
              italian: 'numero AS (ASN)',
              pronunciation: '/eɪ es ˈnʌmbər/',
              phonetic: 'EI-ES NAM-ber',
              example:
                "Before peering on the public Internet, an organization must obtain an AS number assigned by a Regional Internet Registry such as RIPE or ARIN. = Prima del peering su Internet pubblica, un'organizzazione deve ottenere un numero AS assegnato da un Regional Internet Registry come RIPE o ARIN.",
              context: 'routing',
              difficulty: 'advanced',
              note: '32-bit ASN dal 2007.',
            },
            {
              english: 'eBGP',
              italian: 'eBGP',
              pronunciation: '/iː biː dʒiː piː/',
              phonetic: 'I-BI-GI-PI',
              example:
                'In production environments, eBGP runs between different ASes. = eBGP gira tra AS diversi.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'iBGP',
              italian: 'iBGP',
              pronunciation: '/aɪ biː dʒiː piː/',
              phonetic: 'AI-BI-GI-PI',
              example:
                'In production environments, iBGP runs inside the same AS. = iBGP gira dentro lo stesso AS.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'AS Path',
              italian: 'percorso AS (AS path)',
              pronunciation: '/eɪ es pæθ/',
              phonetic: 'EI-ES PATH',
              example:
                'For reference, AS Path lists ASes a route traversed. = AS path elenca gli AS attraversati da una rotta.',
              context: 'routing',
              difficulty: 'advanced',
              note: 'Usato per rilevare loop e per scelta path.',
            },
            {
              english: 'BGP Peer',
              italian: 'Peer BGP',
              pronunciation: '/biː dʒiː piː pɪər/',
              phonetic: 'BI-GI-PI PIIR',
              example:
                "Before exchanging routing tables, two BGP peers must successfully establish a TCP session on port 179 and complete the OPEN message handshake. = Prima di scambiare tabelle di routing, due peer BGP devono stabilire con successo una sessione TCP sulla porta 179 e completare l'handshake del messaggio OPEN.",
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'Route Reflector',
              italian: 'riflettore di rotte (route reflector)',
              pronunciation: '/ruːt rɪˈflektər/',
              phonetic: 'RUUT ri-FLEK-ter',
              example:
                'In a large ISP backbone, deploying a route reflector eliminates the need for a full-mesh iBGP topology among hundreds of routers. = Nel backbone di un grande ISP, implementare un route reflector elimina la necessita di una topologia iBGP full-mesh tra centinaia di router.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'BGP Community',
              italian: 'Community BGP',
              pronunciation: '/kəˈmjuːnəti/',
              phonetic: 'ko-MIU-ne-ti',
              example:
                'Network operators attach BGP community values to routes so upstream providers can apply agreed-upon policies like local-preference or no-export. = Gli operatori di rete allegano valori di community BGP alle rotte cosi che i provider a monte possano applicare policy concordate come local-preference o no-export.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'Route Hijacking',
              italian: 'Hijacking di rotta',
              pronunciation: '/ˈhaɪdʒækɪŋ/',
              phonetic: 'HAI-gia-king',
              example:
                "BGP hijacking redirects traffic maliciously. = L'hijacking BGP reindirizza il traffico maliziosamente.",
              context: 'routing',
              difficulty: 'advanced',
              note: 'Mitigato da RPKI.',
            },
          ],
        },
        {
          id: 'net_routing_ospf_2',
          title: 'OSPF / OSPF',
          description: 'Open Shortest Path First',
          items: [
            {
              english: 'OSPFv3',
              italian: 'OSPFv3',
              pronunciation: '/oʊ es piː ef/',
              phonetic: 'O-ES-PI-EF',
              example: `For IPv6 networks, OSPFv3 carries prefixes in dedicated LSAs and relies on IPsec for authentication instead of MD5. = Per le reti IPv6, OSPFv3 trasporta i prefissi in LSA dedicate e si affida a IPsec per l'autenticazione invece di MD5.`,
              context: 'routing',
              difficulty: 'advanced',
              note: 'Stesso algoritmo SPF di OSPFv2 ma con LSA ridisegnate per IPv6.',
            },
            {
              english: 'LSA',
              italian: 'LSA',
              pronunciation: '/el es eɪ/',
              phonetic: 'EL-ES-EI',
              example:
                'Every OSPF router floods Link-State Advertisements to its neighbors so each device builds an identical map of the network topology. = Ogni router OSPF inonda Link-State Advertisement ai suoi vicini cosi che ogni dispositivo costruisca una mappa identica della topologia di rete.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'LSDB',
              italian: 'LSDB',
              pronunciation: '/el es diː biː/',
              phonetic: 'EL-ES-DI-BI',
              example:
                'For efficiency, the LSDB stores all known LSAs. = La LSDB memorizza tutte le LSA conosciute.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'OSPF Area',
              italian: 'Area OSPF',
              pronunciation: '/ˈeəriə/',
              phonetic: 'E-ria',
              example:
                "By segmenting a large campus network into multiple OSPF areas, engineers reduce LSA flooding and keep each router's link-state database manageable. = Segmentando una grande rete campus in piu aree OSPF, gli ingegneri riducono il flooding di LSA e mantengono gestibile il database link-state di ogni router.",
              context: 'routing',
              difficulty: 'advanced',
              note: 'Area 0 = backbone.',
            },
            {
              english: 'Backbone Area',
              italian: 'Area backbone',
              pronunciation: '/ˈbækboʊn/',
              phonetic: 'BAK-boun',
              example:
                "All inter-area traffic in an OSPF deployment must transit through the backbone area 0, which connects every other area in the network. = Tutto il traffico inter-area in un deployment OSPF deve transitare attraverso l'area backbone 0, che connette ogni altra area nella rete.",
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'ABR',
              italian: 'ABR',
              pronunciation: '/eɪ biː ɑːr/',
              phonetic: 'EI-BI-AR',
              example:
                "An Area Border Router sits between the backbone and a non-backbone area, summarizing routes and reducing the routing table size for both sides. = Un Area Border Router si trova tra il backbone e un'area non-backbone, riassumendo le rotte e riducendo la dimensione della tabella di routing per entrambi i lati.",
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'ASBR',
              italian: 'ASBR',
              pronunciation: '/eɪ es biː ɑːr/',
              phonetic: 'EI-ES-BI-AR',
              example:
                'At the network boundary, an Autonomous System Boundary Router redistributes external BGP routes into the internal OSPF domain. = Al confine della rete, un Autonomous System Boundary Router ridistribuisce le rotte BGP esterne nel dominio OSPF interno.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'DR',
              italian: 'router designato (DR)',
              pronunciation: '/diː ɑːr/',
              phonetic: 'DI-AR',
              example:
                'In networking, the DR coordinates OSPF on multi-access networks. = Il DR coordina OSPF su reti multi-access.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'BDR',
              italian: 'router designato di backup (BDR)',
              pronunciation: '/biː diː ɑːr/',
              phonetic: 'BI-DI-AR',
              example:
                'In networking, BDR takes over if DR fails. = Il BDR subentra se il DR fallisce.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'Stub Area',
              italian: 'Area stub',
              pronunciation: '/stʌb ˈeəriə/',
              phonetic: 'STAB E-ria',
              example:
                'Configuring a remote branch as an OSPF stub area blocks external LSAs, replacing them with a single default route to save memory on smaller routers. = Configurare una sede remota come area stub OSPF blocca le LSA esterne, sostituendole con una singola rotta di default per risparmiare memoria sui router piu piccoli.',
              context: 'routing',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_routing_eigrp_3',
          title: 'EIGRP & IS-IS / EIGRP e IS-IS',
          description: 'Altri protocolli di routing avanzati',
          items: [
            {
              english: 'EIGRP named mode',
              italian: 'EIGRP named mode',
              pronunciation: '/iː aɪ dʒiː ɑːr piː/',
              phonetic: 'I-AI-GI-AR-PI',
              example: `Instead of the legacy classic syntax, EIGRP named mode groups all settings under one hierarchical block that is far easier to maintain. = Invece della classica sintassi legacy, EIGRP named mode raggruppa tutte le impostazioni sotto un singolo blocco gerarchico molto piu' facile da mantenere.`,
              context: 'routing',
              difficulty: 'advanced',
              note: 'Cisco raccomanda named mode da IOS 15.x in poi, deprecando il classic mode.',
            },
            {
              english: 'DUAL',
              italian: 'DUAL',
              pronunciation: '/ˈduːəl/',
              phonetic: 'DU-al',
              example:
                'EIGRP uses DUAL for loop-free convergence. = EIGRP usa DUAL per convergenza senza loop.',
              context: 'routing',
              difficulty: 'advanced',
              note: 'Diffusing Update Algorithm.',
            },
            {
              english: 'Successor',
              italian: 'Successore',
              pronunciation: '/səkˈsesər/',
              phonetic: 'sak-SES-ser',
              example:
                'When EIGRP calculates its topology table, it selects the successor route as the best path based on the lowest feasible distance metric. = Quando EIGRP calcola la sua tabella di topologia, seleziona la rotta successore come miglior percorso basandosi sulla metrica di distanza fattibile piu bassa.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'Feasible Successor',
              italian: 'Successore fattibile',
              pronunciation: '/ˈfiːzəbl/',
              phonetic: 'FI-ze-bol',
              example:
                'By definition, a Feasible Successor is a backup path. = Un successore fattibile è un percorso di backup.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'IS-IS',
              italian: 'IS-IS',
              pronunciation: '/aɪ es aɪ es/',
              phonetic: 'AI-ES-AI-ES',
              example:
                'By definition, IS-IS is widely used in service provider networks. = IS-IS è ampiamente usato nelle reti dei service provider.',
              context: 'routing',
              difficulty: 'advanced',
              note: 'Intermediate System to Intermediate System.',
            },
            {
              english: 'NSSA',
              italian: 'NSSA',
              pronunciation: '/en es es eɪ/',
              phonetic: 'EN-ES-ES-EI',
              example:
                'In networking, NSSA areas allow limited externals. = Le aree NSSA permettono externals limitati.',
              context: 'routing',
              difficulty: 'advanced',
              note: 'Not-So-Stubby Area.',
            },
            {
              english: 'Totally Stubby',
              italian: 'area totalmente stub',
              pronunciation: '/ˈtoʊtəli ˈstʌbi/',
              phonetic: 'TO-tali STA-bi',
              example:
                'In networking, Totally Stubby areas only have a default route. = Le aree totally stubby hanno solo una rotta predefinita.',
              context: 'routing',
              difficulty: 'advanced',
              note: 'Estensione Cisco.',
            },
            {
              english: 'Virtual Link',
              italian: 'Link virtuale',
              pronunciation: '/ˈvɜːrtʃuəl lɪŋk/',
              phonetic: 'VER-ciu-al LINK',
              example:
                "When a new OSPF area cannot physically connect to area 0, the engineer creates a virtual link through a transit area to maintain backbone continuity. = Quando una nuova area OSPF non puo connettersi fisicamente all'area 0, l'ingegnere crea un link virtuale attraverso un'area di transito per mantenere la continuita del backbone.",
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'Multi-Area OSPF',
              italian: 'OSPF multi-area',
              pronunciation: '/ˈmʌlti ˈeəriə/',
              phonetic: 'MAL-ti E-ria',
              example:
                'In large deployments, Multi-Area OSPF scales large networks. = OSPF multi-area scala reti grandi.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'Route Map',
              italian: 'mappa di rotta (route map)',
              pronunciation: '/ruːt mæp/',
              phonetic: 'RUUT MAP',
              example:
                "During BGP redistribution, the engineer applies a route map to set the local preference and filter out private address ranges before advertising routes. = Durante la ridistribuzione BGP, l'ingegnere applica una route map per impostare la local preference e filtrare i range di indirizzi privati prima di pubblicare le rotte.",
              context: 'routing',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_routing_mpls_4',
          title: 'MPLS / MPLS',
          description: 'Multi-Protocol Label Switching',
          items: [
            {
              english: 'MPLS',
              italian: 'MPLS',
              pronunciation: '/em piː el es/',
              phonetic: 'EM-PI-EL-ES',
              example:
                'In the data path, MPLS forwards by labels instead of IP. = MPLS inoltra per etichette invece che per IP.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'Label',
              italian: 'Etichetta',
              pronunciation: '/ˈleɪbl/',
              phonetic: 'LEI-bol',
              example:
                'The 20-bit MPLS label field allows over one million unique label values, giving service providers plenty of space for traffic engineering paths. = Il campo etichetta MPLS a 20 bit consente oltre un milione di valori etichetta unici, dando ai service provider ampio spazio per percorsi di traffic engineering.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'LSP',
              italian: 'percorso a etichetta (LSP)',
              pronunciation: '/el es piː/',
              phonetic: 'EL-ES-PI',
              example:
                'By definition, an LSP is the path through MPLS network. = Un LSP è il percorso attraverso una rete MPLS.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'LSR',
              italian: 'router a etichetta (LSR)',
              pronunciation: '/el es ɑːr/',
              phonetic: 'EL-ES-AR',
              example:
                "Inside the provider backbone, Label Switching Routers examine only the MPLS label header to forward packets, bypassing the slower IP lookup process. = Dentro il backbone del provider, i Label Switching Router esaminano solo l'header dell'etichetta MPLS per inoltrare i pacchetti, bypassando il processo di lookup IP piu lento.",
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'LDP',
              italian: 'LDP',
              pronunciation: '/el diː piː/',
              phonetic: 'EL-DI-PI',
              example:
                'In networking, LDP distributes MPLS labels between LSRs. = LDP distribuisce etichette MPLS tra LSR.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'PE Router',
              italian: 'Router PE',
              pronunciation: '/piː iː ˈruːtər/',
              phonetic: 'PI-I RU-ter',
              example:
                'At each customer site, the Provider Edge router receives IP traffic from the CE and encapsulates it with MPLS labels for transport across the provider core. = In ogni sito cliente, il router Provider Edge riceve traffico IP dal CE e lo incapsula con etichette MPLS per il trasporto attraverso il core del provider.',
              context: 'routing',
              difficulty: 'advanced',
              note: 'Provider Edge.',
            },
            {
              english: 'P Router',
              italian: 'Router P',
              pronunciation: '/piː ˈruːtər/',
              phonetic: 'PI RU-ter',
              example:
                'Provider (P) routers in the MPLS core only perform label switching and never see customer IP headers, simplifying their forwarding tables. = I router Provider (P) nel core MPLS eseguono solo label switching e non vedono mai gli header IP del cliente, semplificando le loro tabelle di inoltro.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'CE Router',
              italian: 'Router CE',
              pronunciation: '/siː iː ˈruːtər/',
              phonetic: 'SI-I RU-ter',
              example:
                "The Customer Edge router at each branch office peers with the provider's PE router to exchange routes for the L3VPN service. = Il router Customer Edge in ogni filiale fa peering con il router PE del provider per scambiare rotte per il servizio L3VPN.",
              context: 'routing',
              difficulty: 'advanced',
              note: 'Customer Edge.',
            },
            {
              english: 'L3VPN',
              italian: 'VPN Layer 3 (L3VPN)',
              pronunciation: '/el θriː viː piː en/',
              phonetic: 'EL-THRI-VI-PI-EN',
              example:
                'MPLS L3VPN provides separate routing per customer. = MPLS L3VPN fornisce routing separato per cliente.',
              context: 'routing',
              difficulty: 'advanced',
            },
            {
              english: 'Segment Routing',
              italian: 'instradamento a segmenti (Segment Routing)',
              pronunciation: '/ˈseɡmənt ˈruːtɪŋ/',
              phonetic: 'SEG-ment RU-ting',
              example:
                'In networking, Segment Routing simplifies traffic engineering. = Il segment routing semplifica il traffic engineering.',
              context: 'routing',
              difficulty: 'advanced',
              note: 'SR-MPLS o SRv6.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 17 - SDN / SDN
    // ════════════════════════════════════════════════
    17: {
      name: 'SDN / Software-Defined Networking',
      description: 'Reti definite via software',
      lessons: [
        {
          id: 'net_sdn_1',
          title: 'SDN Basics / Basi SDN',
          description: 'Concetti fondamentali SDN',
          items: [
            {
              english: 'SDN',
              italian: 'reti definite via software (SDN)',
              pronunciation: '/es diː en/',
              phonetic: 'ES-DI-EN',
              example:
                'In networking, SDN separates control and data planes. = SDN separa control plane e data plane.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Control Plane',
              italian: 'piano di controllo',
              pronunciation: '/kənˈtroʊl pleɪn/',
              phonetic: 'kon-TROUL PLEIN',
              example:
                'In networking, the Control Plane decides where packets go. = Il control plane decide dove vanno i pacchetti.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Data Plane',
              italian: 'piano dati',
              pronunciation: '/ˈdeɪtə pleɪn/',
              phonetic: 'DEI-ta PLEIN',
              example:
                'In the data path, the Data Plane forwards packets at high speed. = Il data plane inoltra pacchetti ad alta velocità.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Management Plane',
              italian: 'piano di gestione',
              pronunciation: '/ˈmænɪdʒmənt pleɪn/',
              phonetic: 'MA-nich-ment PLEIN',
              example:
                'At its layer, the Management Plane handles configuration. = Il management plane gestisce la configurazione.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'SDN Controller',
              italian: 'controller SDN',
              pronunciation: '/kənˈtroʊlər/',
              phonetic: 'kon-TROU-ler',
              example:
                'In networking, the SDN Controller programs the data plane. = Il controller SDN programma il data plane.',
              context: 'services',
              difficulty: 'advanced',
              tool: 'OpenDaylight, ONOS',
            },
            {
              english: 'Northbound API',
              italian: 'API northbound',
              pronunciation: '/ˈnɔːrθbaʊnd/',
              phonetic: 'NORTH-baund',
              example:
                'Custom network automation scripts communicate with the SDN controller through its northbound API to provision new tenant networks on demand. = Script personalizzati di automazione di rete comunicano con il controller SDN attraverso la sua API northbound per provisionare nuove reti tenant su richiesta.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Southbound API',
              italian: 'API southbound',
              pronunciation: '/ˈsaʊθbaʊnd/',
              phonetic: 'SAUTH-baund',
              example:
                "The SDN controller uses southbound APIs like OpenFlow to push forwarding rules directly into the switch hardware at line rate. = Il controller SDN usa API southbound come OpenFlow per spingere regole di inoltro direttamente nell'hardware dello switch a velocita di linea.",
              context: 'services',
              difficulty: 'advanced',
              note: 'Esempio: OpenFlow.',
            },
            {
              english: 'OpenFlow',
              italian: 'OpenFlow',
              pronunciation: '/ˈoʊpən floʊ/',
              phonetic: 'OU-pen FLOU',
              example:
                'By definition, OpenFlow is a southbound SDN protocol. = OpenFlow è un protocollo SDN southbound.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Flow Table',
              italian: 'Tabella di flussi',
              pronunciation: '/floʊ ˈteɪbl/',
              phonetic: 'FLOU TEI-bol',
              example:
                'OpenFlow installs flow tables in switches. = OpenFlow installa tabelle di flussi negli switch.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Programmability',
              italian: 'programmabilità',
              pronunciation: '/ˌproʊɡræməˈbɪləti/',
              phonetic: 'pro-gra-ma-BI-li-ti',
              example:
                'SDN programmability lets you push topology-wide policy changes through an API instead of touching every device by hand. = La programmabilità SDN ti permette di applicare modifiche di policy a tutta la topologia tramite API invece di toccare ogni dispositivo a mano.',
              context: 'services',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_sdn_nfv_2',
          title: 'NFV & VXLAN / NFV e VXLAN',
          description: 'Network Function Virtualization e overlay',
          items: [
            {
              english: 'NFV',
              italian: 'virtualizzazione funzioni di rete (NFV)',
              pronunciation: '/en ef viː/',
              phonetic: 'EN-EF-VI',
              example:
                'In production environments, NFV runs network functions on standard servers. = NFV fa girare funzioni di rete su server standard.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'VNF',
              italian: 'funzione di rete virtuale (VNF)',
              pronunciation: '/viː en ef/',
              phonetic: 'VI-EN-EF',
              example:
                'By definition, a VNF is a virtualized firewall or router. = Una VNF è un firewall o router virtualizzato.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Overlay Network',
              italian: 'rete overlay',
              pronunciation: '/ˈoʊvərleɪ/',
              phonetic: 'O-ver-lei',
              example:
                'Multi-tenant data centers use an overlay network built with VXLAN to provide each customer with isolated Layer 2 segments over shared physical infrastructure. = I data center multi-tenant usano una rete overlay costruita con VXLAN per fornire a ogni cliente segmenti Layer 2 isolati su infrastruttura fisica condivisa.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Underlay Network',
              italian: 'rete underlay',
              pronunciation: '/ˈʌndərleɪ/',
              phonetic: 'AN-der-lei',
              example: `In a VXLAN fabric the underlay network is a plain IP routed transport while overlays carry tenant traffic. = In una fabric VXLAN la rete underlay e' un semplice trasporto IP routato mentre gli overlay portano il traffico dei tenant.`,
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'VXLAN',
              italian: 'VXLAN',
              pronunciation: '/viː eks læn/',
              phonetic: 'VI-EKS-LAN',
              example:
                'In networking, VXLAN extends Layer 2 over Layer 3. = VXLAN estende il Layer 2 sul Layer 3.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Virtual Extensible LAN. Porta UDP 4789.',
            },
            {
              english: 'VNI',
              italian: 'VNI',
              pronunciation: '/viː en aɪ/',
              phonetic: 'VI-EN-AI',
              example:
                'During analysis, VNI identifies a VXLAN segment. = VNI identifica un segmento VXLAN.',
              context: 'services',
              difficulty: 'advanced',
              note: '24 bit: 16 milioni di segmenti.',
            },
            {
              english: 'VTEP',
              italian: 'VTEP',
              pronunciation: '/viː tep/',
              phonetic: 'VI-TEP',
              example:
                'At each end of the overlay tunnel, a VXLAN Tunnel Endpoint wraps and unwraps Layer 2 frames inside UDP packets for transport across the Layer 3 fabric. = A ogni estremita del tunnel overlay, un VXLAN Tunnel Endpoint incapsula e decapsula frame Layer 2 dentro pacchetti UDP per il trasporto attraverso il fabric Layer 3.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'GRE',
              italian: 'GRE',
              pronunciation: '/dʒiː ɑːr iː/',
              phonetic: 'GI-AR-I',
              example:
                'In networking, GRE encapsulates many protocols. = GRE incapsula molti protocolli.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Geneve',
              italian: 'Geneve',
              pronunciation: '/ˈdʒeneɪv/',
              phonetic: 'GE-neiv',
              example:
                'By definition, Geneve is a flexible tunneling protocol. = Geneve è un protocollo di tunneling flessibile.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Generic Network Virtualization Encapsulation.',
            },
            {
              english: 'EVPN',
              italian: 'EVPN',
              pronunciation: '/iː viː piː en/',
              phonetic: 'I-VI-PI-EN',
              example:
                'By definition, EVPN is the modern data center control plane. = EVPN è il control plane moderno per data center.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Ethernet VPN. Estensione di BGP.',
            },
          ],
        },
        {
          id: 'net_sdn_p4_3',
          title: 'P4 & Programmable Data Plane / P4 e Data Plane Programmabile',
          description: 'Programmazione del data plane',
          items: [
            {
              english: 'P4',
              italian: 'P4',
              pronunciation: '/piː fɔːr/',
              phonetic: 'PI-FOR',
              example:
                'In networking, P4 programs the data plane behavior. = P4 programma il comportamento del data plane.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Programming Protocol-independent Packet Processors.',
            },
            {
              english: 'Programmable Switch',
              italian: 'Switch programmabile',
              pronunciation: '/ˈproʊɡræməbl/',
              phonetic: 'PRO-gra-me-bol',
              example:
                'On a programmable switch you can write a custom P4 program to parse a new header type the silicon never saw before. = Su uno switch programmabile puoi scrivere un programma P4 custom per analizzare un nuovo tipo di header che il silicio non aveva mai visto prima.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Esempi: Tofino, Trident.',
            },
            {
              english: 'Match-Action Pipeline',
              italian: 'Pipeline match-action',
              pronunciation: '/mætʃ ˈækʃən/',
              phonetic: 'MACH AK-scion',
              example:
                'Engineers write P4 programs that define a match-action pipeline, specifying exactly which header fields to match and what actions to apply on each packet. = Gli ingegneri scrivono programmi P4 che definiscono una pipeline match-action, specificando esattamente quali campi header confrontare e quali azioni applicare su ogni pacchetto.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Parser',
              italian: 'parser',
              pronunciation: '/ˈpɑːrsər/',
              phonetic: 'PAR-ser',
              example:
                "During packet ingress, the P4 parser walks the protocol headers in order, extracting fields like source IP and VLAN tag for the match-action tables. = Durante l'ingresso del pacchetto, il parser P4 attraversa gli header di protocollo in ordine, estraendo campi come IP sorgente e VLAN tag per le tabelle match-action.",
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'eBPF',
              italian: 'eBPF',
              pronunciation: '/iː biː piː ef/',
              phonetic: 'I-BI-PI-EF',
              example:
                'In production environments, eBPF runs sandboxed programs in the kernel. = eBPF esegue programmi sandbox nel kernel.',
              context: 'services',
              difficulty: 'advanced',
              tool: 'bpftool, bcc',
            },
            {
              english: 'XDP',
              italian: 'XDP',
              pronunciation: '/eks diː piː/',
              phonetic: 'EKS-DI-PI',
              example:
                'In networking, XDP processes packets at the driver level. = XDP processa pacchetti a livello driver.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'DPDK',
              italian: 'DPDK',
              pronunciation: '/diː piː diː keɪ/',
              phonetic: 'DI-PI-DI-KEI',
              example:
                'In networking, DPDK bypasses the kernel for high speed. = DPDK bypassa il kernel per alta velocità.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Data Plane Development Kit.',
            },
            {
              english: 'SmartNIC',
              italian: 'SmartNIC',
              pronunciation: '/smɑːrt nɪk/',
              phonetic: 'SMART NIK',
              example:
                "By running encryption and load balancing directly on a SmartNIC, the server CPU is freed to handle application workloads instead of network processing. = Eseguendo crittografia e bilanciamento del carico direttamente su una SmartNIC, la CPU del server e libera di gestire i carichi applicativi invece dell'elaborazione di rete.",
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Network OS',
              italian: 'sistema operativo di rete (NOS)',
              pronunciation: '/ˈnetwɜːrk oʊ es/',
              phonetic: 'NET-uerk O-ES',
              example: `A modern network OS like SONiC runs as a Linux container stack and decouples software upgrades from hardware refreshes. = Un network OS moderno come SONiC gira come stack di container Linux e separa gli aggiornamenti software dal refresh dell'hardware.`,
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Disaggregation',
              italian: 'Disaggregazione',
              pronunciation: '/ˌdɪsæɡrɪˈɡeɪʃən/',
              phonetic: 'dis-ag-gri-GHEI-scion',
              example:
                'Network disaggregation separates hardware and software. = La disaggregazione separa hardware e software.',
              context: 'services',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_sdn_intent_4',
          title: 'Intent-Based Networking / Reti Intent-Based',
          description: "Reti basate sull'intento",
          items: [
            {
              english: 'Intent-Based Networking',
              italian: 'Reti intent-based',
              pronunciation: '/ɪnˈtent beɪst/',
              phonetic: 'in-TENT BEIST',
              example:
                "IBN translates intent into configuration. = IBN traduce l'intento in configurazione.",
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Network Automation',
              italian: 'Automazione di rete',
              pronunciation: '/ˌɔːtəˈmeɪʃən/',
              phonetic: 'o-to-MEI-scion',
              example:
                "By optimizing traffic, Network Automation reduces human errors. = L'automazione di rete riduce errori umani.",
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Closed-Loop',
              italian: 'ciclo chiuso (closed-loop)',
              pronunciation: '/kloʊzd luːp/',
              phonetic: 'KLOUZD LUUP',
              example:
                'In networking, Closed-Loop systems verify and remediate automatically. = I sistemi closed-loop verificano e rimedianno automaticamente.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Telemetry',
              italian: 'telemetria',
              pronunciation: '/təˈlemətri/',
              phonetic: 'te-LE-me-tri',
              example:
                'Streaming telemetry feeds analytics in real time. = La telemetria streaming alimenta analytics in tempo reale.',
              context: 'services',
              difficulty: 'advanced',
              note: 'gNMI è uno standard.',
            },
            {
              english: 'Cisco DNA Center',
              italian: 'Cisco DNA Center',
              pronunciation: '/ˈsɪskoʊ diː en eɪ/',
              phonetic: 'SI-skou DI-EN-EI',
              example:
                'In modern infrastructure, Cisco DNA Center automates campus networks. = Cisco DNA Center automatizza reti campus.',
              context: 'services',
              difficulty: 'advanced',
              tool: 'Cisco DNA Center',
              note: 'Piattaforma Cisco per gestione di rete intent-based con automazione, assurance e analytics.',
            },
            {
              english: 'ACI',
              italian: 'ACI',
              pronunciation: '/eɪ siː aɪ/',
              phonetic: 'EI-SI-AI',
              example:
                "By definition, ACI is Cisco's data center SDN solution. = ACI è la soluzione SDN data center di Cisco.",
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'NSX',
              italian: 'VMware NSX (rete software-defined)',
              pronunciation: '/en es eks/',
              phonetic: 'EN-ES-EKS',
              example:
                'VMware NSX virtualizes the network stack. = VMware NSX virtualizza lo stack di rete.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'OVS',
              italian: 'Open vSwitch (OVS)',
              pronunciation: '/oʊ viː es/',
              phonetic: 'O-VI-ES',
              example:
                'By definition, OVS is a software switch for virtualized environments. = OVS è uno switch software per ambienti virtualizzati.',
              context: 'services',
              difficulty: 'advanced',
              tool: 'Open vSwitch',
            },
            {
              english: 'Service Mesh',
              italian: 'rete di microservizi (service mesh)',
              pronunciation: '/ˈsɜːrvɪs meʃ/',
              phonetic: 'SER-vis MESH',
              example:
                'Adopting a service mesh like Istio offloads retries, mTLS and tracing from each microservice into a sidecar proxy. = Adottare una service mesh come Istio sposta retry, mTLS e tracing da ogni microservizio a un sidecar proxy.',
              context: 'services',
              difficulty: 'advanced',
              tool: 'Istio, Linkerd',
            },
            {
              english: 'eBGP Unnumbered',
              italian: 'eBGP unnumbered',
              pronunciation: '/iː biː dʒiː piː ʌnˈnʌmbərd/',
              phonetic: 'I-BI-GI-PI an-NAM-berd',
              example:
                'Unnumbered BGP simplifies leaf-spine fabric. = BGP unnumbered semplifica fabric leaf-spine.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Usato in EVPN data center.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 18 - SICUREZZA DI RETE / NETWORK SECURITY
    // ════════════════════════════════════════════════
    18: {
      name: 'Sicurezza di Rete / Network Security',
      description: 'Tecnologie avanzate di sicurezza',
      lessons: [
        {
          id: 'net_security_idsips_1',
          title: 'IDS & IPS / IDS e IPS',
          description: 'Sistemi di rilevamento intrusioni',
          items: [
            {
              english: 'IDS',
              italian: 'sistema di rilevamento intrusioni (IDS)',
              pronunciation: '/aɪ diː es/',
              phonetic: 'AI-DI-ES',
              example:
                'When scanning traffic, IDS detects suspicious activity. = IDS rileva attività sospetta.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Intrusion Detection System. Solo monitoraggio.',
            },
            {
              english: 'IPS',
              italian: 'sistema di prevenzione intrusioni (IPS)',
              pronunciation: '/aɪ piː es/',
              phonetic: 'AI-PI-ES',
              example:
                'In networking, IPS blocks attacks in real time. = IPS blocca attacchi in tempo reale.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Intrusion Prevention System. Inline.',
            },
            {
              english: 'Snort',
              italian: 'Snort',
              pronunciation: '/snɔːrt/',
              phonetic: 'SNORT',
              example:
                'By definition, Snort is a popular open-source IDS. = Snort è un popolare IDS open-source.',
              context: 'firewalls',
              difficulty: 'advanced',
              tool: 'Snort',
              note: 'IDS/IPS open source storico, ora mantenuto da Cisco; usa regole testuali sul traffico.',
            },
            {
              english: 'Suricata',
              italian: 'Suricata',
              pronunciation: '/sʊrɪˈkɑːtə/',
              phonetic: 'su-ri-KA-ta',
              example:
                'By definition, Suricata is a multi-threaded IDS/IPS. = Suricata è un IDS/IPS multi-thread.',
              context: 'firewalls',
              difficulty: 'advanced',
              tool: 'Suricata',
              note: 'IDS/IPS open source multi-thread, compatibile con le regole Snort ma più moderno e performante.',
            },
            {
              english: 'Signature',
              italian: 'Firma',
              pronunciation: '/ˈsɪɡnətʃər/',
              phonetic: 'SIG-na-cer',
              example:
                'An IDS signature describes a packet pattern that maps to a known exploit, like a specific Shellshock HTTP header. = Una firma IDS descrive un pattern di pacchetto associato a un exploit noto, come uno specifico header HTTP di Shellshock.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Anomaly Detection',
              italian: 'rilevamento anomalie',
              pronunciation: '/əˈnɒməli/',
              phonetic: 'a-NO-ma-li',
              example:
                'In networking, Anomaly Detection finds unusual behavior. = Il rilevamento anomalie trova comportamenti insoliti.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'False Positive',
              italian: 'falso positivo',
              pronunciation: '/fɔːls ˈpɒzɪtɪv/',
              phonetic: 'FOLS PO-zi-tiv',
              example:
                'After tuning the SIEM rules, the security team reduced false positive alerts by 70%, freeing analysts to focus on genuine threats. = Dopo aver sintonizzato le regole SIEM, il team di sicurezza ha ridotto gli alert di falsi positivi del 70%, liberando gli analisti per concentrarsi su minacce genuine.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'False Negative',
              italian: 'falso negativo',
              pronunciation: '/ˈneɡətɪv/',
              phonetic: 'NE-ga-tiv',
              example:
                'A poorly tuned IDS signature that produces false negatives will miss real attacks, leaving the network exposed to active threats. = Una firma IDS mal configurata che produce falsi negativi manchera attacchi reali, lasciando la rete esposta a minacce attive.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Inline Mode',
              italian: 'modalità inline',
              pronunciation: '/ˌɪnˈlaɪn/',
              phonetic: 'in-LAIN',
              example:
                'Switching an IPS from passive tap to inline mode lets it drop malicious packets, but a sensor outage now breaks traffic. = Passare un IPS da tap passivo a modalità inline gli permette di scartare i pacchetti malevoli, ma un guasto del sensore ora interrompe il traffico.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Out-of-Band',
              italian: 'Fuori banda',
              pronunciation: '/aʊt ʌv bænd/',
              phonetic: 'AUT-ov-BAND',
              example:
                'In networking, Out-of-Band IDS uses a SPAN port. = Un IDS fuori banda usa una porta SPAN.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_security_dmz_2',
          title: 'DMZ & Honeypots / DMZ e Honeypot',
          description: 'Zone segregate e trappole',
          items: [
            {
              english: 'DMZ network',
              italian: 'rete DMZ',
              pronunciation: '/diː em ˈzed/',
              phonetic: 'DI-EM-ZED',
              example:
                'A DMZ network hosts public-facing services like the web and SMTP relays, isolated from the internal LAN by strict firewall rules. = Una rete DMZ ospita servizi esposti pubblicamente come web e relay SMTP, isolati dalla LAN interna da regole firewall stringenti.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: `Acronimo di 'demilitarized zone'; oggi spesso sostituita da segmentazione zero-trust.`,
            },
            {
              english: 'Bastion Host',
              italian: 'Host bastione',
              pronunciation: '/ˈbæstiən hoʊst/',
              phonetic: 'BA-stien HOUST',
              example:
                "In networking, a Bastion Host gates remote access. = Un host bastione controlla l'accesso remoto.",
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Honeypot',
              italian: 'honeypot',
              pronunciation: '/ˈhʌnipɒt/',
              phonetic: 'HA-ni-pot',
              example:
                'In networking, a Honeypot lures attackers. = Un honeypot attira gli aggressori.',
              context: 'firewalls',
              difficulty: 'advanced',
              tool: 'Cowrie, Dionaea',
            },
            {
              english: 'Honeynet',
              italian: 'honeynet',
              pronunciation: '/ˈhʌninet/',
              phonetic: 'HA-ni-net',
              example:
                'By definition, a Honeynet is a network of honeypots. = Una honeynet è una rete di honeypot.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Tarpit',
              italian: 'tarpit',
              pronunciation: '/ˈtɑːrpɪt/',
              phonetic: 'TAR-pit',
              example:
                "As a deception technique, the defensive tarpit accepts TCP connections but responds extremely slowly, wasting the attacker's time and resources. = Come tecnica di inganno, il tarpit difensivo accetta connessioni TCP ma risponde estremamente lentamente, sprecando tempo e risorse dell'attaccante.",
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Threat Intelligence',
              italian: 'intelligence sulle minacce (threat intelligence)',
              pronunciation: '/θret ɪnˈtelɪdʒəns/',
              phonetic: 'THRET in-TE-li-gens',
              example:
                'In networking, Threat Intelligence feeds enrich detection. = I feed di threat intelligence arricchiscono la detection.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'IoC',
              italian: 'indicatore di compromissione (IoC)',
              pronunciation: '/aɪ oʊ siː/',
              phonetic: 'AI-O-SI',
              example:
                'Threat intelligence feeds distribute Indicators of Compromise such as file hashes, malicious IPs, and suspicious domains to security teams worldwide. = I feed di threat intelligence distribuiscono Indicatori di Compromissione come hash di file, IP malevoli e domini sospetti ai team di sicurezza nel mondo.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Indicator of Compromise.',
            },
            {
              english: 'SIEM',
              italian: 'SIEM',
              pronunciation: '/siːm/',
              phonetic: 'SIIM',
              example:
                'In networking, SIEM correlates events from many sources. = Il SIEM correla eventi da molte fonti.',
              context: 'firewalls',
              difficulty: 'advanced',
              tool: 'Splunk, Elastic SIEM',
            },
            {
              english: 'SOAR',
              italian: 'SOAR',
              pronunciation: '/sɔːr/',
              phonetic: 'SOR',
              example:
                'In modern infrastructure, SOAR automates response playbooks. = SOAR automatizza i playbook di risposta.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Security Orchestration, Automation and Response.',
            },
            {
              english: 'Threat Hunting',
              italian: 'caccia alle minacce (threat hunting)',
              pronunciation: '/θret ˈhʌntɪŋ/',
              phonetic: 'THRET HAN-ting',
              example:
                'In networking, Threat Hunting actively looks for hidden threats. = Il threat hunting cerca attivamente minacce nascoste.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_security_zerotrust_3',
          title: 'Zero Trust / Zero Trust',
          description: 'Modello di sicurezza moderno',
          items: [
            {
              english: 'Zero Trust',
              italian: 'zero trust',
              pronunciation: '/ˈzɪəroʊ trʌst/',
              phonetic: 'ZI-ro TRAST',
              example:
                'In networking, Zero Trust assumes no implicit trust. = Zero Trust non assume fiducia implicita.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Mantra: "never trust, always verify".',
            },
            {
              english: 'Microsegmentation',
              italian: 'microsegmentazione',
              pronunciation: '/ˌmaɪkroʊseɡmenˈteɪʃən/',
              phonetic: 'mai-kro-seg-men-TEI-scion',
              example:
                'In networking, Microsegmentation isolates workloads. = La microsegmentazione isola workload.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Identity Provider',
              italian: 'Provider di identità',
              pronunciation: '/aɪˈdentɪti/',
              phonetic: 'ai-DEN-ti-ti',
              example:
                "By connecting all SaaS applications to a single Identity Provider, the security team enforces consistent MFA policies across the entire organization. = Collegando tutte le applicazioni SaaS a un singolo Identity Provider, il team di sicurezza applica policy MFA coerenti in tutta l'organizzazione.",
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Esempi: Okta, Azure AD.',
            },
            {
              english: 'NAC',
              italian: 'controllo accesso alla rete (NAC)',
              pronunciation: '/næk/',
              phonetic: 'NAK',
              example:
                'In networking, NAC enforces device compliance before connection. = Il NAC impone la compliance dei dispositivi prima della connessione.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Network Access Control.',
            },
            {
              english: '802.1X',
              italian: 'autenticazione port-based (802.1X)',
              pronunciation: '/eɪt oʊ tuː dɒt eks/',
              phonetic: 'EIT-O-TU dot EKS',
              example:
                "For security, 802.1X authenticates port access. = 802.1X autentica l'accesso alla porta.",
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Posture Assessment',
              italian: 'Valutazione posture',
              pronunciation: '/ˈpɒstʃər/',
              phonetic: 'POS-cer',
              example:
                'In networking, Posture Assessment checks endpoint health. = La valutazione posture controlla la salute degli endpoint.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'SASE',
              italian: 'SASE',
              pronunciation: '/ˈsæsi/',
              phonetic: 'SA-si',
              example:
                'In networking, SASE merges networking and security in the cloud. = SASE fonde rete e sicurezza nel cloud.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Secure Access Service Edge.',
            },
            {
              english: 'ZTNA',
              italian: 'ZTNA',
              pronunciation: '/zed tiː en eɪ/',
              phonetic: 'ZED-TI-EN-EI',
              example:
                'In networking, ZTNA replaces VPN with per-app access. = ZTNA sostituisce la VPN con accesso per-app.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Zero Trust Network Access.',
            },
            {
              english: 'Service Insertion',
              italian: 'Inserimento servizio',
              pronunciation: '/ɪnˈsɜːrʃən/',
              phonetic: 'in-SER-scion',
              example:
                "In the forwarding pipeline, Service Insertion routes traffic through security functions. = L'inserimento servizio instrada il traffico attraverso funzioni di sicurezza.",
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'East-West Traffic',
              italian: 'Traffico est-ovest',
              pronunciation: '/iːst west/',
              phonetic: 'IIST-UEST',
              example:
                'In networking, East-West Traffic flows between servers. = Il traffico est-ovest scorre tra server.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Lateral movement avviene qui.',
            },
          ],
        },
        {
          id: 'net_security_attacks_4',
          title: 'Network Attacks / Attacchi di Rete',
          description: 'Tipologie di attacco e difese',
          items: [
            {
              english: 'DDoS',
              italian: 'DDoS',
              pronunciation: '/diː dɒs/',
              phonetic: 'DI-DOS',
              example:
                'In networking, DDoS attacks overwhelm services. = Gli attacchi DDoS sovraccaricano i servizi.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'SYN Flood',
              italian: 'SYN flood',
              pronunciation: '/sɪn flʌd/',
              phonetic: 'SIN-FLAD',
              example:
                'To mitigate a SYN flood attack, the firewall enables SYN cookies so it can handle millions of half-open connections without exhausting its connection table. = Per mitigare un attacco SYN flood, il firewall abilita i SYN cookie cosi da poter gestire milioni di connessioni semi-aperte senza esaurire la tabella di connessione.',
              context: 'firewalls',
              difficulty: 'advanced',
              note: 'Mitigato da SYN cookies.',
            },
            {
              english: 'Amplification Attack',
              italian: 'Attacco di amplificazione',
              pronunciation: '/ˌæmplɪfɪˈkeɪʃən/',
              phonetic: 'am-pli-fi-KEI-scion',
              example:
                "DNS amplification weaponizes open resolvers. = L'amplificazione DNS arma resolver aperti.",
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Spoofing',
              italian: 'spoofing',
              pronunciation: '/ˈspuːfɪŋ/',
              phonetic: 'SPU-fing',
              example:
                'ARP spoofing on a switched LAN lets an attacker poison the cache of neighbors and redirect traffic through their host. = Lo spoofing ARP su una LAN switched permette a un attaccante di avvelenare la cache dei vicini e dirottare il traffico sul proprio host.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Sniffing',
              italian: 'sniffing',
              pronunciation: '/ˈsnɪfɪŋ/',
              phonetic: 'SNI-fing',
              example:
                'In networking, Sniffing captures network traffic passively. = Lo sniffing cattura il traffico di rete passivamente.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'MITM',
              italian: 'attacco man-in-the-middle (MITM)',
              pronunciation: '/em aɪ tiː em/',
              phonetic: 'EM-AI-TI-EM',
              example:
                'In networking, MITM attacks intercept traffic between parties. = Gli attacchi MITM intercettano il traffico tra le parti.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Session Hijacking',
              italian: 'Hijacking di sessione',
              pronunciation: '/ˈseʃən/',
              phonetic: 'SES-scion',
              example:
                "In networking, Session Hijacking steals active sessions. = L'hijacking di sessione ruba sessioni attive.",
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'DNS Spoofing',
              italian: 'spoofing DNS',
              pronunciation: '/diː en es/',
              phonetic: 'DI-EN-ES',
              example:
                'In networking, DNS Spoofing redirects to fake sites. = Il DNS spoofing reindirizza a siti falsi.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'Botnet',
              italian: 'botnet',
              pronunciation: '/ˈbɒtnet/',
              phonetic: 'BOT-net',
              example:
                'When a threat actor activates a botnet of thousands of compromised IoT devices, the resulting DDoS flood can overwhelm even well-protected targets. = Quando un threat actor attiva una botnet di migliaia di dispositivi IoT compromessi, il flood DDoS risultante puo sopraffare anche obiettivi ben protetti.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
            {
              english: 'C2',
              italian: 'comando e controllo (C2)',
              pronunciation: '/siː tuː/',
              phonetic: 'SI-TU',
              example:
                'In networking, C2 channels control malware. = I canali C2 controllano il malware.',
              context: 'firewalls',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 19 - CLOUD NETWORKING / CLOUD NETWORKING
    // ════════════════════════════════════════════════
    19: {
      name: 'Cloud Networking / Cloud Networking',
      description: 'Reti nel cloud pubblico',
      lessons: [
        {
          id: 'net_cloud_vpc_1',
          title: 'VPC & Subnets / VPC e Sottoreti Cloud',
          description: 'Reti virtuali nel cloud',
          items: [
            {
              english: 'VPC',
              italian: 'VPC',
              pronunciation: '/viː piː siː/',
              phonetic: 'VI-PI-SI',
              example:
                'In networking, a VPC isolates resources in the cloud. = Una VPC isola risorse nel cloud.',
              context: 'services',
              difficulty: 'advanced',
              note: 'AWS, GCP. Azure: VNet.',
            },
            {
              english: 'VNet',
              italian: 'VNet',
              pronunciation: '/viː net/',
              phonetic: 'VI-NET',
              example: `Each Azure VNet is logically isolated and you peer two VNets together to let workloads talk over the Microsoft backbone. = Ogni VNet Azure e' isolata logicamente e fai il peering di due VNet per far comunicare i workload sulla backbone Microsoft.`,
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Public Subnet',
              italian: 'sottorete pubblica',
              pronunciation: '/ˈpʌblɪk ˈsʌbnet/',
              phonetic: 'PA-blik SAB-net',
              example:
                "Web servers that need to be reachable from outside are placed in a public subnet with a route to the Internet Gateway. = I web server che devono essere raggiungibili dall'esterno vengono collocati in una sottorete pubblica con una rotta verso l'Internet Gateway.",
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Private Subnet',
              italian: 'sottorete privata',
              pronunciation: '/ˈpraɪvət/',
              phonetic: 'PRAI-vet',
              example:
                'Database instances in a private subnet can download patches through the NAT Gateway but remain unreachable from the public Internet. = Le istanze database in una sottorete privata possono scaricare patch attraverso il NAT Gateway ma restano irraggiungibili da Internet pubblica.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Internet Gateway',
              italian: 'gateway Internet (IGW)',
              pronunciation: '/ˈɪntərnet ˈɡeɪtweɪ/',
              phonetic: 'IN-ter-net GHEIT-uei',
              example:
                'Without an Internet Gateway attached to the VPC, none of the public-subnet EC2 instances can receive inbound traffic from external users. = Senza un Internet Gateway collegato alla VPC, nessuna delle istanze EC2 nella subnet pubblica puo ricevere traffico in ingresso da utenti esterni.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'NAT Gateway',
              italian: 'Gateway NAT',
              pronunciation: '/næt/',
              phonetic: 'NAT',
              example:
                'For flexibility, NAT Gateway lets private subnets reach Internet. = Il NAT Gateway permette alle sottoreti private di raggiungere Internet.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Costoso: $0.045/h + traffic.',
            },
            {
              english: 'Security Group',
              italian: 'security group',
              pronunciation: '/sɪˈkjʊərəti ɡruːp/',
              phonetic: 'si-KIU-re-ti GRUP',
              example:
                'Because AWS security groups are stateful, allowing inbound HTTPS on port 443 automatically permits the corresponding outbound response traffic. = Poiche i security group AWS sono stateful, permettere HTTPS in ingresso sulla porta 443 permette automaticamente il traffico di risposta in uscita corrispondente.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'NACL',
              italian: 'NACL',
              pronunciation: '/nækəl/',
              phonetic: 'NA-kol',
              example:
                'In AWS, a Network ACL applies stateless rules at the subnet boundary, so you must explicitly allow both inbound and outbound traffic for each flow. = In AWS, una Network ACL applica regole stateless al confine della sottorete, quindi devi esplicitamente permettere sia il traffico in ingresso che in uscita per ogni flusso.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Availability Zone',
              italian: 'Zona di disponibilità',
              pronunciation: '/əˌveɪləˈbɪlɪti zoʊn/',
              phonetic: 'a-vei-la-BI-li-ti ZOUN',
              example:
                'AZs are isolated data centers in a region. = Le AZ sono data center isolati in una regione.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Region',
              italian: 'Regione',
              pronunciation: '/ˈriːdʒən/',
              phonetic: 'RI-gion',
              example:
                'Choosing the right cloud region trades off latency to users, data residency rules and the price per GB of egress. = Scegliere la cloud region giusta bilancia latenza verso gli utenti, regole di residenza dati e prezzo per GB di egress.',
              context: 'services',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_cloud_peering_2',
          title: 'Peering & Transit / Peering e Transit',
          description: 'Connettere VPC tra loro',
          items: [
            {
              english: 'VPC Peering',
              italian: 'peering VPC',
              pronunciation: '/viː piː siː ˈpɪərɪŋ/',
              phonetic: 'VI-PI-SI PIIR-ing',
              example:
                'In networking, VPC Peering links two VPCs privately. = Il VPC peering collega due VPC privatamente.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Non transitivo.',
            },
            {
              english: 'Transit Gateway',
              italian: 'transit gateway',
              pronunciation: '/ˈtrænzɪt ˈɡeɪtweɪ/',
              phonetic: 'TRAN-zit GHEIT-uei',
              example:
                'In the network topology, Transit Gateway connects many VPCs in a hub. = Transit Gateway connette molte VPC in un hub.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'VPC Endpoint',
              italian: 'endpoint VPC',
              pronunciation: '/ˈendpɔɪnt/',
              phonetic: 'END-point',
              example:
                'To keep S3 traffic off the public Internet, the team creates a VPC endpoint that provides a private, direct path from the VPC to the storage service. = Per mantenere il traffico S3 fuori da Internet pubblica, il team crea un VPC endpoint che fornisce un percorso privato e diretto dalla VPC al servizio di storage.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'PrivateLink',
              italian: 'PrivateLink',
              pronunciation: '/ˈpraɪvət lɪŋk/',
              phonetic: 'PRAI-vet LINK',
              example:
                'In networking, PrivateLink exposes services privately. = PrivateLink espone servizi privatamente.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Direct Connect',
              italian: 'Direct Connect',
              pronunciation: '/dəˈrekt kəˈnekt/',
              phonetic: 'di-REKT ko-NEKT',
              example:
                'For network operations, Direct Connect provides dedicated AWS links. = Direct Connect fornisce link dedicati ad AWS.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'ExpressRoute',
              italian: 'ExpressRoute',
              pronunciation: '/ɪkˈspres ruːt/',
              phonetic: 'iks-PRES RUUT',
              example:
                "By definition, ExpressRoute is the Azure equivalent. = ExpressRoute è l'equivalente Azure.",
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Cloud Interconnect',
              italian: 'Cloud Interconnect',
              pronunciation: '/ˌɪntərkəˈnekt/',
              phonetic: 'in-ter-ko-NEKT',
              example:
                'GCP Cloud Interconnect provides dedicated links. = GCP Cloud Interconnect fornisce link dedicati.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Hybrid Cloud',
              italian: 'Cloud ibrido',
              pronunciation: '/ˈhaɪbrɪd/',
              phonetic: 'HAI-brid',
              example:
                'In networking, Hybrid Cloud spans on-prem and cloud. = Il cloud ibrido si estende tra on-prem e cloud.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Multi-Cloud',
              italian: 'multi-cloud',
              pronunciation: '/ˈmʌlti klaʊd/',
              phonetic: 'MAL-ti KLAUD',
              example:
                'Under the hood, Multi-Cloud uses multiple providers. = Multi-cloud usa più provider.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Site-to-Cloud VPN',
              italian: 'VPN site-to-cloud',
              pronunciation: '/saɪt tuː klaʊd/',
              phonetic: 'SAIT-tu-KLAUD',
              example:
                "The hybrid architecture uses a site-to-cloud VPN between the on-premises data center and the AWS VPC for secure database replication. = L'architettura ibrida usa una VPN site-to-cloud tra il data center on-premises e la VPC AWS per la replica sicura del database.",
              context: 'services',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_cloud_lb_3',
          title: 'Cloud Load Balancers / Bilanciatori Cloud',
          description: 'Bilanciatori nel cloud',
          items: [
            {
              english: 'ELB',
              italian: 'ELB',
              pronunciation: '/iː el biː/',
              phonetic: 'I-EL-BI',
              example:
                'An AWS ELB scales automatically with traffic and distributes requests across healthy targets in multiple availability zones. = Un ELB di AWS scala automaticamente con il traffico e distribuisce le richieste tra i target sani in più availability zone.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'ALB',
              italian: 'ALB',
              pronunciation: '/eɪ el biː/',
              phonetic: 'EI-EL-BI',
              example: 'In the network stack, ALB operates at Layer 7. = ALB opera al Layer 7.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'NLB',
              italian: 'NLB',
              pronunciation: '/en el biː/',
              phonetic: 'EN-EL-BI',
              example:
                'In the network stack, NLB operates at Layer 4 with high performance. = NLB opera al Layer 4 con alte prestazioni.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Cloud Load Balancer',
              italian: 'Bilanciatore cloud',
              pronunciation: '/klaʊd loʊd ˈbælənsər/',
              phonetic: 'KLAUD LOUD BA-lan-ser',
              example:
                'During a traffic spike, the cloud load balancer scales automatically by provisioning additional nodes behind the scenes without any manual intervention. = Durante un picco di traffico, il bilanciatore di carico cloud scala automaticamente provisionando nodi aggiuntivi dietro le quinte senza alcun intervento manuale.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Target Group',
              italian: 'Gruppo target',
              pronunciation: '/ˈtɑːrɡət ɡruːp/',
              phonetic: 'TAR-ghet GRUP',
              example:
                "The Application Load Balancer forwards requests to a target group containing three healthy EC2 instances running the API microservice. = L'Application Load Balancer inoltra le richieste a un target group contenente tre istanze EC2 sane che eseguono il microservizio API.",
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Listener',
              italian: 'listener',
              pronunciation: '/ˈlɪsənər/',
              phonetic: 'LI-se-ner',
              example:
                "The Application Load Balancer creates a listener on port 443 that accepts incoming HTTPS connections and routes them to registered target groups. = L'Application Load Balancer crea un listener sulla porta 443 che accetta connessioni HTTPS in ingresso e le instrada ai target group registrati.",
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Cross-Zone Load Balancing',
              italian: 'Bilanciamento cross-zone',
              pronunciation: '/krɒs zoʊn/',
              phonetic: 'KROS-ZOUN',
              example:
                'In networking, Cross-Zone Load Balancing spreads traffic across AZs. = Il bilanciamento cross-zone distribuisce traffico tra AZ.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Global Load Balancer',
              italian: 'Bilanciatore globale',
              pronunciation: '/ˈɡloʊbəl/',
              phonetic: 'GLOU-bal',
              example:
                'To minimize latency for users worldwide, the DNS-based global load balancer routes each request to the nearest regional data center. = Per minimizzare la latenza per gli utenti nel mondo, il bilanciatore globale basato su DNS instrada ogni richiesta al data center regionale piu vicino.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'CloudFront',
              italian: 'CloudFront',
              pronunciation: '/klaʊd frʌnt/',
              phonetic: 'KLAUD-FRANT',
              example: 'By definition, CloudFront is the AWS CDN. = CloudFront è la CDN AWS.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'CDN',
              italian: 'rete di distribuzione contenuti (CDN)',
              pronunciation: '/siː diː en/',
              phonetic: 'SI-DI-EN',
              example:
                'By serving static assets from the nearest CDN edge location, the website reduces latency for users on different continents by hundreds of milliseconds. = Servendo asset statici dalla edge location CDN piu vicina, il sito web riduce la latenza per gli utenti su diversi continenti di centinaia di millisecondi.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Esempi: Cloudflare, Akamai, Fastly.',
            },
          ],
        },
        {
          id: 'net_cloud_dns_4',
          title: 'Cloud DNS / DNS Cloud',
          description: 'DNS gestito nel cloud',
          items: [
            {
              english: 'Route 53',
              italian: 'Route 53',
              pronunciation: '/ruːt ˈfɪfti θriː/',
              phonetic: 'RUUT FIF-ti THRI',
              example:
                'By definition, Route 53 is the AWS DNS service. = Route 53 è il servizio DNS AWS.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Anche fa health checks e routing.',
            },
            {
              english: 'Cloud DNS',
              italian: 'DNS cloud',
              pronunciation: '/klaʊd diː en es/',
              phonetic: 'KLAUD-DI-EN-ES',
              example:
                'GCP Cloud DNS hosts authoritative zones. = GCP Cloud DNS ospita zone autoritative.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Latency-Based Routing',
              italian: 'Routing basato su latenza',
              pronunciation: '/ˈleɪtənsi/',
              phonetic: 'LEI-ten-si',
              example:
                'In networking, Latency-Based Routing picks the fastest region. = Il routing basato su latenza sceglie la regione più veloce.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Geolocation Routing',
              italian: 'Routing geolocalizzazione',
              pronunciation: '/dʒiːoʊloʊˈkeɪʃən/',
              phonetic: 'gi-o-lo-KEI-scion',
              example:
                'During communication, Geolocation Routing sends users to local servers. = Il routing per geolocalizzazione manda utenti a server locali.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Failover Routing',
              italian: 'Routing failover',
              pronunciation: '/ˈfeɪloʊvər/',
              phonetic: 'FEIL-ou-ver',
              example:
                'Under the hood, Failover Routing uses backup endpoints. = Il routing failover usa endpoint di backup.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Hosted Zone',
              italian: 'Zona ospitata',
              pronunciation: '/ˈhoʊstɪd zoʊn/',
              phonetic: 'HOU-stid ZOUN',
              example:
                'After creating a hosted zone for example.com in Route 53, engineers add A, CNAME, and MX records to direct traffic to the right services. = Dopo aver creato una zona ospitata per example.com in Route 53, gli ingegneri aggiungono record A, CNAME e MX per dirigere il traffico ai servizi giusti.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Private Hosted Zone',
              italian: 'zona ospitata privata',
              pronunciation: '/ˈpraɪvət/',
              phonetic: 'PRAI-vet',
              example:
                "Internal microservices use a private hosted zone so that names like api.internal.corp resolve only from within the VPC, not from the public Internet. = I microservizi interni usano una zona ospitata privata cosi che nomi come api.internal.corp risolvano solo dall'interno della VPC, non da Internet pubblica.",
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'Alias Record',
              italian: 'record alias',
              pronunciation: '/ˈeɪliəs/',
              phonetic: 'EI-lias',
              example:
                'AWS alias records point to AWS resources. = I record alias AWS puntano a risorse AWS.',
              context: 'services',
              difficulty: 'advanced',
            },
            {
              english: 'DNS health check',
              italian: 'health check DNS',
              pronunciation: '/helθ tʃek/',
              phonetic: 'HELTH CEK',
              example:
                'A DNS health check on Route 53 removes unhealthy endpoints from the answer set, steering users to a working region. = Un health check DNS su Route 53 rimuove gli endpoint non sani dal set di risposte, dirigendo gli utenti verso una region funzionante.',
              context: 'services',
              difficulty: 'advanced',
              note: 'Combinato con record di failover, abilita disaster recovery DNS-driven.',
            },
            {
              english: 'Traffic Director',
              italian: 'Traffic Director',
              pronunciation: '/ˈtræfɪk dəˈrektər/',
              phonetic: 'TRA-fik di-REK-ter',
              example:
                'GCP Traffic Director provides global service mesh. = GCP Traffic Director fornisce service mesh globale.',
              context: 'services',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 20 - AUTOMAZIONE DI RETE / NETWORK AUTOMATION
    // ════════════════════════════════════════════════
    20: {
      name: 'Automazione di Rete / Network Automation',
      description: 'Automatizzare la configurazione di rete',
      lessons: [
        {
          id: 'net_auto_tools_1',
          title: 'Automation Tools / Strumenti di Automazione',
          description: 'Ansible, Salt, Puppet per la rete',
          items: [
            {
              english: 'Ansible',
              italian: 'Ansible',
              pronunciation: '/ˈænsɪbəl/',
              phonetic: 'AN-si-bol',
              example:
                'In modern infrastructure, Ansible automates network configuration agentless. = Ansible automatizza la configurazione di rete senza agent.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Ansible',
            },
            {
              english: 'Playbook',
              italian: 'playbook Ansible',
              pronunciation: '/ˈpleɪbʊk/',
              phonetic: 'PLEI-buk',
              example:
                'To standardize communication, a Playbook defines automation tasks. = Un playbook definisce task di automazione.',
              context: 'tools',
              difficulty: 'advanced',
              code: '- name: Configure interface\\n  cisco.ios.ios_interface:\\n    name: GigabitEthernet1\\n    enabled: true',
            },
            {
              english: 'Inventory',
              italian: 'inventario (inventory)',
              pronunciation: '/ˈɪnvəntɔːri/',
              phonetic: 'IN-ven-to-ri',
              example:
                'An Ansible inventory file groups hosts by role so a playbook can target only the edge routers or only the core switches. = Un file di inventory Ansible raggruppa gli host per ruolo, così un playbook può colpire solo i router edge o solo i core switch.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Module',
              italian: 'modulo',
              pronunciation: '/ˈmɒdjuːl/',
              phonetic: 'MO-diul',
              example:
                'Ansible modules handle vendor specifics. = I moduli Ansible gestiscono specifiche del vendor.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Salt',
              italian: 'SaltStack',
              pronunciation: '/sɔːlt/',
              phonetic: 'SOLT',
              example:
                'Using its high-speed ZeroMQ message bus, Salt can push configuration changes to thousands of network devices within seconds. = Usando il suo bus messaggi ZeroMQ ad alta velocita, Salt puo inviare modifiche di configurazione a migliaia di dispositivi di rete in pochi secondi.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'SaltStack',
            },
            {
              english: 'Puppet',
              italian: 'Puppet',
              pronunciation: '/ˈpʌpɪt/',
              phonetic: 'PA-pet',
              example:
                'Under the hood, Puppet uses declarative configuration. = Puppet usa configurazione dichiarativa.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Puppet',
            },
            {
              english: 'Terraform',
              italian: 'Terraform',
              pronunciation: '/ˈterəfɔːrm/',
              phonetic: 'TE-ra-form',
              example:
                'In networking, Terraform provisions cloud network resources. = Terraform provisiona risorse di rete cloud.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Terraform',
            },
            {
              english: 'Idempotent',
              italian: 'idempotente',
              pronunciation: '/ˌaɪdemˈpoʊtnt/',
              phonetic: 'ai-dem-PO-tent',
              example:
                'In networking, Idempotent tasks can run multiple times safely. = I task idempotenti possono girare più volte in sicurezza.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Configuration Drift',
              italian: 'drift di configurazione',
              pronunciation: '/drɪft/',
              phonetic: 'DRIFT',
              example:
                'By definition, Configuration Drift is unintended changes over time. = Il drift di configurazione sono cambiamenti involontari nel tempo.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Source of Truth',
              italian: 'sorgente di verità (source of truth)',
              pronunciation: '/sɔːrs ʌv truːθ/',
              phonetic: 'SORS ov TRUTH',
              example:
                "Network automation needs a source of truth. = L'automazione di rete ha bisogno di una sorgente di verità.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'NetBox è uno strumento popolare.',
            },
          ],
        },
        {
          id: 'net_auto_apis_2',
          title: 'Network APIs / API di Rete',
          description: 'NETCONF, RESTCONF, gNMI',
          items: [
            {
              english: 'NETCONF',
              italian: 'NETCONF',
              pronunciation: '/net kɒnf/',
              phonetic: 'NET-KONF',
              example:
                'By definition, NETCONF is an XML-based config protocol. = NETCONF è un protocollo di configurazione basato su XML.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'RFC 6241. Porta 830.',
            },
            {
              english: 'RESTCONF',
              italian: 'RESTCONF',
              pronunciation: '/rest kɒnf/',
              phonetic: 'REST-KONF',
              example:
                'In networking, RESTCONF exposes NETCONF over HTTP. = RESTCONF espone NETCONF su HTTP.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'YANG',
              italian: 'YANG',
              pronunciation: '/jæŋ/',
              phonetic: 'IANG',
              example:
                'In networking, YANG models network configuration. = YANG modella la configurazione di rete.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Yet Another Next Generation. RFC 7950.',
            },
            {
              english: 'gNMI',
              italian: 'gNMI',
              pronunciation: '/dʒiː en em aɪ/',
              phonetic: 'GI-EN-EM-AI',
              example:
                'Under the hood, gNMI uses gRPC for streaming telemetry. = gNMI usa gRPC per streaming telemetry.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'gRPC Network Management Interface.',
            },
            {
              english: 'gRPC',
              italian: 'gRPC',
              pronunciation: '/dʒiː ɑːr piː siː/',
              phonetic: 'GI-AR-PI-SI',
              example:
                'For network operations, gRPC provides efficient binary RPC. = gRPC fornisce RPC binari efficienti.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Framework RPC ad alte prestazioni di Google, basato su HTTP/2 e Protocol Buffers.',
            },
            {
              english: 'OpenConfig',
              italian: 'OpenConfig',
              pronunciation: '/ˈoʊpən kɒnfɪɡ/',
              phonetic: 'OU-pen KON-fig',
              example:
                'For network operations, OpenConfig provides vendor-neutral YANG models. = OpenConfig fornisce modelli YANG vendor-neutral.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'REST API',
              italian: 'API REST',
              pronunciation: '/rest eɪ piː aɪ/',
              phonetic: 'REST-EI-PI-AI',
              example:
                "Instead of screen-scraping CLI output, automation scripts call the REST API endpoints that modern switches and firewalls expose natively. = Invece di fare screen-scraping dell'output CLI, gli script di automazione chiamano gli endpoint REST API che switch e firewall moderni espongono nativamente.",
              context: 'tools',
              difficulty: 'advanced',
              command: 'curl -X GET https://device/api/v1/interfaces',
            },
            {
              english: 'JSON-RPC',
              italian: 'JSON-RPC',
              pronunciation: '/ˈdʒeɪsən ɑːr piː siː/',
              phonetic: 'GEI-son AR-PI-SI',
              example:
                'Some devices use JSON-RPC for management. = Alcuni dispositivi usano JSON-RPC per la gestione.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'CLI Scraping',
              italian: 'scraping CLI',
              pronunciation: '/siː el aɪ ˈskreɪpɪŋ/',
              phonetic: 'SI-EL-AI SKREI-ping',
              example:
                'By definition, CLI Scraping is fragile but still common. = Il CLI scraping è fragile ma ancora comune.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Streaming Telemetry',
              italian: 'Telemetria streaming',
              pronunciation: '/ˈstriːmɪŋ təˈlemətri/',
              phonetic: 'STRI-ming te-LE-me-tri',
              example:
                'In networking, Streaming Telemetry replaces SNMP polling. = La telemetria streaming sostituisce il polling SNMP.',
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_auto_python_3',
          title: 'Python for Networking / Python per il Networking',
          description: 'Librerie Python per la rete',
          items: [
            {
              english: 'Netmiko',
              italian: 'Netmiko',
              pronunciation: '/net ˈmiːkoʊ/',
              phonetic: 'NET-MI-ko',
              example:
                'In networking, Netmiko simplifies SSH to network devices. = Netmiko semplifica SSH verso dispositivi di rete.',
              context: 'tools',
              difficulty: 'advanced',
              code: 'from netmiko import ConnectHandler',
            },
            {
              english: 'NAPALM',
              italian: 'NAPALM',
              pronunciation: '/ˈneɪpɑːm/',
              phonetic: 'NEI-palm',
              example:
                "In networking, NAPALM offers a multi-vendor abstraction. = NAPALM offre un'astrazione multi-vendor.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'Network Automation and Programmability Abstraction Layer with Multivendor support.',
            },
            {
              english: 'Nornir',
              italian: 'Nornir',
              pronunciation: '/ˈnɔːrnɪr/',
              phonetic: 'NOR-nir',
              example:
                'By definition, Nornir is a Python automation framework. = Nornir è un framework di automazione Python.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Paramiko',
              italian: 'Paramiko',
              pronunciation: '/pəˈræmɪkoʊ/',
              phonetic: 'pa-RA-mi-ko',
              example:
                'For network operations, Paramiko provides SSH in Python. = Paramiko fornisce SSH in Python.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'pyATS',
              italian: 'pyATS',
              pronunciation: '/paɪ eɪ tiː es/',
              phonetic: 'PAI-EI-TI-ES',
              example:
                "By definition, pyATS is Cisco's testing framework. = pyATS è il framework di testing Cisco.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'TextFSM',
              italian: 'TextFSM',
              pronunciation: '/tekst ef es em/',
              phonetic: 'TEKST-EF-ES-EM',
              example:
                "In networking, TextFSM parses CLI output into structured data. = TextFSM analizza l'output CLI in dati strutturati.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Genie',
              italian: 'Genie',
              pronunciation: '/ˈdʒiːni/',
              phonetic: 'GI-ni',
              example: `Cisco Genie parses CLI output into structured Python objects so you can write assertions in a network test suite. = Cisco Genie trasforma l'output CLI in oggetti Python strutturati così puoi scrivere assertion in una suite di test di rete.`,
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Jinja2',
              italian: 'Jinja2',
              pronunciation: '/ˈdʒɪndʒə tuː/',
              phonetic: 'GIN-gia TU',
              example:
                'In networking, Jinja2 templates generate device configs. = I template Jinja2 generano configurazioni dispositivi.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'NetBox',
              italian: 'NetBox',
              pronunciation: '/net bɒks/',
              phonetic: 'NET-BOKS',
              example:
                'By definition, NetBox is a popular IPAM and DCIM tool. = NetBox è un popolare tool di IPAM e DCIM.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'NetBox',
            },
            {
              english: 'Scrapli',
              italian: 'Scrapli',
              pronunciation: '/ˈskræpli/',
              phonetic: 'SKRA-pli',
              example:
                'By definition, Scrapli is a fast modern netmiko alternative. = Scrapli è una moderna alternativa veloce a netmiko.',
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_auto_cicd_4',
          title: 'NetDevOps / NetDevOps',
          description: 'CI/CD per la rete',
          items: [
            {
              english: 'NetDevOps',
              italian: 'NetDevOps',
              pronunciation: '/net ˈdevɒps/',
              phonetic: 'NET-DEV-ops',
              example:
                'In networking, NetDevOps applies DevOps to networking. = NetDevOps applica DevOps al networking.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Infrastructure as Code',
              italian: 'Infrastruttura come codice',
              pronunciation: '/ˈɪnfrəstrʌktʃər/',
              phonetic: 'IN-fra-strak-cer',
              example:
                'Treating network configs as Infrastructure as Code lets you peer review changes in a pull request before they touch production. = Trattare le configurazioni di rete come Infrastructure as Code ti permette di fare code review dei cambiamenti in una pull request prima che tocchino la produzione.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'CI/CD Pipeline',
              italian: 'Pipeline CI/CD',
              pronunciation: '/siː aɪ siː diː/',
              phonetic: 'SI-AI-SI-DI',
              example:
                'Before merging a router configuration change, the CI/CD pipeline runs automated syntax checks and topology simulations to catch errors early. = Prima di fare merge di un cambiamento di configurazione del router, la pipeline CI/CD esegue controlli automatici di sintassi e simulazioni di topologia per cogliere errori in anticipo.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Pre-Change Test',
              italian: 'Test pre-change',
              pronunciation: '/priː tʃeɪndʒ test/',
              phonetic: 'PRI-CEINGE TEST',
              example:
                'Running automated pre-change tests against a lab environment catches misconfigurations before they can impact production traffic. = Eseguire test pre-change automatizzati contro un ambiente lab coglie le misconfigurazioni prima che possano impattare il traffico di produzione.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Post-Change Test',
              italian: 'Test post-change',
              pronunciation: '/poʊst tʃeɪndʒ/',
              phonetic: 'POUST-CEINGE',
              example:
                'After applying the new firewall rules, automated post-change tests confirm that all critical services remain reachable and latency stays within SLA. = Dopo aver applicato le nuove regole firewall, i test post-change automatizzati confermano che tutti i servizi critici restano raggiungibili e la latenza rimane entro lo SLA.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Network Lab',
              italian: 'Lab di rete',
              pronunciation: '/ˈnetwɜːrk læb/',
              phonetic: 'NET-uerk LAB',
              example: `We rebuild the full network lab in containerlab every night to catch regressions before they reach the production fabric. = Ricostruiamo ogni notte l'intero lab di rete in containerlab per intercettare le regressioni prima che arrivino alla fabric di produzione.`,
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Containerlab, GNS3, EVE-NG',
            },
            {
              english: 'Batfish',
              italian: 'Batfish',
              pronunciation: '/ˈbætfɪʃ/',
              phonetic: 'BAT-fish',
              example:
                'In networking, Batfish analyzes configs offline. = Batfish analizza le configurazioni offline.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Batfish',
            },
            {
              english: 'Network Validation',
              italian: 'validazione di rete',
              pronunciation: '/ˌvælɪˈdeɪʃən/',
              phonetic: 'va-li-DEI-scion',
              example:
                'As a security measure, Network Validation prevents misconfigurations. = La validazione di rete previene errori di configurazione.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Rollback',
              italian: 'ripristino (rollback)',
              pronunciation: '/ˈroʊlbæk/',
              phonetic: 'ROUL-bak',
              example:
                'Plan a rollback step before pushing a routing change: many automation tools auto-revert if the device loses connectivity. = Pianifica un passo di rollback prima di applicare un cambio di routing: molti tool di automazione fanno revert automatico se il device perde connettività.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'GitOps',
              italian: 'GitOps',
              pronunciation: '/ɡɪt ɒps/',
              phonetic: 'GHIT-OPS',
              example:
                'In networking, GitOps drives changes from Git commits. = GitOps guida i cambiamenti dai commit Git.',
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 21 - MONITORAGGIO RETE / NETWORK MONITORING
    // ════════════════════════════════════════════════
    21: {
      name: 'Monitoraggio Rete / Network Monitoring',
      description: 'Strumenti di monitoraggio e flusso',
      lessons: [
        {
          id: 'net_monitor_flow_1',
          title: 'Flow Monitoring / Monitoraggio Flussi',
          description: 'NetFlow, sFlow, IPFIX',
          items: [
            {
              english: 'NetFlow',
              italian: 'NetFlow',
              pronunciation: '/net floʊ/',
              phonetic: 'NET-FLOU',
              example:
                'In networking, NetFlow records traffic flow data. = NetFlow registra dati di flusso del traffico.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Sviluppato da Cisco. Ora Flexible NetFlow.',
            },
            {
              english: 'sFlow',
              italian: 'sFlow',
              pronunciation: '/es floʊ/',
              phonetic: 'ES-FLOU',
              example:
                'In networking, sFlow samples packets for monitoring. = sFlow campiona pacchetti per il monitoring.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Sampled Flow.',
            },
            {
              english: 'IPFIX',
              italian: 'IPFIX',
              pronunciation: '/aɪ piː fɪks/',
              phonetic: 'AI-PI-FIKS',
              example:
                'By definition, IPFIX is the standardized successor of NetFlow. = IPFIX è il successore standard di NetFlow.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'IP Flow Information Export. RFC 7011.',
            },
            {
              english: 'Flow Record',
              italian: 'Record di flusso',
              pronunciation: '/floʊ ˈrekɔːrd/',
              phonetic: 'FLOU RE-kord',
              example:
                'In networking, a Flow Record summarizes a conversation. = Un record di flusso riassume una conversazione.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Flow Exporter',
              italian: 'Esportatore flussi',
              pronunciation: '/ɪkˈspɔːrtər/',
              phonetic: 'iks-POR-ter',
              example:
                "Each router runs a flow exporter that summarizes traffic into five-tuple records and sends them to the central collector for analysis. = Ogni router esegue un flow exporter che sintetizza il traffico in record a cinque tuple e li invia al collector centrale per l'analisi.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Flow Collector',
              italian: 'Collector flussi',
              pronunciation: '/kəˈlektər/',
              phonetic: 'ko-LEK-ter',
              example:
                'The centralized flow collector ingests millions of records per minute, enabling the NOC to query historical traffic patterns for capacity planning. = Il flow collector centralizzato acquisisce milioni di record al minuto, consentendo al NOC di interrogare i pattern di traffico storici per il capacity planning.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'nfdump, ntopng',
            },
            {
              english: 'Sampling Rate',
              italian: 'Frequenza di campionamento',
              pronunciation: '/ˈsæmplɪŋ reɪt/',
              phonetic: 'SAM-pling REIT',
              example:
                'In networking, Sampling Rate trades accuracy for performance. = La frequenza di campionamento scambia accuratezza per prestazioni.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Esempio: 1:1000 = un pacchetto ogni 1000.',
            },
            {
              english: 'Flow Cache',
              italian: 'Cache flussi',
              pronunciation: '/floʊ kæʃ/',
              phonetic: 'FLOU KASH',
              example:
                'For efficiency, Flow Cache stores active flows on the device. = La cache flussi memorizza flussi attivi sul dispositivo.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Top Talkers',
              italian: 'Top talker',
              pronunciation: '/tɒp ˈtɔːkərz/',
              phonetic: 'TOP TO-kers',
              example:
                'In networking, Top Talkers identify heavy bandwidth users. = I top talker identificano utenti con uso pesante di banda.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Application Visibility',
              italian: 'Visibilità applicativa',
              pronunciation: '/ˌæplɪˈkeɪʃən/',
              phonetic: 'a-pli-KEI-scion',
              example:
                'In networking, Application Visibility shows what apps consume bandwidth. = La visibilità applicativa mostra quali app consumano banda.',
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_monitor_snmp_2',
          title: 'SNMP Monitoring / Monitoraggio SNMP',
          description: 'Polling e trap SNMP',
          items: [
            {
              english: 'SNMP Polling',
              italian: 'Polling SNMP',
              pronunciation: '/ˈpoʊlɪŋ/',
              phonetic: 'POU-ling',
              example:
                'In networking, SNMP Polling queries device counters. = Il polling SNMP interroga contatori dispositivi.',
              context: 'tools',
              difficulty: 'advanced',
              command: 'snmpget -v 2c -c public 192.168.1.1 sysUpTime.0',
            },
            {
              english: 'SNMP Trap',
              italian: 'Trap SNMP',
              pronunciation: '/snmp træp/',
              phonetic: 'ES-EN-EM-PI TRAP',
              example:
                "When a switch interface goes down, it immediately sends an SNMP trap to the management station without waiting for the next polling cycle. = Quando un'interfaccia dello switch va giu, invia immediatamente una trap SNMP alla stazione di gestione senza attendere il prossimo ciclo di polling.",
              context: 'tools',
              difficulty: 'advanced',
              note: 'Inviate dal device al manager.',
            },
            {
              english: 'SNMP Walk',
              italian: 'SNMP walk',
              pronunciation: '/wɔːk/',
              phonetic: 'UOK',
              example:
                "Running snmpwalk against a switch traverses the entire OID tree, revealing interface counters, CPU load, and temperature sensor readings. = Eseguendo snmpwalk su uno switch si attraversa l'intero albero OID, rivelando contatori di interfaccia, carico CPU e letture dei sensori di temperatura.",
              context: 'tools',
              difficulty: 'advanced',
              command: 'snmpwalk -v 2c -c public 192.168.1.1 1.3.6.1.2.1',
            },
            {
              english: 'Community String',
              italian: 'stringa community SNMP',
              pronunciation: '/kəˈmjuːnəti strɪŋ/',
              phonetic: 'ko-MIU-ne-ti STRING',
              example:
                'An SNMPv2c community string acts as a plaintext password and should never traverse untrusted networks unencrypted. = Una community string SNMPv2c funge da password in chiaro e non dovrebbe mai attraversare reti non fidate senza cifratura.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Default "public" molto rischioso!',
            },
            {
              english: 'SNMPv3',
              italian: 'SNMPv3',
              pronunciation: '/ˌes en em piː θriː/',
              phonetic: 'ES-EN-EM-PI-THRI',
              example:
                'In networking, SNMPv3 adds authentication and encryption. = SNMPv3 aggiunge autenticazione e cifratura.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Counter',
              italian: 'Contatore',
              pronunciation: '/ˈkaʊntər/',
              phonetic: 'KAUN-ter',
              example:
                "SNMP counters track interface byte counts. = I contatori SNMP tracciano i conteggi di byte sull'interfaccia.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Gauge',
              italian: 'misura istantanea (gauge)',
              pronunciation: '/ɡeɪdʒ/',
              phonetic: 'GHEIGE',
              example:
                'In networking, a Gauge measures current value (CPU, RAM). = Un gauge misura il valore corrente (CPU, RAM).',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Threshold',
              italian: 'Soglia',
              pronunciation: '/ˈθreʃhoʊld/',
              phonetic: 'THRESH-hould',
              example:
                "When CPU utilization crosses the 90% threshold for five consecutive minutes, the monitoring system triggers an alert and pages the on-call engineer. = Quando l'utilizzo CPU supera la soglia del 90% per cinque minuti consecutivi, il sistema di monitoraggio genera un alert e avvisa l'ingegnere reperibile.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Polling Interval',
              italian: 'Intervallo di polling',
              pronunciation: '/ˈɪntərvəl/',
              phonetic: 'IN-ter-val',
              example: `A 1-minute polling interval is a good default for interface counters, but CPU and memory often need 30 seconds. = Un intervallo di polling di 1 minuto e' un buon default per i counter di interfaccia, ma CPU e memoria richiedono spesso 30 secondi.`,
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Bandwidth Utilization',
              italian: 'Utilizzo banda',
              pronunciation: '/ˌjuːtəlaɪˈzeɪʃən/',
              phonetic: 'iu-ti-lai-ZEI-scion',
              example:
                "By definition, Bandwidth Utilization is calculated from counters. = L'utilizzo di banda è calcolato dai contatori.",
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_monitor_npm_3',
          title: 'NPM Tools / Strumenti NPM',
          description: 'Network Performance Monitoring',
          items: [
            {
              english: 'NPM',
              italian: 'monitoraggio prestazioni di rete (NPM)',
              pronunciation: '/en piː em/',
              phonetic: 'EN-PI-EM',
              example:
                'In networking, NPM tools monitor network health. = I tool NPM monitorano la salute della rete.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Zabbix',
              italian: 'Zabbix',
              pronunciation: '/ˈzæbɪks/',
              phonetic: 'ZA-biks',
              example:
                'By definition, Zabbix is an open-source monitoring tool. = Zabbix è un tool di monitoring open-source.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Zabbix',
              note: 'Sistema open source di monitoring enterprise per metriche di rete, host e applicazioni.',
            },
            {
              english: 'PRTG',
              italian: 'PRTG',
              pronunciation: '/piː ɑːr tiː dʒiː/',
              phonetic: 'PI-AR-TI-GI',
              example:
                'By definition, PRTG is a popular Windows monitoring solution. = PRTG è una popolare soluzione di monitoring Windows.',
              context: 'tools',
              difficulty: 'advanced',
              note: 'Sistema di monitoring commerciale di Paessler basato su sensori (SNMP, sFlow, NetFlow, ecc.).',
            },
            {
              english: 'Nagios',
              italian: 'Nagios',
              pronunciation: '/ˈnæɡioʊs/',
              phonetic: 'NA-gios',
              example:
                'In networking, Nagios pioneered network monitoring. = Nagios ha aperto la strada al network monitoring.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Nagios',
              note: 'Sistema di monitoring storico per host e servizi, base di molti fork moderni come Icinga.',
            },
            {
              english: 'LibreNMS',
              italian: 'LibreNMS',
              pronunciation: '/ˈliːbrə en em es/',
              phonetic: 'LI-bre EN-EM-ES',
              example:
                'In networking, LibreNMS auto-discovers network devices. = LibreNMS auto-scopre i dispositivi di rete.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'LibreNMS',
              note: 'NMS open source basato su PHP e MySQL, con auto-discovery via SNMP e dashboard integrate.',
            },
            {
              english: 'Grafana',
              italian: 'Grafana',
              pronunciation: '/ɡrəˈfɑːnə/',
              phonetic: 'gra-FA-na',
              example:
                'In networking, Grafana visualizes network metrics. = Grafana visualizza le metriche di rete.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Grafana',
              note: 'Piattaforma open source di dashboard e visualizzazione per metriche time-series.',
            },
            {
              english: 'Prometheus',
              italian: 'Prometheus',
              pronunciation: '/prəˈmiːθiəs/',
              phonetic: 'pro-ME-tius',
              example:
                'In networking, Prometheus collects time-series metrics. = Prometheus raccoglie metriche time-series.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'Prometheus',
              note: 'Sistema di monitoring CNCF basato su un database time-series e sul linguaggio di query PromQL.',
            },
            {
              english: 'SmokePing',
              italian: 'SmokePing',
              pronunciation: '/smoʊk pɪŋ/',
              phonetic: 'SMOUK-PING',
              example:
                'In networking, SmokePing visualizes latency over time. = SmokePing visualizza la latenza nel tempo.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Cacti',
              italian: 'Cacti',
              pronunciation: '/ˈkæktaɪ/',
              phonetic: 'KAK-tai',
              example:
                'In networking, Cacti graphs RRD-based metrics. = Cacti grafica metriche basate su RRD.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'ntopng',
              italian: 'ntopng',
              pronunciation: '/en tɒp en dʒiː/',
              phonetic: 'EN-TOP-EN-GI',
              example:
                'For network operations, ntopng provides deep traffic analysis. = ntopng fornisce analisi profonda del traffico.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'ntopng',
            },
          ],
        },
        {
          id: 'net_monitor_logs_4',
          title: 'Logging & Alerting / Log e Alert',
          description: 'Gestione log e notifiche',
          items: [
            {
              english: 'Syslog Server',
              italian: 'Server syslog',
              pronunciation: '/ˈsɪslɒɡ/',
              phonetic: 'SIS-log',
              example:
                'In networking, a Syslog Server centralizes device logs. = Un server syslog centralizza i log dei dispositivi.',
              context: 'tools',
              difficulty: 'advanced',
              tool: 'rsyslog, syslog-ng',
            },
            {
              english: 'Log Aggregation',
              italian: 'Aggregazione log',
              pronunciation: '/ˌæɡrɪˈɡeɪʃən/',
              phonetic: 'ag-ri-GHEI-scion',
              example:
                "In networking, Log Aggregation collects logs centrally. = L'aggregazione log raccoglie log centralmente.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'ELK Stack',
              italian: 'stack ELK',
              pronunciation: '/elk stæk/',
              phonetic: 'ELK STAK',
              example:
                "The ELK Stack combines Elasticsearch for indexing, Logstash for log ingestion, and Kibana for dashboards to give network teams full observability. = Lo stack ELK combina Elasticsearch per l'indicizzazione, Logstash per l'ingestione dei log e Kibana per le dashboard, dando ai team di rete piena osservabilita.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Severity Level',
              italian: 'Livello di severità',
              pronunciation: '/səˈverɪti/',
              phonetic: 'se-VE-ri-ti',
              example:
                'Syslog severity levels go from emergency (0) to debug (7), and most teams forward warning (4) and above to the SIEM. = I livelli di severità syslog vanno da emergency (0) a debug (7), e la maggior parte dei team inoltra warning (4) e superiori al SIEM.',
              context: 'tools',
              difficulty: 'advanced',
              note: '0=emergency, 7=debug.',
            },
            {
              english: 'Facility',
              italian: 'facility syslog',
              pronunciation: '/fəˈsɪlɪti/',
              phonetic: 'fa-SI-li-ti',
              example:
                'During analysis, Facility identifies the log source. = La facility identifica la sorgente del log.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Alert',
              italian: 'Avviso',
              pronunciation: '/əˈlɜːrt/',
              phonetic: 'a-LERT',
              example:
                "When link utilization exceeds 85%, the monitoring system fires an alert that notifies the on-call network operator via PagerDuty. = Quando l'utilizzo del link supera l'85%, il sistema di monitoraggio genera un avviso che notifica l'operatore di rete reperibile tramite PagerDuty.",
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'Alertmanager',
              italian: 'Alertmanager',
              pronunciation: '/əˈlɜːrt ˈmænɪdʒər/',
              phonetic: 'a-LERT MA-ni-ger',
              example:
                'In the forwarding pipeline, Alertmanager routes Prometheus alerts. = Alertmanager instrada gli alert di Prometheus.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'On-Call',
              italian: 'Reperibilità',
              pronunciation: '/ɒn kɔːl/',
              phonetic: 'ON-KOL',
              example:
                'In networking, On-Call engineers respond to incidents. = Gli ingegneri reperibili rispondono agli incidenti.',
              context: 'tools',
              difficulty: 'advanced',
            },
            {
              english: 'PagerDuty',
              italian: 'PagerDuty',
              pronunciation: '/ˈpeɪdʒər ˈdjuːti/',
              phonetic: 'PEI-ger DIU-ti',
              example:
                "At its layer, PagerDuty handles alert escalation. = PagerDuty gestisce l'escalation degli alert.",
              context: 'tools',
              difficulty: 'advanced',
              tool: 'PagerDuty',
              note: 'Piattaforma on-call e incident response che instrada gli alert al tecnico di turno.',
            },
            {
              english: 'Runbook',
              italian: 'procedura operativa (runbook)',
              pronunciation: '/ˈrʌnbʊk/',
              phonetic: 'RAN-buk',
              example:
                "During a production outage, the on-call engineer follows the runbook step by step to diagnose the root cause and restore service within the SLA. = Durante un'interruzione in produzione, l'ingegnere reperibile segue il runbook passo per passo per diagnosticare la causa radice e ripristinare il servizio entro lo SLA.",
              context: 'tools',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 22 - DESIGN DI RETE / NETWORK DESIGN
    // ════════════════════════════════════════════════
    22: {
      name: 'Design di Rete / Network Design',
      description: 'Progettazione di reti enterprise',
      lessons: [
        {
          id: 'net_design_topology_1',
          title: 'Network Topologies / Topologie di Rete',
          description: 'Architetture comuni',
          items: [
            {
              english: 'Three-Tier',
              italian: 'architettura a tre livelli',
              pronunciation: '/θriː tɪər/',
              phonetic: 'THRI-TIIR',
              example:
                'By design, Three-Tier has core, distribution, access. = Il three-tier ha core, distribuzione, accesso.',
              context: 'design',
              difficulty: 'advanced',
              note: 'Architettura classica Cisco.',
            },
            {
              english: 'Core Layer',
              italian: 'Livello core',
              pronunciation: '/kɔːr ˈleɪər/',
              phonetic: 'KOR LEI-er',
              example:
                'For network operations, Core Layer provides high-speed backbone. = Il livello core fornisce dorsale ad alta velocità.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Distribution Layer',
              italian: 'Livello distribuzione',
              pronunciation: '/ˌdɪstrɪˈbjuːʃən/',
              phonetic: 'di-stri-BIU-scion',
              example:
                'In networking, Distribution Layer aggregates access switches. = Il livello distribuzione aggrega gli switch di accesso.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Access Layer',
              italian: 'Livello accesso',
              pronunciation: '/ˈækses/',
              phonetic: 'AK-ses',
              example:
                'In the network topology, Access Layer connects end devices. = Il livello accesso connette dispositivi finali.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Spine-Leaf',
              italian: 'architettura spine-leaf',
              pronunciation: '/spaɪn liːf/',
              phonetic: 'SPAIN LIF',
              example:
                'By definition, Spine-Leaf is the modern data center fabric. = Spine-leaf è il fabric moderno per data center.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Spine',
              italian: 'spine',
              pronunciation: '/spaɪn/',
              phonetic: 'SPAIN',
              example:
                'In networking, Spine switches form the high-speed backbone. = Gli switch spine formano la dorsale ad alta velocità.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Leaf',
              italian: 'leaf',
              pronunciation: '/liːf/',
              phonetic: 'LIF',
              example:
                'In networking, Leaf switches connect to servers. = Gli switch leaf connettono ai server.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Collapsed Core',
              italian: 'Core collassato',
              pronunciation: '/kəˈlæpst/',
              phonetic: 'ko-LAPST',
              example:
                'In networking, Collapsed Core merges distribution and core. = Il core collassato unisce distribuzione e core.',
              context: 'design',
              difficulty: 'advanced',
              note: 'Comune nelle reti più piccole.',
            },
            {
              english: 'Hub-and-Spoke',
              italian: 'topologia hub-and-spoke',
              pronunciation: '/hʌb ænd spoʊk/',
              phonetic: 'HAB-AND-SPOUK',
              example:
                'In the network topology, Hub-and-Spoke connects branches via central HQ. = Hub-and-spoke connette filiali via HQ centrale.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Full Mesh',
              italian: 'Mesh piena',
              pronunciation: '/fʊl meʃ/',
              phonetic: 'FUL-MESH',
              example:
                'In the network topology, Full Mesh connects every node to every other. = La mesh piena connette ogni nodo a tutti gli altri.',
              context: 'design',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_design_ha_2',
          title: 'High Availability / Alta Disponibilità',
          description: 'Ridondanza e failover',
          items: [
            {
              english: 'High Availability',
              italian: 'alta disponibilità (HA)',
              pronunciation: '/əˌveɪləˈbɪlɪti/',
              phonetic: 'a-vei-la-BI-li-ti',
              example:
                'HA designs avoid single points of failure. = I design HA evitano punti singoli di guasto.',
              context: 'design',
              difficulty: 'advanced',
              note: 'Spesso espresso come "five nines" (99.999%).',
            },
            {
              english: 'Redundancy',
              italian: 'ridondanza',
              pronunciation: '/rɪˈdʌndənsi/',
              phonetic: 'ri-DAN-den-si',
              example:
                'In networking, Redundancy duplicates critical components. = La ridondanza duplica componenti critici.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Failover',
              italian: 'commutazione di guasto (failover)',
              pronunciation: '/ˈfeɪloʊvər/',
              phonetic: 'FEIL-ou-ver',
              example:
                'Automatic failover restores service quickly. = Il failover automatico ripristina il servizio rapidamente.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'HSRP',
              italian: 'HSRP',
              pronunciation: '/eɪtʃ es ɑːr piː/',
              phonetic: 'EICH-ES-AR-PI',
              example:
                'For network operations, HSRP provides router redundancy. = HSRP fornisce ridondanza router.',
              context: 'design',
              difficulty: 'advanced',
              note: 'Hot Standby Router Protocol. Cisco.',
            },
            {
              english: 'VRRP',
              italian: 'VRRP',
              pronunciation: '/viː ɑːr ɑːr piː/',
              phonetic: 'VI-AR-AR-PI',
              example:
                'By definition, VRRP is the standardized version of HSRP. = VRRP è la versione standard di HSRP.',
              context: 'design',
              difficulty: 'advanced',
              note: 'Virtual Router Redundancy Protocol.',
            },
            {
              english: 'GLBP',
              italian: 'GLBP',
              pronunciation: '/dʒiː el biː piː/',
              phonetic: 'GI-EL-BI-PI',
              example:
                'In networking, GLBP balances traffic across active routers. = GLBP bilancia il traffico tra router attivi.',
              context: 'design',
              difficulty: 'advanced',
              note: 'Gateway Load Balancing Protocol.',
            },
            {
              english: 'Active-Passive',
              italian: 'attivo-passivo',
              pronunciation: '/ˈæktɪv ˈpæsɪv/',
              phonetic: 'AK-tiv PA-siv',
              example:
                'Under the hood, Active-Passive uses one node at a time. = Active-passive usa un nodo alla volta.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Active-Active',
              italian: 'attivo-attivo',
              pronunciation: '/ˈæktɪv ˈæktɪv/',
              phonetic: 'AK-tiv AK-tiv',
              example:
                'Under the hood, Active-Active uses all nodes simultaneously. = Active-active usa tutti i nodi simultaneamente.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'switch stack',
              italian: 'stack di switch',
              pronunciation: '/stæk/',
              phonetic: 'STAK',
              example:
                'A switch stack lets multiple physical units act as one logical device, sharing MAC tables and a single management plane. = Uno stack di switch permette a più unità fisiche di comportarsi come un unico dispositivo logico, condividendo tabelle MAC e un solo piano di gestione.',
              context: 'design',
              difficulty: 'advanced',
              note: 'Tecnologie tipiche: Cisco StackWise, Aruba VSF, Juniper Virtual Chassis.',
            },
            {
              english: 'VSS',
              italian: 'VSS',
              pronunciation: '/viː es es/',
              phonetic: 'VI-ES-ES',
              example:
                'In networking, VSS combines two switches into one. = VSS combina due switch in uno solo.',
              context: 'design',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_design_dcn_3',
          title: 'Data Center Networks / Reti Data Center',
          description: 'Architetture per data center',
          items: [
            {
              english: 'DCN',
              italian: 'rete del data center (DCN)',
              pronunciation: '/diː siː en/',
              phonetic: 'DI-SI-EN',
              example:
                'In networking, DCN designs handle east-west traffic. = I design DCN gestiscono traffico est-ovest.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Top of Rack',
              italian: 'switch top-of-rack (ToR)',
              pronunciation: '/tɒp ʌv ræk/',
              phonetic: 'TOP-ov-RAK',
              example:
                'ToR switches sit at the top of each rack. = Gli switch ToR si trovano in cima a ogni rack.',
              context: 'design',
              difficulty: 'advanced',
              note: 'Spesso abbreviato ToR.',
            },
            {
              english: 'End of Row',
              italian: 'switch end-of-row (EoR)',
              pronunciation: '/end ʌv roʊ/',
              phonetic: 'END-ov-ROU',
              example:
                'An end-of-row switch concentrates several rack cabinets onto one chassis, simplifying cabling but creating a fatter blast radius. = Uno switch end-of-row concentra più armadi rack su un unico chassis, semplificando il cablaggio ma creando un blast radius più ampio.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Fat Tree',
              italian: 'topologia fat tree',
              pronunciation: '/fæt triː/',
              phonetic: 'FAT TRI',
              example:
                'By definition, Fat Tree is a non-blocking topology. = Fat tree è una topologia non-blocking.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Oversubscription',
              italian: 'oversubscription',
              pronunciation: '/ˌoʊvərsəbˈskrɪpʃən/',
              phonetic: 'O-ver-sab-SKRIP-scion',
              example:
                "In networking, Oversubscription ratio measures uplink contention. = Il rapporto di oversubscription misura la contesa sull'uplink.",
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Fabric',
              italian: 'fabric di rete',
              pronunciation: '/ˈfæbrɪk/',
              phonetic: 'FA-brik',
              example:
                "By definition, a Fabric is the data center network underlay. = Un fabric è l'underlay di rete del data center.",
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Pod',
              italian: 'pod',
              pronunciation: '/pɒd/',
              phonetic: 'POD',
              example:
                "By definition, a Pod is a self-contained unit of leaves. = Un pod è un'unità autosufficiente di leaf.",
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Super Spine',
              italian: 'super spine',
              pronunciation: '/ˈsuːpər spaɪn/',
              phonetic: 'SU-per SPAIN',
              example:
                'In a multi-pod data center fabric, the super spine layer provides high-bandwidth interconnection between independent spine-leaf pods. = In un fabric data center multi-pod, il layer super spine fornisce interconnessione ad alta banda tra pod spine-leaf indipendenti.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Border Leaf',
              italian: 'border leaf',
              pronunciation: '/ˈbɔːrdər liːf/',
              phonetic: 'BOR-der LIF',
              example:
                'In a spine-leaf fabric, the border leaf switches connect to the WAN edge routers, serving as the gateway between the data center and external networks. = In un fabric spine-leaf, gli switch border leaf connettono ai router WAN edge, fungendo da gateway tra il data center e le reti esterne.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Service Leaf',
              italian: 'service leaf',
              pronunciation: '/ˈsɜːrvɪs liːf/',
              phonetic: 'SER-vis LIF',
              example:
                'Service leaves host firewalls and load balancers. = I service leaf ospitano firewall e bilanciatori.',
              context: 'design',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_design_segment_4',
          title: 'Segmentation & Capacity / Segmentazione e Capacità',
          description: 'Pianificazione di rete',
          items: [
            {
              english: 'Network Segmentation',
              italian: 'segmentazione di rete',
              pronunciation: '/ˌseɡmenˈteɪʃən/',
              phonetic: 'seg-men-TEI-scion',
              example:
                'Segmentation limits attack blast radius. = La segmentazione limita il raggio di un attacco.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Capacity Planning',
              italian: 'Pianificazione capacità',
              pronunciation: '/kəˈpæsəti/',
              phonetic: 'ka-PA-se-ti',
              example:
                'To guarantee data integrity, Capacity Planning ensures bandwidth meets demand. = La pianificazione capacità assicura che la banda incontri la domanda.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Greenfield',
              italian: 'progetto da zero (greenfield)',
              pronunciation: '/ˈɡriːnfiːld/',
              phonetic: 'GRIN-fild',
              example:
                'In networking, a Greenfield design starts from scratch. = Un design greenfield inizia da zero.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Brownfield',
              italian: 'progetto su infrastruttura esistente (brownfield)',
              pronunciation: '/ˈbraʊnfiːld/',
              phonetic: 'BRAUN-fild',
              example:
                'In networking, Brownfield designs work with existing infrastructure. = I design brownfield lavorano con infrastruttura esistente.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'Migration Plan',
              italian: 'piano di migrazione',
              pronunciation: '/maɪˈɡreɪʃən/',
              phonetic: 'mai-GREI-scion',
              example:
                'In networking, a Migration Plan minimizes downtime. = Un piano di migrazione minimizza i disservizi.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'IPAM',
              italian: 'gestione indirizzi IP (IPAM)',
              pronunciation: '/ˈaɪpæm/',
              phonetic: 'AI-PAM',
              example:
                'For accountability, IPAM tracks IP address allocations. = IPAM traccia le allocazioni di indirizzi IP.',
              context: 'design',
              difficulty: 'advanced',
              note: 'IP Address Management.',
            },
            {
              english: 'Network Diagram',
              italian: 'diagramma di rete',
              pronunciation: '/ˈdaɪəɡræm/',
              phonetic: 'DAI-a-gram',
              example:
                'Before any maintenance window, the team reviews the network diagram to identify which links and devices will be affected by the change. = Prima di qualsiasi finestra di manutenzione, il team rivede il diagramma di rete per identificare quali link e dispositivi saranno interessati dal cambiamento.',
              context: 'design',
              difficulty: 'advanced',
              tool: 'draw.io, Visio',
            },
            {
              english: 'SLA',
              italian: 'accordo sul livello di servizio (SLA)',
              pronunciation: '/es el eɪ/',
              phonetic: 'ES-EL-EI',
              example:
                'To standardize communication, the SLA defines uptime guarantees. = Lo SLA definisce le garanzie di uptime.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'RPO',
              italian: 'RPO',
              pronunciation: '/ɑːr piː oʊ/',
              phonetic: 'AR-PI-O',
              example:
                'To standardize communication, RPO defines acceptable data loss. = RPO definisce la perdita dati accettabile.',
              context: 'design',
              difficulty: 'advanced',
            },
            {
              english: 'RTO',
              italian: 'RTO',
              pronunciation: '/ɑːr tiː oʊ/',
              phonetic: 'AR-TI-O',
              example:
                'To standardize communication, RTO defines acceptable downtime. = RTO definisce il downtime accettabile.',
              context: 'design',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 23 - NETWORKING PROFESSIONALE / PROFESSIONAL NETWORKING
    // ════════════════════════════════════════════════
    23: {
      name: 'Networking Professionale / Professional Networking',
      description: 'Carriera, certificazioni e ruoli',
      lessons: [
        {
          id: 'net_pro_certs_1',
          title: 'Certifications / Certificazioni',
          description: 'Le principali certificazioni di rete',
          items: [
            {
              english: 'CCNA',
              italian: 'CCNA',
              pronunciation: '/siː siː en eɪ/',
              phonetic: 'SI-SI-EN-EI',
              example:
                'By definition, CCNA is the foundational Cisco certification. = CCNA è la certificazione Cisco di base.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Cisco Certified Network Associate: certificazione Cisco di livello associate per i fondamenti di rete.',
            },
            {
              english: 'CCNP',
              italian: 'CCNP',
              pronunciation: '/siː siː en piː/',
              phonetic: 'SI-SI-EN-PI',
              example:
                'By definition, CCNP is the professional Cisco level. = CCNP è il livello professionale Cisco.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Cisco Certified Network Professional: certificazione Cisco di livello professional con specializzazioni.',
            },
            {
              english: 'CCIE',
              italian: 'CCIE',
              pronunciation: '/siː siː aɪ iː/',
              phonetic: 'SI-SI-AI-I',
              example:
                'By definition, CCIE is the expert-level Cisco certification. = CCIE è la certificazione Cisco di livello expert.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Cisco Certified Internetwork Expert: la certificazione Cisco più avanzata, con esame lab pratico.',
            },
            {
              english: 'CompTIA Network+',
              italian: 'CompTIA Network+',
              pronunciation: '/kɒmpˈtiːə/',
              phonetic: 'kom-TI-a NET-uerk plas',
              example:
                "Because CompTIA Network+ is vendor-neutral, it covers foundational concepts from subnetting to troubleshooting without focusing on any single manufacturer's equipment. = Poiche CompTIA Network+ e vendor-neutral, copre concetti fondamentali dal subnetting al troubleshooting senza focalizzarsi sull'equipaggiamento di un singolo produttore.",
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Certificazione neutrale vendor di livello entry per i fondamenti del networking.',
            },
            {
              english: 'JNCIA',
              italian: 'JNCIA',
              pronunciation: '/dʒiː en siː aɪ eɪ/',
              phonetic: 'GI-EN-SI-AI-EI',
              example:
                "By definition, JNCIA is the entry Juniper certification. = JNCIA è la certificazione Juniper d'ingresso.",
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Juniper Networks Certified Internet Associate: certificazione Juniper di livello entry su Junos OS.',
            },
            {
              english: 'Aruba Certification',
              italian: 'certificazione Aruba',
              pronunciation: '/əˈruːbə/',
              phonetic: 'a-RU-ba',
              example:
                'Professionals seeking expertise in enterprise wireless and SD-WAN deployments often pursue an Aruba certification to validate their HPE networking skills. = I professionisti che cercano competenze in deployment wireless e SD-WAN enterprise spesso perseguono una certificazione Aruba per validare le proprie competenze di networking HPE.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'AWS Advanced Networking',
              italian: 'AWS Advanced Networking',
              pronunciation: '/eɪ dʌbljuː es/',
              phonetic: 'EI-DABOL-IU-ES',
              example:
                'AWS ANS validates cloud networking expertise. = AWS ANS valida competenze di networking cloud.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Certificazione AWS specialty per architetture di rete cloud complesse e ibride.',
            },
            {
              english: 'PCNSE',
              italian: 'PCNSE',
              pronunciation: '/piː siː en es iː/',
              phonetic: 'PI-SI-EN-ES-I',
              example:
                'By definition, PCNSE is the Palo Alto firewall certification. = PCNSE è la certificazione Palo Alto firewall.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Palo Alto Networks Certified Network Security Engineer: certificazione sui firewall Palo Alto.',
            },
            {
              english: 'Fortinet NSE',
              italian: 'Fortinet NSE',
              pronunciation: '/ˈfɔːrtɪnet/',
              phonetic: 'FOR-ti-net',
              example:
                'In networking, Fortinet NSE certifies FortiGate skills. = Fortinet NSE certifica competenze FortiGate.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Network Security Expert: percorso di certificazione Fortinet su 8 livelli (NSE 1-8).',
            },
            {
              english: 'Wireshark Certification',
              italian: 'certificazione Wireshark',
              pronunciation: '/ˈwaɪərʃɑːrk/',
              phonetic: 'UAI-er-shark',
              example:
                'Earning the Wireshark Certified Network Analyst certification proves you can dissect captures and troubleshoot live traffic. = Ottenere la certificazione Wireshark Certified Network Analyst dimostra che sai sezionare le catture e fare troubleshooting sul traffico live.',
              context: 'foundations',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_pro_roles_2',
          title: 'Network Roles / Ruoli di Rete',
          description: 'Carriere nel networking',
          items: [
            {
              english: 'Network Engineer',
              italian: 'ingegnere di rete',
              pronunciation: '/ˌendʒɪˈnɪər/',
              phonetic: 'en-gi-NIIR',
              example:
                "A typical day for a network engineer includes reviewing monitoring dashboards, troubleshooting outages, and planning capacity upgrades for the campus infrastructure. = Una giornata tipica per un network engineer include la revisione delle dashboard di monitoraggio, la risoluzione di guasti e la pianificazione di upgrade di capacita per l'infrastruttura campus.",
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Network Architect',
              italian: 'architetto di rete',
              pronunciation: '/ˈɑːrkɪtekt/',
              phonetic: 'AR-ki-tekt',
              example:
                "When the company expands to three new regions, the network architect designs the WAN topology, selects providers, and defines the IP addressing plan. = Quando l'azienda si espande in tre nuove regioni, il network architect progetta la topologia WAN, seleziona i provider e definisce il piano di indirizzamento IP.",
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'NOC Engineer',
              italian: 'Ingegnere NOC',
              pronunciation: '/nɒk ˌendʒɪˈnɪər/',
              phonetic: 'NOK en-gi-NIIR',
              example:
                "Working in rotating shifts, a NOC engineer watches real-time dashboards and responds to alerts to keep the service provider's network available around the clock. = Lavorando in turni a rotazione, un ingegnere NOC osserva dashboard in tempo reale e risponde agli alert per mantenere la rete del service provider disponibile 24/7.",
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Network Operations Center.',
            },
            {
              english: 'Network Administrator',
              italian: 'amministratore di rete',
              pronunciation: '/ədˈmɪnəstreɪtər/',
              phonetic: 'ad-MI-ni-strei-ter',
              example:
                'A network administrator owns day-to-day operations like VLAN changes, firewall rule reviews and capacity planning. = Un amministratore di rete gestisce le operazioni quotidiane come modifiche VLAN, revisione delle regole firewall e pianificazione della capacità.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Network Security Engineer',
              italian: 'Ingegnere sicurezza di rete',
              pronunciation: '/sɪˈkjʊərəti/',
              phonetic: 'si-KIU-re-ti',
              example:
                "After a vulnerability scan reveals open management ports, the network security engineer hardens the infrastructure by restricting access to a dedicated management VLAN. = Dopo che una scansione di vulnerabilita rivela porte di gestione aperte, l'ingegnere di sicurezza di rete fortifica l'infrastruttura limitando l'accesso a una VLAN di gestione dedicata.",
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Wireless Engineer',
              italian: 'Ingegnere wireless',
              pronunciation: '/ˈwaɪərləs/',
              phonetic: 'UAI-er-les',
              example:
                "Before installing access points in a new office floor, the wireless engineer performs a site survey to optimize channel assignments and minimize interference. = Prima di installare access point in un nuovo piano ufficio, l'ingegnere wireless esegue un site survey per ottimizzare le assegnazioni dei canali e minimizzare le interferenze.",
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Cloud Network Engineer',
              italian: 'Ingegnere rete cloud',
              pronunciation: '/klaʊd/',
              phonetic: 'KLAUD',
              example:
                "The cloud network engineer designs the VPC architecture with proper CIDR blocks, transit gateways, and peering connections to support the multi-account strategy. = L'ingegnere di rete cloud progetta l'architettura VPC con blocchi CIDR appropriati, transit gateway e connessioni peering per supportare la strategia multi-account.",
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Site Reliability Engineer',
              italian: 'ingegnere affidabilità del sito (SRE)',
              pronunciation: '/saɪt rɪˌlaɪəˈbɪlɪti/',
              phonetic: 'SAIT ri-lai-a-BI-li-ti',
              example:
                'SREs blend networking and software engineering. = Gli SRE fondono networking e ingegneria software.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Concept introdotto da Google.',
            },
            {
              english: 'Network Automation Engineer',
              italian: 'Ingegnere automazione rete',
              pronunciation: '/ˌɔːtəˈmeɪʃən/',
              phonetic: 'o-to-MEI-scion',
              example:
                "Using Python and Ansible, the network automation engineer writes playbooks that provision switches, apply security baselines, and validate compliance across 200 sites. = Usando Python e Ansible, l'ingegnere di automazione di rete scrive playbook che provisionano switch, applicano baseline di sicurezza e validano la compliance su 200 siti.",
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Pre-Sales Engineer',
              italian: 'Ingegnere pre-sales',
              pronunciation: '/priː seɪlz/',
              phonetic: 'PRI-SEILS',
              example:
                "Working alongside the sales team, the pre-sales engineer designs a technical network solution tailored to the customer's latency and bandwidth requirements. = Lavorando insieme al team commerciale, l'ingegnere pre-sales progetta una soluzione di rete tecnica su misura per i requisiti di latenza e banda del cliente.",
              context: 'foundations',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_pro_practice_3',
          title: 'Best Practices / Migliori Pratiche',
          description: 'Pratiche professionali',
          items: [
            {
              english: 'Documentation',
              italian: 'documentazione',
              pronunciation: '/ˌdɒkjumenˈteɪʃən/',
              phonetic: 'do-kiu-men-TEI-scion',
              example:
                'Good documentation saves hours of troubleshooting. = Una buona documentazione fa risparmiare ore di troubleshooting.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Change Window',
              italian: 'Finestra di change',
              pronunciation: '/tʃeɪndʒ ˈwɪndoʊ/',
              phonetic: 'CEINGE UIN-dou',
              example:
                'Schedule changes during the change window. = Pianifica i change durante la finestra di change.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Maintenance Window',
              italian: 'Finestra di manutenzione',
              pronunciation: '/ˈmeɪntənəns/',
              phonetic: 'MEIN-te-nens',
              example:
                "Critical firmware upgrades are scheduled during the Sunday maintenance window to minimize user impact while the redundant links handle failover. = Gli aggiornamenti firmware critici sono schedulati durante la finestra di manutenzione della domenica per minimizzare l'impatto sugli utenti mentre i link ridondanti gestiscono il failover.",
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Configuration Backup',
              italian: 'Backup configurazione',
              pronunciation: '/ˌkənfɪɡjəˈreɪʃən ˈbækʌp/',
              phonetic: 'kon-fig-iu-REI-scion BAK-ap',
              example:
                'Nightly configuration backups to a Git repo give you a tamper-evident history and a one-command rollback for every device. = Backup notturni delle configurazioni su un repo Git ti danno una storia a prova di manomissione e un rollback in un comando per ogni device.',
              context: 'foundations',
              difficulty: 'advanced',
              tool: 'RANCID, Oxidized',
            },
            {
              english: 'Naming Convention',
              italian: 'Convenzione di nomi',
              pronunciation: '/kənˈvenʃən/',
              phonetic: 'kon-VEN-scion',
              example:
                'Consistent naming conventions reduce errors. = Convenzioni di nomi consistenti riducono errori.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Standard Operating Procedure',
              italian: 'Procedura operativa standard',
              pronunciation: '/ˈstændərd ˈɒpəreɪtɪŋ/',
              phonetic: 'STAN-dard O-pe-rei-ting',
              example:
                'SOPs ensure repeatable network operations. = Le SOP garantiscono operazioni di rete ripetibili.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Defense in Depth',
              italian: 'Difesa in profondità',
              pronunciation: '/dɪˈfens ɪn depθ/',
              phonetic: 'di-FENS in DEPTH',
              example:
                'Under the hood, Defense in Depth uses multiple security layers. = La difesa in profondità usa più livelli di sicurezza.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Least Privilege',
              italian: 'Privilegio minimo',
              pronunciation: '/liːst ˈprɪvəlɪdʒ/',
              phonetic: 'LIST PRI-ve-lich',
              example:
                'Applying least privilege on RADIUS roles means a NOC operator can reboot a switch but cannot edit BGP policy. = Applicare il principio del privilegio minimo sui ruoli RADIUS significa che un operatore NOC può riavviare uno switch ma non modificare la policy BGP.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Patch Management',
              italian: 'Gestione patch',
              pronunciation: '/pætʃ ˈmænɪdʒmənt/',
              phonetic: 'PACH MA-nich-ment',
              example:
                'In networking, Patch Management closes known vulnerabilities. = La gestione patch chiude vulnerabilità note.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Disaster Recovery',
              italian: 'ripristino dopo disastro (DR)',
              pronunciation: '/dɪˈzɑːstər/',
              phonetic: 'di-ZA-ster',
              example:
                'In networking, Disaster Recovery plans handle major outages. = I piani disaster recovery gestiscono grandi disservizi.',
              context: 'foundations',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'net_pro_career_4',
          title: 'Career Growth / Crescita di Carriera',
          description: 'Sviluppo professionale continuo',
          items: [
            {
              english: 'Networking Community',
              italian: 'Comunità networking',
              pronunciation: '/kəˈmjuːnəti/',
              phonetic: 'ko-MIU-ne-ti',
              example:
                'In networking, the Networking Community shares knowledge generously. = La comunità networking condivide conoscenza generosamente.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'IETF',
              italian: 'IETF',
              pronunciation: '/aɪ iː tiː ef/',
              phonetic: 'AI-I-TI-EF',
              example:
                'In networking, IETF develops Internet standards. = IETF sviluppa standard Internet.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Internet Engineering Task Force.',
            },
            {
              english: 'RFC',
              italian: 'RFC',
              pronunciation: '/ɑːr ef siː/',
              phonetic: 'AR-EF-SI',
              example:
                'Before implementing a new protocol feature, engineers consult the relevant RFC to ensure their code complies with the IETF specification. = Prima di implementare una nuova funzionalita di protocollo, gli ingegneri consultano la RFC pertinente per assicurarsi che il codice sia conforme alla specifica IETF.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'NANOG',
              italian: 'NANOG',
              pronunciation: '/ˈneɪnɒɡ/',
              phonetic: 'NEI-nog',
              example:
                'By definition, NANOG is the North American operators group. = NANOG è il gruppo operatori nordamericani.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'RIPE',
              italian: 'RIPE',
              pronunciation: '/raɪp/',
              phonetic: 'RAIP',
              example:
                'By definition, RIPE is the European Internet community. = RIPE è la comunità Internet europea.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Réseaux IP Européens.',
            },
            {
              english: 'Home Lab',
              italian: 'laboratorio casalingo (home lab)',
              pronunciation: '/hoʊm læb/',
              phonetic: 'HOUM LAB',
              example:
                "In networking, a Home Lab speeds up learning. = Un home lab velocizza l'apprendimento.",
              context: 'foundations',
              difficulty: 'advanced',
              tool: 'EVE-NG, GNS3, Containerlab',
            },
            {
              english: 'Continuous Learning',
              italian: 'apprendimento continuo',
              pronunciation: '/kənˈtɪnjuəs/',
              phonetic: 'kon-TI-nius',
              example: `In a field that ships RFCs monthly, continuous learning through vendor blogs, conferences and open-source projects keeps engineers relevant. = In un settore che pubblica RFC ogni mese, l'apprendimento continuo tramite blog dei vendor, conferenze e progetti open source mantiene gli ingegneri al passo.`,
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Mentoring',
              italian: 'mentorato (mentoring)',
              pronunciation: '/ˈmentɔːrɪŋ/',
              phonetic: 'MEN-to-ring',
              example:
                'During operations, Mentoring helps grow the next generation. = Il mentoring aiuta a far crescere la prossima generazione.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Soft Skills',
              italian: 'competenze trasversali (soft skills)',
              pronunciation: '/sɒft skɪlz/',
              phonetic: 'SOFT-SKILS',
              example:
                'In networking, Soft Skills matter as much as technical ones. = Le soft skill contano quanto quelle tecniche.',
              context: 'foundations',
              difficulty: 'advanced',
            },
            {
              english: 'Networking',
              italian: 'Networking professionale',
              pronunciation: '/ˈnetwɜːrkɪŋ/',
              phonetic: 'NET-uer-king',
              example:
                'Professional networking opens career doors. = Il networking professionale apre porte di carriera.',
              context: 'foundations',
              difficulty: 'advanced',
              note: 'Stessa parola, due significati: rete tecnica e relazioni umane.',
            },
          ],
        },
      ],
    },
  },
};
