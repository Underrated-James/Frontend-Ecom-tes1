// CategoryFilter.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  return (
    <Form.Group>
      <Form.Label>Filter by Category</Form.Label>
      {categories.map((category, index) => (
        <Form.Check
          key={index}
          type="checkbox"
          label={category}
          checked={selectedCategories.includes(category)}
          onChange={(e) => onCategoryChange(category, e.target.checked)}
        />
      ))}
    </Form.Group>
  );
};

export default CategoryFilter;
