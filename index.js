function printAnswer(fn) {
  // per MDN, arguments is only exposed in non arrow functions
  // that explains why it didn't work for me before...

  const args = Array.prototype.slice.call(arguments, 1);
  let result = fn(...args);

  console.log("Result of", fn.name, "is", result);
}

// in JavaScript. if two functions have the same name
// the function that is defined last is the one that gets called
function overloader() {
  return arguments[0] + arguments[1];
}

function overloader() {
  // normally function overloading refers to functions with same name
  // but different implementation
  // that's still kinda true here, in JS.
  switch (arguments.length) {
    case 0:
      console.log("The overloader function requires at least two arguments");
      break;
    case 1:
      console.log(
        `You've passed in one arguments, but this function requires at least two numbers.`
      );
    default:
      return [...arguments].reduce((acc, next) => acc + next);
  }
}

// printAnswer(overloader, 5, 10, 15, 20);

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

// let dupArr = [1, 1, 2, 2, 2, 3, 4, 5, 6, 6, 6, 6, 7, 7, 8, 9, 9, 9, 9, 9, 10];

const removeDuplicateItems = (...items) => {
  // using filter and index of
  return items.filter((item, index) => items.indexOf(item) === index);
};
// printAnswer(removeDuplicateItems, ...dupArr);

const removeDuplicateItemsWithSet = (...items) => {
  return Array.from(new Set(items));
};

// printAnswer(removeDuplicateItemsWithSet, ...dupArr);

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
    return [].concat(...acc).concat(...next);
  });
};

let nestedArr = [[1, [2, 3]], [4], [5, 6, ["a", "b"]], [7], [8, 9]];
// printAnswer(flattenArrays, nestedArr);

const removeItemFromCollection = (collection, item) => {
  return collection.filter((itemToRemove) => itemToRemove !== item);
};

// printAnswer(
//   removeItemFromCollection,
//   [1, 2, 3, 1, 4, 5, 1, 6, 7, 1, 1, 8, 9, 10],
//   1
// );

const insertItemIntoCollection = (collection, itemToAdd, indexToAddItem) => {
  return [].concat(
    collection.slice(0, indexToAddItem),
    itemToAdd,
    collection.slice(indexToAddItem)
  );
};

// printAnswer(insertItemIntoCollection, [1, 2, 3, 4, 6, 7, 8, 9, 10], 5, 4);

const insertObjInArr = (arr, obj) => {
  return [...arr, obj];
};

// printAnswer(insertObjInArr, ["a", "b", "c", "1", "2", "3"], {
//   name: "Jim",
//   age: 71,
// });

const checkIfValueExistsInArrays = (arrays, checkValue) => {
  // case sensitive
  return flattenArrays(arrays).indexOf(checkValue) !== -1;
  return flattenArrays(arrays).includes(checkValue);
};

let nestedArr2 = [
  [1, 2, [3, 4]],
  [5, 6, [7, 9, 10], 11],
];

// printAnswer(checkIfValueExistsInArrays, nestedArr, "b");
// printAnswer(checkIfValueExistsInArrays, nestedArr2, 8);

const mergeTestArr1 = [
  "kotsumet",
  1056012,
  new Date("March 19, 2012"),
  { partner_status: true },
];

const mergeTestArr2 = [
  "sherpa",
  2381138,
  new Date("June 30, 2017"),
  { partner_status: true },
];

// try refactoring this with WeakSet
const mergeAndRemoveDuplicateItems = (...arrs) => {
  return arrs.reduce((acc, next) => {
    nextMap = next.map((item) => JSON.stringify(item));
    let diffs = [];
    for (let i of acc) {
      if (!nextMap.includes(JSON.stringify(i))) {
        diffs = [...diffs, i];
      } else {
        // this removes the duplicated item altogether
        // comment this out to keep ONE copy of the shared item between the arrays
        let index = nextMap.indexOf(JSON.stringify(i));
        next = next.slice(0, index);
      }
    }
    diffs = [...diffs, ...next];
    return diffs;
  });
};

// printAnswer(mergeAndRemoveDuplicateItems, mergeTestArr1, mergeTestArr2);
// console.log(new Date("March 19, 2012"));

