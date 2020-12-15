 
console.log('Client side java script file loaded!')


const weatherForm = document.querySelector('form')
const search =  document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  // allow server to not refresh page on submit
     
    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent=''

    console.log(location)
    if (location){
        // for localhost use http://localhost:3000
        fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if (data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent =  data.location
                    messageTwo.textContent =  data.forecast                                               
                }
            })
        })

    }else{
        console.log('Enter a valid location')

    }

})
