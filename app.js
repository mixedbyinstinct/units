const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();

const PORT = 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.post('/convert', (req, res) => {
    let number = req.body.number;
    let out = spawn('python', ['convert.py', number]);
    res.json({
        message: number + ' feet in meters is',
        data: out
    })
})

app.listen(PORT, () => console.log('server started at port ' + PORT));