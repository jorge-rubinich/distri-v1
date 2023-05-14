class UserManagerMongo {
    async getUsers(){
        try {
            return await userModel.find({})
        }catch(err){
            return new Error(err)
        }
    }
    async getUserById(){}
    async addUser(){}
    async uodateUser(){}
    async deleteUser(){}
}

module.exports = UserManagerMongo
