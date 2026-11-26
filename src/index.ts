import readlineSync from 'readline-sync';
// ===== BLOK 1: TIPE DATA & HARGA TIKET (Maura) =====

type Kategori = 'VIP' | 'CAT 1' | 'Festival';
type Fase = 'Presale' | 'Normal' | '-';
type Metode = 'Transfer Bank' | 'E-Wallet' | 'Kartu Kredit';


interface TransaksiTiket {
  id: number;           
  nama: string;         
  kategori: Kategori;   
  fase: Fase;           
  beliKaos: boolean;    
  metode: Metode;       
  hargaTiket: number;   
  hargaKaos: number;    
  biayaAdmin: number;   
  total: number;        
}

const daftarTransaksi: TransaksiTiket[] = [];
const NAMA_FESTIVAL: string = 'Festival Musik Nikmati Suara';

let idBerikutnya: number = 1;

// Fungsi menghitung harga tiket berdasarkan kategori dan fase (return number)
function hitungHargaTiket(kategori: Kategori, fase: Fase): number {
  let harga: number = 0;
  switch (kategori) {
    case 'VIP':
      if (fase === 'Presale') {
        harga = 1500000; 
      } else if (fase === 'Normal') {
        harga = 2000000;
      }
      break;
    case 'CAT 1':
      harga = 1000000; 
      break;
    case 'Festival':
      harga = 500000;
      break;
    default:
      harga = 0; 
      break;
  }
  return harga; 
}

// Fungsi menghitung harga kaos official (return number)
function hitungHargaKaos(kategori: Kategori, fase: Fase, beliKaos: boolean): number {
  let harga: number = 0; 
  switch (kategori) {            
    case 'VIP':
      if (beliKaos) {            
        if (fase === 'Presale') { 
          harga = 150000;         
        } else {
          harga = 250000;         
        }
      }
      break;
    case 'CAT 1':
      harga = 0;
      break;
    case 'Festival':
      harga = 0;
      break;
    default:
      harga = 0;
      break;
  }
  return harga;
}

// Fungsi menambah satu data seed ke array (void, tanpa return)
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
  idBerikutnya += 1;
}

// Fungsi mengisi 5 data awal (seed) (void, tanpa parameter)
function isiDataAwal(): void {
  tambahSeed('Andi Saputra', 'VIP', 'Presale', true, 'Transfer Bank', 5000);
  tambahSeed('Budi Santoso', 'CAT 1', '-', false, 'E-Wallet', 2000);
  tambahSeed('Citra Dewi', 'Festival', '-', false, 'Kartu Kredit', 10000);
  tambahSeed('Dina Marlina', 'VIP', 'Normal', true, 'E-Wallet', 2000);
  tambahSeed('Eko Prasetyo', 'VIP', 'Normal', false, 'Transfer Bank', 5000);
}

// ---- TES SEMENTARA ----
// isiDataAwal();
// console.log(NAMA_FESTIVAL);
// console.log(daftarTransaksi);


// ===== BLOK 2: BIAYA ADMIN & TOTAL (Nanda) =====
// ===== BLOK 2: BIAYA ADMIN, TOTAL BAYAR & OPERATOR (Nanda) =====

// Fungsi menentukan biaya admin dari metode pembayaran (return number)
function hitungBiayaAdmin(metode: Metode): number {
  let biaya: number = 0; 
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
      biaya = 0;
      break;
  }
  return biaya; 
}

// Fungsi menghitung total bayar (return number)
function hitungTotalBayar(hargaTiket: number, hargaKaos: number, biayaAdmin: number): number {
  let total: number = 0;
  if (hargaTiket > 0 && biayaAdmin >= 0) {
    total += hargaTiket;
    total += hargaKaos; 
    total += biayaAdmin;
  }
  return total; 
}

// Fungsi memeriksa apakah total bayar masuk akal (return boolean)
function cekTotalValid(total: number, hargaTiket: number): boolean {
  const tidakValid: boolean = total < 0 || hargaTiket <= 0;
  return !tidakValid && total !== 0;
}

// Fungsi menghitung selisih hemat VIP presale vs normal dalam persen (return number)
function hitungPersenHemat(): number {
  const hargaNormal: number = hitungHargaTiket('VIP', 'Normal');
  const hargaPresale: number = hitungHargaTiket('VIP', 'Presale');
  let hasil: number = hargaNormal;
  hasil -= hargaPresale;  
  hasil *= 100;           
  hasil /= hargaNormal;   
  return hasil;           
}

// Fungsi menghitung rata-rata total transaksi (return number)
function hitungRataRata(data: TransaksiTiket[]): number {
  if (data.length === 0) {
    return 0;
  }
  let jumlah: number = 0;
  for (const t of data) {
    jumlah += t.total;
  }
  return Math.round(jumlah / data.length); 
}

// Fungsi menentukan nomor loket dari id (return number)
function tentukanLoket(id: number): number {
  return (id % 3) + 1;
}

// ---- TES SEMENTARA ----
// console.log(hitungBiayaAdmin('E-Wallet'));           // 2000
// console.log(hitungTotalBayar(1500000, 150000, 5000)); // 1655000
// console.log(cekTotalValid(1655000, 1500000));        // true
// console.log(hitungPersenHemat());                    // 25
// console.log(tentukanLoket(4));                       // 2



// ===== BLOK 3: MENU UTAMA & LOOP (Kevin) =====
// Catatan: baris import di bawah ditaruh PALING ATAS file src/index.ts

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
function mainMenu(): void {
  isiDataAwal();       
  tampilkanWelcome();  

  let jalan: boolean = true; 
  do {
    tampilkanMenuUtama();
    const pilihan: string = readlineSync.question('Pilih menu (0-6): ').trim();

    if (pilihan === '') {
      console.log('[!] Pilihan tidak boleh kosong, pilih 0 sampai 6.');
      continue; 
    }

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
        jalan = false; 
        break;
      default:

        console.log('[!] Pilihan menu tidak valid, pilih 0 sampai 6.');
        break;
    }
  } while (jalan);
  console.log('\n==========================================');
  console.log('    Terima kasih sudah membeli tiket!     ');
  console.log('==========================================');
}

mainMenu();