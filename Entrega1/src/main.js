/* Express */
import express from 'express';
const SERVER = express()
const PORT = 8080;

// Routers
import productsrouter from './routes/product-router.js';
import cartsrouter from './routes/carts-router.js';

// --------------------------------------- API ---------------------------------------
// App
SERVER.use(express.json());

// Archivos estáticos
SERVER.use(express.static(`${process.cwd()}/src/public`));

// Router
SERVER.use('/api/products' ,productsrouter);
SERVER.use('/api/carts' ,cartsrouter);

// Listen port 8080
SERVER.listen(PORT, () => {
    console.log('Sv OPEN: 8080');
});