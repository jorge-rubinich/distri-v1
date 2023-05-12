const { model, Schema} = require('mongoose')

const collection="products"

const productSchema = new Schema({
    title: {
            type: String,
            required: true},
    description: {
            type: String,
         required: true},
    thumbnail: String,
    price: {type: Number,
            required: true},
    iva: {
        type: Number,
        min:0,
        max:100,
        default: 21,
        scale: 2
    },
    stock: Number,
    code: {
        type: String,
        unique: true,
        required: true
    }
})

const productModel = model(collection, productSchema)

module.exports = {
    productModel
}