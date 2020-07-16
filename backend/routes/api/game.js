const express = require('express');
const router = express.Router();

router.use('/getNumber', getNumber);
router.use('/setWord', setNewWord);
router.use('/getWord', getWord);
router.use('/getScaleChoice', getScaleChoice);
router.use('/setScaleChoice', setScale);
router.use('/getScale', getScale);
router.use('/setGuess', setGuess);
router.use('/getGuess', getGuess);
router.use('/confirmGuess', confirmGuess);
module.exports = router;

//Range around the target number for different scorings
const targetRange3Points = 5;
const targetRange2Points = 10;
const targetRange1Points = 15;

//Indices in the "scalesList", which the psychic can pick from, to choose their prefered scale
const scaleOneIndex = 0;
const scaleTwoIndex = 0;

//Array of all the available scales
const scalesList = [["Good person", "Bad person"], ["Overrated letter of the alphabet", "Underrated letter of the alphabet"], ["Solid", "Fragile"]];

//Index of the Scale chosen bz the psychic
const chosenScaleIndex = 0;

//The number on the scale, that gets randomly set
const targetNumber = 50;

//The word that the psychic chooses, to indicate the right number in the scale
const theWord = "";

//The last committed number guess
const currentGuess = 50;

//Gibt random int von inklusive min bis inklusive max zurück
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Responds with with JSON object, that contains strings for the scales and the indices in the scaleList for those scales 
function getScaleChoice(req, res, next) {
    scaleOneIndex = getRandomInt(0, scalesList.length);
    scaleTwoIndex = getRandomInt(0, scalesList.length);
    if (scalesList.length < 1) {
        while (scaleOneIndex == scaleTwoIndex) {
            const choiceTwo = getRandomInt(0, scalesList.length);
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

// Wort, dass die entsprechende Zahl auf der Skala beschreiben soll, festlegen
function setScale(req, res, next) {
    if (req.data.scaleChoice == scaleOneIndex || req.data.scaleChoice == scaleTwoIndex) {
        chosenScaleIndex = req.data.scaleChoice;
    }
    next();
}

// Wort, dass die entsprechende Zahl auf der Skala beschreiben soll, festlegen
function setNewWord(req, res, next) {
    theWord = String(req.data.word);
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
    res.json({ guess: currentGuess});
    next();
}

// submit a new guessed number
function setGuess(req, res, next) {
    currentGuess = req.data.guess;
    next();
}

function confirmGuess(req, res, next) {
    // Punkte für die Runde daran berechnen, wie dicht die geratene Nummer an der tatsächlichen Nummer war
    // Gesamtscores aktualisieren
    // Anzahl der gespielten Runden aktualisieren
    // Checken ob das Spiel zuende ist (anhand der Rundenzahl)
    // Eventuell das Gewinnerteam bestimmen, Spiel serverseitig als beendet erklären
    // Sonst neue Skala und neue Nummer und neuen Spieler zum Ausdenken des Wortes festlegen
    if(Math.abs(targetNumber - currentGuess) <= targetRange3Points)
    {
        res.send("scored 3 points! The correct guess was:" + String(targetNumber))
        next();
    }
    if(Math.abs(targetNumber - currentGuess) <= targetRange2Points)
    {
        res.send("scored 2 points! The correct guess was:" + String(targetNumber))
        next();
    }
    if(Math.abs(targetNumber - currentGuess) <= targetRange1Points)
    {
        res.send("scored 1 points! The correct guess was:" + String(targetNumber))
        next();
    }
    else
    {
        res.send("scored 0 points! The correct guess was:" + String(targetNumber))
        next();
    }
}
