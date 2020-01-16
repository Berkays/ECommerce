import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';

import ProductReview from '@models/ProductReviews';
import Product from '@models/Product';

@EventSubscriber()
export class ProductReviewRatingUpdate implements EntitySubscriberInterface<ProductReview> {
	listenTo() {
		return ProductReview;
	}

	async afterInsert(event: InsertEvent<ProductReview>) {
		const product = await Product.findOne(event.entity.product.id);
		if (product != undefined) {
			product.ratingCount++;
			product.rating = Number(product.rating);
			const reviewRating = Number(event.entity.rating);
			product.rating = product.rating + (reviewRating - product.rating) / product.ratingCount;
			await product.save();
		}
	}
}
