const {connect} = require('mongoose')

module.exports = {
    connectDb: (URI)=>{
        connect(URI)
        .then(() => {
            console.log('DB Connected')
          })
          .catch((err) => {
            console.error('DB Connection Error', err)
          })
    }

  }