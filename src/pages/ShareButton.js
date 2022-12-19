import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [copyState, setCopyState] = useState(false);

  const copyOnClick = () => {
    const url = window.location.href;
    setCopyState(true);
    copy(url);
  };

  return (
    <div>
      { copyState && <p>Link copied!</p> }
      <button
        type="button"
        onClick={ copyOnClick }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="share Icon"
        />
      </button>
    </div>
  );
}

export default ShareButton;
