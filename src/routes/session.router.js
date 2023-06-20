const {Router} = require('express')
const {userManager} = require('../dao/db/user.manager.js')
const {userModel} = require('../dao/db/model/user.model.js')
const router = Router()
const passport = require('passport')
const cartManager = require('../dao/db/cart.manager.js')
const { createHash, isValidPassword } = require('../utils/bcryptHash.js')
const {generateToken, authToken} = require('../utils/jsonWebToken.js')
const userControler = require('../controlers/user.controler.js')

router.post("/login", passport.authenticate('login', {session: false}), userControler.login) 

router.post("/register", 
passport.authenticate('registerLocal',{failureRedirect: '/api/session/failregister', session: false}),
userControler.register) 

router.get("/failregister", async (req, res)=>{
    console.log("Fallo la estrategia de registro")
    res.status(400).send({status: 'error', error: 'fallo autenticacion'})
})


// login and register with GitHub
// this is called from "Ingresar con GitHub" button in login Form
router.get('/github', 
    passport.authenticate('github',{scope:['user:email'], session: false}),
     async(req,res)=>{})

// this is the called from github
router.get('/githubcallback', 
    passport.authenticate('github',{failureRedirect:"/login", session: false}),
     userControler.githubRegister)


router.get('/logout', (req, res)=>{
    res.clearCookie('appCookieToken').redirect("/");
    })



module.exports = router