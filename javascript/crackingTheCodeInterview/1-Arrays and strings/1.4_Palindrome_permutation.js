// 1.4  Palindrome Permutation: Given a string, write a function to check if it is a permutation of a palin- drome.
// A palindrome is a word or phrase that is the same forwards and backwards.
// A permutation is a rearrangement of letters.The palindrome does not need to be limited to just dictionary words.

// EXAMPLE Input: Tact Coa; Output: True (permutations: "taco cat". "atco cta".etc.);

function palindromePermutation(str) {
  let hash = {};
  let added = 0;
  str.split('').forEach(letter => {
    if (letter !== ' ') {
      if (!hash[letter]) {
        hash[letter] = true;
        added++;
      } else {
        delete hash[letter];
        added--;
      }
    }
  });
  console.log(`added ${added} hash ${Object.keys(hash)}`);
  if (added <= 1) {
    return true;
  }
}

const str1 = "tact coa";
const str2 = "hola alo"; "olahalo";
const str = str2;
console.log(`palindrome permutation ${palindromePermutation(str)}`);