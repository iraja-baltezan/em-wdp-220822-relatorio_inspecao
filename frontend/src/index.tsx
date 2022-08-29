import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppContextProvider from './state/AppContextProvider';
import App from './App';
import HomePage from './routes/HomePage';
import DocCreatePage from './routes/DocCreatePage';
import DocReadPage from './routes/DocReadPage';
import DocUpdatePage from './routes/DocUpdatePage';
import NoMatchPage from './routes/NoMatchPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='/docs' element={<DocReadPage />} />
            <Route path='/doc/new' element={<DocCreatePage />} />
            <Route path='/doc/:id' element={<DocUpdatePage />} />
            <Route path='*' element={<NoMatchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);
