import React from 'react';

const Comment = ({ user_name, content }) => {
	return (
		<div className="pl-5 mb-2 py-2 shadow-sm">
			<h3 className="font-semibold tracking-wide italic">{user_name}</h3>
			<p className="text-gray-600">{content}</p>
		</div>
	);
};

export default Comment;
