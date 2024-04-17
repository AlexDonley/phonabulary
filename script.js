/// BUTTONS CODE
const vows = ['a', 'e', 'i', 'o', 'u', 'y']
const cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
const semivows = ['w', 'y']

//have to fix hr, not a real digraph

const onsetDigraphs = [
    "ch", "ph", "sh", "th", "wh",
    "br", "cr", "dr", "fr", "gr", "hr", "kr", "pr", "sr", "tr", "vr", "wr",
    "bl", "cl", "fl", "gl", "kl", "pl",
    "sl", "sm", "sn", "sp", "st", "sv", "sw"
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
    "th", "ck", "ch", "ct", "lk", "ll", "lp", "lt", "ff", "mb", "mp", "nd", "ng", "nk", "nt", 
    "rk", "rt", "sh", "sk", "ss", "st"
]

const codaTrigraphs = [
    "nch"
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
    'tion': tion, 'sion': sion
}


const translations = {
    "bad": "壞的",
    "mad": "發瘋的 發狂的",
    "sad": "悲哀的 令人傷心的",
    "fan": "電扇",
    "man": "男人",
    "ham": "火腿",
    "bat": "蝙蝠 球棒",
    "cat": "貓",
    "fat": "胖的",
    "hat": "(有邊的)帽子",
    "kid": "孩子",
    "lid": "蓋子",
    "dig": "(掘土) 挖洞",
    "pig": "豬",
    "fin": "鰭",
    "win": "勝利, 贏得",
    "kit": "小貓",
    "hit": "打擊 襲擊",
    "job": "職業",
    "mom": "母親",
    "hop": "跳過, 躍過",
    "mop": "拖(地)",
    "top": "頂部 山頂 頭頂",
    "dot": "點",
    "not": "不是",
    "pot": "鍋子",
    "box": "箱子",
    "fox": "狐狸",
    "leg": "腿",
    "hen": "母雞",
    "pen": "筆",
    "ten": "十",
    "net": "網子",
    "pet": "寵物",
    "set": "一套 設置",
    "wet": "潮濕的",
    "cub": "小(熊 虎等)",
    "tub": "桶 木盆",
    "bug": "蟲子",
    "bun": "小圓麵包",
    "fun": "樂趣 娛樂",
    "sun": "太陽",
    "cup": "杯子(有握把)",
    "cut": "刻痕 割傷",
    "bake": "烘 烤",
    "cake": "蛋糕 糕餅",
    "game": "遊戲",
    "name": "名字",
    "base": "基礎",
    "case": "案件",
    "hate": "仇恨 憎恨",
    "late": "遲到的",
    "save": "挽救",
    "wave": "揮舞 揮動",
    "hide": "把...藏起來",
    "ride": "騎馬 乘車",
    "life": "生活",
    "wife": "妻子",
    "bike": "腳踏車",
    "like": "喜歡",
    "fine": "健康的 優秀的",
    "wine": "酒",
    "bite": "咬 叮",
    "kite": "風箏",
    "Coke": "可樂",
    "home": "家",
    "hope": "希望",
    "rope": "繩索",
    "nose": "鼻子",
    "rose": "玫瑰花",
    "note": "筆記 記號 音符",
    "vote": "投票",
    "eve": "前夕",
    "Steve": "男子名",
    "here": "這裡",
    "Pete": "男子名",
    "these": "這些",
    "cube": "立方體",
    "tube": "管子",
    "June": "六月",
    "use": "使用",
    "cute": "可愛的",
    "each": "每個",
    "teach": "教",
    "much": "許多(接不可數)",
    "inch": "英吋",
    "rich": "富有的",
    "high": "高的",
    "light": "燈光",
    "night": "夜晚",
    "right": "右邊",
    "sight": "視覺 視力",
    "phone": "電話",
    "photo": "相片",
    "she": "她",
    "ship": "船艦",
    "shop": "商店",
    "dish": "碟盤",
    "fish": "魚",
    "thin": "瘦小的",
    "bath": "浴缸 澡盆 沐浴",
    "math": "數學(簡寫)",
    "with": "和...一起",
    "mouth": "嘴巴",
    "the": "這(個) 那(個)",
    "than": "比",
    "that": "那個",
    "this": "這個",
    "them ": "他們(受格)",
    "who": "誰",
    "why": "為什麼",
    "when": "當…的時候",
    "which": "哪個",
    "white": "白色的",
    "king": "國王",
    "ring": "戒指",
    "sing": "唱歌",
    "long": "長的",
    "song": "歌曲",
    "back": "背部",
    "pack": "裝箱 打包",
    "pick": "撿 挑選",
    "sick": "生病的",
    "duck": "鴨子",
    "boat": "船",
    "coat": "外套",
    "goat": "山羊",
    "road": "道路",
    "soap": "香皂",
    "good": "好的",
    "book": "書本",
    "cook": "烹調 廚師",
    "look": "看",
    "poor ": "貧窮的 貧困的",
    "foot": "腳",
    "too": "也",
    "zoo": "動物園",
    "cool": "涼快的 涼爽的",
    "room": "房間",
    "moon": "月亮",
    "our": "我們的",
    "out": "在外 向外",
    "loud": "大聲的",
    "cloud": "雲",
    "round": "圓形的",
    "bow": "鞠躬",
    "cow": "母牛 乳牛",
    "how": "怎麼 如何",
    "now": "現在",
    "down": "向下",
    "own": "擁有",
    "low": "低的 矮的",
    "row": "排",
    "grow": " 成長",
    "slow": " 慢慢的",
    "oil": "油",
    "boil": "沸騰 煮沸",
    "join": " 加入 連結",
    "point": "點",
    "noise": "噪聲",
    "boy": "男孩",
    "joy": "喜悅",
    "toy": " 玩具",
    "fail": "失敗",
    "mail": "郵件",
    "nail": "指甲",
    "tail": "尾巴 尾部",
    "rain": "雨",
    "day": "日 天 白天",
    "may": "可能",
    "pay": "付錢",
    "say": "說 講",
    "way": "方式 方法",
    "Paul": "男子名",
    "cause": "原因 理由",
    "dawn": "黎明",
    "draw": "畫 繪製",
    "all": "全部的",
    "ball": "球",
    "call": "打電話 呼叫",
    "fall": "落下 跌倒",
    "tall": "高的",
    "sea": "海",
    "lead": "領導 引導",
    "read": "讀",
    "ear": "耳朵",
    "hear": "聽見",
    "dead": "死的",
    "head": "頭",
    "bear": "熊",
    "pear": "西洋梨",
    "wear": "穿著 戴著",
    "bee": "蜜蜂",
    "see": "看見",
    "need": "需要",
    "seed": "種子",
    "week": "星期",
    "arm": "手臂",
    "art": "藝術",
    "car": "汽車",
    "card": "卡片",
    "far": "遙遠的",
    "or": "或者",
    "for": "為了",
    "fork": "叉子",
    "pork": "豬肉",
    "born": "出生",
    "her": "她的 她(受格)",
    "over": "在...之上",
    "river": "河流",
    "ruler": "直尺",
    "order": "(客人)點菜 訂購",
    "sir": "長官 先生",
    "bird": "鳥",
    "girl": "女孩",
    "first": "第一的",
    "shirt": "襯衫",
    "fur": "軟毛",
    "burn": "燃燒",
    "turn": "轉動",
    "surf": "海浪 浪花",
    "hurt": "受傷",
    "yes": "是的",
    "yet": "然而 但是",
    "yard": "庭院",
    "year": "年",
    "yo-yo": "溜溜球",
    "baby": "嬰孩",
    "body": "身體",
    "very": "非常地",
    "many": "許多(接可數)",
    "tidy": "乾淨的 整齊的",
    "by": "旁邊",
    "my": "我的",
    "shy": "羞怯的 怕羞的",
    "dry": "乾的",
    "try": "嘗試",
    "ice": "冰",
    "nice": "好的",
    "face": "臉 面子",
    "city": "城市",
    "circle": "圓",
    "pencil": "鉛筆",
    "cycle": "週期 循環",
    "recycle": "再利用",
    "age": "年齡",
    "cage": "籠子",
    "page": "頁",
    "giant": "巨人",
    "magic": "有魔力的",
    "gym": "體育館",
    "blow": "吹 隨風飄動",
    "black": "黑色的",
    "block": "街道",
    "plan": "計劃 方案",
    "play": "玩(遊戲)",
    "place": "地方",
    "clap": "拍手",
    "class": "班級",
    "clean": " 清洗",
    "glad": "高興的",
    "glue": "膠水",
    "glass": "玻璃杯",
    "fly": "飛行 蒼蠅",
    "flag": "旗子",
    "flower": "花",
    "slim": "纖細的",
    "slow": "慢慢的",
    "sleep": "睡覺 睡眠",
    "bread": "麵包",
    "bring": "帶來",
    "brush": "刷",
    "pray": "祈禱 祈求",
    "price": "價格",
    "print": "印刷",
    "cry": "哭 叫 喊",
    "crab": "螃蟹",
    "crazy": "瘋狂的",
    "gram": "公克",
    "grade": " 年級 成績",
    "grape": "葡萄",
    "dry": "乾的",
    "drop": "滴落 放下",
    "drum": "鼓",
    "fry": "油煎 油炸 油炒",
    "free": " 自由的 免費的",
    "frog": "青蛙",
    "try": "嘗試",
    "tree": "樹",
    "trip": "旅程 旅行",
    "scan": "掃描",
    "score": "分數",
    "school": "學校",
    "sky": "天空",
    "ski": "滑雪",
    "skate": "溜冰鞋",
    "small": "小的",
    "smart": "聰明的",
    "smile": "微笑 笑容",
    "snow": "雪",
    "snack": "點心",
    "snake": "蛇",
    "swim": "游泳",
    "swing": "秋千 擺動",
    "sweet": "甜的",
    "spy": "間諜",
    "speak": "說話 講話",
    "spell": "拼寫",
    "stay": "停留 留下",
    "star": "星星",
    "start": "開始",
}

