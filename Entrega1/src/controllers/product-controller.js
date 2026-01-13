import { managerproductos } from "../managers/productmanager.js";

class ProductController {
    constructor(manager) {
        this.manager = manager;
    }

    // Get all Products
    getProd = async (req, res) => {
        try {
            const { limit, sort, page, query } = req.query;

            let sortOrder = -1;
            if (sort === 'asc') sortOrder = 1;
            if (sort === 'desc') sortOrder = -1;

            const filtro = query ? { name: { $regex: query, $options: 'i' } } : {};
            const prods = await this.manager.getProd(limit, sort, page, filtro);
            if (!prods) throw new Error("No se pudieron obtener los datos");

            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
            res.status(200).json({
                status: "success",
                payload: prods.docs,
                totalPages: prods.totalPages,
                prevPage: prods.prevPage,
                nextPage: prods.nextPage,
                page: prods.page,
                hasPrevPage: prods.hasPrevPage,
                hasNextPage: prods.hasNextPage,
                prevLink: prods.hasPrevPage ? `${baseUrl}?limit=${limit}&page=${prods.prevPage}&sort=${sort || ''}&query=${query || ''}` : null,
                nextLink: prods.hasNextPage ? `${baseUrl}?limit=${limit}&page=${prods.nextPage}&sort=${sort || ''}&query=${query || ''}` : null
            });
        }
        catch (e) {
            res.status(500).json({
                message: 'Error al obtener los productos.',
                error: e
            })
        }
    }

    // Product by id
    getProdById = async (req, res) => {
        try {
            const prodfiltrado = await this.manager.getProdById(req.params.pid);
            if (!prodfiltrado) return res.status(404).json({ error: 'Producto no encontrado.' });
            res.status(200).json({
                message: 'Producto por id obtenido correctamente.',
                productos: prodfiltrado
            });
        }
        catch (e) {
            res.status(500).json({
                message: 'Error al obtener el producto.',
                error: e
            })
        }
    }

    // Add Products
    addProduct = async (req, res) => {
        try {
            const productonuevo = await this.manager.addProduct({
                ...req.body,
                image: req.file ? req.file.path : null
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
    }

    // Modify Products
    putProduct = async (req, res) => {
        try {
            let modifyprod = await this.manager.putProduct(req.params.pid, req.body);

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
    }

    // Delete Products
    deleteProduct = async (req, res) => {
        try {
            const prodfiltrado = await this.manager.deleteProduct(req.params.pid);
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
    }
}

export const productController = new ProductController(managerproductos);