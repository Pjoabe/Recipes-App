import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/profile.css';

function Profile() {
  const { setTitle } = useContext(RecipesContext);

  useEffect(() => {
    setTitle('Profile');
  }, []);

  return (
    <div className="container_profile">
      <Header />
      <div className="box_profile">
        <label htmlFor="emailProfile">
          Email:
          <input
            type="email"
            name="emailProfile"
            data-testid="profile-email"
            placeholder="email@email.com"
            title="Invalid email address"
            required
          />
        </label>
        <button
          id="btnDoneProfile"
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          id="btnFavoriteProfile"
          type="button"
          data-testid="profile-favorite-btn"
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
