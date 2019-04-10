// const request = require('request');
//const cbk = require('./playground/callbacks');
 const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help','h')
.argv;

geocode.geocodeAddress(argv.address, (errorMessage, results)=> {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.Latitude,results.Longtitude,(errorMessage, weatherResults)=> {
            if(errorMessage)
                console.log(errorMessage);
            else
            console.log(`Current tempearture is ${weatherResults.temperature} and it feels like ${weatherResults.apparentTemperature}`);
        });
    }
});

//38d8c404765972de2d6b4794a14d1419

// request({
//     url: `https://api.darksky.net/forecast/38d8c404765972de2d6b4794a14d1419/39.939066,-75.181151`,
//     json: true
// }, (error, response, body) => {
    
//     if(error) {
//         console.log('Unable to coonnect to the server');
//     } else if(response.statusCode === 400){
//         console.log('Unable to fetch weather');
//     } else if(response.statusCode === 200){
//         console.log(`Temperature: ${body.currently.temperature}`);
//     }
// });
