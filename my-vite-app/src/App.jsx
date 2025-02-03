import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LoginUsers from './componet/LoginUsers.jsx';
import SingUpUser from "./componet/singUpUser.jsx";
import ProductList from './componet/ProductList.jsx';
import OneProduct from './componet/OneProduct.jsx';
import axios from 'axios';
import AddProduct from './componet/addProduct.jsx';
import Profile from './componet/Profile.jsx';
import CartFull from './componet/Fullcart.jsx';
import Favorites from './componet/favorite.jsx';
import Footer from './componet/Footer.jsx';
import AboutUs from './componet/about.jsx';
// import Home from "./componet/home.jsx"
import ProductDetails from './componet/ProductDetails.jsx';
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
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginUsers />} />
            <Route path="/register" element={<SingUpUser />} />
            <Route path="/home" element={<ProductList handleOneProduct={handleOneProduct} />} />
            <Route path="/product/:id" element={<OneProduct product={selectedProduct} />} />
            <Route path="/productDetails/:id" element={<ProductDetails product={selectedProduct} />} />
            <Route path="/addProduct" element={< AddProduct fetch={fetchProduct} />} />
            <Route path="/cart" element={< CartFull />} />
            <Route path="/favorites" element={< Favorites />} />
            <Route path="/profile" element={< Profile />} />
            <Route path="/about" element={< AboutUs />} />
          </Routes>
        </Router>
      </Provider>
      <Footer />
    </div>
  );
}

export default App;
