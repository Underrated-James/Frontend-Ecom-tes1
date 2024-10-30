// ProductCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card className="product-card mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="product-card-title">{product.title}</Card.Title>
        <Card.Text className="product-card-text">
          Price: ${product.price.toFixed(2)} <br />
          Quantity: {product.quantity} <br />
          Category: {product.category} <br />
          Description: {product.description}
        </Card.Text>
        <div className="button-group">
          <Button variant="primary" className="edit-btn" onClick={() => onEdit(product.id)}>Edit</Button>
          <Button variant="danger" className="delete-btn" onClick={() => onDelete(product.id)}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
