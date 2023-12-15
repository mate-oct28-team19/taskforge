import './reset.scss';
import './app.scss';

import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation, useNavigate} from 'react-router-dom';
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
import { AuthContext } from './contexts/AuthContext';
import { PrivateRoute } from './modules/PrivateRoute';
import { TokenContext } from './contexts/TokenContext';

function App() {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('taskforge-theme') as Theme || 'LIGHT');
  const [lang, setLang] = useState<Lang>(localStorage.getItem('taskforge-lang') as Lang || 'ENGLISH');
  const [token, setToken] = useState<string>(localStorage.getItem('taskforge-token') || '');
  const [isAuthenticated, setAuth] = useState<boolean>(!!token || false);
  const [settingsWinIsOpened, setSettingsWinIsOpened] = useState(false);

  useEffect(() => {
    setAuth(!!token);
  }, [token]);

  return (
    <div className={classNames(
      'App',
      { "App--dark": theme === 'DARK' },
      { "App--authed": isAuthenticated }
      )}
    >
      <Router >
        <TokenContext.Provider value={{ token, setToken }}>
          <LangContext.Provider value={{ lang, setLang }}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
                  <Header openSettings={() => setSettingsWinIsOpened(true)}/>

                  <Routes>
                    <Route path="/" index element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<PrivateRoute />}>
                      <Route path='/dashboard' element={
                        <MainPage
                          settingsWinIsOpened={settingsWinIsOpened}
                          closeSettings={() => setSettingsWinIsOpened(false)}
                        />
                      }/>
                    </Route>

                    <Route path="*" element={<Navigate to="/login" />} />
                  </Routes>
                </AuthContext.Provider>

                <Footer />
            </ThemeContext.Provider>
          </LangContext.Provider>
        </TokenContext.Provider>
      </Router>
    </div>
  );
}

export default App;
