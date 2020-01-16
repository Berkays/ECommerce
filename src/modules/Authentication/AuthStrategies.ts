import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as LocalStrategy } from 'passport-local';

import { compareSync } from 'bcrypt';

import User from '@models/User';
import { ACCOUNT_TYPE } from '@models/enums/AccountType';

export const facebookStrategy = new FacebookStrategy(
	{
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		profileFields: ['id', 'email', 'first_name', 'last_name']
	},
	async function(accessToken, refreshToken, profile, done) {
		try {
			let user = await User.findOne({ where: { facebookId: profile.id } });

			if (user === null) {
				const email = profile.emails && profile.emails[0] && profile.emails[0].value;
				user = new User();
				user.email = email;
				user.firstName = profile.name.givenName;
				user.lastName = profile.name.familyName;
				user.password = '';
				user.accountType = ACCOUNT_TYPE.FACEBOOK;
				user.facebookId = profile.id;
				await user.save();
			}

			done(null, user);
		} catch (err) {
			done(err);
		}
	}
);

export const twitterStrategy = new TwitterStrategy(
	{
		consumerKey: process.env.TWITTER_CONSUMER_KEY,
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		includeEmail: true
	},
	async function(token, tokenSecret, profile, done) {
		try {
			let user = await User.findOne({ where: { twitterId: profile.id } });

			if (user === null) {
				user = new User();
				const email = profile.emails && profile.emails[0] && profile.emails[0].value;
				user.email = email;
				user.firstName = profile.name.givenName;
				user.lastName = profile.name.familyName;
				user.password = '';
				user.accountType = ACCOUNT_TYPE.TWITTER;
				user.twitterId = profile.id;
				await user.save();
			}

			done(null, user);
		} catch (err) {
			done(err);
		}
	}
);

export const googleStrategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	async function(accessToken, refreshToken, profile, done) {
		try {
			let user = await User.findOne({ where: { googleId: profile.id } });

			if (user === undefined) {
				user = new User();
				const email = profile.emails && profile.emails[0] && profile.emails[0].value;
				user.email = email;
				user.firstName = profile.name.givenName;
				user.lastName = profile.name.familyName;
				user.password = '';
				user.accountType = ACCOUNT_TYPE.GOOGLE;
				user.googleId = profile.id;
				await user.save();
			}

			done(null, user);
		} catch (err) {
			done(err);
		}
	}
);

export const localStrategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},
	async function(username, password, done) {
		try {
			const user = await User.findOne({ where: { email: username, accountType: 'local' } });
			if (user) {
				const isAuthenticated = compareSync(password, user.password);
				if (isAuthenticated) {
					done(null, user);
				} else {
					done(null, false, { message: 'Incorrect Password' });
				}
			} else {
				done(null, false, { message: 'Username does not exist.' });
			}
		} catch (err) {
			done(err);
		}
	}
);
