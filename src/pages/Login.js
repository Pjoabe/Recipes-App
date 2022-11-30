import { useState } from 'react';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });

  function handleChange({ target }) {
    setLogin({
      ...login,
      [target.name]: target.value,
    });
  }

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          id="email"
          type="text"
          name="email"
          placeholder="email"
          value={ login.email }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        Password
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
        onClick={ () => console.log(login) }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
