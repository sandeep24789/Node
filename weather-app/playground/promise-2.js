const request = require('request');

var geocodeAddress = (address) => {
    var encodedAddress = encodeURIComponent(address);
    return new Promise((resolve,reject)=>{
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=yGzKGfIH2Dly0OaMy3t6cgCEY48R9njk&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            
            if(error){
                reject('Unable to connect to google server.');
                //console.log('Unable to connect to google server.');
            } else if(body.status==='ZERO_RESULTS'){
                reject('Unable to find the address.');
                //console.log('Unable to find the address.');
            } else {
                resolve( {
                    address: body.results[0].providedLocation.location,
                    Latitude: body.results[0].locations[0].latLng.lat,
                    Longtitude: body.results[0].locations[0].latLng.lng
                });
            //     console.log(`Address: ${body.results[0].providedLocation.location}`);
            // console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
            // console.log(`Longtitude: ${body.results[0].locations[0].latLng.lng}`);
            }
            
        });
    })
    
}

geocodeAddress('19146').then((location)=> {
    console.log(JSON.stringify(location,undefined,2));
}, (errorMsg)=> {
    console.log(errorMsg);
})