import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LoginUsers from './componet/LoginUsers.jsx';
import SingUpUser from "./componet/singUpUser.jsx";
import Navbar from './componet/navBar.jsx';
import ProductList from './componet/ProductList.jsx';
import OneProduct from './componet/OneProduct.jsx';
import axios from 'axios';
import AddProduct from './componet/addProduct.jsx';
// import Home from "./componet/home.jsx"
import './App.css';

function App() {
  const [product, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  
  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product/getAll");
      console.log("Fetched Data:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

 
  useEffect(() => {
    fetchProduct();
  }, []);

  
  const handleOneProduct = (product) => {
    setSelectedProduct(product); 
  };

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginUsers />} />
          <Route path="/register" element={<SingUpUser />} />
          
          
          {/* <Route path="/home" element={<ProductList products={product} handleOneProduct={handleOneProduct} />} /> */}
          
          
          <Route path="/product/:id" element={<OneProduct product={selectedProduct} />} />
          <Route path="/register" element={<SingUpUser />} /> 
          <Route path="/home" element={< Navbar />}  /> 
          <Route path="/addProduct" element={< AddProduct />}  /> 
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
