import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import Header from '../components/Header';

function Recipes() {
  const { setTitle } = useContext(RecipesContext);

  useEffect(() => {
    setTitle('Done Recipes');
  }, []);

  return (
    <div className="container_recipes">
      <Header />
      <h1>Tela principal de receitas feitas</h1>
    </div>
  );
}

export default Recipes;
