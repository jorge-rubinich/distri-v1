const { clientModel } = require(`./model/client.model`)


class ClientManager {
    async getClients(){
        try {
            return await clientModel.find({})
        }catch(err){
            return new Error(err)
        }
    }

    async getClientById(pid){
        try {
            return await clientModel.findOne({_id: pid})
        }catch(err){
            return new Error(err)
        }
    }

    async getClientByCode(cid){
        try {
            return await clientModel.findOne({code: cid})
        }catch(err){
            return new Error(err)
        }
    }

    async addClient(newClient){
        try {
            return await clientModel.create(newClient)
        }catch(err){
            return new Error(err)
        }
    }

    async uodateClient(pid, updatedData){
        try {
            return await clientModel.findByIdAndUpdate(pid, updatedData, )
        }catch(err){
            return new Error(err)
        }
    }

    async deleteClient(pid){
        try {
            return await clientModel.findByIdAndDelete(pid)
        }catch(err){
            return new Error(err)
        }
    }
    
}

module.exports = ClientManager