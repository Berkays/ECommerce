export default function generateActions(action: string) {
	return {
		REQUEST: `${action}_REQUEST`,
		SUCCESS: `${action}_SUCCESS`,
		FAILURE: `${action}_FAILURE`
	};
}
