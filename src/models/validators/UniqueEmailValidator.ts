import {
	registerDecorator,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationOptions
} from 'class-validator';
import User from '@models/User';

@ValidatorConstraint({ name: 'UniqueEmail', async: false })
class UniqueEmail implements ValidatorConstraintInterface {
	async validate(email: string) {
		const user = await User.findOne({ where: { email: email } });
		return user === undefined;
	}

	defaultMessage() {
		return 'User with email is already existing.';
	}
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
	return function(object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: UniqueEmail
		});
	};
}
