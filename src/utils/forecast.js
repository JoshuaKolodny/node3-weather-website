const request = require('postman-request')


const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cf694737fb2cfaf14062cdd1289141a1&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
              body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees outside. It feels like ' + body.current.feelslike + ' degrees out. Humidity percentage reaching: '+ body.current.humidity+'% With the local time being: '+ body.location.localtime
                // description: response.body.current.weather_descriptions[0],
                // temperature: response.body.current.temperature,
                // feelslike: response.body.current.feelslike
            )
        }
    })
}


module.exports = forecast