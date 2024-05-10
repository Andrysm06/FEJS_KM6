// SOAL NO 17 : Write a JavaScript program to shuffle an array.

function shuffle(arra1) {
  var ctr = arra1.length,
    temp,
    index;

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);

    ctr--;

    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }

  return arra1;
}

var myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

console.log(shuffle(myArray));
