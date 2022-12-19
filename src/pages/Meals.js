import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import { firstTwelveFoods, allFoodCategories, firstTwelveFoodCategories,
  ingredientName, FoodName, firstLetter } from '../services/Apis';
import Footer from '../components/Footer';
import '../styles/meals.css';

function Meals() {
  const [twelveFoods, setTwelveFoods] = useState([]);
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
      setIdRecipeSearch(arr[0].idMeal);
      history.push(`/meals/${arr[0].idMeal}`);
    }
    if (arr.length > TWELVE) {
      return arr.slice(0, TWELVE);
    } return arr;
  };

  const setFoodsSearch = async () => {
    let data = {};
    if (statusSearch === true) {
      switch (recipeSearch.search) {
      case 'ingrediente':
        data = (await ingredientName(recipeSearch.name));
        return data;
      case 'primeira-letra':
        data = (await firstLetter(recipeSearch.name));
        return data;
      case 'nome':
        data = (await FoodName(recipeSearch.name));
        return data;
      default:
        data = (await firstTwelveFoods());
        return data;
      }
    } else {
      data = (await firstTwelveFoods());
      return data;
    }
  };

  const setFoods = async () => {
    setCategoryName(await allFoodCategories());
    setTwelveFoods(await checkData(await (setFoodsSearch())));
  };

  useEffect(() => {
    setTitle('Meals');
  }, []);

  useEffect(() => {
    setFoods();
  }, [statusSearch, recipeSearch.search]);

  const foodButton = async ({ target: { name } }) => {
    setLastCategory(name);
    if (name === 'all' || name === lastCategory) {
      return setTwelveFoods(await checkData(await firstTwelveFoods()));
    }
    setTwelveFoods(await checkData(await firstTwelveFoodCategories(name)));
  };
  return (
    <div className="container_meals">
      <Header />
      <div className="box_meals">
        {categoryName.slice(0, FIVE).map(({ strCategory }) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            name={ strCategory }
            key={ strCategory }
            onClick={ foodButton }
          >
            {strCategory}
          </button>
        ))}
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ foodButton }
          name="all"
        >
          All
        </button>
      </div>
      { twelveFoods === null
        ? global.alert(MESSAGE)
        : twelveFoods.map(({ strMeal, strMealThumb, idMeal }, index) => (
          <Link to={ `/meals/${idMeal}` } key={ idMeal }>
            <div data-testid={ `${index}-recipe-card` } className="imgs_cards">
              <img
                className="imgs"
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>
          </Link>
        ))}
      <Footer />
    </div>
  );
}

export default Meals;
