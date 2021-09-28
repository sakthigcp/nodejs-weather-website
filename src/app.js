//web-server application test for weather 
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { Http2ServerRequest } = require('http2')
const request = require('request')
// const geocode = require('../../weather-app/utils/geocode')
// const forecast = require('../../weather-app/utils/forecast')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))
// console.log(path.join(__dirname,'../templates'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App index page',
        name: 'Sakthi Balasubramanian'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About page - Weather App',
        name: 'Sakthivel Balasubramanian'       
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page...',
        message: 'to help users and provide guidance',
        name: 'Sakthi'
    })
})

app.get('',(req,res) => {
    res.send('<h1>Hello express!</h1>')
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must pass an address parameter!'
        })
    } else{
        geocode(req.query.address,(error,{ latitude, longitude, location} = {}) => {
            if (error){
                return res.send({error})
            }
            // console.log('Latitude: %s , Longitude: %s and Location : %s',latitude, longitude, location)
            forecast(latitude,longitude, (error,forecastData) => {
                if (error){
                    return res.send({error})
                }
                res.send([{
                    latitude: latitude,
                    longitude: longitude,
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                }])
                // console.log('Forecast: ',forecastData)
            })
        }) 
    }
})

app.get('/help/*', (req,res) => {
    // res.send('Help article/page not found')
    res.render('pagenotfound', {
        message: 'The help article/page is not found',
        title: '404 - Page not found!',
        name: 'Sakthivel'
    })
})

app.get('/products',(req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('pagenotfound', {
        title: '404 - Page not found',
        message: 'The Page you are looking for is not found',
        name: 'Sakthi'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})