const express = require('express');
const app = express();
const router = require('./routes');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8000;
//Oauth
const session = require("express-session");
const passport = require('passport');
require('dotenv').config();
// PASSPORT CONFIG
require('./config/passport')(passport);


//so we can access the body contents inside request and response
app.use(express.urlencoded({extended: false}))
//so we can use json data as well
app.use(express.json())

//setting the header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

app.use('/', router);

// SESSION MIDDLEWARE
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

//SHOULD WE START LISTENING ONLY WHEN CONNECTED
//TO DATABASE, WE NEED TO EXPORT APP
//module.exports = app


mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(`Sorry, we were unable to connect to the DB. ` + err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
  
});

