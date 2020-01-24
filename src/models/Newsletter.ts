import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
export default class Newsletter extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({ length: 50 })
	name: string;

	@Column({ nullable: true, length: 200 })
	description?: string;

	@Column({ length: 1000 })
	html: string; // path to newsletter html file on server?

	@CreateDateColumn()
	createDate: string;
}
