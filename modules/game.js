module.exports = function (app) {
    app.use('/game/new', createGame);
    app.use('/game/logout', logoutGame);
}

function createGame(req, res, next) {
    // user erstellen
}

function logoutGame(req, res, next) {
    // user erstellen
}
