import React from 'react'; /* , { useState, useContext, useEffect }  */
import { Link } from 'react-router-dom'; /* , { useLocation }  */
import '../styles/header.css';
import profileIcon from '../images/profileIcon.svg';

function Recipes() {
  return (
    <div className="container_recipes">
      <header className="container_header">
        {/* <h1 data-testid="page-title">{ title }</h1> */}
        <h1 data-testid="page-title">Done Recipes</h1>
        <Link to="/profile">
          <button
            type="button"
            className="button_header"
            data-testid="profile-top-btn"
            src={ profileIcon }
          >
            <img
              src={ profileIcon }
              width="18px"
              alt="perfil"
              name="profileIcon"
            />
          </button>
        </Link>
      </header>
      <h1>Tela principal de receitas feitas</h1>
    </div>
  );
}

export default Recipes;
