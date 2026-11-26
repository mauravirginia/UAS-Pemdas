import readlineSync from 'readline-sync';
// ===== BLOK 1: TIPE DATA & HARGA TIKET (Maura) =====

// Tipe pilihan kategori tiket (hanya 3 nilai ini yang boleh dipakai)
type Kategori = 'VIP' | 'CAT 1' | 'Festival';
// Tipe fase penjualan ('-' berarti kategori tersebut tidak punya fase)
type Fase = 'Presale' | 'Normal' | '-';
// Tipe metode pembayaran
type Metode = 'Transfer Bank' | 'E-Wallet' | 'Kartu Kredit';

// Entitas data transaksi tiket beserta propertinya
interface TransaksiTiket {
  id: number;           // ID unik transaksi (number)
  nama: string;         // nama pembeli (string)
  kategori: Kategori;   // kategori tiket
  fase: Fase;           // fase penjualan
  beliKaos: boolean;    // true jika beli kaos official (boolean)
  metode: Metode;       // metode pembayaran
  hargaTiket: number;   // harga tiket
  hargaKaos: number;    // harga kaos (0 jika tidak beli)
  biayaAdmin: number;   // biaya admin sesuai metode bayar
  total: number;        // total yang harus dibayar
}

// Array penyimpan seluruh transaksi di memori
const daftarTransaksi: TransaksiTiket[] = [];
// Nama festival (nilai tetap, maka const)
const NAMA_FESTIVAL: string = 'Festival Musik Nikmati Suara';
// ID berikutnya akan berubah setiap ada data baru, maka pakai let
let idBerikutnya: number = 1;

// Fungsi menghitung harga tiket berdasarkan kategori dan fase (return number)
function hitungHargaTiket(kategori: Kategori, fase: Fase): number {
  let harga: number = 0; // penampung harga tiket
  // Switch: memilih harga berdasarkan kategori
  switch (kategori) {
    case 'VIP':
      // If-else: harga VIP tergantung fase penjualan
      if (fase === 'Presale') {
        harga = 1500000; // VIP presale (promo)
      } else if (fase === 'Normal') {
        harga = 2000000; // VIP normal
      }
      break;
    case 'CAT 1':
      harga = 1000000; // harga CAT 1
      break;
    case 'Festival':
      harga = 500000; // harga Festival
      break;
    default:
      harga = 0; // kategori tidak dikenal
      break;
  }
  return harga; // mengembalikan harga tiket
}

// Fungsi menghitung harga kaos official (return number)
// Nested 3 tingkat: switch -> if beliKaos -> if fase
function hitungHargaKaos(kategori: Kategori, fase: Fase, beliKaos: boolean): number {
  let harga: number = 0; // 0 jika tidak beli kaos
  switch (kategori) {            // tingkat 1
    case 'VIP':
      if (beliKaos) {            // tingkat 2: apakah mau kaos
        if (fase === 'Presale') { // tingkat 3: fase penjualan
          harga = 150000;         // kaos harga presale
        } else {
          harga = 250000;         // kaos harga normal
        }
      }
      break;
    case 'CAT 1':
      harga = 0; // kaos hanya untuk VIP
      break;
    case 'Festival':
      harga = 0; // kaos hanya untuk VIP
      break;
    default:
      harga = 0;
      break;
  }
  return harga; // mengembalikan harga kaos
}

// Fungsi menambah satu data seed ke array (void, tanpa return)
// Total dihitung sementara di sini; nanti boleh diganti fungsi buatan Nanda
function tambahSeed(nama: string, kategori: Kategori, fase: Fase, beliKaos: boolean,
  metode: Metode, biayaAdmin: number): void {
  const hargaTiket: number = hitungHargaTiket(kategori, fase);
  const hargaKaos: number = hitungHargaKaos(kategori, fase, beliKaos);
  let total: number = 0;
  total += hargaTiket;
  total += hargaKaos;
  total += biayaAdmin;
  // push: memasukkan data ke akhir array
  daftarTransaksi.push({
    id: idBerikutnya, nama, kategori, fase, beliKaos, metode,
    hargaTiket, hargaKaos, biayaAdmin, total,
  });
  idBerikutnya += 1; // siapkan id berikutnya (compound +=)
}

