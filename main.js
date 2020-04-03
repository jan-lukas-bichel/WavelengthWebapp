const express = require("express");
const bodyParser = require("body-parser");
const app = express();

function log(req, res, next) {
    //console.log(parseInt(req.body.fname) + 1);
    res.send("danke" + parseInt(req.body));
    console.log(req)
}

app.use(bodyParser.urlencoded())
app.use(express.static("public"));
app.use("/test", log);
app.listen(3000, () => console.log("listening at 3000"));
