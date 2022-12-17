import React, { useState, useEffect } from 'react';
import { drinkRecomendations, foodRecomendations } from '../services/Apis';
import '../styles/RecomendationCard.css';

function RecomendationCard({ history, idDaReceita }) {
  const [startBtn, setStartBtn] = useState('Start');
  const [drinkRecomend, setDrinkRecomend] = useState(null);
  const [foodRecomend, setFoodRecomend] = useState(null);
  const { pathname } = history.location;

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

  // itens do local storage que incluem a busca abaixo.
  const onGoingRecipes = () => localStorage.getItem('inProgressRecipes');

  useEffect(() => {
    if (onGoingRecipes()) {
      const object = JSON.parse(onGoingRecipes());
      const array = Object.keys(object);
      const arrayOfIds = Object.keys(object[array[0]]);
      if (arrayOfIds.includes(idDaReceita)) {
        setStartBtn('Continue');
      }
    }
  }, [idDaReceita, startBtn]);

  const startRecipe = () => {
    history.push(`${pathname}/in-progress`);
  };

  if (!foodRecomend || !drinkRecomend) return <h1>Loading...</h1>;

  if (pathname.includes('drinks')) {
    const SIX = 6;
    return (
      <div iv className="recomendation_container">
        <div className="recomendations">
          <h2>Recomendations</h2>
          <div className="recomendation_box">
            {
              foodRecomend && (
                <>
                  {foodRecomend.map((el, index) => (
                    index < SIX && (
                      <div
                        className="recomendationCard"
                        data-testid={ `${index}-recommendation-card` }
                        key={ index }
                      >
                        <img
                          className="imgs"
                          src={ el.strMealThumb }
                          alt={ el.strMeal }
                        />
                        <p data-testid={ `${index}-recommendation-title` }>
                          {el.strMeal}
                        </p>
                      </div>
                    )))}
                </>
              )
            }
          </div>
        </div>
        <button
          className="recomendation-button"
          id="btnStartRecipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ startRecipe }
        >
          { `${startBtn} Recipe` }
        </button>
      </div>
    );
  }
  if (pathname.includes('meals')) {
    const SIX = 6;
    return (
      <div className="recomendation_container">
        <div className="recomendations">
          <h2>Recomendations</h2>
          <div className="recomendation_box">
            {drinkRecomend.map((el, index) => (
              index < SIX && (
                <div
                  className="recomendationCard"
                  data-testid={ `${index}-recommendation-card` }
                  key={ index }
                >
                  <img
                    className="imgs"
                    src={ el.strDrinkThumb }
                    alt={ el.strDrink }
                  />
                  <p data-testid={ `${index}-recommendation-title` }>{el.strDrink}</p>
                </div>
              )))}
          </div>
        </div>
        <button
          className="recomendation-button"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ startRecipe }
        >
          { `${startBtn} Recipe` }
        </button>
      </div>
    );
  }
}

RecomendationCard.propTypes = {}.isRequired;

export default RecomendationCard;
