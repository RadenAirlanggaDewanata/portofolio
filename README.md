# Editorial Dark Portfolio Website (React + Tailwind CSS)

> **© 2026 R Airlangga Dewanata — Original Author & Maintainer**  
> Dirancang, dibangun, dikembangkan, dan didokumentasikan oleh **R Airlangga Dewanata** (`Fullstack Developer`).  
> GitHub: [`RadenAirlanggaDewanata`](https://github.com/RadenAirlanggaDewanata?tab=repositories) • LinkedIn: [`Raden Airlangga Dewanata`](https://www.linkedin.com/in/rd-airlanga-dewanata-72a5a8411/)

Website portfolio editorial bergaya *high-contrast dark mode* dengan palet **Deep Obsidian** (`#07090E`) dan aksen **Elegant Linear & Hexagonal Blue** (`#2563EB` & `#38BDF8`), lengkap dengan fitur dwibahasa (**EN & ID**), modal pratinjau **CV A4**, serta unduh **PDF ramah ATS** langsung.

Seluruh konten, teks terjemahan `EN`/`ID`, daftar proyek, pendidikan, keahlian, pengalaman kerja, kutipan, dan informasi kontak dipusatkan dalam **1 objek terpadu (`RAW_PORTFOLIO_DATA`)** di [`src/data/portfolioData.js`](src/data/portfolioData.js).

---

## 1. Peta Struktur Folder & File

```text
portofolio/
├── index.html                        # Pengaturan judul fallback, font Google, dan tema awal
├── package.json                      # Dependency (React, Vite, Tailwind CSS v4, Framer Motion, jsPDF, Lucide)
├── vite.config.js                    # Konfigurasi Vite + plugin Tailwind CSS
├── public/
│   ├── favicon.svg                   # Ikon tab browser
│   └── images/                       # 📁 TEMPAT SEMUA GAMBAR & MOCKUP SERAGAM
│       ├── profile.png               # Foto portrait utama di Hero Section
│       ├── project-hexagon.png       # Mockup tablet proyek #01
│       ├── project-mbgapp.png        # Mockup tablet proyek #02
│       ├── project-orbis.png         # Mockup tablet proyek #03
│       ├── cert-ficpact-webdev.png   # Mockup tablet sertifikat Web Dev (FICPACT CUP)
│       ├── mockup.png                # Gambar mockup perangkat di Footer
│       └── tools/                    # Ikon SVG lokal untuk tool (opsional)
└── src/
    ├── main.jsx                      # Entry point aplikasi React
    ├── index.css                     # Variabel warna, font custom, gradient biru, aturan cetak A4
    ├── App.jsx                       # Kerangka utama penyusun seluruh section halaman & Bento Grid
    ├── utils/
    │   ├── cvContent.js              # Normalizer data bersama untuk pratinjau CV & PDF
    │   └── generateCvPdf.js          # Generator file .pdf A4 vektor langsung via jsPDF
    ├── data/
    │   └── portfolioData.js          # ⭐ SATU FILE DATA TERPADU (INLINE BILINGUAL EN & ID)
    └── components/
        ├── Preloader.jsx             # Curtain preloader editorial (00%–100%) saat halaman dimuat
        ├── ScrollProgress.jsx        # Garis indikator progres scroll biru di bagian paling atas
        ├── Navbar.jsx                # Sticky header atas (role, tombol CV, EN/ID, mode Night/Light)
        ├── CvPreviewModal.jsx        # Modal pratinjau CV A4 dinamis (EN/ID) & unduh PDF langsung
        ├── HeroSection.jsx           # Teks raksasa PORTOFOLIO, foto tengah, bio kiri, stats kanan
        ├── ProjectsSection.jsx       # Grid 3 kolom Selected Projects + modal detail proyek
        ├── CertificationsSection.jsx # Grid & pratinjau sertifikasi terverifikasi + auto-counter header
        ├── EducationCard.jsx         # Kartu Bento Pendidikan
        ├── SkillsCard.jsx            # Kartu Bento Keahlian & Tools (resolver ikon otomatis)
        ├── WorkProcess.jsx           # Kartu Bento Pengalaman & Proses Kerja (01–05)
        ├── QuoteCard.jsx             # Kartu Bento Kutipan full-width
        └── ContactFooter.jsx         # Footer kontak + kartu tombol chat langsung WhatsApp (`wa.me`)
```

---

## 2. Panduan Cepat Mengedit Konten (`src/data/portfolioData.js`)

Website ini menggunakan format **Inline Bilingual** dalam satu blok data (`RAW_PORTFOLIO_DATA`). Anda **tidak perlu lagi mengedit 2 objek terpisah** saat menambah, mengubah, atau menghapus item:

- Jika teks berbeda antara Inggris dan Indonesia, tulis berdampingan di field yang sama:
  ```js
  title: {
    en: 'Corporate Website Redesign',
    id: 'Redesain Website Profil Perusahaan',
  }
  ```
- Jika nilainya sama untuk kedua bahasa (`id`, `year`, `client`, `image`, `tags`, `liveUrl`, `skills`, `tools`, email, nomor telepon), tulis cukup satu kali sebagai string/nilai biasa:
  ```js
  year: '2026',
  client: 'Amerta Teknologi Media',
  image: '/images/project-orbis.png',
  ```

| Bagian di `portfolioData.js` | Fungsi | Komponen Terkait |
| --- | --- | --- |
| `meta.pageTitle` | Judul tab browser | `App.jsx` |
| `header` | 2 baris identitas & peran di kiri atas header | `Navbar.jsx` |
| `hero` | Sapaan, nama besar, bio singkat, tagline, angka statistik, foto profil | `HeroSection.jsx` & CV |
| `projectsSection.items` | Daftar proyek (`id`, `title`, `category`, `year`, `client`, `image`, `summary`, `tags`, `liveUrl`, `featured`) | `ProjectsSection.jsx` & CV |
| `certificationsSection.items` | Daftar sertifikasi (`id`, `title`, `role`, `issuer`, `issueDate`, `credentialUrl`, `image`, `summary`) — otomatis terhitung ke badge header | `Navbar.jsx`, `CertificationsSection.jsx` & CV |
| `educationAndSkills` | Riwayat pendidikan, daftar `skills`, dan `tools` (mendukung slug SimpleIcons otomatis) | `EducationCard.jsx`, `SkillsCard.jsx` & CV |
| `workProcess.steps` | Daftar pengalaman / tahapan `01`–`05` beserta ikon (`Compass`, `Lightbulb`, `PenTool`, `Code2`, `Rocket`, `Layers`, `Sparkles`) | `WorkProcess.jsx` & CV |
| `quoteCard` | Kutipan, tanda tangan (`signature`), sub-peran, dan CTA opsional (`ctaText`, `ctaHref`) | `QuoteCard.jsx` |
| `contactFooter` | Judul ajakan kerja sama, pitch, daftar kontak (`Email`, `GitHub`, `LinkedIn`, `Phone`, `Location`), serta kartu CTA langsung ke WhatsApp (`wa.me`) | `ContactFooter.jsx` & CV |

> **Catatan Proyek Internal / Rahasia:**  
> Jika proyek bersifat internal perusahaan dan tidak boleh dipublikasikan link-nya, **hapus/jangan sertakan properti `liveUrl`** pada objek proyek tersebut. Tombol **`VISIT LIVE PROJECT →`** / **`KUNJUNGI PROYEK →`** di modal proyek otomatis tidak akan muncul.

---

## 3. Standar Mockup Gambar Proyek Seragam & Langkah Menambahkan Proyek Baru

Agar seluruh kartu di bagian **Selected Projects** tetap seragam, profesional, dan selaras dengan tema gelap obsidian, **setiap proyek baru wajib disertai gambar mockup** yang diletakkan di folder **`public/images/`**.

### A. Spesifikasi Template Mockup Seragam

Semua gambar thumbnail proyek (`project-hexagon.png`, `project-mbgapp.png`, `project-orbis.png`) mengikuti standar visual berikut:

1. **Lokasi & Penamaan File:**
   - Simpan di `public/images/project-<nama-singkat>.png` (contoh: `project-kasir.png`, `project-hris.png`).
   - Hindari spasi dan huruf kapital pada nama file.
2. **Format & Dimensi:**
   - Format `.png`, rasio landscape **`16:11`** atau **`3:2`** (rekomendasi **`1264×848 px`** hingga `1400×950 px`).
3. **Latar Belakang Studio:**
   - Permukaan datar gelap matte bernuansa **Deep Obsidian / Dark Slate** (`#07090E` – `#11151E`) bertekstur halus, lengkap dengan pencahayaan studio lembut (*subtle vignette*) dan bayangan lembut di bawah perangkat.
4. **Bingkai Perangkat (*Hardware Frame*):**
   - Posisi **flat-lay sejajar menghadap depan** (tidak miring/berperspektif ekstrem).
   - Tablet berbingkai **hitam matte tipis** dengan sudut membulat rapi dan titik kamera kecil di tengah bezel atas (seragam seperti `project-orbis.png`).
5. **Tampilan Layar UI:**
   - Tangkapan layar web/aplikasi ditempatkan bersih **memenuhi layar (*edge-to-edge*)** **tanpa tab/address bar browser** (Chrome/Edge) serta tanpa properti tambahan (tangan, meja berantakan, teks promosi di luar layar).

### B. Langkah-Langkah Menambahkan Proyek Baru + Gambar Mockup

1. **Siapkan Screenshot Aplikasi:**
   - Buka proyek web/aplikasi Anda pada resolusi desktop yang rapi (`1280×800` / `1440×900`) lalu ambil tangkapan layar UI utamanya tanpa tab/URL bar browser.
2. **Buat Mockup Seragam (`public/images/project-<slug>.png`):**
   - Pasangkan screenshot UI tersebut ke frame tablet matte-hitam di atas latar `#07090E`/`#11151E` berukuran landscape `16:11` (`1264×848 px`).
   - Jika Anda menggunakan AI image generator / asisten desain, gunakan template prompt standar ini:
     ```text
     Generate a 3:2 / 16:11 studio flat-lay product mockup matching the exact dark slate
     textured surface (#0D1117 / #11151E), lighting, shadow, and thin matte-black
     rounded-corner tablet hardware frame (with top-center camera dot) of
     public/images/project-orbis.png. Display the provided application UI screenshot
     cleanly edge-to-edge inside the tablet screen, removing any Chrome/browser URL bar
     or tabs, with razor-sharp UI typography and no hands or extra desk props.
     ```
   - Simpan hasil akhirnya ke **`public/images/project-<slug>.png`**.
3. **Daftarkan 1 Blok Data di `src/data/portfolioData.js`:**
   - Tambahkan blok baru ke dalam array `projectsSection.items` (cukup **1 blok** — kolom `{ en, id }` langsung berdampingan):
     ```js
     {
       id: '04',
       title: {
         en: 'Project Title in English',
         id: 'Judul Proyek dalam Bahasa Indonesia',
       },
       category: {
         en: 'UI/UX DESIGN & WEB DEVELOPMENT',
         id: 'DESAIN UI/UX & PENGEMBANGAN WEB',
       },
       year: '2026',
       client: 'Nama Klien / Perusahaan',
       image: '/images/project-<slug>.png', // 👈 Wajib sesuai nama file di public/images/
       summary: {
         en: 'Concise summary explaining role, technology, and impact.',
         id: 'Ringkasan singkat mengenai peran, teknologi yang digunakan, serta dampaknya.',
       },
       tags: ['React', 'Tailwind CSS', 'Node.js'],
       liveUrl: 'https://contoh-link-proyek.com', // Opsional: hapus baris ini jika proyek internal/rahasia
       featured: true, // true = tampil langsung (maks 3 utama), false = tampil saat "VIEW ALL PROJECTS"
     },
     ```
4. **Verifikasi Lokal:**
   - Jalankan `pnpm dev` dan periksa kartu proyek pada mode **EN** & **ID**, mode **Night** & **Light**, serta pratinjau/unduhan **CV PDF**.

### C. Langkah Mengedit & Menambahkan Sertifikasi (`certificationsSection`)

Semua data sertifikasi terpusat di objek **`certificationsSection`** dalam [`src/data/portfolioData.js`](src/data/portfolioData.js). Setiap perubahan atau penambahan otomatis memperbarui **badge counter di Header**, **kartu sertifikasi**, dan **format CV (Pratinjau & Unduh PDF)**.

#### 1. Mengedit Sertifikasi yang Sudah Ada
- Buka [`src/data/portfolioData.js`](src/data/portfolioData.js) dan cari bagian `certificationsSection.items`.
- Ubah field pada item terkait:
  - `title` — nama sertifikasi, kursus, atau kompetisi (dukung `{ en, id }`).
  - `role` — peran atau predikat/gelar pada sertifikat (misal `'UI/UX Designer & Frontend Developer'`).
  - `issuer` — lembaga penerbit (misal `'Dicoding'`, `'BNSP'`, `'Google'`, `'Coursera'`).
  - `issueDate` — bulan & tahun terbit (misal `'Nov 2025'`, `'Apr 2026'`).
  - `credentialUrl` — link verifikasi resmi; jika diisi `'https://...'`, tombol **`Verify Credential`** otomatis muncul di kartu, modal, dan CV PDF. Jika dikosongkan `''`, tombol disembunyikan.
  - `image` — path mockup tablet sertifikat di `public/images/` (misal `'/images/cert-ficpact-webdev.png'`).
  - `summary` — ringkasan singkat kegiatan/kompetensi untuk modal pratinjau & CV.

#### 2. Menambahkan Sertifikasi Baru
1. **Buat Mockup Tablet Seragam (`public/images/cert-<slug>.png`):**
   - Ambil file/gambar sertifikat asli, lalu kemas ke bingkai tablet hitam matte di atas latar `#07090E`/`#11151E` (`16:11`, `1264×848 px`) agar seragam seperti [`public/images/cert-ficpact-webdev.png`](public/images/cert-ficpact-webdev.png).
   - Jika menggunakan AI image generator, gunakan template prompt berikut:
     ```text
     Generate a crisp 3:2 / 16:11 flat-lay studio product mockup matching the dark
     obsidian textured surface (#0D1117 / #11151E) and thin matte-black rounded
     tablet frame of public/images/cert-ficpact-webdev.png. Display the provided
     certificate cleanly edge-to-edge inside the screen so all logos, names, dates,
     stamps, and signatures remain legible and unclipped, with no browser bar or hands.
     ```
   - Simpan hasilnya ke **`public/images/cert-<slug>.png`** (contoh: `public/images/cert-dicoding-frontend.png`).
2. **Tambahkan 1 Blok Baru di `certificationsSection.items` (`src/data/portfolioData.js`):**
   ```js
   {
     id: '02',
     title: {
       en: 'Full-Stack Web Development',
       id: 'Pengembangan Web Full-Stack',
     },
     role: 'Full-Stack Developer',
     issuer: 'Dicoding Indonesia',
     issueDate: 'Nov 2025',
     credentialUrl: 'https://www.dicoding.com/certificates/CONTOH123', // Kosongkan '' jika tidak ada link verifikasi
     image: '/images/cert-dicoding-frontend.png',
     summary: {
       en: 'Completed comprehensive training covering responsive UI design, REST API integration, and modern frontend architecture.',
       id: 'Menyelesaikan pelatihan komprehensif pengembangan UI responsif, integrasi REST API, dan arsitektur frontend modern.',
     },
   },
   ```
3. **Verifikasi Otomatis:**
   - Saat disimpan, counter sertifikasi di **Header (`Navbar.jsx`)** otomatis bertambah (`1` → `2`), kartu baru muncul di bagian **Certifications**, dan CV PDF (`EN` & `ID`) langsung memuat item baru tersebut.
   - Uji tampilan lokal via `pnpm dev`, lalu pastikan `pnpm lint` & `pnpm build` bersih sebelum push.

### D. Aset Gambar Lainnya (`public/images/`)

- **Foto Profil (`public/images/profile.png`):** Portrait vertikal (`3:4` atau `4:5`, min `800×1000 px`), direkomendasikan `.png` transparan (*cutout*) atau latar gelap.

---

## 4. Cara Mengubah Nomor Telepon, Template Chat & Hit API WhatsApp

Bagian kontak footer ([`src/components/ContactFooter.jsx`](src/components/ContactFooter.jsx)) menggunakan integrasi langsung ke API WhatsApp (`https://wa.me/...`) tanpa backend dan tanpa validasi ulang.

### A. Mengubah Nomor Telepon & Template Chat (`src/data/portfolioData.js`)

Jika ingin mengganti nomor HP/WhatsApp atau template pesan otomatisnya, ubah **2 bagian berikut** di objek `contactFooter` dalam [`src/data/portfolioData.js`](src/data/portfolioData.js):

1. **Kontak Telepon di Footer & CV PDF (`contactFooter.contacts`):**
   ```js
   {
     label: { en: 'Phone', id: 'Telepon' },
     value: '+62 821-3088-6720',      // Teks nomor yang ditampilkan di footer & CV
     href: 'tel:+6282130886720',      // Tautan panggilan langsung (juga dipakai sebagai fallback WA)
     icon: 'Phone',
   },
   ```
2. **Konfigurasi Kartu Tombol `Send WhatsApp` (`contactFooter.whatsappCard`):**
   ```js
   whatsappCard: {
     eyebrow: { en: 'INSTANT CONNECT', id: 'TERHUBUNG CEPAT' },
     title: { en: 'Fast Response via WhatsApp', id: 'Respon Cepat via WhatsApp' },
     description: {
       en: 'Prefer direct conversation? Start a WhatsApp chat right away for projects or collaboration.',
       id: 'Ingin diskusi lebih cepat? Langsung mulai chat WhatsApp untuk proyek maupun kolaborasi.',
     },
     statusBadge: { en: 'ONLINE', id: 'AKTIF' },
     displayNumber: '+62 821-3088-6720', // Nomor yang tampil di kartu footer
     whatsappNumber: '082130886720',     // Nomor tujuan API WhatsApp (boleh awalan 08... atau 62...)
     chatGreeting: 'Halo, mas airlangga', // Template chat tersembunyi (otomatis terisi saat klik)
     buttonLabel: { en: 'Send WhatsApp', id: 'Send WhatsApp' },
   },
   ```

> **Catatan Format Nomor & Template:**
> - Helper `normalizeWhatsappNumber` di [`ContactFooter.jsx`](src/components/ContactFooter.jsx) otomatis membersihkan spasi/`+`/`-` serta mengubah awalan `0` menjadi kode negara Indonesia `62` (contoh: `'082130886720'` otomatis menjadi `6282130886720`). Jika menggunakan nomor luar negeri, isi langsung dengan kode negaranya (misal `'65...'` atau `'1...'`).
> - Teks pada `chatGreeting` sengaja tidak ditampilkan di halaman web agar tampilan kartu tetap bersih, dan otomatis di-encode (`encodeURIComponent`) menjadi isi pesan awal saat tombol **`Send WhatsApp`** diklik.

### B. Mengubah Format URL Hit API WhatsApp (`src/components/ContactFooter.jsx`)

Secara default, komponen [`ContactFooter.jsx`](src/components/ContactFooter.jsx) membentuk URL tujuan pada variabel `whatsappUrl`:

```js
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(chatGreeting)}`
```

Jika ingin mengganti endpoint ke format alternatif WhatsApp resmi (misalnya `api.whatsapp.com/send`), cukup ubah baris `whatsappUrl` di [`src/components/ContactFooter.jsx`](src/components/ContactFooter.jsx):

```js
const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(chatGreeting)}`
```

