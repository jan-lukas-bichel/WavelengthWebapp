const express = require('express');
const router = express.Router();

router.use('/setName', setName);
router.use('/getPlayers', getPlayersList);
router.use('/switch', switchTeam);
router.use('/subscribe', subscribePlayersList);
router.use('/lock', lockTeamChoice);

module.exports = router;

class Player {
  constructor(name) {
    this.name = name;
    this.team = 0;
    this.confirmedTeamChoice = false;
  }
}

var players = [];
var playersListSubscribers = [];

function setName(req, res, next) {
  players.push(new Player(req.body.name));
  autoAssignTeam(playerByName(req.body.name));
  res.status(204).send();
  updatePlayersList();
  next();
}

function playerByName(name){
  players.forEach(player => {
    if(player.name == name)
    {
      return player;
    }
  });
}

function autoAssignTeam(player) {
  var team1Size = 0;
  var team2Size = 0;

  players.forEach(Player => {
    if (Player.team == 0) {
      team1Size += 1;
    }
    else if (Player.team == 1) {
      team2Size += 1;
    }
  });

  if (team1Size > team2Size) {
    player.team = 2;
  }
  else {
    player.team = 1;
  }
}

function getPlayersList(req, res, next) {
  res.json({ playersList: players });
  res.status(204).send();
  next();
}

function subscribePlayersList(req, res, next) {
  playersListSubscribers.push(res);
  next();
}

function updatePlayersList() {
  playersListSubscribers.forEach(subscriber => {
    res.json({ playersList: players });
    res.status(204).send();
  });
  playersListSubscribers = [];
}

function switchTeam(req, res, next) {
  if (playerByName(req.body.playerName).team == 1) {
    playerByName(req.body.playerName).team = 2;
    res.status(204).send();
  }
  else if (playerByName(req.body.playerName).team == 2) {
    playerByName(req.body.playerName).team = 1;
    res.status(204).send();
  }
  updatePlayersList();
  next();
}

function lockTeamChoice(req, res, next) {
  playerByName(req.body.playerName).confirmed = true;
  updatePlayersList();
  res.status(204).send();
}