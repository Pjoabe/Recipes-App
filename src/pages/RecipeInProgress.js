import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { drinkDetails, foodDetails } from '../services/Apis';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import FinishButton from './FinishButton';
import IngredientsInProgress from './ingredientsInProgress';

function RecipeInProgress() {
  const [details, setDetails] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = history.location;
  // função que define que tipo de alimento será renderizado, logo depois de decidido é salvo no estado.
  const defineFetch = async () => {
    if (pathname.includes('/meals')) {
      const foodDetailsData = await foodDetails(id);
      setDetails(foodDetailsData);
    }
    if (pathname.includes('/drinks')) {
      const DrinkDetailsData = await drinkDetails(id);
      setDetails(DrinkDetailsData);
    }
  };
  useEffect(() => {
    defineFetch();
  }, []);

  const mountRecipe = () => {
    let recipe = {
      null: null,
    };

    const storeIngredients = [];
    Object.entries(details[0]).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value) {
        storeIngredients.push(value);
      }
    });

    if (pathname.includes('meals')) {
      recipe = {
        title: details[0].strMeal,
        image: details[0].strMealThumb,
        ingredients: storeIngredients,
        category: details[0].strCategory,
        video: details[0].strYoutube,
        recipeInstructions: details[0].strInstructions,
      };
    }
    if (pathname.includes('drinks')) {
      recipe = {
        title: details[0].strDrink,
        image: details[0].strDrinkThumb,
        ingredients: storeIngredients,
        category: `${details[0].strAlcoholic}`,
        video: details[0].strYoutube,
        recipeInstructions: details[0].strInstructions,
      };
    }
    return recipe;
  };

  return (
    <div>
      {details.length >= 1
        && (
          <div>
            <div>
              <ShareButton />
              <FavoriteButton pathname={ pathname } details={ details } />
              <FinishButton />
            </div>
            <h1 data-testid="recipe-title">
              {mountRecipe().title}
            </h1>
            <img
              data-testid="recipe-photo"
              src={ mountRecipe().image }
              alt="Recipe photography"
            />
            <h2 data-testid="recipe-category">
              {mountRecipe().category}
            </h2>
            <IngredientsInProgress ingredients={ mountRecipe().ingredients } />
            <h3>Instructions</h3>
            <p data-testid="instructions">
              {mountRecipe().recipeInstructions}
            </p>
            <iframe
              data-testid="video"
              src={ mountRecipe().video }
              title={ mountRecipe().title }
            />
          </div>
        )}
    </div>
  );
}
export default RecipeInProgress;
