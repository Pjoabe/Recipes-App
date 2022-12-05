import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import Header from '../components/Header';

function Favorites() {
  const { setTitle } = useContext(RecipesContext);

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, []);

  return (
    <div className="container_favorites">
      <Header />
      <h1>Tela principal de receitas favoritas</h1>
    </div>
  );
}

export default Favorites;
