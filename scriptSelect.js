const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27018/personal-site-db';

function scriptSelector(script) {
    let outScript;
    MongoClient.connect(url,  async function(err, db) {
        if(err) {
            console.log(err);
        }
        let dbo = db.db('personal-site-db');
    const scriptPath =  await dbo.collection("scripts").findOne({title: {$regex: /[script*]/}});
    //console.log('found:' + scriptPath.path);
    outScript = scriptPath.path;
    db.close();
    })
    return outScript;
}

module.exports = scriptSelector;