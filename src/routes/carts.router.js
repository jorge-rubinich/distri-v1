const {Router} = require('express')
const cartManager = require('../dao/db/cart.manager.js')
const systemVars = require('../config/index.js')
const userLog = require('../middlewares/userLog.middleware.js')
const router = Router()

router.get('/', async (req, res)=>{
    try {
        let carts = await cartManager.getCarts()
        res.status(200).send(carts)
    } catch (error) {
        console.log(error)
    }
})

router.get('/fromUser', async (req, res)=>{
    if (!req.session.user?.userRegistered) return res.status(400).send({status:'userNotLogedIn',message:'Usuario no registrado'})
    try {
        const cart = await cartManager.getCartByEmail(req.session.user.email)
        if (!cart){
            return res.status(400).send({status:'error',mensaje:"Carrito no encontrado"})
        }
        const HBCart= cart.products.map(item =>{
            return {
                quantity: item.quantity,
                title: item.product.title,
                price: item.product.price,
                total: item.quantity* item.product.price,
                productId: item.product._id.toString()
              }
        })


        console.log(HBCart)
        res.render('carrito',{user: req.session.user, HBCart})
    } catch (error) {
        console.log(error)
    }
})


router.post('/:uid', async (req, res)=>{
    // Given a user Id (uid - must be an email) return his cart (if exist)
    // or create a new one
    try {
        let {uid} = req.params
        // verify uid is a mail
        if (!uid.includes("@") ) {
            return res.status(400).send({status: "error", message:"El uid de cliente debe ser un mail"})
        } 
        let cart = await cartManager.createCart(uid)
        if (!cart){
            return res.status(400).send({status:'error',mensaje:"No se pudo crear carrito"})
        }
        res.status(200).send({status:'success', payload: cart})
    } catch (error) {
        console.log(error)
    }
})

// Add product to Cart
router.post('/product/:pid', async (req, res)=>{
    const {pid} = req.params
    console.log(req.session, req.session.user, !req.session.user?.userRegistered)
    if (!req.session.user?.userRegistered) return res.status(400).send({status:'userNotLogedIn',message:'Usuario no registrado'})
    const cid = req.session.user.cartId

    const quantity = req.body.quantity | 1 
    try {
        const response = await cartManager.addProduct(cid, pid, quantity) 
        if (response.status==="error"){
            return res.status(400).send(response)
        }else{
            return res.status(200).send(response)
        }       
    } catch (error) {
        console.log(error)
    }
})

// Add product to Cart
router.delete('/product/:pid', async (req, res)=>{
    const {pid} = req.params
    console.log(req.session, req.session.user, !req.session.user?.userRegistered)
    if (!req.session.user?.userRegistered) return res.status(400).send({status:'userNotLogedIn',message:'Usuario no registrado'})
    const cid = req.session.user.cartId

    try {
        const response = await cartManager.deleteProduct(cid, pid) 
        if (response.status==="error"){
            return res.status(400).send(response)
        }else{
            return res.status(200).send(response)
        }       
    } catch (error) {
        console.log(error)
    }
})

module.exports = router