const passport = require('passport')
const local = require('passport-local')

const {userModel} = require('../dao/db/model/user.model')
const { isValidPassword } = require('../utils/bcryptHash')
//const  {createHash, isValidPassword} = require('../utils/bcryptHash')

const LocalStrategy= local.Strategy

const initPassport = () => {

    passport.use('registerLocal', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done)=>{
        const {fist_name, last_name } = req.body
        try {
            let userDB = await  userModel.findOne({email: username})
            if (userDB) return done({}, false)

            let newUser ={
                fist_name,
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userModel.create(newUSer)
            return done(null, result)
            
        } catch (error) {
            return done("error al obtener usuario: "+error)
        }
        
            }))
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
    let user = await userModel.findById(id)
    done(null, user)
})


passport.use('login', new LocalStrategy({
    usernameField: 'email'
}, async (username, password, done)=>{
    const userDB = await userModel.findOne({email: username})
    if (!userDB) return done(null, false)

    if (!isValidPassword(password, user)) return done(null, false)

    return done(null, userDB)
}
))

module.exports = {
    initPassport
}