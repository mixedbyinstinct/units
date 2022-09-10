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

        const scripts = await dbo.collections("scripts").find().toArray();
        res.send(scripts);
    })
})

app.post("/convert", (req, res) => {
    let out;
    let number = req.body.number;
    console.log(number);
    const process = spawn('python', ['convert.py', number]);
    process.stdout.on('data', (data) => {
        out = data.toString();
    })
    process.stdout.on('end', () => {
        console.log(out);
        res.json({
            message: number + ' meters in feet is:',
            data: out + ' feet'
        });
    })
})
app.listen(PORT, () => console.log('server started at ' + PORT));