const returnIntersectionBetweenArrs = (...arrays) => {
  return [...arrays].reduce((acc, next) => {
    let setA = new Set(
      acc.map((j) => {
        if (typeof j === "object") {
          return JSON.stringify(j);
        } else {
          return j;
        }
      })
    );

    let setB = new Set(
      next.map((k) => {
        if (typeof k === "object") {
          return JSON.stringify(k);
        } else {
          return k;
        }
      })
    );

    let sharedVals = [];
    for (let val of setB) {
      if (setA.has(val)) {
        try {
          val = JSON.parse(val);
        } catch (e) {
        } finally {
          sharedVals = [...sharedVals, val];
        }
      }
    }
    return sharedVals;
  });
};

const intersectArr1 = [1, "test", 2, 3, 4, 5, 6, { a: 1 }];
const intersectArr2 = [2, 4, 6, 8, "test", { a: 1 }, 10, 12];
const intersectArr3 = [3, 6, { a: 1 }, 9, 12, "test", 15, 18, 13];

// printAnswer(
//   returnIntersectionBetweenArrs,
//   intersectArr1,
//   intersectArr2,
//   intersectArr3
// );

const removeNullOrUndefinedVals = (values) => {
  return values.filter((value) => value !== null && value !== undefined);
};

// printAnswer(removeNullOrUndefinedVals, [
//   1,
//   undefined,
//   2,
//   null,
//   3,
//   undefined,
//   null,
//   4,
// ]);

// did you know this was possible? kinda cool, right?
const sumsAndExponents = (a = 10, b = a ** 2, c = b ** 2, d = c ** 2) => {
  // 10 + 100 ** 2 + 10000 ** 2 + 100000000 = 100010110
  return a + b + c + d;
};

// printAnswer(sumsAndExponents);

const pokemonData = [
  {
    name: { eng: "Bulbasaur" },
    nat_dex_number: "0001",
    type_primary: "Grass",
    type_secondary: "Poison",
  },
  {
    name: { eng: "Ivysaur" },
    nat_dex_number: "0002",
    type_primary: "Grass",
    type_secondary: "Poison",
  },
  {
    name: { eng: "Venusaur" },
    nat_dex_number: "0003",
    type_primary: "Grass",
    type_secondary: "Poison",
  },
  {
    name: { eng: "Sprigatito" },
    nat_dex_number: "0906",
    type_primary: "Grass",
    type_secondary: null,
  },
  {
    name: { eng: "Floragato" },
    nat_dex_number: "0907",
    type_primary: "Grass",
    type_secondary: null,
  },
  {
    name: { eng: "Meowscarda" },
    nat_dex_number: "0908",
    type_primary: "Grass",
    type_secondary: "Dark",
  },
];

const getRandomItemFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// printAnswer(getRandomItemFromArray, pokemonData);

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

// printAnswer(checkStringUsingStartsWith, "hello world", "HE");
// printAnswer(checkStringUsingStartsWith, "hello world", "abcde");

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

// printAnswer(checkIfSegmentAppearsInString, "exsanguination", "sang");
// printAnswer(checkIfSegmentAppearsInString, "tendentious", "tender");
// printAnswer(checkIfSegmentAppearsInString, "tendentious", "dent");

const trimString = (str) => {
  // \B matches if the pattern isn't at the beginning or end of the word
  // \s matches any whitespace character
  return str.replace(/\B[\s] | [\s]\B/gi, "");

  // see the problem with trim? it fails
  // if there's a punctuation character following a long series of spaces
  // this probably wouldn't really happen in the wild, but!
  return str.trim();
};

// printAnswer(trimString, "      Hello World    !");

const removeAllWhiteSpace = (str) => {
  return str.replace(/\s+/g, "");
};

// printAnswer(removeAllWhiteSpace, " H e l lo    Wo r ld!   ");

const checkIfStringsMatch = (str1, str2) => {
  // localeCompare returns a number indicating
  // if the reference string comes before (return -1), after (1) or is equal (0)
  // to given string in sort order
  // setting sensitivity also ignores case, but
  // it's typically useful for comparing, say ä with a
  // return str1.localeCompare(str2, "en", { sensitivity: "base" }) === 0
  //   ? "true"
  //   : "false";
  return new RegExp(str1, "gi").test(str2);
};

// printAnswer(checkIfStringsMatch, "hot take", "hOt TAkE");
// printAnswer(checkIfStringsMatch, "papaya", "pineapple");

