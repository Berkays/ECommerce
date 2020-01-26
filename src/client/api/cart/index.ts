import { request } from 'graphql-request';

import CartItem from '@models/CartItem';
import Product from '@models/Product';

export function getCart(isAuthenticated: boolean): Promise<CartItem[]> {
	if (isAuthenticated) {
		let query = `{
            getCartItems {
                quantity
                price
                product {
                    publicId
                    name
                    description
                    price
                    thumbnailImage
                }
            }
        }`;
		return request<CartItem[]>('http://localhost:3000/graphql', query);
	} else {
		const cart: CartItem[] = JSON.parse(window.localStorage.getItem('cart'));
		if (cart == undefined) {
			window.localStorage.setItem('cart', JSON.stringify([]));
		}
		return Promise.resolve(cart);
	}
}

export function addItem(isAuthenticated: boolean, product: Product): Promise<CartItem[]> {
	if (isAuthenticated) {
		let query = `mutation {
            addCartItem(productId: "${product.publicId}") {
                quantity
                price
                product {
                    publicId
                    name
                    description
                    price
                    thumbnailImage
                }
            }
        }`;

		return request<CartItem[]>('http://localhost:3000/graphql', query);
	} else {
		let cart: CartItem[] = JSON.parse(window.localStorage.getItem('cart'));
		if (cart == undefined) cart = [];
		const index = cart.findIndex(v => v.product.publicId == product.publicId);
		if (index >= 0) {
			cart[index].quantity++;
			cart[index].price += product.price;
		} else {
			const item = new CartItem();
			item.product = product;
			item.price = product.price;
			item.quantity = 1;
			cart.push(item);
		}
		window.localStorage.setItem('cart', JSON.stringify(cart));
		return Promise.resolve(cart);
	}
}

export function removeItem(isAuthenticated: boolean, product: Product): Promise<CartItem[]> {
	if (isAuthenticated) {
		let query = `mutation {
        removeCartItem(productId: "${product.publicId}") {
          quanti    
          price
          product {
            publicId
            name
            description
            price
            thumbnailImage
          }
        }
      }`;

		return request<CartItem[]>('http://localhost:3000/graphql', query);
	} else {
		const cart: CartItem[] = JSON.parse(window.localStorage.getItem('cart'));
		const index = cart.findIndex(v => v.product.publicId == product.publicId);
		if (index >= 0) {
			cart[index].quantity--;
			cart[index].price -= product.price;
			if (cart[index].quantity <= 0) {
				cart.splice(index, 1);
			}
		}
		window.localStorage.setItem('cart', JSON.stringify(cart));
		return Promise.resolve(cart);
	}
}
