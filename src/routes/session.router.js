const {Router} = require('express')
const {userManager} = require('../dao/db/user.manager.js')
const {userModel} = require('../dao/db/model/user.model.js')
const router = Router()
const passport = require('passport')
const cartManager = require('../dao/db/cart.manager.js')
const { createHash, isValidPassword } = require('../utils/bcryptHash.js')
const {generateToken, authToken} = require('../utils/jsonWebToken.js')
const sessionController = require('../controllers/session.controller.js')
const { validateLoginDTO } = require('../DTOs/login.dto.js')

router
    .post("/login", validateLoginDTO, passport.authenticate('login', {session: false}), sessionController.login) 
    .post("/register", passport.authenticate('registerLocal',{failureRedirect: '/api/session/failregister', session: false}),
                 sessionController.register)    
    .get("/failregister", async (req, res)=>{
       console.log("Fallo la estrategia de registro")
       res.status(400).send({status: 'error', error: 'fallo autenticacion'})
    })
    .get('/current', (req, res)=>{
        res.send('current')
    })

// login and register with GitHub
// this is called from "Ingresar con GitHub" button in login Form
router.get('/github', 
    passport.authenticate('github',{scope:['user:email'], session: false}),
     async(req,res)=>{})

// this is the called from github
router.get('/githubcallback', 
    passport.authenticate('github',{failureRedirect:"/login", session: false}),
     sessionController.githubRegister)
router.get('/logout', (req, res)=>{
    res.clearCookie('appCookieToken').redirect("/");
    })

router.get('/datos-sesion', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user)
})


module.exports = router