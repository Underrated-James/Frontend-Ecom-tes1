import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Ensure this file exists

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before submitting
    setSuccessMessage(''); // Reset success message

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed! Please try again.');
      }

      const data = await response.json();
      console.log(data); // You may want to handle the response data accordingly
      setSuccessMessage("Registration successful! You can now log in.");
      setTimeout(() => {
        navigate('/'); // Redirect to the login page after a short delay
      }, 2000);
    } catch (error) {
      setError(error.message);
      console.error('Error during registration:', error);
    }
  };

  return (
    <Container fluid className="register-container">
      <Row className="align-items-center justify-content-center">
        <Col md={6} className="left-section">
          <div className="branding">
            <h1 className="store-title">Register</h1>
            <p className="tagline">Create your account to start shopping!</p>
          </div>
        </Col>

        <Col md={4} className="right-section">
          <Card className="register-card">
            <Card.Body>
              <h2 className="register-title">Sign Up</h2>
              {error && <p className="text-danger">{error}</p>}
              {successMessage && <p className="text-success">{successMessage}</p>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>
                    <FontAwesomeIcon icon={faEnvelope} className="icon" /> Email
                  </Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faLock} className="icon" /> Password
                  </Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mt-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faLock} className="icon" /> Re-enter Password
                  </Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Re-enter password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="register-btn mt-4 w-100">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
