/* Express */
import express from 'express';
const app = express()
const PORT = 8080;

// Routers
import productsrouter from './routes/product-router.js';
import cartsrouter from './routes/carts-router.js';

// --------------------------------------- API ---------------------------------------
// Work with postman
app.use(express.json());
app.use('/api/products' ,productsrouter);
app.use('/api/carts' ,cartsrouter);

// --------------------------------------- SV ---------------------------------------
// Listen port 8080
app.listen(PORT, () => {
    console.log('Sv OPEN: 8080');
});