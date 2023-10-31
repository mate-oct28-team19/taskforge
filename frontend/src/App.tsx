import { useState } from "react";
import { Lang } from "./types/Lang";
import { Theme } from "./types/Theme";
import { LangContext } from "./contexts/LangContext";
import { ThemeContext } from "./contexts/ThemeContext";
import { Footer } from "./components/Footer";
import './reset.scss';


function App() {
  const [lang, setLang] = useState<Lang>('ENGLISH');
  const [theme, setTheme] = useState<Theme>('LIGHT');

  return (
    <div className="App">
      <LangContext.Provider value={lang}>
        <ThemeContext.Provider value={theme}>
          <Footer></Footer>
        </ThemeContext.Provider>
      </LangContext.Provider>
    </div>
  );
}

export default App;
