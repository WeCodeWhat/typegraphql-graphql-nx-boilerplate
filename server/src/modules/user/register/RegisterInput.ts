import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ErrorMessage } from "./ErrorMessage";

@InputType()
export class RegisterInput {
	@Field()
	@Length(1, 255)
	firstName: string;

	@Field()
	@Length(1, 255)
	lastName: string;

	@Field()
	@IsEmail({}, { message: ErrorMessage.inValidEmailAddress })
	email: string;

	@Field()
	password: string;
}
