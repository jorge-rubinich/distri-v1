const express = require("express")
const routerServer = require('./routes')
const viewsRouter = require('./routes/views.router.js')
const handlebars = require('express-handlebars')
const logger = require('morgan')
const {connectDb} = require('./config/configServer.js')
const cookieParser = require("cookie-parser")
const systemVars = require('./config/index.js')

const { PORT } = systemVars.app
const {URI} = systemVars.database

const app = express()

// Handlebars Setup
app.engine('handlebars', handlebars.engine({}))
app.set('views', './views')
app.set('view engine','handlebars')

connectDb(URI)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(logger('dev'))
app.use(cookieParser('hola hola'))

app.use("/", viewsRouter)
app.use(routerServer)

app.listen(PORT, (err)=>{
    if (err) console.log ("Error en el servidor ", err)
    console.log(`Escuchando en Puerto ${PORT}`)
    console.log(`acceder a ${systemVars.app.HOST_URL}/  .. burdo..pero funciona!`) 
})