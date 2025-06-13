import { Question } from '@/types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    question: "In nonpersistent CSMA, when a station finds the channel busy it:",
    options: {
      A: "immediately sends the frame on a secondary channel",
      B: "listens until the channel is free and then transmits",
      C: "waits for a random time interval and then transmits the frame",
      D: "listens again after a random time interval"
    },
    correctAnswer: "D",
    explanation: "In nonpersistent CSMA, the station defers transmission for a random backoff time after detecting a busy channel, reducing the likelihood of collisions.",
    category: "Network Access Control",
    difficulty: "medium"
  },
  {
    id: 2,
    question: "Which of the following technologies is not used for access networks?",
    options: {
      A: "DSL",
      B: "SONET",
      C: "PON",
      D: "LTE"
    },
    correctAnswer: "B",
    explanation: "SONET is typically used for longdistance and backbone telecommunications rather than lastmile access.",
    category: "Network Technologies",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "In a WiFi network, the use of RTS/CTS frames:",
    options: {
      A: "enables retransmission after a collision",
      B: "signals a collision to other stations",
      C: "diminishes the probability of collisions",
      D: "eliminates collisions completely"
    },
    correctAnswer: "C",
    explanation: "RTS/CTS frames help reserve the medium before transmitting data, reducing the probability of collisions (though they do not eliminate them entirely).",
    category: "Network Access Control",
    difficulty: "medium"
  },
  {
    id: 4,
    question: "Which of these statements about UDP is true?",
    options: {
      A: "The receiver guarantees flow control by reducing the transmission window",
      B: "The receiver automatically requests retransmission if the checksum is incorrect",
      C: "The receiver verifies data integrity using the checksum",
      D: "The receiver reorders segments before delivering them to the application"
    },
    correctAnswer: "C",
    explanation: "UDP includes a checksum that allows the receiver to verify whether the data was corrupted during transit.",
    category: "Transport Layer",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "Bluetooth is a technology that is:",
    options: {
      A: "exclusively used for file transfer between computers",
      B: "based on frequency hopping spread spectrum in the ISM band for longrange broadband radio communication between phones",
      C: "limited to line-of-sight communication only",
      D: "based on frequency hopping spread spectrum in the ISM band for shortrange communication between devices organized by a master node in a star topology"
    },
    correctAnswer: "D",
    explanation: "Bluetooth uses frequency hopping spread spectrum in the ISM band and organizes devices in a star topology (master/slave).",
    category: "Wireless Networks",
    difficulty: "medium"
  },
  {
    id: 7,
    question: "A datagram forwarded from a home network through a NATcapable router – which statement is certainly false?",
    options: {
      A: "The destination IP address fields differ between incoming and outgoing datagrams",
      B: "The TTL fields differ between incoming and outgoing datagrams",
      C: "The source port fields differ between incoming and outgoing datagrams",
      D: "The source IP address fields differ between incoming and outgoing datagrams"
    },
    correctAnswer: "B",
    explanation: "While NAT modifies IP addresses (and often source ports), it does not change the TTL field.",
    category: "IP Addressing",
    difficulty: "easy"
  },
  {
    id: 8,
    question: "A UTP cable and an optical fiber:",
    options: {
      A: "can both be used in transoceanic links",
      B: "are used in passive bus topologies",
      C: "can both be used in access networks",
      D: "achieve comparable bit rates"
    },
    correctAnswer: "C",
    explanation: "Although they differ in cost, installation, and maximum distance, both UTP cables and optical fibers are commonly used in access networks.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 10,
    question: "What is the purpose of the playout buffer in multimedia streaming?",
    options: {
      A: "To manage the retransmission window for multimedia content",
      B: "To compensate for network delay variations (jitter)",
      C: "To provide quicker local access via caching",
      D: "To avoid network congestion"
    },
    correctAnswer: "B",
    explanation: "The playout buffer temporarily stores received data to smooth out variations in packet arrival times (jitter), ensuring smooth playback.",
    category: "Network Technologies",
    difficulty: "easy"
  },
  {
    id: 11,
    question: "The increased complexity of the GoBackN protocol compared to StopandWait is mainly due to:",
    options: {
      A: "timeout management at the receiver",
      B: "greater receiver complexity",
      C: "greater transmitter complexity",
      D: "increased complexity at both transmitter and receiver"
    },
    correctAnswer: "C",
    explanation: "In GoBackN, the transmitter must manage a sliding window and handle multiple outstanding frames, which adds complexity compared to the single-frame StopandWait method.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 12,
    question: "One advantage of using piggybacking in sliding window protocols is:",
    options: {
      A: "increasing the transmission window size",
      B: "acknowledging several data units with one message",
      C: "transmitting data units outside the transmission window",
      D: "reducing the percentage of control information transferred"
    },
    correctAnswer: "D",
    explanation: "Piggybacking allows acknowledgments to be sent along with data frames, thereby reducing the overhead associated with sending separate control messages.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 13,
    question: "A host sends a 2200byte file using PDUs of 900 bytes with a 100byte PCI over a 4 Mbit/s link. How long is the transmission of the last PDU?",
    options: {
      A: "1.0 ms",
      B: "1.4 ms",
      C: "5.0 ms",
      D: "1.8 ms"
    },
    correctAnswer: "B",
    explanation: "Based on the given link speed and the size of the last PDU (which may be smaller than the full 800byte payload plus PCI), the transmission time calculates to approximately 1.4 ms.",
    category: "Network Technologies",
    difficulty: "hard"
  },
  {
    id: 23,
    question: "Moving from classful to classless IP addressing offers what advantage?",
    options: {
      A: "the possibility to use IP multicast addresses",
      B: "a considerable increase in the total number of available IP addresses",
      C: "an increase in data transmission speed",
      D: "a more rational and optimized address allocation"
    },
    correctAnswer: "D",
    explanation: "Classless addressing (CIDR) enables more efficient and flexible allocation of IP addresses, optimizing the address space.",
    category: "IP Addressing",
    difficulty: "medium"
  },
  {
    id: 24,
    question: "Including a single parity bit in a frame guarantees that the receiver can:",
    options: {
      A: "detect and correct a single flipped bit",
      B: "detect an odd number of flipped bits",
      C: "detect any number of flipped bits",
      D: "detect an even number of flipped bits"
    },
    correctAnswer: "B",
    explanation: "A parity bit can detect any odd number of bit errors (flipped bits) in the data, though it cannot correct them.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 25,
    question: "Despite being an older technology, GSM is still used because it:",
    options: {
      A: "provides more efficient data transmission than LTE or 5G",
      B: "is the only cellular network capable of carrying audio",
      C: "offers better audio quality than LTE or 5G",
      D: "efficiently carries voice, saving bandwidth for data"
    },
    correctAnswer: "D",
    explanation: "GSM is optimized for voice communication, which allows it to conserve bandwidth for data services.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 26,
    question: "Which statement about Web cookies is false?",
    options: {
      A: "The HTTP server creates a cookie when a browser first accesses it",
      B: "The browser creates a new cookie each time it accesses the same server",
      C: "Cookies can be used to track user sessions",
      D: "The cookie is stored on the client's file system"
    },
    correctAnswer: "B",
    explanation: "Cookies are created and sent by the server. The browser does not generate a new cookie for every access to the same server.",
    category: "Application Layer",
    difficulty: "easy"
  },
  {
    id: 27,
    question: "In TCP and UDP, the source and destination port fields are used to:",
    options: {
      A: "indicate which physical Ethernet interface is used",
      B: "manage router resource allocation",
      C: "indicate the network interface for IP packet forwarding",
      D: "implement multiplexing/demultiplexing for processes on hosts"
    },
    correctAnswer: "D",
    explanation: "Port numbers allow the receiving host to deliver data to the correct application process among several that may be running concurrently.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 28,
    question: "In CSMA and CSMA/CD, the term 'persistence' refers to:",
    options: {
      A: "how a station behaves when the channel is sensed busy",
      B: "the duration two overlapping transmissions last",
      C: "the method used for retransmission after a collision",
      D: "the period a station is allowed to occupy the channel"
    },
    correctAnswer: "A",
    explanation: "'Persistence' describes the strategy that a station uses to decide when to transmit if the channel is busy.",
    category: "Network Access Control",
    difficulty: "medium"
  },
  {
    id: 30,
    question: "With a subnet mask of 255.255.255.128, how many usable host addresses are available?",
    options: {
      A: "64",
      B: "255",
      C: "254",
      D: "126"
    },
    correctAnswer: "D",
    explanation: "A /25 subnet (255.255.255.128) provides 2⁷ – 2 = 126 usable host addresses.",
    category: "IP Addressing",
    difficulty: "hard"
  },
  {
    id: 31,
    question: "In a tree topology with 5 nodes and 4 links, if you add a link between two nodes not directly connected, the topology:",
    options: {
      A: "remains a tree topology",
      B: "becomes a fully meshed topology",
      C: "becomes a ring topology",
      D: "becomes a star topology"
    },
    correctAnswer: "C",
    explanation: "Adding one extra link to a tree introduces a cycle. In many exam contexts, this is referred to as a ring topology even though not every node forms a simple ring.",
    category: "Network Topologies",
    difficulty: "medium"
  },
  {
    id: 32,
    question: "A router performing Network Address Translation (NAT) associates internal and external addresses using:",
    options: {
      A: "the IP addresses directly, without modification",
      B: "a combination of IP address and port number",
      C: "the RTP protocol",
      D: "a congestion protocol"
    },
    correctAnswer: "B",
    explanation: "NAT uses the combination of an IP address and a port number to uniquely map internal hosts to external addresses.",
    category: "IP Addressing",
    difficulty: "medium"
  },
  {
    id: 33,
    question: "The minimum packet size in Ethernet's CSMA/CD is required to:",
    options: {
      A: "maximize throughput",
      B: "be independent of the network's physical length",
      C: "ensure collision detection",
      D: "avoid multiple consecutive collisions"
    },
    correctAnswer: "C",
    explanation: "The minimum frame size ensures that a station is still transmitting long enough to detect a collision on the network.",
    category: "Network Access Control",
    difficulty: "medium"
  },
  {
    id: 34,
    question: "The DHCP discover message is sent using which IP destination address?",
    options: {
      A: "127.0.0.1",
      B: "0.0.0.0",
      C: "255.255.255.255 (limited broadcast)",
      D: "The DHCP server's IP address"
    },
    correctAnswer: "C",
    explanation: "DHCP Discover messages are broadcast to 255.255.255.255 so that any available DHCP server on the local network can respond.",
    category: "IP Addressing",
    difficulty: "easy"
  },
  {
    id: 36,
    question: "A transmitter sends PDUs using Selective Repeat (with a window size of 5, starting at 1). After transmitting PDUs 1–7, it receives a cumulative ACK for 5. What can be assumed about PDU 6?",
    options: {
      A: "Its reception status is unknown",
      B: "It must be retransmitted because it wasn't stored at the receiver",
      C: "It must not be retransmitted because it was stored",
      D: "It has definitely not been received"
    },
    correctAnswer: "A",
    explanation: "A cumulative ACK for 5 confirms receipt of PDUs 1–5 only; nothing is known about PDU 6.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 37,
    question: "TCP flow control is implemented by:",
    options: {
      A: "working only in some cases",
      B: "the sender's autonomous decision based on missing segments",
      C: "information included in segments sent from the receiver",
      D: "error control via the checksum"
    },
    correctAnswer: "C",
    explanation: "In TCP, the receiver advertises its available buffer space in every segment, which the sender uses to control the flow of data.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 39,
    question: "At the beginning of a TCP connection, the congestion window is:",
    options: {
      A: "negotiated to equal the maximum receive window",
      B: "negotiated to half the receive window",
      C: "randomly selected during setup",
      D: "set equal to one Maximum Segment Size (MSS)"
    },
    correctAnswer: "D",
    explanation: "TCP starts with a small congestion window (typically one MSS) during slow start to avoid overwhelming the network.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 41,
    question: "Which of the following about DNS is true?",
    options: {
      A: "It exclusively uses TCP for all queries",
      B: "It is based on a single centralized server",
      C: "It typically uses UDP for queries",
      D: "It is based on a flat, nonhierarchical network of equivalent servers"
    },
    correctAnswer: "C",
    explanation: "DNS typically uses UDP for name resolution because of its lower overhead and speed.",
    category: "Transport Layer",
    difficulty: "easy"
  },
  {
    id: 42,
    question: "A switch starts receiving a packet at t = 5 ms and finishes at t = 15 ms. If the output link is onethird the speed of the input, when is the packet completely forwarded?",
    options: {
      A: "It depends on propagation delay",
      B: "t = 45 ms",
      C: "t = 60 ms",
      D: "t = 30 ms"
    },
    correctAnswer: "B",
    explanation: "The packet takes 10 ms to be received; at onethird the speed, forwarding takes 3×10 ms = 30 ms. Thus, the total time is 15 + 30 = 45 ms.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 44,
    question: "By adding a bidirectional link between two nodes in a tree topology, the resulting topology:",
    options: {
      A: "always becomes a ring topology",
      B: "includes a cycle",
      C: "may become a star topology, depending on the nodes",
      D: "remains a tree topology"
    },
    correctAnswer: "B",
    explanation: "A tree is acyclic; adding an extra link creates a cycle.",
    category: "Network Topologies",
    difficulty: "medium"
  },
  {
    id: 45,
    question: "Which statement about NAT is true?",
    options: {
      A: "It allows multiple internal hosts to share a single public IP address",
      B: "It requires a unique public IP for each internal host",
      C: "It only works with IPv6 addresses",
      D: "Port forwarding is always required for internal hosts to access the Internet"
    },
    correctAnswer: "A",
    explanation: "NAT maps internal addresses and ports to an external IP/port pair, enabling many hosts to share one public IP address.",
    category: "IP Addressing",
    difficulty: "easy"
  },
  {
    id: 46,
    question: "Class C IPv4 addresses are characterized by:",
    options: {
      A: "a few networks with many hosts",
      B: "support for multicast communications",
      C: "support for broadcast communications",
      D: "many networks with few hosts"
    },
    correctAnswer: "D",
    explanation: "Class C addresses allow for many small networks, each with a limited number of hosts.",
    category: "IP Addressing",
    difficulty: "medium"
  },
  {
    id: 47,
    question: "Port numbers used for multiplexing/demultiplexing are found in:",
    options: {
      A: "the IP header only",
      B: "the Ethernet header only",
      C: "both TCP and UDP headers",
      D: "the application layer header"
    },
    correctAnswer: "C",
    explanation: "Both TCP and UDP include port numbers to direct data to the correct application processes.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 48,
    question: "ARP (Address Resolution Protocol) allows a device to:",
    options: {
      A: "obtain a host's domain name given its IP address",
      B: "send error messages among routers",
      C: "obtain a host's IP address given its domain name",
      D: "obtain the MAC address corresponding to an IP address"
    },
    correctAnswer: "D",
    explanation: "ARP translates an IP address into its corresponding MAC (hardware) address on a local network.",
    category: "IP Addressing",
    difficulty: "medium"
  },
  {
    id: 50,
    question: "The Internet transport layer provides reliable data transfer when:",
    options: {
      A: "it always provides reliability",
      B: "the application requests UDP",
      C: "it only provides unreliable transfer",
      D: "the application requests TCP"
    },
    correctAnswer: "D",
    explanation: "TCP ensures reliable, ordered delivery of data, whereas UDP does not guarantee reliability.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 51,
    question: "In a Selective Repeat protocol with a receiver window of 2 (initially expecting sequence numbers 0 and 1), which reception order does not cause a discard?",
    options: {
      A: "2, 0, 1, 3",
      B: "0, 2, 3, 1",
      C: "0, 3, 1, 2",
      D: "1, 0, 3, 2"
    },
    correctAnswer: "D",
    explanation: "In this order, all received PDUs fall within the receiver's window, so no PDU is discarded.",
    category: "Transport Layer",
    difficulty: "easy"
  },
  {
    id: 52,
    question: "Bluetooth is a technology that is:",
    options: {
      A: "based on frequency hopping in the ISM band for shortrange communication between devices organized by a master node",
      B: "based on direct sequence spread spectrum for high-speed data transfer",
      C: "limited to audio communication only",
      D: "based on frequency hopping in the ISM band for longrange broadband communication"
    },
    correctAnswer: "A",
    explanation: "This is equivalent to the answer given in question 5; Bluetooth uses frequency hopping in the ISM band with a master/slave (star) configuration.",
    category: "Wireless Networks",
    difficulty: "medium"
  },
  {
    id: 53,
    question: "Considering only standard features of an IP router, which claim is true?",
    options: {
      A: "It always modifies both source and destination IP addresses",
      B: "It modifies at least one IP address in the packet it forwards",
      C: "It modifies the frame header but not the IP addresses",
      D: "It never modifies any addresses"
    },
    correctAnswer: "C",
    explanation: "When a router forwards a packet, it updates the frame header (MAC addresses) but does not change the IP addresses (unless NAT is performed).",
    category: "IP Addressing",
    difficulty: "easy"
  },
  {
    id: 54,
    question: "Given any topology with associated costs, the optimal path between a source and a destination:",
    options: {
      A: "changes depending on which node runs the algorithm",
      B: "is the same whether a link state or distance vector algorithm is used",
      C: "never changes even if channel costs change",
      D: "never changes even if a channel becomes unavailable"
    },
    correctAnswer: "B",
    explanation: "Both link state and distance vector algorithms will determine the same optimal path provided the cost information is accurate.",
    category: "Routing",
    difficulty: "medium"
  },
  {
    id: 55,
    question: "In cellular networks, 'roaming' means that a mobile device:",
    options: {
      A: "is in an area where multiple cells overlap",
      B: "moves quickly from cell to cell",
      C: "maintains its connection when moving into an adjacent cell",
      D: "can be called regardless of which cell it is in"
    },
    correctAnswer: "C",
    explanation: "Roaming allows a mobile device to keep its connection active as it moves from one cell's coverage area to another.",
    category: "Wireless Networks",
    difficulty: "medium"
  },
  {
    id: 56,
    question: "A host sends a 3000byte file using PDUs composed of a 700byte SDU and a 100byte PCI over a 1 Mb/s link. The transmission time of the last PDU is:",
    options: {
      A: "2.4 ms",
      B: "0.3 ms",
      C: "6.4 ms",
      D: "1.2 ms"
    },
    correctAnswer: "A",
    explanation: "Based on the calculation provided, the last (smaller) PDU takes about 2.4 ms to transmit over a 1 Mb/s link.",
    category: "Network Technologies",
    difficulty: "hard"
  },
  {
    id: 57,
    question: "A transmitter sends 6 PDUs using GoBackN with a window size of 4 (numbering starting from 1). After transmitting PDUs 1–3, it receives a cumulative ACK for 2 and no further ACKs will arrive. Which action may be executed before timeout?",
    options: {
      A: "Transmit PDU 6",
      B: "Transmit PDUs 4 and 5",
      C: "Retransmit PDU 3",
      D: "Take no action"
    },
    correctAnswer: "B",
    explanation: "A cumulative ACK for 2 shifts the transmission window so that the sender can transmit PDUs 4 and 5 while waiting on further ACKs for the unacknowledged frames.",
    category: "Transport Layer",
    difficulty: "easy"
  },
  {
    id: 58,
    question: "The Domain Name System (DNS) allows an application to:",
    options: {
      A: "learn the physical location of a host",
      B: "perform a mapping between (3)-addresses and (2)-addresses",
      C: "assign a host its Ethernet address based on its IP address",
      D: "find the IP address corresponding to a website's name"
    },
    correctAnswer: "D",
    explanation: "DNS functions as the 'phone book' of the Internet, mapping domain names to IP addresses.",
    category: "Application Layer",
    difficulty: "medium"
  },
  {
    id: 59,
    question: "The maximum transmission bit rate in current WiFi networks is on the order of:",
    options: {
      A: "tens of Tbit/s",
      B: "a few Gbit/s",
      C: "some tens of Mbit/s",
      D: "hundreds of Gbit/s"
    },
    correctAnswer: "B",
    explanation: "Modern WiFi standards (such as 802.11ax) can achieve speeds on the order of a few gigabits per second.",
    category: "Wireless Networks",
    difficulty: "hard"
  },
  {
    id: 60,
    question: "A DHCP server deployed in a local area network provides:",
    options: {
      A: "an email service for local message forwarding",
      B: "IP configuration to any Internet host that requests one",
      C: "name resolution for local hosts",
      D: "IP configuration to hosts on the local network"
    },
    correctAnswer: "D",
    explanation: "A DHCP server dynamically assigns IP addresses and other network configuration parameters to devices on a LAN.",
    category: "Application Layer",
    difficulty: "medium"
  },
  {
    id: 61,
    question: "Which of the following parameters is not provided by a DHCP server?",
    options: {
      A: "Subnet mask",
      B: "Default gateway",
      C: "DNS server address",
      D: "Round-trip time (RTT)"
    },
    correctAnswer: "D",
    explanation: "DHCP servers provide network configuration (IP address, subnet mask, default gateway, etc.) but not performance metrics like RTT.",
    category: "IP Addressing",
    difficulty: "easy"
  },
  {
    id: 62,
    question: "A UTP cable and an optical fiber:",
    options: {
      A: "can both be used in transoceanic links",
      B: "can both be used in access networks",
      C: "achieve comparable bit rates",
      D: "are used in passive bus topologies"
    },
    correctAnswer: "B",
    explanation: "Both UTP cables and optical fibers are commonly used in access networks; optical fibers are typically preferred for higher speeds and longer distances.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 63,
    question: "To avoid ambiguities in the interpretation of cumulative ACKs, the window size of a transmitter using a GoBackN protocol with 4bit long sequence numbers must be:",
    options: {
      A: "smaller or equal to 16",
      B: "greater than 16",
      C: "equal to 16",
      D: "strictly smaller than 16"
    },
    correctAnswer: "D",
    explanation: "With 4bit sequence numbers there are 16 distinct values (0–15). To prevent ambiguity when the sequence numbers wrap around, the sender's window must be strictly smaller than the sequence number space.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 64,
    question: "Consider a LAN using Ethernet switches. Which of the following claims is false?",
    options: {
      A: "Switches introduce additional delays in transmissions between hosts on different segments.",
      B: "Switches can implement VLANs to logically segment the network.",
      C: "Hosts need to be reconfigured when connecting to a different switch port.",
      D: "Switches separate collision domains in the network."
    },
    correctAnswer: "C",
    explanation: "Hosts do not need reconfiguration; switching and VLAN functions are entirely managed by the switches.",
    category: "Network Technologies",
    difficulty: "easy"
  },
  {
    id: 66,
    question: "Which of the following protocols does not perform delimitation functions of the data units?",
    options: {
      A: "HDLC (High-level Data Link Control)",
      B: "Ethernet",
      C: "PPP (PointtoPoint Protocol)",
      D: "IEEE 802.2 LLC"
    },
    correctAnswer: "D",
    explanation: "IEEE 802.2 LLC relies on the underlying MAC layer for framing/delimitation, whereas the others incorporate explicit framing.",
    category: "Network Access Control",
    difficulty: "easy"
  },
  {
    id: 67,
    question: "In StoreandForward packetswitched networks, using larger PDUs:",
    options: {
      A: "decreases the probability of bit errors",
      B: "minimizes transfer delay by reducing overhead",
      C: "requires a larger header for data management",
      D: "increases store-and-forward delay at each node"
    },
    correctAnswer: "D",
    explanation: "Larger PDUs lead to higher storeandforward delays since every node must wait to receive the full packet before retransmitting.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 68,
    question: "Which feature is made possible by the storeandforward operation in a packet network?",
    options: {
      A: "Connecting channels with different transmission speeds",
      B: "Reducing overall transfer delay through a switch",
      C: "Eliminating the need for buffering",
      D: "Preventing packet loss completely"
    },
    correctAnswer: "A",
    explanation: "Storeandforward switching buffers entire packets, allowing a switch to bridge channels with differing transmission speeds.",
    category: "Network Technologies",
    difficulty: "easy"
  },
  {
    id: 69,
    question: "The Domain Name System (DNS):",
    options: {
      A: "assigns an Ethernet address to a host based on its IP address",
      B: "maps (network layer) addresses to (data link) addresses",
      C: "allows an application to obtain the IP address of a website given its domain name",
      D: "reveals the physical location of an Internet host"
    },
    correctAnswer: "C",
    explanation: "DNS is used to translate domain names into their corresponding IP addresses.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 70,
    question: "The piggybacking technique in window protocols allows:",
    options: {
      A: "retransmission of erroraffected data units",
      B: "concatenation of multiple acknowledgments in a data unit",
      C: "reducing control overhead by combining data and acknowledgments",
      D: "explicit reporting of lost data units by the receiver"
    },
    correctAnswer: "C",
    explanation: "Piggybacking combines data and acknowledgment information in the same frame, reducing control overhead.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 71,
    question: "An Ethernet card in a switch processes (reads and decides on forwarding):",
    options: {
      A: "only packets with its MAC address as destination",
      B: "all packets received on its interfaces",
      C: "only packets addressed unicast to the switch",
      D: "only broadcast and multicast packets"
    },
    correctAnswer: "B",
    explanation: "A switch processes every received frame to learn addresses and determine the correct forwarding action.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 72,
    question: "The IP protocol:",
    options: {
      A: "guarantees error detection only on the datagram header",
      B: "guarantees error detection on both header and payload",
      C: "provides no error protection",
      D: "guarantees error detection only on the payload"
    },
    correctAnswer: "A",
    explanation: "IP uses a checksum to protect only the header—not the data payload—from errors.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 73,
    question: "In a fully connected mesh topology with N nodes, the number of bidirectional channels is:",
    options: {
      A: "N(N – 1)/2",
      B: "2N",
      C: "N – 1",
      D: "Not defined"
    },
    correctAnswer: "A",
    explanation: "In a complete graph, each of the N nodes is connected to every other node; the number of unique bidirectional links is N(N – 1)/2.",
    category: "Network Topologies",
    difficulty: "medium"
  },
  {
    id: 74,
    question: "The DSL access network separates data and voice on the same transmission medium using:",
    options: {
      A: "time multiplexing",
      B: "frequency division",
      C: "time division multiple access",
      D: "frequency multiplexing"
    },
    correctAnswer: "D",
    explanation: "DSL uses frequency multiplexing (via filters) to separate voice (low frequency) and data (high frequency) on the same line.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 75,
    question: "The StopandWait protocol:",
    options: {
      A: "can only work using more than one numbering bit",
      B: "can work using any number of numbering bits greater than or equal to 1",
      C: "can work using a single numbering bit",
      D: "can only work using fewer numbering bits than the window size"
    },
    correctAnswer: "C",
    explanation: "In StopandWait ARQ only one frame is outstanding at any time, so a 1bit sequence number (alternating 0 and 1) is sufficient.",
    category: "Wireless Networks",
    difficulty: "medium"
  },
  {
    id: 76,
    question: "In a tree topology with N nodes, the number of bidirectional channels is:",
    options: {
      A: "N",
      B: "N – 1",
      C: "2N",
      D: "N(N – 1)/2"
    },
    correctAnswer: "B",
    explanation: "A tree topology is an acyclic connected graph and always has exactly N – 1 links.",
    category: "Network Topologies",
    difficulty: "medium"
  },
  {
    id: 77,
    question: "The transport layer on the Internet:",
    options: {
      B: "only provides unreliable transport",
      C: "always provides reliable transport"
    },
    correctAnswer: "D",
    explanation: "TCP is designed for reliable, inorder delivery, whereas UDP provides besteffort, unreliable service.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 78,
    question: "The SMTP protocol:",
    options: {
      B: "always includes encrypted authentication",
      C: "is used for delivering outgoing emails from a client to a mail server",
      D: "is used to transfer emails from a server to a client"
    },
    correctAnswer: "C",
    explanation: "SMTP (Simple Mail Transfer Protocol) is used to send emails from a client to a server.",
    category: "Application Layer",
    difficulty: "medium"
  },
  {
    id: 79,
    question: "Which of the following statements about VoIP is false?",
    options: {
      A: "RTP can be used for audiovideo data transfer.",
      B: "RTP provides mechanisms to ensure realtime data delivery.",
      C: "SIP can be used to initiate and terminate a session.",
      D: "SIP provides mechanisms to determine the callee's address."
    },
    correctAnswer: "B",
    explanation: "While RTP includes timing and sequence information for realtime streams, it does not guarantee delivery; it simply supports realtime transmission.",
    category: "Transport Layer",
    difficulty: "easy"
  },
  {
    id: 80,
    question: "The IP protocol:",
    options: {
      A: "implements the transport layer",
      B: "enhances network scalability via address aggregation",
      C: "is not used in local networks",
      D: "provides mechanisms for accessing a shared medium"
    },
    correctAnswer: "B",
    explanation: "IP's hierarchical addressing (CIDR) enables aggregation, which in turn enhances the scalability of large networks.",
    category: "IP Addressing",
    difficulty: "medium"
  },
  {
    id: 81,
    question: "A link state routing algorithm works by:",
    options: {
      A: "having each node communicate the cost of its links to all other nodes",
      B: "having each node generate its routing table and share it only with neighbours",
      C: "having each node send cost and direction information to neighbours for every destination",
      D: "having each node compute its routing table and then flood the network with the results"
    },
    correctAnswer: "A",
    explanation: "In link state routing, each node communicates the cost of its links to all other nodes in the network through flooding.",
    category: "Routing",
    difficulty: "medium"
  },
  {
    id: 82,
    question: "The MIME protocol allows:",
    options: {
      A: "data to be encoded in various formats within an email message",
      B: "reservation of network resources for multimedia email delivery",
      C: "transmission of quality monitoring information",
      D: "control of media playback in downloaded files"
    },
    correctAnswer: "A",
    explanation: "MIME (Multipurpose Internet Mail Extensions) enables email messages to carry data (e.g., images, audio, video) encoded in various formats.",
    category: "Application Layer",
    difficulty: "medium"
  },
  {
    id: 83,
    question: "Which line encoding requires a higher bitrate on the physical medium?",
    options: {
      A: "4B/5B",
      B: "Manchester",
      C: "NRZ",
      D: "Unipolar"
    },
    correctAnswer: "B",
    explanation: "Manchester encoding requires a transition for every bit, effectively doubling the bitrate compared to NRZ schemes.",
    category: "Network Technologies",
    difficulty: "easy"
  },
  {
    id: 85,
    question: "The transport layer in the Internet:",
    options: {
      A: "always provides reliable transport",
      B: "only provides unreliable transport",
      C: "provides both reliable and unreliable transport options",
      D: "provides reliable transport when using TCP"
    },
    correctAnswer: "D",
    explanation: "TCP is responsible for reliable transport, while UDP does not include reliability mechanisms.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 86,
    question: "The TCP protocol:",
    options: {
      A: "assigns sequence numbers only to acknowledgments",
      B: "does not use sequence numbers",
      C: "assigns sequence numbers to both segments and acknowledgments",
      D: "assigns sequence numbers only to segments"
    },
    correctAnswer: "C",
    explanation: "TCP assigns sequence numbers to data segments; acknowledgments carry a number indicating the next expected sequence number.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 87,
    question: "In a tree topology with N nodes, the number of bidirectional channels is:",
    options: {
      A: "N",
      B: "N – 1",
      C: "2N",
      D: "N(N – 1)/2"
    },
    correctAnswer: "B",
    explanation: "A tree topology always has exactly N – 1 links.",
    category: "Network Topologies",
    difficulty: "medium"
  },
  {
    id: 88,
    question: "An Ethernet card in a switch processes (reads and decides on forwarding):",
    options: {
      A: "only packets with a broadcast destination",
      B: "only packets with a multicast destination",
      C: "all packets, regardless of the destination address",
      D: "only packets addressed unicast to the switch"
    },
    correctAnswer: "C",
    explanation: "A switch examines every received frame to determine the appropriate forwarding action.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 89,
    question: "The minimum time required to send a 100 Kbyte packet over a 10 Mbit/s UTP network (crossing 3 storeandforward devices) over a 300meter distance is on the order of:",
    options: {
      A: "tens of milliseconds",
      B: "hundreds of milliseconds",
      C: "a few microseconds",
      D: "a few seconds"
    },
    correctAnswer: "B",
    explanation: "Transmitting 100 Kbytes (≈800 Kbits) at 10 Mbit/s takes about 80 ms per link; with multiple storeandforward hops, delays add up to hundreds of milliseconds.",
    category: "Network Technologies",
    difficulty: "hard"
  },
  {
    id: 90,
    question: "TCP congestion control is based on:",
    options: {
      A: "the dynamics of the transmitter's window size",
      B: "adapting the segment size to network conditions",
      C: "adjusting the window based on the receiver's memory",
      D: "varying the number of parity bits in segments"
    },
    correctAnswer: "A",
    explanation: "TCP congestion control is based on dynamically adjusting the transmitter's congestion window size in response to network conditions.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 91,
    question: "In a sliding window protocol over a sequential channel using progressive (noncyclic) numbering, which situation is impossible?",
    options: {
      A: "The transmit and receive windows have no overlapping sequence numbers.",
      B: "The smallest sequence number in the transmit window is smaller than that in the receive window.",
      C: "The smallest sequence number in the receive window is larger than that in the transmit window.",
      D: "The smallest sequence number in the receive window is smaller than that in the transmit window."
    },
    correctAnswer: "D",
    explanation: "For correct operation, the transmit and receive windows must overlap; having no common sequence numbers would preclude proper acknowledgment of transmitted frames.",
    category: "Transport Layer",
    difficulty: "easy"
  },
  {
    id: 92,
    question: "Common channel signalling requires that:",
    options: {
      A: "signalling information for multiple users is carried over a single shared channel.",
      B: "each user data channel has its own separate signalling channel.",
      C: "switching exchanges exchange signalling information via packet switching.",
      D: "signalling between exchanges occurs over a shared satellite channel."
    },
    correctAnswer: "C",
    explanation: "Common channel signaling involves using a separate channel for signaling information between control devices in switching exchanges, and it is often implemented using packet switching for efficient and reliable communication between these devices, Signaling channel is packet switched",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 93,
    question: "The DSL access network separates data and voice on the same medium using:",
    options: {
      A: "time multiplexing",
      B: "frequency multiplexing",
      C: "frequency division multiple access",
      D: "time division multiple access"
    },
    correctAnswer: "B",
    explanation: "DSL employs frequency multiplexing (using filters) to separate voice (lowfrequency) from data (highfrequency) on the same line.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 94,
    question: "The use of cookies in the HTTP protocol allows:",
    options: {
      A: "associating multiple requests from the same browser or user",
      B: "encrypting HTTP communications",
      C: "caching of responses",
      D: "sending responses in fragments (chunked transfer)"
    },
    correctAnswer: "A",
    explanation: "Cookies enable the server to recognize and track subsequent requests from the same client.",
    category: "Application Layer",
    difficulty: "medium"
  },
  {
    id: 95,
    question: "What is the order of magnitude of the maximum transmission speed achievable on an optical fibre?",
    options: {
      A: "1 Tbit/s",
      B: "1 Mbit/s",
      C: "1 bit/s",
      D: "1 kbit/s"
    },
    correctAnswer: "A",
    explanation: "Modern optical fibre systems can achieve transmission speeds on the order of terabits per second.",
    category: "Network Technologies",
    difficulty: "easy"
  },
  {
    id: 96,
    question: "The POP3 protocol:",
    options: {
      A: "is used to transfer emails from a server to an email client",
      B: "always includes encrypted authentication",
      C: "is used for exchanging emails between mail servers",
      D: "is used for blocking pop-ups in a web browser"
    },
    correctAnswer: "A",
    explanation: "POP3 (Post Office Protocol 3) enables email clients to retrieve messages from a mail server.",
    category: "Application Layer",
    difficulty: "medium"
  },
  {
    id: 98,
    question: "Statistical multiplexing:",
    options: {
      A: "is used in telephone networks with constantspeed channels",
      B: "can only be used in connectionless networks",
      C: "involves sharing the same resource among multiple sources",
      D: "can only be used in connectionoriented networks"
    },
    correctAnswer: "C",
    explanation: "Statistical multiplexing dynamically allocates network resources among multiple sources, regardless of the connection type, and is typically not used in circuitswitched (constantspeed) networks.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 99,
    question: "Compared to 10 Mbit/s Ethernet, in 100 Mbit/s Ethernet the MAC protocol:",
    options: {
      A: "has been modified for more efficient collision detection",
      B: "is largely unchanged, with the collision domain reduced due to physical layer constraints",
      C: "remains unchanged with an increased minimum frame size",
      D: "has been modified to include collision avoidance mechanisms"
    },
    correctAnswer: "B",
    explanation: "The Ethernet MAC protocol is largely unchanged between 10 Mbit/s and 100 Mbit/s; however, the physical limitations (e.g., shorter cable lengths) reduce the collision domain.",
    category: "Network Access Control",
    difficulty: "medium"
  },
  {
    id: 100,
    question: "The DHCP protocol requires that:",
    options: {
      A: "a client may leave the network without notifying the server",
      B: "the server must maintain a permanent record of all leases",
      C: "clients must use static IP configuration",
      D: "all communications must be encrypted"
    },
    correctAnswer: "A",
    explanation: "DHCP does not require clients to notify the server when they leave the network; leases simply expire.",
    category: "Application Layer",
    difficulty: "medium"
  },
  {
    id: 101,
    question: "The Internet Protocol Architecture is organized:",
    options: {
      A: "in seven layers",
      B: "in four layers",
      C: "in six layers",
      D: "in a nonstratified manner"
    },
    correctAnswer: "B",
    explanation: "The TCP/IP model is commonly described as having four layers.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 102,
    question: "The SMTP protocol:",
    options: {
      A: "always includes cryptographic authentication",
      B: "is used for delivering outgoing emails from a client to a mail server",
      C: "is used for transferring emails between mail servers",
      D: "is used for transferring emails from a server to a client"
    },
    correctAnswer: "B",
    explanation: "SMTP (Simple Mail Transfer Protocol) is used to send email from clients to servers.",
    category: "Application Layer",
    difficulty: "medium"
  },
  {
    id: 103,
    question: "Which of the following is never contained in the TCP header?",
    options: {
      A: "the current congestion window (cwnd)",
      B: "flags for connection management",
      C: "the header checksum field",
      D: "the receiver window size field"
    },
    correctAnswer: "A",
    explanation: "The congestion window (cwnd) is maintained internally by the sender and is not transmitted in the TCP header.",
    category: "Transport Layer",
    difficulty: "easy"
  },
  {
    id: 104,
    question: "In the OSI model, frame delineation (identifying packet boundaries) is a function:",
    options: {
      A: "performed by all layers",
      B: "exclusive to the network layer",
      C: "exclusive to the transport layer",
      D: "typical of the layer (or sublayer) adjacent to the physical layer"
    },
    correctAnswer: "D",
    explanation: "Frame delineation is handled by the Data Link Layer, which is immediately above the Physical Layer.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 105,
    question: "At the current state of technology, longdistance transmission without amplification is possible using:",
    options: {
      A: "telephone twisted pairs",
      B: "optical fibers",
      C: "coaxial cables",
      D: "wireless channels (e.g., satellite, radio)"
    },
    correctAnswer: "B",
    explanation: "Optical fibers have extremely low loss and can transmit over long distances without amplification.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 106,
    question: "The purpose of the MIME protocol is to:",
    options: {
      A: "reserve network resources for highquality email delivery",
      B: "allow data to be encoded in various formats within an email message",
      C: "transmit quality monitoring information with emails",
      D: "control playback of downloaded media files"
    },
    correctAnswer: "B",
    explanation: "MIME (Multipurpose Internet Mail Extensions) enables the inclusion of various types of data (text, images, audio, video) in email messages by specifying appropriate encoding.",
    category: "Application Layer",
    difficulty: "easy"
  },
  {
    id: 108,
    question: "In a window protocol with transmission window (WT) and reception window (WR), let N be the sequence number space. Which constraint is necessary and sufficient to avoid ambiguities on a sequential channel?",
    options: {
      A: "N = (WT + WR) / 2",
      B: "N ≥ WT + WR",
      C: "N = WR + 1",
      D: "N = WT + 1"
    },
    correctAnswer: "B",
    explanation: "To avoid ambiguity (especially when sequence numbers wrap around), the sequence number space must be at least as large as the sum of the transmitter and receiver window sizes.",
    category: "Transport Layer",
    difficulty: "easy"
  },
  {
    id: 109,
    question: "The MIME protocol allows:",
    options: {
      A: "control of media playback",
      B: "reservation of online resources for email attachments",
      C: "encoding data in various formats within an email message",
      D: "transmission of quality monitoring information"
    },
    correctAnswer: "C",
    explanation: "MIME enables email messages to contain diverse data types by specifying different encoding schemes.",
    category: "Application Layer",
    difficulty: "medium"
  },
  {
    id: 110,
    question: "The Domain Name System (DNS):",
    options: {
      A: "reveals the physical location of an Internet host",
      B: "enables an application to determine the IP address corresponding to a website's domain name",
      C: "assigns an Ethernet address to a host based on its IP address",
      D: "implements an OSI mapping between network and data link addresses"
    },
    correctAnswer: "B",
    explanation: "DNS translates humanreadable domain names into IP addresses.",
    category: "IP Addressing",
    difficulty: "medium"
  },
  {
    id: 111,
    question: "An (N1)-protocol allows interaction between:",
    options: {
      A: "two (N)-entities",
      B: "any two entities on different levels",
      C: "two (N1)-entities",
      D: "an (N+1)-entity and an (N1)-entity"
    },
    correctAnswer: "A",
    explanation: "An (N1)-protocol provides services to entities at layer N, thereby enabling communication between two layerN entities.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 112,
    question: "The SMTP protocol:",
    options: {
      A: "is used for delivering outgoing emails from a client to a mail server",
      B: "is used to transfer emails from a server to a client",
      C: "always includes encrypted authentication",
      D: "is used for transferring emails between mail servers"
    },
    correctAnswer: "A",
    explanation: "SMTP is used for sending email from a client to a server.",
    category: "Application Layer",
    difficulty: "medium"
  },
  {
    id: 113,
    question: "In a fully connected mesh topology with N nodes, the number of bidirectional channels is:",
    options: {
      A: "N(N – 1)/2",
      B: "2N",
      C: "N – 1",
      D: "Not defined"
    },
    correctAnswer: "A",
    explanation: "A fully connected mesh has N(N – 1)/2 unique bidirectional links.",
    category: "Network Topologies",
    difficulty: "medium"
  },
  {
    id: 114,
    question: "Which of the following protocols does not perform error detection on data units?",
    options: {
      A: "PPP",
      B: "HDLC",
      C: "IEEE 802.2 LLC",
      D: "Ethernet"
    },
    correctAnswer: "C",
    explanation: "IEEE 802.2 LLC relies on the MAC layer for error detection; the other protocols incorporate their own error detection mechanisms.",
    category: "Network Access Control",
    difficulty: "easy"
  },
  {
    id: 115,
    question: "An Ethernet card in a bridge processes (reads and makes decisions on):",
    options: {
      A: "all packets, regardless of destination",
      B: "only packets addressed to the bridge",
      C: "only broadcast packets",
      D: "only multicast packets"
    },
    correctAnswer: "A",
    explanation: "The bridge examines every packet to determine the correct forwarding action.",
    category: "Network Technologies",
    difficulty: "medium"
  },
  {
    id: 116,
    question: "If a router receives a valid TCP packet (within an IP packet) destined for a nonexistent TCP port, it:",
    options: {
      A: "forwards it to the destination host anyway",
      B: "passes it to a default application process",
      C: "the destination host sends back an ICMP port unreachable message",
      D: "drops the packet silently"
    },
    correctAnswer: "C",
    explanation: "When no application is listening on the destination port, the host sends an ICMP 'port unreachable' message back to the source.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 117,
    question: "In a mobile radio channel, the fading phenomenon is characterized by:",
    options: {
      A: "rapid variations in received power due to moving obstacles",
      B: "a decrease in received power due to atmospheric phenomena",
      C: "rapid variations due to interference from samefrequency sources",
      D: "a gradual decrease in power with increasing distance"
    },
    correctAnswer: "A",
    explanation: "Fading in mobile channels typically results from multipath propagation and moving obstacles causing rapid fluctuations in signal strength.",
    category: "Wireless Networks",
    difficulty: "medium"
  },
  {
    id: 118,
    question: "Which of the following functions is not performed by TCP?",
    options: {
      A: "Congestion control",
      B: "Multiplexing/demultiplexing via port numbers",
      C: "Flow control",
      D: "Packet routing"
    },
    correctAnswer: "D",
    explanation: "TCP manages endtoend transmission (flow control, congestion control, multiplexing) but does not determine the network route.",
    category: "Transport Layer",
    difficulty: "easy"
  },
  {
    id: 119,
    question: "The ring topology with bidirectional channels is widely used in telecommunications networks because:",
    options: {
      A: "it minimizes the number of I/O ports in switching nodes",
      B: "it is popular in local networks with a physical ring layout",
      C: "it minimizes the number of channels between nodes",
      D: "it maintains connectivity even if one transmission channel fails"
    },
    correctAnswer: "D",
    explanation: "The ring topology provides redundancy; if one link fails, traffic can be rerouted in the opposite direction.",
    category: "Network Topologies",
    difficulty: "medium"
  },
  {
    id: 120,
    question: "If a router detects a bad checksum on an IP packet (indicating header corruption), it:",
    options: {
      A: "forwards the packet anyway",
      B: "attempts to correct the error",
      C: "sends an ICMP error message back",
      D: "discards the packet without reporting the error"
    },
    correctAnswer: "D",
    explanation: "A packet with a bad header checksum is dropped silently, since it is considered corrupted and unreliable.",
    category: "Transport Layer",
    difficulty: "medium"
  },
  {
    id: 121,
    question: "The DNS (Domain Name Service):",
    options: {
      A: "increases reliability using caches but always requires contacting the authoritative server",
      B: "is used by operators to sell domain names",
      C: "is based on a hierarchy of servers, each responsible for a particular portion of the namespace",
      D: "is a protocol for load balancing among routers in a local network"
    },
    correctAnswer: "C",
    explanation: "DNS is organized hierarchically; different servers are responsible for different segments of the domain name space.",
    category: "Application Layer",
    difficulty: "medium"
  }
];