const Router = require('express')
const productManager = require('../dao/db/product.manager')
const viewsRouter= Router()

viewsRouter.get("/", async (req, res)=>{
    const query= {page:1, limit:10, filter:""}
    const result = await productManager.getProductsJSON(query)
    const products = result.docs
    console.log(products)
    res.render("index", {products,})
})

module.exports = viewsRouter