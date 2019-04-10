const mongoose = require('mongoose');

const Jobs = mongoose.model('Jobs',{
    call: {
        type:String
    },
    type: {
        type:String
    },
    address: {
        type:String
    },
    appointment: {
        type:String
    },
    status: {
        type: String
    }
});

module.exports = {Jobs};