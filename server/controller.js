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

    db.current_bets([req.session.user.id])
        .then(bets => {

            res.status(200).send(bets)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

function currentOffers(req, res) {
    const db = req.app.get('db')

    db.get_offers([req.session.user.id])
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

    db.create_bet([req.body.title, req.body.state.details, req.body.state.amount, req.body.creatorID, req.body.state.isOffer])
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

    db.send_request([req.body.bet.title, req.body.bet.details, req.body.bet.amount, req.body.user.id, req.body.selectedUser.id])
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
    getRequests
}