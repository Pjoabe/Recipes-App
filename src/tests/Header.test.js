import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste do componente <Header.js />', () => {
  const dataIdBtnTopSearch = 'search-top-btn';
  const dataIdBtnTopProfile = 'profile-top-btn';
  const dataIdPageTitle = 'page-title';
  const dataIdInputTopSearch = 'search-input';

  test('Rota "/meals": possui o header com o título "Meals" e os ícones de perfil e pesquisa', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdBtnTopProfile)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    expect(screen.getByTestId(dataIdBtnTopSearch)).toBeInTheDocument();
  });

  test('Rota "/drinks": possui o header com o título "Drinks" e os ícones de perfil e pesquisa', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    expect(screen.getByTestId(dataIdBtnTopProfile)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Drinks');
    expect(screen.getByTestId(dataIdBtnTopSearch)).toBeInTheDocument();
  });

  test('Rota "/profile": possui o header com o título "Profile" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(dataIdBtnTopProfile)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Profile');
  });

  test('Rota "/done-recipes": possui o header com o título "Done Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/done-recipes');
    });
    expect(history.location.pathname).toBe('/done-recipes');

    expect(screen.getByTestId(dataIdBtnTopProfile)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Done Recipes');
  });

  test('Rota "/favorite-recipes": possui o header com o título "Favorite Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/favorite-recipes');
    });
    expect(history.location.pathname).toBe('/favorite-recipes');

    expect(screen.getByTestId(dataIdBtnTopProfile)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Favorite Recipes');
  });

  test('A mudança de tela ocorre corretamente', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopProfile));

    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Profile');
  });

  test('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    expect(document.getElementById('searchInput')).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    expect(screen.getByTestId(dataIdInputTopSearch)).toBeInTheDocument();
  });

  test('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    expect(document.getElementById('searchInput')).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    expect(screen.getByTestId(dataIdInputTopSearch)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    expect(document.getElementById('searchInput')).not.toBeInTheDocument();
  });

  test('Tem os data-testids tanto da barra de busca quanto de todos os radio-buttons', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });

  test('Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', () => {
    const { history } = renderWithRouter(<App />);

    global.alert = jest.fn();

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith(('Your search must have 1 (one) character'));
  });
});
