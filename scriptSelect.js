const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27018/personal-site-db';

function scriptSelector(script) {
    let outScript;
    MongoClient.connect(url,  function(err, db) {
        if(err) {
            console.log(err);
        }
        let dbo = db.db('personal-site-db');
    const scriptPath =  dbo.collection("scripts").findOne({title: {$regex: /[script*]/}});
    console.log('found:' + scriptPath.path);
    outScript = scriptPath.path;
    })
    console.log('outScript. = ' + outScript);
    return outScript;
}

module.exports = scriptSelector;