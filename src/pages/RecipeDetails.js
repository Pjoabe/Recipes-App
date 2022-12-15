import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { foodDetails, drinkDetails } from '../services/Apis';
import RecomendationCard from './RecomendationCard';

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
      <div>
        <h1 data-testid="recipe-title">{ details.strDrink }</h1>
        <img
          data-testid="recipe-photo"
          src={ details.strDrinkThumb }
          alt="foto da bebida da receita"
        />
        <h2>Categoria da receita</h2>
        <p data-testid="recipe-category">
          { details.strCategory }
          {details.strAlcoholic}

        </p>
        <h3>Ingredientes</h3>
        {ingredients.map((ingredient, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </p>))}
        <h2>Instruções</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
        <RecomendationCard history={ history } />
      </div>
    );
  }
  if (pathname.includes('meals')) {
    return (
      <div>
        <h1 data-testid="recipe-title">{details.strMeal}</h1>
        <img
          src={ details.strMealThumb }
          alt="Foto da receita"
          data-testid="recipe-photo"
        />
        <h2>Categoria da receita</h2>
        <p data-testid="recipe-category">{ details.strCategory }</p>
        <h2>Ingredientes</h2>
        {ingredients.map((mealingredient, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {mealingredient}
          </p>))}
        <h2>Instruções</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
        <h2>Video</h2>
        <iframe
          width="420"
          height="315"
          src={ details ? details
            .strYoutube.replace('/watch?v=', '/embed/') : null }
          title={ `receita ${details.strMeal}` }
          allow="accelerometer;
      autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="video"
        />
        <RecomendationCard history={ history } />
      </div>
    );
  }
}

RecipeDetails.propTypes = {}.isrequired;

export default RecipeDetails;
