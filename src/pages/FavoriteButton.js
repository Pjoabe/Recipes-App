import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ details, pathname }) {
  // função que verifica se já há algo no localStorage com a chave 'favoriteRecipes'
  const setOnLocalStorage = (param) => {
    const onStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (!onStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([param]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...onStorage, param]));
    }
  };
  // Funções que adaptam o objeto details para o formato esperado no avaliador do requisito
  const newFavoriteFood = () => {
    const newFood = {
      id: details.idMeal,
      type: 'meal',
      nationality: !details.strArea ? '' : details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
    };
    setOnLocalStorage(newFood);
  };

  const newFavoriteDrink = () => {
    const newDrink = {
      id: details.idDrink,
      type: 'drink',
      nationality: !details.strArea ? '' : details.strArea,
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
    };
    setOnLocalStorage(newDrink);
  };
  // função que capta em qual pagina de detalhes o usuario está.
  const handlePath = () => {
    if (pathname.includes('meals')) newFavoriteFood();
    if (pathname.includes('drinks'))newFavoriteDrink();
  };

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handlePath }
      >
        <img src={ whiteHeartIcon } alt="favorite" />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {}.isRequired;

export default FavoriteButton;
