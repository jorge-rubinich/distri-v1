const { model, Schema} = require('mongoose')
const  {createHash, isValidPassword} = require('../../../utils/bcryptHash.js')


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

userSchema.pre('save', async function(next){
    const hash= await createHash(this.password)
    this.password = hash
    next()
})

const userModel = model(collection, userSchema)

module.exports = {
    userModel
}
