import { Reducer } from 'redux';
import { AccountState } from './types';
import { ACCOUNT_LOGIN, ACCOUNT_REGISTER, ACCOUNT_LOGOUT } from './constants';

const initialState: AccountState = {
	name: '',
	isLoading: false,
	isAuthenticated: false
};
const reducer: Reducer<AccountState> = (state = initialState, action) => {
	switch (action.type) {
		case ACCOUNT_LOGIN.REQUEST:
			return { ...state, isLoading: true };
		case ACCOUNT_LOGIN.SUCCESS:
			return { ...state, name: action.payload, isLoading: false };
		case ACCOUNT_LOGIN.FAILURE:
			return { ...state, isLoading: false };
		case ACCOUNT_REGISTER.REQUEST:
			return { ...state, isLoading: true };
		case ACCOUNT_REGISTER.SUCCESS:
			return { ...state, isLoading: false };
		case ACCOUNT_REGISTER.FAILURE:
			return { ...state, isLoading: false };
		case ACCOUNT_LOGOUT:
			return { ...state, isAuthenticated: false };
		default:
			return state;
	}
};

export { reducer as accountReducer };
