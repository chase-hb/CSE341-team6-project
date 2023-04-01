const express = require('express');
const app = express();
const router = require('./routes');

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

//SHOULD WE START LISTENING ONLY WHEN CONNECTED
//TO DATABASE, WE NEED TO EXPORT APP
//module.exports = app

//OTHERWISE WE CAN LISTEN HERE
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})