class Player {
    constructor(name) {
      this.name = name;
      this.team = 0;
      this.psychic = false;
      this.confirmed = false;
    }
  }
var players = [];
var scores = [0, 0];
var gameInProgress = false;

function joinLobby(req, res, next) {
    players.push(new Player(req.body.name));
    res.json({ playerID: players.length - 1 });
}

function autoAssignTeam(playerID){
  var team1Size = 0;
  var team2Size = 0;

  players.forEach(Player => {
    if(Player.team == 0){
      team1Size += 1;
    }
    else if (Player.team == 1){
      team2Size += 1;
    }   
  });

  if (team1Size > team2Size){
    players[playerID].team = 2;
  }
  else{
    players[playerID].team = 1;
  }
}

function getPlayersList(req, res, next) {
  res.json({ playersList: players });
  next();
}

function switchTeam(req, res, next) {
  if(players[req.body.playerID].team == 1)
  {
    players[req.body.playerID].team = 2;
    res.status(204).send();
  }
  else if(players[req.body.playerID].team == 2)
  {
    players[req.body.playerID].team = 1;
    res.status(204).send();
  }
  next();
}

function lockTeamChoice(req, res, next){
  if(!gameInProgress){
    players[req.body.playerID].confirmed = true;
    res.status(204).send();
    players.forEach(Player => {
      if(Player.confirmed == false){
        next();
        return;
      }
    });
    startGame();
  }
  else{
    joinGame();
  }
}

function startGame(){

}

function joinGame(){

}