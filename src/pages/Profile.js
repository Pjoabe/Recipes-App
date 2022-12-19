import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/profile.css';

function Profile() {
  const [email, setEmail] = useState();
  const { setTitle } = useContext(RecipesContext);
  const history = useHistory();

  const getEmail = () => {
    const user = localStorage.getItem('user');
    setEmail(user === null ? '' : JSON.parse(user).email);
  };

  useEffect(() => {
    setTitle('Profile');
    getEmail();
  }, []);

  return (
    <div className="container_profile">
      <Header />
      <div className="box_profile">
        <h2 data-testid="profile-email">{ email }</h2>
        <button
          id="btnDoneProfile"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          id="btnFavoriteProfile"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          id="btnLogoutProfile"
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
