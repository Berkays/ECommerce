export interface SidenavState {
	readonly isOpen: boolean;
}

export interface TopBannerState {
	readonly show: boolean;
	readonly src: string;
}

export interface UIState {
	readonly SidenavState?: SidenavState;
	readonly TopBannerState?: TopBannerState;
}
