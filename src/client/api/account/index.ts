/* eslint-disable no-useless-escape */
import { request } from 'graphql-request';

import { RegisterLocalUserArgs, LoginLocalUserArgs } from '@src/graphql/resolvers/User/UserArgs';
import User from '@models/User';

export function loginUser(user: LoginLocalUserArgs) {
	return fetch('http://localhost:3000/auth/local', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	});
}

export function loginGoogleUser() {
	// redirect to /auth/google
	return fetch('http://localhost:3000/auth/google');
}
export function loginFacebookUser() {
	// redirect to /auth/facebook
	return fetch('http://localhost:3000/auth/google');
}
export function loginTwitterUser() {
	// redirect to /auth/twitter
	return fetch('http://localhost:3000/auth/google');
}

export function logout() {
	const query = `mutation { logout }`;

	return request('http://localhost:3000/graphql', query);
}

export function registerUser(user: RegisterLocalUserArgs) {
	let query = `mutation {
            register(newUserData: $data) {
            firstName
            lastName
        }
    }`;

	query = query.replace('$data', JSON.stringify(user).replace(/\"([^(\")"]+)\":/g, '$1:'));

	return request('http://localhost:3000/graphql', query);
}

export function getAccountSettings(): Promise<User> {
	let query = `query {
            getAccountSettings {
            firstName
            lastName
            email
        }
    }`;

	return request<User>('http://localhost:3000/graphql', query);
}
