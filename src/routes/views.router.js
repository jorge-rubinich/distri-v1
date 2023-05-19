const Router = require('express')
const productManager = require('../dao/db/product.manager')
const viewsRouter= Router()
const systemVars = require('../config/index.js')

viewsRouter.get("/", async (req, res)=>{
    if (!req.session.user){
        req.session.user={
            userRegistered: false,
            userButton: 'Login',
            userCartQty:0
        }
    }
    user=req.session.user
    const result = await productManager.getProductsJSON(req.query)
    const products = result.docs
    const prevPage= result.prevPage
    const nextPage = result.nextPage
    const totalPages = result.totalPagesKs
    const havePages= (result.totalPages >1)
    const page = result.page
    const hasPrevPage= result.hasPrevPage
    const hasNextPage= result.hasNextPage
    const prevLink=  result.hasPrevPage? createLink(req.url, page, result.prevPage) : null
    const nextLink= result.hasNextPage? createLink(req.url, page, result.nextPage) : null
    res.render("index", {products, page, havePages, totalPages, 
        hasPrevPage, hasNextPage, prevPage, nextPage, prevLink, nextLink, user})
})


function createLink(origQuery, page, newPage) {
    return `${systemVars.app.HOST_URL}${(origQuery.includes('&page'))? 
    origQuery.replace('&page='+page, '&page='+newPage) : origQuery+'&page='+newPage}`
}

viewsRouter.get('/login', (req, res) => {
    res.render('login', {
        style: 'index.css'
    })
})

viewsRouter.get('/register', (req, res) => {
    res.render('register', {
        style: 'index.css'
    })
})

viewsRouter.get('/chat', (req, res) => {
    res.render('chat', {})
})



module.exports = viewsRouter


