const mongoose = require('mongoose');

//const schema = mongoose.Schema();

mongoose.connect('mongodb://localhost:27017/mydb', (err) => {
    if(err) {
        return err;
    }
    console.log('MongoDB Connected');
})

const db = mongoose.model("jobs", {
    CALL: String,
    TYPE: String,
    ADDRESS: String,
    APPOINTMENT: String,
    STATUS: String
});

// let a = new db({
//     CALL: 'skfdjsldfj'
// })

// a.save().then(doc => console.log(doc));

module.exports = {db};

