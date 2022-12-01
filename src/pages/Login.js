import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/login.css';

function Login({ history }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [btnDisabled, setBtnDisabled] = useState(true);

  function verifyLogin() { /* faz a verificação dos inputs de email e password */
    const { email, password } = login;
    const minPassword = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{3}$/g;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length > minPassword;
    const btnState = verifyEmail && verifyPassword;
    console.log(verifyEmail, verifyPassword);
    setBtnDisabled(!btnState);
  }

  function handleChange({ target }) {
    setLogin({
      ...login,
      [target.name]: target.value,
    });
  }

  function onSubmit() {
    const user = { email: login.email };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  }

  useEffect(() => {
    verifyLogin();
  }, [login]);

  return (
    <div className="container_login">
      <form className="box_login">
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            id="email"
            type="email"
            name="email"
            placeholder="email"
            value={ login.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="password-input"
            id="password"
            type="password"
            name="password"
            placeholder="password"
            value={ login.password }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          onClick={ onSubmit }
          disabled={ btnDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
