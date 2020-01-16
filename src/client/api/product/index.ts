import { request } from 'graphql-request';

import Product from '@models/Product';

export function getProducts(categoryId: string): Promise<Product[]> {
	let query = `query {
        getProducts(categoryId: "${categoryId}") {
         publicId
         name
         description
         unitPrice
         unitsInStock
         mainImage
         rating
         ratingCount
       }
     }
     `;
	return request<Product[]>('http://localhost:3000/graphql', query);
}
