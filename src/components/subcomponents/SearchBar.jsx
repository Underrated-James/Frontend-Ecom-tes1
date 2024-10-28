// SearchBar.jsx
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>
        <FontAwesomeIcon icon={faSearch} />
      </InputGroup.Text>
      <Form.Control
        placeholder="Search products"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </InputGroup>
  );
};

export default SearchBar;
