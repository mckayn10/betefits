const bcrypt = require('bcrypt-nodejs')

function login(req, res) {
    const db = req.app.get('db')

    db.authenticate_user([req.body.username])
        .then(([user]) => {
            bcrypt.compare(req.body.password, user.password, function (err, isCorrectPassword) {
                if (err) {
                    return res.status(500).send(err)
                }
                if (isCorrectPassword) {

                    req.session.user = user
                    res.status(200).send(user)
                }
                else {
                    res.status(505).json('Email or Password is incorrect')
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

function register(req, res) {
    const db = req.app.get('db')
    bcrypt.hash(req.body.passwordRegister, null, null, (err, hash) => {
        if (err) {
            return res.send('something went wrong during hashing')
        }
        db.create_user([req.body.email, req.body.usernameRegister, hash])
            .then(([user]) => {
                res.status(200).send(user)
            })
            .catch(err => {
                console.log("error", err)
            })
    })
}

function logout(req, res) {
    delete req.session.user;
    res.send('Logged out successfully')
}

function currentBets(req, res) {
    const db = req.app.get('db')

    db.current_bets([req.params.id])
        .then(bets => {

            res.status(200).send(bets)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

function currentOffers(req, res) {
    const db = req.app.get('db')

    db.get_offers([req.params.id])
        .then(offers => {
            res.status(200).send(offers)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

function userInfo(req, res) {

    res.send(req.session.user)

}

function createOffer(req, res) {
    const db = req.app.get('db')

    db.create_bet([req.body.state.title, req.body.state.details, req.body.state.amount,
         req.body.creatorID, req.body.state.isOffer, req.body.creatorUsername])
        .then(([bet]) => {
            res.status(200).send(bet)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

function searchForUser(req, res) {
    const db = req.app.get('db')

    db.search_user([req.params.search])
        .then(searchedUsers => {
            if (searchedUsers) {
                res.status(200).send(searchedUsers)
            }
            else {
                res.status(200).send('User does not exist')
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

function sendRequest(req, res) {
    const db = req.app.get('db')

    db.send_request([req.body.bet.title, req.body.bet.details, req.body.bet.amount, req.body.user.id,
         req.body.selectedUser.id, req.body.user.username, req.body.selectedUser.username])
        .then(() => {
            res.status(200).send('request sent successfully')
        })
        .catch(err => {
            res.status(500).send('error sending bet request')
        })
}

function getRequests (req, res) {
    const db = req.app.get('db')

    db.get_requests([req.params.id])
        .then(userRequests => {
            res.status(200).send(userRequests)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

function acceptRequest (req, res) {
    const db = req.app.get('db')

    db.accept_request([req.body.betID])
        .then(response => {
            res.status(200).send('Bet has been accepted!')
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

function declineRequest (req, res) {
    const db = req.app.get('db')

    db.decline_request([req.body.betID])
        .then(response => {
            res.status(200).send('Bet has been declined!')
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

function acceptOffer (req, res) {
    const db = req.app.get('db')

    db.accept_offer([req.body.offerID, req.body.acceptor.id, req.body.acceptor.username])
        .then(response => {
            res.status(200).send('Offer has been accepted!')
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

module.exports = {
    login,
    register,
    logout,
    currentBets,
    userInfo,
    createOffer,
    currentOffers,
    searchForUser,
    sendRequest,
    getRequests,
    acceptRequest,
    declineRequest,
    acceptOffer
}