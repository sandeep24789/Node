const express = require('express');
const winston = require('./config/winston');
var morgan = require('morgan');

var app = express();
app.use(morgan('combined',{stream: winston.stream}));

const env = require('./env');
winston.info('logged');
setTimeout(()=>{
    console.log("set timeout");
})

// process.nextTick(()=>{
//     console.log("next tick");
// });

setTimeout(()=>{
    console.log("set Timeout");
});

setImmediate(()=>{
    console.log(env.value);
});


