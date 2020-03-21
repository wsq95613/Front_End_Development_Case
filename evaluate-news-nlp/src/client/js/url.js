function onBlur(){
  const urlRegexp = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
  let formText = document.getElementById('url').value
  if(!urlRegexp.test(formText) && !formText == ''){
    alert('The url you entered is incorrectly formatted')
  }
  if(formText == ''){
    alert('URL cannot be empty')
  }
}

export { onBlur }
