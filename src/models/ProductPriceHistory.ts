import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn, ManyToOne } from 'typeorm';
import Product from './Product';

@Entity()
export default class ProductPriceHistory extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@ManyToOne(() => Product)
	product: Product;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2
	})
	unitPrice: number;

	@CreateDateColumn()
	startDate: string;
}
