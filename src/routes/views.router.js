const Router = require('express')
const productManager = require('../dao/db/product.manager')
const viewsRouter= Router()
const systemVars = require('../config/index.js')
const passport = require('passport')

// personalized jwt for home page. Doesn´t return 401 if there is no user
const JWTHomePage  = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (user) {
        req.user = user
      }
      next()
        })
        (req, res, next);
  };

viewsRouter.get("/", JWTHomePage, async (req, res)=>{

    if (!req.user){
        req.user={
            userRegistered: false,
            userCartQty:0
        }
    }
    user=req.user
    console.log("Home",req.user)
    console.log(user.userRegistered)
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


viewsRouter.get('/chat', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.render('chat', {user: req.user})
})

module.exports = viewsRouter


