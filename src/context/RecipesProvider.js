import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
// import requestAPIFetch from '../services/RequestAPI';

function RecipesProvider({ children }) {
  const [title, setTitle] = useState(''); /* recebe os valores de título da página */
  const [showInput, setShowInput] = useState(false);
  const [statusSearch, setStatusSearch] = useState(false);
  const [recipeSearch, setRecipeSearch] = useState({ name: '', search: '' });
  const [idRecipeSearch, setIdRecipeSearch] = useState('');

  const value = useMemo(() => ({
    title,
    setTitle,
    showInput,
    setShowInput,
    recipeSearch,
    setRecipeSearch,
    statusSearch,
    setStatusSearch,
    idRecipeSearch,
    setIdRecipeSearch,
  }), [title, setTitle, recipeSearch, setRecipeSearch, statusSearch, setStatusSearch,
    showInput, setShowInput, idRecipeSearch, setIdRecipeSearch]);

  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
