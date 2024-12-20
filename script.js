/// BUTTONS CODE
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

const a = ["bad", "mad", "sad", "fan", "man", "ham", "bat", "cat", "fat", "hat"]
const e = ["leg", "hen", "pen", "ten", "net", "pet", "set", "wet"]
const i = ["kid", "lid", "dig", "pig", "fin", "win", "kit", "hit"]
const o = ["job", "mom", "hop", "mop", "top", "dot", "not", "pot", "box", "fox"]
const u = ["cub",  "tub", "bug", "bun", "fun", "sun", "cup", "cut"]
const a_e = ["bake", "cake", "game", "name", "base", "case", "hate", "late", "save", "wave"]
const e_e = ["eve", "Steve", "here", "Pete", "these"]
const i_e = ["hide", "ride", "life", "wife", "bike", "like", "fine", "wine", "bite", "kite"]
const o_e = ["Coke", "home", "hope", "rope", "nose", "rose", "note", "vote"]
const u_e = ["cube", "tube", "June", "use", "cute"]
const igh = ["high", "light", "night", "right", "sight"]
const ph = ["phone", "photo"]
const ch = ["each", "teach", "much", "inch", "rich"]
const sh = ["she", "ship", "shop", "dish", "fish"]
const th1 = ["thin", "bath", "math", "with", "mouth"]
const th2 = ["the", "than", "that", "this", "them"]
const wh = ["who", "why", "when", "which", "white"]
const ng = ["king", "ring", "sing", "long", "song"]
const ck = ["back", "pack", "pick", "sick", "duck"]
const oa = ["boat", "coat", "goat", "road", "soap"]
const oo1 = ["good", "book", "cook", "look", "poor ", "foot"]
const oo2 = ["too", "zoo", "cool", "room", "moon"]
const ou = ["our", "out", "loud", "cloud", "round"]
const ow1 = ["bow", "cow", "how", "now", "down"]
const ow2 = ["own", "low", "row", "grow", "slow"]
const oi_oy = ["oil", "boil", "join", "point", "noise", "boy", "joy", "toy", ]
const ai_ay = ["fail", "mail", "nail", "tail", "rain", "day", "may", "pay", "say", "way"]
const au_aw = ["Paul", "cause", "dawn", "draw"]
const all = ["all", "ball", "call", "fall", "tall"]
const ea1 = ["sea", "lead", "read", "ear", "hear", ]
const ea2 = ["dead", "head", "bear", "pear", "wear"]
const ee = ["bee", "see", "need", "seed", "week"]
const ar = ["arm", "art", "car", "card", "far"]
const or = ["or", "for", "fork", "pork", "born"]
const er = ["her", "over", "river", "ruler", "order"]
const ir = ["sir", "bird", "girl", "first", "shirt"]
const ur = ["fur", "burn", "turn", "surf", "hurt"]
const y1 = ["yes", "yet", "yard", "year", "yo-yo", ]
const y2 = ["baby", "body", "very", "many", "tidy", "by", "my", "shy", "dry", "try"]
const softc = ["ice", "nice", "face", "city", "circle", "pencil", "cycle", "recycle"]
const softg = ["age", "cage", "page", "giant", "magic", "gym"]
const bl = ["blow", "black", "block"]
const pl = ["plan", "play", "place"]
const cl = ["clap", "class", "clean"]
const gl = ["glad", "glue", "glass"]
const fl = ["fly", "flag", "flower"]
const sl = ["slim", "slow", "sleep"]
const br = ["bread", "bring", "brush"]
const pr = ["pray", "price", "print"]
const cr = ["cry", "crab", "crazy"]
const gr = ["gram", "grade", "grape"]
const dr = ["dry", "drop", "drum"]
const fr = ["fry", "free", "frog"]
const tr = ["try", "tree", "trip"]
const sc_sk = ["scan", "score", "school", "sky", "ski", "skate"]
const sm = ["small", "smart", "smile"]
const sn = ["snow", "snack", "snake"]
const sw = ["swim", "swing", "sweet"]
const sp = ["spy", "speak", "spell"]
const st = ["stay", "star", "start"]
const tion = ["nation", "station", "lotion"]
const sion = ["abrasion", "pension", "lesion"]
const difficultWords = ["strengths", "pigheaded", "diode", "recycle", "one"]

const ie = ["pie", "tie", "lie", "die", "fried", "tried", "cried", "flies", "dried", "diet"]

// Lyn's lessons remove later

const w8 = ["sat", "pin", "tap", "pan", "nap"]
const w9 = ["sat", "sit", "pin", "tap", "pan", "nap", "sip", "sap", "sis", "sin", "tin", "tan", "tip", "pit", "pat", "nip", "pig", "pic", "pad"]


