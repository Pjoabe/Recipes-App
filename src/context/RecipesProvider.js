import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
// import requestAPIFetch from '../services/RequestAPI';

function RecipesProvider({ children }) {
  /* recebe os valores de título da página */
  const [title, setTitle] = useState('');
  // useEffect(() => {

  //   requestAPIFetch().then((result) => {
  //     setData(result);
  //     setSearch(result);
  //   });
  // }, []);

  const value = useMemo(() => ({
    title,
    setTitle,
  }), [title, setTitle]);

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