const checkIsLeapYear = (yearToCheck) => {
  // a respectable programming language wouldn't implicitly convert strings like this
  // but alas... this is JavaScript
  return (
    yearToCheck % 400 == 0 || (yearToCheck % 4 == 0 && yearToCheck % 100 != 0)
  );
};

// printAnswer(checkIsLeapYear, 2000);
// printAnswer(checkIsLeapYear, 2400);
// printAnswer(checkIsLeapYear, 1800);
// printAnswer(checkIsLeapYear, 1900);
// printAnswer(checkIsLeapYear, 2100);
// printAnswer(checkIsLeapYear, 2200);
// printAnswer(checkIsLeapYear, 2300);

const returnFormattedCurrentDate = (seperator) => {
  // without using the built in formatters, of course
  return [new Date()]
    .map((rawDate) => {
      return [
        rawDate.getMonth() + 1,
        rawDate.getDate() < 10 ? `0${rawDate.getDate()}` : rawDate.getDate(),
        rawDate.getFullYear(),
      ].join(seperator);
    })
    .pop();
};

// printAnswer(returnFormattedCurrentDate, "/");
// printAnswer(returnFormattedCurrentDate, "-");
// printAnswer(returnFormattedCurrentDate, "|");

const returnNumberOfSecondsBetween = (dateA, dateB) => {
  return !isNaN(Date.parse(firstDate)) && !isNaN(Date.parse(secondDate))
    ? Math.abs(dateA.getTime() - dateB.getTime()) / 1000
    : "one or more of the Date arguments is not a valid date";
};

let firstDate = new Date("January 3, 2022");
let secondDate = new Date("{a: 1}");
// let secondDate = new Date("January 4, 2022");

// printAnswer(returnNumberOfSecondsBetween, firstDate, secondDate);

// assume an object with Month, Date, and a non-zero indexed Year
const returnNumberofDaysBetweenDates = (dateOne, dateTwo) => {
  let { year: firstYear, month: firstMonth, date: firstDate } = dateOne;
  let { year: secondYear, month: secondMonth, date: secondDate } = dateTwo;

  return Math.round(
    Math.abs(
      new Date(firstYear, firstMonth - 1, firstDate) -
        new Date(secondYear, secondMonth - 1, secondDate)
    ) / 86400000
  );
};

// printAnswer(
//   returnNumberofDaysBetweenDates,
//   { month: 1, date: 11, year: 2018 },
//   { month: 6, date: 27, year: 2025 }
// );

// format is year, month, date, hour, minutes, seconds
const countdownUntilDate = (firstDate, secondDate) => {
  // firstDate = parseDate(firstDate);
  // if (!secondDate) {
  // let secondsBetweenDates = firstDate - Date.now();
  // let daysBetweenDates = secondsBetweenDates / 86400 / 60;
  // return daysBetweenDates;
  // }
  // secondDate = parseDate(secondDate);

  function parseDate(rawDate) {
    let dateConstructorObj = {
      monthIndex: null,
      day: null,
      year: null,
      hours: null,
      minutes: null,
      seconds: null,
    };

    let monthIndicesMap = [
      { monthLabel: "January", monthIndex: 0 },
      { monthLabel: "February", monthIndex: 1 },
      { monthLabel: "March", monthIndex: 2 },
      { monthLabel: "April", monthIndex: 3 },
      { monthLabel: "May", monthIndex: 4 },
      { monthLabel: "June", monthIndex: 5 },
      { monthLabel: "July", monthIndex: 6 },
      { monthLabel: "August", monthIndex: 7 },
      { monthLabel: "September", monthIndex: 8 },
      { monthLabel: "October", monthIndex: 9 },
      { monthLabel: "November", monthIndex: 10 },
      { monthLabel: "December", monthIndex: 11 },
    ];

    let dateValues = rawDate.split(/\s+|\W+/);

    Object.entries(dateConstructorObj).forEach(([k, v], i) => {
      if (new RegExp(/[A-Za-z]+/, "gi").test(dateValues[i]) === true) {
        let [{ monthIndex }] = monthIndicesMap.filter(
          ({ monthLabel }) =>
            new RegExp(String.raw`^${dateValues[i]}+`, "gi").test(
              monthLabel
            ) === true
        );
        dateConstructorObj[k] = monthIndex;
      } else {
        dateConstructorObj[k] = dateValues[i];
      }
    });

    let { year, monthIndex, day, hours, minutes, seconds } = dateConstructorObj;

    return new Date(year, monthIndex, day, hours, minutes, seconds);
  }
};

