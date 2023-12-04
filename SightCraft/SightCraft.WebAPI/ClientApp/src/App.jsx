import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { theme } from './themeOptions';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import { NavPathes } from './utils/navpathes';
import Main from './components/main/Main';
import LogIn from './components/authorization/log-in/LogIn';
import Registration from './components/authorization/registration/Registration';
import SightDetailed from './components/sight-detailed/SightDetailed';
import SightCreation from './components/sight-creation/SightCreation';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Header />
            <main>
              <Routes>
                <Route path={NavPathes.MAIN()} element={<Main />} />
                <Route path={NavPathes.LOG_IN()} element={<LogIn />} />
                <Route
                  path={NavPathes.REGISTRATION()}
                  element={<Registration />}
                />
                <Route
                  path={`${NavPathes.SIGHTS()}/:id`}
                  element={<SightDetailed />}
                />
                <Route
                  path={NavPathes.SIGHT_CREATION()}
                  element={<SightCreation />}
                />
              </Routes>
            </main>
            <Footer />
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
