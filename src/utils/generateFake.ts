import './loadEnv';

import * as faker from 'faker';

import { initDB, closeDB } from '../database/db';

const USER_COUNT = process.env.FAKER_USER_COUNT || 2;
const PRODUCT_COUNT = Number(process.env.FAKER_PRODUCT_COUNT) || 5;
const PRODUCT_CATEGORY_COUNT = process.env.FAKER_CATEGORY_COUNT || 2;
const ORDER_COUNT = process.env.FAKER_ORDER_COUNT || 5;
const googleId = process.env.FAKER_GOOGLE_ID || '';

import User from '../models/User';
import Product from '../models/Product';
import Category from '../models/ProductCategory';
import Address from '../models/Address';
import ProductReviews from '../models/ProductReviews';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Payment from '../models/Payment';
import PaymentMethod from '../models/PaymentMethod';
import { ADDRESS_TYPE } from '@models/enums/AddressType';
import { ORDER_STATUS } from '@models/enums/OrderStatus';
import ProductCategory from '../models/ProductCategory';
import Page from '@models/Pages';
import PageEntity from '@models/PageEntity';

initDB().then(async () => {
	await genUsers();
	await genProducts();
	await genPaymentMethod();
	await genOrders();
	await genPages();

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
		if (index == 0) user.googleId = googleId;

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
		if (index == 0) category.name = 'Featured';
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
	for (let userIndex = 0; userIndex < users.length; userIndex++) {
		const user = users[userIndex];
		for (let index = 0; index < ORDER_COUNT; index++) {
			const orderItems: OrderItem[] = [];

			const productSet = new Set<number>();
			for (let itemIndex = 0; itemIndex < PRODUCT_COUNT * 2; itemIndex++) {
				const productIndex = faker.random.number({ min: 0, max: PRODUCT_COUNT - 1 });
				if (productSet.has(productIndex)) continue;
				productSet.add(productIndex);

				const orderItem = new OrderItem();
				orderItem.quantity = faker.random.number(5);
				orderItem.product = products[productIndex];
				await orderItem.save();

				orderItems.push(orderItem);
			}

			const payment = new Payment();
			payment.paymentMethod = paymentMethods[faker.random.number({ min: 0, max: paymentMethods.length - 1 })];
			await payment.save();

			const order = new Order();
			order.orderItems = orderItems;
			order.payment = payment;
			order.orderStatus = ORDER_STATUS.WAITING_PAYMENT;
			order.user = user;
			await order.save();
		}
	}
}

async function genPages() {
	const categories = await ProductCategory.find();

	const layoutPage = new Page();
	layoutPage.key = 'layout';
	layoutPage.entities = [];

	const productPage = new Page();
	productPage.key = 'product';
	productPage.entities = [];

	let pageEntity = new PageEntity();
	pageEntity.key = 'top_banner';
	pageEntity.data = JSON.stringify({
		background_color: '#000000',
		content: 'some html',
		visible: false
	});
	await pageEntity.save();
	layoutPage.entities.push(pageEntity);

	for (let index = 0; index < categories.length; index++) {
		const category = categories[index];
		pageEntity = new PageEntity();
		pageEntity.key = category.name;
		pageEntity.data = category.publicId;
		await pageEntity.save();
		productPage.entities.push(pageEntity);
	}

	await layoutPage.save();
	await productPage.save();

	console.log('Created Entities');
}
