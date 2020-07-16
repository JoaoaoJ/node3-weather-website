const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoiam9hb2FvaiIsImEiOiJja2M5MHZnN2cwN3htMnlsa2Q0NDlka3JkIn0.COgPSRZa233HBMZPwKrLCg&limit=1&types=place'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })  
}

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2c2cfaaeb0f45af6ca5cc59e4a1b1f0f&query='+ latitude +','+ longitude +'&units=m'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature +' degrees. It feels like '+ body.current.feelslike +' degrees out.')
        }
    })
}

module.exports = {
    geocode,
    forecast
}