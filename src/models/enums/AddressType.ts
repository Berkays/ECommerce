import { registerEnumType } from 'type-graphql';

export enum ADDRESS_TYPE {
	SHIPPING = 'shipping',
	BILLING = 'billing'
}

registerEnumType(ADDRESS_TYPE, {
	name: 'ADDRESS_TYPE',
	description: 'List of address types'
});
