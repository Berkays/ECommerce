import React, { useState } from 'react';

import Loader from 'react-loader';

import SocialConnectButtons from './SocialConnectButtons';

interface Props {
	formHeader: string;
	formWelcomeText: string;
	cornerComponent: any;
	dividerText: string;
	form: any;
}

const LoginForm = (props: Props) => {
	const [isLoading, setLoading] = useState(false);
	const asy = () => {};

	return (
		<main className='signup'>
			<section className='d-flex position-relative h-100'>
				<div className='wrap3 mx-auto position-relative z-20'>
					<header className='d-flex flex-row justify-content-center align-items-center py-4'>
						{props.cornerComponent}
					</header>
					<Loader loaded={!isLoading}>
						<section className='bg-white shadow-sm rounded w-100 p-4 py-5 text-center'>
							<h1 className='font-weight-bold'>{props.formHeader}</h1>
							<p>{props.formWelcomeText}</p>
							<div className='line mt-4 mb-2'>
								<span className='bg-white d-block mx-auto text-uppercase p-3 z-20'>
									Connect your account
								</span>
							</div>
							<SocialConnectButtons />
							<div className='line mt-4 mb-2'>
								<span className='bg-white d-block mx-auto text-uppercase p-3 z-20'>
									{props.dividerText}
								</span>
							</div>
							{props.form}
						</section>
					</Loader>
				</div>
			</section>
		</main>
	);
};

export default LoginForm;
