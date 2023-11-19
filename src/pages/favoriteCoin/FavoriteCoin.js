import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Loader from '../../components/Loader';
import CoinImageContainer from '../../components/CoinImageContainer';

function FavoriteCoin() {
	const [cookies] = useCookies(['user']);
	const user_id = cookies.user.user.id;
	const [favCoins, setFavCoins] = useState([]);

	const favCoinsURI = `${process.env.REACT_APP_SERVER_URL}/api/favorite-coins/create/`;
	useEffect(() => {
		axios
			.get(favCoinsURI)
			.then((res) => {
				setFavCoins(res.data);
			})
			.catch((err) => console.log('error', err.message));
	}, []);
	const userFavCoins =
		favCoins.length > 0 && favCoins.filter((coin) => coin.user == user_id);

	const tableHeaders = ['ID', 'Coin', 'coin name', 'price($)'];
	return !userFavCoins ? (
		<Loader />
	) : (
		<>
			<h1 className="text-3xl text-center mb-10 font-bold mt-5">
				Favorite Coins
			</h1>
			<table className="mx-auto mt-6">
				<tr className="bg-white  py-3 shadow-md">
					{tableHeaders.map((title, index) => (
						<td
							key={index}
							className="py-3 px-12 font-bold tracking-wide "
						>
							{title.toUpperCase()}
						</td>
					))}
				</tr>
				{favCoins &&
					userFavCoins.map((coin, index) => (
						<tr className=" font-semibold py-3 px-8  mb-2 text-center bg-white hover:bg-slate-800 hover:text-white  transition-all duration-200 shadow-md">
							<td className="py-4">#{index}</td>
							<td className="py-4 text-center flex justify-center content-center">
								<CoinImageContainer
									image={coin.image}
									name={coin.symbol}
								/>
							</td>
							<td className="py-4">{coin.name}</td>
							<td className="py-4"> {coin.price}</td>
						</tr>
					))}
			</table>
		</>
	);
}

export default FavoriteCoin;
