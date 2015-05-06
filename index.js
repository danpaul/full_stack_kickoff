var config = require('./config')

/*******************************************************************************

                    CONFIGURE APP

*******************************************************************************/

var express = require('express');
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')

app.use(express.static(__dirname + '/public'));

app.use(require('cookie-parser')(config.cookieSecret)); 
app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*******************************************************************************

                    ROUTES

*******************************************************************************/

app.get('/', function(req, res){ res.sendFile('./public/index.html'); });

/*******************************************************************************

                    START SERVER

*******************************************************************************/

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});