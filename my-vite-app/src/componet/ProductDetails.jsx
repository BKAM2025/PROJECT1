import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();  // Getting the product ID from URL
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  
  // Fetch product details based on the product ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(response.data);  // Set the fetched product data
      } catch (error) {
        // Handle error if the product is not found or the API fails
        if (error.response) {
          setError(error.response.data.message); // Display error message from the backend
        } else {
          setError("An unexpected error occurred");
        }
      }
    };

    fetchProductDetails();  // Call the function to fetch product details
  }, [id]);  // Re-run the effect when the product ID changes
  
  if (error) {
    return <Alert variant="danger">{error}</Alert>;  // Show error if there's any
  }

  if (!product) {
    return <p>Loading...</p>;  // Show loading message while product data is being fetched
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center">{product.name}</h2>
          <img src={product.image} alt={product.name} className="img-fluid" />
          <p className="mt-3">{product.description}</p>

          <div className="d-flex justify-content-between">
            <h4>${product.currentPrice}</h4>
            <p className="text-muted">
              <strike>${product.originalPrice}</strike>
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => navigate(`/cart`)}  // Navigate to cart page when button is clicked
            className="w-100"
          >
            Add to Cart
          </Button>

          <div className="mt-4">
            <Button
              variant="outline-secondary"
              onClick={() => navigate(`/buy/${product.id}`)}  // Navigate to the checkout page
            >
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
