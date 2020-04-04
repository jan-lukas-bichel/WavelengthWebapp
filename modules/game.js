const express = require('express');
const router = express.Router();

router.use('/new', createGame);

function joinGame(req, res, next) {
    // checken ob schon eine Runde läuft, wenn ja die anfrage ignorieren (später evtl. anderes handling, wie zB spectating)
    // Sonst checken, ob der Spieler schon eine ID hat, wenn ja anfrage ignorieren
    // Sonst eine ID zuordnen
}

function setName(req, res, next) {
    // checken ob schon eine Runde läuft, wenn ja die anfrage ignorieren
    // Sonst checken, ob der Spieler schon eine ID hat, wenn nicht, dann auf joinGame weiterleiten
    // Sonst der Spieler ID den gesendeten Namen zurordnen
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

function getNewNumber(req, res, next) {
    // Aktuell zu erratende Nummer zurückgeben
}

function setNewWord(req, res, next) {
    // Wort, dass die entsprechende Zahl auf der Skala beschreiben soll, festlegen
}

function getNewWord(req, res, next) {
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

function confirmNumber(req, res, next) {
    // Punkte für die Runde daran berechnen, wie dicht die geratene Nummer an der tatsächlichen Nummer war
    // Gesamtscores aktualisieren
    // Anzahl der gespielten Runden aktualisieren
    // Checken ob das Spiel zuende ist (anhand der Rundenzahl)
    // Eventuell das Gewinnerteam bestimmen, Spiel serverseitig als beendet erklären
    // Sonst neue Skala und neue Nummer und neuen Spieler zum Ausdenken des Wortes festlegen
}

module.exports = router;

