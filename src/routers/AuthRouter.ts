import { Request, Response, Router } from 'express';
const router = Router();

import passport from 'passport';

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
	'/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: 'http://localhost:3000/',
		failureRedirect: 'http://localhost:3000/login'
	})
);

router.get('/twitter', passport.authenticate('twitter', { scope: ['email'] }));
router.get(
	'/twitter/callback',
	passport.authenticate('twitter', {
		successRedirect: 'http://localhost:3000/',
		failureRedirect: 'http://localhost:3000/login'
	})
);

router.get(
	'/google',
	passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] })
);
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: 'http://localhost:3000/',
		failureRedirect: 'http://localhost:3000/login'
	})
);

router.post('/local', passport.authenticate('local'), (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		res.redirect('http://localhost:3000/');
	} else {
		res.status(401);
	}
});

router.get('/logout', (req: Request, res: Response) => {
	req.logOut();
	res.redirect('http://localhost:3000/');
});

export default router;
