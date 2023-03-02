function printAnswer(fn) {
  // per MDN, arguments is only exposed in non arrow functions
  // that explains why it didn't work for me before...

  const args = Array.prototype.slice.call(arguments, 1);
  let result = fn(...args);

  console.log("Result of", fn.name, "is", result);
}

const makeArray = (start = 0, end = 1, interval = 1) => {
  return Array(Math.ceil((end - start + 1) / interval))
    .fill(start)
    .map((n, index) => n + interval * index)
    .filter((n) => n <= end);
};

// printAnswer(makeArray, 10, 75, 3);
// printAnswer(makeArray, 10, 79, 3);
// printAnswer(makeArray, 1, 25, 1);
// printAnswer(makeArray, 0, 100, 10);

const makeFilledArray = (arrLen, filler = null) => {
  return Array(arrLen)
    .fill(undefined)
    .map((k) => {
      return typeof filler === "function" ? filler() : filler;
    });
};

// console.log(makeFilledArray(6, filledArrayTestFunc));
// console.log(makeFilledArray(["a", false, 21812, { a: 1, b: 2 }]));

const filledArrayTestFunc = () => {
  return Math.floor(Math.random() * (28 - 15) + 15);
};

// 0-9 charCodes are 48-57
// A-Z charCodes are 65-90
// a-z charCodes are 97-122
// this example leverages my helper methods,
// but there's a less bespoke method to be found below as well
const generateRandomStr = (strLen) => {
  let charSets = [
    [48, 57],
    [65, 90],
    [97, 122],
  ];

  return makeFilledArray(strLen, () => {
    let [min, max] = charSets[Math.floor(Math.random() * charSets.length)];

    return String.fromCharCode(Math.random() * (max - min) + min);
  }).join("");
};

// printAnswer(generateRandomStr, 8);

const bigBrainRandomStrGenerator = (arrLen) => {
  // stolen from programiz.com
  // base36 encoding converts binary to ASCII
  // encapsulating 0-9 and A-Z, using a radix of 36
  // then we simply slice the string, starting at the characters
  return Math.random()
    .toString(36)
    .substring(2, 2 + arrLen);
};

// printAnswer(bigBrainRandomStrGenerator, 4);

const midBrainRandomStrGenerator = (len) => {
  let str = "";

  for (let i = 0; i < len; i++) {
    str += Math.random().toString(36).substring(2, 3);
  }

  return str;
};

// printAnswer(midBrainRandomStrGenerator, 5);

const breakDownDigits = (value) => {
  let digits = [];

  while (value > 0) {
    digits = [value % 10, ...digits];
    while (value === 0) {
      digits = [0, ...digits];
    }
    value = parseInt(value / 10);
  }

  return digits;
};

const removeDuplicateItems = (...items) => {
  // using filter and index of
  return items.filter((item, index) => items.indexOf(item) === index);
};

// let dupArr = [1, 1, 2, 2, 2, 3, 4, 5, 6, 6, 6, 6, 7, 7, 8, 9, 9, 9, 9, 9, 10];
// printAnswer(removeDuplicateItems, ...dupArr);
// printAnswer(removeDuplicateItemsWithSet, ...dupArr);

const removeDuplicateItemsWithSet = (...items) => {
  return Array.from(new Set(items));
};

const returnFactorialOf = (base) => {
  return base < 0
    ? NaN
    : base > 0
    ? Array(Math.floor(base))
        .fill(Math.floor(base))
        .map((val, index) => (val -= index))
        .reduce((acc, next) => acc * next)
    : 1;
};

// printAnswer(returnFactorialOf, 5);
// printAnswer(returnFactorialOf, 1);
// printAnswer(returnFactorialOf, 1.9);
// printAnswer(returnFactorialOf, 2.5);
// printAnswer(returnFactorialOf, 0);
// printAnswer(returnFactorialOf, -1);

const recursiveFactorialOf = (base) => {
  if (base > 1) {
    base = base * recursiveFactorialOf(base - 1);
  }
  return base;
};

// printAnswer(recursiveFactorialOf, 8);

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

// printAnswer(checkIfPalindrome, "abba");
// printAnswer(checkIfPalindrome, "milk");
// printAnswer(checkIfPalindrome, "racecar");

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

// printAnswer(fizzy, 50);

