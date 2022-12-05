import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import Header from '../components/Header';

function Drinks() {
  const { setTitle } = useContext(RecipesContext);

  useEffect(() => {
    setTitle('Drinks');
  }, []);

  return (
    <div className="container_drinks">
      <Header />
      <h1>Tela principal de receitas de drinks</h1>
    </div>
  );
}

export default Drinks;
