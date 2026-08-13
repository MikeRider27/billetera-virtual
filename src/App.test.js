import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app title and the navigation for the 4 views', () => {
  render(<App />);

  expect(screen.getByText(/billetera virtual/i)).toBeInTheDocument();
  expect(screen.getByText('Registro')).toBeInTheDocument();
  expect(screen.getByText('Recargar')).toBeInTheDocument();
  expect(screen.getByText('Generar Compra')).toBeInTheDocument();
  expect(screen.getByText('Consultar Saldo')).toBeInTheDocument();
});

test('shows the registro form by default', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /registro de cliente/i })).toBeInTheDocument();
});
