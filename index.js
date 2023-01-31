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

const printAnswer = (fn, ...args) => {
  let params = args.length > 1 ? args : args[0];
  let result = fn(params);

  console.log("Result of", fn.name, "is", result);
};

// printAnswer(checkIfPalindrome, "milk");
// printAnswer(checkIfPalindrome, "racecar");

// printAnswer(fizzy, 50);
// console.log([].fill());
