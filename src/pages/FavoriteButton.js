import React, { useEffect, useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ details, pathname }) {
  const [isFav, setIsFav] = useState(false);
  // função que verifica se há algum item favoritado baseado em booleanos retornados pela função some.
  const searchOnLocalStorage = (path) => {
    const onStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (onStorage) {
      if (path.includes('meals')) {
        const foodBool = onStorage.some((food) => (food.id === details.idMeal));
        return foodBool;
      } if (pathname.includes('drinks')) {
        const drinkBool = onStorage.some((drink) => (drink.id === details.idDrink));
        return drinkBool;
      }
      return false;
    }
  };
  // fazendo a verificação logo após o carregamento da página
  useEffect(() => {
    searchOnLocalStorage(pathname);
    setIsFav(searchOnLocalStorage(pathname));
  }, [details.idMeal, details.idDrink]);

  // função que verifica se já há algo no localStorage com a chave 'favoriteRecipes'
  const setOnLocalStorage = (param) => {
    const onStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!onStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([param]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...onStorage, param]));
    }
    setIsFav(true);
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
    const newRecipe = {
      id: details.idDrink,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
    };
    setOnLocalStorage(newRecipe);
  };
  // função que capta em qual pagina de detalhes o usuario está e seta no localStorage uma comida ou drink selecionado.
  const handlePath = () => {
    const favConfirmation = searchOnLocalStorage(pathname);
    if (pathname.includes('meals') && !favConfirmation) {
      newFavoriteFood();
    }
    if (pathname.includes('drinks') && !favConfirmation) {
      newFavoriteDrink();
    }
    if (favConfirmation) {
      setIsFav(false);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={ handlePath }
      >
        <img
          src={ isFav ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {}.isRequired;

export default FavoriteButton;
