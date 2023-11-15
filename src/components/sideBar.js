import { NavLink, useNavigate } from 'react-router-dom';
import { RiHomeLine } from 'react-icons/ri';
import { RiHomeFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { PiNewspaperLight } from 'react-icons/pi';
import { LiaSignalSolid } from 'react-icons/lia';
import { TbLogout2, TbNewsOff } from 'react-icons/tb';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { MdOutlineFavorite } from 'react-icons/md';
import { useCookies } from 'react-cookie';

function SideBar() {
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const location = useLocation();
	const navigate = useNavigate();

	const username = cookies.user.user.username;

	const links = [
		{
			name: 'dashboard',
			path: '/dashboard',
			icon: <RiHomeLine />,
			activeIcon: <RiHomeFill />,
		},
		{
			name: 'news',
			path: '/news',
			icon: <PiNewspaperLight />,
			activeIcon: <PiNewspaperLight />,
		},
		{
			name: 'signals',
			path: '/signals',
			icon: <LiaSignalSolid />,
			activeIcon: <LiaSignalSolid />,
		},
		{
			name: 'rumors',
			path: '/rumors',
			icon: <TbNewsOff />,
			activeIcon: <TbNewsOff />,
		},
		{
			name: 'favorite coins',
			path: '/favorite-coin',
			icon: <MdOutlineFavoriteBorder />,
			activeIcon: <MdOutlineFavorite />,
		},
	];

	return (
		<div className=" w-80 h-screen bg-slate-900 p-5 flex flex-col gap-10">
			<p className=" text-2xl first-letter:uppercase font-bold text-white">
				<span className="uppercase">crypto App</span>
				{'  '}
				<span className="block text-lg font-semibold tracking-wider leading-8">
					Welcome, {username}
				</span>
			</p>

			<div className=" flex flex-col gap-4">
				{links.map((eachLink, index) => (
					<NavLink
						to={eachLink.path}
						key={index}
						className={({ isActive }) =>
							isActive
								? `flex bg-slate-800 transition-all rounded-md p-4 bg-opacity-75  items-end gap-2`
								: 'flex  transition-all rounded-md p-4 items-end gap-2 hover:bg-slate-800'
						}
					>
						<div className=" text-2xl  text-white p-1">
							{' '}
							{location.pathname === eachLink.path
								? eachLink.activeIcon
								: eachLink.icon}
						</div>
						<p className=" text-white text-xl first-letter:uppercase">
							{' '}
							{eachLink.name}{' '}
						</p>
					</NavLink>
				))}
			</div>
			<NavLink
				className={`flex items-center hover:bg-slate-800 transition-all rounded-md p-4 bg-opacity-75 gap-2 text-white align-middle mt-auto`}
				onClick={async () => {
					await removeCookie('user');
					navigate('/login');
				}}
			>
				<div className=" text-2xl  text-white p-1">
					<TbLogout2 className="align-middle" />
				</div>
				<p className=" text-white text-xl first-letter:uppercase">
					Logout
				</p>
			</NavLink>
		</div>
	);
}

export default SideBar;
