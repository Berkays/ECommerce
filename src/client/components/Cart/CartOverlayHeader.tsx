import React from 'react';
import Button from 'react-bootstrap/Button';

import { FaTimes } from 'react-icons/fa';

import { connect } from 'react-redux';
import { toggleSideNav } from '../../redux/ui/actions';

const dispatchProps = {
	toggleSideNav: toggleSideNav
};

type Props = typeof dispatchProps;

const CartOverlayHeader: React.FC<Props> = (props: Props) => {
	return (
		<React.Fragment>
			<div className='d-flex align-items-center sidenav-title'>
				<h4 className='text-uppercase my-0 mr-auto'>Your Cart</h4>
				<Button variant='link' className='border-none' onClick={props.toggleSideNav}>
					<FaTimes size={24} color='000' />
				</Button>
			</div>
			<hr className='w-100' />
		</React.Fragment>
	);
};

export default connect(null, dispatchProps)(CartOverlayHeader);
