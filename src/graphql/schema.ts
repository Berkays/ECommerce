import { Request } from 'express';
import { buildSchemaSync, AuthChecker } from 'type-graphql';

import resolvers from './resolvers';

export const customAuthChecker: AuthChecker<Request> = ({ context }) => {
	return context.isAuthenticated();
};

const schema = buildSchemaSync({
	resolvers: resolvers,
	validate: false,
	authChecker: customAuthChecker
});

export default schema;
