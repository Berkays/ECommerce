import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { ObjectType } from 'type-graphql';

import Newsletter from '@models/Newsletter';
import User from '@models/User';

@Entity()
export default class NewsletterSubscription extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@OneToOne(() => User, { nullable: true })
	@JoinColumn()
	user?: User;

	@ManyToOne(() => Newsletter)
	newsletter: Newsletter;

	@Column({ unique: true, length: 50 })
	email: string;
}
