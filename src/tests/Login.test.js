import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste a página <Login.js />', () => {
  const dataIdPassword = 'password-input';
  const dataIdEmail = 'email-input';
  const dataEmail = 'test@mail.com';
  const dataPassword = '1234567';
  // const dataIdBtn = 'login-submit-btn';

  test('Teste se a página contém um campo do tipo "email" para inserir o email', () => {
    renderWithRouter(<App />);
    const loginEmail = screen.getByTestId(dataIdEmail);

    expect(loginEmail).toBeInTheDocument();
    expect(loginEmail).toHaveAttribute('type', 'email');
  });

  test('Teste se a página contém um campo do tipo "password" para inserir a senha', () => {
    renderWithRouter(<App />);
    const loginPassword = screen.getByTestId(dataIdPassword);

    expect(loginPassword).toBeInTheDocument();
    expect(loginPassword).toHaveAttribute('type', 'password');
  });

  test('Teste se a página contém um botão com título "Enter"', () => {
    renderWithRouter(<App />);

    const loginBtn = screen.getByRole('button', { name: /enter/i });
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveAttribute('type', 'button');
    expect(loginBtn.innerHTML).toBe('Enter');
  });

  test('Passar dados válidos para testar se o botão "Entrar" fica habilitado', () => {
    renderWithRouter(<App />);

    const loginEmail = screen.getByTestId(dataIdEmail);
    userEvent.type(loginEmail, dataEmail);
    expect(loginEmail).toHaveValue(dataEmail);

    const loginPassword = screen.getByTestId(dataIdPassword);
    userEvent.type(loginPassword, dataPassword);
    expect(loginPassword).toHaveValue(dataPassword);

    const loginBtn = screen.getByRole('button', { name: /enter/i });
    expect(loginBtn).toBeEnabled();
  });

  test('Passar email inválido para testar se o botão "Entrar" fica habilitado', () => {
    renderWithRouter(<App />);

    const loginEmail = screen.getByTestId(dataIdEmail);
    userEvent.type(loginEmail, 'test');
    expect(loginEmail).toHaveValue('test');

    const loginPassword = screen.getByTestId(dataIdPassword);
    userEvent.type(loginPassword, dataPassword);
    expect(loginPassword).toHaveValue(dataPassword);

    const loginBtn = screen.getByRole('button', { name: /enter/i });
    expect(loginBtn).not.toBeEnabled();
  });

  test('Passar password inválido para testar se o botão "Entrar" fica habilitado', () => {
    renderWithRouter(<App />);

    const loginEmail = screen.getByTestId(dataIdEmail);
    userEvent.type(loginEmail, dataEmail);
    expect(loginEmail).toHaveValue(dataEmail);

    const loginPassword = screen.getByTestId(dataIdPassword);
    userEvent.type(loginPassword, '12345');
    expect(loginPassword.value).toBe('12345');

    const loginBtn = screen.getByRole('button', { name: /enter/i });
    expect(loginBtn).not.toBeEnabled();
  });

  test('Passar dados válidos para testar se o botão "Entrar", ao ser clicado, muda para a rota para "/meals"', () => {
    const { history } = renderWithRouter(<App />);

    const loginEmail = screen.getByTestId(dataIdEmail);
    userEvent.type(loginEmail, dataEmail);

    const loginPassword = screen.getByTestId(dataIdPassword);
    userEvent.type(loginPassword, dataPassword);

    // const loginBtn = screen.getByTestId(dataIdBtn);
    const loginBtn = screen.getByRole('button', { name: /enter/i });
    userEvent.click(loginBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
