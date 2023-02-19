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

printAnswer(findFactorsOf, 12);
printAnswer(findFactorsOf, 34);

/* 
=====================
RANDOM 'COMMON' CODE SCREENING CHALLENGES YOU MIGHT ENCOUNTER
=====================
*/

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
