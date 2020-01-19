import { Resolver, Arg, Authorized, Ctx, Query } from 'type-graphql';

import { Request } from 'express';

import Order from '@models/Order';

@Resolver(Order)
export default class OrderResolver {
	@Query(() => [Order])
	@Authorized()
	async getOrders(
		@Ctx() ctx: Request,
		@Arg('take', { nullable: true }) take: number,
		@Arg('skip', { nullable: true }) skip: number
	) {
		try {
			if (take === undefined || take <= 0) take = 10;
			if (skip === undefined || skip <= 0 || skip > 100) skip = 0;
			const orders = await Order.find({ where: { user: ctx.user }, take: take, skip: skip });
			return orders;
		} catch {
			return [];
		}
	}
}