const simpleFibby = (places) => {
  return (function (currSequence) {
    let iter = 0;
    let sequence = [0, 1];

    while (iter < places) {
      iter++;
      sequence.push(
        sequence[sequence.length - 1] + sequence[sequence.length - 2]
      );
    }

    return sequence;
  })();
};

// printAnswer(simpleFibby, 10);

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

// printAnswer(fibby, 10);

function* fibGenerator(currenvalues) {
  yield currenvalues[currenvalues.length - 1] +
    currenvalues[currenvalues.length - 2];
}

const reverser = (phrase) => {
  return phrase.split("").reduce((pv, cv) => cv + pv);
};

// printAnswer(reverser, "expert");

const intReverser = (numeric) => {
  return Number.parseInt(
    String(numeric)
      .split("")
      .reduce((pv, cv) => cv + pv)
  );
};

// printAnswer(intReverser, 125);

const capitalizeString = (sentence) => {
  return sentence
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
};

// printAnswer(capitalizeString, "this is a test sentence");

const maxCharInString = (sentence) => {
  return [sentence.replace(/[^A-Z]/gi, "")]
    .map((word) => {
      let charMap = {};
      for (const char of word) {
        if (charMap[char]) {
          charMap[char] += 1;
        } else {
          charMap[char] = 1;
        }
      }
      return charMap;
    })
    .map((charMapValues) => {
      let maxCount = 0;
      let maxValue = [];
      for (const [k, v] of Object.entries(charMapValues)) {
        if (v >= maxCount) {
          maxCount = v;
          maxValue = [...maxValue, k];
        }
      }
      return maxCount > 1
        ? maxValue.length > 1
          ? `${maxValue
              .toString()
              .toUpperCase()} each appear ${maxCount} times in \"${sentence}\".`
          : `${maxValue.toString().toUpperCase()} appears ${maxCount} ${
              maxCount > 1 ? "times" : "time"
            } in \"${sentence}\".`
        : `No single letter appears more than once in \"${sentence}\".`;
    })
    .join("");
};

// printAnswer(maxCharInString, "this is a test sentence 9182-3 )!@#");
// printAnswer(maxCharInString, "success");
// printAnswer(maxCharInString, "abcdefghij");

const maxValueInCollection = (...values) => {
  return values.reduce((pv, cv) => (cv > pv ? cv : pv));
};

// printAnswer(maxValueInCollection, 1, 19, 36, 105, 11, 25, 20239, 64, 13, 2, 0);

const longestWordInCollection = (...words) => {
  return words
    .sort((a, b) => b.length - a.length)
    .filter((word, _, arr) => word.length === arr[0].length);
};

let words = ["test", "word", "for", "here", "this", "collection"];
let words2 = ["test", "word", "for", "here", "this"];
// printAnswer(longestWordInCollection, ...words);
// printAnswer(longestWordInCollection, ...words2);

// direction: 'asc' or 'desc'
const sortValues = (direction, ...values) => {
  return direction === "asc"
    ? values.sort((a, b) => a - b)
    : values.sort((a, b) => b - a);
};

// printAnswer(sortValues, "desc", 1, 19, 36, 105, 11, 25, 20239, 64, 13, 2, 0);

const sortWordsByLength = (direction, ...words) => {
  return direction === "asc"
    ? words.sort((wordA, wordB) => wordA.charCodeAt(0) - wordB.charCodeAt(0))
    : words.sort((wordA, wordB) => wordB.charCodeAt(0) - wordA.charCodeAt(0));
};

// printAnswer(
//   sortWordsByLength,
//   "asc",
//   "pineapple",
//   "tomato",
//   "apples",
//   "oranges",
//   "zucchini",
//   "bananas"
// );

const diceArray = (arr, sliceSize, startIndex) => {
  return Array(Math.ceil(arr.length / sliceSize))
    .fill([])
    .map((n) => arr.splice(0, sliceSize));
};

// printAnswer(diceArray, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 0);

const flattenArrays = (blob) => {
  return blob.reduce((acc, next) => {
    return [].concat(...acc, next);
  });
};

// printAnswer(flattenArrays, [[1, [2, 3]], 4, [5, 6], [7], [8, 9]]);

const anagramChecker = (firstWord, secondWord) => {
  return firstWord.length === secondWord.length
    ? firstWord
        .split("")
        .sort()
        .map((letter) => secondWord.split("").includes(letter))
        .includes(false)
      ? false
      : true
    : false;
};

