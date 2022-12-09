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
              // value={ recipeSearch.search }
              // onChange={ (e) => {
              //   setRecipeSearch({ ...recipeSearch, search: e.target.value });
              // } }
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
                    value="ingredientRadio"
                    id="ingredientRadio"
                    // onChange={ ({ target }) => setSort({ ...sort,
                    //   direction: target.value }) }
                    // checked={ sort.direction === 'ASC' }
                  />
                  Ingrediente
                </label>
              </div>
              <div className="radios">
                <label htmlFor="nameRadio">
                  <input
                    data-testid="name-search-radio"
                    type="radio"
                    name="radio"
                    className="radio"
                    value="nameRadio"
                    id="nameRadio"
                  // onChange={ ({ target }) => setSort({ ...sort,
                  //   direction: target.value }) }
                  // checked={ sort.direction === 'DESC' }
                  />
                  Nome
                </label>
              </div>
              <div className="radios">
                <label htmlFor="firstLetterRadio">
                  <input
                    data-testid="first-letter-search-radio"
                    type="radio"
                    name="radio"
                    className="radio"
                    value="firstLetterRadio"
                    id="firstLetterRadio"
                    // onChange={ ({ target }) => setSort({ ...sort,
                    //   direction: target.value }) }
                    // checked={ sort.direction === 'DESC' }
                  />
                  Primeira Letra
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
