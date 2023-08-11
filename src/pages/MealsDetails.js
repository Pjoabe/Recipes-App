import React from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import Ingredients from './Ingredients';
import RecomendationCard from './RecomendationCard';

function MealsDetails({ pathname, details, ingredients, history, idDaReceita }) {
  return (
    <div className="container_details">
      <h1 data-testid="recipe-title">{details.strMeal}</h1>
      <FavoriteButton pathname={ pathname } details={ details } />
      <ShareButton />
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
      <Ingredients ingredients={ ingredients } />
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
      <RecomendationCard idDaReceita={ idDaReceita } history={ history } />
    </div>
  );
}

MealsDetails.propTypes = {}.isRequired;

export default MealsDetails;