// console.log(new Date("2022", "11"));

// printAnswer(countdownUntilDate, "Aug 5, 2025 14:22:36");

let sortObj = [
  { name: "Sara", age: 18, salary: 37000 },
  { name: "John", age: 31, salary: 29500 },
  { name: "Jack", age: 8 },
  { name: "Blair", age: 45, salary: 45000 },
];

// by default, this is sorting the name param by length
// since this is a naive implementation, for demo purposes, this is fine :)
const sortArrayByObjProp = (arr, prop, direction = "asc") => {
  return arr.every((obj) => obj.hasOwnProperty(prop))
    ? arr.sort((a, b) => {
        return direction === "asc" ? a[prop] - b[prop] : b[prop] - a[prop];
      })
    : arr;
};

// printAnswer(sortArrayByObjProp, sortObj, "age", "desc");
// printAnswer(sortArrayByObjProp, sortObj, "name", "desc");
// printAnswer(sortArrayByObjProp, sortObj, "salary", "asc");

const createTwoDimensionalArray = (...arrays) => {
  return [].reduce((acc, next) => {
    return [acc, next];
  }, arrays);
};

// printAnswer(
//   createTwoDimensionalArray,
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
//   [10, 11, 12]
// );

const createMultiDimensionalArray = (
  truncate = true,
  arrCount,
  arrLength,
  ...arrValues
) => {
  let arrays = [];
  let allValues = arrValues.reduce((acc, next) => [...acc, ...next]);

  for (let i = 0; i <= arrLength * 2; i += arrLength) {
    if (i === arrLength * 2 && truncate) {
      arrays = [...arrays, ...Array(1).fill(allValues.slice(i))];
    } else {
      arrays = [...arrays, ...Array(1).fill(allValues.slice(i, i + 2))];
    }
  }
  return arrays;
};

// printAnswer(
//   createMultiDimensionalArray,
//   false,
//   3,
//   2,
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// );

// given an array of objects, return an array containing the values of the passed in prop
const extractValuesFromObjAsArr = (arr, propToExtract) => {
  return arr.map((obj) => {
    if (obj.hasOwnProperty(propToExtract)) {
      return obj[propToExtract];
    } else {
      return `Object does not contain prop: ${propToExtract}`;
    }
  });
};

// printAnswer(extractValuesFromObjAsArr, sortObj, "name");
// printAnswer(extractValuesFromObjAsArr, sortObj, "salary");

let arrA = [{ name: "Sally" }, 10, 20, "a", "b", false, null, { a: 1 }];
let arrB = [20, { name: "Sally" }, 10, "b", "a", null, false, { a: 1 }];

const compareTwoArrays = (arr1, arr2) => {
  // this one is considerably more verbose, but actually checks objects
  return (
    arr1.length === arr2.length &&
    arr1.every((v) => {
      if (typeof v === "object" && v !== null) {
        arr2 = arr2.map((item) => {
          if (typeof item === "object" && item != null) {
            return JSON.stringify(item);
          } else {
            return item;
          }
        });
        return arr2.includes(JSON.stringify(v));
      } else {
        return arr2.includes(v);
      }
    })
  );

  // this is fine the two objects have the same items AND the same order
  return arr1.every((v, index) => v === arr2[index]);
};

// printAnswer(compareTwoArrays, arrA, arrB);

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

const printObjectAsAString = (obj) => {
  return JSON.stringify(obj);
};

// printAnswer(printObjectAsAString, mazdaObj);
// console.log(typeof printObjectAsAString(mazdaObj));

const printObjectAsFormattedString = (obj) => {
  let formattedStr = "";
  for (const [key, value] of Object.entries(obj)) {
    formattedStr += `\nThe KEY ${key} contains the VALUE ${value}.`;
  }
  return formattedStr;
};

// printAnswer(printObjectAsFormattedString, mazdaObj);

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

const testGraph = `My favorite color is definitely red.
Red goes with everything, unlike that ugly teal color.
If someone doesn't like red, they should be ignored.
Red is king.`;
// printAnswer(replacer, testGraph, "red", "blue");

