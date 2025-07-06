import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="text-center py-5">
      <h1 className="display-5 fw-bold mb-3">Welcome to FakeStore</h1>
      <p className="lead text-muted mb-4">
        Discover great fake products. Add, edit, or view details in one modern app experience.
      </p>
      <Button
        as={Link}
        to="/products"
        variant="primary"
        size="lg"
        className="px-4 py-2 shadow"
      >
        Browse Products
      </Button>
    </Container>
  );
}

export default Home;
