import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { ObjectType } from 'type-graphql';

import User from '@models/User';
import Newsletter from '@models/Newsletter';

@Entity()
@ObjectType()
export default class NewsletterSubscription extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@OneToOne(() => User, { nullable: true })
	@JoinColumn()
	userId?: string;

	@ManyToOne(() => Newsletter)
	newsletterId: string;

	@Column({ unique: true, length: 50 })
	email: string;
}
