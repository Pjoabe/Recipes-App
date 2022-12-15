import React, { useState, useEffect } from 'react';
import { drinkRecomendations, foodRecomendations } from '../services/Apis';
import '../styles/RecomendationCard.css';

function RecomendationCard({ history: { location: { pathname } } }) {
  const [drinkRecomend, setDrinkRecomend] = useState(null);
  const [foodRecomend, setFoodRecomend] = useState(null);

  useEffect(() => {
    const results = async () => {
      if (pathname.includes('meals')) {
        const responseDrinksRecomendation = await drinkRecomendations();
        setDrinkRecomend(responseDrinksRecomendation);
        setFoodRecomend([]);
      }

      if (pathname.includes('drinks')) {
        const responseMealsRecomendation = await foodRecomendations();
        setFoodRecomend(responseMealsRecomendation);
        setDrinkRecomend([]);
      }
    };
    results();
  }, []);

  if (!foodRecomend || !drinkRecomend) return <h1>Loading...</h1>;

  if (pathname.includes('drinks')) {
    const SIX = 6;
    return (
      <div>
        {
          foodRecomend && (
            <>
              <div className="div1">
                {foodRecomend.map((el, index) => (
                  index < SIX && (
                    <div
                      className="recomendationCard"
                      data-testid={ `${index}-recommendation-card` }
                      key={ index }
                    >
                      <img
                        src={ el.strMealThumb }
                        alt={ el.strMeal }
                      />
                      <p data-testid={ `${index}-recommendation-title` }>{el.strMeal}</p>
                    </div>
                  )))}
              </div>
              <button
                className="recomendation-button"
                id="btnStartRecipe"
                type="button"
                data-testid="start-recipe-btn"
              >
                Start Recipe
              </button>
            </>
          )
        }
      </div>
    );
  }
  if (pathname.includes('meals')) {
    const SIX = 6;
    return (
      <div>
        <div className="div1">
          {drinkRecomend.map((el, index) => (
            index < SIX && (
              <div
                className="recomendationCard"
                data-testid={ `${index}-recommendation-card` }
                key={ index }
              >
                <img
                  src={ el.strDrinkThumb }
                  alt={ el.strDrink }
                />
                <p data-testid={ `${index}-recommendation-title` }>{el.strDrink}</p>
              </div>
            )))}
        </div>
        <button
          className="recomendation-button"
          data-testid="start-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
      </div>
    );
  }
}

RecomendationCard.propTypes = {}.isRequired;

export default RecomendationCard;
