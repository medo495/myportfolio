export const personalInfo = {
  name: 'Ait El Hadj Mohamed',
  title: 'Computer Engineering Student',
  tagline: 'Cybersecurity & Software Development',
  location: 'Taroudant, Morocco',
  email: 'mohamedaitlhadj28@gmail.com',
  github: 'https://github.com/medo495',
  linkedin: 'https://www.linkedin.com/in/mohamed-ait-el-hadj-38b67a288/',

  bio: `Computer Engineering student at ENSIASD, specializing in IT Security and Digital Trust. I bridge the gap between secure software development and Blue Team cybersecurity — building resilient applications while defending digital infrastructures against modern threats.`,
  education: [
    {
      degree: 'Engineering Degree — IT Security & Digital Trust',
      institution: 'ENSIASD',
      period: '2025 – Present',
      location: 'Morocco',
    },
    {
      degree: 'DUT — Computer Engineering',
      institution: 'EST Agadir',
      period: '2023 – 2025',
      location: 'Agadir, Morocco',
    },
    {
      degree: 'Baccalaureate — Physical Sciences',
      institution: 'High School',
      period: '2023',
      location: 'Taroudant, Morocco',
    },
  ],
  languages: [
    { name: 'Arabic', level: 'Native', percent: 100 },
    { name: 'French', level: 'Fluent', percent: 90 },
    { name: 'English', level: 'Fluent', percent: 85 },
  ],
};

export const skills = {
  development: [
    { name: 'JavaScript / TypeScript', level: 85 },
    { name: 'React / React Native', level: 82 },
    { name: 'Python', level: 78 },
    { name: 'Java', level: 72 },
    { name: 'PHP', level: 68 },
    { name: 'C', level: 65 },
    { name: 'HTML5 / CSS / Bootstrap', level: 88 },
  ],
  cybersecurity: [
    { name: 'Wireshark', level: 80 },
    { name: 'Burp Suite', level: 72 },
    { name: 'OWASP ZAP', level: 70 },
    { name: 'Splunk (SIEM)', level: 68 },
    { name: 'Network Traffic Analysis', level: 78 },
    { name: 'Threat Detection', level: 75 },
  ],
  forensics: [
    { name: 'Autopsy', level: 70 },
    { name: 'FTK Imager', level: 65 },
    { name: 'Volatility', level: 65 },
  ],
  tools: [
    { name: 'Linux (Kali / Parrot)', level: 82 },
    { name: 'Git & GitHub', level: 85 },
    { name: 'VirtualBox', level: 75 },
    { name: 'MySQL / SQL', level: 78 },
    { name: 'WordPress', level: 70 },
    { name: 'Figma', level: 70 },
  ],
};

