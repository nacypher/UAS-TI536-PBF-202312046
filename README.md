
# 📋 UAS-TI536-PBF: Sistem Pencatatan Aktivitas Harian

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node Version](https://img.shields.io/badge/node-%3E%3D14.0-green)

Aplikasi web untuk mencatat, mengelola, dan melacak aktivitas harian dengan antarmuka yang intuitif dan responsif.

---

## 📑 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Panduan Penggunaan](#panduan-penggunaan)
- [Struktur Folder](#struktur-folder)
- [Tangkapan Layar](#tangkapan-layar)
- [Kontribusi](#kontribusi)

---

## ✨ Fitur Utama

- ✅ Tambah, edit, dan hapus aktivitas harian
- ✅ Kategorisasi aktivitas
- ✅ Filter dan pencarian aktivitas
- ✅ Pengaturan prioritas tugas
- ✅ Dashboard ringkasan aktivitas
- ✅ Export data aktivitas
- ✅ Responsif di semua perangkat

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Frontend | HTML5, CSS3, JavaScript ES6+ |
| Framework | React / Vue.js *(sesuaikan* |
| Backend | Node.js, Express.js |
| Database | MongoDB / PostgreSQL |
| Tools | Git, npm/yarn, VS Code |

---

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** v14+ ([download](https://nodejs.org/))
- **npm** atau **yarn** (biasanya bawaan Node.js)
- **Git** ([download](https://git-scm.com/))
- **Database**: MongoDB atau PostgreSQL

---

## 🚀 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/nacypher/UAS-TI536-PBF-202312046.git
cd UAS-TI536-PBF-202312046
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment
```bash
cp .env.example .env
# Edit .env dengan konfigurasi database Anda
```

### 4. Jalankan Server
```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

---

## 📖 Panduan Penggunaan

1. **Dashboard**: Lihat ringkasan aktivitas hari ini
2. **Tambah Aktivitas**: Klik tombol "+" untuk membuat aktivitas baru
3. **Edit/Hapus**: Gunakan ikon edit atau hapus pada setiap item
4. **Filter**: Gunakan menu filter untuk menyaring aktivitas berdasarkan kategori

---

## 📁 Struktur Folder

```
UAS-TI536-PBF-202312046/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── public/
├── config/
├── .env.example
├── package.json
└── README.md
```

---

Kontribusi sangat diterima! Silakan fork repository dan buat pull request.

---

**© 2026 UAS-TI536-PBF. Semua hak dilindungi.**
