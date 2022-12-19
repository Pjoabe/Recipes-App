import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import copy from 'clipboard-copy';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const doneRecipesPath = '/done-recipes';

jest.mock('clipboard-copy');

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Testando DoneRecipes', () => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  it('Elementos da página', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(doneRecipesPath);
    });

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getAllByTestId('0-horizontal-image')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('0-horizontal-top-text')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('0-horizontal-name')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('0-horizontal-done-date')[0]).toBeInTheDocument();
  });

  it('Copiando link', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(doneRecipesPath);
    });
    copy.mockImplementation(() => {});

    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    expect(copy).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getAllByText('Link copied!')[0]).toBeInTheDocument();
    });
  });

  it('Filtros', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(doneRecipesPath);
    });

    const resetAll = screen.getByTestId('filter-by-all-btn');
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(filterMeal);
    userEvent.click(filterDrink);
    userEvent.click(resetAll);
  });
});
