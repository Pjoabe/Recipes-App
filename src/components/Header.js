import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; /* { useLocation } */
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Header() {
  const [showInput, setShowInput] = useState(false);

  const { title } = useContext(RecipesContext);
  const { recipeSearch, setRecipeSearch } = useContext(RecipesContext); // salva o valor do search no contexto
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

  const valideFirstLetter = () => {
    if (recipeSearch.search === 'primeira-letra' && recipeSearch.name.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setRecipeSearch({ ...recipeSearch, name: recipeSearch.name.slice(0, 1) });
    } else if (recipeSearch.search === 'primeira-letra'
    && recipeSearch.name.length === 0) {
      global.alert('Your search must have 1 (one) character');
    }
  };

  // const filterData = () => {
  //   const dataFilter = data.filter((el) => el.name.toUpperCase()
  //     .includes(inputs.name.toUpperCase()));
  //   setSearch(dataFilter);
  // };

  useEffect(() => {
    setShowInput(false);
  }, []);

  useEffect(() => {
    valideFirstLetter();
  }, [recipeSearch]);

  return (
    <header className="container_header">
      <div className="main_header">
        <h1>Recipes app</h1>
        { (title !== 'Profile' && title !== 'Done Recipes'
        && title !== 'Favorite Recipes')
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
      </div>
      <div className="page_title_header">
        <h1 data-testid="page-title">{ title }</h1>
      </div>
      {
        (showInput === true)
        && (
          <div className="search_input_header">
            <input
              type="text"
              className="searchInput"
              data-testid="search-input"
              id="searchInput"
              name="search"
              placeholder="Encontre uma receita"
              value={ recipeSearch.name }
              onChange={ (e) => {
                setRecipeSearch({ ...recipeSearch, name: e.target.value });
              } }
            />
            <h3>Pesquisa por</h3>
            <div className="radio_container">
              <div className="radios">
                <label htmlFor="ingredientRadio">
                  <input
                    data-testid="ingredient-search-radio"
                    type="radio"
                    name="radio"
                    className="radio"
                    id="ingredientRadio"
                    value="ingrediente"
                    onChange={ (e) => {
                      setRecipeSearch({ ...recipeSearch, search: e.target.value });
                    } }
                  />
                  Ingredient
                </label>
              </div>
              <div className="radios">
                <label htmlFor="nameRadio">
                  <input
                    data-testid="name-search-radio"
                    type="radio"
                    name="radio"
                    className="radio"
                    id="nameRadio"
                    value="nome"
                    onChange={ (e) => {
                      setRecipeSearch({ ...recipeSearch, search: e.target.value });
                    } }
                  />
                  Name
                </label>
              </div>
              <div className="radios">
                <label htmlFor="firstLetterRadio">
                  <input
                    data-testid="first-letter-search-radio"
                    type="radio"
                    name="radio"
                    className="radio"
                    id="firstLetterRadio"
                    value="primeira-letra"
                    onChange={ (e) => {
                      setRecipeSearch({ ...recipeSearch, search: e.target.value });
                    } }
                  />
                  First letter
                </label>
              </div>
            </div>
            <button
              type="button"
              className="button_search_header"
              data-testid="exec-search-btn"
              // onClick={ () => setShowInput(!showInput) }
            >
              Pesquisar
            </button>
          </div>
        )
      }
    </header>
  );
}
