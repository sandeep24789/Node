

var getUser = new Promise((resolve,reject) =>{
    var user = {
        id: 12,
        name: 'Sandeep'
    };
    resolve(user);
});

module.exports.getUser = getUser;