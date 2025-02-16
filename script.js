import { 
     splitPinyin, addPinTone, 
     charToPin, charToZhu, pinToZhu,
     constructPinRT, constructZhuRT 
} from './js/ruby-text.js'
import {
    wordToPhonArr, wordToLetterArr, joinIntoClusters
} from './js/phon-process.js'
import { shuffleOne } from './js/shuffle.js'

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
const goButton      = document.querySelector('#goButton');
const prevBtn       = document.querySelector('#prevBtn');
const homeBtn       = document.querySelector('#homeBtn');
const nextBtn       = document.querySelector('#nextBtn');
const options       = document.querySelector('#optionButtons');

const actions = document.getElementById('actions');
const pic = document.getElementById('pic');
const letterizer = document.getElementById('letterizer');
const translateWrap = document.getElementById('translateWrap');
const translateText = document.getElementById('translateText');

goButton.addEventListener('click', go);
prevBtn.addEventListener('click', previous);
homeBtn.addEventListener('click', goHome);
nextBtn.addEventListener('click', next)


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

loadtranslateTexts()
loadWordLists()

function populatePhonicBtns(){

    selectedPhonics = []
    wordQueue = [];

    console.log(Object.keys(defaultWordLists[1]))

    for (const key of Object.keys(defaultWordLists[1])) {
        
        let newButton = document.createElement("button");
        newButton.classList.add('phonic');
        newButton.id = key;
        newButton.innerHTML = key;
        newButton.addEventListener('click', managePhonicList(key))
        options.appendChild(newButton);

    }
}

function managePhonicList(str) {
    return function executeOnEvent (e) {
        const phonInd = selectedPhonics.indexOf(str)

        if (phonInd > -1) {
            selectedPhonics.splice(phonInd, 1);
            document.querySelector('#' + str).classList.remove('selected-phonics');
        } else {
            selectedPhonics.push(str);
            document.querySelector('#' + str).classList.add('selected-phonics');
        }   

        console.log(selectedPhonics)

        if (selectedPhonics.length > 0) {
            goButton.removeAttribute("disabled")
        } else {
            goButton.setAttribute("disabled", true)
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