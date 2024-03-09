import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {persistor, store} from './App/store.ts';
import {PersistGate} from 'redux-persist/integration/react';
import {addInterceptors} from './axiosApi.ts';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