const myDocument = document.documentElement;
const menu = document.getElementById('menu');
const actions = document.getElementById('actions');
const wrapper = document.getElementById('wrapper');
const translation = document.getElementById('chinese');
const buttonGrid = document.getElementById('buttonGrid');
const shuffler = document.getElementById('shuffler');
const h1 = document.querySelector('h1').classList;
let letterizer = document.getElementById('letterizer');
//let backdrop = document.getElementById('bg');

let letterCount;
let wordCount = 0;
let wordLength;
let currentWord;

let n;
let hue;

let colors = ['yellow', 'cyan', 'orange', 'pink', 'coral'];
let input = "The quick brown fox jumps over the lazy dog."
let sampleList = ['thrall', 'chin', 'splat', 'mouth', 'strong', 'chang']

let selectedPhonics = []
let wordQueue = [];

async function spawnButtons(){

    selectedPhonics = []
    wordQueue = [];

    for (const key of Object.keys(graphemes)) {
        //console.log(key);
        
        h1.remove('active-letters');
        
        let newButton = document.createElement("button");
        //newButton.onclick = "flip()";
        newButton.id = key;
        newButton.innerHTML = key;
        buttonGrid.appendChild(newButton);

        translation.classList.add('clear');
        translation.textContent = "";
    }
}

