import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import RegistroCliente from './components/RegistroCliente';
import RecargarBilletera from './components/RecargarBilletera';
import GenerarCompra from './components/GenerarCompra';
import ConsultarSaldo from './components/ConsultarSaldo';

const VIEWS = [
  { key: 'registro', label: 'Registro', component: RegistroCliente },
  { key: 'recarga', label: 'Recargar', component: RecargarBilletera },
  { key: 'generar', label: 'Generar Compra', component: GenerarCompra },
  { key: 'saldo', label: 'Consultar Saldo', component: ConsultarSaldo },
];

export default function App() {
  const [view, setView] = useState('registro');

  const ActiveComponent = VIEWS.find((v) => v.key === view)?.component ?? RegistroCliente;

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
              className="ms-auto"
            >
              {VIEWS.map(({ key, label }) => (
                <Nav.Item key={key}>
                  <Nav.Link eventKey={key}>{label}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <ActiveComponent />
      </Container>
    </div>
  );
}
