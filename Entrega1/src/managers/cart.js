/* File System */
import fs from 'fs';
/* UUID id únicos */
import { v4 as uuidv4 } from 'uuid';
import { managerproductos } from './product';

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
    addProdToCart = async (cid, pid) => {
        const cartbyid = await this.getCartById(cid);
        const prodbyid = await managerproductos.getProdById(pid);

        if (!cartbyid) res.status(404).json({ error: "Carrito no encontrado." });
        if (!prodbyid) res.status(404).json({ error: "Producto no encontrado." });

        const cartproducts = cartbyid.productos;
        const productincartExist = cartproducts.find(e => e.idprod === pid);

        if (productincartExist) {
            productincartExist.quantity += 1;
        } else {
            cartbyid.productos.push({
                idprod: pid,
                quantity: 1
            });
        }

        const todosloscarritos = await managercart.getCart();
        const carritosupdated = todosloscarritos.map(e => e.id === cid ? cartbyid : e)

        await fs.promises.writeFile(managercart.cartpath, JSON.stringify(carritosupdated, null, 2));
        return carritosupdated;
    }

}

// Managers
export const managercart = new CartsManager('./data/carts.json');