import { PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, CreateDateColumn, BaseEntity } from 'typeorm';

import User from '@models/User';

@Entity()
export default class Cart extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;

	@CreateDateColumn()
	insertDate: string;
}
