/*
212. Word Search II Hard https://leetcode.com/problems/word-search-ii/

Given an m x n board of characters and a list of strings words, return all words on the board.
Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

Example 1:
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]

Example 2:
Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []

Constraints:
    m == board.length
    n == board[i].length
    1 <= m, n <= 12
    board[i][j] is a lowercase English letter.
    1 <= words.length <= 3 * 104
    1 <= words[i].length <= 10
    words[i] consists of lowercase English letters.
    All the strings of words are unique.

*/

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {

    const wordsFound = [];
    words.forEach(word => {
        if (exist(board, word)) {
            wordsFound.push(word);
        }
    });
    return wordsFound;

    function exist(board, word) {
        const height = board.length;
        const width = board[0].length;
        let used = [];
        let lastFirstPos = { x: -1, y: 0 };
        // After the first letter we can create a loop for the next letter
        let letterIndex = word.length - 1;
        let letterIndexPosCache = [];
        let letterPos;
        while (letterIndex >= 0 && letterIndex < word.length) {
            const letter = word[letterIndex];
            let found;
            // console.log(`Looking for letter ${letter} at index ${letterIndex}`);
            if (letterIndex === word.length - 1) {
                // Looking for last letter in the board
                letterPos = lookForLetterAfterPos(letter, board, lastFirstPos);
                if (letterPos === -1) {
                    return false;
                }
                setUsedPosition(lastFirstPos, false);
                lastFirstPos = letterPos; // If search again is needed, we start after last letter.
                found = true;
                // console.log(`Found first letter ${letter} at pos [${letterPos.x},${letterPos.y}]`);
            } else {
                // Looking for the rest of the letters
                let positions = letterIndexPosCache[letterIndex];
                if (typeof positions == typeof undefined) {
                    // Look for the letters after the last one
                    positions = nextLetterPossitions(letter, letterPos, board);
                    letterIndexPosCache[letterIndex] = positions;
                } else {
                    setUsedPosition(positions.shift(), false);
                }
                found = positions.length > 0;
                if (found) {
                    // Found positions for next letter
                    letterPos = positions[0];
                    // console.log(`Found letter ${letter} around pos [${letterPos.x},${letterPos.y}]`);
                } else {
                    // console.log(`Not Found letter ${letter} around pos [${letterPos.x},${letterPos.y}]`);
                }
            }
            if (found) {
                letterIndex--; // Move to previous letter
            } else {
                delete letterIndexPosCache[letterIndex];
                letterIndex++;
            }
            setUsedPosition(letterPos, found);
        }
        return letterIndex < 0;

        function nextLetterPossitions(letter, fromPos) {
            // Search letter up, down, left and right
            let positions = [];
            const up = movePosition(fromPos, { x: 0, y: -1 });
            const down = movePosition(fromPos, { x: 0, y: +1 });
            const left = movePosition(fromPos, { x: -1, y: 0 });
            const right = movePosition(fromPos, { x: +1, y: 0 });
            [up, down, left, right].forEach(pos => {
                if (pos && isLetterInPosition(letter, pos) && isPositionFree(pos)) {
                    positions.push(pos);
                }
            });
            return positions;
        }

        function isPosInBoard(position) {
            return !(position.x < 0 || position.y < 0 || position.x >= width || position.y >= height);
        }

        function isPositionFree(position) {
            if (!used[position.y]) return true;
            return used[position.y][position.x] == undefined || used[position.y][position.x] == false;
        }

        function setUsedPosition(position, value) {
            if (!used[position.y]) {
                used[position.y] = [];
            }
            used[position.y][position.x] = value;
        }

        function isLetterInPosition(letter, position) {
            if (!isPosInBoard(position)) return false;
            return board[position.y][position.x] === letter;
        }

        function movePosition(position, displacement) {
            if (!isPosInBoard(position)) return false;
            const newPos = { x: position.x + displacement.x, y: position.y + displacement.y };
            if (!isPosInBoard(newPos)) return false;

            return newPos;
        }

        function lookForLetterAfterPos(letter, board, lastPos) {
            const fromPos = { x: lastPos.x + 1, y: lastPos.y };
            // Maybe we are out of bounds
            let x = fromPos.x;
            for (let y = fromPos.y; y < height; y++) {
                for (; x < width; x++) {
                    if (board[y][x] == letter) {
                        return { x, y };
                    }
                }
                x = 0;
            }
            return -1;
        }
    };
};

