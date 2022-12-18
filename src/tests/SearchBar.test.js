import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

describe('Teste do componente <SearchBar.js />', () => {
  const dataIdBtnTopSearch = 'search-top-btn';
  const dataIdPageTitle = 'page-title';
  const dataIdInputTopSearch = 'search-input';
  const dataIdRadioName = 'name-search-radio';
  const dataIdRadioFirst = 'first-letter-search-radio';
  const dataIdRadioIngredient = 'ingredient-search-radio';
  const dataIdBtnExecSearch = 'exec-search-btn';
  const messageAlert = 'Your search must have 1 (one) character';

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  test('Tem os data-testids tanto da barra de busca quanto de todos os radio-buttons', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    expect(screen.getByTestId(dataIdInputTopSearch)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdRadioIngredient)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdRadioName)).toBeInTheDocument();
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
    userEvent.click(screen.getByTestId(dataIdRadioIngredient));
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
    userEvent.click(screen.getByTestId(dataIdRadioName));
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
    userEvent.type(screen.getByTestId(dataIdInputTopSearch), 'T');
    userEvent.click(screen.getByTestId(dataIdBtnExecSearch));
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(await screen.findByText(/timbits/i)).toBeInTheDocument();
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=T');
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

  test('Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes', async () => {
    const { history } = renderWithRouter(<App />);

    global.alert = jest.fn();

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    userEvent.click(screen.getByTestId(dataIdRadioName));
    userEvent.type(screen.getByTestId(dataIdInputTopSearch), 'Corba');
    expect(screen.getByTestId(dataIdInputTopSearch).value).toBe('Corba');
    userEvent.click(screen.getByLabelText(/name/i));
    expect(screen.getByTestId(dataIdRadioName)).toBeChecked();
    userEvent.click(screen.getByTestId(dataIdBtnExecSearch));
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(await screen.findByText(/Corba/i)).toBeInTheDocument();
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Corba');
    act(() => {
      history.push('/meals/52977');
    });
    expect(history.location.pathname).toBe('/meals/52977');
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977');
    await waitFor(() => {
      expect(screen.getByTestId('recipe-title').innerHTML).toBe('Corba');
    });
  });

  test('Caso mais de uma comida seja encontrada, mostrar as 12 primeiras', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    userEvent.click(screen.getByTestId(dataIdRadioName));
    userEvent.type(screen.getByTestId(dataIdInputTopSearch), 'la');
    userEvent.click(screen.getByTestId(dataIdBtnExecSearch));
    expect(await screen.findByText(/lasagne/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(6);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=la');
    expect(screen.getAllByTestId(/card-name/i).length).toBe(12);
  });

  test('Se o o botão Search for clicado sem nenhum radio selecionado, deve-se exibir um alert', async () => {
    const { history } = renderWithRouter(<App />);

    global.alert = jest.fn();

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    userEvent.click(screen.getByTestId(dataIdBtnExecSearch));
    expect(global.alert).toHaveBeenCalledWith(('Select an option'));
  });

  test('Se o o botão Search for clicado com o campo de busca vazio, deve-se exibir um alert', async () => {
    const { history } = renderWithRouter(<App />);

    global.alert = jest.fn();

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopSearch));
    userEvent.click(screen.getByTestId(dataIdRadioName));
    userEvent.click(screen.getByTestId(dataIdBtnExecSearch));
    expect(global.alert).toHaveBeenCalledWith((messageAlert));
  });
});
