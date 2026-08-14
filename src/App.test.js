import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { saveSession } from './session';

beforeEach(() => {
  localStorage.clear();
});

test('sin sesion muestra el login', () => {
  render(<App />);

  expect(screen.getByText(/billetera virtual/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
});

test('el link de login lleva al registro', () => {
  render(<App />);

  userEvent.click(screen.getByText(/¿no tenés cuenta\?/i));

  expect(screen.getByRole('heading', { name: /registro de cliente/i })).toBeInTheDocument();
});

test('con una sesion guardada muestra la navegacion autenticada', () => {
  saveSession({ token: 'abc123', documento: '1', nombre: 'Juan Perez', celular: '3000000000' });

  render(<App />);

  expect(screen.getByText(/hola, juan perez/i)).toBeInTheDocument();
  expect(screen.getByText('Generar Compra')).toBeInTheDocument();
  expect(screen.getByText('Consultar Saldo')).toBeInTheDocument();
  // La vista por defecto ("Recargar") ya queda probada por este heading,
  // que además desambigua del nav pill "Recargar" (mismo texto).
  expect(screen.getByRole('heading', { name: /recargar billetera/i })).toBeInTheDocument();
});
