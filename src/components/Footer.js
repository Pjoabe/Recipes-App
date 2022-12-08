import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (

    <footer data-testid="footer">
      <center>
        <Link to="/drinks">
          <button
            type="button"
            className="button_header"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
          >
            <img
              src={ drinkIcon }
              width="18px"
              alt="drinkIcon"
              name="drinkIcon"
            />
          </button>
        </Link>

        <Link to="/meals">
          <button
            type="button"
            className="button_header"
            data-testid="meals-bottom-btn"
            src={ mealIcon }
          >
            <img
              src={ mealIcon }
              width="18px"
              alt="mealIcon"
              name="mealIcon"
            />
          </button>
        </Link>

      </center>
    </footer>
  );
}
