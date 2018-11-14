const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();
const controller = require('./controller');
const session = require('express-session');

const app = express();

massive(process.env.DATABASE_STRING)
.then(db => {
    app.set('db', db)
    console.log('database is connected')
})
.catch(err => {
    console.log('error connecting database', err)
})

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))


//GET ENDPOINTS
app.get('/logout', (req, res) => controller.logout(req, res))
app.get('/current-bets/:id', (req, res) => controller.currentBets(req, res))

//POST ENDPOINTS
app.post('/login', (req, res) => controller.login(req, res));
app.post('/register', (req, res) => controller.register(req, res));

app.listen(8080, () => {
    console.log('Server is listening on port 8080')
})