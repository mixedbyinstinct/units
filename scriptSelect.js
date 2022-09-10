//console.log(process.argv[2]);
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27018/personal-site-db';
const Script = require('./models/scriptModel.js');
const path = require('path');


function selectScript() {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(function(res){
        console.log('database connected');
        const dbScript = new Script({
            title: ProcessingInstruction.argv[2],
            path: path.join(__dirname, 'scripts', process.argv[2]),
        })

        dbScript.save();
        console.log('saved');
        return;
    })
}