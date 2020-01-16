import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, Generated, Index, OneToOne, BaseEntity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import Order from '@models/Order';
import Product from '@models/Product';

@Entity()
@ObjectType()
export default class OrderDetails extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Field()
	@Index()
	@Column()
	@Generated('uuid')
	orderPublicId: string;

	@OneToOne(
		() => Order,
		order => order.orderDetails
	)
	order: Order;

	@Field()
	@ManyToOne(() => Product, { eager: true })
	product: Product;

	@Field()
	@Column({ type: 'int' })
	quantity: number;
}
