const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const { signUp, signIn } = require('../Controllers/auth');
const { addHistory, deleteHistory, qrHistory } = require('../Controllers/controls');


const app = express();

//MiddleWares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'LucifersSecret' }))

// routes
app.get('/', (req, res) => {
    res.send("HI, Lucifer here");
})

app.get('/qrcodes', qrHistory)
app.post('/signUp', signUp);
app.post('/signIn', signIn);
app.post('/qrcodes', addHistory);
app.delete('/qrcodes/:id', deleteHistory);

module.exports = app;