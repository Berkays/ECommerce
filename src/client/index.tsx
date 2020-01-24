if (module.hot) {
	module.hot.accept();
}

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './components/Layout/Layout';
import configureStore from './redux/store';
import { initUI } from './UiEntityHandler';
declare global {
	interface Window {
		REDUX_DATA: any;
	}
}

window.REDUX_DATA = window.REDUX_DATA || {};
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.REDUX_DATA;

// Allow the passed state to be garbage-collected
delete window.REDUX_DATA;

const store = configureStore(preloadedState);
initUI(store.getState().ui.UiEntities);

const app = document.getElementById('root');
ReactDOM.hydrate(
	<ReduxProvider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ReduxProvider>,
	app
);
