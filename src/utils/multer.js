const multer = require('multer')
const {dirname} = require('path')

const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, `${dirname(__dirname)}/public/uploads`)
    },
    filename: (req, file, cb)=>{
        cb(null, `${date.now()}-${file.originalname}`)
    }
})

const fileUploader = multer({
    storage,
    onError: (err, next)=>{
        console.log(err)
        next(err)
    }
})

module.exports= {
    fileUploader
}