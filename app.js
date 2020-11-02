// Constants and global variables
const perfectPosition = [true,true,true,true,true];
var introSound = new Audio('./audio/intro.mp3');
var correctSound = new Audio('./audio/correct.mp3');
var locationSound = new Audio('./audio/location.mp3');
var wrongSound = new Audio('./audio/wrong.mp3');
var introSoundPlaying = 0;
var currentRow = 1;
var currentRowUp = 2;
var currentLetter = 1;
var answer;
var inputLetters = ['','','','',''];
var correctPosition = [true,false,false,false,false];
var correctPositions = 0;
var wrongPosition = [false,false,false,false,false];
var emptyPlaceholder = '.';

// Get starting word and set first letter
function getAnswer() {
    answer = wordlist[Math.abs(Math.floor(Math.random() * wordlist.length))];
    document.getElementById('letter-1-1').value = answer[0];
}

// Wait until document is loaded, then getAnswer
document.addEventListener('DOMContentLoaded', () => {
    getAnswer();
    currentRow = 1;
});

// Play Lingo intro
function playIntro() {
    if (introSoundPlaying == 0) {
        introSound.play();
        introSoundPlaying = 1;
    } else {
        introSound.pause();
        introSoundPlaying = 0;
    }
}

// Change focus to next text field
function changeFocus(rowid, letterid) {
    letterid++;
    document.getElementById('letter-' + rowid +  '-' + letterid).focus();
}

// Change color of letter backgrounds
function setToRed(rowid, letterid) {
    document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundColor = '#e12f2f';
}

function setToYellow(rowid, letterid) {
    document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundImage = "url(./images/circle.png)";
    document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundSize = "contain"
}

function setToBlue(rowid, letterid) {
    document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundColor = "#1e76b6";
}

//Change color of an entire row at once
function setRowToColor(rowid, color) {
    var colors = document.getElementsByClassName('letter-div-'+ rowid);
    for (var i = 0; i < colors.length; i++) {
        colors[i].style.backgroundColor = color;
    }
}

//Make a row blink red twice, then return to blue
function errorBlink(rowid) {
    setRowToColor(rowid, '#e12f2f');
    setTimeout(() => {
        setRowToColor(rowid, '#1e76b6');
    }, 300);
    setTimeout(() => {
        setRowToColor(rowid, '#e12f2f');
    }, 600);
    setTimeout(() => {
        setRowToColor(rowid, '#1e76b6');
    }, 900);
}

//Make a row blink green, then stay on green
function correctBlink(rowid) {
    setRowToColor(rowid, '#71d160');
    setTimeout(() => {
        setRowToColor(rowid, '#1e76b6');
    }, 300);
    setTimeout(() => {
        setRowToColor(rowid, '#71d160');
    }, 600);
    setTimeout(() => {
        setRowToColor(rowid, '#1e76b6');
    }, 900);
    setTimeout(() => {
        setRowToColor(rowid, '#71d160');
    }, 1200);
}

//Check if any positions in the inPutLetters array are empty
function checkEmptyLetters(empty) {
    return empty == '';
}

//Take values from row and put in inputLetters array
function getInputLetters(rowid) {
    for (i = 1; i < 6; i++) {
        inputLetters[i-1] = document.getElementById('letter-' + rowid + '-' + i).value.toLowerCase();
    }
    let isEmptyLetters = inputLetters.some(checkEmptyLetters);
    if (isEmptyLetters == true) {
        errorBlink(rowid);
    } else {
        checkCorrectPosition(rowid);
    }
}

//Check all letters of input to see if any are in correct position
function checkCorrectPosition() {
    for (i = 1; i < correctPosition.length; i++) {
        if (inputLetters[i] == answer[i]) {
            correctPosition[i] = true;
        }
    }
    checkWrongPosition();
}

//Check all letters of input to see if any are in the word but in a different position
function checkWrongPosition() {
    for (i = 1; i < wrongPosition.length; i++) {
        for (x = 0; x < wrongPosition.length; x++) {
            if (inputLetters[i] == answer[x] && i != x && x != 0) {
                wrongPosition[i] = true;
            } 
        }
    }
    parseRow();
}

//Set styling for targeted letter in currentRow
function parseLetter(number) {
    if (correctPosition[number] == true) {
        setToRed(currentRow, number + 1);
        correctSound.play();
    } else if (wrongPosition[number] == true) {
        setToYellow(currentRow, number + 1);
        locationSound.play();
    } else {           
        wrongSound.play();
    }
}

function parseRow() {
    parseLetter(0);
    setTimeout(() => {
        parseLetter(1);
    }, 400);
    setTimeout(() => {
        parseLetter(2);
    }, 800);
    setTimeout(() => {
        parseLetter(3);
    }, 1200);
    setTimeout(() => {
        parseLetter(4);
    }, 1600);
    setTimeout(() => {
        checkFull(currentRow);
    }, 2000);
}

function checkFull() {
    for (i = 0; i < correctPosition.length; i++) {
        if (correctPosition[i] == perfectPosition[i]) {
            correctPositions++;
        }
    }
    if (correctPositions == 5) {
        correctPositions = 0;
        correctBlink(currentRow);
    } else if (currentRow < 5) {
        correctPositions = 0;
        prepareNextRow();
    }
}

function prepareNextRow() {
    document.getElementById('letter-' + currentRowUp + '-1').value = answer[0];
    for (i = 1; i < answer.length; i++) {
        if (correctPosition[i] == true) {
            iup = i + 1;
            document.getElementById('letter-' + currentRowUp + '-' + iup).value = answer[i];       
        }
    }
    let startPosition = correctPosition.indexOf(false,1) + 1;
    document.getElementById('letter-' + currentRowUp +  '-' + startPosition).focus();
    currentRow++;
    currentRowUp++;
}



// Reset button
function resetButton() {
    currentrow = 1;
    for (rowid = 1; rowid < 6; rowid++) {
        for (letterid = 1; letterid < 6; letterid++) {
            document.getElementById('letter-' + rowid + '-' + letterid).value = '';
            document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundColor = "#1e76b6";
            document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundImage = "";
        }
    }  
    getAnswer();
    inputLetters = ['','','','',''];
    correctPosition = [true,false,false,false,false];
    wrongPosition = [false,false,false,false,false];
    document.getElementById('letter-1-2').focus(); 
}

// Test button
function testButton() {
    console.log(correctPosition.indexOf(false,1));
}

var wordlist = [ 
    'afval',
    'afwas',
    'agent',
    'nieuw',
    'woord',
    'input'
]