const graphemes = {
    'a': a, 'e': e, 'i': i, 'o': o, 'u': u,
    'a_e': a_e, 'e_e': e_e, 'i_e': i_e, 'o_e': o_e, 'u_e': u_e,
    'igh': igh, 'ph': ph, 'ch': ch, 'sh': sh, 'th 1': th1, 'th 2': th2, 'wh': wh,
    'ng': ng, 'ck': ck,
    'oa': oa, 'oo 1': oo1, 'oo 2': oo2, 'ou': ou, 'ow 1': ow1, 'ow 2':ow2, 'oi/oy': oi_oy, 
    'ai/ay': ai_ay, 'au/aw': au_aw, 'all': all, 'ea 1': ea1, 'ea 2': ea2, 'ee': ee,
    'ar': ar, 'or': or, 'er': er, 'ir': ir, 'ur': ur,
    'y-': y1, '-y': y2, 'soft c': softc, 'soft g': softg,
    'bl': bl, 'pl': pl, 'cl': cl, 'gl': gl, 'fl': fl, 'sl': sl,
    'br': br, 'pr': pr, 'cr': cr, 'gr': gr, 'fr': fr, 'tr': tr,
    'sc/sk': sc_sk, 'sm': sm, 'sn': sn, 'sw': sw, 'sp': sp, 'st': st,
    'tion': tion, 'sion': sion, '-ie': ie, 'w8' : w8, 'w9' : w9
}

const myDocument = document.documentElement;

const rainbow = document.getElementById('rainbow');
const shuffler = document.getElementById('shuffler');
const rainbower = document.getElementById('rainbower');
const imager = document.getElementById('imager');
const menu = document.getElementById('menu');
const settings = document.getElementById('settings');
const goButton = document.getElementById('goButton');
const options = document.getElementById('optionButtons');

const actions = document.getElementById('actions');
const pic = document.getElementById('pic');
const letterizer = document.getElementById('letterizer');
const chineseWrap = document.getElementById('chineseWrap');
const translation = document.getElementById('chinese');


//let backdrop = document.getElementById('bg');

let rainbowRibbon = []
let rainbowIndexer = []

let letterCount;
let wordCount = 0;
let wordLength;
let currentWord;

let n;
let hue;

let selectedPhonics = []
let wordQueue = [];
let EN_ZH_img

let speech = new SpeechSynthesisUtterance();

function loadJSON(){
    fetch('./JSON/EN_ZH_img.json')
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS');
        } else {
            console.log('FAILURE')
        }
        return res.json()
    })
    .then(data => {
        EN_ZH_img = data;
        console.log(data)
        example = EN_ZH_img.findIndex(item => item.English === "nice")
    })
    .catch(error => console.log('ERROR'))

}

loadJSON();

function createButtons(){

    selectedPhonics = []
    wordQueue = [];

    for (const key of Object.keys(graphemes)) {
        
        let newButton = document.createElement("button");
        newButton.classList.add('phonic');
        newButton.id = key;
        newButton.innerHTML = key;
        options.appendChild(newButton);

    }

}

createButtons();

