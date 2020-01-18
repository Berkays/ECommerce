import React, { useEffect } from 'react';
import Image from 'react-bootstrap/Image';

import CartItemQuantityInput from './CartItemQuantityComponent';

import { connect } from 'react-redux';
import { RootState } from '../../redux/store';

import CartItem from '@models/CartItem';

import { cartGetItems } from '../../redux/cart/actions';

const mapStateToProps = (state: RootState) => ({
	cart: state.cart.items,
	cartItemCount: state.cart.itemCount,
	isAuthenticated: state.account.isAuthenticated
});

const dispatchProps = {
	getCart: cartGetItems
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const CartOverlayItemList: React.FC<Props> = (props: Props) => {
	useEffect(() => {
		props.getCart(props.isAuthenticated);
	}, [props.getCart]);

	const renderListItem = (item: CartItem, index: number) => (
		<li key={index} className='px-4 py-3 list-unstyled shadow-sm mt-1'>
			<div className='d-flex flex-column flex-sm-row justify-content-between flex-wrap'>
				<Image
					width='128px'
					height='128px'
					alt={item.product['name']}
					src={item.product.mainImage}
					className='border border-gray rounded-lg align-self-center align-self-sm-start'
				/>
				<div className='d-flex flex-column flex-grow-1 pl-0 pl-sm-4 text-center text-sm-left'>
					<h5>{item.product['name']}</h5>
					<CartItemQuantityInput value={item.product} />
					<p className='align-self-center align-self-sm-end mt-auto mb-0 lead'>
						{`${item.product.unitPrice}$ x ${item.quantity} = ${item.price}$ Total`}
					</p>
				</div>
			</div>
		</li>
	);

	const renderCartList =
		props.cartItemCount > 0 ? (
			props.cart.map((item, index) => {
				return renderListItem(item, index);
			})
		) : (
			<p className='pt-4 text-uppercase text-center'>Your cart is currently empty.</p>
		);

	return <React.Fragment>{renderCartList}</React.Fragment>;
};

export default connect(mapStateToProps, dispatchProps)(CartOverlayItemList);
