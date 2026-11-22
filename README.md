# Sistem Kasir Tiket Konser Musik "Nikmati Suara" (CLI)

**Kelas / Kelompok:** T1B / Kelompok-8ASIK 
**Link Repository:** https://github.com/mauravirginia/UAS-Pemdas
**Mata Kuliah:** Pemrograman Dasar  
**Tahun Akademik:** 2026/2027  

---

## A. Daftar Anggota & Pembagian Tugas

| No. | Nama Anggota | NIM | Akun GitHub | Tugas dan Tanggung Jawab |
|---|---|---|---|---|
| 1 | Maura Virginia Alfareza | `263140701111001` | `@mauravirginia` | Bertanggung jawab dalam pengelolaan repository GitHub, konfigurasi awal project (`.gitignore`, `tsconfig.json`, `package.json`), analisis permasalahan, Dokumentasi project (`README.md` & draft laporan) serta pengembangan fitur **Create** & **Update** transaksi/tiket. |
| 2 | Trinanda Grace Tampubolon | `263140700111046` | `@trinandagrace` | Bertanggung jawab dalam penyusunan proposal/ Laporan, identifikasi entitas dan properti data, serta pengembangan fitur **Read** & **Search** riwayat pemesanan. |
| 3 | Jon Kevin Prayoga Purba | `2263140700111040` | `@KevinPrayogga7` | Bertanggung jawab dalam pencatatan kontribusi anggota, pengembangan fitur **Delete** & kalkulasi biaya, serta pengujian program bisa berjalan atau tidak. |

---

## B. Proposal & Analisis Awal

### 1. Tema & Deskripsi Masalah
* **Tema:** Sistem Kasir & Manajemen Pemesanan Tiket Konser Musik "Nikmati Suara" Berbasis Console (TypeScript).
* **Deskripsi Masalah:** Penyelenggara festival musik "Nikmati Suara" membutuhkan aplikasi kasir berbasis teks (*command-line*) yang praktis untuk memproses dan mengelola data pemesanan tiket secara terstruktur. Selain menghitung total pembayaran otomatis berdasarkan kategori tempat duduk (**VIP, CAT 1, Festival**), fase penjualan (**Presale/Normal**), tambahan **kaos merchandise**, serta **biaya admin metode pembayaran** (Transfer Bank, E-Wallet, Kartu Kredit), kasir juga membutuhkan fitur pengelolaan riwayat transaksi (**CRUD + Search**) agar pencatatan penjualan dan pembaruan data pembeli dapat dilakukan dengan cepat tanpa kesalahan hitung manual.

### 2. Identifikasi Entitas & Properti Data
**Entitas Utama: `TransaksiTiket`**
* `idTransaksi`: `string` — Kode unik transaksi (contoh: `TRX-001`)
* `namaPembeli`: `string` — Nama lengkap pembeli tiket
* `kategoriTiket`: `string` — Pilihan area tempat duduk (`VIP`, `CAT 1`, atau `Festival`)
* `fasePenjualan`: `string` — Fase pembelian tiket (`Presale` atau `Normal`)
* `beliKaos`: `boolean` — Status pembelian kaos *merchandise* (`true` / `false`)
* `metodePembayaran`: `string` — Metode pembayaran (`Transfer Bank`, `E-Wallet`, atau `Kartu Kredit`)
* `hargaTiket`: `number` — Harga tiket dasar sesuai kategori dan fase penjualan
* `hargaKaos`: `number` — Harga kaos (*promo* Rp 150.000 saat Presale atau Rp 250.000 saat Normal; Rp 0 jika tidak beli)
* `biayaAdmin`: `number` — Biaya admin metode pembayaran (Bank: Rp 5.000, E-Wallet: Rp 2.000, Kartu Kredit: Rp 10.000)
* `totalBayar`: `number` — Akumulasi total pembayaran (`hargaTiket + hargaKaos + biayaAdmin`)

### 3. Daftar Fitur Utama (CRUD + Search) & Decomposition Awal
1. **Create (Tambah Transaksi Pemesanan Tiket):**
   * Menerima input data pembeli, kategori tiket, fase penjualan, opsi kaos *merchandise*, dan metode pembayaran.
   * Menjalankan sub-proses kalkulasi harga tiket dasar, promo kaos (khusus Presale), biaya admin, dan total bayar secara otomatis, lalu menyimpan transaksi ke dalam daftar/array dan mencetak struk.
2. **Read (Tampilkan Semua Riwayat Transaksi):**
   * Menampilkan seluruh daftar transaksi tiket yang sudah tercatat beserta rincian kategori, status kaos, metode pembayaran, dan total pendapatan.
3. **Update (Ubah Data Transaksi):**
   * Mencari transaksi berdasarkan `idTransaksi`, memungkinkan kasir memperbarui data (seperti perubahan kategori tiket, status pembelian kaos, atau metode pembayaran), lalu menghitung ulang `totalBayar` secara otomatis.
4. **Delete (Hapus / Batalkan Transaksi):**
   * Menghapus data transaksi berdasarkan `idTransaksi` apabila terjadi pembatalan pesanan oleh pembeli (disertai konfirmasi sebelum menghapus).
5. **Search (Cari Transaksi):**
   * Mencari data pemesanan berdasarkan **ID Transaksi**, **Nama Pembeli**, atau filter **Kategori Tiket** (`VIP` / `CAT 1` / `Festival`).

---

## C. Rencana Pengembangan Project
Pengembangan project dilakukan melalui beberapa tahapan:
1. Persiapan repository public dan konfigurasi awal TypeScript (`.gitignore`, `tsconfig.json`, `package.json`, `src/index.ts`).
2. Penyusunan proposal, analisis permasalahan, serta draft awal laporan (Sampul, Sub-bab 1.1, 1.2, dan rencana 3.2) di folder `docs/`.
3. Perancangan struktur data (`interface`/`type` `TransaksiTiket`) dan alur logika program (*decomposition*).
4. Implementasi fitur CRUD + Search serta integrasi logika perhitungan kasir dari versi UTS.
5. Pengujian dan evaluasi program pada seluruh skenario input dan validasi.
6. Penyusunan dokumentasi akhir dan laporan UAS.

---

## D. Progress Pengerjaan

### Progress 1
- [X] Membuat repository GitHub dengan visibilitas **Public**.
- [X] Menyiapkan struktur awal project (`.gitignore`, `tsconfig.json`, `package.json`, dan `src/index.ts`).
- [X] Menyiapkan program `"Hello console/world"` di `src/index.ts` dan memastikan dapat dijalankan oleh semua anggota.
- [X] Setiap anggota melakukan minimal 1 *commit* menggunakan akun GitHub masing-masing.
- [ ] Melengkapi `README.md` awal (daftar anggota, NIM, akun GitHub, dan tabel pembagian tugas).
- [ ] Mengunggah proposal & analisis awal (tema, deskripsi masalah, entitas & properti, fitur CRUD + Search, *decomposition* awal) pada `docs/` atau `README.md`.
- [ ] Menyimpan draft awal laporan (Halaman Sampul, Sub-bab 1.1, 1.2 awal, dan rencana tabel kontribusi 3.2) di folder `docs/` pada *branch* `main`.