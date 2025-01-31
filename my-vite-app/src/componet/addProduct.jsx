import React, { useState ,useEffect} from "react";
import axios from "axios";
import { FilePlus } from "lucide-react";
<<<<<<< HEAD
// import { jwtDecode } from "jwt-decode";
=======
>>>>>>> 0b9ac64c06da9b7e49ac65cb4cc1811de7adccbf
import { useNavigate } from 'react-router-dom';
import "../AddProduct.css";

const AddProduct = ({ className = "" ,fetch}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
 
  });
  

  



  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pxih5cle");
      formData.append("cloud_name", "dsbt68v5je");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dsbt68v5j/image/upload",
          formData
        );

        if (response.data.secure_url) {
          setProduct({ ...product, image: response.data.secure_url });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/product/add", product,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      if (response.status === 200) {
        alert("Product added successfully!");
      } else {
        alert("Error adding product");
      }
      fetch();
      navigate('/home');
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`add-product-container ${className}`}>
      <h2 className="text-center mb-4">
        <FilePlus size={24} className="me-2" />
        Add a New Product
      </h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input 
            type="text" 
            name="name"
            value={product.name} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price ($)</label>
          <input 
            type="number" 
            step="0.01" 
            name="price"
            value={product.price} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            name="description"
            value={product.description} 
            onChange={handleChange} 
            className="form-control" 
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input 
            type="file" 
            name="image" 
            onChange={handleImageUpload} 
            className="form-control" 
            accept="image/*" 
            required 
          />
          {product.image && <img src={product.image} alt="Product Preview" className="mt-3 img-fluid" />}
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock Quantity</label>
          <input 
            type="number" 
            name="stock"
            value={product.stock} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
