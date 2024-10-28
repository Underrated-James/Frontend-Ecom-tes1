// AddProductButton.jsx
import React from 'react';
import { Button } from 'react-bootstrap';


const AddProductButton = ({ onClick }) => {
  return (
    <Button variant="success" onClick={onClick}>
      Add Product
    </Button>
  );
};

export default AddProductButton;