export const experiences = [
  {
    title: 'Mobile Developer Intern',
    company: 'Vala Bleu',
    period: '2025 · 2 months',
    type: 'Internship',
    tags: ['React Native', 'SDLC', 'Mobile', 'UI/UX'],
    image: '/images/marketplace.png',
    description: [
      'Developed a mobile marketplace application using React Native',
      'Designed UI/UX and contributed to the frontend architecture',
      'Implemented user management, product listings, and category features',
      'Applied SDLC methodology throughout the real-world project lifecycle',
    ],
  },
  {
    title: 'Freelance Web Developer',
    company: 'French Hair Salon',
    period: '2025 · France',
    type: 'Freelance',
    tags: ['Web Design', 'Responsive UI', 'WordPress', 'Client Work'],
    image: '/images/salon.png',
    description: [
      'Developed a responsive website for a French hair salon with a polished service showcase.',
      'Designed the visual style to match the salon’s brand and local French audience.',
      'Implemented mobile-first navigation, appointment details, and contact accessibility.',
    ],
  },
  {
    title: 'Web Development & UI/UX Intern',
    company: 'GoBranding',
    period: '2024 · 1 month',
    type: 'Internship',
    tags: ['WordPress', 'Figma', 'UX', 'E-commerce'],
    image: '/images/gobranding.png',
    description: [
      'Designed and developed an e-commerce cosmetics website',
      'Created interactive UI mockups and prototypes using Figma',
      'Built the website using WordPress with a focus on UX principles',
      'Ensured responsiveness and cross-device usability',
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'Security Evaluation — Oued Souss Alerte',
    category: 'Cybersecurity',
    tags: ['Blue Team', 'Threat Monitoring', 'Vulnerability Assessment'],
    image: '/images/ouedsouss.png',
    description:
      'Evaluated the security posture of a real-world system. Monitored and analyzed potential security incidents, identified vulnerabilities, and proposed concrete mitigation strategies — operating in a full Blue Team defensive context.',
    outcomes: ['Vulnerability report delivered', 'Mitigation plan proposed', 'Incident monitoring established'],
    color: 'teal',
  },
  {
    id: 2,
    title: 'ICS Network Attack Detection (Modbus)',
    category: 'Cybersecurity',
    tags: ['Wireshark', 'Modbus', 'ICS Security', 'Anomaly Detection'],
    image: '/images/modbus.webp',
    description:
      'Analyzed industrial control system (ICS) network traffic using Wireshark to detect anomalies and cyberattacks targeting Modbus protocol. Focused on securing critical infrastructure against real-world attack vectors.',
    outcomes: ['Attack patterns identified', 'Anomaly detection implemented', 'ICS security report produced'],
    color: 'blue',
  },
  {
    id: 3,
    title: 'Honeypot Lab',
    category: 'Cybersecurity',
    tags: ['Parrot OS', 'Kali Linux', 'Honeypot', 'Threat Intel'],
    image: '/images/honeypot.png',
    description:
      'Deployed a honeypot environment on Parrot OS and simulated real attacks using Kali Linux. Analyzed attacker behavior and collected threat intelligence from detailed log analysis.',
    outcomes: ['Attacker behavior documented', 'Log analysis completed', 'Threat intel report created'],
    color: 'amber',
  },
  {
    id: 4,
    title: 'Elderly Assistance Mobile App',
    category: 'Development',
    tags: ['React Native', 'UML', 'SDLC', 'Mobile'],
    image: '/images/elderlyapp.png',
    description:
      'Designed and developed a mobile application connecting elderly users with service providers. Featured emergency communication, service booking, and a clean accessible interface. Full SDLC with UML documentation.',
    outcomes: ['Full UML documentation', 'Emergency feature implemented', 'SDLC cycle completed'],
    color: 'teal',
  },
  {
    id: 5,
    title: 'Quran Mobile Application',
    category: 'Development',
    tags: ['React Native', 'Accessibility', 'Audio', 'UX'],
    image: '/images/quran.png',
    description:
      'Built an accessible Quran app targeting non-Arabic speakers and users with limited literacy. Features audio recitation, phonetic reading guides, translations, and memorization tracking with a user-centered design approach.',
    outcomes: ['Audio recitation integrated', 'Phonetic reading system built', 'Memorization tracking feature'],
    color: 'green',
  },
];

export const blogPosts = [
  {
    id: 1,
    title: 'Understanding Modbus Protocol Security',
    date: '2025-03-15',
    tags: ['ICS', 'Modbus', 'Blue Team', 'Industrial Security'],
    excerpt:
      'A deep dive into the Modbus protocol vulnerabilities found in industrial control systems and how defenders can detect anomalous traffic patterns.',
    readTime: '6 min',
    slug: 'understanding-modbus-protocol-security',
  },
  {
    id: 2,
    title: 'Setting Up a Honeypot: A Practical Guide',
    date: '2025-02-20',
    tags: ['Honeypot', 'Threat Intelligence', 'Lab', 'Parrot OS'],
    excerpt:
      'Step-by-step walkthrough of deploying a honeypot on Parrot OS, configuring monitoring, and analyzing attacker behavior from captured logs.',
    readTime: '8 min',
    slug: 'setting-up-honeypot-practical-guide',
  },
  {
    id: 3,
    title: 'Blue Team Essentials: SIEM with Splunk',
    date: '2025-01-10',
    tags: ['Splunk', 'SIEM', 'Blue Team', 'Threat Detection'],
    excerpt:
      'How I used Splunk to build dashboards for real-time threat monitoring, correlate log events, and create alerts for suspicious activity.',
    readTime: '5 min',
    slug: 'blue-team-essentials-siem-splunk',
  },
  {
    id: 4,
    title: 'Building Secure Mobile Apps with React Native',
    date: '2024-12-05',
    tags: ['React Native', 'Mobile Security', 'Development', 'Best Practices'],
    excerpt:
      'Essential security practices for React Native development, including secure storage, network communication, and protecting sensitive user data.',
    readTime: '7 min',
    slug: 'building-secure-mobile-apps-react-native',
  },
  {
    id: 5,
    title: 'Network Traffic Analysis with Wireshark',
    date: '2024-11-18',
    tags: ['Wireshark', 'Network Analysis', 'Cybersecurity', 'Tools'],
    excerpt:
      'Mastering Wireshark for network troubleshooting and security analysis, with practical examples from ICS environments.',
    readTime: '9 min',
    slug: 'network-traffic-analysis-wireshark',
  },
  {
    id: 6,
    title: 'From Internship to Freelance: My Journey in Web Development',
    date: '2024-10-22',
    tags: ['Career', 'Web Development', 'Freelance', 'WordPress'],
    excerpt:
      'Lessons learned from internships and freelance projects, including client communication, project management, and technical skill development.',
    readTime: '6 min',
    slug: 'internship-to-freelance-web-development-journey',
  },
];
