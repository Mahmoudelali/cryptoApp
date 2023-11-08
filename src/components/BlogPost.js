import React from 'react';
import blogImage from '../../src/pexels-josh-sorenson-378268.jpg';

const BlogPost = ({ title, content, image }) => {
	var modifiedContent = content.substring(0, 300);
	modifiedContent += '...';
	return (
		<div className="w-[70%] h-56 mx-auto  mb-6  flex bg-white   shadow-xl rounded-lg overflow-hidden hover:shadow-2xl">
			<div className="w-1/3 h-56 overflow-hidden  ">
				<img
					src={!image ? blogImage : image}
					className="object-cover max-w-full h-full"
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
