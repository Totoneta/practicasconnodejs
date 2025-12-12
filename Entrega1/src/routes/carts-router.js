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
router.post('', async (req, res) => {
    const cart = await managercart.createCart();
    res.json(cart)
});

// Get products Cart by id
router.get('/:cid', async (req, res) => {
    const cartbyid = await managercart.getCartById(req.params.cid);
    if (!cartbyid) return res.status(404).json({ error: "Carrito con inexistente." })
    const cartproducts = cartbyid.productos;
    res.json(cartproducts);
})

// Add products to Cart
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const cartbyid = await managercart.getCartById(cid);
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

    await fs.promises.writeFile(managercart.cartpath, JSON.stringify(carritosupdated, null, 2))

    res.json(carritosupdated);
})

export default router;