import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogPost from '../../components/BlogPost';
import Loader from '../../components/Loader';

const News = () => {
	const [news, setNews] = useState(null);
	const [loading, setLoading] = useState(true);
	const uri = 'http://127.0.0.1:8000/api/news';

	console.log('resdered');
	useEffect(() => {
		axios
			.get(uri)
			.then((res) => {
				setTimeout(() => {
					setNews(res.data);
					setLoading(false);
				}, 2000);
			})
			.catch((err) => console.log('error', err.message));
	}, []);

	return (
		<div className="rounded shadow p-4 pt-8 m-4">
			<h1 className="text-3xl text-center mb-10 font-bold">
				Latest News
			</h1>
			{loading ? (
				// <div className="bg-red-400 ">
				<Loader />
			) : (
				// </div>
				news.map(({ title, content, image, id }, index) => (
					<BlogPost
						title={title}
						key={id}
						content={content}
						image={image}
					/>
				))
			)}
		</div>
	);
};

export default News;
