// ProductCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card className="product-card mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          Price: ${product.price.toFixed(2)} <br />
          Quantity: {product.quantity} <br />
          Category: {product.category} <br />
          Description: {product.description}
        </Card.Text>
        <Button variant="primary" onClick={() => onEdit(product.id)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(product.id)} className="ml-2">Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
