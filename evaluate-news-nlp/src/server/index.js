var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
var aylien = require("aylien_textapi");
const dotenv = require('dotenv');
dotenv.config();

var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/test', function (req, res) {
  console.log(req.body)
textapi.sentiment({
    url: req.body.url,
  }, function(error, response) {
    console.log(response)
    if (error === null) {
      res.send(response)
    }
    });
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

