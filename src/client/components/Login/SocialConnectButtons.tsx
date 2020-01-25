import React from 'react';

const SocialConnectButtons: React.FC = () => {
	return (
		<div className='d-flex flex-column my-2 mb-2 w-md-50 mx-auto'>
			<a className='btn shadow-sm mb-3 btn-facebook' href='/auth/facebook'>
				Sign in with Facebook
			</a>
			<a className='btn shadow-sm mb-3 btn-twitter' href='/auth/twitter'>
				Sign in with Twitter
			</a>
			<a className='btn shadow-sm btn-google' href='/auth/google'>
				Sign in with Google
			</a>
		</div>
	);
};

export default SocialConnectButtons;