// printAnswer(anagramChecker, "table", "bat");
// printAnswer(anagramChecker, "cinema", "pilfer");
// printAnswer(anagramChecker, "terrace", "believe");
// printAnswer(anagramChecker, "cinema", "iceman");
// printAnswer(anagramChecker, "cider", "cried");
// printAnswer(anagramChecker, "link", "kiln");

const letterChanger = (phrase) => {
  return phrase
    .split("")
    .map((x) =>
      x.charCodeAt(0) >= 122 ? "a" : String.fromCharCode(x.charCodeAt(0) + 1)
    )
    .map((y) => y.replace(/[aeiou]/g, (match) => match.toUpperCase()));
};

// printAnswer(letterChanger, "abcdefgzhun");

const countTheVowels = (phrase) => {
  return phrase.split("").filter((letter) => letter.match(/[aeiou]/gi)).length;
};

const countOccurencesOf = (letter, fullPhrase) => {
  return [...fullPhrase.matchAll(new RegExp(String.raw`${letter}`, "gi"))]
    .length;
};

const checkString = (beginLetter, endLetter, word) => {
  // obviously .startsWith and .endsWith exist as well
  // return (
  //   word.startsWith(beginLetter.toLowerCase()) &&
  //   word.endsWith(endLetter.toLowerCase())
  // );

  return new RegExp(String.raw`^${beginLetter}..{1,}${endLetter}$`, "gi").test(
    word
  );
};

// printAnswer(checkString, "A", "a", "amygdala");
// printAnswer(checkString, "a", "t", "arson");
// printAnswer(checkString, "a", "A", "billionaire");
// printAnswer(checkString, "r", "r", "racecar");

const checkStringUsingStartsWith = (phrase, segement) => {
  return new RegExp(String.raw`^${segement}`, "gi").test(phrase, "gi");
  return phrase.toLowerCase().startsWith(segement.toLowerCase(), 0);
};

printAnswer(checkStringUsingStartsWith, "hello world", "HE");
printAnswer(checkStringUsingStartsWith, "hello world", "abcde");

// we can also check whether or not the segment
// appears at any point in the phrase
const checkIfSegmentAppearsInString = (phrase, segement) => {
  for (let i = 0; i < phrase.length; i++) {
    let segToCheck = phrase.slice(i, i + segement.length);
    if (segToCheck === segement) {
      return true;
    } else {
      continue;
    }
  }
  return false;
};

"test".lastIndexOf();

// printAnswer(checkIfSegmentAppearsInString, "exsanguination", "sang");
// printAnswer(checkIfSegmentAppearsInString, "tendentious", "tender");
// printAnswer(checkIfSegmentAppearsInString, "tendentious", "dent");

let mazdaObj = {
  model_name: "RX-8",
  model_year: "2002",
  mileage: "140518",
  color: "red",
};

const copyObjByRef = (objToCopy) => {
  return { ...objToCopy };
  return Object.assign({}, objToCopy);
};

let mazdaObj_copy = copyObjByRef(mazdaObj);
mazdaObj_copy.title_status = "clean";
// console.log(mazdaObj, mazdaObj_copy);

// of course you could also implement a hashMap, if you really wanted to, but... eh
const countOccurencesHash = (letter, fullPhrase) => {
  let letterMap = [];

  for (const char of fullPhrase) {
    if (letterMap[char]) {
      letterMap[char]++;
    } else {
      letterMap[char] = 1;
    }
  }

  return letterMap[letter];
};

// printAnswer(
//   countOccurencesOf,
//   "o",
//   "how many times does the letter occur in this sentence?"
// );

// printAnswer(
//   countOccurencesHash,
//   "o",
//   "how many times does the letter occur in this sentence?"
// );

// printAnswer(countTheVowels, "there");
// printAnswer(countTheVowels, "rhythm");
// printAnswer(countTheVowels, "acerbic");
const OperationTypes = {
  Addition: (...values) => values.reduce((pv, cv) => pv + cv),
  Subtraction: (...values) => values.reduce((pv, cv) => pv - cv),
  Multiplication: (...values) => values.reduce((pv, cv) => pv * cv),
  Division: (...values) => values.reduce((pv, cv) => pv / cv),
};

