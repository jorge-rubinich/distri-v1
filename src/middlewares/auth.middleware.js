function auth(req, res, next) {
    if (req.session?.user!='jr' || !req.session?.admin) {
        return res.status(401).send("Operación no permitida para su nivel de usuario")
    }
    next()
}

module.exports = {auth} 
