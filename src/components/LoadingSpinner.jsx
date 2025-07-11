import { Spinner } from 'react-bootstrap';

function LoadingSpinner() {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" />
    </div>
  );
}

export default LoadingSpinner;
