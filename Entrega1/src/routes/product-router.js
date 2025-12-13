// Router Express
import { Router } from "express";
const router = Router();
/* Managers */
import { managerproductos } from '../managers/product.js';
import { productvalidator } from '../middlewares/product-validator.js';
// Multer
import { upload } from "../middlewares/multer.js";


// --------------------------------------- PRODUCTS ---------------------------------------
// Get all Products
router.get('/', async (req, res) => {
    try {
        const productos = await managerproductos.getProd();
        res.status(200).json({
            message: 'Productos obtenidos con exito.',
            productos: productos
        })
    }
    catch (e) {
        res.status(500).json({
            message: 'Error al obtener los productos.',
            error: e
        })
    }
});

// Product by id
router.get('/:pid', async (req, res) => {
    try {
        const prodfiltrado = await managerproductos.getProdById(req.params.pid);
        if (!prodfiltrado) return res.status(404).json({ error: 'Producto no encontrado.' });
        res.status(200).json({
            message: 'Producto por id obtenido correctamente.',
            productos: prodfiltrado
        });
    }
    catch (e) {
        res.status(500).json({
            message: 'Error al obtener el producto/producto inexistente.',
            error: e
        })
    }
});

// Add Products
router.post('/', upload.single('image'), productvalidator, async (req, res) => {
    try {
        const productonuevo = await managerproductos.addProducto({
            ...req.body,
            image: req.file.path
        });

        res.status(201).json({
            message: 'Producto agregado correctamente.',
            producto: productonuevo
        });
    } catch (e) {
        return res.status(500).json({
            error: 'Error de sv',
            error: e
        })
    }
});

// Modify Products
router.put('/:pid', async (req, res) => {
    try {
        let modifyprod = await managerproductos.putProduct(req.params.pid, req.body);

        if (!modifyprod) return res.status(404).json({ error: 'Producto no existente para su modificación.' });

        return res.status(200).json({
            message: 'Producto modificado correctamente.',
            producto: modifyprod
        })
    }
    catch (e) {
        res.status(500).json({
            message: 'Error al modificar el producto.',
            error: e
        })
    }
});

// Delete Products
router.delete('/:pid', async (req, res) => {
    try {
        const prodfiltrado = await managerproductos.deleteProduct(req.params.pid);
        if (!prodfiltrado) return res.status(404).json({ error: 'Producto no encontrado, no existe.' })

        res.status(200).json({
            message: 'Producto eliminado correctamente.',
            producto: prodfiltrado
        })
    }
    catch (e) {
        res.status(500).json({
            message: 'Error al eliminar el producto.',
            error: e
        })
    }
});

export default router;