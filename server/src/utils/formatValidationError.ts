import { Error } from "../modules/common/error.schema";

export const formatValidationError = (err: any): Error[] => {
	const validationErrors: any[] = err.extensions.exception.validationErrors;
	console.log(err);
	const errors: Error[] = [];
	if (validationErrors) {
		validationErrors?.forEach(({ constraints }) => {
			errors.push({
				path: Object.keys(constraints)[0],
				message: constraints[Object.keys(constraints)[0]],
			});
		});
	} else {
		errors.push({
			path: err.path[0],
			message: err.message,
		});
	}
	return errors;
};
