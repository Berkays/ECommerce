import { registerEnumType } from 'type-graphql';

export enum ACCOUNT_TYPE {
	LOCAL = 'local',
	TWITTER = 'twitter',
	FACEBOOK = 'facebook',
	GOOGLE = 'google'
}

registerEnumType(ACCOUNT_TYPE, {
	name: 'ACCOUNT_TYPE',
	description: 'List of account register sources'
});
