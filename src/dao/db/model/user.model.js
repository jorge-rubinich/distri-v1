const { model, Schema} = require('mongoose')

const collection="users"

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    cart: {
        type: Schema.Types.ObjectId}

})

const userModel = model(collection, userSchema)

module.exports = {
    userModel
}
