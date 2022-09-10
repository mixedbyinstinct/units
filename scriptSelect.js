//console.log(process.argv[2]);
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27018/personal-site-db';
const Script = require('./models/scriptModel.js');
const path = require('path');


function selectScript() {
    const scriptPath = path.join(__dirname, 'scripts', process.argv[2]).toString();
    mongoose.connect(url, {useNewUrlParser: true}).then(() => {
        const dbScript = new Script({
            title: process.argv[2]
            ,
            path: scriptPath,
        })
        dbScript.save();
        console.log('saved');
    })
}