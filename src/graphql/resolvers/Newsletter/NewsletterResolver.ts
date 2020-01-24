import { Resolver, Arg, Mutation, Ctx } from 'type-graphql';
import { Request } from 'express';

import NewsletterSubscription from '@models/NewsletterSubscription';
import Newsletter from '@models/Newsletter';
import User from '@models/User';

export default class NewsletterResolver {
	@Mutation(() => Boolean)
	async registerNewsletter(
		@Ctx() req: Request,
		@Arg('newsletter') newsletterName: string,
		@Arg('email') email: string
	): Promise<Boolean> {
		try {
			// Check for existing subscription
			const newsletter = await Newsletter.findOne({ where: { name: newsletterName } });
			if (newsletter == undefined) return false;

			let result = undefined;
			let user = undefined;
			if (req.isAuthenticated()) {
				user = req.user as User;
				result = await NewsletterSubscription.findOne({
					where: { newsletter: newsletter, user: user }
				});
			} else {
				result = await NewsletterSubscription.findOne({
					where: { newsletter: newsletter, email: email }
				});
			}
			if (result === undefined) {
				const sub = new NewsletterSubscription();
				if (req.isAuthenticated()) sub.user = user;
				else sub.email = email;
				sub.newsletter = newsletter;
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
