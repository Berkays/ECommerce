import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { RootState } from '../../redux/store';

import Product from '@models/Product';

import { cartAddItem, cartRemoveItem } from '../../redux/cart/actions';

const mapStateToProps = (state: RootState) => ({
	isAuthenticated: state.account.isAuthenticated,
	cartItems: state.cart.items,
	isLoading: state.cart.isLoading
});

const dispatchProps = {
	addItem: cartAddItem,
	removeItem: cartRemoveItem
};

interface ComponentProps {
	value: Product;
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps & ComponentProps;

const CartItemQuantityComponent: React.FC<Props> = (props: Props) => {
	const handleAddItem = () => {
		props.addItem(props.isAuthenticated, props.value);
	};

	const handleRemoveItem = () => {
		props.removeItem(props.isAuthenticated, props.value);
	};

	return (
		<InputGroup className='cart-item-quantity border rounded w-50 w-sm-100 my-2 mx-auto mx-sm-1'>
			<InputGroup.Prepend>
				<Button variant='primary' className='border-0' onClick={handleRemoveItem} disabled={props.isLoading}>
					-
				</Button>
			</InputGroup.Prepend>
			<p className='my-0 align-self-center mx-3 border-0 flex-grow-1 text-center'>
				{props.cartItems.filter(item => item.product.publicId == props.value.publicId)[0].quantity}
			</p>
			<InputGroup.Append>
				<Button variant='primary' className='border-0' onClick={handleAddItem} disabled={props.isLoading}>
					+
				</Button>
			</InputGroup.Append>
		</InputGroup>
	);
};

export default connect(mapStateToProps, dispatchProps)(CartItemQuantityComponent);
