const {Router} = require('express')
const productController = require('../controllers/product.controller.js')

const router = Router()

router.get('/', productController.getProduct)

router.get('/:pid', productController.getProductById)

router.get('/code/:cid', productController.getProductByCode )

router.post('/', productController.addProduct)

router.put('/:pid', productController.updateProduct)

router.delete('/:pid', productController.deleteProduct)

module.exports = router