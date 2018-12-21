const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();
const controller = require('./controller');
const session = require('express-session');
const path = require('path');

const app = express();

massive(process.env.DATABASE_STRING)
    .then(db => {
        app.set('db', db)
        console.log('database is connected')
    })
    .catch(err => {
        console.log('error connecting database', err)
    })

app.use(express.static(`${__dirname}/../build`));
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))


//GET ENDPOINTS
app.get('/logout', controller.logout) //logs user out and ends session. Pushes to login page
app.get('/current-bets/:id', controller.currentBets) // returns all the current, accepted, bets for the user
app.get('/offers/:id', controller.currentOffers) // returns all of the offers a user has posted on their Profile
app.get('/user-info', controller.userInfo); // returns the session user
app.get('/search/:search', controller.searchForUser) // returns an array of users based on the given search string
app.get('/requests/:id', controller.getRequests) // returns all of the unresolved requests that have been sent to the user
app.get('/notifications/:id', controller.getNumRequests) // returns a count of all of the requests that have been sent to the user

//POST ENDPOINTS
app.post('/login', controller.login); // authenticates a user based on the username and password
app.post('/register', controller.register); // takes the given username, password, and email and registers a new user
app.post('/create-offer', controller.createOffer); // creates a new bet and adds it as an offer to the user account
app.post('/send-request', controller.sendRequest); // creates a new bet and sends it as a request to any searched user
app.post('/requests/accept', controller.acceptRequest) // adds a request on a users profile to their current bets
app.post('/requests/decline', controller.declineRequest) // declines a request and removes it from the user profile
app.post('/offers/accept', controller.acceptOffer) // accepts an offers and adds it to both users current bets list
app.post('/profile-picture', controller.updatePicture); // updates the users profile picture to the passed in URL
app.post('/winner/:id', controller.updateWinner); // adds bet amount to the winners amount earned
app.post('/loser/:id', controller.updateLoser); // adds bet amount to the losers amount lost
app.post('/resolve-bet', controller.resolveBet); // sets the bet resolved status to null and removes the bet from current bets

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
app.listen(8080, () => {
    console.log('Server is listening on port 8080')
})