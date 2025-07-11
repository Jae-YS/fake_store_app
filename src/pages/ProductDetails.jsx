import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import axios from 'axios';

import LoadingSpinner from '../components/LoadingSpinner';
import SuccessAlert from '../components/alert/SuccessAlert';
import ConfirmModal from '../components/ConfirmModal';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setSuccess(true);
        setShowModal(false);
        setTimeout(() => navigate('/products'), 1500);
      })
      .catch(() => alert('Delete failed'));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <SuccessAlert message={error} />;

  return (
    <Container className="py-4">
      {success && <SuccessAlert message="Product deleted successfully!" />}

      <Card className="shadow border-0">
        <Card.Img variant="top" src={product.image} height="400" style={{ objectFit: 'contain' }} />
        <Card.Body>
          <Card.Title className="fs-4 fw-semibold">{product.title}</Card.Title>
          <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
          <Card.Text className="text-muted">{product.description}</Card.Text>
          <Card.Text className="fs-5 fw-bold">${product.price}</Card.Text>
          <div className="d-flex gap-2">
            <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
            <Button variant="outline-secondary" onClick={() => navigate(`/edit-product/${id}`)}>Edit</Button>
          </div>
        </Card.Body>
      </Card>

      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        body="Are you sure you want to delete this product?"
      />
    </Container>
  );
}

export default ProductDetails;
