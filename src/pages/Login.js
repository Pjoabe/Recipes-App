import { useEffect, useState } from 'react';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [btnDisabled, setBtnDisabled] = useState(true);

  function verifyLogin() { /* faz a verificação dos inputs de email e password */
    const { email, password } = login;
    const minPassword = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{3}$/g;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length > minPassword;
    const btnState = verifyEmail && verifyPassword;
    setBtnDisabled(!btnState);
  }

  function handleChange({ target }) {
    setLogin({
      ...login,
      [target.name]: target.value,
    });
  }

  useEffect(() => {
    verifyLogin();
  }, [login]);

  return (
    <form>
      <label htmlFor="email">
        Email
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
        disabled={ btnDisabled }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
