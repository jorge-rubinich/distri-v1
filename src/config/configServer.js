const {connect} = require('mongoose')

const URI= "mongodb+srv://bitbytedata:2I6oC2DeNnoSQnwi@bitcoder.diebd1o.mongodb.net/prueba1?retryWrites=true&w=majority"

module.exports = {
    connectDb: ()=>{
        connect(URI)
        .then(() => {
            console.log('DB Connected')
          })
          .catch((err) => {
            console.error('DB Connection Error', err)
          })
    }
}