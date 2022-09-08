/* 
208. Implement Trie (Prefix Tree) Medium  https://leetcode.com/problems/implement-trie-prefix-tree/
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
    Trie() Initializes the trie object.
    void insert(String word) Inserts the string word into the trie.
    boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
    boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

Example 1:
Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output [null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True

Constraints:
    1 <= word.length, prefix.length <= 2000
    word and prefix consist only of lowercase English letters.
    At most 3 * 104 calls in total will be made to insert, search, and startsWith.
*/

class TrieNode {
  isLastLetter = false;
  children = {}; // Hashmap with letter 

  lookForChildren(letter) {
    return this.children[letter] || false;
  }
};

class Trie {
  root = new TrieNode();
  // a -> p -> p -> l -> e

  insert(word) {
    if (word.length === 0) {
      return;
    }

    let parent = this.root;
    let child;
    for (let letter of word) {
      child = parent.lookForChildren(letter);
      if (!child) {
        child = new TrieNode();
        parent.children[letter] = child;
      }
      parent = child;
    }
    child.isLastLetter = true;
  }

  search(word) {
    if (word.length === 0) {
      return false;
    }

    let parent = this.root;
    let child;
    for (let letter of word) {
      child = parent.lookForChildren(letter);
      if (!child) {
        return false;
      }
      parent = child;
    }
    return child.isLastLetter;
  }

  startsWith(prefix) {
    if (prefix.length === 0) {
      return false;
    }

    let parent = this.root;
    let child;
    for (let letter of prefix) {
      child = parent.lookForChildren(letter);
      if (!child) {
        return false;
      }
      parent = child;
    }
    return true;
  }
}

const word = "apple";
const prefix = "appl";

["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]];

const params = [];
const obj = new Trie();
params.push("null");
params.push(obj.insert("apple") || "null");
params.push(obj.search("apple"));
params.push(obj.search("app"));
params.push(obj.startsWith("app"));
params.push(obj.insert("app") || "null");
params.push(obj.search("app"));

console.log(`Params [${params}]`);
