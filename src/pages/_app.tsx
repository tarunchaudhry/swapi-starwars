import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { persister, store } from '../redux/configure-store';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />

    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </>
);

export default MyApp;
