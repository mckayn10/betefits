const bcrypt = require('bcrypt-nodejs')

function login (req, res){
    const db = req.app.get('db')

    db.search_user([req.body.username])
    .then(([user]) => {
        bcrypt.compare(req.body.password, user.password, function(err, isCorrectPassword){
            if(err){
                return res.send(err)
            }
            if(isCorrectPassword){
                console.log(user)
                req.session.user = user
                res.status(200).send(user)
            } 
            else {
                res.send('Email or Password is incorrect')
            }
        })
    })
}

function register (req, res){
    const db = req.app.get('db')
    bcrypt.hash(req.body.passwordRegister, null, null, (err, hash) => {
        if(err){
            return res.send('something went wrong during hashing')
        }
        db.create_user([req.body.email, req.body.usernameRegister, hash])
            .then(([user]) => {
                res.status(200).send(user)
            })
            .catch(err => {
                // console.log("error", err)
            })
    })
}

function logout (req, res){
    delete req.session.user;
    res.send('Logged out successfully')
}

function currentBets (req, res){
    const db = req.app.get('db')

    db.current_bets([req.params.id])
        .then(bets => {
            // console.log(req)
            res.status(200).send(bets)
        })
}

function userInfo(req, res){
    console.log(req.session)
    res.send(req.session.user)

}

module.exports = {
    login,
    register,
    logout,
    currentBets,
    userInfo
}