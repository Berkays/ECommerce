import { Reducer } from 'redux';
import { CartState } from './types';
import { CART_GET, CART_ADD_ITEM, CART_REMOVE_ITEM, CART_ACTION_SUCCESS, CART_ACTION_FAILURE } from './constants';

import CartItem from '@models/CartItem';

const initialState: CartState = {
	items: [],
	itemCount: 0,
	isLoading: true
};

const reducer: Reducer<CartState> = (state = initialState, action) => {
	switch (action.type) {
		case CART_GET:
			return { ...state, isLoading: true };
		case CART_ADD_ITEM:
			return { ...state, isLoading: true };
		case CART_REMOVE_ITEM:
			return { ...state, isLoading: true };
		case CART_ACTION_SUCCESS:
			// eslint-disable-next-line no-case-declarations
			let productCount = 0;
			productCount = action.payload
				.map((item: CartItem) => item.quantity)
				.reduce((sum, n) => {
					return sum + n;
				}, 0);
			return { ...state, items: action.payload, itemCount: productCount, isLoading: false };
		case CART_ACTION_FAILURE:
			return { ...state, isLoading: false };
		default:
			return state;
	}
};

export { reducer as cartReducer };
