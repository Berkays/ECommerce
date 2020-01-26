import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, BaseEntity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import User from '@models/User';
import { ADDRESS_TYPE } from './enums/AddressType';

@Entity()
@ObjectType()
export default class Address extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: string;

	@ManyToOne(() => User)
	user: User;

	@Field(() => ADDRESS_TYPE)
	@Column({
		type: 'enum',
		enum: ADDRESS_TYPE
	})
	type: ADDRESS_TYPE;

	// Address name
	@Field()
	@Column({ length: 20 })
	name: string;

	@Field()
	@Column({ length: 50 })
	firstName: string;

	@Field()
	@Column({ length: 30 })
	lastName: string;

	@Field()
	@Column({ length: 30 })
	country: string;

	@Field()
	@Column({ length: 30 })
	city: string;

	@Field()
	@Column({ length: 50 })
	address1: string;

	@Field()
	@Column({ length: 50 })
	address2: string;

	@Field()
	@Column({
		length: 5
	})
	zipcode: string;

	@Field()
	@Column({
		length: 20
	})
	phone: string;
}
