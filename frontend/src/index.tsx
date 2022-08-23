import React from 'react';
import ReactDOM from 'react-dom/client';

import IRFormsContextProvider from './state/IRFormsContext';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <IRFormsContextProvider>
      <App />
    </IRFormsContextProvider>
  </React.StrictMode>
);
