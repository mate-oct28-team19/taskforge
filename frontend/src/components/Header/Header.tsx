import { useContext } from 'react';
import './Header.scss';

import { LangContext } from "../../contexts/LangContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ButtonSwitchTheme } from '../../modules/ButtonSwitchTheme';
import { SwitchLang } from '../../modules/SwitchLang';
import { Lang } from '../../types/Lang';
import classNames from 'classnames';

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