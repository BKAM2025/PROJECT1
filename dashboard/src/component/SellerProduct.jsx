import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import Footer from './Footer';
function SellerProducts() {
    const { sellerId } = useParams();
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/api/admin/products/${sellerId}`);
            setProducts(result.data);
        } catch (err) {
            console.log("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [sellerId]);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/product/${productId}`);
            console.log("deleted succefully")
            setProducts(products.filter(product => product.id !== productId));
            fetchProducts()
        } catch (err) {
            console.log("Error deleting product:", err);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <img src={product.image} alt={product.name} className="card-img-top" />
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Price: ${product.price}</p>
                                    <p className="card-text">Description: {product.description}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => { handleDelete(product.id) }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SellerProducts;