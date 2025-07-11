import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components//alert/ErrorAlert";
import ProductCard from "../components/ProductCard";

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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <Container>
      <h2 className="mb-4">Product Listing</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.15) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </Container>
  );
}

export default ProductList;
