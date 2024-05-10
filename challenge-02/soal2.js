const checkTypeNumber = (givenNumber) => {
  if (givenNumber) {
    if (typeof givenNumber === "number") {
      return givenNumber % 2 === 0 ? "Genap" : "Ganjil";
    }
    return "Error: Invalid data type";
    // return Error("Invalid data type");
  }
  return "Error: Bro Where is the parameter";
  // return Error("Bro Where is the parameter");
};

console.log(checkTypeNumber(10));
console.log(checkTypeNumber(3));
console.log(checkTypeNumber("3"));
console.log(checkTypeNumber({}));
console.log(checkTypeNumber([]));
console.log(checkTypeNumber());

// Ekspektasi Output :
// => GENAP
// => GANJIL
// => Error: Invalid data type
// => Error: Invalid data type
// => Error: Invalid data type
// => Error: Bro where is the parameter?
