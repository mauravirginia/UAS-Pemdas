# Sistem Kasir Tiket Konser Musik "Nikmati Suara"

**Kelas / Kelompok:** T1B / Kelompok-8  
**Link Repository:** [https://github.com/mauravirginia/UAS-Pemdas](https://github.com/mauravirginia/UAS-Pemdas)  
**Link Laporan (Google Docs):** [Buka Laporan UAS Kelompok 8](https://docs.google.com/document/d/1vSMgqZCG28D9ObFLMD45E0c3lVbPI5bb/edit?usp=sharing&ouid=116706816203598976258&rtpof=true&sd=true) | [Folder `docs/`](./docs/)  
**Mata Kuliah:** Pemrograman Dasar  
**Tahun Akademik:** 2026/2027  

---

## A. Daftar Anggota & Pembagian Tugas Per Progress

### 1. Progress 1 — Setup Repository, Proposal, & Draf Laporan Awal (23 November 2026)

| No. | Nama Anggota | NIM | Akun GitHub | Branch Kerja | Tugas dan Tanggung Jawab (Progress 1) |
|---|---|---|---|---|---|
| 1 | Maura Virginia Alfareza | `263140701111001` | `@mauravirginia` | `main` | Membuat repository GitHub public, menyiapkan konfigurasi awal project (`.gitignore`, `tsconfig.json`, `package.json`, `src/index.ts`), menyusun `README.md` awal, serta mengunggah draf laporan awal ke folder `docs/`. |
| 2 | Trinanda Grace Tampubolon | `263140700111046` | `@trinandagrace` | `main` | Merumuskan analisis permasalahan, mengidentifikasi entitas serta properti data `TransaksiTiket`, dan menyusun draf proposal (BAB I Sub-bab 1.1 Deskripsi Masalah & 1.2 Decomposition Awal). |
| 3 | Jon Kevin Prayoga Purba | `263140700111040` | `@KevinnPrayogga7` | `main` | Menjalankan uji coba program awal `"Hello console"` di lingkungan lokal serta menyusun rencana pembagian tugas pada Tabel Kontribusi Anggota (Sub-bab 3.2). |

---

### 2. Progress 2 — Flowchart Menu Utama, Fondasi Materi UTS, & Kerangka Menu (27 November 2026)

| No. | Nama Anggota | NIM | Akun GitHub | Branch Kerja | Tugas dan Tanggung Jawab (Progress 2) |
|---|---|---|---|---|---|
| 1 | Maura Virginia Alfareza | `263140701111001` | `@mauravirginia` | `fitur-struktur-hitung-tiket` | Perancangan struktur data (`Kategori`, `Fase`, `Metode`, `interface TransaksiTiket`, array `daftarTransaksi`), implementasi fungsi bertipe & data awal (`hitungHargaTiket`, `hitungHargaKaos`, `tambahSeed`, `isiDataAwal`), manajemen *Pull Request* (`develop` $\rightarrow$ `main`), serta pembaruan `README.md`. |
| 2 | Trinanda Grace Tampubolon | `263140700111046` | `@trinandagrace` | `fitur-hitung-admin-total` | Perancangan dan pembuatan **Flowchart alur menu utama** (BAB II Gambar 2.1) serta implementasi fungsi bertipe untuk kalkulasi biaya admin, total bayar, validasi, dan statistik operator (`hitungBiayaAdmin`, `hitungTotalBayar`, `cekTotalValid`, `hitungPersenHemat`, `hitungRataRata`, `tentukanLoket`). |
| 3 | Jon Kevin Prayoga Purba | `263140700111040` | `@KevinnPrayogga7` | `fitur-menu-utama` | Penyusunan dan pembaruan **draf laporan** di folder `docs/` (BAB I Sub-bab 1.3–1.5, Sub-bab 2.2, Tabel 3.1, Tabel Kontribusi 3.2), implementasi tampilan & *loop* menu utama (`tampilkanWelcome`, `tampilkanMenuUtama`, `mainMenu`), kerangka fungsi CRUD + Search, serta pengambilan **Screenshot No. 1**. |

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

```typescript
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