// Fungsi mengisi 5 data awal (seed) (void, tanpa parameter)
function isiDataAwal(): void {
  tambahSeed('Andi Saputra', 'VIP', 'Presale', true, 'Transfer Bank', 5000);
  tambahSeed('Budi Santoso', 'CAT 1', '-', false, 'E-Wallet', 2000);
  tambahSeed('Citra Dewi', 'Festival', '-', false, 'Kartu Kredit', 10000);
  tambahSeed('Dina Marlina', 'VIP', 'Normal', true, 'E-Wallet', 2000);
  tambahSeed('Eko Prasetyo', 'VIP', 'Normal', false, 'Transfer Bank', 5000);
}

// ---- TES SEMENTARA (hapus sebelum commit akhir) ----
// isiDataAwal();
// console.log(NAMA_FESTIVAL);
// console.log(daftarTransaksi);


// ===== BLOK 2: BIAYA ADMIN & TOTAL (Nanda) =====
// ===== BLOK 2: BIAYA ADMIN, TOTAL BAYAR & OPERATOR (Nanda) =====
// Catatan: blok ini memakai tipe Metode dan TransaksiTiket dari Blok 1 (Maura)

// Fungsi menentukan biaya admin dari metode pembayaran (return number)
function hitungBiayaAdmin(metode: Metode): number {
  let biaya: number = 0; // penampung biaya admin
  // Switch: 3 case + default, setiap case memakai break
  switch (metode) {
    case 'Transfer Bank':
      biaya = 5000;
      break;
    case 'E-Wallet':
      biaya = 2000;
      break;
    case 'Kartu Kredit':
      biaya = 10000;
      break;
    default:
      biaya = 0; // metode tidak dikenal
      break;
  }
  return biaya; // mengembalikan biaya admin
}

// Fungsi menghitung total bayar (return number)
// Operator: + (tambah), += (compound), > >= (perbandingan), && (logika)
function hitungTotalBayar(hargaTiket: number, hargaKaos: number, biayaAdmin: number): number {
  let total: number = 0; // total dimulai dari nol
  // If dengan 2 kondisi: hanya dihitung jika harga tiket valid dan admin tidak negatif
  if (hargaTiket > 0 && biayaAdmin >= 0) {
    total += hargaTiket; // tambah harga tiket
    total += hargaKaos;  // tambah harga kaos
    total += biayaAdmin; // tambah biaya admin
  }
  return total; // mengembalikan total bayar
}

// Fungsi memeriksa apakah total bayar masuk akal (return boolean)
// Operator: < <= !== (perbandingan), || dan ! (logika)
function cekTotalValid(total: number, hargaTiket: number): boolean {
  // Tidak valid jika total negatif ATAU harga tiket nol/negatif
  const tidakValid: boolean = total < 0 || hargaTiket <= 0;
  // Valid jika TIDAK tidak-valid, dan total bukan nol
  return !tidakValid && total !== 0;
}

// Fungsi menghitung selisih hemat VIP presale vs normal dalam persen (return number)
// Operator: -= , *= , /= (compound)
function hitungPersenHemat(): number {
  const hargaNormal: number = hitungHargaTiket('VIP', 'Normal');
  const hargaPresale: number = hitungHargaTiket('VIP', 'Presale');
  let hasil: number = hargaNormal;
  hasil -= hargaPresale;  // hasil = selisih harga (compound -=)
  hasil *= 100;           // dikali 100 untuk persen (compound *=)
  hasil /= hargaNormal;   // dibagi harga normal (compound /=)
  return hasil;           // contoh: 25 artinya hemat 25%
}

// Fungsi menghitung rata-rata total transaksi (return number)
// Operator: === (perbandingan), / (aritmatika), for...of (loop)
function hitungRataRata(data: TransaksiTiket[]): number {
  // Cegah pembagian dengan nol jika data kosong
  if (data.length === 0) {
    return 0;
  }
  let jumlah: number = 0;
  // for...of: menjumlahkan total setiap transaksi
  for (const t of data) {
    jumlah += t.total;
  }
  return Math.round(jumlah / data.length); // rata-rata = jumlah / banyak data
}

// Fungsi menentukan nomor loket dari id (return number)
// Operator: % (modulus) dan + (aritmatika)
function tentukanLoket(id: number): number {
  return (id % 3) + 1; // hasil bergiliran 1, 2, 3
}

