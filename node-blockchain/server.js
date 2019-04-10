var express = require('express');
var app = express();
var fs = require("fs");
// var app = require('./app.js');
var port = process.env.PORT || 5000;

app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( "assets" + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user.name );
       res.send( JSON.stringify(user));
    });
 })

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
