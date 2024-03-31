let letterizer = document.getElementById('letterizer');
let backdrop = document.getElementById("bg");
let letterCount
let wordCount = 0;
let wordLength
let currentWord


let colors = ['yellow', 'cyan', 'orange', 'pink', 'coral'];

let input = "The quick brown fox jumps over the lazy dog."
let sampleList = ['cat', 'dog', 'hat', 'sun', 'pen', 'defenestration']
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

async function splitDisplayWord(){
    charArray = letterizer.innerText.split('')
    letterizer.innerHTML = '';
    n = 0;
    charArray.forEach(character =>{
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
    wordLength = sampleList[wordCount].length;
    console.log(wordLength);
    splitDisplayWord();
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
        changeBackground(currentWord);
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
        changeBackground(currentWord);
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