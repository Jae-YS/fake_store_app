import { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ProductForm from '../components/ProductForm';
import SuccessAlert from '../components/alert/SuccessAlert';

function AddProduct() {
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '' });
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
  {success && <SuccessAlert message="Product created successfully!" />}
      <Card className="p-4 shadow-sm border-0">
        <ProductForm form={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Add Product" />
      </Card>
    </Container>
  );
}

export default AddProduct;