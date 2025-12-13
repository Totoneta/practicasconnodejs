/* File System */
import fs from 'fs';
// Router Express
import { Router } from "express";
const router = Router();
/* Managers */
import { managercart } from '../managers/cart.js';
import { managerproductos } from '../managers/product.js';


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
            error: e
        })
    }
});

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
            error: e
        })
    }
})

// Add products to Cart
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const caritoupdated = managercart.addProdToCart(cid, pid)

        res.status(200).json({
            message: 'Producto agregado al carrito correctamente.',
            caritoupdated: caritoupdated
        });
    }
    catch (e) {
        res.status(500).json({
            message: 'Error al agregar el producto al carrito.',
            error: e
        })
    }
})

export default router;