Setelah selesai mengubah nomor atau URL, uji langsung menggunakan `pnpm dev` dan klik tombol **Send WhatsApp** pada bagian footer untuk memastikan aplikasi/WhatsApp Web terbuka dengan nomor dan pesan yang sesuai.

---

## 5. Warna & Tipografi (`src/index.css` & `index.html`)

- **Warna Utama & Gradasi Biru:** Diatur di [`src/index.css`](src/index.css):
  - Mode Gelap: latar `#07090E`, kartu `#0D1117`, border `#1E293B`.
  - Aksen Biru: `#2563EB` (*Royal Blue*) & `#38BDF8` (*Electric Sky Blue*) pada `.text-gradient-blue`, `.text-gradient-blue-hero`, `.hero-grad-*`, dan `--color-royal` / `--color-sky-electric`.
- **Jenis Huruf (Google Fonts):** Diatur di [`index.html`](index.html) dan `@theme` di [`src/index.css`](src/index.css) dengan **Plus Jakarta Sans** untuk seluruh teks UI dan **Bebas Neue** untuk teks display latar `PORTOFOLIO`.

---

## 6. Menggunakan Template Ini (`Git Branch`), Menjalankan & Build

Jika Anda ingin menggunakan template portfolio ini dari GitHub untuk personalisasi Anda sendiri, **buat branch baru terlebih dahulu** agar branch utama (`main`) template asli tetap bersih.

