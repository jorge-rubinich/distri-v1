const Router = require('express')
const productManager = require('../dao/db/product.manager')
const viewsRouter= Router()
const systemVars = require('../config/index.js')

viewsRouter.get("/", async (req, res)=>{
    const result = await productManager.getProductsJSON(req.query)
    console.log(result)
    const products = result.docs
    const prevPage= result.prevPage
    const nextPage = result.nextPage
    const totalPages = result.totalPages
    const havePages= (result.totalPages >1)
    const page = result.page
    const hasPrevPage= result.hasPrevPage
    const hasNextPage= result.hasNextPage
    const prevLink=  result.hasPrevPage? createLink(req.query, result.prevPage) : null
    const nextLink= result.hasNextPage? createLink(req.query, result.nextPage) : null
    res.render("index", {products, page, havePages, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage, prevLink, nextLink})
})


function createLink(reqQuery, page) {
    const {limit, sort, query} = reqQuery
    return `${systemVars.app.HOST_URL}/?limit=${limit || systemVars.pager.limit}&page=${page}`
}

module.exports = viewsRouter