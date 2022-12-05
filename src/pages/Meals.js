import React, { useContext, useEffect } from 'react'; /* { useState }  */
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import Header from '../components/Header';

function Meals() {
  const { setTitle } = useContext(RecipesContext);

  useEffect(() => {
    setTitle('Meals');
  }, []);

  return (
    <div className="container_meals">
      <Header />
      <h1>Tela principal de receitas de comidas</h1>
    </div>
  );
}

export default Meals;
