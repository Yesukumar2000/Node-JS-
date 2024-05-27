const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const cars = [
    { id: 1, name: 'Toyota Camry' },
    { id: 2, name: 'Honda Civic' },
    { id: 3, name: 'Ford Mustang' },
    { id: 4, name: 'Tesla Model 3' },
    { id: 5, name: 'BMW M3' },
    { id: 6, name: 'Mercedes-Benz C-Class' },
    { id: 7, name: 'Audi A4' },
    { id: 8, name: 'Lexus ES' },
    { id: 9, name: 'Hyundai Sonata' },
    { id: 10, name: 'Kia Optima' }
];

const favoriteCars = [
    { id: 4, name: 'Tesla Model 3' },
    { id: 5, name: 'BMW M3' },
    { id: 7, name: 'Audi A4' }
];

app.get('/cars', (req, res) => {
  res.json(cars);
});

app.get('/favorite-cars', (req, res) => {
  res.json(favoriteCars);
});

const Port = 4568;
app.listen(4568, () => {
  console.log(`Server is running on Port ${Port}`);
});
