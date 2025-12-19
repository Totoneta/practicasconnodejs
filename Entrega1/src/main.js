/* Express */
import express from 'express';
const SERVER = express()
const PORT = 8080;
// Routers
import productsrouter from './routes/product-router.js';
import cartsrouter from './routes/carts-router.js';
import viewsrouter from './routes/views-router.js'
// Handlebars
import handlebars from 'express-handlebars';
// Sockets
import { Server } from 'socket.io';
// Manager
import { managerproductos } from './managers/product.js';

// --------------------------------------- API ---------------------------------------



// App
SERVER.use(express.json());
SERVER.use(express.urlencoded({ extended: true }))

// Archivos estáticos
SERVER.use(express.static(`${process.cwd()}/src/public`));

// Handlebars
SERVER.engine('handlebars', handlebars.engine());
SERVER.set('view engine', 'handlebars');
SERVER.set('views', `${process.cwd()}/src/views`);

// Router
SERVER.use('/api/products', productsrouter);
SERVER.use('/api/carts', cartsrouter);
SERVER.use('/', viewsrouter);

// Listen port 8080
const serverlistener = SERVER.listen(PORT, () => {
    console.log('Sv OPEN: 8080');
});

const socketserver = new Server(serverlistener);

socketserver.on('connection', async (socket) => {
    // Obtener productos
    const productos = await managerproductos.getProd();
    socket.emit('productos', productos);
    
    // Elimnar producto
    socket.on('eliminarproducto', async (id) => {
        await managerproductos.deleteProduct(id);
        const productosActualizados = await managerproductos.getProd();
        socketserver.emit('productos', productosActualizados)
    });

    socket.on('usuarioemail',  async (nombreuser) => {
        socket.broadcast.emit('usuario-conectado', nombreuser);
    });
    
})

// Io
SERVER.set('io', socketserver);

