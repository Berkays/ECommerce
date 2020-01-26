import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';

import ProductPriceHistory from '@models/ProductPriceHistory';

@EventSubscriber()
export class ProductPriceUpdate implements EntitySubscriberInterface<ProductPriceHistory> {
	listenTo() {
		return ProductPriceHistory;
	}

	async afterInsert(event: InsertEvent<ProductPriceHistory>) {
		const product = event.entity.product;
		product.price = event.entity.unitPrice;
		await product.save();
	}
}
