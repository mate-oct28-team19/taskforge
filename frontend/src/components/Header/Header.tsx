import { useContext } from 'react';

import { LangContext } from "../../contexts/LangContext";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Header: React.FC = () => {
  const theme = useContext(ThemeContext);
  const lang = useContext(LangContext);
  
  return (
    <header className="header">
      
    </header>
  );
}