spawnButtons();


const buttons = document.getElementsByTagName("button");
const buttonPressed = e => {
    let clickedButton = e.target.id;
    //console.log(clickedButton);  // Get ID of Clicked Element
    if (!(clickedButton == 'go' || clickedButton == 'fixedbtn')){
        flip(clickedButton)
    }
}

for (let button of buttons) {
  button.addEventListener("click", buttonPressed);
}


// flip button

function flip(it){
    // console.log('flip');
    
    let flipperClass = document.getElementById(it).classList;

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


// go button deletes elements in the container and loads list of words to read

async function go(){
    if (selectedPhonics.length > 0) {
        buttonGrid.innerHTML = "";
        wrapper.innerText = "";

        actions.innerHTML +=
        '<div class="fixed">' +
            '<button type=btn class="fixedbtn" id="btn" onClick="previous()">previous</button>' +
            '<button type=btn class="fixedbtn" id="fullbtn" onClick="fullscreen()">fullscreen</button>' +
            '<button type=btn class="fixedbtn" id="btn" onClick="next()">next</button>' +
        '</div>'
    
        fullbtn = document.getElementById('fullbtn');
        h1.add('active-letters');

        createQueue();
        if (shuffler.checked === true){
            wordQueue = shuffle(wordQueue);
        }
        loadNextWord();
    }
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
            
            // check for vowel digraphs
            
            vowelTest = char + arr[n + 1];
            if (vowelDigraphs.includes(vowelTest) && !(currentWord == 'here')) {
                arr.splice(n, 2, vowelTest);
            }

            // check for -gh vowels

            if (arr[n+1] + arr[n+2] == 'gh' ){
                arr.splice(n, 3, (char + 'gh'));
            }

            codaTest = arr[n+1] + arr[n+2];
            //console.log(codaTest);
            if (codaDigraphs.includes(codaTest)) {
                arr.splice((n+1), 2, codaTest);
            }

            onsetTest1 = (arr[n-2] + arr[n-1]).toString();

            if (onsetDigraphs.includes(onsetTest1.toLowerCase())){
                onsetTest2 = (arr[n-3] + onsetTest1).toString();
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
    translation.classList.add('clear');
    translation.textContent = "";

    letterCount = 0;
    currentWord = wordQueue[wordCount];
    letterizer.innerHTML = currentWord;
    
    splitIntoLetters();
}

function shuffle(arr){
    let unshuffled = arr;
    let shuffled = [];

    unshuffled.forEach(word =>{
        randomPos = Math.floor(Math.random() * shuffled.length);

        //console.log(randomPos);
        shuffled.splice(randomPos, 0, word);
    })
    
    console.log(shuffled);
    return shuffled;
}

//fullscreen button 

function fullscreen(){
    console.log(fullbtn);
    
    if (fullbtn.innerHTML == "fullscreen"){
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
            // this code is for random colored letters
            hue = Math.floor(Math.random() * 360)

            // switch the the code below for rainbow lettering
            // hue = 360 * (letterCount) / wordLength
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
            
            eCheck = document.getElementById('span' + (letterCount))
            if (letterCount == wordLength - 1 && eCheck.innerHTML == 'e' && eCheck.classList.contains("bigger")) {
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

            
            translation.textContent = translations[currentWord];
            translation.classList.remove('clear');

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
        wrapper.innerHTML = 
            '<input type="checkbox" class="checkbox" id="shuffler">' +
            '<label for="shuffler"> shuffle</label>'+
            '<button class="go" onclick="go()" id="go">GO</button>'
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