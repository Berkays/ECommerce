import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export default class Newsletter extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Field()
	@Column({ length: 50 })
	name: string;

	@Field()
	@Column({ nullable: true, length: 50 })
	description?: string;

	@Field()
	@Column({ length: 50 })
	html: string; // path to newsletter html file on server?

	@Field()
	@CreateDateColumn()
	createDate: string;
}
