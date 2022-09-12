import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import DocContextProvider from './state/DocContextProvider';
import ThemeProvider from './state/ThemeProvider';
import routes from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <DocContextProvider>
      <ThemeProvider>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </ThemeProvider>
    </DocContextProvider>
  </React.StrictMode>
);
