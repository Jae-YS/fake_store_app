import { Container } from 'react-bootstrap';

function NotFound() {
  return (
    <Container className="text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="lead text-muted">Page not found</p>
    </Container>
  );
}

export default NotFound;
