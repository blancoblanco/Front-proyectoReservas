# DOCUMENTACIÓN API BACKEND - FRONTEND

## Base URL
```
http://localhost:3000/api
```

## Headers requeridos
```javascript
Content-Type: application/json
```

## Autenticación
El backend usa JWT en cookies. Todas las rutas protegidas requieren:
- Cookie `token` con el JWT
- O header `Authorization: Bearer <token>`

---

## 1. AUTENTICACIÓN (Auth)

### Rutas
| Método | Endpoint | Protección | Descripción |
|--------|----------|------------|--------------|
| POST | `/register` | ❌ | Registrar nuevo usuario |
| POST | `/login` | ❌ | Iniciar sesión |
| POST | `/logout` | ❌ | Cerrar sesión |
| GET | `/profile` | ✅ | Obtener perfil del usuario |
| GET | `/verify` | ❌ | Verificar token actual |

### Controlador
**Archivo:** `src/controllers/auth.controller.js`
- `register` - Registro de usuarios
- `login` - Inicio de sesión
- `logout` - Cierre de sesión
- `profile` - Obtener perfil
- `verifyToken` - Verificar token

### Model: Usuario
```javascript
{
  _id: ObjectId,
  nombre: String,        // required
  correo: String,        // required, unique
  contrasena: String,   // required (hash bcrypt)
  telefono: String,      // optional
  rol: String,          // enum: ['admin', 'usuario'], default: 'usuario'
  createdAt: Date,
  updatedAt: Date
}
```

### Endpoints detalle

#### POST /register
**Request:**
```json
{
  "nombre": "Juan",
  "correo": "juan@email.com",
  "contrasena": "password123"
}
```
**Response (201):**
```json
{
  "id": "...",
  "usuario": "Juan",
  "correo": "juan@email.com",
  "createdAt": "...",
  "updatedAt": "..."
}
```
*Nota: Establece cookie `token` automáticamente*

#### POST /login
**Request:**
```json
{
  "correo": "juan@email.com",
  "contrasena": "password123"
}
```
**Response (200):**
```json
{
  "id": "...",
  "usuario": "Juan",
  "correo": "juan@email.com",
  "createdAt": "...",
  "updatedAt": "..."
}
```
*Nota: Establece cookie `token` automáticamente*

#### POST /logout
**Response:** 200 OK
*Limpia la cookie `token`*

