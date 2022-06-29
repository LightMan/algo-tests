// 1.2 Check Permutation: Given two strings, write a method to decide if one is a permutation of the other.;

function permutation(str1: string, str2: string): boolean {
  if (str1.length !== str2.length) {
    return false;
  }

  let hash1: Record<string, number> = {};
  str1.split('').forEach(letter1 => {
    hash1[letter1] = hash1[letter1] + 1 || 1;
  });

  return str2.split('').every(letter2 => {
    if (!hash1[letter2]) {
      // hash1[letter2] is undefined or zero.
      return false;
    } else {
      hash1[letter2]--;
    }
    return true;
  });

}

const str1 = "holi";
const str2 = "halo";
console.log(`Is ${str2} a permutation of ${str1} ? ${permutation(str1, str2)}`);
