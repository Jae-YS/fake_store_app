import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card className="h-100 border-0 shadow-sm hover-shadow" style={{ transition: "all 0.3s ease-in-out" }}>
      <Card.Img
        variant="top"
        src={product.image}
        height="220"
        style={{ objectFit: "contain", padding: "1rem" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{product.title}</Card.Title>
        <Card.Text className="fw-semibold text-primary mb-2">${product.price}</Card.Text>
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
  );
}

export default ProductCard;
