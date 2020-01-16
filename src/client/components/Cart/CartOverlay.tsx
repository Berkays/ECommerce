import React from 'react';

import CartOverlayHeader from './CartOverlayHeader';
import CartOverlayItemList from './CartOverlayItemList';
import CartOverlayCheckoutButton from './CartOverlayCheckoutButton';

import { connect } from 'react-redux';
import { RootState } from '../../redux/store';

import { toggleSideNav } from '../../redux/ui/actions';

const mapStateToProps = (state: RootState) => ({
	isOpen: state.ui.SidenavState.isOpen
});

const dispatchProps = {
	toggleSideNav: toggleSideNav
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const CartOverlay: React.FC<Props> = (props: Props) => {
	return (
		<div id='sideNav' className={`sidenav shadow-lg ${props.isOpen ? 'sidenav-open' : ''}`}>
			<CartOverlayHeader />
			<CartOverlayItemList />
			<CartOverlayCheckoutButton />
		</div>
	);
};

export default connect(mapStateToProps, dispatchProps)(CartOverlay);
