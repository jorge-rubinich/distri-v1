const passport = require('passport')
const local = require('passport-local')
const GitHubStrategy = require('passport-github2') 
const systemVars = require('./index.js')
const {isValidPassword, createHash} = require('../utils/bcryptHash.js')
const {userModel} = require('../dao/db/model/user.model.js')
const localStrategy = local.Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt


const initPassport = (passVars)=>{

const  {GIT_CLIENTID, GIT_CLIENTSECRET, GIT_CALLBACKURL, JWT_SECRETKEY } = passVars

const JWTOptions= {
    jwtFromRequest : ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRETKEY
}

passport.use('jwt', new JWTStrategy(JWTOptions, 
    async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload.user)
        } catch (error) {
            return done(error)
        }
    }
)
)

passport.use('github', new GitHubStrategy({
    clientID: GIT_CLIENTID,
    clientSecret: GIT_CLIENTSECRET,
    callbackURL: GIT_CALLBACKURL
}, async(accessToken, refreshToken, profile, done)=>{
    try {
        //console.log(profile)
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



passport.use('registerLocal', new localStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
},async (email, password, done)=>{
    try {
        let userDB = await  userModel.findOne({email: username})
        if (userDB) return done(null, false)

        const userCart = await cartManager.createCart()

        let newUser ={
            first_name,
            last_name,
            email: username,
            password /*: createHash(password)*/,
            cart: userCart._id
        }
        let result = await userModel.create(newUser)
        if (!result) return done('No pudo crearse el nuevo Usuario')
        return done(null, result)
    } catch (error) {
        return done("error al obtener usuario: "+error)
    }
})
)

passport.use('login', new localStrategy(
    {
    usernameField: 'email',
    passwordField: 'password'},
     async (username, password, done)=>{
    try {
        const user= await userModel.findOne({email: username})
        if (!user) return done(null, false)

        const validUser= await isValidPassword(password, user)
        if (!validUser) return done(null, false)
        return done(null, user)
    } catch (error) {
        return done(error)
    }
})
)

}

const cookieExtractor = req =>{
    let token= null
    if (req && req.cookies){
        // have a cookie
        token= req.cookies['appCookieToken']
    }
    return token
}

module.exports= { initPassport }