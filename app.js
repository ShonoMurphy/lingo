// Constants and global variables
var currentRow = 1;
var answer;
var inputLetters = ['','','','',''];
var correctPosition = [false,false,false,false,false];
var wrongPosition = [false,false,false,false,false];
var notInWord = [false,false,false,false,false];

// Get starting word and set first letter
function getAnswer() {
    answer = wordlist[Math.abs(Math.floor(Math.random() * wordlist.length))];
    document.getElementById('letter-1-1').value = answer[0];
}

// Wait until document is loaded, then getAnswer
document.addEventListener('DOMContentLoaded', () => {
    getAnswer();
    console.log(inputLetters);
    console.log(correctPosition);
    console.log(wrongPosition);
    console.log(notInWord);
});

// Change focus to next text field
function changeFocus(rowid, letterid) {
    letterid++;
    document.getElementById('letter-' + rowid +  '-' + letterid).focus();
}

// Submit row
function submitRow(rowid) {
    console.log('Submit row ' + rowid);
}

// Change color of letter backgrounds
function setToRed(rowid, letterid) {
    document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundColor = "#e12f2f";
}

function setToYellow(rowid, letterid) {
    document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundImage = "url(./images/circle.png)";
    document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundSize = "contain"
}

function setToBlue(rowid, letterid) {
    document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundColor = "#1e76b6";
}

function setRowToRed(rowid) {
    var colors = document.getElementsByClassName('letter-div-'+ rowid);
    for (var i = 0; i < colors.length; i++) {
        colors[i].style.backgroundColor = '#e12f2f';
    }
}

function errorBlink(rowid) {
    setToRed(rowid,1);
    setToRed(rowid,2);
    setToRed(rowid,3);
    setToRed(rowid,4);
    setToRed(rowid,5);
    setTimeout(() => {
        setToBlue(rowid,1);
        setToBlue(rowid,2);
        setToBlue(rowid,3);
        setToBlue(rowid,4);
        setToBlue(rowid,5);
    }, 300);
    setTimeout(() => {
        setToRed(rowid,1);
        setToRed(rowid,2);
        setToRed(rowid,3);
        setToRed(rowid,4);
        setToRed(rowid,5);
    }, 600);
    setTimeout(() => {
        setToBlue(rowid,1);
        setToBlue(rowid,2);
        setToBlue(rowid,3);
        setToBlue(rowid,4);
        setToBlue(rowid,5);
    }, 900);
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
        console.log(inputLetters);
    }
}





// Reset button
function resetButton() {
    let empty = '';
    currentrow = 1;
    for (rowid = 1; rowid < 6; rowid++) {
        for (letterid = 1; letterid < 6; letterid++) {
            document.getElementById('letter-' + rowid + '-' + letterid).value = empty;
            document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundColor = "#1e76b6";
            document.getElementById('letter-div-' + rowid + '-' + letterid).style.backgroundImage = "";
        }
    }  
getAnswer();
document.getElementById('letter-1-2').focus(); 
}

// Test button
function testButton() {
    getInputLetters(1);
    setRowToRed(2);
}

var wordlist = [
    'nieuw',
    'woord',
    'input'
]
