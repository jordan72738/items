const express = require('express');
const app = express();
app.use(express.json());

let items = [
  { id: 1, name: 'Item One', description: 'This is the first item.' },
  { id: 2, name: 'Item Two', description: 'This is the second item.' }
];

// GET Request - Retrieves all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST Request - Adds a new item
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    description: req.body.description
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PATCH Request - Updates part of an item
app.patch('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  if (req.body.name !== undefined) {
    item.name = req.body.name;
  }
  if (req.body.description !== undefined) {
    item.description = req.body.description;
  }
  
  res.json(item);
});

// DELETE Request - Removes an item
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items.splice(index, 1);
  res.status(204).send(); // 204 means "No Content"
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
