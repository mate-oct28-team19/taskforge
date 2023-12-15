import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import image from '../assets/login-bg.png';
import './LoginPage.scss';

import { translator } from '../../../translator';

import { LangContext } from '../../../contexts/LangContext';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { AuthContext } from '../../../contexts/AuthContext';

import { onChangeEmailHandler } from '../../../handlers/onChangeEmailHandler';
import { onChangePasswordFieldHandler } from '../../../handlers/onChangePasswordFieldHandler';
import { Theme } from '../../../types/Theme';
import { Lang } from '../../../types/Lang';
import { loginUser } from '../api/loginAPI';
import { TokenContext } from '../../../contexts/TokenContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const { theme, setTheme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LangContext);
  const { setAuth } = useContext(AuthContext);
  const { setToken } = useContext(TokenContext);

  const login = translator[lang].login;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('taskforge-token');

    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const onSubmitHanlder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      email,
      password,
    }

    const callback = (token: string, lang: Lang, theme: Theme) => {
      if (token) {
        setToken(token);
        setTheme(theme);
        setLang(lang);
        setAuth(true);
        navigate('/dashboard');
        localStorage.setItem('taskforge-token', token);
      }
    } 

    loginUser(body, callback);
  }

  return (
    <div className="login-page">
      <img src={image} alt="sideimage" />

      <form
        className={classNames(
          'login',
          { "login--dark": theme === 'DARK' }
        )}
        method="post"
        onSubmit={onSubmitHanlder}
      >
        <p className={classNames(
          'login__label',
          { "login__label--dark": theme === 'DARK' }
        )}>
          { login.label }
        </p>

        <input
          className={classNames(
            'login__input',
            { "login__input--dark": theme === 'DARK' }
          )}
          type="email"
          name="email"
          placeholder={login.placeholders.email}
          value={email}
          onChange={e => onChangeEmailHandler(e, setEmail)}
          required
        />

        <input
          className={classNames(
            'login__input',
            { "login__input--dark": theme === 'DARK' }
          )}
          type="password"
          name="password"
          placeholder={login.placeholders.password}
          value={password}
          onChange={e => onChangePasswordFieldHandler(e, setPassword)}
          required
        />

        <Link
          to="/"
          className={classNames(
            'login__link-to-registration',
            { "login__link-to-registration--dark": theme === 'DARK' }
          )}
        >
          { login.hrefToLogin }
        </Link>

        <input
          type="submit"
          value={ login.btnContinue }
          className={classNames(
            'login__submit',
            { "login__submit--dark": theme === 'DARK' }
          )}
        />
      </form>
    </div>
  );
};
