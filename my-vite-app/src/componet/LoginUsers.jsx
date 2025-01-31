import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

function LoginPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // This should be correctly scoped
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", { mail, password });
      console.log("Response", response);
      navigate("/home"); 
    } catch (error) {
      // This checks if there's an error response object
      if (error.response) {
        setError(error.response.data.message); // Set the error message from the API
      } else {
        setError("An unexpected error occurred"); // Generic fallback error message
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <h2 className="text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}  {/* Display error message */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Mail</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => navigate("/register")}>Create a new user</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
