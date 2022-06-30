// 1.5 One Away: There are three types of edits that can be performed on strings: insert a character,
// remove a character, or replace a character.
// Given two strings, write a function to check if they are one edit (or zero edits) away.
// EXAMPLE; pale, pIe -> true   pales, pale -> true   pale, bale -> true  pale, bake -> false

function oneWay(text1, text2) {
  if (text1 === text2) {
    return true;
  }

  let deleted = false;
  let replaced = false;
  let inserted = false;
  let str1 = text1.split('');
  let str2 = text2.split('');


  let pos2 = 0;
  for (let pos1 = 0; pos1 < text1.length; pos++) {
    if (str1[pos1] !== str2[pos2]) {
      // Could be deleted or replaced

    } else {
      pos2++;
    }
  }
  return true;
}

const str1 = "pale";
const str2 = "pIe";
const str3 = "pales";
const str4 = "pale";
const str5 = "pale";
const str6 = "bale";
const str7 = "pale";
const str8 = "bake";
const stra = str1;
const strb = str2;
console.log(`oneWay of ${str2} to ${str1} is ${oneWay(stra, strb)} `);