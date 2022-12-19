import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/profile.css';

function Profile() {
  const [email, setEmail] = useState();
  const { setTitle } = useContext(RecipesContext);

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
        <Link to="/done-recipes">
          <button
            id="btnDoneProfile"
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            id="btnFavoriteProfile"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            id="btnLogoutProfile"
            type="button"
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
