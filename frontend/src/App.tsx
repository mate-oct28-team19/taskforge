import './reset.scss';
import './app.scss';

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useState } from 'react';
import { Theme } from './types/Theme';
import { ThemeContext } from './contexts/ThemeContext';
import { Lang } from './types/Lang';
import { LangContext } from './contexts/LangContext';

function App() {
  const [theme, setTheme] = useState<Theme>('DARK');
  const [lang, setLang] = useState<Lang>('ENGLISH');

  return (
    <div className="App" style={{ backgroundColor: (theme === 'DARK' && '#303747') || 'white' }}>
      <LangContext.Provider value={{ lang, setLang }}>
        <ThemeContext.Provider value={{ theme, setTheme}}>
          <Header></Header>
          <Footer></Footer>
        </ThemeContext.Provider>
      </LangContext.Provider>
    </div>
  );
}

export default App;
