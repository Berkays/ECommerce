import { Resolver, Arg, Mutation } from 'type-graphql';

import NewsletterSubscription from '@models/NewsletterSubscription';

@Resolver(NewsletterSubscription)
export default class NewsletterResolver {
	@Mutation(() => Boolean)
	async registerNewsletter(@Arg('email') email: string): Promise<Boolean> {
		try {
			// Check for existing subscription
			let result = await NewsletterSubscription.findOne({ email: email });
			if (result === undefined) {
				const sub = new NewsletterSubscription();
				sub.email = email;
				sub.newsletterId = '1'; //TODO: NEWSLETTER ID
				await sub.save();
				return true;
			} else {
				return false;
			}
		} catch {
			return false;
		}
	}
}
