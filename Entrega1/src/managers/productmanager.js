// Modelo
import { ProductModel } from '../models/productsmodel.js';

/* --------------------------------------- Product Manager Class --------------------------------------- */
export class ProductManager {
    constructor(model) {
        this.model = model;
    }

    // Get all Products
    getProd = async () => {
        try {
            const prods = await this.model.find({});
            return prods;
        }
        catch (e) {
            console.log(`Error al obtener Productos: ${e}`);
            return [];
        };
    };

    // Get Products by ID
    getProdById = async (pid) => {
        try {
            const prodfiltrado = await this.model.findById(pid);
            return prodfiltrado
        } catch (e) {
            console.log(`Error al obtener Productos por ID: ${e}`);
        };
    };

    //Add Product
    addProduct = async (prod) => {
        try {
            const productonuevo = await this.model.create(prod);
            return productonuevo;
        } catch (e) {
            console.log(`Error al agregar el Producto: ${e}`);
        };
    }

    // Modify Product
    putProduct = async (pid, obj) => {
        try {
            const productsmodify = await this.model.findByIdAndUpdate(pid, obj, { new: true });
            return productsmodify;
        } catch (e) {
            return new Error('Error al modificar el producto:' + e)
        }
    };

    // Delete Product
    deleteProduct = async (pid) => {
        try {
            const deletedproducts = await this.model.findByIdAndDelete(pid);
            return (deletedproducts)
        } catch (e) {
            console.log(`Error al eliminar el Producto: ${e}`);
        };
    }
};

// Managers
export const managerproductos = new ProductManager(ProductModel);