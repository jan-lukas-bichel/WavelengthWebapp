const express = require('express');
const router = express.Router();

router.use('/new', createGame);

function createGame(req, res) {
    // game erstellen
}

module.exports = router;
