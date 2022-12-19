import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import meals from '../../cypress/mocks/meals';

describe('Teste do componente <Profile.js />', () => {
  const dataIdEmailText = 'profile-email';
  const dataIdDoneBtn = 'profile-done-btn';
  const dataIdFavoriteBtn = 'profile-favorite-btn';
  const dataIdLogoutBtn = 'profile-logout-btn';
  const dataIdPageTitle = 'page-title';
  const dataEmail = 'email@email.com';

  test('Tem os data-testids tanto do email quanto de todos os botões', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Profile');
    expect(screen.getByTestId(dataIdEmailText)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdDoneBtn)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdFavoriteBtn)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdLogoutBtn)).toBeInTheDocument();
  });

  test('O e-mail armazenado em localStorage está visível', () => {
    const user = { email: dataEmail };
    localStorage.setItem('user', JSON.stringify(user));

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Profile');
    expect(screen.getByTestId(dataIdEmailText)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdEmailText).innerHTML).toBe(dataEmail);
  });

  test('A tela contêm todos os 3 botões', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Profile');
    expect(screen.getByTestId(dataIdDoneBtn).innerHTML).toBe('Done Recipes');
    expect(screen.getByTestId(dataIdFavoriteBtn).innerHTML).toBe('Favorite Recipes');
    expect(screen.getByTestId(dataIdLogoutBtn).innerHTML).toBe('Logout');
  });

  test('Ao clicar no botão de "Done Recipes", a rota deve mudar para a tela de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Profile');
    expect(screen.getByTestId(dataIdDoneBtn)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /done recipes/i }));

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  test('Ao clicar no botão de "Favorite Recipes", a rota deve mudar para a tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Profile');
    expect(screen.getByTestId(dataIdFavoriteBtn)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /favorite recipes/i }));

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  test('Ao clicar no botão de "Logout", a rota deve mudar para a tela de login', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Profile');
    expect(screen.getByTestId(dataIdLogoutBtn)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /logout/i }));

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Ao clicar no botão de "Logout", limpa todas as chaves da localStorage', () => {
    const user = { email: dataEmail };
    localStorage.setItem('user', JSON.stringify(user));

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Profile');
    expect(screen.getByTestId(dataIdEmailText).innerHTML).toBe(dataEmail);
    expect(screen.getByTestId(dataIdLogoutBtn)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(localStorage.getItem(user)).toBe(null);
  });
});
