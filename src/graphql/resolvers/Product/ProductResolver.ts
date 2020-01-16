import { Resolver, Query, Arg } from 'type-graphql';

import Product from '@models/Product';
import ProductCategory from '@models/ProductCategory';

@Resolver(Product)
export default class ProductResolver {
	@Query(() => [Product])
	async getProducts(@Arg('categoryId') categoryId: string) {
		const category = await ProductCategory.findOne({ where: { publicId: categoryId }, cache: true });
		if (category === undefined) {
			console.log('category not found.');
		} else {
			return category.products;
		}
	}

	// @Query(returns => [Product])
	// getProducts() {
	// 	return Product.find();
	// }

	// @Mutation(returns => Product)
	// // @Authorized()
	// addProduct(): // @Ctx('user') user: User,
	// Promise<Product> {
	// 	// console.log(user.firstName);
	// 	const product = new Product();
	// 	product.name = 'product-1234';
	// 	product.unitPrice = 2;
	// 	product.unitsInStock = 2;
	// 	return product.save();
	// }

	// @Query(returns => [Product])
	// Products(@Args() { skip, take }: ProductsArgs) {
	//     return this.ProductService.findAll({ skip, take });
	// }

	// @Mutation(returns => Product)
	// @Authorized()
	// addProduct(
	//     @Arg('newProductData') newProductData: NewProductInput,
	//     @Ctx('user') user: User,
	// ): Promise<Product> {
	//     return this.ProductService.addNew({ data: newProductData, user });
	// }

	// @Mutation(returns => Boolean)
	// @Authorized(Roles.Admin)
	// async removeProduct(@Arg('id') id: string) {
	//     try {
	//         await this.ProductService.removeById(id);
	//         return true;
	//     } catch {
	//         return false;
	//     }
	// }
}
