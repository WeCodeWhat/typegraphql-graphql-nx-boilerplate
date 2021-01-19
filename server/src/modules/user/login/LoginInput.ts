import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ErrorMessage } from "./ErrorMessage";

@InputType()
export class LoginInput {
	@Field()
	@IsEmail({}, { message: ErrorMessage.inValidEmailAddress })
	email: string;

	@Field()
	password: string;
}
