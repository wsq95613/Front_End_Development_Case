document.getElementById('research').addEventListener('click', performAction);
function performAction(e){
    e.preventDefault()
    const geoApiUrlStart = 'http://api.geonames.org/searchJSON?q=';
    const geoApiUrlEnd = '&maxRows=1&username='
    const geoApiUsername = 'wsq95613';
    const darkSkyApiUrl = 'https://api.darksky.net/forecast/';
    const darkSkyApiKey = 'c092745bcd947b93dfd19dc607c06797';
    const pixAbayApiUrlStart = 'https://pixabay.com/api/?key=7015974-a35c6cefb9f382b5d25cb4c89&q='
    const pixAbayApiUrlEnd = '&category=travel&order=popular'
    const restApiUrl = 'https://restcountries.eu/rest/v2/name/'
    const destination = document.getElementById('dest').value;
    const StartingDate = document.getElementById('date').value;
    let timeStamp = new Date(StartingDate).getTime()/1000;
    document.getElementById('pic').src = ''
    getGeo(geoApiUrlStart,destination,geoApiUrlEnd,geoApiUsername)
    .then(function(data){
        console.log(data);
        getDarkSky(darkSkyApiUrl,darkSkyApiKey,data.geonames[0].lat,data.geonames[0].lng,timeStamp)
        .then(function(data){
            postData('http://localhost:8081/add',{summary:data.daily.data[0].summary, 
            temperatureHigh:data.daily.data[0].temperatureHigh,
            temperatureLow:data.daily.data[0].temperatureLow});
        })
        getRest(restApiUrl,data.geonames[0].countryName)
        .then(function(data){
            console.log('rest: '+data)
            postRest('http://localhost:8081/addRest',{country:data[0].name,
            region:data[0].region,
            nativeName:data[0].nativeName,
            currencies:data[0].currencies[0].name,
            capital:data[0].capital,
            timeArea:data[0].timezones});
        })
        retrieveData();
    });
    getPix(pixAbayApiUrlStart,destination,pixAbayApiUrlEnd)
    .then(function(data){
        console.log(data);
        postPic('http://localhost:8081/addPic',{img:data.hits[0].webformatURL});
        retrievePic();
        
    });
    Client.isEmpty(destination)
};
const getGeo = async (urlStart,dest,urlEnd,username) =>{
    const res = await fetch(urlStart+dest+urlEnd+username);
    try{
        const data = res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log('error',error);
        alert("error", error);
    }
}

const getDarkSky = async (url,key,lat,lng,date) =>{
    const res = await fetch('https://cors-anywhere.herokuapp.com/'+url+key+'/'+lat+','+lng+','+date);
    try{
        const data = res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log('error',error);
        alert("error", error);
    }
}

const getPix = async (urlStart,dest,urlEnd) =>{
    const res = await fetch(urlStart+dest+urlEnd);
    try{
        const data = res.json();
        console.log(data);
        
        return data;
    }catch(error){
        console.log('error',error);
        alert("error", error);
    }
}

const getRest = async (url,country) =>{
    const res = await fetch(url+country);
    try{
        const data = res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log('error',error);
        alert("error", error);
    }
}

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
       console.log("error", error);
       alert("error", error);
    }
 }

const postPic = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
       console.log("error", error);
       alert("error", error);
    }
}

const postRest = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
       console.log("error", error);
       alert("error", error);
    }
}

const retrieveData = async () =>{
    const res = await fetch('http://localhost:8081/all');
    try {
    const allData = await res.json();
        console.log(allData);
        document.getElementById('weather').innerHTML = 
        `summary: ${allData.summary}<br>
        temperatureHigh: ${allData.temperatureHigh}<br>
        temperatureLow: ${allData.temperatureLow}<br><br>`
        document.getElementById('country').innerHTML = 
        `country: ${allData.country}<br>
        nativeName: ${allData.nativeName}<br>
        capital: ${allData.capital}<br>
        region: ${allData.region}<br>
        currencies: ${allData.currencies}<br>
        timeArea: ${allData.timeArea}<br>
        `
    }catch(error) {
        console.log("error", error);
        alert("error", error);
    }
}

const retrievePic = async () =>{
    const res = await fetch('http://localhost:8081/allPic');
    try {
        const allData = await res.json();
        console.log(allData.img);
        document.getElementById('pic').src = allData.img.replace(/_640/, '_180')
    }catch(error) {
        console.log("error", error);
    }
}

function isEmpty(){
    let formText = document.getElementById('dest').value
    if(formText == ''){
      console.log('dest is empty')
    }else{
      console.log('dest is not empty')
    }
  }

  
export { performAction }
