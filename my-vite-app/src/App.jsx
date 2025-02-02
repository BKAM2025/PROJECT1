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
import CartFull from './componet/cart.jsx';
import Favorites from './componet/favorite.jsx';
import Footer from './componet/Footer.jsx';
import Payment from './componet/Payment.jsx';
// import Home from "./componet/home.jsx"
import Categories from './componet/Categories.jsx';
import CategoryProducts from './componet/CategoryProducts.jsx';
import ProductDetails from './componet/ProductDetails.jsx';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [product, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product/getAll");
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
            <Route path="/home" element={<ProductList  handleOneProduct={handleOneProduct} />} />
            <Route path="/product/:id" element={<OneProduct product={selectedProduct} />} />
            <Route path="/productDetails/:id" element={<ProductDetails product={selectedProduct} />} />
            <Route path="/addProduct" element={< AddProduct fetch={fetchProduct} />} />
            <Route path="/cart" element={< CartFull />} />
            <Route path="/favorites" element={< Favorites/>} />
            <Route path="/profile" element={< Profile />} />
            <Route path="/payment" element={< Payment />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId" element={<CategoryProducts />} /> 
          </Routes>
        </Router>
      </Provider>
      <ToastContainer position="bottom-right" />
      <Footer />
    </div>
  );
}

export default App;
