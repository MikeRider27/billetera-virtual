import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import api from '../api/api';

export default function RecargarBilletera() {
  const [form, setForm] = useState({
    documento: '',
    celular: '',
    monto: '',
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/recargar-billetera', form);
      const success = res.data.codigo === '00';
      setResponse({ success, mensaje: res.data.mensaje });
      if (success) {
        setForm({ documento: '', celular: '', monto: '' });
      }
    } catch (err) {
      setResponse({
        success: false,
        mensaje: err.response?.data?.mensaje ?? 'No se pudo completar la recarga. Intentá nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Ocultar mensaje después de 3 segundos
  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        setResponse(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [response]);

  return (
    <Card className="mx-auto" style={{ maxWidth: '480px' }}>
      <Card.Body>
        <Card.Title as="h2" className="text-center mb-3 h4">Recargar Billetera</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="recarga-documento">
            <Form.Label>Documento</Form.Label>
            <Form.Control
              name="documento"
              value={form.documento}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="recarga-celular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              name="celular"
              value={form.celular}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="recarga-monto">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              name="monto"
              type="number"
              value={form.monto}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Enviando...' : 'Recargar'}
          </Button>
        </Form>

        {response && (
          <Alert variant={response.success ? 'success' : 'danger'} className="mt-3 mb-0">
            {response.mensaje}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}
