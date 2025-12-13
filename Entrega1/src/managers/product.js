/* File System */
import fs from 'fs';
/* UUID id únicos */
import { v4 as uuidv4 } from 'uuid';

/* --------------------------------------- Product Manager Class --------------------------------------- */
export class ProductManager {
    constructor(productpath) {
        this.productpath = productpath;
    }

    // Get Products
    getProd = async () => {
        try {
            if (!fs.existsSync(this.productpath)) {
                await fs.promises.writeFile(this.productpath, "[]")
                return [];
            }
            const prods = await fs.promises.readFile(this.productpath, 'utf-8');
            return JSON.parse(prods);
        }
        catch (e) {
            console.log(`Error al obtener Products: ${e}`);
            return []
        };
    };

    // Get Products by ID
    getProdById = async (id) => {
        const products = await this.getProd();
        const prodfiltrado = products.find((e) => e.id === id);

        if (!prodfiltrado) return null;
        return prodfiltrado
    };

    //Add Product
    addProducto = async (prod) => {
        const products = await this.getProd();

        const productonuevo = {
            id: uuidv4(),
            ...prod
        };

        products.push(productonuevo);
        
        await fs.promises.writeFile(this.productpath, JSON.stringify(products, null, 2));
        return productonuevo;
    }

    // Modify Product
    putProduct = async (id, obj) => {
        try {
            const products = await this.getProd();
            let prodfiltrado = await this.getProdById(id);

            if (!prodfiltrado) return null;;

            prodfiltrado = { ...prodfiltrado, ...obj };
            const productsmodify = products.map(e => e.id === id ? prodfiltrado : e);

            await fs.promises.writeFile(this.productpath, JSON.stringify(productsmodify, null, 2));
            return productsmodify;
        } catch (e) {
            return new Error('Error al modificar:' + e)
        }
    };

    // Delete Product
    deleteProduct = async (id) => {
        const products = await this.getProd();
        const arraymodify = products.filter((prod) => prod.id !== id);
        const arrayvalidation = products.find((prod) => prod.id === id);

        if (!arrayvalidation) return null;

        const jsonarraymodify = JSON.stringify(arraymodify, null, 2);
        await fs.promises.writeFile(this.productpath, jsonarraymodify);
        return (arraymodify)
    }
};

// Managers
export const managerproductos = new ProductManager('./data/productos.json');