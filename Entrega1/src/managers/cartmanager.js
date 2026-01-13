// Models
import { CartModel } from "../models/cartmodel.js";
// Managers
import { managerproductos } from "./productmanager.js";

/* --------------------------------------- Cart Manager Class --------------------------------------- */
export class CartsManager {
    constructor(model) {
        this.model = model;
    }

    // Create Cart
    createCart = async () => {
        try {
            const cart = await this.model.create({ productos: [] });
            return cart;
        } catch (e) {
            console.log(`Error al crear el nuevo carrito: ${e}`);
        }
    }

    // Get Carts
    getCarts = async () => {
        try {
            const cart = await this.model.find();
            return cart;
        }
        catch (e) {
            return console.log(`Error al obtener los carritos: ${e}`);
        };
    }

    // Get Cart by id
    getCartById = async (cid) => {
        try {
            const cart = await this.model.findById(cid);
            if (!cart) return null;
            return cart;
        } catch (e) {
            console.log(`Error al obtener el carrito: ${e}`);
        }
    }

    // Get Cart with prods in, by id
    getCartWithProdsById = async (cid) => {
        try {
            const cart = await this.model.findById(cid).populate('productos.product');
            if (!cart) return null;
            return cart;
        } catch (e) {
            console.log(`Error al obtener el carrito: ${e}`);
        }
    }

    // Add Product on Cart
    addProdToCart = async (cid, pid) => {
        try {
            const producto = await managerproductos.getProdById(pid);
            if (!producto) return null;
            const carrito = await this.model.findById(cid);
            if (!carrito) return null;

            const productincartExist = carrito.productos.find(e => e.idprod === pid);

            if (productincartExist) {
                productincartExist.quantity += 1;
            } else {
                carrito.productos.push({
                    product: pid,
                    quantity: 1
                })
            }

            await carrito.save()

            return carrito
        } catch (e) {
            console.log(`Error al agregar el producto al carrito: ${e}`);
        }
    }

    deleteCart = async (cid) => {
        try {
            await this.model.findByIdAndDelete(cid);
            return console.log('Carrito eliminado exitosamente.');
        } catch (e) {
            console.log('Hubo problemas al eliminar el carrito, reintente más tarde.');
        }
    }

}

// Managers
export const managercart = new CartsManager(CartModel);