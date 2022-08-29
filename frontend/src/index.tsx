import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppContextProvider from './state/AppContextProvider';
import routes from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);
