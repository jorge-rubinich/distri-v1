const jwt = require('jsonwebtoken')
const systemsVars= require('../config/index')

const PRIVATE_KEY = systemsVars.passport.JWT_SECRETKEY

// recibe user object and encode it in the token
const generateToken = (user) => {

    const token = jwt.sign({user},PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

const authToken = (req, res, next) =>{
    const authHeader= req.headers.authorization
    if (!authHeader) return res.status(401).Send({
        // if there isn´t headers, means there is no token 
        error: 'Not authenticated'
    })
    // split to remove the "Bearer" word
    const token= authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
        if (error) return res.status(403).send({error: 'Not authorized'})
        // have a valid token
        req.user= credentials.user
        next()
    })  
}


module.exports = {
    authToken,
    generateToken
}