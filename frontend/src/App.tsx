import './reset.scss';

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useState } from 'react';
import { Theme } from './types/Theme';
import { ThemeContext } from './contexts/ThemeContext';
import { Lang } from './types/Lang';
import { LangContext } from './contexts/LangContext';

function App() {
  const [theme, setTheme] = useState<Theme>('LIGHT');
  const [lang, setLang] = useState<Lang>('ENGLISH');

  return (
    <div className="App">
      <button onClick={() => setTheme('LIGHT')}>Light</button>
      <button onClick={() => setTheme('DARK')}>Dark</button>
      <button onClick={() => setLang('ENGLISH')}>Eng</button>
      <button onClick={() => setLang('POLISH')}>Polish</button>
      <button onClick={() => setLang('UKRAINIAN')}>Ukrainian</button>
      <LangContext.Provider value={lang}>
        <ThemeContext.Provider value={theme}>
          <Header></Header>
          <Footer></Footer>
        </ThemeContext.Provider>
      </LangContext.Provider>
    </div>
  );
}

export default App;
