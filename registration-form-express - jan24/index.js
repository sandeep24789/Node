var fs = require('fs');
var csvWriter = require('csv-write-stream')
var csv = require('csv');
var obj = csv();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/images', express.static(__dirname + '/Images'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/" + "index.html");
});
app.post('/', function (req, res) {
    response = {
        enterprise_id: req.body.entid,
        sap_id: req.body.sapid,
        name: req.body.name,
        language: req.body.lang,
        project: req.body.proj,
        location: req.body.loc



    };

    console.log(response);

    // var dataInfo = [
    //    ['Enterprise ID',response.enterprise_id],
    //    ['SAP ID',response.sap_id],
    //    ['Name',response.name],
    //    ['Language',response.language],
    //    ['Location',response.location]];

    // obj.from.array(dataInfo).to.path('./datafile/dataInfo.csv');
    if (fs.existsSync('out.csv')) {
        console.log('File Exist');
        var writer = csvWriter({ sendHeaders: false })
        writer.pipe(fs.createWriteStream('out.csv', { flags: 'a' }))
        writer.write({ "Enterprise ID": response.enterprise_id, "SAP ID": response.sap_id, Name: response.name, Language: response.language, Project: response.project, Location: response.location, "Created Date": new Date(Date.now()).toLocaleString() })
        writer.end()
    }
    else {
        //write the headers and newline
        console.log('New file, just writing headers');
        var writer = csvWriter({ headers: ["Enterprise ID", "SAP ID", "Name", "Language", "Project", "Location", "Created Date"] })
        writer.pipe(fs.createWriteStream('out.csv', { flags: 'a' }))
        writer.write([response.enterprise_id, response.sap_id, response.name, response.language, response.project, response.location, new Date(Date.now()).toLocaleString()])
        writer.end()
    }
    // res.send("Registered Successfully");
});
var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});