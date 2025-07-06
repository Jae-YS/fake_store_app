import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spinner, Alert, Modal, Container, Form } from 'react-bootstrap';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => navigate('/products'))
      .catch(() => alert('Delete failed'));
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

  return (
    <Container className="py-4">
      <Card className="shadow border-0">
        <Card.Img variant="top" src={product.image} height="400" style={{ objectFit: 'contain' }} />
        <Card.Body>
          <Card.Title className="fs-4 fw-semibold">{product.title}</Card.Title>
          <Card.Text><span className="fw-bold">Category:</span> {product.category}</Card.Text>
          <Card.Text className="text-muted">{product.description}</Card.Text>
          <Card.Text className="fs-5 fw-bold">${product.price}</Card.Text>
          <div className="d-flex gap-2">
            <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
            <Button variant="outline-secondary" onClick={() => navigate(`/edit-product/${id}`)}>Edit</Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetails;