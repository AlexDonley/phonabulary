/// BUTTONS CODE
import{
    vows, cons,semivows,
    onsetDigraphs,onsetTrigraphs,vowelDigraphs,codaDigraphs,nonlets,
    a,e,i,o,u,a_e,e_e,i_e,o_e,u_e,igh,ph,ch,sh,th1,th2,wh,ng,ck,
    oa,oo1,oo2,ou,ow1,ow2,oi_oy,ai_ay,au_aw,all,ea1,ea2,ee,
    ar,or,er,ir,ur,y1,y2,softc,softg,bl,pl,cl,gl,fl,sl,br,pr,cr,gr,dr,fr,tr,sc_sk,
    sm,sn,sw,sp,st,tion,sion,
    graphemes,translations
} from './langData.js';


const menu = document.getElementById("menu");
const actions = document.getElementById("actions");
const wrapper = document.getElementById("wrapper")

const buttonGrid = document.getElementById("buttonGrid")
let letterizer = document.getElementById('letterizer');
let backdrop = document.getElementById("bg");
let letterCount
let wordCount = 0;
let wordLength
let currentWord

let n;
let hue;

let colors = ['yellow', 'cyan', 'orange', 'pink', 'coral'];
let input = "The quick brown fox jumps over the lazy dog."
let sampleList = ['thrall', 'chin', 'splat', 'mouth', 'strong', 'chang']

let selectedPhonics = []

let wordQueue = [];

async function spawnButtons(){

    for (const key of Object.keys(graphemes)) {
        //console.log(key);
        wordQueue = [];
        let newButton = document.createElement("button");
        //newButton.onclick = "flip()";
        newButton.id = key;
        newButton.innerHTML = key;
        buttonGrid.appendChild(newButton);

    }
}

spawnButtons();


const buttons = document.getElementsByTagName("button");
const buttonPressed = e => {
    let clickedButton = e.target.id;
    //console.log(clickedButton);  // Get ID of Clicked Element
    flip(clickedButton)
}

for (let button of buttons) {
  button.addEventListener("click", buttonPressed);
}


// flip button

async function flip(it){
    // console.log('flip');
    
    let flipperClass = document.getElementById(it).classList;

    if (it == "go"||it == "fixedbtn") {
        go();
    } else {

    if (flipperClass.contains("selectedPhonics")){
        flipperClass.remove("selectedPhonics");
    } else {
        flipperClass.add("selectedPhonics");
    }

    if (selectedPhonics.includes(it)){
        // console.log(selectedPhonics[selectedPhonics.indexOf(it)]);
        selectedPhonics.splice(selectedPhonics.indexOf(it), 1)
    } else {
        selectedPhonics.push(it);
    }

    console.log(selectedPhonics);
}
}


// go button deletes elements in the container and loads list of words to read

async function go(){
    buttonGrid.innerHTML = "";
    wrapper.innerText = "";
    createQueue();
    console.log(actions);
    actions.innerHTML +=
        '<div class="fixed"><button type=btn class="fixedbtn" id="btn" onClick="previous()">previous</button><button type=btn class="fixedbtn" id="fullbtn" onClick="fullscreen()">fullscreen</button><button type=btn class="fixedbtn" id="btn" onClick="next()">next</button></div>'
    loadNextWord();
};

function createQueue(){
    wordQueue = [];

    let ent;
    let phone;
    let nextArray = [];


    for (ent in selectedPhonics){
        phone = selectedPhonics[ent];
        nextArray = graphemes[phone];
        console.log(nextArray);
        wordQueue = wordQueue.concat(nextArray)
    }
    console.log(wordQueue)
}

/// PHONABULARY CODE



// filter out the punctuation of an array based on the above array of non-letters
// the function loops through the array of non-letters and filters them out one at a time
// is there an easier way to do this in Javascript? Honestly unsure

async function splitIntoLetters(){
    let charArray;

    charArray = letterizer.innerText.split('')
    letterizer.innerHTML = '';
    joinIntoClusters(charArray);
}

function joinIntoClusters(arr){
    let n = 0;
    let vowelTest;
    let codaTest;
    let onsetTest1;
    let onsetTest2;

    arr.forEach(char =>{
        if (vows.includes(char)) {
            vowelTest = char + arr[n + 1];
            if (vowelDigraphs.includes(vowelTest)) {
                arr.splice(n, 2, vowelTest);
            }

            //check for -gh vowels

            if (arr[n+1] + arr[n+2] == 'gh' ){
                arr.splice(n, 3, (char + 'gh'));
            }

            codaTest = arr[n+1] + arr[n+2];
            //console.log(codaTest);
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
        //newSpan.classList.add('small');
        newSpan.innerText = character;
        letterizer.appendChild(newSpan);
        n++;
    })
}

function loadNextWord(){
    // console.log(wordQueue);
    
    letterCount = 0;
    currentWord = wordQueue[wordCount];
    letterizer.innerHTML = currentWord;
    console.log(wordLength);
    splitIntoLetters();
}

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
    if (ev.key == 'ArrowUp' || ev.key == 'PageUp'){
        previous();
    } else if (ev.key == 'ArrowDown'|| ev.key == 'PageDown'){
        next();
    } else if (ev.key == 'b'){
        //changeBackground(currentWord);
    }
})

function next(){
    if (wordCount < wordQueue.length){
        if (letterCount < wordLength) {
            let currentLetter = document.getElementById('span' + letterCount)
            currentLetter.classList.add('bigger');
            hue = 360 * (letterCount) / wordLength
            currentLetter.style.color = `hsl(${hue}, 80%, 80%)`;

            // check for silent e

            if (letterCount == wordLength - 3) {
                let twoLettersDown = document.getElementById('span' + (letterCount + 2))

                if (twoLettersDown.innerHTML == 'e'){
                    twoLettersDown.classList.add('bigger')
                    twoLettersDown.style.color = 'lightgray';
                }

                // console.log(twoLettersDown.innerHTML)
            }
            
            letterCount++;
            
            if (letterCount == wordLength - 1 && document.getElementById('span' + (letterCount)).innerHTML == 'e') {
                letterCount++;
            }

            // console.log(letterCount)

        } else if (letterCount == wordLength) {
            letterCount++;
            let allLetters = document.getElementsByTagName('span');

            // console.log(allLetters);

            Array.prototype.forEach.call(allLetters, function(el) {
                el.classList.add('spin');
            });

            //changeBackground(currentWord);

        } else {
            wordCount++;
            
            if (wordCount < wordQueue.length){
                loadNextWord();
            }
            
            //changeBackground('none');

        }
    } else if (wordCount == wordQueue.length) {
        letterizer.innerHTML = "";
        actions.innerHTML = "";
        spawnButtons();
        wrapper.innerHTML = '<button class="go" onclick="go()" id="go">GO</button>'
    }
}

function previous(){
    if (wordCount > 0 || letterCount > 0){
        if (letterCount > 0){
            letterCount--;
            let currentLetter = document.getElementById('span' + letterCount)
            currentLetter.classList.remove('bigger');
            console.log(letterCount)
        } else if (letterCount == (wordLength +1)) {
            letterCount--;
        }
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