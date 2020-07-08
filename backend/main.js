const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("vue_app/public/old_index.html"));
// app.use(bodyParser.urlencoded({ extended: true }))
/*app.use((req, res, next) => {
    // if req is nicht erlaubt
    // dann respond with error
    // else
    next()
})*/
app.use('/game', require('./modules/game'));
app.listen(3000, () => console.log("listening at 3000\nhttp://localhost:3000/"));
