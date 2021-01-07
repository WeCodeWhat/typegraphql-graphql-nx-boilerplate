import { type } from "os";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
	@Field((type) => ID)
	id: string;

	@Field()
	name: string;
}
