/**
 * ============================================================================
 * CENTRALIZED PORTFOLIO DATA — UNIFIED INLINE BILINGUAL (EN & ID)
 * ============================================================================
 * Cukup edit 1 file & 1 tempat untuk setiap item!
 * - Teks yang berbeda antar bahasa ditulis langsung sebagai:
 *     { en: 'English text', id: 'Teks Indonesia' }
 * - Teks yang sama untuk kedua bahasa (nama, URL, path gambar, tahun, tags,
 *   skills, tools) cukup ditulis sebagai string biasa: '...'
 *
 * Setiap project baru di `projectsSection.items` WAJIB disertai gambar mockup
 * seragam di folder `public/images/` (lihat panduan lengkap di README.md).
 * ============================================================================
 */

const RAW_PORTFOLIO_DATA = {
  meta: {
    pageTitle: 'Rd Airlangga Dewanata — Fullstack Developer',
  },

  // 1. TOP MINIMAL HEADER (src/components/Navbar.jsx)
  header: {
    roleLines: ['R Airlangga Dewanata', 'Fullstack Developer'],
  },

  // 2. HERO SECTION (src/components/HeroSection.jsx)
  hero: {
    backgroundText: 'PORTOFOLIO',
    greeting: {
      en: "Hello, I'm, Raden",
      id: 'Halo, Saya Raden',
    },
    name: 'Airlangga Dewanata ',
    roleSubtitle: 'Fullstack Developer',
    bio: {
      en: 'Engineering scalable web applications and intuitive digital experiences through thoughtful UI/UX design and modern full-stack architecture — transforming complex ideas into purposeful digital products.',
      id: 'Membangun aplikasi web yang skalabel dan pengalaman digital yang intuitif melalui desain UI/UX yang terarah serta arsitektur full-stack modern — mengubah ide kompleks menjadi produk digital yang berdampak.',
    },
    availabilityBadge: {
      en: 'FULL-TIME & FREELANCE AVAILABLE',
      id: 'TERSEDIA FULL-TIME & FREELANCE',
    },
    portrait: {
      src: '/images/profile.png',
      alt: 'Airlangga — Fullstack Developer Portrait',
      monogram: 'RADEWANATA',
    },
    tagline: {
      en: 'Turning ideas into powerful digital experiences.',
      id: 'Mengubah ide menjadi pengalaman digital yang berdampak.',
    },
    stats: [
      {
        value: '4+',
        label: { en: 'YEARS EXPERIENCE', id: 'TAHUN PENGALAMAN' },
      },
      {
        value: '3+',
        label: { en: 'PROJECTS COMPLETED', id: 'PROYEK SELESAI' },
      },
    ],
  },

  // 3. SELECTED PROJECTS SECTION (src/components/ProjectsSection.jsx)
  // Hapus `liveUrl` jika project bersifat internal/rahasia agar tombol Live Project tidak tampil.
  projectsSection: {
    eyebrow: { en: 'CURATED WORK', id: 'KARYA PILIHAN' },
    heading: { en: 'SELECTED PROJECTS', id: 'PROYEK PILIHAN' },
    ctaLabel: { en: 'VIEW ALL PROJECTS', id: 'LIHAT SEMUA PROYEK' },
    collapseLabel: { en: 'SHOW SELECTED ONLY', id: 'TAMPILKAN PILIHAN' },
    visitLabel: { en: 'VISIT LIVE PROJECT', id: 'KUNJUNGI PROYEK' },
    items: [
      {
        id: '01',
        title: {
          en: 'Corporate Website Redesign',
          id: 'Redesain Website Profil Perusahaan',
        },
        category: {
          en: 'UI/UX DESIGN & FRONT-END DEVELOPMENT',
          id: 'DESAIN UI/UX & PENGEMBANGAN FRONT-END',
        },
        year: '2025',
        client: 'PT HEXAGON KARYATAMA INDONESIA',
        image: '/images/project-hexagon.png',
        summary: {
          en: 'Redesigned the corporate website to address outdated layouts, unclear navigation, and inconsistent user experiences. Translated UX research, wireframes, and Figma design systems into responsive web interfaces through Vue.js frontend development.',
          id: 'Redesain website profil perusahaan untuk meningkatkan konsistensi visual, kejelasan navigasi, dan pengalaman pengguna melalui desain UI/UX Figma serta implementasi front-end Vue.js yang responsif.',
        },
        tags: [
          'Figma',
          'Vue.js',
          'UX Research',
          'Wireframing',
          'UI Design',
          'Design System',
          'Responsive Web Design',
        ],
        liveUrl: 'https://hexagon.co.id/',
        featured: true,
      },
      {
        id: '02',
        title: {
          en: 'MBG Operational Management System',
          id: 'Dashboard Manajemen Operasional MBG',
        },
        category: {
          en: 'FREELANCE WEB APPLICATION DEVELOPMENT',
          id: 'PENGEMBANGAN FREELANCE',
        },
        year: '2026',
        client: 'PRIVATE CLIENT · STUDENT PROJECT',
        image: '/images/project-mbgapp.png',
        summary: {
          en: 'Designed and developed a web-based operational management system for an individual student client, providing structured data management, operational monitoring, and centralized information visualization to support MBG program activities.',
          id: 'Merancang dan membangun dashboard manajemen operasional berbasis web untuk proyek mahasiswa dengan pengelolaan data terpusat, pemantauan operasional, serta visualisasi data terstruktur guna mendukung alur kerja program MBG.',
        },
        tags: [
          'React.js',
          'Next.js',
          'Tailwind CSS',
          'Supabase',
          'Web Application',
          'Dashboard Development',
        ],
        liveUrl: 'https://sistem-mbg.rdanidewanata.workers.dev/dashboard',
        featured: true,
      },
      {
        id: '03',
        title: {
          en: 'Internal HR Management Dashboard',
          id: 'Dashboard Manajemen HR Internal',
        },
        category: {
          en: 'INTERNAL WEB DASHBOARD · FRONT-END DEVELOPMENT',
          id: 'DASHBOARD WEB INTERNAL · PENGEMBANGAN FRONT-END',
        },
        year: '2026',
        client: 'Amerta Teknologi Media',
        image: '/images/project-orbis.png',
        summary: {
          en: 'Developed the front-end interface for an internal company HR management dashboard as a Front-End Developer using an AI-assisted workflow. Focused on structured employee profile views, personal records organization, and responsive UI components.',
          id: 'Mengembangkan antarmuka dashboard manajemen HR internal perusahaan sebagai Front-End Developer dengan memanfaatkan AI dalam proses pengembangannya. Berfokus pada penyajian profil karyawan terstruktur, pengelolaan data personal, dan komponen UI responsif.',
        },
        tags: ['React', 'Vue', 'Django'],
        featured: true,
      },
    ],
  },

  // 3B. CERTIFICATIONS SECTION (src/components/CertificationsSection.jsx)
  // Tambah item sertifikasi baru di array `items` -> total sertifikasi di Header & Section otomatis terhitung.
  certificationsSection: {
    eyebrow: { en: 'VERIFIED CREDENTIALS', id: 'SERTIFIKASI & KOMPETISI' },
    heading: { en: 'CERTIFICATIONS', id: 'SERTIFIKASI' },
    previewLabel: { en: 'Preview Certificate', id: 'Tinjau Sertifikat' },
    verifyLabel: { en: 'Verify Credential', id: 'Verify Credential' },
    roleLabel: { en: 'ROLE', id: 'PERAN' },
    issuerLabel: { en: 'ISSUER', id: 'PENERBIT' },
    dateLabel: { en: 'ISSUED', id: 'TERBIT' },
    items: [
      {
        id: '01',
        title: {
          en: 'Web Development Competition — FICPACT CUP',
          id: 'Sertifikat Peserta Lomba Web Development — FICPACT CUP',
        },
        role: 'UI/UX Designer & Frontend Developer',
        issuer: {
          en: 'BEM Faculty of Computer Science · Soegijapranata Catholic University',
          id: 'BEM Fakultas Ilmu Komputer · Universitas Katolik Soegijapranata',
        },
        issueDate: 'Apr 2026',
        credentialUrl: '',
        image: '/images/cert-ficpact-webdev.png',
        summary: {
          en: 'Participated in the Web Development Competition (University/High School category, Feb–Apr 2026) organized by BEM Faculty of Computer Science, Soegijapranata Catholic University Semarang as UI/UX Designer & Frontend Developer.',
          id: 'Berpartisipasi dalam lomba Web Development kategori Mahasiswa/SMA-SMK (1 Feb – 8 Apr 2026) oleh BEM Fakultas Ilmu Komputer Universitas Katolik Soegijapranata Semarang sebagai UI/UX Designer & Frontend Developer.',
        },
      },
    ],
  },

  // 4A & 4B. EDUCATION & SKILLS (src/components/EducationCard.jsx & SkillsCard.jsx)
  educationAndSkills: {
    sectionTitle: 'EDUCATION & SKILLS',
    educationEyebrow: { en: 'ACADEMIC', id: 'AKADEMIK' },
    educationHeading: { en: 'EDUCATION', id: 'PENDIDIKAN' },
    education: [
      {
        degree: 'Rekayasa Perangkat Lunak (RPL)',
        institution: 'SMK NEGERI 1 CIMAHI',
        year: '2023 — 2026',
      },
      {
        degree: 'Sistem Informasi (S1)',
        institution: 'Universitas Terbuka',
        year: { en: '2026 — Now', id: '2026 — Sekarang' },
      },
    ],
    skillsEyebrow: { en: 'CAPABILITIES', id: 'KEMAMPUAN' },
    skillsHeading: { en: 'SKILLS & TOOLS', id: 'KEAHLIAN & TOOLS' },
    toolsHeading: 'TOOLS',
    skillsFooterLabel: { en: 'CORE STACK', id: 'KEAHLIAN UTAMA' },
    skillsCountLabel: { en: 'SKILLS', id: 'KEAHLIAN' },
    skills: [
      'UI/UX Design',
      'UX Research',
      'User Flow Design',
      'Wireframing',
      'Interactive Prototyping',
      'Design Systems',
      'Responsive Web Design',
      'Frontend Development',
      'Backend Development',
      'Full-Stack Development',
      'API Integration',
      'Database Management',
      'Mobile App Development',
      'Web Application Development',
      'Version Control',
      'Application Testing',
      'Debugging & Troubleshooting',
      'Application Support',
      'System Monitoring',
      'Technical Documentation',
      'Deployment & Hosting',
      'Problem Solving',
      'IoT',
      'Mobile Development',
      '3D Animator',
    ],
    // Cukup ubah/tambah langsung di sini tanpa perlu punya file gambar atau edit SkillsCard.jsx!
    // Bisa tulis: { title: 'Nama Tool', icon: 'slug-brand' } | { title: 'Nama Tool' } | 'Nama Tool'
    tools: [
      { title: 'JavaScript', icon: 'javascript' },
      { title: 'Bootstrap', icon: 'bootstrap' },
      { title: 'Tailwind CSS', icon: 'tailwindcss' },
      { title: 'MySQL', icon: 'mysql' },
      { title: 'SQLite', icon: 'sqlite' },
      { title: 'Android Studio', icon: 'androidstudio' },
      { title: 'Laravel', icon: 'laravel' },
      { title: 'PHP Native', icon: 'php' },
      { title: 'Figma', icon: 'figma' },
      { title: 'Git', icon: 'git' },
      { title: 'React', icon: 'react' },
      { title: 'Next.js', icon: 'nextjs' },
      { title: 'Node.js', icon: 'nodejs' },
      { title: 'GitHub', icon: 'github' },
      { title: 'Blender', icon: 'blender' },
      { title: 'Postman', icon: 'postman' },
      { title: 'Firebase', icon: 'firebase' },
      { title: 'Django', icon: 'Django' },

    ],
  },

  // 4C. WORK PROCESS / EXPERIENCE (src/components/WorkProcess.jsx)
  // Supported icons: 'Compass' | 'Lightbulb' | 'PenTool' | 'Code2' | 'Rocket' | 'Layers' | 'Sparkles'
  workProcess: {
    eyebrow: { en: 'HOW I WORK', id: 'PERJALANAN PROFESIONAL' },
    sectionTitle: { en: 'MY DEVELOPMENT PROCESS', id: 'PENGALAMAN & PROYEK' },
    steps: [
      {
        number: '01',
        title: {
          en: 'HEXAGON KARYATAMA INDONESIA',
          id: 'PT HEXAGON KARYATAMA INDONESIA',
        },
        icon: 'PenTool',
        description: {
          en: 'Redesigned the company profile website by conducting UX analysis, creating user flows and wireframes, developing a consistent design system, and implementing responsive interfaces using Vue.js.',
          id: 'Berkontribusi dalam redesign website company profile melalui UX research, user flow, wireframing, UI design, design system, hingga implementasi frontend menggunakan Vue.js.',
        },
      },
      {
        number: '02',
        title: {
          en: 'AMERTA TEKNOLOGI MEDIA',
          id: 'PT AMERTA TEKNOLOGI MEDIA',
        },
        icon: 'Layers',
        description: {
          en: 'Worked in Helpdesk & Application Support, monitoring application operations, investigating data issues using DBeaver, checking API responses, and coordinating with backend teams to resolve system-related problems.',
          id: 'Menangani Helpdesk & Application Support dengan memantau operasional aplikasi, menganalisis kendala data menggunakan DBeaver, melakukan pengecekan API, serta berkoordinasi dengan tim backend.',
        },
      },
      {
        number: '03',
        title: {
          en: 'MBG OPERATIONAL MANAGEMENT DASHBOARD',
          id: 'DASHBOARD MANAJEMEN OPERASIONAL MBG',
        },
        icon: 'Code2',
        description: {
          en: 'Developed a web-based operational dashboard through an independent freelance project for an individual student client, featuring centralized data management, operational monitoring, and information visualization using React.js and Next.js.',
          id: 'Mengembangkan dashboard operasional berbasis web melalui proyek freelance dengan klien individu, mencakup pengelolaan data terpusat, pemantauan operasional, dan visualisasi informasi menggunakan React.js dan Next.js.',
        },
      },
      {
        number: '04',
        title: {
          en: 'INTERNAL HR MANAGEMENT APPLICATION',
          id: 'APLIKASI MANAJEMEN HR INTERNAL',
        },
        icon: 'Layers',
        description: {
          en: 'Contributed to the development of an internal company application, focusing on employee profile management, personal information, educational background, certifications, and project assignments.',
          id: 'Terlibat dalam pengembangan aplikasi internal perusahaan, khususnya fitur manajemen profil karyawan yang mencakup informasi personal, pendidikan, sertifikasi, dan pemetaan proyek.',
        },
      },
      {
        number: '05',
        title: {
          en: 'PERSONAL & INDEPENDENT PROJECTS',
          id: 'PROYEK MANDIRI & EKSPLORASI',
        },
        icon: 'Rocket',
        description: {
          en: 'Building independent digital projects to explore modern technologies, implement UI/UX design concepts, develop web applications, and continuously strengthen software engineering skills.',
          id: 'Mengembangkan berbagai proyek mandiri sebagai sarana eksplorasi teknologi, penerapan UI/UX design, pengembangan aplikasi web, serta peningkatan kemampuan rekayasa perangkat lunak.',
        },
      },
    ],
  },

  // 4D. FEATURED QUOTE CARD (src/components/QuoteCard.jsx)
  quoteCard: {
    quote: {
    en: 'Think. Design. Build. Evolve.',  
    id: 'Berpikir. Merancang. Membangun. Berkembang.',
    },
    signature: 'R AIRLANGGA DEWANATA',
    roleCaption: 'Fullstack Developer',
  },

  // 5. FOOTER / CONTACT SECTION (src/components/ContactFooter.jsx)
  // Supported icons: 'Mail' | 'Git' / 'GitHub' | 'LinkedIn' | 'Instagram' | 'X' | 'WhatsApp' | 'Telegram' | 'Phone' | 'MapPin' | 'Globe' | 'Briefcase' | 'Link' (or custom image path)
  contactFooter: {
    heading: {
      en: "LET'S WORK TOGETHER",
      id: 'MARI BEKERJA SAMA',
    },
    pitch: {
      en: 'Looking to elevate your brand presence or launch an unforgettable digital product? Drop a message and let us craft something iconic.',
      id: 'Ingin mengembangkan produk digital, sistem web perusahaan, atau berkolaborasi penuh waktu maupun proyek lepas? Kirim pesan dan mari ciptakan karya terbaik.',
    },
    availability: {
      en: 'OPEN FOR FULL-TIME & FREELANCE',
      id: 'SIAP FULL-TIME & FREELANCE',
    },
    contacts: [
      {
        label: 'Email',
        value: 'dewanataarairlangga@gmail.com',
        href: 'mailto:dewanataarairlangga@gmail.com',
        icon: 'Mail',
      },
      {
        label: 'GitHub',
        value: 'RadenAirlanggaDewanata',
        href: 'https://github.com/RadenAirlanggaDewanata?tab=repositories',
        icon: 'Git',
      },
      {
        label: 'LinkedIn',
        value: 'Raden Airlangga Dewanata',
        href: 'https://www.linkedin.com/in/rd-airlanga-dewanata-72a5a8411/',
        icon: 'LinkedIn',
      },
      {
        label: { en: 'Phone', id: 'Telepon' },
        value: '+62 821-3088-6720',
        href: 'tel:+6282130886720',
        icon: 'Phone',
      },
      {
        label: { en: 'Location', id: 'Lokasi' },
        value: {
          en: 'Cimahi, Indonesia — Worldwide Remote',
          id: 'Cimahi, Indonesia — Siap Remote & On-Site',
        },
        href: null,
        icon: 'MapPin',
      },
    ],
    whatsappCard: {
      eyebrow: { en: 'INSTANT CONNECT', id: 'TERHUBUNG CEPAT' },
      title: { en: 'Fast Response via WhatsApp', id: 'Respon Cepat via WhatsApp' },
      description: {
        en: 'Prefer direct conversation? Start a WhatsApp chat right away for projects or collaboration.',
        id: 'Ingin diskusi lebih cepat? Langsung mulai chat WhatsApp untuk proyek maupun kolaborasi.',
      },
      statusBadge: { en: 'ONLINE', id: 'AKTIF' },
      displayNumber: '+62 821-3088-6720',
      whatsappNumber: '082130886720',
      chatGreeting: 'Halo, mas airlangga',
      buttonLabel: { en: 'Send WhatsApp', id: 'Send WhatsApp' },
    },
    copyrightOwner: 'R AIRLANGGA DEWANATA',
    rightsText: {
      en: 'All Rights Reserved.',
      id: 'Hak Cipta Dilindungi.',
    },
    editionText: {
      en: 'Obsidian & Hexagonal Blue Editorial System',
      id: 'Sistem Editorial Obsidian & Biru Heksagonal',
    },
  },

  // 6. DEDICATED ATS & RECRUITER CV DATA (src/components/CvPreviewModal.jsx & src/utils/generateCvPdf.js)
  // Bagian khusus ini memperbarui isi CV tanpa mengubah tampilan teks website utama.
  // Hanya memuat fakta terverifikasi tanpa placeholder `[ISI: ...]`.
  cv: {
    fullName: 'RADEN AIRLANGGA DEWANATA',
    roleTitle: 'Frontend-Focused Full-Stack Developer | UI/UX',
    contacts: [
      {
        label: 'Phone',
        value: '+62 821-3088-6720',
        href: 'tel:+6282130886720',
        icon: 'Phone',
      },
      {
        label: 'Email',
        value: 'dewanataarairlangga@gmail.com',
        href: 'mailto:dewanataarairlangga@gmail.com',
        icon: 'Mail',
      },
      {
        label: { en: 'Location', id: 'Lokasi' },
        value: {
          en: 'Cimahi, Indonesia (Open to Remote)',
          id: 'Cimahi, Indonesia (Siap Remote)',
        },
        href: null,
        icon: 'MapPin',
      },
      {
        label: 'GitHub',
        value: 'github.com/RadenAirlanggaDewanata',
        href: 'https://github.com/RadenAirlanggaDewanata',
        icon: 'Git',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/rd-airlanga-dewanata-72a5a8411',
        href: 'https://www.linkedin.com/in/rd-airlanga-dewanata-72a5a8411/',
        icon: 'LinkedIn',
      },
    ],
    professionalSummary: {
      en: 'Software Engineering (RPL) graduate and Information Systems undergraduate targeting Junior Frontend Developer or UI/UX-focused Full-Stack Developer roles. Built responsive web interfaces, operational dashboards, and Figma design systems using React, Next.js, Vue.js, and Tailwind CSS across corporate website redesigns, freelance client projects, and internal HR applications. Experienced in Helpdesk and Application Support, monitoring application operations, checking API responses, and investigating data issues using DBeaver.',
      id: 'Lulusan Rekayasa Perangkat Lunak (RPL) dan mahasiswa S1 Sistem Informasi yang membidik posisi Junior Frontend Developer atau Full-Stack Developer (fokus Frontend & UI/UX). Mengembangkan antarmuka web responsif, dashboard operasional, dan design system Figma menggunakan React, Next.js, Vue.js, serta Tailwind CSS pada redesain website perusahaan, proyek freelance, dan aplikasi HR internal. Berpengalaman di Helpdesk dan Application Support untuk memantau operasional aplikasi, memeriksa respons API, serta menelusuri kendala data menggunakan DBeaver.',
    },
    education: [
      {
        degree: {
          en: 'Software Engineering (RPL)',
          id: 'Rekayasa Perangkat Lunak (RPL)',
        },
        institution: 'SMK NEGERI 1 CIMAHI',
        year: '2023 — 2026',
      },
      {
        degree: {
          en: 'Bachelor of Information Systems (S1 Sistem Informasi)',
          id: 'Sistem Informasi (S1)',
        },
        institution: 'Universitas Terbuka',
        year: { en: '2026 — Present', id: '2026 — Sekarang' },
      },
    ],
    workExperience: [
      {
        role: 'Frontend Developer',
        company: 'Amerta Teknologi Media',
        period: '',
        highlights: {
          en: [
            'Developed the front-end interface for an internal company HR management dashboard using React, Vue.js, and Django.',
            'Built structured employee profile views covering personal information, educational background, certifications, and project assignments.',
            'Created responsive UI components through an AI-assisted development workflow.',
          ],
          id: [
            'Mengembangkan antarmuka front-end untuk dashboard manajemen HR internal perusahaan menggunakan React, Vue.js, dan Django.',
            'Membangun tampilan profil karyawan terstruktur yang mencakup informasi personal, latar belakang pendidikan, sertifikasi, dan penugasan proyek.',
            'Membuat komponen UI responsif dengan memanfaatkan alur kerja pengembangan berbantuan AI.',
          ],
        },
      },
      {
        role: 'Freelance Full-Stack Developer',
        company: 'MBG Operational Management Dashboard (Private Client)',
        period: '',
        highlights: {
          en: [
            'Designed and developed a web-based operational management dashboard for an individual student client using React.js, Next.js, Tailwind CSS, and Supabase.',
            'Built centralized data management and operational monitoring features to support MBG program activities.',
            'Implemented structured information visualization across the dashboard interface.',
          ],
          id: [
            'Merancang dan mengembangkan dashboard manajemen operasional berbasis web untuk klien individu (proyek mahasiswa) menggunakan React.js, Next.js, Tailwind CSS, dan Supabase.',
            'Membangun fitur pengelolaan data terpusat dan pemantauan operasional guna mendukung aktivitas program MBG.',
            'Mengimplementasikan visualisasi informasi yang terstruktur pada antarmuka dashboard.',
          ],
        },
      },
      {
        role: 'Application Support (Intern)',
        company: 'Amerta Teknologi Media',
        period: '',
        highlights: {
          en: [
            'Monitored application operations in a Helpdesk and Application Support role.',
            'Investigated data issues using DBeaver and checked API responses.',
            'Coordinated with backend teams to resolve system-related problems.',
          ],
          id: [
            'Memantau operasional aplikasi dalam peran Helpdesk dan Application Support.',
            'Menelusuri kendala data menggunakan DBeaver dan memeriksa respons API.',
            'Berkoordinasi dengan tim backend untuk menyelesaikan masalah terkait sistem.',
          ],
        },
      },
      {
        role: 'Frontend Developer & UI/UX Designer (Intern)',
        company: 'PT Hexagon Karyatama Indonesia',
        period: '',
        highlights: {
          en: [
            'Conducted UX research and analysis to address outdated layouts, unclear navigation, and inconsistent user experiences on the company profile website.',
            'Created user flows, wireframes, UI designs, and a consistent design system in Figma.',
            'Developed responsive frontend interfaces for the redesigned corporate website (hexagon.co.id) using Vue.js.',
          ],
          id: [
            'Melakukan riset dan analisis UX untuk memperbaiki tata letak lama, navigasi yang kurang jelas, dan pengalaman pengguna yang tidak konsisten pada website company profile.',
            'Menyusun user flow, wireframe, desain UI, dan design system yang konsisten di Figma.',
            'Mengembangkan antarmuka frontend yang responsif untuk website profil perusahaan (hexagon.co.id) menggunakan Vue.js.',
          ],
        },
      },
    ],
    selectedProjects: [
      {
        id: 'cv-p1',
        title: 'MBG Operational Management Dashboard',
        meta: 'Private Client | 2026',
        techStack: 'React.js, Next.js, Tailwind CSS, Supabase',
        link: 'https://sistem-mbg.rdanidewanata.workers.dev/dashboard',
      },
      {
        id: 'cv-p2',
        title: 'Company Profile Website Redesign — PT Hexagon Karyatama Indonesia',
        meta: 'Corporate | 2025',
        techStack: 'Figma, Vue.js',
        link: 'https://hexagon.co.id/',
      },
      {
        id: 'cv-p3',
        title: 'Internal HR Management Dashboard — Amerta Teknologi Media',
        meta: 'Internal Company App | 2026',
        techStack: 'React, Vue.js, Django',
        link: '',
      },
    ],
    achievements: [
      {
        id: 'cv-a1',
        title: {
          en: 'Web Development Competition — FICPACT CUP',
          id: 'Lomba Web Development — FICPACT CUP',
        },
        issuer: {
          en: 'BEM Faculty of Computer Science · Soegijapranata Catholic University',
          id: 'BEM Fakultas Ilmu Komputer · Universitas Katolik Soegijapranata',
        },
        issueDate: 'Apr 2026',
        role: 'UI/UX Designer & Frontend Developer',
        result: {
          en: 'Participant',
          id: 'Peserta Lomba',
        },
        credentialUrl: '',
      },
    ],
    // Kategori ringkas tanpa duplikasi antar seksi Skills dan Tools & Technologies
    skillGroups: [
      {
        category: 'UI/UX',
        items: [
          'Figma',
          'UX Research',
          'Wireframing',
          'Prototyping',
          'Design Systems',
        ],
      },
      {
        category: 'Additional',
        items: [
          'Application Support',
          'API Integration',
          'Technical Documentation',
        ],
      },
    ],
    toolGroups: [
      {
        category: 'Frontend',
        items: [
          'React',
          'Next.js',
          'Vue.js',
          'JavaScript',
          'Tailwind CSS',
          'Bootstrap',
        ],
      },
      {
        category: 'Backend & Database',
        items: [
          'Node.js',
          'Laravel',
          'PHP (Native)',
          'Django',
          'MySQL',
          'SQLite',
          'Supabase',
          'Firebase',
        ],
      },
      {
        category: 'Tools',
        items: ['Git', 'GitHub', 'Postman', 'DBeaver'],
      },
    ],
  },
}

function isBilingualLeaf(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return false
  const keys = Object.keys(node)
  return (
    keys.length > 0 &&
    keys.length <= 2 &&
    keys.every((key) => key === 'en' || key === 'id')
  )
}

function resolveLocalized(node, lang) {
  if (node === null || node === undefined || typeof node !== 'object') {
    return node
  }

  if (Array.isArray(node)) {
    return node.map((item) => resolveLocalized(item, lang))
  }

  if (isBilingualLeaf(node)) {
    return node[lang] ?? node.en ?? node.id
  }

  const resolved = {}
  for (const [key, value] of Object.entries(node)) {
    resolved[key] = resolveLocalized(value, lang)
  }
  return resolved
}

/**
 * Returns localized portfolio data for the active UI language ('en' or 'id').
 */
export function getPortfolioData(language = 'en') {
  const lang = language === 'id' ? 'id' : 'en'
  return resolveLocalized(RAW_PORTFOLIO_DATA, lang)
}

/**
 * Default English export used as fallback prop values across UI components.
 */
export const portfolioData = getPortfolioData('en')
