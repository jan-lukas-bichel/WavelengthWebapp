const express = require('express');
const router = express.Router();

router.use('/new', createUser);
router.use('/logout', logoutUser);


function createUser(req, res) {
    // user erstellen
}

function logoutUser(req, res) {
    // user erstellen
}

module.exports = router;
