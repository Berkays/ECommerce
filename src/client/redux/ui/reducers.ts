import { Reducer } from 'redux';
import { UIState } from './types';
import { UI_SIDENAV_TOGGLE } from './constants';

const initialState: UIState = {
	TopBannerState: {
		show: false,
		src: ''
	},
	SidenavState: {
		isOpen: false
	}
};

const reducer: Reducer<UIState> = (state = initialState, action) => {
	switch (action.type) {
		case UI_SIDENAV_TOGGLE:
			return {
				SidenavState: {
					isOpen: !state.SidenavState.isOpen
				}
			};
		default:
			return state;
	}
};

export { reducer as uiReducer };
