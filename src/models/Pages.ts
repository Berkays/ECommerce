import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm';

import PageEntity from './PageEntity';

@Entity()
export default class Page extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({
		unique: true
	})
	key: string;

	@UpdateDateColumn()
	pageUpdateDate: string;

	@OneToMany(
		() => PageEntity,
		pageEntity => pageEntity.page,
		{
			cascade: true,
			eager: true
		}
	)
	entities: PageEntity[];
}
