import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		username: '',
		password: '',
		fullName: '',
		passConfirm: '',
	});

	useEffect(() => {
		const { username, password, fullName, passConfirm } = userData;
		if (
			fullName.length >= 5 &&
			username.length >= 5 &&
			password.length > 6 &&
			passConfirm === password
		) {
			setIsValid(true);
		} else setIsValid(false);
	}, [userData]);
	const uri = 'http://localhost:8000';

	const handleInputChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	const handleLogin = () => {
		axios
			.post(`${uri}/login`, {
				username: userData.username,
				password: userData.password,
			})
			.then((res) => {
				setCookie('user', res.data);
				navigate('/');
			})
			.then(() => {
				console.log('cookies', cookies.user);
			})
			.catch((err) => setError(true));
	};
	const handleRegister = () => {
		axios
			.post(`${uri}/signup`, {
				username: userData.username,
				password: userData.password,
			})
			.then((res) => {
				setCookie('user', res.data);
				navigate('/');
			})
			.then(() => {
				console.log('cookies', cookies.user);
			})
			.catch((err) => console.log(err.message));
	};

	const handleSubmitButton = (e) => {
		e.preventDefault();
		return isLogin ? handleLogin() : handleRegister();
	};
	return (
		<div className="h-screen w-screen flex justify-center items-center bg-[#eee] form form-container">
			<div className="bg-white  min-w-[380px] rounded-3xl overflow-hidden shadow-2xl">
				<header className="pb-3 pt-4  bg-slate-900 text-white ">
					<h1 className="text-xl text-center font-extrabold tracking-wider">
						Login
					</h1>
				</header>
				<main className="px-8 pt-8 pb-4">
					<form>
						{!isLogin && (
							<input
								onChange={handleInputChange}
								className="block  border-b-2 border-gray-500 mb-5 w-full pl-4 leading-8 rounded-b-sm"
								type="text"
								name="fullName"
								placeholder="Full Name"
							/>
						)}
						<input
							onChange={handleInputChange}
							className="block  border-b-2 border-gray-500 mb-5 w-full pl-4 leading-8 rounded-b-sm"
							type="text"
							name="username"
							placeholder="Username"
						/>
						<input
							onChange={handleInputChange}
							className="block  border-b-2 border-gray-500 mb-5 w-full pl-4 leading-8 rounded-b-lg"
							type="password"
							name="password"
							placeholder="Password"
						/>
						{!isLogin && (
							<input
								onChange={handleInputChange}
								className="block  border-b-2 border-gray-500 mb-5 w-full pl-4 leading-8 rounded-b-lg"
								type="password"
								name="passConfirm"
								placeholder="Re-enter password"
							/>
						)}
						{isLogin && (
							<label className="block leading-8 my-2 pl-3 mb-4 italic font-semibold text-sm">
								Forgot password?
							</label>
						)}

						<button
							onClick={handleSubmitButton}
							disabled={isLogin ? false : isValid ? false : true}
							type="submit"
							style={{
								backgroundColor: isLogin
									? 'rgb(15, 23, 42 , 1)'
									: isValid
									? 'rgb(15, 23, 42 , 1)'
									: 'gray',
							}}
							className="text-white  text-center py-2 w-full rounded-3xl font-semibold tracking-widest"
						>
							{isLogin ? 'Login' : 'Register'}
						</button>
						{error && (
							<span className="text-center text-sm text-red-600 block mt-1 font-semibold">
								Invalid credentials, please try again!
							</span>
						)}
					</form>

					<p className="text-center pt-3 pb-2 text-sm">
						<>
							<span>
								{isLogin
									? 'Not a member?'
									: 'Already have an account?'}{' '}
							</span>
							<a
								href="#"
								className="text-slate-900 font-semibold"
								onClick={() => setIsLogin((prev) => !prev)}
							>
								{isLogin ? 'Signup' : 'Login'}
							</a>
						</>
					</p>
				</main>
			</div>
		</div>
	);
};

export default Login;
