const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;


// app.use(bodyParser.urlencoded({ extended: true }))
/*app.use((req, res, next) => {
    // if req is nicht erlaubt
    // dann respond with error
    // else
    next()
})*/
app.use('/api/game', require('./routes/api/game'));
//app.use(express.static("public"));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))