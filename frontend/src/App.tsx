import './reset.scss';
import './app.scss';

import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Theme } from './types/Theme';
import { ThemeContext } from './contexts/ThemeContext';
import { Lang } from './types/Lang';
import { LangContext } from './contexts/LangContext';
import classNames from 'classnames';
import { RegistrationPage } from './modules/Registration/RegistrationPage';
import { MainPage } from './modules/Main/MainPage';
import { LoginPage } from './modules/Login/LoginPage';

function App() {
  const [theme, setTheme] = useState<Theme>("LIGHT");
  const [lang, setLang] = useState<Lang>('ENGLISH');

  return (
    <div className={classNames(
      'App',
      { "App--dark": theme === 'DARK' }
      )}
    >
      <Router basename='/taskforge'>
        <LangContext.Provider value={{ lang, setLang }}>
          <ThemeContext.Provider value={{ theme, setTheme}}>
              <Header />

              <Routes>
                <Route path="/" index element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<MainPage />} />
              </Routes>

              <Footer />
          </ThemeContext.Provider>
        </LangContext.Provider>
      </Router>
    </div>
  );
}

export default App;
