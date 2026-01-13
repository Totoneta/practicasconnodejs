// Router Express
import { Router } from "express";
const router = Router();
/* Controller */
import { cartController } from "../controllers/cart-controller.js";

// --------------------------------------- CART ---------------------------------------
// Create Cart
router.post('/', cartController.crearcart);

// Get Carts
router.get('/', cartController.getcarts);

// Get Cart's products by id
router.get('/:cid', cartController.getcartsproducts);

// Add products to Cart
router.post('/:cid/product/:pid', cartController.addprodtocart);

// Delete Cart
router.delete('/:cid', cartController.deletecart);

export default router;