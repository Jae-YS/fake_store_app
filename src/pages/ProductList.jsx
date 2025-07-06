import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

return (
  <>
    <Container>
      <h2 className="mb-4">Product Listing</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card
              className="h-100 border-0 shadow-sm transition transform hover-shadow"
              style={{ transition: "all 0.3s ease-in-out" }}
            >
              <Card.Img
                variant="top"
                src={product.image}
                height="220"
                style={{ objectFit: "contain", padding: "1rem" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6">{product.title}</Card.Title>
                <Card.Text className="fw-semibold text-primary mb-2">
                  ${product.price}
                </Card.Text>
                <Button
                  as={Link}
                  to={`/products/${product.id}`}
                  variant="outline-primary"
                  className="mt-auto"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <style>{`
      .hover-shadow:hover {
        box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.15) !important;
        transform: translateY(-2px);
      }
    `}</style>
  </>
);
}

export default ProductList;
