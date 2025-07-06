import { useState } from 'react';
import { Card, Button, Alert, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [form, setForm] = useState({
    title: '', price: '', description: '', category: ''
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://fakestoreapi.com/products', form)
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate('/products'), 1500);
      })
      .catch(() => alert('Failed to add product.'));
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Add New Product</h2>
      {success && <Alert variant="success">Product created successfully!</Alert>}
      <Card className="p-4 shadow-sm border-0">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" type="number" step="0.01" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control name="description" as="textarea" rows={3} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" onChange={handleChange} required />
          </Form.Group>

          <Button type="submit" variant="success">Add Product</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddProduct;
