const passport = require('passport')
const { createHash, isValidPassword } = require('../utils/bcryptHash.js')
const {generateToken, authToken} = require('../utils/jsonWebToken.js')
const cartManager = require('../dao/db/cart.manager.js')

class SessionController {

    login =   async (req,res) => {
        if (!req.user) return res.status(401).send({status: 'error', message: 'Usuario o Clave incorrecta'})
    
        const role = (req.user.email=='adminCoder@coder.com')?'admin': 'usuario'
        const cartQty= await cartManager.countProducts(req.user.cart)
      
        const tknUser={
          id: req.user._id,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,
          cartId: req.user.cart,
          cartQty,
          userRegistered: true,
          role
        }
        const access_token= generateToken(tknUser)
        res.status(200).cookie('appCookieToken', access_token, {httpOnly: true, maxAge: 60*60*1000}
            ).send({status: 'success', message: 'User logeado.'})
    
    }

    register = (req, res)=>{
        res.status(200).send({status: 'ok', message: 'Usuario registrado correctamente'})
    }
    
      githubRegister = async(req,res)=>{
        // The strategy return the user. 
        const role = (req.user.email=='adminCoder@coder.com')?'admin': 'usuario'
        const cartQty= await cartManager.countProducts(req.user.cart)
      
        const tknUser={
          id: req.user._id,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,
          cart: req.user.cart,
          cartQty,
          userRegistered: true,
          role
        }
        const access_token= generateToken(tknUser)
    
        res.status(200).cookie('appCookieToken', access_token, {httpOnly: true, maxAge: 60*60*1000}
          ).redirect('/')
    }
    
}    

module.exports = new SessionController