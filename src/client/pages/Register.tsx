import React from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Loader from 'react-loader';

import { logoImg } from '../assets/images/index';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { NavLink } from 'react-router-dom';
import {
	accountRegisterUser,
	accountLoginFacebook,
	accountLoginTwitter,
	accountLoginGoogle
} from '../redux/account/actions';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const mapStateToProps = (state: RootState) => ({
	isLoading: state.account.isLoading
});

const dispatchProps = {
	register: accountRegisterUser,
	loginGoogle: accountLoginGoogle,
	loginFacebook: accountLoginFacebook,
	loginTwitter: accountLoginTwitter
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const SignUp: React.FC<Props> = (props: Props) => {
	const schema = Yup.object().shape({
		firstName: Yup.string().required('Required'),
		lastName: Yup.string().required('Required'),
		email: Yup.string()
			.required('Required')
			.email('Please specify a valid email address'),
		password: Yup.string().required('Required'),
		confirmPassword: Yup.string()
			.required('Required')
			.test('same-as-password', 'Passwords do not match', val => {
				return val === formik.values.password;
			})
	});

	const handleSubmit = () => {
		event.preventDefault();
		console.log('submitted');
		if (formik.isValid) {
			props.register({
				firstName: formik.values.firstName,
				lastName: formik.values.lastName,
				email: formik.values.email,
				password: formik.values.password
			});
		}
	};

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		validationSchema: schema,
		onSubmit: handleSubmit
	});

	const renderForm = (
		<Form onSubmit={formik.handleSubmit}>
			<div className='w-100'>
				<Form.Group as='fieldset' className='mb-3'>
					<Form.Row>
						<Form.Label column xs={'12'} sm={'3'} md={'3'} className='pr-2 text-left text-md-right'>
							Full name
						</Form.Label>
						<Col xs={'6'} sm={'5'} md={'3'}>
							<Form.Control
								className={
									formik.errors.firstName && formik.touched.firstName
										? 'text-input error'
										: 'text-input'
								}
								id='firstName'
								name='firstName'
								type='text'
								autoComplete='firstName'
								placeholder='First name'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.firstName}
							/>
							{formik.errors.firstName && formik.touched.firstName ? (
								<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
									{formik.errors.firstName}
								</Form.Control.Feedback>
							) : null}
						</Col>
						<Col xs={'6'} sm={'4'} md={'3'} className='mt-0 mt-sm-0'>
							<Form.Control
								className={
									formik.errors.lastName && formik.touched.lastName
										? 'text-input error'
										: 'text-input'
								}
								id='lastName'
								name='lastName'
								type='text'
								autoComplete='familyName'
								placeholder='Last name'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.lastName}
							/>
							{formik.errors.lastName && formik.touched.lastName ? (
								<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
									{formik.errors.lastName}
								</Form.Control.Feedback>
							) : null}
						</Col>
						<Col className='d-none d-md-block' sm={'2'} md={'3'} />
					</Form.Row>
				</Form.Group>
				<Form.Group as='fieldset'>
					<Form.Row>
						<Form.Label
							column
							xs={'12'}
							sm={'3'}
							md={'3'}
							className='pr-2 text-left text-md-right'
							htmlFor='email'>
							Email address
						</Form.Label>
						<Col xs={'12'} sm={'9'} md={'6'}>
							<Form.Control
								className={
									formik.errors.email && formik.touched.email ? 'text-input error' : 'text-input'
								}
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
							/>
							{formik.errors.email && formik.touched.email ? (
								<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
									{formik.errors.email}
								</Form.Control.Feedback>
							) : null}
						</Col>
						<Col className='d-none d-md-block' md={'3'} />
					</Form.Row>
				</Form.Group>
				<Form.Group as='fieldset'>
					<Form.Row>
						<Form.Label
							column
							xs={'12'}
							sm={'3'}
							md={'3'}
							className='pr-2 text-left text-md-right'
							htmlFor='password'>
							Password
						</Form.Label>
						<Col xs={'12'} sm={'9'} md={'6'}>
							<Form.Control
								className={
									formik.errors.password && formik.touched.password
										? 'text-input error'
										: 'text-input'
								}
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
							/>
							{formik.errors.password && formik.touched.password ? (
								<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
									{formik.errors.password}
								</Form.Control.Feedback>
							) : null}
						</Col>
						<Col className='d-none d-md-block' md={'3'} />
					</Form.Row>
				</Form.Group>
				<Form.Group as='fieldset'>
					<Form.Row>
						<Form.Label
							column
							xs={'12'}
							sm={'3'}
							md={'3'}
							className='pr-2 text-left text-md-right'
							htmlFor='confirmPassword'>
							Confirm password
						</Form.Label>
						<Col xs={'12'} sm={'9'} md={'6'}>
							<Form.Control
								className={
									formik.errors.confirmPassword && formik.touched.confirmPassword
										? 'text-input error'
										: 'text-input'
								}
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.confirmPassword}
							/>
							{formik.errors.confirmPassword && formik.touched.confirmPassword ? (
								<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
									{formik.errors.confirmPassword}
								</Form.Control.Feedback>
							) : null}
						</Col>
						<Col className='d-none d-md-block' md={'3'} />
					</Form.Row>
				</Form.Group>
			</div>
			<Form.Group>
				<Button variant='primary' className='mx-auto mt-3 w-100 w-sm-50' type='submit'>
					Sign up
				</Button>
			</Form.Group>
			<small>
				By creating an account you accept our
				<a className='font-weight-bold transition' href='' target='_help'>
					&nbsp;Terms &amp; Conditions&nbsp;
				</a>
				and
				<a className='font-weight-bold transition' href='' target='_help'>
					&nbsp;Privacy Policy
				</a>
			</small>
		</Form>
	);

	return (
		<main className='signup font-body mb-3'>
			<section className='d-flex position-relative h-100'>
				<div className='wrap3 mx-auto position-relative z-20'>
					<header className='d-flex flex-row justify-content-center align-items-center py-6 md:pb-6'>
						<span className='invisible d-none d-sm-block ml-5 md:ml-0 mr-auto'>
							<span className='d-none d-sm-inline'>
								Already a member?
								<hr />
							</span>
							<NavLink className='font-weight-bold transition text-center w-100 d-block mt-2' to='/login'>
								Sign In
							</NavLink>
						</span>
						<NavLink className='' to='/'>
							<Image src={logoImg} />
							<title>My ECommerce</title>
						</NavLink>
						<span className='d-none d-sm-block mr-5 md:mr-0 ml-auto'>
							<span className='d-none d-sm-inline'>
								Already a member?
								<hr />
							</span>
							<NavLink
								className='text-green-500 font-weight-bold transition hover:text-blue-500 text-center w-100 d-block mt-2'
								to='/login'>
								Sign In
							</NavLink>
						</span>
					</header>
					<Loader loaded={!props.isLoading}>
						<section className='bg-white md:shadow-2xl rounded w-100 p-4 py-5 md:p-12 text-center'>
							<h1 className='font-weight-bold'>Sign up</h1>
							<p>Nice to see you</p>
							<div className='line mt-4 mb-2'>
								<span className='bg-white d-block mx-auto text-uppercase p-3 z-20'>
									Connect your account
								</span>
							</div>
							<div className='d-flex flex-column my-2 mb-2 md:w-1/2 mx-auto'>
								<a
									className='btn btn-primary shadow-sm font-weight-bold mb-3 px-12 pl-16 btn-facebook position-relative d-block'
									href='/auth/facebook'>
									Sign in with Facebook
								</a>
								<a
									className='btn btn-primary shadow-sm font-weight-bold mb-3 px-12 pl-16 btn-twitter position-relative d-block'
									href='/auth/twitter'>
									Sign in with Twitter
								</a>
								<a
									className='btn btn-primary shadow-sm font-weight-bold px-12 pl-16 btn-google block'
									href='/auth/google'>
									Sign in with Google
								</a>
							</div>
							<div className='line mt-4 mb-2'>
								<span className='bg-white d-block mx-auto text-uppercase p-3 z-20'>
									register using email
								</span>
							</div>
							{renderForm}
							<span className='md:text-xs text-center d-block mt-4'>
								Already a member?&nbsp;
								<NavLink className='font-weight-bold transition' to='/login'>
									Sign in
								</NavLink>
							</span>
							<span className='md:text-xs text-center d-block mt-4'>
								Forgot your password?&nbsp;
								<NavLink className='font-weight-bold transition' to='/forgot'>
									Reset password
								</NavLink>
							</span>
						</section>
					</Loader>
				</div>
			</section>
		</main>
	);
};

export default connect(mapStateToProps, dispatchProps)(SignUp);
