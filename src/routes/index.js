const {Router} = require('express')
const router = Router()

const productRouter = require('./product.router.js')
const userRouter = require('./user.router.js')
const clientRouter = require('./client.router.js')
const cartRouter = require('./carts.router.js')
//const pruebasRouter = require('./pruebas.router.js')

const { fileUploader } = require('../utils/multer.js')

/* router.use('/',  (req, res)=>{
    res.send('Hola, mundo cruel')
})  */


router.use('/api/productos',productRouter)

router.use('/api/usuarios', userRouter )

router.use('/api/clientes', clientRouter )

router.use('/api/carrito', cartRouter )

//router.use('/pruebas', pruebasRouter)

/* router.post('/upload', fileUploader.single('miArchivo'), (req, res)=>{
    res.send({
        status: 'success',
        mensaje: 'Archivo subido con éxito'
    })
}) */
module.exports = router