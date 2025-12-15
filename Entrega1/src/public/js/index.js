document.addEventListener('DOMContentLoaded', () => {

    // Sockets
    const socket = io();

    // Inputs producto
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const code = document.getElementById('code');
    const price = document.getElementById('price');
    const estado = document.getElementById('status');
    const stock = document.getElementById('stock');
    const category = document.getElementById('category');
    const image = document.getElementById('image');

    // Listado productos
    const productos = document.getElementById('productos');

    // Form
    const formulario = document.getElementById('form')

    // Accionamiento formulario
    formulario.onsubmit = (e) => {
        e.preventDefault();

        const productonuevo = {
            title: title.value,
            description: description.value,
            code: code.value,
            price: price.value,
            status: estado.value,
            stock: stock.value,
            category: category.value,
            image: image.value || ''
        };

        socket.emit('producto-nuevo', productonuevo);
    }

    // Recibir productos del sv
    socket.on('productos', (prods) => {
        if (!prods[0]) {
            productos.innerHTML = '<span>Aún no se hán agregado productos.</span>'
        }

        productos.innerHTML = '';

        prods.forEach((e) => {
            const li = document.createElement('li');
            li.classList.add('itemprod');

            li.innerHTML = `
          <div class="imgprod">
            <img src=${e.image} alt=${e.image} />
          </div>
          <div>
            <p>Título: ${e.title}</p>
            <p>Descripción: ${e.description}</p>
            <p>Código: ${e.code}</p>
            <p>Precio: ${e.price}</p>
            <p>Estado: ${e.status}</p>
            <p>Stock: ${e.stock}</p>
            <p>Categoría: ${e.category}</p>
          </div>
          `;
            productos.appendChild(li);
        });
    });

});