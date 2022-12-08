import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; /* { useLocation } */
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Header() {
  const [showInput, setShowInput] = useState(false);
  // const [recipeSearch, setRecipeSearch] = useState({ search: '' }); // salva o valor do search no estado da página

  const { title } = useContext(RecipesContext);
  // /*define o título da página dinamicamente(não está sendo utilizado pois parece que o título deve ser estático*/
  // const [title, setTitle] = useState('');
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   setTitle(pathname.replace('/', ''));
  // }, []);

  // const [sort, setSort] = useState({
  //   column: 'population',
  //   direction: 'ASC',
  // });

  // const filterData = () => {
  //   const dataFilter = data.filter((el) => el.name.toUpperCase()
  //     .includes(inputs.name.toUpperCase()));
  //   setSearch(dataFilter);
  // };

  useEffect(() => {
    setShowInput(false);
  }, []);

  return (
    <header className="container_header">
      <h1 data-testid="page-title">{ title }</h1>
      {
        (showInput === true)
      && (
        <label htmlFor="searchInput">
          <input
            type="text"
            className="searchInput"
            data-testid="search-input"
            id="searchInput"
            name="search"
            placeholder="Encontre uma receita"
            // value={ recipeSearch.search }
            // onChange={ (e) => {
            //   setRecipeSearch({ ...recipeSearch, search: e.target.value });
            // } }
          />
        </label>
      )
      }
      { (title !== 'Profile' && title !== 'Done Recipes' && title !== 'Favorite Recipes')
      && (
        <button
          type="button"
          className="button_header"
          data-testid="search-top-btn"
          src={ searchIcon }
          onClick={ () => setShowInput(!showInput) }
        >
          <img
            src={ searchIcon }
            width="18px"
            alt="pesquisa"
            name="searchIcon"
          />
        </button>
      )}
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
  );
}
