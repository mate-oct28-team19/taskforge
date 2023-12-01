import { useContext } from 'react';
import classNames from 'classnames';
import './Header.scss';

import { ThemeContext } from "../../contexts/ThemeContext";

import { ButtonSwitchTheme } from '../../modules/ButtonSwitchTheme';
import { SwitchLang } from '../../modules/SwitchLang';

export const Header: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <header className="header">
      <p className={classNames(
        'header__logo',
        { "header__logo--dark": theme === 'DARK' } 
      )}>TaskForge</p>
      <div className='header__right'>
        <SwitchLang />
        <ButtonSwitchTheme />
      </div>
    </header>
  );
}