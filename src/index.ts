import * as readlineSync from 'readline-sync';

// ============================================================================
// 1. DEFINISI STRUKTUR DATA (ENTITAS UTAMA)
// ============================================================================
interface TransaksiTiket {
  idTransaksi: string;
  namaPembeli: string;
  kategoriTiket: string;    // 'VIP' | 'CAT 1' | 'Festival'
  fasePenjualan: string;    // 'Presale' | 'Normal'
  beliKaos: boolean;        // true jika membeli kaos official
  metodePembayaran: string; // 'Transfer Bank' | 'E-Wallet' | 'Kartu Kredit'
  hargaTiket: number;
  hargaKaos: number;
  biayaAdmin: number;
  totalBayar: number;
}

// Array utama untuk menyimpan seluruh riwayat transaksi tiket konser
const daftarTransaksi: TransaksiTiket[] = [];

// ============================================================================
// 2. KUMPULAN FUNGSI BERTIPE (MENERAPKAN LOGIKA KODE UTS)
// ============================================================================

/**
 * Fungsi 1: Menghitung harga dasar tiket sesuai aturan kategori & fase pada kode UTS
 */
function hitungHargaTiket(pilihanKategori: number, pilihanFase: number): number {
  if (pilihanKategori === 1) {
    // Kategori VIP: Presale Rp 1.500.000, Normal Rp 2.000.000
    if (pilihanFase === 1) {
      return 1500000;
    } else if (pilihanFase === 2) {
      return 2000000;
    } else {
      return 0;
    }
  } else if (pilihanKategori === 2) {
    // Kategori CAT 1
    return 1000000;
  } else if (pilihanKategori === 3) {
    // Kategori Festival
    return 500000;
  } else {
    return 0;
  }
}

/**
 * Fungsi 2: Menghitung harga kaos official (khusus pembeli VIP sesuai logika UTS)
 */
function hitungHargaKaos(pilihanKategori: number, mauBeliKaos: boolean, pilihanFase: number): number {
  if (pilihanKategori === 1 && mauBeliKaos === true) {
    return pilihanFase === 1 ? 150000 : 250000;
  }
  return 0;
}

/**
 * Fungsi 3: Menghitung biaya admin sesuai metode pembayaran pada kode UTS
 */
function hitungBiayaAdmin(pilihanBayar: number): number {
  switch (pilihanBayar) {
    case 1:
      return 5000;  // Transfer Bank
    case 2:
      return 2000;  // E-Wallet
    case 3:
      return 10000; // Kartu Kredit
    default:
      return 0;
  }
}

/**
 * Fungsi 4: Menghitung total keseluruhan pembayaran menggunakan operator penjumlahan
 */
function hitungTotalBayar(hargaTiket: number, hargaKaos: number, biayaAdmin: number): number {
  let totalBayar: number = 0;
  totalBayar += hargaTiket;
  totalBayar += hargaKaos;
  totalBayar += biayaAdmin;
  return totalBayar;
}

/**
 * Fungsi 5: Menampilkan header & daftar menu utama kasir
 */
function tampilkanMenuUtama(): void {
  console.log('\n==========================================');
  console.log('   SELAMAT DATANG DI KASIR TIKET KONSER   ');
  console.log('      FESTIVAL MUSIK NIKMATI SUARA        ');
  console.log('==========================================');
  console.log('1. [Create] Tambah Transaksi Pemesanan Tiket');
  console.log('2. [Read]   Tampilkan Semua Riwayat Transaksi');
  console.log('3. [Update] Ubah Data Transaksi');
  console.log('4. [Delete] Hapus / Batalkan Transaksi');
  console.log('5. [Search] Cari Transaksi');
  console.log('0. Keluar dari Program');
  console.log('==========================================');
}

// ============================================================================
// 3. IMPLEMENTASI FITUR MENU (INTEGRASI KODE UTS KE MENU CREATE)
// ============================================================================

/**
 * Menu 1 (Create): Menjalankan alur input pemesanan & cetak struk dari kode UTS
 */
