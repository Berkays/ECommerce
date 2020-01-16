import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import Cart from '@models/Cart';
import Product from '@models/Product';

@Entity()
@ObjectType()
export default class CartItem extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@ManyToOne(() => Cart)
	cart: Cart;

	@Field()
	@OneToOne(() => Product, { eager: true })
	@JoinColumn()
	product: Product;

	@Field()
	@Column()
	quantity: number;

	@Field()
	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2
	})
	price: number;
}
