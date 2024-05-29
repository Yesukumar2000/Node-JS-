import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  const getDataFromServer = async () => {
    const reqOptions = {
      method: "GET",
    };
    const jsonData = await fetch("http://localhost:4567/products", reqOptions);
    const data = await jsonData.json();
    setProducts(data);
    console.log(data);
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  return (
    <div className="App">
      <div className="product-container">
        <h2>All products</h2>
        <button className="button" onClick={() => getDataFromServer()}>
          Fetch All products
        </button>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">${product.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
