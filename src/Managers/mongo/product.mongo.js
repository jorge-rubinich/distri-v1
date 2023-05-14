const { productModel } = require(`./model/product.model`)

class ProductManagerMongo {

    async id(pid){
        try {
            return await productModel.findOne({_id: pid})
        }catch(err){
            return new Error(err)
        }
    }

    async getProducts(query){
        console.log(query)
    
        try {
            //return await productModel.find({})
            const {page, limit, filter} = query
            return await productModel.paginate({} ,{limit, page})
        }catch(err){
            return new Error(err)
        }
    }

    async getProductById(pid){
        try {
            return await productModel.findOne({_id: pid})
        }catch(err){
            return new Error(err)
        }
    }

    async getProductByCode(cid){
        try {
            return await productModel.findOne({code: cid})
        }catch(err){
            return new Error(err)
        }
    }

    async addProduct(newProduct){
        try {
            return await productModel.create(newProduct)
        }catch(err){
            return new Error(err)
        }
    }

    async uodateProduct(pid, updatedData){
        try {
            return await productModel.findByIdAndUpdate(pid, updatedData, )
        }catch(err){
            return new Error(err)
        }
    }

    async deleteProduct(pid){
        try {
            return await productModel.findByIdAndDelete(pid)
        }catch(err){
            return new Error(err)
        }
    }
}

module.exports = new ProductManagerMongo
