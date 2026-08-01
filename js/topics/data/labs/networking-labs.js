/**
 * NETWORKING LABS - Knowledge AIO
 * ==============================
 *
 * Declarative terminal-lab scripts for the networking topic, keyed by lesson.id.
 * Consumed by LabEngine as the applied beat inside a LessonV2 lesson.
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabEngine compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is matched
 * by goal (setState), not by exact string, and a wrong command never aborts.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints? }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 *
 * Addresses used here are documentation-only ranges (RFC 5737 198.51.100.0/24,
 * RFC 1918 private space) and the reserved example.com domain.
 */

export default {
  net_foundations_4: {
    title: 'Bring a new workstation onto the office network',
    intro:
      'Primo giorno alla nuova scrivania / First day at a new desk: the machine boots, but nothing reaches the network. Take an inventory of the hardware, wake the wired card up, and find out which router you go through.',
    cwd0: '/home/dev',
    vocab: ['NIC', 'Network Card', 'Cable', 'Access Point', 'Router'],
    requires: { eth0: 'up', link: 'detected', ap_scanned: true, router: 'known' },
    steps: [
      {
        id: 's1',
        promptEn: 'List every network card on this machine and read its operational state.',
        hintTerm: 'NIC',
        accept: [
          'ip link show',
          'ip link',
          'ip link list',
          'ip -br link show',
          'ip -br link',
          'ifconfig -a',
        ],
        acceptRe: [
          '^(sudo\\s+)?ip\\s+(-\\S+\\s+)*link(\\s+(show|list))?\\s*$',
          '^(sudo\\s+)?ifconfig\\s+-a\\s*$',
        ],
        stdout:
          '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000\n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n2: eth0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000\n    link/ether 3c:52:82:14:0b:9f brd ff:ff:ff:ff:ff:ff\n3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000\n    link/ether 8c:16:45:22:7d:e1 brd ff:ff:ff:ff:ff:ff',
        setState: { nics_listed: true },
        hints: [
          'Before configuring anything, ask the kernel which network cards exist and whether they are up.',
          'The `ip` tool has a `link` object for layer-2 devices: `ip link …`',
          'ip link show',
        ],
      },
      {
        id: 's2',
        promptEn: 'eth0 is DOWN. Bring the wired network card up.',
        hintTerm: 'Network Card',
        accept: [
          'sudo ip link set eth0 up',
          'ip link set eth0 up',
          'sudo ip link set dev eth0 up',
          'ip link set dev eth0 up',
          'sudo ifconfig eth0 up',
        ],
        acceptRe: [
          '^(sudo\\s+)?ip\\s+link\\s+set\\s+(dev\\s+)?eth0\\s+up\\s*$',
          '^(sudo\\s+)?ifconfig\\s+eth0\\s+up\\s*$',
        ],
        stdout:
          '[  412.884213] igc 0000:00:1f.6 eth0: NIC Link is Up 1000 Mbps Full Duplex, Flow Control: RX/TX',
        setState: { eth0: 'up' },
        hints: [
          'The card exists but its administrative state is down — you have to switch it on.',
          'Same tool as before, but you are writing instead of reading: `ip link set …`',
          'sudo ip link set eth0 up',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Confirm the cable is really seated: ask the driver for the negotiated speed and whether a link is detected on eth0.',
        hintTerm: 'Cable',
        accept: ['ethtool eth0', 'sudo ethtool eth0'],
        acceptRe: ['^(sudo\\s+)?ethtool\\s+eth0\\s*$'],
        stdout:
          'Settings for eth0:\n        Supported ports: [ TP ]\n        Supported link modes:   10baseT/Half 10baseT/Full\n                                100baseT/Half 100baseT/Full\n                                1000baseT/Full\n                                2500baseT/Full\n        Supports auto-negotiation: Yes\n        Link partner advertised link modes:  10baseT/Half 10baseT/Full\n                                             100baseT/Half 100baseT/Full\n                                             1000baseT/Full\n        Link partner advertised auto-negotiation: Yes\n        Speed: 1000Mb/s\n        Duplex: Full\n        Auto-negotiation: on\n        Port: Twisted Pair\n        Link detected: yes',
        setState: { link: 'detected' },
        hints: [
          'An interface can be UP in software and still have no copper on the other end of the RJ45.',
          'There is one tool dedicated to Ethernet driver settings — it starts with `eth…`',
          'ethtool eth0',
        ],
      },
      {
        id: 's4',
        promptEn:
          'The card can do 2.5G but the switch only advertises 1000baseT — the cable is fine. The desk also has Wi-Fi: scan with wlan0 and show the network names and signal strength of the access points around you.',
        hintTerm: 'Access Point',
        accept: [
          "iw dev wlan0 scan | grep -E 'SSID|signal'",
          'sudo iw dev wlan0 scan',
          'iw dev wlan0 scan',
          'iw wlan0 scan',
          'iwlist wlan0 scan',
          'nmcli dev wifi list',
        ],
        acceptRe: [
          '^(sudo\\s+)?iw\\s+(dev\\s+)?wlan0\\s+scan\\b',
          '^(sudo\\s+)?iwlist\\s+wlan0\\s+scan',
          '^(sudo\\s+)?nmcli\\s+dev(ice)?\\s+wifi\\s+(list|rescan)\\b',
        ],
        stdout:
          '        signal: -41.00 dBm\n        SSID: office-5g\n        signal: -58.00 dBm\n        SSID: office-guest\n        signal: -77.00 dBm\n        SSID: printer-direct',
        setState: { ap_scanned: true },
        hints: [
          'The wireless card can listen for the beacons that every access point broadcasts.',
          'The wireless equivalent of `ip` is `iw`: `iw dev wlan0 …`',
          "iw dev wlan0 scan | grep -E 'SSID|signal'",
        ],
      },
      {
        id: 's5',
        promptEn:
          'Last check: show which router this machine sends internet-bound traffic to by default.',
        hintTerm: 'Router',
        accept: [
          'ip route show default',
          'ip route show',
          'ip route list',
          'ip route',
          'ip r',
          'ip -4 route show default',
          'route -n',
        ],
        acceptRe: [
          '^(sudo\\s+)?ip\\s+(-4\\s+)?r(oute)?(\\s+(show|list|s))?(\\s+default)?\\s*$',
          '^(sudo\\s+)?route\\s+-n\\s*$',
          '^(sudo\\s+)?netstat\\s+-[a-z]*r[a-z]*\\s*$',
        ],
        stdout: 'default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.42 metric 100',
        setState: { router: 'known' },
        hints: [
          'Anything that is not on your own LAN leaves through one device — the default gateway.',
          'Ask the kernel for its routing table: `ip route …`',
          'ip route show default',
        ],
      },
    ],
  },

  net_osi_3: {
    title: 'Hunt down an MTU black hole',
    intro:
      'Gli utenti VPN dicono che i file grandi si bloccano / VPN users report that small requests work fine but large uploads to the file server behind the tunnel hang forever. That asymmetry is the signature of a path MTU problem: find where the packets stop fitting and fix it.',
    cwd0: '/home/dev',
    vocab: ['MTU', 'Fragmentation', 'Header', 'Payload', 'Frame Check Sequence'],
    requires: { pmtu: 1420, crc_clean: true, mtu_fixed: true, verified: true },
    steps: [
      {
        id: 's1',
        promptEn: 'Read the MTU currently configured on the tunnel-facing interface eth0.',
        hintTerm: 'MTU',
        accept: [
          'ip link show eth0',
          'ip link show dev eth0',
          'ip link list eth0',
          'ip -br link show eth0',
          'ifconfig eth0',
          'cat /sys/class/net/eth0/mtu',
        ],
        acceptRe: [
          '^(sudo\\s+)?ip\\s+(-\\S+\\s+)*link(\\s+(show|list))?\\s+(dev\\s+)?eth0\\s*$',
          '^(sudo\\s+)?ifconfig\\s+eth0\\s*$',
          '^cat\\s+/sys/class/net/eth0/mtu\\s*$',
        ],
        stdout:
          '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000\n    link/ether 3c:52:82:14:0b:9f brd ff:ff:ff:ff:ff:ff',
        setState: { mtu_read: true },
        hints: [
          'Start from what your own machine believes: the largest frame it will put on the wire.',
          'The value you want is printed by `ip link show <interface>`',
          'ip link show eth0',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Your side says 1500. Send one 1472-byte payload through the tunnel to the file server 10.0.5.20 with fragmentation forbidden, so the first router that cannot forward it has to report its own limit.',
        hintTerm: 'Fragmentation',
        accept: [
          'ping -M do -s 1472 -c 1 10.0.5.20',
          'ping -c 1 -M do -s 1472 10.0.5.20',
          'ping -M do -s 1472 10.0.5.20',
        ],
        acceptRe: ['^(sudo\\s+)?ping6?\\b(?=.*-m\\s*do)(?=.*-s\\s*1472).*10\\.0\\.5\\.20'],
        stdout:
          'PING 10.0.5.20 (10.0.5.20) 1472(1500) bytes of data.\nFrom 10.8.0.1 icmp_seq=1 Frag needed and DF set (mtu = 1420)\n\n--- 10.0.5.20 ping statistics ---\n1 packets transmitted, 0 received, +1 errors, 100% packet loss, time 0ms',
        setState: { pmtu: 1420 },
        hints: [
          'A 1472-byte payload plus the 20-byte IP header and the 8-byte ICMP header is exactly 1500 bytes. Send it and forbid fragmentation.',
          'ping can set the Do-not-Fragment bit and a payload size: `ping -M do -s … -c 1 <host>`',
          'ping -M do -s 1472 -c 1 10.0.5.20',
        ],
      },
      {
        id: 's3',
        promptEn:
          'The VPN gateway 10.8.0.1 answers that its tunnel only admits 1420. Before changing anything, rule out corrupted frames: pull the CRC error counters for eth0 out of the driver statistics.',
        hintTerm: 'Frame Check Sequence',
        accept: [
          'ethtool -S eth0 | grep -i crc',
          'sudo ethtool -S eth0 | grep -i crc',
          'ethtool -S eth0 | grep crc',
          'ethtool -S eth0',
        ],
        acceptRe: [
          '^(sudo\\s+)?ethtool\\s+-s\\s+eth0\\b',
          '^(sudo\\s+)?ethtool\\s+--statistics\\s+eth0\\b',
        ],
        stdout: '     rx_crc_errors: 0',
        setState: { crc_clean: true },
        hints: [
          'Every Ethernet frame carries a checksum in its trailer; the NIC counts the ones that fail it.',
          'ethtool can dump per-driver statistics with `-S`, then you filter for crc.',
          'ethtool -S eth0 | grep -i crc',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Zero CRC errors — the frames are intact, they are simply too big and the ICMP that says so is being dropped further along. Clamp eth0 to the path MTU you discovered.',
        hintTerm: 'MTU',
        accept: [
          'sudo ip link set eth0 mtu 1420',
          'ip link set eth0 mtu 1420',
          'sudo ip link set dev eth0 mtu 1420',
          'ip link set dev eth0 mtu 1420',
          'sudo ifconfig eth0 mtu 1420',
        ],
        acceptRe: [
          '^(sudo\\s+)?ip\\s+link\\s+set\\s+(dev\\s+)?eth0\\s+mtu\\s+1420\\s*$',
          '^(sudo\\s+)?ifconfig\\s+eth0\\s+mtu\\s+1420\\s*$',
        ],
        stdout: '[ 9821.113004] igc 0000:00:1f.6 eth0: changing MTU from 1500 to 1420',
        setState: { mtu_fixed: true },
        hints: [
          'If the path only accepts 1420 bytes, stop offering 1500 in the first place.',
          'Same write syntax as bringing a link up, with the `mtu` property: `ip link set eth0 mtu …`',
          'sudo ip link set eth0 mtu 1420',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Prove the whole path now agrees: trace the MTU hop by hop towards the file server 10.0.5.20.',
        hintTerm: 'MTU',
        accept: ['tracepath 10.0.5.20', 'tracepath -n 10.0.5.20', 'tracepath -b 10.0.5.20'],
        acceptRe: ['^(sudo\\s+)?tracepath6?\\s+(-\\S+\\s+)*10\\.0\\.5\\.20\\s*$'],
        stdout:
          ' 1?: [LOCALHOST]                      pmtu 1420\n 1:  10.8.0.1                                              1.492ms\n 1:  10.8.0.1                                              1.180ms\n 2:  10.0.5.20                                            18.204ms reached\n     Resume: pmtu 1420 hops 2 back 2',
        setState: { verified: true },
        hints: [
          'There is a tool whose entire job is discovering the MTU of each hop along a path.',
          'It is the MTU-aware cousin of traceroute: `trace…`',
          'tracepath 10.0.5.20',
        ],
      },
    ],
  },

  net_tcpip_3: {
    title: 'Verify a freshly deployed service, port by port',
    intro:
      "Hai appena messo online l'API di staging / You have just deployed the staging API behind nginx and you are logged in on the box. Before telling the frontend team it is live, walk the whole chain yourself: listening sockets, DNS, TCP, TLS, HTTP.",
    cwd0: '/srv/app',
    vocab: ['Listening Port', 'Port 53', 'Port 443', 'Port 80', 'Well-Known Port'],
    requires: {
      ports_listed: true,
      dns: 'resolved',
      p443: 'open',
      tls: 'verified',
      http: 'redirects',
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'List every TCP and UDP port this host is listening on, with numeric ports instead of service names.',
        hintTerm: 'Listening Port',
        accept: [
          'ss -tuln',
          'ss -tulnp',
          'sudo ss -tuln',
          'sudo ss -tulnp',
          'netstat -tuln',
          'netstat -tulnp',
        ],
        acceptRe: [
          '^(sudo\\s+)?ss\\s+-[a-z]*l[a-z]*\\s*$',
          '^(sudo\\s+)?netstat\\s+-[a-z]*l[a-z]*\\s*$',
        ],
        stdout:
          'Netid  State   Recv-Q  Send-Q     Local Address:Port     Peer Address:Port\nudp    UNCONN  0       0                0.0.0.0:68            0.0.0.0:*\ntcp    LISTEN  0       128              0.0.0.0:22            0.0.0.0:*\ntcp    LISTEN  0       511              0.0.0.0:80            0.0.0.0:*\ntcp    LISTEN  0       511              0.0.0.0:443           0.0.0.0:*\ntcp    LISTEN  0       4096           127.0.0.1:8080          0.0.0.0:*',
        setState: { ports_listed: true },
        hints: [
          'Ask the kernel which sockets are in the LISTEN state — that is the ground truth, not the config file.',
          'The modern replacement for netstat takes tcp, udp, listening and numeric flags: `ss -…`',
          'ss -tuln',
        ],
      },
      {
        id: 's2',
        promptEn:
          'nginx holds 80 and 443, and the app itself sits on 127.0.0.1:8080 behind it. Now check name resolution: ask the public resolver 8.8.8.8 on port 53 what staging.example.com points to, and print only the answer.',
        hintTerm: 'Port 53',
        accept: [
          'dig @8.8.8.8 staging.example.com +short',
          'dig staging.example.com +short',
          'dig @8.8.8.8 staging.example.com',
          'nslookup staging.example.com 8.8.8.8',
          'host staging.example.com 8.8.8.8',
        ],
        acceptRe: [
          '^(sudo\\s+)?dig\\b.*\\bstaging\\.example\\.com\\b',
          '^(sudo\\s+)?(nslookup|host)\\b.*\\bstaging\\.example\\.com\\b',
        ],
        stdout: 'staging-lb.example.com.\n198.51.100.24',
        setState: { dns: 'resolved' },
        hints: [
          'A service nobody can resolve is a service nobody can reach. Query DNS directly instead of trusting the browser cache.',
          'The standard DNS lookup tool lets you pick the server with @ and trim the output with +short.',
          'dig @8.8.8.8 staging.example.com +short',
        ],
      },
      {
        id: 's3',
        promptEn:
          'The name resolves through a CNAME to 198.51.100.24. Now test only the TCP layer: check that the HTTPS port of staging.example.com accepts a connection, without sending any data.',
        hintTerm: 'Port 443',
        accept: [
          'nc -zv staging.example.com 443',
          'nc -z -v staging.example.com 443',
          'nc -zv 198.51.100.24 443',
          'ncat -zv staging.example.com 443',
        ],
        acceptRe: [
          '^(sudo\\s+)?(nc|ncat|netcat)\\b.*\\b(staging\\.example\\.com|198\\.51\\.100\\.24)\\s+443\\s*$',
        ],
        stdout: 'Connection to staging.example.com (198.51.100.24) 443 port [tcp/https] succeeded!',
        setState: { p443: 'open' },
        hints: [
          'You only want to know whether the three-way handshake completes on the HTTPS well-known port.',
          'netcat can scan a single port and stay quiet about the payload: `nc -zv <host> <port>`',
          'nc -zv staging.example.com 443',
        ],
      },
      {
        id: 's4',
        promptEn:
          'TCP is fine. Open a real TLS session on port 443 and read back the certificate chain the server presents for staging.example.com.',
        hintTerm: 'Port 443',
        accept: [
          'openssl s_client -connect staging.example.com:443 -servername staging.example.com',
          'openssl s_client -connect staging.example.com:443',
        ],
        acceptRe: ['^(sudo\\s+)?openssl\\s+s_client\\b(?=.*staging\\.example\\.com)(?=.*443)'],
        stdout:
          'CONNECTED(00000003)\ndepth=2 C = US, O = Example CA, CN = Example CA Root X1\nverify return:1\ndepth=1 C = US, O = Example CA, CN = Example CA R3\nverify return:1\ndepth=0 CN = staging.example.com\nverify return:1\n---\nCertificate chain\n 0 s:CN = staging.example.com\n   i:C = US, O = Example CA, CN = Example CA R3\n 1 s:C = US, O = Example CA, CN = Example CA R3\n   i:C = US, O = Example CA, CN = Example CA Root X1\n---\nSSL handshake has read 4231 bytes and written 396 bytes\nVerification: OK\n---\nNew, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384',
        setState: { tls: 'verified' },
        hints: [
          'A port that answers is not the same as a port that presents a valid certificate for this name.',
          'The TLS client bundled with openssl connects to host:port and prints the chain: `openssl s_client -connect …`',
          'openssl s_client -connect staging.example.com:443 -servername staging.example.com',
        ],
      },
      {
        id: 's5',
        promptEn:
          'The chain verifies up to the root. Last check: confirm that plain port 80 serves no content of its own but redirects to HTTPS. Show the whole request and response exchange.',
        hintTerm: 'Port 80',
        accept: [
          'curl -v http://staging.example.com',
          'curl -v http://staging.example.com/',
          'curl -vI http://staging.example.com',
          'curl -v staging.example.com',
        ],
        acceptRe: ['^(sudo\\s+)?curl\\b(?!.*https://).*\\bstaging\\.example\\.com\\b'],
        stdout:
          '*   Trying 198.51.100.24:80...\n* Connected to staging.example.com (198.51.100.24) port 80\n> GET / HTTP/1.1\n> Host: staging.example.com\n> User-Agent: curl/8.5.0\n> Accept: */*\n>\n< HTTP/1.1 301 Moved Permanently\n< Server: nginx/1.24.0\n< Date: Mon, 03 Feb 2025 09:12:44 GMT\n< Content-Type: text/html\n< Content-Length: 169\n< Connection: keep-alive\n< Location: https://staging.example.com/\n<\n<html>\n<head><title>301 Moved Permanently</title></head>\n<body>\n<center><h1>301 Moved Permanently</h1></center>\n<hr><center>nginx/1.24.0</center>\n</body>\n</html>\n* Connection #0 to host staging.example.com left intact',
        setState: { http: 'redirects' },
        hints: [
          'Port 80 should exist only to push clients to port 443 — you need to see the status line and the Location header.',
          'curl prints the full exchange in verbose mode: `curl -v http://…`',
          'curl -v http://staging.example.com',
        ],
      },
    ],
  },

  net_tcpip_2: {
    title: 'Read a TCP handshake off the wire',
    intro:
      'Un collega dice che le connessioni cadono a caso / A teammate insists connections to the API drop at random. Stop guessing: capture the packets, read the TCP flags, and tell the difference between a refusal and a timeout.',
    cwd0: '/home/dev',
    vocab: ['Three-Way Handshake', 'SYN', 'SYN-ACK', 'ACK', 'RST', 'FIN'],
    requires: { iface: 'eth0', handshake: 'captured', rst_seen: true, fin_seen: true },
    steps: [
      {
        id: 's1',
        promptEn:
          'Before capturing anything, find out which interface the kernel uses to reach the API at 198.51.100.24.',
        accept: [
          'ip route get 198.51.100.24',
          'ip -4 route get 198.51.100.24',
          'ip r get 198.51.100.24',
        ],
        acceptRe: ['^(sudo\\s+)?ip\\s+(-4\\s+)?r(oute)?\\s+get\\s+198\\.51\\.100\\.24\\b'],
        stdout: '198.51.100.24 via 10.0.2.2 dev eth0 src 10.0.2.15 uid 1000\n    cache',
        setState: { iface: 'eth0' },
        hints: [
          'Capturing on the wrong interface shows you nothing. Ask the routing table which one this destination uses.',
          'The route subcommand can answer for one specific destination: `ip route get …`',
          'ip route get 198.51.100.24',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Capture up to twenty packets on eth0 that carry a SYN or an ACK flag, with no name or port resolution, and stop with Ctrl-C once you have watched one complete handshake.',
        hintTerm: 'Three-Way Handshake',
        accept: [
          "tcpdump -i eth0 -nn 'tcp[tcpflags] & (tcp-syn|tcp-ack) != 0' -c 20",
          "sudo tcpdump -i eth0 -nn 'tcp[tcpflags] & (tcp-syn|tcp-ack) != 0' -c 20",
        ],
        acceptRe: ['^(sudo\\s+)?tcpdump\\b(?=.*eth0)(?=.*tcp-syn)(?=.*tcp-ack)'],
        stdout:
          'tcpdump: verbose output suppressed, use -v[v]... for full protocol decode\nlistening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes\n09:41:02.114882 IP 10.0.2.15.54120 > 198.51.100.24.443: Flags [S], seq 1287465533, win 64240, options [mss 1460,sackOK,TS val 3312880 ecr 0,nop,wscale 7], length 0\n09:41:02.131004 IP 198.51.100.24.443 > 10.0.2.15.54120: Flags [S.], seq 991827344, ack 1287465534, win 65160, options [mss 1420,sackOK,TS val 771290 ecr 3312880,nop,wscale 7], length 0\n09:41:02.131077 IP 10.0.2.15.54120 > 198.51.100.24.443: Flags [.], ack 1, win 502, length 0\n^C\n3 packets captured\n3 packets received by filter\n0 packets dropped by kernel',
        setState: { handshake: 'captured' },
        hints: [
          'You want the three packets that open every connection: the request, the answer, and the confirmation.',
          "tcpdump takes an interface, -nn for numbers only, a tcpflags filter and a packet count: `tcpdump -i eth0 -nn '…' -c 20`",
          "tcpdump -i eth0 -nn 'tcp[tcpflags] & (tcp-syn|tcp-ack) != 0' -c 20",
        ],
      },
      {
        id: 's3',
        promptEn:
          'That handshake is textbook: [S], then [S.] acknowledging seq+1, then [.]. Now hunt the failures — capture ten packets on any interface that carry the RST flag.',
        hintTerm: 'RST',
        accept: [
          "tcpdump -i any -nn 'tcp[tcpflags] & tcp-rst != 0' -c 10",
          "sudo tcpdump -i any -nn 'tcp[tcpflags] & tcp-rst != 0' -c 10",
        ],
        acceptRe: ['^(sudo\\s+)?tcpdump\\b(?=.*tcp-rst)'],
        stdout:
          'tcpdump: verbose output suppressed, use -v[v]... for full protocol decode\nlistening on any, link-type LINUX_SLL2 (Linux cooked v2), snapshot length 262144 bytes\n09:43:18.569902 IP 198.51.100.24.8443 > 10.0.2.15.54388: Flags [R.], seq 0, ack 3982114772, win 0, length 0\n09:43:24.118447 IP 198.51.100.24.8443 > 10.0.2.15.54402: Flags [R.], seq 0, ack 2214508913, win 0, length 0\n^C\n2 packets captured\n2 packets received by filter\n0 packets dropped by kernel',
        setState: { rst_seen: true },
        hints: [
          'A connection that is actively refused is answered by one flag, not by silence.',
          'Same tcpdump shape as before, with a different flag in the filter: `tcp-…`',
          "tcpdump -i any -nn 'tcp[tcpflags] & tcp-rst != 0' -c 10",
        ],
      },
      {
        id: 's4',
        promptEn:
          'Both resets come from port 8443, which nobody listens on, and each one carries sequence number 0 — the signature of a kernel refusing a SYN. If the API were unreachable instead, sockets would pile up waiting for a SYN-ACK. List the TCP sockets in the SYN-SENT state.',
        hintTerm: 'SYN-ACK',
        accept: [
          'ss -tan state syn-sent',
          'sudo ss -tan state syn-sent',
          'ss -tn state syn-sent',
          'ss state syn-sent',
        ],
        acceptRe: ['^(sudo\\s+)?ss\\s+(-\\S+\\s+)*state\\s+syn-sent\\b'],
        stdout: 'Recv-Q Send-Q      Local Address:Port        Peer Address:Port',
        setState: { synsent: 'empty' },
        hints: [
          'A socket that sent a SYN and is still waiting for the answer sits in one specific state.',
          'ss can filter by TCP state: `ss -tan state …`',
          'ss -tan state syn-sent',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Empty — nothing is stuck waiting, so this is a refusal, not a timeout. Finish by watching a healthy close: capture ten packets on any interface carrying the FIN flag. Expect one from each side; the bare ACK that ends the exchange has no FIN, so this filter will not show it.',
        hintTerm: 'FIN',
        accept: [
          "tcpdump -i any -nn 'tcp[tcpflags] & tcp-fin != 0' -c 10",
          "sudo tcpdump -i any -nn 'tcp[tcpflags] & tcp-fin != 0' -c 10",
        ],
        acceptRe: ['^(sudo\\s+)?tcpdump\\b(?=.*tcp-fin)'],
        stdout:
          'tcpdump: verbose output suppressed, use -v[v]... for full protocol decode\nlistening on any, link-type LINUX_SLL2 (Linux cooked v2), snapshot length 262144 bytes\n09:47:55.410221 IP 10.0.2.15.54120 > 198.51.100.24.443: Flags [F.], seq 1287466050, ack 991831725, win 501, length 0\n09:47:55.427880 IP 198.51.100.24.443 > 10.0.2.15.54120: Flags [F.], seq 991831725, ack 1287466051, win 509, length 0\n^C\n2 packets captured\n2 packets received by filter\n0 packets dropped by kernel',
        setState: { fin_seen: true },
        hints: [
          'An orderly shutdown is negotiated with a flag too — the polite opposite of a reset.',
          'Same capture command, third flag: `tcp-…`',
          "tcpdump -i any -nn 'tcp[tcpflags] & tcp-fin != 0' -c 10",
        ],
      },
    ],
  },
};
