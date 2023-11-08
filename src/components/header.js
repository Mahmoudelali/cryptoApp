import { CiSearch } from 'react-icons/ci';
function Header(props) {
	const handleQueryChange = (e) => {
		props.setQuery(e.target.value);
	};
	return (
		<div className=" h-full flex items-center ">
			<div className=" w-96 h-10 rounded-lg bg-white flex items-center px-2  gap-2">
				<span className=" text-xl text-gray-700">
					{' '}
					<CiSearch />{' '}
				</span>
				<input
					value={props.query}
					type="text"
					placeholder=" Search "
					className=" w-full h-full px-1"
					onChange={handleQueryChange}
				/>
			</div>
		</div>
	);
}

export default Header;
