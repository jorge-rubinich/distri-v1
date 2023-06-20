const {Router} = require('express')
const cartControler = require('../controlers/cart.controler.js')
const router = Router()

router.get('/', cartControler.getCarts)

router.get('/:cid', cartControler.getCartById)

router.post('/', cartControler.createCart)

// Add product to Cart
router.put('/:cid/product/:pid', cartControler.addProduct)

// Add product array to Cart
router.put('/:cid', cartControler.addProductArray)


// delete a product in the Cart
router.delete('/:cid/product/:pid', cartControler.deleteProduct)

// delete all products in the Cart
router.delete('/:cid', cartControler.deleteAllProducts )

module.exports = router