const {Router} = require('express')
const cartManager = require('../dao/db/cart.manager.js')
const systemVars = require('../config/index.js')
const userLog = require('../middlewares/userLog.middleware.js')
const productManager = require('../dao/db/product.manager.js')
const router = Router()

router.get('/', async (req, res)=>{
    try {
        let carts = await cartManager.getCarts()
        res.status(200).send(carts)
    } catch (error) {
        console.log(error)
    }
})


router.get('/:cid', async (req, res)=>{
    const {cid} = req.params
//    if (!req.session.user?.userRegistered) return res.status(400).send({status:'userNotLogedIn',message:'Usuario no registrado'})
    try {
        const cart = await cartManager.getCartById(cid)
        if (!cart){
            return res.status(400).send({status:'error',mensaje:"Carrito no encontrado"})
        }
        console.log(cart)
        res.status(200).send({status:'ok', payload: cart})
    } catch (error) {
        console.log(error)
    }
})


router.post('/', async (req, res)=>{
    try {
         let cart = await cartManager.createCart()
        if (!cart){
            return res.status(400).send({status:'error',mensaje:"No se pudo crear carrito"})
        }
        res.status(200).send({status:'success', payload: cart})
    } catch (error) {
        console.log(error)
    }
})

// Add product to Cart
router.put('/:cid/product/:pid', async (req, res)=>{
    const {cid, pid} = req.params
    // valid product id
    const product= await productManager.getProductById(pid)
    if (!product) return res.status(400).send({status:'error',message:'El producto indicado no existe'})

    if (!req.session.user?.userRegistered) return res.status(400).send({status:'userNotLogedIn',message:'Usuario no registrado'})
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

// Add product array to Cart
router.put('/:cid', async (req, res)=>{
    const {cid} = req.params
    const {products} = req.body
    console.log(products)
    let allProductsOk= true

    for (const item of products) {
        const exist= await productValid(item.product)
        if (!exist) {allProductsOk= false
            break
        }
    }
    if (!allProductsOk) return res.status(400).send({status:'error',message:'El producto indicado no existe'})
    // All the products ids are valid 
    try {

        const response = await cartManager.modifyProducts(cid, products) 
        if (response.status==="error"){
            return res.status(400).send(response)
        }else{
            return res.status(200).send(response)
        }       
    } catch (error) {
        console.log(error)
    }
})


async function  productValid(pid) {
    exist= await productManager.getProductById(pid)
    return !!exist
} 

// delete a product in the Cart
router.delete('/:cid/product/:pid', async (req, res)=>{
    const {cid, pid} = req.params
//    if (!req.session.user?.userRegistered) return res.status(400).send({status:'userNotLogedIn',message:'Usuario no registrado'})

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


// delete all products in the Cart
router.delete('/:cid', async (req, res)=>{
    const {cid} = req.params
//    if (!req.session.user?.userRegistered) return res.status(400).send({status:'userNotLogedIn',message:'Usuario no registrado'})

    try {
        const response = await cartManager.deleteCart(cid)
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