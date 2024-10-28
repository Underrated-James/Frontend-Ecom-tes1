// PriceSort.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const PriceSort = ({ value, onChange }) => {
  return (
    <Form.Group>
      <Form.Label>Sort by Price</Form.Label>
      <Form.Control as="select" value={value} onChange={onChange}>
        <option value="">Select</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </Form.Control>
    </Form.Group>
  );
};

export default PriceSort;
