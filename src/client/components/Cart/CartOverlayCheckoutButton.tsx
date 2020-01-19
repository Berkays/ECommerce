import React from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { RootState } from '../../redux/store';

const mapStateToProps = (state: RootState) => ({
	cartItems: state.cart.items,
	cartItemCount: state.cart.itemCount
});

type Props = ReturnType<typeof mapStateToProps>;

const CartOverlayCheckoutButton: React.FC<Props> = (props: Props) => {
	return (
		<div className='d-flex flex-column mx-4 mt-auto'>
			<span className='d-inline-flex justify-content-between my-3 px-3 text-uppercase font-weight-bold'>
				<span>Subtotal</span>
				<span>{props.cartItems.map(item => item.price).reduce((sum, n) => sum + n, 0)}$</span>
			</span>
			<NavLink to='/checkout' className=''>
				<Button variant='primary' className='checkout-btn' disabled={props.cartItemCount <= 0}>
					Checkout
				</Button>
			</NavLink>
		</div>
	);
};

export default connect(mapStateToProps)(CartOverlayCheckoutButton);
