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
import { startTimer2, stopTimer2 } from './js/timer.js'

// Lyn's lessons remove later

let errorMap = [];
const phaseOrder = [null, 'caseScore', 'imgScore', 'listScore'];

const w8 = ["sat", "pin", "tap", "pan", "nap"];
const w9 = [
    "sat", "sit", "pin", "tap", "pan", 
    "nap", "sip", "sap", "sis", "sin", 
    "tin", "tan", "tip", "pit", "pat", 
    "nip", "pig", "pic", "pad"
];

const rainbow       = document.querySelector('#rainbow');
const shuffleCheck  = document.querySelector('#shuffleCheck');
const rainbowCheck  = document.querySelector('#rainbowCheck');
const imageCheck    = document.querySelector('#imageCheck');
const menu          = document.querySelector('#menu');
const settings      = document.querySelector('#settings');
const goBtn         = document.querySelector('#goBtn');
const quizBtn       = document.querySelector('#quizBtn');
const linksBtn      = document.querySelector('#linksBtn');
const prevBtn       = document.querySelector('#prevBtn');
const homeBtn       = document.querySelector('#homeBtn');
const nextBtn       = document.querySelector('#nextBtn');
const optionGrid    = document.querySelector('#optionGrid');
const quizLayer     = document.querySelector('#quizLayer');
const quizDisplay   = document.querySelector('#quizDisplay');
const quizMenu      = document.querySelector('#quizMenu');
const gradeLayer    = document.querySelector('#gradeLayer');
const gradeMap      = document.querySelector('#gradeMap');
const gradeDigit    = document.querySelector('#gradeDigit');

const actions       = document.querySelector('#actions');
const pic           = document.querySelector('#pic');
const letterizer    = document.querySelector('#letterizer');
const translateWrap = document.querySelector('#translateWrap');
const translateText = document.querySelector('#translateText');

const linkCards        = document.querySelector('.link-cards')
const qrImgCap      = document.querySelector('.qr-img-cap');

const thisURL = "alexdonley.github.io/phonabulary"


goBtn.addEventListener('click', go);
prevBtn.addEventListener('click', previous);
homeBtn.addEventListener('click', goHome);
nextBtn.addEventListener('click', next);
quizBtn.addEventListener('click', startQuiz);
linksBtn.addEventListener('click', showLinks);

const audioDict = {
    "correct": "windowsXP_logon.mp3",
    "incorrect" : "windowsXP_default.mp3"
}

function generateAudio(str, vol) {
    const newSound = new Audio("./sfx/" + audioDict[str]);
    newSound.volume = vol;

    newSound.play()
}


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


const mainURL = "https://alexdonley.github.io/"
const miniURLs = [
    "phonabulary",
    "speak_up",
    "spin_wheel",
    "panels",
    "glossy",
    "readable",
    "watch_your_tone",
    "multitimer"
]

function generateQR(str, elem) {
    const imgSrc = QRCode.toDataURL(str, {
        width: 500,
        height: 500
    }).then(dataUrl => {
        const img = elem.querySelector('img');
        const cap = elem.querySelector('.caption');

        img.src = dataUrl;
        cap.innerText = str;
        cap.href = str;
        cap.target = "_blank"
        console.log(dataUrl)
    })
}

generateQR(mainURL + miniURLs[0], qrImgCap);

function populateLinkCards() {
    miniURLs.forEach(name => {
        const newCard = document.createElement('div');
        newCard.classList.add('one-link');
        newCard.addEventListener('click', QRclosure(mainURL + name, newCard))

        const newLink = document.createElement('div');
        newLink.classList.add('link-text');
        const spaceStr = name.replaceAll("_", " ");
        newLink.innerText = spaceStr;

        newCard.append(newLink);
        linkCards.append(newCard);
    })
}

function QRclosure(str, elem) {
    return function executeOnEvent(e) {
        generateQR(str, qrImgCap);

        const oldHighlight = document.querySelector('.highlight-card')
        if (oldHighlight) {
            oldHighlight.classList.remove('highlight-card');
        }
        
        elem.classList.add('highlight-card');
    }
}

