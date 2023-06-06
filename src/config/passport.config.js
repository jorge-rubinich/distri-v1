const passport = require('passport')
const local = require('passport-local')
const GitHubStrategy = require('passport-github2') 
const systemVars = require('../config/index.js')

const {userModel} = require('../dao/db/model/user.model')
//const { isValidPassword } = require('../utils/bcryptHash')
const  {createHash, isValidPassword} = require('../utils/bcryptHash')
const cartManager = require('../dao/db/cart.manager')


const LocalStrategy= local.Strategy

const initPassport = (gitHubVars) => {

    const  {GIT_CLIENTID, GIT_CLIENTSECRET, GIT_CALLBACKURL } = gitHubVars

    passport.use('github', new GitHubStrategy({
        clientID: GIT_CLIENTID,
        clientSecret: GIT_CLIENTSECRET,
        callbackURL: GIT_CALLBACKURL
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            console.log(profile)
            if (!profile._json.email){
                //have no email in the profile (profile is private?)
                throw new Error('Github no ha proporcionado su email. Verifique que su perfil sea publico.')
            }
            let user = await userModel.findOne({email: profile._json.email })
            if (!user){
                // have no user. Create it
                const userCart = await cartManager.createCart()

                let newUser= {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    password: '',
                    cart: userCart._id
                }
                let result= await userModel.create(newUser)
                done(null, result)
            } else {   // user exists
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('registerLocal', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done)=>{
        const {fist_name, last_name } = req.body
        try {
            let userDB = await  userModel.findOne({email: username})
            if (userDB) return done(null, false)

            const userCart = await cartManager.createCart()

            let newUser ={
                fist_name,
                last_name,
                email: username,
                password: createHash(password),
                cart: userCart._id
            }
            let result = await userModel.create(newUser)
            if (!result) return done('No pudo crearse el nuevo Usuario')
            return done(null, result)
            
        } catch (error) {
            return done("error al obtener usuario: "+error)
        }
        
            }))
}

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async(id, done)=>{
    let user = await userModel.findById(id)
    done(null, user)
})


passport.use('login', new LocalStrategy({
    usernameField: 'email'
}, async (username, password, done)=>{
    console.log(username)
    try {
        const userDB = await userModel.findOne({email: username})
        console.log(userDB)
        if (!userDB) return done(null, false)

        if (!isValidPassword(password, userDB)) return done(null, false)

        return done(null, userDB)
    } catch (error) {
        return done(error)
    }

}
))

module.exports = {
    initPassport
}