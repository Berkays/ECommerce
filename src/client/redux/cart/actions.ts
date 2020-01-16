import { createAction } from 'typesafe-actions';

import './types';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_GET, CART_ACTION_FAILURE, CART_ACTION_SUCCESS } from './constants';
import { getCart, addItem, removeItem } from '@client/api/cart';

import CartItem from '@models/CartItem';
import Product from '@models/Product';

const cartGetAction = createAction(CART_GET)<undefined>();
const cartAddItemAction = createAction(CART_ADD_ITEM)<undefined>();
const cartRemoveItemAction = createAction(CART_REMOVE_ITEM)<undefined>();
const cartSuccessAction = createAction(CART_ACTION_SUCCESS)<CartItem[]>();
const cartFailureAction = createAction(CART_ACTION_FAILURE)<string>();

export function cartGetItems(isAuthenticated: boolean) {
	return dispatch => {
		dispatch(cartGetAction());
		getCart(isAuthenticated)
			.then(res => dispatch(cartSuccessAction(res)))
			.catch(err => dispatch(cartFailureAction(err)));
	};
}
export function cartAddItem(isAuthenticated: boolean, product: Product) {
	return dispatch => {
		dispatch(cartAddItemAction());
		addItem(isAuthenticated, product)
			.then(res => dispatch(cartSuccessAction(res)))
			.catch(err => dispatch(cartFailureAction(err)));
	};
}
export function cartRemoveItem(isAuthenticated: boolean, product: Product) {
	return dispatch => {
		dispatch(cartRemoveItemAction());
		removeItem(isAuthenticated, product)
			.then(res => dispatch(cartSuccessAction(res)))
			.catch(err => dispatch(cartFailureAction(err)));
	};
}
