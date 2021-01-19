import { Error } from "../modules/common/error.schema";

export const formatValidationError = (err: any): Error[] => {
	const validationErrors: any[] = err.extensions.exception.validationErrors;
	const errors: Error[] = [];
	validationErrors?.forEach(({ constraints }) => {
		errors.push({
			path: Object.keys(constraints)[0],
			message: constraints[Object.keys(constraints)[0]],
		});
	});
	return errors;
};
