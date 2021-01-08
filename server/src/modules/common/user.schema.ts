import { Field, ID, ObjectType } from "type-graphql";

@ObjectType("User schema")
export class User {
	@Field(() => ID)
	id: string;
	@Field(() => String!)
	email: string;
	@Field(() => String!)
	password: string;
}
