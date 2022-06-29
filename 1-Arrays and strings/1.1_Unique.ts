// 1.1 Implement an algorithm to determine if a string has all unique characters.What if you cannot use additional data structures.

function unique(text: string): boolean {
  const hash: Record<string, boolean> = {};
  return text.split('').every(letter => {
    if (hash[letter]) {
      return false;
    } else {
      hash[letter] = true;
      return true;
    }
  });
}

const str = "hola megust";
console.log(`unique letters in ${str}? ${unique(str)}`);