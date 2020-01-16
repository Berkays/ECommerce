import { createAction } from 'typesafe-actions';

import './types';
import { UI_SIDENAV_TOGGLE } from './constants';

const toggleSideNavAction = createAction(UI_SIDENAV_TOGGLE)<undefined>();

export function toggleSideNav() {
	return dispatch => {
		dispatch(toggleSideNavAction());
	};
}
