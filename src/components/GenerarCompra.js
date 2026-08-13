import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import api from '../api/api';

export default function GenerarYConfirmarCompra() {
  const [form, setForm] = useState({
    documento: '',
    celular: '',
    montoCompra: '',
  });

  const [response, setResponse] = useState(null);
  const [confirmationResponse, setConfirmationResponse] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generarCompra = async (e) => {
    e.preventDefault();
    setLoading(true);
    setConfirmationResponse(null);
    try {
      const res = await api.post('/generar-compra', form);
      const success = res.data.codigo === '00';
      setResponse({
        success,
        mensaje: res.data.mensaje,
        session_id: res.data.data?.session_id,
        token: res.data.data?.token,
      });
      setShowConfirmation(success);
    } catch (err) {
      setResponse({
        success: false,
        mensaje: err.response?.data?.mensaje ?? 'No se pudo generar la compra. Intentá nuevamente.',
      });
      setShowConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  const confirmarCompra = async () => {
    setConfirming(true);
    try {
      const res = await api.post('/confirmar-compra', {
        sessionId: response.session_id,
        token: response.token,
      });
      setConfirmationResponse({
        success: res.data.codigo === '00',
        mensaje: res.data.mensaje,
      });
    } catch (err) {
      setConfirmationResponse({
        success: false,
        mensaje: err.response?.data?.mensaje ?? 'No se pudo confirmar el pago. Intentá nuevamente.',
      });
    } finally {
      setConfirming(false);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '520px' }}>
      <Card.Body>
        <Card.Title as="h2" className="text-center mb-3 h4">Generar y Confirmar Compra</Card.Title>
        <Form onSubmit={generarCompra}>
          <Form.Group className="mb-3" controlId="compra-documento">
            <Form.Label>Documento</Form.Label>
            <Form.Control
              name="documento"
              value={form.documento}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="compra-celular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              name="celular"
              value={form.celular}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="compra-monto">
            <Form.Label>Monto de Compra</Form.Label>
            <Form.Control
              name="montoCompra"
              type="number"
              value={form.montoCompra}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Generando...' : 'Generar Compra'}
          </Button>
        </Form>

        {response && (
          <Alert variant={response.success ? 'success' : 'danger'} className="mt-3 mb-0">
            <p className="mb-0">{response.mensaje}</p>
            {response.session_id && (
              <>
                <p className="mb-1 mt-2">
                  <strong>ID Sesión:</strong> {response.session_id}
                </p>
                <p className="mb-2">
                  <strong>Token:</strong> {response.token}
                </p>
                {showConfirmation && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={confirmarCompra}
                    disabled={confirming}
                  >
                    {confirming ? 'Confirmando...' : 'Confirmar Compra'}
                  </Button>
                )}
              </>
            )}
          </Alert>
        )}

        {confirmationResponse && (
          <Alert
            variant={confirmationResponse.success ? 'info' : 'danger'}
            className="mt-3 mb-0"
          >
            {confirmationResponse.mensaje}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}
