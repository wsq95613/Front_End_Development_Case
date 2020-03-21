function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('url').value
    console.log("::: Form Submitted :::")
    postData('http://localhost:8081/test', {url:formText})
    .then(res => {
        return res
    }).then(function(data) {
        document.getElementById('results').innerHTML = 
        `polarity: ${data.polarity}<br>
        subjectivity: ${data.subjectivity}<br>
        polarity confidence: ${data.polarity_confidence}<br>
        subjectivity confidence: ${data.subjectivity_confidence}`
    })
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

export { handleSubmit }
