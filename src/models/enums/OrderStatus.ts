import { registerEnumType } from 'type-graphql';

export enum ORDER_STATUS {
	WAITING_PAYMENT = 'waiting_payment',
	WAITING_SHIPMENT = 'waiting-shipment',
	CANCELLED = 'cancelled',
	FULFILLED = 'fulfilled',
	RETURN_REQUEST = 'return_request',
	RETURN_CONFIRMED = 'return_confirmed',
	RETURN_REJECTED = 'return_rejected'
}

registerEnumType(ORDER_STATUS, {
	name: 'ORDER_STATUS',
	description: 'List of order statuses'
});
