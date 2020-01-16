import { Column, PrimaryGeneratedColumn, Entity, Generated, Index, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import ProductCategory from '@models/ProductCategory';

@Entity()
@ObjectType()
export default class Product extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Field()
	@Index()
	@Column()
	@Generated('uuid')
	readonly publicId: string;

	@ManyToMany(
		() => ProductCategory,
		category => category.products
	)
	@JoinTable()
	categories: ProductCategory[];

	@Field()
	@Column({ length: 100 })
	name: string;

	@Field({ nullable: true })
	@Column({ nullable: true, length: 500 })
	description?: string;

	@Field()
	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2
	})
	unitPrice: number;

	@Field()
	@Column({ type: 'int' })
	unitsInStock: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	mainImage?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	thumbnailImage?: string;

	@Field(() => [String], { nullable: true })
	@Column({ type: 'text', nullable: true, array: true })
	media?: string[];

	@Field()
	@Column({
		type: 'decimal',
		precision: 8,
		scale: 2,
		default: 0
	})
	rating: number;

	@Field()
	@Column({
		type: 'smallint',
		default: 0
	})
	ratingCount: number;
}
