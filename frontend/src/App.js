import React from 'react';
import './App.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import RegisterPage from './pages/RegisterPage';
import FTLoginPage from './pages/FTLoginPage';
import AddFoodPage from './pages/AddFoodPage';
import AddWeightPage from './pages/AddWeightPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

function App() {
return (
	<BrowserRouter>
		<Routes>
			<Route path="/" index element={<LoginPage />} />
			<Route path="/cards" index element={<CardPage />} />
			<Route path="/register" index element={<RegisterPage />} />
			<Route path="/addFood" index element={<AddFoodPage />} />
			<Route path="/addWeight" index element={<AddWeightPage />} />
			<Route path="/ftLogin" index element={<FTLoginPage />} />
			<Route path="/verifyemail" index element={<VerifyEmailPage />} />
		</Routes>
	</BrowserRouter>
);
}

export default App;
