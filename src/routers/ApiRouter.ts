import { Router } from 'express';
import GraphQL from 'express-graphql';
const router = Router();

import schema from '@src/graphql/schema';

const extensions = ({ result }) => {
	const key = Object.keys(result.data)[0];
	const x = result.data[key];
	result.data = x;
	return null;
};

router.use(
	'/',
	GraphQL({
		schema: schema,
		graphiql: true,
		extensions: extensions
	})
);

export default router;
