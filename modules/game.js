const express = require('express');
const router = express.Router();

router.use('/join', joinGame);
router.use('/newGame', startGame);
router.use('/name', setName);
router.use('/number', getNumber);
router.use('/newWord', setNewWord);
router.use('/word', getWord);
router.use('/scale', getScale);
router.use('/scores', getScores);
router.use('/players', getPlayers);
router.use('/answer', confirmAnswer);
module.exports = router;

const IDLength = 10;
const players = [];
const gameInProgress = false;

// Gibt den Index eines Spielers aus dem Players-Array anhand der ID zurück. Wenn kein Spieler mit der ID existiert, wird -1 zurückgegeben.
function playerIndexByID(ID) {
    indexNumber = 0;

    players.forEach(player => {
        if (player.id == ID) {
            return indexNumber;
        }
        else if (indexNumber == players.length) {
            return -1;
        }
        else {
            indexNumber += 1;
        }
    });
}


function generateID(idLength) { // TO DO: Ganze Funktion austauschen
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < idLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (playerIndexByID(result) >= 0) {
        result = generateID(idLength);
    }
    return result;
}

function joinGame(req, res, next) {
    const reqID = 0; // TO DO: player ID aus dem request Header lesen und zuweisen

    if (gameInProgress) {
        return;
    }
    else if (playerIndexByID(reqID) >= 0) {
        return;
    }
    else {
        players.push = { id: generateID(IDLength), name: "", team: 0 };
    }
}

function setName(req, res, next) {
    const newName = ""; // TO DO: neuen Namen aus der Request lesen
    const reqID = 0; // TO DO: reqID aus Request Header lesen
    const playerIndex = playerIndexByID(reqID);

    if (gameInProgress) {
        return;
    }
    if (playerIndex < 0) {
        // joinGame(req, res, next); <- funktioniert das so?
    }
    players[playerIndex][name] = newName; // <- Keine Ahnung ob diese Syntax richtig ist
}

function startGame(req, res, next) {
    // checken ob schon eine Runde läuft, wenn ja die anfrage ignorieren
    // Sonst checken, ob mindestens zwei Spieler registriert sind, wenn nicht, dann die anfrage ignorieren
    // Sonst neue Runde Initialisieren
    // Score auf 0 setzen
    // Die spieler in Teams einteilen
    //Immer abwechselnd Team 1 und Team 2 zuordnen, sonderfall bei zwei oder drei spielern: alle ins gleiche Team
    // Startspieler festlegen
    // Skala für erste Runde festlegen
    // Nummer für erste Runde festlegen
    // Anzahl der Runden festlegen
}

function getNumber(req, res, next) {
    // Aktuell zu erratende Nummer zurückgeben
}

function setNewWord(req, res, next) {
    // Wort, dass die entsprechende Zahl auf der Skala beschreiben soll, festlegen
}

function getWord(req, res, next) {
    // Festgelegtes Wort der Runde zurückgeben
}

function getScale(req, res, next) {
    // Skala der momentanen Runde anzeigen
}

function getScores(req, res, next) {
    // Team Scores zurückgeben
}

function getPlayers(req, res, next) {
    // Spielernamen und entsperchendes Team zurückgeben
}

function getRoundNumber(req, res, next) {
    // Zurückgeben, die wievielte Runde aktuell gespielt wird
}

function confirmAnswer(req, res, next) {
    // Punkte für die Runde daran berechnen, wie dicht die geratene Nummer an der tatsächlichen Nummer war
    // Gesamtscores aktualisieren
    // Anzahl der gespielten Runden aktualisieren
    // Checken ob das Spiel zuende ist (anhand der Rundenzahl)
    // Eventuell das Gewinnerteam bestimmen, Spiel serverseitig als beendet erklären
    // Sonst neue Skala und neue Nummer und neuen Spieler zum Ausdenken des Wortes festlegen
}