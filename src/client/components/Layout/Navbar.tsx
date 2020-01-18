import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';

import { FaChevronDown } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { FiUser, FiShoppingCart } from 'react-icons/fi';

import { logoImg } from '../../assets/images/';

import { connect } from 'react-redux';
import { RootState } from 'client/redux/store';

import { accountLogout } from '../../redux/account/actions';
import { toggleSideNav } from '../../redux/ui/actions';
import { NavLink, Link } from 'react-router-dom';

const mapStateToProps = (state: RootState) => ({
	isAuthenticated: state.account.isAuthenticated,
	authenticatedUserName: state.account.name,
	cartItemCount: state.cart.itemCount
});

const dispatchProps = {
	toggleSideNav: toggleSideNav,
	logout: accountLogout
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const NavbarComponent: React.FC<Props> = (props: Props) => {
	const navbarAuthenticatedMenu = (
		<li className='d-inline-flex align-items-center nav-item'>
			<Dropdown className='text-center'>
				<Dropdown.Toggle variant='outline-primary' id='registeredAccountDropdown'>
					<FiUser size={24} />
					<small className='d-none d-md-inline-block pl-0 pl-md-2 pr-2 text-truncate align-bottom'>
						Welcome, <br />
						{props.authenticatedUserName}
					</small>
					<FaChevronDown />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item as='div'>
						<NavLink to='/account#orders'>Orders</NavLink>
					</Dropdown.Item>
					<Dropdown.Item as='div'>
						<NavLink to='/account#settings'>My Account</NavLink>
					</Dropdown.Item>
					<Dropdown.Item href='/account'>Coupons</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item href='#/action-3'>My Wish List</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item as='div'>
						<Link to='/auth/logout'>Logout</Link>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</li>
	);

	const navbarGuestMenu = (
		<li className='d-inline-flex align-items-center nav-item'>
			<Dropdown>
				<Dropdown.Toggle variant='outline-primary' id='guestAccountDropdown'>
					<FiUser size={24} />
					<small className='d-none d-md-inline pl-0 pl-md-2 pr-2'>Login / Signup</small>
					<FaChevronDown />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item as='div'>
						<NavLink to='/login'>Sign In</NavLink>
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item as='div'>
						<NavLink to='/register'>Sign Up</NavLink>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</li>
	);

	const navbarAccountMenu = props.isAuthenticated ? navbarAuthenticatedMenu : navbarGuestMenu;

	const navbarCart = (
		<li className='d-inline-flex align-items-center nav-item'>
			<Button variant='outline-success' onClick={props.toggleSideNav}>
				<FiShoppingCart size={24} />
				<span className='d-none d-md-inline pl-2'>
					My Cart&nbsp;(<Badge>{props.cartItemCount}</Badge>)
				</span>
			</Button>
		</li>
	);

	const navbarLogo = (
		<Col lg={4} md={6} sm={6} xs={12} className='order-1 offset-4 offset-sm-0'>
			<Navbar.Brand href='/'>
				<Image alt='My Logo' src={logoImg} width='50' height='50' className='d-inline-block align-center' />{' '}
				React
			</Navbar.Brand>
		</Col>
	);

	const navbarSearch = (
		<Col
			lg={3}
			md={12}
			sm={12}
			xs={12}
			className='order-3 order-lg-2 mx-lg-auto order-md-3 my-3 my-lg-0 align-items-center d-flex'>
			<InputGroup className='my-auto'>
				<FormControl
					placeholder='Search products...'
					aria-label='Search products'
					aria-describedby='search'
					className='navbar-search-input'
				/>
				<InputGroup.Append>
					<Button variant='primary' className='navbar-search-btn'>
						<IoIosSearch size={24} />
					</Button>
				</InputGroup.Append>
			</InputGroup>
		</Col>
	);

	const navbarMenu = (
		<Col lg={4} md={6} sm={6} xs={12} className='order-2 order-lg-3 order-md-2 mt-4 mt-sm-0'>
			<div className='h-100 d-flex justify-content-center justify-content-sm-end'>
				<ul className='d-xs-none navbar-nav h-100'>
					<React.Fragment>
						{navbarAccountMenu}
						{navbarCart}
					</React.Fragment>
				</ul>
			</div>
		</Col>
	);

	return (
		<Navbar bg='light' className='p-0 pt-2 pb-1 pt-sm-0 pb-sm-0 shadow-sm'>
			<Container fluid={true} className='px-4'>
				<Row className='w-100 no-gutters'>
					{navbarLogo}
					{navbarSearch}
					{navbarMenu}
				</Row>
			</Container>
		</Navbar>
	);
};

export default connect(mapStateToProps, dispatchProps)(NavbarComponent);
