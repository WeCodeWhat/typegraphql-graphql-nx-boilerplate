import * as yup from "yup";

export const YUP_SCHEMA = yup.object().shape({
	email: yup.string().email(),
	password: yup.string().min(3).max(255),
});

YUP_SCHEMA;
