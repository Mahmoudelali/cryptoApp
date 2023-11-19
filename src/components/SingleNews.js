import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader.js';
import Comment from './comment.js';
import userImage from '../images/user.png';

const SingleNews = () => {
	const [news, setNews] = useState(null);
	console.log('news', news);

	useEffect(() => {
		const getUrlParam = () => {
			const url = window.location.href;
			const urlLength = url.length;
			const param = url.split('')[urlLength - 1];
			console.log(param);
			return param;
		};
		const newsId = getUrlParam();
		const newsUri =
			`${process.env.REACT_APP_SERVER_URL}/api/news/` + newsId;
		axios
			.get(newsUri)
			.then((res) => setNews(res.data))
			.catch((err) => console.log(err.message));
	}, []);

	return !news ? (
		<Loader />
	) : (
		<div className="pt-16 bg-[#eee]">
			<div className="w-[70%] h-[95%] mx-auto  border-2 ">
				<div className="h-72 bg-gray-200 w-full overflow-hidden relative">
					<div className="absolute z-40 bg-[#00025] inset-0" />
					<img
						src={
							`${process.env.REACT_APP_SERVER_URL}/api` +
							news.image
						}
						className="min-w-full h-full object-cover object-center bg-red-100"
					/>
				</div>

				<div className="flex">
					<div className="w-[60%] p-4 overflow-y-scroll border-r-2">
						<h1 className="text-2xl mb-3 font-semibold">
							{news.title}
						</h1>
						<p className="leading-7 tracking-wide max-h-96">
							{news.content}
						</p>
					</div>

					<div className="grow  relative pt-5 overflow-hidden">
						<h2 className="text-2xl font-semibold  pl-4 mb-3">
							Comments
						</h2>
						<div className="h-[70%] overflow-y-scroll">
							{news.comments.map((cmt) => {
								return (
									<Comment
										user_name={cmt.user.username.toUpperCase()}
										content={cmt.comment_content}
										key={cmt.id}
										image={userImage}
									/>
								);
							})}
						</div>
						<div className="bg-gray-200 max-h-[20%]  w-full  px-4 py-3">
							<input
								type="text"
								className="block pl-2 py-1 w-full rounded-lg shadow "
								placeholder="Add a comment!"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleNews;
