import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import SingUpUser from "./componet/singUpUser.jsx";
import ProductList from './componet/ProductList.jsx';
import OneProduct from './componet/OneProduct.jsx';
import AddProduct from './componet/addProduct.jsx';
import Profile from './componet/Profile.jsx';
import CartFull from './componet/Fullcart.jsx';
import Favorites from './componet/favorite.jsx';

function Home() {
    const [product, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleOneProduct = (product) => {
        setSelectedProduct(product);
      };
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
    
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            
            <Route path="/" element={<ProductList  handleOneProduct={handleOneProduct} />} />
            <Route path="/product/:id" element={<OneProduct product={selectedProduct} />} />
            <Route path="/register" element={<SingUpUser />} />
            <Route path="/addProduct" element={< AddProduct />} />
            <Route path="/cart" element={< CartFull />} />
            <Route path="/favorites" element={< Favorites/>} />
            <Route path="/profile" element={< Profile />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}

export default Home
