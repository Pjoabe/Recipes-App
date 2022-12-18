import React from 'react';

function Ingredients({ ingredients }) {
  return (
    <div className="box_details">
      <h2>Ingredients</h2>
      {ingredients.map((ingredient, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </p>))}
    </div>
  );
}

Ingredients.propTypes = {}.isRequired;

export default Ingredients;
