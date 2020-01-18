import './loadEnv';

import * as faker from 'faker';

import { initDB, closeDB } from '../database/db';

const USER_COUNT = process.env.FAKER_USER_COUNT || 2;
const PRODUCT_COUNT = process.env.FAKER_PRODUCT_COUNT || 5;
const PRODUCT_CATEGORY_COUNT = process.env.FAKER_CATEGORY_COUNT || 2;
const ORDER_COUNT = process.env.FAKER_ORDER_COUNT || 5;
const googleId = process.env.FAKER_GOOGLE_ID || '';

import User from '../models/User';
import Product from '../models/Product';
import Category from '../models/ProductCategory';
import Address from '../models/Address';
import ProductReviews from '../models/ProductReviews';
import Order, { ORDER_STATUS } from '../models/Order';
import OrderDetails from '../models/OrderDetails';
import Payment from '../models/Payment';
import PaymentMethod from '../models/PaymentMethod';
import { ADDRESS_TYPE } from '@models/enums/AddressType';

initDB().then(async () => {
	await genUsers();
	await genProducts();
	await genPaymentMethod();
	await genOrders();

	await closeDB();

	console.log('Done');
	return;
});

async function genUsers() {
	for (let index = 0; index < USER_COUNT; index++) {
		const user = new User();
		user.firstName = faker.name.firstName();
		user.lastName = faker.name.lastName();
		user.email = faker.internet.email();
		user.password = faker.internet.password();

		// First user has google id for authentication
		if (index == 0) {
			const _user = await User.find({ where: { googleId: googleId } });
			if (_user === undefined) user.googleId = googleId;
		}

		await user.save();

		const address = new Address();
		address.name = 'home';
		address.type = ADDRESS_TYPE.BILLING;
		address.city = faker.address.city();
		address.zipcode = faker.address.zipCode('#####');
		address.phone = faker.phone.phoneNumber('###-###-####');
		address.firstName = faker.name.firstName();
		address.lastName = faker.name.lastName();
		address.country = faker.address.country();
		address.address1 = faker.address.streetAddress();
		address.address2 = faker.address.secondaryAddress();

		address.user = user;

		await address.save();
	}
	console.log('Created ' + USER_COUNT + ' users');
}

async function genProducts() {
	const users = await User.find();

	const categories: Category[] = [];
	for (let index = 0; index < PRODUCT_CATEGORY_COUNT; index++) {
		const category = new Category();
		category.name = faker.commerce.department();
		await category.save();

		categories.push(category);
	}
	console.log('Created ' + PRODUCT_CATEGORY_COUNT + ' categories');

	for (let index = 0; index < PRODUCT_COUNT; index++) {
		const product = new Product();
		product.name = faker.commerce.productName();
		product.mainImage = 'https://picsum.photos/256';
		product.thumbnailImage = 'https://picsum.photos/128';
		product.media = ['https://picsum.photos/512', 'https://picsum.photos/512', 'https://picsum.photos/512'];
		product.unitPrice = Number(faker.commerce.price(1, 100));
		product.description = faker.lorem.paragraph();
		product.categories = categories;
		product.unitsInStock = faker.random.number();
		await product.save();

		const reviewCount = faker.random.number({ min: 0, max: 5 });
		for (let index = 0; index < reviewCount; index++) {
			const productReview = new ProductReviews();
			productReview.anonymousReview = faker.random.boolean();
			productReview.rating = faker.random.number({ min: 1, max: 5 });
			productReview.review = faker.lorem.paragraph();
			productReview.product = product;
			productReview.user = users[faker.random.number({ min: 0, max: users.length - 1 })];

			await productReview.save();
		}
	}
	console.log('Created ' + PRODUCT_COUNT + ' products');
}

async function genPaymentMethod() {
	let paymentMethod = new PaymentMethod();
	paymentMethod.description = 'Credit Card';
	await paymentMethod.save();

	paymentMethod = new PaymentMethod();
	paymentMethod.description = 'Paypal';
	await paymentMethod.save();

	paymentMethod = new PaymentMethod();
	paymentMethod.description = 'Stripe';
	await paymentMethod.save();
}

async function genOrders() {
	const users = await User.find();
	const products = await Product.find();
	const paymentMethods = await PaymentMethod.find();

	for (let index = 0; index < ORDER_COUNT; index++) {
		const orderDetails = new OrderDetails();
		orderDetails.quantity = faker.random.number(5);
		orderDetails.product = products[faker.random.number({ min: 0, max: products.length - 1 })];
		await orderDetails.save();

		const payment = new Payment();
		payment.paymentMethod = paymentMethods[faker.random.number({ min: 0, max: paymentMethods.length - 1 })];
		await payment.save();

		const order = new Order();
		order.orderDetails = orderDetails;
		order.payment = payment;
		order.orderStatus = ORDER_STATUS.WAITING_PAYMENT;
		order.user = users[faker.random.number({ min: 0, max: users.length - 1 })];
		await order.save();
	}
}