// ---- TES SEMENTARA (hapus sebelum commit akhir) ----
// console.log(hitungBiayaAdmin('E-Wallet'));           // 2000
// console.log(hitungTotalBayar(1500000, 150000, 5000)); // 1655000
// console.log(cekTotalValid(1655000, 1500000));        // true
// console.log(hitungPersenHemat());                    // 25
// console.log(tentukanLoket(4));                       // 2



// ===== BLOK 3: MENU UTAMA & LOOP (Kevin) =====
// Catatan: baris import di bawah ditaruh PALING ATAS file src/index.ts
// (sebelum Blok 1), bukan di tengah file.

// Fungsi menampilkan banner selamat datang (tanpa parameter, void)
function tampilkanWelcome(): void {
  console.log('==========================================');
  console.log('   SELAMAT DATANG DI KASIR TIKET KONSER   ');
  console.log('      FESTIVAL MUSIK NIKMATI SUARA        ');
  console.log('==========================================');
}

// Fungsi menampilkan menu utama beserta jumlah data (tanpa parameter, void)
function tampilkanMenuUtama(): void {
  console.log('\n================ MENU UTAMA ==============');
  console.log('1. Tambah Transaksi   (Create)');
  console.log('2. Lihat Semua Data   (Read)');
  console.log('3. Detail Transaksi   (Read by ID)');
  console.log('4. Ubah Transaksi     (Update)');
  console.log('5. Hapus Transaksi    (Delete)');
  console.log('6. Cari Transaksi     (Search)');
  console.log('0. Keluar');
  console.log('==========================================');
  // If: info jumlah data di memori
  if (daftarTransaksi.length === 0) {
    console.log('Belum ada data transaksi.');
  } else {
    console.log(`Jumlah data transaksi: ${daftarTransaksi.length}`);
  }
}

// Fungsi menampilkan pesan fitur yang belum dikerjakan (void, dengan parameter)
function tampilkanBelumTersedia(namaFitur: string, progress: number): void {
  console.log(`\n[Info] Fitur ${namaFitur} akan dikerjakan pada Progress ${progress}.`);
}

// Fungsi-fungsi fitur: masih kerangka, diisi pada progress berikutnya (void)
function tambahTransaksi(): void {
  tampilkanBelumTersedia('Tambah Transaksi (Create)', 3);
}
function lihatSemuaTransaksi(): void {
  tampilkanBelumTersedia('Lihat Semua Data (Read)', 4);
}
function detailTransaksi(): void {
  tampilkanBelumTersedia('Detail Transaksi (Read by ID)', 4);
}
function ubahTransaksi(): void {
  tampilkanBelumTersedia('Ubah Transaksi (Update)', 5);
}
function hapusTransaksi(): void {
  tampilkanBelumTersedia('Hapus Transaksi (Delete)', 5);
}
function cariTransaksi(): void {
  tampilkanBelumTersedia('Cari Transaksi (Search)', 6);
}

// Fungsi utama: menu berulang sampai pengguna memilih keluar (void)
function main(): void {
  isiDataAwal();       // memuat 5 data awal (fungsi dari Blok 1, Maura)
  tampilkanWelcome();  // tampilkan banner

  let jalan: boolean = true; // penanda program masih berjalan
  // do...while: menu minimal tampil sekali, berulang selama jalan bernilai true
  do {
    tampilkanMenuUtama();
    const pilihan: string = readlineSync.question('Pilih menu (0-6): ').trim();

    // If: input kosong ditangani lebih dulu
    if (pilihan === '') {
      console.log('[!] Pilihan tidak boleh kosong, pilih 0 sampai 6.');
      continue; // kembali ke awal loop
    }

    // Switch: mengarahkan pilihan menu ke fungsi yang sesuai
    switch (pilihan) {
      case '1':
        tambahTransaksi();
        break;
      case '2':
        lihatSemuaTransaksi();
        break;
      case '3':
        detailTransaksi();
        break;
      case '4':
        ubahTransaksi();
        break;
      case '5':
        hapusTransaksi();
        break;
      case '6':
        cariTransaksi();
        break;
      case '0':
        jalan = false; // hentikan perulangan menu
        break;
      default:
        // Input menu tidak valid (bukan 0-6)
        console.log('[!] Pilihan menu tidak valid, pilih 0 sampai 6.');
        break;
    }
  } while (jalan);

  console.log('\n==========================================');
  console.log('    Terima kasih sudah membeli tiket!     ');
  console.log('==========================================');
}

// Menjalankan program (taruh di baris paling akhir file)
main();