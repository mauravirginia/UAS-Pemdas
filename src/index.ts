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
isiDataAwal();
console.log(NAMA_FESTIVAL);
console.log(daftarTransaksi);


// ===== BLOK 2: BIAYA ADMIN & TOTAL (Nanda) =====
// ===== BLOK 3: MENU UTAMA & LOOP (Kevin) =====