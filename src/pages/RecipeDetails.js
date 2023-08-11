import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { foodDetails, drinkDetails } from '../services/Apis';
import '../styles/recipeDetails.css';
import MealsDetails from './MealsDetails';
import DrinkDetails from './DrinkDetails';

function RecipeDetails({ match: { params: { idDaReceita } } }) {
  const [ingredients, setIngredients] = useState([]);
  const [details, setDetails] = useState('');
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const results = async () => {
      if (pathname.includes('meals')) {
        const responseMealsDetails = await foodDetails(idDaReceita);
        setDetails(responseMealsDetails[0]);
      } else {
        const responseDrinksDetails = await drinkDetails(idDaReceita);
        setDetails(responseDrinksDetails[0]);
      }
    };
    results();
  }, []);

  useEffect(() => {
    const fixIngredients = Object.keys(details)
      .filter((key) => key.includes('strIngredient') && details[key])
      .map((ingredient, index) => (
        `${details[ingredient]} ${details[`strMeasure${index + 1}`]}`));
    setIngredients(fixIngredients);
  }, [details]);

  if (pathname.includes('drinks')) {
    return (
      <DrinkDetails
        pathname={ pathname }
        history={ history }
        details={ details }
        ingredients={ ingredients }
        idDaReceita={ idDaReceita }
      />
    );
  }
  return (
    <MealsDetails
      pathname={ pathname }
      history={ history }
      details={ details }
      ingredients={ ingredients }
      idDaReceita={ idDaReceita }
    />
  );
}

RecipeDetails.propTypes = {}.isrequired;

export default RecipeDetails;
