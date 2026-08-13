import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import api from '../api/api';

export default function ConsultarSaldo() {
  const [form, setForm] = useState({
    documento: '',
    celular: '',
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
      const res = await api.post('/consultar-saldo', form);
      setResponse({
        success: res.data.codigo === '00',
        mensaje: res.data.mensaje,
        saldo: res.data.data?.saldo,
      });
    } catch (err) {
      setResponse({
        success: false,
        mensaje: err.response?.data?.mensaje ?? 'No se pudo consultar el saldo. Intentá nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '480px' }}>
      <Card.Body>
        <Card.Title as="h2" className="text-center mb-3 h4">Consultar Saldo</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="saldo-documento">
            <Form.Label>Documento</Form.Label>
            <Form.Control
              name="documento"
              value={form.documento}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="saldo-celular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              name="celular"
              value={form.celular}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Consultando...' : 'Consultar'}
          </Button>
        </Form>

        {response && (
          <Alert variant={response.success ? 'info' : 'danger'} className="mt-3 mb-0">
            <p className="mb-0">{response.mensaje}</p>
            {response.saldo && (
              <p className="mb-0 mt-1">
                <strong>Saldo:</strong> {response.saldo}
              </p>
            )}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}
