const dataPenjualanPakAldi = [
  {
    namaProduct: "Sepatu Futsal Nike Vapor Academy 8",
    hargaSatuan: 760000,
    kategori: "Sepatu Sport",
    totalTerjual: 90,
  },
  {
    namaProduct: "Sepatu Warrior Tristan Black Brown High",
    hargaSatuan: 960000,
    kategori: "Sepatu Sneaker",
    totalTerjual: 37,
  },
  {
    namaProduct: "Sepatu Warrior Tristan Maroon High",
    hargaSatuan: 360000,
    kategori: "Sepatu Sneaker",
    totalTerjual: 90,
  },
  {
    namaProduct: "Sepatu Warrior Rainbow Tosca Corduroy",
    hargaSatuan: 120000,
    kategori: "Sepatu Sneaker",
    totalTerjual: 90,
  },
];

const getTotalPenjualan = (dataPenjualan) => {
  if (dataPenjualan === undefined) return "Error: Bro where is the parameter?";
  if (!(dataPenjualan instanceof Array)) return "Error: Invalid data type";
  if (dataPenjualan.length == 0) return "Error: Empty array";

  const totalPenjualan = dataPenjualan.reduce((previous, current) => {
    return previous + current.totalTerjual;
  }, 0);
  return totalPenjualan;
};

console.log(getTotalPenjualan(dataPenjualanPakAldi));
console.log(getTotalPenjualan());
console.log(getTotalPenjualan(0));
console.log(getTotalPenjualan(null));
// console.log(getTotalPenjualan(dataPenjualanPakAldi));
// console.log(getTotalPenjualan([]));
// console.log(getTotalPenjualan());
// console.log(getTotalPenjualan("a"));
