import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';

const Routes = [
	{
		path: '/',
		exact: true,
		component: Home
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/register',
		component: Register
	},
	{
		path: '/account',
		component: Account
	}
];

export default Routes;
