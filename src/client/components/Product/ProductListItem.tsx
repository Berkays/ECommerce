import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { FaPlus } from 'react-icons/fa';
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from 'react-icons/io';

import { connect } from 'react-redux';
import { RootState } from '../../redux/store';

import { cartAddItem } from '../../redux/cart/actions';

import Product from '@models/Product';
import ProductQuantity from './ProductListItemQuantity';

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
					<IoIosStar size={16} color='#ccbe00' />
				</li>
			);

		for (let index = props.value.rating + 0.9; index <= 5; index++)
			emptyStars.push(
				<li className='list-unstyled d-inline' key={index}>
					<IoIosStarOutline size={16} color='#ccbe00' />
				</li>
			);

		if (fullStars.length + emptyStars.length < 5)
			halfStar = <IoIosStarHalf size={16} color='#ccbe00' className='d-inline' />;
		return (
			<div className='text-center'>
				{fullStars}
				{halfStar}
				{emptyStars}
				<br />
				<span className='font-weight-light'>
					({props.value.ratingCount > 0 ? `${props.value.ratingCount} reviews` : 'No reviews'})
				</span>
			</div>
		);
	};

	const renderAddButton = (props: Props) => {
		const item = props.cart.filter(item => item.product.publicId == props.value.publicId)[0];
		if (item == undefined)
			return (
				<Button
					variant='primary'
					className='add-cart-btn mt-auto'
					disabled={props.value.unitsInStock <= 0}
					onClick={handleAddToCart}>
					<FaPlus />
					<span>Add to Cart</span>
				</Button>
			);
		else return <ProductQuantity value={item.product} />;
	};

	return (
		<div className='product-list-item mb-5'>
			<Image
				src={props.value.mainImage}
				alt={props.value.name}
				title={props.value.name}
				className='product-header-img w-100 h-100'
			/>
			<span className='w-100 d-flex flex-column flex-grow-1 px-2 pt-3 pb-2'>
				<span>{props.value.name}</span>
				{renderRating(props)}
				{renderOldPrice}
				<div className='font-weight-light text-center text-sm-left mt-auto d-inline-block'>
					${props.value.price.toFixed(2)}
				</div>
			</span>
			{renderAddButton(props)}
		</div>
	);
};

export default connect(mapStateToProps, dispatchProps)(ProductListItem);
