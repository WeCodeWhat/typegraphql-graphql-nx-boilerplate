import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ErrorMessage } from "./ErrorMessage";

@InputType()
export class LoginInput {
	@Field()
	email: string;

	@Field()
	password: string;
}
