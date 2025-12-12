/* UUID id únicos */
import { v4 as uuidv4 } from 'uuid';
/* File System */
import fs from 'fs';
// Router Express
import { Router } from "express";
const router = Router();
/* Managers */
import { managerproductos } from '../managers/product.js';


// --------------------------------------- PRODUCTS ---------------------------------------
// Get all Products
router.get('/', async (req, res) => {
    const productos = await managerproductos.getProd();
    res.json(productos)
});

// Product by id
router.get('/:pid', async (req, res) => {
    const prodfiltrado = await managerproductos.getProdById(req.params.pid);
    if (!prodfiltrado) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json(prodfiltrado)
});

// Add Products
router.post('/', async (req, res) => {
    try {

        const producto = req.body;
        const products = await managerproductos.getProd()

        if (!producto.title || !producto.description || !producto.code || !producto.price || producto.status == null || !producto.stock || !producto.category || producto.thumbnails == null) {
            return res.status(400).json({ error: 'Faltan rellenar campos, todos son obligatorios.' });
        }

        const productonuevo = {
            id: uuidv4(),
            ...producto
        };

        products.push(productonuevo);
        await fs.promises.writeFile(managerproductos.productpath, JSON.stringify(products, null, 2));

        res.json('Producto agregado.' + JSON.stringify(producto, null, 2));
    } catch (e) {
        console.log('ERROR POST PRODUCTO:', e);
        return res.status(500).json({ error: 'Error de sv' })
    }
});

// Modify Products
router.put('/:pid', async (req, res) => {
    let modifyprod = await managerproductos.putProduct(req.params.pid, req.body);

    if (!modifyprod) return res.status(404).json({ error: 'Producto no existente para su modificación.' })
    res.json(modifyprod)
});

// Delete Products
router.delete('/:pid', async (req, res) => {
    const prodfiltrado = await managerproductos.deleteProduct(req.params.pid);
    if (!prodfiltrado) return res.status(404).json({ error: 'Producto no encontrado, no existe.' })

    res.json(prodfiltrado)
});

export default router;