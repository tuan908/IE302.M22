import { ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import 'normalize.css';
import './index.css';
import store from './redux/store';
import globalTheme from './style/globalTheme';

const appContainer = document.getElementById('root')!;
const appRootNode = createRoot(appContainer);

console.log(store);

appRootNode.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
