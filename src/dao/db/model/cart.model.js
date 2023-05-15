const { model, Schema} = require('mongoose')

const collection="carts"

const cartSchema = new Schema({
    clientId: String,
    products: [{
        product: {type: Schema.Types.ObjectId,
                ref: 'products'
        },
        quantity: Number
    }]
})


cartSchema.pre('findOne', function(){
    this.populate('products.product')
})

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}