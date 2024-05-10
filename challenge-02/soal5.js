// Bisa juga disebut denggan data yang langsung connect dengan Script/APP
const dataPenjualanNovel = [
  {
    idProduct: "BOOK002421",
    namaProduct: "pulang - pergi",
    penulis: "Tere Liye",
    hargaBeli: 60000,
    hargaJual: 86000,
    totalTerjual: 150,
    sisaStok: 17,
  },
  {
    idProduct: "BOOK002351",
    namaProduct: "Selamat TInggal",
    penulis: "Tere Liye",
    hargaBeli: 75000,
    hargaJual: 103000,
    totalTerjual: 171,
    sisaStok: 20,
  },
  {
    idProduct: "BOOK002941",
    namaProduct: "Garis Waktu",
    penulis: "Fiersa Besarik",
    hargaBeli: 67000,
    hargaJual: 99000,
    totalTerjual: 213,
    sisaStok: 5,
  },
  {
    idProduct: "BOOK002921",
    namaProduct: "Laskar Pelangi",
    penulis: "Andrea Hirata",
    hargaBeli: 55000,
    hargaJual: 68000,
    totalTerjual: 20,
    sisaStok: 56,
  },
];

function getInfoPenjualan(dataPenjualan) {
  // === MODAL ===
  // Ngitung Modal (Setiap buku)
  // Pakai metod Map, tujuannya ngebuat new array juga dengan nilai-nilai modal dari semua buku 1:1
  // Gini ngitung manualnya == ((sisastok + totalterjual) * hargabeli)
  // Kalau bingung ini dari mana dapatnya? Ini dari local data diatas, masing-masing ada propertinya
  const totalModal = dataPenjualan
    .map((a) => (a.sisaStok + a.totalTerjual) * a.hargaBeli)
    // Disini ada ".reduce" digunakan untuk ngejumlah/menjumlahkan hasil
    // Cara kerjanya menjumlahkan value di dalam array

    // Jadi ACC ini nilai awalnya 0
    // Nilai CURR yth nilai saati ini.
    .reduce((acc, curr) => acc + curr);

  // === KEUNTUNGAN ===
  // Ngitung Persentase Keuntungan
  // Tetap sama menggunakan metod map (penjelasan bisa sama seperti section modal diatas ^)
  // Gini ngitung manualnya == (hargajual - hargabeli)*totalterjual
  const totalKeuntungan = dataPenjualan
    .map((a) => (a.hargaJual - a.hargaBeli) * a.totalTerjual)
    .reduce((acc, curr) => acc + curr); // ACC = Akumulator || CURR = Current

  // menghitung Persentase Keuntungan
  const persentaseKeuntungan = ((totalKeuntungan / totalModal) * 100).toFixed(
    2
  );

  // === BUKU TERLARIS ===
  // mencari Buku Terlaris
  const novel = dataPenjualan.map((a) => a.totalTerjual);
  const pengambilanTerbesar = Math.max(...novel); //pengambilan angka terbesar
  const novelTerlaris = dataPenjualan
    .filter((a) => a.totalTerjual == pengambilanTerbesar)
    .map((a) => a.namaProduct)
    .toString(); //mengfilter dari hasil terbesar kedalam array nameproduct

  // === PENULIS TERLARIS ===
  // Inisialisasi array kosong untuk menyimpan total penjualan untuk setiap penulis
  const totalPenjualanPenulis = [];

  // Iterasi melalui setiap item penjualan dalam dataPenjualan
  dataPenjualan.forEach((item) => {
    // Mendeklarasikan variabel penulis dan totalTerjual dari setiap item
    const { penulis, totalTerjual } = item;

    // Mencari apakah penulis sudah ada dalam array totalPenjualanPenulis
    const existingItem = totalPenjualanPenulis.find(
      (a) => a.penulis === penulis
    );

    // Jika penulis sudah ada dalam array totalPenjualanPenulis
    if (existingItem) {
      // Menambahkan totalTerjual dari item saat ini ke totalTerjual yang sudah ada untuk penulis tersebut
      existingItem.totalTerjual += totalTerjual;
    } else {
      // Jika penulis belum ada dalam array totalPenjualanPenulis
      // Menambahkan objek baru ke array totalPenjualanPenulis dengan penulis dan totalTerjual dari item saat ini
      totalPenjualanPenulis.push({
        penulis,
        totalTerjual,
      });
    }
  });

  // Mencari penulis dengan total penjualan terbesar menggunakan metode reduce
  const penulisTerlaris = totalPenjualanPenulis.reduce((acc, curr) => {
    // Membandingkan totalTerjual dari setiap item saat ini (curr) dengan totalTerjual dari item sebelumnya (acc)
    // Mengembalikan item dengan total penjualan terbesar
    return acc.totalTerjual > curr.totalTerjual ? acc : curr;
  });
}
