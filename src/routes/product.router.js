const {Router} = require('express')
const productManager = require('../dao/db/product.manager.js')
const systemVars = require('../config/index.js')

const router = Router()

router.get('/', async (req, res)=>{
    try {
        const result = await productManager.getProductsJSON(req.query)
        console.log(result)
        res.status(200).send({
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage:result.nextPage ,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage? createLink(req.query, result.prevPage) : null,
        nextLink: result.hasNextPage? createLink(req.query, result.nextPage) : null
        })
    } catch (error) {
        console.log(error)
    }
})

function createLink(reqQuery, page) {
    const {limit, sort, filter} = reqQuery
    return `${systemVars.app.HOST_URL}/api/products?limit=${limit || systemVars.pager.limit}&page=${page}`
}

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