const express = require("express");
const bodyParser = require("body-parser");
const app = express();

function log(req, res, next) {
    //console.log(parseInt(req.body.fname) + 1);
    res.send("danke" + parseInt(req.body));
    console.log(req)
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded())
app.use((req, res, next) => {
    // if req is nicht erlaubt
    // dann respond with error
    // else
    // next()
})
app.use("/test", log);
app.listen(3000, () => console.log("listening at 3000"));

app.use('/user', require('./modules/user'));
app.use('/game', require('./modules/game'));

/*
{
    routes: [
        {
            path: '/user'
            module: require('./modules/user')
            subroutes: [
                path: '/new',

            ]
        }, // user
        {

        } // game
    ]
}
*/
