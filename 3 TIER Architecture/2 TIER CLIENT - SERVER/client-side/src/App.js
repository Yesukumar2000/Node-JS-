import React, { useState } from 'react';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:4568/cars');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCars(data);
    }
     catch (error) {
      console.error('Failed to fetch cars:', error);
    }
  };

  const fetchFavoriteCars = async () => {
    try {
      const response = await fetch('http://localhost:4568/favorite-cars');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFavoriteCars(data);
    } catch (error) {
      console.error('Failed to fetch favorite cars:', error);
    }
  };

  return (
    <div className="App">
      <div className="section">
        <h2>All Cars</h2>
        <button className="button" onClick={fetchCars}>Fetch All Cars</button>
        <ul className="car-list">
          {cars.map(car => (
            <li key={car.id} className="car-item">{car.name}</li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Favorite Cars</h2>
        <button className="button favorite" onClick={fetchFavoriteCars}>Fetch Favorite Cars</button>
        <ul className="car-list">
          {favoriteCars.map(car => (
            <li key={car.id} className="car-item favorite">{car.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
