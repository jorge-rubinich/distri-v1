const { model, Schema} = require('mongoose')

const collection="clients"

const clientSchema = new Schema({
    title: String,
    description: String,
    thumbnail: String,
    price: Number,
    stock: Number,
    code: {
        type: String,
        unique: true,
        required: true
    }
})

const clientModel = model(collection, clientSchema)

module.exports = {
    clientModel
}