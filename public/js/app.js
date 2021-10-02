// const { response } = require("express")
// const forecast = require("../../../weather-app/utils/forecast")

console.log('Client side java script file is loaded!')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript1'
// messageTwo.textContent = 'From JavaScript2'



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // const location ='boston'
    // console.log('http://localhost:3000/weather?address=' + location)
    
    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            // console.log(data[0])
            if (data.error) {
                // console.log('Error! ' + data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                // console.log(data[0].forecast)
                // console.log(data[0].location)
                messageOne.textContent = data[0].location
                messageTwo.textContent = data[0].forecast
            }
        })
    })

})