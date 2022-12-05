import React from 'react'; /* , { useState, useContext, useEffect }  */
import { Link } from 'react-router-dom'; /* , { useLocation }  */
import '../styles/header.css';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Drinks() {
  return (
    <div className="container_drinks">
      <header className="container_header">
        {/* <h1 data-testid="page-title">{ title }</h1> */}
        <h1 data-testid="page-title">Drinks</h1>
        <Link to="/profile">
          <button
            type="button"
            className="button_header"
            data-testid="search-top-btn"
            src={ searchIcon }
          >
            <img
              src={ searchIcon }
              width="18px"
              alt="pesquisa"
              name="searchIcon"
            />
          </button>
        </Link>
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
      <h1>Tela principal de receitas de drinks</h1>
    </div>
  );
}

export default Drinks;
