import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import { firstTwelveDrinks, allDrinkCategories, firstTwelveDrinkCategories,
  firstLetterDrink, ingredientDrink, drinkName } from '../services/Apis';
import Footer from '../components/Footer';
import '../styles/drinks.css';

function Drinks() {
  const [twelveDrinks, setTwelveDrinks] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [lastCategory, setLastCategory] = useState('');
  const { setTitle, recipeSearch, statusSearch,
    setIdRecipeSearch } = useContext(RecipesContext);
  const history = useHistory();
  const MESSAGE = ('Sorry, we haven\'t found any recipes for these filters.');
  const TWELVE = 12;
  const FIVE = 5;

  const checkData = async (arr) => {
    if (arr === null) {
      return arr;
    }
    if (arr.length === 1) {
      setIdRecipeSearch(arr[0].idDrink);
      history.push(`/drinks/${arr[0].idDrink}`);
    }
    if ((arr.length > TWELVE)) {
      return arr.slice(0, TWELVE);
    } return arr;
  };

  const setDrinksSearch = async () => {
    let data = {};
    if (statusSearch === true) {
      switch (recipeSearch.search) {
      case 'ingrediente':
        data = (await ingredientDrink(recipeSearch.name));
        return data;
      case 'primeira-letra':
        data = (await firstLetterDrink(recipeSearch.name));
        return data;
      case 'nome':
        data = (await drinkName(recipeSearch.name));
        return data;
      default:
        data = (await firstTwelveDrinks());
        return data;
      }
    } else {
      data = (await firstTwelveDrinks());
      return data;
    }
  };

  const setDrinks = async () => {
    setCategoryName(await allDrinkCategories());
    setTwelveDrinks(await checkData(await (setDrinksSearch())));
  };

  useEffect(() => {
    setTitle('Drinks');
  }, []);

  useEffect(() => {
    setDrinks();
  }, [statusSearch, recipeSearch.search]);

  const drinkButton = async ({ target: { name } }) => {
    setLastCategory(name);
    if (name === 'all' || name === lastCategory) {
      return setTwelveDrinks(await checkData(await firstTwelveDrinks()));
    }
    setTwelveDrinks(await checkData(await firstTwelveDrinkCategories(name)));
  };

  return (
    <div className="container_drinks">
      <Header />
      <div className="box_drinks">
        {categoryName.slice(0, FIVE).map(({ strCategory }) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            name={ strCategory }
            key={ strCategory }
            onClick={ drinkButton }
          >
            {strCategory}
          </button>
        ))}
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ drinkButton }
          name="all"
        >
          All
        </button>
      </div>
      { twelveDrinks === null
        ? global.alert(MESSAGE)
        : twelveDrinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
          <Link to={ `/drinks/${idDrink}` } key={ idDrink }>
            <div data-testid={ `${index}-recipe-card` } className="imgs_cards">
              <img
                className="imgs"
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            </div>
          </Link>
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;
