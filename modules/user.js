module.exports = function (app) {
    // gültige nutzer-id
    app.use('/user/new', createUser);
    app.use('/user/logout', logoutUser);
}


function createUser(req, res, next) {
    // user erstellen
}

function logoutUser(req, res, next) {
    // user erstellen
}
