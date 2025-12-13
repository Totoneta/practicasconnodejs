// Router Express
import { Router } from "express";
const router = Router();
/* Managers */
import { managercart } from '../managers/cart.js';

// --------------------------------------- CART ---------------------------------------
// Create Cart
router.post('/', async (req, res) => {
    try {
        const cart = await managercart.createCart();
        res.status(200).json({
            message: 'Carrito creado correctamente.',
            cart: cart
        })
    }
    catch (e) {
        res.status(500).json({
            message: 'Error al crear el carrito',
            error: JSON.stringify(e)
        })
    }
});

// Get Carts
router.get('/', async (req, res) => {
    try {
        const carts = await managercart.getCarts();

        if (!carts) return res.status(404).json({ error: "Error en la carga de carritos." });

        res.status(200).json({
            message: 'Carritos obtenidos correctamente.',
            carts: carts
        });
    }
    catch (e) {
        res.status(500).json({
            message: 'Error al obtener los carritos.',
            error: JSON.stringify(e)
        })
    }
})

// Get products Cart by id
router.get('/:cid', async (req, res) => {
    try {
        const cartbyid = await managercart.getCartById(req.params.cid);
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
            error: JSON.stringify(e)
        })
    }
})

// Add products to Cart
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const caritoupdated = await managercart.addProdToCart(cid, pid)

        res.status(200).json({
            message: 'Producto agregado al carrito correctamente.',
            caritoupdated: caritoupdated
        });
    }
    catch (e) {
        res.status(500).json({
            message: 'Error al agregar el producto al carrito.',
            error: JSON.stringify(e)
        })
    }
})

export default router;