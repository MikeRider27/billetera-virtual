import React, { useState } from 'react';
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generarCompra = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/generar-compra', form);
      setResponse({
        success: true,
        mensaje: res.data.mensaje,
        session_id: res.data.data?.session_id,
        token: res.data.data?.token,
      });
      setShowConfirmation(true);
    } catch (err) {
      setResponse({ success: false, mensaje: 'Error al generar la compra' });
      setShowConfirmation(false);
    }
  };

  const confirmarCompra = async () => {
    try {
      const res = await api.post('/confirmar-compra', {
        sessionId: response.session_id,
        token: response.token,
      });
      setConfirmationResponse({
        success: res.data.codigo === '00',
        mensaje: res.data.mensaje,
      });
    } catch {
      setConfirmationResponse({
        success: false,
        mensaje: 'Error al confirmar el pago',
      });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Generar y Confirmar Compra</h2>
      <form onSubmit={generarCompra} style={styles.form}>
        <input
          name="documento"
          placeholder="Documento"
          value={form.documento}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="celular"
          placeholder="Celular"
          value={form.celular}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="montoCompra"
          placeholder="Monto de Compra"
          type="number"
          value={form.montoCompra}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Generar Compra</button>
      </form>

      {response && (
        <div
          style={{
            ...styles.responseBox,
            backgroundColor: response.success ? '#d4edda' : '#f8d7da',
            color: response.success ? '#155724' : '#721c24',
            borderColor: response.success ? '#c3e6cb' : '#f5c6cb',
          }}
        >
          <p style={styles.pre}>{response.mensaje}</p>
          {response.session_id && (
            <>
              <p><strong>ID Sesión:</strong> {response.session_id}</p>
              <p><strong>Token:</strong> {response.token}</p>
              {showConfirmation && (
                <button onClick={confirmarCompra} style={styles.confirmButton}>
                  Confirmar Compra
                </button>
              )}
            </>
          )}
        </div>
      )}

      {confirmationResponse && (
        <div
          style={{
            ...styles.responseBox,
            backgroundColor: confirmationResponse.success ? '#d1ecf1' : '#f8d7da',
            color: confirmationResponse.success ? '#0c5460' : '#721c24',
            borderColor: confirmationResponse.success ? '#bee5eb' : '#f5c6cb',
          }}
        >
          <p style={styles.pre}>{confirmationResponse.mensaje}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  confirmButton: {
    marginTop: '1rem',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  responseBox: {
    marginTop: '1.5rem',
    padding: '1rem',
    border: '1px solid',
    borderRadius: '5px',
  },
  pre: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};
