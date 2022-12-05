import React, { useContext } from 'react'; /* { useEffect, useState } */
import { Link } from 'react-router-dom'; /* { useLocation } */
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Header() {
  const { title } = useContext(RecipesContext);
  // /*define o título da página dinamicamente(não está sendo utilizado pois parece que o título deve ser estático*/
  // const [title, setTitle] = useState('');
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   setTitle(pathname.replace('/', ''));
  // }, []);

  // const { isDisable, name, chave, loading, dados, artist } = useContext(StarWarsContext);

  // const [inputs, setInputs] = useState({ name: '' });

  // const [sort, setSort] = useState({
  //   column: 'population',
  //   direction: 'ASC',
  // });

  return (
    <header className="container_header">
      <h1 data-testid="page-title">{ title }</h1>
      { (title !== 'Profile' && title !== 'Done Recipes' && title !== 'Favorite Recipes')
      && (
        <Link to="/search">
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
