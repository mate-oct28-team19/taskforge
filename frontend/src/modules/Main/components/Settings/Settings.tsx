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

interface Props {
  closeModalWin: () => void;
}

export const Settings: React.FC<Props> = ({ closeModalWin }) => {
  const [password, setPassword] = useState<string>('');
  const [passwordIsOkay, setPasswordIsOkay] = useState<boolean>(false);
  const [passwordFieldIsFocused, setPasswordFieldIsFocused] = useState<boolean>(false);

  const { token, setToken } = useContext(TokenContext);
  const { setAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  const changePasswordHandler = () => {
    UserService.changePassword(token, password);
    closeModalWin();
  }

  const deleteAccountHandler = () => {
    UserService.deleteAccount(token);
    setToken('');
    setAuth(false);
    closeModalWin();
  }

  const handlerOnFocusPasswordField = (): void => {
    setPasswordFieldIsFocused(true);
  }

  const handlerOnBlurPasswordField = (): void => {
    setPasswordFieldIsFocused(false);
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

        <div className="settingsWindow__password-field">
          { passwordFieldIsFocused && <ValidatePassword password={password} setPasswordIsOk={setPasswordIsOkay}/> }

          <input
            type="password"
            className={classNames(
              "settingsWindow__input",
              { "settingsWindow__input--dark": theme === 'DARK' }
              )}
            placeholder="New password..."
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
          Change
        </button>

        <button
          className={classNames(
            "settingsWindow__button",
            { "settingsWindow__button--dark": theme === 'DARK' }
          )}
          onClick={deleteAccountHandler}
        >
          Delete account
        </button>
      </div>
    </div>
  );
};
