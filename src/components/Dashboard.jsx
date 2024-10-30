import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Container, Row, Col } from 'react-bootstrap';
import AddProductButton from './subcomponents/AddProductButton';
import SearchBar from './subcomponents/SearchBar';
import CategoryFilter from './subcomponents/CategoryFilter';
import PriceSort from './subcomponents/PriceSort';
import ProductCard from './subcomponents/ProductCard';
import './Dashboard.css';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
  });
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/product');
    const data = await response.json();
    setProducts(data);
  };

  const fetchSearchResults = async (query) => {
    const response = await fetch(`http://127.0.0.1:8000/api/products/search?q=${query}`);
    const data = await response.json();
    setProducts(data);
  };

  const fetchSortedProducts = async (order) => {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${order}`);
    const data = await response.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/products/categories');
    const data = await response.json();
    return data;
  };

  const fetchCategoryProducts = async (category) => {
    const response = await fetch(`http://127.0.0.1:8000/api/products/category/${category}`);
    const data = await response.json();
    setProducts(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.title,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        category: formData.category,
        description: formData.description,
      }),
    });
    await response.json(); // Assuming the API responds with the added product
    await fetchProducts(); // Refresh the products
    setShowModal(false);
    resetForm();
  };

  const handleEditProduct = (index) => {
    setCurrentProductIndex(index);
    setFormData(products[index]);
    setEditModal(true);
  };

  const handleUpdateProduct = async () => {
    const updatedProductId = products[currentProductIndex].id; // Assuming each product has an 'id'
    await fetch(`http://127.0.0.1:8000/api/product/${updatedProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    await fetchProducts(); // Refresh the products
    setEditModal(false);
    alert("Product Updated Successfully!");
  };

  const handleDeleteProduct = (index) => {
    setProductToDelete(index);
    setConfirmDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const productId = products[productToDelete].id; // Assuming each product has an 'id'
    await fetch(`http://127.0.0.1:8000/api/product/${productId}`, {
      method: 'DELETE',
    });
    await fetchProducts(); // Refresh the products
    setConfirmDeleteModal(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      quantity: '',
      category: '',
      description: '',
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (priceFilter === 'low-to-high') return a.price - b.price;
    if (priceFilter === 'high-to-low') return b.price - a.price;
    return 0;
  });

  const allCategories = [...new Set(products.map(p => p.category))];

  const toggleCategory = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories(prev => [...prev, category]);
      fetchCategoryProducts(category); // Fetch products for selected category
    } else {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
      fetchProducts(); // Fetch all products if category is deselected
    }
  };

  return (
    <Container>
      <AddProductButton onClick={() => setShowModal(true)} />
      <SearchBar searchTerm={searchTerm} onSearchChange={(e) => {
        setSearchTerm(e.target.value);
        fetchSearchResults(e.target.value); // Fetch search results
      }} />
      <CategoryFilter categories={allCategories} selectedCategories={selectedCategories} onCategoryChange={toggleCategory} />
      <PriceSort value={priceFilter} onChange={(e) => {
        setPriceFilter(e.target.value);
        fetchSortedProducts(e.target.value === 'low-to-high' ? 'ascending' : 'decending'); // Fetch sorted products
      }} />

      <Row>
        {sortedProducts.map((product, index) => (
          <Col md={4} key={index} className="d-flex justify-content-center">
            <ProductCard
              product={product}
              onEdit={() => handleEditProduct(index)}
              onDelete={() => handleDeleteProduct(index)}
            />
          </Col>
        ))}
      </Row>

      {/* Add Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateProduct}>Update Product</Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={confirmDeleteModal} onHide={() => setConfirmDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
