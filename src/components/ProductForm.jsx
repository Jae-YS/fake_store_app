import { Form, Button } from 'react-bootstrap';

function ProductForm({ form, onChange, onSubmit, submitLabel }) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" value={form.title} onChange={onChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control name="price" type="number" step="0.01" value={form.price} onChange={onChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" as="textarea" rows={3} value={form.description} onChange={onChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control name="category" value={form.category} onChange={onChange} required />
      </Form.Group>

      <Button type="submit" variant="success">{submitLabel}</Button>
    </Form>
  );
}

export default ProductForm;
