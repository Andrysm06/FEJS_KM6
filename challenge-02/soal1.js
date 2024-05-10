function changeWord(selectedText, changedText, text) {
  if (typeof changedText == "string" && typeof selectedText == "string") {
    // Cek tipe changedText sama dengan string && cek tipe selectedText sama dengan string
    const textBaru = text.replace(selectedText, changedText);
    return textBaru;
  }
  return "Salah";
}
const kalimat1 = "Pemandangan di pantai sangat indah pada sore hari";
const kalimat2 =
  "Perjalanan jauh seringkali memberikan pengalaman yang berharga";

// EXPECTED RESULT
// Ketika function tersebut dipanggil dengan variabel kalimat1
console.log(changeWord("indah", "menakjubkan", kalimat1));
// Maka output yang harus keluar adalah
// => 'Pemandangan di pantai sangat menakjubkan pada sore hari'

// Ketika function tersebut dipanggil dengan variabel kalimat2
console.log(changeWord("pengalaman", "kenangan", kalimat2));
// Maka output yang harus keluar adalah
// => 'Perjalanan jauh seringkali memberikan kenangan yang berharga'
