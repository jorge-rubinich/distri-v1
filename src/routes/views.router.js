const Router = require('express')
const productManager = require('../dao/db/product.manager')
const viewsRouter= Router()
const systemVars = require('../config/index.js')

viewsRouter.get("/", async (req, res)=>{
    if (!req.session.user){
        req.session.user={
            userRegistered: false,
            userCartQty:0
        }
    }
    user=req.session.user

    const catList = await productManager.getCategories()
    catList.unshift("Todas")
    const result = await productManager.getProductsJSON(req.query)
    const page = result.page
    const totalPages = result.totalPages
    if  (!Number.isInteger(page) || page <1 || page > totalPages) {
        // page isn't a valid number
        const errorMessage= 'Lo siento. La página que has solicitado no es válida'
        return res.render('error404', {errorMessage})
    }
    const products = result.docs
    const prevPage= result.prevPage
    const nextPage = result.nextPage
    const havePages= (result.totalPages >1)
    const hasPrevPage= result.hasPrevPage
    const hasNextPage= result.hasNextPage
    const prevLink=  result.hasPrevPage? createLink(req.url, page, result.prevPage) : null
    const nextLink= result.hasNextPage? createLink(req.url, page, result.nextPage) : null
    res.render("index", {products, page, havePages, totalPages, 
        hasPrevPage, hasNextPage, prevPage, nextPage, prevLink, nextLink, user, catList})
})

function createLink(origQuery, page, newPage) {

    return `${systemVars.app.HOST_URL}${(origQuery.includes('page'))? 
    origQuery.replace('page='+page, 'page='+newPage) : origQuery+((origQuery!=='/')? '&': '?')+ 'page='+newPage}`
} 

// replaced with swal in frontEnd
/* viewsRouter.get('/login', (req, res) => {
    res.render('login', {
        style: 'index.css'
    })
}) */

// replaced with swal in frontEnd
/* viewsRouter.get('/register', (req, res) => {
    res.render('register', {
        style: '/index.css'
    })
}) */


viewsRouter.get('/chat', (req, res) => {
    res.render('chat', {})
})

module.exports = viewsRouter


