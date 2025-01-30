import React, { useState } from "react";
import axios from "axios";  // Importing Axios
import { FilePlus } from "lucide-react";  // Lucide icon for add product
import "../AddProduct.css"
const AddProduct = ({ className = "", user=1 }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",  // You can still store the image URL if needed
    stock: "",
  });
  const [loading, setLoading] = useState(false);  // To handle loading state

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle Image Upload to your backend (instead of Cloudinary)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // Send the image file to your backend API instead of Cloudinary
      try {
        const response = await axios.post("http://localhost:5000/api/product/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",  // Important for file upload
          },
        });

        if (response.data.imageUrl) {
          setProduct({ ...product, image: response.data.imageUrl });  // Assuming your backend sends the image URL back
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert("You must be logged in to add a product.");
      setLoading(false);
      return;
    }

    try {
      // Include `idUser` in the request body
      const response = await axios.post("http://localhost:5000/api/product/add", {
        ...product,categoryId:1,
        userId: user.id,  // Add `idUser` to the request body
      },);

      if (response.status === 200) {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully!");
      } else {
        console.error("Error adding product:", response.statusText);
        alert("Error adding product");
      }
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
        
        {/* Name Input */}
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

        {/* Price Input */}
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

        {/* Description Input */}
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

        {/* Image Input (Uploads directly to your backend) */}
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

        {/* Stock Input */}
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

        {/* Submit Button */}
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
