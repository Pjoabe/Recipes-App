import React, { useContext, useState, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import Header from '../components/Header';
import { firstTwelveDrinks } from '../services/Apis';

function Drinks() {
  const [twelveDrinks, setTwelveDrinks] = useState([]);
  const setDrinks = async () => {
    setTwelveDrinks(await firstTwelveDrinks());
  };
  const { setTitle } = useContext(RecipesContext);

  useEffect(() => {
    setTitle('Drinks');
  }, []);

  useEffect(() => {
    setDrinks();
  }, []);
  const TWELVE = 12;
  return (
    <div className="container_drinks">
      <Header />
      {twelveDrinks.slice(0, TWELVE).map(({ strDrink, strDrinkThumb, idMeal }, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{strDrink}</p>
        </div>
      ))}
    </div>
  );
}

export default Drinks;
