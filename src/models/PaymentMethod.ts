import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@Entity()
@ObjectType()
export default class PaymentMethod extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Field()
	@Column({ length: 50 })
	description: string;
}
