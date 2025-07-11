import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import axios from 'axios';

import ProductForm from '../components/ProductForm';
import LoadingSpinner from '../components/LoadingSpinner';
import SuccessAlert from '../components/alert/SuccessAlert';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '' });
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
        setTimeout(() => navigate('/products'), 1500);
      })
      .catch(() => alert('Failed to update product.'));
  };

  if (loading) return <LoadingSpinner />;
  return (
    <Container className="py-4">
      <h2 className="mb-4">Edit Product</h2>
    {success && <SuccessAlert message="Product updated successfully!" />}
      <Card className="p-4 shadow-sm border-0">
        <ProductForm form={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Update Product" />
      </Card>
    </Container>
  );
} 

export default EditProduct; 