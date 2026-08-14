import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import api from '../api/api';
import { saveSession } from '../session';

export default function Login({ onLogin, onIrARegistro }) {
  const [form, setForm] = useState({ documento: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/login', form);
      if (res.data.codigo === '00') {
        saveSession(res.data.data);
        onLogin(res.data.data);
      } else {
        setError(res.data.mensaje);
      }
    } catch (err) {
      setError(err.response?.data?.mensaje ?? 'No se pudo iniciar sesión. Intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '420px' }}>
      <Card.Body>
        <Card.Title as="h2" className="text-center mb-3 h4">
          Iniciar sesión
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="login-documento">
            <Form.Label>Documento</Form.Label>
            <Form.Control
              name="documento"
              value={form.documento}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="login-password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-3 mb-0">
            {error}
          </Alert>
        )}

        <div className="text-center mt-3">
          <Button variant="link" onClick={onIrARegistro}>
            ¿No tenés cuenta? Registrate
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
