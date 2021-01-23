import * as yup from "yup";

const sharedSchema = {
	email: yup.string().email(),
	password: yup.string().min(3).max(255),
};

export const YUP_LOGIN = yup.object().shape({
	email: sharedSchema.email,
	password: sharedSchema.password,
});

export const YUP_REGISTER = yup.object().shape({
	firstName: yup.string().min(3).max(255),
	lastName: yup.string().min(3).max(255),
	email: sharedSchema.email,
	password: sharedSchema.password,
});

export const YUP_ROOMCRUD = yup.object().shape({
	name: yup.string().min(1).max(30),
});
