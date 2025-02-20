// import { nextTimerMode, startTimer, stopTimer } from './js/timer.js'

let timerInterval

let timerObj = {
    "start": null,
    "target": null,
}

// let ding = new Audio("../sound/ding.wav");
// ding.volume = 0.3

export function startTimer(elem) {
    // TIMER SETUP
    // ding.play();
    
    timerBool = true
    timerObj.start = grabTimeHMS()
    displayTime(elem)
  
    // TIMER INTERVAL LOOP
    timerInterval = setInterval(() => {
        displayTime(elem)
    }, 999)
}

export function stopTimer() {
    timerBool = false
    
    if (timerInterval) {
        clearInterval(timerInterval)
    }
}

export function startTimer2() {
    timerObj.start = grabTimeInt();

    console.log(timerObj.start, intToStampStr(timerObj.start, [0, 1]))
}

export function stopTimer2() {
    const thisTime = grabTimeInt();

    const timeDiff = thisTime - timerObj.start;
    const diffStamp = intToStampStr(timeDiff, [2, 3]);

    console.log(timeDiff, diffStamp);
    return [timeDiff, diffStamp];
}

export function grabTimeInt() {
    const date = new Date;

    return date.getTime()
}

export function intToTimeArr(int) {
    const day = Math.floor(int / 86400000);
    const hour = Math.floor(int / 3600000) % 24;
    const min = Math.floor(int / 60000) % 60;
    const sec = Math.floor(int / 1000) % 60;
    const mil = int % 1000;
    
    const finalArr = [day, hour, min, sec, mil];
    console.log(int, finalArr);
    timeArrToStampStr(finalArr)
    return finalArr
}

function timeArrToStampStr(arr, rangeArr) {
    let timeStampStr = '';
    let stringStart = false;

    if (rangeArr) {

        for (let i = rangeArr[0]; i <= rangeArr[1]; i++) {
            if ( i == rangeArr[0] ) {
                timeStampStr += arr[i];
            } else {
                timeStampStr += ':';
                timeStampStr += appendZero(arr[i]);
            }
        }

    } else {
        arr.forEach(int => {
            if (int > 0 || stringStart) {
                if (stringStart) {
                    timeStampStr += ':';
                    timeStampStr += appendZero(int);
                } else {
                    stringStart = true;
                    timeStampStr += int;
                }
            }
        })    
    }

    console.log(timeStampStr);
    return timeStampStr;
}

function intToStampStr(int, rangeArr) {
    
    return timeArrToStampStr(intToTimeArr(int), rangeArr)
}
  
function appendZero(n) {
    n = String(n)
    
    if (n.length < 2) {
        return "0" + n
    } else {
        return n
    }
}