const bigMath = (operation, ...bigValues) => {
  return operation(
    ...bigValues.map((n) => (typeof n === BigInt ? n : BigInt(n)))
  );
};

const bigVal1 = 1223556;
const bigVal2 = 295333539135835312n;
// printAnswer(bigMath, OperationTypes.Addition, bigVal1, bigVal2);
// printAnswer(bigMath, OperationTypes.Subtraction, bigVal1, bigVal2);
// printAnswer(bigMath, OperationTypes.Multiplication, bigVal1, bigVal2);
// printAnswer(bigMath, OperationTypes.Division, bigVal2, bigVal1);

const inlineValueSwap = (val1, val2) => {
  return `input ${[val1, val2]} has become output ${([val1, val2] = [
    val2,
    val1,
  ])}`;
};

// swap first with last, second with second to last, etc.
const varLenInlineValueSwap = (...values) => {
  return values.map((val, index, arr) => {
    return (val = arr[arr.length - index - 1]);
  });
};

// printAnswer(varLenInlineValueSwap, 10, 8, 5, 9, 12, 61);
// printAnswer(varLenInlineValueSwap, 319, 59482, 41039, 1285, 91902);

const checkIfNumberIsPrime = (num) => {
  return num < 1 || num === 1
    ? false
    : Array(Math.ceil(Math.sqrt(num)))
        .fill(Math.ceil(Math.sqrt(num)))
        .map((val, idx) => val - idx)
        .filter((n) => n !== 1)
        .every((val) => num === 2 || num % val !== 0);
};

// printAnswer(checkIfNumberIsPrime, 2);
// printAnswer(checkIfNumberIsPrime, 3);
// printAnswer(checkIfNumberIsPrime, 5);
// printAnswer(checkIfNumberIsPrime, 27);

const returnAllPrimesUpTo = (num) => {
  let primes = [];
  for (let i = 0; i < num; i++) {
    if (checkIfNumberIsPrime(i) === true) primes = [...primes, i];
  }

  return primes;
};

// printAnswer(returnAllPrimesUpTo, 100);

const returnAllPrimesUpToQuip = (num) => {
  return Array(num)
    .fill(0)
    .map((val, index) => val + index)
    .filter((val) => checkIfNumberIsPrime(val) === true);
};

// printAnswer(returnAllPrimesUpToQuip, 100);

// abcd... = an + bn + cn + dn + ...
const checkIfArmstrongNumber = (num) => {
  return num >= 10
    ? breakDownDigits(num)
        .map((digit, _, arr) => Math.pow(Number(digit), arr.length))
        .reduce((pv, cv) => pv + cv) === num
    : false;
};

// printAnswer(checkIfArmstrongNumber, 153);
// printAnswer(checkIfArmstrongNumber, 1634);

const checkForArmstrongNumberInRange = (upperBound) => {
  let result = makeArray(1, upperBound, 1).filter(
    (num) => checkIfArmstrongNumber(num) === true
  );
  return result;
};

// printAnswer(checkForArmstrongNumberInRange, 2000);

const sumAllNaturalNumbersUpTo = (limit) => {
  return makeArray(1, limit, 1).reduce((pv, cv) => pv + cv);
};

// printAnswer(sumAllNaturalNumbersUpTo, 100);
// printAnswer(sumAllNaturalNumbersUpTo, 9215);

const checkIfLastDigitsMatch = (...numbers) => {
  return numbers.length >= 2
    ? numbers
        .map((number) => number % 10 === numbers[0] % 10)
        .every((k) => k === true)
    : false;
};

// printAnswer(checkIfLastDigitsMatch, 45);
// printAnswer(checkIfLastDigitsMatch, 9012, 2);
// printAnswer(checkIfLastDigitsMatch, 0, 10, 100, 1000);
// printAnswer(checkIfLastDigitsMatch, 13, 48, 783);

const findGreatestCommonDenominatorFor = (...numbers) => {
  return Math.max(
    ...numbers
      .map((num) => {
        let results = [];

        for (let i = 2; i <= num / 2; i++) {
          // multiply by two here since it should be more efficient than looping up to the actual number
          if ((num / 2) % i === 0) results = [i * 2, ...results];
        }
        return results;
      })
      .reduce((pv, cv) => {
        return pv.filter((num) => cv.includes(num) === true);
      })
  );
};

