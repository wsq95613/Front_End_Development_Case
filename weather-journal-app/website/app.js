/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=d187a37095fb3996f124324aa772a9c7';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
/* Function called by event listener */
function performAction(e){
    const zipcode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    getWeather(apiUrl,zipcode,apiKey)
    .then(function(data){
        console.log(data);
        postData('/add',{temp:data.main.temp, date:newDate, feel:feeling});
        retrieveData();
    });
};
/* Function to GET Web API Data*/
const getWeather = async (baseUrl,zip,key) =>{
    const res = await fetch(baseUrl+zip+key);
    try{
        const data = res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log('error',error);
    }
}
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data)
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
        console.log(newData);
        return newData;
      }catch(error) {
         console.log("error", error);
      }
   }
/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    const allData = await request.json();
        console.log(allData);
        document.getElementById('temp').innerHTML = 'temp: '+allData.temp;
        document.getElementById('date').innerHTML = 'date: '+allData.date;
        document.getElementById('content').innerHTML = 'feeling: '+allData.feel;
    }catch(error) {
        console.log("error", error);
    }
}