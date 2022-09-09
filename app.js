const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const spawn = require('child_process').spawn;
let app = express();

const PORT = 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
            message: number + ' feet in meters is:',
            data: out
        });
    })
})

app.listen(PORT, () => console.log('server started at port ' + PORT));