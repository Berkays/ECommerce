import { InputType, Field } from 'type-graphql';
import User from '@models/User';
import { ACCOUNT_TYPE } from '@models/enums/AccountType';

@InputType()
export class RegisterLocalUserArgs implements Partial<User> {
	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field()
	email: string;

	@Field()
	password: string;

	accountType?: ACCOUNT_TYPE = ACCOUNT_TYPE.LOCAL;
}

@InputType()
export class LoginLocalUserArgs {
	@Field()
	email: string;

	@Field({ description: 'Compare input with hashed password' })
	password: string;
}
