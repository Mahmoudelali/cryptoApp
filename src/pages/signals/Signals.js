import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import Signalspost from '../../components/Signalspost.js';

const Signals = () => {
	const [signals, setSignals] = useState(null);
	const [loading, setLoading] = useState(true);
	const uri = 'http://127.0.0.1:8000/api/signals';

	useEffect(() => {
		axios
			.get(uri)
			.then((res) => {
				console.log(res);
				setSignals(res.data);
				setLoading(false);
			})
			.catch((err) => console.log('error', err.message));
	}, []);

	return (
		<div className="pt-7">
			<h1 className="text-3xl text-center mb-10 font-bold">Signals</h1>
			<div className="rounded shadow p-4 pt-8 m-4 flex flex-wrap w-[80%] mx-auto ">
				{loading ? (
					// <div className="bg-red-400 ">
					<Loader />
				) : (
					signals.map((item, index) => <Signalspost {...item} />)
				)}
			</div>
		</div>
	);
};
export default Signals;
