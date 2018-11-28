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
app.get('/logout', controller.logout)
app.get('/current-bets/:id', controller.currentBets)
app.get('/offers/:id', controller.currentOffers)
app.get('/user-info', controller.userInfo);
app.get('/search/:search', controller.searchForUser)
app.get('/requests/:id', controller.getRequests)

//POST ENDPOINTS
app.post('/login', controller.login);
app.post('/register', controller.register);
app.post('/create-offer', controller.createOffer);
app.post('/send-request', controller.sendRequest);
app.post('/requests/accept', controller.acceptRequest)
app.post('/requests/decline', controller.declineRequest)
app.post('/offers/accept', controller.acceptOffer)


app.listen(8080, () => {
    console.log('Server is listening on port 8080')
})