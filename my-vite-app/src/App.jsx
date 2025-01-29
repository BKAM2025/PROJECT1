import React, { useEffect ,useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Assuming you have a store configured
import LoginUsers from './componet/LoginUsers.jsx';
import SingUpUser from "./componet/singUpUser.jsx"
import Navbar from './componet/navBar.jsx';
import ProductList from './componet/ProductList.jsx'
import ProductDetails from './componet/ProductDetails.jsx';
import axios from 'axios';
import './App.css';





function App() {
  
  const [product,setProducts]=useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product/get");
      console.log("Fetched Data:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(()=>{
    fetchProduct()
  },[])


  const handleOneProduct = (product) => {
  
    setSelectedProduct(product);
    console.log("Selected Product:", product);
  };



  return (<div>
    <Navbar/>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginUsers />} />
          {/* {/* <Route path="/signup-user" element={<SingUpUser />} /> */}
          <Route path="/register" element={<SingUpUser />} /> 
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Provider>
    <ProductList ProductList={product} handleOneProduct={handleOneProduct}/>
    </div>
  );
  
}



export default App;