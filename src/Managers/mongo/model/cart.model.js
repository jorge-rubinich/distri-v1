const { model, schema} = require('mongoose')

const collection="carritos"

const cartSchema = new Schema({
    clientid: Number,
    products: [{
        product: {type: Schema.Types.ObjectId,
                ref: 'productos'
        },
    }],
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

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}