const simpleLetterReplacer = (phrase, letterToDelete, replacementLetter) => {
  return phrase
    .split(/\s+|\W$./)
    .map((word) => word.replace(letterToDelete, replacementLetter))
    .join(" ");
};

// printAnswer(simpleLetterReplacer, testGraph, "i", "$");

const returnParagraphWithBRTags = (paragraph) => {
  return paragraph.split(/\n+/).join("<br>");
  return testGraph.replace(new RegExp(/(\r|\r\n|\n)/, "g"), "<br>");
};

// printAnswer(returnParagraphWithBRTags, testGraph);

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

const executeFunctionAfterDelay = (functionToExecute, delay) => {
  setTimeout(functionToExecute, delay);
};

// executeFunctionAfterDelay(function saySomething() {
//   console.log("hello world");
// }, 5000);

function* generateAndYieldRandomString() {
  let lowerBound = 33;
  let upperBound = 126;

  yield String.fromCharCode(
    Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound)
  );
}

// let test = generateAndYieldRandomString();
// console.log(generateAndYieldRandomString().next().value);

// ignore the fact that this uses characters that
// wouldn't be permissible in most password situations
// this is just a simple coding exercise, after all!
const generateSimplePassword = (length = 12, useSpecialCharacters = false) => {
  return Array(length)
    .fill(null)
    .map((v) => {
      let generatedcharCode = generateAndYieldRandomString().next().value;

      if (!useSpecialCharacters) {
        // as opposed to /w, which would include _
        while (!/[a-zA-Z0-9]/i.test(generatedcharCode)) {
          generatedcharCode = generateAndYieldRandomString().next().value;
        }
      }
      return generatedcharCode;
    })
    .join("");
};

// printAnswer(generateSimplePassword, 11, true);
// printAnswer(generateSimplePassword, 23, false);

const numberTypeChecker = (val) => {
  return (typeof val !== "number" && !Number(val)) || isNaN(val)
    ? `${val} is not a number at all, actually`
    : Number.isInteger(val)
    ? `${val} is an Integer`
    : `${val} is a Floating Point Number`;
  switch (val) {
    case Number.isInteger(val):
      return `${val} is an Integer.`;
    case Number.isNaN(val):
      return `${val} is not a number at all, actually`;
    default:
      return `${val} is a Floating Point Number.`;
  }
};

// printAnswer(numberTypeChecker, 13);
// printAnswer(numberTypeChecker, "ab");
// printAnswer(numberTypeChecker, "123.4567");
// printAnswer(numberTypeChecker, null);
// printAnswer(numberTypeChecker, 908.1293);
// printAnswer(numberTypeChecker, false);

// assume the simplest URL possible, protocol, subdomain, domain, tld
// return an object containing the same
const urlParser = (addrStr) => {
  return addrStr
    .split(/\W+/g)
    .map((value, index) => {
      let keys = ["Protocol", "Subdomain", "Domain", "TLD"];
      let obj = {};
      obj[keys[index]] = value;

      return obj;
    })
    .reduce((acc, next) => {
      acc = { ...acc, ...next };
      return acc;
    });
};

// printAnswer(urlParser, "https://en.wikipedia.org");

let testImgSrc = `<img style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*a__3IyfVHcksJuJnrHDN8A.jpeg">`;

