import { Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import PaymentMethod from '@models/PaymentMethod';

@Entity()
@ObjectType()
export default class Payment extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Field()
	@ManyToOne(() => PaymentMethod)
	paymentMethod: PaymentMethod;
}
