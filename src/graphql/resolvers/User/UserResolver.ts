import { Resolver, Arg, Authorized, Mutation, Ctx, Query } from 'type-graphql';

import { Request } from 'express';
import { hashSync } from 'bcrypt';

import User from '@models/User';
import { RegisterLocalUserArgs } from './UserArgs';

@Resolver(User)
export default class UserResolver {
	@Mutation(() => Boolean)
	@Authorized()
	logout(@Ctx() ctx: Request): boolean {
		ctx.logout();
		return true;
	}

	@Query(() => User)
	@Authorized()
	async getAccountSettings(@Ctx() ctx: Request) {
		try {
			return ctx.user;
		} catch {
			return null;
		}
	}
	// @Mutation(returns => User, { nullable: true })
	// async loginLocal(@Ctx() ctx: any, @Arg('localUserCredentials', type => LoginLocalUserArgs) localUserCredentials: LoginLocalUserArgs) {
	//     // ctx.login(localUserCredentials.email, localUserCredentials.password, async (err) => {
	//     //     if (err) {
	//     //         console.log(err);
	//     //         return null;
	//     //     }
	//     //     return await User.findOne({ where: { email: localUserCredentials.email, authType: 'local' } });
	//     // });
	//     // const a = localUserCredentials.email;
	//     // const b = localUserCredentials.password;
	//     // console.log(a);
	//     // console.log(b);
	//     // const { user, info } = await ctx.authenticate('graphql-local', { a, b });
	//     // console.log(user);
	//     // console.log(info);
	//     // // only required if express-session is used
	//     // ctx.login(user);
	//     // return { user };
	// }
	@Mutation(() => Boolean)
	async register(@Arg('newUserData') newUserData: RegisterLocalUserArgs) {
		try {
			const user = new User();
			user.firstName = newUserData.firstName;
			user.lastName = newUserData.lastName;
			user.email = newUserData.email;
			user.password = hashSync(newUserData.password, 10);
			user.accountType = newUserData.accountType;
			await user.save();
			return true;
		} catch {
			return false;
		}
	}

	// // @Query(returns => [User])
	// // Users(@Args() { skip, take }: UsersArgs) {
	// //     return this.UserService.findAll({ skip, take });
	// // }
	// // @Mutation(returns => User)
	// // @Authorized()
	// // addUser(
	// //     @Arg('newUserData') newUserData: NewUserInput,
	// //     @Ctx('user') user: User,
	// // ): Promise<User> {
	// //     return this.UserService.addNew({ data: newUserData, user });
	// // }
	// // @Mutation(returns => Boolean)
	// // @Authorized(Roles.Admin)
	// // async removeUser(@Arg('id') id: string) {
	// //     try {
	// //         await this.UserService.removeById(id);
	// //         return true;
	// //     } catch {
	// //         return false;
	// //     }
	// // }
}
