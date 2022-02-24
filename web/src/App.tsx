import { isEmpty } from 'lodash';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store, { persistedStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material';
import globalTheme from './style/globalTheme';

interface AppProps {
  history?: History;
}

const App: FC<AppProps> = ({ history }: AppProps) => {
  const [isVerifiedPage, setIsVerifiedPage] = useState<boolean>(false);
  const [pin, setNewPin] = useState<[] | null>([]);
  const userInfo = user.getUserInfo();
  const navigator = useNavigate();

  useEffect(() => {
    const isVerified = window.location.pathname === '/verify';
    setIsVerifiedPage(isVerified);
  }, []);

  if (isEmpty(userInfo)) {
    navigator('/login');
  } else {
    navigator('/home');
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <ThemeProvider theme={globalTheme} />
      </PersistGate>
    </Provider>
  );
};

export default App;
