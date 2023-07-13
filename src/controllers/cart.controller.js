const cartManager = require('../dao/db/cart.manager.js')
const productManager = require('../dao/db/product.manager.js')

class CartController {

  getCarts= async (req, res)=>{
    try {
        let carts = await cartManager.getCarts()
        res.status(200).send(carts)
    } catch (error) {
        console.log(error)
    }
  }

  getCartById= async (req, res)=>{
    const {cid} = req.params
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
  }
 
  createCart= async (req, res)=>{
    try {
         let cart = await cartManager.createCart()
        if (!cart){
            return res.status(400).send({status:'error',mensaje:"No se pudo crear carrito"})
        }
        res.status(200).send({status:'success', payload: cart})
    } catch (error) {
        console.log(error)
    }
  }

  addProduct= async (req, res)=>{
    const {cid, pid} = req.params
    console.log(cid, pid)
    // valid product id
    const product= await productManager.getProductById(pid)
    if (!product) return res.status(400).send({status:'error',message:'El producto indicado no existe'})
    console.log(req.user)
    if (!req.user?.userRegistered) return res.status(400).send({status:'userNotLogedIn',message:'Usuario no registrado'})
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
  } 

  addProductArray= async (req, res)=>{
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
  }
  async  productValid(pid) {
    exist= await productManager.getProductById(pid)
    return !!exist
  } 

  deleteProduct= async (req, res)=>{
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
  }

  deleteAllProducts= async (req, res)=>{
    const {cid} = req.params
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
  }

}

module.exports = new CartController