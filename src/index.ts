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