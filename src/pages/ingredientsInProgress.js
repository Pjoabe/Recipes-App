import React from 'react';

function IngredientsInProgress({ ingredients }) {
  return (
    <div className="box_details">
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <label
            data-testid={ `${index}-ingredient-step>` }
            key={ index }
            htmlFor={ `${index}-ingredient-step>` }
          >
            <input
              type="checkbox"
              name="ingredient-step"
              id={ `${index}-ingredient-step>` }
            />
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {ingredient}
            </li>
          </label>
        ))}
      </ul>
    </div>
  );
}

IngredientsInProgress.propTypes = {}.isRequired;

export default IngredientsInProgress;
