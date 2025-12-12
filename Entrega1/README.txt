// ID autogenerado pod uuid, en formato string.
// En un parametro o query que se encuentre señalizado con '{IDPROD/IDCART}', es dinamico. Actualizarlo a dependiendo la necesidad.

---------------------------------------------------------------------------------------------------------------------------
/* Casos de prueba PRODUCTOS para POSTMAN: */
---------------------------------------------------------------------------------------------------------------------------

# GET: 
http://localhost:8080/api/products -> RECUPERA TODOS LOS PROD
http://localhost:8080/api/products/{IDPROD} -> RECUPERA PROD POR ID

# POST:
http://localhost:8080/api/products -> AGREGAR PROD

RAW, JSON:
{
    "title": "Salsa",
    "description": "desc",
    "price": 120,
    "stock": 18,
    "code": "ABC123",
    "status": true,
    "category": "algo",
    "thumbnails": []
}

# PUT:
http://localhost:8080/api/products/{IDPROD} -> MODIFICA EL PROD

RAW, JSON:
{
    "title": "Salsa",
    "description": "Caja de salsa",
    "price": 120,
    "stock": 18,
    "code": "ABC123",
    "status": true,
    "category": "Alimentos",
    "thumbnails": []
}

# DELETE
http://localhost:8080/api/products/{IDPROD} -> ELIMINA EL PROD POR ID

---------------------------------------------------------------------------------------------------------------------------
/* Casos de prueba CARRITO para POSTMAN: */
---------------------------------------------------------------------------------------------------------------------------

# POST (crear Cart vacío con id único):
http://localhost:8080/api/carts -> CREA CARRITOS

# GET (productos de carrito):
http://localhost:8080/api/carts/{IDCART} -> RETORNA LOS PROD DEL CARRITO POR ID

# POST
http://localhost:8080/api/{IDCART}/carts/{IDPROD} -> AGREGA UN PROD AL CARRITO DE PROD. POR IDPROD E IDCART