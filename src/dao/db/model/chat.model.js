const { model, Schema} = require('mongoose')

const collection="messages"

const chatSchema = new Schema({
    user: String,
    message: String,

},
{
    timestamps: true 
  }
)


const chatModel = model(collection, chatSchema)

module.exports = {
    chatModel
}