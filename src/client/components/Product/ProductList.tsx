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
			<Col key={product.publicId} xs={9} sm={6} lg={3}>
				<ProductListItem value={product} />
			</Col>
		);
	};

	return (
		<React.Fragment>
			<div className='product-list col-10 mx-auto'>
				<Container fluid>
					<Row>
						<Col xs={12}>
							<div className='product-category-header text-white'>
								<Image
									className='img-fluid rounded shadow'
									alt={props.categoryTitle}
									title={props.categoryTitle}
									src={props.categoryHeaderImage}
								/>
								<h1 className='display-2'>{props.categoryTitle}</h1>
							</div>
							<hr></hr>
						</Col>
					</Row>
					<Row className='justify-content-center justify-content-md-start my-3'>
						{products !== undefined ? products.map(product => renderItem(product)) : null}
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default ProductList;
