import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import '../styles/doneRecipes.css';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const { setTitle } = useContext(RecipesContext);
  const [allDoneRecipes, setAllDoneRecipes] = useState();
  const [mealsDoneRecipes, setMealsDoneRecipes] = useState();
  const [drinksDoneRecipes, setDrinksDoneRecipes] = useState();
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState();
  const [copied, setCopied] = useState(false);

  const setMeals = (recipesDone) => {
    const filterMeals = recipesDone.filter((item) => item.type === 'meal');
    setMealsDoneRecipes(filterMeals);
  };

  const setDrinks = (recipesDone) => {
    const filterDrinks = recipesDone.filter((item) => item.type === 'drink');
    setDrinksDoneRecipes(filterDrinks);
  };

  useEffect(() => {
    setTitle('Done Recipes');
    if (localStorage.getItem('doneRecipes')) {
      const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
      setAllDoneRecipes(recipesDone);
      setFilteredDoneRecipes(recipesDone);
      setMeals(recipesDone);
      setDrinks(recipesDone);
    }
  }, []);

  const resetFilter = () => {
    setFilteredDoneRecipes(allDoneRecipes);
  };

  const filterMeals = () => {
    setFilteredDoneRecipes(mealsDoneRecipes);
  };

  const filterDrinks = () => {
    setFilteredDoneRecipes(drinksDoneRecipes);
  };

  const shareRecipe = (recipe) => {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopied(true);
  };

  return (
    <>
      <Header />
      <div className="container_recipes">
        <h1>Tela principal de receitas feitas</h1>
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
        {filteredDoneRecipes && filteredDoneRecipes.map((item, index) => (
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
            <span>
              {item.tags.map((tag, keyIndex) => (
                <p
                  key={ keyIndex }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default DoneRecipes;