### Langkah 1 — Clone Repository

```bash
git clone <url-repository-github-ini>
cd portofolio
```

### Langkah 2 — Buat Branch Sendiri (`git branch` / `git switch`)

Jangan langsung mengedit di `main`. Buat dan pindah ke branch baru milik Anda sendiri:

```bash
# 1. Lihat daftar branch yang tersedia
git branch

# 2. Buat sekaligus pindah ke branch baru milik Anda sendiri
git checkout -b template/nama-anda
# (Atau gunakan perintah Git modern: git switch -c template/nama-anda)

# 3. Pastikan posisi branch sudah berpindah
git branch
```

### Langkah 3 — Install Dependencies & Jalankan Lokal

Anda dapat menggunakan `pnpm` (direkomendasikan sesuai `pnpm-lock.yaml`) maupun `npm`:

```bash
# 1. Install dependencies
pnpm install
# (Atau jika menggunakan npm: npm install)

# 2. Jalankan server development lokal
pnpm dev
# (Atau: npm run dev)

# 3. Cek kualitas kode & lint
pnpm lint
# (Atau: npm run lint)

# 4. Build versi production ke folder dist/
pnpm build
# (Atau: npm run build)
```

### Langkah 4 — Simpan Perubahan ke Branch Anda di GitHub

