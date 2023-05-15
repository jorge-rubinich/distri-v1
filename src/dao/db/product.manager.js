const { productModel } = require(`./model/product.model`)
const systemVars = require('../../config/index.js')

class ProductManager {

    async id(pid){
        try {
            return await productModel.findOne({_id: pid})
        }catch(err){
            return new Error(err)
        }
    }

    async getProducts(query){
        const {page = 1, limit= systemVars.pager.limit, filter=""} = query
    
        try {
            return await productModel.paginate({filter} ,{limit, page, lean:true})
        }catch(err){
            return new Error(err)
        }
    }

    async getProductsJSON(query){
    
        try {
            const {page = 1, limit = 3, filter= ""} = query
            return await productModel.paginate({} ,{limit, page, lean: true})
 
        
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

module.exports = new ProductManager