function colorRainbow(hue) {
    colorString = "";
    
    colorIndex = [];
    defaultColor = 'rgb(56, 56, 56)'

    if (!hue){
        for (let n=0; n < 60; n++) {
            tempArray = [defaultColor, 5 * n / 3];
            rainbowRibbon.push(tempArray);
            rainbowIndexer.push(n);
        }

    } else {
        hue -=1;

        n = 0;

        hslString = 'hsl(' + hue + ' 80% 80%)';
        index = hue / 3.6;
        colorIndex = [hslString, index];

        console.log(colorIndex);
        
        while (rainbowRibbon[n][1] < colorIndex[1]) {
            n++;

            // console.log(rainbowRibbon[n][1]);
            // console.log(colorIndex[1]);         
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


const buttons = document.getElementsByTagName("button");

const buttonPressed = e => {
    
    let clickedButton = e.target.id;
    console.log(e.target.classList)
    console.log(clickedButton);  // Get ID of Clicked Element
    
    if (e.target.classList.contains('phonic')){
        if (e.target.classList.contains("selected-phonics")){
            e.target.classList.remove("selected-phonics");
        } else {
            e.target.classList.add("selected-phonics");
        }
        
        if (!(clickedButton == '')){
            if (selectedPhonics.includes(clickedButton)){
                selectedPhonics.splice(selectedPhonics.indexOf(clickedButton), 1)
            } else {
                selectedPhonics.push(clickedButton);
            }
            console.log(selectedPhonics);
        }
    }

    if (selectedPhonics.length > 0) {
        goButton.removeAttribute("disabled")
    } else {
        goButton.setAttribute("disabled", true)
    }
}

for (let button of buttons) {
  button.addEventListener("click", buttonPressed);
}


// go button deletes elements in the container and loads list of words to read

async function go(){
    if (selectedPhonics.length > 0) {
        
        options.classList.add('hide');
        settings.classList.add('hide');
        actions.classList.remove('hide');

        createQueue();
        if (shuffler.checked === true){
            wordQueue = shuffle(wordQueue);
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
    let codaTest1;
    let codaTest2;
    let onsetTest1;
    let onsetTest2;

    arr.forEach(char =>{
        if (vows.includes(char)) {
            
            // check for vowel digraphs
            
            vowelTest = char + arr[n + 1];
            if (vowelDigraphs.includes(vowelTest) && !(currentWord == 'here')) {
                arr.splice(n, 2, vowelTest);
            }

            // check for -gh vowels

            if (arr[n+1] + arr[n+2] == 'gh' ){
                arr.splice(n, 3, (char + 'gh'));
            }

            codaTest1 = arr[n+1] + arr[n+2];
            if (codaDigraphs.includes(codaTest1)) {
                codaTest2 = (codaTest1 + arr[n+3]);
                if (codaTrigraphs.includes(codaTest2)) {
                    arr. splice((n + 1), 3, codaTest2);
                } else {
                    arr.splice((n + 1), 2, codaTest1);
                }
                
            }

            onsetTest1 = (arr[n-2] + arr[n-1]).toString();

            if (onsetDigraphs.includes(onsetTest1.toLowerCase())){
                onsetTest2 = (arr[n-3] + onsetTest1).toString();
                if (onsetTrigraphs.includes(onsetTest2)){
                    arr. splice((n - 3), 3, onsetTest2);
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
        newSpan.innerText = character;
        letterizer.appendChild(newSpan);
        n++;
    })

    if (imager.checked === true) {
        setTimeout(function(){
            changePic(currentWord)
        }, 500);
    }
}

function loadNextWord(){

    chineseWrap.classList.add('clear');

    letterCount = 0;
    currentWord = wordQueue[wordCount];

    letterizer.innerHTML = currentWord;
    
    splitIntoLetters();
}

// SHUFFLER SNIP
// takes an unshuffled array and returns a shuffled array

function shuffle(arr){
    let unshuffled = arr;
    let shuffled = [];

    // every item in the unshuffled list is inserted at a random possible position in the shuffled list

    unshuffled.forEach(word =>{
        randomPos = Math.round(Math.random() * shuffled.length);
        shuffled.splice(randomPos, 0, word);
    })
    
    // console.log(shuffled);
    return shuffled;
}

// END OF SHUFFLER SNIP

//split Chinese translations by commas

function splitTranslations(str){
    let eachTranslation = str.split(',');
    console.log(eachTranslation);
    return eachTranslation[0];
}

//fullscreen button 

function fullscreen(){
    //console.log(fullbtn);
    
    if (fullbtn.innerHTML == "fullscreen"){
        //console.log("fullscreen")
        
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
    //console.log(ev)
    if (ev.key == 'ArrowUp' || ev.key == 'PageUp'){
        previous();
    } else if (ev.key == 'ArrowDown'|| ev.key == 'PageDown'){
        next();
    } else if (ev.key == 'b'){
        
        speak(currentWord);
        
        //changeBackground(currentWord);
    }
})

let huePick

function next(){
    if (wordCount < wordQueue.length){
        if (letterCount < wordLength) {
            let currentLetter = document.getElementById('span' + letterCount)
            currentLetter.classList.add('bigger');
            // this code is for random colored letters

            if (rainbowIndexer.length > 0 && rainbower.checked === true) {
                huePick = rainbowIndexer[Math.floor(Math.random() * rainbowIndexer.length)];
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
            
            eCheck = document.getElementById('span' + (letterCount))
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
            
            index = EN_ZH_img.findIndex(item => item.English === currentWord);
            translation.textContent = splitTranslations(EN_ZH_img[index].Chinese);
            //translation.classList.remove('clear');
            chineseWrap.classList.remove('clear');
            
            if (imager.checked === true){
                toggleImg()
            }

            //changeBackground(currentWord);

        } else {
            wordCount++;
            
            if (imager.checked === true){
                toggleImg()
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
    chineseWrap.classList.add('clear');
    
    
    options.classList.remove('hide');
    settings.classList.remove('hide');
    
    if (!(pic.classList.contains('disappear'))){
        toggleImg()
    }

    wordCount = 0;
    wordQueue = [];
}

function previous(){
    if (!(pic.classList.contains('disappear'))){
        toggleImg()
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

async function toggleImg(){
    classes = pic.classList;

    if (classes.contains('disappear')) {
        classes.remove('disappear')
    } else {
        classes.add('disappear');
    }
        
}

function changePic(word) {
    let key
    
    if (word) {
        index = EN_ZH_img.findIndex(item => item.English === word)
        key = EN_ZH_img[index].Unsplash + "?h=600&auto=format&fit=crop&q=5";
    } else {
        const keys = Object.keys(unsplashImages);
        const len = keys.length;
        const rnd = Math.floor(Math.random() * len);
        key = unsplashImages[keys[rnd]];
    }
    
    //console.log(key);

    pic.src = key;
}

function speak(word){
    const synth = window.speechSynthesis;

    if (synth.speaking) {
        synth.cancel();
    }
    
    speech.text = word;
    speech.rate = 0.4
    synth.speak(speech);
}
