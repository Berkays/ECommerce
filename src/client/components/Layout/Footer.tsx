import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';

import FooterPaymentCredentials from './FooterCredentials';

interface ColumnItem {
	title: string;
	description: {
		text: string;
		link: string;
	}[];
}

const footers: ColumnItem[] = [
	{
		title: 'Company.com',
		description: [
			{ text: 'About', link: '/' },
			{ text: 'Our mission', link: '/' },
			{ text: 'Oppurtunities', link: '/' },
			{ text: 'Contact us', link: '/' }
		]
	},
	{
		title: 'Navigation',
		description: [
			{ text: 'Home', link: '/' },
			{ text: 'New products', link: '/' },
			{ text: 'Discounted items', link: '/' },
			{ text: 'My account', link: '/' },
			{ text: 'Orders', link: '/' },
			{ text: 'Cancel/Return order', link: '/' },
			{ text: 'Sign in', link: '/' },
			{ text: 'Sign up', link: '/' },
			{ text: 'Sitemap', link: '/' }
		]
	},
	{
		title: 'FAQ',
		description: [
			{ text: 'Privacy policy', link: '/' },
			{ text: 'Terms of use', link: '/' },
			{ text: 'Frequently asked questions', link: '/' },
			{ text: 'Return policy', link: '/' }
		]
	},
	{
		title: 'Contact',
		description: [{ text: 'Contact', link: '/' }]
	}
];

const Footer: React.FC = () => {
	const renderColumn = (category: ColumnItem) => (
		<React.Fragment>
			<p className='pb-1 column-header'>{category.title}</p>
			<hr className='w-75 ml-0 mr-auto pb-2' />
			<ul className='px-1 list-unstyled'>
				{category.description.map((item, index) => {
					return (
						<li key={index}>
							<NavLink to={item.link}>
								<small className='text-muted'>{item.text}</small>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</React.Fragment>
	);

	return (
		<footer>
			<Container className='px-4 my-5'>
				<Row>
					<Col xs={12} sm={6} md={3} className='text-center text-md-left'>
						{renderColumn(footers[0])}
					</Col>
					<Col xs={12} sm={6} md={3} className='text-center text-md-left mt-5 mt-sm-0'>
						{renderColumn(footers[1])}
					</Col>
					<Col xs={12} sm={6} md={3} className='text-center text-md-left mt-5 mt-md-0'>
						{renderColumn(footers[2])}
					</Col>
					<Col xs={12} sm={6} md={3} className='text-center text-md-left mt-5 mt-md-0 '>
						{renderColumn(footers[3])}
					</Col>
				</Row>
				<Row id='Payment credentials'></Row>
			</Container>
			<FooterPaymentCredentials />
		</footer>
	);
};

export default Footer;
