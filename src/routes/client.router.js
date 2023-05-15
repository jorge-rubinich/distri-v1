const {Router} = require('express')
const clientManager = require('../dao/db/client.manager.js')

const router = Router()

router.get('/', async (req, res)=>{
    try {
        const clients = await clientManager.getClients()
        res.status(200).send({
        status: 'success',
        payload:tClients
        })
    } catch (error) {
        console.log(error)
    }

})

router.get('/:cid', async (req, res)=>{
    const {cid} = req.params
    try {
        const client = await clientManager.getClientById(cid)
        res.status(200).send({
            status: 'success',
            payload: client
            })
    } catch (error) {
        console.log(error)
    }
})

router.get('/code/:code', async (req, res)=>{
    const {code} = req.params
    try {
        const client = await clientManager.getClientByCode(code)
        res.status(200).send({
            status: 'success',
            payload: client
            })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res)=>{
    try {
        const netClient = req.body
        let result= await clientManager.adtClient(netClient)
        res.status(200).send({
        status: 'success',
        payload: result
        })
    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid', async (req, res)=>{
    try {
        const {cid} = req.params
        const updatedData = req.body
        let result= await clientManager.adtClient(cid, updatedData)
        res.status(200).send({
        status: 'success',
        payload: result
        })
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cid', async (req, res)=>{
    try {
        const {cid} = req.params
        let result= await clientManager.delettClient(cid)
        res.status(200).send({
        status: 'success',
        payload: result
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router