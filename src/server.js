const express = require("express")
const routerServer = require('./routes')
const viewsRouter = require('./routes/views.router.js')
const handlebars = require('express-handlebars')
const logger = require('morgan')
const {connectDb} = require('./config/configServer.js')
const cookieParser = require("cookie-parser")
const systemVars = require('./config/index.js')
const socketServer = require("./sockets/socketServer.js")
const FileStore = require("session-file-store")
const session = require('express-session')
const { initPassport } = require("./config/passport.config")
const passport = require('passport')

/* const fileStore= FileStore(session)
app.use(session({
    store: new filesStore({
        ttl: 100000*60,
        path: '/session',
        retries: 0
    }),
    secret:  'secretCoder',
    resave: true,
    saveUninitialized: true
})) */

const { PORT } = systemVars.app
const {URI} = systemVars.database

const app = express()

app.use(session({
    secret: 'secretito',
    resave: true,   // para que la session no muera
    saveUninitialized: true //guarda la session aunque no tenga datos
}))

initPassport(systemVars.gitHub)
passport.use(passport.initialize())
passport.use(passport.session())

// Handlebars Setup
app.engine('handlebars', handlebars.engine({}))
app.set('views', './views')
app.set('view engine','handlebars')

connectDb(URI)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(logger('dev'))

app.use("/", viewsRouter)
app.use(routerServer)


// estudiar https://refactoring.guru/es/design-patterns/singleton

server = app.listen(PORT, (err)=>{
    if (err) console.log ("Error en el servidor ", err)
    console.log(`Escuchando en Puerto ${PORT}`)
    console.log(`acceder a ${systemVars.app.HOST_URL}/ `) 
    console.log(`      o a ${systemVars.app.HOST_URL}/?query=category:smartphones `) 
    console.log(`      o a ${systemVars.app.HOST_URL}/?sort=asc    o ambas`) 

})


socketServer.createSocketServer(server)
