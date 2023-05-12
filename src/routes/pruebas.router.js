const {Router } = require('express')

const router = Router()

router.get('/setCookie', (req, res)=>{
    res.cookie('CoderCooKie','Estas es una cookie').send('Cookie Lista')
})

router.get('/setSignedCookie', (req, res)=>{
    res.cookie('signedCooKie','Estas es una cookie', {maxAge: 10000000, signed: true}).send('Cookie Lista')
})


router.get('/getCookie', (req, res)=>{
    res.send(req.cookies, req.signedCookies)

})

module.exports = router