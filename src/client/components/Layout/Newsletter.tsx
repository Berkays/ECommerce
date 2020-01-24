import React, { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import { string as yupString } from 'yup';

import { registerToNewsletter } from '@src/client/api/newsletter';

import { getEntityData } from '@src/client/UiEntityHandler';

interface ComponentProps {
	newsletter: string;
}

type Props = ComponentProps;

const NewsletterSign: React.FC<Props> = (props: Props) => {
	const [isLoading, setLoading] = useState(false);
	const inputField = useRef<HTMLInputElement>(null);

	const validator = yupString()
		.required('Email address is required')
		.email('Email is not valid');

	const handleNewsletterRegister = () => {
		let isValid: boolean = true;
		try {
			validator.validateSync(inputField.current.value);
		} catch (err) {
			isValid = false;
			inputField.current.placeholder = err.message;
			inputField.current.value = '';
			return;
		}

		if (!isValid) return;
		setLoading(true);
		registerToNewsletter(getEntityData(props.newsletter), inputField.current.value)
			.then(() => {
				inputField.current.placeholder = 'Successully subscribed';
			})
			.catch(() => {
				inputField.current.placeholder = 'Error occured';
			});
		inputField.current.value = '';
		setLoading(false);
	};
	return (
		<Container fluid={true} className='newsletter-container bg-primary text-white shadow-sm'>
			<p className='text-uppercase font-weight-bold my-0 pr-3'>Get the latest news and offers</p>
			<InputGroup className='newsletter-input-group'>
				<span className='d-flex flex-row w-100'>
					<FormControl
						ref={inputField}
						className='newsletter-input'
						type='text'
						placeholder='Your Email Address'
						aria-label='User email address'
						aria-describedby='button-addon'
					/>
					{isLoading ? (
						<Spinner animation='border' role='status' className='newsletter-loader text-primary' />
					) : (
						<button className='btn btn-link newsletter-submit' onClick={handleNewsletterRegister}>
							Join
						</button>
					)}
				</span>
			</InputGroup>
		</Container>
	);
};

export default NewsletterSign;
