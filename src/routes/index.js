const {Router} = require('express')
const router = Router()

const productRouter = require('./product.router.js')
const userRouter = require('./user.router.js')
const clientRouter = require('./client.router.js')
const cartRouter = require('./carts.router.js')
const sessionRouter= require('./session.router.js')

const { fileUploader } = require('../utils/multer.js')

router.use('/api/products',productRouter)

router.use('/api/users', userRouter )

router.use('/api/clients', clientRouter )

router.use('/api/carts', cartRouter )

router.use('/api/sessions',sessionRouter)

/* router.post('/upload', fileUploader.single('miArchivo'), (req, res)=>{
    res.send({
        status: 'success',
        mensaje: 'Archivo subido con éxito'
    })
}) */
module.exports = router