```bash
git add .
git commit -m "chore: customize portfolio template content"
git push -u origin template/nama-anda
```

> **Catatan Windows PowerShell:** Jika muncul pesan *execution policy* saat menjalankan `pnpm` atau `npm`, jalankan melalui Command Prompt (`cmd /c pnpm dev`).

---

## 7. Cara Update Tampilan & Tambah Proyek Setelah Website Sudah Online (Hosting)
 Setelah website dipublikasikan, Anda tetap bisa menambah proyek baru, memperbarui CV, mengubah teks, maupun merombak tampilan kapan saja. Caranya menyesuaikan metode hosting yang Anda pakai:

### Opsi A — Hosting Terhubung GitHub (*Auto-Deploy*: Vercel, Netlify, Cloudflare Pages)

Ini cara paling praktis karena website live otomatis ter-update setiap kali Anda melakukan `git push`:

1. **Ubah konten atau tampilan di komputer lokal** (misal menambah proyek di `src/data/portfolioData.js` + gambar mockup di `public/images/`, atau mengubah komponen di `src/components/`).
2. **Uji dulu di lokal sebelum di-push:**
   ```bash
   pnpm dev    # Cek visual di browser lokal (EN/ID & Night/Light)
   pnpm lint   # Pastikan 0 error
   pnpm build  # Pastikan build produksi sukses
   ```
