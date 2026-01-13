import { managercart } from "../managers/cartmanager.js";

class CartController {
    constructor(manager) {
        this.manager = manager;
    }

    // Crear carrito
    crearcart = async (req, res) => {
        try {
            const cart = await this.manager.createCart();
            res.status(200).json({
                message: 'Carrito creado correctamente.',
                cart: cart
            })
        } catch (e) {
            res.status(500).json({
                message: 'Error al crear el carrito',
            })
        }
    }

    // Get Carts
    getcarts = async (req, res) => {
        try {
            const carts = await this.manager.getCarts();

            if (!carts) return res.status(404).json({ error: "Error al cargar carritos." });

            res.status(200).json({
                message: 'Carritos obtenidos correctamente.',
                carts: carts
            });
        }
        catch (e) {
            res.status(500).json({
                message: 'Error al obtener los carritos.',
            })
        }
    }

    // Get Cart's Products by id
    getcartsproducts = async (req, res) => {
        try {
            const cartbyid = await this.manager.getCartWithProdsById(req.params.cid);
            if (!cartbyid) return res.status(404).json({ error: "Carrito con inexistente." })
            const cartproducts = cartbyid.productos;
            res.status(200).json({
                message: 'Productos obtenidos correctamente.',
                cartproducts: cartproducts
            });
        }
        catch (e) {
            res.status(500).json({
                message: 'Error al obtener los productos del carrito.',
            })
        }
    }

    // Add prods to Cart
    addprodtocart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const caritoupdated = await this.manager.addProdToCart(cid, pid)

            res.status(200).json({
                message: 'Producto agregado al carrito correctamente.',
                caritoupdated: caritoupdated
            });
        }
        catch (e) {
            res.status(500).json({
                message: 'Error al agregar el producto al carrito.',
            })
        }
    }

    // Delete single product from Cart
    deleteprodfromcart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await this.manager.deleteProductFromCart(cid, pid);
            res.status(200).json({ status: "success", message: "Producto eliminado", updatedCart });
        } catch (e) {
            res.status(500).json({ status: "error", message: "Error al eliminar el producto." });
        }
    }

    // Delete Cart
    deletecart = async (req, res) => {
        try {
            const carrito = await this.manager.deleteCart(req.params.cid);

            res.status(200).json({
                message: 'Carrito eliminado correctamente.',
                carrito: carrito
            });
        }
        catch (e) {
            res.status(500).json({
                message: 'Error al eliminar el carrito.'
            })
        }
    }

    // Empty cart
    emptycart = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.manager.emptyCart(cid);
            res.status(200).json({ status: "success", message: 'Carrito vaciado correctamente.', cart });
        } catch (e) {
            res.status(500).json({ status: "error", message: 'Error al vaciar el carrito.' });
        }
    }
}

export const cartController = new CartController(managercart);