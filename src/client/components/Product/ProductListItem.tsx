import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { FaPlus } from 'react-icons/fa';
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from 'react-icons/io';

import { connect } from 'react-redux';
import { RootState } from '../../redux/store';

import { cartAddItem } from '../../redux/cart/actions';

import Product from '@models/Product';

const mapStateToProps = (state: RootState) => ({
	cart: state.cart.items,
	isAuthenticated: state.account.isAuthenticated
});

const dispatchProps = {
	addToCart: cartAddItem
};

interface ProductDetails {
	value: Product;
	productOldPrice?: number;
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps & ProductDetails;

const ProductListItem = (props: Props) => {
	const handleAddToCart = () => {
		if (props.value.unitsInStock <= 0) return;
		console.log(props.value.name);
		props.addToCart(props.isAuthenticated, props.value);
	};

	const renderOldPrice = (
		<React.Fragment>
			{props.productOldPrice === undefined ? null : (
				<h5 className='mb-1 font-weight-light'>
					<del>${props.productOldPrice}</del>
				</h5>
			)}
		</React.Fragment>
	);

	const renderRating = (props: Props) => {
		let fullStars = [];
		let halfStar = null;
		let emptyStars = [];
		for (let index = 0; index <= props.value.rating - 1; index++)
			fullStars.push(
				<li className='list-unstyled d-inline' key={index}>
					<IoIosStar size={18} color='#ccbe00' />
				</li>
			);

		for (let index = props.value.rating + 0.9; index <= 5; index++)
			emptyStars.push(
				<li className='list-unstyled d-inline' key={index}>
					<IoIosStarOutline size={18} color='#ccbe00' />
				</li>
			);

		if (fullStars.length + emptyStars.length < 5)
			halfStar = <IoIosStarHalf size={18} color='#ccbe00' className='d-inline' />;
		return (
			<div className='text-center'>
				{fullStars}
				{halfStar}
				{emptyStars}
				<p className='font-weight-light mb-2'>
					({props.value.ratingCount > 0 ? `${props.value.ratingCount} reviews` : 'No reviews'})
				</p>
			</div>
		);
	};

	return (
		<div className='product-list-item d-flex flex-column p-3 mb-4 mx-1'>
			<Image
				src={props.value.mainImage}
				alt={props.value.name}
				title={props.value.name}
				className='product-header-img img-fluid'
			/>
			<span className='px-2'>
				<h5 className='pt-3'>{props.value.name}</h5>
				{renderRating(props)}
				{renderOldPrice}
				<h4 className='font-weight-light'>${props.value.unitPrice}</h4>
			</span>
			<Button
				variant='info'
				className='add-cart-btn'
				disabled={props.value.unitsInStock <= 0}
				onClick={handleAddToCart}>
				<FaPlus />
				<span>Add to Cart</span>
			</Button>
		</div>
	);
};

export default connect(mapStateToProps, dispatchProps)(ProductListItem);
