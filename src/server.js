const express = require("express")
const routerServer = require('./routes')
const logger = require('morgan')
const {connectDb} = require('./config/configServer.js')
const cookieParser = require("cookie-parser")
const systemVars = require('./config/index.js')

const { PORT } = systemVars.app
const {URI} = systemVars.database

const app = express()

connectDb(URI)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(logger('dev'))
app.use(cookieParser('hola hola'))

app.use(routerServer)

app.listen(PORT, (err)=>{
    if (err) console.log ("Error en el servidor ", err)
    console.log(`Escuchando en Puerto ${PORT}`)
})