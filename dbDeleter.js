const MongoClient = require('mongodb').MongoClient;
url = 'mongodb://localhost:27018/personal-site-db';

MongoClient.connect(url, function(err, db) {
    if(err) {
        console.log(err);
    }
    let dbo = db.db('personal-site-db');
    dbo.collection("scripts").deleteOne({title: "convert.py"})
    console.log('cleared');
  //  db.close();
})