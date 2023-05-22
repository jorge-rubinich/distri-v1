const { cartModel } = require(`./model/cart.model`)
const {mongoose} = require('mongoose')

class CartManager {



    async getCartById(cid){
        try {
            return await cartModel.findById({cid})
        }catch(err){
            return new Error(err)
        }
    }

    async getCartByEmail(userMail){
        try {
            return await cartModel.findOne({clientId: userMail})
        }catch(err){
            return new Error(err)
        }
    }

    async getCarts() {

        try {
            return await cartModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }

    async createCart(userMail) {
        try {
            // first verify if there is a cart for the user
            let cart = await cartModel.findOne({clientId: userMail})
            if (cart){
                // I already have a cart
                return cart
            }
            cart= {
                clientId: userMail,
                products: []
            }
            return await cartModel.create(cart)

        } catch (error) {
            return new Error(error)
        }
    }

    async addProduct(cid, pid, quantity) {
        const cart= await cartModel.findById(cid)
        if (!cart) return {status: "error", message: "Carrito no encontrado"}

        const productIndex = cart.products.findIndex(prod =>prod.product._id.toString()===pid)
        if (productIndex===-1){
            // the product isn´t in the cart. Add it
            cart.products.push({product: pid, quantity})
        } else {
            // the product already exists in the cart
            cart.products[productIndex].quantity+= quantity
        }

        // save the updated cart
        await cart.save()

        return {status: "succes", cart, productsQty:cart.products.length}
    }


    async deleteProduct(cid, pid) {
        const cart= await cartModel.findById(cid)
        if (!cart) return {status: "error", message: "Carrito no encontrado"}

        const productIndex = cart.products.findIndex(prod =>prod.product._id.toString()===pid)

        // Return error if the product isn´t in the cart.
        if (productIndex===-1) return {status: "error", message: 'El producto no existe en el carrito'}

        // the product exists in the cart
        cart.products.splice(productIndex,1)
        

        // save the updated cart
        await cart.save()

        return {status: "succes", cart, productsQty:cart.products.length}
    }

    async countProducts(cid) {
        const cart= await cartModel.findById(cid)
        if (!cart) return {status: "error", message: "Carrito no encontrado"}
        return cart.products.length
    }


}


module.exports = new CartManager