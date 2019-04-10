var mysql = require('mysql');

var connection = mysql.createConnection(
    {host: "localhost",
    user: "root",
    password: "root"}
);

connection.connect(err => {
    //var sql = "SELECT * FROM helix.domain";
    if(err)
        throw err;
    console.log("Connected");

    // connection.query(sql, (err,result) => {
    //     if(err)
    //     throw err;
    // console.log("Result:",result);
    // });
});

module.exports = {connection};