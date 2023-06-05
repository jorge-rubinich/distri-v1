const passport = require('passport')
const local = require('passport-local')

const {userModel} = require('../dao/db/model/user.model')
//const { isValidPassword } = require('../utils/bcryptHash')
const  {createHash, isValidPassword} = require('../utils/bcryptHash')
const cartManager = require('../dao/db/cart.manager')


const LocalStrategy= local.Strategy

const initPassport = () => {

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