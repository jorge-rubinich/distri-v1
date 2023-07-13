const {Router} = require('express')
const cartController = require('../controllers/cart.controller.js')
const router = Router()

router.get('/', cartController.getCarts)

router.get('/:cid', cartController.getCartById)

router.post('/', cartController.createCart)

// Add product to Cart
router.put('/:cid/product/:pid', cartController.addProduct)

// Add product array to Cart
router.put('/:cid', cartController.addProductArray)


// delete a product in the Cart
router.delete('/:cid/product/:pid', cartController.deleteProduct)

// delete all products in the Cart
router.delete('/:cid', cartController.deleteAllProducts )

module.exports = router