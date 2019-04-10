const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/connection');

const app = express();
app.use(bodyParser.json());

const port = process.env.port || 3001;

app.get('/jobs', (req,res)=> {
    connection.db.find().then((doc)=>{
        res.send({doc})
    })
});

app.listen(port, () => {
    console.log('listening', port);
})