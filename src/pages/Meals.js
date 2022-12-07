import React, { useContext, useState, useEffect } from 'react'; /* { useState }  */
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import Header from '../components/Header';
import { firstTwelveFoods } from '../services/Apis';

function Meals() {
  const [twelveFoods, setTwelveFoods] = useState([]);
  const setFoods = async () => {
    setTwelveFoods(await firstTwelveFoods());
  };
  const { setTitle } = useContext(RecipesContext);

  useEffect(() => {
    setTitle('Meals');
  }, []);

  useEffect(() => {
    setFoods();
  }, []);
  const TWELVE = 12;
  return (
    <div className="container_meals">
      <Header />
      {twelveFoods.slice(0, TWELVE).map(({ strMeal, strMealThumb, idMeal }, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{strMeal}</p>
        </div>
      ))}
    </div>
  );
}

export default Meals;
