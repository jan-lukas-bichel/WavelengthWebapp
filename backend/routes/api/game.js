const express = require('express');
const router = express.Router();

router.use('/getNumber', getTargetNumber);
router.use('/setWord', setNewWord);
router.use('/getWord', getWord);
router.use('/getScaleChoice', getScaleChoice);
router.use('/setScaleChoice', setScale);
router.use('/getScale', getScale);
router.use('/setGuess', setGuess);
router.use('/getGuess', getGuess);
router.use('/confirmGuess', confirmGuess);
module.exports = router;

var teamScores = [0, 0];
var activeTeam = 1;
var psychicPlayerName = "";

//Indices in the "scalesList", which the psychic can pick from, to choose their prefered scale
var scaleOneIndex = 0;
var scaleTwoIndex = 0;

//Array of all the available scales
var scalesList = [["Good person", "Bad person"], ["Overrated letter of the alphabet", "Underrated letter of the alphabet"], ["Solid", "Fragile"]];

//Index of the Scale chosen by the psychic
var chosenScaleIndex = 0;

//The number on the scale, that gets randomly set
var targetNumber = 50;

//The word that the psychic chooses, to indicate the right number in the scale
var theWord = "";

//The last committed number guess
var currentGuess = 50;

//Gibt random int von inklusive min bis inklusive max zurück
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTargetNumber(req, res, next) {
    res.json({ number: targetNumber });
    next();
}

//Responds with with JSON object, that contains strings for the scales and the indices in the scaleList for those scales 
function getScaleChoice(req, res, next) {
    scaleOneIndex = getRandomInt(0, scalesList.length-1);
    scaleTwoIndex = getRandomInt(0, scalesList.length-1);
    if (scalesList.length > 1) {
        while (scaleOneIndex == scaleTwoIndex) {
            scaleTwoIndex = getRandomInt(0, scalesList.length-1);
        }
    }
    res.json({
        optionOne: {
            scale: scalesList[scaleOneIndex],
            index: scaleOneIndex
        },
        optionTwo: {
            scale: scalesList[scaleTwoIndex],
            index: scaleTwoIndex
        }
    });
    next();
}

// Eine der beiden Skalen auswählen
function setScale(req, res, next) {
    if (req.body.scaleChoice == scaleOneIndex || req.body.scaleChoice == scaleTwoIndex) {
        chosenScaleIndex = req.body.scaleChoice;
        res.status(204).send();
        targetNumber = getRandomInt(0, 100);
    }
    else {
        res.status(200).send("invalid scale choice");
    }
    next();
}

// Wort, dass die entsprechende Zahl auf der Skala beschreiben soll, festlegen
function setNewWord(req, res, next) {
    theWord = String(req.body.word);
    res.status(204).send();
    next();
}

// Festgelegtes Wort der Runde zurückgeben
function getWord(req, res, next) {
    res.json({ word: theWord });
    next();
}

// Skala der momentanen Runde anzeigen
function getScale(req, res, next) {
    res.json({ scale: scalesList[chosenScaleIndex] });
    next();
}

// Get the last submitted number guessed
function getGuess(req, res, next) {
    res.json({ guess: currentGuess });
    next();
}

// submit a new guessed number
function setGuess(req, res, next) {
    currentGuess = req.body.guess;
    res.status(204).send();
    next();
}

function nextPsychic(){
    //DURCH RICHTIGES ARRAY ERSETZEN 
    var players = [];
    var counter = 0;

    players.forEach(player => {
        if(player.team == activeTeam){
            if(player.wasPsychic == false){
                psychicPlayerName = player.name;
                return;
            }
            counter += 1;
        }
        else{
            players.forEach(player => {
                player.wasPsychic = false;
            });
            nextPsychic();
        }
    });
}

function evaluateScore(){
    var score = 30 - Math.abs(targetNumber - currentGuess);
    if(score < 0)
    {
        score = 0;
    }
    return score;
}

function confirmGuess(req, res, next) {
    res.send("scored" + String(evaluateScore()) + "points! \n The correct guess was:" + String(targetNumber)) + "\n Yout guessed: " + String(currentGuess);
        next();

    if(activeTeam == 1)
    {
        activeTeam = 2;
    }
    else
    {
        activeTeam = 1;
    }
    nextPsychic();
}