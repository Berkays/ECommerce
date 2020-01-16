import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import Newsletter from '../components/Layout/Newsletter';
import ProductList from '../components/Product/ProductList';

const Home: React.FC = () => {
	return (
		<React.Fragment>
			<Jumbotron>
				<h1>Hello, world!</h1>
				<p>
					This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
					featured content or information.
				</p>
				<p>
					<Button variant='primary'>Learn more</Button>
				</p>
			</Jumbotron>
			<ProductList
				categoryTitle='Featured'
				categoryHeaderImage='https://via.placeholder.com/1200x360'
				categoryApi='261ce3db-c01e-4016-8eb7-0ff7ef9770da'
			/>
			<ProductList
				categoryTitle='New'
				categoryHeaderImage='https://via.placeholder.com/1200x360'
				categoryApi='261ce3db-c01e-4016-8eb7-0ff7ef9770da'
			/>
			<Jumbotron>
				<h1>Hello, world!</h1>
				<p>
					This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
					featured content or information.
				</p>
				<p>
					<Button variant='primary'>Learn more</Button>
				</p>
			</Jumbotron>
			<Newsletter />
		</React.Fragment>
	);
};
export default Home;
