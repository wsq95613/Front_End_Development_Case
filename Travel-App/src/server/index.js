var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

let projectData = {};
let projectPic = {};
let projectRest = {};

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/all',(req,res)=>{
  console.log('has been updated');
  console.log(projectData);
  res.send(projectData);
})

app.get('/allPic',(req,res)=>{
  console.log('has been updated');
  //console.log(projectPic);
  res.send(projectPic);
})

app.get('/allRest',(req,res)=>{
  console.log('has been updated');
  //console.log(projectPic);
  res.send(projectRest);
})

app.post('/add',(req,res)=>{
  projectData["summary"] = req.body.summary;
  projectData["temperatureHigh"] = req.body.temperatureHigh;
  projectData["temperatureLow"] = req.body.temperatureLow;
  console.log('has been added:');
  console.log(projectData);
})

app.post('/addPic',(req,res)=>{
  projectPic["img"] = req.body.img;
  console.log('has been added:');
  //console.log(projectPic);
  res.send(projectPic);
})

app.post('/addRest',(req,res)=>{
  projectData["country"] = req.body.country;
  projectData["capital"] = req.body.capital;
  projectData["region"] = req.body.region;
  projectData["nativeName"] = req.body.nativeName;
  projectData["currencies"] = req.body.currencies;
  projectData["timeArea"] = req.body.timeArea;
  console.log('has been added:');
  //console.log(projectPic);
  res.send(projectRest);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

module.exports = app;