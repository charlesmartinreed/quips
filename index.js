function printAnswer(fn) {
  // per MDN, arguments is only exposed in non arrow functions
  // that explains why it didn't work for me before...

  const args = Array.prototype.slice.call(arguments, 1);
  let result = fn(...args);

  console.log("Result of", fn.name, "is", result);
}

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

const multiplicationClosure = (multiplicand) => {
  return (multipler) => {
    return multiplicand * multipler;
  };
};

const multiplicandValue = multiplicationClosure(6);
// console.log(multiplicandValue(3));
// console.log(multiplicandValue(8));

// printAnswer(countTheVowels, "there");
// printAnswer(countTheVowels, "rhythm");
// printAnswer(countTheVowels, "acerbic");
