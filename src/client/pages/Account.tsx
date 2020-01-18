import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AccountOrders from '../components/Account/AccountOrders';
import AccountSettingsComponent from '../components/Account/AccountSettings';
import AccountAddress from '../components/Account/AccountAddress';

const Account: React.FC = () => {
	return (
		<Container fluid>
			<Tab.Container id='account-tabs' defaultActiveKey='#orders'>
				<Row className='justify-content-center mt-5'>
					<Col sm={2}>
						<ListGroup>
							<ListGroupItem action href='#orders'>
								Orders
							</ListGroupItem>
							<ListGroupItem action href='#address'>
								My Addresses
							</ListGroupItem>
							<ListGroupItem action href='#settings'>
								Settings
							</ListGroupItem>
							<ListGroupItem action>Sign out</ListGroupItem>
						</ListGroup>
					</Col>
					<Col sm={6} className='border border-gray rounded px-5 py-4'>
						<Tab.Content>
							<Tab.Pane eventKey='#orders'>
								<AccountOrders />
							</Tab.Pane>
							<Tab.Pane eventKey='#address'>
								<AccountAddress />
							</Tab.Pane>
							<Tab.Pane eventKey='#settings'>
								<AccountSettingsComponent />
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</Container>
	);
};
export default Account;
