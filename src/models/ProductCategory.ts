import { Column, PrimaryGeneratedColumn, Entity, Index, Generated, ManyToMany, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import Product from '@models/Product';

@Entity()
@ObjectType()
export default class ProductCategory extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Field(() => ID)
	@Index()
	@Column()
	@Generated('uuid')
	readonly publicId: string;

	@Field()
	@Column()
	name: string;

	@ManyToMany(
		() => Product,
		product => product.categories,
		{
			eager: true,
			cascade: true
		}
	)
	products: Product[];
}
