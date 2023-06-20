function auth(req, res, next) {
    if (req.user!='jr' || !req.admin) {
        return res.status(401).send("Operación no permitida para su nivel de usuario")
    }
    next()
}

module.exports = {auth} 
