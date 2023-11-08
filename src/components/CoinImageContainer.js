import React from 'react';

const CoinImageContainer = ({ name, image }) => {
	return (
		<article className='flex items-center gap-2'>
			<div className='h-9 w-9 overflow-hidden rounded-[50%] '>
				<img src={image} className='max-w-full h-full object-cover' />
			</div>
            <h4>{ name}</h4>
		</article>
	);
};

export default CoinImageContainer;
