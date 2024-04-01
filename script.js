let letterizer = document.getElementById('letterizer');
let backdrop = document.getElementById("bg");
let letterCount
let wordCount = 0;
let wordLength
let currentWord


let colors = ['yellow', 'cyan', 'orange', 'pink', 'coral'];

let input = "The quick brown fox jumps over the lazy dog."
let sampleList = ['thrall', 'chin', 'splat', 'mouth', 'strong', 'chang']
const vows = ['a', 'e', 'i', 'o', 'u']
const cons = [
    'b', 'c', 'd', 
    'f', 'g', 'h', 
    'j', 'k', 'l', 
    'm', 'n', 'p', 
    'q', 'r', 's', 
    't', 'v', 'w', 
    'x', 'y', 'z'
]
const semivows = ['w', 'y']

//have to fix hr, not a real digraph

const onsetDigraphs = [
    "ch", "ph", "sh", "th", "wh",
    "br", "cr", "dr", "fr", "gr", "hr", "kr", "pr", "sr", "tr", "vr", "wr",
    "bl", "cl", "fl", "gl", "kl", "pl",
    "sl", "sm", "sn", "sp", "st", "sv",
]
const vowelDigraphs = [
    "ae", "ai", "ao", "au", "aw", "ay", "ar",
    "ea", "ee", "ei", "eo", "eu", "ew", "ey", "er",
    "ia", "ie", "io", "iu", "ir",
    "oa", "oe", "oi", "oo", "ou", "ow", "oy", "or",
    "ua", "ue", "ui", "uo", "ur"
]
const onsetTrigraphs = [
    "scr", "str", "spr", "spl", "thr"
]
const codaDigraphs = [
    "th", "ck", "ll", "ss", "ff", "ng", "nk"
]


const nonlets = [
    ' ', '.', '!', 
    '?', '@', '#', 
    '$', '%', '^', 
    '&', '*', '-', 
    '_', '+', '='
]

// filter out the punctuation of an array based on the above array of non-letters
// the function loops through the array of non-letters and filters them out one at a time
// is there an easier way to do this in Javascript? Honestly unsure

async function splitIntoLetters(){
    charArray = letterizer.innerText.split('')
    letterizer.innerHTML = '';
    joinIntoClusters(charArray);
}

function joinIntoClusters(arr){
    n = 0;
    arr.forEach(char =>{
        if (vows.includes(char)) {
            vowelTest = char + arr[n + 1];
            if (vowelDigraphs.includes(vowelTest)) {
                arr.splice(n, 2, vowelTest);
            }

            codaTest = arr[n+1] + arr[n+2];
            console.log(codaTest);
            if (codaDigraphs.includes(codaTest)) {
                arr.splice((n+1), 2, codaTest);
            }

            onsetTest1 = arr[n-2] + arr[n-1];
            if (onsetDigraphs.includes(onsetTest1)){
                onsetTest2 = arr[n-3] + onsetTest1;
                if (onsetTrigraphs.includes(onsetTest2)){
                    arr. splice((n - 3), 3, onsetTest2)
                } else{
                    arr.splice((n - 2), 2, onsetTest1);
                }                
            }

            
        }
        n++
    })
    console.log(arr);
    spanArray(arr);
}

function spanArray(arr){
    n = 0;
    wordLength = arr.length;
    arr.forEach(character =>{
        const newSpan = document.createElement('span');
        newSpan.setAttribute('id', ("span" + n))
        newSpan.classList.add('small');
        newSpan.innerText = character;
        letterizer.appendChild(newSpan);
        n++;
    })
}

function loadNextWord(){
    letterCount = 0;
    currentWord = sampleList[wordCount];
    letterizer.innerHTML = currentWord;
    console.log(wordLength);
    splitIntoLetters();
}

loadNextWord();

//fullscreen button 

let fullbtn = document.getElementById('fullbtn');
let myDocument = document.documentElement;

function fullscreen(){
    if (fullbtn.textContent == "fullscreen"){
        console.log("fullscreen")
        
        if(myDocument.requestFullscreen){
            myDocument.requestFullscreen();
        } else if(myDocument.msRequestFullscreen){
            myDocument.msRequestFullscreen();
        } else if (myDocument.mozRequestFullscreen){
            myDocument.mozRequestFullscreen();
        } else if (myDocument.webkitRequestFullscreen){
            myDocument.webkitRequestFullscreen();
        }


        fullbtn.textContent = "exit";
    } else {
        console.log("exit")
        
        if(document.exitFullscreen){
            document.exitFullscreen();
        } else if (document.msexitFullscreen){
            document.msexitFullscreen();
        } else if (document.mozexitFullscreen){
            document.mozexitFullscreen();
        } else if (document.webkitexittFullscreen){
            document.webkitexittFullscreen();
        }

        fullbtn.textContent = "fullscreen";
    }
}

//keyboard controls

window.addEventListener('keydown', (ev) =>{
    console.log(ev)
    if (ev.key == 'ArrowUp'){
        previous();
    } else if (ev.key == 'ArrowDown'){
        next();
    } else if (ev.key == 'b'){
        //changeBackground(currentWord);
    }
})

function next(){
    if (letterCount < wordLength) {
        let currentLetter = document.getElementById('span' + letterCount)
        currentLetter.classList.add('bigger');
        currentLetter.style.color = colors[Math.floor((Math.random() * colors.length))];
        letterCount++;
        console.log(letterCount)
    } else if (letterCount == wordLength) {
        letterCount++;
        //changeBackground(currentWord);
    } else {
        wordCount++;
        if (wordCount < sampleList.length){
            loadNextWord()
            changeBackground('none');
        }
    }
}

function previous(){
    if (letterCount > 0){
        letterCount--;
        let currentLetter = document.getElementById('span' + letterCount)
        currentLetter.classList.remove('bigger');
        console.log(letterCount)
    } else if (letterCount == (wordLength +1)) {
        letterCount--;
    }
}

// change background function

function changeBackground(name){
    if (name == 'none') {
        backdrop.style.backgroundImage='none';
    } else {    
        backdrop.style.backgroundImage="url(BGs/"+name+".jpg)";
        //backdrop.style.backgroundImage="url(BGs/"+name+".svg)";
    }
}