import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/layout.js';
import Dashboard from './pages/dashboard/Dashboard.js';
import News from './pages/news/News.js';
import FavoriteCoin from './pages/favoriteCoin/FavoriteCoin.js';
import Signals from './pages/signals/Signals.js';
import Rumors from './pages/rumors/Rumors.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './pages/dashboard/navbar.js';
import Login from './pages/Login/Login.js';
import { useCookies } from 'react-cookie';
import SingleNews from './components/SingleNews.js';

function App() {
	const [cookies] = useCookies(['user']);

	return (
		<BrowserRouter>
			<Routes>
				{cookies.user ? (
					<Route path="/" element={<Layout />}>
						<Route
							path="*"
							element={<Navigate to="/dashboard" />}
						/>
						<Route
							path="/"
							element={<Navigate to="/dashboard" />}
						/>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/news" element={<News />} />

						<Route path="/news/:id" element={<SingleNews />} />
						<Route
							path="/favorite-coin"
							element={<FavoriteCoin />}
						/>
						<Route path="/signals" element={<Signals />} />
						<Route path="/rumors" element={<Rumors />} />
					</Route>
				) : (
					<>
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<Navigate to="/login" />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
