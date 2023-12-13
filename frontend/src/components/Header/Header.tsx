import { useContext } from 'react';
import classNames from 'classnames';
import './Header.scss';

import { ThemeContext } from "../../contexts/ThemeContext";

import { ButtonSwitchTheme } from '../../modules/ButtonSwitchTheme';
import { SwitchLang } from '../../modules/SwitchLang';
import { SettingsIcon } from '../../UI/SettingsIcon/SettingsIcon';
import { AuthContext } from '../../contexts/AuthContext';

export const Header: React.FC<{ openSettings: () => void }> = ({ openSettings }) => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <header className={classNames(
      "header",
      { "header--auth": isAuthenticated === true }
    )}>
      <p className={classNames(
        'header__logo',
        { "header__logo--dark": theme === 'DARK' } 
      )}>TaskForge</p>
      <div className='header__right'>
        <SwitchLang />
        <ButtonSwitchTheme />
        {isAuthenticated && <SettingsIcon openSettings={openSettings}/>}
      </div>
      <div className="header__right-mobile">
        {isAuthenticated && <SettingsIcon openSettings={openSettings}/>}
      </div>
    </header>
  );
}