import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
// import requestAPIFetch from '../services/RequestAPI';

function RecipesProvider({ children }) {
  /* recebe os valores de título da página */
  const [title, setTitle] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [statusSearch, setStatusSearch] = useState(false);
  const [recipeSearch, setRecipeSearch] = useState({ name: '', search: '' });

  // useEffect(() => {

  //   requestAPIFetch().then((result) => {
  //     setData(result);
  //     setSearch(result);
  //   });
  // }, []);

  const value = useMemo(() => ({
    title,
    setTitle,
    showInput,
    setShowInput,
    recipeSearch,
    setRecipeSearch,
    statusSearch,
    setStatusSearch,
  }), [title, setTitle, recipeSearch, setRecipeSearch, statusSearch, setStatusSearch,
    showInput, setShowInput]);

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
