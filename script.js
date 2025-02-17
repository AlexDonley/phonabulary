import { 
     splitPinyin, addPinTone, 
     charToPin, charToZhu, pinToZhu,
     constructPinRT, constructZhuRT 
} from './js/ruby-text.js'
import {
    wordToPhonArr, wordToLetterArr, joinIntoClusters
} from './js/phon-process.js'
import { shuffleOne, shuffleInts } from './js/shuffle.js'
import { synthSpeak } from './js/speech-synth.js'

// Lyn's lessons remove later

const w8 = ["sat", "pin", "tap", "pan", "nap"]
const w9 = ["sat", "sit", "pin", "tap", "pan", "nap", "sip", "sap", "sis", "sin", "tin", "tan", "tip", "pit", "pat", "nip", "pig", "pic", "pad"]

const myDocument = document.documentElement;

const rainbow       = document.querySelector('#rainbow');
const shuffler      = document.querySelector('#shuffler');
const rainbower     = document.querySelector('#rainbower');
const imager        = document.querySelector('#imager');
const menu          = document.querySelector('#menu');
const settings      = document.querySelector('#settings');
const goBtn         = document.querySelector('#goBtn');
const quizBtn       = document.querySelector('#quizBtn')
const prevBtn       = document.querySelector('#prevBtn');
const homeBtn       = document.querySelector('#homeBtn');
const nextBtn       = document.querySelector('#nextBtn');
const options       = document.querySelector('#optionButtons');
const quizLayer     = document.querySelector('#quizLayer');
const quizDisplay   = document.querySelector('#quizDisplay');
const quizMenu      = document.querySelector('#quizMenu');

const actions       = document.querySelector('#actions');
const pic           = document.querySelector('#pic');
const letterizer    = document.querySelector('#letterizer');
const translateWrap = document.querySelector('#translateWrap');
const translateText = document.querySelector('#translateText');

goBtn.addEventListener('click', go);
prevBtn.addEventListener('click', previous);
homeBtn.addEventListener('click', goHome);
nextBtn.addEventListener('click', next);
quizBtn.addEventListener('click', startQuiz);


//let backdrop = document.getElementById('bg');

let rainbowRibbon = []
let rainbowIndexer = []

let letterCount
let wordCount = 0
let wordLength
let currentWord

let n
let hue

let selectedPhonics = []
let wordQueue = []

let EN_ZH_img
let defaultWordLists
let defaultABCs

function loadtranslateTexts(){
    fetch('./data/EN_ZH_img.json')
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS');
        } else {
            console.log('FAILURE');
        }
        return res.json();
    })
    .then(data => {
        EN_ZH_img = data;
    })
    .catch(error => console.log(error));
}

function loadWordLists(){
    fetch('./data/lets_phons.json')
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS');
        } else {
            console.log('FAILURE');
        }
        return res.json();
    })
    .then(data => {
        defaultWordLists = data;
        populatePhonicBtns();
    })
    .catch(error => console.log(error));
}

function loadABCs(){
    fetch('./data/abcs.json')
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS');
        } else {
            console.log('FAILURE');
        }
        return res.json();
    })
    .then(data => {
        defaultABCs = data;
    })
    .catch(error => console.log(error));
}

loadtranslateTexts()
loadWordLists()
loadABCs()

function populatePhonicBtns(){

    options.innerHTML = ''
    selectedPhonics = []
    wordQueue = [];

    // console.log(Object.keys(defaultWordLists[1]))

    let n = 0
    for (const key of Object.keys(defaultWordLists[1])) {
        
        let newButton = document.createElement("button");
        newButton.classList.add('one-option');
        newButton.id = "phon" + n;
        newButton.innerHTML = key;
        newButton.addEventListener('click', managePhonicList(key))
        options.appendChild(newButton);
        n++

    }
}

