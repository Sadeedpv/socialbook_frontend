import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Posts from './pages/Posts';
import Update from './pages/Update';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Header />
  <BrowserRouter>
`  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/addposts" element={<Posts />} />
    <Route path="/update/:id" element={<Update />} />
  </Routes>`
  </BrowserRouter>
  </>
);