const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Josh Kolodny'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Josh Kolodny'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a helpful message',
        title: 'Help',
        name: 'Josh Kolodny'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide an address'
        })
    }
    else {
        geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    address: req.query.address,
                    forecast: forecastData,
                    location
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must enter a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Josh Kolodny',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Josh Kolodny',
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})