function managePhonicList(str) {
    return function executeOnEvent (e) {
        const queueInd = selectedPhonics.indexOf(str)
        const phonInd = Object.keys(defaultWordLists[1]).indexOf(str)

        if (queueInd > -1) {
            selectedPhonics.splice(queueInd, 1);
            document.querySelector('#phon' + phonInd).classList.remove('selected-phonics');
        } else {
            selectedPhonics.push(str);
            document.querySelector('#phon' + phonInd).classList.add('selected-phonics');
        }   

        console.log(selectedPhonics)

        if (selectedPhonics.length > 0) {
            goBtn.removeAttribute("disabled")
        } else {
            goBtn.setAttribute("disabled", true)
        }
    }
}

function colorRainbow(hue) {
    let colorString = "";
    
    let colorIndex = [];
    const defaultColor = 'rgb(56, 56, 56)';

    if (!hue){
        for (let n=0; n < 60; n++) {
            const tempArray = [defaultColor, 5 * n / 3];
            rainbowRibbon.push(tempArray);
            rainbowIndexer.push(n);
        }

    } else {
        hue -=1;

        n = 0;

        const hslString = 'hsl(' + hue + ' 80% 80%)';
        const index = hue / 3.6;
        const colorIndex = [hslString, index];

        console.log(colorIndex);
        
        while (rainbowRibbon[n][1] < colorIndex[1]) {
            n++;        
        }
        
        rainbowRibbon.splice(n, 1, colorIndex);

    }

    n = 0;

    rainbowRibbon.forEach(item => {
        
        colorString += item[0] + ' ' + item[1] + '%';
        
        n++
        if (!(n==rainbowRibbon.length)){
            colorString += ', ';
        }
        
    })
    colorString = 'linear-gradient(90deg, ' + colorString + ')'
    //console.log(colorString);

    rainbow.style.background = colorString;
}

colorRainbow();

// go button deletes elements in the container and loads list of words to read

function go(){
    if (selectedPhonics.length > 0) {
        
        options.classList.add('hide');
        settings.classList.add('hide');
        actions.classList.remove('hide');

        createQueue();
        if (shuffler.checked === true){
            wordQueue = shuffleOne(wordQueue);
        }

        wordCount = 0;
        loadNextWord();
    }
};

function createQueue(){
    wordQueue = [];

    let item;
    let phone;
    let nextArray = [];


    for (item in selectedPhonics){
        phone = selectedPhonics[item];
        nextArray = defaultWordLists[1][phone];
        console.log(nextArray);
        wordQueue = wordQueue.concat(nextArray)
    }
    console.log(wordQueue)
}

/// PHONABULARY CODE

function loadNextWord(){

    translateWrap.classList.add('clear');

    letterCount = 0;
    currentWord = wordQueue[wordCount];

    const nextPhons = wordToPhonArr(currentWord)

    populateLetters(nextPhons)
}

function populateLetters(arr){
    letterizer.innerHTML = '';
    
    n = 0;
    wordLength = arr.length;
    arr.forEach(phone =>{
        const newSpan = document.createElement('span');
        newSpan.setAttribute('id', ("span" + n));
        newSpan.classList.add('unselected')
        newSpan.innerText = phone;
        letterizer.appendChild(newSpan);
        n++;
    })

    if (imager.checked === true) {
        setTimeout(function(){
            changePic(currentWord)
        }, 500);
    }
}

//fullscreen button 

function toggleFullscreen(){
    //console.log(fullbtn);
    
    if (fullbtn.innerHTML == "fullscreen"){
        
        if(myDocument.requestFullscreen){
            myDocument.requestFullscreen();
        } else if(myDocument.msRequestFullscreen){
            myDocument.msRequestFullscreen();
        } else if (myDocument.mozRequestFullscreen){
            myDocument.mozRequestFullscreen();
        } else if (myDocument.webkitRequestFullscreen){
            myDocument.webkitRequestFullscreen();
        }

    } else {
        
        if(document.exitFullscreen){
            document.exitFullscreen();
        } else if (document.msexitFullscreen){
            document.msexitFullscreen();
        } else if (document.mozexitFullscreen){
            document.mozexitFullscreen();
        } else if (document.webkitexittFullscreen){
            document.webkitexittFullscreen();
        }
    }
}

//keyboard controls

