/*
49. Group Anagrams
Medium https://leetcode.com/problems/group-anagrams/

Given an array of strings strs, group the anagrams together. You can return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1: Input: strs = ["eat","tea","tan","ate","nat","bat"] Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Example 2: Input: strs = [""] Output: [[""]]
Example 3: Input: strs = ["a"] Output: [["a"]]

Constraints:
    1 <= strs.length <= 104
    0 <= strs[i].length <= 100
    strs[i] consists of lowercase English letters.
*/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const groups = [];
  const letterGroups = {}; // Hash containing an array of the repeatition of each letter
  const abcStr = "abcdefghijklmnopqrstuvwxyz".split('');
  const abc = {};
  abcStr.forEach((letter, index) => abc[letter] = index);

  for (const word of strs) {
    // Split the word into letters
    let letters = word.split('');
    // Build array to use it as a key
    const letterRepetitions = new Array(abc.length);
    for (const letter of letters) {
      letterRepetitions[abc[letter]] = letterRepetitions[abc[letter]] + 1 || 1;
    }

    if (letterGroups[letterRepetitions] === undefined) {
      letterGroups[letterRepetitions] = [];
    }
    letterGroups[letterRepetitions].push(word);
  }

  return Object.values(letterGroups);
};