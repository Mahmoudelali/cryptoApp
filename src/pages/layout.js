import { Outlet } from 'react-router-dom';
import SideBar from '../components/sideBar.js';
import Header from '../components/header.js';

function Layout() {
	return (
		<div className="flex ">
			<SideBar />
			<div className="w-full h-screen  overflow-scroll ">
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