#### GET /profile
**Response (200):**
```json
{
  "id": "...",
  "usuario": "Juan",
  "correo": "juan@email.com",
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### GET /verify
**Response (200):**
```json
{
  "id": "...",
  "usuario": "Juan",
  "correo": "juan@email.com"
}
```

---

## 2. PRODUCTOS

### Rutas
| Método | Endpoint | Protección | Descripción |
|--------|----------|------------|--------------|
| GET | `/productos` | ❌ | Listar todos los productos |
| GET | `/producto/:id` | ✅ | Obtener un producto |
| POST | `/producto` | ✅ | Crear producto |
| PUT | `/producto/:id` | ✅ | Actualizar producto |
| DELETE | `/producto/:id` | ✅ | Eliminar producto |

### Controlador
**Archivo:** `src/controllers/producto.controller.js`
- `getProductos` - Listar todos
- `getProducto` - Obtener uno
- `createProducto` - Crear
- `updateProducto` - Actualizar
- `deleteProducto` - Eliminar

### Model: Producto
```javascript
{
  _id: ObjectId,
  nombre: String,        // required
  stock: Number,         // required
  precio: Number,        // required
  imagen: String,        // URL de imagen
  categorias: [ObjectId], // ref: Categoria, required
  usuario: ObjectId,     // ref: Usuario (creador)
  createdAt: Date,
  updatedAt: Date
}
```

### Endpoints detalle

#### GET /productos
**Response (200):**
```json
[
  {
    "_id": "...",
    "nombre": "Producto 1",
    "stock": 10,
    "precio": 100,
    "imagen": "http://...",
    "categorias": [
      { "_id": "...", "nombre": "Categoría 1" }
    ],
    "usuario": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### GET /producto/:id
**Response (200):** Mismo formato que arriba
**Error (404):** `"Producto no encontrado"`

#### POST /producto
**Request:**
```json
{
  "nombre": "Nuevo Producto",
  "stock": 50,
  "precio": 199.99,
  "imagen": "http://...",
  "categorias": ["id_categoria1", "id_categoria2"]
}
```
**Validaciones:**
- Todos los campos requeridos
- `categorias` debe ser un array con al menos 1 categoría existente
**Response (201):** Producto creado

#### PUT /producto/:id
**Request:** Cualquier campo a actualizar
**Response (200):** Producto actualizado

#### DELETE /producto/:id
**Response (204):** Sin contenido (eliminado exitosamente)

---

## 3. CATEGORÍAS

### Rutas
| Método | Endpoint | Protección | Descripción |
|--------|----------|------------|--------------|
| GET | `/categorias` | ✅ | Listar todas las categorías |
| GET | `/categoria/:id` | ✅ | Obtener una categoría |
| POST | `/categoria` | ✅ | Crear categoría |
| PUT | `/categoria/:id` | ✅ | Actualizar categoría |
| DELETE | `/categoria/:id` | ✅ | Eliminar categoría |

### Controlador
**Archivo:** `src/controllers/categoria.controller.js`
- `getCategorias` - Listar todas
- `getCategoria` - Obtener una
- `createCategoria` - Crear
- `updateCategoria` - Actualizar
- `deleteCategoria` - Eliminar

### Model: Categoria
```javascript
{
  _id: ObjectId,
  nombre: String,        // required
  usuario: ObjectId,     // ref: Usuario (creador)
  createdAt: Date,
  updatedAt: Date
}
```

### Endpoints detalle

#### GET /categorias
**Response (200):**
```json
[
  {
    "_id": "...",
    "nombre": "Electrónica",
    "usuario": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### POST /categoria
**Request:**
```json
{
  "nombre": "Nueva Categoría"
}
```
**Response (201):** Categoría creada

---

## 4. CARRITO

### Rutas
| Método | Endpoint | Protección | Descripción |
|--------|----------|------------|--------------|
| GET | `/carritos` | ✅ | Listar carritos del usuario |
| GET | `/carrito/:id` | ✅ | Obtener un carrito |
| POST | `/carrito` | ✅ | Crear carrito |
| POST | `/carrito/agregar` | ✅ | Agregar producto al carrito |
| PUT | `/carrito/:id` | ✅ | Actualizar carrito |
| DELETE | `/carrito/:id` | ✅ | Eliminar carrito |

### Controlador
**Archivo:** `src/controllers/carrito.controller.js`
- `getCarritos` - Listar todos
- `getCarrito` - Obtener uno
- `createCarrito` - Crear
- `agregarProductoAlCarrito` - Agregar producto (maneja duplicados)
- `updateCarrito` - Actualizar
- `deleteCarrito` - Eliminar

### Model: Carrito
```javascript
{
  _id: ObjectId,
  productos: [
    {
      producto: ObjectId,  // ref: Producto
      cantidad: Number     // required, min: 1
    }
  ],
  usuario: ObjectId,       // ref: Usuario
  total: Number,          // default: 0
  createdAt: Date,
  updatedAt: Date
}
```

### Endpoints detalle

#### GET /carritos
**Response (200):**
```json
[
  {
    "_id": "...",
    "productos": [
      {
        "producto": {
          "_id": "...",
          "nombre": "Producto 1",
          "precio": 100,
          "imagen": "..."
        },
        "cantidad": 2
      }
    ],
    "total": 200,
    "usuario": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### GET /carrito/:id
**Response (200):** Mismo formato
**Error (404):** `"Carrito not found"`

#### POST /carrito
**Request:**
```json
{
  "productos": [
    { "producto": "id_producto1", "cantidad": 2 },
    { "producto": "id_producto2", "cantidad": 1 }
  ]
}
```
**Response (201):** Carrito creado

#### POST /carrito/agregar (MÁS USADO)
**Request:**
```json
{
  "productoId": "id_del_producto",
  "cantidad": 1
}
```
**Comportamiento:**
- Si el usuario no tiene carrito, lo crea automáticamente
- Si el producto ya está en el carrito, incrementa la cantidad
- Valida stock disponible
- Calcula el total automáticamente

**Response (200):**
```json
{
  "_id": "...",
  "productos": [
    {
      "producto": { "_id": "...", "nombre": "...", "precio": 100 },
      "cantidad": 3
    }
  ],
  "total": 300,
  "usuario": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Errores posibles:**
- 400: `"El ID del producto es requerido"`
- 404: `"Producto no encontrado"`
- 400: `"Stock insuficiente. Stock disponible: X"`
- 400: `"Stock insuficiente para cantidad total. Stock disponible: X, cantidad actual en carrito: Y"`

#### DELETE /carrito/:id
**Response (204):** Sin contenido

---

## 5. CÓDIGOS DE ESTADO HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 6. EJEMPLOS DE USO EN FRONTEND

### Iniciar sesión
```javascript
const response = await fetch('http://localhost:3000/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Importante para cookies
  body: JSON.stringify({ correo, contrasena })
});
```

### Obtener productos
```javascript
const response = await fetch('http://localhost:3000/api/productos');
const productos = await response.json();
```

### Agregar al carrito
```javascript
const response = await fetch('http://localhost:3000/api/carrito/agregar', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    // Si no usas cookies, incluye el token:
    // 'Authorization': 'Bearer ' + token
  },
  credentials: 'include',
  body: JSON.stringify({ productoId: '...', cantidad: 1 })
});
```

### Verificar autenticación
```javascript
const response = await fetch('http://localhost:3000/api/verify', {
  credentials: 'include'
});
```

---

## 7. CORS

El backend está configurado para permitir:
- `http://localhost:5173` (Vite por defecto)

Si tu frontend está en otro puerto, actualizar en `src/app.js`:
```javascript
app.use(cors({
  origin: "http://tu-puerto",
  credentials: true
}));
```
