/* eslint-disable no-useless-escape */
import { request } from 'graphql-request';

export function registerToNewsletter(email: string): Promise<boolean> {
	try {
		let query = `mutation {
            registerNewsletter(email: ${email}) {
            }
        }`;

		return request<boolean>('http://localhost:3000/graphql', query);
	} catch {
		return Promise.resolve(false);
	}
}
