import { createAsyncAction, createAction } from 'typesafe-actions';

import './types';
import { ACCOUNT_LOGIN, ACCOUNT_REGISTER, ACCOUNT_LOGOUT } from './constants';
import {
	loginUser,
	loginGoogleUser,
	loginFacebookUser,
	loginTwitterUser,
	registerUser,
	logout
} from '@client/api/account';

import { RegisterLocalUserArgs, LoginLocalUserArgs } from '@src/graphql/resolvers/User/UserArgs';

const accountLoginActions = createAsyncAction(ACCOUNT_LOGIN.REQUEST, ACCOUNT_LOGIN.SUCCESS, ACCOUNT_LOGIN.FAILURE)<
	never,
	never,
	string
>();

const accountLogoutAction = createAction(ACCOUNT_LOGOUT)();

const accountRegisterActions = createAsyncAction(
	ACCOUNT_REGISTER.REQUEST,
	ACCOUNT_REGISTER.SUCCESS,
	ACCOUNT_REGISTER.FAILURE
)<never, string, string>();

export function accountLoginUser(user: LoginLocalUserArgs) {
	return dispatch => {
		dispatch(accountLoginActions.request(null, null));
		loginUser(user)
			.then(() => dispatch(accountLoginActions.success))
			.catch(err => dispatch(accountLoginActions.failure(err)));
	};
}

export function accountLoginGoogle() {
	return dispatch => {
		dispatch(accountLoginActions.request(null, null));
		loginGoogleUser()
			.then(() => dispatch(accountLoginActions.success))
			.catch(err => dispatch(accountLoginActions.failure(err)));
	};
}

export function accountLoginFacebook() {
	return dispatch => {
		dispatch(accountLoginActions.request(null, null));
		loginFacebookUser()
			.then(() => dispatch(accountLoginActions.success))
			.catch(err => dispatch(accountLoginActions.failure(err)));
	};
}

export function accountLoginTwitter() {
	return dispatch => {
		dispatch(accountLoginActions.request(null, null));
		loginTwitterUser()
			.then(() => dispatch(accountLoginActions.success))
			.catch(err => dispatch(accountLoginActions.failure(err)));
	};
}

export function accountLogout() {
	return dispatch => {
		dispatch(accountLogoutAction());
		logout();
	};
}

export function accountRegisterUser(user: RegisterLocalUserArgs) {
	return dispatch => {
		dispatch(accountRegisterActions.request(null, null));
		registerUser(user)
			.then(res => dispatch(accountRegisterActions.success(res)))
			.catch(err => dispatch(accountRegisterActions.failure(err)));
	};
}
