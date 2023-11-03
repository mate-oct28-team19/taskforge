import './RegistrationPage.scss';
import image from '../assets/registration-bg.png';
import { translator } from '../../../translator';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';

export const RegistrationPage: React.FC = () => {
  const { lang } = useContext(LangContext);
  const regTranslate = translator[lang].registration;

  return (
    <div className="registration-page">
      <img src={image} alt="sideimage" />

      <form action="" className="registration" method="post">
        <p className="registration__label">
          { regTranslate.label }
        </p>

        <input
          className="registration__input"
          type="email"
          name="email"
          placeholder={regTranslate.placeholders.email}
        />

        <input
          className="registration__input"
          type="password"
          name="password"
          placeholder={regTranslate.placeholders.password}
        />

        <input
          className="registration__input"
          type="password"
          name="repeat-password"
          placeholder={regTranslate.placeholders.repeatPassword}
        />

        <a href="#" className="registration__link-to-login">
          { regTranslate.hrefToLogin }
        </a>

        <input
          type="submit"
          value={ regTranslate.btnContinue }
          className="registration__submit"
        />
      </form>
    </div>
  );
}