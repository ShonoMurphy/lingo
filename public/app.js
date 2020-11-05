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
var correctPosition = [false,false,false,false,false];
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
    correctSound.volume = 0;
    correctSound.play();
    correctSound.volume = 1;
    console.log(answer);
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
    if (rowid == currentRow) {
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
}

//Check all letters of input to see if any are in correct position
function checkCorrectPosition() {
    for (i = 0; i < correctPosition.length; i++) {
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
    changeFocus(currentRowUp, startPosition - 1);
    inputLetters = ['','','','',''];
    correctPosition = [false,false,false,false,false];
    wrongPosition = [false,false,false,false,false];
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
    correctPosition = [false,false,false,false,false];
    wrongPosition = [false,false,false,false,false];
    document.getElementById('letter-1-2').focus(); 
}

// Test button
function testButton() {
    console.log(correctPosition.indexOf(false,1));
}

var wordlist = [ 
    'appel',
    'aldus',
    'afwas',
    'aftel',
    'aarde',
    'armen',
    'actie',
    'apart',
    'adres',
    'avond',
    'aders',
    'alarm',
    'atoom',
    'boten',
    'balen',
    'beter',
    'bomen',
    'boren',
    'boven',
    'boxen',
    'brood',
    'broek',
    'brand',
    'breed',
    'benen',
    'beeld',
    'brief',
    'beten',
    'basis',
    'blauw',
    'beren',
    'buren',
    'banen',
    'bloed',
    'broer',
    'blond',
    'boter',
    'beleg',
    'breng',
    'baken',
    'beker',
    'blind',
    'bezig',
    'baden',
    'bedel',
    'bazen',
    'bazin',
    'baren',
    'beden',
    'beken',
    'bezem',
    'baard',
    'bidet',
    'breuk',
    'bloem',
    'conus',
    'cello',
    'creme',
    'cloud',
    'cacao',
    'cadet',
    'cavia',
    'ceder',
    'combi',
    'china',
    'clown',
    'draai',
    'deden',
    'dalen',
    'derde',
    'delen',
    'dwaas',
    'daden',
    'dader',
    'dames',
    'diner',
    'datum',
    'dozen',
    'dreun',
    'duits',
    'dagen',
    'deren',
    'dwerg',
    'dwaal',
    'dwing',
    'druil',
    'droog',
    'draad',
    'dweil',
    'drank',
    'duren',
    'dwars',
    'drugs',
    'daten',
    'daler',
    'doorn',
    'disco',
    'degen',
    'droom',
    'dient',
    'drone',
    'dadel',
    'duwen',
    'druif',
    'deken',
    'deler',
    'draaf',
    'druis',
    'elven',
    'eigen',
    'enger',
    'engel',
    'elder',
    'enkel',
    'effen',
    'email',
    'egaal',
    'fiets',
    'friet',
    'files',
    'forel',
    'films',
    'feest',
    'fruit',
    'falen',
    'flora',
    'fauna',
    'feeen',
    'freak',
    'forum',
    'fusie',
    'geven',
    'gaven',
    'groen',
    'graai',
    'getal',
    'grens',
    'grond',
    'groef',
    'graal',
    'gewei',
    'games',
    'grote',
    'groet',
    'garen',
    'gebak',
    'graag',
    'genre',
    'glans',
    'geluk',
    'geeuw',
    'graaf',
    'horen',
    'heren',
    'halen',
    'hagel',
    'haren',
    'helen',
    'harde',
    'hemel',
    'hoofd',
    'huren',
    'hamer',
    'haken',
    'heden',
    'hotel',
    'hobby',
    'heler',
    'hoger',
    'ieder',
    'index',
    'immer',
    'icoon',
    'inlog',
    'inzet',
    'innig',
    'jovel',
    'jaren',
    'jicht',
    'jabot',
    'jacht',
    'jaden',
    'jagen',
    'jager',
    'japon',
    'jarig',
    'jawel',
    'jeans',
    'jemig',
    'jeugd',
    'joint',
    'jonas',
    'joule',
    'koken',
    'kreet',
    'koker',
    'kerst',
    'kegel',
    'koude',
    'kader',
    'krent',
    'kamer',
    'kaars',
    'kaart',
    'kraan',
    'krant',
    'keren',
    'kruid',
    'kerel',
    'kubus',
    'kraal',
    'kleur',
    'kroon',
    'klein',
    'korst',
    'klopt',
    'kabel',
    'kunst',
    'kopje',
    'krans',
    'klimt',
    'kater',
    'klink',
    'kudde',
    'kruis',
    'kolen',
    'lopen',
    'laten',
    'lepel',
    'links',
    'laden',
    'leven',
    'lezen',
    'lucht',
    'lenen',
    'laser',
    'lente',
    'licht',
    'lader',
    'leder',
    'lunch',
    'lijst',
    'leger',
    'leden',
    'legen',
    'lagen',
    'lezer',
    'lever',
    'lingo',
    'loper',
    'luier',
    'lager',
    'leeuw',
    'maand',
    'malen',
    'maken',
    'media',
    'meter',
    'motor',
    'maten',
    'markt',
    'mazen',
    'molen',
    'meest',
    'meren',
    'model',
    'meden',
    'maden',
    'macht',
    'meeuw',
    'mager',
    'magen',
    'maren',
    'manen',
    'maagd',
    'noord',
    'nieuw',
    'negen',
    'namen',
    'neven',
    'nodig',
    'naden',
    'neder',
    'nemen',
    'onder',
    'optel',
    'ovaal',
    'ovale',
    'onwel',
    'optie',
    'orden',
    'oppas',
    'ouder',
    'ophef',
    'oases',
    'ogend',
    'omzet',
    'palen',
    'plein',
    'pegel',
    'paars',
    'prijs',
    'piano',
    'pixel',
    'paden',
    'pasta',
    'pizza',
    'poten',
    'paard',
    'puber',
    'pauze',
    'preek',
    'polis',
    'pater',
    'proef',
    'panda',
    'penis',
    'prins',
    'pluto',
    'polen',
    'plint',
    'prima',
    'patat',
    'quota',
    'quant',
    'quark',
    'queue',
    'quilt',
    'quote',
    'robot',
    'reken',
    'raden',
    'regen',
    'radio',
    'rente',
    'regio',
    'rugby',
    'reden',
    'roken',
    'ruzie',
    'ruist',
    'regel',
    'racen',
    'races',
    'riool',
    'ramen',
    'radar',
    'roman',
    'rokje',
    'razen',
    'roede',
    'staan',
    'staal',
    'speel',
    'steeg',
    'stoel',
    'stook',
    'steek',
    'schep',
    'spijs',
    'stoep',
    'shirt',
    'samen',
    'sites',
    'sport',
    'spalk',
    'sjaal',
    'storm',
    'staat',
    'steun',
    'strak',
    'serie',
    'shows',
    'schat',
    'snoep',
    'sfeer',
    'smeer',
    'speer',
    'scene',
    'speld',
    'smeed',
    'smaak',
    'super',
    'stand',
    'steer',
    'smelt',
    'sedan',
    'skier',
    'sluis',
    'sneer',
    'steel',
    'schap',
    'sorry',
    'snaar',
    'spuit',
    'truck',
    'terug',
    'typen',
    'talen',
    'taboe',
    'tegel',
    'taart',
    'tafel',
    'trouw',
    'teken',
    'teren',
    'taken',
    'treur',
    'tenen',
    'titel',
    'thuis',
    'tiara',
    'teder',
    'toets',
    'tabak',
    'trein',
    'tarwe',
    'telen',
    'teler',
    'uiten',
    'uilig',
    'uitje',
    'uiver',
    'ultra',
    'uniek',
    'uppie',
    'uraan',
    'uiers',
    'velen',
    'vloer',
    'video',
    'varen',
    'vegen',
    'veren',
    'vader',
    'vaten',
    'vuren',
    'vrouw',
    'vlees',
    'vogel',
    'vroeg',
    'vezel',
    'veins',
    'vorst',
    'veder',
    'vanaf',
    'vieze',
    'veger',
    'villa',
    'veler',
    'vrede',
    'vries',
    'vraag',
    'woord',
    'wagen',
    'wonen',
    'waren',
    'warme',
    'weten',
    'water',
    'weren',
    'wazig',
    'wegen',
    'weven',
    'wezen',
    'weken',
    'wraak',
    'wilde',
    'wreed',
    'wrede',
    'wenst',
    'woest',
    'xenon',
    'yacht',
    'yucca',
    'zwaar',
    'zware',
    'zesde',
    'zagen',
    'zalig',
    'zomer',
    'zeden',
    'zwart',
    'zeven',
    'zicht',
    'zadel',
    'zweet',
    'zenuw',
    'zweer',
    'zweef',
    'zaden',
    'zaken',
    'zeker',
    'zever',
    'zeeen'    
]
