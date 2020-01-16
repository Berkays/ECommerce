import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, CreateDateColumn, BaseEntity, AfterInsert } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import Product from '@models/Product';
import User from '@models/User';

@Entity()
@ObjectType()
export default class ProductReviews extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Field()
	@Column({ type: 'smallint' })
	rating: number;

	@Field()
	@Column({
		length: 500
	})
	review: string;

	@Field()
	@CreateDateColumn()
	readonly reviewDate: string;

	@ManyToOne(() => Product)
	product: Product;

	@ManyToOne(() => User)
	user: User;

	@Column()
	anonymousReview: boolean;

	@AfterInsert()
	updateReviews() {}
}
