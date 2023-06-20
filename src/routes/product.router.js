const {Router} = require('express')
const productControler = require('../controlers/product.controler.js')

const router = Router()

router.get('/', productControler.getProduct)

router.get('/:pid', productControler.getProductById)

router.get('/code/:cid', productControler.getProductByCode )

router.post('/', productControler.addProduct)

router.put('/:pid', productControler.updateProduct)

router.delete('/:pid', productControler.deleteProduct)

module.exports = router