import React from 'react';

const SocialConnectButtons: React.FC = () => {
	return (
		<div className='d-flex flex-column my-2 mb-2 md:w-1/2 mx-auto'>
			<a className='btn shadow-sm mb-3 px-12 pl-16 btn-facebook' href='/auth/facebook'>
				Sign in with Facebook
			</a>
			<a
				className='btn shadow-sm font-weight-bold mb-3 px-12 pl-16 btn-twitter position-relative d-block'
				href='/auth/twitter'>
				Sign in with Twitter
			</a>
			<a className='btn shadow-sm font-weight-bold px-12 pl-16 btn-google block' href='/auth/google'>
				Sign in with Google
			</a>
		</div>
	);
};

export default SocialConnectButtons;
