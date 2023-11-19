import React from 'react';

const Comment = ({ user_name, content, image }) => {
	return (
		<div className="pl-5 mb-2 py-2 shadow-sm flex items-center">
			<div className="h-16 w-16 overflow-hidden rounded-[50%]">
				<img src={image} className="max-w-full h-full object-cover" />
			</div>
			<div className="">
				<h3 className="font-semibold tracking-wide italic">
					{user_name}
				</h3>
				<p className="text-gray-600">{content}</p>
			</div>
		</div>
	);
};

export default Comment;
