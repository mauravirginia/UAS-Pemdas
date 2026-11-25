# Sistem Kasir Tiket Konser Musik "Nikmati Suara"

**Kelas / Kelompok:** T1B / Kelompok-8  
**Link Repository:** https://github.com/mauravirginia/UAS-Pemdas  
**Link Laporan (Google Docs):** [Buka Laporan UAS Kelompok 8](https://docs.google.com/document/d/1vSMgqZCG28D9ObFLMD45E0c3lVbPI5bb/edit?usp=sharing&ouid=116706816203598976258&rtpof=true&sd=true) | [Folder `docs/`](./docs/)  
**Mata Kuliah:** Pemrograman Dasar  
**Tahun Akademik:** 2026/2027  

---

## A. Daftar Anggota & Pembagian Tugas

| No. | Nama Anggota | NIM | Akun GitHub | Branch Kerja | Tugas dan Tanggung Jawab |
|---|---|---|---|---|---|
| 1 | Maura Virginia Alfareza | `263140701111001` | `@mauravirginia` | `fitur-struktur-hitung-tiket` | Pengelolaan repository GitHub, konfigurasi awal project, dokumentasi (`README.md` & laporan), perancangan `interface TransaksiTiket`, fungsi kalkulasi harga tiket & kaos (`hitungHargaTiket`, `hitungHargaKaos`), serta pengembangan fitur **Create** & **Update**. |
| 2 | Trinanda Grace Tampubolon | `263140700111046` | `@trinandagrace` | `fitur-hitung-admin-total` | Penyusunan proposal & laporan, fungsi kalkulasi biaya admin & total pembayaran (`hitungBiayaAdmin`, `hitungTotalBayar`), serta pengembangan fitur **Read** & **Search** riwayat pemesanan. |
| 3 | Jon Kevin Prayoga Purba | `263140700111040` | `@KevinnPrayogga7` | `fitur-menu-utama` | Pencatatan kontribusi anggota, perancangan tampilan & *loop* menu utama (`tampilkanMenuUtama`, `main`), pengembangan fitur **Delete**, serta pengujian alur program. |

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
interface TransaksiTiket {
  idTransaksi: string;      // Kode unik transaksi (contoh: "TRX-001")
  namaPembeli: string;      // Nama lengkap pembeli tiket
  kategoriTiket: string;    // "VIP" | "CAT 1" | "Festival"
  fasePenjualan: string;    // "Presale" | "Normal"
  beliKaos: boolean;        // true jika membeli kaos official, false jika tidak
  metodePembayaran: string; // "Transfer Bank" | "E-Wallet" | "Kartu Kredit"
  hargaTiket: number;       // Harga dasar tiket sesuai kategori & fase
  hargaKaos: number;        // Harga kaos official (khusus pembeli VIP)
  biayaAdmin: number;       // Biaya admin sesuai metode pembayaran
  totalBayar: number;       // Akumulasi (hargaTiket + hargaKaos + biayaAdmin)
}
