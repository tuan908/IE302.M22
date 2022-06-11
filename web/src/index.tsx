import { ThemeProvider } from '@mui/material';
import 'normalize.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './redux/store';
import globalTheme from './util/style/globalTheme';
import 'bootstrap/dist/css/bootstrap.min.css';

const appContainer = document.getElementById('root')!;
const appRootNode = createRoot(appContainer);

appRootNode.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
