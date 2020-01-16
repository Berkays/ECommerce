import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { cartReducer } from './cart/reducers';
import { accountReducer } from './account/reducers';
import { uiReducer } from './ui/reducers';

export const rootReducer = combineReducers({
	cart: cartReducer,
	account: accountReducer,
	ui: uiReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore(initialState?: RootState) {
	return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
}
