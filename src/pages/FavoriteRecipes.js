/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const { setTitle } = useContext(RecipesContext);
  const [allFavRecipes, setAllFavRecipes] = useState();
  const [mealsFavRecipes, setMealsFavRecipes] = useState();
  const [drinksFavRecipes, setDrinksFavRecipes] = useState();
  const [filteredFavRecipes, setFilteredFavRecipes] = useState();
  const [copied, setCopied] = useState(false);

  const setMeals = (recipesFavorites) => {
    const filterMeals = recipesFavorites.filter((item) => item.type === 'meal');
    setMealsFavRecipes(filterMeals);
  };

  const setDrinks = (recipesFavorites) => {
    const filterDrinks = recipesFavorites.filter((item) => item.type === 'drink');
    setDrinksFavRecipes(filterDrinks);
  };

  useEffect(() => {
    setTitle('Favorite Recipes');
    if (localStorage.getItem('favoriteRecipes')) {
      const recipesFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setAllFavRecipes(recipesFavorites);
      setFilteredFavRecipes(recipesFavorites);
      setMeals(recipesFavorites);
      setDrinks(recipesFavorites);
    }
  }, []);

  const resetFilter = () => {
    setFilteredFavRecipes(allFavRecipes);
  };

  const filterMeals = () => {
    setFilteredFavRecipes(mealsFavRecipes);
  };

  const filterDrinks = () => {
    setFilteredFavRecipes(drinksFavRecipes);
  };

  const shareRecipe = (recipe) => {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopied(true);
  };

  const removeFav = (element) => {
    const favs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavs = favs.filter((item) => item.id !== element.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setAllFavRecipes(newFavs);
    setFilteredFavRecipes(newFavs);
    setMeals(newFavs);
    setDrinks(newFavs);
  };

  return (
    <>
      <Header />
      <div className="container_recipes">
        <h1>Tela principal de receitas favoritas</h1>
      </div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ resetFilter }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          name="meals"
          onClick={ filterMeals }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="drinks"
          onClick={ filterDrinks }
        >
          Drinks
        </button>
      </div>
      <div>
        {filteredFavRecipes && filteredFavRecipes.map((item, index) => (
          <div key={ index }>
            <Link to={ `/${item.type}s/${item.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{item.name}</h3>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ item.image }
                alt="food"
              />
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${item.nationality} - ${item.category} ${item.alcoholicOrNot}`}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            <button type="button" onClick={ () => shareRecipe(item) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share"
              />
            </button>
            {copied && <span>Link copied!</span>}
            <button
              className="fav-btn"
              type="button"
              onClick={ () => removeFav(item) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="Favorite Icon"
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
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

localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
export default FavoriteRecipes;