3. **Commit & Push ke branch live GitHub** (misal `main` atau branch aktif Anda):
   ```bash
   git add .
   git commit -m "feat: update UI and add new project"
   git push origin main
   ```
4. Platform hosting otomatis mendeteksi *push* terbaru, membangun ulang folder `dist/`, dan menayangkan versi terbaru website Anda dalam beberapa puluh detik.

### Opsi B — Hosting Upload Manual / CLI (cPanel, Shared Hosting, Wrangler CLI)

1. Lakukan edit di lokal, lalu jalankan `pnpm lint` dan `pnpm build`.
2. Seluruh file siap tayang dihasilkan di folder **`dist/`** (bukan `src/`).
3. Unggah ulang isi folder **`dist/`** ke direktori web server (`public_html/`) atau deploy ulang lewat CLI masing-masing layanan (`npx wrangler deploy`, `npx vercel --prod`, dll).

> **Tips Penting Saat Update Live:**
> - Pastikan file gambar baru di `public/images/` ikut masuk saat `git add .` agar tidak muncul placeholder kosong di website live.
> - Jika Anda mengganti file gambar dengan nama yang sama persis (misal menimpa `profile.png`) namun belum berubah di browser karena *cache*, tekan **Hard Refresh (`Ctrl + Shift + R` / `Cmd + Shift + R`)** atau gunakan nama file baru lalu perbarui path-nya di `src/data/portfolioData.js`.

---

## 8. Hak Cipta & Atribusi Penulis (`Copyright`)

Seluruh rancangan antarmuka, arsitektur komponen React, sistem dwibahasa terpadu, generator CV PDF, dan dokumentasi proyek ini dibuat, dikembangkan, serta dicatat oleh:
  
- **Pengembang & Penulis Dokumentasi:** **R Airlangga Dewanata**
- **Hak Cipta:** **© 2026 R Airlangga Dewanata. All Rights Reserved.**

> Anda diperbolehkan melakukan *fork* atau membuat *branch* baru dari template ini untuk keperluan portfolio pribadi, dengan tetap menjaga atribusi/kredit pembuat asli kepada **R Airlangga Dewanata** pada dokumentasi proyek.