populateLinkCards()

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

    optionGrid.innerHTML = ''
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
        optionGrid.appendChild(newButton);
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

    colorString = 'linear-gradient(90deg, ' + colorString + ')';
    rainbow.style.background = colorString;
}

colorRainbow();

// go button deletes elements in the container and loads list of words to read

function go(){
    if (selectedPhonics.length > 0) {
        
        switchLayer('flashcard')

        createQueue();
        if (shuffleCheck.checked === true){
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

    if (imageCheck.checked === true) {
        setTimeout(function(){
            changePic(currentWord)
        }, 500);
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

            if (rainbowIndexer.length > 0 && rainbowCheck.checked === true) {
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
            if (rainbowCheck.checked === true){
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
                const thisZhu = charToZhu(char);

                if (thisZhu) {
                    translateText.append(constructZhuRT(char, thisZhu))
                } else {
                    translateText.append(char)
                }
            })
                  
            translateWrap.classList.remove('clear');
            
            if (imageCheck.checked === true){
                toggleImg('show')
            }

            //changeBackground(currentWord);

        } else {
            wordCount++;
            
            if (imageCheck.checked === true){
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
        
    switchLayer('menu')
    
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

function switchLayer(str) {

    const layersArr = Array.from(document.querySelectorAll('.layer'));
    layersArr.forEach(layer => {
        layer.classList.add('hide');
    });

    const pickedLayer = document.querySelector('.' + str + '-layer');
    pickedLayer.classList.remove('hide')
}

function showLinks() {
    switchLayer('links')
}

// QUIZ FUNCTIONS

let quizQueue = [];
let correctAnswer = null;
let quizPhase;
const abcsOrder =[
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]
const correctLevels = [
    'q-incorrect', 
    'q-partial', 
    'q-close', 
    'q-correct'
]
const gradeCaptions = [
    'cases',
    'image to letter',
    'speech to letter',
    'total'
]

function startQuiz() {
    
    startTimer2()

    switchLayer('quiz')

    errorMap = [];
    quizPhase = 1;

    // 3 PHASES: 
    // match uppercase / lowercase
    // picture to letter
    // sound to letter

    // each phase I need to
    // prepare a shuffled queue of integers
    // show the prompt letter, image, or sound
    // display 4 button optionGrid

    defaultABCs.forEach(letterObj => {
        let letterDict = {};
        letterDict.lower = letterObj.lower;
        letterDict.caseScore = 3;
        letterDict.imgScore = 3;
        letterDict.listScore = 3;

        errorMap.push(letterDict);
    })

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
    const btnColors = ['a', 'b', 'c', 'd']
    
    let choiceArr = [answIdx];
    quizMenu.innerHTML = '';

    while (choiceArr.length < 4) {
        const randChoice = Math.floor(Math.random() * 26);

        if (!choiceArr.includes(randChoice)) {
            choiceArr.push(randChoice)
        }
    }

    choiceArr = shuffleOne(choiceArr);
    
    let col = 0;
    choiceArr.forEach(choice => {
        const thisChoice = document.createElement('button');
        thisChoice.innerText = defaultABCs[choice]['lower'];
        thisChoice.classList.add('quiz-btn');
        thisChoice.classList.add(btnColors[col]);

        if (choice == answIdx) {
            thisChoice.addEventListener('click', isAnswCorrect(true));
        } else {
            thisChoice.addEventListener('click', isAnswCorrect(false, answIdx));
        }

        quizMenu.append(thisChoice);
        col++;
    })
}

function isAnswCorrect(bool, idx, map) {

    return function executeOnEvent (e) {
        
        if (bool) {

            if (quizPhase < 3) {
                generateAudio('correct', 1)
            }

            if (quizQueue.length > 1) {
                nextQuizQuestion()
            } else if (quizPhase < 3) {
                startPhase(quizPhase + 1)
            } else {
                showQuizScore()
            }

        } else {

            generateAudio('incorrect', 1)

            errorMap[idx][phaseOrder[quizPhase]] -= 1
            console.log(errorMap)

            e.target.disabled = true
            e.target.classList.add('grayed-out')
        }
    }
}

function nextQuizQuestion() {
    
    quizQueue.shift();
    correctAnswer = quizQueue[0];
    
    if (quizPhase == 1) {

        prepQuizText(defaultABCs[correctAnswer]['upper']);
        
    } else if (quizPhase == 2) {

        prepQuizImage(correctAnswer);

    } else if (quizPhase == 3) {

        prepQuizAudio(defaultABCs[correctAnswer]['noun']);

    }

    populateQuizBtns(correctAnswer);
}

function assignSpeech(idx) {

    return function executeOnEvent (e) {
        synthSpeak(defaultABCs[idx]['noun'], 0.5, 1.0, 'en');
    }
}

function prepQuizText(str) {
    quizDisplay.innerText = str;
}

function prepQuizImage(idx) {

    const newImg = document.createElement('img');
    newImg.classList.add('quiz-img');

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
    console.log('show quiz score');
    
    quizLayer.classList.add('hide');

    gradeLayer.classList.remove('hide');
    const progResults = generateGradeVisual(errorMap)

    gradeMap.append(progResults[0]);

    let i = 0;
    progResults[1].forEach(num => {
        const digitRuby = document.createElement('ruby');
        digitRuby.innerText = num + "%";
        digitRuby.classList.add('grades');

        if (i < 3) {
            digitRuby.classList.add('upper-grade');
        } else {
            digitRuby.classList.add('lower-grade');
        }

        const gradeCap = document.createElement('rt');
        gradeCap.innerText = gradeCaptions[i]
        digitRuby.append(gradeCap)

        gradeDigit.append(digitRuby);
        i++
    });

    const timerRuby = document.createElement('ruby');
    timerRuby.classList.add('lower-grade');
    timerRuby.classList.add('grades');
    timerRuby.innerText = stopTimer2()[1];

    const timeCap = document.createElement('rt');
    timeCap.innerText = 'time';
    timerRuby.append(timeCap);

    gradeDigit.append(timerRuby);
}

function generateGradeVisual(map) {

    let caseRaw = 0;
    let imgRaw = 0;
    let listRaw = 0;

    const gradeWrap = document.createElement('div');
    gradeWrap.classList.add('fixed-grid')
    gradeWrap.style.display = 'grid';
    
    const columnStr = "1fr ".repeat(map.length + 1);
    gradeWrap.style.gridTemplateColumns = columnStr;

    for (let n = 0; n < 4; n++) {
        const textDiv = document.createElement('div');
        textDiv.innerText = phaseOrder[n];
        textDiv.style.color = 'white'

        gradeWrap.append(textDiv);
        
        map.forEach(obj => {
            const newDiv = document.createElement('div');
            
            let thisValue

            if (n == 0) {            
                thisValue = obj['lower'];
                newDiv.style.color = 'white'
            } else if (n == 1) {
                thisValue = obj['caseScore'];
                caseRaw += thisValue;
            } else if (n == 2) {
                thisValue = obj['imgScore'];
                imgRaw += thisValue;
            } else if (n == 3) {
                thisValue = obj['listScore'];
                listRaw += thisValue;
            }

            newDiv.innerText = thisValue;
            newDiv.classList.add('one-cell');

            if (!isNaN(thisValue)) {
                newDiv.classList.add(correctLevels[thisValue]);
            }

            gradeWrap.append(newDiv);
        })
    }

    const casePercent = Math.round(100 * caseRaw / (3 * map.length));
    const imgPercent = Math.round(100 * imgRaw / (3 * map.length));
    const listPercent = Math.round(100 * listRaw / (3 * map.length));
    const totalPercent = Math.round((casePercent + imgPercent + listPercent) / 3);

    console.log(casePercent, imgPercent, listPercent, totalPercent)

    return [gradeWrap, [casePercent, imgPercent, listPercent, totalPercent]];
}
