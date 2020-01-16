import { ISession } from 'connect-typeorm';
import { Column, Entity, Index, PrimaryColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';

import Cart from '@models/Cart';

@Entity()
export class Session extends BaseEntity implements ISession {
	@Index()
	@Column({ type: 'bigint' })
	public expiredAt = Date.now();

	@PrimaryColumn('varchar', { length: 255 })
	public id = '';

	@OneToOne(() => Cart)
	@JoinColumn()
	cart: Cart;

	@Column('text')
	public json = '';
}
