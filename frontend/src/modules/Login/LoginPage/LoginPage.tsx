import { useContext, useState } from 'react';
import classNames from 'classnames';

import { translator } from '../../../translator';
import { LangContext } from '../../../contexts/LangContext';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './LoginPage.scss';

export const LoginPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  return (
    <div className="login-page">
      
    </div>
  );
};
