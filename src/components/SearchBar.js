import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';

export default function SearchBar() {
  const { recipeSearch, setRecipeSearch, setStatusSearch,
    showInput, setShowInput } = useContext(RecipesContext);

  const FIRST_LETTER = 'primeira-letra';

  const valideFirstLetter = () => {
    if (recipeSearch.search === FIRST_LETTER && recipeSearch.name.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setRecipeSearch({ ...recipeSearch, name: recipeSearch.name.slice(0, 1) });
    } else if (recipeSearch.search === FIRST_LETTER
    && recipeSearch.name.length === 0) {
      global.alert('Your search must have 1 (one) character');
    }
  };

  useEffect(() => {
    setShowInput(false);
    setRecipeSearch({ name: '', search: '' });
  }, []);

  useEffect(() => {
    valideFirstLetter();
  }, [recipeSearch]);

  return (
    <div className="search_input_header">
      { (showInput === true)
        && (
          <div>
            <input
              type="text"
              className="searchInput"
              data-testid="search-input"
              id="searchInput"
              name="search"
              placeholder="Find recipes"
              value={ recipeSearch.name }
              onChange={ (e) => {
                setStatusSearch(false);
                setRecipeSearch({ ...recipeSearch, name: e.target.value });
              } }
            />
            <h3>Search for</h3>
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
                      setStatusSearch(false);
                      setRecipeSearch({ ...recipeSearch, search: e.target.value });
                    } }
                    checked={ recipeSearch.search === 'ingrediente' }
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
                      setStatusSearch(false);
                      setRecipeSearch({ ...recipeSearch, search: e.target.value });
                    } }
                    checked={ recipeSearch.search === 'nome' }
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
                      setStatusSearch(false);
                      setRecipeSearch({ ...recipeSearch, search: e.target.value });
                    } }
                    checked={ recipeSearch.search === FIRST_LETTER }
                  />
                  First letter
                </label>
              </div>
            </div>
            <button
              type="button"
              className="button_search_header"
              data-testid="exec-search-btn"
              onClick={ () => {
                if (recipeSearch.search === '') {
                  global.alert('Select an option');
                } else if (recipeSearch.name === '') {
                  global.alert('Your search must have 1 (one) character');
                } else {
                  setStatusSearch(true);
                  setRecipeSearch({ ...recipeSearch, search: recipeSearch.search });
                }
              } }
            >
              Search
            </button>
          </div>
        )}
    </div>
  );
}
