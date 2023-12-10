/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { onChangePasswordFieldHandler } from '../../../handlers/onChangePasswordFieldHandler';
import { onChangeEmailHandler } from '../../../handlers/onChangeEmailHandler';

//   API
import { registrateUser } from '../api/registrationAPI';
import { confirmEmail } from '../api/confirmEmailAPI';
import { AuthContext } from '../../../contexts/AuthContext';
import { TokenContext } from '../../../contexts/TokenContext';
import { ValidatePassword } from '../../ValidatePassword';

export const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [confirmCodeFromServer, setConfirmCodeFromServer] = useState<string>('');
  const [userAlreadyRegistered, setUserAlreadyRegistered] = useState<boolean>(false);

  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  const { setAuth } = useContext(AuthContext);
  const { token, setToken } = useContext(TokenContext);

  const [disableElemsForm, setDisableElemsForm] = useState<boolean>(false);
  const [modalWinIsOpened, setModalWinIsOpened] = useState<boolean>(false);
  const [emailIsConfirmed, setEmailIsConfirmed] = useState<boolean>(false);
  const [typeOfInputs, setTypeOfInputs] = useState<'password' | 'text'>('password');

  const [passwordFieldIsFocused, setPasswordFieldIsFocused] = useState<boolean>(false);
  const [passwordRepeatFieldIsFocused, setPasswordRepeatFieldIsFocused] = useState<boolean>(false);
  const [passwordIsOk, setPasswordIsOk] = useState<boolean>(false)

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
        lang,
      );
    }
  }

  const codeIsValid = (code: string): boolean => {
    if (code === confirmCodeFromServer.toString()) {
      confirmEmail(token, emailIsConfirmed, setEmailIsConfirmed, setAuth);

      emailIsConfirmed && navigate('/dashboard');

      return true;
    }

    return false;
  }

  const handlerOnFocusPasswordField = (): void => {
    setPasswordFieldIsFocused(true);
  }

  const handlerOnBlurPasswordField = (): void => {
    setPasswordFieldIsFocused(false);
  }

  const handlerOnFocusPasswordRepeatField = (): void => {
    setPasswordRepeatFieldIsFocused(true);
  }

  const handlerOnBlurPasswordRepeatField = (): void => {
    setPasswordRepeatFieldIsFocused(false);
  }

  return (
    <div className="registration-page">
      <img src={image} alt="sideimage" />

      <form
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
        <div className="password__field">
          { passwordFieldIsFocused && <ValidatePassword password={password} setPasswordIsOk={setPasswordIsOk} /> }

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
            onFocus={handlerOnFocusPasswordField}
            onBlur={handlerOnBlurPasswordField}
            required
            disabled={disableElemsForm}
          />
        </div>
        
        <div className="password__field">
          { passwordRepeatFieldIsFocused && <ValidatePassword password={repeatPassword} setPasswordIsOk={setPasswordIsOk} /> }

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
            onFocus={handlerOnFocusPasswordRepeatField}
            onBlur={handlerOnBlurPasswordRepeatField}
            required
            disabled={disableElemsForm}
          />
        </div>
        

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
          disabled={disableElemsForm || !passwordIsOk}
        />
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