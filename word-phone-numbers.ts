// Phone numbers in words
// 
// phoneNumber 3662277 foo = 366 bar = 227 cap = 227
// words: "foo" "bar" "baz" "foobar" "emo" "cap" "car" "cat"
// output: "bar" "cap" "car" "emo" "foo" "foobar"


const charToNum = buildCharToNumDict();

const solution = (phoneNumber: string): string[] => {

  const words = ["foo", "bar", "baz", "foobar", "emo", "cap", "car", "cat"];
  let solution: string[] = [];
  words.forEach(word => {
    const wordInNumbers = convertToNumber(word);
    console.log(`word ${word} to numbers ${wordInNumbers}`);
    if (phoneNumber.search(wordInNumbers) !== -1) {
      solution.push(word);
    }
  });
  return solution;
};

const convertToNumber = (word: string): string => {
  return word.split('').map(letter => charToNum[letter]).join('');
};

function buildCharToNumDict(): Record<string, string> {
  const abc = "| |abc|def|ghi|jkl|mno|pqrs|tuv|wxyz|";
  let dict: Record<string, string> = {};
  abc.split('|').forEach((letterGroup, index) => {
    letterGroup.split('').forEach(letter => dict[letter] = index.toString());
  });
  return dict;
}

console.log(`Using 3662277 ${solution('3662277')}`);