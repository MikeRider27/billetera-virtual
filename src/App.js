import React, { useState } from 'react';
import RegistroCliente from './components/RegistroCliente';

export default function App() {
  const [view, setView] = useState('registro');

  const renderComponent = () => {
    switch (view) {
      case 'registro': return <RegistroCliente />;
      default: return <RegistroCliente />;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Billetera Virtual</h1>
      <nav style={styles.menu}>
        <button onClick={() => setView('registro')} style={styles.button}>Registro</button>
      </nav>
      <div style={{ marginTop: '2rem' }}>
        {renderComponent()}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  menu: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  button: {
    padding: '0.6rem 1.2rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
  }
};
