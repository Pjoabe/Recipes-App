import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { foodDetails, drinkDetails } from '../services/Apis';

function RecipeDetails({ match: { params: { idDaReceita } } }) {
  // console.log(idDaReceita);
  const history = useHistory();
  const [details, setDetails] = useState('');
  console.log(details);
  const { pathname } = history.location;
  useEffect(() => {
    const results = async () => {
      if (pathname.includes('meals')) {
        const responseMealsDetails = await foodDetails(idDaReceita);
        setDetails(responseMealsDetails);
      } else {
        const responseDrinksDetails = await drinkDetails(idDaReceita);
        setDetails(responseDrinksDetails);
      }
    };
    results();
  }, [history.location]);
  return (
    <h1>Recipe details</h1>
  );
}

RecipeDetails.propTypes = {}.isrequired;

export default RecipeDetails;
