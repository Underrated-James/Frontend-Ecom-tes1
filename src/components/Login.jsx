import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { useNavigate } from 'react-router-dom';
import './Login.css';

const logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkS0zq7Z8UG92XGDpju45hHfefCuhI-31-Jg&s'; 

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here later
    navigate('/dashboard'); 
  };

  return (
    <Container fluid className="login-container">
      <Row className="align-items-center justify-content-center">
        {/* Left Section - Logo and Intro */}
        <Col md={6} className="left-section">
          <div className="branding">
            <img src={logoUrl} alt="MyStore Logo" className="logo" />
            <h1 className="store-title">Welcome to MyStore</h1>
            <p className="tagline">The leading online shopping platform in Cabuyao Laguna</p>
          </div>
        </Col>

        {/* Right Section - Login Form */}
        <Col md={4} className="right-section">
          <Card className="login-card">
            <Card.Body>
              <h2 className="login-title">Sign In</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>
                    <FontAwesomeIcon icon={faUser} className="icon" /> Username
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter username" 
                    name="username" 
                    value={credentials.username} 
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
                    value={credentials.password} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="login-btn mt-4 w-100">
                  Log In
                </Button>
              </Form>
              
              {/* Registration Link */}
              <div className="mt-3 text-center">
                <p>Don't have an account? <Button variant="link" onClick={() => navigate('/register')}>Register here</Button></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;