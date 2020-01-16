import { Request, Response, Router } from 'express';
const router = Router();

import * as path from 'path';
import { readFileSync } from 'fs';

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { StaticRouter } from 'react-router-dom';
// import Routes from '../client/routes';
// import { matchRoutes } from 'react-router-config';

import { Provider as ReduxProvider } from 'react-redux';

import App from '@client/components/Layout/Layout';
import configureStore from '@client/redux/store';
import User from '@models/User';

let template = '';
if (process.env.NODE_ENV !== 'development') {
	template = readFileSync(path.join(__dirname, '../public', 'index.template.html'), 'utf-8');
}

router.get('*', async (req: Request, res: Response) => {
	if (process.env.NODE_ENV === 'development') {
		try {
			template = readFileSync(path.join(__dirname, '../public', 'index.template.html'), 'utf-8');
		} catch {
			console.error(
				'index.template.html is not found. Make sure to run yarn dev:web or npm run dev:web command to generate client application.'
			);
			return;
		}
	}

	const user = req.user as User;

	const store = configureStore({
		cart: {
			items: [],
			itemCount: 0,
			isLoading: true
		},
		account: {
			isLoading: false,
			isAuthenticated: req.isAuthenticated(),
			name: user === undefined ? '' : user.firstName
		},
		ui: {
			TopBannerState: { show: false, src: '' },
			SidenavState: { isOpen: false }
		}
	});
	// const matchingRoutes = matchRoutes(Routes, req.url);

	// const datareq = matchingRoutes
	//     .map(route => route.route)
	//     .filter(route => route.loadData)
	//     .map(route => store.dispatch(route.loadData()));
	// matchingRoutes.forEach(route => {
	//     if (route.route.aadData) {
	//         promises.push(route.route.loadData());
	//         store.dispatch(route.route.loadData());
	//     }
	// });

	const context: any = {};
	const reactComp = renderToString(
		<ReduxProvider store={store}>
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>
		</ReduxProvider>
	);

	if (context.status === 404) {
		res.status(404);
	}
	const reduxState = store.getState();

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(
		template
			.replace('{body}', reactComp)
			.replace('<div>{store}</div>', `<script>window.REDUX_DATA = ${JSON.stringify(reduxState)}</script>`)
	);
});

export default router;