// printAnswer(findGreatestCommonDenominatorFor, 60, 72, 96);

const findLCM = (num1, num2) => {
  return [num1, num2].reduce((pv, cv) => {
    let min = Math.min(pv, cv);

    while (true) {
      if ((min % pv === 0) & (min % cv === 0)) {
        break;
      }
      min++;
    }
    return min;
  });
};

// printAnswer(findLCM, 6, 8);

const findFactorsOf = (num) => {
  return makeArray(1, num, 1).filter((k) => num % k === 0);
};

// printAnswer(findFactorsOf, 12);
// printAnswer(findFactorsOf, 34);
let cardValues = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];
let cardSuits = ["Spades", "Diamonds", "Club", "Hearts"];

// for reasons I'm not sure I understand
// it was more performant (on this laptop at least)
// to return the array from the first map
// and then join the card and suit in another map func...
const returnNewCardHand = (handSize) => {
  return makeArray(1, handSize, 1)
    .map((i) => {
      return [
        cardValues[Math.floor(Math.random() * cardValues.length)],
        cardSuits[Math.floor(Math.random() * cardSuits.length)],
      ];
    })
    .map((card) => card.join(" of "));
};

// printAnswer(returnNewCardHand, 5);

// divide the decimal number by 2
// tracking the quotient and remainder with each step
//

// const recursiveFactorialOf = (base) => {
//   if (base > 1) {
//     base = base * recursiveFactorialOf(base - 1);
//   }
//   return base;
// };

const convertDecimalToBinary = (deciVal) => {};

// printAnswer(convertDecimalToBinary, 29);

const returnASCIICharFor = (chars, returnAsUnicode = false) => {
  return chars.split("").map((char) => {
    return returnAsUnicode === false
      ? char.charCodeAt(0)
      : char.codePointAt(0).toString(16);
  });
};

// printAnswer(returnASCIICharFor, "ABCDEFG");
// printAnswer(returnASCIICharFor, "Z");
// printAnswer(returnASCIICharFor, "!@_?^#()");
// printAnswer(returnASCIICharFor, "😁❤️🥲😑🤑🤯🤡", true);

const replacer = (sentence, deleteWord, replacement) => {
  return sentence.replaceAll(
    new RegExp(String.raw`^${deleteWord}`, "gi"),
    (match) => {
      return match.charAt(0) === match.charAt(0).toUpperCase()
        ? replacement.slice(0, 1).toUpperCase() + replacement.slice(1)
        : replacement;
    }
  );
};

const testGraph =
  "My favorite color is definitely red. Red goes with everything, unlike that ugly teal color. If someone doesn't like red, they should be ignored. Red is king.";
// printAnswer(replacer, testGraph, "red", "blue");

const returnCapitalizedMultiLineStr = (str) => {
  // extra code here
  // but checking to avoid performing a mutation unnecessarily
  return str
    .split(" ")
    .map((word) =>
      word.charAt(0) === word.charAt(0).toUpperCase()
        ? word
        : word.charAt().toUpperCase() + word.slice(1)
    )
    .join("\n");
};

// printAnswer(
//   returnCapitalizedMultiLineStr,
//   "this is a test sentence that will be split into multiline madness."
// );

// this won't work on the server side, as there's no navigator here
// beyond that, there's no default style
// so the currency would have to be to manually mapped to a locale :(

const countryToCurrencyMap = {
  united_states: ["en-US", "USD"],
  japan: ["ja-JP", "JPY"],
  england: ["en-GB", "GBP"],
  china: ["zh-CN", "CNY"],
  germany: ["en-DE", "EUR"],
};

const formatAsCurrency = (val, userLocation) => {
  let location =
    countryToCurrencyMap[userLocation.toLowerCase().replace(" ", "_")];

  if (!location) {
    return `Sorry, but currency conversion is currently unavailable for ${userLocation}.`;
  } else {
    let [countryCode, currencyCode] = location;

    return new Intl.NumberFormat(countryCode, {
      style: "currency",
      currency: currencyCode,
    }).format(val);
  }
};

// printAnswer(formatAsCurrency, 12345.6789, "United States");
// printAnswer(formatAsCurrency, 12345.6789, "England");
// printAnswer(formatAsCurrency, 12345.6789, "China");
// printAnswer(formatAsCurrency, 12345.6789, "Germany");
// printAnswer(formatAsCurrency, 12345.6789, "Japan");
// printAnswer(formatAsCurrency, 12345.6789, "Brazil");

