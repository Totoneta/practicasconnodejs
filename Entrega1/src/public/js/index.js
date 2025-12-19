document.addEventListener('DOMContentLoaded', async () => {

  // Sockets
  const socket = io();

  // Listado productos
  const listadoproductos = document.getElementById('productos');

  // Recibir productos del sv
  socket.on('productos', (prods) => {
    listadoproductos.innerHTML = '';
    if (!prods.length) {
      listadoproductos.innerHTML = '<span>Aún no se hán agregado productos.</span>';
      return
    }
    prods.forEach((e) => {
      const li = document.createElement('li');
      li.classList.add('itemprod');

      li.innerHTML = `
      <div class="imgprod">
      <img src="${e.image}" alt="${e.image}" />
      </div>
      <div>
      <p>id: ${e.id}</p>
      <p>Título: ${e.title}</p>
      <p>Descripción: ${e.description}</p>
      <p>Código: ${e.code}</p>
      <p>Precio: ${e.price}</p>
      <p>Estado: ${e.status}</p>
      <p>Stock: ${e.stock}</p>
      <p>Categoría: ${e.category}</p>
      <button type="button" data-id="${e.id}">Eliminar</button>
      </div>
      `;
      listadoproductos.appendChild(li);
    });
  });


  // Inputs producto
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const code = document.getElementById('code');
  const price = document.getElementById('price');
  const estado = document.getElementById('status');
  const stock = document.getElementById('stock');
  const category = document.getElementById('category');
  const image = document.getElementById('image');
  // Form
  const formulario = document.getElementById('form');

  
  // Eliminar producto
  listadoproductos.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.dataset.id;
      socket.emit('eliminarproducto', id);
    }
  });


  // Pedir y envíar usuario al back
  const pedirNombre = async () => {
    const { value: nombre } = await Swal.fire({
      title: "Ingresa tu nombre",
      input: "text",
      inputLabel: "nombre",
      inputPlaceholder: "nombre...",
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) return 'Debes ingresar un nombre';
      }
    });
    return nombre;
  };
  const nombreuser = await pedirNombre();
  socket.emit('usuarioemail', nombreuser);
  // Nuevo usuario conectado
  socket.on('usuario-conectado', (nombre) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: `${nombre} se conectó`,
      showConfirmButton: false,
      timer: 3000
    });
  });
});