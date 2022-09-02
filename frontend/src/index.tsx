import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// import AppContextProvider from './state/AppContextProvider';
import DocContextProvider from './state/DocContextProvider';
import routes from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <DocContextProvider>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </DocContextProvider>
  </React.StrictMode>
);
