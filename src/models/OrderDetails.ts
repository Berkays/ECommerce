import { Column, PrimaryGeneratedColumn, Entity, OneToOne, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import Order from '@models/Order';
import Product from '@models/Product';

@Entity()
@ObjectType()
export default class OrderDetails extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@OneToOne(
		() => Order,
		order => order.orderDetails
	)
	order: Order;

	@Field(() => [Product])
	@ManyToMany(() => Product, { eager: true })
	@JoinTable()
	products: Product[];

	@Field()
	@Column({ type: 'int' })
	quantity: number;
}
