import { Alert } from 'react-bootstrap';

function SuccessAlert({ message }) {
  return <Alert variant="success">{message}</Alert>;
}

export default SuccessAlert;
