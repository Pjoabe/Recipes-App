import React from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import RecomendationCard from './RecomendationCard';
import Ingredients from './Ingredients';

function DrinkDetails({ pathname, details, ingredients, history, idDaReceita }) {
  return (
    <div className="container_details">
      <h1 data-testid="recipe-title">{ details.strDrink }</h1>
      <FavoriteButton pathname={ pathname } details={ details } />
      <ShareButton />
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
      <Ingredients ingredients={ ingredients } />
      <div className="box_details">
        <h2>Instructions</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
      </div>
      <RecomendationCard idDaReceita={ idDaReceita } history={ history } />
    </div>
  );
}

DrinkDetails.propTypes = {}.isRequired;

export default DrinkDetails;
