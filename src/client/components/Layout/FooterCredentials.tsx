import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FooterPaymentCredentials: React.FC = () => {
	return (
		<Container className='payment-credentials-container'>
			<hr />
			<Row className='h-100 align-items-center justify-content-center'>
				<Col xs={2} md={1}>
					<div className='visaIcon' />
				</Col>
				<Col xs={2} md={1}>
					<div className='masterCardIcon' />
				</Col>
				<Col xs={2} md={1}>
					<div className='visaIcon' />
				</Col>
				<Col xs={2} md={1}>
					<div className='masterCardIcon' />
				</Col>
			</Row>
		</Container>
	);
};

export default FooterPaymentCredentials;
