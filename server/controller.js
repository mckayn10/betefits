const bcrypt = require('bcrypt-nodejs')

function login (req, res){
    const db = req.app.get('db')

    db.search_user([req.body.username])
    .then(user => {
        bcrypt.compare(req.body.password, user[0].password, function(err, isCorrectPassword){
            if(err){
                return res.send(err)
            }
            if(isCorrectPassword){
                req.session.user = user[0]
                res.status(200).send(user[0])
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
            .then(() => {
                res.status(200).send('New User registered successfully')
            })
            .catch(err => {
                console.log("error", err)
            })
    })
}

function logout (req, res){
    delete req.session.user;
    res.send('Logged out successfully')
}

module.exports = {
    login,
    register,
    logout
}