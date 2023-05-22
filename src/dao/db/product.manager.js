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
        const {page = 1, limit= systemVars.pager.limit, filter="", sort= asc} = query
        
        try {
            return await productModel.paginate({filter} ,{limit, page, lean:true}).sort()
        }catch(err){
            return new Error(err)
        }
    }

    async getProductsJSON(reqQuery){
        try {
            const {page = 1, limit = systemVars.pager.limit, query= "", sort =""} = reqQuery
            const sortObj = (!sort)? {} : (sort==="asc")? {price:1} : {price:-1}
            let queryObj={}
            if (query)  {
                const [key,value]= query.split(':')
                queryObj= { [key]: value}
    
            }
            const options= {
                limit,
                page,
                lean: true,
                sort: sortObj
            }
            return await productModel.paginate(queryObj ,options)
 
        
        }catch(err){
            console.log(err)
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

    async getCategories() {
        return await productModel.distinct('category')
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