window.addEventListener('keydown', (ev) =>{
    //console.log(ev)
    if (ev.key == 'ArrowUp' || ev.key == 'PageUp'){
        previous();
    } else if (ev.key == 'ArrowDown'|| ev.key == 'PageDown'){
        next();
    } else if (ev.key == 'b'){
        console.log('b')
    }
})

function next(){
    if (wordCount < wordQueue.length){
        if (letterCount < wordLength) {
            let currentLetter = document.getElementById('span' + letterCount)
            currentLetter.classList.add('bigger');
            // this code is for random colored letters

            if (rainbowIndexer.length > 0 && rainbower.checked === true) {
                let huePick = rainbowIndexer[Math.floor(Math.random() * rainbowIndexer.length)];
                rainbowIndexer.splice(rainbowIndexer.indexOf(huePick), 1);
                console.log(rainbowIndexer);
                hue = huePick * 6
            } else {
                hue = Math.floor(Math.random() * 60) * 6;
            }


            // switch the the code below for rainbow lettering
            // hue = 360 * (letterCount) / wordLength
            currentLetter.style.color = `hsl(${hue}, 80%, 80%)`;
            if (rainbower.checked === true){
                hue += 1;
                colorRainbow(hue);
            }

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
            
            const eCheck = document.getElementById('span' + (letterCount))
            if (letterCount == wordLength - 1 && eCheck.innerHTML == 'e' && eCheck.classList.contains("bigger")) {
                letterCount++;
            }

            // console.log(letterCount)

        } else if (letterCount == wordLength) {
            letterCount++;
            let allLetters = document.getElementsByTagName('span');

            // console.log(allLetters);

            // re-add to spin the letters on word completion

            
            Array.prototype.forEach.call(allLetters, function(el) {
                //el.classList.add('spin');
                el.classList.add('letters-when-reveal-pic');
            });
            
            const index = EN_ZH_img.findIndex(item => item.en === currentWord)
            
            let charArr = EN_ZH_img[index].zh[0].split('')

            translateText.innerHTML = ''
            
            charArr.forEach(char => {
                
                
                translateText.append(constructZhuRT(char, charToZhu(char))) 
            })
                  
            translateWrap.classList.remove('clear');
            
            if (imager.checked === true){
                toggleImg('show')
            }

            //changeBackground(currentWord);

        } else {
            wordCount++;
            
            if (imager.checked === true){
                toggleImg('hide')
            }

            if (wordCount < wordQueue.length){
                loadNextWord();
            }
            
            //changeBackground('none');

        }
    } else if (wordCount == wordQueue.length) {
        goHome()
    }
}

function goHome() {
    letterizer.innerHTML = '';
        
    actions.classList.add('hide');
    translateWrap.classList.add('clear');
    
    
    options.classList.remove('hide');
    settings.classList.remove('hide');
    
    if (!(pic.classList.contains('disappear'))){
        toggleImg('hide')
    }

    wordCount = 0;
    wordQueue = [];
}

