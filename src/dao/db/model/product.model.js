const { model, Schema} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection="products"

const productSchema = new Schema({
    title: {
            type: String,
            required: true},
    description: {
            type: String,
         required: true},
    thumbnails: String,
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
    category: String,
    code: {
        type: String,
        unique: true,
        required: true
    }
})

productSchema.plugin(mongoosePaginate)
const productModel = model(collection, productSchema)

module.exports = {
    productModel
}