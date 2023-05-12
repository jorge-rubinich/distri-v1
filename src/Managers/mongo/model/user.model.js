const { model, schema} = require('mongoose')

const collection="usuarios"

const usersSchema = new Schema({
    title: String,
    description: String,
    thumbnail: String,
    price: Number,
    stock, Number,
    code: {
        type: String,
        unique: true,
        required: true
    }
})

const usersModel = model(collection, usersSchema)

module.exports = {
    usersModel
}