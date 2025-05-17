const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const products = [
  { id: 1, name: 'Apfel', price: 1.0 },
  { id: 2, name: 'Banane', price: 1.2 },
  { id: 3, name: 'Schokolade', price: 2.5 }
];

app.get('/api/products', (req, res) => {
  let total = 0;
  products.forEach(p => total += p.price); // Breakpoint setzen
  res.json({ products, total });
});

app.listen(port, () => {
  console.log(`MiniShop Backend läuft auf http://localhost:${port}`);
});
