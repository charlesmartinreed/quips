// 1: Palindromes!
const checkIfPalindrome = (word) => {
  return [...word];
};

const printAnswer = (fn, ...args) => {
  let params = args.length > 1 ? args : args[0];
  let result = fn(params);

  console.log("Result of", fn.name, "is", result);
};

printAnswer(checkIfPalindrome, "word");
