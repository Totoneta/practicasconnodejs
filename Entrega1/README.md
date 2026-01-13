# Comandos

npm start = node --env-file=.env src/main.js -- Start server

# ----------------------- Guías -----------------------

# PRODUCTOS:

    - Obtener productos :
        - Interfaz Handlebars -- localhost:8080/realtimeproducts

        - POSTMAN
            Ruta y método: GET localhost:8080/api/products/...
            ?limit=<number>
            ?orden=<asc o desc>
            ?page=<number>
            (Búsqueda limitada a 10 resultados por params, orden 'asc' y 'desc' y n° de página)

---

    - Obtener producto por Id: POSTMAN
        Ruta y método: GET localhost:8080/api/products/:pid

---

    - Agregar producto a carrito:
        - Interfaz Handlebars -- localhost:8080/realtimeproducts

        - POSTMAN
            Ruta y método: POST localhost:8080/api/products
            Body: {
                name: string,
                description: string,
                price: number,
                stock: number,
                image: file
            }

---

    - Modificar producto:
        - POSTMAN
            Ruta y método: PUT localhost:8080/api/products/:pid
            Body: {
                name: string,
                description: string,
                price: number,
                stock: number,
                image: file
            }

---

    - Eliminar producto:
        -POSTMAN
            Ruta y método: DELETE localhost:8080/api/products/:pid

# CARRITOS:

    - Obtener carritos :
        - POSTMAN
            Ruta y método: GET localhost:8080/api/carts

---

    - Obtener productos en carrito por Id:
        - POSTMAN
            Ruta y método: GET localhost:8080/api/carts/:cid

---

    - Crear carrito:
        - POSTMAN
            Ruta y método: POST localhost:8080/api/carts

---

    - Agregar producto por id a carrito por id:
        - POSTMAN
            Ruta y método: POST localhost:8080/api/carts/:cid/product/:pid

---

    - Eliminar producto por id del carrito por id:
        - POSTMAN
            Ruta y método: DELETE localhost:8080/api/carts/:cid/product/:pid

---

    - Eliminar producto:
        -POSTMAN
            Ruta y método: DELETE localhost:8080/api/carts/:cid
