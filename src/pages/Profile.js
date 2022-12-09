import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const { setTitle } = useContext(RecipesContext);

  useEffect(() => {
    setTitle('Profile');
  }, []);

  return (
    <>
      <div className="container_profile">
        <Header />
        <h1>Profile</h1>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
