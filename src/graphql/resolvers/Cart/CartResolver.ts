import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql';
import { Request } from 'express';

import Cart from '@models/Cart';
import Product from '@models/Product';
import User from '@models/User';
import CartItem from '@models/CartItem';

@Resolver(Cart)
export default class CartResolver {
	@Query(() => [CartItem])
	@Authorized()
	async getCartItems(@Ctx() req: Request) {
		/*
        Unsigned users dont have cart table in DB but instead in local storage.
        Signed users need to fetch from Cart table in db.        
        */
		const user = req.user as User;

		const cart = await Cart.findOne({ relations: ['user'], where: { user: user } });
		if (cart === undefined) {
			return [];
		} else {
			const cartItems = await CartItem.find({ relations: ['cart'], where: { cart: cart } });
			return cartItems;
		}
	}

	@Mutation(() => [CartItem])
	@Authorized()
	async addCartItem(@Ctx() req: Request, @Arg('productId') productId: string) {
		/*
        Unsigned users dont have cart table in DB but instead in local storage.
        Signed users need to fetch from Cart table in db.        
        */
		const user = req.user as User;

		let cart = await Cart.findOne({ relations: ['user'], where: { user: user } });
		if (cart === undefined) {
			cart = new Cart();
			cart.user = user;
			await cart.save();
		}

		const cartItems = await CartItem.find({
			relations: ['cart'],
			where: { cart: cart }
		});

		const product = await Product.findOne(null, { where: { publicId: productId } });
		if (product === undefined) return cartItems;

		// Increase CartItem quantity if product already exists in the cart.
		const result = cartItems.filter(item => item.product.id == product.id)[0];
		if (result === undefined) {
			const newItem = new CartItem();
			newItem.cart = cart;
			newItem.price = product.price;
			newItem.quantity = 1;
			newItem.product = product;
			await newItem.save();
			cartItems.push(newItem);
		} else {
			result.quantity++;
			result.price = Number(result.price) + Number(product.price);
			await result.save();
		}
		return cartItems;
	}

	@Mutation(() => [CartItem])
	@Authorized()
	async removeCartItem(@Ctx() req: Request, @Arg('productId') productId: string) {
		/*
        Unsigned users dont have cart table in DB but instead in local storage.
        Signed users need to fetch from Cart table in db.        
        */
		const user = req.user as User;

		let cart = await Cart.findOne({ relations: ['user'], where: { user: user } });
		if (cart === undefined) {
			return [];
		}

		const cartItems = await CartItem.find({
			relations: ['cart', 'product'],
			where: { cart: cart }
		});

		const product = await Product.findOne(null, { where: { publicId: productId } });
		if (product === undefined) return cartItems;

		const itemIndex = cartItems.findIndex(item => item.product.id == product.id);

		if (itemIndex >= 0) {
			const cartItem = cartItems[itemIndex];
			cartItem.quantity--;
			// Remove cart item if quantity is zero
			if (cartItem.quantity <= 0) {
				cartItems.splice(itemIndex, 1);

				await cartItem.remove();
				if (cartItems.length == 0) {
					await cart.remove();
					return [];
				}
			} else {
				cartItem.price = Number(cartItem.price) - Number(product.price);
				await cartItem.save();
			}
		}
		return cartItems;
	}
}
