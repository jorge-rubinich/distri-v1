const {Router} = require('express')
const {userManager} = require('../dao/db/user.manager.js')
const {userModel} = require('../dao/db/model/user.model.js')
const router = Router()
const passport = require('passport')
const cartManager = require('../dao/db/cart.manager.js')

router.post("/loginNuevo", passport.authenticate('login', {
    failureRedirect: '/failregister',
    successsRedirect: '/'
}) )

router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    const userDB = await userModel.findOne({email, password})

    if (!userDB)   return res.send({status:'error', message:'No se encontró el usuario'})
    //have user. createCart create a cart (if no exist) and 
    // return the cartId
    const userCart= await cartManager.createCart(userDB.email)
    const cartQty= await cartManager.countProducts(userCart._id)

    req.session.user = {
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        role: 'admin',
        userRegistered: true,
        userButton: "Logout",   
        cartId:userCart._id,
        cartQty 
    }
    console.log(userCart)
    console.log(userDB)
    console.log(req.session.user)

    res.redirect('/')

})


router.post("/registerNuevo", passport.authenticate('registerLocal', {
    failureRedirect: '/failregister',
    successsRedirect: '/'
}) )


router.post('/register', async (req, res)=>{
    try {
        const {username,first_name, last_name, email, password} = req.body 
        //validar los campos
    
        // is mail already used?
        const existUser = await userModel.findOne({email})
    
        if (existUser) return res.send({status: 'error', message: 'el email ya está registrado' })
    
        // otra forma
        // const newUser = new userModel({
        //     username,
        //     first_name,
        //     last_name, 
        //     email, 
        //     password 
        // })
        // await newUser.save()
    
        const newUser = {
            username,
            first_name,
            last_name, 
            email, 
            password  /// encriptar
        }
        let createdUser = await userModel.create(newUser)
        
        if (!createdUser) return res.status(400).send({status: 'error',
            message: 'No pudo crearse el nuevo Usuario'})

        res.status(200).send({
            status: 'success',
            message: 'Usuario creado correctamente',
            createdUser
        })
    } catch (error) {
        console.log(error)
    }
   
})

router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            return res.send({status: 'error', error: err})
        }
        res.send('logout ok')
    })
})

router.get('/datos-sesion', (req, res) => {
    // get user session data
    const userSession = req.session.user;
  
    // send to the client
    res.json({ userSession });
  });

module.exports = router