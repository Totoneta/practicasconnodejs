/* Express */
import express from 'express';
const SERVER = express()
const PORT = 8080;
// Routers
import productsrouter from './routes/product-router.js';
import cartsrouter from './routes/carts-router.js';
import viewsrouter from './routes/views-router.js'
// Handlebars
import handlebars from 'express-handlebars'

// --------------------------------------- API ---------------------------------------
// App
SERVER.use(express.json());

// Archivos estáticos
SERVER.use(express.static(`${process.cwd()}/src/public`));

// Handlebars
SERVER.engine('handlebars', handlebars.engine());
SERVER.set('view engine', 'handlebars');
SERVER.set('views', `${process.cwd()}/src/views`);

// Router
SERVER.use('/api/products', productsrouter);
SERVER.use('/api/carts', cartsrouter);
SERVER.use('/views', viewsrouter);

// Listen port 8080
SERVER.listen(PORT, () => {
    console.log('Sv OPEN: 8080');
});