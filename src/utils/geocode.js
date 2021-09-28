const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoic2FrdGhpZ2NwIiwiYSI6ImNrc3Z6cGJjeTFueHIyb3BuOTVjbG8yMHcifQ.UJ4i9QewJ99sdD-lZ02MCQ&limit=1'

    request({url : url, json:true}, (error,{body}) => {
        if (error){
            callback('Error! Not able to get mapbox service',undefined)
        } else if (!body.features){
            callback('Error fetching the response: ' + body.message, undefined)
        } else if (!body.features[0]){
            callback('Error fetching the response: ' + body.message, undefined)
        }
        else {
            const data = {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode