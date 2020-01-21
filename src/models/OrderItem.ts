import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import Order from '@models/Order';
import Product from '@models/Product';

@Entity()
@ObjectType()
export default class OrderItem extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@ManyToOne(
		() => Order,
		order => order.orderItems
	)
	order: Order;

	@Field(() => Product)
	@ManyToOne(() => Product, { eager: true })
	product: Product;

	@Field()
	@Column({ type: 'int' })
	quantity: number;
}
