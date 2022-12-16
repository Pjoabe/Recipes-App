import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { foodDetails, drinkDetails } from '../services/Apis';
import RecomendationCard from './RecomendationCard';
import '../styles/recipeDetails.css';

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
      <div className="container_details">
        <h1 data-testid="recipe-title">{ details.strDrink }</h1>
        <div className="box_principal">
          <img
            className="imgs"
            data-testid="recipe-photo"
            src={ details.strDrinkThumb }
            alt="foto da bebida da receita"
          />
          <div className="title_category">
            <h2>Category</h2>
            <h2 data-testid="recipe-category">
              { details.strCategory }
              {details.strAlcoholic}
            </h2>
          </div>
        </div>
        <div className="box_details">
          <h2>Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </p>))}
        </div>
        <div className="box_details">
          <h2>Instructions</h2>
          <p data-testid="instructions">{ details.strInstructions }</p>
        </div>
        <RecomendationCard history={ history } />
      </div>
    );
  }
  if (pathname.includes('meals')) {
    return (
      <div className="container_details">
        <h1 data-testid="recipe-title">{details.strMeal}</h1>
        <div className="box_principal">
          <img
            className="imgs"
            src={ details.strMealThumb }
            alt="Foto da receita"
            data-testid="recipe-photo"
          />
          <div className="title_category">
            <h2>Category</h2>
            <h2 data-testid="recipe-category">{ details.strCategory }</h2>
          </div>
        </div>
        <div className="box_details">
          <h2>Ingredients</h2>
          {ingredients.map((mealingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {mealingredient}
            </p>))}
        </div>
        <div className="box_details">
          <h2>Instructions</h2>
          <p data-testid="instructions">{ details.strInstructions }</p>
        </div>
        <div className="box_video">
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
        </div>
        <RecomendationCard history={ history } />
      </div>
    );
  }
}

RecipeDetails.propTypes = {}.isrequired;

export default RecipeDetails;
