const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let products = [
  { id: 1, title: 'Product A', details: 'Details for product A' },
  { id: 2, title: 'Product B', details: 'Details for product B' }
];

// GET - Retrieve all products
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// POST - Add a new product
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    title: req.body.title,
    details: req.body.details
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PATCH - Update an existing product (partially)
app.patch('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productToUpdate = products.find((p) => p.id === productId);

  if (!productToUpdate) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (req.body.title !== undefined) {
    productToUpdate.title = req.body.title;
  }
  if (req.body.details !== undefined) {
    productToUpdate.details = req.body.details;
  }

  res.status(200).json(productToUpdate);
});

// DELETE - Remove a product
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(index, 1);
  res.sendStatus(204);
});

// Start the server
app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
