import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  foodDetails, drinkDetails, foodRecomendations, drinkRecomendations,
} from '../services/Apis';

function RecipeDetails({ match: { params: { idDaReceita } } }) {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState({});
  const [measures, setMeasures] = useState([]);
  const [details, setDetails] = useState('');
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
  }, [history.location]);

  useEffect(() => {
    const { strIngredient1, strIngredient2, strIngredient3, strIngredient4,
      strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9,
      strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14,
      strIngredient15, strIngredient16, strIngredient17, strIngredient18, strIngredient19,
      strIngredient20 } = details;

    const ingredientArray = [strIngredient1, strIngredient2, strIngredient3,
      strIngredient4, strIngredient5, strIngredient6,
      strIngredient7, strIngredient8, strIngredient9,
      strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14,
      strIngredient15, strIngredient16, strIngredient17, strIngredient18, strIngredient19,
      strIngredient20];
    setIngredients(ingredientArray);
    const { strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6,
      strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12,
      strMeasure13, strMeasure14, strMeasure15, strMeasure16, strMeasure17, strMeasure18,
      strMeasure19, strMeasure20 } = details;

    const measuresArray = [strMeasure1, strMeasure2, strMeasure3, strMeasure4,
      strMeasure5, strMeasure6, strMeasure7, strMeasure8,
      strMeasure9, strMeasure10, strMeasure11,
      strMeasure12, strMeasure13, strMeasure14, strMeasure15, strMeasure16, strMeasure17,
      strMeasure18, strMeasure19, strMeasure20];
    setMeasures(measuresArray);
  }, [details]);
  useEffect(() => {
    const results = async () => {
      if (pathname.includes('meals')) {
        const responseDrinksRecomendation = await drinkRecomendations();
        setRecomendations(responseDrinksRecomendation);
      } else {
        const responseMealsRecomendation = await foodRecomendations();
        setRecomendations(responseMealsRecomendation);
      }
    };
    results();
  }, [history.location, recomendations]);
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
            {`${ingredient} ${measures[index]}`}
          </p>))}
        <h2>Instruções</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
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
            {`${mealingredient} ${measures[index]}`}
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
      </div>
    );
  }
}

RecipeDetails.propTypes = {}.isrequired;

export default RecipeDetails;
