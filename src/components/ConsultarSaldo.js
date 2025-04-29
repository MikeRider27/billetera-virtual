import React, { useState } from 'react';
import api from '../api/api';

export default function ConsultarSaldo() {
  const [form, setForm] = useState({
    documento: '',
    celular: '',
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/consultar-saldo', form);
      setResponse({
        success: res.data.codigo === '00',
        mensaje: res.data.mensaje,
        saldo: res.data.data?.saldo,
      });
    } catch {
      setResponse({ success: false, mensaje: 'Error al consultar el saldo' });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Consultar Saldo</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="documento"
          placeholder="Documento"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="celular"
          placeholder="Celular"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Consultar</button>
      </form>

      {response && (
        <div
          style={{
            ...styles.responseBox,
            backgroundColor: response.success ? '#d1ecf1' : '#f8d7da',
            color: response.success ? '#0c5460' : '#721c24',
            borderColor: response.success ? '#bee5eb' : '#f5c6cb',
          }}
        >
          <p style={styles.pre}>{response.mensaje}</p>
          {response.saldo && <p><strong>Saldo:</strong> {response.saldo}</p>}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
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
