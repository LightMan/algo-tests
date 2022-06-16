const solution = (s) => {
  if (typeof s !== "string" || s.length === 0) {
    return "";
  }

  let longest = "";
  let startPointer = 0;
  let endPointer = 0;
  while (startPointer < s.length) {
    let substring = s.substring(startPointer, endPointer);
    console.log(`Checking ${substring}`);
    if (endPointer < s.length) {
      endPointer++;
      const newChar = s.substring(endPointer - 1, endPointer);
      const repeated = substring.includes(newChar);
      if (!repeated) {
        substring = substring.concat(newChar);
        console.log(`New substring ${substring}`);
        if (substring.length > longest.length) {
          longest = substring;
          console.log(`new longest ${longest}`);
        }
      } else {
        startPointer++;
        endPointer = startPointer + 1;
      }
    } else {
      startPointer++;
      endPointer = startPointer + 1;
    }
  }

  console.log(`longest ${longest}`);
  return longest.length;
};

console.log(`sol ${solution("holaestoesunsubstringmuylargo")}`);
