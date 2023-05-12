const {Router} = require('express')
const productManager = require('../Managers/mongo/product.mongo.js')

const router = Router()

router.get('/', async (req, res)=>{
    try {
        const products = await productManager.getProducts()
        res.status(200).send({
        status: 'success',
        payload: products
        })
    } catch (error) {
        console.log(error)
    }

})

router.get('/:pid', async (req, res)=>{
    const {pid} = req.params
    try {
        const product = await productManager.getProductById(pid)
        res.status(200).send({
            status: 'success',
            payload: product
            })
    } catch (error) {
        console.log(error)
    }
})

router.get('/code/:cid', async (req, res)=>{
    const {cid} = req.params
    try {
        const product = await productManager.getProductByCode(cid)
        res.status(200).send({
            status: 'success',
            payload: product
            })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res)=>{
    try {
        const newProduct = req.body
        let result= await productManager.addProduct(newProduct)
        res.status(200).send({
        status: 'success',
        payload: result
        })
    } catch (error) {
        console.log(error)
    }
})

router.put('/:pid', async (req, res)=>{
    try {
        const {pid} = req.params
        const updatedData = req.body
        let result= await productManager.addProduct(pid, updatedData)
        res.status(200).send({
        status: 'success',
        payload: result
        })
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:pid', async (req, res)=>{
    try {
        const {pid} = req.params
        let result= await productManager.deleteProduct(pid)
        res.status(200).send({
        status: 'success',
        payload: result
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router