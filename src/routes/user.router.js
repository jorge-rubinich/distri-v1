const {Router} = require('express')

const router = Router()

router.get('/', async (req, res)=>{
    try {
        let users = await userModel.find()
        console.log(users)
        res.send({status: 'success', payload: users})
    } catch(error) {
        console.log(error)
    }
})

module.exports = router