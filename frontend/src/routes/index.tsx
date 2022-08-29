import React from "react"
import { Route, Routes } from "react-router-dom"

import App from '../App';
import HomePage from './HomePage';
import DocEditPage from './DocEditPage';
import DocSelectPage from './DocSelectPage';
import NoMatchPage from './NoMatchPage';

const routes = (
    <Routes>
        <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='/docs' element={<DocSelectPage />} />
            <Route path='/doc/new' element={<DocEditPage />} />
            <Route path='/doc/:id' element={<DocEditPage />} />
            <Route path='*' element={<NoMatchPage />} />
        </Route>
    </Routes>
)
export default routes