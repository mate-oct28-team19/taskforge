import { useContext } from 'react';
import './SwitchLang.scss';
import classNames from 'classnames';
import { ThemeContext } from '../../contexts/ThemeContext';
import { LangContext } from '../../contexts/LangContext';
import { AuthContext } from '../../contexts/AuthContext';
import { Lang } from '../../types/Lang';
import { switchLangAPI } from './api/switchLangAPI';
import { TokenContext } from '../../contexts/TokenContext';

export const SwitchLang: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LangContext);
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const { token, setToken } = useContext(TokenContext);

  const langToggle = (choosenLang: Lang) => {
    setLang(choosenLang);
    localStorage.setItem('taskforge-lang', choosenLang);

    if (isAuthenticated) {
      switchLangAPI(choosenLang, token, setAuth, setToken);
    }
  }

  return (
    <div className={classNames(
      'switch-lang',
      { "switch-lang--dark": theme === 'DARK' }
    )}>
      <div className={classNames(
        'switch-lang__back-white',
        {
          "switch-lang__back-white--choosen-eng": lang === "ENGLISH",
          "switch-lang__back-white--choosen-ua": lang === "UKRAINIAN",
          "switch-lang__back-white--choosen-pl": lang === "POLISH",
          "switch-lang__back-white--dark": theme === 'DARK',
        }
      )} />

      <span
        className={classNames(
          'switch-lang__label-eng',
          {
            "switch-lang__label-eng--active": lang === "ENGLISH" && theme === 'LIGHT',
            "switch-lang__label-eng--active-dark": lang === "ENGLISH" && theme === 'DARK',
          }
        )}
        onClick={() => langToggle("ENGLISH")}
      >
        ENG
      </span>

      <span
        className={classNames(
          'switch-lang__label-ua',
          {
            "switch-lang__label-ua--active": lang === "UKRAINIAN" && theme === 'LIGHT',
            "switch-lang__label-ua--active-dark": lang === "UKRAINIAN" && theme === 'DARK',
          }
        )}
        onClick={() => langToggle("UKRAINIAN")}
      >
        UA
      </span>

      <span
        className={classNames(
          'switch-lang__label-pl',
          {
            "switch-lang__label-pl--active": lang === "POLISH" && theme === 'LIGHT',
            "switch-lang__label-pl--active-dark": lang === "POLISH" && theme === 'DARK',
          }
        )}
        onClick={() => langToggle("POLISH")}
      >
        PL
      </span>
    </div>
  );
}