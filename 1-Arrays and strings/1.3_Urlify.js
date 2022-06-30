// 1.3 URLify: Write a method to replace all spaces in a string with '%20:
// You may assume that the string has sufficient space at the end to hold the additional characters,
// and that you are given the "true" length of the string.

function URLify(text) {
  let newStr = [];
  let spaceQueue = [];
  text.split('').forEach(letter => {
    if (letter !== ' ') {
      if (spaceQueue.length > 0) {
        newStr = newStr.concat(spaceQueue);
        spaceQueue = [];
      }
      newStr.push(letter);
    } else {
      spaceQueue.push('%20');
    }
    console.log(`newStr ${newStr} spaceQueue ${spaceQueue}`);
  });
  return newStr.join('');
}

const test = "hola mundo!  ";
console.log(`URLify '${URLify(test)}'`);