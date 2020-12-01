const request =  require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiZnJhbmstZHVuIiwiYSI6ImNraDQ2NzF5ZDA5MXgycXFqMjJlbG1lMzEifQ.2Dc618Sj-EtzjtS_oiDYEQ'

    // destructured body from response.body
    // applied shorthand to url:url
    request({url : url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services.', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try a valid search key.', undefined)
        }else{
            const  weather_data = body
            const point = weather_data.features[0].center
            
            const longitude  = point[0]
            const latitude  = point[1]
            const place = weather_data.features[0].place_name
            callback(undefined, {
                    latitude: latitude,
                    longitude: longitude,
                    location: place

            })
        }
    })
}

module.exports = geocode