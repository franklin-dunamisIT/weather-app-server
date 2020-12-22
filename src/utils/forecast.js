const request =  require('request')

const forecast = (longitude, latitude, unit, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=b8ef999a0466e1765de237fd0e3b02b8&query='+longitude+','+latitude+'&units='+unit
    // destructured body from response.body
    // applied shorthand to url:url
    request({ url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to access weather service at this point. Try again later!', undefined)
        }else if(body.error){
            callback('Unable to find location. Try with a valid coordinate!', undefined)
        }else{ 
            const weather_data =  body
            const temperature = weather_data.current.temperature
            const feelslike =  weather_data.current.feelslike
            const weather_descriptions = weather_data.current.weather_descriptions
            const precipitation = weather_data.current.precip
            const weather_report = "It's "+weather_descriptions+ " with temperature of "+temperature+" degrees and feels like "+feelslike + " degrees."+"\n"+
                                    "There's "+((parseFloat(precipitation) * 100) /10)+ "% chance of precipitation"
            callback(undefined, weather_report)
        }

    })

}


module.exports =  forecast