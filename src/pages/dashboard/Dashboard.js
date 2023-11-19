import React, { useState, useEffect } from 'react';
import Navbar from './navbar.js';
import axios from 'axios';
import CoinImageContainer from '../../components/CoinImageContainer.js';
import Header from '../../components/header.js';
import Loader from '../../components/Loader.js';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useCookies } from 'react-cookie';

const tableHeaders = [
	'ID',
	'coin',
	'price($)',
	'24h',
	'volume($)',
	'market cap($)',
	'Favorite',
];

const Coins = (props) => {
	const favCoinsURI = `${process.env.REACT_APP_SERVER_URL}/api/favorite-coins/create/`;
	const [query, setQuery] = useState('');
	const [isFav, setIsFav] = useState(false);
	const [coins, setcoins] = useState([]);
	const [favCoins, setFavCoins] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [cookies] = useCookies(['user']);
	const user_id = cookies.user.user.id;
	const url = 'https://api.coingecko.com/api/v3/coins/';
	const favCoinURL = 'http://127.0.0.1:8000/api/favorite-coins/create/';
	const handleCheckFav = (e) => {
		const isFav =
			favCoins &&
			coins &&
			favCoins.filter((cn) => cn.name.toLowerCase() == e);

		if (isFav.length > 0) return <AiFillHeart size={25} />;
		return <AiOutlineHeart size={25} />;
	};

	const handleAddFavCoin = (e) => {
		const reqBody = {
			name: e.id,
			symbol: e.symbol,
			image: e.image.thumb,
			user: user_id,
			price: e.price,
		};

		axios
			.post(favCoinURL, reqBody)
			.then((response) => {
				console.log(response);
				getData();
			})
			.catch((error) => console.log(error));
	};

	const getData = () => {
		axios
			.get(favCoinsURI)
			.then((res) => {
				setFavCoins(res.data);
			})
			.catch((err) => console.log('error', err.message));
	};
	const getCoins = () => {
		axios
			.get(url)
			.then((res) => {
				setTimeout(() => {
					setcoins(res.data);
					setIsLoading(false);
				}, 2000);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		getData();
		getCoins();
	}, []);

	return (
		<div className="container w-full">
			<div className="flex items-center py-10">
				{isLoading ? (
					<Loader />
				) : (
					<table className="mx-auto block border-spacing-y-5 border-separate">
						<tr>
							<td colSpan={5}>
								<Header query={query} setQuery={setQuery} />
							</td>
						</tr>
						<tr className="bg-white  py-3 shadow-md">
							{tableHeaders.map((title, index) => (
								<td
									key={index}
									className="py-3 px-7 font-bold tracking-wide "
								>
									{title.toUpperCase()}
								</td>
							))}
						</tr>

						{coins
							.filter((coin) => coin.id.includes(query))
							.map(
								({ id, market_data, image, symbol }, index) => {
									return (
										<tr
											key={id}
											className=" font-semibold py-3 px-8  mb-2 text-center bg-white hover:bg-slate-800 hover:text-white  transition-all duration-200 shadow-md"
										>
											<td className="py-4">#{index}</td>
											<td>
												<CoinImageContainer
													image={image.large}
													name={id}
												/>
											</td>

											<td className="py-4 ">
												{market_data.current_price.usd}
											</td>

											<td className="py-4">
												{
													market_data.price_change_percentage_24h
												}
											</td>
											<td className="py-4">
												{market_data.total_volume.usd}
											</td>
											<td className="py-4">
												{market_data.market_cap.usd}
											</td>
											<td
												className="mt-3  flex flex-row justify-center items-center"
												onClick={() =>
													handleAddFavCoin({
														id,
														market_data,
														image,
														symbol,
														price: market_data
															.current_price.usd,
													})
												}
											>
												<button value={id}>
													{handleCheckFav(id)}
												</button>
											</td>
										</tr>
									);
								},
							)}
					</table>
				)}
			</div>
		</div>
	);
};
export default Coins;
