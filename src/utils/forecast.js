const request = require('request')

// const forecast = (latitude,longitude,callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=2a560b0933ba651a17ab104f15e12a32&query=' + latitude + ',' + longitude //+'&units=f'
    
//     request({url:url, json: true}, (error,response)=>{
//         if(error){
//             callback('Unable to connect to weather service!',undefined)
//         }else if (response.body.error) {
//             callback('There seems to be error in request URL. Unable to find location',undefined)
//         }else {
//             callback(undefined,response.body.current.weather_descriptions[0] + ". The temperature is " + response.body.current.temperature+" and the chance of rain is " + response.body.current.precip + "%.")
//         }
//     })
// }

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2a560b0933ba651a17ab104f15e12a32&query=' + latitude + ',' + longitude //+'&units=f'
    
    request({url:url, json: true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if (body.error) {
            callback('There seems to be error in request URL. Unable to find location',undefined)
        }else {
            callback(undefined,body.current.weather_descriptions[0] + ". The temperature is " + body.current.temperature+" and the chance of rain is " + body.current.precip + "%.")
        }
    })
}

module.exports = forecast