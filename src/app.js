const express = require('express')
const path =  require('path')
const hbs =  require('hbs')
const  geocode  =  require('./utils/geocode')
const forecast = require('./utils/forecast')

// this starts the express server
const app = express()

/// use this to build the path to the public folder
// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

// the default path for views is the root i.e. src;
// we specify this new path to update that path so use templates
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath =  path.join(__dirname, '../templates/partials')

// setup handle bar engine
app.set('view engine', 'hbs')

// set the new path for views here
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static pages to view
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
                        title: 'Weather App',
                        name: 'Nero '
                    })
})

app.get('/help', (req, res) => {
    res.render('help', {
                        title: 'Help',
                        name: 'Nero',
                        helpText: 'What can i help with?'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
                title: 'About Me', 
                name: 'Nero'
    
            })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return  res.send({
            error: 'You must provide a location to view the weather forecast'
        })
    }else{
        address  = req.query.address
        geocode( address,  (error, {latitude, longitude, location} = {}) => {
            if (error){
                return send({error})
            }
            // m = celcius
            // f = fahrenheight
            forecast( latitude,  longitude, 'm', (error, forecastData) => {
                if (error){
                    return send({error})
                }
                res.send({
                    location: location , 
                    address: address,
                    forecast: forecastData
                })
            })
    
        })
        
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({products: []
    
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {title:'404 page', name:'Nero', error:'Help article not found'})
})

app.get('*', (req, res) => {
    res.render('error', {title:'404 page', name:'Nero', error:'404 page!'})
})
 
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})