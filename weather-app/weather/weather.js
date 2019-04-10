const request = require('request');

var getWeather = (lat,lng,callback) => {
    request({
        url: `https://api.darksky.net/forecast/38d8c404765972de2d6b4794a14d1419/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        
        if(error) {
            callback('Unable to coonnect to the server');
        } else if(response.statusCode === 400){
            callback('Unable to fetch weather');
        } else if(response.statusCode === 200){
            callback(undefined,
            {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            }
            );
        }
    });
};

module.exports.getWeather = getWeather;
