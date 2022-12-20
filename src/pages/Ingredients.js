import React from 'react';

function Ingredients({ ingredients }) {
  return (
    <div className="box_details">
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>))}
      </ul>
    </div>
  );
}

Ingredients.propTypes = {}.isRequired;

export default Ingredients;
