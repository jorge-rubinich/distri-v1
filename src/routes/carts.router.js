const {Router} = require('express')
const cartController = require('../controllers/cart.controller.js')
const { passportAuth } = require('../passport-jwt/passportAuth.js')
const { authorization } = require('../passport-jwt/passportAuthorization.js')
const router = Router()

router.get('/', cartController.getCarts)

router.get('/:cid', cartController.getCartById)

router.post('/', cartController.createCart)

// Add product to Cart
router.put('/:cid/product/:pid', passportAuth('jwt'), authorization('admin') ,cartController.addProduct)

// Add product array to Cartclaro

router.put('/:cid', cartController.addProductArray)


// delete a product in the Cart
router.delete('/:cid/product/:pid', passportAuth('jwt') , cartController.deleteProduct)

// delete all products in the Cart
router.delete('/:cid', passportAuth('jwt') , cartController.deleteAllProducts )

module.exports = router