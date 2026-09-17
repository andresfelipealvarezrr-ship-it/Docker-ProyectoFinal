const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// "Base de datos" en memoria
let productos = [
  { id: 1, nombre: 'Teclado mecánico', precio: 150000 },
  { id: 2, nombre: 'Mouse inalámbrico', precio: 60000 },
];
let nextId = 3;

// 1. Listar todos los productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// 2. Obtener un producto por id
app.get('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === Number(req.params.id));
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(producto);
});

// 3. Crear un producto
app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'nombre y precio son obligatorios' });
  }
  const nuevo = { id: nextId++, nombre, precio };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// 4. Actualizar un producto
app.put('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === Number(req.params.id));
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
  const { nombre, precio } = req.body;
  if (nombre !== undefined) producto.nombre = nombre;
  if (precio !== undefined) producto.precio = precio;
  res.json(producto);
});

// 5. Eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const index = productos.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  productos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API de productos escuchando en el puerto ${PORT}`);
});