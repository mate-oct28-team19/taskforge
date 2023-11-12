/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useState } from 'react';
import classNames from 'classnames';
import './RegistrationPage.scss';
import image from '../assets/registration-bg.png';
import { translator } from '../../../translator';

//   Contexts
import { LangContext } from '../../../contexts/LangContext';
import { ThemeContext } from '../../../contexts/ThemeContext';

//   Components
import { ConfirmEmailModalWindow } from '../../ConfirmEmail/ConfirmEmailModalWindow';

//   Handlers
import { onChangePasswordFieldHandler } from '../handlers/onChangePasswordFieldHandler';
import { onChangeEmailHandler } from '../handlers/onChangeEmailHandler';

//   API
import { registrateUser } from '../api/registrationAPI';
import { confirmEmail } from '../api/confirmEmailAPI';
import { Link, useNavigate } from 'react-router-dom';

export const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [confirmCodeFromServer, setConfirmCodeFromServer] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [userAlreadyRegistered, setUserAlreadyRegistered] = useState<boolean>(false);

  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  const [disableElemsForm, setDisableElemsForm] = useState<boolean>(false);
  const [modalWinIsOpened, setModalWinIsOpened] = useState<boolean>(false);
  const [emailIsConfirmed, setEmailIsConfirmed] = useState<boolean>(false);
  const [typeOfInputs, setTypeOfInputs] = useState<'password' | 'text'>('password');

  const regTranslate = translator[lang].registration;
  const navigate = useNavigate();

  const onSubmitHanlder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      const passwordOfUser = password;
      const repeatPasswordOfUser = repeatPassword;

      setDisableElemsForm(true);
      setTypeOfInputs('text');
      setPassword(regTranslate.labelPasswordMismatch);
      setRepeatPassword(regTranslate.labelPasswordMismatch);

      setTimeout(() => {
        setDisableElemsForm(false);
        setTypeOfInputs('password');
        setPassword(passwordOfUser);
        setRepeatPassword(repeatPasswordOfUser);
      }, 2000)
    } else {
      const body = {
        email,
        password,
        repeatPassword,
        colorScheme: theme,
        language: lang,
      }

      registrateUser(
        body,
        setToken,
        setConfirmCodeFromServer,
        setUserAlreadyRegistered,
        setModalWinIsOpened,
        setEmail,
        email,
      );
    }
  }

  const codeIsValid = (code: string): boolean => {
    if (code === confirmCodeFromServer.toString()) {
      confirmEmail(token, emailIsConfirmed, setEmailIsConfirmed);

      emailIsConfirmed && navigate('/dashboard');

      return true;
    }

    return false;
  }

  return (
    <div className="registration-page">
      <img src={image} alt="sideimage" />

      <form
        action="server/registration"
        className={classNames(
          'registration',
          { "registration--dark": theme === 'DARK' }
        )}
        method="post"
        onSubmit={onSubmitHanlder}
      >
        <p className={classNames(
          'registration__label',
          { "registration__label--dark": theme === 'DARK' }
        )}>
          { regTranslate.label } 
        </p>

        <input
          className={classNames(
            'registration__input',
            { 
              "registration__input--dark": theme === 'DARK',
              "registration__input--warning": userAlreadyRegistered
            }
          )}
          type="email"
          name="email"
          placeholder={regTranslate.placeholders.email}
          value={email}
          onChange={e => onChangeEmailHandler(e, setEmail)}
          disabled={userAlreadyRegistered}
          required
        />

        <input
          className={classNames(
            'registration__input',
            { 
              "registration__input--dark": theme === 'DARK',
              "registration__input--warning": disableElemsForm
            }
          )}
          type={typeOfInputs}
          name="password"
          placeholder={regTranslate.placeholders.password}
          value={password}
          onChange={e => onChangePasswordFieldHandler(e, setPassword)}
          required
          disabled={disableElemsForm}
        />

        <input
          className={classNames(
            'registration__input',
            { 
              "registration__input--dark": theme === 'DARK',
              "registration__input--warning": disableElemsForm
            }
          )}
          type={typeOfInputs}
          name="repeat-password"
          placeholder={regTranslate.placeholders.repeatPassword}
          value={repeatPassword}
          onChange={e => onChangePasswordFieldHandler(e, setRepeatPassword)}
          required
          disabled={disableElemsForm}
        />

        <Link
          to="/login"
          className={classNames(
            'registration__link-to-login',
            { "registration__link-to-login--dark": theme === 'DARK' }
          )}
        >
          { regTranslate.hrefToLogin }
        </Link>

        <input
          type="submit"
          value={ regTranslate.btnContinue }
          className={classNames(
            'registration__submit',
            { "registration__submit--dark": theme === 'DARK' }
          )}
          disabled={disableElemsForm}
        />

        <div className="registration__buttons">
          <button
            className={classNames(
              'registration__signup',
              'registration__signup--via-google',
              { "registration__signup--dark": theme === 'DARK' }
            )}
            type="button"
          >
            <svg width="34" height="34" fill="none" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" className="google">
              <path d="M22.9117 10.8383C21.3346 9.4342 19.295 8.66098 17.1834 8.66666C12.4784 8.66666 8.66675 12.3983 8.66675 17C8.66675 21.6017 12.4784 25.3333 17.1817 25.3333C22.9651 25.3333 25.1001 21.05 25.3334 17.695H18.4017" strokeWidth="3"/>
              <path d="M32 10.3333V23.6667C32 25.8768 31.122 27.9964 29.5592 29.5592C27.9964 31.122 25.8768 32 23.6667 32H10.3333C8.1232 32 6.00358 31.122 4.44078 29.5592C2.87797 27.9964 2 25.8768 2 23.6667V10.3333C2 8.1232 2.87797 6.00358 4.44078 4.44078C6.00358 2.87797 8.1232 2 10.3333 2H23.6667C25.8768 2 27.9964 2.87797 29.5592 4.44078C31.122 6.00358 32 8.1232 32 10.3333Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> 

            <span className="button__label">Google</span>
          </button>
          
          <button
            className={classNames(
              'registration__signup',
              'registration__signup--via-github',
              { "registration__signup--dark": theme === 'DARK' }
            )}
            type="button"
          >
            <svg width="34" height="34" fill="none" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" className="github">
              <path d="M31.4667 1.83167C30.245 0.61 28.775 0 27.055 0H6.24333C4.52333 0 3.05333 0.61 1.83167 1.83167C0.61 3.05333 0 4.52333 0 6.24333V27.055C0 28.775 0.61 30.245 1.83167 31.4667C3.05333 32.6883 4.52333 33.2983 6.24333 33.2983H11.1C11.4167 33.2983 11.655 33.2867 11.815 33.265C12.0012 33.2277 12.1692 33.1284 12.2917 32.9833C12.45 32.8167 12.53 32.575 12.53 32.2583L12.5183 30.7833C12.5117 29.8433 12.5083 29.1 12.5083 28.55L12.0083 28.6367C11.6917 28.695 11.2917 28.72 10.8067 28.7133C10.3011 28.704 9.79724 28.6533 9.3 28.5617C8.77067 28.4639 8.27238 28.2411 7.84667 27.9117C7.40082 27.5744 7.06829 27.1093 6.89333 26.5783L6.67667 26.0783C6.49405 25.6839 6.26462 25.3129 5.99333 24.9733C5.68333 24.5683 5.36833 24.295 5.05 24.15L4.9 24.0417C4.79541 23.9668 4.70027 23.8795 4.61667 23.7817C4.53682 23.6909 4.47108 23.5887 4.42167 23.4783C4.37833 23.3767 4.415 23.2933 4.53 23.2283C4.64667 23.1617 4.855 23.13 5.16 23.13L5.59333 23.1967C5.88167 23.2533 6.24 23.4267 6.665 23.715C7.0951 24.0082 7.45438 24.3937 7.71667 24.8433C8.05 25.435 8.45 25.8867 8.92 26.1983C9.39 26.5083 9.86333 26.665 10.34 26.665C10.8167 26.665 11.2283 26.6283 11.5767 26.5567C11.9135 26.487 12.2408 26.3773 12.5517 26.23C12.6817 25.2633 13.035 24.5167 13.6133 23.9967C12.864 23.9232 12.1213 23.7928 11.3917 23.6067C10.6797 23.4111 9.9949 23.1272 9.35333 22.7617C8.68207 22.3962 8.08917 21.9024 7.60833 21.3083C7.14667 20.73 6.76667 19.9717 6.47 19.0333C6.175 18.0933 6.02667 17.0083 6.02667 15.78C6.02667 14.0317 6.59667 12.5433 7.73833 11.3133C7.205 10 7.255 8.525 7.89 6.89333C8.31 6.76167 8.93167 6.86 9.755 7.185C10.5783 7.51 11.1817 7.78833 11.565 8.01833C11.9483 8.25167 12.255 8.44667 12.4867 8.605C13.8416 8.22792 15.2419 8.03838 16.6483 8.04167C18.08 8.04167 19.4667 8.23 20.8117 8.605L21.635 8.085C22.2683 7.70475 22.9363 7.38554 23.63 7.13167C24.3967 6.84167 24.98 6.76333 25.3867 6.89333C26.0367 8.52667 26.0933 10 25.5583 11.315C26.7 12.5433 27.2717 14.0317 27.2717 15.7817C27.2717 17.01 27.1233 18.0983 26.8267 19.0433C26.5317 19.99 26.1483 20.7483 25.6783 21.32C25.189 21.9065 24.5936 22.3955 23.9233 22.7617C23.2233 23.1517 22.5433 23.4333 21.885 23.6067C21.1555 23.7934 20.4128 23.9244 19.6633 23.9983C20.4133 24.6483 20.79 25.6733 20.79 27.075V32.2583C20.79 32.5033 20.825 32.7017 20.8983 32.8533C20.932 32.9264 20.9801 32.9919 21.0397 33.0461C21.0992 33.1002 21.169 33.1418 21.245 33.1683C21.405 33.225 21.545 33.2617 21.6683 33.275C21.7917 33.2917 21.9683 33.2967 22.1983 33.2967H27.055C28.775 33.2967 30.245 32.6867 31.4667 31.465C32.6867 30.245 33.2983 28.7733 33.2983 27.0533V6.24333C33.2983 4.52333 32.6883 3.05333 31.4667 1.83167Z" />
            </svg>

            <span className="button__label">GitHub</span>
          </button>
        </div>
      </form>

      {modalWinIsOpened && (
        <ConfirmEmailModalWindow
          closeModalWin={() => setModalWinIsOpened(false)}
          email={email}
          codeIsValid={codeIsValid}
        />
      )}
    </div>
  );
}