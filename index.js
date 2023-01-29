// 1: Palindromes!
const checkIfPalindrome = (word) => {
  // of course, you could always just use reverse here
  return word === [...word].reverse().join("");
};

const printAnswer = (fn, ...args) => {
  let params = args.length > 1 ? args : args[0];
  let result = fn(params);

  console.log("Result of", fn.name, "is", result);
};

printAnswer(checkIfPalindrome, "milk");
printAnswer(checkIfPalindrome, "racecar");
