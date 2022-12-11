import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
// import requestAPIFetch from '../services/RequestAPI';

function RecipesProvider({ children }) {
  /* recebe os valores de título da página */
  const [title, setTitle] = useState('');
  const [recipeSearch, setRecipeSearch] = useState({ name: '', search: '' });
  const [statusSearch, setStatusSearch] = useState(false);

  // useEffect(() => {

  //   requestAPIFetch().then((result) => {
  //     setData(result);
  //     setSearch(result);
  //   });
  // }, []);

  const value = useMemo(() => ({
    title,
    setTitle,
    recipeSearch,
    setRecipeSearch,
    statusSearch,
    setStatusSearch,
  }), [title, setTitle, recipeSearch, setRecipeSearch, statusSearch, setStatusSearch]);

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
