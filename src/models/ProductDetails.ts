import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export default class ProductDetails extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	readonly id: string;

	@Field()
	@Column()
	productId: number;
}
