import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const appContainer = document.getElementById('root')!;
const appRootNode = createRoot(appContainer);

appRootNode.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
