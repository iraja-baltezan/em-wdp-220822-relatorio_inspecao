import React from "react"
import { Route, Routes } from "react-router-dom"

import App from '../App';
import HomePage from './HomePage';
import DocImportPage from './DocImportPage';
import DocEditPage from './DocEditPage';
import DocPrintPage from './DocPrintPage';
import DocExportPage from './DocExportPage';
import NoMatchPage from './NoMatchPage';

const routes = (
    <Routes>
        <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='/docs' element={<HomePage />} />
            <Route path='/docs/import' element={<DocImportPage />} />
            <Route path='/docs/new' element={<DocEditPage />} />
            <Route path='/docs/:id' element={<DocEditPage />} />
            <Route path='/docs/print/:id' element={<DocPrintPage />} />
            <Route path='/docs/export/:id' element={<DocExportPage />} />
            <Route path='*' element={<NoMatchPage />} />
        </Route>
    </Routes>
)
export default routes