/* 
=====================
RANDOM 'COMMON' CODE SCREENING CHALLENGES YOU MIGHT ENCOUNTER
=====================
*/

const recursiveNaturalNumSum = (num) => {
  if (num > 0) {
    num = recursiveNaturalNumSum(num - 1) + num;
  }
  return num;
};

// printAnswer(recursiveNaturalNumSum, 10);

const multiplicationClosure = (multiplicand) => {
  return (multipler) => {
    return multiplicand * multipler;
  };
};

// const multiplicandValue = multiplicationClosure(6);
// console.log(multiplicandValue(3));
// console.log(multiplicandValue(8));

const immutableObject = [
  { person_name: "Charles", person_age: 36 },
  { person_name: "Dick", person_age: 88 },
  { person_name: "Zen", person_age: 16 },
  { person_name: "Byron", person_age: 42 },
];

const mutabilityTest = (obj, mutFunc) => {
  console.log(mutFunc(obj));
};

// mutabilityTest(immutableObject, (n) => {
//   return n.map(({ person_name, person_age }) => {
//     // if you need to be fancy or whatever
//     return Object.assign(
//       {},
//       { person_name: person_name.toUpperCase(), person_age: (person_age += 1) }
//     );

//     //  return {
//     //   person_name: person_name.toLowerCase(),
//     //   person_age: (person_age += 1),
//     // };
//   });
// });

let student = {
  name: "Jimmy Dean",
  age: 16,
  gpa: 3.2,
  dummyData: null,
  greet: function () {
    return `Hello! My name is ${this.name}`;
  },
};

const checkIfKeyExists = (obj, key) => {
  return obj.hasOwnProperty(key);
};

// printAnswer(checkIfKeyExists, student, "greet");
// printAnswer(checkIfKeyExists, student, "age");
// printAnswer(checkIfKeyExists, student, "awards");

const deletePropFromObjAndReturnMutated = (obj, propToDelete) => {
  if (obj.hasOwnProperty(propToDelete)) delete obj[propToDelete];
  return obj;
};

// printAnswer(deletePropFromObjAndReturnMutated, student, "dummyData");

const addPropToObjAndReturnMutated = (
  obj,
  keyValuePairs,
  preserveOriginalObjProValuesOnMerge = true
) => {
  for (const [key, value] of Object.entries(keyValuePairs)) {
    if (preserveOriginalObjProValuesOnMerge && obj[key]) {
      continue;
    }
    obj[key] = value;
  }

  return obj;
};

// printAnswer(
//   addPropToObjAndReturnMutated,
//   student,
//   {
//     name: "Bruce Wayne",
//     allergies: ["penicillin", "aspirin"],
//     testDataA: "value1",
//     testDataB: "value2",
//   },
//   false
// );

const returnObjectValuesAndProps = (obj) => {
  let values = [];
  for (const [key, value] of Object.entries(obj)) {
    // if the value is an function, get the returned value
    values = [
      ...values,
      [key, typeof value == "function" ? obj[key]() : value],
    ];
  }

  return values;
};

// printAnswer(returnObjectValuesAndProps, student);

const mergeObjAndProps = (
  originalObj,
  objOfProps,
  preserveOriginalObjProValuesOnMerge = false
) => {
  if (preserveOriginalObjProValuesOnMerge) {
    let sameTraits = {};
    let diffTraits = {};

    for (const [key, value] of Object.entries(originalObj)) {
      if (objOfProps.hasOwnProperty(key)) {
        console.log("same traits found", "key:", key, "value:", value);
        sameTraits[key] = value;
      } else {
        diffTraits[key] = value;
      }
    }

    for (const [key, value] of Object.entries(objOfProps)) {
      if (!originalObj.hasOwnProperty(key)) diffTraits[key] = value;
    }

    return { ...sameTraits, ...diffTraits };
  }

  return { ...originalObj, ...objOfProps };
  return Object.assign(originalObj, objOfProps);
};

// printAnswer(
//   mergeObjAndProps,
//   student,
//   {
//     name: "Johnny Black",
//     extracurriculars: ["rugby", "debate club", "student council"],
//   },
//   true
// );
