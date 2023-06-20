const passport = require('passport')
const local = require('passport-local')
const GitHubStrategy = require('passport-github2') 
//const systemVars = require('./index.js')

const {userModel} = require('../dao/db/model/user.model.js')
//const { isValidPassword } = require('../utils/bcryptHash')
const  {createHash, isValidPassword} = require('../utils/bcryptHash.js')
const cartManager = require('../dao/db/cart.manager.js')
const ppJwt = require('passport-jwt')
const cookieParser = require('cookie-parser')

const JWTStrategy= ppJwt.Strategy
const ExtractJWT= ppJwt.ExtractJwt
const LocalStrategy= local.Strategy

const initPassport = (gitHubVars) => {


    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "MiClaveUltraSecreta",
    }, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

   

    passport.use('registerLocal', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        session: false
    }, async (req, username, password, done)=>{
        const {first_name, last_name } = req.body
        try {
            let userDB = await  userModel.findOne({email: username})
            if (userDB) return done(null, false)

            const userCart = await cartManager.createCart()

            let newUser ={
                first_name,
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

/* passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async(id, done)=>{
    let user = await userModel.findById(id)
    done(null, user)
})
 */

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

const cookieExtractor = req =>{
    let token= null
    if (req && req.cookies){
        // have a cookie
        token= req.cookies['AppCookieToken']
    }
    console.log("token: ", token)
    return token
}

module.exports = {
    initPassport
}