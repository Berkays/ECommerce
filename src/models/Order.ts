import {
	Column,
	PrimaryGeneratedColumn,
	Entity,
	ManyToOne,
	Generated,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
	BaseEntity
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import User from '@models/User';
import OrderDetails from '@models/OrderDetails';
import Payment from '@models/Payment';

export enum ORDER_STATUS {
	WAITING_PAYMENT = 'waiting_payment',
	WAITING_SHIPMENT = 'waiting-shipment',
	CANCELLED = 'cancelled',
	FULFILLED = 'fulfilled',
	RETURN_REQUEST = 'return_request',
	RETURN_CONFIRMED = 'return_confirmed',
	RETURN_REJECTED = 'return_rejected'
}

@Entity()
@ObjectType()
export default class Order extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Field()
	@Index()
	@Generated('uuid')
	@Column()
	readonly orderCode: string;

	@ManyToOne(() => User)
	user: User;

	@Field()
	@CreateDateColumn()
	readonly orderDate: string;

	@Field()
	@UpdateDateColumn()
	orderUpdateDate: string;

	@Field()
	@Column({ type: 'timestamp', nullable: true })
	shipDate?: string;

	@Field()
	@Column({ type: 'timestamp', nullable: true })
	paymentDate?: string;

	@OneToOne(() => Payment)
	@JoinColumn()
	payment: Payment;

	@Field()
	@Column({
		type: 'enum',
		enum: ORDER_STATUS,
		default: ORDER_STATUS.WAITING_PAYMENT
	})
	orderStatus: ORDER_STATUS;

	@Field()
	@OneToOne(
		() => OrderDetails,
		orderDetails => orderDetails.order
	)
	@JoinColumn()
	orderDetails: OrderDetails;
}
