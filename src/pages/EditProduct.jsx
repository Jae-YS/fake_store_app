import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spinner, Alert, Container, Form } from 'react-bootstrap';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', price: '', description: '', category: ''
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setForm(res.data))
      .catch(() => alert('Failed to fetch product data.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`https://fakestoreapi.com/products/${id}`, form)
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate('/products'), 1500); // Wait 1.5 seconds before redirect
      })
      .catch(() => alert('Failed to update product.'));
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Edit Product</h2>
      {success && <Alert variant="success">Product updated successfully!</Alert>}
      <Card className="p-4 shadow-sm border-0">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" value={form.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control name="description" as="textarea" rows={3} value={form.description} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" value={form.category} onChange={handleChange} required />
          </Form.Group>

          <Button type="submit" variant="primary">Update Product</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default EditProduct;
