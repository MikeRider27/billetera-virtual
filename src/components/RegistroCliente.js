import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import api from '../api/api';

export default function RegistroCliente({ onIrALogin }) {
  const [form, setForm] = useState({
    documento: '',
    nombre: '',
    email: '',
    celular: '',
    password: '',
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
      const res = await api.post('/registro-cliente', form);
      const success = res.data.codigo === '00';
      setResponse({ success, mensaje: res.data.mensaje });
      if (success) {
        setForm({ documento: '', nombre: '', email: '', celular: '', password: '' });
      }
    } catch (err) {
      setResponse({
        success: false,
        mensaje: err.response?.data?.mensaje ?? 'No se pudo completar el registro. Intentá nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '480px' }}>
      <Card.Body>
        <Card.Title as="h2" className="text-center mb-3 h4">Registro de Cliente</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="registro-documento">
            <Form.Label>Documento</Form.Label>
            <Form.Control
              name="documento"
              value={form.documento}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registro-nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registro-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registro-celular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              name="celular"
              value={form.celular}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registro-password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="password"
              type="password"
              minLength={6}
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Enviando...' : 'Registrar'}
          </Button>
        </Form>

        {response && (
          <Alert variant={response.success ? 'success' : 'danger'} className="mt-3 mb-0">
            {response.mensaje}
          </Alert>
        )}

        <div className="text-center mt-3">
          <Button variant="link" onClick={onIrALogin}>
            {response?.success ? 'Ir a iniciar sesión' : '¿Ya tenés cuenta? Iniciá sesión'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
