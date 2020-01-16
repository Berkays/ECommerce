import './utils/loadEnv';

import * as path from 'path';
import express from 'express';

import BaseRouter from './routers/BaseRouter';

import compression from 'compression';
import cors from 'cors';

import passport from 'passport';
import * as strategy from './modules/Authentication/AuthStrategies';

import session, { SessionOptions } from 'express-session';
import { TypeormStore } from 'connect-typeorm';

import { Session } from '@models/Session';
import User from '@models/User';

export function initApp() {
	passport.use(strategy.googleStrategy);
	passport.use(strategy.facebookStrategy);
	passport.use(strategy.twitterStrategy);
	passport.use(strategy.localStrategy);

	passport.serializeUser<any, any>(function(user: User, done) {
		done(null, user.id);
	});

	passport.deserializeUser<any, any>(function(id: number, done) {
		User.findOne(id)
			.then(user => done(null, user))
			.catch(err => done(err, null));
	});

	const app = express();

	const sessionConfig: SessionOptions = {
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {},
		store: new TypeormStore().connect(Session.getRepository())
	};

	if (process.env.NODE_ENV === 'production') {
		app.set('trust proxy', 1);
		sessionConfig.cookie.secure = true;
	}

	app.disable('x-powered-by');

	app.use(compression());
	app.use(cors());
	app.use(express.json({ limit: '16mb' }));
	app.use(express.urlencoded({ extended: false }));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(session(sessionConfig));
	app.use(passport.initialize());
	app.use(passport.session());

	// Bind route
	app.use('/', BaseRouter);

	console.log('starting...');
	return app;
}
// export default app;
