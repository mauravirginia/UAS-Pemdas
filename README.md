# Sistem Kasir Tiket Konser Musik "Nikmati Suara"

**Kelas / Kelompok:** T1B / Kelompok-8  
**Link Repository:** https://github.com/mauravirginia/UAS-Pemdas  
**Link Laporan (Google Docs):** [Buka Laporan UAS Kelompok 8](https://docs.google.com/document/d/1vSMgqZCG28D9ObFLMD45E0c3lVbPI5bb/edit?usp=sharing&ouid=116706816203598976258&rtpof=true&sd=true) | [Folder `docs/`](./docs/)  
**Mata Kuliah:** Pemrograman Dasar  
**Tahun Akademik:** 2026/2027  

---

## A. Daftar Anggota & Pembagian Tugas Utama

| No. | Nama Anggota | NIM | Akun GitHub | Branch Kerja (Progress 2) | Tanggung Jawab Utama & Fitur |
|---|---|---|---|---|---|
| 1 | Maura Virginia Alfareza | `263140701111001` | `@mauravirginia` | `fitur-struktur-hitung-tiket` | Pengelolaan repository GitHub (`develop` & `main`), konfigurasi awal project, dokumentasi `README.md`, perancangan struktur data (`interface TransaksiTiket`) & fungsi kalkulasi harga tiket/kaos (`hitungHargaTiket`, `hitungHargaKaos`, `tambahSeed`, `isiDataAwal`), serta pengembangan fitur **Create** & **Update**. |
| 2 | Trinanda Grace Tampubolon | `263140700111046` | `@trinandagrace` | `fitur-hitung-admin-total` | Perancangan dan pembuatan **Flowchart alur menu utama** (BAB II Gambar 2.1 & Sub-bab 2.2), implementasi fungsi kalkulasi biaya admin, total bayar, & operator (`hitungBiayaAdmin`, `hitungTotalBayar`, `cekTotalValid`, `hitungPersenHemat`, `hitungRataRata`, `tentukanLoket`), serta pengembangan fitur **Read** & **Search**. |
| 3 | Jon Kevin Prayoga Purba | `263140700111040` | `@KevinnPrayogga7` | `fitur-menu-utama` | Penyusunan dan pembaruan **draf laporan** di folder `docs/` (BAB I Sub-bab 1.3–1.5, Tabel 3.1, Tabel Kontribusi 3.2, serta Screenshot No. 1), perancangan tampilan & *loop* menu utama (`tampilkanWelcome`, `tampilkanMenuUtama`, `mainMenu`), serta pengembangan fitur **Delete**. |

**Pembagian Tugas Anggota pada Progress 2 (Kolaborasi Branch per Fitur):**
- **Maura (`@mauravirginia` — Branch `fitur-struktur-hitung-tiket`):**
  - Mendefinisikan struktur data (`Kategori`, `Fase`, `Metode`, `interface TransaksiTiket`, dan array `daftarTransaksi`) serta mengimplementasikan fungsi bertipe & data awal (`hitungHargaTiket()`, `hitungHargaKaos()`, `tambahSeed()`, dan `isiDataAwal()`).
  - Mengelola alur *Pull Request*, me-*review* dan menggabungkan *branch* anggota ke `develop`, melakukan *merge* final ke `main`, serta memperbarui `README.md`.
- **Nanda (`@trinandagrace` — Branch `fitur-hitung-admin-total`):**
  - Merancang dan membuat **Flowchart Alur Menu Utama** (termasuk *loop* menu hingga keluar dan validasi input) untuk **BAB II (Gambar 2.1)** pada laporan.
  - Mengimplementasikan fungsi bertipe untuk kalkulasi biaya admin, total bayar, validasi, dan statistik operator (`hitungBiayaAdmin()`, `hitungTotalBayar()`, `cekTotalValid()`, `hitungPersenHemat()`, `hitungRataRata()`, dan `tentukanLoket()`).
- **Kevin (`@KevinnPrayogga7` — Branch `fitur-menu-utama`):**
  - Menyusun dan memperbarui **draf laporan di `docs/`** (melengkapi BAB I Sub-bab 1.3–1.5, penjelasan Sub-bab 2.2, pemetaan baris kode pada Tabel 3.1, pembaruan Tabel Kontribusi 3.2 dengan link PR, serta mengunggah file `.docx` terbaru ke `docs/`).
  - Mengimplementasikan tampilan antarmuka (`tampilkanWelcome()`, `tampilkanMenuUtama()`), perulangan `do...while` pada `mainMenu()` dengan penanganan input tidak valid, kerangka fungsi CRUD + Search, serta mengambil **Screenshot No. 1**.

---

## B. Proposal & Analisis Awal

### 1. Tema & Deskripsi Masalah
- **Tema:** Sistem Kasir & Manajemen Pemesanan Tiket Konser Musik "Nikmati Suara" Berbasis Console (TypeScript).
- **Deskripsi Masalah:** Penyelenggara festival musik "Nikmati Suara" membutuhkan aplikasi kasir berbasis teks (*command-line*) yang praktis untuk memproses dan mengelola data pemesanan tiket secara terstruktur. Selain menghitung total pembayaran otomatis berdasarkan kategori tempat duduk (**VIP, CAT 1, Festival**), fase penjualan (**Presale/Normal**), tambahan **kaos official**, serta **biaya admin metode pembayaran** (Transfer Bank, E-Wallet, Kartu Kredit), kasir juga membutuhkan fitur pengelolaan riwayat transaksi (**CRUD + Search**) agar pencatatan penjualan dan pembaruan data pembeli dapat dilakukan dengan cepat tanpa kesalahan hitung manual.

### 2. Aturan Bisnis & Matriks Harga (Fondasi Logika UTS)
Sistem menerapkan aturan perhitungan biaya yang diadaptasi dari logika kasir UTS:

| Kategori Tiket | Fase Presale | Fase Normal | Opsi Kaos Official | Biaya Admin Pembayaran |
|---|---|---|---|---|
| **VIP** | Rp 1.500.000 | Rp 2.000.000 | Presale: Rp 150.000 / Normal: Rp 250.000 | **Transfer Bank:** Rp 5.000 |
| **CAT 1** | Rp 1.000.000 | Rp 1.000.000 | Tidak tersedia (Rp 0) | **E-Wallet:** Rp 2.000 |
| **Festival** | Rp 500.000 | Rp 500.000 | Tidak tersedia (Rp 0) | **Kartu Kredit:** Rp 10.000 |

---

## C. Desain Struktur Data, Interface Menu, & Arsitektur Fungsi

### 1. Definisi Interface Utama (`TransaksiTiket`)
Seluruh data transaksi pemesanan tiket disimpan dalam array `daftarTransaksi: TransaksiTiket[]` dengan struktur tipe data berikut:

type Kategori = 'VIP' | 'CAT 1' | 'Festival';
type Fase = 'Presale' | 'Normal' | '-';
type Metode = 'Transfer Bank' | 'E-Wallet' | 'Kartu Kredit';

interface TransaksiTiket {
  id: number;          // Kode unik transaksi otomatis (contoh: 1, 2, 3)
  nama: string;        // Nama lengkap pembeli tiket
  kategori: Kategori;  // "VIP" | "CAT 1" | "Festival"
  fase: Fase;          // "Presale" | "Normal" | "-"
  beliKaos: boolean;   // true jika membeli kaos official, false jika tidak
  metode: Metode;      // "Transfer Bank" | "E-Wallet" | "Kartu Kredit"
  hargaTiket: number;  // Harga dasar tiket sesuai kategori & fase
  hargaKaos: number;   // Harga kaos official (khusus pembeli VIP)
  biayaAdmin: number;  // Biaya admin sesuai metode pembayaran
  total: number;       // Akumulasi (hargaTiket + hargaKaos + biayaAdmin)
}
