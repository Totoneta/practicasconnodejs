// Router Express
import { Router } from "express";
const router = Router();
// Multer
import { upload } from "../middlewares/multer.js";
// Controller
import { productController } from "../controllers/product-controller.js";


// --------------------------------------- PRODUCTS ---------------------------------------
// Get all Products
router.get('/', productController.getProd);

// Product by id
router.get('/:pid', productController.getProdById);

// Add Products
router.post('/', upload.single('image'), productController.addProduct);

// Modify Products
router.put('/:pid', upload.single('image'), productController.putProduct);

// Delete Products
router.delete('/:pid', productController.deleteProduct);

export default router;