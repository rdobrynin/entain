import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/js/bootstrap.js';
import { IntlProvider } from 'react-intl';
import messages_en from './lang/en.json';
import { Main } from './main';
import * as serviceWorker from './serviceWorker';
import {IApplicationState} from "./store";
import {configureStore} from "./configureStore.ts";

const history = createBrowserHistory();

const initialState = window.INITIAL_REDUX_STATE as IApplicationState;
const store = configureStore(history, initialState);
export const messages = {
  en: messages_en,
};

export const i18nConfig = {
  defaultLocale: 'en',
  messages,
};

const language = document.documentElement.lang;

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <IntlProvider
    locale={language}
    defaultLocale={i18nConfig.defaultLocale}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    messages={i18nConfig.messages[language] as string}
  >
    <Main store={store} history={history} />
  </IntlProvider>,
);

serviceWorker.unregister();
