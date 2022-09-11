const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const spawn = require('child_process').spawn;
let app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27018/personal-site-db';
const MongoClient = require('mongodb').MongoClient;
const Script = require('./models/scriptModel.js');
const scriptSelector = require('./scriptSelect.js');

const PORT = 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get("/dbcheck", (req, res) => {
    MongoClient.connect(url, async function(err, db) {
        if(err) {
            console.log(err);
        }
        let dbo = db.db('personal-site-db');

        const scripts = await dbo.collection("scripts").find().toArray();
        res.send(scripts);
    })
})

app.post("/convert", async (req, res) => {
    let out;
    let unit1;
    let unit2;
    let number = req.body.number;
    let script = req.body.scriptChoice;
   // let selectedaScript;
    MongoClient.connect(url, async function(err, db) {
        if(err) {
            console.log(err);
        }
        let dbo = db.db('personal-site-db');
        const scriptPath = await dbo.collection("scripts").findOne({title: {$regex: script, $options: 'i'}});
        console.log(scriptPath);
        const f2m = /^(\/.*\/.*\/.*\/.*\/(m)+\.*)/.test(scriptPath.path);
        if(f2m) {
            unit1 = 'meters';
            unit2 = 'feet';
        }
        const c2f = /^(\/.*\/.*\/.*\/.*\/(c)+\.*)/.test(scriptPath.path);
        if(c2f) {
            unit1 = 'degrees celsius';
            unit2 = 'degrees farenheit';
        }
        const k2m = /^(\/.*\/.*\/.*\/.*\/(k)+\.*)/.test(scriptPath.path);
        if(k2m) {
            unit1 = 'kilometers';
            unit2 = 'miles';
        }
        const process = spawn('python', [scriptPath.path, number]);
        process.stdout.on('data', (data) => {
            out = data.toString();
        })
        process.stdout.on('end', () => {
            return res.json({
                message: number + ' ' + unit1 + ' in' + ' ' + unit2 + ' is',
                data: out + ' ' + unit2,
               // script: scriptPath,
            })
        })
    })
})

mongoose.connect(url, {useNewUrlParser: true}).then((res) => {
    app.listen(PORT, () => console.log('server started at ' + PORT));
})