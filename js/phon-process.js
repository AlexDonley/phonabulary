// import {
//     wordToPhonArr, wordToLetterArr, joinIntoClusters
// } from './js/phon-process.js'

const vows = ['a', 'e', 'i', 'o', 'u', 'y']
const cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
const semivows = ['w', 'y']

const vowelDigraphs = [
    "ae", "ai", "ao", "au", "aw", "ay", "ar",
    "ea", "ee", "ei", "eo", "eu", "ew", "ey", "er",
    "ia", "ie", "io", "iu", "ir",
    "oa", "oe", "oi", "oo", "ou", "ow", "oy", "or",
    "ua", "ue", "ui", "uo", "ur"
]

// false digraph: "hr"

const onsetDigraphs = [
    "ch", "ph", "sh", "th", "wh",
    "br", "cr", "dr", "fr", "gr", "hr", "kr", "pr", "sr", "tr", "vr", "wr",
    "bl", "cl", "fl", "gl", "kl", "pl",
    "sl", "sm", "sn", "sp", "st", "sv", "sw",
    "kn", "gn", "pn", "pt"
]

const onsetTrigraphs = [
    "scr", "str", "spr", "spl", "thr"
]

// false digraphs: "ms" "ns", have to change the logic of how it determines tri and digraphs

const codaDigraphs = [
    "bb", "cc", "ck", "ch", "ct", "dd", "ff", "ft", "gg", "lk", "ll", "lp", "lt", 
    "mb", "mm", "mp", "ms", "nc", "nd", "ng", "nk", "nn", "nt", "ns", "pp", 
    "rb", "rc", "rd", "rk", "rr", "rt", "sh", "sk", "ss", "st", "th", "tt"
]

const codaTrigraphs = [
    "mph", "mst", "nch", "ndt", "nst"
]

const nonlets = [
    ' ', '.', '!', 
    '?', '@', '#', 
    '$', '%', '^', 
    '&', '*', '-', 
    '_', '+', '='
]

export function wordToPhonArr(word) {
    const theseChars = wordToLetterArr(word)
    const thesePhons = joinIntoClusters(theseChars, word)

    return thesePhons
}

console.log(wordToPhonArr('glalt'))

export function wordToLetterArr(word){
    const charArray = word.split('');

    return charArray
}

export function joinIntoClusters(charArr, word){
    
    let phonArr = charArr
    let n = 0;
    let vowelTest;
    let codaTest1;
    let codaTest2;
    let onsetTest1;
    let onsetTest2;

    phonArr.forEach(char =>{
        if (vows.includes(char)) {
            
            // check for vowel digraphs
            
            vowelTest = char + phonArr[n + 1];
            if (vowelDigraphs.includes(vowelTest) && !(word == 'here')) {
                phonArr.splice(n, 2, vowelTest);
            }

            // check for -gh vowels

            if (phonArr[n+1] + phonArr[n+2] == 'gh' ){
                phonArr.splice(n, 3, (char + 'gh'));
            }

            codaTest1 = phonArr[n+1] + phonArr[n+2];
            
            if (codaDigraphs.includes(codaTest1)) {

                codaTest2 = (codaTest1 + phonArr[n+3]);

                if (codaTrigraphs.includes(codaTest2)) {
                    phonArr.splice((n + 1), 3, codaTest2);
                } else {
                    phonArr.splice((n + 1), 2, codaTest1);
                }
            }

            onsetTest1 = (phonArr[n-2] + phonArr[n-1]).toString();

            if (onsetDigraphs.includes(onsetTest1.toLowerCase())){
                onsetTest2 = (phonArr[n-3] + onsetTest1).toString();
                if (onsetTrigraphs.includes(onsetTest2)){
                    phonArr.splice((n - 3), 3, onsetTest2);
                } else{
                    phonArr.splice((n - 2), 2, onsetTest1);
                }                
            }
        }
        n++;
    })
    
    return phonArr;
}