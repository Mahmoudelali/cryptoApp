import React from 'react';
import blogImage from '../../src/pexels-josh-sorenson-378268.jpg';
import { useNavigate } from 'react-router-dom';

const BlogPost = ({ title, content, image, id }) => {
	const navigate = useNavigate();
	var modifiedContent = content.substring(0, 300);
	modifiedContent += '...';
	let imagePath = image?.split('/media')[1];
	let urlImage = `${process.env.REACT_APP_SERVER_URL}/api/media${imagePath}`;

	return (
		<div
			className="w-[70%] h-56 mx-auto  mb-6  flex bg-white   shadow-xl rounded-lg overflow-hidden hover:shadow-2xl cursor-pointer"
			onClick={() => navigate(`/news/${id}`)}
		>
			<div className="w-1/3 h-56 overflow-hidden relative ">
				<div className="absolute z-40 bg-[#00015] inset-0" />
				<img
					src={urlImage}
					className="object-cover w-full h-full "
					alt="blogpost illustration"
				/>
			</div>
			<div className="w-2/3 p-4">
				<h2 className="font-bold text-lg">{title}</h2>
				<p className=" text-ellipsis overflow-hidden w-full  h-full leading-6">
					{modifiedContent}
				</p>
			</div>
		</div>
	);
};

export default BlogPost;
