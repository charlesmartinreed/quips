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

// printAnswer(checkIfPalindrome, "milk");
// printAnswer(checkIfPalindrome, "racecar");

// printAnswer(fizzy, 50);
printAnswer(fibby, 10);
