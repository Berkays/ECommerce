import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, BaseEntity } from 'typeorm';
import Page from './Pages';

@Entity()
export default class PageEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({
		unique: true
	})
	key: string;

	// JSON data
	@Column({
		type: 'json'
	})
	data: string;

	@ManyToOne(
		() => Page,
		page => page.entities
	)
	page: Page;
}
