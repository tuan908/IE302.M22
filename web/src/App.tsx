import { ThemeProvider } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
// import PinterestDetail from './pages/Detail';
import PinterestHome from './pages/Home';
// import PinterestProfile from './pages/Profile';
import store, { persistedStore } from './redux/store';
import globalTheme from './style/globalTheme';
import UserUtils from './util/user';

interface AppProps {
  history?: History;
}

const App: FC<AppProps> = ({ history }: AppProps) => {
  const [isVerifiedPage, setIsVerifiedPage] = useState<boolean>(false);
  // const [pin, setNewPin] = useState<[] | null>([]);
  const { getUserInfo } = UserUtils;
  const userInfo = getUserInfo();
  const navigator = useNavigate();

  useEffect(() => {
    const isVerified = window.location.pathname === '/verify';
    setIsVerifiedPage(isVerified);

    if (isEmpty(userInfo)) {
      navigator('/login');
    } else {
      navigator('/home');
    }
  }, []);

  // const pages = [PinterestDetail, PinterestProfile];

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <ThemeProvider theme={globalTheme} />
        {!isVerifiedPage && <PinterestHome />}
      </PersistGate>
    </Provider>
  );
};

export default App;
