import { useContext, useState } from 'react';
import './Settings.scss';

import { CloseIcon } from '../../../../UI/CloseIcon/CloseIcon';

import { AuthContext } from '../../../../contexts/AuthContext';
import { TokenContext } from '../../../../contexts/TokenContext';
import { UserService } from '../../api/UserService';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { LangContext } from '../../../../contexts/LangContext';
import classNames from 'classnames';
import { ValidatePassword } from '../../../ValidatePassword';
import { translator } from '../../../../translator';
import { ButtonSwitchTheme } from '../../../ButtonSwitchTheme';
import { SwitchLang } from '../../../SwitchLang';

interface Props {
  closeModalWin: () => void;
  setModalContinueOpened: () => void;
  setCallbackForModalWinContinue: React.Dispatch<React.SetStateAction<() => void>>;
}

export const Settings: React.FC<Props> = ({
  closeModalWin,
  setModalContinueOpened,
  setCallbackForModalWinContinue,
}) => {
  const [password, setPassword] = useState<string>('');
  const [passwordIsOkay, setPasswordIsOkay] = useState<boolean>(false);
  const [passwordFieldIsFocused, setPasswordFieldIsFocused] = useState<boolean>(false);

  const { token, setToken } = useContext(TokenContext);
  const { setAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  const translate = translator[lang].dashboard;

  const changePasswordHandler = () => {
    UserService.changePassword(token, password);
    setToken('');
    setAuth(false);
    closeModalWin();
  }

  const deleteAccountHandler = () => {
    const deleteAccount = () => {
      UserService.deleteAccount(token);
      localStorage.setItem('taskforge-token', '');
      setToken('');
      setAuth(false);
      closeModalWin();
    }

    setCallbackForModalWinContinue(() => deleteAccount);
    setModalContinueOpened();
  }

  const handlerOnFocusPasswordField = (): void => {
    setPasswordFieldIsFocused(true);
  }

  const handlerOnBlurPasswordField = (): void => {
    setPasswordFieldIsFocused(false);
  }

  const logoutHandler = (): void => {
    localStorage.setItem('taskforge-token', '');
    closeModalWin();
    setAuth(false);
    setToken('');
  }

  return (
    <div className="settings">
      <div className={classNames(
        "settingsWindow",
        { "settingsWindow--dark": theme === 'DARK' }
      )}>
        <header className="settingsWindow__header">
          <CloseIcon closeModalWin={closeModalWin} />
        </header>

        <div className="settingsWindow__changeThemeLang">
          <SwitchLang />
          <ButtonSwitchTheme />
        </div>

        <div className="settingsWindow__password-field">
          { passwordFieldIsFocused && <ValidatePassword password={password} setPasswordIsOk={setPasswordIsOkay}/> }

          <input
            type="password"
            className={classNames(
              "settingsWindow__input",
              { "settingsWindow__input--dark": theme === 'DARK' }
              )}
            placeholder={translate.newPasswordPlaceholder}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={handlerOnFocusPasswordField}
            onBlur={handlerOnBlurPasswordField}
          />
        </div>

        <button
          className={classNames(
            "settingsWindow__button",
            { "settingsWindow__button--dark": theme === 'DARK' }
          )}
          disabled={!passwordIsOkay}
          onClick={changePasswordHandler}
        >
          {translate.changePasswordLabel}
        </button>

        <button
          className={classNames(
            "settingsWindow__button",
            { "settingsWindow__button--dark": theme === 'DARK' }
          )}
          onClick={logoutHandler}
        >
          {translate.logoutLabel}
        </button>
        
        <button
          className={classNames(
            "settingsWindow__button",
            { "settingsWindow__button--dark": theme === 'DARK' }
          )}
          onClick={deleteAccountHandler}
        >
          {translate.deleteAccountLabel}
        </button>
      </div>
    </div>
  );
};
