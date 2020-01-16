import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import Routes from '../../routes';
import Navbar from './Navbar';
import CartOverlay from '../Cart/CartOverlay';
import Footer from './Footer';

import { Scrollbars } from 'react-custom-scrollbars';

import { toggleSideNav } from '@src/client/redux/ui/actions';

import { connect } from 'react-redux';
import { RootState } from '@client/redux/store';

const mapStateToProps = (state: RootState) => ({
	isSidenavOpen: state.ui.SidenavState.isOpen
});

const dispatchProps = {
	toggleSideNav: toggleSideNav
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const App: React.FC<Props> = (props: Props) => {
	return (
		<React.Fragment>
			<Scrollbars autoHide universal>
				<span onClick={props.isSidenavOpen ? props.toggleSideNav : null}>
					<div id='pageWrapper' className='font-body'>
						<Navbar />
						<Switch>{renderRoutes(Routes)}</Switch>
					</div>
					<Footer />
				</span>
				<CartOverlay />
			</Scrollbars>
		</React.Fragment>
	);
};

export default connect(mapStateToProps, dispatchProps)(App);
