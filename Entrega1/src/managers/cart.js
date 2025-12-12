/* File System */
import fs from 'fs';
/* UUID id únicos */
import { v4 as uuidv4 } from 'uuid';

/* --------------------------------------- Cart Manager Class --------------------------------------- */
export class CartsManager {
    constructor(cartpath) {
        this.cartpath = cartpath;
    }

    // Create Cart
    createCart = async () => {
        const cart = await this.getCart();
        const newcart = {
            id: uuidv4(),
            productos: []
        };
        cart.push(newcart);
        await fs.promises.writeFile(this.cartpath, JSON.stringify(cart, null, 2));
        return cart;
    }

    // Get Cart
    getCart = async () => {
        try {
            if (!fs.existsSync(this.cartpath)) {
                await fs.promises.writeFile(this.cartpath, "[]");
                return []
            };

            const cart = await fs.promises.readFile(this.cartpath, 'utf-8');
            return JSON.parse(cart);
        }
        catch (e) {
            return console.log(`Error al obtener Cart: ${e}`);
        };
    }

    // Get Cart by id
    getCartById = async (id) => {
        const cart = await this.getCart();
        const cartbyid = cart.find(e => e.id === id);
        if (!cartbyid) return null;
        return cartbyid;
    }

    // Add Product on Cart
    addProdToCart = (idprod, quantity) => {
        
    } //If exist on cart add 1 to quantity

}

// Managers
export const managercart = new CartsManager('./data/carts.json');