function menuTambahTransaksi(): void {
  console.log('\n--- TAMBAH TRANSAKSI PEMESANAN TIKET ---');
  const namaPembeli: string = readlineSync.question('Masukkan Nama Anda: ');

  console.log('\nPilih Kategori Tiket:');
  console.log('1. VIP (Rp 1.500.000 / Rp 2.000.000)');
  console.log('2. CAT 1 (Rp 1.000.000)');
  console.log('3. Festival (Rp 500.000)');
  const pilihanKategori: number = readlineSync.questionInt('Masukkan pilihan kategori (1-3): ');

  console.log('\nPilih Fase Penjualan Tiket:');
  console.log('1. Presale (Promo)');
  console.log('2. Normal');
  const pilihanFase: number = readlineSync.questionInt('Masukkan pilihan fase (1-2): ');

  const inputKaos: string = readlineSync.question('\nApakah ingin beli Kaos Official? (y/n): ');
  const mauBeliKaos: boolean = inputKaos.toLowerCase() === 'y';

  console.log('\nPilih Metode Pembayaran:');
  console.log('1. Transfer Bank (Biaya Admin Rp 5.000)');
  console.log('2. E-Wallet (Biaya Admin Rp 2.000)');
  console.log('3. Kartu Kredit (Biaya Admin Rp 10.000)');
  const pilihanBayar: number = readlineSync.questionInt('Masukkan pilihan pembayaran (1-3): ');

  // Memanggil fungsi-fungsi kalkulasi bertipe
  const hargaTiket: number = hitungHargaTiket(pilihanKategori, pilihanFase);
  const hargaKaos: number = hitungHargaKaos(pilihanKategori, mauBeliKaos, pilihanFase);
  const biayaAdmin: number = hitungBiayaAdmin(pilihanBayar);
  const totalBayar: number = hitungTotalBayar(hargaTiket, hargaKaos, biayaAdmin);

  // Konversi nomor pilihan menjadi teks label untuk disimpan ke objek TransaksiTiket
  const labelKategori: string =
    pilihanKategori === 1 ? 'VIP' : pilihanKategori === 2 ? 'CAT 1' : pilihanKategori === 3 ? 'Festival' : 'Tidak Valid';
  const labelFase: string =
    pilihanFase === 1 ? 'Presale' : pilihanFase === 2 ? 'Normal' : 'Tidak Valid';
  const labelBayar: string =
    pilihanBayar === 1 ? 'Transfer Bank' : pilihanBayar === 2 ? 'E-Wallet' : pilihanBayar === 3 ? 'Kartu Kredit' : 'Tidak Valid';

  // Membuat ID transaksi otomatis (TRX-001, TRX-002, dst.)
  const idTransaksi: string = `TRX-${String(daftarTransaksi.length + 1).padStart(3, '0')}`;

  // Menyimpan data transaksi baru ke dalam array daftarTransaksi
  const transaksiBaru: TransaksiTiket = {
    idTransaksi,
    namaPembeli,
    kategoriTiket: labelKategori,
    fasePenjualan: labelFase,
    beliKaos: mauBeliKaos,
    metodePembayaran: labelBayar,
    hargaTiket,
    hargaKaos,
    biayaAdmin,
    totalBayar,
  };
  daftarTransaksi.push(transaksiBaru);

  // Menampilkan struk pembayaran (persis format UTS)
  console.log('\n==========================================');
  console.log(`Halo Kak ${namaPembeli}, berikut rincian pesanan Anda:`);
  console.log('==========================================');
  console.log(`ID Transaksi   : ${idTransaksi}`);
  console.log(`Kategori Tiket : ${labelKategori}`);
  console.log(`Fase Tiket     : ${labelFase}`);
  console.log(`Bonus Kaos     : ${hargaKaos > 0 ? 'Ya' : 'Tidak Beli'}`);
  console.log(`Cara Pembayaran: ${labelBayar}`);
  console.log('------------------------------------------');
  console.log('            RINCIAN PEMBAYARAN            ');
  console.log('------------------------------------------');
  console.log(`Nama Pembeli : ${namaPembeli}`);
  console.log(`Harga Tiket  : Rp ${hargaTiket}`);
  console.log(`Harga Kaos   : Rp ${hargaKaos}`);
  console.log(`Biaya Admin  : Rp ${biayaAdmin}`);
  console.log('------------------------------------------');
  console.log(`TOTAL BAYAR  : Rp ${totalBayar}`);
  console.log('==========================================');
  console.log('    Terima kasih sudah membeli tiket!     ');
  console.log('==========================================');
}

// Kerangka fungsi Read, Update, Delete, Search (untuk dikembangkan penuh pada Progress 3)
function menuTampilkanTransaksi(): void {
  console.log(`\n>> [INFO] Jumlah transaksi tersimpan saat ini: ${daftarTransaksi.length} data.`);
}

function menuUbahTransaksi(): void {
  console.log('\n>> [INFO] Fitur Ubah Transaksi (Update) akan dilengkapi pada Progress 3.');
}

function menuHapusTransaksi(): void {
  console.log('\n>> [INFO] Fitur Hapus Transaksi (Delete) akan dilengkapi pada Progress 3.');
}

function menuCariTransaksi(): void {
  console.log('\n>> [INFO] Fitur Cari Transaksi (Search) akan dilengkapi pada Progress 3.');
}

// ============================================================================
// 4. PROGRAM UTAMA (LOOP MENU UTAMA & VALIDASI INPUT)
// ============================================================================
function main(): void {
  let sedangBerjalan: boolean = true;

  // Loop menu utama berjalan terus sampai kasir memilih keluar (0)
  while (sedangBerjalan) {
    tampilkanMenuUtama();
    const pilihanMenu: string = readlineSync.question('Pilih menu (0-5): ').trim();

    switch (pilihanMenu) {
      case '1':
        menuTambahTransaksi();
        break;
      case '2':
        menuTampilkanTransaksi();
        break;
      case '3':
        menuUbahTransaksi();
        break;
      case '4':
        menuHapusTransaksi();
        break;
      case '5':
        menuCariTransaksi();
        break;
      case '0':
        console.log('\nTerima kasih telah menggunakan Sistem Kasir "Nikmati Suara". Sampai jumpa!');
        sedangBerjalan = false;
        break;
      default:
        console.log(`\n[ERROR] Pilihan "${pilihanMenu}" tidak valid! Silakan masukkan angka 0 sampai 5.`);
        break;
    }
  }
}

// Menjalankan aplikasi
main();