const attrParser = (elemToParse) => {
  let tag = /[A-Za-z]{1,}/i.exec(elemToParse)[0];
  return elemToParse.replace(/(img|<|>|\s)/gi, "").split(/([\b{1,}]="|;)/i);
};

console.log(attrParser(testImgSrc));

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

// inspired by the 'replace line break with <br> example above
// this one takes text and applies the specified tag on both sides

const appendHTMLTagToText = (textContents, tag) => {
  return [tag, textContents, tag.replace(/\w+/, (match) => `\\${match}`)].join(
    ""
  );
};

// printAnswer(appendHTMLTagToText, "this line should be bolded.", "<b>");
// printAnswer(appendHTMLTagToText, "this line should be italicized.", "<i>");
// printAnswer(appendHTMLTagToText, "this line should be underlined.", "<u>");

// Per MDN: The instanceof operator tests to see if the prototype property
// of a constructor appears anywhere in the prototype chain of an object.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof

function testFunc() {
  return "hello world";
}
const testStringInstance = new String("hello world");
// console.log(testFunc instanceof Function); // true
// console.log((function () {})() instanceof Function); // false
// console.log(testStringInstance instanceof String); // true
// console.log("hello world" instanceof String); // false

// STACK: LAST IN, FIRST OUT data structure
// imagine a stack of books, when you add a new book to the top
// it is now the "first" in the stack of books

// here's an example of a FIXED-SIZE STACK
// inspired by this simple implementation from programiz
// https://www.programiz.com/javascript/examples/stack

class Stack {
  constructor(maxStackLen = 8) {
    this.maxSize = maxStackLen;
    this.stackItems = Array(maxStackLen).fill(null);
  }

  maxStackSize() {
    return this.maxSize;
  }

  currentStackSize() {
    return this.stackItems.filter((k) => k !== null).length;
  }

  stackIsEmpty() {
    return (
      this.stackItems.length === 0 || this.stackItems.every((n) => n === null)
    );
  }

  add(newItem) {
    this.stackItems.shift();
    this.stackItems.push(newItem);
    return this.stackItems;
  }

  remove() {
    this.stackItems.pop();
    this.stackItems.unshift(null);
    return this.stackItems;
  }

  peek() {
    return this.stackItems[this.stackItems.length - 1];
  }

  clear() {
    this.stackItems = this.stackItems.map((k) => (k !== null ? null : k));
    return this.stackItems;
  }
}

// let testStack = new Stack();
// console.log("Max stack size is set to", testStack.maxStackSize(), "items.");

// testStack.add(0);
// testStack.add(1);
// testStack.add(1);
// testStack.add(2);

// testStack.remove(); // removes 2
// console.log("Currently filled stack spaces", testStack.currentStackSize());
// testStack.add(3);
// testStack.add(5);
// testStack.add(8);
// testStack.add(13);
// testStack.add(21);

// console.log("Last item in stack is", testStack.peek());

// console.log("Stack is currently empty?", testStack.stackIsEmpty());
// console.log("Stack items are currently", testStack.stackItems);
// testStack.remove();
// testStack.remove();
// console.log("Currently filled stack spaces", testStack.currentStackSize());

// testStack.clear();
// console.log("Stack items are currently", testStack.stackItems);
// console.log("Stack is currently empty?", testStack.stackIsEmpty());

// QUEUE: FIRST IN, FIRST OUT data structure
// imagine standing in line for a basketball game
// the first person in gets the first ticket (first IN)
// and therefore is the first to leave the line, into the arena (first OUT)

// inspired by this simple implementation from programiz
// https://www.programiz.com/javascript/examples/stack

class Queue {
  constructor() {
    this.queueItems = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  isEmpty() {
    return Object.entries(this.queueItems).length === 0 ? true : false;
  }

  addToQueue(item) {
    this.queueItems[this.tailIndex] = item;
    this.tailIndex++;
    return this.queueItems;
  }

  removeFromQueue() {
    let [removeKey] = Object.keys(this.queueItems).filter(
      (_, index) => index === this.headIndex
    );
    delete this.queueItems[removeKey];
    return this.queueItems;
  }

  peek() {
    let [peekKey] = Object.keys(this.queueItems).filter(
      (_, index) => index === this.headIndex
    );
    return this.queueItems[peekKey];
  }

  size() {
    return Object.entries(this.queueItems).length;
  }

  clear() {
    this.queueItems = Object.assign({});
  }

  currentQueue() {
    return this.queueItems;
  }
}

// let testQueue = new Queue();
// console.log("queue is currently empty", testQueue.isEmpty());
// testQueue.addToQueue(0);
// testQueue.addToQueue(1);
// testQueue.addToQueue(1);
// testQueue.addToQueue(2);
// testQueue.addToQueue(3);
// testQueue.addToQueue(5);
// console.log(testQueue.removeFromQueue());
// testQueue.addToQueue(8);
// console.log(testQueue.removeFromQueue());

// console.log("head of queue is", testQueue.peek());
// console.log("current queue is", testQueue.currentQueue());
// console.log("size of queue is", testQueue.size());
// console.log("queue is currently empty", testQueue.isEmpty());

// testQueue.clear();
// console.log("current queue is", testQueue.currentQueue());
// console.log("queue is currently empty", testQueue.isEmpty());
