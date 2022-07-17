import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import RegisterPage from './pages/RegisterPage';
import AddFoodPage from './pages/AddFoodPage';
import AddWeightPage from './pages/AddWeightPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/cards" index element={<CardPage />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/addFood" index element={<AddFoodPage />} />
        <Route path="/addWeight" index element={<AddWeightPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;