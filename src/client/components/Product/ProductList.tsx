import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import ProductListItem from './ProductListItem';

import Product from '@models/Product';

import { getProducts as fetchProducts } from '@client/api/product';

interface Props {
	categoryTitle: string;
	categoryHeaderImage: string;
	categoryApi: string;
}

const ProductList = (props: Props) => {
	const [products, setProducts] = useState<Product[]>();

	const getProducts = () => {
		fetchProducts(props.categoryApi).then(_products => setProducts(_products));
	};

	useEffect(() => {
		getProducts();
	}, [props.categoryApi]);

	const renderItem = (product: Product) => {
		return (
			<Col key={product.publicId} xs={9} sm={6} md={4} lg={3}>
				<ProductListItem value={product} />
			</Col>
		);
	};

	return (
		<React.Fragment>
			<Container className='product-list'>
				<Row>
					<Col xs={12}>
						<div className='product-category-header text-white'>
							<Image
								className='img-fluid'
								alt={props.categoryTitle}
								title={props.categoryTitle}
								src={props.categoryHeaderImage}
							/>
							<h1 className='display-3'>{props.categoryTitle}</h1>
						</div>
					</Col>
				</Row>
				<Row className='justify-content-center justify-content-md-start my-5'>
					{products !== undefined ? products.map(product => renderItem(product)) : null}
				</Row>
			</Container>
		</React.Fragment>
	);
};

export default ProductList;
