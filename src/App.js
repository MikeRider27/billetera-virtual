import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Login from './components/Login';
import RegistroCliente from './components/RegistroCliente';
import RecargarBilletera from './components/RecargarBilletera';
import GenerarCompra from './components/GenerarCompra';
import ConsultarSaldo from './components/ConsultarSaldo';
import { getSession, clearSession } from './session';

const AUTH_VIEWS = [
  { key: 'recarga', label: 'Recargar', component: RecargarBilletera },
  { key: 'generar', label: 'Generar Compra', component: GenerarCompra },
  { key: 'saldo', label: 'Consultar Saldo', component: ConsultarSaldo },
];

export default function App() {
  const [session, setSession] = useState(() => getSession());
  const [guestView, setGuestView] = useState('login');
  const [view, setView] = useState('recarga');

  const handleLogin = (data) => {
    setSession(data);
    setView('recarga');
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setGuestView('login');
  };

  if (!session) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand>Billetera Virtual</Navbar.Brand>
          </Container>
        </Navbar>
        <Container className="py-4">
          {guestView === 'login' ? (
            <Login onLogin={handleLogin} onIrARegistro={() => setGuestView('registro')} />
          ) : (
            <RegistroCliente onIrALogin={() => setGuestView('login')} />
          )}
        </Container>
      </div>
    );
  }

  const ActiveComponent = AUTH_VIEWS.find((v) => v.key === view)?.component ?? RecargarBilletera;

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar bg="primary" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand>Billetera Virtual</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav
              variant="pills"
              activeKey={view}
              onSelect={(key) => key && setView(key)}
              className="me-auto"
            >
              {AUTH_VIEWS.map(({ key, label }) => (
                <Nav.Item key={key}>
                  <Nav.Link eventKey={key}>{label}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <Navbar.Text className="text-white me-3">Hola, {session.nombre}</Navbar.Text>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <ActiveComponent />
      </Container>
    </div>
  );
}
