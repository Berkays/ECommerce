import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, BaseEntity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { ACCOUNT_TYPE } from '@models/enums/AccountType';

@Entity()
@ObjectType()
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Field()
	@Column({ length: 50 })
	firstName: string;

	@Field()
	@Column({ length: 20 })
	lastName: string;

	@Field()
	@Column({ length: 50 })
	email: string;

	@Field()
	@Column()
	password: string;

	@Column({ type: 'enum', enum: ACCOUNT_TYPE, default: ACCOUNT_TYPE.LOCAL })
	accountType: ACCOUNT_TYPE;

	@Column({ nullable: true, unique: true })
	facebookId?: string;

	@Column({ nullable: true, unique: true })
	twitterId?: string;

	@Column({ nullable: true, unique: true })
	googleId?: string;

	@CreateDateColumn()
	insertDate: string;

	@Column({ default: true })
	active: boolean;
}
