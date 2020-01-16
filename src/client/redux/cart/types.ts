import CartItem from '@models/CartItem';

export interface CartState {
	items: CartItem[];
	itemCount: number;
	isLoading: boolean;
}
