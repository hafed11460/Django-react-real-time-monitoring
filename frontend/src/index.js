import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/main/app.css'
import './assets/css/main/app-dark.css'
import Main from 'Main';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main>
        <App />
      </Main>
    </Provider>
  </React.StrictMode>
);
