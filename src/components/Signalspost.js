import React from 'react';

const Signalspost = ({
	coin_name,
	entry_price,
	target,
	leverage,
	stop_loss,
	signal_type,
}) => {
	return (
		<div className="w-[45%]  mx-auto  mb-6  flex bg-white   shadow-xl rounded-lg overflow-hidden hover:shadow-2xl">
			<div className="w-full">
				<div className=" py-2 bg-slate-900 flex items-center pl-5">
					<span
						className="w-5 h-5 rounded-[50%] block mr-2"
						style={{
							backgroundColor:
								signal_type === 'Long' ? '#28a745' : '#dc3545',
						}}
					/>
					<h2 className="font-bold text-lg text-center text-white ">
						{coin_name}
					</h2>
				</div>
				<div className="px-4 py-2">
					<p className="block leading-7 tracking-wider">
						<span className="font-bold  w-[120px] inline-block text-gray-800">
							{' '}
							Type{' '}
						</span>
						{signal_type}
					</p>
					<p className="block leading-7 tracking-wider">
						<span className="font-bold  w-[120px] inline-block text-gray-800">
							{' '}
							Entry price
						</span>
						{entry_price}
					</p>
					<p className="block leading-7 tracking-wider">
						<span className="font-bold  w-[120px] inline-block text-gray-800">
							{' '}
							Target{' '}
						</span>
						{target}
					</p>
					<p className="block leading-7 tracking-wider">
						<span className="font-bold  w-[120px] inline-block text-gray-800">
							{' '}
							Leverage{' '}
						</span>
						{leverage}
					</p>
					<p className="block leading-7 tracking-wider">
						<span className="font-bold  w-[120px] inline-block text-gray-800">
							Stop loss
						</span>
						{stop_loss}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signalspost;
