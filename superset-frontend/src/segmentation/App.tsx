import React, { useEffect } from 'react';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import logo from './oyster_logo.png';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AuthGuard from 'src/ea_oyster_components/auth/AuthGuard';
import MatxLayout from 'src/ea_oyster_components/MatxLayout/MatxLayoutSFC';
import { Store } from 'src/ea_oyster_components/redux/Store';
import { Provider } from 'react-redux';
import MatxTheme from 'src/ea_oyster_components/MatxLayout/MatxTheme/MatxTheme';
import { AuthProvider } from 'src/ea_oyster_components/contexts/JWTAuthContext';
import { GlobalCss, MatxSuspense } from 'src/ea_oyster_components/matx';
import Sidenav from 'src/ea_oyster_components/Sidenav';
import C1GlobalCss from 'src/ea_oyster_components/c1component/C1GlobalCss';
import { CookiesProvider, useCookies } from 'react-cookie';
import localStorageService from 'src/ea_oyster_components/services/localStorageService';
import SegementationLanding from './components/segmentation-landing/SegmentationLanding';
import SegmentationDetails from './components/segmentation-details/SegmentationDetails';
import CreateEditSegmentContainer from './components/CreateEditSegmentContainer';
import VennDiagramContainer from './components/venn-diagrams/VennDiagramsContainer';

export const App = () => {
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    localStorageService.setItem('refreshToken', cookies.refreshToken);
    localStorageService.setItem('accessToken', cookies.accessToken);
  }, []);

  return (
    <div style={{ paddingLeft: '3.5rem' }}>
      <CookiesProvider>
        <DndProvider backend={HTML5Backend}>
          <Provider store={Store}>
            <GlobalCss>
              <C1GlobalCss>
                <HashRouter>
                  <div>
                    <img
                      style={{ paddingLeft: '3.5rem' }}
                      src={logo}
                      alt="Oyster_logo"
                    />
                  </div>
                  <Sidenav />
                  <Switch>
                    <Route exact path="/" component={SegementationLanding} />
                    <Route
                      exact
                      path="/details/:segmentID"
                      component={SegmentationDetails}
                    />
                    <Route
                      exact
                      path="/edit/:segmentID"
                      component={CreateEditSegmentContainer}
                    />
                    <Route
                      exact
                      path="/create"
                      component={CreateEditSegmentContainer}
                    />
                    <Route
                      exact
                      path="/venn/:segmentIDs"
                      component={VennDiagramContainer}
                    />
                    <MatxLayout />
                  </Switch>
                </HashRouter>
              </C1GlobalCss>
            </GlobalCss>
          </Provider>
        </DndProvider>
      </CookiesProvider>
    </div>
  );
};

export default App;