function previous(){
    if (!(pic.classList.contains('disappear'))){
        toggleImg('hide')
    }
    if (wordCount > 0 || letterCount > 0){
        if (letterCount > 0){
            letterCount--;
            let currentLetter = document.getElementById('span' + letterCount)
            currentLetter.classList.remove('bigger');
            console.log(letterCount)
        } else if (letterCount == (wordLength +1)) {
            letterCount -= 2;
        } else {
            wordCount--;
            loadNextWord(wordCount);
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

function toggleImg(str){
    const classes = pic.classList;

    let toggleBool

    if (str == 'show') {
        toggleBool = true
    } else if (str == 'hide') {
        toggleBool = false
    } else {
        toggleBool = classes.contains('disappear')
    }

    if (toggleBool) {
        classes.remove('disappear')
    } else {
        classes.add('disappear')
    }   
}

function changePic(word) {
    let key
    
    if (word) {
        const index = EN_ZH_img.findIndex(item => item.en === word)
        key = "https://images.unsplash.com/photo-" + 
            EN_ZH_img[index].Unsplash[0] + 
            "?h=600&auto=format&fit=crop&q=5";
    }

    pic.src = key;
}


// QUIZ FUNCTIONS

let quizQueue = [];
let correctAnswer = null;
let quizPhase;

function startQuiz() {
    console.log(defaultABCs[0]['lower']);

    options.classList.add('hide');
    settings.classList.add('hide');
    quizLayer.style.display = 'flex'

    quizPhase = 3;

    // 3 PHASES: 
    // match uppercase / lowercase
    // picture to letter
    // sound to letter

    // each phase I need to
    // prepare a shuffled queue of integers
    // show the prompt letter, image, or sound
    // display 4 button options

    startPhase(quizPhase);
}

function startPhase(int) {

    quizPhase = int
    quizQueue = shuffleInts(26);
    correctAnswer = quizQueue[0];

    if (quizPhase == 1) {

        prepQuizText(defaultABCs[correctAnswer]['upper']);
        
    } else if (quizPhase == 2) {

        prepQuizImage(correctAnswer)

    } else if (quizPhase == 3) {

        prepQuizAudio(defaultABCs[correctAnswer]['noun'])

    }

    populateQuizBtns(correctAnswer);
}

function populateQuizBtns(answIdx) {
    let choiceArr = [answIdx];
    quizMenu.innerHTML = '';

    for (
        let randChoice = Math.floor(Math.random() * 26); 
        choiceArr.length < 4; 
        choiceArr.push(randChoice)
    ) {
        randChoice = Math.floor(Math.random() * 26);
    }

    choiceArr = shuffleOne(choiceArr);
    
    choiceArr.forEach(choice => {
        const thisChoice = document.createElement('button');
        thisChoice.innerText = defaultABCs[choice]['lower'];
        thisChoice.classList.add('quiz-btn');

        if (choice == answIdx) {
            thisChoice.addEventListener('click', isAnswCorrect(true))
        } else {
            thisChoice.addEventListener('click', isAnswCorrect(false))
        }

        quizMenu.append(thisChoice)
    })
}

function isAnswCorrect(bool) {

    return function executeOnEvent (e) {
        
        if (bool) {

            if (quizQueue.length > 0) {
                nextQuizQuestion()
            } else if (quizPhase < 3) {
                quizPhase += 1
                startPhase(quizPhase)
            } else {
                showQuizScore()
            }

        } else {
            console.log(e)
            e.target.disabled = true
        }
    }
}

function nextQuizQuestion() {
    
    quizQueue.shift();
    correctAnswer = quizQueue[0];
    
    if (quizPhase == 1) {

        prepQuizText(defaultABCs[correctAnswer]['upper']);
        
    } else if (quizPhase == 2) {

        prepQuizImage(correctAnswer)

    } else if (quizPhase == 3) {

        prepQuizAudio(defaultABCs[correctAnswer]['noun'])

    }

    populateQuizBtns(correctAnswer);
}

function assignSpeech(idx) {

    return function executeOnEvent (e) {
        synthSpeak(defaultABCs[idx]['noun'], 0.5, 1.0, 'en')
    }
}

function prepQuizText(str) {
    quizDisplay.innerText = str;
}

function prepQuizImage(idx) {

    const newImg = document.createElement('img');
    newImg.classList.add('quiz-img')
    // const imgURL = "https://images.unsplash.com/photo-" + 
    //     defaultABCs[correctAnswer]['Unsplash'] + 
    //     "?h=600&auto=format&fit=crop&q=5";
    const imgURL = "https://www.svgrepo.com/show/" +
        defaultABCs[idx]['SVGRepo']
    console.log(imgURL)
    newImg.src = imgURL
    quizDisplay.innerHTML = ''
    quizDisplay.append(newImg)
}

function prepQuizAudio(str) {

    synthSpeak(str, 0.5, 1.0, 'en')

    const speakBtn = document.createElement('button');
    const speakerSVG = document.createElement('img');
    speakerSVG.src = "https://www.svgrepo.com/show/505507/speaker-2.svg";
    speakBtn.append(speakerSVG);
    speakBtn.classList.add('speak-btn')
    speakBtn.addEventListener('click', assignSpeech(correctAnswer));

    quizDisplay.innerHTML = '';
    quizDisplay.append(speakBtn);
}

function showQuizScore() {

}
