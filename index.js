// 1: Palindromes!
const checkIfPalindrome = (word) => {
  return (
    (result = Array(word.length)
      .fill(null)
      .map((k, i) => {
        let spread = [...word];
        return spread[spread.length - (i + 1)];
      })).join("") === word
  );
};

const fizzy = (countLimit) => {
  return Array(countLimit)
    .fill(1)
    .map((n, idx) => (n += idx))
    .map((m) => {
      if (m % 5 === 0 && m % 3 === 0) return "FizzBuzz";
      if (m % 3 === 0) return "Fizz";
      if (m % 5 === 0) return "Buzz";
      return m;
    });
};

const fibby = (placeCount) => {
  // return Array(1)
  //   .fill([0, 1], 0, 1)
  //   .map((val, index, arr) => {
  //     for (let i = 0; i <= placeCount; i++) {
  //       let newVal = val + arr[index + 1];
  //       arr.push()
  //     }
  //     arr.push();
  //     return arr;
  // while (index < placeCount) {
  //   console.log(val, arr[index]);
  //   // return val + arr[index + 1];
  // }
  // });
  let step = 1;
  let values = [0, 1];
  while (step < placeCount) {
    step++;
    values = [...values, fibGenerator(values).next().value];
  }
  return values;
};

function* fibGenerator(currenvalues) {
  yield currenvalues[currenvalues.length - 1] +
    currenvalues[currenvalues.length - 2];
}

const printAnswer = (fn, ...args) => {
  let params = args.length > 1 ? args : args[0];
  let result = fn(params);

  console.log("Result of", fn.name, "is", result);
};

const reverser = (phrase) => {
  return phrase.split("").reduce((pv, cv) => cv + pv);
};

const intReverser = (numeric) => {
  return Number.parseInt(
    String(numeric)
      .split("")
      .reduce((pv, cv) => cv + pv)
  );
};

const capitalizeString = (sentence) => {
  return sentence
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
};

const maxCharInString = (sentence) => {
  // return sentence.split(" ");
  return sentence.split(" ").map((word) => {
    let charMap = {};
    for (const char of word) {
      if (charMap[char]) {
        charMap[char] += 1;
      } else {
        charMap[char] = 1;
      }
    }
    return charMap;
  });
};

let test = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
];

// for (const [k, v] of Object.entries(test)) {
//   console.log("k is", k, "v is", v);
// }

// printAnswer(checkIfPalindrome, "milk");
// printAnswer(checkIfPalindrome, "racecar");
// printAnswer(reverser, "expert");
// printAnswer(intReverser, 125);
// printAnswer(fizzy, 50);
// printAnswer(fibby, 10);
// printAnswer(capitalizeString, "this is a test sentence");

// printAnswer(maxCharInString, "this is a test sentence");
