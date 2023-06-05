const {Router} = require('express')
const {userManager} = require('../dao/db/user.manager.js')
const {userModel} = require('../dao/db/model/user.model.js')
const router = Router()
const passport = require('passport')
const cartManager = require('../dao/db/cart.manager.js')
const { createHash, isValidPassword } = require('../utils/bcryptHash.js')

router.post("/login", passport.authenticate('login'),  async (req,res) => {
    if (!req.user) return res.status(401).send({status: 'error', message: 'Usuario o Clave incorrecta'})

    role = (req.user.email=='adminCoder@coder.com')?'admin': 'usuario'
    const cartQty= await cartManager.countProducts(req.user.cart)
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role,
        userRegistered: true,
        cartId: req.user.cart.toString(),
        cartQty 
    }
    res.status(200).send({status: 'success', message: 'User logeado.'})

}) 


router.post("/register", passport.authenticate('registerLocal',{
    failureRedirect: '/api/session/failregister',
    successsRedirect: '/'
}) )

router.get("/failregister", async (req, res)=>{
    console.log("Fallo la estrategia de registro")
    res.status(400).send({status: 'error', error: 'fallo autenticacion'})
})


router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            return res.send({status: 'error', error: err})
        }
        res.status(200).send('logout ok')
    })
})

router.get('/datos-sesion', (req, res) => {
    // get user session data
    const userSession = req.session.user;
  
    // send to the client
    res.json({ userSession });
  });

module.exports = router