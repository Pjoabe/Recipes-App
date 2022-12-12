import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { response } from './mocks/mocks';

describe('Teste do componente <SearchBar.js />', () => {
  const dataIdBtnTopSearch = 'search-top-btn';
  const dataIdPageTitle = 'page-title';
  const dataIdInputTopSearch = 'search-input';
  const dataIdRadioFirst = 'first-letter-search-radio';
  const dataIdBtnExecSearch = 'exec-search-btn';
  const messageAlert = 'Your search must have 1 (one) character';

  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(response),
  }));

  test('Tem os data-testids tanto da barra de busca quanto de todos os radio-buttons', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    expect(screen.getByTestId(dataIdInputTopSearch)).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(dataIdRadioFirst)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdBtnExecSearch)).toBeInTheDocument();
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
    userEvent.click(screen.getByTestId(dataIdRadioFirst));
    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith((messageAlert));
  });

  test('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { history } = renderWithRouter(<App />);

    global.alert = jest.fn();

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.type(screen.getByTestId(dataIdInputTopSearch), 'fish');
    userEvent.click(screen.getByTestId(dataIdBtnExecSearch));
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(await screen.findByText(/fish/i)).toBeInTheDocument();
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=fish');
  });

  test('Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', async () => {
    const { history } = renderWithRouter(<App />);

    global.alert = jest.fn();

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.type(screen.getByTestId(dataIdInputTopSearch), 'fish');
    userEvent.click(screen.getByTestId(dataIdBtnExecSearch));
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(await screen.findByText(/fish/i)).toBeInTheDocument();
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=fish');
  });

  test('Se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', async () => {
    const { history } = renderWithRouter(<App />);

    global.alert = jest.fn();

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    userEvent.click(screen.getByTestId(dataIdRadioFirst));
    expect(global.alert).toHaveBeenCalledWith((messageAlert));
    userEvent.type(screen.getByTestId(dataIdInputTopSearch), 't');
    userEvent.click(screen.getByTestId(dataIdBtnExecSearch));
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(await screen.findByText(/three/i)).toBeInTheDocument();
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=t');
  });

  test('Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
    const { history } = renderWithRouter(<App />);

    global.alert = jest.fn();

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    userEvent.click(screen.getByTestId(dataIdRadioFirst));
    expect(global.alert).toHaveBeenCalledWith((messageAlert));
    userEvent.type(screen.getByTestId(dataIdInputTopSearch), 'tt');
    expect(global.alert).toHaveBeenCalledWith((messageAlert));
    expect(global.alert).toHaveBeenCalledTimes(2);
  });
});
