import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { getAccountSettings } from '../../api/account/index';

const AccountSettingsComponent: React.FC = () => {
	useEffect(() => {
		getAccountSettings().then(value => {
			formik_info.setValues({
				firstName: value.firstName,
				lastName: value.lastName,
				email: value.email,
				phone: '9999'
			});
		});
	}, [getAccountSettings]);

	const schema = Yup.object().shape({
		name: Yup.string().required('Required'),
		email: Yup.string()
			.required('Required')
			.email('Not a valid email'),
		currentPassword: Yup.string()
			.required('Required')
			.min(6),
		newPassword: Yup.string()
			.required('Required')
			.min(6)
	});

	const handleUpdateInfoSubmit = () => {
		event.preventDefault();
		if (formik_info.isValid) {
			// props.loginLocal({ email: formik.values.email, password: formik.values.password });
		}
	};
	const handleResetPasswordSubmit = () => {
		event.preventDefault();
		if (formik_password.isValid) {
			// props.loginLocal({ email: formik.values.email, password: formik.values.password });
		}
	};

	const formik_info = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			phone: '',
			email: ''
		},
		validationSchema: schema,
		onSubmit: handleUpdateInfoSubmit
	});

	const formik_password = useFormik({
		initialValues: {
			current: '',
			new: ''
		},
		validationSchema: schema,
		onSubmit: handleResetPasswordSubmit
	});

	const renderInformationForm = (
		<Form onSubmit={formik_info.handleSubmit}>
			<h5>Information</h5>
			<hr />
			<Form.Group as='fieldset' className='mb-3'>
				<Form.Row>
					<Form.Label column xs={'12'} sm={'3'} md={'2'} className='pr-2 text-left' htmlFor='firstName'>
						First name
					</Form.Label>
					<Col xs={'12'} sm={'9'} md={'5'}>
						<Form.Control
							className={
								formik_info.errors.firstName && formik_info.touched.firstName
									? 'text-input error'
									: 'text-input'
							}
							id='firstName'
							name='firstName'
							type='text'
							autoComplete='firstName'
							onChange={formik_info.handleChange}
							onBlur={formik_info.handleBlur}
							value={formik_info.values.firstName}
						/>
						{formik_info.errors.firstName && formik_info.touched.firstName ? (
							<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
								{formik_info.errors.firstName}
							</Form.Control.Feedback>
						) : null}
					</Col>
					<Col className='d-none d-md-block' md={'3'} />
				</Form.Row>
			</Form.Group>
			<Form.Group as='fieldset' className='mb-3'>
				<Form.Row>
					<Form.Label column xs={'12'} sm={'3'} md={'2'} className='pr-2 text-left' htmlFor='lastName'>
						Last name
					</Form.Label>
					<Col xs={'12'} sm={'9'} md={'5'}>
						<Form.Control
							className={
								formik_info.errors.lastName && formik_info.touched.lastName
									? 'text-input error'
									: 'text-input'
							}
							id='lastName'
							name='lastName'
							type='text'
							autoComplete='familyName'
							onChange={formik_info.handleChange}
							onBlur={formik_info.handleBlur}
							value={formik_info.values.lastName}
						/>
						{formik_info.errors.lastName && formik_info.touched.lastName ? (
							<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
								{formik_info.errors.lastName}
							</Form.Control.Feedback>
						) : null}
					</Col>
					<Col className='d-none d-md-block' md={'3'} />
				</Form.Row>
			</Form.Group>
			<Form.Group as='fieldset' className='mb-3'>
				<Form.Row>
					<Form.Label column xs={'12'} sm={'3'} md={'2'} className='pr-2 text-left' htmlFor='phone'>
						Phone
					</Form.Label>
					<Col xs={'12'} sm={'9'} md={'5'}>
						<Form.Control
							className={
								formik_info.errors.phone && formik_info.touched.phone
									? 'text-input error'
									: 'text-input'
							}
							id='phone'
							name='phone'
							type='text'
							autoComplete='phone'
							onChange={formik_info.handleChange}
							onBlur={formik_info.handleBlur}
							value={formik_info.values.phone}
						/>
						{formik_info.errors.phone && formik_info.touched.phone ? (
							<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
								{formik_info.errors.phone}
							</Form.Control.Feedback>
						) : null}
					</Col>
					<Col className='d-none d-md-block' md={'3'} />
				</Form.Row>
			</Form.Group>
			<Form.Group as='fieldset' className='mb-3'>
				<Form.Row>
					<Form.Label column xs={'12'} sm={'3'} md={'2'} className='pr-2 text-left' htmlFor='email'>
						Email address
					</Form.Label>
					<Col xs={'12'} sm={'9'} md={'5'}>
						<Form.Control
							className={
								formik_info.errors.email && formik_info.touched.email
									? 'text-input error'
									: 'text-input'
							}
							id='email'
							name='email'
							type='email'
							autoComplete='email'
							onChange={formik_info.handleChange}
							onBlur={formik_info.handleBlur}
							value={formik_info.values.email}
						/>
						{formik_info.errors.email && formik_info.touched.email ? (
							<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
								{formik_info.errors.email}
							</Form.Control.Feedback>
						) : null}
					</Col>
					<Col className='d-none d-md-block' md={'3'} />
				</Form.Row>
			</Form.Group>
			<Form.Group>
				<Button variant='primary' className='btn-submit mt-3 w-md-25 align-self-right' type='submit'>
					Update information
				</Button>
			</Form.Group>
		</Form>
	);

	const renderNotificationForm = (
		<Form>
			<div className='mt-5' />
			<h5>Notifications</h5>
			<hr />
			<Form.Group as='fieldset' className='mb-3'>
				<Form.Row>
					<Form.Label className='pr-2 mr-5 text-left' htmlFor='notif1'>
						Notification 1
					</Form.Label>
					<Form.Check type='switch' id='notif1' label='On' />
				</Form.Row>
			</Form.Group>
			<Form.Group as='fieldset' className='mb-3'>
				<Form.Row>
					<Form.Label className='pr-2 mr-5 text-left' htmlFor='notif2'>
						Notification 2
					</Form.Label>
					<Form.Check type='switch' id='notif2' label='On' />
				</Form.Row>
			</Form.Group>
			<Form.Group as='fieldset' className='mb-3'>
				<Form.Row>
					<Form.Label className='pr-2 mr-5 text-left' htmlFor='notif3'>
						Notification 3
					</Form.Label>
					<Form.Check type='switch' id='notif3' label='On' />
				</Form.Row>
			</Form.Group>
		</Form>
	);

	const renderPasswordForm = (
		<Form onSubmit={formik_password.handleSubmit}>
			<div className='mt-5' />
			<h5>Reset password</h5>
			<hr />
			<Form.Group as='fieldset'>
				<Form.Row>
					<Form.Label column xs={'12'} sm={'3'} md={'3'} className='pr-2 text-left' htmlFor='password'>
						Current password
					</Form.Label>
					<Col xs={'12'} sm={'9'} md={'5'}>
						<Form.Control
							className={
								formik_password.errors.current && formik_password.touched.current
									? 'text-input error'
									: 'text-input'
							}
							id='password'
							name='password'
							type='password'
							autoComplete='current-password'
							onChange={formik_password.handleChange}
							onBlur={formik_password.handleBlur}
							value={formik_password.values.current}
						/>
						{formik_password.errors.current && formik_password.touched.current ? (
							<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
								{formik_password.errors.current}
							</Form.Control.Feedback>
						) : null}
					</Col>
					<Col className='d-none d-md-block' md={'3'} />
				</Form.Row>
			</Form.Group>
			<Form.Group as='fieldset'>
				<Form.Row>
					<Form.Label column xs={'12'} sm={'3'} md={'3'} className='pr-2 text-left' htmlFor='newPassword'>
						New password
					</Form.Label>
					<Col xs={'12'} sm={'9'} md={'5'}>
						<Form.Control
							className={
								formik_password.errors.new && formik_password.touched.new
									? 'text-input error'
									: 'text-input'
							}
							id='newPassword'
							name='newPassword'
							type='password'
							onChange={formik_password.handleChange}
							onBlur={formik_password.handleBlur}
							value={formik_password.values.new}
						/>
						{formik_password.errors.new && formik_password.touched.new ? (
							<Form.Control.Feedback type='invalid' className='d-block text-left pt-2 pl-2 mb-1'>
								{formik_password.errors.new}
							</Form.Control.Feedback>
						) : null}
					</Col>
					<Col className='d-none d-md-block' md={'3'} />
				</Form.Row>
			</Form.Group>
			<Form.Group>
				<Button variant='primary' className='btn-submit mt-3 w-md-25 align-self-right' type='submit'>
					Update password
				</Button>
			</Form.Group>
		</Form>
	);

	const renderCloseAccount = (
		<React.Fragment>
			<div className='mt-5' />
			<h5>Close account</h5>
			<hr />
			<Button variant='outline-danger'>Close account</Button>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			{renderInformationForm}
			{renderNotificationForm}
			{renderPasswordForm}
			{renderCloseAccount}
		</React.Fragment>
	);
};

export default AccountSettingsComponent;