const board1 = [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]];
const words1 = ["oath", "pea", "eat", "rain"];
const board2 = [["a", "b"], ["c", "d"]];
const words2 = ["abcb"];
const board3 = [["b", "a", "b", "a", "b", "a", "b", "a", "b", "a"], ["a", "b", "a", "b", "a", "b", "a", "b", "a", "b"], ["b", "a", "b", "a", "b", "a", "b", "a", "b", "a"], ["a", "b", "a", "b", "a", "b", "a", "b", "a", "b"], ["b", "a", "b", "a", "b", "a", "b", "a", "b", "a"], ["a", "b", "a", "b", "a", "b", "a", "b", "a", "b"], ["b", "a", "b", "a", "b", "a", "b", "a", "b", "a"], ["a", "b", "a", "b", "a", "b", "a", "b", "a", "b"], ["b", "a", "b", "a", "b", "a", "b", "a", "b", "a"], ["a", "b", "a", "b", "a", "b", "a", "b", "a", "b"]];
const words3 = ["aababababa", "abbabababa", "acbabababa", "adbabababa", "aebabababa", "afbabababa", "agbabababa", "ahbabababa", "aibabababa", "ajbabababa", "akbabababa", "albabababa", "ambabababa", "anbabababa", "aobabababa", "apbabababa", "aqbabababa", "arbabababa", "asbabababa", "atbabababa", "aubabababa", "avbabababa", "awbabababa", "axbabababa", "aybabababa", "azbabababa", "bababababa", "bbbabababa", "bcbabababa", "bdbabababa", "bebabababa", "bfbabababa", "bgbabababa", "bhbabababa", "bibabababa", "bjbabababa", "bkbabababa", "blbabababa", "bmbabababa", "bnbabababa", "bobabababa", "bpbabababa", "bqbabababa", "brbabababa", "bsbabababa", "btbabababa", "bubabababa", "bvbabababa", "bwbabababa", "bxbabababa", "bybabababa", "bzbabababa", "cababababa", "cbbabababa", "ccbabababa", "cdbabababa", "cebabababa", "cfbabababa", "cgbabababa", "chbabababa", "cibabababa", "cjbabababa", "ckbabababa", "clbabababa", "cmbabababa", "cnbabababa", "cobabababa", "cpbabababa", "cqbabababa", "crbabababa", "csbabababa", "ctbabababa", "cubabababa", "cvbabababa", "cwbabababa", "cxbabababa", "cybabababa", "czbabababa", "dababababa", "dbbabababa", "dcbabababa", "ddbabababa", "debabababa", "dfbabababa", "dgbabababa", "dhbabababa", "dibabababa", "djbabababa", "dkbabababa", "dlbabababa", "dmbabababa", "dnbabababa", "dobabababa", "dpbabababa", "dqbabababa", "drbabababa", "dsbabababa", "dtbabababa", "dubabababa", "dvbabababa", "dwbabababa", "dxbabababa", "dybabababa", "dzbabababa", "eababababa", "ebbabababa", "ecbabababa", "edbabababa", "eebabababa", "efbabababa", "egbabababa", "ehbabababa", "eibabababa", "ejbabababa", "ekbabababa", "elbabababa", "embabababa", "enbabababa", "eobabababa", "epbabababa", "eqbabababa", "erbabababa", "esbabababa", "etbabababa", "eubabababa", "evbabababa", "ewbabababa", "exbabababa", "eybabababa", "ezbabababa", "fababababa", "fbbabababa", "fcbabababa", "fdbabababa", "febabababa", "ffbabababa", "fgbabababa", "fhbabababa", "fibabababa", "fjbabababa", "fkbabababa", "flbabababa", "fmbabababa", "fnbabababa", "fobabababa", "fpbabababa", "fqbabababa", "frbabababa", "fsbabababa", "ftbabababa", "fubabababa", "fvbabababa", "fwbabababa", "fxbabababa", "fybabababa", "fzbabababa", "gababababa", "gbbabababa", "gcbabababa", "gdbabababa", "gebabababa", "gfbabababa", "ggbabababa", "ghbabababa", "gibabababa", "gjbabababa", "gkbabababa", "glbabababa", "gmbabababa", "gnbabababa", "gobabababa", "gpbabababa", "gqbabababa", "grbabababa", "gsbabababa", "gtbabababa", "gubabababa", "gvbabababa", "gwbabababa", "gxbabababa", "gybabababa", "gzbabababa", "hababababa", "hbbabababa", "hcbabababa", "hdbabababa", "hebabababa", "hfbabababa", "hgbabababa", "hhbabababa", "hibabababa", "hjbabababa", "hkbabababa", "hlbabababa", "hmbabababa", "hnbabababa", "hobabababa", "hpbabababa", "hqbabababa", "hrbabababa", "hsbabababa", "htbabababa", "hubabababa", "hvbabababa", "hwbabababa", "hxbabababa", "hybabababa", "hzbabababa", "iababababa", "ibbabababa", "icbabababa", "idbabababa", "iebabababa", "ifbabababa", "igbabababa", "ihbabababa", "iibabababa", "ijbabababa", "ikbabababa", "ilbabababa", "imbabababa", "inbabababa", "iobabababa", "ipbabababa", "iqbabababa", "irbabababa", "isbabababa", "itbabababa", "iubabababa", "ivbabababa", "iwbabababa", "ixbabababa", "iybabababa", "izbabababa", "jababababa", "jbbabababa", "jcbabababa", "jdbabababa", "jebabababa", "jfbabababa", "jgbabababa", "jhbabababa", "jibabababa", "jjbabababa", "jkbabababa", "jlbabababa", "jmbabababa", "jnbabababa", "jobabababa", "jpbabababa", "jqbabababa", "jrbabababa", "jsbabababa", "jtbabababa", "jubabababa", "jvbabababa", "jwbabababa", "jxbabababa", "jybabababa", "jzbabababa", "kababababa", "kbbabababa", "kcbabababa", "kdbabababa", "kebabababa", "kfbabababa", "kgbabababa", "khbabababa", "kibabababa", "kjbabababa", "kkbabababa", "klbabababa", "kmbabababa", "knbabababa", "kobabababa", "kpbabababa", "kqbabababa", "krbabababa", "ksbabababa", "ktbabababa", "kubabababa", "kvbabababa", "kwbabababa", "kxbabababa", "kybabababa", "kzbabababa", "lababababa", "lbbabababa", "lcbabababa", "ldbabababa", "lebabababa", "lfbabababa", "lgbabababa", "lhbabababa", "libabababa", "ljbabababa", "lkbabababa", "llbabababa", "lmbabababa", "lnbabababa", "lobabababa", "lpbabababa", "lqbabababa", "lrbabababa", "lsbabababa", "ltbabababa", "lubabababa", "lvbabababa", "lwbabababa", "lxbabababa", "lybabababa", "lzbabababa", "mababababa", "mbbabababa", "mcbabababa", "mdbabababa", "mebabababa", "mfbabababa", "mgbabababa", "mhbabababa", "mibabababa", "mjbabababa", "mkbabababa", "mlbabababa", "mmbabababa", "mnbabababa", "mobabababa", "mpbabababa", "mqbabababa", "mrbabababa", "msbabababa", "mtbabababa", "mubabababa", "mvbabababa", "mwbabababa", "mxbabababa", "mybabababa", "mzbabababa", "nababababa", "nbbabababa", "ncbabababa", "ndbabababa", "nebabababa", "nfbabababa", "ngbabababa", "nhbabababa", "nibabababa", "njbabababa", "nkbabababa", "nlbabababa", "nmbabababa", "nnbabababa", "nobabababa", "npbabababa", "nqbabababa", "nrbabababa", "nsbabababa", "ntbabababa", "nubabababa", "nvbabababa", "nwbabababa", "nxbabababa", "nybabababa", "nzbabababa", "oababababa", "obbabababa", "ocbabababa", "odbabababa", "oebabababa", "ofbabababa", "ogbabababa", "ohbabababa", "oibabababa", "ojbabababa", "okbabababa", "olbabababa", "ombabababa", "onbabababa", "oobabababa", "opbabababa", "oqbabababa", "orbabababa", "osbabababa", "otbabababa", "oubabababa", "ovbabababa", "owbabababa", "oxbabababa", "oybabababa", "ozbabababa", "pababababa", "pbbabababa", "pcbabababa", "pdbabababa", "pebabababa", "pfbabababa", "pgbabababa", "phbabababa", "pibabababa", "pjbabababa", "pkbabababa", "plbabababa", "pmbabababa", "pnbabababa", "pobabababa", "ppbabababa", "pqbabababa", "prbabababa", "psbabababa", "ptbabababa", "pubabababa", "pvbabababa", "pwbabababa", "pxbabababa", "pybabababa", "pzbabababa", "qababababa", "qbbabababa", "qcbabababa", "qdbabababa", "qebabababa", "qfbabababa", "qgbabababa", "qhbabababa", "qibabababa", "qjbabababa", "qkbabababa", "qlbabababa", "qmbabababa", "qnbabababa", "qobabababa", "qpbabababa", "qqbabababa", "qrbabababa", "qsbabababa", "qtbabababa", "qubabababa", "qvbabababa", "qwbabababa", "qxbabababa", "qybabababa", "qzbabababa", "rababababa", "rbbabababa", "rcbabababa", "rdbabababa", "rebabababa", "rfbabababa", "rgbabababa", "rhbabababa", "ribabababa", "rjbabababa", "rkbabababa", "rlbabababa", "rmbabababa", "rnbabababa", "robabababa", "rpbabababa", "rqbabababa", "rrbabababa", "rsbabababa", "rtbabababa", "rubabababa", "rvbabababa", "rwbabababa", "rxbabababa", "rybabababa", "rzbabababa", "sababababa", "sbbabababa", "scbabababa", "sdbabababa", "sebabababa", "sfbabababa", "sgbabababa", "shbabababa", "sibabababa", "sjbabababa", "skbabababa", "slbabababa", "smbabababa", "snbabababa", "sobabababa", "spbabababa", "sqbabababa", "srbabababa", "ssbabababa", "stbabababa", "subabababa", "svbabababa", "swbabababa", "sxbabababa", "sybabababa", "szbabababa", "tababababa", "tbbabababa", "tcbabababa", "tdbabababa", "tebabababa", "tfbabababa", "tgbabababa", "thbabababa", "tibabababa", "tjbabababa", "tkbabababa", "tlbabababa", "tmbabababa", "tnbabababa", "tobabababa", "tpbabababa", "tqbabababa", "trbabababa", "tsbabababa", "ttbabababa", "tubabababa", "tvbabababa", "twbabababa", "txbabababa", "tybabababa", "tzbabababa", "uababababa", "ubbabababa", "ucbabababa", "udbabababa", "uebabababa", "ufbabababa", "ugbabababa", "uhbabababa", "uibabababa", "ujbabababa", "ukbabababa", "ulbabababa", "umbabababa", "unbabababa", "uobabababa", "upbabababa", "uqbabababa", "urbabababa", "usbabababa", "utbabababa", "uubabababa", "uvbabababa", "uwbabababa", "uxbabababa", "uybabababa", "uzbabababa", "vababababa", "vbbabababa", "vcbabababa", "vdbabababa", "vebabababa", "vfbabababa", "vgbabababa", "vhbabababa", "vibabababa", "vjbabababa", "vkbabababa", "vlbabababa", "vmbabababa", "vnbabababa", "vobabababa", "vpbabababa", "vqbabababa", "vrbabababa", "vsbabababa", "vtbabababa", "vubabababa", "vvbabababa", "vwbabababa", "vxbabababa", "vybabababa", "vzbabababa", "wababababa", "wbbabababa", "wcbabababa", "wdbabababa", "webabababa", "wfbabababa", "wgbabababa", "whbabababa", "wibabababa", "wjbabababa", "wkbabababa", "wlbabababa", "wmbabababa", "wnbabababa", "wobabababa", "wpbabababa", "wqbabababa", "wrbabababa", "wsbabababa", "wtbabababa", "wubabababa", "wvbabababa", "wwbabababa", "wxbabababa", "wybabababa", "wzbabababa", "xababababa", "xbbabababa", "xcbabababa", "xdbabababa", "xebabababa", "xfbabababa", "xgbabababa", "xhbabababa", "xibabababa", "xjbabababa", "xkbabababa", "xlbabababa", "xmbabababa", "xnbabababa", "xobabababa", "xpbabababa", "xqbabababa", "xrbabababa", "xsbabababa", "xtbabababa", "xubabababa", "xvbabababa", "xwbabababa", "xxbabababa", "xybabababa", "xzbabababa", "yababababa", "ybbabababa", "ycbabababa", "ydbabababa", "yebabababa", "yfbabababa", "ygbabababa", "yhbabababa", "yibabababa", "yjbabababa", "ykbabababa", "ylbabababa", "ymbabababa", "ynbabababa", "yobabababa", "ypbabababa", "yqbabababa", "yrbabababa", "ysbabababa", "ytbabababa", "yubabababa", "yvbabababa", "ywbabababa", "yxbabababa", "yybabababa", "yzbabababa", "zababababa", "zbbabababa", "zcbabababa", "zdbabababa", "zebabababa", "zfbabababa", "zgbabababa", "zhbabababa", "zibabababa", "zjbabababa", "zkbabababa", "zlbabababa", "zmbabababa", "znbabababa", "zobabababa", "zpbabababa", "zqbabababa", "zrbabababa", "zsbabababa", "ztbabababa", "zubabababa", "zvbabababa", "zwbabababa", "zxbabababa", "zybabababa", "zzbabababa"];

const board = board3;
const words = words3;

console.log(`Are ${words} in board? [${findWords(board, words)}]`);
