const form = document.querySelector('form');
const locationInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent = 'loading....'
    messageTwo.textContent =''
    console.log(locationInput.value);
    fetch('/weather?address='+locationInput.value).then((response)=>{
      response.json().then((data)=>{
        if(data.error)
        {
          console.log(data.error)
          return  messageOne.textContent =data.error.info!=undefined? data.error.info:data.error
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        
      })
    })
})

