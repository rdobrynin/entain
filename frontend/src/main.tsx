import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Store } from 'redux';
import { History } from 'history';
import { ThemeProvider } from '@emotion/react';
import * as themes from './styles';

import {LayoutContainer} from "./containers/LayoutContainer.tsx";
import {Routes} from "./routes.tsx";
import {IApplicationState} from "./store";
interface IMainProps {
  store: Store<IApplicationState>;
  history: History;
}

export const Main: React.FC<IMainProps> = ({ store, history }) => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LayoutContainer>
          {() => (
            <ThemeProvider theme={themes["coin"]}>
              <Routes />
            </ThemeProvider>
          )}
        </LayoutContainer>
      </ConnectedRouter>
    </Provider>
);
