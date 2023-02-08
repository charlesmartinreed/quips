function printAnswer(fn) {
  // per MDN, arguments is only exposed in non arrow functions
  // that explains why it didn't work for me before...

  const args = Array.prototype.slice.call(arguments, 1);
  let result = fn(...args);

  console.log("Result of", fn.name, "is", result);
}

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

const maxValueInCollection = (...values) => {
  return values.reduce((pv, cv) => (cv > pv ? cv : pv));
};

const longestWordInCollection = (...words) => {
  return words
    .sort((a, b) => b.length - a.length)
    .filter((word, _, arr) => word.length === arr[0].length);
};

// direction: 'asc' or 'desc'
const sortValues = (direction, ...values) => {
  return direction === "asc"
    ? values.sort((a, b) => a - b)
    : values.sort((a, b) => b - a);
};

const diceArray = (blob, blobSize) => {};

const flattenArrays = (blob) => {
  return blob.reduce((acc, next) => {
    return [].concat(...acc, next);
  });
};

const anagramChecker = (firstWord, secondWord) => {};

const letterChanger = (phrase) => {
  return phrase
    .split("")
    .map((x) =>
      x.charCodeAt(0) >= 122 ? "a" : String.fromCharCode(x.charCodeAt(0) + 1)
    )
    .map((y) => y.replace(/[aeiou]/g, (match) => match.toUpperCase()));
};

// printAnswer(checkIfPalindrome, "milk");
// printAnswer(checkIfPalindrome, "racecar");

// printAnswer(reverser, "expert");

// printAnswer(intReverser, 125);

// printAnswer(fizzy, 50);

// printAnswer(fibby, 10);

// printAnswer(capitalizeString, "this is a test sentence");

// printAnswer(maxCharInString, "this is a test sentence 9182-3 )!@#");
// printAnswer(maxCharInString, "success");
// printAnswer(maxCharInString, "abcdefghij");
// printAnswer(maxValueInCollection, 1, 19, 36, 105, 11, 25, 20239, 64, 13, 2, 0);
// printAnswer(
//   longestWordInCollection,
//   "test",
//   "word",
//   "for",
//   "here",
//   "this",
//   "collection"
// );
// printAnswer(longestWordInCollection, "test", "word", "for", "here", "this");
// printAnswer(sortValues, "desc", 1, 19, 36, 105, 11, 25, 20239, 64, 13, 2, 0);
printAnswer(flattenArrays, [[1, [2, 3]], 4, [5, 6], [7], [8, 9]]);

// console.log([].concat([1, 2, 3]));
// console.log([].concat(5));

// printAnswer(anagramChecker, "cinema", "pilfer");
// printAnswer(anagramChecker, "cinema", "iceman");
// printAnswer(letterChanger, "abcdefgzhun");
